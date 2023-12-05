export class JSONStorager {
  #id;
  #value;
  constructor(id: string, value: string) {
    this.#id = id;
    this.#value = value;
    Object.freeze(this);
  }
  get showInpId() {
    return this.#id;
  }
  get showInpValue() {
    return this.#value;
  }
  get showAllInfo() {
    return [this.#id, this.#value];
  }
}

export class JSONTitleStorager {
  #title;
  constructor(title: Element | string | null) {
    this.#title = title;
    Object.freeze(this);
  }
  get showInpTitle() {
    return this.#title;
  }
}
