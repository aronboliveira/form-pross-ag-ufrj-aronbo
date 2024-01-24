import * as ErrorHandler from "../../global-scripts/src/errorHandler.js";
import { extLine } from "../../global-scripts/src/errorHandler.js";
export function showInHidTip(tipBtn) {
  const dlgInBtn = tipBtn?.querySelector("dialog") || tipBtn.nextElementSibling;
  if (dlgInBtn instanceof HTMLDialogElement) {
    dlgInBtn.show();
    setTimeout(() => {
      dlgInBtn.close();
    }, 10000);
  }
  if (
    dlgInBtn?.classList.contains("tipDlg") &&
    (dlgInBtn instanceof HTMLDialogElement ||
      dlgInBtn instanceof HTMLDivElement ||
      dlgInBtn instanceof HTMLSpanElement)
  ) {
    dlgInBtn.hidden = !dlgInBtn.hidden;
    setTimeout(() => {
      dlgInBtn.hidden = true;
    }, 5000);
  } else
    ErrorHandler.elementNotFound(
      dlgInBtn,
      `Dialog related to ${tipBtn?.id || "UNDEFINED ID TIP BUTTON"}`,
      extLine(new Error())
    );
}
