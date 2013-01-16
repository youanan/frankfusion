---
layout: post
title: Client side site search for Jekyll, Programming by Coincidence
time: 2013-01-09 22:00:00 +00:00
categories:
    - Jekyll
    - JavaScript
    - General
---
I've finally got around to implementing a search feature for my Jekyll based blog. I really enjoy using the type of fuzzy search that [Sublime Text 2](http://www.sublimetext.com/2) provides and thought it would be a good opportunity to attempt a JavaScript implementation. In the process, I needlessly used the Levenshtein Distance for scoring search results, demonstrating a classic case of ['Programming by Coincidence'](http://pragprog.com/the-pragmatic-programmer/extracts/coincidence).<!--more-->

# Fuzzy search

The type of fuzzy search I have implemented will provide the following matches for the query string "cold pa":

* **Cold**Fusion **Pa**ckage management
* S**c**aff**old**ing with s**p**or*a*dic spacing

If all the letters in your search term are found in the item to be searched, and in the order you have typed them, they will appear in results, regardless of exact word matches. You may find that you get results that you really weren't searching for, but with good result *scoring*, the correct results should rise to the top.

In Sublime Text 2, it is used everywhere and is particular useful in finding files buried in directories. For example, if I want to find `./cfstatic/util/Base.cfc`, I can type: 'statutibas' and my Base.cfc file will be found, and most likely be the first result. It may not look particularly intuitive (statutibas?!), but once you get the hang of it, it feels like a natural extension of your brain.

# A little regex

The first step in solving the problem was to produce a regular expression from the user input. The expression is simple. All we want to do is match all of your input characters, in the order that you type them, anywhere in the string. For example, if the input is 'cold pa', we generate the expression:

{% highlight js %}
/(c)(.*?)(o)(.*?)(l)(.*?)(d)(.*?)(p)(.*?)(a)/i;
{% endhighlight %}

Next, we want to be able to show the user what has been matched by highlighting the result. For the expression above, we need to generate a corresponding pattern with which to replace the matched string with a string that makes all the matched letters bold (I believe that using the **b** tag rather than **strong** is correct in this case, please correct me if I'm wrong!):

{% highlight js %}
'<b>$1</b>$2<b>$3</b>$4<b>$5</b>$6<b>$7</b>$8<b>$9</b>$10<b>$11</b>'
{% endhighlight %}

The JavaScript I am using to generate the expressions and replace patterns is as follows:

{% highlight js %}
var generateRegexForInput = function( input ){
  var inputLetters = input.replace(/\W/, '').split('')
    , reg = {}, i;

  reg.expr = new RegExp('(' + inputLetters.join( ')(.*?)(' ) + ')', 'i');
  reg.replace = ""

  for( i=0; i < inputLetters.length; i++ ) {
    reg.replace += ( '<b>$' + (i*2+1) + '</b>' );
    if ( i + 1 < inputLetters.length ) {
      reg.replace += '$' + (i*2+2);
    }
  }

  return reg
};
{% endhighlight %}

# Scoring the results

I am scoring results by how narrowly they match the input. This is expressed as:

`matchedSubstring.length - userInput.length`

For the input, 'cold pa', "**Cold pa**thology" would score 0 and "S**c**aff**old**ing with s**p**or**a**dic spacing" would score 14. The closer to zero, the better the match.

Before getting in to the code, there is a small complication to consider here: *a single string may have multiple matches to the regular expression*. We are most interested in the most "narrow" match. My solution to this is a little brutal I think - I attempt the regex on decreasing substrings of the user input, breaking when no match is found.

The code below makes use of the array returned by JavaScript's [String.match()](http://lmgtfy.com/?q=javascript match) method. The first element of this array is the substring that is matched by the regular expression. The length of this substring tells us how accurate the result is:

{% highlight js %}
var search = function( input ){
  var reg = generateRegexForInput( input )
    , matches;

  // searchIndex is an array of posts and pages
  // in the form [{title:"some title",href="/the-page.html"},...]

  matches = searchIndex.filter( function( item ) {
    var titleLen = item.title.length
      , match, nextMatch, i, highlighted;

    // attempt a regex match for ever decreasing
    // substrings of the search term and keep the
    // narrow-most match
    for( i=0; i < titleLen; i++ ){
      nextMatch = item.title.substr(i).match( reg.expr );

      if ( !nextMatch ) {
        break;

      } else if ( !match || nextMatch[0].length < match[0].length ) {
        match = nextMatch;
        highlighted =
        	  item.title.substr(0,i)
        	+ item.title.substr(i).replace( reg.expr, reg.replace );
      }
    }

    // if we have match, decorate the result with a score
    // and highlighted title - then tell the filter() method
    // that we wish to keep this item (return true)
    if ( match ) {
      item.score       = match[0].length - input.length;
      item.highlighted = highlighted;

      return true;
    }
  });

  // sort results by score, using length of title as a tie-breaker
  return matches.sort( function( a, b ){
    return ( a.score - b.score ) || a.title.length - b.title.length;
  } );
};
{% endhighlight %}


## My Levenshtein mistake, Programming by coincidence

As stated in my introduction, I made a classic 'Programming by coincidence' mistake. Before the scoring solution above, I was using the [Levenshtein Distance](http://en.wikipedia.org/wiki/Levenshtein_distance) string metric for scoring search results. This fancy sounding metric provides a score based on the number of 'single character edits required to change one word into another'.

I arrived at the decision to use this after a couple of google searches, a copy and paste of a JavaScript implementation and observing that a sensible order of search results was being returned. This is *Programming by coincidence* - observing results that appear to be correct without fully understanding the means by which they were obtained. Frankly, I should be ashamed.

It was not until I looked to fully understand the algorithm, in order that I might write about it in this  blog post, that I realised my mistake. Using it in this case was having no more effect than ordering the results by the length of the page or post title; a fancy waste of CPU cycles!

# Generating my search collection

For this, I wrote my first Jekyll plugin. The plugin iterates over the site's pages and posts and generates  JavaScript that declares an array of posts and pages. I am not willing to publish the code here as it contains a fair amount that I do not grok; I understand the general concepts, but there is much coincidence in the outcome. Being code that does not publicly run, I'm willing to forgive myself this transgression. Hopefully you can find it in your hearts to do the same ;)

p.s. If you're really interested, you can find it in my site's [github repo](https://github.com/DominicWatson/frankfusion). You can also find the full JavaScript listing for the search widget.