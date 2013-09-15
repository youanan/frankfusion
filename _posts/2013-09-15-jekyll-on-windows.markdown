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