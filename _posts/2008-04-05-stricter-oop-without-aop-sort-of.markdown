--- 
name: stricter-oop-without-aop-sort-of
layout: post
title: Stricter OOP without AOP! Sort of ;)
time: 2008-04-05 05:21:00 +01:00
categories:
    - ColdFusion
---
*I've been playing around with the idea of forcing my components not to add or remove variables from their 'variables' scope, other than when instantiated. Its something I'd like not to be possible and I'd like a ColdFusion error if it happens. I blogged my first effort at cracking it here*:

<a href="/2008/03/stricter-oop-using-aop.html">Stricter OOP using AOP!</a>

The biggest downside to this was complexity of implementation. While I don't mind hidden complexity, using AOP meant that I would have to explicitly declare that each of my objects was wanting to use this feature/'aspect' - the effort in doing so using ColdSpring far outweighed any benefit. This was a 'global aspect' that would be best placed in a global base class if possible.

So, how to wrap all of a component's methods automatically using a base class that it extended? The concept is similar to AOP but it would lack the hassle of having to apply AOP to my model. Of course, the hassle would be figuring out how to do it!

A very long and steep-learning-curved night later and I have a working version. It borrows from the concept used in ColdSpring's AOP implementation of creating a temporary file in order to create component methods on the fly (mixins). The use is slightly different however. The following is an attempt to explain the base class constructor as concicely as possible:

1. Store copy of self in a state variable.
2. Create temporary cfc file with methods of the same name as those in this component. The body of these methods have a single line that calls a 'CallMethod()' method, passing the method name and any args as arguments.
3. Instantiate temporary cfc and delete the file.
4. Overwrite the original component methods with those in the temporary component
5. Removed methods used in this process from the component
6. The result is a component that appears unchanged (from the outside) but that has each of its methods replaced with a wrapper that invokes the samed named method on a copy of the original component.

Once this component has been written, implementation couldn't be much easier. Simply extend the component and call it's constructor from within the extended component and you're done.

Rather than have all that code be used specifically for monitoring a component's variables, I first created an uber-base class which for now I have called selfproxy. This does what I have described above but does nothing useful in the 'self proxied' methods. To do something useful (such as monitor the variables scope), I just extend the component and override its method interceptor.

This 'self proxying' mullarky lacks the precision and flexibility of AOP, but if you're painting with a broad brush it might be a useful thing.

Here is <a href="http://www.dominicwatson.co.uk/downloads/selfproxy.zip">a working example</a> tested on ColdFusion 8 running on Windows XP.

I'm just scatting on a theme here and would be interested to hear any constructive criticism ;)

Anyways, time for bed!
