class Favorites {
  selector = {
    likeButton: '[data-js-favorite]',
    card: '[data-js-card-id]'
  }

  attributes = {
    ariaPressed: 'aria-pressed',
    ariaLabel: 'aria-label',
  }

  localStorageKey = 'dudeshape:favorite';


  constructor() {
    this.state = {
      items: this.getFavorites()
    }
    this.bindEvents();
  }

  getFavorites() {
    try {
      const rawData = localStorage.getItem(this.localStorageKey);
      if (!rawData) return [];
      const parsedData = JSON.parse(rawData);

      return Array.isArray(parsedData) ? parsedData : [];
    } catch {
      console.error('Failed to get favorites from localStorage');

      return [];
    }
  }

  setFavorites(favorites) {
    this.state.items = favorites;

    try {
      const data = JSON.stringify(favorites);
      localStorage.setItem(this.localStorageKey, data);
    } catch {
      console.error('Failed to set favorites to localStorage');
    }
  }

  toggleFavorites = (event) => {
    const favoriteElement = event.target.closest(this.selector.likeButton);
    if (!favoriteElement) return;

    const cardElement = event.target.closest(this.selector.card);
    if (!cardElement) return;
    const dataId = cardElement.dataset.jsCardId;

    const isPressed = favoriteElement.getAttribute(this.attributes.ariaPressed) === 'true';
    const isFavorite = !isPressed;
    favoriteElement.setAttribute(this.attributes.ariaPressed, String(isFavorite));
    favoriteElement.setAttribute(this.attributes.ariaLabel, isFavorite ? 'Remove from favorites' : 'Add to favorites');

    let nextFavoriteStateList;

    if (isFavorite) {
      nextFavoriteStateList = [...this.state.items, dataId];
    } else {
      nextFavoriteStateList = this.state.items.filter((id) => dataId !== id);
    }

    this.setFavorites(nextFavoriteStateList);
  }

  bindEvents() {
    document.addEventListener('click', this.toggleFavorites);
  }
}

export default Favorites;