--- 
name: cheaper-online-backup-and-sync-part-2
layout: post
title: "Cheaper online backup and sync: Part 2, S3Cmd"
time: 2010-12-04 20:11:00 +00:00
categories:
    - Amazon S3
    - Ubuntu
---
Following on from my previous post, <a href="/2010/11/cheaper-online-backup-and-sync.html">Cheaper online backup and sync</a>, here's how I got on setting up with <a href="http://s3tools.org/s3cmd">s3cmd</a> (not s3sync).

Firstly, I'm on Ubuntu, and setting up with the latest version of s3cmd was fairly straightforward. s3cmd is available from the standard Ubuntu repositories, but, as ever, is somewhat out of date. Instead, I downloaded and unpacked the latest version from sourceforge (in my case, 1.0.0-rc):

<a href="http://sourceforge.net/projects/s3tools/files/s3cmd/#files">http://sourceforge.net/projects/s3tools/files/s3cmd/#files</a>

Then, from the command prompt and within the unpacked directory, I ran the following command:

{% highlight bash %}
sudo python setup.py install
{% endhighlight %}

*Side note, in order to run that, I needed 'python-setuptools' (all this is in the INSTALL notes):*
{% highlight bash %}
sudo apt-get install python-setuptools
{% endhighlight %}

The next step is to configure s3cmd with your Amazon credentials and options for encryption, simply (following the wizard that ensues):
{% highlight bash %}
s3cmd --configure
{% endhighlight %}

Finally, I created a bash script that uses s3cmd to sync local folders with s3 buckets:
{% highlight bash %}
#!/bin/bash

# ------------------------------------------------------------
# Configuration
# ------------------------------------------------------------
logfile=/some/path/to/backup.log

# ------------------------------------------------------------
# Am I Running already? (code thanks to http://www.franzone.com/2007/09/23/how-can-i-tell-if-my-bash-script-is-already-running/comment-page-1/)
# ------------------------------------------------------------
if [ ! -z "`ps -C \`basename $0\` --no-headers -o "pid,ppid,sid,comm"|grep -v "$$ "|grep -v "<defunct>"`" ]; then
 #script is already running – abort
 echo =================================== >> $logfile
 echo `date`... Script is already running, aborting. >> $logfile
 exit 1
fi

# ------------------------------------------------------------
# RUN THE BACKUP COMMANDS
# ------------------------------------------------------------

echo ==================================== >> $logfile
echo `date`... running backup >> $logfile

# Code projects
echo SYNCING WORKSPACE >> $logfile
s3cmd sync --reduced-redundancy /path/to/my/workspace/ s3://mybucket/backups/projects/ --exclude '*WEB-INF/*' --exclude 'cfeclipse/*' --exclude '.svn' --exclude '.metadata/*' >> $logfile 2>&1

# Scripts
echo SYNCING SCRIPTS >> $logfile
s3cmd sync --reduced-redundancy /path/to/my/scripts/ s3://mybackup/backups/linuxscripts/ --exclude 'winetricks' --exclude 'backup.log' >> $logfile 2>&1

# Other things I want to backup...
# @todo

# ------------------------------------------------------------
# Done
# ------------------------------------------------------------
exit 0
{% endhighlight %}

I can now put the script in a cron job and have auto syncing with flexible rules.
