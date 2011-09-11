--- 
name: apache-solr-or-departing-from-confines
layout: post
title: "Apache Solr, or, 'departing from the confines of cfsearch': Part I"
time: 2010-12-13 20:35:00 +00:00
categories:
    - ColdFusion
    - Solr
---
I've been putting off blogging some of the awesome discoveries I've been making around <a href="http://lucene.apache.org/solr/">Apache Solr</a> due to the daunting legion of things to write about. Also, multi-part blog posts seem all the rage. So, here in bite size chunks, is my sharing of true *Solr power exploitation* in Adobe ColdFusion / Railo / Bluedragon.

Intro: is *cfsearch* doing enough for you?
------------------------------------------

I have used ColdFusion's implementation of Verity (and now Solr) in several different projects and have repeatedly encountered the following 3 problems:

1. I've found deployment flaky and awkward. Syncing a largish refreshed collection around a cluster of servers has been a behemoth of a task, with a less than 100% success rate. The refreshing of the large collection has also been timely and taken up server resources.
2. I can't get the cfsearch query resultset sorted by anything other than the relevancy score. This is especially a problem when paginating results that have been sorted by a user after search; I have to get *all* the results from cfsearch, sort using a query of queries, and only then paginate the results.
3. I'm limited to the number of distinct fields that I can use and these fields have awkward names that need translating if code is to be readable by other programmers (i.e. *custom1*, *custom2... etc.*). This invariably leads to running two queries and joining them using a query of queries; one query to the search engine, another to the database.

In other words, despite its fantastically easy use in simple search scenarios, I think cfsearch does not heed well the famous Albert Einstein misquote:

>'Everything should be made as simple as possible, but not simpler.'

So, if you've encountered these problems and created more code to work around the limitations than is reasonable, then read on...

Teaser: results I have easily achieved with Solr, outside of cfsearch
---------------------------------------------------------------------

After a little getting to know of the workings of Solr (no more than a couple of week's tinkering), I managed to get a working search engine with the following benefits:

1. Complete data import in seconds where it previously took many minutes
2. Replication: perform said data import on a non-worker instance and have it near instantly mirror around a live cluster of search collections
3. Load balancing: true load balancing of the cluster of live slaves independent of the CF cluster
4. Defining of my own document schema with as many *typed* fields as I like, each of which can contain distinct multiple values and be named appropriately
5. Defining of custom field types; this has the upshot of a single field being able to have its own search rules such as stopwords and synonyms (after all, not all fields will have the same set of synonyms and stopwords)
6. Searching across multiple columns, each with a programmer-defined search weight at search time. E.g. search across the artist field, album field and track title field - give track title the most weight, album a little less and artist next to no weight at all
7. Defining what columns I want returned from any given search
8. Sorting on multiple columns
9. Pagination
10. Faceted search. What this means is that I can pass Solr a list of columns to 'facet' with my search query and I will receive back, along with my search results, grouped counts of the values in those columns. E.g. I search for '*Etude*' in my *tracks* collection and ask to facet the *genre* column, my facet result for genre looks like: '*Classical (2,454), Pop (23), Metal(1)*'
11. Explicit filtering on columns, e.g. Search all tracks where the genre is exactly equal to '*Classical*' and the period '*1920s*'
12. *'You may also like...'* search queries

This is scratching the surface, I'm sure, but has really got me fired up and hot on the trail of bringing all this to ColdFusion in an easy to use framework (and before that is near completion, a set of blog posts to share the excitement).

Coming up...
------------
In the next few posts on this topic, I intend to document how I achieved all of the above and hope to inspire others to take the tiny jump away from the confines of cfsearch.
