$(document).ready(function() {
  $.each($('.slider input[type=range]:not([disabled])'), function(i,e) {
    var input = e;
    var inputId = $(e).attr('id');
    var sliderTicks = $('[data-for=' + inputId + '] .tick');

    $(e).on('input', function() {
      var progress = $(e).siblings('.progress').children('.progress-bar');
      var range = parseInt($(e).attr('max')) - parseInt($(this).attr('min'));
      var calc = (((input.value-1)/range)*100);

      $(progress).attr('aria-valuenow', calc);
      $(progress).css({width: 'calc(8px + ' + calc + "%)"});
      $(progress).html('<span class="sr-only">' + input.value + '</span>');

      $('[data-for=' + inputId + '] .tick.active').removeClass('active');
      sliderTicks.eq(input.value-1).addClass('active');
    });

    sliderTicks.on('click', function() {
      var idx = sliderTicks.index(this);
      $(e).val(idx+1);

      var progress = $(e).siblings('.progress').children('.progress-bar');
      var range = parseInt($(e).attr('max')) - parseInt($(e).attr('min'));
      var calc = (((idx)/range)*100);

      $(progress).attr('aria-valuenow', calc);
      $(progress).css({width: 'calc(8px + ' + calc + "%)"});
      $(progress).html('<span class="sr-only">' + idx + '</span>');

      $('[data-for=' + inputId + '] .tick.active').removeClass('active');
      $(this).addClass('active');
    });
  });
});