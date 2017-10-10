$(document).ready(function(){

	// карусель
	$('#foo1').owlCarousel({
		loop:false,
		nav:true,
		dots: false,
		items:3,
		startPosition : 2,
		stagePadding : 250,
		navText: ["", ""],
		responsive:{
			0:{
				items:1,
				stagePadding: 20
			},
			900:{
				items:2,
				stagePadding: 0
			},
			992:{
				items:1
			},
			1250:{
				items:2
			},
			1550:{
				items:3
			}
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
				stagePadding: 20
			},
			900:{
				items:2,
				stagePadding: 0
			},
			992:{
				items:1
			},
			1250:{
				items:2
			},
			1550:{
				items:3
			}
		},
		onInitialized: function (event) {
			refreshMiddle();
		},		
		onTranslated: function (event) {
			refreshMiddle();
			console.log(event);
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


	// validation
	$('#feedback-form').validate({
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$.ajax({type: "POST",url: $(form).attr('action'),data: strSubmit,
				success: function(){
					$('#feedback-form').html(thankcallback);
					startClock('feedback-form');
				}
			}).fail(function(error){alert(errorTxt)});
		}
	}); 


	$("[data-fancybox]").fancybox();	
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


function refreshMiddle(){
	$('#foo2 .owl-item').removeClass('big');

	$('#foo2 .owl-stage .owl-item.active').each(function(index){
		console.log(index);
		if (index === 1) {
			$(this).addClass('big');
		}
	})
}