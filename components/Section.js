export default class Section {
  constructor({ items, renderer }, cardListEl) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = cardListEl;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
