export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //card "like" button
    this._cardElement
      .querySelector(".card__heart-button")
      .addEventListener("click", () => this._handleLikeButton());
    //card "delete" button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());
    //prev image click
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__heart-button")
      .classList.toggle("card__heart-button_active");
  }

  getCardEl() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");

    cardTitleEl.textContent = this._name;
    cardImageEl.setAttribute("alt", this._name);
    cardImageEl.setAttribute("src", this._link);
    this._setEventListeners();

    return this._cardElement;
  }
}
