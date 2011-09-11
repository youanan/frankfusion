--- 
name: pagination-in-oracle-10g
layout: post
title: Pagination in Oracle 10g
time: 2011-03-24 11:07:00 +00:00
categories:
    - Oracle
    - SQL
    - Reference
---

Oracle lacks the simplicity of MySql's LIMIT syntax. It does, however, let you use <a href="http://www.orafaq.com/node/55">Analytic Functions</a> to get total record counts before pagination all in the same query (and performs pretty well doing so). Here, mostly for my reference, is how you might build a paginated query in Oracle:

{% highlight sql %}
select * from (
	select /*+ FIRST_ROWS(n) */
		  a.*
		, ROWNUM rnum
		, count(*) over() as total_rows
	from ( 
		/* your select statement goes here */ 
	) a
) b 
where b.rnum >= :start_row and b.rnum <= :end_row
{% endhighlight %}
