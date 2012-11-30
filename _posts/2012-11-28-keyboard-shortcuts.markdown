---
layout: post
title: Keyboard shortcuts
time: 2012-11-28 18:13:00 +00:00
categories:
    - Javascript
    - HTML
    - General
---
I'm not too handy with a touchpad. Spending a good deal of time on a laptop makes me really want to use my keyboard almost exclusively - the biggest block to this, for me, comes when using the web. Simply, not enough sites offer good keyboard navigation or, if they do, it is hidden away.<!--more-->

# Access keys

The concept of access keys has been around in the web for a long time (1999 according to this <cite>[Wikipedia entry](http://en.wikipedia.org/wiki/Access_key)</cite>). The idea is that you markup your links and form elements with the `accessKey` attribute, giving your users a keyboard shortcut to that element:

{% highlight html %}
<a href="/home.html" accesskey="h" title="Go to the home page">Home</a>
{% endhighlight %}

*In the example above, using Chrome, typing **alt**+**h**, would direct you to `/home.html`.*

There are problems with the access keys implementation, however:

* In many browsers, the access keys that you define will override the default shortcuts of the browser. All combinations of shortcuts are already taken (if you take in to consideration international users, and why wouldn't you?!) which means that if you implement them, you will always run the risk of frustrating your users by overriding their shortcuts.
* Implementation is not consistent. Some browsers will merely focus on a link when the access key is triggered, others will follow the link. This is less of a concern as, presumably, the user will be accustomed to their browser of choice. *It is worth paying attention to the focus styling of said links, however. In the past, I have thoughtlessly styled away the default :focus style on all links because I thought it was ugly! User's using a keyboard would really like to know where the focus is when tabbing through the site and that is what the default styling is intended for.*
* There is no browser-led method for informing users what accesskeys are available in a page, leaving it to the authors of websites to do so. This means inconsistency, or more commonly, no method for informing users being implemented at all.
* They aren't implemented in Opera

For the first reason, above, I have chosen *not* to use access keys in this site. And I do not think that I would use them when creating an implementation in a 'full-blown' web application. Am I right not to do so (answers on a postcard please)?

# Javascript instead

There are a number of ways to implement keyboard shortcuts using javascript (I am quite sure that nobody reading this would be surprised by that). In this blog, I am using [jQuery HotKeys](https://github.com/jeresig/jquery.hotkeys) by John Resig as it makes implementing them both easy and readable. This is the code I am using to listen for the relevant key strokes:

{% highlight js %}
$('body').keydown( 'up'     , function( e ){ shiftPostListFocus( e, 'up'   ); } )
         .keydown( 'down'   , function( e ){ shiftPostListFocus( e, 'down' ); } )
         .keydown( 'g'      , toggleGotoMode             )
         .keydown( 'shift+/', toggleKeyboardShortcutHelp )
         .keydown( 'esc'    , escapeFeatures             )
         .keydown( genericKeyHandler );
{% endhighlight %}

Given the ease with which this can be achieved, there is clearly no good excuse for not implementing shortcuts (yet I have been making them for the last few years)!

# Implementing in my blog (copying others)

The risk in implementing your own schema for keyboard shortcuts is introducing too many new concepts to the users of your site. Operating systems define standard sets of shortcuts that applications are encouraged to implement but, with the web, we are left to collectively define our own. In that vein, I have opted to copy google as much as possible.

## Getting help with shortcuts

The trend for this seems to be to allow your user's to type '?' (shift + /). Try it now to see what I mean. One challenge that I have attempted to meet here is the difficulty of guiding a user to this keyboard shortcut help...

* without them needing to use a mouse to access it
* without it being obtrusive
* without making them have to *think* too much

My attempt at this is the little keyboard icon with '?' beside it at the top right of the site. Did you notice it? If so, did you have any idea what it meant?! I wonder if such an icon might one day become as ubiquitous as icons such as pause, play, stop, etc.

## Access keys

In GMail, the access key concept is implemented by the 'G' key, presuably for 'go to'. For example, typing 'G' then 'I' will take you to your GMail inbox. In this blog I allow the user to go to the (H)ome page, (A)bout me page and (P)rojects page using this method. I may implement (N)ext and (P)revious posts in the near future.

## Navigating lists

In google search results, you can hit tab to focus on the first result and then use the down and up arrows to move focus to the previous and next results. I have copied that technique here for lists of blog posts which can be found in the home page and in blog category pages.

# And for those without Javascript?

Given the problems with access keys, I do not think that there is a perfect answer here. My current thinking is that marking-up content semantically and providing sensible tab indexes is as much as one can do if not using access keys.

# Feedback

I don't expect anyone other than myself to use the keyboard shortcuts I have implemented here - indeed, one of they joys of a tech blog is that it can be used to try out and hone techniques within a limited and protected scope. However, if anyone does try them out, I'd love some feedback on the experience, particularly on how it could be improved.

Also, if you have implemented keyboard shortcuts in your sites and web applications, what techniques did you use and what lessons did you learn?

D