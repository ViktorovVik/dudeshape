class Favorites {
  selectors = {
    likeButton: '[data-js-favorite]',
    card: '[data-js-card-id]',
    counterNum: '[data-js-counter-number]',
  };

  attributes = {
    ariaPressed: 'aria-pressed',
    ariaLabel: 'aria-label',
  };

  localStorageKey = 'dudeshape:favorite';

  constructor() {
    this.counterNumElement = document.querySelector(this.selectors.counterNum);
    this.state = {
      items: this.getFavorites(),
    };
    this.updateButtons();
    this.updateCounter();
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

  updateCounter() {
    if (!this.counterNumElement) return;

    const amount = this.state.items.length;

    if (amount === 0) {
      this.counterNumElement.textContent = '';
    } else {
      this.counterNumElement.textContent = String(amount);
    }
  }

  updateState(favoriteElement, isFavorite) {
    favoriteElement.setAttribute(this.attributes.ariaPressed, String(isFavorite));
    favoriteElement.setAttribute(this.attributes.ariaLabel, isFavorite ? 'Remove from favorites' : 'Add to favorites');
  }

  toggleFavorites = (event) => {
    const favoriteElement = event.target.closest(this.selectors.likeButton);
    if (!favoriteElement) return;

    const cardElement = event.target.closest(this.selectors.card);
    if (!cardElement) return;
    const dataId = cardElement.dataset.jsCardId;

    const isFavoriteNow = this.state.items.includes(dataId);
    const willBeFavorite = !isFavoriteNow;

    let nextFavorites;

    if (willBeFavorite) {
      nextFavorites = [...this.state.items, dataId];
    } else {
      nextFavorites = this.state.items.filter((id) => dataId !== id);
    }

    this.setFavorites(nextFavorites);
    this.updateButtons();
    this.updateCounter();
  }

  updateButtons() {
    const cardElements = document.querySelectorAll(this.selectors.card);
    cardElements.forEach((cardElement) => {
      const cardDataId = cardElement.dataset.jsCardId;
      const isFavorite = this.state.items.includes(cardDataId);
      const favoriteButton = cardElement.querySelector(this.selectors.likeButton);
      if (!favoriteButton) return;
      this.updateState(favoriteButton, isFavorite);
    });
  }

  bindEvents() {
    document.addEventListener('click', this.toggleFavorites);
  }
}

export default Favorites;