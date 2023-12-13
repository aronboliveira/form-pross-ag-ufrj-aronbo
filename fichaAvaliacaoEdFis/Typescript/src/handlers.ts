//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout

import * as Model from "./model.js";
import { UndefinedPerson, Man, Woman, Neutro } from "./classes.js";
import type {
  looseNum,
  primitiveType,
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
import * as ErrorHandler from "./errorHandler.js";

let rowCountAtivFisRot = 3;
let rowCountAtivFisProp = 3;
let rowCountComorb = 3;
const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
enum EnumTargInpTypes {
  "weight",
  "height",
  "IMC",
  "MLG",
  "TMB",
  "GET",
}
const enumTargInpTypes = EnumTargInpTypes;

export function updateSimpleProperty(element: entryEl) {
  if (element instanceof HTMLInputElement) {
    if (element.type === "radio" || element.type === "checkbox") {
      return element.checked.toString();
    } else if (element.type === "number") {
      if (
        Number.isNaN(parseFloat(element.value.replaceAll(/[^0-9.,+-]/g, "")))
      ) {
        console.warn(`element.value retornado como NaN, revertido para 0`);
        return 0;
      } else {
        return parseFloat(element.value.replaceAll(/[^0-9.,+-]/g, ""));
      }
    } else if (element.type === "text" || element.type === "date") {
      return element.value;
    } else {
      console.warn(`Erro validando type de Input para atualização de propriedade de person.
      Tipo obtido: ${element?.type ?? "null"}`);
    }
  } else if (
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    return element.value;
  } else {
    console.warn(`Erro validando Element para atualização de propriedade de person.
    Instância obitda: ${
      Object.prototype.toString.call(element).slice(8, -1) ?? "null"
    }`);
  }
}

export function opRadioHandler(keydown: KeyboardEvent) {
  const radioPairs: NodeListOf<Element> = document.querySelectorAll(
    'input[id$="Yes"], input[id$="No"]' //acessando como par
  );

  for (
    let i = 0;
    i < radioPairs.length;
    i += 2 //pulando de par em par
  ) {
    const radioYes: Element = radioPairs[i];
    const radioNo: Element = radioPairs[i + 1];

    if (!radioYes || !radioNo) {
      continue;
    }
    if (
      radioYes instanceof HTMLInputElement &&
      radioNo instanceof HTMLInputElement &&
      !radioYes.checked &&
      !radioNo.checked
    ) {
      if ((keydown.altKey && keydown.key === "y") || keydown.key === "Y") {
        radioYes.focus();
        radioYes.checked = true;
        setTimeout(() => {
          radioYes.blur();
        }, 5000);
        return;
      } else if (
        (keydown.altKey && keydown.key === "n") ||
        keydown.key === "N"
      ) {
        radioNo.focus();
        radioNo.checked = true;
        setTimeout(() => {
          radioNo.blur();
        }, 5000);
        return;
      }
    }
  }
}

export function cpbInpHandler(radio: HTMLInputElement) {
  const opRadiosCheck: NodeListOf<HTMLInputElement> | undefined =
    radio.parentElement?.querySelectorAll("input[id^='Cpb'][id$='Yes']");
  const divAdd: NodeListOf<HTMLDivElement> | undefined =
    radio.parentElement?.parentElement?.querySelectorAll("div[id^='divAdd']");
  opRadiosCheck?.forEach(function (opRadioCheck: Element, i: number): void {
    if (
      opRadiosCheck instanceof NodeList &&
      opRadioCheck instanceof HTMLInputElement &&
      divAdd
    ) {
      if (!opRadioCheck.checked) {
        divAdd[i].style.display = "none";
      } else {
        divAdd[i].style.display = "block";
      }
    }
  });
}

export function doubleClickHandler(this: HTMLInputElement) {
  if (this.checked) {
    this.checked = false;
  } else {
    this.checked = true;
  }
  const radio: HTMLInputElement | null | undefined =
    this.parentElement?.querySelector("input[id^='Cpb'][id$='Yes']");
  if (radio) {
    cpbInpHandler(radio);
  }
}

export function switchAutoFill(
  autoFillBtn: Element,
  locksTabInd: arrTargEl
): boolean {
  let autoFillActivation = true;
  if (autoFillBtn instanceof HTMLButtonElement) {
    if (autoFillBtn.innerText.match(/Desativar Cálculo Automático/)) {
      autoFillActivation = false;
      autoFillBtn.textContent = "Ativar Cálculo Automático";
      switchLockInputs(locksTabInd, autoFillActivation);
    } else if (autoFillBtn.innerText.match(/Ativar Cálculo Automático/)) {
      autoFillActivation = true;
      autoFillBtn.textContent = "Desativar Cálculo Automático";
      switchLockInputs(locksTabInd, autoFillActivation);
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(
      autoFillBtn ?? null,
      "autoFillBtn",
      slicedError
    );
  }
  return autoFillActivation;
}

function switchLockInputs(locksTabInd: arrTargEl, autoFillActivation: boolean) {
  if (
    locksTabInd.length > 0 &&
    locksTabInd.every((lock) => lock instanceof HTMLSpanElement)
  ) {
    if (autoFillActivation) {
      locksTabInd.forEach((lock) => {
        const siblingInput = searchPreviousSiblings(
          lock as HTMLSpanElement,
          "inpInd"
        );
        if (siblingInput instanceof HTMLInputElement) {
          (lock as HTMLSpanElement).innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
          </svg>`;
        } else {
          const error = new Error();
          const splitError = (error.stack as string).split("\n");
          const slicedError = splitError[1].trim().slice(-7, -1);
          ErrorHandler.inputNotFound(
            slicedError ?? null,
            "siblingInput",
            slicedError ?? "NULL"
          );
        }
      });
    } else {
      locksTabInd.forEach((lock) => {
        const siblingInput = searchPreviousSiblings(
          lock as HTMLSpanElement,
          "inpInd"
        );
        if (siblingInput instanceof HTMLInputElement) {
          (
            lock as HTMLSpanElement
          ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
          <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
        </svg>`;
        } else {
          const error = new Error();
          const splitError = (error.stack as string).split("\n");
          const slicedError = splitError[1].trim().slice(-7, -1);
          ErrorHandler.inputNotFound(
            siblingInput ?? null,
            "siblingInput",
            slicedError ?? "NULL"
          );
        }
      });
    }
  } else {
    console.error(`Erro validando Locks de Tábela de Índices.
    Length obtida: ${locksTabInd?.length ?? 0};
    Todos os Elements como Span: ${
      locksTabInd.every((lock) => lock instanceof HTMLSpanElement) ?? false
    }`);
  }
}

export function getNumCol(evEl: Element): targNum {
  let numCol: targNum = undefined;
  if (
    evEl.id.match(/[0-9]+_[0-9]+$/g) ||
    (evEl instanceof HTMLInputElement && evEl.name.match(/[0-9]+_[0-9]+$/g)) ||
    (evEl instanceof HTMLLabelElement && evEl.htmlFor.match(/[0-9]+_[0-9]+$/g))
  ) {
    numCol = parseInt(evEl.id.slice(-1), 10);
    if (Number.isNaN(numCol)) {
      console.warn(`numCol retornado como NaN. Revertido para undefined.`);
      numCol = undefined;
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.matchError(
      ".id do Elemento de Evento",
      evEl ?? null,
      evEl?.id ?? "null",
      slicedError ?? "NULL"
    );
  }
  return numCol;
}

export function validateEvResultNum(evEl: targEl, property: looseNum): number {
  if (evEl instanceof HTMLInputElement && evEl.type === "number") {
    const returnedProperty = updateSimpleProperty(evEl) || 0;
    if (typeof returnedProperty === "number") {
      property = returnedProperty;
    } else if (typeof returnedProperty === "string") {
      property = parseInt(returnedProperty.replaceAll(/[^0-9.,+-]/g, "")) || 0;
      if (Number.isNaN(property)) {
        console.warn(`Propriedade de input para ${
          evEl?.id ?? "undefined Event Element"
        }
        retornada como NaN e revertida para 0.`);
        property = 0;
      }
    } else {
      const error = new Error();
      const splitError = (error.stack as string as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.typeError(
        `property relacionada a ${evEl?.id ?? "undefined Event Element"}`,
        property,
        "number",
        slicedError ?? "NULL"
      );
      property = 0;
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.inputNotFound(
      evEl,
      `${evEl?.id ?? "undefined Event Element"}`,
      slicedError ?? "NULL"
    );
    property = 0;
  }
  return property;
}

export function matchPersonPropertiesWH(
  person: formPerson,
  targInpWeight: targEl,
  targInpHeight: targEl
) {
  if (targInpWeight instanceof HTMLInputElement) {
    person.weight = validateEvResultNum(targInpWeight, person.weight);
  } else {
    const error = new Error();
    const splitError = (error.stack as string)?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.inputNotFound(
      targInpWeight ?? null,
      "targInpWeight",
      slicedError ?? "NULL"
    );
  }
  if (targInpHeight instanceof HTMLInputElement) {
    person.height = validateEvResultNum(targInpHeight, person.height);
  } else {
    const error = new Error();
    const splitError = (error.stack as string)?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.inputNotFound(
      targInpHeight ?? null,
      "targInpHeight",
      slicedError ?? "NULL"
    );
  }
  return [person.weight, person.height];
}

export function matchPersonPropertiesDC(
  person: formPerson,
  targInpSumDCut: targEl
) {
  if (targInpSumDCut instanceof HTMLInputElement) {
    person.sumDCut = validateEvResultNum(targInpSumDCut, person.sumDCut);
  } else {
    const error = new Error();
    const splitError = (error.stack as string)?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.inputNotFound(
      targInpSumDCut ?? null,
      "targInpSumDCut",
      slicedError ?? "NULL"
    );
  }
  return person.sumDCut;
}

export function updateIndexesContexts(
  person: formClassPerson,
  gordCorpLvl: HTMLSelectElement,
  targInpIMC: HTMLInputElement,
  targInpMLG: HTMLInputElement,
  targInpTMB: HTMLInputElement,
  targInpGET: HTMLInputElement,
  formTMBTypeElement: HTMLSelectElement,
  factorAtvLvl: number,
  factorAtleta: string
) {
  let IMC = 0;
  let MLG = 0;
  let TMB = 0;
  let GET = 0;
  let IMCMLGArray = person.calcIMC(person) ?? ["", 0, 0];
  if (Number.isNaN(IMCMLGArray[1]) || isNaN(IMCMLGArray[1])) {
    console.warn(`IMCMLGCArray[1] retornando como NaN`);
    IMCMLGArray[1] = 0;
  }
  IMC = parseFloat(IMCMLGArray[1].toFixed(4)) ?? 0;
  if (Number.isNaN(IMCMLGArray[2]) || isNaN(IMCMLGArray[2])) {
    console.warn(`IMCMLGCArray[2] retornando como NaN`);
    IMCMLGArray[2] = 0;
  }
  MLG = parseFloat(IMCMLGArray[2].toFixed(4)) ?? 0;
  updateIMCMLGContext(
    IMCMLGArray,
    gordCorpLvl,
    targInpIMC,
    targInpMLG,
    formTMBTypeElement,
    "NONE"
  );
  if (IMCMLGArray[0] === "" || IMCMLGArray[1] === 0 || IMCMLGArray[2] === 0) {
    console.warn(`IMCMLGArray não atualizado.
              Valores obtidos: ${IMCMLGArray[0] ?? "null"}; ${
      IMCMLGArray[1] ?? 0
    }; ${IMCMLGArray[2] ?? 0} }`);
  }
  TMB = updateTMBContext(
    IMCMLGArray ?? [gordCorpLvl.value, 0, 0],
    person,
    factorAtleta,
    formTMBTypeElement,
    targInpTMB
  );
  if (TMB >= 0 && factorAtvLvl) {
    GET = updateGETContext(person, targInpGET, TMB, factorAtvLvl);
  } else {
    console.warn(
      `Valor de TMB obtido: ${TMB};
    factorAtvLvl obtido: ${factorAtvLvl ?? 0}`
    );
    targInpGET.value = "0";
  }
  return [IMC, MLG, TMB, GET];
}

export function updateIMCMLGContext(
  IMCMLGArray: looseNum[],
  gordCorpLvl: Element,
  targInpIMC: Element,
  targInpMLG: Element,
  formTMBTypeElement: Element,
  ignoredIndex: string
): void {
  let IMC = 0;
  let MLG = 0;
  if (
    gordCorpLvl instanceof HTMLSelectElement &&
    targInpIMC instanceof HTMLInputElement &&
    targInpMLG instanceof HTMLInputElement &&
    formTMBTypeElement instanceof HTMLSelectElement &&
    (ignoredIndex === "MLG" ||
      ignoredIndex === "IMC" ||
      ignoredIndex === "BOTH" ||
      ignoredIndex === "NONE")
  ) {
    if (
      !(ignoredIndex === "MLG" || ignoredIndex === "BOTH") &&
      typeof IMCMLGArray[2] === "number"
    ) {
      MLG = IMCMLGArray[2];
      targInpMLG.value = MLG.toFixed(4) || "0";
    } else {
      const error = new Error();
      const splitError = (error.stack as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.typeError(
        "IMCMLGArray[2]",
        IMCMLGArray[2] ?? null,
        "number",
        slicedError ?? "NULL"
      );
    }
    if (
      !(ignoredIndex === "IMC" || ignoredIndex === "BOTH") &&
      typeof IMCMLGArray[1] === "number"
    ) {
      IMC = IMCMLGArray[1];
      targInpIMC.value = IMC.toFixed(4) || "0";
    } else {
      const error = new Error();
      const splitError = (error.stack as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.typeError(
        "IMCMLGArray[1]",
        IMCMLGArray[1] ?? null,
        "number",
        slicedError ?? "NULL"
      );
    }
    if (typeof IMCMLGArray[0] === "string") {
      gordCorpLvl.value = IMCMLGArray[0] || "";
      fluxFormIMC(IMC, formTMBTypeElement, gordCorpLvl);
    } else {
      const error = new Error();
      const splitError = (error.stack as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.typeError(
        "IMCMLGArray[0]",
        IMCMLGArray[0] ?? null,
        "string",
        slicedError ?? "NULL"
      );
    }
    if (IMCMLGArray[0] === "" || IMCMLGArray[1] === 0 || IMCMLGArray[2] === 0) {
      console.warn(`IMCMLGArray não atualizado.
      Valores obtidos: ${IMCMLGArray[0] ?? "null"}; ${IMCMLGArray[1] ?? 0}; ${
        IMCMLGArray[2] ?? 0
      } }`);
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.multipleElementsNotFound(
      slicedError ?? "NULL",
      "instâncias de elementos em updateIMCMLGContext",
      gordCorpLvl ?? null,
      targInpIMC ?? null,
      targInpMLG ?? null,
      formTMBTypeElement ?? null
    );
    console.warn(`ignoredIndex: ${ignoredIndex}`);
  }
}

export function fluxFormIMC(
  IMC: number,
  formTMBTypeElement: Element,
  gordCorpLvl: Element
) {
  if (
    formTMBTypeElement instanceof HTMLSelectElement &&
    formTMBTypeElement.value !== "" &&
    gordCorpLvl instanceof HTMLSelectElement &&
    gordCorpLvl.value !== ""
  ) {
    if (IMC >= 0 && IMC < 25.0) {
      formTMBTypeElement.value = "harrisBenedict";
      if (IMC < 18.5) {
        gordCorpLvl.value = "abaixo";
      } else if (IMC >= 18.5) {
        gordCorpLvl.value = "eutrofico";
      }
    } else if (IMC >= 25.0) {
      formTMBTypeElement.value = "mifflinStJeor";
      if (IMC < 30) {
        gordCorpLvl.value = "sobrepeso";
        formTMBTypeElement.value = "mifflinStJeor";
      } else if (IMC >= 30 && IMC < 35) {
        gordCorpLvl.value = "obeso1";
        formTMBTypeElement.value = "mifflinStJeor";
      } else if (IMC >= 35 && IMC < 40) {
        gordCorpLvl.value = "obeso2";
        formTMBTypeElement.value = "mifflinStJeor";
      } else if (IMC > 40) {
        gordCorpLvl.value = "obeso3";
        formTMBTypeElement.value = "mifflinStJeor";
      }
    } else {
      console.error(`Erro obtendo valor de IMC em função fluxFormImc().
      Valor obtido: ${IMC ?? "NaN"}`);
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.multipleElementsNotFound(
      slicedError ?? "NULL",
      "obtendo formTMBTypeElement e/ou gordCorpLvl Element",
      formTMBTypeElement ?? null,
      gordCorpLvl ?? null
    );
  }
}

export function updateTMBContext(
  IMCMLGArray: [string, number, number],
  person: formClassPerson,
  factorAtleta: string,
  formTMBTypeElement: Element,
  targInpTMB: HTMLInputElement
) {
  let TMB = 0;
  if (IMCMLGArray.length === 3) {
    const TMBArray = person.calcTMB(
      person,
      IMCMLGArray[1] ?? 0,
      factorAtleta,
      IMCMLGArray[2] ?? 0
    ) ?? ["", 0];
    if (formTMBTypeElement instanceof HTMLSelectElement) {
      formTMBTypeElement.value = TMBArray[0];
    } else {
      console.error(`Erro validando campo de Fórmula para TMB.
      Instância obtida: ${
        Object.prototype.toString.call(formTMBTypeElement).slice(8, -1) ??
        "null"
      }.}`);
    }
    TMB = parseFloat(TMBArray[1].toFixed(4)) ?? 0;
    if (Number.isNaN(TMB) || isNaN(TMB)) {
      console.warn(`TMB retornando como NaN`);
      TMB = 0;
    }
    targInpTMB.value = TMB.toString();
  } else {
    console.error(
      `Erro validando argumentos.
      IMC obtido: ${IMCMLGArray[1]};
      MLG obtido: ${IMCMLGArray[2]};
      factorAtleta obtido: ${factorAtleta}`
    );
  }
  return TMB;
}

export function matchTMBElements(
  mainSelect: Element,
  formTMBTypeElement: Element,
  spanFactorAtleta: Element,
  gordCorpLvl: Element,
  lockGordCorpLvl: Element,
  IMC: number
): void {
  if (!IMC) {
    IMC = 0;
  }
  if (
    mainSelect instanceof HTMLSelectElement &&
    formTMBTypeElement instanceof HTMLSelectElement &&
    spanFactorAtleta instanceof HTMLSpanElement &&
    gordCorpLvl instanceof HTMLSelectElement &&
    lockGordCorpLvl instanceof HTMLSpanElement
  ) {
    switch (formTMBTypeElement.value) {
      case "harrisBenedict":
        fluxFormIMC(IMC, formTMBTypeElement, gordCorpLvl);
        break;
      case "mifflinStJeor":
        fluxFormIMC(IMC, formTMBTypeElement, gordCorpLvl);
        break;
      case "tinsley":
        mainSelect.value === "muitoIntenso";
        break;
    }
    if (mainSelect.value === "muitoIntenso") {
      formTMBTypeElement.value = "tinsley";
      spanFactorAtleta.hidden = false;
    } else if (
      mainSelect.value === "sedentario" ||
      mainSelect.value === "leve" ||
      mainSelect.value === "moderado" ||
      mainSelect.value === "intenso"
    ) {
      spanFactorAtleta.hidden = true;
      if (
        gordCorpLvl.value === "sobrepeso" ||
        gordCorpLvl.value === "obeso1" ||
        gordCorpLvl.value === "obeso2" ||
        gordCorpLvl.value === "obeso3" ||
        (IMC && IMC >= 25)
      ) {
        formTMBTypeElement.value = "mifflinStJeor";
      } else if (
        gordCorpLvl.value === "abaixo" ||
        gordCorpLvl.value === "eutrofico" ||
        (IMC && IMC < 25)
      ) {
        formTMBTypeElement.value = "harrisBenedict";
      } else {
        console.error(`Erro obtendo valor de Gordura Corporal.
        Nível de Gordura Corporal obtido: ${gordCorpLvl?.value ?? "null"};
        IMC obtido: ${IMC ?? 0}.`);
      }
    } else {
      console.error(`Erro obtendo valor de mainSelect.
      Valor obtido: ${mainSelect.value || "null"}`);
    }
    if (
      mainSelect.value === "muitoIntenso" ||
      formTMBTypeElement.value === "tinsley"
    ) {
      lockGordCorpLvl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
      <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
    </svg>`;
    } else {
      lockGordCorpLvl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
    </svg>`;
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.multipleElementsNotFound(
      slicedError ?? "NULL",
      "argumentos em matchTMBElements()",
      mainSelect ?? null,
      formTMBTypeElement ?? null,
      spanFactorAtleta ?? null,
      gordCorpLvl ?? null,
      lockGordCorpLvl ?? null
    );
    console.warn(
      `Tipo primitivo obtido para IMC: ${typeof IMC ?? "undefined"}.`
    );
  }
}

export function updateGETContext(
  person: formClassPerson,
  targInpGET: HTMLInputElement,
  TMB: number,
  factorAtvLvl: number
) {
  let GET = parseFloat(person.calcGET(TMB || 0, factorAtvLvl).toFixed(4)) ?? 0;
  if (Number.isNaN(GET) || isNaN(GET)) {
    console.warn(`GET retornando como NaN`);
    GET = 0;
  }
  targInpGET.value = GET.toString();
  return GET;
}

export function updatePGC(
  person: formClassPerson,
  numRef: number,
  context: string,
  parentElement: Element
): [number, targEl, targEl] {
  let targInpPGC: targEl = undefined;
  let targInpSumDCut: targEl = undefined;
  let PGC = 0;
  if (context === "cons" || context === "tab") {
    if (context === "cons") {
      targInpPGC = parentElement.querySelector(
        `#inpPgc${numRef}Cel4_${numRef + 1}`
      );
    } else if (context === "tab") {
      targInpPGC = parentElement.querySelector(
        `#inpPgc${numRef - 1}Cel4_${numRef}`
      );
      targInpSumDCut = parentElement.querySelector(`#tabInpRowDCut9_${numRef}`);
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.stringError(
      "validando contexto.  Valores de string aceitos: cons || tab.",
      context ?? "undefined",
      slicedError ?? "NULL"
    );
  }

  if (
    targInpSumDCut instanceof HTMLInputElement &&
    targInpSumDCut.type === "number"
  ) {
    person.sumDCut = parseInt(targInpSumDCut?.value ?? 0);
    targInpSumDCut.value = person.sumDCut.toString();
  } else {
    const error = new Error();
    const splitError = (error.stack as string as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.inputNotFound(
      targInpSumDCut,
      "targInpSumDCut",
      slicedError ?? "NULL"
    );
  }

  if (targInpPGC instanceof HTMLInputElement && targInpPGC.type === "number") {
    PGC = parseFloat(person.calcPGC(person).toFixed(4)) ?? 0;
    if (Number.isNaN(PGC) || isNaN(PGC)) {
      console.warn(`PGC retornando como NaN`);
      PGC = 0;
    }
    const PGCDecayArray = Model.isPGCDecaying(person, PGC, targInpPGC);
    if (PGCDecayArray[0] === true) {
      PGC = PGCDecayArray[1];
      targInpPGC.value = PGC.toFixed(2);
    } else {
      targInpPGC.value = PGC.toFixed(4);
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.inputNotFound(targInpPGC, "targInpPGC", slicedError ?? "NULL");
  }
  if (PGC <= 0) {
    console.warn(`Valor de PGC não atualizado.
    Valor obtido: ${PGC || 0}`);
  }
  return [PGC ?? 0, targInpSumDCut ?? null, targInpPGC ?? null];
}

export function updateAtvLvl(
  mainSelect: HTMLSelectElement,
  atvLvl: string,
  secondarySelect: HTMLSelectElement
): string {
  const returnedAtvLvl = updateSimpleProperty(mainSelect) ?? "";
  if (typeof returnedAtvLvl === "string") {
    atvLvl = returnedAtvLvl;
    secondarySelect.value = atvLvl;
  } else {
    const error = new Error();
    const splitError = (error.stack as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.typeError(
      "atualização de mainSelect em updateAtLvl()",
      returnedAtvLvl ?? null,
      "string",
      slicedError ?? "NULL"
    );
  }
  return atvLvl;
}

export function addRowAtivFis(container: Element): void {
  if (
    container instanceof HTMLButtonElement &&
    container.tagName === "BUTTON"
  ) {
    if (container.classList.contains("addAtFisRot")) {
      const tBodyContainer = document.getElementById("tabTbodyAtFisRot");
      const newRow = document.createElement("tr");
      newRow.className = "contQuint tabRowAtFisRot";
      newRow.id = `tabRowAtFisRotId${rowCountAtivFisRot}`;
      // newRow.itemprop = "rowAtFisRot";
      newRow.innerHTML = `
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_1" itemprop="celAtFisRot">${
        rowCountAtivFisRot - 1
      }&#41</td>
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_2" itemprop="celAtFisRot">
        <input type="text" min="0" max="255" class="contSet tabInpAtFisRot tabInpRowAtFisRot2" id="tabInpRowAtFisRot${rowCountAtivFisRot}_1" itemprop="inpAtFisRot" />
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_3" itemprop="celAtFisRot">
        <input type="number" min="0" max="255" class="contSet inpAtivFis tabInpAtFisRot tabInpRowAtFisRot2" id="tabInpRowAtFisRot${rowCountAtivFisRot}_2" itemprop="inpAtFisRot" />
      </td>
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_4" itemprop="celAtFisRot">
        <input type="number" min="0" max="255" class="contSet tabInpAtFisRot tabInpRowAtFisRot2" id="tabInpRowAtFisRot${rowCountAtivFisRot}_3" itemprop="inpAtFisRot" />
      </td>
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_5" itemprop="celAtFisRot">
        <input type="number" min="0" max="255" class="contSet tabInpAtFisRot tabInpRowAtFisRot2" id="tabInpRowAtFisRot${rowCountAtivFisRot}_4" itemprop="inpAtFisRot" />
      </td>
        `;
      if (tBodyContainer) {
        tBodyContainer.appendChild(newRow);
        const numInps: NodeListOf<HTMLInputElement> = newRow.querySelectorAll(
          'input[type="number"]'
        );
        const textElements: NodeListOf<HTMLInputElement> =
          newRow.querySelectorAll('input[type="text"]');
        for (let iT = 0; iT < textElements.length; iT++) {
          textElements[iT].addEventListener("input", () =>
            Model.autoCapitalizeInputs(textElements[iT])
          );
        }
        for (let iN = 0; iN < numInps.length; iN++) {
          numInps[iN].addEventListener("input", () =>
            Model.numberLimit(numInps[iN])
          );
        }
      }
      rowCountAtivFisRot++;
    } else if (container.classList.contains("removeAtFisRot")) {
      const validParent = document.getElementById("tabAtFisRot");
      if (validParent) {
        const siblingsCollection = validParent.children;
        const validNextParent =
          siblingsCollection.namedItem(`tabTbodyAtFisRot`);
        if (validNextParent) {
          const nextSiblingsCollection = validNextParent.children;
          const rowToRemove = nextSiblingsCollection.namedItem(
            `tabRowAtFisRotId${rowCountAtivFisRot - 1}`
          );
          if (
            rowToRemove &&
            rowCountAtivFisRot !== 3 &&
            rowToRemove.id !== "tabRowAtFisRotId2"
          ) {
            rowToRemove.remove();
            rowCountAtivFisRot -= 1;
          }
        }
      }
    } else if (container.classList.contains("addAtFisProp")) {
      const tBodyContainer = document.getElementById("tabTbodyAtFisProp");
      const newRow = document.createElement("tr");
      newRow.className = "contQuint tabRowAtFisProp";
      newRow.id = `tabRowAtFisPropId${rowCountAtivFisProp}`;
      // newRow.itemprop = "rowAtFisProp";
      newRow.innerHTML = `
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_1" itemprop="celAtFisProp">${
        rowCountAtivFisProp - 1
      }&#41</td>
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_2" itemprop="celAtFisProp">
        <input type="text" min="0" max="255" class="contSet tabInpAtFisProp tabInpRowAtFisProp2" id="tabInpRowAtFisProp${rowCountAtivFisProp}_1" itemprop="inpAtFisProp" required />
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_3" itemprop="celAtFisProp">
        <input type="number" min="0" max="255" class="contSet inpAtivFis tabInpAtFisProp tabInpRowAtFisProp2" id="tabInpRowAtFisProp${rowCountAtivFisProp}_2" itemprop="inpAtFisProp" required />
      </td>
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_4" itemprop="celAtFisProp">
        <input type="number" min="0" max="255" class="contSet tabInpAtFisProp tabInpRowAtFisProp2" id="tabInpRowAtFisProp${rowCountAtivFisProp}_3" itemprop="inpAtFisProp" required />
      </td>
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_5" itemprop="celAtFisProp">
        <input type="number" min="0" max="255" class="contSet tabInpAtFisProp tabInpRowAtFisProp2" id="tabInpRowAtFisProp${rowCountAtivFisProp}_4" itemprop="inpAtFisProp" required />
      </td>
        `;
      if (tBodyContainer) {
        tBodyContainer.appendChild(newRow);
        const numInps: NodeListOf<HTMLInputElement> = newRow.querySelectorAll(
          'input[type="number"]'
        );
        const textElements: NodeListOf<HTMLInputElement> =
          newRow.querySelectorAll('input[type="text"]');
        for (let iT = 0; iT < textElements.length; iT++) {
          textElements[iT].addEventListener("input", () =>
            Model.autoCapitalizeInputs(textElements[iT])
          );
        }
        for (let iN = 0; iN < numInps.length; iN++) {
          numInps[iN].addEventListener("input", () =>
            Model.numberLimit(numInps[iN])
          );
        }
      }
      rowCountAtivFisProp++;
    } else if (container.classList.contains("removeAtFisProp")) {
      const validParent = document.getElementById("tabAtFisProp");
      if (validParent) {
        const siblingsCollection = validParent.children;
        const validNextParent =
          siblingsCollection.namedItem(`tabTbodyAtFisProp`);
        if (validNextParent) {
          const nextSiblingsCollection = validNextParent.children;
          const rowToRemove = nextSiblingsCollection.namedItem(
            `tabRowAtFisPropId${rowCountAtivFisProp - 1}`
          );
          if (
            rowToRemove &&
            rowCountAtivFisProp !== 3 &&
            rowToRemove.id !== "tabRowAtFisPropId2"
          ) {
            rowToRemove.remove();
            rowCountAtivFisProp -= 1;
          }
        }
      }
    }
  }
}

export function addRowComorb(container: Element): void {
  if (container.tagName === "BUTTON" && container.id === "addComorb") {
    const parentTab = document.getElementById("tabComorb");
    const newComorbRow = document.createElement("tr");
    newComorbRow.className = "contTerc tabRowComorb";
    newComorbRow.id = `tabRowComorb${rowCountComorb}`;
    newComorbRow.innerHTML = `
    <td class="contQuat tabCelComorb tabCelRowComorb${rowCountComorb}" id="tabCelRowComorb${rowCountComorb}_1">${
      rowCountComorb - 1
    }</td>
    <td class="contQuat tabCelComorb tabCelRowComorb${rowCountComorb}" id="tabCelRowComorb${rowCountComorb}_2">
      <input type="text" class="contQuint tabInpComorb tabInpRowComorb${rowCountComorb}" id="tablInpRowComorb${rowCountComorb}_2"/>
    </td>
    <td class="contQuat tabCelComorb tabCelRowComorb${rowCountComorb}" id="tabCelRowComorb${rowCountComorb}_3">
      <input type="date" class="contQuint tabInpComorb tabInpRowComorb${rowCountComorb} id="tablInpRowComorb${rowCountComorb}_3"/>
    </td>
    `;

    if (parentTab) {
      parentTab.appendChild(newComorbRow);
      rowCountComorb++;
    }
  } else if (
    container.tagName === "BUTTON" &&
    container.id === "removeComorb"
  ) {
    const validComorbParent = document.getElementById("tabComorb");
    if (validComorbParent) {
      const siblingsComorbCollection = validComorbParent.children;
      if (validComorbParent) {
        const comorbRowToRemove = siblingsComorbCollection.namedItem(
          `tabRowComorb${rowCountComorb - 1}`
        );
        if (
          comorbRowToRemove &&
          rowCountComorb !== 3 &&
          comorbRowToRemove.id !== "tabRowComorb2"
        ) {
          comorbRowToRemove.remove();
          rowCountComorb--;
        }
      }
    }
  }
}

export function useCurrentDate(
  activation: Event,
  dateBtn: HTMLButtonElement
): void {
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = (dataAtual.getMonth() + 1)
    .toString()
    .padStart(2, "0")
    .replaceAll("'", "");
  const dia = dataAtual
    .getDate()
    .toString()
    .padStart(2, "0")
    .replaceAll("'", "");

  if (
    activation.target === dateBtn &&
    dateBtn.previousElementSibling &&
    dateBtn.previousElementSibling.tagName === "INPUT" &&
    dateBtn.previousElementSibling instanceof HTMLInputElement
  ) {
    dateBtn.previousElementSibling.value = ano + "-" + mes + "-" + dia;
  }
}

function searchPreviousSiblings(
  currentElement: Element,
  searchedSiblingClass: string
): Element {
  while (currentElement.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    let isSiblingValid: boolean =
      currentElement.classList.contains(searchedSiblingClass);
    if (isSiblingValid) {
      break;
    }
  }
  return currentElement;
}

export function switchRequiredCols(elements: HTMLElement[]) {
  if (elements.length > 0 && elements[1] instanceof HTMLSelectElement) {
    const consTablesFs = elements[0];
    const numConsElement = elements[1];
    const tabSVi = elements[2];
    const tabMedAnt = elements[3];
    const tabDC = elements[4];
    const tabIndPerc = elements[5];
    let numCons = parseInt(numConsElement?.value || "1");
    console.log("numcons " + numCons);
    if (Number.isNaN(numCons)) {
      console.warn(`numCons retornado como NaN, revertido para 1`);
      numCons = 1;
    }

    //adiciona listener para responder à mudança no valor de consulta
    let returnedNum = parseInt(
      (updateSimpleProperty(numConsElement) as string) ?? "0",
      10
    );
    if (Number.isNaN(returnedNum)) {
      console.warn(`returnedNum retornado como NaN, revertido para 0`);
      returnedNum = 0;
    }
    if (
      typeof returnedNum === "number" &&
      returnedNum > 0 &&
      returnedNum <= 3
    ) {
      numCons = returnedNum;
      console.log("numcons " + numCons);
      //inicia construção de matriz para reset de required na tabela
      const totalTables = consTablesFs?.querySelectorAll("table");
      const totalRows = consTablesFs?.querySelectorAll("tr");
      console.log(totalRows);
      let nTotalRows = 0;
      if (totalRows && totalRows.length > 0) {
        nTotalRows = totalRows.length - totalTables.length;
      } else {
        const error = new Error();
        const splitError = (error.stack as string).split("\n");
        const slicedError = splitError[1].trim().slice(-7, -1);
        ErrorHandler.elementNotPopulated(
          totalRows ?? null,
          "NodeList de elementos <tr> em switchRequiredCols()",
          slicedError ?? "NULL"
        );
      }

      const totalCols = consTablesFs?.querySelectorAll("col");
      let nTotalCols = 0;
      if (totalCols && totalCols.length > 0) {
        nTotalCols = totalCols.length - totalTables.length;
      } else {
        const error = new Error();
        const splitError = (error.stack as string).split("\n");
        const slicedError = splitError[1].trim().slice(-7, -1);
        ErrorHandler.elementNotPopulated(
          totalCols ?? null,
          "NodeList de elementos <col> em switchRequiredCols()",
          slicedError ?? "NULL"
        );
      }

      let nTotalMatrixValidAxes = 0;
      if (
        nTotalRows !== 0 &&
        !Number.isNaN(nTotalRows) &&
        nTotalCols !== 0 &&
        !Number.isNaN(nTotalCols)
      ) {
        nTotalMatrixValidAxes = (nTotalRows - 1) * (nTotalCols - 1);
      } else {
        console.error(`Erro na construção da Matriz para eixos de preenchimento.
        Número de Linhas obtidas: ${nTotalRows ?? 0};
        Número de Colunas obtidas: ${nTotalCols ?? 0}.`);
      }

      //captura elementos de input para reset baseado nas matrizes inpsCells e nTotalMatrixValidAxes
      const inpsCellsSVi = tabSVi.querySelectorAll(".tabInpProgSVi");
      const inpsCellsMedAnt = tabMedAnt.querySelectorAll(".tabInpProgMedAnt");
      const inpsCellsDC = tabDC.querySelectorAll(".tabInpProgCons");
      const inpsCellsIndPerc = tabIndPerc.querySelectorAll(".inpInd");
      const inpsCells = [
        ...inpsCellsSVi,
        ...inpsCellsMedAnt,
        ...inpsCellsDC,
        ...inpsCellsIndPerc,
      ];

      //reseta o atributo required das cells para novas atribuições de required
      if (inpsCells.length > 0 && inpsCells.length === nTotalMatrixValidAxes) {
        inpsCells.forEach((inpCel) => {
          if (inpCel instanceof HTMLInputElement) {
            inpCel.required = false;
          } else {
            const error = new Error();
            const splitError = (error.stack as string).split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.inputNotFound(
              inpCel ?? null,
              "inpCel",
              slicedError ?? "NULL"
            );
          }
        });
      } else {
        console.error(`Erro na determinação de .length do array de Input em Células.
        Número obtido: ${inpsCells.length ?? 0};
        Equivale ao número desejado para a matriz de Eixos de Preenchimento: ${
          inpsCells.length === nTotalMatrixValidAxes ?? false
        };
        Número aceito: ${nTotalMatrixValidAxes / totalTables.length};
        Número de Inputs para Sinais Vitais obtido: ${
          inpsCellsSVi?.length ?? 0
        };
        Número de Inputs para Medidas Antropométricas obtido: ${
          inpsCellsMedAnt?.length ?? 0
        };
        Número de Inputs para Dobras Cutâneas obtido: ${
          inpsCellsDC?.length ?? 0
        };
        Número de Inputs para Índices e Percentuais obtido: ${
          inpsCellsIndPerc?.length ?? 0
        }.`);
      }

      //determinação das novas cells required
      let validInpsNodeLists = [false, false, false, false];

      //formação das matrizes para validar os números de inputs obtidos para cada tabela
      const nRowsSVi = tabSVi.querySelectorAll("tr");
      const nColsSVi = tabSVi.querySelectorAll("col");
      let matrixValidAxesSVi = 0;
      if (nRowsSVi.length > 0 && nColsSVi.length > 0) {
        matrixValidAxesSVi = (nRowsSVi.length - 1) * (nColsSVi.length - 1);
      } else {
        console.error(`Erro validando Número de Linhas na Tabela de Sinais Vitais.
        Número de Linhas obtidas: ${nRowsSVi?.length ?? 0};
        Número de Colunas obtidas: ${nColsSVi?.length ?? 0}.`);
      }

      const nRowsMedAnt = tabMedAnt.querySelectorAll("tr");
      const nColsMedAnt = tabMedAnt.querySelectorAll("col");
      let matrixValidAxesMedAnt = 0;
      if (nRowsMedAnt.length > 0 && nColsMedAnt.length > 0) {
        matrixValidAxesMedAnt =
          (nRowsMedAnt.length - 1) * (nColsMedAnt.length - 1);
      } else {
        console.error(`Erro validando Número de Linhas na Tabela de Medidas Antropométricas.
        Número de Linhas obtidas: ${nRowsMedAnt?.length ?? 0};
        Número de Colunas obtidas: ${nColsMedAnt?.length ?? 0}.`);
      }

      const nRowsDC = tabDC.querySelectorAll("tr");
      const nColsDC = tabDC.querySelectorAll("col");
      let matrixValidAxesDC = 0;
      if (nRowsDC.length > 0 && nColsDC.length > 0) {
        matrixValidAxesDC = (nRowsDC.length - 1) * (nColsDC.length - 1);
      } else {
        console.error(`Erro validando Número de Linhas na Tabela de Dobras Cutâneas.
        Número de Linhas obtidas: ${nRowsDC?.length ?? 0};
        Número de Colunas obtidas: ${nColsDC?.length ?? 0}.`);
      }

      const nRowsIndPerc = tabIndPerc.querySelectorAll("tr");
      const nColsIndPerc = tabIndPerc.querySelectorAll("col");
      let matrixValidAxesIndPerc = 0;
      if (nRowsIndPerc.length > 0 && nColsIndPerc.length > 0) {
        matrixValidAxesIndPerc =
          (nRowsIndPerc.length - 1) * (nColsIndPerc.length - 1);
      } else {
        console.error(`Erro validando Número de Linhas na Tabela de Índices e Percentuais.
        Número de Linhas obtidas: ${nRowsIndPerc?.length ?? 0};
        Número de Colunas obtidas: ${nColsIndPerc?.length ?? 0}.`);
      }

      //validação das NodeLists de Inputs nas células
      if (
        Array.from(inpsCellsSVi).every(
          (inpCell) => inpCell instanceof HTMLInputElement
        ) &&
        inpsCellsSVi.length > 0 &&
        inpsCellsSVi.length === matrixValidAxesSVi
      ) {
        validInpsNodeLists[0] = true;
      } else {
        console.warn(`Erro capturando inputs de Sinais Vitais com querry.
          Array obtido: ${JSON.stringify(inpsCellsSVi) ?? "null"};
          Todos os elementos como HTMLInputs: ${
            Array.from(inpsCellsSVi).every(
              (inpCell) => inpCell instanceof HTMLInputElement
            ) ?? false
          };
          Length esperada: ${matrixValidAxesSVi ?? 0}.`);
      }

      if (
        Array.from(inpsCellsMedAnt).every(
          (inpCell) => inpCell instanceof HTMLInputElement
        ) &&
        inpsCellsMedAnt.length > 0 &&
        inpsCellsMedAnt.length === matrixValidAxesMedAnt
      ) {
        validInpsNodeLists[1] = true;
      } else {
        console.warn(`Erro capturando inputs de Medidas Antropométricas com querry.
          Array obtido: ${JSON.stringify(inpsCellsMedAnt) ?? "null"};
          Todos os elementos como HTMLInputs: ${
            Array.from(inpsCellsMedAnt).every(
              (inpCell) => inpCell instanceof HTMLInputElement
            ) ?? false
          };
          Length esperada: ${matrixValidAxesMedAnt ?? 0}`);
      }

      if (
        Array.from(inpsCellsDC).every(
          (inpCell) => inpCell instanceof HTMLInputElement
        ) &&
        inpsCellsDC.length > 0 &&
        inpsCellsDC.length === matrixValidAxesDC
      ) {
        validInpsNodeLists[2] = true;
      } else {
        console.warn(`Erro capturado inputs de Dobras Cutâneas com querry.
          Array obtido: ${JSON.stringify(inpsCellsDC) ?? "null"};
          Todos os elementos como HTMLInputs: ${
            Array.from(inpsCellsDC).every(
              (inpCell) => inpCell instanceof HTMLInputElement
            ) ?? false
          };
          Length esperada: ${matrixValidAxesDC ?? 0}`);
      }

      if (
        Array.from(inpsCellsIndPerc).every(
          (inpCell) => inpCell instanceof HTMLInputElement
        ) &&
        inpsCellsIndPerc.length > 0 &&
        inpsCellsIndPerc.length === matrixValidAxesIndPerc
      ) {
        validInpsNodeLists[3] = true;
      } else {
        console.warn(`Erro capturando inputs de Índices e Percentuais com querry.
          Array obtido: ${JSON.stringify(inpsCellsIndPerc) ?? "null"};
          Todos os elementos como HTMLInputs: ${
            Array.from(inpsCellsIndPerc).every(
              (inpCell) => inpCell instanceof HTMLInputElement
            ) ?? false
          };
          Length esperada: ${matrixValidAxesIndPerc ?? 0}`);
      }

      let consRequiredCellsSVi = [];
      let consRequiredCellsMedAnt = [];
      let consRequiredCellsDC = [];
      let consRequiredCellsIndPerc = [];
      //validação de NodeLists para inputs nas tabelas
      if (
        validInpsNodeLists.every(
          (inpsNodeListValidation) => inpsNodeListValidation === true
        )
      ) {
        /* percorre a tabela usando o número de consulta como números de ciclos
        ou seja, length dos arrays formados pelas querries === length do número de consulta === número de colunas
        + são extraídas as células de interesse, com base na .id relativa à coluna, e então populam requiredCels */
        for (let iC = 0; iC < numCons; iC++) {
          const filterPattern = new RegExp(`_${iC + 2}`);
          const filterInpCellSVi = Array.from(inpsCellsSVi).filter(
            (inpCellSVi) => filterPattern.test(inpCellSVi.id)
          );
          if (filterInpCellSVi.length > 0) {
            consRequiredCellsSVi.push(filterInpCellSVi);
          } else {
            console.warn(
              `Erro na filtragem de .id dos elementos da Tabela de Sinais Vitais, coluna ${iC}.`
            );
          }
          const filterInpCellMedAnt = Array.from(inpsCellsMedAnt).filter(
            (inpCellMedAnt) => filterPattern.test(inpCellMedAnt.id)
          );
          if (filterInpCellMedAnt.length > 0) {
            consRequiredCellsMedAnt.push(filterInpCellMedAnt);
          } else {
            console.warn(
              `Erro na filtragem de .id dos elementos da Tabela de Medidas Antropomórfias, coluna ${iC}.`
            );
          }
          const filterInpCellDC = Array.from(inpsCellsDC).filter((inpCellDC) =>
            filterPattern.test(inpCellDC.id)
          );
          if (filterInpCellDC.length > 0) {
            consRequiredCellsDC.push(filterInpCellDC);
          } else {
            console.warn(
              `Erro na filtragem de .id dos elementos da Tabela de Dobras Cutâneas, coluna ${iC}.`
            );
          }
          const filterInpCellIndPerc = Array.from(inpsCellsIndPerc).filter(
            (inpCellIndPerc) =>
              filterPattern.test((inpCellIndPerc as HTMLInputElement).name)
          );
          if (filterInpCellIndPerc.length > 0) {
            consRequiredCellsIndPerc.push(filterInpCellIndPerc);
          } else {
            console.warn(
              `Erro na filtragem de .id dos elementos da Tabela de Índices e Percentuais, coluna ${iC}.`
            );
          }
        }
      } else {
        console.error(`Erro na validação de NodeLists de Inputs nas Tabelas.
        Array de Validação para NodeLists obtido: ${
          JSON.stringify(validInpsNodeLists) ?? "undefined"
        }`);
      }

      let requiredCells = [
        ...consRequiredCellsSVi,
        ...consRequiredCellsMedAnt,
        ...consRequiredCellsDC,
        ...consRequiredCellsIndPerc,
      ];

      const flatRequiredCells = requiredCells.flat(1);
      if (
        flatRequiredCells.length > 0 &&
        flatRequiredCells.length === nTotalRows * numCons
      ) {
        for (let iR = 0; iR < flatRequiredCells.length; iR++) {
          (flatRequiredCells[iR] as HTMLInputElement).required = true;
        }
      } else {
        const error = new Error();
        const splitError = (error.stack as string).split("\n");
        const slicedError = splitError[1].trim().slice(-7, -1);
        ErrorHandler.elementNotPopulated(
          flatRequiredCells ?? null,
          "flatRequiredCells",
          slicedError ?? "NULL"
        );
      }
    } else {
      console.error(`Erro atualizando Número de Consulta.
          Número obtido: ${returnedNum ?? 0}`);
    }
  } else {
    console.error(`Erro obtendo HTMLElements a partir de operador rest.
    Length obtida: ${elements?.length ?? 0};
    Instância obtida para elements[1]: ${
      Object.prototype.toString.call(elements[1]).slice(8, -1) ?? "null"
    }`);
  }
}

export function switchNumConsTitles(
  consTitles: targEl[],
  trioEl: HTMLInputElement,
  numTitledCons: number,
  numTabs: number
) {
  let iniTrioValue = trioEl.value;
  let iniValue = parseInt(iniTrioValue) ?? 0;
  let trioNums = [];
  if (Number.isNaN(iniValue)) {
    console.warn(`iniValue retornado como NaN. Revertido para 0.`);
    for (let t = 0; t <= numTabs * numTabs - 1; t += numTitledCons / numTabs) {
      trioNums.push(1, 2, 3);
    }
  } else {
    for (let j = 0; j <= numTabs * numTabs - 1; j += numTitledCons / numTabs) {
      trioNums.push(iniValue, iniValue + 1, iniValue + 2);
    }
  }
  for (let i = 0; i < consTitles.length; i++) {
    console.log(JSON.stringify(trioNums));
    (consTitles[i] as Element).textContent = `${
      trioNums[i] || `${1 + i}`
    }ª Consulta`;
  }
}

export function createArraysRels(
  btnId: string,
  arrayRows: HTMLTableRowElement[],
  protocolo: string
) {
  let arrayConsultasNum: number[] | undefined = [];
  let rowValues: targStrArr = [];
  let tabValues: targStrArr = [];
  let columnValues: targStrArr = [];
  let colAcc = 0;
  const btnRowMatch = btnId?.match(/[0-9]+(?=_)/)?.toString();
  const btnColMatch = btnId?.match(/(?<=_)[0-9]+/)?.toString();
  if (btnColMatch && btnRowMatch) {
    let btnCol = parseInt(btnColMatch, 10);
    if (Number.isNaN(btnCol)) {
      console.warn(`btnCol retornado como NaN, revertido para 1`);
      btnCol = 1;
    }
    let btnRow = parseInt(btnRowMatch, 10);
    if (Number.isNaN(btnRow)) {
      console.warn(`btnRow retornado como NaN, revertido para 1`);
      btnRow = 1;
    }
    for (let iR = 0; iR < arrayRows.length; iR++) {
      const isValidRowArray = arrayRows.every(
        (row) => row instanceof HTMLTableRowElement
      );
      if (iR === 0 && isValidRowArray) {
        arrayConsultasNum = getConsultasNums(arrayRows[iR]); //obtém os números dos headers de consulta na forma de um array
        continue;
      }
      const nCels = arrayRows[iR].childElementCount;
      let arrayCelsIds = [];
      for (let iCh = 1; iCh < nCels; iCh++) {
        arrayCelsIds.push(arrayRows[iR].children[iCh].id);
      }
      if (iR !== arrayRows.length - 1 && arrayConsultasNum) {
        rowValues = getRowValues(arrayRows, arrayConsultasNum, arrayCelsIds);
        if (rowValues) {
          tabValues = [...tabValues, ...rowValues];
        }
      }
    }
    for (let iT = btnCol - 2; iT < tabValues.length; iT += 3) {
      columnValues = [...columnValues, tabValues[iT]];
    }
    if (
      arrayConsultasNum &&
      btnCol - 1 == arrayConsultasNum[btnCol - 2] &&
      columnValues
    ) {
      //define qual coluna será utilizada de acordo com a posição do botão e validando se há algum preenchimento na coluna
      let inputAcc = 0;
      let protocoloNum = 0;
      switch (protocolo) {
        case "pollock3":
          protocoloNum = 3;
          break;
        case "pollock7":
          protocoloNum = 7;
          break;
        default:
          const error = new Error();
          const splitError = (error.stack as string).split("\n");
          const slicedError = splitError[1].trim().slice(-7, -1);
          ErrorHandler.elementNotFound(
            protocolo ?? null,
            "protocolo",
            slicedError ?? "NULL"
          );
      }
      if (protocoloNum === 3 || protocoloNum === 7) {
        for (let iR = 0; iR < btnRow - 1; iR++) {
          const targCelInp = document.getElementById(
            `tabInpRowDCut${2 + iR}_${btnCol}`
          );
          if (targCelInp instanceof HTMLInputElement) {
            if (iR < btnRow - 2) {
              //acumula valor de inputs na coluna (em correto funcionamento, para rows sem o input de somatório)
              if (targCelInp && targCelInp.value !== "") {
                if (
                  Number.isNaN(
                    parseFloat(parseFloat(targCelInp?.value).toFixed(4))
                  )
                ) {
                  console.warn(
                    `targCelInp.value retornado como NaN, revertido para 0`
                  );
                  colAcc = 0;
                } else {
                  colAcc += parseFloat(
                    parseFloat(targCelInp?.value).toFixed(4)
                  );
                }
              }
            } else if (iR < btnRow - 1) {
              //inicia busca e validação para encontrar row do botão
              const tbodyQuery = document.getElementById("tabTbodyDCut");
              if (tbodyQuery) {
                const tBodyChildren = Array.from(tbodyQuery.children);
                if (tBodyChildren) {
                  for (let iC = 0; iC < tBodyChildren.length; iC++) {
                    const innerInp = tBodyChildren[iC].querySelector("input");
                    if (
                      !(tBodyChildren[iC] as HTMLTableRowElement).hidden &&
                      inputAcc < protocoloNum &&
                      innerInp
                    ) {
                      if (innerInp.value !== "") {
                        inputAcc++;
                      } else if (innerInp.value === "") {
                        innerInp.value = "0";
                        inputAcc++;
                      }
                    }
                  }
                } else {
                  const error = new Error();
                  const splitError = (error.stack as string).split("\n");
                  const slicedError = splitError[1].trim().slice(-7, -1);
                  ErrorHandler.elementNotPopulated(
                    tBodyChildren ?? null,
                    "tBodyChildren",
                    slicedError ?? "NULL"
                  );
                }
                //deposita valor no último input da coluna (em correto funcionamente, o de somatório)
                if (inputAcc === protocoloNum) {
                  targCelInp.value = colAcc.toString();
                  return colAcc;
                } else {
                  //TODO DIALOG DE ALERTA
                  console.warn(
                    `Número de preenchimentos insuficiente. Número obtido: ${inputAcc}; Número exigido: 3`
                  );
                }
              }
            }
          }
        }
      } else {
        console.error(`Erro obtendo número de protocolo.
        Número obtido: ${protocoloNum ?? 0}`);
      }
    } else if (!columnValues) {
      //TODO DIALOG DE ALERTA
    }
  }
  return 0;
}

function getConsultasNums(arrayRow: HTMLTableRowElement) {
  const strConsultasNum = arrayRow.innerText.replaceAll(/[\D]/g, "");
  let arrayConsultasNum: number[] = [];
  for (let iL = 0; iL < strConsultasNum.length; iL++) {
    let consultasLetter = parseInt(
      strConsultasNum.slice(0 + iL, 1 + iL) ?? "0",
      10
    );
    if (Number.isNaN(consultasLetter)) {
      console.warn(`consultasLetter retornado como NaN, revertido para 1`);
      consultasLetter = 1;
    }
    arrayConsultasNum = arrayConsultasNum.concat(consultasLetter);
    if (iL === strConsultasNum.length - 1) {
      return arrayConsultasNum;
    }
  }
}

function getRowValues(
  arrayRows: HTMLTableRowElement[],
  arrayConsultasNum: number[],
  arrayCelIds: looseNum[]
) {
  if (typeof arrayCelIds[0] === "string") {
    const idMatch = arrayCelIds[0]?.match(/[0-9]+(?=_)/);
    if (idMatch) {
      let numRow = (arrayCelIds[0] = parseInt(idMatch.toString(), 10));
      if (Number.isNaN(numRow)) {
        console.warn(`numRow retornado como NaN, revertido para 1`);
        numRow = 1;
      }
      if (numRow !== arrayRows.length) {
        let colAcc = 0;
        let arrayRowValues = [];
        for (let iCol = 0; iCol < arrayConsultasNum.length; iCol++) {
          const targCelInp = document.getElementById(
            `tabInpRowDCut${numRow}_${1 + arrayConsultasNum[iCol]}`
          );
          if (targCelInp && targCelInp instanceof HTMLInputElement) {
            colAcc++;
            targCelInp.value = colAcc.toString(); //TODO INCLUÍDO PARA FINS DE TESTE
            arrayRowValues.push(targCelInp.value);
          } else {
            const error = new Error();
            const splitError = (error.stack as string).split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.inputNotFound(
              targCelInp ?? null,
              "targCelInp",
              slicedError ?? "NULL"
            );
          }
          if (arrayRowValues.length === arrayConsultasNum.length) {
            return arrayRowValues;
          }
        }
      }
    }
  }
}

export function defineTargInps(
  numRef: looseNum,
  context: string,
  parentEl: Element
) {
  let targInpWeight: targEl = undefined;
  let targInpHeight: targEl = undefined;
  let targInpIMC: targEl = undefined;
  let targInpMLG: targEl = undefined;
  let targInpTMB: targEl = undefined;
  let targInpGET: targEl = undefined;
  let arrayTargInps: arrTargEl = [];
  let validTargInps: arrTargEl = [];

  if (typeof numRef === "string") {
    numRef =
      numRef
        .replaceAll(/["']/g, "")
        .match(/^[0-9]{1,2}$/g)
        ?.toString() ?? "";
    if (numRef && numRef !== "") {
      numRef = parseInt(numRef, 10);
      if (Number.isNaN(numRef)) {
        console.warn(`numRef retornado como NaN. Revertido para 1`);
        numRef = 1;
      }
    } else {
      const error = new Error();
      const splitError = (error.stack as string as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.stringError(
        "convertendo Número de Consulta de string para número",
        numRef,
        slicedError ?? "NULL"
      );
    }
  }

  if (typeof numRef === "number") {
    if (context === "cons" || context === "tab") {
      if (context === "cons") {
        targInpWeight = parentEl.querySelector(
          `#tabInpRowMedAnt2_${numRef + 1}`
        );
        arrayTargInps.push(targInpWeight);

        targInpHeight = parentEl.querySelector(
          `#tabInpRowMedAnt3_${numRef + 1}`
        );
        arrayTargInps.push(targInpHeight);

        targInpIMC = parentEl.querySelector(
          `#inpImc${numRef}Cel2_${numRef + 1}`
        );
        arrayTargInps.push(targInpIMC);

        targInpMLG = parentEl.querySelector(
          `#inpMlg${numRef}Cel3_${numRef + 1}`
        );
        arrayTargInps.push(targInpMLG);

        targInpTMB = parentEl.querySelector(
          `#inpTmb${numRef}Cel5_${numRef + 1}`
        );
        arrayTargInps.push(targInpTMB);

        targInpGET = parentEl.querySelector(
          `#inpGet${numRef}Cel6_${numRef + 1}`
        );
        arrayTargInps.push(targInpGET);
      } else if (context === "tab") {
        targInpWeight = parentEl.querySelector(`#tabInpRowMedAnt2_${numRef}`);
        arrayTargInps.push(targInpWeight);

        targInpHeight = parentEl.querySelector(`#tabInpRowMedAnt3_${numRef}`);
        arrayTargInps.push(targInpHeight);

        targInpIMC = parentEl.querySelector(
          `#inpImc${numRef - 1}Cel2_${numRef}`
        );
        arrayTargInps.push(targInpIMC);

        targInpMLG = parentEl.querySelector(
          `#inpMlg${numRef - 1}Cel3_${numRef}`
        );
        arrayTargInps.push(targInpMLG);

        targInpTMB = parentEl.querySelector(
          `#inpTmb${numRef - 1}Cel5_${numRef}`
        );
        arrayTargInps.push(targInpTMB);

        targInpGET = parentEl.querySelector(
          `#inpGet${numRef - 1}Cel6_${numRef}`
        );
        arrayTargInps.push(targInpGET);
      }
    } else {
      const error = new Error();
      const splitError = (error.stack as string as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.typeError(
        "numRef",
        numRef ?? null,
        "number ou string somente com números",
        slicedError ?? "NULL"
      );
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.stringError(
      "validando contexto. Valores de string aceitos: cons || tab.",
      context ?? "undefined",
      slicedError ?? "NULL"
    );
  }

  if (arrayTargInps.length === 6) {
    for (let iA = 0; iA < arrayTargInps.length; iA++) {
      if (
        arrayTargInps[iA] instanceof HTMLInputElement &&
        (arrayTargInps[iA] as HTMLInputElement).type === "number"
      ) {
        console.log(`target ${enumTargInpTypes[iA]}`);
        validTargInps.push(arrayTargInps[iA]);
      } else {
        const error = new Error();
        const splitError = (error.stack as string as string).split("\n");
        const slicedError = splitError[1].trim().slice(-7, -1);
        ErrorHandler.inputNotFound(
          arrayTargInps[iA],
          `arrayTargInps ${enumTargInpTypes[iA]}`,
          slicedError ?? "NULL"
        );
        arrayTargInps[iA] = null;
      }
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(
      arrayTargInps ?? null,
      "arrayTargInps",
      slicedError ?? "NULL"
    );
  }

  return validTargInps;
}

export function changeToAstDigit(
  click: Event,
  toFileInpBtn: HTMLButtonElement
) {
  const useAstDigitRegex = /Usar Assinatura Digital/;
  const useAstDigtRegexObj = new RegExp(useAstDigitRegex);
  const useAstTextRegex = /Retornar à Assinatura Escrita/;
  const useAstTextRegexObj = new RegExp(useAstTextRegex);
  let labCont: HTMLCollectionOf<Element> | Element[] | undefined =
    toFileInpBtn.parentElement?.getElementsByClassName("labAst");
  if (
    labCont &&
    !labCont[0] &&
    (toFileInpBtn.parentElement?.tagName === "LABEL" ||
      toFileInpBtn.parentElement?.tagName === "SPAN")
  ) {
    labCont = Array.of(toFileInpBtn.parentElement);
  }

  let astCount = 0;
  if (labCont && click.target === toFileInpBtn) {
    if (
      toFileInpBtn.textContent &&
      useAstDigtRegexObj.test(toFileInpBtn.textContent)
    ) {
      // console.log("true teste 1");
      const inpAst = searchPreviousSiblings(toFileInpBtn, "inpAst");

      if (inpAst instanceof HTMLInputElement) {
        const fileInp = document.createElement("input");
        fileInp.type = "file";
        fileInp.name = inpAst.name; //ignorar TS
        fileInp.id = inpAst.id;
        fileInp.className = inpAst.className;
        fileInp.setAttribute("accept", "image/*");
        if (inpAst.required) {
          fileInp.required = inpAst.required; //ignorar TS
        }
        if (inpAst.parentElement) {
          inpAst.parentElement.replaceChild(fileInp, inpAst);
          const idLabMatch = labCont[0].id.match(/Ast/)?.toString();
          const idInpMatch = fileInp.id.match(/Ast/)?.toString();
          if (idLabMatch && idInpMatch) {
            const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
            const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
            const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
            const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
            labCont[0].id = sliceOneLabId + sliceTwoInpId;
            toFileInpBtn.textContent = "Retornar à Assinatura Escrita";
          } else {
            console.warn("Erro no match de ids do input");
          }
          if (
            toFileInpBtn.previousElementSibling instanceof HTMLButtonElement
          ) {
            toFileInpBtn.previousElementSibling?.setAttribute("hidden", "");
          }

          if (fileInp) {
            fileInp.addEventListener("change", (chose) => {
              // console.log("evento ouvido");
              try {
                if (
                  chose.target instanceof HTMLInputElement &&
                  fileInp.files &&
                  fileInp.files.length > 0
                ) {
                  const imgFile = fileInp.files[0];
                  if (imgFile && imgFile.type.startsWith("image")) {
                    // console.log("img reconhecida");
                    const fileReader = new FileReader();

                    fileReader.onload = (load) => {
                      //definir lógica para carregamento
                      //inicia preparo para evento de carregamento
                      // console.log("loading iniciado");
                      astCount++;
                      const imgUrl = load.target?.result; //checa a url do file que será carregado
                      const imgAstDigt = document.createElement("img"); //cria container
                      fileInp.id = inpAst.id;
                      fileInp.className = inpAst.className;
                      imgAstDigt.innerHTML = "";
                      if (typeof imgUrl === "string") {
                        imgAstDigt.src = imgUrl; //associação entre container e file carregado
                        // console.log("string validada");
                      }
                      imgAstDigt.id = fileInp.id;
                      imgAstDigt.className = fileInp.className;
                      imgAstDigt.setAttribute("alt", "Assinatura Digital");
                      imgAstDigt.setAttribute("decoding", "async");
                      imgAstDigt.setAttribute("loading", "eager");
                      imgAstDigt.setAttribute("crossorigin", "anonymous");
                      imgAstDigt.style.setProperty("max-width", "300px");
                      imgAstDigt.style.setProperty("max-height", "200px");
                      if (
                        fileInp.parentElement &&
                        labCont &&
                        labCont.length > 0
                      ) {
                        fileInp.parentElement.replaceChild(imgAstDigt, fileInp);
                        const idLabMatch = labCont[0].id
                          .match(/Ast/)
                          ?.toString();
                        const idInpMatch = imgAstDigt.id
                          .match(/Ast/)
                          ?.toString();
                        if (idLabMatch && idInpMatch) {
                          const idLabMatchIndex =
                            labCont[0].id.indexOf(idLabMatch);
                          const idInpMatchIndex =
                            imgAstDigt.id.indexOf(idInpMatch);
                          const sliceOneLabId = labCont[0].id.slice(
                            0,
                            idLabMatchIndex
                          );
                          const sliceTwoInpId =
                            imgAstDigt.id.slice(idInpMatchIndex);
                          labCont[0].id = sliceOneLabId + sliceTwoInpId;
                          console.log(labCont[0].id);
                        } else {
                          console.warn("Erro no match de ids do input");
                        }
                      } else {
                        console.warn(`Erro na validação de labCont: elemento ${labCont}
                        e/ou parent: elemento ${fileInp.parentElement}`);
                      }

                      // imgAstDigt.style.width = imgAstDigt.parentElement.style.width;
                      if (imgAstDigt) {
                        // let computeImgAstdWidth = getComputedStyle(imgAstDigt).width;
                        // imgAstDigt.parentElement.style.width = computeImgAstdWidth;
                        imgAstDigt.style.setProperty("overflow", "auto");
                      }
                    };
                    fileReader.readAsDataURL(imgFile); //lê o file baseado na src carregada
                  }
                } else {
                  throw new Error("Nenhum arquivo selecionado");
                }
              } catch (error: any) {
                console.error(error.message);
              }
            });
          }
        }
      }
      //TODO INCLUIR TOKEN ANTI-CSRF QUANDO HOUVER SERVIDOR

      // fileInp.name = inpAst.name;
      // fileInp.id = inpAst.id;
      // fileInp.className = inpAst.className;
    } else if (
      toFileInpBtn.textContent &&
      useAstTextRegexObj.test(toFileInpBtn.textContent)
    ) {
      const inpAst =
        searchPreviousSiblings(toFileInpBtn, "inpAst") ||
        searchPreviousSiblings(toFileInpBtn, "imgAstDigit");
      if (
        inpAst instanceof HTMLImageElement ||
        inpAst instanceof HTMLInputElement
      ) {
        const fileInp = document.createElement("input");
        fileInp.type = "text";
        fileInp.name = inpAst.name;
        fileInp.id = inpAst.id;
        fileInp.className = inpAst.className;
        fileInp.setAttribute("required", "");
        if (inpAst.parentElement) {
          inpAst.parentElement.replaceChild(fileInp, inpAst);
          const idLabMatch = labCont[0].id.match(/Ast/)?.toString();
          const idInpMatch = fileInp.id.match(/Ast/)?.toString();
          if (idLabMatch && idInpMatch) {
            const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
            const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
            const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
            const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
            labCont[0].id = sliceOneLabId + sliceTwoInpId;
            toFileInpBtn.textContent = "Usar Assinatura Digital";
            toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
            fileInp.addEventListener("input", () =>
              Model.autoCapitalizeInputs(fileInp)
            );
          } else {
            console.warn("Erro no match de ids dos inputs");
          }
        }
      } else {
        const error = new Error();
        const splitError = (error.stack as string)?.split("\n");
        const slicedError = splitError[1].trim().slice(-7, -1);
        ErrorHandler.elementNotFound(
          inpAst ?? null,
          "inpAst",
          slicedError ?? "NULL"
        );
      }
    }
  }
}

export function resetarFormulario(
  click: Event,
  toFileInpBtns: NodeListOf<HTMLButtonElement>,
  editableCite: Element,
  genTrans: HTMLSelectElement,
  genFisAlin: HTMLSelectElement
) {
  if (
    click.target instanceof HTMLElement &&
    click.target.tagName === "BUTTON"
  ) {
    const formulario = document.getElementById("formEdFis");

    if (formulario && formulario instanceof HTMLFormElement) {
      formulario.reset();
    } else {
      const error = new Error();
      const splitError = (error.stack as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        formulario ?? null,
        "formulario",
        slicedError ?? "NULL"
      );
    }

    if (editableCite && editableCite instanceof HTMLElement) {
      editableCite.textContent = `--Nome`;
      Model.removeFirstClick(editableCite);
    } else {
      const error = new Error();
      const splitError = (error.stack as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        editableCite ?? null,
        "editableCite",
        slicedError ?? "NULL"
      );
    }

    if (toFileInpBtns.length > 0) {
      toFileInpBtns.forEach((toFileInpBtn) => {
        if (
          toFileInpBtn instanceof HTMLButtonElement &&
          toFileInpBtn.textContent === "Retornar à Assinatura Escrita"
        ) {
          const inpAst =
            searchPreviousSiblings(toFileInpBtn, "inpAst") ||
            searchPreviousSiblings(toFileInpBtn, "imgAstDigit");
          if (
            inpAst &&
            (inpAst instanceof HTMLInputElement ||
              inpAst instanceof HTMLImageElement)
          ) {
            const fileInp = document.createElement("input");
            fileInp.type = "text";
            fileInp.name = inpAst.name;
            fileInp.id = inpAst.id;
            fileInp.className = inpAst.className;
            fileInp.setAttribute("required", "");
            if (inpAst.parentElement) {
              let labCont: HTMLCollectionOf<Element> | HTMLElement[] | never[] =
                toFileInpBtn.parentElement?.getElementsByClassName("labAst") ??
                [];
              if (
                (!labCont[0] || labCont[0].id === "") &&
                (toFileInpBtn.parentElement?.tagName === "LABEL" ||
                  toFileInpBtn.parentElement?.tagName === "SPAN")
              ) {
                labCont = Array.of(toFileInpBtn.parentElement as HTMLElement);
              }
              inpAst.parentElement.replaceChild(fileInp, inpAst);
              const idLabMatch = labCont[0].id.match(/Ast/)?.toString();
              const idInpMatch = fileInp.id.match(/Ast/)?.toString();
              if (idLabMatch && idInpMatch) {
                const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
                const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
                const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
                const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
                labCont[0].id = sliceOneLabId + sliceTwoInpId;
                fileInp.addEventListener("input", () =>
                  Model.autoCapitalizeInputs(fileInp)
                );
                toFileInpBtn.textContent = "Usar Assinatura Digital";
                toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
              } else {
                console.warn("Erro no match de ids do input");
              }
            } else {
              console.warn(`Erro localizando Parent Element de inpAst`);
            }
          } else {
            console.warn(
              `Erro reconhecendo Previous Element Sibling: inpAst ${Object.prototype.toString
                .call(inpAst)
                .slice(8, -1)}`
            );
          }
        } else {
          console.warn(`Erro validando Botão de Assinatura Digital.
          Instância obtida: ${
            Object.prototype.toString.call(toFileInpBtn).slice(8, -1) ?? "null"
          };
          .textContent obtido: ${toFileInpBtn?.textContent ?? "null"}`);
        }
      });
    } else {
      const error = new Error();
      const splitError = (error.stack as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotPopulated(
        toFileInpBtns ?? null,
        "NodeList toFileInpBtns",
        slicedError ?? "NULL"
      );
    }

    if (genTrans && genTrans instanceof HTMLSelectElement) {
      if (!genTrans.hidden) {
        genTrans.hidden = true;
      }
    } else {
      const error = new Error();
      const splitError = (error.stack as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        genTrans ?? null,
        "genTrans",
        slicedError ?? "NULL"
      );
    }

    if (genFisAlin && genFisAlin instanceof HTMLSelectElement) {
      if (!genFisAlin.hidden) {
        genFisAlin.hidden = true;
      }
    } else {
      const error = new Error();
      const splitError = (error.stack as string).split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        genFisAlin ?? null,
        "genFisAlin",
        slicedError ?? "NULL"
      );
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string).split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(
      (click.target as Element) ?? null,
      "Botão de Reset",
      slicedError ?? "NULL"
    );
  }
}

//TODO FINALIZAR COM CSS
export function subForm(): void {
  window.alert(
    "Sistema ainda não pronto\n...mas você teria enviado clicando aqui! :)"
  );
}
