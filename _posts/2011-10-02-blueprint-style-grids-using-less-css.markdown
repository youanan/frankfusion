---
layout: post
title: Blueprint style grids using LESS CSS
time: 2011-10-02 17:39:00 +00:00
categories:
    - CSS
    - LESS
---

*I've started using LESS css at work (using <a href="http://cfstatic.riaforge.org">CfStatic</a> to compile the files) and slowly converting existing css to use LESS. We've been using the blueprint css framework for a grid layout and applying LESS css to the grid css for blueprint urged me to blog about it - its just so darn neat.*<!--more-->

For those not familiar with Blueprint, the idea is that it gives your layouts a pseudo set of columns; you define how wide your columns are, and the spacing between them, then speficy the number of columns your html elements span using classes named, 'span-1', 'span-25', etc. Fans of gestalt shift (my boss), like this a lot because it allows for trouble free alignment of otherwise unrelated html elements.

The basic part of the blueprint grid css file looks like this:

{% highlight css %}
.container {width:950px;margin:0 auto;}
.span-1, .span-2, .span-3, .span-4, .span-5, .span-6, .span-7, .span-8, .span-9, .span-10, .span-11, .span-12, .span-13, .span-14, .span-15, .span-16, .span-17, .span-18, .span-19, .span-20, .span-21, .span-22, .span-23, .span-24 {float:left;margin-right:10px;}
.last {margin-right:0;}
.span-1 {width:30px;}
.span-2 {width:70px;}
.span-3 {width:110px;}
.span-4 {width:150px;}
.span-5 {width:190px;}
.span-6 {width:230px;}
.span-7 {width:270px;}
.span-8 {width:310px;}
.span-9 {width:350px;}
.span-10 {width:390px;}
.span-11 {width:430px;}
.span-12 {width:470px;}
.span-13 {width:510px;}
.span-14 {width:550px;}
.span-15 {width:590px;}
.span-16 {width:630px;}
.span-17 {width:670px;}
.span-18 {width:710px;}
.span-19 {width:750px;}
.span-20 {width:790px;}
.span-21 {width:830px;}
.span-22 {width:870px;}
.span-23 {width:910px;}
.span-24 {width:950px;margin-right:0;}

/* a whole lot more css... */
{% endhighlight %}

This is all fine and dandy and there are even tools out there to let you define the width of your columns and produce the css for you. However, using LESS css, we don't need those generators; we can just define our column widths and spacing as variables and use mixins to work out the widths of the different size spans. Something like this:

{% highlight css %}
@col-width : 30px;
@col-space : 10px;

.span( @n-cols, @right-margin:10px, @adjustment=0 ){
	width        : ((@n-cols * @col-width) + (@col-space * (@n-cols-1))) + @adjustment;
	float        : left;
	margin-right : @right-margin;
}

.last      { margin-right:0px; }
.container { .span(24, 0px); margin:0 auto; }
.span-1    { .span(1);  }
.span-2    { .span(2);  }
.span-3    { .span(3);  }
.span-4    { .span(4);  }
.span-5    { .span(5);  }
.span-6    { .span(6);  }
.span-7    { .span(7);  }
.span-8    { .span(8);  }
.span-9    { .span(9);  }
.span-10   { .span(10); }
.span-11   { .span(11); }
.span-12   { .span(12); }
.span-13   { .span(13); }
.span-14   { .span(14); }
.span-15   { .span(15); }
.span-16   { .span(16); }
.span-17   { .span(17); }
.span-18   { .span(18); }
.span-19   { .span(19); }
.span-20   { .span(20); }
.span-21   { .span(21); }
.span-22   { .span(22); }
.span-23   { .span(23); }
.span-24   { .span(24, 0px); }
{% endhighlight %}

Neat eh?