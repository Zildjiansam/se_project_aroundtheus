import Section from "../components/Section.js";
// import { initialCards } from "../utils/constants.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import { FormValidator, config } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithDelete from "../components/PopupWithDelete.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
const cl = console.log.bind(console);

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
/*                              Class Instances                 */
/* -------------------------------------------------------------------------- */
const userInfo = new UserInfo(profTitle, profDesc);

// const section = new Section(
//   {
//     items: initialCards,
// renderer: (item) => {
//   const cardElement = renderCard(item);
//   section.addItem(cardElement);
// },
//   },
//   cardListEl
// );

const editProfModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfEditSubmit
);

const addCardModal = new PopupWithForm("#card-add-modal", handleAddCardSubmit);

const deleteCardModal = new PopupWithDelete("#card-delete-confirm-modal");

const prevImageModal = new PopupWithImage("#image-preview-modal");

const editFormValidator = new FormValidator(config, profEditForm);

const addFormValidator = new FormValidator(config, cardAddForm);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "971c48ee-b7d1-41de-9c33-4a4541a40a56",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                                  API Calls                                 */
/* -------------------------------------------------------------------------- */
let section;
api
  .getInitialCards()
  .then((res) => {
    section = new Section(
      {
        items: res,
        renderer: (cardData) => {
          const cardElement = renderCard(cardData);
          section.addItem(cardElement);
        },
      },
      cardListEl
    );
    section.renderItems();
    cl(res);
  })
  .catch(console.error);
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function handleImageClick(cardData) {
  prevImageModal.open(cardData);
}

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    deleteCardModal,
    api
  );
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
  const cardData = { name: title, link: url };
  const card = renderCard(cardData);
  api.addNewCard(cardData);
  section.addItem(card);
  addCardModal.close();
}

function openAddModal() {
  addCardModal.open();
}

/* -------------------------------------------------------------------------- */
/*                               Function Calls                               */
/* -------------------------------------------------------------------------- */

editFormValidator.enableValidation();

addFormValidator.enableValidation();

// section.renderItems();

editProfModal.setEventListeners();

addCardModal.setEventListeners();

prevImageModal.setEventListeners();

deleteCardModal.setEventListeners();

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
  openAddModal();
});
