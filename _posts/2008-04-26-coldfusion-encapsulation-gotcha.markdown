--- 
name: coldfusion-encapsulation-gotcha
layout: post
title: ColdFusion Encapsulation Gotcha
time: 2008-04-26 13:42:00 +01:00
categories:
    - ColdFusion
    - Gotchas
---
*Good object design dictates that we encapsulate our objects, hiding direct access to object properties from outside code. Access to the values of these properties is often granted to outside code with the use of 'getter' methods.*<!--more-->

The following, useless, component **appears** to encapsulate its 'foo' property using a getter method but, as we shall see shortly, does nothing of the kind:

{% highlight cfm %}
<cfcomponent output="false" displayname="foobar">
   <cfset variables.foo = StructNew()>
   <cfset variables.foo.bar = "Hello world">

   <cffunction name="GetFoo">
      <cfreturn variables.foo>
   </cffunction>
</cfcomponent>
{% endhighlight %}

Why is that not encapsulated?
-----------------------------

The reason the 'foo' property is not encapsulated here is that ColdFusion passes certain variable types by *reference* rather than *value*. So when we return the variables.foo structure we are actually returning a reference to the original data in memory rather than the data itself.

The following code demonstrates what effect this has:

{% highlight cfm %}
<h1>Encapsulation gotcha example</h1>
<cfset oFoo = CreateObject('component', 'foobar')><!--- the component defined above --->

<h2> Before:</h2>
<cfdump var="#oFoo.GetFoo()#">

<cfset fooReference = oFoo.GetFoo()>
<cfset fooReference.foo = "Wayne's world, excellent">

<h2> After:</h2>
<cfdump var="#oFoo.GetFoo()#">
{% endhighlight %}

If the 'foo' property were properly encapsulated here, both dumps would show the same thing. However, because we have a reference to the original data in the variables 'fooReference', we can make changes to the data directly (breaking encapsulation).

What to do about it?
--------------------

It is important to note here that passing variables by reference saves memory - it is certainly NOT a bad thing! However, if encapsulation is more important to you, you can use the **Duplicate()** method to return a reference to a *copy* of the data which has the effect of returning the data itself:

{% highlight cfm %}
<cffunction name="GetFoo">
   <cfreturn Duplicate(variables.foo)/>
</cffunction>
{% endhighlight %}

Final note
----------

ColdFusion passes **queries**, **structures** and **external objects** such as COM objects and CFC instances by *reference*.

**Strings** (including numeric values) and **arrays** are passed by *value* and do not need to be 'duplicated' in this way.

Here is a link to an Adobe livedocs page that talks about passing variables to and from functions in detail:

<http://livedocs.adobe.com/coldfusion/7/htmldocs/wwhelp/wwhimpl/common/html/wwhelp.htm?context=ColdFusion_Documentation&amp;file=00001008.htm>
