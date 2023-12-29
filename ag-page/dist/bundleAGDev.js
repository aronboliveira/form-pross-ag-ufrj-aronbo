/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/aGHandlers.tsx":
/*!****************************!*\
  !*** ./src/aGHandlers.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAntMedHandler: () => (/* binding */ addAntMedHandler),
/* harmony export */   enableCEPBtn: () => (/* binding */ enableCEPBtn),
/* harmony export */   searchCEP: () => (/* binding */ searchCEP)
/* harmony export */ });
/* harmony import */ var _glSrc_gModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @glSrc/gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @glSrc/gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @glSrc/errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout



let blockCount = 1;
function searchCEP(cepElement) {
    const cepValue = cepElement?.value ?? null;
    let initTime = Date.now();
    let reqAcc = 2;
    if (cepElement && cepElement instanceof HTMLInputElement) {
        const progInts = displayCEPLoadBar(cepElement) ?? [0, 100, null];
        const progMax = progInts[0];
        const progValue = progInts[1];
        const progBar = progInts[2];
        const cepHifenOutValue = cepValue?.replaceAll("-", "");
        const urlBAPI1 = `https://brasilapi.com.br/api/cep/v2/${cepHifenOutValue}`;
        const xmlReq1 = new XMLHttpRequest();
        if (urlBAPI1) {
            xmlReq1.open("GET", urlBAPI1);
            xmlReq1.send();
            xmlReq1.onload = () => {
                const xmlReturn1 = loadCEP(xmlReq1, reqAcc);
                if (xmlReturn1 === 200) {
                    console.log(`Primeira solicitação XML/HTTP feita com sucesso.`);
                    if (progBar && progMax) {
                        uploadCEPLoadBar(cepElement, initTime, progMax, progValue, progBar);
                    }
                }
                else {
                    console.warn(`Falha na primeira XML/HTTP Request. Iniciando segunda solicitação.`);
                    reqAcc--;
                    initTime = Date.now();
                    const urlBAPI2 = `https://brasilapi.com.br/api/cep/v1/${cepHifenOutValue}`;
                    const xmlReq2 = new XMLHttpRequest();
                    if (urlBAPI2) {
                        xmlReq2.open("GET", urlBAPI2);
                        xmlReq2.send();
                        xmlReq2.onload = () => {
                            const xmlReturn2 = loadCEP(xmlReq2, reqAcc);
                            if (xmlReturn2 === 200) {
                                console.log(`Segunda solicitação XML/HTTP feita com sucesso.`);
                                if (progBar && progMax) {
                                    uploadCEPLoadBar(cepElement, initTime, progMax, progValue, progBar);
                                }
                            }
                            else {
                                console.error(`Falha na segunda XML/HTTP Request. Procedimento cancelado. Insira Manualmente.`);
                                if (progBar && progMax) {
                                    uploadCEPLoadBar(cepElement, initTime, progMax, progValue, progBar);
                                }
                            }
                        };
                    }
                    else {
                        console.error(`Erro concantenando segunda URL com CEP.`);
                    }
                }
            };
        }
        else {
            console.error(`Erro concatenando primeira URL com CEP.`);
        }
    }
    else {
        console.error(`Erro verificando input de CEP. Elemento: ${cepElement}; Instância ${Object.prototype.toString
            .call(cepElement)
            .slice(8, -1)}; Valor do elemento obtido: ${cepValue}`);
    }
}
function loadCEP(xmlReq, reqAcc) {
    let status;
    try {
        if (xmlReq.status === 200) {
            const parsedAddress = JSON.parse(xmlReq.response);
            if (parsedAddress) {
                const uf = document.getElementById("UFId");
                const city = document.getElementById("cityId");
                const neighborhood = document.getElementById("neighbourhoodId");
                const street = document.getElementById("streetId");
                if (uf instanceof HTMLInputElement) {
                    uf.value = parsedAddress.state;
                }
                if (city instanceof HTMLInputElement) {
                    city.value = parsedAddress.city;
                }
                if (neighborhood instanceof HTMLInputElement) {
                    neighborhood.value = parsedAddress.neighborhood;
                }
                if (street instanceof HTMLInputElement) {
                    street.value = parsedAddress.street;
                }
                status = 200;
            }
        }
        else if (xmlReq.status === 404) {
            throw new Error("404");
        }
        else {
            throw new Error("Não reconhecido");
        }
    }
    catch (loadError) {
        console.warn(`Status de Erro para CEPV${reqAcc}: `, loadError.message);
        status = 404;
    }
    return status;
}
function displayCEPLoadBar(cepElement) {
    let progMaxInt;
    let progValueInt;
    const progressBar = document.createElement("progress");
    cepElement.parentElement?.insertBefore(progressBar, cepElement.nextElementSibling?.nextElementSibling ?? null);
    if (progressBar && cepElement.nextElementSibling?.nextElementSibling) {
        progressBar.id = "loadBarCepVars";
        progressBar.max = 100;
        progMaxInt = progressBar.max;
        progressBar.value = 0;
        progValueInt = progressBar.value;
        progressBar.style.setProperty("background-color", "blue");
        progressBar.style.setProperty("color", "white");
        return [progMaxInt, progValueInt, progressBar];
    }
}
function uploadCEPLoadBar(cepElement, initTime, progMaxInt, progValueInt, progressBar) {
    const finishTime = Date.now();
    const elapsedTime = finishTime - initTime;
    const elapsedNDec = elapsedTime.toString().length - 1;
    let addedZerosMult = "1";
    for (let iD = 0; iD < elapsedNDec; iD++) {
        addedZerosMult += "0";
    }
    const indNDec = 1 * parseInt(addedZerosMult);
    const roundedElapsed = Math.round(elapsedTime / indNDec) * indNDec;
    if (progValueInt !== progMaxInt) {
        const loadingEvent = setInterval(() => {
            progValueInt += 5;
            progressBar.value = progValueInt;
            if (progValueInt === progMaxInt) {
                clearInterval(loadingEvent);
            }
        }, roundedElapsed / 20);
    }
    setTimeout(() => {
        cepElement.parentElement?.removeChild(progressBar);
    }, roundedElapsed);
}
function enableCEPBtn(cepLength, cepBtn) {
    let isCepElemenBtnOff = true;
    if (cepLength === 9) {
        cepBtn.removeAttribute("disabled");
        isCepElemenBtnOff = false;
    }
    else {
        cepBtn.setAttribute("disabled", "");
    }
    return isCepElemenBtnOff;
}
function addAntMedHandler(click) {
    if (click.target instanceof HTMLButtonElement &&
        click.target.tagName === "BUTTON" &&
        click.target.classList.contains("addAntMed")) {
        blockCount++; // Incrementa o número de blocos
        const antMedContainer = document.getElementById("antMedContainer");
        // Cria um novo conjunto de elementos HTML
        const newBlock = document.createElement("div");
        newBlock.className = "contTerc antMedBlock";
        newBlock.id = `antMedBlock${blockCount}`;
        newBlock.innerHTML = `
    <span class="contQuat divAntMedSpan spanMain" id="antMedSpanInp${blockCount}">
      <span class="contQuint divAntMedSubSpan spanSub" id="antMedSpanNum${blockCount}">${blockCount}&#41;</span>
      <label for="antMedId${blockCount}" class="antMedLabel"></label>
      <input type="text" name="antMedName${blockCount}" id="antMedId${blockCount}" class="inpAntMed" />
    </span>
    <span class="contQuat divAntMedSpan spanMain" id="antMedSpanMainDate${blockCount}">
      <span class="contQuint divAntMedSubSpan spanSub" id="antMedSpanSubDate${blockCount}">
        <input type="date" name="antMedDateIniName${blockCount}" id="antMedDateIniId${blockCount}" class="inpDate antMedDate inpAntMed"/> até
        <input type="date" name="antMedDateEndName${blockCount}" id="antMedDateEndId${blockCount}" class="inpDate antMedDate inpAntMed" />
        <label for="antMedDateEndId${blockCount}" for="antMedDateEndId1"></label>
        <button
        type="button"
        class="contQuint datBtn atualTratBtn"
        id="atualTrat${blockCount}DatBtn"
      >
        Usar data atual
        <button type="button" name="addAntMedName${blockCount}" id="addAntMedId${blockCount}" class="addAntMed countAntMed"
        value="addAntMed">+</button>
        <button type="button" name="removeAntMedName${blockCount}" id="removeAntMedId${blockCount}"
        class="removeAntMed countAntMed" value="removeAntMed">-</button>
      </span>
    </span>
  `;
        // Adiciona o novo bloco ao contêiner
        antMedContainer?.appendChild(newBlock);
        const dateBtns = newBlock.querySelectorAll('button[id$="DatBtn"]');
        const textElements = newBlock.querySelectorAll('input[type="text"]');
        for (let iT = 0; iT < textElements.length; iT++) {
            textElements[iT].addEventListener("input", () => _glSrc_gModel__WEBPACK_IMPORTED_MODULE_0__.autoCapitalizeInputs(textElements[iT]));
        }
        for (let iB = 0; iB < dateBtns.length; iB++) {
            dateBtns[iB].addEventListener("click", (activation) => _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_1__.useCurrentDate(activation, dateBtns[iB]));
        }
    }
    else if (click.target instanceof HTMLButtonElement &&
        click.target.tagName === "BUTTON" &&
        click.target.classList.contains("removeAntMed")) {
        const divToRemove = click.target.closest(".antMedBlock");
        if (divToRemove && blockCount !== 1 && divToRemove.id !== "antMedBlock1") {
            divToRemove.remove();
            blockCount -= 1;
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(click.target ?? null, `${click.target.id ?? "UNDEFINED BUTTON ID"}`, slicedError ?? "NULL");
    }
}


/***/ }),

/***/ "./src/aGModel.tsx":
/*!*************************!*\
  !*** ./src/aGModel.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDblQuotes: () => (/* binding */ addDblQuotes),
/* harmony export */   addEmailExtension: () => (/* binding */ addEmailExtension),
/* harmony export */   formatCEP: () => (/* binding */ formatCEP),
/* harmony export */   formatTel: () => (/* binding */ formatTel)
/* harmony export */ });
/* harmony import */ var _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @glSrc/errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização

