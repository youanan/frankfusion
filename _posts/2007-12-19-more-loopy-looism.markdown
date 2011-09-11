--- 
name: more-loopy-looism
layout: post
title: More loopy looism
time: 2007-12-19 19:48:00 +00:00
categories:
    - ColdFusion
    - Gotchas
---
Here's a little thing I was forced to realise after a far too high profile site when slightly wrong (in a far too big way).<!--more-->

*Looping a query inside a loop of another query changes the way you can refer to the outer-loops current row.* Running the following code demonstrates this:

{% highlight cfm %}<cfscript>
	qry_foo = QueryNew('foo');
	QueryAddRow(qry_foo, 3);
	for(i=1; i LTE 3; i=i+1){
		QuerySetCell(qry_foo,'foo',"foo #i#",i);
	}
	qry_bar = QueryNew("bar");
	QueryAddRow(qry_bar, 10);
	for(i=1; i LTE 10; i=i+1){
		QuerySetCell(qry_bar,'bar',"bar #i#",i);
	}
</cfscript>
<cfoutput>
	<ul>
		<cfloop query="qry_foo">
			<li>#qry_foo.foo#
				<ul>
					<cfloop query="qry_bar">
						 <li>#qry_foo.foo#</li>
					</cfloop>
				</ul>
			</li>
		</cfloop>
	</ul>
</cfoutput>{% endhighlight %}

The problem is that you cannot access the current row of the qry_foo query when inside the loop of qry_bar in this way. Instead, you would have to use:

{% highlight cfm %}qry_foo.foo[qry_foo.currentRow]{% endhighlight %}

Does anyone else find this bizarre?
