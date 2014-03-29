$(document).ready(function() {
	// Init SyntaxHighlighter
	SyntaxHighlighter.autoloader(
			'js jscript javascript site/scripts/syntaxhighlighter/scripts/shBrushJScript.js',
			'html xml site/scripts/syntaxhighlighter/scripts/shBrushXml.js',
			'css site/scripts/syntaxhighlighter/scripts/shBrushCss.js'
	);
	SyntaxHighlighter.all();

	// Init scrollTo
	$('nav').localScroll({
		duration : 500,
		offset   : {top:-70, left:0}
	});

	// Stylize "caption.js"
	$("p:contains('caption.js'), h2 a:contains('caption.js')", document.body).contents().each(function() {
		if (this.nodeType == 3)
			$(this).replaceWith(this.nodeValue.replace(/caption.js/g, "<span class=\"captionjs_span\">caption.js</span>"));
	});

	$("header h1, .captionjs").lettering();

	// Fire these enclosed functions after page has faded in
	var after_fade_in = function after_fade_in(){
		// Init the sticky nav
		var position = $('nav').offset();
		var x_coord = position.top;
		var padding_to_add = $('nav').outerHeight(true);

		$(window).scroll(function(){
			var top = $(window).scrollTop();
			if (top > x_coord - 1)
			{
				$('nav').addClass('sticky');
				$('body > div').css('padding-top', padding_to_add + 'px');
			}
			else
			{
				$('nav').removeClass('sticky');
				$('body > div').css('padding-top', '0');
			}
		})
	};

	// Fade in content
	setTimeout(function(){
		$('.js header h1').fadeIn(1500, function(){
			$('.js header h2').fadeIn(1000, function(){
				$('.js #github, .js nav, .js body > div, .js footer').delay(1000).fadeIn(1000, after_fade_in);
			});
		});
	}, 500);

});
