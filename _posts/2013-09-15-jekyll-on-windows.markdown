---
name: jekyll-on-windows
layout: post
title: Jekyll on Windows (8)
time: 2013-09-15 14:21:00 +01:00
categories:
    - Jekyll
    - Amazon S3
---

My work laptop is a Windows 8 laptop and I wanted to get my blog up and running on it so that I didn't have to switch environments. In doing so, I upgraded Jekyll to 1.2 and discovered the s3_website gem that facilitates super easy publishing of websites to S3 (making a lot of my previous setup redundant). Along the way, I encountered quite a lot of errors so I figured I should document them here.<!--more-->

Getting Vanilla Jekyll to work on my Windows 8 laptop
-----------------------------------------------------

Jekyll 1.2 comes with a handy feature, `jekyll new`, that sets up a brand new jekyll site for you. Having installed the latest version of Ruby, dev tools and python and doing the Jekyll install I ran `jekyll new` and `jekyll build` and immediately ran into errors. The source of these, several, problems seemed to be newer versions of various dependencies breaking particular features. To get a working vanilla Jekyll 1.2 install working on Windows 8, these are the steps I followed:

1. Install Ruby 1.9.3-p448 using the [windows installer](http://rubyinstaller.org/) (The sub-2.0.0 version is important). I installed to C:\ruby and ticked all the options during the install wizard (which added C:\ruby to my *path*)
2. Installed Ruby Dev Kit tdm-32-4.5.2 which I also downloaded from the [Ruby Installer for Windows website](http://rubyinstaller.org/). Again, the version is important. Steps to install:
	1. Unpack the download somewhere (I extracted to C:\rubydevkit)
	2. CD to the unpacked directory and run `ruby dk.rb init` followed by `ruby dk.rb install`
