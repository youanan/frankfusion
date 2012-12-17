( function( $ ){
	var match;

	match = (function(){
		var posts = [ { href:"/2012/11/keyboard-shortcuts.html", title:"Keyboard shortcuts" } , { href:"/2012/11/code-like-a-jedi.html", title:"Code like a Jedi" } , { href:"/2012/07/good-enough-software-some-psychology.html", title:"Good Enough Software - Some Psychology" } , { href:"/2012/07/the-law-of-demeter.html", title:"The Law of Demeter" } , { href:"/2012/06/good-enough-software.html", title:"Good enough software" } , { href:"/2012/05/coffeescript-comes-to-cfstatic.html", title:"CoffeeScript comes to CfStatic" } , { href:"/2012/05/developers-should-be-encouraged-to-shower.html", title:"Developers should be encouraged to shower" } , { href:"/2012/03/my-first-bit-of-ruby%2C-nice-to-see-in-coldfusion.html", title:"My first bit of Ruby, a nice to see in ColdFusion" } , { href:"/2012/01/cfstatic---embedding-css-images.html", title:"CfStatic - embedding css images" } , { href:"/2012/01/io-and-the-princess-bride.html", title:"Io and The Princess Bride" } , { href:"/2011/10/blueprint-style-grids-using-less-css.html", title:"Blueprint style grids using LESS CSS" } , { href:"/2011/09/another-sublime-plugin---cfquickdocs-searcher.html", title:"Another Sublime Plugin - CFQuickDocs Searcher" } , { href:"/2011/09/my-first-sublime-text-2-plugin---mxunit-launcher.html", title:"My First Sublime Text 2 Plugin - MXUnit Launcher" } , { href:"/2011/09/cfstatic-now-supports-compiling-of-less-css.html", title:"CfStatic now supports compiling of LESS CSS" } , { href:"/2011/09/understanding-the-package-minify-mode-in-cfstatic.html", title:"Understanding the package minify mode in CfStatic" } , { href:"/2011/09/cfstatic-framework-release.html", title:"CfStatic Framework Release" } , { href:"/2011/09/cfspreadsheet-and-the-yucky-colors.html", title:"CfSpreadsheet and the Yucky Colors" } , { href:"/2011/09/source-code-now-on-github.html", title:"Source code now on GitHub" } , { href:"/2011/09/coding-with-apis-in-mind.html", title:"Coding with APIs in mind" } , { href:"/2011/09/adding-gzip-to-my-jeyll-setup.html", title:"Adding GZIP to my Jekyll setup" } , { href:"/2011/09/my-jekyll-setup.html", title:"My Jekyll Setup" } , { href:"/2011/09/excanvas-and-jquery-beauty-tips.html", title:"ExCanvas and jQuery BeautyTips" } , { href:"/2011/09/new-blogging-software.html", title:"New blogging software, Jekyll &amp; Amazon S3" } , { href:"/2011/08/good-article-on-pivot-queries-using.html", title:"Good article on pivot queries using Oracle 11g" } , { href:"/2011/06/oracle-numeric-field-and-cfsqlnumeric.html", title:"Oracle numeric field and cf_sql_numeric gotcha" } , { href:"/2011/06/olap-cubes-in-oracle-11g.html", title:"OLAP Cubes in Oracle 11g" } , { href:"/2011/04/oracle-dates-coldfusion-orm-hibernate.html", title:"Oracle Dates, ColdFusion ORM (Hibernate) and ORA-01830" } , { href:"/2011/03/pagination-in-oracle-10g.html", title:"Pagination in Oracle 10g" } , { href:"/2010/12/bunnymoveears-controlling-your-nabaztag.html", title:"bunny.moveEars( ), controlling your Nabaztag from ColdFusion" } , { href:"/2010/12/apache-solr-part-ii-installing-solr.html", title:"Apache Solr, Part II: Installing Solr with Tomcat" } , { href:"/2010/12/apache-solr-or-departing-from-confines.html", title:"Apache Solr, or, 'departing from the confines of cfsearch': Part I" } , { href:"/2010/12/cheaper-online-backup-and-sync-part-2.html", title:"Cheaper online backup and sync: Part 2, S3Cmd" } , { href:"/2010/11/cheaper-online-backup-and-sync.html", title:"Cheaper online backup and sync" } , { href:"/2010/11/uml-in-eclipse.html", title:"UML in Eclipse" } , { href:"/2009/11/little-cfquery-gotcha.html", title:"Little cfquery gotcha" } , { href:"/2009/05/next-generator-illudium-pu-36-based-app.html", title:"next-generator,  an Illudium PU-36 based app that works with Railo" } , { href:"/2009/03/little-railo-difference-arguments-scope.html", title:"A little Railo Difference, Arguments scope" } , { href:"/2008/04/coldfusion-encapsulation-gotcha.html", title:"ColdFusion Encapsulation Gotcha" } , { href:"/2008/04/scatting-with-coldspring.html", title:"Scatting with ColdSpring" } , { href:"/2008/04/stricter-oop-without-aop-sort-of.html", title:"Stricter OOP without AOP! Sort of ;)" } , { href:"/2008/04/tidy-autosuggesting-solution.html", title:"A tidy autosuggesting solution" } , { href:"/2008/04/better-autosuggesting-widget.html", title:"A better autosuggesting widget" } , { href:"/2008/03/stricter-oop-using-aop.html", title:"Stricter OOP using AOP!" } , { href:"/2008/03/xmlsearch-and-default-namespaces.html", title:"XmlSearch and default Namespaces" } , { href:"/2008/02/undefined-array-elements.html", title:"Undefined array elements" } , { href:"/2007/12/more-loopy-looism.html", title:"More loopy looism" } , { href:"/2007/12/sql-date-comparison-gotcha.html", title:"SQL Date Comparison Gotcha" } , { href:"/2007/09/loopy-loo.html", title:"Loopy Loo" } , { href:"/2007/09/betterxml-beta-release.html", title:"BetterXml Beta Release" } , { href:"/2007/09/singular-url-and-form-variable.html", title:"Singular URL and FORM variable" } , { href:"/2007/09/coldfusion-objects-are-java-objects.html", title:"ColdFusion objects are Java objects..." } ]
		  , cache = {}
		  , matchPosts, fromCache, getLevenshteinDistance;

		fromCache = function( key, generator ) {
			if ( typeof cache[key] === 'undefined' ) {
				cache[key] = generator( key );
			}

			return cache[key];
		};

		getLevenshteinDistance = function( a, b ){
			if(a.length == 0) return b.length;
			if(b.length == 0) return a.length;

			var matrix = [];

			// increment along the first column of each row
			var i;
			for(i = 0; i <= b.length; i++){
				matrix[i] = [i];
			}

			// increment each column in the first row
			var j;
			for(j = 0; j <= a.length; j++){
				matrix[0][j] = j;
			}

			// Fill in the rest of the matrix
			for(i = 1; i <= b.length; i++){
				for(j = 1; j <= a.length; j++){
					if(b.charAt(i-1) == a.charAt(j-1)){
						matrix[i][j] = matrix[i-1][j-1];
					} else {
						matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
																		Math.min(matrix[i][j-1] + 1, // insertion
																						 matrix[i-1][j] + 1)); // deletion
					}
				}
			}

			return matrix[b.length][a.length];
		};

		matchPosts = function (input) {
			var matches, i
			  , reg = fromCache( input, function( input ){
				var pureInput = input.replace(/\W/, "")
				  , expr    = new RegExp( '(' + pureInput.split('').join(')(.*?)(') + ')', 'i' )
				  , replace = "", i;

				for( i=0; i < pureInput.length; i++ ) {
					replace += ( '<b>$' + (i*2+1) + '</b>' );
					if ( i + 1 < pureInput.length ) {
						replace += '$' + (i*2+2);
					}
				}

				return {
					  expr    : expr
					, replace : replace
				};
			} );

			matches = posts.filter( function( post ) {
				if ( post.title.match( reg.expr ) ) {
					return true;
				}
			});

			matches.sort( function( a, b ){
				var aScore = fromCache( "levenstein" + a, function(){ return getLevenshteinDistance( a.title, input ); } )
				  , bScore = fromCache( "levenstein" + b, function(){ return getLevenshteinDistance( b.title, input ); } );

				return aScore - bScore;
			} );

			for( i=matches.length-1; i>=0; i-- ){
				matches[i].highlighted = matches[i].title.replace( reg.expr, reg.replace );
			}

			return matches;
		};

		return { posts : matchPosts };
	})();


	$.fn.siteSearch = function( settings ){
		return this.each( function(){
			var $input           = $(this)
			  , $resultsList     = $('<ul class="site-search-results"></ul>')
			  , doSearch, renderResult;

			$input.after( $resultsList );

			doSearch = function(){
				var results = match.posts( $input.val() )
				  , i;

				$resultsList.find( 'li' ).remove();

				for( i=0; i < results.length; i++ ){
					$resultsList.append( renderResult( results[i] ) );
				}
			};

			renderResult = function( result ){
				return $( '<li class="site-search-result"><a href="' + result.href + '">' + result.highlighted + '</a></li>' );
			};

			$input.keyup( doSearch );
		} );
	};

	$( '#site-search-input' ).siteSearch();

} )( jQuery );