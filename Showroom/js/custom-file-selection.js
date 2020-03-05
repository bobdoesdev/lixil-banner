$(document).ready(function() {
  var $selects = $('input[type=file]');

  $.each($selects, function(i,e) {
    var $input = $(e);
    var $label = $input.siblings('label');

    $input.on('change', function(e) {
      var fileName = "";
      if(this.files && this.files.length === 1) {
        fileName = e.target.value.split('\\').pop();
      } else if(this.files && this.files.length > 1) {
        fileName = this.files.length + ' files selected';
      }

      if(fileName) {
        var $oldLabel = $input.siblings('.file-upload-label');
        if($oldLabel.length > 0) {
          $oldLabel.remove();
        }
        var fileLabel;
        if(fileName.length > 27) {
          fileLabel = fileName.slice(0,13) + '...' + fileName.slice(fileName.length-13, fileName.length);
        } else {
          fileLabel = fileName;
        }
        $label.after('<span class="file-upload-label">' + fileLabel + '</span>');
      } else {
        $('.q2sw_file_upload_label').remove();
      }
    });
  });
});
