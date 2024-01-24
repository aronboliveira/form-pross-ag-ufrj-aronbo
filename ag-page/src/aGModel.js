//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização
import * as ErrorHandler from "../../global-scripts/src/errorHandler.js";
import { extLine } from "../../global-scripts/src/errorHandler.js";
export function formatTel(telInp) {
  let numOnly = "";
  if (
    telInp instanceof HTMLInputElement ||
    telInp instanceof HTMLTextAreaElement
  ) {
    numOnly = (telInp.value?.replace(/[^0-9]/g, "") || numOnly).replace(
      /\d+/g,
      matchTel => {
        if (matchTel.length === 9) {
          return matchTel[0] === "9"
            ? `${matchTel.slice(0, 5)}-${matchTel.slice(5, 9)}`
            : `${matchTel.slice(0, 4)}-${matchTel.slice(4, 8)}`;
        } else if (matchTel?.length > 9) return `${matchTel.slice(0, 8)}`;
        return matchTel;
      }
    );
    telInp.value = numOnly;
    return telInp.value;
  } else ErrorHandler.inputNotFound(telInp, "telInp", extLine(new Error()));
  return numOnly;
}
export function addEmailExtension(emailInp) {
  if (
    emailInp instanceof HTMLInputElement ||
    emailInp instanceof HTMLTextAreaElement
  ) {
    if (emailInp?.value === "") {
      emailInp.value = "@.";
      emailInp.setSelectionRange(0, 0);
    } else if (emailInp?.value === "@") {
      emailInp.value += "@.";
      emailInp.setSelectionRange(0, 0);
    }
  } else
    ErrorHandler.inputNotFound(
      emailInp,
      `${emailInp?.id ?? "UNDEFINED ID EMAIL CONTAINER"}`,
      extLine(new Error())
    );
}
export function formatCEP(CEPInp) {
  if (
    CEPInp instanceof HTMLInputElement ||
    CEPInp instanceof HTMLTextAreaElement
  ) {
    CEPInp.value.replaceAll(/[^0-9]/g, "");
    if (
      CEPInp.value.length >= 5 &&
      CEPInp.value.match(/[0-9]{5,}[^-][0-9]{1,3}/)
    )
      CEPInp.value = `${CEPInp.value.slice(0, 5)}-${CEPInp.value.slice(5, 9)}`;
  } else ErrorHandler.inputNotFound(CEPInp, "CEPInp", extLine(new Error()));
}
export function addDblQuotes(qtedInp) {
  if (
    qtedInp instanceof HTMLInputElement ||
    qtedInp instanceof HTMLTextAreaElement
  ) {
    if (qtedInp?.value === "") {
      qtedInp.value = '""';
      qtedInp.setSelectionRange(1, 1);
    } else if (qtedInp?.value === '"') {
      qtedInp.value += '"';
      qtedInp.setSelectionRange(1, 1);
    }
  } else
    ErrorHandler.inputNotFound(
      qtedInp,
      `${qtedInp?.id ?? "UNDEFINED ID QUOTED CONTAINER"}`,
      extLine(new Error())
    );
}
