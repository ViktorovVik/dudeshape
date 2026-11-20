const rootSelector = '[data-js-footer-accordion]'

class FooterAccordion {
  selectors = {
    accordionRoot: rootSelector,
    summary: '[data-js-footer-accordion-summary]',
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.mobileQuery = window.matchMedia('(width <= 767px)');
    this.summaryElement = this.rootElement.querySelector(this.selectors.summary);
    this.updateOpenState();
    this.bindEvents();
  }

  updateOpenState = () => {
    this.rootElement.open = !this.mobileQuery.matches;
  }

  handleSummaryClick = (event) => {
    if (!this.mobileQuery.matches) {
      event.preventDefault();
    }
  }

  destroy() {
    this.mobileQuery.removeEventListener('change', this.updateOpenState);
    this.summaryElement.removeEventListener('click', this.handleSummaryClick);
  }

  bindEvents() {
    this.mobileQuery.addEventListener('change', this.updateOpenState);
    this.summaryElement.addEventListener('click', this.handleSummaryClick);
  }
}

export class FooterAccordionCollection {
  constructor() {
    this.instance = [];
    this.init();
  }

  init() {
    const elements = document.querySelectorAll(rootSelector);
    this.instance = [...elements].map((element) => new FooterAccordion(element));
  }

  destroy() {
    this.instance.forEach((element) => element.destroy());
    this.instance = [];
  }
}