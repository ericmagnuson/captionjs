## Documentation

Below is the basic setup for caption.js.  For more info, please see [captionjs.com](http://captionjs.com).

```js
$(window).load(function() {
    $('img.caption').captionjs({
        'class_name' : 'caption', // Class name assigned to each <figure>
        'schema'     : true,      // Use schema.org markup (i.e., itemtype, itemprop)
        'stacked'    : false,     // Place the caption on top of the photo
        'animated'   : false,     // Show the animation on hover only ('stacked' must also be enabled)
        'debug_mode' : false      // Output debug info to the JS console
    });
});
```
