// enabling validation by calling enableValidation()
// pass all the settings on call

function showErrorMesssage(
  modalForm,
  modalInput,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = modalForm.querySelector(`#${modalInput}-error`);
  modalInput.classList.add(inputErrorClass);
  errorMessageEl.textContent = modalInput.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function checkInputValidity(modalForm, modalInput, object) {
  if (!modalInput.validity.valid) {
    showErrorMessage(modalForm, modalInput, object);
  } else {
    hideErrorMessage(modalForm, modalInput, object);
  }
}

function setEventlisteners(modalForm, object) {
  const modalInputs = Array.from(
    modalForm.querySelectorAll(object.inputSelector)
  );
  modalInputs.forEach((modalInput) => {
    modalInput.addEventListener("input", (evt) => {
      checkInputValidity(modalForm, modalInput, object);
    });
  });
}

function enableValidation(object) {
  const modalForms = Array.from(document.querySelectorAll(object.formSelector));
  modalForms.forEach((modalForm) => {
    modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventlisteners(modalForm, object);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
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
