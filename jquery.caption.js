/*!
 * caption.js | easily and semantically add captions to your images
 * http://captionjs.com
 *
 * Copyright 2013-2014, Eric Magnuson
 * Released under the MIT license
 * https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
 *
 * v0.9.5
 * Date: 2014-03-29
 */
(function($, window, undefined){
	$.fn.captionjs = function(opts){

		// Default values for options
		var defaults = {
			'class_name'      : 'captionjs', // Class name assigned to each <figure>
			'schema'          : true,        // Use schema.org markup (i.e., itemtype, itemprop)
			'mode'            : 'default',   // default | static | animated | hide
			'debug_mode'      : false,       // Output debug info to the JS console
			'force_dimensions': false        // Force the dimensions in case they can't be detected (e.g., image is not yet painted to viewport)
		}

		// Extend the options from defaults with user's options
		var options = $.extend(defaults, opts || {});

		// jQuery chainability -- do the magic below
		return this.each(function(){

			if (options.debug_mode) console.log('caption.js | Starting.');

			// Form basic structures and assign vars
			var $this       = $(this),  // The image
				$caption    = $this.data('caption') ? $this.data('caption') : $this.attr('alt'),
				$figure     = $this.wrap('<figure class="' + options.class_name + '"/>').after('<figcaption/>').parent(),
				$figcaption = $this.next('figcaption').html($caption),
				target_width,
				target_height;

			// If no caption is supplied, just remove the figcaption.
			if ($caption === '') $figcaption.remove();

			if (options.debug_mode) console.log('caption.js | Caption: ' + $caption);

			// Determine the appropriate dimensions for the figure, our top-most container for caption.js.
			if (options.force_dimensions)
			{
				if (options.debug_mode) console.log('caption.js | Forcing dimensions with a clone.');

				// Create a clone outside of the viewport to detect and
				// then set the dimensions.
				var $clone = $figure.clone().css({
					'position': 'absolute',
					'left'    : '-9999px'
				}).appendTo('body');

				target_width = $('img', $clone).outerWidth(),
				target_height = $('figcaption', $clone).css('width', target_width).outerHeight(); // Make sure width (and thus line wrapping) is enforced so that the height is correct

				$clone.remove();
			}
			else
			{
				target_width = $this.outerWidth();
				target_height = $figcaption.outerHeight();
			}

			// Set the width of the figure.
			$figure.width(target_width);

			// Schema markup if enabled
			if (options.schema === true)
			{
				$figure.attr({
					'itemscope': 'itemscope',
					'itemtype':  'http://schema.org/Photograph'
				});
				$figcaption.attr('itemprop', 'name');
				$this.attr('itemprop', 'image');
			}

			// Stacked mode
			if (options.mode === 'stacked')
			{
				$figure.addClass('stacked');
				$figcaption.css({
					'margin-bottom': '0',
					'bottom': '0',
				});
			}

			// Animated mode
			if (options.mode === 'animated')
			{
				$figure.addClass('animated');
				$figcaption.css({
					'margin-bottom': '0',
					'bottom': -target_height,
				});
			}

			// Hide mode
			if (options.mode === 'hide')
			{
				$figure.addClass('hide');
				$figcaption.css({
					'margin-bottom': target_height,
					'bottom': -target_height,
				});
			}

		});
	};
})(jQuery, window);
