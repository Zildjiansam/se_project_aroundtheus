export default class UserInfo {
  constructor(nameElement, jobElement) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
  }

  getUserInfo() {
    const data = {};
    data.profileName = this._nameElement.textContent;
    data.description = this._jobElement.textContent;
    return data;
  }

  setUserInfo(titleData, descData) {
    this._nameElement.textContent = titleData;
    this._jobElement.textContent = descData;
  }
}
