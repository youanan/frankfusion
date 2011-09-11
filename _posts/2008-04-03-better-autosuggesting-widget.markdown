--- 
name: better-autosuggesting-widget
layout: post
title: A better autosuggesting widget
time: 2008-04-03 15:36:00 +01:00
categories:
    - ColdFusion
    - JavaScript
    - Projects
---

Following on from my previous post about extending the cfinput auto-suggest functionality (<a href="/2008/04/tidy-autosuggesting-solution.html">a tidy autosuggesting solution</a>), I decided that my solution was too narrow. I have now written a custom tag that allows access to all the useful properties of the auto-suggest widget.<!--more-->

The tag can be found @ <a href="http://betterautosuggest.riaforge.org/">http://betterautosuggest.riaforge.org/</a>

Here is a quick and slim example of how it can be used:

{% highlight cfm %}<cfimport taglib="myCustomTagsFolder" prefix="custom">

<cfform action="" method="post">
   <custom:betterautosuggest
           name="fruit"
           autosuggest="apple,banana,lemon,lime,mango,orange,peach,pear"
           delimchar=";"/>
</cfform>{% endhighlight %}

Enjoy :)
