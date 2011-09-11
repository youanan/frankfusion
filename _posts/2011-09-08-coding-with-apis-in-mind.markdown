---
name: coding-with-apis-in-mind
layout: post
title: Coding with APIs in mind
time: 2011-09-08 19:00:00 +01:00
categories:
    - ColdFusion
---

*A fair long while ago, I watched a google lecture on writing APIs and I've been thinking about them a fair amount lately; specifically, how attention to creating intuitive and minimal-work-for-the-user interfaces leads to better code.*<!--more-->

A developer's dream
-------------------
When we mention those three beautiful letters, **API**, we coders tend to get a little excited, especially when it comes in the sentence, *'We'd like you to write a brand new API to allow [some user base] secure access to [some vast dataset]'* or somesuch.

Personally, I start to imagine the simplest possible RESTful interface, a good security model with perhaps some options for xml or json responses, etc. No messy front end code to deal with, no designers complaining about my misplaced pixel, just clean, concise, well documented code.

Living the dream
----------------
This same thinking can and *should* apply to *all* the code that we write. As ColdFusion developers, everytime we sit down to write a **CFC**, we're writing an API. When we're using a ColdFusion framework, be it FuseBox, ColdBox, ModelGlue or FW/1, we're using an API. Even the webapps that we create can be seen as APIs, each url being an API method that takes 0-*n* arguments and passes back some pretty page as a response.

The dream starts to turn muddy as projects expand and perhaps that, by endeavouring to think of even the smallest parts of our applications as micro APIs, and by applying the simple rules for writing good APIs, we can take another step towards code-zion.

Inspired by:
------------

<a href="http://ifttt.com/">If This Then That</a>  
<a href="http://www.youtube.com/watch?v=aAb7hSCtvGw&feature=BFa&list=FLsHC65eq-0Ne1itfT0GfCmg&lf=mh_lolz">Google Lecture on APIs</a>
