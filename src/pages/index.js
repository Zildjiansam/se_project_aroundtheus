import Section from "../components/Section.js";
import { initialCards } from "../utils/constants.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import { FormValidator, config } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */

const profEditBtn = document.querySelector("#profile-edit-button");
const profEditModal = document.querySelector("#profile-edit-modal");
const profTitle = document.querySelector(".profile__title");
const profDesc = document.querySelector(".profile__description");
const profEditNameInput = document.querySelector("#edit_modal-input-name");
const profEditDescInput = document.querySelector("#edit-modal-input-desc");
const profEditForm = profEditModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddBtn = document.querySelector("#card-add-button");
const cardAddForm = cardAddModal.querySelector(".modal__form");

/* -------------------------------------------------------------------------- */
/*                                    Loops & Class Instances                 */
/* -------------------------------------------------------------------------- */
const userInfo = new UserInfo(profTitle, profDesc);

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      section.addItem(cardElement);
    },
  },
  cardListEl
);

const editProfModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfEditSubmit
);

const addCardModal = new PopupWithForm("#card-add-modal", handleAddCardSubmit);

const prevImageModal = new PopupWithImage("#image-preview-modal");

const editFormValidator = new FormValidator(config, profEditForm);

const addFormValidator = new FormValidator(config, cardAddForm);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function handleImageClick(cardData) {
  prevImageModal.open(cardData);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getCardEl();
}

function handleProfEditSubmit(profileData) {
  // e.preventDefault();
  userInfo.setUserInfo(profileData.title, profileData.description);
  editProfModal.close();
}

function handleAddCardSubmit(inputValues) {
  // e.preventDefault();
  const { title, url } = inputValues;
  const card = renderCard({ name: title, link: url });
  section.addItem(card);
  addCardModal.close();
}

/* -------------------------------------------------------------------------- */
/*                               Function Calls                               */
/* -------------------------------------------------------------------------- */

editFormValidator.enableValidation();

addFormValidator.enableValidation();

section.renderItems();

editProfModal.setEventListeners();

addCardModal.setEventListeners();

prevImageModal.setEventListeners();

/* -------------------------- Profile Button Listeners ------------------------- */

profEditBtn.addEventListener("click", () => {
  const { profileName, description } = userInfo.getUserInfo();
  profEditNameInput.value = profileName;
  profEditDescInput.value = description;
  editFormValidator.resetModalValidity();
  editProfModal.open();
});

/* -------------------------- Card Button Listeners ------------------------- */
cardAddBtn.addEventListener("click", () => {
  addFormValidator.resetModalValidity();
  addCardModal.open();
});
