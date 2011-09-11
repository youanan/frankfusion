--- 
name: tidy-autosuggesting-solution
layout: post
title: A tidy autosuggesting solution
time: 2008-04-03 01:23:00 +01:00
categories:
    - ColdFusion
    - JavaScript
---
*A question was asked on the CF-Talk list for which I did not know the answer. I chimed in anyhow and got investigating. In the process, I learned a whole load more javascript as well as all sorts of interesting things about CF8's ajax form fun and, in the end, I solved the problem consicely :)*

The problem
-----------

>"I have a form field that autosuggests an email address, however it only works with one email address at a time. How would I go
>about setting it up so that when a user starts typing the autosuggest will append the emailaddress with a semicolon and then 
>allow the user to search for anotheraddress in the same field?"

The bottom line, unless I am misguided, is that it can't be done with the ColdFusion form tags. An *autosuggestdelimiters* attribute would be a really useful addition to the cfinput tag but for now, it doesn't exist.

Hunting for the solution
------------------------

I had a look at the javascript that an autosuggest box produces and, after going crosseyed, found myself looking at the <a href="http://developer.yahoo.com/yui/docs/YAHOO.widget.AutoComplete.html">YAHOO.widget.autocomplete</a> documentation (on which ColdFusion bases its autocomplete functionality). A quick look down the list of properties uncovered the *delimChar* property; 'surely not' I thought - surely. Set the *delimChar* property to the list delimiter you want and the auto suggest will work exactly as asked.

The solution
------------

After some experimentation I came up with a single, tiny, javascript function to add in the delimiter to the autosuggest control:

{% highlight JavaScript %}SetDelimiter = function(elId, delim){
   if(!ColdFusion.objectCache[elId])
      alert("Error adding delimiter: Auto suggest item, '" + elId + "', could not be found");
   else
      ColdFusion.objectCache[elId].delimChar = delim;
}{% endhighlight %}

This function needs to be run at some point after the page and the ajax objects have been loaded. I have it working at the moment by calling it when the input receives focus which clearly isn't the best but isn't going to hurt anyone (can someone tell me where it should go?)

Here is some CF code to demonstrate:

{% highlight cfm %}
<script type="text/javascript" src="SetAutoSuggestDelimiter.js"></script>
<cfform action="" method="post">
	<cfinput name="person" autosuggest="cfc:foo.bar({cfautosuggestvalue})" onfocus="SetDelimiter('person',';')"/>
</cfform>
{% endhighlight %}

Time for bed!
