/*!
 * caption.js | easily and semantically add captions to your images
 * http://captionjs.com
 *
 * Copyright 2013, Eric Magnuson
 * Released under the MIT license
 * https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
 *
 * v0.9.2
 * Date: 2013-09-09
 */
(function($, window, undefined){
	$.fn.captionjs = function(opts){
		// Default values for options
		var defaults = {
			'class_name' : 'caption',  // Class name assigned to each <figure>
			'schema'     : true,       // Use schema.org markup (i.e., itemtype, itemprop)
			'stacked'    : false,      // Place the caption on top of the photo
			'animated'   : false,      // Show the animation on hover only ('stacked' must also be enabled)
			'debug_mode' : false       // Output debug info to the JS console
		}

		// Extend the options from defaults with user's options
		var options = $.extend(defaults, opts || {});

		// jQuery chainability
		return this.each(function(){
			// Do logic here.
			if (options.debug_mode) console.log('caption.js | Starting.');

			// Form basic structures and assign vars
			var $this       = $(this),  // The image
				$caption    = $this.data('caption') ? $this.data('caption') : $this.attr('alt'),
				$figure     = $this.wrap('<figure class="' + options.class_name + '"/>').after('<figcaption/>').parent(),
				$figcaption = $this.next('figcaption').html($caption);

			if (options.debug_mode) console.log('caption.js | Caption: ' + $caption);

			// Set width of the figure, our top-most container for caption.js.
			$figure.width($this.outerWidth());

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

			// Stack caption on photo if enabled
			if (options.stacked === true)
			{
				$figure.addClass('stacked').css('position', 'relative');
				$figcaption.css({
					'position': 'absolute',
					'bottom': '0',
					'margin-bottom': '0',
				});
			}

			// Animate if enabled
			if ((options.animated && options.stacked) === true)
			{
				$figure.addClass('animated').css('overflow', 'hidden');
				$figcaption.css('bottom', -$figcaption.outerHeight());
			}
		});
	};
})(jQuery, window);
