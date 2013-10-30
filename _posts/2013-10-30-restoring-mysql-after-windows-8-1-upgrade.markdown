---
layout: post
title: Restoring MySQL After Wndows 8.1 Upgrade
time: 2013-10-30 07:56:00 +01:00
categories:
    - Windows
    - MySQL
---

I was prompted to update to Windows 8.1 yesterday and I rather foolishly dived straight into it without reading any of the warnings. Fortunately, everything went smoothly, except that the MySQL service I had installed was removed. Yikes. While I've not managed to get to the bottom of why that happened, I did, after a little trial and error, manage to restore the service with all the correct DB data files.<!--more-->

# Installing the service

Installing the service can be done from the command line (with admin privileges) using `mysqld.exe`. For me, this looked like:

{% highlight bat %}
C:\Program Files\MySQL\MySQL Server 5.6\bin>mysqld --install
{% endhighlight %}

This installed the service and I was able to start it up. However, I soon realised that I could not log in to the server with my usual credentials and that all my schemas were missing. The problem was clear, the default configuration did not know where all my old data files were. I eventually found my old `my.ini` file in the `ProgramData` folder so that, for me, installing the service properly then looked like this:

{% highlight bat %}
>mysqld --remove
>mysqld --install MySql --defaults-file="C:\ProgramData\MySQL\MySQL Server 5.6\my.ini"
{% endhighlight %}

Finally, I needed to restart Windows in order to be able to start the service due to file locks on the data files (I'm sure there was a less brutal fix, but seeing as my laptop takes only a few seconds to restart, it was a no-brainer).

Hope that helps someone.


