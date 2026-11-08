class MobileMenu {
  selectors = {
    header: '[data-js-header]',
    nav: '[data-js-nav-menu]',
    burgerButton: '[data-js-burger-button]',
    navLink: '[data-js-nav-link]',
  }

  ariaAttributes = {
    ariaExpanded: 'aria-expanded',
    ariaLabel: 'aria-label',
  }

  classes = {
    isActive: 'is-active',
    isLock: 'is-lock',
  }

  constructor() {
    this.headerElement = document.querySelector(this.selectors.header);
    this.navElement = this.headerElement.querySelector(this.selectors.nav);
    this.burgerButtonElement = this.headerElement.querySelector(this.selectors.burgerButton);
    this.bindEvents();
  }

  toggleMenu = () => {
    const isOpen = this.navElement.classList.toggle(this.classes.isActive);
    this.burgerButtonElement.classList.toggle(this.classes.isActive, isOpen);
    document.body.classList.toggle(this.classes.isLock, isOpen);

    this.burgerButtonElement.setAttribute(this.ariaAttributes.ariaExpanded, isOpen);
    this.burgerButtonElement.setAttribute(this.ariaAttributes.ariaLabel, isOpen ? 'Close menu' : 'Open menu');
  }

  onNavClick = (e) => {
    const isLinkClick = e.target.closest(this.selectors.navLink);
    const isMEnuOpen = this.navElement.classList.contains(this.classes.isActive);

    if (isLinkClick && isMEnuOpen) {
      this.toggleMenu();
    }
  }

  bindEvents() {
    this.burgerButtonElement.addEventListener('click', this.toggleMenu);
    this.navElement.addEventListener('click', this.onNavClick);
  }
}

export default MobileMenu;