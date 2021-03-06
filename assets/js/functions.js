// @codekit-prepend "jquery-1.9.1.min.js", "jquery.fittext.js";


$(function() {
  jQuery(".title h2").fitText(1,{ minFontSize: '50px' , maxFontSize: '80px'});
  navStuff();
  linkCard();
  redSlider();
  slippySlider();
  relationTitle();
  relationGrid();
  scrolled();
});

function navStuff() {
  var $nav = $('header nav'),
      $navItem = $nav.find('li'),
      navItemNum = $navItem.length,
      navItemHeight = $navItem.height();
    
  $nav.addClass('closed');
  
  $nav.click(function() {
    if (!$nav.hasClass('closed')) {
      $nav.css('bottom', '0px').addClass('closed').removeClass('open');
    } else {
      $nav.css('bottom', '-' + navItemNum*navItemHeight + 'px').removeClass('closed').addClass('open');
    }
  });
}


function linkCard() {

  $('.family-link').each(function() {
    var $this = $(this),
        $hyphenName = $this.attr('href').slice(1),
        $splitName = $hyphenName.split('-'),
        $relationship = $this.data('relationship'),
        $currPageName = $('.title h2').text().split(' '),
        $thumbUrl = '/assets/img/card-thumbs/'+ $hyphenName +'.jpg',
        $template = '<div class="name-card-wrap">' +
          '<div class="card-avatar" style="background-image: url('+ $thumbUrl +')">' +
            '<div class="card-fade"></div>' +
            '<div class="card-name">'+ $splitName[0] +' '+ $splitName[1] +'</div>' + 
          '</div>' +
          '<div class="link-portion">' +
            '<div class="relation">('+ $currPageName[0] +'\'s '+ $relationship +')</div>' +
            '<div class="cta">Read '+ $splitName[0] +'\'s Story</div>' +
          '</div>' +
        '</div>';
        
    $this.append($template);
  });

}


function redSlider() {

  $('.page-home .cta').hover(function() {
    var $this = $(this),
        $tint = $this.parents('.story-target').prev('.tint');
    $tint.addClass('red');
  }, function() {
    var $this = $(this),
        $tint = $this.parents('.story-target').prev('.tint');
    $tint.removeClass('red');
  });

}


function slippySlider() {
  
  var $bgPhotoAlpha = $('.bg-photo-alpha'),
      $bgPhotoOmega = $('.bg-photo-omega'),
      $storyTarget = $('.story-target'),
      
      $belt = $('.image-belt'),
      $sliderImages = $belt.find('img'),
      
      $textContainer = $('.text-container'),
      $quote = $('.quote'),
      $cta = $('.cta')
      
      randImageIndex = Math.floor(Math.random()*$sliderImages.length),
      $randImg = $sliderImages.eq(randImageIndex);
      
  
  // Pre-fetch the big background images
  // <link rel="prefetch" href="http://daker.me/assets/images/avatar.png" />
  
  var thisUrl = location.protocol+'//'+location.hostname+location.pathname.slice(0, -10);
  $sliderImages.each(function() {
    var $this = $(this);
    $('head').append('<link rel="prefetch" href="' + thisUrl + '/' + $this.data('bg-image') + '" />');  
  });
  
  
      console.log(thisUrl);
  
  
  // choose a rando image, make it the 'present' put the ones before it the 'past' and after the 'future'
  $randImg.addClass('present').nextAll().removeClass('present past').addClass('future');
  $randImg.addClass('present').prevAll().removeClass('present future').addClass('past');
  
  
  function content() {
    var $present = $('.present'),
        url = $present.data('url'),
        bgImage = $present.data('bg-image'),
        quote = $present.data('quote'),
        cta = $present.data('cta');
    
    // Change the url of the link
    $storyTarget.attr('href', url);
    
    // Fade out the text-container, fill it with new content, and fade it back
    $textContainer.fadeOut(300);
    setTimeout(function () {
      $textContainer.find('.quote').text(quote).next().text(cta);
      $textContainer.fadeIn(300);
    }, 300)
    
    // Change the background
    $bgPhotoOmega.hide().css('backgroundImage', 'url(' + bgImage + ')').fadeIn(300);
    setTimeout(function() {
      $bgPhotoAlpha.css('backgroundImage', 'url(' + bgImage + ')');
      $bgPhotoOmega.hide();
    }, 400)    
    
    // deactivate the right or left arrows if this is the end
    if ($present.index() === 0) {
      $('.icon-arrow-left').addClass('inactive');
      $('.icon-arrow-right').removeClass('inactive');
    } else if ($present.index() === $sliderImages.length-1) {
      $('.icon-arrow-right').addClass('inactive');
      $('.icon-arrow-left').removeClass('inactive');
    } else {
      $('.icon-arrow-left, .icon-arrow-right').removeClass('inactive');
    }
  }
  content();
  
  
  
  $('.icon-arrow-left, .icon-arrow-right').click(function() {
    event.preventDefault();
    var $present = $('.present'),
        $thisArrow = $(this);
    
    if ($thisArrow.hasClass('icon-arrow-right')) {
      $present.removeClass('present').addClass('past').next().addClass('present').removeClass('future');
      content();
    } else {
      $present.removeClass('present').addClass('future').prev().addClass('present').removeClass('past');
      content();
    }
  
  });
  
  
  
} // END slippySlider()


function relationTitle() {
  $('.relatives-grid > a').each(function() {
    var $this = $(this),
        relation = $this.data('relation');
        
    var template = '<div class="relative-title">Read '+ relation +'\'s Story</div>';
    
    $this.append(template);
    
  });
}


function relationGrid() {

  $('.new-relatives-grid a').each(function() {
    
    var $this = $(this),
        $hyphenName = $this.attr('href').slice(1),
        $splitName = $hyphenName.split('-'),
        $relationship = $this.data('relationship'),
        $currPageName = $('.title h2').text().split(' '),
        $thumbUrl = '/assets/img/card-thumbs/'+ $hyphenName +'.jpg',
        $template = '<div class="name-card-wrap">' +
          '<div class="card-avatar" style="background-image: url('+ $thumbUrl +')">' +
            '<div class="card-fade"></div>' +
            '<div class="card-name">'+ $splitName[0] +' '+ $splitName[1] +'</div>' + 
          '</div>' +
          '<div class="link-portion">' +
            '<div class="relation">('+ $currPageName[0] +'\'s '+ $relationship +')</div>' +
            '<div class="cta">Read '+ $splitName[0] +'\'s Story</div>' +
          '</div>' +
        '</div>';
    
    $this.empty().append($template);

  });

}


var is_touch_device = 'ontouchstart' in document.documentElement;
if(is_touch_device) $('html').addClass('touch');



















