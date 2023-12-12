import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this.handleFormSubmit = handleFormSubmit;
  }

  //   _getInputValues() {
  //     const inputValues = {};
  //     inputValues[]
  //   }
}
