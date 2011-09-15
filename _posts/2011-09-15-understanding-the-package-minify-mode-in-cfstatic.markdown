---
layout: post
title: Understanding the package minify mode in CfStatic
time: 2011-09-15 18:57:00 +00:00
categories:
    - Projects
    - ColdFusion
    - CSS
    - JavaScript
    - CfStatic
---

*Massive thanks to the folks at <http://www.cfhour.com/> for featuring CfStatic on their podcast. Dead chuffed. One thing that came up was that the minify modes aren't documented clearly enough. This post hopes to address that and hopefully give some insight into one of the core ideas behind CfStatic.*<!--more-->

It's not just about minification
--------------------------------

It's also about concatenation. Bundling up multiple static files into a single file saves http requests, generally speeding up your pages. One approach is to minify your entire js/css into a single file for the whole site (min.css and min.js). For a small site, this can make a lot of sense and using the **all** minify mode will do this for you.

However, what happens when you have a print.css? If you bundle all your css into a single file, you won't be able to separate it out into a print.css with a media type of 'print'. Another scenario, especially common with larger sites, is that you may have some javascript or css that really doesn't want to be included in every page, perhaps even only ever included in a single page.

Organizing your files in 'packages'
-----------------------------------

To handle this problem, while still taking advantage of concatenating files, CfStatic uses the concept of packages and the minifiy mode **package**. A package equates to a single folder. All files under a folder are part of that package and when you use the **package** minify mode, all files in a folder get minified together.

The following folder structure aims to show a sensible useage of the idea:

{% highlight sh %}
css/
	core/
		base.css
		grid.css
		layout.css
		reset.css
		typography.css
	print/
		reset.css
		layout.css
	ie/
		ie.css
	pages/
		about/
			about.css
{% endhighlight %}

If you put those folders through CfMinify in **package** mode, you'll get the following files:

{% highlight sh %}
min/
	core.min.css
	print.min.css
	ie.min.css
	pages.about.min.css
{% endhighlight %}

So now, you could do:


**someGlobal.cfm or cfc**
{% highlight cfm %}
<cfscript>
    cfstatic.include('/css/core/')                  // include the whole core folder
            .include('/css/print/layout.css')       // in this case, the entire print.min.css will be included because layout.css lives inside it
            .include('/css/ie/');                   // include all the ie stylesheets
</cfscript>
{% endhighlight %}


**AboutPage.cfm (or somesuch)**
{% highlight cfm %}
<cfscript>
    cfstatic.include('/css/pages/about/about.css'); // only included in the about page
</cfscript>
{% endhighlight %}

Including static files dynamically
----------------------------------
In your global layout file (or somesuch global bit of code), you might do:

{% highlight cfm %}
<cfscript>
    cfstatic.include('/js/pages/#siteSection#/')
            .include('/js/pages/#siteSection#/#sitePage#/');
</cfscript>
{% endhighlight %}

If you attempt to include a file or directory that doesn't exist, CfStatic won't complain. This means you can do something like the above and have section and page specific code included simply by putting it in appropriately named folders.

Reminder, importance of @depends
--------------------------------
When cfstatic concatenates your files, it needs to know the order to do it in and hence the importance of the @depends tag. Without it, your files will be concatenated alphabetically (which could spell disaster for JavaScript files).

Hopefully that explains things, let me know if it doesn't and I'll try again!