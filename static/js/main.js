/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (browser.name == 'ie' || browser.name == 'edge' || browser.mobile) ? function() { return $(this) } : function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				on, off;

			on = function() {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function() {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Clear transitioning state on unload/hide.
		// $window.on('unload pagehide', function() {
		//	window.setTimeout(function() {
		//		$('.is-transitioning').removeClass('is-transitioning');
		//	}, 250);
		//});

	// Fix: Enable IE-only tweaks.
		if (browser.name == 'ie' || browser.name == 'edge')
			$body.addClass('is-ie');

	// Scrolly.
		$('.scrolly').scrolly({
			offset: function() {
				return $header.height() - 2;
			}
		});

	// Tiles.
		var $tiles = $('.tiles > article');

		$tiles.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img'),
				$link = $this.find('.link'),
				x;

			// Image.

				// Set image.
					$this.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide original.
					$image.hide();

			// Link.
				if ($link.length > 0) {

					$x = $link.clone()
						.text('')
						.addClass('primary')
						.appendTo($this);

					$link = $link.add($x);

					$link.on('click', function(event) {

						var href = $link.attr('href');

						// Prevent default.
							event.stopPropagation();
							event.preventDefault();

						// Target blank?
							if ($link.attr('target') == '_blank') {

								// Open in new tab.
									window.open(href);

							}

						// Otherwise ...
							else {

								// Start transitioning.
									$this.addClass('is-transitioning');
									$wrapper.addClass('is-transitioning');

								// Redirect.
									window.setTimeout(function() {
										location.href = href;
									}, 500);

							}

					});

				}

		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() {
				$window.trigger('scroll');
			});

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.height() + 10,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

				window.setTimeout(function() {
					$window.triggerHandler('scroll');
				}, 100);

			});

		}

	// Banner.
		$banner.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img');

			// Parallax.
				$this._parallax(0.275);

			// Image.
				if ($image.length > 0) {

					// Set image.
						$this.css('background-image', 'url(' + $img.attr('src') + ')');

					// Hide original.
						$image.hide();

				}

		});

	// Menu.
		var $menu = $('#menu'),
			$menuInner;

		$menu.wrapInner('<div class="inner"></div>');
		$menuInner = $menu.children('.inner');
		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menuInner
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					window.setTimeout(function() {
						window.location.href = href;
					}, 250);

			});

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();
				event.preventDefault();

				$body.removeClass('is-menu-visible');

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

			// SLIDER TESTIMONIOS

		var swiper = new Swiper('.testimonial-swiper', {
		loop: true,
		slidesPerView: 1,
		overflow: 'hidden',
		centeredSlides: true,
		spaceBetween: 0,
		autoplay: {
			delay: 6000,
			disableOnInteraction: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
		});


			(function(){
			const lb = document.getElementById('videoLightbox');
			const frame = lb.querySelector('.video-frame');
			const closeBtn = lb.querySelector('.lightbox-close');

			// Convert watch URLs to embed URLs with nice params
			function toEmbed(url){
				try{
				const u = new URL(url);
				const isYT = /youtube\.com|youtu\.be/.test(u.hostname);
				const isVimeo = /vimeo\.com/.test(u.hostname);

				if (isYT){
					// get video id
					let id = u.searchParams.get('v');
					if(!id && u.hostname === 'youtu.be') id = u.pathname.slice(1);
					const base = `https://www.youtube-nocookie.com/embed/${id}`;
					const params = new URLSearchParams({
					autoplay: 1, rel: 0, modestbranding: 1, controls: 1, playsinline: 1
					});
					return `${base}?${params.toString()}`;
				}

				if (isVimeo){
					const id = u.pathname.replace('/', '');
					const base = `https://player.vimeo.com/video/${id}`;
					const params = new URLSearchParams({ autoplay: 1, dnt: 1, title: 0, byline: 0, portrait: 0 });
					return `${base}?${params.toString()}`;
				}

				// Fallback: return original in an iframe
				return url;
				}catch(e){ return url; }
			}

			function openLightbox(embedUrl, title){
				// build iframe lazily
				frame.innerHTML = `<iframe
					src="${toEmbed(embedUrl)}"
					title="${title ? title.replace(/"/g,'&quot;') : 'Video'}"
					allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen></iframe>`;
				lb.classList.add('open');
				lb.setAttribute('aria-hidden','false');
				document.body.style.overflow = 'hidden';
			}

			function closeLightbox(){
				lb.classList.remove('open');
				lb.setAttribute('aria-hidden','true');
				frame.innerHTML = ''; // stop playback
				document.body.style.overflow = '';
			}

			document.addEventListener('click', (e)=>{
				const btn = e.target.closest('.video-trigger');
				if(btn){
				e.preventDefault();
				openLightbox(btn.dataset.embed, btn.dataset.title || '');
				}
			});

			closeBtn.addEventListener('click', closeLightbox);
			lb.addEventListener('click', (e)=>{ if(e.target === lb) closeLightbox(); });
			document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && lb.classList.contains('open')) closeLightbox(); });
			})();




		document.addEventListener('DOMContentLoaded', function () {
			// Carrusel Plan 1 (2D)
			new Swiper('#price-gallery-2d', {
			slidesPerView: 1,
			loop: true,
			spaceBetween: 0,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '#price-gallery-2d .swiper-button-next',
				prevEl: '#price-gallery-2d .swiper-button-prev'
			},
			pagination: {
				el: '#price-gallery-2d .swiper-pagination',
				clickable: true
			}
			});
		});

  })(jQuery);
