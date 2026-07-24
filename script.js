(function() {
	var saved = localStorage.getItem('theme') || 'auto';
	var theme = saved === 'auto'
		? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
		: saved;
	document.documentElement.setAttribute('data-theme', theme);

	matchMedia('(prefers-color-scheme: light)').addEventListener('change', function() {
		if (localStorage.getItem('theme') !== 'auto') return;
		var t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', t);
	});

	document.addEventListener('DOMContentLoaded', function() {
		var current = localStorage.getItem('theme') || 'auto';
		document.querySelectorAll('.theme-btn').forEach(function(btn) {
			if (btn.getAttribute('data-theme') === current) {
				btn.classList.add('active');
			}
			btn.addEventListener('click', function() {
				var t = btn.getAttribute('data-theme');
				localStorage.setItem('theme', t);
				if (t === 'auto') {
					t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
				}
				document.documentElement.setAttribute('data-theme', t);
				document.querySelectorAll('.theme-btn').forEach(function(b) {
					b.classList.toggle('active', b === btn);
				});
			});
		});

		var hamburger = document.querySelector('.hamburger');
		var navLinks = document.querySelector('.nav-links');

		if (hamburger && navLinks) {
			hamburger.addEventListener('click', function(e) {
				e.stopPropagation();
				hamburger.classList.toggle('open');
				navLinks.classList.toggle('open');
			});

			navLinks.querySelectorAll('.nav-link').forEach(function(link) {
				link.addEventListener('click', function() {
					hamburger.classList.remove('open');
					navLinks.classList.remove('open');
				});
			});

			document.addEventListener('click', function(e) {
				if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
					hamburger.classList.remove('open');
					navLinks.classList.remove('open');
				}
			});
		}
	});
})();
