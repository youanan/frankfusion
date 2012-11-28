( function( $ ){

	var $keyboardHelp = $( '#keyboard-navigation-help' )
	  , $categories   = $( '#published-in a' )
	  , $showHelp     = $( '#show-keyboard-shortcuts' )
	  , _gotoMode     = false
	  , _helpShowing  = false
	  , _shiftPostListFocus
	  , _showKeyboardShortcutHelp
	  , _hideKeyboardShortcutHelp
	  , _toggleKeyboardShortcutHelp
	  , _toggleGotoMode
	  , _gotoAccessKeyLink
	  , _gotoCategory
	  , _genericKeyHandler
	  , _escapeFeatures
	  , _getFocusedPostLink;

	_shiftPostListFocus = function( e, direction ){
		var $focusedLink = _getFocusedPostLink()
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

	_toggleGotoMode = function() {
		_gotoMode = !_gotoMode;

		if ( _gotoMode ) {
			setTimeout( _toggleGotoMode, 1000 );
		}
	};

	_showKeyboardShortcutHelp = function(){
		_helpShowing = true;
		$keyboardHelp.stop().fadeIn( 400 );
	};

	_hideKeyboardShortcutHelp = function(){
		if ( _helpShowing ) {
			_helpShowing = false;
			$keyboardHelp.stop().fadeOut( 400 );
		}
	};

	_toggleKeyboardShortcutHelp = function(){
		_helpShowing ? _hideKeyboardShortcutHelp() : _showKeyboardShortcutHelp();
	};

	_genericKeyHandler = function( e ){
		var chr = String.fromCharCode( e.keyCode );
		if ( _gotoMode && chr !== 'g' && chr !== 'G' ) {
			isNaN( chr ) ? _gotoAccessKeyLink( chr ) : _gotoCategory( chr );
		}
	};

	_gotoAccessKeyLink = function( key ){
		var $gotoLink = $( '*[accesskey=' + key.toLowerCase() + ']' );

		if ( $gotoLink.length ) {
			document.location = $gotoLink.attr('href');
		}
	};

	_gotoCategory = function( index ){
		if ( index >= 1 && index <= $categories.length ) {
			document.location = $categories.get( index-1 ).href;
		}
	};

	_getFocusedPostLink = function(){
		return $( '.post-list-item-link:focus' );
	};

	_escapeFeatures = function(){
		_hideKeyboardShortcutHelp();
		_getFocusedPostLink().blur();
	};


	$('body').keydown( 'up'     , function( e ){ _shiftPostListFocus( e, 'up'   ); } )
	         .keydown( 'down'   , function( e ){ _shiftPostListFocus( e, 'down' ); } )
	         .keydown( 'g'      , _toggleGotoMode             )
	         .keydown( 'shift+/', _toggleKeyboardShortcutHelp )
	         .keydown( 'esc'    , _escapeFeatures             )
	         .keydown( _genericKeyHandler );

	$showHelp.click( function( e ){
		e.preventDefault();
		_toggleKeyboardShortcutHelp();
	} );

} )( jQuery );