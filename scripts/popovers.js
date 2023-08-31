'use strict';

let page = document.documentElement;
let popoverButtons = document.querySelectorAll('.wood-description__link');
let mask = document.querySelector('.popovers-mask');
let popovers = document.querySelectorAll('.popover-content-wrapper');
let closeButtons = document.querySelectorAll('.button-closed');

popoverButtons.forEach((button, index) => {
    button.addEventListener('click', evt => {
        evt.preventDefault();
        page.classList.add('overflow--hidden');
        mask.removeAttribute('hidden');
        popovers[index].removeAttribute('hidden');
    })
})

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        page.classList.remove('overflow--hidden');
        mask.setAttribute('hidden', true);
        button.parentElement.setAttribute('hidden', true);
    })
})


