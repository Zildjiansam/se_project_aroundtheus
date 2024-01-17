import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = this._modalSelector.querySelectorAll(".modal__input");
    this._formElement = this._modalSelector.querySelector(".modal__form");
    this._submitBtn = this._modalSelector.querySelector(".modal__button");
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  showLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
