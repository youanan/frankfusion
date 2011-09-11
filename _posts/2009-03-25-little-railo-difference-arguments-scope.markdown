--- 
name: little-railo-difference-arguments-scope
layout: post
title: A little Railo Difference, Arguments scope
time: 2009-03-25 22:06:00 +00:00
categories:
    - ColdFusion
    - Railo
---
Here's a little something I found in Railo that differs from CF and which is seemingly undocumented.<!--more-->

I had need to create a function with no defined arguments. This function called another function, passing whatever arguments it was given to this second function. Before that happened, it checked whether a single, <span style="font-weight: bold;">unnamed</span> argument was being passed. If that was the case, it would give the argument an appropriate name and carry on. The code I had to check for this unnamed argument was:

{% highlight cfm %}
if(StructCount(arguments) EQ 1 and StructKeyExists(arguments, '1')){
//...
}
{% endhighlight %}

This works in CF. In Railo however, if there is a single argument, the condition will always return true whether or not the argument is unnamed. This is because you can refer to arguments in Railo as either arguments[positionInArgArray] or arguments[nameOfArgument] (actually I'm presuming this here so do correct me if I'm wrong). If there is at least one argument, StructKeyExists(arguments, '1') always evaluates true in Railo.

*Edit: Blair McKenzie just pointed out that the arguments scope can be treated as an array in ColdFusion (as well as Railo presumably). The only difference therefore, is that StructKeyExists(arguments, '1') returns true in Railo when using named arguments (with a name other than '1' indeed), it will return false in ColdFusion.*

After a little headscratching I came out with the following solution, which works for both CF and Railo:

{% highlight cfm %}
if( StructCount(arguments) EQ 1 and StructKeyList(arguments) EQ '1' ){
//...
}
{% endhighlight %}

This discovery came on top of issues converting a MS SQL Server Db to MySql, Windows to Linux and IIS to Tomcat (no apache). A bit of an ambitious move perhaps, but a good learning curve :
