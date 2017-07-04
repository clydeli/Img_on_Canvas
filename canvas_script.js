function img_to_canvas(img) {
  // Get the image width and height by detecting their onscreen sizes.
  var [img_attr_width, img_attr_height] = [img.getAttribute('width'), img.getAttribute('height')];
  var img_width = (img_attr_width > 0) ? img_attr_width : img.offsetWidth;
  var img_height = (img_attr_height > 0) ? img_attr_height : img.offsetHeight;

  // Try to get other commonly-used attributes.
  var common_attributes = ['id', 'class', 'src', 'style'];
  var common_attributes_hash = {};
  for (var i = 0; i < common_attributes.length; ++i) {
    var old_attr = img.getAttribute(common_attributes[i]);
    old_attr && (common_attributes_hash[common_attributes[i]] = img.getAttribute(common_attributes[i]));
  }

  // Create the canvas object.
  var new_canvas = document.createElement('canvas');
  new_canvas.setAttribute('width', img_width);
  new_canvas.setAttribute('height', img_height);

  // Create an image object for initilizing the canvas object.
  var img_obj = new Image();
  img_obj.addEventListener('load', () => { new_canvas.getContext('2d').drawImage(img_obj, 0, 0, img_width, img_height); });
  img_obj.src = common_attributes_hash['src'];

  // Clear the original id attribute and attach all available attributes to the canvas object.
  img.setAttribute('id', '');
  img.style.display = 'none';
  for (var attr in common_attributes_hash) {
    new_canvas.setAttribute(attr, common_attributes_hash[attr]);
  }

  // Insert the canvas after the original image.
  img.insertAdjacentElement('afterend', new_canvas);
}

// Initial conversion.
document.querySelectorAll('img').forEach(img_to_canvas);

// Add DOMNodeInserted event listener to body.
document.body.addEventListener("DOMNodeInserted", (e) => {
  // Find and check AJAX img elements (oncluding self).
  var elem = e.target;
  if (elem.tagName == 'IMG') { img_to_canvas(elem); }
  elem.querySelectorAll && elem.querySelectorAll('img').forEach(img_to_canvas);
});
