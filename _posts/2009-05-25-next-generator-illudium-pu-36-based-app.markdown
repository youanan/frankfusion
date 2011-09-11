--- 
name: next-generator-illudium-pu-36-based-app
layout: post
title: next-generator,  an Illudium PU-36 based app that works with Railo
time: 2009-05-25 16:31:00 +01:00
categories:
    - ColdFusion
    - Railo
---
One rainy day, I sat down to auto generate a bunch of CFCs using <a href="http://www.remotesynthesis.com/" title="Brian Rinaldi's Blog">Brian Rinaldi's</a> marvellous <a href="http://code.google.com/p/cfcgenerator/source/checkout">Illudium PU-36 Code Generator</a>. The trouble was, I was using Railo, and the blessed thing didn't work first time. Having zero patience, I decided to rewrite the generator using HTML and js only, and adding functionality that I had always wanted to see.

<a href="http://nextgen.riaforge.org/">download</a>

How is it different from the original?
--------------------------------------

This code is at least 50% Illudium PU-36. However, I have:

* extensively reorganised the model;
* made the project xml schema less implicit;
* added the ability to generate code for multiple tables at once;
* added the ability to serve the code as a zip file;
* added support for Railo 3.1;
* *removed* the option for viewing the generated code in the page;
* *removed* Flex from the equation; the application front end is html with a little javascript.

That's all for now! Dominic
