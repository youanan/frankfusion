--- 
name: oracle-dates-coldfusion-orm-hibernate
layout: post
title: Oracle Dates, ColdFusion ORM (Hibernate) and ORA-01830
time: 2011-04-28 13:39:00 +01:00
categories:
    - ColdFusion
    - Oracle
    - ORM
    - Gotchas
---

Today I encountered an issue when updating a record in Oracle 10g using an ORM bean. I received the error:

>`ORA-01830 date format picture ends before converting entire input string`
<!--more-->

The problematic field was defined as follows in the bean:

>`property name="dueDate" sqltype="date";`

In the database, the column was defined as:

>`dueDate date not null`

So what gave? Well, it turns out that, when updating or inserting a record, hibernate was passing a timestamp value rather than just a date (Oracle was expecting just a date). Thankfully, the solution was very simple and involved setting the ormtype on the field in the ORM bean:

>`property name="dueDate" sqltype="date" ormtype="date";`

Hopefully that saves someone a headache at somepoint ;)
