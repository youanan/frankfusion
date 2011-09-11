--- 
name: betterxml-beta-release.html
layout: post
title: BetterXml Beta Release
time: 2007-09-23 23:14:00 +01:00
categories:
    - ColdFusion
    - XML
    - Projects
---

<http://betterxml.riaforge.org/>

After some initial learning about XML and handling it in ColdFusion 6.1 & 7, I came to the conclusion that ColdFusion wasn't the best when it came to XML.

When reading and transforming XML, ColdFusion does a great job and is at its usual brilliantly quick. Where I think it gets cumbersome is in maintenance scenarios where you have to edit a given XML file. For example, you may have some XML that is being used as the sole data source and needs updating whenever a user adds item x or deletes item z, etc.

An ideal solution to this is to use XPath to quickly navigate the XML in readiness for your CRUD operations. ColdFusion's XMLSearch() method is not suitable in this case however, as it only returns data from an XPath query. To navigate the XML using XPath, we need the XPath query to return a nodeset that is a collection of pointers to the original data. Once we have this collection of pointers, we can go about performing our CRUD operations on the data.

This is where BetterXML comes in. BetterXML is a set of two ColdFusion Components; an XML reader and an XML editor, the editor extending the reader. They both use the org.apache.xpath.XPathAPI java object that lets them quickly navigate the data using XPath.

The public methods are as follows:

XML Reader:
-----------
* Init( src ) - Returns an instance of the object, loading the XML if supplied
* Load( src ) - loads XML from either an xml string, file or URL
* Search( XPath, filter ) - returns an array of either strings or simplified structures based on the results of the XPath query
* Count( XPath ) - returns the number of results returned by the XPath query
* Names( XPath ) - returns the names of the attributes and elements returned by the XPath query
* XML() - returns the XML as a string

XML Editor:
-----------

* Init( src ) - Returns an instance of the object, loading the XML if supplied
* Write( destination ) - Writes the XML to file
* CreateElement( XPath, Name, Value ) - Creates an element in all the parents returned by the XPath query. The value of the element can be a simple value or a structure to write nested elements.
* CreateAttribute( XPath, Name, Value ) - Creates an attribute in all the elements returned by the XPath query
* Update( XPath, Value ) - Updates all the elements returned by the XPath query. The updated value can be a simple value or a structure to write nested elements.
* Delete( XPath ) - Deletes all the elements returned by the XPath query

A quick example
---------------
Lets say you have a huge XML file that is full of comments that are now redundant. To delete all the comments from the file we can do:

{% highlight cfm %}<cfinvoke component="BetterXML_Editor" method="init" src="#myFile#" returnVariable="xmlFile"/>
<cfscript>
	xmlFile.Delete('//comment()');
	xmlFile.Write(myFile);
</cfscript>{% endhighlight %}

The code is minimal and the load times hugely improved when compared to using native ColdFusion functions to achieve the same end :)

Dom
