--- 
name: scatting-with-coldspring
layout: post
title: Scatting with ColdSpring
time: 2008-04-20 05:15:00 +01:00
categories:
    - ColdFusion
    - ColdSpring
    - AOP
---
*I really like ColdSpring - quiet, clean and powerful - mmmm (forgive me, I'm very tired). There is one thing that I have found that bugs me a little however; the verbosity of defining aspects and advisors.*<!--more-->

Here's a quick xml sample of creating a really simple aspect and applying its advice to a bean:
{% highlight xml %}
<beans>
	<!-- state checker advice and advisor -->
	<bean id="stateChecker" class="aopxml.stateChecker" />
	<bean id="stateCheckerAdvisor" class="coldspring.aop.support.NamedMethodPointcutAdvisor">
		<property name="advice">
			<ref bean="stateChecker" />
		</property>
		<property name="mappedNames">
			<value>*</value>
		</property>
	</bean>

	<!-- test component with proxy -->
	<bean id="testerTarget" class="aopxml.tester" singleton="false" />
	<bean id="tester" class="coldspring.aop.framework.ProxyFactoryBean" singleton="false">
		<property name="target">
			<ref bean="testerTarget" />
		</property>
		<property name="interceptorNames">
			<list>
				<value>stateCheckerAdvisor</value>
			</list>
		</property>
	</bean>
</beans>
{% endhighlight %}

This example is from my blogpost <http://fusion.dominicwatson.co.uk/2008/04/stricter-oop-using-aop.html>.

Worse still, if I want to apply my aspect to any another beans, I would have to explicitly do so by defining a proxy for each bean.

So what's the solution?
----------------------- 

The first thing I thought was to have specific AOP xml tags for the configuration that would allow you to define aspects and instruct ColdSpring to automagically create proxies for you based on the component name rules you supply it.

I posted this thought on the ColdSpring google group and the reply made me look to the Spring framework (on which ColdSpring is based) - what does the Spring framework do? Well, it does pretty much exactly as I suggested:

<http://static.springframework.org/spring/docs/2.5.x/reference/aop.html#aop-schema>

So, with a minor adaption for ColdFusion (though not budging from the Spring Xml schema), here is how the above Xml example could look:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:aop="http://www.springframework.org/schema/aop">
	<!-- 'new' aop tags -->
	<aop:config>
		<aop:aspect id="stateCheckerAspect" ref="stateChecker">
			<aop:around pointcut="*.*" method="invokeMethod"/>
		</aop:aspect>
	</aop:config>

	<!-- 'aspect' beans -->
	<bean id="stateChecker" class="temp.stateChecker" />

	<!-- 'regular' beans -->
	<bean id="tester" class="temp.tester"/>
</beans>
{% endhighlight %}

The above XML defines an Around advice that will be applied to every bean and every method in the factory. Of course, different rules could be setup and I think the benefit is quite graphical.

This got me all excited and sent me on an all night coding spree. The result was a new ColdSpring bean factory that would take the Xml above and make it work. Its just a proof of concept and a little rough around the edges but it shows what can be done with reasonable ease (thanks to the excellent codebase already in ColdSpring).

The extended factory will indeed parse most of the aop elements defined in the Spring schema. I won't go into detail as they are very well documented in the Spring documentation that I linked to. However, here is a quick example of an aop:config that the extended factory will do stuff with:

{% highlight xml %}
<aop:config>
	<aop:pointcut id="aopxmlPackagePC" expression="aopxml.*.Add*"/>
	<aop:aspect id="stateCheckerAspect" ref="stateChecker">
		<aop:around pointcut-ref="aopxmlPackagePC" method="invokeMethod"/>
	</aop:aspect>

	<aop:aspect id="someErrorCatchingAspect" ref="someAdviceBean">
		<aop:pointcut id="thisAppServices" expression="com.myCo.thisApp.services.*.*"/>
		<aop:after-throwing pointcut-ref="thisAppServices" method="afterThrowing"/>
	</aop:aspect>
</aop:config>
{% endhighlight %}

You can download the simple working example <a href="http://www.dominicwatson.co.uk/downloads/AopXmlConcept.zip">here</a>. You may need to create a mapping to whereever you unzip it (mapping called 'aopxml').

A disclaimer: this is completely unofficial and just a proof of concept - I'm just scatting. Enjoy :)
