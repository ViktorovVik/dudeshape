class Favorites {
  selector = {
    likeButton: '[data-js-favorite]'
  }

  attributes = {
    ariaPressed: 'aria-pressed',
    ariaLabel: 'aria-label',
  }

  constructor() {
    this.bindEvents();
  }

  toggleFavorites = (event) => {
    const favoriteElement = event.target.closest(this.selector.likeButton);
    if (!favoriteElement) return;

    const isPressed = favoriteElement.getAttribute(this.attributes.ariaPressed) === 'true';
    const isFavorite = !isPressed;
    favoriteElement.setAttribute(this.attributes.ariaPressed, String(isFavorite));
    favoriteElement.setAttribute(this.attributes.ariaLabel, isFavorite ? 'Remove from favorite' : 'Add to favorites');
  }

  bindEvents() {
    document.addEventListener('click', this.toggleFavorites);
  }
}

export default Favorites;