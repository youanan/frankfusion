---
name: jekyll-on-windows
layout: post
title: Jekyll on Windows (8)
time: 2013-09-15 14:21:00 +01:00
categories:
    - Jekyll
    - Amazon S3
---

My work laptop is a Windows 8 laptop and I wanted to get my jekyll blog up and running on it. In doing so, I upgraded Jekyll to 1.2 and discovered the s3_website gem which makes publishing to S3 a breeze. I also encountered several problems so I thought I'd share the "correct" way to do it.<!--more-->

Getting Vanilla Jekyll to work on my Windows 8 laptop
-----------------------------------------------------

My first attempt at getting a vanilla Jekyll site (using `jekyll new`) up and running on Windows 8 failed miserably and I had to start again. All the errors were caused by most recent versions of Ruby, Python and some Ruby gems breaking the Jekyll code so the fixes were all about reverting versions of software.

The steps I followed to get a working setup were:

1. Install Ruby 1.9.3-p448 using the [windows installer](http://rubyinstaller.org/) (The sub-2.0.0 version is important). I installed to C:\ruby and ticked all the options during the install wizard (which added C:\ruby to my *path*)
2. Install Ruby Dev Kit tdm-32-4.5.2 which I also downloaded from the [Ruby Installer for Windows website](http://rubyinstaller.org/). Again, the version is important. Steps to install:
	1. Unpack the download somewhere (I extracted to C:\rubydevkit)
	2. CD to the unpacked directory and run `ruby dk.rb init` followed by `ruby dk.rb install`
3. Install Python 2.7.5 using the Windows installer from the [Python Website](http://www.python.org/download/releases/2.7.5/). Again the version is important, things didn't work with > v3.
4. Install Python Pygments (for syntax highlighting)
	1. Download and extract "distribute" 0.6.49 from [here](http://pypi.python.org/pypi/distribute) - guess what, the version is important!
	2. CD to the unpacked directory and run `python distribute_setup.py`
	3. Still in the unpacked directory, run `python easy_install.py Pygments`
5. Install Jekyll with `gem install jekyll`
6. Downgrade the liquid gem to 2.5.1 with `gem uninstall liquid` and `gem install liquid --version "2.5.1"`
7. Downgarde the pygments.rb gem to 0.5.0 with `gem uninstall pygments.rb` and `gem install pygments.rb --version "0.5.0"`

Having done all that, I was good to go but for a few other packages I needed for my blog:

{% highlight sh %}
gem install rdiscount
gem install juicer
juicer install yui_compressor
juicer install jslint
{% endhighlight %}

s3_website
----------

S3_Website is a ruby gem that allows you to easily publish your static website to S3. It is also Jekyll aware which makes it the perfect fit for my blog. Installation is as simple as `gem install s3_website` and the rest is configuration. My confguration looks like this:

{% highlight yaml %}
# s3 ID and Secret are set in Windows Environment Variables (for my login only)
s3_id: <%= ENV['S3_ID'] %>
s3_secret: <%= ENV['S3_SECRET'] %>
s3_bucket: fusion.dominicwatson.co.uk
max_age:
  "static/*": 6000
  "*": 300
s3_reduced_redundancy: true
# using the gzip option is breaking the checksum sync check for me atm, will comment out when working
# gzip:
#   - .html
#   - .css
#   - .js
{% endhighlight %}