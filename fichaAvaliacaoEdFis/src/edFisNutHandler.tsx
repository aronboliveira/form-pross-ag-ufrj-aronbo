//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
"use strict";
import * as EdFisNutModel from "./edFisNutModel.js";
import * as GlobalModel from "../../globalScripts/src/gModel.js";
import * as GlobalHandler from "../../globalScripts/src/gHandlers.js";
import * as ErrorHandler from "../../globalScripts/src/errorHandler.js";
import {
  elCollection,
  entryEl,
  formClassPerson,
  formPerson,
  looseNum,
  primitiveType,
  targEl,
} from "../../globalScripts/src/types.js";

let rowCountAtivFisRot = 3;
let rowCountAtivFisProp = 3;
let rowCountComorb = 3;
enum EnumTargInpTypes {
  "weight",
  "height",
  "IMC",
  "MLG",
  "TMB",
  "GET",
}
const enumTargInpTypes = EnumTargInpTypes;

export function switchAutoFill(autoFillBtn: targEl, locksTabInd: targEl[]) {
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
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(
      autoFillBtn ?? null,
      "autoFillBtn",
      slicedError ?? "NULL"
    );
  }
  return autoFillActivation;
}

function switchLockInputs(locksTabInd: targEl[], autoFillActivation: boolean) {
  if (
    locksTabInd.length > 0 &&
    locksTabInd.every((lock) => lock instanceof HTMLSpanElement)
  ) {
    if (autoFillActivation) {
      locksTabInd.forEach((lock) => {
        const siblingInput = GlobalHandler.searchPreviousSiblings(
          lock as HTMLSpanElement,
          "inpInd"
        );
        if (siblingInput instanceof HTMLInputElement) {
          (lock as HTMLSpanElement).innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
          </svg>`;
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.inputNotFound(
            siblingInput ?? null,
            "siblingInput",
            slicedError ?? "NULL"
          );
        }
      });
    } else {
      locksTabInd.forEach((lock) => {
        const siblingInput = GlobalHandler.searchPreviousSiblings(
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
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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

export function getNumCol(evEl: targEl) {
  let numCol = undefined;
  if (
    (evEl && evEl.id.match(/[0-9]+_[0-9]+$/g)) ||
    (evEl instanceof HTMLInputElement && evEl.name.match(/[0-9]+_[0-9]+$/g)) ||
    (evEl instanceof HTMLLabelElement && evEl.htmlFor.match(/[0-9]+_[0-9]+$/g))
  ) {
    numCol = parseInt(evEl.id.slice(-1), 10) ?? undefined;
    if (Number.isNaN(numCol)) {
      console.warn(`numCol retornado como NaN. Revertido para undefined.`);
      numCol = undefined;
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.matchError(
      ".id do Elemento de Evento",
      evEl ?? null,
      evEl?.id ?? "null",
      slicedError ?? "NULL"
    );
  }
  return numCol;
}

export function validateEvResultNum(evEl: targEl, property: primitiveType) {
  if (evEl instanceof HTMLInputElement && evEl.type === "number") {
    const returnedProperty = GlobalHandler.updateSimpleProperty(evEl) || 0;
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
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.typeError(
        `property relacionada a ${evEl?.id ?? "undefined Event Element"}`,
        property,
        "number",
        slicedError ?? "NULL"
      );
      property = 0;
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(
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
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.inputNotFound(
      targInpWeight ?? null,
      "targInpWeight",
      slicedError ?? "NULL"
    );
  }
  if (targInpHeight instanceof HTMLInputElement) {
    person.height = validateEvResultNum(targInpHeight, person.height);
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
  gordCorpLvl: entryEl,
  targInpIMC: entryEl,
  targInpMLG: entryEl,
  targInpTMB: entryEl,
  targInpGET: entryEl,
  formTMBTypeElement: entryEl,
  factorAtvLvl: number,
  factorAtleta: string
) {
  let IMC = 0;
  let MLG = 0;
  let TMB = 0;
  let GET = 0;
  const IMCMLGArray = person.calcIMC(person) ?? ["", 0, 0];
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

function updateIMCMLGContext(
  IMCMLGArray: [string, number, number],
  gordCorpLvl: entryEl,
  targInpIMC: entryEl,
  targInpMLG: entryEl,
  formTMBTypeElement: entryEl,
  ignoredIndex: string
) {
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
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
  formTMBTypeElement: entryEl,
  gordCorpLvl: entryEl
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
      console.error(`Erro obtendo valor de IMC em função fluxFormIMC().
      Valor obtido: ${IMC ?? "NaN"}`);
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
  formTMBTypeElement: entryEl,
  targInpTMB: entryEl
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
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        formTMBTypeElement ?? null,
        "formTMBTypeElement",
        slicedError ?? null
      );
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
  mainSelect: targEl,
  formTMBTypeElement: targEl,
  spanFactorAtleta: targEl,
  gordCorpLvl: targEl,
  lockGordCorpLvl: targEl,
  IMC: number
) {
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
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
  targInpGET: entryEl,
  TMB: number,
  factorAtvLvl: number
) {
  let GET = parseFloat(person.calcGET(TMB || 0, factorAtvLvl).toFixed(4)) ?? 0;
  if (Number.isNaN(GET) || isNaN(GET)) {
    console.warn(`GET retornando como NaN`);
    GET = 0;
  }
  targInpGET.value = GET.toFixed(4);
  return GET;
}

export function updatePGC(
  person: formClassPerson,
  numRef: number,
  context: string,
  parentElement: Element
): [number, targEl, targEl] {
  let targInpPGC = undefined;
  let targInpSumDCut = undefined;
  let PGC = 0;
  if (context === "cons" || context === "tab") {
    if (context === "cons") {
      targInpPGC = parentElement.querySelector(
        `#inpPgc${numRef}Cel4_${numRef + 1}`
      );
      targInpSumDCut = parentElement.querySelector(
        `#tabInpRowDCut9_${numRef + 1}`
      );
    } else if (context === "tab") {
      targInpPGC = parentElement.querySelector(
        `#inpPgc${numRef - 1}Cel4_${numRef}`
      );
      targInpSumDCut = parentElement.querySelector(`#tabInpRowDCut9_${numRef}`);
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.inputNotFound(
      targInpSumDCut,
      "targInpSumDCut",
      slicedError ?? "NULL"
    );
  }

  if (targInpPGC instanceof HTMLInputElement && targInpPGC.type === "number") {
    console.log("sumdcut capturado " + person.sumDCut);
    console.log("age capturada " + person.age);
    PGC = parseFloat(person.calcPGC(person).toFixed(4)) ?? 0;
    if (Number.isNaN(PGC) || isNaN(PGC)) {
      console.warn(`PGC retornando como NaN`);
      PGC = 0;
    }
    const PGCDecayArray = EdFisNutModel.isPGCDecaying(person, PGC, targInpPGC);
    if (PGCDecayArray[0] === true) {
      PGC = PGCDecayArray[1];
      targInpPGC.value = PGC.toFixed(2);
    } else {
      targInpPGC.value = PGC.toFixed(4);
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.inputNotFound(targInpPGC, "targInpPGC", slicedError ?? "NULL");
  }
  if (PGC <= 0) {
    console.warn(`Valor de PGC não atualizado.
    Valor obtido: ${PGC || 0}`);
  }
  return [PGC ?? 0, targInpSumDCut ?? null, targInpPGC ?? null];
}

export function updateAtvLvl(
  mainSelect: entryEl,
  atvLvl: string,
  secondarySelect: entryEl
) {
  const returnedAtvLvl = GlobalHandler.updateSimpleProperty(mainSelect) ?? "";
  if (typeof returnedAtvLvl === "string") {
    atvLvl = returnedAtvLvl;
    secondarySelect.value = atvLvl;
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.typeError(
      "atualização de mainSelect em updateAtLvl()",
      returnedAtvLvl ?? null,
      "string",
      slicedError ?? "NULL"
    );
  }
  return atvLvl;
}

export function defineTargInps(
  numRef: string | number,
  context: string,
  parentEl: Element
) {
  const arrayTargInps = [];
  const validTargInps = [];
  let targInpWeight = undefined;
  let targInpHeight = undefined;
  let targInpIMC = undefined;
  let targInpMLG = undefined;
  let targInpTMB = undefined;
  let targInpGET = undefined;

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
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.typeError(
        "numRef",
        numRef ?? null,
        "number ou string somente com números",
        slicedError ?? "NULL"
      );
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
        validTargInps.push(arrayTargInps[iA]);
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.inputNotFound(
          arrayTargInps[iA],
          `arrayTargInps ${enumTargInpTypes[iA]}`,
          slicedError ?? "NULL"
        );
        arrayTargInps[iA] = null;
      }
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(
      arrayTargInps ?? null,
      "arrayTargInps",
      slicedError ?? "NULL"
    );
  }

  return validTargInps;
}

export function addRowAtivFis(container: Element) {
  if (
    container instanceof HTMLButtonElement &&
    container.tagName === "BUTTON"
  ) {
    if (container.classList.contains("addAtFisRot")) {
      const tBodyContainer = document.getElementById("tabTbodyAtFisRot");
      const newRow = document.createElement("tr");
      newRow.className = "contQuint tabRowAtFisRot";
      newRow.id = `tabRowAtFisRotId${rowCountAtivFisRot}`;
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
        const numInps = newRow.querySelectorAll('input[type="number"]');
        const textElements = newRow.querySelectorAll('input[type="text"]');
        for (let iT = 0; iT < textElements.length; iT++) {
          textElements[iT].addEventListener("input", () =>
            GlobalModel.autoCapitalizeInputs(textElements[iT] as entryEl)
          );
        }
        for (let iN = 0; iN < numInps.length; iN++) {
          numInps[iN].addEventListener("input", () =>
            GlobalModel.numberLimit(numInps[iN] as HTMLInputElement)
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
        const numInps = newRow.querySelectorAll('input[type="number"]');
        const textElements = newRow.querySelectorAll('input[type="text"]');
        for (let iT = 0; iT < textElements.length; iT++) {
          textElements[iT].addEventListener("input", () =>
            GlobalModel.autoCapitalizeInputs(textElements[iT] as entryEl)
          );
        }
        for (let iN = 0; iN < numInps.length; iN++) {
          numInps[iN].addEventListener("input", () =>
            GlobalModel.numberLimit(numInps[iN] as HTMLInputElement)
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

export function addRowComorb(container: Element) {
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
      const textElements = newComorbRow.querySelectorAll('input[type="text"]');
      for (let iB = 0; iB < textElements.length; iB++) {
        textElements[iB].addEventListener("input", () =>
          GlobalModel.autoCapitalizeInputs(textElements[iB] as entryEl)
        );
      }
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

export function switchRequiredCols(elements: elCollection) {
  if (elements.length > 0 && elements[1] instanceof HTMLSelectElement) {
    const consTablesFs = elements[0];
    const numConsElement = elements[1];
    const tabSVi = elements[2];
    const tabMedAnt = elements[3];
    const tabDC = elements[4];
    const tabIndPerc = elements[5];
    let numCons = parseInt(numConsElement?.value || "1");
    if (Number.isNaN(numCons)) {
      console.warn(`numCons retornado como NaN, revertido para 1`);
      numCons = 1;
    }

    //adiciona listener para responder à mudança no valor de consulta
    let returnedNum = parseInt(
      (GlobalHandler.updateSimpleProperty(numConsElement) as string) ?? "0",
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
      //inicia construção de matriz para reset de required na tabela
      const totalTables = consTablesFs?.querySelectorAll("table");
      const totalRows = consTablesFs?.querySelectorAll("tr");
      let nTotalRows = 0;
      if (totalRows && totalRows.length > 0) {
        nTotalRows = totalRows.length - totalTables.length;
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
        nTotalMatrixValidAxes = nTotalRows * nTotalCols;
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
      if (
        inpsCells.length > 0 &&
        inpsCells.length === nTotalMatrixValidAxes / totalTables.length
      ) {
        inpsCells.forEach((inpCel) => {
          if (inpCel instanceof HTMLInputElement) {
            inpCel.required = false;
          } else {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
      const validInpsNodeLists = [false, false, false, false];

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

      const consRequiredCellsSVi = [];
      const consRequiredCellsMedAnt = [];
      const consRequiredCellsDC = [];
      const consRequiredCellsIndPerc = [];
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
          if (
            Array.from(inpsCellsIndPerc).every(
              (inpCell) => inpCell instanceof HTMLInputElement
            )
          ) {
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
          } else {
            console.warn(
              `Erro na validação de instâncias para inpsCellsIndPerc.`
            );
          }
        }
      } else {
        console.error(`Erro na validação de NodeLists de Inputs nas Tabelas.
        Array de Validação para NodeLists obtido: ${
          JSON.stringify(validInpsNodeLists) ?? "undefined"
        }`);
      }

      const requiredCells = [
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
          if (
            flatRequiredCells[iR] instanceof HTMLInputElement ||
            flatRequiredCells[iR] instanceof HTMLTextAreaElement ||
            flatRequiredCells[iR] instanceof HTMLSelectElement
          )
            (flatRequiredCells[iR] as entryEl).required = true;
        }
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
  consTitles: elCollection,
  trioEl: entryEl,
  numTitledCons: number,
  numTabs: number
) {
  const iniTrioValue = trioEl.value;
  const iniValue = parseInt(iniTrioValue) ?? 0;
  const trioNums = [];
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
    consTitles[i].textContent = `${trioNums[i] || `${1 + i}`}ª Consulta`;
  }
}

export function createArraysRels(
  btnId: string,
  arrayRows: HTMLTableRowElement[],
  protocolValue: string
) {
  let arrayConsultasNum: looseNum[] = [];
  let rowValues: looseNum[] = [];
  let tabValues: looseNum[] = [];
  let columnValues: looseNum[] = [];
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
        (row: Element) => row instanceof HTMLTableRowElement
      );
      if (iR === 0 && isValidRowArray) {
        arrayConsultasNum = getConsultasNums(arrayRows[iR]) ?? [0]; //obtém os números dos headers de consulta na forma de um array
        continue;
      }
      const nCels = arrayRows[iR].childElementCount;
      const arrayCelsIds = [];
      for (let iCh = 1; iCh < nCels; iCh++) {
        arrayCelsIds.push(arrayRows[iR].children[iCh].id);
      }
      if (iR !== arrayRows.length - 1 && arrayConsultasNum) {
        rowValues = getRowValues(
          arrayRows,
          arrayConsultasNum,
          arrayCelsIds
        ) ?? [""];
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
      let slicedError = "";
      let inputAcc = 0;
      let protocoloNum = 0;
      switch (protocolValue) {
        case "pollock3":
          protocoloNum = 3;
          break;
        case "pollock7":
          protocoloNum = 7;
          break;
        default:
          slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.elementNotFound(
            protocolValue ?? null,
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
                if (
                  tBodyChildren &&
                  tBodyChildren.every(
                    (tBodyChild) => tBodyChild instanceof HTMLElement
                  )
                ) {
                  for (let iC = 0; iC < tBodyChildren.length; iC++) {
                    const innerInp = tBodyChildren[iC].querySelector("input");
                    if (
                      !(tBodyChildren[iC] as HTMLElement).hidden &&
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
                  const slicedError =
                    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                    "";
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
  let arrayConsultasNum: looseNum[] = [];
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
  arrayConsultasNum: looseNum[],
  arrayCelIds: looseNum[]
) {
  const arrayRowValues = [""];
  arrayConsultasNum.forEach((num) => {
    if (typeof num === "string") {
      num = parseInt(num, 10);
      if (Number.isNaN(num)) {
        console.warn(
          `Número de consulta retornado como NaN. Revertido para 0.`
        );
      }
    }
  });
  if (typeof arrayCelIds[0] === "string") {
    const idMatch = arrayCelIds[0]?.match(/[0-9]+(?=_)/);
    if (idMatch) {
      let numRow = (arrayCelIds[0] = parseInt(idMatch.toString(), 10));
      if (Number.isNaN(numRow)) {
        console.warn(`numRow retornado como NaN, revertido para 1`);
        numRow = 1;
      }
      if (numRow !== arrayRows.length) {
        for (let iCol = 0; iCol < arrayConsultasNum.length; iCol++) {
          const targCelInp = document.getElementById(
            `tabInpRowDCut${numRow}_${1 + (arrayConsultasNum[iCol] as number)}`
          );
          if (targCelInp && targCelInp instanceof HTMLInputElement) {
            if (targCelInp.value !== "") {
              arrayRowValues.push(targCelInp.value);
            }
          } else {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
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
  return arrayRowValues;
}
