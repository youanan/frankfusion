---
name: excanvas-and-jquery-beauty-tips
layout: post
title: ExCanvas and jQuery BeautyTips
time: 2011-09-02 11:29:00 +01:00
categories:
    - JavaScript
    - JQuery
    - Gotchas
---

Today, I encountered a problem using the jQuery BeautyTips plugin with IE8. I wanted to show a beauty tip as soon as the page loaded but the bubble would not render.

Normally, I do not use `$(document).ready()`, preferring instead just to drop the js at the bottom of the page. I suspected that this might be the problem here, excanvas not being loaded before the page was done. I was almost right. In fact, excanvas is not ready until **window.onload**.

So, if you want to show a jQuery Beauty Tip in IE when the page loads (or any other canvas operation for that matter), do:

{% highlight js %}
$(window).load(function(){
	$('#someselector').bt().btOn();
});
{% endhighlight %}
