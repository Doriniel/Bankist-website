'use strict';

// selecting elements:

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// // // //
const navEl = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');
const navBar = document.querySelector('.nav');

// modal window:

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

// smooth scrolling:

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

// Adding page navigation using event delegation:

navBar.addEventListener('click', function (event) {
  event.preventDefault();

  if (
    event.target.classList.contains('nav__link') &&
    !event.target.classList.contains('nav__link--btn')
  ) {
    const id = event.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Tabbed component:

const opTabs = document.querySelectorAll('.operations__tab');
// console.log(opTabs);
const opTabContainer = document.querySelector('.operations__tab-container');
// console.dir(opTabContainer);
const opContent = document.querySelectorAll('.operations__content');
// console.log(opContent);

// Clicking buttons - animation, clicking buttons - changing appearance of div content (adding and removing classes)
//  - не назначая обработчик на каждую кнопку - так не оч чистый код, лучше - делегированием этого события на родительский элемент.
// event delegation вместо назначения одинаковых функций каждой кнопке.

opTabContainer.addEventListener('click', function (e) {
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return; // checking if clicked is null;

  // changing classes at buttons to active (firstly remove active from all);
  opTabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //activate content area - matching button(clicked) data attribute and class of content area:

  opContent.forEach(c => {
    c.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation:

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // traversing DOM-tree to choose all of the sibling elements of "link":
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // nodeList
    const logo = link.closest('.nav').querySelector('.nav__logo');

    // change opacity of all links exept for the targeted one:
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// binding argument (opacity value) as a context to a handler function:
navBar.addEventListener('mouseover', handleHover.bind(0.5));
navBar.addEventListener('mouseout', handleHover.bind(1));

///// ---------------- //////// -----------------////////

// Practise at event bubbling and capturing to understand differences between event.target | this ( event.currentTarget)
// example: changing backgroundColor of Nav menu elements by clicking on them:

// const randomInt = function (min, max) {
//   return Math.trunc(Math.random() * max - min + 1);
// };

// const randomColor = function () {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// };

// navBar.addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('this', this);
//   console.log('e.target', e.target);
// });

// navLinks.addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('this', this);
//   console.log('e.target', e.target);
// });

// navEl.addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('this', this);
//   console.log('e.target', e.target);
// });
