//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM
"use strict";
import * as OdHandler from "./odHandler.js";
import * as OdModel from "./odModel.js";
import * as GlobalModel from "../../globalScripts/dist/gModel.js";
import * as GlobalHandler from "../../globalScripts/dist/gHandlers.js";
import * as ErrorHandler from "../../globalScripts/dist/errorHandler.js";
//inicialização de constantes percorrendo o DOM
const textInputs = document.querySelectorAll('input[type="text"]');
const textareas = document.querySelectorAll("textarea");
const textConts = [...textInputs, ...textareas];
const radioButtons = document.querySelectorAll('input[type="radio"]');
const inspRadiosYes = document.querySelectorAll('input[class="contQuint radOp radYes"]');
const inspRadiosNo = document.querySelectorAll('input[class="contQuint radOp radNo"]');
const inspDialogsBtns = document.querySelectorAll('button[id^="inspDialogBtn"]');
const inspLIBtns = document.querySelectorAll('button[id^="inspLIBtn"]');
const quadrDents = document.getElementsByClassName("quadrMainDiv");
const quadrDentsArray = Array.from(quadrDents);
const avElemDents = document.getElementsByClassName("inpAvDent");
const avElemDentsArray = Array.from(avElemDents);
const tratContainer = document.getElementById("tratContainer");
const dateBtns = document.querySelectorAll('button[id$="DatBtn"]');
const editableCite = document.querySelector('cite[contenteditable="true"]');
const deactAutocorrectBtns = document.querySelectorAll('button[id^="deactAutocorrectBtn"]');
const astDigtBtns = document.querySelectorAll('button[id$="AstDigtBtn');
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");
const quadrInps = document.querySelectorAll('input[id^="inpD"]');
const resetDivsQuadrs = document.querySelectorAll(".resetBut");
// const inspSpanSubs = document.getElementsByClassName("inspSpanSub");
// const inspSpanSubsArray = Array.from(inspSpanSubs);
// const tratTypeSpans = document.querySelectorAll('span[id^="tratTypeSpan"]');
// const taTrats = document.querySelectorAll("textarea[id^=taTrat")
// const subDivsQuadrs = document.querySelectorAll(".quadrSubDiv");
// let selection = window.getSelection();
// let range = document.createRange();
//validação de constantes e adição de listeners
if (textConts.length > 0) {
    textConts.forEach(function (textCont) {
        textCont.addEventListener("input", function (input) {
            if (input.target &&
                (input.target instanceof HTMLTextAreaElement ||
                    input.target instanceof HTMLInputElement)) {
                GlobalModel.autoCapitalizeInputs(input.target);
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                ErrorHandler.inputNotFound(input?.target ?? null, "target textCont", slicedError ?? "NULL");
            }
        });
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(textConts ?? null, "textConts", slicedError ?? "NULL");
}
if (radioButtons.length > 0) {
    radioButtons.forEach((radio) => {
        if (radio instanceof HTMLInputElement && radio.type === "radio") {
            radio.addEventListener("keydown", (keydown) => {
                GlobalHandler.opRadioHandler(keydown);
            });
            radio.addEventListener("dblclick", () => GlobalHandler.doubleClickHandler(radio));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(radio ?? null, `${radio?.id || "UNDEFINED ID RADIO"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(radioButtons ?? null, "radioButtons", slicedError ?? "NULL");
}
if (inspRadiosYes.length > 0) {
    inspRadiosYes.forEach((inspRadioYes) => {
        if (inspRadioYes instanceof HTMLInputElement &&
            (inspRadioYes.type === "radio" || inspRadioYes.type === "checkbox")) {
            inspRadioYes.addEventListener("click", (clickRadio) => OdHandler.showInspSpanSub(clickRadio, inspRadioYes));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(inspRadioYes ?? null, `${inspRadioYes?.id || "UNDEFINED ID YES INPUT"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(inspRadiosYes ?? null, "inspRadioYes", slicedError ?? "NULL");
}
if (inspRadiosNo.length > 0) {
    inspRadiosNo.forEach((inspRadioNo) => {
        if (inspRadioNo instanceof HTMLInputElement &&
            (inspRadioNo.type === "radio" || inspRadioNo.type === "checkbox")) {
            inspRadioNo.addEventListener("click", (clickRadio) => OdHandler.showInspSpanSub(clickRadio, inspRadioNo));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(inspRadioNo ?? null, `${inspRadioNo?.id || "UNDEFINED ID YES INPUT"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(inspRadiosNo ?? null, "inspRadioNo", slicedError ?? "NULL");
}
if (inspDialogsBtns.length > 0) {
    inspDialogsBtns.forEach((inspDialogBtn) => {
        if (inspDialogBtn instanceof HTMLButtonElement) {
            inspDialogBtn.addEventListener("click", (click) => OdHandler.showInspDialogs(click, inspDialogBtn));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementNotFound(inspDialogBtn ?? null, `${inspDialogBtn?.id || "UNDEFINED ID DIALOG BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(inspDialogsBtns ?? null, "inspDialogsBtns", slicedError ?? "NULL");
}
if (inspLIBtns.length > 0) {
    inspLIBtns.forEach((inspLIBtn) => {
        if (inspLIBtn instanceof HTMLButtonElement) {
            inspLIBtn.addEventListener("click", (click) => OdHandler.addTextToObs(click, inspLIBtn));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementNotFound(inspLIBtn ?? null, `${inspLIBtn?.id || "UNDEFINED ID LI BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(inspLIBtns ?? null, "inspLIBtns", slicedError ?? "NULL");
}
if (quadrDentsArray.length > 0) {
    quadrDentsArray.forEach((quadrDent) => {
        if (quadrDent instanceof HTMLElement) {
            quadrDent.addEventListener("mousemove", () => OdHandler.dragHover(quadrDent));
            quadrDent.addEventListener("dragstart", OdHandler.dragStart);
            quadrDent.addEventListener("dragenter", OdHandler.dragEnter);
            quadrDent.addEventListener("dragover", OdHandler.dragOver);
            quadrDent.addEventListener("dragleave", OdHandler.dragLeave);
            quadrDent.addEventListener("drop", OdHandler.dragDrop);
            quadrDent.addEventListener("dragend", OdHandler.dragEnd);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementNotFound(quadrDent ?? null, `${quadrDent?.id ?? "UNDEFINED QUADRANT ID"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(quadrDentsArray ?? null, "quadrDentsArray", slicedError ?? "NULL");
}
if (avElemDentsArray.length > 0) {
    avElemDentsArray.forEach((avElemDent) => {
        avElemDent.addEventListener("click", () => {
            if (avElemDent instanceof HTMLButtonElement ||
                HTMLSelectElement ||
                HTMLInputElement) {
                OdModel.resetAvDentValue(avElemDent);
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                ErrorHandler.elementNotFound(avElemDent ?? null, `${avElemDent?.id ?? "UNDEFINED ID ELEMENT"}`, slicedError ?? "NULL");
            }
        });
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(avElemDentsArray ?? null, "avElemDentsArray", slicedError ?? "NULL");
}
if (quadrInps.length > 0) {
    quadrInps.forEach((quadrInp) => {
        if (quadrInp instanceof HTMLInputElement) {
            quadrInp.addEventListener("click", () => OdHandler.clearQuadrInps(quadrInp));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(quadrInp ?? null, `${quadrInp?.id ?? "UNDEFINED QUADRANT INPUT ID"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(quadrInps ?? null, "quadrInps", slicedError ?? "NULL");
}
if (resetDivsQuadrs.length > 0) {
    resetDivsQuadrs.forEach((resetBtn) => {
        if (resetBtn instanceof HTMLButtonElement) {
            resetBtn.addEventListener("click", () => {
                OdHandler.resetLabels(resetBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementNotFound(resetBtn ?? null, `${resetBtn?.id ?? "UNDEFINED ID RESET BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(resetDivsQuadrs ?? null, "resetDivsQaudrs", slicedError ?? "NULL");
}
document.addEventListener("DOMContentLoaded", () => {
    OdModel.orderLabels();
});
if (tratContainer instanceof HTMLElement) {
    tratContainer.addEventListener("click", (click) => OdHandler.addSubDivTrat(click));
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(tratContainer ?? null, "tratContainer", slicedError ?? "NULL");
}
if (dateBtns.length > 0) {
    dateBtns.forEach(function (dateBtn) {
        if (dateBtn instanceof HTMLButtonElement) {
            dateBtn.addEventListener("click", (activation) => {
                GlobalHandler.useCurrentDate(activation, dateBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementNotFound(dateBtn ?? null, `${dateBtn?.id || "UNDEFINED ID DATE BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(dateBtns ?? null, "dateBtns", slicedError ?? "NULL");
}
if (editableCite) {
    let firstClick = true;
    const citeClickHandler = function (click) {
        if (firstClick && click.target && click.target instanceof HTMLElement) {
            GlobalModel.removeFirstClick(click.target);
            firstClick = false;
            editableCite.removeEventListener("click", citeClickHandler);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementNotFound(click?.target ?? null, "click target editableCite", slicedError ?? "NULL");
        }
    };
    editableCite.addEventListener("keyup", function (keypress) {
        if (keypress.target && keypress.target instanceof HTMLElement) {
            GlobalModel.autoCapitalizeCite(keypress.target);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementNotFound(keypress?.target ?? null, "keypress target editableCite", slicedError ?? "NULL");
        }
    });
    editableCite.addEventListener("click", citeClickHandler);
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(null, "editableCite", slicedError ?? "NULL");
}
if (astDigtBtns.length > 0) {
    astDigtBtns.forEach(function (astDigtBtn) {
        if (astDigtBtn instanceof HTMLButtonElement) {
            astDigtBtn.addEventListener("click", function (click) {
                return GlobalHandler.changeToAstDigit(click, astDigtBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementNotFound(astDigtBtn ?? null, astDigtBtn?.id || "UNDEFINED ID BUTTON", slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(astDigtBtns ?? null, "astDigtBtns", slicedError ?? "NULL");
}
if (deactAutocorrectBtns.length > 0) {
    deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
        if (deactAutocorrectBtn instanceof HTMLButtonElement) {
            deactAutocorrectBtn.addEventListener("click", function (click) {
                return GlobalModel.switchAutocorrect(click, deactAutocorrectBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementNotPopulated(deactAutocorrectBtns ?? null, `${deactAutocorrectBtn?.id || "UNDEFINED ID BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(deactAutocorrectBtns ?? null, "deactAutoCorrectBtns", slicedError ?? "NULL");
}
if (subButton instanceof HTMLButtonElement) {
    subButton.addEventListener("click", GlobalHandler.subForm);
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(subButton ?? null, "subButton", slicedError ?? "NULL");
}
if (resetFormBtn instanceof HTMLButtonElement) {
    resetFormBtn.addEventListener("click", (click) => GlobalHandler.resetarFormulario(click, astDigtBtns));
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(resetFormBtn ?? null, "resetFormBtn", slicedError ?? "NULL");
}
