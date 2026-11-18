const rootSelector = '[data-js-furniture]';

class Furniture {
  selectors = {
    furnitureRoot: rootSelector,
    img: '[data-js-furniture-img]',
    category: '[data-js-furniture-category]',
  }

  attributes = {
    ariaPressed: 'aria-pressed',
  }

  stateClasses = {
    isAppearing: 'is-appearing',
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
    this.render();
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

  updateButtons() {
    this.categoryElements.forEach((button) => {
      const buttonCategory = button.dataset.jsFurnitureCategory;

      const isChosen = buttonCategory === this.state.category;
      button.setAttribute(this.attributes.ariaPressed, String(isChosen));
    })
  }

  updateImage() {
    if (!this.furnitureData) return;
    const furnitureItem = this.furnitureData.find((furniture) => furniture.category === this.state.category);
    if (!furnitureItem) return;

    this.imgElement.src = furnitureItem.src;
    this.imgElement.alt = furnitureItem.alt;
    this.imgElement.classList.add(this.stateClasses.isAppearing);
  }

  handleImageAnimationEnd = () => {
    this.imgElement.classList.remove(this.stateClasses.isAppearing);

  }

  render() {
    this.updateImage();
    this.updateButtons();
  }

  destroy() {
    this.rootElement.removeEventListener('click', this.handleCategoryClick);
    this.imgElement.removeEventListener('animationend', this.handleImageAnimationEnd);
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.handleCategoryClick);
    this.imgElement.addEventListener('animationend', this.handleImageAnimationEnd);
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

  destroy() {
    this.instance.forEach((instance) => {instance.destroy()});
    this.instance = [];
  }
}

