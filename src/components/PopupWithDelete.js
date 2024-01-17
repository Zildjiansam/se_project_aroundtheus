import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._formElement = this._modalSelector.querySelector(".modal__form");
  }

  setSubmitAction(fn) {
    this._handleformSubmit = fn;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleformSubmit();
    });
    super.setEventListeners();
  }
}
