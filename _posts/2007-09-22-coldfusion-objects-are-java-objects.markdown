--- 
name: coldfusion-objects-are-java-objects
layout: post
title: ColdFusion objects are Java objects...
time: 2007-09-22 22:32:00 +00:00
categories:
    - ColdFusion
    - Java
---

A good while back I read the following post about using the methods that ColdFusion objects inherit from their Java parents. It prompted me to write a little function for finding out what Java objects any ColdFusion object inherits from:

<http://coldfused.blogspot.com/2007/01/extend-cf-native-objects-harnessing.html>

{% highlight cfm %}<cfscript>
function GetClassHeirarchy(obj){
	var thisClass = obj.GetClass();
	var sReturn = thisClass.GetName();
	do{
		thisClass = thisClass.GetSuperClass();
		sReturn = sReturn & " EXTENDS: #thisClass.GetName()#";
	} while(CompareNoCase(thisClass.GetName(), 'java.lang.Object'));
	return sReturn;
}
</cfscript>
<!--- so, for example: --->
<cfoutput>#GetClassHeirarchy(StructNew())#</cfoutput>{% endhighlight %}

I think it fairly useless having the function just sitting around and have decided to post results, with links to java and other docs, here on the interweb! You will be able to use most, if not all, the inherited methods that you see in the JavaDocs.

**ColdFusion Query**
java.lang.Object -> coldfusion.sql.imq.imqTable -> coldfusion.sql.Table -> coldfusion.sql.QueryTable

**ColdFusion Struct**
java.lang.Object -> java.util.Dictionary -> java.util.Hashtable -> coldfusion.util.FastHashtable -> coldfusion.runtime.Struct

**ColdFusion Array**
java.lang.Object -> java.util.AbstractCollection -> java.util.AbstractList -> java.util.Vector -> coldfusion.runtime.Array

**ColdFusion XML Document Object**
java.lang.Object -> org.apache.xerces.dom.NodeImpl -> org.apache.xerces.dom.ChildNode -> org.apache.xerces.dom.ParentNode -> org.apache.xerces.dom.CoreDocumentImpl -> org.apache.xerces.dom.DocumentImpl

That's all for now, will be posting examples of use in the coming hours...

Dom
