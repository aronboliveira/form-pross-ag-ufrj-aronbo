"use strict";
import * as ErrorHandler from "./errorHandler.js";
export function showInHidTip(tipBtn) {
    const dlgInBtn = tipBtn.querySelector("dialog");
    if (dlgInBtn instanceof HTMLDialogElement) {
        dlgInBtn.show();
        setTimeout(() => {
            dlgInBtn.close();
        }, 5000);
    }
    else {
        const error = new Error();
        const splitError = error.stack?.split("\n");
        const slicedError = splitError[1].trim().slice(-7, -1);
        ErrorHandler.elementNotFound(dlgInBtn ?? null, `Dialog related to ${tipBtn?.id || "UNDEFINED ID TIP BUTTON"}`, slicedError ?? "NULL");
    }
}