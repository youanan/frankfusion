---
layout: post
title: Good enough software
time: 2012-06-20 18:27:00 +00:00
categories:
    - General
    - Agile
---
[Andy Hunt][1] and [Dave Thomas][2] talk about '**Good Enough Software**'' in [The Pragmatic Programmer: From Journeyman to Master][3]. Specifically, they stress the importance of having a definition of 'Good Enough' for any given piece of work that is embarked upon. For instance, this definition will vary wildly when developing an automatic pilot system vs coding a throw away script to screen-scrape a fraternity website's member listing.<!--more-->

Thinking many months later around the subject, I thought it might be useful at work to have a sliding scale drawn up that defines pre-packaged "good enough" standards. These would contribute or guide the [definition of done][4] and might look something like:

1. NASA:
	* The product is fully tested, including unit, integration, system, random and load testing + 3 rounds of customer QA
	* The front-end meets usability standards x, y and z
	* The front-end meets accessibility standards x, y and z
	* All code meets our code formatting guidelines
	* A performance SLA is written up and the product surpasses it by x neurons
	* Technical, client and sales documentation are present and meet our doc standards...
	* etc.
2. ONE OFF SCRIPT
	* It should work with the right input
	* It should *not* fail gracefully (we don't have time)
	* It should *not* check for bad input (we don't have time)
	* etc.

*Clearly, there would be items between these two extremes.*

Has anyone done this or something similar? I'm not sure there is a huge benefit to this, but having a definition of 'Good enough' per programming task or project is definitely a win. Thoughts?


[1]:https://twitter.com/pragmaticandy
[2]:https://twitter.com/pragdave
[3]:http://www.amazon.com/The-Pragmatic-Programmer-Journeyman-ebook/dp/B000SEGEKI/ref=sr_1_1?s=digital-text&ie=UTF8&qid=1340220470&sr=1-1&keywords=pragmatic+programmer
[4]:http://www.scrumalliance.org/articles/105-what-is-definition-of-done-dod