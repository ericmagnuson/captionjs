$(document).ready(function() {
	SyntaxHighlighter.autoloader(
			'js jscript javascript  site/scripts/syntaxhighlighter/scripts/shBrushJScript.js',
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

	// Init the sticky nav after content has faded in
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
});
