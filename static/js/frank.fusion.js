( function( $ ){

	var $keyboardHelp = $( '#keyboard-navigation-help' )
	  , $categories   = $( '#published-in a' )
	  , $showHelp     = $( '#show-keyboard-shortcuts' )
	  , gotoMode     = false
	  , helpShowing  = false
	  , shiftPostListFocus
	  , showKeyboardShortcutHelp
	  , hideKeyboardShortcutHelp
	  , toggleKeyboardShortcutHelp
	  , toggleGotoMode
	  , gotoAccessKeyLink
	  , gotoCategory
	  , genericKeyHandler
	  , escapeFeatures
	  , getFocusedPostLink
	  , focusOnFirstPost;

	shiftPostListFocus = function( e, direction ){
		var $focusedLink = getFocusedPostLink()
		  , $focusedItem, $nextItemToFocusOn;

		if ( $focusedLink.length ) {
			e.preventDefault();

			$focusedItem = $focusedLink.parent();
			$nextItemToFocusOn = direction == 'up' ? $focusedItem.prev() : $focusedItem.next();

			if ( $nextItemToFocusOn.length ) {
				$nextItemToFocusOn.find( '.post-list-item-link' ).focus();
			} else {
				$focusedLink.blur();
			}
		}
	};

	toggleGotoMode = function() {
		gotoMode = !gotoMode;

		if ( gotoMode ) {
			setTimeout( toggleGotoMode, 1000 );
		}
	};

	showKeyboardShortcutHelp = function(){
		helpShowing = true;
		$keyboardHelp.stop().fadeIn( 400 );
	};

	hideKeyboardShortcutHelp = function(){
		if ( helpShowing ) {
			helpShowing = false;
			$keyboardHelp.stop().fadeOut( 400 );
		}
	};

	toggleKeyboardShortcutHelp = function(){
		helpShowing ? hideKeyboardShortcutHelp() : showKeyboardShortcutHelp();
	};

	genericKeyHandler = function( e ){
		var chr = String.fromCharCode( e.keyCode );
		if ( gotoMode && chr !== 'g' && chr !== 'G' ) {
			isNaN( chr ) ? gotoAccessKeyLink( chr ) : gotoCategory( chr );
		}
	};

	gotoAccessKeyLink = function( key ){
		var $gotoLink = $( '*[data-goto-key=' + key.toLowerCase() + ']' );

		if ( $gotoLink.length ) {
			document.location = $gotoLink.attr('href');
		}
	};

	gotoCategory = function( index ){
		if ( index >= 1 && index <= $categories.length ) {
			document.location = $categories.get( index-1 ).href;
		}
	};

	getFocusedPostLink = function(){
		return $( '.post-list-item-link:focus' );
	};

	focusOnFirstPost = function(){
		$( '.post-list-item-link:first' ).focus();
	};

	escapeFeatures = function(){
		hideKeyboardShortcutHelp();
		getFocusedPostLink().blur();
	};


	$('body').keydown( 'up'     , function( e ){ shiftPostListFocus( e, 'up'   ); } )
	         .keydown( 'down'   , function( e ){ shiftPostListFocus( e, 'down' ); } )
	         .keydown( 'g'      , toggleGotoMode             )
	         .keydown( 'shift+/', toggleKeyboardShortcutHelp )
	         .keydown( 'esc'    , escapeFeatures             )
	         .keydown( '1'      , focusOnFirstPost           )
	         .keydown( genericKeyHandler );

	$showHelp.click( function( e ){
		e.preventDefault();
		toggleKeyboardShortcutHelp();
	} );

	$( '.shortcut-key' ).each( function(){
		var $this = $( this )
		  , key   = $this.text().toLowerCase();

		$this.attr( "title", "Type 'g' then '" + key + "' to follow this link" );
	} );

	focusOnFirstPost();

	$( window ).load( function(){
		if ( $('#disqus_thread').length ){
			window.disqus_shortname = 'frankfusion';
			$('body').append( '<script type="text/javascript" async="true" src="http://frankfusion.disqus.com/embed.js"></script>' );
		}
	} );

} )( jQuery );