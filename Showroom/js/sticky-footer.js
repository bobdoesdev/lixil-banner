function checkForStickyFooter() {
	var wh = $(window).height();
	var bh = $('body').outerHeight();
	var fh = $('.footer-container').outerHeight();

	if($('body').hasClass('sticky') && wh < (bh-fh)) {
		$('body').removeClass('sticky');
		$('.footer-container').removeClass('sticky');
	} else if(wh >= bh) {
		$('body').addClass('sticky');
		$('.footer-container').addClass('sticky');
	} else {
		$('body').removeClass('sticky');
		$('.footer-container').removeClass('sticky');
	}
}

$(window).ready(function() {
	checkForStickyFooter();

	$(window).on('resize', debounce(function() {
		checkForStickyFooter();
	}, 300));

	$('.collapse').on('shown.bs.collapse', function() {
		checkForStickyFooter();
	});

	$('.collapse').on('hidden.bs.collapse', function() {
		checkForStickyFooter();
	});
});