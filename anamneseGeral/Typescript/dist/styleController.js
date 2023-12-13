"use strict";
import * as ErrorHandler from "./errorHandler.js";
import * as StyleHandler from "./styleHandler.js";
const tipBtns = Array.from(document.getElementsByClassName("tipBtn"));
if (tipBtns.length > 0) {
    tipBtns.forEach((tipBtn) => {
        if (tipBtn instanceof HTMLButtonElement) {
            tipBtn.addEventListener("click", () => StyleHandler.showInHidTip(tipBtn));
        }
        else {
            const error = new Error();
            const splitError = error.stack?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.elementNotFound(tipBtn ?? null, "Tip Button", slicedError ?? "NULL");
        }
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(tipBtns ?? null, "tipBtns", slicedError ?? "NULL");
}
