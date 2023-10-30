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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
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

//const modalCont = document.querySelector(".modal__container");

/* -------------------------------------------------------------------------- */
/*                                    Loops                                   */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", handleEsc);
  modal.addEventListener("mousedown", handleCloseModalOnRemoteClick);
  modal.addEventListener("mousedown", handleModalCloseButton);
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", handleEsc);
  modal.removeEventListener("mousedown", handleCloseModalOnRemoteClick);
  modal.removeEventListener("mousedown", handleModalCloseButton);
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal__opened");
    closeModal(modal);
  }
}

function handleModalCloseButton(evt) {
  if (evt.target.classList.contains("modal__close")) {
    const modal = evt.target.closest(".modal");
    closeModal(modal);
  }
}

function handleCloseModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.target);
  }
}

function handleProfEditSubmit(e) {
  e.preventDefault();
  profTitle.textContent = profEditNameInput.value;
  profDesc.textContent = profEditDescInput.value;
  closeModal(profEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardAddTitleInput.value;
  const link = cardAddUrlInput.value;
  renderCard({ name, link }, cardListEl);
  e.target.reset();
  closeModal(cardAddModal);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__heart-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__heart-button_active")
  );

  deleteButton.addEventListener("click", () => cardElement.remove());

  cardImageEl.addEventListener("click", () => {
    imagePrevModalImage.setAttribute("src", cardData.link);
    imagePrevModalImage.setAttribute("alt", cardData.name);
    imagePrevModalImageCaption.textContent = cardData.name;
    openModal(imagePrevModal);
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.setAttribute("alt", cardData.name);
  cardImageEl.setAttribute("src", cardData.link);

  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                                  Listeners                                 */
/* -------------------------------------------------------------------------- */

// profEditModal.addEventListener("mousedown", handleModalCloseButton);

// cardAddModal.addEventListener("mousedown", handleModalCloseButton);

// imagePrevModal.addEventListener("mousedown", handleModalCloseButton);

// profEditModal.addEventListener("mousedown", (evt) => {
//   if (
// evt.target.classList.contains("modal") ||
//     evt.target.classList.contains("modal__close")
//   ) {
//     closeModal(profEditModal);
//   }
// });

// cardAddModal.addEventListener("mousedown", (evt) => {
//   if (
//     evt.target.classList.contains("modal") ||
//     evt.target.classList.contains("modal__close")
//   ) {
//     closeModal(cardAddModal);
//   }
// });

// imagePrevModal.addEventListener("mousedown", (evt) => {
//   if (
//     evt.target.classList.contains("modal") ||
//     evt.target.classList.contains("modal__close")
//   ) {
//     closeModal(imagePrevModal);
//   }
// });

profEditBtn.addEventListener("click", () => {
  profEditNameInput.value = profTitle.textContent;
  profEditDescInput.value = profDesc.textContent;
  openModal(profEditModal);
});
profEditForm.addEventListener("submit", handleProfEditSubmit);

/* -------------------------- Card Button Listeners ------------------------- */
cardAddBtn.addEventListener("click", () => openModal(cardAddModal));

cardAddForm.addEventListener("submit", handleAddCardSubmit);
