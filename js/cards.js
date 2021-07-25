import gallery from '../app.js';

const galleryList = document.querySelector('.js-gallery');
const modalImg = document.querySelector('.lightbox__image');
const modal = document.querySelector('.lightbox');
const button = document.querySelector('.lightbox__button');

const markup = gallery
  .map(
    ({ preview, original, description }, index) =>
      `<li class="gallery__item">
      <a class="gallery__link" href=''>
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}"/> </a> </li>`,
  )
  .join('');

galleryList.innerHTML = markup;

const onOpenModalClick = e => {
  e.preventDefault();

  if (e.target.localName === 'img') {
    modalImg.src = e.target.dataset.source;
    modalImg.alt = e.target.alt;
    modalImg.dataset.index = e.target.dataset.index;

    modal.classList.add('is-open');
  }
};

const onKeyboardClick = e => {
  if (e.key === 'Escape') {
    modal.classList.remove('is-open');
  }
};

const onCloseModalClick = e => {
  if (e.target.localName !== 'img') {
    modal.classList.remove('is-open');

    modalImg.src = '';
    modalImg.alt = '';
  }
};

galleryList.addEventListener('click', onOpenModalClick);
window.addEventListener('keyup', onKeyboardClick);
window.addEventListener('click', onCloseModalClick);

window.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') {
    onArrowLeft();
  }
  if (e.code === 'ArrowRight') {
    onArrowRight();
  }
});

function onArrowLeft() {
  let index = +modalImg.dataset.index;
  if (index === 0) {
    newSrc(gallery.length - 1);
    return;
  }
  newSrc(index, -1);
}
function onArrowRight() {
  let index = +modalImg.dataset.index;
  if (index === gallery.length - 1) {
    newSrc(0);
    return;
  }
  newSrc(index, 1);
}

function newSrc(index, step = 0) {
  modalImg.dataset.index = `${index + step}`;
  modalImg.src = gallery[index + step].original;
}