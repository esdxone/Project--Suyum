"use strict";

var panelFixed = false;
/* Фиксированное меню
==========================================================================*/

function fixed_menu() {
  if (parseInt($(window).scrollTop()) > 0) {
    $('.js-fixed').addClass('is-fixed');

    if (parseInt($(window).scrollTop()) + Math.round($('.js-viewport').height()) == Math.round($('body').innerHeight())) {
      $('.js-panel').removeClass('is-fixed');
      panelFixed = false;
    } else {
      $('.js-panel').addClass('is-fixed');
      panelFixed = true;
    }
  } else {
    $('.js-fixed').removeClass('is-fixed');
  }
}
/* Анимация для блоков
==========================================================================*/


function anim(el, margin) {
  if ($(window).scrollTop() + $(window).height() - margin >= el.offset().top && el.data("loaded") == 0) {
    el.data("loaded", 1).addClass('is-loaded');
  }
}

function waveAnim(el) {
  var st = window.pageYOffset || document.documentElement.scrollTop;

  if (st + $('.js-viewport').height() >= el.offset().top && st <= el.offset().top) {
    console.log(st, $('.js-viewport').height(), el.offset().top);
    el.css({
      x: (st + $('.js-viewport').height() - el.offset().top) / $('.js-viewport').height() * el.data('value')
    });
  }
}

function parallax(el, target) {
  function parallaxSettings(e, el, target) {
    var settings = {
      x: e.clientX / target.innerWidth(),
      y: e.clientY / target.innerHeight(),
      position: {
        x: !!el.data('position-x') && el.data('position-x') === 'right' ? '-' : '',
        y: !!el.data('position-y') && el.data('position-y') === 'top' ? '-' : ''
      },
      value: el.data('value') !== undefined ? el.data('value') : 50
    };
    return settings;
  }

  if (!target[0].window) {
    target.on('mouseenter', function (e) {
      var settings = parallaxSettings(e, el, target);
      el.transition({
        x: settings.position.x + settings.x * settings.value,
        y: settings.position.y + settings.y * settings.value
      }, 100, 'linear', function () {
        target.on('mousemove', function (e) {
          var settings = parallaxSettings(e, el, target);
          el[0].style.transform = 'translate(' + settings.position.x + settings.x * settings.value + 'px, ' + settings.position.y + settings.y * settings.value + 'px)';
        });
      });
    });
  } else {
    target.on('mousemove', function (e) {
      var settings = parallaxSettings(e, el, target);
      el[0].style.transform = 'translate(' + settings.position.x + settings.x * settings.value + 'px, ' + settings.position.y + settings.y * settings.value + 'px)';
    });
  }
}

