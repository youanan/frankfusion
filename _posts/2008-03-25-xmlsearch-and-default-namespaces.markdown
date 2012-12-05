---
name: xmlsearch-and-default-namespaces
layout: post
title: XmlSearch and default Namespaces
time: 2008-03-25 22:58:00 +00:00
categories:
    - ColdFusion
    - XML
    - Projects
---
This pops up frequently enough on the cf-talk list and around the blogosphere. To get an idea of the problem you can read this blog post that usually gets quoted as the answer:<!--more-->

<a href="http://www.talkingtree.com/blog/index.cfm/2005/11/18/XmlSearchNoNameNamespace">http://www.talkingtree.com/blog/index.cfm/2005/11/18/XmlSearchNoNameNamespace</a>

If you were keen, you may have noted the comments that refer to the technique not working when there are multiple, nested default namespaces. Take the following Xml for example:

{% highlight xml %}
<?xml version="1.0"?>
<foo xmlns="http://dominicwatson.co.uk/foo/">
	<foochild>
		<bar xmlns="http://dominicwatson.co.uk/bar/">
			<barchild>lamb</barchild>
		</bar>
	</foochild>
</foo>
{% endhighlight %}

Doing `XmlSearch(theXml, '//:foochild')` will return results but `XmlSearch(theXml, '//:barchild')` will not. There are ways around this using XPath but they can become very cumbersome if your XPath is anything like complicated.

The source of the problem is ColdFusion's pretty poor provision of XPath goodiness. Other languages provide XPath querying methods that take a namespace mapping object as an argument. This allows you to define custom prefixes to use with the namespace URIs in your XPath queries. Here is a .net blog post as an example:

<a href="http://weblogs.asp.net/wallen/archive/2003/04/02/4725.aspx">http://weblogs.asp.net/wallen/archive/2003/04/02/4725.aspx</a>

Enter BetterXml 1.0!
--------------------
In version 1 of my BetterXml components, just released, I have added the ability to add custom prefix mappings to Xml documents in ColdFusion (much in the way other languages allow). Using a betterXml object loaded with the xml above, we can now do something like this:

{% highlight cfm %}<cfscript>
    oXml.MapNamespace('http://dominicwatson.co.uk/foo/', 'f');
    oXml.MapNamespace('http://dominicwatson.co.uk/bar/', 'b');
    results = oXml.Search('//b:barchild);
</cfscript>{% endhighlight %}

Problem solved! You can download the latest version of the project on riaforge:

<a href="http://betterxml.riaforge.org/">http://betterXml.riaforge.org/</a>
