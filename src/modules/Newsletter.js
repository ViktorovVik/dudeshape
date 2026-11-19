const rootSelector = '[data-js-newsletter]';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Newsletter {
  selectors = {
    formRoot: rootSelector,
    button: '[data-js-newsletter-button]',
    message: '[data-js-newsletter-message]',
    toast: '[data-js-newsletter-toast]',
    closeButton: '[data-js-newsletter-close]',
  };

  messages = {
    success: 'Thanks for subscribing! Check your inbox soon.',
    error: 'Something went wrong. Please try again.',
  };

  buttonLabels = {
    sending: 'Sending...',
    idle: 'Subscribe',
  };

  stateClasses = {
    isVisible: 'is-visible',
  }

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttonElement = this.rootElement.querySelector(this.selectors.button);
    this.messageElement = this.rootElement.querySelector(this.selectors.message);
    this.toastElement = this.rootElement.querySelector(this.selectors.toast);
    this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton);
    this.state = {
      status: 'idle'
    }
    this.bindEvents();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.state.status = 'sending';
    this.render();
    await wait(1500);
    const isResolved = Math.random() > 0.3;
    this.state.status = isResolved ? 'success' : 'error';
    this.render();
    if (isResolved) {
      this.rootElement.reset();
    }
    await wait(4000);
    this.state.status = 'idle';
    this.render();
  }

  handleCloseClick = () => {
    this.state.status = 'idle';
    this.render();
  }

  render() {
    const isSending = this.state.status === 'sending';
    this.buttonElement.disabled = isSending;
    this.buttonElement.textContent = isSending ? this.buttonLabels.sending : this.buttonLabels.idle;
    const isVisible = this.state.status === 'success' || this.state.status === 'error';
    if (isVisible) {
      this.messageElement.textContent = this.messages[this.state.status];
    }
    this.toastElement.classList.toggle(this.stateClasses.isVisible, isVisible);
  }

  bindEvents() {
    this.rootElement.addEventListener('submit', this.handleSubmit);
    this.closeButtonElement.addEventListener('click', this.handleCloseClick);
  }
}

export class NewsletterCollection {
  constructor() {
    this.instance = [];
    this.init();
  }

  init() {
    const elements = document.querySelectorAll(rootSelector);
    this.instance = [...elements].map((element) => new Newsletter(element));
  }
}