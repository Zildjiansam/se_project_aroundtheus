// enabling validation by calling enableValidation()
// pass all the settings on call

function showErrorMessage(formEl, formInput, validationSettings) {
  const errorMessageEl = formEl.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(validationSettings.inputErrorClass);
  errorMessageEl.textContent = formInput.validationMessage;
  errorMessageEl.classList.add(validationSettings.errorClass);
}

function hideErrorMessage(formEl, formInput, validationSettings) {
  const errorMessageEl = formEl.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(validationSettings.inputErrorClass);
  errorMessageEl.textContent = formInput.validationMessage;
  errorMessageEl.classList.remove(validationSettings.errorClass);
}

function disableButton(buttonEl, validationSettings) {
  buttonEl.classList.add(validationSettings.inactiveButtonClass);
  buttonEl.setAttribute("disabled", "");
}

function enableButton(buttonEl, validationSettings) {
  buttonEl.classList.remove(validationSettings.inactiveButtonClass);
  buttonEl.removeAttribute("disabled");
}

// ------------------------------
function toggleButtonState(formInputs, buttonEl, validationSettings) {
  if (hasInvalidInputs(formInputs)) {
    disableButton(buttonEl, validationSettings);
  } else {
    enableButton(buttonEl, validationSettings);
  }
}

function hasInvalidInputs(formInputs) {
  return formInputs.some((formInput) => {
    return !formInput.validity.valid || !formInput.value;
  });
}
// ------------------------------

function checkInputValidity(formEl, formInput, validationSettings) {
  if (!formInput.validity.valid) {
    showErrorMessage(formEl, formInput, validationSettings);
  } else {
    hideErrorMessage(formEl, formInput, validationSettings);
  }
}

function setEventlisteners(formEl, validationSettings) {
  const formInputs = Array.from(
    formEl.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonEl = formEl.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(formInputs, buttonEl, validationSettings);
  formInputs.forEach((formInput) => {
    formInput.addEventListener("input", (evt) => {
      checkInputValidity(formEl, formInput, validationSettings);
      toggleButtonState(formInputs, buttonEl, validationSettings);
    });
  });
}

function enableValidation(validationSettings) {
  const formEls = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventlisteners(formEl, validationSettings);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_visible",
};

enableValidation(config);

//look for all inputs iside form
//loop thru inputs to check validation

//if in put is invalid
//get validation message
//disable button
//add error class to input
//display erro message

//if input is valid
//enage button
//reset error message
