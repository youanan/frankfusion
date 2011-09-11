--- 
name: undefined-array-elements
layout: post
title: Undefined array elements
time: 2008-02-18 20:04:00 +00:00
categories:
    - ColdFusion
---
This seems to come up every now and again on the house of Fusion cf-talk list. Basically, arrays can contain undefined values which cause all sorts of problems. Here's a piece of code that demonstrates the problem:

{% highlight cfm %}<cfset myArray = ArrayNew(1)>
<cfset myArray[1] = 'foo'>
<cfset myArray[3] = 'bar'>
<cfloop from="1" to="#ArrayLen(myArray)#" index="i">
	<cfoutput>#myArray[i]#,</cfoutput>
</cfloop>{% endhighlight %}

The trouble is that myArray\[2\] is undefined. Thinking back to the article on the underlying java methods of the array object (see <a hrref="/2007/09/coldfusion-objects-are-java-objects.html">coldfusion objects are java objects</a>), I came up with this, I think elegent, solution to the problem:

{% highlight cfm %}<cfscript>
	function DeleteUndefinedArrayElements(arr){
		var aTemp = ArrayNew(1);
		aTemp[2] = '';
		ArrayDeleteAt(aTemp,2);

		arr.removeAll(aTemp);
		return arr;
	}
</cfscript>{% endhighlight %}

So now we can rewrite our original example as:
{% highlight cfm %}<cfset myArray = ArrayNew(1)>
<cfset myArray[1] = 'foo'>
<cfset myArray[3] = 'bar'>
<cfset myArray = DeleteUndefinedArrayElements(myArray)>
<cfloop from="1" to="#ArrayLen(myArray)#" index="i">
	<cfoutput>#myArray[i]#,</cfoutput>
</cfloop>
{% endhighlight %}

And there we have it. Usefully, the original array remains untouched due to arrays being the only ColdFusion objects not passed by reference. This means that you can get a copy of the array without undefined elements should you need the original intact.

Of course, it would be better to fix the problem at the source, i.e. stop the undefined elements being 'created' in the first place. This may not always be possible though, so a solution like this might come in handy.
