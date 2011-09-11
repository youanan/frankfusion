--- 
name: bunnymoveears-controlling-your-nabaztag
layout: post
title: bunny.moveEars( ), controlling your Nabaztag from ColdFusion
time: 2010-12-23 11:59:00 +00:00
categories:
    - ColdFusion
    - Projects
---

Last week my boss unveiled the office <a href="http://www.nabaztag.com/">Nabaztag</a>, Natalina. This super bunny will be programmed to alert us of various system failures and notifications, l33t. All we have to do is program it.

<img alt="Nabaztag:tag" src="http://www.faberludens.com.br/files/nabaztag_or.jpg" style="margin-left: 200px; width: 100px;" title="Nabaztag:tag" />

The bunny works by connecting to a central server that pushes instructions to it. Instructions can be sent to the server through a <a href="http://doc.nabaztag.com/api/home.html">published API</a>. So all we have to do is wrap that API in a lovely ColdFusion component and make calls to an instance of our component within our code.

The component is now a 'project' on Riaforge: <http://cfbunny.riaforge.org>. And here's a quick and silly demo on YouTube:

<iframe class="youtube-player" frameborder="0" height="305" src="http://www.youtube.com/embed/n8UYTzEXDAs" title="YouTube video player" type="text/html" width="500"></iframe>

Merry Christmas, Jingle Jingle
