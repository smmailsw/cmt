'use strict';

let buttonUp = document.querySelector('.button-up');

window.addEventListener('scroll', function () {
    if (this.window.scrollY >= 400) {
        buttonUp.classList.add('button-up--showed');
    }  else {
        buttonUp.classList.remove('button-up--showed');
    }
});

buttonUp.addEventListener('click', function () {
    window.scrollTo(0, 0);
});