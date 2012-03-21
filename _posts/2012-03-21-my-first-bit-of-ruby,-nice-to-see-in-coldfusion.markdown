---
layout: post
title: My first bit of Ruby, a nice to see in ColdFusion
time: 2012-03-21 22:09:00 +00:00
categories:
    - ColdFusion
    - Ruby
---
I use Jekyll for my blog, a Ruby framework for generating static websites. I had the need / want
to make a change to one of the plugins, a CSS Minifier, so that the cache-busted filename was
a bit smarter. The solution would be a lovely addition to ColdFusion's lineup of functions that
use closures.<!--more-->

In short, what I wanted to do was take an array of css filenames and pull out the latest last-modified 
date of all of them. The solution was to use the `reduce()` method, a functional programming methodology
that takes multiple values and reduces them to a single value. The code looked like this:

{% highlight ruby %}
last_modified = array_of_files.reduce( Time.at(0) ) do |latest,filepath|
	modified = File.mtime(filepath)
	modified > latest ? modified : latest
end
{% endhighlight %}

##My (n00b) explanation of the reduce method
The reduce method takes an initial value (in this case, `Time.at(0)`) + a code block
that will be called for each item in the collection (a function to you and me). The code block 
takes two arguments, the last returned value (or initial value if it is the first item) + the next 
item in the collection. The code block should return a single value. The final result will be the 
return value of the final code block call (on the final item of your collection).

## So how about ColdFusion?
I got to thinking / wishing that the new ColdFusion 10 closure features would come with some
functional programming style functions such as reduce/fold and map. It doesn't appear that it does,
but I guess it isn't too late to request them. In CF10, it would be nice to do:

{% highlight cfm %}
<cfscript>
lastModified = ArrayFold( arrayOfFiles, '1900-01-01', function( latest, filepath ){
	var lastModified = FileLastModified( filepath );
	return lastModified > latest ? lastModified : latest;
});
</cfscript>
{% endhighlight %}

Ben Nadel has drawn out how you would implement functions like `ArrayFold()`, but I think that it would
be great to see them implemented natively.

<http://www.bennadel.com/blog/2335-ColdFusion-10-Beta-Closures-Function-Expressions-And-Functional-Programming.htm>

Thoughts?