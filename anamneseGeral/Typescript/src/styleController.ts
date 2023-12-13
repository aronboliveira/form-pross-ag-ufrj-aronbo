"use strict";
import * as Model from "./model.js";
import * as Handlers from "./handlers.js";
import * as ErrorHandler from "./errorHandler.js";
import * as StyleHandler from "./styleHandler.js";
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

const tipBtns = Array.from(document.getElementsByClassName("tipBtn"));

if (tipBtns.length > 0) {
  tipBtns.forEach((tipBtn) => {
    if (tipBtn instanceof HTMLButtonElement) {
      tipBtn.addEventListener("click", () => StyleHandler.showInHidTip(tipBtn));
    } else {
      const error = new Error();
      const splitError = (error.stack as string)?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        tipBtn ?? null,
        "Tip Button",
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = (error.stack as string)?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    tipBtns ?? null,
    "tipBtns",
    slicedError ?? "NULL"
  );
}
