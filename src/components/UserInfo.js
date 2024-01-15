export default class UserInfo {
  constructor(nameElement, aboutElement, avatar) {
    this._nameElement = nameElement;
    this._aboutElement = aboutElement;
    this._avatar = avatar;
  }

  getUserInfo() {
    const values = {};
    values.name = this._nameElement.textContent;
    values.about = this._aboutElement.textContent;
    return values;
  }

  setUserInfo(titleData, descData) {
    this._nameElement.textContent = titleData;
    this._aboutElement.textContent = descData;
  }

  setUserAvatar(url) {
    this._avatar.src = url;
  }
}
