## Documentation

Below is the basic setup for caption.js.  For more info, please see [captionjs.com](http://captionjs.com).

```js
$(window).load(function() {
    $('img.caption').captionjs({
		'class_name'      : 'captionjs', // Class name assigned to each <figure>
		'schema'          : true,        // Use schema.org markup (i.e., itemtype, itemprop)
		'mode'            : 'default',   // default | static | animated | hide
		'debug_mode'      : false,       // Output debug info to the JS console
		'force_dimensions': false,       // Force the dimensions in case they can't be detected (e.g., image is not yet painted to viewport)
		'is_responsive'   : false        // Ensure the figure and image change size when in responsive layout. Requires a container to control responsiveness!
    });
});
```
