import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._formElement = this._modalElement.querySelector(".modal__form");
    this._submitBtn = this._modalElement.querySelector(".modal__button");
    this._submitBtnText = this._submitBtn.textContent;
  }

  setSubmitAction(fn) {
    this._handleformSubmit = fn;
  }

  showLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleformSubmit();
    });
    super.setEventListeners();
  }
}