function formatTel(inputTelElement) {
    const telText = inputTelElement.value;
    const regex = /\d+/g;
    const formattedTel = telText.replace(/[^0-9]/g, "");
    const numOnly = formattedTel.replace(regex, (matchTel) => {
        if (matchTel.length === 9) {
            if (matchTel[0] === "9") {
                return `${matchTel.slice(0, 5)}-${matchTel.slice(5, 9)}`;
            }
            else {
                return `${matchTel.slice(0, 4)}-${matchTel.slice(4, 8)}`;
            }
        }
        else if (matchTel.length > 9) {
            return `${matchTel.slice(0, 8)}`;
        }
        return matchTel;
    });
    inputTelElement.value = numOnly;
}
function addEmailExtension(container) {
    if (container instanceof HTMLInputElement || HTMLTextAreaElement) {
        if (container.value === "") {
            container.value = "@.";
            container.setSelectionRange(0, 0);
        }
        else if (container.value === "@") {
            container.value += "@.";
            container.setSelectionRange(0, 0);
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_0__.inputNotFound(container ?? null, `${container?.id ?? "UNDEFINED ID EMAIL CONTAINER"}`, slicedError ?? "NULL");
    }
}
function formatCEP(inputCEPElement) {
    const CEPText = inputCEPElement.value;
    const noHifenCEPRegex = /[0-9]{5,}[^-][0-9]{1,3}/;
    inputCEPElement.value.replaceAll(/[^0-9]/g, "");
    if (CEPText.length >= 5 && CEPText.match(noHifenCEPRegex)) {
        const hifenText = `${CEPText.slice(0, 5)}-${CEPText.slice(5, 9)}`;
        inputCEPElement.value = hifenText;
    }
}
function addDblQuotes(container) {
    if (container instanceof HTMLInputElement ||
        HTMLTextAreaElement) {
        if (container.value === "") {
            container.value = '""';
            container.setSelectionRange(1, 1);
        }
        else if (container.value === '"') {
            container.value += '"';
            container.setSelectionRange(1, 1);
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_0__.inputNotFound(container ?? null, `${container?.id ?? "UNDEFINED ID QUOTED CONTAINER"}`, slicedError ?? "NULL");
    }
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
/*!******************************!*\
  !*** ./src/aGController.tsx ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _aGHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aGHandlers */ "./src/aGHandlers.tsx");
/* harmony import */ var _aGModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aGModel */ "./src/aGModel.tsx");
/* harmony import */ var _glSrc_gModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @glSrc/gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @glSrc/gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @glSrc/errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM





//inicialização de constantes percorrendo o DOM
const inputs = document.querySelectorAll("input");
const textInputs = document.querySelectorAll('input[type="text"]');
const textareas = document.querySelectorAll("textarea");
const textConts = [...textareas, ...textInputs];
const numInps = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const selects = document.querySelectorAll("select");
// const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const gen = document.getElementById("genId");
const genBirthRel = document.getElementById("genBirthRelId");
const genTrans = document.getElementById("genTransId");
const genFisAlin = document.getElementById("genFisAlinId");
const antFamChecks = document.querySelectorAll("input[id^='antFam']");
const antMedContainer = document.getElementById("antMedContainer");
const telInputs = document.querySelectorAll('input[type="text"][id^="tel"]');
const emailInputs = document.querySelectorAll('input[id^="email"]');
const cepElement = document.getElementById("cepId");
const cepElementBtn = document.getElementById("autoCompCepBtn");
const qxPrinc = document.getElementById("qxPrinc");
const editableCite = document.querySelector('cite[contenteditable="true"]');
const astDigtBtns = document.querySelectorAll('button[id$="AstDigtBtn');
const deactAutocorrectBtns = document.querySelectorAll('button[id^="deactAutocorrectBtn"]');
const dateBtns = document.querySelectorAll('button[id$="DatBtn"]');
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");
const allInputs = Array.from([
    ...inputs,
    ...textareas,
    ...selects,
    editableCite,
]).flat(1);
const JSONBtn = document.getElementById("btnJSON");
let JSONLink;
// let shouldRegenerateBtn = false;
//validação de constantes obtidas e aplicação de listeners/callbacks
if (JSONBtn instanceof HTMLButtonElement && allInputs.length > 0) {
    let formDescription = [];
    JSONBtn.addEventListener("click", () => {
        formDescription = _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.getJSONDesc(allInputs);
        const JSONInpsStoreStringified = (formDescription &&
            formDescription[1]) ?? [""];
        if (formDescription &&
            formDescription.length === 4 &&
            !formDescription.some((formDescElement) => formDescElement === null)) {
            JSONLink = _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.createJSONAnchor(JSONBtn, JSONInpsStoreStringified);
            if (JSONLink) {
                JSONLink.addEventListener("click", () => {
                    _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.regenerateJSONBtn(JSONLink, JSONInpsStoreStringified);
                });
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(JSONLink ?? null, "JSONLink", slicedError ?? "NULL");
            }
        }
        else {
            console.warn(`Erro obtendo formDescription`);
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(JSONBtn ?? null, "JSONBtn", slicedError ?? "NULL");
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(allInputs ?? null, "allInputs", slicedError ?? "NULL");
}
if (textConts.length > 0) {
    textConts.forEach(function (textCont) {
        const isTelInput = textCont.classList.contains("inpTel");
        const isEmailInput = textCont.classList.contains("inpEmail");
        if (!isTelInput && !isEmailInput && !(textCont.id === "cepId")) {
            textCont.addEventListener("input", function (input) {
                if (input.target &&
                    (input.target instanceof HTMLTextAreaElement ||
                        input.target instanceof HTMLInputElement)) {
                    _glSrc_gModel__WEBPACK_IMPORTED_MODULE_2__.autoCapitalizeInputs(input.target);
                }
                else {
                    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(input.target ?? null, "target textCont", slicedError ?? "NULL");
                }
            });
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(textConts ?? null, "textConts", slicedError ?? "NULL");
}
if (numInps.length > 0) {
    numInps.forEach(function (numInp) {
        numInp.addEventListener("input", function (input) {
            if (input.target && input.target instanceof HTMLInputElement) {
                _glSrc_gModel__WEBPACK_IMPORTED_MODULE_2__.numberLimit(input.target);
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(input.target ?? null, "target numInp", slicedError ?? "NULL");
            }
        });
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(numInps ?? null, "numInps", slicedError ?? "NULL");
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
const areAllGenContChecked = checkAllGenConts(gen, genBirthRel, genTrans, genFisAlin);
let genValue = gen?.value ?? null;
if (areAllGenContChecked && typeof genValue === "string") {
    gen.addEventListener("change", () => {
        genValue = _glSrc_gModel__WEBPACK_IMPORTED_MODULE_2__.fluxGen(gen, gen.value ?? null, genBirthRel, genTrans, genFisAlin);
    });
    genBirthRel.addEventListener("change", () => {
        genValue = _glSrc_gModel__WEBPACK_IMPORTED_MODULE_2__.fluxGen(gen, gen.value ?? null, genBirthRel, genTrans, genFisAlin);
    });
    genTrans.addEventListener("change", () => {
        genValue = _glSrc_gModel__WEBPACK_IMPORTED_MODULE_2__.fluxGen(gen, gen.value ?? null, genBirthRel, genTrans, genFisAlin);
    });
    genFisAlin.addEventListener("change", () => {
        genValue = _glSrc_gModel__WEBPACK_IMPORTED_MODULE_2__.fluxGen(gen, gen.value ?? null, genBirthRel, genTrans, genFisAlin);
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    console.warn(`areAllGenContChecked ${areAllGenContChecked ?? false}`);
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(gen ?? null, "genElement", slicedError ?? "NULL");
}
if (telInputs.length > 0) {
    telInputs.forEach((telInput) => {
        telInput.addEventListener("input", (inputTel) => {
            if (inputTel.target && inputTel.target instanceof HTMLInputElement) {
                _aGModel__WEBPACK_IMPORTED_MODULE_1__.formatTel(inputTel.target);
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(inputTel?.target ?? null, "target inputTel", slicedError ?? "NULL");
            }
        });
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(telInputs ?? null, "telInputs", slicedError ?? "NULL");
}
if (emailInputs.length > 0) {
    emailInputs.forEach((emailInput) => {
        if (emailInput instanceof HTMLInputElement) {
            emailInput.addEventListener("click", () => _aGModel__WEBPACK_IMPORTED_MODULE_1__.addEmailExtension(emailInput));
            emailInput.addEventListener("input", () => _aGModel__WEBPACK_IMPORTED_MODULE_1__.addEmailExtension(emailInput));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(emailInput ?? null, `${emailInput?.id ?? "UNDEFINED ID INPUT"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(emailInputs ?? null, "emailInputs", slicedError ?? "NULL");
}
if (radioButtons.length > 0) {
    radioButtons.forEach((radio) => {
        if (radio instanceof HTMLInputElement && radio.type === "radio") {
            radio.addEventListener("keydown", (keydown) => {
                _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.opRadioHandler(keydown);
            });
            radio.addEventListener("change", () => _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.cpbInpHandler);
            radio.addEventListener("keydown", () => _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.cpbInpHandler);
            radio.addEventListener("dblclick", () => _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.doubleClickHandler(radio));
            // radio.addEventListener("touchstart", GlobalHandler.touchStartHandler);
            radio.addEventListener("change", _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.deactTextInput);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(radio ?? null, `${radio?.id ?? "UNDEFINED ID RADIO"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(radioButtons ?? null, "radioButtons", slicedError ?? "NULL");
}
if (antFamChecks.length > 0) {
    antFamChecks.forEach((antFamCheck) => {
        if (antFamCheck instanceof HTMLInputElement) {
            antFamCheck.addEventListener("change", () => _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.cpbInpHandler);
            antFamCheck.addEventListener("dblclick", () => _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.doubleClickHandler(antFamCheck));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(antFamCheck ?? null, `${antFamCheck.id ?? "UNDEFINED ID INPUT"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(antFamChecks ?? null, "antFamChecks", slicedError ?? "NULL");
}
if (antMedContainer) {
    antMedContainer.addEventListener("click", _aGHandlers__WEBPACK_IMPORTED_MODULE_0__.addAntMedHandler);
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(null, "antMedContainer", slicedError ?? "NULL");
}
if (dateBtns.length > 0) {
    dateBtns.forEach(function (dateBtn) {
        if (dateBtn instanceof HTMLButtonElement) {
            dateBtn.addEventListener("click", (activation) => {
                _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.useCurrentDate(activation, dateBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(dateBtn ?? null, `${dateBtn?.id ?? "UNDEFINED ID DATE BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(dateBtns ?? null, "dateBtns", slicedError ?? "NULL");
}
if (cepElement &&
    cepElement instanceof HTMLInputElement &&
    cepElementBtn &&
    cepElementBtn instanceof HTMLButtonElement) {
    cepElement.addEventListener("input", () => _aGModel__WEBPACK_IMPORTED_MODULE_1__.formatCEP(cepElement));
    cepElement.addEventListener("input", () => {
        const isCepBtnOff = _aGHandlers__WEBPACK_IMPORTED_MODULE_0__.enableCEPBtn(cepElement.value.length, cepElementBtn);
        if (cepElementBtn &&
            cepElementBtn instanceof HTMLButtonElement &&
            !isCepBtnOff) {
            cepElementBtn.addEventListener("click", () => _aGHandlers__WEBPACK_IMPORTED_MODULE_0__.searchCEP(cepElement));
        }
        else if (!(cepElementBtn instanceof HTMLButtonElement)) {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            console.warn(`isCepBtnOff + ${isCepBtnOff ?? false}`);
            _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(cepElementBtn ?? null, "cepElementBtn", slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.multipleElementsNotFound(slicedError ?? "NULL", "Elements para CEP", cepElement ?? null, cepElementBtn ?? null);
}
if (qxPrinc && qxPrinc instanceof HTMLTextAreaElement) {
    qxPrinc.addEventListener("click", () => _aGModel__WEBPACK_IMPORTED_MODULE_1__.addDblQuotes(qxPrinc));
    qxPrinc.addEventListener("input", () => _aGModel__WEBPACK_IMPORTED_MODULE_1__.addDblQuotes(qxPrinc));
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(qxPrinc ?? null, "qxPrinc", slicedError ?? "NULL");
}
if (editableCite) {
    let firstClick = true;
    const citeClickHandler = function (click) {
        if (firstClick && click.target && click.target instanceof HTMLElement) {
            _glSrc_gModel__WEBPACK_IMPORTED_MODULE_2__.removeFirstClick(click.target);
            firstClick = false;
            editableCite.removeEventListener("click", citeClickHandler);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(click?.target ?? null, "click target editableCite", slicedError ?? "NULL");
        }
    };
    editableCite.addEventListener("keyup", function (keypress) {
        if (keypress.target && keypress.target instanceof HTMLElement) {
            _glSrc_gModel__WEBPACK_IMPORTED_MODULE_2__.autoCapitalizeCite(keypress.target);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(keypress?.target ?? null, "keypress target editableCite", slicedError ?? "NULL");
        }
    });
    editableCite.addEventListener("click", citeClickHandler);
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(null, "editableCite", slicedError ?? "NULL");
}
if (deactAutocorrectBtns.length > 0) {
    deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
        if (deactAutocorrectBtn instanceof HTMLButtonElement) {
            deactAutocorrectBtn.addEventListener("click", function (click) {
                return _glSrc_gModel__WEBPACK_IMPORTED_MODULE_2__.switchAutocorrect(click, deactAutocorrectBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(deactAutocorrectBtns ?? null, `${deactAutocorrectBtn?.id ?? "UNDEFINED ID BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(deactAutocorrectBtns ?? null, "deactAutoCorrectBtns", slicedError ?? "NULL");
}
if (astDigtBtns.length > 0) {
    astDigtBtns.forEach(function (astDigtBtn) {
        if (astDigtBtn instanceof HTMLButtonElement) {
            astDigtBtn.addEventListener("click", function (click) {
                return _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.changeToAstDigit(click, astDigtBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(astDigtBtn ?? null, astDigtBtn?.id ?? "UNDEFINED ID BUTTON", slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(astDigtBtns ?? null, "astDigtBtns", slicedError ?? "NULL");
}
if (subButton instanceof HTMLButtonElement) {
    subButton.addEventListener("click", _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.subForm);
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(subButton ?? null, "subButton", slicedError ?? "NULL");
}
if (resetFormBtn instanceof HTMLButtonElement) {
    resetFormBtn.addEventListener("click", (click) => _glSrc_gHandlers__WEBPACK_IMPORTED_MODULE_3__.resetarFormulario(click, astDigtBtns));
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _glSrc_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(resetFormBtn ?? null, "resetFormBtn", slicedError ?? "NULL");
}
// const handleMutation = (mutationsList, observer) => {
//   for (const mutation of mutationsList) {
//     if (mutation.type === "childList") {
//       // Verifica se o JSONBtn foi removido e o JSONLink foi adicionado
//       const JSONBtnRemoved = mutation.removedNodes[0] === JSONBtn;
//       const JSONLinkAdded = Array.from(mutation.addedNodes).some(
//         (node) => node === JSONLink
//       );
//       if (JSONBtnRemoved && JSONLinkAdded) {
//         // Lógica a ser executada quando a troca ocorrer
//         console.log("JSONBtn foi removido, e JSONLink foi adicionado.");
//         // Adicione aqui qualquer lógica ou evento adicional que você deseja executar
//       }
//     }
//   }
// };
// // Função que será chamada quando houver uma mutação no DOM
// // Cria um novo observador de mutação com a função de callback
// const observer = new MutationObserver(handleMutation);
// // Configura o observador para observar mudanças no nó pai (por exemplo, o body)
// observer.observe(document.body, { childList: true, subtree: true });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbUVBQXFDO0FBQzdDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLFNBQVM7QUFDVCxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0RBQTBCO0FBQ2xDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQ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RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUEwQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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NkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EscURBQXFELG1DQUFtQztBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyw2QkFBNkI7QUFDN0I7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHVCQUF1QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRkFBMEY7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHdEQUE4QjtBQUN2RCxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0EsNENBQTRDLDRCQUE0QjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsSUFBSSxjQUFjLGlDQUFpQztBQUMvRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxZQUFZLGNBQWMseUNBQXlDO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLFNBQVMsY0FBYyxzQ0FBc0M7QUFDOUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsV0FBVyxjQUFjLHdDQUF3QztBQUNwSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUE0QjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDREQUE2QjtBQUNwRCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvRUFBZ0Msa0NBQWtDLGlEQUFpRDtBQUMvSDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9FQUFnQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDhEQUE4QjtBQUNyRCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsWUFBWSxnRUFBNEI7QUFDeEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBZ0M7QUFDcEM7QUFDQTtBQUNBLHdDQUF3QyxxREFBcUI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRUFBNEI7QUFDaEM7QUFDQTtBQUNBLHNEQUFzRCwrREFBK0I7QUFDckY7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnRUFBNEI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGdDQUFnQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FuYW1uZXNlZ2VyYWwtcHJvc2F1ZGUvLi9zcmMvYUdIYW5kbGVycy50c3giLCJ3ZWJwYWNrOi8vYW5hbW5lc2VnZXJhbC1wcm9zYXVkZS8uL3NyYy9hR01vZGVsLnRzeCIsIndlYnBhY2s6Ly9hbmFtbmVzZWdlcmFsLXByb3NhdWRlLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9jbGFzc2VzLnRzeCIsIndlYnBhY2s6Ly9hbmFtbmVzZWdlcmFsLXByb3NhdWRlLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9lcnJvckhhbmRsZXIudHN4Iiwid2VicGFjazovL2FuYW1uZXNlZ2VyYWwtcHJvc2F1ZGUvLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2dIYW5kbGVycy50c3giLCJ3ZWJwYWNrOi8vYW5hbW5lc2VnZXJhbC1wcm9zYXVkZS8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ01vZGVsLnRzeCIsIndlYnBhY2s6Ly9hbmFtbmVzZWdlcmFsLXByb3NhdWRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FuYW1uZXNlZ2VyYWwtcHJvc2F1ZGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FuYW1uZXNlZ2VyYWwtcHJvc2F1ZGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hbmFtbmVzZWdlcmFsLXByb3NhdWRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYW5hbW5lc2VnZXJhbC1wcm9zYXVkZS8uL3NyYy9hR0NvbnRyb2xsZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vbmVzc2UgZmlsZSBlc3TDo28gcHJlc2VudGVzIHByaW5jaXBhbG1lbnRlIGFzIGZ1bsOnw7VlcyBkZSBtYW5pcHVsYcOnw6NvIGRpbsOibWljYSBkZSB0ZXh0byBlIGxheW91dFxyXG5pbXBvcnQgKiBhcyBHbG9iYWxNb2RlbCBmcm9tIFwiQGdsU3JjL2dNb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBHbG9iYWxIYW5kbGVyIGZyb20gXCJAZ2xTcmMvZ0hhbmRsZXJzXCI7XHJcbmltcG9ydCAqIGFzIEVycm9ySGFuZGxlciBmcm9tIFwiQGdsU3JjL2Vycm9ySGFuZGxlclwiO1xyXG5sZXQgYmxvY2tDb3VudCA9IDE7XHJcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hDRVAoY2VwRWxlbWVudCkge1xyXG4gICAgY29uc3QgY2VwVmFsdWUgPSBjZXBFbGVtZW50Py52YWx1ZSA/PyBudWxsO1xyXG4gICAgbGV0IGluaXRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGxldCByZXFBY2MgPSAyO1xyXG4gICAgaWYgKGNlcEVsZW1lbnQgJiYgY2VwRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBwcm9nSW50cyA9IGRpc3BsYXlDRVBMb2FkQmFyKGNlcEVsZW1lbnQpID8/IFswLCAxMDAsIG51bGxdO1xyXG4gICAgICAgIGNvbnN0IHByb2dNYXggPSBwcm9nSW50c1swXTtcclxuICAgICAgICBjb25zdCBwcm9nVmFsdWUgPSBwcm9nSW50c1sxXTtcclxuICAgICAgICBjb25zdCBwcm9nQmFyID0gcHJvZ0ludHNbMl07XHJcbiAgICAgICAgY29uc3QgY2VwSGlmZW5PdXRWYWx1ZSA9IGNlcFZhbHVlPy5yZXBsYWNlQWxsKFwiLVwiLCBcIlwiKTtcclxuICAgICAgICBjb25zdCB1cmxCQVBJMSA9IGBodHRwczovL2JyYXNpbGFwaS5jb20uYnIvYXBpL2NlcC92Mi8ke2NlcEhpZmVuT3V0VmFsdWV9YDtcclxuICAgICAgICBjb25zdCB4bWxSZXExID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgaWYgKHVybEJBUEkxKSB7XHJcbiAgICAgICAgICAgIHhtbFJlcTEub3BlbihcIkdFVFwiLCB1cmxCQVBJMSk7XHJcbiAgICAgICAgICAgIHhtbFJlcTEuc2VuZCgpO1xyXG4gICAgICAgICAgICB4bWxSZXExLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhtbFJldHVybjEgPSBsb2FkQ0VQKHhtbFJlcTEsIHJlcUFjYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoeG1sUmV0dXJuMSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFByaW1laXJhIHNvbGljaXRhw6fDo28gWE1ML0hUVFAgZmVpdGEgY29tIHN1Y2Vzc28uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dCYXIgJiYgcHJvZ01heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRDRVBMb2FkQmFyKGNlcEVsZW1lbnQsIGluaXRUaW1lLCBwcm9nTWF4LCBwcm9nVmFsdWUsIHByb2dCYXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRmFsaGEgbmEgcHJpbWVpcmEgWE1ML0hUVFAgUmVxdWVzdC4gSW5pY2lhbmRvIHNlZ3VuZGEgc29saWNpdGHDp8Ojby5gKTtcclxuICAgICAgICAgICAgICAgICAgICByZXFBY2MtLTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsQkFQSTIgPSBgaHR0cHM6Ly9icmFzaWxhcGkuY29tLmJyL2FwaS9jZXAvdjEvJHtjZXBIaWZlbk91dFZhbHVlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeG1sUmVxMiA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cmxCQVBJMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4bWxSZXEyLm9wZW4oXCJHRVRcIiwgdXJsQkFQSTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4bWxSZXEyLnNlbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeG1sUmVxMi5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB4bWxSZXR1cm4yID0gbG9hZENFUCh4bWxSZXEyLCByZXFBY2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhtbFJldHVybjIgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTZWd1bmRhIHNvbGljaXRhw6fDo28gWE1ML0hUVFAgZmVpdGEgY29tIHN1Y2Vzc28uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dCYXIgJiYgcHJvZ01heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRDRVBMb2FkQmFyKGNlcEVsZW1lbnQsIGluaXRUaW1lLCBwcm9nTWF4LCBwcm9nVmFsdWUsIHByb2dCYXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhbGhhIG5hIHNlZ3VuZGEgWE1ML0hUVFAgUmVxdWVzdC4gUHJvY2VkaW1lbnRvIGNhbmNlbGFkby4gSW5zaXJhIE1hbnVhbG1lbnRlLmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9nQmFyICYmIHByb2dNYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkQ0VQTG9hZEJhcihjZXBFbGVtZW50LCBpbml0VGltZSwgcHJvZ01heCwgcHJvZ1ZhbHVlLCBwcm9nQmFyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIGNvbmNhbnRlbmFuZG8gc2VndW5kYSBVUkwgY29tIENFUC5gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIGNvbmNhdGVuYW5kbyBwcmltZWlyYSBVUkwgY29tIENFUC5gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZlcmlmaWNhbmRvIGlucHV0IGRlIENFUC4gRWxlbWVudG86ICR7Y2VwRWxlbWVudH07IEluc3TDom5jaWEgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgIC5jYWxsKGNlcEVsZW1lbnQpXHJcbiAgICAgICAgICAgIC5zbGljZSg4LCAtMSl9OyBWYWxvciBkbyBlbGVtZW50byBvYnRpZG86ICR7Y2VwVmFsdWV9YCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbG9hZENFUCh4bWxSZXEsIHJlcUFjYykge1xyXG4gICAgbGV0IHN0YXR1cztcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHhtbFJlcS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJzZWRBZGRyZXNzID0gSlNPTi5wYXJzZSh4bWxSZXEucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkQWRkcmVzcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdWYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVGSWRcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5SWRcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZWlnaGJvcmhvb2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5laWdoYm91cmhvb2RJZFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0cmVldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RyZWV0SWRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodWYgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWYudmFsdWUgPSBwYXJzZWRBZGRyZXNzLnN0YXRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNpdHkgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2l0eS52YWx1ZSA9IHBhcnNlZEFkZHJlc3MuY2l0eTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvcmhvb2QgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3Job29kLnZhbHVlID0gcGFyc2VkQWRkcmVzcy5uZWlnaGJvcmhvb2Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyZWV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVldC52YWx1ZSA9IHBhcnNlZEFkZHJlc3Muc3RyZWV0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RhdHVzID0gMjAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHhtbFJlcS5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCI0MDRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOw6NvIHJlY29uaGVjaWRvXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChsb2FkRXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYFN0YXR1cyBkZSBFcnJvIHBhcmEgQ0VQViR7cmVxQWNjfTogYCwgbG9hZEVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIHN0YXR1cyA9IDQwNDtcclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0dXM7XHJcbn1cclxuZnVuY3Rpb24gZGlzcGxheUNFUExvYWRCYXIoY2VwRWxlbWVudCkge1xyXG4gICAgbGV0IHByb2dNYXhJbnQ7XHJcbiAgICBsZXQgcHJvZ1ZhbHVlSW50O1xyXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicHJvZ3Jlc3NcIik7XHJcbiAgICBjZXBFbGVtZW50LnBhcmVudEVsZW1lbnQ/Lmluc2VydEJlZm9yZShwcm9ncmVzc0JhciwgY2VwRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc/Lm5leHRFbGVtZW50U2libGluZyA/PyBudWxsKTtcclxuICAgIGlmIChwcm9ncmVzc0JhciAmJiBjZXBFbGVtZW50Lm5leHRFbGVtZW50U2libGluZz8ubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgcHJvZ3Jlc3NCYXIuaWQgPSBcImxvYWRCYXJDZXBWYXJzXCI7XHJcbiAgICAgICAgcHJvZ3Jlc3NCYXIubWF4ID0gMTAwO1xyXG4gICAgICAgIHByb2dNYXhJbnQgPSBwcm9ncmVzc0Jhci5tYXg7XHJcbiAgICAgICAgcHJvZ3Jlc3NCYXIudmFsdWUgPSAwO1xyXG4gICAgICAgIHByb2dWYWx1ZUludCA9IHByb2dyZXNzQmFyLnZhbHVlO1xyXG4gICAgICAgIHByb2dyZXNzQmFyLnN0eWxlLnNldFByb3BlcnR5KFwiYmFja2dyb3VuZC1jb2xvclwiLCBcImJsdWVcIik7XHJcbiAgICAgICAgcHJvZ3Jlc3NCYXIuc3R5bGUuc2V0UHJvcGVydHkoXCJjb2xvclwiLCBcIndoaXRlXCIpO1xyXG4gICAgICAgIHJldHVybiBbcHJvZ01heEludCwgcHJvZ1ZhbHVlSW50LCBwcm9ncmVzc0Jhcl07XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdXBsb2FkQ0VQTG9hZEJhcihjZXBFbGVtZW50LCBpbml0VGltZSwgcHJvZ01heEludCwgcHJvZ1ZhbHVlSW50LCBwcm9ncmVzc0Jhcikge1xyXG4gICAgY29uc3QgZmluaXNoVGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBlbGFwc2VkVGltZSA9IGZpbmlzaFRpbWUgLSBpbml0VGltZTtcclxuICAgIGNvbnN0IGVsYXBzZWRORGVjID0gZWxhcHNlZFRpbWUudG9TdHJpbmcoKS5sZW5ndGggLSAxO1xyXG4gICAgbGV0IGFkZGVkWmVyb3NNdWx0ID0gXCIxXCI7XHJcbiAgICBmb3IgKGxldCBpRCA9IDA7IGlEIDwgZWxhcHNlZE5EZWM7IGlEKyspIHtcclxuICAgICAgICBhZGRlZFplcm9zTXVsdCArPSBcIjBcIjtcclxuICAgIH1cclxuICAgIGNvbnN0IGluZE5EZWMgPSAxICogcGFyc2VJbnQoYWRkZWRaZXJvc011bHQpO1xyXG4gICAgY29uc3Qgcm91bmRlZEVsYXBzZWQgPSBNYXRoLnJvdW5kKGVsYXBzZWRUaW1lIC8gaW5kTkRlYykgKiBpbmRORGVjO1xyXG4gICAgaWYgKHByb2dWYWx1ZUludCAhPT0gcHJvZ01heEludCkge1xyXG4gICAgICAgIGNvbnN0IGxvYWRpbmdFdmVudCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgcHJvZ1ZhbHVlSW50ICs9IDU7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLnZhbHVlID0gcHJvZ1ZhbHVlSW50O1xyXG4gICAgICAgICAgICBpZiAocHJvZ1ZhbHVlSW50ID09PSBwcm9nTWF4SW50KSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGxvYWRpbmdFdmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCByb3VuZGVkRWxhcHNlZCAvIDIwKTtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNlcEVsZW1lbnQucGFyZW50RWxlbWVudD8ucmVtb3ZlQ2hpbGQocHJvZ3Jlc3NCYXIpO1xyXG4gICAgfSwgcm91bmRlZEVsYXBzZWQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVDRVBCdG4oY2VwTGVuZ3RoLCBjZXBCdG4pIHtcclxuICAgIGxldCBpc0NlcEVsZW1lbkJ0bk9mZiA9IHRydWU7XHJcbiAgICBpZiAoY2VwTGVuZ3RoID09PSA5KSB7XHJcbiAgICAgICAgY2VwQnRuLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGlzQ2VwRWxlbWVuQnRuT2ZmID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjZXBCdG4uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNDZXBFbGVtZW5CdG5PZmY7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFudE1lZEhhbmRsZXIoY2xpY2spIHtcclxuICAgIGlmIChjbGljay50YXJnZXQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCAmJlxyXG4gICAgICAgIGNsaWNrLnRhcmdldC50YWdOYW1lID09PSBcIkJVVFRPTlwiICYmXHJcbiAgICAgICAgY2xpY2sudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFkZEFudE1lZFwiKSkge1xyXG4gICAgICAgIGJsb2NrQ291bnQrKzsgLy8gSW5jcmVtZW50YSBvIG7Dum1lcm8gZGUgYmxvY29zXHJcbiAgICAgICAgY29uc3QgYW50TWVkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnRNZWRDb250YWluZXJcIik7XHJcbiAgICAgICAgLy8gQ3JpYSB1bSBub3ZvIGNvbmp1bnRvIGRlIGVsZW1lbnRvcyBIVE1MXHJcbiAgICAgICAgY29uc3QgbmV3QmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIG5ld0Jsb2NrLmNsYXNzTmFtZSA9IFwiY29udFRlcmMgYW50TWVkQmxvY2tcIjtcclxuICAgICAgICBuZXdCbG9jay5pZCA9IGBhbnRNZWRCbG9jayR7YmxvY2tDb3VudH1gO1xyXG4gICAgICAgIG5ld0Jsb2NrLmlubmVySFRNTCA9IGBcclxuICAgIDxzcGFuIGNsYXNzPVwiY29udFF1YXQgZGl2QW50TWVkU3BhbiBzcGFuTWFpblwiIGlkPVwiYW50TWVkU3BhbklucCR7YmxvY2tDb3VudH1cIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJjb250UXVpbnQgZGl2QW50TWVkU3ViU3BhbiBzcGFuU3ViXCIgaWQ9XCJhbnRNZWRTcGFuTnVtJHtibG9ja0NvdW50fVwiPiR7YmxvY2tDb3VudH0mIzQxOzwvc3Bhbj5cclxuICAgICAgPGxhYmVsIGZvcj1cImFudE1lZElkJHtibG9ja0NvdW50fVwiIGNsYXNzPVwiYW50TWVkTGFiZWxcIj48L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYW50TWVkTmFtZSR7YmxvY2tDb3VudH1cIiBpZD1cImFudE1lZElkJHtibG9ja0NvdW50fVwiIGNsYXNzPVwiaW5wQW50TWVkXCIgLz5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPVwiY29udFF1YXQgZGl2QW50TWVkU3BhbiBzcGFuTWFpblwiIGlkPVwiYW50TWVkU3Bhbk1haW5EYXRlJHtibG9ja0NvdW50fVwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNvbnRRdWludCBkaXZBbnRNZWRTdWJTcGFuIHNwYW5TdWJcIiBpZD1cImFudE1lZFNwYW5TdWJEYXRlJHtibG9ja0NvdW50fVwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJhbnRNZWREYXRlSW5pTmFtZSR7YmxvY2tDb3VudH1cIiBpZD1cImFudE1lZERhdGVJbmlJZCR7YmxvY2tDb3VudH1cIiBjbGFzcz1cImlucERhdGUgYW50TWVkRGF0ZSBpbnBBbnRNZWRcIi8+IGF0w6lcclxuICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwiYW50TWVkRGF0ZUVuZE5hbWUke2Jsb2NrQ291bnR9XCIgaWQ9XCJhbnRNZWREYXRlRW5kSWQke2Jsb2NrQ291bnR9XCIgY2xhc3M9XCJpbnBEYXRlIGFudE1lZERhdGUgaW5wQW50TWVkXCIgLz5cclxuICAgICAgICA8bGFiZWwgZm9yPVwiYW50TWVkRGF0ZUVuZElkJHtibG9ja0NvdW50fVwiIGZvcj1cImFudE1lZERhdGVFbmRJZDFcIj48L2xhYmVsPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBjbGFzcz1cImNvbnRRdWludCBkYXRCdG4gYXR1YWxUcmF0QnRuXCJcclxuICAgICAgICBpZD1cImF0dWFsVHJhdCR7YmxvY2tDb3VudH1EYXRCdG5cIlxyXG4gICAgICA+XHJcbiAgICAgICAgVXNhciBkYXRhIGF0dWFsXHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImFkZEFudE1lZE5hbWUke2Jsb2NrQ291bnR9XCIgaWQ9XCJhZGRBbnRNZWRJZCR7YmxvY2tDb3VudH1cIiBjbGFzcz1cImFkZEFudE1lZCBjb3VudEFudE1lZFwiXHJcbiAgICAgICAgdmFsdWU9XCJhZGRBbnRNZWRcIj4rPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cInJlbW92ZUFudE1lZE5hbWUke2Jsb2NrQ291bnR9XCIgaWQ9XCJyZW1vdmVBbnRNZWRJZCR7YmxvY2tDb3VudH1cIlxyXG4gICAgICAgIGNsYXNzPVwicmVtb3ZlQW50TWVkIGNvdW50QW50TWVkXCIgdmFsdWU9XCJyZW1vdmVBbnRNZWRcIj4tPC9idXR0b24+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvc3Bhbj5cclxuICBgO1xyXG4gICAgICAgIC8vIEFkaWNpb25hIG8gbm92byBibG9jbyBhbyBjb250w6ppbmVyXHJcbiAgICAgICAgYW50TWVkQ29udGFpbmVyPy5hcHBlbmRDaGlsZChuZXdCbG9jayk7XHJcbiAgICAgICAgY29uc3QgZGF0ZUJ0bnMgPSBuZXdCbG9jay5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25baWQkPVwiRGF0QnRuXCJdJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dEVsZW1lbnRzID0gbmV3QmxvY2sucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuICAgICAgICBmb3IgKGxldCBpVCA9IDA7IGlUIDwgdGV4dEVsZW1lbnRzLmxlbmd0aDsgaVQrKykge1xyXG4gICAgICAgICAgICB0ZXh0RWxlbWVudHNbaVRdLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyh0ZXh0RWxlbWVudHNbaVRdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGlCID0gMDsgaUIgPCBkYXRlQnRucy5sZW5ndGg7IGlCKyspIHtcclxuICAgICAgICAgICAgZGF0ZUJ0bnNbaUJdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoYWN0aXZhdGlvbikgPT4gR2xvYmFsSGFuZGxlci51c2VDdXJyZW50RGF0ZShhY3RpdmF0aW9uLCBkYXRlQnRuc1tpQl0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjbGljay50YXJnZXQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCAmJlxyXG4gICAgICAgIGNsaWNrLnRhcmdldC50YWdOYW1lID09PSBcIkJVVFRPTlwiICYmXHJcbiAgICAgICAgY2xpY2sudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJlbW92ZUFudE1lZFwiKSkge1xyXG4gICAgICAgIGNvbnN0IGRpdlRvUmVtb3ZlID0gY2xpY2sudGFyZ2V0LmNsb3Nlc3QoXCIuYW50TWVkQmxvY2tcIik7XHJcbiAgICAgICAgaWYgKGRpdlRvUmVtb3ZlICYmIGJsb2NrQ291bnQgIT09IDEgJiYgZGl2VG9SZW1vdmUuaWQgIT09IFwiYW50TWVkQmxvY2sxXCIpIHtcclxuICAgICAgICAgICAgZGl2VG9SZW1vdmUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGJsb2NrQ291bnQgLT0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChjbGljay50YXJnZXQgPz8gbnVsbCwgYCR7Y2xpY2sudGFyZ2V0LmlkID8/IFwiVU5ERUZJTkVEIEJVVFRPTiBJRFwifWAsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxufVxyXG4iLCIvL25lc3NlIGZpbGUgZXN0w6NvIHByZXNlbnRlcyBwcmluY2lwYWxtZW50ZSBhcyBmdW7Dp8O1ZXMgcmVsYWNpb25hZGFzIMOgIGV4aWfDqm5jaWEgZGUgbW9kZWxvIHRleHR1YWwgZSBkZSB2aXN1YWxpemHDp8Ojb1xyXG5pbXBvcnQgKiBhcyBFcnJvckhhbmRsZXIgZnJvbSBcIkBnbFNyYy9lcnJvckhhbmRsZXJcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFRlbChpbnB1dFRlbEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHRlbFRleHQgPSBpbnB1dFRlbEVsZW1lbnQudmFsdWU7XHJcbiAgICBjb25zdCByZWdleCA9IC9cXGQrL2c7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWRUZWwgPSB0ZWxUZXh0LnJlcGxhY2UoL1teMC05XS9nLCBcIlwiKTtcclxuICAgIGNvbnN0IG51bU9ubHkgPSBmb3JtYXR0ZWRUZWwucmVwbGFjZShyZWdleCwgKG1hdGNoVGVsKSA9PiB7XHJcbiAgICAgICAgaWYgKG1hdGNoVGVsLmxlbmd0aCA9PT0gOSkge1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hUZWxbMF0gPT09IFwiOVwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bWF0Y2hUZWwuc2xpY2UoMCwgNSl9LSR7bWF0Y2hUZWwuc2xpY2UoNSwgOSl9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHttYXRjaFRlbC5zbGljZSgwLCA0KX0tJHttYXRjaFRlbC5zbGljZSg0LCA4KX1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1hdGNoVGVsLmxlbmd0aCA+IDkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke21hdGNoVGVsLnNsaWNlKDAsIDgpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXRjaFRlbDtcclxuICAgIH0pO1xyXG4gICAgaW5wdXRUZWxFbGVtZW50LnZhbHVlID0gbnVtT25seTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRW1haWxFeHRlbnNpb24oY29udGFpbmVyKSB7XHJcbiAgICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fCBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lci52YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb250YWluZXIudmFsdWUgPSBcIkAuXCI7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5zZXRTZWxlY3Rpb25SYW5nZSgwLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFpbmVyLnZhbHVlID09PSBcIkBcIikge1xyXG4gICAgICAgICAgICBjb250YWluZXIudmFsdWUgKz0gXCJALlwiO1xyXG4gICAgICAgICAgICBjb250YWluZXIuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKGNvbnRhaW5lciA/PyBudWxsLCBgJHtjb250YWluZXI/LmlkID8/IFwiVU5ERUZJTkVEIElEIEVNQUlMIENPTlRBSU5FUlwifWAsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0Q0VQKGlucHV0Q0VQRWxlbWVudCkge1xyXG4gICAgY29uc3QgQ0VQVGV4dCA9IGlucHV0Q0VQRWxlbWVudC52YWx1ZTtcclxuICAgIGNvbnN0IG5vSGlmZW5DRVBSZWdleCA9IC9bMC05XXs1LH1bXi1dWzAtOV17MSwzfS87XHJcbiAgICBpbnB1dENFUEVsZW1lbnQudmFsdWUucmVwbGFjZUFsbCgvW14wLTldL2csIFwiXCIpO1xyXG4gICAgaWYgKENFUFRleHQubGVuZ3RoID49IDUgJiYgQ0VQVGV4dC5tYXRjaChub0hpZmVuQ0VQUmVnZXgpKSB7XHJcbiAgICAgICAgY29uc3QgaGlmZW5UZXh0ID0gYCR7Q0VQVGV4dC5zbGljZSgwLCA1KX0tJHtDRVBUZXh0LnNsaWNlKDUsIDkpfWA7XHJcbiAgICAgICAgaW5wdXRDRVBFbGVtZW50LnZhbHVlID0gaGlmZW5UZXh0O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhZGREYmxRdW90ZXMoY29udGFpbmVyKSB7XHJcbiAgICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxyXG4gICAgICAgIEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoY29udGFpbmVyLnZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci52YWx1ZSA9ICdcIlwiJztcclxuICAgICAgICAgICAgY29udGFpbmVyLnNldFNlbGVjdGlvblJhbmdlKDEsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjb250YWluZXIudmFsdWUgPT09ICdcIicpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLnZhbHVlICs9ICdcIic7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5zZXRTZWxlY3Rpb25SYW5nZSgxLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoY29udGFpbmVyID8/IG51bGwsIGAke2NvbnRhaW5lcj8uaWQgPz8gXCJVTkRFRklORUQgSUQgUVVPVEVEIENPTlRBSU5FUlwifWAsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmV4cG9ydCBjbGFzcyBKU09OU3RvcmFnZXIge1xyXG4gICAgI2lkO1xyXG4gICAgI3ZhbHVlO1xyXG4gICAgY29uc3RydWN0b3IoaWQsIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy4jaWQgPSBpZDtcclxuICAgICAgICB0aGlzLiN2YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBnZXQgc2hvd0lucElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNpZDtcclxuICAgIH1cclxuICAgIGdldCBzaG93SW5wVmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI3ZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IHNob3dBbGxJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiBbdGhpcy4jaWQsIHRoaXMuI3ZhbHVlXTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSlNPTlRpdGxlU3RvcmFnZXIge1xyXG4gICAgI3RpdGxlO1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLiN0aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBnZXQgc2hvd0lucFRpdGxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiN0aXRsZTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgUGVyc29uIHtcclxuICAgIGdlbjtcclxuICAgIGFnZTtcclxuICAgIHdlaWdodDtcclxuICAgIGhlaWdodDtcclxuICAgIHN1bURDdXQ7XHJcbiAgICBhdHZMdmw7XHJcbiAgICBjb25zdHJ1Y3RvcihnZW4sIGFnZSwgd2VpZ2h0LCBoZWlnaHQsIHN1bURDdXQsIGF0dkx2bCkge1xyXG4gICAgICAgIHRoaXMuZ2VuID0gZ2VuO1xyXG4gICAgICAgIHRoaXMuYWdlID0gYWdlO1xyXG4gICAgICAgIHRoaXMud2VpZ2h0ID0gd2VpZ2h0O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuc3VtREN1dCA9IHN1bURDdXQ7XHJcbiAgICAgICAgdGhpcy5hdHZMdmwgPSBhdHZMdmw7XHJcbiAgICB9XHJcbiAgICBjaGVja0F0dkx2bChwZXJzb24pIHtcclxuICAgICAgICBpZiAocGVyc29uICYmIFwiYXR2THZsXCIgaW4gcGVyc29uICYmIHRoaXMuYXR2THZsICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5hdHZMdmwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzZWRlbnRhcmlvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEuMjtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJsZXZlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEuNDtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb2RlcmFkb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxLjY7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW50ZW5zb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxLjk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibXVpdG9JbnRlbnNvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDIuMjtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gY2Fzby4gQ2FzbyBvYnRpZG86ICR7dGhpcy5hdHZMdmwgPz8gXCJudWxsXCJ9OyBDYXNvcyBwb3Nzw612ZWlzOiBzZWRlbnTDoXJpbyB8fCBsZXZlIHx8IG1vZGVyYWRvIHx8IGludGVuc28gfHwgbXVpdG9JbnRlbnNvYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgcGVzc29hLiBWYWxvciBvYnRpZG86ICR7cGVyc29uID8/IFwibnVsbFwifTsgaW5zdMOibmNpYSAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn07IFZhbG9yIGRlIE7DrXZlbCBkZSBBdGl2aWRhZGUgRsOtc2ljYSBvYnRpZG86ICR7dGhpcy5hdHZMdmwgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGNhbGNJTUMocGVyc29uKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHBlcnNvbiAmJlxyXG4gICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIiBpbiBwZXJzb24gJiZcclxuICAgICAgICAgICAgICAgIHRoaXMud2VpZ2h0ID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIiBpbiBwZXJzb24gJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgSU1DID0gdGhpcy53ZWlnaHQgLyB0aGlzLmhlaWdodCAqKiAyO1xyXG4gICAgICAgICAgICAgICAgaWYgKElNQyAmJiBJTUMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgTUxHID0gdGhpcy53ZWlnaHQgLSB0aGlzLndlaWdodCAqIChJTUMgLyAxMDApID8/IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElNQyA8IDE4LjUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImFiYWl4b1wiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAxOC41ICYmIElNQyA8IDI1LjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImV1dHJvZmljb1wiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAyNS4wICYmIElNQyA8IDMwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJzb2JyZXBlc29cIiwgSU1DLCBNTEddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChJTUMgPj0gMzAgJiYgSU1DIDwgMzUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9iZXNvMVwiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAzNSAmJiBJTUMgPCA0MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wib2Jlc28yXCIsIElNQywgTUxHXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoSU1DID4gNDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9iZXNvM1wiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gY2xhc3NpZmljYW5kbyBJTUMuIFZhbG9yIG9idGlkbzogJHtJTUMgPz8gMH07IFZhbG9yZXMgcG9zc8OtdmVpcyBkZXZlbSBzZXIgcG9zaXRpdm9zYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIGNhbGN1bGFuZG8gSU1DLiBWYWxvcmVzIHVzYWRvczogUGVzbyAke3RoaXMud2VpZ2h0ID8/IDB9IGUgQWx0dXJhICR7dGhpcy5oZWlnaHQgPz8gMH1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gZGFkb3MgZm9ybmVjaWRvcy4gRWxlbWVudG8gcGVzc29hOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn07IHdlaWdodCBwcmVzZW50ZTogJHtcIndlaWdodFwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICAgICAgUGVzbyBvYnRpZG86ICR7dGhpcy53ZWlnaHQgPz8gMH07XG4gICAgICAgICAgaGVpZ2h0IHByZXNlbnRlOiAke1wiaGVpZ2h0XCIgaW4gcGVyc29uID8/IGZhbHNlfTtcbiAgICAgICAgICBBbHR1cmEgb2J0aWRhOiAke3RoaXMuaGVpZ2h0ID8/IDB9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKElNQ0Vycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSU1DRXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBbXCJcIiwgMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2FsY1BHQyhwZXJzb24pIHtcclxuICAgICAgICBpZiAoXCJzdW1EQ3V0XCIgaW4gcGVyc29uICYmIHRoaXMuc3VtREN1dCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJzb24gaW5zdGFuY2VvZiBNYW4pIHtcclxuICAgICAgICAgICAgICAgIGxldCBEQyA9IDEuMTA5MzggLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwODI2NyAqIHRoaXMuc3VtREN1dCArXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDAwMDE2ICogdGhpcy5zdW1EQ3V0ICoqIDIgLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwMjU3NCAqIHBlcnNvbi5hZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoREMgPD0gMCB8fCBOdW1iZXIuaXNOYU4oREMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREMgPSAwLjAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IFBHQyA9IDQ5NSAvIERDIC0gNDUwO1xyXG4gICAgICAgICAgICAgICAgaWYgKFBHQyA8PSAwIHx8IE51bWJlci5pc05hTihQR0MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMC4wMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChQR0MgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBQR0MgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUEdDO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIFdvbWFuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgREMgPSAxLjA5OTQ5MjEgLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwOTkyOSAqIHRoaXMuc3VtREN1dCArXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDAwMDIzICogdGhpcy5zdW1EQ3V0ICoqIDIgLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwMTM5MiAqIHBlcnNvbi5hZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoREMgPD0gMCB8fCBOdW1iZXIuaXNOYU4oREMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREMgPSAwLjAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IFBHQyA9IDQ5NSAvIERDIC0gNDUwO1xyXG4gICAgICAgICAgICAgICAgaWYgKFBHQyA8PSAwIHx8IE51bWJlci5pc05hTihQR0MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMC4wMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChQR0MgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBQR0MgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUEdDO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIE5ldXRybykge1xyXG4gICAgICAgICAgICAgICAgbGV0IERDID0gMS4xMDQ0MzYwNSAtXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDA5MDk4ICogdGhpcy5zdW1EQ3V0ICtcclxuICAgICAgICAgICAgICAgICAgICAwLjAwMDAwMTk1ICogdGhpcy5zdW1EQ3V0ICoqIDIgLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwMTk4MyAqIHBlcnNvbi5hZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoREMgPD0gMCB8fCBOdW1iZXIuaXNOYU4oREMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREMgPSAwLjAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IFBHQyA9IDQ5NSAvIERDIC0gNDUwO1xyXG4gICAgICAgICAgICAgICAgaWYgKFBHQyA8PSAwIHx8IE51bWJlci5pc05hTihQR0MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMC4wMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChQR0MgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBQR0MgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUEdDO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgSW5zdMOibmNpYSBkZSBvYmpldG8gaW52w6FsaWRhLiBJbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGVyc29uKS5zbGljZSg4LCAtMSkgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYWRvIFByb3ByaWVkYWRlIHN1bURDdXQ6XG4gICAgICBFc3TDoSBwcmVzZW50ZTogJHtcInN1bURDdXRcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgVmFsb3Igb2J0aWRvOiAke3RoaXMuc3VtREN1dCA/PyAwfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYWxjVE1CKHBlcnNvbiwgSU1DLCBmYWN0b3JBdGxldGEsIE1MRykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJzb24gJiYgXCJhdHZMdmxcIiBpbiBwZXJzb24gJiYgdGhpcy5hdHZMdmwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF0dkx2bCA9PT0gXCJtdWl0b0ludGVuc29cIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChmYWN0b3JBdGxldGEgPT09IFwiTUxHXCIgfHwgZmFjdG9yQXRsZXRhID09PSBcIlBlc29cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFjdG9yQXRsZXRhID09PSBcIk1MR1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNTEcgJiYgTUxHID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgVE1CID0gMjUuOSAqIE1MRyArIDI4NDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJ0aW5zbGV5XCIsIFRNQl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIE1MRy5cbiAgICAgICAgICAgICAgVmFsb3Igb2J0aWRvOiAke01MRyA/PyAwfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZhY3RvckF0bGV0YSA9PT0gXCJQZXNvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwid2VpZ2h0XCIgaW4gcGVyc29uICYmIHRoaXMud2VpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgVE1CID0gMjQuOCAqIHRoaXMud2VpZ2h0ICsgMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1widGluc2xleVwiLCBUTUJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyB3ZWlnaHQuXG4gICAgICAgICAgICAgIFZhbG9yIG9idGlkbzogJHt0aGlzLndlaWdodCA/PyAwfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5hdHZMdmwgPT09IFwic2VkZW50YXJpb1wiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHZMdmwgPT09IFwibGV2ZVwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHZMdmwgPT09IFwibW9kZXJhZG9cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR2THZsID09PSBcImludGVuc29cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcIndlaWdodFwiIGluIHBlcnNvbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlaWdodCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiBpbiBwZXJzb24gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdlXCIgaW4gcGVyc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJTUMgPCAyNS4wICYmIElNQyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZXJzb24gaW5zdGFuY2VvZiBNYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBUTUIgPSA2NiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgxMy44ICogdGhpcy53ZWlnaHQgKyA1LjAgKiB0aGlzLmhlaWdodCAtIDYuOCAqIHRoaXMuYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wiaGFycmlzQmVuZWRpY3RcIiwgVE1CXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIFdvbWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgVE1CID0gNjU1ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDkuNiAqIHRoaXMud2VpZ2h0ICsgMS45ICogdGhpcy5oZWlnaHQgLSA0LjcgKiB0aGlzLmFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImhhcnJpc0JlbmVkaWN0XCIsIFRNQl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwZXJzb24gaW5zdGFuY2VvZiBOZXV0cm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBUTUIgPSAzNjAuNSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgxMS43ICogdGhpcy53ZWlnaHQgKyAzLjQ1ICogdGhpcy5oZWlnaHQgLSA1Ljc1ICogdGhpcy5hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJoYXJyaXNCZW5lZGljdFwiLCBUTUJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhIGRlIFBlcnNvbi4gSW5zdMOibmNpYSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBlcnNvbikuc2xpY2UoOCwgLTEpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibnVsbFwifWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAyNS4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVyc29uIGluc3RhbmNlb2YgTWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgVE1CID0gMTAgKiB0aGlzLndlaWdodCArIDYuMjUgKiB0aGlzLmhlaWdodCAtIDUuMCAqIHRoaXMuYWdlICsgNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wibWlmZmxpblN0SmVvclwiLCBUTUJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgV29tYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBUTUIgPSAxMCAqIHRoaXMud2VpZ2h0ICsgNi4yNSAqIHRoaXMuaGVpZ2h0IC0gNS4wICogdGhpcy5hZ2UgLSAxNjE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm1pZmZsaW5TdEplb3JcIiwgVE1CXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIE5ldXRybykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFRNQiA9IDEwICogdGhpcy53ZWlnaHQgKyA2LjI1ICogdGhpcy5oZWlnaHQgLSA1LjAgKiB0aGlzLmFnZSAtIDc4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJtaWZmbGluU3RKZW9yXCIsIFRNQl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgUGVyc29uLiBJbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKHBlcnNvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gSU1DLiBJTUMgb2J0aWRvOiAke0lNQyA/PyAwfTsgVmFsb3IgZGV2ZSBzZXIgbsO6bWVyaWNvLCBwb3NpdGl2byBlIGZsb2F0YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gcHJvcHJpZWRhZGVzIGRlIHBlcnNvbi5cbiAgICAgICAgICAgIHdlaWdodCBwcmVzZW50ZTogJHtcIndlaWdodFwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICAgICAgICBWYWxvciBkZSB3ZWlnaHQgb2J0aWRvOiAke3RoaXMud2VpZ2h0ID8/IDB9O1xuICAgICAgICAgICAgaGVpZ2h0IHByZXNlbnRlOiAke1wiaGVpZ2h0XCIgaW4gcGVyc29uID8/IGZhbHNlfTtcbiAgICAgICAgICAgIFZhbG9yIGRlIGhlaWdodCBvYnRpZG86ICR7dGhpcy5oZWlnaHQgPz8gMH07XG4gICAgICAgICAgICBhZ2UgcHJlc2VudGU6ICR7XCJhZ2VcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBhdHZMdmwgZS9vdSBmYWN0b3JBdGxldGEuXG4gICAgICAgICAgICBhdHZMdmwgb2J0aWRvOiAke3RoaXMuYXR2THZsID8/IFwibnVsbFwifVxuICAgICAgICAgICAgRmF0b3Igb2J0aWRvOiAke2ZhY3RvckF0bGV0YSA/PyBcIm51bGxcIn07IEZhdG9yZXMgdsOhbGlkb3M6IFwiTUxHXCIgfHwgXCJQZXNvXCJgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gcGVyc29uLlxuICAgICAgICBFbGVtZW50bzogJHtwZXJzb24gPz8gXCJudWxsXCJ9O1xuICAgICAgICBJbnN0w6JuY2lhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn07XG4gICAgICAgIGF0dkx2bCBwcmVzZW50ZTogJHtcImF0dkx2bFwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICAgIFZhbG9yIGRlIGF0dkx2bCBvYnRpZG86ICR7dGhpcy5hdHZMdmwgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKFRNQkVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoVE1CRXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBbXCJcIiwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2FsY0dFVChUTUIsIGZhY3RvckF0dkx2bCkge1xyXG4gICAgICAgIGlmIChUTUIgJiYgZmFjdG9yQXR2THZsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IEdFVCA9IFRNQiAqIGZhY3RvckF0dkx2bDtcclxuICAgICAgICAgICAgcmV0dXJuIEdFVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIGFyZ3VtZW50b3MuXG4gICAgICBUTUIgb2J0aWRvOiAke1RNQiA/PyAwfTtcbiAgICAgIGZhY3RvckF0dkx2bCBvYnRpZG86ICR7ZmFjdG9yQXR2THZsID8/IDB9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBjbG9uZVBlcnNvbihwZXJzb24pIHtcclxuICAgICAgICBpZiAocGVyc29uICYmIFwiZ2VuXCIgaW4gcGVyc29uKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGVyc29uLmdlbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1hc2N1bGlub1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTWFuKHBlcnNvbi5nZW4sIHBlcnNvbi5hZ2UsIHBlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHQsIHBlcnNvbi5zdW1EQ3V0LCBwZXJzb24uYXR2THZsKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJmZW1pbmlub1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV29tYW4ocGVyc29uLmdlbiwgcGVyc29uLmFnZSwgcGVyc29uLndlaWdodCwgcGVyc29uLmhlaWdodCwgcGVyc29uLnN1bURDdXQsIHBlcnNvbi5hdHZMdmwpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm5ldXRyb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTmV1dHJvKHBlcnNvbi5nZW4sIHBlcnNvbi5hZ2UsIHBlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHQsIHBlcnNvbi5zdW1EQ3V0LCBwZXJzb24uYXR2THZsKTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gLmdlbiBkZSBwZXJzb24gcGFzc2FkYSBwYXJhIC5jbG9uZVBlcnNvbigpXG4gICAgICAgICAgLmdlbiBvYnRpZG86ICR7cGVyc29uPy5nZW4gPz8gXCJudWxsXCJ9LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyBwZXJzb24uXG4gICAgICBPYmpldG8gb2J0aWRvOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn07XG4gICAgICAuZ2VuIHByZXNlbnRlOiAke1wiZ2VuXCIgaW4gcGVyc29uID8/IGZhbHNlfS5gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIE1hbiBleHRlbmRzIFBlcnNvbiB7XHJcbn1cclxuZXhwb3J0IGNsYXNzIFdvbWFuIGV4dGVuZHMgUGVyc29uIHtcclxufVxyXG5leHBvcnQgY2xhc3MgTmV1dHJvIGV4dGVuZHMgUGVyc29uIHtcclxufVxyXG4iLCIvLyBpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50Tm90Rm91bmQoZWxlbWVudCwgZWxlbWVudE5hbWUsIGxpbmUpIHtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQgPSBcIlVOREVGSU5FRCBFTEVNRU5UXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWVsZW1lbnROYW1lKSB7XHJcbiAgICAgICAgZWxlbWVudE5hbWUgPSBcIlVOTkFNRUQgRUxFTUVOVFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxyXG4gICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50IHx8XHJcbiAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgXG4gIEVMRU1FTlQgTk9UIEZPVU5ELCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYSBkZSAke2VsZW1lbnQ/LmlkIHx8IGVsZW1lbnROYW1lIHx8IFwiTlVMTFwifS5cbiAgSW5zdMOibmNpYSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgfHwgXCJOVUxMXCJ9O1xuICAudmFsdWUgb2J0aWRvOiAke2VsZW1lbnQ/LnZhbHVlID8/IFwiTlVMTFwifS5gKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFxuICBFTEVNRU5UIE5PVCBGT1VORCwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgJHtlbGVtZW50Py5pZCB8fCBlbGVtZW50TmFtZSB8fCBcIlVOREVGSU5FRCBJRCBPUiBOQU1FXCJ9LlxuICBJbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSB8fCBcIk5VTExcIn0uYCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlucHV0Tm90Rm91bmQoZWxlbWVudCwgZWxlbWVudE5hbWUsIGxpbmUpIHtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQgPSBcIlVOREVGSU5FRCBFTEVNRU5UXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWVsZW1lbnROYW1lKSB7XHJcbiAgICAgICAgZWxlbWVudE5hbWUgPSBcIlVOTkFNRUQgRUxFTUVOVFwiO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcihgSU5QVVQgTk9UIEZPVU5ELCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gJHtlbGVtZW50Py5pZCB8fCBlbGVtZW50TmFtZSB8fCBcIlVOREVGSU5FRCBJRCBPUiBOQU1FXCJ9LlxuICBFbGVtZW50byBvYnRpZG86ICR7ZWxlbWVudCA/PyBcIk5VTExcIn07XG4gIEluc3TDom5jaWEgb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpIHx8IFwiTlVMTFwifTtcbiAgVGlwbyBvYnRpZG8gKHbDoWxpZG8gc29tZW50ZSBwYXJhIDxpbnB1dD4pOiAke2VsZW1lbnQ/LnR5cGUgfHwgXCJOVUxMXCJ9O1xuICAudmFsdWUgb2J0aWRvOiAke2VsZW1lbnQ/LnZhbHVlIHx8IFwiTlVMTFwifTtcbiAgLmNoZWNrZWQgb2JpdG9kOiAke2VsZW1lbnQ/LmNoZWNrZWQgfHwgXCJOVUxMXCJ9LmApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50V2l0aEFycmF5RXJyb3IoY29udGV4dCwgYXJyYXksIGFycmF5TmFtZSwgZWxlbWVudCwgZWxlbWVudE5hbWUsIGxpbmUpIHtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQgPSBcIlVOREVGSU5FRCBFTEVNRU5UXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWVsZW1lbnROYW1lKSB7XHJcbiAgICAgICAgZWxlbWVudE5hbWUgPSBcIlVOTkFNRUQgRUxFTUVOVFwiO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcihgRUxFTUVOVCBXSVRIIEFSUkFZIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gJHtjb250ZXh0fS5cbiAgJHtlbGVtZW50TmFtZSA/PyBcIlVOTkFNRUQgRUxFTUVOVFwifSBvYnRpZG86ICR7SlNPTi5zdHJpbmdpZnkoYXJyYXkpID8/IFwiTlVMTFwifTtcbiAgSW5zdMOibmNpYSBkZSAke2FycmF5TmFtZSA/PyBcIlVOTkFNRUQgQVJSQVlcIn0gb2J0aWRvOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifS5gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudFdpdGhPYmplY3RFcnJvcihjb250ZXh0LCBvYmplY3QsIGVsZW1lbnQsIGVsZW1lbnROYW1lLCBsaW5lKSB7XHJcbiAgICBpZiAoIWVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50ID0gXCJVTkRFRklORUQgRUxFTUVOVFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCFlbGVtZW50TmFtZSkge1xyXG4gICAgICAgIGVsZW1lbnROYW1lID0gXCJVTk5BTUVEIEVMRU1FTlRcIjtcclxuICAgIH1cclxuICAgIGNvbnNvbGUuZXJyb3IoYEVMRU1FTlQgV0lUSCBPQkpFQ1QgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICAgIEVycm8gJHtjb250ZXh0ID8/IFwiVW5kZWZpbmVkIENvbnRleHRcIn0uIEVsZW1lbnRvOiAke0pTT04uc3RyaW5naWZ5KG9iamVjdCl9OyBpbnN0w6JuY2lhOiAke29iamVjdD8uY29uc3RydWN0b3IubmFtZSA/PyBcIk5VTExcIn1cbiAgICAke2VsZW1lbnROYW1lID8/IFwiVU5OQU1FRCBFTEVNRU5UXCJ9OiBpbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIn1gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudE5vdFBvcHVsYXRlZChhcnJheSwgYXJyYXlOYW1lLCBsaW5lKSB7XHJcbiAgICBpZiAoIWFycmF5KSB7XHJcbiAgICAgICAgYXJyYXkgPSBcIlVuZGVmaW5lZCBBcnJheVwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCFhcnJheU5hbWUpIHtcclxuICAgICAgICBhcnJheU5hbWUgPSBcIlVOTkFNRUQgQVJSQVlcIjtcclxuICAgIH1cclxuICAgIGNvbnNvbGUuZXJyb3IoYEVMRU1FTlQgUE9QVUxBVElPTiBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gdmFsaWRhbmRvICR7YXJyYXlOYW1lIHx8IFwiTlVMTFwifS5cbiAgQXJyYXk6ICR7QXJyYXkuaXNBcnJheShhcnJheSl9O1xuICBMaXN0IG91IENvbGxlY3Rpb246ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycmF5KT8uc2xpY2UoOCwgLTEpIHx8IFwiTlVMTFwifTtcbiAgTGVuZ3RoIG9idGlkYTogJHthcnJheT8ubGVuZ3RoIHx8IFwiMFwifTtcbiAgU3RyaW5naWZpY2HDp8OjbzogJHtKU09OLnN0cmluZ2lmeShhcnJheSkgPz8gXCJOVUxMXCJ9YCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChsaW5lLCBjb250ZXh0LCAuLi5lbGVtZW50cykge1xyXG4gICAgaWYgKCFjb250ZXh0IHx8IGNvbnRleHQgPT09IFwiXCIpIHtcclxuICAgICAgICBjb250ZXh0ID0gXCJVbmRlZmluZWQgQ29udGV4dFwiO1xyXG4gICAgfVxyXG4gICAgbGV0IGVycm9yTWVzc2FnZSA9IGBNVUxUSVBMRSBFTEVNRU5UUyBOT1QgRk9VTkQsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyAke2NvbnRleHQgfHwgXCJVbmRlZmluZWQgRnVuY3Rpb24gTmFtZVwifS5gO1xyXG4gICAgY29uc3QgbWFwcGVkTnVsbEVsZW1lbnRzID0gZWxlbWVudHMubWFwKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCA/IFwiTlVMTFwiIDogZWxlbWVudCk7XHJcbiAgICBtYXBwZWROdWxsRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgKGVsZW1lbnQudHlwZSA9PT0gXCJyYWRpb1wiIHx8IGVsZW1lbnQudHlwZSA9PT0gXCJjaGVja2JveFwiKSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0w6JuY2lhIGRlICR7ZWxlbWVudC5pZCB8fCBcIk5VTExcIn0gb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifTtcXG5cbiAgICAgICAgLmNoZWNrZWQgb2J0aWRvOiAke2VsZW1lbnQ/LmNoZWNrZWQgfHwgXCJOVUxMXCJ9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdMOibmNpYSBkZSAke2VsZW1lbnQuaWQgfHwgXCJOVUxMXCJ9IG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIn07XFxuXG4gICAgICAgIC52YWx1ZSBvYnRpZG86ICR7ZWxlbWVudD8udmFsdWUgfHwgXCJOVUxMXCJ9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0w6JuY2lhIGRlICR7ZWxlbWVudC5pZCB8fCBcIk5VTExcIn0gb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifTtcXG5gO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5lcnJvcihlcnJvck1lc3NhZ2UpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50c05vdEZvdW5kRnVuY3Rpb24obGluZSwgZnVuY05hbWUsIC4uLmVsZW1lbnRzKSB7XHJcbiAgICBsZXQgZXJyb3JNZXNzYWdlID0gYEVMRU1FTlRTIE5PVCBGT1VORCBGT1IgRlVOQ1RJT04sIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhIG9idGlkYSBwYXJhICR7ZnVuY05hbWUgfHwgXCJOVUxMXCJ9YDtcclxuICAgIGNvbnN0IG1hcHBlZE51bGxFbGVtZW50cyA9IGVsZW1lbnRzLm1hcCgoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQgPyBcIk5VTExcIiA6IGVsZW1lbnQpO1xyXG4gICAgbWFwcGVkTnVsbEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgIChlbGVtZW50LnR5cGUgPT09IFwicmFkaW9cIiB8fCBlbGVtZW50LnR5cGUgPT09IFwiY2hlY2tib3hcIikpIHtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdMOibmNpYSBkZSAke2VsZW1lbnQuaWQgfHwgXCJOVUxMXCJ9IG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIn07XFxuXG4gICAgICAgIC5jaGVja2VkIG9idGlkbzogJHtlbGVtZW50Py5jaGVja2VkIHx8IFwiTlVMTFwifWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gYEluc3TDom5jaWEgZGUgJHtlbGVtZW50LmlkIHx8IFwiTlVMTFwifSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJ9O1xcblxuICAgICAgICAudmFsdWUgb2J0aWRvOiAke2VsZW1lbnQ/LnZhbHVlIHx8IFwiTlVMTFwifWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdMOibmNpYSBkZSAke2VsZW1lbnQ/LmlkIHx8IFwiTlVMTFwifSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJ9O1xcbmA7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bWJlckVycm9yKHVudmFsaWROdW1iZXIsIHRpdGxlLCBsaW5lKSB7XHJcbiAgICBpZiAoIXVudmFsaWROdW1iZXIpIHtcclxuICAgICAgICB1bnZhbGlkTnVtYmVyID0gXCIwXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHVudmFsaWROdW1iZXIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICB1bnZhbGlkTnVtYmVyID0gdW52YWxpZE51bWJlci50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcihgTUFYIE5VTUJFUiBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIE7Dum1lcm8gZGUgJHt0aXRsZSB8fCBcIlVuZGVmaW5lZCBUaXRsZVwifSBpbnbDoWxpZG9zLlxuICBOw7ptZXJvIG3DoXhpbW8gb2J0aWRvOiAke3BhcnNlSW50KHVudmFsaWROdW1iZXIsIDEwKSB8fCAwfWApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdFcnJvcihjb250ZXh0LCB0ZXh0LCBsaW5lKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBTVFJJTkcgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvICR7Y29udGV4dH0uXG4gIFZhbG9yIG9idGlkbzogJHt0ZXh0ID8/IFwiTlVMTFwifWApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRjaEVycm9yKGNvbnRleHQsIGVsZW1lbnQsIHRleHQsIGxpbmUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYE1BVENIIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gJHtjb250ZXh0IHx8IFwiVW5kZWZpbmVkIENvbnRleHRcIn0uXG4gIEVsZW1lbnRvIG9idGlkbzogJHtlbGVtZW50IHx8IFwiVU5ERUZJTkVEIEVMRU1FTlRcIn07XG4gIFTDrXR1bG8gb2J0aWRvOiAke3RleHQgfHwgXCJVbmRlZmluZWQgVGl0bGVcIn0uYCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHR5cGVFcnJvcihjb250ZXh0LCBlbGVtZW50LCBhY2NlcHRlZFR5cGUsIGxpbmUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYFRZUEUgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBUaXBvIHByaW1pdGl2byBvYnRpZG8gcGFyYSAke2NvbnRleHQgfHwgXCJVbmRlZmluZWQgQ29udGV4dFwifSBpbmNvcnJldG8uXG4gIFRpcG8gb2J0aWRvOiAke3R5cGVvZiBlbGVtZW50ID8/IFwiVW5kZWZpbmVkIHR5cGVvZlwifTtcbiAgVGlwbyBhY2VpdG86ICR7YWNjZXB0ZWRUeXBlIHx8IFwiVW5kZWZpbmVkIEFjY2VwdGVkIFR5cGVcIn1gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0RXJyb3IoY29udGV4dCwgb2JqZWN0LCBvYmplY3ROYW1lLCBtYXhQcm9wZXJ0aWVzTnVtYmVyLCBsaW5lKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBPQkpFQ1QgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyAke29iamVjdE5hbWUgPz8gXCJVTkRFRklORUQgT0JKRUNUIE5BTUVcIn0gcGFyYSAke2NvbnRleHQgfHwgXCJVbmRlZmluZWQgQ29udGV4dFwifS5cbiAgT2JqZWN0byBvYnRpZG86ICR7SlNPTi5zdHJpbmdpZnkob2JqZWN0KSA/PyBcIlVuZGVmaW5lZCBPYmplY3RcIn07XG4gIE7Dum1lcm8gb2J0aWRvIGRlIHByb3ByaWVkYWRlczogJHtPYmplY3Qua2V5cy5sZW5ndGggPz8gMH07IE7Dum1lcm8gYWNlaXRvOiAke21heFByb3BlcnRpZXNOdW1iZXIgPz8gMH1gKTtcclxufVxyXG4iLCIvL25lc3NlIGZpbGUgZXN0w6NvIHByZXNlbnRlcyBwcmluY2lwYWxtZW50ZSBhcyBmdW7Dp8O1ZXMgZGUgbWFuaXB1bGHDp8OjbyBkaW7Dom1pY2EgZGUgdGV4dG8gZSBsYXlvdXRcclxuaW1wb3J0ICogYXMgR2xvYmFsTW9kZWwgZnJvbSBcIi4vZ01vZGVsXCI7XHJcbmltcG9ydCB7IEpTT05TdG9yYWdlciwgSlNPTlRpdGxlU3RvcmFnZXIgfSBmcm9tIFwiLi9jbGFzc2VzXCI7XHJcbmltcG9ydCAqIGFzIEVycm9ySGFuZGxlciBmcm9tIFwiLi9lcnJvckhhbmRsZXJcIjtcclxuLy8gaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuY29uc3QgbWFwSWRzVGl0bGVzID0ge1xyXG4gICAgZmlyc3ROYW1lSWQ6IFwiUHJpbWVpcm9fTm9tZVwiLFxyXG4gICAgYWRkaXRpb25hbE5hbWVJZDogXCJTb2JyZW5vbWVfZG9fTWVpb1wiLFxyXG4gICAgZmFtaWx5TmFtZUlkOiBcIsOabHRpbW9fU29icmVub21lXCIsXHJcbiAgICBzb2NpYWxOYW1lSWQ6IFwiTm9tZV9Tb2NpYWxcIixcclxuICAgIHRlbEFyZWFDb2RlSWQ6IFwiREREXCIsXHJcbiAgICB0ZWxJZDogXCJUZWxlZm9uZVwiLFxyXG4gICAgdGVsQ291bnRyeUNvZGVJZDogXCJTZV9lc3RyYW5nZWlybyxfY8OzZGlnb19kb19QYcOtc1wiLFxyXG4gICAgdGVsMkFyZWFDb2RlSWQ6IFwiREREX0RvX1RlbGVmb25lX1NlY3VuZMOhcmlvXCIsXHJcbiAgICB0ZWwySWQ6IFwiVGVsZWZvbmVfU2VjdW5kw6FyaW9cIixcclxuICAgIHRlbDJDb3VudHJ5Q29kZUlkOiBcIlNlX2VzdHJhbmdlaXJvKHNlY3VuZMOhcmlvKSxfY8OzZGlnb19kb19QYcOtc1wiLFxyXG4gICAgZW1haWwxSWQ6IFwiRW1haWxcIixcclxuICAgIGVtYWlsMklkOiBcIkVtYWlsX1NlY3VuZMOhcmlvXCIsXHJcbiAgICBkYXRlQWdlSWQ6IFwiSWRhZGVcIixcclxuICAgIGdlbmlkOiBcIkfDqm5lcm9cIixcclxuICAgIGdlbkJpcnRoUmVsSWQ6IFwiSWRlbnRpZGFkZV9lbV9yZWxhw6fDo29fYW9fZ8OqbmVyb19kZXNpZ25hZG9fbmFfbmFzY2Vuw6dhXCIsXHJcbiAgICBnZW5UcmFuc0lkOiBcIkVzdMOhZ2lvX2RhX1RyYW5zacOnw6NvX0hvcm1vbmFsXCIsXHJcbiAgICBnZW5GaXNBbGluSWQ6IFwiQWxpbmhhbWVudG9fZGVfY2FyYWN0ZXLDrXN0aWNhc19mw61zaWNhc19wcmVkb21pbmFudGVcIixcclxufTtcclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNpbXBsZVByb3BlcnR5KGVsZW1lbnQpIHtcclxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50LnR5cGUgPT09IFwicmFkaW9cIiB8fCBlbGVtZW50LnR5cGUgPT09IFwiY2hlY2tib3hcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5jaGVja2VkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGVsZW1lbnQudHlwZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlRmxvYXQoZWxlbWVudC52YWx1ZS5yZXBsYWNlQWxsKC9bXjAtOS4sKy1dL2csIFwiXCIpKSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgZWxlbWVudC52YWx1ZSByZXRvcm5hZG8gY29tbyBOYU4sIHJldmVydGlkbyBwYXJhIDAuYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGVsZW1lbnQudmFsdWUucmVwbGFjZUFsbCgvW14wLTkuLCstXS9nLCBcIlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZWxlbWVudC50eXBlID09PSBcInRleHRcIiB8fCBlbGVtZW50LnR5cGUgPT09IFwiZGF0ZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyB0eXBlIGRlIElucHV0IHBhcmEgYXR1YWxpemHDp8OjbyBkZSBwcm9wcmllZGFkZSBkZSBwZXJzb24uXG4gICAgICBUaXBvIG9idGlkbzogJHtlbGVtZW50Py50eXBlID8/IFwibnVsbFwifWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxyXG4gICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIEVsZW1lbnQgcGFyYSBhdHVhbGl6YcOnw6NvIGRlIHByb3ByaWVkYWRlIGRlIHBlcnNvbi5cbiAgICBJbnN0w6JuY2lhIG9iaXRkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCkuc2xpY2UoOCwgLTEpID8/IFwibnVsbFwifWApO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjdXJzb3JDaGVja1RpbWVyKGN1cnNvclBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICBpZiAoc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5mb2N1c05vZGUgIT09IG51bGwpIHtcclxuICAgICAgICBjdXJzb3JQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApPy5zdGFydE9mZnNldDtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnNvclBvc2l0aW9uO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEpTT05EZXNjKGlucHV0cykge1xyXG4gICAgY29uc3QgdGl0bGVFbGVtZW50cyA9IFtdO1xyXG4gICAgY29uc3QgY2xvc2VzdFZhbGlkRWxlbWVudHMgPSBbXTtcclxuICAgIGNvbnN0IGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzID0gW107XHJcbiAgICBjb25zdCBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzID0gW107XHJcbiAgICBjb25zdCBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzSWRzID0gW107XHJcbiAgICBjb25zdCBpbnBWYWx1ZXMgPSBbXTtcclxuICAgIGNvbnN0IGlucElkcyA9IFtdO1xyXG4gICAgY29uc3QgSlNPTklucHNTdG9yZURlc2NyaXB0b3JzID0gW107XHJcbiAgICBjb25zdCBKU09OVGl0bGVzU3RvcmVEZXNjcmlwdG9ycyA9IFtdO1xyXG4gICAgbGV0IEpTT05JbnBzU3RvcmUgPSBbXTtcclxuICAgIGxldCBKU09OVGl0bGVzU3RvcmUgPSBbXTtcclxuICAgIGxldCB0aXRsZUFjYyA9IDA7XHJcbiAgICBsZXQgbnVsbFRpdGxlQWNjID0gMDtcclxuICAgIC8vZGV0ZXJtaW5hw6fDo28gZG8gbsO6bWVybyBkZSBpbnB1dHMgZGUgaWRlbnRpZmljYcOnw6NvIGN1am9zIHTDrXR1bG9zIHPDo28gZGUgaW50ZXJlc3NlIGUgY29uc3RydcOnw6NvIGRlIHN1YmFycmF5IHBhcmEgZXN0ZXNcclxuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgaW5wdXRzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgaWYgKGlucHV0c1trXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wSWRlbnRpZlwiKSkge1xyXG4gICAgICAgICAgICB0aXRsZUVsZW1lbnRzLnB1c2goaW5wdXRzW2tdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2xvb3AgcGFyYSBjb25zdHJ1w6fDo28gZG9zIGFycmF5cyBpbmljaWFzIGRlIGlkcyBlIHZhbHVlc1xyXG4gICAgZm9yIChsZXQgeiA9IDA7IHogPCBpbnB1dHMubGVuZ3RoOyB6KyspIHtcclxuICAgICAgICBpZiAoaW5wdXRzW3pdIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRzW3pdPy50eXBlID09PSBcInJhZGlvXCIgfHxcclxuICAgICAgICAgICAgICAgIGlucHV0c1t6XT8udHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIGlucFZhbHVlcy5wdXNoKGlucHV0c1t6XT8uY2hlY2tlZC50b1N0cmluZygpID8/IFwiZmFsc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRzW3pdLmlkID09PSBcImNvbmZybUxvY0lkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnBJZHMucHVzaChcImNvbmZpcm1Mb2NcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlucFZhbHVlcy5wdXNoKGlucHV0c1t6XT8udmFsdWUgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlucHV0c1t6XSBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHxcclxuICAgICAgICAgICAgaW5wdXRzW3pdIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaW5wSWRzLnB1c2goaW5wdXRzW3pdPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgIGlucFZhbHVlcy5wdXNoKGlucHV0c1t6XT8udmFsdWUgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbnB1dHNbel0/LmNvbnRlbnRFZGl0YWJsZSA9PT0gXCJ0cnVlXCIgfHxcclxuICAgICAgICAgICAgaW5wdXRzW3pdPy5pZCA9PT0gXCJjaXRlTmFtZUlkXCIpIHtcclxuICAgICAgICAgICAgaW5wSWRzLnB1c2goaW5wdXRzW3pdPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgIGlucFZhbHVlcy5wdXNoKGlucHV0c1t6XT8udGV4dENvbnRlbnQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gZWxlbWVudG8uIEVsZW1lbnRvICR7aW5wdXRzW3pdID8/IFwibnVsbFwifTsgaW5zdMOibmNpYSAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgIC5jYWxsKGlucHV0c1t6XSlcclxuICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSl9OyBpZCAke2lucHV0c1t6XT8uaWQgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9sb29wIHBhcmEgYWp1c3RlIGRvcyBlbGVtZW50b3MgZG9zIGFycmF5cyBkZSBpbnB1dHMgZSBjb25zdHJ1w6fDo28gZG9zIHN0b3JhZ2VyIGRlIGlucHV0c1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbnB1dHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAvL2ZpbHRyYWdlbSBkZSB0aXBvcyBwcmltaXRpdm9zIGRlIHZhbHVlc1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wVmFsdWVzW2pdID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnBWYWx1ZXNbal0gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGlucFZhbHVlc1tqXSA9IGlucFZhbHVlc1tqXS5yZXBsYWNlKFwiXCIsIFwibnVsbFwiKSA/PyBcIm51bGxcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaW5wVmFsdWVzW2pdID0gaW5wVmFsdWVzW2pdPy50b1N0cmluZygpID8/IFwibnVsbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2F2YWxpYWRvciBkZSBpZHMgbnVsYXNcclxuICAgICAgICBpZiAoaW5wSWRzW2pdPy5tYXRjaCgvbnVsbC9nKSB8fFxyXG4gICAgICAgICAgICBpbnBJZHNbal0gPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICBpbnBJZHNbal0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBJZCBudWxsIGRldGVjdGFkYS4gVMOtdHVsbyByZWxhdGl2bzogJHtjbG9zZXN0VmFsaWRFbGVtZW50c1tqXSA/PyBcIm51bGxcIn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jcmlhw6fDo28gZG8gc3RvcmFnZXJcclxuICAgICAgICBjb25zdCBuSlNPTklucFN0b3JhZ2VyID0gbmV3IEpTT05TdG9yYWdlcihpbnBJZHNbal0sIGlucFZhbHVlc1tqXSk7XHJcbiAgICAgICAgLy9jcmlhw6fDo28gZGEgc3RvcmVcclxuICAgICAgICBpZiAobkpTT05JbnBTdG9yYWdlcikge1xyXG4gICAgICAgICAgICBKU09OSW5wc1N0b3JlLnB1c2gobkpTT05JbnBTdG9yYWdlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBuSlNPTklucFN0b3JhZ2VyLnNob3dBbGxJbmZvOyAvL1RPRE8gRVhQT1NJw4fDg08gREUgREFET1MgU09NRU5URSBQQVJBIEZJTkFMSURBREVTIERFIFRFU1RFLCBQT0lTIFBST1BSSUVEQURFUyBQUklWQURBUyBOw4NPIFPDg08gRU5VTUVSw4FWRUlTXHJcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlRGVzY3JpcHRvcnMucHVzaChkZXNjcmlwdG9yLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBkZXNjcmlwdG9yIHBhcmEgaW5zdMOibmNpYSAke2p9IGRlIEpTT05TdG9yYWdlcmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgJHtqfSBkZSBKU09OU3RvcmFnZXJgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2xvb3AgcGFyYSBleHRyYWlyIHTDrXR1bG9zL2xhYmVscyBkZSBpbnRlcmVzc2VcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGl0bGVFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRpdGxlQWNjKys7XHJcbiAgICAgICAgLy9sb29wIHBhcmEgbcO6bHRpcGxhcyB0ZW50YXRpdmFzIGRlIGxvY2FsaXphw6fDo28gZG8gdGV4dG8gZGUgaW50ZXJlc3NlXHJcbiAgICAgICAgbGV0IGNsb3Nlc3RQYXJlbnQgPSB0aXRsZUVsZW1lbnRzW2ldPy5jbG9zZXN0KFwic3BhblwiKSB8fCB0aXRsZUVsZW1lbnRzW2ldPy5jbG9zZXN0KFwibGFiZWxcIik7XHJcbiAgICAgICAgaWYgKGNsb3Nlc3RQYXJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IGxvb3BBY2MgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAobG9vcEFjYyA8IDEwICYmIGNsb3Nlc3RQYXJlbnQudGV4dENvbnRlbnQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vbG9vcCBwYXJhIGVzY2FsYWRhIGdlbmVhbMOzZ2ljYSBhdMOpIGVuY29udHJhciBwYXJlbnQgZGUgaW50ZXJlc3NlIG91IGRlc2lzdGlyIGFww7NzIDEwIGl0ZXJhw6fDtWVzXHJcbiAgICAgICAgICAgICAgICBsb29wQWNjKys7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50ID1cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py5jbG9zZXN0KFwic3BhblwiKSB8fCBjbG9zZXN0UGFyZW50Py5jbG9zZXN0KFwibGFiZWxcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiXCIgfHwgbG9vcEFjYyA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgPT09IFwiU2ltXCIgfHwgLy9lbnRyYWRhIGVtIGxvb3AgcGFyYSBlbGltaW5hciBwYXJlbnRzIGNvbSB0ZXh0IHNpbS9uw6NvIChuw6NvIGluZm9ybWF0aXZvKSBvdSBkZXNpc3RpciBhcMOzcyAxMCBpdGVyYcOnw7Vlc1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ID09PSBcIk7Do29cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvb2xlYW5QYXJlbnRDb3B5ID0gY2xvc2VzdFBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzLnB1c2goYm9vbGVhblBhcmVudENvcHk/LnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/IGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzSWRzLnB1c2goYm9vbGVhblBhcmVudENvcHkuaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChsb29wQWNjIDwgMTAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xvc2VzdFBhcmVudC50ZXh0Q29udGVudCA9PT0gXCJTaW1cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudC50ZXh0Q29udGVudCA9PT0gXCJOw6NvXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3BBY2MrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py5jbG9zZXN0KFwic3BhblwiKSB8fCBjbG9zZXN0UGFyZW50Py5jbG9zZXN0KFwibGFiZWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY2xvc2VzdFBhcmVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiU2ltXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ICE9PSBcIk7Do29cIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiXCIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29wQWNjID4gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKGNsb3Nlc3RQYXJlbnQ/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy50eXBlID09PSBcInJhZGlvXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nIGluc3RhbmNlb2ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIVE1MTGFiZWxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc/LmNsYXNzTGlzdC5jb250YWlucyhcImJvb2xPcFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkLm1hdGNoKC9ZZXMvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2godGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKC0zKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bGxcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGl0bGVFbGVtZW50c1tpXT8uaWQubWF0Y2goL05vLykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkPy5zbGljZSgtMikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJudWxsXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhc28gaW5lc3BlcmFkbyBkZSBib29sT3AgUmFkaW8gKyBMYWJlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodGl0bGVFbGVtZW50c1tpXSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uYW1lID09PSBcIm5pdmVsRnVtb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZD8uc2xpY2UoMCwgMSk/LnRvVXBwZXJDYXNlKCkgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJudWxsXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKDEsIDQpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LmlkPy5zbGljZSg0LCA4KSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZUVsZW1lbnRzW2ldPy5jbGFzc0xpc3QuY29udGFpbnMoXCJvcEZ1bVN1YnNcIikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nPy50ZXh0Q29udGVudCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc/LnRleHRDb250ZW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wQW50TWVkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChcIlRyYXRhbWVudG9fTcOpZGljb1wiICsgXCJfXCIgKyB0aXRsZUVsZW1lbnRzW2ldPy5pZC5zbGljZSgtMSkgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkID09PSBcImNpdGVOYW1lSWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFwiQXNzaW5hdHVyYV9Vc3XDoXJpb1wiID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFBhcmVudD8uaWQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9vYnRlbsOnw6NvIGRlIGlkcyBkb3MgJ3BhcmVudHMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29ycmXDp8OjbyBkZSBpZCBkZSBpbnRlcmVzc2UgY2FzbyBhIGRvIHBhcmVudCBuw6NvIGVzdGVqYSBwcmVzZW50ZSAoYXRlbsOnw6NvOiBkZXNhc3NvY2lhIGlkIGUgdGV4dCBkZSBpbnRlcmVzc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2goY2xvc2VzdFBhcmVudD8uaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjbG9zZXN0UGFyZW50LmlkID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRFU2libGluZyA9IHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRFU2libGluZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEVTaWJsaW5nIGluc3RhbmNlb2YgSFRNTExhYmVsRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEVTaWJsaW5nLnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKG5leHRFU2libGluZy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c0VTaWJsaW5nID0gdGl0bGVFbGVtZW50c1tpXT8ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c0VTaWJsaW5nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNFU2libGluZyBpbnN0YW5jZW9mIEhUTUxMYWJlbEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0VTaWJsaW5nLnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaChwcmV2aW91c0VTaWJsaW5nLmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ucGxhY2Vob2xkZXIgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgTmVuaHVtYSBpZCBwcsOzeGltYSB2w6FsaWRhIHJldG9ybmFkYSBwYXJhIG8gaW5wdXQgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIGFvIGxvY2FsaXphciB0ZXh0Q29udGVudCBkZSBwYXJlbnRgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9zZSBmYWxoYSBlbSBwYXJlbnRzLCBwcm9jdXJhIGVtIHNpYmxpbmdzIDxsYWJlbD4gb3UgZW0gcGxhY2Vob2xkZXJzIGRlIHRleHRhcmVhc1xyXG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1NpYmxpbmcgPSB0aXRsZUVsZW1lbnRzW2ldPy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAocHJldmlvdXNTaWJsaW5nIGluc3RhbmNlb2YgSFRNTExhYmVsRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHByZXZpb3VzU2libGluZy50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/IGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2gocHJldmlvdXNTaWJsaW5nLmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LnBsYWNlaG9sZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5wbGFjZWhvbGRlciA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/IGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8udHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcImZhbU9wXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwcGVyQ2FzZU1hdGNoID0gdGl0bGVFbGVtZW50c1tpXT8uaWQ/Lm1hdGNoKC9GYW0vZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cHBlckNhc2VNYXRjaCAmJiB0aXRsZUVsZW1lbnRzW2ldPy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBwZXJDYXNlSW5kZXggPSB0aXRsZUVsZW1lbnRzW2ldPy5pZC5pbmRleE9mKFwiRmFtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkSWQgPSB0aXRsZUVsZW1lbnRzW2ldPy5pZC5zbGljZSgwLCB1cHBlckNhc2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHNsaWNlZElkICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dFNpYmxpbmc/LnRleHRDb250ZW50Py5yZXBsYWNlQWxsKC9eW1xcc10rL2csIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRTaWJsaW5nPy50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCgvXltcXHNdKy9nLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcIm9wSGVwXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXCJIZXBhdGl0ZV9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0U2libGluZz8udGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwoL15bXFxzXSsvZywgXCJcIikgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkICE9PSBcImNvbmZpcm1JZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRTaWJsaW5nPy50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCgvXltcXHNdKy9nLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkID09PSBcImNvbmZpcm1JZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFwiQ29uY29yZG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BIQVNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5uZXh0U2libGluZz8udGV4dENvbnRlbnQ/LnRyaW0oKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0RVNpYmxpbmcgPSB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0RVNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0RVNpYmxpbmcudGV4dENvbnRlbnQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2gobmV4dEVTaWJsaW5nLnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaChuZXh0RVNpYmxpbmcuaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBwYXJlbnRzLCBsYWJlbHMsIHBsYWNlaG9sZGVycyBlIHRleHRDb250ZW50LiBJZCBkbyBJbnB1dDogJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBudWxsfTsgdGV4dENvbnRlbnQgJHt0aXRsZUVsZW1lbnRzW2ldPy50ZXh0Q29udGVudCA/PyBudWxsfTsgcGxhY2Vob2xkZXIgJHt0aXRsZUVsZW1lbnRzW2ldPy5wbGFjZWhvbGRlciA/PyBudWxsfTsgw5psdGltYSBJbnN0w6JuY2lhIGRlIFBhcmVudCBhdmFsaWFkYSAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChjbG9zZXN0UGFyZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSl9OyBJbnN0w6JuY2lhIGRlIFNpYmxpbmcgTGFiZWxzICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKHByZXZpb3VzU2libGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoOCwgLTEpfSAmJiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChuZXh0RVNpYmxpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vbG9vcCBwYXJhIGFqdXN0ZSBkb3MgZWxlbWVudG9zIGRvcyBhcnJheXMgZGUgdGl0bGVzIGUgY29uc3RydcOnw6NvIGRvcyBzdG9yYWdlciBkZSB0aXRsZXNcclxuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGl0bGVFbGVtZW50cy5sZW5ndGg7IGwrKykge1xyXG4gICAgICAgIC8vY29ycmXDp8OjbyBkZSBtw7psdGlwbG9zIGVzcGHDp29zIGVtIGxhYmVscyBlIHRpdGxlc1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlU3BhY2VNYXRjaGVzID0gY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0/Lm1hdGNoKC9cXHNcXHMvKSA/PyBudWxsO1xyXG4gICAgICAgIGlmIChjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSAmJlxyXG4gICAgICAgICAgICBtdWx0aXBsZVNwYWNlTWF0Y2hlcyAmJlxyXG4gICAgICAgICAgICBtdWx0aXBsZVNwYWNlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwYWNlTWF0Y2hlc0FycmF5ID0gW107XHJcbiAgICAgICAgICAgIG11bHRpcGxlU3BhY2VNYXRjaGVzLmZvckVhY2goKG11bHRpcGxlU3BhY2VNYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVTcGFjZUluZGV4ID0gY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0/LmluZGV4T2YobXVsdGlwbGVTcGFjZU1hdGNoKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgc3BhY2VNYXRjaGVzQXJyYXkucHVzaChtdWx0aXBsZVNwYWNlSW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCBzcGFjZU1hdGNoZXNBcnJheS5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gPVxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdPy5zbGljZSgwLCBzcGFjZU1hdGNoZXNBcnJheVttXSkudHJpbSgpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibnVsbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYXZhbGlhZG9yIGRlIGxhYmVscyBlIHRpdGxlcyBudWxvc1xyXG4gICAgICAgIGlmIChjbG9zZXN0VmFsaWRFbGVtZW50c1tsXT8ubWF0Y2goL1tObl1bVXVdW0xsXVtMbF0vZykgfHxcclxuICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgaW5wVmFsdWUgPSBpbnB1dHNbbF0/LnZhbHVlIHx8IFwibnVsbFwiO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRzW2xdIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgKGlucHV0c1tsXT8udHlwZSA9PT0gXCJyYWRpb1wiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzW2xdPy50eXBlID09PSBcImNoZWNrYm94XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBpbnBWYWx1ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzW2xdPy5jaGVja2VkLnRvU3RyaW5nKCkgPz8gXCJmYWxzZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG51bGxUaXRsZUFjYysrO1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFTDrXR1bG8gbnVsbyBkZXRlY3RhZG86IE7Dum1lcm8gZGUgYWPDum11bG86ICR7bnVsbFRpdGxlQWNjfS5cbiAgICAgICAgICAgIFTDrXR1bG86ICR7Y2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gfHwgY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gfHwgXCJudWxsXCJ9O1xuICAgICAgICAgICAgaW5zdMOibmNpYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAuY2FsbChjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSlcclxuICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSkgPz8gXCJ1bmRlZmluZWRcIn07XG4gICAgICAgICAgICBJZCBkZSBpbnB1dCBwYXJlYWRhOiAke2lucHV0c1tsXT8uaWQgPz8gXCJudWxsXCJ9O1xuICAgICAgICAgICAgVmFsb3IgZGUgaW5wdXQgcGFyZWFkbyAke2lucFZhbHVlIHx8IFwibnVsbFwifWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NyaWHDp8OjbyBkbyBzdG9yYWdlclxyXG4gICAgICAgIGNvbnN0IG5KU09OVGl0bGVTdG9yYWdlciA9IG5ldyBKU09OVGl0bGVTdG9yYWdlcihjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSk7XHJcbiAgICAgICAgLy9jcmlhw6fDo28gZGEgc3RvcmVcclxuICAgICAgICBpZiAobkpTT05UaXRsZVN0b3JhZ2VyKSB7XHJcbiAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZS5wdXNoKG5KU09OVGl0bGVTdG9yYWdlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBuSlNPTlRpdGxlU3RvcmFnZXIuc2hvd0lucFRpdGxlOyAvL1RPRE8gRVhQT1NJw4fDg08gREUgREFET1MgU09NRU5URSBQQVJBIEZJTkFMSURBREVTIERFIFRFU1RFLCBQT0lTIFBST1BSSUVEQURFUyBQUklWQURBUyBOw4NPIFPDg08gRU5VTUVSw4FWRUlTXHJcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmVEZXNjcmlwdG9ycy5wdXNoKGRlc2NyaXB0b3IudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIGRlc2NyaXB0b3IgcGFyYSBpbnN0w6JuY2lhICR7bH0gZGUgSlNPTlN0b3JhZ2VyYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYSAke2x9IGRlIEpTT05TdG9yYWdlcmApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vZmlsdHJvIGUgdmFsaWRhw6fDo28gZGEgc3RvcmVcclxuICAgIGlmIChKU09OSW5wc1N0b3JlRGVzY3JpcHRvcnMubGVuZ3RoID09PSBKU09OSW5wc1N0b3JlLmxlbmd0aCAmJlxyXG4gICAgICAgIEpTT05UaXRsZXNTdG9yZURlc2NyaXB0b3JzLmxlbmd0aCA9PT0gSlNPTlRpdGxlc1N0b3JlLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcjFKU09OSW5wc1N0b3JlID0gSlNPTklucHNTdG9yZS5maWx0ZXIoKEpTT05FbCkgPT4gdHlwZW9mIEpTT05FbCA9PT0gXCJvYmplY3RcIik7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyMUpTT05UaXRsZXNTdG9yZSA9IEpTT05UaXRsZXNTdG9yZS5maWx0ZXIoKEpTT05FbCkgPT4gdHlwZW9mIEpTT05FbCA9PT0gXCJvYmplY3RcIik7XHJcbiAgICAgICAgaWYgKGZpbHRlcjFKU09OSW5wc1N0b3JlLmxlbmd0aCA9PT0gSlNPTklucHNTdG9yZS5sZW5ndGggJiZcclxuICAgICAgICAgICAgZmlsdGVyMUpTT05UaXRsZXNTdG9yZS5sZW5ndGggPT09IEpTT05UaXRsZXNTdG9yZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgSlNPTklucHNTdG9yZSA9IGZpbHRlcjFKU09OSW5wc1N0b3JlO1xyXG4gICAgICAgICAgICBKU09OVGl0bGVzU3RvcmUgPSBmaWx0ZXIxSlNPTlRpdGxlc1N0b3JlO1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXIySlNPTklucHNTdG9yZSA9IEpTT05JbnBzU3RvcmUuZmlsdGVyKChKU09ORWwpID0+IEpTT05FbCBpbnN0YW5jZW9mIEpTT05TdG9yYWdlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcjJKU09OVGl0bGVzU3RvcmUgPSBKU09OVGl0bGVzU3RvcmUuZmlsdGVyKChKU09ORWwpID0+IEpTT05FbCBpbnN0YW5jZW9mIEpTT05UaXRsZVN0b3JhZ2VyKTtcclxuICAgICAgICAgICAgaWYgKGZpbHRlcjJKU09OSW5wc1N0b3JlLmxlbmd0aCA9PT0gSlNPTklucHNTdG9yZS5sZW5ndGggJiZcclxuICAgICAgICAgICAgICAgIGZpbHRlcjFKU09OVGl0bGVzU3RvcmUubGVuZ3RoID09PSBKU09OVGl0bGVzU3RvcmUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlID0gZmlsdGVyMkpTT05JbnBzU3RvcmUuc29ydCgpO1xyXG4gICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlID0gZmlsdGVyMkpTT05UaXRsZXNTdG9yZS5zb3J0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQgPSBbXTtcclxuICAgICAgICAgICAgICAgIC8vc3RyaW5naWZpY2HDp8OjbyBkYXMgc3RvcmVzXHJcbiAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlLmZvckVhY2goKGZvcm1FbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsVmFsdWVzID0gZm9ybUVsLnNob3dBbGxJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsVmFsdWVzU3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShlbFZhbHVlcyk7IC8vVE9ETyBEQURPUyBFWFBPU1RPIFNPTUVOVEUgUEFSQSBGSU5TIERFIFRFU1RFXHJcbiAgICAgICAgICAgICAgICAgICAgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkLnB1c2goZWxWYWx1ZXNTdHJpbmdpZmllZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZS5mb3JFYWNoKChmb3JtRWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbFZhbHVlcyA9IGZvcm1FbC5zaG93SW5wVGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxWYWx1ZXNTdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KGVsVmFsdWVzKTsgLy9UT0RPIERBRE9TIEVYUE9TVE8gU09NRU5URSBQQVJBIEZJTlMgREUgVEVTVEVcclxuICAgICAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmVTdHJpbmdpZmllZC5wdXNoKGVsVmFsdWVzU3RyaW5naWZpZWQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQgPSBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQuc29ydCgpO1xyXG4gICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQgPSBKU09OVGl0bGVzU3RvcmVTdHJpbmdpZmllZC5zb3J0KCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbmNsdXPDo29cclxuICAgICAgICAgICAgICAgIGlmIChKU09OSW5wc1N0b3JlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgXTsgLy9zdHJpbmdpZmllZCDDqSBhIHZlcnPDo28gdXNhZGEgY29tbyBEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGwsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBjbGFzc2VzIGRlIGVsZW1lbnRvcyBubyBKU09OU3RvcmUuIFxuICAgICAgICAgIE7Dum1lcm8gZGUgaW5zdMOibmNpYXMgb2J0aWRhcyBwYXJhIGlucHV0czogJHtmaWx0ZXIySlNPTklucHNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07IE7Dum1lcm8gZXNwZXJhZG86ICR7SlNPTklucHNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07XG4gICAgICAgICAgTsO6bWVybyBkZSBpbnN0w6JuY2lhcyBvYnRpZGFzIHBhcmEgdGl0bGVzOiAke2ZpbHRlcjJKU09OVGl0bGVzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9OyBOw7ptZXJvIGVzcGVyYWRvOiAke0pTT05UaXRsZXNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyB0aXBvcyBkZSBlbGVtZW50b3MgbmFzIEpTT05TdG9yZS4gXG4gICAgICAgIE7Dum1lcm8gZGUgb2JqZXRvcyBvYnRpZG9zIHBhcmEgaW5wdXRzOiAke2ZpbHRlcjFKU09OSW5wc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTsgTsO6bWVybyBlc3BlcmFkbzogJHtKU09OSW5wc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTtcbiAgICAgICAgTsO6bWVybyBkZSBvYmpldG9zIG9idGlkb3MgcGFyYSB0aXRsZXM6ICR7ZmlsdGVyMUpTT05UaXRsZXNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07IE7Dum1lcm8gZXNwZXJhZG86ICR7SlNPTlRpdGxlc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgTGVuZ3RoIGRlIEpTT04gU3RvcmUgRGVzY3JpcHRvcnMgaW52w6FsaWRhLiBcbiAgICAgIExlbmd0aCBvYnRpZGEgcGFyYSBpbnB1dHM6ICR7SlNPTklucHNTdG9yZURlc2NyaXB0b3JzLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTsgTGVuZ3RoIGVzcGVyYWRhOiAke0pTT05JbnBzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9O1xuICAgICAgTGVuZ3RoIG9idGlkYSBwYXJhIHRpdGxlczogJHtKU09OVGl0bGVzU3RvcmVEZXNjcmlwdG9ycy5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07IExlbmd0aCBlc3BlcmFkYTogJHtKU09OVGl0bGVzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9YCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUpTT05BbmNob3IoSlNPTkJ0biwgZm9ybUlucHNEZXNjcmlwdG9yKSB7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWRGb3JtRGVzY3JpcHRvciA9IGZvcm1hdEpTT05GaWxlKGZvcm1JbnBzRGVzY3JpcHRvcik7XHJcbiAgICBjb25zdCBKU09OQmxvYiA9IG5ldyBCbG9iKFtmb3JtYXR0ZWRGb3JtRGVzY3JpcHRvclsxXV0sIHtcclxuICAgICAgICB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgIH0pO1xyXG4gICAgY29uc3QgSlNPTkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgIEpTT05MaW5rLmlkID0gXCJhbmNob3JKU09OXCI7XHJcbiAgICBKU09OTGluay5jbGFzc05hbWUgPSBKU09OQnRuLmNsYXNzTmFtZTtcclxuICAgIEpTT05MaW5rLnN0eWxlLndpZHRoID0gSlNPTkJ0bi5zdHlsZS53aWR0aDtcclxuICAgIEpTT05MaW5rLnN0eWxlLmhlaWdodCA9IEpTT05CdG4uc3R5bGUuaGVpZ2h0O1xyXG4gICAgSlNPTkxpbmsudGV4dENvbnRlbnQgPSBcIkJhaXhhciBKU09OXCI7XHJcbiAgICBKU09OTGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChKU09OQmxvYik7XHJcbiAgICBKU09OTGluay5kb3dubG9hZCA9IFwiZm9ybURhdGEuanNvblwiO1xyXG4gICAgSlNPTkJ0bi5yZXBsYWNlV2l0aChKU09OTGluayk7XHJcbiAgICByZXR1cm4gSlNPTkxpbms7XHJcbn1cclxuZnVuY3Rpb24gZm9ybWF0SlNPTkZpbGUoZm9ybUlucHNEZXNjcmlwdG9yKSB7XHJcbiAgICBsZXQgZm9ybWF0Rm9ybURlc2NJZHMgPSBge1xcbmA7XHJcbiAgICBsZXQgZm9ybWF0Rm9ybURlc2NUaXRsZXMgPSBgYDtcclxuICAgIGxldCBmb3JtYXRGb3JtRGVzY0lkc1JlYWQgPSBge1xcbmA7XHJcbiAgICBsZXQgZm9ybWF0Rm9ybURlc2NUaXRsZXNSZWFkID0gYHtcXG5gO1xyXG4gICAgbGV0IGxhYkFjYyA9IDE7XHJcbiAgICAvL2dlcmHDp8OjbyBkYXMgdW5pZGFkZXMgZm9ybWF0YWRhc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtSW5wc0Rlc2NyaXB0b3IubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBzZXBhcmF0aW9uTWF0Y2hlcyA9IGZvcm1JbnBzRGVzY3JpcHRvcltpXS5tYXRjaCgvXCIsL2cpO1xyXG4gICAgICAgIGlmIChzZXBhcmF0aW9uTWF0Y2hlcykge1xyXG4gICAgICAgICAgICAvLyBjb25zdCBmaXJzdFNlcEluZGV4ID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLmluZGV4T2YoXCIsXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWNvbmRTZXBJbmRleCA9IGZvcm1JbnBzRGVzY3JpcHRvcltpXS5pbmRleE9mKFwiLFwiLCBmb3JtSW5wc0Rlc2NyaXB0b3JbaV0uaW5kZXhPZihcIixcIikgKyAxKTtcclxuICAgICAgICAgICAgY29uc3QgbGFzdFNlcEluZGV4ID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLmxhc3RJbmRleE9mKHNlcGFyYXRpb25NYXRjaGVzWzBdKTtcclxuICAgICAgICAgICAgLy9mb3JtYXRhw6fDo28gZG9zIGlkcyBlIHZhbHVlcyBkb3MgaW5wdXRzXHJcbiAgICAgICAgICAgIGxldCBpbnBJZCA9IGZvcm1JbnBzRGVzY3JpcHRvcltpXS5zbGljZShzZWNvbmRTZXBJbmRleCArIDIsIGxhc3RTZXBJbmRleCArIDEpO1xyXG4gICAgICAgICAgICBsZXQgbG9vcEFjYyA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlIChpbnBJZC5tYXRjaCgvLC9nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWFJbmRleCA9IGlucElkLmluZGV4T2YoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wSWQgPSBpbnBJZC5zbGljZShjb21tYUluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlucElkLm1hdGNoKC8sL2cpIHx8IGxvb3BBY2MgPiA5OTkpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvb3BBY2MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGZvcm1JbnBzRGVzY3JpcHRvcltpXS5zbGljZShsYXN0U2VwSW5kZXggKyAyLCAtMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhYiA9IG1hcElkc1RpdGxlc1tpbnBJZC5yZXBsYWNlQWxsKC9cIi9nLCBcIlwiKV07XHJcbiAgICAgICAgICAgIGlmIChpID09IDg5KSB7XHJcbiAgICAgICAgICAgICAgICAvL2J1ZyBuw6NvIHJlc29sdmlkbyBhaW5kYVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpbnBJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucElkID0gJ1wiY29uZmlybUxvY0lkXCInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29uc3RydcOnw6NvIGUgY29uY2F0ZW5hw6fDo28gZGFzIHVuaWRhZGVzIGZvcm1hdGFkYXNcclxuICAgICAgICAgICAgZm9ybWF0Rm9ybURlc2NJZHMgKz0gYFxcdCR7aW5wSWR9OiAke3ZhbHVlfSwgXFxuYDtcclxuICAgICAgICAgICAgZm9ybWF0Rm9ybURlc2NJZHNSZWFkICs9IGBcXHQke2xhYkFjY30uICR7aW5wSWR9OiAke3ZhbHVlfSwgXFxuYDsgLy92ZXJzw7VlcyBlbSBsaXN0YSBudW1lcmFkYSwgcGFyYSBsb2dzIGUgZW51bWVyYcOnw6NvIHBvc3RlcmlvclxyXG4gICAgICAgICAgICBsYWJBY2MrKztcclxuICAgICAgICAgICAgaWYgKGxhYiAmJiBsYWIgIT09IFwibnVsbFwiICYmIGxhYiAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0Rm9ybURlc2NUaXRsZXNSZWFkICs9IGBcXHQke2xhYkFjY30uICR7bGFifSBmb3IgJHtpbnBJZH06ICR7dmFsdWV9LCBcXG5gO1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0Rm9ybURlc2NUaXRsZXMgKz0gYFxcdFwiJHtsYWJ9XCI6ICR7dmFsdWV9LCBcXG5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9hanVzdGVzIGZpbmFpcyBub3MgZGVzY3JpcHRvcnMgZSB1bmnDo29cclxuICAgIGNvbnN0IGZpbmFsRGVzY0lkcyA9IChmb3JtYXRGb3JtRGVzY0lkcyArXHJcbiAgICAgICAgYFxcblxcbmAgK1xyXG4gICAgICAgIGZvcm1hdEZvcm1EZXNjVGl0bGVzICtcclxuICAgICAgICBgfWApLnJlcGxhY2UoXCIsIFxcbn1cIiwgXCIgXFxufVwiKTtcclxuICAgIGNvbnN0IGZpbmFsRGVzY1RpdGxlcyA9IChge2AgKyBmb3JtYXRGb3JtRGVzY1RpdGxlcyArIGB9YCkucmVwbGFjZShcIiwgXFxufVwiLCBcIiBcXG59XCIpO1xyXG4gICAgLy9wYXJhIGxlaXR1cmEgZW0gbG9ncyBzb21lbnRlXHJcbiAgICBjb25zdCBmaW5hbERlc2NJZHNSZWFkID0gKGZvcm1hdEZvcm1EZXNjSWRzUmVhZCArIGB9YClcclxuICAgICAgICAucmVwbGFjZShcIiwgXFxufVwiLCBcIiBcXG59XCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiXCJudWxsXCI6IFwibnVsbFwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIlwiZmFsc2VcIjogXCJmYWxzZVwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIm51bGxcIjogXCJudWxsXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiZmFsc2VcIjogXCJmYWxzZVwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cImZhbHNlXCI6IFwiZmFsc2VcIi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIm51bGxcIjogXCJudWxsXCIvZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHM6XFxzXCJudWxsXCIsXFxzXFxuL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1xcdFswLTldezEsM30uXFxzOlxcc1wiZmFsc2VcIixcXHNcXG4vZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHNcXHNcXG4vZywgXCJcIik7XHJcbiAgICBjb25zdCBmaW5hbERlc2NUaXRsZXNSZWFkID0gKGZvcm1hdEZvcm1EZXNjVGl0bGVzUmVhZCArIGB9YClcclxuICAgICAgICAucmVwbGFjZShcIiwgXFxufVwiLCBcIiBcXG59XCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiXCJudWxsXCI6IFwibnVsbFwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIlwiZmFsc2VcIjogXCJmYWxzZVwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIm51bGxcIjogXCJudWxsXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiZmFsc2VcIjogXCJmYWxzZVwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cImZhbHNlXCI6IFwiZmFsc2VcIi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIm51bGxcIjogXCJudWxsXCIvZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHM6XFxzXCJudWxsXCIsXFxzXFxuL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1xcdFswLTldezEsM30uXFxzOlxcc1wiZmFsc2VcIixcXHNcXG4vZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHNcXHNcXG4vZywgXCJcIik7XHJcbiAgICBjb25zb2xlLmxvZyhmaW5hbERlc2NJZHNSZWFkKTtcclxuICAgIGNvbnNvbGUubG9nKGZpbmFsRGVzY1RpdGxlc1JlYWQpO1xyXG4gICAgcmV0dXJuIFtmaW5hbERlc2NUaXRsZXMsIGZpbmFsRGVzY0lkc107XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2VuZXJhdGVKU09OQnRuKEpTT05MaW5rLCBmb3JtSW5wc0Rlc2NyaXB0b3IpIHtcclxuICAgIGNvbnN0IG5ld0pTT05CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgbmV3SlNPTkJ0bi5pZCA9IFwiYnRuSlNPTlwiO1xyXG4gICAgbmV3SlNPTkJ0bi5jbGFzc05hbWUgPSBKU09OTGluay5jbGFzc05hbWU7XHJcbiAgICBuZXdKU09OQnRuLnN0eWxlLndpZHRoID0gSlNPTkxpbmsuc3R5bGUud2lkdGg7XHJcbiAgICBuZXdKU09OQnRuLnN0eWxlLmhlaWdodCA9IEpTT05MaW5rLnN0eWxlLmhlaWdodDtcclxuICAgIG5ld0pTT05CdG4udGV4dENvbnRlbnQgPSBcIlJlZ2VuZXJhciBKU09OXCI7XHJcbiAgICBKU09OTGluay5yZXBsYWNlV2l0aChuZXdKU09OQnRuKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIG5ld0pTT05CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNyZWF0ZUpTT05BbmNob3IobmV3SlNPTkJ0biwgZm9ybUlucHNEZXNjcmlwdG9yKSk7XHJcbiAgICB9LCAxMDAwKTtcclxuICAgIC8vIHJldHVybiBuZXdKU09OQnRuO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvcFJhZGlvSGFuZGxlcihrZXlkb3duKSB7XHJcbiAgICBjb25zdCByYWRpb1BhaXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbaWQkPVwiWWVzXCJdLCBpbnB1dFtpZCQ9XCJOb1wiXScgLy9hY2Vzc2FuZG8gY29tbyBwYXJcclxuICAgICk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvUGFpcnMubGVuZ3RoOyBpICs9IDIgLy9wdWxhbmRvIGRlIHBhciBlbSBwYXJcclxuICAgICkge1xyXG4gICAgICAgIGNvbnN0IHJhZGlvWWVzID0gcmFkaW9QYWlyc1tpXTtcclxuICAgICAgICBjb25zdCByYWRpb05vID0gcmFkaW9QYWlyc1tpICsgMV07XHJcbiAgICAgICAgaWYgKCFyYWRpb1llcyB8fCAhcmFkaW9Obykge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJhZGlvWWVzIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICByYWRpb05vIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAhcmFkaW9ZZXMuY2hlY2tlZCAmJlxyXG4gICAgICAgICAgICAhcmFkaW9Oby5jaGVja2VkICYmXHJcbiAgICAgICAgICAgIGtleWRvd24gaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgoa2V5ZG93bi5hbHRLZXkgJiYga2V5ZG93bi5rZXkgPT09IFwieVwiKSB8fCBrZXlkb3duLmtleSA9PT0gXCJZXCIpIHtcclxuICAgICAgICAgICAgICAgIHJhZGlvWWVzLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICByYWRpb1llcy5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvWWVzLmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKChrZXlkb3duLmFsdEtleSAmJiBrZXlkb3duLmtleSA9PT0gXCJuXCIpIHx8XHJcbiAgICAgICAgICAgICAgICBrZXlkb3duLmtleSA9PT0gXCJOXCIpIHtcclxuICAgICAgICAgICAgICAgIHJhZGlvTm8uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHJhZGlvTm8uY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByYWRpb05vLmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYHJhZGlvWWVzOiAke3JhZGlvWWVzPy5jaGVja2VkID8/IGZhbHNlfWApO1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYHJhZGlvTm86ICR7cmFkaW9Obz8uY2hlY2tlZCA/PyBmYWxzZX1gKTtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke0pTT04uc3RyaW5naWZ5KGtleWRvd24pfWApO1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIsIFwidmFsaWRhbmRvIHJhZGlvWWVzIG91IHJhZGlvc05vIG91IGtleWRvd24gZXZlbnQgdGFyZ2V0XCIsIHJhZGlvWWVzID8/IG51bGwsIHJhZGlvTm8gPz8gbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjcGJJbnBIYW5kbGVyKHJhZGlvKSB7XHJcbiAgICBpZiAocmFkaW8ucGFyZW50RWxlbWVudCAmJiByYWRpby5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBvcFJhZGlvc0NoZWNrID0gcmFkaW8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvckFsbChcImlucHV0W2lkXj0nQ3BiJ11baWQkPSdZZXMnXVwiKTtcclxuICAgICAgICBjb25zdCBvcFJhZGlvc1RleHQgPSByYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbaWRePSdwYiddW2lkJD0nWWVzJ11cIik7XHJcbiAgICAgICAgY29uc3QgYW50RmFtQ2hlY2tzID0gcmFkaW8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvckFsbChcImlucHV0W2lkXj0nYW50RmFtJ11cIik7XHJcbiAgICAgICAgY29uc3QgdGV4dEFkZCA9IHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZXh0YXJlYVtpZF49J3RleHRBZGQnXVwiKTtcclxuICAgICAgICBjb25zdCBkaXZBZGQgPSByYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2W2lkXj0nZGl2QWRkJ11cIik7XHJcbiAgICAgICAgLy9pbmNsdWkgYW1ib3Mgb3MgdGlwb3MgZGUgZXZlbnRvc1xyXG4gICAgICAgIGlmIChvcFJhZGlvc0NoZWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgb3BSYWRpb3NDaGVjaz8uZm9yRWFjaChmdW5jdGlvbiAob3BSYWRpb0NoZWNrLCBpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGl2QWRkW2ldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICBvcFJhZGlvQ2hlY2sgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKG9wUmFkaW9DaGVjay50eXBlID09PSBcImNoZWNrYm94XCIgfHwgb3BSYWRpb0NoZWNrLnR5cGUgPT09IFwicmFkaW9cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wUmFkaW9DaGVjay5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdkFkZFtpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXZBZGRbaV0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3BSYWRpb3NUZXh0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgb3BSYWRpb3NUZXh0Py5mb3JFYWNoKGZ1bmN0aW9uIChvcFJhZGlvVGV4dCwgaSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRBZGRbaV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIG9wUmFkaW9UZXh0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChvcFJhZGlvVGV4dC50eXBlID09PSBcImNoZWNrYm94XCIgfHwgb3BSYWRpb1RleHQudHlwZSA9PT0gXCJyYWRpb1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3BSYWRpb1RleHQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWRkW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBZGRbaV0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYW50RmFtQ2hlY2tzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgYW50RmFtQ2hlY2tzPy5mb3JFYWNoKChhbnRGYW1DaGVjaywgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xvc2VzdEFkZEVsZW1lbnQgPSBhbnRGYW1DaGVja3NbaV0ucGFyZW50RWxlbWVudD8ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RBZGRFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW50RmFtQ2hlY2sgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChhbnRGYW1DaGVjay50eXBlID09PSBcImNoZWNrYm94XCIgfHwgYW50RmFtQ2hlY2sudHlwZSA9PT0gXCJyYWRpb1wiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhYW50RmFtQ2hlY2suY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0QWRkRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0QWRkRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIsIFwibG9jYWxpemFuZG8gcGFyZW50IGVsZW1lbnRzIGRlIFJhZGlvXCIsIHJhZGlvPy5wYXJlbnRFbGVtZW50ID8/IG51bGwsIHJhZGlvPy5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50ID8/IG51bGwpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkZWFjdFRleHRJbnB1dCgpIHtcclxuICAgIGNvbnN0IG51bWJlcklucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl1baWQkPU51bUlkXScpO1xyXG4gICAgY29uc3QgbnVsbFJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXVtpZCQ9TnVsbElkXScpO1xyXG4gICAgaWYgKG51bWJlcklucHV0cy5sZW5ndGggIT09IG51bGxSYWRpb3MubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk7Dum1lcm8gZGUgdGV4dHMgZSByYWRpb3MgbsOjbyBjb3JyZXNwb25kZSFcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbnVtYmVySW5wdXRzLmZvckVhY2goKG51bWJlcklucHV0LCBpKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVsbFJhZGlvID0gbnVsbFJhZGlvc1tpXTtcclxuICAgICAgICBpZiAobnVsbFJhZGlvLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgbnVtYmVySW5wdXQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBudW1iZXJJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlQ2xpY2tIYW5kbGVyKGlucHV0KSB7XHJcbiAgICBpbnB1dC5jaGVja2VkID0gaW5wdXQuY2hlY2tlZCA/IGZhbHNlIDogdHJ1ZTtcclxuICAgIGNwYklucEhhbmRsZXIoaW5wdXQpO1xyXG4gICAgZGVhY3RUZXh0SW5wdXQoKTtcclxufVxyXG4vLyBleHBvcnQgZnVuY3Rpb24gdG91Y2hTdGFydEhhbmRsZXIoa2V5ZG93bjogS2V5Ym9hcmRFdmVudCkge1xyXG4vLyAgIGxldCBmaXJzdFRhcFRpbWUgPSAwO1xyXG4vLyAgIGlmIChmaXJzdFRhcFRpbWUgPT09IDApIHtcclxuLy8gICAgIGZpcnN0VGFwVGltZSA9IERhdGUubm93KCk7XHJcbi8vICAgfSBlbHNlIHtcclxuLy8gICAgIGNvbnN0IGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gZmlyc3RUYXBUaW1lO1xyXG4vLyAgICAgaWYgKGVsYXBzZWQgPCAxMDAwKSB7XHJcbi8vICAgICAgIC8vIExpbWl0ZSBkZSB0ZW1wbyBwYXJhIGNvbnNpZGVyYXIgdW0gZHVwbG8gdG9xdWUgKDMwMG1zKVxyXG4vLyAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XHJcbi8vICAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgICBmaXJzdFRhcFRpbWUgPSAwOyAvLyBSZWluaWNpYXIgbyB0ZW1wb3JpemFkb3JcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgIGZpcnN0VGFwVGltZSA9IERhdGUubm93KCk7IC8vIEluaWNpYXIgdW0gbm92byB0ZW1wb3JpemFkb3JcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vICAgb3BSYWRpb0hhbmRsZXIoa2V5ZG93bik7XHJcbi8vICAgY3BiSW5wSGFuZGxlcih0aGlzKTtcclxuLy8gfVxyXG5leHBvcnQgZnVuY3Rpb24gdXNlQ3VycmVudERhdGUoYWN0aXZhdGlvbiwgZGF0ZUJ0bikge1xyXG4gICAgY29uc3QgZGF0YUF0dWFsID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IGFubyA9IGRhdGFBdHVhbC5nZXRGdWxsWWVhcigpO1xyXG4gICAgY29uc3QgbWVzID0gKGRhdGFBdHVhbC5nZXRNb250aCgpICsgMSlcclxuICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgIC5wYWRTdGFydCgyLCBcIjBcIilcclxuICAgICAgICAucmVwbGFjZUFsbChcIidcIiwgXCJcIik7XHJcbiAgICBjb25zdCBkaWEgPSBkYXRhQXR1YWxcclxuICAgICAgICAuZ2V0RGF0ZSgpXHJcbiAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAucGFkU3RhcnQoMiwgXCIwXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoXCInXCIsIFwiXCIpO1xyXG4gICAgY29uc3QgdGFyZ0lucHV0RGF0ZSA9IHNlYXJjaFByZXZpb3VzU2libGluZ3MoZGF0ZUJ0biwgXCJpbnBEYXRlXCIpO1xyXG4gICAgaWYgKGFjdGl2YXRpb24udGFyZ2V0ID09PSBkYXRlQnRuICYmXHJcbiAgICAgICAgdGFyZ0lucHV0RGF0ZSAmJlxyXG4gICAgICAgIHRhcmdJbnB1dERhdGUudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmXHJcbiAgICAgICAgdGFyZ0lucHV0RGF0ZSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICB0YXJnSW5wdXREYXRlLnZhbHVlID0gYW5vICsgXCItXCIgKyBtZXMgKyBcIi1cIiArIGRpYTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0YXJnSW5wdXREYXRlID8/IG51bGwsIFwidGFyZ0lucHV0RGF0ZVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaE5leHRTaWJsaW5ncyhjdXJyZW50RWxlbWVudCwgc2VhcmNoZWRTaWJsaW5nQ2xhc3MpIHtcclxuICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcclxuICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICBjb25zdCBpc1NpYmxpbmdWYWxpZCA9IGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhzZWFyY2hlZFNpYmxpbmdDbGFzcyk7XHJcbiAgICAgICAgaWYgKGlzU2libGluZ1ZhbGlkIHx8IGxvb3BBY2MgPiA5OTkpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvb3BBY2MrKztcclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUHJldmlvdXNTaWJsaW5ncyhjdXJyZW50RWxlbWVudCwgc2VhcmNoZWRTaWJsaW5nQ2xhc3MpIHtcclxuICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIGNvbnN0IGlzU2libGluZ1ZhbGlkID0gY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlYXJjaGVkU2libGluZ0NsYXNzKTtcclxuICAgICAgICBpZiAoaXNTaWJsaW5nVmFsaWQgfHwgbG9vcEFjYyA+IDk5OSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9vcEFjYysrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRFbGVtZW50O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQcmV2aW91c1NpYmxpbmdzQnlJZChjdXJyZW50RWxlbWVudCwgc2VhcmNoZWRTaWJsaW5nSWQpIHtcclxuICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIGNvbnN0IGlzU2libGluZ1ZhbGlkID0gY3VycmVudEVsZW1lbnQuaWQgPT09IHNlYXJjaGVkU2libGluZ0lkO1xyXG4gICAgICAgIGlmIChpc1NpYmxpbmdWYWxpZCB8fCBsb29wQWNjID4gOTk5KSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb29wQWNjKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFBhcmVudHMoY3VycmVudEVsZW1lbnQsIHNlYXJjaGVkUGFyZW50Q2xhc3MpIHtcclxuICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGlzUGFyZW50VmFsaWQgPSBjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoc2VhcmNoZWRQYXJlbnRDbGFzcyk7XHJcbiAgICAgICAgaWYgKGlzUGFyZW50VmFsaWQgfHwgbG9vcEFjYyA+IDk5OSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9vcEFjYysrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRFbGVtZW50O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VUb0FzdERpZ2l0KGNsaWNrLCB0b0ZpbGVJbnBCdG4pIHtcclxuICAgIGNvbnN0IHVzZUFzdERpZ2l0UmVnZXggPSAvVXNhciBBc3NpbmF0dXJhIERpZ2l0YWwvO1xyXG4gICAgY29uc3QgdXNlQXN0RGlndFJlZ2V4T2JqID0gbmV3IFJlZ0V4cCh1c2VBc3REaWdpdFJlZ2V4KTtcclxuICAgIGNvbnN0IHVzZUFzdFRleHRSZWdleCA9IC9SZXRvcm5hciDDoCBBc3NpbmF0dXJhIEVzY3JpdGEvO1xyXG4gICAgY29uc3QgdXNlQXN0VGV4dFJlZ2V4T2JqID0gbmV3IFJlZ0V4cCh1c2VBc3RUZXh0UmVnZXgpO1xyXG4gICAgbGV0IGxhYkNvbnQgPSB0b0ZpbGVJbnBCdG4ucGFyZW50RWxlbWVudD8uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxhYkFzdFwiKSA/PyBcIm51bGxcIjtcclxuICAgIGlmIChsYWJDb250WzBdID09PSBcIm51bGxcIiAmJlxyXG4gICAgICAgICh0b0ZpbGVJbnBCdG4ucGFyZW50RWxlbWVudD8udGFnTmFtZSA9PT0gXCJMQUJFTFwiIHx8XHJcbiAgICAgICAgICAgIHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py50YWdOYW1lID09PSBcIlNQQU5cIikpIHtcclxuICAgICAgICBsYWJDb250ID0gQXJyYXkub2YodG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNsaWNrLnRhcmdldCA9PT0gdG9GaWxlSW5wQnRuKSB7XHJcbiAgICAgICAgaWYgKHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCAmJlxyXG4gICAgICAgICAgICB1c2VBc3REaWd0UmVnZXhPYmoudGVzdCh0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucEFzdCA9IHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImlucEFzdFwiKTtcclxuICAgICAgICAgICAgaWYgKGlucEFzdCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJbnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLnR5cGUgPSBcImZpbGVcIjtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAubmFtZSA9IGlucEFzdC5uYW1lOyAvL2lnbm9yYXIgVFNcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAuaWQgPSBpbnBBc3QuaWQ7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLmNsYXNzTmFtZSA9IGlucEFzdC5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLnNldEF0dHJpYnV0ZShcImFjY2VwdFwiLCBcImltYWdlLypcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wQXN0LnJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5yZXF1aXJlZCA9IGlucEFzdC5yZXF1aXJlZDsgLy9pZ25vcmFyIFRTXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wQXN0LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnBBc3QucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoZmlsZUlucCwgaW5wQXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoID0gbGFiQ29udFswXS5pZC5tYXRjaCgvQXN0Lyk/LnRvU3RyaW5nKCkgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZElucE1hdGNoID0gZmlsZUlucC5pZC5tYXRjaCgvQXN0Lyk/LnRvU3RyaW5nKCkgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoSW5kZXggPSBsYWJDb250WzBdLmlkLmluZGV4T2YoaWRMYWJNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRJbnBNYXRjaEluZGV4ID0gZmlsZUlucC5pZC5pbmRleE9mKGlkSW5wTWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZExhYk1hdGNoSW5kZXggJiYgaWRJbnBNYXRjaEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlT25lTGFiSWQgPSBsYWJDb250WzBdLmlkLnNsaWNlKDAsIGlkTGFiTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlVHdvSW5wSWQgPSBmaWxlSW5wLmlkLnNsaWNlKGlkSW5wTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYkNvbnRbMF0uaWQgPSBzbGljZU9uZUxhYklkICsgc2xpY2VUd29JbnBJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnRleHRDb250ZW50ID0gXCJSZXRvcm5hciDDoCBBc3NpbmF0dXJhIEVzY3JpdGFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvRmlsZUlucEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvRmlsZUlucEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nPy5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gbWF0Y2ggZGUgaWRzIGRvIGlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZUlucCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGNob3NlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaG9zZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuZmlsZXMgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5maWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZ0ZpbGUgPSBmaWxlSW5wLmZpbGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1nRmlsZSAmJiBpbWdGaWxlLnR5cGUuc3RhcnRzV2l0aChcImltYWdlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGxvYWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlZmluaXIgbMOzZ2ljYSBwYXJhIGNhcnJlZ2FtZW50b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pY2lhIHByZXBhcm8gcGFyYSBldmVudG8gZGUgY2FycmVnYW1lbnRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nVXJsID0gbG9hZC50YXJnZXQ/LnJlc3VsdDsgLy9jaGVjYSBhIHVybCBkbyBmaWxlIHF1ZSBzZXLDoSBjYXJyZWdhZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWdBc3REaWd0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTsgLy9jcmlhIGNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuaWQgPSBpbnBBc3QuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5jbGFzc05hbWUgPSBpbnBBc3QuY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3QuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGltZ1VybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnNyYyA9IGltZ1VybDsgLy9hc3NvY2lhw6fDo28gZW50cmUgY29udGFpbmVyIGUgZmlsZSBjYXJyZWdhZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5pZCA9IGZpbGVJbnAuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5jbGFzc05hbWUgPSBmaWxlSW5wLmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkFzc2luYXR1cmEgRGlnaXRhbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnNldEF0dHJpYnV0ZShcImRlY29kaW5nXCIsIFwiYXN5bmNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zZXRBdHRyaWJ1dGUoXCJsb2FkaW5nXCIsIFwiZWFnZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLCBcImFub255bW91c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnN0eWxlLnNldFByb3BlcnR5KFwibWF4LXdpZHRoXCIsIFwiMzAwcHhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zdHlsZS5zZXRQcm9wZXJ0eShcIm1heC1oZWlnaHRcIiwgXCIyMDBweFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZUlucC5wYXJlbnRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYkNvbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiQ29udC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoaW1nQXN0RGlndCwgZmlsZUlucCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkTGFiTWF0Y2ggPSBsYWJDb250WzBdLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goL0FzdC8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2ggPSBpbWdBc3REaWd0LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goL0FzdC8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZExhYk1hdGNoICYmIGlkSW5wTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkTGFiTWF0Y2hJbmRleCA9IGxhYkNvbnRbMF0uaWQuaW5kZXhPZihpZExhYk1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2hJbmRleCA9IGltZ0FzdERpZ3QuaWQuaW5kZXhPZihpZElucE1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlT25lTGFiSWQgPSBsYWJDb250WzBdLmlkLnNsaWNlKDAsIGlkTGFiTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZVR3b0lucElkID0gaW1nQXN0RGlndC5pZC5zbGljZShpZElucE1hdGNoSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiQ29udFswXS5pZCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2VPbmVMYWJJZCArIHNsaWNlVHdvSW5wSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvIG5vIG1hdGNoIGRlIGlkcyBkbyBpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIG5hIHZhbGlkYcOnw6NvIGRlIGxhYkNvbnQ6IGVsZW1lbnRvICR7bGFiQ29udH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGUvb3UgcGFyZW50OiBlbGVtZW50byAke2ZpbGVJbnAucGFyZW50RWxlbWVudH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1nQXN0RGlndC5zdHlsZS53aWR0aCA9IGltZ0FzdERpZ3QucGFyZW50RWxlbWVudC5zdHlsZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1nQXN0RGlndCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY29tcHV0ZUltZ0FzdGRXaWR0aCA9IGdldENvbXB1dGVkU3R5bGUoaW1nQXN0RGlndCkud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGltZ0FzdERpZ3QucGFyZW50RWxlbWVudC5zdHlsZS53aWR0aCA9IGNvbXB1dGVJbWdBc3RkV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3Quc3R5bGUuc2V0UHJvcGVydHkoXCJvdmVyZmxvd1wiLCBcImF1dG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChpbWdGaWxlKTsgLy9sw6ogbyBmaWxlIGJhc2VhZG8gbmEgc3JjIGNhcnJlZ2FkYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZW5odW0gYXJxdWl2byBzZWxlY2lvbmFkb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChpbnBBc3QgPz8gbnVsbCwgXCJpbnBBc3RcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vVE9ETyBJTkNMVUlSIFRPS0VOIEFOVEktQ1NSRiBRVUFORE8gSE9VVkVSIFNFUlZJRE9SXHJcbiAgICAgICAgICAgIC8vIGZpbGVJbnAubmFtZSA9IGlucEFzdC5uYW1lO1xyXG4gICAgICAgICAgICAvLyBmaWxlSW5wLmlkID0gaW5wQXN0LmlkO1xyXG4gICAgICAgICAgICAvLyBmaWxlSW5wLmNsYXNzTmFtZSA9IGlucEFzdC5jbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCAmJlxyXG4gICAgICAgICAgICB1c2VBc3RUZXh0UmVnZXhPYmoudGVzdCh0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucEFzdCA9IHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImlucEFzdFwiKSB8fFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoUHJldmlvdXNTaWJsaW5ncyh0b0ZpbGVJbnBCdG4sIFwiaW1nQXN0RGlnaXRcIik7XHJcbiAgICAgICAgICAgIGlmIChpbnBBc3QgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50IHx8XHJcbiAgICAgICAgICAgICAgICBpbnBBc3QgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlSW5wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgZmlsZUlucC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLm5hbWUgPSBpbnBBc3QubmFtZTtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAuaWQgPSBpbnBBc3QuaWQ7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLmNsYXNzTmFtZSA9IGlucEFzdC5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucEFzdC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wQXN0LnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKGZpbGVJbnAsIGlucEFzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRMYWJNYXRjaCA9IGxhYkNvbnRbMF0uaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKC9Bc3QvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRJbnBNYXRjaCA9IGZpbGVJbnAuaWQubWF0Y2goL0FzdC8pPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZExhYk1hdGNoICYmIGlkSW5wTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRMYWJNYXRjaEluZGV4ID0gbGFiQ29udFswXS5pZC5pbmRleE9mKGlkTGFiTWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZElucE1hdGNoSW5kZXggPSBmaWxlSW5wLmlkLmluZGV4T2YoaWRJbnBNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlT25lTGFiSWQgPSBsYWJDb250WzBdLmlkLnNsaWNlKDAsIGlkTGFiTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlVHdvSW5wSWQgPSBmaWxlSW5wLmlkLnNsaWNlKGlkSW5wTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYkNvbnRbMF0uaWQgPSBzbGljZU9uZUxhYklkICsgc2xpY2VUd29JbnBJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnRleHRDb250ZW50ID0gXCJVc2FyIEFzc2luYXR1cmEgRGlnaXRhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4ucHJldmlvdXNFbGVtZW50U2libGluZz8ucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyhmaWxlSW5wKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvIG5vIG1hdGNoIGRlIGlkcyBkbyBJbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKGlucEFzdCA/PyBudWxsLCBcImlucEFzdFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0YXJGb3JtdWxhcmlvKGNsaWNrLCB0b0ZpbGVJbnBCdG5zKSB7XHJcbiAgICBpZiAoY2xpY2sudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcclxuICAgICAgICBjbGljay50YXJnZXQudGFnTmFtZSA9PT0gXCJCVVRUT05cIikge1xyXG4gICAgICAgIGNvbnN0IGZvcm11bGFyaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BbmFtR0lkXCIpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRhYmxlQ2l0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NpdGVbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXScpO1xyXG4gICAgICAgIGNvbnN0IGdlbkJpcnRoUmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5CaXJ0aFJlbElkXCIpO1xyXG4gICAgICAgIGNvbnN0IGdlblRyYW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5UcmFuc0lkXCIpO1xyXG4gICAgICAgIGlmIChmb3JtdWxhcmlvICYmIGZvcm11bGFyaW8gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZm9ybXVsYXJpby5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm8gdmFsaWRhbmRvIGZvcm11bMOhcmlvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZWRpdGFibGVDaXRlKSB7XHJcbiAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGAtLU5vbWVgO1xyXG4gICAgICAgICAgICBHbG9iYWxNb2RlbC5yZW1vdmVGaXJzdENsaWNrKGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYGVkaXRhYmxlQ2l0ZSBuw6NvIGVuY29udHJhZG8gZW0gcmVzZXQuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnZW5CaXJ0aFJlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGdlbkJpcnRoUmVsIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBnZW5CaXJ0aFJlbC52YWx1ZSA9IFwiY2lzXCI7XHJcbiAgICAgICAgICAgIGdlbkJpcnRoUmVsLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYGdlbkJpcnRoUmVsIG7Do28gZW5jb250cmFkbyBlbSByZXNldC5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGdlblRyYW5zIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZ2VuVHJhbnMgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGdlblRyYW5zLnZhbHVlID0gXCJhdmFuY2Fkb1wiO1xyXG4gICAgICAgICAgICBnZW5UcmFucy5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBnZW5UcmFucyBuw6NvIGVuY29udHJhZG8gZW0gcmVzZXQuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvRmlsZUlucEJ0bnMuZm9yRWFjaCgodG9GaWxlSW5wQnRuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQgPT09IFwiUmV0b3JuYXIgw6AgQXNzaW5hdHVyYSBFc2NyaXRhXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlucEFzdCA9IHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImlucEFzdFwiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImltZ0FzdERpZ2l0XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucEFzdCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChpbnBBc3QgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucEFzdCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZUlucCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLm5hbWUgPSBpbnBBc3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmlkID0gaW5wQXN0LmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuY2xhc3NOYW1lID0gaW5wQXN0LmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnBBc3QucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiQ29udCA9IHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGFiQXN0XCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bGxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsYWJDb250WzBdID09PSBcIm51bGxcIiB8fCBsYWJDb250WzBdLmlkID09PSBcIlwiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py50YWdOYW1lID09PSBcIkxBQkVMXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4ucGFyZW50RWxlbWVudD8udGFnTmFtZSA9PT0gXCJTUEFOXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJDb250ID0gQXJyYXkub2YodG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucEFzdC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChmaWxlSW5wLCBpbnBBc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoID0gbGFiQ29udFswXS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKC9Bc3QvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZElucE1hdGNoID0gZmlsZUlucC5pZC5tYXRjaCgvQXN0Lyk/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZExhYk1hdGNoICYmIGlkSW5wTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkTGFiTWF0Y2hJbmRleCA9IGxhYkNvbnRbMF0uaWQuaW5kZXhPZihpZExhYk1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2hJbmRleCA9IGZpbGVJbnAuaWQuaW5kZXhPZihpZElucE1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlT25lTGFiSWQgPSBsYWJDb250WzBdLmlkLnNsaWNlKDAsIGlkTGFiTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZVR3b0lucElkID0gZmlsZUlucC5pZC5zbGljZShpZElucE1hdGNoSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiQ29udFswXS5pZCA9IHNsaWNlT25lTGFiSWQgKyBzbGljZVR3b0lucElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gR2xvYmFsTW9kZWwuYXV0b0NhcGl0YWxpemVJbnB1dHMoZmlsZUlucCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnRleHRDb250ZW50ID0gXCJVc2FyIEFzc2luYXR1cmEgRGlnaXRhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmc/LnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gbWF0Y2ggZGUgaWRzIGRvIGlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gbG9jYWxpemFuZG8gUGFyZW50IEVsZW1lbnQgZGUgaW5wQXN0YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHJlY29uaGVjZW5kbyBQcmV2aW91cyBFbGVtZW50IFNpYmxpbmc6IGlucEFzdCAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoaW5wQXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoOCwgLTEpfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyB0YXJnZXQ6IGluc3TDom5jaWEgZGUgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgIC5jYWxsKGNsaWNrLnRhcmdldClcclxuICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX1gKTtcclxuICAgIH1cclxufVxyXG4vL1RPRE8gRklOQUxJWkFSIENPTSBDU1NcclxuZXhwb3J0IGZ1bmN0aW9uIHN1YkZvcm0oKSB7XHJcbiAgICB3aW5kb3cuYWxlcnQoXCJTaXN0ZW1hIGFpbmRhIG7Do28gcHJvbnRvXFxuLi4ubWFzIHZvY8OqIHRlcmlhIGVudmlhZG8gY2xpY2FuZG8gYXF1aSEgOilcIik7XHJcbiAgICAvLyBjb25zdCByZXF1aXJlZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltyZXF1aXJlZF1cIik7XHJcbiAgICAvLyBpZiAocmVxdWlyZWRFbGVtZW50cykge1xyXG4gICAgLy8gICBjb25zdCBlbXB0eUVsZW1lbnRzID0gQXJyYXkuZnJvbShyZXF1aXJlZEVsZW1lbnRzKS5maWx0ZXIoKGVsZW1lbnQpID0+IHtcclxuICAgIC8vICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQudmFsdWUgfHwgZWxlbWVudC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgLy8gICAgIHJldHVybiB2YWx1ZSA9PT0gXCJcIjtcclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyAgIGlmIChlbXB0eUVsZW1lbnRzKSB7XHJcbiAgICAvLyAgICAgZW1wdHlFbGVtZW50cy5mb3JFYWNoKChlbXB0eUVsZW1lbnQpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiRWxlbWVudG8gdmF6aW86IFwiLCBlbXB0eUVsZW1lbnQuaWQpO1xyXG4gICAgLy8gICAgICAgZW1wdHlFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwicmdiKDI1NSwgMCwgMClcIjtcclxuICAgIC8vICAgICAgIGxldCBlbXB0eUVsZW1lbnRDU3R5bGUgPSB3aW5kb3dcclxuICAgIC8vICAgICAgICAgLmdldENvbXB1dGVkU3R5bGUoZW1wdHlFbGVtZW50KVxyXG4gICAgLy8gICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShcImJvcmRlci1jb2xvclwiKTtcclxuICAgIC8vICAgICAgIGxldCByZ2JhTWF0Y2ggPSBlbXB0eUVsZW1lbnRDU3R5bGUubWF0Y2gocmdiYVJlZ2V4KTtcclxuICAgIC8vICAgICAgIGlmIChyZ2JhTWF0Y2gpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJyZ2JhIFwiICsgcmdiYU1hdGNoKTtcclxuICAgIC8vICAgICAgICAgLy8gY29uc3QgZmFkaW5nQWxlcnQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIC8vICAgbGV0IHJnYmFNYXRjaCA9IGVtcHR5RWxlbWVudENTdHlsZS5tYXRjaChyZ2JhUmVnZXgpO1xyXG4gICAgLy8gICAgICAgICAvLyB9KTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG59XHJcbiIsIi8vbmVzc2UgZmlsZSBlc3TDo28gcHJlc2VudGVzIHByaW5jaXBhbG1lbnRlIGFzIGZ1bsOnw7VlcyByZWxhY2lvbmFkYXMgw6AgZXhpZ8OqbmNpYSBkZSBtb2RlbG8gdGV4dHVhbCBlIGRlIHZpc3VhbGl6YcOnw6NvXHJcbmltcG9ydCAqIGFzIEdsb2JhbEhhbmRsZXIgZnJvbSBcIi4vZ0hhbmRsZXJzXCI7XHJcbmltcG9ydCB7IE1hbiwgV29tYW4sIE5ldXRybyB9IGZyb20gXCIuL2NsYXNzZXNcIjtcclxuaW1wb3J0ICogYXMgRXJyb3JIYW5kbGVyIGZyb20gXCIuL2Vycm9ySGFuZGxlclwiO1xyXG4vLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5jb25zdCBhdXRvQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyUmVnZXggPSAvXFxiXFx3LztcclxubGV0IGlzQXV0b2NvcnJlY3RPbiA9IHRydWU7XHJcbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJMaW1pdChpbnB1dEVsZW1lbnQpIHtcclxuICAgIGxldCBudW1iZXJWYWx1ZSA9IGlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIGNvbnN0IG51bWJlclZhbHVlSW50ID0gcGFyc2VJbnQobnVtYmVyVmFsdWUpO1xyXG4gICAgY29uc3QgaXNBdGl2RmlzID0gaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImlucEF0aXZGaXNcIik7XHJcbiAgICBjb25zdCBpc0FsaW1Sb3QgPSBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wQWxpbVJvdFwiKTtcclxuICAgIGNvbnN0IGlzTG9jTnVtID0gaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImlucExvY051bVwiKTtcclxuICAgIGNvbnN0IGlzREREID0gaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImlucERERFwiKTtcclxuICAgIGNvbnN0IGlzRmxvYXQgPSBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxvYXRcIik7XHJcbiAgICBjb25zdCBpc0ZyZXEgPSBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnJlcUlucExpc3RcIik7XHJcbiAgICBpZiAoKGlzQXRpdkZpcyB8fCBpc0FsaW1Sb3QgfHwgaXNMb2NOdW0gfHwgaXNEREQgfHwgaXNGcmVxKSAmJiAhaXNGbG9hdCkge1xyXG4gICAgICAgIGlmIChudW1iZXJWYWx1ZS5tYXRjaCgvWz0uLDt+L3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXS9nKSkge1xyXG4gICAgICAgICAgICBjb25zdCB3cm9uZ01hdGNoID0gbnVtYmVyVmFsdWUubWF0Y2goL1s9Liw7fi98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0vZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyb25nTWF0Y2hJbmRleCA9IG51bWJlclZhbHVlLmluZGV4T2Yod3JvbmdNYXRjaD8uWzBdID8/IFwiXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRWYWx1ZSA9IG51bWJlclZhbHVlLnNsaWNlKDAsIHdyb25nTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyU2xpY2UgPSBudW1iZXJWYWx1ZS5zbGljZSh3cm9uZ01hdGNoSW5kZXggKyAxKTtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gc2xpY2VkVmFsdWUgKyBhZnRlclNsaWNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtYXhMZW5ndGggPSAyO1xyXG4gICAgICAgIGNvbnN0IG1heElucHV0ID0gaW5wdXRFbGVtZW50LmlkLmVuZHNXaXRoKFwiTWF4XCIpO1xyXG4gICAgICAgIGlmIChudW1iZXJWYWx1ZUludCA8IDEgJiYgbWF4SW5wdXQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5wVmFsdWVBcnJheSA9IEFycmF5LmZyb20oaW5wdXRFbGVtZW50LnZhbHVlKTtcclxuICAgICAgICAgICAgaW5wVmFsdWVBcnJheS5zcGxpY2UoMCwgMSwgXCIxXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmaXhlZElucFZhbHVlaW5wVmFsdWVBcnJheSA9IGlucFZhbHVlQXJyYXkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gZml4ZWRJbnBWYWx1ZWlucFZhbHVlQXJyYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoaXNBdGl2RmlzIHx8IGlzQWxpbVJvdCB8fCBpc0RERCB8fCBpc0ZyZXEpICYmXHJcbiAgICAgICAgICAgIG51bWJlclZhbHVlLmxlbmd0aCA+IG1heExlbmd0aCkge1xyXG4gICAgICAgICAgICBudW1iZXJWYWx1ZSA9IG51bWJlclZhbHVlLnNsaWNlKDAsIG1heExlbmd0aCk7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IG51bWJlclZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTmVnYXRpdmVzKHRhYklucCkge1xyXG4gICAgbGV0IHBhcnNlZElucFZhbHVlID0gMDtcclxuICAgIGlmICh0YWJJbnAgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgcGFyc2VkSW5wVmFsdWUgPSBwYXJzZUZsb2F0KHRhYklucC52YWx1ZSk7XHJcbiAgICAgICAgLy8gaWYgKE51bWJlci5pc05hTihwYXJzZWRJbnBWYWx1ZSkgfHwgcGFyc2VkSW5wVmFsdWUgPCAwKSB7XHJcbiAgICAgICAgLy8gICBwYXJzZWRJbnBWYWx1ZSA9IDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhYklucCA/PyBudWxsLCBcInRhYklucFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyc2VkSW5wVmFsdWUudG9TdHJpbmcoKTtcclxufVxyXG5mdW5jdGlvbiBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIG1hdGNoLCB0ZXh0RWxlbWVudCkge1xyXG4gICAgbGV0IHRleHQgPSB0ZXh0RWxlbWVudC52YWx1ZSB8fCB0ZXh0RWxlbWVudC50ZXh0Q29udGVudCB8fCBudWxsO1xyXG4gICAgbGV0IGlzRml4QWZ0ZXJEQ3Vyc29yRXhlYyA9IGZhbHNlO1xyXG4gICAgaWYgKGlzRml4QWZ0ZXJEQ3Vyc29yRXhlYylcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCBzZWxlY3Rpb25Qb3NpdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKT8uZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldDtcclxuICAgIHRleHQgPSB3cm9uZ1N0YXJ0Q29ycmVjdGlvbih0ZXh0LCBtYXRjaCk7XHJcbiAgICB0ZXh0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGZpeG1vdmUpID0+IHtcclxuICAgICAgICBjb25zdCBrZXlib2FyZEV2ZW50ID0gZml4bW92ZTtcclxuICAgICAgICBpZiAoc2VsZWN0aW9uUG9zaXRpb24gPT09IDAgfHwgc2VsZWN0aW9uUG9zaXRpb24gPT09IHRleHQ/Lmxlbmd0aCB8fCAwKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXlib2FyZEV2ZW50LmtleSA9PT0gXCIgXCIgfHxcclxuICAgICAgICAgICAgICAgIGtleWJvYXJkRXZlbnQua2V5ID09PSBcIkJhY2tzcGFjZVwiIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5Ym9hcmRFdmVudC5rZXkgPj0gXCJBcnJvd0xlZnRcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGtleWJvYXJkRXZlbnQua2V5IDw9IFwiQXJyb3dEb3duXCIpIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5Ym9hcmRFdmVudC5rZXkgPj0gXCJhXCIgJiYga2V5Ym9hcmRFdmVudC5rZXkgPD0gXCJ6XCIpIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5Ym9hcmRFdmVudC5rZXkgPj0gXCJBXCIgJiYga2V5Ym9hcmRFdmVudC5rZXkgPD0gXCJaXCIpIHx8XHJcbiAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNGaXhBZnRlckRDdXJzb3JFeGVjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGtleWJvYXJkRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGlzRml4QWZ0ZXJEQ3Vyc29yRXhlYyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBbdGV4dCwgaXNDdXJzb3JBdXRvTW92ZWRdO1xyXG59XHJcbmZ1bmN0aW9uIHdyb25nU3RhcnRDb3JyZWN0aW9uKHRleHQsIHdyb25nU3RhcnRNYXRjaCkge1xyXG4gICAgbGV0IGZpeGVkVGV4dCA9IHRleHQ7XHJcbiAgICBpZiAod3JvbmdTdGFydE1hdGNoICYmIHRleHQpIHtcclxuICAgICAgICBjb25zdCB3cm9uZ1N0YXJ0TGVuZ3RoID0gd3JvbmdTdGFydE1hdGNoXHJcbiAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgYWRkRXJhc2VkQ2hhciA9IHRleHQuc2xpY2UoMCwgd3JvbmdTdGFydExlbmd0aCAtIDEpO1xyXG4gICAgICAgIGNvbnN0IGZpeGVkU3RhcnQgPSB0ZXh0LnNsaWNlKHdyb25nU3RhcnRMZW5ndGggLSAxKTtcclxuICAgICAgICBmaXhlZFRleHQgPSBmaXhlZFN0YXJ0ICsgYWRkRXJhc2VkQ2hhcjtcclxuICAgIH1cclxuICAgIHJldHVybiBmaXhlZFRleHQ7XHJcbn1cclxuZnVuY3Rpb24gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCB0ZXh0RWxlbWVudCkge1xyXG4gICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24gJiYgIWlzQ3Vyc29yQXV0b01vdmVkKSB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0ZXh0RWxlbWVudCk7XHJcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xyXG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICBzZWw/LnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICAgIHNlbD8uYWRkUmFuZ2UocmFuZ2UpO1xyXG4gICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNDdXJzb3JBdXRvTW92ZWQ7XHJcbn1cclxuZnVuY3Rpb24gZml4Q3Vyc29yUG9zaXRpb24odGV4dEVsZW1lbnQsIHJhbmdlLCBzZWxlY3Rpb24sIHNob3VsZFNldEVuZCkge1xyXG4gICAgcmFuZ2Uuc2V0U3RhcnQodGV4dEVsZW1lbnQsIDApO1xyXG4gICAgaWYgKHNob3VsZFNldEVuZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJhbmdlLnNldEVuZCh0ZXh0RWxlbWVudCwgMSk7XHJcbiAgICB9XHJcbiAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuICAgIHNlbGVjdGlvbj8ucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICBzZWxlY3Rpb24/LmFkZFJhbmdlKHJhbmdlKTtcclxufVxyXG5mdW5jdGlvbiBmaXhGaXJzdExldHRlcihmc3RMZXQsIHJlZ2V4LCB0ZXh0RWxlbWVudCwgcmFuZ2UsIHNlbGVjdGlvbiwgc2hvdWxkU2V0RW5kKSB7XHJcbiAgICBsZXQgY29udFRleHQgPSB0ZXh0RWxlbWVudC52YWx1ZSB8fCB0ZXh0RWxlbWVudC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgY29uc3QgZmlyc3RMZXR0ZXJNYXRjaCA9IGZzdExldD8ubWF0Y2gocmVnZXgpO1xyXG4gICAgaWYgKGZpcnN0TGV0dGVyTWF0Y2gpIHtcclxuICAgICAgICBjb25zdCBjYXBpdGFsaXplZEZpcnN0TGV0dGVyID0gZnN0TGV0Py50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGNvbnN0IG5leHRMZXR0ZXJzID0gY29udFRleHQuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgY29udFRleHQgPSBjYXBpdGFsaXplZEZpcnN0TGV0dGVyICsgbmV4dExldHRlcnM7XHJcbiAgICAgICAgY29uc3QgZmlyc3RMZXR0ZXJNYXRjaCA9IGZzdExldD8ubWF0Y2gocmVnZXgpO1xyXG4gICAgICAgIGlmIChmaXJzdExldHRlck1hdGNoKSB7XHJcbiAgICAgICAgICAgIGlmIChyYW5nZS5lbmRPZmZzZXQgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgZml4Q3Vyc29yUG9zaXRpb24odGV4dEVsZW1lbnQsIHJhbmdlLCBzZWxlY3Rpb24sIHNob3VsZFNldEVuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29udFRleHQ7XHJcbn1cclxuZnVuY3Rpb24gZml4V3JvbmdTdGFydHModGV4dCwgbWF0Y2gsIGxlbmd0aCkge1xyXG4gICAgbGV0IGZpeGVkU3RyID0gdGV4dCA/PyBcIlwiO1xyXG4gICAgaWYgKHRleHQgJiYgbWF0Y2gpIHtcclxuICAgICAgICBjb25zdCB3cm9uZ0NoYXJJbmRleCA9IHRleHQuaW5kZXhPZihtYXRjaCk7XHJcbiAgICAgICAgY29uc3QgYXJyVGV4dCA9IEFycmF5LmZyb20odGV4dCk7XHJcbiAgICAgICAgYXJyVGV4dC5zcGxpY2Uod3JvbmdDaGFySW5kZXgsIGxlbmd0aCwgXCJcIik7XHJcbiAgICAgICAgZml4ZWRTdHIgPSBhcnJUZXh0LnRvU3RyaW5nKCkucmVwbGFjZUFsbChcIixcIiwgXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZml4ZWRTdHI7XHJcbn1cclxuZnVuY3Rpb24gZml4TmV4dFdvcmRzSW5pTm90RChyZW1hZGVUZXh0LCBsZXRNYXRjaCkge1xyXG4gICAgaWYgKHJlbWFkZVRleHQpIHtcclxuICAgICAgICBjb25zdCBnTGV0TWF0Y2hJID0gcmVtYWRlVGV4dC5sYXN0SW5kZXhPZihsZXRNYXRjaCkgKyAxO1xyXG4gICAgICAgIGNvbnN0IGFjdENoYXIgPSByZW1hZGVUZXh0LmNoYXJBdChnTGV0TWF0Y2hJKTtcclxuICAgICAgICBjb25zdCBjYXBDaGFyID0gYWN0Q2hhci50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGNvbnN0IGFyclRleHQgPSBBcnJheS5mcm9tKHJlbWFkZVRleHQpO1xyXG4gICAgICAgIGFyclRleHRbZ0xldE1hdGNoSV0gPSBjYXBDaGFyO1xyXG4gICAgICAgIHJlbWFkZVRleHQgPSBhcnJUZXh0LnRvU3RyaW5nKCkucmVwbGFjZUFsbChcIixcIiwgXCJcIik7XHJcbiAgICAgICAgaWYgKHJlbWFkZVRleHQubWF0Y2goL15cXHNbXFx3XSsvZykpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVtb3ZTcGFjZVRleHQgPSByZW1hZGVUZXh0LnNsaWNlKDEsIHJlbWFkZVRleHQubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmVtYWRlVGV4dCA9IHJlbW92U3BhY2VUZXh0ICsgXCIgXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmVtYWRlVGV4dCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVtYWRlVGV4dDtcclxufVxyXG5mdW5jdGlvbiBmaXhOZXh0V29yZHNBZnRlckQocmVtYWRlVGV4dCwgbGV0TWF0Y2gpIHtcclxuICAgIGNvbnN0IGdsb2JhbExldHRlck1hdGNoSW5kZXhEID0gcmVtYWRlVGV4dFxyXG4gICAgICAgID8gcmVtYWRlVGV4dC5sYXN0SW5kZXhPZihsZXRNYXRjaCkgKyAxXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoZ2xvYmFsTGV0dGVyTWF0Y2hJbmRleEQpIHtcclxuICAgICAgICBjb25zdCBhY3R1YWxDaGFyRCA9IHJlbWFkZVRleHQ/LmNoYXJBdChnbG9iYWxMZXR0ZXJNYXRjaEluZGV4RCk7XHJcbiAgICAgICAgY29uc3QgY2FwaXRhbGl6ZWRDaGFyRCA9IGFjdHVhbENoYXJEPy50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChyZW1hZGVUZXh0ICYmIGNhcGl0YWxpemVkQ2hhckQpIHtcclxuICAgICAgICAgICAgY29uc3QgY2l0ZVRleHRBcnJheUQgPSBBcnJheS5mcm9tKHJlbWFkZVRleHQpO1xyXG4gICAgICAgICAgICBjaXRlVGV4dEFycmF5RFtnbG9iYWxMZXR0ZXJNYXRjaEluZGV4RF0gPSBjYXBpdGFsaXplZENoYXJEO1xyXG4gICAgICAgICAgICByZW1hZGVUZXh0ID0gY2l0ZVRleHRBcnJheUQudG9TdHJpbmcoKS5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVtYWRlVGV4dDtcclxufVxyXG5mdW5jdGlvbiBmaXhVbnByb3BlclVwcGVyY2FzZXModGV4dCwgbWF0Y2gsIGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHNwYWNlUmVnZXggPSAvXFxzL2c7XHJcbiAgICBjb25zdCBzcGFjZU1hdGNoZXMgPSB0ZXh0Lm1hdGNoKHNwYWNlUmVnZXgpO1xyXG4gICAgY29uc3QgdXBwZXJDYXNlc1JlcGV0aXRpb25zSW5kZXggPSB0ZXh0LmluZGV4T2YobWF0Y2gpO1xyXG4gICAgY29uc3QgcmVwZWF0ZWRMZXR0ZXIgPSBtYXRjaC5zbGljZSgwLCAxKTtcclxuICAgIGNvbnN0IHRleHRCZWZvcmVSZXBldGl0aW9ucyA9IHRleHQuc3Vic3RyaW5nKDAsIHVwcGVyQ2FzZXNSZXBldGl0aW9uc0luZGV4KTtcclxuICAgIGxldCBhZGRBY3VtdWxhdG9yID0gMDtcclxuICAgIGxldCBsb3dlcmVkUmVwZXRpdGlvbnMgPSBcIlwiO1xyXG4gICAgbG93ZXJlZFJlcGV0aXRpb25zID0gbWF0Y2gudG9Mb3dlckNhc2UoKS5zbGljZSgxKTtcclxuICAgIGlmIChzcGFjZU1hdGNoZXMpIHtcclxuICAgICAgICBpZiAoY29udGV4dCA9PT0gXCJOb0RcIiB8fFxyXG4gICAgICAgICAgICBjb250ZXh0ID09PSBcIlllc0RDb250XCIgfHxcclxuICAgICAgICAgICAgY29udGV4dCA9PSAwIHx8XHJcbiAgICAgICAgICAgIGNvbnRleHQgPT09IDIgfHxcclxuICAgICAgICAgICAgIWNvbnRleHQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQgPT09IFwiWWVzRENvbnRcIiB8fCBjb250ZXh0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VzUmVnZXggPSAvW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XS9nO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlc01hdGNoZXMgPSB0ZXh0Lm1hdGNoKGxvd2VyY2FzZXNSZWdleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlc01hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1Mb3dlcmNhc2VzID0gbG93ZXJjYXNlc01hdGNoZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZEFjdW11bGF0b3IgKz0gbnVtTG93ZXJjYXNlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBudW1TcGFjZXMgPSBzcGFjZU1hdGNoZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBhZGRBY3VtdWxhdG9yICs9IG51bVNwYWNlcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGV4dCA9PT0gXCJZZXNEVmFsXCIgfHwgY29udGV4dCA9PT0gMSkge1xyXG4gICAgICAgICAgICBhZGRBY3VtdWxhdG9yID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENvbnRleHQgdmFsdWUgbm90IHN1aXRhYmxlYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgdGV4dEFmdGVyUmVwZXRpdGlvbnMgPSB0ZXh0LnNsaWNlKHVwcGVyQ2FzZXNSZXBldGl0aW9uc0luZGV4ICsgMSArIGxvd2VyZWRSZXBldGl0aW9ucy5sZW5ndGggLSBhZGRBY3VtdWxhdG9yLCB0ZXh0Lmxlbmd0aCArIDEpO1xyXG4gICAgY29uc3QgdGV4dEFycmF5ID0gQXJyYXkuZnJvbSh0ZXh0KTtcclxuICAgIHRleHRBcnJheS5zcGxpY2UodXBwZXJDYXNlc1JlcGV0aXRpb25zSW5kZXggKyAxLCBsb3dlcmVkUmVwZXRpdGlvbnMubGVuZ3RoLCBsb3dlcmVkUmVwZXRpdGlvbnMpO1xyXG4gICAgaWYgKGNvbnRleHQgPT09IFwiTm9EXCIgfHwgY29udGV4dCA9PSAwIHx8ICFjb250ZXh0KSB7XHJcbiAgICAgICAgdGV4dCA9XHJcbiAgICAgICAgICAgIHRleHRCZWZvcmVSZXBldGl0aW9ucyArXHJcbiAgICAgICAgICAgICAgICByZXBlYXRlZExldHRlciArXHJcbiAgICAgICAgICAgICAgICBsb3dlcmVkUmVwZXRpdGlvbnMgK1xyXG4gICAgICAgICAgICAgICAgdGV4dEFmdGVyUmVwZXRpdGlvbnM7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb250ZXh0ID09PSBcIlllc0RWYWxcIikge1xyXG4gICAgICAgIGNvbnN0IHVwcGVybG93ZXJjb21iRCA9IHRleHQubWF0Y2goL0RbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW3NTXT9bXFxzXS8pO1xyXG4gICAgICAgIGlmICh1cHBlcmxvd2VyY29tYkQpIHtcclxuICAgICAgICAgICAgaWYgKHVwcGVybG93ZXJjb21iRC5sZW5ndGggPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyZWRTID0gdXBwZXJsb3dlcmNvbWJELnRvU3RyaW5nKCkucmVwbGFjZSgvUy8sIFwic1wiKTtcclxuICAgICAgICAgICAgICAgIGxvd2VyZWRSZXBldGl0aW9ucyArPSBsb3dlcmVkUztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXh0ID0gdGV4dEJlZm9yZVJlcGV0aXRpb25zICsgbG93ZXJlZFJlcGV0aXRpb25zICsgdGV4dEFmdGVyUmVwZXRpdGlvbnM7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb250ZXh0ID09PSBcIlllc0RDb250XCIpIHtcclxuICAgICAgICBjb25zdCBtdWx0aXBsZUNvbmpGaXggPSAvRFthZWlvdcOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtzXVxcc1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF17Myx9LztcclxuICAgICAgICBjb25zdCBtdWx0aXBsZUNvbmpGaXhNYXRjaCA9IHRleHQubWF0Y2gobXVsdGlwbGVDb25qRml4KTtcclxuICAgICAgICBpZiAobXVsdGlwbGVDb25qRml4TWF0Y2gpIHtcclxuICAgICAgICAgICAgdGV4dCA9XHJcbiAgICAgICAgICAgICAgICB0ZXh0QmVmb3JlUmVwZXRpdGlvbnMgKyBsb3dlcmVkUmVwZXRpdGlvbnMgKyBcIlNcIiArIHRleHRBZnRlclJlcGV0aXRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHRCZWZvcmVSZXBldGl0aW9ucyArIGxvd2VyZWRSZXBldGl0aW9ucyArIHRleHRBZnRlclJlcGV0aXRpb25zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYENvbnRleHQgdmFsdWUgbm90IHN1aXRhYmxlYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxufVxyXG5mdW5jdGlvbiBmaXhGb3JjZWRVcHBlckNhc2UodGV4dEVsZW1lbnQsIHdvcmRNYXRjaCwgd01hdGNoSXRlcmF0aW9uKSB7XHJcbiAgICBsZXQgdGV4dCA9IHRleHRFbGVtZW50LnZhbHVlIHx8IHRleHRFbGVtZW50LnRleHRDb250ZW50IHx8IFwiXCI7XHJcbiAgICBjb25zdCBzdHJEbG93ZXJjYXNlID0gd01hdGNoSXRlcmF0aW9uLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCBEVXBwZXJjYXNlZCA9IHN0ckRsb3dlcmNhc2UuY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAoRFVwcGVyY2FzZWQpIHtcclxuICAgICAgICBjb25zdCBzdHJEQWZ0ZXIgPSBzdHJEbG93ZXJjYXNlLnN1YnN0cmluZygwLCAxKSArIERVcHBlcmNhc2VkICsgc3RyRGxvd2VyY2FzZS5zdWJzdHJpbmcoMik7XHJcbiAgICAgICAgY29uc3Qgc3RyREFmdGVyTWludXNJbmQgPSAodGV4dD8ubGVuZ3RoID8/IDApIC0gc3RyREFmdGVyLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBvcHBvc2l0ZVNsaWNlZENpdGUgPSB0ZXh0Py5zbGljZShzdHJEQWZ0ZXJNaW51c0luZCk7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRTbGljZWRDaXRlID0gdGV4dD8uc2xpY2UoMCwgc3RyREFmdGVyTWludXNJbmQpO1xyXG4gICAgICAgIGlmICh3b3JkTWF0Y2gubGVuZ3RoID49IDEgJiYgc3RhcnRTbGljZWRDaXRlKVxyXG4gICAgICAgICAgICB0ZXh0ID0gc3RhcnRTbGljZWRDaXRlICsgb3Bwb3NpdGVTbGljZWRDaXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9DYXBpdGFsaXplSW5wdXRzKHRleHRFbGVtZW50KSB7XHJcbiAgICBsZXQgdGV4dCA9IHRleHRFbGVtZW50Py52YWx1ZSA/PyBudWxsO1xyXG4gICAgaWYgKGlzQXV0b2NvcnJlY3RPbiAmJiB0ZXh0KSB7XHJcbiAgICAgICAgLy9pbmljaWFsaXphw6fDo28gZGUgZXhwcmVzc8O1ZXMgcmVnZXggY29tIHNldXMgb2JqZXRvcyBlIG1hdGNoZXMgYXNzb2NpYWRvc1xyXG4gICAgICAgIGNvbnN0IG5ld1dvcmRNYXRjaGVzID0gdGV4dC5tYXRjaCgvXFxzW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXT9bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rXFxzP1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0/W2EtekEtWsOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8w4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdKi9nKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzSW5pTm90RCA9IHRleHQubWF0Y2goL1xcc1teZF0vZyk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0luaUQgPSB0ZXh0Lm1hdGNoKC9cXHNkL2cpO1xyXG4gICAgICAgIGNvbnN0IG5vdE1hdGNoZXNBZnRlckRSZWdleCA9IC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdP1xccy9nO1xyXG4gICAgICAgIGxldCBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEID0gdGV4dC5tYXRjaChub3RNYXRjaGVzQWZ0ZXJEUmVnZXgpID8/IFtdO1xyXG4gICAgICAgIGNvbnN0IGFmdGVyRFJlZ2V4T3AxID0gL1xcc2RbXmFlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZztcclxuICAgICAgICBjb25zdCBhZnRlckRSZWdleE9wMiA9IC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bXnNTXFxzXS9nO1xyXG4gICAgICAgIGNvbnN0IGFmdGVyRFJlZ2V4T3AzID0gL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU11bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZztcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxID0gdGV4dC5tYXRjaChhZnRlckRSZWdleE9wMSk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiA9IHRleHQubWF0Y2goYWZ0ZXJEUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNBZnRlckRPcDMgPSB0ZXh0Lm1hdGNoKGFmdGVyRFJlZ2V4T3AzKTtcclxuICAgICAgICBjb25zdCBsb3dlcmNhc2VzUmVnZXggPSAvW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XS9nO1xyXG4gICAgICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleE9iaiA9IG5ldyBSZWdFeHAobG93ZXJjYXNlc1JlZ2V4KTtcclxuICAgICAgICBjb25zdCB1cHBlcmNhc2VzUmVnZXggPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS87XHJcbiAgICAgICAgY29uc3QgdXBwZXJjYXNlc1JlZ2V4T2JqID0gbmV3IFJlZ0V4cCh1cHBlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc1JlZ2V4ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF17Mix9L2c7XHJcbiAgICAgICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyA9IHRleHQubWF0Y2gobXVsdGlwbGVVcHBlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc1JlZ2V4MiA9IC9EW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtTXVxccy9nO1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMyID0gdGV4dC5tYXRjaChtdWx0aXBsZVVwcGVyY2FzZXNSZWdleDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AxID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1cXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AxID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDIgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMiA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AzID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XXsyLDN9XFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDMpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A0ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNCA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDQpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A1ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdezEsMn1bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rXFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNSA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDUpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A2ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A2ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNik7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDcgPSAvRFtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNyA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDcpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A4ID0gL0RbQUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NdL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOCA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDgpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A5ID0gL0RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU11cXHMvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A5ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wOSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdTdGFydFJlZ2V4ID0gL15bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vO1xyXG4gICAgICAgIGNvbnN0IHdyb25nU3RhcnRNYXRjaCA9IHRleHQubWF0Y2god3JvbmdTdGFydFJlZ2V4KT8udG9TdHJpbmcoKSA/PyBudWxsO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMSA9IC9bXFxzXSpbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rW1xcc10qW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKi9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AxID0gdGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDEpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMiA9IC8kW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AyID0gdGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMyA9IC8oPzw9XFxzZEQpW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AzID0gdGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDMpO1xyXG4gICAgICAgIC8vaW5pY2lhbGl6YcOnw6NvIGRlIG91dHJhcyB2YXJpw6F2ZWlzXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICBsZXQgcmVtYWRlVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgbGV0IGlzVW5kb1VwcGVyY2FzZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc0N1cnNvckF1dG9Nb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA9PT0gMSAmJiAhbmV3V29yZE1hdGNoZXMpIHtcclxuICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSBmaXhGaXJzdExldHRlcih0ZXh0WzBdLCBhdXRvQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyUmVnZXgsIHRleHRFbGVtZW50LCByYW5nZSwgc2VsZWN0aW9uLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRleHQubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBpZiAodGV4dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wQXN0XCIpIHx8XHJcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBJZGVudGlmXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBlbmNhcHN1bGFyIGNvcnJlw6fDo28gZGUgaW7DrWNpb3MgaW5jb3JyZXRvcyBkZSBlbnRyYWRhXHJcbiAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ0NoYXJzTWF0Y2hlc09wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaVcgPSAwOyBpVyA8IHdyb25nQ2hhcnNNYXRjaGVzLmxlbmd0aDsgaVcrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd3JvbmdDaGFyTGVuZ3RoID0gd3JvbmdDaGFyc01hdGNoZXNbaVddLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzLmZvckVhY2goKHdyb25nQ2hhck1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSBmaXhXcm9uZ1N0YXJ0cyh0ZXh0LCB3cm9uZ0NoYXJNYXRjaCwgd3JvbmdDaGFyTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAod3JvbmdTdGFydE1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0Q29ycmVjdGlvbih0ZXh0RWxlbWVudC52YWx1ZSwgd3JvbmdTdGFydE1hdGNoKSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1dvcmRNYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3V29yZE1hdGNoZXMuZm9yRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGNhcGl0YWxpemFyIHBhbGF2cmFzIGFww7NzIGEgcHJpbWVpcmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiAhbGV0dGVyTWF0Y2hlc0luaUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RC5mb3JFYWNoKChsZXR0ZXJNYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVUZXh0ID0gZml4TmV4dFdvcmRzSW5pTm90RChyZW1hZGVUZXh0LCBsZXR0ZXJNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSByZW1hZGVUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nU3RhcnRDb3JyZWN0aW9uKHRleHRFbGVtZW50LnZhbHVlLCB3cm9uZ1N0YXJ0TWF0Y2gpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKGxldHRlck1hdGNoZXNJbmlOb3REICYmIGxldHRlck1hdGNoZXNJbmlEKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICghbGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgbGV0dGVyTWF0Y2hlc0luaUQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgY29ycmXDp8OjbyBmb2NhZGEgZW0gY29uanVuw6fDo28gY29tIERcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmIGxldHRlck1hdGNoZXNJbmlOb3REKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFsuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0luaU5vdEQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjYXBpdGFsaXphw6fDo28gZm9jYWRhIGVtIGluaWNpYWlzIERcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQ/LmZvckVhY2goKGxldHRlck1hdGNoRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVRleHQgPSBmaXhOZXh0V29yZHNBZnRlckQocmVtYWRlVGV4dCwgbGV0dGVyTWF0Y2hEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSByZW1hZGVUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlDaGVja0xvd2VyQ2FzZXNEID0gQXJyYXkuZnJvbShsZXR0ZXJNYXRjaGVzQWZ0ZXJEID8/IFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlEID0gMDsgaUQgPCBhcnJheUNoZWNrTG93ZXJDYXNlc0QubGVuZ3RoOyBpRCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBcnJheUQgPSBsZXR0ZXJNYXRjaGVzQWZ0ZXJEPy5maWx0ZXIoKGlEKSA9PiBsb3dlcmNhc2VzUmVnZXhPYmoudGVzdChpRCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZEFycmF5RCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWRBcnJheUQgPSBmaWx0ZXJlZEFycmF5RC5tYXAoKGlEKSA9PiBpRC50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbWFkZVN0cmluZ0QgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnTGV0dGVyID0gZmlsdGVyZWRBcnJheURbaURdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdleFRhcmdMZXR0ZXIgPSBuZXcgUmVnRXhwKHRhcmdMZXR0ZXIsIFwiZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlEID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5zcGxpY2UoaUQsIDEsIG1hcHBlZEFycmF5RFswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVTdHJpbmdEID0gZmlsdGVyZWRBcnJheURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RleHRFbGVtZW50LnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaUQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnNwbGljZShpRCwgMSwgbWFwcGVkQXJyYXlEWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0QgPSBmaWx0ZXJlZEFycmF5RFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCB0ZXh0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0RWxlbWVudC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID0gdGV4dEVsZW1lbnQudmFsdWUucmVwbGFjZShyZWdleFRhcmdMZXR0ZXIsIHJlbWFkZVN0cmluZ0QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlEID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5wdXNoKG1hcHBlZEFycmF5RFtpRF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCB0ZXh0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9zdGF0ZW1lbnQgcGFyYSBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcclxuICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzIHx8IG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgZW5jYXBzdWxhciBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcclxuICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1bnByb3BlclVwcGVyY2FzZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNCB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVucHJvcGVyRFVwcGVyY2FzZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOCB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVucHJvcGVyVXBwZXJjYXNlcy5mb3JFYWNoKChtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQgJiYgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZml4VW5wcm9wZXJVcHBlcmNhc2VzKHRleHQsIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoLCBcIk5vRFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvcnJlw6fDo28gZGUgYnVncyBjb20gY29tYmluYcOnw7VlcyBwb3N0ZXJpb3JlcyBkZSB1cHBlci9sb3dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHVwcGVybG93ZXJjb21iID0gdGV4dC5tYXRjaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC9bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS9nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB1cHBlcmxvd2VyY29tYkQgPSB0ZXh0Lm1hdGNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgL0RbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW1xcc10vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodXBwZXJsb3dlcmNvbWIgfHwgdXBwZXJsb3dlcmNvbWJEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICByZXBlYXRlZExldHRlciA9IHJlcGVhdGVkTGV0dGVyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZml4IHBhcmEgZGVsYXkgZW0gcHJvY2Vzc2FtZW50byBkbyBTIGVtIGNvbmp1bsOnw7Vlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwcGVybG93ZXJjb21iRFMgPSB0ZXh0Lm1hdGNoKC9EW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtTXVtcXHNdLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwcGVybG93ZXJjb21iRFMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXJsb3dlcmNvbWJEUy5zcGxpY2UoMywgMSwgXCJzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IHRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeEN1cnNvclBvc2l0aW9uKHRleHRFbGVtZW50LCByYW5nZSwgc2VsZWN0aW9uLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bnByb3BlckRVcHBlcmNhc2VzLmZvckVhY2goKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dCAmJiBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID0gZml4VW5wcm9wZXJVcHBlcmNhc2VzKHRleHQsIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoLCBcIlllc0RWYWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeEN1cnNvclBvc2l0aW9uKHRleHRFbGVtZW50LCByYW5nZSwgc2VsZWN0aW9uLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3N0YXRlbWVudCBwYXJhIGNvbnRyb2xlIGRlIGNvbWJpbmHDp8OjbyBhcMOzcyBlbnRyYWRhIGNvbSBpbmljaWFsIERcclxuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAhKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldHRlck5vdE1hdGNoZXNBZnRlckQgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vc3RhdGVtZW50IHBhcmEgZmx1eG8gdmFsaWRhbmRvIG1hdGNoIGRlIGluaWNpYWlzXHJcbiAgICAgICAgICAgICAgICBpZiAobGV0dGVyTWF0Y2hlc0luaUQgfHwgbGV0dGVyTWF0Y2hlc0luaU5vdEQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBmb3LDp2FyIHVwcGVyIGNhc2VcclxuICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JkTWF0Y2ggPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBETWF0Y2ggPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlNID0gMDsgaU0gPCB3b3JkTWF0Y2gubGVuZ3RoOyBpTSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cHBlcmNhc2VUZXN0ID0gdXBwZXJjYXNlc1JlZ2V4T2JqLnRlc3Qod29yZE1hdGNoW2lNXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBwZXJjYXNlVGVzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID0gZml4Rm9yY2VkVXBwZXJDYXNlKHRleHRFbGVtZW50LCB3b3JkTWF0Y2gsIHdvcmRNYXRjaFtpTV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKERNYXRjaC5mbGF0KDEpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgZmF6ZXIgY29ycmXDp8O1ZXMgYWRpY2lvbmFpcyBubyBmaW5hbCBkYSBlZGnDp8OjbyBhdXRvbcOhdGljYVxyXG4gICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWU/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AxLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWU/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AyLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWU/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AzLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5tYXRjaCgvXFxzW1xcc10rL2cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlPy5yZXBsYWNlQWxsKC9cXHNbXFxzXSsvZywgXCIgXCIpID8/IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0Lm1hdGNoKC9eW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XS8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0TGV0dGVyQ2FwaXRhbGl6ZWQgPSB0ZXh0LnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3RPZlRleHQgPSB0ZXh0LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IGZpcnN0TGV0dGVyQ2FwaXRhbGl6ZWQgKyByZXN0T2ZUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9DYXBpdGFsaXplQ2l0ZShlZGl0YWJsZUNpdGUpIHtcclxuICAgIGNvbnN0IGNpdGVUZXh0ID0gZWRpdGFibGVDaXRlPy50ZXh0Q29udGVudCA/PyBudWxsO1xyXG4gICAgaWYgKGlzQXV0b2NvcnJlY3RPbiAmJiBjaXRlVGV4dCkge1xyXG4gICAgICAgIC8vaW5pY2lhbGl6YcOnw6NvIGRlIGV4cHJlc3PDtWVzIHJlZ2V4IGNvbSBzZXVzIG9iamV0b3MgZSBtYXRjaGVzIGFzc29jaWFkb3NcclxuICAgICAgICBjb25zdCBuZXdXb3JkTWF0Y2hlcyA9IGNpdGVUZXh0Lm1hdGNoKC9cXHNbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdP1thLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStcXHM/W0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXT9bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0qL2cpO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNJbmlOb3REID0gY2l0ZVRleHQubWF0Y2goL1xcc1teZF0vZyk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0luaUQgPSBjaXRlVGV4dC5tYXRjaCgvXFxzZC9nKTtcclxuICAgICAgICBjb25zdCBub3RNYXRjaGVzQWZ0ZXJEUmVnZXggPSAvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXT9cXHMvZztcclxuICAgICAgICBsZXQgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCA9IGNpdGVUZXh0Lm1hdGNoKG5vdE1hdGNoZXNBZnRlckRSZWdleCkgPz8gW107XHJcbiAgICAgICAgY29uc3QgYWZ0ZXJEUmVnZXhPcDEgPSAvXFxzZFteYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS9nO1xyXG4gICAgICAgIGNvbnN0IGFmdGVyRFJlZ2V4T3AyID0gL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NcXHNdL2c7XHJcbiAgICAgICAgY29uc3QgYWZ0ZXJEUmVnZXhPcDMgPSAvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXVthLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS9nO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNBZnRlckRPcDEgPSBjaXRlVGV4dC5tYXRjaChhZnRlckRSZWdleE9wMSk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiA9IGNpdGVUZXh0Lm1hdGNoKGFmdGVyRFJlZ2V4T3AyKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzID0gY2l0ZVRleHQubWF0Y2goYWZ0ZXJEUmVnZXhPcDMpO1xyXG4gICAgICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleCA9IC9bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdL2c7XHJcbiAgICAgICAgY29uc3QgbG93ZXJjYXNlc1JlZ2V4T2JqID0gbmV3IFJlZ0V4cChsb3dlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIC8vIGNvbnN0IGxvd2VyY2FzZXNNYXRjaGVzID0gY2l0ZVRleHQubWF0Y2gobG93ZXJjYXNlc1JlZ2V4KTtcclxuICAgICAgICBjb25zdCB1cHBlcmNhc2VzUmVnZXggPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS87XHJcbiAgICAgICAgY29uc3QgdXBwZXJjYXNlc1JlZ2V4T2JqID0gbmV3IFJlZ0V4cCh1cHBlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc1JlZ2V4ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF17Mix9L2c7XHJcbiAgICAgICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyA9IGNpdGVUZXh0Lm1hdGNoKG11bHRpcGxlVXBwZXJjYXNlc1JlZ2V4KTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMSA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdXFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMSA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AxKTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMiA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AyID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AzID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XXsyLDN9XFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AzKTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNCA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDQgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNCk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDUgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF17MSwyfVtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEEtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A1ID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDUpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A2ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A2ID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDYpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A3ID0gL0RbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXS9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDcgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNyk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDggPSAvRFtBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW15zU10vZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A4ID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDgpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A5ID0gL0RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtzXVxccy9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDkgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wOSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdTdGFydFJlZ2V4ID0gL15bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vO1xyXG4gICAgICAgIGNvbnN0IHdyb25nU3RhcnRNYXRjaCA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nU3RhcnRSZWdleCk/LnRvU3RyaW5nKCkgPz8gbnVsbDtcclxuICAgICAgICBjb25zdCB3cm9uZ0NoYXJzUmVnZXhPcDEgPSAvW1xcc10qW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dK1tcXHNdKltcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXSovZztcclxuICAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlc09wMSA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AyID0gLyRbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDIgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMyA9IC8oPzw9XFxzZEQpW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AzID0gY2l0ZVRleHQubWF0Y2god3JvbmdDaGFyc1JlZ2V4T3AzKTtcclxuICAgICAgICAvL2luaWNpYWxpemHDp8OjbyBkZSBvdXRyYXMgdmFyacOhdmVpc1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgbGV0IHJlbWFkZUNpdGVUZXh0ID0gY2l0ZVRleHQ7XHJcbiAgICAgICAgbGV0IGlzQ3Vyc29yQXV0b01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzQWxlcnRNYWRlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzU3BhbkFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc1VuZG9VcHBlcmNhc2UgPSBmYWxzZTtcclxuICAgICAgICAvL3N0YXRlbWVudCBwYXJhIGRpZmVyZW5jaWFyIGluw61jaW8gZG8gcmVzdGFudGUgZG8gaW5wdXRcclxuICAgICAgICBpZiAoY2l0ZVRleHQubGVuZ3RoID09PSAxICYmICFuZXdXb3JkTWF0Y2hlcykge1xyXG4gICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSBmaXhGaXJzdExldHRlcihjaXRlVGV4dFswXSwgYXV0b0NhcGl0YWxpemVGaXJzdExldHRlclJlZ2V4LCBlZGl0YWJsZUNpdGUsIHJhbmdlLCBzZWxlY3Rpb24sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjaXRlVGV4dC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIC8vSUlGRSBwYXJhIGVuY2Fwc3VsYXIgY29ycmXDp8OjbyBkZSBpbsOtY2lvcyBpbmNvcnJldG9zIGRlIGVudHJhZGFcclxuICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXNPcDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlXID0gMDsgaVcgPCB3cm9uZ0NoYXJzTWF0Y2hlcy5sZW5ndGg7IGlXKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd3JvbmdDaGFyTGVuZ3RoID0gd3JvbmdDaGFyc01hdGNoZXNbaVddLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXMuZm9yRWFjaCgod3JvbmdDaGFyTWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeFdyb25nU3RhcnRzKGNpdGVUZXh0LCB3cm9uZ0NoYXJNYXRjaCwgd3JvbmdDaGFyTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICBpZiAod3JvbmdTdGFydE1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSB3cm9uZ1N0YXJ0Q29ycmVjdGlvbihlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIHdyb25nU3RhcnRNYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ld1dvcmRNYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdXb3JkTWF0Y2hlcy5mb3JFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjYXBpdGFsaXphciBwYWxhdnJhcyBhcMOzcyBhIHByaW1laXJhXHJcbiAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlOb3REICYmICFsZXR0ZXJNYXRjaGVzSW5pRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0luaU5vdEQuZm9yRWFjaCgobGV0dGVyTWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVDaXRlVGV4dCA9IGZpeE5leHRXb3Jkc0luaU5vdEQocmVtYWRlQ2l0ZVRleHQsIGxldHRlck1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gcmVtYWRlQ2l0ZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSB3cm9uZ1N0YXJ0Q29ycmVjdGlvbihlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIHdyb25nU3RhcnRNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKGxldHRlck1hdGNoZXNJbmlOb3REICYmIGxldHRlck1hdGNoZXNJbmlEKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiBsZXR0ZXJNYXRjaGVzSW5pRCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGNvcnJlw6fDo28gZm9jYWRhIGVtIGNvbmp1bsOnw6NvIGNvbSBEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiYgbGV0dGVyTWF0Y2hlc0luaU5vdEQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbLi4uKGxldHRlck1hdGNoZXNJbmlOb3REIHx8IFtdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0luaU5vdEQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGNhcGl0YWxpemHDp8OjbyBmb2NhZGEgZW0gaW5pY2lhaXMgRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQuZm9yRWFjaCgobGV0dGVyTWF0Y2hEKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVDaXRlVGV4dCA9IGZpeE5leHRXb3Jkc0FmdGVyRChyZW1hZGVDaXRlVGV4dCwgbGV0dGVyTWF0Y2hEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IHJlbWFkZUNpdGVUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheUNoZWNrTG93ZXJDYXNlc0QgPSBBcnJheS5mcm9tKGxldHRlck1hdGNoZXNBZnRlckQgPz8gW10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpRCA9IDA7IGlEIDwgYXJyYXlDaGVja0xvd2VyQ2FzZXNELmxlbmd0aDsgaUQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBcnJheUQgPSBsZXR0ZXJNYXRjaGVzQWZ0ZXJEPy5maWx0ZXIoKGlEKSA9PiBsb3dlcmNhc2VzUmVnZXhPYmoudGVzdChpRCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkQXJyYXlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwcGVkQXJyYXlEID0gZmlsdGVyZWRBcnJheUQubWFwKChpRCkgPT4gaUQudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbWFkZVN0cmluZ0QgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdMZXR0ZXIgPSBmaWx0ZXJlZEFycmF5RFtpRF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnZXhUYXJnTGV0dGVyID0gbmV3IFJlZ0V4cCh0YXJnTGV0dGVyLCBcImdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlEID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVTdHJpbmdEID0gZmlsdGVyZWRBcnJheURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChcIixcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlEID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVTdHJpbmdEID0gZmlsdGVyZWRBcnJheURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChcIixcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQucmVwbGFjZShyZWdleFRhcmdMZXR0ZXIsIHJlbWFkZVN0cmluZ0QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlEID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQucHVzaChtYXBwZWRBcnJheURbaURdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgZW5jYXBzdWxhciBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcclxuICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5wcm9wZXJVcHBlcmNhc2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A0IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDUgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bnByb3BlckRVcHBlcmNhc2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A4IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDkgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgdW5wcm9wZXJVcHBlcmNhc2VzLmZvckVhY2goKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaXRlVGV4dCAmJiBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4VW5wcm9wZXJVcHBlcmNhc2VzKGNpdGVUZXh0LCBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCwgXCJOb0RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KGlzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5wcm9wZXJEVXBwZXJjYXNlcy5mb3JFYWNoKChtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2l0ZVRleHQgJiYgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeFVucHJvcGVyVXBwZXJjYXNlcyhjaXRlVGV4dCwgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gsIFwiWWVzRENvbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KGlzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vc3RhdGVtZW50IHBhcmEgY29ycmXDp8OjbyBkZSBibG9jb3MgYXDDs3MgaW5pY2lhbCBjb20gRFxyXG4gICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pRCAmJlxyXG4gICAgICAgICAgICBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICEobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMykpIHtcclxuICAgICAgICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3N0YXRlbWVudCBwYXJhIGNvcnJlw6fDo28gZGUgbcO6bHRpcGxvcyB1cHBlciBjYXNlcyBmb3LDp2Fkb3MgaW5kZXZpZGFtZW50ZVxyXG4gICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pRCB8fCBsZXR0ZXJNYXRjaGVzSW5pTm90RCkge1xyXG4gICAgICAgICAgICAvL0lJRkUgcGFyYSBmb3LDp2FyIHVwcGVyIGNhc2VcclxuICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRNYXRjaCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IERNYXRjaCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpTSA9IDA7IGlNIDwgd29yZE1hdGNoLmxlbmd0aDsgaU0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwcGVyY2FzZVRlc3QgPSB1cHBlcmNhc2VzUmVnZXhPYmoudGVzdCh3b3JkTWF0Y2hbaU1dKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXBwZXJjYXNlVGVzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4Rm9yY2VkVXBwZXJDYXNlKGVkaXRhYmxlQ2l0ZSwgd29yZE1hdGNoLCB3b3JkTWF0Y2hbaU1dKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoRE1hdGNoLmZsYXQoMSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vSUlGRSBwYXJhIGZhemVyIGNvcnJlw6fDtWVzIG5vIGZpbmFsIGRhIGVkacOnw6NvIGF1dG9tw6F0aWNhXHJcbiAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AxKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDEsIFwiXCIpID8/IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDIpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50Py5yZXBsYWNlQWxsKHdyb25nQ2hhcnNSZWdleE9wMiwgXCJcIikgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AzLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudD8ubWF0Y2goL1xcc1tcXHNdKy9nKSkge1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwoL1xcc1tcXHNdKy9nLCBcIiBcIikgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuICAgIC8vZGVjbGFyYcOnw7VlcyBkZSBmdW7Dp8O1ZXMgbG9jYWlzXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTcGFuQWxlcnQoaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZSkge1xyXG4gICAgICAgIGNvbnN0IHJnYmFSZWdleCA9IC9yZ2JhXFwoKFxcZCspLCAoXFxkKyksIChcXGQrKSwgKFtcXGQuXSspXFwpLztcclxuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlUmVnZXggPSAvLFxcZCsuP1xcZCouP1xcZCovZztcclxuICAgICAgICBpZiAoZWRpdGFibGVDaXRlLm5leHRFbGVtZW50U2libGluZyAmJlxyXG4gICAgICAgICAgICBlZGl0YWJsZUNpdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0Q2l0ZUVsZW1lbnRTaWJsaW5nID0gZWRpdGFibGVDaXRlLm5leHRFbGVtZW50U2libGluZy5pZDtcclxuICAgICAgICAgICAgaWYgKG5leHRDaXRlRWxlbWVudFNpYmxpbmcgPT09IFwiZGVhY3RBdXRvY29ycmVjdEJ0blwiICYmICFpc1NwYW5BY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnNvclJlc2V0QWxlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNBbGVydE1hZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LnRleHRDb250ZW50ID0gXCJDdXJzb3IgcmVzZXRhZG8hIEFwZXJ0ZSBhbGd1bWEgdGVjbGFcIjtcclxuICAgICAgICAgICAgICAgICAgICBpc0FsZXJ0TWFkZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUucGFyZW50Tm9kZT8uaW5zZXJ0QmVmb3JlKGN1cnNvclJlc2V0QWxlcnQsIGVkaXRhYmxlQ2l0ZS5uZXh0U2libGluZyk7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYnJpZWZBbGVydFwiKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJicmllZkFsZXJ0Q2l0ZVwiKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc3R5bGUuc2V0UHJvcGVydHkoXCJib3JkZXItY29sb3JcIiwgXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc3R5bGUuc2V0UHJvcGVydHkoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc3R5bGUuc2V0UHJvcGVydHkoXCJmb250LXNpemVcIiwgXCI4cHhcIik7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUuc3R5bGUuc2V0UHJvcGVydHkoXCJib3JkZXItY29sb3JcIiwgXCJyZ2JhKDI1NSwgMTY1LCAwLCAwLjkpXCIpOyAvL2FsZXJ0YXIgdXN1w6FyaW8gZGEgbXVkYW7Dp2EgZGUgY3Vyc29yIGRldmlkbyDDoCByZWNvbnN0cnXDp8OjbyBkbyB0ZXh0Q29udGVudCBlZGl0w6F2ZWxcclxuICAgICAgICAgICAgICAgIGlzU3BhbkFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlQ2l0ZSA9IHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZShlZGl0YWJsZUNpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKFwiYm9yZGVyLWNvbG9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJnYmFNYXRjaCA9IGNvbXB1dGVkU3R5bGVDaXRlLm1hdGNoKHJnYmFSZWdleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJnYmFNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWR1Y2VPcGFjaXR5ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9wcGVkQXJyYXkgPSByZ2JhTWF0Y2gucG9wKCk7IC8vZmF6IGEgcmV0aXJhZGEgaW5pY2lhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0clVwZGF0ZWRBbHBoYSA9IHBvcHBlZEFycmF5Py50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyUmdiYSA9IHJnYmFNYXRjaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwoY29tcHV0ZWRTdHlsZVJlZ2V4LCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0U2xpY2VTdHJSZ2JhID0gc3RyUmdiYS5zbGljZSgwLCAxOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyTmV3T3BhY2l0eVZhbHVlID0gZmlyc3RTbGljZVN0clJnYmEgKyBcIiBcIiArIHN0clVwZGF0ZWRBbHBoYSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0clVwZGF0ZWRBbHBoYSAmJiBzdHJVcGRhdGVkQWxwaGEgPD0gXCIwLjA1XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJVcGRhdGVkQWxwaGEgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJOZXdPcGFjaXR5VmFsdWUgPSBmaXJzdFNsaWNlU3RyUmdiYSArIFwiMClcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVkdWNlT3BhY2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUuc3R5bGUuc2V0UHJvcGVydHkoXCJib3JkZXItY29sb3JcIiwgc3RyTmV3T3BhY2l0eVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5leHRDaXRlRWxlbWVudFNpYmxpbmcgPT09IFwiYnJpZWZBbGVydENpdGVcIiB8fCBpc1NwYW5BY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIC8vYWxndW0gZWZlaXRvIHZpc3VhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZpcnN0Q2xpY2soZWRpdGFibGVDaXRlKSB7XHJcbiAgICBpZiAoZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID09PSBcIkluc2lyYSBTZXUgTm9tZSBBcXVpXCIpIHtcclxuICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgbGV0IGN1cnNvclBvc2l0aW9uID0gMDtcclxuICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBjdXJzb3JQb3NpdGlvbiA9IEdsb2JhbEhhbmRsZXIuY3Vyc29yQ2hlY2tUaW1lcihjdXJzb3JQb3NpdGlvbikgPz8gMDtcclxuICAgIH0sIDMwMDApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hBdXRvY29ycmVjdChjbGljaywgZGVhY3RBdXRvY29ycmVjdEJ0bikge1xyXG4gICAgaWYgKGNsaWNrLnRhcmdldCA9PT0gZGVhY3RBdXRvY29ycmVjdEJ0bikge1xyXG4gICAgICAgIGlzQXV0b2NvcnJlY3RPbiA9ICFpc0F1dG9jb3JyZWN0T247IC8vc2ltcGxpZmljYcOnw6NvIGRlIGlmLWVsc2U7IGlmLWlmIG7Do28gZnVuY2lvbmEgYXF1aVxyXG4gICAgICAgIGRlYWN0QXV0b2NvcnJlY3RCdG4udGV4dENvbnRlbnQgPSBpc0F1dG9jb3JyZWN0T25cclxuICAgICAgICAgICAgPyBcIkRlc2F0aXZhciBBdXRvY29ycmXDp8Ojb1wiXHJcbiAgICAgICAgICAgIDogXCJBdGl2YXIgQXV0b2NvcnJlw6fDo29cIjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tBbGxHZW5Db250cyhnZW4sIGdlbkJpcnRoUmVsLCBnZW5UcmFucywgZ2VuRmlzQWxpbikge1xyXG4gICAgbGV0IGlzR2VuVmFsaWQgPSBmYWxzZTtcclxuICAgIGxldCBpc0dlbkJpcnRoUmVsVmFsaWQgPSBmYWxzZTtcclxuICAgIGxldCBpc0dlblRyYW5zQ29udFZhbGlkID0gZmFsc2U7XHJcbiAgICBsZXQgaXNHZW5GaXNBbGluVmFsaWQgPSBmYWxzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKGdlbiAmJiBnZW4gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBpc0dlblZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gZ2VuOiBlbGVtZW50byAke2dlbn0sIGluc3TDom5jaWEgJHtnZW4gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3JHZW4pIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yR2VuLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChnZW5CaXJ0aFJlbCAmJiBnZW5CaXJ0aFJlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlzR2VuQmlydGhSZWxWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGdlbjogZWxlbWVudG8gJHtnZW5CaXJ0aFJlbH0sIGluc3TDom5jaWEgJHtnZW5CaXJ0aFJlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50fWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvckdlbkJpcnRoUmVsKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvckdlbkJpcnRoUmVsLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChnZW5UcmFucyAmJiBnZW5UcmFucyBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlzR2VuVHJhbnNDb250VmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBnZW5UcmFuczogZWxlbWVudG8gJHtnZW5UcmFuc30sIGluc3TDom5jaWEgJHtnZW5UcmFucyBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50fWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvckdlblRyYW5zKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvckdlblRyYW5zLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChnZW5GaXNBbGluICYmIGdlbkZpc0FsaW4gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBpc0dlbkZpc0FsaW5WYWxpZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGdlbkZpc0FsaW46IGVsZW1lbnRvICR7Z2VuRmlzQWxpbn0sIGluc3TDom5jaWEgJHtnZW5GaXNBbGluIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yR2VuRmlzQWxpbikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JHZW5GaXNBbGluLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXHJcbiAgICB9XHJcbiAgICBpZiAoaXNHZW5WYWxpZCAmJlxyXG4gICAgICAgIGlzR2VuQmlydGhSZWxWYWxpZCAmJlxyXG4gICAgICAgIGlzR2VuVHJhbnNDb250VmFsaWQgJiZcclxuICAgICAgICBpc0dlbkZpc0FsaW5WYWxpZCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm8gdmVyaWZpY2FuZG8gYm9vbGVhbm9zIGRlIGNvbnRhaW5lcnMgZGUgZ8OqbmVyb1wiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZsdXhHZW4oZ2VuLCBnZW5JbmlWYWx1ZSwgZ2VuQmlydGhSZWwsIGdlblRyYW5zLCBnZW5GaXNBbGluKSB7XHJcbiAgICBsZXQgZ2VuVmFsdWUgPSBcIlwiO1xyXG4gICAgaWYgKGdlbi52YWx1ZSA9PT0gXCJtYXNjdWxpbm9cIiB8fCBnZW4udmFsdWUgPT09IFwiZmVtaW5pbm9cIikge1xyXG4gICAgICAgIGlmIChnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJjaXNcIikge1xyXG4gICAgICAgICAgICBnZW5WYWx1ZSA9IGdlbkluaVZhbHVlID8/IGdlbi52YWx1ZTtcclxuICAgICAgICAgICAgaGlkZUdlbkZpc0FsaW4oZ2VuRmlzQWxpbik7XHJcbiAgICAgICAgICAgIGhpZGVTdGdUcmFuc0hvcm0oZ2VuVHJhbnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGdlbkJpcnRoUmVsLnZhbHVlID09PSBcInRyYW5zXCIpIHtcclxuICAgICAgICAgICAgc2hvd1N0Z1RyYW5zSG9ybShnZW5UcmFucyk7XHJcbiAgICAgICAgICAgIGlmIChnZW5UcmFucy52YWx1ZSA9PT0gXCJhdmFuY2Fkb1wiKSB7XHJcbiAgICAgICAgICAgICAgICBnZW5WYWx1ZSA9IGdlbkluaVZhbHVlID8/IGdlbi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGhpZGVHZW5GaXNBbGluKGdlbkZpc0FsaW4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGdlblRyYW5zLnZhbHVlID09PSBcInVuZGVmaW5lZFwiIHx8XHJcbiAgICAgICAgICAgICAgICBnZW5UcmFucy52YWx1ZSA9PT0gXCJub1wiIHx8XHJcbiAgICAgICAgICAgICAgICBnZW5UcmFucy52YWx1ZSA9PT0gXCJpbmljaWFsXCIgfHxcclxuICAgICAgICAgICAgICAgIGdlblRyYW5zLnZhbHVlID09PSBcImludGVybWVkaWFyaW9cIikge1xyXG4gICAgICAgICAgICAgICAgc2hvd0dlbkZpc0FsaW4oZ2VuRmlzQWxpbik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250RmVtaW5pbGl6YWRvID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignb3B0aW9uW3ZhbHVlPVwiZmVtaW5pbGl6YWRvXCJdJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250TWFzY3VsaW5pemFkbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ29wdGlvblt2YWx1ZT1cIm1hc2N1bGluaXphZG9cIl0nKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250RmVtaW5pbGl6YWRvIGluc3RhbmNlb2YgSFRNTE9wdGlvbkVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICBjb250TWFzY3VsaW5pemFkbyBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdlblRyYW5zLnZhbHVlID09PSBcImludGVybWVkaWFyaW9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuLnZhbHVlID09PSBcIm1hc2N1bGlub1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0ZlbVNlbGVjdGVkID0gY29udEZlbWluaWxpemFkbz8uc2VsZWN0ZWQgPz8gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGZW1TZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRGZW1pbmlsaXphZG8ucmVtb3ZlQXR0cmlidXRlKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250TWFzY3VsaW5pemFkby5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuLnZhbHVlID09PSBcImZlbWluaW5vXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTWFzY1NlbGVjdGVkID0gY29udE1hc2N1bGluaXphZG8/LnNlbGVjdGVkID8/IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWFzY1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udE1hc2N1bGluaXphZG8ucmVtb3ZlQXR0cmlidXRlKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250RmVtaW5pbGl6YWRvLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0ZlbVNlbGVjdGVkID0gY29udEZlbWluaWxpemFkbz8uc2VsZWN0ZWQgPz8gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTWFzY1NlbGVjdGVkID0gY29udE1hc2N1bGluaXphZG8/LnNlbGVjdGVkID8/IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXNjU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRNYXNjdWxpbml6YWRvLnJlbW92ZUF0dHJpYnV0ZShcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZlbVNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250RmVtaW5pbGl6YWRvLnJlbW92ZUF0dHJpYnV0ZShcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibWFzY3VsaW5pemFkb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuVmFsdWUgPSBcIm1hc2N1bGlub1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwiZmVtaW5pbGl6YWRvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZW5WYWx1ZSA9IFwiZmVtaW5pbm9cIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm5ldXRyb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuVmFsdWUgPSBcIm5ldXRyb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJvdXRyb3NcIiB8fFxyXG4gICAgICAgICAgICBnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBzaG93R2VuRmlzQWxpbihnZW5GaXNBbGluKTtcclxuICAgICAgICAgICAgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibWFzY3VsaW5pemFkb1wiKSB7XHJcbiAgICAgICAgICAgICAgICBnZW5WYWx1ZSA9IFwibWFzY3VsaW5vXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJmZW1pbmlsaXphZG9cIikge1xyXG4gICAgICAgICAgICAgICAgZ2VuVmFsdWUgPSBcImZlbWluaW5vXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJuZXV0cm9cIikge1xyXG4gICAgICAgICAgICAgICAgZ2VuVmFsdWUgPSBcIm5ldXRyb1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZ2VuLnZhbHVlID09PSBcIm5hb0JpbmFyaW9cIiB8fFxyXG4gICAgICAgIGdlbi52YWx1ZSA9PT0gXCJvdXRyb3NcIiB8fFxyXG4gICAgICAgIGdlbi52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGlmIChnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJ0cmFuc1wiKSB7XHJcbiAgICAgICAgICAgIHNob3dTdGdUcmFuc0hvcm0oZ2VuVHJhbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaGlkZVN0Z1RyYW5zSG9ybShnZW5UcmFucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNob3dHZW5GaXNBbGluKGdlbkZpc0FsaW4pO1xyXG4gICAgICAgIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm1hc2N1bGluaXphZG9cIikge1xyXG4gICAgICAgICAgICBnZW5WYWx1ZSA9IFwibWFzY3VsaW5vXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJmZW1pbmlsaXphZG9cIikge1xyXG4gICAgICAgICAgICBnZW5WYWx1ZSA9IFwiZmVtaW5pbm9cIjtcclxuICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm5ldXRyb1wiKSB7XHJcbiAgICAgICAgICAgIGdlblZhbHVlID0gXCJuZXV0cm9cIjtcclxuICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoXCJvYnRlbmRvIGdlbi52YWx1ZVwiLCBnZW4/LnZhbHVlID8/IFwiVU5ERUZJTkVEIFZBTFVFXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnZW5WYWx1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0dlbkZpc0FsaW4oZ2VuRmlzQWxpbikge1xyXG4gICAgaWYgKGdlbkZpc0FsaW4pIHtcclxuICAgICAgICBnZW5GaXNBbGluLmNsb3Nlc3QoXCIuc3BhbkZzQW5hbUdcIik/LnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbmEgYWJlcnR1cmEgZGUgZ2VuRmlzQWxpblwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaGlkZUdlbkZpc0FsaW4oZ2VuRmlzQWxpbikge1xyXG4gICAgaWYgKGdlbkZpc0FsaW4pIHtcclxuICAgICAgICBnZW5GaXNBbGluLmNsb3Nlc3QoXCIuc3BhbkZzQW5hbUdcIik/LnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcIlwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvIG5vIGZlY2hhbWVudG8gZGUgZ2VuRmlzQWxpblwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd1N0Z1RyYW5zSG9ybShnZW5UcmFucykge1xyXG4gICAgaWYgKGdlblRyYW5zKSB7XHJcbiAgICAgICAgZ2VuVHJhbnMuY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8ucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiRXJybyBuYSBhYmVydHVyYSBkZSBnZW5UcmFuc1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaGlkZVN0Z1RyYW5zSG9ybShnZW5UcmFucykge1xyXG4gICAgaWYgKGdlblRyYW5zKSB7XHJcbiAgICAgICAgZ2VuVHJhbnMuY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8uc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwiXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gZmVjaGFtZW50byBkZSBnZW5UcmFuc1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVySWRzQnlHZW5kZXIoYXJyYXlJZHMsIGJvZHlUeXBlKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnJheUlkcykpIHtcclxuICAgICAgICBpZiAoYXJyYXlJZHMuZXZlcnkoKHByb3ApID0+IHR5cGVvZiBwcm9wID09PSBcInN0cmluZ1wiKSAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgYm9keVR5cGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgZ2VuZGVyZWRJZHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHNsaWNlZEVycm9yID0gXCJcIjtcclxuICAgICAgICAgICAgc3dpdGNoIChib2R5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1hc2N1bGlub1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlNID0gMDsgaU0gPCBhcnJheUlkcy5sZW5ndGg7IGlNKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5SWRzW2lNXSA9PT0gXCJwZWl0XCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lNXSA9PT0gXCJhYmRcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJZHNbaU1dID09PSBcImNveGFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZGVyZWRJZHMucHVzaChhcnJheUlkc1tpTV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImZlbWluaW5vXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaUYgPSAwOyBpRiA8IGFycmF5SWRzLmxlbmd0aDsgaUYrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlJZHNbaUZdID09PSBcInRyaWNwXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lGXSA9PT0gXCJzdXByYWlsXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lGXSA9PT0gXCJjb3hhXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmRlcmVkSWRzLnB1c2goYXJyYXlJZHNbaUZdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJuZXV0cm9cIjpcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpTiA9IDA7IGlOIDwgYXJyYXlJZHMubGVuZ3RoOyBpTisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJheUlkc1tpTl0gPT09IFwicGVpdFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUlkc1tpTl0gPT09IFwiYWJkXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lOXSA9PT0gXCJ0cmljcFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUlkc1tpTl0gPT09IFwic3VwcmFpbFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUlkc1tpTl0gPT09IFwiY294YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZGVyZWRJZHMucHVzaChhcnJheUlkc1tpTl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpY2VkRXJyb3IgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5zdHJpbmdFcnJvcihgb2J0ZW5kbyBib2R5VHlwZSB2w6FsaWRvYCwgYm9keVR5cGUgPz8gbnVsbCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBnZW5kZXJlZElkcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihgdmFsaWRhbmRvIGVsZW1lbnRvcyBwYXJhIGRlZmluacOnw6NvIGRlIGfDqm5lcm8gY29tbyBzdHJpbmdzYCwgYm9keVR5cGUgPz8gbnVsbCwgXCJzdHJpbmdcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gYXJyYXkgZW0gZmlsdGVySWRzQnlHZW5kZXIoKWApO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBlcnNvbkluc3RhbmNlKHBlcnNvbikge1xyXG4gICAgaWYgKHR5cGVvZiBwZXJzb24uZ2VuID09PSBcInN0cmluZ1wiICYmIHBlcnNvbi5nZW4gIT09IFwiXCIpIHtcclxuICAgICAgICBpZiAocGVyc29uLmdlbiA9PT0gXCJtYXNjdWxpbm9cIikge1xyXG4gICAgICAgICAgICBwZXJzb24gPSBuZXcgTWFuKHBlcnNvbi5nZW4sIHBlcnNvbi5hZ2UsIHBlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHQsIHBlcnNvbi5zdW1EQ3V0LCBwZXJzb24uYXR2THZsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocGVyc29uLmdlbiA9PT0gXCJmZW1pbmlub1wiKSB7XHJcbiAgICAgICAgICAgIHBlcnNvbiA9IG5ldyBXb21hbihwZXJzb24uZ2VuLCBwZXJzb24uYWdlLCBwZXJzb24ud2VpZ2h0LCBwZXJzb24uaGVpZ2h0LCBwZXJzb24uc3VtREN1dCwgcGVyc29uLmF0dkx2bCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHBlcnNvbi5nZW4gPT09IFwibmV1dHJvXCIpIHtcclxuICAgICAgICAgICAgcGVyc29uID0gbmV3IE5ldXRybyhwZXJzb24uZ2VuLCBwZXJzb24uYWdlLCBwZXJzb24ud2VpZ2h0LCBwZXJzb24uaGVpZ2h0LCBwZXJzb24uc3VtREN1dCwgcGVyc29uLmF0dkx2bCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5zdHJpbmdFcnJvcihcInBlcnNvbi5nZW5cIiwgcGVyc29uPy5nZW4gPz8gbnVsbCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwicGVyc29uLmdlblwiLCBwZXJzb24/LmdlbiA/PyBudWxsLCBcInN0cmluZ1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGVyc29uO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy9uZXNzZSBmaWxlIG9jb3JyZW0gcHJpbmNpcGFsbWVudGUgYXMgYWRpw6fDtWVzIGRlIGxpc3RlbmVycywgc2luY3Jvbml6YcOnw6NvIGRhcyBjaGFtYWRhcyBkZSBmdW7Dp8O1ZXMgcGFyYSBtYW5pcHVsYcOnw6NvIGRlIGluZm9ybWHDp8Ojby9sYXlvdXQgZSB2YWxpZGHDp8OjbyBkb3MgZWxlbWVudG9zIG5vIERPTVxyXG5pbXBvcnQgKiBhcyBBR0hhbmRsZXJzIGZyb20gXCIuL2FHSGFuZGxlcnNcIjtcclxuaW1wb3J0ICogYXMgQUdNb2RlbCBmcm9tIFwiLi9hR01vZGVsXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbE1vZGVsIGZyb20gXCJAZ2xTcmMvZ01vZGVsXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbEhhbmRsZXIgZnJvbSBcIkBnbFNyYy9nSGFuZGxlcnNcIjtcclxuaW1wb3J0ICogYXMgRXJyb3JIYW5kbGVyIGZyb20gXCJAZ2xTcmMvZXJyb3JIYW5kbGVyXCI7XHJcbi8vaW5pY2lhbGl6YcOnw6NvIGRlIGNvbnN0YW50ZXMgcGVyY29ycmVuZG8gbyBET01cclxuY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xyXG5jb25zdCB0ZXh0SW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuY29uc3QgdGV4dGFyZWFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRleHRhcmVhXCIpO1xyXG5jb25zdCB0ZXh0Q29udHMgPSBbLi4udGV4dGFyZWFzLCAuLi50ZXh0SW5wdXRzXTtcclxuY29uc3QgbnVtSW5wcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nKTtcclxuY29uc3QgcmFkaW9CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XHJcbmNvbnN0IHNlbGVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic2VsZWN0XCIpO1xyXG4vLyBjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XHJcbmNvbnN0IGdlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VuSWRcIik7XHJcbmNvbnN0IGdlbkJpcnRoUmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5CaXJ0aFJlbElkXCIpO1xyXG5jb25zdCBnZW5UcmFucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VuVHJhbnNJZFwiKTtcclxuY29uc3QgZ2VuRmlzQWxpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VuRmlzQWxpbklkXCIpO1xyXG5jb25zdCBhbnRGYW1DaGVja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbaWRePSdhbnRGYW0nXVwiKTtcclxuY29uc3QgYW50TWVkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnRNZWRDb250YWluZXJcIik7XHJcbmNvbnN0IHRlbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdW2lkXj1cInRlbFwiXScpO1xyXG5jb25zdCBlbWFpbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2lkXj1cImVtYWlsXCJdJyk7XHJcbmNvbnN0IGNlcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlcElkXCIpO1xyXG5jb25zdCBjZXBFbGVtZW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhdXRvQ29tcENlcEJ0blwiKTtcclxuY29uc3QgcXhQcmluYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXhQcmluY1wiKTtcclxuY29uc3QgZWRpdGFibGVDaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2l0ZVtjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJdJyk7XHJcbmNvbnN0IGFzdERpZ3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2lkJD1cIkFzdERpZ3RCdG4nKTtcclxuY29uc3QgZGVhY3RBdXRvY29ycmVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25baWRePVwiZGVhY3RBdXRvY29ycmVjdEJ0blwiXScpO1xyXG5jb25zdCBkYXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbltpZCQ9XCJEYXRCdG5cIl0nKTtcclxuY29uc3QgcmVzZXRGb3JtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldEZvcm1CdG5cIik7XHJcbmNvbnN0IHN1YkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0Rm9ybUJ1dElkXCIpO1xyXG5jb25zdCBhbGxJbnB1dHMgPSBBcnJheS5mcm9tKFtcclxuICAgIC4uLmlucHV0cyxcclxuICAgIC4uLnRleHRhcmVhcyxcclxuICAgIC4uLnNlbGVjdHMsXHJcbiAgICBlZGl0YWJsZUNpdGUsXHJcbl0pLmZsYXQoMSk7XHJcbmNvbnN0IEpTT05CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkpTT05cIik7XHJcbmxldCBKU09OTGluaztcclxuLy8gbGV0IHNob3VsZFJlZ2VuZXJhdGVCdG4gPSBmYWxzZTtcclxuLy92YWxpZGHDp8OjbyBkZSBjb25zdGFudGVzIG9idGlkYXMgZSBhcGxpY2HDp8OjbyBkZSBsaXN0ZW5lcnMvY2FsbGJhY2tzXHJcbmlmIChKU09OQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQgJiYgYWxsSW5wdXRzLmxlbmd0aCA+IDApIHtcclxuICAgIGxldCBmb3JtRGVzY3JpcHRpb24gPSBbXTtcclxuICAgIEpTT05CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBmb3JtRGVzY3JpcHRpb24gPSBHbG9iYWxIYW5kbGVyLmdldEpTT05EZXNjKGFsbElucHV0cyk7XHJcbiAgICAgICAgY29uc3QgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkID0gKGZvcm1EZXNjcmlwdGlvbiAmJlxyXG4gICAgICAgICAgICBmb3JtRGVzY3JpcHRpb25bMV0pID8/IFtcIlwiXTtcclxuICAgICAgICBpZiAoZm9ybURlc2NyaXB0aW9uICYmXHJcbiAgICAgICAgICAgIGZvcm1EZXNjcmlwdGlvbi5sZW5ndGggPT09IDQgJiZcclxuICAgICAgICAgICAgIWZvcm1EZXNjcmlwdGlvbi5zb21lKChmb3JtRGVzY0VsZW1lbnQpID0+IGZvcm1EZXNjRWxlbWVudCA9PT0gbnVsbCkpIHtcclxuICAgICAgICAgICAgSlNPTkxpbmsgPSBHbG9iYWxIYW5kbGVyLmNyZWF0ZUpTT05BbmNob3IoSlNPTkJ0biwgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkKTtcclxuICAgICAgICAgICAgaWYgKEpTT05MaW5rKSB7XHJcbiAgICAgICAgICAgICAgICBKU09OTGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbEhhbmRsZXIucmVnZW5lcmF0ZUpTT05CdG4oSlNPTkxpbmssIEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoSlNPTkxpbmsgPz8gbnVsbCwgXCJKU09OTGlua1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyBvYnRlbmRvIGZvcm1EZXNjcmlwdGlvbmApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChKU09OQnRuID8/IG51bGwsIFwiSlNPTkJ0blwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChhbGxJbnB1dHMgPz8gbnVsbCwgXCJhbGxJbnB1dHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmICh0ZXh0Q29udHMubGVuZ3RoID4gMCkge1xyXG4gICAgdGV4dENvbnRzLmZvckVhY2goZnVuY3Rpb24gKHRleHRDb250KSB7XHJcbiAgICAgICAgY29uc3QgaXNUZWxJbnB1dCA9IHRleHRDb250LmNsYXNzTGlzdC5jb250YWlucyhcImlucFRlbFwiKTtcclxuICAgICAgICBjb25zdCBpc0VtYWlsSW5wdXQgPSB0ZXh0Q29udC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBFbWFpbFwiKTtcclxuICAgICAgICBpZiAoIWlzVGVsSW5wdXQgJiYgIWlzRW1haWxJbnB1dCAmJiAhKHRleHRDb250LmlkID09PSBcImNlcElkXCIpKSB7XHJcbiAgICAgICAgICAgIHRleHRDb250LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dC50YXJnZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAoaW5wdXQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbE1vZGVsLmF1dG9DYXBpdGFsaXplSW5wdXRzKGlucHV0LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoaW5wdXQudGFyZ2V0ID8/IG51bGwsIFwidGFyZ2V0IHRleHRDb250XCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZCh0ZXh0Q29udHMgPz8gbnVsbCwgXCJ0ZXh0Q29udHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChudW1JbnBzLmxlbmd0aCA+IDApIHtcclxuICAgIG51bUlucHMuZm9yRWFjaChmdW5jdGlvbiAobnVtSW5wKSB7XHJcbiAgICAgICAgbnVtSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0LnRhcmdldCAmJiBpbnB1dC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWxNb2RlbC5udW1iZXJMaW1pdChpbnB1dC50YXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoaW5wdXQudGFyZ2V0ID8/IG51bGwsIFwidGFyZ2V0IG51bUlucFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQobnVtSW5wcyA/PyBudWxsLCBcIm51bUlucHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmZ1bmN0aW9uIGNoZWNrQWxsR2VuQ29udHMoZ2VuLCBnZW5CaXJ0aFJlbCwgZ2VuVHJhbnMsIGdlbkZpc0FsaW4pIHtcclxuICAgIGxldCBpc0dlblZhbGlkID0gZmFsc2U7XHJcbiAgICBsZXQgaXNHZW5CaXJ0aFJlbFZhbGlkID0gZmFsc2U7XHJcbiAgICBsZXQgaXNHZW5UcmFuc0NvbnRWYWxpZCA9IGZhbHNlO1xyXG4gICAgbGV0IGlzR2VuRmlzQWxpblZhbGlkID0gZmFsc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChnZW4gJiYgZ2VuIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaXNHZW5WYWxpZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGdlbjogZWxlbWVudG8gJHtnZW59LCBpbnN0w6JuY2lhICR7Z2VuIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yR2VuKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvckdlbi5tZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIC8vYWxndW0gZWZlaXRvIHZpc3VhbFxyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoZ2VuQmlydGhSZWwgJiYgZ2VuQmlydGhSZWwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBpc0dlbkJpcnRoUmVsVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBnZW46IGVsZW1lbnRvICR7Z2VuQmlydGhSZWx9LCBpbnN0w6JuY2lhICR7Z2VuQmlydGhSZWwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3JHZW5CaXJ0aFJlbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JHZW5CaXJ0aFJlbC5tZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIC8vYWxndW0gZWZlaXRvIHZpc3VhbFxyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoZ2VuVHJhbnMgJiYgZ2VuVHJhbnMgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBpc0dlblRyYW5zQ29udFZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gZ2VuVHJhbnM6IGVsZW1lbnRvICR7Z2VuVHJhbnN9LCBpbnN0w6JuY2lhICR7Z2VuVHJhbnMgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3JHZW5UcmFucykge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JHZW5UcmFucy5tZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIC8vYWxndW0gZWZlaXRvIHZpc3VhbFxyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoZ2VuRmlzQWxpbiAmJiBnZW5GaXNBbGluIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaXNHZW5GaXNBbGluVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBnZW5GaXNBbGluOiBlbGVtZW50byAke2dlbkZpc0FsaW59LCBpbnN0w6JuY2lhICR7Z2VuRmlzQWxpbiBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50fWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvckdlbkZpc0FsaW4pIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yR2VuRmlzQWxpbi5tZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIC8vYWxndW0gZWZlaXRvIHZpc3VhbFxyXG4gICAgfVxyXG4gICAgaWYgKGlzR2VuVmFsaWQgJiZcclxuICAgICAgICBpc0dlbkJpcnRoUmVsVmFsaWQgJiZcclxuICAgICAgICBpc0dlblRyYW5zQ29udFZhbGlkICYmXHJcbiAgICAgICAgaXNHZW5GaXNBbGluVmFsaWQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIHZlcmlmaWNhbmRvIGJvb2xlYW5vcyBkZSBjb250YWluZXJzIGRlIGfDqm5lcm9cIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IGFyZUFsbEdlbkNvbnRDaGVja2VkID0gY2hlY2tBbGxHZW5Db250cyhnZW4sIGdlbkJpcnRoUmVsLCBnZW5UcmFucywgZ2VuRmlzQWxpbik7XHJcbmxldCBnZW5WYWx1ZSA9IGdlbj8udmFsdWUgPz8gbnVsbDtcclxuaWYgKGFyZUFsbEdlbkNvbnRDaGVja2VkICYmIHR5cGVvZiBnZW5WYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZ2VuLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgIGdlblZhbHVlID0gR2xvYmFsTW9kZWwuZmx1eEdlbihnZW4sIGdlbi52YWx1ZSA/PyBudWxsLCBnZW5CaXJ0aFJlbCwgZ2VuVHJhbnMsIGdlbkZpc0FsaW4pO1xyXG4gICAgfSk7XHJcbiAgICBnZW5CaXJ0aFJlbC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICBnZW5WYWx1ZSA9IEdsb2JhbE1vZGVsLmZsdXhHZW4oZ2VuLCBnZW4udmFsdWUgPz8gbnVsbCwgZ2VuQmlydGhSZWwsIGdlblRyYW5zLCBnZW5GaXNBbGluKTtcclxuICAgIH0pO1xyXG4gICAgZ2VuVHJhbnMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgZ2VuVmFsdWUgPSBHbG9iYWxNb2RlbC5mbHV4R2VuKGdlbiwgZ2VuLnZhbHVlID8/IG51bGwsIGdlbkJpcnRoUmVsLCBnZW5UcmFucywgZ2VuRmlzQWxpbik7XHJcbiAgICB9KTtcclxuICAgIGdlbkZpc0FsaW4uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgZ2VuVmFsdWUgPSBHbG9iYWxNb2RlbC5mbHV4R2VuKGdlbiwgZ2VuLnZhbHVlID8/IG51bGwsIGdlbkJpcnRoUmVsLCBnZW5UcmFucywgZ2VuRmlzQWxpbik7XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIGNvbnNvbGUud2FybihgYXJlQWxsR2VuQ29udENoZWNrZWQgJHthcmVBbGxHZW5Db250Q2hlY2tlZCA/PyBmYWxzZX1gKTtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoZ2VuID8/IG51bGwsIFwiZ2VuRWxlbWVudFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKHRlbElucHV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICB0ZWxJbnB1dHMuZm9yRWFjaCgodGVsSW5wdXQpID0+IHtcclxuICAgICAgICB0ZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGlucHV0VGVsKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dFRlbC50YXJnZXQgJiYgaW5wdXRUZWwudGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgQUdNb2RlbC5mb3JtYXRUZWwoaW5wdXRUZWwudGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKGlucHV0VGVsPy50YXJnZXQgPz8gbnVsbCwgXCJ0YXJnZXQgaW5wdXRUZWxcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKHRlbElucHV0cyA/PyBudWxsLCBcInRlbElucHV0c1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKGVtYWlsSW5wdXRzLmxlbmd0aCA+IDApIHtcclxuICAgIGVtYWlsSW5wdXRzLmZvckVhY2goKGVtYWlsSW5wdXQpID0+IHtcclxuICAgICAgICBpZiAoZW1haWxJbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gQUdNb2RlbC5hZGRFbWFpbEV4dGVuc2lvbihlbWFpbElucHV0KSk7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEFHTW9kZWwuYWRkRW1haWxFeHRlbnNpb24oZW1haWxJbnB1dCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChlbWFpbElucHV0ID8/IG51bGwsIGAke2VtYWlsSW5wdXQ/LmlkID8/IFwiVU5ERUZJTkVEIElEIElOUFVUXCJ9YCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoZW1haWxJbnB1dHMgPz8gbnVsbCwgXCJlbWFpbElucHV0c1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKHJhZGlvQnV0dG9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICByYWRpb0J1dHRvbnMuZm9yRWFjaCgocmFkaW8pID0+IHtcclxuICAgICAgICBpZiAocmFkaW8gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIHJhZGlvLnR5cGUgPT09IFwicmFkaW9cIikge1xyXG4gICAgICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoa2V5ZG93bikgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsSGFuZGxlci5vcFJhZGlvSGFuZGxlcihrZXlkb3duKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4gR2xvYmFsSGFuZGxlci5jcGJJbnBIYW5kbGVyKTtcclxuICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKCkgPT4gR2xvYmFsSGFuZGxlci5jcGJJbnBIYW5kbGVyKTtcclxuICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsICgpID0+IEdsb2JhbEhhbmRsZXIuZG91YmxlQ2xpY2tIYW5kbGVyKHJhZGlvKSk7XHJcbiAgICAgICAgICAgIC8vIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIEdsb2JhbEhhbmRsZXIudG91Y2hTdGFydEhhbmRsZXIpO1xyXG4gICAgICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIEdsb2JhbEhhbmRsZXIuZGVhY3RUZXh0SW5wdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChyYWRpbyA/PyBudWxsLCBgJHtyYWRpbz8uaWQgPz8gXCJVTkRFRklORUQgSUQgUkFESU9cIn1gLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChyYWRpb0J1dHRvbnMgPz8gbnVsbCwgXCJyYWRpb0J1dHRvbnNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChhbnRGYW1DaGVja3MubGVuZ3RoID4gMCkge1xyXG4gICAgYW50RmFtQ2hlY2tzLmZvckVhY2goKGFudEZhbUNoZWNrKSA9PiB7XHJcbiAgICAgICAgaWYgKGFudEZhbUNoZWNrIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBhbnRGYW1DaGVjay5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IEdsb2JhbEhhbmRsZXIuY3BiSW5wSGFuZGxlcik7XHJcbiAgICAgICAgICAgIGFudEZhbUNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiBHbG9iYWxIYW5kbGVyLmRvdWJsZUNsaWNrSGFuZGxlcihhbnRGYW1DaGVjaykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChhbnRGYW1DaGVjayA/PyBudWxsLCBgJHthbnRGYW1DaGVjay5pZCA/PyBcIlVOREVGSU5FRCBJRCBJTlBVVFwifWAsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKGFudEZhbUNoZWNrcyA/PyBudWxsLCBcImFudEZhbUNoZWNrc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKGFudE1lZENvbnRhaW5lcikge1xyXG4gICAgYW50TWVkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBBR0hhbmRsZXJzLmFkZEFudE1lZEhhbmRsZXIpO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChudWxsLCBcImFudE1lZENvbnRhaW5lclwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKGRhdGVCdG5zLmxlbmd0aCA+IDApIHtcclxuICAgIGRhdGVCdG5zLmZvckVhY2goZnVuY3Rpb24gKGRhdGVCdG4pIHtcclxuICAgICAgICBpZiAoZGF0ZUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGRhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChhY3RpdmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWxIYW5kbGVyLnVzZUN1cnJlbnREYXRlKGFjdGl2YXRpb24sIGRhdGVCdG4pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChkYXRlQnRuID8/IG51bGwsIGAke2RhdGVCdG4/LmlkID8/IFwiVU5ERUZJTkVEIElEIERBVEUgQlVUVE9OXCJ9YCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoZGF0ZUJ0bnMgPz8gbnVsbCwgXCJkYXRlQnRuc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKGNlcEVsZW1lbnQgJiZcclxuICAgIGNlcEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICBjZXBFbGVtZW50QnRuICYmXHJcbiAgICBjZXBFbGVtZW50QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgIGNlcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEFHTW9kZWwuZm9ybWF0Q0VQKGNlcEVsZW1lbnQpKTtcclxuICAgIGNlcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICBjb25zdCBpc0NlcEJ0bk9mZiA9IEFHSGFuZGxlcnMuZW5hYmxlQ0VQQnRuKGNlcEVsZW1lbnQudmFsdWUubGVuZ3RoLCBjZXBFbGVtZW50QnRuKTtcclxuICAgICAgICBpZiAoY2VwRWxlbWVudEJ0biAmJlxyXG4gICAgICAgICAgICBjZXBFbGVtZW50QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQgJiZcclxuICAgICAgICAgICAgIWlzQ2VwQnRuT2ZmKSB7XHJcbiAgICAgICAgICAgIGNlcEVsZW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IEFHSGFuZGxlcnMuc2VhcmNoQ0VQKGNlcEVsZW1lbnQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoIShjZXBFbGVtZW50QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBpc0NlcEJ0bk9mZiArICR7aXNDZXBCdG5PZmYgPz8gZmFsc2V9YCk7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoY2VwRWxlbWVudEJ0biA/PyBudWxsLCBcImNlcEVsZW1lbnRCdG5cIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChzbGljZWRFcnJvciA/PyBcIk5VTExcIiwgXCJFbGVtZW50cyBwYXJhIENFUFwiLCBjZXBFbGVtZW50ID8/IG51bGwsIGNlcEVsZW1lbnRCdG4gPz8gbnVsbCk7XHJcbn1cclxuaWYgKHF4UHJpbmMgJiYgcXhQcmluYyBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcclxuICAgIHF4UHJpbmMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IEFHTW9kZWwuYWRkRGJsUXVvdGVzKHF4UHJpbmMpKTtcclxuICAgIHF4UHJpbmMuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEFHTW9kZWwuYWRkRGJsUXVvdGVzKHF4UHJpbmMpKTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQocXhQcmluYyA/PyBudWxsLCBcInF4UHJpbmNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChlZGl0YWJsZUNpdGUpIHtcclxuICAgIGxldCBmaXJzdENsaWNrID0gdHJ1ZTtcclxuICAgIGNvbnN0IGNpdGVDbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoY2xpY2spIHtcclxuICAgICAgICBpZiAoZmlyc3RDbGljayAmJiBjbGljay50YXJnZXQgJiYgY2xpY2sudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgR2xvYmFsTW9kZWwucmVtb3ZlRmlyc3RDbGljayhjbGljay50YXJnZXQpO1xyXG4gICAgICAgICAgICBmaXJzdENsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2l0ZUNsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoY2xpY2s/LnRhcmdldCA/PyBudWxsLCBcImNsaWNrIHRhcmdldCBlZGl0YWJsZUNpdGVcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBlZGl0YWJsZUNpdGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChrZXlwcmVzcykge1xyXG4gICAgICAgIGlmIChrZXlwcmVzcy50YXJnZXQgJiYga2V5cHJlc3MudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgR2xvYmFsTW9kZWwuYXV0b0NhcGl0YWxpemVDaXRlKGtleXByZXNzLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoa2V5cHJlc3M/LnRhcmdldCA/PyBudWxsLCBcImtleXByZXNzIHRhcmdldCBlZGl0YWJsZUNpdGVcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgZWRpdGFibGVDaXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaXRlQ2xpY2tIYW5kbGVyKTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQobnVsbCwgXCJlZGl0YWJsZUNpdGVcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChkZWFjdEF1dG9jb3JyZWN0QnRucy5sZW5ndGggPiAwKSB7XHJcbiAgICBkZWFjdEF1dG9jb3JyZWN0QnRucy5mb3JFYWNoKGZ1bmN0aW9uIChkZWFjdEF1dG9jb3JyZWN0QnRuKSB7XHJcbiAgICAgICAgaWYgKGRlYWN0QXV0b2NvcnJlY3RCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBkZWFjdEF1dG9jb3JyZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoY2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBHbG9iYWxNb2RlbC5zd2l0Y2hBdXRvY29ycmVjdChjbGljaywgZGVhY3RBdXRvY29ycmVjdEJ0bik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChkZWFjdEF1dG9jb3JyZWN0QnRucyA/PyBudWxsLCBgJHtkZWFjdEF1dG9jb3JyZWN0QnRuPy5pZCA/PyBcIlVOREVGSU5FRCBJRCBCVVRUT05cIn1gLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChkZWFjdEF1dG9jb3JyZWN0QnRucyA/PyBudWxsLCBcImRlYWN0QXV0b0NvcnJlY3RCdG5zXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG5pZiAoYXN0RGlndEJ0bnMubGVuZ3RoID4gMCkge1xyXG4gICAgYXN0RGlndEJ0bnMuZm9yRWFjaChmdW5jdGlvbiAoYXN0RGlndEJ0bikge1xyXG4gICAgICAgIGlmIChhc3REaWd0QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgYXN0RGlndEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR2xvYmFsSGFuZGxlci5jaGFuZ2VUb0FzdERpZ2l0KGNsaWNrLCBhc3REaWd0QnRuKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoYXN0RGlndEJ0biA/PyBudWxsLCBhc3REaWd0QnRuPy5pZCA/PyBcIlVOREVGSU5FRCBJRCBCVVRUT05cIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoYXN0RGlndEJ0bnMgPz8gbnVsbCwgXCJhc3REaWd0QnRuc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKHN1YkJ1dHRvbiBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICBzdWJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIEdsb2JhbEhhbmRsZXIuc3ViRm9ybSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKHN1YkJ1dHRvbiA/PyBudWxsLCBcInN1YkJ1dHRvblwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKHJlc2V0Rm9ybUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICByZXNldEZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChjbGljaykgPT4gR2xvYmFsSGFuZGxlci5yZXNldGFyRm9ybXVsYXJpbyhjbGljaywgYXN0RGlndEJ0bnMpKTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQocmVzZXRGb3JtQnRuID8/IG51bGwsIFwicmVzZXRGb3JtQnRuXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG4vLyBjb25zdCBoYW5kbGVNdXRhdGlvbiA9IChtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikgPT4ge1xyXG4vLyAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zTGlzdCkge1xyXG4vLyAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuLy8gICAgICAgLy8gVmVyaWZpY2Egc2UgbyBKU09OQnRuIGZvaSByZW1vdmlkbyBlIG8gSlNPTkxpbmsgZm9pIGFkaWNpb25hZG9cclxuLy8gICAgICAgY29uc3QgSlNPTkJ0blJlbW92ZWQgPSBtdXRhdGlvbi5yZW1vdmVkTm9kZXNbMF0gPT09IEpTT05CdG47XHJcbi8vICAgICAgIGNvbnN0IEpTT05MaW5rQWRkZWQgPSBBcnJheS5mcm9tKG11dGF0aW9uLmFkZGVkTm9kZXMpLnNvbWUoXHJcbi8vICAgICAgICAgKG5vZGUpID0+IG5vZGUgPT09IEpTT05MaW5rXHJcbi8vICAgICAgICk7XHJcbi8vICAgICAgIGlmIChKU09OQnRuUmVtb3ZlZCAmJiBKU09OTGlua0FkZGVkKSB7XHJcbi8vICAgICAgICAgLy8gTMOzZ2ljYSBhIHNlciBleGVjdXRhZGEgcXVhbmRvIGEgdHJvY2Egb2NvcnJlclxyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiSlNPTkJ0biBmb2kgcmVtb3ZpZG8sIGUgSlNPTkxpbmsgZm9pIGFkaWNpb25hZG8uXCIpO1xyXG4vLyAgICAgICAgIC8vIEFkaWNpb25lIGFxdWkgcXVhbHF1ZXIgbMOzZ2ljYSBvdSBldmVudG8gYWRpY2lvbmFsIHF1ZSB2b2PDqiBkZXNlamEgZXhlY3V0YXJcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy8gfTtcclxuLy8gLy8gRnVuw6fDo28gcXVlIHNlcsOhIGNoYW1hZGEgcXVhbmRvIGhvdXZlciB1bWEgbXV0YcOnw6NvIG5vIERPTVxyXG4vLyAvLyBDcmlhIHVtIG5vdm8gb2JzZXJ2YWRvciBkZSBtdXRhw6fDo28gY29tIGEgZnVuw6fDo28gZGUgY2FsbGJhY2tcclxuLy8gY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihoYW5kbGVNdXRhdGlvbik7XHJcbi8vIC8vIENvbmZpZ3VyYSBvIG9ic2VydmFkb3IgcGFyYSBvYnNlcnZhciBtdWRhbsOnYXMgbm8gbsOzIHBhaSAocG9yIGV4ZW1wbG8sIG8gYm9keSlcclxuLy8gb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9