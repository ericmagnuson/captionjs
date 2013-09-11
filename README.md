## Documentation

Below is the basic setup for caption.js.  For more info, please see [captionjs.com](http://captionjs.com).

```js
$(window).load(function() {
    $('img.caption').captionjs({
		'class_name' : 'captionjs',  // Class name assigned to each <figure>
		'schema'     : true,         // Use schema.org markup (i.e., itemtype, itemprop)
		'mode'       : 'default',    // default | static | animated | hide
		'debug_mode' : false         // Output debug info to the JS console
    });
});
```