$(function () {
  var _this = this;

  /* Определение браузера IE или Edge
  ==========================================================================*/
  if (document.documentMode || /Edge/.test(navigator.userAgent)) {
    $('html').addClass('bx-ie');
  }
  /* Инпуты в стиле материал
  ==========================================================================*/


  $('.js-material-input').each(function () {
    if ($(this).find('input,textarea').val()) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });
  $('.js-material-input').find('input,textarea').focusin(function () {
    $(this).closest('.js-material-input').addClass('focus');
  });
  $('.js-material-input').find('input,textarea').focusout(function () {
    $(this).closest('.js-material-input').removeClass('focus');
  });
  $('.js-material-input').find('input,textarea').change(function () {
    if ($(this).val()) {
      $(this).closest('.js-material-input').addClass('active');
    } else {
      $(this).closest('.js-material-input').removeClass('active');
    }
  });
  /* Маска для телефонов
  ==========================================================================*/

  var phones = document.getElementsByClassName('js-phone');

  for (var i = 0; i < phones.length; i++) {
    var cleave = new Cleave(phones[i], {
      numericOnly: true,
      delimiters: [' (', ') ', '-', '-'],
      blocks: [1, 3, 3, 2, 2]
    });
  }
  /* Кастомный скролл бар
  ==========================================================================*/


  $('.js-custom-scroll').mCustomScrollbar();
  /* Открытие/Закрытие меню
  ==========================================================================*/

  $('.js-menu-open').click(function (e) {
    e.preventDefault();

    if ($(this).is('.is-active')) {
      $(this).removeClass('is-active');
      $('.js-header-menu').removeClass('is-open');
      $('.js-header').removeClass('menu-is-open');
    } else {
      $(this).addClass('is-active');
      $('.js-header-menu').addClass('is-open');
      $('.js-header').addClass('menu-is-open');
    }
  });
  /* Откртиые/Закрытие дропдаунов
  ==========================================================================*/

  $('.js-dropdown__open').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('is-open');
    $(this).closest('.js-dropdown').find('.js-dropdown__block').slideToggle(300);
  });
  /* Открытие/Закрытие контактов хедере
  ==========================================================================*/

  if ($('html').is('.mobile') || $('html').is('.tablet')) {
    $('.js-header-contacts__phone-trigger').click(function (e) {
      e.preventDefault();
      $(this).toggleClass('is-active');
      $('.js-header-contacts__others').toggleClass('is-open');
    });
  }
  /* Открытие/Закрытие корзины в хедере
  ==========================================================================*/


  if ($('html').is('.mobile') || $('html').is('.tablet')) {
    $('.js-header__cart-trigger').click(function (e) {
      e.preventDefault();
      $(this).toggleClass('is-active');
      $('.js-header__cart-dropdown').toggleClass('is-open');
    });
  } else {
    $('.js-header__cart-trigger').hover(function () {
      $(this).addClass('is-active');
      $('.js-header__cart-dropdown').addClass('is-open');
    }, function () {
      $(this).removeClass('is-active');
      $('.js-header__cart-dropdown').removeClass('is-open');
      $('.js-header__cart-dropdown').mouseenter(function () {
        $('.js-header__cart-trigger').addClass('is-active');
        $('.js-header__cart-dropdown').addClass('is-open');
      }).mouseleave(function () {
        $('.js-header__cart-trigger').removeClass('is-active');
        $('.js-header__cart-dropdown').removeClass('is-open');
      });
    });
  }
  /* Главный баннер
  ==========================================================================*/


  $('.js-m-banner__slider').each(function () {
    var nav = $(this).next('.js-m-banner__nav'),
        speed = 500,
        autoplaySpeed = 5000,
        progressContainer = nav.find('.js-m-banner__nav-progress')[0];
    var progress = new ProgressBar.Circle(progressContainer, {
      strokeWidth: 2,
      trailWidth: 2,
      trailColor: '#5E7FA2',
      color: '#10EBF8',
      duration: autoplaySpeed
    });
    $(this).on('init', function (event, slick) {
      $(this).find('.slick-slide').not(':first-child').addClass('slick-slide--before');
      progress.animate(1);
    });
    $(this).slick({
      fade: true,
      mobileFirst: true,
      arrows: false,
      speed: speed,
      appendArrows: nav,
      autoplay: true,
      autoplaySpeed: autoplaySpeed,
      pauseOnHover: false,
      pauseOnFocus: false,
      prevArrow: '<button type="button" class="m-banner__nav-arrow m-banner__nav-arrow--prev"><svg class="icon icon-arrow-t"><use xlink:href="#icon-arrow-t"></use></svg></button>',
      nextArrow: '<button type="button" class="m-banner__nav-arrow m-banner__nav-arrow--next"><svg class="icon icon-arrow-b"><use xlink:href="#icon-arrow-b"></use></svg></button>',
      responsive: [{
        breakpoint: 767,
        settings: {
          arrows: true
        }
      }]
    });
    $(this).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      $(this).find('.slick-slide').eq(currentSlide).addClass('slick-slide--after');
      progress.animate(0, {
        duration: speed
      });
    });
    $(this).on('afterChange', function (event, slick, currentSlide) {
      $(this).find('.slick-slide').not($(this).find('.slick-slide').eq(currentSlide)).removeClass('slick-slide--after');
      progress.animate(1);
    });
  });
  /* Слайдер новостей
  ==========================================================================*/

  $('.js-m-news__slider').each(function () {
    var nav = $(this).closest('.js-m-news').find('.js-m-news__nav');
    $(this).slick({
      mobileFirst: true,
      arrows: false,
      dots: true,
      speed: 500,
      appendArrows: nav,
      prevArrow: '<button type="button" class="m-news__nav-arrow m-news__nav-arrow--prev"><svg class="icon icon-arrow-t"><use xlink:href="#icon-arrow-t"></use></svg></button>',
      nextArrow: '<button type="button" class="m-news__nav-arrow m-news__nav-arrow--next"><svg class="icon icon-arrow-b"><use xlink:href="#icon-arrow-b"></use></svg></button>',
      responsive: [{
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          arrows: true,
          dots: false
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: true,
          dots: false
        }
      }]
    });
  });
  /* Слайдер статей на детальной странице */

  $('.js-articles-slider').each(function () {
    var nav = $(this).closest('.js-m-news').find('.js-m-news__nav');
    $(this).slick({
      mobileFirst: true,
      arrows: false,
      dots: true,
      speed: 500,
      appendArrows: nav,
      prevArrow: '<button type="button" class="m-news__nav-arrow m-news__nav-arrow--prev"><svg class="icon icon-arrow-t"><use xlink:href="#icon-arrow-t"></use></svg></button>',
      nextArrow: '<button type="button" class="m-news__nav-arrow m-news__nav-arrow--next"><svg class="icon icon-arrow-b"><use xlink:href="#icon-arrow-b"></use></svg></button>',
      responsive: [{
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          arrows: true,
          dots: false
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: true,
          dots: false
        }
      }]
    });
  }); // Catalog detail slider

  $('.js-slider-catalog').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.js-slider-catalog-nav',
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    }]
  });
  $('.js-slider-catalog-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.js-slider-catalog',
    appendArrows: ".catalog-card__slider-nav",
    prevArrow: '<button type="button" class="m-banner__nav-arrow catalog-card__nav-arrow--prev slick-arrow" style=""><svg class="icon icon-arrow-t"><use xlink:href="#icon-arrow-t"></use></svg></button>',
    nextArrow: '<button type="button" class="m-banner__nav-arrow catalog-card__nav-arrow--next slick-arrow" style=""><svg class="icon icon-arrow-b"><use xlink:href="#icon-arrow-b"></use></svg></button>',
    focusOnSelect: true,
    responsive: [{
      breakpoint: 1680,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  }); // Catalog equip slider

  $('.js-catalog-equip-slider').each(function () {
    $(this).slick({
      mobileFirst: true,
      arrows: false,
      dots: true,
      speed: 500,
      responsive: [{
        breakpoint: 1680,
        settings: {
          slidesToShow: 4,
          arrows: true,
          dots: false
        }
      }, {
        breakpoint: 1410,
        settings: {
          slidesToShow: 3,
          arrows: false,
          dots: true
        }
      }, {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          arrows: true
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: true
        }
      }, {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          arrows: true
        }
      }]
    });
  });
  /* Вызовы функций
  ==========================================================================*/

  fixed_menu();
  $(window).scroll(function (e) {
    fixed_menu();
  });

  if (!$('html').is('.mobile')) {
    $('.js-anim').each(function () {
      anim($(this), $(this).data('margin'));
    });
    $(window).scroll(function () {
      $('.js-anim').each(function () {
        anim($(this), $(this).data('margin'));
      });
    });
  } // modal touchspin


  $("input[id='modal-body__count']").TouchSpin(); // catalog slider touchspin

  $("input.js-catalog-equip-count").TouchSpin(); // catalog slider touchspin

  $("input.js-cart__item-count").TouchSpin(); //modal spin

  $(".js-service-spin").click(function () {
    if (!$(this).hasClass("active")) {
      var labelValue = $(this).find("input").next().text();
      console.log(labelValue);
      $(this).addClass("active");
      $(this).find("input").next().removeClass('disable');
      $(this).find("input").prev().addClass('disable');
      $(this).find("input").attr("data-value", labelValue);
      $(this).find("input").prop('checked', true);
    } else {
      var labelValue = $(this).find("input").prev().text();
      $(this).removeClass("active");
      $(this).find("input").prev().removeClass('disable');
      $(this).find("input").next().addClass('disable');
      $(this).find("input").attr("data-value", labelValue);
      $(this).find("input").prop('checked', false);
    }
  }); //================ УДАЛИТЬ НА СБОРКЕ =========================//

  if ($(location).attr('pathname') === "/main.html") {
    $(".js-header").removeClass('secondary-header');
  }

  ; //================ УДАЛИТЬ НА СБОРКЕ =========================//
  // catalog touchspin

  $("input.js-catalog-count").TouchSpin(); // catalog variation select

  $(".js-vartiation-button").click(function () {
    if (!$(this).hasClass("active")) {
      var priceValue = $(this).attr("data-price");
      var countValue = $(this).attr("data-count");
      $(".catalog-card__vartiations").find("label").removeClass("active");
      $(this).find("input").prop('checked', true);
      $(this).addClass("active");
      catalogPrice(priceValue, countValue);
      recountValue();
    }
  }); // Пересчитываем цену и количество по клику на вариацию

  function catalogPrice(price, count) {
    // Записываем количество
    $(".js-catalog-count").val(count); // Записываем цену

    $(".js-catalog-main-price").text(price * count);
  }

  function recountValue() {
    $('.js-catalog-main-price').spincrement({
      thousandSeparator: "",
      duration: 500,
      fade: true
    });
  }

  $('.js-modal').on('click', function () {
    var target = $(_this).data('target');
    $(target).modal('show');
  });
  $('.js-anim').each(function () {
    var self = $(this);
    anim(self, 0);
    $(window).scroll(function () {
      anim(self, 0);
    });
  });
  $('.js-wave').each(function () {
    var self = $(this);
    waveAnim(self);
    $(window).scroll(function (e) {
      waveAnim(self);
    });
  });
  $('.js-parallax').each(function () {
    if ($(window).width() >= 1024) {
      parallax($(this), !!$(this).data('target') ? $(this).closest('.' + $(this).data('target')) : $(window));
    }
  }); //contacts

  function contactsImg() {
    $('.js-contact-img').each(function () {
      var count = $(this).find('a').length;
      var itemWidth = $(this).find('a').width();
      var containerWidth = $(this).width() - $(this).find(".points__contact-img").css("column-gap").replace(/\D+/g, "") * 2;
      var counter = 0;
      var itemWidthFor = 0;

      while (containerWidth > itemWidthFor) {
        counter++;
        itemWidthFor = itemWidth * counter;
      }

      var itemCount = counter - 1;

      if (count > itemCount) {
        $(this).find('a').hide();
        var elements = count - itemCount;
        $(this).find('a:lt(' + itemCount + ')').addClass('is-show').show();
        $(this).find('a.is-show').last().addClass('last-item');
        $(this).find('a.is-show').last().append($('<span class="points__contact-img-count">' + '+' + elements + '</span>'));
      }
    });
  }

  contactsImg();
  $(function () {
    var reCaptchaWidth = 304;
    var containerWidth = $('.js-captcha').width();

    if (reCaptchaWidth > containerWidth) {
      var reCaptchaScale = containerWidth / reCaptchaWidth;
      $('.captcha-elem').css({
        'transform': 'scale(' + reCaptchaScale + ')',
        'transform-origin': 'left top'
      });
    }
  });
});
$(function () {
  if ($('#contacts-map').length) {
    var markers = [[55.792665, 37.716504], [55.793708, 37.716791], [55.793404, 37.718121]];
    var mapHeight = $('#contacts-map').height();
    ymaps.ready(function () {
      var map = new ymaps.Map("contacts-map", {
        center: [55.792665, 37.716504],
        zoom: 18,
        behaviors: ['default'],
        controls: []
      }),
          MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<span style="font-weight: 600;font-size: 18px; color: #fff;">{{ properties.geoObjects.length }}</span>'),
          clusterer = new ymaps.Clusterer({
        clusterIcons: [{
          href: 'img/map/contacts-map.png',
          size: [57, 57],
          offset: [-27.5, -67],
          iconContentOffset: [23, 15]
        }, {
          href: 'img/map/contacts-map.png',
          size: [60, 65],
          offset: [-45, -108],
          iconContentOffset: [25, 25]
        }],
        clusterNumbers: [100],
        clusterIconContentLayout: MyIconContentLayout
      });
      var MyBalloonLayout = ymaps.templateLayoutFactory.createClass('<div class="popover">' + '<div class="popover__arrow"></div>' + '<div class="popover__inner">' + '<a class="popover__close" href="#">' + '<svg class="icon icon-close">' + '<use xlink:href="#icon-close"></use>' + '</svg>' + '</a>' + '$[[options.contentLayout observeSize minWidth=300 maxWidth=480]]' + '<span class="popover__tail"></span>' + '</div>' + '</div>', {
        build: function build() {
          this.constructor.superclass.build.call(this);
          this._$element = $('.popover', this.getParentElement());
          this.applyElementOffset();

          this._$element.find('.popover__close').on('click', $.proxy(this.onCloseClick, this));
        },
        clear: function clear() {
          this._$element.find('.popover__close').off('click');

          this.constructor.superclass.clear.call(this);
        },
        onSublayoutSizeChange: function onSublayoutSizeChange() {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

          if (!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();
          this.events.fire('shapechange');
        },
        applyElementOffset: function applyElementOffset() {
          this._$element.css({
            left: -(this._$element[0].offsetWidth / 2),
            top: -(this._$element[0].offsetHeight + this._$element.find('.popover__arrow')[0].offsetHeight)
          });
        },
        onCloseClick: function onCloseClick(e) {
          e.preventDefault();
          this.events.fire('userclose');
        },
        getShape: function getShape() {
          if (!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          var position = this._$element.position();

          return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([[position.left, position.top], [position.left + this._$element[0].offsetWidth, position.top + this._$element[0].offsetHeight + this._$element.find('.popover__arrow')[0].offsetHeight]]));
        },
        _isElement: function _isElement(element) {
          return element && element[0] && element.find('.popover__arrow')[0];
        }
      });
      var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass('<div class="popover__content">$[properties.balloonContent]</div>');
      map.behaviors.disable(['scrollZoom']);
      var geoObjects = [];

      for (var i = 0; i < markers.length; i++) {
        var marker = markers[i]; //       balloon__phone = '',
        //       balloon__email = '',
        //       balloon__site = '';
        // if (marker['PHONE']) {
        //   balloon__phone =  '<p class="partnerPhone"><i class="fas fa-phone"></i> <a href=tel:"'+marker['PHONE']+'">'+marker['PHONE']+'</a></p>';
        // }
        // if (marker['EMAIL']) {
        //   balloon__email = '<p class="partnerEmail"><i class="fas fa-envelope"></i> <a href="mailto:'+marker['EMAIL']+'">'+marker['EMAIL']+'</a></p>';
        // }
        // if (marker['SITE']) {
        //   balloon__site = '<p class="partnerSite"><i class="fas fa-home"></i> <a href="//'+marker['SITE']+'" target="_blank" title="'+marker['NAME']+'">'+marker['SITE']+'</a></p>';
        // }
        // MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        // 	'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        // );

        var balloon = '<div class="ballon">' + '<div class="ballon__head">' + '<div class="ballon__head-text">Suyum</div>' + '</div>' + '<div href="#" class="baloon__body">' + //   '<div class="baloon__img">'+
        //     '<img src="img/map/community-center.jpg">' +
        //   '</div>'+
        //   '<div class="baloon__text-title">Преображенская Старообрядческая Московская Община</div>'+
        '<div class="baloon__props">' + '<div class="baloon__line">' + '<svg class="icon icon-phone"><use xlink:href="#icon-map-phone"></use></svg>' + '<a href="tel:+79161712767">+7 (916) 171-27-67</a></br>' + '<a href="tel:+79037397246">+7 (903) 739-72-46</a></br>' + '<a href="tel:+79687212251">+7 (968) 721-22-51</a></br>' + '<a href="tel:+79175284157">+7 (917) 528-41-57</a>' + '</div>' + '<div class="baloon__line">' + '<svg class="icon icon-ico_mail2"><use xlink:href="#icon-map-mail"></use></svg>' + '<a href="mailto:frolova.antonina.voda@yandex.ru">frolova.antonina.voda@yandex.ru</a>' + '</div>' + '<div class="baloon__line">' + '<svg class="icon icon-worktime"><use xlink:href="#icon-map-time"></use></svg>' + '<span>Ежедневно с 9:00 до 18:00 </span>' + '</div>' + '<div class="baloon__line">' + '<svg class="icon icon-address"><use xlink:href="#icon-map-address"></use></svg>' + '<span>г. Подольск, ул. Народная, д. 26 б, пав. №2</span>' + '</div>' + '</div>' + '</div>' + '</div>'; // '<div class="balloon">' +
        // 	'<div class="balloon__header">' +
        // 		'<div class="balloon__title">' +
        // 			'<a href="#">Преображенская Старообрядческая Московская Община</a>' +
        // 		'</div>' +
        // 	'</div>' +
        // 	'<div class="balloon__body">' +
        // 		'<div class="balloon__address">' +
        // 			'<svg class="icon icon-mark"><use xlink:href="#icon-mark"></use></svg>' +
        // 			'<span class="">г. Воронеж, ул. Правды, дом 26, офис 2</span>' +
        // 		'</div>' +
        // 		'<div class="balloon__phone">' +
        // 			'<svg class="icon icon-tel"><use xlink:href="#icon-tel"></use></svg>' +
        // 			'<a href="tel:+7 (926) 047-32-22" class="">+7 (926) 047-32-22</a>' +
        // 		'</div>' +
        // 		'<div class="balloon__email">' +
        // 			'<svg class="icon icon-mail"><use xlink:href="#icon-mail"></use></svg>' +
        // 			'<span class="">somemail@mail.com</span>' +
        // 		'</div>' +
        // 		'<div class="balloon__work-time">' +
        // 			'<svg class="icon icon-time"><use xlink:href="#icon-time"></use></svg>' +
        // 			'<span class="">с 10:00 до 22:00</span>' +
        // 		'</div>' +
        // 	'</div>' +
        // '</div>'

        ;
        geoObjects[i] = new ymaps.Placemark(marker, {
          balloonContent: balloon,
          hintContent: 'Suyum'
        }, {
          balloonLayout: MyBalloonLayout,
          balloonContentLayout: MyBalloonContentLayout,
          balloonOffset: [0, -50],
          iconLayout: 'default#imageWithContent',
          iconImageHref: '../img/map-item.png',
          iconImageSize: [80, 46],
          iconImageOffset: [-19.5, -75],
          iconContentOffset: [0, 0]
        });
      }

      clusterer.add(geoObjects);
      map.geoObjects.add(clusterer);
      map.controls.add('zoomControl', {
        size: 'small',
        "float": 'none',
        position: {
          top: mapHeight / 2 - 30,
          right: '45px'
        }
      });
    });
  }
});