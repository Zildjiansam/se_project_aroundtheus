export default class Card {
  constructor(cardData, cardSelector, handleImageClick, deleteCardModal, api) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._deleteCardModal = deleteCardModal;
    this.api = api;
  }

  _setEventListeners() {
    //card "like" button
    this._cardElement
      .querySelector(".card__heart-button")
      .addEventListener("click", () => this._handleLikeButton());
    //card "delete" button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._deleteCardModal.open(this));
    //prev image click
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  _handleDeleteCard() {
    this.api.deleteCard(this._cardId);
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
