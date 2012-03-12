---
layout: post
title: Avoiding JavaScript Entropy
time: 2012-03-08 21:16:00 +00:00
categories:
    - JavaScript
---
I am always looking at ways to prevent JavaScript from getting out of control in the applications that I have worked on,
CfStatic being an effort in that direction. With JavaScript awareness and sophistication on the rise, I thought
I'd share my current thoughts, hopefully raising a discussion on the topic.<!--more-->

In this post, I'm going to focus on something I've been wanting to articulate for a while now, nameley: keeping
separation between our JavaScript and server side applications. I believe that by thinking in this vein, our
code will be already on the way to being controllable - by *not* thinking this way, I believe that we risk perpetual
spaghetti.

##JavaScript is not part of your server-side application
Your HTML/CSS/JavaScript, whether output by a server-side technology (ColdFusion, PHP, ASP.net etc.) or served
from a CDN, should not be thought of as an extension of that server-side application. Instead, I think that it 
is worth while thinking of the two as independant applications that can talk to each other through some agreed API.

### One page front-ends
The simplest examples of this separation are single page javascript applications. Key features are:

* HTML, CSS and JavaScript all served from a static webserver / CDN, with no help from server-side application
* Client talks to the server via RESTful ajax calls
* There is one version of the client application that does not need to change from request to request

It is easy to visualize this scenario as two applications talking to each other over an agreed API. Maintaining
control of the JavaScript code still takes discipline, but the path is very clear.

### Dynamically produced front-ends
A more common scenario is one in which the server-side application produces dynamic HTML and possibly dynamic
JavaScript, based on the current request. Key features:

* There are many, perhaps endless, versions of the client application
* Server will provide data to the client embedded in the HTML and/or JavaScript code
* The server / client may additionaly communicate via AJAX calls

Visualizing this scenario as two separate applications can be a little trickier and I think that 
a large part of that is down to the multiple, dynamic versions of the client side application.
