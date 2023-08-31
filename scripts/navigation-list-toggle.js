'use strict';

let navList = document.querySelector('.navigation__list');
let navListToggler = document.querySelector('.navigation__button-toggle');

navListToggler.addEventListener('click', () => {
  navList.classList.toggle('navigation__list--showed');
  navListToggler.classList.toggle('toggler--off');
  navListToggler.classList.toggle('toggler--on');
});
