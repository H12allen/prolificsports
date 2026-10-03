const menuToggle = document.querySelector('.menu-toggle');
		const navigation = document.querySelector('.main-nav');
		const closeMenuButton = document.querySelector('.button');
		menuToggle.addEventListener('click', () => {
			const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
			menuToggle.setAttribute('aria-expanded', String(!isOpen));
			menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
			navigation.classList.add('is-open', !isOpen);
		});
		closeMenuButton.addEventListener('click', (event) => {
			navigation.classList.remove('is-open');
			menuToggle.setAttribute('aria-expanded', 'false');
			menuToggle.setAttribute('aria-label', 'Open menu');
		});


const campaignSlides = [
	{
		image: 'images/model-01.jpg',
		title: 'Built to Move.<br>Made to Last.',
		description: 'Gymwear engineered for your hardest sessions and everything after.'
	},
	{
		image: 'images/model-03.jpg',
		title: 'Train Strong.<br>Feel Good.',
		description: 'Supportive activewear that keeps up with every kind of workout.'
	},
	{
		image: 'images/model-02.jpg',
		title: 'Train like a beast.<br>Look like a beauty.',
		description: 'Technical training essentials designed to move with you.'
	}
];
const heroImage = document.querySelector('.hero-image');
const heroTitle = document.querySelector('.hero h1');
const heroDescription = document.querySelector('.hero-description');
const slideButtons = document.querySelectorAll('.slide-button');

let currentSlide = 0;
let autoSlideTimer;
let isAnimating = false;

function showSlide(index, instant = false) {
	if (isAnimating && !instant) return;

	const slide = campaignSlides[index];

	currentSlide = index;

	// Update active control immediately
	slideButtons.forEach((button, i) => {
		button.setAttribute(
			'aria-pressed',
			String(i === index)
		);
	});

	/*
		First fade the current image out.
	*/
	if (!instant) {
		isAnimating = true;

		heroImage.style.opacity = '0';
		heroImage.style.transform = 'scale(1.06)';
	}

	setTimeout(() => {

		// Change image while invisible
		heroImage.style.backgroundImage = `url("${slide.image}")`;

		// Update text
		heroTitle.innerHTML = slide.title;
		heroDescription.textContent = slide.description;

		/*
			Small delay lets the browser register
			the new image before fading it back in.
		*/
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {

				heroImage.style.opacity = '1';
				heroImage.style.transform = 'scale(1.02)';

				setTimeout(() => {
					isAnimating = false;
				}, 1400);
			});
		});

	}, instant ? 0 : 900);
}


function startAutoSlide() {
	clearInterval(autoSlideTimer);

	autoSlideTimer = setInterval(() => {

		const nextSlide =
			(currentSlide + 1) % campaignSlides.length;

		showSlide(nextSlide);

	}, 6500);
}


/* Manual controls */

slideButtons.forEach(button => {

	button.addEventListener('click', () => {

		const slideIndex = Number(button.dataset.slide);

		showSlide(slideIndex);

		// Restart timer
		startAutoSlide();
	});

});


/* Initial slide */

showSlide(0, true);

startAutoSlide();
