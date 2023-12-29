/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edFisNutHandler.tsx":
/*!*********************************!*\
  !*** ./src/edFisNutHandler.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addRowAtivFis: () => (/* binding */ addRowAtivFis),
/* harmony export */   addRowComorb: () => (/* binding */ addRowComorb),
/* harmony export */   createArraysRels: () => (/* binding */ createArraysRels),
/* harmony export */   defineTargInps: () => (/* binding */ defineTargInps),
/* harmony export */   fluxFormIMC: () => (/* binding */ fluxFormIMC),
/* harmony export */   getNumCol: () => (/* binding */ getNumCol),
/* harmony export */   matchPersonPropertiesDC: () => (/* binding */ matchPersonPropertiesDC),
/* harmony export */   matchPersonPropertiesWH: () => (/* binding */ matchPersonPropertiesWH),
/* harmony export */   matchTMBElements: () => (/* binding */ matchTMBElements),
/* harmony export */   switchAutoFill: () => (/* binding */ switchAutoFill),
/* harmony export */   switchNumConsTitles: () => (/* binding */ switchNumConsTitles),
/* harmony export */   switchRequiredCols: () => (/* binding */ switchRequiredCols),
/* harmony export */   updateAtvLvl: () => (/* binding */ updateAtvLvl),
/* harmony export */   updateGETContext: () => (/* binding */ updateGETContext),
/* harmony export */   updateIndexesContexts: () => (/* binding */ updateIndexesContexts),
/* harmony export */   updatePGC: () => (/* binding */ updatePGC),
/* harmony export */   updateTMBContext: () => (/* binding */ updateTMBContext),
/* harmony export */   validateEvResultNum: () => (/* binding */ validateEvResultNum)
/* harmony export */ });
/* harmony import */ var _edFisNutModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edFisNutModel */ "./src/edFisNutModel.tsx");
/* harmony import */ var _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global-scripts/src/gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global-scripts/src/gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global-scripts/src/errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout




let rowCountAtivFisRot = 3;
let rowCountAtivFisProp = 3;
let rowCountComorb = 3;
var EnumTargInpTypes;
(function (EnumTargInpTypes) {
    EnumTargInpTypes[EnumTargInpTypes["weight"] = 0] = "weight";
    EnumTargInpTypes[EnumTargInpTypes["height"] = 1] = "height";
    EnumTargInpTypes[EnumTargInpTypes["IMC"] = 2] = "IMC";
    EnumTargInpTypes[EnumTargInpTypes["MLG"] = 3] = "MLG";
    EnumTargInpTypes[EnumTargInpTypes["TMB"] = 4] = "TMB";
    EnumTargInpTypes[EnumTargInpTypes["GET"] = 5] = "GET";
})(EnumTargInpTypes || (EnumTargInpTypes = {}));
const enumTargInpTypes = EnumTargInpTypes;
function switchAutoFill(autoFillBtn, locksTabInd) {
    let autoFillActivation = true;
    if (autoFillBtn instanceof HTMLButtonElement) {
        if (autoFillBtn.innerText.match(/Desativar Cálculo Automático/)) {
            autoFillActivation = false;
            autoFillBtn.textContent = "Ativar Cálculo Automático";
            switchLockInputs(locksTabInd, autoFillActivation);
        }
        else if (autoFillBtn.innerText.match(/Ativar Cálculo Automático/)) {
            autoFillActivation = true;
            autoFillBtn.textContent = "Desativar Cálculo Automático";
            switchLockInputs(locksTabInd, autoFillActivation);
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.elementNotFound(autoFillBtn ?? null, "autoFillBtn", slicedError ?? "NULL");
    }
    return autoFillActivation;
}
function switchLockInputs(locksTabInd, autoFillActivation) {
    if (locksTabInd.length > 0 &&
        locksTabInd.every((lock) => lock instanceof HTMLSpanElement)) {
        if (autoFillActivation) {
            locksTabInd.forEach((lock) => {
                const siblingInput = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_2__.searchPreviousSiblings(lock, "inpInd");
                if (siblingInput instanceof HTMLInputElement) {
                    lock.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
          </svg>`;
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.inputNotFound(siblingInput ?? null, "siblingInput", slicedError ?? "NULL");
                }
            });
        }
        else {
            locksTabInd.forEach((lock) => {
                const siblingInput = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_2__.searchPreviousSiblings(lock, "inpInd");
                if (siblingInput instanceof HTMLInputElement) {
                    lock.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
          <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
        </svg>`;
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.inputNotFound(siblingInput ?? null, "siblingInput", slicedError ?? "NULL");
                }
            });
        }
    }
    else {
        console.error(`Erro validando Locks de Tábela de Índices.
    Length obtida: ${locksTabInd?.length ?? 0};
    Todos os Elements como Span: ${locksTabInd.every((lock) => lock instanceof HTMLSpanElement) ?? false}`);
    }
}
function getNumCol(evEl) {
    let numCol = undefined;
    if ((evEl && evEl.id.match(/[0-9]+_[0-9]+$/g)) ||
        (evEl instanceof HTMLInputElement && evEl.name.match(/[0-9]+_[0-9]+$/g)) ||
        (evEl instanceof HTMLLabelElement && evEl.htmlFor.match(/[0-9]+_[0-9]+$/g))) {
        numCol = parseInt(evEl.id.slice(-1), 10) ?? undefined;
        if (Number.isNaN(numCol)) {
            console.warn(`numCol retornado como NaN. Revertido para undefined.`);
            numCol = undefined;
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.matchError(".id do Elemento de Evento", evEl ?? null, evEl?.id ?? "null", slicedError ?? "NULL");
    }
    return numCol;
}
function validateEvResultNum(evEl, property) {
    if (evEl instanceof HTMLInputElement && evEl.type === "number") {
        const returnedProperty = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_2__.updateSimpleProperty(evEl) || 0;
        if (typeof returnedProperty === "number") {
            property = returnedProperty;
        }
        else if (typeof returnedProperty === "string") {
            property = parseInt(returnedProperty.replaceAll(/[^0-9.,+-]/g, "")) || 0;
            if (Number.isNaN(property)) {
                console.warn(`Propriedade de input para ${evEl?.id ?? "undefined Event Element"}
        retornada como NaN e revertida para 0.`);
                property = 0;
            }
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.typeError(`property relacionada a ${evEl?.id ?? "undefined Event Element"}`, property, "number", slicedError ?? "NULL");
            property = 0;
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.elementNotFound(evEl, `${evEl?.id ?? "undefined Event Element"}`, slicedError ?? "NULL");
        property = 0;
    }
    return property;
}
function matchPersonPropertiesWH(person, targInpWeight, targInpHeight) {
    if (targInpWeight instanceof HTMLInputElement) {
        person.weight = validateEvResultNum(targInpWeight, person.weight);
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.inputNotFound(targInpWeight ?? null, "targInpWeight", slicedError ?? "NULL");
    }
    if (targInpHeight instanceof HTMLInputElement) {
        person.height = validateEvResultNum(targInpHeight, person.height);
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.inputNotFound(targInpHeight ?? null, "targInpHeight", slicedError ?? "NULL");
    }
    return [person.weight, person.height];
}
function matchPersonPropertiesDC(person, targInpSumDCut) {
    if (targInpSumDCut instanceof HTMLInputElement) {
        person.sumDCut = validateEvResultNum(targInpSumDCut, person.sumDCut);
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.inputNotFound(targInpSumDCut ?? null, "targInpSumDCut", slicedError ?? "NULL");
    }
    return person.sumDCut;
}
function updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta) {
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
    updateIMCMLGContext(IMCMLGArray, gordCorpLvl, targInpIMC, targInpMLG, formTMBTypeElement, "NONE");
    if (IMCMLGArray[0] === "" || IMCMLGArray[1] === 0 || IMCMLGArray[2] === 0) {
        console.warn(`IMCMLGArray não atualizado.
              Valores obtidos: ${IMCMLGArray[0] ?? "null"}; ${IMCMLGArray[1] ?? 0}; ${IMCMLGArray[2] ?? 0} }`);
    }
    TMB = updateTMBContext(IMCMLGArray ?? [gordCorpLvl.value, 0, 0], person, factorAtleta, formTMBTypeElement, targInpTMB);
    if (TMB >= 0 && factorAtvLvl) {
        GET = updateGETContext(person, targInpGET, TMB, factorAtvLvl);
    }
    else {
        console.warn(`Valor de TMB obtido: ${TMB};
    factorAtvLvl obtido: ${factorAtvLvl ?? 0}`);
        targInpGET.value = "0";
    }
    return [IMC, MLG, TMB, GET];
}
function updateIMCMLGContext(IMCMLGArray, gordCorpLvl, targInpIMC, targInpMLG, formTMBTypeElement, ignoredIndex) {
    let IMC = 0;
    let MLG = 0;
    if (gordCorpLvl instanceof HTMLSelectElement &&
        targInpIMC instanceof HTMLInputElement &&
        targInpMLG instanceof HTMLInputElement &&
        formTMBTypeElement instanceof HTMLSelectElement &&
        (ignoredIndex === "MLG" ||
            ignoredIndex === "IMC" ||
            ignoredIndex === "BOTH" ||
            ignoredIndex === "NONE")) {
        if (!(ignoredIndex === "MLG" || ignoredIndex === "BOTH") &&
            typeof IMCMLGArray[2] === "number") {
            MLG = IMCMLGArray[2];
            targInpMLG.value = MLG.toFixed(4) || "0";
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.typeError("IMCMLGArray[2]", IMCMLGArray[2] ?? null, "number", slicedError ?? "NULL");
        }
        if (!(ignoredIndex === "IMC" || ignoredIndex === "BOTH") &&
            typeof IMCMLGArray[1] === "number") {
            IMC = IMCMLGArray[1];
            targInpIMC.value = IMC.toFixed(4) || "0";
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.typeError("IMCMLGArray[1]", IMCMLGArray[1] ?? null, "number", slicedError ?? "NULL");
        }
        if (typeof IMCMLGArray[0] === "string") {
            gordCorpLvl.value = IMCMLGArray[0] || "";
            fluxFormIMC(IMC, formTMBTypeElement, gordCorpLvl);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.typeError("IMCMLGArray[0]", IMCMLGArray[0] ?? null, "string", slicedError ?? "NULL");
        }
        if (IMCMLGArray[0] === "" || IMCMLGArray[1] === 0 || IMCMLGArray[2] === 0) {
            console.warn(`IMCMLGArray não atualizado.
      Valores obtidos: ${IMCMLGArray[0] ?? "null"}; ${IMCMLGArray[1] ?? 0}; ${IMCMLGArray[2] ?? 0} }`);
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.multipleElementsNotFound(slicedError ?? "NULL", "instâncias de elementos em updateIMCMLGContext", gordCorpLvl ?? null, targInpIMC ?? null, targInpMLG ?? null, formTMBTypeElement ?? null);
        console.warn(`ignoredIndex: ${ignoredIndex}`);
    }
}
function fluxFormIMC(IMC, formTMBTypeElement, gordCorpLvl) {
    if (formTMBTypeElement instanceof HTMLSelectElement &&
        formTMBTypeElement.value !== "" &&
        gordCorpLvl instanceof HTMLSelectElement &&
        gordCorpLvl.value !== "") {
        if (IMC >= 0 && IMC < 25.0) {
            formTMBTypeElement.value = "harrisBenedict";
            if (IMC < 18.5) {
                gordCorpLvl.value = "abaixo";
            }
            else if (IMC >= 18.5) {
                gordCorpLvl.value = "eutrofico";
            }
        }
        else if (IMC >= 25.0) {
            formTMBTypeElement.value = "mifflinStJeor";
            if (IMC < 30) {
                gordCorpLvl.value = "sobrepeso";
                formTMBTypeElement.value = "mifflinStJeor";
            }
            else if (IMC >= 30 && IMC < 35) {
                gordCorpLvl.value = "obeso1";
                formTMBTypeElement.value = "mifflinStJeor";
            }
            else if (IMC >= 35 && IMC < 40) {
                gordCorpLvl.value = "obeso2";
                formTMBTypeElement.value = "mifflinStJeor";
            }
            else if (IMC > 40) {
                gordCorpLvl.value = "obeso3";
                formTMBTypeElement.value = "mifflinStJeor";
            }
        }
        else {
            console.error(`Erro obtendo valor de IMC em função fluxFormIMC().
      Valor obtido: ${IMC ?? "NaN"}`);
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.multipleElementsNotFound(slicedError ?? "NULL", "obtendo formTMBTypeElement e/ou gordCorpLvl Element", formTMBTypeElement ?? null, gordCorpLvl ?? null);
    }
}
function updateTMBContext(IMCMLGArray, person, factorAtleta, formTMBTypeElement, targInpTMB) {
    let TMB = 0;
    if (IMCMLGArray.length === 3) {
        const TMBArray = person.calcTMB(person, IMCMLGArray[1] ?? 0, factorAtleta, IMCMLGArray[2] ?? 0) ?? ["", 0];
        if (formTMBTypeElement instanceof HTMLSelectElement) {
            formTMBTypeElement.value = TMBArray[0];
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.elementNotFound(formTMBTypeElement ?? null, "formTMBTypeElement", slicedError ?? null);
        }
        TMB = parseFloat(TMBArray[1].toFixed(4)) ?? 0;
        if (Number.isNaN(TMB) || isNaN(TMB)) {
            console.warn(`TMB retornando como NaN`);
            TMB = 0;
        }
        targInpTMB.value = TMB.toString();
    }
    else {
        console.error(`Erro validando argumentos.
      IMC obtido: ${IMCMLGArray[1]};
      MLG obtido: ${IMCMLGArray[2]};
      factorAtleta obtido: ${factorAtleta}`);
    }
    return TMB;
}
function matchTMBElements(mainSelect, formTMBTypeElement, spanFactorAtleta, gordCorpLvl, lockGordCorpLvl, IMC) {
    if (!IMC) {
        IMC = 0;
    }
    if (mainSelect instanceof HTMLSelectElement &&
        formTMBTypeElement instanceof HTMLSelectElement &&
        spanFactorAtleta instanceof HTMLSpanElement &&
        gordCorpLvl instanceof HTMLSelectElement &&
        lockGordCorpLvl instanceof HTMLSpanElement) {
        switch (formTMBTypeElement.value) {
            case "harrisBenedict":
                fluxFormIMC(IMC, formTMBTypeElement, gordCorpLvl);
                break;
            case "mifflinStJeor":
                fluxFormIMC(IMC, formTMBTypeElement, gordCorpLvl);
                break;
            case "tinsley":
                mainSelect.value = "muitoIntenso";
                break;
        }
        if (mainSelect.value === "muitoIntenso") {
            formTMBTypeElement.value = "tinsley";
            spanFactorAtleta.hidden = false;
        }
        else if (mainSelect.value === "sedentario" ||
            mainSelect.value === "leve" ||
            mainSelect.value === "moderado" ||
            mainSelect.value === "intenso") {
            spanFactorAtleta.hidden = true;
            if (gordCorpLvl.value === "sobrepeso" ||
                gordCorpLvl.value === "obeso1" ||
                gordCorpLvl.value === "obeso2" ||
                gordCorpLvl.value === "obeso3" ||
                (IMC && IMC >= 25)) {
                formTMBTypeElement.value = "mifflinStJeor";
            }
            else if (gordCorpLvl.value === "abaixo" ||
                gordCorpLvl.value === "eutrofico" ||
                (IMC && IMC < 25)) {
                formTMBTypeElement.value = "harrisBenedict";
            }
            else {
                console.error(`Erro obtendo valor de Gordura Corporal.
        Nível de Gordura Corporal obtido: ${gordCorpLvl?.value ?? "null"};
        IMC obtido: ${IMC ?? 0}.`);
            }
        }
        else {
            console.error(`Erro obtendo valor de mainSelect.
      Valor obtido: ${mainSelect.value || "null"}`);
        }
        if (mainSelect.value === "muitoIntenso" ||
            formTMBTypeElement.value === "tinsley") {
            lockGordCorpLvl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
      <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
    </svg>`;
        }
        else {
            lockGordCorpLvl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
    </svg>`;
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.multipleElementsNotFound(slicedError ?? "NULL", "argumentos em matchTMBElements()", mainSelect ?? null, formTMBTypeElement ?? null, spanFactorAtleta ?? null, gordCorpLvl ?? null, lockGordCorpLvl ?? null);
        console.warn(`Tipo primitivo obtido para IMC: ${typeof IMC ?? "undefined"}.`);
    }
}
function updateGETContext(person, targInpGET, TMB, factorAtvLvl) {
    let GET = parseFloat(person.calcGET(TMB || 0, factorAtvLvl).toFixed(4)) ?? 0;
    if (Number.isNaN(GET) || isNaN(GET)) {
        console.warn(`GET retornando como NaN`);
        GET = 0;
    }
    targInpGET.value = GET.toFixed(4);
    return GET;
}
function updatePGC(person, numRef, context, parentElement) {
    let targInpPGC = undefined;
    let targInpSumDCut = undefined;
    let PGC = 0;
    if (context === "cons" || context === "tab") {
        if (context === "cons") {
            targInpPGC = parentElement.querySelector(`#inpPgc${numRef}Cel4_${numRef + 1}`);
            targInpSumDCut = parentElement.querySelector(`#tabInpRowDCut9_${numRef + 1}`);
        }
        else if (context === "tab") {
            targInpPGC = parentElement.querySelector(`#inpPgc${numRef - 1}Cel4_${numRef}`);
            targInpSumDCut = parentElement.querySelector(`#tabInpRowDCut9_${numRef}`);
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.stringError("validando contexto.  Valores de string aceitos: cons || tab.", context ?? "undefined", slicedError ?? "NULL");
    }
    if (targInpSumDCut instanceof HTMLInputElement &&
        targInpSumDCut.type === "number") {
        person.sumDCut = parseInt(targInpSumDCut?.value ?? 0);
        targInpSumDCut.value = person.sumDCut.toString();
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.inputNotFound(targInpSumDCut, "targInpSumDCut", slicedError ?? "NULL");
    }
    if (targInpPGC instanceof HTMLInputElement && targInpPGC.type === "number") {
        console.log("sumdcut capturado " + person.sumDCut);
        console.log("age capturada " + person.age);
        PGC = parseFloat(person.calcPGC(person).toFixed(4)) ?? 0;
        if (Number.isNaN(PGC) || isNaN(PGC)) {
            console.warn(`PGC retornando como NaN`);
            PGC = 0;
        }
        const PGCDecayArray = _edFisNutModel__WEBPACK_IMPORTED_MODULE_0__.isPGCDecaying(person, PGC, targInpPGC);
        if (PGCDecayArray[0] === true) {
            PGC = PGCDecayArray[1];
            targInpPGC.value = PGC.toFixed(2);
        }
        else {
            targInpPGC.value = PGC.toFixed(4);
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.inputNotFound(targInpPGC, "targInpPGC", slicedError ?? "NULL");
    }
    if (PGC <= 0) {
        console.warn(`Valor de PGC não atualizado.
    Valor obtido: ${PGC || 0}`);
    }
    return [PGC ?? 0, targInpSumDCut ?? null, targInpPGC ?? null];
}
function updateAtvLvl(mainSelect, atvLvl, secondarySelect) {
    const returnedAtvLvl = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_2__.updateSimpleProperty(mainSelect) ?? "";
    if (typeof returnedAtvLvl === "string") {
        atvLvl = returnedAtvLvl;
        secondarySelect.value = atvLvl;
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.typeError("atualização de mainSelect em updateAtLvl()", returnedAtvLvl ?? null, "string", slicedError ?? "NULL");
    }
    return atvLvl;
}
function defineTargInps(numRef, context, parentEl) {
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
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.stringError("convertendo Número de Consulta de string para número", numRef, slicedError ?? "NULL");
        }
    }
    if (typeof numRef === "number") {
        if (context === "cons" || context === "tab") {
            if (context === "cons") {
                targInpWeight = parentEl.querySelector(`#tabInpRowMedAnt2_${numRef + 1}`);
                arrayTargInps.push(targInpWeight);
                targInpHeight = parentEl.querySelector(`#tabInpRowMedAnt3_${numRef + 1}`);
                arrayTargInps.push(targInpHeight);
                targInpIMC = parentEl.querySelector(`#inpImc${numRef}Cel2_${numRef + 1}`);
                arrayTargInps.push(targInpIMC);
                targInpMLG = parentEl.querySelector(`#inpMlg${numRef}Cel3_${numRef + 1}`);
                arrayTargInps.push(targInpMLG);
                targInpTMB = parentEl.querySelector(`#inpTmb${numRef}Cel5_${numRef + 1}`);
                arrayTargInps.push(targInpTMB);
                targInpGET = parentEl.querySelector(`#inpGet${numRef}Cel6_${numRef + 1}`);
                arrayTargInps.push(targInpGET);
            }
            else if (context === "tab") {
                targInpWeight = parentEl.querySelector(`#tabInpRowMedAnt2_${numRef}`);
                arrayTargInps.push(targInpWeight);
                targInpHeight = parentEl.querySelector(`#tabInpRowMedAnt3_${numRef}`);
                arrayTargInps.push(targInpHeight);
                targInpIMC = parentEl.querySelector(`#inpImc${numRef - 1}Cel2_${numRef}`);
                arrayTargInps.push(targInpIMC);
                targInpMLG = parentEl.querySelector(`#inpMlg${numRef - 1}Cel3_${numRef}`);
                arrayTargInps.push(targInpMLG);
                targInpTMB = parentEl.querySelector(`#inpTmb${numRef - 1}Cel5_${numRef}`);
                arrayTargInps.push(targInpTMB);
                targInpGET = parentEl.querySelector(`#inpGet${numRef - 1}Cel6_${numRef}`);
                arrayTargInps.push(targInpGET);
            }
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.typeError("numRef", numRef ?? null, "number ou string somente com números", slicedError ?? "NULL");
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.stringError("validando contexto. Valores de string aceitos: cons || tab.", context ?? "undefined", slicedError ?? "NULL");
    }
    if (arrayTargInps.length === 6) {
        for (let iA = 0; iA < arrayTargInps.length; iA++) {
            if (arrayTargInps[iA] instanceof HTMLInputElement &&
                arrayTargInps[iA].type === "number") {
                validTargInps.push(arrayTargInps[iA]);
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.inputNotFound(arrayTargInps[iA], `arrayTargInps ${enumTargInpTypes[iA]}`, slicedError ?? "NULL");
                arrayTargInps[iA] = null;
            }
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.elementNotPopulated(arrayTargInps ?? null, "arrayTargInps", slicedError ?? "NULL");
    }
    return validTargInps;
}
function addRowAtivFis(container) {
    if (container instanceof HTMLButtonElement &&
        container.tagName === "BUTTON") {
        if (container.classList.contains("addAtFisRot")) {
            const tBodyContainer = document.getElementById("tabTbodyAtFisRot");
            const newRow = document.createElement("tr");
            newRow.className = "contQuint tabRowAtFisRot";
            newRow.id = `tabRowAtFisRotId${rowCountAtivFisRot}`;
            newRow.innerHTML = `
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_1" itemprop="celAtFisRot">${rowCountAtivFisRot - 1}&#41</td>
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
                    textElements[iT].addEventListener("input", () => _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_1__.autoCapitalizeInputs(textElements[iT]));
                }
                for (let iN = 0; iN < numInps.length; iN++) {
                    numInps[iN].addEventListener("input", () => _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_1__.numberLimit(numInps[iN]));
                }
            }
            rowCountAtivFisRot++;
        }
        else if (container.classList.contains("removeAtFisRot")) {
            const validParent = document.getElementById("tabAtFisRot");
            if (validParent) {
                const siblingsCollection = validParent.children;
                const validNextParent = siblingsCollection.namedItem(`tabTbodyAtFisRot`);
                if (validNextParent) {
                    const nextSiblingsCollection = validNextParent.children;
                    const rowToRemove = nextSiblingsCollection.namedItem(`tabRowAtFisRotId${rowCountAtivFisRot - 1}`);
                    if (rowToRemove &&
                        rowCountAtivFisRot !== 3 &&
                        rowToRemove.id !== "tabRowAtFisRotId2") {
                        rowToRemove.remove();
                        rowCountAtivFisRot -= 1;
                    }
                }
            }
        }
        else if (container.classList.contains("addAtFisProp")) {
            const tBodyContainer = document.getElementById("tabTbodyAtFisProp");
            const newRow = document.createElement("tr");
            newRow.className = "contQuint tabRowAtFisProp";
            newRow.id = `tabRowAtFisPropId${rowCountAtivFisProp}`;
            newRow.innerHTML = `
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_1" itemprop="celAtFisProp">${rowCountAtivFisProp - 1}&#41</td>
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
                    textElements[iT].addEventListener("input", () => _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_1__.autoCapitalizeInputs(textElements[iT]));
                }
                for (let iN = 0; iN < numInps.length; iN++) {
                    numInps[iN].addEventListener("input", () => _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_1__.numberLimit(numInps[iN]));
                }
            }
            rowCountAtivFisProp++;
        }
        else if (container.classList.contains("removeAtFisProp")) {
            const validParent = document.getElementById("tabAtFisProp");
            if (validParent) {
                const siblingsCollection = validParent.children;
                const validNextParent = siblingsCollection.namedItem(`tabTbodyAtFisProp`);
                if (validNextParent) {
                    const nextSiblingsCollection = validNextParent.children;
                    const rowToRemove = nextSiblingsCollection.namedItem(`tabRowAtFisPropId${rowCountAtivFisProp - 1}`);
                    if (rowToRemove &&
                        rowCountAtivFisProp !== 3 &&
                        rowToRemove.id !== "tabRowAtFisPropId2") {
                        rowToRemove.remove();
                        rowCountAtivFisProp -= 1;
                    }
                }
            }
        }
    }
}
function addRowComorb(container) {
    if (container.tagName === "BUTTON" && container.id === "addComorb") {
        const parentTab = document.getElementById("tabComorb");
        const newComorbRow = document.createElement("tr");
        newComorbRow.className = "contTerc tabRowComorb";
        newComorbRow.id = `tabRowComorb${rowCountComorb}`;
        newComorbRow.innerHTML = `
    <td class="contQuat tabCelComorb tabCelRowComorb${rowCountComorb}" id="tabCelRowComorb${rowCountComorb}_1">${rowCountComorb - 1}</td>
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
                textElements[iB].addEventListener("input", () => _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_1__.autoCapitalizeInputs(textElements[iB]));
            }
            rowCountComorb++;
        }
    }
    else if (container.tagName === "BUTTON" &&
        container.id === "removeComorb") {
        const validComorbParent = document.getElementById("tabComorb");
        if (validComorbParent) {
            const siblingsComorbCollection = validComorbParent.children;
            if (validComorbParent) {
                const comorbRowToRemove = siblingsComorbCollection.namedItem(`tabRowComorb${rowCountComorb - 1}`);
                if (comorbRowToRemove &&
                    rowCountComorb !== 3 &&
                    comorbRowToRemove.id !== "tabRowComorb2") {
                    comorbRowToRemove.remove();
                    rowCountComorb--;
                }
            }
        }
    }
}
function switchRequiredCols(elements) {
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
        let returnedNum = parseInt(_global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_2__.updateSimpleProperty(numConsElement) ?? "0", 10);
        if (Number.isNaN(returnedNum)) {
            console.warn(`returnedNum retornado como NaN, revertido para 0`);
            returnedNum = 0;
        }
        if (typeof returnedNum === "number" &&
            returnedNum > 0 &&
            returnedNum <= 3) {
            numCons = returnedNum;
            //inicia construção de matriz para reset de required na tabela
            const totalTables = consTablesFs?.querySelectorAll("table");
            const totalRows = consTablesFs?.querySelectorAll("tr");
            let nTotalRows = 0;
            if (totalRows && totalRows.length > 0) {
                nTotalRows = totalRows.length - totalTables.length;
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.elementNotPopulated(totalRows ?? null, "NodeList de elementos <tr> em switchRequiredCols()", slicedError ?? "NULL");
            }
            const totalCols = consTablesFs?.querySelectorAll("col");
            let nTotalCols = 0;
            if (totalCols && totalCols.length > 0) {
                nTotalCols = totalCols.length - totalTables.length;
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.elementNotPopulated(totalCols ?? null, "NodeList de elementos <col> em switchRequiredCols()", slicedError ?? "NULL");
            }
            let nTotalMatrixValidAxes = 0;
            if (nTotalRows !== 0 &&
                !Number.isNaN(nTotalRows) &&
                nTotalCols !== 0 &&
                !Number.isNaN(nTotalCols)) {
                nTotalMatrixValidAxes = nTotalRows * nTotalCols;
            }
            else {
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
            if (inpsCells.length > 0 &&
                inpsCells.length === nTotalMatrixValidAxes / totalTables.length) {
                inpsCells.forEach((inpCel) => {
                    if (inpCel instanceof HTMLInputElement) {
                        inpCel.required = false;
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.inputNotFound(inpCel ?? null, "inpCel", slicedError ?? "NULL");
                    }
                });
            }
            else {
                console.error(`Erro na determinação de .length do array de Input em Células.
        Número obtido: ${inpsCells.length ?? 0};
        Equivale ao número desejado para a matriz de Eixos de Preenchimento: ${inpsCells.length === nTotalMatrixValidAxes ?? false};
        Número aceito: ${nTotalMatrixValidAxes / totalTables.length};
        Número de Inputs para Sinais Vitais obtido: ${inpsCellsSVi?.length ?? 0};
        Número de Inputs para Medidas Antropométricas obtido: ${inpsCellsMedAnt?.length ?? 0};
        Número de Inputs para Dobras Cutâneas obtido: ${inpsCellsDC?.length ?? 0};
        Número de Inputs para Índices e Percentuais obtido: ${inpsCellsIndPerc?.length ?? 0}.`);
            }
            //determinação das novas cells required
            const validInpsNodeLists = [false, false, false, false];
            //formação das matrizes para validar os números de inputs obtidos para cada tabela
            const nRowsSVi = tabSVi.querySelectorAll("tr");
            const nColsSVi = tabSVi.querySelectorAll("col");
            let matrixValidAxesSVi = 0;
            if (nRowsSVi.length > 0 && nColsSVi.length > 0) {
                matrixValidAxesSVi = (nRowsSVi.length - 1) * (nColsSVi.length - 1);
            }
            else {
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
            }
            else {
                console.error(`Erro validando Número de Linhas na Tabela de Medidas Antropométricas.
        Número de Linhas obtidas: ${nRowsMedAnt?.length ?? 0};
        Número de Colunas obtidas: ${nColsMedAnt?.length ?? 0}.`);
            }
            const nRowsDC = tabDC.querySelectorAll("tr");
            const nColsDC = tabDC.querySelectorAll("col");
            let matrixValidAxesDC = 0;
            if (nRowsDC.length > 0 && nColsDC.length > 0) {
                matrixValidAxesDC = (nRowsDC.length - 1) * (nColsDC.length - 1);
            }
            else {
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
            }
            else {
                console.error(`Erro validando Número de Linhas na Tabela de Índices e Percentuais.
        Número de Linhas obtidas: ${nRowsIndPerc?.length ?? 0};
        Número de Colunas obtidas: ${nColsIndPerc?.length ?? 0}.`);
            }
            //validação das NodeLists de Inputs nas células
            if (Array.from(inpsCellsSVi).every((inpCell) => inpCell instanceof HTMLInputElement) &&
                inpsCellsSVi.length > 0 &&
                inpsCellsSVi.length === matrixValidAxesSVi) {
                validInpsNodeLists[0] = true;
            }
            else {
                console.warn(`Erro capturando inputs de Sinais Vitais com querry.
          Array obtido: ${JSON.stringify(inpsCellsSVi) ?? "null"};
          Todos os elementos como HTMLInputs: ${Array.from(inpsCellsSVi).every((inpCell) => inpCell instanceof HTMLInputElement) ?? false};
          Length esperada: ${matrixValidAxesSVi ?? 0}.`);
            }
            if (Array.from(inpsCellsMedAnt).every((inpCell) => inpCell instanceof HTMLInputElement) &&
                inpsCellsMedAnt.length > 0 &&
                inpsCellsMedAnt.length === matrixValidAxesMedAnt) {
                validInpsNodeLists[1] = true;
            }
            else {
                console.warn(`Erro capturando inputs de Medidas Antropométricas com querry.
          Array obtido: ${JSON.stringify(inpsCellsMedAnt) ?? "null"};
          Todos os elementos como HTMLInputs: ${Array.from(inpsCellsMedAnt).every((inpCell) => inpCell instanceof HTMLInputElement) ?? false};
          Length esperada: ${matrixValidAxesMedAnt ?? 0}`);
            }
            if (Array.from(inpsCellsDC).every((inpCell) => inpCell instanceof HTMLInputElement) &&
                inpsCellsDC.length > 0 &&
                inpsCellsDC.length === matrixValidAxesDC) {
                validInpsNodeLists[2] = true;
            }
            else {
                console.warn(`Erro capturado inputs de Dobras Cutâneas com querry.
          Array obtido: ${JSON.stringify(inpsCellsDC) ?? "null"};
          Todos os elementos como HTMLInputs: ${Array.from(inpsCellsDC).every((inpCell) => inpCell instanceof HTMLInputElement) ?? false};
          Length esperada: ${matrixValidAxesDC ?? 0}`);
            }
            if (Array.from(inpsCellsIndPerc).every((inpCell) => inpCell instanceof HTMLInputElement) &&
                inpsCellsIndPerc.length > 0 &&
                inpsCellsIndPerc.length === matrixValidAxesIndPerc) {
                validInpsNodeLists[3] = true;
            }
            else {
                console.warn(`Erro capturando inputs de Índices e Percentuais com querry.
          Array obtido: ${JSON.stringify(inpsCellsIndPerc) ?? "null"};
          Todos os elementos como HTMLInputs: ${Array.from(inpsCellsIndPerc).every((inpCell) => inpCell instanceof HTMLInputElement) ?? false};
          Length esperada: ${matrixValidAxesIndPerc ?? 0}`);
            }
            const consRequiredCellsSVi = [];
            const consRequiredCellsMedAnt = [];
            const consRequiredCellsDC = [];
            const consRequiredCellsIndPerc = [];
            //validação de NodeLists para inputs nas tabelas
            if (validInpsNodeLists.every((inpsNodeListValidation) => inpsNodeListValidation === true)) {
                /* percorre a tabela usando o número de consulta como números de ciclos
                ou seja, length dos arrays formados pelas querries === length do número de consulta === número de colunas
                + são extraídas as células de interesse, com base na .id relativa à coluna, e então populam requiredCels */
                for (let iC = 0; iC < numCons; iC++) {
                    const filterPattern = new RegExp(`_${iC + 2}`);
                    const filterInpCellSVi = Array.from(inpsCellsSVi).filter((inpCellSVi) => filterPattern.test(inpCellSVi.id));
                    if (filterInpCellSVi.length > 0) {
                        consRequiredCellsSVi.push(filterInpCellSVi);
                    }
                    else {
                        console.warn(`Erro na filtragem de .id dos elementos da Tabela de Sinais Vitais, coluna ${iC}.`);
                    }
                    const filterInpCellMedAnt = Array.from(inpsCellsMedAnt).filter((inpCellMedAnt) => filterPattern.test(inpCellMedAnt.id));
                    if (filterInpCellMedAnt.length > 0) {
                        consRequiredCellsMedAnt.push(filterInpCellMedAnt);
                    }
                    else {
                        console.warn(`Erro na filtragem de .id dos elementos da Tabela de Medidas Antropomórfias, coluna ${iC}.`);
                    }
                    const filterInpCellDC = Array.from(inpsCellsDC).filter((inpCellDC) => filterPattern.test(inpCellDC.id));
                    if (filterInpCellDC.length > 0) {
                        consRequiredCellsDC.push(filterInpCellDC);
                    }
                    else {
                        console.warn(`Erro na filtragem de .id dos elementos da Tabela de Dobras Cutâneas, coluna ${iC}.`);
                    }
                    if (Array.from(inpsCellsIndPerc).every((inpCell) => inpCell instanceof HTMLInputElement)) {
                        const filterInpCellIndPerc = Array.from(inpsCellsIndPerc).filter((inpCellIndPerc) => filterPattern.test(inpCellIndPerc.name));
                        if (filterInpCellIndPerc.length > 0) {
                            consRequiredCellsIndPerc.push(filterInpCellIndPerc);
                        }
                        else {
                            console.warn(`Erro na filtragem de .id dos elementos da Tabela de Índices e Percentuais, coluna ${iC}.`);
                        }
                    }
                    else {
                        console.warn(`Erro na validação de instâncias para inpsCellsIndPerc.`);
                    }
                }
            }
            else {
                console.error(`Erro na validação de NodeLists de Inputs nas Tabelas.
        Array de Validação para NodeLists obtido: ${JSON.stringify(validInpsNodeLists) ?? "undefined"}`);
            }
            const requiredCells = [
                ...consRequiredCellsSVi,
                ...consRequiredCellsMedAnt,
                ...consRequiredCellsDC,
                ...consRequiredCellsIndPerc,
            ];
            const flatRequiredCells = requiredCells.flat(1);
            if (flatRequiredCells.length > 0 &&
                flatRequiredCells.length === nTotalRows * numCons) {
                for (let iR = 0; iR < flatRequiredCells.length; iR++) {
                    if (flatRequiredCells[iR] instanceof HTMLInputElement ||
                        flatRequiredCells[iR] instanceof HTMLTextAreaElement ||
                        flatRequiredCells[iR] instanceof HTMLSelectElement)
                        flatRequiredCells[iR].required = true;
                }
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.elementNotPopulated(flatRequiredCells ?? null, "flatRequiredCells", slicedError ?? "NULL");
            }
        }
        else {
            console.error(`Erro atualizando Número de Consulta.
          Número obtido: ${returnedNum ?? 0}`);
        }
    }
    else {
        console.error(`Erro obtendo HTMLElements a partir de operador rest.
    Length obtida: ${elements?.length ?? 0};
    Instância obtida para elements[1]: ${Object.prototype.toString.call(elements[1]).slice(8, -1) ?? "null"}`);
    }
}
function switchNumConsTitles(consTitles, trioEl, numTitledCons, numTabs) {
    const iniTrioValue = trioEl.value;
    const iniValue = parseInt(iniTrioValue) ?? 0;
    const trioNums = [];
    if (Number.isNaN(iniValue)) {
        console.warn(`iniValue retornado como NaN. Revertido para 0.`);
        for (let t = 0; t <= numTabs * numTabs - 1; t += numTitledCons / numTabs) {
            trioNums.push(1, 2, 3);
        }
    }
    else {
        for (let j = 0; j <= numTabs * numTabs - 1; j += numTitledCons / numTabs) {
            trioNums.push(iniValue, iniValue + 1, iniValue + 2);
        }
    }
    for (let i = 0; i < consTitles.length; i++) {
        console.log(JSON.stringify(trioNums));
        consTitles[i].textContent = `${trioNums[i] || `${1 + i}`}ª Consulta`;
    }
}
function createArraysRels(btnId, arrayRows, protocolValue) {
    let arrayConsultasNum = [];
    let rowValues = [];
    let tabValues = [];
    let columnValues = [];
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
            const isValidRowArray = arrayRows.every((row) => row instanceof HTMLTableRowElement);
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
                rowValues = getRowValues(arrayRows, arrayConsultasNum, arrayCelsIds) ?? [""];
                if (rowValues) {
                    tabValues = [...tabValues, ...rowValues];
                }
            }
        }
        for (let iT = btnCol - 2; iT < tabValues.length; iT += 3) {
            columnValues = [...columnValues, tabValues[iT]];
        }
        if (arrayConsultasNum &&
            btnCol - 1 === arrayConsultasNum[btnCol - 2] &&
            columnValues) {
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
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.elementNotFound(protocolValue ?? null, "protocolo", slicedError ?? "NULL");
            }
            if (protocoloNum === 3 || protocoloNum === 7) {
                for (let iR = 0; iR < btnRow - 1; iR++) {
                    const targCelInp = document.getElementById(`tabInpRowDCut${2 + iR}_${btnCol}`);
                    if (targCelInp instanceof HTMLInputElement) {
                        if (iR < btnRow - 2) {
                            //acumula valor de inputs na coluna (em correto funcionamento, para rows sem o input de somatório)
                            if (targCelInp && targCelInp.value !== "") {
                                if (Number.isNaN(parseFloat(parseFloat(targCelInp?.value).toFixed(4)))) {
                                    console.warn(`targCelInp.value retornado como NaN, revertido para 0`);
                                    colAcc = 0;
                                }
                                else {
                                    colAcc += parseFloat(parseFloat(targCelInp?.value).toFixed(4));
                                }
                            }
                        }
                        else if (iR < btnRow - 1) {
                            //inicia busca e validação para encontrar row do botão
                            const tbodyQuery = document.getElementById("tabTbodyDCut");
                            if (tbodyQuery) {
                                const tBodyChildren = Array.from(tbodyQuery.children);
                                if (tBodyChildren &&
                                    tBodyChildren.every((tBodyChild) => tBodyChild instanceof HTMLElement)) {
                                    for (let iC = 0; iC < tBodyChildren.length; iC++) {
                                        const innerInp = tBodyChildren[iC].querySelector("input");
                                        if (!tBodyChildren[iC].hidden &&
                                            inputAcc < protocoloNum &&
                                            innerInp) {
                                            if (innerInp.value !== "") {
                                                inputAcc++;
                                            }
                                            else if (innerInp.value === "") {
                                                innerInp.value = "0";
                                                inputAcc++;
                                            }
                                        }
                                    }
                                }
                                else {
                                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                        "";
                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.elementNotPopulated(tBodyChildren ?? null, "tBodyChildren", slicedError ?? "NULL");
                                }
                                //deposita valor no último input da coluna (em correto funcionamente, o de somatório)
                                if (inputAcc === protocoloNum) {
                                    targCelInp.value = colAcc.toString();
                                    return colAcc;
                                }
                                else {
                                    //TODO DIALOG DE ALERTA
                                    console.warn(`Número de preenchimentos insuficiente. Número obtido: ${inputAcc}; Número exigido: 3`);
                                }
                            }
                        }
                    }
                }
            }
            else {
                console.error(`Erro obtendo número de protocolo.
        Número obtido: ${protocoloNum ?? 0}`);
            }
        }
        else if (!columnValues) {
            //TODO DIALOG DE ALERTA
        }
    }
    return 0;
}
function getConsultasNums(arrayRow) {
    const strConsultasNum = arrayRow.innerText.replaceAll(/[\D]/g, "");
    let arrayConsultasNum = [];
    for (let iL = 0; iL < strConsultasNum.length; iL++) {
        let consultasLetter = parseInt(strConsultasNum.slice(0 + iL, 1 + iL) ?? "0", 10);
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
function getRowValues(arrayRows, arrayConsultasNum, arrayCelIds) {
    const arrayRowValues = [""];
    arrayConsultasNum.forEach((num) => {
        if (typeof num === "string") {
            num = parseInt(num, 10);
            if (Number.isNaN(num)) {
                console.warn(`Número de consulta retornado como NaN. Revertido para 0.`);
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
                    const targCelInp = document.getElementById(`tabInpRowDCut${numRow}_${1 + arrayConsultasNum[iCol]}`);
                    if (targCelInp && targCelInp instanceof HTMLInputElement) {
                        if (targCelInp.value !== "") {
                            arrayRowValues.push(targCelInp.value);
                        }
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_3__.inputNotFound(targCelInp ?? null, "targCelInp", slicedError ?? "NULL");
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


/***/ }),

/***/ "./src/edFisNutModel.tsx":
/*!*******************************!*\
  !*** ./src/edFisNutModel.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeTabDCutLayout: () => (/* binding */ changeTabDCutLayout),
/* harmony export */   checkInnerColGroups: () => (/* binding */ checkInnerColGroups),
/* harmony export */   isPGCDecaying: () => (/* binding */ isPGCDecaying)
/* harmony export */ });
/* harmony import */ var _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global-scripts/src/gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global-scripts/src/errorHandler */ "../global-scripts/src/errorHandler.tsx");
/* harmony import */ var _global_scripts_src_classes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global-scripts/src/classes */ "../global-scripts/src/classes.tsx");
//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização



function checkInnerColGroups(parentElement) {
    const validColGroupsChildCount = [];
    let areAllCoolGroupsSimilar = false;
    if (parentElement instanceof HTMLElement) {
        const colGroups = Array.from(parentElement.querySelectorAll("colgroup"));
        const areColGroupValids = colGroups.every((colGroup) => colGroup instanceof HTMLTableColElement);
        //popula arrays de colgroups com base em filtragem de instância
        if (areColGroupValids && colGroups.length > 0) {
            for (let i = 0; i < colGroups.length; i++) {
                const colGrpChilds = colGroups[i].children;
                const cols = Array.from(colGrpChilds);
                if (cols.every((col) => col instanceof HTMLTableColElement)) {
                    validColGroupsChildCount.push(colGroups[i].childElementCount);
                }
                else {
                    const colsInstances = [];
                    for (let j = 0; j < cols.length; j++) {
                        const childInstance = `${Object.prototype.toString.call(cols[j]).slice(8, -1) ?? "null"}`;
                        colsInstances.push(childInstance);
                        if (childInstance !== `HTMLTableColElement`) {
                            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_1__.elementNotFound(cols[j] ?? null, "child <col>", slicedError ?? "NULL");
                        }
                    }
                    const validCols = cols.filter((col) => col instanceof HTMLTableColElement);
                    validColGroupsChildCount.push(validCols.length);
                }
            }
        }
        else {
            console.warn(`Erro validando colGroups.
      areColGroupValids: ${areColGroupValids ?? false};
      Instância obtida: ${Object.prototype.toString.call(colGroups).slice(8, -1) ?? "null"};
      Length obtida: ${colGroups.length ?? 0}`);
        }
        //filtra array de colgroups válida com base em colunas de tamanho similar
        const pairedColGroupsValid = [];
        for (let m = 0; m < validColGroupsChildCount.length; m++) {
            if (m === 0) {
                continue;
            }
            else {
                if ((validColGroupsChildCount[m] = validColGroupsChildCount[m - 1])) {
                    pairedColGroupsValid.push(true);
                }
                else {
                    console.warn(`Erro validando par de Col Groups.
          Par invalidado: ${validColGroupsChildCount[m] ?? "null"} com ${validColGroupsChildCount[m - 1] ?? "null"}`);
                    pairedColGroupsValid.push(false);
                }
            }
        }
        //verifica se todos os pares são válidos para, em caso negativo, fornecer warn
        if (pairedColGroupsValid.every((pairedColGroup) => pairedColGroup === true)) {
            areAllCoolGroupsSimilar = true;
        }
        else {
            console.warn(`Grupos de Colunas não são similares no número de children`);
            areAllCoolGroupsSimilar = false;
        }
    }
    return [validColGroupsChildCount?.length ?? 0, areAllCoolGroupsSimilar];
}
function changeTabDCutLayout(protocolo, tabDC) {
    const bodyType = document.getElementById("textBodytype");
    if (protocolo &&
        tabDC &&
        bodyType &&
        (bodyType instanceof HTMLSelectElement ||
            bodyType instanceof HTMLInputElement)) {
        const optionElementMatch7 = protocolo?.value
            .match(/^pollock7$/i)
            ?.toString();
        const optionElementMatch3 = protocolo?.value
            .match(/^pollock3$/i)
            ?.toString();
        const opsProtocolo = Array.from(protocolo.children);
        const filteredOpsProtocolo = opsProtocolo.filter((childProtocolo) => childProtocolo instanceof HTMLOptionElement);
        if (filteredOpsProtocolo.length < opsProtocolo.length) {
            console.warn(`Algum elementos de Protocolo não foram reconhecidos como opções. Total de reconhecimentos: ${filteredOpsProtocolo.length}`);
        }
        for (let iOp = 0; iOp < filteredOpsProtocolo.length - 1; iOp++) {
            if (optionElementMatch3) {
                const arrayTabIds = checkTabRowsIds(tabDC);
                if (arrayTabIds && arrayTabIds.length !== tabDC.rows.length) {
                    const genderedIds = _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_0__.filterIdsByGender(arrayTabIds, bodyType.value);
                    if (bodyType.value === "masculino" || bodyType.value === "feminino") {
                        if (genderedIds && genderedIds.length === 3) {
                            const matchedIds = [];
                            for (let iG = 0; iG < genderedIds.length; iG++) {
                                for (let iR = 0; iR < arrayTabIds.length; iR++) {
                                    if (genderedIds[iG].toLowerCase() === arrayTabIds[iR]) {
                                        const slice1 = genderedIds[iG].charAt(0).toUpperCase();
                                        const slice2 = genderedIds[iG].slice(1);
                                        if (slice1 && slice2) {
                                            const capitalizedGenderedId = slice1 + slice2;
                                            matchedIds.push(`row${capitalizedGenderedId}`);
                                        }
                                    }
                                }
                            }
                            const medTrs = Array.from(tabDC.querySelectorAll("tr.tabRowDCutMed"));
                            for (let iTr = 0; iTr < medTrs.length; iTr++) {
                                medTrs[iTr].setAttribute("hidden", "");
                                const innerInp = medTrs[iTr].querySelector("input");
                                if (innerInp && innerInp.required) {
                                    innerInp.removeAttribute("required");
                                    if (medTrs[iTr].id?.slice(-4) !== "Coxa") {
                                        innerInp.value = "";
                                    }
                                }
                            }
                            for (let iMat = 0; iMat < matchedIds.length; iMat++) {
                                const matchedTr = document.getElementById(matchedIds[iMat]);
                                if (matchedTr) {
                                    const isRowHidden = matchedTr.hidden;
                                    if (isRowHidden) {
                                        matchedTr.removeAttribute("hidden");
                                    }
                                    const innerInp = matchedTr.querySelector("input");
                                    if (innerInp) {
                                        innerInp.setAttribute("required", "");
                                    }
                                }
                            }
                        }
                        else {
                            console.warn(`Erro na validação de ids de row. Elemento ${JSON.stringify(genderedIds)}; Número obtido ${genderedIds?.length ?? null}; Número esperado: 3`);
                        }
                    }
                    else if (bodyType.value === "neutro") {
                        if (genderedIds && genderedIds.length === 5) {
                            const matchedIds = [];
                            for (let iG = 0; iG < genderedIds.length; iG++) {
                                for (let iR = 0; iR < arrayTabIds.length; iR++) {
                                    if (genderedIds[iG].toLowerCase() === arrayTabIds[iR]) {
                                        const slice1 = genderedIds[iG].charAt(0).toUpperCase();
                                        const slice2 = genderedIds[iG].slice(1);
                                        const capitalizedGenderedId = slice1 + slice2;
                                        matchedIds.push(`row${capitalizedGenderedId}`);
                                    }
                                }
                            }
                            const medTrs = Array.from(tabDC.querySelectorAll("tr.tabRowDCutMed"));
                            for (let iTr = 0; iTr < medTrs.length; iTr++) {
                                medTrs[iTr].setAttribute("hidden", "");
                                const innerInp = medTrs[iTr].querySelector("input");
                                if (innerInp) {
                                    if (medTrs[iTr].id?.slice(-4) !== "Coxa") {
                                        innerInp.value = "";
                                    }
                                }
                            }
                            for (let iM = 0; iM < matchedIds.length; iM++) {
                                const matchedTr = document.getElementById(matchedIds[iM]);
                                if (matchedTr) {
                                    const isRowHidden = matchedTr.hidden;
                                    if (isRowHidden) {
                                        matchedTr.removeAttribute("hidden");
                                        const innerInp = matchedTr.querySelector("input");
                                        if (innerInp && matchedTr.id?.slice(-4) !== "Coxa") {
                                            innerInp.removeAttribute("required");
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            console.warn(`Erro na validação de ids de row. Elemento ${JSON.stringify(genderedIds)}; Número obtido ${genderedIds?.length ?? null}; Número esperado: 3`);
                        }
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_1__.stringError("validando .value de bodyType", bodyType?.value ?? null, slicedError ?? "NULL");
                    }
                }
                else {
                    console.warn(`Erro na verificação do número de rows. Elemento ${JSON.stringify(arrayTabIds)}; Número obtido: ${arrayTabIds?.length ?? null}; Número esperado: ${tabDC.rows.length}`);
                }
                return "pollock3";
            }
            else if (optionElementMatch7) {
                const medTrs = Array.from(tabDC.querySelectorAll("tr.tabRowDCutMed"));
                for (let iTr = 0; iTr < medTrs.length; iTr++) {
                    const isRowHidden = medTrs[iTr].hidden;
                    if (isRowHidden) {
                        medTrs[iTr].removeAttribute("hidden");
                        const innerInp = medTrs[iTr].querySelector("input");
                        if (innerInp) {
                            innerInp.setAttribute("required", "");
                        }
                    }
                }
                return "pollock7";
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_1__.stringError("obtendo pollock.value", protocolo?.value ?? null, slicedError ?? "NULL");
                return "pollock3";
            }
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_1__.elementNotFound(bodyType ?? null, "bodyType", slicedError ?? "NULL");
        return "pollock3";
    }
    return "pollock3";
}
function checkTabRowsIds(tab) {
    const arrayTabIds = [];
    if (tab.id === "tabDCut") {
        const tableRows = Array.from(tab.querySelectorAll("tr.tabRowDCutMed"));
        for (let iR = 0; iR < tableRows.length; iR++) {
            const rowId = tableRows[iR].id;
            const rowIdMatch = rowId.match(/^row/)?.toString();
            if (rowIdMatch) {
                const slicedRowId = rowId.slice(3).toLowerCase();
                arrayTabIds.push(slicedRowId);
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_1__.stringError(`obtendo id da row ${tableRows[iR] ?? null}`, rowId ?? null, slicedError ?? "NULL");
            }
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_1__.stringError(`obtendo id da table ${tab ?? null}`, tab.id ?? null, slicedError ?? "NULL");
    }
    return arrayTabIds;
}
//correção para limitação da fórmula de PGC
function isPGCDecaying(person, PGC, targInpPGC) {
    let foundDecayPoint = false;
    let sumAcc = 1;
    const initSumDCut = person.sumDCut;
    const decreasedPerson = _global_scripts_src_classes__WEBPACK_IMPORTED_MODULE_2__.Person.clonePerson(person);
    const spanRoundingAlertIcon = document.getElementById(`alert_${targInpPGC.id}`);
    if (!(spanRoundingAlertIcon instanceof HTMLSpanElement)) {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_1__.elementNotFound(spanRoundingAlertIcon ?? null, "spanRoundingAlertIcon", slicedError ?? "NULL");
    }
    else {
        if (spanRoundingAlertIcon.hidden === false) {
            spanRoundingAlertIcon.hidden = true;
        }
    }
    if (decreasedPerson) {
        decreasedPerson.sumDCut = decreasedPerson.sumDCut - 1;
        let decreasedPGC = decreasedPerson.calcPGC(decreasedPerson);
        //caso padrão de decay
        if (decreasedPGC > PGC) {
            if (spanRoundingAlertIcon?.hidden === true) {
                spanRoundingAlertIcon.hidden = false;
            }
            const arrDecreasedPGC = [];
            while (decreasedPerson.sumDCut > 0) {
                sumAcc++;
                decreasedPerson.sumDCut = decreasedPerson.sumDCut - 1;
                decreasedPGC = decreasedPerson.calcPGC(decreasedPerson);
                arrDecreasedPGC.push(decreasedPGC);
                if (decreasedPGC < PGC) {
                    break;
                }
                if (sumAcc > 999) {
                    console.warn(`Ciclo 2 exaurido.`);
                    break;
                }
            }
            if (arrDecreasedPGC.length > 0) {
                const factorNormDecayedPGC = ((initSumDCut - 260) / 100) * 5;
                PGC =
                    Math.ceil((Math.max(...arrDecreasedPGC) + 0.05) * 10) / 10 +
                        factorNormDecayedPGC;
                if (decreasedPerson.sumDCut > 515) {
                    PGC = 60.5;
                }
            }
            else {
                PGC = decreasedPGC;
            }
            foundDecayPoint = true;
        }
        else if (decreasedPGC <= PGC) {
            //casos específicos para handling de input anômalo (além do possível para um ser humano), evitando bugs nos listeners devido a NaN e loops de normalização
            if (PGC > 100 || decreasedPerson.sumDCut > 514) {
                console.warn(`Valor anômalo de entrada para sumDCut e/ou PGC. Valor aproximado fornecido`);
                if (spanRoundingAlertIcon?.hidden === true) {
                    spanRoundingAlertIcon.hidden = false;
                }
                foundDecayPoint = true;
                PGC = 60.45 + 0.05 * ((decreasedPerson?.sumDCut ?? 514) - 513);
            }
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_1__.objectError("decreasedPerson", person ?? null, "person", "6", slicedError);
    }
    return [foundDecayPoint, PGC];
}


/***/ }),

/***/ "../global-scripts/src/classes.tsx":
/*!*****************************************!*\
  !*** ../global-scripts/src/classes.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSONStorager: () => (/* binding */ JSONStorager),
/* harmony export */   JSONTitleStorager: () => (/* binding */ JSONTitleStorager),
/* harmony export */   Man: () => (/* binding */ Man),
/* harmony export */   Neutro: () => (/* binding */ Neutro),
/* harmony export */   Person: () => (/* binding */ Person),
/* harmony export */   Woman: () => (/* binding */ Woman)
/* harmony export */ });
// import React from "react";
class JSONStorager {
    #id;
    #value;
    constructor(id, value) {
        this.#id = id;
        this.#value = value;
        Object.freeze(this);
    }
    get showInpId() {
        return this.#id;
    }
    get showInpValue() {
        return this.#value;
    }
    get showAllInfo() {
        return [this.#id, this.#value];
    }
}
class JSONTitleStorager {
    #title;
    constructor(title) {
        this.#title = title;
        Object.freeze(this);
    }
    get showInpTitle() {
        return this.#title;
    }
}
class Person {
    gen;
    age;
    weight;
    height;
    sumDCut;
    atvLvl;
    constructor(gen, age, weight, height, sumDCut, atvLvl) {
        this.gen = gen;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.sumDCut = sumDCut;
        this.atvLvl = atvLvl;
    }
    checkAtvLvl(person) {
        if (person && "atvLvl" in person && this.atvLvl !== "") {
            switch (this.atvLvl) {
                case "sedentario":
                    return 1.2;
                case "leve":
                    return 1.4;
                case "moderado":
                    return 1.6;
                case "intenso":
                    return 1.9;
                case "muitoIntenso":
                    return 2.2;
                default:
                    console.error(`Erro validando caso. Caso obtido: ${this.atvLvl ?? "null"}; Casos possíveis: sedentário || leve || moderado || intenso || muitoIntenso`);
            }
        }
        else {
            console.error(`Erro validando instância de pessoa. Valor obtido: ${person ?? "null"}; instância ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"}; Valor de Nível de Atividade Física obtido: ${this.atvLvl ?? "null"}`);
            return 0;
        }
        return 0;
    }
    calcIMC(person) {
        try {
            if (person &&
                "weight" in person &&
                this.weight > 0 &&
                "height" in person &&
                this.height > 0) {
                const IMC = this.weight / this.height ** 2;
                if (IMC && IMC > 0) {
                    const MLG = this.weight - this.weight * (IMC / 100) ?? 0;
                    if (IMC < 18.5) {
                        return ["abaixo", IMC, MLG];
                    }
                    else if (IMC >= 18.5 && IMC < 25.0) {
                        return ["eutrofico", IMC, MLG];
                    }
                    else if (IMC >= 25.0 && IMC < 30) {
                        return ["sobrepeso", IMC, MLG];
                    }
                    else if (IMC >= 30 && IMC < 35) {
                        return ["obeso1", IMC, MLG];
                    }
                    else if (IMC >= 35 && IMC < 40) {
                        return ["obeso2", IMC, MLG];
                    }
                    else if (IMC > 40) {
                        return ["obeso3", IMC, MLG];
                    }
                    else {
                        throw new Error(`Erro classificando IMC. Valor obtido: ${IMC ?? 0}; Valores possíveis devem ser positivos`);
                    }
                }
                else {
                    throw new Error(`Erro calculando IMC. Valores usados: Peso ${this.weight ?? 0} e Altura ${this.height ?? 0}`);
                }
            }
            else {
                throw new Error(`Erro validando dados fornecidos. Elemento pessoa: ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"}; weight presente: ${"weight" in person ?? false};
          Peso obtido: ${this.weight ?? 0};
          height presente: ${"height" in person ?? false};
          Altura obtida: ${this.height ?? 0}`);
            }
        }
        catch (IMCError) {
            console.error(IMCError.message);
            return ["", 0, 0];
        }
    }
    calcPGC(person) {
        if ("sumDCut" in person && this.sumDCut >= 0) {
            if (person instanceof Man) {
                let DC = 1.10938 -
                    0.0008267 * this.sumDCut +
                    0.0000016 * this.sumDCut ** 2 -
                    0.0002574 * person.age;
                if (DC <= 0 || Number.isNaN(DC)) {
                    DC = 0.01;
                }
                let PGC = 495 / DC - 450;
                if (PGC <= 0 || Number.isNaN(PGC)) {
                    PGC = 0.01;
                }
                if (PGC > 100) {
                    PGC = 100;
                }
                return PGC;
            }
            else if (person instanceof Woman) {
                let DC = 1.0994921 -
                    0.0009929 * this.sumDCut +
                    0.0000023 * this.sumDCut ** 2 -
                    0.0001392 * person.age;
                if (DC <= 0 || Number.isNaN(DC)) {
                    DC = 0.01;
                }
                let PGC = 495 / DC - 450;
                if (PGC <= 0 || Number.isNaN(PGC)) {
                    PGC = 0.01;
                }
                if (PGC > 100) {
                    PGC = 100;
                }
                return PGC;
            }
            else if (person instanceof Neutro) {
                let DC = 1.10443605 -
                    0.0009098 * this.sumDCut +
                    0.00000195 * this.sumDCut ** 2 -
                    0.0001983 * person.age;
                if (DC <= 0 || Number.isNaN(DC)) {
                    DC = 0.01;
                }
                let PGC = 495 / DC - 450;
                if (PGC <= 0 || Number.isNaN(PGC)) {
                    PGC = 0.01;
                }
                if (PGC > 100) {
                    PGC = 100;
                }
                return PGC;
            }
            else {
                console.error(`Instância de objeto inválida. Instância obtida: ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"}`);
                return 0;
            }
        }
        else {
            console.warn(`Erro validado Propriedade sumDCut:
      Está presente: ${"sumDCut" in person ?? false};
      Valor obtido: ${this.sumDCut ?? 0}`);
            return 0;
        }
    }
    calcTMB(person, IMC, factorAtleta, MLG) {
        try {
            if (person && "atvLvl" in person && this.atvLvl) {
                if (this.atvLvl === "muitoIntenso" &&
                    (factorAtleta === "MLG" || factorAtleta === "Peso")) {
                    if (factorAtleta === "MLG") {
                        if (MLG && MLG > 0) {
                            const TMB = 25.9 * MLG + 284;
                            return ["tinsley", TMB];
                        }
                        else {
                            throw new Error(`Erro validando MLG.
              Valor obtido: ${MLG ?? 0}`);
                        }
                    }
                    else if (factorAtleta === "Peso") {
                        if ("weight" in person && this.weight > 0) {
                            const TMB = 24.8 * this.weight + 10;
                            return ["tinsley", TMB];
                        }
                        else {
                            throw new Error(`Erro validando weight.
              Valor obtido: ${this.weight ?? 0}`);
                        }
                    }
                }
                else if (this.atvLvl === "sedentario" ||
                    this.atvLvl === "leve" ||
                    this.atvLvl === "moderado" ||
                    this.atvLvl === "intenso") {
                    if ("weight" in person &&
                        this.weight > 0 &&
                        "height" in person &&
                        this.height > 0 &&
                        "age" in person) {
                        if (IMC < 25.0 && IMC > 0) {
                            if (person instanceof Man) {
                                const TMB = 66 +
                                    (13.8 * this.weight + 5.0 * this.height - 6.8 * this.age);
                                return ["harrisBenedict", TMB];
                            }
                            else if (person instanceof Woman) {
                                const TMB = 655 +
                                    (9.6 * this.weight + 1.9 * this.height - 4.7 * this.age);
                                return ["harrisBenedict", TMB];
                            }
                            else if (person instanceof Neutro) {
                                const TMB = 360.5 +
                                    (11.7 * this.weight + 3.45 * this.height - 5.75 * this.age);
                                return ["harrisBenedict", TMB];
                            }
                            else {
                                throw new Error(`Erro validando instância de Person. Instância obtida: ${Object.prototype.toString.call(person).slice(8, -1) ??
                                    "null"}`);
                            }
                        }
                        else if (IMC >= 25.0) {
                            if (person instanceof Man) {
                                const TMB = 10 * this.weight + 6.25 * this.height - 5.0 * this.age + 5;
                                return ["mifflinStJeor", TMB];
                            }
                            else if (person instanceof Woman) {
                                const TMB = 10 * this.weight + 6.25 * this.height - 5.0 * this.age - 161;
                                return ["mifflinStJeor", TMB];
                            }
                            else if (person instanceof Neutro) {
                                const TMB = 10 * this.weight + 6.25 * this.height - 5.0 * this.age - 78;
                                return ["mifflinStJeor", TMB];
                            }
                            else {
                                throw new Error(`Erro validando instância de Person. Instância obtida: ${Object.prototype.toString
                                    .call(person)
                                    .slice(8, -1)}`);
                            }
                        }
                        else {
                            throw new Error(`Erro validando IMC. IMC obtido: ${IMC ?? 0}; Valor deve ser númerico, positivo e float`);
                        }
                    }
                    else {
                        throw new Error(`Erro validando propriedades de person.
            weight presente: ${"weight" in person ?? false};
            Valor de weight obtido: ${this.weight ?? 0};
            height presente: ${"height" in person ?? false};
            Valor de height obtido: ${this.height ?? 0};
            age presente: ${"age" in person ?? false};
            `);
                    }
                }
                else {
                    throw new Error(`Erro validando atvLvl e/ou factorAtleta.
            atvLvl obtido: ${this.atvLvl ?? "null"}
            Fator obtido: ${factorAtleta ?? "null"}; Fatores válidos: "MLG" || "Peso"`);
                }
            }
            else {
                throw new Error(`Erro validando person.
        Elemento: ${person ?? "null"};
        Instância: ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"};
        atvLvl presente: ${"atvLvl" in person ?? false};
        Valor de atvLvl obtido: ${this.atvLvl ?? "null"}`);
            }
        }
        catch (TMBError) {
            console.error(TMBError.message);
            return ["", 0];
        }
    }
    calcGET(TMB, factorAtvLvl) {
        if (TMB && factorAtvLvl) {
            const GET = TMB * factorAtvLvl;
            return GET;
        }
        else {
            console.error(`Erro validando argumentos.
      TMB obtido: ${TMB ?? 0};
      factorAtvLvl obtido: ${factorAtvLvl ?? 0}`);
            return 0;
        }
    }
    static clonePerson(person) {
        if (person && "gen" in person) {
            switch (person.gen) {
                case "masculino":
                    return new Man(person.gen, person.age, person.weight, person.height, person.sumDCut, person.atvLvl);
                case "feminino":
                    return new Woman(person.gen, person.age, person.weight, person.height, person.sumDCut, person.atvLvl);
                case "neutro":
                    return new Neutro(person.gen, person.age, person.weight, person.height, person.sumDCut, person.atvLvl);
                default:
                    console.error(`Erro validando .gen de person passada para .clonePerson()
          .gen obtido: ${person?.gen ?? "null"}.`);
            }
        }
        else {
            console.error(`Erro validando person.
      Objeto obtido: ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"};
      .gen presente: ${"gen" in person ?? false}.`);
        }
    }
}
class Man extends Person {
}
class Woman extends Person {
}
class Neutro extends Person {
}


/***/ }),

/***/ "../global-scripts/src/errorHandler.tsx":
/*!**********************************************!*\
  !*** ../global-scripts/src/errorHandler.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   elementNotFound: () => (/* binding */ elementNotFound),
/* harmony export */   elementNotPopulated: () => (/* binding */ elementNotPopulated),
/* harmony export */   elementWithArrayError: () => (/* binding */ elementWithArrayError),
/* harmony export */   elementWithObjectError: () => (/* binding */ elementWithObjectError),
/* harmony export */   elementsNotFoundFunction: () => (/* binding */ elementsNotFoundFunction),
/* harmony export */   inputNotFound: () => (/* binding */ inputNotFound),
/* harmony export */   matchError: () => (/* binding */ matchError),
/* harmony export */   maxNumberError: () => (/* binding */ maxNumberError),
/* harmony export */   multipleElementsNotFound: () => (/* binding */ multipleElementsNotFound),
/* harmony export */   objectError: () => (/* binding */ objectError),
/* harmony export */   stringError: () => (/* binding */ stringError),
/* harmony export */   typeError: () => (/* binding */ typeError)
/* harmony export */ });
// import React from "react";
function elementNotFound(element, elementName, line) {
    if (!element) {
        element = "UNDEFINED ELEMENT";
    }
    if (!elementName) {
        elementName = "UNNAMED ELEMENT";
    }
    if (element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLOptionElement) {
        console.error(`
  ELEMENT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando instância de ${element?.id || elementName || "NULL"}.
  Instância obtida: ${Object.prototype.toString.call(element)?.slice(8, -1) || "NULL"};
  .value obtido: ${element?.value ?? "NULL"}.`);
    }
    else {
        console.error(`
  ELEMENT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando instância de ${element?.id || elementName || "UNDEFINED ID OR NAME"}.
  Instância obtida: ${Object.prototype.toString.call(element)?.slice(8, -1) || "NULL"}.`);
    }
}
function inputNotFound(element, elementName, line) {
    if (!element) {
        element = "UNDEFINED ELEMENT";
    }
    if (!elementName) {
        elementName = "UNNAMED ELEMENT";
    }
    console.error(`INPUT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${element?.id || elementName || "UNDEFINED ID OR NAME"}.
  Elemento obtido: ${element ?? "NULL"};
  Instância obtida: ${Object.prototype.toString.call(element)?.slice(8, -1) || "NULL"};
  Tipo obtido (válido somente para <input>): ${element?.type || "NULL"};
  .value obtido: ${element?.value || "NULL"};
  .checked obitod: ${element?.checked || "NULL"}.`);
}
function elementWithArrayError(context, array, arrayName, element, elementName, line) {
    if (!element) {
        element = "UNDEFINED ELEMENT";
    }
    if (!elementName) {
        elementName = "UNNAMED ELEMENT";
    }
    console.error(`ELEMENT WITH ARRAY ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${context}.
  ${elementName ?? "UNNAMED ELEMENT"} obtido: ${JSON.stringify(array) ?? "NULL"};
  Instância de ${arrayName ?? "UNNAMED ARRAY"} obtido: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"}.`);
}
function elementWithObjectError(context, object, element, elementName, line) {
    if (!element) {
        element = "UNDEFINED ELEMENT";
    }
    if (!elementName) {
        elementName = "UNNAMED ELEMENT";
    }
    console.error(`ELEMENT WITH OBJECT ERROR, LINE ${line ?? "UNDEFINED"}:
    Erro ${context ?? "Undefined Context"}. Elemento: ${JSON.stringify(object)}; instância: ${object?.constructor.name ?? "NULL"}
    ${elementName ?? "UNNAMED ELEMENT"}: instância obtida: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"}`);
}
function elementNotPopulated(array, arrayName, line) {
    if (!array) {
        array = "Undefined Array";
    }
    if (!arrayName) {
        arrayName = "UNNAMED ARRAY";
    }
    console.error(`ELEMENT POPULATION ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${arrayName || "NULL"}.
  Array: ${Array.isArray(array)};
  List ou Collection: ${Object.prototype.toString.call(array)?.slice(8, -1) || "NULL"};
  Length obtida: ${array?.length || "0"};
  Stringificação: ${JSON.stringify(array) ?? "NULL"}`);
}
function multipleElementsNotFound(line, context, ...elements) {
    if (!context || context === "") {
        context = "Undefined Context";
    }
    let errorMessage = `MULTIPLE ELEMENTS NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${context || "Undefined Function Name"}.`;
    const mappedNullElements = elements.map((element) => element === null || element === undefined ? "NULL" : element);
    mappedNullElements.forEach((element) => {
        if (element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement ||
            element instanceof HTMLOptionElement) {
            if (element instanceof HTMLInputElement &&
                (element.type === "radio" || element.type === "checkbox")) {
                errorMessage += `Instância de ${element.id || "NULL"} obtida: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n
        .checked obtido: ${element?.checked || "NULL"}`;
            }
            else {
                errorMessage += `Instância de ${element.id || "NULL"} obtida: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n
        .value obtido: ${element?.value || "NULL"}`;
            }
        }
        else {
            errorMessage += `Instância de ${element.id || "NULL"} obtida: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n`;
        }
    });
    console.error(errorMessage);
}
function elementsNotFoundFunction(line, funcName, ...elements) {
    let errorMessage = `ELEMENTS NOT FOUND FOR FUNCTION, LINE ${line ?? "UNDEFINED"}:
  Erro validando instância obtida para ${funcName || "NULL"}`;
    const mappedNullElements = elements.map((element) => element === null || element === undefined ? "NULL" : element);
    mappedNullElements.forEach((element) => {
        if (element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement ||
            element instanceof HTMLOptionElement) {
            if (element instanceof HTMLInputElement &&
                (element.type === "radio" || element.type === "checkbox")) {
                errorMessage += `Instância de ${element.id || "NULL"} obtida: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n
        .checked obtido: ${element?.checked || "NULL"}`;
            }
            else {
                errorMessage += `Instância de ${element.id || "NULL"} obtida: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n
        .value obtido: ${element?.value || "NULL"}`;
            }
        }
        else {
            errorMessage += `Instância de ${element?.id || "NULL"} obtida: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n`;
        }
    });
    console.error(errorMessage);
}
function maxNumberError(unvalidNumber, title, line) {
    if (!unvalidNumber) {
        unvalidNumber = "0";
    }
    if (typeof unvalidNumber === "number") {
        unvalidNumber = unvalidNumber.toString();
    }
    console.error(`MAX NUMBER ERROR, LINE ${line ?? "UNDEFINED"}:
  Número de ${title || "Undefined Title"} inválidos.
  Número máximo obtido: ${parseInt(unvalidNumber, 10) || 0}`);
}
function stringError(context, text, line) {
    console.error(`STRING ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro ${context}.
  Valor obtido: ${text ?? "NULL"}`);
}
function matchError(context, element, text, line) {
    console.error(`MATCH ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${context || "Undefined Context"}.
  Elemento obtido: ${element || "UNDEFINED ELEMENT"};
  Título obtido: ${text || "Undefined Title"}.`);
}
function typeError(context, element, acceptedType, line) {
    console.error(`TYPE ERROR, LINE ${line ?? "UNDEFINED"}:
  Tipo primitivo obtido para ${context || "Undefined Context"} incorreto.
  Tipo obtido: ${typeof element ?? "Undefined typeof"};
  Tipo aceito: ${acceptedType || "Undefined Accepted Type"}`);
}
function objectError(context, object, objectName, maxPropertiesNumber, line) {
    console.error(`OBJECT ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${objectName ?? "UNDEFINED OBJECT NAME"} para ${context || "Undefined Context"}.
  Objecto obtido: ${JSON.stringify(object) ?? "Undefined Object"};
  Número obtido de propriedades: ${Object.keys.length ?? 0}; Número aceito: ${maxPropertiesNumber ?? 0}`);
}


/***/ }),

/***/ "../global-scripts/src/gHandlers.tsx":
/*!*******************************************!*\
  !*** ../global-scripts/src/gHandlers.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeToAstDigit: () => (/* binding */ changeToAstDigit),
/* harmony export */   cpbInpHandler: () => (/* binding */ cpbInpHandler),
/* harmony export */   createJSONAnchor: () => (/* binding */ createJSONAnchor),
/* harmony export */   cursorCheckTimer: () => (/* binding */ cursorCheckTimer),
/* harmony export */   deactTextInput: () => (/* binding */ deactTextInput),
/* harmony export */   doubleClickHandler: () => (/* binding */ doubleClickHandler),
/* harmony export */   getJSONDesc: () => (/* binding */ getJSONDesc),
/* harmony export */   opRadioHandler: () => (/* binding */ opRadioHandler),
/* harmony export */   regenerateJSONBtn: () => (/* binding */ regenerateJSONBtn),
/* harmony export */   resetarFormulario: () => (/* binding */ resetarFormulario),
/* harmony export */   searchNextSiblings: () => (/* binding */ searchNextSiblings),
/* harmony export */   searchParents: () => (/* binding */ searchParents),
/* harmony export */   searchPreviousSiblings: () => (/* binding */ searchPreviousSiblings),
/* harmony export */   searchPreviousSiblingsById: () => (/* binding */ searchPreviousSiblingsById),
/* harmony export */   subForm: () => (/* binding */ subForm),
/* harmony export */   updateSimpleProperty: () => (/* binding */ updateSimpleProperty),
/* harmony export */   useCurrentDate: () => (/* binding */ useCurrentDate)
/* harmony export */ });
/* harmony import */ var _gModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes */ "../global-scripts/src/classes.tsx");
/* harmony import */ var _errorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout



// import React from 'react';
const mapIdsTitles = {
    firstNameId: "Primeiro_Nome",
    additionalNameId: "Sobrenome_do_Meio",
    familyNameId: "Último_Sobrenome",
    socialNameId: "Nome_Social",
    telAreaCodeId: "DDD",
    telId: "Telefone",
    telCountryCodeId: "Se_estrangeiro,_código_do_País",
    tel2AreaCodeId: "DDD_Do_Telefone_Secundário",
    tel2Id: "Telefone_Secundário",
    tel2CountryCodeId: "Se_estrangeiro(secundário),_código_do_País",
    email1Id: "Email",
    email2Id: "Email_Secundário",
    dateAgeId: "Idade",
    genid: "Gênero",
    genBirthRelId: "Identidade_em_relação_ao_gênero_designado_na_nascença",
    genTransId: "Estágio_da_Transição_Hormonal",
    genFisAlinId: "Alinhamento_de_características_físicas_predominante",
};
function updateSimpleProperty(element) {
    if (element instanceof HTMLInputElement) {
        if (element.type === "radio" || element.type === "checkbox") {
            return element.checked.toString();
        }
        else if (element.type === "number") {
            if (Number.isNaN(parseFloat(element.value.replaceAll(/[^0-9.,+-]/g, "")))) {
                console.warn(`element.value retornado como NaN, revertido para 0.`);
                return 0;
            }
            else {
                return parseFloat(element.value.replaceAll(/[^0-9.,+-]/g, ""));
            }
        }
        else if (element.type === "text" || element.type === "date") {
            return element.value;
        }
        else {
            console.warn(`Erro validando type de Input para atualização de propriedade de person.
      Tipo obtido: ${element?.type ?? "null"}`);
        }
    }
    else if (element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement) {
        return element.value;
    }
    else {
        console.warn(`Erro validando Element para atualização de propriedade de person.
    Instância obitda: ${Object.prototype.toString.call(element).slice(8, -1) ?? "null"}`);
    }
}
function cursorCheckTimer(cursorPosition) {
    const selection = window.getSelection();
    if (selection && selection.focusNode !== null) {
        cursorPosition = selection.getRangeAt(0)?.startOffset;
        setTimeout(() => {
            return cursorPosition;
        }, 3000);
    }
    return 0;
}
function getJSONDesc(inputs) {
    const titleElements = [];
    const closestValidElements = [];
    const closestValidElementsIds = [];
    const closestBooleanElements = [];
    const closestBooleanElementsIds = [];
    const inpValues = [];
    const inpIds = [];
    const JSONInpsStoreDescriptors = [];
    const JSONTitlesStoreDescriptors = [];
    let JSONInpsStore = [];
    let JSONTitlesStore = [];
    let titleAcc = 0;
    let nullTitleAcc = 0;
    //determinação do número de inputs de identificação cujos títulos são de interesse e construção de subarray para estes
    for (let k = 0; k < inputs.length; k++) {
        if (inputs[k]?.classList.contains("inpIdentif")) {
            titleElements.push(inputs[k]);
        }
    }
    //loop para construção dos arrays inicias de ids e values
    for (let z = 0; z < inputs.length; z++) {
        if (inputs[z] instanceof HTMLInputElement) {
            if (inputs[z]?.type === "radio" ||
                inputs[z]?.type === "checkbox") {
                inpIds.push(inputs[z]?.id ?? "null");
                inpValues.push(inputs[z]?.checked.toString() ?? "false");
            }
            else {
                if (inputs[z].id === "confrmLocId") {
                    inpIds.push("confirmLoc");
                }
                else {
                    inpIds.push(inputs[z]?.id ?? "null");
                }
                inpValues.push(inputs[z]?.value ?? "null");
            }
        }
        else if (inputs[z] instanceof HTMLTextAreaElement ||
            inputs[z] instanceof HTMLSelectElement) {
            inpIds.push(inputs[z]?.id ?? "null");
            inpValues.push(inputs[z]?.value ?? "null");
        }
        else if (inputs[z]?.contentEditable === "true" ||
            inputs[z]?.id === "citeNameId") {
            inpIds.push(inputs[z]?.id ?? "null");
            inpValues.push(inputs[z]?.textContent ?? "null");
        }
        else {
            console.error(`Erro validando elemento. Elemento ${inputs[z] ?? "null"}; instância ${Object.prototype.toString
                .call(inputs[z])
                .slice(8, -1)}; id ${inputs[z]?.id ?? "null"}`);
        }
    }
    //loop para ajuste dos elementos dos arrays de inputs e construção dos storager de inputs
    for (let j = 0; j < inputs.length; j++) {
        //filtragem de tipos primitivos de values
        if (typeof inpValues[j] === "string") {
            if (inpValues[j] === "") {
                inpValues[j] = inpValues[j].replace("", "null") ?? "null";
            }
        }
        else {
            inpValues[j] = inpValues[j]?.toString() ?? "null";
        }
        //avaliador de ids nulas
        if (inpIds[j]?.match(/null/g) ||
            inpIds[j] === undefined ||
            inpIds[j] === null) {
            console.warn(`Id null detectada. Título relativo: ${closestValidElements[j] ?? "null"}`);
        }
        //criação do storager
        const nJSONInpStorager = new _classes__WEBPACK_IMPORTED_MODULE_1__.JSONStorager(inpIds[j], inpValues[j]);
        //criação da store
        if (nJSONInpStorager) {
            JSONInpsStore.push(nJSONInpStorager);
            const descriptor = nJSONInpStorager.showAllInfo; //TODO EXPOSIÇÃO DE DADOS SOMENTE PARA FINALIDADES DE TESTE, POIS PROPRIEDADES PRIVADAS NÃO SÃO ENUMERÁVEIS
            if (descriptor) {
                JSONInpsStoreDescriptors.push(descriptor.toString());
            }
            else {
                console.warn(`Erro validando descriptor para instância ${j} de JSONStorager`);
            }
        }
        else {
            console.warn(`Erro validando instância ${j} de JSONStorager`);
        }
    }
    //loop para extrair títulos/labels de interesse
    for (let i = 0; i < titleElements.length; i++) {
        titleAcc++;
        //loop para múltiplas tentativas de localização do texto de interesse
        let closestParent = titleElements[i]?.closest("span") || titleElements[i]?.closest("label");
        if (closestParent) {
            let loopAcc = 0;
            while (loopAcc < 10 && closestParent.textContent === "") {
                //loop para escalada genealógica até encontrar parent de interesse ou desistir após 10 iterações
                loopAcc++;
                closestParent =
                    closestParent?.closest("span") || closestParent?.closest("label");
                if (closestParent?.textContent !== "" || loopAcc > 10) {
                    break;
                }
            }
            if (closestParent?.textContent !== "") {
                if (closestParent?.textContent === "Sim" || //entrada em loop para eliminar parents com text sim/não (não informativo) ou desistir após 10 iterações
                    closestParent?.textContent === "Não") {
                    const booleanParentCopy = closestParent;
                    closestBooleanElements.push(booleanParentCopy?.textContent?.trim().replaceAll("\n", "") ??
                        `NULL ${titleElements[i]?.id ?? `Id null. Iteração do loop: ${titleAcc}`}`);
                    closestBooleanElementsIds.push(booleanParentCopy.id ?? "null");
                    while (loopAcc < 10 &&
                        closestParent &&
                        (closestParent.textContent === "Sim" ||
                            closestParent.textContent === "Não")) {
                        loopAcc++;
                        closestParent =
                            closestParent?.closest("span") || closestParent?.closest("label");
                        if ((closestParent &&
                            closestParent?.textContent !== "Sim" &&
                            closestParent?.textContent !== "Não" &&
                            closestParent?.textContent !== "") ||
                            loopAcc > 10) {
                            closestValidElements.push(closestParent?.textContent?.trim().replaceAll("\n", "") ??
                                `NULL ${titleElements[i]?.id ??
                                    `Id null. Iteração do loop: ${titleAcc}`}`);
                            closestValidElementsIds.push(closestParent?.id ??
                                `NULL ${titleElements[i]?.id ??
                                    `Id null. Iteração do loop: ${titleAcc}`}`);
                            break;
                        }
                    }
                }
                else {
                    if (titleElements[i] instanceof HTMLInputElement &&
                        titleElements[i]?.type === "radio" &&
                        titleElements[i]?.id !== "") {
                        if (titleElements[i]?.nextElementSibling &&
                            titleElements[i]?.nextElementSibling instanceof
                                HTMLLabelElement &&
                            titleElements[i]?.nextElementSibling?.classList.contains("boolOp")) {
                            if (titleElements[i]?.id.match(/Yes/)) {
                                closestValidElements.push(titleElements[i]?.id?.slice(-3) ??
                                    "null" +
                                        closestParent?.textContent?.trim().replaceAll("\n", "") ??
                                    `NULL ${titleElements[i]?.id ??
                                        `Id null. Iteração do loop: ${titleAcc}`}`);
                            }
                            else if (titleElements[i]?.id.match(/No/)) {
                                closestValidElements.push(titleElements[i]?.id?.slice(-2) ??
                                    "null" +
                                        closestParent?.textContent?.trim().replaceAll("\n", "") ??
                                    `NULL ${titleElements[i]?.id ??
                                        `Id null. Iteração do loop: ${titleAcc}`}`);
                            }
                            else {
                                console.warn("Caso inesperado de boolOp Radio + Label");
                            }
                        }
                        else {
                            if ((titleElements[i] instanceof HTMLInputElement ||
                                titleElements[i] instanceof HTMLTextAreaElement) &&
                                titleElements[i]?.name === "nivelFumo") {
                                closestValidElements.push(titleElements[i]?.id?.slice(0, 1)?.toUpperCase() ??
                                    "null" +
                                        titleElements[i]?.id?.slice(1, 4) +
                                        "_" +
                                        titleElements[i]?.id?.slice(4, 8) ??
                                    `NULL ${titleElements[i]?.id ??
                                        `Id null. Iteração do loop: ${titleAcc}`}`);
                            }
                        }
                    }
                    else {
                        if (titleElements[i]?.classList.contains("opFumSubs") &&
                            titleElements[i]?.nextElementSibling &&
                            titleElements[i]?.nextElementSibling?.textContent !== "") {
                            closestValidElements.push(titleElements[i]?.nextElementSibling?.textContent +
                                "_" +
                                closestParent?.textContent?.trim().replaceAll("\n", "") ??
                                `NULL ${titleElements[i]?.id ??
                                    `Id null. Iteração do loop: ${titleAcc}`}`);
                        }
                        else {
                            if (titleElements[i]?.classList.contains("inpAntMed")) {
                                closestValidElements.push("Tratamento_Médico" + "_" + titleElements[i]?.id.slice(-1) ??
                                    `NULL ${titleElements[i]?.id ??
                                        `Id null. Iteração do loop: ${titleAcc}`}`);
                            }
                            else {
                                if (titleElements[i]?.id === "citeNameId") {
                                    closestValidElements.push("Assinatura_Usuário" ?? 0);
                                }
                                else {
                                    closestValidElements.push(closestParent?.textContent?.trim().replaceAll("\n", "") ??
                                        `NULL ${titleElements[i]?.id ??
                                            `Id null. Iteração do loop: ${titleAcc}`}`);
                                }
                            }
                        }
                    }
                    if (closestParent?.id !== "") {
                        //obtenção de ids dos 'parents'
                        //correção de id de interesse caso a do parent não esteja presente (atenção: desassocia id e text de interesse)
                        closestValidElementsIds.push(closestParent?.id ?? "null");
                    }
                    else if (closestParent.id === "") {
                        const nextESibling = titleElements[i]?.nextElementSibling;
                        if (nextESibling &&
                            nextESibling instanceof HTMLLabelElement &&
                            nextESibling.textContent !== "") {
                            closestValidElementsIds.push(nextESibling.id ?? "null");
                        }
                        else {
                            const previousESibling = titleElements[i]?.previousElementSibling;
                            if (previousESibling &&
                                previousESibling instanceof HTMLLabelElement &&
                                previousESibling.textContent !== "") {
                                closestValidElementsIds.push(previousESibling.id ?? "null");
                            }
                            else if (titleElements[i] instanceof HTMLTextAreaElement &&
                                titleElements[i]?.placeholder !== "") {
                                closestValidElementsIds.push(titleElements[i]?.id ?? "null");
                            }
                            else {
                                console.warn(`Nenhuma id próxima válida retornada para o input ${titleElements[i]?.id}`);
                            }
                        }
                    }
                }
            }
            else if (closestParent?.textContent === "") {
                console.warn(`Erro ao localizar textContent de parent`);
            }
        }
        else {
            //se falha em parents, procura em siblings <label> ou em placeholders de textareas
            const previousSibling = titleElements[i]?.previousElementSibling;
            if (previousSibling instanceof HTMLLabelElement &&
                previousSibling.textContent !== "") {
                closestValidElements.push(previousSibling.textContent?.trim().replaceAll("\n", "") ??
                    `NULL ${titleElements[i]?.id ?? `Id null. Iteração do loop: ${titleAcc}`}`);
                closestValidElementsIds.push(previousSibling.id ?? "null");
            }
            else {
                if (titleElements[i] instanceof HTMLTextAreaElement &&
                    titleElements[i]?.placeholder) {
                    closestValidElements.push(titleElements[i]?.placeholder ??
                        `NULL ${titleElements[i]?.id ?? `Id null. Iteração do loop: ${titleAcc}`}`);
                    closestValidElementsIds.push(titleElements[i]?.id ?? "null");
                }
                else if (titleElements[i] instanceof HTMLInputElement &&
                    titleElements[i]?.type === "checkbox") {
                    if (titleElements[i]?.classList.contains("famOp")) {
                        const upperCaseMatch = titleElements[i]?.id?.match(/Fam/g);
                        if (upperCaseMatch && titleElements[i]?.id) {
                            const upperCaseIndex = titleElements[i]?.id.indexOf("Fam");
                            const slicedId = titleElements[i]?.id.slice(0, upperCaseIndex);
                            closestValidElements.push(slicedId +
                                "_" +
                                titleElements[i]?.nextSibling?.textContent?.replaceAll(/^[\s]+/g, "") ??
                                `NULL ${titleElements[i]?.id ??
                                    `Id null. Iteração do loop: ${titleAcc}`}`);
                        }
                        else {
                            closestValidElements.push(titleElements[i]?.nextSibling?.textContent?.replaceAll(/^[\s]+/g, "") ??
                                `NULL ${titleElements[i]?.id ??
                                    `Id null. Iteração do loop: ${titleAcc}`}`);
                        }
                    }
                    else if (titleElements[i]?.classList.contains("opHep")) {
                        closestValidElements.push("Hepatite_" +
                            titleElements[i]?.nextSibling?.textContent?.replaceAll(/^[\s]+/g, "") ?? "null");
                    }
                    else {
                        if (titleElements[i]?.id !== "confirmId") {
                            closestValidElements.push(titleElements[i]?.nextSibling?.textContent?.replaceAll(/^[\s]+/g, "") ??
                                `NULL ${titleElements[i]?.id ??
                                    `Id null. Iteração do loop: ${titleAcc}`}`);
                        }
                        else if (titleElements[i]?.id === "confirmId") {
                            closestValidElements.push("Concordo");
                        }
                    }
                    closestValidElementsIds.push(titleElements[i]?.id ?? "null");
                }
                else {
                    if (titleElements[i]?.classList.contains("opHAS")) {
                        closestValidElements.push(titleElements[i]?.nextSibling?.textContent?.trim() ??
                            `NULL ${titleElements[i]?.id ??
                                `Id null. Iteração do loop: ${titleAcc}`}`);
                        closestValidElementsIds.push(titleElements[i]?.id ?? "null");
                    }
                    else {
                        const nextESibling = titleElements[i]?.nextElementSibling;
                        if (nextESibling instanceof HTMLLabelElement &&
                            nextESibling.textContent !== "") {
                            closestValidElements.push(nextESibling.textContent?.trim().replaceAll("\n", "") ??
                                `NULL ${titleElements[i]?.id ??
                                    `Id null. Iteração do loop: ${titleAcc}`}`);
                            closestValidElementsIds.push(nextESibling.id ?? "null");
                        }
                        else {
                            console.warn(`Erro validando parents, labels, placeholders e textContent. Id do Input: ${titleElements[i]?.id ?? null}; textContent ${titleElements[i]?.textContent ?? null}; placeholder ${titleElements[i]?.placeholder ?? null}; Última Instância de Parent avaliada ${Object.prototype.toString
                                .call(closestParent)
                                .slice(8, -1)}; Instância de Sibling Labels ${Object.prototype.toString
                                .call(previousSibling)
                                .slice(8, -1)} && ${Object.prototype.toString
                                .call(nextESibling)
                                .slice(8, -1)}`);
                        }
                    }
                }
            }
        }
    }
    //loop para ajuste dos elementos dos arrays de titles e construção dos storager de titles
    for (let l = 0; l < titleElements.length; l++) {
        //correção de múltiplos espaços em labels e titles
        const multipleSpaceMatches = closestValidElements[l]?.match(/\s\s/) ?? null;
        if (closestValidElements[l] &&
            multipleSpaceMatches &&
            multipleSpaceMatches.length > 0) {
            const spaceMatchesArray = [];
            multipleSpaceMatches.forEach((multipleSpaceMatch) => {
                const multipleSpaceIndex = closestValidElements[l]?.indexOf(multipleSpaceMatch) ?? 0;
                spaceMatchesArray.push(multipleSpaceIndex);
            });
            for (let m = 0; m < spaceMatchesArray.length; m++) {
                closestValidElements[l] =
                    closestValidElements[l]?.slice(0, spaceMatchesArray[m]).trim() ??
                        "null";
            }
        }
        //avaliador de labels e titles nulos
        if (closestValidElements[l]?.match(/[Nn][Uu][Ll][Ll]/g) ||
            closestValidElements[l] === undefined ||
            closestValidElements[l] === null) {
            let inpValue = inputs[l]?.value || "null";
            if (inputs[l] instanceof HTMLInputElement &&
                (inputs[l]?.type === "radio" ||
                    inputs[l]?.type === "checkbox")) {
                inpValue =
                    inputs[l]?.checked.toString() ?? "false";
            }
            nullTitleAcc++;
            console.warn(`Título nulo detectado: Número de acúmulo: ${nullTitleAcc}.
            Título: ${closestValidElements[l] || closestValidElements[l] || "null"};
            instância: ${Object.prototype.toString
                .call(closestValidElements[l])
                .slice(8, -1) ?? "undefined"};
            Id de input pareada: ${inputs[l]?.id ?? "null"};
            Valor de input pareado ${inpValue || "null"}`);
        }
        //criação do storager
        const nJSONTitleStorager = new _classes__WEBPACK_IMPORTED_MODULE_1__.JSONTitleStorager(closestValidElements[l]);
        //criação da store
        if (nJSONTitleStorager) {
            JSONTitlesStore.push(nJSONTitleStorager);
            const descriptor = nJSONTitleStorager.showInpTitle; //TODO EXPOSIÇÃO DE DADOS SOMENTE PARA FINALIDADES DE TESTE, POIS PROPRIEDADES PRIVADAS NÃO SÃO ENUMERÁVEIS
            if (descriptor) {
                JSONTitlesStoreDescriptors.push(descriptor.toString());
            }
            else {
                console.warn(`Erro validando descriptor para instância ${l} de JSONStorager`);
            }
        }
        else {
            console.warn(`Erro validando instância ${l} de JSONStorager`);
        }
    }
    //filtro e validação da store
    if (JSONInpsStoreDescriptors.length === JSONInpsStore.length &&
        JSONTitlesStoreDescriptors.length === JSONTitlesStore.length) {
        const filter1JSONInpsStore = JSONInpsStore.filter((JSONEl) => typeof JSONEl === "object");
        const filter1JSONTitlesStore = JSONTitlesStore.filter((JSONEl) => typeof JSONEl === "object");
        if (filter1JSONInpsStore.length === JSONInpsStore.length &&
            filter1JSONTitlesStore.length === JSONTitlesStore.length) {
            JSONInpsStore = filter1JSONInpsStore;
            JSONTitlesStore = filter1JSONTitlesStore;
            const filter2JSONInpsStore = JSONInpsStore.filter((JSONEl) => JSONEl instanceof _classes__WEBPACK_IMPORTED_MODULE_1__.JSONStorager);
            const filter2JSONTitlesStore = JSONTitlesStore.filter((JSONEl) => JSONEl instanceof _classes__WEBPACK_IMPORTED_MODULE_1__.JSONTitleStorager);
            if (filter2JSONInpsStore.length === JSONInpsStore.length &&
                filter1JSONTitlesStore.length === JSONTitlesStore.length) {
                JSONInpsStore = filter2JSONInpsStore.sort();
                JSONTitlesStore = filter2JSONTitlesStore.sort();
                let JSONInpsStoreStringified = [];
                let JSONTitlesStoreStringified = [];
                //stringificação das stores
                JSONInpsStore.forEach((formEl) => {
                    const elValues = formEl.showAllInfo;
                    const elValuesStringified = JSON.stringify(elValues); //TODO DADOS EXPOSTO SOMENTE PARA FINS DE TESTE
                    JSONInpsStoreStringified.push(elValuesStringified);
                });
                JSONTitlesStore.forEach((formEl) => {
                    const elValues = formEl.showInpTitle;
                    const elValuesStringified = JSON.stringify(elValues); //TODO DADOS EXPOSTO SOMENTE PARA FINS DE TESTE
                    JSONTitlesStoreStringified.push(elValuesStringified);
                });
                JSONInpsStoreStringified = JSONInpsStoreStringified.sort();
                JSONTitlesStoreStringified = JSONTitlesStoreStringified.sort();
                //conclusão
                if (JSONInpsStore &&
                    JSONInpsStoreStringified &&
                    JSONTitlesStore &&
                    JSONTitlesStoreStringified) {
                    return [
                        JSONInpsStore,
                        JSONInpsStoreStringified,
                        JSONTitlesStore,
                        JSONTitlesStoreStringified,
                    ]; //stringified é a versão usada como Descriptor
                }
                else {
                    return [null, null, null, null];
                }
            }
            else {
                console.warn(`Erro validando classes de elementos no JSONStore. 
          Número de instâncias obtidas para inputs: ${filter2JSONInpsStore.length ?? "undefined"}; Número esperado: ${JSONInpsStore.length ?? "undefined"};
          Número de instâncias obtidas para titles: ${filter2JSONTitlesStore.length ?? "undefined"}; Número esperado: ${JSONTitlesStore.length ?? "undefined"}`);
            }
        }
        else {
            console.warn(`Erro validando tipos de elementos nas JSONStore. 
        Número de objetos obtidos para inputs: ${filter1JSONInpsStore.length ?? "undefined"}; Número esperado: ${JSONInpsStore.length ?? "undefined"};
        Número de objetos obtidos para titles: ${filter1JSONTitlesStore.length ?? "undefined"}; Número esperado: ${JSONTitlesStore.length ?? "undefined"}`);
        }
    }
    else {
        console.warn(`Length de JSON Store Descriptors inválida. 
      Length obtida para inputs: ${JSONInpsStoreDescriptors.length ?? "undefined"}; Length esperada: ${JSONInpsStore.length ?? "undefined"};
      Length obtida para titles: ${JSONTitlesStoreDescriptors.length ?? "undefined"}; Length esperada: ${JSONTitlesStore.length ?? "undefined"}`);
    }
}
function createJSONAnchor(JSONBtn, formInpsDescriptor) {
    const formattedFormDescriptor = formatJSONFile(formInpsDescriptor);
    const JSONBlob = new Blob([formattedFormDescriptor[1]], {
        type: "application/json",
    });
    const JSONLink = document.createElement("a");
    JSONLink.id = "anchorJSON";
    JSONLink.className = JSONBtn.className;
    JSONLink.style.width = JSONBtn.style.width;
    JSONLink.style.height = JSONBtn.style.height;
    JSONLink.textContent = "Baixar JSON";
    JSONLink.href = URL.createObjectURL(JSONBlob);
    JSONLink.download = "formData.json";
    JSONBtn.replaceWith(JSONLink);
    return JSONLink;
}
function formatJSONFile(formInpsDescriptor) {
    let formatFormDescIds = `{\n`;
    let formatFormDescTitles = ``;
    let formatFormDescIdsRead = `{\n`;
    let formatFormDescTitlesRead = `{\n`;
    let labAcc = 1;
    //geração das unidades formatadas
    for (let i = 0; i < formInpsDescriptor.length; i++) {
        const separationMatches = formInpsDescriptor[i].match(/",/g);
        if (separationMatches) {
            // const firstSepIndex = formInpsDescriptor[i].indexOf(",");
            const secondSepIndex = formInpsDescriptor[i].indexOf(",", formInpsDescriptor[i].indexOf(",") + 1);
            const lastSepIndex = formInpsDescriptor[i].lastIndexOf(separationMatches[0]);
            //formatação dos ids e values dos inputs
            let inpId = formInpsDescriptor[i].slice(secondSepIndex + 2, lastSepIndex + 1);
            let loopAcc = 0;
            while (inpId.match(/,/g)) {
                const commaIndex = inpId.indexOf(",");
                inpId = inpId.slice(commaIndex + 1);
                if (!inpId.match(/,/g) || loopAcc > 999) {
                    break;
                }
                loopAcc++;
            }
            const value = formInpsDescriptor[i].slice(lastSepIndex + 2, -1);
            const lab = mapIdsTitles[inpId.replaceAll(/"/g, "")];
            if (i == 89) {
                //bug não resolvido ainda
                if (!inpId) {
                    inpId = '"confirmLocId"';
                }
            }
            //construção e concatenação das unidades formatadas
            formatFormDescIds += `\t${inpId}: ${value}, \n`;
            formatFormDescIdsRead += `\t${labAcc}. ${inpId}: ${value}, \n`; //versões em lista numerada, para logs e enumeração posterior
            labAcc++;
            if (lab && lab !== "null" && lab !== "") {
                formatFormDescTitlesRead += `\t${labAcc}. ${lab} for ${inpId}: ${value}, \n`;
                formatFormDescTitles += `\t"${lab}": ${value}, \n`;
            }
        }
    }
    //ajustes finais nos descriptors e união
    const finalDescIds = (formatFormDescIds +
        `\n\n` +
        formatFormDescTitles +
        `}`).replace(", \n}", " \n}");
    const finalDescTitles = (`{` + formatFormDescTitles + `}`).replace(", \n}", " \n}");
    //para leitura em logs somente
    const finalDescIdsRead = (formatFormDescIdsRead + `}`)
        .replace(", \n}", " \n}")
        .replaceAll(/""null": "null",/g, "")
        .replaceAll(/""false": "false",/g, "")
        .replaceAll(/"null": "null",/g, "")
        .replaceAll(/"false": "false",/g, "")
        .replaceAll(/"false": "false"/g, "")
        .replaceAll(/"null": "null"/g, "")
        .replaceAll(/\t[0-9]{1,3}.\s:\s"null",\s\n/g, "")
        .replaceAll(/\t[0-9]{1,3}.\s:\s"false",\s\n/g, "")
        .replaceAll(/\t[0-9]{1,3}.\s\s\n/g, "");
    const finalDescTitlesRead = (formatFormDescTitlesRead + `}`)
        .replace(", \n}", " \n}")
        .replaceAll(/""null": "null",/g, "")
        .replaceAll(/""false": "false",/g, "")
        .replaceAll(/"null": "null",/g, "")
        .replaceAll(/"false": "false",/g, "")
        .replaceAll(/"false": "false"/g, "")
        .replaceAll(/"null": "null"/g, "")
        .replaceAll(/\t[0-9]{1,3}.\s:\s"null",\s\n/g, "")
        .replaceAll(/\t[0-9]{1,3}.\s:\s"false",\s\n/g, "")
        .replaceAll(/\t[0-9]{1,3}.\s\s\n/g, "");
    console.log(finalDescIdsRead);
    console.log(finalDescTitlesRead);
    return [finalDescTitles, finalDescIds];
}
function regenerateJSONBtn(JSONLink, formInpsDescriptor) {
    const newJSONBtn = document.createElement("button");
    newJSONBtn.id = "btnJSON";
    newJSONBtn.className = JSONLink.className;
    newJSONBtn.style.width = JSONLink.style.width;
    newJSONBtn.style.height = JSONLink.style.height;
    newJSONBtn.textContent = "Regenerar JSON";
    JSONLink.replaceWith(newJSONBtn);
    setTimeout(() => {
        newJSONBtn.addEventListener("click", () => createJSONAnchor(newJSONBtn, formInpsDescriptor));
    }, 1000);
    // return newJSONBtn;
}
function opRadioHandler(keydown) {
    const radioPairs = document.querySelectorAll('input[id$="Yes"], input[id$="No"]' //acessando como par
    );
    for (let i = 0; i < radioPairs.length; i += 2 //pulando de par em par
    ) {
        const radioYes = radioPairs[i];
        const radioNo = radioPairs[i + 1];
        if (!radioYes || !radioNo) {
            continue;
        }
        if (radioYes instanceof HTMLInputElement &&
            radioNo instanceof HTMLInputElement &&
            !radioYes.checked &&
            !radioNo.checked &&
            keydown instanceof KeyboardEvent) {
            if ((keydown.altKey && keydown.key === "y") || keydown.key === "Y") {
                radioYes.focus();
                radioYes.checked = true;
                setTimeout(() => {
                    radioYes.blur();
                }, 5000);
                return;
            }
            else if ((keydown.altKey && keydown.key === "n") ||
                keydown.key === "N") {
                radioNo.focus();
                radioNo.checked = true;
                setTimeout(() => {
                    radioNo.blur();
                }, 5000);
                return;
            }
        }
        else {
            console.warn(`radioYes: ${radioYes?.checked ?? false}`);
            console.warn(`radioNo: ${radioNo?.checked ?? false}`);
            console.warn(`${JSON.stringify(keydown)}`);
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound(slicedError ?? "NULL", "validando radioYes ou radiosNo ou keydown event target", radioYes ?? null, radioNo ?? null);
        }
    }
}
function cpbInpHandler(radio) {
    if (radio.parentElement && radio.parentElement.parentElement) {
        const opRadiosCheck = radio.parentElement?.parentElement?.querySelectorAll("input[id^='Cpb'][id$='Yes']");
        const opRadiosText = radio.parentElement?.parentElement?.querySelectorAll("input[id^='pb'][id$='Yes']");
        const antFamChecks = radio.parentElement?.parentElement?.querySelectorAll("input[id^='antFam']");
        const textAdd = radio.parentElement?.parentElement?.querySelectorAll("textarea[id^='textAdd']");
        const divAdd = radio.parentElement?.parentElement?.querySelectorAll("div[id^='divAdd']");
        //inclui ambos os tipos de eventos
        if (opRadiosCheck.length > 0) {
            opRadiosCheck?.forEach(function (opRadioCheck, i) {
                if (divAdd[i] instanceof HTMLElement &&
                    opRadioCheck instanceof HTMLInputElement &&
                    (opRadioCheck.type === "checkbox" || opRadioCheck.type === "radio")) {
                    if (!opRadioCheck.checked) {
                        divAdd[i].style.display = "none";
                    }
                    else {
                        divAdd[i].style.display = "block";
                    }
                }
            });
        }
        if (opRadiosText.length > 0) {
            opRadiosText?.forEach(function (opRadioText, i) {
                if (textAdd[i] instanceof HTMLElement &&
                    opRadioText instanceof HTMLInputElement &&
                    (opRadioText.type === "checkbox" || opRadioText.type === "radio")) {
                    if (!opRadioText.checked) {
                        textAdd[i].style.display = "none";
                    }
                    else {
                        textAdd[i].style.display = "block";
                    }
                }
            });
        }
        if (antFamChecks.length > 0) {
            antFamChecks?.forEach((antFamCheck, i) => {
                const closestAddElement = antFamChecks[i].parentElement?.nextElementSibling;
                if (closestAddElement instanceof HTMLDivElement) {
                    if (antFamCheck instanceof HTMLInputElement &&
                        (antFamCheck.type === "checkbox" || antFamCheck.type === "radio") &&
                        !antFamCheck.checked) {
                        closestAddElement.style.display = "none";
                    }
                    else {
                        closestAddElement.style.display = "block";
                    }
                }
            });
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound(slicedError ?? "NULL", "localizando parent elements de Radio", radio?.parentElement ?? null, radio?.parentElement?.parentElement ?? null);
    }
}
function deactTextInput() {
    const numberInputs = document.querySelectorAll('input[type="number"][id$=NumId]');
    const nullRadios = document.querySelectorAll('input[type="radio"][id$=NullId]');
    if (numberInputs.length !== nullRadios.length) {
        console.error("Número de texts e radios não corresponde!");
        return;
    }
    numberInputs.forEach((numberInput, i) => {
        const nullRadio = nullRadios[i];
        if (nullRadio.checked) {
            numberInput.setAttribute("disabled", "");
        }
        else {
            numberInput.removeAttribute("disabled");
        }
    });
}
function doubleClickHandler(input) {
    input.checked = input.checked ? false : true;
    cpbInpHandler(input);
    deactTextInput();
}
// export function touchStartHandler(keydown: KeyboardEvent) {
//   let firstTapTime = 0;
//   if (firstTapTime === 0) {
//     firstTapTime = Date.now();
//   } else {
//     const elapsed = Date.now() - firstTapTime;
//     if (elapsed < 1000) {
//       // Limite de tempo para considerar um duplo toque (300ms)
//       if (this.checked) {
//         this.checked = false;
//       } else {
//         this.checked = true;
//       }
//       firstTapTime = 0; // Reiniciar o temporizador
//     } else {
//       firstTapTime = Date.now(); // Iniciar um novo temporizador
//     }
//   }
//   opRadioHandler(keydown);
//   cpbInpHandler(this);
// }
function useCurrentDate(activation, dateBtn) {
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
    const targInputDate = searchPreviousSiblings(dateBtn, "inpDate");
    if (activation.target === dateBtn &&
        targInputDate &&
        targInputDate.tagName === "INPUT" &&
        targInputDate instanceof HTMLInputElement) {
        targInputDate.value = ano + "-" + mes + "-" + dia;
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(targInputDate ?? null, "targInputDate", slicedError ?? "NULL");
    }
}
function searchNextSiblings(currentElement, searchedSiblingClass) {
    let loopAcc = 0;
    while (currentElement.nextElementSibling) {
        currentElement = currentElement.nextElementSibling;
        const isSiblingValid = currentElement.classList.contains(searchedSiblingClass);
        if (isSiblingValid || loopAcc > 999) {
            break;
        }
        loopAcc++;
    }
    return currentElement;
}
function searchPreviousSiblings(currentElement, searchedSiblingClass) {
    let loopAcc = 0;
    while (currentElement.previousElementSibling) {
        currentElement = currentElement.previousElementSibling;
        const isSiblingValid = currentElement.classList.contains(searchedSiblingClass);
        if (isSiblingValid || loopAcc > 999) {
            break;
        }
        loopAcc++;
    }
    return currentElement;
}
function searchPreviousSiblingsById(currentElement, searchedSiblingId) {
    let loopAcc = 0;
    while (currentElement.previousElementSibling) {
        currentElement = currentElement.previousElementSibling;
        const isSiblingValid = currentElement.id === searchedSiblingId;
        if (isSiblingValid || loopAcc > 999) {
            break;
        }
        loopAcc++;
    }
    return currentElement;
}
function searchParents(currentElement, searchedParentClass) {
    let loopAcc = 0;
    while (currentElement.parentElement) {
        currentElement = currentElement.parentElement;
        const isParentValid = currentElement.classList.contains(searchedParentClass);
        if (isParentValid || loopAcc > 999) {
            break;
        }
        loopAcc++;
    }
    return currentElement;
}
function changeToAstDigit(click, toFileInpBtn) {
    const useAstDigitRegex = /Usar Assinatura Digital/;
    const useAstDigtRegexObj = new RegExp(useAstDigitRegex);
    const useAstTextRegex = /Retornar à Assinatura Escrita/;
    const useAstTextRegexObj = new RegExp(useAstTextRegex);
    let labCont = toFileInpBtn.parentElement?.getElementsByClassName("labAst") ?? "null";
    if (labCont[0] === "null" &&
        (toFileInpBtn.parentElement?.tagName === "LABEL" ||
            toFileInpBtn.parentElement?.tagName === "SPAN")) {
        labCont = Array.of(toFileInpBtn.parentElement);
    }
    if (click.target === toFileInpBtn) {
        if (toFileInpBtn.textContent &&
            useAstDigtRegexObj.test(toFileInpBtn.textContent)) {
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
                    const idLabMatch = labCont[0].id.match(/Ast/)?.toString() ?? "";
                    const idInpMatch = fileInp.id.match(/Ast/)?.toString() ?? "";
                    const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
                    const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
                    if (idLabMatchIndex && idInpMatchIndex) {
                        const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
                        const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
                        labCont[0].id = sliceOneLabId + sliceTwoInpId;
                        toFileInpBtn.textContent = "Retornar à Assinatura Escrita";
                        if (toFileInpBtn.previousElementSibling instanceof HTMLButtonElement) {
                            toFileInpBtn.previousElementSibling?.setAttribute("hidden", "");
                        }
                    }
                    else {
                        console.warn("Erro no match de ids do input");
                    }
                    if (fileInp) {
                        fileInp.addEventListener("change", (chose) => {
                            try {
                                if (chose.target instanceof HTMLInputElement &&
                                    fileInp.files &&
                                    fileInp.files.length > 0) {
                                    const imgFile = fileInp.files[0];
                                    if (imgFile && imgFile.type.startsWith("image")) {
                                        const fileReader = new FileReader();
                                        fileReader.onload = (load) => {
                                            //definir lógica para carregamento
                                            //inicia preparo para evento de carregamento
                                            const imgUrl = load.target?.result; //checa a url do file que será carregado
                                            const imgAstDigt = document.createElement("img"); //cria container
                                            fileInp.id = inpAst.id;
                                            fileInp.className = inpAst.className;
                                            imgAstDigt.innerHTML = "";
                                            if (typeof imgUrl === "string") {
                                                imgAstDigt.src = imgUrl; //associação entre container e file carregado
                                            }
                                            imgAstDigt.id = fileInp.id;
                                            imgAstDigt.className = fileInp.className;
                                            imgAstDigt.setAttribute("alt", "Assinatura Digital");
                                            imgAstDigt.setAttribute("decoding", "async");
                                            imgAstDigt.setAttribute("loading", "eager");
                                            imgAstDigt.setAttribute("crossorigin", "anonymous");
                                            imgAstDigt.style.setProperty("max-width", "300px");
                                            imgAstDigt.style.setProperty("max-height", "200px");
                                            if (fileInp.parentElement &&
                                                labCont &&
                                                labCont.length > 0) {
                                                fileInp.parentElement.replaceChild(imgAstDigt, fileInp);
                                                const idLabMatch = labCont[0].id
                                                    .match(/Ast/)
                                                    ?.toString();
                                                const idInpMatch = imgAstDigt.id
                                                    .match(/Ast/)
                                                    ?.toString();
                                                if (idLabMatch && idInpMatch) {
                                                    const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
                                                    const idInpMatchIndex = imgAstDigt.id.indexOf(idInpMatch);
                                                    const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
                                                    const sliceTwoInpId = imgAstDigt.id.slice(idInpMatchIndex);
                                                    labCont[0].id =
                                                        sliceOneLabId + sliceTwoInpId;
                                                }
                                                else {
                                                    console.warn("Erro no match de ids do input");
                                                }
                                            }
                                            else {
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
                                }
                                else {
                                    throw new Error("Nenhum arquivo selecionado");
                                }
                            }
                            catch (error) {
                                console.error(error.message);
                            }
                        });
                    }
                }
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(inpAst ?? null, "inpAst", slicedError ?? "NULL");
            }
            //TODO INCLUIR TOKEN ANTI-CSRF QUANDO HOUVER SERVIDOR
            // fileInp.name = inpAst.name;
            // fileInp.id = inpAst.id;
            // fileInp.className = inpAst.className;
        }
        else if (toFileInpBtn.textContent &&
            useAstTextRegexObj.test(toFileInpBtn.textContent)) {
            const inpAst = searchPreviousSiblings(toFileInpBtn, "inpAst") ||
                searchPreviousSiblings(toFileInpBtn, "imgAstDigit");
            if (inpAst instanceof HTMLImageElement ||
                inpAst instanceof HTMLInputElement) {
                const fileInp = document.createElement("input");
                fileInp.type = "text";
                fileInp.name = inpAst.name;
                fileInp.id = inpAst.id;
                fileInp.className = inpAst.className;
                fileInp.setAttribute("required", "");
                if (inpAst.parentElement) {
                    inpAst.parentElement.replaceChild(fileInp, inpAst);
                    const idLabMatch = labCont[0].id
                        .match(/Ast/)
                        ?.toString();
                    const idInpMatch = fileInp.id.match(/Ast/)?.toString();
                    if (idLabMatch && idInpMatch) {
                        const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
                        const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
                        const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
                        const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
                        labCont[0].id = sliceOneLabId + sliceTwoInpId;
                        toFileInpBtn.textContent = "Usar Assinatura Digital";
                        toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
                        fileInp.addEventListener("input", () => _gModel__WEBPACK_IMPORTED_MODULE_0__.autoCapitalizeInputs(fileInp));
                    }
                    else {
                        console.warn("Erro no match de ids do Input");
                    }
                }
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(inpAst ?? null, "inpAst", slicedError ?? "NULL");
            }
        }
    }
}
function resetarFormulario(click, toFileInpBtns) {
    if (click.target instanceof HTMLElement &&
        click.target.tagName === "BUTTON") {
        const formulario = document.getElementById("formAnamGId");
        const editableCite = document.querySelector('cite[contenteditable="true"]');
        const genBirthRel = document.getElementById("genBirthRelId");
        const genTrans = document.getElementById("genTransId");
        if (formulario && formulario instanceof HTMLFormElement) {
            formulario.reset();
        }
        else {
            console.error("Erro validando formulário");
        }
        if (editableCite) {
            editableCite.textContent = `--Nome`;
            _gModel__WEBPACK_IMPORTED_MODULE_0__.removeFirstClick(editableCite);
        }
        else {
            console.warn(`editableCite não encontrado em reset.`);
        }
        if (genBirthRel instanceof HTMLSelectElement ||
            genBirthRel instanceof HTMLInputElement) {
            genBirthRel.value = "cis";
            genBirthRel.hidden = true;
        }
        else {
            console.warn(`genBirthRel não encontrado em reset.`);
        }
        if (genTrans instanceof HTMLSelectElement ||
            genTrans instanceof HTMLInputElement) {
            genTrans.value = "avancado";
            genTrans.hidden = true;
        }
        else {
            console.warn(`genTrans não encontrado em reset.`);
        }
        toFileInpBtns.forEach((toFileInpBtn) => {
            if (toFileInpBtn.textContent === "Retornar à Assinatura Escrita") {
                const inpAst = searchPreviousSiblings(toFileInpBtn, "inpAst") ||
                    searchPreviousSiblings(toFileInpBtn, "imgAstDigit");
                if (inpAst &&
                    (inpAst instanceof HTMLInputElement ||
                        inpAst instanceof HTMLImageElement)) {
                    const fileInp = document.createElement("input");
                    fileInp.type = "text";
                    fileInp.name = inpAst.name;
                    fileInp.id = inpAst.id;
                    fileInp.className = inpAst.className;
                    fileInp.setAttribute("required", "");
                    if (inpAst.parentElement) {
                        let labCont = toFileInpBtn.parentElement?.getElementsByClassName("labAst") ??
                            "null";
                        if ((labCont[0] === "null" || labCont[0].id === "") &&
                            (toFileInpBtn.parentElement?.tagName === "LABEL" ||
                                toFileInpBtn.parentElement?.tagName === "SPAN")) {
                            labCont = Array.of(toFileInpBtn.parentElement);
                        }
                        inpAst.parentElement.replaceChild(fileInp, inpAst);
                        const idLabMatch = labCont[0].id
                            .match(/Ast/)
                            ?.toString();
                        const idInpMatch = fileInp.id.match(/Ast/)?.toString();
                        if (idLabMatch && idInpMatch) {
                            const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
                            const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
                            const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
                            const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
                            labCont[0].id = sliceOneLabId + sliceTwoInpId;
                            fileInp.addEventListener("input", () => _gModel__WEBPACK_IMPORTED_MODULE_0__.autoCapitalizeInputs(fileInp));
                            toFileInpBtn.textContent = "Usar Assinatura Digital";
                            toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
                        }
                        else {
                            console.warn("Erro no match de ids do input");
                        }
                    }
                    else {
                        console.warn(`Erro localizando Parent Element de inpAst`);
                    }
                }
                else {
                    console.warn(`Erro reconhecendo Previous Element Sibling: inpAst ${Object.prototype.toString
                        .call(inpAst)
                        .slice(8, -1)}`);
                }
            }
        });
    }
    else {
        console.error(`Erro validando target: instância de ${Object.prototype.toString
            .call(click.target)
            .slice(8, -1)}`);
    }
}
//TODO FINALIZAR COM CSS
function subForm() {
    window.alert("Sistema ainda não pronto\n...mas você teria enviado clicando aqui! :)");
    // const requiredElements = document.querySelectorAll("[required]");
    // if (requiredElements) {
    //   const emptyElements = Array.from(requiredElements).filter((element) => {
    //     const value = element.value || element.textContent || "";
    //     return value === "";
    //   });
    //   if (emptyElements) {
    //     emptyElements.forEach((emptyElement) => {
    //       console.log("Elemento vazio: ", emptyElement.id);
    //       emptyElement.style.border = "rgb(255, 0, 0)";
    //       let emptyElementCStyle = window
    //         .getComputedStyle(emptyElement)
    //         .getPropertyValue("border-color");
    //       let rgbaMatch = emptyElementCStyle.match(rgbaRegex);
    //       if (rgbaMatch) {
    //         console.log("rgba " + rgbaMatch);
    //         // const fadingAlert = setInterval(() => {
    //         //   let rgbaMatch = emptyElementCStyle.match(rgbaRegex);
    //         // });
    //       }
    //     });
    //   }
    // }
}


/***/ }),

/***/ "../global-scripts/src/gModel.tsx":
/*!****************************************!*\
  !*** ../global-scripts/src/gModel.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autoCapitalizeCite: () => (/* binding */ autoCapitalizeCite),
/* harmony export */   autoCapitalizeInputs: () => (/* binding */ autoCapitalizeInputs),
/* harmony export */   checkAllGenConts: () => (/* binding */ checkAllGenConts),
/* harmony export */   filterIdsByGender: () => (/* binding */ filterIdsByGender),
/* harmony export */   fluxGen: () => (/* binding */ fluxGen),
/* harmony export */   generatePersonInstance: () => (/* binding */ generatePersonInstance),
/* harmony export */   hideGenFisAlin: () => (/* binding */ hideGenFisAlin),
/* harmony export */   hideStgTransHorm: () => (/* binding */ hideStgTransHorm),
/* harmony export */   normalizeNegatives: () => (/* binding */ normalizeNegatives),
/* harmony export */   numberLimit: () => (/* binding */ numberLimit),
/* harmony export */   removeFirstClick: () => (/* binding */ removeFirstClick),
/* harmony export */   showGenFisAlin: () => (/* binding */ showGenFisAlin),
/* harmony export */   showStgTransHorm: () => (/* binding */ showStgTransHorm),
/* harmony export */   switchAutocorrect: () => (/* binding */ switchAutocorrect)
/* harmony export */ });
/* harmony import */ var _gHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes */ "../global-scripts/src/classes.tsx");
/* harmony import */ var _errorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização



// import React from 'react';
const autoCapitalizeFirstLetterRegex = /\b\w/;
let isAutocorrectOn = true;
function numberLimit(inputElement) {
    let numberValue = inputElement.value;
    const numberValueInt = parseInt(numberValue);
    const isAtivFis = inputElement.classList.contains("inpAtivFis");
    const isAlimRot = inputElement.classList.contains("inpAlimRot");
    const isLocNum = inputElement.classList.contains("inpLocNum");
    const isDDD = inputElement.classList.contains("inpDDD");
    const isFloat = inputElement.classList.contains("float");
    const isFreq = inputElement.classList.contains("freqInpList");
    if ((isAtivFis || isAlimRot || isLocNum || isDDD || isFreq) && !isFloat) {
        if (numberValue.match(/[=.,;~/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]/g)) {
            const wrongMatch = numberValue.match(/[=.,;~/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]/g);
            const wrongMatchIndex = numberValue.indexOf(wrongMatch?.[0] ?? "");
            const slicedValue = numberValue.slice(0, wrongMatchIndex);
            const afterSlice = numberValue.slice(wrongMatchIndex + 1);
            inputElement.value = slicedValue + afterSlice;
        }
        const maxLength = 2;
        const maxInput = inputElement.id.endsWith("Max");
        if (numberValueInt < 1 && maxInput) {
            const inpValueArray = Array.from(inputElement.value);
            inpValueArray.splice(0, 1, "1");
            const fixedInpValueinpValueArray = inpValueArray.toString();
            inputElement.value = fixedInpValueinpValueArray;
        }
        if ((isAtivFis || isAlimRot || isDDD || isFreq) &&
            numberValue.length > maxLength) {
            numberValue = numberValue.slice(0, maxLength);
            inputElement.value = numberValue;
        }
    }
}
function normalizeNegatives(tabInp) {
    let parsedInpValue = 0;
    if (tabInp instanceof HTMLInputElement) {
        parsedInpValue = parseFloat(tabInp.value);
        // if (Number.isNaN(parsedInpValue) || parsedInpValue < 0) {
        //   parsedInpValue = 0;
        // }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(tabInp ?? null, "tabInp", slicedError ?? "NULL");
    }
    return parsedInpValue.toString();
}
function correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, match, textElement) {
    let text = textElement.value || textElement.textContent || null;
    let isFixAfterDCursorExec = false;
    if (isFixAfterDCursorExec)
        return;
    const selectionPosition = window.getSelection()?.getRangeAt(0).startOffset;
    text = wrongStartCorrection(text, match);
    textElement.addEventListener("keyup", (fixmove) => {
        const keyboardEvent = fixmove;
        if (selectionPosition === 0 || selectionPosition === text?.length || 0) {
            if (keyboardEvent.key === " " ||
                keyboardEvent.key === "Backspace" ||
                (keyboardEvent.key >= "ArrowLeft" &&
                    keyboardEvent.key <= "ArrowDown") ||
                (keyboardEvent.key >= "a" && keyboardEvent.key <= "z") ||
                (keyboardEvent.key >= "A" && keyboardEvent.key <= "Z") ||
                isUndoUppercase) {
                if (!isFixAfterDCursorExec) {
                    isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, textElement);
                }
                keyboardEvent.preventDefault();
                isFixAfterDCursorExec = true;
            }
        }
    });
    return [text, isCursorAutoMoved];
}
function wrongStartCorrection(text, wrongStartMatch) {
    let fixedText = text;
    if (wrongStartMatch && text) {
        const wrongStartLength = wrongStartMatch
            .toString()
            .replaceAll(",", "").length;
        const addErasedChar = text.slice(0, wrongStartLength - 1);
        const fixedStart = text.slice(wrongStartLength - 1);
        fixedText = fixedStart + addErasedChar;
    }
    return fixedText;
}
function moveCursorToTheEnd(isCursorAutoMoved, textElement) {
    if (window.getSelection && !isCursorAutoMoved) {
        const range = document.createRange();
        range.selectNodeContents(textElement);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        isCursorAutoMoved = true;
    }
    else {
        isCursorAutoMoved = false;
    }
    return isCursorAutoMoved;
}
function fixCursorPosition(textElement, range, selection, shouldSetEnd) {
    range.setStart(textElement, 0);
    if (shouldSetEnd === true) {
        range.setEnd(textElement, 1);
    }
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);
}
function fixFirstLetter(fstLet, regex, textElement, range, selection, shouldSetEnd) {
    let contText = textElement.value || textElement.textContent || "";
    const firstLetterMatch = fstLet?.match(regex);
    if (firstLetterMatch) {
        const capitalizedFirstLetter = fstLet?.toUpperCase();
        const nextLetters = contText.substring(1).toLowerCase();
        contText = capitalizedFirstLetter + nextLetters;
        const firstLetterMatch = fstLet?.match(regex);
        if (firstLetterMatch) {
            if (range.endOffset >= 1) {
                fixCursorPosition(textElement, range, selection, shouldSetEnd);
            }
        }
    }
    return contText;
}
function fixWrongStarts(text, match, length) {
    let fixedStr = text ?? "";
    if (text && match) {
        const wrongCharIndex = text.indexOf(match);
        const arrText = Array.from(text);
        arrText.splice(wrongCharIndex, length, "");
        fixedStr = arrText.toString().replaceAll(",", "");
    }
    return fixedStr;
}
function fixNextWordsIniNotD(remadeText, letMatch) {
    if (remadeText) {
        const gLetMatchI = remadeText.lastIndexOf(letMatch) + 1;
        const actChar = remadeText.charAt(gLetMatchI);
        const capChar = actChar.toUpperCase();
        const arrText = Array.from(remadeText);
        arrText[gLetMatchI] = capChar;
        remadeText = arrText.toString().replaceAll(",", "");
        if (remadeText.match(/^\s[\w]+/g)) {
            const removSpaceText = remadeText.slice(1, remadeText.length);
            remadeText = removSpaceText + " ";
        }
    }
    else {
        remadeText = "";
    }
    return remadeText;
}
function fixNextWordsAfterD(remadeText, letMatch) {
    const globalLetterMatchIndexD = remadeText
        ? remadeText.lastIndexOf(letMatch) + 1
        : undefined;
    if (globalLetterMatchIndexD) {
        const actualCharD = remadeText?.charAt(globalLetterMatchIndexD);
        const capitalizedCharD = actualCharD?.toUpperCase();
        if (remadeText && capitalizedCharD) {
            const citeTextArrayD = Array.from(remadeText);
            citeTextArrayD[globalLetterMatchIndexD] = capitalizedCharD;
            remadeText = citeTextArrayD.toString().replaceAll(",", "");
        }
    }
    return remadeText;
}
function fixUnproperUppercases(text, match, context) {
    const spaceRegex = /\s/g;
    const spaceMatches = text.match(spaceRegex);
    const upperCasesRepetitionsIndex = text.indexOf(match);
    const repeatedLetter = match.slice(0, 1);
    const textBeforeRepetitions = text.substring(0, upperCasesRepetitionsIndex);
    let addAcumulator = 0;
    let loweredRepetitions = "";
    loweredRepetitions = match.toLowerCase().slice(1);
    if (spaceMatches) {
        if (context === "NoD" ||
            context === "YesDCont" ||
            context == 0 ||
            context === 2 ||
            !context) {
            if (context === "YesDCont" || context === 2) {
                const lowercasesRegex = /[a-záàâäãéèêëíìîïóòôöõúùûü]/g;
                const lowercasesMatches = text.match(lowercasesRegex);
                if (lowercasesMatches) {
                    const numLowercases = lowercasesMatches.length;
                    addAcumulator += numLowercases;
                }
            }
            const numSpaces = spaceMatches.length;
            addAcumulator += numSpaces;
        }
        else if (context === "YesDVal" || context === 1) {
            addAcumulator = 1;
        }
        else {
            console.error(`Context value not suitable`);
        }
    }
    const textAfterRepetitions = text.slice(upperCasesRepetitionsIndex + 1 + loweredRepetitions.length - addAcumulator, text.length + 1);
    const textArray = Array.from(text);
    textArray.splice(upperCasesRepetitionsIndex + 1, loweredRepetitions.length, loweredRepetitions);
    if (context === "NoD" || context == 0 || !context) {
        text =
            textBeforeRepetitions +
                repeatedLetter +
                loweredRepetitions +
                textAfterRepetitions;
    }
    else if (context === "YesDVal") {
        const upperlowercombD = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][sS]?[\s]/);
        if (upperlowercombD) {
            if (upperlowercombD.length === 4) {
                const loweredS = upperlowercombD.toString().replace(/S/, "s");
                loweredRepetitions += loweredS;
            }
        }
        text = textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
    }
    else if (context === "YesDCont") {
        const multipleConjFix = /D[aeiouáàâäãéèêëíìîïóòôöõúùûü][s]\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{3,}/;
        const multipleConjFixMatch = text.match(multipleConjFix);
        if (multipleConjFixMatch) {
            text =
                textBeforeRepetitions + loweredRepetitions + "S" + textAfterRepetitions;
        }
        else {
            text = textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
        }
    }
    else {
        console.error(`Context value not suitable`);
    }
    return text;
}
function fixForcedUpperCase(textElement, wordMatch, wMatchIteration) {
    let text = textElement.value || textElement.textContent || "";
    const strDlowercase = wMatchIteration.toString();
    const DUppercased = strDlowercase.charAt(1).toUpperCase();
    if (DUppercased) {
        const strDAfter = strDlowercase.substring(0, 1) + DUppercased + strDlowercase.substring(2);
        const strDAfterMinusInd = (text?.length ?? 0) - strDAfter.length;
        const oppositeSlicedCite = text?.slice(strDAfterMinusInd);
        const startSlicedCite = text?.slice(0, strDAfterMinusInd);
        if (wordMatch.length >= 1 && startSlicedCite)
            text = startSlicedCite + oppositeSlicedCite;
    }
    return text;
}
function autoCapitalizeInputs(textElement) {
    let text = textElement?.value ?? null;
    if (isAutocorrectOn && text) {
        //inicialização de expressões regex com seus objetos e matches associados
        const newWordMatches = text.match(/\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g);
        const letterMatchesIniNotD = text.match(/\s[^d]/g);
        const letterMatchesIniD = text.match(/\sd/g);
        const notMatchesAfterDRegex = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g;
        let letterNotMatchesAfterD = text.match(notMatchesAfterDRegex) ?? [];
        const afterDRegexOp1 = /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
        const afterDRegexOp2 = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g;
        const afterDRegexOp3 = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
        const letterMatchesAfterDOp1 = text.match(afterDRegexOp1);
        const letterMatchesAfterDOp2 = text.match(afterDRegexOp2);
        const letterMatchesAfterDOp3 = text.match(afterDRegexOp3);
        const lowercasesRegex = /[a-záàâäãéèêëíìîïóòôöõúùûü]/g;
        const lowercasesRegexObj = new RegExp(lowercasesRegex);
        const uppercasesRegex = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
        const uppercasesRegexObj = new RegExp(uppercasesRegex);
        const multipleUppercasesRegex = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{2,}/g;
        const multipleUppercasesMatches = text.match(multipleUppercasesRegex);
        const multipleUppercasesRegex2 = /D[a-záàâäãéèêëíìîïóòôöõúùûü][S]\s/g;
        const multipleUppercasesMatches2 = text.match(multipleUppercasesRegex2);
        const wrongUppercasesRegexOp1 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g;
        const wrongUppercasesMatchesOp1 = text.match(wrongUppercasesRegexOp1);
        const wrongUppercasesRegexOp2 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        const wrongUppercasesMatchesOp2 = text.match(wrongUppercasesRegexOp2);
        const wrongUppercasesRegexOp3 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g;
        const wrongUppercasesMatchesOp3 = text.match(wrongUppercasesRegexOp3);
        const wrongUppercasesRegexOp4 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        const wrongUppercasesMatchesOp4 = text.match(wrongUppercasesRegexOp4);
        const wrongUppercasesRegexOp5 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g;
        const wrongUppercasesMatchesOp5 = text.match(wrongUppercasesRegexOp5);
        const wrongUppercasesRegexOp6 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        const wrongUppercasesMatchesOp6 = text.match(wrongUppercasesRegexOp6);
        const wrongUppercasesRegexOp7 = /D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g;
        const wrongUppercasesMatchesOp7 = text.match(wrongUppercasesRegexOp7);
        const wrongUppercasesRegexOp8 = /D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g;
        const wrongUppercasesMatchesOp8 = text.match(wrongUppercasesRegexOp8);
        const wrongUppercasesRegexOp9 = /D[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]\s/g;
        const wrongUppercasesMatchesOp9 = text.match(wrongUppercasesRegexOp9);
        const wrongStartRegex = /^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
        const wrongStartMatch = text.match(wrongStartRegex)?.toString() ?? null;
        const wrongCharsRegexOp1 = /[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]*/g;
        const wrongCharsMatchesOp1 = text.match(wrongCharsRegexOp1);
        const wrongCharsRegexOp2 = /$[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
        const wrongCharsMatchesOp2 = text.match(wrongCharsRegexOp2);
        const wrongCharsRegexOp3 = /(?<=\sdD)[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
        const wrongCharsMatchesOp3 = text.match(wrongCharsRegexOp3);
        //inicialização de outras variáveis
        const selection = window.getSelection();
        const range = document.createRange();
        let remadeText = text;
        let isUndoUppercase = false;
        let isCursorAutoMoved = false;
        if (text.length === 1 && !newWordMatches) {
            textElement.value = fixFirstLetter(text[0], autoCapitalizeFirstLetterRegex, textElement, range, selection, false);
        }
        else if (text.length > 1) {
            if (textElement.classList.contains("inpAst") ||
                textElement.classList.contains("inpIdentif")) {
                //IIFE para encapsular correção de inícios incorretos de entrada
                (() => {
                    if (wrongCharsMatchesOp1 ||
                        wrongCharsMatchesOp2 ||
                        wrongCharsMatchesOp3) {
                        const wrongCharsMatches = [
                            ...(wrongCharsMatchesOp1 || []),
                            ...(wrongCharsMatchesOp2 || []),
                            ...(wrongCharsMatchesOp3 || []),
                        ];
                        for (let iW = 0; iW < wrongCharsMatches.length; iW++) {
                            const wrongCharLength = wrongCharsMatches[iW].length;
                            wrongCharsMatches.forEach((wrongCharMatch) => {
                                textElement.value = fixWrongStarts(text, wrongCharMatch, wrongCharLength);
                                const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textElement);
                                [textElement.value, isCursorAutoMoved] = arrCorrectCursor;
                            });
                        }
                    }
                })();
                if (wrongStartMatch) {
                    textElement.value =
                        wrongStartCorrection(textElement.value, wrongStartMatch) ?? "";
                }
                if (newWordMatches) {
                    newWordMatches.forEach(() => {
                        //IIFE para capitalizar palavras após a primeira
                        (() => {
                            if (letterMatchesIniNotD && !letterMatchesIniD) {
                                letterMatchesIniNotD.forEach((letterMatch) => {
                                    remadeText = fixNextWordsIniNotD(remadeText, letterMatch);
                                });
                                textElement.value = remadeText;
                                const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textElement);
                                [textElement.value, isCursorAutoMoved] = arrCorrectCursor;
                                textElement.value =
                                    wrongStartCorrection(textElement.value, wrongStartMatch) ??
                                        "";
                            }
                            else if ((letterMatchesIniNotD && letterMatchesIniD) ||
                                (!letterMatchesIniNotD && letterMatchesIniD)) {
                                //IIFE para correção focada em conjunção com D
                                (() => {
                                    let letterMatchesAfterD = [];
                                    if (!letterNotMatchesAfterD &&
                                        (letterMatchesAfterDOp1 ||
                                            letterMatchesAfterDOp2 ||
                                            letterMatchesAfterDOp3)) {
                                        letterMatchesAfterD = [
                                            ...(letterMatchesAfterDOp1 || []),
                                            ...(letterMatchesAfterDOp2 || []),
                                            ...(letterMatchesAfterDOp3 || []),
                                        ];
                                    }
                                    else if (letterNotMatchesAfterD &&
                                        !(letterMatchesAfterDOp1 ||
                                            letterMatchesAfterDOp2 ||
                                            letterMatchesAfterDOp3)) {
                                        if (letterNotMatchesAfterD && letterMatchesIniNotD) {
                                            letterMatchesAfterD = [...(letterMatchesIniNotD || [])];
                                        }
                                    }
                                    else if (letterNotMatchesAfterD &&
                                        (letterMatchesAfterDOp1 ||
                                            letterMatchesAfterDOp2 ||
                                            letterMatchesAfterDOp3 ||
                                            letterMatchesIniNotD)) {
                                        letterMatchesAfterD = [
                                            ...(letterMatchesAfterDOp1 || []),
                                            ...(letterMatchesAfterDOp2 || []),
                                            ...(letterMatchesAfterDOp3 || []),
                                        ];
                                    }
                                    //IIFE para capitalização focada em iniciais D
                                    (() => {
                                        letterMatchesAfterD?.forEach((letterMatchD) => {
                                            remadeText = fixNextWordsAfterD(remadeText, letterMatchD);
                                        });
                                        textElement.value = remadeText;
                                        const arrayCheckLowerCasesD = Array.from(letterMatchesAfterD ?? []);
                                        for (let iD = 0; iD < arrayCheckLowerCasesD.length; iD++) {
                                            const filteredArrayD = letterMatchesAfterD?.filter((iD) => lowercasesRegexObj.test(iD));
                                            if (filteredArrayD) {
                                                const mappedArrayD = filteredArrayD.map((iD) => iD.toUpperCase());
                                                let remadeStringD = "";
                                                const targLetter = filteredArrayD[iD];
                                                const regexTargLetter = new RegExp(targLetter, "g");
                                                if (iD === 0) {
                                                    filteredArrayD.splice(iD, 1, mappedArrayD[0]);
                                                    remadeStringD = filteredArrayD
                                                        .toString()
                                                        .replaceAll(",", "");
                                                    const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textElement);
                                                    [textElement.value, isCursorAutoMoved] =
                                                        arrCorrectCursor;
                                                }
                                                else if (iD === 1) {
                                                    filteredArrayD.splice(iD, 1, mappedArrayD[1]);
                                                    remadeStringD = filteredArrayD
                                                        .toString()
                                                        .replaceAll(",", "")
                                                        .slice(2);
                                                    const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textElement);
                                                    [textElement.value, isCursorAutoMoved] =
                                                        arrCorrectCursor;
                                                    if (textElement.value) {
                                                        textElement.value = textElement.value.replace(regexTargLetter, remadeStringD);
                                                    }
                                                }
                                                else if (iD > 2) {
                                                    filteredArrayD.pop();
                                                    filteredArrayD.push(mappedArrayD[iD]);
                                                    const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textElement);
                                                    [textElement.value, isCursorAutoMoved] =
                                                        arrCorrectCursor;
                                                }
                                            }
                                        }
                                    })();
                                })();
                            }
                        })();
                    });
                }
                //statement para correção de múltiplos upper cases
                if (multipleUppercasesMatches || multipleUppercasesMatches2) {
                    //IIFE para encapsular correção de múltiplos upper cases
                    (() => {
                        const unproperUppercases = [
                            ...(multipleUppercasesMatches || []),
                            ...(wrongUppercasesMatchesOp1 || []),
                            ...(wrongUppercasesMatchesOp2 || []),
                            ...(wrongUppercasesMatchesOp3 || []),
                            ...(wrongUppercasesMatchesOp4 || []),
                            ...(wrongUppercasesMatchesOp5 || []),
                            ...(wrongUppercasesMatchesOp6 || []),
                        ];
                        const unproperDUppercases = [
                            ...(wrongUppercasesMatchesOp7 || []),
                            ...(wrongUppercasesMatchesOp8 || []),
                            ...(wrongUppercasesMatchesOp9 || []),
                        ];
                        unproperUppercases.forEach((multipleUppercasesMatch) => {
                            if (text && multipleUppercasesMatch) {
                                text = fixUnproperUppercases(text, multipleUppercasesMatch, "NoD");
                                //correção de bugs com combinações posteriores de upper/lower
                                // const upperlowercomb = text.match(
                                //   /[a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g
                                // );
                                // const upperlowercombD = text.match(
                                //   /D[a-záàâäãéèêëíìîïóòôöõúùûü][\s]/
                                // );
                                // if (upperlowercomb || upperlowercombD) {
                                //   repeatedLetter = repeatedLetter.toLowerCase();
                                // }
                                //fix para delay em processamento do S em conjunções
                                const upperlowercombDS = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][S][\s]/);
                                if (upperlowercombDS) {
                                    upperlowercombDS.splice(3, 1, "s");
                                }
                                textElement.value = text;
                                isUndoUppercase = true;
                                const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textElement);
                                [textElement.value, isCursorAutoMoved] = arrCorrectCursor;
                                if (range.endOffset >= 1) {
                                    fixCursorPosition(textElement, range, selection, true);
                                }
                            }
                        });
                        unproperDUppercases.forEach((multipleUppercasesMatch) => {
                            if (text && multipleUppercasesMatch) {
                                textElement.value = fixUnproperUppercases(text, multipleUppercasesMatch, "YesDVal");
                                isUndoUppercase = true;
                                const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textElement);
                                [textElement.value, isCursorAutoMoved] = arrCorrectCursor;
                                if (range.endOffset >= 1) {
                                    fixCursorPosition(textElement, range, selection, true);
                                }
                            }
                        });
                    })();
                }
                //statement para controle de combinação após entrada com inicial D
                if (letterMatchesIniD &&
                    letterNotMatchesAfterD &&
                    !(letterMatchesAfterDOp1 ||
                        letterMatchesAfterDOp2 ||
                        letterMatchesAfterDOp3)) {
                    letterNotMatchesAfterD = [];
                }
                //statement para fluxo validando match de iniciais
                if (letterMatchesIniD || letterMatchesIniNotD) {
                    //IIFE para forçar upper case
                    (() => {
                        const wordMatch = [
                            ...(letterMatchesAfterDOp1 || []),
                            ...(letterMatchesAfterDOp2 || []),
                            ...(letterMatchesAfterDOp3 || []),
                            ...(letterMatchesIniNotD || []),
                        ];
                        const DMatch = [
                            ...(letterMatchesAfterDOp1 || []),
                            ...(letterMatchesAfterDOp2 || []),
                            ...(letterMatchesAfterDOp3 || []),
                        ];
                        for (let iM = 0; iM < wordMatch.length; iM++) {
                            const uppercaseTest = uppercasesRegexObj.test(wordMatch[iM]);
                            if (uppercaseTest)
                                continue;
                            textElement.value = fixForcedUpperCase(textElement, wordMatch, wordMatch[iM]);
                            if (DMatch.flat(1).length > 0) {
                                const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textElement);
                                [textElement.value, isCursorAutoMoved] = arrCorrectCursor;
                            }
                        }
                    })();
                }
                //IIFE para fazer correções adicionais no final da edição automática
                (() => {
                    if (wrongCharsMatchesOp1) {
                        textElement.value =
                            textElement.value?.replaceAll(wrongCharsRegexOp1, "") ?? null;
                    }
                    if (wrongCharsMatchesOp2) {
                        textElement.value =
                            textElement.value?.replaceAll(wrongCharsRegexOp2, "") ?? null;
                    }
                    if (wrongCharsMatchesOp3) {
                        textElement.value =
                            textElement.value?.replaceAll(wrongCharsRegexOp3, "") ?? null;
                    }
                    if (text.match(/\s[\s]+/g)) {
                        textElement.value =
                            textElement.value?.replaceAll(/\s[\s]+/g, " ") ?? null;
                    }
                    if (text.match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]/)) {
                        const firstLetterCapitalized = text.slice(0, 1).toUpperCase();
                        const restOfText = text.slice(1);
                        textElement.value = firstLetterCapitalized + restOfText;
                    }
                })();
            }
        }
    }
}
function autoCapitalizeCite(editableCite) {
    const citeText = editableCite?.textContent ?? null;
    if (isAutocorrectOn && citeText) {
        //inicialização de expressões regex com seus objetos e matches associados
        const newWordMatches = citeText.match(/\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g);
        const letterMatchesIniNotD = citeText.match(/\s[^d]/g);
        const letterMatchesIniD = citeText.match(/\sd/g);
        const notMatchesAfterDRegex = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g;
        let letterNotMatchesAfterD = citeText.match(notMatchesAfterDRegex) ?? [];
        const afterDRegexOp1 = /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
        const afterDRegexOp2 = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g;
        const afterDRegexOp3 = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
        const letterMatchesAfterDOp1 = citeText.match(afterDRegexOp1);
        const letterMatchesAfterDOp2 = citeText.match(afterDRegexOp2);
        const letterMatchesAfterDOp3 = citeText.match(afterDRegexOp3);
        const lowercasesRegex = /[a-záàâäãéèêëíìîïóòôöõúùûü]/g;
        const lowercasesRegexObj = new RegExp(lowercasesRegex);
        // const lowercasesMatches = citeText.match(lowercasesRegex);
        const uppercasesRegex = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
        const uppercasesRegexObj = new RegExp(uppercasesRegex);
        const multipleUppercasesRegex = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{2,}/g;
        const multipleUppercasesMatches = citeText.match(multipleUppercasesRegex);
        const wrongUppercasesRegexOp1 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g;
        const wrongUppercasesMatchesOp1 = citeText.match(wrongUppercasesRegexOp1);
        const wrongUppercasesRegexOp2 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        const wrongUppercasesMatchesOp2 = citeText.match(wrongUppercasesRegexOp2);
        const wrongUppercasesRegexOp3 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g;
        const wrongUppercasesMatchesOp3 = citeText.match(wrongUppercasesRegexOp3);
        const wrongUppercasesRegexOp4 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        const wrongUppercasesMatchesOp4 = citeText.match(wrongUppercasesRegexOp4);
        const wrongUppercasesRegexOp5 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g;
        const wrongUppercasesMatchesOp5 = citeText.match(wrongUppercasesRegexOp5);
        const wrongUppercasesRegexOp6 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        const wrongUppercasesMatchesOp6 = citeText.match(wrongUppercasesRegexOp6);
        const wrongUppercasesRegexOp7 = /D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g;
        const wrongUppercasesMatchesOp7 = citeText.match(wrongUppercasesRegexOp7);
        const wrongUppercasesRegexOp8 = /D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g;
        const wrongUppercasesMatchesOp8 = citeText.match(wrongUppercasesRegexOp8);
        const wrongUppercasesRegexOp9 = /D[aeioáàâäãéèêëíìîïóòôöõúùûü][s]\s/g;
        const wrongUppercasesMatchesOp9 = citeText.match(wrongUppercasesRegexOp9);
        const wrongStartRegex = /^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
        const wrongStartMatch = citeText.match(wrongStartRegex)?.toString() ?? null;
        const wrongCharsRegexOp1 = /[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]*/g;
        const wrongCharsMatchesOp1 = citeText.match(wrongCharsRegexOp1);
        const wrongCharsRegexOp2 = /$[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
        const wrongCharsMatchesOp2 = citeText.match(wrongCharsRegexOp2);
        const wrongCharsRegexOp3 = /(?<=\sdD)[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
        const wrongCharsMatchesOp3 = citeText.match(wrongCharsRegexOp3);
        //inicialização de outras variáveis
        const selection = window.getSelection();
        const range = document.createRange();
        let remadeCiteText = citeText;
        let isCursorAutoMoved = false;
        let isAlertMade = false;
        let isSpanActive = false;
        let isUndoUppercase = false;
        //statement para diferenciar início do restante do input
        if (citeText.length === 1 && !newWordMatches) {
            editableCite.textContent = fixFirstLetter(citeText[0], autoCapitalizeFirstLetterRegex, editableCite, range, selection, true);
        }
        else if (citeText.length > 1) {
            //IIFE para encapsular correção de inícios incorretos de entrada
            (() => {
                if (wrongCharsMatchesOp1 ||
                    wrongCharsMatchesOp2 ||
                    wrongCharsMatchesOp3) {
                    const wrongCharsMatches = [
                        ...(wrongCharsMatchesOp1 || []),
                        ...(wrongCharsMatchesOp2 || []),
                        ...(wrongCharsMatchesOp3 || []),
                    ];
                    for (let iW = 0; iW < wrongCharsMatches.length; iW++) {
                        const wrongCharLength = wrongCharsMatches[iW].length;
                        wrongCharsMatches.forEach((wrongCharMatch) => {
                            editableCite.textContent = fixWrongStarts(citeText, wrongCharMatch, wrongCharLength);
                            const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                            [editableCite.textContent, isCursorAutoMoved] = arrCorrectCursor;
                            isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
                            [isSpanActive, isAlertMade] = createSpanAlert(isSpanActive, isAlertMade);
                        });
                    }
                }
            })();
            if (wrongStartMatch) {
                editableCite.textContent = wrongStartCorrection(editableCite.textContent, wrongStartMatch);
            }
            if (newWordMatches) {
                newWordMatches.forEach(() => {
                    //IIFE para capitalizar palavras após a primeira
                    (() => {
                        if (letterMatchesIniNotD && !letterMatchesIniD) {
                            letterMatchesIniNotD.forEach((letterMatch) => {
                                remadeCiteText = fixNextWordsIniNotD(remadeCiteText, letterMatch);
                            });
                            editableCite.textContent = remadeCiteText;
                            isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
                            const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                            [editableCite.textContent, isCursorAutoMoved] = arrCorrectCursor;
                            editableCite.textContent = wrongStartCorrection(editableCite.textContent, wrongStartMatch);
                        }
                        else if ((letterMatchesIniNotD && letterMatchesIniD) ||
                            (!letterMatchesIniNotD && letterMatchesIniD)) {
                            //IIFE para correção focada em conjunção com D
                            (() => {
                                let letterMatchesAfterD = [];
                                if (!letterNotMatchesAfterD &&
                                    (letterMatchesAfterDOp1 ||
                                        letterMatchesAfterDOp2 ||
                                        letterMatchesAfterDOp3)) {
                                    letterMatchesAfterD = [
                                        ...(letterMatchesAfterDOp1 || []),
                                        ...(letterMatchesAfterDOp2 || []),
                                        ...(letterMatchesAfterDOp3 || []),
                                    ];
                                }
                                else if (letterNotMatchesAfterD &&
                                    !(letterMatchesAfterDOp1 ||
                                        letterMatchesAfterDOp2 ||
                                        letterMatchesAfterDOp3)) {
                                    if (letterNotMatchesAfterD && letterMatchesIniNotD) {
                                        letterMatchesAfterD = [...(letterMatchesIniNotD || [])];
                                    }
                                }
                                else if (letterNotMatchesAfterD &&
                                    (letterMatchesAfterDOp1 ||
                                        letterMatchesAfterDOp2 ||
                                        letterMatchesAfterDOp3 ||
                                        letterMatchesIniNotD)) {
                                    letterMatchesAfterD = [
                                        ...(letterMatchesAfterDOp1 || []),
                                        ...(letterMatchesAfterDOp2 || []),
                                        ...(letterMatchesAfterDOp3 || []),
                                    ];
                                }
                                //IIFE para capitalização focada em iniciais D
                                (() => {
                                    letterMatchesAfterD.forEach((letterMatchD) => {
                                        remadeCiteText = fixNextWordsAfterD(remadeCiteText, letterMatchD);
                                    });
                                    editableCite.textContent = remadeCiteText;
                                    const arrayCheckLowerCasesD = Array.from(letterMatchesAfterD ?? []);
                                    for (let iD = 0; iD < arrayCheckLowerCasesD.length; iD++) {
                                        const filteredArrayD = letterMatchesAfterD?.filter((iD) => lowercasesRegexObj.test(iD));
                                        if (filteredArrayD) {
                                            const mappedArrayD = filteredArrayD.map((iD) => iD.toUpperCase());
                                            let remadeStringD = "";
                                            const targLetter = filteredArrayD[iD];
                                            const regexTargLetter = new RegExp(targLetter, "g");
                                            if (iD === 0) {
                                                [isSpanActive, isAlertMade] = createSpanAlert(isSpanActive, isAlertMade);
                                                filteredArrayD.splice(iD, 1, mappedArrayD[0]);
                                                remadeStringD = filteredArrayD
                                                    .toString()
                                                    .replaceAll(",", "");
                                                const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                                                [editableCite.textContent, isCursorAutoMoved] =
                                                    arrCorrectCursor;
                                            }
                                            else if (iD === 1) {
                                                [isSpanActive, isAlertMade] = createSpanAlert(isSpanActive, isAlertMade);
                                                filteredArrayD.splice(iD, 1, mappedArrayD[1]);
                                                remadeStringD = filteredArrayD
                                                    .toString()
                                                    .replaceAll(",", "")
                                                    .slice(2);
                                                const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                                                [editableCite.textContent, isCursorAutoMoved] =
                                                    arrCorrectCursor;
                                                if (editableCite.textContent) {
                                                    editableCite.textContent =
                                                        editableCite.textContent.replace(regexTargLetter, remadeStringD);
                                                }
                                            }
                                            else if (iD > 2) {
                                                filteredArrayD.pop();
                                                filteredArrayD.push(mappedArrayD[iD]);
                                                const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                                                [editableCite.textContent, isCursorAutoMoved] =
                                                    arrCorrectCursor;
                                            }
                                        }
                                    }
                                })();
                            })();
                        }
                    })();
                });
            }
            if (multipleUppercasesMatches) {
                //IIFE para encapsular correção de múltiplos upper cases
                (() => {
                    const unproperUppercases = [
                        ...(multipleUppercasesMatches || []),
                        ...(wrongUppercasesMatchesOp1 || []),
                        ...(wrongUppercasesMatchesOp2 || []),
                        ...(wrongUppercasesMatchesOp3 || []),
                        ...(wrongUppercasesMatchesOp4 || []),
                        ...(wrongUppercasesMatchesOp5 || []),
                        ...(wrongUppercasesMatchesOp6 || []),
                    ];
                    const unproperDUppercases = [
                        ...(wrongUppercasesMatchesOp7 || []),
                        ...(wrongUppercasesMatchesOp8 || []),
                        ...(wrongUppercasesMatchesOp9 || []),
                    ];
                    unproperUppercases.forEach((multipleUppercasesMatch) => {
                        if (citeText && multipleUppercasesMatch) {
                            editableCite.textContent = fixUnproperUppercases(citeText, multipleUppercasesMatch, "NoD");
                            isUndoUppercase = true;
                            const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                            [editableCite.textContent, isCursorAutoMoved] = arrCorrectCursor;
                            isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
                            [isSpanActive, isAlertMade] = createSpanAlert(isSpanActive, isAlertMade);
                        }
                    });
                    unproperDUppercases.forEach((multipleUppercasesMatch) => {
                        if (citeText && multipleUppercasesMatch) {
                            editableCite.textContent = fixUnproperUppercases(citeText, multipleUppercasesMatch, "YesDCont");
                            isUndoUppercase = true;
                            const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                            [editableCite.textContent, isCursorAutoMoved] = arrCorrectCursor;
                            isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
                            [isSpanActive, isAlertMade] = createSpanAlert(isSpanActive, isAlertMade);
                        }
                    });
                })();
            }
        }
        //statement para correção de blocos após inicial com D
        if (letterMatchesIniD &&
            letterNotMatchesAfterD &&
            !(letterMatchesAfterDOp1 ||
                letterMatchesAfterDOp2 ||
                letterMatchesAfterDOp3)) {
            letterNotMatchesAfterD = [];
        }
        //statement para correção de múltiplos upper cases forçados indevidamente
        if (letterMatchesIniD || letterMatchesIniNotD) {
            //IIFE para forçar upper case
            (() => {
                const wordMatch = [
                    ...(letterMatchesAfterDOp1 || []),
                    ...(letterMatchesAfterDOp2 || []),
                    ...(letterMatchesAfterDOp3 || []),
                    ...(letterMatchesIniNotD || []),
                ];
                const DMatch = [
                    ...(letterMatchesAfterDOp1 || []),
                    ...(letterMatchesAfterDOp2 || []),
                    ...(letterMatchesAfterDOp3 || []),
                ];
                for (let iM = 0; iM < wordMatch.length; iM++) {
                    const uppercaseTest = uppercasesRegexObj.test(wordMatch[iM]);
                    if (uppercaseTest)
                        continue;
                    editableCite.textContent = fixForcedUpperCase(editableCite, wordMatch, wordMatch[iM]);
                    if (DMatch.flat(1).length > 0) {
                        const arrCorrectCursor = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                        [editableCite.textContent, isCursorAutoMoved] = arrCorrectCursor;
                        [isSpanActive, isAlertMade] = createSpanAlert(isSpanActive, isAlertMade);
                    }
                }
            })();
        }
        //IIFE para fazer correções no final da edição automática
        (() => {
            if (wrongCharsMatchesOp1) {
                editableCite.textContent =
                    editableCite.textContent?.replaceAll(wrongCharsRegexOp1, "") ?? null;
                isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
            }
            if (wrongCharsMatchesOp2) {
                editableCite.textContent =
                    editableCite.textContent?.replaceAll(wrongCharsRegexOp2, "") ?? null;
                isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
            }
            if (wrongCharsMatchesOp3) {
                editableCite.textContent =
                    editableCite.textContent?.replaceAll(wrongCharsRegexOp3, "") ?? null;
                isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
            }
            if (editableCite.textContent?.match(/\s[\s]+/g)) {
                editableCite.textContent =
                    editableCite.textContent?.replaceAll(/\s[\s]+/g, " ") ?? null;
                isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
            }
        })();
    }
    //declarações de funções locais
    function createSpanAlert(isSpanActive, isAlertMade) {
        const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
        const computedStyleRegex = /,\d+.?\d*.?\d*/g;
        if (editableCite.nextElementSibling &&
            editableCite instanceof HTMLElement) {
            const nextCiteElementSibling = editableCite.nextElementSibling.id;
            if (nextCiteElementSibling === "deactAutocorrectBtn" && !isSpanActive) {
                const cursorResetAlert = document.createElement("span");
                if (!isAlertMade) {
                    cursorResetAlert.textContent = "Cursor resetado! Aperte alguma tecla";
                    isAlertMade = true;
                }
                editableCite.parentNode?.insertBefore(cursorResetAlert, editableCite.nextSibling);
                cursorResetAlert.setAttribute("class", "briefAlert");
                cursorResetAlert.setAttribute("id", "briefAlertCite");
                cursorResetAlert.style.setProperty("border-color", "white");
                cursorResetAlert.style.setProperty("opacity", "1");
                cursorResetAlert.style.setProperty("font-size", "8px");
                editableCite.style.setProperty("border-color", "rgba(255, 165, 0, 0.9)"); //alertar usuário da mudança de cursor devido à reconstrução do textContent editável
                isSpanActive = true;
                setTimeout(() => {
                    const computedStyleCite = window
                        .getComputedStyle(editableCite)
                        .getPropertyValue("border-color");
                    const rgbaMatch = computedStyleCite.match(rgbaRegex);
                    if (rgbaMatch) {
                        const reduceOpacity = setInterval(() => {
                            const poppedArray = rgbaMatch.pop(); //faz a retirada inicial
                            let strUpdatedAlpha = poppedArray?.toString();
                            const strRgba = rgbaMatch
                                .toString()
                                .replaceAll(computedStyleRegex, "");
                            const firstSliceStrRgba = strRgba.slice(0, 18);
                            let strNewOpacityValue = firstSliceStrRgba + " " + strUpdatedAlpha + ")";
                            if (strUpdatedAlpha && strUpdatedAlpha <= "0.05") {
                                strUpdatedAlpha = "0";
                                strNewOpacityValue = firstSliceStrRgba + "0)";
                                cursorResetAlert.remove();
                                clearInterval(reduceOpacity);
                            }
                            editableCite.style.setProperty("border-color", strNewOpacityValue);
                        }, 100);
                    }
                }, 500);
            }
            else if (nextCiteElementSibling === "briefAlertCite" || isSpanActive) {
                //algum efeito visual
            }
        }
        return [isSpanActive, isAlertMade];
    }
}
function removeFirstClick(editableCite) {
    if (editableCite.textContent === "Insira Seu Nome Aqui") {
        editableCite.textContent = "";
    }
    let cursorPosition = 0;
    setInterval(() => {
        cursorPosition = _gHandlers__WEBPACK_IMPORTED_MODULE_0__.cursorCheckTimer(cursorPosition) ?? 0;
    }, 3000);
}
function switchAutocorrect(click, deactAutocorrectBtn) {
    if (click.target === deactAutocorrectBtn) {
        isAutocorrectOn = !isAutocorrectOn; //simplificação de if-else; if-if não funciona aqui
        deactAutocorrectBtn.textContent = isAutocorrectOn
            ? "Desativar Autocorreção"
            : "Ativar Autocorreção";
    }
}
function checkAllGenConts(gen, genBirthRel, genTrans, genFisAlin) {
    let isGenValid = false;
    let isGenBirthRelValid = false;
    let isGenTransContValid = false;
    let isGenFisAlinValid = false;
    try {
        if (gen && gen instanceof HTMLSelectElement) {
            isGenValid = true;
        }
        else {
            throw new Error(`Erro validando gen: elemento ${gen}, instância ${gen instanceof HTMLSelectElement}`);
        }
    }
    catch (errorGen) {
        console.error(errorGen.message);
    }
    finally {
        //algum efeito visual
    }
    try {
        if (genBirthRel && genBirthRel instanceof HTMLSelectElement) {
            isGenBirthRelValid = true;
        }
        else {
            throw new Error(`Erro validando gen: elemento ${genBirthRel}, instância ${genBirthRel instanceof HTMLSelectElement}`);
        }
    }
    catch (errorGenBirthRel) {
        console.error(errorGenBirthRel.message);
    }
    finally {
        //algum efeito visual
    }
    try {
        if (genTrans && genTrans instanceof HTMLSelectElement) {
            isGenTransContValid = true;
        }
        else {
            throw new Error(`Erro validando genTrans: elemento ${genTrans}, instância ${genTrans instanceof HTMLSelectElement}`);
        }
    }
    catch (errorGenTrans) {
        console.error(errorGenTrans.message);
    }
    finally {
        //algum efeito visual
    }
    try {
        if (genFisAlin && genFisAlin instanceof HTMLSelectElement) {
            isGenFisAlinValid = true;
        }
        else {
            throw new Error(`Erro validando genFisAlin: elemento ${genFisAlin}, instância ${genFisAlin instanceof HTMLSelectElement}`);
        }
    }
    catch (errorGenFisAlin) {
        console.error(errorGenFisAlin.message);
    }
    finally {
        //algum efeito visual
    }
    if (isGenValid &&
        isGenBirthRelValid &&
        isGenTransContValid &&
        isGenFisAlinValid) {
        return true;
    }
    else {
        console.error("Erro verificando booleanos de containers de gênero");
        return false;
    }
}
function fluxGen(gen, genIniValue, genBirthRel, genTrans, genFisAlin) {
    let genValue = "";
    if (gen.value === "masculino" || gen.value === "feminino") {
        if (genBirthRel.value === "cis") {
            genValue = genIniValue ?? gen.value;
            hideGenFisAlin(genFisAlin);
            hideStgTransHorm(genTrans);
            return genValue;
        }
        else if (genBirthRel.value === "trans") {
            showStgTransHorm(genTrans);
            if (genTrans.value === "avancado") {
                genValue = genIniValue ?? gen.value;
                hideGenFisAlin(genFisAlin);
                return genValue;
            }
            else if (genTrans.value === "undefined" ||
                genTrans.value === "no" ||
                genTrans.value === "inicial" ||
                genTrans.value === "intermediario") {
                showGenFisAlin(genFisAlin);
                const contFeminilizado = document.querySelector('option[value="feminilizado"]');
                const contMasculinizado = document.querySelector('option[value="masculinizado"]');
                if (contFeminilizado instanceof HTMLOptionElement &&
                    contMasculinizado instanceof HTMLOptionElement) {
                    if (genTrans.value === "intermediario") {
                        if (gen.value === "masculino") {
                            const isFemSelected = contFeminilizado?.selected ?? false;
                            if (isFemSelected) {
                                contFeminilizado.removeAttribute("selected");
                            }
                            contMasculinizado.setAttribute("selected", "");
                        }
                        if (gen.value === "feminino") {
                            const isMascSelected = contMasculinizado?.selected ?? false;
                            if (isMascSelected) {
                                contMasculinizado.removeAttribute("selected");
                            }
                            contFeminilizado.setAttribute("selected", "");
                        }
                    }
                    else {
                        const isFemSelected = contFeminilizado?.selected ?? false;
                        const isMascSelected = contMasculinizado?.selected ?? false;
                        if (isMascSelected) {
                            contMasculinizado.removeAttribute("selected");
                        }
                        if (isFemSelected) {
                            contFeminilizado.removeAttribute("selected");
                        }
                    }
                }
                if (genFisAlin.value === "masculinizado") {
                    genValue = "masculino";
                    return genValue;
                }
                else if (genFisAlin.value === "feminilizado") {
                    genValue = "feminino";
                    return genValue;
                }
                else if (genFisAlin.value === "neutro") {
                    genValue = "neutro";
                    return genValue;
                }
            }
        }
        else if (genBirthRel.value === "outros" ||
            genBirthRel.value === "undefined") {
            showGenFisAlin(genFisAlin);
            if (genFisAlin.value === "masculinizado") {
                genValue = "masculino";
                return genValue;
            }
            else if (genFisAlin.value === "feminilizado") {
                genValue = "feminino";
                return genValue;
            }
            else if (genFisAlin.value === "neutro") {
                genValue = "neutro";
                return genValue;
            }
        }
    }
    else if (gen.value === "naoBinario" ||
        gen.value === "outros" ||
        gen.value === "undefined") {
        if (genBirthRel.value === "trans") {
            showStgTransHorm(genTrans);
        }
        else {
            hideStgTransHorm(genTrans);
        }
        showGenFisAlin(genFisAlin);
        if (genFisAlin.value === "masculinizado") {
            genValue = "masculino";
            return genValue;
        }
        else if (genFisAlin.value === "feminilizado") {
            genValue = "feminino";
            return genValue;
        }
        else if (genFisAlin.value === "neutro") {
            genValue = "neutro";
            return genValue;
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.stringError("obtendo gen.value", gen?.value ?? "UNDEFINED VALUE", slicedError ?? "NULL");
    }
    return genValue;
}
function showGenFisAlin(genFisAlin) {
    if (genFisAlin) {
        genFisAlin.closest(".spanFsAnamG")?.removeAttribute("hidden");
        return true;
    }
    else {
        console.warn("Erro na abertura de genFisAlin");
    }
}
function hideGenFisAlin(genFisAlin) {
    if (genFisAlin) {
        genFisAlin.closest(".spanFsAnamG")?.setAttribute("hidden", "");
        return false;
    }
    else {
        console.warn("Erro no fechamento de genFisAlin");
    }
}
function showStgTransHorm(genTrans) {
    if (genTrans) {
        genTrans.closest(".spanFsAnamG")?.removeAttribute("hidden");
        return true;
    }
    else {
        console.warn("Erro na abertura de genTrans");
    }
}
function hideStgTransHorm(genTrans) {
    if (genTrans) {
        genTrans.closest(".spanFsAnamG")?.setAttribute("hidden", "");
        return false;
    }
    else {
        console.warn("Erro no fechamento de genTrans");
    }
}
function filterIdsByGender(arrayIds, bodyType) {
    if (Array.isArray(arrayIds)) {
        if (arrayIds.every((prop) => typeof prop === "string") &&
            typeof bodyType === "string") {
            const genderedIds = [];
            let slicedError = "";
            switch (bodyType) {
                case "masculino":
                    for (let iM = 0; iM < arrayIds.length; iM++) {
                        if (arrayIds[iM] === "peit" ||
                            arrayIds[iM] === "abd" ||
                            arrayIds[iM] === "coxa") {
                            genderedIds.push(arrayIds[iM]);
                        }
                    }
                    break;
                case "feminino":
                    for (let iF = 0; iF < arrayIds.length; iF++) {
                        if (arrayIds[iF] === "tricp" ||
                            arrayIds[iF] === "suprail" ||
                            arrayIds[iF] === "coxa") {
                            genderedIds.push(arrayIds[iF]);
                        }
                    }
                    break;
                case "neutro":
                    for (let iN = 0; iN < arrayIds.length; iN++) {
                        if (arrayIds[iN] === "peit" ||
                            arrayIds[iN] === "abd" ||
                            arrayIds[iN] === "tricp" ||
                            arrayIds[iN] === "suprail" ||
                            arrayIds[iN] === "coxa")
                            genderedIds.push(arrayIds[iN]);
                    }
                    break;
                default:
                    slicedError =
                        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _errorHandler__WEBPACK_IMPORTED_MODULE_2__.stringError(`obtendo bodyType válido`, bodyType ?? null, slicedError ?? "NULL");
            }
            return genderedIds;
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _errorHandler__WEBPACK_IMPORTED_MODULE_2__.typeError(`validando elementos para definição de gênero como strings`, bodyType ?? null, "string", slicedError ?? "NULL");
        }
    }
    else {
        console.warn(`Erro validando array em filterIdsByGender()`);
    }
}
function generatePersonInstance(person) {
    if (typeof person.gen === "string" && person.gen !== "") {
        if (person.gen === "masculino") {
            person = new _classes__WEBPACK_IMPORTED_MODULE_1__.Man(person.gen, person.age, person.weight, person.height, person.sumDCut, person.atvLvl);
        }
        else if (person.gen === "feminino") {
            person = new _classes__WEBPACK_IMPORTED_MODULE_1__.Woman(person.gen, person.age, person.weight, person.height, person.sumDCut, person.atvLvl);
        }
        else if (person.gen === "neutro") {
            person = new _classes__WEBPACK_IMPORTED_MODULE_1__.Neutro(person.gen, person.age, person.weight, person.height, person.sumDCut, person.atvLvl);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _errorHandler__WEBPACK_IMPORTED_MODULE_2__.stringError("person.gen", person?.gen ?? null, slicedError ?? "NULL");
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.typeError("person.gen", person?.gen ?? null, "string", slicedError ?? "NULL");
    }
    return person;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/edFisNutController.tsx ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edFisNutModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edFisNutModel */ "./src/edFisNutModel.tsx");
/* harmony import */ var _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edFisNutHandler */ "./src/edFisNutHandler.tsx");
/* harmony import */ var _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global-scripts/src/gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global-scripts/src/gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../global-scripts/src/errorHandler */ "../global-scripts/src/errorHandler.tsx");
/* harmony import */ var _global_scripts_src_classes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../global-scripts/src/classes */ "../global-scripts/src/classes.tsx");
//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM






//inicialização de constantes a partir de procura no DOM
const textareas = document.querySelectorAll("textarea");
const textInputs = document.querySelectorAll('input[type="text"]');
const textConts = [...textareas, ...textInputs];
const genElement = document.getElementById("genId");
const genBirthRel = document.getElementById("genBirthRelId");
const genTrans = document.getElementById("genTransId");
const genFisAlin = document.getElementById("genFisAlinId");
const textBodytype = document.getElementById("textBodytype");
const ageElement = document.getElementById("ageId");
const atvLvlElement = document.getElementById("selectLvlAtFis");
const numInps = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const comorbBtns = document.getElementsByClassName("countComorb");
const comorbBtnsArray = Array.from(comorbBtns);
const ativFisContainerBtns = document.getElementsByClassName("countAtFis");
const ativFisContainerBtnsArray = Array.from(ativFisContainerBtns);
const consTablesFs = document.getElementById("fsProgConsId");
const numConsElement = document.getElementById("selectNumCons");
const tabSVi = document.getElementById("tabProgSVi");
const tabMedAnt = document.getElementById("tabMedAnt");
const tabDC = document.getElementById("tabDCut");
const tabIndPerc = document.getElementById("tabIndPerc");
const editableCite = document.querySelector('cite[contenteditable="true"]');
const astDigtBtns = document.querySelectorAll('button[id$="AstDigtBtn');
const deactAutocorrectBtns = document.querySelectorAll('button[id^="deactAutocorrectBtn"]');
const dateBtns = document.querySelectorAll('button[id$="DatBtn"]');
const gordCorpLvl = document.getElementById("gordCorpLvl");
const lockGordCorpLvl = document.getElementById("lockGordCorpLvl");
const nafType = document.getElementById("nafType");
const formTMBTypeElement = document.getElementById("formCalcTMBType");
const spanFactorAtleta = document.getElementById("spanFactorAtleta");
const selFactorAtleta = document.getElementById("selFactorAtleta");
const weightInps = Array.from(document.getElementsByClassName("inpWeight"));
const heightInps = Array.from(document.getElementsByClassName("inpHeight"));
const sumDCInps = Array.from(document.getElementsByClassName("inpSumDCut"));
const IMCInps = Array.from(document.getElementsByClassName("inpImc"));
const MLGInps = Array.from(document.getElementsByClassName("inpMlg"));
const PGCInps = Array.from(document.getElementsByClassName("inpPgc"));
const TMBInps = Array.from(document.getElementsByClassName("inpTmb"));
const GETInps = Array.from(document.getElementsByClassName("inpGet"));
const IMCBtns = Array.from(document.getElementsByClassName("tabBtnImc"));
const MLGBtns = Array.from(document.getElementsByClassName("tabBtnMlg"));
const PGCBtns = Array.from(document.getElementsByClassName("tabBtnPgc"));
const TMBBtns = Array.from(document.getElementsByClassName("tabBtnTmb"));
const GETBtns = Array.from(document.getElementsByClassName("tabBtnGet"));
const autoFillBtn = document.getElementById("autoFillBtn");
const trioReadNumCons = document.getElementById("trioReadNumCons");
const numConsTextHeadCels = Array.from(document.getElementsByClassName("numConsTextHeadCel"));
const locksTabInd = Array.from(document.getElementsByClassName("lockTabInd"));
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");
//inicialização de variáveis para validação e construção de pessoa tratada no formulário
const areAllGenContChecked = _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.checkAllGenConts(genElement, genBirthRel, genTrans, genFisAlin);
let person = {
    gen: genElement?.value ?? "",
    age: 0,
    sumDCut: 0,
    weight: 0,
    height: 0,
    atvLvl: atvLvlElement?.value ?? "",
};
//inicialização de variáveis usadas no tabelamento, para alcance em escopo global
//variáveis e constantes obtidas através de queries nas tabelas são inicializadas em blocos, após validação das respectivas tabelas
let numTotalTabsCons = 1;
let numCons = 1;
let numCol = 1;
let numColsCons = 1;
let numTotalColsCons = 1;
let areColGroupsSimilar = false;
let areNumConsOpsValid = false;
let targInpWeight = null;
let targInpHeight = null;
let targInpSumDCut = null;
let targInpIMC = null;
let targInpMLG = null;
let targInpPGC = null;
let targInpTMB = null;
let targInpGET = null;
let arrayTargInps = [];
let arrayWH = [0, 0];
let arrayPGC = [0, null, null];
let IMC = 0;
let MLG = 0;
let PGC = 0;
let TMB = 0;
let GET = 0;
let indexesArray = [0, 0, 0, 0];
let factorAtvLvl = 0;
let factorAtleta = "";
let numConsLastOp = 0;
let isPersonClassified = false;
let isAutoFillActive = true;
if (selFactorAtleta instanceof HTMLSelectElement) {
    factorAtleta = selFactorAtleta.value;
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(selFactorAtleta ?? null, "selFactorAtleta", slicedError ?? "NULL");
}
//início da validação de elementos no DOM e inserção de listeners com callbacks respectivos
if (textConts.length > 0) {
    textConts.forEach(function (textCont) {
        textCont.addEventListener("input", function (input) {
            if (input.target &&
                (input.target instanceof HTMLTextAreaElement ||
                    (input.target instanceof HTMLInputElement &&
                        input.target.type === "text"))) {
                _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.autoCapitalizeInputs(input.target);
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(input?.target ?? null, "textCont", slicedError ?? "NULL");
            }
        });
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(textConts ?? null, "textConts", slicedError ?? "NULL");
}
if (numInps.length > 0) {
    numInps.forEach(function (numInp) {
        numInp.addEventListener("input", function (input) {
            if (input.target &&
                input.target instanceof HTMLInputElement &&
                input.target.type === "number") {
                _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.numberLimit(input.target);
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(input?.target ?? null, "numInp", slicedError ?? "NULL");
            }
        });
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(numInps ?? null, "numInps", slicedError ?? "NULL");
}
if (radioButtons.length > 0) {
    radioButtons.forEach((radio) => {
        if (radio instanceof HTMLInputElement && radio.type === "radio") {
            radio.addEventListener("keydown", (keydown) => {
                _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.opRadioHandler(keydown);
            });
            radio.addEventListener("change", () => _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.cpbInpHandler(radio));
            radio.addEventListener("keydown", () => _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.cpbInpHandler(radio));
            radio.addEventListener("dblclick", () => _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.doubleClickHandler(radio));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(radio ?? null, "radio element", slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(radioButtons ?? null, "radioButtons", slicedError ?? "NULL");
}
if (comorbBtnsArray.length > 0) {
    comorbBtnsArray.forEach((comorbBtn) => {
        if (comorbBtn && comorbBtn instanceof HTMLButtonElement) {
            comorbBtn.addEventListener("click", () => _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.addRowComorb(comorbBtn));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(comorbBtn ?? null, "comorbBtn", slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(comorbBtnsArray ?? "null", "comorbBtnsArray", slicedError ?? "NULL");
}
if (ativFisContainerBtnsArray.length > 0) {
    ativFisContainerBtnsArray.forEach((ativFisContainerBtn) => {
        if (ativFisContainerBtn &&
            ativFisContainerBtn instanceof HTMLButtonElement) {
            ativFisContainerBtn.addEventListener("click", () => _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.addRowAtivFis(ativFisContainerBtn));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(ativFisContainerBtn ?? null, "ativFisContainerBtn", slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(ativFisContainerBtnsArray ?? null, "ativFisContainerBtnsArray", slicedError ?? "NULL");
}
if (dateBtns.length > 0) {
    dateBtns.forEach(function (dateBtn) {
        if (dateBtn instanceof HTMLButtonElement) {
            dateBtn.addEventListener("click", function (activation) {
                return _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.useCurrentDate(activation, dateBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(dateBtn ?? null, "dateBtn", slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(dateBtns ?? null, "dateBtns", slicedError ?? "NULL");
}
if (editableCite) {
    let firstClick = true;
    const citeClickHandler = function (click) {
        if (firstClick && click.target && click.target instanceof HTMLElement) {
            _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.removeFirstClick(click.target);
            firstClick = false;
            editableCite.removeEventListener("click", citeClickHandler);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(click.target ?? null, "editableCite", slicedError ?? "NULL");
        }
    };
    editableCite.addEventListener("keyup", function (keypress) {
        if (keypress.target && keypress.target instanceof HTMLElement) {
            _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.autoCapitalizeCite(keypress.target);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(keypress.target ?? null, "editableCite", slicedError ?? "NULL");
        }
    });
    editableCite.addEventListener("click", citeClickHandler);
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(null, "editableCite", slicedError ?? "NULL");
}
if (deactAutocorrectBtns.length > 0) {
    deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
        if (deactAutocorrectBtn &&
            deactAutocorrectBtn instanceof HTMLButtonElement) {
            deactAutocorrectBtn.addEventListener("click", function (click) {
                return _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.switchAutocorrect(click, deactAutocorrectBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(deactAutocorrectBtn ?? null, "deactAutocorrectBtn", slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(deactAutocorrectBtns ?? null, "deactAutocorrectBtns", slicedError ?? "NULL");
}
if (astDigtBtns.length > 0) {
    astDigtBtns.forEach(function (astDigtBtn) {
        if (astDigtBtn instanceof HTMLButtonElement) {
            astDigtBtn.addEventListener("click", function (click) {
                return _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.changeToAstDigit(click, astDigtBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(astDigtBtn ?? null, "astDigtBtn", slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(astDigtBtns ?? null, "astDigtBtns", slicedError ?? "NULL");
}
if (subButton instanceof HTMLButtonElement) {
    subButton.addEventListener("click", _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.subForm);
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(subButton ?? null, "subButton", slicedError ?? "NULL");
}
if (resetFormBtn instanceof HTMLButtonElement) {
    resetFormBtn.addEventListener("click", (click) => {
        if (editableCite instanceof HTMLElement &&
            genTrans instanceof HTMLSelectElement &&
            genFisAlin instanceof HTMLSelectElement) {
            _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.resetarFormulario(click, astDigtBtns);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementsNotFoundFunction(slicedError ?? "NULL", "resetarFormulario", editableCite ?? null, genTrans ?? null, genFisAlin ?? null);
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(resetFormBtn ?? null, "resetFormBtn", slicedError ?? "NULL");
}
//para apagar retornos negativos anômalos
if (consTablesFs && consTablesFs instanceof HTMLFieldSetElement) {
    numTotalColsCons = consTablesFs.querySelectorAll("col")?.length ?? 1;
    numTotalTabsCons = consTablesFs.querySelectorAll("table")?.length ?? 1;
    const allTabledInps = consTablesFs.querySelectorAll("input");
    if (allTabledInps.length > 0) {
        allTabledInps.forEach((tabInp) => {
            if (tabInp instanceof HTMLInputElement) {
                tabInp.addEventListener("input", () => {
                    if (parseInt(tabInp.value) < 0 ||
                        Number.isNaN(parseInt(tabInp.value))) {
                        tabInp.value = "0";
                    }
                });
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(tabInp ?? null, "tabInp", slicedError ?? "NULL");
            }
        });
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(allTabledInps ?? null, "allTabledInps", slicedError ?? "NULL");
    }
    const arrColGroupsValidation = _edFisNutModel__WEBPACK_IMPORTED_MODULE_0__.checkInnerColGroups(consTablesFs) ?? [0, false];
    if (arrColGroupsValidation[0] !== 0 && arrColGroupsValidation[1] !== false) {
        [numColsCons, areColGroupsSimilar] = arrColGroupsValidation;
    }
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(consTablesFs ?? null, "consTablesFs", slicedError ?? "NULL");
}
if (tabDC && tabDC instanceof HTMLTableElement) {
    const rowsDC = tabDC.getElementsByClassName("tabRowDCut");
    const rowsDCArray = Array.from(rowsDC).filter((rowDC) => rowDC instanceof HTMLTableRowElement);
    const sumDCBtns = tabDC.querySelectorAll('button[id^="sumDCBtn"]');
    const protocolo = document.getElementById("tabSelectDCutId");
    //adiciona listeners para botões de índices secundários e valida outras tabelas usadas
    if (tabSVi &&
        tabSVi instanceof HTMLTableElement &&
        tabMedAnt &&
        tabMedAnt instanceof HTMLTableElement &&
        tabIndPerc &&
        tabIndPerc instanceof HTMLTableElement) {
        //início da captura de propriedades nas tabelas
        if (numConsElement?.lastElementChild instanceof HTMLOptionElement) {
            numConsLastOp = parseInt(numConsElement?.lastElementChild?.value ?? "1", 10);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(numConsElement?.lastElementChild ?? null, "numConsLastOp", slicedError ?? "NULL");
        }
        //validação da relação de options e colunas
        if (numConsLastOp === numColsCons - 1 && numConsLastOp >= 3) {
            areNumConsOpsValid = true;
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.maxNumberError(numConsElement?.lastElementChild?.value ?? "1", "Options para Consultas", slicedError ?? "NULL");
        }
        //faz a leitura do número de consulta
        if (areColGroupsSimilar &&
            numConsElement instanceof HTMLSelectElement &&
            gordCorpLvl instanceof HTMLSelectElement &&
            areNumConsOpsValid) {
            //construção de array para sintetizar argumentação de funções e validações conjuntas
            const switchElements = [
                consTablesFs,
                numConsElement,
                tabSVi,
                tabMedAnt,
                tabDC,
                tabIndPerc,
            ];
            const filteredSwitchElements = switchElements.filter((switchElement) => switchElement instanceof HTMLElement);
            numCons = parseInt(numConsElement?.value || "1");
            if (filteredSwitchElements.length === 6) {
                /*validações de rows com base em títulos (textContent da primeira célula à esquerda) de respectivas rows
                + obtenção dos target inputs iniciais*/
                const inpWeightRowTitle = tabMedAnt.querySelector(`#tabCelRowMedAnt2_1`);
                const inpHeightRowTitle = tabMedAnt.querySelector("#tabCelRowMedAnt3_1");
                const inpSumDCutRowTitle = tabDC.querySelector("#tabCelRowDCut9_1");
                const inpIMCRowTitle = tabIndPerc.querySelector("#tabCelRowIndPerc2_1");
                const inpMLGRowTitle = tabIndPerc.querySelector("#tabCelRowIndPerc3_1");
                const inpPGCRowTitle = tabIndPerc.querySelector("#tabCelRowIndPerc4_1");
                const inpTMBRowTitle = tabIndPerc.querySelector("#tabCelRowIndPerc5_1");
                const inpGETRowTitle = tabIndPerc.querySelector("#tabCelRowIndPerc6_1");
                //inicialização de titles e targInps
                /*os titles são construídos somente para alertar se houver inadequação
                de entitulações no HTML (por ordem ou texto)*/
                if (inpWeightRowTitle &&
                    inpWeightRowTitle.textContent?.match(/Peso/g)) {
                    targInpWeight = tabMedAnt.querySelector(`#tabInpRowMedAnt2_${numCons + 1}`);
                    if (!(targInpWeight instanceof HTMLInputElement)) {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpWeight ?? null, "targInpWeight", slicedError ?? "NULL");
                    }
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.matchError("Título da Row para Campos de Peso", inpWeightRowTitle ?? null, inpWeightRowTitle?.textContent || "null", slicedError ?? "NULL");
                }
                if (inpHeightRowTitle &&
                    inpHeightRowTitle.textContent?.match(/Altura/g)) {
                    targInpHeight = tabMedAnt.querySelector(`#tabInpRowMedAnt3_${numCons + 1}`);
                    if (!(targInpHeight instanceof HTMLInputElement)) {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpHeight ?? null, "targInpHeight", slicedError ?? "NULL");
                    }
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.matchError("Título da Row para Campos de Altura", inpHeightRowTitle ?? null, inpHeightRowTitle?.textContent || "null", slicedError ?? "NULL");
                }
                if (inpSumDCutRowTitle &&
                    inpSumDCutRowTitle.textContent?.match(/Soma/g)) {
                    targInpSumDCut = tabDC.querySelector(`#tabInpRowDCut9_${numCons + 1}`);
                    if (!(targInpSumDCut instanceof HTMLInputElement)) {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpSumDCut ?? null, "targInpSumDCut", slicedError ?? "NULL");
                    }
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.matchError("Título da Row para Campos de Soma de Dobras Cutâneas", inpSumDCutRowTitle ?? null, inpSumDCutRowTitle?.textContent || "null", slicedError ?? "NULL");
                }
                if (inpIMCRowTitle && inpIMCRowTitle.textContent?.match(/IMC/g)) {
                    targInpIMC = tabIndPerc.querySelector(`#inpImc${numCons}Cel2_${numCons + 1}`);
                    if (!(targInpIMC instanceof HTMLInputElement)) {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpIMC ?? null, "targInpIMC", slicedError ?? "NULL");
                    }
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.matchError("Título da Row para Campos de IMC", inpIMCRowTitle ?? null, inpIMCRowTitle?.textContent || "null", slicedError ?? "NULL");
                }
                if (inpMLGRowTitle && inpMLGRowTitle.textContent?.match(/MLG/g)) {
                    targInpMLG = tabIndPerc.querySelector(`#inpMlg${numCons}Cel3_${numCons + 1}`);
                    if (!(targInpMLG instanceof HTMLInputElement)) {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpMLG ?? null, "targInpMLG", slicedError ?? "NULL");
                    }
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.matchError("Título da Row para Campos de MLG", inpMLGRowTitle ?? null, inpMLGRowTitle?.textContent || "null", slicedError ?? "NULL");
                }
                if (inpPGCRowTitle && inpPGCRowTitle.textContent?.match(/PGC/g)) {
                    targInpPGC = tabIndPerc.querySelector(`#inpPgc${numCons}Cel4_${numCons + 1}`);
                    if (!(targInpPGC instanceof HTMLInputElement)) {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpPGC ?? null, "targInpPGC", slicedError ?? "NULL");
                    }
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.matchError("Título da Row para Campos de PGC", inpPGCRowTitle ?? null, inpPGCRowTitle?.textContent || "null", slicedError ?? "NULL");
                }
                if (inpTMBRowTitle && inpTMBRowTitle.textContent?.match(/TMB/g)) {
                    targInpTMB = tabIndPerc.querySelector(`#inpTmb${numCons}Cel5_${numCons + 1}`);
                    if (!(targInpTMB instanceof HTMLInputElement)) {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpTMB ?? null, "targInpTMB", slicedError ?? "NULL");
                    }
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.matchError("Título da Row para Campos de TMB", inpTMBRowTitle ?? null, inpTMBRowTitle?.textContent || "null", slicedError ?? "NULL");
                }
                if (inpGETRowTitle && inpGETRowTitle.textContent?.match(/GET/g)) {
                    targInpGET = tabIndPerc.querySelector(`#inpGet${numCons}Cel6_${numCons + 1}`);
                    if (!(targInpGET instanceof HTMLInputElement)) {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpGET ?? null, "targInpGET", slicedError ?? "NULL");
                    }
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.matchError("Título da Row para Campos de GET", inpGETRowTitle ?? null, inpGETRowTitle?.textContent || "null", slicedError ?? "NULL");
                }
                //listener para atualização de inputs target
                numConsElement.addEventListener("change", () => {
                    _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.switchRequiredCols(filteredSwitchElements);
                    numCons = parseInt(numConsElement?.value || "0");
                });
                if (trioReadNumCons instanceof HTMLInputElement &&
                    trioReadNumCons.type === "number") {
                    trioReadNumCons.addEventListener("input", () => {
                        const numTotalTitledColsCons = numTotalColsCons - numTotalTabsCons;
                        if (numConsTextHeadCels.length === numTotalTitledColsCons) {
                            _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.switchNumConsTitles(numConsTextHeadCels, trioReadNumCons, numTotalTitledColsCons, numTotalTabsCons);
                        }
                        else {
                            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(numConsTextHeadCels, "numConsTextHeadCels", slicedError ?? "NULL");
                        }
                    });
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(trioReadNumCons?.id ?? null, "trioReadNumCons", slicedError ?? "NULL");
                }
                if (areAllGenContChecked &&
                    textBodytype instanceof HTMLSelectElement &&
                    protocolo instanceof HTMLSelectElement) {
                    //início da construção de person (após inicialização)
                    /*adição de listeneres de input para capturar mudança nos inputs validados e atribuir às propriedades de person*/
                    //obtenção de .gen inicial com adição de listeners para changes em contexto e atualização de .gen
                    if (typeof person.gen === "string") {
                        genElement?.addEventListener("change", () => {
                            person.gen =
                                _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.fluxGen(genElement, genElement?.value ?? null, genBirthRel, genTrans, genFisAlin) ?? "";
                            console.log("gen value " + person.gen);
                            textBodytype.value = person.gen;
                        });
                        genBirthRel?.addEventListener("change", () => {
                            person.gen =
                                _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.fluxGen(genElement, genElement?.value ?? null, genBirthRel, genTrans, genFisAlin) ?? "";
                            console.log("gen value " + person.gen);
                            textBodytype.value = person.gen;
                        });
                        genTrans?.addEventListener("change", () => {
                            person.gen =
                                _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.fluxGen(genElement, genElement?.value ?? null, genBirthRel, genTrans, genFisAlin) ?? "";
                            console.log("gen value " + person.gen);
                            textBodytype.value = person.gen;
                        });
                        genFisAlin?.addEventListener("change", () => {
                            person.gen =
                                _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.fluxGen(genElement, genElement?.value ?? null, genBirthRel, genTrans, genFisAlin) ?? "";
                            console.log("gen value " + person.gen);
                            textBodytype.value = person.gen;
                        });
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("person.gen", person?.gen ?? null, "string", slicedError ?? "NULL");
                    }
                    if (textBodytype && textBodytype instanceof HTMLSelectElement) {
                        textBodytype.addEventListener("change", () => {
                            _edFisNutModel__WEBPACK_IMPORTED_MODULE_0__.changeTabDCutLayout(protocolo, tabDC);
                            person.gen = textBodytype.value;
                            if (genBirthRel.value === "cis" &&
                                (genElement.value === "masculino" ||
                                    genElement.value === "feminino")) {
                                genElement.value = textBodytype.value;
                            }
                            console.log("gen value " + person.gen);
                            let slicedError = "";
                            switch (textBodytype.value) {
                                case "masculino":
                                    genFisAlin.value = "masculinizado";
                                    break;
                                case "feminino":
                                    genFisAlin.value = "feminilizado";
                                    break;
                                case "neutro":
                                    genFisAlin.value = "neutro";
                                    break;
                                default:
                                    slicedError =
                                        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                            "";
                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.stringError("verificando textBodytype.value", textBodytype?.value ?? "null", slicedError ?? "NULL");
                            }
                        });
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(protocolo ?? null, "protocolo", slicedError ?? "NULL");
                    }
                    //obtenção de .age inicial com listener para input e atualização correspondente
                    if (ageElement instanceof HTMLInputElement &&
                        ageElement.type === "number") {
                        person.age = parseFloat(ageElement?.value) || 0;
                        if (typeof person.age === "number") {
                            ageElement.addEventListener("input", () => {
                                person.age = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.validateEvResultNum(ageElement, person.age);
                                //sem autofill, dá update somente em person.age
                                if (isAutoFillActive) {
                                    arrayPGC = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updatePGC(person, numCons, "cons", consTablesFs);
                                    [PGC, targInpSumDCut, targInpPGC] = arrayPGC;
                                    person.sumDCut = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesDC(person, targInpSumDCut);
                                    arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCons, "cons", consTablesFs);
                                    [
                                        targInpWeight,
                                        targInpHeight,
                                        targInpIMC,
                                        targInpMLG,
                                        targInpTMB,
                                        targInpGET,
                                    ] = arrayTargInps;
                                    arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                    [person.weight, person.height] = arrayWH;
                                    console.log("weight capturado " + person.weight);
                                    console.log("height capturado " + person.height);
                                    indexesArray = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                    [IMC, MLG, TMB, GET] = indexesArray;
                                }
                            });
                        }
                        else {
                            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("person.age", person?.age ?? null, "number", slicedError ?? "NULL");
                        }
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(ageElement ?? null, "ageElement", slicedError ?? "NULL");
                    }
                    //obtenção de .weight inicial com listener para input e atualização correspondente
                    if (targInpWeight instanceof HTMLInputElement &&
                        targInpWeight.type === "number") {
                        person.weight = parseInt(targInpWeight.value || "0", 10);
                        if (typeof person.weight === "number") {
                            if (weightInps.length > 0) {
                                weightInps.forEach((weightInp) => {
                                    weightInp.addEventListener("input", () => {
                                        person.weight = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.validateEvResultNum(weightInp, person.weight);
                                        if (isAutoFillActive) {
                                            numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(weightInp) ?? 0;
                                            if (typeof numCol === "number" && numCol > 0) {
                                                arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCol, "tab", consTablesFs);
                                                [
                                                    targInpWeight,
                                                    targInpHeight,
                                                    targInpIMC,
                                                    targInpMLG,
                                                    targInpTMB,
                                                    targInpGET,
                                                ] = arrayTargInps;
                                                arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                                person.height = arrayWH[1];
                                                console.log("weight capturado " + person.weight);
                                                console.log("height capturado " + person.height);
                                                indexesArray = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                                [IMC, MLG, TMB, GET] = indexesArray;
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                            }
                                        }
                                    });
                                });
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(weightInps, "weightInps", slicedError ?? "NULL");
                            }
                        }
                        else {
                            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("person.weight", person.weight, "number", slicedError ?? "NULL");
                        }
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpWeight ?? null, "targInpWeight", slicedError ?? "NULL");
                    }
                    //obtenção de .height inicial com listener para input e atualização correspondente
                    if (targInpHeight instanceof HTMLInputElement &&
                        targInpHeight.type === "number") {
                        person.height = parseInt(targInpHeight.value || "0", 10);
                        if (typeof person.height === "number") {
                            if (heightInps.length > 0) {
                                heightInps.forEach((heightInp) => {
                                    heightInp.addEventListener("input", () => {
                                        person.height = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.validateEvResultNum(heightInp, person.height);
                                        //sem autofill, dá update somente em person.height
                                        if (isAutoFillActive) {
                                            console.log("weight capturado " + person.weight);
                                            console.log("height capturado " + person.height);
                                            numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(heightInp) ?? 0;
                                            if (typeof numCol === "number" && numCol > 0) {
                                                arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCol, "tab", consTablesFs);
                                                [
                                                    targInpHeight,
                                                    targInpHeight,
                                                    targInpIMC,
                                                    targInpMLG,
                                                    targInpTMB,
                                                    targInpGET,
                                                ] = arrayTargInps;
                                                arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                                person.weight = arrayWH[0];
                                                console.log("weight capturado " + person.weight);
                                                console.log("height capturado " + person.height);
                                                indexesArray = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                                [IMC, MLG, TMB, GET] = indexesArray;
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                            }
                                        }
                                    });
                                });
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(heightInps, "heightInps", slicedError ?? "NULL");
                            }
                        }
                        else {
                            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("person.height", person.height, "number", slicedError ?? "NULL");
                        }
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpHeight ?? null, "targInpHeight", slicedError ?? "NULL");
                    }
                    //obtenção de .sumDCut inicial com listener para input e atualização correspondente
                    if (targInpSumDCut instanceof HTMLInputElement &&
                        targInpSumDCut.type === "number") {
                        person.sumDCut = parseInt(targInpSumDCut.value || "0.01", 10);
                        if (sumDCInps.length > 0) {
                            sumDCInps.forEach((sumDCInp) => {
                                sumDCInp.addEventListener("input", () => {
                                    person.sumDCut = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.validateEvResultNum(sumDCInp, person.sumDCut);
                                    if (isAutoFillActive) {
                                        numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(sumDCInp) ?? 0;
                                        if (typeof numCol === "number" && numCol > 0) {
                                            if (isAutoFillActive) {
                                                arrayPGC = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updatePGC(person, numCol, "tab", consTablesFs);
                                                [PGC, targInpSumDCut, targInpPGC] = arrayPGC;
                                            }
                                        }
                                        else {
                                            const slicedError = new Error().stack
                                                ?.split("\n")[1]
                                                ?.trim()
                                                ?.slice(-7, -1) || "";
                                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                        }
                                    }
                                });
                            });
                        }
                        else {
                            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(sumDCInps ?? null, "sumDCInps", slicedError ?? "NULL");
                        }
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpSumDCut ?? null, "targInpSumDCut", slicedError ?? "NULL");
                    }
                    //classifica person
                    if (person && Object.keys(person).length === 6) {
                        person = _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.generatePersonInstance(person);
                        console.log(`PERSON INICIAL INSTANCIADA ${JSON.stringify(person)} + instance ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"}`);
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.objectError("a geração de instância", person ?? null, "person", "6", slicedError ?? "NULL");
                    }
                    //adiciona listeneres nos botões e inputs de índices tabelados se person for classificada
                    if ((person instanceof _global_scripts_src_classes__WEBPACK_IMPORTED_MODULE_5__.Man ||
                        person instanceof _global_scripts_src_classes__WEBPACK_IMPORTED_MODULE_5__.Woman ||
                        person instanceof _global_scripts_src_classes__WEBPACK_IMPORTED_MODULE_5__.Neutro) &&
                        gordCorpLvl instanceof HTMLSelectElement) {
                        isPersonClassified = true;
                        if (autoFillBtn instanceof HTMLButtonElement) {
                            autoFillBtn.addEventListener("click", () => {
                                isAutoFillActive = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.switchAutoFill(autoFillBtn, locksTabInd);
                            });
                        }
                        else {
                            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(autoFillBtn ?? null, "autoFillBtn", slicedError ?? "NULL");
                        }
                        //obtenção de .atvLvl inicial, com adição de listeners para mudança de containers no contexto
                        if (atvLvlElement instanceof HTMLSelectElement &&
                            formTMBTypeElement instanceof HTMLSelectElement &&
                            spanFactorAtleta instanceof HTMLSpanElement &&
                            lockGordCorpLvl instanceof HTMLSpanElement) {
                            person.atvLvl = atvLvlElement?.value;
                            if ((person.atvLvl === "sedentario" ||
                                person.atvLvl === "leve" ||
                                person.atvLvl === "moderado" ||
                                person.atvLvl === "intenso" ||
                                person.atvLvl === "muitoIntenso") &&
                                atvLvlElement instanceof HTMLSelectElement &&
                                nafType instanceof HTMLSelectElement) {
                                factorAtvLvl = 1.4;
                                //blocos para adição de listeners com fluxo de chamada similar
                                atvLvlElement.addEventListener("change", () => {
                                    //ajusta par atvLevelElement e nafType + dá update em .atLvl
                                    person.atvLvl = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateAtvLvl(atvLvlElement, person.atvLvl, nafType);
                                    //retorna factorAtvLvl(número para ser utilizado, com base no .atvLvl)
                                    const returnedFactorAtvLvl = person.checkAtvLvl(person);
                                    if (typeof returnedFactorAtvLvl === "number") {
                                        factorAtvLvl = returnedFactorAtvLvl || 1.4;
                                    }
                                    else {
                                        const slicedError = new Error().stack
                                            ?.split("\n")[1]
                                            ?.trim()
                                            ?.slice(-7, -1) || "";
                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("returnedFactorAtvLvl", returnedFactorAtvLvl ?? null, "number", slicedError ?? "NULL");
                                    }
                                    //ajusta elementos <select> com base em combinações
                                    _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.fluxFormIMC(IMC ?? 0, formTMBTypeElement, gordCorpLvl);
                                    _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchTMBElements(atvLvlElement, formTMBTypeElement, spanFactorAtleta, gordCorpLvl, lockGordCorpLvl, IMC ?? 0);
                                });
                                nafType.addEventListener("change", () => {
                                    person.atvLvl = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateAtvLvl(nafType, person.atvLvl, atvLvlElement);
                                    const returnedFactorAtvLvl = person.checkAtvLvl(person);
                                    if (typeof returnedFactorAtvLvl === "number") {
                                        factorAtvLvl = returnedFactorAtvLvl || 1.4;
                                    }
                                    else {
                                        const slicedError = new Error().stack
                                            ?.split("\n")[1]
                                            ?.trim()
                                            ?.slice(-7, -1) || "";
                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("returnedFactorAtvLvl", returnedFactorAtvLvl ?? null, "number", slicedError ?? "NULL");
                                    }
                                    _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchTMBElements(nafType, formTMBTypeElement, spanFactorAtleta, gordCorpLvl, lockGordCorpLvl, IMC ?? 0);
                                });
                                if (formTMBTypeElement instanceof HTMLSelectElement) {
                                    formTMBTypeElement.addEventListener("change", () => {
                                        person.atvLvl = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateAtvLvl(atvLvlElement, person.atvLvl, nafType);
                                        const returnedFactorAtvLvl = person.checkAtvLvl(person);
                                        if (typeof returnedFactorAtvLvl === "number") {
                                            factorAtvLvl = returnedFactorAtvLvl || 1.4;
                                        }
                                        else {
                                            const slicedError = new Error().stack
                                                ?.split("\n")[1]
                                                ?.trim()
                                                ?.slice(-7, -1) || "";
                                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("returnedFactorAtvLvl", returnedFactorAtvLvl || undefined, "number", slicedError ?? "NULL");
                                        }
                                        _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchTMBElements(atvLvlElement, formTMBTypeElement, spanFactorAtleta, gordCorpLvl, lockGordCorpLvl, IMC ?? 0);
                                    });
                                }
                                else {
                                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                        "";
                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(formTMBTypeElement ?? null, "formTMBTypeElement", slicedError ?? "NULL");
                                }
                                if (gordCorpLvl instanceof HTMLSelectElement) {
                                    gordCorpLvl.addEventListener("change", () => {
                                        person.atvLvl = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateAtvLvl(atvLvlElement, person.atvLvl, nafType);
                                        const returnedFactorAtvLvl = person.checkAtvLvl(person);
                                        if (typeof returnedFactorAtvLvl === "number") {
                                            factorAtvLvl = returnedFactorAtvLvl || 1.4;
                                        }
                                        else {
                                            const slicedError = new Error().stack
                                                ?.split("\n")[1]
                                                ?.trim()
                                                ?.slice(-7, -1) || "";
                                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("returnedFactorAtvLvl", returnedFactorAtvLvl ?? null, "number", slicedError ?? "NULL");
                                        }
                                        _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchTMBElements(atvLvlElement, formTMBTypeElement, spanFactorAtleta, gordCorpLvl, lockGordCorpLvl, IMC ?? 0);
                                    });
                                }
                                else {
                                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                        "";
                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(gordCorpLvl ?? null, "gordCorpLvl", slicedError ?? "NULL");
                                }
                                if (selFactorAtleta instanceof HTMLSelectElement) {
                                    selFactorAtleta.addEventListener("change", () => {
                                        factorAtleta = selFactorAtleta.value;
                                        //sem autofill, dá update somente em factorAtleta
                                        if (isAutoFillActive) {
                                            arrayPGC = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updatePGC(person, numCons, "cons", consTablesFs);
                                            [PGC, targInpSumDCut, targInpPGC] = arrayPGC;
                                            person.sumDCut = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesDC(person, targInpSumDCut);
                                            arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCons, "cons", consTablesFs);
                                            [
                                                targInpWeight,
                                                targInpHeight,
                                                targInpIMC,
                                                targInpMLG,
                                                targInpTMB,
                                                targInpGET,
                                            ] = arrayTargInps;
                                            arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                            [person.weight, person.height] = arrayWH;
                                            console.log("weight capturado " + person.weight);
                                            console.log("height capturado " + person.height);
                                            indexesArray = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                            [IMC, MLG, TMB, GET] = indexesArray;
                                        }
                                    });
                                }
                                else {
                                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                        "";
                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(selFactorAtleta ?? null, "selFactorAtleta", slicedError ?? "NULL");
                                }
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.multipleElementsNotFound(slicedError ?? "NULL", `value de Nível de Atividade Física ou Elementos relacionados. Valor obtido: ${person.atvLvl ?? "null"};
                    Valore aceitos: sedentario || leve || moderado || intenso || muitoIntenso.`, atvLvlElement ?? null, nafType ?? null);
                            }
                        }
                        else {
                            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.multipleElementsNotFound(slicedError ?? "NULL", `Erro validando Elemento de Nível de Atividade Física e/ou Relacionados`, atvLvlElement ?? null, formTMBTypeElement ?? null, spanFactorAtleta ?? null, lockGordCorpLvl ?? null);
                        }
                        //atualiza layout de tabela de acordo com protocolo e gênero + soma de Dobras Cutâneas
                        if (protocolo && protocolo instanceof HTMLSelectElement) {
                            protocolo.addEventListener("change", () => {
                                protocolo.value = _edFisNutModel__WEBPACK_IMPORTED_MODULE_0__.changeTabDCutLayout(protocolo, tabDC);
                            });
                            //adiciona listeners para os botões de soma das Dobras Cutâneas
                            if (sumDCBtns.length > 0) {
                                sumDCBtns.forEach((sumDCBtn) => {
                                    sumDCBtn?.addEventListener("click", () => {
                                        if (rowsDCArray.length > 0 &&
                                            sumDCBtn instanceof HTMLButtonElement) {
                                            person.sumDCut = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.createArraysRels(sumDCBtn?.id, rowsDCArray, protocolo.value);
                                            if (!(typeof person.sumDCut === "number") ||
                                                Number.isNaN(person.sumDCut) ||
                                                person.sumDCut <= 0) {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("person.sumDCut", person.sumDCut, "number", slicedError ?? "NULL");
                                            }
                                            if (isAutoFillActive) {
                                                if (isPersonClassified &&
                                                    targInpPGC instanceof HTMLInputElement &&
                                                    protocolo.value === "pollock3" &&
                                                    person.age >= 0) {
                                                    numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(sumDCBtn) ?? 0;
                                                    if (typeof numCol === "number" && numCol > 0) {
                                                        arrayPGC = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updatePGC(person, numCol, "tab", consTablesFs);
                                                    }
                                                    else {
                                                        const slicedError = new Error().stack
                                                            ?.split("\n")[1]
                                                            ?.trim()
                                                            ?.slice(-7, -1) || "";
                                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                                    }
                                                }
                                                else {
                                                    console.warn(`Erro atualizando PGC através de Somatório de DCs.
                          person.age obtido: ${person?.age || 0}
                          Protocolo usado: ${protocolo?.value || "null"} (Apenas pollock3 aceito, por enquanto);
                          isPersonClassified: ${isPersonClassified ?? false};
                          Instância de Input Target para PGC: ${Object.prototype.toString
                                                        .call(targInpPGC)
                                                        .slice(8, -1) ?? "null"}`);
                                                }
                                            }
                                        }
                                        else {
                                            const slicedError = new Error().stack
                                                ?.split("\n")[1]
                                                ?.trim()
                                                ?.slice(-7, -1) || "";
                                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementWithArrayError("rows de Dobras Cutâneas e/ou Botão de Soma de Dobras Cutâneas", rowsDCArray ?? null, "rowsDCArray", sumDCBtn ?? null, "sumDCBtn", slicedError ?? "NULL");
                                        }
                                    });
                                });
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(sumDCBtns ?? null, "sumDCBtns", slicedError ?? "NULL");
                            }
                        }
                        else {
                            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(protocolo ?? null, "protocolo", slicedError ?? "NULL");
                        }
                        //adições de listeners para clique nos botões dos índices
                        if (targInpIMC instanceof HTMLInputElement &&
                            targInpIMC.type === "number" &&
                            targInpMLG instanceof HTMLInputElement &&
                            targInpMLG.type === "number" &&
                            targInpTMB instanceof HTMLInputElement &&
                            targInpTMB.type === "number" &&
                            targInpGET instanceof HTMLInputElement &&
                            targInpGET.type === "number" &&
                            formTMBTypeElement instanceof HTMLSelectElement) {
                            IMC = parseFloat(parseFloat(targInpIMC?.value || "0").toFixed(4));
                            MLG = parseFloat(parseFloat(targInpMLG?.value || "0").toFixed(4));
                            TMB = parseFloat(parseFloat(targInpTMB?.value || "0").toFixed(4));
                            GET = parseFloat(parseFloat(targInpGET?.value || "0").toFixed(4));
                            //botões são independentes de condição de autofill
                            if (IMCBtns.length > 0) {
                                IMCBtns.forEach((imcbtn) => {
                                    if (imcbtn instanceof HTMLButtonElement) {
                                        imcbtn.addEventListener("click", () => {
                                            numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(imcbtn) ?? 0;
                                            if (typeof numCol === "number" && numCol > 0) {
                                                arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCol, "tab", consTablesFs);
                                                [
                                                    targInpWeight,
                                                    targInpHeight,
                                                    targInpIMC,
                                                    targInpMLG,
                                                    targInpTMB,
                                                    targInpGET,
                                                ] = arrayTargInps;
                                                arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                                [person.weight, person.height] = arrayWH;
                                                console.log("weight capturado " + person.weight);
                                                console.log("height capturado " + person.height);
                                                indexesArray = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                                [IMC, MLG, TMB, GET] = indexesArray;
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                            }
                                        });
                                    }
                                    else {
                                        const slicedError = new Error().stack
                                            ?.split("\n")[1]
                                            ?.trim()
                                            ?.slice(-7, -1) || "";
                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(imcbtn ?? null, "imcbtn", slicedError ?? "NULL");
                                    }
                                });
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(IMCBtns ?? null, "IMCBtns", slicedError ?? "NULL");
                            }
                            if (MLGBtns.length > 0) {
                                MLGBtns.forEach((mlgbtn) => {
                                    if (mlgbtn instanceof HTMLButtonElement) {
                                        mlgbtn.addEventListener("click", () => {
                                            numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(mlgbtn) ?? 0;
                                            if (typeof numCol === "number" && numCol > 0) {
                                                arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCol, "tab", consTablesFs);
                                                [
                                                    targInpWeight,
                                                    targInpHeight,
                                                    targInpIMC,
                                                    targInpMLG,
                                                    targInpTMB,
                                                    targInpGET,
                                                ] = arrayTargInps;
                                                arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                                [person.weight, person.height] = arrayWH;
                                                console.log("weight capturado " + person.weight);
                                                console.log("height capturado " + person.height);
                                                indexesArray = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                                [IMC, MLG, TMB, GET] = indexesArray;
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                            }
                                        });
                                    }
                                    else {
                                        const slicedError = new Error().stack
                                            ?.split("\n")[1]
                                            ?.trim()
                                            ?.slice(-7, -1) || "";
                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(mlgbtn ?? null, "mlgbtn", slicedError ?? "NULL");
                                    }
                                });
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(MLGBtns ?? null, "MLGBtns", slicedError ?? "NULL");
                            }
                            if (PGCBtns.length > 0) {
                                PGCBtns.forEach((pgcbtn) => {
                                    if (pgcbtn instanceof HTMLButtonElement) {
                                        pgcbtn.addEventListener("click", () => {
                                            numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(pgcbtn) ?? 0;
                                            if (typeof numCol === "number" && numCol > 0) {
                                                arrayPGC = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updatePGC(person, numCol, "tab", consTablesFs);
                                                [PGC, targInpSumDCut, targInpPGC] = arrayPGC;
                                                person.sumDCut =
                                                    _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesDC(person, targInpSumDCut);
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                            }
                                        });
                                    }
                                    else {
                                        const slicedError = new Error().stack
                                            ?.split("\n")[1]
                                            ?.trim()
                                            ?.slice(-7, -1) || "";
                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(pgcbtn ?? null, "pgcbtn", slicedError ?? "NULL");
                                    }
                                });
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(PGCBtns ?? null, "PGCBtns", slicedError ?? "NULL");
                            }
                            if (TMBBtns.length > 0) {
                                TMBBtns.forEach((tmbbtn) => {
                                    tmbbtn.addEventListener("click", () => {
                                        if (tmbbtn instanceof HTMLButtonElement) {
                                            console.log("ID " + tmbbtn.id);
                                            numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(tmbbtn) ?? 0;
                                            if (typeof numCol === "number" && numCol > 0) {
                                                arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCol, "tab", consTablesFs);
                                                [
                                                    targInpWeight,
                                                    targInpHeight,
                                                    targInpIMC,
                                                    targInpMLG,
                                                    targInpTMB,
                                                    targInpGET,
                                                ] = arrayTargInps;
                                                arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                                [person.weight, person.height] = arrayWH;
                                                console.log("weight capturado " + person.weight);
                                                console.log("height capturado " + person.height);
                                                indexesArray = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                                [IMC, MLG, TMB, GET] = indexesArray;
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                            }
                                        }
                                        else {
                                            const slicedError = new Error().stack
                                                ?.split("\n")[1]
                                                ?.trim()
                                                ?.slice(-7, -1) || "";
                                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(tmbbtn ?? null, "tmbbtn", slicedError ?? "NULL");
                                        }
                                    });
                                });
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(TMBBtns ?? null, "TMBBtns", slicedError ?? "NULL");
                            }
                            if (GETBtns.length > 0) {
                                GETBtns.forEach((getbtn) => {
                                    getbtn.addEventListener("click", () => {
                                        if (getbtn instanceof HTMLButtonElement) {
                                            numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(getbtn) ?? 0;
                                            if (typeof numCol === "number" && numCol > 0) {
                                                arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCol, "tab", consTablesFs);
                                                [
                                                    targInpWeight,
                                                    targInpHeight,
                                                    targInpIMC,
                                                    targInpMLG,
                                                    targInpTMB,
                                                    targInpGET,
                                                ] = arrayTargInps;
                                                arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                                [person.weight, person.height] = arrayWH;
                                                console.log("weight capturado " + person.weight);
                                                console.log("height capturado " + person.height);
                                                indexesArray = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                                [IMC, MLG, TMB, GET] = indexesArray;
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                            }
                                        }
                                        else {
                                            const slicedError = new Error().stack
                                                ?.split("\n")[1]
                                                ?.trim()
                                                ?.slice(-7, -1) || "";
                                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(getbtn ?? null, "getbtn", slicedError ?? "NULL");
                                        }
                                    });
                                });
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(GETBtns ?? null, "GETBtns", slicedError ?? "NULL");
                            }
                            //adições de listeners para inputs dos índices
                            if (typeof IMC === "number") {
                                if (IMCInps.length > 0) {
                                    IMCInps.forEach((IMCInp) => {
                                        IMCInp.addEventListener("input", () => {
                                            if (IMCInp instanceof HTMLInputElement) {
                                                const returnedIMC = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.updateSimpleProperty(targInpIMC) ?? 0;
                                                if (typeof returnedIMC === "number") {
                                                    IMC = parseFloat(returnedIMC.toFixed(4));
                                                }
                                                else {
                                                    const slicedError = new Error().stack
                                                        ?.split("\n")[1]
                                                        ?.trim()
                                                        ?.slice(-7, -1) || "";
                                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("update de IMC", returnedIMC ?? null, "number", slicedError ?? "NULL");
                                                }
                                                //sem autofill, dá update somente em IMC
                                                if (isAutoFillActive) {
                                                    numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(IMCInp) ?? 0;
                                                    if (typeof numCol === "number" && numCol > 0) {
                                                        arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCol, "tab", consTablesFs);
                                                        [
                                                            targInpWeight,
                                                            targInpHeight,
                                                            targInpIMC,
                                                            targInpMLG,
                                                            targInpTMB,
                                                            targInpGET,
                                                        ] = arrayTargInps;
                                                        arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                                        [person.weight, person.height] = arrayWH;
                                                        console.log("weight capturado " + person.weight);
                                                        console.log("height capturado " + person.height);
                                                        indexesArray =
                                                            _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                                        [IMC, MLG, TMB, GET] = indexesArray;
                                                    }
                                                    else {
                                                        const slicedError = new Error().stack
                                                            ?.split("\n")[1]
                                                            ?.trim()
                                                            ?.slice(-7, -1) || "";
                                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                                    }
                                                }
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(IMCInp?.id ?? null, "IMCInp", slicedError ?? "NULL");
                                            }
                                        });
                                    });
                                }
                                else {
                                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                        "";
                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(IMCInps ?? null, "IMCInps", slicedError ?? "NULL");
                                }
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("IMC", IMC ?? null, "number", slicedError ?? "NULL");
                            }
                            if (typeof MLG === "number") {
                                if (MLGInps.length > 0) {
                                    MLGInps.forEach((MLGInp) => {
                                        MLGInp.addEventListener("input", () => {
                                            const returnedMLG = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.updateSimpleProperty(targInpMLG) ?? 0;
                                            if (typeof returnedMLG === "number") {
                                                MLG = parseFloat(returnedMLG.toFixed(4));
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("update de MLG", returnedMLG ?? null, "number", slicedError ?? "NULL");
                                            }
                                            //sem autofill, dá update somente em MLG
                                            if (isAutoFillActive) {
                                                numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(MLGInp) ?? 0;
                                                if (typeof numCol === "number" && numCol > 0) {
                                                    arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCol, "tab", consTablesFs);
                                                    [
                                                        targInpWeight,
                                                        targInpHeight,
                                                        targInpIMC,
                                                        targInpMLG,
                                                        targInpTMB,
                                                        targInpGET,
                                                    ] = arrayTargInps;
                                                    arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                                    [person.weight, person.height] = arrayWH;
                                                    console.log("weight capturado " + person.weight);
                                                    console.log("height capturado " + person.height);
                                                    indexesArray = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                                    [IMC, MLG, TMB, GET] = indexesArray;
                                                }
                                                else {
                                                    const slicedError = new Error().stack
                                                        ?.split("\n")[1]
                                                        ?.trim()
                                                        ?.slice(-7, -1) || "";
                                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                                }
                                            }
                                        });
                                    });
                                }
                                else {
                                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                        "";
                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(MLGInps ?? null, "MLGInps", slicedError ?? "NULL");
                                }
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("MLG", MLG ?? null, "number", slicedError ?? "NULL");
                            }
                            if (targInpPGC instanceof HTMLInputElement &&
                                targInpPGC.type === "number") {
                                PGC = parseFloat(parseFloat(targInpPGC?.value || "0").toFixed(4));
                                if (typeof PGC === "number") {
                                    if (PGCInps.length > 0) {
                                        PGCInps.forEach((PGCInp) => {
                                            if (PGCInp instanceof HTMLInputElement) {
                                                PGCInp.addEventListener("input", () => {
                                                    const returnedPGC = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.updateSimpleProperty(PGCInp) ?? 0;
                                                    if (typeof returnedPGC === "number") {
                                                        PGC = parseFloat(returnedPGC.toFixed(4));
                                                    }
                                                    else {
                                                        const slicedError = new Error().stack
                                                            ?.split("\n")[1]
                                                            ?.trim()
                                                            ?.slice(-7, -1) || "";
                                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("update de PGC", returnedPGC ?? null, "number", slicedError ?? "NULL");
                                                    }
                                                });
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(PGCInp?.id ?? null, "PGCInp", slicedError ?? "NULL");
                                            }
                                        });
                                    }
                                    else {
                                        const slicedError = new Error().stack
                                            ?.split("\n")[1]
                                            ?.trim()
                                            ?.slice(-7, -1) || "";
                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(PGCInps ?? null, "PGCInps", slicedError ?? "NULL");
                                    }
                                }
                                else {
                                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                        "";
                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("PGC", PGC ?? null, "number", slicedError ?? "NULL");
                                }
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(targInpPGC ?? null, "targInpPGC", slicedError ?? "NULL");
                            }
                            if (typeof TMB === "number") {
                                if (TMBInps.length > 0) {
                                    TMBInps.forEach((TMBInp) => {
                                        TMBInp.addEventListener("input", () => {
                                            if (TMBInp instanceof HTMLInputElement) {
                                                const returnedTMB = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.updateSimpleProperty(targInpTMB) ?? 0;
                                                if (typeof returnedTMB === "number") {
                                                    TMB = parseFloat(returnedTMB.toFixed(4));
                                                }
                                                else {
                                                    const slicedError = new Error().stack
                                                        ?.split("\n")[1]
                                                        ?.trim()
                                                        ?.slice(-7, -1) || "";
                                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("update de TMB", returnedTMB ?? null, "number", slicedError ?? "NULL");
                                                }
                                                //sem autofill, dá update somente em TMB
                                                if (isAutoFillActive) {
                                                    numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(TMBInp) ?? 0;
                                                    if (typeof numCol === "number" && numCol > 0) {
                                                        arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCol, "tab", consTablesFs);
                                                        [
                                                            targInpWeight,
                                                            targInpHeight,
                                                            targInpIMC,
                                                            targInpMLG,
                                                            targInpTMB,
                                                            targInpGET,
                                                        ] = arrayTargInps;
                                                        arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                                        [person.weight, person.height] = arrayWH;
                                                        console.log("weight capturado " + person.weight);
                                                        console.log("height capturado " + person.height);
                                                        indexesArray =
                                                            _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                                        [IMC, MLG, TMB, GET] = indexesArray;
                                                    }
                                                    else {
                                                        const slicedError = new Error().stack
                                                            ?.split("\n")[1]
                                                            ?.trim()
                                                            ?.slice(-7, -1) || "";
                                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                                    }
                                                }
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(TMBInp?.id ?? null, "TMBInp", slicedError ?? "NULL");
                                            }
                                        });
                                    });
                                }
                                else {
                                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                        "";
                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(TMBInps ?? null, "TMBInps", slicedError ?? "NULL");
                                }
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("TMB", TMB ?? null, "number", slicedError ?? "NULL");
                            }
                            if (typeof GET === "number") {
                                if (GETInps.length > 0) {
                                    GETInps.forEach((GETInp) => {
                                        GETInp.addEventListener("input", () => {
                                            if (GETInp instanceof HTMLInputElement) {
                                                const returnedGET = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.updateSimpleProperty(targInpGET) ?? 0;
                                                if (typeof returnedGET === "number") {
                                                    GET = parseFloat(returnedGET.toFixed(4));
                                                }
                                                else {
                                                    const slicedError = new Error().stack
                                                        ?.split("\n")[1]
                                                        ?.trim()
                                                        ?.slice(-7, -1) || "";
                                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("update de GET", returnedGET ?? null, "number", slicedError ?? "NULL");
                                                }
                                                //sem autofill, dá update somente em GET
                                                if (isAutoFillActive) {
                                                    numCol = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.getNumCol(GETInp) ?? 0;
                                                    if (typeof numCol === "number" && numCol > 0) {
                                                        arrayTargInps = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.defineTargInps(numCol, "tab", consTablesFs);
                                                        [
                                                            targInpWeight,
                                                            targInpHeight,
                                                            targInpIMC,
                                                            targInpMLG,
                                                            targInpTMB,
                                                            targInpGET,
                                                        ] = arrayTargInps;
                                                        arrayWH = _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.matchPersonPropertiesWH(person, targInpWeight, targInpHeight);
                                                        [person.weight, person.height] = arrayWH;
                                                        console.log("weight capturado " + person.weight);
                                                        console.log("height capturado " + person.height);
                                                        indexesArray =
                                                            _edFisNutHandler__WEBPACK_IMPORTED_MODULE_1__.updateIndexesContexts(person, gordCorpLvl, targInpIMC, targInpMLG, targInpTMB, targInpGET, formTMBTypeElement, factorAtvLvl, factorAtleta);
                                                        [IMC, MLG, TMB, GET] = indexesArray;
                                                    }
                                                    else {
                                                        const slicedError = new Error().stack
                                                            ?.split("\n")[1]
                                                            ?.trim()
                                                            ?.slice(-7, -1) || "";
                                                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("obtendo Número de Coluna", numCol ?? null, "number (natural)", slicedError ?? "NULL");
                                                    }
                                                }
                                            }
                                            else {
                                                const slicedError = new Error().stack
                                                    ?.split("\n")[1]
                                                    ?.trim()
                                                    ?.slice(-7, -1) || "";
                                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(GETInp?.id ?? null, "GETInp", slicedError ?? "NULL");
                                            }
                                        });
                                    });
                                }
                                else {
                                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                        "";
                                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(GETInps ?? null, "GETInps", slicedError);
                                }
                            }
                            else {
                                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                                    "";
                                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.typeError("GET", GET ?? null, "number", slicedError ?? "NULL");
                            }
                        }
                        else {
                            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.multipleElementsNotFound(slicedError ?? "NULL", "Target Inputs e/ou Select para Fórmula de TMB", targInpIMC ?? null, targInpMLG ?? null, targInpTMB ?? null, targInpGET ?? null, formTMBTypeElement ?? null);
                        }
                    }
                    else {
                        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementWithObjectError("validando person", person ?? null, gordCorpLvl ?? null, gordCorpLvl?.id ?? null, slicedError ?? "NULL");
                    }
                }
                else {
                    console.warn(`Todos os campos de identidade de gênero validados: ${areAllGenContChecked.toString() ?? "false"}`);
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.multipleElementsNotFound(slicedError ?? "NULL", "Campos de Gênero e/ou Tipo Corporal e/ou Protocolo", protocolo ?? null, genElement ?? null, genTrans ?? null, genFisAlin ?? null, textBodytype ?? null);
                }
            }
        }
        else {
            console.warn(`Col Groups similares: ${areColGroupsSimilar}`);
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(numConsElement ?? null, "numConsElement", slicedError ?? "NULL");
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(gordCorpLvl ?? null, "numConsElement", slicedError ?? "NULL");
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.multipleElementsNotFound(slicedError ?? "NULL", "Tabelas de Medidas Antropométricas", tabSVi ?? null, tabMedAnt ?? null, tabIndPerc ?? null);
    }
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.multipleElementsNotFound(slicedError ?? "NULL", "Tabelas de Medidas", tabMedAnt ?? null, tabIndPerc ?? null);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxvQ0FBb0MsaUZBQWdDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsdUVBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNGQUFxQztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvRkFBbUM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsdUZBQXVGLDJDQUEyQztBQUNsSTtBQUNBLG9CQUFvQixzRkFBcUM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Qsb0JBQW9CO0FBQ3RFO0FBQ0EsWUFBWSw2RUFBNEI7QUFDeEMsWUFBWSw2RUFBNEI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNGQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksc0ZBQXFDO0FBQ3pDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWR1Y2FjYW9maXNpY2EtbnV0cmljYW8tcHJvc2F1ZGUvLi9zcmMvZWRGaXNOdXRIYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9lZHVjYWNhb2Zpc2ljYS1udXRyaWNhby1wcm9zYXVkZS8uL3NyYy9lZEZpc051dE1vZGVsLnRzeCIsIndlYnBhY2s6Ly9lZHVjYWNhb2Zpc2ljYS1udXRyaWNhby1wcm9zYXVkZS8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvY2xhc3Nlcy50c3giLCJ3ZWJwYWNrOi8vZWR1Y2FjYW9maXNpY2EtbnV0cmljYW8tcHJvc2F1ZGUvLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2Vycm9ySGFuZGxlci50c3giLCJ3ZWJwYWNrOi8vZWR1Y2FjYW9maXNpY2EtbnV0cmljYW8tcHJvc2F1ZGUvLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2dIYW5kbGVycy50c3giLCJ3ZWJwYWNrOi8vZWR1Y2FjYW9maXNpY2EtbnV0cmljYW8tcHJvc2F1ZGUvLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2dNb2RlbC50c3giLCJ3ZWJwYWNrOi8vZWR1Y2FjYW9maXNpY2EtbnV0cmljYW8tcHJvc2F1ZGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWR1Y2FjYW9maXNpY2EtbnV0cmljYW8tcHJvc2F1ZGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VkdWNhY2FvZmlzaWNhLW51dHJpY2FvLXByb3NhdWRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZWR1Y2FjYW9maXNpY2EtbnV0cmljYW8tcHJvc2F1ZGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lZHVjYWNhb2Zpc2ljYS1udXRyaWNhby1wcm9zYXVkZS8uL3NyYy9lZEZpc051dENvbnRyb2xsZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vbmVzc2UgZmlsZSBlc3TDo28gcHJlc2VudGVzIHByaW5jaXBhbG1lbnRlIGFzIGZ1bsOnw7VlcyBkZSBtYW5pcHVsYcOnw6NvIGRpbsOibWljYSBkZSB0ZXh0byBlIGxheW91dFxyXG5pbXBvcnQgKiBhcyBFZEZpc051dE1vZGVsIGZyb20gXCIuL2VkRmlzTnV0TW9kZWxcIjtcclxuaW1wb3J0ICogYXMgR2xvYmFsTW9kZWwgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9nTW9kZWxcIjtcclxuaW1wb3J0ICogYXMgR2xvYmFsSGFuZGxlciBmcm9tIFwiLi4vLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2dIYW5kbGVyc1wiO1xyXG5pbXBvcnQgKiBhcyBFcnJvckhhbmRsZXIgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9lcnJvckhhbmRsZXJcIjtcclxubGV0IHJvd0NvdW50QXRpdkZpc1JvdCA9IDM7XHJcbmxldCByb3dDb3VudEF0aXZGaXNQcm9wID0gMztcclxubGV0IHJvd0NvdW50Q29tb3JiID0gMztcclxudmFyIEVudW1UYXJnSW5wVHlwZXM7XHJcbihmdW5jdGlvbiAoRW51bVRhcmdJbnBUeXBlcykge1xyXG4gICAgRW51bVRhcmdJbnBUeXBlc1tFbnVtVGFyZ0lucFR5cGVzW1wid2VpZ2h0XCJdID0gMF0gPSBcIndlaWdodFwiO1xyXG4gICAgRW51bVRhcmdJbnBUeXBlc1tFbnVtVGFyZ0lucFR5cGVzW1wiaGVpZ2h0XCJdID0gMV0gPSBcImhlaWdodFwiO1xyXG4gICAgRW51bVRhcmdJbnBUeXBlc1tFbnVtVGFyZ0lucFR5cGVzW1wiSU1DXCJdID0gMl0gPSBcIklNQ1wiO1xyXG4gICAgRW51bVRhcmdJbnBUeXBlc1tFbnVtVGFyZ0lucFR5cGVzW1wiTUxHXCJdID0gM10gPSBcIk1MR1wiO1xyXG4gICAgRW51bVRhcmdJbnBUeXBlc1tFbnVtVGFyZ0lucFR5cGVzW1wiVE1CXCJdID0gNF0gPSBcIlRNQlwiO1xyXG4gICAgRW51bVRhcmdJbnBUeXBlc1tFbnVtVGFyZ0lucFR5cGVzW1wiR0VUXCJdID0gNV0gPSBcIkdFVFwiO1xyXG59KShFbnVtVGFyZ0lucFR5cGVzIHx8IChFbnVtVGFyZ0lucFR5cGVzID0ge30pKTtcclxuY29uc3QgZW51bVRhcmdJbnBUeXBlcyA9IEVudW1UYXJnSW5wVHlwZXM7XHJcbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hBdXRvRmlsbChhdXRvRmlsbEJ0biwgbG9ja3NUYWJJbmQpIHtcclxuICAgIGxldCBhdXRvRmlsbEFjdGl2YXRpb24gPSB0cnVlO1xyXG4gICAgaWYgKGF1dG9GaWxsQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoYXV0b0ZpbGxCdG4uaW5uZXJUZXh0Lm1hdGNoKC9EZXNhdGl2YXIgQ8OhbGN1bG8gQXV0b23DoXRpY28vKSkge1xyXG4gICAgICAgICAgICBhdXRvRmlsbEFjdGl2YXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgYXV0b0ZpbGxCdG4udGV4dENvbnRlbnQgPSBcIkF0aXZhciBDw6FsY3VsbyBBdXRvbcOhdGljb1wiO1xyXG4gICAgICAgICAgICBzd2l0Y2hMb2NrSW5wdXRzKGxvY2tzVGFiSW5kLCBhdXRvRmlsbEFjdGl2YXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhdXRvRmlsbEJ0bi5pbm5lclRleHQubWF0Y2goL0F0aXZhciBDw6FsY3VsbyBBdXRvbcOhdGljby8pKSB7XHJcbiAgICAgICAgICAgIGF1dG9GaWxsQWN0aXZhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGF1dG9GaWxsQnRuLnRleHRDb250ZW50ID0gXCJEZXNhdGl2YXIgQ8OhbGN1bG8gQXV0b23DoXRpY29cIjtcclxuICAgICAgICAgICAgc3dpdGNoTG9ja0lucHV0cyhsb2Nrc1RhYkluZCwgYXV0b0ZpbGxBY3RpdmF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChhdXRvRmlsbEJ0biA/PyBudWxsLCBcImF1dG9GaWxsQnRuXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhdXRvRmlsbEFjdGl2YXRpb247XHJcbn1cclxuZnVuY3Rpb24gc3dpdGNoTG9ja0lucHV0cyhsb2Nrc1RhYkluZCwgYXV0b0ZpbGxBY3RpdmF0aW9uKSB7XHJcbiAgICBpZiAobG9ja3NUYWJJbmQubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgIGxvY2tzVGFiSW5kLmV2ZXJ5KChsb2NrKSA9PiBsb2NrIGluc3RhbmNlb2YgSFRNTFNwYW5FbGVtZW50KSkge1xyXG4gICAgICAgIGlmIChhdXRvRmlsbEFjdGl2YXRpb24pIHtcclxuICAgICAgICAgICAgbG9ja3NUYWJJbmQuZm9yRWFjaCgobG9jaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2libGluZ0lucHV0ID0gR2xvYmFsSGFuZGxlci5zZWFyY2hQcmV2aW91c1NpYmxpbmdzKGxvY2ssIFwiaW5wSW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNpYmxpbmdJbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NrLmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgY2xhc3M9XCJiaSBiaS1sb2NrXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk04IDFhMiAyIDAgMCAxIDIgMnY0SDZWM2EyIDIgMCAwIDEgMi0ybTMgNlYzYTMgMyAwIDAgMC02IDB2NGEyIDIgMCAwIDAtMiAydjVhMiAyIDAgMCAwIDIgMmg2YTIgMiAwIDAgMCAyLTJWOWEyIDIgMCAwIDAtMi0yTTUgOGg2YTEgMSAwIDAgMSAxIDF2NWExIDEgMCAwIDEtMSAxSDVhMSAxIDAgMCAxLTEtMVY5YTEgMSAwIDAgMSAxLTFcIi8+XG4gICAgICAgICAgPC9zdmc+YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChzaWJsaW5nSW5wdXQgPz8gbnVsbCwgXCJzaWJsaW5nSW5wdXRcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2tzVGFiSW5kLmZvckVhY2goKGxvY2spID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbnB1dCA9IEdsb2JhbEhhbmRsZXIuc2VhcmNoUHJldmlvdXNTaWJsaW5ncyhsb2NrLCBcImlucEluZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzaWJsaW5nSW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jay5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGNsYXNzPVwiYmkgYmktdW5sb2NrXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTEgMWEyIDIgMCAwIDAtMiAydjRhMiAyIDAgMCAxIDIgMnY1YTIgMiAwIDAgMS0yIDJIM2EyIDIgMCAwIDEtMi0yVjlhMiAyIDAgMCAxIDItMmg1VjNhMyAzIDAgMCAxIDYgMHY0YS41LjUgMCAwIDEtMSAwVjNhMiAyIDAgMCAwLTItMk0zIDhhMSAxIDAgMCAwLTEgMXY1YTEgMSAwIDAgMCAxIDFoNmExIDEgMCAwIDAgMS0xVjlhMSAxIDAgMCAwLTEtMXpcIi8+XG4gICAgICAgIDwvc3ZnPmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoc2libGluZ0lucHV0ID8/IG51bGwsIFwic2libGluZ0lucHV0XCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gTG9ja3MgZGUgVMOhYmVsYSBkZSDDjW5kaWNlcy5cbiAgICBMZW5ndGggb2J0aWRhOiAke2xvY2tzVGFiSW5kPy5sZW5ndGggPz8gMH07XG4gICAgVG9kb3Mgb3MgRWxlbWVudHMgY29tbyBTcGFuOiAke2xvY2tzVGFiSW5kLmV2ZXJ5KChsb2NrKSA9PiBsb2NrIGluc3RhbmNlb2YgSFRNTFNwYW5FbGVtZW50KSA/PyBmYWxzZX1gKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVtQ29sKGV2RWwpIHtcclxuICAgIGxldCBudW1Db2wgPSB1bmRlZmluZWQ7XHJcbiAgICBpZiAoKGV2RWwgJiYgZXZFbC5pZC5tYXRjaCgvWzAtOV0rX1swLTldKyQvZykpIHx8XHJcbiAgICAgICAgKGV2RWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIGV2RWwubmFtZS5tYXRjaCgvWzAtOV0rX1swLTldKyQvZykpIHx8XHJcbiAgICAgICAgKGV2RWwgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50ICYmIGV2RWwuaHRtbEZvci5tYXRjaCgvWzAtOV0rX1swLTldKyQvZykpKSB7XHJcbiAgICAgICAgbnVtQ29sID0gcGFyc2VJbnQoZXZFbC5pZC5zbGljZSgtMSksIDEwKSA/PyB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihudW1Db2wpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgbnVtQ29sIHJldG9ybmFkbyBjb21vIE5hTi4gUmV2ZXJ0aWRvIHBhcmEgdW5kZWZpbmVkLmApO1xyXG4gICAgICAgICAgICBudW1Db2wgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5tYXRjaEVycm9yKFwiLmlkIGRvIEVsZW1lbnRvIGRlIEV2ZW50b1wiLCBldkVsID8/IG51bGwsIGV2RWw/LmlkID8/IFwibnVsbFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVtQ29sO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUV2UmVzdWx0TnVtKGV2RWwsIHByb3BlcnR5KSB7XHJcbiAgICBpZiAoZXZFbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgZXZFbC50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgY29uc3QgcmV0dXJuZWRQcm9wZXJ0eSA9IEdsb2JhbEhhbmRsZXIudXBkYXRlU2ltcGxlUHJvcGVydHkoZXZFbCkgfHwgMDtcclxuICAgICAgICBpZiAodHlwZW9mIHJldHVybmVkUHJvcGVydHkgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgcHJvcGVydHkgPSByZXR1cm5lZFByb3BlcnR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmV0dXJuZWRQcm9wZXJ0eSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBwcm9wZXJ0eSA9IHBhcnNlSW50KHJldHVybmVkUHJvcGVydHkucmVwbGFjZUFsbCgvW14wLTkuLCstXS9nLCBcIlwiKSkgfHwgMDtcclxuICAgICAgICAgICAgaWYgKE51bWJlci5pc05hTihwcm9wZXJ0eSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgUHJvcHJpZWRhZGUgZGUgaW5wdXQgcGFyYSAke2V2RWw/LmlkID8/IFwidW5kZWZpbmVkIEV2ZW50IEVsZW1lbnRcIn1cbiAgICAgICAgcmV0b3JuYWRhIGNvbW8gTmFOIGUgcmV2ZXJ0aWRhIHBhcmEgMC5gKTtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKGBwcm9wZXJ0eSByZWxhY2lvbmFkYSBhICR7ZXZFbD8uaWQgPz8gXCJ1bmRlZmluZWQgRXZlbnQgRWxlbWVudFwifWAsIHByb3BlcnR5LCBcIm51bWJlclwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgIHByb3BlcnR5ID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChldkVsLCBgJHtldkVsPy5pZCA/PyBcInVuZGVmaW5lZCBFdmVudCBFbGVtZW50XCJ9YCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIHByb3BlcnR5ID0gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm9wZXJ0eTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hQZXJzb25Qcm9wZXJ0aWVzV0gocGVyc29uLCB0YXJnSW5wV2VpZ2h0LCB0YXJnSW5wSGVpZ2h0KSB7XHJcbiAgICBpZiAodGFyZ0lucFdlaWdodCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBwZXJzb24ud2VpZ2h0ID0gdmFsaWRhdGVFdlJlc3VsdE51bSh0YXJnSW5wV2VpZ2h0LCBwZXJzb24ud2VpZ2h0KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0YXJnSW5wV2VpZ2h0ID8/IG51bGwsIFwidGFyZ0lucFdlaWdodFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ0lucEhlaWdodCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBwZXJzb24uaGVpZ2h0ID0gdmFsaWRhdGVFdlJlc3VsdE51bSh0YXJnSW5wSGVpZ2h0LCBwZXJzb24uaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0YXJnSW5wSGVpZ2h0ID8/IG51bGwsIFwidGFyZ0lucEhlaWdodFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3BlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHRdO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRjaFBlcnNvblByb3BlcnRpZXNEQyhwZXJzb24sIHRhcmdJbnBTdW1EQ3V0KSB7XHJcbiAgICBpZiAodGFyZ0lucFN1bURDdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgcGVyc29uLnN1bURDdXQgPSB2YWxpZGF0ZUV2UmVzdWx0TnVtKHRhcmdJbnBTdW1EQ3V0LCBwZXJzb24uc3VtREN1dCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQodGFyZ0lucFN1bURDdXQgPz8gbnVsbCwgXCJ0YXJnSW5wU3VtREN1dFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGVyc29uLnN1bURDdXQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUluZGV4ZXNDb250ZXh0cyhwZXJzb24sIGdvcmRDb3JwTHZsLCB0YXJnSW5wSU1DLCB0YXJnSW5wTUxHLCB0YXJnSW5wVE1CLCB0YXJnSW5wR0VULCBmb3JtVE1CVHlwZUVsZW1lbnQsIGZhY3RvckF0dkx2bCwgZmFjdG9yQXRsZXRhKSB7XHJcbiAgICBsZXQgSU1DID0gMDtcclxuICAgIGxldCBNTEcgPSAwO1xyXG4gICAgbGV0IFRNQiA9IDA7XHJcbiAgICBsZXQgR0VUID0gMDtcclxuICAgIGNvbnN0IElNQ01MR0FycmF5ID0gcGVyc29uLmNhbGNJTUMocGVyc29uKSA/PyBbXCJcIiwgMCwgMF07XHJcbiAgICBpZiAoTnVtYmVyLmlzTmFOKElNQ01MR0FycmF5WzFdKSB8fCBpc05hTihJTUNNTEdBcnJheVsxXSkpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYElNQ01MR0NBcnJheVsxXSByZXRvcm5hbmRvIGNvbW8gTmFOYCk7XHJcbiAgICAgICAgSU1DTUxHQXJyYXlbMV0gPSAwO1xyXG4gICAgfVxyXG4gICAgSU1DID0gcGFyc2VGbG9hdChJTUNNTEdBcnJheVsxXS50b0ZpeGVkKDQpKSA/PyAwO1xyXG4gICAgaWYgKE51bWJlci5pc05hTihJTUNNTEdBcnJheVsyXSkgfHwgaXNOYU4oSU1DTUxHQXJyYXlbMl0pKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBJTUNNTEdDQXJyYXlbMl0gcmV0b3JuYW5kbyBjb21vIE5hTmApO1xyXG4gICAgICAgIElNQ01MR0FycmF5WzJdID0gMDtcclxuICAgIH1cclxuICAgIE1MRyA9IHBhcnNlRmxvYXQoSU1DTUxHQXJyYXlbMl0udG9GaXhlZCg0KSkgPz8gMDtcclxuICAgIHVwZGF0ZUlNQ01MR0NvbnRleHQoSU1DTUxHQXJyYXksIGdvcmRDb3JwTHZsLCB0YXJnSW5wSU1DLCB0YXJnSW5wTUxHLCBmb3JtVE1CVHlwZUVsZW1lbnQsIFwiTk9ORVwiKTtcclxuICAgIGlmIChJTUNNTEdBcnJheVswXSA9PT0gXCJcIiB8fCBJTUNNTEdBcnJheVsxXSA9PT0gMCB8fCBJTUNNTEdBcnJheVsyXSA9PT0gMCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgSU1DTUxHQXJyYXkgbsOjbyBhdHVhbGl6YWRvLlxuICAgICAgICAgICAgICBWYWxvcmVzIG9idGlkb3M6ICR7SU1DTUxHQXJyYXlbMF0gPz8gXCJudWxsXCJ9OyAke0lNQ01MR0FycmF5WzFdID8/IDB9OyAke0lNQ01MR0FycmF5WzJdID8/IDB9IH1gKTtcclxuICAgIH1cclxuICAgIFRNQiA9IHVwZGF0ZVRNQkNvbnRleHQoSU1DTUxHQXJyYXkgPz8gW2dvcmRDb3JwTHZsLnZhbHVlLCAwLCAwXSwgcGVyc29uLCBmYWN0b3JBdGxldGEsIGZvcm1UTUJUeXBlRWxlbWVudCwgdGFyZ0lucFRNQik7XHJcbiAgICBpZiAoVE1CID49IDAgJiYgZmFjdG9yQXR2THZsKSB7XHJcbiAgICAgICAgR0VUID0gdXBkYXRlR0VUQ29udGV4dChwZXJzb24sIHRhcmdJbnBHRVQsIFRNQiwgZmFjdG9yQXR2THZsKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgVmFsb3IgZGUgVE1CIG9idGlkbzogJHtUTUJ9O1xuICAgIGZhY3RvckF0dkx2bCBvYnRpZG86ICR7ZmFjdG9yQXR2THZsID8/IDB9YCk7XHJcbiAgICAgICAgdGFyZ0lucEdFVC52YWx1ZSA9IFwiMFwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtJTUMsIE1MRywgVE1CLCBHRVRdO1xyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZUlNQ01MR0NvbnRleHQoSU1DTUxHQXJyYXksIGdvcmRDb3JwTHZsLCB0YXJnSW5wSU1DLCB0YXJnSW5wTUxHLCBmb3JtVE1CVHlwZUVsZW1lbnQsIGlnbm9yZWRJbmRleCkge1xyXG4gICAgbGV0IElNQyA9IDA7XHJcbiAgICBsZXQgTUxHID0gMDtcclxuICAgIGlmIChnb3JkQ29ycEx2bCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50ICYmXHJcbiAgICAgICAgdGFyZ0lucElNQyBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICB0YXJnSW5wTUxHIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgIGZvcm1UTUJUeXBlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50ICYmXHJcbiAgICAgICAgKGlnbm9yZWRJbmRleCA9PT0gXCJNTEdcIiB8fFxyXG4gICAgICAgICAgICBpZ25vcmVkSW5kZXggPT09IFwiSU1DXCIgfHxcclxuICAgICAgICAgICAgaWdub3JlZEluZGV4ID09PSBcIkJPVEhcIiB8fFxyXG4gICAgICAgICAgICBpZ25vcmVkSW5kZXggPT09IFwiTk9ORVwiKSkge1xyXG4gICAgICAgIGlmICghKGlnbm9yZWRJbmRleCA9PT0gXCJNTEdcIiB8fCBpZ25vcmVkSW5kZXggPT09IFwiQk9USFwiKSAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgSU1DTUxHQXJyYXlbMl0gPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgTUxHID0gSU1DTUxHQXJyYXlbMl07XHJcbiAgICAgICAgICAgIHRhcmdJbnBNTEcudmFsdWUgPSBNTEcudG9GaXhlZCg0KSB8fCBcIjBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcIklNQ01MR0FycmF5WzJdXCIsIElNQ01MR0FycmF5WzJdID8/IG51bGwsIFwibnVtYmVyXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEoaWdub3JlZEluZGV4ID09PSBcIklNQ1wiIHx8IGlnbm9yZWRJbmRleCA9PT0gXCJCT1RIXCIpICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBJTUNNTEdBcnJheVsxXSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICBJTUMgPSBJTUNNTEdBcnJheVsxXTtcclxuICAgICAgICAgICAgdGFyZ0lucElNQy52YWx1ZSA9IElNQy50b0ZpeGVkKDQpIHx8IFwiMFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwiSU1DTUxHQXJyYXlbMV1cIiwgSU1DTUxHQXJyYXlbMV0gPz8gbnVsbCwgXCJudW1iZXJcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIElNQ01MR0FycmF5WzBdID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGdvcmRDb3JwTHZsLnZhbHVlID0gSU1DTUxHQXJyYXlbMF0gfHwgXCJcIjtcclxuICAgICAgICAgICAgZmx1eEZvcm1JTUMoSU1DLCBmb3JtVE1CVHlwZUVsZW1lbnQsIGdvcmRDb3JwTHZsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcIklNQ01MR0FycmF5WzBdXCIsIElNQ01MR0FycmF5WzBdID8/IG51bGwsIFwic3RyaW5nXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKElNQ01MR0FycmF5WzBdID09PSBcIlwiIHx8IElNQ01MR0FycmF5WzFdID09PSAwIHx8IElNQ01MR0FycmF5WzJdID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgSU1DTUxHQXJyYXkgbsOjbyBhdHVhbGl6YWRvLlxuICAgICAgVmFsb3JlcyBvYnRpZG9zOiAke0lNQ01MR0FycmF5WzBdID8/IFwibnVsbFwifTsgJHtJTUNNTEdBcnJheVsxXSA/PyAwfTsgJHtJTUNNTEdBcnJheVsyXSA/PyAwfSB9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIsIFwiaW5zdMOibmNpYXMgZGUgZWxlbWVudG9zIGVtIHVwZGF0ZUlNQ01MR0NvbnRleHRcIiwgZ29yZENvcnBMdmwgPz8gbnVsbCwgdGFyZ0lucElNQyA/PyBudWxsLCB0YXJnSW5wTUxHID8/IG51bGwsIGZvcm1UTUJUeXBlRWxlbWVudCA/PyBudWxsKTtcclxuICAgICAgICBjb25zb2xlLndhcm4oYGlnbm9yZWRJbmRleDogJHtpZ25vcmVkSW5kZXh9YCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZsdXhGb3JtSU1DKElNQywgZm9ybVRNQlR5cGVFbGVtZW50LCBnb3JkQ29ycEx2bCkge1xyXG4gICAgaWYgKGZvcm1UTUJUeXBlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50ICYmXHJcbiAgICAgICAgZm9ybVRNQlR5cGVFbGVtZW50LnZhbHVlICE9PSBcIlwiICYmXHJcbiAgICAgICAgZ29yZENvcnBMdmwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCAmJlxyXG4gICAgICAgIGdvcmRDb3JwTHZsLnZhbHVlICE9PSBcIlwiKSB7XHJcbiAgICAgICAgaWYgKElNQyA+PSAwICYmIElNQyA8IDI1LjApIHtcclxuICAgICAgICAgICAgZm9ybVRNQlR5cGVFbGVtZW50LnZhbHVlID0gXCJoYXJyaXNCZW5lZGljdFwiO1xyXG4gICAgICAgICAgICBpZiAoSU1DIDwgMTguNSkge1xyXG4gICAgICAgICAgICAgICAgZ29yZENvcnBMdmwudmFsdWUgPSBcImFiYWl4b1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAxOC41KSB7XHJcbiAgICAgICAgICAgICAgICBnb3JkQ29ycEx2bC52YWx1ZSA9IFwiZXV0cm9maWNvXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoSU1DID49IDI1LjApIHtcclxuICAgICAgICAgICAgZm9ybVRNQlR5cGVFbGVtZW50LnZhbHVlID0gXCJtaWZmbGluU3RKZW9yXCI7XHJcbiAgICAgICAgICAgIGlmIChJTUMgPCAzMCkge1xyXG4gICAgICAgICAgICAgICAgZ29yZENvcnBMdmwudmFsdWUgPSBcInNvYnJlcGVzb1wiO1xyXG4gICAgICAgICAgICAgICAgZm9ybVRNQlR5cGVFbGVtZW50LnZhbHVlID0gXCJtaWZmbGluU3RKZW9yXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoSU1DID49IDMwICYmIElNQyA8IDM1KSB7XHJcbiAgICAgICAgICAgICAgICBnb3JkQ29ycEx2bC52YWx1ZSA9IFwib2Jlc28xXCI7XHJcbiAgICAgICAgICAgICAgICBmb3JtVE1CVHlwZUVsZW1lbnQudmFsdWUgPSBcIm1pZmZsaW5TdEplb3JcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChJTUMgPj0gMzUgJiYgSU1DIDwgNDApIHtcclxuICAgICAgICAgICAgICAgIGdvcmRDb3JwTHZsLnZhbHVlID0gXCJvYmVzbzJcIjtcclxuICAgICAgICAgICAgICAgIGZvcm1UTUJUeXBlRWxlbWVudC52YWx1ZSA9IFwibWlmZmxpblN0SmVvclwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+IDQwKSB7XHJcbiAgICAgICAgICAgICAgICBnb3JkQ29ycEx2bC52YWx1ZSA9IFwib2Jlc28zXCI7XHJcbiAgICAgICAgICAgICAgICBmb3JtVE1CVHlwZUVsZW1lbnQudmFsdWUgPSBcIm1pZmZsaW5TdEplb3JcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyBvYnRlbmRvIHZhbG9yIGRlIElNQyBlbSBmdW7Dp8OjbyBmbHV4Rm9ybUlNQygpLlxuICAgICAgVmFsb3Igb2J0aWRvOiAke0lNQyA/PyBcIk5hTlwifWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKHNsaWNlZEVycm9yID8/IFwiTlVMTFwiLCBcIm9idGVuZG8gZm9ybVRNQlR5cGVFbGVtZW50IGUvb3UgZ29yZENvcnBMdmwgRWxlbWVudFwiLCBmb3JtVE1CVHlwZUVsZW1lbnQgPz8gbnVsbCwgZ29yZENvcnBMdmwgPz8gbnVsbCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVRNQkNvbnRleHQoSU1DTUxHQXJyYXksIHBlcnNvbiwgZmFjdG9yQXRsZXRhLCBmb3JtVE1CVHlwZUVsZW1lbnQsIHRhcmdJbnBUTUIpIHtcclxuICAgIGxldCBUTUIgPSAwO1xyXG4gICAgaWYgKElNQ01MR0FycmF5Lmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgIGNvbnN0IFRNQkFycmF5ID0gcGVyc29uLmNhbGNUTUIocGVyc29uLCBJTUNNTEdBcnJheVsxXSA/PyAwLCBmYWN0b3JBdGxldGEsIElNQ01MR0FycmF5WzJdID8/IDApID8/IFtcIlwiLCAwXTtcclxuICAgICAgICBpZiAoZm9ybVRNQlR5cGVFbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZm9ybVRNQlR5cGVFbGVtZW50LnZhbHVlID0gVE1CQXJyYXlbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoZm9ybVRNQlR5cGVFbGVtZW50ID8/IG51bGwsIFwiZm9ybVRNQlR5cGVFbGVtZW50XCIsIHNsaWNlZEVycm9yID8/IG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUTUIgPSBwYXJzZUZsb2F0KFRNQkFycmF5WzFdLnRvRml4ZWQoNCkpID8/IDA7XHJcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihUTUIpIHx8IGlzTmFOKFRNQikpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBUTUIgcmV0b3JuYW5kbyBjb21vIE5hTmApO1xyXG4gICAgICAgICAgICBUTUIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnSW5wVE1CLnZhbHVlID0gVE1CLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyBhcmd1bWVudG9zLlxuICAgICAgSU1DIG9idGlkbzogJHtJTUNNTEdBcnJheVsxXX07XG4gICAgICBNTEcgb2J0aWRvOiAke0lNQ01MR0FycmF5WzJdfTtcbiAgICAgIGZhY3RvckF0bGV0YSBvYnRpZG86ICR7ZmFjdG9yQXRsZXRhfWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFRNQjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hUTUJFbGVtZW50cyhtYWluU2VsZWN0LCBmb3JtVE1CVHlwZUVsZW1lbnQsIHNwYW5GYWN0b3JBdGxldGEsIGdvcmRDb3JwTHZsLCBsb2NrR29yZENvcnBMdmwsIElNQykge1xyXG4gICAgaWYgKCFJTUMpIHtcclxuICAgICAgICBJTUMgPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKG1haW5TZWxlY3QgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCAmJlxyXG4gICAgICAgIGZvcm1UTUJUeXBlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50ICYmXHJcbiAgICAgICAgc3BhbkZhY3RvckF0bGV0YSBpbnN0YW5jZW9mIEhUTUxTcGFuRWxlbWVudCAmJlxyXG4gICAgICAgIGdvcmRDb3JwTHZsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgJiZcclxuICAgICAgICBsb2NrR29yZENvcnBMdmwgaW5zdGFuY2VvZiBIVE1MU3BhbkVsZW1lbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGZvcm1UTUJUeXBlRWxlbWVudC52YWx1ZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaGFycmlzQmVuZWRpY3RcIjpcclxuICAgICAgICAgICAgICAgIGZsdXhGb3JtSU1DKElNQywgZm9ybVRNQlR5cGVFbGVtZW50LCBnb3JkQ29ycEx2bCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1pZmZsaW5TdEplb3JcIjpcclxuICAgICAgICAgICAgICAgIGZsdXhGb3JtSU1DKElNQywgZm9ybVRNQlR5cGVFbGVtZW50LCBnb3JkQ29ycEx2bCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInRpbnNsZXlcIjpcclxuICAgICAgICAgICAgICAgIG1haW5TZWxlY3QudmFsdWUgPSBcIm11aXRvSW50ZW5zb1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYWluU2VsZWN0LnZhbHVlID09PSBcIm11aXRvSW50ZW5zb1wiKSB7XHJcbiAgICAgICAgICAgIGZvcm1UTUJUeXBlRWxlbWVudC52YWx1ZSA9IFwidGluc2xleVwiO1xyXG4gICAgICAgICAgICBzcGFuRmFjdG9yQXRsZXRhLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChtYWluU2VsZWN0LnZhbHVlID09PSBcInNlZGVudGFyaW9cIiB8fFxyXG4gICAgICAgICAgICBtYWluU2VsZWN0LnZhbHVlID09PSBcImxldmVcIiB8fFxyXG4gICAgICAgICAgICBtYWluU2VsZWN0LnZhbHVlID09PSBcIm1vZGVyYWRvXCIgfHxcclxuICAgICAgICAgICAgbWFpblNlbGVjdC52YWx1ZSA9PT0gXCJpbnRlbnNvXCIpIHtcclxuICAgICAgICAgICAgc3BhbkZhY3RvckF0bGV0YS5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZ29yZENvcnBMdmwudmFsdWUgPT09IFwic29icmVwZXNvXCIgfHxcclxuICAgICAgICAgICAgICAgIGdvcmRDb3JwTHZsLnZhbHVlID09PSBcIm9iZXNvMVwiIHx8XHJcbiAgICAgICAgICAgICAgICBnb3JkQ29ycEx2bC52YWx1ZSA9PT0gXCJvYmVzbzJcIiB8fFxyXG4gICAgICAgICAgICAgICAgZ29yZENvcnBMdmwudmFsdWUgPT09IFwib2Jlc28zXCIgfHxcclxuICAgICAgICAgICAgICAgIChJTUMgJiYgSU1DID49IDI1KSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybVRNQlR5cGVFbGVtZW50LnZhbHVlID0gXCJtaWZmbGluU3RKZW9yXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZ29yZENvcnBMdmwudmFsdWUgPT09IFwiYWJhaXhvXCIgfHxcclxuICAgICAgICAgICAgICAgIGdvcmRDb3JwTHZsLnZhbHVlID09PSBcImV1dHJvZmljb1wiIHx8XHJcbiAgICAgICAgICAgICAgICAoSU1DICYmIElNQyA8IDI1KSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybVRNQlR5cGVFbGVtZW50LnZhbHVlID0gXCJoYXJyaXNCZW5lZGljdFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyBvYnRlbmRvIHZhbG9yIGRlIEdvcmR1cmEgQ29ycG9yYWwuXG4gICAgICAgIE7DrXZlbCBkZSBHb3JkdXJhIENvcnBvcmFsIG9idGlkbzogJHtnb3JkQ29ycEx2bD8udmFsdWUgPz8gXCJudWxsXCJ9O1xuICAgICAgICBJTUMgb2J0aWRvOiAke0lNQyA/PyAwfS5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyBvYnRlbmRvIHZhbG9yIGRlIG1haW5TZWxlY3QuXG4gICAgICBWYWxvciBvYnRpZG86ICR7bWFpblNlbGVjdC52YWx1ZSB8fCBcIm51bGxcIn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1haW5TZWxlY3QudmFsdWUgPT09IFwibXVpdG9JbnRlbnNvXCIgfHxcclxuICAgICAgICAgICAgZm9ybVRNQlR5cGVFbGVtZW50LnZhbHVlID09PSBcInRpbnNsZXlcIikge1xyXG4gICAgICAgICAgICBsb2NrR29yZENvcnBMdmwuaW5uZXJIVE1MID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBjbGFzcz1cImJpIGJpLXVubG9ja1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIj5cbiAgICAgIDxwYXRoIGQ9XCJNMTEgMWEyIDIgMCAwIDAtMiAydjRhMiAyIDAgMCAxIDIgMnY1YTIgMiAwIDAgMS0yIDJIM2EyIDIgMCAwIDEtMi0yVjlhMiAyIDAgMCAxIDItMmg1VjNhMyAzIDAgMCAxIDYgMHY0YS41LjUgMCAwIDEtMSAwVjNhMiAyIDAgMCAwLTItMk0zIDhhMSAxIDAgMCAwLTEgMXY1YTEgMSAwIDAgMCAxIDFoNmExIDEgMCAwIDAgMS0xVjlhMSAxIDAgMCAwLTEtMXpcIi8+XG4gICAgPC9zdmc+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2tHb3JkQ29ycEx2bC5pbm5lckhUTUwgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGNsYXNzPVwiYmkgYmktbG9ja1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIj5cbiAgICAgIDxwYXRoIGQ9XCJNOCAxYTIgMiAwIDAgMSAyIDJ2NEg2VjNhMiAyIDAgMCAxIDItMm0zIDZWM2EzIDMgMCAwIDAtNiAwdjRhMiAyIDAgMCAwLTIgMnY1YTIgMiAwIDAgMCAyIDJoNmEyIDIgMCAwIDAgMi0yVjlhMiAyIDAgMCAwLTItMk01IDhoNmExIDEgMCAwIDEgMSAxdjVhMSAxIDAgMCAxLTEgMUg1YTEgMSAwIDAgMS0xLTFWOWExIDEgMCAwIDEgMS0xXCIvPlxuICAgIDwvc3ZnPmA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIsIFwiYXJndW1lbnRvcyBlbSBtYXRjaFRNQkVsZW1lbnRzKClcIiwgbWFpblNlbGVjdCA/PyBudWxsLCBmb3JtVE1CVHlwZUVsZW1lbnQgPz8gbnVsbCwgc3BhbkZhY3RvckF0bGV0YSA/PyBudWxsLCBnb3JkQ29ycEx2bCA/PyBudWxsLCBsb2NrR29yZENvcnBMdmwgPz8gbnVsbCk7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBUaXBvIHByaW1pdGl2byBvYnRpZG8gcGFyYSBJTUM6ICR7dHlwZW9mIElNQyA/PyBcInVuZGVmaW5lZFwifS5gKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlR0VUQ29udGV4dChwZXJzb24sIHRhcmdJbnBHRVQsIFRNQiwgZmFjdG9yQXR2THZsKSB7XHJcbiAgICBsZXQgR0VUID0gcGFyc2VGbG9hdChwZXJzb24uY2FsY0dFVChUTUIgfHwgMCwgZmFjdG9yQXR2THZsKS50b0ZpeGVkKDQpKSA/PyAwO1xyXG4gICAgaWYgKE51bWJlci5pc05hTihHRVQpIHx8IGlzTmFOKEdFVCkpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYEdFVCByZXRvcm5hbmRvIGNvbW8gTmFOYCk7XHJcbiAgICAgICAgR0VUID0gMDtcclxuICAgIH1cclxuICAgIHRhcmdJbnBHRVQudmFsdWUgPSBHRVQudG9GaXhlZCg0KTtcclxuICAgIHJldHVybiBHRVQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVBHQyhwZXJzb24sIG51bVJlZiwgY29udGV4dCwgcGFyZW50RWxlbWVudCkge1xyXG4gICAgbGV0IHRhcmdJbnBQR0MgPSB1bmRlZmluZWQ7XHJcbiAgICBsZXQgdGFyZ0lucFN1bURDdXQgPSB1bmRlZmluZWQ7XHJcbiAgICBsZXQgUEdDID0gMDtcclxuICAgIGlmIChjb250ZXh0ID09PSBcImNvbnNcIiB8fCBjb250ZXh0ID09PSBcInRhYlwiKSB7XHJcbiAgICAgICAgaWYgKGNvbnRleHQgPT09IFwiY29uc1wiKSB7XHJcbiAgICAgICAgICAgIHRhcmdJbnBQR0MgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCNpbnBQZ2Mke251bVJlZn1DZWw0XyR7bnVtUmVmICsgMX1gKTtcclxuICAgICAgICAgICAgdGFyZ0lucFN1bURDdXQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCN0YWJJbnBSb3dEQ3V0OV8ke251bVJlZiArIDF9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRleHQgPT09IFwidGFiXCIpIHtcclxuICAgICAgICAgICAgdGFyZ0lucFBHQyA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgI2lucFBnYyR7bnVtUmVmIC0gMX1DZWw0XyR7bnVtUmVmfWApO1xyXG4gICAgICAgICAgICB0YXJnSW5wU3VtREN1dCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgI3RhYklucFJvd0RDdXQ5XyR7bnVtUmVmfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoXCJ2YWxpZGFuZG8gY29udGV4dG8uICBWYWxvcmVzIGRlIHN0cmluZyBhY2VpdG9zOiBjb25zIHx8IHRhYi5cIiwgY29udGV4dCA/PyBcInVuZGVmaW5lZFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ0lucFN1bURDdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgdGFyZ0lucFN1bURDdXQudHlwZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIHBlcnNvbi5zdW1EQ3V0ID0gcGFyc2VJbnQodGFyZ0lucFN1bURDdXQ/LnZhbHVlID8/IDApO1xyXG4gICAgICAgIHRhcmdJbnBTdW1EQ3V0LnZhbHVlID0gcGVyc29uLnN1bURDdXQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0YXJnSW5wU3VtREN1dCwgXCJ0YXJnSW5wU3VtREN1dFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ0lucFBHQyBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgdGFyZ0lucFBHQy50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdW1kY3V0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi5zdW1EQ3V0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFnZSBjYXB0dXJhZGEgXCIgKyBwZXJzb24uYWdlKTtcclxuICAgICAgICBQR0MgPSBwYXJzZUZsb2F0KHBlcnNvbi5jYWxjUEdDKHBlcnNvbikudG9GaXhlZCg0KSkgPz8gMDtcclxuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKFBHQykgfHwgaXNOYU4oUEdDKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFBHQyByZXRvcm5hbmRvIGNvbW8gTmFOYCk7XHJcbiAgICAgICAgICAgIFBHQyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IFBHQ0RlY2F5QXJyYXkgPSBFZEZpc051dE1vZGVsLmlzUEdDRGVjYXlpbmcocGVyc29uLCBQR0MsIHRhcmdJbnBQR0MpO1xyXG4gICAgICAgIGlmIChQR0NEZWNheUFycmF5WzBdID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIFBHQyA9IFBHQ0RlY2F5QXJyYXlbMV07XHJcbiAgICAgICAgICAgIHRhcmdJbnBQR0MudmFsdWUgPSBQR0MudG9GaXhlZCgyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRhcmdJbnBQR0MudmFsdWUgPSBQR0MudG9GaXhlZCg0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQodGFyZ0lucFBHQywgXCJ0YXJnSW5wUEdDXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxuICAgIGlmIChQR0MgPD0gMCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgVmFsb3IgZGUgUEdDIG7Do28gYXR1YWxpemFkby5cbiAgICBWYWxvciBvYnRpZG86ICR7UEdDIHx8IDB9YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW1BHQyA/PyAwLCB0YXJnSW5wU3VtREN1dCA/PyBudWxsLCB0YXJnSW5wUEdDID8/IG51bGxdO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBdHZMdmwobWFpblNlbGVjdCwgYXR2THZsLCBzZWNvbmRhcnlTZWxlY3QpIHtcclxuICAgIGNvbnN0IHJldHVybmVkQXR2THZsID0gR2xvYmFsSGFuZGxlci51cGRhdGVTaW1wbGVQcm9wZXJ0eShtYWluU2VsZWN0KSA/PyBcIlwiO1xyXG4gICAgaWYgKHR5cGVvZiByZXR1cm5lZEF0dkx2bCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGF0dkx2bCA9IHJldHVybmVkQXR2THZsO1xyXG4gICAgICAgIHNlY29uZGFyeVNlbGVjdC52YWx1ZSA9IGF0dkx2bDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwiYXR1YWxpemHDp8OjbyBkZSBtYWluU2VsZWN0IGVtIHVwZGF0ZUF0THZsKClcIiwgcmV0dXJuZWRBdHZMdmwgPz8gbnVsbCwgXCJzdHJpbmdcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0dkx2bDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lVGFyZ0lucHMobnVtUmVmLCBjb250ZXh0LCBwYXJlbnRFbCkge1xyXG4gICAgY29uc3QgYXJyYXlUYXJnSW5wcyA9IFtdO1xyXG4gICAgY29uc3QgdmFsaWRUYXJnSW5wcyA9IFtdO1xyXG4gICAgbGV0IHRhcmdJbnBXZWlnaHQgPSB1bmRlZmluZWQ7XHJcbiAgICBsZXQgdGFyZ0lucEhlaWdodCA9IHVuZGVmaW5lZDtcclxuICAgIGxldCB0YXJnSW5wSU1DID0gdW5kZWZpbmVkO1xyXG4gICAgbGV0IHRhcmdJbnBNTEcgPSB1bmRlZmluZWQ7XHJcbiAgICBsZXQgdGFyZ0lucFRNQiA9IHVuZGVmaW5lZDtcclxuICAgIGxldCB0YXJnSW5wR0VUID0gdW5kZWZpbmVkO1xyXG4gICAgaWYgKHR5cGVvZiBudW1SZWYgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBudW1SZWYgPVxyXG4gICAgICAgICAgICBudW1SZWZcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKC9bXCInXS9nLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgLm1hdGNoKC9eWzAtOV17MSwyfSQvZylcclxuICAgICAgICAgICAgICAgID8udG9TdHJpbmcoKSA/PyBcIlwiO1xyXG4gICAgICAgIGlmIChudW1SZWYgJiYgbnVtUmVmICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIG51bVJlZiA9IHBhcnNlSW50KG51bVJlZiwgMTApO1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKG51bVJlZikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgbnVtUmVmIHJldG9ybmFkbyBjb21vIE5hTi4gUmV2ZXJ0aWRvIHBhcmEgMWApO1xyXG4gICAgICAgICAgICAgICAgbnVtUmVmID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoXCJjb252ZXJ0ZW5kbyBOw7ptZXJvIGRlIENvbnN1bHRhIGRlIHN0cmluZyBwYXJhIG7Dum1lcm9cIiwgbnVtUmVmLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBudW1SZWYgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICBpZiAoY29udGV4dCA9PT0gXCJjb25zXCIgfHwgY29udGV4dCA9PT0gXCJ0YWJcIikge1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dCA9PT0gXCJjb25zXCIpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdJbnBXZWlnaHQgPSBwYXJlbnRFbC5xdWVyeVNlbGVjdG9yKGAjdGFiSW5wUm93TWVkQW50Ml8ke251bVJlZiArIDF9YCk7XHJcbiAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzLnB1c2godGFyZ0lucFdlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnSW5wSGVpZ2h0ID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcihgI3RhYklucFJvd01lZEFudDNfJHtudW1SZWYgKyAxfWApO1xyXG4gICAgICAgICAgICAgICAgYXJyYXlUYXJnSW5wcy5wdXNoKHRhcmdJbnBIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ0lucElNQyA9IHBhcmVudEVsLnF1ZXJ5U2VsZWN0b3IoYCNpbnBJbWMke251bVJlZn1DZWwyXyR7bnVtUmVmICsgMX1gKTtcclxuICAgICAgICAgICAgICAgIGFycmF5VGFyZ0lucHMucHVzaCh0YXJnSW5wSU1DKTtcclxuICAgICAgICAgICAgICAgIHRhcmdJbnBNTEcgPSBwYXJlbnRFbC5xdWVyeVNlbGVjdG9yKGAjaW5wTWxnJHtudW1SZWZ9Q2VsM18ke251bVJlZiArIDF9YCk7XHJcbiAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzLnB1c2godGFyZ0lucE1MRyk7XHJcbiAgICAgICAgICAgICAgICB0YXJnSW5wVE1CID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcihgI2lucFRtYiR7bnVtUmVmfUNlbDVfJHtudW1SZWYgKyAxfWApO1xyXG4gICAgICAgICAgICAgICAgYXJyYXlUYXJnSW5wcy5wdXNoKHRhcmdJbnBUTUIpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ0lucEdFVCA9IHBhcmVudEVsLnF1ZXJ5U2VsZWN0b3IoYCNpbnBHZXQke251bVJlZn1DZWw2XyR7bnVtUmVmICsgMX1gKTtcclxuICAgICAgICAgICAgICAgIGFycmF5VGFyZ0lucHMucHVzaCh0YXJnSW5wR0VUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb250ZXh0ID09PSBcInRhYlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnSW5wV2VpZ2h0ID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcihgI3RhYklucFJvd01lZEFudDJfJHtudW1SZWZ9YCk7XHJcbiAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzLnB1c2godGFyZ0lucFdlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnSW5wSGVpZ2h0ID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcihgI3RhYklucFJvd01lZEFudDNfJHtudW1SZWZ9YCk7XHJcbiAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzLnB1c2godGFyZ0lucEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnSW5wSU1DID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcihgI2lucEltYyR7bnVtUmVmIC0gMX1DZWwyXyR7bnVtUmVmfWApO1xyXG4gICAgICAgICAgICAgICAgYXJyYXlUYXJnSW5wcy5wdXNoKHRhcmdJbnBJTUMpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ0lucE1MRyA9IHBhcmVudEVsLnF1ZXJ5U2VsZWN0b3IoYCNpbnBNbGcke251bVJlZiAtIDF9Q2VsM18ke251bVJlZn1gKTtcclxuICAgICAgICAgICAgICAgIGFycmF5VGFyZ0lucHMucHVzaCh0YXJnSW5wTUxHKTtcclxuICAgICAgICAgICAgICAgIHRhcmdJbnBUTUIgPSBwYXJlbnRFbC5xdWVyeVNlbGVjdG9yKGAjaW5wVG1iJHtudW1SZWYgLSAxfUNlbDVfJHtudW1SZWZ9YCk7XHJcbiAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzLnB1c2godGFyZ0lucFRNQik7XHJcbiAgICAgICAgICAgICAgICB0YXJnSW5wR0VUID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcihgI2lucEdldCR7bnVtUmVmIC0gMX1DZWw2XyR7bnVtUmVmfWApO1xyXG4gICAgICAgICAgICAgICAgYXJyYXlUYXJnSW5wcy5wdXNoKHRhcmdJbnBHRVQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci50eXBlRXJyb3IoXCJudW1SZWZcIiwgbnVtUmVmID8/IG51bGwsIFwibnVtYmVyIG91IHN0cmluZyBzb21lbnRlIGNvbSBuw7ptZXJvc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5zdHJpbmdFcnJvcihcInZhbGlkYW5kbyBjb250ZXh0by4gVmFsb3JlcyBkZSBzdHJpbmcgYWNlaXRvczogY29ucyB8fCB0YWIuXCIsIGNvbnRleHQgPz8gXCJ1bmRlZmluZWRcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGFycmF5VGFyZ0lucHMubGVuZ3RoID09PSA2KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaUEgPSAwOyBpQSA8IGFycmF5VGFyZ0lucHMubGVuZ3RoOyBpQSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheVRhcmdJbnBzW2lBXSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgIGFycmF5VGFyZ0lucHNbaUFdLnR5cGUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkVGFyZ0lucHMucHVzaChhcnJheVRhcmdJbnBzW2lBXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChhcnJheVRhcmdJbnBzW2lBXSwgYGFycmF5VGFyZ0lucHMgJHtlbnVtVGFyZ0lucFR5cGVzW2lBXX1gLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzW2lBXSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoYXJyYXlUYXJnSW5wcyA/PyBudWxsLCBcImFycmF5VGFyZ0lucHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbGlkVGFyZ0lucHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJvd0F0aXZGaXMoY29udGFpbmVyKSB7XHJcbiAgICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQgJiZcclxuICAgICAgICBjb250YWluZXIudGFnTmFtZSA9PT0gXCJCVVRUT05cIikge1xyXG4gICAgICAgIGlmIChjb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkQXRGaXNSb3RcIikpIHtcclxuICAgICAgICAgICAgY29uc3QgdEJvZHlDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYlRib2R5QXRGaXNSb3RcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICAgICAgICAgICAgbmV3Um93LmNsYXNzTmFtZSA9IFwiY29udFF1aW50IHRhYlJvd0F0RmlzUm90XCI7XHJcbiAgICAgICAgICAgIG5ld1Jvdy5pZCA9IGB0YWJSb3dBdEZpc1JvdElkJHtyb3dDb3VudEF0aXZGaXNSb3R9YDtcclxuICAgICAgICAgICAgbmV3Um93LmlubmVySFRNTCA9IGBcbiAgICAgIDx0ZCBjbGFzcz1cImNvbnRTZXh0IHRhYkNlbEF0RmlzUm90XCIgaWQ9XCJ0YWJDZWxSb3dBdEZpc1JvdCR7cm93Q291bnRBdGl2RmlzUm90fV8xXCIgaXRlbXByb3A9XCJjZWxBdEZpc1JvdFwiPiR7cm93Q291bnRBdGl2RmlzUm90IC0gMX0mIzQxPC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cImNvbnRTZXh0IHRhYkNlbEF0RmlzUm90XCIgaWQ9XCJ0YWJDZWxSb3dBdEZpc1JvdCR7cm93Q291bnRBdGl2RmlzUm90fV8yXCIgaXRlbXByb3A9XCJjZWxBdEZpc1JvdFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgY2xhc3M9XCJjb250U2V0IHRhYklucEF0RmlzUm90IHRhYklucFJvd0F0RmlzUm90MlwiIGlkPVwidGFiSW5wUm93QXRGaXNSb3Qke3Jvd0NvdW50QXRpdkZpc1JvdH1fMVwiIGl0ZW1wcm9wPVwiaW5wQXRGaXNSb3RcIiAvPlxuICAgICAgPHRkIGNsYXNzPVwiY29udFNleHQgdGFiQ2VsQXRGaXNSb3RcIiBpZD1cInRhYkNlbFJvd0F0RmlzUm90JHtyb3dDb3VudEF0aXZGaXNSb3R9XzNcIiBpdGVtcHJvcD1cImNlbEF0RmlzUm90XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjI1NVwiIGNsYXNzPVwiY29udFNldCBpbnBBdGl2RmlzIHRhYklucEF0RmlzUm90IHRhYklucFJvd0F0RmlzUm90MlwiIGlkPVwidGFiSW5wUm93QXRGaXNSb3Qke3Jvd0NvdW50QXRpdkZpc1JvdH1fMlwiIGl0ZW1wcm9wPVwiaW5wQXRGaXNSb3RcIiAvPlxuICAgICAgPC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cImNvbnRTZXh0IHRhYkNlbEF0RmlzUm90XCIgaWQ9XCJ0YWJDZWxSb3dBdEZpc1JvdCR7cm93Q291bnRBdGl2RmlzUm90fV80XCIgaXRlbXByb3A9XCJjZWxBdEZpc1JvdFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiBjbGFzcz1cImNvbnRTZXQgdGFiSW5wQXRGaXNSb3QgdGFiSW5wUm93QXRGaXNSb3QyXCIgaWQ9XCJ0YWJJbnBSb3dBdEZpc1JvdCR7cm93Q291bnRBdGl2RmlzUm90fV8zXCIgaXRlbXByb3A9XCJpbnBBdEZpc1JvdFwiIC8+XG4gICAgICA8L3RkPlxuICAgICAgPHRkIGNsYXNzPVwiY29udFNleHQgdGFiQ2VsQXRGaXNSb3RcIiBpZD1cInRhYkNlbFJvd0F0RmlzUm90JHtyb3dDb3VudEF0aXZGaXNSb3R9XzVcIiBpdGVtcHJvcD1cImNlbEF0RmlzUm90XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjI1NVwiIGNsYXNzPVwiY29udFNldCB0YWJJbnBBdEZpc1JvdCB0YWJJbnBSb3dBdEZpc1JvdDJcIiBpZD1cInRhYklucFJvd0F0RmlzUm90JHtyb3dDb3VudEF0aXZGaXNSb3R9XzRcIiBpdGVtcHJvcD1cImlucEF0RmlzUm90XCIgLz5cbiAgICAgIDwvdGQ+XG4gICAgICAgIGA7XHJcbiAgICAgICAgICAgIGlmICh0Qm9keUNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdEJvZHlDb250YWluZXIuYXBwZW5kQ2hpbGQobmV3Um93KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG51bUlucHMgPSBuZXdSb3cucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dEVsZW1lbnRzID0gbmV3Um93LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpVCA9IDA7IGlUIDwgdGV4dEVsZW1lbnRzLmxlbmd0aDsgaVQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50c1tpVF0uYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEdsb2JhbE1vZGVsLmF1dG9DYXBpdGFsaXplSW5wdXRzKHRleHRFbGVtZW50c1tpVF0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGlOID0gMDsgaU4gPCBudW1JbnBzLmxlbmd0aDsgaU4rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG51bUlucHNbaU5dLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBHbG9iYWxNb2RlbC5udW1iZXJMaW1pdChudW1JbnBzW2lOXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd0NvdW50QXRpdkZpc1JvdCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVtb3ZlQXRGaXNSb3RcIikpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsaWRQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYkF0RmlzUm90XCIpO1xyXG4gICAgICAgICAgICBpZiAodmFsaWRQYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdzQ29sbGVjdGlvbiA9IHZhbGlkUGFyZW50LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWROZXh0UGFyZW50ID0gc2libGluZ3NDb2xsZWN0aW9uLm5hbWVkSXRlbShgdGFiVGJvZHlBdEZpc1JvdGApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkTmV4dFBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRTaWJsaW5nc0NvbGxlY3Rpb24gPSB2YWxpZE5leHRQYXJlbnQuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93VG9SZW1vdmUgPSBuZXh0U2libGluZ3NDb2xsZWN0aW9uLm5hbWVkSXRlbShgdGFiUm93QXRGaXNSb3RJZCR7cm93Q291bnRBdGl2RmlzUm90IC0gMX1gKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93VG9SZW1vdmUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93Q291bnRBdGl2RmlzUm90ICE9PSAzICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1RvUmVtb3ZlLmlkICE9PSBcInRhYlJvd0F0RmlzUm90SWQyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93VG9SZW1vdmUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd0NvdW50QXRpdkZpc1JvdCAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkQXRGaXNQcm9wXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRCb2R5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWJUYm9keUF0RmlzUHJvcFwiKTtcclxuICAgICAgICAgICAgY29uc3QgbmV3Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG4gICAgICAgICAgICBuZXdSb3cuY2xhc3NOYW1lID0gXCJjb250UXVpbnQgdGFiUm93QXRGaXNQcm9wXCI7XHJcbiAgICAgICAgICAgIG5ld1Jvdy5pZCA9IGB0YWJSb3dBdEZpc1Byb3BJZCR7cm93Q291bnRBdGl2RmlzUHJvcH1gO1xyXG4gICAgICAgICAgICBuZXdSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgPHRkIGNsYXNzPVwiY29udFNleHQgdGFiQ2VsQXRGaXNQcm9wXCIgaWQ9XCJ0YWJDZWxSb3dBdEZpc1Byb3Ake3Jvd0NvdW50QXRpdkZpc1Byb3B9XzFcIiBpdGVtcHJvcD1cImNlbEF0RmlzUHJvcFwiPiR7cm93Q291bnRBdGl2RmlzUHJvcCAtIDF9JiM0MTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJjb250U2V4dCB0YWJDZWxBdEZpc1Byb3BcIiBpZD1cInRhYkNlbFJvd0F0RmlzUHJvcCR7cm93Q291bnRBdGl2RmlzUHJvcH1fMlwiIGl0ZW1wcm9wPVwiY2VsQXRGaXNQcm9wXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiBjbGFzcz1cImNvbnRTZXQgdGFiSW5wQXRGaXNQcm9wIHRhYklucFJvd0F0RmlzUHJvcDJcIiBpZD1cInRhYklucFJvd0F0RmlzUHJvcCR7cm93Q291bnRBdGl2RmlzUHJvcH1fMVwiIGl0ZW1wcm9wPVwiaW5wQXRGaXNQcm9wXCIgcmVxdWlyZWQgLz5cbiAgICAgIDx0ZCBjbGFzcz1cImNvbnRTZXh0IHRhYkNlbEF0RmlzUHJvcFwiIGlkPVwidGFiQ2VsUm93QXRGaXNQcm9wJHtyb3dDb3VudEF0aXZGaXNQcm9wfV8zXCIgaXRlbXByb3A9XCJjZWxBdEZpc1Byb3BcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgY2xhc3M9XCJjb250U2V0IGlucEF0aXZGaXMgdGFiSW5wQXRGaXNQcm9wIHRhYklucFJvd0F0RmlzUHJvcDJcIiBpZD1cInRhYklucFJvd0F0RmlzUHJvcCR7cm93Q291bnRBdGl2RmlzUHJvcH1fMlwiIGl0ZW1wcm9wPVwiaW5wQXRGaXNQcm9wXCIgcmVxdWlyZWQgLz5cbiAgICAgIDwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJjb250U2V4dCB0YWJDZWxBdEZpc1Byb3BcIiBpZD1cInRhYkNlbFJvd0F0RmlzUHJvcCR7cm93Q291bnRBdGl2RmlzUHJvcH1fNFwiIGl0ZW1wcm9wPVwiY2VsQXRGaXNQcm9wXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjI1NVwiIGNsYXNzPVwiY29udFNldCB0YWJJbnBBdEZpc1Byb3AgdGFiSW5wUm93QXRGaXNQcm9wMlwiIGlkPVwidGFiSW5wUm93QXRGaXNQcm9wJHtyb3dDb3VudEF0aXZGaXNQcm9wfV8zXCIgaXRlbXByb3A9XCJpbnBBdEZpc1Byb3BcIiByZXF1aXJlZCAvPlxuICAgICAgPC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cImNvbnRTZXh0IHRhYkNlbEF0RmlzUHJvcFwiIGlkPVwidGFiQ2VsUm93QXRGaXNQcm9wJHtyb3dDb3VudEF0aXZGaXNQcm9wfV81XCIgaXRlbXByb3A9XCJjZWxBdEZpc1Byb3BcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgY2xhc3M9XCJjb250U2V0IHRhYklucEF0RmlzUHJvcCB0YWJJbnBSb3dBdEZpc1Byb3AyXCIgaWQ9XCJ0YWJJbnBSb3dBdEZpc1Byb3Ake3Jvd0NvdW50QXRpdkZpc1Byb3B9XzRcIiBpdGVtcHJvcD1cImlucEF0RmlzUHJvcFwiIHJlcXVpcmVkIC8+XG4gICAgICA8L3RkPlxuICAgICAgICBgO1xyXG4gICAgICAgICAgICBpZiAodEJvZHlDb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgIHRCb2R5Q29udGFpbmVyLmFwcGVuZENoaWxkKG5ld1Jvdyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBudW1JbnBzID0gbmV3Um93LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRFbGVtZW50cyA9IG5ld1Jvdy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaVQgPSAwOyBpVCA8IHRleHRFbGVtZW50cy5sZW5ndGg7IGlUKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudHNbaVRdLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyh0ZXh0RWxlbWVudHNbaVRdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpTiA9IDA7IGlOIDwgbnVtSW5wcy5sZW5ndGg7IGlOKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBudW1JbnBzW2lOXS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gR2xvYmFsTW9kZWwubnVtYmVyTGltaXQobnVtSW5wc1tpTl0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3dDb3VudEF0aXZGaXNQcm9wKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJyZW1vdmVBdEZpc1Byb3BcIikpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsaWRQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYkF0RmlzUHJvcFwiKTtcclxuICAgICAgICAgICAgaWYgKHZhbGlkUGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzaWJsaW5nc0NvbGxlY3Rpb24gPSB2YWxpZFBhcmVudC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkTmV4dFBhcmVudCA9IHNpYmxpbmdzQ29sbGVjdGlvbi5uYW1lZEl0ZW0oYHRhYlRib2R5QXRGaXNQcm9wYCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsaWROZXh0UGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dFNpYmxpbmdzQ29sbGVjdGlvbiA9IHZhbGlkTmV4dFBhcmVudC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dUb1JlbW92ZSA9IG5leHRTaWJsaW5nc0NvbGxlY3Rpb24ubmFtZWRJdGVtKGB0YWJSb3dBdEZpc1Byb3BJZCR7cm93Q291bnRBdGl2RmlzUHJvcCAtIDF9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvd1RvUmVtb3ZlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd0NvdW50QXRpdkZpc1Byb3AgIT09IDMgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93VG9SZW1vdmUuaWQgIT09IFwidGFiUm93QXRGaXNQcm9wSWQyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93VG9SZW1vdmUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd0NvdW50QXRpdkZpc1Byb3AgLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJvd0NvbW9yYihjb250YWluZXIpIHtcclxuICAgIGlmIChjb250YWluZXIudGFnTmFtZSA9PT0gXCJCVVRUT05cIiAmJiBjb250YWluZXIuaWQgPT09IFwiYWRkQ29tb3JiXCIpIHtcclxuICAgICAgICBjb25zdCBwYXJlbnRUYWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYkNvbW9yYlwiKTtcclxuICAgICAgICBjb25zdCBuZXdDb21vcmJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICAgICAgbmV3Q29tb3JiUm93LmNsYXNzTmFtZSA9IFwiY29udFRlcmMgdGFiUm93Q29tb3JiXCI7XHJcbiAgICAgICAgbmV3Q29tb3JiUm93LmlkID0gYHRhYlJvd0NvbW9yYiR7cm93Q291bnRDb21vcmJ9YDtcclxuICAgICAgICBuZXdDb21vcmJSb3cuaW5uZXJIVE1MID0gYFxuICAgIDx0ZCBjbGFzcz1cImNvbnRRdWF0IHRhYkNlbENvbW9yYiB0YWJDZWxSb3dDb21vcmIke3Jvd0NvdW50Q29tb3JifVwiIGlkPVwidGFiQ2VsUm93Q29tb3JiJHtyb3dDb3VudENvbW9yYn1fMVwiPiR7cm93Q291bnRDb21vcmIgLSAxfTwvdGQ+XG4gICAgPHRkIGNsYXNzPVwiY29udFF1YXQgdGFiQ2VsQ29tb3JiIHRhYkNlbFJvd0NvbW9yYiR7cm93Q291bnRDb21vcmJ9XCIgaWQ9XCJ0YWJDZWxSb3dDb21vcmIke3Jvd0NvdW50Q29tb3JifV8yXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImNvbnRRdWludCB0YWJJbnBDb21vcmIgdGFiSW5wUm93Q29tb3JiJHtyb3dDb3VudENvbW9yYn1cIiBpZD1cInRhYmxJbnBSb3dDb21vcmIke3Jvd0NvdW50Q29tb3JifV8yXCIvPlxuICAgIDwvdGQ+XG4gICAgPHRkIGNsYXNzPVwiY29udFF1YXQgdGFiQ2VsQ29tb3JiIHRhYkNlbFJvd0NvbW9yYiR7cm93Q291bnRDb21vcmJ9XCIgaWQ9XCJ0YWJDZWxSb3dDb21vcmIke3Jvd0NvdW50Q29tb3JifV8zXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBjbGFzcz1cImNvbnRRdWludCB0YWJJbnBDb21vcmIgdGFiSW5wUm93Q29tb3JiJHtyb3dDb3VudENvbW9yYn0gaWQ9XCJ0YWJsSW5wUm93Q29tb3JiJHtyb3dDb3VudENvbW9yYn1fM1wiLz5cbiAgICA8L3RkPlxuICAgIGA7XHJcbiAgICAgICAgaWYgKHBhcmVudFRhYikge1xyXG4gICAgICAgICAgICBwYXJlbnRUYWIuYXBwZW5kQ2hpbGQobmV3Q29tb3JiUm93KTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dEVsZW1lbnRzID0gbmV3Q29tb3JiUm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlCID0gMDsgaUIgPCB0ZXh0RWxlbWVudHMubGVuZ3RoOyBpQisrKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudHNbaUJdLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyh0ZXh0RWxlbWVudHNbaUJdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm93Q291bnRDb21vcmIrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb250YWluZXIudGFnTmFtZSA9PT0gXCJCVVRUT05cIiAmJlxyXG4gICAgICAgIGNvbnRhaW5lci5pZCA9PT0gXCJyZW1vdmVDb21vcmJcIikge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkQ29tb3JiUGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWJDb21vcmJcIik7XHJcbiAgICAgICAgaWYgKHZhbGlkQ29tb3JiUGFyZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdzQ29tb3JiQ29sbGVjdGlvbiA9IHZhbGlkQ29tb3JiUGFyZW50LmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBpZiAodmFsaWRDb21vcmJQYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW9yYlJvd1RvUmVtb3ZlID0gc2libGluZ3NDb21vcmJDb2xsZWN0aW9uLm5hbWVkSXRlbShgdGFiUm93Q29tb3JiJHtyb3dDb3VudENvbW9yYiAtIDF9YCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tb3JiUm93VG9SZW1vdmUgJiZcclxuICAgICAgICAgICAgICAgICAgICByb3dDb3VudENvbW9yYiAhPT0gMyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW9yYlJvd1RvUmVtb3ZlLmlkICE9PSBcInRhYlJvd0NvbW9yYjJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW9yYlJvd1RvUmVtb3ZlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0NvdW50Q29tb3JiLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaFJlcXVpcmVkQ29scyhlbGVtZW50cykge1xyXG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA+IDAgJiYgZWxlbWVudHNbMV0gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnNUYWJsZXNGcyA9IGVsZW1lbnRzWzBdO1xyXG4gICAgICAgIGNvbnN0IG51bUNvbnNFbGVtZW50ID0gZWxlbWVudHNbMV07XHJcbiAgICAgICAgY29uc3QgdGFiU1ZpID0gZWxlbWVudHNbMl07XHJcbiAgICAgICAgY29uc3QgdGFiTWVkQW50ID0gZWxlbWVudHNbM107XHJcbiAgICAgICAgY29uc3QgdGFiREMgPSBlbGVtZW50c1s0XTtcclxuICAgICAgICBjb25zdCB0YWJJbmRQZXJjID0gZWxlbWVudHNbNV07XHJcbiAgICAgICAgbGV0IG51bUNvbnMgPSBwYXJzZUludChudW1Db25zRWxlbWVudD8udmFsdWUgfHwgXCIxXCIpO1xyXG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4obnVtQ29ucykpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBudW1Db25zIHJldG9ybmFkbyBjb21vIE5hTiwgcmV2ZXJ0aWRvIHBhcmEgMWApO1xyXG4gICAgICAgICAgICBudW1Db25zID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hZGljaW9uYSBsaXN0ZW5lciBwYXJhIHJlc3BvbmRlciDDoCBtdWRhbsOnYSBubyB2YWxvciBkZSBjb25zdWx0YVxyXG4gICAgICAgIGxldCByZXR1cm5lZE51bSA9IHBhcnNlSW50KEdsb2JhbEhhbmRsZXIudXBkYXRlU2ltcGxlUHJvcGVydHkobnVtQ29uc0VsZW1lbnQpID8/IFwiMFwiLCAxMCk7XHJcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihyZXR1cm5lZE51bSkpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGByZXR1cm5lZE51bSByZXRvcm5hZG8gY29tbyBOYU4sIHJldmVydGlkbyBwYXJhIDBgKTtcclxuICAgICAgICAgICAgcmV0dXJuZWROdW0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHJldHVybmVkTnVtID09PSBcIm51bWJlclwiICYmXHJcbiAgICAgICAgICAgIHJldHVybmVkTnVtID4gMCAmJlxyXG4gICAgICAgICAgICByZXR1cm5lZE51bSA8PSAzKSB7XHJcbiAgICAgICAgICAgIG51bUNvbnMgPSByZXR1cm5lZE51bTtcclxuICAgICAgICAgICAgLy9pbmljaWEgY29uc3RydcOnw6NvIGRlIG1hdHJpeiBwYXJhIHJlc2V0IGRlIHJlcXVpcmVkIG5hIHRhYmVsYVxyXG4gICAgICAgICAgICBjb25zdCB0b3RhbFRhYmxlcyA9IGNvbnNUYWJsZXNGcz8ucXVlcnlTZWxlY3RvckFsbChcInRhYmxlXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0b3RhbFJvd3MgPSBjb25zVGFibGVzRnM/LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0clwiKTtcclxuICAgICAgICAgICAgbGV0IG5Ub3RhbFJvd3MgPSAwO1xyXG4gICAgICAgICAgICBpZiAodG90YWxSb3dzICYmIHRvdGFsUm93cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBuVG90YWxSb3dzID0gdG90YWxSb3dzLmxlbmd0aCAtIHRvdGFsVGFibGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKHRvdGFsUm93cyA/PyBudWxsLCBcIk5vZGVMaXN0IGRlIGVsZW1lbnRvcyA8dHI+IGVtIHN3aXRjaFJlcXVpcmVkQ29scygpXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB0b3RhbENvbHMgPSBjb25zVGFibGVzRnM/LnF1ZXJ5U2VsZWN0b3JBbGwoXCJjb2xcIik7XHJcbiAgICAgICAgICAgIGxldCBuVG90YWxDb2xzID0gMDtcclxuICAgICAgICAgICAgaWYgKHRvdGFsQ29scyAmJiB0b3RhbENvbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgblRvdGFsQ29scyA9IHRvdGFsQ29scy5sZW5ndGggLSB0b3RhbFRhYmxlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZCh0b3RhbENvbHMgPz8gbnVsbCwgXCJOb2RlTGlzdCBkZSBlbGVtZW50b3MgPGNvbD4gZW0gc3dpdGNoUmVxdWlyZWRDb2xzKClcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuVG90YWxNYXRyaXhWYWxpZEF4ZXMgPSAwO1xyXG4gICAgICAgICAgICBpZiAoblRvdGFsUm93cyAhPT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgIU51bWJlci5pc05hTihuVG90YWxSb3dzKSAmJlxyXG4gICAgICAgICAgICAgICAgblRvdGFsQ29scyAhPT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgIU51bWJlci5pc05hTihuVG90YWxDb2xzKSkge1xyXG4gICAgICAgICAgICAgICAgblRvdGFsTWF0cml4VmFsaWRBeGVzID0gblRvdGFsUm93cyAqIG5Ub3RhbENvbHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIG5hIGNvbnN0cnXDp8OjbyBkYSBNYXRyaXogcGFyYSBlaXhvcyBkZSBwcmVlbmNoaW1lbnRvLlxuICAgICAgICBOw7ptZXJvIGRlIExpbmhhcyBvYnRpZGFzOiAke25Ub3RhbFJvd3MgPz8gMH07XG4gICAgICAgIE7Dum1lcm8gZGUgQ29sdW5hcyBvYnRpZGFzOiAke25Ub3RhbENvbHMgPz8gMH0uYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jYXB0dXJhIGVsZW1lbnRvcyBkZSBpbnB1dCBwYXJhIHJlc2V0IGJhc2VhZG8gbmFzIG1hdHJpemVzIGlucHNDZWxscyBlIG5Ub3RhbE1hdHJpeFZhbGlkQXhlc1xyXG4gICAgICAgICAgICBjb25zdCBpbnBzQ2VsbHNTVmkgPSB0YWJTVmkucXVlcnlTZWxlY3RvckFsbChcIi50YWJJbnBQcm9nU1ZpXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBpbnBzQ2VsbHNNZWRBbnQgPSB0YWJNZWRBbnQucXVlcnlTZWxlY3RvckFsbChcIi50YWJJbnBQcm9nTWVkQW50XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBpbnBzQ2VsbHNEQyA9IHRhYkRDLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFiSW5wUHJvZ0NvbnNcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHNDZWxsc0luZFBlcmMgPSB0YWJJbmRQZXJjLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5wSW5kXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBpbnBzQ2VsbHMgPSBbXHJcbiAgICAgICAgICAgICAgICAuLi5pbnBzQ2VsbHNTVmksXHJcbiAgICAgICAgICAgICAgICAuLi5pbnBzQ2VsbHNNZWRBbnQsXHJcbiAgICAgICAgICAgICAgICAuLi5pbnBzQ2VsbHNEQyxcclxuICAgICAgICAgICAgICAgIC4uLmlucHNDZWxsc0luZFBlcmMsXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIC8vcmVzZXRhIG8gYXRyaWJ1dG8gcmVxdWlyZWQgZGFzIGNlbGxzIHBhcmEgbm92YXMgYXRyaWJ1acOnw7VlcyBkZSByZXF1aXJlZFxyXG4gICAgICAgICAgICBpZiAoaW5wc0NlbGxzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIGlucHNDZWxscy5sZW5ndGggPT09IG5Ub3RhbE1hdHJpeFZhbGlkQXhlcyAvIHRvdGFsVGFibGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaW5wc0NlbGxzLmZvckVhY2goKGlucENlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnBDZWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucENlbC5yZXF1aXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChpbnBDZWwgPz8gbnVsbCwgXCJpbnBDZWxcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyBuYSBkZXRlcm1pbmHDp8OjbyBkZSAubGVuZ3RoIGRvIGFycmF5IGRlIElucHV0IGVtIEPDqWx1bGFzLlxuICAgICAgICBOw7ptZXJvIG9idGlkbzogJHtpbnBzQ2VsbHMubGVuZ3RoID8/IDB9O1xuICAgICAgICBFcXVpdmFsZSBhbyBuw7ptZXJvIGRlc2VqYWRvIHBhcmEgYSBtYXRyaXogZGUgRWl4b3MgZGUgUHJlZW5jaGltZW50bzogJHtpbnBzQ2VsbHMubGVuZ3RoID09PSBuVG90YWxNYXRyaXhWYWxpZEF4ZXMgPz8gZmFsc2V9O1xuICAgICAgICBOw7ptZXJvIGFjZWl0bzogJHtuVG90YWxNYXRyaXhWYWxpZEF4ZXMgLyB0b3RhbFRhYmxlcy5sZW5ndGh9O1xuICAgICAgICBOw7ptZXJvIGRlIElucHV0cyBwYXJhIFNpbmFpcyBWaXRhaXMgb2J0aWRvOiAke2lucHNDZWxsc1NWaT8ubGVuZ3RoID8/IDB9O1xuICAgICAgICBOw7ptZXJvIGRlIElucHV0cyBwYXJhIE1lZGlkYXMgQW50cm9wb23DqXRyaWNhcyBvYnRpZG86ICR7aW5wc0NlbGxzTWVkQW50Py5sZW5ndGggPz8gMH07XG4gICAgICAgIE7Dum1lcm8gZGUgSW5wdXRzIHBhcmEgRG9icmFzIEN1dMOibmVhcyBvYnRpZG86ICR7aW5wc0NlbGxzREM/Lmxlbmd0aCA/PyAwfTtcbiAgICAgICAgTsO6bWVybyBkZSBJbnB1dHMgcGFyYSDDjW5kaWNlcyBlIFBlcmNlbnR1YWlzIG9idGlkbzogJHtpbnBzQ2VsbHNJbmRQZXJjPy5sZW5ndGggPz8gMH0uYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9kZXRlcm1pbmHDp8OjbyBkYXMgbm92YXMgY2VsbHMgcmVxdWlyZWRcclxuICAgICAgICAgICAgY29uc3QgdmFsaWRJbnBzTm9kZUxpc3RzID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXTtcclxuICAgICAgICAgICAgLy9mb3JtYcOnw6NvIGRhcyBtYXRyaXplcyBwYXJhIHZhbGlkYXIgb3MgbsO6bWVyb3MgZGUgaW5wdXRzIG9idGlkb3MgcGFyYSBjYWRhIHRhYmVsYVxyXG4gICAgICAgICAgICBjb25zdCBuUm93c1NWaSA9IHRhYlNWaS5xdWVyeVNlbGVjdG9yQWxsKFwidHJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG5Db2xzU1ZpID0gdGFiU1ZpLnF1ZXJ5U2VsZWN0b3JBbGwoXCJjb2xcIik7XHJcbiAgICAgICAgICAgIGxldCBtYXRyaXhWYWxpZEF4ZXNTVmkgPSAwO1xyXG4gICAgICAgICAgICBpZiAoblJvd3NTVmkubGVuZ3RoID4gMCAmJiBuQ29sc1NWaS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRyaXhWYWxpZEF4ZXNTVmkgPSAoblJvd3NTVmkubGVuZ3RoIC0gMSkgKiAobkNvbHNTVmkubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyBOw7ptZXJvIGRlIExpbmhhcyBuYSBUYWJlbGEgZGUgU2luYWlzIFZpdGFpcy5cbiAgICAgICAgTsO6bWVybyBkZSBMaW5oYXMgb2J0aWRhczogJHtuUm93c1NWaT8ubGVuZ3RoID8/IDB9O1xuICAgICAgICBOw7ptZXJvIGRlIENvbHVuYXMgb2J0aWRhczogJHtuQ29sc1NWaT8ubGVuZ3RoID8/IDB9LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5Sb3dzTWVkQW50ID0gdGFiTWVkQW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0clwiKTtcclxuICAgICAgICAgICAgY29uc3QgbkNvbHNNZWRBbnQgPSB0YWJNZWRBbnQucXVlcnlTZWxlY3RvckFsbChcImNvbFwiKTtcclxuICAgICAgICAgICAgbGV0IG1hdHJpeFZhbGlkQXhlc01lZEFudCA9IDA7XHJcbiAgICAgICAgICAgIGlmIChuUm93c01lZEFudC5sZW5ndGggPiAwICYmIG5Db2xzTWVkQW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG1hdHJpeFZhbGlkQXhlc01lZEFudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgKG5Sb3dzTWVkQW50Lmxlbmd0aCAtIDEpICogKG5Db2xzTWVkQW50Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gTsO6bWVybyBkZSBMaW5oYXMgbmEgVGFiZWxhIGRlIE1lZGlkYXMgQW50cm9wb23DqXRyaWNhcy5cbiAgICAgICAgTsO6bWVybyBkZSBMaW5oYXMgb2J0aWRhczogJHtuUm93c01lZEFudD8ubGVuZ3RoID8/IDB9O1xuICAgICAgICBOw7ptZXJvIGRlIENvbHVuYXMgb2J0aWRhczogJHtuQ29sc01lZEFudD8ubGVuZ3RoID8/IDB9LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5Sb3dzREMgPSB0YWJEQy5xdWVyeVNlbGVjdG9yQWxsKFwidHJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG5Db2xzREMgPSB0YWJEQy5xdWVyeVNlbGVjdG9yQWxsKFwiY29sXCIpO1xyXG4gICAgICAgICAgICBsZXQgbWF0cml4VmFsaWRBeGVzREMgPSAwO1xyXG4gICAgICAgICAgICBpZiAoblJvd3NEQy5sZW5ndGggPiAwICYmIG5Db2xzREMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbWF0cml4VmFsaWRBeGVzREMgPSAoblJvd3NEQy5sZW5ndGggLSAxKSAqIChuQ29sc0RDLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gTsO6bWVybyBkZSBMaW5oYXMgbmEgVGFiZWxhIGRlIERvYnJhcyBDdXTDom5lYXMuXG4gICAgICAgIE7Dum1lcm8gZGUgTGluaGFzIG9idGlkYXM6ICR7blJvd3NEQz8ubGVuZ3RoID8/IDB9O1xuICAgICAgICBOw7ptZXJvIGRlIENvbHVuYXMgb2J0aWRhczogJHtuQ29sc0RDPy5sZW5ndGggPz8gMH0uYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgblJvd3NJbmRQZXJjID0gdGFiSW5kUGVyYy5xdWVyeVNlbGVjdG9yQWxsKFwidHJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG5Db2xzSW5kUGVyYyA9IHRhYkluZFBlcmMucXVlcnlTZWxlY3RvckFsbChcImNvbFwiKTtcclxuICAgICAgICAgICAgbGV0IG1hdHJpeFZhbGlkQXhlc0luZFBlcmMgPSAwO1xyXG4gICAgICAgICAgICBpZiAoblJvd3NJbmRQZXJjLmxlbmd0aCA+IDAgJiYgbkNvbHNJbmRQZXJjLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG1hdHJpeFZhbGlkQXhlc0luZFBlcmMgPVxyXG4gICAgICAgICAgICAgICAgICAgIChuUm93c0luZFBlcmMubGVuZ3RoIC0gMSkgKiAobkNvbHNJbmRQZXJjLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gTsO6bWVybyBkZSBMaW5oYXMgbmEgVGFiZWxhIGRlIMONbmRpY2VzIGUgUGVyY2VudHVhaXMuXG4gICAgICAgIE7Dum1lcm8gZGUgTGluaGFzIG9idGlkYXM6ICR7blJvd3NJbmRQZXJjPy5sZW5ndGggPz8gMH07XG4gICAgICAgIE7Dum1lcm8gZGUgQ29sdW5hcyBvYnRpZGFzOiAke25Db2xzSW5kUGVyYz8ubGVuZ3RoID8/IDB9LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdmFsaWRhw6fDo28gZGFzIE5vZGVMaXN0cyBkZSBJbnB1dHMgbmFzIGPDqWx1bGFzXHJcbiAgICAgICAgICAgIGlmIChBcnJheS5mcm9tKGlucHNDZWxsc1NWaSkuZXZlcnkoKGlucENlbGwpID0+IGlucENlbGwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSAmJlxyXG4gICAgICAgICAgICAgICAgaW5wc0NlbGxzU1ZpLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIGlucHNDZWxsc1NWaS5sZW5ndGggPT09IG1hdHJpeFZhbGlkQXhlc1NWaSkge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRJbnBzTm9kZUxpc3RzWzBdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyBjYXB0dXJhbmRvIGlucHV0cyBkZSBTaW5haXMgVml0YWlzIGNvbSBxdWVycnkuXG4gICAgICAgICAgQXJyYXkgb2J0aWRvOiAke0pTT04uc3RyaW5naWZ5KGlucHNDZWxsc1NWaSkgPz8gXCJudWxsXCJ9O1xuICAgICAgICAgIFRvZG9zIG9zIGVsZW1lbnRvcyBjb21vIEhUTUxJbnB1dHM6ICR7QXJyYXkuZnJvbShpbnBzQ2VsbHNTVmkpLmV2ZXJ5KChpbnBDZWxsKSA9PiBpbnBDZWxsIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkgPz8gZmFsc2V9O1xuICAgICAgICAgIExlbmd0aCBlc3BlcmFkYTogJHttYXRyaXhWYWxpZEF4ZXNTVmkgPz8gMH0uYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKEFycmF5LmZyb20oaW5wc0NlbGxzTWVkQW50KS5ldmVyeSgoaW5wQ2VsbCkgPT4gaW5wQ2VsbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpICYmXHJcbiAgICAgICAgICAgICAgICBpbnBzQ2VsbHNNZWRBbnQubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgaW5wc0NlbGxzTWVkQW50Lmxlbmd0aCA9PT0gbWF0cml4VmFsaWRBeGVzTWVkQW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZElucHNOb2RlTGlzdHNbMV0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIGNhcHR1cmFuZG8gaW5wdXRzIGRlIE1lZGlkYXMgQW50cm9wb23DqXRyaWNhcyBjb20gcXVlcnJ5LlxuICAgICAgICAgIEFycmF5IG9idGlkbzogJHtKU09OLnN0cmluZ2lmeShpbnBzQ2VsbHNNZWRBbnQpID8/IFwibnVsbFwifTtcbiAgICAgICAgICBUb2RvcyBvcyBlbGVtZW50b3MgY29tbyBIVE1MSW5wdXRzOiAke0FycmF5LmZyb20oaW5wc0NlbGxzTWVkQW50KS5ldmVyeSgoaW5wQ2VsbCkgPT4gaW5wQ2VsbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpID8/IGZhbHNlfTtcbiAgICAgICAgICBMZW5ndGggZXNwZXJhZGE6ICR7bWF0cml4VmFsaWRBeGVzTWVkQW50ID8/IDB9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKEFycmF5LmZyb20oaW5wc0NlbGxzREMpLmV2ZXJ5KChpbnBDZWxsKSA9PiBpbnBDZWxsIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkgJiZcclxuICAgICAgICAgICAgICAgIGlucHNDZWxsc0RDLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIGlucHNDZWxsc0RDLmxlbmd0aCA9PT0gbWF0cml4VmFsaWRBeGVzREMpIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkSW5wc05vZGVMaXN0c1syXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gY2FwdHVyYWRvIGlucHV0cyBkZSBEb2JyYXMgQ3V0w6JuZWFzIGNvbSBxdWVycnkuXG4gICAgICAgICAgQXJyYXkgb2J0aWRvOiAke0pTT04uc3RyaW5naWZ5KGlucHNDZWxsc0RDKSA/PyBcIm51bGxcIn07XG4gICAgICAgICAgVG9kb3Mgb3MgZWxlbWVudG9zIGNvbW8gSFRNTElucHV0czogJHtBcnJheS5mcm9tKGlucHNDZWxsc0RDKS5ldmVyeSgoaW5wQ2VsbCkgPT4gaW5wQ2VsbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpID8/IGZhbHNlfTtcbiAgICAgICAgICBMZW5ndGggZXNwZXJhZGE6ICR7bWF0cml4VmFsaWRBeGVzREMgPz8gMH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuZnJvbShpbnBzQ2VsbHNJbmRQZXJjKS5ldmVyeSgoaW5wQ2VsbCkgPT4gaW5wQ2VsbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpICYmXHJcbiAgICAgICAgICAgICAgICBpbnBzQ2VsbHNJbmRQZXJjLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIGlucHNDZWxsc0luZFBlcmMubGVuZ3RoID09PSBtYXRyaXhWYWxpZEF4ZXNJbmRQZXJjKSB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZElucHNOb2RlTGlzdHNbM10gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIGNhcHR1cmFuZG8gaW5wdXRzIGRlIMONbmRpY2VzIGUgUGVyY2VudHVhaXMgY29tIHF1ZXJyeS5cbiAgICAgICAgICBBcnJheSBvYnRpZG86ICR7SlNPTi5zdHJpbmdpZnkoaW5wc0NlbGxzSW5kUGVyYykgPz8gXCJudWxsXCJ9O1xuICAgICAgICAgIFRvZG9zIG9zIGVsZW1lbnRvcyBjb21vIEhUTUxJbnB1dHM6ICR7QXJyYXkuZnJvbShpbnBzQ2VsbHNJbmRQZXJjKS5ldmVyeSgoaW5wQ2VsbCkgPT4gaW5wQ2VsbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpID8/IGZhbHNlfTtcbiAgICAgICAgICBMZW5ndGggZXNwZXJhZGE6ICR7bWF0cml4VmFsaWRBeGVzSW5kUGVyYyA/PyAwfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnNSZXF1aXJlZENlbGxzU1ZpID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnNSZXF1aXJlZENlbGxzTWVkQW50ID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnNSZXF1aXJlZENlbGxzREMgPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgY29uc1JlcXVpcmVkQ2VsbHNJbmRQZXJjID0gW107XHJcbiAgICAgICAgICAgIC8vdmFsaWRhw6fDo28gZGUgTm9kZUxpc3RzIHBhcmEgaW5wdXRzIG5hcyB0YWJlbGFzXHJcbiAgICAgICAgICAgIGlmICh2YWxpZElucHNOb2RlTGlzdHMuZXZlcnkoKGlucHNOb2RlTGlzdFZhbGlkYXRpb24pID0+IGlucHNOb2RlTGlzdFZhbGlkYXRpb24gPT09IHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICAvKiBwZXJjb3JyZSBhIHRhYmVsYSB1c2FuZG8gbyBuw7ptZXJvIGRlIGNvbnN1bHRhIGNvbW8gbsO6bWVyb3MgZGUgY2ljbG9zXHJcbiAgICAgICAgICAgICAgICBvdSBzZWphLCBsZW5ndGggZG9zIGFycmF5cyBmb3JtYWRvcyBwZWxhcyBxdWVycmllcyA9PT0gbGVuZ3RoIGRvIG7Dum1lcm8gZGUgY29uc3VsdGEgPT09IG7Dum1lcm8gZGUgY29sdW5hc1xyXG4gICAgICAgICAgICAgICAgKyBzw6NvIGV4dHJhw61kYXMgYXMgY8OpbHVsYXMgZGUgaW50ZXJlc3NlLCBjb20gYmFzZSBuYSAuaWQgcmVsYXRpdmEgw6AgY29sdW5hLCBlIGVudMOjbyBwb3B1bGFtIHJlcXVpcmVkQ2VscyAqL1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaUMgPSAwOyBpQyA8IG51bUNvbnM7IGlDKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJQYXR0ZXJuID0gbmV3IFJlZ0V4cChgXyR7aUMgKyAyfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcklucENlbGxTVmkgPSBBcnJheS5mcm9tKGlucHNDZWxsc1NWaSkuZmlsdGVyKChpbnBDZWxsU1ZpKSA9PiBmaWx0ZXJQYXR0ZXJuLnRlc3QoaW5wQ2VsbFNWaS5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJJbnBDZWxsU1ZpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc1JlcXVpcmVkQ2VsbHNTVmkucHVzaChmaWx0ZXJJbnBDZWxsU1ZpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyBuYSBmaWx0cmFnZW0gZGUgLmlkIGRvcyBlbGVtZW50b3MgZGEgVGFiZWxhIGRlIFNpbmFpcyBWaXRhaXMsIGNvbHVuYSAke2lDfS5gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVySW5wQ2VsbE1lZEFudCA9IEFycmF5LmZyb20oaW5wc0NlbGxzTWVkQW50KS5maWx0ZXIoKGlucENlbGxNZWRBbnQpID0+IGZpbHRlclBhdHRlcm4udGVzdChpbnBDZWxsTWVkQW50LmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcklucENlbGxNZWRBbnQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zUmVxdWlyZWRDZWxsc01lZEFudC5wdXNoKGZpbHRlcklucENlbGxNZWRBbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIG5hIGZpbHRyYWdlbSBkZSAuaWQgZG9zIGVsZW1lbnRvcyBkYSBUYWJlbGEgZGUgTWVkaWRhcyBBbnRyb3BvbcOzcmZpYXMsIGNvbHVuYSAke2lDfS5gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVySW5wQ2VsbERDID0gQXJyYXkuZnJvbShpbnBzQ2VsbHNEQykuZmlsdGVyKChpbnBDZWxsREMpID0+IGZpbHRlclBhdHRlcm4udGVzdChpbnBDZWxsREMuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVySW5wQ2VsbERDLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc1JlcXVpcmVkQ2VsbHNEQy5wdXNoKGZpbHRlcklucENlbGxEQyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gbmEgZmlsdHJhZ2VtIGRlIC5pZCBkb3MgZWxlbWVudG9zIGRhIFRhYmVsYSBkZSBEb2JyYXMgQ3V0w6JuZWFzLCBjb2x1bmEgJHtpQ30uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5mcm9tKGlucHNDZWxsc0luZFBlcmMpLmV2ZXJ5KChpbnBDZWxsKSA9PiBpbnBDZWxsIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVySW5wQ2VsbEluZFBlcmMgPSBBcnJheS5mcm9tKGlucHNDZWxsc0luZFBlcmMpLmZpbHRlcigoaW5wQ2VsbEluZFBlcmMpID0+IGZpbHRlclBhdHRlcm4udGVzdChpbnBDZWxsSW5kUGVyYy5uYW1lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJJbnBDZWxsSW5kUGVyYy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zUmVxdWlyZWRDZWxsc0luZFBlcmMucHVzaChmaWx0ZXJJbnBDZWxsSW5kUGVyYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gbmEgZmlsdHJhZ2VtIGRlIC5pZCBkb3MgZWxlbWVudG9zIGRhIFRhYmVsYSBkZSDDjW5kaWNlcyBlIFBlcmNlbnR1YWlzLCBjb2x1bmEgJHtpQ30uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyBuYSB2YWxpZGHDp8OjbyBkZSBpbnN0w6JuY2lhcyBwYXJhIGlucHNDZWxsc0luZFBlcmMuYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyBuYSB2YWxpZGHDp8OjbyBkZSBOb2RlTGlzdHMgZGUgSW5wdXRzIG5hcyBUYWJlbGFzLlxuICAgICAgICBBcnJheSBkZSBWYWxpZGHDp8OjbyBwYXJhIE5vZGVMaXN0cyBvYnRpZG86ICR7SlNPTi5zdHJpbmdpZnkodmFsaWRJbnBzTm9kZUxpc3RzKSA/PyBcInVuZGVmaW5lZFwifWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkQ2VsbHMgPSBbXHJcbiAgICAgICAgICAgICAgICAuLi5jb25zUmVxdWlyZWRDZWxsc1NWaSxcclxuICAgICAgICAgICAgICAgIC4uLmNvbnNSZXF1aXJlZENlbGxzTWVkQW50LFxyXG4gICAgICAgICAgICAgICAgLi4uY29uc1JlcXVpcmVkQ2VsbHNEQyxcclxuICAgICAgICAgICAgICAgIC4uLmNvbnNSZXF1aXJlZENlbGxzSW5kUGVyYyxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgY29uc3QgZmxhdFJlcXVpcmVkQ2VsbHMgPSByZXF1aXJlZENlbGxzLmZsYXQoMSk7XHJcbiAgICAgICAgICAgIGlmIChmbGF0UmVxdWlyZWRDZWxscy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICBmbGF0UmVxdWlyZWRDZWxscy5sZW5ndGggPT09IG5Ub3RhbFJvd3MgKiBudW1Db25zKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpUiA9IDA7IGlSIDwgZmxhdFJlcXVpcmVkQ2VsbHMubGVuZ3RoOyBpUisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZsYXRSZXF1aXJlZENlbGxzW2lSXSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFJlcXVpcmVkQ2VsbHNbaVJdIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGF0UmVxdWlyZWRDZWxsc1tpUl0gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFJlcXVpcmVkQ2VsbHNbaVJdLnJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKGZsYXRSZXF1aXJlZENlbGxzID8/IG51bGwsIFwiZmxhdFJlcXVpcmVkQ2VsbHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIGF0dWFsaXphbmRvIE7Dum1lcm8gZGUgQ29uc3VsdGEuXG4gICAgICAgICAgTsO6bWVybyBvYnRpZG86ICR7cmV0dXJuZWROdW0gPz8gMH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIG9idGVuZG8gSFRNTEVsZW1lbnRzIGEgcGFydGlyIGRlIG9wZXJhZG9yIHJlc3QuXG4gICAgTGVuZ3RoIG9idGlkYTogJHtlbGVtZW50cz8ubGVuZ3RoID8/IDB9O1xuICAgIEluc3TDom5jaWEgb2J0aWRhIHBhcmEgZWxlbWVudHNbMV06ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnRzWzFdKS5zbGljZSg4LCAtMSkgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaE51bUNvbnNUaXRsZXMoY29uc1RpdGxlcywgdHJpb0VsLCBudW1UaXRsZWRDb25zLCBudW1UYWJzKSB7XHJcbiAgICBjb25zdCBpbmlUcmlvVmFsdWUgPSB0cmlvRWwudmFsdWU7XHJcbiAgICBjb25zdCBpbmlWYWx1ZSA9IHBhcnNlSW50KGluaVRyaW9WYWx1ZSkgPz8gMDtcclxuICAgIGNvbnN0IHRyaW9OdW1zID0gW107XHJcbiAgICBpZiAoTnVtYmVyLmlzTmFOKGluaVZhbHVlKSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgaW5pVmFsdWUgcmV0b3JuYWRvIGNvbW8gTmFOLiBSZXZlcnRpZG8gcGFyYSAwLmApO1xyXG4gICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDw9IG51bVRhYnMgKiBudW1UYWJzIC0gMTsgdCArPSBudW1UaXRsZWRDb25zIC8gbnVtVGFicykge1xyXG4gICAgICAgICAgICB0cmlvTnVtcy5wdXNoKDEsIDIsIDMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IG51bVRhYnMgKiBudW1UYWJzIC0gMTsgaiArPSBudW1UaXRsZWRDb25zIC8gbnVtVGFicykge1xyXG4gICAgICAgICAgICB0cmlvTnVtcy5wdXNoKGluaVZhbHVlLCBpbmlWYWx1ZSArIDEsIGluaVZhbHVlICsgMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25zVGl0bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodHJpb051bXMpKTtcclxuICAgICAgICBjb25zVGl0bGVzW2ldLnRleHRDb250ZW50ID0gYCR7dHJpb051bXNbaV0gfHwgYCR7MSArIGl9YH3CqiBDb25zdWx0YWA7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFycmF5c1JlbHMoYnRuSWQsIGFycmF5Um93cywgcHJvdG9jb2xWYWx1ZSkge1xyXG4gICAgbGV0IGFycmF5Q29uc3VsdGFzTnVtID0gW107XHJcbiAgICBsZXQgcm93VmFsdWVzID0gW107XHJcbiAgICBsZXQgdGFiVmFsdWVzID0gW107XHJcbiAgICBsZXQgY29sdW1uVmFsdWVzID0gW107XHJcbiAgICBsZXQgY29sQWNjID0gMDtcclxuICAgIGNvbnN0IGJ0blJvd01hdGNoID0gYnRuSWQ/Lm1hdGNoKC9bMC05XSsoPz1fKS8pPy50b1N0cmluZygpO1xyXG4gICAgY29uc3QgYnRuQ29sTWF0Y2ggPSBidG5JZD8ubWF0Y2goLyg/PD1fKVswLTldKy8pPy50b1N0cmluZygpO1xyXG4gICAgaWYgKGJ0bkNvbE1hdGNoICYmIGJ0blJvd01hdGNoKSB7XHJcbiAgICAgICAgbGV0IGJ0bkNvbCA9IHBhcnNlSW50KGJ0bkNvbE1hdGNoLCAxMCk7XHJcbiAgICAgICAgaWYgKE51bWJlci5pc05hTihidG5Db2wpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgYnRuQ29sIHJldG9ybmFkbyBjb21vIE5hTiwgcmV2ZXJ0aWRvIHBhcmEgMWApO1xyXG4gICAgICAgICAgICBidG5Db2wgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYnRuUm93ID0gcGFyc2VJbnQoYnRuUm93TWF0Y2gsIDEwKTtcclxuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGJ0blJvdykpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBidG5Sb3cgcmV0b3JuYWRvIGNvbW8gTmFOLCByZXZlcnRpZG8gcGFyYSAxYCk7XHJcbiAgICAgICAgICAgIGJ0blJvdyA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGlSID0gMDsgaVIgPCBhcnJheVJvd3MubGVuZ3RoOyBpUisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzVmFsaWRSb3dBcnJheSA9IGFycmF5Um93cy5ldmVyeSgocm93KSA9PiByb3cgaW5zdGFuY2VvZiBIVE1MVGFibGVSb3dFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKGlSID09PSAwICYmIGlzVmFsaWRSb3dBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlDb25zdWx0YXNOdW0gPSBnZXRDb25zdWx0YXNOdW1zKGFycmF5Um93c1tpUl0pID8/IFswXTsgLy9vYnTDqW0gb3MgbsO6bWVyb3MgZG9zIGhlYWRlcnMgZGUgY29uc3VsdGEgbmEgZm9ybWEgZGUgdW0gYXJyYXlcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5DZWxzID0gYXJyYXlSb3dzW2lSXS5jaGlsZEVsZW1lbnRDb3VudDtcclxuICAgICAgICAgICAgY29uc3QgYXJyYXlDZWxzSWRzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlDaCA9IDE7IGlDaCA8IG5DZWxzOyBpQ2grKykge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlDZWxzSWRzLnB1c2goYXJyYXlSb3dzW2lSXS5jaGlsZHJlbltpQ2hdLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaVIgIT09IGFycmF5Um93cy5sZW5ndGggLSAxICYmIGFycmF5Q29uc3VsdGFzTnVtKSB7XHJcbiAgICAgICAgICAgICAgICByb3dWYWx1ZXMgPSBnZXRSb3dWYWx1ZXMoYXJyYXlSb3dzLCBhcnJheUNvbnN1bHRhc051bSwgYXJyYXlDZWxzSWRzKSA/PyBbXCJcIl07XHJcbiAgICAgICAgICAgICAgICBpZiAocm93VmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiVmFsdWVzID0gWy4uLnRhYlZhbHVlcywgLi4ucm93VmFsdWVzXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpVCA9IGJ0bkNvbCAtIDI7IGlUIDwgdGFiVmFsdWVzLmxlbmd0aDsgaVQgKz0gMykge1xyXG4gICAgICAgICAgICBjb2x1bW5WYWx1ZXMgPSBbLi4uY29sdW1uVmFsdWVzLCB0YWJWYWx1ZXNbaVRdXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFycmF5Q29uc3VsdGFzTnVtICYmXHJcbiAgICAgICAgICAgIGJ0bkNvbCAtIDEgPT09IGFycmF5Q29uc3VsdGFzTnVtW2J0bkNvbCAtIDJdICYmXHJcbiAgICAgICAgICAgIGNvbHVtblZhbHVlcykge1xyXG4gICAgICAgICAgICAvL2RlZmluZSBxdWFsIGNvbHVuYSBzZXLDoSB1dGlsaXphZGEgZGUgYWNvcmRvIGNvbSBhIHBvc2nDp8OjbyBkbyBib3TDo28gZSB2YWxpZGFuZG8gc2UgaMOhIGFsZ3VtIHByZWVuY2hpbWVudG8gbmEgY29sdW5hXHJcbiAgICAgICAgICAgIGxldCBzbGljZWRFcnJvciA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dEFjYyA9IDA7XHJcbiAgICAgICAgICAgIGxldCBwcm90b2NvbG9OdW0gPSAwO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHByb3RvY29sVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJwb2xsb2NrM1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb3RvY29sb051bSA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicG9sbG9jazdcIjpcclxuICAgICAgICAgICAgICAgICAgICBwcm90b2NvbG9OdW0gPSA3O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBzbGljZWRFcnJvciA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChwcm90b2NvbFZhbHVlID8/IG51bGwsIFwicHJvdG9jb2xvXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvdG9jb2xvTnVtID09PSAzIHx8IHByb3RvY29sb051bSA9PT0gNykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaVIgPSAwOyBpUiA8IGJ0blJvdyAtIDE7IGlSKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnQ2VsSW5wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhYklucFJvd0RDdXQkezIgKyBpUn1fJHtidG5Db2x9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdDZWxJbnAgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpUiA8IGJ0blJvdyAtIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWN1bXVsYSB2YWxvciBkZSBpbnB1dHMgbmEgY29sdW5hIChlbSBjb3JyZXRvIGZ1bmNpb25hbWVudG8sIHBhcmEgcm93cyBzZW0gbyBpbnB1dCBkZSBzb21hdMOzcmlvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdDZWxJbnAgJiYgdGFyZ0NlbElucC52YWx1ZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VGbG9hdChwYXJzZUZsb2F0KHRhcmdDZWxJbnA/LnZhbHVlKS50b0ZpeGVkKDQpKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGB0YXJnQ2VsSW5wLnZhbHVlIHJldG9ybmFkbyBjb21vIE5hTiwgcmV2ZXJ0aWRvIHBhcmEgMGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xBY2MgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sQWNjICs9IHBhcnNlRmxvYXQocGFyc2VGbG9hdCh0YXJnQ2VsSW5wPy52YWx1ZSkudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlSIDwgYnRuUm93IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pbmljaWEgYnVzY2EgZSB2YWxpZGHDp8OjbyBwYXJhIGVuY29udHJhciByb3cgZG8gYm90w6NvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0Ym9keVF1ZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWJUYm9keURDdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGJvZHlRdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRCb2R5Q2hpbGRyZW4gPSBBcnJheS5mcm9tKHRib2R5UXVlcnkuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0Qm9keUNoaWxkcmVuICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRCb2R5Q2hpbGRyZW4uZXZlcnkoKHRCb2R5Q2hpbGQpID0+IHRCb2R5Q2hpbGQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaUMgPSAwOyBpQyA8IHRCb2R5Q2hpbGRyZW4ubGVuZ3RoOyBpQysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbm5lcklucCA9IHRCb2R5Q2hpbGRyZW5baUNdLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdEJvZHlDaGlsZHJlbltpQ10uaGlkZGVuICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRBY2MgPCBwcm90b2NvbG9OdW0gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lcklucCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lcklucC52YWx1ZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEFjYysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbm5lcklucC52YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lcklucC52YWx1ZSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEFjYysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQodEJvZHlDaGlsZHJlbiA/PyBudWxsLCBcInRCb2R5Q2hpbGRyZW5cIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlcG9zaXRhIHZhbG9yIG5vIMO6bHRpbW8gaW5wdXQgZGEgY29sdW5hIChlbSBjb3JyZXRvIGZ1bmNpb25hbWVudGUsIG8gZGUgc29tYXTDs3JpbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXRBY2MgPT09IHByb3RvY29sb051bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnQ2VsSW5wLnZhbHVlID0gY29sQWNjLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2xBY2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE8gRElBTE9HIERFIEFMRVJUQVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYE7Dum1lcm8gZGUgcHJlZW5jaGltZW50b3MgaW5zdWZpY2llbnRlLiBOw7ptZXJvIG9idGlkbzogJHtpbnB1dEFjY307IE7Dum1lcm8gZXhpZ2lkbzogM2ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gb2J0ZW5kbyBuw7ptZXJvIGRlIHByb3RvY29sby5cbiAgICAgICAgTsO6bWVybyBvYnRpZG86ICR7cHJvdG9jb2xvTnVtID8/IDB9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoIWNvbHVtblZhbHVlcykge1xyXG4gICAgICAgICAgICAvL1RPRE8gRElBTE9HIERFIEFMRVJUQVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG59XHJcbmZ1bmN0aW9uIGdldENvbnN1bHRhc051bXMoYXJyYXlSb3cpIHtcclxuICAgIGNvbnN0IHN0ckNvbnN1bHRhc051bSA9IGFycmF5Um93LmlubmVyVGV4dC5yZXBsYWNlQWxsKC9bXFxEXS9nLCBcIlwiKTtcclxuICAgIGxldCBhcnJheUNvbnN1bHRhc051bSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaUwgPSAwOyBpTCA8IHN0ckNvbnN1bHRhc051bS5sZW5ndGg7IGlMKyspIHtcclxuICAgICAgICBsZXQgY29uc3VsdGFzTGV0dGVyID0gcGFyc2VJbnQoc3RyQ29uc3VsdGFzTnVtLnNsaWNlKDAgKyBpTCwgMSArIGlMKSA/PyBcIjBcIiwgMTApO1xyXG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oY29uc3VsdGFzTGV0dGVyKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYGNvbnN1bHRhc0xldHRlciByZXRvcm5hZG8gY29tbyBOYU4sIHJldmVydGlkbyBwYXJhIDFgKTtcclxuICAgICAgICAgICAgY29uc3VsdGFzTGV0dGVyID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyYXlDb25zdWx0YXNOdW0gPSBhcnJheUNvbnN1bHRhc051bS5jb25jYXQoY29uc3VsdGFzTGV0dGVyKTtcclxuICAgICAgICBpZiAoaUwgPT09IHN0ckNvbnN1bHRhc051bS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheUNvbnN1bHRhc051bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0Um93VmFsdWVzKGFycmF5Um93cywgYXJyYXlDb25zdWx0YXNOdW0sIGFycmF5Q2VsSWRzKSB7XHJcbiAgICBjb25zdCBhcnJheVJvd1ZhbHVlcyA9IFtcIlwiXTtcclxuICAgIGFycmF5Q29uc3VsdGFzTnVtLmZvckVhY2goKG51bSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbnVtID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIG51bSA9IHBhcnNlSW50KG51bSwgMTApO1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKG51bSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgTsO6bWVybyBkZSBjb25zdWx0YSByZXRvcm5hZG8gY29tbyBOYU4uIFJldmVydGlkbyBwYXJhIDAuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICh0eXBlb2YgYXJyYXlDZWxJZHNbMF0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBjb25zdCBpZE1hdGNoID0gYXJyYXlDZWxJZHNbMF0/Lm1hdGNoKC9bMC05XSsoPz1fKS8pO1xyXG4gICAgICAgIGlmIChpZE1hdGNoKSB7XHJcbiAgICAgICAgICAgIGxldCBudW1Sb3cgPSAoYXJyYXlDZWxJZHNbMF0gPSBwYXJzZUludChpZE1hdGNoLnRvU3RyaW5nKCksIDEwKSk7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4obnVtUm93KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBudW1Sb3cgcmV0b3JuYWRvIGNvbW8gTmFOLCByZXZlcnRpZG8gcGFyYSAxYCk7XHJcbiAgICAgICAgICAgICAgICBudW1Sb3cgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChudW1Sb3cgIT09IGFycmF5Um93cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGlDb2wgPSAwOyBpQ29sIDwgYXJyYXlDb25zdWx0YXNOdW0ubGVuZ3RoOyBpQ29sKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnQ2VsSW5wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRhYklucFJvd0RDdXQke251bVJvd31fJHsxICsgYXJyYXlDb25zdWx0YXNOdW1baUNvbF19YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdDZWxJbnAgJiYgdGFyZ0NlbElucCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdDZWxJbnAudmFsdWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5Um93VmFsdWVzLnB1c2godGFyZ0NlbElucC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQodGFyZ0NlbElucCA/PyBudWxsLCBcInRhcmdDZWxJbnBcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlSb3dWYWx1ZXMubGVuZ3RoID09PSBhcnJheUNvbnN1bHRhc051bS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5Um93VmFsdWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcnJheVJvd1ZhbHVlcztcclxufVxyXG4iLCIvL25lc3NlIGZpbGUgZXN0w6NvIHByZXNlbnRlcyBwcmluY2lwYWxtZW50ZSBhcyBmdW7Dp8O1ZXMgcmVsYWNpb25hZGFzIMOgIGV4aWfDqm5jaWEgZGUgbW9kZWxvIHRleHR1YWwgZSBkZSB2aXN1YWxpemHDp8Ojb1xyXG5pbXBvcnQgKiBhcyBHbG9iYWxNb2RlbCBmcm9tIFwiLi4vLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2dNb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBFcnJvckhhbmRsZXIgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9lcnJvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgUGVyc29uIH0gZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9jbGFzc2VzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja0lubmVyQ29sR3JvdXBzKHBhcmVudEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHZhbGlkQ29sR3JvdXBzQ2hpbGRDb3VudCA9IFtdO1xyXG4gICAgbGV0IGFyZUFsbENvb2xHcm91cHNTaW1pbGFyID0gZmFsc2U7XHJcbiAgICBpZiAocGFyZW50RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgY29sR3JvdXBzID0gQXJyYXkuZnJvbShwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJjb2xncm91cFwiKSk7XHJcbiAgICAgICAgY29uc3QgYXJlQ29sR3JvdXBWYWxpZHMgPSBjb2xHcm91cHMuZXZlcnkoKGNvbEdyb3VwKSA9PiBjb2xHcm91cCBpbnN0YW5jZW9mIEhUTUxUYWJsZUNvbEVsZW1lbnQpO1xyXG4gICAgICAgIC8vcG9wdWxhIGFycmF5cyBkZSBjb2xncm91cHMgY29tIGJhc2UgZW0gZmlsdHJhZ2VtIGRlIGluc3TDom5jaWFcclxuICAgICAgICBpZiAoYXJlQ29sR3JvdXBWYWxpZHMgJiYgY29sR3JvdXBzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xHcm91cHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbEdycENoaWxkcyA9IGNvbEdyb3Vwc1tpXS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHMgPSBBcnJheS5mcm9tKGNvbEdycENoaWxkcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29scy5ldmVyeSgoY29sKSA9PiBjb2wgaW5zdGFuY2VvZiBIVE1MVGFibGVDb2xFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkQ29sR3JvdXBzQ2hpbGRDb3VudC5wdXNoKGNvbEdyb3Vwc1tpXS5jaGlsZEVsZW1lbnRDb3VudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xzSW5zdGFuY2VzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkSW5zdGFuY2UgPSBgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY29sc1tqXSkuc2xpY2UoOCwgLTEpID8/IFwibnVsbFwifWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHNJbnN0YW5jZXMucHVzaChjaGlsZEluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkSW5zdGFuY2UgIT09IGBIVE1MVGFibGVDb2xFbGVtZW50YCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChjb2xzW2pdID8/IG51bGwsIFwiY2hpbGQgPGNvbD5cIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkQ29scyA9IGNvbHMuZmlsdGVyKChjb2wpID0+IGNvbCBpbnN0YW5jZW9mIEhUTUxUYWJsZUNvbEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkQ29sR3JvdXBzQ2hpbGRDb3VudC5wdXNoKHZhbGlkQ29scy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIGNvbEdyb3Vwcy5cbiAgICAgIGFyZUNvbEdyb3VwVmFsaWRzOiAke2FyZUNvbEdyb3VwVmFsaWRzID8/IGZhbHNlfTtcbiAgICAgIEluc3TDom5jaWEgb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjb2xHcm91cHMpLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn07XG4gICAgICBMZW5ndGggb2J0aWRhOiAke2NvbEdyb3Vwcy5sZW5ndGggPz8gMH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9maWx0cmEgYXJyYXkgZGUgY29sZ3JvdXBzIHbDoWxpZGEgY29tIGJhc2UgZW0gY29sdW5hcyBkZSB0YW1hbmhvIHNpbWlsYXJcclxuICAgICAgICBjb25zdCBwYWlyZWRDb2xHcm91cHNWYWxpZCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgdmFsaWRDb2xHcm91cHNDaGlsZENvdW50Lmxlbmd0aDsgbSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICgodmFsaWRDb2xHcm91cHNDaGlsZENvdW50W21dID0gdmFsaWRDb2xHcm91cHNDaGlsZENvdW50W20gLSAxXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWlyZWRDb2xHcm91cHNWYWxpZC5wdXNoKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBwYXIgZGUgQ29sIEdyb3Vwcy5cbiAgICAgICAgICBQYXIgaW52YWxpZGFkbzogJHt2YWxpZENvbEdyb3Vwc0NoaWxkQ291bnRbbV0gPz8gXCJudWxsXCJ9IGNvbSAke3ZhbGlkQ29sR3JvdXBzQ2hpbGRDb3VudFttIC0gMV0gPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFpcmVkQ29sR3JvdXBzVmFsaWQucHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy92ZXJpZmljYSBzZSB0b2RvcyBvcyBwYXJlcyBzw6NvIHbDoWxpZG9zIHBhcmEsIGVtIGNhc28gbmVnYXRpdm8sIGZvcm5lY2VyIHdhcm5cclxuICAgICAgICBpZiAocGFpcmVkQ29sR3JvdXBzVmFsaWQuZXZlcnkoKHBhaXJlZENvbEdyb3VwKSA9PiBwYWlyZWRDb2xHcm91cCA9PT0gdHJ1ZSkpIHtcclxuICAgICAgICAgICAgYXJlQWxsQ29vbEdyb3Vwc1NpbWlsYXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBHcnVwb3MgZGUgQ29sdW5hcyBuw6NvIHPDo28gc2ltaWxhcmVzIG5vIG7Dum1lcm8gZGUgY2hpbGRyZW5gKTtcclxuICAgICAgICAgICAgYXJlQWxsQ29vbEdyb3Vwc1NpbWlsYXIgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3ZhbGlkQ29sR3JvdXBzQ2hpbGRDb3VudD8ubGVuZ3RoID8/IDAsIGFyZUFsbENvb2xHcm91cHNTaW1pbGFyXTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVGFiREN1dExheW91dChwcm90b2NvbG8sIHRhYkRDKSB7XHJcbiAgICBjb25zdCBib2R5VHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dEJvZHl0eXBlXCIpO1xyXG4gICAgaWYgKHByb3RvY29sbyAmJlxyXG4gICAgICAgIHRhYkRDICYmXHJcbiAgICAgICAgYm9keVR5cGUgJiZcclxuICAgICAgICAoYm9keVR5cGUgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICBib2R5VHlwZSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uRWxlbWVudE1hdGNoNyA9IHByb3RvY29sbz8udmFsdWVcclxuICAgICAgICAgICAgLm1hdGNoKC9ecG9sbG9jazckL2kpXHJcbiAgICAgICAgICAgID8udG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBvcHRpb25FbGVtZW50TWF0Y2gzID0gcHJvdG9jb2xvPy52YWx1ZVxyXG4gICAgICAgICAgICAubWF0Y2goL15wb2xsb2NrMyQvaSlcclxuICAgICAgICAgICAgPy50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0IG9wc1Byb3RvY29sbyA9IEFycmF5LmZyb20ocHJvdG9jb2xvLmNoaWxkcmVuKTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJlZE9wc1Byb3RvY29sbyA9IG9wc1Byb3RvY29sby5maWx0ZXIoKGNoaWxkUHJvdG9jb2xvKSA9PiBjaGlsZFByb3RvY29sbyBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KTtcclxuICAgICAgICBpZiAoZmlsdGVyZWRPcHNQcm90b2NvbG8ubGVuZ3RoIDwgb3BzUHJvdG9jb2xvLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEFsZ3VtIGVsZW1lbnRvcyBkZSBQcm90b2NvbG8gbsOjbyBmb3JhbSByZWNvbmhlY2lkb3MgY29tbyBvcMOnw7Vlcy4gVG90YWwgZGUgcmVjb25oZWNpbWVudG9zOiAke2ZpbHRlcmVkT3BzUHJvdG9jb2xvLmxlbmd0aH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaU9wID0gMDsgaU9wIDwgZmlsdGVyZWRPcHNQcm90b2NvbG8ubGVuZ3RoIC0gMTsgaU9wKyspIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbkVsZW1lbnRNYXRjaDMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5VGFiSWRzID0gY2hlY2tUYWJSb3dzSWRzKHRhYkRDKTtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJheVRhYklkcyAmJiBhcnJheVRhYklkcy5sZW5ndGggIT09IHRhYkRDLnJvd3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2VuZGVyZWRJZHMgPSBHbG9iYWxNb2RlbC5maWx0ZXJJZHNCeUdlbmRlcihhcnJheVRhYklkcywgYm9keVR5cGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5VHlwZS52YWx1ZSA9PT0gXCJtYXNjdWxpbm9cIiB8fCBib2R5VHlwZS52YWx1ZSA9PT0gXCJmZW1pbmlub1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZW5kZXJlZElkcyAmJiBnZW5kZXJlZElkcy5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRJZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlHID0gMDsgaUcgPCBnZW5kZXJlZElkcy5sZW5ndGg7IGlHKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpUiA9IDA7IGlSIDwgYXJyYXlUYWJJZHMubGVuZ3RoOyBpUisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZW5kZXJlZElkc1tpR10udG9Mb3dlckNhc2UoKSA9PT0gYXJyYXlUYWJJZHNbaVJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZTEgPSBnZW5kZXJlZElkc1tpR10uY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZTIgPSBnZW5kZXJlZElkc1tpR10uc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xpY2UxICYmIHNsaWNlMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcGl0YWxpemVkR2VuZGVyZWRJZCA9IHNsaWNlMSArIHNsaWNlMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVkSWRzLnB1c2goYHJvdyR7Y2FwaXRhbGl6ZWRHZW5kZXJlZElkfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVkVHJzID0gQXJyYXkuZnJvbSh0YWJEQy5xdWVyeVNlbGVjdG9yQWxsKFwidHIudGFiUm93REN1dE1lZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpVHIgPSAwOyBpVHIgPCBtZWRUcnMubGVuZ3RoOyBpVHIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lZFRyc1tpVHJdLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbm5lcklucCA9IG1lZFRyc1tpVHJdLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJJbnAgJiYgaW5uZXJJbnAucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJJbnAucmVtb3ZlQXR0cmlidXRlKFwicmVxdWlyZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZWRUcnNbaVRyXS5pZD8uc2xpY2UoLTQpICE9PSBcIkNveGFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJJbnAudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaU1hdCA9IDA7IGlNYXQgPCBtYXRjaGVkSWRzLmxlbmd0aDsgaU1hdCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlZFRyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobWF0Y2hlZElkc1tpTWF0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZWRUcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1Jvd0hpZGRlbiA9IG1hdGNoZWRUci5oaWRkZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1Jvd0hpZGRlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZFRyLnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbm5lcklucCA9IG1hdGNoZWRUci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lcklucCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJJbnAuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gbmEgdmFsaWRhw6fDo28gZGUgaWRzIGRlIHJvdy4gRWxlbWVudG8gJHtKU09OLnN0cmluZ2lmeShnZW5kZXJlZElkcyl9OyBOw7ptZXJvIG9idGlkbyAke2dlbmRlcmVkSWRzPy5sZW5ndGggPz8gbnVsbH07IE7Dum1lcm8gZXNwZXJhZG86IDNgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChib2R5VHlwZS52YWx1ZSA9PT0gXCJuZXV0cm9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuZGVyZWRJZHMgJiYgZ2VuZGVyZWRJZHMubGVuZ3RoID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVkSWRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpRyA9IDA7IGlHIDwgZ2VuZGVyZWRJZHMubGVuZ3RoOyBpRysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaVIgPSAwOyBpUiA8IGFycmF5VGFiSWRzLmxlbmd0aDsgaVIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuZGVyZWRJZHNbaUddLnRvTG93ZXJDYXNlKCkgPT09IGFycmF5VGFiSWRzW2lSXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2UxID0gZ2VuZGVyZWRJZHNbaUddLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2UyID0gZ2VuZGVyZWRJZHNbaUddLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FwaXRhbGl6ZWRHZW5kZXJlZElkID0gc2xpY2UxICsgc2xpY2UyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZElkcy5wdXNoKGByb3cke2NhcGl0YWxpemVkR2VuZGVyZWRJZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lZFRycyA9IEFycmF5LmZyb20odGFiREMucXVlcnlTZWxlY3RvckFsbChcInRyLnRhYlJvd0RDdXRNZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaVRyID0gMDsgaVRyIDwgbWVkVHJzLmxlbmd0aDsgaVRyKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWRUcnNbaVRyXS5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5uZXJJbnAgPSBtZWRUcnNbaVRyXS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVySW5wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZWRUcnNbaVRyXS5pZD8uc2xpY2UoLTQpICE9PSBcIkNveGFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJJbnAudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaU0gPSAwOyBpTSA8IG1hdGNoZWRJZHMubGVuZ3RoOyBpTSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlZFRyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobWF0Y2hlZElkc1tpTV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVkVHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNSb3dIaWRkZW4gPSBtYXRjaGVkVHIuaGlkZGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNSb3dIaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWRUci5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbm5lcklucCA9IG1hdGNoZWRUci5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJJbnAgJiYgbWF0Y2hlZFRyLmlkPy5zbGljZSgtNCkgIT09IFwiQ294YVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJJbnAucmVtb3ZlQXR0cmlidXRlKFwicmVxdWlyZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gbmEgdmFsaWRhw6fDo28gZGUgaWRzIGRlIHJvdy4gRWxlbWVudG8gJHtKU09OLnN0cmluZ2lmeShnZW5kZXJlZElkcyl9OyBOw7ptZXJvIG9idGlkbyAke2dlbmRlcmVkSWRzPy5sZW5ndGggPz8gbnVsbH07IE7Dum1lcm8gZXNwZXJhZG86IDNgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoXCJ2YWxpZGFuZG8gLnZhbHVlIGRlIGJvZHlUeXBlXCIsIGJvZHlUeXBlPy52YWx1ZSA/PyBudWxsLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIG5hIHZlcmlmaWNhw6fDo28gZG8gbsO6bWVybyBkZSByb3dzLiBFbGVtZW50byAke0pTT04uc3RyaW5naWZ5KGFycmF5VGFiSWRzKX07IE7Dum1lcm8gb2J0aWRvOiAke2FycmF5VGFiSWRzPy5sZW5ndGggPz8gbnVsbH07IE7Dum1lcm8gZXNwZXJhZG86ICR7dGFiREMucm93cy5sZW5ndGh9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJwb2xsb2NrM1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbkVsZW1lbnRNYXRjaDcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lZFRycyA9IEFycmF5LmZyb20odGFiREMucXVlcnlTZWxlY3RvckFsbChcInRyLnRhYlJvd0RDdXRNZWRcIikpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaVRyID0gMDsgaVRyIDwgbWVkVHJzLmxlbmd0aDsgaVRyKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1Jvd0hpZGRlbiA9IG1lZFRyc1tpVHJdLmhpZGRlbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNSb3dIaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVkVHJzW2lUcl0ucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbm5lcklucCA9IG1lZFRyc1tpVHJdLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVySW5wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lcklucC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBcInBvbGxvY2s3XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoXCJvYnRlbmRvIHBvbGxvY2sudmFsdWVcIiwgcHJvdG9jb2xvPy52YWx1ZSA/PyBudWxsLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJwb2xsb2NrM1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoYm9keVR5cGUgPz8gbnVsbCwgXCJib2R5VHlwZVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgcmV0dXJuIFwicG9sbG9jazNcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBcInBvbGxvY2szXCI7XHJcbn1cclxuZnVuY3Rpb24gY2hlY2tUYWJSb3dzSWRzKHRhYikge1xyXG4gICAgY29uc3QgYXJyYXlUYWJJZHMgPSBbXTtcclxuICAgIGlmICh0YWIuaWQgPT09IFwidGFiREN1dFwiKSB7XHJcbiAgICAgICAgY29uc3QgdGFibGVSb3dzID0gQXJyYXkuZnJvbSh0YWIucXVlcnlTZWxlY3RvckFsbChcInRyLnRhYlJvd0RDdXRNZWRcIikpO1xyXG4gICAgICAgIGZvciAobGV0IGlSID0gMDsgaVIgPCB0YWJsZVJvd3MubGVuZ3RoOyBpUisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvd0lkID0gdGFibGVSb3dzW2lSXS5pZDtcclxuICAgICAgICAgICAgY29uc3Qgcm93SWRNYXRjaCA9IHJvd0lkLm1hdGNoKC9ecm93Lyk/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmIChyb3dJZE1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRSb3dJZCA9IHJvd0lkLnNsaWNlKDMpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBhcnJheVRhYklkcy5wdXNoKHNsaWNlZFJvd0lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5zdHJpbmdFcnJvcihgb2J0ZW5kbyBpZCBkYSByb3cgJHt0YWJsZVJvd3NbaVJdID8/IG51bGx9YCwgcm93SWQgPz8gbnVsbCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5zdHJpbmdFcnJvcihgb2J0ZW5kbyBpZCBkYSB0YWJsZSAke3RhYiA/PyBudWxsfWAsIHRhYi5pZCA/PyBudWxsLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyYXlUYWJJZHM7XHJcbn1cclxuLy9jb3JyZcOnw6NvIHBhcmEgbGltaXRhw6fDo28gZGEgZsOzcm11bGEgZGUgUEdDXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1BHQ0RlY2F5aW5nKHBlcnNvbiwgUEdDLCB0YXJnSW5wUEdDKSB7XHJcbiAgICBsZXQgZm91bmREZWNheVBvaW50ID0gZmFsc2U7XHJcbiAgICBsZXQgc3VtQWNjID0gMTtcclxuICAgIGNvbnN0IGluaXRTdW1EQ3V0ID0gcGVyc29uLnN1bURDdXQ7XHJcbiAgICBjb25zdCBkZWNyZWFzZWRQZXJzb24gPSBQZXJzb24uY2xvbmVQZXJzb24ocGVyc29uKTtcclxuICAgIGNvbnN0IHNwYW5Sb3VuZGluZ0FsZXJ0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhbGVydF8ke3RhcmdJbnBQR0MuaWR9YCk7XHJcbiAgICBpZiAoIShzcGFuUm91bmRpbmdBbGVydEljb24gaW5zdGFuY2VvZiBIVE1MU3BhbkVsZW1lbnQpKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoc3BhblJvdW5kaW5nQWxlcnRJY29uID8/IG51bGwsIFwic3BhblJvdW5kaW5nQWxlcnRJY29uXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChzcGFuUm91bmRpbmdBbGVydEljb24uaGlkZGVuID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBzcGFuUm91bmRpbmdBbGVydEljb24uaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoZGVjcmVhc2VkUGVyc29uKSB7XHJcbiAgICAgICAgZGVjcmVhc2VkUGVyc29uLnN1bURDdXQgPSBkZWNyZWFzZWRQZXJzb24uc3VtREN1dCAtIDE7XHJcbiAgICAgICAgbGV0IGRlY3JlYXNlZFBHQyA9IGRlY3JlYXNlZFBlcnNvbi5jYWxjUEdDKGRlY3JlYXNlZFBlcnNvbik7XHJcbiAgICAgICAgLy9jYXNvIHBhZHLDo28gZGUgZGVjYXlcclxuICAgICAgICBpZiAoZGVjcmVhc2VkUEdDID4gUEdDKSB7XHJcbiAgICAgICAgICAgIGlmIChzcGFuUm91bmRpbmdBbGVydEljb24/LmhpZGRlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgc3BhblJvdW5kaW5nQWxlcnRJY29uLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGFyckRlY3JlYXNlZFBHQyA9IFtdO1xyXG4gICAgICAgICAgICB3aGlsZSAoZGVjcmVhc2VkUGVyc29uLnN1bURDdXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdW1BY2MrKztcclxuICAgICAgICAgICAgICAgIGRlY3JlYXNlZFBlcnNvbi5zdW1EQ3V0ID0gZGVjcmVhc2VkUGVyc29uLnN1bURDdXQgLSAxO1xyXG4gICAgICAgICAgICAgICAgZGVjcmVhc2VkUEdDID0gZGVjcmVhc2VkUGVyc29uLmNhbGNQR0MoZGVjcmVhc2VkUGVyc29uKTtcclxuICAgICAgICAgICAgICAgIGFyckRlY3JlYXNlZFBHQy5wdXNoKGRlY3JlYXNlZFBHQyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVjcmVhc2VkUEdDIDwgUEdDKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3VtQWNjID4gOTk5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBDaWNsbyAyIGV4YXVyaWRvLmApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhcnJEZWNyZWFzZWRQR0MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjdG9yTm9ybURlY2F5ZWRQR0MgPSAoKGluaXRTdW1EQ3V0IC0gMjYwKSAvIDEwMCkgKiA1O1xyXG4gICAgICAgICAgICAgICAgUEdDID1cclxuICAgICAgICAgICAgICAgICAgICBNYXRoLmNlaWwoKE1hdGgubWF4KC4uLmFyckRlY3JlYXNlZFBHQykgKyAwLjA1KSAqIDEwKSAvIDEwICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjdG9yTm9ybURlY2F5ZWRQR0M7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVjcmVhc2VkUGVyc29uLnN1bURDdXQgPiA1MTUpIHtcclxuICAgICAgICAgICAgICAgICAgICBQR0MgPSA2MC41O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgUEdDID0gZGVjcmVhc2VkUEdDO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvdW5kRGVjYXlQb2ludCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRlY3JlYXNlZFBHQyA8PSBQR0MpIHtcclxuICAgICAgICAgICAgLy9jYXNvcyBlc3BlY8OtZmljb3MgcGFyYSBoYW5kbGluZyBkZSBpbnB1dCBhbsO0bWFsbyAoYWzDqW0gZG8gcG9zc8OtdmVsIHBhcmEgdW0gc2VyIGh1bWFubyksIGV2aXRhbmRvIGJ1Z3Mgbm9zIGxpc3RlbmVycyBkZXZpZG8gYSBOYU4gZSBsb29wcyBkZSBub3JtYWxpemHDp8Ojb1xyXG4gICAgICAgICAgICBpZiAoUEdDID4gMTAwIHx8IGRlY3JlYXNlZFBlcnNvbi5zdW1EQ3V0ID4gNTE0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFZhbG9yIGFuw7RtYWxvIGRlIGVudHJhZGEgcGFyYSBzdW1EQ3V0IGUvb3UgUEdDLiBWYWxvciBhcHJveGltYWRvIGZvcm5lY2lkb2ApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwYW5Sb3VuZGluZ0FsZXJ0SWNvbj8uaGlkZGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BhblJvdW5kaW5nQWxlcnRJY29uLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm91bmREZWNheVBvaW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFBHQyA9IDYwLjQ1ICsgMC4wNSAqICgoZGVjcmVhc2VkUGVyc29uPy5zdW1EQ3V0ID8/IDUxNCkgLSA1MTMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5vYmplY3RFcnJvcihcImRlY3JlYXNlZFBlcnNvblwiLCBwZXJzb24gPz8gbnVsbCwgXCJwZXJzb25cIiwgXCI2XCIsIHNsaWNlZEVycm9yKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbZm91bmREZWNheVBvaW50LCBQR0NdO1xyXG59XHJcbiIsIi8vIGltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuZXhwb3J0IGNsYXNzIEpTT05TdG9yYWdlciB7XHJcbiAgICAjaWQ7XHJcbiAgICAjdmFsdWU7XHJcbiAgICBjb25zdHJ1Y3RvcihpZCwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLiNpZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuI3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGdldCBzaG93SW5wSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI2lkO1xyXG4gICAgfVxyXG4gICAgZ2V0IHNob3dJbnBWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQgc2hvd0FsbEluZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzLiNpZCwgdGhpcy4jdmFsdWVdO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBKU09OVGl0bGVTdG9yYWdlciB7XHJcbiAgICAjdGl0bGU7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMuI3RpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcclxuICAgIH1cclxuICAgIGdldCBzaG93SW5wVGl0bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI3RpdGxlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBQZXJzb24ge1xyXG4gICAgZ2VuO1xyXG4gICAgYWdlO1xyXG4gICAgd2VpZ2h0O1xyXG4gICAgaGVpZ2h0O1xyXG4gICAgc3VtREN1dDtcclxuICAgIGF0dkx2bDtcclxuICAgIGNvbnN0cnVjdG9yKGdlbiwgYWdlLCB3ZWlnaHQsIGhlaWdodCwgc3VtREN1dCwgYXR2THZsKSB7XHJcbiAgICAgICAgdGhpcy5nZW4gPSBnZW47XHJcbiAgICAgICAgdGhpcy5hZ2UgPSBhZ2U7XHJcbiAgICAgICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5zdW1EQ3V0ID0gc3VtREN1dDtcclxuICAgICAgICB0aGlzLmF0dkx2bCA9IGF0dkx2bDtcclxuICAgIH1cclxuICAgIGNoZWNrQXR2THZsKHBlcnNvbikge1xyXG4gICAgICAgIGlmIChwZXJzb24gJiYgXCJhdHZMdmxcIiBpbiBwZXJzb24gJiYgdGhpcy5hdHZMdmwgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmF0dkx2bCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNlZGVudGFyaW9cIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMS4yO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImxldmVcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMS40O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vZGVyYWRvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEuNjtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJpbnRlbnNvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEuOTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtdWl0b0ludGVuc29cIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMi4yO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyBjYXNvLiBDYXNvIG9idGlkbzogJHt0aGlzLmF0dkx2bCA/PyBcIm51bGxcIn07IENhc29zIHBvc3PDrXZlaXM6IHNlZGVudMOhcmlvIHx8IGxldmUgfHwgbW9kZXJhZG8gfHwgaW50ZW5zbyB8fCBtdWl0b0ludGVuc29gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYSBkZSBwZXNzb2EuIFZhbG9yIG9idGlkbzogJHtwZXJzb24gPz8gXCJudWxsXCJ9OyBpbnN0w6JuY2lhICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBlcnNvbikuc2xpY2UoOCwgLTEpID8/IFwibnVsbFwifTsgVmFsb3IgZGUgTsOtdmVsIGRlIEF0aXZpZGFkZSBGw61zaWNhIG9idGlkbzogJHt0aGlzLmF0dkx2bCA/PyBcIm51bGxcIn1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgY2FsY0lNQyhwZXJzb24pIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAocGVyc29uICYmXHJcbiAgICAgICAgICAgICAgICBcIndlaWdodFwiIGluIHBlcnNvbiAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWlnaHQgPiAwICYmXHJcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiIGluIHBlcnNvbiAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBJTUMgPSB0aGlzLndlaWdodCAvIHRoaXMuaGVpZ2h0ICoqIDI7XHJcbiAgICAgICAgICAgICAgICBpZiAoSU1DICYmIElNQyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBNTEcgPSB0aGlzLndlaWdodCAtIHRoaXMud2VpZ2h0ICogKElNQyAvIDEwMCkgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSU1DIDwgMTguNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wiYWJhaXhvXCIsIElNQywgTUxHXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoSU1DID49IDE4LjUgJiYgSU1DIDwgMjUuMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wiZXV0cm9maWNvXCIsIElNQywgTUxHXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoSU1DID49IDI1LjAgJiYgSU1DIDwgMzApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcInNvYnJlcGVzb1wiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAzMCAmJiBJTUMgPCAzNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wib2Jlc28xXCIsIElNQywgTUxHXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoSU1DID49IDM1ICYmIElNQyA8IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJvYmVzbzJcIiwgSU1DLCBNTEddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChJTUMgPiA0MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wib2Jlc28zXCIsIElNQywgTUxHXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyBjbGFzc2lmaWNhbmRvIElNQy4gVmFsb3Igb2J0aWRvOiAke0lNQyA/PyAwfTsgVmFsb3JlcyBwb3Nzw612ZWlzIGRldmVtIHNlciBwb3NpdGl2b3NgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gY2FsY3VsYW5kbyBJTUMuIFZhbG9yZXMgdXNhZG9zOiBQZXNvICR7dGhpcy53ZWlnaHQgPz8gMH0gZSBBbHR1cmEgJHt0aGlzLmhlaWdodCA/PyAwfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBkYWRvcyBmb3JuZWNpZG9zLiBFbGVtZW50byBwZXNzb2E6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBlcnNvbikuc2xpY2UoOCwgLTEpID8/IFwibnVsbFwifTsgd2VpZ2h0IHByZXNlbnRlOiAke1wid2VpZ2h0XCIgaW4gcGVyc29uID8/IGZhbHNlfTtcbiAgICAgICAgICBQZXNvIG9idGlkbzogJHt0aGlzLndlaWdodCA/PyAwfTtcbiAgICAgICAgICBoZWlnaHQgcHJlc2VudGU6ICR7XCJoZWlnaHRcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgICAgIEFsdHVyYSBvYnRpZGE6ICR7dGhpcy5oZWlnaHQgPz8gMH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoSU1DRXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihJTUNFcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIFtcIlwiLCAwLCAwXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYWxjUEdDKHBlcnNvbikge1xyXG4gICAgICAgIGlmIChcInN1bURDdXRcIiBpbiBwZXJzb24gJiYgdGhpcy5zdW1EQ3V0ID49IDApIHtcclxuICAgICAgICAgICAgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIE1hbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IERDID0gMS4xMDkzOCAtXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDA4MjY3ICogdGhpcy5zdW1EQ3V0ICtcclxuICAgICAgICAgICAgICAgICAgICAwLjAwMDAwMTYgKiB0aGlzLnN1bURDdXQgKiogMiAtXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDAyNTc0ICogcGVyc29uLmFnZTtcclxuICAgICAgICAgICAgICAgIGlmIChEQyA8PSAwIHx8IE51bWJlci5pc05hTihEQykpIHtcclxuICAgICAgICAgICAgICAgICAgICBEQyA9IDAuMDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgUEdDID0gNDk1IC8gREMgLSA0NTA7XHJcbiAgICAgICAgICAgICAgICBpZiAoUEdDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKFBHQykpIHtcclxuICAgICAgICAgICAgICAgICAgICBQR0MgPSAwLjAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKFBHQyA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFBHQyA9IDEwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBQR0M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgV29tYW4pIHtcclxuICAgICAgICAgICAgICAgIGxldCBEQyA9IDEuMDk5NDkyMSAtXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDA5OTI5ICogdGhpcy5zdW1EQ3V0ICtcclxuICAgICAgICAgICAgICAgICAgICAwLjAwMDAwMjMgKiB0aGlzLnN1bURDdXQgKiogMiAtXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDAxMzkyICogcGVyc29uLmFnZTtcclxuICAgICAgICAgICAgICAgIGlmIChEQyA8PSAwIHx8IE51bWJlci5pc05hTihEQykpIHtcclxuICAgICAgICAgICAgICAgICAgICBEQyA9IDAuMDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgUEdDID0gNDk1IC8gREMgLSA0NTA7XHJcbiAgICAgICAgICAgICAgICBpZiAoUEdDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKFBHQykpIHtcclxuICAgICAgICAgICAgICAgICAgICBQR0MgPSAwLjAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKFBHQyA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFBHQyA9IDEwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBQR0M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgTmV1dHJvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgREMgPSAxLjEwNDQzNjA1IC1cclxuICAgICAgICAgICAgICAgICAgICAwLjAwMDkwOTggKiB0aGlzLnN1bURDdXQgK1xyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwMDAxOTUgKiB0aGlzLnN1bURDdXQgKiogMiAtXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDAxOTgzICogcGVyc29uLmFnZTtcclxuICAgICAgICAgICAgICAgIGlmIChEQyA8PSAwIHx8IE51bWJlci5pc05hTihEQykpIHtcclxuICAgICAgICAgICAgICAgICAgICBEQyA9IDAuMDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgUEdDID0gNDk1IC8gREMgLSA0NTA7XHJcbiAgICAgICAgICAgICAgICBpZiAoUEdDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKFBHQykpIHtcclxuICAgICAgICAgICAgICAgICAgICBQR0MgPSAwLjAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKFBHQyA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFBHQyA9IDEwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBQR0M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBJbnN0w6JuY2lhIGRlIG9iamV0byBpbnbDoWxpZGEuIEluc3TDom5jaWEgb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn1gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhZG8gUHJvcHJpZWRhZGUgc3VtREN1dDpcbiAgICAgIEVzdMOhIHByZXNlbnRlOiAke1wic3VtREN1dFwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICBWYWxvciBvYnRpZG86ICR7dGhpcy5zdW1EQ3V0ID8/IDB9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhbGNUTUIocGVyc29uLCBJTUMsIGZhY3RvckF0bGV0YSwgTUxHKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHBlcnNvbiAmJiBcImF0dkx2bFwiIGluIHBlcnNvbiAmJiB0aGlzLmF0dkx2bCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXR2THZsID09PSBcIm11aXRvSW50ZW5zb1wiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKGZhY3RvckF0bGV0YSA9PT0gXCJNTEdcIiB8fCBmYWN0b3JBdGxldGEgPT09IFwiUGVzb1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmYWN0b3JBdGxldGEgPT09IFwiTUxHXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1MRyAmJiBNTEcgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBUTUIgPSAyNS45ICogTUxHICsgMjg0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcInRpbnNsZXlcIiwgVE1CXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gTUxHLlxuICAgICAgICAgICAgICBWYWxvciBvYnRpZG86ICR7TUxHID8/IDB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZmFjdG9yQXRsZXRhID09PSBcIlBlc29cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJ3ZWlnaHRcIiBpbiBwZXJzb24gJiYgdGhpcy53ZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBUTUIgPSAyNC44ICogdGhpcy53ZWlnaHQgKyAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJ0aW5zbGV5XCIsIFRNQl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIHdlaWdodC5cbiAgICAgICAgICAgICAgVmFsb3Igb2J0aWRvOiAke3RoaXMud2VpZ2h0ID8/IDB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmF0dkx2bCA9PT0gXCJzZWRlbnRhcmlvXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dkx2bCA9PT0gXCJsZXZlXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dkx2bCA9PT0gXCJtb2RlcmFkb1wiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHZMdmwgPT09IFwiaW50ZW5zb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwid2VpZ2h0XCIgaW4gcGVyc29uICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2VpZ2h0ID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiIGluIHBlcnNvbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhZ2VcIiBpbiBwZXJzb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElNQyA8IDI1LjAgJiYgSU1DID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIE1hbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFRNQiA9IDY2ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDEzLjggKiB0aGlzLndlaWdodCArIDUuMCAqIHRoaXMuaGVpZ2h0IC0gNi44ICogdGhpcy5hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJoYXJyaXNCZW5lZGljdFwiLCBUTUJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgV29tYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBUTUIgPSA2NTUgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoOS42ICogdGhpcy53ZWlnaHQgKyAxLjkgKiB0aGlzLmhlaWdodCAtIDQuNyAqIHRoaXMuYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wiaGFycmlzQmVuZWRpY3RcIiwgVE1CXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIE5ldXRybykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFRNQiA9IDM2MC41ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDExLjcgKiB0aGlzLndlaWdodCArIDMuNDUgKiB0aGlzLmhlaWdodCAtIDUuNzUgKiB0aGlzLmFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImhhcnJpc0JlbmVkaWN0XCIsIFRNQl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgUGVyc29uLiBJbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGVyc29uKS5zbGljZSg4LCAtMSkgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoSU1DID49IDI1LjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZXJzb24gaW5zdGFuY2VvZiBNYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBUTUIgPSAxMCAqIHRoaXMud2VpZ2h0ICsgNi4yNSAqIHRoaXMuaGVpZ2h0IC0gNS4wICogdGhpcy5hZ2UgKyA1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJtaWZmbGluU3RKZW9yXCIsIFRNQl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwZXJzb24gaW5zdGFuY2VvZiBXb21hbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFRNQiA9IDEwICogdGhpcy53ZWlnaHQgKyA2LjI1ICogdGhpcy5oZWlnaHQgLSA1LjAgKiB0aGlzLmFnZSAtIDE2MTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wibWlmZmxpblN0SmVvclwiLCBUTUJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgTmV1dHJvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgVE1CID0gMTAgKiB0aGlzLndlaWdodCArIDYuMjUgKiB0aGlzLmhlaWdodCAtIDUuMCAqIHRoaXMuYWdlIC0gNzg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm1pZmZsaW5TdEplb3JcIiwgVE1CXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYSBkZSBQZXJzb24uIEluc3TDom5jaWEgb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwocGVyc29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoOCwgLTEpfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBJTUMuIElNQyBvYnRpZG86ICR7SU1DID8/IDB9OyBWYWxvciBkZXZlIHNlciBuw7ptZXJpY28sIHBvc2l0aXZvIGUgZmxvYXRgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBwcm9wcmllZGFkZXMgZGUgcGVyc29uLlxuICAgICAgICAgICAgd2VpZ2h0IHByZXNlbnRlOiAke1wid2VpZ2h0XCIgaW4gcGVyc29uID8/IGZhbHNlfTtcbiAgICAgICAgICAgIFZhbG9yIGRlIHdlaWdodCBvYnRpZG86ICR7dGhpcy53ZWlnaHQgPz8gMH07XG4gICAgICAgICAgICBoZWlnaHQgcHJlc2VudGU6ICR7XCJoZWlnaHRcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgICAgICAgVmFsb3IgZGUgaGVpZ2h0IG9idGlkbzogJHt0aGlzLmhlaWdodCA/PyAwfTtcbiAgICAgICAgICAgIGFnZSBwcmVzZW50ZTogJHtcImFnZVwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICAgICAgICBgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGF0dkx2bCBlL291IGZhY3RvckF0bGV0YS5cbiAgICAgICAgICAgIGF0dkx2bCBvYnRpZG86ICR7dGhpcy5hdHZMdmwgPz8gXCJudWxsXCJ9XG4gICAgICAgICAgICBGYXRvciBvYnRpZG86ICR7ZmFjdG9yQXRsZXRhID8/IFwibnVsbFwifTsgRmF0b3JlcyB2w6FsaWRvczogXCJNTEdcIiB8fCBcIlBlc29cImApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBwZXJzb24uXG4gICAgICAgIEVsZW1lbnRvOiAke3BlcnNvbiA/PyBcIm51bGxcIn07XG4gICAgICAgIEluc3TDom5jaWE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBlcnNvbikuc2xpY2UoOCwgLTEpID8/IFwibnVsbFwifTtcbiAgICAgICAgYXR2THZsIHByZXNlbnRlOiAke1wiYXR2THZsXCIgaW4gcGVyc29uID8/IGZhbHNlfTtcbiAgICAgICAgVmFsb3IgZGUgYXR2THZsIG9idGlkbzogJHt0aGlzLmF0dkx2bCA/PyBcIm51bGxcIn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoVE1CRXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihUTUJFcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIFtcIlwiLCAwXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYWxjR0VUKFRNQiwgZmFjdG9yQXR2THZsKSB7XHJcbiAgICAgICAgaWYgKFRNQiAmJiBmYWN0b3JBdHZMdmwpIHtcclxuICAgICAgICAgICAgY29uc3QgR0VUID0gVE1CICogZmFjdG9yQXR2THZsO1xyXG4gICAgICAgICAgICByZXR1cm4gR0VUO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gYXJndW1lbnRvcy5cbiAgICAgIFRNQiBvYnRpZG86ICR7VE1CID8/IDB9O1xuICAgICAgZmFjdG9yQXR2THZsIG9idGlkbzogJHtmYWN0b3JBdHZMdmwgPz8gMH1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGNsb25lUGVyc29uKHBlcnNvbikge1xyXG4gICAgICAgIGlmIChwZXJzb24gJiYgXCJnZW5cIiBpbiBwZXJzb24pIHtcclxuICAgICAgICAgICAgc3dpdGNoIChwZXJzb24uZ2VuKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFzY3VsaW5vXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNYW4ocGVyc29uLmdlbiwgcGVyc29uLmFnZSwgcGVyc29uLndlaWdodCwgcGVyc29uLmhlaWdodCwgcGVyc29uLnN1bURDdXQsIHBlcnNvbi5hdHZMdmwpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImZlbWluaW5vXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXb21hbihwZXJzb24uZ2VuLCBwZXJzb24uYWdlLCBwZXJzb24ud2VpZ2h0LCBwZXJzb24uaGVpZ2h0LCBwZXJzb24uc3VtREN1dCwgcGVyc29uLmF0dkx2bCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibmV1dHJvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBOZXV0cm8ocGVyc29uLmdlbiwgcGVyc29uLmFnZSwgcGVyc29uLndlaWdodCwgcGVyc29uLmhlaWdodCwgcGVyc29uLnN1bURDdXQsIHBlcnNvbi5hdHZMdmwpO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyAuZ2VuIGRlIHBlcnNvbiBwYXNzYWRhIHBhcmEgLmNsb25lUGVyc29uKClcbiAgICAgICAgICAuZ2VuIG9idGlkbzogJHtwZXJzb24/LmdlbiA/PyBcIm51bGxcIn0uYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIHBlcnNvbi5cbiAgICAgIE9iamV0byBvYnRpZG86ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBlcnNvbikuc2xpY2UoOCwgLTEpID8/IFwibnVsbFwifTtcbiAgICAgIC5nZW4gcHJlc2VudGU6ICR7XCJnZW5cIiBpbiBwZXJzb24gPz8gZmFsc2V9LmApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgTWFuIGV4dGVuZHMgUGVyc29uIHtcclxufVxyXG5leHBvcnQgY2xhc3MgV29tYW4gZXh0ZW5kcyBQZXJzb24ge1xyXG59XHJcbmV4cG9ydCBjbGFzcyBOZXV0cm8gZXh0ZW5kcyBQZXJzb24ge1xyXG59XHJcbiIsIi8vIGltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnROb3RGb3VuZChlbGVtZW50LCBlbGVtZW50TmFtZSwgbGluZSkge1xyXG4gICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudCA9IFwiVU5ERUZJTkVEIEVMRU1FTlRcIjtcclxuICAgIH1cclxuICAgIGlmICghZWxlbWVudE5hbWUpIHtcclxuICAgICAgICBlbGVtZW50TmFtZSA9IFwiVU5OQU1FRCBFTEVNRU5UXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHxcclxuICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTE9wdGlvbkVsZW1lbnQpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBcbiAgRUxFTUVOVCBOT1QgRk9VTkQsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhIGRlICR7ZWxlbWVudD8uaWQgfHwgZWxlbWVudE5hbWUgfHwgXCJOVUxMXCJ9LlxuICBJbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSB8fCBcIk5VTExcIn07XG4gIC52YWx1ZSBvYnRpZG86ICR7ZWxlbWVudD8udmFsdWUgPz8gXCJOVUxMXCJ9LmApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgXG4gIEVMRU1FTlQgTk9UIEZPVU5ELCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYSBkZSAke2VsZW1lbnQ/LmlkIHx8IGVsZW1lbnROYW1lIHx8IFwiVU5ERUZJTkVEIElEIE9SIE5BTUVcIn0uXG4gIEluc3TDom5jaWEgb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpIHx8IFwiTlVMTFwifS5gKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW5wdXROb3RGb3VuZChlbGVtZW50LCBlbGVtZW50TmFtZSwgbGluZSkge1xyXG4gICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudCA9IFwiVU5ERUZJTkVEIEVMRU1FTlRcIjtcclxuICAgIH1cclxuICAgIGlmICghZWxlbWVudE5hbWUpIHtcclxuICAgICAgICBlbGVtZW50TmFtZSA9IFwiVU5OQU1FRCBFTEVNRU5UXCI7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmVycm9yKGBJTlBVVCBOT1QgRk9VTkQsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyAke2VsZW1lbnQ/LmlkIHx8IGVsZW1lbnROYW1lIHx8IFwiVU5ERUZJTkVEIElEIE9SIE5BTUVcIn0uXG4gIEVsZW1lbnRvIG9idGlkbzogJHtlbGVtZW50ID8/IFwiTlVMTFwifTtcbiAgSW5zdMOibmNpYSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgfHwgXCJOVUxMXCJ9O1xuICBUaXBvIG9idGlkbyAodsOhbGlkbyBzb21lbnRlIHBhcmEgPGlucHV0Pik6ICR7ZWxlbWVudD8udHlwZSB8fCBcIk5VTExcIn07XG4gIC52YWx1ZSBvYnRpZG86ICR7ZWxlbWVudD8udmFsdWUgfHwgXCJOVUxMXCJ9O1xuICAuY2hlY2tlZCBvYml0b2Q6ICR7ZWxlbWVudD8uY2hlY2tlZCB8fCBcIk5VTExcIn0uYCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRXaXRoQXJyYXlFcnJvcihjb250ZXh0LCBhcnJheSwgYXJyYXlOYW1lLCBlbGVtZW50LCBlbGVtZW50TmFtZSwgbGluZSkge1xyXG4gICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudCA9IFwiVU5ERUZJTkVEIEVMRU1FTlRcIjtcclxuICAgIH1cclxuICAgIGlmICghZWxlbWVudE5hbWUpIHtcclxuICAgICAgICBlbGVtZW50TmFtZSA9IFwiVU5OQU1FRCBFTEVNRU5UXCI7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmVycm9yKGBFTEVNRU5UIFdJVEggQVJSQVkgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyAke2NvbnRleHR9LlxuICAke2VsZW1lbnROYW1lID8/IFwiVU5OQU1FRCBFTEVNRU5UXCJ9IG9idGlkbzogJHtKU09OLnN0cmluZ2lmeShhcnJheSkgPz8gXCJOVUxMXCJ9O1xuICBJbnN0w6JuY2lhIGRlICR7YXJyYXlOYW1lID8/IFwiVU5OQU1FRCBBUlJBWVwifSBvYnRpZG86ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJ9LmApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50V2l0aE9iamVjdEVycm9yKGNvbnRleHQsIG9iamVjdCwgZWxlbWVudCwgZWxlbWVudE5hbWUsIGxpbmUpIHtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQgPSBcIlVOREVGSU5FRCBFTEVNRU5UXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWVsZW1lbnROYW1lKSB7XHJcbiAgICAgICAgZWxlbWVudE5hbWUgPSBcIlVOTkFNRUQgRUxFTUVOVFwiO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcihgRUxFTUVOVCBXSVRIIE9CSkVDVCBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gICAgRXJybyAke2NvbnRleHQgPz8gXCJVbmRlZmluZWQgQ29udGV4dFwifS4gRWxlbWVudG86ICR7SlNPTi5zdHJpbmdpZnkob2JqZWN0KX07IGluc3TDom5jaWE6ICR7b2JqZWN0Py5jb25zdHJ1Y3Rvci5uYW1lID8/IFwiTlVMTFwifVxuICAgICR7ZWxlbWVudE5hbWUgPz8gXCJVTk5BTUVEIEVMRU1FTlRcIn06IGluc3TDom5jaWEgb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifWApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50Tm90UG9wdWxhdGVkKGFycmF5LCBhcnJheU5hbWUsIGxpbmUpIHtcclxuICAgIGlmICghYXJyYXkpIHtcclxuICAgICAgICBhcnJheSA9IFwiVW5kZWZpbmVkIEFycmF5XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWFycmF5TmFtZSkge1xyXG4gICAgICAgIGFycmF5TmFtZSA9IFwiVU5OQU1FRCBBUlJBWVwiO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcihgRUxFTUVOVCBQT1BVTEFUSU9OIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gJHthcnJheU5hbWUgfHwgXCJOVUxMXCJ9LlxuICBBcnJheTogJHtBcnJheS5pc0FycmF5KGFycmF5KX07XG4gIExpc3Qgb3UgQ29sbGVjdGlvbjogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyYXkpPy5zbGljZSg4LCAtMSkgfHwgXCJOVUxMXCJ9O1xuICBMZW5ndGggb2J0aWRhOiAke2FycmF5Py5sZW5ndGggfHwgXCIwXCJ9O1xuICBTdHJpbmdpZmljYcOnw6NvOiAke0pTT04uc3RyaW5naWZ5KGFycmF5KSA/PyBcIk5VTExcIn1gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKGxpbmUsIGNvbnRleHQsIC4uLmVsZW1lbnRzKSB7XHJcbiAgICBpZiAoIWNvbnRleHQgfHwgY29udGV4dCA9PT0gXCJcIikge1xyXG4gICAgICAgIGNvbnRleHQgPSBcIlVuZGVmaW5lZCBDb250ZXh0XCI7XHJcbiAgICB9XHJcbiAgICBsZXQgZXJyb3JNZXNzYWdlID0gYE1VTFRJUExFIEVMRU1FTlRTIE5PVCBGT1VORCwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gdmFsaWRhbmRvICR7Y29udGV4dCB8fCBcIlVuZGVmaW5lZCBGdW5jdGlvbiBOYW1lXCJ9LmA7XHJcbiAgICBjb25zdCBtYXBwZWROdWxsRWxlbWVudHMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gdW5kZWZpbmVkID8gXCJOVUxMXCIgOiBlbGVtZW50KTtcclxuICAgIG1hcHBlZE51bGxFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTE9wdGlvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAoZWxlbWVudC50eXBlID09PSBcInJhZGlvXCIgfHwgZWxlbWVudC50eXBlID09PSBcImNoZWNrYm94XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gYEluc3TDom5jaWEgZGUgJHtlbGVtZW50LmlkIHx8IFwiTlVMTFwifSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJ9O1xcblxuICAgICAgICAuY2hlY2tlZCBvYnRpZG86ICR7ZWxlbWVudD8uY2hlY2tlZCB8fCBcIk5VTExcIn1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0w6JuY2lhIGRlICR7ZWxlbWVudC5pZCB8fCBcIk5VTExcIn0gb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifTtcXG5cbiAgICAgICAgLnZhbHVlIG9idGlkbzogJHtlbGVtZW50Py52YWx1ZSB8fCBcIk5VTExcIn1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gYEluc3TDom5jaWEgZGUgJHtlbGVtZW50LmlkIHx8IFwiTlVMTFwifSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJ9O1xcbmA7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRzTm90Rm91bmRGdW5jdGlvbihsaW5lLCBmdW5jTmFtZSwgLi4uZWxlbWVudHMpIHtcclxuICAgIGxldCBlcnJvck1lc3NhZ2UgPSBgRUxFTUVOVFMgTk9UIEZPVU5EIEZPUiBGVU5DVElPTiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgb2J0aWRhIHBhcmEgJHtmdW5jTmFtZSB8fCBcIk5VTExcIn1gO1xyXG4gICAgY29uc3QgbWFwcGVkTnVsbEVsZW1lbnRzID0gZWxlbWVudHMubWFwKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCA/IFwiTlVMTFwiIDogZWxlbWVudCk7XHJcbiAgICBtYXBwZWROdWxsRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgKGVsZW1lbnQudHlwZSA9PT0gXCJyYWRpb1wiIHx8IGVsZW1lbnQudHlwZSA9PT0gXCJjaGVja2JveFwiKSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0w6JuY2lhIGRlICR7ZWxlbWVudC5pZCB8fCBcIk5VTExcIn0gb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifTtcXG5cbiAgICAgICAgLmNoZWNrZWQgb2J0aWRvOiAke2VsZW1lbnQ/LmNoZWNrZWQgfHwgXCJOVUxMXCJ9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdMOibmNpYSBkZSAke2VsZW1lbnQuaWQgfHwgXCJOVUxMXCJ9IG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIn07XFxuXG4gICAgICAgIC52YWx1ZSBvYnRpZG86ICR7ZWxlbWVudD8udmFsdWUgfHwgXCJOVUxMXCJ9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0w6JuY2lhIGRlICR7ZWxlbWVudD8uaWQgfHwgXCJOVUxMXCJ9IG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIn07XFxuYDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtYmVyRXJyb3IodW52YWxpZE51bWJlciwgdGl0bGUsIGxpbmUpIHtcclxuICAgIGlmICghdW52YWxpZE51bWJlcikge1xyXG4gICAgICAgIHVudmFsaWROdW1iZXIgPSBcIjBcIjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgdW52YWxpZE51bWJlciA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIHVudmFsaWROdW1iZXIgPSB1bnZhbGlkTnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmVycm9yKGBNQVggTlVNQkVSIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgTsO6bWVybyBkZSAke3RpdGxlIHx8IFwiVW5kZWZpbmVkIFRpdGxlXCJ9IGludsOhbGlkb3MuXG4gIE7Dum1lcm8gbcOheGltbyBvYnRpZG86ICR7cGFyc2VJbnQodW52YWxpZE51bWJlciwgMTApIHx8IDB9YCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0Vycm9yKGNvbnRleHQsIHRleHQsIGxpbmUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYFNUUklORyBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gJHtjb250ZXh0fS5cbiAgVmFsb3Igb2J0aWRvOiAke3RleHQgPz8gXCJOVUxMXCJ9YCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoRXJyb3IoY29udGV4dCwgZWxlbWVudCwgdGV4dCwgbGluZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihgTUFUQ0ggRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyAke2NvbnRleHQgfHwgXCJVbmRlZmluZWQgQ29udGV4dFwifS5cbiAgRWxlbWVudG8gb2J0aWRvOiAke2VsZW1lbnQgfHwgXCJVTkRFRklORUQgRUxFTUVOVFwifTtcbiAgVMOtdHVsbyBvYnRpZG86ICR7dGV4dCB8fCBcIlVuZGVmaW5lZCBUaXRsZVwifS5gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdHlwZUVycm9yKGNvbnRleHQsIGVsZW1lbnQsIGFjY2VwdGVkVHlwZSwgbGluZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihgVFlQRSBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIFRpcG8gcHJpbWl0aXZvIG9idGlkbyBwYXJhICR7Y29udGV4dCB8fCBcIlVuZGVmaW5lZCBDb250ZXh0XCJ9IGluY29ycmV0by5cbiAgVGlwbyBvYnRpZG86ICR7dHlwZW9mIGVsZW1lbnQgPz8gXCJVbmRlZmluZWQgdHlwZW9mXCJ9O1xuICBUaXBvIGFjZWl0bzogJHthY2NlcHRlZFR5cGUgfHwgXCJVbmRlZmluZWQgQWNjZXB0ZWQgVHlwZVwifWApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RFcnJvcihjb250ZXh0LCBvYmplY3QsIG9iamVjdE5hbWUsIG1heFByb3BlcnRpZXNOdW1iZXIsIGxpbmUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYE9CSkVDVCBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gdmFsaWRhbmRvICR7b2JqZWN0TmFtZSA/PyBcIlVOREVGSU5FRCBPQkpFQ1QgTkFNRVwifSBwYXJhICR7Y29udGV4dCB8fCBcIlVuZGVmaW5lZCBDb250ZXh0XCJ9LlxuICBPYmplY3RvIG9idGlkbzogJHtKU09OLnN0cmluZ2lmeShvYmplY3QpID8/IFwiVW5kZWZpbmVkIE9iamVjdFwifTtcbiAgTsO6bWVybyBvYnRpZG8gZGUgcHJvcHJpZWRhZGVzOiAke09iamVjdC5rZXlzLmxlbmd0aCA/PyAwfTsgTsO6bWVybyBhY2VpdG86ICR7bWF4UHJvcGVydGllc051bWJlciA/PyAwfWApO1xyXG59XHJcbiIsIi8vbmVzc2UgZmlsZSBlc3TDo28gcHJlc2VudGVzIHByaW5jaXBhbG1lbnRlIGFzIGZ1bsOnw7VlcyBkZSBtYW5pcHVsYcOnw6NvIGRpbsOibWljYSBkZSB0ZXh0byBlIGxheW91dFxyXG5pbXBvcnQgKiBhcyBHbG9iYWxNb2RlbCBmcm9tIFwiLi9nTW9kZWxcIjtcclxuaW1wb3J0IHsgSlNPTlN0b3JhZ2VyLCBKU09OVGl0bGVTdG9yYWdlciB9IGZyb20gXCIuL2NsYXNzZXNcIjtcclxuaW1wb3J0ICogYXMgRXJyb3JIYW5kbGVyIGZyb20gXCIuL2Vycm9ySGFuZGxlclwiO1xyXG4vLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5jb25zdCBtYXBJZHNUaXRsZXMgPSB7XHJcbiAgICBmaXJzdE5hbWVJZDogXCJQcmltZWlyb19Ob21lXCIsXHJcbiAgICBhZGRpdGlvbmFsTmFtZUlkOiBcIlNvYnJlbm9tZV9kb19NZWlvXCIsXHJcbiAgICBmYW1pbHlOYW1lSWQ6IFwiw5psdGltb19Tb2JyZW5vbWVcIixcclxuICAgIHNvY2lhbE5hbWVJZDogXCJOb21lX1NvY2lhbFwiLFxyXG4gICAgdGVsQXJlYUNvZGVJZDogXCJERERcIixcclxuICAgIHRlbElkOiBcIlRlbGVmb25lXCIsXHJcbiAgICB0ZWxDb3VudHJ5Q29kZUlkOiBcIlNlX2VzdHJhbmdlaXJvLF9jw7NkaWdvX2RvX1Bhw61zXCIsXHJcbiAgICB0ZWwyQXJlYUNvZGVJZDogXCJERERfRG9fVGVsZWZvbmVfU2VjdW5kw6FyaW9cIixcclxuICAgIHRlbDJJZDogXCJUZWxlZm9uZV9TZWN1bmTDoXJpb1wiLFxyXG4gICAgdGVsMkNvdW50cnlDb2RlSWQ6IFwiU2VfZXN0cmFuZ2Vpcm8oc2VjdW5kw6FyaW8pLF9jw7NkaWdvX2RvX1Bhw61zXCIsXHJcbiAgICBlbWFpbDFJZDogXCJFbWFpbFwiLFxyXG4gICAgZW1haWwySWQ6IFwiRW1haWxfU2VjdW5kw6FyaW9cIixcclxuICAgIGRhdGVBZ2VJZDogXCJJZGFkZVwiLFxyXG4gICAgZ2VuaWQ6IFwiR8OqbmVyb1wiLFxyXG4gICAgZ2VuQmlydGhSZWxJZDogXCJJZGVudGlkYWRlX2VtX3JlbGHDp8Ojb19hb19nw6puZXJvX2Rlc2lnbmFkb19uYV9uYXNjZW7Dp2FcIixcclxuICAgIGdlblRyYW5zSWQ6IFwiRXN0w6FnaW9fZGFfVHJhbnNpw6fDo29fSG9ybW9uYWxcIixcclxuICAgIGdlbkZpc0FsaW5JZDogXCJBbGluaGFtZW50b19kZV9jYXJhY3RlcsOtc3RpY2FzX2bDrXNpY2FzX3ByZWRvbWluYW50ZVwiLFxyXG59O1xyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU2ltcGxlUHJvcGVydHkoZWxlbWVudCkge1xyXG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQudHlwZSA9PT0gXCJyYWRpb1wiIHx8IGVsZW1lbnQudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmNoZWNrZWQudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZWxlbWVudC50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VGbG9hdChlbGVtZW50LnZhbHVlLnJlcGxhY2VBbGwoL1teMC05LiwrLV0vZywgXCJcIikpKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBlbGVtZW50LnZhbHVlIHJldG9ybmFkbyBjb21vIE5hTiwgcmV2ZXJ0aWRvIHBhcmEgMC5gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoZWxlbWVudC52YWx1ZS5yZXBsYWNlQWxsKC9bXjAtOS4sKy1dL2csIFwiXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlbGVtZW50LnR5cGUgPT09IFwidGV4dFwiIHx8IGVsZW1lbnQudHlwZSA9PT0gXCJkYXRlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIHR5cGUgZGUgSW5wdXQgcGFyYSBhdHVhbGl6YcOnw6NvIGRlIHByb3ByaWVkYWRlIGRlIHBlcnNvbi5cbiAgICAgIFRpcG8gb2J0aWRvOiAke2VsZW1lbnQ/LnR5cGUgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC52YWx1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gRWxlbWVudCBwYXJhIGF0dWFsaXphw6fDo28gZGUgcHJvcHJpZWRhZGUgZGUgcGVyc29uLlxuICAgIEluc3TDom5jaWEgb2JpdGRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KS5zbGljZSg4LCAtMSkgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGN1cnNvckNoZWNrVGltZXIoY3Vyc29yUG9zaXRpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgIGlmIChzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmZvY3VzTm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGN1cnNvclBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk/LnN0YXJ0T2Zmc2V0O1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gY3Vyc29yUG9zaXRpb247XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SlNPTkRlc2MoaW5wdXRzKSB7XHJcbiAgICBjb25zdCB0aXRsZUVsZW1lbnRzID0gW107XHJcbiAgICBjb25zdCBjbG9zZXN0VmFsaWRFbGVtZW50cyA9IFtdO1xyXG4gICAgY29uc3QgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMgPSBbXTtcclxuICAgIGNvbnN0IGNsb3Nlc3RCb29sZWFuRWxlbWVudHMgPSBbXTtcclxuICAgIGNvbnN0IGNsb3Nlc3RCb29sZWFuRWxlbWVudHNJZHMgPSBbXTtcclxuICAgIGNvbnN0IGlucFZhbHVlcyA9IFtdO1xyXG4gICAgY29uc3QgaW5wSWRzID0gW107XHJcbiAgICBjb25zdCBKU09OSW5wc1N0b3JlRGVzY3JpcHRvcnMgPSBbXTtcclxuICAgIGNvbnN0IEpTT05UaXRsZXNTdG9yZURlc2NyaXB0b3JzID0gW107XHJcbiAgICBsZXQgSlNPTklucHNTdG9yZSA9IFtdO1xyXG4gICAgbGV0IEpTT05UaXRsZXNTdG9yZSA9IFtdO1xyXG4gICAgbGV0IHRpdGxlQWNjID0gMDtcclxuICAgIGxldCBudWxsVGl0bGVBY2MgPSAwO1xyXG4gICAgLy9kZXRlcm1pbmHDp8OjbyBkbyBuw7ptZXJvIGRlIGlucHV0cyBkZSBpZGVudGlmaWNhw6fDo28gY3Vqb3MgdMOtdHVsb3Mgc8OjbyBkZSBpbnRlcmVzc2UgZSBjb25zdHJ1w6fDo28gZGUgc3ViYXJyYXkgcGFyYSBlc3Rlc1xyXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCBpbnB1dHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICBpZiAoaW5wdXRzW2tdPy5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBJZGVudGlmXCIpKSB7XHJcbiAgICAgICAgICAgIHRpdGxlRWxlbWVudHMucHVzaChpbnB1dHNba10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vbG9vcCBwYXJhIGNvbnN0cnXDp8OjbyBkb3MgYXJyYXlzIGluaWNpYXMgZGUgaWRzIGUgdmFsdWVzXHJcbiAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGlucHV0cy5sZW5ndGg7IHorKykge1xyXG4gICAgICAgIGlmIChpbnB1dHNbel0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dHNbel0/LnR5cGUgPT09IFwicmFkaW9cIiB8fFxyXG4gICAgICAgICAgICAgICAgaW5wdXRzW3pdPy50eXBlID09PSBcImNoZWNrYm94XCIpIHtcclxuICAgICAgICAgICAgICAgIGlucElkcy5wdXNoKGlucHV0c1t6XT8uaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wVmFsdWVzLnB1c2goaW5wdXRzW3pdPy5jaGVja2VkLnRvU3RyaW5nKCkgPz8gXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dHNbel0uaWQgPT09IFwiY29uZnJtTG9jSWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucElkcy5wdXNoKFwiY29uZmlybUxvY1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucElkcy5wdXNoKGlucHV0c1t6XT8uaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5wVmFsdWVzLnB1c2goaW5wdXRzW3pdPy52YWx1ZSA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5wdXRzW3pdIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICBpbnB1dHNbel0gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgaW5wVmFsdWVzLnB1c2goaW5wdXRzW3pdPy52YWx1ZSA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlucHV0c1t6XT8uY29udGVudEVkaXRhYmxlID09PSBcInRydWVcIiB8fFxyXG4gICAgICAgICAgICBpbnB1dHNbel0/LmlkID09PSBcImNpdGVOYW1lSWRcIikge1xyXG4gICAgICAgICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgaW5wVmFsdWVzLnB1c2goaW5wdXRzW3pdPy50ZXh0Q29udGVudCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyBlbGVtZW50by4gRWxlbWVudG8gJHtpbnB1dHNbel0gPz8gXCJudWxsXCJ9OyBpbnN0w6JuY2lhICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xyXG4gICAgICAgICAgICAgICAgLmNhbGwoaW5wdXRzW3pdKVxyXG4gICAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX07IGlkICR7aW5wdXRzW3pdPy5pZCA/PyBcIm51bGxcIn1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2xvb3AgcGFyYSBhanVzdGUgZG9zIGVsZW1lbnRvcyBkb3MgYXJyYXlzIGRlIGlucHV0cyBlIGNvbnN0cnXDp8OjbyBkb3Mgc3RvcmFnZXIgZGUgaW5wdXRzXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGlucHV0cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIC8vZmlsdHJhZ2VtIGRlIHRpcG9zIHByaW1pdGl2b3MgZGUgdmFsdWVzXHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnBWYWx1ZXNbal0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgaWYgKGlucFZhbHVlc1tqXSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgaW5wVmFsdWVzW2pdID0gaW5wVmFsdWVzW2pdLnJlcGxhY2UoXCJcIiwgXCJudWxsXCIpID8/IFwibnVsbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpbnBWYWx1ZXNbal0gPSBpbnBWYWx1ZXNbal0/LnRvU3RyaW5nKCkgPz8gXCJudWxsXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYXZhbGlhZG9yIGRlIGlkcyBudWxhc1xyXG4gICAgICAgIGlmIChpbnBJZHNbal0/Lm1hdGNoKC9udWxsL2cpIHx8XHJcbiAgICAgICAgICAgIGlucElkc1tqXSA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgIGlucElkc1tqXSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYElkIG51bGwgZGV0ZWN0YWRhLiBUw610dWxvIHJlbGF0aXZvOiAke2Nsb3Nlc3RWYWxpZEVsZW1lbnRzW2pdID8/IFwibnVsbFwifWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NyaWHDp8OjbyBkbyBzdG9yYWdlclxyXG4gICAgICAgIGNvbnN0IG5KU09OSW5wU3RvcmFnZXIgPSBuZXcgSlNPTlN0b3JhZ2VyKGlucElkc1tqXSwgaW5wVmFsdWVzW2pdKTtcclxuICAgICAgICAvL2NyaWHDp8OjbyBkYSBzdG9yZVxyXG4gICAgICAgIGlmIChuSlNPTklucFN0b3JhZ2VyKSB7XHJcbiAgICAgICAgICAgIEpTT05JbnBzU3RvcmUucHVzaChuSlNPTklucFN0b3JhZ2VyKTtcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IG5KU09OSW5wU3RvcmFnZXIuc2hvd0FsbEluZm87IC8vVE9ETyBFWFBPU0nDh8ODTyBERSBEQURPUyBTT01FTlRFIFBBUkEgRklOQUxJREFERVMgREUgVEVTVEUsIFBPSVMgUFJPUFJJRURBREVTIFBSSVZBREFTIE7Dg08gU8ODTyBFTlVNRVLDgVZFSVNcclxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcclxuICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmVEZXNjcmlwdG9ycy5wdXNoKGRlc2NyaXB0b3IudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIGRlc2NyaXB0b3IgcGFyYSBpbnN0w6JuY2lhICR7an0gZGUgSlNPTlN0b3JhZ2VyYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYSAke2p9IGRlIEpTT05TdG9yYWdlcmApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vbG9vcCBwYXJhIGV4dHJhaXIgdMOtdHVsb3MvbGFiZWxzIGRlIGludGVyZXNzZVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aXRsZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGl0bGVBY2MrKztcclxuICAgICAgICAvL2xvb3AgcGFyYSBtw7psdGlwbGFzIHRlbnRhdGl2YXMgZGUgbG9jYWxpemHDp8OjbyBkbyB0ZXh0byBkZSBpbnRlcmVzc2VcclxuICAgICAgICBsZXQgY2xvc2VzdFBhcmVudCA9IHRpdGxlRWxlbWVudHNbaV0/LmNsb3Nlc3QoXCJzcGFuXCIpIHx8IHRpdGxlRWxlbWVudHNbaV0/LmNsb3Nlc3QoXCJsYWJlbFwiKTtcclxuICAgICAgICBpZiAoY2xvc2VzdFBhcmVudCkge1xyXG4gICAgICAgICAgICBsZXQgbG9vcEFjYyA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlIChsb29wQWNjIDwgMTAgJiYgY2xvc2VzdFBhcmVudC50ZXh0Q29udGVudCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgLy9sb29wIHBhcmEgZXNjYWxhZGEgZ2VuZWFsw7NnaWNhIGF0w6kgZW5jb250cmFyIHBhcmVudCBkZSBpbnRlcmVzc2Ugb3UgZGVzaXN0aXIgYXDDs3MgMTAgaXRlcmHDp8O1ZXNcclxuICAgICAgICAgICAgICAgIGxvb3BBY2MrKztcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LmNsb3Nlc3QoXCJzcGFuXCIpIHx8IGNsb3Nlc3RQYXJlbnQ/LmNsb3Nlc3QoXCJsYWJlbFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCAhPT0gXCJcIiB8fCBsb29wQWNjID4gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCA9PT0gXCJTaW1cIiB8fCAvL2VudHJhZGEgZW0gbG9vcCBwYXJhIGVsaW1pbmFyIHBhcmVudHMgY29tIHRleHQgc2ltL27Do28gKG7Do28gaW5mb3JtYXRpdm8pIG91IGRlc2lzdGlyIGFww7NzIDEwIGl0ZXJhw6fDtWVzXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgPT09IFwiTsOjb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9vbGVhblBhcmVudENvcHkgPSBjbG9zZXN0UGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RCb29sZWFuRWxlbWVudHMucHVzaChib29sZWFuUGFyZW50Q29weT8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz8gYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RCb29sZWFuRWxlbWVudHNJZHMucHVzaChib29sZWFuUGFyZW50Q29weS5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGxvb3BBY2MgPCAxMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbG9zZXN0UGFyZW50LnRleHRDb250ZW50ID09PSBcIlNpbVwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50LnRleHRDb250ZW50ID09PSBcIk7Do29cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9vcEFjYysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LmNsb3Nlc3QoXCJzcGFuXCIpIHx8IGNsb3Nlc3RQYXJlbnQ/LmNsb3Nlc3QoXCJsYWJlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjbG9zZXN0UGFyZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCAhPT0gXCJTaW1cIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiTsOjb1wiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCAhPT0gXCJcIikgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3BBY2MgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2goY2xvc2VzdFBhcmVudD8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LnR5cGUgPT09IFwicmFkaW9cIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmcgaW5zdGFuY2VvZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhUTUxMYWJlbEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZz8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYm9vbE9wXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8uaWQubWF0Y2goL1llcy8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZD8uc2xpY2UoLTMpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibnVsbFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aXRsZUVsZW1lbnRzW2ldPy5pZC5tYXRjaCgvTm8vKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2godGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKC0yKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bGxcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2FzbyBpbmVzcGVyYWRvIGRlIGJvb2xPcCBSYWRpbyArIExhYmVsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5hbWUgPT09IFwibml2ZWxGdW1vXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkPy5zbGljZSgwLCAxKT8udG9VcHBlckNhc2UoKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bGxcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZD8uc2xpY2UoMSwgNCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKDQsIDgpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcIm9wRnVtU3Vic1wiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc/LnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZz8udGV4dENvbnRlbnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZUVsZW1lbnRzW2ldPy5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBBbnRNZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFwiVHJhdGFtZW50b19Nw6lkaWNvXCIgKyBcIl9cIiArIHRpdGxlRWxlbWVudHNbaV0/LmlkLnNsaWNlKC0xKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8uaWQgPT09IFwiY2l0ZU5hbWVJZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXCJBc3NpbmF0dXJhX1VzdcOhcmlvXCIgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0UGFyZW50Py5pZCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL29idGVuw6fDo28gZGUgaWRzIGRvcyAncGFyZW50cydcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb3JyZcOnw6NvIGRlIGlkIGRlIGludGVyZXNzZSBjYXNvIGEgZG8gcGFyZW50IG7Do28gZXN0ZWphIHByZXNlbnRlIChhdGVuw6fDo286IGRlc2Fzc29jaWEgaWQgZSB0ZXh0IGRlIGludGVyZXNzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaChjbG9zZXN0UGFyZW50Py5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNsb3Nlc3RQYXJlbnQuaWQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dEVTaWJsaW5nID0gdGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dEVTaWJsaW5nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0RVNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0RVNpYmxpbmcudGV4dENvbnRlbnQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2gobmV4dEVTaWJsaW5nLmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzRVNpYmxpbmcgPSB0aXRsZUVsZW1lbnRzW2ldPy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzRVNpYmxpbmcgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0VTaWJsaW5nIGluc3RhbmNlb2YgSFRNTExhYmVsRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzRVNpYmxpbmcudGV4dENvbnRlbnQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHByZXZpb3VzRVNpYmxpbmcuaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGl0bGVFbGVtZW50c1tpXSBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5wbGFjZWhvbGRlciAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2godGl0bGVFbGVtZW50c1tpXT8uaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBOZW5odW1hIGlkIHByw7N4aW1hIHbDoWxpZGEgcmV0b3JuYWRhIHBhcmEgbyBpbnB1dCAke3RpdGxlRWxlbWVudHNbaV0/LmlkfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gYW8gbG9jYWxpemFyIHRleHRDb250ZW50IGRlIHBhcmVudGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL3NlIGZhbGhhIGVtIHBhcmVudHMsIHByb2N1cmEgZW0gc2libGluZ3MgPGxhYmVsPiBvdSBlbSBwbGFjZWhvbGRlcnMgZGUgdGV4dGFyZWFzXHJcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzU2libGluZyA9IHRpdGxlRWxlbWVudHNbaV0/LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1NpYmxpbmcgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2gocHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz8gYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaChwcmV2aW91c1NpYmxpbmcuaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ucGxhY2Vob2xkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LnBsYWNlaG9sZGVyID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz8gYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2godGl0bGVFbGVtZW50c1tpXT8uaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGl0bGVFbGVtZW50c1tpXSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy50eXBlID09PSBcImNoZWNrYm94XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmFtT3BcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBwZXJDYXNlTWF0Y2ggPSB0aXRsZUVsZW1lbnRzW2ldPy5pZD8ubWF0Y2goL0ZhbS9nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwcGVyQ2FzZU1hdGNoICYmIHRpdGxlRWxlbWVudHNbaV0/LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cHBlckNhc2VJbmRleCA9IHRpdGxlRWxlbWVudHNbaV0/LmlkLmluZGV4T2YoXCJGYW1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRJZCA9IHRpdGxlRWxlbWVudHNbaV0/LmlkLnNsaWNlKDAsIHVwcGVyQ2FzZUluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goc2xpY2VkSWQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0U2libGluZz8udGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwoL15bXFxzXSsvZywgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2godGl0bGVFbGVtZW50c1tpXT8ubmV4dFNpYmxpbmc/LnRleHRDb250ZW50Py5yZXBsYWNlQWxsKC9eW1xcc10rL2csIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGl0bGVFbGVtZW50c1tpXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BIZXBcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChcIkhlcGF0aXRlX1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5leHRTaWJsaW5nPy50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCgvXltcXHNdKy9nLCBcIlwiKSA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8uaWQgIT09IFwiY29uZmlybUlkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2godGl0bGVFbGVtZW50c1tpXT8ubmV4dFNpYmxpbmc/LnRleHRDb250ZW50Py5yZXBsYWNlQWxsKC9eW1xcc10rL2csIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGl0bGVFbGVtZW50c1tpXT8uaWQgPT09IFwiY29uZmlybUlkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXCJDb25jb3Jkb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZUVsZW1lbnRzW2ldPy5jbGFzc0xpc3QuY29udGFpbnMoXCJvcEhBU1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRTaWJsaW5nPy50ZXh0Q29udGVudD8udHJpbSgpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRFU2libGluZyA9IHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRFU2libGluZyBpbnN0YW5jZW9mIEhUTUxMYWJlbEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFU2libGluZy50ZXh0Q29udGVudCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChuZXh0RVNpYmxpbmcudGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKG5leHRFU2libGluZy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIHBhcmVudHMsIGxhYmVscywgcGxhY2Vob2xkZXJzIGUgdGV4dENvbnRlbnQuIElkIGRvIElucHV0OiAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/IG51bGx9OyB0ZXh0Q29udGVudCAke3RpdGxlRWxlbWVudHNbaV0/LnRleHRDb250ZW50ID8/IG51bGx9OyBwbGFjZWhvbGRlciAke3RpdGxlRWxlbWVudHNbaV0/LnBsYWNlaG9sZGVyID8/IG51bGx9OyDDmmx0aW1hIEluc3TDom5jaWEgZGUgUGFyZW50IGF2YWxpYWRhICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKGNsb3Nlc3RQYXJlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX07IEluc3TDom5jaWEgZGUgU2libGluZyBMYWJlbHMgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwocHJldmlvdXNTaWJsaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSl9ICYmICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKG5leHRFU2libGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoOCwgLTEpfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9sb29wIHBhcmEgYWp1c3RlIGRvcyBlbGVtZW50b3MgZG9zIGFycmF5cyBkZSB0aXRsZXMgZSBjb25zdHJ1w6fDo28gZG9zIHN0b3JhZ2VyIGRlIHRpdGxlc1xyXG4gICAgZm9yIChsZXQgbCA9IDA7IGwgPCB0aXRsZUVsZW1lbnRzLmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgLy9jb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgZXNwYcOnb3MgZW0gbGFiZWxzIGUgdGl0bGVzXHJcbiAgICAgICAgY29uc3QgbXVsdGlwbGVTcGFjZU1hdGNoZXMgPSBjbG9zZXN0VmFsaWRFbGVtZW50c1tsXT8ubWF0Y2goL1xcc1xccy8pID8/IG51bGw7XHJcbiAgICAgICAgaWYgKGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdICYmXHJcbiAgICAgICAgICAgIG11bHRpcGxlU3BhY2VNYXRjaGVzICYmXHJcbiAgICAgICAgICAgIG11bHRpcGxlU3BhY2VNYXRjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BhY2VNYXRjaGVzQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgbXVsdGlwbGVTcGFjZU1hdGNoZXMuZm9yRWFjaCgobXVsdGlwbGVTcGFjZU1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtdWx0aXBsZVNwYWNlSW5kZXggPSBjbG9zZXN0VmFsaWRFbGVtZW50c1tsXT8uaW5kZXhPZihtdWx0aXBsZVNwYWNlTWF0Y2gpID8/IDA7XHJcbiAgICAgICAgICAgICAgICBzcGFjZU1hdGNoZXNBcnJheS5wdXNoKG11bHRpcGxlU3BhY2VJbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IHNwYWNlTWF0Y2hlc0FycmF5Lmxlbmd0aDsgbSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0/LnNsaWNlKDAsIHNwYWNlTWF0Y2hlc0FycmF5W21dKS50cmltKCkgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudWxsXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hdmFsaWFkb3IgZGUgbGFiZWxzIGUgdGl0bGVzIG51bG9zXHJcbiAgICAgICAgaWYgKGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdPy5tYXRjaCgvW05uXVtVdV1bTGxdW0xsXS9nKSB8fFxyXG4gICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnBWYWx1ZSA9IGlucHV0c1tsXT8udmFsdWUgfHwgXCJudWxsXCI7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dHNbbF0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAoaW5wdXRzW2xdPy50eXBlID09PSBcInJhZGlvXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHNbbF0/LnR5cGUgPT09IFwiY2hlY2tib3hcIikpIHtcclxuICAgICAgICAgICAgICAgIGlucFZhbHVlID1cclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHNbbF0/LmNoZWNrZWQudG9TdHJpbmcoKSA/PyBcImZhbHNlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbnVsbFRpdGxlQWNjKys7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVMOtdHVsbyBudWxvIGRldGVjdGFkbzogTsO6bWVybyBkZSBhY8O6bXVsbzogJHtudWxsVGl0bGVBY2N9LlxuICAgICAgICAgICAgVMOtdHVsbzogJHtjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSB8fCBjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSB8fCBcIm51bGxcIn07XG4gICAgICAgICAgICBpbnN0w6JuY2lhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgIC5jYWxsKGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdKVxyXG4gICAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKSA/PyBcInVuZGVmaW5lZFwifTtcbiAgICAgICAgICAgIElkIGRlIGlucHV0IHBhcmVhZGE6ICR7aW5wdXRzW2xdPy5pZCA/PyBcIm51bGxcIn07XG4gICAgICAgICAgICBWYWxvciBkZSBpbnB1dCBwYXJlYWRvICR7aW5wVmFsdWUgfHwgXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY3JpYcOnw6NvIGRvIHN0b3JhZ2VyXHJcbiAgICAgICAgY29uc3QgbkpTT05UaXRsZVN0b3JhZ2VyID0gbmV3IEpTT05UaXRsZVN0b3JhZ2VyKGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdKTtcclxuICAgICAgICAvL2NyaWHDp8OjbyBkYSBzdG9yZVxyXG4gICAgICAgIGlmIChuSlNPTlRpdGxlU3RvcmFnZXIpIHtcclxuICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlLnB1c2gobkpTT05UaXRsZVN0b3JhZ2VyKTtcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IG5KU09OVGl0bGVTdG9yYWdlci5zaG93SW5wVGl0bGU7IC8vVE9ETyBFWFBPU0nDh8ODTyBERSBEQURPUyBTT01FTlRFIFBBUkEgRklOQUxJREFERVMgREUgVEVTVEUsIFBPSVMgUFJPUFJJRURBREVTIFBSSVZBREFTIE7Dg08gU8ODTyBFTlVNRVLDgVZFSVNcclxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcclxuICAgICAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZURlc2NyaXB0b3JzLnB1c2goZGVzY3JpcHRvci50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gZGVzY3JpcHRvciBwYXJhIGluc3TDom5jaWEgJHtsfSBkZSBKU09OU3RvcmFnZXJgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhICR7bH0gZGUgSlNPTlN0b3JhZ2VyYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9maWx0cm8gZSB2YWxpZGHDp8OjbyBkYSBzdG9yZVxyXG4gICAgaWYgKEpTT05JbnBzU3RvcmVEZXNjcmlwdG9ycy5sZW5ndGggPT09IEpTT05JbnBzU3RvcmUubGVuZ3RoICYmXHJcbiAgICAgICAgSlNPTlRpdGxlc1N0b3JlRGVzY3JpcHRvcnMubGVuZ3RoID09PSBKU09OVGl0bGVzU3RvcmUubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyMUpTT05JbnBzU3RvcmUgPSBKU09OSW5wc1N0b3JlLmZpbHRlcigoSlNPTkVsKSA9PiB0eXBlb2YgSlNPTkVsID09PSBcIm9iamVjdFwiKTtcclxuICAgICAgICBjb25zdCBmaWx0ZXIxSlNPTlRpdGxlc1N0b3JlID0gSlNPTlRpdGxlc1N0b3JlLmZpbHRlcigoSlNPTkVsKSA9PiB0eXBlb2YgSlNPTkVsID09PSBcIm9iamVjdFwiKTtcclxuICAgICAgICBpZiAoZmlsdGVyMUpTT05JbnBzU3RvcmUubGVuZ3RoID09PSBKU09OSW5wc1N0b3JlLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICBmaWx0ZXIxSlNPTlRpdGxlc1N0b3JlLmxlbmd0aCA9PT0gSlNPTlRpdGxlc1N0b3JlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBKU09OSW5wc1N0b3JlID0gZmlsdGVyMUpTT05JbnBzU3RvcmU7XHJcbiAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZSA9IGZpbHRlcjFKU09OVGl0bGVzU3RvcmU7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcjJKU09OSW5wc1N0b3JlID0gSlNPTklucHNTdG9yZS5maWx0ZXIoKEpTT05FbCkgPT4gSlNPTkVsIGluc3RhbmNlb2YgSlNPTlN0b3JhZ2VyKTtcclxuICAgICAgICAgICAgY29uc3QgZmlsdGVyMkpTT05UaXRsZXNTdG9yZSA9IEpTT05UaXRsZXNTdG9yZS5maWx0ZXIoKEpTT05FbCkgPT4gSlNPTkVsIGluc3RhbmNlb2YgSlNPTlRpdGxlU3RvcmFnZXIpO1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyMkpTT05JbnBzU3RvcmUubGVuZ3RoID09PSBKU09OSW5wc1N0b3JlLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICAgICAgZmlsdGVyMUpTT05UaXRsZXNTdG9yZS5sZW5ndGggPT09IEpTT05UaXRsZXNTdG9yZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmUgPSBmaWx0ZXIySlNPTklucHNTdG9yZS5zb3J0KCk7XHJcbiAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmUgPSBmaWx0ZXIySlNPTlRpdGxlc1N0b3JlLnNvcnQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBKU09OVGl0bGVzU3RvcmVTdHJpbmdpZmllZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgLy9zdHJpbmdpZmljYcOnw6NvIGRhcyBzdG9yZXNcclxuICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmUuZm9yRWFjaCgoZm9ybUVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxWYWx1ZXMgPSBmb3JtRWwuc2hvd0FsbEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxWYWx1ZXNTdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KGVsVmFsdWVzKTsgLy9UT0RPIERBRE9TIEVYUE9TVE8gU09NRU5URSBQQVJBIEZJTlMgREUgVEVTVEVcclxuICAgICAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQucHVzaChlbFZhbHVlc1N0cmluZ2lmaWVkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlLmZvckVhY2goKGZvcm1FbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsVmFsdWVzID0gZm9ybUVsLnNob3dJbnBUaXRsZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbFZhbHVlc1N0cmluZ2lmaWVkID0gSlNPTi5zdHJpbmdpZnkoZWxWYWx1ZXMpOyAvL1RPRE8gREFET1MgRVhQT1NUTyBTT01FTlRFIFBBUkEgRklOUyBERSBURVNURVxyXG4gICAgICAgICAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZVN0cmluZ2lmaWVkLnB1c2goZWxWYWx1ZXNTdHJpbmdpZmllZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZCA9IEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZC5zb3J0KCk7XHJcbiAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmVTdHJpbmdpZmllZCA9IEpTT05UaXRsZXNTdG9yZVN0cmluZ2lmaWVkLnNvcnQoKTtcclxuICAgICAgICAgICAgICAgIC8vY29uY2x1c8Ojb1xyXG4gICAgICAgICAgICAgICAgaWYgKEpTT05JbnBzU3RvcmUgJiZcclxuICAgICAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmUgJiZcclxuICAgICAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmVTdHJpbmdpZmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmVTdHJpbmdpZmllZCxcclxuICAgICAgICAgICAgICAgICAgICBdOyAvL3N0cmluZ2lmaWVkIMOpIGEgdmVyc8OjbyB1c2FkYSBjb21vIERlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbCwgbnVsbF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIGNsYXNzZXMgZGUgZWxlbWVudG9zIG5vIEpTT05TdG9yZS4gXG4gICAgICAgICAgTsO6bWVybyBkZSBpbnN0w6JuY2lhcyBvYnRpZGFzIHBhcmEgaW5wdXRzOiAke2ZpbHRlcjJKU09OSW5wc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTsgTsO6bWVybyBlc3BlcmFkbzogJHtKU09OSW5wc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTtcbiAgICAgICAgICBOw7ptZXJvIGRlIGluc3TDom5jaWFzIG9idGlkYXMgcGFyYSB0aXRsZXM6ICR7ZmlsdGVyMkpTT05UaXRsZXNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07IE7Dum1lcm8gZXNwZXJhZG86ICR7SlNPTlRpdGxlc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIHRpcG9zIGRlIGVsZW1lbnRvcyBuYXMgSlNPTlN0b3JlLiBcbiAgICAgICAgTsO6bWVybyBkZSBvYmpldG9zIG9idGlkb3MgcGFyYSBpbnB1dHM6ICR7ZmlsdGVyMUpTT05JbnBzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9OyBOw7ptZXJvIGVzcGVyYWRvOiAke0pTT05JbnBzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9O1xuICAgICAgICBOw7ptZXJvIGRlIG9iamV0b3Mgb2J0aWRvcyBwYXJhIHRpdGxlczogJHtmaWx0ZXIxSlNPTlRpdGxlc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTsgTsO6bWVybyBlc3BlcmFkbzogJHtKU09OVGl0bGVzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBMZW5ndGggZGUgSlNPTiBTdG9yZSBEZXNjcmlwdG9ycyBpbnbDoWxpZGEuIFxuICAgICAgTGVuZ3RoIG9idGlkYSBwYXJhIGlucHV0czogJHtKU09OSW5wc1N0b3JlRGVzY3JpcHRvcnMubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9OyBMZW5ndGggZXNwZXJhZGE6ICR7SlNPTklucHNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07XG4gICAgICBMZW5ndGggb2J0aWRhIHBhcmEgdGl0bGVzOiAke0pTT05UaXRsZXNTdG9yZURlc2NyaXB0b3JzLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTsgTGVuZ3RoIGVzcGVyYWRhOiAke0pTT05UaXRsZXNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn1gKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSlNPTkFuY2hvcihKU09OQnRuLCBmb3JtSW5wc0Rlc2NyaXB0b3IpIHtcclxuICAgIGNvbnN0IGZvcm1hdHRlZEZvcm1EZXNjcmlwdG9yID0gZm9ybWF0SlNPTkZpbGUoZm9ybUlucHNEZXNjcmlwdG9yKTtcclxuICAgIGNvbnN0IEpTT05CbG9iID0gbmV3IEJsb2IoW2Zvcm1hdHRlZEZvcm1EZXNjcmlwdG9yWzFdXSwge1xyXG4gICAgICAgIHR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBKU09OTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgSlNPTkxpbmsuaWQgPSBcImFuY2hvckpTT05cIjtcclxuICAgIEpTT05MaW5rLmNsYXNzTmFtZSA9IEpTT05CdG4uY2xhc3NOYW1lO1xyXG4gICAgSlNPTkxpbmsuc3R5bGUud2lkdGggPSBKU09OQnRuLnN0eWxlLndpZHRoO1xyXG4gICAgSlNPTkxpbmsuc3R5bGUuaGVpZ2h0ID0gSlNPTkJ0bi5zdHlsZS5oZWlnaHQ7XHJcbiAgICBKU09OTGluay50ZXh0Q29udGVudCA9IFwiQmFpeGFyIEpTT05cIjtcclxuICAgIEpTT05MaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKEpTT05CbG9iKTtcclxuICAgIEpTT05MaW5rLmRvd25sb2FkID0gXCJmb3JtRGF0YS5qc29uXCI7XHJcbiAgICBKU09OQnRuLnJlcGxhY2VXaXRoKEpTT05MaW5rKTtcclxuICAgIHJldHVybiBKU09OTGluaztcclxufVxyXG5mdW5jdGlvbiBmb3JtYXRKU09ORmlsZShmb3JtSW5wc0Rlc2NyaXB0b3IpIHtcclxuICAgIGxldCBmb3JtYXRGb3JtRGVzY0lkcyA9IGB7XFxuYDtcclxuICAgIGxldCBmb3JtYXRGb3JtRGVzY1RpdGxlcyA9IGBgO1xyXG4gICAgbGV0IGZvcm1hdEZvcm1EZXNjSWRzUmVhZCA9IGB7XFxuYDtcclxuICAgIGxldCBmb3JtYXRGb3JtRGVzY1RpdGxlc1JlYWQgPSBge1xcbmA7XHJcbiAgICBsZXQgbGFiQWNjID0gMTtcclxuICAgIC8vZ2VyYcOnw6NvIGRhcyB1bmlkYWRlcyBmb3JtYXRhZGFzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1JbnBzRGVzY3JpcHRvci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHNlcGFyYXRpb25NYXRjaGVzID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLm1hdGNoKC9cIiwvZyk7XHJcbiAgICAgICAgaWYgKHNlcGFyYXRpb25NYXRjaGVzKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IGZpcnN0U2VwSW5kZXggPSBmb3JtSW5wc0Rlc2NyaXB0b3JbaV0uaW5kZXhPZihcIixcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZFNlcEluZGV4ID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLmluZGV4T2YoXCIsXCIsIGZvcm1JbnBzRGVzY3JpcHRvcltpXS5pbmRleE9mKFwiLFwiKSArIDEpO1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0U2VwSW5kZXggPSBmb3JtSW5wc0Rlc2NyaXB0b3JbaV0ubGFzdEluZGV4T2Yoc2VwYXJhdGlvbk1hdGNoZXNbMF0pO1xyXG4gICAgICAgICAgICAvL2Zvcm1hdGHDp8OjbyBkb3MgaWRzIGUgdmFsdWVzIGRvcyBpbnB1dHNcclxuICAgICAgICAgICAgbGV0IGlucElkID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLnNsaWNlKHNlY29uZFNlcEluZGV4ICsgMiwgbGFzdFNlcEluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKGlucElkLm1hdGNoKC8sL2cpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tYUluZGV4ID0gaW5wSWQuaW5kZXhPZihcIixcIik7XHJcbiAgICAgICAgICAgICAgICBpbnBJZCA9IGlucElkLnNsaWNlKGNvbW1hSW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgIGlmICghaW5wSWQubWF0Y2goLywvZykgfHwgbG9vcEFjYyA+IDk5OSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9vcEFjYysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLnNsaWNlKGxhc3RTZXBJbmRleCArIDIsIC0xKTtcclxuICAgICAgICAgICAgY29uc3QgbGFiID0gbWFwSWRzVGl0bGVzW2lucElkLnJlcGxhY2VBbGwoL1wiL2csIFwiXCIpXTtcclxuICAgICAgICAgICAgaWYgKGkgPT0gODkpIHtcclxuICAgICAgICAgICAgICAgIC8vYnVnIG7Do28gcmVzb2x2aWRvIGFpbmRhXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlucElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wSWQgPSAnXCJjb25maXJtTG9jSWRcIic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jb25zdHJ1w6fDo28gZSBjb25jYXRlbmHDp8OjbyBkYXMgdW5pZGFkZXMgZm9ybWF0YWRhc1xyXG4gICAgICAgICAgICBmb3JtYXRGb3JtRGVzY0lkcyArPSBgXFx0JHtpbnBJZH06ICR7dmFsdWV9LCBcXG5gO1xyXG4gICAgICAgICAgICBmb3JtYXRGb3JtRGVzY0lkc1JlYWQgKz0gYFxcdCR7bGFiQWNjfS4gJHtpbnBJZH06ICR7dmFsdWV9LCBcXG5gOyAvL3ZlcnPDtWVzIGVtIGxpc3RhIG51bWVyYWRhLCBwYXJhIGxvZ3MgZSBlbnVtZXJhw6fDo28gcG9zdGVyaW9yXHJcbiAgICAgICAgICAgIGxhYkFjYysrO1xyXG4gICAgICAgICAgICBpZiAobGFiICYmIGxhYiAhPT0gXCJudWxsXCIgJiYgbGFiICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRGb3JtRGVzY1RpdGxlc1JlYWQgKz0gYFxcdCR7bGFiQWNjfS4gJHtsYWJ9IGZvciAke2lucElkfTogJHt2YWx1ZX0sIFxcbmA7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRGb3JtRGVzY1RpdGxlcyArPSBgXFx0XCIke2xhYn1cIjogJHt2YWx1ZX0sIFxcbmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2FqdXN0ZXMgZmluYWlzIG5vcyBkZXNjcmlwdG9ycyBlIHVuacOjb1xyXG4gICAgY29uc3QgZmluYWxEZXNjSWRzID0gKGZvcm1hdEZvcm1EZXNjSWRzICtcclxuICAgICAgICBgXFxuXFxuYCArXHJcbiAgICAgICAgZm9ybWF0Rm9ybURlc2NUaXRsZXMgK1xyXG4gICAgICAgIGB9YCkucmVwbGFjZShcIiwgXFxufVwiLCBcIiBcXG59XCIpO1xyXG4gICAgY29uc3QgZmluYWxEZXNjVGl0bGVzID0gKGB7YCArIGZvcm1hdEZvcm1EZXNjVGl0bGVzICsgYH1gKS5yZXBsYWNlKFwiLCBcXG59XCIsIFwiIFxcbn1cIik7XHJcbiAgICAvL3BhcmEgbGVpdHVyYSBlbSBsb2dzIHNvbWVudGVcclxuICAgIGNvbnN0IGZpbmFsRGVzY0lkc1JlYWQgPSAoZm9ybWF0Rm9ybURlc2NJZHNSZWFkICsgYH1gKVxyXG4gICAgICAgIC5yZXBsYWNlKFwiLCBcXG59XCIsIFwiIFxcbn1cIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXCJcIm51bGxcIjogXCJudWxsXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiXCJmYWxzZVwiOiBcImZhbHNlXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wibnVsbFwiOiBcIm51bGxcIiwvZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXCJmYWxzZVwiOiBcImZhbHNlXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiZmFsc2VcIjogXCJmYWxzZVwiL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wibnVsbFwiOiBcIm51bGxcIi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cXHRbMC05XXsxLDN9LlxcczpcXHNcIm51bGxcIixcXHNcXG4vZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHM6XFxzXCJmYWxzZVwiLFxcc1xcbi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cXHRbMC05XXsxLDN9Llxcc1xcc1xcbi9nLCBcIlwiKTtcclxuICAgIGNvbnN0IGZpbmFsRGVzY1RpdGxlc1JlYWQgPSAoZm9ybWF0Rm9ybURlc2NUaXRsZXNSZWFkICsgYH1gKVxyXG4gICAgICAgIC5yZXBsYWNlKFwiLCBcXG59XCIsIFwiIFxcbn1cIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXCJcIm51bGxcIjogXCJudWxsXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiXCJmYWxzZVwiOiBcImZhbHNlXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wibnVsbFwiOiBcIm51bGxcIiwvZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXCJmYWxzZVwiOiBcImZhbHNlXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiZmFsc2VcIjogXCJmYWxzZVwiL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wibnVsbFwiOiBcIm51bGxcIi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cXHRbMC05XXsxLDN9LlxcczpcXHNcIm51bGxcIixcXHNcXG4vZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHM6XFxzXCJmYWxzZVwiLFxcc1xcbi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cXHRbMC05XXsxLDN9Llxcc1xcc1xcbi9nLCBcIlwiKTtcclxuICAgIGNvbnNvbGUubG9nKGZpbmFsRGVzY0lkc1JlYWQpO1xyXG4gICAgY29uc29sZS5sb2coZmluYWxEZXNjVGl0bGVzUmVhZCk7XHJcbiAgICByZXR1cm4gW2ZpbmFsRGVzY1RpdGxlcywgZmluYWxEZXNjSWRzXTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVnZW5lcmF0ZUpTT05CdG4oSlNPTkxpbmssIGZvcm1JbnBzRGVzY3JpcHRvcikge1xyXG4gICAgY29uc3QgbmV3SlNPTkJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBuZXdKU09OQnRuLmlkID0gXCJidG5KU09OXCI7XHJcbiAgICBuZXdKU09OQnRuLmNsYXNzTmFtZSA9IEpTT05MaW5rLmNsYXNzTmFtZTtcclxuICAgIG5ld0pTT05CdG4uc3R5bGUud2lkdGggPSBKU09OTGluay5zdHlsZS53aWR0aDtcclxuICAgIG5ld0pTT05CdG4uc3R5bGUuaGVpZ2h0ID0gSlNPTkxpbmsuc3R5bGUuaGVpZ2h0O1xyXG4gICAgbmV3SlNPTkJ0bi50ZXh0Q29udGVudCA9IFwiUmVnZW5lcmFyIEpTT05cIjtcclxuICAgIEpTT05MaW5rLnJlcGxhY2VXaXRoKG5ld0pTT05CdG4pO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbmV3SlNPTkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY3JlYXRlSlNPTkFuY2hvcihuZXdKU09OQnRuLCBmb3JtSW5wc0Rlc2NyaXB0b3IpKTtcclxuICAgIH0sIDEwMDApO1xyXG4gICAgLy8gcmV0dXJuIG5ld0pTT05CdG47XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG9wUmFkaW9IYW5kbGVyKGtleWRvd24pIHtcclxuICAgIGNvbnN0IHJhZGlvUGFpcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtpZCQ9XCJZZXNcIl0sIGlucHV0W2lkJD1cIk5vXCJdJyAvL2FjZXNzYW5kbyBjb21vIHBhclxyXG4gICAgKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFkaW9QYWlycy5sZW5ndGg7IGkgKz0gMiAvL3B1bGFuZG8gZGUgcGFyIGVtIHBhclxyXG4gICAgKSB7XHJcbiAgICAgICAgY29uc3QgcmFkaW9ZZXMgPSByYWRpb1BhaXJzW2ldO1xyXG4gICAgICAgIGNvbnN0IHJhZGlvTm8gPSByYWRpb1BhaXJzW2kgKyAxXTtcclxuICAgICAgICBpZiAoIXJhZGlvWWVzIHx8ICFyYWRpb05vKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmFkaW9ZZXMgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgIHJhZGlvTm8gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICFyYWRpb1llcy5jaGVja2VkICYmXHJcbiAgICAgICAgICAgICFyYWRpb05vLmNoZWNrZWQgJiZcclxuICAgICAgICAgICAga2V5ZG93biBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKChrZXlkb3duLmFsdEtleSAmJiBrZXlkb3duLmtleSA9PT0gXCJ5XCIpIHx8IGtleWRvd24ua2V5ID09PSBcIllcIikge1xyXG4gICAgICAgICAgICAgICAgcmFkaW9ZZXMuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHJhZGlvWWVzLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9ZZXMuYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoKGtleWRvd24uYWx0S2V5ICYmIGtleWRvd24ua2V5ID09PSBcIm5cIikgfHxcclxuICAgICAgICAgICAgICAgIGtleWRvd24ua2V5ID09PSBcIk5cIikge1xyXG4gICAgICAgICAgICAgICAgcmFkaW9Oby5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgcmFkaW9Oby5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvTm8uYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgcmFkaW9ZZXM6ICR7cmFkaW9ZZXM/LmNoZWNrZWQgPz8gZmFsc2V9YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgcmFkaW9ObzogJHtyYWRpb05vPy5jaGVja2VkID8/IGZhbHNlfWApO1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7SlNPTi5zdHJpbmdpZnkoa2V5ZG93bil9YCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChzbGljZWRFcnJvciA/PyBcIk5VTExcIiwgXCJ2YWxpZGFuZG8gcmFkaW9ZZXMgb3UgcmFkaW9zTm8gb3Uga2V5ZG93biBldmVudCB0YXJnZXRcIiwgcmFkaW9ZZXMgPz8gbnVsbCwgcmFkaW9ObyA/PyBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNwYklucEhhbmRsZXIocmFkaW8pIHtcclxuICAgIGlmIChyYWRpby5wYXJlbnRFbGVtZW50ICYmIHJhZGlvLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IG9wUmFkaW9zQ2hlY2sgPSByYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbaWRePSdDcGInXVtpZCQ9J1llcyddXCIpO1xyXG4gICAgICAgIGNvbnN0IG9wUmFkaW9zVGV4dCA9IHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFtpZF49J3BiJ11baWQkPSdZZXMnXVwiKTtcclxuICAgICAgICBjb25zdCBhbnRGYW1DaGVja3MgPSByYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbaWRePSdhbnRGYW0nXVwiKTtcclxuICAgICAgICBjb25zdCB0ZXh0QWRkID0gcmFkaW8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvckFsbChcInRleHRhcmVhW2lkXj0ndGV4dEFkZCddXCIpO1xyXG4gICAgICAgIGNvbnN0IGRpdkFkZCA9IHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZbaWRePSdkaXZBZGQnXVwiKTtcclxuICAgICAgICAvL2luY2x1aSBhbWJvcyBvcyB0aXBvcyBkZSBldmVudG9zXHJcbiAgICAgICAgaWYgKG9wUmFkaW9zQ2hlY2subGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBvcFJhZGlvc0NoZWNrPy5mb3JFYWNoKGZ1bmN0aW9uIChvcFJhZGlvQ2hlY2ssIGkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkaXZBZGRbaV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIG9wUmFkaW9DaGVjayBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAob3BSYWRpb0NoZWNrLnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fCBvcFJhZGlvQ2hlY2sudHlwZSA9PT0gXCJyYWRpb1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3BSYWRpb0NoZWNrLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2QWRkW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdkFkZFtpXS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcFJhZGlvc1RleHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBvcFJhZGlvc1RleHQ/LmZvckVhY2goZnVuY3Rpb24gKG9wUmFkaW9UZXh0LCBpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dEFkZFtpXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgb3BSYWRpb1RleHQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKG9wUmFkaW9UZXh0LnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fCBvcFJhZGlvVGV4dC50eXBlID09PSBcInJhZGlvXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcFJhZGlvVGV4dC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBZGRbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFkZFtpXS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhbnRGYW1DaGVja3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBhbnRGYW1DaGVja3M/LmZvckVhY2goKGFudEZhbUNoZWNrLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9zZXN0QWRkRWxlbWVudCA9IGFudEZhbUNoZWNrc1tpXS5wYXJlbnRFbGVtZW50Py5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdEFkZEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbnRGYW1DaGVjayBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGFudEZhbUNoZWNrLnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fCBhbnRGYW1DaGVjay50eXBlID09PSBcInJhZGlvXCIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFhbnRGYW1DaGVjay5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RBZGRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RBZGRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChzbGljZWRFcnJvciA/PyBcIk5VTExcIiwgXCJsb2NhbGl6YW5kbyBwYXJlbnQgZWxlbWVudHMgZGUgUmFkaW9cIiwgcmFkaW8/LnBhcmVudEVsZW1lbnQgPz8gbnVsbCwgcmFkaW8/LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQgPz8gbnVsbCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0VGV4dElucHV0KCkge1xyXG4gICAgY29uc3QgbnVtYmVySW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXVtpZCQ9TnVtSWRdJyk7XHJcbiAgICBjb25zdCBudWxsUmFkaW9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdW2lkJD1OdWxsSWRdJyk7XHJcbiAgICBpZiAobnVtYmVySW5wdXRzLmxlbmd0aCAhPT0gbnVsbFJhZGlvcy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiTsO6bWVybyBkZSB0ZXh0cyBlIHJhZGlvcyBuw6NvIGNvcnJlc3BvbmRlIVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBudW1iZXJJbnB1dHMuZm9yRWFjaCgobnVtYmVySW5wdXQsIGkpID0+IHtcclxuICAgICAgICBjb25zdCBudWxsUmFkaW8gPSBudWxsUmFkaW9zW2ldO1xyXG4gICAgICAgIGlmIChudWxsUmFkaW8uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICBudW1iZXJJbnB1dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG51bWJlcklucHV0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkb3VibGVDbGlja0hhbmRsZXIoaW5wdXQpIHtcclxuICAgIGlucHV0LmNoZWNrZWQgPSBpbnB1dC5jaGVja2VkID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgY3BiSW5wSGFuZGxlcihpbnB1dCk7XHJcbiAgICBkZWFjdFRleHRJbnB1dCgpO1xyXG59XHJcbi8vIGV4cG9ydCBmdW5jdGlvbiB0b3VjaFN0YXJ0SGFuZGxlcihrZXlkb3duOiBLZXlib2FyZEV2ZW50KSB7XHJcbi8vICAgbGV0IGZpcnN0VGFwVGltZSA9IDA7XHJcbi8vICAgaWYgKGZpcnN0VGFwVGltZSA9PT0gMCkge1xyXG4vLyAgICAgZmlyc3RUYXBUaW1lID0gRGF0ZS5ub3coKTtcclxuLy8gICB9IGVsc2Uge1xyXG4vLyAgICAgY29uc3QgZWxhcHNlZCA9IERhdGUubm93KCkgLSBmaXJzdFRhcFRpbWU7XHJcbi8vICAgICBpZiAoZWxhcHNlZCA8IDEwMDApIHtcclxuLy8gICAgICAgLy8gTGltaXRlIGRlIHRlbXBvIHBhcmEgY29uc2lkZXJhciB1bSBkdXBsbyB0b3F1ZSAoMzAwbXMpXHJcbi8vICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcclxuLy8gICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICB0aGlzLmNoZWNrZWQgPSB0cnVlO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICAgIGZpcnN0VGFwVGltZSA9IDA7IC8vIFJlaW5pY2lhciBvIHRlbXBvcml6YWRvclxyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgZmlyc3RUYXBUaW1lID0gRGF0ZS5ub3coKTsgLy8gSW5pY2lhciB1bSBub3ZvIHRlbXBvcml6YWRvclxyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy8gICBvcFJhZGlvSGFuZGxlcihrZXlkb3duKTtcclxuLy8gICBjcGJJbnBIYW5kbGVyKHRoaXMpO1xyXG4vLyB9XHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VDdXJyZW50RGF0ZShhY3RpdmF0aW9uLCBkYXRlQnRuKSB7XHJcbiAgICBjb25zdCBkYXRhQXR1YWwgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgYW5vID0gZGF0YUF0dWFsLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCBtZXMgPSAoZGF0YUF0dWFsLmdldE1vbnRoKCkgKyAxKVxyXG4gICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgLnBhZFN0YXJ0KDIsIFwiMFwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKFwiJ1wiLCBcIlwiKTtcclxuICAgIGNvbnN0IGRpYSA9IGRhdGFBdHVhbFxyXG4gICAgICAgIC5nZXREYXRlKClcclxuICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgIC5wYWRTdGFydCgyLCBcIjBcIilcclxuICAgICAgICAucmVwbGFjZUFsbChcIidcIiwgXCJcIik7XHJcbiAgICBjb25zdCB0YXJnSW5wdXREYXRlID0gc2VhcmNoUHJldmlvdXNTaWJsaW5ncyhkYXRlQnRuLCBcImlucERhdGVcIik7XHJcbiAgICBpZiAoYWN0aXZhdGlvbi50YXJnZXQgPT09IGRhdGVCdG4gJiZcclxuICAgICAgICB0YXJnSW5wdXREYXRlICYmXHJcbiAgICAgICAgdGFyZ0lucHV0RGF0ZS50YWdOYW1lID09PSBcIklOUFVUXCIgJiZcclxuICAgICAgICB0YXJnSW5wdXREYXRlIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgIHRhcmdJbnB1dERhdGUudmFsdWUgPSBhbm8gKyBcIi1cIiArIG1lcyArIFwiLVwiICsgZGlhO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhcmdJbnB1dERhdGUgPz8gbnVsbCwgXCJ0YXJnSW5wdXREYXRlXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoTmV4dFNpYmxpbmdzKGN1cnJlbnRFbGVtZW50LCBzZWFyY2hlZFNpYmxpbmdDbGFzcykge1xyXG4gICAgbGV0IGxvb3BBY2MgPSAwO1xyXG4gICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZykge1xyXG4gICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIGNvbnN0IGlzU2libGluZ1ZhbGlkID0gY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlYXJjaGVkU2libGluZ0NsYXNzKTtcclxuICAgICAgICBpZiAoaXNTaWJsaW5nVmFsaWQgfHwgbG9vcEFjYyA+IDk5OSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9vcEFjYysrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRFbGVtZW50O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQcmV2aW91c1NpYmxpbmdzKGN1cnJlbnRFbGVtZW50LCBzZWFyY2hlZFNpYmxpbmdDbGFzcykge1xyXG4gICAgbGV0IGxvb3BBY2MgPSAwO1xyXG4gICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcclxuICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgY29uc3QgaXNTaWJsaW5nVmFsaWQgPSBjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoc2VhcmNoZWRTaWJsaW5nQ2xhc3MpO1xyXG4gICAgICAgIGlmIChpc1NpYmxpbmdWYWxpZCB8fCBsb29wQWNjID4gOTk5KSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb29wQWNjKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFByZXZpb3VzU2libGluZ3NCeUlkKGN1cnJlbnRFbGVtZW50LCBzZWFyY2hlZFNpYmxpbmdJZCkge1xyXG4gICAgbGV0IGxvb3BBY2MgPSAwO1xyXG4gICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcclxuICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgY29uc3QgaXNTaWJsaW5nVmFsaWQgPSBjdXJyZW50RWxlbWVudC5pZCA9PT0gc2VhcmNoZWRTaWJsaW5nSWQ7XHJcbiAgICAgICAgaWYgKGlzU2libGluZ1ZhbGlkIHx8IGxvb3BBY2MgPiA5OTkpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvb3BBY2MrKztcclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUGFyZW50cyhjdXJyZW50RWxlbWVudCwgc2VhcmNoZWRQYXJlbnRDbGFzcykge1xyXG4gICAgbGV0IGxvb3BBY2MgPSAwO1xyXG4gICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgaXNQYXJlbnRWYWxpZCA9IGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhzZWFyY2hlZFBhcmVudENsYXNzKTtcclxuICAgICAgICBpZiAoaXNQYXJlbnRWYWxpZCB8fCBsb29wQWNjID4gOTk5KSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb29wQWNjKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVRvQXN0RGlnaXQoY2xpY2ssIHRvRmlsZUlucEJ0bikge1xyXG4gICAgY29uc3QgdXNlQXN0RGlnaXRSZWdleCA9IC9Vc2FyIEFzc2luYXR1cmEgRGlnaXRhbC87XHJcbiAgICBjb25zdCB1c2VBc3REaWd0UmVnZXhPYmogPSBuZXcgUmVnRXhwKHVzZUFzdERpZ2l0UmVnZXgpO1xyXG4gICAgY29uc3QgdXNlQXN0VGV4dFJlZ2V4ID0gL1JldG9ybmFyIMOgIEFzc2luYXR1cmEgRXNjcml0YS87XHJcbiAgICBjb25zdCB1c2VBc3RUZXh0UmVnZXhPYmogPSBuZXcgUmVnRXhwKHVzZUFzdFRleHRSZWdleCk7XHJcbiAgICBsZXQgbGFiQ29udCA9IHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGFiQXN0XCIpID8/IFwibnVsbFwiO1xyXG4gICAgaWYgKGxhYkNvbnRbMF0gPT09IFwibnVsbFwiICYmXHJcbiAgICAgICAgKHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py50YWdOYW1lID09PSBcIkxBQkVMXCIgfHxcclxuICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQ/LnRhZ05hbWUgPT09IFwiU1BBTlwiKSkge1xyXG4gICAgICAgIGxhYkNvbnQgPSBBcnJheS5vZih0b0ZpbGVJbnBCdG4ucGFyZW50RWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY2xpY2sudGFyZ2V0ID09PSB0b0ZpbGVJbnBCdG4pIHtcclxuICAgICAgICBpZiAodG9GaWxlSW5wQnRuLnRleHRDb250ZW50ICYmXHJcbiAgICAgICAgICAgIHVzZUFzdERpZ3RSZWdleE9iai50ZXN0KHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCkpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5wQXN0ID0gc2VhcmNoUHJldmlvdXNTaWJsaW5ncyh0b0ZpbGVJbnBCdG4sIFwiaW5wQXN0XCIpO1xyXG4gICAgICAgICAgICBpZiAoaW5wQXN0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZUlucCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAudHlwZSA9IFwiZmlsZVwiO1xyXG4gICAgICAgICAgICAgICAgZmlsZUlucC5uYW1lID0gaW5wQXN0Lm5hbWU7IC8vaWdub3JhciBUU1xyXG4gICAgICAgICAgICAgICAgZmlsZUlucC5pZCA9IGlucEFzdC5pZDtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAuY2xhc3NOYW1lID0gaW5wQXN0LmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAuc2V0QXR0cmlidXRlKFwiYWNjZXB0XCIsIFwiaW1hZ2UvKlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnBBc3QucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLnJlcXVpcmVkID0gaW5wQXN0LnJlcXVpcmVkOyAvL2lnbm9yYXIgVFNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbnBBc3QucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucEFzdC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChmaWxlSW5wLCBpbnBBc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkTGFiTWF0Y2ggPSBsYWJDb250WzBdLmlkLm1hdGNoKC9Bc3QvKT8udG9TdHJpbmcoKSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2ggPSBmaWxlSW5wLmlkLm1hdGNoKC9Bc3QvKT8udG9TdHJpbmcoKSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkTGFiTWF0Y2hJbmRleCA9IGxhYkNvbnRbMF0uaWQuaW5kZXhPZihpZExhYk1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZElucE1hdGNoSW5kZXggPSBmaWxlSW5wLmlkLmluZGV4T2YoaWRJbnBNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkTGFiTWF0Y2hJbmRleCAmJiBpZElucE1hdGNoSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VPbmVMYWJJZCA9IGxhYkNvbnRbMF0uaWQuc2xpY2UoMCwgaWRMYWJNYXRjaEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VUd29JbnBJZCA9IGZpbGVJbnAuaWQuc2xpY2UoaWRJbnBNYXRjaEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiQ29udFswXS5pZCA9IHNsaWNlT25lTGFiSWQgKyBzbGljZVR3b0lucElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQgPSBcIlJldG9ybmFyIMOgIEFzc2luYXR1cmEgRXNjcml0YVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9GaWxlSW5wQnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmc/LnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJybyBubyBtYXRjaCBkZSBpZHMgZG8gaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlSW5wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoY2hvc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNob3NlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5maWxlcyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmZpbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nRmlsZSA9IGZpbGVJbnAuZmlsZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWdGaWxlICYmIGltZ0ZpbGUudHlwZS5zdGFydHNXaXRoKFwiaW1hZ2VcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSAobG9hZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmaW5pciBsw7NnaWNhIHBhcmEgY2FycmVnYW1lbnRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pbmljaWEgcHJlcGFybyBwYXJhIGV2ZW50byBkZSBjYXJyZWdhbWVudG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWdVcmwgPSBsb2FkLnRhcmdldD8ucmVzdWx0OyAvL2NoZWNhIGEgdXJsIGRvIGZpbGUgcXVlIHNlcsOhIGNhcnJlZ2Fkb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZ0FzdERpZ3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpOyAvL2NyaWEgY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5pZCA9IGlucEFzdC5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmNsYXNzTmFtZSA9IGlucEFzdC5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW1nVXJsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3Quc3JjID0gaW1nVXJsOyAvL2Fzc29jaWHDp8OjbyBlbnRyZSBjb250YWluZXIgZSBmaWxlIGNhcnJlZ2Fkb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LmlkID0gZmlsZUlucC5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LmNsYXNzTmFtZSA9IGZpbGVJbnAuY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3Quc2V0QXR0cmlidXRlKFwiYWx0XCIsIFwiQXNzaW5hdHVyYSBEaWdpdGFsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3Quc2V0QXR0cmlidXRlKFwiZGVjb2RpbmdcIiwgXCJhc3luY1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnNldEF0dHJpYnV0ZShcImxvYWRpbmdcIiwgXCJlYWdlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnNldEF0dHJpYnV0ZShcImNyb3Nzb3JpZ2luXCIsIFwiYW5vbnltb3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3Quc3R5bGUuc2V0UHJvcGVydHkoXCJtYXgtd2lkdGhcIiwgXCIzMDBweFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnN0eWxlLnNldFByb3BlcnR5KFwibWF4LWhlaWdodFwiLCBcIjIwMHB4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlSW5wLnBhcmVudEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiQ29udCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJDb250Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChpbWdBc3REaWd0LCBmaWxlSW5wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRMYWJNYXRjaCA9IGxhYkNvbnRbMF0uaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaCgvQXN0LylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRJbnBNYXRjaCA9IGltZ0FzdERpZ3QuaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXRjaCgvQXN0LylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkTGFiTWF0Y2ggJiYgaWRJbnBNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRMYWJNYXRjaEluZGV4ID0gbGFiQ29udFswXS5pZC5pbmRleE9mKGlkTGFiTWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRJbnBNYXRjaEluZGV4ID0gaW1nQXN0RGlndC5pZC5pbmRleE9mKGlkSW5wTWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VPbmVMYWJJZCA9IGxhYkNvbnRbMF0uaWQuc2xpY2UoMCwgaWRMYWJNYXRjaEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlVHdvSW5wSWQgPSBpbWdBc3REaWd0LmlkLnNsaWNlKGlkSW5wTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJDb250WzBdLmlkID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGljZU9uZUxhYklkICsgc2xpY2VUd29JbnBJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gbWF0Y2ggZGUgaWRzIGRvIGlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gbmEgdmFsaWRhw6fDo28gZGUgbGFiQ29udDogZWxlbWVudG8gJHtsYWJDb250fVxuICAgICAgICAgICAgICAgICAgICAgICAgZS9vdSBwYXJlbnQ6IGVsZW1lbnRvICR7ZmlsZUlucC5wYXJlbnRFbGVtZW50fWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbWdBc3REaWd0LnN0eWxlLndpZHRoID0gaW1nQXN0RGlndC5wYXJlbnRFbGVtZW50LnN0eWxlLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWdBc3REaWd0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBjb21wdXRlSW1nQXN0ZFdpZHRoID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWdBc3REaWd0KS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1nQXN0RGlndC5wYXJlbnRFbGVtZW50LnN0eWxlLndpZHRoID0gY29tcHV0ZUltZ0FzdGRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zdHlsZS5zZXRQcm9wZXJ0eShcIm92ZXJmbG93XCIsIFwiYXV0b1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGltZ0ZpbGUpOyAvL2zDqiBvIGZpbGUgYmFzZWFkbyBuYSBzcmMgY2FycmVnYWRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5lbmh1bSBhcnF1aXZvIHNlbGVjaW9uYWRvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKGlucEFzdCA/PyBudWxsLCBcImlucEFzdFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9UT0RPIElOQ0xVSVIgVE9LRU4gQU5USS1DU1JGIFFVQU5ETyBIT1VWRVIgU0VSVklET1JcclxuICAgICAgICAgICAgLy8gZmlsZUlucC5uYW1lID0gaW5wQXN0Lm5hbWU7XHJcbiAgICAgICAgICAgIC8vIGZpbGVJbnAuaWQgPSBpbnBBc3QuaWQ7XHJcbiAgICAgICAgICAgIC8vIGZpbGVJbnAuY2xhc3NOYW1lID0gaW5wQXN0LmNsYXNzTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodG9GaWxlSW5wQnRuLnRleHRDb250ZW50ICYmXHJcbiAgICAgICAgICAgIHVzZUFzdFRleHRSZWdleE9iai50ZXN0KHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCkpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5wQXN0ID0gc2VhcmNoUHJldmlvdXNTaWJsaW5ncyh0b0ZpbGVJbnBCdG4sIFwiaW5wQXN0XCIpIHx8XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hQcmV2aW91c1NpYmxpbmdzKHRvRmlsZUlucEJ0biwgXCJpbWdBc3REaWdpdFwiKTtcclxuICAgICAgICAgICAgaWYgKGlucEFzdCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgfHxcclxuICAgICAgICAgICAgICAgIGlucEFzdCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJbnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAubmFtZSA9IGlucEFzdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgZmlsZUlucC5pZCA9IGlucEFzdC5pZDtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAuY2xhc3NOYW1lID0gaW5wQXN0LmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wQXN0LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnBBc3QucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoZmlsZUlucCwgaW5wQXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoID0gbGFiQ29udFswXS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goL0FzdC8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZElucE1hdGNoID0gZmlsZUlucC5pZC5tYXRjaCgvQXN0Lyk/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkTGFiTWF0Y2ggJiYgaWRJbnBNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoSW5kZXggPSBsYWJDb250WzBdLmlkLmluZGV4T2YoaWRMYWJNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2hJbmRleCA9IGZpbGVJbnAuaWQuaW5kZXhPZihpZElucE1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VPbmVMYWJJZCA9IGxhYkNvbnRbMF0uaWQuc2xpY2UoMCwgaWRMYWJNYXRjaEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VUd29JbnBJZCA9IGZpbGVJbnAuaWQuc2xpY2UoaWRJbnBNYXRjaEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiQ29udFswXS5pZCA9IHNsaWNlT25lTGFiSWQgKyBzbGljZVR3b0lucElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQgPSBcIlVzYXIgQXNzaW5hdHVyYSBEaWdpdGFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvRmlsZUlucEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nPy5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEdsb2JhbE1vZGVsLmF1dG9DYXBpdGFsaXplSW5wdXRzKGZpbGVJbnApKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gbWF0Y2ggZGUgaWRzIGRvIElucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoaW5wQXN0ID8/IG51bGwsIFwiaW5wQXN0XCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRhckZvcm11bGFyaW8oY2xpY2ssIHRvRmlsZUlucEJ0bnMpIHtcclxuICAgIGlmIChjbGljay50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxyXG4gICAgICAgIGNsaWNrLnRhcmdldC50YWdOYW1lID09PSBcIkJVVFRPTlwiKSB7XHJcbiAgICAgICAgY29uc3QgZm9ybXVsYXJpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUFuYW1HSWRcIik7XHJcbiAgICAgICAgY29uc3QgZWRpdGFibGVDaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2l0ZVtjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJdJyk7XHJcbiAgICAgICAgY29uc3QgZ2VuQmlydGhSZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdlbkJpcnRoUmVsSWRcIik7XHJcbiAgICAgICAgY29uc3QgZ2VuVHJhbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdlblRyYW5zSWRcIik7XHJcbiAgICAgICAgaWYgKGZvcm11bGFyaW8gJiYgZm9ybXVsYXJpbyBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCkge1xyXG4gICAgICAgICAgICBmb3JtdWxhcmlvLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJybyB2YWxpZGFuZG8gZm9ybXVsw6FyaW9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlZGl0YWJsZUNpdGUpIHtcclxuICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gYC0tTm9tZWA7XHJcbiAgICAgICAgICAgIEdsb2JhbE1vZGVsLnJlbW92ZUZpcnN0Q2xpY2soZWRpdGFibGVDaXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgZWRpdGFibGVDaXRlIG7Do28gZW5jb250cmFkbyBlbSByZXNldC5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGdlbkJpcnRoUmVsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZ2VuQmlydGhSZWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGdlbkJpcnRoUmVsLnZhbHVlID0gXCJjaXNcIjtcclxuICAgICAgICAgICAgZ2VuQmlydGhSZWwuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgZ2VuQmlydGhSZWwgbsOjbyBlbmNvbnRyYWRvIGVtIHJlc2V0LmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ2VuVHJhbnMgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICBnZW5UcmFucyBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZ2VuVHJhbnMudmFsdWUgPSBcImF2YW5jYWRvXCI7XHJcbiAgICAgICAgICAgIGdlblRyYW5zLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYGdlblRyYW5zIG7Do28gZW5jb250cmFkbyBlbSByZXNldC5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9GaWxlSW5wQnRucy5mb3JFYWNoKCh0b0ZpbGVJbnBCdG4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCA9PT0gXCJSZXRvcm5hciDDoCBBc3NpbmF0dXJhIEVzY3JpdGFcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wQXN0ID0gc2VhcmNoUHJldmlvdXNTaWJsaW5ncyh0b0ZpbGVJbnBCdG4sIFwiaW5wQXN0XCIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUHJldmlvdXNTaWJsaW5ncyh0b0ZpbGVJbnBCdG4sIFwiaW1nQXN0RGlnaXRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wQXN0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKGlucEFzdCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wQXN0IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlSW5wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVJbnAudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVJbnAubmFtZSA9IGlucEFzdC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuaWQgPSBpbnBBc3QuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5jbGFzc05hbWUgPSBpbnBBc3QuY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucEFzdC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYWJDb250ID0gdG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQ/LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsYWJBc3RcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibnVsbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxhYkNvbnRbMF0gPT09IFwibnVsbFwiIHx8IGxhYkNvbnRbMF0uaWQgPT09IFwiXCIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQ/LnRhZ05hbWUgPT09IFwiTEFCRUxcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py50YWdOYW1lID09PSBcIlNQQU5cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYkNvbnQgPSBBcnJheS5vZih0b0ZpbGVJbnBCdG4ucGFyZW50RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wQXN0LnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKGZpbGVJbnAsIGlucEFzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkTGFiTWF0Y2ggPSBsYWJDb250WzBdLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goL0FzdC8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2ggPSBmaWxlSW5wLmlkLm1hdGNoKC9Bc3QvKT8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkTGFiTWF0Y2ggJiYgaWRJbnBNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRMYWJNYXRjaEluZGV4ID0gbGFiQ29udFswXS5pZC5pbmRleE9mKGlkTGFiTWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRJbnBNYXRjaEluZGV4ID0gZmlsZUlucC5pZC5pbmRleE9mKGlkSW5wTWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VPbmVMYWJJZCA9IGxhYkNvbnRbMF0uaWQuc2xpY2UoMCwgaWRMYWJNYXRjaEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlVHdvSW5wSWQgPSBmaWxlSW5wLmlkLnNsaWNlKGlkSW5wTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJDb250WzBdLmlkID0gc2xpY2VPbmVMYWJJZCArIHNsaWNlVHdvSW5wSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyhmaWxlSW5wKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQgPSBcIlVzYXIgQXNzaW5hdHVyYSBEaWdpdGFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4ucHJldmlvdXNFbGVtZW50U2libGluZz8ucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJybyBubyBtYXRjaCBkZSBpZHMgZG8gaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyBsb2NhbGl6YW5kbyBQYXJlbnQgRWxlbWVudCBkZSBpbnBBc3RgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gcmVjb25oZWNlbmRvIFByZXZpb3VzIEVsZW1lbnQgU2libGluZzogaW5wQXN0ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChpbnBBc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSl9YCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIHRhcmdldDogaW5zdMOibmNpYSBkZSAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgLmNhbGwoY2xpY2sudGFyZ2V0KVxyXG4gICAgICAgICAgICAuc2xpY2UoOCwgLTEpfWApO1xyXG4gICAgfVxyXG59XHJcbi8vVE9ETyBGSU5BTElaQVIgQ09NIENTU1xyXG5leHBvcnQgZnVuY3Rpb24gc3ViRm9ybSgpIHtcclxuICAgIHdpbmRvdy5hbGVydChcIlNpc3RlbWEgYWluZGEgbsOjbyBwcm9udG9cXG4uLi5tYXMgdm9jw6ogdGVyaWEgZW52aWFkbyBjbGljYW5kbyBhcXVpISA6KVwiKTtcclxuICAgIC8vIGNvbnN0IHJlcXVpcmVkRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW3JlcXVpcmVkXVwiKTtcclxuICAgIC8vIGlmIChyZXF1aXJlZEVsZW1lbnRzKSB7XHJcbiAgICAvLyAgIGNvbnN0IGVtcHR5RWxlbWVudHMgPSBBcnJheS5mcm9tKHJlcXVpcmVkRWxlbWVudHMpLmZpbHRlcigoZWxlbWVudCkgPT4ge1xyXG4gICAgLy8gICAgIGNvbnN0IHZhbHVlID0gZWxlbWVudC52YWx1ZSB8fCBlbGVtZW50LnRleHRDb250ZW50IHx8IFwiXCI7XHJcbiAgICAvLyAgICAgcmV0dXJuIHZhbHVlID09PSBcIlwiO1xyXG4gICAgLy8gICB9KTtcclxuICAgIC8vICAgaWYgKGVtcHR5RWxlbWVudHMpIHtcclxuICAgIC8vICAgICBlbXB0eUVsZW1lbnRzLmZvckVhY2goKGVtcHR5RWxlbWVudCkgPT4ge1xyXG4gICAgLy8gICAgICAgY29uc29sZS5sb2coXCJFbGVtZW50byB2YXppbzogXCIsIGVtcHR5RWxlbWVudC5pZCk7XHJcbiAgICAvLyAgICAgICBlbXB0eUVsZW1lbnQuc3R5bGUuYm9yZGVyID0gXCJyZ2IoMjU1LCAwLCAwKVwiO1xyXG4gICAgLy8gICAgICAgbGV0IGVtcHR5RWxlbWVudENTdHlsZSA9IHdpbmRvd1xyXG4gICAgLy8gICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZShlbXB0eUVsZW1lbnQpXHJcbiAgICAvLyAgICAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKFwiYm9yZGVyLWNvbG9yXCIpO1xyXG4gICAgLy8gICAgICAgbGV0IHJnYmFNYXRjaCA9IGVtcHR5RWxlbWVudENTdHlsZS5tYXRjaChyZ2JhUmVnZXgpO1xyXG4gICAgLy8gICAgICAgaWYgKHJnYmFNYXRjaCkge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcInJnYmEgXCIgKyByZ2JhTWF0Y2gpO1xyXG4gICAgLy8gICAgICAgICAvLyBjb25zdCBmYWRpbmdBbGVydCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgLy8gICBsZXQgcmdiYU1hdGNoID0gZW1wdHlFbGVtZW50Q1N0eWxlLm1hdGNoKHJnYmFSZWdleCk7XHJcbiAgICAvLyAgICAgICAgIC8vIH0pO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbn1cclxuIiwiLy9uZXNzZSBmaWxlIGVzdMOjbyBwcmVzZW50ZXMgcHJpbmNpcGFsbWVudGUgYXMgZnVuw6fDtWVzIHJlbGFjaW9uYWRhcyDDoCBleGlnw6puY2lhIGRlIG1vZGVsbyB0ZXh0dWFsIGUgZGUgdmlzdWFsaXphw6fDo29cclxuaW1wb3J0ICogYXMgR2xvYmFsSGFuZGxlciBmcm9tIFwiLi9nSGFuZGxlcnNcIjtcclxuaW1wb3J0IHsgTWFuLCBXb21hbiwgTmV1dHJvIH0gZnJvbSBcIi4vY2xhc3Nlc1wiO1xyXG5pbXBvcnQgKiBhcyBFcnJvckhhbmRsZXIgZnJvbSBcIi4vZXJyb3JIYW5kbGVyXCI7XHJcbi8vIGltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmNvbnN0IGF1dG9DYXBpdGFsaXplRmlyc3RMZXR0ZXJSZWdleCA9IC9cXGJcXHcvO1xyXG5sZXQgaXNBdXRvY29ycmVjdE9uID0gdHJ1ZTtcclxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlckxpbWl0KGlucHV0RWxlbWVudCkge1xyXG4gICAgbGV0IG51bWJlclZhbHVlID0gaW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgY29uc3QgbnVtYmVyVmFsdWVJbnQgPSBwYXJzZUludChudW1iZXJWYWx1ZSk7XHJcbiAgICBjb25zdCBpc0F0aXZGaXMgPSBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wQXRpdkZpc1wiKTtcclxuICAgIGNvbnN0IGlzQWxpbVJvdCA9IGlucHV0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBBbGltUm90XCIpO1xyXG4gICAgY29uc3QgaXNMb2NOdW0gPSBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wTG9jTnVtXCIpO1xyXG4gICAgY29uc3QgaXNEREQgPSBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wREREXCIpO1xyXG4gICAgY29uc3QgaXNGbG9hdCA9IGlucHV0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJmbG9hdFwiKTtcclxuICAgIGNvbnN0IGlzRnJlcSA9IGlucHV0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJmcmVxSW5wTGlzdFwiKTtcclxuICAgIGlmICgoaXNBdGl2RmlzIHx8IGlzQWxpbVJvdCB8fCBpc0xvY051bSB8fCBpc0RERCB8fCBpc0ZyZXEpICYmICFpc0Zsb2F0KSB7XHJcbiAgICAgICAgaWYgKG51bWJlclZhbHVlLm1hdGNoKC9bPS4sO34vfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dL2cpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyb25nTWF0Y2ggPSBudW1iZXJWYWx1ZS5tYXRjaCgvWz0uLDt+L3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXS9nKTtcclxuICAgICAgICAgICAgY29uc3Qgd3JvbmdNYXRjaEluZGV4ID0gbnVtYmVyVmFsdWUuaW5kZXhPZih3cm9uZ01hdGNoPy5bMF0gPz8gXCJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZFZhbHVlID0gbnVtYmVyVmFsdWUuc2xpY2UoMCwgd3JvbmdNYXRjaEluZGV4KTtcclxuICAgICAgICAgICAgY29uc3QgYWZ0ZXJTbGljZSA9IG51bWJlclZhbHVlLnNsaWNlKHdyb25nTWF0Y2hJbmRleCArIDEpO1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBzbGljZWRWYWx1ZSArIGFmdGVyU2xpY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IDI7XHJcbiAgICAgICAgY29uc3QgbWF4SW5wdXQgPSBpbnB1dEVsZW1lbnQuaWQuZW5kc1dpdGgoXCJNYXhcIik7XHJcbiAgICAgICAgaWYgKG51bWJlclZhbHVlSW50IDwgMSAmJiBtYXhJbnB1dCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbnBWYWx1ZUFycmF5ID0gQXJyYXkuZnJvbShpbnB1dEVsZW1lbnQudmFsdWUpO1xyXG4gICAgICAgICAgICBpbnBWYWx1ZUFycmF5LnNwbGljZSgwLCAxLCBcIjFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpeGVkSW5wVmFsdWVpbnBWYWx1ZUFycmF5ID0gaW5wVmFsdWVBcnJheS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBmaXhlZElucFZhbHVlaW5wVmFsdWVBcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChpc0F0aXZGaXMgfHwgaXNBbGltUm90IHx8IGlzREREIHx8IGlzRnJlcSkgJiZcclxuICAgICAgICAgICAgbnVtYmVyVmFsdWUubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIG51bWJlclZhbHVlID0gbnVtYmVyVmFsdWUuc2xpY2UoMCwgbWF4TGVuZ3RoKTtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gbnVtYmVyVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVOZWdhdGl2ZXModGFiSW5wKSB7XHJcbiAgICBsZXQgcGFyc2VkSW5wVmFsdWUgPSAwO1xyXG4gICAgaWYgKHRhYklucCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBwYXJzZWRJbnBWYWx1ZSA9IHBhcnNlRmxvYXQodGFiSW5wLnZhbHVlKTtcclxuICAgICAgICAvLyBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlZElucFZhbHVlKSB8fCBwYXJzZWRJbnBWYWx1ZSA8IDApIHtcclxuICAgICAgICAvLyAgIHBhcnNlZElucFZhbHVlID0gMDtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQodGFiSW5wID8/IG51bGwsIFwidGFiSW5wXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJzZWRJbnBWYWx1ZS50b1N0cmluZygpO1xyXG59XHJcbmZ1bmN0aW9uIGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgbWF0Y2gsIHRleHRFbGVtZW50KSB7XHJcbiAgICBsZXQgdGV4dCA9IHRleHRFbGVtZW50LnZhbHVlIHx8IHRleHRFbGVtZW50LnRleHRDb250ZW50IHx8IG51bGw7XHJcbiAgICBsZXQgaXNGaXhBZnRlckRDdXJzb3JFeGVjID0gZmFsc2U7XHJcbiAgICBpZiAoaXNGaXhBZnRlckRDdXJzb3JFeGVjKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHNlbGVjdGlvblBvc2l0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpPy5nZXRSYW5nZUF0KDApLnN0YXJ0T2Zmc2V0O1xyXG4gICAgdGV4dCA9IHdyb25nU3RhcnRDb3JyZWN0aW9uKHRleHQsIG1hdGNoKTtcclxuICAgIHRleHRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZml4bW92ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGtleWJvYXJkRXZlbnQgPSBmaXhtb3ZlO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb25Qb3NpdGlvbiA9PT0gMCB8fCBzZWxlY3Rpb25Qb3NpdGlvbiA9PT0gdGV4dD8ubGVuZ3RoIHx8IDApIHtcclxuICAgICAgICAgICAgaWYgKGtleWJvYXJkRXZlbnQua2V5ID09PSBcIiBcIiB8fFxyXG4gICAgICAgICAgICAgICAga2V5Ym9hcmRFdmVudC5rZXkgPT09IFwiQmFja3NwYWNlXCIgfHxcclxuICAgICAgICAgICAgICAgIChrZXlib2FyZEV2ZW50LmtleSA+PSBcIkFycm93TGVmdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAga2V5Ym9hcmRFdmVudC5rZXkgPD0gXCJBcnJvd0Rvd25cIikgfHxcclxuICAgICAgICAgICAgICAgIChrZXlib2FyZEV2ZW50LmtleSA+PSBcImFcIiAmJiBrZXlib2FyZEV2ZW50LmtleSA8PSBcInpcIikgfHxcclxuICAgICAgICAgICAgICAgIChrZXlib2FyZEV2ZW50LmtleSA+PSBcIkFcIiAmJiBrZXlib2FyZEV2ZW50LmtleSA8PSBcIlpcIikgfHxcclxuICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0ZpeEFmdGVyREN1cnNvckV4ZWMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgdGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAga2V5Ym9hcmRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaXNGaXhBZnRlckRDdXJzb3JFeGVjID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFt0ZXh0LCBpc0N1cnNvckF1dG9Nb3ZlZF07XHJcbn1cclxuZnVuY3Rpb24gd3JvbmdTdGFydENvcnJlY3Rpb24odGV4dCwgd3JvbmdTdGFydE1hdGNoKSB7XHJcbiAgICBsZXQgZml4ZWRUZXh0ID0gdGV4dDtcclxuICAgIGlmICh3cm9uZ1N0YXJ0TWF0Y2ggJiYgdGV4dCkge1xyXG4gICAgICAgIGNvbnN0IHdyb25nU3RhcnRMZW5ndGggPSB3cm9uZ1N0YXJ0TWF0Y2hcclxuICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBhZGRFcmFzZWRDaGFyID0gdGV4dC5zbGljZSgwLCB3cm9uZ1N0YXJ0TGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgY29uc3QgZml4ZWRTdGFydCA9IHRleHQuc2xpY2Uod3JvbmdTdGFydExlbmd0aCAtIDEpO1xyXG4gICAgICAgIGZpeGVkVGV4dCA9IGZpeGVkU3RhcnQgKyBhZGRFcmFzZWRDaGFyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpeGVkVGV4dDtcclxufVxyXG5mdW5jdGlvbiBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIHRleHRFbGVtZW50KSB7XHJcbiAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAmJiAhaXNDdXJzb3JBdXRvTW92ZWQpIHtcclxuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHRleHRFbGVtZW50KTtcclxuICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XHJcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIHNlbD8ucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgc2VsPy5hZGRSYW5nZShyYW5nZSk7XHJcbiAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBpc0N1cnNvckF1dG9Nb3ZlZDtcclxufVxyXG5mdW5jdGlvbiBmaXhDdXJzb3JQb3NpdGlvbih0ZXh0RWxlbWVudCwgcmFuZ2UsIHNlbGVjdGlvbiwgc2hvdWxkU2V0RW5kKSB7XHJcbiAgICByYW5nZS5zZXRTdGFydCh0ZXh0RWxlbWVudCwgMCk7XHJcbiAgICBpZiAoc2hvdWxkU2V0RW5kID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHRleHRFbGVtZW50LCAxKTtcclxuICAgIH1cclxuICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG4gICAgc2VsZWN0aW9uPy5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICAgIHNlbGVjdGlvbj8uYWRkUmFuZ2UocmFuZ2UpO1xyXG59XHJcbmZ1bmN0aW9uIGZpeEZpcnN0TGV0dGVyKGZzdExldCwgcmVnZXgsIHRleHRFbGVtZW50LCByYW5nZSwgc2VsZWN0aW9uLCBzaG91bGRTZXRFbmQpIHtcclxuICAgIGxldCBjb250VGV4dCA9IHRleHRFbGVtZW50LnZhbHVlIHx8IHRleHRFbGVtZW50LnRleHRDb250ZW50IHx8IFwiXCI7XHJcbiAgICBjb25zdCBmaXJzdExldHRlck1hdGNoID0gZnN0TGV0Py5tYXRjaChyZWdleCk7XHJcbiAgICBpZiAoZmlyc3RMZXR0ZXJNYXRjaCkge1xyXG4gICAgICAgIGNvbnN0IGNhcGl0YWxpemVkRmlyc3RMZXR0ZXIgPSBmc3RMZXQ/LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgbmV4dExldHRlcnMgPSBjb250VGV4dC5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBjb250VGV4dCA9IGNhcGl0YWxpemVkRmlyc3RMZXR0ZXIgKyBuZXh0TGV0dGVycztcclxuICAgICAgICBjb25zdCBmaXJzdExldHRlck1hdGNoID0gZnN0TGV0Py5tYXRjaChyZWdleCk7XHJcbiAgICAgICAgaWYgKGZpcnN0TGV0dGVyTWF0Y2gpIHtcclxuICAgICAgICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBmaXhDdXJzb3JQb3NpdGlvbih0ZXh0RWxlbWVudCwgcmFuZ2UsIHNlbGVjdGlvbiwgc2hvdWxkU2V0RW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb250VGV4dDtcclxufVxyXG5mdW5jdGlvbiBmaXhXcm9uZ1N0YXJ0cyh0ZXh0LCBtYXRjaCwgbGVuZ3RoKSB7XHJcbiAgICBsZXQgZml4ZWRTdHIgPSB0ZXh0ID8/IFwiXCI7XHJcbiAgICBpZiAodGV4dCAmJiBtYXRjaCkge1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhckluZGV4ID0gdGV4dC5pbmRleE9mKG1hdGNoKTtcclxuICAgICAgICBjb25zdCBhcnJUZXh0ID0gQXJyYXkuZnJvbSh0ZXh0KTtcclxuICAgICAgICBhcnJUZXh0LnNwbGljZSh3cm9uZ0NoYXJJbmRleCwgbGVuZ3RoLCBcIlwiKTtcclxuICAgICAgICBmaXhlZFN0ciA9IGFyclRleHQudG9TdHJpbmcoKS5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmaXhlZFN0cjtcclxufVxyXG5mdW5jdGlvbiBmaXhOZXh0V29yZHNJbmlOb3REKHJlbWFkZVRleHQsIGxldE1hdGNoKSB7XHJcbiAgICBpZiAocmVtYWRlVGV4dCkge1xyXG4gICAgICAgIGNvbnN0IGdMZXRNYXRjaEkgPSByZW1hZGVUZXh0Lmxhc3RJbmRleE9mKGxldE1hdGNoKSArIDE7XHJcbiAgICAgICAgY29uc3QgYWN0Q2hhciA9IHJlbWFkZVRleHQuY2hhckF0KGdMZXRNYXRjaEkpO1xyXG4gICAgICAgIGNvbnN0IGNhcENoYXIgPSBhY3RDaGFyLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgYXJyVGV4dCA9IEFycmF5LmZyb20ocmVtYWRlVGV4dCk7XHJcbiAgICAgICAgYXJyVGV4dFtnTGV0TWF0Y2hJXSA9IGNhcENoYXI7XHJcbiAgICAgICAgcmVtYWRlVGV4dCA9IGFyclRleHQudG9TdHJpbmcoKS5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuICAgICAgICBpZiAocmVtYWRlVGV4dC5tYXRjaCgvXlxcc1tcXHddKy9nKSkge1xyXG4gICAgICAgICAgICBjb25zdCByZW1vdlNwYWNlVGV4dCA9IHJlbWFkZVRleHQuc2xpY2UoMSwgcmVtYWRlVGV4dC5sZW5ndGgpO1xyXG4gICAgICAgICAgICByZW1hZGVUZXh0ID0gcmVtb3ZTcGFjZVRleHQgKyBcIiBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZW1hZGVUZXh0ID0gXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiByZW1hZGVUZXh0O1xyXG59XHJcbmZ1bmN0aW9uIGZpeE5leHRXb3Jkc0FmdGVyRChyZW1hZGVUZXh0LCBsZXRNYXRjaCkge1xyXG4gICAgY29uc3QgZ2xvYmFsTGV0dGVyTWF0Y2hJbmRleEQgPSByZW1hZGVUZXh0XHJcbiAgICAgICAgPyByZW1hZGVUZXh0Lmxhc3RJbmRleE9mKGxldE1hdGNoKSArIDFcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGlmIChnbG9iYWxMZXR0ZXJNYXRjaEluZGV4RCkge1xyXG4gICAgICAgIGNvbnN0IGFjdHVhbENoYXJEID0gcmVtYWRlVGV4dD8uY2hhckF0KGdsb2JhbExldHRlck1hdGNoSW5kZXhEKTtcclxuICAgICAgICBjb25zdCBjYXBpdGFsaXplZENoYXJEID0gYWN0dWFsQ2hhckQ/LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKHJlbWFkZVRleHQgJiYgY2FwaXRhbGl6ZWRDaGFyRCkge1xyXG4gICAgICAgICAgICBjb25zdCBjaXRlVGV4dEFycmF5RCA9IEFycmF5LmZyb20ocmVtYWRlVGV4dCk7XHJcbiAgICAgICAgICAgIGNpdGVUZXh0QXJyYXlEW2dsb2JhbExldHRlck1hdGNoSW5kZXhEXSA9IGNhcGl0YWxpemVkQ2hhckQ7XHJcbiAgICAgICAgICAgIHJlbWFkZVRleHQgPSBjaXRlVGV4dEFycmF5RC50b1N0cmluZygpLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZW1hZGVUZXh0O1xyXG59XHJcbmZ1bmN0aW9uIGZpeFVucHJvcGVyVXBwZXJjYXNlcyh0ZXh0LCBtYXRjaCwgY29udGV4dCkge1xyXG4gICAgY29uc3Qgc3BhY2VSZWdleCA9IC9cXHMvZztcclxuICAgIGNvbnN0IHNwYWNlTWF0Y2hlcyA9IHRleHQubWF0Y2goc3BhY2VSZWdleCk7XHJcbiAgICBjb25zdCB1cHBlckNhc2VzUmVwZXRpdGlvbnNJbmRleCA9IHRleHQuaW5kZXhPZihtYXRjaCk7XHJcbiAgICBjb25zdCByZXBlYXRlZExldHRlciA9IG1hdGNoLnNsaWNlKDAsIDEpO1xyXG4gICAgY29uc3QgdGV4dEJlZm9yZVJlcGV0aXRpb25zID0gdGV4dC5zdWJzdHJpbmcoMCwgdXBwZXJDYXNlc1JlcGV0aXRpb25zSW5kZXgpO1xyXG4gICAgbGV0IGFkZEFjdW11bGF0b3IgPSAwO1xyXG4gICAgbGV0IGxvd2VyZWRSZXBldGl0aW9ucyA9IFwiXCI7XHJcbiAgICBsb3dlcmVkUmVwZXRpdGlvbnMgPSBtYXRjaC50b0xvd2VyQ2FzZSgpLnNsaWNlKDEpO1xyXG4gICAgaWYgKHNwYWNlTWF0Y2hlcykge1xyXG4gICAgICAgIGlmIChjb250ZXh0ID09PSBcIk5vRFwiIHx8XHJcbiAgICAgICAgICAgIGNvbnRleHQgPT09IFwiWWVzRENvbnRcIiB8fFxyXG4gICAgICAgICAgICBjb250ZXh0ID09IDAgfHxcclxuICAgICAgICAgICAgY29udGV4dCA9PT0gMiB8fFxyXG4gICAgICAgICAgICAhY29udGV4dCkge1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dCA9PT0gXCJZZXNEQ29udFwiIHx8IGNvbnRleHQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleCA9IC9bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdL2c7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VzTWF0Y2hlcyA9IHRleHQubWF0Y2gobG93ZXJjYXNlc1JlZ2V4KTtcclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VzTWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bUxvd2VyY2FzZXMgPSBsb3dlcmNhc2VzTWF0Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQWN1bXVsYXRvciArPSBudW1Mb3dlcmNhc2VzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG51bVNwYWNlcyA9IHNwYWNlTWF0Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGFkZEFjdW11bGF0b3IgKz0gbnVtU3BhY2VzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb250ZXh0ID09PSBcIlllc0RWYWxcIiB8fCBjb250ZXh0ID09PSAxKSB7XHJcbiAgICAgICAgICAgIGFkZEFjdW11bGF0b3IgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQ29udGV4dCB2YWx1ZSBub3Qgc3VpdGFibGVgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCB0ZXh0QWZ0ZXJSZXBldGl0aW9ucyA9IHRleHQuc2xpY2UodXBwZXJDYXNlc1JlcGV0aXRpb25zSW5kZXggKyAxICsgbG93ZXJlZFJlcGV0aXRpb25zLmxlbmd0aCAtIGFkZEFjdW11bGF0b3IsIHRleHQubGVuZ3RoICsgMSk7XHJcbiAgICBjb25zdCB0ZXh0QXJyYXkgPSBBcnJheS5mcm9tKHRleHQpO1xyXG4gICAgdGV4dEFycmF5LnNwbGljZSh1cHBlckNhc2VzUmVwZXRpdGlvbnNJbmRleCArIDEsIGxvd2VyZWRSZXBldGl0aW9ucy5sZW5ndGgsIGxvd2VyZWRSZXBldGl0aW9ucyk7XHJcbiAgICBpZiAoY29udGV4dCA9PT0gXCJOb0RcIiB8fCBjb250ZXh0ID09IDAgfHwgIWNvbnRleHQpIHtcclxuICAgICAgICB0ZXh0ID1cclxuICAgICAgICAgICAgdGV4dEJlZm9yZVJlcGV0aXRpb25zICtcclxuICAgICAgICAgICAgICAgIHJlcGVhdGVkTGV0dGVyICtcclxuICAgICAgICAgICAgICAgIGxvd2VyZWRSZXBldGl0aW9ucyArXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWZ0ZXJSZXBldGl0aW9ucztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGNvbnRleHQgPT09IFwiWWVzRFZhbFwiKSB7XHJcbiAgICAgICAgY29uc3QgdXBwZXJsb3dlcmNvbWJEID0gdGV4dC5tYXRjaCgvRFthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bc1NdP1tcXHNdLyk7XHJcbiAgICAgICAgaWYgKHVwcGVybG93ZXJjb21iRCkge1xyXG4gICAgICAgICAgICBpZiAodXBwZXJsb3dlcmNvbWJELmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJlZFMgPSB1cHBlcmxvd2VyY29tYkQudG9TdHJpbmcoKS5yZXBsYWNlKC9TLywgXCJzXCIpO1xyXG4gICAgICAgICAgICAgICAgbG93ZXJlZFJlcGV0aXRpb25zICs9IGxvd2VyZWRTO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRleHQgPSB0ZXh0QmVmb3JlUmVwZXRpdGlvbnMgKyBsb3dlcmVkUmVwZXRpdGlvbnMgKyB0ZXh0QWZ0ZXJSZXBldGl0aW9ucztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGNvbnRleHQgPT09IFwiWWVzRENvbnRcIikge1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlQ29uakZpeCA9IC9EW2FlaW91w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW3NdXFxzW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXXszLH0vO1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlQ29uakZpeE1hdGNoID0gdGV4dC5tYXRjaChtdWx0aXBsZUNvbmpGaXgpO1xyXG4gICAgICAgIGlmIChtdWx0aXBsZUNvbmpGaXhNYXRjaCkge1xyXG4gICAgICAgICAgICB0ZXh0ID1cclxuICAgICAgICAgICAgICAgIHRleHRCZWZvcmVSZXBldGl0aW9ucyArIGxvd2VyZWRSZXBldGl0aW9ucyArIFwiU1wiICsgdGV4dEFmdGVyUmVwZXRpdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0ID0gdGV4dEJlZm9yZVJlcGV0aXRpb25zICsgbG93ZXJlZFJlcGV0aXRpb25zICsgdGV4dEFmdGVyUmVwZXRpdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgQ29udGV4dCB2YWx1ZSBub3Qgc3VpdGFibGVgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG59XHJcbmZ1bmN0aW9uIGZpeEZvcmNlZFVwcGVyQ2FzZSh0ZXh0RWxlbWVudCwgd29yZE1hdGNoLCB3TWF0Y2hJdGVyYXRpb24pIHtcclxuICAgIGxldCB0ZXh0ID0gdGV4dEVsZW1lbnQudmFsdWUgfHwgdGV4dEVsZW1lbnQudGV4dENvbnRlbnQgfHwgXCJcIjtcclxuICAgIGNvbnN0IHN0ckRsb3dlcmNhc2UgPSB3TWF0Y2hJdGVyYXRpb24udG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IERVcHBlcmNhc2VkID0gc3RyRGxvd2VyY2FzZS5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcclxuICAgIGlmIChEVXBwZXJjYXNlZCkge1xyXG4gICAgICAgIGNvbnN0IHN0ckRBZnRlciA9IHN0ckRsb3dlcmNhc2Uuc3Vic3RyaW5nKDAsIDEpICsgRFVwcGVyY2FzZWQgKyBzdHJEbG93ZXJjYXNlLnN1YnN0cmluZygyKTtcclxuICAgICAgICBjb25zdCBzdHJEQWZ0ZXJNaW51c0luZCA9ICh0ZXh0Py5sZW5ndGggPz8gMCkgLSBzdHJEQWZ0ZXIubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IG9wcG9zaXRlU2xpY2VkQ2l0ZSA9IHRleHQ/LnNsaWNlKHN0ckRBZnRlck1pbnVzSW5kKTtcclxuICAgICAgICBjb25zdCBzdGFydFNsaWNlZENpdGUgPSB0ZXh0Py5zbGljZSgwLCBzdHJEQWZ0ZXJNaW51c0luZCk7XHJcbiAgICAgICAgaWYgKHdvcmRNYXRjaC5sZW5ndGggPj0gMSAmJiBzdGFydFNsaWNlZENpdGUpXHJcbiAgICAgICAgICAgIHRleHQgPSBzdGFydFNsaWNlZENpdGUgKyBvcHBvc2l0ZVNsaWNlZENpdGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b0NhcGl0YWxpemVJbnB1dHModGV4dEVsZW1lbnQpIHtcclxuICAgIGxldCB0ZXh0ID0gdGV4dEVsZW1lbnQ/LnZhbHVlID8/IG51bGw7XHJcbiAgICBpZiAoaXNBdXRvY29ycmVjdE9uICYmIHRleHQpIHtcclxuICAgICAgICAvL2luaWNpYWxpemHDp8OjbyBkZSBleHByZXNzw7VlcyByZWdleCBjb20gc2V1cyBvYmpldG9zIGUgbWF0Y2hlcyBhc3NvY2lhZG9zXHJcbiAgICAgICAgY29uc3QgbmV3V29yZE1hdGNoZXMgPSB0ZXh0Lm1hdGNoKC9cXHNbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdP1thLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStcXHM/W0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXT9bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0qL2cpO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNJbmlOb3REID0gdGV4dC5tYXRjaCgvXFxzW15kXS9nKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzSW5pRCA9IHRleHQubWF0Y2goL1xcc2QvZyk7XHJcbiAgICAgICAgY29uc3Qgbm90TWF0Y2hlc0FmdGVyRFJlZ2V4ID0gL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU10/XFxzL2c7XHJcbiAgICAgICAgbGV0IGxldHRlck5vdE1hdGNoZXNBZnRlckQgPSB0ZXh0Lm1hdGNoKG5vdE1hdGNoZXNBZnRlckRSZWdleCkgPz8gW107XHJcbiAgICAgICAgY29uc3QgYWZ0ZXJEUmVnZXhPcDEgPSAvXFxzZFteYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS9nO1xyXG4gICAgICAgIGNvbnN0IGFmdGVyRFJlZ2V4T3AyID0gL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NcXHNdL2c7XHJcbiAgICAgICAgY29uc3QgYWZ0ZXJEUmVnZXhPcDMgPSAvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXVthLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS9nO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNBZnRlckRPcDEgPSB0ZXh0Lm1hdGNoKGFmdGVyRFJlZ2V4T3AxKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyID0gdGV4dC5tYXRjaChhZnRlckRSZWdleE9wMik7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyA9IHRleHQubWF0Y2goYWZ0ZXJEUmVnZXhPcDMpO1xyXG4gICAgICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleCA9IC9bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdL2c7XHJcbiAgICAgICAgY29uc3QgbG93ZXJjYXNlc1JlZ2V4T2JqID0gbmV3IFJlZ0V4cChsb3dlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIGNvbnN0IHVwcGVyY2FzZXNSZWdleCA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdLztcclxuICAgICAgICBjb25zdCB1cHBlcmNhc2VzUmVnZXhPYmogPSBuZXcgUmVnRXhwKHVwcGVyY2FzZXNSZWdleCk7XHJcbiAgICAgICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzUmVnZXggPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXXsyLH0vZztcclxuICAgICAgICBjb25zdCBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzID0gdGV4dC5tYXRjaChtdWx0aXBsZVVwcGVyY2FzZXNSZWdleCk7XHJcbiAgICAgICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzUmVnZXgyID0gL0RbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW1NdXFxzL2c7XHJcbiAgICAgICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlczIgPSB0ZXh0Lm1hdGNoKG11bHRpcGxlVXBwZXJjYXNlc1JlZ2V4Mik7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDEgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVxcYi9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDEgPSB0ZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AxKTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMiA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AyID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMik7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDMgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdezIsM31cXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AzID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMyk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDQgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A0ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNCk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDUgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF17MSwyfVtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEEtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A1ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDYgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDYgPSB0ZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A2KTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNyA9IC9EW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU10vZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A3ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNyk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDggPSAvRFtBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW15zU10vZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A4ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wOCk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDkgPSAvRFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXVxccy9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDkgPSB0ZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A5KTtcclxuICAgICAgICBjb25zdCB3cm9uZ1N0YXJ0UmVnZXggPSAvXlthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS87XHJcbiAgICAgICAgY29uc3Qgd3JvbmdTdGFydE1hdGNoID0gdGV4dC5tYXRjaCh3cm9uZ1N0YXJ0UmVnZXgpPy50b1N0cmluZygpID8/IG51bGw7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AxID0gL1tcXHNdKltcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXStbXFxzXSpbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0qL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDEgPSB0ZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AyID0gLyRbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDIgPSB0ZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMik7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AzID0gLyg/PD1cXHNkRClbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDMgPSB0ZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMyk7XHJcbiAgICAgICAgLy9pbmljaWFsaXphw6fDo28gZGUgb3V0cmFzIHZhcmnDoXZlaXNcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICAgIGxldCByZW1hZGVUZXh0ID0gdGV4dDtcclxuICAgICAgICBsZXQgaXNVbmRvVXBwZXJjYXNlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzQ3Vyc29yQXV0b01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRleHQubGVuZ3RoID09PSAxICYmICFuZXdXb3JkTWF0Y2hlcykge1xyXG4gICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IGZpeEZpcnN0TGV0dGVyKHRleHRbMF0sIGF1dG9DYXBpdGFsaXplRmlyc3RMZXR0ZXJSZWdleCwgdGV4dEVsZW1lbnQsIHJhbmdlLCBzZWxlY3Rpb24sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGV4dC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBBc3RcIikgfHxcclxuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImlucElkZW50aWZcIikpIHtcclxuICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGVuY2Fwc3VsYXIgY29ycmXDp8OjbyBkZSBpbsOtY2lvcyBpbmNvcnJldG9zIGRlIGVudHJhZGFcclxuICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzT3AzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ0NoYXJzTWF0Y2hlc09wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpVyA9IDA7IGlXIDwgd3JvbmdDaGFyc01hdGNoZXMubGVuZ3RoOyBpVysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3cm9uZ0NoYXJMZW5ndGggPSB3cm9uZ0NoYXJzTWF0Y2hlc1tpV10ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXMuZm9yRWFjaCgod3JvbmdDaGFyTWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IGZpeFdyb25nU3RhcnRzKHRleHQsIHdyb25nQ2hhck1hdGNoLCB3cm9uZ0NoYXJMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgIGlmICh3cm9uZ1N0YXJ0TWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nU3RhcnRDb3JyZWN0aW9uKHRleHRFbGVtZW50LnZhbHVlLCB3cm9uZ1N0YXJ0TWF0Y2gpID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3V29yZE1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdXb3JkTWF0Y2hlcy5mb3JFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgY2FwaXRhbGl6YXIgcGFsYXZyYXMgYXDDs3MgYSBwcmltZWlyYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlOb3REICYmICFsZXR0ZXJNYXRjaGVzSW5pRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNJbmlOb3RELmZvckVhY2goKGxldHRlck1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVRleHQgPSBmaXhOZXh0V29yZHNJbmlOb3REKHJlbWFkZVRleHQsIGxldHRlck1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IHJlbWFkZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCB0ZXh0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RleHRFbGVtZW50LnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBhcnJDb3JyZWN0Q3Vyc29yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JvbmdTdGFydENvcnJlY3Rpb24odGV4dEVsZW1lbnQudmFsdWUsIHdyb25nU3RhcnRNYXRjaCkgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgobGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgbGV0dGVyTWF0Y2hlc0luaUQpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiBsZXR0ZXJNYXRjaGVzSW5pRCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjb3JyZcOnw6NvIGZvY2FkYSBlbSBjb25qdW7Dp8OjbyBjb20gRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiYgbGV0dGVyTWF0Y2hlc0luaU5vdEQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gWy4uLihsZXR0ZXJNYXRjaGVzSW5pTm90RCB8fCBbXSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGNhcGl0YWxpemHDp8OjbyBmb2NhZGEgZW0gaW5pY2lhaXMgRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRD8uZm9yRWFjaCgobGV0dGVyTWF0Y2hEKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWRlVGV4dCA9IGZpeE5leHRXb3Jkc0FmdGVyRChyZW1hZGVUZXh0LCBsZXR0ZXJNYXRjaEQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IHJlbWFkZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheUNoZWNrTG93ZXJDYXNlc0QgPSBBcnJheS5mcm9tKGxldHRlck1hdGNoZXNBZnRlckQgPz8gW10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaUQgPSAwOyBpRCA8IGFycmF5Q2hlY2tMb3dlckNhc2VzRC5sZW5ndGg7IGlEKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZEFycmF5RCA9IGxldHRlck1hdGNoZXNBZnRlckQ/LmZpbHRlcigoaUQpID0+IGxvd2VyY2FzZXNSZWdleE9iai50ZXN0KGlEKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkQXJyYXlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZEFycmF5RCA9IGZpbHRlcmVkQXJyYXlELm1hcCgoaUQpID0+IGlELnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWRlU3RyaW5nRCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdMZXR0ZXIgPSBmaWx0ZXJlZEFycmF5RFtpRF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4VGFyZ0xldHRlciA9IG5ldyBSZWdFeHAodGFyZ0xldHRlciwgXCJnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaUQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnNwbGljZShpRCwgMSwgbWFwcGVkQXJyYXlEWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0QgPSBmaWx0ZXJlZEFycmF5RFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCB0ZXh0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpRCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWRlU3RyaW5nRCA9IGZpbHRlcmVkQXJyYXlEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChcIixcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJDb3JyZWN0Q3Vyc29yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRFbGVtZW50LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSB0ZXh0RWxlbWVudC52YWx1ZS5yZXBsYWNlKHJlZ2V4VGFyZ0xldHRlciwgcmVtYWRlU3RyaW5nRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaUQgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnB1c2gobWFwcGVkQXJyYXlEW2lEXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJDb3JyZWN0Q3Vyc29yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3N0YXRlbWVudCBwYXJhIGNvcnJlw6fDo28gZGUgbcO6bHRpcGxvcyB1cHBlciBjYXNlc1xyXG4gICAgICAgICAgICAgICAgaWYgKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMgfHwgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlczIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBlbmNhcHN1bGFyIGNvcnJlw6fDo28gZGUgbcO6bHRpcGxvcyB1cHBlciBjYXNlc1xyXG4gICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVucHJvcGVyVXBwZXJjYXNlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AyIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A0IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A1IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A2IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5wcm9wZXJEVXBwZXJjYXNlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A3IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A4IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A5IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5wcm9wZXJVcHBlcmNhc2VzLmZvckVhY2goKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dCAmJiBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSBmaXhVbnByb3BlclVwcGVyY2FzZXModGV4dCwgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gsIFwiTm9EXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29ycmXDp8OjbyBkZSBidWdzIGNvbSBjb21iaW5hw6fDtWVzIHBvc3RlcmlvcmVzIGRlIHVwcGVyL2xvd2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgdXBwZXJsb3dlcmNvbWIgPSB0ZXh0Lm1hdGNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgL1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdL2dcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHVwcGVybG93ZXJjb21iRCA9IHRleHQubWF0Y2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvRFthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bXFxzXS9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICh1cHBlcmxvd2VyY29tYiB8fCB1cHBlcmxvd2VyY29tYkQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHJlcGVhdGVkTGV0dGVyID0gcmVwZWF0ZWRMZXR0ZXIudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9maXggcGFyYSBkZWxheSBlbSBwcm9jZXNzYW1lbnRvIGRvIFMgZW0gY29uanVuw6fDtWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBwZXJsb3dlcmNvbWJEUyA9IHRleHQubWF0Y2goL0RbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW1NdW1xcc10vKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBwZXJsb3dlcmNvbWJEUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cHBlcmxvd2VyY29tYkRTLnNwbGljZSgzLCAxLCBcInNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID0gdGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UuZW5kT2Zmc2V0ID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4Q3Vyc29yUG9zaXRpb24odGV4dEVsZW1lbnQsIHJhbmdlLCBzZWxlY3Rpb24sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVucHJvcGVyRFVwcGVyY2FzZXMuZm9yRWFjaCgobXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0ICYmIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSBmaXhVbnByb3BlclVwcGVyY2FzZXModGV4dCwgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gsIFwiWWVzRFZhbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UuZW5kT2Zmc2V0ID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4Q3Vyc29yUG9zaXRpb24odGV4dEVsZW1lbnQsIHJhbmdlLCBzZWxlY3Rpb24sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vc3RhdGVtZW50IHBhcmEgY29udHJvbGUgZGUgY29tYmluYcOnw6NvIGFww7NzIGVudHJhZGEgY29tIGluaWNpYWwgRFxyXG4gICAgICAgICAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICEobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9zdGF0ZW1lbnQgcGFyYSBmbHV4byB2YWxpZGFuZG8gbWF0Y2ggZGUgaW5pY2lhaXNcclxuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pRCB8fCBsZXR0ZXJNYXRjaGVzSW5pTm90RCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGZvcsOnYXIgdXBwZXIgY2FzZVxyXG4gICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRNYXRjaCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzSW5pTm90RCB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IERNYXRjaCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaU0gPSAwOyBpTSA8IHdvcmRNYXRjaC5sZW5ndGg7IGlNKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwcGVyY2FzZVRlc3QgPSB1cHBlcmNhc2VzUmVnZXhPYmoudGVzdCh3b3JkTWF0Y2hbaU1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cHBlcmNhc2VUZXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSBmaXhGb3JjZWRVcHBlckNhc2UodGV4dEVsZW1lbnQsIHdvcmRNYXRjaCwgd29yZE1hdGNoW2lNXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoRE1hdGNoLmZsYXQoMSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBmYXplciBjb3JyZcOnw7VlcyBhZGljaW9uYWlzIG5vIGZpbmFsIGRhIGVkacOnw6NvIGF1dG9tw6F0aWNhXHJcbiAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZT8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDEsIFwiXCIpID8/IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZT8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDIsIFwiXCIpID8/IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZT8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDMsIFwiXCIpID8/IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0Lm1hdGNoKC9cXHNbXFxzXSsvZykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWU/LnJlcGxhY2VBbGwoL1xcc1tcXHNdKy9nLCBcIiBcIikgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQubWF0Y2goL15bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdLykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RMZXR0ZXJDYXBpdGFsaXplZCA9IHRleHQuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdE9mVGV4dCA9IHRleHQuc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID0gZmlyc3RMZXR0ZXJDYXBpdGFsaXplZCArIHJlc3RPZlRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b0NhcGl0YWxpemVDaXRlKGVkaXRhYmxlQ2l0ZSkge1xyXG4gICAgY29uc3QgY2l0ZVRleHQgPSBlZGl0YWJsZUNpdGU/LnRleHRDb250ZW50ID8/IG51bGw7XHJcbiAgICBpZiAoaXNBdXRvY29ycmVjdE9uICYmIGNpdGVUZXh0KSB7XHJcbiAgICAgICAgLy9pbmljaWFsaXphw6fDo28gZGUgZXhwcmVzc8O1ZXMgcmVnZXggY29tIHNldXMgb2JqZXRvcyBlIG1hdGNoZXMgYXNzb2NpYWRvc1xyXG4gICAgICAgIGNvbnN0IG5ld1dvcmRNYXRjaGVzID0gY2l0ZVRleHQubWF0Y2goL1xcc1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0/W2EtekEtWsOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8w4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1xccz9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdP1thLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXSovZyk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0luaU5vdEQgPSBjaXRlVGV4dC5tYXRjaCgvXFxzW15kXS9nKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzSW5pRCA9IGNpdGVUZXh0Lm1hdGNoKC9cXHNkL2cpO1xyXG4gICAgICAgIGNvbnN0IG5vdE1hdGNoZXNBZnRlckRSZWdleCA9IC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdP1xccy9nO1xyXG4gICAgICAgIGxldCBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEID0gY2l0ZVRleHQubWF0Y2gobm90TWF0Y2hlc0FmdGVyRFJlZ2V4KSA/PyBbXTtcclxuICAgICAgICBjb25zdCBhZnRlckRSZWdleE9wMSA9IC9cXHNkW15hZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdL2c7XHJcbiAgICAgICAgY29uc3QgYWZ0ZXJEUmVnZXhPcDIgPSAvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW15zU1xcc10vZztcclxuICAgICAgICBjb25zdCBhZnRlckRSZWdleE9wMyA9IC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdW2EtekEtWsOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8w4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdL2c7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSA9IGNpdGVUZXh0Lm1hdGNoKGFmdGVyRFJlZ2V4T3AxKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyID0gY2l0ZVRleHQubWF0Y2goYWZ0ZXJEUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNBZnRlckRPcDMgPSBjaXRlVGV4dC5tYXRjaChhZnRlckRSZWdleE9wMyk7XHJcbiAgICAgICAgY29uc3QgbG93ZXJjYXNlc1JlZ2V4ID0gL1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0vZztcclxuICAgICAgICBjb25zdCBsb3dlcmNhc2VzUmVnZXhPYmogPSBuZXcgUmVnRXhwKGxvd2VyY2FzZXNSZWdleCk7XHJcbiAgICAgICAgLy8gY29uc3QgbG93ZXJjYXNlc01hdGNoZXMgPSBjaXRlVGV4dC5tYXRjaChsb3dlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIGNvbnN0IHVwcGVyY2FzZXNSZWdleCA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdLztcclxuICAgICAgICBjb25zdCB1cHBlcmNhc2VzUmVnZXhPYmogPSBuZXcgUmVnRXhwKHVwcGVyY2FzZXNSZWdleCk7XHJcbiAgICAgICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzUmVnZXggPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXXsyLH0vZztcclxuICAgICAgICBjb25zdCBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzID0gY2l0ZVRleHQubWF0Y2gobXVsdGlwbGVVcHBlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AxID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1cXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AxID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDEpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AyID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDIgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMik7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDMgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdezIsM31cXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AzID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDMpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A0ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNCA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A0KTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNSA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XXsxLDJ9W0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1xcYi9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDUgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDYgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDYgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNik7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDcgPSAvRFtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNyA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A3KTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wOCA9IC9EW0FFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bXnNTXS9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDggPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wOCk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDkgPSAvRFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW3NdXFxzL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOSA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A5KTtcclxuICAgICAgICBjb25zdCB3cm9uZ1N0YXJ0UmVnZXggPSAvXlthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS87XHJcbiAgICAgICAgY29uc3Qgd3JvbmdTdGFydE1hdGNoID0gY2l0ZVRleHQubWF0Y2god3JvbmdTdGFydFJlZ2V4KT8udG9TdHJpbmcoKSA/PyBudWxsO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMSA9IC9bXFxzXSpbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rW1xcc10qW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKi9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AxID0gY2l0ZVRleHQubWF0Y2god3JvbmdDaGFyc1JlZ2V4T3AxKTtcclxuICAgICAgICBjb25zdCB3cm9uZ0NoYXJzUmVnZXhPcDIgPSAvJFtcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXSsvZztcclxuICAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlc09wMiA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMik7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AzID0gLyg/PD1cXHNkRClbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDMgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDMpO1xyXG4gICAgICAgIC8vaW5pY2lhbGl6YcOnw6NvIGRlIG91dHJhcyB2YXJpw6F2ZWlzXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICBsZXQgcmVtYWRlQ2l0ZVRleHQgPSBjaXRlVGV4dDtcclxuICAgICAgICBsZXQgaXNDdXJzb3JBdXRvTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaXNBbGVydE1hZGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaXNTcGFuQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzVW5kb1VwcGVyY2FzZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vc3RhdGVtZW50IHBhcmEgZGlmZXJlbmNpYXIgaW7DrWNpbyBkbyByZXN0YW50ZSBkbyBpbnB1dFxyXG4gICAgICAgIGlmIChjaXRlVGV4dC5sZW5ndGggPT09IDEgJiYgIW5ld1dvcmRNYXRjaGVzKSB7XHJcbiAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeEZpcnN0TGV0dGVyKGNpdGVUZXh0WzBdLCBhdXRvQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyUmVnZXgsIGVkaXRhYmxlQ2l0ZSwgcmFuZ2UsIHNlbGVjdGlvbiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNpdGVUZXh0Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgLy9JSUZFIHBhcmEgZW5jYXBzdWxhciBjb3JyZcOnw6NvIGRlIGluw61jaW9zIGluY29ycmV0b3MgZGUgZW50cmFkYVxyXG4gICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXNPcDIgfHxcclxuICAgICAgICAgICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDEgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaVcgPSAwOyBpVyA8IHdyb25nQ2hhcnNNYXRjaGVzLmxlbmd0aDsgaVcrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3cm9uZ0NoYXJMZW5ndGggPSB3cm9uZ0NoYXJzTWF0Y2hlc1tpV10ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlcy5mb3JFYWNoKCh3cm9uZ0NoYXJNYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4V3JvbmdTdGFydHMoY2l0ZVRleHQsIHdyb25nQ2hhck1hdGNoLCB3cm9uZ0NoYXJMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KGlzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIGlmICh3cm9uZ1N0YXJ0TWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IHdyb25nU3RhcnRDb3JyZWN0aW9uKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgd3JvbmdTdGFydE1hdGNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmV3V29yZE1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgIG5ld1dvcmRNYXRjaGVzLmZvckVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGNhcGl0YWxpemFyIHBhbGF2cmFzIGFww7NzIGEgcHJpbWVpcmFcclxuICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgIWxldHRlck1hdGNoZXNJbmlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RC5mb3JFYWNoKChsZXR0ZXJNYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZUNpdGVUZXh0ID0gZml4TmV4dFdvcmRzSW5pTm90RChyZW1hZGVDaXRlVGV4dCwgbGV0dGVyTWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSByZW1hZGVDaXRlVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IHdyb25nU3RhcnRDb3JyZWN0aW9uKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgd3JvbmdTdGFydE1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgobGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgbGV0dGVyTWF0Y2hlc0luaUQpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIWxldHRlck1hdGNoZXNJbmlOb3REICYmIGxldHRlck1hdGNoZXNJbmlEKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgY29ycmXDp8OjbyBmb2NhZGEgZW0gY29uanVuw6fDo28gY29tIERcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxldHRlck1hdGNoZXNBZnRlckQgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIShsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJiBsZXR0ZXJNYXRjaGVzSW5pTm90RCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFsuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgY2FwaXRhbGl6YcOnw6NvIGZvY2FkYSBlbSBpbmljaWFpcyBEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRC5mb3JFYWNoKChsZXR0ZXJNYXRjaEQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZUNpdGVUZXh0ID0gZml4TmV4dFdvcmRzQWZ0ZXJEKHJlbWFkZUNpdGVUZXh0LCBsZXR0ZXJNYXRjaEQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gcmVtYWRlQ2l0ZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5Q2hlY2tMb3dlckNhc2VzRCA9IEFycmF5LmZyb20obGV0dGVyTWF0Y2hlc0FmdGVyRCA/PyBbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlEID0gMDsgaUQgPCBhcnJheUNoZWNrTG93ZXJDYXNlc0QubGVuZ3RoOyBpRCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZEFycmF5RCA9IGxldHRlck1hdGNoZXNBZnRlckQ/LmZpbHRlcigoaUQpID0+IGxvd2VyY2FzZXNSZWdleE9iai50ZXN0KGlEKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWRBcnJheUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWRBcnJheUQgPSBmaWx0ZXJlZEFycmF5RC5tYXAoKGlEKSA9PiBpRC50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWRlU3RyaW5nRCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ0xldHRlciA9IGZpbHRlcmVkQXJyYXlEW2lEXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdleFRhcmdMZXR0ZXIgPSBuZXcgUmVnRXhwKHRhcmdMZXR0ZXIsIFwiZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaUQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KGlzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5zcGxpY2UoaUQsIDEsIG1hcHBlZEFycmF5RFswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0QgPSBmaWx0ZXJlZEFycmF5RFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaUQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KGlzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5zcGxpY2UoaUQsIDEsIG1hcHBlZEFycmF5RFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0QgPSBmaWx0ZXJlZEFycmF5RFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJDb3JyZWN0Q3Vyc29yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWRpdGFibGVDaXRlLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudC5yZXBsYWNlKHJlZ2V4VGFyZ0xldHRlciwgcmVtYWRlU3RyaW5nRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaUQgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5wdXNoKG1hcHBlZEFycmF5RFtpRF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJDb3JyZWN0Q3Vyc29yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBlbmNhcHN1bGFyIGNvcnJlw6fDo28gZGUgbcO6bHRpcGxvcyB1cHBlciBjYXNlc1xyXG4gICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bnByb3BlclVwcGVyY2FzZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLihtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDEgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDQgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A2IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVucHJvcGVyRFVwcGVyY2FzZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A3IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDggfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICB1bnByb3BlclVwcGVyY2FzZXMuZm9yRWFjaCgobXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNpdGVUZXh0ICYmIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSBmaXhVbnByb3BlclVwcGVyY2FzZXMoY2l0ZVRleHQsIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoLCBcIk5vRFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBhcnJDb3JyZWN0Q3Vyc29yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV0gPSBjcmVhdGVTcGFuQWxlcnQoaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB1bnByb3BlckRVcHBlcmNhc2VzLmZvckVhY2goKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaXRlVGV4dCAmJiBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4VW5wcm9wZXJVcHBlcmNhc2VzKGNpdGVUZXh0LCBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCwgXCJZZXNEQ29udFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBhcnJDb3JyZWN0Q3Vyc29yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV0gPSBjcmVhdGVTcGFuQWxlcnQoaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9zdGF0ZW1lbnQgcGFyYSBjb3JyZcOnw6NvIGRlIGJsb2NvcyBhcMOzcyBpbmljaWFsIGNvbSBEXHJcbiAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlEICYmXHJcbiAgICAgICAgICAgIGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgIShsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKSkge1xyXG4gICAgICAgICAgICBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vc3RhdGVtZW50IHBhcmEgY29ycmXDp8OjbyBkZSBtw7psdGlwbG9zIHVwcGVyIGNhc2VzIGZvcsOnYWRvcyBpbmRldmlkYW1lbnRlXHJcbiAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlEIHx8IGxldHRlck1hdGNoZXNJbmlOb3REKSB7XHJcbiAgICAgICAgICAgIC8vSUlGRSBwYXJhIGZvcsOnYXIgdXBwZXIgY2FzZVxyXG4gICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd29yZE1hdGNoID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzSW5pTm90RCB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgRE1hdGNoID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGlNID0gMDsgaU0gPCB3b3JkTWF0Y2gubGVuZ3RoOyBpTSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBwZXJjYXNlVGVzdCA9IHVwcGVyY2FzZXNSZWdleE9iai50ZXN0KHdvcmRNYXRjaFtpTV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cHBlcmNhc2VUZXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSBmaXhGb3JjZWRVcHBlckNhc2UoZWRpdGFibGVDaXRlLCB3b3JkTWF0Y2gsIHdvcmRNYXRjaFtpTV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChETWF0Y2guZmxhdCgxKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KGlzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9JSUZFIHBhcmEgZmF6ZXIgY29ycmXDp8O1ZXMgbm8gZmluYWwgZGEgZWRpw6fDo28gYXV0b23DoXRpY2FcclxuICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDEpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50Py5yZXBsYWNlQWxsKHdyb25nQ2hhcnNSZWdleE9wMSwgXCJcIikgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMikge1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AyLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AzKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDMsIFwiXCIpID8/IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZWRpdGFibGVDaXRlLnRleHRDb250ZW50Py5tYXRjaCgvXFxzW1xcc10rL2cpKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCgvXFxzW1xcc10rL2csIFwiIFwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSgpO1xyXG4gICAgfVxyXG4gICAgLy9kZWNsYXJhw6fDtWVzIGRlIGZ1bsOnw7VlcyBsb2NhaXNcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKSB7XHJcbiAgICAgICAgY29uc3QgcmdiYVJlZ2V4ID0gL3JnYmFcXCgoXFxkKyksIChcXGQrKSwgKFxcZCspLCAoW1xcZC5dKylcXCkvO1xyXG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGVSZWdleCA9IC8sXFxkKy4/XFxkKi4/XFxkKi9nO1xyXG4gICAgICAgIGlmIChlZGl0YWJsZUNpdGUubmV4dEVsZW1lbnRTaWJsaW5nICYmXHJcbiAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRDaXRlRWxlbWVudFNpYmxpbmcgPSBlZGl0YWJsZUNpdGUubmV4dEVsZW1lbnRTaWJsaW5nLmlkO1xyXG4gICAgICAgICAgICBpZiAobmV4dENpdGVFbGVtZW50U2libGluZyA9PT0gXCJkZWFjdEF1dG9jb3JyZWN0QnRuXCIgJiYgIWlzU3BhbkFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3Vyc29yUmVzZXRBbGVydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0FsZXJ0TWFkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQudGV4dENvbnRlbnQgPSBcIkN1cnNvciByZXNldGFkbyEgQXBlcnRlIGFsZ3VtYSB0ZWNsYVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQWxlcnRNYWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS5wYXJlbnROb2RlPy5pbnNlcnRCZWZvcmUoY3Vyc29yUmVzZXRBbGVydCwgZWRpdGFibGVDaXRlLm5leHRTaWJsaW5nKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJicmllZkFsZXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImJyaWVmQWxlcnRDaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5zdHlsZS5zZXRQcm9wZXJ0eShcImJvcmRlci1jb2xvclwiLCBcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5zdHlsZS5zZXRQcm9wZXJ0eShcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5zdHlsZS5zZXRQcm9wZXJ0eShcImZvbnQtc2l6ZVwiLCBcIjhweFwiKTtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS5zdHlsZS5zZXRQcm9wZXJ0eShcImJvcmRlci1jb2xvclwiLCBcInJnYmEoMjU1LCAxNjUsIDAsIDAuOSlcIik7IC8vYWxlcnRhciB1c3XDoXJpbyBkYSBtdWRhbsOnYSBkZSBjdXJzb3IgZGV2aWRvIMOgIHJlY29uc3RydcOnw6NvIGRvIHRleHRDb250ZW50IGVkaXTDoXZlbFxyXG4gICAgICAgICAgICAgICAgaXNTcGFuQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGVDaXRlID0gd2luZG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKGVkaXRhYmxlQ2l0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoXCJib3JkZXItY29sb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmdiYU1hdGNoID0gY29tcHV0ZWRTdHlsZUNpdGUubWF0Y2gocmdiYVJlZ2V4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmdiYU1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZHVjZU9wYWNpdHkgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3BwZWRBcnJheSA9IHJnYmFNYXRjaC5wb3AoKTsgLy9mYXogYSByZXRpcmFkYSBpbmljaWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyVXBkYXRlZEFscGhhID0gcG9wcGVkQXJyYXk/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJSZ2JhID0gcmdiYU1hdGNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChjb21wdXRlZFN0eWxlUmVnZXgsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RTbGljZVN0clJnYmEgPSBzdHJSZ2JhLnNsaWNlKDAsIDE4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHJOZXdPcGFjaXR5VmFsdWUgPSBmaXJzdFNsaWNlU3RyUmdiYSArIFwiIFwiICsgc3RyVXBkYXRlZEFscGhhICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyVXBkYXRlZEFscGhhICYmIHN0clVwZGF0ZWRBbHBoYSA8PSBcIjAuMDVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0clVwZGF0ZWRBbHBoYSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ck5ld09wYWNpdHlWYWx1ZSA9IGZpcnN0U2xpY2VTdHJSZ2JhICsgXCIwKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWR1Y2VPcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS5zdHlsZS5zZXRQcm9wZXJ0eShcImJvcmRlci1jb2xvclwiLCBzdHJOZXdPcGFjaXR5VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobmV4dENpdGVFbGVtZW50U2libGluZyA9PT0gXCJicmllZkFsZXJ0Q2l0ZVwiIHx8IGlzU3BhbkFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRmlyc3RDbGljayhlZGl0YWJsZUNpdGUpIHtcclxuICAgIGlmIChlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPT09IFwiSW5zaXJhIFNldSBOb21lIEFxdWlcIikge1xyXG4gICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBsZXQgY3Vyc29yUG9zaXRpb24gPSAwO1xyXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIGN1cnNvclBvc2l0aW9uID0gR2xvYmFsSGFuZGxlci5jdXJzb3JDaGVja1RpbWVyKGN1cnNvclBvc2l0aW9uKSA/PyAwO1xyXG4gICAgfSwgMzAwMCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaEF1dG9jb3JyZWN0KGNsaWNrLCBkZWFjdEF1dG9jb3JyZWN0QnRuKSB7XHJcbiAgICBpZiAoY2xpY2sudGFyZ2V0ID09PSBkZWFjdEF1dG9jb3JyZWN0QnRuKSB7XHJcbiAgICAgICAgaXNBdXRvY29ycmVjdE9uID0gIWlzQXV0b2NvcnJlY3RPbjsgLy9zaW1wbGlmaWNhw6fDo28gZGUgaWYtZWxzZTsgaWYtaWYgbsOjbyBmdW5jaW9uYSBhcXVpXHJcbiAgICAgICAgZGVhY3RBdXRvY29ycmVjdEJ0bi50ZXh0Q29udGVudCA9IGlzQXV0b2NvcnJlY3RPblxyXG4gICAgICAgICAgICA/IFwiRGVzYXRpdmFyIEF1dG9jb3JyZcOnw6NvXCJcclxuICAgICAgICAgICAgOiBcIkF0aXZhciBBdXRvY29ycmXDp8Ojb1wiO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja0FsbEdlbkNvbnRzKGdlbiwgZ2VuQmlydGhSZWwsIGdlblRyYW5zLCBnZW5GaXNBbGluKSB7XHJcbiAgICBsZXQgaXNHZW5WYWxpZCA9IGZhbHNlO1xyXG4gICAgbGV0IGlzR2VuQmlydGhSZWxWYWxpZCA9IGZhbHNlO1xyXG4gICAgbGV0IGlzR2VuVHJhbnNDb250VmFsaWQgPSBmYWxzZTtcclxuICAgIGxldCBpc0dlbkZpc0FsaW5WYWxpZCA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoZ2VuICYmIGdlbiBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlzR2VuVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBnZW46IGVsZW1lbnRvICR7Z2VufSwgaW5zdMOibmNpYSAke2dlbiBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50fWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvckdlbikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JHZW4ubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICAvL2FsZ3VtIGVmZWl0byB2aXN1YWxcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKGdlbkJpcnRoUmVsICYmIGdlbkJpcnRoUmVsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaXNHZW5CaXJ0aFJlbFZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gZ2VuOiBlbGVtZW50byAke2dlbkJpcnRoUmVsfSwgaW5zdMOibmNpYSAke2dlbkJpcnRoUmVsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yR2VuQmlydGhSZWwpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yR2VuQmlydGhSZWwubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICAvL2FsZ3VtIGVmZWl0byB2aXN1YWxcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKGdlblRyYW5zICYmIGdlblRyYW5zIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaXNHZW5UcmFuc0NvbnRWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGdlblRyYW5zOiBlbGVtZW50byAke2dlblRyYW5zfSwgaW5zdMOibmNpYSAke2dlblRyYW5zIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yR2VuVHJhbnMpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yR2VuVHJhbnMubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICAvL2FsZ3VtIGVmZWl0byB2aXN1YWxcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKGdlbkZpc0FsaW4gJiYgZ2VuRmlzQWxpbiBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlzR2VuRmlzQWxpblZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gZ2VuRmlzQWxpbjogZWxlbWVudG8gJHtnZW5GaXNBbGlufSwgaW5zdMOibmNpYSAke2dlbkZpc0FsaW4gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3JHZW5GaXNBbGluKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvckdlbkZpc0FsaW4ubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICAvL2FsZ3VtIGVmZWl0byB2aXN1YWxcclxuICAgIH1cclxuICAgIGlmIChpc0dlblZhbGlkICYmXHJcbiAgICAgICAgaXNHZW5CaXJ0aFJlbFZhbGlkICYmXHJcbiAgICAgICAgaXNHZW5UcmFuc0NvbnRWYWxpZCAmJlxyXG4gICAgICAgIGlzR2VuRmlzQWxpblZhbGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJybyB2ZXJpZmljYW5kbyBib29sZWFub3MgZGUgY29udGFpbmVycyBkZSBnw6puZXJvXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZmx1eEdlbihnZW4sIGdlbkluaVZhbHVlLCBnZW5CaXJ0aFJlbCwgZ2VuVHJhbnMsIGdlbkZpc0FsaW4pIHtcclxuICAgIGxldCBnZW5WYWx1ZSA9IFwiXCI7XHJcbiAgICBpZiAoZ2VuLnZhbHVlID09PSBcIm1hc2N1bGlub1wiIHx8IGdlbi52YWx1ZSA9PT0gXCJmZW1pbmlub1wiKSB7XHJcbiAgICAgICAgaWYgKGdlbkJpcnRoUmVsLnZhbHVlID09PSBcImNpc1wiKSB7XHJcbiAgICAgICAgICAgIGdlblZhbHVlID0gZ2VuSW5pVmFsdWUgPz8gZ2VuLnZhbHVlO1xyXG4gICAgICAgICAgICBoaWRlR2VuRmlzQWxpbihnZW5GaXNBbGluKTtcclxuICAgICAgICAgICAgaGlkZVN0Z1RyYW5zSG9ybShnZW5UcmFucyk7XHJcbiAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZ2VuQmlydGhSZWwudmFsdWUgPT09IFwidHJhbnNcIikge1xyXG4gICAgICAgICAgICBzaG93U3RnVHJhbnNIb3JtKGdlblRyYW5zKTtcclxuICAgICAgICAgICAgaWYgKGdlblRyYW5zLnZhbHVlID09PSBcImF2YW5jYWRvXCIpIHtcclxuICAgICAgICAgICAgICAgIGdlblZhbHVlID0gZ2VuSW5pVmFsdWUgPz8gZ2VuLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaGlkZUdlbkZpc0FsaW4oZ2VuRmlzQWxpbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZ2VuVHJhbnMudmFsdWUgPT09IFwidW5kZWZpbmVkXCIgfHxcclxuICAgICAgICAgICAgICAgIGdlblRyYW5zLnZhbHVlID09PSBcIm5vXCIgfHxcclxuICAgICAgICAgICAgICAgIGdlblRyYW5zLnZhbHVlID09PSBcImluaWNpYWxcIiB8fFxyXG4gICAgICAgICAgICAgICAgZ2VuVHJhbnMudmFsdWUgPT09IFwiaW50ZXJtZWRpYXJpb1wiKSB7XHJcbiAgICAgICAgICAgICAgICBzaG93R2VuRmlzQWxpbihnZW5GaXNBbGluKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRGZW1pbmlsaXphZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdvcHRpb25bdmFsdWU9XCJmZW1pbmlsaXphZG9cIl0nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRNYXNjdWxpbml6YWRvID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignb3B0aW9uW3ZhbHVlPVwibWFzY3VsaW5pemFkb1wiXScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRGZW1pbmlsaXphZG8gaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRNYXNjdWxpbml6YWRvIGluc3RhbmNlb2YgSFRNTE9wdGlvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuVHJhbnMudmFsdWUgPT09IFwiaW50ZXJtZWRpYXJpb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZW4udmFsdWUgPT09IFwibWFzY3VsaW5vXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRmVtU2VsZWN0ZWQgPSBjb250RmVtaW5pbGl6YWRvPy5zZWxlY3RlZCA/PyBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZlbVNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udEZlbWluaWxpemFkby5yZW1vdmVBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRNYXNjdWxpbml6YWRvLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZW4udmFsdWUgPT09IFwiZmVtaW5pbm9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNNYXNjU2VsZWN0ZWQgPSBjb250TWFzY3VsaW5pemFkbz8uc2VsZWN0ZWQgPz8gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXNjU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250TWFzY3VsaW5pemFkby5yZW1vdmVBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRGZW1pbmlsaXphZG8uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRmVtU2VsZWN0ZWQgPSBjb250RmVtaW5pbGl6YWRvPy5zZWxlY3RlZCA/PyBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNNYXNjU2VsZWN0ZWQgPSBjb250TWFzY3VsaW5pemFkbz8uc2VsZWN0ZWQgPz8gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc01hc2NTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udE1hc2N1bGluaXphZG8ucmVtb3ZlQXR0cmlidXRlKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmVtU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRGZW1pbmlsaXphZG8ucmVtb3ZlQXR0cmlidXRlKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJtYXNjdWxpbml6YWRvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZW5WYWx1ZSA9IFwibWFzY3VsaW5vXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJmZW1pbmlsaXphZG9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGdlblZhbHVlID0gXCJmZW1pbmlub1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibmV1dHJvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZW5WYWx1ZSA9IFwibmV1dHJvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGdlbkJpcnRoUmVsLnZhbHVlID09PSBcIm91dHJvc1wiIHx8XHJcbiAgICAgICAgICAgIGdlbkJpcnRoUmVsLnZhbHVlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHNob3dHZW5GaXNBbGluKGdlbkZpc0FsaW4pO1xyXG4gICAgICAgICAgICBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJtYXNjdWxpbml6YWRvXCIpIHtcclxuICAgICAgICAgICAgICAgIGdlblZhbHVlID0gXCJtYXNjdWxpbm9cIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcImZlbWluaWxpemFkb1wiKSB7XHJcbiAgICAgICAgICAgICAgICBnZW5WYWx1ZSA9IFwiZmVtaW5pbm9cIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm5ldXRyb1wiKSB7XHJcbiAgICAgICAgICAgICAgICBnZW5WYWx1ZSA9IFwibmV1dHJvXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChnZW4udmFsdWUgPT09IFwibmFvQmluYXJpb1wiIHx8XHJcbiAgICAgICAgZ2VuLnZhbHVlID09PSBcIm91dHJvc1wiIHx8XHJcbiAgICAgICAgZ2VuLnZhbHVlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgaWYgKGdlbkJpcnRoUmVsLnZhbHVlID09PSBcInRyYW5zXCIpIHtcclxuICAgICAgICAgICAgc2hvd1N0Z1RyYW5zSG9ybShnZW5UcmFucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBoaWRlU3RnVHJhbnNIb3JtKGdlblRyYW5zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2hvd0dlbkZpc0FsaW4oZ2VuRmlzQWxpbik7XHJcbiAgICAgICAgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibWFzY3VsaW5pemFkb1wiKSB7XHJcbiAgICAgICAgICAgIGdlblZhbHVlID0gXCJtYXNjdWxpbm9cIjtcclxuICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcImZlbWluaWxpemFkb1wiKSB7XHJcbiAgICAgICAgICAgIGdlblZhbHVlID0gXCJmZW1pbmlub1wiO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibmV1dHJvXCIpIHtcclxuICAgICAgICAgICAgZ2VuVmFsdWUgPSBcIm5ldXRyb1wiO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5zdHJpbmdFcnJvcihcIm9idGVuZG8gZ2VuLnZhbHVlXCIsIGdlbj8udmFsdWUgPz8gXCJVTkRFRklORUQgVkFMVUVcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdlblZhbHVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93R2VuRmlzQWxpbihnZW5GaXNBbGluKSB7XHJcbiAgICBpZiAoZ2VuRmlzQWxpbikge1xyXG4gICAgICAgIGdlbkZpc0FsaW4uY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8ucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiRXJybyBuYSBhYmVydHVyYSBkZSBnZW5GaXNBbGluXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlR2VuRmlzQWxpbihnZW5GaXNBbGluKSB7XHJcbiAgICBpZiAoZ2VuRmlzQWxpbikge1xyXG4gICAgICAgIGdlbkZpc0FsaW4uY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8uc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwiXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gZmVjaGFtZW50byBkZSBnZW5GaXNBbGluXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93U3RnVHJhbnNIb3JtKGdlblRyYW5zKSB7XHJcbiAgICBpZiAoZ2VuVHJhbnMpIHtcclxuICAgICAgICBnZW5UcmFucy5jbG9zZXN0KFwiLnNwYW5Gc0FuYW1HXCIpPy5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvIG5hIGFiZXJ0dXJhIGRlIGdlblRyYW5zXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlU3RnVHJhbnNIb3JtKGdlblRyYW5zKSB7XHJcbiAgICBpZiAoZ2VuVHJhbnMpIHtcclxuICAgICAgICBnZW5UcmFucy5jbG9zZXN0KFwiLnNwYW5Gc0FuYW1HXCIpPy5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiRXJybyBubyBmZWNoYW1lbnRvIGRlIGdlblRyYW5zXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJJZHNCeUdlbmRlcihhcnJheUlkcywgYm9keVR5cGUpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGFycmF5SWRzKSkge1xyXG4gICAgICAgIGlmIChhcnJheUlkcy5ldmVyeSgocHJvcCkgPT4gdHlwZW9mIHByb3AgPT09IFwic3RyaW5nXCIpICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBib2R5VHlwZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBjb25zdCBnZW5kZXJlZElkcyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgc2xpY2VkRXJyb3IgPSBcIlwiO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGJvZHlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFzY3VsaW5vXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaU0gPSAwOyBpTSA8IGFycmF5SWRzLmxlbmd0aDsgaU0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlJZHNbaU1dID09PSBcInBlaXRcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJZHNbaU1dID09PSBcImFiZFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUlkc1tpTV0gPT09IFwiY294YVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5kZXJlZElkcy5wdXNoKGFycmF5SWRzW2lNXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZmVtaW5pbm9cIjpcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpRiA9IDA7IGlGIDwgYXJyYXlJZHMubGVuZ3RoOyBpRisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJheUlkc1tpRl0gPT09IFwidHJpY3BcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJZHNbaUZdID09PSBcInN1cHJhaWxcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJZHNbaUZdID09PSBcImNveGFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZGVyZWRJZHMucHVzaChhcnJheUlkc1tpRl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm5ldXRyb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlOID0gMDsgaU4gPCBhcnJheUlkcy5sZW5ndGg7IGlOKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5SWRzW2lOXSA9PT0gXCJwZWl0XCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lOXSA9PT0gXCJhYmRcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJZHNbaU5dID09PSBcInRyaWNwXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lOXSA9PT0gXCJzdXByYWlsXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lOXSA9PT0gXCJjb3hhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5kZXJlZElkcy5wdXNoKGFycmF5SWRzW2lOXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBzbGljZWRFcnJvciA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnN0cmluZ0Vycm9yKGBvYnRlbmRvIGJvZHlUeXBlIHbDoWxpZG9gLCBib2R5VHlwZSA/PyBudWxsLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGdlbmRlcmVkSWRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKGB2YWxpZGFuZG8gZWxlbWVudG9zIHBhcmEgZGVmaW5pw6fDo28gZGUgZ8OqbmVybyBjb21vIHN0cmluZ3NgLCBib2R5VHlwZSA/PyBudWxsLCBcInN0cmluZ1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBhcnJheSBlbSBmaWx0ZXJJZHNCeUdlbmRlcigpYCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUGVyc29uSW5zdGFuY2UocGVyc29uKSB7XHJcbiAgICBpZiAodHlwZW9mIHBlcnNvbi5nZW4gPT09IFwic3RyaW5nXCIgJiYgcGVyc29uLmdlbiAhPT0gXCJcIikge1xyXG4gICAgICAgIGlmIChwZXJzb24uZ2VuID09PSBcIm1hc2N1bGlub1wiKSB7XHJcbiAgICAgICAgICAgIHBlcnNvbiA9IG5ldyBNYW4ocGVyc29uLmdlbiwgcGVyc29uLmFnZSwgcGVyc29uLndlaWdodCwgcGVyc29uLmhlaWdodCwgcGVyc29uLnN1bURDdXQsIHBlcnNvbi5hdHZMdmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwZXJzb24uZ2VuID09PSBcImZlbWluaW5vXCIpIHtcclxuICAgICAgICAgICAgcGVyc29uID0gbmV3IFdvbWFuKHBlcnNvbi5nZW4sIHBlcnNvbi5hZ2UsIHBlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHQsIHBlcnNvbi5zdW1EQ3V0LCBwZXJzb24uYXR2THZsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocGVyc29uLmdlbiA9PT0gXCJuZXV0cm9cIikge1xyXG4gICAgICAgICAgICBwZXJzb24gPSBuZXcgTmV1dHJvKHBlcnNvbi5nZW4sIHBlcnNvbi5hZ2UsIHBlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHQsIHBlcnNvbi5zdW1EQ3V0LCBwZXJzb24uYXR2THZsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnN0cmluZ0Vycm9yKFwicGVyc29uLmdlblwiLCBwZXJzb24/LmdlbiA/PyBudWxsLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci50eXBlRXJyb3IoXCJwZXJzb24uZ2VuXCIsIHBlcnNvbj8uZ2VuID8/IG51bGwsIFwic3RyaW5nXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwZXJzb247XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL25lc3NlIGZpbGUgb2NvcnJlbSBwcmluY2lwYWxtZW50ZSBhcyBhZGnDp8O1ZXMgZGUgbGlzdGVuZXJzLCBzaW5jcm9uaXphw6fDo28gZGFzIGNoYW1hZGFzIGRlIGZ1bsOnw7VlcyBwYXJhIG1hbmlwdWxhw6fDo28gZGUgaW5mb3JtYcOnw6NvL2xheW91dCBlIHZhbGlkYcOnw6NvIGRvcyBlbGVtZW50b3Mgbm8gRE9NXHJcbmltcG9ydCAqIGFzIEVkRmlzTnV0TW9kZWwgZnJvbSBcIi4vZWRGaXNOdXRNb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBFZEZpc051dEhhbmRsZXIgZnJvbSBcIi4vZWRGaXNOdXRIYW5kbGVyXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbE1vZGVsIGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ01vZGVsXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbEhhbmRsZXIgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9nSGFuZGxlcnNcIjtcclxuaW1wb3J0ICogYXMgRXJyb3JIYW5kbGVyIGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZXJyb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IE1hbiwgV29tYW4sIE5ldXRybyB9IGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvY2xhc3Nlc1wiO1xyXG4vL2luaWNpYWxpemHDp8OjbyBkZSBjb25zdGFudGVzIGEgcGFydGlyIGRlIHByb2N1cmEgbm8gRE9NXHJcbmNvbnN0IHRleHRhcmVhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZXh0YXJlYVwiKTtcclxuY29uc3QgdGV4dElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbmNvbnN0IHRleHRDb250cyA9IFsuLi50ZXh0YXJlYXMsIC4uLnRleHRJbnB1dHNdO1xyXG5jb25zdCBnZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5JZFwiKTtcclxuY29uc3QgZ2VuQmlydGhSZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdlbkJpcnRoUmVsSWRcIik7XHJcbmNvbnN0IGdlblRyYW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5UcmFuc0lkXCIpO1xyXG5jb25zdCBnZW5GaXNBbGluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5GaXNBbGluSWRcIik7XHJcbmNvbnN0IHRleHRCb2R5dHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dEJvZHl0eXBlXCIpO1xyXG5jb25zdCBhZ2VFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZ2VJZFwiKTtcclxuY29uc3QgYXR2THZsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0THZsQXRGaXNcIik7XHJcbmNvbnN0IG51bUlucHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyk7XHJcbmNvbnN0IHJhZGlvQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScpO1xyXG5jb25zdCBjb21vcmJCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvdW50Q29tb3JiXCIpO1xyXG5jb25zdCBjb21vcmJCdG5zQXJyYXkgPSBBcnJheS5mcm9tKGNvbW9yYkJ0bnMpO1xyXG5jb25zdCBhdGl2RmlzQ29udGFpbmVyQnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb3VudEF0RmlzXCIpO1xyXG5jb25zdCBhdGl2RmlzQ29udGFpbmVyQnRuc0FycmF5ID0gQXJyYXkuZnJvbShhdGl2RmlzQ29udGFpbmVyQnRucyk7XHJcbmNvbnN0IGNvbnNUYWJsZXNGcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnNQcm9nQ29uc0lkXCIpO1xyXG5jb25zdCBudW1Db25zRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0TnVtQ29uc1wiKTtcclxuY29uc3QgdGFiU1ZpID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWJQcm9nU1ZpXCIpO1xyXG5jb25zdCB0YWJNZWRBbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYk1lZEFudFwiKTtcclxuY29uc3QgdGFiREMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYkRDdXRcIik7XHJcbmNvbnN0IHRhYkluZFBlcmMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYkluZFBlcmNcIik7XHJcbmNvbnN0IGVkaXRhYmxlQ2l0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NpdGVbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXScpO1xyXG5jb25zdCBhc3REaWd0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbltpZCQ9XCJBc3REaWd0QnRuJyk7XHJcbmNvbnN0IGRlYWN0QXV0b2NvcnJlY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2lkXj1cImRlYWN0QXV0b2NvcnJlY3RCdG5cIl0nKTtcclxuY29uc3QgZGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25baWQkPVwiRGF0QnRuXCJdJyk7XHJcbmNvbnN0IGdvcmRDb3JwTHZsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnb3JkQ29ycEx2bFwiKTtcclxuY29uc3QgbG9ja0dvcmRDb3JwTHZsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NrR29yZENvcnBMdmxcIik7XHJcbmNvbnN0IG5hZlR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hZlR5cGVcIik7XHJcbmNvbnN0IGZvcm1UTUJUeXBlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUNhbGNUTUJUeXBlXCIpO1xyXG5jb25zdCBzcGFuRmFjdG9yQXRsZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGFuRmFjdG9yQXRsZXRhXCIpO1xyXG5jb25zdCBzZWxGYWN0b3JBdGxldGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbEZhY3RvckF0bGV0YVwiKTtcclxuY29uc3Qgd2VpZ2h0SW5wcyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImlucFdlaWdodFwiKSk7XHJcbmNvbnN0IGhlaWdodElucHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbnBIZWlnaHRcIikpO1xyXG5jb25zdCBzdW1EQ0lucHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbnBTdW1EQ3V0XCIpKTtcclxuY29uc3QgSU1DSW5wcyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImlucEltY1wiKSk7XHJcbmNvbnN0IE1MR0lucHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbnBNbGdcIikpO1xyXG5jb25zdCBQR0NJbnBzID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaW5wUGdjXCIpKTtcclxuY29uc3QgVE1CSW5wcyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImlucFRtYlwiKSk7XHJcbmNvbnN0IEdFVElucHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbnBHZXRcIikpO1xyXG5jb25zdCBJTUNCdG5zID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFiQnRuSW1jXCIpKTtcclxuY29uc3QgTUxHQnRucyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhYkJ0bk1sZ1wiKSk7XHJcbmNvbnN0IFBHQ0J0bnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWJCdG5QZ2NcIikpO1xyXG5jb25zdCBUTUJCdG5zID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFiQnRuVG1iXCIpKTtcclxuY29uc3QgR0VUQnRucyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhYkJ0bkdldFwiKSk7XHJcbmNvbnN0IGF1dG9GaWxsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhdXRvRmlsbEJ0blwiKTtcclxuY29uc3QgdHJpb1JlYWROdW1Db25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmlvUmVhZE51bUNvbnNcIik7XHJcbmNvbnN0IG51bUNvbnNUZXh0SGVhZENlbHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJudW1Db25zVGV4dEhlYWRDZWxcIikpO1xyXG5jb25zdCBsb2Nrc1RhYkluZCA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxvY2tUYWJJbmRcIikpO1xyXG5jb25zdCByZXNldEZvcm1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc2V0Rm9ybUJ0blwiKTtcclxuY29uc3Qgc3ViQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRGb3JtQnV0SWRcIik7XHJcbi8vaW5pY2lhbGl6YcOnw6NvIGRlIHZhcmnDoXZlaXMgcGFyYSB2YWxpZGHDp8OjbyBlIGNvbnN0cnXDp8OjbyBkZSBwZXNzb2EgdHJhdGFkYSBubyBmb3JtdWzDoXJpb1xyXG5jb25zdCBhcmVBbGxHZW5Db250Q2hlY2tlZCA9IEdsb2JhbE1vZGVsLmNoZWNrQWxsR2VuQ29udHMoZ2VuRWxlbWVudCwgZ2VuQmlydGhSZWwsIGdlblRyYW5zLCBnZW5GaXNBbGluKTtcclxubGV0IHBlcnNvbiA9IHtcclxuICAgIGdlbjogZ2VuRWxlbWVudD8udmFsdWUgPz8gXCJcIixcclxuICAgIGFnZTogMCxcclxuICAgIHN1bURDdXQ6IDAsXHJcbiAgICB3ZWlnaHQ6IDAsXHJcbiAgICBoZWlnaHQ6IDAsXHJcbiAgICBhdHZMdmw6IGF0dkx2bEVsZW1lbnQ/LnZhbHVlID8/IFwiXCIsXHJcbn07XHJcbi8vaW5pY2lhbGl6YcOnw6NvIGRlIHZhcmnDoXZlaXMgdXNhZGFzIG5vIHRhYmVsYW1lbnRvLCBwYXJhIGFsY2FuY2UgZW0gZXNjb3BvIGdsb2JhbFxyXG4vL3ZhcmnDoXZlaXMgZSBjb25zdGFudGVzIG9idGlkYXMgYXRyYXbDqXMgZGUgcXVlcmllcyBuYXMgdGFiZWxhcyBzw6NvIGluaWNpYWxpemFkYXMgZW0gYmxvY29zLCBhcMOzcyB2YWxpZGHDp8OjbyBkYXMgcmVzcGVjdGl2YXMgdGFiZWxhc1xyXG5sZXQgbnVtVG90YWxUYWJzQ29ucyA9IDE7XHJcbmxldCBudW1Db25zID0gMTtcclxubGV0IG51bUNvbCA9IDE7XHJcbmxldCBudW1Db2xzQ29ucyA9IDE7XHJcbmxldCBudW1Ub3RhbENvbHNDb25zID0gMTtcclxubGV0IGFyZUNvbEdyb3Vwc1NpbWlsYXIgPSBmYWxzZTtcclxubGV0IGFyZU51bUNvbnNPcHNWYWxpZCA9IGZhbHNlO1xyXG5sZXQgdGFyZ0lucFdlaWdodCA9IG51bGw7XHJcbmxldCB0YXJnSW5wSGVpZ2h0ID0gbnVsbDtcclxubGV0IHRhcmdJbnBTdW1EQ3V0ID0gbnVsbDtcclxubGV0IHRhcmdJbnBJTUMgPSBudWxsO1xyXG5sZXQgdGFyZ0lucE1MRyA9IG51bGw7XHJcbmxldCB0YXJnSW5wUEdDID0gbnVsbDtcclxubGV0IHRhcmdJbnBUTUIgPSBudWxsO1xyXG5sZXQgdGFyZ0lucEdFVCA9IG51bGw7XHJcbmxldCBhcnJheVRhcmdJbnBzID0gW107XHJcbmxldCBhcnJheVdIID0gWzAsIDBdO1xyXG5sZXQgYXJyYXlQR0MgPSBbMCwgbnVsbCwgbnVsbF07XHJcbmxldCBJTUMgPSAwO1xyXG5sZXQgTUxHID0gMDtcclxubGV0IFBHQyA9IDA7XHJcbmxldCBUTUIgPSAwO1xyXG5sZXQgR0VUID0gMDtcclxubGV0IGluZGV4ZXNBcnJheSA9IFswLCAwLCAwLCAwXTtcclxubGV0IGZhY3RvckF0dkx2bCA9IDA7XHJcbmxldCBmYWN0b3JBdGxldGEgPSBcIlwiO1xyXG5sZXQgbnVtQ29uc0xhc3RPcCA9IDA7XHJcbmxldCBpc1BlcnNvbkNsYXNzaWZpZWQgPSBmYWxzZTtcclxubGV0IGlzQXV0b0ZpbGxBY3RpdmUgPSB0cnVlO1xyXG5pZiAoc2VsRmFjdG9yQXRsZXRhIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgIGZhY3RvckF0bGV0YSA9IHNlbEZhY3RvckF0bGV0YS52YWx1ZTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoc2VsRmFjdG9yQXRsZXRhID8/IG51bGwsIFwic2VsRmFjdG9yQXRsZXRhXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG4vL2luw61jaW8gZGEgdmFsaWRhw6fDo28gZGUgZWxlbWVudG9zIG5vIERPTSBlIGluc2Vyw6fDo28gZGUgbGlzdGVuZXJzIGNvbSBjYWxsYmFja3MgcmVzcGVjdGl2b3NcclxuaWYgKHRleHRDb250cy5sZW5ndGggPiAwKSB7XHJcbiAgICB0ZXh0Q29udHMuZm9yRWFjaChmdW5jdGlvbiAodGV4dENvbnQpIHtcclxuICAgICAgICB0ZXh0Q29udC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC50YXJnZXQgJiZcclxuICAgICAgICAgICAgICAgIChpbnB1dC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKGlucHV0LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudGFyZ2V0LnR5cGUgPT09IFwidGV4dFwiKSkpIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbE1vZGVsLmF1dG9DYXBpdGFsaXplSW5wdXRzKGlucHV0LnRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChpbnB1dD8udGFyZ2V0ID8/IG51bGwsIFwidGV4dENvbnRcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKHRleHRDb250cyA/PyBudWxsLCBcInRleHRDb250c1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKG51bUlucHMubGVuZ3RoID4gMCkge1xyXG4gICAgbnVtSW5wcy5mb3JFYWNoKGZ1bmN0aW9uIChudW1JbnApIHtcclxuICAgICAgICBudW1JbnAuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQudGFyZ2V0ICYmXHJcbiAgICAgICAgICAgICAgICBpbnB1dC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICBpbnB1dC50YXJnZXQudHlwZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsTW9kZWwubnVtYmVyTGltaXQoaW5wdXQudGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKGlucHV0Py50YXJnZXQgPz8gbnVsbCwgXCJudW1JbnBcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKG51bUlucHMgPz8gbnVsbCwgXCJudW1JbnBzXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG5pZiAocmFkaW9CdXR0b25zLmxlbmd0aCA+IDApIHtcclxuICAgIHJhZGlvQnV0dG9ucy5mb3JFYWNoKChyYWRpbykgPT4ge1xyXG4gICAgICAgIGlmIChyYWRpbyBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgcmFkaW8udHlwZSA9PT0gXCJyYWRpb1wiKSB7XHJcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChrZXlkb3duKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWxIYW5kbGVyLm9wUmFkaW9IYW5kbGVyKGtleWRvd24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiBHbG9iYWxIYW5kbGVyLmNwYklucEhhbmRsZXIocmFkaW8pKTtcclxuICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKCkgPT4gR2xvYmFsSGFuZGxlci5jcGJJbnBIYW5kbGVyKHJhZGlvKSk7XHJcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiBHbG9iYWxIYW5kbGVyLmRvdWJsZUNsaWNrSGFuZGxlcihyYWRpbykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChyYWRpbyA/PyBudWxsLCBcInJhZGlvIGVsZW1lbnRcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQocmFkaW9CdXR0b25zID8/IG51bGwsIFwicmFkaW9CdXR0b25zXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG5pZiAoY29tb3JiQnRuc0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgIGNvbW9yYkJ0bnNBcnJheS5mb3JFYWNoKChjb21vcmJCdG4pID0+IHtcclxuICAgICAgICBpZiAoY29tb3JiQnRuICYmIGNvbW9yYkJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbW9yYkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gRWRGaXNOdXRIYW5kbGVyLmFkZFJvd0NvbW9yYihjb21vcmJCdG4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChjb21vcmJCdG4gPz8gbnVsbCwgXCJjb21vcmJCdG5cIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoY29tb3JiQnRuc0FycmF5ID8/IFwibnVsbFwiLCBcImNvbW9yYkJ0bnNBcnJheVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKGF0aXZGaXNDb250YWluZXJCdG5zQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgYXRpdkZpc0NvbnRhaW5lckJ0bnNBcnJheS5mb3JFYWNoKChhdGl2RmlzQ29udGFpbmVyQnRuKSA9PiB7XHJcbiAgICAgICAgaWYgKGF0aXZGaXNDb250YWluZXJCdG4gJiZcclxuICAgICAgICAgICAgYXRpdkZpc0NvbnRhaW5lckJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGF0aXZGaXNDb250YWluZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IEVkRmlzTnV0SGFuZGxlci5hZGRSb3dBdGl2RmlzKGF0aXZGaXNDb250YWluZXJCdG4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChhdGl2RmlzQ29udGFpbmVyQnRuID8/IG51bGwsIFwiYXRpdkZpc0NvbnRhaW5lckJ0blwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChhdGl2RmlzQ29udGFpbmVyQnRuc0FycmF5ID8/IG51bGwsIFwiYXRpdkZpc0NvbnRhaW5lckJ0bnNBcnJheVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKGRhdGVCdG5zLmxlbmd0aCA+IDApIHtcclxuICAgIGRhdGVCdG5zLmZvckVhY2goZnVuY3Rpb24gKGRhdGVCdG4pIHtcclxuICAgICAgICBpZiAoZGF0ZUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGRhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChhY3RpdmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR2xvYmFsSGFuZGxlci51c2VDdXJyZW50RGF0ZShhY3RpdmF0aW9uLCBkYXRlQnRuKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoZGF0ZUJ0biA/PyBudWxsLCBcImRhdGVCdG5cIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoZGF0ZUJ0bnMgPz8gbnVsbCwgXCJkYXRlQnRuc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKGVkaXRhYmxlQ2l0ZSkge1xyXG4gICAgbGV0IGZpcnN0Q2xpY2sgPSB0cnVlO1xyXG4gICAgY29uc3QgY2l0ZUNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uIChjbGljaykge1xyXG4gICAgICAgIGlmIChmaXJzdENsaWNrICYmIGNsaWNrLnRhcmdldCAmJiBjbGljay50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICBHbG9iYWxNb2RlbC5yZW1vdmVGaXJzdENsaWNrKGNsaWNrLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGZpcnN0Q2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWRpdGFibGVDaXRlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaXRlQ2xpY2tIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChjbGljay50YXJnZXQgPz8gbnVsbCwgXCJlZGl0YWJsZUNpdGVcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBlZGl0YWJsZUNpdGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChrZXlwcmVzcykge1xyXG4gICAgICAgIGlmIChrZXlwcmVzcy50YXJnZXQgJiYga2V5cHJlc3MudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgR2xvYmFsTW9kZWwuYXV0b0NhcGl0YWxpemVDaXRlKGtleXByZXNzLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoa2V5cHJlc3MudGFyZ2V0ID8/IG51bGwsIFwiZWRpdGFibGVDaXRlXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGVkaXRhYmxlQ2l0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2l0ZUNsaWNrSGFuZGxlcik7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKG51bGwsIFwiZWRpdGFibGVDaXRlXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG5pZiAoZGVhY3RBdXRvY29ycmVjdEJ0bnMubGVuZ3RoID4gMCkge1xyXG4gICAgZGVhY3RBdXRvY29ycmVjdEJ0bnMuZm9yRWFjaChmdW5jdGlvbiAoZGVhY3RBdXRvY29ycmVjdEJ0bikge1xyXG4gICAgICAgIGlmIChkZWFjdEF1dG9jb3JyZWN0QnRuICYmXHJcbiAgICAgICAgICAgIGRlYWN0QXV0b2NvcnJlY3RCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBkZWFjdEF1dG9jb3JyZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoY2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBHbG9iYWxNb2RlbC5zd2l0Y2hBdXRvY29ycmVjdChjbGljaywgZGVhY3RBdXRvY29ycmVjdEJ0bik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKGRlYWN0QXV0b2NvcnJlY3RCdG4gPz8gbnVsbCwgXCJkZWFjdEF1dG9jb3JyZWN0QnRuXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKGRlYWN0QXV0b2NvcnJlY3RCdG5zID8/IG51bGwsIFwiZGVhY3RBdXRvY29ycmVjdEJ0bnNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChhc3REaWd0QnRucy5sZW5ndGggPiAwKSB7XHJcbiAgICBhc3REaWd0QnRucy5mb3JFYWNoKGZ1bmN0aW9uIChhc3REaWd0QnRuKSB7XHJcbiAgICAgICAgaWYgKGFzdERpZ3RCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBhc3REaWd0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoY2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBHbG9iYWxIYW5kbGVyLmNoYW5nZVRvQXN0RGlnaXQoY2xpY2ssIGFzdERpZ3RCdG4pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChhc3REaWd0QnRuID8/IG51bGwsIFwiYXN0RGlndEJ0blwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChhc3REaWd0QnRucyA/PyBudWxsLCBcImFzdERpZ3RCdG5zXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG5pZiAoc3ViQnV0dG9uIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgIHN1YkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgR2xvYmFsSGFuZGxlci5zdWJGb3JtKTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoc3ViQnV0dG9uID8/IG51bGwsIFwic3ViQnV0dG9uXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG5pZiAocmVzZXRGb3JtQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgIHJlc2V0Rm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrKSA9PiB7XHJcbiAgICAgICAgaWYgKGVkaXRhYmxlQ2l0ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgIGdlblRyYW5zIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgZ2VuRmlzQWxpbiBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIEdsb2JhbEhhbmRsZXIucmVzZXRhckZvcm11bGFyaW8oY2xpY2ssIGFzdERpZ3RCdG5zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnRzTm90Rm91bmRGdW5jdGlvbihzbGljZWRFcnJvciA/PyBcIk5VTExcIiwgXCJyZXNldGFyRm9ybXVsYXJpb1wiLCBlZGl0YWJsZUNpdGUgPz8gbnVsbCwgZ2VuVHJhbnMgPz8gbnVsbCwgZ2VuRmlzQWxpbiA/PyBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQocmVzZXRGb3JtQnRuID8/IG51bGwsIFwicmVzZXRGb3JtQnRuXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG4vL3BhcmEgYXBhZ2FyIHJldG9ybm9zIG5lZ2F0aXZvcyBhbsO0bWFsb3NcclxuaWYgKGNvbnNUYWJsZXNGcyAmJiBjb25zVGFibGVzRnMgaW5zdGFuY2VvZiBIVE1MRmllbGRTZXRFbGVtZW50KSB7XHJcbiAgICBudW1Ub3RhbENvbHNDb25zID0gY29uc1RhYmxlc0ZzLnF1ZXJ5U2VsZWN0b3JBbGwoXCJjb2xcIik/Lmxlbmd0aCA/PyAxO1xyXG4gICAgbnVtVG90YWxUYWJzQ29ucyA9IGNvbnNUYWJsZXNGcy5xdWVyeVNlbGVjdG9yQWxsKFwidGFibGVcIik/Lmxlbmd0aCA/PyAxO1xyXG4gICAgY29uc3QgYWxsVGFibGVkSW5wcyA9IGNvbnNUYWJsZXNGcy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XHJcbiAgICBpZiAoYWxsVGFibGVkSW5wcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgYWxsVGFibGVkSW5wcy5mb3JFYWNoKCh0YWJJbnApID0+IHtcclxuICAgICAgICAgICAgaWYgKHRhYklucCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRhYklucC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludCh0YWJJbnAudmFsdWUpIDwgMCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuaXNOYU4ocGFyc2VJbnQodGFiSW5wLnZhbHVlKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5wLnZhbHVlID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0YWJJbnAgPz8gbnVsbCwgXCJ0YWJJbnBcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoYWxsVGFibGVkSW5wcyA/PyBudWxsLCBcImFsbFRhYmxlZElucHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYXJyQ29sR3JvdXBzVmFsaWRhdGlvbiA9IEVkRmlzTnV0TW9kZWwuY2hlY2tJbm5lckNvbEdyb3Vwcyhjb25zVGFibGVzRnMpID8/IFswLCBmYWxzZV07XHJcbiAgICBpZiAoYXJyQ29sR3JvdXBzVmFsaWRhdGlvblswXSAhPT0gMCAmJiBhcnJDb2xHcm91cHNWYWxpZGF0aW9uWzFdICE9PSBmYWxzZSkge1xyXG4gICAgICAgIFtudW1Db2xzQ29ucywgYXJlQ29sR3JvdXBzU2ltaWxhcl0gPSBhcnJDb2xHcm91cHNWYWxpZGF0aW9uO1xyXG4gICAgfVxyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChjb25zVGFibGVzRnMgPz8gbnVsbCwgXCJjb25zVGFibGVzRnNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmICh0YWJEQyAmJiB0YWJEQyBpbnN0YW5jZW9mIEhUTUxUYWJsZUVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHJvd3NEQyA9IHRhYkRDLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWJSb3dEQ3V0XCIpO1xyXG4gICAgY29uc3Qgcm93c0RDQXJyYXkgPSBBcnJheS5mcm9tKHJvd3NEQykuZmlsdGVyKChyb3dEQykgPT4gcm93REMgaW5zdGFuY2VvZiBIVE1MVGFibGVSb3dFbGVtZW50KTtcclxuICAgIGNvbnN0IHN1bURDQnRucyA9IHRhYkRDLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbltpZF49XCJzdW1EQ0J0blwiXScpO1xyXG4gICAgY29uc3QgcHJvdG9jb2xvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWJTZWxlY3REQ3V0SWRcIik7XHJcbiAgICAvL2FkaWNpb25hIGxpc3RlbmVycyBwYXJhIGJvdMO1ZXMgZGUgw61uZGljZXMgc2VjdW5kw6FyaW9zIGUgdmFsaWRhIG91dHJhcyB0YWJlbGFzIHVzYWRhc1xyXG4gICAgaWYgKHRhYlNWaSAmJlxyXG4gICAgICAgIHRhYlNWaSBpbnN0YW5jZW9mIEhUTUxUYWJsZUVsZW1lbnQgJiZcclxuICAgICAgICB0YWJNZWRBbnQgJiZcclxuICAgICAgICB0YWJNZWRBbnQgaW5zdGFuY2VvZiBIVE1MVGFibGVFbGVtZW50ICYmXHJcbiAgICAgICAgdGFiSW5kUGVyYyAmJlxyXG4gICAgICAgIHRhYkluZFBlcmMgaW5zdGFuY2VvZiBIVE1MVGFibGVFbGVtZW50KSB7XHJcbiAgICAgICAgLy9pbsOtY2lvIGRhIGNhcHR1cmEgZGUgcHJvcHJpZWRhZGVzIG5hcyB0YWJlbGFzXHJcbiAgICAgICAgaWYgKG51bUNvbnNFbGVtZW50Py5sYXN0RWxlbWVudENoaWxkIGluc3RhbmNlb2YgSFRNTE9wdGlvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbnVtQ29uc0xhc3RPcCA9IHBhcnNlSW50KG51bUNvbnNFbGVtZW50Py5sYXN0RWxlbWVudENoaWxkPy52YWx1ZSA/PyBcIjFcIiwgMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKG51bUNvbnNFbGVtZW50Py5sYXN0RWxlbWVudENoaWxkID8/IG51bGwsIFwibnVtQ29uc0xhc3RPcFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdmFsaWRhw6fDo28gZGEgcmVsYcOnw6NvIGRlIG9wdGlvbnMgZSBjb2x1bmFzXHJcbiAgICAgICAgaWYgKG51bUNvbnNMYXN0T3AgPT09IG51bUNvbHNDb25zIC0gMSAmJiBudW1Db25zTGFzdE9wID49IDMpIHtcclxuICAgICAgICAgICAgYXJlTnVtQ29uc09wc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLm1heE51bWJlckVycm9yKG51bUNvbnNFbGVtZW50Py5sYXN0RWxlbWVudENoaWxkPy52YWx1ZSA/PyBcIjFcIiwgXCJPcHRpb25zIHBhcmEgQ29uc3VsdGFzXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9mYXogYSBsZWl0dXJhIGRvIG7Dum1lcm8gZGUgY29uc3VsdGFcclxuICAgICAgICBpZiAoYXJlQ29sR3JvdXBzU2ltaWxhciAmJlxyXG4gICAgICAgICAgICBudW1Db25zRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50ICYmXHJcbiAgICAgICAgICAgIGdvcmRDb3JwTHZsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgYXJlTnVtQ29uc09wc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIC8vY29uc3RydcOnw6NvIGRlIGFycmF5IHBhcmEgc2ludGV0aXphciBhcmd1bWVudGHDp8OjbyBkZSBmdW7Dp8O1ZXMgZSB2YWxpZGHDp8O1ZXMgY29uanVudGFzXHJcbiAgICAgICAgICAgIGNvbnN0IHN3aXRjaEVsZW1lbnRzID0gW1xyXG4gICAgICAgICAgICAgICAgY29uc1RhYmxlc0ZzLFxyXG4gICAgICAgICAgICAgICAgbnVtQ29uc0VsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICB0YWJTVmksXHJcbiAgICAgICAgICAgICAgICB0YWJNZWRBbnQsXHJcbiAgICAgICAgICAgICAgICB0YWJEQyxcclxuICAgICAgICAgICAgICAgIHRhYkluZFBlcmMsXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkU3dpdGNoRWxlbWVudHMgPSBzd2l0Y2hFbGVtZW50cy5maWx0ZXIoKHN3aXRjaEVsZW1lbnQpID0+IHN3aXRjaEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgICAgIG51bUNvbnMgPSBwYXJzZUludChudW1Db25zRWxlbWVudD8udmFsdWUgfHwgXCIxXCIpO1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyZWRTd2l0Y2hFbGVtZW50cy5sZW5ndGggPT09IDYpIHtcclxuICAgICAgICAgICAgICAgIC8qdmFsaWRhw6fDtWVzIGRlIHJvd3MgY29tIGJhc2UgZW0gdMOtdHVsb3MgKHRleHRDb250ZW50IGRhIHByaW1laXJhIGPDqWx1bGEgw6AgZXNxdWVyZGEpIGRlIHJlc3BlY3RpdmFzIHJvd3NcclxuICAgICAgICAgICAgICAgICsgb2J0ZW7Dp8OjbyBkb3MgdGFyZ2V0IGlucHV0cyBpbmljaWFpcyovXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnBXZWlnaHRSb3dUaXRsZSA9IHRhYk1lZEFudC5xdWVyeVNlbGVjdG9yKGAjdGFiQ2VsUm93TWVkQW50Ml8xYCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnBIZWlnaHRSb3dUaXRsZSA9IHRhYk1lZEFudC5xdWVyeVNlbGVjdG9yKFwiI3RhYkNlbFJvd01lZEFudDNfMVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlucFN1bURDdXRSb3dUaXRsZSA9IHRhYkRDLnF1ZXJ5U2VsZWN0b3IoXCIjdGFiQ2VsUm93REN1dDlfMVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlucElNQ1Jvd1RpdGxlID0gdGFiSW5kUGVyYy5xdWVyeVNlbGVjdG9yKFwiI3RhYkNlbFJvd0luZFBlcmMyXzFcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnBNTEdSb3dUaXRsZSA9IHRhYkluZFBlcmMucXVlcnlTZWxlY3RvcihcIiN0YWJDZWxSb3dJbmRQZXJjM18xXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wUEdDUm93VGl0bGUgPSB0YWJJbmRQZXJjLnF1ZXJ5U2VsZWN0b3IoXCIjdGFiQ2VsUm93SW5kUGVyYzRfMVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlucFRNQlJvd1RpdGxlID0gdGFiSW5kUGVyYy5xdWVyeVNlbGVjdG9yKFwiI3RhYkNlbFJvd0luZFBlcmM1XzFcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnBHRVRSb3dUaXRsZSA9IHRhYkluZFBlcmMucXVlcnlTZWxlY3RvcihcIiN0YWJDZWxSb3dJbmRQZXJjNl8xXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9pbmljaWFsaXphw6fDo28gZGUgdGl0bGVzIGUgdGFyZ0lucHNcclxuICAgICAgICAgICAgICAgIC8qb3MgdGl0bGVzIHPDo28gY29uc3RydcOtZG9zIHNvbWVudGUgcGFyYSBhbGVydGFyIHNlIGhvdXZlciBpbmFkZXF1YcOnw6NvXHJcbiAgICAgICAgICAgICAgICBkZSBlbnRpdHVsYcOnw7VlcyBubyBIVE1MIChwb3Igb3JkZW0gb3UgdGV4dG8pKi9cclxuICAgICAgICAgICAgICAgIGlmIChpbnBXZWlnaHRSb3dUaXRsZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGlucFdlaWdodFJvd1RpdGxlLnRleHRDb250ZW50Py5tYXRjaCgvUGVzby9nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdJbnBXZWlnaHQgPSB0YWJNZWRBbnQucXVlcnlTZWxlY3RvcihgI3RhYklucFJvd01lZEFudDJfJHtudW1Db25zICsgMX1gKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0YXJnSW5wV2VpZ2h0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0YXJnSW5wV2VpZ2h0ID8/IG51bGwsIFwidGFyZ0lucFdlaWdodFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5tYXRjaEVycm9yKFwiVMOtdHVsbyBkYSBSb3cgcGFyYSBDYW1wb3MgZGUgUGVzb1wiLCBpbnBXZWlnaHRSb3dUaXRsZSA/PyBudWxsLCBpbnBXZWlnaHRSb3dUaXRsZT8udGV4dENvbnRlbnQgfHwgXCJudWxsXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbnBIZWlnaHRSb3dUaXRsZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGlucEhlaWdodFJvd1RpdGxlLnRleHRDb250ZW50Py5tYXRjaCgvQWx0dXJhL2cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEhlaWdodCA9IHRhYk1lZEFudC5xdWVyeVNlbGVjdG9yKGAjdGFiSW5wUm93TWVkQW50M18ke251bUNvbnMgKyAxfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHRhcmdJbnBIZWlnaHQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhcmdJbnBIZWlnaHQgPz8gbnVsbCwgXCJ0YXJnSW5wSGVpZ2h0XCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLm1hdGNoRXJyb3IoXCJUw610dWxvIGRhIFJvdyBwYXJhIENhbXBvcyBkZSBBbHR1cmFcIiwgaW5wSGVpZ2h0Um93VGl0bGUgPz8gbnVsbCwgaW5wSGVpZ2h0Um93VGl0bGU/LnRleHRDb250ZW50IHx8IFwibnVsbFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wU3VtREN1dFJvd1RpdGxlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wU3VtREN1dFJvd1RpdGxlLnRleHRDb250ZW50Py5tYXRjaCgvU29tYS9nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdJbnBTdW1EQ3V0ID0gdGFiREMucXVlcnlTZWxlY3RvcihgI3RhYklucFJvd0RDdXQ5XyR7bnVtQ29ucyArIDF9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodGFyZ0lucFN1bURDdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhcmdJbnBTdW1EQ3V0ID8/IG51bGwsIFwidGFyZ0lucFN1bURDdXRcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIubWF0Y2hFcnJvcihcIlTDrXR1bG8gZGEgUm93IHBhcmEgQ2FtcG9zIGRlIFNvbWEgZGUgRG9icmFzIEN1dMOibmVhc1wiLCBpbnBTdW1EQ3V0Um93VGl0bGUgPz8gbnVsbCwgaW5wU3VtREN1dFJvd1RpdGxlPy50ZXh0Q29udGVudCB8fCBcIm51bGxcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlucElNQ1Jvd1RpdGxlICYmIGlucElNQ1Jvd1RpdGxlLnRleHRDb250ZW50Py5tYXRjaCgvSU1DL2cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ0lucElNQyA9IHRhYkluZFBlcmMucXVlcnlTZWxlY3RvcihgI2lucEltYyR7bnVtQ29uc31DZWwyXyR7bnVtQ29ucyArIDF9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodGFyZ0lucElNQyBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQodGFyZ0lucElNQyA/PyBudWxsLCBcInRhcmdJbnBJTUNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIubWF0Y2hFcnJvcihcIlTDrXR1bG8gZGEgUm93IHBhcmEgQ2FtcG9zIGRlIElNQ1wiLCBpbnBJTUNSb3dUaXRsZSA/PyBudWxsLCBpbnBJTUNSb3dUaXRsZT8udGV4dENvbnRlbnQgfHwgXCJudWxsXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbnBNTEdSb3dUaXRsZSAmJiBpbnBNTEdSb3dUaXRsZS50ZXh0Q29udGVudD8ubWF0Y2goL01MRy9nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdJbnBNTEcgPSB0YWJJbmRQZXJjLnF1ZXJ5U2VsZWN0b3IoYCNpbnBNbGcke251bUNvbnN9Q2VsM18ke251bUNvbnMgKyAxfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHRhcmdJbnBNTEcgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhcmdJbnBNTEcgPz8gbnVsbCwgXCJ0YXJnSW5wTUxHXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLm1hdGNoRXJyb3IoXCJUw610dWxvIGRhIFJvdyBwYXJhIENhbXBvcyBkZSBNTEdcIiwgaW5wTUxHUm93VGl0bGUgPz8gbnVsbCwgaW5wTUxHUm93VGl0bGU/LnRleHRDb250ZW50IHx8IFwibnVsbFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wUEdDUm93VGl0bGUgJiYgaW5wUEdDUm93VGl0bGUudGV4dENvbnRlbnQ/Lm1hdGNoKC9QR0MvZykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnSW5wUEdDID0gdGFiSW5kUGVyYy5xdWVyeVNlbGVjdG9yKGAjaW5wUGdjJHtudW1Db25zfUNlbDRfJHtudW1Db25zICsgMX1gKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0YXJnSW5wUEdDIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0YXJnSW5wUEdDID8/IG51bGwsIFwidGFyZ0lucFBHQ1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5tYXRjaEVycm9yKFwiVMOtdHVsbyBkYSBSb3cgcGFyYSBDYW1wb3MgZGUgUEdDXCIsIGlucFBHQ1Jvd1RpdGxlID8/IG51bGwsIGlucFBHQ1Jvd1RpdGxlPy50ZXh0Q29udGVudCB8fCBcIm51bGxcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlucFRNQlJvd1RpdGxlICYmIGlucFRNQlJvd1RpdGxlLnRleHRDb250ZW50Py5tYXRjaCgvVE1CL2cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ0lucFRNQiA9IHRhYkluZFBlcmMucXVlcnlTZWxlY3RvcihgI2lucFRtYiR7bnVtQ29uc31DZWw1XyR7bnVtQ29ucyArIDF9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodGFyZ0lucFRNQiBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQodGFyZ0lucFRNQiA/PyBudWxsLCBcInRhcmdJbnBUTUJcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIubWF0Y2hFcnJvcihcIlTDrXR1bG8gZGEgUm93IHBhcmEgQ2FtcG9zIGRlIFRNQlwiLCBpbnBUTUJSb3dUaXRsZSA/PyBudWxsLCBpbnBUTUJSb3dUaXRsZT8udGV4dENvbnRlbnQgfHwgXCJudWxsXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbnBHRVRSb3dUaXRsZSAmJiBpbnBHRVRSb3dUaXRsZS50ZXh0Q29udGVudD8ubWF0Y2goL0dFVC9nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdJbnBHRVQgPSB0YWJJbmRQZXJjLnF1ZXJ5U2VsZWN0b3IoYCNpbnBHZXQke251bUNvbnN9Q2VsNl8ke251bUNvbnMgKyAxfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHRhcmdJbnBHRVQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhcmdJbnBHRVQgPz8gbnVsbCwgXCJ0YXJnSW5wR0VUXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLm1hdGNoRXJyb3IoXCJUw610dWxvIGRhIFJvdyBwYXJhIENhbXBvcyBkZSBHRVRcIiwgaW5wR0VUUm93VGl0bGUgPz8gbnVsbCwgaW5wR0VUUm93VGl0bGU/LnRleHRDb250ZW50IHx8IFwibnVsbFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2xpc3RlbmVyIHBhcmEgYXR1YWxpemHDp8OjbyBkZSBpbnB1dHMgdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICBudW1Db25zRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBFZEZpc051dEhhbmRsZXIuc3dpdGNoUmVxdWlyZWRDb2xzKGZpbHRlcmVkU3dpdGNoRWxlbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIG51bUNvbnMgPSBwYXJzZUludChudW1Db25zRWxlbWVudD8udmFsdWUgfHwgXCIwXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpb1JlYWROdW1Db25zIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRyaW9SZWFkTnVtQ29ucy50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpb1JlYWROdW1Db25zLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bVRvdGFsVGl0bGVkQ29sc0NvbnMgPSBudW1Ub3RhbENvbHNDb25zIC0gbnVtVG90YWxUYWJzQ29ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bUNvbnNUZXh0SGVhZENlbHMubGVuZ3RoID09PSBudW1Ub3RhbFRpdGxlZENvbHNDb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZEZpc051dEhhbmRsZXIuc3dpdGNoTnVtQ29uc1RpdGxlcyhudW1Db25zVGV4dEhlYWRDZWxzLCB0cmlvUmVhZE51bUNvbnMsIG51bVRvdGFsVGl0bGVkQ29sc0NvbnMsIG51bVRvdGFsVGFic0NvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQobnVtQ29uc1RleHRIZWFkQ2VscywgXCJudW1Db25zVGV4dEhlYWRDZWxzXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRyaW9SZWFkTnVtQ29ucz8uaWQgPz8gbnVsbCwgXCJ0cmlvUmVhZE51bUNvbnNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZUFsbEdlbkNvbnRDaGVja2VkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dEJvZHl0eXBlIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICBwcm90b2NvbG8gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaW7DrWNpbyBkYSBjb25zdHJ1w6fDo28gZGUgcGVyc29uIChhcMOzcyBpbmljaWFsaXphw6fDo28pXHJcbiAgICAgICAgICAgICAgICAgICAgLyphZGnDp8OjbyBkZSBsaXN0ZW5lcmVzIGRlIGlucHV0IHBhcmEgY2FwdHVyYXIgbXVkYW7Dp2Egbm9zIGlucHV0cyB2YWxpZGFkb3MgZSBhdHJpYnVpciDDoHMgcHJvcHJpZWRhZGVzIGRlIHBlcnNvbiovXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vYnRlbsOnw6NvIGRlIC5nZW4gaW5pY2lhbCBjb20gYWRpw6fDo28gZGUgbGlzdGVuZXJzIHBhcmEgY2hhbmdlcyBlbSBjb250ZXh0byBlIGF0dWFsaXphw6fDo28gZGUgLmdlblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGVyc29uLmdlbiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5FbGVtZW50Py5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5nZW4gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbE1vZGVsLmZsdXhHZW4oZ2VuRWxlbWVudCwgZ2VuRWxlbWVudD8udmFsdWUgPz8gbnVsbCwgZ2VuQmlydGhSZWwsIGdlblRyYW5zLCBnZW5GaXNBbGluKSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZW4gdmFsdWUgXCIgKyBwZXJzb24uZ2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRCb2R5dHlwZS52YWx1ZSA9IHBlcnNvbi5nZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5CaXJ0aFJlbD8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24uZ2VuID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWxNb2RlbC5mbHV4R2VuKGdlbkVsZW1lbnQsIGdlbkVsZW1lbnQ/LnZhbHVlID8/IG51bGwsIGdlbkJpcnRoUmVsLCBnZW5UcmFucywgZ2VuRmlzQWxpbikgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2VuIHZhbHVlIFwiICsgcGVyc29uLmdlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Qm9keXR5cGUudmFsdWUgPSBwZXJzb24uZ2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuVHJhbnM/LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmdlbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsTW9kZWwuZmx1eEdlbihnZW5FbGVtZW50LCBnZW5FbGVtZW50Py52YWx1ZSA/PyBudWxsLCBnZW5CaXJ0aFJlbCwgZ2VuVHJhbnMsIGdlbkZpc0FsaW4pID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdlbiB2YWx1ZSBcIiArIHBlcnNvbi5nZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEJvZHl0eXBlLnZhbHVlID0gcGVyc29uLmdlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbkZpc0FsaW4/LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmdlbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsTW9kZWwuZmx1eEdlbihnZW5FbGVtZW50LCBnZW5FbGVtZW50Py52YWx1ZSA/PyBudWxsLCBnZW5CaXJ0aFJlbCwgZ2VuVHJhbnMsIGdlbkZpc0FsaW4pID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdlbiB2YWx1ZSBcIiArIHBlcnNvbi5nZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEJvZHl0eXBlLnZhbHVlID0gcGVyc29uLmdlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci50eXBlRXJyb3IoXCJwZXJzb24uZ2VuXCIsIHBlcnNvbj8uZ2VuID8/IG51bGwsIFwic3RyaW5nXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRCb2R5dHlwZSAmJiB0ZXh0Qm9keXR5cGUgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Qm9keXR5cGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZEZpc051dE1vZGVsLmNoYW5nZVRhYkRDdXRMYXlvdXQocHJvdG9jb2xvLCB0YWJEQyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24uZ2VuID0gdGV4dEJvZHl0eXBlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdlbkJpcnRoUmVsLnZhbHVlID09PSBcImNpc1wiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdlbkVsZW1lbnQudmFsdWUgPT09IFwibWFzY3VsaW5vXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuRWxlbWVudC52YWx1ZSA9PT0gXCJmZW1pbmlub1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbkVsZW1lbnQudmFsdWUgPSB0ZXh0Qm9keXR5cGUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdlbiB2YWx1ZSBcIiArIHBlcnNvbi5nZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsaWNlZEVycm9yID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGV4dEJvZHl0eXBlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm1hc2N1bGlub1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5GaXNBbGluLnZhbHVlID0gXCJtYXNjdWxpbml6YWRvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmZW1pbmlub1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5GaXNBbGluLnZhbHVlID0gXCJmZW1pbmlsaXphZG9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5ldXRyb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5GaXNBbGluLnZhbHVlID0gXCJuZXV0cm9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2VkRXJyb3IgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoXCJ2ZXJpZmljYW5kbyB0ZXh0Qm9keXR5cGUudmFsdWVcIiwgdGV4dEJvZHl0eXBlPy52YWx1ZSA/PyBcIm51bGxcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChwcm90b2NvbG8gPz8gbnVsbCwgXCJwcm90b2NvbG9cIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL29idGVuw6fDo28gZGUgLmFnZSBpbmljaWFsIGNvbSBsaXN0ZW5lciBwYXJhIGlucHV0IGUgYXR1YWxpemHDp8OjbyBjb3JyZXNwb25kZW50ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZ2VFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2VFbGVtZW50LnR5cGUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmFnZSA9IHBhcnNlRmxvYXQoYWdlRWxlbWVudD8udmFsdWUpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGVyc29uLmFnZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5hZ2UgPSBFZEZpc051dEhhbmRsZXIudmFsaWRhdGVFdlJlc3VsdE51bShhZ2VFbGVtZW50LCBwZXJzb24uYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlbSBhdXRvZmlsbCwgZMOhIHVwZGF0ZSBzb21lbnRlIGVtIHBlcnNvbi5hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNBdXRvRmlsbEFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVBHQyA9IEVkRmlzTnV0SGFuZGxlci51cGRhdGVQR0MocGVyc29uLCBudW1Db25zLCBcImNvbnNcIiwgY29uc1RhYmxlc0ZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1BHQywgdGFyZ0lucFN1bURDdXQsIHRhcmdJbnBQR0NdID0gYXJyYXlQR0M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5zdW1EQ3V0ID0gRWRGaXNOdXRIYW5kbGVyLm1hdGNoUGVyc29uUHJvcGVydGllc0RDKHBlcnNvbiwgdGFyZ0lucFN1bURDdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzID0gRWRGaXNOdXRIYW5kbGVyLmRlZmluZVRhcmdJbnBzKG51bUNvbnMsIFwiY29uc1wiLCBjb25zVGFibGVzRnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wV2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBJTUMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wTUxHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucFRNQixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBHRVQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gPSBhcnJheVRhcmdJbnBzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVdIID0gRWRGaXNOdXRIYW5kbGVyLm1hdGNoUGVyc29uUHJvcGVydGllc1dIKHBlcnNvbiwgdGFyZ0lucFdlaWdodCwgdGFyZ0lucEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwZXJzb24ud2VpZ2h0LCBwZXJzb24uaGVpZ2h0XSA9IGFycmF5V0g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2VpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi53ZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlaWdodCBjYXB0dXJhZG8gXCIgKyBwZXJzb24uaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhlc0FycmF5ID0gRWRGaXNOdXRIYW5kbGVyLnVwZGF0ZUluZGV4ZXNDb250ZXh0cyhwZXJzb24sIGdvcmRDb3JwTHZsLCB0YXJnSW5wSU1DLCB0YXJnSW5wTUxHLCB0YXJnSW5wVE1CLCB0YXJnSW5wR0VULCBmb3JtVE1CVHlwZUVsZW1lbnQsIGZhY3RvckF0dkx2bCwgZmFjdG9yQXRsZXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0lNQywgTUxHLCBUTUIsIEdFVF0gPSBpbmRleGVzQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwicGVyc29uLmFnZVwiLCBwZXJzb24/LmFnZSA/PyBudWxsLCBcIm51bWJlclwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoYWdlRWxlbWVudCA/PyBudWxsLCBcImFnZUVsZW1lbnRcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL29idGVuw6fDo28gZGUgLndlaWdodCBpbmljaWFsIGNvbSBsaXN0ZW5lciBwYXJhIGlucHV0IGUgYXR1YWxpemHDp8OjbyBjb3JyZXNwb25kZW50ZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnSW5wV2VpZ2h0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wV2VpZ2h0LnR5cGUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLndlaWdodCA9IHBhcnNlSW50KHRhcmdJbnBXZWlnaHQudmFsdWUgfHwgXCIwXCIsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwZXJzb24ud2VpZ2h0ID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2VpZ2h0SW5wcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0SW5wcy5mb3JFYWNoKCh3ZWlnaHRJbnApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0SW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24ud2VpZ2h0ID0gRWRGaXNOdXRIYW5kbGVyLnZhbGlkYXRlRXZSZXN1bHROdW0od2VpZ2h0SW5wLCBwZXJzb24ud2VpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0F1dG9GaWxsQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtQ29sID0gRWRGaXNOdXRIYW5kbGVyLmdldE51bUNvbCh3ZWlnaHRJbnApID8/IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBudW1Db2wgPT09IFwibnVtYmVyXCIgJiYgbnVtQ29sID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzID0gRWRGaXNOdXRIYW5kbGVyLmRlZmluZVRhcmdJbnBzKG51bUNvbCwgXCJ0YWJcIiwgY29uc1RhYmxlc0ZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucFdlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wSU1DLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucE1MRyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBUTUIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wR0VULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdID0gYXJyYXlUYXJnSW5wcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlXSCA9IEVkRmlzTnV0SGFuZGxlci5tYXRjaFBlcnNvblByb3BlcnRpZXNXSChwZXJzb24sIHRhcmdJbnBXZWlnaHQsIHRhcmdJbnBIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24uaGVpZ2h0ID0gYXJyYXlXSFsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3ZWlnaHQgY2FwdHVyYWRvIFwiICsgcGVyc29uLndlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleGVzQXJyYXkgPSBFZEZpc051dEhhbmRsZXIudXBkYXRlSW5kZXhlc0NvbnRleHRzKHBlcnNvbiwgZ29yZENvcnBMdmwsIHRhcmdJbnBJTUMsIHRhcmdJbnBNTEcsIHRhcmdJbnBUTUIsIHRhcmdJbnBHRVQsIGZvcm1UTUJUeXBlRWxlbWVudCwgZmFjdG9yQXR2THZsLCBmYWN0b3JBdGxldGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbSU1DLCBNTEcsIFRNQiwgR0VUXSA9IGluZGV4ZXNBcnJheTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcIm9idGVuZG8gTsO6bWVybyBkZSBDb2x1bmFcIiwgbnVtQ29sID8/IG51bGwsIFwibnVtYmVyIChuYXR1cmFsKVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZCh3ZWlnaHRJbnBzLCBcIndlaWdodElucHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcInBlcnNvbi53ZWlnaHRcIiwgcGVyc29uLndlaWdodCwgXCJudW1iZXJcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhcmdJbnBXZWlnaHQgPz8gbnVsbCwgXCJ0YXJnSW5wV2VpZ2h0XCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vYnRlbsOnw6NvIGRlIC5oZWlnaHQgaW5pY2lhbCBjb20gbGlzdGVuZXIgcGFyYSBpbnB1dCBlIGF0dWFsaXphw6fDo28gY29ycmVzcG9uZGVudGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ0lucEhlaWdodCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEhlaWdodC50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5oZWlnaHQgPSBwYXJzZUludCh0YXJnSW5wSGVpZ2h0LnZhbHVlIHx8IFwiMFwiLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcGVyc29uLmhlaWdodCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlaWdodElucHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodElucHMuZm9yRWFjaCgoaGVpZ2h0SW5wKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodElucC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmhlaWdodCA9IEVkRmlzTnV0SGFuZGxlci52YWxpZGF0ZUV2UmVzdWx0TnVtKGhlaWdodElucCwgcGVyc29uLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlbSBhdXRvZmlsbCwgZMOhIHVwZGF0ZSBzb21lbnRlIGVtIHBlcnNvbi5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0F1dG9GaWxsQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3ZWlnaHQgY2FwdHVyYWRvIFwiICsgcGVyc29uLndlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWlnaHQgY2FwdHVyYWRvIFwiICsgcGVyc29uLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtQ29sID0gRWRGaXNOdXRIYW5kbGVyLmdldE51bUNvbChoZWlnaHRJbnApID8/IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBudW1Db2wgPT09IFwibnVtYmVyXCIgJiYgbnVtQ29sID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzID0gRWRGaXNOdXRIYW5kbGVyLmRlZmluZVRhcmdJbnBzKG51bUNvbCwgXCJ0YWJcIiwgY29uc1RhYmxlc0ZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wSU1DLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucE1MRyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBUTUIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wR0VULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdID0gYXJyYXlUYXJnSW5wcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlXSCA9IEVkRmlzTnV0SGFuZGxlci5tYXRjaFBlcnNvblByb3BlcnRpZXNXSChwZXJzb24sIHRhcmdJbnBXZWlnaHQsIHRhcmdJbnBIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24ud2VpZ2h0ID0gYXJyYXlXSFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3ZWlnaHQgY2FwdHVyYWRvIFwiICsgcGVyc29uLndlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleGVzQXJyYXkgPSBFZEZpc051dEhhbmRsZXIudXBkYXRlSW5kZXhlc0NvbnRleHRzKHBlcnNvbiwgZ29yZENvcnBMdmwsIHRhcmdJbnBJTUMsIHRhcmdJbnBNTEcsIHRhcmdJbnBUTUIsIHRhcmdJbnBHRVQsIGZvcm1UTUJUeXBlRWxlbWVudCwgZmFjdG9yQXR2THZsLCBmYWN0b3JBdGxldGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbSU1DLCBNTEcsIFRNQiwgR0VUXSA9IGluZGV4ZXNBcnJheTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcIm9idGVuZG8gTsO6bWVybyBkZSBDb2x1bmFcIiwgbnVtQ29sID8/IG51bGwsIFwibnVtYmVyIChuYXR1cmFsKVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChoZWlnaHRJbnBzLCBcImhlaWdodElucHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcInBlcnNvbi5oZWlnaHRcIiwgcGVyc29uLmhlaWdodCwgXCJudW1iZXJcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhcmdJbnBIZWlnaHQgPz8gbnVsbCwgXCJ0YXJnSW5wSGVpZ2h0XCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vYnRlbsOnw6NvIGRlIC5zdW1EQ3V0IGluaWNpYWwgY29tIGxpc3RlbmVyIHBhcmEgaW5wdXQgZSBhdHVhbGl6YcOnw6NvIGNvcnJlc3BvbmRlbnRlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdJbnBTdW1EQ3V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wU3VtREN1dC50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5zdW1EQ3V0ID0gcGFyc2VJbnQodGFyZ0lucFN1bURDdXQudmFsdWUgfHwgXCIwLjAxXCIsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1bURDSW5wcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1EQ0lucHMuZm9yRWFjaCgoc3VtRENJbnApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1EQ0lucC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24uc3VtREN1dCA9IEVkRmlzTnV0SGFuZGxlci52YWxpZGF0ZUV2UmVzdWx0TnVtKHN1bURDSW5wLCBwZXJzb24uc3VtREN1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0F1dG9GaWxsQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1Db2wgPSBFZEZpc051dEhhbmRsZXIuZ2V0TnVtQ29sKHN1bURDSW5wKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBudW1Db2wgPT09IFwibnVtYmVyXCIgJiYgbnVtQ29sID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0F1dG9GaWxsQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5UEdDID0gRWRGaXNOdXRIYW5kbGVyLnVwZGF0ZVBHQyhwZXJzb24sIG51bUNvbCwgXCJ0YWJcIiwgY29uc1RhYmxlc0ZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1BHQywgdGFyZ0lucFN1bURDdXQsIHRhcmdJbnBQR0NdID0gYXJyYXlQR0M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KFwiXFxuXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci50eXBlRXJyb3IoXCJvYnRlbmRvIE7Dum1lcm8gZGUgQ29sdW5hXCIsIG51bUNvbCA/PyBudWxsLCBcIm51bWJlciAobmF0dXJhbClcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKHN1bURDSW5wcyA/PyBudWxsLCBcInN1bURDSW5wc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQodGFyZ0lucFN1bURDdXQgPz8gbnVsbCwgXCJ0YXJnSW5wU3VtREN1dFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2xhc3NpZmljYSBwZXJzb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGVyc29uICYmIE9iamVjdC5rZXlzKHBlcnNvbikubGVuZ3RoID09PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbiA9IEdsb2JhbE1vZGVsLmdlbmVyYXRlUGVyc29uSW5zdGFuY2UocGVyc29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFBFUlNPTiBJTklDSUFMIElOU1RBTkNJQURBICR7SlNPTi5zdHJpbmdpZnkocGVyc29uKX0gKyBpbnN0YW5jZSAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn1gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLm9iamVjdEVycm9yKFwiYSBnZXJhw6fDo28gZGUgaW5zdMOibmNpYVwiLCBwZXJzb24gPz8gbnVsbCwgXCJwZXJzb25cIiwgXCI2XCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZGljaW9uYSBsaXN0ZW5lcmVzIG5vcyBib3TDtWVzIGUgaW5wdXRzIGRlIMOtbmRpY2VzIHRhYmVsYWRvcyBzZSBwZXJzb24gZm9yIGNsYXNzaWZpY2FkYVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgocGVyc29uIGluc3RhbmNlb2YgTWFuIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbiBpbnN0YW5jZW9mIFdvbWFuIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbiBpbnN0YW5jZW9mIE5ldXRybykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ29yZENvcnBMdmwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BlcnNvbkNsYXNzaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXV0b0ZpbGxCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0ZpbGxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0F1dG9GaWxsQWN0aXZlID0gRWRGaXNOdXRIYW5kbGVyLnN3aXRjaEF1dG9GaWxsKGF1dG9GaWxsQnRuLCBsb2Nrc1RhYkluZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoYXV0b0ZpbGxCdG4gPz8gbnVsbCwgXCJhdXRvRmlsbEJ0blwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9vYnRlbsOnw6NvIGRlIC5hdHZMdmwgaW5pY2lhbCwgY29tIGFkacOnw6NvIGRlIGxpc3RlbmVycyBwYXJhIG11ZGFuw6dhIGRlIGNvbnRhaW5lcnMgbm8gY29udGV4dG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF0dkx2bEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVRNQlR5cGVFbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5GYWN0b3JBdGxldGEgaW5zdGFuY2VvZiBIVE1MU3BhbkVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tHb3JkQ29ycEx2bCBpbnN0YW5jZW9mIEhUTUxTcGFuRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmF0dkx2bCA9IGF0dkx2bEVsZW1lbnQ/LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChwZXJzb24uYXR2THZsID09PSBcInNlZGVudGFyaW9cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5hdHZMdmwgPT09IFwibGV2ZVwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmF0dkx2bCA9PT0gXCJtb2RlcmFkb1wiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmF0dkx2bCA9PT0gXCJpbnRlbnNvXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24uYXR2THZsID09PSBcIm11aXRvSW50ZW5zb1wiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dkx2bEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hZlR5cGUgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY3RvckF0dkx2bCA9IDEuNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Jsb2NvcyBwYXJhIGFkacOnw6NvIGRlIGxpc3RlbmVycyBjb20gZmx1eG8gZGUgY2hhbWFkYSBzaW1pbGFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR2THZsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hanVzdGEgcGFyIGF0dkxldmVsRWxlbWVudCBlIG5hZlR5cGUgKyBkw6EgdXBkYXRlIGVtIC5hdEx2bFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24uYXR2THZsID0gRWRGaXNOdXRIYW5kbGVyLnVwZGF0ZUF0dkx2bChhdHZMdmxFbGVtZW50LCBwZXJzb24uYXR2THZsLCBuYWZUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXRvcm5hIGZhY3RvckF0dkx2bChuw7ptZXJvIHBhcmEgc2VyIHV0aWxpemFkbywgY29tIGJhc2Ugbm8gLmF0dkx2bClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuZWRGYWN0b3JBdHZMdmwgPSBwZXJzb24uY2hlY2tBdHZMdmwocGVyc29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5lZEZhY3RvckF0dkx2bCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjdG9yQXR2THZsID0gcmV0dXJuZWRGYWN0b3JBdHZMdmwgfHwgMS40O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcInJldHVybmVkRmFjdG9yQXR2THZsXCIsIHJldHVybmVkRmFjdG9yQXR2THZsID8/IG51bGwsIFwibnVtYmVyXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FqdXN0YSBlbGVtZW50b3MgPHNlbGVjdD4gY29tIGJhc2UgZW0gY29tYmluYcOnw7Vlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZEZpc051dEhhbmRsZXIuZmx1eEZvcm1JTUMoSU1DID8/IDAsIGZvcm1UTUJUeXBlRWxlbWVudCwgZ29yZENvcnBMdmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZEZpc051dEhhbmRsZXIubWF0Y2hUTUJFbGVtZW50cyhhdHZMdmxFbGVtZW50LCBmb3JtVE1CVHlwZUVsZW1lbnQsIHNwYW5GYWN0b3JBdGxldGEsIGdvcmRDb3JwTHZsLCBsb2NrR29yZENvcnBMdmwsIElNQyA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYWZUeXBlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24uYXR2THZsID0gRWRGaXNOdXRIYW5kbGVyLnVwZGF0ZUF0dkx2bChuYWZUeXBlLCBwZXJzb24uYXR2THZsLCBhdHZMdmxFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuZWRGYWN0b3JBdHZMdmwgPSBwZXJzb24uY2hlY2tBdHZMdmwocGVyc29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5lZEZhY3RvckF0dkx2bCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjdG9yQXR2THZsID0gcmV0dXJuZWRGYWN0b3JBdHZMdmwgfHwgMS40O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcInJldHVybmVkRmFjdG9yQXR2THZsXCIsIHJldHVybmVkRmFjdG9yQXR2THZsID8/IG51bGwsIFwibnVtYmVyXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZEZpc051dEhhbmRsZXIubWF0Y2hUTUJFbGVtZW50cyhuYWZUeXBlLCBmb3JtVE1CVHlwZUVsZW1lbnQsIHNwYW5GYWN0b3JBdGxldGEsIGdvcmRDb3JwTHZsLCBsb2NrR29yZENvcnBMdmwsIElNQyA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybVRNQlR5cGVFbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVRNQlR5cGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmF0dkx2bCA9IEVkRmlzTnV0SGFuZGxlci51cGRhdGVBdHZMdmwoYXR2THZsRWxlbWVudCwgcGVyc29uLmF0dkx2bCwgbmFmVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5lZEZhY3RvckF0dkx2bCA9IHBlcnNvbi5jaGVja0F0dkx2bChwZXJzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5lZEZhY3RvckF0dkx2bCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY3RvckF0dkx2bCA9IHJldHVybmVkRmFjdG9yQXR2THZsIHx8IDEuNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwicmV0dXJuZWRGYWN0b3JBdHZMdmxcIiwgcmV0dXJuZWRGYWN0b3JBdHZMdmwgfHwgdW5kZWZpbmVkLCBcIm51bWJlclwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZEZpc051dEhhbmRsZXIubWF0Y2hUTUJFbGVtZW50cyhhdHZMdmxFbGVtZW50LCBmb3JtVE1CVHlwZUVsZW1lbnQsIHNwYW5GYWN0b3JBdGxldGEsIGdvcmRDb3JwTHZsLCBsb2NrR29yZENvcnBMdmwsIElNQyA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKGZvcm1UTUJUeXBlRWxlbWVudCA/PyBudWxsLCBcImZvcm1UTUJUeXBlRWxlbWVudFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnb3JkQ29ycEx2bCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvcmRDb3JwTHZsLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmF0dkx2bCA9IEVkRmlzTnV0SGFuZGxlci51cGRhdGVBdHZMdmwoYXR2THZsRWxlbWVudCwgcGVyc29uLmF0dkx2bCwgbmFmVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5lZEZhY3RvckF0dkx2bCA9IHBlcnNvbi5jaGVja0F0dkx2bChwZXJzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5lZEZhY3RvckF0dkx2bCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY3RvckF0dkx2bCA9IHJldHVybmVkRmFjdG9yQXR2THZsIHx8IDEuNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwicmV0dXJuZWRGYWN0b3JBdHZMdmxcIiwgcmV0dXJuZWRGYWN0b3JBdHZMdmwgPz8gbnVsbCwgXCJudW1iZXJcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWRGaXNOdXRIYW5kbGVyLm1hdGNoVE1CRWxlbWVudHMoYXR2THZsRWxlbWVudCwgZm9ybVRNQlR5cGVFbGVtZW50LCBzcGFuRmFjdG9yQXRsZXRhLCBnb3JkQ29ycEx2bCwgbG9ja0dvcmRDb3JwTHZsLCBJTUMgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChnb3JkQ29ycEx2bCA/PyBudWxsLCBcImdvcmRDb3JwTHZsXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbEZhY3RvckF0bGV0YSBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbEZhY3RvckF0bGV0YS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY3RvckF0bGV0YSA9IHNlbEZhY3RvckF0bGV0YS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VtIGF1dG9maWxsLCBkw6EgdXBkYXRlIHNvbWVudGUgZW0gZmFjdG9yQXRsZXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNBdXRvRmlsbEFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5UEdDID0gRWRGaXNOdXRIYW5kbGVyLnVwZGF0ZVBHQyhwZXJzb24sIG51bUNvbnMsIFwiY29uc1wiLCBjb25zVGFibGVzRnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtQR0MsIHRhcmdJbnBTdW1EQ3V0LCB0YXJnSW5wUEdDXSA9IGFycmF5UEdDO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5zdW1EQ3V0ID0gRWRGaXNOdXRIYW5kbGVyLm1hdGNoUGVyc29uUHJvcGVydGllc0RDKHBlcnNvbiwgdGFyZ0lucFN1bURDdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5VGFyZ0lucHMgPSBFZEZpc051dEhhbmRsZXIuZGVmaW5lVGFyZ0lucHMobnVtQ29ucywgXCJjb25zXCIsIGNvbnNUYWJsZXNGcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wV2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wSU1DLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wTUxHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wVE1CLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wR0VULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gPSBhcnJheVRhcmdJbnBzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5V0ggPSBFZEZpc051dEhhbmRsZXIubWF0Y2hQZXJzb25Qcm9wZXJ0aWVzV0gocGVyc29uLCB0YXJnSW5wV2VpZ2h0LCB0YXJnSW5wSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGVyc29uLndlaWdodCwgcGVyc29uLmhlaWdodF0gPSBhcnJheVdIO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2VpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi53ZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZXNBcnJheSA9IEVkRmlzTnV0SGFuZGxlci51cGRhdGVJbmRleGVzQ29udGV4dHMocGVyc29uLCBnb3JkQ29ycEx2bCwgdGFyZ0lucElNQywgdGFyZ0lucE1MRywgdGFyZ0lucFRNQiwgdGFyZ0lucEdFVCwgZm9ybVRNQlR5cGVFbGVtZW50LCBmYWN0b3JBdHZMdmwsIGZhY3RvckF0bGV0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0lNQywgTUxHLCBUTUIsIEdFVF0gPSBpbmRleGVzQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChzZWxGYWN0b3JBdGxldGEgPz8gbnVsbCwgXCJzZWxGYWN0b3JBdGxldGFcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKHNsaWNlZEVycm9yID8/IFwiTlVMTFwiLCBgdmFsdWUgZGUgTsOtdmVsIGRlIEF0aXZpZGFkZSBGw61zaWNhIG91IEVsZW1lbnRvcyByZWxhY2lvbmFkb3MuIFZhbG9yIG9idGlkbzogJHtwZXJzb24uYXR2THZsID8/IFwibnVsbFwifTtcbiAgICAgICAgICAgICAgICAgICAgVmFsb3JlIGFjZWl0b3M6IHNlZGVudGFyaW8gfHwgbGV2ZSB8fCBtb2RlcmFkbyB8fCBpbnRlbnNvIHx8IG11aXRvSW50ZW5zby5gLCBhdHZMdmxFbGVtZW50ID8/IG51bGwsIG5hZlR5cGUgPz8gbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKHNsaWNlZEVycm9yID8/IFwiTlVMTFwiLCBgRXJybyB2YWxpZGFuZG8gRWxlbWVudG8gZGUgTsOtdmVsIGRlIEF0aXZpZGFkZSBGw61zaWNhIGUvb3UgUmVsYWNpb25hZG9zYCwgYXR2THZsRWxlbWVudCA/PyBudWxsLCBmb3JtVE1CVHlwZUVsZW1lbnQgPz8gbnVsbCwgc3BhbkZhY3RvckF0bGV0YSA/PyBudWxsLCBsb2NrR29yZENvcnBMdmwgPz8gbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hdHVhbGl6YSBsYXlvdXQgZGUgdGFiZWxhIGRlIGFjb3JkbyBjb20gcHJvdG9jb2xvIGUgZ8OqbmVybyArIHNvbWEgZGUgRG9icmFzIEN1dMOibmVhc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvdG9jb2xvICYmIHByb3RvY29sbyBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm90b2NvbG8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2xvLnZhbHVlID0gRWRGaXNOdXRNb2RlbC5jaGFuZ2VUYWJEQ3V0TGF5b3V0KHByb3RvY29sbywgdGFiREMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FkaWNpb25hIGxpc3RlbmVycyBwYXJhIG9zIGJvdMO1ZXMgZGUgc29tYSBkYXMgRG9icmFzIEN1dMOibmVhc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1bURDQnRucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtRENCdG5zLmZvckVhY2goKHN1bURDQnRuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bURDQnRuPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvd3NEQ0FycmF5Lmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1EQ0J0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLnN1bURDdXQgPSBFZEZpc051dEhhbmRsZXIuY3JlYXRlQXJyYXlzUmVscyhzdW1EQ0J0bj8uaWQsIHJvd3NEQ0FycmF5LCBwcm90b2NvbG8udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHR5cGVvZiBwZXJzb24uc3VtREN1dCA9PT0gXCJudW1iZXJcIikgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyLmlzTmFOKHBlcnNvbi5zdW1EQ3V0KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24uc3VtREN1dCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcInBlcnNvbi5zdW1EQ3V0XCIsIHBlcnNvbi5zdW1EQ3V0LCBcIm51bWJlclwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0F1dG9GaWxsQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1BlcnNvbkNsYXNzaWZpZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBQR0MgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm90b2NvbG8udmFsdWUgPT09IFwicG9sbG9jazNcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uLmFnZSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1Db2wgPSBFZEZpc051dEhhbmRsZXIuZ2V0TnVtQ29sKHN1bURDQnRuKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBudW1Db2wgPT09IFwibnVtYmVyXCIgJiYgbnVtQ29sID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5UEdDID0gRWRGaXNOdXRIYW5kbGVyLnVwZGF0ZVBHQyhwZXJzb24sIG51bUNvbCwgXCJ0YWJcIiwgY29uc1RhYmxlc0ZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwib2J0ZW5kbyBOw7ptZXJvIGRlIENvbHVuYVwiLCBudW1Db2wgPz8gbnVsbCwgXCJudW1iZXIgKG5hdHVyYWwpXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyBhdHVhbGl6YW5kbyBQR0MgYXRyYXbDqXMgZGUgU29tYXTDs3JpbyBkZSBEQ3MuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5hZ2Ugb2J0aWRvOiAke3BlcnNvbj8uYWdlIHx8IDB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFByb3RvY29sbyB1c2FkbzogJHtwcm90b2NvbG8/LnZhbHVlIHx8IFwibnVsbFwifSAoQXBlbmFzIHBvbGxvY2szIGFjZWl0bywgcG9yIGVucXVhbnRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQZXJzb25DbGFzc2lmaWVkOiAke2lzUGVyc29uQ2xhc3NpZmllZCA/PyBmYWxzZX07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIEluc3TDom5jaWEgZGUgSW5wdXQgVGFyZ2V0IHBhcmEgUEdDOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbCh0YXJnSW5wUEdDKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSkgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy50cmltKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnRXaXRoQXJyYXlFcnJvcihcInJvd3MgZGUgRG9icmFzIEN1dMOibmVhcyBlL291IEJvdMOjbyBkZSBTb21hIGRlIERvYnJhcyBDdXTDom5lYXNcIiwgcm93c0RDQXJyYXkgPz8gbnVsbCwgXCJyb3dzRENBcnJheVwiLCBzdW1EQ0J0biA/PyBudWxsLCBcInN1bURDQnRuXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoc3VtRENCdG5zID8/IG51bGwsIFwic3VtRENCdG5zXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQocHJvdG9jb2xvID8/IG51bGwsIFwicHJvdG9jb2xvXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FkacOnw7VlcyBkZSBsaXN0ZW5lcnMgcGFyYSBjbGlxdWUgbm9zIGJvdMO1ZXMgZG9zIMOtbmRpY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnSW5wSU1DIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucElNQy50eXBlID09PSBcIm51bWJlclwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wTUxHIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucE1MRy50eXBlID09PSBcIm51bWJlclwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wVE1CIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucFRNQi50eXBlID09PSBcIm51bWJlclwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wR0VUIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEdFVC50eXBlID09PSBcIm51bWJlclwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtVE1CVHlwZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSU1DID0gcGFyc2VGbG9hdChwYXJzZUZsb2F0KHRhcmdJbnBJTUM/LnZhbHVlIHx8IFwiMFwiKS50b0ZpeGVkKDQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1MRyA9IHBhcnNlRmxvYXQocGFyc2VGbG9hdCh0YXJnSW5wTUxHPy52YWx1ZSB8fCBcIjBcIikudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUTUIgPSBwYXJzZUZsb2F0KHBhcnNlRmxvYXQodGFyZ0lucFRNQj8udmFsdWUgfHwgXCIwXCIpLnRvRml4ZWQoNCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR0VUID0gcGFyc2VGbG9hdChwYXJzZUZsb2F0KHRhcmdJbnBHRVQ/LnZhbHVlIHx8IFwiMFwiKS50b0ZpeGVkKDQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYm90w7VlcyBzw6NvIGluZGVwZW5kZW50ZXMgZGUgY29uZGnDp8OjbyBkZSBhdXRvZmlsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKElNQ0J0bnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElNQ0J0bnMuZm9yRWFjaCgoaW1jYnRuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWNidG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1jYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtQ29sID0gRWRGaXNOdXRIYW5kbGVyLmdldE51bUNvbChpbWNidG4pID8/IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBudW1Db2wgPT09IFwibnVtYmVyXCIgJiYgbnVtQ29sID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzID0gRWRGaXNOdXRIYW5kbGVyLmRlZmluZVRhcmdJbnBzKG51bUNvbCwgXCJ0YWJcIiwgY29uc1RhYmxlc0ZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucFdlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wSU1DLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucE1MRyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBUTUIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wR0VULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdID0gYXJyYXlUYXJnSW5wcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlXSCA9IEVkRmlzTnV0SGFuZGxlci5tYXRjaFBlcnNvblByb3BlcnRpZXNXSChwZXJzb24sIHRhcmdJbnBXZWlnaHQsIHRhcmdJbnBIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGVyc29uLndlaWdodCwgcGVyc29uLmhlaWdodF0gPSBhcnJheVdIO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIndlaWdodCBjYXB0dXJhZG8gXCIgKyBwZXJzb24ud2VpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWlnaHQgY2FwdHVyYWRvIFwiICsgcGVyc29uLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZXNBcnJheSA9IEVkRmlzTnV0SGFuZGxlci51cGRhdGVJbmRleGVzQ29udGV4dHMocGVyc29uLCBnb3JkQ29ycEx2bCwgdGFyZ0lucElNQywgdGFyZ0lucE1MRywgdGFyZ0lucFRNQiwgdGFyZ0lucEdFVCwgZm9ybVRNQlR5cGVFbGVtZW50LCBmYWN0b3JBdHZMdmwsIGZhY3RvckF0bGV0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtJTUMsIE1MRywgVE1CLCBHRVRdID0gaW5kZXhlc0FycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy50cmltKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwib2J0ZW5kbyBOw7ptZXJvIGRlIENvbHVuYVwiLCBudW1Db2wgPz8gbnVsbCwgXCJudW1iZXIgKG5hdHVyYWwpXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KFwiXFxuXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy50cmltKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoaW1jYnRuID8/IG51bGwsIFwiaW1jYnRuXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKElNQ0J0bnMgPz8gbnVsbCwgXCJJTUNCdG5zXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNTEdCdG5zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNTEdCdG5zLmZvckVhY2goKG1sZ2J0bikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWxnYnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1sZ2J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bUNvbCA9IEVkRmlzTnV0SGFuZGxlci5nZXROdW1Db2wobWxnYnRuKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbnVtQ29sID09PSBcIm51bWJlclwiICYmIG51bUNvbCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlUYXJnSW5wcyA9IEVkRmlzTnV0SGFuZGxlci5kZWZpbmVUYXJnSW5wcyhudW1Db2wsIFwidGFiXCIsIGNvbnNUYWJsZXNGcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBXZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucElNQyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBNTEcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wVE1CLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEdFVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA9IGFycmF5VGFyZ0lucHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5V0ggPSBFZEZpc051dEhhbmRsZXIubWF0Y2hQZXJzb25Qcm9wZXJ0aWVzV0gocGVyc29uLCB0YXJnSW5wV2VpZ2h0LCB0YXJnSW5wSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHRdID0gYXJyYXlXSDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3ZWlnaHQgY2FwdHVyYWRvIFwiICsgcGVyc29uLndlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleGVzQXJyYXkgPSBFZEZpc051dEhhbmRsZXIudXBkYXRlSW5kZXhlc0NvbnRleHRzKHBlcnNvbiwgZ29yZENvcnBMdmwsIHRhcmdJbnBJTUMsIHRhcmdJbnBNTEcsIHRhcmdJbnBUTUIsIHRhcmdJbnBHRVQsIGZvcm1UTUJUeXBlRWxlbWVudCwgZmFjdG9yQXR2THZsLCBmYWN0b3JBdGxldGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbSU1DLCBNTEcsIFRNQiwgR0VUXSA9IGluZGV4ZXNBcnJheTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcIm9idGVuZG8gTsO6bWVybyBkZSBDb2x1bmFcIiwgbnVtQ29sID8/IG51bGwsIFwibnVtYmVyIChuYXR1cmFsKVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKG1sZ2J0biA/PyBudWxsLCBcIm1sZ2J0blwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChNTEdCdG5zID8/IG51bGwsIFwiTUxHQnRuc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUEdDQnRucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUEdDQnRucy5mb3JFYWNoKChwZ2NidG4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBnY2J0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZ2NidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1Db2wgPSBFZEZpc051dEhhbmRsZXIuZ2V0TnVtQ29sKHBnY2J0bikgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG51bUNvbCA9PT0gXCJudW1iZXJcIiAmJiBudW1Db2wgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5UEdDID0gRWRGaXNOdXRIYW5kbGVyLnVwZGF0ZVBHQyhwZXJzb24sIG51bUNvbCwgXCJ0YWJcIiwgY29uc1RhYmxlc0ZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1BHQywgdGFyZ0lucFN1bURDdXQsIHRhcmdJbnBQR0NdID0gYXJyYXlQR0M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5zdW1EQ3V0ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkRmlzTnV0SGFuZGxlci5tYXRjaFBlcnNvblByb3BlcnRpZXNEQyhwZXJzb24sIHRhcmdJbnBTdW1EQ3V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcIm9idGVuZG8gTsO6bWVybyBkZSBDb2x1bmFcIiwgbnVtQ29sID8/IG51bGwsIFwibnVtYmVyIChuYXR1cmFsKVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKHBnY2J0biA/PyBudWxsLCBcInBnY2J0blwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChQR0NCdG5zID8/IG51bGwsIFwiUEdDQnRuc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVE1CQnRucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVE1CQnRucy5mb3JFYWNoKCh0bWJidG4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1iYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG1iYnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklEIFwiICsgdG1iYnRuLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1Db2wgPSBFZEZpc051dEhhbmRsZXIuZ2V0TnVtQ29sKHRtYmJ0bikgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG51bUNvbCA9PT0gXCJudW1iZXJcIiAmJiBudW1Db2wgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5VGFyZ0lucHMgPSBFZEZpc051dEhhbmRsZXIuZGVmaW5lVGFyZ0lucHMobnVtQ29sLCBcInRhYlwiLCBjb25zVGFibGVzRnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wV2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBJTUMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wTUxHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucFRNQixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBHRVQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gPSBhcnJheVRhcmdJbnBzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVdIID0gRWRGaXNOdXRIYW5kbGVyLm1hdGNoUGVyc29uUHJvcGVydGllc1dIKHBlcnNvbiwgdGFyZ0lucFdlaWdodCwgdGFyZ0lucEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwZXJzb24ud2VpZ2h0LCBwZXJzb24uaGVpZ2h0XSA9IGFycmF5V0g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2VpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi53ZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlaWdodCBjYXB0dXJhZG8gXCIgKyBwZXJzb24uaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhlc0FycmF5ID0gRWRGaXNOdXRIYW5kbGVyLnVwZGF0ZUluZGV4ZXNDb250ZXh0cyhwZXJzb24sIGdvcmRDb3JwTHZsLCB0YXJnSW5wSU1DLCB0YXJnSW5wTUxHLCB0YXJnSW5wVE1CLCB0YXJnSW5wR0VULCBmb3JtVE1CVHlwZUVsZW1lbnQsIGZhY3RvckF0dkx2bCwgZmFjdG9yQXRsZXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0lNQywgTUxHLCBUTUIsIEdFVF0gPSBpbmRleGVzQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KFwiXFxuXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci50eXBlRXJyb3IoXCJvYnRlbmRvIE7Dum1lcm8gZGUgQ29sdW5hXCIsIG51bUNvbCA/PyBudWxsLCBcIm51bWJlciAobmF0dXJhbClcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKHRtYmJ0biA/PyBudWxsLCBcInRtYmJ0blwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKFRNQkJ0bnMgPz8gbnVsbCwgXCJUTUJCdG5zXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHRVRCdG5zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHRVRCdG5zLmZvckVhY2goKGdldGJ0bikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRidG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bUNvbCA9IEVkRmlzTnV0SGFuZGxlci5nZXROdW1Db2woZ2V0YnRuKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbnVtQ29sID09PSBcIm51bWJlclwiICYmIG51bUNvbCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlUYXJnSW5wcyA9IEVkRmlzTnV0SGFuZGxlci5kZWZpbmVUYXJnSW5wcyhudW1Db2wsIFwidGFiXCIsIGNvbnNUYWJsZXNGcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBXZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucElNQyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBNTEcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wVE1CLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEdFVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA9IGFycmF5VGFyZ0lucHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5V0ggPSBFZEZpc051dEhhbmRsZXIubWF0Y2hQZXJzb25Qcm9wZXJ0aWVzV0gocGVyc29uLCB0YXJnSW5wV2VpZ2h0LCB0YXJnSW5wSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHRdID0gYXJyYXlXSDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3ZWlnaHQgY2FwdHVyYWRvIFwiICsgcGVyc29uLndlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleGVzQXJyYXkgPSBFZEZpc051dEhhbmRsZXIudXBkYXRlSW5kZXhlc0NvbnRleHRzKHBlcnNvbiwgZ29yZENvcnBMdmwsIHRhcmdJbnBJTUMsIHRhcmdJbnBNTEcsIHRhcmdJbnBUTUIsIHRhcmdJbnBHRVQsIGZvcm1UTUJUeXBlRWxlbWVudCwgZmFjdG9yQXR2THZsLCBmYWN0b3JBdGxldGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbSU1DLCBNTEcsIFRNQiwgR0VUXSA9IGluZGV4ZXNBcnJheTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcIm9idGVuZG8gTsO6bWVybyBkZSBDb2x1bmFcIiwgbnVtQ29sID8/IG51bGwsIFwibnVtYmVyIChuYXR1cmFsKVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KFwiXFxuXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoZ2V0YnRuID8/IG51bGwsIFwiZ2V0YnRuXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoR0VUQnRucyA/PyBudWxsLCBcIkdFVEJ0bnNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hZGnDp8O1ZXMgZGUgbGlzdGVuZXJzIHBhcmEgaW5wdXRzIGRvcyDDrW5kaWNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBJTUMgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSU1DSW5wcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElNQ0lucHMuZm9yRWFjaCgoSU1DSW5wKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJTUNJbnAuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSU1DSW5wIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5lZElNQyA9IEdsb2JhbEhhbmRsZXIudXBkYXRlU2ltcGxlUHJvcGVydHkodGFyZ0lucElNQykgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5lZElNQyA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSU1DID0gcGFyc2VGbG9hdChyZXR1cm5lZElNQy50b0ZpeGVkKDQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KFwiXFxuXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy50cmltKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci50eXBlRXJyb3IoXCJ1cGRhdGUgZGUgSU1DXCIsIHJldHVybmVkSU1DID8/IG51bGwsIFwibnVtYmVyXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlbSBhdXRvZmlsbCwgZMOhIHVwZGF0ZSBzb21lbnRlIGVtIElNQ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNBdXRvRmlsbEFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtQ29sID0gRWRGaXNOdXRIYW5kbGVyLmdldE51bUNvbChJTUNJbnApID8/IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG51bUNvbCA9PT0gXCJudW1iZXJcIiAmJiBudW1Db2wgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlUYXJnSW5wcyA9IEVkRmlzTnV0SGFuZGxlci5kZWZpbmVUYXJnSW5wcyhudW1Db2wsIFwidGFiXCIsIGNvbnNUYWJsZXNGcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wV2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wSU1DLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wTUxHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wVE1CLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wR0VULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gPSBhcnJheVRhcmdJbnBzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5V0ggPSBFZEZpc051dEhhbmRsZXIubWF0Y2hQZXJzb25Qcm9wZXJ0aWVzV0gocGVyc29uLCB0YXJnSW5wV2VpZ2h0LCB0YXJnSW5wSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGVyc29uLndlaWdodCwgcGVyc29uLmhlaWdodF0gPSBhcnJheVdIO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2VpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi53ZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ZXNBcnJheSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkRmlzTnV0SGFuZGxlci51cGRhdGVJbmRleGVzQ29udGV4dHMocGVyc29uLCBnb3JkQ29ycEx2bCwgdGFyZ0lucElNQywgdGFyZ0lucE1MRywgdGFyZ0lucFRNQiwgdGFyZ0lucEdFVCwgZm9ybVRNQlR5cGVFbGVtZW50LCBmYWN0b3JBdHZMdmwsIGZhY3RvckF0bGV0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0lNQywgTUxHLCBUTUIsIEdFVF0gPSBpbmRleGVzQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy50cmltKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcIm9idGVuZG8gTsO6bWVybyBkZSBDb2x1bmFcIiwgbnVtQ29sID8/IG51bGwsIFwibnVtYmVyIChuYXR1cmFsKVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoSU1DSW5wPy5pZCA/PyBudWxsLCBcIklNQ0lucFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoSU1DSW5wcyA/PyBudWxsLCBcIklNQ0lucHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwiSU1DXCIsIElNQyA/PyBudWxsLCBcIm51bWJlclwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1MRyA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNTEdJbnBzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTUxHSW5wcy5mb3JFYWNoKChNTEdJbnApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1MR0lucC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJldHVybmVkTUxHID0gR2xvYmFsSGFuZGxlci51cGRhdGVTaW1wbGVQcm9wZXJ0eSh0YXJnSW5wTUxHKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuZWRNTEcgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTUxHID0gcGFyc2VGbG9hdChyZXR1cm5lZE1MRy50b0ZpeGVkKDQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcInVwZGF0ZSBkZSBNTEdcIiwgcmV0dXJuZWRNTEcgPz8gbnVsbCwgXCJudW1iZXJcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlbSBhdXRvZmlsbCwgZMOhIHVwZGF0ZSBzb21lbnRlIGVtIE1MR1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0F1dG9GaWxsQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bUNvbCA9IEVkRmlzTnV0SGFuZGxlci5nZXROdW1Db2woTUxHSW5wKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG51bUNvbCA9PT0gXCJudW1iZXJcIiAmJiBudW1Db2wgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzID0gRWRGaXNOdXRIYW5kbGVyLmRlZmluZVRhcmdJbnBzKG51bUNvbCwgXCJ0YWJcIiwgY29uc1RhYmxlc0ZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wV2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucElNQyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnSW5wTUxHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBUTUIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEdFVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gPSBhcnJheVRhcmdJbnBzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlXSCA9IEVkRmlzTnV0SGFuZGxlci5tYXRjaFBlcnNvblByb3BlcnRpZXNXSChwZXJzb24sIHRhcmdJbnBXZWlnaHQsIHRhcmdJbnBIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHRdID0gYXJyYXlXSDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2VpZ2h0IGNhcHR1cmFkbyBcIiArIHBlcnNvbi53ZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWlnaHQgY2FwdHVyYWRvIFwiICsgcGVyc29uLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleGVzQXJyYXkgPSBFZEZpc051dEhhbmRsZXIudXBkYXRlSW5kZXhlc0NvbnRleHRzKHBlcnNvbiwgZ29yZENvcnBMdmwsIHRhcmdJbnBJTUMsIHRhcmdJbnBNTEcsIHRhcmdJbnBUTUIsIHRhcmdJbnBHRVQsIGZvcm1UTUJUeXBlRWxlbWVudCwgZmFjdG9yQXR2THZsLCBmYWN0b3JBdGxldGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0lNQywgTUxHLCBUTUIsIEdFVF0gPSBpbmRleGVzQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwib2J0ZW5kbyBOw7ptZXJvIGRlIENvbHVuYVwiLCBudW1Db2wgPz8gbnVsbCwgXCJudW1iZXIgKG5hdHVyYWwpXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKE1MR0lucHMgPz8gbnVsbCwgXCJNTEdJbnBzXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcIk1MR1wiLCBNTEcgPz8gbnVsbCwgXCJudW1iZXJcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdJbnBQR0MgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucFBHQy50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUEdDID0gcGFyc2VGbG9hdChwYXJzZUZsb2F0KHRhcmdJbnBQR0M/LnZhbHVlIHx8IFwiMFwiKS50b0ZpeGVkKDQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFBHQyA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUEdDSW5wcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQR0NJbnBzLmZvckVhY2goKFBHQ0lucCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQR0NJbnAgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBHQ0lucC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuZWRQR0MgPSBHbG9iYWxIYW5kbGVyLnVwZGF0ZVNpbXBsZVByb3BlcnR5KFBHQ0lucCkgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuZWRQR0MgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQR0MgPSBwYXJzZUZsb2F0KHJldHVybmVkUEdDLnRvRml4ZWQoNCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KFwiXFxuXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci50eXBlRXJyb3IoXCJ1cGRhdGUgZGUgUEdDXCIsIHJldHVybmVkUEdDID8/IG51bGwsIFwibnVtYmVyXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KFwiXFxuXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKFBHQ0lucD8uaWQgPz8gbnVsbCwgXCJQR0NJbnBcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoUEdDSW5wcyA/PyBudWxsLCBcIlBHQ0lucHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwiUEdDXCIsIFBHQyA/PyBudWxsLCBcIm51bWJlclwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhcmdJbnBQR0MgPz8gbnVsbCwgXCJ0YXJnSW5wUEdDXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVE1CID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFRNQklucHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUTUJJbnBzLmZvckVhY2goKFRNQklucCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVE1CSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFRNQklucCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuZWRUTUIgPSBHbG9iYWxIYW5kbGVyLnVwZGF0ZVNpbXBsZVByb3BlcnR5KHRhcmdJbnBUTUIpID8/IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuZWRUTUIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRNQiA9IHBhcnNlRmxvYXQocmV0dXJuZWRUTUIudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwidXBkYXRlIGRlIFRNQlwiLCByZXR1cm5lZFRNQiA/PyBudWxsLCBcIm51bWJlclwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZW0gYXV0b2ZpbGwsIGTDoSB1cGRhdGUgc29tZW50ZSBlbSBUTUJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXV0b0ZpbGxBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bUNvbCA9IEVkRmlzTnV0SGFuZGxlci5nZXROdW1Db2woVE1CSW5wKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBudW1Db2wgPT09IFwibnVtYmVyXCIgJiYgbnVtQ29sID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5VGFyZ0lucHMgPSBFZEZpc051dEhhbmRsZXIuZGVmaW5lVGFyZ0lucHMobnVtQ29sLCBcInRhYlwiLCBjb25zVGFibGVzRnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucFdlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucElNQyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucE1MRyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucFRNQixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ0lucEdFVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdID0gYXJyYXlUYXJnSW5wcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVdIID0gRWRGaXNOdXRIYW5kbGVyLm1hdGNoUGVyc29uUHJvcGVydGllc1dIKHBlcnNvbiwgdGFyZ0lucFdlaWdodCwgdGFyZ0lucEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHRdID0gYXJyYXlXSDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIndlaWdodCBjYXB0dXJhZG8gXCIgKyBwZXJzb24ud2VpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlaWdodCBjYXB0dXJhZG8gXCIgKyBwZXJzb24uaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleGVzQXJyYXkgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZEZpc051dEhhbmRsZXIudXBkYXRlSW5kZXhlc0NvbnRleHRzKHBlcnNvbiwgZ29yZENvcnBMdmwsIHRhcmdJbnBJTUMsIHRhcmdJbnBNTEcsIHRhcmdJbnBUTUIsIHRhcmdJbnBHRVQsIGZvcm1UTUJUeXBlRWxlbWVudCwgZmFjdG9yQXR2THZsLCBmYWN0b3JBdGxldGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtJTUMsIE1MRywgVE1CLCBHRVRdID0gaW5kZXhlc0FycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KFwiXFxuXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8udHJpbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci50eXBlRXJyb3IoXCJvYnRlbmRvIE7Dum1lcm8gZGUgQ29sdW5hXCIsIG51bUNvbCA/PyBudWxsLCBcIm51bWJlciAobmF0dXJhbClcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KFwiXFxuXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoVE1CSW5wPy5pZCA/PyBudWxsLCBcIlRNQklucFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoVE1CSW5wcyA/PyBudWxsLCBcIlRNQklucHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwiVE1CXCIsIFRNQiA/PyBudWxsLCBcIm51bWJlclwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIEdFVCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHRVRJbnBzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR0VUSW5wcy5mb3JFYWNoKChHRVRJbnApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdFVElucC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHRVRJbnAgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJldHVybmVkR0VUID0gR2xvYmFsSGFuZGxlci51cGRhdGVTaW1wbGVQcm9wZXJ0eSh0YXJnSW5wR0VUKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybmVkR0VUID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHRVQgPSBwYXJzZUZsb2F0KHJldHVybmVkR0VULnRvRml4ZWQoNCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc3BsaXQoXCJcXG5cIilbMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihcInVwZGF0ZSBkZSBHRVRcIiwgcmV0dXJuZWRHRVQgPz8gbnVsbCwgXCJudW1iZXJcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VtIGF1dG9maWxsLCBkw6EgdXBkYXRlIHNvbWVudGUgZW0gR0VUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0F1dG9GaWxsQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1Db2wgPSBFZEZpc051dEhhbmRsZXIuZ2V0TnVtQ29sKEdFVElucCkgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbnVtQ29sID09PSBcIm51bWJlclwiICYmIG51bUNvbCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheVRhcmdJbnBzID0gRWRGaXNOdXRIYW5kbGVyLmRlZmluZVRhcmdJbnBzKG51bUNvbCwgXCJ0YWJcIiwgY29uc1RhYmxlc0ZzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBXZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBJTUMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBNTEcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBUTUIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdJbnBHRVQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSA9IGFycmF5VGFyZ0lucHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlXSCA9IEVkRmlzTnV0SGFuZGxlci5tYXRjaFBlcnNvblByb3BlcnRpZXNXSChwZXJzb24sIHRhcmdJbnBXZWlnaHQsIHRhcmdJbnBIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwZXJzb24ud2VpZ2h0LCBwZXJzb24uaGVpZ2h0XSA9IGFycmF5V0g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3ZWlnaHQgY2FwdHVyYWRvIFwiICsgcGVyc29uLndlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWlnaHQgY2FwdHVyYWRvIFwiICsgcGVyc29uLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhlc0FycmF5ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWRGaXNOdXRIYW5kbGVyLnVwZGF0ZUluZGV4ZXNDb250ZXh0cyhwZXJzb24sIGdvcmRDb3JwTHZsLCB0YXJnSW5wSU1DLCB0YXJnSW5wTUxHLCB0YXJnSW5wVE1CLCB0YXJnSW5wR0VULCBmb3JtVE1CVHlwZUVsZW1lbnQsIGZhY3RvckF0dkx2bCwgZmFjdG9yQXRsZXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbSU1DLCBNTEcsIFRNQiwgR0VUXSA9IGluZGV4ZXNBcnJheTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwib2J0ZW5kbyBOw7ptZXJvIGRlIENvbHVuYVwiLCBudW1Db2wgPz8gbnVsbCwgXCJudW1iZXIgKG5hdHVyYWwpXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5zcGxpdChcIlxcblwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy50cmltKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChHRVRJbnA/LmlkID8/IG51bGwsIFwiR0VUSW5wXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChHRVRJbnBzID8/IG51bGwsIFwiR0VUSW5wc1wiLCBzbGljZWRFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci50eXBlRXJyb3IoXCJHRVRcIiwgR0VUID8/IG51bGwsIFwibnVtYmVyXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIsIFwiVGFyZ2V0IElucHV0cyBlL291IFNlbGVjdCBwYXJhIEbDs3JtdWxhIGRlIFRNQlwiLCB0YXJnSW5wSU1DID8/IG51bGwsIHRhcmdJbnBNTEcgPz8gbnVsbCwgdGFyZ0lucFRNQiA/PyBudWxsLCB0YXJnSW5wR0VUID8/IG51bGwsIGZvcm1UTUJUeXBlRWxlbWVudCA/PyBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudFdpdGhPYmplY3RFcnJvcihcInZhbGlkYW5kbyBwZXJzb25cIiwgcGVyc29uID8/IG51bGwsIGdvcmRDb3JwTHZsID8/IG51bGwsIGdvcmRDb3JwTHZsPy5pZCA/PyBudWxsLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBUb2RvcyBvcyBjYW1wb3MgZGUgaWRlbnRpZGFkZSBkZSBnw6puZXJvIHZhbGlkYWRvczogJHthcmVBbGxHZW5Db250Q2hlY2tlZC50b1N0cmluZygpID8/IFwiZmFsc2VcIn1gKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChzbGljZWRFcnJvciA/PyBcIk5VTExcIiwgXCJDYW1wb3MgZGUgR8OqbmVybyBlL291IFRpcG8gQ29ycG9yYWwgZS9vdSBQcm90b2NvbG9cIiwgcHJvdG9jb2xvID8/IG51bGwsIGdlbkVsZW1lbnQgPz8gbnVsbCwgZ2VuVHJhbnMgPz8gbnVsbCwgZ2VuRmlzQWxpbiA/PyBudWxsLCB0ZXh0Qm9keXR5cGUgPz8gbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ29sIEdyb3VwcyBzaW1pbGFyZXM6ICR7YXJlQ29sR3JvdXBzU2ltaWxhcn1gKTtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKG51bUNvbnNFbGVtZW50ID8/IG51bGwsIFwibnVtQ29uc0VsZW1lbnRcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKGdvcmRDb3JwTHZsID8/IG51bGwsIFwibnVtQ29uc0VsZW1lbnRcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKHNsaWNlZEVycm9yID8/IFwiTlVMTFwiLCBcIlRhYmVsYXMgZGUgTWVkaWRhcyBBbnRyb3BvbcOpdHJpY2FzXCIsIHRhYlNWaSA/PyBudWxsLCB0YWJNZWRBbnQgPz8gbnVsbCwgdGFiSW5kUGVyYyA/PyBudWxsKTtcclxuICAgIH1cclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIsIFwiVGFiZWxhcyBkZSBNZWRpZGFzXCIsIHRhYk1lZEFudCA/PyBudWxsLCB0YWJJbmRQZXJjID8/IG51bGwpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==