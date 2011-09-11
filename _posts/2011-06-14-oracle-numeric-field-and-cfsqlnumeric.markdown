--- 
name: oracle-numeric-field-and-cfsqlnumeric
layout: post
title: Oracle numeric field and cf_sql_numeric gotcha
time: 2011-06-14 10:07:00 +01:00
categories:
    - ColdFusion
    - Oracle
    - Gotchas
---

Quite simply, *cf_sql_numeric*, as a cfsqltype for cfqueryparam, does not map to the oracle 'numeric' datatype. Instead, if you need decimal places, use *cf_sql_float* (or another type that ensures the correct number is saved for you).<!--more-->

*EDIT: Turns out I was wrong...*


<http://livedocs.adobe.com/coldfusion/8/htmldocs/help.html?content=Tags_p-q_18.html>

You can use the *scale* attribute of cfqueryparam to specify decimal places. *cf_sql_numeric* defaults to a scale of 0.

Thanks to <a href="http://bigmadkev.com/blog/">bidmadkev</a> for the correction ;)
