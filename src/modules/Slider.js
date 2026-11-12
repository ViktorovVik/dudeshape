import Swiper from "swiper";
import { Navigation } from "swiper/modules";


const rootSelector = '[data-js-slider]';

class Slider {

  selectors = {
    swiperRoot: '[data-js-swiper]',
    prevButton: '[data-js-swiper-button-prev]',
    nextButton: '[data-js-swiper-button-next]',
  }

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.swiperElement = this.rootElement.querySelector(this.selectors.swiperRoot);
    if (!this.swiperElement) return;
    this.prevButtonElement = this.rootElement.querySelector(this.selectors.prevButton);
    this.nextButtonElement = this.rootElement.querySelector(this.selectors.nextButton);
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper(this.swiperElement, {
      modules: [Navigation],
      slidesPerView: 1.5,
      spaceBetween: 15,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      },
      navigation: {
        prevEl: this.prevButtonElement,
        nextEl: this.nextButtonElement,
      },
      grabCursor: true,
    });
  }

  destroy() {
    this.swiper?.destroy(true, true);
    this.swiper = null;
  }
}

export class SliderCollection {
  constructor() {
    this.instances = [];
    this.init();
  }

  init() {
    const elements = document.querySelectorAll(rootSelector);
    this.instances = [...elements].map((element) => new Slider(element));
  }

  destroy() {
    this.instances.forEach((instance) => instance.destroy());
    this.instances = [];
  }
}