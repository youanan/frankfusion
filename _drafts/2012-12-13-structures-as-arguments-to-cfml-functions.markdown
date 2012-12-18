---
layout: post
title: Structures as arguments to CFML functions
time: 2012-12-13 18:07:00 +00:00
categories:
    - ColdFusion
---

To improve the readability of calling code in JavaScript, we are encouraged to use objects as arguments to functions, especially when those functions require more than a couple of arguments (citation needed). In CFML however, I am not sure that this is sage advice.<!--more-->

# The JavaScript example

Consider the following two javascript snippets, you may find that the second example is easier to read in terms of the call to `exec`:

{% highlight js %}
function exec( method, priority, throwable ){
	// do stuff
};

// ...

exec(
	 "fallback"
	, 30
	, true
);
{% endhighlight %}

{% highlight js %}
function exec( options ){
	// do stuff
};

// ...

exec({
	  method    = "fallback"
	, priority  = 30
	, throwable = true
});
{% endhighlight %}

The second example improves the readability of the function call by forcing the individual arguments to be named. In doing so however, it sacrifices a little readability in the function declaration itself as it is not immediately obvious what arguments are expected. This sacrifice may be worthwhile because the method is defined only once, while there may be many more calls to the method. The obscurity of the single object argument could be made up for with one single point of documentation.

# Why CFML is different

With CFML, and various other languages, we do not need to sacrifice the readability of either the calling code *or* the function declaration. This is because we have the ability to use *named* arguments in function calls:

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

Another benefit that we have is the ability to supply default values for arguments, declare arguments as optional and to supply any additional useful metadata right in the declaration.

With that in mind, consider the above example but with using a single structure argument:

{% highlight cfm %}
<cffunction name="exec" access="public" returntype="string" output="false">
  <cfargument name="options" type="struct" required="true" />

  <cfparam name="arguments.options.method"    type="string"                  />
  <cfparam name="arguments.options.priority"  type="numeric" default="10"    />
  <cfparam name="arguments.options.throwable" type="boolean" default="false" />

	...
</cffunction>

...

<cfset result = exec( {
   	  method    = "fallback"
  	, priority  = 1
  	, throwable = true
} ) />
{% endhighlight %}

Using `cfparam` here maintains the defensive capabilities of the declared arguments but has the following downsides:

* There is more, harder to read, code. i.e. arguments.options.*argumentname*?!
* Errors thrown for missing arguments will not be as informative as native missing argument errors
* We will not be able to automatically generate documentation from the metadata of your function

# How about passing existing structures to functions?

In a word, *argumentCollection*. Using it *may* lose a little readability but will be indispensible in other scenarios, e.g.

{% highlight cfm %}
<cffunction name="doLogin" access="public" returntype="boolean" output="false">
  <cfargument name="emailAddress" type="string" required="false" default="" />
  <cfargument name="secret"       type="string" required="false" default="" />
  <cfargument name="token"        type="string" required="false" default="" />

  <!--- etc. --->
</cffunction>

<cfset loggedIn = doLogin( argumentCollection = form ) />
{% endhighlight %}

The following code is equally defensive as the code above, but far more long winded by not using argumentCollection because it has to ensure the presense of each field before making the method call:

{% highlight cfm %}
<cfparam name="form.emailAddress" default="" />
<cfparam name="form.secret"       default="" />
<cfparam name="form.token"        default="" />

<cfset loggedIn = doLogin(
    emailAddress = form.emailAddress
  , secret       = form.secret
  , token        = form.token
) />
{% endhighlight %}


