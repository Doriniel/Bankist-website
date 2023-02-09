'use strict';

// modal window:

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// cookie message:

const cookieMes = document.createElement('div');
cookieMes.innerHTML =
  'We use cookies for analytics and better functionality. <button class="btn btn--close-cookie">Accept</button>';
cookieMes.classList.add('cookie-message');
cookieMes.style.backgroundColor = '#37383d';

document.querySelector('.header').after(cookieMes);

// delete cookie message by clicking on button
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    cookieMes.remove();
  });

cookieMes.style.height =
  Number.parseFloat(getComputedStyle(cookieMes).height) + 30 + 'px';

// console.dir(modal);
// console.log(modal.getAttribute('title'));
// modal.setAttribute('title', 'This title is brand new');
// console.log(modal.getAttribute('title'));

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// smooth scrolling:

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScroll.addEventListener('click', function (event) {
  let s1coords = section1.getBoundingClientRect();

  // an old way: window.scroll(), window.scrollTo();
  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });

  // more modern way: Element.scrollIntoView();
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});
