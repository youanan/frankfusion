---
layout: post
title: Client side site search for Jekyll, Coding by Coincidence
time: 2013-01-09 22:00:00 +00:00
categories:
    - Jekyll
    - JavaScript
    - Ruby
---
I've finally got around to implementing a search feature for my Jekyll based blog. I really enjoy using the type of fuzzy search that [Sublime Text 2](http://lmgtfy.com/?sublime text 2) provides and thought it would be a good opportunity to attempt a JavaScript implementation. In the process, I needlessly used the Levenshtein Distance for scoring search results, demonstrating a classic case of 'Coding by Coincidence'.<!--more-->

# Fuzzy search

The type of fuzzy search I have implemented will provide the following matches for the query string "cold pa":

* **Cold**Fusion **Pa**ckage management
* S**c**aff**old**ing with s**p**or*a*dic spacing

If all the letters in your search term are found in the item to be searched, and in the order you have typed them, they will appear in results, regardless of exact word matches. This approach has the advantage of providing results for typos, mispellings, etc. You may find that you get results that you really weren't searching for, but with good result *scoring*, the correct results should rise to the top.

In Sublime Text 2, it is used everywhere and is particular useful in finding files buried in directories. For example, if I want to find `/home/dom/code/cfstatic/util/Base.cfc`, I can type: 'stat uti bas' and my Base.cfc file will be found, and most likely be the first result.

# A little regex

The first step in solving the problem was to produce a couple of regular expressions from the user input.The first expression will match whole words from your search term and the second will match letters. Results that match the first expression should be scored higher than those matching the second. For example, given the input 'cold pa', the two expressions appear thus:

{% highlight js %}
var exp1 = /'(cold)(.*?)(pa)'/i
  , exp2 = /'(c)(.*?)(o)(.*?)(l)(.*?)(d)(.*?)(p)(.*?)(a)'/i;
{% endhighlight %}

Next, we want to be able to show the user what has been matched by highlighting the result. For each of the expressions above, we need to generate a corresponding pattern with which to replace the matched string:

{% highlight js %}
var pat1 = '<b>$1</b>$2<b>$3</b>'
  , pat2 = '<b>$1</b>$2<b>$3</b>$4<b>$5</b>$6<b>$7</b>$8<b>$9</b>$10<b>$11</b>'
{% endhighlight %}

The JavaScript I am using to generate the expressions and replace patterns is as follows:

{% highlight js %}
generateRegexForInput = function( input ){
	var inputWords   = input.split(/\s/)
	  , inputLetters = input.replace(/\W/, '').split('')
	  , generateRegex, generateReplacePattern;

	generateRegex = function( tokens ){
		return new RegExp( '(' + tokens.join( ')(.*?)(' ) + ')', 'i' );
	};

	generateReplacePattern = function( inputTokenCount ) {
		var replace = "", i;

		for( i=0; i < inputTokenCount; i++ ) {
			replace += ( '<b>$' + (i*2+1) + '</b>' );
			if ( i + 1 < inputTokenCount ) {
				replace += '$' + (i*2+2);
			}
		}

		return replace;
	};

	return {
		simple : {
			  expr    : generateRegex( inputWords )
			, replace : generateReplacePattern( inputWords.length )
		},
		fuzzy : {
			  expr    : generateRegex( inputLetters )
			, replace : generateReplacePattern( inputLetters.length )

		}
	};
};
{% endhighlight %}

# Scoring the results

## My Levenshtein mistake!

As stated in my introduction, I was using the [Levenshtein Distance](http://en.wikipedia.org/wiki/Levenshtein_distance) string metric for scoring search results. This metric provides a score based on the number of 'single character edits required to change one word into another'. I arrived at the decision to use this after a couple of google searches, a copy and paste of a JavaScript implementation and observing that a sensible order of search results was being returned. This is *coding by coincidence* -observing results that appear to be correct without fully understanding the means by which they were obtained. Frankly, I should be ashamed.

It was not until I demanded of myself that I fully understand the algorithm that I had copied and pasted, in order that I might write about it in this very blog post, that I realised my mistake.

### How the Levenshtein scoring works

Points are tallied for letters that require deleting, inserting and substituting to arrive from one string to another. Typically a score of 1 will be levied for insertions and deletions and 2 for substitutions. The final score represents the shortest route from one word to another. The lower the score, the closer the match. Some simple examples:

* 'To**l**k**i**en' &rarr; 'Token' = 2 (two deletions, 'l' and 'i')
* 'Drive' &rarr; 'Drive**l**' = 1 (one insertion, 'l')
* '**S**lug' &rarr; '**G**lug' = 2 (one substitution, 'S/G')

### Why is it pointless in my search?

All of the characters in the search string will be present in the result string that is being scored. This is because the search results have already been matched using the regular expression rules above. This means that there will never be any *substitutions* to arrive at one string to another, only deletions.

In programming terms, the Levenshtein score for my search results will always be:

`resultString.length - searchString.length`

## A side note: the Levenshtein distance algorithm

The Wikipedia entry for the [Levenshtein Distance](http://en.wikipedia.org/wiki/Levenshtein_distance) provides terse pseudocode and an even less understandable (for ignoramuses such as myself) mathematic expression for an algorithm to calculate the score. I could not find a truly plain English explanation anywhere so thought I'd attempt one here.

### Building the score little by little

Given two strings, "Levenshtein" and "Latrine", the Levenshtein distance can be calculated as the minimum score of these three values:

1. The Levenshtein score of "Levenshtei" &rarr; "Latrine" + 1 (for inserting 'n')
2. The Levenshtein score of "Levenshtein" &rarr; "Latrin" + 1 (for deleting the 'e')
3. The Levenshtein score of "Levenshtei" &rarr; "Latrin" + 2 (for substituting the 'n' for the 'e')

You can see that the algorithm is recursive. We with the full words and calculate their scores by first calculating the scores of substrings of those words.
