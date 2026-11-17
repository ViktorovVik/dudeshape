const rootSelector = '[data-js-tabs]';

class Tabs {
  selectors = {
    tabsRoot: rootSelector,
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
  }

  attributes = {
    ariaSelected: 'aria-selected',
    tabindex: 'tabindex'
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
    this.state = {
      activeIndex: 0,
    };
    this.render();
    this.bindEvents();
  }

  updateTabButtonsStates() {
    this.buttonElements.forEach((button, index) => {
      const isSelected = index === this.state.activeIndex;
      if (isSelected) {
        button.removeAttribute(this.attributes.tabindex);
      } else {
        button.setAttribute(this.attributes.tabindex, '-1');
      }
      button.setAttribute(this.attributes.ariaSelected, String(isSelected));
    });
  }

  updateTabPanels() {
    this.contentElements.forEach((contentElement, index) => {
      const isShown = index === this.state.activeIndex;
      contentElement.classList.toggle(this.stateClasses.isActive, isShown);
    })
  }

  render() {
    this.updateTabButtonsStates();
    this.updateTabPanels();
  }

  toggleTabs = (event) => {
    const currentButton = event.target.closest(this.selectors.button);
    if (!currentButton) return;

    this.state.activeIndex = [...this.buttonElements].indexOf(currentButton);
    this.render();
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.toggleTabs);
  }
}

export class TabsCollection {
  constructor() {
    this.instance = [];
    this.init();
  }

  init() {
    const elements = document.querySelectorAll(rootSelector);
    this.instance = [...elements].map((element) => new Tabs(element));
  }

  destroy() {
    this.instance.forEach((tab) => tab.destroy());
    this.instance = [];
  }
}