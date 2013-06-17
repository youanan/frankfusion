---
layout: post
title: ElasticSearch gotcha
time: 2013-06-16 22:27:00 +00:00
categories:
    - ElasticSearch
---
I have been implementing search engines using ElasticSarch for a little while now and only recently came to discover a core feature that, when not understood, has the potential to cause a few problems. The feature is [Zen multicast discovery](http://www.elasticsearch.org/guide/reference/modules/discovery/zen/), which is configured to be on by default. Multicast discovery is a fantastic feature that enables you to setup a cluster of ElasticSearch nodes with zero configuration.<!--more-->

# My excuse for not understanding this feature

I really should have RTFM in this case. The "Elastic" in ElasticSearch represents the software's core goal to make *scaling* search engines super easy. It's all about distributed search. It's what it was designed for, and I knew it, so no good excuse for not having done the reading. Up until a week ago however, I had no need for these clustering abilities and so, with time in short supply, I skipped it. This is pretty shameful and I vow to be a better developer in future, scout's honour!

# How it nearly bit my bottom

I was setting up an environment for a client and had made a fresh install of ElasticSearch on each of the two servers that we planned to keep in sync (my next task was to do the reading on clustering to set this up). While doing some checks on the setup, I noticed that the engine had a number of search indexes present that came from another client. This was a fresh install and I hadn't performed any indexing operations, so WTF?!

A little reading later and I learned that ElasticSearch had scanned the network and found other ElasticSearch nodes. The fresh new nodes then automatically joined the others as a slave and replicated their indexes. Neat stuff but clearly not what we wanted - thankfully I caught it early enough before something horrible happened (also, thankfully, we weren't using common names for our search indexes).

# Turning it off

The configuration to change the behaviour to have just my two servers act as a cluster was exceedingly simple; I needed to switch from multicast discovery to *unicast* and list the servers that I wanted to be part of the cluster. My `elasticsearch.yml` file then looked like this:

{% highlight js %}
discovery.zen.ping.multicast.enabled: false
discovery.zen.ping.unicast.hosts: ["node1","node2"]
{% endhighlight %}

I also changed our default install of ElasticSearch to have multicast discovery turned OFF by default. In an agency environment where you have multiple clients, *potentially hosted in the same network*, that setting might spell disaster!

My next task, read the f***ing manual.


