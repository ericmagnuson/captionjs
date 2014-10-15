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
!function(a){a.fn.captionjs=function(b){var c={class_name:"captionjs",schema:!0,mode:"default",debug_mode:!1,force_dimensions:!0,is_responsive:!1,inherit_styles:!1},d=a.extend(c,b||{}),e=function(a,b,c,d){c.jquery&&d.jquery&&(c.css(a,d.css(a)),d.css(a,b))};return this.each(function(){d.debug_mode&&console.log("caption.js | Starting.");{var b,c,f=a(this),g=f.data("caption")?f.data("caption"):f.attr("alt"),h=f.wrap('<figure class="'+d.class_name+" "+d.mode+'"/>').after("<figcaption/>").parent(),i=f.next("figcaption").html(g);f.data("link")?i.wrapInner('<a href="'+f.data("link")+'"/>').children("a").css("padding","0").css("margin","0"):null}if(""===g&&i.remove(),d.debug_mode&&console.log("caption.js | Caption: "+g),d.force_dimensions){d.debug_mode&&console.log("caption.js | Forcing dimensions with a clone.");var j=h.clone().css({position:"absolute",left:"-9999px"}).appendTo("body");b=a("img",j).outerWidth(),c=a("figcaption",j).css("width",b).css("clear","both").outerHeight(),j.remove()}else b=f.outerWidth(),c=i.outerHeight();d.is_responsive&&(b="100%",f.width(b)),d.inherit_styles&&("inline"==f.css("display")?h.css("display","inline-block"):e("display","block",h,f),"static"==f.css("position")?h.css("position","relative"):e("position","relative",h,f),e("clear","both",h,f),e("float","none",h,f),e("margin","0",h,f),f.css("padding","0"),e("left","auto",h,f),e("right","auto",h,f),e("top","auto",h,f),e("bottom","auto",h,f),e("z-index",f.css("z-index"),h,f)),h.width(b),d.schema&&(h.attr({itemscope:"itemscope",itemtype:"http://schema.org/Photograph"}),i.attr("itemprop","name"),f.attr("itemprop","image")),"stacked"===d.mode&&i.css({"margin-bottom":"0",bottom:"0"}),"animated"===d.mode&&i.css({"margin-bottom":"0",bottom:-c}),"hide"===d.mode&&i.css({"margin-bottom":c,bottom:-c})})}}(jQuery,window);
