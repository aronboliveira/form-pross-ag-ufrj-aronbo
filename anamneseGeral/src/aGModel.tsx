//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização
"use strict";
import * as ErrorHandler from "../../globalScripts/src/errorHandler";
import { textEl } from "../../globalScripts/src/types.js";

export function formatTel(inputTelElement: HTMLInputElement) {
  const telText = inputTelElement.value;
  const regex = /\d+/g;

  const formattedTel = telText.replace(/[^0-9]/g, "");

  const numOnly = formattedTel.replace(regex, (matchTel) => {
    if (matchTel.length === 9) {
      if (matchTel[0] === "9") {
        return `${matchTel.slice(0, 5)}-${matchTel.slice(5, 9)}`;
      } else {
        return `${matchTel.slice(0, 4)}-${matchTel.slice(4, 8)}`;
      }
    } else if (matchTel.length > 9) {
      return `${matchTel.slice(0, 8)}`;
    }
    return matchTel;
  });

  inputTelElement.value = numOnly;
}

export function addEmailExtension(container: Element) {
  if (container instanceof HTMLInputElement || HTMLTextAreaElement) {
    if ((container as textEl).value === "") {
      (container as textEl).value = "@.";
      (container as textEl).setSelectionRange(0, 0);
    } else if ((container as textEl).value === "@") {
      (container as textEl).value += "@.";
      (container as textEl).setSelectionRange(0, 0);
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.inputNotFound(
      container ?? null,
      `${container?.id ?? "UNDEFINED ID EMAIL CONTAINER"}`,
      slicedError ?? "NULL"
    );
  }
}

export function formatCEP(inputCEPElement: HTMLInputElement) {
  const CEPText = inputCEPElement.value;
  const noHifenCEPRegex = /[0-9]{5,}[^-][0-9]{1,3}/;

  inputCEPElement.value.replaceAll(/[^0-9]/g, "");

  if (CEPText.length >= 5 && CEPText.match(noHifenCEPRegex)) {
    const hifenText = `${CEPText.slice(0, 5)}-${CEPText.slice(5, 9)}`;
    inputCEPElement.value = hifenText;
  }
}

export function addDblQuotes(container: Element) {
  if (
    (container as textEl) instanceof HTMLInputElement ||
    HTMLTextAreaElement
  ) {
    if ((container as textEl).value === "") {
      (container as textEl).value = '""';
      (container as textEl).setSelectionRange(1, 1);
    } else if ((container as textEl).value === '"') {
      (container as textEl).value += '"';
      (container as textEl).setSelectionRange(1, 1);
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.inputNotFound(
      container ?? null,
      `${container?.id ?? "UNDEFINED ID QUOTED CONTAINER"}`,
      slicedError ?? "NULL"
    );
  }
}
