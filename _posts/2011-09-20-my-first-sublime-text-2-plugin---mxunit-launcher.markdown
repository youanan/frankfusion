---
layout: post
title: My First Sublime Text 2 Plugin - MXUnit Launcher
time: 2011-09-20 22:16:00 +00:00
categories:
    - Sublime
    - MXUnit
    - ColdFusion
---
 
I'm loving <a href="http://www.sublimetext.com/2">Sublime Text 2</a>, a lightweight text editor that's a real joy to use. Now, I'm a CFEclipse user, and one thing I've missed with Sublime straight away was the ability to run unit tests from within the IDE (using the MXUnit Eclipse plugin).

So I decided to dive into a bit of Python (I'm sure my Python code is terrible) and write a quick and dirty plugin to enable you to launch the currently open file as an MXUnit test case in your browser. You can also set a TestSuite url that you can launch with a keystroke.

It's a start, only tested on Ubuntu, and it's on GitHub:

<https://github.com/DominicWatson/SublimeText2MXUnitLauncher>