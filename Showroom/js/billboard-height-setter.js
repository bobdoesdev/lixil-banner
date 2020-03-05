$(window).load(function() {
  billboardHeightSetterInit();
});

var screenThreshold = 767;

function billboardHeightSetterInit() {
  var $billboards = $('[data-billboard]');
  var $updateElements = $('[data-calculate-billboards]');

  $(window).on('resize', debounce(function() {
    if($(window).outerWidth() > screenThreshold) {
      calculateBillboardHeights();
    }
  }, 150));

  if($(window).outerWidth() > screenThreshold) {
    calculateBillboardHeights();
  }
}

function calculateBillboardHeights() {
  var $billboards = $('[data-billboard]');
  if($billboards.length > 0) {
    $.each($billboards, function(i,e) {
      var $billboardParent = $(e).parents('div[data-billboard-parent]');
      var $hiddenParent = $(e).parents().filter(':hidden');
      $.each($hiddenParent, function(hpi, hpe) {
        var styleCache = $(hpe).attr('style') || "";
        $(hpe).attr('data-style-cache', styleCache);
        $(hpe).css({display: 'block'});
      });
      var $billboardMirror = $billboardParent.siblings('div[data-billboard-mirror]');
      var $hiddenMirror = $(e).parents().filter(':hidden');
      $.each($hiddenMirror, function(hmi, hme) {
        var styleCache = $(hme).attr('style') || "";
        $(hme).attr('data-style-cache', styleCache);
        $(hme).css({display: 'block'});
      });
      var mirrorHeight = $billboardMirror.outerHeight();
      var $billboardSiblings = $(e).siblings();
      var sumOfSiblingHeights = 0;
      $.each($billboardSiblings, function(sibi,sibe) {
        sumOfSiblingHeights += $(sibe).outerHeight();
      });
      $(e).height(mirrorHeight - sumOfSiblingHeights);
      $.each($hiddenParent, function(hpi, hpe) {
        $(hpe).attr('style', $(hpe).attr('data-style-cache'));
      });
      $.each($hiddenMirror, function(hmi, hme) {
        $(hme).attr('style', $(hme).attr('data-style-cache'));
      });
    });
  }
}
