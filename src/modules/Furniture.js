const rootSelector = '[data-js-furniture]';

class Furniture {
  selectors = {
    furnitureRoot: rootSelector,
    img: '[data-js-furniture-img]',
    category: '[data-js-furniture-category]',
  }

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.imgElement = this.rootElement.querySelector(this.selectors.img);
    this.categoryElements = this.rootElement.querySelectorAll(this.selectors.category);
    this.state = {
      category: 'office',
    }
    this.getFurniture();
    this.bindEvents();
  }

  async getFurniture() {
    const URL = './data/furniture.json';

    const response = await fetch(URL);
    if (!response.ok) return;

    this.furnitureData = await response.json();
  }

  handleCategoryClick = (event) => {
    const currentButton = event.target.closest(this.selectors.category);
    if (!currentButton) return;

    this.state.category = currentButton.dataset.jsFurnitureCategory;
    this.render();
  }

  render() {
    const furnitureItem = this.furnitureData.find((furniture) => furniture.category === this.state.category);

    this.imgElement.src = furnitureItem.src;
    this.imgElement.alt = furnitureItem.alt;
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.handleCategoryClick);
  }
}

export class FurnitureCollection {
  constructor() {
    this.instance = [];
    this.init();
  }

  init() {
    const elements = document.querySelectorAll(rootSelector);
    this.instance = [...elements].map((element) => new Furniture(element));
  }
}

