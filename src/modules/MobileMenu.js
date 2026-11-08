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
    if (!this.headerElement) return;
    this.navElement = this.headerElement.querySelector(this.selectors.nav);
    this.burgerButtonElement = this.headerElement.querySelector(this.selectors.burgerButton);
    if (!this.navElement || !this.burgerButtonElement) return;
    this.bindEvents();
  }

  get isMenuOpen() {
    return this.navElement.classList.contains(this.classes.isActive);
  }

  toggleMenu = () => {
    const isOpen = this.navElement.classList.toggle(this.classes.isActive);
    this.burgerButtonElement.classList.toggle(this.classes.isActive, isOpen);
    document.body.classList.toggle(this.classes.isLock, isOpen);

    this.burgerButtonElement.setAttribute(this.ariaAttributes.ariaExpanded, String(isOpen));
    this.burgerButtonElement.setAttribute(this.ariaAttributes.ariaLabel, isOpen ? 'Close menu' : 'Open menu');
  }

  onNavClick = (e) => {
    const isLinkClick = e.target.closest(this.selectors.navLink);

    if (isLinkClick && this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  onKeyDown = (e) => {
    if (e.key === 'Escape' && this.isMenuOpen) {
      this.toggleMenu();
      this.burgerButtonElement.focus();
    }
  }

  bindEvents() {
    this.burgerButtonElement.addEventListener('click', this.toggleMenu);
    this.navElement.addEventListener('click', this.onNavClick);
    document.addEventListener('keydown', this.onKeyDown);
  }
}

export default MobileMenu;