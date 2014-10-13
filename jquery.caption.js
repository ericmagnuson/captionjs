/*!
 * caption.js | easily and semantically add captions to your images
 * http://captionjs.com
 *
 * Copyright 2013-2014, Eric Magnuson
 * Released under the MIT license
 * https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
 *
 * v0.9.6
 * Date: 2014-09-03
 */
(function($, window, undefined){
	$.fn.captionjs = function(opts){

		// Default values for options
		var defaults = {
			'class_name'      : 'captionjs', // Class name assigned to each <figure>
			'schema'          : true,        // Use schema.org markup (i.e., itemtype, itemprop)
			'mode'            : 'default',   // default | static | animated | hide
			'debug_mode'      : false,       // Output debug info to the JS console
			'force_dimensions': false,       // Force the dimensions in case they can't be detected (e.g., image is not yet painted to viewport)
			'is_responsive'   : false,       // Ensure the figure and image change size when in responsive layout. Requires a container to control responsiveness!
			'inherit_styles'  : true         // Have the caption.js container inherit all styles from the original image
		};

		// Extend the options from defaults with user's options
		var options = $.extend(defaults, opts || {});

		// Function to copy styles
		(function($){
			$.fn.getStyleObject = function(){
				var dom = this.get(0);
				var style;
				var returns = {};
				if(window.getComputedStyle){
					var camelize = function(a,b){
						return b.toUpperCase();
					};
					style = window.getComputedStyle(dom, null);
					for(var i = 0, l = style.length; i < l; i++){
						var prop = style[i];
						var camel = prop.replace(/\-([a-z])/g, camelize);
						var val = style.getPropertyValue(prop);
						returns[camel] = val;
					};
					return returns;
				};
				if(style = dom.currentStyle){
					for(var prop in style){
						returns[prop] = style[prop];
					};
					return returns;
				};
				return this.css();
			}
		})(jQuery);

		(function($){
			$.fn.resetStyles = function(){
				var resets = {
					"animation" : "none",
					"animation-delay" : "0",
					"animation-direction" : "normal",
					"animation-duration" : "0",
					"animation-fill-mode" : "none",
					"animation-iteration-count" : "1",
					"animation-name" : "none",
					"animation-play-state" : "running",
					"animation-timing-function" : "ease",
					"backface-visibility" : "visible",
					"background" : "0",
					"background-attachment" : "scroll",
					"background-clip" : "border-box",
					"background-color" : "transparent",
					"background-image" : "none",
					"background-origin" : "padding-box",
					"background-position" : "0 0",
					"background-position-x" : "0",
					"background-position-y" : "0",
					"background-repeat" : "repeat",
					"background-size" : "auto auto",
					"border" : "0",
					"border-style" : "none",
					"border-width" : "medium",
					"border-color" : "inherit",
					"border-bottom" : "0",
					"border-bottom-color" : "inherit",
					"border-bottom-left-radius" : "0",
					"border-bottom-right-radius" : "0",
					"border-bottom-style" : "none",
					"border-bottom-width" : "medium",
					"border-collapse" : "separate",
					"border-image" : "none",
					"border-left" : "0",
					"border-left-color" : "inherit",
					"border-left-style" : "none",
					"border-left-width" : "medium",
					"border-radius" : "0",
					"border-right" : "0",
					"border-right-color" : "inherit",
					"border-right-style" : "none",
					"border-right-width" : "medium",
					"border-spacing" : "0",
					"border-top" : "0",
					"border-top-color" : "inherit",
					"border-top-left-radius" : "0",
					"border-top-right-radius" : "0",
					"border-top-style" : "none",
					"border-top-width" : "medium",
					"bottom" : "auto",
					"box-shadow" : "none",
					"box-sizing" : "content-box",
					"caption-side" : "top",
					"clear" : "none",
					"clip" : "auto",
					"color" : "inherit",
					"columns" : "auto",
					"column-count" : "auto",
					"column-fill" : "balance",
					"column-gap" : "normal",
					"column-rule" : "medium none currentColor",
					"column-rule-color" : "currentColor",
					"column-rule-style" : "none",
					"column-rule-width" : "none",
					"column-span" : "1",
					"column-width" : "auto",
					"content" : "normal",
					"counter-increment" : "none",
					"counter-reset" : "none",
					"cursor" : "auto",
					"direction" : "ltr",
					"display" : "inline",
					"empty-cells" : "show",
					"float" : "none",
					"font" : "normal",
					"font-family" : "inherit",
					"font-size" : "medium",
					"font-style" : "normal",
					"font-variant" : "normal",
					"font-weight" : "normal",
					// "height" : "auto",
					"hyphens" : "none",
					"left" : "auto",
					"letter-spacing" : "normal",
					"line-height" : "normal",
					"list-style" : "none",
					"list-style-image" : "none",
					"list-style-position" : "outside",
					"list-style-type" : "disc",
					"margin" : "0",
					"margin-bottom" : "0",
					"margin-left" : "0",
					"margin-right" : "0",
					"margin-top" : "0",
					"max-height" : "none",
					"max-width" : "none",
					"min-height" : "0",
					"min-width" : "0",
					"opacity" : "1",
					"orphans" : "0",
					"outline" : "0",
					"outline-color" : "invert",
					"outline-style" : "none",
					"outline-width" : "medium",
					"overflow" : "visible",
					"overflow-x" : "visible",
					"overflow-y" : "visible",
					"padding" : "0",
					"padding-bottom" : "0",
					"padding-left" : "0",
					"padding-right" : "0",
					"padding-top" : "0",
					"page-break-after" : "auto",
					"page-break-before" : "auto",
					"page-break-inside" : "auto",
					"perspective" : "none",
					"perspective-origin" : "50% 50%",
					"position" : "static",
					"quotes" : "'\201C' '\201D' '\2018' '\2019'",
					"right" : "auto",
					"tab-size" : "8",
					"table-layout" : "auto",
					"text-align" : "inherit",
					"text-align-last" : "auto",
					"text-decoration" : "none",
					"text-decoration-color" : "inherit",
					"text-decoration-line" : "none",
					"text-decoration-style" : "solid",
					"text-indent" : "0",
					"text-shadow" : "none",
					"text-transform" : "none",
					"top" : "auto",
					"transform" : "none",
					"transform-style" : "flat",
					"transition" : "none",
					"transition-delay" : "0s",
					"transition-duration" : "0s",
					"transition-property" : "none",
					"transition-timing-function" : "ease",
					"unicode-bidi" : "normal",
					"vertical-align" : "baseline",
					"visibility" : "visible",
					"white-space" : "normal",
					"widows" : "0",
					// "width" : "auto",
					"word-spacing" : "normal",
					"z-index" : "auto"
				}

				return this.css(resets);
			}
		})(jQuery);

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

				target_width = $('img', $clone).outerWidth();
				target_height = $('figcaption', $clone).css('width', target_width).outerHeight(); // Make sure width (and thus line wrapping) is enforced so that the height is correct

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
				$figure.css($this.getStyleObject());
				$this.resetStyles().width('100%');
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
