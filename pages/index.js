import Card from "../components/Card.js";
import { FormValidator, config } from "../components/FormValidator.js";

/* -------------------------------------------------------------------------- */
/*                                   Arrays                                   */
/* -------------------------------------------------------------------------- */

const initialCards = [
  {
    name: "NEOM Nature Reserve, Saudi Arabia",
    link: "https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    name: "Aragnouet, France",
    link: "https://images.unsplash.com/photo-1693333494237-f16ec989d14d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    name: "Stari Grad, Croatia",
    link: "https://images.unsplash.com/photo-1693035647252-8ee896fb754a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3532&q=80",
  },
  {
    name: "Toronto, ON, Canada",
    link: "https://images.unsplash.com/photo-1693126400167-704cbf4a3f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3536&q=80",
  },
  {
    name: "Hanoi, Vietnam",
    link: "https://images.unsplash.com/photo-1692872031707-4214d2f62adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3264&q=80",
  },
  {
    name: "Alpae di Siusi, Italia",
    link: "https://images.unsplash.com/photo-1693137161234-c00bc97fe482?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3448&q=80",
  },
];

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
/*                                    Loops & Instances                                */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

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
  openModal(imagePrevModal);
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal__opened");
    closeModal(modal);
  }
}

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

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  wrapper.prepend(card.getCardEl());
}

editFormValidator.enableValidation();

addFormValidator.enableValidation();

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
