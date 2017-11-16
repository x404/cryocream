var ESC_KEY = 27;

$(document).ready(function(){

	var video = $('#video');
	if (video.length > 0) document.getElementById("video").play();


	// mobile-menu
	$('#navbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				var h = $(window).height();
				$('body').addClass('o-menu');
				$('#navbar').height(h);
			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
				$('#navbar').height('auto');
			};
		init();
	});	



	$(window).resize(function(){
		if ($('body').width() > 640) {
			$('body').removeClass('o-menu');
			$('#navbar').css('height', 'auto');
		}
	});


	$('.subnav-text .close').click(function(e){
		e.preventDefault();
		var $this = $(this);
		$this.closest('.show-event').removeClass('show-event');
		$this.remove();
	})


	// карусель
	$('#foo1').owlCarousel({
		loop:false,
		nav:true,
		dots: false,
		items:3,
		navText: ["", ""],
		responsive:{
			0:{
				items:1,
				stagePadding: 25
			},
			350:{
				items:1,
				stagePadding: 40
			},
			400:{
				items:1,
				stagePadding: 80
			},
			470:{
				items:1,
				stagePadding: 100
			},
			550:{
				items:1,
				stagePadding: 120
			},			
			700:{
				items:1,
				stagePadding: 150
			},
			900:{
				items:2,
			},
			1550:{
				items:3
			}
		},
		onInitialized: function (event) {
			refreshMiddle('foo1');
		},		
		onTranslated: function (event) {
			refreshMiddle('foo1');
			// console.log(event);
		}
	});


	$('#foo2').owlCarousel({
		loop:false,
		nav:true,
		dots: false,
		items:3,
		navText: ["", ""],
		responsive:{
			0:{
				items:1,
				stagePadding: 15
			},
			335:{
				items:1,
				stagePadding: 30
			},
			380:{
				items:1,
				stagePadding: 30
			},			
			415:{
				items:1,
				stagePadding: 40
			},
			525:{
				items:1,
				stagePadding: 80
			},
			767:{
				items:1,
				stagePadding: 0
			},
			991:{
				items:2
			},
			1450:{
				items:3
			}
		},
		onInitialized: function (event) {
			refreshMiddle('foo2');
		},		
		onTranslated: function (event) {
			refreshMiddle('foo2');
		}
	});




	// policy
	$('.policy input').click(function(){
		var $this = $(this),
			$submit = $this.closest('.form-policy');

		if ($this.is(':checked')){
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').removeAttr('disabled');
		} else {
			$submit.addClass('disabled');
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').attr('disabled', true);
		}
	});	

	// mobile-menu
	$('#navbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				h = $(document).height();
				$('body').addClass('o-menu');
				$('#navbar').height(h);

			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
				$('#navbar').height('auto');
			};
		init();
	});	


	var thankTxt = '<div class="thank text-center"><p>Спасибо! Ваше сообщение успешно отправлено</p></div>',
		errorTxt = 'Возникла ошибка';

	// validation
	$('#feedback-form').validate({
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$.ajax({type: "POST",url: $(form).attr('action'),data: strSubmit,
				success: function(){
					$('.feedback__form').append(thankTxt);
					$('.feedback__form fieldset').hide();
					startClock('feedback-form');
				}
			}).fail(function(error){alert(errorTxt)});
		}
	}); 


	$("[data-fancybox]").fancybox();


	$('#infomodal').on('show.bs.modal', function (e) {
		var $this = $(e.relatedTarget),
			id = $this.data('id'),
			title = $this.data('title'),
			url = id,
			posting = $.post(id);

		$.ajax('/' + url, 'POST').then(function(data) {
			$('#infomodal .title').text(title);
			$('#infomodal .modal__text').html(data);
		});
	});

	$('[data-toggle="teammodal"]').click(function(e){
		e.preventDefault();
		var $this = $(this),
			target = $this.data('target'),
			id = $this.data('id'),
			title = $this.data('title'),
			url = id;


		$.ajax('/' + url, 'POST').then(function(data) {
			$('#infomodal .title').text(title);
			$('#infomodal .modal__text').html(data);
			$('#infomodal').fadeIn();
			if ($(window).width() <= 650){
				$('body').addClass('scroll-no');				
			}
			addKeyPressHandler(target);
		});

		console.log(title);
	});


	$('#infomodal .close').click(function(e){
		e.preventDefault();
		var $this = $(this);
		$('#infomodal').fadeOut('normal', function(){	
			$('body').removeClass('scroll-no');		
		});
	});

});

// =заглушка для IE
//event listener: DOM ready
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
//call plugin function after DOM ready
addLoadEvent(function(){
	outdatedBrowser({
		bgColor: '#f25648',
		color: '#ffffff',
		lowerThan: 'transform',
		languagePath: '/outdatedbrowser/lang/ru.html'
	})
});
// =/заглушка для IE


function addKeyPressHandler(modal){
	'use strict';
	document.body.addEventListener("keyup", function(event){
		event.preventDefault();
		if (event.keyCode === ESC_KEY){
			$(modal).find('.close').trigger('click');
		}
	});
};




var timer,
	sec = 3;


function showTime(sendform){
	sec = sec-1;
	if (sec <=0) {
		stopClock();

		switch (sendform){
			case 'qorder-form':
				$('.qorder__box .thank').fadeOut('normal',function(){
					$('.qorder__box .thank').remove();
					$('.qorder__box .form-control, .qorder__box textarea').val('');
				});
				break;
			case 'feedback-form':
				$('.feedback .thank').fadeOut('normal',function(){
					$('.feedback .thank').remove();
					$('.feedback .form-control, .feedback textarea').val('');
					$('.feedback__form fieldset').show();
				});
				break;
			case 'cart-form':
				$('.cart .thank').fadeOut('normal',function(){
					$('.cart .thank').remove();
					// $('.cart .form-control, .cart textarea').val('');
					// $('.cart__form fieldset').show();
				});
				break;	
			default:
				modal = $("#" + sendform).closest('.modal');
				modal.fadeOut('normal',function(){
					modal.modal('hide');
				});
				break;
		}
	}
}
function stopClock(){
	window.clearInterval(timer);
	timer = null;
	sec = 3;
}

function startClock(sendform){
	if (!timer)
		timer = window.setInterval("showTime('" + sendform + "')",1000);
}


function refreshMiddle(id){
	// console.log(id);
	$('#' + id + ' .owl-item').removeClass('big');

	$('#' + id + ' .owl-stage .owl-item.active').each(function(index){
		if (index === 1) {
			$(this).addClass('big');
		}
	})
}


// показываем второй  уровень меню
$(document).on('click', '.o-menu .folder > a, .o-menu .folder > span', function(e){
	e.preventDefault();
	var $this = $(this);
	$this.next('.subnav').slideToggle().prev().toggleClass('open');
})



$(document).on('mouseover', '.mainnav li:not(.show-event) a',	function(){
	$(this).closest('li').addClass('hover');
})


$(document).on('mouseleave', '.mainnav li:not(.show-event) a', function(){
	$(this).closest('li').removeClass('hover');
})
