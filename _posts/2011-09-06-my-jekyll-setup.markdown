---
name: my-jekyll-setup
layout: post
title: My Jekyll Setup
time: 2011-09-06 08:01:00 +01:00
categories:
    - Jekyll
    - Ubuntu
    - Amazon S3
    - Juicer
---

I'm not doing anything revolutionary with Jekyll, a couple of plugins for the sitemap and category pages, a simple script for the atom feed and a bash script for deploying to Amason S3. I aim to keep things simple, after all - that's much the point.

Install
-------
For my reference, and anyone else coming here looking to setup jekyll, here's what I needed to get going (on Ubuntu 10.10):

{% highlight sh %}
# ruby, rubygems and jekyll itself
sudo apt-get install ruby ruby-dev rubygems
sudo gem install jekyll

# we need this for syntax highlighting
sudo apt-get install python-pygments

# I'll also be using Juicer to minify css and js (well, there's actually no js as yet)
sudo apt-get install libxslt-dev libxml2-dev
sudo gem install juicer
juicer install yui_compressor
juicer install jslint
{% endhighlight %}

Setting up the blog files
-------------------------
Absolutely nothing new here, regular *layout*, *plugins* and *posts* folders with files you'd expect after reading the guide:

<https://github.com/mojombo/jekyll/wiki/Usage>

There's an atom.xml in the root that I stole from here (though I'm sure you'll find it all over the place):

<http://vitobotta.com/how-to-migrate-from-wordpress-to-jekyll/#atom-rss-feed>

Plugins
-------
I'm using just two, the **generate_categories** plugin, from here:

<http://recursive-design.com/projects/jekyll-plugins/>

And the **sitemap_generator** plugin, from here:

<http://www.kinnetica.com/projects/jekyll-sitemap-generator/>

Deploy scripts
--------------

I'm using s3cmd to sync my blog to S3 (see my post on <a href="/2010/12/cheaper-online-backup-and-sync-part-2.html">using s3cmd for backups</a>). I have two bash scripts, one to run jekyll server locally (for previewing the site), and the other to deploy live. They look like this:

**dev.sh**  
{% highlight sh %}
#!/bin/bash

echo ==================
echo Minify css
echo ==================
juicer merge -i --force -o static/css/min.css static/css/master.css

echo ==================
echo Start jekyll server
echo ==================
jekyll --server

exit 0
{% endhighlight %}

**deploy.sh**  
{% highlight sh %}
#!/bin/bash

echo ==================
echo Minify css
echo ==================
juicer merge -i --force -o static/css/min.css static/css/master.css

echo ==================
echo Building site
echo ==================
jekyll

echo ==================
echo Syncing to S3
echo ==================

s3cmd sync --progress -M --acl-public _site/ s3://myblogwebsitebucket/ --exclude '*.sh' --exclude 'static/*'
s3cmd sync --progress -M --acl-public --add-header 'Cache-Control: max-age=31449600' _site/static/ s3://mystaticfilesbucket/

echo ==================
echo Backing up source
echo ==================

s3cmd sync --progress ./ s3://mybackupbucket/ --exclude '_site/*'

exit 0
{% endhighlight %}

Todo
----
One thing perhaps left to do is gzip files before deploying, adding gzip headers to the S3 objects. The downside to this is the exclusion of user agents that don't accept gzipped content. But who, or what (in the case of bots and such), would one be excluding by doing this? Thoughts?

Now, to run ./deploy.sh and go to bed...
