import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = this._modalElement.querySelectorAll(".modal_input");
    this._formElement = this._modalElement.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputValues = {};
    this._formInputs.forEach((input) => {
      inputs[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      this._handleFormSubmit(e);
    });
    super.setEventListeners();
  }
}
