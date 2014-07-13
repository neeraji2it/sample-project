

/***************************************************
 prettyPhoto
 ***************************************************/

jQuery(document).ready(function() {
  "use strict";
  jQuery("a[rel^='prettyPhoto']").prettyPhoto({
    animation_speed: 'normal',
    theme: 'light_square',
    slideshow: 3000,
    autoplay_slideshow: false,
    social_tools: false
  });

});

/***************************************************
 responsive menu
 ***************************************************/

jQuery(function(jQuery) {
  "use strict";
  jQuery("#main-nav").append("<select/>");
  jQuery("<option />", {
    "selected": "selected",
    "value": "",
    "text": "Choose section"
  }).appendTo("#main-nav select");
  //new dropdown menu
  jQuery("#main-nav a").each(function() {
    var el = jQuery(this);
    var perfix = '';
    switch (el.parents().length) {
      case (11):
        perfix = '-';
        break;
      case (13):
        perfix = '--';
        break;
      default:
        perfix = '';
        break;

    }
    jQuery("<option />", {
      "value": el.attr("href"),
      "text": perfix + el.text()
    }).appendTo("#main-nav select");
  });

  jQuery('#main-nav select').change(function() {

    window.location.href = this.value;

  });
});

/*********** Pagination Function ******************/
//var listElement = $('.paginate');
//var perPage = 2; 
//var numItems = listElement.children().size();
//var numPages = Math.ceil(numItems/perPage);
jQuery(document).ready(function() {
  "use strict";
  $('.paginate').each(function() {
    var listElement = $(this);
    var perPage = listElement.data('page-size');
    var numItems = listElement.children().size();
    var numPages = Math.ceil(numItems / perPage);
    
    var curr = 0;
    while (numPages > curr) {
      $('<li><a href="javascript:void(0);" class="page_link">' + (curr + 1) + '</a></li>').appendTo($(this).parent().find('.pager'));
      curr++;
    }

    $(this).parent().find('.pager:first').data("curr", 0);
    $(this).parent().find('.pager .page_link:first').addClass('active');
    
    listElement.children().css('display', 'none');
    listElement.children().slice(0, perPage).css('display', 'block');

    $(this).parent().find('.pager li a').on('click', function() {
      $(this).parents('.pager').find('li a').removeClass('active');
      $(this).addClass('active');
      var clickedPage = $(this).html().valueOf() - 1;
      listElement = $(this).parent().parent().parent().parent().parent().find('.paginate:first');
      perPage = listElement.data('page-size');
      goTo(clickedPage, perPage, listElement);
    });
    
  });
});


function goTo(page, perPage, listElement) {
  var startAt = page * perPage,
          endOn = startAt + perPage;

  listElement.children().hide().slice(startAt, endOn).fadeIn('slow');
  listElement.closest('.pager').attr("curr", page);
}


