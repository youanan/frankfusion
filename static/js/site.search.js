( function( $, global ){
	var search;

	search = (function(){
		var posts = global.searchIndex || []
		  , cache = {}
		  , matchPosts, fromCache, getLevenshteinDistance, generateRegexForInput;

		fromCache = function( store, key, generator ) {
			return generator( key );

			if ( typeof cache[store] === 'undefined' ) {
				cache[store] = {};
			}
			if ( typeof cache[store][key] === 'undefined' ) {
				cache[store][key] = generator( key );
			}

			return cache[store][key];
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

		generateRegexForInput = function( input ){
			var inputLetters = input.replace(/\W/, '').split('')
			  , inputWords   = input.split(/\s/)
			  , generateReplaceString;

			generateReplaceString = function( inputTokenCount ) {
				var replace = "", i;

				for( i=0; i < inputTokenCount; i++ ) {
					replace += ( '<b>$' + (i*2+1) + '</b>' );
					if ( i + 1 < inputTokenCount ) {
						replace += '$' + (i*2+2);
					}
				}

				return replace;
			}

			return {
				simple : {
					  expr    : new RegExp( '(' + inputWords.join( ')(.*?)(' ) + ')', 'i' )
					, replace : generateReplaceString( inputWords.length )
				} , fuzzy : {
					  expr    : new RegExp( '(' + inputLetters.join(')(.*?)(') + ')', 'i' )
					, replace : generateReplaceString( inputLetters.length )

				}
			};
		};

		matchPosts = function (input) {
			var reg = generateRegexForInput( input )
			  , matches, i;

			matches = posts.filter( function( post ) {
				post.matchedSimple = post.title.match( reg.simple.expr );
				if ( post.matchedSimple || post.title.match( reg.fuzzy.expr ) ) {
					post.score = 100 - fromCache( "levenshtein", post.title + input, function(){
						return getLevenshteinDistance( post.title, input );
					} );

					if ( post.matchedSimple ) {
						post.score += 100;
						post.highlighted = post.title.replace( reg.simple.expr, reg.simple.replace );
					} else {
						post.highlighted = post.title.replace( reg.fuzzy.expr, reg.fuzzy.replace );
					}

					return true;
				}
			});

			return matches.sort( function( a, b ){
				return b.score - a.score;
			} );
		};

		return { posts : matchPosts };
	})();


	$.fn.siteSearch = function( settings ){
		return this.each( function(){
			var $input           = $(this)
			  , $resultsList     = $('<ul class="site-search-results"></ul>')
			  , $container       = $input.parent()
			  , lastSearchTerm   = ""
			  , doSearch, renderResult, gotoFirstResult, navigateResults, clearResults, exitSearch;

			$input.after( $resultsList );

			doSearch = function( e ){
				var chr   = String.fromCharCode( e.keyCode )
				  , input = $input.val()
				  , results, i;

				if ( input.length ) {
					if ( input !== lastSearchTerm ) {
						lastSearchTerm = input;

						results = search.posts( input )

						clearResults();

						for( i=0; results[i].score > 70 && i < results.length; i++ ){
							$resultsList.append( renderResult( results[i], i ) );
						}
					}
				} else {
					clearResults();
				}
			};

			renderResult = function( result, index ){
				return $( '<li class="site-search-result ' + (index % 2 ? 'odd' : 'even') +  '"><a href="' + result.href + '">' + result.highlighted + '</a></li>' );
			};

			navigateResults = function( keypressEvent, direction ){
				var $postToFocusOn;
				switch( direction ){
					case 'first':
						$postToFocusOn = $resultsList.find( 'li:first a' );
					break;
					case 'up':
						$postToFocusOn = $resultsList.find( 'li a:focus' ).parent().prev().find( 'a' );
						if ( !$postToFocusOn.length ) {
							$postToFocusOn = $input;
						}
					break;
					case 'down':
						$postToFocusOn = $resultsList.find( 'li a:focus' ).parent().next().find( 'a' );
					break;
				}

				$postToFocusOn.length && $postToFocusOn.focus() && keypressEvent.preventDefault();
			};

			gotoFirstResult = function(){
				$firstResult = $resultsList.find( 'li:first a' );

				if ( $firstResult.length ) {
					document.location = $firstResult.attr('href');
				}
			};

			clearResults = function(){
				$resultsList.find( 'li' ).remove();
			};

			exitSearch = function(){
				$input.blur();
				clearResults();
				return false;
			};


			$input.keyup( 'return', gotoFirstResult )
			      .keyup( 'esc'   , exitSearch )
			      .keydown( 'down', function( e ){ navigateResults( e, 'first' ); } )
			      .keyup( doSearch );

			$resultsList.keydown( 'down', function( e ){ navigateResults( e, 'down' ); } )
			            .keydown( 'up'  , function( e ){ navigateResults( e, 'up'   ); } )
			      		.keyup( 'esc'   , exitSearch );

		} );
	};

} )( jQuery, window );
