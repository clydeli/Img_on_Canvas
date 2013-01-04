function img_to_canvas(img){
  // Get the image width and height by detecting their on screen size  
  var img_width = ($(img).attr('width') > 0)? $(img).attr('width'):$(img).width();
  var img_height = ($(img).attr('height') > 0)? $(img).attr('height'):$(img).height();

  // Try to get other commonly-used attributes
  var common_attributes = ["id", "class", "src", "style"]
  var common_attributes_hash = {};
  for (var i=0; i<common_attributes.length; ++i){
    common_attributes_hash[common_attributes[i]] = $(img).attr(common_attributes[i]);
  }

  // Create and capture the canvas object
  $(img).after('<canvas width='+img_width+' height='+img_height+'><p>support no canvas.</p></canvas>');
  var new_canvas = $(img).next('canvas');

  // Create an image object for defining the canvas object
  var img_obj = new Image();
  img_obj.onload = function() { new_canvas[0].getContext('2d').drawImage(img_obj, 0, 0, img_width, img_height); }
  img_obj.src = common_attributes_hash["src"];

  // Clear the original id attribute and attach all available attributes to the canvas object
  $(img).attr('id', '' ).hide();
  for (var i=0; i<common_attributes.length; ++i){
    if(typeof common_attributes_hash[common_attributes[i]] != 'undefined'){
      $(new_canvas).attr(common_attributes[i], common_attributes_hash[common_attributes[i]]);
    }
  }
}

// Initial conversion
$('img').each(function(){
  if( $(this).is(":visible") ){ img_to_canvas($(this)); }
});

// Add DOMNodeInserted event listener to body
$("body").on("DOMNodeInserted", function(e){
  // Find and check AJAX img elements
  $(e.target).find('*').andSelf().filter('img').each(function(){
    if( $(this).is(":visible") ){ img_to_canvas($(this)); }
  });
});
