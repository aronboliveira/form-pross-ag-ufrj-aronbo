import * as ErrorHandler from "../../global-scripts/src/errorHandle.js";
import { extLine } from "../../global-scripts/src/errorHandler.js";
import * as AGStyleHandler from "./styleHandler.js";
const tipBtns = Array.from(document.getElementsByClassName("tipBtn"));
if (tipBtns?.length > 0) {
  tipBtns.forEach(tipBtn => {
    tipBtn instanceof HTMLButtonElement
      ? tipBtn.addEventListener("click", () =>
          AGStyleHandler.showInHidTip(tipBtn)
        )
      : ErrorHandler.elementNotFound(
          tipBtn,
          "Tip Button",
          extLine(new Error())
        );
  });
} else
  ErrorHandler.elementNotPopulated(tipBtns, "tipBtns", extLine(new Error()));
