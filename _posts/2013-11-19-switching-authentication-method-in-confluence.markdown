---
layout: post
title: Switching authentication method in Confluence (5.25)
time: 2013-11-19 00:56:00 +00:00
categories:
    - Confluence
---

At work, we have been using our Google Apps account for logging in to Confluence and wanted to move to sharing our JIRA logins instead. Integrating JIRA logins is a [cinch][cinch] in Confluence. Once setup, all our JIRA users appeared in Confluence. Great. The only remaining task was to gid rid of our old Google Apps users and change the owner of all the old content to our new users. Finding a way to do this proved very difficult indeed, with zero documentation that I could find for this particular example.<!--more-->

# What documentation there is

Here are [the closest instructions I could find][oldinstructions]. Unfortunately they are out of date for Confluence 5.25 but the gist of them is still rings true and, if you waded through the many comments (I didn't), you would have found something very close to what I found to be the answer. I ended up having to figure it out for myself late at night so I thought I'd write a quick post on the method I used - hopefully it will appear in Google results for others in the same boat.

# How I did it

**Disclaimer**: this worked for us and our setup. I cannot guarantee that it will work in your setup. All the SQL code below is for MySQL.

The method revolves around the database table, `user_mapping`. The `user_key` column in this table is used as the foreign key references throughout the system when tagging a user against content, attachments, etc. This `user_key` is then mapped to the username of the `cwd_user` table in which the user details are stored. This method simply associates the `user_key` of the old username with the new username.

*Usefully, the user groups association is mapped to the primary key of the `cwd_user` table meaning that we can easily migrate the content without affecting a user's associated group permissions.*

## 1. Shutdown confluence

`/[CONFLUENCE_HOME]/bin/stop-confluence.sh`.

## 2. Create a temporary user migration table and fill it with the migration user details

{% highlight sql %}
create table usermigration (
	  oldusername varchar(255) not null
	, newusername varchar(255) not null
	, oldkey      varchar(255) not null
	, newkey      varchar(255) not null
);

-- populate the table any which way works for your scenario. The keys and usernames are those found in the user_mapping table.
{% endhighlight %}

## 3. Nullify the new user mappings

{% highlight sql %}
update   user_mapping

set      user_mapping.username       = Concat('tmp_', user_mapping.username)
       , user_mapping.lower_username = Concat('tmp_', user_mapping.lowr_username)

where    user_mapping.user_key in ( select newkey from usermigration );
{% endhighlight %}

## 4. Map new users to the old users

{% highlight sql %}
update   user_mapping
       , usermigration

set      user_mapping.username       = usermigration.newusername
       , user_mapping.lower_username = usermigration.newusername

where    user_mapping.user_key = usermigration.oldkey;
{% endhighlight %}

## 5. Start confluence

`/[CONFLUENCE_HOME]/bin/start-confluence.sh`.

## 6. In case of emergency, rollback

Stop Confluence before this and start it up again afterwards:

{% highlight sql %}
update   user_mapping
       , usermigration

set      user_mapping.username       = usermigration.oldusername
       , user_mapping.lower_username = usermigration.oldusername

where    user_mapping.user_key = usermigration.oldkey;


update   user_mapping
       , usermigration

set      user_mapping.username       = usermigration.newusername
       , user_mapping.lower_username = usermigration.newusername

where    user_mapping.user_key = usermigration.newkey;
{% endhighlight %}

# Conclusion

The documentation for this seems nowhere to be found so I can't be sure that I haven't missed some vital step here (please comment if you find that I have). However, after running the above and disabling google apps login, we were able to login with JIRA and see all our old content mapped to our new JIRA users. Once we're confident that nothing is broken, we will permanently remove the old Google apps users.

Given that all that was necessary was to switch a single mapping record for each user, I'm surprised that I couldn't find anything official on this. I'll comment on the [old instructions][oldinstructions] and hopefully that can be rectified.

[cinch]:https://confluence.atlassian.com/display/DOC/Connecting+to+Crowd+or+JIRA+for+User+Management
[oldinstructions]:https://confluence.atlassian.com/display/CONFKB/How+do+I+change+a+username+prior+to+Confluence+5.3