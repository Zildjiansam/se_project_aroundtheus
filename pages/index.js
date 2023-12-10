import Section from "../components/Section.js";
import { initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import { FormValidator, config } from "../components/FormValidator.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */

const profEditBtn = document.querySelector("#profile-edit-button");
const profEditModal = document.querySelector("#profile-edit-modal");
const profEditBtnClose = profEditModal.querySelector(".modal__close");
const profTitle = document.querySelector(".profile__title");
const profDesc = document.querySelector(".profile__description");
const profEditNameInput = document.querySelector("#edit_modal-input-name");
const profEditDescInput = document.querySelector("#edit-modal-input-desc");
const profEditForm = profEditModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddBtn = document.querySelector("#card-add-button");
const cardAddModalClose = cardAddModal.querySelector(".modal__close");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const cardAddTitleInput = document.querySelector("#add-modal-input-title");
const cardAddUrlInput = document.querySelector("#add-modal-input-url");

const imagePrevModal = document.querySelector("#image-preview-modal");
const imagePrevModalClose = imagePrevModal.querySelector(".modal__close");
const imagePrevModalContainer =
  imagePrevModal.querySelector(".modal__container");
const imagePrevModalImage = imagePrevModal.querySelector(".modal__prev-image");
const imagePrevModalImageCaption = imagePrevModal.querySelector(
  ".modal__preview-image-caption"
);

/* -------------------------------------------------------------------------- */
/*                                    Loops & Class Instances                 */
/* -------------------------------------------------------------------------- */

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      const cardElement = card.getCardEl();
      section.addItem(cardElement);
    },
  },
  cardListEl
);

const editFormValidator = new FormValidator(config, profEditForm);

const addFormValidator = new FormValidator(config, cardAddForm);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", handleEsc);
  modal.addEventListener("mousedown", handleCloseModalOnRemoteClick);
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", handleEsc);
  modal.removeEventListener("mousedown", handleCloseModalOnRemoteClick);
}

function handleImageClick(cardData) {
  imagePrevModalImage.setAttribute("src", cardData._link);
  imagePrevModalImage.setAttribute("alt", cardData._name);
  imagePrevModalImageCaption.textContent = cardData._name;
  cardData._popup.open();
  openModal(imagePrevModal);
}

// function handleEsc(evt) {
//   if (evt.key === "Escape") {
//     const modal = document.querySelector(".modal__opened");
//     closeModal(modal);
//   }
// }

function handleCloseModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

function handleProfEditSubmit(e) {
  e.preventDefault();
  profTitle.textContent = profEditNameInput.value;
  profDesc.textContent = profEditDescInput.value;
  editFormValidator.toggleButtonState();
  closeModal(profEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardAddTitleInput.value;
  const link = cardAddUrlInput.value;
  renderCard({ name, link }, cardListEl);
  cardAddForm.reset();
  addFormValidator.toggleButtonState();
  closeModal(cardAddModal);
}

/* -------------------------------------------------------------------------- */
/*                               Function Calls                               */
/* -------------------------------------------------------------------------- */

editFormValidator.enableValidation();

addFormValidator.enableValidation();

section.renderItems();

/* -------------------------- Profile Button Listeners ------------------------- */

profEditBtn.addEventListener("click", () => {
  profEditNameInput.value = profTitle.textContent;
  profEditDescInput.value = profDesc.textContent;
  editFormValidator.resetModalValidity();
  openModal(profEditModal);
});
profEditForm.addEventListener("submit", handleProfEditSubmit);

/* -------------------------- Card Button Listeners ------------------------- */
cardAddBtn.addEventListener("click", () => {
  addFormValidator.resetModalValidity();
  openModal(cardAddModal);
});

cardAddForm.addEventListener("submit", handleAddCardSubmit);
