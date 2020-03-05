$(document).ready(function() {
  var $datepickers = $('[data-datepicker]');

  $.each($datepickers, function(i,e) {
    initializeDatepicker(e);
  });
});

function initializeDatepicker(element) {
  $(element).datepicker({
  	minDate: new Date(2017, 2, 1),
  	maxDate: 0
  });
}
