---
layout: post
title: The Law of Demeter
time: 2012-07-10 18:13:00 +00:00
categories:
    - ColdFusion
    - Architecture
---
The [Law of Demeter][lod] is a pattern guideline aimed at object oriented programming. It states that objects should know as little about each other as possible, and only talk directly with their close "friends", minimizing the spread of logic knowledge through the system.

Recently coding in ColdFusion against a .NET web service gifted me a great illustration of the thoughts behind Demeter's law so I thought I'd share it here.<!--more-->

##How it might apply to CFML

>Spies, dissidents, revolutionaries, and such are often organized into small groups of people called cells. Although individuals in each cell may know each other, they have no knowledge of those in other cells. If one cell is discovered, no amount of truth serim will reveal the names of others outside the cell. Eliminiting interactions between cells protects everyone.
>
>We feel that this is a good princliple to apply to coding as well...
>
>&mdash; <cite>[Andy Hunt][ah] and [Dave Thomas][dt] (1999), [The Pragmatic Programmer: From Journeyman to Master][tppfjtm]</cite>

In CFML applications, we might think of a *cell* as some group of components who couldn't do their job without knowing of each other's presence. An example of this might be a *Service*, *Bean* and *DAO* for a particular database entity.

In this case, the service object is our cell contact. With the Law of Demeter in mind, any public interactions with the service should not reveal the DAO or the Bean. In other words, arguments passed to the service's public methods, and values returned from them, should not be instances of the bean or DAO. A method in our service object might then look like this (our trio here represent a shopping cart item, simplified for example):

{% highlight cfm %}
<cffunction name="saveCartItem" access="public" returntype="numeric" output="false">
	<cfargument name="userId"   type="numeric" required="true" />
	<cfargument name="itemId"   type="numeric" required="true" />
	<cfargument name="quantity" type="numeric" required="true" />

	<cfscript>
		var cartItem   = _newBean( argumentCollection = arguments );
		var cartItemId = 0;

		cartItem.validate( throwOnError = true );

		cartItemId = _getDao().save( cartItem );

		return cartItemId;
	</cfscript>
</cffunction>
{% endhighlight %}

*Note, the methods `_newBean()` and `_getDao()` would be private methods of the service. This is fictional code.*

There are, of course, a million and one ways to code a data model layer and I am *not* saying that this is *the right* way to do it. I happen to like this sort of approach and hope that it serves as a good example of the Law of Demeter (would love to hear your opinions).

##The web service (an example of how things can get bad when the law is ignored)

In our CFML example above, we wouldn't be overly upset if we encountered a Service object that expected a bean as an argument, it's all code within the same application after all. I think it would be better not doing that, but all the same.

However, when you are creating a Web Service that will be consumed by third parties, the paradigm takes on more significance.

The data model that this API exposes consists of individuals. Individuals may have multiple emails, telephone numbers and all manner of other attributes. The API looks like this:

	Individual getIndividual( int individualId, enum childItems );
	Individual saveIndividual( Individual individual, enum childItems );

So, in order to create a new Individual from my third party application I need to:

1. Create an instance of their domain specific `Individual` object.
2. Set its properties (some are read only, I've no way of knowing)
3. Pass this object to the saveIndividual() method

Besides the pain of creating a new instance of the Individual class from ColdFusion (I'll blog about that soon), you can clearly see that, as a client of the API, I'm having to do far too much and know far too much. This may have been more user friendly:

	saveIndividual( int individualId=0, string firstname, string lastname, ..etc. );

But it gets worse. To add an email address to a user, I need to:

1. get the individual, calling getIndividual() and stating that I also want the emails child item
2. get the emails from the returned Individual object (using its method, `getEmails()`)
3. get an instance of an Email object
4. populate its fields using its setter methods (again, some are read only, the docs didn't reveal much)
5. somehow push this new email onto the email array I retrieved from the Individual object
6. save the individual using the SaveIndividual() method, ensuring that the 'Emails' childItems enum is set

A more user friendly version might be:

	saveEmail( int individualId, int emailId=0, string emailAddress ... etc. )

###A benefit to the approach provided by the web service

One benefit is that the developers have to write far fewer methods for me to interact with. Perhaps time was a major issue contributing to the architectural choices made. Either way, the effect on me, the client, is clearly detrimental.

##Wrapping up

Hopefully, the example above illustrates the ill-effects of 'going against' the Law of Demeter. I think that we should treat all modules of code that we write as if they were remote APIs, forcing ourselves to pay stricter attention to users of our code (even when it is likely only ourselves).

In other words, *do a little extra work to ensure that all users of your code have to do as little work as possible.*

[lod]:http://en.wikipedia.org/wiki/Law_of_Demeter
[ah]:https://twitter.com/pragmaticandy
[dt]:https://twitter.com/pragdave
[tppfjtm]:http://www.amazon.com/The-Pragmatic-Programmer-Journeyman-ebook/dp/B000SEGEKI/ref=sr_1_1?s=digital-text&ie=UTF8&qid=1340220470&sr=1-1&keywords=pragmatic+programmer