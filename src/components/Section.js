export default class Section {
  constructor({ items, renderer }, itemContainerEl) {
    this._items = items;
    this._renderer = renderer;
    this._container = itemContainerEl;
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }
}
