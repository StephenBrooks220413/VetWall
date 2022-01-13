$(document).ready(function() {
    $('#summernote').summernote({
      popover: {
        image: [
  
          // This is a Custom Button in a new Toolbar Area
          ['custom', ['examplePlugin']],
          ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
          ['float', ['floatLeft', 'floatRight', 'floatNone']],
          ['remove', ['removeMedia']]
        ]
      }
    });
  });
