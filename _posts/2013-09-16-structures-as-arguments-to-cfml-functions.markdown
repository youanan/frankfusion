---
layout: post
title: Structures as arguments to CFML functions
time: 2013-09-06 07:56:00 +01:00
categories:
    - ColdFusion
---

To improve the readability of calling code in JavaScript, we are encouraged to use objects as arguments to functions, especially when those functions require more than a couple of arguments. I've seen this approach used in CFML code however, and I am not sure that the same advice should apply.<!--more-->

# The JavaScript example

Consider the following two javascript snippets, you may find that the second example is easier to read in terms of the *call* to `exec`:

{% highlight js %}
// good clear declaratoin
function exec( method, priority, throwable ){
	// do stuff
};

// ...
// not so clear call - what does 30 and true relate to?
exec(
	 "fallback"
	, 30
	, true
);
{% endhighlight %}

{% highlight js %}
// not so clear function definition
function exec( options ){
	// do stuff
};

// ...
// clear method call, I can see what all the arguments mean
exec({
	  method    : "fallback"
	, priority  : 30
	, throwable : true
});
{% endhighlight %}


{% highlight js %}
/**
 * Options:
 * - method    : String, name of the method to execute
 * - priority  : Integer, priority for the execution...
 * - throwable : Boolean, if false, all thrown errors will be trapped
 */
function exec( options ){
  // do stuff
};
{% endhighlight %}

# Why CFML is different

With CFML, we do not need to sacrifice the readability of either the calling code *or* the function declaration. This is because we have the ability to use *named* arguments in function *calls* as well as *declarations*:

{% highlight cfm %}
<cffunction name="exec" access="public" returntype="void" output="false">
  <cfargument name="method"    type="string"  required="true"                  />
  <cfargument name="priority"  type="numeric" required="false" default="10"    />
  <cfargument name="throwable" type="boolean" required="false" default="false" />

	...
</cffunction>

...

<cfset result = exec(
   	  method    = "fallback"
  	, priority  = 1
  	, throwable = true
) />
{% endhighlight %}

We have a clear, self-documenting function *declaration* and also a clear function *call*.

# How about passing existing structures to functions?

One seeming advantage of the single structure argument approach is that existing collections of arguments can be passed easily, i.e. `someFunction( options = form )`. However, CFML gives us `argumentCollection` for this very purpose:

{% highlight cfm %}
<cffunction name="doLogin" access="public" returntype="boolean" output="false">
  <cfargument name="emailAddress" type="string" required="false" default="" />
  <cfargument name="secret"       type="string" required="false" default="" />
  <cfargument name="token"        type="string" required="false" default="" />

  <!--- etc. --->
</cffunction>

<cfset loggedIn = doLogin( argumentCollection = form ) />
{% endhighlight %}

While the function call may be more readable by using named arguments here, this approach can be indispensible and indeed necessary, particularly in more dynamic scenarios.

# Summary

Before defining a function with a single argument that is a structure of options, think twice. Would that code be more readable by having individual, self-documenting arguments for each of those options? If so, make it so! Anyone have opinions to the contrary?