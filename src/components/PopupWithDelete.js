import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._formElement = this._modalElement.querySelector(".modal__form");
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.card._handleDeleteCard();
      this.close();
    });
    super.setEventListeners();
  }
}
