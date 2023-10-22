// enabling validation by calling enableValidation()
// pass all the settings on call

function showErrorMessage(modalForm, modalInput, object) {
  const errorMessageEl = modalForm.querySelector(`#${modalInput.id}-error`);
  modalInput.classList.add(object.inputErrorClass);
  errorMessageEl.textContent = modalInput.validationMessage;
  errorMessageEl.classList.add(object.errorClass);
}

function hideErrorMessage(modalForm, modalInput, object) {
  const errorMessageEl = modalForm.querySelector(`#${modalInput.id}-error`);
  modalInput.classList.remove(object.inputErrorClass);
  errorMessageEl.textContent = modalInput.validationMessage;
  errorMessageEl.classList.remove(object.errorClass);
}

// ------------------------------
function toggleButtonState(modalInputs, buttonEl) {
  if (hasInvalidInputs(modalInputs)) {
    buttonEl.classList.add("modal__button_disabled");
  } else {
    buttonEl.classList.remove("modal__button_disabled");
  }
}

function hasInvalidInputs(modalInputs) {
  return modalInputs.some((modalInput) => {
    return !modalInput.validity.valid;
  });
}
// ------------------------------

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
  const buttonEl = document.querySelector(".modal__button");
  toggleButtonState(modalInputs, buttonEl);
  modalInputs.forEach((modalInput) => {
    modalInput.addEventListener("input", (evt) => {
      checkInputValidity(modalForm, modalInput, object);
      toggleButtonState(modalInputs, buttonEl);
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
