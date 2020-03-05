$(document).ready(function() {
	var $collapses = $('.collapse');
	$collapses.on('shown.bs.collapse', function() {
		var target = $(this).attr('aria-labelledby');

		$('html, body').animate({scrollTop: $('#' + target).offset().top - 100}, 300);
	});
});
