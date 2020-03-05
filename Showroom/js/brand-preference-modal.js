function activateBrandPreference() {
  var $brandPreference = $('input[type=radio][name=radio-brand_preference]:checked');
  if($brandPreference.length > 0) {
    var tabIndex = $brandPreference.val();
    $('.nav-brand_preference li.active').removeClass('active');
    $('.nav-brand_preference li').eq(tabIndex).addClass('active');
    $('.tabs-brand_preference .tab-pane.active').removeClass('active');
    $('.tabs-brand_preference .tab-pane').eq(tabIndex).addClass('active');
    $('.error .alert').remove();
    $('#modal-brand_preference').modal('hide');
  } else {
    $('#form-brand_preference').addClass('error').append('<div class="alert alert-danger" role="alert">You must select a brand preference</div>');
  }
}
