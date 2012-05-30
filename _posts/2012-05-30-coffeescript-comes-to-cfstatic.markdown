---
layout: post
title: CoffeeScript comes to CfStatic
time: 2012-05-30 19:22:00 +00:00
categories:
    - CfStatic
    - Projects
    - ColdFusion
    - JavaScript
    - CoffeeScript
---
[CoffeeScript][1] is a neat language that compiles to JavaScript, saving on keystrokes and readability (and much more besides I'm sure). CfStatic will now compile your CoffeeScript for you. Simply name your files with the `.coffee` extension, and CfStatic will do the rest.<!--more-->

## Bare mode

By default, CoffeeScript will wrap the compiled `.js` in an anonymous function call to ensure no leaked variables:

{% highlight js %}
(function(){
	// your compiled js here
})();
{% endhighlight %}

However, it offers a "bare mode" switch so that the anonymous function wrapper is not included should you really need to have the variables available globally (which they do not recommend). In CfStatic, simply name your CoffeeScript files with the `.bare.coffee` extension to have them compiled in bare mode.

## CfStatic JavaDoc comments in CoffeeScript

If you use CfStatic already, you'll know that your static files need marking up with JavaDoc style comments that look like this:

{% highlight js %}
/**
 * This is my javascript file, it's really neat and does cool stuff
 *
 * @depends /plugins/jquery-timers.js
 *
 */
{% endhighlight %}

Unfortunately, this style of comment is not valid in CoffeeScript. Instead, you will need to markup the comments as follows:

{% highlight js %}
###*
 * This is my coffeescript file, it's really neat and does cool stuff
 *
 * @depends /plugins/jquery-timers.js
 *
###
{% endhighlight %}

## It's still in Beta

This release takes CfStatic to 0.5.0, so still experimental. I have not had a chance to really play around with CoffeeScript but if you do, and encounter problems or have ideas, please submit issues to the [GitHub repository][2].


[1]: http://coffeescript.org/
[2]: https://github.com/DominicWatson/cfstatic