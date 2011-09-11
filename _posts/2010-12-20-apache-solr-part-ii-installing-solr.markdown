--- 
name: apache-solr-part-ii-installing-solr
layout: post
title: "Apache Solr, Part II: Installing Solr with Tomcat"
time: 2010-12-20 14:58:00 +00:00
categories:
    - ColdFusion
    - Solr
    - Tomcat
---

In <a href="/2010/12/apache-solr-or-departing-from-confines.html">Part I</a>, I gave a sneak preview of the benefits of using Solr directly over using ColdFusion 9's integrated implementation. Here, in part II, is a quick start guide to getting Solr up and running independently.

Solr, like ColdFusion, is a Java application that needs to run in a sevlet container such as <a href="http://tomcat.apache.org/">Apache Tomcat</a>, <a href="http://www.caucho.com/">Resin</a>, <a href="http://www.adobe.com/products/jrun/">JRun</a> or <a href="http://jetty.codehaus.org/jetty/">Jetty</a>.

This post will get Solr up and running in Tomcat 6.

Step 1, Install Tomcat
----------------------

If you're not running it already, install Tomcat. In Ubuntu, you can install tomcat with the following command:

{% highlight bash %}
apt-get install tomcat6
{% endhighlight %}

If you're on Windows, there is a binary installer. Head over to the Tomcat 6 downloads page and get the *'32-bit/64-bit Windows Service Installer'*:
<a href="http://tomcat.apache.org/download-60.cgi">http://tomcat.apache.org/download-60.cgi</a>. Other Unix flavours may have there own packages, only a google away.

For the rest of this guide, I will presume that Tomcat is installed and listening on port 8080. Visiting, *http://localhost:8080/*, should give you a Tomcat welcome page.

Step 2, download and deploy Solr
--------------------------------

Head over to <http://lucene.apache.org/solr/> and download the latest stable release. At the time of writing this guide, the latest was 1.4.1.

Extract the Solr .war file, *{downloaded zip}/dist/apache-solr-1.4.1.war*, to the Tomcat *webapps* directory, location of which may vary:

**Windows default**: C:\Program Files\Apache Software Foundation\Tomcat 6.0\webapps\  
**Ubuntu default**: /var/lib/tomcat6/webapps/

Tomcat should automatically unpack this .war file for you and create a new directory within webapps, '*apache-solr-1.4.1*', which contains all the code for Solr to run as a web application.

Step 3, configure Solr
----------------------

Create a new configuration directory for your solr instance, anywhere you like. For this tutorial, I shall presume that one has been created in */{tomcat dir}/conf/solr/*.

Copy the contents of *{downloaded solr zip}/example/multicore* into your new config directory. This is a basic configuration for Solr running with multiple cores (a *core* is equivalent to the ColdFusion search *collection*). We'll get deeper into these files in later posts, but for now they'll serve as a base configuration.

Step 4, configure Tomcat
------------------------

Finally, we configure Tomcat to be able to present Solr at some uri, e.g. *http:// localhost:8080/solr/*, loading the configuration that we created in Step 3.

Open up *{tomcat dir}/conf/server.xml* and add the following *Context* definition to the *Host* element (replacing the 'solr/home' environment value to the directory you created in step 3):

{% highlight xml %}
<Host name="localhost" appBase="webapps" ...>
	<Context path="/solr" docBase="apache-solr-1.4.1">
		<Environment name="solr/home" type="java.lang.String" value="/var/lib/tomcat6/conf/solr" override="true" />
	</Context>
</Host>
{% endhighlight %}

Restart Tomcat and visit *http://localhost:8080/solr/*. With any luck you should see a Solr welcome page (and you are l33t).

Dominic
