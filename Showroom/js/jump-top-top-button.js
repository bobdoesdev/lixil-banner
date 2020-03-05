function initializeJumpToTopButton() {
  var $window = $(window);
  var $jumpButton = $('#tier-tracker-container');
  var $footer = $('.footer-container');
  var $container = $('.container').eq(0);
  var footerOffset = $footer.offset();
  // var pageTop = $window.height() - $jumpButton.height() - 20;
  var pageTop = $footer.outerHeight();
  var pageTopRight = ($window.width() - $container.width())/2;
  var buttonHeight = $jumpButton.height();
  var adjustedValueFooter = $jumpButton.height();
  var adjustedValuePageTop = 10;

  // $jumpButton.css({bottom: pageTop + 'px', right: pageTopRight + 'px'});
  calculateButtonPosition();

  function calculateButtonPosition() {
    footerOffset = $footer.offset();
    // pageTop = $window.height() - buttonHeight - adjustedValuePageTop;
    pageTop = $footer.outerHeight();
    pageTopRight = ($window.width() - $container.width())/2;
    $jumpButton.css({bottom: pageTop + 'px', right: pageTopRight + 'px'});

    // if($window.scrollTop() >= 100){
    //   $jumpButton.css({display: 'block', opacity: 1});
    // }else if($window.scrollTop() < 100){
    //   $jumpButton.css({display: 'none', opacity: 0});
    // }

    var winBottom = parseInt($window.scrollTop()) + $window.height();
    if(winBottom >= footerOffset.top + 20){
      // pagetopTop = parseInt(footerOffset.top) - parseInt(adjustedValueFooter);
      pagetopTop = $footer.outerHeight();
      pagetopTop = pagetopTop + 2;
      $jumpButton.css('position','absolute');
      $jumpButton.css('bottom',pagetopTop+'px');
      $jumpButton.css('z-index','801');
    }else{
      $jumpButton.css('position','fixed');
      $jumpButton.css('bottom','10px');
    }
  }

  $window.on('scroll', function() {
    calculateButtonPosition();
  });

  $window.on('resize', function() {
    calculateButtonPosition();
  });
}

$(document).ready(function() {
  initializeJumpToTopButton();
});

// $(function() {
//
// 	var $window = $(window),
// 	$pageTop = $("#fotPtop"),
// 	lxlFooterElem = $('#footer'),
// 	footerNavitOffset = lxlFooterElem.offset(),
// 	pageTop = $window.height() - $pageTop.height() - 20,
// 	pageTopRight = ($window.width() - $("#container").width())/2,
// 	scImgHeight = $pageTop.height(),
// 	adjustedValueFooter = $pageTop.height(),
// 	adjustedValuePageTop = 10;
//
// 	$pageTop.css('top',pageTop+'px');
// 	if($(".menuBox .footMenu").css("display") == "block"){
// 		pageTopRight = ($window.width() - $("#contents").width())/2
// 	}
// 	$pageTop.css('right',pageTopRight+'px');
//
// 	$window.scroll(function(){
// 		footerNavitOffset = lxlFooterElem.offset();
// 		pageTop = $window.height() - scImgHeight - adjustedValuePageTop;
// 		$pageTop.css('top',pageTop+'px');
//
// 		winBottom = parseInt($window.scrollTop()) + $window.height();
// 		if($window.scrollTop() >= 100){
// 			$pageTop.show();
// 		}else if($window.scrollTop() <= 10){
// 			$pageTop.hide();
// 		}
// 		if(winBottom >= footerNavitOffset.top){
// 			pagetopTop = parseInt(footerNavitOffset.top) - parseInt(adjustedValueFooter);
// 			pagetopTop = pagetopTop + 2;
// 			$pageTop.css('position','absolute');
// 			$pageTop.css('top',pagetopTop+'px');
// 		}else{
// 			$pageTop.css('position','fixed');
// 			$pageTop.css('top',pageTop+'px');
// 		}
//
// 		$(".content-col-2 #side").each(function(){
// 		var $sidebar = $("#side");
// 		var offset = $sidebar.offset();
// 		var topPadding = 20;
// 		var parentY = $sidebar.parent().offset().top;
// 		var parentH = $sidebar.parent().height();
// 		var wScrollvalue = $window.scrollTop();
//
// 			if (wScrollvalue > parentY) {
// 				if(wScrollvalue > (parentY + parentH) - ($sidebar.height()) ){
// 						$sidebar.stop().animate({
// 							marginTop:parentH - $sidebar.height()
// 						});
// 				}else{
// 					if($sidebar.css("position")=="absolute"){
// 						$sidebar.stop().animate({
// 							marginTop:wScrollvalue - parentY + topPadding
// 						});
// 					}else{
// 						$sidebar.stop().animate({
// 							marginTop:0
// 						});
// 					}
// 				}
// 			} else {
// 				$sidebar.stop().animate({
// 					marginTop:0
// 				});
// 			}
// 		});
// 	});
// });
