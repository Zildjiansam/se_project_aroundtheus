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

/* ---------------------------- Profile Variables --------------------------- */
const profEditBtn = document.querySelector("#profile-edit-button");
const profEditModal = document.querySelector("#profile-edit-modal");
const profEditBtnClose = profEditModal.querySelector(".modal__close");
const profTitle = document.querySelector(".profile__title");
const profDesc = document.querySelector(".profile__description");
const profEditNameInput = document.querySelector("#edit_modal-input-name");
const profEditDescInput = document.querySelector("#edit-modal-input-desc");
const profEditForm = profEditModal.querySelector(".modal__form");

/* ----------------------------- Card Variables ----------------------------- */
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddBtn = document.querySelector("#card-add-button");
const cardAddModalClose = cardAddModal.querySelector(".modal__close");

/* -------------------------------------------------------------------------- */
/*                                    Loops                                   */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
  const cardElement = getCardData(cardData);
  cardListEl.prepend(cardElement);
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleProfEditSubmit(e) {
  e.preventDefault();
  profTitle.textContent = profEditNameInput.value;
  profDesc.textContent = profEditDescInput.value;
  closeModal(profEditModal);
}

function getCardData(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.setAttribute("alt", cardData.name);
  cardImageEl.setAttribute("src", cardData.link);
  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                                  Listeners                                 */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Profile Button Listeners --------------------------- */
profEditBtn.addEventListener("click", () => {
  profEditNameInput.value = profTitle.textContent;
  profEditDescInput.value = profDesc.textContent;
  openModal(profEditModal);
});
profEditBtnClose.addEventListener("click", () => closeModal(profEditModal));
profEditForm.addEventListener("submit", handleProfEditSubmit);

/* -------------------------- Card Button Listeners ------------------------- */
cardAddBtn.addEventListener("click", () => openModal(cardAddModal));
cardAddModalClose.addEventListener("click", () => closeModal(cardAddModal));
