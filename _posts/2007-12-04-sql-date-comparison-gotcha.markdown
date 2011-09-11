--- 
name: sql-date-comparison-gotcha
layout: post
title: SQL Date Comparison Gotcha
time: 2007-12-04 16:14:00 +00:00
categories:
    - SQL
---
Just a little thing to remind me to use DateDiff() instead of regular operators when comparing dates. Here's why:

Say you have a deadline date stored in a db and you need to see if today is passed the deadline. If you do this:

{% highlight sql %}
DECLARE @deadline smalldatetime
SET @deadline = '2007-12-04'

IF(GetDate() <= @deadline)
PRINT 'Deadline not passed'
ELSE
PRINT 'Deadline passed'
{% endhighlight %}

You will get 'Deadline passed' if the deadline is today which is not as you might expect. The reason for this is that GetDate() also returns the time and the operator takes this into consideration, i.e. the following is true 2007-12-04 16:19 > 2007-12-04 00:00.

So, instead, when comparing the difference in *days* one should *always* use:

{% highlight sql %}
IF(DateDiff(d, GetDate(), @deadline) >= 0) 
PRINT 'Deadline not passed'
ELSE
PRINT 'Deadline passed'
{% endhighlight %}

Incidentally, the same is true for ColdFusion and the DateDiff ColdFusion function works in the same way.
