export default class Popup {
  constructor(modalSelector) {
    // this._modalSelector = modalSelector;
    this._modalSelector = document.querySelector(modalSelector);
    this._modalCloseButton = this._modalSelector.querySelector(".modal__close");
  }

  open() {
    this._modalSelector.classList.add("modal__opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalSelector.classList.remove("modal__opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._modalSelector.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
    this._modalCloseButton.addEventListener("click", (e) => {
      this.close();
    });
  }
}
