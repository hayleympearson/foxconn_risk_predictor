if (jQuery('.nnc-nav').length) {
    var stickyNavTop = jQuery('.nnc-nav').offset().top;
    var stickyNav = function () {
        var scrollTop = jQuery(window).scrollTop();
        if (scrollTop > stickyNavTop) {
            jQuery('.nnc-nav').addClass('nnc-sticky');
        } else {
            jQuery('.nnc-nav').removeClass('nnc-sticky');
        }
    };
    stickyNav();
    jQuery(window).scroll(function () {
        stickyNav();
    });
}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

jQuery(document).ready(function ($) {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {
            $('.nnc-scroll-top').addClass("show");
        }
        else {
            $('.nnc-scroll-top').removeClass("show");
        }
    });
    $(".nnc-scroll-top").on("click", function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: 3000,
        speed: 600
    });


    $('input,textarea').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'))
        $(this).attr('placeholder', '');
    });
    $('input,textarea').blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });

    // News Ticker
    $('.newsticker').newsTicker({
        row_height: 35,
        max_rows: 1,
        speed: 1000,
        direction: 'down',
        duration: 4000,
        autostart: 1,
        pauseOnHover: 1
    });

    //Submenu Dropdown Toggle
    $(".nnc-resp-menu").click(function () {
        $(".nnc-resp-navigation").slideToggle("fast");
    });
});

/* Create HTML5 element for IE */
document.createElement("section");

jQuery(window).load(function() {
	jQuery('.pageloader').fadeOut('slow');
	jQuery('body').removeClass('loading');
});
