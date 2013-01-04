function img_to_canvas(img){
  // Get the image width and height by detecting their on screen size
  var img_width = $(img).width(), img_height = $(img).height();
  // Overide if it is already defined in attributes
  if($(img).attr('width') > 0) { img_width = $(img).attr('width'); }
  if($(img).attr('height') > 0) { img_height = $(img).attr('height'); } 
    
  // Try to get other commonly-used attributes
  var old_id = $(img).attr('id'), old_class = $(img).attr('class'), old_src = $(img).attr('src'), old_style = $(img).attr('style');
    
  // Create and capture the canvas object
  $(img).after('<canvas width='+img_width+' height='+img_height+'><p>support no canvas.</p></canvas>');
  var new_canvas = $(img).next('canvas');

  // Create an image object for defining the canvas object
  var img_obj = new Image();
  img_obj.onload = function() { new_canvas[0].getContext('2d').drawImage(img_obj, 0, 0, img_width, img_height); }
  img_obj.src = $(img).attr('src');

  // Clear the original id attribute and attach all available attributes to the canvas object
  $(img).attr('id', '' ).hide();
  if(typeof old_id != 'undefined') { $(new_canvas).attr('id', old_id ); }
  if(typeof old_class != 'undefined') { $(new_canvas).attr('class', old_class ); }
  if(typeof old_src != 'undefined') { $(new_canvas).attr('src', old_src ); }
  if(typeof old_style != 'undefined') { $(new_canvas).attr('style', old_style ); }
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
