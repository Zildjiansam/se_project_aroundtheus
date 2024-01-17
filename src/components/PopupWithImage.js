import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._prevImageCaption = this._modalSelector.querySelector(
      ".modal__preview-image-caption"
    );
    this._prevModalImage =
      this._modalSelector.querySelector(".modal__prev-image");
  }

  open(data) {
    this._prevModalImage.src = data._link;
    this._prevModalImage.alt = data._name;
    this._prevImageCaption.textContent = data._name;
    super.open();
  }
}
