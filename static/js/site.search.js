( function( $, global ){

	var searchEngine = (function(){
		var searchIndex = global.searchIndex || []
		  , cache = {}, search, generateRegexForInput;

		search = function( input ){
			var reg = generateRegexForInput( input )
			  , matches;

			matches = searchIndex.filter( function( item ) {
				var titleLen = item.title.length
				  , match, nextMatch, i, highlighted;

				for( i=0; i < titleLen; i++ ){
					nextMatch = item.title.substr(i).match( reg.expr );

					if ( !nextMatch ) {
						break;
					} else if ( !match || nextMatch[0].length < match[0].length ) {
						match = nextMatch;
						highlighted = item.title.substr(0,i) + item.title.substr(i).replace( reg.expr, reg.replace );
					}
				}

				if ( match ) {
					item.score       = 100 - ( match[0].length - input.length );
					item.highlighted = highlighted;

					return true;
				}
			});

			return matches.sort( function( a, b ){
				return ( b.score - a.score ) || a.title.length - b.title.length;
			} );
		};

		generateRegexForInput = function( input ){
			var inputLetters = input.replace(/\W/, '').split('')
			  , reg = {}, i;

			reg.expr = new RegExp( '(' + inputLetters.join( ')(.*?)(' ) + ')', 'i' );
			reg.replace = ""

			for( i=0; i < inputLetters.length; i++ ) {
				reg.replace += ( '<b>$' + (i*2+1) + '</b>' );
				if ( i + 1 < inputLetters.length ) {
					reg.replace += '$' + (i*2+2);
				}
			}

			return reg
		};

		return { search : search };
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

						results = searchEngine.search( input )

						clearResults();

						for( i=0; i < results.length && results[i].score > 70; i++ ){
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