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
/* harmony export */   displayCEPLoadBar: () => (/* binding */ displayCEPLoadBar),
/* harmony export */   enableCEPBtn: () => (/* binding */ enableCEPBtn),
/* harmony export */   loadCEP: () => (/* binding */ loadCEP),
/* harmony export */   searchCEPXML: () => (/* binding */ searchCEPXML),
/* harmony export */   uploadCEPLoadBar: () => (/* binding */ uploadCEPLoadBar)
/* harmony export */ });
/* harmony import */ var _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global-scripts/src/gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global-scripts/src/gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global-scripts/src/errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout




//TODO RECONSIDERAR TODAS AS FUNÇÕES COMO TRY/CATCH
//TODO PODE SER FEITO COM PROMISE+AWAIT, CONSIDERAR
//TODO MOCKAR VALUES PARA TARGINPS EM TESTS
function searchCEPXML(cepElement) {
    let initTime = Date.now();
    let reqAcc = 2;
    if (cepElement instanceof HTMLInputElement) {
        const progInts = displayCEPLoadBar(cepElement) ?? [0, 100, null];
        const progMax = progInts[0] || 0;
        const progValue = progInts[1] || 100;
        const progBar = progInts[2] || null;
        const cepHifenOutValue = cepElement?.value?.replaceAll("-", "") ?? "";
        const urlBAPI1 = `https://brasilapi.com.br/api/cep/v2/${cepHifenOutValue}`;
        const xmlReq1 = new XMLHttpRequest();
        if (urlBAPI1) {
            xmlReq1.open("GET", urlBAPI1);
            xmlReq1.send();
            xmlReq1.onload = () => {
                const xmlReturn1 = loadCEP(xmlReq1, reqAcc);
                if (xmlReturn1 === 200) {
                    console.log(`Primeira solicitação XML/HTTP feita com sucesso.`);
                    if (progBar && progMax)
                        uploadCEPLoadBar(cepElement, progBar, initTime, progMax, progValue);
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
                                if (progBar && progMax)
                                    uploadCEPLoadBar(cepElement, progBar, initTime, progMax, progValue);
                            }
                            else {
                                console.error(`Falha na segunda XML/HTTP Request. Procedimento cancelado. Insira Manualmente.`);
                                if (progBar && progMax)
                                    uploadCEPLoadBar(cepElement, progBar, initTime, progMax, progValue);
                            }
                        };
                    }
                    else
                        console.error(`Erro concantenando segunda URL com CEP.`);
                }
            };
        }
        else
            console.error(`Erro concatenando primeira URL com CEP.`);
    }
    else
        console.error(`Erro verificando input de CEP. Elemento: ${cepElement}; Instância ${Object.prototype.toString
            .call(cepElement)
            .slice(8, -1)}; Valor do elemento obtido: ${cepElement?.value ?? "NULL"}`);
}
function loadCEP(xmlReq = new XMLHttpRequest(), reqAcc = 1) {
    let status = 404;
    try {
        if (xmlReq instanceof XMLHttpRequest && typeof reqAcc === "number") {
            const parsedAddress = JSON.parse(xmlReq.response);
            if (xmlReq.status === 200 && parsedAddress) {
                const uf = document.getElementById("UFId");
                const city = document.getElementById("cityId");
                const neighborhood = document.getElementById("neighbourhoodId");
                const street = document.getElementById("streetId");
                if (uf instanceof HTMLInputElement)
                    uf.value = parsedAddress.state;
                if (city instanceof HTMLInputElement)
                    city.value = parsedAddress.city;
                if (neighborhood instanceof HTMLInputElement)
                    neighborhood.value = parsedAddress.neighborhood;
                if (street instanceof HTMLInputElement)
                    street.value = parsedAddress.street;
                status = 200;
            }
            else if (xmlReq.status === 404)
                throw new Error("404");
            else
                throw new Error(`Não reconhecido.`);
        }
        else
            throw new Error(`ERRO NA ENTRADA DE ARGUMENTOS.
      VALORES OBTIDOS: ${JSON.stringify(xmlReq) || null}, ${reqAcc}`);
    }
    catch (loadError) {
        console.warn(`Status de Erro para CEPV${reqAcc}: `, loadError.message);
    }
    return status;
}
function displayCEPLoadBar(cepElement) {
    const progressBar = document.createElement("progress");
    if (cepElement instanceof HTMLInputElement) {
        let progMaxInt = 100;
        let progValueInt = 0;
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
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(cepElement, "cepElement", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    return [100, 0, progressBar];
}
function uploadCEPLoadBar(cepElement, progressBar = new HTMLProgressElement(), initTime = 0, progMaxInt = 100, progValueInt = 0) {
    if (cepElement instanceof HTMLInputElement &&
        progressBar instanceof HTMLProgressElement &&
        typeof initTime === `number` &&
        typeof progMaxInt === `number` &&
        typeof progValueInt === `number`) {
        const elapsedTime = Date.now() - initTime;
        const elapsedNDec = elapsedTime.toString().length - 1;
        let addedZerosMult = "1";
        for (let iD = 0; iD < elapsedNDec; iD++)
            addedZerosMult += "0";
        const indNDec = 1 * parseInt(addedZerosMult);
        const roundedElapsed = Math.round(elapsedTime / indNDec) * indNDec;
        if (progValueInt !== progMaxInt) {
            const loadingEvent = setInterval(() => {
                progValueInt += 5;
                progressBar.value = progValueInt;
                if (progValueInt === progMaxInt)
                    clearInterval(loadingEvent);
            }, roundedElapsed / 20);
        }
        setTimeout(() => {
            cepElement.parentElement?.removeChild(progressBar);
        }, roundedElapsed);
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), "argumentos para uploadCEPLoadBar", cepElement, progressBar, initTime, progMaxInt, progValueInt);
}
function enableCEPBtn(cepBtn, cepLength = 0) {
    let isCepElemenBtnOff = true;
    if (cepBtn instanceof HTMLButtonElement && typeof cepLength === "number") {
        if (cepLength === 9) {
            cepBtn.removeAttribute("disabled");
            isCepElemenBtnOff = false;
        }
        else
            cepBtn.setAttribute("disabled", "");
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), "argumentos para enableCEPBtn", cepBtn, cepLength);
    return isCepElemenBtnOff;
}
function addAntMedHandler(click, blockCount = 1) {
    if (click?.target?.classList?.contains("countAntMed") &&
        typeof blockCount === "number") {
        if (click instanceof Event && click?.target instanceof HTMLButtonElement) {
            if (click.target.classList?.contains("addAntMed")) {
                blockCount++; // Incrementa o número de blocos
                // Cria um novo conjunto de elementos HTML
                const newBlock = document.createElement("div");
                newBlock.className = "antMedBlock";
                newBlock.id = `antMedBlock${blockCount}`;
                newBlock.innerHTML = `
        <span class="divAntMedSpan spanMain spanAntMedText" id="antMedSpanInp${blockCount}">
          <label for="antMedId${blockCount}" class="antMedLabel">${blockCount}&#41
            <input type="text" name="antMedName${blockCount}" id="antMedId${blockCount}" class="form-control autocorrect autocorrectFirst inpAntMed antMedText"/>
          </label>
        </span>
        <span class="divAntMedSpan spanMain spanAntMedDate" id="antMedSpanMainDate${blockCount}">
          <span class="divAntMedSubSpan spanSub spanSubAntMedDate" id="antMedSpanSubDate${blockCount}">
            <div class="antMedDiv">
              <label for="antMedDateIniId${blockCount}" class="antMedLabel"></label>
              <input type="date" name="antMedDateIniName${blockCount}" id="antMedDateIniId${blockCount}" class="form-control inpDate antMedDate inpAntMed" required /> até
              <input type="date" name="antMedDateEndName${blockCount}" id="antMedDateEndId${blockCount}" class="form-control inpDate antMedDate inpAntMed" required />
              <label for="antMedDateEndId${blockCount}" class="antMedLabel"></label>
              <button
              type="button"
              class="datBtn atualTratBtn btn btn-secondary"
              id="atualTrat${blockCount}DatBtn"
              >
              Usar data atual
              </button>
            </div>
            <div class="antMedBtnsDiv">
              <button type="button" name="addAntMedName${blockCount}" id="addAntMedId${blockCount}" class="addAntMed countAntMed btn btn-dark"
              value="addAntMed">+</button>
              <button type="button" name="removeAntMedName${blockCount}" id="removeAntMedId${blockCount}"
              class="removeAntMed countAntMed btn btn-dark" value="removeAntMed">-</button>
            </div>
          </span>
        </span>
      `;
                // Adiciona o novo bloco ao contêiner
                document.getElementById("antMedContainer")?.appendChild(newBlock);
                newBlock.querySelectorAll('button[id$="DatBtn"]').forEach(dateBtn => {
                    dateBtn.addEventListener("click", activation => _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_1__.useCurrentDate(activation, dateBtn));
                });
                newBlock.querySelectorAll('input[type="text"]').forEach(textEl => {
                    textEl.addEventListener("input", () => _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_0__.autoCapitalizeInputs(textEl, _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_0__.checkAutoCorrect(document.querySelector('button[id^="deactAutocorrectBtn"]') ||
                        document.querySelector('input[id^="deactAutocorrectBtn"]'))));
                });
            }
            else if (click.target.classList?.contains("removeAntMed")) {
                const divToRemove = click.target.closest(".antMedBlock");
                if (divToRemove &&
                    blockCount > 1 &&
                    divToRemove?.id !== "antMedBlock1") {
                    divToRemove.remove();
                    blockCount -= 1;
                }
                else {
                    console.warn(`Erro localizando divToRemove:
        Elemento: ${JSON.stringify(divToRemove)};
        blockCount: ${blockCount};
        divToRemove id: ${divToRemove?.id}`);
                    if (blockCount > 1)
                        blockCount = 1;
                }
            }
            else
                console.error(`Error validating .classList of click.target in addAntMedHandler.
        Catched value: ${click?.target?.classList ?? "UNDEFINED CLASS LIST"}.`);
        }
        else
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(click?.target, `${click?.target?.id ?? "UNDEFINED BUTTON ID"}`, (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    }
    else {
        if (!(click?.target instanceof HTMLButtonElement))
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), "arguments for addAntMedHandler()", `${JSON.stringify(click)}`, blockCount);
    }
    return blockCount;
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
/* harmony import */ var _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global-scripts/src/errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização


function formatTel(telInp) {
    let numOnly = "";
    if (telInp instanceof HTMLInputElement ||
        telInp instanceof HTMLTextAreaElement) {
        numOnly = (telInp.value?.replace(/[^0-9]/g, "") || numOnly).replace(/\d+/g, matchTel => {
            if (matchTel.length === 9) {
                return matchTel[0] === "9"
                    ? `${matchTel.slice(0, 5)}-${matchTel.slice(5, 9)}`
                    : `${matchTel.slice(0, 4)}-${matchTel.slice(4, 8)}`;
            }
            else if (matchTel?.length > 9)
                return `${matchTel.slice(0, 8)}`;
            return matchTel;
        });
        telInp.value = numOnly;
        return telInp.value;
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__.inputNotFound(telInp, "telInp", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__.extLine)(new Error()));
    return numOnly;
}
function addEmailExtension(emailInp) {
    if (emailInp instanceof HTMLInputElement ||
        emailInp instanceof HTMLTextAreaElement) {
        if (emailInp?.value === "") {
            emailInp.value = "@.";
            emailInp.setSelectionRange(0, 0);
        }
        else if (emailInp?.value === "@") {
            emailInp.value += "@.";
            emailInp.setSelectionRange(0, 0);
        }
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__.inputNotFound(emailInp, `${emailInp?.id ?? "UNDEFINED ID EMAIL CONTAINER"}`, (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__.extLine)(new Error()));
}
function formatCEP(CEPInp) {
    if (CEPInp instanceof HTMLInputElement ||
        CEPInp instanceof HTMLTextAreaElement) {
        CEPInp.value.replaceAll(/[^0-9]/g, "");
        if (CEPInp.value.length >= 5 &&
            CEPInp.value.match(/[0-9]{5,}[^-][0-9]{1,3}/))
            CEPInp.value = `${CEPInp.value.slice(0, 5)}-${CEPInp.value.slice(5, 9)}`;
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__.inputNotFound(CEPInp, "CEPInp", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__.extLine)(new Error()));
}
function addDblQuotes(qtedInp) {
    if (qtedInp instanceof HTMLInputElement ||
        qtedInp instanceof HTMLTextAreaElement) {
        if (qtedInp?.value === "") {
            qtedInp.value = '""';
            qtedInp.setSelectionRange(1, 1);
        }
        else if (qtedInp?.value === '"') {
            qtedInp.value += '"';
            qtedInp.setSelectionRange(1, 1);
        }
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__.inputNotFound(qtedInp, `${qtedInp?.id ?? "UNDEFINED ID QUOTED CONTAINER"}`, (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__.extLine)(new Error()));
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
    constructor(id = "", value = "") {
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
    constructor(title = null) {
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
    constructor(gen = "masculino", age = 0, weight = 0, height = 0, sumDCut = 0, atvLvl = "leve") {
        this.gen = gen;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.sumDCut = sumDCut;
        this.atvLvl = atvLvl;
    }
    checkAtvLvl(personInfo) {
        if (((personInfo instanceof Man ||
            personInfo instanceof Woman ||
            personInfo instanceof Woman ||
            personInfo instanceof Person) &&
            "atvLvl" in personInfo &&
            this.atvLvl !== "") ||
            typeof personInfo === "string") {
            if (typeof personInfo === "string")
                this.atvLvl = personInfo;
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
            console.error(`Erro validando instância de pessoa. Valor obtido: ${personInfo ?? "null"}; instância ${Object.prototype.toString.call(personInfo).slice(8, -1) ?? "null"}; Valor de Nível de Atividade Física obtido: ${this.atvLvl ?? "null"}`);
            return 0;
        }
        return 0;
    }
    calcIMC(personInfo) {
        try {
            if (((personInfo instanceof Man ||
                personInfo instanceof Woman ||
                personInfo instanceof Woman ||
                personInfo instanceof Person) &&
                "weight" in personInfo &&
                typeof this.weight === "number" &&
                this.weight > 0 &&
                "height" in this &&
                typeof this.height === "number" &&
                this.height > 0) ||
                (Array.isArray(personInfo) &&
                    typeof personInfo[0] === "number" &&
                    typeof personInfo[1] === "number")) {
                if (Array.isArray(personInfo)) {
                    [this.weight, this.height] = personInfo;
                }
                const IMC = this.weight / this.height ** 2;
                if (IMC && IMC > 0) {
                    const MLG = this.weight - this.weight * (IMC / 100) ?? 0;
                    if (IMC < 18.5)
                        return ["abaixo", IMC, MLG];
                    else if (IMC >= 18.5 && IMC < 25.0)
                        return ["eutrofico", IMC, MLG];
                    else if (IMC >= 25.0 && IMC < 30)
                        return ["sobrepeso", IMC, MLG];
                    else if (IMC >= 30 && IMC < 35)
                        return ["obeso1", IMC, MLG];
                    else if (IMC >= 35 && IMC < 40)
                        return ["obeso2", IMC, MLG];
                    else if (IMC > 40)
                        return ["obeso3", IMC, MLG];
                    else
                        throw new Error(`Erro classificando IMC. Valor obtido: ${IMC ?? 0}; Valores possíveis devem ser positivos`);
                }
                else
                    throw new Error(`Erro calculando IMC. Valores usados: Peso ${this.weight ?? 0} e Altura ${this.height ?? 0}`);
            }
            else
                throw new Error(`Erro validando dados fornecidos. Elemento pessoa: ${Object.prototype.toString.call(personInfo).slice(8, -1) ?? "null"}; weight presente: ${"weight" in personInfo ?? false};
          Peso obtido: ${this.weight ?? 0};
          height presente: ${"height" in personInfo ?? false};
          Altura obtida: ${this.height ?? 0}`);
        }
        catch (IMCError) {
            console.error(IMCError.message);
        }
        return ["", 0, 0];
    }
    calcPGC(person) {
        if ((person instanceof Man ||
            person instanceof Woman ||
            person instanceof Woman ||
            person instanceof Person) &&
            "sumDCut" in person &&
            typeof this.sumDCut === "number" &&
            this.sumDCut >= 0) {
            if (person instanceof Man) {
                let DC = 1.10938 -
                    0.0008267 * this.sumDCut +
                    0.0000016 * this.sumDCut ** 2 -
                    0.0002574 * person.age;
                if (DC <= 0 || Number.isNaN(DC))
                    DC = 0.01;
                let PGC = 495 / DC - 450;
                if (PGC <= 0 || Number.isNaN(PGC))
                    PGC = 0.01;
                if (PGC > 100)
                    PGC = 100;
                return PGC;
            }
            else if (person instanceof Woman) {
                let DC = 1.0994921 -
                    0.0009929 * this.sumDCut +
                    0.0000023 * this.sumDCut ** 2 -
                    0.0001392 * person.age;
                if (DC <= 0 || Number.isNaN(DC))
                    DC = 0.01;
                let PGC = 495 / DC - 450;
                if (PGC <= 0 || Number.isNaN(PGC))
                    PGC = 0.01;
                if (PGC > 100)
                    PGC = 100;
                return PGC;
            }
            else if (person instanceof Neutro) {
                let DC = 1.10443605 -
                    0.0009098 * this.sumDCut +
                    0.00000195 * this.sumDCut ** 2 -
                    0.0001983 * person.age;
                if (DC <= 0 || Number.isNaN(DC))
                    DC = 0.01;
                let PGC = 495 / DC - 450;
                if (PGC <= 0 || Number.isNaN(PGC))
                    PGC = 0.01;
                if (PGC > 100)
                    PGC = 100;
                return PGC;
            }
            else
                console.error(`Instância de objeto inválida. Instância obtida: ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"}`);
            return 0;
        }
        else
            console.warn(`Erro validado Propriedade sumDCut:
      Está presente: ${"sumDCut" in person ?? false};
      Tipo primitivo de sumDCut: ${typeof this.sumDCut};
      Valor obtido: ${this.sumDCut ?? 0}`);
        return 0;
    }
    calcTMB(person, IMC = 0, MLG = 0, factorAtleta = "Peso") {
        if (factorAtleta === "peso")
            factorAtleta = "Peso";
        if (factorAtleta === "mlg")
            factorAtleta = "MLG";
        try {
            if ((person instanceof Man ||
                person instanceof Woman ||
                person instanceof Woman ||
                person instanceof Person) &&
                "atvLvl" in person &&
                this.atvLvl &&
                typeof this.atvLvl === "string" &&
                typeof IMC === "number" &&
                typeof MLG === "number" &&
                typeof factorAtleta === "string") {
                if (this.atvLvl === "muitoIntenso" &&
                    (factorAtleta === "MLG" || factorAtleta === "Peso")) {
                    if (factorAtleta === "MLG") {
                        if (MLG && MLG > 0)
                            return ["tinsley", 25.9 * MLG + 284];
                        else
                            throw new Error(`Erro validando MLG.
              Valor obtido: ${MLG ?? 0}`);
                    }
                    else if (factorAtleta === "Peso") {
                        if ("weight" in person && this.weight > 0)
                            return ["tinsley", 24.8 * this.weight + 10];
                        else
                            throw new Error(`Erro validando weight.
              Valor obtido: ${this.weight ?? 0}`);
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
                            if (person instanceof Man)
                                return [
                                    "harrisBenedict",
                                    66 +
                                        (13.8 * this.weight + 5.0 * this.height - 6.8 * this.age),
                                ];
                            else if (person instanceof Woman)
                                return [
                                    "harrisBenedict",
                                    655 +
                                        (9.6 * this.weight + 1.9 * this.height - 4.7 * this.age),
                                ];
                            else if (person instanceof Neutro)
                                return [
                                    "harrisBenedict",
                                    360.5 +
                                        (11.7 * this.weight + 3.45 * this.height - 5.75 * this.age),
                                ];
                            else
                                throw new Error(`Erro validando instância de Person. Instância obtida: ${Object.prototype.toString.call(person).slice(8, -1) ??
                                    "null"}`);
                        }
                        else if (IMC >= 25.0) {
                            if (person instanceof Man)
                                return [
                                    "mifflinStJeor",
                                    10 * this.weight + 6.25 * this.height - 5.0 * this.age + 5,
                                ];
                            else if (person instanceof Woman)
                                return [
                                    "mifflinStJeor",
                                    10 * this.weight + 6.25 * this.height - 5.0 * this.age - 161,
                                ];
                            else if (person instanceof Neutro)
                                return [
                                    "mifflinStJeor",
                                    10 * this.weight + 6.25 * this.height - 5.0 * this.age - 78,
                                ];
                            else
                                throw new Error(`Erro validando instância de Person. Instância obtida: ${Object.prototype.toString
                                    .call(person)
                                    .slice(8, -1)}`);
                        }
                        else
                            throw new Error(`Erro validando IMC. IMC obtido: ${IMC ?? 0}; Valor deve ser númerico, positivo e float`);
                    }
                    else
                        throw new Error(`Erro validando propriedades de person.
            weight presente: ${"weight" in person ?? false};
            Valor de weight obtido: ${this.weight ?? 0};
            height presente: ${"height" in person ?? false};
            Valor de height obtido: ${this.height ?? 0};
            age presente: ${"age" in person ?? false};
            `);
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
        Valor de atvLvl obtido: ${this.atvLvl ?? "null"};
        Tipo primtiivo de .atvLvl: ${typeof this.atvLvl};
        Tipo primitivo de IMC: ${typeof IMC};
        Tipo primitivo de MLG: ${typeof MLG};
        Tipo primitivo de factorAtleta: ${typeof factorAtleta}.`);
            }
        }
        catch (TMBError) {
            console.error(TMBError.message);
        }
        return ["", 0];
    }
    calcGET(TMB = 0, factorAtvLvl = 1.4) {
        if (TMB && factorAtvLvl)
            return TMB * factorAtvLvl;
        else
            console.error(`Erro validando argumentos.
      TMB obtido: ${TMB ?? 0};
      factorAtvLvl obtido: ${factorAtvLvl ?? 0}`);
        return 0;
    }
    static clonePerson(person) {
        if ((person instanceof Man ||
            person instanceof Woman ||
            person instanceof Woman ||
            person instanceof Person) &&
            "gen" in person &&
            typeof person.gen === "string") {
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
        else
            console.error(`Erro validando person.
      Objeto obtido: ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"};
      .gen presente: ${"gen" in person ?? false};
      Tipo primitivo de .gen: ${typeof person.gen}`);
        return person;
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
/* harmony export */   extLine: () => (/* binding */ extLine),
/* harmony export */   inputNotFound: () => (/* binding */ inputNotFound),
/* harmony export */   matchError: () => (/* binding */ matchError),
/* harmony export */   maxNumberError: () => (/* binding */ maxNumberError),
/* harmony export */   multipleElementsNotFound: () => (/* binding */ multipleElementsNotFound),
/* harmony export */   objectError: () => (/* binding */ objectError),
/* harmony export */   stringError: () => (/* binding */ stringError),
/* harmony export */   typeError: () => (/* binding */ typeError)
/* harmony export */ });
const extLine = (error) => error.stack?.split("\n")[1]?.trim()?.slice(-3, -1) || "NULL";
function elementNotFound(element, elementName, line) {
    element ??= "UNDEFINED";
    elementName ||= "UNNAMED";
    line ||= "UNDEFINED";
    if (element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLOptionElement)
        console.error(`
  ELEMENT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Error validating instance of ${element?.id || elementName || "NULL"}.
  Obtained instance: ${Object.prototype.toString.call(element)?.slice(8, -1) || "NULL"};
  Obtained value: ${element?.value ?? "NULL"}.`);
    else
        console.error(`
  ELEMENT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Error validating instance of ${element?.id || elementName || "UNDEFINED ID OR NAME"}.
  Obtained instance: ${Object.prototype.toString.call(element)?.slice(8, -1) || "NULL"}.`);
}
function inputNotFound(element, elementName, line) {
    element ??= "UNDEFINED";
    elementName ||= "UNNAMED";
    line ||= "UNDEFINED";
    console.error(`INPUT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Error validating ${element?.id || elementName || "UNDEFINED ID OR NAME"}.
  Obtained Element: ${element ?? "NULL"};
  Obtained instance: ${Object.prototype.toString.call(element)?.slice(8, -1) || "NULL"};
  Obtained type (only for <input>): ${element?.type || "NULL"};
  Obtained value: ${element?.value || "NULL"};
  Obtained .checked: ${element?.checked || "NULL"}.`);
}
function elementWithArrayError(context, array, arrayName, element, elementName, line) {
    context ||= "UNDEFINED";
    arrayName ||= "UNDEFINED NAME";
    array ??= "UNDEFINED";
    element ??= "UNDEFINED";
    elementName ||= "UNNAMED";
    line ||= "UNDEFINED";
    console.error(`ELEMENT WITH ARRAY ERROR, LINE ${line ?? "UNDEFINED"}:
  Error validating ${context}.
  ${elementName ?? "UNNAMED"} obtained: ${JSON.stringify(array) || null};
  Instance of ${arrayName ?? "UNNAMED ARRAY"} obtained: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"}.`);
}
function elementWithObjectError(context, object = {}, element, elementName, line) {
    context ||= "UNDEFINED";
    element ??= "UNDEFINED";
    elementName ||= "UNNAMED";
    line ||= "UNDEFINED";
    console.error(`ELEMENT WITH OBJECT ERROR, LINE ${line ?? "UNDEFINED"}:
    Erro ${context ?? "UNDEFINED"}. Elemento: ${JSON.stringify(object) || null}; instância: ${object?.constructor?.name ?? "NULL"}
    ${elementName ?? "UNNAMED"}: Obtained instance: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"}`);
}
function elementNotPopulated(array, arrayName, line) {
    array ??= "UNDEFINED";
    arrayName ||= "UNNAMED ARRAY";
    line ||= "UNDEFINED";
    console.error(`ELEMENT POPULATION ERROR, LINE ${line ?? "UNDEFINED"}:
  Error validating ${arrayName || "NULL"}.
  Array: ${Array.isArray(array)};
  List or Collection: ${Object.prototype.toString.call(array)?.slice(8, -1) || "NULL"};
  Obtained length: ${array?.length || "0"};
  Stringification: ${JSON.stringify(array) || "NULL"}`);
}
function multipleElementsNotFound(line, context, ...elements) {
    line ||= "UNDEFINED";
    context ||= "UNDEFINED";
    let errorMessage = `MULTIPLE ELEMENTS NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Error validating ${context || "Undefined Function Name"}.`;
    const mappedNullElements = elements.map(element => element === null || element === undefined ? "NULL" : element);
    mappedNullElements.forEach(element => {
        if (element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement ||
            element instanceof HTMLOptionElement) {
            if (element instanceof HTMLInputElement &&
                (element.type === "radio" || element.type === "checkbox"))
                errorMessage += `Instance of ${element.id || "NULL"} obtained: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n
        .checked obtained: ${element?.checked || "NULL"}`;
            else
                errorMessage += `Instance of ${element.id || "NULL"} obtained: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n
        Obtained value: ${element?.value || "NULL"}`;
        }
        else
            errorMessage += `Instance of ${element.id || "NULL"} obtained: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n`;
    });
    console.error(errorMessage);
}
function elementsNotFoundFunction(line, funcName, ...elements) {
    line ||= "UNDEFINED";
    funcName ||= "UNDEFINED FUNCTION NAME";
    let errorMessage = `ELEMENTS NOT FOUND FOR FUNCTION, LINE ${line ?? "UNDEFINED"}:
  Error validating Obtained instance for ${funcName || "NULL"}`;
    const mappedNullElements = elements.map(element => element === null || element === undefined ? "NULL" : element);
    mappedNullElements.forEach(element => {
        if (element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLSelectElement ||
            element instanceof HTMLOptionElement) {
            if (element instanceof HTMLInputElement &&
                (element.type === "radio" || element.type === "checkbox"))
                errorMessage += `Instance of ${element.id || "NULL"} obtained: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n
        .checked obtained: ${element?.checked || "NULL"}`;
            else
                errorMessage += `Instance of ${element.id || "NULL"} obtained: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n
        Obtained value: ${element?.value || "NULL"}`;
        }
        else
            errorMessage += `Instance of ${element?.id || "NULL"} obtained: ${Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"};\n`;
    });
    console.error(errorMessage);
}
function maxNumberError(unvalidNumber, title, line) {
    unvalidNumber ??= "UNDEFINED NUMBER";
    if (typeof unvalidNumber === "number")
        unvalidNumber = unvalidNumber.toString();
    title ||= "UNDEFINED TITLE";
    line ||= "UNDEFINED";
    console.error(`MAX NUMBER ERROR, LINE ${line ?? "UNDEFINED"}:
  Number of ${title || "Undefined Title"} invalid.
  Max number obtained: ${parseInt(unvalidNumber, 10) || 0}`);
}
function stringError(context, text, line) {
    context ||= "UNDEFINED CONTEXT";
    text ||= "UNDEFINED";
    line ||= "UNDEFINED";
    console.error(`STRING ERROR, LINE ${line ?? "UNDEFINED"}:
  Error validating ${context}.
  Value obtained: ${text ?? "NULL"}`);
}
function matchError(context, element, text, line) {
    context ||= "UNDEFINED CONTEXT";
    element ??= "UNDEFINED";
    text ||= "UNDEFINED";
    line ||= "UNDEFINED";
    console.error(`MATCH ERROR, LINE ${line ?? "UNDEFINED"}:
  Error validating ${context || "UNDEFINED"}.
  Obtained Element: ${element || "UNDEFINED"};
  Title obtained: ${text || "Undefined Title"}.`);
}
function typeError(context, element, acceptedType, line) {
    context ||= "UNDEFINED CONTEXT";
    element ??= "UNDEFINED";
    acceptedType ||= "UNDEFINED";
    line ||= "UNDEFINED";
    console.error(`TYPE ERROR, LINE ${line ?? "UNDEFINED"}:
  Primitive type obtained for ${context || "UNDEFINED"} incorrect.
  Type obtained: ${typeof element ?? "Undefined typeof"};
  Type accepted: ${acceptedType || "Undefined Accepted Type"}`);
}
function objectError(context, object = {}, objectName, maxPropertiesNumber, line) {
    context ||= "UNDEFINED CONTEXT";
    objectName ||= "UNDEFINED";
    maxPropertiesNumber ||= "UNDEFINED";
    line ||= "UNDEFINED";
    console.error(`OBJECT ERROR, LINE ${line ?? "UNDEFINED"}:
  Error validating ${objectName ?? "UNDEFINED OBJECT NAME"} for ${context || "UNDEFINED"}.
  Object obtained: ${JSON.stringify(object) || "Undefined Object"};
  Número obtained of properties: ${Object.keys.length ?? 0}; Número accepted: ${maxPropertiesNumber ?? 0}`);
}


/***/ }),

/***/ "../global-scripts/src/gController.tsx":
/*!*********************************************!*\
  !*** ../global-scripts/src/gController.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addListenerAstDigitBtns: () => (/* binding */ addListenerAstDigitBtns),
/* harmony export */   addListenerAutocorrectBtns: () => (/* binding */ addListenerAutocorrectBtns),
/* harmony export */   addListenerCite: () => (/* binding */ addListenerCite),
/* harmony export */   addListenerDateBtns: () => (/* binding */ addListenerDateBtns),
/* harmony export */   addListenerNumInps: () => (/* binding */ addListenerNumInps),
/* harmony export */   addListenerRadios: () => (/* binding */ addListenerRadios),
/* harmony export */   addListenerTexts: () => (/* binding */ addListenerTexts),
/* harmony export */   getGlobalEls: () => (/* binding */ getGlobalEls)
/* harmony export */ });
/* harmony import */ var _gModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _gHandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _errorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorHandler */ "../global-scripts/src/errorHandler.tsx");




function getGlobalEls(isAutocorrectOn = true, firstClick = true, context = "notNum") {
    const textConts = [
        ...document.querySelectorAll("textarea"),
        ...document.querySelectorAll('input[type="text"]'),
    ];
    const radioInps = Array.from(document.querySelectorAll('input[type="radio"]'));
    const dateBtns = Array.from(document.querySelectorAll('button[id$="DatBtn"]'));
    const deactAutocorrectBtns = [
        ...document.querySelectorAll('button[id^="deactAutocorrectBtn"]'),
        ...document.querySelectorAll('input[id^="deactAutocorrectBtn"]'),
    ];
    const astDigtBtns = Array.from(document.querySelectorAll('button[id$="AstDigtBtn'));
    const editableCite = document.querySelector('cite[contenteditable="true"]');
    const resetFormBtn = document.getElementById("resetFormBtn");
    const subButton = document.getElementById("submitFormButId");
    textConts?.length > 0
        ? addListenerTexts(textConts, isAutocorrectOn)
        : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotPopulated(textConts, "textConts", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    radioInps?.length > 0
        ? addListenerRadios(radioInps, "ed")
        : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotPopulated(radioInps, "radioInps", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    dateBtns?.length > 0
        ? addListenerDateBtns(dateBtns)
        : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotPopulated(dateBtns, "dateBtns", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    astDigtBtns?.length > 0
        ? addListenerAstDigitBtns(astDigtBtns)
        : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotPopulated(astDigtBtns, "astDigtBtns", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    subButton instanceof HTMLButtonElement
        ? subButton.addEventListener("click", () => _gHandlers__WEBPACK_IMPORTED_MODULE_1__.subForm(subButton))
        : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(subButton, "subButton", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    resetFormBtn instanceof HTMLButtonElement
        ? resetFormBtn.addEventListener("click", (click) => _gHandlers__WEBPACK_IMPORTED_MODULE_1__.resetarFormulario(click, astDigtBtns, resetFormBtn))
        : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(resetFormBtn, "resetFormBtn", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    if (context === "num") {
        const numInps = Array.from(document.querySelectorAll('input[type="number"]'));
        numInps?.length > 0
            ? addListenerNumInps(numInps)
            : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotPopulated(numInps, "numInps", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    }
    deactAutocorrectBtns?.length > 0
        ? (isAutocorrectOn = addListenerAutocorrectBtns(deactAutocorrectBtns, isAutocorrectOn))
        : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotPopulated(deactAutocorrectBtns, "deactAutoCorrectBtns", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    firstClick = addListenerCite(editableCite, isAutocorrectOn, firstClick);
    return [isAutocorrectOn || true, firstClick || false];
}
function addListenerTexts(textConts, isAutocorrectOn = true) {
    if (textConts.every(el => el instanceof HTMLElement)) {
        textConts.forEach(textCont => {
            if (textCont?.classList.contains("autocorrect")) {
                textCont instanceof HTMLTextAreaElement ||
                    (textCont instanceof HTMLInputElement && textCont.type === "text")
                    ? textCont.addEventListener("input", () => {
                        isAutocorrectOn = _gModel__WEBPACK_IMPORTED_MODULE_0__.checkAutoCorrect(document.querySelector('button[id^="deactAutocorrectBtn"]') ||
                            document.querySelector('input[id^="deactAutocorrectBtn"]'));
                        console.log(isAutocorrectOn);
                        _gModel__WEBPACK_IMPORTED_MODULE_0__.autoCapitalizeInputs(textCont, isAutocorrectOn);
                    })
                    : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(textCont, `target textCont id ${JSON.stringify(textCont?.id || "UNIDENTIFIED TEXTCONT")}`, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
            }
        });
    }
    else
        console.error(`Erro validando instâncias em textConts`);
}
function addListenerNumInps(numInps) {
    if (numInps.every(el => el instanceof HTMLElement)) {
        numInps.forEach(numInp => {
            numInp instanceof HTMLInputElement && numInp.type === "number"
                ? numInp.addEventListener("input", () => {
                    _gModel__WEBPACK_IMPORTED_MODULE_0__.numberLimit(numInp);
                })
                : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(numInp, `target numInp id ${JSON.stringify(numInp?.id || "UNIDENTIFIED TEXTCONT")}`, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        });
    }
    else
        console.error(`Erro validando instâncias em numInps`);
}
function addListenerRadios(radioInps, context = "od") {
    if (radioInps.every(el => el instanceof HTMLElement) &&
        (context === "od" || context === "ed" || context === "ag")) {
        radioInps.forEach(radio => {
            if (radio instanceof HTMLInputElement && radio.type === "radio") {
                radio.addEventListener("keydown", (keydown) => {
                    _gHandlers__WEBPACK_IMPORTED_MODULE_1__.opRadioHandler(keydown, Array.from(document.querySelectorAll('input[id$="Yes"], input[id$="No"]' //acessando como par
                    )));
                });
                radio.addEventListener("dblclick", () => _gHandlers__WEBPACK_IMPORTED_MODULE_1__.doubleClickHandler(radio));
                if (context === "ed" || context === "ag") {
                    radio.addEventListener("change", (change) => _gHandlers__WEBPACK_IMPORTED_MODULE_1__.cpbInpHandler(change, radio));
                    radio.addEventListener("keydown", (keydown) => _gHandlers__WEBPACK_IMPORTED_MODULE_1__.cpbInpHandler(keydown, radio));
                    if (context === "ag")
                        radio.addEventListener("change", () => _gHandlers__WEBPACK_IMPORTED_MODULE_1__.deactTextInput(document.querySelectorAll('input[type="number"][id$=NumId]'), document.querySelectorAll("input[id$=NullId]")));
                }
                // radio.addEventListener("touchstart", GlobalHandler.touchStartHandler);
            }
            else
                _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(radio, `target radio id ${radio?.id || "UNDEFINED ID RADIO"}`, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        });
    }
    else
        console.error(`Erro validando instâncias em radioInps`);
}
function addListenerDateBtns(dateBtns) {
    if (dateBtns.every(el => el instanceof HTMLElement)) {
        dateBtns.forEach(dateBtn => {
            dateBtn instanceof HTMLButtonElement
                ? dateBtn.addEventListener("click", (activation) => {
                    _gHandlers__WEBPACK_IMPORTED_MODULE_1__.useCurrentDate(activation, dateBtn);
                })
                : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(dateBtn, `target dateBtn id ${dateBtn?.id || "UNDEFINED ID DATEBTN"}`, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        });
    }
    else
        console.error(`Erro validando instâncias em dateBtns`);
}
function addListenerCite(editableCite, isAutocorrectOn = true, firstClick = true) {
    if (editableCite instanceof HTMLElement) {
        const citeClickHandler = (click) => {
            if (firstClick && click.target instanceof HTMLElement) {
                _gModel__WEBPACK_IMPORTED_MODULE_0__.removeFirstClick(click.target);
                firstClick = false;
                editableCite.removeEventListener("click", citeClickHandler);
            }
        };
        editableCite.addEventListener("keyup", (keypress) => {
            keypress.target instanceof HTMLElement
                ? _gModel__WEBPACK_IMPORTED_MODULE_0__.autoCapitalizeCite(keypress.target, isAutocorrectOn)
                : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(keypress.target, "keypress with editableCite as a target", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        });
        editableCite.addEventListener("click", citeClickHandler);
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(null, "editableCite", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    return firstClick || false;
}
function addListenerAutocorrectBtns(deactAutocorrectBtns, isAutocorrectOn = true) {
    if (deactAutocorrectBtns.every(el => el instanceof HTMLElement)) {
        deactAutocorrectBtns.forEach(deactAutocorrectBtn => {
            deactAutocorrectBtn instanceof HTMLButtonElement ||
                (deactAutocorrectBtn instanceof HTMLInputElement &&
                    (deactAutocorrectBtn.type === "checkbox" ||
                        deactAutocorrectBtn.type === "radio"))
                ? deactAutocorrectBtn.addEventListener("click", (click) => {
                    isAutocorrectOn = _gModel__WEBPACK_IMPORTED_MODULE_0__.switchAutocorrect(click, deactAutocorrectBtn, isAutocorrectOn);
                    console.log(isAutocorrectOn);
                    return isAutocorrectOn;
                })
                : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotPopulated(deactAutocorrectBtns, `target deactAutocorrectBtn id ${deactAutocorrectBtn?.id || "UNDEFINED ID BUTTON"}`, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        });
    }
    else
        console.error(`Erro validando instâncias em deactAutocorrectBtns`);
    return isAutocorrectOn || true;
}
function addListenerAstDigitBtns(astDigtBtns) {
    if (astDigtBtns.every(el => el instanceof HTMLElement)) {
        astDigtBtns.forEach(astDigtBtn => {
            astDigtBtn instanceof HTMLButtonElement
                ? astDigtBtn.addEventListener("click", (click) => {
                    _gHandlers__WEBPACK_IMPORTED_MODULE_1__.changeToAstDigit(click, astDigtBtn);
                })
                : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(astDigtBtn, astDigtBtn?.id || "UNDEFINED ID BUTTON", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        });
    }
    else
        console.error(`Erro validando instâncias em astDigtBtns`);
}
// // export function addListenerGenCont(
// //   genElements: entryEl[],
// //   genElIndex: number = 0,
// //   genValue: string = "masculino"
// // ): string {
// //   const genEl = genElements[genElIndex];
// //   genEl.addEventListener("change", () => {
// //     genValue =
// //       GlobalModel.fluxGen(genElements, (genEl as entryEl)?.value) || genValue;
// //   });
// //   return genValue;
// // }


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
/* harmony export */   defineLabId: () => (/* binding */ defineLabId),
/* harmony export */   doubleClickHandler: () => (/* binding */ doubleClickHandler),
/* harmony export */   formatJSONFile: () => (/* binding */ formatJSONFile),
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
function updateSimpleProperty(el) {
    if (el instanceof HTMLInputElement) {
        if (el.type === "radio" || el.type === "checkbox")
            return el.checked.toString();
        else if (el.type === "number") {
            if (Number.isNaN(parseFloat(el.value?.replaceAll(/[^0-9.,+-]/g, ""))))
                return 0;
            else
                return parseFloat(el.value?.replaceAll(/[^0-9.,+-]/g, "")) ?? 0;
        }
        else
            return el.value || "0";
    }
    else if (el instanceof HTMLSelectElement ||
        el instanceof HTMLTextAreaElement)
        return el.value;
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(el, "el in updateSimpleProperty", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    return "-1";
}
function cursorCheckTimer() {
    const selection = window.getSelection();
    if (selection && selection.focusNode !== null) {
        setTimeout(() => {
            return selection.getRangeAt(0)?.startOffset;
        }, 3000);
    }
    return 0;
}
function opRadioHandler(keydown, radioPairs) {
    if (keydown instanceof KeyboardEvent &&
        radioPairs.every(radioPair => radioPair instanceof HTMLInputElement)) {
        for (let i = 0; i < radioPairs.length; i += 2 //pulando de par em par
        ) {
            const radioYes = radioPairs[i];
            const radioNo = radioPairs[i + 1];
            if (!radioYes || !radioNo)
                break;
            if (radioYes instanceof HTMLInputElement &&
                (radioYes.type === "checkbox" || radioYes.type === "radio") &&
                radioNo instanceof HTMLInputElement &&
                (radioNo.type === "checkbox" || radioNo.type === "radio") &&
                !radioYes.checked &&
                !radioNo.checked) {
                if (keydown.altKey && keydown.key === "y") {
                    radioYes.focus();
                    radioYes.checked = true;
                    setTimeout(() => {
                        radioYes.blur();
                    }, 5000);
                    return;
                }
                else if (keydown.altKey && keydown.key === "n") {
                    radioNo.focus();
                    radioNo.checked = true;
                    setTimeout(() => {
                        radioNo.blur();
                    }, 5000);
                    return;
                }
            }
            else
                _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), `validando radioYes id ${radioYes?.id ?? "UNDEFINED ID"} ou radiosNo id ${radioNo?.id ?? "UNDEFINED ID"}`, radioYes, radioNo);
        }
    }
    else
        console.error(`Error validating KeyboardEvent in opRadioHandler.`);
}
function cpbInpHandler(ev, radio) {
    if (ev instanceof Event &&
        radio instanceof HTMLInputElement &&
        radio?.parentElement?.parentElement) {
        const divAdds = radio.parentElement?.parentElement?.querySelectorAll("div[id^='divAdd']") ||
            radio.parentElement?.parentElement?.parentElement?.querySelectorAll("div[id^='divAdd']");
        const textAdds = radio.parentElement?.parentElement?.querySelectorAll("textarea[id^='textAdd']") ||
            radio.parentElement?.parentElement?.parentElement?.querySelectorAll("div[id^='textAdd']");
        //inclui ambos os tipos de eventos
        radio.parentElement?.parentElement?.parentElement
            ?.querySelectorAll("input[id^='Cpb'][id$='Yes']")
            ?.forEach((opRadioCheck, i) => {
            let divAdd = divAdds[i];
            divAdd ??= searchNextSiblings(radio.parentElement?.parentElement, "divAdd");
            if (divAdd instanceof HTMLElement &&
                opRadioCheck instanceof HTMLInputElement &&
                (opRadioCheck.type === "checkbox" || opRadioCheck.type === "radio")) {
                opRadioCheck.checked
                    ? (divAdd.style.display = "block")
                    : (divAdd.style.display = "none");
            }
        });
        if (!radio.classList.contains("radOD")) {
            let divAddPair = undefined;
            if (radio.parentElement?.nextElementSibling?.classList.contains("divAdd"))
                divAddPair = radio.parentElement.nextElementSibling;
            if (radio.parentElement?.parentElement?.nextElementSibling?.classList.contains("divAdd"))
                divAddPair = radio.parentElement.parentElement.nextElementSibling;
            else if (radio.parentElement?.parentElement?.parentElement?.nextElementSibling?.classList.contains("divAdd"))
                divAddPair =
                    radio.parentElement.parentElement.parentElement.nextElementSibling;
            if (divAddPair instanceof HTMLElement) {
                radio.checked && radio.id.match(/Yes/)
                    ? (divAddPair.style.display = "block")
                    : (divAddPair.style.display = "none");
            }
        }
        radio.parentElement?.parentElement
            ?.querySelectorAll("input[id^='pb'][id$='Yes']")
            ?.forEach((opRadioText, i) => {
            let textAdd = textAdds[i];
            textAdd ??=
                searchNextSiblings(radio.parentElement?.parentElement, "textAdd") ||
                    searchNextSiblings(radio.parentElement?.parentElement, "divAdd");
            if (textAdd instanceof HTMLElement &&
                opRadioText instanceof HTMLInputElement &&
                (opRadioText.type === "checkbox" || opRadioText.type === "radio")) {
                !opRadioText.checked
                    ? (textAdd.style.display = "none")
                    : (textAdd.style.display = "block");
            }
        });
        radio.parentElement?.parentElement?.parentElement
            ?.querySelectorAll("input[id^='pb'][id$='Yes']")
            ?.forEach((opRadioText, i) => {
            let textAdd = textAdds[i];
            textAdd ??=
                searchNextSiblings(radio.parentElement?.parentElement, "textAdd") ||
                    searchNextSiblings(radio.parentElement?.parentElement, "divAdd");
            if (textAdd instanceof HTMLElement &&
                opRadioText instanceof HTMLInputElement &&
                (opRadioText.type === "checkbox" || opRadioText.type === "radio")) {
                !opRadioText.checked
                    ? (textAdd.style.display = "none")
                    : (textAdd.style.display = "block");
            }
        });
        radio.parentElement?.parentElement
            ?.querySelectorAll("input[id^='antFam']")
            ?.forEach(antFamCheck => {
            const closestAddElement = antFamCheck?.parentElement?.nextElementSibling;
            if (closestAddElement instanceof HTMLDivElement ||
                closestAddElement instanceof HTMLSpanElement) {
                antFamCheck instanceof HTMLInputElement &&
                    (antFamCheck.type === "checkbox" || antFamCheck.type === "radio") &&
                    !antFamCheck.checked
                    ? (closestAddElement.style.display = "none")
                    : (closestAddElement.style.display = "block");
            }
        });
        radio.parentElement?.parentElement?.parentElement
            ?.querySelectorAll("input[id^='antFam']")
            ?.forEach(antFamCheck => {
            const closestAddElement = antFamCheck?.parentElement?.parentElement?.nextElementSibling;
            if (closestAddElement instanceof HTMLDivElement ||
                closestAddElement instanceof HTMLSpanElement) {
                antFamCheck instanceof HTMLInputElement &&
                    (antFamCheck.type === "checkbox" || antFamCheck.type === "radio") &&
                    !antFamCheck.checked
                    ? (closestAddElement.style.display = "none")
                    : (closestAddElement.style.display = "block");
            }
        });
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), "localizando parent elements de Radio", radio, radio?.parentElement, radio?.parentElement?.parentElement);
}
function deactTextInput(addressInps, nullRadios) {
    addressInps?.length > 0 && addressInps.length === nullRadios.length
        ? nullRadios.forEach(nullRadio => {
            nullRadio.addEventListener("click", () => {
                nullRadio instanceof HTMLInputElement && nullRadio.checked
                    ? nullRadio.previousElementSibling?.setAttribute("disabled", "")
                    : nullRadio.previousElementSibling?.removeAttribute("disabled");
            });
            nullRadio.addEventListener("dblclick", () => {
                nullRadio instanceof HTMLInputElement && nullRadio.checked
                    ? nullRadio.previousElementSibling?.setAttribute("disabled", "")
                    : nullRadio.previousElementSibling?.removeAttribute("disabled");
            });
        })
        : console.error("Number of Inputs and Radios not equal, aborting deactTextInput()");
}
function doubleClickHandler(inpEl) {
    if (inpEl instanceof HTMLInputElement &&
        (inpEl.type === "checkbox" || inpEl.type === "radio")) {
        inpEl.checked = inpEl.checked ? false : true;
        cpbInpHandler(new Event("change"), inpEl);
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(inpEl, `inpEl id ${inpEl?.id ?? "UNDEFINED ID"}`, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
}
function useCurrentDate(activation, dateBtn) {
    if (activation?.target === dateBtn && dateBtn instanceof HTMLButtonElement) {
        const currentDate = new Date();
        const targInputDate = searchPreviousSiblings(dateBtn, "inpDate");
        targInputDate instanceof HTMLInputElement && targInputDate.type === "date"
            ? (targInputDate.value =
                currentDate.getFullYear() +
                    "-" +
                    (currentDate.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")
                        .replaceAll("'", "") +
                    "-" +
                    currentDate.getDate().toString().padStart(2, "0").replaceAll("'", ""))
            : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(targInputDate, `targInputDate id ${targInputDate?.id ?? "UNDEFINED ID"}`, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(dateBtn, "arguments for useCurrentDate()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
}
function searchNextSiblings(currentElement, searchedSiblingClass) {
    let loopAcc = 0;
    while (currentElement?.nextElementSibling) {
        currentElement = currentElement.nextElementSibling;
        if (currentElement?.classList?.contains(searchedSiblingClass) ||
            loopAcc > 999)
            break;
        loopAcc++;
    }
    return currentElement;
}
function searchPreviousSiblings(currentElement, searchedSiblingClass) {
    let loopAcc = 0;
    while (currentElement?.previousElementSibling) {
        currentElement = currentElement.previousElementSibling;
        if (currentElement?.classList?.contains(searchedSiblingClass) ||
            loopAcc > 999)
            break;
        loopAcc++;
    }
    return currentElement;
}
function searchPreviousSiblingsById(currentElement, searchedSiblingId) {
    let loopAcc = 0;
    while (currentElement?.previousElementSibling) {
        currentElement = currentElement.previousElementSibling;
        if (currentElement?.id === searchedSiblingId || loopAcc > 999)
            break;
        loopAcc++;
    }
    return currentElement;
}
function searchParents(currentElement, searchedParentClass) {
    let loopAcc = 0;
    while (currentElement?.parentElement) {
        currentElement = currentElement.parentElement;
        if (currentElement?.classList?.contains(searchedParentClass) ||
            loopAcc > 999)
            break;
        loopAcc++;
    }
    return currentElement;
}
//TODO CONSIDERAR REPASSAR PARA REACT
function changeToAstDigit(click, toFileInpBtn) {
    if (click instanceof Event &&
        toFileInpBtn instanceof HTMLButtonElement &&
        toFileInpBtn.textContent) {
        const inpAst = searchPreviousSiblings(toFileInpBtn, "inpAst") ||
            searchPreviousSiblings(toFileInpBtn, "imgAstDigit");
        if ((inpAst instanceof HTMLInputElement ||
            inpAst instanceof HTMLImageElement) &&
            inpAst.parentElement) {
            let labAst = document.querySelector(".labAst");
            const fileInp = document.createElement("input");
            fileInp.name = inpAst.name;
            fileInp.id = inpAst.id;
            fileInp.className = inpAst.className;
            if (new RegExp(/Usar/g).test(toFileInpBtn.textContent)) {
                fileInp.type = "file";
                fileInp.setAttribute("accept", "image/*");
                if (inpAst instanceof HTMLInputElement && inpAst.required)
                    fileInp.required = true;
                defineLabId(labAst, toFileInpBtn, fileInp);
                toFileInpBtn.textContent = "Retornar à Assinatura Escrita";
                if (toFileInpBtn.previousElementSibling instanceof HTMLButtonElement)
                    toFileInpBtn.previousElementSibling?.setAttribute("hidden", "");
                fileInp.addEventListener("change", chose => {
                    try {
                        let imgFile;
                        if (fileInp?.files)
                            imgFile = fileInp.files[0];
                        if (chose?.target instanceof HTMLInputElement &&
                            fileInp?.files &&
                            fileInp.files?.length > 0 &&
                            imgFile &&
                            imgFile.type?.startsWith("image") &&
                            fileInp.parentElement &&
                            labAst) {
                            const fileReader = new FileReader();
                            fileReader.onload = load => {
                                //definir lógica para carregamento
                                //inicia preparo para evento de carregamento
                                const imgAstDigt = document.createElement("img"); //cria container
                                fileInp.id = inpAst.id;
                                fileInp.className = inpAst.className;
                                Object.assign(imgAstDigt, {
                                    src: load.target?.result,
                                    innerHTML: "",
                                    id: fileInp.id,
                                    className: fileInp.className,
                                    alt: "Assinatura Digital",
                                    decoding: "async",
                                    loading: "eager",
                                    crossorigin: "anonymous",
                                    style: {
                                        maxWidth: "300px",
                                        maxHeight: "200px",
                                        overflow: "auto",
                                    },
                                });
                                fileInp.parentElement.replaceChild(imgAstDigt, fileInp);
                                defineLabId(labAst, toFileInpBtn, imgAstDigt);
                            };
                            fileReader.readAsDataURL(imgFile); //lê o file baseado na src carregada
                        }
                        else
                            throw new Error(`Error on selecting the file and/or finding the parent Element for the file input.
              chose.target: ${chose?.target ?? "UNDEFINED CHOSE"};
              fileInp: ${fileInp ?? "UNDEFINED INP"};
              files: ${fileInp?.files ?? "UNDEFINED FILES"};
              parentElement: ${fileInp?.parentElement ?? "UNDEFINED PARENT"}; 
              imgFile: ${imgFile ?? "UNDEFINED IMAGE"}; 
              imgFile.type: ${imgFile?.type ?? "UNDEFINED TYPE"}; 
              lab ${labAst ?? "UNDEFINED LABEL"}`);
                    }
                    catch (error) {
                        console.error(error.message);
                    }
                });
            }
            else if (new RegExp(/Retornar/g).test(toFileInpBtn.textContent)) {
                fileInp.type = "text";
                fileInp.setAttribute("required", "");
                defineLabId(labAst, toFileInpBtn, fileInp);
                toFileInpBtn.textContent = "Usar Assinatura Digital";
                toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
                fileInp.addEventListener("input", () => _gModel__WEBPACK_IMPORTED_MODULE_0__.autoCapitalizeInputs(fileInp, _gModel__WEBPACK_IMPORTED_MODULE_0__.checkAutoCorrect(document.querySelector('button[id^="deactAutocorrectBtn"]') ||
                    document.querySelector('input[id^="deactAutocorrectBtn"]'))));
            }
            else
                _errorHandler__WEBPACK_IMPORTED_MODULE_2__.stringError("textContent for toFileInpBtn", toFileInpBtn?.textContent, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
            inpAst.parentElement.replaceChild(fileInp, inpAst);
        }
        else
            _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), "arguments for inpAst", inpAst, inpAst?.parentElement, toFileInpBtn);
        // //TODO INCLUIR TOKEN ANTI-CSRF QUANDO HOUVER SERVIDOR
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), "arguments for changToAstDigit()", `${JSON.stringify(click) || null}`, toFileInpBtn, toFileInpBtn?.textContent);
}
function defineLabId(labAst, toFileInpBtn, fileEl) {
    if (toFileInpBtn instanceof HTMLButtonElement &&
        (fileEl instanceof HTMLInputElement || fileEl instanceof HTMLImageElement)) {
        if (!labAst &&
            (toFileInpBtn.parentElement?.tagName === "LABEL" ||
                toFileInpBtn.parentElement?.tagName === "SPAN"))
            labAst = toFileInpBtn.parentElement;
        labAst.id = "spanAstPct";
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), "argumentos para defineLabId", toFileInpBtn, fileEl);
}
function resetarFormulario(click, toFileInpBtns, resetFormBtn = click?.target) {
    if ((click?.target instanceof HTMLButtonElement ||
        resetFormBtn instanceof HTMLButtonElement) &&
        Array.from(toFileInpBtns).every(fileBtn => fileBtn instanceof HTMLButtonElement)) {
        const formulario = document.getElementById("formAnamGId");
        const editableCite = document.querySelector('cite[contenteditable="true"]');
        const genBirthRel = document.getElementById("genBirthRelId");
        const genTrans = document.getElementById("genTransId");
        formulario instanceof HTMLFormElement
            ? formulario.reset()
            : _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(formulario, "formulario in resetarFormulario()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        if (editableCite) {
            editableCite.textContent = `--Nome`;
            _gModel__WEBPACK_IMPORTED_MODULE_0__.removeFirstClick(editableCite);
        }
        else
            _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(editableCite, "editableCite in resetarFormulario()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        if (genBirthRel instanceof HTMLSelectElement ||
            genBirthRel instanceof HTMLTextAreaElement ||
            genBirthRel instanceof HTMLInputElement) {
            genBirthRel.value = "cis";
            genBirthRel.hidden = true;
        }
        else
            _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(genBirthRel, "genBirthRel in resetarFormulario()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        if (genTrans instanceof HTMLSelectElement ||
            genTrans instanceof HTMLTextAreaElement ||
            genTrans instanceof HTMLInputElement) {
            genTrans.value = "avancado";
            genTrans.hidden = true;
        }
        else
            _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(genTrans, "genTrans in resetarFormulario()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        toFileInpBtns.forEach(toFileInpBtn => {
            if (toFileInpBtn?.textContent?.match(/Retornar/g))
                changeToAstDigit(click, toFileInpBtn);
        });
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), "arguments for resetarFormulario()", `${JSON.stringify(click?.target)}` || null, `${JSON.stringify(toFileInpBtns)}` || null);
}
//TODO FINALIZAR COM CSS
function subForm(subButton) {
    window.alert("Sistema ainda não pronto\n...mas você teria enviado clicando aqui! :)");
    console.log(subButton instanceof HTMLButtonElement);
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
function getJSONDesc(inputs = [null]) {
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
        if (inputs[k]?.classList.contains("inpIdentif"))
            titleElements.push(inputs[k]);
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
                inputs[z]?.id === "confrmLocId"
                    ? inpIds.push("confirmLoc")
                    : inpIds.push(inputs[z]?.id ?? "null");
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
        else
            console.error(`Erro validando elemento. Elemento ${inputs[z] ?? "null"}; instância ${Object.prototype.toString
                .call(inputs[z])
                .slice(8, -1)}; id ${inputs[z]?.id ?? "null"}`);
    }
    //loop para ajuste dos elementos dos arrays de inputs e construção dos storager de inputs
    for (let j = 0; j < inputs.length; j++) {
        //filtragem de tipos primitivos de values
        typeof inpValues[j] === "string" && inpValues[j] === ""
            ? (inpValues[j] = inpValues[j].replace("", "null") ?? "null")
            : (inpValues[j] = inpValues[j]?.toString() ?? "null");
        //avaliador de ids nulas
        if (inpIds[j]?.match(/null/g) || !inpIds[j])
            console.warn(`Id null detectada. Título relativo: ${closestValidElements[j] ?? "null"}`);
        //criação do storager
        const nJSONInpStorager = new _classes__WEBPACK_IMPORTED_MODULE_1__.JSONStorager(inpIds[j], inpValues[j]);
        //criação da store
        if (nJSONInpStorager) {
            JSONInpsStore.push(nJSONInpStorager);
            const descriptor = nJSONInpStorager.showAllInfo; //TODO EXPOSIÇÃO DE DADOS SOMENTE PARA FINALIDADES DE TESTE, POIS PROPRIEDADES PRIVADAS NÃO SÃO ENUMERÁVEIS
            descriptor
                ? JSONInpsStoreDescriptors.push(descriptor.toString())
                : console.warn(`Erro validando descriptor para instância ${j} de JSONStorager`);
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
            while (loopAcc < 10 && closestParent?.textContent === "") {
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
                    closestBooleanElementsIds.push(booleanParentCopy?.id ?? "null");
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
                                closestValidElements.push("Tratamento_Médico_" + titleElements[i]?.id.slice(-1) ??
                                    `NULL ${titleElements[i]?.id ??
                                        `Id null. Iteração do loop: ${titleAcc}`}`);
                            }
                            else {
                                titleElements[i]?.id === "citeNameId"
                                    ? closestValidElements?.push("Assinatura_Usuário" ?? 0)
                                    : closestValidElements?.push(closestParent?.textContent?.trim().replaceAll("\n", "") ??
                                        `NULL ${titleElements[i]?.id ??
                                            `Id null. Iteração do loop: ${titleAcc}`}`);
                            }
                        }
                    }
                    if (closestParent?.id !== "") {
                        //obtenção de ids dos 'parents'
                        //correção de id de interesse caso a do parent não esteja presente (atenção: desassocia id e text de interesse)
                        closestValidElementsIds.push(closestParent?.id ?? "null");
                    }
                    else if (closestParent?.id === "") {
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
            else if (closestParent?.textContent === "")
                console.warn(`Erro ao localizar textContent de parent`);
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
                        else
                            console.warn(`Erro validando parents, labels, placeholders e textContent. Id do Input: ${titleElements[i]?.id}; textContent ${titleElements[i]?.textContent}; placeholder ${titleElements[i]?.placeholder}; Última Instância de Parent avaliada ${Object.prototype.toString
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
    //loop para ajuste dos elementos dos arrays de titles e construção dos storager de titles
    for (let l = 0; l < titleElements.length; l++) {
        //correção de múltiplos espaços em labels e titles
        const multipleSpaceMatches = closestValidElements[l]?.match(/\s\s/);
        if (closestValidElements[l] &&
            multipleSpaceMatches &&
            multipleSpaceMatches.length > 0) {
            const spaceMatchesArray = [];
            multipleSpaceMatches.forEach(multipleSpaceMatch => {
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
            descriptor
                ? JSONTitlesStoreDescriptors.push(descriptor.toString())
                : console.warn(`Erro validando descriptor para instância ${l} de JSONStorager`);
        }
        else
            console.warn(`Erro validando instância ${l} de JSONStorager`);
    }
    //filtro e validação da store
    if (JSONInpsStoreDescriptors?.length === JSONInpsStore?.length &&
        JSONTitlesStoreDescriptors?.length === JSONTitlesStore?.length) {
        const filter1JSONInpsStore = JSONInpsStore.filter(JSONEl => typeof JSONEl === "object");
        const filter1JSONTitlesStore = JSONTitlesStore.filter(JSONEl => typeof JSONEl === "object");
        if (filter1JSONInpsStore?.length === JSONInpsStore?.length &&
            filter1JSONTitlesStore?.length === JSONTitlesStore?.length) {
            JSONInpsStore = filter1JSONInpsStore;
            JSONTitlesStore = filter1JSONTitlesStore;
            const filter2JSONInpsStore = JSONInpsStore.filter(JSONEl => JSONEl instanceof _classes__WEBPACK_IMPORTED_MODULE_1__.JSONStorager);
            const filter2JSONTitlesStore = JSONTitlesStore.filter(JSONEl => JSONEl instanceof _classes__WEBPACK_IMPORTED_MODULE_1__.JSONTitleStorager);
            if (filter2JSONInpsStore?.length === JSONInpsStore?.length &&
                filter1JSONTitlesStore?.length === JSONTitlesStore?.length) {
                JSONInpsStore = filter2JSONInpsStore.sort();
                JSONTitlesStore = filter2JSONTitlesStore.sort();
                let JSONInpsStoreStringified = [];
                let JSONTitlesStoreStringified = [];
                //stringificação das stores
                JSONInpsStore.forEach(formEl => {
                    const elValues = formEl.showAllInfo;
                    const elValuesStringified = JSON.stringify(elValues); //TODO DADOS EXPOSTO SOMENTE PARA FINS DE TESTE
                    JSONInpsStoreStringified.push(elValuesStringified);
                });
                JSONTitlesStore.forEach(formEl => {
                    const elValues = formEl.showInpTitle;
                    const elValuesStringified = JSON.stringify(elValues); //TODO DADOS EXPOSTO SOMENTE PARA FINS DE TESTE
                    JSONTitlesStoreStringified.push(elValuesStringified);
                });
                JSONInpsStoreStringified = JSONInpsStoreStringified.sort();
                JSONTitlesStoreStringified = JSONTitlesStoreStringified.sort();
                //conclusão
                return JSONInpsStore &&
                    JSONInpsStoreStringified &&
                    JSONTitlesStore &&
                    JSONTitlesStoreStringified
                    ? [
                        JSONInpsStore,
                        JSONInpsStoreStringified,
                        JSONTitlesStore,
                        JSONTitlesStoreStringified,
                    ] //stringfied é a versão usada
                    : [null, null, null, null];
            }
            else {
                console.warn(`Erro validando classes de elementos no JSONStore. 
          Número de instâncias obtidas para inputs: ${filter2JSONInpsStore.length ?? "undefined"}; Número esperado: ${JSONInpsStore.length ?? "undefined"};
          Número de instâncias obtidas para titles: ${filter2JSONTitlesStore.length ?? "undefined"}; Número esperado: ${JSONTitlesStore.length ?? "undefined"}`);
                return [null, null, null, null];
            }
        }
        else {
            console.warn(`Erro validando tipos de elementos nas JSONStore. 
        Número de objetos obtidos para inputs: ${filter1JSONInpsStore.length ?? "undefined"}; Número esperado: ${JSONInpsStore.length ?? "undefined"};
        Número de objetos obtidos para titles: ${filter1JSONTitlesStore.length ?? "undefined"}; Número esperado: ${JSONTitlesStore.length ?? "undefined"}`);
            return [null, null, null, null];
        }
    }
    else {
        console.warn(`Length de JSON Store Descriptors inválida. 
      Length obtida para inputs: ${JSONInpsStoreDescriptors.length ?? "undefined"}; Length esperada: ${JSONInpsStore.length ?? "undefined"};
      Length obtida para titles: ${JSONTitlesStoreDescriptors.length ?? "undefined"}; Length esperada: ${JSONTitlesStore.length ?? "undefined"}`);
        return [null, null, null, null];
    }
}
function createJSONAnchor(JSONBtn, formInpsDescriptor = [""]) {
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
    JSONLink.download = "formDataon";
    JSONBtn.replaceWith(JSONLink);
    return JSONLink;
}
function formatJSONFile(formInpsDescriptor = [""]) {
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
            while (inpId?.match(/,/g)) {
                const commaIndex = inpId.indexOf(",");
                inpId = inpId.slice(commaIndex + 1);
                if (!inpId?.match(/,/g) || loopAcc > 999)
                    break;
                loopAcc++;
            }
            const value = formInpsDescriptor[i].slice(lastSepIndex + 2, -1);
            const lab = mapIdsTitles[inpId.replaceAll(/"/g, "")];
            if (i === 89 && !inpId)
                //bug não resolvido ainda
                inpId = '"confirmLocId"';
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
function regenerateJSONBtn(JSONLink, formInpsDescriptor = [""]) {
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
/* harmony export */   checkAutoCorrect: () => (/* binding */ checkAutoCorrect),
/* harmony export */   correctCursorNextWords: () => (/* binding */ correctCursorNextWords),
/* harmony export */   filterIdsByGender: () => (/* binding */ filterIdsByGender),
/* harmony export */   fixCursorPosition: () => (/* binding */ fixCursorPosition),
/* harmony export */   fixFirstLetter: () => (/* binding */ fixFirstLetter),
/* harmony export */   fixForcedUpperCase: () => (/* binding */ fixForcedUpperCase),
/* harmony export */   fixNextWordsAfterD: () => (/* binding */ fixNextWordsAfterD),
/* harmony export */   fixNextWordsIniNotD: () => (/* binding */ fixNextWordsIniNotD),
/* harmony export */   fixUnproperUppercases: () => (/* binding */ fixUnproperUppercases),
/* harmony export */   fixWrongStarts: () => (/* binding */ fixWrongStarts),
/* harmony export */   fluxGen: () => (/* binding */ fluxGen),
/* harmony export */   generatePersonInstance: () => (/* binding */ generatePersonInstance),
/* harmony export */   hideGenFisAlin: () => (/* binding */ hideGenFisAlin),
/* harmony export */   hideStgTransHorm: () => (/* binding */ hideStgTransHorm),
/* harmony export */   moveCursorToTheEnd: () => (/* binding */ moveCursorToTheEnd),
/* harmony export */   normalizeNegatives: () => (/* binding */ normalizeNegatives),
/* harmony export */   numberLimit: () => (/* binding */ numberLimit),
/* harmony export */   parseNotNaN: () => (/* binding */ parseNotNaN),
/* harmony export */   removeFirstClick: () => (/* binding */ removeFirstClick),
/* harmony export */   showGenFisAlin: () => (/* binding */ showGenFisAlin),
/* harmony export */   showStgTransHorm: () => (/* binding */ showStgTransHorm),
/* harmony export */   switchAutocorrect: () => (/* binding */ switchAutocorrect),
/* harmony export */   wrongStartCorrection: () => (/* binding */ wrongStartCorrection)
/* harmony export */ });
/* harmony import */ var _gHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes */ "../global-scripts/src/classes.tsx");
/* harmony import */ var _errorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização




// import React from 'react';
function numberLimit(inpEl) {
    if (inpEl instanceof HTMLInputElement ||
        inpEl instanceof HTMLTextAreaElement ||
        inpEl instanceof HTMLSelectElement) {
        const isAtivFis = inpEl.classList.contains("inpAtivFis");
        const isAlimRot = inpEl.classList.contains("inpAlimRot");
        const isDDD = inpEl.classList.contains("inpDDD");
        const isFreq = inpEl.classList.contains("freqInpList");
        if ((isAtivFis ||
            isAlimRot ||
            inpEl.classList.contains("inpLocNum") ||
            isDDD ||
            isFreq) &&
            !inpEl.classList.contains("float")) {
            if (inpEl.value?.match(/[=.,;~/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]/g)) {
                const wrongMatchIndex = inpEl.value.indexOf(inpEl.value.match(/[=.,;~/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]/g)?.[0] ?? "");
                inpEl.value =
                    inpEl.value.slice(0, wrongMatchIndex ?? 0) +
                        inpEl.value.slice(wrongMatchIndex + 1 ?? 0);
            }
            if (parseInt(inpEl.value) < 1 && inpEl.id?.endsWith("Max")) {
                const inpValueArray = Array.from(inpEl.value);
                inpValueArray?.splice(0, 1, "1");
                inpEl.value = inpValueArray?.toString();
            }
            if ((isAtivFis || isAlimRot || isDDD || isFreq) &&
                inpEl.value?.length > 2)
                inpEl.value = inpEl.value.slice(0, 2);
        }
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(inpEl, `inpEl id ${inpEl?.id ?? "UNDEFINED ID"} in numberLimit`, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
}
function normalizeNegatives(tabInp) {
    let parsedInpValue = 0;
    if (tabInp instanceof HTMLInputElement) {
        parsedInpValue = parseFloat(tabInp.value);
        if (Number.isNaN(parsedInpValue) || parsedInpValue < 0) {
            parsedInpValue = 0;
        }
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(tabInp, "tabInp", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    return parsedInpValue.toString() ?? "";
}
function parseNotNaN(iniVal, def = 0, context = "int", fixed = 4) {
    let returnVal = 0;
    if (typeof iniVal === `string` &&
        typeof context === `string` &&
        typeof def === `number` &&
        typeof fixed === `number`) {
        switch (context) {
            case "int":
                returnVal = parseInt(iniVal, 10) || def;
                if (Number.isNaN(returnVal) || isNaN(returnVal))
                    returnVal = def;
                break;
            case "float":
                returnVal = parseFloat(parseFloat(iniVal).toFixed(fixed)) || def;
                if (Number.isNaN(returnVal) || isNaN(returnVal))
                    returnVal = def;
                break;
            default:
                _errorHandler__WEBPACK_IMPORTED_MODULE_2__.stringError("argumento de contexto", "context", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        }
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), `argumentos para parseNotNaN`, iniVal, context, def);
    return returnVal || 0;
}
//TODO VERSÃO REFATORADA AINDA EM PROGRESSO
// export function autoCapitalizeInputs(
//   textEl: entryEl,
//   isAutocorrectOn: boolean = true
// ): void {
//   let text = textEl?.value;
//   console.log(text);
//   console.log(isAutocorrectOn);
//   // if (
//   //   (textEl instanceof HTMLInputElement ||
//   //     textEl instanceof HTMLTextAreaElement) &&
//   //   typeof isAutocorrectOn === "boolean" &&
//   //   isAutocorrectOn === true &&
//   //   text
//   // ) {
//   //   const newWordMatches = text.match(
//   //     /\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g
//   //   );
//   //   const selection = window.getSelection();
//   //   const range = document.createRange();
//   //   let remadeText = text;
//   //   statement para diferenciar início do restante do input
//   //   if (text.length === 1 && !newWordMatches)
//   //     textEl.value =
//   //       fixFirstLetter(textEl, /\b\w/, range, selection, text[0]) ||
//   //       textEl.value ||
//   //       "ERROR";
//   //   else if (
//   //     (textEl.classList.contains("inpAst") ||
//   //       textEl.classList.contains("inpIdentif")) &&
//   //     text.length > 1
//   //   ) {
//   //     const wrongCharsRegexOp1 =
//   //       /[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]*/g;
//   //     const wrongCharsMatchesOp1 = text.match(wrongCharsRegexOp1);
//   //     const wrongCharsRegexOp2 =
//   //       /$[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
//   //     const wrongCharsMatchesOp2 = text.match(wrongCharsRegexOp2);
//   //     const wrongCharsRegexOp3 =
//   //       /(?<=\sdD)[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
//   //     const wrongCharsMatchesOp3 = text.match(wrongCharsRegexOp3);
//   //     const wrongStartMatch =
//   //       text
//   //         .match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/)
//   //         ?.toString() ?? "";
//   //     const letterMatchesIniD = text.match(/\sd/g);
//   //     const letterMatchesIniNotD = text.match(/\s[^d]/g);
//   //     let letterNotMatchesAfterD =
//   //       text.match(
//   //         /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g
//   //       ) ?? [];
//   //     const letterMatchesAfterDOp1 = text.match(
//   //       /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g
//   //     );
//   //     const letterMatchesAfterDOp2 = text.match(
//   //       /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g
//   //     );
//   //     const letterMatchesAfterDOp3 = text.match(
//   //       /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g
//   //     );
//   //     const multipleUppercasesMatches = text.match(
//   //       /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{2,}/g
//   //     );
//   //     let isUndoUppercase = false;
//   //     let isCursorAutoMoved = false;
//   //     if (
//   //       wrongCharsMatchesOp1 ||
//   //       wrongCharsMatchesOp2 ||
//   //       wrongCharsMatchesOp3
//   //     ) {
//   //       const wrongCharsMatches = [
//   //         ...(wrongCharsMatchesOp1 || []),
//   //         ...(wrongCharsMatchesOp2 || []),
//   //         ...(wrongCharsMatchesOp3 || []),
//   //       ];
//   //       for (let iW = 0; iW < wrongCharsMatches.length; iW++) {
//   //         wrongCharsMatches.forEach(wrongCharMatch => {
//   //           textEl.value =
//   //             fixWrongStarts(
//   //               text,
//   //               wrongCharMatch,
//   //               wrongCharsMatches[iW].length
//   //             ) ||
//   //             textEl.value ||
//   //             "ERROR";
//   //           [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
//   //             textEl,
//   //             wrongStartMatch,
//   //             isCursorAutoMoved,
//   //             isUndoUppercase
//   //           );
//   //         });
//   //       }
//   //     }
//   //     if (wrongStartMatch)
//   //       textEl.value =
//   //         wrongStartCorrection(textEl.value, wrongStartMatch) ||
//   //         textEl.value ||
//   //         "ERROR";
//   //     newWordMatches?.forEach(() => {
//   //       if (letterMatchesIniNotD && !letterMatchesIniD) {
//   //         letterMatchesIniNotD.forEach(letterMatch => {
//   //           remadeText = fixNextWordsIniNotD(remadeText, letterMatch);
//   //         });
//   //         textEl.value = remadeText || textEl.value || "ERROR";
//   //         [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
//   //           textEl,
//   //           wrongStartMatch,
//   //           isCursorAutoMoved,
//   //           isUndoUppercase
//   //         );
//   //         textEl.value =
//   //           wrongStartCorrection(textEl.value, wrongStartMatch) ||
//   //           textEl.value ||
//   //           "ERROR";
//   //       } else if (
//   //         (letterMatchesIniNotD && letterMatchesIniD) ||
//   //         (!letterMatchesIniNotD && letterMatchesIniD)
//   //       ) {
//   //         let letterMatchesAfterD: string[] = [];
//   //         if (
//   //           !letterNotMatchesAfterD &&
//   //           (letterMatchesAfterDOp1 ||
//   //             letterMatchesAfterDOp2 ||
//   //             letterMatchesAfterDOp3)
//   //         )
//   //           letterMatchesAfterD = [
//   //             ...(letterMatchesAfterDOp1 || []),
//   //             ...(letterMatchesAfterDOp2 || []),
//   //             ...(letterMatchesAfterDOp3 || []),
//   //           ];
//   //         else if (
//   //           letterNotMatchesAfterD &&
//   //           !(
//   //             letterMatchesAfterDOp1 ||
//   //             letterMatchesAfterDOp2 ||
//   //             letterMatchesAfterDOp3
//   //           )
//   //         )
//   //           if (letterNotMatchesAfterD && letterMatchesIniNotD)
//   //             letterMatchesAfterD = [...(letterMatchesIniNotD || [])];
//   //           else if (
//   //             letterNotMatchesAfterD &&
//   //             (letterMatchesAfterDOp1 ||
//   //               letterMatchesAfterDOp2 ||
//   //               letterMatchesAfterDOp3 ||
//   //               letterMatchesIniNotD)
//   //           )
//   //             letterMatchesAfterD = [
//   //               ...(letterMatchesAfterDOp1 || []),
//   //               ...(letterMatchesAfterDOp2 || []),
//   //               ...(letterMatchesAfterDOp3 || []),
//   //             ];
//   //         letterMatchesAfterD?.forEach(letterMatchD => {
//   //           remadeText = fixNextWordsAfterD(remadeText, letterMatchD);
//   //         });
//   //         textEl.value = remadeText || textEl.value || "ERROR";
//   //         for (
//   //           let iD = 0;
//   //           iD < Array.from(letterMatchesAfterD ?? []).length;
//   //           iD++
//   //         ) {
//   //           const filteredArrayD = letterMatchesAfterD?.filter(iD =>
//   //             new RegExp(/[a-záàâäãéèêëíìîïóòôöõúùûü]/g).test(iD)
//   //           );
//   //           if (filteredArrayD) {
//   //             const mappedArrayD = filteredArrayD.map(iD => iD.toUpperCase());
//   //             let remadeStringD = "";
//   //             if (iD === 0) {
//   //               filteredArrayD.splice(iD, 1, mappedArrayD[0]);
//   //               remadeStringD = filteredArrayD.toString().replaceAll(",", "");
//   //               [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
//   //                 textEl,
//   //                 wrongStartMatch,
//   //                 isCursorAutoMoved,
//   //                 isUndoUppercase
//   //               );
//   //             } else if (iD === 1) {
//   //               filteredArrayD.splice(iD, 1, mappedArrayD[1]);
//   //               remadeStringD = filteredArrayD
//   //                 .toString()
//   //                 .replaceAll(",", "")
//   //                 .slice(2);
//   //               [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
//   //                 textEl,
//   //                 wrongStartMatch,
//   //                 isCursorAutoMoved,
//   //                 isUndoUppercase
//   //               );
//   //               textEl.value =
//   //                 textEl.value.replace(
//   //                   new RegExp(filteredArrayD[iD], "g"),
//   //                   remadeStringD
//   //                 ) ||
//   //                 textEl.value ||
//   //                 "ERROR";
//   //             } else if (iD > 2) {
//   //               filteredArrayD.pop();
//   //               filteredArrayD.push(mappedArrayD[iD]);
//   //               [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
//   //                 textEl,
//   //                 wrongStartMatch,
//   //                 isCursorAutoMoved,
//   //                 isUndoUppercase
//   //               );
//   //             }
//   //           }
//   //         }
//   //       }
//   //     });
//   //     statement para correção de múltiplos upper cases
//   //     if (
//   //       multipleUppercasesMatches ||
//   //       text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][S]\s/g)
//   //     ) {
//   //       unproper upper cases with no D
//   //       [
//   //         ...multipleUppercasesMatches!,
//   //         ...(text.match(
//   //           /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g
//   //         ) || []),
//   //         ...(text.match(
//   //           /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g
//   //         ) || []),
//   //         ...(text.match(
//   //           /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g
//   //         ) || []),
//   //         ...(text.match(
//   //           /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g
//   //         ) || []),
//   //         ...(text.match(
//   //           /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g
//   //         ) || []),
//   //         ...(text.match(
//   //           /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g
//   //         ) || []),
//   //       ].forEach(multUppercasesMatchNoD => {
//   //         if (multUppercasesMatchNoD) {
//   //           text = fixUnproperUppercases(text, multUppercasesMatchNoD, "NoD");
//   //           correção de bugs com combinações posteriores de upper/lower
//   //           const upperlowercomb = text.match(
//   //             /[a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g
//   //           );
//   //           const upperlowercombD = text.match(
//   //             /D[a-záàâäãéèêëíìîïóòôöõúùûü][\s]/
//   //           );
//   //           if (upperlowercomb || upperlowercombD) {
//   //             repeatedLetter = repeatedLetter.toLowerCase();
//   //           }
//   //           fix para delay em processamento do S em conjunções
//   //           text
//   //             .match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][S][\s]/)
//   //             ?.splice(3, 1, "s");
//   //           textEl.value = text || textEl.value || "ERROR";
//   //           isUndoUppercase = true;
//   //           [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
//   //             textEl,
//   //             wrongStartMatch,
//   //             isCursorAutoMoved,
//   //             isUndoUppercase
//   //           );
//   //           if (range.endOffset >= 1)
//   //             fixCursorPosition(textEl, range, selection, true);
//   //         }
//   //       });
//   //       unproper upper cases with D
//   //       [
//   //         ...(text.match(/D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g) || []),
//   //         ...(text.match(/D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g) || []),
//   //         ...(text.match(
//   //           /D[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]\s/g
//   //         ) || []),
//   //       ].forEach(multUppercasesMatchD => {
//   //         if (multUppercasesMatchD) {
//   //           textEl.value =
//   //             fixUnproperUppercases(text, multUppercasesMatchD, "YesDVal") ||
//   //             textEl.value ||
//   //             "ERROR";
//   //           isUndoUppercase = true;
//   //           [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
//   //             textEl,
//   //             wrongStartMatch,
//   //             isCursorAutoMoved,
//   //             isUndoUppercase
//   //           );
//   //           if (range.endOffset >= 1)
//   //             fixCursorPosition(textEl, range, selection, true);
//   //         }
//   //       });
//   //     }
//   //     if (
//   //       letterMatchesIniD &&
//   //       letterNotMatchesAfterD &&
//   //       !(
//   //         letterMatchesAfterDOp1 ||
//   //         letterMatchesAfterDOp2 ||
//   //         letterMatchesAfterDOp3
//   //       )
//   //     )
//   //       letterNotMatchesAfterD = [];
//   //     statement para correção de múltiplos upper cases forçados indevidamente e para fluxo validando match de iniciais
//   //     if (letterMatchesIniD || letterMatchesIniNotD) {
//   //       forçar upper case
//   //       const DMatch = [
//   //         ...(letterMatchesAfterDOp1 || []),
//   //         ...(letterMatchesAfterDOp2 || []),
//   //         ...(letterMatchesAfterDOp3 || []),
//   //       ];
//   //       const wordMatch = [
//   //         ...(DMatch?.flat(1) ?? []),
//   //         ...(letterMatchesIniNotD || []),
//   //       ];
//   //       for (let iM = 0; iM < wordMatch.length; iM++) {
//   //         if (new RegExp(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/).test(wordMatch[iM]))
//   //           continue;
//   //         textEl.value =
//   //           fixForcedUpperCase(textEl, wordMatch, wordMatch[iM]) ||
//   //           textEl.value ||
//   //           "ERROR";
//   //         if (DMatch.flat(1).length > 0)
//   //           [textEl.value, isCursorAutoMoved] = correctCursorNextWords(
//   //             textEl,
//   //             wrongStartMatch,
//   //             isCursorAutoMoved,
//   //             isUndoUppercase
//   //           );
//   //       }
//   //     }
//   //     correções adicionais no final da edição automática
//   //     if (wrongCharsMatchesOp1)
//   //       textEl.value =
//   //         textEl.value?.replaceAll(wrongCharsRegexOp1, "") ||
//   //         textEl.value ||
//   //         "ERROR";
//   //     if (wrongCharsMatchesOp2)
//   //       textEl.value =
//   //         textEl.value?.replaceAll(wrongCharsRegexOp2, "") ||
//   //         textEl.value ||
//   //         "ERROR";
//   //     if (wrongCharsMatchesOp3)
//   //       textEl.value =
//   //         textEl.value?.replaceAll(wrongCharsRegexOp3, "") ||
//   //         textEl.value ||
//   //         "ERROR";
//   //     if (text.match(/\s[\s]+/g))
//   //       textEl.value =
//   //         textEl.value?.replaceAll(/\s[\s]+/g, " ") || textEl.value || "ERROR";
//   //     if (text.match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]/))
//   //       textEl.value =
//   //         text.slice(0, 1).toUpperCase() + text.slice(1) ||
//   //         textEl.value ||
//   //         "ERROR";
//   //   }
//   // }
// }
// export function fixFirstLetter(
//   textEl: targEl,
//   regex: RegExp,
//   range: Range,
//   sel: Selection | voidVal,
//   fstLet: string = "",
//   shouldSetEnd: boolean = false
// ): string {
//   let contText = (textEl as entryEl)?.value || textEl?.textContent || "";
//   if (
//     textEl instanceof Element &&
//     regex instanceof RegExp &&
//     range instanceof Range &&
//     typeof fstLet === "string" &&
//     typeof shouldSetEnd === "boolean" &&
//     fstLet?.match(regex)
//   ) {
//     contText = fstLet.toUpperCase() + contText?.substring(1)?.toLowerCase();
//     if (range.endOffset >= 1)
//       fixCursorPosition(textEl, range, sel, shouldSetEnd);
//   } else
//     ErrorHandler.multipleElementsNotFound(
//       extLine(new Error()),
//       "arguments for fixFirstLetter()",
//       textEl,
//       `${JSON.stringify(regex) || null}`,
//       `${JSON.stringify(range)}` || null,
//       fstLet,
//       shouldSetEnd
//     );
//   return contText ?? "";
// }
// export function fixCursorPosition(
//   textEl: targEl,
//   range: Range,
//   sel: Selection | voidVal,
//   shouldSetEnd: boolean = false
// ): void {
//   if (
//     textEl instanceof Element &&
//     range instanceof Range &&
//     typeof shouldSetEnd === "boolean"
//   ) {
//     range.setStart(textEl, 0);
//     if (shouldSetEnd === true) range.setEnd(textEl, 1);
//     range.collapse(true);
//     sel?.removeAllRanges();
//     sel?.addRange(range);
//   } else
//     ErrorHandler.multipleElementsNotFound(
//       extLine(new Error()),
//       "argumentos for fixCursorPosition()",
//       textEl,
//       `${JSON.stringify(range)}` || null,
//       shouldSetEnd
//     );
// }
// export function fixWrongStarts(
//   text: targStr,
//   match: targStr,
//   length: targNum = 2
// ): string {
//   if (
//     typeof text === "string" &&
//     typeof match === "string" &&
//     typeof length === "number"
//   ) {
//     const arrText = Array.from(text);
//     arrText.splice(text.indexOf(match), length ?? 0, "");
//     text = arrText?.toString().replaceAll(",", "") ?? "";
//   } else
//     ErrorHandler.multipleElementsNotFound(
//       extLine(new Error()),
//       "argumentos for fixWrongStarts()",
//       text,
//       match,
//       length
//     );
//   return text ?? "";
// }
// export function correctCursorNextWords(
//   textEl: targEl,
//   match: string,
//   isCursorAutoMoved: boolean = false,
//   isUndoUppercase: boolean = false
// ): [string, boolean] {
//   let text = (textEl as textEl)?.value || textEl?.textContent || "";
//   if (
//     textEl instanceof HTMLElement &&
//     typeof match === "string" &&
//     typeof isCursorAutoMoved === "boolean" &&
//     typeof isUndoUppercase === "boolean"
//   ) {
//     text = wrongStartCorrection(text, match);
//     textEl.addEventListener("keyup", fixmove => {
//       const keyboardEvent = fixmove as KeyboardEvent;
//       if (
//         (window.getSelection()?.getRangeAt(0).startOffset === 0 ||
//           window.getSelection()?.getRangeAt(0).startOffset === text?.length ||
//           0) &&
//         (keyboardEvent.key === " " ||
//           keyboardEvent.key === "Backspace" ||
//           (keyboardEvent.key >= "ArrowLeft" &&
//             keyboardEvent.key <= "ArrowDown") ||
//           (keyboardEvent.key >= "a" && keyboardEvent.key <= "z") ||
//           (keyboardEvent.key >= "A" && keyboardEvent.key <= "Z") ||
//           isUndoUppercase)
//       ) {
//         isCursorAutoMoved = moveCursorToTheEnd(textEl, isCursorAutoMoved);
//         keyboardEvent.preventDefault();
//       }
//     });
//   } else
//     ErrorHandler.multipleElementsNotFound(
//       extLine(new Error()),
//       "arguments for correctCursorNextWords()",
//       textEl,
//       match,
//       isCursorAutoMoved,
//       isUndoUppercase
//     );
//   return [text ?? "", isCursorAutoMoved ?? false];
// }
// export function wrongStartCorrection(
//   text: string,
//   wrongStartMatch: string
// ): string {
//   typeof text === "string" && typeof wrongStartMatch === "string"
//     ? (text =
//         text.slice(wrongStartMatch.replaceAll(",", "").length - 1) +
//         text.slice(0, wrongStartMatch.replaceAll(",", "").length - 1))
//     : ErrorHandler.multipleElementsNotFound(
//         extLine(new Error()),
//         "arguments for wrongStartCorrection()",
//         text,
//         wrongStartMatch
//       );
//   return text ?? "";
// }
// export function fixNextWordsIniNotD(
//   remadeText: string,
//   letMatch: string
// ): string {
//   if (typeof remadeText === "string" && typeof letMatch === "string") {
//     const gLetMatchI = remadeText.lastIndexOf(letMatch) + 1;
//     const arrText = Array.from(remadeText);
//     arrText[gLetMatchI] = remadeText.charAt(gLetMatchI)?.toUpperCase();
//     remadeText = arrText.toString()?.replaceAll(",", "");
//     if (remadeText.match(/^\s[\w]+/g))
//       remadeText = remadeText.slice(1, remadeText.length) + " ";
//   } else
//     ErrorHandler.multipleElementsNotFound(
//       extLine(new Error()),
//       "arguments for fixNetWordsIniNotD()",
//       remadeText,
//       letMatch
//     );
//   return remadeText ?? "";
// }
// export function fixNextWordsAfterD(
//   remadeText: string,
//   letMatch: string
// ): string {
//   if (typeof remadeText === "string" && typeof letMatch === "string") {
//     const globalLetterMatchIndexD = remadeText?.lastIndexOf(letMatch) + 1;
//     const capitalizedCharD = remadeText
//       ?.charAt(globalLetterMatchIndexD)
//       ?.toUpperCase();
//     if (capitalizedCharD) {
//       const arrTextD = Array.from(remadeText);
//       arrTextD[globalLetterMatchIndexD] = capitalizedCharD;
//       remadeText = arrTextD.toString().replaceAll(",", "");
//     }
//   } else
//     ErrorHandler.multipleElementsNotFound(
//       extLine(new Error()),
//       "arguments for fixNextWordsAfterD()",
//       remadeText,
//       letMatch
//     );
//   return remadeText ?? "";
// }
// export function fixUnproperUppercases(
//   text: string,
//   match: string,
//   context: looseNum = 0
// ): string {
//   if (
//     typeof text === "string" &&
//     typeof match === "string" &&
//     (typeof context === "string" || typeof context === "number")
//   ) {
//     const spaceMatches = text.match(/\s/g);
//     const upperCasesRepetitionsIndex = text.indexOf(match);
//     const repeatedLetter = match.slice(0, 1);
//     const textBeforeRepetitions = text.substring(0, upperCasesRepetitionsIndex);
//     let addAcumulator = 0;
//     let loweredRepetitions = match.toLowerCase().slice(1);
//     if (spaceMatches) {
//       if (
//         context === "NoD" ||
//         context === "YesDCont" ||
//         context === 0 ||
//         context === 2 ||
//         !context
//       ) {
//         if (context === "YesDCont" || context === 2) {
//           const lowercasesMatches = text.match(/[a-záàâäãéèêëíìîïóòôöõúùûü]/g);
//           if (lowercasesMatches) {
//             const numLowercases = lowercasesMatches.length;
//             addAcumulator += numLowercases;
//           }
//         }
//         addAcumulator += spaceMatches.length;
//       } else if (context === "YesDVal" || context === 1) addAcumulator = 1;
//       else console.error(`Context value not suitable`);
//     }
//     const textAfterRepetitions = text.slice(
//       upperCasesRepetitionsIndex +
//         1 +
//         loweredRepetitions.length -
//         addAcumulator,
//       text.length + 1
//     );
//     Array.from(text)?.splice(
//       upperCasesRepetitionsIndex + 1,
//       loweredRepetitions.length,
//       loweredRepetitions
//     );
//     if (context === "NoD" || context === 0 || !context)
//       text =
//         textBeforeRepetitions +
//         repeatedLetter +
//         loweredRepetitions +
//         textAfterRepetitions;
//     else if (context === "YesDVal") {
//       const upperlowercombD = text.match(
//         /D[a-záàâäãéèêëíìîïóòôöõúùûü][sS]?[\s]/
//       );
//       if (upperlowercombD?.length === 4)
//         loweredRepetitions += upperlowercombD.toString().replace(/S/, "s");
//       text = textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
//     } else if (context === "YesDCont") {
//       text = text.match(
//         /D[aeiouáàâäãéèêëíìîïóòôöõúùûü][s]\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{3,}/
//       )
//         ? textBeforeRepetitions +
//           loweredRepetitions +
//           "S" +
//           textAfterRepetitions
//         : textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
//     } else console.error(`Context value not suitable`);
//   } else
//     ErrorHandler.multipleElementsNotFound(
//       extLine(new Error()),
//       "argumentos for fixUnproperUppercases()",
//       text,
//       match,
//       context
//     );
//   return text ?? "";
// }
// export function fixForcedUpperCase(
//   textEl: targEl,
//   wordMatch: string[],
//   wMatchIteration: RegExpMatchArray | string
// ): string {
//   let text = (textEl as textEl)?.value || textEl?.textContent || "";
//   if (
//     textEl instanceof Element &&
//     wordMatch?.every(match => typeof match === "string") &&
//     ((Array.isArray(wMatchIteration) &&
//       wMatchIteration?.every(iter => typeof iter === "string")) ||
//       typeof wMatchIteration === "string")
//   ) {
//     const strDlowercase = wMatchIteration.toString();
//     const DUppercased = strDlowercase.charAt(1).toUpperCase();
//     if (DUppercased) {
//       const strDAfterMinusInd =
//         (text.length ?? 0) -
//         (
//           strDlowercase.substring(0, 1) +
//           DUppercased +
//           strDlowercase.substring(2)
//         )?.length;
//       const oppositeSlicedCite = text.slice(strDAfterMinusInd ?? 0);
//       const startSlicedCite = text.slice(0, strDAfterMinusInd ?? 1);
//       if (wordMatch.length >= 1 && startSlicedCite)
//         text = startSlicedCite + oppositeSlicedCite;
//     }
//   }
//   return text ?? "";
// }
// export function autoCapitalizeCite(
//   editableCite: targEl,
//   isAutocorrectOn: boolean = true
// ): void {
//   const citeText = editableCite?.textContent;
//   if (
//     editableCite instanceof HTMLElement &&
//     typeof isAutocorrectOn === "boolean" &&
//     isAutocorrectOn === true &&
//     citeText
//   ) {
//     //inicialização de expressões regex com seus objetos e matches associados
//     const newWordMatches = citeText.match(
//       /\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g
//     );
//     const selection = window.getSelection();
//     const range = document.createRange();
//     let remadeCiteText = citeText;
//     //statement para diferenciar início do restante do input
//     if (citeText.length === 1 && !newWordMatches)
//       editableCite.textContent = fixFirstLetter(
//         editableCite,
//         /\b\w/,
//         range,
//         selection,
//         citeText[0],
//         true
//       );
//     else if (citeText.length > 1) {
//       const wrongStartMatch =
//         citeText
//           .match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/)
//           ?.toString() ?? "";
//       const wrongCharsRegexOp1 =
//         /[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]*/g;
//       const wrongCharsMatchesOp1 = citeText.match(wrongCharsRegexOp1);
//       const wrongCharsRegexOp2 =
//         /$[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
//       const wrongCharsMatchesOp2 = citeText.match(wrongCharsRegexOp2);
//       const wrongCharsRegexOp3 =
//         /(?<=\sdD)[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
//       const wrongCharsMatchesOp3 = citeText.match(wrongCharsRegexOp3);
//       const letterMatchesIniD = citeText.match(/\sd/g);
//       const letterMatchesIniNotD = citeText.match(/\s[^d]/g);
//       let letterNotMatchesAfterD =
//         citeText.match(
//           /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g
//         ) ?? [];
//       const letterMatchesAfterDOp1 = citeText.match(
//         /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g
//       );
//       const letterMatchesAfterDOp2 = citeText.match(
//         /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g
//       );
//       const letterMatchesAfterDOp3 = citeText.match(
//         /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g
//       );
//       const multipleUppercasesMatches = citeText.match(
//         /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{2,}/g
//       );
//       let isCursorAutoMoved = false;
//       let isAlertMade = false;
//       let isSpanActive = false;
//       let isUndoUppercase = false;
//       if (
//         wrongCharsMatchesOp1 ||
//         wrongCharsMatchesOp2 ||
//         wrongCharsMatchesOp3
//       ) {
//         const wrongCharsMatches = [
//           ...(wrongCharsMatchesOp1 || []),
//           ...(wrongCharsMatchesOp2 || []),
//           ...(wrongCharsMatchesOp3 || []),
//         ];
//         for (let iW = 0; iW < wrongCharsMatches.length; iW++) {
//           wrongCharsMatches.forEach(wrongCharMatch => {
//             editableCite.textContent = fixWrongStarts(
//               citeText,
//               wrongCharMatch,
//               wrongCharsMatches[iW].length
//             );
//             [editableCite.textContent, isCursorAutoMoved] =
//               correctCursorNextWords(
//                 editableCite,
//                 wrongStartMatch,
//                 isCursorAutoMoved,
//                 isUndoUppercase
//               );
//             isCursorAutoMoved = moveCursorToTheEnd(
//               editableCite,
//               isCursorAutoMoved
//             );
//             [isSpanActive, isAlertMade] = createSpanAlert(
//               isSpanActive,
//               isAlertMade
//             );
//           });
//         }
//       }
//       if (wrongStartMatch)
//         editableCite.textContent = wrongStartCorrection(
//           editableCite.textContent ?? "",
//           wrongStartMatch
//         );
//       newWordMatches?.forEach(() => {
//         //bloco para capitalizar palavras após a primeira palavra
//         if (letterMatchesIniNotD && !letterMatchesIniD) {
//           letterMatchesIniNotD.forEach(letterMatch => {
//             remadeCiteText = fixNextWordsIniNotD(remadeCiteText, letterMatch);
//           });
//           editableCite.textContent = remadeCiteText;
//           isCursorAutoMoved = moveCursorToTheEnd(
//             editableCite,
//             isCursorAutoMoved
//           );
//           [editableCite.textContent, isCursorAutoMoved] =
//             correctCursorNextWords(
//               editableCite,
//               wrongStartMatch,
//               isCursorAutoMoved,
//               isUndoUppercase
//             );
//           editableCite.textContent = wrongStartCorrection(
//             editableCite.textContent,
//             wrongStartMatch
//           );
//         } else if (
//           (letterMatchesIniNotD && letterMatchesIniD) ||
//           (!letterMatchesIniNotD && letterMatchesIniD)
//         ) {
//           //correção focada em conjunção com D
//           let letterMatchesAfterD: string[] = [];
//           if (
//             !letterNotMatchesAfterD &&
//             (letterMatchesAfterDOp1 ||
//               letterMatchesAfterDOp2 ||
//               letterMatchesAfterDOp3)
//           )
//             letterMatchesAfterD = [
//               ...(letterMatchesAfterDOp1 || []),
//               ...(letterMatchesAfterDOp2 || []),
//               ...(letterMatchesAfterDOp3 || []),
//             ];
//           else if (
//             letterNotMatchesAfterD &&
//             !(
//               letterMatchesAfterDOp1 ||
//               letterMatchesAfterDOp2 ||
//               letterMatchesAfterDOp3
//             )
//           )
//             if (letterNotMatchesAfterD && letterMatchesIniNotD)
//               letterMatchesAfterD = [...(letterMatchesIniNotD || [])];
//             else if (
//               letterNotMatchesAfterD &&
//               (letterMatchesAfterDOp1 ||
//                 letterMatchesAfterDOp2 ||
//                 letterMatchesAfterDOp3 ||
//                 letterMatchesIniNotD)
//             )
//               letterMatchesAfterD = [
//                 ...(letterMatchesAfterDOp1 || []),
//                 ...(letterMatchesAfterDOp2 || []),
//                 ...(letterMatchesAfterDOp3 || []),
//               ];
//           //capitalização focada em iniciais D
//           letterMatchesAfterD?.forEach(letterMatchD => {
//             remadeCiteText = fixNextWordsAfterD(remadeCiteText, letterMatchD);
//           });
//           editableCite.textContent = remadeCiteText;
//           for (
//             let iD = 0;
//             iD < Array.from(letterMatchesAfterD ?? []).length;
//             iD++
//           ) {
//             const filteredArrayD = letterMatchesAfterD?.filter(iD =>
//               new RegExp(/[a-záàâäãéèêëíìîïóòôöõúùûü]/g).test(iD)
//             );
//             if (filteredArrayD) {
//               const mappedArrayD = filteredArrayD.map(iD => iD.toUpperCase());
//               let remadeStringD = "";
//               if (iD === 0) {
//                 [isSpanActive, isAlertMade] = createSpanAlert(
//                   isSpanActive,
//                   isAlertMade
//                 );
//                 filteredArrayD.splice(iD, 1, mappedArrayD[0]);
//                 remadeStringD = filteredArrayD.toString().replaceAll(",", "");
//                 [editableCite.textContent, isCursorAutoMoved] =
//                   correctCursorNextWords(
//                     editableCite,
//                     wrongStartMatch,
//                     isCursorAutoMoved,
//                     isUndoUppercase
//                   );
//               } else if (iD === 1) {
//                 [isSpanActive, isAlertMade] = createSpanAlert(
//                   isSpanActive,
//                   isAlertMade
//                 );
//                 filteredArrayD.splice(iD, 1, mappedArrayD[1]);
//                 remadeStringD = filteredArrayD
//                   .toString()
//                   .replaceAll(",", "")
//                   .slice(2);
//                 [editableCite.textContent, isCursorAutoMoved] =
//                   correctCursorNextWords(
//                     editableCite,
//                     wrongStartMatch,
//                     isCursorAutoMoved,
//                     isUndoUppercase
//                   );
//                 editableCite.textContent = editableCite.textContent.replace(
//                   new RegExp(filteredArrayD[iD], "g"),
//                   remadeStringD
//                 );
//               } else if (iD > 2) {
//                 filteredArrayD.pop();
//                 filteredArrayD.push(mappedArrayD[iD]);
//                 [editableCite.textContent, isCursorAutoMoved] =
//                   correctCursorNextWords(
//                     editableCite,
//                     wrongStartMatch,
//                     isCursorAutoMoved,
//                     isUndoUppercase
//                   );
//               }
//             }
//           }
//         }
//       });
//       if (multipleUppercasesMatches) {
//         [
//           ...multipleUppercasesMatches,
//           ...(citeText.match(
//             /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g
//           ) || []),
//           ...(citeText.match(
//             /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g
//           ) || []),
//           ...(citeText.match(
//             /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g
//           ) || []),
//           ...(citeText.match(
//             /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g
//           ) || []),
//           ...(citeText.match(
//             /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g
//           ) || []),
//           ...(citeText.match(
//             /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g
//           ) || []),
//         ].forEach(multUppercasesMatchNotD => {
//           if (multUppercasesMatchNotD) {
//             editableCite.textContent = fixUnproperUppercases(
//               citeText,
//               multUppercasesMatchNotD,
//               "NoD"
//             );
//             isUndoUppercase = true;
//             [editableCite.textContent, isCursorAutoMoved] =
//               correctCursorNextWords(
//                 editableCite,
//                 wrongStartMatch,
//                 isCursorAutoMoved,
//                 isUndoUppercase
//               );
//             isCursorAutoMoved = moveCursorToTheEnd(
//               editableCite,
//               isCursorAutoMoved
//             );
//             [isSpanActive, isAlertMade] = createSpanAlert(
//               isSpanActive,
//               isAlertMade
//             );
//           }
//         });
//         [
//           ...(citeText.match(/D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g) || []),
//           ...(citeText.match(/D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g) || []),
//           ...(citeText.match(
//             /D[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]\s/g
//           ) || []),
//         ].forEach(multUppercasesMatchD => {
//           if (multUppercasesMatchD) {
//             editableCite.textContent = fixUnproperUppercases(
//               citeText,
//               multUppercasesMatchD,
//               "YesDCont"
//             );
//             isUndoUppercase = true;
//             [editableCite.textContent, isCursorAutoMoved] =
//               correctCursorNextWords(
//                 editableCite,
//                 wrongStartMatch,
//                 isCursorAutoMoved,
//                 isUndoUppercase
//               );
//             isCursorAutoMoved = moveCursorToTheEnd(
//               editableCite,
//               isCursorAutoMoved
//             );
//             [isSpanActive, isAlertMade] = createSpanAlert(
//               isSpanActive,
//               isAlertMade
//             );
//           }
//         });
//       }
//       if (
//         letterMatchesIniD &&
//         letterNotMatchesAfterD &&
//         !(
//           letterMatchesAfterDOp1 ||
//           letterMatchesAfterDOp2 ||
//           letterMatchesAfterDOp3
//         )
//       )
//         letterNotMatchesAfterD = [];
//       //statement para correção de múltiplos upper cases forçados indevidamente
//       if (letterMatchesIniD || letterMatchesIniNotD) {
//         //forçar upper case
//         const DMatch = [
//           ...(letterMatchesAfterDOp1 || []),
//           ...(letterMatchesAfterDOp2 || []),
//           ...(letterMatchesAfterDOp3 || []),
//         ];
//         const wordMatch = [
//           ...(DMatch?.flat(1) ?? []),
//           ...(letterMatchesIniNotD || []),
//         ];
//         for (let iM = 0; iM < wordMatch.length; iM++) {
//           if (new RegExp(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/).test(wordMatch[iM]))
//             continue;
//           editableCite.textContent = fixForcedUpperCase(
//             editableCite,
//             wordMatch,
//             wordMatch[iM]
//           );
//           if (DMatch.flat(1).length > 0) {
//             [editableCite.textContent, isCursorAutoMoved] =
//               correctCursorNextWords(
//                 editableCite,
//                 wrongStartMatch,
//                 isCursorAutoMoved,
//                 isUndoUppercase
//               );
//             [isSpanActive, isAlertMade] = createSpanAlert(
//               isSpanActive,
//               isAlertMade
//             );
//           }
//         }
//       }
//       if (wrongCharsMatchesOp1) {
//         editableCite.textContent =
//           editableCite.textContent?.replaceAll(wrongCharsRegexOp1, "") ??
//           (editableCite.textContent || "ERROR");
//         isCursorAutoMoved = moveCursorToTheEnd(editableCite, isCursorAutoMoved);
//       }
//       if (wrongCharsMatchesOp2) {
//         editableCite.textContent =
//           editableCite.textContent?.replaceAll(wrongCharsRegexOp2, "") ??
//           (editableCite.textContent || "ERROR");
//         isCursorAutoMoved = moveCursorToTheEnd(editableCite, isCursorAutoMoved);
//       }
//       if (wrongCharsMatchesOp3) {
//         editableCite.textContent =
//           editableCite.textContent?.replaceAll(wrongCharsRegexOp3, "") ??
//           (editableCite.textContent || "ERROR");
//         isCursorAutoMoved = moveCursorToTheEnd(editableCite, isCursorAutoMoved);
//       }
//       if (editableCite.textContent?.match(/\s[\s]+/g)) {
//         editableCite.textContent =
//           editableCite.textContent?.replaceAll(/\s[\s]+/g, " ") ??
//           (editableCite.textContent || "ERROR");
//         isCursorAutoMoved = moveCursorToTheEnd(editableCite, isCursorAutoMoved);
//       }
//     }
//   }
//   function createSpanAlert(
//     isSpanActive: boolean = false,
//     isAlertMade: boolean = false
//   ): [boolean, boolean] {
//     if (
//       editableCite instanceof HTMLElement &&
//       editableCite.nextElementSibling
//     ) {
//       const nextCiteElementSibling = editableCite.nextElementSibling?.id;
//       if (nextCiteElementSibling === "deactAutocorrectBtn" && !isSpanActive) {
//         const cursorResetAlert = document.createElement("span");
//         if (!isAlertMade) {
//           cursorResetAlert.textContent = "Cursor resetado! Aperte alguma tecla";
//           isAlertMade = true;
//         }
//         editableCite.parentNode?.insertBefore(
//           cursorResetAlert,
//           editableCite.nextSibling
//         );
//         Object.assign(cursorResetAlert, {
//           class: "briefAlert",
//           id: "briefAlertCite",
//           style: {
//             "border-color": "white",
//             opacity: "1",
//             "font-size": "8px",
//           },
//         });
//         editableCite.style.setProperty(
//           "border-color",
//           "rgba(255, 165, 0, 0.9)"
//         ); //alertar usuário da mudança de cursor devido à reconstrução do textContent editável
//         isSpanActive = true;
//         setTimeout(() => {
//           const rgbaMatch = window
//             .getComputedStyle(editableCite)
//             ?.getPropertyValue("border-color")
//             ?.match(/rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/);
//           if (rgbaMatch) {
//             const reduceOpacity = setInterval(() => {
//               let strUpdatedAlpha = rgbaMatch.pop()?.toString(); //faz a retirada inicial
//               const firstSliceStrRgba = rgbaMatch
//                 .toString()
//                 .replaceAll(/,\d+.?\d*.?\d*/g, "")
//                 .slice(0, 18);
//               let strNewOpacityValue =
//                 firstSliceStrRgba + " " + strUpdatedAlpha + ")";
//               if (strUpdatedAlpha && strUpdatedAlpha <= "0.05") {
//                 strUpdatedAlpha = "0";
//                 strNewOpacityValue = firstSliceStrRgba + "0)";
//                 cursorResetAlert.remove();
//                 clearInterval(reduceOpacity);
//               }
//               editableCite.style.setProperty(
//                 "border-color",
//                 strNewOpacityValue
//               );
//             }, 100);
//           }
//         }, 500);
//       } else if (nextCiteElementSibling === "briefAlertCite" || isSpanActive) {
//         //algum efeito visual
//       }
//     } else
//       ErrorHandler.multipleElementsNotFound(
//         extLine(new Error()),
//         "arguments for createSpanAlert",
//         editableCite,
//         editableCite?.nextElementSibling
//       );
//     return [isSpanActive, isAlertMade];
//   }
// }
// export function moveCursorToTheEnd(
//   textEl: targEl,
//   isCursorAutoMoved: boolean = false
// ): boolean {
//   if (textEl instanceof Element) {
//     if (window.getSelection && !isCursorAutoMoved) {
//       const range = document.createRange();
//       range.selectNodeContents(textEl);
//       range.collapse(false);
//       const sel = window.getSelection();
//       sel?.removeAllRanges();
//       sel?.addRange(range);
//       isCursorAutoMoved = true;
//     } else isCursorAutoMoved = false;
//   } else
//     ErrorHandler.elementNotFound(
//       textEl,
//       "arguments for moveCursorToTheEnd()",
//       extLine(new Error())
//     );
//   return isCursorAutoMoved ?? false;
// }
function correctCursorNextWords(isCursorAutoMoved = false, isUndoUppercase = false, match = "", textElement) {
    let text = textElement.value || textElement.textContent || null;
    let isFixAfterDCursorExec = false;
    if (isFixAfterDCursorExec)
        return;
    const selectionPosition = window.getSelection()?.getRangeAt(0).startOffset;
    text = wrongStartCorrection(text, match);
    textElement.addEventListener("keyup", fixmove => {
        const keyboardEvent = fixmove;
        if (selectionPosition === 0 || selectionPosition === text?.length || 0) {
            if (keyboardEvent.key === " " ||
                keyboardEvent.key === "Backspace" ||
                (keyboardEvent.key >= "ArrowLeft" &&
                    keyboardEvent.key <= "ArrowDown") ||
                (keyboardEvent.key >= "a" && keyboardEvent.key <= "z") ||
                (keyboardEvent.key >= "A" && keyboardEvent.key <= "Z") ||
                isUndoUppercase) {
                if (!isFixAfterDCursorExec)
                    isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, textElement);
                keyboardEvent.preventDefault();
                isFixAfterDCursorExec = true;
            }
        }
    });
    return [text, isCursorAutoMoved];
}
function wrongStartCorrection(text = "", wrongStartMatch = "") {
    let fixedText = text;
    if (wrongStartMatch && text) {
        const wrongStartLength = wrongStartMatch
            .toString()
            .replaceAll(",", "").length;
        fixedText =
            text.slice(wrongStartLength - 1) + text.slice(0, wrongStartLength - 1);
    }
    return fixedText;
}
function moveCursorToTheEnd(isCursorAutoMoved = false, textElement) {
    if (window.getSelection && !isCursorAutoMoved) {
        const range = document.createRange();
        range.selectNodeContents(textElement);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        isCursorAutoMoved = true;
    }
    else
        isCursorAutoMoved = false;
    return isCursorAutoMoved;
}
function fixCursorPosition(textElement, range, selection, shouldSetEnd = false) {
    range.setStart(textElement, 0);
    if (shouldSetEnd === true)
        range.setEnd(textElement, 1);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);
}
function fixFirstLetter(fstLet = "", regex, textElement, range, selection, shouldSetEnd = false) {
    let contText = textElement.value || textElement.textContent || "";
    const firstLetterMatch = fstLet?.match(regex);
    if (firstLetterMatch) {
        contText = fstLet?.toUpperCase() + contText.substring(1).toLowerCase();
        if (range.endOffset >= 1)
            fixCursorPosition(textElement, range, selection, shouldSetEnd);
    }
    return contText;
}
function fixWrongStarts(text = "", match = "", length = 0) {
    let fixedStr = text ?? "";
    if (text && match) {
        const arrText = Array.from(text);
        arrText.splice(text.indexOf(match), length, "");
        fixedStr = arrText.toString().replaceAll(",", "");
    }
    return fixedStr;
}
function fixNextWordsIniNotD(remadeText = "", letMatch = "") {
    if (remadeText) {
        const gLetMatchI = remadeText.lastIndexOf(letMatch) + 1;
        const capChar = remadeText.charAt(gLetMatchI)?.toUpperCase();
        const arrText = Array.from(remadeText);
        arrText[gLetMatchI] = capChar;
        remadeText = arrText.toString().replaceAll(",", "");
        if (remadeText.match(/^\s[\w]+/g))
            remadeText = remadeText.slice(1, remadeText.length) + " ";
    }
    else
        remadeText = "";
    return remadeText;
}
function fixNextWordsAfterD(remadeText = "", letMatch = "") {
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
function fixUnproperUppercases(text = "", match = "", context = 0) {
    const spaceMatches = text.match(/\s/g);
    const upperCasesRepetitionsIndex = text.indexOf(match);
    const textBeforeRepetitions = text.substring(0, upperCasesRepetitionsIndex);
    let addAcumulator = 0, loweredRepetitions = "";
    loweredRepetitions = match.toLowerCase().slice(1);
    if (spaceMatches) {
        if (context === "NoD" ||
            context === "YesDCont" ||
            context == 0 ||
            context === 2 ||
            !context) {
            if (context === "YesDCont" || context === 2) {
                const lowercasesMatches = text.match(/[a-záàâäãéèêëíìîïóòôöõúùûü]/g);
                if (lowercasesMatches)
                    addAcumulator += lowercasesMatches.length;
            }
            addAcumulator += spaceMatches.length;
        }
        else if (context === "YesDVal" || context === 1)
            addAcumulator = 1;
        else
            console.error(`Context value not suitable`);
    }
    const textAfterRepetitions = text.slice(upperCasesRepetitionsIndex + 1 + loweredRepetitions.length - addAcumulator, text.length + 1);
    const textArray = Array.from(text);
    textArray.splice(upperCasesRepetitionsIndex + 1, loweredRepetitions.length, loweredRepetitions);
    if (context === "NoD" || context == 0 || !context)
        text =
            textBeforeRepetitions +
                match.slice(0, 1) +
                loweredRepetitions +
                textAfterRepetitions;
    else if (context === "YesDVal") {
        const upperlowercombD = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][sS]?[\s]/);
        if (upperlowercombD?.length === 4)
            loweredRepetitions += upperlowercombD.toString().replace(/S/, "s");
        text = textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
    }
    else if (context === "YesDCont") {
        text = text.match(/D[aeiouáàâäãéèêëíìîïóòôöõúùûü][s]\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{3,}/)
            ? textBeforeRepetitions + loweredRepetitions + "S" + textAfterRepetitions
            : textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
    }
    else
        console.error(`Context value not suitable`);
    return text;
}
function fixForcedUpperCase(textElement, wordMatch = [""], wMatchIteration = "") {
    let text = textElement.value || textElement.textContent || "";
    const strDlowercase = wMatchIteration.toString();
    const DUppercased = strDlowercase.charAt(1).toUpperCase();
    if (DUppercased) {
        const strDAfterMinusInd = (text?.length ?? 0) -
            (strDlowercase.substring(0, 1) + DUppercased + strDlowercase.substring(2))
                .length;
        const startSlicedCite = text?.slice(0, strDAfterMinusInd);
        if (wordMatch.length >= 1 && startSlicedCite)
            text = startSlicedCite + text?.slice(strDAfterMinusInd);
    }
    return text;
}
function autoCapitalizeInputs(textEl, isAutocorrectOn = true) {
    if ((textEl instanceof HTMLInputElement && textEl.type === "text") ||
        textEl instanceof HTMLTextAreaElement) {
        let text = textEl?.value ?? null;
        if (isAutocorrectOn && text) {
            //inicialização de expressões regex com seus objetos e matches associados
            const newWordMatches = text.match(/\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g);
            const letterMatchesIniNotD = text.match(/\s[^d]/g);
            const letterMatchesIniD = text.match(/\sd/g);
            let letterNotMatchesAfterD = text.match(/\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g) ?? [];
            const letterMatchesAfterDOp1 = text.match(/\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g);
            const letterMatchesAfterDOp2 = text.match(/\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g);
            const letterMatchesAfterDOp3 = text.match(/\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g);
            const lowercasesRegexObj = new RegExp(/[a-záàâäãéèêëíìîïóòôöõúùûü]/g);
            const uppercasesRegexObj = new RegExp(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/);
            const multipleUppercasesMatches = text.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{2,}/g);
            const multipleUppercasesMatches2 = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][S]\s/g);
            const wrongUppercasesMatchesOp1 = text.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g);
            const wrongUppercasesMatchesOp2 = text.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g);
            const wrongUppercasesMatchesOp3 = text.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g);
            const wrongUppercasesMatchesOp4 = text.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g);
            const wrongUppercasesMatchesOp5 = text.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g);
            const wrongUppercasesMatchesOp6 = text.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g);
            const wrongUppercasesMatchesOp7 = text.match(/D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g);
            const wrongUppercasesMatchesOp8 = text.match(/D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g);
            const wrongUppercasesMatchesOp9 = text.match(/D[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]\s/g);
            const wrongStartMatch = text
                .match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/)
                ?.toString() ?? null;
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
            if (text.length === 1 && !newWordMatches)
                textEl.value = fixFirstLetter(text[0], /\b\w/, textEl, range, selection, false);
            else if (text.length > 1 &&
                !textEl.classList.contains("autocorrectFirst")) {
                if (textEl.classList.contains("inpAst") ||
                    textEl.classList.contains("inpIdentif")) {
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
                                wrongCharsMatches.forEach(wrongCharMatch => {
                                    textEl.value = fixWrongStarts(text, wrongCharMatch, wrongCharsMatches[iW].length);
                                    [textEl.value, isCursorAutoMoved] = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textEl);
                                });
                            }
                        }
                    })();
                    if (wrongStartMatch)
                        textEl.value =
                            wrongStartCorrection(textEl.value, wrongStartMatch) ?? "";
                    if (newWordMatches) {
                        newWordMatches.forEach(() => {
                            //IIFE para capitalizar palavras após a primeira
                            (() => {
                                if (letterMatchesIniNotD && !letterMatchesIniD) {
                                    letterMatchesIniNotD.forEach(letterMatch => {
                                        remadeText = fixNextWordsIniNotD(remadeText, letterMatch);
                                    });
                                    textEl.value = remadeText;
                                    [textEl.value, isCursorAutoMoved] = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textEl);
                                    textEl.value =
                                        wrongStartCorrection(textEl.value, wrongStartMatch) ?? "";
                                }
                                else if ((letterMatchesIniNotD && letterMatchesIniD) ||
                                    (!letterMatchesIniNotD && letterMatchesIniD)) {
                                    //IIFE para correção focada em conjunção com D
                                    (() => {
                                        let letterMatchesAfterD = [];
                                        if (!letterNotMatchesAfterD &&
                                            (letterMatchesAfterDOp1 ||
                                                letterMatchesAfterDOp2 ||
                                                letterMatchesAfterDOp3))
                                            letterMatchesAfterD = [
                                                ...(letterMatchesAfterDOp1 || []),
                                                ...(letterMatchesAfterDOp2 || []),
                                                ...(letterMatchesAfterDOp3 || []),
                                            ];
                                        else if (letterNotMatchesAfterD &&
                                            !(letterMatchesAfterDOp1 ||
                                                letterMatchesAfterDOp2 ||
                                                letterMatchesAfterDOp3))
                                            if (letterNotMatchesAfterD && letterMatchesIniNotD)
                                                letterMatchesAfterD = [...(letterMatchesIniNotD || [])];
                                            else if (letterNotMatchesAfterD &&
                                                (letterMatchesAfterDOp1 ||
                                                    letterMatchesAfterDOp2 ||
                                                    letterMatchesAfterDOp3 ||
                                                    letterMatchesIniNotD))
                                                letterMatchesAfterD = [
                                                    ...(letterMatchesAfterDOp1 || []),
                                                    ...(letterMatchesAfterDOp2 || []),
                                                    ...(letterMatchesAfterDOp3 || []),
                                                ];
                                        //IIFE para capitalização focada em iniciais D
                                        (() => {
                                            letterMatchesAfterD?.forEach(letterMatchD => {
                                                remadeText = fixNextWordsAfterD(remadeText, letterMatchD);
                                            });
                                            textEl.value = remadeText;
                                            for (let iD = 0; iD < Array.from(letterMatchesAfterD ?? []).length; iD++) {
                                                const filteredArrayD = letterMatchesAfterD?.filter(iD => lowercasesRegexObj.test(iD));
                                                if (filteredArrayD) {
                                                    const mappedArrayD = filteredArrayD.map(iD => iD.toUpperCase());
                                                    let remadeStringD = "";
                                                    if (iD === 0) {
                                                        filteredArrayD.splice(iD, 1, mappedArrayD[0]);
                                                        remadeStringD = filteredArrayD
                                                            .toString()
                                                            .replaceAll(",", "");
                                                        [textEl.value, isCursorAutoMoved] =
                                                            correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textEl);
                                                    }
                                                    else if (iD === 1) {
                                                        filteredArrayD.splice(iD, 1, mappedArrayD[1]);
                                                        remadeStringD = filteredArrayD
                                                            .toString()
                                                            .replaceAll(",", "")
                                                            .slice(2);
                                                        [textEl.value, isCursorAutoMoved] =
                                                            correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textEl);
                                                        if (textEl.value)
                                                            textEl.value = textEl.value.replace(new RegExp(filteredArrayD[iD], "g"), remadeStringD);
                                                    }
                                                    else if (iD > 2) {
                                                        filteredArrayD.pop();
                                                        filteredArrayD.push(mappedArrayD[iD]);
                                                        [textEl.value, isCursorAutoMoved] =
                                                            correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textEl);
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
                            unproperUppercases.forEach(multipleUppercasesMatch => {
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
                                    if (upperlowercombDS)
                                        upperlowercombDS.splice(3, 1, "s");
                                    textEl.value = text;
                                    isUndoUppercase = true;
                                    [textEl.value, isCursorAutoMoved] = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textEl);
                                    if (range.endOffset >= 1)
                                        fixCursorPosition(textEl, range, selection, true);
                                }
                            });
                            unproperDUppercases.forEach(multipleUppercasesMatch => {
                                if (text && multipleUppercasesMatch) {
                                    textEl.value = fixUnproperUppercases(text, multipleUppercasesMatch, "YesDVal");
                                    isUndoUppercase = true;
                                    [textEl.value, isCursorAutoMoved] = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textEl);
                                    if (range.endOffset >= 1)
                                        fixCursorPosition(textEl, range, selection, true);
                                }
                            });
                        })();
                    }
                    //statement para controle de combinação após entrada com inicial D
                    if (letterMatchesIniD &&
                        letterNotMatchesAfterD &&
                        !(letterMatchesAfterDOp1 ||
                            letterMatchesAfterDOp2 ||
                            letterMatchesAfterDOp3))
                        letterNotMatchesAfterD = [];
                    //statement para fluxo validando match de iniciais
                    if (letterMatchesIniD || letterMatchesIniNotD) {
                        //IIFE para forçar upper case
                        (() => {
                            const DMatch = [
                                ...(letterMatchesAfterDOp1 || []),
                                ...(letterMatchesAfterDOp2 || []),
                                ...(letterMatchesAfterDOp3 || []),
                            ];
                            const wordMatch = [
                                ...(DMatch || []),
                                ...(letterMatchesIniNotD || []),
                            ];
                            for (let iM = 0; iM < wordMatch.length; iM++) {
                                if (uppercasesRegexObj.test(wordMatch[iM]))
                                    continue;
                                textEl.value = fixForcedUpperCase(textEl, wordMatch, wordMatch[iM]);
                                if (DMatch.flat(1).length > 0) {
                                    [textEl.value, isCursorAutoMoved] = correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, textEl);
                                }
                            }
                        })();
                    }
                    //IIFE para fazer correções adicionais no final da edição automática
                    (() => {
                        if (wrongCharsMatchesOp1)
                            textEl.value =
                                textEl.value?.replaceAll(wrongCharsRegexOp1, "") ?? null;
                        if (wrongCharsMatchesOp2)
                            textEl.value =
                                textEl.value?.replaceAll(wrongCharsRegexOp2, "") ?? null;
                        if (wrongCharsMatchesOp3)
                            textEl.value =
                                textEl.value?.replaceAll(wrongCharsRegexOp3, "") ?? null;
                        if (text.match(/\s[\s]+/g))
                            textEl.value = textEl.value?.replaceAll(/\s[\s]+/g, " ") ?? null;
                        if (text.match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]/))
                            textEl.value = text.slice(0, 1).toUpperCase() + text.slice(1);
                    })();
                }
            }
        }
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(textEl, "argument for autoCapitalizeInputs()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
}
function autoCapitalizeCite(editableCite, isAutocorrectOn = true) {
    const citeText = editableCite?.textContent ?? null;
    if (editableCite instanceof HTMLElement && isAutocorrectOn && citeText) {
        //inicialização de expressões regex com seus objetos e matches associados
        const newWordMatches = citeText.match(/\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g);
        const letterMatchesIniNotD = citeText.match(/\s[^d]/g);
        const letterMatchesIniD = citeText.match(/\sd/g);
        let letterNotMatchesAfterD = citeText.match(/\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g) ?? [];
        const letterMatchesAfterDOp1 = citeText.match(/\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g);
        const letterMatchesAfterDOp2 = citeText.match(/\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g);
        const letterMatchesAfterDOp3 = citeText.match(/\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g);
        const lowercasesRegexObj = new RegExp(/[a-záàâäãéèêëíìîïóòôöõúùûü]/g);
        const uppercasesRegexObj = new RegExp(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/);
        const multipleUppercasesMatches = citeText.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{2,}/g);
        const wrongUppercasesMatchesOp1 = citeText.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g);
        const wrongUppercasesMatchesOp2 = citeText.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g);
        const wrongUppercasesMatchesOp3 = citeText.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g);
        const wrongUppercasesMatchesOp4 = citeText.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g);
        const wrongUppercasesMatchesOp5 = citeText.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g);
        const wrongUppercasesMatchesOp6 = citeText.match(/[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g);
        const wrongUppercasesMatchesOp7 = citeText.match(/D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g);
        const wrongUppercasesMatchesOp8 = citeText.match(/D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g);
        const wrongUppercasesMatchesOp9 = citeText.match(/D[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]\s/g);
        const wrongStartMatch = citeText
            .match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/)
            ?.toString() ?? null;
        const wrongCharsRegexOp1 = /[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]*/g;
        const wrongCharsMatchesOp1 = citeText.match(wrongCharsRegexOp1);
        const wrongCharsRegexOp2 = /$[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
        const wrongCharsMatchesOp2 = citeText.match(wrongCharsRegexOp2);
        const wrongCharsRegexOp3 = /(?<=\sdD)[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
        const wrongCharsMatchesOp3 = citeText.match(wrongCharsRegexOp3);
        //inicialização de outras variáveis
        const selection = window.getSelection();
        const range = document.createRange();
        let remadeCiteText = citeText, isUndoUppercase = false, isCursorAutoMoved = false, isSpanActive = false, isAlertMade = false;
        //statement para diferenciar início do restante do input
        if (citeText.length === 1 && !newWordMatches)
            editableCite.textContent = fixFirstLetter(citeText[0], /\b\w/, editableCite, range, selection, true);
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
                        wrongCharsMatches.forEach(wrongCharMatch => {
                            editableCite.textContent = fixWrongStarts(citeText, wrongCharMatch, wrongCharsMatches[iW].length);
                            [editableCite.textContent, isCursorAutoMoved] =
                                correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                            isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
                            [isSpanActive, isAlertMade] = createSpanAlert(isSpanActive, isAlertMade);
                        });
                    }
                }
            })();
            if (wrongStartMatch)
                editableCite.textContent = wrongStartCorrection(editableCite.textContent, wrongStartMatch);
            if (newWordMatches) {
                newWordMatches.forEach(() => {
                    //IIFE para capitalizar palavras após a primeira
                    (() => {
                        if (letterMatchesIniNotD && !letterMatchesIniD) {
                            letterMatchesIniNotD.forEach(letterMatch => {
                                remadeCiteText = fixNextWordsIniNotD(remadeCiteText, letterMatch);
                            });
                            editableCite.textContent = remadeCiteText;
                            isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
                            [editableCite.textContent, isCursorAutoMoved] =
                                correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
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
                                        letterMatchesAfterDOp3))
                                    letterMatchesAfterD = [
                                        ...(letterMatchesAfterDOp1 || []),
                                        ...(letterMatchesAfterDOp2 || []),
                                        ...(letterMatchesAfterDOp3 || []),
                                    ];
                                else if (letterNotMatchesAfterD &&
                                    !(letterMatchesAfterDOp1 ||
                                        letterMatchesAfterDOp2 ||
                                        letterMatchesAfterDOp3))
                                    if (letterNotMatchesAfterD && letterMatchesIniNotD)
                                        letterMatchesAfterD = [...(letterMatchesIniNotD || [])];
                                    else if (letterNotMatchesAfterD &&
                                        (letterMatchesAfterDOp1 ||
                                            letterMatchesAfterDOp2 ||
                                            letterMatchesAfterDOp3 ||
                                            letterMatchesIniNotD))
                                        letterMatchesAfterD = [
                                            ...(letterMatchesAfterDOp1 || []),
                                            ...(letterMatchesAfterDOp2 || []),
                                            ...(letterMatchesAfterDOp3 || []),
                                        ];
                                //IIFE para capitalização focada em iniciais D
                                (() => {
                                    letterMatchesAfterD.forEach(letterMatchD => {
                                        remadeCiteText = fixNextWordsAfterD(remadeCiteText, letterMatchD);
                                    });
                                    editableCite.textContent = remadeCiteText;
                                    for (let iD = 0; iD < Array.from(letterMatchesAfterD ?? []).length; iD++) {
                                        const filteredArrayD = letterMatchesAfterD?.filter(iD => lowercasesRegexObj.test(iD));
                                        if (filteredArrayD) {
                                            const mappedArrayD = filteredArrayD.map(iD => iD.toUpperCase());
                                            let remadeStringD = "";
                                            if (iD === 0) {
                                                [isSpanActive, isAlertMade] = createSpanAlert(isSpanActive, isAlertMade);
                                                filteredArrayD.splice(iD, 1, mappedArrayD[0]);
                                                remadeStringD = filteredArrayD
                                                    .toString()
                                                    .replaceAll(",", "");
                                                [editableCite.textContent, isCursorAutoMoved] =
                                                    correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                                            }
                                            else if (iD === 1) {
                                                [isSpanActive, isAlertMade] = createSpanAlert(isSpanActive, isAlertMade);
                                                filteredArrayD.splice(iD, 1, mappedArrayD[1]);
                                                remadeStringD = filteredArrayD
                                                    .toString()
                                                    .replaceAll(",", "")
                                                    .slice(2);
                                                [editableCite.textContent, isCursorAutoMoved] =
                                                    correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                                                if (editableCite.textContent)
                                                    editableCite.textContent =
                                                        editableCite.textContent.replace(new RegExp(filteredArrayD[iD], "g"), remadeStringD);
                                            }
                                            else if (iD > 2) {
                                                filteredArrayD.pop();
                                                filteredArrayD.push(mappedArrayD[iD]);
                                                [editableCite.textContent, isCursorAutoMoved] =
                                                    correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
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
                    unproperUppercases.forEach(multipleUppercasesMatch => {
                        if (citeText && multipleUppercasesMatch) {
                            editableCite.textContent = fixUnproperUppercases(citeText, multipleUppercasesMatch, "NoD");
                            isUndoUppercase = true;
                            [editableCite.textContent, isCursorAutoMoved] =
                                correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
                            isCursorAutoMoved = moveCursorToTheEnd(isCursorAutoMoved, editableCite);
                            [isSpanActive, isAlertMade] = createSpanAlert(isSpanActive, isAlertMade);
                        }
                    });
                    unproperDUppercases.forEach(multipleUppercasesMatch => {
                        if (citeText && multipleUppercasesMatch) {
                            editableCite.textContent = fixUnproperUppercases(citeText, multipleUppercasesMatch, "YesDCont");
                            isUndoUppercase = true;
                            [editableCite.textContent, isCursorAutoMoved] =
                                correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
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
                letterMatchesAfterDOp3))
            letterNotMatchesAfterD = [];
        //statement para correção de múltiplos upper cases forçados indevidamente
        if (letterMatchesIniD || letterMatchesIniNotD) {
            //IIFE para forçar upper case
            (() => {
                const DMatch = [
                    ...(letterMatchesAfterDOp1 || []),
                    ...(letterMatchesAfterDOp2 || []),
                    ...(letterMatchesAfterDOp3 || []),
                ];
                const wordMatch = [...(DMatch || []), ...(letterMatchesIniNotD || [])];
                for (let iM = 0; iM < wordMatch.length; iM++) {
                    if (uppercasesRegexObj.test(wordMatch[iM]))
                        continue;
                    editableCite.textContent = fixForcedUpperCase(editableCite, wordMatch, wordMatch[iM]);
                    if (DMatch.flat(1).length > 0) {
                        [editableCite.textContent, isCursorAutoMoved] =
                            correctCursorNextWords(isCursorAutoMoved, isUndoUppercase, wrongStartMatch, editableCite);
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
    function createSpanAlert(isSpanActive = false, isAlertMade = false) {
        const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
        const computedStyleRegex = /,\d+.?\d*.?\d*/g;
        if (editableCite?.nextElementSibling &&
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
function removeFirstClick(el) {
    let cursorPosition = 0;
    if (el instanceof Element) {
        if (el.textContent === "Insira Seu Nome Aqui")
            el.textContent = "";
        setInterval(() => {
            cursorPosition = _gHandlers__WEBPACK_IMPORTED_MODULE_0__.cursorCheckTimer() ?? 0;
        }, 3000);
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(el, "argument for removeFirstClick()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    return cursorPosition ?? 0;
}
function checkAutoCorrect(deactAutocorrectBtn) {
    let isAutocorrectOn = true;
    if (deactAutocorrectBtn instanceof HTMLButtonElement) {
        deactAutocorrectBtn.textContent?.match(/Ativar/)
            ? (isAutocorrectOn = false)
            : (isAutocorrectOn = true);
    }
    else if (deactAutocorrectBtn instanceof HTMLInputElement &&
        (deactAutocorrectBtn.type === "checkbox" ||
            deactAutocorrectBtn.type === "radio")) {
        deactAutocorrectBtn.checked
            ? (isAutocorrectOn = true)
            : (isAutocorrectOn = false);
    }
    console.log(isAutocorrectOn);
    return isAutocorrectOn;
}
function switchAutocorrect(click, deactAutocorrectBtn, isAutocorrectOn = true) {
    if (click?.target === deactAutocorrectBtn)
        if (deactAutocorrectBtn instanceof HTMLButtonElement) {
            isAutocorrectOn = !isAutocorrectOn; //if-if não funciona aqui
            isAutocorrectOn
                ? (deactAutocorrectBtn.textContent = "Desativar Autocorreção")
                : (deactAutocorrectBtn.textContent = "Ativar Autocorreção");
        }
        else if (deactAutocorrectBtn instanceof HTMLInputElement &&
            (deactAutocorrectBtn.type === "checkbox" ||
                deactAutocorrectBtn.type === "radio"))
            isAutocorrectOn = !isAutocorrectOn;
        else
            _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(deactAutocorrectBtn, "arguments for switchAutocorrect()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    return isAutocorrectOn;
}
function checkAllGenConts(...els) {
    if (Array.isArray(els) &&
        els?.every(el => el instanceof HTMLSelectElement ||
            el instanceof HTMLInputElement ||
            el instanceof HTMLTextAreaElement))
        return true;
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), "arguments for checkAllGenConts()", `${JSON.stringify(els)}`);
    return false;
}
function fluxGen(arrGenConts, genIniValue = "masculino") {
    if (Array.isArray(arrGenConts) &&
        arrGenConts?.every(genCont => genCont instanceof HTMLSelectElement ||
            genCont instanceof HTMLInputElement ||
            genCont instanceof HTMLTextAreaElement) &&
        typeof genIniValue === "string") {
        const [gen, genBirthRel, genTrans, genFisAlin] = arrGenConts;
        console.log(gen.value);
        if (gen.value === "masculino" || gen.value === "feminino") {
            if (genBirthRel.value === "cis") {
                hideGenFisAlin(genFisAlin);
                hideStgTransHorm(genTrans);
                return genIniValue || gen.value;
            }
            else if (genBirthRel.value === "trans") {
                showStgTransHorm(genTrans);
                if (genTrans.value === "avancado") {
                    hideGenFisAlin(genFisAlin);
                    return genIniValue || gen.value;
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
                                contMasculinizado.setAttribute("selected", "");
                                if (contFeminilizado?.selected)
                                    contFeminilizado.removeAttribute("selected");
                            }
                            if (gen.value === "feminino") {
                                contFeminilizado.setAttribute("selected", "");
                                if (contMasculinizado?.selected)
                                    contMasculinizado.removeAttribute("selected");
                            }
                        }
                        else {
                            if (contMasculinizado?.selected)
                                contMasculinizado.removeAttribute("selected");
                            if (contFeminilizado?.selected)
                                contFeminilizado.removeAttribute("selected");
                        }
                    }
                    if (genFisAlin.value === "masculinizado")
                        return "masculino";
                    else if (genFisAlin.value === "feminilizado")
                        return "feminino";
                    else if (genFisAlin.value === "neutro")
                        return "neutro";
                }
            }
            else if (genBirthRel.value === "outros" ||
                genBirthRel.value === "undefined") {
                showGenFisAlin(genFisAlin);
                if (genFisAlin.value === "masculinizado")
                    return "masculino";
                else if (genFisAlin.value === "feminilizado")
                    return "feminino";
                else if (genFisAlin.value === "neutro")
                    return "neutro";
            }
        }
        else if (gen.value === "naoBinario" ||
            gen.value === "outros" ||
            gen.value === "undefined") {
            genBirthRel.value === "trans"
                ? showStgTransHorm(genTrans)
                : hideStgTransHorm(genTrans);
            showGenFisAlin(genFisAlin);
            console.log("case nb");
            if (genFisAlin.value === "masculinizado")
                return "masculino";
            else if (genFisAlin.value === "feminilizado")
                return "feminino";
            else if (genFisAlin.value === "neutro")
                return "neutro";
        }
        else
            _errorHandler__WEBPACK_IMPORTED_MODULE_2__.stringError("obtendo gen.value", gen?.value ?? "UNDEFINED VALUE", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.multipleElementsNotFound((0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()), "arguments for fluxGen", `${JSON.stringify(arrGenConts)}` || null);
    return "masculino";
}
function showGenFisAlin(genFisAlin) {
    if (genFisAlin instanceof HTMLSelectElement ||
        genFisAlin instanceof HTMLInputElement ||
        genFisAlin instanceof HTMLTextAreaElement) {
        genFisAlin.closest(".spanFsAnamG")?.removeAttribute("hidden");
        return true;
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(genFisAlin, "argument for showGenFisAlin()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    return false;
}
function hideGenFisAlin(genFisAlin) {
    if (genFisAlin instanceof HTMLSelectElement ||
        genFisAlin instanceof HTMLInputElement ||
        genFisAlin instanceof HTMLTextAreaElement) {
        genFisAlin.closest(".spanFsAnamG")?.setAttribute("hidden", "");
        return false;
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(genFisAlin, "argument for hideGenFisAlin()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    return true;
}
function showStgTransHorm(genTrans) {
    if (genTrans instanceof HTMLSelectElement ||
        genTrans instanceof HTMLInputElement ||
        genTrans instanceof HTMLTextAreaElement) {
        genTrans.closest(".spanFsAnamG")?.removeAttribute("hidden");
        return true;
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(genTrans, "argument for showStgTransHorm()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    return false;
}
function hideStgTransHorm(genTrans) {
    if (genTrans instanceof HTMLSelectElement ||
        genTrans instanceof HTMLInputElement ||
        genTrans instanceof HTMLTextAreaElement) {
        genTrans.closest(".spanFsAnamG")?.setAttribute("hidden", "");
        return false;
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(genTrans, "argument for hideStgTransHorm()", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    return true;
}
function filterIdsByGender(arrayIds = ["peit", "abd", "coxa"], bodyType = "masculino") {
    let genderedIds = [];
    if (Array.isArray(arrayIds) &&
        arrayIds?.every(prop => typeof prop === "string") &&
        typeof bodyType === "string") {
        switch (bodyType) {
            case "masculino":
                for (let iM = 0; iM < arrayIds.length; iM++) {
                    if (arrayIds[iM] === "peit" ||
                        arrayIds[iM] === "abd" ||
                        arrayIds[iM] === "coxa")
                        genderedIds.push(arrayIds[iM]);
                }
                break;
            case "feminino":
                for (let iF = 0; iF < arrayIds.length; iF++) {
                    if (arrayIds[iF] === "tricp" ||
                        arrayIds[iF] === "suprail" ||
                        arrayIds[iF] === "coxa")
                        genderedIds.push(arrayIds[iF]);
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
                _errorHandler__WEBPACK_IMPORTED_MODULE_2__.stringError(`obtendo bodyType válido`, bodyType, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
        }
    }
    else {
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.typeError(`Erro validando array em filterIdsByGender().
      Validando elementos para definição de gênero como strings`, bodyType, "string", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    }
    if (genderedIds?.length === 0)
        genderedIds = ["peit", "abd", "coxa"];
    return genderedIds;
}
function generatePersonInstance(person) {
    if (person &&
        "gen" in person &&
        typeof person.gen === "string" &&
        person.gen !== "") {
        if (person.gen === "masculino")
            person = new _classes__WEBPACK_IMPORTED_MODULE_1__.Man(person.gen, person.age || 0, person.weight || 0, person.height || 0, person.sumDCut || 0, person.atvLvl || "leve");
        else if (person.gen === "feminino")
            person = new _classes__WEBPACK_IMPORTED_MODULE_1__.Woman(person.gen, person.age || 0, person.weight || 0, person.height || 0, person.sumDCut || 0, person.atvLvl || "leve");
        else if (person.gen === "neutro")
            person = new _classes__WEBPACK_IMPORTED_MODULE_1__.Neutro(person.gen, person.age || 0, person.weight || 0, person.height || 0, person.sumDCut || 0, person.atvLvl || "leve");
        else
            _errorHandler__WEBPACK_IMPORTED_MODULE_2__.stringError("person.gen", person?.gen, (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
    }
    else
        _errorHandler__WEBPACK_IMPORTED_MODULE_2__.typeError("person.gen", person?.gen, "string", (0,_errorHandler__WEBPACK_IMPORTED_MODULE_2__.extLine)(new Error()));
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addListenerAntFamChecks: () => (/* binding */ addListenerAntFamChecks),
/* harmony export */   addListenerAntMedContainer: () => (/* binding */ addListenerAntMedContainer),
/* harmony export */   addListenerTelInputs: () => (/* binding */ addListenerTelInputs),
/* harmony export */   addListenersCepElements: () => (/* binding */ addListenersCepElements),
/* harmony export */   addListenersEmailInputs: () => (/* binding */ addListenersEmailInputs),
/* harmony export */   addListenersGenConts: () => (/* binding */ addListenersGenConts),
/* harmony export */   addListenersQxPrinc: () => (/* binding */ addListenersQxPrinc)
/* harmony export */ });
/* harmony import */ var _aGHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aGHandlers */ "./src/aGHandlers.tsx");
/* harmony import */ var _aGModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aGModel */ "./src/aGModel.tsx");
/* harmony import */ var _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global-scripts/src/gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global-scripts/src/gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _global_scripts_src_gController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../global-scripts/src/gController */ "../global-scripts/src/gController.tsx");
/* harmony import */ var _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../global-scripts/src/errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM







//inicialização de constantes percorrendo o DOM
const genElement = document.getElementById("genId");
const allInputs = Array.from([
    ...document.querySelectorAll("input"),
    ...document.querySelectorAll("textarea"),
    ...document.querySelectorAll("select"),
    document.querySelector('cite[contenteditable="true"]'),
]).flat(1);
const JSONBtn = document.getElementById("btnJSON");
let genValue = genElement?.value || "masculino", JSONLink, isAutocorrectOn = true, firstClick = true, blockCount = 1;
//validação de constantes obtidas e aplicação de listeners/callbacks
[isAutocorrectOn, firstClick] = _global_scripts_src_gController__WEBPACK_IMPORTED_MODULE_4__.getGlobalEls(isAutocorrectOn, firstClick, "num");
//exportações para o jest
function addListenersGenConts(genElement, genValue = "masculino") {
    const genBirthRel = document.getElementById("genBirthRelId");
    const genTrans = document.getElementById("genTransId");
    const genFisAlin = document.getElementById("genFisAlinId");
    if (_global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.checkAllGenConts(genElement, genBirthRel, genTrans, genFisAlin) &&
        typeof genValue === "string") {
        const arrGenConts = [
            genElement,
            genBirthRel,
            genTrans,
            genFisAlin,
        ];
        arrGenConts.forEach(genCont => {
            genCont.addEventListener("change", () => {
                genValue =
                    _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.fluxGen(arrGenConts, genElement?.value) ||
                        "masculino";
                console.log(genValue);
                return genValue || "masculino";
            });
        });
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.multipleElementsNotFound((0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()), "gen Elements", genElement, genBirthRel, genTrans, genFisAlin);
    return genValue || "masculino";
}
function addListenerTelInputs() {
    const telInputs = document.querySelectorAll('input[type="text"][id^="tel"]');
    if (telInputs?.length > 0) {
        telInputs.forEach(telInput => {
            if (telInput instanceof HTMLInputElement ||
                telInput instanceof HTMLTextAreaElement)
                telInput.addEventListener("input", input => {
                    if (input.target instanceof HTMLInputElement ||
                        input.target instanceof HTMLTextAreaElement)
                        _aGModel__WEBPACK_IMPORTED_MODULE_1__.formatTel(input.target);
                    else
                        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.inputNotFound(input?.target, `target telInput id ${JSON.stringify(telInput?.id || "UNIDENTIFIED TELINPUT")}`, (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
                });
            else
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.inputNotFound(telInput, `target telInput id ${JSON.stringify(telInput?.id || "UNIDENTIFIED TELINPUT")}`, (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
        });
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.elementNotPopulated(telInputs, "telInputs", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
}
function addListenersEmailInputs() {
    const emailInputs = document.querySelectorAll('input[id^="email"]');
    if (emailInputs?.length > 0) {
        emailInputs.forEach(emailInput => {
            if (emailInput instanceof HTMLInputElement) {
                emailInput.addEventListener("click", () => _aGModel__WEBPACK_IMPORTED_MODULE_1__.addEmailExtension(emailInput));
                emailInput.addEventListener("input", () => _aGModel__WEBPACK_IMPORTED_MODULE_1__.addEmailExtension(emailInput));
            }
            else
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.inputNotFound(emailInput, `target emailInput id ${emailInput?.id || "UNDEFINED EMAILINPUT"}`, (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
        });
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.elementNotPopulated(emailInputs, "emailInputs", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
}
function addListenerAntFamChecks() {
    const antFamChecks = document.querySelectorAll("input[id^='antFam']");
    if (antFamChecks?.length > 0) {
        antFamChecks.forEach(antFamCheck => {
            if (antFamCheck instanceof HTMLInputElement) {
                antFamCheck.addEventListener("change", change => _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.cpbInpHandler(change, antFamCheck));
                antFamCheck.addEventListener("dblclick", () => _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.doubleClickHandler(antFamCheck));
            }
            else
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.inputNotFound(antFamCheck, `target antFamCheck input id ${antFamCheck?.id || "UNDEFINED ID INPUT"}`, (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
        });
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.elementNotPopulated(antFamChecks, "antFamChecks", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
}
function addListenerAntMedContainer(blockCount = 1) {
    const antMedContainer = document.getElementById("antMedContainer");
    antMedContainer
        ? antMedContainer.addEventListener("click", (click) => {
            console.log();
            blockCount = _aGHandlers__WEBPACK_IMPORTED_MODULE_0__.addAntMedHandler(click, blockCount);
            return blockCount;
        })
        : _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.elementNotFound(null, "antMedContainer", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
    return blockCount;
}
function addListenersCepElements() {
    const cepElement = document.getElementById("cepId");
    const cepElementBtn = document.getElementById("autoCompCepBtn");
    if (cepElement instanceof HTMLInputElement &&
        cepElementBtn instanceof HTMLButtonElement) {
        cepElement.addEventListener("input", () => _aGModel__WEBPACK_IMPORTED_MODULE_1__.formatCEP(cepElement));
        cepElement.addEventListener("input", () => {
            if (!_aGHandlers__WEBPACK_IMPORTED_MODULE_0__.enableCEPBtn(cepElementBtn, cepElement.value.length)) {
                cepElementBtn.addEventListener("click", () => _aGHandlers__WEBPACK_IMPORTED_MODULE_0__.searchCEPXML(cepElement));
            }
        });
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.multipleElementsNotFound((0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()), "Elements for CEP input", cepElement, cepElementBtn);
}
function addListenersQxPrinc() {
    const qxPrinc = document.getElementById("qxPrinc");
    if (qxPrinc instanceof HTMLTextAreaElement) {
        qxPrinc.addEventListener("click", () => _aGModel__WEBPACK_IMPORTED_MODULE_1__.addDblQuotes(qxPrinc));
        qxPrinc.addEventListener("input", () => _aGModel__WEBPACK_IMPORTED_MODULE_1__.addDblQuotes(qxPrinc));
    }
    else
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.elementNotFound(qxPrinc, "qxPrinc", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
}
if (JSONBtn instanceof HTMLButtonElement && allInputs.length > 0) {
    let formDescription = [];
    JSONBtn.addEventListener("click", () => {
        formDescription = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.getJSONDesc(allInputs);
        const JSONInpsStoreStringified = (formDescription &&
            formDescription[1]) ?? [""];
        if (formDescription &&
            formDescription.length === 4 &&
            !formDescription.some(formDescElement => formDescElement === null)) {
            JSONLink = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.createJSONAnchor(JSONBtn, JSONInpsStoreStringified);
            JSONLink
                ? JSONLink.addEventListener("click", () => {
                    _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.regenerateJSONBtn(JSONLink, JSONInpsStoreStringified);
                })
                : _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.elementNotFound(JSONLink, "JSONLink", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
        }
        else
            console.warn(`Erro obtendo formDescription`);
    });
}
else {
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.elementNotFound(JSONBtn, "JSONBtn", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.elementNotPopulated(allInputs, "allInputs", (0,_global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_5__.extLine)(new Error()));
}
//chamadas
genElement.value = addListenersGenConts(genElement, genValue);
addListenerTelInputs();
addListenersEmailInputs();
addListenerAntFamChecks();
// blockCount =
addListenerAntMedContainer(blockCount);
addListenersCepElements();
_global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.deactTextInput(document.querySelectorAll('input[type="number"][id$=NumId]'), document.querySelectorAll("input[id$=NullId]"));
addListenersQxPrinc();
// // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// // let shouldRegenerateBtn = false;
// // const handleMutation = (mutationsList, observer) => {
// //   for (const mutation of mutationsList) {
// //     if (mutation.type === "childList") {
// //       // Verifica se o JSONBtn foi removido e o JSONLink foi adicionado
// //       const JSONBtnRemoved = mutation.removedNodes[0] === JSONBtn;
// //       const JSONLinkAdded = Array.from(mutation.addedNodes).some(
// //         (node) => node === JSONLink
// //       );
// //       if (JSONBtnRemoved && JSONLinkAdded) {
// //         // Lógica a ser executada quando a troca ocorrer
// //         console.log("JSONBtn foi removido, e JSONLink foi adicionado.");
// //         // Adicione aqui qualquer lógica ou evento adicional que você deseja executar
// //       }
// //     }
// //   }
// // };
// // // Função que será chamada quando houver uma mutação no DOM
// // // Cria um novo observador de mutação com a função de callback
// // const observer = new MutationObserver(handleMutation);
// // // Configura o observador para observar mudanças no nó pai (por exemplo, o body)
// // observer.observe(document.body, { childList: true, subtree: true });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixnQ0FBZ0M7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLEdBQUc7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsK0JBQStCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtJQUFrSSxJQUFJO0FBQ3RJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsSUFBSTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix1QkFBdUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksOEJBQThCO0FBQzFDLFlBQVksc0JBQXNCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksc0JBQXNCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwyRUFBMkUsR0FBRztBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0NBQWdDLGlCQUFpQixnQ0FBZ0M7QUFDekc7QUFDQTtBQUNBLG9CQUFvQixnQ0FBZ0M7QUFDcEQ7QUFDQTtBQUNBLDRCQUE0QixnQ0FBZ0M7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxHQUFHO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwrQkFBK0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtIQUErSCxJQUFJO0FBQ25JO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsSUFBSTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSxZQUFZO0FBQ1osV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztB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QWtCLDZFQUE0Qix1QkFBdUIseUVBQU87QUFDNUU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLDZFQUE0QixxQkFBcUIseUVBQU87QUFDNUQsSUFBSSxpRkFBZ0MseUJBQXlCLHlFQUFPO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGdDQUFnQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FuYW1uZXNlZ2VyYWwtcHJvc2F1ZGUvLi9zcmMvYUdIYW5kbGVycy50c3giLCJ3ZWJwYWNrOi8vYW5hbW5lc2VnZXJhbC1wcm9zYXVkZS8uL3NyYy9hR01vZGVsLnRzeCIsIndlYnBhY2s6Ly9hbmFtbmVzZWdlcmFsLXByb3NhdWRlLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9jbGFzc2VzLnRzeCIsIndlYnBhY2s6Ly9hbmFtbmVzZWdlcmFsLXByb3NhdWRlLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9lcnJvckhhbmRsZXIudHN4Iiwid2VicGFjazovL2FuYW1uZXNlZ2VyYWwtcHJvc2F1ZGUvLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2dDb250cm9sbGVyLnRzeCIsIndlYnBhY2s6Ly9hbmFtbmVzZWdlcmFsLXByb3NhdWRlLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9nSGFuZGxlcnMudHN4Iiwid2VicGFjazovL2FuYW1uZXNlZ2VyYWwtcHJvc2F1ZGUvLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2dNb2RlbC50c3giLCJ3ZWJwYWNrOi8vYW5hbW5lc2VnZXJhbC1wcm9zYXVkZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hbmFtbmVzZWdlcmFsLXByb3NhdWRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hbmFtbmVzZWdlcmFsLXByb3NhdWRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYW5hbW5lc2VnZXJhbC1wcm9zYXVkZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FuYW1uZXNlZ2VyYWwtcHJvc2F1ZGUvLi9zcmMvYUdDb250cm9sbGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvL25lc3NlIGZpbGUgZXN0w6NvIHByZXNlbnRlcyBwcmluY2lwYWxtZW50ZSBhcyBmdW7Dp8O1ZXMgZGUgbWFuaXB1bGHDp8OjbyBkaW7Dom1pY2EgZGUgdGV4dG8gZSBsYXlvdXRcclxuaW1wb3J0ICogYXMgR2xvYmFsTW9kZWwgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9nTW9kZWxcIjtcclxuaW1wb3J0ICogYXMgR2xvYmFsSGFuZGxlciBmcm9tIFwiLi4vLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2dIYW5kbGVyc1wiO1xyXG5pbXBvcnQgKiBhcyBFcnJvckhhbmRsZXIgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9lcnJvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgZXh0TGluZSB9IGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZXJyb3JIYW5kbGVyXCI7XHJcbi8vVE9ETyBSRUNPTlNJREVSQVIgVE9EQVMgQVMgRlVOw4fDlUVTIENPTU8gVFJZL0NBVENIXHJcbi8vVE9ETyBQT0RFIFNFUiBGRUlUTyBDT00gUFJPTUlTRStBV0FJVCwgQ09OU0lERVJBUlxyXG4vL1RPRE8gTU9DS0FSIFZBTFVFUyBQQVJBIFRBUkdJTlBTIEVNIFRFU1RTXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hDRVBYTUwoY2VwRWxlbWVudCkge1xyXG4gICAgbGV0IGluaXRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGxldCByZXFBY2MgPSAyO1xyXG4gICAgaWYgKGNlcEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgcHJvZ0ludHMgPSBkaXNwbGF5Q0VQTG9hZEJhcihjZXBFbGVtZW50KSA/PyBbMCwgMTAwLCBudWxsXTtcclxuICAgICAgICBjb25zdCBwcm9nTWF4ID0gcHJvZ0ludHNbMF0gfHwgMDtcclxuICAgICAgICBjb25zdCBwcm9nVmFsdWUgPSBwcm9nSW50c1sxXSB8fCAxMDA7XHJcbiAgICAgICAgY29uc3QgcHJvZ0JhciA9IHByb2dJbnRzWzJdIHx8IG51bGw7XHJcbiAgICAgICAgY29uc3QgY2VwSGlmZW5PdXRWYWx1ZSA9IGNlcEVsZW1lbnQ/LnZhbHVlPy5yZXBsYWNlQWxsKFwiLVwiLCBcIlwiKSA/PyBcIlwiO1xyXG4gICAgICAgIGNvbnN0IHVybEJBUEkxID0gYGh0dHBzOi8vYnJhc2lsYXBpLmNvbS5ici9hcGkvY2VwL3YyLyR7Y2VwSGlmZW5PdXRWYWx1ZX1gO1xyXG4gICAgICAgIGNvbnN0IHhtbFJlcTEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICBpZiAodXJsQkFQSTEpIHtcclxuICAgICAgICAgICAgeG1sUmVxMS5vcGVuKFwiR0VUXCIsIHVybEJBUEkxKTtcclxuICAgICAgICAgICAgeG1sUmVxMS5zZW5kKCk7XHJcbiAgICAgICAgICAgIHhtbFJlcTEub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeG1sUmV0dXJuMSA9IGxvYWRDRVAoeG1sUmVxMSwgcmVxQWNjKTtcclxuICAgICAgICAgICAgICAgIGlmICh4bWxSZXR1cm4xID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUHJpbWVpcmEgc29saWNpdGHDp8OjbyBYTUwvSFRUUCBmZWl0YSBjb20gc3VjZXNzby5gKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ0JhciAmJiBwcm9nTWF4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRDRVBMb2FkQmFyKGNlcEVsZW1lbnQsIHByb2dCYXIsIGluaXRUaW1lLCBwcm9nTWF4LCBwcm9nVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBGYWxoYSBuYSBwcmltZWlyYSBYTUwvSFRUUCBSZXF1ZXN0LiBJbmljaWFuZG8gc2VndW5kYSBzb2xpY2l0YcOnw6NvLmApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcUFjYy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmxCQVBJMiA9IGBodHRwczovL2JyYXNpbGFwaS5jb20uYnIvYXBpL2NlcC92MS8ke2NlcEhpZmVuT3V0VmFsdWV9YDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB4bWxSZXEyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybEJBUEkyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhtbFJlcTIub3BlbihcIkdFVFwiLCB1cmxCQVBJMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhtbFJlcTIuc2VuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4bWxSZXEyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHhtbFJldHVybjIgPSBsb2FkQ0VQKHhtbFJlcTIsIHJlcUFjYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeG1sUmV0dXJuMiA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNlZ3VuZGEgc29saWNpdGHDp8OjbyBYTUwvSFRUUCBmZWl0YSBjb20gc3VjZXNzby5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ0JhciAmJiBwcm9nTWF4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRDRVBMb2FkQmFyKGNlcEVsZW1lbnQsIHByb2dCYXIsIGluaXRUaW1lLCBwcm9nTWF4LCBwcm9nVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFsaGEgbmEgc2VndW5kYSBYTUwvSFRUUCBSZXF1ZXN0LiBQcm9jZWRpbWVudG8gY2FuY2VsYWRvLiBJbnNpcmEgTWFudWFsbWVudGUuYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dCYXIgJiYgcHJvZ01heClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkQ0VQTG9hZEJhcihjZXBFbGVtZW50LCBwcm9nQmFyLCBpbml0VGltZSwgcHJvZ01heCwgcHJvZ1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIGNvbmNhbnRlbmFuZG8gc2VndW5kYSBVUkwgY29tIENFUC5gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIGNvbmNhdGVuYW5kbyBwcmltZWlyYSBVUkwgY29tIENFUC5gKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZlcmlmaWNhbmRvIGlucHV0IGRlIENFUC4gRWxlbWVudG86ICR7Y2VwRWxlbWVudH07IEluc3TDom5jaWEgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgIC5jYWxsKGNlcEVsZW1lbnQpXHJcbiAgICAgICAgICAgIC5zbGljZSg4LCAtMSl9OyBWYWxvciBkbyBlbGVtZW50byBvYnRpZG86ICR7Y2VwRWxlbWVudD8udmFsdWUgPz8gXCJOVUxMXCJ9YCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDRVAoeG1sUmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksIHJlcUFjYyA9IDEpIHtcclxuICAgIGxldCBzdGF0dXMgPSA0MDQ7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICh4bWxSZXEgaW5zdGFuY2VvZiBYTUxIdHRwUmVxdWVzdCAmJiB0eXBlb2YgcmVxQWNjID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZEFkZHJlc3MgPSBKU09OLnBhcnNlKHhtbFJlcS5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGlmICh4bWxSZXEuc3RhdHVzID09PSAyMDAgJiYgcGFyc2VkQWRkcmVzcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdWYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlVGSWRcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5SWRcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZWlnaGJvcmhvb2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5laWdoYm91cmhvb2RJZFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0cmVldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RyZWV0SWRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodWYgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHVmLnZhbHVlID0gcGFyc2VkQWRkcmVzcy5zdGF0ZTtcclxuICAgICAgICAgICAgICAgIGlmIChjaXR5IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICBjaXR5LnZhbHVlID0gcGFyc2VkQWRkcmVzcy5jaXR5O1xyXG4gICAgICAgICAgICAgICAgaWYgKG5laWdoYm9yaG9vZCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3Job29kLnZhbHVlID0gcGFyc2VkQWRkcmVzcy5uZWlnaGJvcmhvb2Q7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyZWV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICBzdHJlZXQudmFsdWUgPSBwYXJzZWRBZGRyZXNzLnN0cmVldDtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IDIwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh4bWxSZXEuc3RhdHVzID09PSA0MDQpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCI0MDRcIik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTsOjbyByZWNvbmhlY2lkby5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVSUk8gTkEgRU5UUkFEQSBERSBBUkdVTUVOVE9TLlxuICAgICAgVkFMT1JFUyBPQlRJRE9TOiAke0pTT04uc3RyaW5naWZ5KHhtbFJlcSkgfHwgbnVsbH0sICR7cmVxQWNjfWApO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGxvYWRFcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgU3RhdHVzIGRlIEVycm8gcGFyYSBDRVBWJHtyZXFBY2N9OiBgLCBsb2FkRXJyb3IubWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdHVzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5Q0VQTG9hZEJhcihjZXBFbGVtZW50KSB7XHJcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwcm9ncmVzc1wiKTtcclxuICAgIGlmIChjZXBFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGxldCBwcm9nTWF4SW50ID0gMTAwO1xyXG4gICAgICAgIGxldCBwcm9nVmFsdWVJbnQgPSAwO1xyXG4gICAgICAgIGNlcEVsZW1lbnQucGFyZW50RWxlbWVudD8uaW5zZXJ0QmVmb3JlKHByb2dyZXNzQmFyLCBjZXBFbGVtZW50Lm5leHRFbGVtZW50U2libGluZz8ubmV4dEVsZW1lbnRTaWJsaW5nID8/IG51bGwpO1xyXG4gICAgICAgIGlmIChwcm9ncmVzc0JhciAmJiBjZXBFbGVtZW50Lm5leHRFbGVtZW50U2libGluZz8ubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmlkID0gXCJsb2FkQmFyQ2VwVmFyc1wiO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5tYXggPSAxMDA7XHJcbiAgICAgICAgICAgIHByb2dNYXhJbnQgPSBwcm9ncmVzc0Jhci5tYXg7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLnZhbHVlID0gMDtcclxuICAgICAgICAgICAgcHJvZ1ZhbHVlSW50ID0gcHJvZ3Jlc3NCYXIudmFsdWU7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLnN0eWxlLnNldFByb3BlcnR5KFwiYmFja2dyb3VuZC1jb2xvclwiLCBcImJsdWVcIik7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLnN0eWxlLnNldFByb3BlcnR5KFwiY29sb3JcIiwgXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIFtwcm9nTWF4SW50LCBwcm9nVmFsdWVJbnQsIHByb2dyZXNzQmFyXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoY2VwRWxlbWVudCwgXCJjZXBFbGVtZW50XCIsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgIHJldHVybiBbMTAwLCAwLCBwcm9ncmVzc0Jhcl07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVwbG9hZENFUExvYWRCYXIoY2VwRWxlbWVudCwgcHJvZ3Jlc3NCYXIgPSBuZXcgSFRNTFByb2dyZXNzRWxlbWVudCgpLCBpbml0VGltZSA9IDAsIHByb2dNYXhJbnQgPSAxMDAsIHByb2dWYWx1ZUludCA9IDApIHtcclxuICAgIGlmIChjZXBFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgIHByb2dyZXNzQmFyIGluc3RhbmNlb2YgSFRNTFByb2dyZXNzRWxlbWVudCAmJlxyXG4gICAgICAgIHR5cGVvZiBpbml0VGltZSA9PT0gYG51bWJlcmAgJiZcclxuICAgICAgICB0eXBlb2YgcHJvZ01heEludCA9PT0gYG51bWJlcmAgJiZcclxuICAgICAgICB0eXBlb2YgcHJvZ1ZhbHVlSW50ID09PSBgbnVtYmVyYCkge1xyXG4gICAgICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gRGF0ZS5ub3coKSAtIGluaXRUaW1lO1xyXG4gICAgICAgIGNvbnN0IGVsYXBzZWRORGVjID0gZWxhcHNlZFRpbWUudG9TdHJpbmcoKS5sZW5ndGggLSAxO1xyXG4gICAgICAgIGxldCBhZGRlZFplcm9zTXVsdCA9IFwiMVwiO1xyXG4gICAgICAgIGZvciAobGV0IGlEID0gMDsgaUQgPCBlbGFwc2VkTkRlYzsgaUQrKylcclxuICAgICAgICAgICAgYWRkZWRaZXJvc011bHQgKz0gXCIwXCI7XHJcbiAgICAgICAgY29uc3QgaW5kTkRlYyA9IDEgKiBwYXJzZUludChhZGRlZFplcm9zTXVsdCk7XHJcbiAgICAgICAgY29uc3Qgcm91bmRlZEVsYXBzZWQgPSBNYXRoLnJvdW5kKGVsYXBzZWRUaW1lIC8gaW5kTkRlYykgKiBpbmRORGVjO1xyXG4gICAgICAgIGlmIChwcm9nVmFsdWVJbnQgIT09IHByb2dNYXhJbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9hZGluZ0V2ZW50ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJvZ1ZhbHVlSW50ICs9IDU7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci52YWx1ZSA9IHByb2dWYWx1ZUludDtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9nVmFsdWVJbnQgPT09IHByb2dNYXhJbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChsb2FkaW5nRXZlbnQpO1xyXG4gICAgICAgICAgICB9LCByb3VuZGVkRWxhcHNlZCAvIDIwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNlcEVsZW1lbnQucGFyZW50RWxlbWVudD8ucmVtb3ZlQ2hpbGQocHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIH0sIHJvdW5kZWRFbGFwc2VkKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKGV4dExpbmUobmV3IEVycm9yKCkpLCBcImFyZ3VtZW50b3MgcGFyYSB1cGxvYWRDRVBMb2FkQmFyXCIsIGNlcEVsZW1lbnQsIHByb2dyZXNzQmFyLCBpbml0VGltZSwgcHJvZ01heEludCwgcHJvZ1ZhbHVlSW50KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlQ0VQQnRuKGNlcEJ0biwgY2VwTGVuZ3RoID0gMCkge1xyXG4gICAgbGV0IGlzQ2VwRWxlbWVuQnRuT2ZmID0gdHJ1ZTtcclxuICAgIGlmIChjZXBCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCAmJiB0eXBlb2YgY2VwTGVuZ3RoID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgaWYgKGNlcExlbmd0aCA9PT0gOSkge1xyXG4gICAgICAgICAgICBjZXBCdG4ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIGlzQ2VwRWxlbWVuQnRuT2ZmID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY2VwQnRuLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoZXh0TGluZShuZXcgRXJyb3IoKSksIFwiYXJndW1lbnRvcyBwYXJhIGVuYWJsZUNFUEJ0blwiLCBjZXBCdG4sIGNlcExlbmd0aCk7XHJcbiAgICByZXR1cm4gaXNDZXBFbGVtZW5CdG5PZmY7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFudE1lZEhhbmRsZXIoY2xpY2ssIGJsb2NrQ291bnQgPSAxKSB7XHJcbiAgICBpZiAoY2xpY2s/LnRhcmdldD8uY2xhc3NMaXN0Py5jb250YWlucyhcImNvdW50QW50TWVkXCIpICYmXHJcbiAgICAgICAgdHlwZW9mIGJsb2NrQ291bnQgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICBpZiAoY2xpY2sgaW5zdGFuY2VvZiBFdmVudCAmJiBjbGljaz8udGFyZ2V0IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGNsaWNrLnRhcmdldC5jbGFzc0xpc3Q/LmNvbnRhaW5zKFwiYWRkQW50TWVkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBibG9ja0NvdW50Kys7IC8vIEluY3JlbWVudGEgbyBuw7ptZXJvIGRlIGJsb2Nvc1xyXG4gICAgICAgICAgICAgICAgLy8gQ3JpYSB1bSBub3ZvIGNvbmp1bnRvIGRlIGVsZW1lbnRvcyBIVE1MXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdCbG9jay5jbGFzc05hbWUgPSBcImFudE1lZEJsb2NrXCI7XHJcbiAgICAgICAgICAgICAgICBuZXdCbG9jay5pZCA9IGBhbnRNZWRCbG9jayR7YmxvY2tDb3VudH1gO1xyXG4gICAgICAgICAgICAgICAgbmV3QmxvY2suaW5uZXJIVE1MID0gYFxuICAgICAgICA8c3BhbiBjbGFzcz1cImRpdkFudE1lZFNwYW4gc3Bhbk1haW4gc3BhbkFudE1lZFRleHRcIiBpZD1cImFudE1lZFNwYW5JbnAke2Jsb2NrQ291bnR9XCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cImFudE1lZElkJHtibG9ja0NvdW50fVwiIGNsYXNzPVwiYW50TWVkTGFiZWxcIj4ke2Jsb2NrQ291bnR9JiM0MVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFudE1lZE5hbWUke2Jsb2NrQ291bnR9XCIgaWQ9XCJhbnRNZWRJZCR7YmxvY2tDb3VudH1cIiBjbGFzcz1cImZvcm0tY29udHJvbCBhdXRvY29ycmVjdCBhdXRvY29ycmVjdEZpcnN0IGlucEFudE1lZCBhbnRNZWRUZXh0XCIvPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkaXZBbnRNZWRTcGFuIHNwYW5NYWluIHNwYW5BbnRNZWREYXRlXCIgaWQ9XCJhbnRNZWRTcGFuTWFpbkRhdGUke2Jsb2NrQ291bnR9XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJkaXZBbnRNZWRTdWJTcGFuIHNwYW5TdWIgc3BhblN1YkFudE1lZERhdGVcIiBpZD1cImFudE1lZFNwYW5TdWJEYXRlJHtibG9ja0NvdW50fVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudE1lZERpdlwiPlxuICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiYW50TWVkRGF0ZUluaUlkJHtibG9ja0NvdW50fVwiIGNsYXNzPVwiYW50TWVkTGFiZWxcIj48L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwiYW50TWVkRGF0ZUluaU5hbWUke2Jsb2NrQ291bnR9XCIgaWQ9XCJhbnRNZWREYXRlSW5pSWQke2Jsb2NrQ291bnR9XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgaW5wRGF0ZSBhbnRNZWREYXRlIGlucEFudE1lZFwiIHJlcXVpcmVkIC8+IGF0w6lcbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImFudE1lZERhdGVFbmROYW1lJHtibG9ja0NvdW50fVwiIGlkPVwiYW50TWVkRGF0ZUVuZElkJHtibG9ja0NvdW50fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGlucERhdGUgYW50TWVkRGF0ZSBpbnBBbnRNZWRcIiByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiYW50TWVkRGF0ZUVuZElkJHtibG9ja0NvdW50fVwiIGNsYXNzPVwiYW50TWVkTGFiZWxcIj48L2xhYmVsPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzcz1cImRhdEJ0biBhdHVhbFRyYXRCdG4gYnRuIGJ0bi1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBpZD1cImF0dWFsVHJhdCR7YmxvY2tDb3VudH1EYXRCdG5cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFVzYXIgZGF0YSBhdHVhbFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudE1lZEJ0bnNEaXZcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImFkZEFudE1lZE5hbWUke2Jsb2NrQ291bnR9XCIgaWQ9XCJhZGRBbnRNZWRJZCR7YmxvY2tDb3VudH1cIiBjbGFzcz1cImFkZEFudE1lZCBjb3VudEFudE1lZCBidG4gYnRuLWRhcmtcIlxuICAgICAgICAgICAgICB2YWx1ZT1cImFkZEFudE1lZFwiPis8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cInJlbW92ZUFudE1lZE5hbWUke2Jsb2NrQ291bnR9XCIgaWQ9XCJyZW1vdmVBbnRNZWRJZCR7YmxvY2tDb3VudH1cIlxuICAgICAgICAgICAgICBjbGFzcz1cInJlbW92ZUFudE1lZCBjb3VudEFudE1lZCBidG4gYnRuLWRhcmtcIiB2YWx1ZT1cInJlbW92ZUFudE1lZFwiPi08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgYDtcclxuICAgICAgICAgICAgICAgIC8vIEFkaWNpb25hIG8gbm92byBibG9jbyBhbyBjb250w6ppbmVyXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFudE1lZENvbnRhaW5lclwiKT8uYXBwZW5kQ2hpbGQobmV3QmxvY2spO1xyXG4gICAgICAgICAgICAgICAgbmV3QmxvY2sucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2lkJD1cIkRhdEJ0blwiXScpLmZvckVhY2goZGF0ZUJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWN0aXZhdGlvbiA9PiBHbG9iYWxIYW5kbGVyLnVzZUN1cnJlbnREYXRlKGFjdGl2YXRpb24sIGRhdGVCdG4pKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbmV3QmxvY2sucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS5mb3JFYWNoKHRleHRFbCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyh0ZXh0RWwsIEdsb2JhbE1vZGVsLmNoZWNrQXV0b0NvcnJlY3QoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW2lkXj1cImRlYWN0QXV0b2NvcnJlY3RCdG5cIl0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtpZF49XCJkZWFjdEF1dG9jb3JyZWN0QnRuXCJdJykpKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjbGljay50YXJnZXQuY2xhc3NMaXN0Py5jb250YWlucyhcInJlbW92ZUFudE1lZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGl2VG9SZW1vdmUgPSBjbGljay50YXJnZXQuY2xvc2VzdChcIi5hbnRNZWRCbG9ja1wiKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXZUb1JlbW92ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrQ291bnQgPiAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZGl2VG9SZW1vdmU/LmlkICE9PSBcImFudE1lZEJsb2NrMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2VG9SZW1vdmUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tDb3VudCAtPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIGxvY2FsaXphbmRvIGRpdlRvUmVtb3ZlOlxuICAgICAgICBFbGVtZW50bzogJHtKU09OLnN0cmluZ2lmeShkaXZUb1JlbW92ZSl9O1xuICAgICAgICBibG9ja0NvdW50OiAke2Jsb2NrQ291bnR9O1xuICAgICAgICBkaXZUb1JlbW92ZSBpZDogJHtkaXZUb1JlbW92ZT8uaWR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJsb2NrQ291bnQgPiAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja0NvdW50ID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciB2YWxpZGF0aW5nIC5jbGFzc0xpc3Qgb2YgY2xpY2sudGFyZ2V0IGluIGFkZEFudE1lZEhhbmRsZXIuXG4gICAgICAgIENhdGNoZWQgdmFsdWU6ICR7Y2xpY2s/LnRhcmdldD8uY2xhc3NMaXN0ID8/IFwiVU5ERUZJTkVEIENMQVNTIExJU1RcIn0uYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChjbGljaz8udGFyZ2V0LCBgJHtjbGljaz8udGFyZ2V0Py5pZCA/PyBcIlVOREVGSU5FRCBCVVRUT04gSURcIn1gLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoIShjbGljaz8udGFyZ2V0IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKVxyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKGV4dExpbmUobmV3IEVycm9yKCkpLCBcImFyZ3VtZW50cyBmb3IgYWRkQW50TWVkSGFuZGxlcigpXCIsIGAke0pTT04uc3RyaW5naWZ5KGNsaWNrKX1gLCBibG9ja0NvdW50KTtcclxuICAgIH1cclxuICAgIHJldHVybiBibG9ja0NvdW50O1xyXG59XHJcbiIsIi8vbmVzc2UgZmlsZSBlc3TDo28gcHJlc2VudGVzIHByaW5jaXBhbG1lbnRlIGFzIGZ1bsOnw7VlcyByZWxhY2lvbmFkYXMgw6AgZXhpZ8OqbmNpYSBkZSBtb2RlbG8gdGV4dHVhbCBlIGRlIHZpc3VhbGl6YcOnw6NvXHJcbmltcG9ydCAqIGFzIEVycm9ySGFuZGxlciBmcm9tIFwiLi4vLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2Vycm9ySGFuZGxlclwiO1xyXG5pbXBvcnQgeyBleHRMaW5lIH0gZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9lcnJvckhhbmRsZXJcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFRlbCh0ZWxJbnApIHtcclxuICAgIGxldCBudW1Pbmx5ID0gXCJcIjtcclxuICAgIGlmICh0ZWxJbnAgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgdGVsSW5wIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xyXG4gICAgICAgIG51bU9ubHkgPSAodGVsSW5wLnZhbHVlPy5yZXBsYWNlKC9bXjAtOV0vZywgXCJcIikgfHwgbnVtT25seSkucmVwbGFjZSgvXFxkKy9nLCBtYXRjaFRlbCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaFRlbC5sZW5ndGggPT09IDkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaFRlbFswXSA9PT0gXCI5XCJcclxuICAgICAgICAgICAgICAgICAgICA/IGAke21hdGNoVGVsLnNsaWNlKDAsIDUpfS0ke21hdGNoVGVsLnNsaWNlKDUsIDkpfWBcclxuICAgICAgICAgICAgICAgICAgICA6IGAke21hdGNoVGVsLnNsaWNlKDAsIDQpfS0ke21hdGNoVGVsLnNsaWNlKDQsIDgpfWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobWF0Y2hUZWw/Lmxlbmd0aCA+IDkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7bWF0Y2hUZWwuc2xpY2UoMCwgOCl9YDtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoVGVsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRlbElucC52YWx1ZSA9IG51bU9ubHk7XHJcbiAgICAgICAgcmV0dXJuIHRlbElucC52YWx1ZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0ZWxJbnAsIFwidGVsSW5wXCIsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgIHJldHVybiBudW1Pbmx5O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRFbWFpbEV4dGVuc2lvbihlbWFpbElucCkge1xyXG4gICAgaWYgKGVtYWlsSW5wIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxyXG4gICAgICAgIGVtYWlsSW5wIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xyXG4gICAgICAgIGlmIChlbWFpbElucD8udmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgZW1haWxJbnAudmFsdWUgPSBcIkAuXCI7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wLnNldFNlbGVjdGlvblJhbmdlKDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlbWFpbElucD8udmFsdWUgPT09IFwiQFwiKSB7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wLnZhbHVlICs9IFwiQC5cIjtcclxuICAgICAgICAgICAgZW1haWxJbnAuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKGVtYWlsSW5wLCBgJHtlbWFpbElucD8uaWQgPz8gXCJVTkRFRklORUQgSUQgRU1BSUwgQ09OVEFJTkVSXCJ9YCwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRDRVAoQ0VQSW5wKSB7XHJcbiAgICBpZiAoQ0VQSW5wIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxyXG4gICAgICAgIENFUElucCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcclxuICAgICAgICBDRVBJbnAudmFsdWUucmVwbGFjZUFsbCgvW14wLTldL2csIFwiXCIpO1xyXG4gICAgICAgIGlmIChDRVBJbnAudmFsdWUubGVuZ3RoID49IDUgJiZcclxuICAgICAgICAgICAgQ0VQSW5wLnZhbHVlLm1hdGNoKC9bMC05XXs1LH1bXi1dWzAtOV17MSwzfS8pKVxyXG4gICAgICAgICAgICBDRVBJbnAudmFsdWUgPSBgJHtDRVBJbnAudmFsdWUuc2xpY2UoMCwgNSl9LSR7Q0VQSW5wLnZhbHVlLnNsaWNlKDUsIDkpfWA7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoQ0VQSW5wLCBcIkNFUElucFwiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZERibFF1b3RlcyhxdGVkSW5wKSB7XHJcbiAgICBpZiAocXRlZElucCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcclxuICAgICAgICBxdGVkSW5wIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xyXG4gICAgICAgIGlmIChxdGVkSW5wPy52YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICBxdGVkSW5wLnZhbHVlID0gJ1wiXCInO1xyXG4gICAgICAgICAgICBxdGVkSW5wLnNldFNlbGVjdGlvblJhbmdlKDEsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChxdGVkSW5wPy52YWx1ZSA9PT0gJ1wiJykge1xyXG4gICAgICAgICAgICBxdGVkSW5wLnZhbHVlICs9ICdcIic7XHJcbiAgICAgICAgICAgIHF0ZWRJbnAuc2V0U2VsZWN0aW9uUmFuZ2UoMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHF0ZWRJbnAsIGAke3F0ZWRJbnA/LmlkID8/IFwiVU5ERUZJTkVEIElEIFFVT1RFRCBDT05UQUlORVJcIn1gLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbn1cclxuIiwiLy8gaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5leHBvcnQgY2xhc3MgSlNPTlN0b3JhZ2VyIHtcclxuICAgICNpZDtcclxuICAgICN2YWx1ZTtcclxuICAgIGNvbnN0cnVjdG9yKGlkID0gXCJcIiwgdmFsdWUgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy4jaWQgPSBpZDtcclxuICAgICAgICB0aGlzLiN2YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBnZXQgc2hvd0lucElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNpZDtcclxuICAgIH1cclxuICAgIGdldCBzaG93SW5wVmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI3ZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IHNob3dBbGxJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiBbdGhpcy4jaWQsIHRoaXMuI3ZhbHVlXTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSlNPTlRpdGxlU3RvcmFnZXIge1xyXG4gICAgI3RpdGxlO1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy4jdGl0bGUgPSB0aXRsZTtcclxuICAgICAgICBPYmplY3QuZnJlZXplKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHNob3dJbnBUaXRsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4jdGl0bGU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFBlcnNvbiB7XHJcbiAgICBnZW47XHJcbiAgICBhZ2U7XHJcbiAgICB3ZWlnaHQ7XHJcbiAgICBoZWlnaHQ7XHJcbiAgICBzdW1EQ3V0O1xyXG4gICAgYXR2THZsO1xyXG4gICAgY29uc3RydWN0b3IoZ2VuID0gXCJtYXNjdWxpbm9cIiwgYWdlID0gMCwgd2VpZ2h0ID0gMCwgaGVpZ2h0ID0gMCwgc3VtREN1dCA9IDAsIGF0dkx2bCA9IFwibGV2ZVwiKSB7XHJcbiAgICAgICAgdGhpcy5nZW4gPSBnZW47XHJcbiAgICAgICAgdGhpcy5hZ2UgPSBhZ2U7XHJcbiAgICAgICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5zdW1EQ3V0ID0gc3VtREN1dDtcclxuICAgICAgICB0aGlzLmF0dkx2bCA9IGF0dkx2bDtcclxuICAgIH1cclxuICAgIGNoZWNrQXR2THZsKHBlcnNvbkluZm8pIHtcclxuICAgICAgICBpZiAoKChwZXJzb25JbmZvIGluc3RhbmNlb2YgTWFuIHx8XHJcbiAgICAgICAgICAgIHBlcnNvbkluZm8gaW5zdGFuY2VvZiBXb21hbiB8fFxyXG4gICAgICAgICAgICBwZXJzb25JbmZvIGluc3RhbmNlb2YgV29tYW4gfHxcclxuICAgICAgICAgICAgcGVyc29uSW5mbyBpbnN0YW5jZW9mIFBlcnNvbikgJiZcclxuICAgICAgICAgICAgXCJhdHZMdmxcIiBpbiBwZXJzb25JbmZvICYmXHJcbiAgICAgICAgICAgIHRoaXMuYXR2THZsICE9PSBcIlwiKSB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgcGVyc29uSW5mbyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBlcnNvbkluZm8gPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dkx2bCA9IHBlcnNvbkluZm87XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5hdHZMdmwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzZWRlbnRhcmlvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEuMjtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJsZXZlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEuNDtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb2RlcmFkb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxLjY7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW50ZW5zb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxLjk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibXVpdG9JbnRlbnNvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDIuMjtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gY2Fzby4gQ2FzbyBvYnRpZG86ICR7dGhpcy5hdHZMdmwgPz8gXCJudWxsXCJ9OyBDYXNvcyBwb3Nzw612ZWlzOiBzZWRlbnTDoXJpbyB8fCBsZXZlIHx8IG1vZGVyYWRvIHx8IGludGVuc28gfHwgbXVpdG9JbnRlbnNvYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgcGVzc29hLiBWYWxvciBvYnRpZG86ICR7cGVyc29uSW5mbyA/PyBcIm51bGxcIn07IGluc3TDom5jaWEgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGVyc29uSW5mbykuc2xpY2UoOCwgLTEpID8/IFwibnVsbFwifTsgVmFsb3IgZGUgTsOtdmVsIGRlIEF0aXZpZGFkZSBGw61zaWNhIG9idGlkbzogJHt0aGlzLmF0dkx2bCA/PyBcIm51bGxcIn1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgY2FsY0lNQyhwZXJzb25JbmZvKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCgocGVyc29uSW5mbyBpbnN0YW5jZW9mIE1hbiB8fFxyXG4gICAgICAgICAgICAgICAgcGVyc29uSW5mbyBpbnN0YW5jZW9mIFdvbWFuIHx8XHJcbiAgICAgICAgICAgICAgICBwZXJzb25JbmZvIGluc3RhbmNlb2YgV29tYW4gfHxcclxuICAgICAgICAgICAgICAgIHBlcnNvbkluZm8gaW5zdGFuY2VvZiBQZXJzb24pICYmXHJcbiAgICAgICAgICAgICAgICBcIndlaWdodFwiIGluIHBlcnNvbkluZm8gJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzLndlaWdodCA9PT0gXCJudW1iZXJcIiAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWlnaHQgPiAwICYmXHJcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiIGluIHRoaXMgJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzLmhlaWdodCA9PT0gXCJudW1iZXJcIiAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPiAwKSB8fFxyXG4gICAgICAgICAgICAgICAgKEFycmF5LmlzQXJyYXkocGVyc29uSW5mbykgJiZcclxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgcGVyc29uSW5mb1swXSA9PT0gXCJudW1iZXJcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBwZXJzb25JbmZvWzFdID09PSBcIm51bWJlclwiKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGVyc29uSW5mbykpIHtcclxuICAgICAgICAgICAgICAgICAgICBbdGhpcy53ZWlnaHQsIHRoaXMuaGVpZ2h0XSA9IHBlcnNvbkluZm87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBJTUMgPSB0aGlzLndlaWdodCAvIHRoaXMuaGVpZ2h0ICoqIDI7XHJcbiAgICAgICAgICAgICAgICBpZiAoSU1DICYmIElNQyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBNTEcgPSB0aGlzLndlaWdodCAtIHRoaXMud2VpZ2h0ICogKElNQyAvIDEwMCkgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoSU1DIDwgMTguNSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImFiYWl4b1wiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoSU1DID49IDE4LjUgJiYgSU1DIDwgMjUuMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImV1dHJvZmljb1wiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoSU1DID49IDI1LjAgJiYgSU1DIDwgMzApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJzb2JyZXBlc29cIiwgSU1DLCBNTEddO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAzMCAmJiBJTUMgPCAzNSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9iZXNvMVwiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoSU1DID49IDM1ICYmIElNQyA8IDQwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wib2Jlc28yXCIsIElNQywgTUxHXTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChJTUMgPiA0MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9iZXNvM1wiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gY2xhc3NpZmljYW5kbyBJTUMuIFZhbG9yIG9idGlkbzogJHtJTUMgPz8gMH07IFZhbG9yZXMgcG9zc8OtdmVpcyBkZXZlbSBzZXIgcG9zaXRpdm9zYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIGNhbGN1bGFuZG8gSU1DLiBWYWxvcmVzIHVzYWRvczogUGVzbyAke3RoaXMud2VpZ2h0ID8/IDB9IGUgQWx0dXJhICR7dGhpcy5oZWlnaHQgPz8gMH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGRhZG9zIGZvcm5lY2lkb3MuIEVsZW1lbnRvIHBlc3NvYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGVyc29uSW5mbykuc2xpY2UoOCwgLTEpID8/IFwibnVsbFwifTsgd2VpZ2h0IHByZXNlbnRlOiAke1wid2VpZ2h0XCIgaW4gcGVyc29uSW5mbyA/PyBmYWxzZX07XG4gICAgICAgICAgUGVzbyBvYnRpZG86ICR7dGhpcy53ZWlnaHQgPz8gMH07XG4gICAgICAgICAgaGVpZ2h0IHByZXNlbnRlOiAke1wiaGVpZ2h0XCIgaW4gcGVyc29uSW5mbyA/PyBmYWxzZX07XG4gICAgICAgICAgQWx0dXJhIG9idGlkYTogJHt0aGlzLmhlaWdodCA/PyAwfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoSU1DRXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihJTUNFcnJvci5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtcIlwiLCAwLCAwXTtcclxuICAgIH1cclxuICAgIGNhbGNQR0MocGVyc29uKSB7XHJcbiAgICAgICAgaWYgKChwZXJzb24gaW5zdGFuY2VvZiBNYW4gfHxcclxuICAgICAgICAgICAgcGVyc29uIGluc3RhbmNlb2YgV29tYW4gfHxcclxuICAgICAgICAgICAgcGVyc29uIGluc3RhbmNlb2YgV29tYW4gfHxcclxuICAgICAgICAgICAgcGVyc29uIGluc3RhbmNlb2YgUGVyc29uKSAmJlxyXG4gICAgICAgICAgICBcInN1bURDdXRcIiBpbiBwZXJzb24gJiZcclxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuc3VtREN1dCA9PT0gXCJudW1iZXJcIiAmJlxyXG4gICAgICAgICAgICB0aGlzLnN1bURDdXQgPj0gMCkge1xyXG4gICAgICAgICAgICBpZiAocGVyc29uIGluc3RhbmNlb2YgTWFuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgREMgPSAxLjEwOTM4IC1cclxuICAgICAgICAgICAgICAgICAgICAwLjAwMDgyNjcgKiB0aGlzLnN1bURDdXQgK1xyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwMDAxNiAqIHRoaXMuc3VtREN1dCAqKiAyIC1cclxuICAgICAgICAgICAgICAgICAgICAwLjAwMDI1NzQgKiBwZXJzb24uYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYgKERDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKERDKSlcclxuICAgICAgICAgICAgICAgICAgICBEQyA9IDAuMDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgUEdDID0gNDk1IC8gREMgLSA0NTA7XHJcbiAgICAgICAgICAgICAgICBpZiAoUEdDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKFBHQykpXHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMC4wMTtcclxuICAgICAgICAgICAgICAgIGlmIChQR0MgPiAxMDApXHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBHQztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChwZXJzb24gaW5zdGFuY2VvZiBXb21hbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IERDID0gMS4wOTk0OTIxIC1cclxuICAgICAgICAgICAgICAgICAgICAwLjAwMDk5MjkgKiB0aGlzLnN1bURDdXQgK1xyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwMDAyMyAqIHRoaXMuc3VtREN1dCAqKiAyIC1cclxuICAgICAgICAgICAgICAgICAgICAwLjAwMDEzOTIgKiBwZXJzb24uYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYgKERDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKERDKSlcclxuICAgICAgICAgICAgICAgICAgICBEQyA9IDAuMDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgUEdDID0gNDk1IC8gREMgLSA0NTA7XHJcbiAgICAgICAgICAgICAgICBpZiAoUEdDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKFBHQykpXHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMC4wMTtcclxuICAgICAgICAgICAgICAgIGlmIChQR0MgPiAxMDApXHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBHQztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChwZXJzb24gaW5zdGFuY2VvZiBOZXV0cm8pIHtcclxuICAgICAgICAgICAgICAgIGxldCBEQyA9IDEuMTA0NDM2MDUgLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwOTA5OCAqIHRoaXMuc3VtREN1dCArXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDAwMDE5NSAqIHRoaXMuc3VtREN1dCAqKiAyIC1cclxuICAgICAgICAgICAgICAgICAgICAwLjAwMDE5ODMgKiBwZXJzb24uYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYgKERDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKERDKSlcclxuICAgICAgICAgICAgICAgICAgICBEQyA9IDAuMDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgUEdDID0gNDk1IC8gREMgLSA0NTA7XHJcbiAgICAgICAgICAgICAgICBpZiAoUEdDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKFBHQykpXHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMC4wMTtcclxuICAgICAgICAgICAgICAgIGlmIChQR0MgPiAxMDApXHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBHQztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBJbnN0w6JuY2lhIGRlIG9iamV0byBpbnbDoWxpZGEuIEluc3TDom5jaWEgb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYWRvIFByb3ByaWVkYWRlIHN1bURDdXQ6XG4gICAgICBFc3TDoSBwcmVzZW50ZTogJHtcInN1bURDdXRcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgVGlwbyBwcmltaXRpdm8gZGUgc3VtREN1dDogJHt0eXBlb2YgdGhpcy5zdW1EQ3V0fTtcbiAgICAgIFZhbG9yIG9idGlkbzogJHt0aGlzLnN1bURDdXQgPz8gMH1gKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGNhbGNUTUIocGVyc29uLCBJTUMgPSAwLCBNTEcgPSAwLCBmYWN0b3JBdGxldGEgPSBcIlBlc29cIikge1xyXG4gICAgICAgIGlmIChmYWN0b3JBdGxldGEgPT09IFwicGVzb1wiKVxyXG4gICAgICAgICAgICBmYWN0b3JBdGxldGEgPSBcIlBlc29cIjtcclxuICAgICAgICBpZiAoZmFjdG9yQXRsZXRhID09PSBcIm1sZ1wiKVxyXG4gICAgICAgICAgICBmYWN0b3JBdGxldGEgPSBcIk1MR1wiO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICgocGVyc29uIGluc3RhbmNlb2YgTWFuIHx8XHJcbiAgICAgICAgICAgICAgICBwZXJzb24gaW5zdGFuY2VvZiBXb21hbiB8fFxyXG4gICAgICAgICAgICAgICAgcGVyc29uIGluc3RhbmNlb2YgV29tYW4gfHxcclxuICAgICAgICAgICAgICAgIHBlcnNvbiBpbnN0YW5jZW9mIFBlcnNvbikgJiZcclxuICAgICAgICAgICAgICAgIFwiYXR2THZsXCIgaW4gcGVyc29uICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dkx2bCAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIHRoaXMuYXR2THZsID09PSBcInN0cmluZ1wiICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgSU1DID09PSBcIm51bWJlclwiICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgTUxHID09PSBcIm51bWJlclwiICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgZmFjdG9yQXRsZXRhID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdHZMdmwgPT09IFwibXVpdG9JbnRlbnNvXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAoZmFjdG9yQXRsZXRhID09PSBcIk1MR1wiIHx8IGZhY3RvckF0bGV0YSA9PT0gXCJQZXNvXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZhY3RvckF0bGV0YSA9PT0gXCJNTEdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTUxHICYmIE1MRyA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1widGluc2xleVwiLCAyNS45ICogTUxHICsgMjg0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBNTEcuXG4gICAgICAgICAgICAgIFZhbG9yIG9idGlkbzogJHtNTEcgPz8gMH1gKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZmFjdG9yQXRsZXRhID09PSBcIlBlc29cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJ3ZWlnaHRcIiBpbiBwZXJzb24gJiYgdGhpcy53ZWlnaHQgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcInRpbnNsZXlcIiwgMjQuOCAqIHRoaXMud2VpZ2h0ICsgMTBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIHdlaWdodC5cbiAgICAgICAgICAgICAgVmFsb3Igb2J0aWRvOiAke3RoaXMud2VpZ2h0ID8/IDB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5hdHZMdmwgPT09IFwic2VkZW50YXJpb1wiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHZMdmwgPT09IFwibGV2ZVwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHZMdmwgPT09IFwibW9kZXJhZG9cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR2THZsID09PSBcImludGVuc29cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcIndlaWdodFwiIGluIHBlcnNvbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlaWdodCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiBpbiBwZXJzb24gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdlXCIgaW4gcGVyc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJTUMgPCAyNS4wICYmIElNQyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZXJzb24gaW5zdGFuY2VvZiBNYW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoYXJyaXNCZW5lZGljdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA2NiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoMTMuOCAqIHRoaXMud2VpZ2h0ICsgNS4wICogdGhpcy5oZWlnaHQgLSA2LjggKiB0aGlzLmFnZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIFdvbWFuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGFycmlzQmVuZWRpY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNjU1ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICg5LjYgKiB0aGlzLndlaWdodCArIDEuOSAqIHRoaXMuaGVpZ2h0IC0gNC43ICogdGhpcy5hZ2UpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwZXJzb24gaW5zdGFuY2VvZiBOZXV0cm8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJoYXJyaXNCZW5lZGljdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAzNjAuNSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoMTEuNyAqIHRoaXMud2VpZ2h0ICsgMy40NSAqIHRoaXMuaGVpZ2h0IC0gNS43NSAqIHRoaXMuYWdlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYSBkZSBQZXJzb24uIEluc3TDom5jaWEgb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bGxcIn1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChJTUMgPj0gMjUuMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIE1hbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1pZmZsaW5TdEplb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAgKiB0aGlzLndlaWdodCArIDYuMjUgKiB0aGlzLmhlaWdodCAtIDUuMCAqIHRoaXMuYWdlICsgNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgV29tYW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtaWZmbGluU3RKZW9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwICogdGhpcy53ZWlnaHQgKyA2LjI1ICogdGhpcy5oZWlnaHQgLSA1LjAgKiB0aGlzLmFnZSAtIDE2MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgTmV1dHJvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWlmZmxpblN0SmVvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMCAqIHRoaXMud2VpZ2h0ICsgNi4yNSAqIHRoaXMuaGVpZ2h0IC0gNS4wICogdGhpcy5hZ2UgLSA3OCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYSBkZSBQZXJzb24uIEluc3TDom5jaWEgb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwocGVyc29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoOCwgLTEpfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gSU1DLiBJTUMgb2J0aWRvOiAke0lNQyA/PyAwfTsgVmFsb3IgZGV2ZSBzZXIgbsO6bWVyaWNvLCBwb3NpdGl2byBlIGZsb2F0YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBwcm9wcmllZGFkZXMgZGUgcGVyc29uLlxuICAgICAgICAgICAgd2VpZ2h0IHByZXNlbnRlOiAke1wid2VpZ2h0XCIgaW4gcGVyc29uID8/IGZhbHNlfTtcbiAgICAgICAgICAgIFZhbG9yIGRlIHdlaWdodCBvYnRpZG86ICR7dGhpcy53ZWlnaHQgPz8gMH07XG4gICAgICAgICAgICBoZWlnaHQgcHJlc2VudGU6ICR7XCJoZWlnaHRcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgICAgICAgVmFsb3IgZGUgaGVpZ2h0IG9idGlkbzogJHt0aGlzLmhlaWdodCA/PyAwfTtcbiAgICAgICAgICAgIGFnZSBwcmVzZW50ZTogJHtcImFnZVwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICAgICAgICBgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gYXR2THZsIGUvb3UgZmFjdG9yQXRsZXRhLlxuICAgICAgICAgICAgYXR2THZsIG9idGlkbzogJHt0aGlzLmF0dkx2bCA/PyBcIm51bGxcIn1cbiAgICAgICAgICAgIEZhdG9yIG9idGlkbzogJHtmYWN0b3JBdGxldGEgPz8gXCJudWxsXCJ9OyBGYXRvcmVzIHbDoWxpZG9zOiBcIk1MR1wiIHx8IFwiUGVzb1wiYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIHBlcnNvbi5cbiAgICAgICAgRWxlbWVudG86ICR7cGVyc29uID8/IFwibnVsbFwifTtcbiAgICAgICAgSW5zdMOibmNpYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGVyc29uKS5zbGljZSg4LCAtMSkgPz8gXCJudWxsXCJ9O1xuICAgICAgICBhdHZMdmwgcHJlc2VudGU6ICR7XCJhdHZMdmxcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgICBWYWxvciBkZSBhdHZMdmwgb2J0aWRvOiAke3RoaXMuYXR2THZsID8/IFwibnVsbFwifTtcbiAgICAgICAgVGlwbyBwcmltdGlpdm8gZGUgLmF0dkx2bDogJHt0eXBlb2YgdGhpcy5hdHZMdmx9O1xuICAgICAgICBUaXBvIHByaW1pdGl2byBkZSBJTUM6ICR7dHlwZW9mIElNQ307XG4gICAgICAgIFRpcG8gcHJpbWl0aXZvIGRlIE1MRzogJHt0eXBlb2YgTUxHfTtcbiAgICAgICAgVGlwbyBwcmltaXRpdm8gZGUgZmFjdG9yQXRsZXRhOiAke3R5cGVvZiBmYWN0b3JBdGxldGF9LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChUTUJFcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFRNQkVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW1wiXCIsIDBdO1xyXG4gICAgfVxyXG4gICAgY2FsY0dFVChUTUIgPSAwLCBmYWN0b3JBdHZMdmwgPSAxLjQpIHtcclxuICAgICAgICBpZiAoVE1CICYmIGZhY3RvckF0dkx2bClcclxuICAgICAgICAgICAgcmV0dXJuIFRNQiAqIGZhY3RvckF0dkx2bDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIGFyZ3VtZW50b3MuXG4gICAgICBUTUIgb2J0aWRvOiAke1RNQiA/PyAwfTtcbiAgICAgIGZhY3RvckF0dkx2bCBvYnRpZG86ICR7ZmFjdG9yQXR2THZsID8/IDB9YCk7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY2xvbmVQZXJzb24ocGVyc29uKSB7XHJcbiAgICAgICAgaWYgKChwZXJzb24gaW5zdGFuY2VvZiBNYW4gfHxcclxuICAgICAgICAgICAgcGVyc29uIGluc3RhbmNlb2YgV29tYW4gfHxcclxuICAgICAgICAgICAgcGVyc29uIGluc3RhbmNlb2YgV29tYW4gfHxcclxuICAgICAgICAgICAgcGVyc29uIGluc3RhbmNlb2YgUGVyc29uKSAmJlxyXG4gICAgICAgICAgICBcImdlblwiIGluIHBlcnNvbiAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgcGVyc29uLmdlbiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHBlcnNvbi5nZW4pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtYXNjdWxpbm9cIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE1hbihwZXJzb24uZ2VuLCBwZXJzb24uYWdlLCBwZXJzb24ud2VpZ2h0LCBwZXJzb24uaGVpZ2h0LCBwZXJzb24uc3VtREN1dCwgcGVyc29uLmF0dkx2bCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZmVtaW5pbm9cIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdvbWFuKHBlcnNvbi5nZW4sIHBlcnNvbi5hZ2UsIHBlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHQsIHBlcnNvbi5zdW1EQ3V0LCBwZXJzb24uYXR2THZsKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJuZXV0cm9cIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE5ldXRybyhwZXJzb24uZ2VuLCBwZXJzb24uYWdlLCBwZXJzb24ud2VpZ2h0LCBwZXJzb24uaGVpZ2h0LCBwZXJzb24uc3VtREN1dCwgcGVyc29uLmF0dkx2bCk7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIC5nZW4gZGUgcGVyc29uIHBhc3NhZGEgcGFyYSAuY2xvbmVQZXJzb24oKVxuICAgICAgICAgIC5nZW4gb2J0aWRvOiAke3BlcnNvbj8uZ2VuID8/IFwibnVsbFwifS5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIHBlcnNvbi5cbiAgICAgIE9iamV0byBvYnRpZG86ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBlcnNvbikuc2xpY2UoOCwgLTEpID8/IFwibnVsbFwifTtcbiAgICAgIC5nZW4gcHJlc2VudGU6ICR7XCJnZW5cIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgVGlwbyBwcmltaXRpdm8gZGUgLmdlbjogJHt0eXBlb2YgcGVyc29uLmdlbn1gKTtcclxuICAgICAgICByZXR1cm4gcGVyc29uO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBNYW4gZXh0ZW5kcyBQZXJzb24ge1xyXG59XHJcbmV4cG9ydCBjbGFzcyBXb21hbiBleHRlbmRzIFBlcnNvbiB7XHJcbn1cclxuZXhwb3J0IGNsYXNzIE5ldXRybyBleHRlbmRzIFBlcnNvbiB7XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGV4dExpbmUgPSAoZXJyb3IpID0+IGVycm9yLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtMywgLTEpIHx8IFwiTlVMTFwiO1xyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudE5vdEZvdW5kKGVsZW1lbnQsIGVsZW1lbnROYW1lLCBsaW5lKSB7XHJcbiAgICBlbGVtZW50ID8/PSBcIlVOREVGSU5FRFwiO1xyXG4gICAgZWxlbWVudE5hbWUgfHw9IFwiVU5OQU1FRFwiO1xyXG4gICAgbGluZSB8fD0gXCJVTkRFRklORURcIjtcclxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHxcclxuICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudClcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBcbiAgRUxFTUVOVCBOT1QgRk9VTkQsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvciB2YWxpZGF0aW5nIGluc3RhbmNlIG9mICR7ZWxlbWVudD8uaWQgfHwgZWxlbWVudE5hbWUgfHwgXCJOVUxMXCJ9LlxuICBPYnRhaW5lZCBpbnN0YW5jZTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSB8fCBcIk5VTExcIn07XG4gIE9idGFpbmVkIHZhbHVlOiAke2VsZW1lbnQ/LnZhbHVlID8/IFwiTlVMTFwifS5gKTtcclxuICAgIGVsc2VcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBcbiAgRUxFTUVOVCBOT1QgRk9VTkQsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvciB2YWxpZGF0aW5nIGluc3RhbmNlIG9mICR7ZWxlbWVudD8uaWQgfHwgZWxlbWVudE5hbWUgfHwgXCJVTkRFRklORUQgSUQgT1IgTkFNRVwifS5cbiAgT2J0YWluZWQgaW5zdGFuY2U6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgfHwgXCJOVUxMXCJ9LmApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbnB1dE5vdEZvdW5kKGVsZW1lbnQsIGVsZW1lbnROYW1lLCBsaW5lKSB7XHJcbiAgICBlbGVtZW50ID8/PSBcIlVOREVGSU5FRFwiO1xyXG4gICAgZWxlbWVudE5hbWUgfHw9IFwiVU5OQU1FRFwiO1xyXG4gICAgbGluZSB8fD0gXCJVTkRFRklORURcIjtcclxuICAgIGNvbnNvbGUuZXJyb3IoYElOUFVUIE5PVCBGT1VORCwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm9yIHZhbGlkYXRpbmcgJHtlbGVtZW50Py5pZCB8fCBlbGVtZW50TmFtZSB8fCBcIlVOREVGSU5FRCBJRCBPUiBOQU1FXCJ9LlxuICBPYnRhaW5lZCBFbGVtZW50OiAke2VsZW1lbnQgPz8gXCJOVUxMXCJ9O1xuICBPYnRhaW5lZCBpbnN0YW5jZTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSB8fCBcIk5VTExcIn07XG4gIE9idGFpbmVkIHR5cGUgKG9ubHkgZm9yIDxpbnB1dD4pOiAke2VsZW1lbnQ/LnR5cGUgfHwgXCJOVUxMXCJ9O1xuICBPYnRhaW5lZCB2YWx1ZTogJHtlbGVtZW50Py52YWx1ZSB8fCBcIk5VTExcIn07XG4gIE9idGFpbmVkIC5jaGVja2VkOiAke2VsZW1lbnQ/LmNoZWNrZWQgfHwgXCJOVUxMXCJ9LmApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50V2l0aEFycmF5RXJyb3IoY29udGV4dCwgYXJyYXksIGFycmF5TmFtZSwgZWxlbWVudCwgZWxlbWVudE5hbWUsIGxpbmUpIHtcclxuICAgIGNvbnRleHQgfHw9IFwiVU5ERUZJTkVEXCI7XHJcbiAgICBhcnJheU5hbWUgfHw9IFwiVU5ERUZJTkVEIE5BTUVcIjtcclxuICAgIGFycmF5ID8/PSBcIlVOREVGSU5FRFwiO1xyXG4gICAgZWxlbWVudCA/Pz0gXCJVTkRFRklORURcIjtcclxuICAgIGVsZW1lbnROYW1lIHx8PSBcIlVOTkFNRURcIjtcclxuICAgIGxpbmUgfHw9IFwiVU5ERUZJTkVEXCI7XHJcbiAgICBjb25zb2xlLmVycm9yKGBFTEVNRU5UIFdJVEggQVJSQVkgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvciB2YWxpZGF0aW5nICR7Y29udGV4dH0uXG4gICR7ZWxlbWVudE5hbWUgPz8gXCJVTk5BTUVEXCJ9IG9idGFpbmVkOiAke0pTT04uc3RyaW5naWZ5KGFycmF5KSB8fCBudWxsfTtcbiAgSW5zdGFuY2Ugb2YgJHthcnJheU5hbWUgPz8gXCJVTk5BTUVEIEFSUkFZXCJ9IG9idGFpbmVkOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifS5gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudFdpdGhPYmplY3RFcnJvcihjb250ZXh0LCBvYmplY3QgPSB7fSwgZWxlbWVudCwgZWxlbWVudE5hbWUsIGxpbmUpIHtcclxuICAgIGNvbnRleHQgfHw9IFwiVU5ERUZJTkVEXCI7XHJcbiAgICBlbGVtZW50ID8/PSBcIlVOREVGSU5FRFwiO1xyXG4gICAgZWxlbWVudE5hbWUgfHw9IFwiVU5OQU1FRFwiO1xyXG4gICAgbGluZSB8fD0gXCJVTkRFRklORURcIjtcclxuICAgIGNvbnNvbGUuZXJyb3IoYEVMRU1FTlQgV0lUSCBPQkpFQ1QgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICAgIEVycm8gJHtjb250ZXh0ID8/IFwiVU5ERUZJTkVEXCJ9LiBFbGVtZW50bzogJHtKU09OLnN0cmluZ2lmeShvYmplY3QpIHx8IG51bGx9OyBpbnN0w6JuY2lhOiAke29iamVjdD8uY29uc3RydWN0b3I/Lm5hbWUgPz8gXCJOVUxMXCJ9XG4gICAgJHtlbGVtZW50TmFtZSA/PyBcIlVOTkFNRURcIn06IE9idGFpbmVkIGluc3RhbmNlOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifWApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50Tm90UG9wdWxhdGVkKGFycmF5LCBhcnJheU5hbWUsIGxpbmUpIHtcclxuICAgIGFycmF5ID8/PSBcIlVOREVGSU5FRFwiO1xyXG4gICAgYXJyYXlOYW1lIHx8PSBcIlVOTkFNRUQgQVJSQVlcIjtcclxuICAgIGxpbmUgfHw9IFwiVU5ERUZJTkVEXCI7XHJcbiAgICBjb25zb2xlLmVycm9yKGBFTEVNRU5UIFBPUFVMQVRJT04gRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvciB2YWxpZGF0aW5nICR7YXJyYXlOYW1lIHx8IFwiTlVMTFwifS5cbiAgQXJyYXk6ICR7QXJyYXkuaXNBcnJheShhcnJheSl9O1xuICBMaXN0IG9yIENvbGxlY3Rpb246ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycmF5KT8uc2xpY2UoOCwgLTEpIHx8IFwiTlVMTFwifTtcbiAgT2J0YWluZWQgbGVuZ3RoOiAke2FycmF5Py5sZW5ndGggfHwgXCIwXCJ9O1xuICBTdHJpbmdpZmljYXRpb246ICR7SlNPTi5zdHJpbmdpZnkoYXJyYXkpIHx8IFwiTlVMTFwifWApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQobGluZSwgY29udGV4dCwgLi4uZWxlbWVudHMpIHtcclxuICAgIGxpbmUgfHw9IFwiVU5ERUZJTkVEXCI7XHJcbiAgICBjb250ZXh0IHx8PSBcIlVOREVGSU5FRFwiO1xyXG4gICAgbGV0IGVycm9yTWVzc2FnZSA9IGBNVUxUSVBMRSBFTEVNRU5UUyBOT1QgRk9VTkQsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvciB2YWxpZGF0aW5nICR7Y29udGV4dCB8fCBcIlVuZGVmaW5lZCBGdW5jdGlvbiBOYW1lXCJ9LmA7XHJcbiAgICBjb25zdCBtYXBwZWROdWxsRWxlbWVudHMgPSBlbGVtZW50cy5tYXAoZWxlbWVudCA9PiBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCA/IFwiTlVMTFwiIDogZWxlbWVudCk7XHJcbiAgICBtYXBwZWROdWxsRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgIChlbGVtZW50LnR5cGUgPT09IFwicmFkaW9cIiB8fCBlbGVtZW50LnR5cGUgPT09IFwiY2hlY2tib3hcIikpXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gYEluc3RhbmNlIG9mICR7ZWxlbWVudC5pZCB8fCBcIk5VTExcIn0gb2J0YWluZWQ6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJ9O1xcblxuICAgICAgICAuY2hlY2tlZCBvYnRhaW5lZDogJHtlbGVtZW50Py5jaGVja2VkIHx8IFwiTlVMTFwifWA7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdGFuY2Ugb2YgJHtlbGVtZW50LmlkIHx8IFwiTlVMTFwifSBvYnRhaW5lZDogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIn07XFxuXG4gICAgICAgIE9idGFpbmVkIHZhbHVlOiAke2VsZW1lbnQ/LnZhbHVlIHx8IFwiTlVMTFwifWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0YW5jZSBvZiAke2VsZW1lbnQuaWQgfHwgXCJOVUxMXCJ9IG9idGFpbmVkOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifTtcXG5gO1xyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRzTm90Rm91bmRGdW5jdGlvbihsaW5lLCBmdW5jTmFtZSwgLi4uZWxlbWVudHMpIHtcclxuICAgIGxpbmUgfHw9IFwiVU5ERUZJTkVEXCI7XHJcbiAgICBmdW5jTmFtZSB8fD0gXCJVTkRFRklORUQgRlVOQ1RJT04gTkFNRVwiO1xyXG4gICAgbGV0IGVycm9yTWVzc2FnZSA9IGBFTEVNRU5UUyBOT1QgRk9VTkQgRk9SIEZVTkNUSU9OLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJyb3IgdmFsaWRhdGluZyBPYnRhaW5lZCBpbnN0YW5jZSBmb3IgJHtmdW5jTmFtZSB8fCBcIk5VTExcIn1gO1xyXG4gICAgY29uc3QgbWFwcGVkTnVsbEVsZW1lbnRzID0gZWxlbWVudHMubWFwKGVsZW1lbnQgPT4gZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQgPyBcIk5VTExcIiA6IGVsZW1lbnQpO1xyXG4gICAgbWFwcGVkTnVsbEVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTE9wdGlvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAoZWxlbWVudC50eXBlID09PSBcInJhZGlvXCIgfHwgZWxlbWVudC50eXBlID09PSBcImNoZWNrYm94XCIpKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0YW5jZSBvZiAke2VsZW1lbnQuaWQgfHwgXCJOVUxMXCJ9IG9idGFpbmVkOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifTtcXG5cbiAgICAgICAgLmNoZWNrZWQgb2J0YWluZWQ6ICR7ZWxlbWVudD8uY2hlY2tlZCB8fCBcIk5VTExcIn1gO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gYEluc3RhbmNlIG9mICR7ZWxlbWVudC5pZCB8fCBcIk5VTExcIn0gb2J0YWluZWQ6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJ9O1xcblxuICAgICAgICBPYnRhaW5lZCB2YWx1ZTogJHtlbGVtZW50Py52YWx1ZSB8fCBcIk5VTExcIn1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdGFuY2Ugb2YgJHtlbGVtZW50Py5pZCB8fCBcIk5VTExcIn0gb2J0YWluZWQ6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJ9O1xcbmA7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtYmVyRXJyb3IodW52YWxpZE51bWJlciwgdGl0bGUsIGxpbmUpIHtcclxuICAgIHVudmFsaWROdW1iZXIgPz89IFwiVU5ERUZJTkVEIE5VTUJFUlwiO1xyXG4gICAgaWYgKHR5cGVvZiB1bnZhbGlkTnVtYmVyID09PSBcIm51bWJlclwiKVxyXG4gICAgICAgIHVudmFsaWROdW1iZXIgPSB1bnZhbGlkTnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICB0aXRsZSB8fD0gXCJVTkRFRklORUQgVElUTEVcIjtcclxuICAgIGxpbmUgfHw9IFwiVU5ERUZJTkVEXCI7XHJcbiAgICBjb25zb2xlLmVycm9yKGBNQVggTlVNQkVSIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgTnVtYmVyIG9mICR7dGl0bGUgfHwgXCJVbmRlZmluZWQgVGl0bGVcIn0gaW52YWxpZC5cbiAgTWF4IG51bWJlciBvYnRhaW5lZDogJHtwYXJzZUludCh1bnZhbGlkTnVtYmVyLCAxMCkgfHwgMH1gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nRXJyb3IoY29udGV4dCwgdGV4dCwgbGluZSkge1xyXG4gICAgY29udGV4dCB8fD0gXCJVTkRFRklORUQgQ09OVEVYVFwiO1xyXG4gICAgdGV4dCB8fD0gXCJVTkRFRklORURcIjtcclxuICAgIGxpbmUgfHw9IFwiVU5ERUZJTkVEXCI7XHJcbiAgICBjb25zb2xlLmVycm9yKGBTVFJJTkcgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvciB2YWxpZGF0aW5nICR7Y29udGV4dH0uXG4gIFZhbHVlIG9idGFpbmVkOiAke3RleHQgPz8gXCJOVUxMXCJ9YCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoRXJyb3IoY29udGV4dCwgZWxlbWVudCwgdGV4dCwgbGluZSkge1xyXG4gICAgY29udGV4dCB8fD0gXCJVTkRFRklORUQgQ09OVEVYVFwiO1xyXG4gICAgZWxlbWVudCA/Pz0gXCJVTkRFRklORURcIjtcclxuICAgIHRleHQgfHw9IFwiVU5ERUZJTkVEXCI7XHJcbiAgICBsaW5lIHx8PSBcIlVOREVGSU5FRFwiO1xyXG4gICAgY29uc29sZS5lcnJvcihgTUFUQ0ggRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvciB2YWxpZGF0aW5nICR7Y29udGV4dCB8fCBcIlVOREVGSU5FRFwifS5cbiAgT2J0YWluZWQgRWxlbWVudDogJHtlbGVtZW50IHx8IFwiVU5ERUZJTkVEXCJ9O1xuICBUaXRsZSBvYnRhaW5lZDogJHt0ZXh0IHx8IFwiVW5kZWZpbmVkIFRpdGxlXCJ9LmApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB0eXBlRXJyb3IoY29udGV4dCwgZWxlbWVudCwgYWNjZXB0ZWRUeXBlLCBsaW5lKSB7XHJcbiAgICBjb250ZXh0IHx8PSBcIlVOREVGSU5FRCBDT05URVhUXCI7XHJcbiAgICBlbGVtZW50ID8/PSBcIlVOREVGSU5FRFwiO1xyXG4gICAgYWNjZXB0ZWRUeXBlIHx8PSBcIlVOREVGSU5FRFwiO1xyXG4gICAgbGluZSB8fD0gXCJVTkRFRklORURcIjtcclxuICAgIGNvbnNvbGUuZXJyb3IoYFRZUEUgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBQcmltaXRpdmUgdHlwZSBvYnRhaW5lZCBmb3IgJHtjb250ZXh0IHx8IFwiVU5ERUZJTkVEXCJ9IGluY29ycmVjdC5cbiAgVHlwZSBvYnRhaW5lZDogJHt0eXBlb2YgZWxlbWVudCA/PyBcIlVuZGVmaW5lZCB0eXBlb2ZcIn07XG4gIFR5cGUgYWNjZXB0ZWQ6ICR7YWNjZXB0ZWRUeXBlIHx8IFwiVW5kZWZpbmVkIEFjY2VwdGVkIFR5cGVcIn1gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0RXJyb3IoY29udGV4dCwgb2JqZWN0ID0ge30sIG9iamVjdE5hbWUsIG1heFByb3BlcnRpZXNOdW1iZXIsIGxpbmUpIHtcclxuICAgIGNvbnRleHQgfHw9IFwiVU5ERUZJTkVEIENPTlRFWFRcIjtcclxuICAgIG9iamVjdE5hbWUgfHw9IFwiVU5ERUZJTkVEXCI7XHJcbiAgICBtYXhQcm9wZXJ0aWVzTnVtYmVyIHx8PSBcIlVOREVGSU5FRFwiO1xyXG4gICAgbGluZSB8fD0gXCJVTkRFRklORURcIjtcclxuICAgIGNvbnNvbGUuZXJyb3IoYE9CSkVDVCBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm9yIHZhbGlkYXRpbmcgJHtvYmplY3ROYW1lID8/IFwiVU5ERUZJTkVEIE9CSkVDVCBOQU1FXCJ9IGZvciAke2NvbnRleHQgfHwgXCJVTkRFRklORURcIn0uXG4gIE9iamVjdCBvYnRhaW5lZDogJHtKU09OLnN0cmluZ2lmeShvYmplY3QpIHx8IFwiVW5kZWZpbmVkIE9iamVjdFwifTtcbiAgTsO6bWVybyBvYnRhaW5lZCBvZiBwcm9wZXJ0aWVzOiAke09iamVjdC5rZXlzLmxlbmd0aCA/PyAwfTsgTsO6bWVybyBhY2NlcHRlZDogJHttYXhQcm9wZXJ0aWVzTnVtYmVyID8/IDB9YCk7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgR2xvYmFsTW9kZWwgZnJvbSBcIi4vZ01vZGVsXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbEhhbmRsZXIgZnJvbSBcIi4vZ0hhbmRsZXJzXCI7XHJcbmltcG9ydCAqIGFzIEVycm9ySGFuZGxlciBmcm9tIFwiLi9lcnJvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgZXh0TGluZSB9IGZyb20gXCIuL2Vycm9ySGFuZGxlclwiO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2xvYmFsRWxzKGlzQXV0b2NvcnJlY3RPbiA9IHRydWUsIGZpcnN0Q2xpY2sgPSB0cnVlLCBjb250ZXh0ID0gXCJub3ROdW1cIikge1xyXG4gICAgY29uc3QgdGV4dENvbnRzID0gW1xyXG4gICAgICAgIC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZXh0YXJlYVwiKSxcclxuICAgICAgICAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IHJhZGlvSW5wcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJykpO1xyXG4gICAgY29uc3QgZGF0ZUJ0bnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbltpZCQ9XCJEYXRCdG5cIl0nKSk7XHJcbiAgICBjb25zdCBkZWFjdEF1dG9jb3JyZWN0QnRucyA9IFtcclxuICAgICAgICAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25baWRePVwiZGVhY3RBdXRvY29ycmVjdEJ0blwiXScpLFxyXG4gICAgICAgIC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2lkXj1cImRlYWN0QXV0b2NvcnJlY3RCdG5cIl0nKSxcclxuICAgIF07XHJcbiAgICBjb25zdCBhc3REaWd0QnRucyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2lkJD1cIkFzdERpZ3RCdG4nKSk7XHJcbiAgICBjb25zdCBlZGl0YWJsZUNpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjaXRlW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0nKTtcclxuICAgIGNvbnN0IHJlc2V0Rm9ybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXRGb3JtQnRuXCIpO1xyXG4gICAgY29uc3Qgc3ViQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRGb3JtQnV0SWRcIik7XHJcbiAgICB0ZXh0Q29udHM/Lmxlbmd0aCA+IDBcclxuICAgICAgICA/IGFkZExpc3RlbmVyVGV4dHModGV4dENvbnRzLCBpc0F1dG9jb3JyZWN0T24pXHJcbiAgICAgICAgOiBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZCh0ZXh0Q29udHMsIFwidGV4dENvbnRzXCIsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgIHJhZGlvSW5wcz8ubGVuZ3RoID4gMFxyXG4gICAgICAgID8gYWRkTGlzdGVuZXJSYWRpb3MocmFkaW9JbnBzLCBcImVkXCIpXHJcbiAgICAgICAgOiBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChyYWRpb0lucHMsIFwicmFkaW9JbnBzXCIsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgIGRhdGVCdG5zPy5sZW5ndGggPiAwXHJcbiAgICAgICAgPyBhZGRMaXN0ZW5lckRhdGVCdG5zKGRhdGVCdG5zKVxyXG4gICAgICAgIDogRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoZGF0ZUJ0bnMsIFwiZGF0ZUJ0bnNcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgYXN0RGlndEJ0bnM/Lmxlbmd0aCA+IDBcclxuICAgICAgICA/IGFkZExpc3RlbmVyQXN0RGlnaXRCdG5zKGFzdERpZ3RCdG5zKVxyXG4gICAgICAgIDogRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoYXN0RGlndEJ0bnMsIFwiYXN0RGlndEJ0bnNcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgc3ViQnV0dG9uIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnRcclxuICAgICAgICA/IHN1YkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gR2xvYmFsSGFuZGxlci5zdWJGb3JtKHN1YkJ1dHRvbikpXHJcbiAgICAgICAgOiBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKHN1YkJ1dHRvbiwgXCJzdWJCdXR0b25cIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgcmVzZXRGb3JtQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnRcclxuICAgICAgICA/IHJlc2V0Rm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrKSA9PiBHbG9iYWxIYW5kbGVyLnJlc2V0YXJGb3JtdWxhcmlvKGNsaWNrLCBhc3REaWd0QnRucywgcmVzZXRGb3JtQnRuKSlcclxuICAgICAgICA6IEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQocmVzZXRGb3JtQnRuLCBcInJlc2V0Rm9ybUJ0blwiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICBpZiAoY29udGV4dCA9PT0gXCJudW1cIikge1xyXG4gICAgICAgIGNvbnN0IG51bUlucHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nKSk7XHJcbiAgICAgICAgbnVtSW5wcz8ubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICA/IGFkZExpc3RlbmVyTnVtSW5wcyhudW1JbnBzKVxyXG4gICAgICAgICAgICA6IEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKG51bUlucHMsIFwibnVtSW5wc1wiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICB9XHJcbiAgICBkZWFjdEF1dG9jb3JyZWN0QnRucz8ubGVuZ3RoID4gMFxyXG4gICAgICAgID8gKGlzQXV0b2NvcnJlY3RPbiA9IGFkZExpc3RlbmVyQXV0b2NvcnJlY3RCdG5zKGRlYWN0QXV0b2NvcnJlY3RCdG5zLCBpc0F1dG9jb3JyZWN0T24pKVxyXG4gICAgICAgIDogRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoZGVhY3RBdXRvY29ycmVjdEJ0bnMsIFwiZGVhY3RBdXRvQ29ycmVjdEJ0bnNcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgZmlyc3RDbGljayA9IGFkZExpc3RlbmVyQ2l0ZShlZGl0YWJsZUNpdGUsIGlzQXV0b2NvcnJlY3RPbiwgZmlyc3RDbGljayk7XHJcbiAgICByZXR1cm4gW2lzQXV0b2NvcnJlY3RPbiB8fCB0cnVlLCBmaXJzdENsaWNrIHx8IGZhbHNlXTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGlzdGVuZXJUZXh0cyh0ZXh0Q29udHMsIGlzQXV0b2NvcnJlY3RPbiA9IHRydWUpIHtcclxuICAgIGlmICh0ZXh0Q29udHMuZXZlcnkoZWwgPT4gZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgICB0ZXh0Q29udHMuZm9yRWFjaCh0ZXh0Q29udCA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0Q29udD8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXV0b2NvcnJlY3RcIikpIHtcclxuICAgICAgICAgICAgICAgIHRleHRDb250IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICh0ZXh0Q29udCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgdGV4dENvbnQudHlwZSA9PT0gXCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgPyB0ZXh0Q29udC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0F1dG9jb3JyZWN0T24gPSBHbG9iYWxNb2RlbC5jaGVja0F1dG9Db3JyZWN0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltpZF49XCJkZWFjdEF1dG9jb3JyZWN0QnRuXCJdJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W2lkXj1cImRlYWN0QXV0b2NvcnJlY3RCdG5cIl0nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlzQXV0b2NvcnJlY3RPbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbE1vZGVsLmF1dG9DYXBpdGFsaXplSW5wdXRzKHRleHRDb250LCBpc0F1dG9jb3JyZWN0T24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgOiBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0ZXh0Q29udCwgYHRhcmdldCB0ZXh0Q29udCBpZCAke0pTT04uc3RyaW5naWZ5KHRleHRDb250Py5pZCB8fCBcIlVOSURFTlRJRklFRCBURVhUQ09OVFwiKX1gLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhcyBlbSB0ZXh0Q29udHNgKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGlzdGVuZXJOdW1JbnBzKG51bUlucHMpIHtcclxuICAgIGlmIChudW1JbnBzLmV2ZXJ5KGVsID0+IGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgICAgbnVtSW5wcy5mb3JFYWNoKG51bUlucCA9PiB7XHJcbiAgICAgICAgICAgIG51bUlucCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgbnVtSW5wLnR5cGUgPT09IFwibnVtYmVyXCJcclxuICAgICAgICAgICAgICAgID8gbnVtSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsTW9kZWwubnVtYmVyTGltaXQobnVtSW5wKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA6IEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKG51bUlucCwgYHRhcmdldCBudW1JbnAgaWQgJHtKU09OLnN0cmluZ2lmeShudW1JbnA/LmlkIHx8IFwiVU5JREVOVElGSUVEIFRFWFRDT05UXCIpfWAsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhcyBlbSBudW1JbnBzYCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyUmFkaW9zKHJhZGlvSW5wcywgY29udGV4dCA9IFwib2RcIikge1xyXG4gICAgaWYgKHJhZGlvSW5wcy5ldmVyeShlbCA9PiBlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSAmJlxyXG4gICAgICAgIChjb250ZXh0ID09PSBcIm9kXCIgfHwgY29udGV4dCA9PT0gXCJlZFwiIHx8IGNvbnRleHQgPT09IFwiYWdcIikpIHtcclxuICAgICAgICByYWRpb0lucHMuZm9yRWFjaChyYWRpbyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyYWRpbyBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgcmFkaW8udHlwZSA9PT0gXCJyYWRpb1wiKSB7XHJcbiAgICAgICAgICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoa2V5ZG93bikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbEhhbmRsZXIub3BSYWRpb0hhbmRsZXIoa2V5ZG93biwgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtpZCQ9XCJZZXNcIl0sIGlucHV0W2lkJD1cIk5vXCJdJyAvL2FjZXNzYW5kbyBjb21vIHBhclxyXG4gICAgICAgICAgICAgICAgICAgICkpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsICgpID0+IEdsb2JhbEhhbmRsZXIuZG91YmxlQ2xpY2tIYW5kbGVyKHJhZGlvKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dCA9PT0gXCJlZFwiIHx8IGNvbnRleHQgPT09IFwiYWdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGNoYW5nZSkgPT4gR2xvYmFsSGFuZGxlci5jcGJJbnBIYW5kbGVyKGNoYW5nZSwgcmFkaW8pKTtcclxuICAgICAgICAgICAgICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoa2V5ZG93bikgPT4gR2xvYmFsSGFuZGxlci5jcGJJbnBIYW5kbGVyKGtleWRvd24sIHJhZGlvKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQgPT09IFwiYWdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiBHbG9iYWxIYW5kbGVyLmRlYWN0VGV4dElucHV0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl1baWQkPU51bUlkXScpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbaWQkPU51bGxJZF1cIikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIEdsb2JhbEhhbmRsZXIudG91Y2hTdGFydEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHJhZGlvLCBgdGFyZ2V0IHJhZGlvIGlkICR7cmFkaW8/LmlkIHx8IFwiVU5ERUZJTkVEIElEIFJBRElPXCJ9YCwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWFzIGVtIHJhZGlvSW5wc2ApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMaXN0ZW5lckRhdGVCdG5zKGRhdGVCdG5zKSB7XHJcbiAgICBpZiAoZGF0ZUJ0bnMuZXZlcnkoZWwgPT4gZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgICBkYXRlQnRucy5mb3JFYWNoKGRhdGVCdG4gPT4ge1xyXG4gICAgICAgICAgICBkYXRlQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnRcclxuICAgICAgICAgICAgICAgID8gZGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGFjdGl2YXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWxIYW5kbGVyLnVzZUN1cnJlbnREYXRlKGFjdGl2YXRpb24sIGRhdGVCdG4pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDogRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChkYXRlQnRuLCBgdGFyZ2V0IGRhdGVCdG4gaWQgJHtkYXRlQnRuPy5pZCB8fCBcIlVOREVGSU5FRCBJRCBEQVRFQlROXCJ9YCwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWFzIGVtIGRhdGVCdG5zYCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyQ2l0ZShlZGl0YWJsZUNpdGUsIGlzQXV0b2NvcnJlY3RPbiA9IHRydWUsIGZpcnN0Q2xpY2sgPSB0cnVlKSB7XHJcbiAgICBpZiAoZWRpdGFibGVDaXRlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBjaXRlQ2xpY2tIYW5kbGVyID0gKGNsaWNrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaXJzdENsaWNrICYmIGNsaWNrLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWxNb2RlbC5yZW1vdmVGaXJzdENsaWNrKGNsaWNrLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBmaXJzdENsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNpdGVDbGlja0hhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBlZGl0YWJsZUNpdGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChrZXlwcmVzcykgPT4ge1xyXG4gICAgICAgICAgICBrZXlwcmVzcy50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxyXG4gICAgICAgICAgICAgICAgPyBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUNpdGUoa2V5cHJlc3MudGFyZ2V0LCBpc0F1dG9jb3JyZWN0T24pXHJcbiAgICAgICAgICAgICAgICA6IEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoa2V5cHJlc3MudGFyZ2V0LCBcImtleXByZXNzIHdpdGggZWRpdGFibGVDaXRlIGFzIGEgdGFyZ2V0XCIsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlZGl0YWJsZUNpdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNpdGVDbGlja0hhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQobnVsbCwgXCJlZGl0YWJsZUNpdGVcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgcmV0dXJuIGZpcnN0Q2xpY2sgfHwgZmFsc2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyQXV0b2NvcnJlY3RCdG5zKGRlYWN0QXV0b2NvcnJlY3RCdG5zLCBpc0F1dG9jb3JyZWN0T24gPSB0cnVlKSB7XHJcbiAgICBpZiAoZGVhY3RBdXRvY29ycmVjdEJ0bnMuZXZlcnkoZWwgPT4gZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgICBkZWFjdEF1dG9jb3JyZWN0QnRucy5mb3JFYWNoKGRlYWN0QXV0b2NvcnJlY3RCdG4gPT4ge1xyXG4gICAgICAgICAgICBkZWFjdEF1dG9jb3JyZWN0QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQgfHxcclxuICAgICAgICAgICAgICAgIChkZWFjdEF1dG9jb3JyZWN0QnRuIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChkZWFjdEF1dG9jb3JyZWN0QnRuLnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWFjdEF1dG9jb3JyZWN0QnRuLnR5cGUgPT09IFwicmFkaW9cIikpXHJcbiAgICAgICAgICAgICAgICA/IGRlYWN0QXV0b2NvcnJlY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChjbGljaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0b2NvcnJlY3RPbiA9IEdsb2JhbE1vZGVsLnN3aXRjaEF1dG9jb3JyZWN0KGNsaWNrLCBkZWFjdEF1dG9jb3JyZWN0QnRuLCBpc0F1dG9jb3JyZWN0T24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlzQXV0b2NvcnJlY3RPbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzQXV0b2NvcnJlY3RPbjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA6IEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKGRlYWN0QXV0b2NvcnJlY3RCdG5zLCBgdGFyZ2V0IGRlYWN0QXV0b2NvcnJlY3RCdG4gaWQgJHtkZWFjdEF1dG9jb3JyZWN0QnRuPy5pZCB8fCBcIlVOREVGSU5FRCBJRCBCVVRUT05cIn1gLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYXMgZW0gZGVhY3RBdXRvY29ycmVjdEJ0bnNgKTtcclxuICAgIHJldHVybiBpc0F1dG9jb3JyZWN0T24gfHwgdHJ1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGlzdGVuZXJBc3REaWdpdEJ0bnMoYXN0RGlndEJ0bnMpIHtcclxuICAgIGlmIChhc3REaWd0QnRucy5ldmVyeShlbCA9PiBlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgIGFzdERpZ3RCdG5zLmZvckVhY2goYXN0RGlndEJ0biA9PiB7XHJcbiAgICAgICAgICAgIGFzdERpZ3RCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudFxyXG4gICAgICAgICAgICAgICAgPyBhc3REaWd0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoY2xpY2spID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWxIYW5kbGVyLmNoYW5nZVRvQXN0RGlnaXQoY2xpY2ssIGFzdERpZ3RCdG4pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDogRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChhc3REaWd0QnRuLCBhc3REaWd0QnRuPy5pZCB8fCBcIlVOREVGSU5FRCBJRCBCVVRUT05cIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWFzIGVtIGFzdERpZ3RCdG5zYCk7XHJcbn1cclxuLy8gLy8gZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyR2VuQ29udChcclxuLy8gLy8gICBnZW5FbGVtZW50czogZW50cnlFbFtdLFxyXG4vLyAvLyAgIGdlbkVsSW5kZXg6IG51bWJlciA9IDAsXHJcbi8vIC8vICAgZ2VuVmFsdWU6IHN0cmluZyA9IFwibWFzY3VsaW5vXCJcclxuLy8gLy8gKTogc3RyaW5nIHtcclxuLy8gLy8gICBjb25zdCBnZW5FbCA9IGdlbkVsZW1lbnRzW2dlbkVsSW5kZXhdO1xyXG4vLyAvLyAgIGdlbkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG4vLyAvLyAgICAgZ2VuVmFsdWUgPVxyXG4vLyAvLyAgICAgICBHbG9iYWxNb2RlbC5mbHV4R2VuKGdlbkVsZW1lbnRzLCAoZ2VuRWwgYXMgZW50cnlFbCk/LnZhbHVlKSB8fCBnZW5WYWx1ZTtcclxuLy8gLy8gICB9KTtcclxuLy8gLy8gICByZXR1cm4gZ2VuVmFsdWU7XHJcbi8vIC8vIH1cclxuIiwiLy9uZXNzZSBmaWxlIGVzdMOjbyBwcmVzZW50ZXMgcHJpbmNpcGFsbWVudGUgYXMgZnVuw6fDtWVzIGRlIG1hbmlwdWxhw6fDo28gZGluw6JtaWNhIGRlIHRleHRvIGUgbGF5b3V0XHJcbmltcG9ydCAqIGFzIEdsb2JhbE1vZGVsIGZyb20gXCIuL2dNb2RlbFwiO1xyXG5pbXBvcnQgeyBKU09OU3RvcmFnZXIsIEpTT05UaXRsZVN0b3JhZ2VyIH0gZnJvbSBcIi4vY2xhc3Nlc1wiO1xyXG5pbXBvcnQgKiBhcyBFcnJvckhhbmRsZXIgZnJvbSBcIi4vZXJyb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IGV4dExpbmUgfSBmcm9tIFwiLi9lcnJvckhhbmRsZXJcIjtcclxuLy8gaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuY29uc3QgbWFwSWRzVGl0bGVzID0ge1xyXG4gICAgZmlyc3ROYW1lSWQ6IFwiUHJpbWVpcm9fTm9tZVwiLFxyXG4gICAgYWRkaXRpb25hbE5hbWVJZDogXCJTb2JyZW5vbWVfZG9fTWVpb1wiLFxyXG4gICAgZmFtaWx5TmFtZUlkOiBcIsOabHRpbW9fU29icmVub21lXCIsXHJcbiAgICBzb2NpYWxOYW1lSWQ6IFwiTm9tZV9Tb2NpYWxcIixcclxuICAgIHRlbEFyZWFDb2RlSWQ6IFwiREREXCIsXHJcbiAgICB0ZWxJZDogXCJUZWxlZm9uZVwiLFxyXG4gICAgdGVsQ291bnRyeUNvZGVJZDogXCJTZV9lc3RyYW5nZWlybyxfY8OzZGlnb19kb19QYcOtc1wiLFxyXG4gICAgdGVsMkFyZWFDb2RlSWQ6IFwiREREX0RvX1RlbGVmb25lX1NlY3VuZMOhcmlvXCIsXHJcbiAgICB0ZWwySWQ6IFwiVGVsZWZvbmVfU2VjdW5kw6FyaW9cIixcclxuICAgIHRlbDJDb3VudHJ5Q29kZUlkOiBcIlNlX2VzdHJhbmdlaXJvKHNlY3VuZMOhcmlvKSxfY8OzZGlnb19kb19QYcOtc1wiLFxyXG4gICAgZW1haWwxSWQ6IFwiRW1haWxcIixcclxuICAgIGVtYWlsMklkOiBcIkVtYWlsX1NlY3VuZMOhcmlvXCIsXHJcbiAgICBkYXRlQWdlSWQ6IFwiSWRhZGVcIixcclxuICAgIGdlbmlkOiBcIkfDqm5lcm9cIixcclxuICAgIGdlbkJpcnRoUmVsSWQ6IFwiSWRlbnRpZGFkZV9lbV9yZWxhw6fDo29fYW9fZ8OqbmVyb19kZXNpZ25hZG9fbmFfbmFzY2Vuw6dhXCIsXHJcbiAgICBnZW5UcmFuc0lkOiBcIkVzdMOhZ2lvX2RhX1RyYW5zacOnw6NvX0hvcm1vbmFsXCIsXHJcbiAgICBnZW5GaXNBbGluSWQ6IFwiQWxpbmhhbWVudG9fZGVfY2FyYWN0ZXLDrXN0aWNhc19mw61zaWNhc19wcmVkb21pbmFudGVcIixcclxufTtcclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNpbXBsZVByb3BlcnR5KGVsKSB7XHJcbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKGVsLnR5cGUgPT09IFwicmFkaW9cIiB8fCBlbC50eXBlID09PSBcImNoZWNrYm94XCIpXHJcbiAgICAgICAgICAgIHJldHVybiBlbC5jaGVja2VkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZWwudHlwZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlRmxvYXQoZWwudmFsdWU/LnJlcGxhY2VBbGwoL1teMC05LiwrLV0vZywgXCJcIikpKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChlbC52YWx1ZT8ucmVwbGFjZUFsbCgvW14wLTkuLCstXS9nLCBcIlwiKSkgPz8gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gZWwudmFsdWUgfHwgXCIwXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgZWwgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KVxyXG4gICAgICAgIHJldHVybiBlbC52YWx1ZTtcclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChlbCwgXCJlbCBpbiB1cGRhdGVTaW1wbGVQcm9wZXJ0eVwiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICByZXR1cm4gXCItMVwiO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjdXJzb3JDaGVja1RpbWVyKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgaWYgKHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZm9jdXNOb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKT8uc3RhcnRPZmZzZXQ7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb3BSYWRpb0hhbmRsZXIoa2V5ZG93biwgcmFkaW9QYWlycykge1xyXG4gICAgaWYgKGtleWRvd24gaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50ICYmXHJcbiAgICAgICAgcmFkaW9QYWlycy5ldmVyeShyYWRpb1BhaXIgPT4gcmFkaW9QYWlyIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvUGFpcnMubGVuZ3RoOyBpICs9IDIgLy9wdWxhbmRvIGRlIHBhciBlbSBwYXJcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgcmFkaW9ZZXMgPSByYWRpb1BhaXJzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCByYWRpb05vID0gcmFkaW9QYWlyc1tpICsgMV07XHJcbiAgICAgICAgICAgIGlmICghcmFkaW9ZZXMgfHwgIXJhZGlvTm8pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgaWYgKHJhZGlvWWVzIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgKHJhZGlvWWVzLnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fCByYWRpb1llcy50eXBlID09PSBcInJhZGlvXCIpICYmXHJcbiAgICAgICAgICAgICAgICByYWRpb05vIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgKHJhZGlvTm8udHlwZSA9PT0gXCJjaGVja2JveFwiIHx8IHJhZGlvTm8udHlwZSA9PT0gXCJyYWRpb1wiKSAmJlxyXG4gICAgICAgICAgICAgICAgIXJhZGlvWWVzLmNoZWNrZWQgJiZcclxuICAgICAgICAgICAgICAgICFyYWRpb05vLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXlkb3duLmFsdEtleSAmJiBrZXlkb3duLmtleSA9PT0gXCJ5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByYWRpb1llcy5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvWWVzLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpb1llcy5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoa2V5ZG93bi5hbHRLZXkgJiYga2V5ZG93bi5rZXkgPT09IFwiblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9Oby5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvTm8uY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvTm8uYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKGV4dExpbmUobmV3IEVycm9yKCkpLCBgdmFsaWRhbmRvIHJhZGlvWWVzIGlkICR7cmFkaW9ZZXM/LmlkID8/IFwiVU5ERUZJTkVEIElEXCJ9IG91IHJhZGlvc05vIGlkICR7cmFkaW9Obz8uaWQgPz8gXCJVTkRFRklORUQgSURcIn1gLCByYWRpb1llcywgcmFkaW9Obyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHZhbGlkYXRpbmcgS2V5Ym9hcmRFdmVudCBpbiBvcFJhZGlvSGFuZGxlci5gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY3BiSW5wSGFuZGxlcihldiwgcmFkaW8pIHtcclxuICAgIGlmIChldiBpbnN0YW5jZW9mIEV2ZW50ICYmXHJcbiAgICAgICAgcmFkaW8gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgcmFkaW8/LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBkaXZBZGRzID0gcmFkaW8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvckFsbChcImRpdltpZF49J2RpdkFkZCddXCIpIHx8XHJcbiAgICAgICAgICAgIHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZbaWRePSdkaXZBZGQnXVwiKTtcclxuICAgICAgICBjb25zdCB0ZXh0QWRkcyA9IHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZXh0YXJlYVtpZF49J3RleHRBZGQnXVwiKSB8fFxyXG4gICAgICAgICAgICByYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2W2lkXj0ndGV4dEFkZCddXCIpO1xyXG4gICAgICAgIC8vaW5jbHVpIGFtYm9zIG9zIHRpcG9zIGRlIGV2ZW50b3NcclxuICAgICAgICByYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50XHJcbiAgICAgICAgICAgID8ucXVlcnlTZWxlY3RvckFsbChcImlucHV0W2lkXj0nQ3BiJ11baWQkPSdZZXMnXVwiKVxyXG4gICAgICAgICAgICA/LmZvckVhY2goKG9wUmFkaW9DaGVjaywgaSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGl2QWRkID0gZGl2QWRkc1tpXTtcclxuICAgICAgICAgICAgZGl2QWRkID8/PSBzZWFyY2hOZXh0U2libGluZ3MocmFkaW8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudCwgXCJkaXZBZGRcIik7XHJcbiAgICAgICAgICAgIGlmIChkaXZBZGQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgb3BSYWRpb0NoZWNrIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgKG9wUmFkaW9DaGVjay50eXBlID09PSBcImNoZWNrYm94XCIgfHwgb3BSYWRpb0NoZWNrLnR5cGUgPT09IFwicmFkaW9cIikpIHtcclxuICAgICAgICAgICAgICAgIG9wUmFkaW9DaGVjay5jaGVja2VkXHJcbiAgICAgICAgICAgICAgICAgICAgPyAoZGl2QWRkLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAoZGl2QWRkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXJhZGlvLmNsYXNzTGlzdC5jb250YWlucyhcInJhZE9EXCIpKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXZBZGRQYWlyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAocmFkaW8ucGFyZW50RWxlbWVudD8ubmV4dEVsZW1lbnRTaWJsaW5nPy5jbGFzc0xpc3QuY29udGFpbnMoXCJkaXZBZGRcIikpXHJcbiAgICAgICAgICAgICAgICBkaXZBZGRQYWlyID0gcmFkaW8ucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChyYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5uZXh0RWxlbWVudFNpYmxpbmc/LmNsYXNzTGlzdC5jb250YWlucyhcImRpdkFkZFwiKSlcclxuICAgICAgICAgICAgICAgIGRpdkFkZFBhaXIgPSByYWRpby5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChyYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5uZXh0RWxlbWVudFNpYmxpbmc/LmNsYXNzTGlzdC5jb250YWlucyhcImRpdkFkZFwiKSlcclxuICAgICAgICAgICAgICAgIGRpdkFkZFBhaXIgPVxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgaWYgKGRpdkFkZFBhaXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmFkaW8uY2hlY2tlZCAmJiByYWRpby5pZC5tYXRjaCgvWWVzLylcclxuICAgICAgICAgICAgICAgICAgICA/IChkaXZBZGRQYWlyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAoZGl2QWRkUGFpci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnRcclxuICAgICAgICAgICAgPy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbaWRePSdwYiddW2lkJD0nWWVzJ11cIilcclxuICAgICAgICAgICAgPy5mb3JFYWNoKChvcFJhZGlvVGV4dCwgaSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGV4dEFkZCA9IHRleHRBZGRzW2ldO1xyXG4gICAgICAgICAgICB0ZXh0QWRkID8/PVxyXG4gICAgICAgICAgICAgICAgc2VhcmNoTmV4dFNpYmxpbmdzKHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQsIFwidGV4dEFkZFwiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaE5leHRTaWJsaW5ncyhyYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50LCBcImRpdkFkZFwiKTtcclxuICAgICAgICAgICAgaWYgKHRleHRBZGQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgb3BSYWRpb1RleHQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAob3BSYWRpb1RleHQudHlwZSA9PT0gXCJjaGVja2JveFwiIHx8IG9wUmFkaW9UZXh0LnR5cGUgPT09IFwicmFkaW9cIikpIHtcclxuICAgICAgICAgICAgICAgICFvcFJhZGlvVGV4dC5jaGVja2VkXHJcbiAgICAgICAgICAgICAgICAgICAgPyAodGV4dEFkZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAodGV4dEFkZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnRcclxuICAgICAgICAgICAgPy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbaWRePSdwYiddW2lkJD0nWWVzJ11cIilcclxuICAgICAgICAgICAgPy5mb3JFYWNoKChvcFJhZGlvVGV4dCwgaSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGV4dEFkZCA9IHRleHRBZGRzW2ldO1xyXG4gICAgICAgICAgICB0ZXh0QWRkID8/PVxyXG4gICAgICAgICAgICAgICAgc2VhcmNoTmV4dFNpYmxpbmdzKHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQsIFwidGV4dEFkZFwiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaE5leHRTaWJsaW5ncyhyYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50LCBcImRpdkFkZFwiKTtcclxuICAgICAgICAgICAgaWYgKHRleHRBZGQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgb3BSYWRpb1RleHQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAob3BSYWRpb1RleHQudHlwZSA9PT0gXCJjaGVja2JveFwiIHx8IG9wUmFkaW9UZXh0LnR5cGUgPT09IFwicmFkaW9cIikpIHtcclxuICAgICAgICAgICAgICAgICFvcFJhZGlvVGV4dC5jaGVja2VkXHJcbiAgICAgICAgICAgICAgICAgICAgPyAodGV4dEFkZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAodGV4dEFkZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnRcclxuICAgICAgICAgICAgPy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbaWRePSdhbnRGYW0nXVwiKVxyXG4gICAgICAgICAgICA/LmZvckVhY2goYW50RmFtQ2hlY2sgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjbG9zZXN0QWRkRWxlbWVudCA9IGFudEZhbUNoZWNrPy5wYXJlbnRFbGVtZW50Py5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChjbG9zZXN0QWRkRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50IHx8XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0QWRkRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTcGFuRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgYW50RmFtQ2hlY2sgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKGFudEZhbUNoZWNrLnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fCBhbnRGYW1DaGVjay50eXBlID09PSBcInJhZGlvXCIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWFudEZhbUNoZWNrLmNoZWNrZWRcclxuICAgICAgICAgICAgICAgICAgICA/IChjbG9zZXN0QWRkRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAoY2xvc2VzdEFkZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50XHJcbiAgICAgICAgICAgID8ucXVlcnlTZWxlY3RvckFsbChcImlucHV0W2lkXj0nYW50RmFtJ11cIilcclxuICAgICAgICAgICAgPy5mb3JFYWNoKGFudEZhbUNoZWNrID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2xvc2VzdEFkZEVsZW1lbnQgPSBhbnRGYW1DaGVjaz8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAoY2xvc2VzdEFkZEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCB8fFxyXG4gICAgICAgICAgICAgICAgY2xvc2VzdEFkZEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU3BhbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGFudEZhbUNoZWNrIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChhbnRGYW1DaGVjay50eXBlID09PSBcImNoZWNrYm94XCIgfHwgYW50RmFtQ2hlY2sudHlwZSA9PT0gXCJyYWRpb1wiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFhbnRGYW1DaGVjay5jaGVja2VkXHJcbiAgICAgICAgICAgICAgICAgICAgPyAoY2xvc2VzdEFkZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIDogKGNsb3Nlc3RBZGRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChleHRMaW5lKG5ldyBFcnJvcigpKSwgXCJsb2NhbGl6YW5kbyBwYXJlbnQgZWxlbWVudHMgZGUgUmFkaW9cIiwgcmFkaW8sIHJhZGlvPy5wYXJlbnRFbGVtZW50LCByYWRpbz8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0VGV4dElucHV0KGFkZHJlc3NJbnBzLCBudWxsUmFkaW9zKSB7XHJcbiAgICBhZGRyZXNzSW5wcz8ubGVuZ3RoID4gMCAmJiBhZGRyZXNzSW5wcy5sZW5ndGggPT09IG51bGxSYWRpb3MubGVuZ3RoXHJcbiAgICAgICAgPyBudWxsUmFkaW9zLmZvckVhY2gobnVsbFJhZGlvID0+IHtcclxuICAgICAgICAgICAgbnVsbFJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBudWxsUmFkaW8gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIG51bGxSYWRpby5jaGVja2VkXHJcbiAgICAgICAgICAgICAgICAgICAgPyBudWxsUmFkaW8ucHJldmlvdXNFbGVtZW50U2libGluZz8uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICA6IG51bGxSYWRpby5wcmV2aW91c0VsZW1lbnRTaWJsaW5nPy5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG51bGxSYWRpby5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbnVsbFJhZGlvIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBudWxsUmFkaW8uY2hlY2tlZFxyXG4gICAgICAgICAgICAgICAgICAgID8gbnVsbFJhZGlvLnByZXZpb3VzRWxlbWVudFNpYmxpbmc/LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsUmFkaW8ucHJldmlvdXNFbGVtZW50U2libGluZz8ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgOiBjb25zb2xlLmVycm9yKFwiTnVtYmVyIG9mIElucHV0cyBhbmQgUmFkaW9zIG5vdCBlcXVhbCwgYWJvcnRpbmcgZGVhY3RUZXh0SW5wdXQoKVwiKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlQ2xpY2tIYW5kbGVyKGlucEVsKSB7XHJcbiAgICBpZiAoaW5wRWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgKGlucEVsLnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fCBpbnBFbC50eXBlID09PSBcInJhZGlvXCIpKSB7XHJcbiAgICAgICAgaW5wRWwuY2hlY2tlZCA9IGlucEVsLmNoZWNrZWQgPyBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgY3BiSW5wSGFuZGxlcihuZXcgRXZlbnQoXCJjaGFuZ2VcIiksIGlucEVsKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChpbnBFbCwgYGlucEVsIGlkICR7aW5wRWw/LmlkID8/IFwiVU5ERUZJTkVEIElEXCJ9YCwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VDdXJyZW50RGF0ZShhY3RpdmF0aW9uLCBkYXRlQnRuKSB7XHJcbiAgICBpZiAoYWN0aXZhdGlvbj8udGFyZ2V0ID09PSBkYXRlQnRuICYmIGRhdGVCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCB0YXJnSW5wdXREYXRlID0gc2VhcmNoUHJldmlvdXNTaWJsaW5ncyhkYXRlQnRuLCBcImlucERhdGVcIik7XHJcbiAgICAgICAgdGFyZ0lucHV0RGF0ZSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgdGFyZ0lucHV0RGF0ZS50eXBlID09PSBcImRhdGVcIlxyXG4gICAgICAgICAgICA/ICh0YXJnSW5wdXREYXRlLnZhbHVlID1cclxuICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiLVwiICtcclxuICAgICAgICAgICAgICAgICAgICAoY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYWRTdGFydCgyLCBcIjBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwoXCInXCIsIFwiXCIpICtcclxuICAgICAgICAgICAgICAgICAgICBcIi1cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudERhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpLnJlcGxhY2VBbGwoXCInXCIsIFwiXCIpKVxyXG4gICAgICAgICAgICA6IEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhcmdJbnB1dERhdGUsIGB0YXJnSW5wdXREYXRlIGlkICR7dGFyZ0lucHV0RGF0ZT8uaWQgPz8gXCJVTkRFRklORUQgSURcIn1gLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChkYXRlQnRuLCBcImFyZ3VtZW50cyBmb3IgdXNlQ3VycmVudERhdGUoKVwiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaE5leHRTaWJsaW5ncyhjdXJyZW50RWxlbWVudCwgc2VhcmNoZWRTaWJsaW5nQ2xhc3MpIHtcclxuICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudD8ubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50Py5jbGFzc0xpc3Q/LmNvbnRhaW5zKHNlYXJjaGVkU2libGluZ0NsYXNzKSB8fFxyXG4gICAgICAgICAgICBsb29wQWNjID4gOTk5KVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBsb29wQWNjKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFByZXZpb3VzU2libGluZ3MoY3VycmVudEVsZW1lbnQsIHNlYXJjaGVkU2libGluZ0NsYXNzKSB7XHJcbiAgICBsZXQgbG9vcEFjYyA9IDA7XHJcbiAgICB3aGlsZSAoY3VycmVudEVsZW1lbnQ/LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcclxuICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50Py5jbGFzc0xpc3Q/LmNvbnRhaW5zKHNlYXJjaGVkU2libGluZ0NsYXNzKSB8fFxyXG4gICAgICAgICAgICBsb29wQWNjID4gOTk5KVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBsb29wQWNjKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFByZXZpb3VzU2libGluZ3NCeUlkKGN1cnJlbnRFbGVtZW50LCBzZWFyY2hlZFNpYmxpbmdJZCkge1xyXG4gICAgbGV0IGxvb3BBY2MgPSAwO1xyXG4gICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50Py5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIGlmIChjdXJyZW50RWxlbWVudD8uaWQgPT09IHNlYXJjaGVkU2libGluZ0lkIHx8IGxvb3BBY2MgPiA5OTkpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGxvb3BBY2MrKztcclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUGFyZW50cyhjdXJyZW50RWxlbWVudCwgc2VhcmNoZWRQYXJlbnRDbGFzcykge1xyXG4gICAgbGV0IGxvb3BBY2MgPSAwO1xyXG4gICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGlmIChjdXJyZW50RWxlbWVudD8uY2xhc3NMaXN0Py5jb250YWlucyhzZWFyY2hlZFBhcmVudENsYXNzKSB8fFxyXG4gICAgICAgICAgICBsb29wQWNjID4gOTk5KVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBsb29wQWNjKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XHJcbn1cclxuLy9UT0RPIENPTlNJREVSQVIgUkVQQVNTQVIgUEFSQSBSRUFDVFxyXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVG9Bc3REaWdpdChjbGljaywgdG9GaWxlSW5wQnRuKSB7XHJcbiAgICBpZiAoY2xpY2sgaW5zdGFuY2VvZiBFdmVudCAmJlxyXG4gICAgICAgIHRvRmlsZUlucEJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50ICYmXHJcbiAgICAgICAgdG9GaWxlSW5wQnRuLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgY29uc3QgaW5wQXN0ID0gc2VhcmNoUHJldmlvdXNTaWJsaW5ncyh0b0ZpbGVJbnBCdG4sIFwiaW5wQXN0XCIpIHx8XHJcbiAgICAgICAgICAgIHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImltZ0FzdERpZ2l0XCIpO1xyXG4gICAgICAgIGlmICgoaW5wQXN0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICBpbnBBc3QgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSAmJlxyXG4gICAgICAgICAgICBpbnBBc3QucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICBsZXQgbGFiQXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sYWJBc3RcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVJbnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIGZpbGVJbnAubmFtZSA9IGlucEFzdC5uYW1lO1xyXG4gICAgICAgICAgICBmaWxlSW5wLmlkID0gaW5wQXN0LmlkO1xyXG4gICAgICAgICAgICBmaWxlSW5wLmNsYXNzTmFtZSA9IGlucEFzdC5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKC9Vc2FyL2cpLnRlc3QodG9GaWxlSW5wQnRuLnRleHRDb250ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgZmlsZUlucC50eXBlID0gXCJmaWxlXCI7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLnNldEF0dHJpYnV0ZShcImFjY2VwdFwiLCBcImltYWdlLypcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wQXN0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnBBc3QucmVxdWlyZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5yZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZWZpbmVMYWJJZChsYWJBc3QsIHRvRmlsZUlucEJ0biwgZmlsZUlucCk7XHJcbiAgICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQgPSBcIlJldG9ybmFyIMOgIEFzc2luYXR1cmEgRXNjcml0YVwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvRmlsZUlucEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmc/LnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBjaG9zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltZ0ZpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlSW5wPy5maWxlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ0ZpbGUgPSBmaWxlSW5wLmZpbGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hvc2U/LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnA/LmZpbGVzICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmZpbGVzPy5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdGaWxlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdGaWxlLnR5cGU/LnN0YXJ0c1dpdGgoXCJpbWFnZVwiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5wYXJlbnRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJBc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBsb2FkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlZmluaXIgbMOzZ2ljYSBwYXJhIGNhcnJlZ2FtZW50b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pY2lhIHByZXBhcm8gcGFyYSBldmVudG8gZGUgY2FycmVnYW1lbnRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nQXN0RGlndCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7IC8vY3JpYSBjb250YWluZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmlkID0gaW5wQXN0LmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuY2xhc3NOYW1lID0gaW5wQXN0LmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGltZ0FzdERpZ3QsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBsb2FkLnRhcmdldD8ucmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBmaWxlSW5wLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGZpbGVJbnAuY2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ6IFwiQXNzaW5hdHVyYSBEaWdpdGFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY29kaW5nOiBcImFzeW5jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IFwiZWFnZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Jvc3NvcmlnaW46IFwiYW5vbnltb3VzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogXCIzMDBweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4SGVpZ2h0OiBcIjIwMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChpbWdBc3REaWd0LCBmaWxlSW5wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVMYWJJZChsYWJBc3QsIHRvRmlsZUlucEJ0biwgaW1nQXN0RGlndCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGltZ0ZpbGUpOyAvL2zDqiBvIGZpbGUgYmFzZWFkbyBuYSBzcmMgY2FycmVnYWRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciBvbiBzZWxlY3RpbmcgdGhlIGZpbGUgYW5kL29yIGZpbmRpbmcgdGhlIHBhcmVudCBFbGVtZW50IGZvciB0aGUgZmlsZSBpbnB1dC5cbiAgICAgICAgICAgICAgY2hvc2UudGFyZ2V0OiAke2Nob3NlPy50YXJnZXQgPz8gXCJVTkRFRklORUQgQ0hPU0VcIn07XG4gICAgICAgICAgICAgIGZpbGVJbnA6ICR7ZmlsZUlucCA/PyBcIlVOREVGSU5FRCBJTlBcIn07XG4gICAgICAgICAgICAgIGZpbGVzOiAke2ZpbGVJbnA/LmZpbGVzID8/IFwiVU5ERUZJTkVEIEZJTEVTXCJ9O1xuICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50OiAke2ZpbGVJbnA/LnBhcmVudEVsZW1lbnQgPz8gXCJVTkRFRklORUQgUEFSRU5UXCJ9OyBcbiAgICAgICAgICAgICAgaW1nRmlsZTogJHtpbWdGaWxlID8/IFwiVU5ERUZJTkVEIElNQUdFXCJ9OyBcbiAgICAgICAgICAgICAgaW1nRmlsZS50eXBlOiAke2ltZ0ZpbGU/LnR5cGUgPz8gXCJVTkRFRklORUQgVFlQRVwifTsgXG4gICAgICAgICAgICAgIGxhYiAke2xhYkFzdCA/PyBcIlVOREVGSU5FRCBMQUJFTFwifWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChuZXcgUmVnRXhwKC9SZXRvcm5hci9nKS50ZXN0KHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCkpIHtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgICAgICAgICAgICAgZmlsZUlucC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGRlZmluZUxhYklkKGxhYkFzdCwgdG9GaWxlSW5wQnRuLCBmaWxlSW5wKTtcclxuICAgICAgICAgICAgICAgIHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCA9IFwiVXNhciBBc3NpbmF0dXJhIERpZ2l0YWxcIjtcclxuICAgICAgICAgICAgICAgIHRvRmlsZUlucEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nPy5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyhmaWxlSW5wLCBHbG9iYWxNb2RlbC5jaGVja0F1dG9Db3JyZWN0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltpZF49XCJkZWFjdEF1dG9jb3JyZWN0QnRuXCJdJykgfHxcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtpZF49XCJkZWFjdEF1dG9jb3JyZWN0QnRuXCJdJykpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnN0cmluZ0Vycm9yKFwidGV4dENvbnRlbnQgZm9yIHRvRmlsZUlucEJ0blwiLCB0b0ZpbGVJbnBCdG4/LnRleHRDb250ZW50LCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICAgICAgICAgIGlucEFzdC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChmaWxlSW5wLCBpbnBBc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoZXh0TGluZShuZXcgRXJyb3IoKSksIFwiYXJndW1lbnRzIGZvciBpbnBBc3RcIiwgaW5wQXN0LCBpbnBBc3Q/LnBhcmVudEVsZW1lbnQsIHRvRmlsZUlucEJ0bik7XHJcbiAgICAgICAgLy8gLy9UT0RPIElOQ0xVSVIgVE9LRU4gQU5USS1DU1JGIFFVQU5ETyBIT1VWRVIgU0VSVklET1JcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKGV4dExpbmUobmV3IEVycm9yKCkpLCBcImFyZ3VtZW50cyBmb3IgY2hhbmdUb0FzdERpZ2l0KClcIiwgYCR7SlNPTi5zdHJpbmdpZnkoY2xpY2spIHx8IG51bGx9YCwgdG9GaWxlSW5wQnRuLCB0b0ZpbGVJbnBCdG4/LnRleHRDb250ZW50KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lTGFiSWQobGFiQXN0LCB0b0ZpbGVJbnBCdG4sIGZpbGVFbCkge1xyXG4gICAgaWYgKHRvRmlsZUlucEJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50ICYmXHJcbiAgICAgICAgKGZpbGVFbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHwgZmlsZUVsIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkpIHtcclxuICAgICAgICBpZiAoIWxhYkFzdCAmJlxyXG4gICAgICAgICAgICAodG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQ/LnRhZ05hbWUgPT09IFwiTEFCRUxcIiB8fFxyXG4gICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQ/LnRhZ05hbWUgPT09IFwiU1BBTlwiKSlcclxuICAgICAgICAgICAgbGFiQXN0ID0gdG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgbGFiQXN0LmlkID0gXCJzcGFuQXN0UGN0XCI7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChleHRMaW5lKG5ldyBFcnJvcigpKSwgXCJhcmd1bWVudG9zIHBhcmEgZGVmaW5lTGFiSWRcIiwgdG9GaWxlSW5wQnRuLCBmaWxlRWwpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldGFyRm9ybXVsYXJpbyhjbGljaywgdG9GaWxlSW5wQnRucywgcmVzZXRGb3JtQnRuID0gY2xpY2s/LnRhcmdldCkge1xyXG4gICAgaWYgKChjbGljaz8udGFyZ2V0IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQgfHxcclxuICAgICAgICByZXNldEZvcm1CdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkgJiZcclxuICAgICAgICBBcnJheS5mcm9tKHRvRmlsZUlucEJ0bnMpLmV2ZXJ5KGZpbGVCdG4gPT4gZmlsZUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkge1xyXG4gICAgICAgIGNvbnN0IGZvcm11bGFyaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BbmFtR0lkXCIpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRhYmxlQ2l0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NpdGVbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXScpO1xyXG4gICAgICAgIGNvbnN0IGdlbkJpcnRoUmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5CaXJ0aFJlbElkXCIpO1xyXG4gICAgICAgIGNvbnN0IGdlblRyYW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5UcmFuc0lkXCIpO1xyXG4gICAgICAgIGZvcm11bGFyaW8gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnRcclxuICAgICAgICAgICAgPyBmb3JtdWxhcmlvLnJlc2V0KClcclxuICAgICAgICAgICAgOiBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKGZvcm11bGFyaW8sIFwiZm9ybXVsYXJpbyBpbiByZXNldGFyRm9ybXVsYXJpbygpXCIsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgICAgICBpZiAoZWRpdGFibGVDaXRlKSB7XHJcbiAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGAtLU5vbWVgO1xyXG4gICAgICAgICAgICBHbG9iYWxNb2RlbC5yZW1vdmVGaXJzdENsaWNrKGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChlZGl0YWJsZUNpdGUsIFwiZWRpdGFibGVDaXRlIGluIHJlc2V0YXJGb3JtdWxhcmlvKClcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgICAgIGlmIChnZW5CaXJ0aFJlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGdlbkJpcnRoUmVsIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICBnZW5CaXJ0aFJlbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZ2VuQmlydGhSZWwudmFsdWUgPSBcImNpc1wiO1xyXG4gICAgICAgICAgICBnZW5CaXJ0aFJlbC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKGdlbkJpcnRoUmVsLCBcImdlbkJpcnRoUmVsIGluIHJlc2V0YXJGb3JtdWxhcmlvKClcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgICAgIGlmIChnZW5UcmFucyBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGdlblRyYW5zIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICBnZW5UcmFucyBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZ2VuVHJhbnMudmFsdWUgPSBcImF2YW5jYWRvXCI7XHJcbiAgICAgICAgICAgIGdlblRyYW5zLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoZ2VuVHJhbnMsIFwiZ2VuVHJhbnMgaW4gcmVzZXRhckZvcm11bGFyaW8oKVwiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICAgICAgdG9GaWxlSW5wQnRucy5mb3JFYWNoKHRvRmlsZUlucEJ0biA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0b0ZpbGVJbnBCdG4/LnRleHRDb250ZW50Py5tYXRjaCgvUmV0b3JuYXIvZykpXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VUb0FzdERpZ2l0KGNsaWNrLCB0b0ZpbGVJbnBCdG4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoZXh0TGluZShuZXcgRXJyb3IoKSksIFwiYXJndW1lbnRzIGZvciByZXNldGFyRm9ybXVsYXJpbygpXCIsIGAke0pTT04uc3RyaW5naWZ5KGNsaWNrPy50YXJnZXQpfWAgfHwgbnVsbCwgYCR7SlNPTi5zdHJpbmdpZnkodG9GaWxlSW5wQnRucyl9YCB8fCBudWxsKTtcclxufVxyXG4vL1RPRE8gRklOQUxJWkFSIENPTSBDU1NcclxuZXhwb3J0IGZ1bmN0aW9uIHN1YkZvcm0oc3ViQnV0dG9uKSB7XHJcbiAgICB3aW5kb3cuYWxlcnQoXCJTaXN0ZW1hIGFpbmRhIG7Do28gcHJvbnRvXFxuLi4ubWFzIHZvY8OqIHRlcmlhIGVudmlhZG8gY2xpY2FuZG8gYXF1aSEgOilcIik7XHJcbiAgICBjb25zb2xlLmxvZyhzdWJCdXR0b24gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCk7XHJcbiAgICAvLyBjb25zdCByZXF1aXJlZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltyZXF1aXJlZF1cIik7XHJcbiAgICAvLyBpZiAocmVxdWlyZWRFbGVtZW50cykge1xyXG4gICAgLy8gICBjb25zdCBlbXB0eUVsZW1lbnRzID0gQXJyYXkuZnJvbShyZXF1aXJlZEVsZW1lbnRzKS5maWx0ZXIoKGVsZW1lbnQpID0+IHtcclxuICAgIC8vICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQudmFsdWUgfHwgZWxlbWVudC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgLy8gICAgIHJldHVybiB2YWx1ZSA9PT0gXCJcIjtcclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyAgIGlmIChlbXB0eUVsZW1lbnRzKSB7XHJcbiAgICAvLyAgICAgZW1wdHlFbGVtZW50cy5mb3JFYWNoKChlbXB0eUVsZW1lbnQpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiRWxlbWVudG8gdmF6aW86IFwiLCBlbXB0eUVsZW1lbnQuaWQpO1xyXG4gICAgLy8gICAgICAgZW1wdHlFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwicmdiKDI1NSwgMCwgMClcIjtcclxuICAgIC8vICAgICAgIGxldCBlbXB0eUVsZW1lbnRDU3R5bGUgPSB3aW5kb3dcclxuICAgIC8vICAgICAgICAgLmdldENvbXB1dGVkU3R5bGUoZW1wdHlFbGVtZW50KVxyXG4gICAgLy8gICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShcImJvcmRlci1jb2xvclwiKTtcclxuICAgIC8vICAgICAgIGxldCByZ2JhTWF0Y2ggPSBlbXB0eUVsZW1lbnRDU3R5bGUubWF0Y2gocmdiYVJlZ2V4KTtcclxuICAgIC8vICAgICAgIGlmIChyZ2JhTWF0Y2gpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJyZ2JhIFwiICsgcmdiYU1hdGNoKTtcclxuICAgIC8vICAgICAgICAgLy8gY29uc3QgZmFkaW5nQWxlcnQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIC8vICAgbGV0IHJnYmFNYXRjaCA9IGVtcHR5RWxlbWVudENTdHlsZS5tYXRjaChyZ2JhUmVnZXgpO1xyXG4gICAgLy8gICAgICAgICAvLyB9KTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRKU09ORGVzYyhpbnB1dHMgPSBbbnVsbF0pIHtcclxuICAgIGNvbnN0IHRpdGxlRWxlbWVudHMgPSBbXTtcclxuICAgIGNvbnN0IGNsb3Nlc3RWYWxpZEVsZW1lbnRzID0gW107XHJcbiAgICBjb25zdCBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcyA9IFtdO1xyXG4gICAgY29uc3QgY2xvc2VzdEJvb2xlYW5FbGVtZW50cyA9IFtdO1xyXG4gICAgY29uc3QgY2xvc2VzdEJvb2xlYW5FbGVtZW50c0lkcyA9IFtdO1xyXG4gICAgY29uc3QgaW5wVmFsdWVzID0gW107XHJcbiAgICBjb25zdCBpbnBJZHMgPSBbXTtcclxuICAgIGNvbnN0IEpTT05JbnBzU3RvcmVEZXNjcmlwdG9ycyA9IFtdO1xyXG4gICAgY29uc3QgSlNPTlRpdGxlc1N0b3JlRGVzY3JpcHRvcnMgPSBbXTtcclxuICAgIGxldCBKU09OSW5wc1N0b3JlID0gW107XHJcbiAgICBsZXQgSlNPTlRpdGxlc1N0b3JlID0gW107XHJcbiAgICBsZXQgdGl0bGVBY2MgPSAwO1xyXG4gICAgbGV0IG51bGxUaXRsZUFjYyA9IDA7XHJcbiAgICAvL2RldGVybWluYcOnw6NvIGRvIG7Dum1lcm8gZGUgaW5wdXRzIGRlIGlkZW50aWZpY2HDp8OjbyBjdWpvcyB0w610dWxvcyBzw6NvIGRlIGludGVyZXNzZSBlIGNvbnN0cnXDp8OjbyBkZSBzdWJhcnJheSBwYXJhIGVzdGVzXHJcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IGlucHV0cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgIGlmIChpbnB1dHNba10/LmNsYXNzTGlzdC5jb250YWlucyhcImlucElkZW50aWZcIikpXHJcbiAgICAgICAgICAgIHRpdGxlRWxlbWVudHMucHVzaChpbnB1dHNba10pO1xyXG4gICAgfVxyXG4gICAgLy9sb29wIHBhcmEgY29uc3RydcOnw6NvIGRvcyBhcnJheXMgaW5pY2lhcyBkZSBpZHMgZSB2YWx1ZXNcclxuICAgIGZvciAobGV0IHogPSAwOyB6IDwgaW5wdXRzLmxlbmd0aDsgeisrKSB7XHJcbiAgICAgICAgaWYgKGlucHV0c1t6XSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0c1t6XT8udHlwZSA9PT0gXCJyYWRpb1wiIHx8XHJcbiAgICAgICAgICAgICAgICBpbnB1dHNbel0/LnR5cGUgPT09IFwiY2hlY2tib3hcIikge1xyXG4gICAgICAgICAgICAgICAgaW5wSWRzLnB1c2goaW5wdXRzW3pdPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICBpbnBWYWx1ZXMucHVzaChpbnB1dHNbel0/LmNoZWNrZWQudG9TdHJpbmcoKSA/PyBcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5wdXRzW3pdPy5pZCA9PT0gXCJjb25mcm1Mb2NJZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgPyBpbnBJZHMucHVzaChcImNvbmZpcm1Mb2NcIilcclxuICAgICAgICAgICAgICAgICAgICA6IGlucElkcy5wdXNoKGlucHV0c1t6XT8uaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wVmFsdWVzLnB1c2goaW5wdXRzW3pdPy52YWx1ZSA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5wdXRzW3pdIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICBpbnB1dHNbel0gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgaW5wVmFsdWVzLnB1c2goaW5wdXRzW3pdPy52YWx1ZSA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlucHV0c1t6XT8uY29udGVudEVkaXRhYmxlID09PSBcInRydWVcIiB8fFxyXG4gICAgICAgICAgICBpbnB1dHNbel0/LmlkID09PSBcImNpdGVOYW1lSWRcIikge1xyXG4gICAgICAgICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgaW5wVmFsdWVzLnB1c2goaW5wdXRzW3pdPy50ZXh0Q29udGVudCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gZWxlbWVudG8uIEVsZW1lbnRvICR7aW5wdXRzW3pdID8/IFwibnVsbFwifTsgaW5zdMOibmNpYSAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgIC5jYWxsKGlucHV0c1t6XSlcclxuICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSl9OyBpZCAke2lucHV0c1t6XT8uaWQgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICB9XHJcbiAgICAvL2xvb3AgcGFyYSBhanVzdGUgZG9zIGVsZW1lbnRvcyBkb3MgYXJyYXlzIGRlIGlucHV0cyBlIGNvbnN0cnXDp8OjbyBkb3Mgc3RvcmFnZXIgZGUgaW5wdXRzXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGlucHV0cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIC8vZmlsdHJhZ2VtIGRlIHRpcG9zIHByaW1pdGl2b3MgZGUgdmFsdWVzXHJcbiAgICAgICAgdHlwZW9mIGlucFZhbHVlc1tqXSA9PT0gXCJzdHJpbmdcIiAmJiBpbnBWYWx1ZXNbal0gPT09IFwiXCJcclxuICAgICAgICAgICAgPyAoaW5wVmFsdWVzW2pdID0gaW5wVmFsdWVzW2pdLnJlcGxhY2UoXCJcIiwgXCJudWxsXCIpID8/IFwibnVsbFwiKVxyXG4gICAgICAgICAgICA6IChpbnBWYWx1ZXNbal0gPSBpbnBWYWx1ZXNbal0/LnRvU3RyaW5nKCkgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgIC8vYXZhbGlhZG9yIGRlIGlkcyBudWxhc1xyXG4gICAgICAgIGlmIChpbnBJZHNbal0/Lm1hdGNoKC9udWxsL2cpIHx8ICFpbnBJZHNbal0pXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgSWQgbnVsbCBkZXRlY3RhZGEuIFTDrXR1bG8gcmVsYXRpdm86ICR7Y2xvc2VzdFZhbGlkRWxlbWVudHNbal0gPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgLy9jcmlhw6fDo28gZG8gc3RvcmFnZXJcclxuICAgICAgICBjb25zdCBuSlNPTklucFN0b3JhZ2VyID0gbmV3IEpTT05TdG9yYWdlcihpbnBJZHNbal0sIGlucFZhbHVlc1tqXSk7XHJcbiAgICAgICAgLy9jcmlhw6fDo28gZGEgc3RvcmVcclxuICAgICAgICBpZiAobkpTT05JbnBTdG9yYWdlcikge1xyXG4gICAgICAgICAgICBKU09OSW5wc1N0b3JlLnB1c2gobkpTT05JbnBTdG9yYWdlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBuSlNPTklucFN0b3JhZ2VyLnNob3dBbGxJbmZvOyAvL1RPRE8gRVhQT1NJw4fDg08gREUgREFET1MgU09NRU5URSBQQVJBIEZJTkFMSURBREVTIERFIFRFU1RFLCBQT0lTIFBST1BSSUVEQURFUyBQUklWQURBUyBOw4NPIFPDg08gRU5VTUVSw4FWRUlTXHJcbiAgICAgICAgICAgIGRlc2NyaXB0b3JcclxuICAgICAgICAgICAgICAgID8gSlNPTklucHNTdG9yZURlc2NyaXB0b3JzLnB1c2goZGVzY3JpcHRvci50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgOiBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIGRlc2NyaXB0b3IgcGFyYSBpbnN0w6JuY2lhICR7an0gZGUgSlNPTlN0b3JhZ2VyYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgJHtqfSBkZSBKU09OU3RvcmFnZXJgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2xvb3AgcGFyYSBleHRyYWlyIHTDrXR1bG9zL2xhYmVscyBkZSBpbnRlcmVzc2VcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGl0bGVFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRpdGxlQWNjKys7XHJcbiAgICAgICAgLy9sb29wIHBhcmEgbcO6bHRpcGxhcyB0ZW50YXRpdmFzIGRlIGxvY2FsaXphw6fDo28gZG8gdGV4dG8gZGUgaW50ZXJlc3NlXHJcbiAgICAgICAgbGV0IGNsb3Nlc3RQYXJlbnQgPSB0aXRsZUVsZW1lbnRzW2ldPy5jbG9zZXN0KFwic3BhblwiKSB8fCB0aXRsZUVsZW1lbnRzW2ldPy5jbG9zZXN0KFwibGFiZWxcIik7XHJcbiAgICAgICAgaWYgKGNsb3Nlc3RQYXJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IGxvb3BBY2MgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAobG9vcEFjYyA8IDEwICYmIGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAvL2xvb3AgcGFyYSBlc2NhbGFkYSBnZW5lYWzDs2dpY2EgYXTDqSBlbmNvbnRyYXIgcGFyZW50IGRlIGludGVyZXNzZSBvdSBkZXNpc3RpciBhcMOzcyAxMCBpdGVyYcOnw7Vlc1xyXG4gICAgICAgICAgICAgICAgbG9vcEFjYysrO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8uY2xvc2VzdChcInNwYW5cIikgfHwgY2xvc2VzdFBhcmVudD8uY2xvc2VzdChcImxhYmVsXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ICE9PSBcIlwiIHx8IGxvb3BBY2MgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ID09PSBcIlNpbVwiIHx8IC8vZW50cmFkYSBlbSBsb29wIHBhcmEgZWxpbWluYXIgcGFyZW50cyBjb20gdGV4dCBzaW0vbsOjbyAobsOjbyBpbmZvcm1hdGl2bykgb3UgZGVzaXN0aXIgYXDDs3MgMTAgaXRlcmHDp8O1ZXNcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCA9PT0gXCJOw6NvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBib29sZWFuUGFyZW50Q29weSA9IGNsb3Nlc3RQYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdEJvb2xlYW5FbGVtZW50cy5wdXNoKGJvb2xlYW5QYXJlbnRDb3B5Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdEJvb2xlYW5FbGVtZW50c0lkcy5wdXNoKGJvb2xlYW5QYXJlbnRDb3B5Py5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGxvb3BBY2MgPCAxMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbG9zZXN0UGFyZW50LnRleHRDb250ZW50ID09PSBcIlNpbVwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50LnRleHRDb250ZW50ID09PSBcIk7Do29cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9vcEFjYysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LmNsb3Nlc3QoXCJzcGFuXCIpIHx8IGNsb3Nlc3RQYXJlbnQ/LmNsb3Nlc3QoXCJsYWJlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjbG9zZXN0UGFyZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCAhPT0gXCJTaW1cIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiTsOjb1wiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCAhPT0gXCJcIikgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb3BBY2MgPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2goY2xvc2VzdFBhcmVudD8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LnR5cGUgPT09IFwicmFkaW9cIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmcgaW5zdGFuY2VvZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhUTUxMYWJlbEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZz8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYm9vbE9wXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8uaWQubWF0Y2goL1llcy8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZD8uc2xpY2UoLTMpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibnVsbFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aXRsZUVsZW1lbnRzW2ldPy5pZC5tYXRjaCgvTm8vKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2godGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKC0yKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bGxcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ2FzbyBpbmVzcGVyYWRvIGRlIGJvb2xPcCBSYWRpbyArIExhYmVsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5hbWUgPT09IFwibml2ZWxGdW1vXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkPy5zbGljZSgwLCAxKT8udG9VcHBlckNhc2UoKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bGxcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZD8uc2xpY2UoMSwgNCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKDQsIDgpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcIm9wRnVtU3Vic1wiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc/LnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZz8udGV4dENvbnRlbnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZUVsZW1lbnRzW2ldPy5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBBbnRNZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFwiVHJhdGFtZW50b19Nw6lkaWNvX1wiICsgdGl0bGVFbGVtZW50c1tpXT8uaWQuc2xpY2UoLTEpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LmlkID09PSBcImNpdGVOYW1lSWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGNsb3Nlc3RWYWxpZEVsZW1lbnRzPy5wdXNoKFwiQXNzaW5hdHVyYV9Vc3XDoXJpb1wiID8/IFwibnVsbFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNsb3Nlc3RWYWxpZEVsZW1lbnRzPy5wdXNoKGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFBhcmVudD8uaWQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9vYnRlbsOnw6NvIGRlIGlkcyBkb3MgJ3BhcmVudHMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29ycmXDp8OjbyBkZSBpZCBkZSBpbnRlcmVzc2UgY2FzbyBhIGRvIHBhcmVudCBuw6NvIGVzdGVqYSBwcmVzZW50ZSAoYXRlbsOnw6NvOiBkZXNhc3NvY2lhIGlkIGUgdGV4dCBkZSBpbnRlcmVzc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2goY2xvc2VzdFBhcmVudD8uaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjbG9zZXN0UGFyZW50Py5pZCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0RVNpYmxpbmcgPSB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0RVNpYmxpbmcgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFU2libGluZyBpbnN0YW5jZW9mIEhUTUxMYWJlbEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFU2libGluZy50ZXh0Q29udGVudCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaChuZXh0RVNpYmxpbmcuaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNFU2libGluZyA9IHRpdGxlRWxlbWVudHNbaV0/LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNFU2libGluZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzRVNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNFU2libGluZy50ZXh0Q29udGVudCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2gocHJldmlvdXNFU2libGluZy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LnBsYWNlaG9sZGVyICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYE5lbmh1bWEgaWQgcHLDs3hpbWEgdsOhbGlkYSByZXRvcm5hZGEgcGFyYSBvIGlucHV0ICR7dGl0bGVFbGVtZW50c1tpXT8uaWR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgPT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gYW8gbG9jYWxpemFyIHRleHRDb250ZW50IGRlIHBhcmVudGApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9zZSBmYWxoYSBlbSBwYXJlbnRzLCBwcm9jdXJhIGVtIHNpYmxpbmdzIDxsYWJlbD4gb3UgZW0gcGxhY2Vob2xkZXJzIGRlIHRleHRhcmVhc1xyXG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1NpYmxpbmcgPSB0aXRsZUVsZW1lbnRzW2ldPy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAocHJldmlvdXNTaWJsaW5nIGluc3RhbmNlb2YgSFRNTExhYmVsRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHByZXZpb3VzU2libGluZy50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/IGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2gocHJldmlvdXNTaWJsaW5nLmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LnBsYWNlaG9sZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5wbGFjZWhvbGRlciA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/IGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8udHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcImZhbU9wXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwcGVyQ2FzZU1hdGNoID0gdGl0bGVFbGVtZW50c1tpXT8uaWQ/Lm1hdGNoKC9GYW0vZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cHBlckNhc2VNYXRjaCAmJiB0aXRsZUVsZW1lbnRzW2ldPy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBwZXJDYXNlSW5kZXggPSB0aXRsZUVsZW1lbnRzW2ldPy5pZC5pbmRleE9mKFwiRmFtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkSWQgPSB0aXRsZUVsZW1lbnRzW2ldPy5pZC5zbGljZSgwLCB1cHBlckNhc2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHNsaWNlZElkICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dFNpYmxpbmc/LnRleHRDb250ZW50Py5yZXBsYWNlQWxsKC9eW1xcc10rL2csIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRTaWJsaW5nPy50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCgvXltcXHNdKy9nLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcIm9wSGVwXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXCJIZXBhdGl0ZV9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0U2libGluZz8udGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwoL15bXFxzXSsvZywgXCJcIikgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkICE9PSBcImNvbmZpcm1JZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRTaWJsaW5nPy50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCgvXltcXHNdKy9nLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkID09PSBcImNvbmZpcm1JZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFwiQ29uY29yZG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BIQVNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5uZXh0U2libGluZz8udGV4dENvbnRlbnQ/LnRyaW0oKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0RVNpYmxpbmcgPSB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0RVNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0RVNpYmxpbmcudGV4dENvbnRlbnQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2gobmV4dEVTaWJsaW5nLnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaChuZXh0RVNpYmxpbmcuaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gcGFyZW50cywgbGFiZWxzLCBwbGFjZWhvbGRlcnMgZSB0ZXh0Q29udGVudC4gSWQgZG8gSW5wdXQ6ICR7dGl0bGVFbGVtZW50c1tpXT8uaWR9OyB0ZXh0Q29udGVudCAke3RpdGxlRWxlbWVudHNbaV0/LnRleHRDb250ZW50fTsgcGxhY2Vob2xkZXIgJHt0aXRsZUVsZW1lbnRzW2ldPy5wbGFjZWhvbGRlcn07IMOabHRpbWEgSW5zdMOibmNpYSBkZSBQYXJlbnQgYXZhbGlhZGEgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoY2xvc2VzdFBhcmVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoOCwgLTEpfTsgSW5zdMOibmNpYSBkZSBTaWJsaW5nIExhYmVscyAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChwcmV2aW91c1NpYmxpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX0gJiYgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwobmV4dEVTaWJsaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSl9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9sb29wIHBhcmEgYWp1c3RlIGRvcyBlbGVtZW50b3MgZG9zIGFycmF5cyBkZSB0aXRsZXMgZSBjb25zdHJ1w6fDo28gZG9zIHN0b3JhZ2VyIGRlIHRpdGxlc1xyXG4gICAgZm9yIChsZXQgbCA9IDA7IGwgPCB0aXRsZUVsZW1lbnRzLmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgLy9jb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgZXNwYcOnb3MgZW0gbGFiZWxzIGUgdGl0bGVzXHJcbiAgICAgICAgY29uc3QgbXVsdGlwbGVTcGFjZU1hdGNoZXMgPSBjbG9zZXN0VmFsaWRFbGVtZW50c1tsXT8ubWF0Y2goL1xcc1xccy8pO1xyXG4gICAgICAgIGlmIChjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSAmJlxyXG4gICAgICAgICAgICBtdWx0aXBsZVNwYWNlTWF0Y2hlcyAmJlxyXG4gICAgICAgICAgICBtdWx0aXBsZVNwYWNlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwYWNlTWF0Y2hlc0FycmF5ID0gW107XHJcbiAgICAgICAgICAgIG11bHRpcGxlU3BhY2VNYXRjaGVzLmZvckVhY2gobXVsdGlwbGVTcGFjZU1hdGNoID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG11bHRpcGxlU3BhY2VJbmRleCA9IGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdPy5pbmRleE9mKG11bHRpcGxlU3BhY2VNYXRjaCkgPz8gMDtcclxuICAgICAgICAgICAgICAgIHNwYWNlTWF0Y2hlc0FycmF5LnB1c2gobXVsdGlwbGVTcGFjZUluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgc3BhY2VNYXRjaGVzQXJyYXkubGVuZ3RoOyBtKyspIHtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdID1cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c1tsXT8uc2xpY2UoMCwgc3BhY2VNYXRjaGVzQXJyYXlbbV0pLnRyaW0oKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm51bGxcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2F2YWxpYWRvciBkZSBsYWJlbHMgZSB0aXRsZXMgbnVsb3NcclxuICAgICAgICBpZiAoY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0/Lm1hdGNoKC9bTm5dW1V1XVtMbF1bTGxdL2cpIHx8XHJcbiAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGlucFZhbHVlID0gaW5wdXRzW2xdPy52YWx1ZSB8fCBcIm51bGxcIjtcclxuICAgICAgICAgICAgaWYgKGlucHV0c1tsXSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgIChpbnB1dHNbbF0/LnR5cGUgPT09IFwicmFkaW9cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0c1tsXT8udHlwZSA9PT0gXCJjaGVja2JveFwiKSkge1xyXG4gICAgICAgICAgICAgICAgaW5wVmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0c1tsXT8uY2hlY2tlZC50b1N0cmluZygpID8/IFwiZmFsc2VcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBudWxsVGl0bGVBY2MrKztcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBUw610dWxvIG51bG8gZGV0ZWN0YWRvOiBOw7ptZXJvIGRlIGFjw7ptdWxvOiAke251bGxUaXRsZUFjY30uXG4gICAgICAgICAgICBUw610dWxvOiAke2Nsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdIHx8IGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdIHx8IFwibnVsbFwifTtcbiAgICAgICAgICAgIGluc3TDom5jaWE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xyXG4gICAgICAgICAgICAgICAgLmNhbGwoY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0pXHJcbiAgICAgICAgICAgICAgICAuc2xpY2UoOCwgLTEpID8/IFwidW5kZWZpbmVkXCJ9O1xuICAgICAgICAgICAgSWQgZGUgaW5wdXQgcGFyZWFkYTogJHtpbnB1dHNbbF0/LmlkID8/IFwibnVsbFwifTtcbiAgICAgICAgICAgIFZhbG9yIGRlIGlucHV0IHBhcmVhZG8gJHtpbnBWYWx1ZSB8fCBcIm51bGxcIn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jcmlhw6fDo28gZG8gc3RvcmFnZXJcclxuICAgICAgICBjb25zdCBuSlNPTlRpdGxlU3RvcmFnZXIgPSBuZXcgSlNPTlRpdGxlU3RvcmFnZXIoY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0pO1xyXG4gICAgICAgIC8vY3JpYcOnw6NvIGRhIHN0b3JlXHJcbiAgICAgICAgaWYgKG5KU09OVGl0bGVTdG9yYWdlcikge1xyXG4gICAgICAgICAgICBKU09OVGl0bGVzU3RvcmUucHVzaChuSlNPTlRpdGxlU3RvcmFnZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gbkpTT05UaXRsZVN0b3JhZ2VyLnNob3dJbnBUaXRsZTsgLy9UT0RPIEVYUE9TScOHw4NPIERFIERBRE9TIFNPTUVOVEUgUEFSQSBGSU5BTElEQURFUyBERSBURVNURSwgUE9JUyBQUk9QUklFREFERVMgUFJJVkFEQVMgTsODTyBTw4NPIEVOVU1FUsOBVkVJU1xyXG4gICAgICAgICAgICBkZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICA/IEpTT05UaXRsZXNTdG9yZURlc2NyaXB0b3JzLnB1c2goZGVzY3JpcHRvci50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgOiBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIGRlc2NyaXB0b3IgcGFyYSBpbnN0w6JuY2lhICR7bH0gZGUgSlNPTlN0b3JhZ2VyYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhICR7bH0gZGUgSlNPTlN0b3JhZ2VyYCk7XHJcbiAgICB9XHJcbiAgICAvL2ZpbHRybyBlIHZhbGlkYcOnw6NvIGRhIHN0b3JlXHJcbiAgICBpZiAoSlNPTklucHNTdG9yZURlc2NyaXB0b3JzPy5sZW5ndGggPT09IEpTT05JbnBzU3RvcmU/Lmxlbmd0aCAmJlxyXG4gICAgICAgIEpTT05UaXRsZXNTdG9yZURlc2NyaXB0b3JzPy5sZW5ndGggPT09IEpTT05UaXRsZXNTdG9yZT8ubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyMUpTT05JbnBzU3RvcmUgPSBKU09OSW5wc1N0b3JlLmZpbHRlcihKU09ORWwgPT4gdHlwZW9mIEpTT05FbCA9PT0gXCJvYmplY3RcIik7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyMUpTT05UaXRsZXNTdG9yZSA9IEpTT05UaXRsZXNTdG9yZS5maWx0ZXIoSlNPTkVsID0+IHR5cGVvZiBKU09ORWwgPT09IFwib2JqZWN0XCIpO1xyXG4gICAgICAgIGlmIChmaWx0ZXIxSlNPTklucHNTdG9yZT8ubGVuZ3RoID09PSBKU09OSW5wc1N0b3JlPy5sZW5ndGggJiZcclxuICAgICAgICAgICAgZmlsdGVyMUpTT05UaXRsZXNTdG9yZT8ubGVuZ3RoID09PSBKU09OVGl0bGVzU3RvcmU/Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBKU09OSW5wc1N0b3JlID0gZmlsdGVyMUpTT05JbnBzU3RvcmU7XHJcbiAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZSA9IGZpbHRlcjFKU09OVGl0bGVzU3RvcmU7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcjJKU09OSW5wc1N0b3JlID0gSlNPTklucHNTdG9yZS5maWx0ZXIoSlNPTkVsID0+IEpTT05FbCBpbnN0YW5jZW9mIEpTT05TdG9yYWdlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcjJKU09OVGl0bGVzU3RvcmUgPSBKU09OVGl0bGVzU3RvcmUuZmlsdGVyKEpTT05FbCA9PiBKU09ORWwgaW5zdGFuY2VvZiBKU09OVGl0bGVTdG9yYWdlcik7XHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIySlNPTklucHNTdG9yZT8ubGVuZ3RoID09PSBKU09OSW5wc1N0b3JlPy5sZW5ndGggJiZcclxuICAgICAgICAgICAgICAgIGZpbHRlcjFKU09OVGl0bGVzU3RvcmU/Lmxlbmd0aCA9PT0gSlNPTlRpdGxlc1N0b3JlPy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmUgPSBmaWx0ZXIySlNPTklucHNTdG9yZS5zb3J0KCk7XHJcbiAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmUgPSBmaWx0ZXIySlNPTlRpdGxlc1N0b3JlLnNvcnQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBKU09OVGl0bGVzU3RvcmVTdHJpbmdpZmllZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgLy9zdHJpbmdpZmljYcOnw6NvIGRhcyBzdG9yZXNcclxuICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmUuZm9yRWFjaChmb3JtRWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsVmFsdWVzID0gZm9ybUVsLnNob3dBbGxJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsVmFsdWVzU3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShlbFZhbHVlcyk7IC8vVE9ETyBEQURPUyBFWFBPU1RPIFNPTUVOVEUgUEFSQSBGSU5TIERFIFRFU1RFXHJcbiAgICAgICAgICAgICAgICAgICAgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkLnB1c2goZWxWYWx1ZXNTdHJpbmdpZmllZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZS5mb3JFYWNoKGZvcm1FbCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxWYWx1ZXMgPSBmb3JtRWwuc2hvd0lucFRpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsVmFsdWVzU3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShlbFZhbHVlcyk7IC8vVE9ETyBEQURPUyBFWFBPU1RPIFNPTUVOVEUgUEFSQSBGSU5TIERFIFRFU1RFXHJcbiAgICAgICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQucHVzaChlbFZhbHVlc1N0cmluZ2lmaWVkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkID0gSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkLnNvcnQoKTtcclxuICAgICAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZVN0cmluZ2lmaWVkID0gSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQuc29ydCgpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25jbHVzw6NvXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTklucHNTdG9yZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZVN0cmluZ2lmaWVkXHJcbiAgICAgICAgICAgICAgICAgICAgPyBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmVTdHJpbmdpZmllZCxcclxuICAgICAgICAgICAgICAgICAgICBdIC8vc3RyaW5nZmllZCDDqSBhIHZlcnPDo28gdXNhZGFcclxuICAgICAgICAgICAgICAgICAgICA6IFtudWxsLCBudWxsLCBudWxsLCBudWxsXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gY2xhc3NlcyBkZSBlbGVtZW50b3Mgbm8gSlNPTlN0b3JlLiBcbiAgICAgICAgICBOw7ptZXJvIGRlIGluc3TDom5jaWFzIG9idGlkYXMgcGFyYSBpbnB1dHM6ICR7ZmlsdGVyMkpTT05JbnBzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9OyBOw7ptZXJvIGVzcGVyYWRvOiAke0pTT05JbnBzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9O1xuICAgICAgICAgIE7Dum1lcm8gZGUgaW5zdMOibmNpYXMgb2J0aWRhcyBwYXJhIHRpdGxlczogJHtmaWx0ZXIySlNPTlRpdGxlc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTsgTsO6bWVybyBlc3BlcmFkbzogJHtKU09OVGl0bGVzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9YCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGwsIG51bGxdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIHRpcG9zIGRlIGVsZW1lbnRvcyBuYXMgSlNPTlN0b3JlLiBcbiAgICAgICAgTsO6bWVybyBkZSBvYmpldG9zIG9idGlkb3MgcGFyYSBpbnB1dHM6ICR7ZmlsdGVyMUpTT05JbnBzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9OyBOw7ptZXJvIGVzcGVyYWRvOiAke0pTT05JbnBzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9O1xuICAgICAgICBOw7ptZXJvIGRlIG9iamV0b3Mgb2J0aWRvcyBwYXJhIHRpdGxlczogJHtmaWx0ZXIxSlNPTlRpdGxlc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTsgTsO6bWVybyBlc3BlcmFkbzogJHtKU09OVGl0bGVzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbCwgbnVsbF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBMZW5ndGggZGUgSlNPTiBTdG9yZSBEZXNjcmlwdG9ycyBpbnbDoWxpZGEuIFxuICAgICAgTGVuZ3RoIG9idGlkYSBwYXJhIGlucHV0czogJHtKU09OSW5wc1N0b3JlRGVzY3JpcHRvcnMubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9OyBMZW5ndGggZXNwZXJhZGE6ICR7SlNPTklucHNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07XG4gICAgICBMZW5ndGggb2J0aWRhIHBhcmEgdGl0bGVzOiAke0pTT05UaXRsZXNTdG9yZURlc2NyaXB0b3JzLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTsgTGVuZ3RoIGVzcGVyYWRhOiAke0pTT05UaXRsZXNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn1gKTtcclxuICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGwsIG51bGxdO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVKU09OQW5jaG9yKEpTT05CdG4sIGZvcm1JbnBzRGVzY3JpcHRvciA9IFtcIlwiXSkge1xyXG4gICAgY29uc3QgZm9ybWF0dGVkRm9ybURlc2NyaXB0b3IgPSBmb3JtYXRKU09ORmlsZShmb3JtSW5wc0Rlc2NyaXB0b3IpO1xyXG4gICAgY29uc3QgSlNPTkJsb2IgPSBuZXcgQmxvYihbZm9ybWF0dGVkRm9ybURlc2NyaXB0b3JbMV1dLCB7XHJcbiAgICAgICAgdHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IEpTT05MaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICBKU09OTGluay5pZCA9IFwiYW5jaG9ySlNPTlwiO1xyXG4gICAgSlNPTkxpbmsuY2xhc3NOYW1lID0gSlNPTkJ0bi5jbGFzc05hbWU7XHJcbiAgICBKU09OTGluay5zdHlsZS53aWR0aCA9IEpTT05CdG4uc3R5bGUud2lkdGg7XHJcbiAgICBKU09OTGluay5zdHlsZS5oZWlnaHQgPSBKU09OQnRuLnN0eWxlLmhlaWdodDtcclxuICAgIEpTT05MaW5rLnRleHRDb250ZW50ID0gXCJCYWl4YXIgSlNPTlwiO1xyXG4gICAgSlNPTkxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoSlNPTkJsb2IpO1xyXG4gICAgSlNPTkxpbmsuZG93bmxvYWQgPSBcImZvcm1EYXRhb25cIjtcclxuICAgIEpTT05CdG4ucmVwbGFjZVdpdGgoSlNPTkxpbmspO1xyXG4gICAgcmV0dXJuIEpTT05MaW5rO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRKU09ORmlsZShmb3JtSW5wc0Rlc2NyaXB0b3IgPSBbXCJcIl0pIHtcclxuICAgIGxldCBmb3JtYXRGb3JtRGVzY0lkcyA9IGB7XFxuYDtcclxuICAgIGxldCBmb3JtYXRGb3JtRGVzY1RpdGxlcyA9IGBgO1xyXG4gICAgbGV0IGZvcm1hdEZvcm1EZXNjSWRzUmVhZCA9IGB7XFxuYDtcclxuICAgIGxldCBmb3JtYXRGb3JtRGVzY1RpdGxlc1JlYWQgPSBge1xcbmA7XHJcbiAgICBsZXQgbGFiQWNjID0gMTtcclxuICAgIC8vZ2VyYcOnw6NvIGRhcyB1bmlkYWRlcyBmb3JtYXRhZGFzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1JbnBzRGVzY3JpcHRvci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHNlcGFyYXRpb25NYXRjaGVzID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLm1hdGNoKC9cIiwvZyk7XHJcbiAgICAgICAgaWYgKHNlcGFyYXRpb25NYXRjaGVzKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IGZpcnN0U2VwSW5kZXggPSBmb3JtSW5wc0Rlc2NyaXB0b3JbaV0uaW5kZXhPZihcIixcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZFNlcEluZGV4ID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLmluZGV4T2YoXCIsXCIsIGZvcm1JbnBzRGVzY3JpcHRvcltpXS5pbmRleE9mKFwiLFwiKSArIDEpO1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0U2VwSW5kZXggPSBmb3JtSW5wc0Rlc2NyaXB0b3JbaV0ubGFzdEluZGV4T2Yoc2VwYXJhdGlvbk1hdGNoZXNbMF0pO1xyXG4gICAgICAgICAgICAvL2Zvcm1hdGHDp8OjbyBkb3MgaWRzIGUgdmFsdWVzIGRvcyBpbnB1dHNcclxuICAgICAgICAgICAgbGV0IGlucElkID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLnNsaWNlKHNlY29uZFNlcEluZGV4ICsgMiwgbGFzdFNlcEluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKGlucElkPy5tYXRjaCgvLC9nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWFJbmRleCA9IGlucElkLmluZGV4T2YoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wSWQgPSBpbnBJZC5zbGljZShjb21tYUluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlucElkPy5tYXRjaCgvLC9nKSB8fCBsb29wQWNjID4gOTk5KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgbG9vcEFjYysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLnNsaWNlKGxhc3RTZXBJbmRleCArIDIsIC0xKTtcclxuICAgICAgICAgICAgY29uc3QgbGFiID0gbWFwSWRzVGl0bGVzW2lucElkLnJlcGxhY2VBbGwoL1wiL2csIFwiXCIpXTtcclxuICAgICAgICAgICAgaWYgKGkgPT09IDg5ICYmICFpbnBJZClcclxuICAgICAgICAgICAgICAgIC8vYnVnIG7Do28gcmVzb2x2aWRvIGFpbmRhXHJcbiAgICAgICAgICAgICAgICBpbnBJZCA9ICdcImNvbmZpcm1Mb2NJZFwiJztcclxuICAgICAgICAgICAgLy9jb25zdHJ1w6fDo28gZSBjb25jYXRlbmHDp8OjbyBkYXMgdW5pZGFkZXMgZm9ybWF0YWRhc1xyXG4gICAgICAgICAgICBmb3JtYXRGb3JtRGVzY0lkcyArPSBgXFx0JHtpbnBJZH06ICR7dmFsdWV9LCBcXG5gO1xyXG4gICAgICAgICAgICBmb3JtYXRGb3JtRGVzY0lkc1JlYWQgKz0gYFxcdCR7bGFiQWNjfS4gJHtpbnBJZH06ICR7dmFsdWV9LCBcXG5gOyAvL3ZlcnPDtWVzIGVtIGxpc3RhIG51bWVyYWRhLCBwYXJhIGxvZ3MgZSBlbnVtZXJhw6fDo28gcG9zdGVyaW9yXHJcbiAgICAgICAgICAgIGxhYkFjYysrO1xyXG4gICAgICAgICAgICBpZiAobGFiICYmIGxhYiAhPT0gXCJudWxsXCIgJiYgbGFiICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRGb3JtRGVzY1RpdGxlc1JlYWQgKz0gYFxcdCR7bGFiQWNjfS4gJHtsYWJ9IGZvciAke2lucElkfTogJHt2YWx1ZX0sIFxcbmA7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRGb3JtRGVzY1RpdGxlcyArPSBgXFx0XCIke2xhYn1cIjogJHt2YWx1ZX0sIFxcbmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2FqdXN0ZXMgZmluYWlzIG5vcyBkZXNjcmlwdG9ycyBlIHVuacOjb1xyXG4gICAgY29uc3QgZmluYWxEZXNjSWRzID0gKGZvcm1hdEZvcm1EZXNjSWRzICtcclxuICAgICAgICBgXFxuXFxuYCArXHJcbiAgICAgICAgZm9ybWF0Rm9ybURlc2NUaXRsZXMgK1xyXG4gICAgICAgIGB9YCkucmVwbGFjZShcIiwgXFxufVwiLCBcIiBcXG59XCIpO1xyXG4gICAgY29uc3QgZmluYWxEZXNjVGl0bGVzID0gKGB7YCArIGZvcm1hdEZvcm1EZXNjVGl0bGVzICsgYH1gKS5yZXBsYWNlKFwiLCBcXG59XCIsIFwiIFxcbn1cIik7XHJcbiAgICAvL3BhcmEgbGVpdHVyYSBlbSBsb2dzIHNvbWVudGVcclxuICAgIGNvbnN0IGZpbmFsRGVzY0lkc1JlYWQgPSAoZm9ybWF0Rm9ybURlc2NJZHNSZWFkICsgYH1gKVxyXG4gICAgICAgIC5yZXBsYWNlKFwiLCBcXG59XCIsIFwiIFxcbn1cIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXCJcIm51bGxcIjogXCJudWxsXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiXCJmYWxzZVwiOiBcImZhbHNlXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wibnVsbFwiOiBcIm51bGxcIiwvZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXCJmYWxzZVwiOiBcImZhbHNlXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiZmFsc2VcIjogXCJmYWxzZVwiL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wibnVsbFwiOiBcIm51bGxcIi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cXHRbMC05XXsxLDN9LlxcczpcXHNcIm51bGxcIixcXHNcXG4vZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHM6XFxzXCJmYWxzZVwiLFxcc1xcbi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cXHRbMC05XXsxLDN9Llxcc1xcc1xcbi9nLCBcIlwiKTtcclxuICAgIGNvbnN0IGZpbmFsRGVzY1RpdGxlc1JlYWQgPSAoZm9ybWF0Rm9ybURlc2NUaXRsZXNSZWFkICsgYH1gKVxyXG4gICAgICAgIC5yZXBsYWNlKFwiLCBcXG59XCIsIFwiIFxcbn1cIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXCJcIm51bGxcIjogXCJudWxsXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiXCJmYWxzZVwiOiBcImZhbHNlXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wibnVsbFwiOiBcIm51bGxcIiwvZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXCJmYWxzZVwiOiBcImZhbHNlXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiZmFsc2VcIjogXCJmYWxzZVwiL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wibnVsbFwiOiBcIm51bGxcIi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cXHRbMC05XXsxLDN9LlxcczpcXHNcIm51bGxcIixcXHNcXG4vZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHM6XFxzXCJmYWxzZVwiLFxcc1xcbi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cXHRbMC05XXsxLDN9Llxcc1xcc1xcbi9nLCBcIlwiKTtcclxuICAgIGNvbnNvbGUubG9nKGZpbmFsRGVzY0lkc1JlYWQpO1xyXG4gICAgY29uc29sZS5sb2coZmluYWxEZXNjVGl0bGVzUmVhZCk7XHJcbiAgICByZXR1cm4gW2ZpbmFsRGVzY1RpdGxlcywgZmluYWxEZXNjSWRzXTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVnZW5lcmF0ZUpTT05CdG4oSlNPTkxpbmssIGZvcm1JbnBzRGVzY3JpcHRvciA9IFtcIlwiXSkge1xyXG4gICAgY29uc3QgbmV3SlNPTkJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBuZXdKU09OQnRuLmlkID0gXCJidG5KU09OXCI7XHJcbiAgICBuZXdKU09OQnRuLmNsYXNzTmFtZSA9IEpTT05MaW5rLmNsYXNzTmFtZTtcclxuICAgIG5ld0pTT05CdG4uc3R5bGUud2lkdGggPSBKU09OTGluay5zdHlsZS53aWR0aDtcclxuICAgIG5ld0pTT05CdG4uc3R5bGUuaGVpZ2h0ID0gSlNPTkxpbmsuc3R5bGUuaGVpZ2h0O1xyXG4gICAgbmV3SlNPTkJ0bi50ZXh0Q29udGVudCA9IFwiUmVnZW5lcmFyIEpTT05cIjtcclxuICAgIEpTT05MaW5rLnJlcGxhY2VXaXRoKG5ld0pTT05CdG4pO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbmV3SlNPTkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY3JlYXRlSlNPTkFuY2hvcihuZXdKU09OQnRuLCBmb3JtSW5wc0Rlc2NyaXB0b3IpKTtcclxuICAgIH0sIDEwMDApO1xyXG4gICAgLy8gcmV0dXJuIG5ld0pTT05CdG47XHJcbn1cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHRvdWNoU3RhcnRIYW5kbGVyKGtleWRvd246IEtleWJvYXJkRXZlbnQpIHtcclxuLy8gICBsZXQgZmlyc3RUYXBUaW1lID0gMDtcclxuLy8gICBpZiAoZmlyc3RUYXBUaW1lID09PSAwKSB7XHJcbi8vICAgICBmaXJzdFRhcFRpbWUgPSBEYXRlLm5vdygpO1xyXG4vLyAgIH0gZWxzZSB7XHJcbi8vICAgICBjb25zdCBlbGFwc2VkID0gRGF0ZS5ub3coKSAtIGZpcnN0VGFwVGltZTtcclxuLy8gICAgIGlmIChlbGFwc2VkIDwgMTAwMCkge1xyXG4vLyAgICAgICAvLyBMaW1pdGUgZGUgdGVtcG8gcGFyYSBjb25zaWRlcmFyIHVtIGR1cGxvIHRvcXVlICgzMDBtcylcclxuLy8gICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4vLyAgICAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XHJcbi8vICAgICAgIH1cclxuLy8gICAgICAgZmlyc3RUYXBUaW1lID0gMDsgLy8gUmVpbmljaWFyIG8gdGVtcG9yaXphZG9yXHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICBmaXJzdFRhcFRpbWUgPSBEYXRlLm5vdygpOyAvLyBJbmljaWFyIHVtIG5vdm8gdGVtcG9yaXphZG9yXHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vLyAgIG9wUmFkaW9IYW5kbGVyKGtleWRvd24pO1xyXG4vLyAgIGNwYklucEhhbmRsZXIodGhpcyk7XHJcbi8vIH1cclxuIiwiLy9uZXNzZSBmaWxlIGVzdMOjbyBwcmVzZW50ZXMgcHJpbmNpcGFsbWVudGUgYXMgZnVuw6fDtWVzIHJlbGFjaW9uYWRhcyDDoCBleGlnw6puY2lhIGRlIG1vZGVsbyB0ZXh0dWFsIGUgZGUgdmlzdWFsaXphw6fDo29cclxuaW1wb3J0ICogYXMgR2xvYmFsSGFuZGxlciBmcm9tIFwiLi9nSGFuZGxlcnNcIjtcclxuaW1wb3J0IHsgTWFuLCBXb21hbiwgTmV1dHJvIH0gZnJvbSBcIi4vY2xhc3Nlc1wiO1xyXG5pbXBvcnQgKiBhcyBFcnJvckhhbmRsZXIgZnJvbSBcIi4vZXJyb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IGV4dExpbmUgfSBmcm9tIFwiLi9lcnJvckhhbmRsZXJcIjtcclxuLy8gaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlckxpbWl0KGlucEVsKSB7XHJcbiAgICBpZiAoaW5wRWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgaW5wRWwgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50IHx8XHJcbiAgICAgICAgaW5wRWwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IGlzQXRpdkZpcyA9IGlucEVsLmNsYXNzTGlzdC5jb250YWlucyhcImlucEF0aXZGaXNcIik7XHJcbiAgICAgICAgY29uc3QgaXNBbGltUm90ID0gaW5wRWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wQWxpbVJvdFwiKTtcclxuICAgICAgICBjb25zdCBpc0RERCA9IGlucEVsLmNsYXNzTGlzdC5jb250YWlucyhcImlucERERFwiKTtcclxuICAgICAgICBjb25zdCBpc0ZyZXEgPSBpbnBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJmcmVxSW5wTGlzdFwiKTtcclxuICAgICAgICBpZiAoKGlzQXRpdkZpcyB8fFxyXG4gICAgICAgICAgICBpc0FsaW1Sb3QgfHxcclxuICAgICAgICAgICAgaW5wRWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wTG9jTnVtXCIpIHx8XHJcbiAgICAgICAgICAgIGlzREREIHx8XHJcbiAgICAgICAgICAgIGlzRnJlcSkgJiZcclxuICAgICAgICAgICAgIWlucEVsLmNsYXNzTGlzdC5jb250YWlucyhcImZsb2F0XCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnBFbC52YWx1ZT8ubWF0Y2goL1s9Liw7fi98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0vZykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdyb25nTWF0Y2hJbmRleCA9IGlucEVsLnZhbHVlLmluZGV4T2YoaW5wRWwudmFsdWUubWF0Y2goL1s9Liw7fi98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0vZyk/LlswXSA/PyBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlucEVsLnZhbHVlID1cclxuICAgICAgICAgICAgICAgICAgICBpbnBFbC52YWx1ZS5zbGljZSgwLCB3cm9uZ01hdGNoSW5kZXggPz8gMCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnBFbC52YWx1ZS5zbGljZSh3cm9uZ01hdGNoSW5kZXggKyAxID8/IDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJzZUludChpbnBFbC52YWx1ZSkgPCAxICYmIGlucEVsLmlkPy5lbmRzV2l0aChcIk1heFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wVmFsdWVBcnJheSA9IEFycmF5LmZyb20oaW5wRWwudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaW5wVmFsdWVBcnJheT8uc3BsaWNlKDAsIDEsIFwiMVwiKTtcclxuICAgICAgICAgICAgICAgIGlucEVsLnZhbHVlID0gaW5wVmFsdWVBcnJheT8udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoKGlzQXRpdkZpcyB8fCBpc0FsaW1Sb3QgfHwgaXNEREQgfHwgaXNGcmVxKSAmJlxyXG4gICAgICAgICAgICAgICAgaW5wRWwudmFsdWU/Lmxlbmd0aCA+IDIpXHJcbiAgICAgICAgICAgICAgICBpbnBFbC52YWx1ZSA9IGlucEVsLnZhbHVlLnNsaWNlKDAsIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKGlucEVsLCBgaW5wRWwgaWQgJHtpbnBFbD8uaWQgPz8gXCJVTkRFRklORUQgSURcIn0gaW4gbnVtYmVyTGltaXRgLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU5lZ2F0aXZlcyh0YWJJbnApIHtcclxuICAgIGxldCBwYXJzZWRJbnBWYWx1ZSA9IDA7XHJcbiAgICBpZiAodGFiSW5wIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgIHBhcnNlZElucFZhbHVlID0gcGFyc2VGbG9hdCh0YWJJbnAudmFsdWUpO1xyXG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VkSW5wVmFsdWUpIHx8IHBhcnNlZElucFZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgICBwYXJzZWRJbnBWYWx1ZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhYklucCwgXCJ0YWJJbnBcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgcmV0dXJuIHBhcnNlZElucFZhbHVlLnRvU3RyaW5nKCkgPz8gXCJcIjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VOb3ROYU4oaW5pVmFsLCBkZWYgPSAwLCBjb250ZXh0ID0gXCJpbnRcIiwgZml4ZWQgPSA0KSB7XHJcbiAgICBsZXQgcmV0dXJuVmFsID0gMDtcclxuICAgIGlmICh0eXBlb2YgaW5pVmFsID09PSBgc3RyaW5nYCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb250ZXh0ID09PSBgc3RyaW5nYCAmJlxyXG4gICAgICAgIHR5cGVvZiBkZWYgPT09IGBudW1iZXJgICYmXHJcbiAgICAgICAgdHlwZW9mIGZpeGVkID09PSBgbnVtYmVyYCkge1xyXG4gICAgICAgIHN3aXRjaCAoY29udGV4dCkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaW50XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWwgPSBwYXJzZUludChpbmlWYWwsIDEwKSB8fCBkZWY7XHJcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHJldHVyblZhbCkgfHwgaXNOYU4ocmV0dXJuVmFsKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWwgPSBkZWY7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImZsb2F0XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm5WYWwgPSBwYXJzZUZsb2F0KHBhcnNlRmxvYXQoaW5pVmFsKS50b0ZpeGVkKGZpeGVkKSkgfHwgZGVmO1xyXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc05hTihyZXR1cm5WYWwpIHx8IGlzTmFOKHJldHVyblZhbCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsID0gZGVmO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoXCJhcmd1bWVudG8gZGUgY29udGV4dG9cIiwgXCJjb250ZXh0XCIsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChleHRMaW5lKG5ldyBFcnJvcigpKSwgYGFyZ3VtZW50b3MgcGFyYSBwYXJzZU5vdE5hTmAsIGluaVZhbCwgY29udGV4dCwgZGVmKTtcclxuICAgIHJldHVybiByZXR1cm5WYWwgfHwgMDtcclxufVxyXG4vL1RPRE8gVkVSU8ODTyBSRUZBVE9SQURBIEFJTkRBIEVNIFBST0dSRVNTT1xyXG4vLyBleHBvcnQgZnVuY3Rpb24gYXV0b0NhcGl0YWxpemVJbnB1dHMoXHJcbi8vICAgdGV4dEVsOiBlbnRyeUVsLFxyXG4vLyAgIGlzQXV0b2NvcnJlY3RPbjogYm9vbGVhbiA9IHRydWVcclxuLy8gKTogdm9pZCB7XHJcbi8vICAgbGV0IHRleHQgPSB0ZXh0RWw/LnZhbHVlO1xyXG4vLyAgIGNvbnNvbGUubG9nKHRleHQpO1xyXG4vLyAgIGNvbnNvbGUubG9nKGlzQXV0b2NvcnJlY3RPbik7XHJcbi8vICAgLy8gaWYgKFxyXG4vLyAgIC8vICAgKHRleHRFbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcclxuLy8gICAvLyAgICAgdGV4dEVsIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkgJiZcclxuLy8gICAvLyAgIHR5cGVvZiBpc0F1dG9jb3JyZWN0T24gPT09IFwiYm9vbGVhblwiICYmXHJcbi8vICAgLy8gICBpc0F1dG9jb3JyZWN0T24gPT09IHRydWUgJiZcclxuLy8gICAvLyAgIHRleHRcclxuLy8gICAvLyApIHtcclxuLy8gICAvLyAgIGNvbnN0IG5ld1dvcmRNYXRjaGVzID0gdGV4dC5tYXRjaChcclxuLy8gICAvLyAgICAgL1xcc1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0/W2EtekEtWsOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8w4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1xccz9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdP1thLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXSovZ1xyXG4vLyAgIC8vICAgKTtcclxuLy8gICAvLyAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuLy8gICAvLyAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuLy8gICAvLyAgIGxldCByZW1hZGVUZXh0ID0gdGV4dDtcclxuLy8gICAvLyAgIHN0YXRlbWVudCBwYXJhIGRpZmVyZW5jaWFyIGluw61jaW8gZG8gcmVzdGFudGUgZG8gaW5wdXRcclxuLy8gICAvLyAgIGlmICh0ZXh0Lmxlbmd0aCA9PT0gMSAmJiAhbmV3V29yZE1hdGNoZXMpXHJcbi8vICAgLy8gICAgIHRleHRFbC52YWx1ZSA9XHJcbi8vICAgLy8gICAgICAgZml4Rmlyc3RMZXR0ZXIodGV4dEVsLCAvXFxiXFx3LywgcmFuZ2UsIHNlbGVjdGlvbiwgdGV4dFswXSkgfHxcclxuLy8gICAvLyAgICAgICB0ZXh0RWwudmFsdWUgfHxcclxuLy8gICAvLyAgICAgICBcIkVSUk9SXCI7XHJcbi8vICAgLy8gICBlbHNlIGlmIChcclxuLy8gICAvLyAgICAgKHRleHRFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBBc3RcIikgfHxcclxuLy8gICAvLyAgICAgICB0ZXh0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wSWRlbnRpZlwiKSkgJiZcclxuLy8gICAvLyAgICAgdGV4dC5sZW5ndGggPiAxXHJcbi8vICAgLy8gICApIHtcclxuLy8gICAvLyAgICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AxID1cclxuLy8gICAvLyAgICAgICAvW1xcc10qW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dK1tcXHNdKltcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXSovZztcclxuLy8gICAvLyAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDEgPSB0ZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMSk7XHJcbi8vICAgLy8gICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMiA9XHJcbi8vICAgLy8gICAgICAgLyRbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rL2c7XHJcbi8vICAgLy8gICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AyID0gdGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDIpO1xyXG4vLyAgIC8vICAgICBjb25zdCB3cm9uZ0NoYXJzUmVnZXhPcDMgPVxyXG4vLyAgIC8vICAgICAgIC8oPzw9XFxzZEQpW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xyXG4vLyAgIC8vICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlc09wMyA9IHRleHQubWF0Y2god3JvbmdDaGFyc1JlZ2V4T3AzKTtcclxuLy8gICAvLyAgICAgY29uc3Qgd3JvbmdTdGFydE1hdGNoID1cclxuLy8gICAvLyAgICAgICB0ZXh0XHJcbi8vICAgLy8gICAgICAgICAubWF0Y2goL15bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vKVxyXG4vLyAgIC8vICAgICAgICAgPy50b1N0cmluZygpID8/IFwiXCI7XHJcbi8vICAgLy8gICAgIGNvbnN0IGxldHRlck1hdGNoZXNJbmlEID0gdGV4dC5tYXRjaCgvXFxzZC9nKTtcclxuLy8gICAvLyAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0luaU5vdEQgPSB0ZXh0Lm1hdGNoKC9cXHNbXmRdL2cpO1xyXG4vLyAgIC8vICAgICBsZXQgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCA9XHJcbi8vICAgLy8gICAgICAgdGV4dC5tYXRjaChcclxuLy8gICAvLyAgICAgICAgIC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdP1xccy9nXHJcbi8vICAgLy8gICAgICAgKSA/PyBbXTtcclxuLy8gICAvLyAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSA9IHRleHQubWF0Y2goXHJcbi8vICAgLy8gICAgICAgL1xcc2RbXmFlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZ1xyXG4vLyAgIC8vICAgICApO1xyXG4vLyAgIC8vICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyID0gdGV4dC5tYXRjaChcclxuLy8gICAvLyAgICAgICAvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW15zU1xcc10vZ1xyXG4vLyAgIC8vICAgICApO1xyXG4vLyAgIC8vICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzID0gdGV4dC5tYXRjaChcclxuLy8gICAvLyAgICAgICAvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXVthLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS9nXHJcbi8vICAgLy8gICAgICk7XHJcbi8vICAgLy8gICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMgPSB0ZXh0Lm1hdGNoKFxyXG4vLyAgIC8vICAgICAgIC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdezIsfS9nXHJcbi8vICAgLy8gICAgICk7XHJcbi8vICAgLy8gICAgIGxldCBpc1VuZG9VcHBlcmNhc2UgPSBmYWxzZTtcclxuLy8gICAvLyAgICAgbGV0IGlzQ3Vyc29yQXV0b01vdmVkID0gZmFsc2U7XHJcbi8vICAgLy8gICAgIGlmIChcclxuLy8gICAvLyAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMSB8fFxyXG4vLyAgIC8vICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8XHJcbi8vICAgLy8gICAgICAgd3JvbmdDaGFyc01hdGNoZXNPcDNcclxuLy8gICAvLyAgICAgKSB7XHJcbi8vICAgLy8gICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXMgPSBbXHJcbi8vICAgLy8gICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDEgfHwgW10pLFxyXG4vLyAgIC8vICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8IFtdKSxcclxuLy8gICAvLyAgICAgICAgIC4uLih3cm9uZ0NoYXJzTWF0Y2hlc09wMyB8fCBbXSksXHJcbi8vICAgLy8gICAgICAgXTtcclxuLy8gICAvLyAgICAgICBmb3IgKGxldCBpVyA9IDA7IGlXIDwgd3JvbmdDaGFyc01hdGNoZXMubGVuZ3RoOyBpVysrKSB7XHJcbi8vICAgLy8gICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlcy5mb3JFYWNoKHdyb25nQ2hhck1hdGNoID0+IHtcclxuLy8gICAvLyAgICAgICAgICAgdGV4dEVsLnZhbHVlID1cclxuLy8gICAvLyAgICAgICAgICAgICBmaXhXcm9uZ1N0YXJ0cyhcclxuLy8gICAvLyAgICAgICAgICAgICAgIHRleHQsXHJcbi8vICAgLy8gICAgICAgICAgICAgICB3cm9uZ0NoYXJNYXRjaCxcclxuLy8gICAvLyAgICAgICAgICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzW2lXXS5sZW5ndGhcclxuLy8gICAvLyAgICAgICAgICAgICApIHx8XHJcbi8vICAgLy8gICAgICAgICAgICAgdGV4dEVsLnZhbHVlIHx8XHJcbi8vICAgLy8gICAgICAgICAgICAgXCJFUlJPUlwiO1xyXG4vLyAgIC8vICAgICAgICAgICBbdGV4dEVsLnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxyXG4vLyAgIC8vICAgICAgICAgICAgIHRleHRFbCxcclxuLy8gICAvLyAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXHJcbi8vICAgLy8gICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXHJcbi8vICAgLy8gICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlXHJcbi8vICAgLy8gICAgICAgICAgICk7XHJcbi8vICAgLy8gICAgICAgICB9KTtcclxuLy8gICAvLyAgICAgICB9XHJcbi8vICAgLy8gICAgIH1cclxuLy8gICAvLyAgICAgaWYgKHdyb25nU3RhcnRNYXRjaClcclxuLy8gICAvLyAgICAgICB0ZXh0RWwudmFsdWUgPVxyXG4vLyAgIC8vICAgICAgICAgd3JvbmdTdGFydENvcnJlY3Rpb24odGV4dEVsLnZhbHVlLCB3cm9uZ1N0YXJ0TWF0Y2gpIHx8XHJcbi8vICAgLy8gICAgICAgICB0ZXh0RWwudmFsdWUgfHxcclxuLy8gICAvLyAgICAgICAgIFwiRVJST1JcIjtcclxuLy8gICAvLyAgICAgbmV3V29yZE1hdGNoZXM/LmZvckVhY2goKCkgPT4ge1xyXG4vLyAgIC8vICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiAhbGV0dGVyTWF0Y2hlc0luaUQpIHtcclxuLy8gICAvLyAgICAgICAgIGxldHRlck1hdGNoZXNJbmlOb3RELmZvckVhY2gobGV0dGVyTWF0Y2ggPT4ge1xyXG4vLyAgIC8vICAgICAgICAgICByZW1hZGVUZXh0ID0gZml4TmV4dFdvcmRzSW5pTm90RChyZW1hZGVUZXh0LCBsZXR0ZXJNYXRjaCk7XHJcbi8vICAgLy8gICAgICAgICB9KTtcclxuLy8gICAvLyAgICAgICAgIHRleHRFbC52YWx1ZSA9IHJlbWFkZVRleHQgfHwgdGV4dEVsLnZhbHVlIHx8IFwiRVJST1JcIjtcclxuLy8gICAvLyAgICAgICAgIFt0ZXh0RWwudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoXHJcbi8vICAgLy8gICAgICAgICAgIHRleHRFbCxcclxuLy8gICAvLyAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxyXG4vLyAgIC8vICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcclxuLy8gICAvLyAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlXHJcbi8vICAgLy8gICAgICAgICApO1xyXG4vLyAgIC8vICAgICAgICAgdGV4dEVsLnZhbHVlID1cclxuLy8gICAvLyAgICAgICAgICAgd3JvbmdTdGFydENvcnJlY3Rpb24odGV4dEVsLnZhbHVlLCB3cm9uZ1N0YXJ0TWF0Y2gpIHx8XHJcbi8vICAgLy8gICAgICAgICAgIHRleHRFbC52YWx1ZSB8fFxyXG4vLyAgIC8vICAgICAgICAgICBcIkVSUk9SXCI7XHJcbi8vICAgLy8gICAgICAgfSBlbHNlIGlmIChcclxuLy8gICAvLyAgICAgICAgIChsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiBsZXR0ZXJNYXRjaGVzSW5pRCkgfHxcclxuLy8gICAvLyAgICAgICAgICghbGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgbGV0dGVyTWF0Y2hlc0luaUQpXHJcbi8vICAgLy8gICAgICAgKSB7XHJcbi8vICAgLy8gICAgICAgICBsZXQgbGV0dGVyTWF0Y2hlc0FmdGVyRDogc3RyaW5nW10gPSBbXTtcclxuLy8gICAvLyAgICAgICAgIGlmIChcclxuLy8gICAvLyAgICAgICAgICAgIWxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuLy8gICAvLyAgICAgICAgICAgKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuLy8gICAvLyAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbi8vICAgLy8gICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMylcclxuLy8gICAvLyAgICAgICAgIClcclxuLy8gICAvLyAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFtcclxuLy8gICAvLyAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbi8vICAgLy8gICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxyXG4vLyAgIC8vICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcclxuLy8gICAvLyAgICAgICAgICAgXTtcclxuLy8gICAvLyAgICAgICAgIGVsc2UgaWYgKFxyXG4vLyAgIC8vICAgICAgICAgICBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbi8vICAgLy8gICAgICAgICAgICEoXHJcbi8vICAgLy8gICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4vLyAgIC8vICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcclxuLy8gICAvLyAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzXHJcbi8vICAgLy8gICAgICAgICAgIClcclxuLy8gICAvLyAgICAgICAgIClcclxuLy8gICAvLyAgICAgICAgICAgaWYgKGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiYgbGV0dGVyTWF0Y2hlc0luaU5vdEQpXHJcbi8vICAgLy8gICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFsuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pXTtcclxuLy8gICAvLyAgICAgICAgICAgZWxzZSBpZiAoXHJcbi8vICAgLy8gICAgICAgICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxyXG4vLyAgIC8vICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbi8vICAgLy8gICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbi8vICAgLy8gICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8XHJcbi8vICAgLy8gICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RClcclxuLy8gICAvLyAgICAgICAgICAgKVxyXG4vLyAgIC8vICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXHJcbi8vICAgLy8gICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbi8vICAgLy8gICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbi8vICAgLy8gICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbi8vICAgLy8gICAgICAgICAgICAgXTtcclxuLy8gICAvLyAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQ/LmZvckVhY2gobGV0dGVyTWF0Y2hEID0+IHtcclxuLy8gICAvLyAgICAgICAgICAgcmVtYWRlVGV4dCA9IGZpeE5leHRXb3Jkc0FmdGVyRChyZW1hZGVUZXh0LCBsZXR0ZXJNYXRjaEQpO1xyXG4vLyAgIC8vICAgICAgICAgfSk7XHJcbi8vICAgLy8gICAgICAgICB0ZXh0RWwudmFsdWUgPSByZW1hZGVUZXh0IHx8IHRleHRFbC52YWx1ZSB8fCBcIkVSUk9SXCI7XHJcbi8vICAgLy8gICAgICAgICBmb3IgKFxyXG4vLyAgIC8vICAgICAgICAgICBsZXQgaUQgPSAwO1xyXG4vLyAgIC8vICAgICAgICAgICBpRCA8IEFycmF5LmZyb20obGV0dGVyTWF0Y2hlc0FmdGVyRCA/PyBbXSkubGVuZ3RoO1xyXG4vLyAgIC8vICAgICAgICAgICBpRCsrXHJcbi8vICAgLy8gICAgICAgICApIHtcclxuLy8gICAvLyAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBcnJheUQgPSBsZXR0ZXJNYXRjaGVzQWZ0ZXJEPy5maWx0ZXIoaUQgPT5cclxuLy8gICAvLyAgICAgICAgICAgICBuZXcgUmVnRXhwKC9bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdL2cpLnRlc3QoaUQpXHJcbi8vICAgLy8gICAgICAgICAgICk7XHJcbi8vICAgLy8gICAgICAgICAgIGlmIChmaWx0ZXJlZEFycmF5RCkge1xyXG4vLyAgIC8vICAgICAgICAgICAgIGNvbnN0IG1hcHBlZEFycmF5RCA9IGZpbHRlcmVkQXJyYXlELm1hcChpRCA9PiBpRC50b1VwcGVyQ2FzZSgpKTtcclxuLy8gICAvLyAgICAgICAgICAgICBsZXQgcmVtYWRlU3RyaW5nRCA9IFwiXCI7XHJcbi8vICAgLy8gICAgICAgICAgICAgaWYgKGlEID09PSAwKSB7XHJcbi8vICAgLy8gICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5zcGxpY2UoaUQsIDEsIG1hcHBlZEFycmF5RFswXSk7XHJcbi8vICAgLy8gICAgICAgICAgICAgICByZW1hZGVTdHJpbmdEID0gZmlsdGVyZWRBcnJheUQudG9TdHJpbmcoKS5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuLy8gICAvLyAgICAgICAgICAgICAgIFt0ZXh0RWwudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoXHJcbi8vICAgLy8gICAgICAgICAgICAgICAgIHRleHRFbCxcclxuLy8gICAvLyAgICAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxyXG4vLyAgIC8vICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcclxuLy8gICAvLyAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlXHJcbi8vICAgLy8gICAgICAgICAgICAgICApO1xyXG4vLyAgIC8vICAgICAgICAgICAgIH0gZWxzZSBpZiAoaUQgPT09IDEpIHtcclxuLy8gICAvLyAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnNwbGljZShpRCwgMSwgbWFwcGVkQXJyYXlEWzFdKTtcclxuLy8gICAvLyAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0QgPSBmaWx0ZXJlZEFycmF5RFxyXG4vLyAgIC8vICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxyXG4vLyAgIC8vICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChcIixcIiwgXCJcIilcclxuLy8gICAvLyAgICAgICAgICAgICAgICAgLnNsaWNlKDIpO1xyXG4vLyAgIC8vICAgICAgICAgICAgICAgW3RleHRFbC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID0gY29ycmVjdEN1cnNvck5leHRXb3JkcyhcclxuLy8gICAvLyAgICAgICAgICAgICAgICAgdGV4dEVsLFxyXG4vLyAgIC8vICAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXHJcbi8vICAgLy8gICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxyXG4vLyAgIC8vICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2VcclxuLy8gICAvLyAgICAgICAgICAgICAgICk7XHJcbi8vICAgLy8gICAgICAgICAgICAgICB0ZXh0RWwudmFsdWUgPVxyXG4vLyAgIC8vICAgICAgICAgICAgICAgICB0ZXh0RWwudmFsdWUucmVwbGFjZShcclxuLy8gICAvLyAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKGZpbHRlcmVkQXJyYXlEW2lEXSwgXCJnXCIpLFxyXG4vLyAgIC8vICAgICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0RcclxuLy8gICAvLyAgICAgICAgICAgICAgICAgKSB8fFxyXG4vLyAgIC8vICAgICAgICAgICAgICAgICB0ZXh0RWwudmFsdWUgfHxcclxuLy8gICAvLyAgICAgICAgICAgICAgICAgXCJFUlJPUlwiO1xyXG4vLyAgIC8vICAgICAgICAgICAgIH0gZWxzZSBpZiAoaUQgPiAyKSB7XHJcbi8vICAgLy8gICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5wb3AoKTtcclxuLy8gICAvLyAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnB1c2gobWFwcGVkQXJyYXlEW2lEXSk7XHJcbi8vICAgLy8gICAgICAgICAgICAgICBbdGV4dEVsLnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxyXG4vLyAgIC8vICAgICAgICAgICAgICAgICB0ZXh0RWwsXHJcbi8vICAgLy8gICAgICAgICAgICAgICAgIHdyb25nU3RhcnRNYXRjaCxcclxuLy8gICAvLyAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXHJcbi8vICAgLy8gICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZVxyXG4vLyAgIC8vICAgICAgICAgICAgICAgKTtcclxuLy8gICAvLyAgICAgICAgICAgICB9XHJcbi8vICAgLy8gICAgICAgICAgIH1cclxuLy8gICAvLyAgICAgICAgIH1cclxuLy8gICAvLyAgICAgICB9XHJcbi8vICAgLy8gICAgIH0pO1xyXG4vLyAgIC8vICAgICBzdGF0ZW1lbnQgcGFyYSBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcclxuLy8gICAvLyAgICAgaWYgKFxyXG4vLyAgIC8vICAgICAgIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMgfHxcclxuLy8gICAvLyAgICAgICB0ZXh0Lm1hdGNoKC9EW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtTXVxccy9nKVxyXG4vLyAgIC8vICAgICApIHtcclxuLy8gICAvLyAgICAgICB1bnByb3BlciB1cHBlciBjYXNlcyB3aXRoIG5vIERcclxuLy8gICAvLyAgICAgICBbXHJcbi8vICAgLy8gICAgICAgICAuLi5tdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzISxcclxuLy8gICAvLyAgICAgICAgIC4uLih0ZXh0Lm1hdGNoKFxyXG4vLyAgIC8vICAgICAgICAgICAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVxcYi9nXHJcbi8vICAgLy8gICAgICAgICApIHx8IFtdKSxcclxuLy8gICAvLyAgICAgICAgIC4uLih0ZXh0Lm1hdGNoKFxyXG4vLyAgIC8vICAgICAgICAgICAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2dcclxuLy8gICAvLyAgICAgICAgICkgfHwgW10pLFxyXG4vLyAgIC8vICAgICAgICAgLi4uKHRleHQubWF0Y2goXHJcbi8vICAgLy8gICAgICAgICAgIC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF17MiwzfVxcYi9nXHJcbi8vICAgLy8gICAgICAgICApIHx8IFtdKSxcclxuLy8gICAvLyAgICAgICAgIC4uLih0ZXh0Lm1hdGNoKFxyXG4vLyAgIC8vICAgICAgICAgICAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZ1xyXG4vLyAgIC8vICAgICAgICAgKSB8fCBbXSksXHJcbi8vICAgLy8gICAgICAgICAuLi4odGV4dC5tYXRjaChcclxuLy8gICAvLyAgICAgICAgICAgL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdezEsMn1bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rXFxiL2dcclxuLy8gICAvLyAgICAgICAgICkgfHwgW10pLFxyXG4vLyAgIC8vICAgICAgICAgLi4uKHRleHQubWF0Y2goXHJcbi8vICAgLy8gICAgICAgICAgIC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2dcclxuLy8gICAvLyAgICAgICAgICkgfHwgW10pLFxyXG4vLyAgIC8vICAgICAgIF0uZm9yRWFjaChtdWx0VXBwZXJjYXNlc01hdGNoTm9EID0+IHtcclxuLy8gICAvLyAgICAgICAgIGlmIChtdWx0VXBwZXJjYXNlc01hdGNoTm9EKSB7XHJcbi8vICAgLy8gICAgICAgICAgIHRleHQgPSBmaXhVbnByb3BlclVwcGVyY2FzZXModGV4dCwgbXVsdFVwcGVyY2FzZXNNYXRjaE5vRCwgXCJOb0RcIik7XHJcbi8vICAgLy8gICAgICAgICAgIGNvcnJlw6fDo28gZGUgYnVncyBjb20gY29tYmluYcOnw7VlcyBwb3N0ZXJpb3JlcyBkZSB1cHBlci9sb3dlclxyXG4vLyAgIC8vICAgICAgICAgICBjb25zdCB1cHBlcmxvd2VyY29tYiA9IHRleHQubWF0Y2goXHJcbi8vICAgLy8gICAgICAgICAgICAgL1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdL2dcclxuLy8gICAvLyAgICAgICAgICAgKTtcclxuLy8gICAvLyAgICAgICAgICAgY29uc3QgdXBwZXJsb3dlcmNvbWJEID0gdGV4dC5tYXRjaChcclxuLy8gICAvLyAgICAgICAgICAgICAvRFthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bXFxzXS9cclxuLy8gICAvLyAgICAgICAgICAgKTtcclxuLy8gICAvLyAgICAgICAgICAgaWYgKHVwcGVybG93ZXJjb21iIHx8IHVwcGVybG93ZXJjb21iRCkge1xyXG4vLyAgIC8vICAgICAgICAgICAgIHJlcGVhdGVkTGV0dGVyID0gcmVwZWF0ZWRMZXR0ZXIudG9Mb3dlckNhc2UoKTtcclxuLy8gICAvLyAgICAgICAgICAgfVxyXG4vLyAgIC8vICAgICAgICAgICBmaXggcGFyYSBkZWxheSBlbSBwcm9jZXNzYW1lbnRvIGRvIFMgZW0gY29uanVuw6fDtWVzXHJcbi8vICAgLy8gICAgICAgICAgIHRleHRcclxuLy8gICAvLyAgICAgICAgICAgICAubWF0Y2goL0RbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW1NdW1xcc10vKVxyXG4vLyAgIC8vICAgICAgICAgICAgID8uc3BsaWNlKDMsIDEsIFwic1wiKTtcclxuLy8gICAvLyAgICAgICAgICAgdGV4dEVsLnZhbHVlID0gdGV4dCB8fCB0ZXh0RWwudmFsdWUgfHwgXCJFUlJPUlwiO1xyXG4vLyAgIC8vICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xyXG4vLyAgIC8vICAgICAgICAgICBbdGV4dEVsLnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxyXG4vLyAgIC8vICAgICAgICAgICAgIHRleHRFbCxcclxuLy8gICAvLyAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXHJcbi8vICAgLy8gICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXHJcbi8vICAgLy8gICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlXHJcbi8vICAgLy8gICAgICAgICAgICk7XHJcbi8vICAgLy8gICAgICAgICAgIGlmIChyYW5nZS5lbmRPZmZzZXQgPj0gMSlcclxuLy8gICAvLyAgICAgICAgICAgICBmaXhDdXJzb3JQb3NpdGlvbih0ZXh0RWwsIHJhbmdlLCBzZWxlY3Rpb24sIHRydWUpO1xyXG4vLyAgIC8vICAgICAgICAgfVxyXG4vLyAgIC8vICAgICAgIH0pO1xyXG4vLyAgIC8vICAgICAgIHVucHJvcGVyIHVwcGVyIGNhc2VzIHdpdGggRFxyXG4vLyAgIC8vICAgICAgIFtcclxuLy8gICAvLyAgICAgICAgIC4uLih0ZXh0Lm1hdGNoKC9EW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU10vZykgfHwgW10pLFxyXG4vLyAgIC8vICAgICAgICAgLi4uKHRleHQubWF0Y2goL0RbQUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NdL2cpIHx8IFtdKSxcclxuLy8gICAvLyAgICAgICAgIC4uLih0ZXh0Lm1hdGNoKFxyXG4vLyAgIC8vICAgICAgICAgICAvRFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXVxccy9nXHJcbi8vICAgLy8gICAgICAgICApIHx8IFtdKSxcclxuLy8gICAvLyAgICAgICBdLmZvckVhY2gobXVsdFVwcGVyY2FzZXNNYXRjaEQgPT4ge1xyXG4vLyAgIC8vICAgICAgICAgaWYgKG11bHRVcHBlcmNhc2VzTWF0Y2hEKSB7XHJcbi8vICAgLy8gICAgICAgICAgIHRleHRFbC52YWx1ZSA9XHJcbi8vICAgLy8gICAgICAgICAgICAgZml4VW5wcm9wZXJVcHBlcmNhc2VzKHRleHQsIG11bHRVcHBlcmNhc2VzTWF0Y2hELCBcIlllc0RWYWxcIikgfHxcclxuLy8gICAvLyAgICAgICAgICAgICB0ZXh0RWwudmFsdWUgfHxcclxuLy8gICAvLyAgICAgICAgICAgICBcIkVSUk9SXCI7XHJcbi8vICAgLy8gICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSA9IHRydWU7XHJcbi8vICAgLy8gICAgICAgICAgIFt0ZXh0RWwudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoXHJcbi8vICAgLy8gICAgICAgICAgICAgdGV4dEVsLFxyXG4vLyAgIC8vICAgICAgICAgICAgIHdyb25nU3RhcnRNYXRjaCxcclxuLy8gICAvLyAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcclxuLy8gICAvLyAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2VcclxuLy8gICAvLyAgICAgICAgICAgKTtcclxuLy8gICAvLyAgICAgICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA+PSAxKVxyXG4vLyAgIC8vICAgICAgICAgICAgIGZpeEN1cnNvclBvc2l0aW9uKHRleHRFbCwgcmFuZ2UsIHNlbGVjdGlvbiwgdHJ1ZSk7XHJcbi8vICAgLy8gICAgICAgICB9XHJcbi8vICAgLy8gICAgICAgfSk7XHJcbi8vICAgLy8gICAgIH1cclxuLy8gICAvLyAgICAgaWYgKFxyXG4vLyAgIC8vICAgICAgIGxldHRlck1hdGNoZXNJbmlEICYmXHJcbi8vICAgLy8gICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxyXG4vLyAgIC8vICAgICAgICEoXHJcbi8vICAgLy8gICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbi8vICAgLy8gICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbi8vICAgLy8gICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzXHJcbi8vICAgLy8gICAgICAgKVxyXG4vLyAgIC8vICAgICApXHJcbi8vICAgLy8gICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCA9IFtdO1xyXG4vLyAgIC8vICAgICBzdGF0ZW1lbnQgcGFyYSBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXMgZm9yw6dhZG9zIGluZGV2aWRhbWVudGUgZSBwYXJhIGZsdXhvIHZhbGlkYW5kbyBtYXRjaCBkZSBpbmljaWFpc1xyXG4vLyAgIC8vICAgICBpZiAobGV0dGVyTWF0Y2hlc0luaUQgfHwgbGV0dGVyTWF0Y2hlc0luaU5vdEQpIHtcclxuLy8gICAvLyAgICAgICBmb3LDp2FyIHVwcGVyIGNhc2VcclxuLy8gICAvLyAgICAgICBjb25zdCBETWF0Y2ggPSBbXHJcbi8vICAgLy8gICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbi8vICAgLy8gICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbi8vICAgLy8gICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbi8vICAgLy8gICAgICAgXTtcclxuLy8gICAvLyAgICAgICBjb25zdCB3b3JkTWF0Y2ggPSBbXHJcbi8vICAgLy8gICAgICAgICAuLi4oRE1hdGNoPy5mbGF0KDEpID8/IFtdKSxcclxuLy8gICAvLyAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzSW5pTm90RCB8fCBbXSksXHJcbi8vICAgLy8gICAgICAgXTtcclxuLy8gICAvLyAgICAgICBmb3IgKGxldCBpTSA9IDA7IGlNIDwgd29yZE1hdGNoLmxlbmd0aDsgaU0rKykge1xyXG4vLyAgIC8vICAgICAgICAgaWYgKG5ldyBSZWdFeHAoL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vKS50ZXN0KHdvcmRNYXRjaFtpTV0pKVxyXG4vLyAgIC8vICAgICAgICAgICBjb250aW51ZTtcclxuLy8gICAvLyAgICAgICAgIHRleHRFbC52YWx1ZSA9XHJcbi8vICAgLy8gICAgICAgICAgIGZpeEZvcmNlZFVwcGVyQ2FzZSh0ZXh0RWwsIHdvcmRNYXRjaCwgd29yZE1hdGNoW2lNXSkgfHxcclxuLy8gICAvLyAgICAgICAgICAgdGV4dEVsLnZhbHVlIHx8XHJcbi8vICAgLy8gICAgICAgICAgIFwiRVJST1JcIjtcclxuLy8gICAvLyAgICAgICAgIGlmIChETWF0Y2guZmxhdCgxKS5sZW5ndGggPiAwKVxyXG4vLyAgIC8vICAgICAgICAgICBbdGV4dEVsLnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxyXG4vLyAgIC8vICAgICAgICAgICAgIHRleHRFbCxcclxuLy8gICAvLyAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXHJcbi8vICAgLy8gICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXHJcbi8vICAgLy8gICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlXHJcbi8vICAgLy8gICAgICAgICAgICk7XHJcbi8vICAgLy8gICAgICAgfVxyXG4vLyAgIC8vICAgICB9XHJcbi8vICAgLy8gICAgIGNvcnJlw6fDtWVzIGFkaWNpb25haXMgbm8gZmluYWwgZGEgZWRpw6fDo28gYXV0b23DoXRpY2FcclxuLy8gICAvLyAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AxKVxyXG4vLyAgIC8vICAgICAgIHRleHRFbC52YWx1ZSA9XHJcbi8vICAgLy8gICAgICAgICB0ZXh0RWwudmFsdWU/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AxLCBcIlwiKSB8fFxyXG4vLyAgIC8vICAgICAgICAgdGV4dEVsLnZhbHVlIHx8XHJcbi8vICAgLy8gICAgICAgICBcIkVSUk9SXCI7XHJcbi8vICAgLy8gICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMilcclxuLy8gICAvLyAgICAgICB0ZXh0RWwudmFsdWUgPVxyXG4vLyAgIC8vICAgICAgICAgdGV4dEVsLnZhbHVlPy5yZXBsYWNlQWxsKHdyb25nQ2hhcnNSZWdleE9wMiwgXCJcIikgfHxcclxuLy8gICAvLyAgICAgICAgIHRleHRFbC52YWx1ZSB8fFxyXG4vLyAgIC8vICAgICAgICAgXCJFUlJPUlwiO1xyXG4vLyAgIC8vICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDMpXHJcbi8vICAgLy8gICAgICAgdGV4dEVsLnZhbHVlID1cclxuLy8gICAvLyAgICAgICAgIHRleHRFbC52YWx1ZT8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDMsIFwiXCIpIHx8XHJcbi8vICAgLy8gICAgICAgICB0ZXh0RWwudmFsdWUgfHxcclxuLy8gICAvLyAgICAgICAgIFwiRVJST1JcIjtcclxuLy8gICAvLyAgICAgaWYgKHRleHQubWF0Y2goL1xcc1tcXHNdKy9nKSlcclxuLy8gICAvLyAgICAgICB0ZXh0RWwudmFsdWUgPVxyXG4vLyAgIC8vICAgICAgICAgdGV4dEVsLnZhbHVlPy5yZXBsYWNlQWxsKC9cXHNbXFxzXSsvZywgXCIgXCIpIHx8IHRleHRFbC52YWx1ZSB8fCBcIkVSUk9SXCI7XHJcbi8vICAgLy8gICAgIGlmICh0ZXh0Lm1hdGNoKC9eW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XS8pKVxyXG4vLyAgIC8vICAgICAgIHRleHRFbC52YWx1ZSA9XHJcbi8vICAgLy8gICAgICAgICB0ZXh0LnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpIHx8XHJcbi8vICAgLy8gICAgICAgICB0ZXh0RWwudmFsdWUgfHxcclxuLy8gICAvLyAgICAgICAgIFwiRVJST1JcIjtcclxuLy8gICAvLyAgIH1cclxuLy8gICAvLyB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGZpeEZpcnN0TGV0dGVyKFxyXG4vLyAgIHRleHRFbDogdGFyZ0VsLFxyXG4vLyAgIHJlZ2V4OiBSZWdFeHAsXHJcbi8vICAgcmFuZ2U6IFJhbmdlLFxyXG4vLyAgIHNlbDogU2VsZWN0aW9uIHwgdm9pZFZhbCxcclxuLy8gICBmc3RMZXQ6IHN0cmluZyA9IFwiXCIsXHJcbi8vICAgc2hvdWxkU2V0RW5kOiBib29sZWFuID0gZmFsc2VcclxuLy8gKTogc3RyaW5nIHtcclxuLy8gICBsZXQgY29udFRleHQgPSAodGV4dEVsIGFzIGVudHJ5RWwpPy52YWx1ZSB8fCB0ZXh0RWw/LnRleHRDb250ZW50IHx8IFwiXCI7XHJcbi8vICAgaWYgKFxyXG4vLyAgICAgdGV4dEVsIGluc3RhbmNlb2YgRWxlbWVudCAmJlxyXG4vLyAgICAgcmVnZXggaW5zdGFuY2VvZiBSZWdFeHAgJiZcclxuLy8gICAgIHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UgJiZcclxuLy8gICAgIHR5cGVvZiBmc3RMZXQgPT09IFwic3RyaW5nXCIgJiZcclxuLy8gICAgIHR5cGVvZiBzaG91bGRTZXRFbmQgPT09IFwiYm9vbGVhblwiICYmXHJcbi8vICAgICBmc3RMZXQ/Lm1hdGNoKHJlZ2V4KVxyXG4vLyAgICkge1xyXG4vLyAgICAgY29udFRleHQgPSBmc3RMZXQudG9VcHBlckNhc2UoKSArIGNvbnRUZXh0Py5zdWJzdHJpbmcoMSk/LnRvTG93ZXJDYXNlKCk7XHJcbi8vICAgICBpZiAocmFuZ2UuZW5kT2Zmc2V0ID49IDEpXHJcbi8vICAgICAgIGZpeEN1cnNvclBvc2l0aW9uKHRleHRFbCwgcmFuZ2UsIHNlbCwgc2hvdWxkU2V0RW5kKTtcclxuLy8gICB9IGVsc2VcclxuLy8gICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoXHJcbi8vICAgICAgIGV4dExpbmUobmV3IEVycm9yKCkpLFxyXG4vLyAgICAgICBcImFyZ3VtZW50cyBmb3IgZml4Rmlyc3RMZXR0ZXIoKVwiLFxyXG4vLyAgICAgICB0ZXh0RWwsXHJcbi8vICAgICAgIGAke0pTT04uc3RyaW5naWZ5KHJlZ2V4KSB8fCBudWxsfWAsXHJcbi8vICAgICAgIGAke0pTT04uc3RyaW5naWZ5KHJhbmdlKX1gIHx8IG51bGwsXHJcbi8vICAgICAgIGZzdExldCxcclxuLy8gICAgICAgc2hvdWxkU2V0RW5kXHJcbi8vICAgICApO1xyXG4vLyAgIHJldHVybiBjb250VGV4dCA/PyBcIlwiO1xyXG4vLyB9XHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBmaXhDdXJzb3JQb3NpdGlvbihcclxuLy8gICB0ZXh0RWw6IHRhcmdFbCxcclxuLy8gICByYW5nZTogUmFuZ2UsXHJcbi8vICAgc2VsOiBTZWxlY3Rpb24gfCB2b2lkVmFsLFxyXG4vLyAgIHNob3VsZFNldEVuZDogYm9vbGVhbiA9IGZhbHNlXHJcbi8vICk6IHZvaWQge1xyXG4vLyAgIGlmIChcclxuLy8gICAgIHRleHRFbCBpbnN0YW5jZW9mIEVsZW1lbnQgJiZcclxuLy8gICAgIHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UgJiZcclxuLy8gICAgIHR5cGVvZiBzaG91bGRTZXRFbmQgPT09IFwiYm9vbGVhblwiXHJcbi8vICAgKSB7XHJcbi8vICAgICByYW5nZS5zZXRTdGFydCh0ZXh0RWwsIDApO1xyXG4vLyAgICAgaWYgKHNob3VsZFNldEVuZCA9PT0gdHJ1ZSkgcmFuZ2Uuc2V0RW5kKHRleHRFbCwgMSk7XHJcbi8vICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuLy8gICAgIHNlbD8ucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbi8vICAgICBzZWw/LmFkZFJhbmdlKHJhbmdlKTtcclxuLy8gICB9IGVsc2VcclxuLy8gICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoXHJcbi8vICAgICAgIGV4dExpbmUobmV3IEVycm9yKCkpLFxyXG4vLyAgICAgICBcImFyZ3VtZW50b3MgZm9yIGZpeEN1cnNvclBvc2l0aW9uKClcIixcclxuLy8gICAgICAgdGV4dEVsLFxyXG4vLyAgICAgICBgJHtKU09OLnN0cmluZ2lmeShyYW5nZSl9YCB8fCBudWxsLFxyXG4vLyAgICAgICBzaG91bGRTZXRFbmRcclxuLy8gICAgICk7XHJcbi8vIH1cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGZpeFdyb25nU3RhcnRzKFxyXG4vLyAgIHRleHQ6IHRhcmdTdHIsXHJcbi8vICAgbWF0Y2g6IHRhcmdTdHIsXHJcbi8vICAgbGVuZ3RoOiB0YXJnTnVtID0gMlxyXG4vLyApOiBzdHJpbmcge1xyXG4vLyAgIGlmIChcclxuLy8gICAgIHR5cGVvZiB0ZXh0ID09PSBcInN0cmluZ1wiICYmXHJcbi8vICAgICB0eXBlb2YgbWF0Y2ggPT09IFwic3RyaW5nXCIgJiZcclxuLy8gICAgIHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCJcclxuLy8gICApIHtcclxuLy8gICAgIGNvbnN0IGFyclRleHQgPSBBcnJheS5mcm9tKHRleHQpO1xyXG4vLyAgICAgYXJyVGV4dC5zcGxpY2UodGV4dC5pbmRleE9mKG1hdGNoKSwgbGVuZ3RoID8/IDAsIFwiXCIpO1xyXG4vLyAgICAgdGV4dCA9IGFyclRleHQ/LnRvU3RyaW5nKCkucmVwbGFjZUFsbChcIixcIiwgXCJcIikgPz8gXCJcIjtcclxuLy8gICB9IGVsc2VcclxuLy8gICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoXHJcbi8vICAgICAgIGV4dExpbmUobmV3IEVycm9yKCkpLFxyXG4vLyAgICAgICBcImFyZ3VtZW50b3MgZm9yIGZpeFdyb25nU3RhcnRzKClcIixcclxuLy8gICAgICAgdGV4dCxcclxuLy8gICAgICAgbWF0Y2gsXHJcbi8vICAgICAgIGxlbmd0aFxyXG4vLyAgICAgKTtcclxuLy8gICByZXR1cm4gdGV4dCA/PyBcIlwiO1xyXG4vLyB9XHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxyXG4vLyAgIHRleHRFbDogdGFyZ0VsLFxyXG4vLyAgIG1hdGNoOiBzdHJpbmcsXHJcbi8vICAgaXNDdXJzb3JBdXRvTW92ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcclxuLy8gICBpc1VuZG9VcHBlcmNhc2U6IGJvb2xlYW4gPSBmYWxzZVxyXG4vLyApOiBbc3RyaW5nLCBib29sZWFuXSB7XHJcbi8vICAgbGV0IHRleHQgPSAodGV4dEVsIGFzIHRleHRFbCk/LnZhbHVlIHx8IHRleHRFbD8udGV4dENvbnRlbnQgfHwgXCJcIjtcclxuLy8gICBpZiAoXHJcbi8vICAgICB0ZXh0RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxyXG4vLyAgICAgdHlwZW9mIG1hdGNoID09PSBcInN0cmluZ1wiICYmXHJcbi8vICAgICB0eXBlb2YgaXNDdXJzb3JBdXRvTW92ZWQgPT09IFwiYm9vbGVhblwiICYmXHJcbi8vICAgICB0eXBlb2YgaXNVbmRvVXBwZXJjYXNlID09PSBcImJvb2xlYW5cIlxyXG4vLyAgICkge1xyXG4vLyAgICAgdGV4dCA9IHdyb25nU3RhcnRDb3JyZWN0aW9uKHRleHQsIG1hdGNoKTtcclxuLy8gICAgIHRleHRFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZml4bW92ZSA9PiB7XHJcbi8vICAgICAgIGNvbnN0IGtleWJvYXJkRXZlbnQgPSBmaXhtb3ZlIGFzIEtleWJvYXJkRXZlbnQ7XHJcbi8vICAgICAgIGlmIChcclxuLy8gICAgICAgICAod2luZG93LmdldFNlbGVjdGlvbigpPy5nZXRSYW5nZUF0KDApLnN0YXJ0T2Zmc2V0ID09PSAwIHx8XHJcbi8vICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk/LmdldFJhbmdlQXQoMCkuc3RhcnRPZmZzZXQgPT09IHRleHQ/Lmxlbmd0aCB8fFxyXG4vLyAgICAgICAgICAgMCkgJiZcclxuLy8gICAgICAgICAoa2V5Ym9hcmRFdmVudC5rZXkgPT09IFwiIFwiIHx8XHJcbi8vICAgICAgICAgICBrZXlib2FyZEV2ZW50LmtleSA9PT0gXCJCYWNrc3BhY2VcIiB8fFxyXG4vLyAgICAgICAgICAgKGtleWJvYXJkRXZlbnQua2V5ID49IFwiQXJyb3dMZWZ0XCIgJiZcclxuLy8gICAgICAgICAgICAga2V5Ym9hcmRFdmVudC5rZXkgPD0gXCJBcnJvd0Rvd25cIikgfHxcclxuLy8gICAgICAgICAgIChrZXlib2FyZEV2ZW50LmtleSA+PSBcImFcIiAmJiBrZXlib2FyZEV2ZW50LmtleSA8PSBcInpcIikgfHxcclxuLy8gICAgICAgICAgIChrZXlib2FyZEV2ZW50LmtleSA+PSBcIkFcIiAmJiBrZXlib2FyZEV2ZW50LmtleSA8PSBcIlpcIikgfHxcclxuLy8gICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSlcclxuLy8gICAgICAgKSB7XHJcbi8vICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQodGV4dEVsLCBpc0N1cnNvckF1dG9Nb3ZlZCk7XHJcbi8vICAgICAgICAga2V5Ym9hcmRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuLy8gICB9IGVsc2VcclxuLy8gICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoXHJcbi8vICAgICAgIGV4dExpbmUobmV3IEVycm9yKCkpLFxyXG4vLyAgICAgICBcImFyZ3VtZW50cyBmb3IgY29ycmVjdEN1cnNvck5leHRXb3JkcygpXCIsXHJcbi8vICAgICAgIHRleHRFbCxcclxuLy8gICAgICAgbWF0Y2gsXHJcbi8vICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxyXG4vLyAgICAgICBpc1VuZG9VcHBlcmNhc2VcclxuLy8gICAgICk7XHJcbi8vICAgcmV0dXJuIFt0ZXh0ID8/IFwiXCIsIGlzQ3Vyc29yQXV0b01vdmVkID8/IGZhbHNlXTtcclxuLy8gfVxyXG4vLyBleHBvcnQgZnVuY3Rpb24gd3JvbmdTdGFydENvcnJlY3Rpb24oXHJcbi8vICAgdGV4dDogc3RyaW5nLFxyXG4vLyAgIHdyb25nU3RhcnRNYXRjaDogc3RyaW5nXHJcbi8vICk6IHN0cmluZyB7XHJcbi8vICAgdHlwZW9mIHRleHQgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHdyb25nU3RhcnRNYXRjaCA9PT0gXCJzdHJpbmdcIlxyXG4vLyAgICAgPyAodGV4dCA9XHJcbi8vICAgICAgICAgdGV4dC5zbGljZSh3cm9uZ1N0YXJ0TWF0Y2gucmVwbGFjZUFsbChcIixcIiwgXCJcIikubGVuZ3RoIC0gMSkgK1xyXG4vLyAgICAgICAgIHRleHQuc2xpY2UoMCwgd3JvbmdTdGFydE1hdGNoLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpLmxlbmd0aCAtIDEpKVxyXG4vLyAgICAgOiBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKFxyXG4vLyAgICAgICAgIGV4dExpbmUobmV3IEVycm9yKCkpLFxyXG4vLyAgICAgICAgIFwiYXJndW1lbnRzIGZvciB3cm9uZ1N0YXJ0Q29ycmVjdGlvbigpXCIsXHJcbi8vICAgICAgICAgdGV4dCxcclxuLy8gICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2hcclxuLy8gICAgICAgKTtcclxuLy8gICByZXR1cm4gdGV4dCA/PyBcIlwiO1xyXG4vLyB9XHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBmaXhOZXh0V29yZHNJbmlOb3REKFxyXG4vLyAgIHJlbWFkZVRleHQ6IHN0cmluZyxcclxuLy8gICBsZXRNYXRjaDogc3RyaW5nXHJcbi8vICk6IHN0cmluZyB7XHJcbi8vICAgaWYgKHR5cGVvZiByZW1hZGVUZXh0ID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBsZXRNYXRjaCA9PT0gXCJzdHJpbmdcIikge1xyXG4vLyAgICAgY29uc3QgZ0xldE1hdGNoSSA9IHJlbWFkZVRleHQubGFzdEluZGV4T2YobGV0TWF0Y2gpICsgMTtcclxuLy8gICAgIGNvbnN0IGFyclRleHQgPSBBcnJheS5mcm9tKHJlbWFkZVRleHQpO1xyXG4vLyAgICAgYXJyVGV4dFtnTGV0TWF0Y2hJXSA9IHJlbWFkZVRleHQuY2hhckF0KGdMZXRNYXRjaEkpPy50b1VwcGVyQ2FzZSgpO1xyXG4vLyAgICAgcmVtYWRlVGV4dCA9IGFyclRleHQudG9TdHJpbmcoKT8ucmVwbGFjZUFsbChcIixcIiwgXCJcIik7XHJcbi8vICAgICBpZiAocmVtYWRlVGV4dC5tYXRjaCgvXlxcc1tcXHddKy9nKSlcclxuLy8gICAgICAgcmVtYWRlVGV4dCA9IHJlbWFkZVRleHQuc2xpY2UoMSwgcmVtYWRlVGV4dC5sZW5ndGgpICsgXCIgXCI7XHJcbi8vICAgfSBlbHNlXHJcbi8vICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKFxyXG4vLyAgICAgICBleHRMaW5lKG5ldyBFcnJvcigpKSxcclxuLy8gICAgICAgXCJhcmd1bWVudHMgZm9yIGZpeE5ldFdvcmRzSW5pTm90RCgpXCIsXHJcbi8vICAgICAgIHJlbWFkZVRleHQsXHJcbi8vICAgICAgIGxldE1hdGNoXHJcbi8vICAgICApO1xyXG4vLyAgIHJldHVybiByZW1hZGVUZXh0ID8/IFwiXCI7XHJcbi8vIH1cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGZpeE5leHRXb3Jkc0FmdGVyRChcclxuLy8gICByZW1hZGVUZXh0OiBzdHJpbmcsXHJcbi8vICAgbGV0TWF0Y2g6IHN0cmluZ1xyXG4vLyApOiBzdHJpbmcge1xyXG4vLyAgIGlmICh0eXBlb2YgcmVtYWRlVGV4dCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgbGV0TWF0Y2ggPT09IFwic3RyaW5nXCIpIHtcclxuLy8gICAgIGNvbnN0IGdsb2JhbExldHRlck1hdGNoSW5kZXhEID0gcmVtYWRlVGV4dD8ubGFzdEluZGV4T2YobGV0TWF0Y2gpICsgMTtcclxuLy8gICAgIGNvbnN0IGNhcGl0YWxpemVkQ2hhckQgPSByZW1hZGVUZXh0XHJcbi8vICAgICAgID8uY2hhckF0KGdsb2JhbExldHRlck1hdGNoSW5kZXhEKVxyXG4vLyAgICAgICA/LnRvVXBwZXJDYXNlKCk7XHJcbi8vICAgICBpZiAoY2FwaXRhbGl6ZWRDaGFyRCkge1xyXG4vLyAgICAgICBjb25zdCBhcnJUZXh0RCA9IEFycmF5LmZyb20ocmVtYWRlVGV4dCk7XHJcbi8vICAgICAgIGFyclRleHREW2dsb2JhbExldHRlck1hdGNoSW5kZXhEXSA9IGNhcGl0YWxpemVkQ2hhckQ7XHJcbi8vICAgICAgIHJlbWFkZVRleHQgPSBhcnJUZXh0RC50b1N0cmluZygpLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpO1xyXG4vLyAgICAgfVxyXG4vLyAgIH0gZWxzZVxyXG4vLyAgICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChcclxuLy8gICAgICAgZXh0TGluZShuZXcgRXJyb3IoKSksXHJcbi8vICAgICAgIFwiYXJndW1lbnRzIGZvciBmaXhOZXh0V29yZHNBZnRlckQoKVwiLFxyXG4vLyAgICAgICByZW1hZGVUZXh0LFxyXG4vLyAgICAgICBsZXRNYXRjaFxyXG4vLyAgICAgKTtcclxuLy8gICByZXR1cm4gcmVtYWRlVGV4dCA/PyBcIlwiO1xyXG4vLyB9XHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBmaXhVbnByb3BlclVwcGVyY2FzZXMoXHJcbi8vICAgdGV4dDogc3RyaW5nLFxyXG4vLyAgIG1hdGNoOiBzdHJpbmcsXHJcbi8vICAgY29udGV4dDogbG9vc2VOdW0gPSAwXHJcbi8vICk6IHN0cmluZyB7XHJcbi8vICAgaWYgKFxyXG4vLyAgICAgdHlwZW9mIHRleHQgPT09IFwic3RyaW5nXCIgJiZcclxuLy8gICAgIHR5cGVvZiBtYXRjaCA9PT0gXCJzdHJpbmdcIiAmJlxyXG4vLyAgICAgKHR5cGVvZiBjb250ZXh0ID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBjb250ZXh0ID09PSBcIm51bWJlclwiKVxyXG4vLyAgICkge1xyXG4vLyAgICAgY29uc3Qgc3BhY2VNYXRjaGVzID0gdGV4dC5tYXRjaCgvXFxzL2cpO1xyXG4vLyAgICAgY29uc3QgdXBwZXJDYXNlc1JlcGV0aXRpb25zSW5kZXggPSB0ZXh0LmluZGV4T2YobWF0Y2gpO1xyXG4vLyAgICAgY29uc3QgcmVwZWF0ZWRMZXR0ZXIgPSBtYXRjaC5zbGljZSgwLCAxKTtcclxuLy8gICAgIGNvbnN0IHRleHRCZWZvcmVSZXBldGl0aW9ucyA9IHRleHQuc3Vic3RyaW5nKDAsIHVwcGVyQ2FzZXNSZXBldGl0aW9uc0luZGV4KTtcclxuLy8gICAgIGxldCBhZGRBY3VtdWxhdG9yID0gMDtcclxuLy8gICAgIGxldCBsb3dlcmVkUmVwZXRpdGlvbnMgPSBtYXRjaC50b0xvd2VyQ2FzZSgpLnNsaWNlKDEpO1xyXG4vLyAgICAgaWYgKHNwYWNlTWF0Y2hlcykge1xyXG4vLyAgICAgICBpZiAoXHJcbi8vICAgICAgICAgY29udGV4dCA9PT0gXCJOb0RcIiB8fFxyXG4vLyAgICAgICAgIGNvbnRleHQgPT09IFwiWWVzRENvbnRcIiB8fFxyXG4vLyAgICAgICAgIGNvbnRleHQgPT09IDAgfHxcclxuLy8gICAgICAgICBjb250ZXh0ID09PSAyIHx8XHJcbi8vICAgICAgICAgIWNvbnRleHRcclxuLy8gICAgICAgKSB7XHJcbi8vICAgICAgICAgaWYgKGNvbnRleHQgPT09IFwiWWVzRENvbnRcIiB8fCBjb250ZXh0ID09PSAyKSB7XHJcbi8vICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VzTWF0Y2hlcyA9IHRleHQubWF0Y2goL1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0vZyk7XHJcbi8vICAgICAgICAgICBpZiAobG93ZXJjYXNlc01hdGNoZXMpIHtcclxuLy8gICAgICAgICAgICAgY29uc3QgbnVtTG93ZXJjYXNlcyA9IGxvd2VyY2FzZXNNYXRjaGVzLmxlbmd0aDtcclxuLy8gICAgICAgICAgICAgYWRkQWN1bXVsYXRvciArPSBudW1Mb3dlcmNhc2VzO1xyXG4vLyAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBhZGRBY3VtdWxhdG9yICs9IHNwYWNlTWF0Y2hlcy5sZW5ndGg7XHJcbi8vICAgICAgIH0gZWxzZSBpZiAoY29udGV4dCA9PT0gXCJZZXNEVmFsXCIgfHwgY29udGV4dCA9PT0gMSkgYWRkQWN1bXVsYXRvciA9IDE7XHJcbi8vICAgICAgIGVsc2UgY29uc29sZS5lcnJvcihgQ29udGV4dCB2YWx1ZSBub3Qgc3VpdGFibGVgKTtcclxuLy8gICAgIH1cclxuLy8gICAgIGNvbnN0IHRleHRBZnRlclJlcGV0aXRpb25zID0gdGV4dC5zbGljZShcclxuLy8gICAgICAgdXBwZXJDYXNlc1JlcGV0aXRpb25zSW5kZXggK1xyXG4vLyAgICAgICAgIDEgK1xyXG4vLyAgICAgICAgIGxvd2VyZWRSZXBldGl0aW9ucy5sZW5ndGggLVxyXG4vLyAgICAgICAgIGFkZEFjdW11bGF0b3IsXHJcbi8vICAgICAgIHRleHQubGVuZ3RoICsgMVxyXG4vLyAgICAgKTtcclxuLy8gICAgIEFycmF5LmZyb20odGV4dCk/LnNwbGljZShcclxuLy8gICAgICAgdXBwZXJDYXNlc1JlcGV0aXRpb25zSW5kZXggKyAxLFxyXG4vLyAgICAgICBsb3dlcmVkUmVwZXRpdGlvbnMubGVuZ3RoLFxyXG4vLyAgICAgICBsb3dlcmVkUmVwZXRpdGlvbnNcclxuLy8gICAgICk7XHJcbi8vICAgICBpZiAoY29udGV4dCA9PT0gXCJOb0RcIiB8fCBjb250ZXh0ID09PSAwIHx8ICFjb250ZXh0KVxyXG4vLyAgICAgICB0ZXh0ID1cclxuLy8gICAgICAgICB0ZXh0QmVmb3JlUmVwZXRpdGlvbnMgK1xyXG4vLyAgICAgICAgIHJlcGVhdGVkTGV0dGVyICtcclxuLy8gICAgICAgICBsb3dlcmVkUmVwZXRpdGlvbnMgK1xyXG4vLyAgICAgICAgIHRleHRBZnRlclJlcGV0aXRpb25zO1xyXG4vLyAgICAgZWxzZSBpZiAoY29udGV4dCA9PT0gXCJZZXNEVmFsXCIpIHtcclxuLy8gICAgICAgY29uc3QgdXBwZXJsb3dlcmNvbWJEID0gdGV4dC5tYXRjaChcclxuLy8gICAgICAgICAvRFthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bc1NdP1tcXHNdL1xyXG4vLyAgICAgICApO1xyXG4vLyAgICAgICBpZiAodXBwZXJsb3dlcmNvbWJEPy5sZW5ndGggPT09IDQpXHJcbi8vICAgICAgICAgbG93ZXJlZFJlcGV0aXRpb25zICs9IHVwcGVybG93ZXJjb21iRC50b1N0cmluZygpLnJlcGxhY2UoL1MvLCBcInNcIik7XHJcbi8vICAgICAgIHRleHQgPSB0ZXh0QmVmb3JlUmVwZXRpdGlvbnMgKyBsb3dlcmVkUmVwZXRpdGlvbnMgKyB0ZXh0QWZ0ZXJSZXBldGl0aW9ucztcclxuLy8gICAgIH0gZWxzZSBpZiAoY29udGV4dCA9PT0gXCJZZXNEQ29udFwiKSB7XHJcbi8vICAgICAgIHRleHQgPSB0ZXh0Lm1hdGNoKFxyXG4vLyAgICAgICAgIC9EW2FlaW91w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW3NdXFxzW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXXszLH0vXHJcbi8vICAgICAgIClcclxuLy8gICAgICAgICA/IHRleHRCZWZvcmVSZXBldGl0aW9ucyArXHJcbi8vICAgICAgICAgICBsb3dlcmVkUmVwZXRpdGlvbnMgK1xyXG4vLyAgICAgICAgICAgXCJTXCIgK1xyXG4vLyAgICAgICAgICAgdGV4dEFmdGVyUmVwZXRpdGlvbnNcclxuLy8gICAgICAgICA6IHRleHRCZWZvcmVSZXBldGl0aW9ucyArIGxvd2VyZWRSZXBldGl0aW9ucyArIHRleHRBZnRlclJlcGV0aXRpb25zO1xyXG4vLyAgICAgfSBlbHNlIGNvbnNvbGUuZXJyb3IoYENvbnRleHQgdmFsdWUgbm90IHN1aXRhYmxlYCk7XHJcbi8vICAgfSBlbHNlXHJcbi8vICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKFxyXG4vLyAgICAgICBleHRMaW5lKG5ldyBFcnJvcigpKSxcclxuLy8gICAgICAgXCJhcmd1bWVudG9zIGZvciBmaXhVbnByb3BlclVwcGVyY2FzZXMoKVwiLFxyXG4vLyAgICAgICB0ZXh0LFxyXG4vLyAgICAgICBtYXRjaCxcclxuLy8gICAgICAgY29udGV4dFxyXG4vLyAgICAgKTtcclxuLy8gICByZXR1cm4gdGV4dCA/PyBcIlwiO1xyXG4vLyB9XHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBmaXhGb3JjZWRVcHBlckNhc2UoXHJcbi8vICAgdGV4dEVsOiB0YXJnRWwsXHJcbi8vICAgd29yZE1hdGNoOiBzdHJpbmdbXSxcclxuLy8gICB3TWF0Y2hJdGVyYXRpb246IFJlZ0V4cE1hdGNoQXJyYXkgfCBzdHJpbmdcclxuLy8gKTogc3RyaW5nIHtcclxuLy8gICBsZXQgdGV4dCA9ICh0ZXh0RWwgYXMgdGV4dEVsKT8udmFsdWUgfHwgdGV4dEVsPy50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4vLyAgIGlmIChcclxuLy8gICAgIHRleHRFbCBpbnN0YW5jZW9mIEVsZW1lbnQgJiZcclxuLy8gICAgIHdvcmRNYXRjaD8uZXZlcnkobWF0Y2ggPT4gdHlwZW9mIG1hdGNoID09PSBcInN0cmluZ1wiKSAmJlxyXG4vLyAgICAgKChBcnJheS5pc0FycmF5KHdNYXRjaEl0ZXJhdGlvbikgJiZcclxuLy8gICAgICAgd01hdGNoSXRlcmF0aW9uPy5ldmVyeShpdGVyID0+IHR5cGVvZiBpdGVyID09PSBcInN0cmluZ1wiKSkgfHxcclxuLy8gICAgICAgdHlwZW9mIHdNYXRjaEl0ZXJhdGlvbiA9PT0gXCJzdHJpbmdcIilcclxuLy8gICApIHtcclxuLy8gICAgIGNvbnN0IHN0ckRsb3dlcmNhc2UgPSB3TWF0Y2hJdGVyYXRpb24udG9TdHJpbmcoKTtcclxuLy8gICAgIGNvbnN0IERVcHBlcmNhc2VkID0gc3RyRGxvd2VyY2FzZS5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcclxuLy8gICAgIGlmIChEVXBwZXJjYXNlZCkge1xyXG4vLyAgICAgICBjb25zdCBzdHJEQWZ0ZXJNaW51c0luZCA9XHJcbi8vICAgICAgICAgKHRleHQubGVuZ3RoID8/IDApIC1cclxuLy8gICAgICAgICAoXHJcbi8vICAgICAgICAgICBzdHJEbG93ZXJjYXNlLnN1YnN0cmluZygwLCAxKSArXHJcbi8vICAgICAgICAgICBEVXBwZXJjYXNlZCArXHJcbi8vICAgICAgICAgICBzdHJEbG93ZXJjYXNlLnN1YnN0cmluZygyKVxyXG4vLyAgICAgICAgICk/Lmxlbmd0aDtcclxuLy8gICAgICAgY29uc3Qgb3Bwb3NpdGVTbGljZWRDaXRlID0gdGV4dC5zbGljZShzdHJEQWZ0ZXJNaW51c0luZCA/PyAwKTtcclxuLy8gICAgICAgY29uc3Qgc3RhcnRTbGljZWRDaXRlID0gdGV4dC5zbGljZSgwLCBzdHJEQWZ0ZXJNaW51c0luZCA/PyAxKTtcclxuLy8gICAgICAgaWYgKHdvcmRNYXRjaC5sZW5ndGggPj0gMSAmJiBzdGFydFNsaWNlZENpdGUpXHJcbi8vICAgICAgICAgdGV4dCA9IHN0YXJ0U2xpY2VkQ2l0ZSArIG9wcG9zaXRlU2xpY2VkQ2l0ZTtcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vICAgcmV0dXJuIHRleHQgPz8gXCJcIjtcclxuLy8gfVxyXG4vLyBleHBvcnQgZnVuY3Rpb24gYXV0b0NhcGl0YWxpemVDaXRlKFxyXG4vLyAgIGVkaXRhYmxlQ2l0ZTogdGFyZ0VsLFxyXG4vLyAgIGlzQXV0b2NvcnJlY3RPbjogYm9vbGVhbiA9IHRydWVcclxuLy8gKTogdm9pZCB7XHJcbi8vICAgY29uc3QgY2l0ZVRleHQgPSBlZGl0YWJsZUNpdGU/LnRleHRDb250ZW50O1xyXG4vLyAgIGlmIChcclxuLy8gICAgIGVkaXRhYmxlQ2l0ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXHJcbi8vICAgICB0eXBlb2YgaXNBdXRvY29ycmVjdE9uID09PSBcImJvb2xlYW5cIiAmJlxyXG4vLyAgICAgaXNBdXRvY29ycmVjdE9uID09PSB0cnVlICYmXHJcbi8vICAgICBjaXRlVGV4dFxyXG4vLyAgICkge1xyXG4vLyAgICAgLy9pbmljaWFsaXphw6fDo28gZGUgZXhwcmVzc8O1ZXMgcmVnZXggY29tIHNldXMgb2JqZXRvcyBlIG1hdGNoZXMgYXNzb2NpYWRvc1xyXG4vLyAgICAgY29uc3QgbmV3V29yZE1hdGNoZXMgPSBjaXRlVGV4dC5tYXRjaChcclxuLy8gICAgICAgL1xcc1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0/W2EtekEtWsOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8w4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1xccz9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdP1thLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXSovZ1xyXG4vLyAgICAgKTtcclxuLy8gICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuLy8gICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuLy8gICAgIGxldCByZW1hZGVDaXRlVGV4dCA9IGNpdGVUZXh0O1xyXG4vLyAgICAgLy9zdGF0ZW1lbnQgcGFyYSBkaWZlcmVuY2lhciBpbsOtY2lvIGRvIHJlc3RhbnRlIGRvIGlucHV0XHJcbi8vICAgICBpZiAoY2l0ZVRleHQubGVuZ3RoID09PSAxICYmICFuZXdXb3JkTWF0Y2hlcylcclxuLy8gICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4Rmlyc3RMZXR0ZXIoXHJcbi8vICAgICAgICAgZWRpdGFibGVDaXRlLFxyXG4vLyAgICAgICAgIC9cXGJcXHcvLFxyXG4vLyAgICAgICAgIHJhbmdlLFxyXG4vLyAgICAgICAgIHNlbGVjdGlvbixcclxuLy8gICAgICAgICBjaXRlVGV4dFswXSxcclxuLy8gICAgICAgICB0cnVlXHJcbi8vICAgICAgICk7XHJcbi8vICAgICBlbHNlIGlmIChjaXRlVGV4dC5sZW5ndGggPiAxKSB7XHJcbi8vICAgICAgIGNvbnN0IHdyb25nU3RhcnRNYXRjaCA9XHJcbi8vICAgICAgICAgY2l0ZVRleHRcclxuLy8gICAgICAgICAgIC5tYXRjaCgvXlthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS8pXHJcbi8vICAgICAgICAgICA/LnRvU3RyaW5nKCkgPz8gXCJcIjtcclxuLy8gICAgICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AxID1cclxuLy8gICAgICAgICAvW1xcc10qW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dK1tcXHNdKltcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXSovZztcclxuLy8gICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDEgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDEpO1xyXG4vLyAgICAgICBjb25zdCB3cm9uZ0NoYXJzUmVnZXhPcDIgPVxyXG4vLyAgICAgICAgIC8kW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xyXG4vLyAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlc09wMiA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMik7XHJcbi8vICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMyA9XHJcbi8vICAgICAgICAgLyg/PD1cXHNkRClbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rL2c7XHJcbi8vICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AzID0gY2l0ZVRleHQubWF0Y2god3JvbmdDaGFyc1JlZ2V4T3AzKTtcclxuLy8gICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0luaUQgPSBjaXRlVGV4dC5tYXRjaCgvXFxzZC9nKTtcclxuLy8gICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0luaU5vdEQgPSBjaXRlVGV4dC5tYXRjaCgvXFxzW15kXS9nKTtcclxuLy8gICAgICAgbGV0IGxldHRlck5vdE1hdGNoZXNBZnRlckQgPVxyXG4vLyAgICAgICAgIGNpdGVUZXh0Lm1hdGNoKFxyXG4vLyAgICAgICAgICAgL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU10/XFxzL2dcclxuLy8gICAgICAgICApID8/IFtdO1xyXG4vLyAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxID0gY2l0ZVRleHQubWF0Y2goXHJcbi8vICAgICAgICAgL1xcc2RbXmFlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZ1xyXG4vLyAgICAgICApO1xyXG4vLyAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyID0gY2l0ZVRleHQubWF0Y2goXHJcbi8vICAgICAgICAgL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NcXHNdL2dcclxuLy8gICAgICAgKTtcclxuLy8gICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyA9IGNpdGVUZXh0Lm1hdGNoKFxyXG4vLyAgICAgICAgIC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdW2EtekEtWsOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8w4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdL2dcclxuLy8gICAgICAgKTtcclxuLy8gICAgICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyA9IGNpdGVUZXh0Lm1hdGNoKFxyXG4vLyAgICAgICAgIC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdezIsfS9nXHJcbi8vICAgICAgICk7XHJcbi8vICAgICAgIGxldCBpc0N1cnNvckF1dG9Nb3ZlZCA9IGZhbHNlO1xyXG4vLyAgICAgICBsZXQgaXNBbGVydE1hZGUgPSBmYWxzZTtcclxuLy8gICAgICAgbGV0IGlzU3BhbkFjdGl2ZSA9IGZhbHNlO1xyXG4vLyAgICAgICBsZXQgaXNVbmRvVXBwZXJjYXNlID0gZmFsc2U7XHJcbi8vICAgICAgIGlmIChcclxuLy8gICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMSB8fFxyXG4vLyAgICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8XHJcbi8vICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXNPcDNcclxuLy8gICAgICAgKSB7XHJcbi8vICAgICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXMgPSBbXHJcbi8vICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDEgfHwgW10pLFxyXG4vLyAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8IFtdKSxcclxuLy8gICAgICAgICAgIC4uLih3cm9uZ0NoYXJzTWF0Y2hlc09wMyB8fCBbXSksXHJcbi8vICAgICAgICAgXTtcclxuLy8gICAgICAgICBmb3IgKGxldCBpVyA9IDA7IGlXIDwgd3JvbmdDaGFyc01hdGNoZXMubGVuZ3RoOyBpVysrKSB7XHJcbi8vICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlcy5mb3JFYWNoKHdyb25nQ2hhck1hdGNoID0+IHtcclxuLy8gICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4V3JvbmdTdGFydHMoXHJcbi8vICAgICAgICAgICAgICAgY2l0ZVRleHQsXHJcbi8vICAgICAgICAgICAgICAgd3JvbmdDaGFyTWF0Y2gsXHJcbi8vICAgICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXNbaVddLmxlbmd0aFxyXG4vLyAgICAgICAgICAgICApO1xyXG4vLyAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4vLyAgICAgICAgICAgICAgIGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoXHJcbi8vICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUsXHJcbi8vICAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXHJcbi8vICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcclxuLy8gICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZVxyXG4vLyAgICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKFxyXG4vLyAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZSxcclxuLy8gICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZFxyXG4vLyAgICAgICAgICAgICApO1xyXG4vLyAgICAgICAgICAgICBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV0gPSBjcmVhdGVTcGFuQWxlcnQoXHJcbi8vICAgICAgICAgICAgICAgaXNTcGFuQWN0aXZlLFxyXG4vLyAgICAgICAgICAgICAgIGlzQWxlcnRNYWRlXHJcbi8vICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH1cclxuLy8gICAgICAgaWYgKHdyb25nU3RhcnRNYXRjaClcclxuLy8gICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSB3cm9uZ1N0YXJ0Q29ycmVjdGlvbihcclxuLy8gICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA/PyBcIlwiLFxyXG4vLyAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoXHJcbi8vICAgICAgICAgKTtcclxuLy8gICAgICAgbmV3V29yZE1hdGNoZXM/LmZvckVhY2goKCkgPT4ge1xyXG4vLyAgICAgICAgIC8vYmxvY28gcGFyYSBjYXBpdGFsaXphciBwYWxhdnJhcyBhcMOzcyBhIHByaW1laXJhIHBhbGF2cmFcclxuLy8gICAgICAgICBpZiAobGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgIWxldHRlck1hdGNoZXNJbmlEKSB7XHJcbi8vICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RC5mb3JFYWNoKGxldHRlck1hdGNoID0+IHtcclxuLy8gICAgICAgICAgICAgcmVtYWRlQ2l0ZVRleHQgPSBmaXhOZXh0V29yZHNJbmlOb3REKHJlbWFkZUNpdGVUZXh0LCBsZXR0ZXJNYXRjaCk7XHJcbi8vICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IHJlbWFkZUNpdGVUZXh0O1xyXG4vLyAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoXHJcbi8vICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZSxcclxuLy8gICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWRcclxuLy8gICAgICAgICAgICk7XHJcbi8vICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4vLyAgICAgICAgICAgICBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxyXG4vLyAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZSxcclxuLy8gICAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXHJcbi8vICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXHJcbi8vICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlXHJcbi8vICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSB3cm9uZ1N0YXJ0Q29ycmVjdGlvbihcclxuLy8gICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50LFxyXG4vLyAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2hcclxuLy8gICAgICAgICAgICk7XHJcbi8vICAgICAgICAgfSBlbHNlIGlmIChcclxuLy8gICAgICAgICAgIChsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiBsZXR0ZXJNYXRjaGVzSW5pRCkgfHxcclxuLy8gICAgICAgICAgICghbGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgbGV0dGVyTWF0Y2hlc0luaUQpXHJcbi8vICAgICAgICAgKSB7XHJcbi8vICAgICAgICAgICAvL2NvcnJlw6fDo28gZm9jYWRhIGVtIGNvbmp1bsOnw6NvIGNvbSBEXHJcbi8vICAgICAgICAgICBsZXQgbGV0dGVyTWF0Y2hlc0FmdGVyRDogc3RyaW5nW10gPSBbXTtcclxuLy8gICAgICAgICAgIGlmIChcclxuLy8gICAgICAgICAgICAgIWxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuLy8gICAgICAgICAgICAgKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuLy8gICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbi8vICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMylcclxuLy8gICAgICAgICAgIClcclxuLy8gICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFtcclxuLy8gICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbi8vICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxyXG4vLyAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcclxuLy8gICAgICAgICAgICAgXTtcclxuLy8gICAgICAgICAgIGVsc2UgaWYgKFxyXG4vLyAgICAgICAgICAgICBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbi8vICAgICAgICAgICAgICEoXHJcbi8vICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4vLyAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcclxuLy8gICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzXHJcbi8vICAgICAgICAgICAgIClcclxuLy8gICAgICAgICAgIClcclxuLy8gICAgICAgICAgICAgaWYgKGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiYgbGV0dGVyTWF0Y2hlc0luaU5vdEQpXHJcbi8vICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFsuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pXTtcclxuLy8gICAgICAgICAgICAgZWxzZSBpZiAoXHJcbi8vICAgICAgICAgICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxyXG4vLyAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbi8vICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbi8vICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8XHJcbi8vICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RClcclxuLy8gICAgICAgICAgICAgKVxyXG4vLyAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXHJcbi8vICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbi8vICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbi8vICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbi8vICAgICAgICAgICAgICAgXTtcclxuLy8gICAgICAgICAgIC8vY2FwaXRhbGl6YcOnw6NvIGZvY2FkYSBlbSBpbmljaWFpcyBEXHJcbi8vICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEPy5mb3JFYWNoKGxldHRlck1hdGNoRCA9PiB7XHJcbi8vICAgICAgICAgICAgIHJlbWFkZUNpdGVUZXh0ID0gZml4TmV4dFdvcmRzQWZ0ZXJEKHJlbWFkZUNpdGVUZXh0LCBsZXR0ZXJNYXRjaEQpO1xyXG4vLyAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSByZW1hZGVDaXRlVGV4dDtcclxuLy8gICAgICAgICAgIGZvciAoXHJcbi8vICAgICAgICAgICAgIGxldCBpRCA9IDA7XHJcbi8vICAgICAgICAgICAgIGlEIDwgQXJyYXkuZnJvbShsZXR0ZXJNYXRjaGVzQWZ0ZXJEID8/IFtdKS5sZW5ndGg7XHJcbi8vICAgICAgICAgICAgIGlEKytcclxuLy8gICAgICAgICAgICkge1xyXG4vLyAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZEFycmF5RCA9IGxldHRlck1hdGNoZXNBZnRlckQ/LmZpbHRlcihpRCA9PlxyXG4vLyAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoL1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0vZykudGVzdChpRClcclxuLy8gICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICAgICAgaWYgKGZpbHRlcmVkQXJyYXlEKSB7XHJcbi8vICAgICAgICAgICAgICAgY29uc3QgbWFwcGVkQXJyYXlEID0gZmlsdGVyZWRBcnJheUQubWFwKGlEID0+IGlELnRvVXBwZXJDYXNlKCkpO1xyXG4vLyAgICAgICAgICAgICAgIGxldCByZW1hZGVTdHJpbmdEID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgICBpZiAoaUQgPT09IDApIHtcclxuLy8gICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChcclxuLy8gICAgICAgICAgICAgICAgICAgaXNTcGFuQWN0aXZlLFxyXG4vLyAgICAgICAgICAgICAgICAgICBpc0FsZXJ0TWFkZVxyXG4vLyAgICAgICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnNwbGljZShpRCwgMSwgbWFwcGVkQXJyYXlEWzBdKTtcclxuLy8gICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0QgPSBmaWx0ZXJlZEFycmF5RC50b1N0cmluZygpLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID1cclxuLy8gICAgICAgICAgICAgICAgICAgY29ycmVjdEN1cnNvck5leHRXb3JkcyhcclxuLy8gICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZVxyXG4vLyAgICAgICAgICAgICAgICAgICApO1xyXG4vLyAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaUQgPT09IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChcclxuLy8gICAgICAgICAgICAgICAgICAgaXNTcGFuQWN0aXZlLFxyXG4vLyAgICAgICAgICAgICAgICAgICBpc0FsZXJ0TWFkZVxyXG4vLyAgICAgICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnNwbGljZShpRCwgMSwgbWFwcGVkQXJyYXlEWzFdKTtcclxuLy8gICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0QgPSBmaWx0ZXJlZEFycmF5RFxyXG4vLyAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxyXG4vLyAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChcIixcIiwgXCJcIilcclxuLy8gICAgICAgICAgICAgICAgICAgLnNsaWNlKDIpO1xyXG4vLyAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID1cclxuLy8gICAgICAgICAgICAgICAgICAgY29ycmVjdEN1cnNvck5leHRXb3JkcyhcclxuLy8gICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUsXHJcbi8vICAgICAgICAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZVxyXG4vLyAgICAgICAgICAgICAgICAgICApO1xyXG4vLyAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZWRpdGFibGVDaXRlLnRleHRDb250ZW50LnJlcGxhY2UoXHJcbi8vICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoZmlsdGVyZWRBcnJheURbaURdLCBcImdcIiksXHJcbi8vICAgICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0RcclxuLy8gICAgICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpRCA+IDIpIHtcclxuLy8gICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnBvcCgpO1xyXG4vLyAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQucHVzaChtYXBwZWRBcnJheURbaURdKTtcclxuLy8gICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbi8vICAgICAgICAgICAgICAgICAgIGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoXHJcbi8vICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLFxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHdyb25nU3RhcnRNYXRjaCxcclxuLy8gICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcclxuLy8gICAgICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2VcclxuLy8gICAgICAgICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH0pO1xyXG4vLyAgICAgICBpZiAobXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcykge1xyXG4vLyAgICAgICAgIFtcclxuLy8gICAgICAgICAgIC4uLm11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMsXHJcbi8vICAgICAgICAgICAuLi4oY2l0ZVRleHQubWF0Y2goXHJcbi8vICAgICAgICAgICAgIC9cXHNkW15hZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdL2dcclxuLy8gICAgICAgICAgICkgfHwgW10pLFxyXG4vLyAgICAgICAgICAgLi4uKGNpdGVUZXh0Lm1hdGNoKFxyXG4vLyAgICAgICAgICAgICAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2dcclxuLy8gICAgICAgICAgICkgfHwgW10pLFxyXG4vLyAgICAgICAgICAgLi4uKGNpdGVUZXh0Lm1hdGNoKFxyXG4vLyAgICAgICAgICAgICAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdezIsM31cXGIvZ1xyXG4vLyAgICAgICAgICAgKSB8fCBbXSksXHJcbi8vICAgICAgICAgICAuLi4oY2l0ZVRleHQubWF0Y2goXHJcbi8vICAgICAgICAgICAgIC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nXHJcbi8vICAgICAgICAgICApIHx8IFtdKSxcclxuLy8gICAgICAgICAgIC4uLihjaXRlVGV4dC5tYXRjaChcclxuLy8gICAgICAgICAgICAgL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdezEsMn1bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rXFxiL2dcclxuLy8gICAgICAgICAgICkgfHwgW10pLFxyXG4vLyAgICAgICAgICAgLi4uKGNpdGVUZXh0Lm1hdGNoKFxyXG4vLyAgICAgICAgICAgICAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nXHJcbi8vICAgICAgICAgICApIHx8IFtdKSxcclxuLy8gICAgICAgICBdLmZvckVhY2gobXVsdFVwcGVyY2FzZXNNYXRjaE5vdEQgPT4ge1xyXG4vLyAgICAgICAgICAgaWYgKG11bHRVcHBlcmNhc2VzTWF0Y2hOb3REKSB7XHJcbi8vICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeFVucHJvcGVyVXBwZXJjYXNlcyhcclxuLy8gICAgICAgICAgICAgICBjaXRlVGV4dCxcclxuLy8gICAgICAgICAgICAgICBtdWx0VXBwZXJjYXNlc01hdGNoTm90RCxcclxuLy8gICAgICAgICAgICAgICBcIk5vRFwiXHJcbi8vICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSA9IHRydWU7XHJcbi8vICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbi8vICAgICAgICAgICAgICAgY29ycmVjdEN1cnNvck5leHRXb3JkcyhcclxuLy8gICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZSxcclxuLy8gICAgICAgICAgICAgICAgIHdyb25nU3RhcnRNYXRjaCxcclxuLy8gICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxyXG4vLyAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlXHJcbi8vICAgICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoXHJcbi8vICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLFxyXG4vLyAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkXHJcbi8vICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChcclxuLy8gICAgICAgICAgICAgICBpc1NwYW5BY3RpdmUsXHJcbi8vICAgICAgICAgICAgICAgaXNBbGVydE1hZGVcclxuLy8gICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgICAgICBbXHJcbi8vICAgICAgICAgICAuLi4oY2l0ZVRleHQubWF0Y2goL0RbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXS9nKSB8fCBbXSksXHJcbi8vICAgICAgICAgICAuLi4oY2l0ZVRleHQubWF0Y2goL0RbQUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NdL2cpIHx8IFtdKSxcclxuLy8gICAgICAgICAgIC4uLihjaXRlVGV4dC5tYXRjaChcclxuLy8gICAgICAgICAgICAgL0RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU11cXHMvZ1xyXG4vLyAgICAgICAgICAgKSB8fCBbXSksXHJcbi8vICAgICAgICAgXS5mb3JFYWNoKG11bHRVcHBlcmNhc2VzTWF0Y2hEID0+IHtcclxuLy8gICAgICAgICAgIGlmIChtdWx0VXBwZXJjYXNlc01hdGNoRCkge1xyXG4vLyAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSBmaXhVbnByb3BlclVwcGVyY2FzZXMoXHJcbi8vICAgICAgICAgICAgICAgY2l0ZVRleHQsXHJcbi8vICAgICAgICAgICAgICAgbXVsdFVwcGVyY2FzZXNNYXRjaEQsXHJcbi8vICAgICAgICAgICAgICAgXCJZZXNEQ29udFwiXHJcbi8vICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSA9IHRydWU7XHJcbi8vICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbi8vICAgICAgICAgICAgICAgY29ycmVjdEN1cnNvck5leHRXb3JkcyhcclxuLy8gICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZSxcclxuLy8gICAgICAgICAgICAgICAgIHdyb25nU3RhcnRNYXRjaCxcclxuLy8gICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxyXG4vLyAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlXHJcbi8vICAgICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoXHJcbi8vICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLFxyXG4vLyAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkXHJcbi8vICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChcclxuLy8gICAgICAgICAgICAgICBpc1NwYW5BY3RpdmUsXHJcbi8vICAgICAgICAgICAgICAgaXNBbGVydE1hZGVcclxuLy8gICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgICBpZiAoXHJcbi8vICAgICAgICAgbGV0dGVyTWF0Y2hlc0luaUQgJiZcclxuLy8gICAgICAgICBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbi8vICAgICAgICAgIShcclxuLy8gICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuLy8gICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcclxuLy8gICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDNcclxuLy8gICAgICAgICApXHJcbi8vICAgICAgIClcclxuLy8gICAgICAgICBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEID0gW107XHJcbi8vICAgICAgIC8vc3RhdGVtZW50IHBhcmEgY29ycmXDp8OjbyBkZSBtw7psdGlwbG9zIHVwcGVyIGNhc2VzIGZvcsOnYWRvcyBpbmRldmlkYW1lbnRlXHJcbi8vICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pRCB8fCBsZXR0ZXJNYXRjaGVzSW5pTm90RCkge1xyXG4vLyAgICAgICAgIC8vZm9yw6dhciB1cHBlciBjYXNlXHJcbi8vICAgICAgICAgY29uc3QgRE1hdGNoID0gW1xyXG4vLyAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHwgW10pLFxyXG4vLyAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxyXG4vLyAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4vLyAgICAgICAgIF07XHJcbi8vICAgICAgICAgY29uc3Qgd29yZE1hdGNoID0gW1xyXG4vLyAgICAgICAgICAgLi4uKERNYXRjaD8uZmxhdCgxKSA/PyBbXSksXHJcbi8vICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pLFxyXG4vLyAgICAgICAgIF07XHJcbi8vICAgICAgICAgZm9yIChsZXQgaU0gPSAwOyBpTSA8IHdvcmRNYXRjaC5sZW5ndGg7IGlNKyspIHtcclxuLy8gICAgICAgICAgIGlmIChuZXcgUmVnRXhwKC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdLykudGVzdCh3b3JkTWF0Y2hbaU1dKSlcclxuLy8gICAgICAgICAgICAgY29udGludWU7XHJcbi8vICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSBmaXhGb3JjZWRVcHBlckNhc2UoXHJcbi8vICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZSxcclxuLy8gICAgICAgICAgICAgd29yZE1hdGNoLFxyXG4vLyAgICAgICAgICAgICB3b3JkTWF0Y2hbaU1dXHJcbi8vICAgICAgICAgICApO1xyXG4vLyAgICAgICAgICAgaWYgKERNYXRjaC5mbGF0KDEpLmxlbmd0aCA+IDApIHtcclxuLy8gICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID1cclxuLy8gICAgICAgICAgICAgICBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxyXG4vLyAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLFxyXG4vLyAgICAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxyXG4vLyAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXHJcbi8vICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2VcclxuLy8gICAgICAgICAgICAgICApO1xyXG4vLyAgICAgICAgICAgICBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV0gPSBjcmVhdGVTcGFuQWxlcnQoXHJcbi8vICAgICAgICAgICAgICAgaXNTcGFuQWN0aXZlLFxyXG4vLyAgICAgICAgICAgICAgIGlzQWxlcnRNYWRlXHJcbi8vICAgICAgICAgICAgICk7XHJcbi8vICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9XHJcbi8vICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMSkge1xyXG4vLyAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9XHJcbi8vICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AxLCBcIlwiKSA/P1xyXG4vLyAgICAgICAgICAgKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCB8fCBcIkVSUk9SXCIpO1xyXG4vLyAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGVkaXRhYmxlQ2l0ZSwgaXNDdXJzb3JBdXRvTW92ZWQpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMikge1xyXG4vLyAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9XHJcbi8vICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AyLCBcIlwiKSA/P1xyXG4vLyAgICAgICAgICAgKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCB8fCBcIkVSUk9SXCIpO1xyXG4vLyAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGVkaXRhYmxlQ2l0ZSwgaXNDdXJzb3JBdXRvTW92ZWQpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xyXG4vLyAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9XHJcbi8vICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AzLCBcIlwiKSA/P1xyXG4vLyAgICAgICAgICAgKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCB8fCBcIkVSUk9SXCIpO1xyXG4vLyAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGVkaXRhYmxlQ2l0ZSwgaXNDdXJzb3JBdXRvTW92ZWQpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICAgIGlmIChlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/Lm1hdGNoKC9cXHNbXFxzXSsvZykpIHtcclxuLy8gICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPVxyXG4vLyAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50Py5yZXBsYWNlQWxsKC9cXHNbXFxzXSsvZywgXCIgXCIpID8/XHJcbi8vICAgICAgICAgICAoZWRpdGFibGVDaXRlLnRleHRDb250ZW50IHx8IFwiRVJST1JcIik7XHJcbi8vICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoZWRpdGFibGVDaXRlLCBpc0N1cnNvckF1dG9Nb3ZlZCk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vICAgZnVuY3Rpb24gY3JlYXRlU3BhbkFsZXJ0KFxyXG4vLyAgICAgaXNTcGFuQWN0aXZlOiBib29sZWFuID0gZmFsc2UsXHJcbi8vICAgICBpc0FsZXJ0TWFkZTogYm9vbGVhbiA9IGZhbHNlXHJcbi8vICAgKTogW2Jvb2xlYW4sIGJvb2xlYW5dIHtcclxuLy8gICAgIGlmIChcclxuLy8gICAgICAgZWRpdGFibGVDaXRlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcclxuLy8gICAgICAgZWRpdGFibGVDaXRlLm5leHRFbGVtZW50U2libGluZ1xyXG4vLyAgICAgKSB7XHJcbi8vICAgICAgIGNvbnN0IG5leHRDaXRlRWxlbWVudFNpYmxpbmcgPSBlZGl0YWJsZUNpdGUubmV4dEVsZW1lbnRTaWJsaW5nPy5pZDtcclxuLy8gICAgICAgaWYgKG5leHRDaXRlRWxlbWVudFNpYmxpbmcgPT09IFwiZGVhY3RBdXRvY29ycmVjdEJ0blwiICYmICFpc1NwYW5BY3RpdmUpIHtcclxuLy8gICAgICAgICBjb25zdCBjdXJzb3JSZXNldEFsZXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbi8vICAgICAgICAgaWYgKCFpc0FsZXJ0TWFkZSkge1xyXG4vLyAgICAgICAgICAgY3Vyc29yUmVzZXRBbGVydC50ZXh0Q29udGVudCA9IFwiQ3Vyc29yIHJlc2V0YWRvISBBcGVydGUgYWxndW1hIHRlY2xhXCI7XHJcbi8vICAgICAgICAgICBpc0FsZXJ0TWFkZSA9IHRydWU7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGVkaXRhYmxlQ2l0ZS5wYXJlbnROb2RlPy5pbnNlcnRCZWZvcmUoXHJcbi8vICAgICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LFxyXG4vLyAgICAgICAgICAgZWRpdGFibGVDaXRlLm5leHRTaWJsaW5nXHJcbi8vICAgICAgICAgKTtcclxuLy8gICAgICAgICBPYmplY3QuYXNzaWduKGN1cnNvclJlc2V0QWxlcnQsIHtcclxuLy8gICAgICAgICAgIGNsYXNzOiBcImJyaWVmQWxlcnRcIixcclxuLy8gICAgICAgICAgIGlkOiBcImJyaWVmQWxlcnRDaXRlXCIsXHJcbi8vICAgICAgICAgICBzdHlsZToge1xyXG4vLyAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiOiBcIndoaXRlXCIsXHJcbi8vICAgICAgICAgICAgIG9wYWNpdHk6IFwiMVwiLFxyXG4vLyAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjhweFwiLFxyXG4vLyAgICAgICAgICAgfSxcclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgICAgICBlZGl0YWJsZUNpdGUuc3R5bGUuc2V0UHJvcGVydHkoXHJcbi8vICAgICAgICAgICBcImJvcmRlci1jb2xvclwiLFxyXG4vLyAgICAgICAgICAgXCJyZ2JhKDI1NSwgMTY1LCAwLCAwLjkpXCJcclxuLy8gICAgICAgICApOyAvL2FsZXJ0YXIgdXN1w6FyaW8gZGEgbXVkYW7Dp2EgZGUgY3Vyc29yIGRldmlkbyDDoCByZWNvbnN0cnXDp8OjbyBkbyB0ZXh0Q29udGVudCBlZGl0w6F2ZWxcclxuLy8gICAgICAgICBpc1NwYW5BY3RpdmUgPSB0cnVlO1xyXG4vLyAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4vLyAgICAgICAgICAgY29uc3QgcmdiYU1hdGNoID0gd2luZG93XHJcbi8vICAgICAgICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKGVkaXRhYmxlQ2l0ZSlcclxuLy8gICAgICAgICAgICAgPy5nZXRQcm9wZXJ0eVZhbHVlKFwiYm9yZGVyLWNvbG9yXCIpXHJcbi8vICAgICAgICAgICAgID8ubWF0Y2goL3JnYmFcXCgoXFxkKyksIChcXGQrKSwgKFxcZCspLCAoW1xcZC5dKylcXCkvKTtcclxuLy8gICAgICAgICAgIGlmIChyZ2JhTWF0Y2gpIHtcclxuLy8gICAgICAgICAgICAgY29uc3QgcmVkdWNlT3BhY2l0eSA9IHNldEludGVydmFsKCgpID0+IHtcclxuLy8gICAgICAgICAgICAgICBsZXQgc3RyVXBkYXRlZEFscGhhID0gcmdiYU1hdGNoLnBvcCgpPy50b1N0cmluZygpOyAvL2ZheiBhIHJldGlyYWRhIGluaWNpYWxcclxuLy8gICAgICAgICAgICAgICBjb25zdCBmaXJzdFNsaWNlU3RyUmdiYSA9IHJnYmFNYXRjaFxyXG4vLyAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuLy8gICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKC8sXFxkKy4/XFxkKi4/XFxkKi9nLCBcIlwiKVxyXG4vLyAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIDE4KTtcclxuLy8gICAgICAgICAgICAgICBsZXQgc3RyTmV3T3BhY2l0eVZhbHVlID1cclxuLy8gICAgICAgICAgICAgICAgIGZpcnN0U2xpY2VTdHJSZ2JhICsgXCIgXCIgKyBzdHJVcGRhdGVkQWxwaGEgKyBcIilcIjtcclxuLy8gICAgICAgICAgICAgICBpZiAoc3RyVXBkYXRlZEFscGhhICYmIHN0clVwZGF0ZWRBbHBoYSA8PSBcIjAuMDVcIikge1xyXG4vLyAgICAgICAgICAgICAgICAgc3RyVXBkYXRlZEFscGhhID0gXCIwXCI7XHJcbi8vICAgICAgICAgICAgICAgICBzdHJOZXdPcGFjaXR5VmFsdWUgPSBmaXJzdFNsaWNlU3RyUmdiYSArIFwiMClcIjtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQucmVtb3ZlKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlZHVjZU9wYWNpdHkpO1xyXG4vLyAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUuc3R5bGUuc2V0UHJvcGVydHkoXHJcbi8vICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiLFxyXG4vLyAgICAgICAgICAgICAgICAgc3RyTmV3T3BhY2l0eVZhbHVlXHJcbi8vICAgICAgICAgICAgICAgKTtcclxuLy8gICAgICAgICAgICAgfSwgMTAwKTtcclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9LCA1MDApO1xyXG4vLyAgICAgICB9IGVsc2UgaWYgKG5leHRDaXRlRWxlbWVudFNpYmxpbmcgPT09IFwiYnJpZWZBbGVydENpdGVcIiB8fCBpc1NwYW5BY3RpdmUpIHtcclxuLy8gICAgICAgICAvL2FsZ3VtIGVmZWl0byB2aXN1YWxcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSBlbHNlXHJcbi8vICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoXHJcbi8vICAgICAgICAgZXh0TGluZShuZXcgRXJyb3IoKSksXHJcbi8vICAgICAgICAgXCJhcmd1bWVudHMgZm9yIGNyZWF0ZVNwYW5BbGVydFwiLFxyXG4vLyAgICAgICAgIGVkaXRhYmxlQ2l0ZSxcclxuLy8gICAgICAgICBlZGl0YWJsZUNpdGU/Lm5leHRFbGVtZW50U2libGluZ1xyXG4vLyAgICAgICApO1xyXG4vLyAgICAgcmV0dXJuIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXTtcclxuLy8gICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIG1vdmVDdXJzb3JUb1RoZUVuZChcclxuLy8gICB0ZXh0RWw6IHRhcmdFbCxcclxuLy8gICBpc0N1cnNvckF1dG9Nb3ZlZDogYm9vbGVhbiA9IGZhbHNlXHJcbi8vICk6IGJvb2xlYW4ge1xyXG4vLyAgIGlmICh0ZXh0RWwgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbi8vICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAmJiAhaXNDdXJzb3JBdXRvTW92ZWQpIHtcclxuLy8gICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4vLyAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGV4dEVsKTtcclxuLy8gICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xyXG4vLyAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbi8vICAgICAgIHNlbD8ucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbi8vICAgICAgIHNlbD8uYWRkUmFuZ2UocmFuZ2UpO1xyXG4vLyAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IHRydWU7XHJcbi8vICAgICB9IGVsc2UgaXNDdXJzb3JBdXRvTW92ZWQgPSBmYWxzZTtcclxuLy8gICB9IGVsc2VcclxuLy8gICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoXHJcbi8vICAgICAgIHRleHRFbCxcclxuLy8gICAgICAgXCJhcmd1bWVudHMgZm9yIG1vdmVDdXJzb3JUb1RoZUVuZCgpXCIsXHJcbi8vICAgICAgIGV4dExpbmUobmV3IEVycm9yKCkpXHJcbi8vICAgICApO1xyXG4vLyAgIHJldHVybiBpc0N1cnNvckF1dG9Nb3ZlZCA/PyBmYWxzZTtcclxuLy8gfVxyXG5leHBvcnQgZnVuY3Rpb24gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCA9IGZhbHNlLCBpc1VuZG9VcHBlcmNhc2UgPSBmYWxzZSwgbWF0Y2ggPSBcIlwiLCB0ZXh0RWxlbWVudCkge1xyXG4gICAgbGV0IHRleHQgPSB0ZXh0RWxlbWVudC52YWx1ZSB8fCB0ZXh0RWxlbWVudC50ZXh0Q29udGVudCB8fCBudWxsO1xyXG4gICAgbGV0IGlzRml4QWZ0ZXJEQ3Vyc29yRXhlYyA9IGZhbHNlO1xyXG4gICAgaWYgKGlzRml4QWZ0ZXJEQ3Vyc29yRXhlYylcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCBzZWxlY3Rpb25Qb3NpdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKT8uZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldDtcclxuICAgIHRleHQgPSB3cm9uZ1N0YXJ0Q29ycmVjdGlvbih0ZXh0LCBtYXRjaCk7XHJcbiAgICB0ZXh0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZml4bW92ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qga2V5Ym9hcmRFdmVudCA9IGZpeG1vdmU7XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvblBvc2l0aW9uID09PSAwIHx8IHNlbGVjdGlvblBvc2l0aW9uID09PSB0ZXh0Py5sZW5ndGggfHwgMCkge1xyXG4gICAgICAgICAgICBpZiAoa2V5Ym9hcmRFdmVudC5rZXkgPT09IFwiIFwiIHx8XHJcbiAgICAgICAgICAgICAgICBrZXlib2FyZEV2ZW50LmtleSA9PT0gXCJCYWNrc3BhY2VcIiB8fFxyXG4gICAgICAgICAgICAgICAgKGtleWJvYXJkRXZlbnQua2V5ID49IFwiQXJyb3dMZWZ0XCIgJiZcclxuICAgICAgICAgICAgICAgICAgICBrZXlib2FyZEV2ZW50LmtleSA8PSBcIkFycm93RG93blwiKSB8fFxyXG4gICAgICAgICAgICAgICAgKGtleWJvYXJkRXZlbnQua2V5ID49IFwiYVwiICYmIGtleWJvYXJkRXZlbnQua2V5IDw9IFwielwiKSB8fFxyXG4gICAgICAgICAgICAgICAgKGtleWJvYXJkRXZlbnQua2V5ID49IFwiQVwiICYmIGtleWJvYXJkRXZlbnQua2V5IDw9IFwiWlwiKSB8fFxyXG4gICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzRml4QWZ0ZXJEQ3Vyc29yRXhlYylcclxuICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgdGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAga2V5Ym9hcmRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaXNGaXhBZnRlckRDdXJzb3JFeGVjID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFt0ZXh0LCBpc0N1cnNvckF1dG9Nb3ZlZF07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHdyb25nU3RhcnRDb3JyZWN0aW9uKHRleHQgPSBcIlwiLCB3cm9uZ1N0YXJ0TWF0Y2ggPSBcIlwiKSB7XHJcbiAgICBsZXQgZml4ZWRUZXh0ID0gdGV4dDtcclxuICAgIGlmICh3cm9uZ1N0YXJ0TWF0Y2ggJiYgdGV4dCkge1xyXG4gICAgICAgIGNvbnN0IHdyb25nU3RhcnRMZW5ndGggPSB3cm9uZ1N0YXJ0TWF0Y2hcclxuICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpLmxlbmd0aDtcclxuICAgICAgICBmaXhlZFRleHQgPVxyXG4gICAgICAgICAgICB0ZXh0LnNsaWNlKHdyb25nU3RhcnRMZW5ndGggLSAxKSArIHRleHQuc2xpY2UoMCwgd3JvbmdTdGFydExlbmd0aCAtIDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpeGVkVGV4dDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkID0gZmFsc2UsIHRleHRFbGVtZW50KSB7XHJcbiAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAmJiAhaXNDdXJzb3JBdXRvTW92ZWQpIHtcclxuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHRleHRFbGVtZW50KTtcclxuICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XHJcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIHNlbD8ucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgc2VsPy5hZGRSYW5nZShyYW5nZSk7XHJcbiAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gZmFsc2U7XHJcbiAgICByZXR1cm4gaXNDdXJzb3JBdXRvTW92ZWQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZpeEN1cnNvclBvc2l0aW9uKHRleHRFbGVtZW50LCByYW5nZSwgc2VsZWN0aW9uLCBzaG91bGRTZXRFbmQgPSBmYWxzZSkge1xyXG4gICAgcmFuZ2Uuc2V0U3RhcnQodGV4dEVsZW1lbnQsIDApO1xyXG4gICAgaWYgKHNob3VsZFNldEVuZCA9PT0gdHJ1ZSlcclxuICAgICAgICByYW5nZS5zZXRFbmQodGV4dEVsZW1lbnQsIDEpO1xyXG4gICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcbiAgICBzZWxlY3Rpb24/LnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgc2VsZWN0aW9uPy5hZGRSYW5nZShyYW5nZSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZpeEZpcnN0TGV0dGVyKGZzdExldCA9IFwiXCIsIHJlZ2V4LCB0ZXh0RWxlbWVudCwgcmFuZ2UsIHNlbGVjdGlvbiwgc2hvdWxkU2V0RW5kID0gZmFsc2UpIHtcclxuICAgIGxldCBjb250VGV4dCA9IHRleHRFbGVtZW50LnZhbHVlIHx8IHRleHRFbGVtZW50LnRleHRDb250ZW50IHx8IFwiXCI7XHJcbiAgICBjb25zdCBmaXJzdExldHRlck1hdGNoID0gZnN0TGV0Py5tYXRjaChyZWdleCk7XHJcbiAgICBpZiAoZmlyc3RMZXR0ZXJNYXRjaCkge1xyXG4gICAgICAgIGNvbnRUZXh0ID0gZnN0TGV0Py50b1VwcGVyQ2FzZSgpICsgY29udFRleHQuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA+PSAxKVxyXG4gICAgICAgICAgICBmaXhDdXJzb3JQb3NpdGlvbih0ZXh0RWxlbWVudCwgcmFuZ2UsIHNlbGVjdGlvbiwgc2hvdWxkU2V0RW5kKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb250VGV4dDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZml4V3JvbmdTdGFydHModGV4dCA9IFwiXCIsIG1hdGNoID0gXCJcIiwgbGVuZ3RoID0gMCkge1xyXG4gICAgbGV0IGZpeGVkU3RyID0gdGV4dCA/PyBcIlwiO1xyXG4gICAgaWYgKHRleHQgJiYgbWF0Y2gpIHtcclxuICAgICAgICBjb25zdCBhcnJUZXh0ID0gQXJyYXkuZnJvbSh0ZXh0KTtcclxuICAgICAgICBhcnJUZXh0LnNwbGljZSh0ZXh0LmluZGV4T2YobWF0Y2gpLCBsZW5ndGgsIFwiXCIpO1xyXG4gICAgICAgIGZpeGVkU3RyID0gYXJyVGV4dC50b1N0cmluZygpLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpeGVkU3RyO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmaXhOZXh0V29yZHNJbmlOb3REKHJlbWFkZVRleHQgPSBcIlwiLCBsZXRNYXRjaCA9IFwiXCIpIHtcclxuICAgIGlmIChyZW1hZGVUZXh0KSB7XHJcbiAgICAgICAgY29uc3QgZ0xldE1hdGNoSSA9IHJlbWFkZVRleHQubGFzdEluZGV4T2YobGV0TWF0Y2gpICsgMTtcclxuICAgICAgICBjb25zdCBjYXBDaGFyID0gcmVtYWRlVGV4dC5jaGFyQXQoZ0xldE1hdGNoSSk/LnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgYXJyVGV4dCA9IEFycmF5LmZyb20ocmVtYWRlVGV4dCk7XHJcbiAgICAgICAgYXJyVGV4dFtnTGV0TWF0Y2hJXSA9IGNhcENoYXI7XHJcbiAgICAgICAgcmVtYWRlVGV4dCA9IGFyclRleHQudG9TdHJpbmcoKS5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuICAgICAgICBpZiAocmVtYWRlVGV4dC5tYXRjaCgvXlxcc1tcXHddKy9nKSlcclxuICAgICAgICAgICAgcmVtYWRlVGV4dCA9IHJlbWFkZVRleHQuc2xpY2UoMSwgcmVtYWRlVGV4dC5sZW5ndGgpICsgXCIgXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmVtYWRlVGV4dCA9IFwiXCI7XHJcbiAgICByZXR1cm4gcmVtYWRlVGV4dDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZml4TmV4dFdvcmRzQWZ0ZXJEKHJlbWFkZVRleHQgPSBcIlwiLCBsZXRNYXRjaCA9IFwiXCIpIHtcclxuICAgIGNvbnN0IGdsb2JhbExldHRlck1hdGNoSW5kZXhEID0gcmVtYWRlVGV4dFxyXG4gICAgICAgID8gcmVtYWRlVGV4dC5sYXN0SW5kZXhPZihsZXRNYXRjaCkgKyAxXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoZ2xvYmFsTGV0dGVyTWF0Y2hJbmRleEQpIHtcclxuICAgICAgICBjb25zdCBhY3R1YWxDaGFyRCA9IHJlbWFkZVRleHQ/LmNoYXJBdChnbG9iYWxMZXR0ZXJNYXRjaEluZGV4RCk7XHJcbiAgICAgICAgY29uc3QgY2FwaXRhbGl6ZWRDaGFyRCA9IGFjdHVhbENoYXJEPy50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChyZW1hZGVUZXh0ICYmIGNhcGl0YWxpemVkQ2hhckQpIHtcclxuICAgICAgICAgICAgY29uc3QgY2l0ZVRleHRBcnJheUQgPSBBcnJheS5mcm9tKHJlbWFkZVRleHQpO1xyXG4gICAgICAgICAgICBjaXRlVGV4dEFycmF5RFtnbG9iYWxMZXR0ZXJNYXRjaEluZGV4RF0gPSBjYXBpdGFsaXplZENoYXJEO1xyXG4gICAgICAgICAgICByZW1hZGVUZXh0ID0gY2l0ZVRleHRBcnJheUQudG9TdHJpbmcoKS5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVtYWRlVGV4dDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZml4VW5wcm9wZXJVcHBlcmNhc2VzKHRleHQgPSBcIlwiLCBtYXRjaCA9IFwiXCIsIGNvbnRleHQgPSAwKSB7XHJcbiAgICBjb25zdCBzcGFjZU1hdGNoZXMgPSB0ZXh0Lm1hdGNoKC9cXHMvZyk7XHJcbiAgICBjb25zdCB1cHBlckNhc2VzUmVwZXRpdGlvbnNJbmRleCA9IHRleHQuaW5kZXhPZihtYXRjaCk7XHJcbiAgICBjb25zdCB0ZXh0QmVmb3JlUmVwZXRpdGlvbnMgPSB0ZXh0LnN1YnN0cmluZygwLCB1cHBlckNhc2VzUmVwZXRpdGlvbnNJbmRleCk7XHJcbiAgICBsZXQgYWRkQWN1bXVsYXRvciA9IDAsIGxvd2VyZWRSZXBldGl0aW9ucyA9IFwiXCI7XHJcbiAgICBsb3dlcmVkUmVwZXRpdGlvbnMgPSBtYXRjaC50b0xvd2VyQ2FzZSgpLnNsaWNlKDEpO1xyXG4gICAgaWYgKHNwYWNlTWF0Y2hlcykge1xyXG4gICAgICAgIGlmIChjb250ZXh0ID09PSBcIk5vRFwiIHx8XHJcbiAgICAgICAgICAgIGNvbnRleHQgPT09IFwiWWVzRENvbnRcIiB8fFxyXG4gICAgICAgICAgICBjb250ZXh0ID09IDAgfHxcclxuICAgICAgICAgICAgY29udGV4dCA9PT0gMiB8fFxyXG4gICAgICAgICAgICAhY29udGV4dCkge1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dCA9PT0gXCJZZXNEQ29udFwiIHx8IGNvbnRleHQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZXNNYXRjaGVzID0gdGV4dC5tYXRjaCgvW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XS9nKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VzTWF0Y2hlcylcclxuICAgICAgICAgICAgICAgICAgICBhZGRBY3VtdWxhdG9yICs9IGxvd2VyY2FzZXNNYXRjaGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZGRBY3VtdWxhdG9yICs9IHNwYWNlTWF0Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRleHQgPT09IFwiWWVzRFZhbFwiIHx8IGNvbnRleHQgPT09IDEpXHJcbiAgICAgICAgICAgIGFkZEFjdW11bGF0b3IgPSAxO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQ29udGV4dCB2YWx1ZSBub3Qgc3VpdGFibGVgKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRleHRBZnRlclJlcGV0aXRpb25zID0gdGV4dC5zbGljZSh1cHBlckNhc2VzUmVwZXRpdGlvbnNJbmRleCArIDEgKyBsb3dlcmVkUmVwZXRpdGlvbnMubGVuZ3RoIC0gYWRkQWN1bXVsYXRvciwgdGV4dC5sZW5ndGggKyAxKTtcclxuICAgIGNvbnN0IHRleHRBcnJheSA9IEFycmF5LmZyb20odGV4dCk7XHJcbiAgICB0ZXh0QXJyYXkuc3BsaWNlKHVwcGVyQ2FzZXNSZXBldGl0aW9uc0luZGV4ICsgMSwgbG93ZXJlZFJlcGV0aXRpb25zLmxlbmd0aCwgbG93ZXJlZFJlcGV0aXRpb25zKTtcclxuICAgIGlmIChjb250ZXh0ID09PSBcIk5vRFwiIHx8IGNvbnRleHQgPT0gMCB8fCAhY29udGV4dClcclxuICAgICAgICB0ZXh0ID1cclxuICAgICAgICAgICAgdGV4dEJlZm9yZVJlcGV0aXRpb25zICtcclxuICAgICAgICAgICAgICAgIG1hdGNoLnNsaWNlKDAsIDEpICtcclxuICAgICAgICAgICAgICAgIGxvd2VyZWRSZXBldGl0aW9ucyArXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWZ0ZXJSZXBldGl0aW9ucztcclxuICAgIGVsc2UgaWYgKGNvbnRleHQgPT09IFwiWWVzRFZhbFwiKSB7XHJcbiAgICAgICAgY29uc3QgdXBwZXJsb3dlcmNvbWJEID0gdGV4dC5tYXRjaCgvRFthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bc1NdP1tcXHNdLyk7XHJcbiAgICAgICAgaWYgKHVwcGVybG93ZXJjb21iRD8ubGVuZ3RoID09PSA0KVxyXG4gICAgICAgICAgICBsb3dlcmVkUmVwZXRpdGlvbnMgKz0gdXBwZXJsb3dlcmNvbWJELnRvU3RyaW5nKCkucmVwbGFjZSgvUy8sIFwic1wiKTtcclxuICAgICAgICB0ZXh0ID0gdGV4dEJlZm9yZVJlcGV0aXRpb25zICsgbG93ZXJlZFJlcGV0aXRpb25zICsgdGV4dEFmdGVyUmVwZXRpdGlvbnM7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb250ZXh0ID09PSBcIlllc0RDb250XCIpIHtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5tYXRjaCgvRFthZWlvdcOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtzXVxcc1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF17Myx9LylcclxuICAgICAgICAgICAgPyB0ZXh0QmVmb3JlUmVwZXRpdGlvbnMgKyBsb3dlcmVkUmVwZXRpdGlvbnMgKyBcIlNcIiArIHRleHRBZnRlclJlcGV0aXRpb25zXHJcbiAgICAgICAgICAgIDogdGV4dEJlZm9yZVJlcGV0aXRpb25zICsgbG93ZXJlZFJlcGV0aXRpb25zICsgdGV4dEFmdGVyUmVwZXRpdGlvbnM7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgQ29udGV4dCB2YWx1ZSBub3Qgc3VpdGFibGVgKTtcclxuICAgIHJldHVybiB0ZXh0O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmaXhGb3JjZWRVcHBlckNhc2UodGV4dEVsZW1lbnQsIHdvcmRNYXRjaCA9IFtcIlwiXSwgd01hdGNoSXRlcmF0aW9uID0gXCJcIikge1xyXG4gICAgbGV0IHRleHQgPSB0ZXh0RWxlbWVudC52YWx1ZSB8fCB0ZXh0RWxlbWVudC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgY29uc3Qgc3RyRGxvd2VyY2FzZSA9IHdNYXRjaEl0ZXJhdGlvbi50b1N0cmluZygpO1xyXG4gICAgY29uc3QgRFVwcGVyY2FzZWQgPSBzdHJEbG93ZXJjYXNlLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKERVcHBlcmNhc2VkKSB7XHJcbiAgICAgICAgY29uc3Qgc3RyREFmdGVyTWludXNJbmQgPSAodGV4dD8ubGVuZ3RoID8/IDApIC1cclxuICAgICAgICAgICAgKHN0ckRsb3dlcmNhc2Uuc3Vic3RyaW5nKDAsIDEpICsgRFVwcGVyY2FzZWQgKyBzdHJEbG93ZXJjYXNlLnN1YnN0cmluZygyKSlcclxuICAgICAgICAgICAgICAgIC5sZW5ndGg7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRTbGljZWRDaXRlID0gdGV4dD8uc2xpY2UoMCwgc3RyREFmdGVyTWludXNJbmQpO1xyXG4gICAgICAgIGlmICh3b3JkTWF0Y2gubGVuZ3RoID49IDEgJiYgc3RhcnRTbGljZWRDaXRlKVxyXG4gICAgICAgICAgICB0ZXh0ID0gc3RhcnRTbGljZWRDaXRlICsgdGV4dD8uc2xpY2Uoc3RyREFmdGVyTWludXNJbmQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9DYXBpdGFsaXplSW5wdXRzKHRleHRFbCwgaXNBdXRvY29ycmVjdE9uID0gdHJ1ZSkge1xyXG4gICAgaWYgKCh0ZXh0RWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIHRleHRFbC50eXBlID09PSBcInRleHRcIikgfHxcclxuICAgICAgICB0ZXh0RWwgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSB0ZXh0RWw/LnZhbHVlID8/IG51bGw7XHJcbiAgICAgICAgaWYgKGlzQXV0b2NvcnJlY3RPbiAmJiB0ZXh0KSB7XHJcbiAgICAgICAgICAgIC8vaW5pY2lhbGl6YcOnw6NvIGRlIGV4cHJlc3PDtWVzIHJlZ2V4IGNvbSBzZXVzIG9iamV0b3MgZSBtYXRjaGVzIGFzc29jaWFkb3NcclxuICAgICAgICAgICAgY29uc3QgbmV3V29yZE1hdGNoZXMgPSB0ZXh0Lm1hdGNoKC9cXHNbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdP1thLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStcXHM/W0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXT9bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0qL2cpO1xyXG4gICAgICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzSW5pTm90RCA9IHRleHQubWF0Y2goL1xcc1teZF0vZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNJbmlEID0gdGV4dC5tYXRjaCgvXFxzZC9nKTtcclxuICAgICAgICAgICAgbGV0IGxldHRlck5vdE1hdGNoZXNBZnRlckQgPSB0ZXh0Lm1hdGNoKC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdP1xccy9nKSA/PyBbXTtcclxuICAgICAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSA9IHRleHQubWF0Y2goL1xcc2RbXmFlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNBZnRlckRPcDIgPSB0ZXh0Lm1hdGNoKC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bXnNTXFxzXS9nKTtcclxuICAgICAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyA9IHRleHQubWF0Y2goL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU11bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleE9iaiA9IG5ldyBSZWdFeHAoL1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0vZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVwcGVyY2FzZXNSZWdleE9iaiA9IG5ldyBSZWdFeHAoL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vKTtcclxuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyA9IHRleHQubWF0Y2goL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF17Mix9L2cpO1xyXG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzMiA9IHRleHQubWF0Y2goL0RbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW1NdXFxzL2cpO1xyXG4gICAgICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AxID0gdGV4dC5tYXRjaCgvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVxcYi9nKTtcclxuICAgICAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMiA9IHRleHQubWF0Y2goL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nKTtcclxuICAgICAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyA9IHRleHQubWF0Y2goL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XXsyLDN9XFxiL2cpO1xyXG4gICAgICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A0ID0gdGV4dC5tYXRjaCgvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDUgPSB0ZXh0Lm1hdGNoKC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XXsxLDJ9W0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1xcYi9nKTtcclxuICAgICAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNiA9IHRleHQubWF0Y2goL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDcgPSB0ZXh0Lm1hdGNoKC9EW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU10vZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDggPSB0ZXh0Lm1hdGNoKC9EW0FFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bXnNTXS9nKTtcclxuICAgICAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOSA9IHRleHQubWF0Y2goL0RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU11cXHMvZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyb25nU3RhcnRNYXRjaCA9IHRleHRcclxuICAgICAgICAgICAgICAgIC5tYXRjaCgvXlthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS8pXHJcbiAgICAgICAgICAgICAgICA/LnRvU3RyaW5nKCkgPz8gbnVsbDtcclxuICAgICAgICAgICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AxID0gL1tcXHNdKltcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXStbXFxzXSpbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0qL2c7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AxID0gdGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDEpO1xyXG4gICAgICAgICAgICBjb25zdCB3cm9uZ0NoYXJzUmVnZXhPcDIgPSAvJFtcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXSsvZztcclxuICAgICAgICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDIgPSB0ZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMik7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMyA9IC8oPzw9XFxzZEQpW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xyXG4gICAgICAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlc09wMyA9IHRleHQubWF0Y2god3JvbmdDaGFyc1JlZ2V4T3AzKTtcclxuICAgICAgICAgICAgLy9pbmljaWFsaXphw6fDo28gZGUgb3V0cmFzIHZhcmnDoXZlaXNcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgICAgIGxldCByZW1hZGVUZXh0ID0gdGV4dDtcclxuICAgICAgICAgICAgbGV0IGlzVW5kb1VwcGVyY2FzZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgaXNDdXJzb3JBdXRvTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID09PSAxICYmICFuZXdXb3JkTWF0Y2hlcylcclxuICAgICAgICAgICAgICAgIHRleHRFbC52YWx1ZSA9IGZpeEZpcnN0TGV0dGVyKHRleHRbMF0sIC9cXGJcXHcvLCB0ZXh0RWwsIHJhbmdlLCBzZWxlY3Rpb24sIGZhbHNlKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGV4dC5sZW5ndGggPiAxICYmXHJcbiAgICAgICAgICAgICAgICAhdGV4dEVsLmNsYXNzTGlzdC5jb250YWlucyhcImF1dG9jb3JyZWN0Rmlyc3RcIikpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wQXN0XCIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dEVsLmNsYXNzTGlzdC5jb250YWlucyhcImlucElkZW50aWZcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBlbmNhcHN1bGFyIGNvcnJlw6fDo28gZGUgaW7DrWNpb3MgaW5jb3JyZXRvcyBkZSBlbnRyYWRhXHJcbiAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXNPcDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ0NoYXJzTWF0Y2hlc09wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlXID0gMDsgaVcgPCB3cm9uZ0NoYXJzTWF0Y2hlcy5sZW5ndGg7IGlXKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlcy5mb3JFYWNoKHdyb25nQ2hhck1hdGNoID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsLnZhbHVlID0gZml4V3JvbmdTdGFydHModGV4dCwgd3JvbmdDaGFyTWF0Y2gsIHdyb25nQ2hhcnNNYXRjaGVzW2lXXS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsLnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdyb25nU3RhcnRNYXRjaClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsLnZhbHVlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nU3RhcnRDb3JyZWN0aW9uKHRleHRFbC52YWx1ZSwgd3JvbmdTdGFydE1hdGNoKSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdXb3JkTWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdXb3JkTWF0Y2hlcy5mb3JFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGNhcGl0YWxpemFyIHBhbGF2cmFzIGFww7NzIGEgcHJpbWVpcmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlOb3REICYmICFsZXR0ZXJNYXRjaGVzSW5pRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RC5mb3JFYWNoKGxldHRlck1hdGNoID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVRleHQgPSBmaXhOZXh0V29yZHNJbmlOb3REKHJlbWFkZVRleHQsIGxldHRlck1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbC52YWx1ZSA9IHJlbWFkZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWwudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCB0ZXh0RWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWwudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JvbmdTdGFydENvcnJlY3Rpb24odGV4dEVsLnZhbHVlLCB3cm9uZ1N0YXJ0TWF0Y2gpID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiBsZXR0ZXJNYXRjaGVzSW5pRCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiBsZXR0ZXJNYXRjaGVzSW5pRCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgY29ycmXDp8OjbyBmb2NhZGEgZW0gY29uanVuw6fDo28gY29tIERcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDMpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJiBsZXR0ZXJNYXRjaGVzSW5pTm90RClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFsuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjYXBpdGFsaXphw6fDo28gZm9jYWRhIGVtIGluaWNpYWlzIERcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRD8uZm9yRWFjaChsZXR0ZXJNYXRjaEQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVUZXh0ID0gZml4TmV4dFdvcmRzQWZ0ZXJEKHJlbWFkZVRleHQsIGxldHRlck1hdGNoRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsLnZhbHVlID0gcmVtYWRlVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpRCA9IDA7IGlEIDwgQXJyYXkuZnJvbShsZXR0ZXJNYXRjaGVzQWZ0ZXJEID8/IFtdKS5sZW5ndGg7IGlEKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBcnJheUQgPSBsZXR0ZXJNYXRjaGVzQWZ0ZXJEPy5maWx0ZXIoaUQgPT4gbG93ZXJjYXNlc1JlZ2V4T2JqLnRlc3QoaUQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkQXJyYXlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWRBcnJheUQgPSBmaWx0ZXJlZEFycmF5RC5tYXAoaUQgPT4gaUQudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWRlU3RyaW5nRCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaUQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5zcGxpY2UoaUQsIDEsIG1hcHBlZEFycmF5RFswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWRlU3RyaW5nRCA9IGZpbHRlcmVkQXJyYXlEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsLnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlEID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0QgPSBmaWx0ZXJlZEFycmF5RFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChcIixcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWwudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCB0ZXh0RWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0RWwudmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbC52YWx1ZSA9IHRleHRFbC52YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoZmlsdGVyZWRBcnJheURbaURdLCBcImdcIiksIHJlbWFkZVN0cmluZ0QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaUQgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQucHVzaChtYXBwZWRBcnJheURbaURdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsLnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vc3RhdGVtZW50IHBhcmEgY29ycmXDp8OjbyBkZSBtw7psdGlwbG9zIHVwcGVyIGNhc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMgfHwgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlczIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgZW5jYXBzdWxhciBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVucHJvcGVyVXBwZXJjYXNlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDEgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AyIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDQgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A1IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5wcm9wZXJEVXBwZXJjYXNlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDggfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A5IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnByb3BlclVwcGVyY2FzZXMuZm9yRWFjaChtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQgJiYgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGZpeFVucHJvcGVyVXBwZXJjYXNlcyh0ZXh0LCBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCwgXCJOb0RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29ycmXDp8OjbyBkZSBidWdzIGNvbSBjb21iaW5hw6fDtWVzIHBvc3RlcmlvcmVzIGRlIHVwcGVyL2xvd2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHVwcGVybG93ZXJjb21iID0gdGV4dC5tYXRjaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAvW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB1cHBlcmxvd2VyY29tYkQgPSB0ZXh0Lm1hdGNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC9EW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtcXHNdL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodXBwZXJsb3dlcmNvbWIgfHwgdXBwZXJsb3dlcmNvbWJEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgcmVwZWF0ZWRMZXR0ZXIgPSByZXBlYXRlZExldHRlci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZml4IHBhcmEgZGVsYXkgZW0gcHJvY2Vzc2FtZW50byBkbyBTIGVtIGNvbmp1bsOnw7Vlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cHBlcmxvd2VyY29tYkRTID0gdGV4dC5tYXRjaCgvRFthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bU11bXFxzXS8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBwZXJsb3dlcmNvbWJEUylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVybG93ZXJjb21iRFMuc3BsaWNlKDMsIDEsIFwic1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsLnZhbHVlID0gdGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RleHRFbC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZS5lbmRPZmZzZXQgPj0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeEN1cnNvclBvc2l0aW9uKHRleHRFbCwgcmFuZ2UsIHNlbGVjdGlvbiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnByb3BlckRVcHBlcmNhc2VzLmZvckVhY2gobXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0ICYmIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbC52YWx1ZSA9IGZpeFVucHJvcGVyVXBwZXJjYXNlcyh0ZXh0LCBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCwgXCJZZXNEVmFsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsLnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA+PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4Q3Vyc29yUG9zaXRpb24odGV4dEVsLCByYW5nZSwgc2VsZWN0aW9uLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdGF0ZW1lbnQgcGFyYSBjb250cm9sZSBkZSBjb21iaW5hw6fDo28gYXDDs3MgZW50cmFkYSBjb20gaW5pY2lhbCBEXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIShsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc3RhdGVtZW50IHBhcmEgZmx1eG8gdmFsaWRhbmRvIG1hdGNoIGRlIGluaWNpYWlzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlEIHx8IGxldHRlck1hdGNoZXNJbmlOb3REKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGZvcsOnYXIgdXBwZXIgY2FzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgRE1hdGNoID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRNYXRjaCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4oRE1hdGNoIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlNID0gMDsgaU0gPCB3b3JkTWF0Y2gubGVuZ3RoOyBpTSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwcGVyY2FzZXNSZWdleE9iai50ZXN0KHdvcmRNYXRjaFtpTV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWwudmFsdWUgPSBmaXhGb3JjZWRVcHBlckNhc2UodGV4dEVsLCB3b3JkTWF0Y2gsIHdvcmRNYXRjaFtpTV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChETWF0Y2guZmxhdCgxKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWwudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCB0ZXh0RWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgZmF6ZXIgY29ycmXDp8O1ZXMgYWRpY2lvbmFpcyBubyBmaW5hbCBkYSBlZGnDp8OjbyBhdXRvbcOhdGljYVxyXG4gICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbC52YWx1ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsLnZhbHVlPy5yZXBsYWNlQWxsKHdyb25nQ2hhcnNSZWdleE9wMSwgXCJcIikgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsLnZhbHVlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWwudmFsdWU/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AyLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWwudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbC52YWx1ZT8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDMsIFwiXCIpID8/IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0Lm1hdGNoKC9cXHNbXFxzXSsvZykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWwudmFsdWUgPSB0ZXh0RWwudmFsdWU/LnJlcGxhY2VBbGwoL1xcc1tcXHNdKy9nLCBcIiBcIikgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQubWF0Y2goL15bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdLykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWwudmFsdWUgPSB0ZXh0LnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZCh0ZXh0RWwsIFwiYXJndW1lbnQgZm9yIGF1dG9DYXBpdGFsaXplSW5wdXRzKClcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhdXRvQ2FwaXRhbGl6ZUNpdGUoZWRpdGFibGVDaXRlLCBpc0F1dG9jb3JyZWN0T24gPSB0cnVlKSB7XHJcbiAgICBjb25zdCBjaXRlVGV4dCA9IGVkaXRhYmxlQ2l0ZT8udGV4dENvbnRlbnQgPz8gbnVsbDtcclxuICAgIGlmIChlZGl0YWJsZUNpdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBpc0F1dG9jb3JyZWN0T24gJiYgY2l0ZVRleHQpIHtcclxuICAgICAgICAvL2luaWNpYWxpemHDp8OjbyBkZSBleHByZXNzw7VlcyByZWdleCBjb20gc2V1cyBvYmpldG9zIGUgbWF0Y2hlcyBhc3NvY2lhZG9zXHJcbiAgICAgICAgY29uc3QgbmV3V29yZE1hdGNoZXMgPSBjaXRlVGV4dC5tYXRjaCgvXFxzW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXT9bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rXFxzP1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0/W2EtekEtWsOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8w4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdKi9nKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzSW5pTm90RCA9IGNpdGVUZXh0Lm1hdGNoKC9cXHNbXmRdL2cpO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNJbmlEID0gY2l0ZVRleHQubWF0Y2goL1xcc2QvZyk7XHJcbiAgICAgICAgbGV0IGxldHRlck5vdE1hdGNoZXNBZnRlckQgPSBjaXRlVGV4dC5tYXRjaCgvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXT9cXHMvZykgPz8gW107XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSA9IGNpdGVUZXh0Lm1hdGNoKC9cXHNkW15hZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdL2cpO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNBZnRlckRPcDIgPSBjaXRlVGV4dC5tYXRjaCgvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW15zU1xcc10vZyk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyA9IGNpdGVUZXh0Lm1hdGNoKC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdW2EtekEtWsOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8w4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdL2cpO1xyXG4gICAgICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleE9iaiA9IG5ldyBSZWdFeHAoL1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0vZyk7XHJcbiAgICAgICAgY29uc3QgdXBwZXJjYXNlc1JlZ2V4T2JqID0gbmV3IFJlZ0V4cCgvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS8pO1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMgPSBjaXRlVGV4dC5tYXRjaCgvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXXsyLH0vZyk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMSA9IGNpdGVUZXh0Lm1hdGNoKC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdXFxiL2cpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDIgPSBjaXRlVGV4dC5tYXRjaCgvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2cpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDMgPSBjaXRlVGV4dC5tYXRjaCgvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdezIsM31cXGIvZyk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNCA9IGNpdGVUZXh0Lm1hdGNoKC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nKTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A1ID0gY2l0ZVRleHQubWF0Y2goL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdezEsMn1bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rXFxiL2cpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDYgPSBjaXRlVGV4dC5tYXRjaCgvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nKTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A3ID0gY2l0ZVRleHQubWF0Y2goL0RbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXS9nKTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A4ID0gY2l0ZVRleHQubWF0Y2goL0RbQUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NdL2cpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDkgPSBjaXRlVGV4dC5tYXRjaCgvRFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXVxccy9nKTtcclxuICAgICAgICBjb25zdCB3cm9uZ1N0YXJ0TWF0Y2ggPSBjaXRlVGV4dFxyXG4gICAgICAgICAgICAubWF0Y2goL15bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vKVxyXG4gICAgICAgICAgICA/LnRvU3RyaW5nKCkgPz8gbnVsbDtcclxuICAgICAgICBjb25zdCB3cm9uZ0NoYXJzUmVnZXhPcDEgPSAvW1xcc10qW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dK1tcXHNdKltcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXSovZztcclxuICAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlc09wMSA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AyID0gLyRbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDIgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMyA9IC8oPzw9XFxzZEQpW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AzID0gY2l0ZVRleHQubWF0Y2god3JvbmdDaGFyc1JlZ2V4T3AzKTtcclxuICAgICAgICAvL2luaWNpYWxpemHDp8OjbyBkZSBvdXRyYXMgdmFyacOhdmVpc1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgbGV0IHJlbWFkZUNpdGVUZXh0ID0gY2l0ZVRleHQsIGlzVW5kb1VwcGVyY2FzZSA9IGZhbHNlLCBpc0N1cnNvckF1dG9Nb3ZlZCA9IGZhbHNlLCBpc1NwYW5BY3RpdmUgPSBmYWxzZSwgaXNBbGVydE1hZGUgPSBmYWxzZTtcclxuICAgICAgICAvL3N0YXRlbWVudCBwYXJhIGRpZmVyZW5jaWFyIGluw61jaW8gZG8gcmVzdGFudGUgZG8gaW5wdXRcclxuICAgICAgICBpZiAoY2l0ZVRleHQubGVuZ3RoID09PSAxICYmICFuZXdXb3JkTWF0Y2hlcylcclxuICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4Rmlyc3RMZXR0ZXIoY2l0ZVRleHRbMF0sIC9cXGJcXHcvLCBlZGl0YWJsZUNpdGUsIHJhbmdlLCBzZWxlY3Rpb24sIHRydWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKGNpdGVUZXh0Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgLy9JSUZFIHBhcmEgZW5jYXBzdWxhciBjb3JyZcOnw6NvIGRlIGluw61jaW9zIGluY29ycmV0b3MgZGUgZW50cmFkYVxyXG4gICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXNPcDIgfHxcclxuICAgICAgICAgICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDEgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaVcgPSAwOyBpVyA8IHdyb25nQ2hhcnNNYXRjaGVzLmxlbmd0aDsgaVcrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlcy5mb3JFYWNoKHdyb25nQ2hhck1hdGNoID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeFdyb25nU3RhcnRzKGNpdGVUZXh0LCB3cm9uZ0NoYXJNYXRjaCwgd3JvbmdDaGFyc01hdGNoZXNbaVddLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV0gPSBjcmVhdGVTcGFuQWxlcnQoaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgaWYgKHdyb25nU3RhcnRNYXRjaClcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IHdyb25nU3RhcnRDb3JyZWN0aW9uKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgd3JvbmdTdGFydE1hdGNoKTtcclxuICAgICAgICAgICAgaWYgKG5ld1dvcmRNYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdXb3JkTWF0Y2hlcy5mb3JFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjYXBpdGFsaXphciBwYWxhdnJhcyBhcMOzcyBhIHByaW1laXJhXHJcbiAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlOb3REICYmICFsZXR0ZXJNYXRjaGVzSW5pRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0luaU5vdEQuZm9yRWFjaChsZXR0ZXJNYXRjaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWRlQ2l0ZVRleHQgPSBmaXhOZXh0V29yZHNJbmlOb3REKHJlbWFkZUNpdGVUZXh0LCBsZXR0ZXJNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IHJlbWFkZUNpdGVUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gd3JvbmdTdGFydENvcnJlY3Rpb24oZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCB3cm9uZ1N0YXJ0TWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiBsZXR0ZXJNYXRjaGVzSW5pRCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICghbGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgbGV0dGVyTWF0Y2hlc0luaUQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjb3JyZcOnw6NvIGZvY2FkYSBlbSBjb25qdW7Dp8OjbyBjb20gRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDMpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJiBsZXR0ZXJNYXRjaGVzSW5pTm90RClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbLi4uKGxldHRlck1hdGNoZXNJbmlOb3REIHx8IFtdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjYXBpdGFsaXphw6fDo28gZm9jYWRhIGVtIGluaWNpYWlzIERcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJELmZvckVhY2gobGV0dGVyTWF0Y2hEID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZUNpdGVUZXh0ID0gZml4TmV4dFdvcmRzQWZ0ZXJEKHJlbWFkZUNpdGVUZXh0LCBsZXR0ZXJNYXRjaEQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gcmVtYWRlQ2l0ZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlEID0gMDsgaUQgPCBBcnJheS5mcm9tKGxldHRlck1hdGNoZXNBZnRlckQgPz8gW10pLmxlbmd0aDsgaUQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBcnJheUQgPSBsZXR0ZXJNYXRjaGVzQWZ0ZXJEPy5maWx0ZXIoaUQgPT4gbG93ZXJjYXNlc1JlZ2V4T2JqLnRlc3QoaUQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZEFycmF5RCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZEFycmF5RCA9IGZpbHRlcmVkQXJyYXlELm1hcChpRCA9PiBpRC50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWRlU3RyaW5nRCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlEID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVTdHJpbmdEID0gZmlsdGVyZWRBcnJheURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChcIixcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaUQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KGlzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5zcGxpY2UoaUQsIDEsIG1hcHBlZEFycmF5RFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0QgPSBmaWx0ZXJlZEFycmF5RFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudC5yZXBsYWNlKG5ldyBSZWdFeHAoZmlsdGVyZWRBcnJheURbaURdLCBcImdcIiksIHJlbWFkZVN0cmluZ0QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpRCA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnB1c2gobWFwcGVkQXJyYXlEW2lEXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgZW5jYXBzdWxhciBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcclxuICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5wcm9wZXJVcHBlcmNhc2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A0IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDUgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bnByb3BlckRVcHBlcmNhc2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A4IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDkgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgdW5wcm9wZXJVcHBlcmNhc2VzLmZvckVhY2gobXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2ggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2l0ZVRleHQgJiYgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeFVucHJvcGVyVXBwZXJjYXNlcyhjaXRlVGV4dCwgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gsIFwiTm9EXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHVucHJvcGVyRFVwcGVyY2FzZXMuZm9yRWFjaChtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaXRlVGV4dCAmJiBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4VW5wcm9wZXJVcHBlcmNhc2VzKGNpdGVUZXh0LCBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCwgXCJZZXNEQ29udFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV0gPSBjcmVhdGVTcGFuQWxlcnQoaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9zdGF0ZW1lbnQgcGFyYSBjb3JyZcOnw6NvIGRlIGJsb2NvcyBhcMOzcyBpbmljaWFsIGNvbSBEXHJcbiAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlEICYmXHJcbiAgICAgICAgICAgIGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgIShsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKSlcclxuICAgICAgICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCA9IFtdO1xyXG4gICAgICAgIC8vc3RhdGVtZW50IHBhcmEgY29ycmXDp8OjbyBkZSBtw7psdGlwbG9zIHVwcGVyIGNhc2VzIGZvcsOnYWRvcyBpbmRldmlkYW1lbnRlXHJcbiAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlEIHx8IGxldHRlck1hdGNoZXNJbmlOb3REKSB7XHJcbiAgICAgICAgICAgIC8vSUlGRSBwYXJhIGZvcsOnYXIgdXBwZXIgY2FzZVxyXG4gICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgRE1hdGNoID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRNYXRjaCA9IFsuLi4oRE1hdGNoIHx8IFtdKSwgLi4uKGxldHRlck1hdGNoZXNJbmlOb3REIHx8IFtdKV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpTSA9IDA7IGlNIDwgd29yZE1hdGNoLmxlbmd0aDsgaU0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cHBlcmNhc2VzUmVnZXhPYmoudGVzdCh3b3JkTWF0Y2hbaU1dKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4Rm9yY2VkVXBwZXJDYXNlKGVkaXRhYmxlQ2l0ZSwgd29yZE1hdGNoLCB3b3JkTWF0Y2hbaU1dKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoRE1hdGNoLmZsYXQoMSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vSUlGRSBwYXJhIGZhemVyIGNvcnJlw6fDtWVzIG5vIGZpbmFsIGRhIGVkacOnw6NvIGF1dG9tw6F0aWNhXHJcbiAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AxKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDEsIFwiXCIpID8/IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDIpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50Py5yZXBsYWNlQWxsKHdyb25nQ2hhcnNSZWdleE9wMiwgXCJcIikgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AzLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudD8ubWF0Y2goL1xcc1tcXHNdKy9nKSkge1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwoL1xcc1tcXHNdKy9nLCBcIiBcIikgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuICAgIC8vZGVjbGFyYcOnw7VlcyBkZSBmdW7Dp8O1ZXMgbG9jYWlzXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTcGFuQWxlcnQoaXNTcGFuQWN0aXZlID0gZmFsc2UsIGlzQWxlcnRNYWRlID0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCByZ2JhUmVnZXggPSAvcmdiYVxcKChcXGQrKSwgKFxcZCspLCAoXFxkKyksIChbXFxkLl0rKVxcKS87XHJcbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZVJlZ2V4ID0gLyxcXGQrLj9cXGQqLj9cXGQqL2c7XHJcbiAgICAgICAgaWYgKGVkaXRhYmxlQ2l0ZT8ubmV4dEVsZW1lbnRTaWJsaW5nICYmXHJcbiAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRDaXRlRWxlbWVudFNpYmxpbmcgPSBlZGl0YWJsZUNpdGUubmV4dEVsZW1lbnRTaWJsaW5nLmlkO1xyXG4gICAgICAgICAgICBpZiAobmV4dENpdGVFbGVtZW50U2libGluZyA9PT0gXCJkZWFjdEF1dG9jb3JyZWN0QnRuXCIgJiYgIWlzU3BhbkFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3Vyc29yUmVzZXRBbGVydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0FsZXJ0TWFkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQudGV4dENvbnRlbnQgPSBcIkN1cnNvciByZXNldGFkbyEgQXBlcnRlIGFsZ3VtYSB0ZWNsYVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQWxlcnRNYWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS5wYXJlbnROb2RlPy5pbnNlcnRCZWZvcmUoY3Vyc29yUmVzZXRBbGVydCwgZWRpdGFibGVDaXRlLm5leHRTaWJsaW5nKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJicmllZkFsZXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImJyaWVmQWxlcnRDaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5zdHlsZS5zZXRQcm9wZXJ0eShcImJvcmRlci1jb2xvclwiLCBcIndoaXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5zdHlsZS5zZXRQcm9wZXJ0eShcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5zdHlsZS5zZXRQcm9wZXJ0eShcImZvbnQtc2l6ZVwiLCBcIjhweFwiKTtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS5zdHlsZS5zZXRQcm9wZXJ0eShcImJvcmRlci1jb2xvclwiLCBcInJnYmEoMjU1LCAxNjUsIDAsIDAuOSlcIik7IC8vYWxlcnRhciB1c3XDoXJpbyBkYSBtdWRhbsOnYSBkZSBjdXJzb3IgZGV2aWRvIMOgIHJlY29uc3RydcOnw6NvIGRvIHRleHRDb250ZW50IGVkaXTDoXZlbFxyXG4gICAgICAgICAgICAgICAgaXNTcGFuQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGVDaXRlID0gd2luZG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKGVkaXRhYmxlQ2l0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoXCJib3JkZXItY29sb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmdiYU1hdGNoID0gY29tcHV0ZWRTdHlsZUNpdGUubWF0Y2gocmdiYVJlZ2V4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmdiYU1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZHVjZU9wYWNpdHkgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3BwZWRBcnJheSA9IHJnYmFNYXRjaC5wb3AoKTsgLy9mYXogYSByZXRpcmFkYSBpbmljaWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyVXBkYXRlZEFscGhhID0gcG9wcGVkQXJyYXk/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJSZ2JhID0gcmdiYU1hdGNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChjb21wdXRlZFN0eWxlUmVnZXgsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RTbGljZVN0clJnYmEgPSBzdHJSZ2JhLnNsaWNlKDAsIDE4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHJOZXdPcGFjaXR5VmFsdWUgPSBmaXJzdFNsaWNlU3RyUmdiYSArIFwiIFwiICsgc3RyVXBkYXRlZEFscGhhICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyVXBkYXRlZEFscGhhICYmIHN0clVwZGF0ZWRBbHBoYSA8PSBcIjAuMDVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0clVwZGF0ZWRBbHBoYSA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ck5ld09wYWNpdHlWYWx1ZSA9IGZpcnN0U2xpY2VTdHJSZ2JhICsgXCIwKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChyZWR1Y2VPcGFjaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS5zdHlsZS5zZXRQcm9wZXJ0eShcImJvcmRlci1jb2xvclwiLCBzdHJOZXdPcGFjaXR5VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobmV4dENpdGVFbGVtZW50U2libGluZyA9PT0gXCJicmllZkFsZXJ0Q2l0ZVwiIHx8IGlzU3BhbkFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRmlyc3RDbGljayhlbCkge1xyXG4gICAgbGV0IGN1cnNvclBvc2l0aW9uID0gMDtcclxuICAgIGlmIChlbCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoZWwudGV4dENvbnRlbnQgPT09IFwiSW5zaXJhIFNldSBOb21lIEFxdWlcIilcclxuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgY3Vyc29yUG9zaXRpb24gPSBHbG9iYWxIYW5kbGVyLmN1cnNvckNoZWNrVGltZXIoKSA/PyAwO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoZWwsIFwiYXJndW1lbnQgZm9yIHJlbW92ZUZpcnN0Q2xpY2soKVwiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICByZXR1cm4gY3Vyc29yUG9zaXRpb24gPz8gMDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tBdXRvQ29ycmVjdChkZWFjdEF1dG9jb3JyZWN0QnRuKSB7XHJcbiAgICBsZXQgaXNBdXRvY29ycmVjdE9uID0gdHJ1ZTtcclxuICAgIGlmIChkZWFjdEF1dG9jb3JyZWN0QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICBkZWFjdEF1dG9jb3JyZWN0QnRuLnRleHRDb250ZW50Py5tYXRjaCgvQXRpdmFyLylcclxuICAgICAgICAgICAgPyAoaXNBdXRvY29ycmVjdE9uID0gZmFsc2UpXHJcbiAgICAgICAgICAgIDogKGlzQXV0b2NvcnJlY3RPbiA9IHRydWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZGVhY3RBdXRvY29ycmVjdEJ0biBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAoZGVhY3RBdXRvY29ycmVjdEJ0bi50eXBlID09PSBcImNoZWNrYm94XCIgfHxcclxuICAgICAgICAgICAgZGVhY3RBdXRvY29ycmVjdEJ0bi50eXBlID09PSBcInJhZGlvXCIpKSB7XHJcbiAgICAgICAgZGVhY3RBdXRvY29ycmVjdEJ0bi5jaGVja2VkXHJcbiAgICAgICAgICAgID8gKGlzQXV0b2NvcnJlY3RPbiA9IHRydWUpXHJcbiAgICAgICAgICAgIDogKGlzQXV0b2NvcnJlY3RPbiA9IGZhbHNlKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGlzQXV0b2NvcnJlY3RPbik7XHJcbiAgICByZXR1cm4gaXNBdXRvY29ycmVjdE9uO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hBdXRvY29ycmVjdChjbGljaywgZGVhY3RBdXRvY29ycmVjdEJ0biwgaXNBdXRvY29ycmVjdE9uID0gdHJ1ZSkge1xyXG4gICAgaWYgKGNsaWNrPy50YXJnZXQgPT09IGRlYWN0QXV0b2NvcnJlY3RCdG4pXHJcbiAgICAgICAgaWYgKGRlYWN0QXV0b2NvcnJlY3RCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpc0F1dG9jb3JyZWN0T24gPSAhaXNBdXRvY29ycmVjdE9uOyAvL2lmLWlmIG7Do28gZnVuY2lvbmEgYXF1aVxyXG4gICAgICAgICAgICBpc0F1dG9jb3JyZWN0T25cclxuICAgICAgICAgICAgICAgID8gKGRlYWN0QXV0b2NvcnJlY3RCdG4udGV4dENvbnRlbnQgPSBcIkRlc2F0aXZhciBBdXRvY29ycmXDp8Ojb1wiKVxyXG4gICAgICAgICAgICAgICAgOiAoZGVhY3RBdXRvY29ycmVjdEJ0bi50ZXh0Q29udGVudCA9IFwiQXRpdmFyIEF1dG9jb3JyZcOnw6NvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkZWFjdEF1dG9jb3JyZWN0QnRuIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAoZGVhY3RBdXRvY29ycmVjdEJ0bi50eXBlID09PSBcImNoZWNrYm94XCIgfHxcclxuICAgICAgICAgICAgICAgIGRlYWN0QXV0b2NvcnJlY3RCdG4udHlwZSA9PT0gXCJyYWRpb1wiKSlcclxuICAgICAgICAgICAgaXNBdXRvY29ycmVjdE9uID0gIWlzQXV0b2NvcnJlY3RPbjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoZGVhY3RBdXRvY29ycmVjdEJ0biwgXCJhcmd1bWVudHMgZm9yIHN3aXRjaEF1dG9jb3JyZWN0KClcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgcmV0dXJuIGlzQXV0b2NvcnJlY3RPbjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tBbGxHZW5Db250cyguLi5lbHMpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGVscykgJiZcclxuICAgICAgICBlbHM/LmV2ZXJ5KGVsID0+IGVsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGVsIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkpXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChleHRMaW5lKG5ldyBFcnJvcigpKSwgXCJhcmd1bWVudHMgZm9yIGNoZWNrQWxsR2VuQ29udHMoKVwiLCBgJHtKU09OLnN0cmluZ2lmeShlbHMpfWApO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmbHV4R2VuKGFyckdlbkNvbnRzLCBnZW5JbmlWYWx1ZSA9IFwibWFzY3VsaW5vXCIpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGFyckdlbkNvbnRzKSAmJlxyXG4gICAgICAgIGFyckdlbkNvbnRzPy5ldmVyeShnZW5Db250ID0+IGdlbkNvbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICBnZW5Db250IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICBnZW5Db250IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkgJiZcclxuICAgICAgICB0eXBlb2YgZ2VuSW5pVmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBjb25zdCBbZ2VuLCBnZW5CaXJ0aFJlbCwgZ2VuVHJhbnMsIGdlbkZpc0FsaW5dID0gYXJyR2VuQ29udHM7XHJcbiAgICAgICAgY29uc29sZS5sb2coZ2VuLnZhbHVlKTtcclxuICAgICAgICBpZiAoZ2VuLnZhbHVlID09PSBcIm1hc2N1bGlub1wiIHx8IGdlbi52YWx1ZSA9PT0gXCJmZW1pbmlub1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJjaXNcIikge1xyXG4gICAgICAgICAgICAgICAgaGlkZUdlbkZpc0FsaW4oZ2VuRmlzQWxpbik7XHJcbiAgICAgICAgICAgICAgICBoaWRlU3RnVHJhbnNIb3JtKGdlblRyYW5zKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZW5JbmlWYWx1ZSB8fCBnZW4udmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZ2VuQmlydGhSZWwudmFsdWUgPT09IFwidHJhbnNcIikge1xyXG4gICAgICAgICAgICAgICAgc2hvd1N0Z1RyYW5zSG9ybShnZW5UcmFucyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2VuVHJhbnMudmFsdWUgPT09IFwiYXZhbmNhZG9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZGVHZW5GaXNBbGluKGdlbkZpc0FsaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5JbmlWYWx1ZSB8fCBnZW4udmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChnZW5UcmFucy52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGdlblRyYW5zLnZhbHVlID09PSBcIm5vXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICBnZW5UcmFucy52YWx1ZSA9PT0gXCJpbmljaWFsXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICBnZW5UcmFucy52YWx1ZSA9PT0gXCJpbnRlcm1lZGlhcmlvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93R2VuRmlzQWxpbihnZW5GaXNBbGluKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250RmVtaW5pbGl6YWRvID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignb3B0aW9uW3ZhbHVlPVwiZmVtaW5pbGl6YWRvXCJdJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udE1hc2N1bGluaXphZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdvcHRpb25bdmFsdWU9XCJtYXNjdWxpbml6YWRvXCJdJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRGZW1pbmlsaXphZG8gaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250TWFzY3VsaW5pemFkbyBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZW5UcmFucy52YWx1ZSA9PT0gXCJpbnRlcm1lZGlhcmlvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZW4udmFsdWUgPT09IFwibWFzY3VsaW5vXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250TWFzY3VsaW5pemFkby5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udEZlbWluaWxpemFkbz8uc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRGZW1pbmlsaXphZG8ucmVtb3ZlQXR0cmlidXRlKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuLnZhbHVlID09PSBcImZlbWluaW5vXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250RmVtaW5pbGl6YWRvLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250TWFzY3VsaW5pemFkbz8uc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRNYXNjdWxpbml6YWRvLnJlbW92ZUF0dHJpYnV0ZShcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRNYXNjdWxpbml6YWRvPy5zZWxlY3RlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250TWFzY3VsaW5pemFkby5yZW1vdmVBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250RmVtaW5pbGl6YWRvPy5zZWxlY3RlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250RmVtaW5pbGl6YWRvLnJlbW92ZUF0dHJpYnV0ZShcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm1hc2N1bGluaXphZG9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibWFzY3VsaW5vXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJmZW1pbmlsaXphZG9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZmVtaW5pbm9cIjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm5ldXRyb1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJuZXV0cm9cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJvdXRyb3NcIiB8fFxyXG4gICAgICAgICAgICAgICAgZ2VuQmlydGhSZWwudmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHNob3dHZW5GaXNBbGluKGdlbkZpc0FsaW4pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibWFzY3VsaW5pemFkb1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm1hc2N1bGlub1wiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJmZW1pbmlsaXphZG9cIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJmZW1pbmlub1wiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJuZXV0cm9cIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJuZXV0cm9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChnZW4udmFsdWUgPT09IFwibmFvQmluYXJpb1wiIHx8XHJcbiAgICAgICAgICAgIGdlbi52YWx1ZSA9PT0gXCJvdXRyb3NcIiB8fFxyXG4gICAgICAgICAgICBnZW4udmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgZ2VuQmlydGhSZWwudmFsdWUgPT09IFwidHJhbnNcIlxyXG4gICAgICAgICAgICAgICAgPyBzaG93U3RnVHJhbnNIb3JtKGdlblRyYW5zKVxyXG4gICAgICAgICAgICAgICAgOiBoaWRlU3RnVHJhbnNIb3JtKGdlblRyYW5zKTtcclxuICAgICAgICAgICAgc2hvd0dlbkZpc0FsaW4oZ2VuRmlzQWxpbik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FzZSBuYlwiKTtcclxuICAgICAgICAgICAgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibWFzY3VsaW5pemFkb1wiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibWFzY3VsaW5vXCI7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwiZmVtaW5pbGl6YWRvXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJmZW1pbmlub1wiO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm5ldXRyb1wiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibmV1dHJvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnN0cmluZ0Vycm9yKFwib2J0ZW5kbyBnZW4udmFsdWVcIiwgZ2VuPy52YWx1ZSA/PyBcIlVOREVGSU5FRCBWQUxVRVwiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChleHRMaW5lKG5ldyBFcnJvcigpKSwgXCJhcmd1bWVudHMgZm9yIGZsdXhHZW5cIiwgYCR7SlNPTi5zdHJpbmdpZnkoYXJyR2VuQ29udHMpfWAgfHwgbnVsbCk7XHJcbiAgICByZXR1cm4gXCJtYXNjdWxpbm9cIjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0dlbkZpc0FsaW4oZ2VuRmlzQWxpbikge1xyXG4gICAgaWYgKGdlbkZpc0FsaW4gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxyXG4gICAgICAgIGdlbkZpc0FsaW4gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgZ2VuRmlzQWxpbiBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcclxuICAgICAgICBnZW5GaXNBbGluLmNsb3Nlc3QoXCIuc3BhbkZzQW5hbUdcIik/LnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKGdlbkZpc0FsaW4sIFwiYXJndW1lbnQgZm9yIHNob3dHZW5GaXNBbGluKClcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlR2VuRmlzQWxpbihnZW5GaXNBbGluKSB7XHJcbiAgICBpZiAoZ2VuRmlzQWxpbiBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgZ2VuRmlzQWxpbiBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcclxuICAgICAgICBnZW5GaXNBbGluIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xyXG4gICAgICAgIGdlbkZpc0FsaW4uY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8uc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwiXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKGdlbkZpc0FsaW4sIFwiYXJndW1lbnQgZm9yIGhpZGVHZW5GaXNBbGluKClcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dTdGdUcmFuc0hvcm0oZ2VuVHJhbnMpIHtcclxuICAgIGlmIChnZW5UcmFucyBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgZ2VuVHJhbnMgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgZ2VuVHJhbnMgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcbiAgICAgICAgZ2VuVHJhbnMuY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8ucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoZ2VuVHJhbnMsIFwiYXJndW1lbnQgZm9yIHNob3dTdGdUcmFuc0hvcm0oKVwiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVTdGdUcmFuc0hvcm0oZ2VuVHJhbnMpIHtcclxuICAgIGlmIChnZW5UcmFucyBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgZ2VuVHJhbnMgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgZ2VuVHJhbnMgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcbiAgICAgICAgZ2VuVHJhbnMuY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8uc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwiXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKGdlblRyYW5zLCBcImFyZ3VtZW50IGZvciBoaWRlU3RnVHJhbnNIb3JtKClcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcklkc0J5R2VuZGVyKGFycmF5SWRzID0gW1wicGVpdFwiLCBcImFiZFwiLCBcImNveGFcIl0sIGJvZHlUeXBlID0gXCJtYXNjdWxpbm9cIikge1xyXG4gICAgbGV0IGdlbmRlcmVkSWRzID0gW107XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnJheUlkcykgJiZcclxuICAgICAgICBhcnJheUlkcz8uZXZlcnkocHJvcCA9PiB0eXBlb2YgcHJvcCA9PT0gXCJzdHJpbmdcIikgJiZcclxuICAgICAgICB0eXBlb2YgYm9keVR5cGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBzd2l0Y2ggKGJvZHlUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYXNjdWxpbm9cIjpcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGlNID0gMDsgaU0gPCBhcnJheUlkcy5sZW5ndGg7IGlNKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlJZHNbaU1dID09PSBcInBlaXRcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJheUlkc1tpTV0gPT09IFwiYWJkXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJZHNbaU1dID09PSBcImNveGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZGVyZWRJZHMucHVzaChhcnJheUlkc1tpTV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmZW1pbmlub1wiOlxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaUYgPSAwOyBpRiA8IGFycmF5SWRzLmxlbmd0aDsgaUYrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJheUlkc1tpRl0gPT09IFwidHJpY3BcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJheUlkc1tpRl0gPT09IFwic3VwcmFpbFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lGXSA9PT0gXCJjb3hhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmRlcmVkSWRzLnB1c2goYXJyYXlJZHNbaUZdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibmV1dHJvXCI6XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpTiA9IDA7IGlOIDwgYXJyYXlJZHMubGVuZ3RoOyBpTisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5SWRzW2lOXSA9PT0gXCJwZWl0XCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJZHNbaU5dID09PSBcImFiZFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lOXSA9PT0gXCJ0cmljcFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lOXSA9PT0gXCJzdXByYWlsXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJZHNbaU5dID09PSBcImNveGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZGVyZWRJZHMucHVzaChhcnJheUlkc1tpTl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoYG9idGVuZG8gYm9keVR5cGUgdsOhbGlkb2AsIGJvZHlUeXBlLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihgRXJybyB2YWxpZGFuZG8gYXJyYXkgZW0gZmlsdGVySWRzQnlHZW5kZXIoKS5cbiAgICAgIFZhbGlkYW5kbyBlbGVtZW50b3MgcGFyYSBkZWZpbmnDp8OjbyBkZSBnw6puZXJvIGNvbW8gc3RyaW5nc2AsIGJvZHlUeXBlLCBcInN0cmluZ1wiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZ2VuZGVyZWRJZHM/Lmxlbmd0aCA9PT0gMClcclxuICAgICAgICBnZW5kZXJlZElkcyA9IFtcInBlaXRcIiwgXCJhYmRcIiwgXCJjb3hhXCJdO1xyXG4gICAgcmV0dXJuIGdlbmRlcmVkSWRzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBlcnNvbkluc3RhbmNlKHBlcnNvbikge1xyXG4gICAgaWYgKHBlcnNvbiAmJlxyXG4gICAgICAgIFwiZ2VuXCIgaW4gcGVyc29uICYmXHJcbiAgICAgICAgdHlwZW9mIHBlcnNvbi5nZW4gPT09IFwic3RyaW5nXCIgJiZcclxuICAgICAgICBwZXJzb24uZ2VuICE9PSBcIlwiKSB7XHJcbiAgICAgICAgaWYgKHBlcnNvbi5nZW4gPT09IFwibWFzY3VsaW5vXCIpXHJcbiAgICAgICAgICAgIHBlcnNvbiA9IG5ldyBNYW4ocGVyc29uLmdlbiwgcGVyc29uLmFnZSB8fCAwLCBwZXJzb24ud2VpZ2h0IHx8IDAsIHBlcnNvbi5oZWlnaHQgfHwgMCwgcGVyc29uLnN1bURDdXQgfHwgMCwgcGVyc29uLmF0dkx2bCB8fCBcImxldmVcIik7XHJcbiAgICAgICAgZWxzZSBpZiAocGVyc29uLmdlbiA9PT0gXCJmZW1pbmlub1wiKVxyXG4gICAgICAgICAgICBwZXJzb24gPSBuZXcgV29tYW4ocGVyc29uLmdlbiwgcGVyc29uLmFnZSB8fCAwLCBwZXJzb24ud2VpZ2h0IHx8IDAsIHBlcnNvbi5oZWlnaHQgfHwgMCwgcGVyc29uLnN1bURDdXQgfHwgMCwgcGVyc29uLmF0dkx2bCB8fCBcImxldmVcIik7XHJcbiAgICAgICAgZWxzZSBpZiAocGVyc29uLmdlbiA9PT0gXCJuZXV0cm9cIilcclxuICAgICAgICAgICAgcGVyc29uID0gbmV3IE5ldXRybyhwZXJzb24uZ2VuLCBwZXJzb24uYWdlIHx8IDAsIHBlcnNvbi53ZWlnaHQgfHwgMCwgcGVyc29uLmhlaWdodCB8fCAwLCBwZXJzb24uc3VtREN1dCB8fCAwLCBwZXJzb24uYXR2THZsIHx8IFwibGV2ZVwiKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5zdHJpbmdFcnJvcihcInBlcnNvbi5nZW5cIiwgcGVyc29uPy5nZW4sIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwicGVyc29uLmdlblwiLCBwZXJzb24/LmdlbiwgXCJzdHJpbmdcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgcmV0dXJuIHBlcnNvbjtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vbmVzc2UgZmlsZSBvY29ycmVtIHByaW5jaXBhbG1lbnRlIGFzIGFkacOnw7VlcyBkZSBsaXN0ZW5lcnMsIHNpbmNyb25pemHDp8OjbyBkYXMgY2hhbWFkYXMgZGUgZnVuw6fDtWVzIHBhcmEgbWFuaXB1bGHDp8OjbyBkZSBpbmZvcm1hw6fDo28vbGF5b3V0IGUgdmFsaWRhw6fDo28gZG9zIGVsZW1lbnRvcyBubyBET01cclxuaW1wb3J0ICogYXMgQUdIYW5kbGVycyBmcm9tIFwiLi9hR0hhbmRsZXJzXCI7XHJcbmltcG9ydCAqIGFzIEFHTW9kZWwgZnJvbSBcIi4vYUdNb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBHbG9iYWxNb2RlbCBmcm9tIFwiLi4vLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2dNb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBHbG9iYWxIYW5kbGVyIGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ0hhbmRsZXJzXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbENvbnRyb2wgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9nQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgKiBhcyBFcnJvckhhbmRsZXIgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9lcnJvckhhbmRsZXJcIjtcclxuaW1wb3J0IHsgZXh0TGluZSB9IGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZXJyb3JIYW5kbGVyXCI7XHJcbi8vaW5pY2lhbGl6YcOnw6NvIGRlIGNvbnN0YW50ZXMgcGVyY29ycmVuZG8gbyBET01cclxuY29uc3QgZ2VuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VuSWRcIik7XHJcbmNvbnN0IGFsbElucHV0cyA9IEFycmF5LmZyb20oW1xyXG4gICAgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpLFxyXG4gICAgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRleHRhcmVhXCIpLFxyXG4gICAgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFwiKSxcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NpdGVbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXScpLFxyXG5dKS5mbGF0KDEpO1xyXG5jb25zdCBKU09OQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5KU09OXCIpO1xyXG5sZXQgZ2VuVmFsdWUgPSBnZW5FbGVtZW50Py52YWx1ZSB8fCBcIm1hc2N1bGlub1wiLCBKU09OTGluaywgaXNBdXRvY29ycmVjdE9uID0gdHJ1ZSwgZmlyc3RDbGljayA9IHRydWUsIGJsb2NrQ291bnQgPSAxO1xyXG4vL3ZhbGlkYcOnw6NvIGRlIGNvbnN0YW50ZXMgb2J0aWRhcyBlIGFwbGljYcOnw6NvIGRlIGxpc3RlbmVycy9jYWxsYmFja3NcclxuW2lzQXV0b2NvcnJlY3RPbiwgZmlyc3RDbGlja10gPSBHbG9iYWxDb250cm9sLmdldEdsb2JhbEVscyhpc0F1dG9jb3JyZWN0T24sIGZpcnN0Q2xpY2ssIFwibnVtXCIpO1xyXG4vL2V4cG9ydGHDp8O1ZXMgcGFyYSBvIGplc3RcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyc0dlbkNvbnRzKGdlbkVsZW1lbnQsIGdlblZhbHVlID0gXCJtYXNjdWxpbm9cIikge1xyXG4gICAgY29uc3QgZ2VuQmlydGhSZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdlbkJpcnRoUmVsSWRcIik7XHJcbiAgICBjb25zdCBnZW5UcmFucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VuVHJhbnNJZFwiKTtcclxuICAgIGNvbnN0IGdlbkZpc0FsaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdlbkZpc0FsaW5JZFwiKTtcclxuICAgIGlmIChHbG9iYWxNb2RlbC5jaGVja0FsbEdlbkNvbnRzKGdlbkVsZW1lbnQsIGdlbkJpcnRoUmVsLCBnZW5UcmFucywgZ2VuRmlzQWxpbikgJiZcclxuICAgICAgICB0eXBlb2YgZ2VuVmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBjb25zdCBhcnJHZW5Db250cyA9IFtcclxuICAgICAgICAgICAgZ2VuRWxlbWVudCxcclxuICAgICAgICAgICAgZ2VuQmlydGhSZWwsXHJcbiAgICAgICAgICAgIGdlblRyYW5zLFxyXG4gICAgICAgICAgICBnZW5GaXNBbGluLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgYXJyR2VuQ29udHMuZm9yRWFjaChnZW5Db250ID0+IHtcclxuICAgICAgICAgICAgZ2VuQ29udC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdlblZhbHVlID1cclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWxNb2RlbC5mbHV4R2VuKGFyckdlbkNvbnRzLCBnZW5FbGVtZW50Py52YWx1ZSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXNjdWxpbm9cIjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdlblZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZSB8fCBcIm1hc2N1bGlub1wiO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKGV4dExpbmUobmV3IEVycm9yKCkpLCBcImdlbiBFbGVtZW50c1wiLCBnZW5FbGVtZW50LCBnZW5CaXJ0aFJlbCwgZ2VuVHJhbnMsIGdlbkZpc0FsaW4pO1xyXG4gICAgcmV0dXJuIGdlblZhbHVlIHx8IFwibWFzY3VsaW5vXCI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyVGVsSW5wdXRzKCkge1xyXG4gICAgY29uc3QgdGVsSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInRleHRcIl1baWRePVwidGVsXCJdJyk7XHJcbiAgICBpZiAodGVsSW5wdXRzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGVsSW5wdXRzLmZvckVhY2godGVsSW5wdXQgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGVsSW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgICAgICAgICB0ZWxJbnB1dCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICB0ZWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgaW5wdXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFHTW9kZWwuZm9ybWF0VGVsKGlucHV0LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChpbnB1dD8udGFyZ2V0LCBgdGFyZ2V0IHRlbElucHV0IGlkICR7SlNPTi5zdHJpbmdpZnkodGVsSW5wdXQ/LmlkIHx8IFwiVU5JREVOVElGSUVEIFRFTElOUFVUXCIpfWAsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0ZWxJbnB1dCwgYHRhcmdldCB0ZWxJbnB1dCBpZCAke0pTT04uc3RyaW5naWZ5KHRlbElucHV0Py5pZCB8fCBcIlVOSURFTlRJRklFRCBURUxJTlBVVFwiKX1gLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQodGVsSW5wdXRzLCBcInRlbElucHV0c1wiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVyc0VtYWlsSW5wdXRzKCkge1xyXG4gICAgY29uc3QgZW1haWxJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtpZF49XCJlbWFpbFwiXScpO1xyXG4gICAgaWYgKGVtYWlsSW5wdXRzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZW1haWxJbnB1dHMuZm9yRWFjaChlbWFpbElucHV0ID0+IHtcclxuICAgICAgICAgICAgaWYgKGVtYWlsSW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBBR01vZGVsLmFkZEVtYWlsRXh0ZW5zaW9uKGVtYWlsSW5wdXQpKTtcclxuICAgICAgICAgICAgICAgIGVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEFHTW9kZWwuYWRkRW1haWxFeHRlbnNpb24oZW1haWxJbnB1dCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKGVtYWlsSW5wdXQsIGB0YXJnZXQgZW1haWxJbnB1dCBpZCAke2VtYWlsSW5wdXQ/LmlkIHx8IFwiVU5ERUZJTkVEIEVNQUlMSU5QVVRcIn1gLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoZW1haWxJbnB1dHMsIFwiZW1haWxJbnB1dHNcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMaXN0ZW5lckFudEZhbUNoZWNrcygpIHtcclxuICAgIGNvbnN0IGFudEZhbUNoZWNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFtpZF49J2FudEZhbSddXCIpO1xyXG4gICAgaWYgKGFudEZhbUNoZWNrcz8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGFudEZhbUNoZWNrcy5mb3JFYWNoKGFudEZhbUNoZWNrID0+IHtcclxuICAgICAgICAgICAgaWYgKGFudEZhbUNoZWNrIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgYW50RmFtQ2hlY2suYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBjaGFuZ2UgPT4gR2xvYmFsSGFuZGxlci5jcGJJbnBIYW5kbGVyKGNoYW5nZSwgYW50RmFtQ2hlY2spKTtcclxuICAgICAgICAgICAgICAgIGFudEZhbUNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiBHbG9iYWxIYW5kbGVyLmRvdWJsZUNsaWNrSGFuZGxlcihhbnRGYW1DaGVjaykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKGFudEZhbUNoZWNrLCBgdGFyZ2V0IGFudEZhbUNoZWNrIGlucHV0IGlkICR7YW50RmFtQ2hlY2s/LmlkIHx8IFwiVU5ERUZJTkVEIElEIElOUFVUXCJ9YCwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKGFudEZhbUNoZWNrcywgXCJhbnRGYW1DaGVja3NcIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMaXN0ZW5lckFudE1lZENvbnRhaW5lcihibG9ja0NvdW50ID0gMSkge1xyXG4gICAgY29uc3QgYW50TWVkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbnRNZWRDb250YWluZXJcIik7XHJcbiAgICBhbnRNZWRDb250YWluZXJcclxuICAgICAgICA/IGFudE1lZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgICAgIGJsb2NrQ291bnQgPSBBR0hhbmRsZXJzLmFkZEFudE1lZEhhbmRsZXIoY2xpY2ssIGJsb2NrQ291bnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gYmxvY2tDb3VudDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIDogRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChudWxsLCBcImFudE1lZENvbnRhaW5lclwiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbiAgICByZXR1cm4gYmxvY2tDb3VudDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGlzdGVuZXJzQ2VwRWxlbWVudHMoKSB7XHJcbiAgICBjb25zdCBjZXBFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZXBJZFwiKTtcclxuICAgIGNvbnN0IGNlcEVsZW1lbnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1dG9Db21wQ2VwQnRuXCIpO1xyXG4gICAgaWYgKGNlcEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgY2VwRWxlbWVudEJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgY2VwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gQUdNb2RlbC5mb3JtYXRDRVAoY2VwRWxlbWVudCkpO1xyXG4gICAgICAgIGNlcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFBR0hhbmRsZXJzLmVuYWJsZUNFUEJ0bihjZXBFbGVtZW50QnRuLCBjZXBFbGVtZW50LnZhbHVlLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgIGNlcEVsZW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IEFHSGFuZGxlcnMuc2VhcmNoQ0VQWE1MKGNlcEVsZW1lbnQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoZXh0TGluZShuZXcgRXJyb3IoKSksIFwiRWxlbWVudHMgZm9yIENFUCBpbnB1dFwiLCBjZXBFbGVtZW50LCBjZXBFbGVtZW50QnRuKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGlzdGVuZXJzUXhQcmluYygpIHtcclxuICAgIGNvbnN0IHF4UHJpbmMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF4UHJpbmNcIik7XHJcbiAgICBpZiAocXhQcmluYyBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcclxuICAgICAgICBxeFByaW5jLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBBR01vZGVsLmFkZERibFF1b3RlcyhxeFByaW5jKSk7XHJcbiAgICAgICAgcXhQcmluYy5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gQUdNb2RlbC5hZGREYmxRdW90ZXMocXhQcmluYykpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQocXhQcmluYywgXCJxeFByaW5jXCIsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxufVxyXG5pZiAoSlNPTkJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50ICYmIGFsbElucHV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICBsZXQgZm9ybURlc2NyaXB0aW9uID0gW107XHJcbiAgICBKU09OQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgZm9ybURlc2NyaXB0aW9uID0gR2xvYmFsSGFuZGxlci5nZXRKU09ORGVzYyhhbGxJbnB1dHMpO1xyXG4gICAgICAgIGNvbnN0IEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZCA9IChmb3JtRGVzY3JpcHRpb24gJiZcclxuICAgICAgICAgICAgZm9ybURlc2NyaXB0aW9uWzFdKSA/PyBbXCJcIl07XHJcbiAgICAgICAgaWYgKGZvcm1EZXNjcmlwdGlvbiAmJlxyXG4gICAgICAgICAgICBmb3JtRGVzY3JpcHRpb24ubGVuZ3RoID09PSA0ICYmXHJcbiAgICAgICAgICAgICFmb3JtRGVzY3JpcHRpb24uc29tZShmb3JtRGVzY0VsZW1lbnQgPT4gZm9ybURlc2NFbGVtZW50ID09PSBudWxsKSkge1xyXG4gICAgICAgICAgICBKU09OTGluayA9IEdsb2JhbEhhbmRsZXIuY3JlYXRlSlNPTkFuY2hvcihKU09OQnRuLCBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQpO1xyXG4gICAgICAgICAgICBKU09OTGlua1xyXG4gICAgICAgICAgICAgICAgPyBKU09OTGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbEhhbmRsZXIucmVnZW5lcmF0ZUpTT05CdG4oSlNPTkxpbmssIEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgOiBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKEpTT05MaW5rLCBcIkpTT05MaW5rXCIsIGV4dExpbmUobmV3IEVycm9yKCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gb2J0ZW5kbyBmb3JtRGVzY3JpcHRpb25gKTtcclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChKU09OQnRuLCBcIkpTT05CdG5cIiwgZXh0TGluZShuZXcgRXJyb3IoKSkpO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoYWxsSW5wdXRzLCBcImFsbElucHV0c1wiLCBleHRMaW5lKG5ldyBFcnJvcigpKSk7XHJcbn1cclxuLy9jaGFtYWRhc1xyXG5nZW5FbGVtZW50LnZhbHVlID0gYWRkTGlzdGVuZXJzR2VuQ29udHMoZ2VuRWxlbWVudCwgZ2VuVmFsdWUpO1xyXG5hZGRMaXN0ZW5lclRlbElucHV0cygpO1xyXG5hZGRMaXN0ZW5lcnNFbWFpbElucHV0cygpO1xyXG5hZGRMaXN0ZW5lckFudEZhbUNoZWNrcygpO1xyXG4vLyBibG9ja0NvdW50ID1cclxuYWRkTGlzdGVuZXJBbnRNZWRDb250YWluZXIoYmxvY2tDb3VudCk7XHJcbmFkZExpc3RlbmVyc0NlcEVsZW1lbnRzKCk7XHJcbkdsb2JhbEhhbmRsZXIuZGVhY3RUZXh0SW5wdXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXVtpZCQ9TnVtSWRdJyksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFtpZCQ9TnVsbElkXVwiKSk7XHJcbmFkZExpc3RlbmVyc1F4UHJpbmMoKTtcclxuLy8gLy8gY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG4vLyAvLyBsZXQgc2hvdWxkUmVnZW5lcmF0ZUJ0biA9IGZhbHNlO1xyXG4vLyAvLyBjb25zdCBoYW5kbGVNdXRhdGlvbiA9IChtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikgPT4ge1xyXG4vLyAvLyAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zTGlzdCkge1xyXG4vLyAvLyAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcclxuLy8gLy8gICAgICAgLy8gVmVyaWZpY2Egc2UgbyBKU09OQnRuIGZvaSByZW1vdmlkbyBlIG8gSlNPTkxpbmsgZm9pIGFkaWNpb25hZG9cclxuLy8gLy8gICAgICAgY29uc3QgSlNPTkJ0blJlbW92ZWQgPSBtdXRhdGlvbi5yZW1vdmVkTm9kZXNbMF0gPT09IEpTT05CdG47XHJcbi8vIC8vICAgICAgIGNvbnN0IEpTT05MaW5rQWRkZWQgPSBBcnJheS5mcm9tKG11dGF0aW9uLmFkZGVkTm9kZXMpLnNvbWUoXHJcbi8vIC8vICAgICAgICAgKG5vZGUpID0+IG5vZGUgPT09IEpTT05MaW5rXHJcbi8vIC8vICAgICAgICk7XHJcbi8vIC8vICAgICAgIGlmIChKU09OQnRuUmVtb3ZlZCAmJiBKU09OTGlua0FkZGVkKSB7XHJcbi8vIC8vICAgICAgICAgLy8gTMOzZ2ljYSBhIHNlciBleGVjdXRhZGEgcXVhbmRvIGEgdHJvY2Egb2NvcnJlclxyXG4vLyAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiSlNPTkJ0biBmb2kgcmVtb3ZpZG8sIGUgSlNPTkxpbmsgZm9pIGFkaWNpb25hZG8uXCIpO1xyXG4vLyAvLyAgICAgICAgIC8vIEFkaWNpb25lIGFxdWkgcXVhbHF1ZXIgbMOzZ2ljYSBvdSBldmVudG8gYWRpY2lvbmFsIHF1ZSB2b2PDqiBkZXNlamEgZXhlY3V0YXJcclxuLy8gLy8gICAgICAgfVxyXG4vLyAvLyAgICAgfVxyXG4vLyAvLyAgIH1cclxuLy8gLy8gfTtcclxuLy8gLy8gLy8gRnVuw6fDo28gcXVlIHNlcsOhIGNoYW1hZGEgcXVhbmRvIGhvdXZlciB1bWEgbXV0YcOnw6NvIG5vIERPTVxyXG4vLyAvLyAvLyBDcmlhIHVtIG5vdm8gb2JzZXJ2YWRvciBkZSBtdXRhw6fDo28gY29tIGEgZnVuw6fDo28gZGUgY2FsbGJhY2tcclxuLy8gLy8gY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihoYW5kbGVNdXRhdGlvbik7XHJcbi8vIC8vIC8vIENvbmZpZ3VyYSBvIG9ic2VydmFkb3IgcGFyYSBvYnNlcnZhciBtdWRhbsOnYXMgbm8gbsOzIHBhaSAocG9yIGV4ZW1wbG8sIG8gYm9keSlcclxuLy8gLy8gb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9