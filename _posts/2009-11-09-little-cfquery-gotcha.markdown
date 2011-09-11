--- 
name: little-cfquery-gotcha
layout: post
title: Little cfquery gotcha
time: 2009-11-09 15:20:00 +00:00
categories:
    - ColdFusion
    - SQL
    - Gotchas
---
Here's something I do quite regularly:<!--more-->
{% highlight cfm %}
<cfquery name="myquery" datasource="dsn">
	INSERT INTO foo VALUES ('bar')
	SELECT SCOPE_IDENTITY() as newId
</cfquery>
{% endhighlight %}

This is all good until you do something like:

{% highlight sql %}
<cfquery name="myquery" datasource="dsn">
	INSERT INTO foo SELECT 'bar'
	SELECT SCOPE_IDENTITY() as newId
</cfquery>
<cfset dosomethingwith = myquery.newId />
{% endhighlight %}

For whatever reason, CF craps out here and complains that 'myquery' is not defined. The problem only occurs, as far as I am aware, when you use SELECT syntax in your INSERT statement, something that is often neccessary. The workaround is straightforward, thankfully:

{% highlight sql %}
<cfquery name="myquery" datasource="dsn">
	DECLARE @newId int
	
	INSERT INTO foo SELECT 'bar'
	
	SET @newId = SCOPE_IDENTITY()
	SELECT @newId as newId
</cfquery>
<cfset dosomethingwith = myquery.newId />
{% endhighlight %}

Thanks to <a href="http://fusionteam.co.uk/blog/">Neil Smith</a> for the work around; I'd been using a separate query with @@identity for some time until today - far from good.

Dom
