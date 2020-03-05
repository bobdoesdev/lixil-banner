// Makes everything with the same [data-equal-width] attribute value have the
// same height as the tallest object in the set.
function equalHeightsInit(context) {
	var $context = $(document);

	var setNames = [];
	$('[data-equal-height]', $context).each(function () {
		var setName = $(this).attr('data-equal-height');
		// if setName not yet in setNames array, add it.
		if ($.inArray(setName, setNames) === -1) {
			setNames.push(setName);
		}
	});

	if (setNames.length > 0) {
		equalHeights(setNames);

		// slow down the fireing of equalHeights() calls with this debounce function.
		$(function () {
			function debounce(func, wait, immediate) {
				var timeout;
				return function () {
					var context = this, args = arguments;
					var later = function () {
						timeout = null;
						if (!immediate) func.apply(context, args);
					};
					var callNow = immediate && !timeout;
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
					if (callNow) func.apply(context, args);
				};
			};
			$(window).on('resize', debounce(function () {
				equalHeights(setNames);
			}, 100));
		});
	}
}

// Checks the height of all items in the setNames array and makes all items
// equal the height of the tallest of the group.
// `setNames` can be string or array of strings representing all the
// 		components to match Heights.  If left empty, will set heights of all [data-equal-height]
function equalHeights(setNames) {
	// if setNames is a string, turn it into a single item array.
	if (typeof setNames == 'string') {
		var string = setNames;
		var setNames = [];
		setNames.push(string);
	} else if (!setNames) {
		// This is like a duplicate of doing the same through equalHeightsInit() but without
		// the specificity of $context
		$('[data-equal-height]').each(function () {
			var setName = $(this).attr('data-equal-height');
			setNames = [];
			// if setName not yet in setNames array, add it.
			if ($.inArray(setName, setNames) === -1) {
				setNames.push(setName);
			}
		});
	}

	$.each(setNames, function (index, value) {
		var tallestHeight;
		var $set = $('[data-equal-height="' + value + '"]');

		$set.each(function (index) {
			var $this = $(this);
			$this.trigger('beforeEqualHeights');

			// clear prviously set inline height
			$this[0].style.removeProperty('height');
			var $hiddenParent = $this.parents().filter(':hidden');
      $.each($hiddenParent, function(hpi, hpe) {
        var styleCache = $(hpe).attr('style') || "";
        $(hpe).attr('data-style-cache', styleCache);
        $(hpe).css({display: 'block'});
      });
			// var height = this.scrollHeight;
			var height = $(this).outerHeight() + Math.ceil(($(this).outerHeight() - $(this).height())/2);
			if (index === 0) {
				tallestHeight = height;
			} else if (height > tallestHeight) {
				tallestHeight = height;
			}

			$.each($hiddenParent, function(hpi, hpe) {
        $(hpe).attr('style', $(hpe).attr('data-style-cache'));
      });
			$this.trigger('afterEqualHeights');
		});

		$set.css('height', tallestHeight);
	});
}

$(document).ready(function() {
	equalHeightsInit();
});
