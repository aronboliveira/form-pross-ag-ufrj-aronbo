export class JSONStorager {
  #labId: string;
  #labText: string;
  #inpId: string;
  #inpValue: string;
  constructor(
    public labId: string,
    labText: string,
    inpId: string,
    inpValue: string
  ) {
    this.#labId = labId;
    this.#labText = labText;
    this.#inpId = inpId;
    this.#inpValue = inpValue;
    Object.freeze(this);
  }
  get showLabId() {
    return this.#labId;
  }
  get showLabText() {
    return this.#labText;
  }
  get showLabInfo() {
    return [this.#labId, this.#labText];
  }
  get showInpId() {
    return this.#inpId;
  }
  get showInpValue() {
    return this.#inpValue;
  }
  get showInpInfo() {
    return [this.#inpId, this.#inpValue];
  }
  get showAllInfo() {
    return [this.#labId, this.#labText, this.#inpId, this.#inpValue];
  }
}
