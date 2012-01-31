---
layout: post
title: CfStatic - embedding css images
time: 2012-01-31 19:08:00 +00:00
categories:
    - Projects
    - CfStatic
    - CSS
---
*I have just tagged a minor release in CfStatic, taking it to 0.3.0. The release includes a tidy feature that allows you to embed CSS images directly in your CSS files...*<!--more-->

While stealing some CSS tips through Chrome's web developer tools, from a site I can't now remember, I stumbled upon a trick that I had not seen or heard of before (a common occurence). Namely, the ability to create data URIs that might be used to embed images directly in HTML or CSS:

<http://en.wikipedia.org/wiki/Data_URI_scheme>

I figured that this would be a snap to implement with CfStatic and I was not wrong. The only change to the API is that of an extra constructor argument, `embeddCssImages`. This argument can be set to either `none`, `all` or a regular expression selecting images that you would like to embed. The regular expression option was added so that you might easily exclude all PNGs or other large images that would bloat your CSS file and might be better served directly. The inclusion is entirely your choice.

For example, to have CfStatic embed only gif images or images that reside in the 'embeddable' directory, you might do:

{% highlight cfm %}
<cfscript>
	application.cfStatic = CreateObject('component', 'org.CfStatic.CfStatic').init(
		  staticDirectory = ExpandPath('./media')
		, staticUrl       = 'http://media.mysite.com/'
		, embedCssImages  = '^.+(\.gif$|embeddable/.+)$'
	);
</cfscript>
{% endhighlight %}

Happy coding.