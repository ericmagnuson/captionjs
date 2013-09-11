/*!
 * caption.js | easily and semantically add captions to your images
 * http://captionjs.com
 *
 * Copyright 2013, Eric Magnuson
 * Released under the MIT license
 * https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
 *
 * v0.9.3
 * Date: 2013-09-10
 */
(function($, window, undefined){
	$.fn.captionjs = function(opts){
		// Default values for options
		var defaults = {
			'class_name' : 'captionjs',  // Class name assigned to each <figure>
			'schema'     : true,         // Use schema.org markup (i.e., itemtype, itemprop)
			'mode'       : 'default',    // default | static | animated | hide
			'debug_mode' : false         // Output debug info to the JS console
		}

		// Extend the options from defaults with user's options
		var options = $.extend(defaults, opts || {});

		// jQuery chainability
		return this.each(function(){
			// Do the magic here.
			if (options.debug_mode) console.log('caption.js | Starting.');

			// Form basic structures and assign vars
			var $this       = $(this),  // The image
			    $caption    = $this.data('caption') ? $this.data('caption') : $this.attr('alt'),
			    $figure     = $this.wrap('<figure class="' + options.class_name + '"/>').after('<figcaption/>').parent(),
			    $figcaption = $this.next('figcaption').html($caption);

			// If no caption is supplied, just remove the figcaption.
			if ($caption === '') $figcaption.remove();

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
					'bottom': -$figcaption.outerHeight(),
				});
			}

			// Hide mode
			if (options.mode === 'hide')
			{
				$figure.addClass('hide');
				$figcaption.css({
					'margin-bottom': $figcaption.outerHeight(),
					'bottom': -$figcaption.outerHeight(),
				});
			}

		});
	};
})(jQuery, window);
