"use strict";
import * as Model from "./model.js";
import * as Handlers from "./handlers.js";
import * as ErrorHandler from "./errorHandler.js";
import {
  Man,
  Woman,
  Neutro,
  JSONStorager,
  JSONTitleStorager,
} from "./classes.js";
import type {
  looseNum,
  targStr,
  targNum,
  targStrArr,
  targEl,
  arrTargEl,
  HTMLTargEl,
  entryEl,
  textEl,
  formPerson,
  formClassPerson,
} from "./types.js";

export function showInHidTip(tipBtn: HTMLButtonElement) {
  const dlgInBtn = tipBtn.querySelector("dialog");
  if (dlgInBtn instanceof HTMLDialogElement) {
    dlgInBtn.show();
    setTimeout(() => {
      dlgInBtn.close();
    }, 5000);
  } else {
    const error = new Error();
    const splitError = (error.stack as string)?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(
      dlgInBtn ?? null,
      `Dialog related to ${
        (tipBtn as HTMLButtonElement)?.id || "UNDEFINED ID TIP BUTTON"
      }`,
      slicedError ?? "NULL"
    );
  }
}
