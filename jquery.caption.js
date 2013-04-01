/*!
 * caption.js | easily and semantically add captions to your images
 * http://captionjs.com
 *
 * Copyright 2013, Eric Magnuson
 * Released under the MIT license
 * https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
 *
 * v.0.9.0
 * Date: 2013-3-31
 */
(function($, window, undefined){
	$.fn.captionjs = function(opts){
		// Default values for options
		var defaults = {
			'class_name'   : 'caption',  // Class name assigned to each <figure>
			'schema'       : false,		 // User schema.org markup (i.e., itemtype, itemprop)
			'debug_mode'   : false       // Output debug info to the JS console
		}

		// Extend the options from defaults with user's options
		var options = $.extend(defaults, opts || {});

		// jQuery chainability
		return this.each(function(){
			// Do logic here.
			if (options.debug_mode) console.log('caption.js | Starting.');

			// Form basic structures and assign vars
			var $this = $(this);  // The image
			var $caption = $this.data('caption') ? $this.data('caption') : $this.attr('alt');

			if (options.debug_mode) console.log('caption.js | Caption: ' + $caption);

			var $figure = $this.wrap('<figure class="' + options.class_name + '"/>').after('<figcaption/>').parent();
			var $figcaption = $this.next('figcaption').html($caption);

			// Set width of the figure, our top-most container for caption.js.
			$figure.width($this.outerWidth());
		});
	};
})(jQuery, window);