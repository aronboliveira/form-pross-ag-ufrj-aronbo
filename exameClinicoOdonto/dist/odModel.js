//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização
"use strict";
import * as ErrorHandler from "../../globalScripts/dist/errorHandler.js";
const subDivsQuadrs = document.querySelectorAll(".quadrSubDiv");
let isValuePreDef = false;
export function resetAvDentValue(selectInp) {
  const targInp = selectInp;
  const targValue = targInp.value;
  const dlOptionsCollection = document.getElementsByClassName("elemOp");
  const dlOptionsArray = Array.from(dlOptionsCollection);
  if (
    dlOptionsArray.every((dlOption) => dlOption instanceof HTMLOptionElement)
  ) {
    for (let i = 0; i < dlOptionsArray.length; i++) {
      if (dlOptionsArray[i].value === targValue) {
        isValuePreDef = true;
        break;
      }
    }
    if (targInp && isValuePreDef && targInp instanceof HTMLElement) {
      setTimeout(() => {
        targInp.value = "";
        isValuePreDef = false;
      }, 100);
      targInp.setAttribute("placeholder", "Apagado");
      const placeholderTimer = setTimeout(
        () => targInp.classList.add("placeholder-hidden"),
        1000
      );
      targInp.addEventListener("blur", () => {
        targInp.classList.remove("placeholder-hidden");
        clearTimeout(placeholderTimer);
      });
      targInp.addEventListener("focus", () => {
        targInp.classList.remove("placeholder-hidden");
        clearTimeout(placeholderTimer);
      });
    }
  } else {
    for (let i = 0; i < dlOptionsArray.length; i++) {
      if (
        !(dlOptionsArray[i] instanceof HTMLInputElement || HTMLTextAreaElement)
      ) {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.inputNotFound(
          dlOptionsArray[i] ?? null,
          `${dlOptionsArray[i]?.id ?? "UNDEFINED ID DLOPTION"}`,
          slicedError ?? "NULL"
        );
      }
    }
  }
}
export function orderLabels() {
  subDivsQuadrs.forEach((subDiv) => {
    const labsNList = subDiv.querySelectorAll(".labelAvDent");
    if (labsNList.length > 0) {
      const firstLabId = labsNList[0].id;
      const firstLabNumStr = firstLabId.match(/\d+/);
      if (firstLabNumStr !== null) {
        for (let i = 0; i < labsNList.length; i++) {
          const nOrder = (i + 1).toString();
          if (labsNList[i] instanceof HTMLElement)
            labsNList[i].style.setProperty("order", nOrder);
        }
      }
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotPopulated(
        labsNList ?? null,
        "labsNLIST",
        slicedError ?? "NULL"
      );
    }
  });
}
