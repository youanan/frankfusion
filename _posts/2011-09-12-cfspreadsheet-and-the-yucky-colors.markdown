---
layout: post
title: CfSpreadsheet and the Yucky Colors
time: 2011-09-12 19:24:00 +00:00
categories:
    - ColdFusion
    - Java
---

*Doing some spreadsheet work for accounting types who like pretty formatting and the right colors, I soon encountered a limitation with ColdFusion 9's built in spreadsheet functionality. Namely, the predefined list of colors available for various stylings...*<!--more--> 

In there you get such beauties as, *'lemon_chiffon'* and *'light_cornflower_blue'*, but no options to pass in a hex color. Bizarre you say? Damn right.

Defenders might jump in to blame the underlying tech, Apache POI, but that's not quite fair - POI provides methods for creating custom palettes, the CF implementation just didn't hook into it, missing an opportunity for some lovely API abstraction (though they achieved plenty of other good stuff).

A solution
----------

Flicking franticly through the documentaion of POI, I stumbled on the 'setColorAtIndex()' method which I figured meant I could override the colors in the predefined palette. A single google later and I unexpectedly found myself at a ColdFusion blog who's author had thought the exact same thing **and** came up with some working code, l33t:

<http://existdissolve.com/2010/11/cfspreadsheet-custom-colors-part-deux/>

With <a href="/2011/09/coding-with-apis-in-mind.html">API coding in mind</a>, I made this wrapper to transparently override the colors in the default color paletted (credit to *existdissolve* and the *hexToRgb()* udf on <http://cflib.org>):

{% highlight cfm %}
<cfscript>
void function spreadsheetSetCustomPalette(required any workbook, required struct palette){
	var customPalette = arguments.workbook.getworkbook().getcustompalette();
	var color         = "";
	var colorIndex    = 0;
	var rgb           = "";

	for(color in palette){
		try{
			colorIndex = CreateObject("java", "org.apache.poi.hssf.util.HSSFColor$#UCase( color )#").GetIndex();					

		} catch(any e){
			throw("badColor", "The color, '#color#', was not found in the org.apache.poi.hssf.util.HSSFColor palette");
		}

		try{
			rgb = hexToRGBByteValues(palette[color]);
		} catch(any e){
			throw("badColor", "The color, '#palette[color]#', is not a valid hex color");
		}

		customPalette.setcoloratindex(colorIndex, rgb.r, rgb.g, rgb.b);
	}	
}

string function hexToRGBByteValues( required string rgbColor ) {
	var hex     = Replace(arguments.hexColor, '##', '', 'ALL');
	var rgb     = {};
	var rgbList = "";
	var i       = 0;

	for (i=1; i lte 5; i=i+2){
	    rgbList = listAppend(rgbList, InputBaseN(mid(hex,i,2),16));
	}

	rgb.R = javacast("int", ListGetAt(rgbList, 1)).bytevalue();
	rgb.G = javacast("int", ListGetAt(rgbList, 2)).bytevalue();
	rgb.B = javacast("int", ListGetAt(rgbList, 3)).bytevalue();

	return rgb;
}

string function exampleUsage(){

	var workBook = SpreadsheetNew();

	spreadsheetSetCustomPalette( workbook, {white="000000", black="FFFFFF", lemon_chiffon="FF0000"} );

	// carry on with your workbook as normal, the colors above will be substituted...

}
</cfscript>
{% endhighlight %}

It's here as a Gist to do with it as you will (if you improve it though, be sure to update the gist):

<https://gist.github.com/1211688>
