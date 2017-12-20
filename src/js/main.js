$(document).ready(function () {
    $('#fullpage').fullpage({
        anchors: ['home', 'about', 'portfolio', 'partners', 'footer'],
        resize: false,
        animateAnchor: false,
        scrollOverflow: true,
        autoScrolling: true,
        responsive: '640px',
        fitSection: false,
        navigation: false,
        continuousVertical: false,
        paddingTop: '0',
        css3: true,

        afterRender: function () {
            setTimeout(function() { $(".preloader").fadeOut(1000) }, 1000)
        },

        afterLoad: function (anchorLink, index) {
            if (index == 1) {
                $("header .wrap").addClass("wrap__image")
            }
        },

        onLeave: function (index, nextIndex, direction) {
            var leavingSection = $(this);
            if (index == 1) {
                $("header .wrap").removeClass("wrap__image")
            }
        }
    });

    $('#nav-icon3').click(function () {
        $(this).toggleClass('open');
        $('.hidden-menu').toggleClass('hidden-menu__open');
    });

    $('.body-header .btn').click(function () {
        $('.fill-red').fadeIn();
    });

    $('.popup__close').click(function () {
        $('.fill-red').fadeOut();
    });

    $('.portfolio__col').hover(
        function () {
            $(this).addClass('active')
        },
        function () {
            $(this).removeClass('active')
        }
    );

    $('.btn-more').click(function () {
        $(this).hide();
        $('.additional').css("display", "flex").fadeIn();
        $.fn.fullpage.reBuild();
    });

    $('.btn-up').click(function () {
        $.fn.fullpage.moveTo(1);
    });

    $('.pagination .to-1').click(function () {
        $.fn.fullpage.moveTo(2);
    });

    $('.pagination .to-2').click(function () {
        $.fn.fullpage.moveTo(3);
    });

    $('.pagination .to-3').click(function () {
        $.fn.fullpage.moveTo(4);
    });

    $('.pagination .to-4').click(function () {
        $.fn.fullpage.moveTo(5);
    });
})