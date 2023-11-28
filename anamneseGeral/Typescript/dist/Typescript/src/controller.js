"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cursorCheckTimer = void 0;
const Handlers = __importStar(require("./handlers.js"));
const Model = __importStar(require("../../model.js"));
const textInputs = document.querySelectorAll('input[type="text"]');
const textareas = document.querySelectorAll("textarea");
const textConts = [...textareas, ...textInputs];
const numInps = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const antFamChecks = document.querySelectorAll("input[id^='antFam']");
const antMedContainer = document.getElementById("antMedContainer");
const telInputs = document.querySelectorAll('input[type="text"][id^="tel"]');
const emailInputs = document.querySelectorAll('input[id^="email"]');
const cepElement = document.getElementById("cepId");
const cepElementBtn = document.getElementById("autoCompCepBtn");
const qxPrinc = document.getElementById("qxPrinc");
const editableCite = document.querySelector('cite[contenteditable="true"]');
const astDigtBtns = document.querySelectorAll('button[id$="AstDigtBtn');
const deactAutocorrectBtns = document.querySelectorAll('button[id^="deactAutocorrectBtn"]');
const dateBtns = document.querySelectorAll('button[id$="DatBtn"]');
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");
textConts.forEach(function (textCont) {
    const isTelInput = textCont.classList.contains("inpTel");
    const isEmailInput = textCont.classList.contains("inpEmail");
    if (!isTelInput && !isEmailInput && !(textCont.id === "cepId")) {
        textCont.addEventListener("input", function (input) {
            if (input.target &&
                (input.target instanceof HTMLTextAreaElement ||
                    input.target instanceof HTMLInputElement)) {
                Model.autoCapitalizeInputs(input.target);
            }
        });
    }
});
numInps.forEach(function (numInp) {
    numInp.addEventListener("input", function (input) {
        if (input.target && input.target instanceof HTMLInputElement) {
            Model.numberLimit(input.target);
        }
    });
});
telInputs.forEach((telInput) => {
    telInput.addEventListener("input", (inputTel) => {
        if (inputTel.target && inputTel.target instanceof HTMLInputElement) {
            Model.formatTel(inputTel.target);
        }
    });
});
emailInputs.forEach((emailInput) => {
    emailInput.addEventListener("click", () => Model.addEmailExtension(emailInput));
    emailInput.addEventListener("input", () => Model.addEmailExtension(emailInput));
});
radioButtons.forEach((radio) => {
    radio.addEventListener("keydown", (keydown) => {
        Handlers.opRadioHandler(keydown);
    });
    radio.addEventListener("change", Handlers.cpbInpHandler);
    radio.addEventListener("keydown", Handlers.cpbInpHandler);
    radio.addEventListener("dblclick", () => Handlers.doubleClickHandler.bind(radio));
    radio.addEventListener("touchstart", Handlers.touchStartHandler);
    radio.addEventListener("change", Handlers.deactTextInput);
});
antFamChecks.forEach((antFamCheck) => {
    antFamCheck.addEventListener("change", Handlers.cpbInpHandler);
    antFamCheck.addEventListener("dblclick", Handlers.doubleClickHandler);
});
if (antMedContainer) {
    antMedContainer.addEventListener("click", Handlers.addAntMedHandler);
}
dateBtns.forEach(function (dateBtn) {
    dateBtn.addEventListener("click", (activation) => {
        Handlers.useCurrentDate(activation, dateBtn);
    });
});
if (cepElement &&
    cepElement instanceof HTMLInputElement &&
    cepElementBtn &&
    cepElementBtn instanceof HTMLButtonElement) {
    cepElement.addEventListener("input", () => Model.formatCEP(cepElement));
    cepElement.addEventListener("input", () => {
        let isCepBtnOff = Handlers.enableCEPBtn(cepElement.value.length, cepElementBtn);
        if (cepElementBtn &&
            cepElementBtn instanceof HTMLButtonElement &&
            !isCepBtnOff) {
            cepElementBtn.addEventListener("click", () => Handlers.searchCEP(cepElement));
        }
    });
}
if (qxPrinc && qxPrinc instanceof HTMLTextAreaElement) {
    qxPrinc.addEventListener("click", () => Model.addDblQuotes(qxPrinc));
    qxPrinc.addEventListener("input", () => Model.addDblQuotes(qxPrinc));
}
if (editableCite) {
    let firstClick = true;
    const citeClickHandler = function (click) {
        if (firstClick && click.target && click.target instanceof HTMLElement) {
            Model.removeFirstClick(click.target);
            firstClick = false;
            editableCite.removeEventListener("click", citeClickHandler);
        }
    };
    editableCite.addEventListener("keyup", function (keypress) {
        if (keypress.target && keypress.target instanceof HTMLElement) {
            Model.autoCapitalizeCite(keypress.target);
        }
    });
    editableCite.addEventListener("click", citeClickHandler);
}
deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
    deactAutocorrectBtn.addEventListener("click", function (click) {
        return Model.switchAutocorrect(click, deactAutocorrectBtn);
    });
});
astDigtBtns.forEach(function (astDigtBtn) {
    astDigtBtn.addEventListener("click", function (click) {
        return Handlers.changeToAstDigit(click, astDigtBtn);
    });
});
if (subButton) {
    subButton.addEventListener("click", Handlers.subForm);
}
if (resetFormBtn) {
    resetFormBtn.addEventListener("click", (click) => Handlers.resetarFormulario(click, astDigtBtns));
}
function cursorCheckTimer(cursorPosition) {
    let selection = window.getSelection();
    if (selection && selection.focusNode !== null) {
        cursorPosition = selection.getRangeAt(0)?.startOffset;
        setTimeout(() => {
            return cursorPosition;
        }, 3000);
    }
}
exports.cursorCheckTimer = cursorCheckTimer;
