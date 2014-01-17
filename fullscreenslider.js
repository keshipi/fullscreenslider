$(function() {

	var slider = {};
	
	// ============================================
	// PropertyDefinition
	// ============================================
	slider.children = $('.slider-items').children().length;
	slider.fadetime = 400;
	
	// ============================================
	// FunctionDefinition
	// ============================================
	slider.set_size = function() {
		var $slider = $('.slider');
		var p = {
			'height': window.innerHeight,
			'width': window.innerWidth
		};
		$slider.css(p);

		var $slider_view = $('.slider-view');
		var p = {
			'top': 0,
			'left': -(window.innerWidth * slider.index()),
			'height': window.innerHeight,
			'width': window.innerWidth
		};
		$slider_view.css(p);

		var $slider_items = $('.slider-items');
		p = {
			'height': window.innerHeight,
			'width': window.innerWidth * slider.children
		};
		$slider_items.css(p);

		var $slider_item = $('.slider-items li img');
		$slider_item.css(p);
		p = {
			'height': window.innerHeight,
			'width': window.innerWidth
		};
		$slider_item.css(p);
	};
	slider.next = function() {
// console.log('next');

		var p = {};
		var index = slider.index();
		var post_index = 0;
		if (slider.has_next()) {
			post_index = index + 1;
			p = {'left': -(window.innerWidth * post_index)};
		} else {
			p = {'left': 0};
		}

		$('.slider-view').animate(p, 400);

		$('.current').removeClass('current');
		$('.slider-items').children().eq(post_index).addClass('current');
	};
	slider.prev = function() {
// console.log('prev');

		var p = {};
		var index = slider.index();
		var post_index = slider.children - 1;
		if (slider.has_prev()) {
			post_index = index - 1;
			p = {'left': -(window.innerWidth * post_index)};
		} else {
			p = {'left': -(window.innerWidth * post_index)};
		}

		$('.slider-view').animate(p, 400);

		$('.current').removeClass('current');
		$('.slider-items').children().eq(post_index).addClass('current');
	};
	slider.has_next = function() {
		if ((slider.children - 1) == slider.index()) {
			return false;
		}

		return true;
	};
	slider.has_prev = function() {
		if (0 == slider.index()) {
			return false;
		}

		return true;
	};
	slider.index = function() {
		var $current = $('.current');
		var $parent = $current.parent();
		return $current.parent().children().index($current);
	};
	slider.init = function() {
		$('.slider-items').children(':first').addClass('current');
		slider.set_size();
	}();

	// ============================================
	// EventDefinition
	// ============================================
	$('#prev').click(function(e) {
		slider.prev();
	});
	$('#next').click(function(e) {
		slider.next();
	});
	$(window).mousemove(function(e) {
		var dx = e.clientX;
		var p = {'top': window.innerHeight * 0.3};
		if ((window.innerWidth * 0.2) >= dx) {
			$('#prev').css(p).fadeIn(slider.fadetime);
		} else if ((window.innerWidth * 0.8) <= dx) {
			$('#next').css(p).fadeIn(slider.fadetime);
		} else {
			$('#prev, #next').fadeOut(slider.fadetime);
		}
	});
	$(window).resize(function(e) {
		slider.set_size();
	});

});