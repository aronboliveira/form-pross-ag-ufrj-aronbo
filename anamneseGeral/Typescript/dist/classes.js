"use strict";
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
var _JSONStorager_labId, _JSONStorager_labText, _JSONStorager_inpId, _JSONStorager_inpValue;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONStorager = void 0;
class JSONStorager {
    constructor(labId, labText, inpId, inpValue) {
        this.labId = labId;
        _JSONStorager_labId.set(this, void 0);
        _JSONStorager_labText.set(this, void 0);
        _JSONStorager_inpId.set(this, void 0);
        _JSONStorager_inpValue.set(this, void 0);
        __classPrivateFieldSet(this, _JSONStorager_labId, labId, "f");
        __classPrivateFieldSet(this, _JSONStorager_labText, labText, "f");
        __classPrivateFieldSet(this, _JSONStorager_inpId, inpId, "f");
        __classPrivateFieldSet(this, _JSONStorager_inpValue, inpValue, "f");
        Object.freeze(this);
    }
    get showLabId() {
        return __classPrivateFieldGet(this, _JSONStorager_labId, "f");
    }
    get showLabText() {
        return __classPrivateFieldGet(this, _JSONStorager_labText, "f");
    }
    get showLabInfo() {
        return [__classPrivateFieldGet(this, _JSONStorager_labId, "f"), __classPrivateFieldGet(this, _JSONStorager_labText, "f")];
    }
    get showInpId() {
        return __classPrivateFieldGet(this, _JSONStorager_inpId, "f");
    }
    get showInpValue() {
        return __classPrivateFieldGet(this, _JSONStorager_inpValue, "f");
    }
    get showInpInfo() {
        return [__classPrivateFieldGet(this, _JSONStorager_inpId, "f"), __classPrivateFieldGet(this, _JSONStorager_inpValue, "f")];
    }
    get showAllInfo() {
        return [__classPrivateFieldGet(this, _JSONStorager_labId, "f"), __classPrivateFieldGet(this, _JSONStorager_labText, "f"), __classPrivateFieldGet(this, _JSONStorager_inpId, "f"), __classPrivateFieldGet(this, _JSONStorager_inpValue, "f")];
    }
}
exports.JSONStorager = JSONStorager;
_JSONStorager_labId = new WeakMap(), _JSONStorager_labText = new WeakMap(), _JSONStorager_inpId = new WeakMap(), _JSONStorager_inpValue = new WeakMap();
