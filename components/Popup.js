export default class Popup {
  constructor(modalSelector) {
    this._modalSelector = modalSelector;
  }

  open() {
    this._modalSelector.classList.add("modal__opened");
  }

  close() {
    this._modalSelector.classList.remove("modal__opened");
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    profEditBtnClose.addEventListener("click", (e) => {
      this.close();
    });
  }
}
