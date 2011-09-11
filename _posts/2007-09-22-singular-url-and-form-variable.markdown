--- 
name: singular-url-and-form-variable
layout: post
title: Singular URL and FORM variable
time: 2007-09-22 11:21:00 +01:00
categories:
    - ColdFusion
    - Java
---

After reading this discussion on IsDefined() vs StructKeyExists(), I got to thinking about how one might use the underlying Java methods of ColdFusion structures to combine the URL and FORM variables efficiently (it is related, really).

A quick inspection of the java docs for java.util.Hashtable turned up the putAll() method. With it, you can 'put' one struct into another, overwriting any matching keys.

So, to very quickly and elegantly combine the form and url scopes into a request variable called 'args', we can do:

{% highlight cfm %}<cfset request.args = StructNew()>
<cfset request.args.putAll(url)>
<cfset request.args.putAll(form)>{% endhighlight %}

Et voila!
