$(document).ready(function() {
  var $forms = $('form[data-parsley-validate]');
  $.each($forms, function(i,e) {
    var $form = $(e);

    if($form[0].hasAttribute('data-on-success')) {
      var $submitButton = $form.find('[data-validate-form]');
      $form.parsley().on('form:success', function() {
        $('.alert-danger-overall').remove();
        window[$form.attr('data-on-success')]();
      });
    }

    $form.parsley().on('form:error', function() {
        //use this if you don't want to display the error list
        // $form.prepend('<div class="alert alert-danger-overall">Oops, it looks like you missed a step.</div>');

        var errorList = [];
        var $errors = $form.find('.parsley-error:not([data-parsley-errors-messages-disabled])');
        $errors = $errors.filter(':visible');
        $.each($errors, function(ei, ee) {
          var id = $(ee).attr('id');
          var $field = $('label[for=' + id + ']');
          if($(ee).hasClass('checkbox') || $(ee).hasClass('radio')) {
            var name = $(ee).find('input').attr('name');
            $field = $('label[for=' + name + ']');
          }
          errorList.push('<li>' + $field.html() + '</li>');
        });
        
        $form.prepend('<div class="alert alert-danger-overall">Oops, it looks like you missed a step.<ul class="margin-top-small">' + errorList.join('') + '</ul></div>');
      });
  });
});
