'use strict';

let container = document.querySelector('.outer-container');
let scrollElems = container.querySelectorAll('.samples-item');
let firstScrollElems = container.querySelectorAll('.samples-item:first-child');
let tabScrollButtons = document.querySelectorAll('.sample-list-scroll-btn');
let elemScrollButtonBack = document.querySelector('.scroll__btn--left');
let elemScrollButtonForward = document.querySelector('.scroll__btn--right');

function filterIndices(search, selector) {
  if (!Array.isArray(search)) search = Array.from(search);
  return search.reduce((indices, item, index) => {
    if (item.matches(selector)) indices.push(index);
    return indices;
  }, []);
}

let firstElemNumbers = filterIndices(scrollElems, 'li:first-child');

let activeElem = {
  value: scrollElems[0],
  index: 0,
  activeClass: 'active--item',
  configureActiveElem: configureActiveObject,
};

let activeTabButton = {
  value: tabScrollButtons[0],
  index: 0,
  activeClass: 'active--btn',
  configureActiveTabButton: configureActiveObject,
};

function configureActiveObject(value, index) {
  this.value.classList.remove(this.activeClass);
  this.value = value;
  this.index = index;
  this.value.classList.add(this.activeClass);
}

function moveTo(elem) {
  elem.scrollIntoView({
    block: 'nearest',
    inline: 'center',
    behavior: 'smooth',
  });
}

tabScrollButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (activeElem.value === firstScrollElems[index]) return;
    let sequenceNumber = firstElemNumbers[index];
    if (activeTabButton.value !== button)
      activeTabButton.configureActiveTabButton(button, index);
    activeElem.configureActiveElem(scrollElems[sequenceNumber], sequenceNumber);
    moveTo(activeElem.value);
  });
});

elemScrollButtonForward.addEventListener('click', () => {
  if (activeElem.index === scrollElems.length - 1) return;
  activeElem.configureActiveElem(
    scrollElems[activeElem.index + 1],
    activeElem.index + 1
  );
  moveTo(activeElem.value);
  if (activeElem.value.matches('li:first-child')) {
    activeTabButton.configureActiveTabButton(
      tabScrollButtons[activeTabButton.index + 1],
      activeTabButton.index + 1
    );
  }
});

elemScrollButtonBack.addEventListener('click', () => {
  if (activeElem.index === 0) return;
  activeElem.configureActiveElem(
    scrollElems[activeElem.index - 1],
    activeElem.index - 1
  );
  moveTo(activeElem.value);
  if (activeElem.value.matches('li:last-child')) {
    activeTabButton.configureActiveTabButton(
      tabScrollButtons[activeTabButton.index - 1],
      activeTabButton.index - 1
    );
  }
});

let x = null;
container.addEventListener('touchstart', (evt) => {
  x = evt.touches[0].clientX;
});
container.addEventListener('touchmove', (evt) => {
  if (!x) return;
  if (x - evt.touches[0].clientX < 0) {
    if (activeElem.index === 0) return;
    activeElem.configureActiveElem(
      scrollElems[activeElem.index - 1],
      activeElem.index - 1
    );
    moveTo(activeElem.value);
    if (activeElem.value.matches('li:last-child')) {
      activeTabButton.configureActiveTabButton(
        tabScrollButtons[activeTabButton.index - 1],
        activeTabButton.index - 1
      );
    }
  } else {
    if (activeElem.index === scrollElems.length - 1) return;
    activeElem.configureActiveElem(
      scrollElems[activeElem.index + 1],
      activeElem.index + 1
    );
    moveTo(activeElem.value);
    if (activeElem.value.matches('li:first-child')) {
      activeTabButton.configureActiveTabButton(
        tabScrollButtons[activeTabButton.index + 1],
        activeTabButton.index + 1
      );
    }
  }
  x = null;
});
