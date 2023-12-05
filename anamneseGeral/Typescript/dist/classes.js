var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _JSONStorager_id, _JSONStorager_value, _JSONTitleStorager_title;
export class JSONStorager {
    constructor(id, value) {
        _JSONStorager_id.set(this, void 0);
        _JSONStorager_value.set(this, void 0);
        __classPrivateFieldSet(this, _JSONStorager_id, id, "f");
        __classPrivateFieldSet(this, _JSONStorager_value, value, "f");
        Object.freeze(this);
    }
    get showInpId() {
        return __classPrivateFieldGet(this, _JSONStorager_id, "f");
    }
    get showInpValue() {
        return __classPrivateFieldGet(this, _JSONStorager_value, "f");
    }
    get showAllInfo() {
        return [__classPrivateFieldGet(this, _JSONStorager_id, "f"), __classPrivateFieldGet(this, _JSONStorager_value, "f")];
    }
}
_JSONStorager_id = new WeakMap(), _JSONStorager_value = new WeakMap();
export class JSONTitleStorager {
    constructor(title) {
        _JSONTitleStorager_title.set(this, void 0);
        __classPrivateFieldSet(this, _JSONTitleStorager_title, title, "f");
        Object.freeze(this);
    }
    get showInpTitle() {
        return __classPrivateFieldGet(this, _JSONTitleStorager_title, "f");
    }
}
_JSONTitleStorager_title = new WeakMap();
