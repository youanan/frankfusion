---
name: adding-gzip-to-my-jekyll-setup
layout: post
title: Adding GZIP to my Jekyll setup
time: 2011-09-07 18:00:00 +01:00
categories:
    - Jekyll
    - Ubuntu
    - Amazon S3
    - GZIP
---

I've just added gzipping of html, js and css to my Jekyll deploy script. The script now looks like this:<!--more-->

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

echo =========================
echo GZIP All Html, css and js
echo =========================

find _site/ -iname '*.html' -exec gzip -n {} +
find _site/ -iname '*.js' -exec gzip -n {} +
find _site/ -iname '*.css' -exec gzip -n {} +
find _site/ -iname '*.gz' -exec rename 's/\.gz$//i' {} +
echo done.

echo ==================
echo Syncing to S3
echo ==================

# sync gzipped html files
s3cmd sync --progress -M --acl-public --add-header 'Content-Encoding:gzip' _site/ s3://mywebbucket/ --exclude '*.*' --include '*.html'
# sync non gzipped, non js/css/image files
s3cmd sync --progress -M --acl-public _site/ s3://mywebbucket/ --exclude '*.sh' --exclude 'static/*' --exclude '*.html'
# sync gzipped css and js to static bucket
s3cmd sync --progress -M --acl-public --add-header 'Content-Encoding:gzip' --add-header 'Cache-Control: max-age=31449600' _site/static/ s3://mystaticbucket/ --exclude '*.*' --include '*.js' --include '*.css'
# sync all non gzipped css, js and image files to the static bucket (e.g. images)
s3cmd sync --progress -M --acl-public --add-header 'Cache-Control: max-age=31449600' _site/static/ s3://mystaticbucket/ --exclude '*.css' --exclude '*.js'

echo ==================
echo Backing up source
echo ==================

s3cmd sync --progress ./ s3://mybackupbucket/ --exclude '_site/*'

exit 0
{% endhighlight %}

A neat trick I learned
----------------------
I'm still a bit of an Ubuntu n00b and the gzipping excersize taught me about the **find** command, and more specifically, **find** combined with the --exec parameter.

The --exec parameter allows you to execute a command for every file found in your search. It has two flavours:

{% highlight sh %}
1. find somesearch -exec somecommand {}
2. find somesearch -exec somecommand {} +
{% endhighlight %}

The first flavour runs the command for each file found, replacing {} with the filename. The second flavour runs the command once, substituting {} + with a space delimited list of all the files found by the search criteria. So:

{% highlight sh %}
# gzip all html files found within the _site directory:
find _site/ -iname '*.html' -exec gzip -n {} +
# remove the '.gz' extension added by gzip (I couldn't find a way for gzip to leave filenames alone):
find _site/ -iname '*.gz' -exec rename 's/\.gz$//i' {} +
{% endhighlight %}

I now have a 100 score from YSlow using the small site or blog profile (on pages without Disqus comments that is...). Huzah! ;)
