const rootSelector = '[data-js-tabs]';

class Tabs {
  selectors = {
    tabsRoot: rootSelector,
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
  };

  attributes = {
    ariaSelected: 'aria-selected',
    tabindex: 'tabindex',
  };

  stateClasses = {
    isActive: 'is-active',
  };

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
    });
  }

  render() {
    this.updateTabButtonsStates();
    this.updateTabPanels();
  }

  makeActiveTab(tabIndex) {
    this.state.activeIndex = tabIndex;
    this.render();
    this.buttonElements[tabIndex].focus();
  }

  toggleTabs = (event) => {
    const currentButton = event.target.closest(this.selectors.button);
    if (!currentButton) return;

    const clickedIndex = [...this.buttonElements].indexOf(currentButton);
    this.makeActiveTab(clickedIndex);
  }

  getNextIndex() {
    let nextIndex = this.state.activeIndex + 1;

    if (nextIndex >= this.buttonElements.length) {
      nextIndex = 0;
    }

    return nextIndex;
  }

  getPreviousIndex() {
    let prevIndex = this.state.activeIndex - 1;

    if (prevIndex < 0) {
      prevIndex = this.buttonElements.length - 1;
    }

    return prevIndex;
  }

  handleKeydown = (event) => {
    const currentButton = event.target.closest(this.selectors.button);
    if (!currentButton) return;
    let newIndex;
    if (event.key === 'Home' || (event.metaKey && event.key === 'ArrowLeft')) {
      newIndex = 0;
    } else if (event.key === 'End' ||  (event.metaKey && event.key === 'ArrowRight')) {
      newIndex = this.buttonElements.length - 1;
    } else if (event.key === 'ArrowRight') {
      newIndex = this.getNextIndex();
    } else if (event.key === 'ArrowLeft') {
      newIndex = this.getPreviousIndex();
    } else {
      return;
    }
    event.preventDefault();
    this.makeActiveTab(newIndex);
  }

  destroy() {
    this.rootElement.removeEventListener('click', this.toggleTabs);
    this.rootElement.removeEventListener('keydown', this.handleKeydown);
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.toggleTabs);
    this.rootElement.addEventListener('keydown', this.handleKeydown);
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