/*!
 * caption.js | easily and semantically add captions to your images
 * http://captionjs.com
 *
 * Copyright 2013-2014, Eric Magnuson
 * Released under the MIT license
 * https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
 *
 * v0.9.8
 * Date: 2014-10-13
 */
(function($, window, undefined){
	$.fn.captionjs = function(opts){

		// Default values for options
		var defaults = {
			'class_name'      : 'captionjs', // Class name for each <figure>
			'schema'          : true,        // Use schema.org markup (i.e., itemtype, itemprop)
			'mode'            : 'default',   // default | stacked | animated | hide
			'debug_mode'      : false,       // Output debug info to the JS console
			'force_dimensions': true,        // Force the dimensions in case they cannot be detected (e.g., image is not yet painted to viewport)
			'is_responsive'   : false,       // Ensure the figure and image change size when in responsive layout. Requires a container to control responsiveness!
			'inherit_styles'  : false        // Have the caption.js container inherit box-model properties from the original image
		};

		// Extend the options from defaults with user's options
		var options = $.extend(defaults, opts || {});

		// Function to copy styles
		var transferStyles = function(property, reset_val, $origin, $target){
			if ($origin.jquery && $target.jquery) // Check that they are jQuery objects
			{
				$origin.css(property, $target.css(property));
				$target.css(property, reset_val);
			}
		};

		// jQuery chainability -- do the magic below
		return this.each(function(){

			if (options.debug_mode) console.log('caption.js | Starting.');

			// Form basic structures and assign vars
			var $this       = $(this),  // The image
				$caption    = $this.data('caption') ? $this.data('caption') : $this.attr('alt'),
				$figure     = $this.wrap('<figure class="' + options.class_name + ' ' + options.mode + '"/>').after('<figcaption/>').parent(),
				$figcaption = $this.next('figcaption').html($caption),
				$link       = $this.data('link') ? $figcaption.wrapInner('<a href="' + $this.data('link') + '"/>').children('a').css('padding', '0').css('margin', '0') : null,
				target_width,
				target_height;

			// If no caption is supplied, just remove the figcaption.
			if ($caption === '') $figcaption.remove();

			if (options.debug_mode) console.log('caption.js | Caption: ' + $caption);

			// Determine the appropriate dimensions for the figure, our top-most container for caption.js.
			if (options.force_dimensions)
			{
				if (options.debug_mode) console.log('caption.js | Forcing dimensions with a clone.');

				// Create a clone outside of the viewport to detect and then set the dimensions.
				var $clone = $figure.clone().css({
					'position': 'absolute',
					'left'    : '-9999px'
				}).appendTo('body');

				target_width = $('img', $clone).outerWidth();
				target_height = $('figcaption', $clone).css('width', target_width).css('clear', 'both').outerHeight(); // Make sure width (and thus line wrapping) is enforced so that the height is correct

				$clone.remove();
			}
			else
			{
				target_width = $this.outerWidth();
				target_height = $figcaption.outerHeight();
			}

			// If responsive, set widths across the board to 100%. We will rely on a
			// responsive container to constrain the size of the image.
			if (options.is_responsive)
			{
				target_width = '100%';
				$this.width(target_width);
			}

			// Copy styles if need be
			if (options.inherit_styles)
			{
				if ($this.css('display') == 'inline')
					$figure.css('display', 'inline-block');
				else
					transferStyles('display', 'block', $figure, $this);

				if ($this.css('position') == 'static')
					$figure.css('position', 'relative');
				else
					transferStyles('position', 'relative', $figure, $this);

				transferStyles('clear', 'both', $figure, $this);
				transferStyles('float', 'none', $figure, $this);
				transferStyles('margin', '0', $figure, $this);
				// transferStyles('padding', '0', $figure, $this); // Finish this
				$this.css('padding', '0');
				transferStyles('left', 'auto', $figure, $this);
				transferStyles('right', 'auto', $figure, $this);
				transferStyles('top', 'auto', $figure, $this);
				transferStyles('bottom', 'auto', $figure, $this);
				transferStyles('z-index', $this.css('z-index'), $figure, $this);
			}

			// Set the width of the figure.
			$figure.width(target_width);

			// Schema markup if enabled
			if (options.schema)
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
				$figcaption.css({
					'margin-bottom': '0',
					'bottom': '0',
				});
			}

			// Animated mode
			if (options.mode === 'animated')
			{
				$figcaption.css({
					'margin-bottom': '0',
					'bottom': -target_height,
				});
			}

			// Hide mode
			if (options.mode === 'hide')
			{
				$figcaption.css({
					'margin-bottom': target_height,
					'bottom': -target_height,
				});
			}

		});
	};
})(jQuery, window);
