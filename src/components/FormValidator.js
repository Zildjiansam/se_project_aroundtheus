export class FormValidator {
  constructor(validationSettings, formEl) {
    this._formEl = formEl;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;

    this._formInputs = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._buttonEl = this._formEl.querySelector(this._submitButtonSelector);
  }

  _showErrorMessage(formInput) {
    const errorMessageEl = this._formEl.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = formInput.validationMessage;
    errorMessageEl.classList.add(this.errorClass);
  }

  _hideErrorMessage(formInput) {
    const errorMessageEl = this._formEl.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _disableButton() {
    this._buttonEl.classList.add(this._inactiveButtonClass);
    this._buttonEl.setAttribute("disabled", "");
  }

  _enableButton() {
    this._buttonEl.classList.remove(this._inactiveButtonClass);
    this._buttonEl.removeAttribute("disabled");
  }

  _hasInvalidInputs() {
    return this._formInputs.some((formInput) => {
      return !formInput.validity.valid || !formInput.value;
    });
  }

  _checkInputValidity(formInput) {
    if (!formInput.validity.valid) {
      this._showErrorMessage(formInput);
    } else {
      this._hideErrorMessage(formInput);
    }
  }

  resetModalValidity() {
    this._disableButton();
    this._formInputs.forEach((formInput) => {
      this._hideErrorMessage(formInput);
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInputs(this._formInputs)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._formInputs.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        this._checkInputValidity(formInput);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_visible",
};
