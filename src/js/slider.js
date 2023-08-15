import {IMAGE_PREFIX_URL, IMAGE_URL} from "./api-const.js";
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const initSlider = () => {
  const loaderEl = document.querySelector('.js-loader');

  fetch(IMAGE_URL)
    .then(response => response.json())
    .then(result => {
      makeSlider(result);
    })
    .catch(error => {
      // тут можно закастомить и показывать текст "Кажется у Вас проблемы с интернетом" и  ошибку с кнопкой "Обновить", делая новый запрос
      console.log(error)
    })
    .finally((result) => {
      loaderEl.classList.add('hidden');
    })
}

function makeSlider(data) {
  // вставляем "скелет" для свайпера
  document.querySelector('.js-slider').innerHTML = `
    <div class="slider__swiper swiper">
      <div class="swiper-wrapper">
      </div>
        <div class="slider__arrow slider__arrow--prev swiper-button-prev">
          <img src="./images/icons/arrow-left.svg" alt="prev slide"/>
        </div>
        <div class="slider__arrow slider__arrow--next swiper-button-next">
          <img src="./images/icons/arrow-right.svg" alt="next slide"/>
        </div>
    </div>
    <div class="slider__pagination"></div>
`

  const slider = document.querySelector('.swiper');
  const sliderWrapper = slider.querySelector('.swiper-wrapper');
  const sliderArrowPrev = slider.querySelector('.slider__arrow--prev');
  const sliderArrowNext = slider.querySelector('.slider__arrow--next');
  const sliderPagination = document.querySelector('.slider .slider__pagination');

  // проходимся циклом по всем элементам из запроса и формируем слайды
  data.forEach((item, index) => {
    const slide = document.createElement('div');
    slide.classList.add('slider__item', 'swiper-slide');

    const slideLink = document.createElement('a');
    slideLink.href = item.Href;
    slideLink.classList.add('slider__link');

    // по-хорошему делать слайды с картинками через тег picture, имея картинки для разных разрешений,
    // но так как она только одна для каждого слайда, то отталкиваемся от этого
    const slideImg = document.createElement('img');
    slideImg.src = `${IMAGE_PREFIX_URL}${item.Src}`;
    slideImg.alt = '';

    slideLink.appendChild(slideImg)
    slide.appendChild(slideLink);
    sliderWrapper.appendChild(slide)
  })

  // иницилизируем swiper
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, Autoplay],
    pagination: {
      el: sliderPagination,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: sliderArrowNext,
      prevEl: sliderArrowPrev,
    },
  })

  // profit
}
