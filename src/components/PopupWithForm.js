import Popup from "./Popup.js";
const cl = console.log.bind(console);

export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtn = document.querySelectorAll(".modal__button");
    this._formInputs = this._modalElement.querySelectorAll(".modal__input");
    this._formElement = this._modalElement.querySelector(".modal__form");
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

  loadingNotification(isLoading, loadingText = "Saving...") {
    cl(isLoading);
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
