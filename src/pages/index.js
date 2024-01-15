import Section from "../components/Section.js";
// import { initialCards } from "../utils/constants.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import Card from "../components/Card.js";
import { FormValidator, config } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
const cl = console.log.bind(console);

const profEditBtn = document.querySelector("#profile-edit-button");
const profEditModal = document.querySelector("#profile-edit-modal");
const profTitle = document.querySelector(".profile__title");
const profDesc = document.querySelector(".profile__description");
// const profEditNameInput = document.querySelector("#edit_modal-input-name");
// const profEditDescInput = document.querySelector("#edit-modal-input-desc");
const profEditForm = profEditModal.querySelector(".modal__form");
const profImage = document.querySelector(".profile__image");
const profAvatarEditBtn = document.querySelector(".profile__image_edit-button");

const cardListEl = document.querySelector(".cards__list");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddBtn = document.querySelector("#card-add-button");
const cardAddForm = cardAddModal.querySelector(".modal__form");

const updateAvatarModal = document.querySelector("#update-avatar-modal");
const updateAvatarForm = updateAvatarModal.querySelector(".modal__form");

/* -------------------------------------------------------------------------- */
/*                              Class Instances                 */
/* -------------------------------------------------------------------------- */
const userInfo = new UserInfo(profTitle, profDesc, profImage);

const editProfModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfEditSubmit
);

const avatarUpdateModal = new PopupWithForm(
  "#update-avatar-modal",
  handleAvatarUpdate
);

const addCardModal = new PopupWithForm("#card-add-modal", handleAddCardSubmit);

const prevImageModal = new PopupWithImage("#image-preview-modal");

const deleteCardModal = new PopupWithDelete("#card-delete-confirm-modal");

const editFormValidator = new FormValidator(config, profEditForm);

const addFormValidator = new FormValidator(config, cardAddForm);

const avatarUpdateValidator = new FormValidator(config, updateAvatarForm);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e4d91a75-4cb0-43d1-85cd-37dfda4c3b7e",
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
  .catch((err) => {
    console.error(`Error ${err}`);
  });

api
  .loadUserInfo()
  .then((res) => {
    cl(res);
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.error(`Error ${err}`);
  });

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
    function deleteBtnClick(cardInstance) {
      deleteCardModal.open();
      deleteCardModal.setSubmitAction(() => {
        api
          .deleteCard(cardInstance.getId())
          .then(() => {
            deleteCardModal.close();
            cardInstance.handleDeleteCard();
          })
          .catch((err) => {
            console.error(`Error ${err}`);
          });
      });
    }
  );
  return card.getCardEl();
}
function handleProfInfoUpdate() {
  cl(userInfo.getUserInfo());
  api.updateUserInfo(userInfo.getUserInfo()).then((res) => {
    userInfo.setUserInfo(res.name, res.about);
  });
}

function handleAvatarUpdate(inputValue) {
  api.updateUserAvatar(inputValue).then((res) => {
    avatarUpdateModal.close();
    userInfo.setUserAvatar(res.avatar);
  });
}

function handleProfEditSubmit(profileData) {
  userInfo.setUserInfo(profileData.title, profileData.description);
  handleProfInfoUpdate();
  editProfModal.close();
}

function handleAddCardSubmit(inputValues) {
  const { title, url } = inputValues;
  const cardData = { name: title, link: url };
  api
    .addNewCard(cardData)
    .then((cardData) => {
      const card = renderCard(cardData);
      section.addItem(card);
      cl(JSON.stringify(cardData));
    })
    .catch((err) => {
      console.error(`Error ${err}`);
    });
  addCardModal.close();
}

/* -------------------------------------------------------------------------- */
/*                               Function Calls                               */
/* -------------------------------------------------------------------------- */

editFormValidator.enableValidation();

addFormValidator.enableValidation();

avatarUpdateValidator.enableValidation();

avatarUpdateModal.setEventListeners();

editProfModal.setEventListeners();

addCardModal.setEventListeners();

prevImageModal.setEventListeners();

deleteCardModal.setEventListeners();

/* -------------------------- Profile Button Listeners ------------------------- */

profEditBtn.addEventListener("click", () => {
  // const { profileName, description } = userInfo.getUserInfo();
  // e.preventDefault();
  // profEditNameInput.value = profileName;
  // profEditDescInput.value = description;
  // handleProfInfoUpdate();
  editFormValidator.resetModalValidity();
  editProfModal.open();
});

profAvatarEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  avatarUpdateModal.open();
});

/* -------------------------- Card Button Listeners ------------------------- */
cardAddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addFormValidator.resetModalValidity();
  addCardModal.open();
});
