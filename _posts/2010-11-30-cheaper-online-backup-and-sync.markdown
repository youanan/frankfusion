--- 
name: cheaper-online-backup-and-sync
layout: post
title: Cheaper online backup and sync
time: 2010-11-30 20:41:00 +00:00
categories:
    - Amazon S3
    - Ubuntu
---
I've been meaning to backup my data online for a long time, indeed, I've dabbled with various solutions. I've never had anything stolen or had a hard drive go fubar on me and so the importance has never been driven home. However, with the plethora of options becoming freely and easily available, I turned my mind to it once more.

My <a href="http://www.theimagegardenblog.com/">dearest darling</a> is a wedding photographer and has many gigabytes of photographs that she would be more than mortified to lose, as would I with the gigabytes of images and raw audio recordings I have accrued over the years. With this in mind, I figured that all the free storage offered by the likes of <a href="http://www.dropbox.com/">DropBox</a> and <a href="https://www.sugarsync.com/">SugarSync</a> would be used up almost instantly. I did try them out however, along with UbuntuOne and they were both great (I found UbuntuOne less so, much to my disappointment). DropBox probably came out on top for me, native linux and android apps working flawlessly and stylishly. What put me off however, were the pricing options.

This may sound churlish, the pricing is nominal, right? Well, not if you consider the size of RAW photos out of a modern SLR, a wedding shoot can easily reach 20Gb - throw a heap of weddings up on dropbox and you'll run out of all the space they offer ("We offer Pro plans up to 100GB to meet all your sync and sharing needs.", indeed!).

So what's the answer? Well, I already have an Amazon S3 account for various purposes, so all I really need is some free software to allow me to easily sync between various sources and S3 buckets, preferably using Amazon's Reduced Redundancy Storage, currently priced at $0.93 per GB (or $2 per wedding per month). Doing so will save me money three times:

1. No middle man fees
2. Reduced cost of Reduced Redundancy Storage
3. Only paying for what I use

Of course, I'll pay transfer fees on top of the storage, but overall things should work out substantially cheaper - especially if that online backup lasts for any number of years and grows outrageously large...!

Enter <a href="http://www.dragondisk.com/">DragonDisk</a>. Native on Linux, Mac and Windows, this simple tool allows comprehensive management of your S3 buckets (including all regions and RRS) and allows you to set up syncing with local data and buckets. It doesn't cover everything I'd like though, specifically:

1. No autosync, so far as I can tell
2. No ignore rules on sync folders (which I couldn't figure on DropBox or SugarSync either)

What's great though, is that should this tool not work out for me in the long run, I can  switch tools without having to move my data. I'll look at some scripting options soon such as <a href="http://www.s3sync.net/wiki">S3Sync</a>; potentially, the extra setup involved will be worth the effort. Should it work out well, I'll be sure to write up how I set it up.
