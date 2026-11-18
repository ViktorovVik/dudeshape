import * as storage from "../utils/storage";

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
    const data = storage.get(this.localStorageKey, []);
    return Array.isArray(data) ? data : [];
  }

  setFavorites(favorites) {
    this.state.items = favorites;

    storage.set(this.localStorageKey, favorites);
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