---
layout: post
title: IO and The Princess Bride
time: 2012-01-05 18:44:00 +00:00
categories:
    - Seven Languages in Seven Weeks
    - Io
---

I've been working my way through <a href="http://pragprog.com/book/btlang/seven-languages-in-seven-weeks">Seven Languages in Seven Weeks</a> and loving it so far. This evening, on the train, I got a little stuck on one of the examples...<!--more-->

This was Io (<a href="http://iolanguage.com">IoLanguage</a> for Googlers) Day 2, and an example of reflection and delayed evaluation. Perhaps cleverly, Mr. Tate does not give the full source of his example, leaving the reader to figure out the rest. He first provides the following snippet to create an `unless` method:

{% highlight io %}
unless := method(
	(call sender doMessage(call message argAt(0))) ifFalse(
	 call sender doMessage(call message argAt(1))) ifTrue(
	 call sender doMessage(call message argAt(2))) 
)
{% endhighlight %}

Then, he simply says, "Say the object `westley` sends the message 
{% highlight io %}
princessButtercup unless(trueLove, ("It is false" println), ("It is true" println))
{% endhighlight %}

This had me stumped for a while but after battling a little, and going back and reading the chapter again (and again), I came up with the following working code:

{% highlight io %}
westley := Object clone
westley trueLove := true
westley princessButtercup := method( unless(trueLove, "You lie!" println, "True love!" println))
westley princessButtercup
{% endhighlight %}

I *think* that's what Bruce meant; either way, it certainly helped me understand the flow of the `unless` method. I would love to know the thoughts of any iolanguage devs / people who have worked through the book.