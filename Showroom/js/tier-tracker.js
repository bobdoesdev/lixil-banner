function runTierTracker() {
	var tierValue = parseInt($('#tier-tracker-value').attr('data-tier-value'));
	var tierBaseHeight = $('.tier-base').outerHeight();
	var tierSilverHeight = $('.tier-silver').outerHeight();
	var tierGoldHeight = $('.tier-gold').outerHeight();
	var tierPlatinumHeight = $('.tier-platinum').outerHeight();
	var tierDiamondHeight = $('.tier-diamond').outerHeight();
	var tierHeight = 80;
	if(tierValue < 25) {
		tierHeight = Math.floor(tierSilverHeight * (tierValue/25));
	} else if(tierValue < 75 && tierValue > 24) {
		tierHeight = Math.floor((tierGoldHeight) * ((tierValue-24)/50)) + tierSilverHeight;
	} else if(tierValue < 150 && tierValue > 74) {
		tierHeight = Math.floor((tierPlatinumHeight) * ((tierValue-74)/75)) + tierGoldHeight + tierSilverHeight;
	} else {
		tierHeight = tierDiamondHeight + tierPlatinumHeight + tierGoldHeight + tierSilverHeight;
	}
	$('#tier-tracker-value').css('height', tierHeight + tierBaseHeight + 5 +'px');
}

$(document).ready(function() {
	var apple_phone         = /iPhone/i,
      apple_ipod          = /iPod/i,
      apple_tablet        = /iPad/i,
      android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
      android_tablet      = /Android/i,
      amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
      amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
      windows_phone       = /Windows Phone/i,
      windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
      other_blackberry    = /BlackBerry/i,
      other_blackberry_10 = /BB10/i,
      other_opera         = /Opera Mini/i,
      other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
      other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
      seven_inch = new RegExp(
          '(?:' +         // Non-capturing group

          'Nexus 7' +     // Nexus 7

          '|' +           // OR

          'BNTV250' +     // B&N Nook Tablet 7 inch

          '|' +           // OR

          'Kindle Fire' + // Kindle Fire

          '|' +           // OR

          'Silk' +        // Kindle Fire, Silk Accelerated

          '|' +           // OR

          'GT-P1000' +    // Galaxy Tab 7 inch

          ')',            // End non-capturing group

          'i');           // Case-insensitive matching

	var match = function(regex, userAgent) {
		return regex.test(userAgent);
	}

	var ua = navigator.userAgent;

	var apple = {
      phone:  match(apple_phone, ua),
      ipod:   match(apple_ipod, ua),
      tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
      device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
  };
  var amazon = {
      phone:  match(amazon_phone, ua),
      tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
      device: match(amazon_phone, ua) || match(amazon_tablet, ua)
  };
  var android = {
      phone:  match(amazon_phone, ua) || match(android_phone, ua),
      tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
      device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
  };
  var windows = {
      phone:  match(windows_phone, ua),
      tablet: match(windows_tablet, ua),
      device: match(windows_phone, ua) || match(windows_tablet, ua)
  };
  var other = {
      blackberry:   match(other_blackberry, ua),
      blackberry10: match(other_blackberry_10, ua),
      opera:        match(other_opera, ua),
      firefox:      match(other_firefox, ua),
      chrome:       match(other_chrome, ua),
      device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
  };
  var seven_inch = match(seven_inch, ua);
  var any = apple.device || android.device || windows.device || other.device || seven_inch;

	if(any) {
		var open = false;
		$('#tier-tracker-container').on('click', function() {
			if(!open) {
				$('#tier-tracker-container').css('height', '408px');
				$('#tier-tracker-slide').css('bottom', '0px');
				runTierTracker();
				open = true;
			} else {
				$('#tier-tracker-container').css('height', '92px');
				$('#tier-tracker-slide').css('bottom', '-320px');
				$('#tier-tracker-value').css('height', '80px');
				open = false;
			}
		});
	} else {
		$('#tier-tracker-container').on('mouseover', function() {
			runTierTracker();
		});

		$('#tier-tracker-container').on('mouseout', function() {
			$('#tier-tracker-value').css('height', '80px');
		});
	}
});