--- 
name: stricter-oop-using-aop
layout: post
title: Stricter OOP using AOP!
time: 2008-03-30 13:55:00 +01:00
categories:
    - ColdFusion
    - AOP
---
*An application I wrote recently was exhibiting a strange bug. When a user added contacts to the contacts database, details from previously entered contacts were being inserted in fields that were left blank for the new contact. The client had entered over a hundred contacts before they realised that this was happening and were somewhat worried. After some investigation, I tracked down the cause of the problem: an accidentally unscoped variable in a CFC method.*<!--more-->

In Object Oriented languages, an object's properties are explicitly declared in its definition; they are integral to the make-up of the object. To add or remove an object's properties during its life could be seen as mutating the object and an undesirable behaviour in a strict OO design (I do not believe it is possible to do this in C++ but I may be mistaken).

Due to the way we emulate OO in ColdFusion, such mutation is exactly what happened when I clumsily used an unscoped variable in my CFC; the variable became part of my object's 'integral make-up' resulting in the sneaky bug.

This made me wonder: how could I restrict my objects from ever modifiying their definitions by deleting or creating new variables in the *variables* or *this* scope during their existance?

The first, and so far only, useable answer I have arrived at is through using <a href="http://en.wikipedia.org/wiki/Aspect-oriented_programming">Aspect Oriented Programming </a>(AOP). My implementation uses the <a href="http://www.coldspringframework.org/docs/index.htm#Aspect_Oriented_Programming_w__ColdSpring.htm">ColdSpring </a>framework although it could be done without it. For the AOP savvy, I simply created an *around advice* object that checks the target object's properties before and after any method execution - if there is an inconsistency, an appropriate error is thrown. The pseudo code looks like this:

`BEGIN
	SET variablesBefore = Get object's variables
	EXECUTE object's method
	SET variablesAfter = Get object's variables
	IF variablesBefore <> variablesAfter THEN throw error
END`

If anyone is interested in the Source code I can post it, just a PITA to put code up using blogger! Better solutions on a postcard.

Dominic
