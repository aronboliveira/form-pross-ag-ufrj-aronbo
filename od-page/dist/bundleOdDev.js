/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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


/***/ }),

/***/ "./src/odHandler.tsx":
/*!***************************!*\
  !*** ./src/odHandler.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addSubDivTrat: () => (/* binding */ addSubDivTrat),
/* harmony export */   addTextToObs: () => (/* binding */ addTextToObs),
/* harmony export */   clearQuadrInps: () => (/* binding */ clearQuadrInps),
/* harmony export */   dragDrop: () => (/* binding */ dragDrop),
/* harmony export */   dragEnd: () => (/* binding */ dragEnd),
/* harmony export */   dragEndChilds: () => (/* binding */ dragEndChilds),
/* harmony export */   dragEnter: () => (/* binding */ dragEnter),
/* harmony export */   dragHover: () => (/* binding */ dragHover),
/* harmony export */   dragLeave: () => (/* binding */ dragLeave),
/* harmony export */   dragOver: () => (/* binding */ dragOver),
/* harmony export */   dragStart: () => (/* binding */ dragStart),
/* harmony export */   dragStartChilds: () => (/* binding */ dragStartChilds),
/* harmony export */   resetLabels: () => (/* binding */ resetLabels),
/* harmony export */   showInspDialogs: () => (/* binding */ showInspDialogs),
/* harmony export */   showInspSpanSub: () => (/* binding */ showInspSpanSub)
/* harmony export */ });
/* harmony import */ var _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global-scripts/src/gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global-scripts/src/gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global-scripts/src/errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout



let movingSrcItem = null;
let targItem = null;
const contInQuadrs = document.querySelectorAll(".contInQuadrs");
let isDialogCalled = false;
let blockCount = 1;
// const quadrDentsArray = Array.from(quadrDents); //tem que ser aplicada em Arrray, não coleção HTML
// const quadrDents = document.getElementsByClassName("quadrMainDiv"); //retorna HTMLCollection
function showInspSpanSub(changeRadio, inspRadio) {
    if (changeRadio.target === inspRadio) {
        if (inspRadio.classList.contains("radYes")) {
            const isParentValid = inspRadio.parentElement?.classList.contains("inspSpanMain");
            if (isParentValid) {
                const validSibling = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_1__.searchNextSiblings(inspRadio, "inspSpanSub");
                inspRadio.addEventListener("dblclick", () => {
                    if (!inspRadio.checked) {
                        validSibling.setAttribute("hidden", "");
                    }
                });
                if (inspRadio.checked === true) {
                    validSibling.removeAttribute("hidden");
                }
            }
        }
        else if (inspRadio.classList.contains("radNo")) {
            const isParentValid = inspRadio.parentElement?.classList.contains("inspSpanMain");
            if (isParentValid) {
                const validSibling = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_1__.searchNextSiblings(inspRadio, "inspSpanSub");
                if (inspRadio.checked === true) {
                    validSibling.setAttribute("hidden", "");
                }
            }
            else {
                console.error(`Erro validando parentElement class.
        Classes obtidas: ${inspRadio.parentElement?.classList ?? "NULL"};
        Classe procurada: "inspSpanMain"`);
            }
        }
    }
}
function showInspDialogs(click, inspDialogBtn) {
    if (click.target === inspDialogBtn) {
        const calledDialog = inspDialogBtn.nextElementSibling;
        if (calledDialog && calledDialog instanceof HTMLDialogElement) {
            if (isDialogCalled === false) {
                calledDialog.show();
                inspDialogBtn.textContent = "Esconder Sugestões";
                isDialogCalled = !isDialogCalled;
            }
            else {
                calledDialog.close();
                inspDialogBtn.textContent = "Mostrar Sugestões";
                isDialogCalled = !isDialogCalled;
            }
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(calledDialog ?? null, "calledDialog", slicedError ?? "NULL");
        }
    }
}
function addTextToObs(click, inspLIBtn) {
    if (click.target === inspLIBtn) {
        const validTextParent = inspLIBtn.parentElement?.innerText;
        const fixedTextParent = validTextParent?.slice(0, -9);
        const validParent = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_1__.searchParents(inspLIBtn, "inspDialog");
        const validParentSibling = _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_1__.searchPreviousSiblings(validParent, "inspTa");
        if (validParentSibling instanceof HTMLTextAreaElement ||
            validParentSibling instanceof HTMLInputElement) {
            if (validParentSibling.value.length === 0) {
                //textContent é cumulativo persistente, mesmo após remoção de conteúdo em input/ta, logo usar .value
                // console.log("condição if");
                validParentSibling.value += fixedTextParent;
            }
            else {
                const loweredFixedTextParent = fixedTextParent?.toLowerCase();
                validParentSibling.value += loweredFixedTextParent;
            }
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.inputNotFound(validParentSibling ?? null, "validParentSibling", slicedError ?? "NULL");
        }
    }
}
function dragHover(quadrDent) {
    if (quadrDent instanceof HTMLElement) {
        const originalCursor = quadrDent.style.cursor;
        setTimeout(() => {
            quadrDent.style.cursor = "grabbing";
            setTimeout(() => {
                quadrDent.style.cursor = originalCursor;
                if (quadrDent.style.cursor === "grabbing") {
                    quadrDent.style.cursor = "grab";
                }
            }, 2000);
        }, 2000);
    }
}
function dragStart(move) {
    movingSrcItem = move?.target ?? null;
    if (movingSrcItem && movingSrcItem instanceof HTMLElement) {
        move?.dataTransfer?.setData("text/plain", ""); //define a data inicial no container mobilizado
        dragStartChilds(contInQuadrs);
    }
    else {
        console.warn(`Erro reconhecendo Drag Start: target ${movingSrcItem}, classe ${movingSrcItem}`);
    }
}
function dragStartChilds(contInQuadrs) {
    contInQuadrs.forEach((contInQuadr) => {
        contInQuadr.setAttribute("draggable", "true");
    });
}
function dragEnter(move) {
    move.preventDefault();
}
function dragOver(move) {
    move.preventDefault();
}
function dragLeave(move) {
    move.preventDefault();
}
function dragDrop(drop) {
    targItem = drop.target;
    if (movingSrcItem instanceof HTMLElement &&
        targItem &&
        targItem instanceof HTMLElement &&
        movingSrcItem !== null) {
        const gridSrcItemCStyle = window.getComputedStyle(movingSrcItem); //captura estilos da source
        const gridSrcItemStyle = movingSrcItem.style;
        const gridSrcItemColumn = gridSrcItemCStyle.getPropertyValue("grid-column");
        const gridSrcItemRow = gridSrcItemCStyle.getPropertyValue("grid-row");
        const gridTargItemCStyle = window.getComputedStyle(targItem); //captura estilos do target na área de drop
        const gridTargItemStyle = targItem.style;
        const gridTargItemColumn = gridTargItemCStyle.getPropertyValue("grid-column");
        const gridTargItemRow = gridTargItemCStyle.getPropertyValue("grid-row");
        console.log(gridSrcItemColumn);
        console.log(gridSrcItemRow);
        console.log(gridTargItemColumn);
        console.log(gridTargItemRow);
        gridSrcItemStyle.setProperty("grid-column", gridTargItemColumn); //faz a inversão
        gridSrcItemStyle.setProperty("grid-row", gridTargItemRow);
        gridTargItemStyle.setProperty("grid-column", gridSrcItemColumn);
        gridTargItemStyle.setProperty("grid-row", gridSrcItemRow);
        movingSrcItem = null;
    }
    dragEnd();
}
function dragEnd() {
    movingSrcItem = null;
    dragEndChilds(contInQuadrs);
}
function dragEndChilds(contInQuadrs) {
    contInQuadrs.forEach((contInQuadr) => {
        contInQuadr.setAttribute("draggable", "false");
    });
    // console.log("o drag das childs foi definido como false");
}
function resetLabels(quadrBtn) {
    const parentDiv = quadrBtn?.closest(".quadrMainDiv");
    console.log(parentDiv);
    if (parentDiv) {
        const innerDivInps = parentDiv.querySelectorAll("input[id^=inpD]");
        if (innerDivInps) {
            if (innerDivInps.length < 8) {
                console.warn(`Erro validando inputs internos ao quadrante. Número total de inputs: ${innerDivInps.length}`);
            }
            innerDivInps.forEach((innerDivInp) => {
                if (innerDivInp instanceof HTMLInputElement) {
                    innerDivInp.value = "Hígido";
                }
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(innerDivInps ?? null, "innerDivInps", slicedError ?? "NULL");
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(parentDiv ?? null, "parentDiv", slicedError ?? "NULL");
    }
}
function clearQuadrInps(quadrInp) {
    if (quadrInp instanceof HTMLInputElement) {
        if (quadrInp.nextElementSibling) {
            const dlOptions = quadrInp.nextElementSibling.children;
            const dlOptionsValues = [];
            for (let i = 0; i < dlOptions.length; i++) {
                if (dlOptions[i] instanceof HTMLOptionElement) {
                    dlOptionsValues.push(dlOptions[i].value);
                }
            }
            if (dlOptionsValues.includes(quadrInp.value)) {
                quadrInp.value = "";
                quadrInp.placeholder = "Apagado";
            }
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(quadrInp ?? null, "quadrInp", slicedError ?? "NULL");
    }
}
function addSubDivTrat(click) {
    if (click.target &&
        click.target instanceof HTMLElement &&
        click.target.tagName === "BUTTON") {
        if (click.target.classList.contains("addTrat")) {
            blockCount++;
            const tratContainer = document.getElementById("tratContainer");
            const newBlock = document.createElement("div");
            newBlock.className = "contTerc divSub divSubTrat";
            newBlock.id = `divSubTrat${blockCount}`;
            newBlock.innerHTML = `
          <span class="contQuat spanMain tratMainSpan tratNumSpan" id="tratNumSpan${blockCount}"> 
          ${blockCount}&#41
          </span>
          <span class="contQuat spanMain tratMainSpan tratDateSpan" id="tratDateSpan${blockCount}">
            <label for="tratDateInpId${blockCount}" class="contQuint tratLabel">Data</label>
            <input type="date" name="tratDateInpName${blockCount}" id="tratDateInpId${blockCount}" class="inpTrat tratDate" required />
            <button type="button" class="contQuint datBtn" id="trat${blockCount}DatBtn">Usar data atual</button>
          </span>
          <span class="contQuat spanMain tratMainSpan tratTypeSpan" id="tratTypeSpan${blockCount}">
            <label for="taTratId${blockCount}" class="contQuint tratTalab" id="labTratTip${blockCount}">Tipo de Tratamento</label>
            <textarea name="taTratName1" id="taTratId${blockCount}" class="taTrat" required></textarea>
          </span>
          <span class="contQuat spanMain tratMainSpan tratFileSpan" id="tratFileSpan${blockCount}">
            <span id="spanAstTratId${blockCount}" class="contQuint tratLabel labAst">Assinatura</span>
            <input type="text" name="inpAstTratName${blockCount}" id="inpAstTratId${blockCount}"
            class="contQuint inpTrat inpAst tratAst" />
            <button type="button" class="contQuint astDigtBtn confirmBtn" 
            id="trat${blockCount}AstDigtBtn">Usar Assinatura Digital</button>
          </span>
          <span class="contQuat spanMain tratMainSpan tratButSpan" id="tratButSpan${blockCount}">
            <button type="button" name="addTratName${blockCount}" id="addTratId${blockCount}" class="addTrat countTrat"
            value="addTrat">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
              id="addTratSvg${blockCount}" class="plusButSvg bi bi-plus-square-fill countTratSvg" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
              </svg>
            </button>
            <button type="button" name="removeTratName1" id="removeTratId${blockCount}"
            class="removeTrat countTrat" value="removeTrat">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
              id="removeTratSvg${blockCount}" class="minusButSvg bi bi-dash-square-fill countTratSvg" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
              </svg>
            </button>
          </span>   
        `;
            tratContainer?.appendChild(newBlock);
            const dateBtns = newBlock.querySelectorAll('button[id$="DatBtn"]');
            const textInputs = newBlock.querySelectorAll('input[type="text"]');
            const textareas = newBlock.querySelectorAll("textarea");
            const textConts = [...textInputs, ...textareas];
            const astDigtBtns = newBlock.querySelectorAll('button[id$="AstDigtBtn');
            for (let iD = 0; iD < dateBtns.length; iD++) {
                dateBtns[iD].addEventListener("click", (activation) => _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_1__.useCurrentDate(activation, dateBtns[iD]));
            }
            for (let iT = 0; iT < textConts.length; iT++) {
                textConts[iT].addEventListener("input", () => _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_0__.autoCapitalizeInputs(textConts[iT]));
            }
            for (let iA = 0; iA < astDigtBtns.length; iA++) {
                astDigtBtns[iA].addEventListener("click", (activation) => _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_1__.changeToAstDigit(activation, astDigtBtns[iA]));
            }
        }
        else if (click.target.classList.contains("removeTrat")) {
            const divToRemove = click.target.closest(".contTerc.divSub.divSubTrat");
            if (divToRemove && blockCount !== 1 && divToRemove.id !== "divSubTrat1") {
                divToRemove.remove();
                blockCount -= 1;
            }
        }
    }
    else {
        const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_2__.elementNotFound(click?.target ?? null, "target <button>", slicedError ?? "NULL");
    }
}


/***/ }),

/***/ "./src/odModel.tsx":
/*!*************************!*\
  !*** ./src/odModel.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   orderLabels: () => (/* binding */ orderLabels),
/* harmony export */   resetAvDentValue: () => (/* binding */ resetAvDentValue)
/* harmony export */ });
/* harmony import */ var _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global-scripts/src/errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização

const subDivsQuadrs = document.querySelectorAll(".quadrSubDiv");
let isValuePreDef = false;
function resetAvDentValue(selectInp) {
    const targInp = selectInp;
    const targValue = targInp.value;
    const dlOptionsCollection = document.getElementsByClassName("elemOp");
    const dlOptionsArray = Array.from(dlOptionsCollection);
    if (dlOptionsArray.every((dlOption) => dlOption instanceof HTMLOptionElement)) {
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
            const placeholderTimer = setTimeout(() => targInp.classList.add("placeholder-hidden"), 1000);
            targInp.addEventListener("blur", () => {
                targInp.classList.remove("placeholder-hidden");
                clearTimeout(placeholderTimer);
            });
            targInp.addEventListener("focus", () => {
                targInp.classList.remove("placeholder-hidden");
                clearTimeout(placeholderTimer);
            });
        }
    }
    else {
        for (let i = 0; i < dlOptionsArray.length; i++) {
            if (!(dlOptionsArray[i] instanceof HTMLInputElement || HTMLTextAreaElement)) {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__.inputNotFound(dlOptionsArray[i] ?? null, `${dlOptionsArray[i]?.id ?? "UNDEFINED ID DLOPTION"}`, slicedError ?? "NULL");
            }
        }
    }
}
function orderLabels() {
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
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_0__.elementNotPopulated(labsNList ?? null, "labsNLIST", slicedError ?? "NULL");
        }
    });
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
  !*** ./src/odController.tsx ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _odHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./odHandler */ "./src/odHandler.tsx");
/* harmony import */ var _odModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./odModel */ "./src/odModel.tsx");
/* harmony import */ var _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global-scripts/src/gModel */ "../global-scripts/src/gModel.tsx");
/* harmony import */ var _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global-scripts/src/gHandlers */ "../global-scripts/src/gHandlers.tsx");
/* harmony import */ var _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../global-scripts/src/errorHandler */ "../global-scripts/src/errorHandler.tsx");
//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM





//inicialização de constantes percorrendo o DOM
const textInputs = document.querySelectorAll('input[type="text"]');
const textareas = document.querySelectorAll("textarea");
const textConts = [...textInputs, ...textareas];
const radioButtons = document.querySelectorAll('input[type="radio"]');
const inspRadiosYes = document.querySelectorAll('input[class="contQuint radOp radYes"]');
const inspRadiosNo = document.querySelectorAll('input[class="contQuint radOp radNo"]');
const inspDialogsBtns = document.querySelectorAll('button[id^="inspDialogBtn"]');
const inspLIBtns = document.querySelectorAll('button[id^="inspLIBtn"]');
const quadrDents = document.getElementsByClassName("quadrMainDiv");
const quadrDentsArray = Array.from(quadrDents);
const avElemDents = document.getElementsByClassName("inpAvDent");
const avElemDentsArray = Array.from(avElemDents);
const tratContainer = document.getElementById("tratContainer");
const dateBtns = document.querySelectorAll('button[id$="DatBtn"]');
const editableCite = document.querySelector('cite[contenteditable="true"]');
const deactAutocorrectBtns = document.querySelectorAll('button[id^="deactAutocorrectBtn"]');
const astDigtBtns = document.querySelectorAll('button[id$="AstDigtBtn');
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");
const quadrInps = document.querySelectorAll('input[id^="inpD"]');
const resetDivsQuadrs = document.querySelectorAll(".resetBut");
// const inspSpanSubs = document.getElementsByClassName("inspSpanSub");
// const inspSpanSubsArray = Array.from(inspSpanSubs);
// const tratTypeSpans = document.querySelectorAll('span[id^="tratTypeSpan"]');
// const taTrats = document.querySelectorAll("textarea[id^=taTrat")
// const subDivsQuadrs = document.querySelectorAll(".quadrSubDiv");
// let selection = window.getSelection();
// let range = document.createRange();
//validação de constantes e adição de listeners
if (textConts.length > 0) {
    textConts.forEach(function (textCont) {
        textCont.addEventListener("input", function (input) {
            if (input.target &&
                (input.target instanceof HTMLTextAreaElement ||
                    input.target instanceof HTMLInputElement)) {
                _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.autoCapitalizeInputs(input.target);
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(input?.target ?? null, "target textCont", slicedError ?? "NULL");
            }
        });
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(textConts ?? null, "textConts", slicedError ?? "NULL");
}
if (radioButtons.length > 0) {
    radioButtons.forEach((radio) => {
        if (radio instanceof HTMLInputElement && radio.type === "radio") {
            radio.addEventListener("keydown", (keydown) => {
                _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.opRadioHandler(keydown);
            });
            radio.addEventListener("dblclick", () => _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.doubleClickHandler(radio));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(radio ?? null, `${radio?.id || "UNDEFINED ID RADIO"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(radioButtons ?? null, "radioButtons", slicedError ?? "NULL");
}
if (inspRadiosYes.length > 0) {
    inspRadiosYes.forEach((inspRadioYes) => {
        if (inspRadioYes instanceof HTMLInputElement &&
            (inspRadioYes.type === "radio" || inspRadioYes.type === "checkbox")) {
            inspRadioYes.addEventListener("click", (clickRadio) => _odHandler__WEBPACK_IMPORTED_MODULE_0__.showInspSpanSub(clickRadio, inspRadioYes));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(inspRadioYes ?? null, `${inspRadioYes?.id || "UNDEFINED ID YES INPUT"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(inspRadiosYes ?? null, "inspRadioYes", slicedError ?? "NULL");
}
if (inspRadiosNo.length > 0) {
    inspRadiosNo.forEach((inspRadioNo) => {
        if (inspRadioNo instanceof HTMLInputElement &&
            (inspRadioNo.type === "radio" || inspRadioNo.type === "checkbox")) {
            inspRadioNo.addEventListener("click", (clickRadio) => _odHandler__WEBPACK_IMPORTED_MODULE_0__.showInspSpanSub(clickRadio, inspRadioNo));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(inspRadioNo ?? null, `${inspRadioNo?.id || "UNDEFINED ID YES INPUT"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(inspRadiosNo ?? null, "inspRadioNo", slicedError ?? "NULL");
}
if (inspDialogsBtns.length > 0) {
    inspDialogsBtns.forEach((inspDialogBtn) => {
        if (inspDialogBtn instanceof HTMLButtonElement) {
            inspDialogBtn.addEventListener("click", (click) => _odHandler__WEBPACK_IMPORTED_MODULE_0__.showInspDialogs(click, inspDialogBtn));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(inspDialogBtn ?? null, `${inspDialogBtn?.id || "UNDEFINED ID DIALOG BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(inspDialogsBtns ?? null, "inspDialogsBtns", slicedError ?? "NULL");
}
if (inspLIBtns.length > 0) {
    inspLIBtns.forEach((inspLIBtn) => {
        if (inspLIBtn instanceof HTMLButtonElement) {
            inspLIBtn.addEventListener("click", (click) => _odHandler__WEBPACK_IMPORTED_MODULE_0__.addTextToObs(click, inspLIBtn));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(inspLIBtn ?? null, `${inspLIBtn?.id || "UNDEFINED ID LI BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(inspLIBtns ?? null, "inspLIBtns", slicedError ?? "NULL");
}
if (quadrDentsArray.length > 0) {
    quadrDentsArray.forEach((quadrDent) => {
        if (quadrDent instanceof HTMLElement) {
            quadrDent.addEventListener("mousemove", () => _odHandler__WEBPACK_IMPORTED_MODULE_0__.dragHover(quadrDent));
            quadrDent.addEventListener("dragstart", _odHandler__WEBPACK_IMPORTED_MODULE_0__.dragStart);
            quadrDent.addEventListener("dragenter", _odHandler__WEBPACK_IMPORTED_MODULE_0__.dragEnter);
            quadrDent.addEventListener("dragover", _odHandler__WEBPACK_IMPORTED_MODULE_0__.dragOver);
            quadrDent.addEventListener("dragleave", _odHandler__WEBPACK_IMPORTED_MODULE_0__.dragLeave);
            quadrDent.addEventListener("drop", _odHandler__WEBPACK_IMPORTED_MODULE_0__.dragDrop);
            quadrDent.addEventListener("dragend", _odHandler__WEBPACK_IMPORTED_MODULE_0__.dragEnd);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(quadrDent ?? null, `${quadrDent?.id ?? "UNDEFINED QUADRANT ID"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(quadrDentsArray ?? null, "quadrDentsArray", slicedError ?? "NULL");
}
if (avElemDentsArray.length > 0) {
    avElemDentsArray.forEach((avElemDent) => {
        avElemDent.addEventListener("click", () => {
            if (avElemDent instanceof HTMLButtonElement ||
                HTMLSelectElement ||
                HTMLInputElement) {
                _odModel__WEBPACK_IMPORTED_MODULE_1__.resetAvDentValue(avElemDent);
            }
            else {
                const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
                _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(avElemDent ?? null, `${avElemDent?.id ?? "UNDEFINED ID ELEMENT"}`, slicedError ?? "NULL");
            }
        });
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(avElemDentsArray ?? null, "avElemDentsArray", slicedError ?? "NULL");
}
if (quadrInps.length > 0) {
    quadrInps.forEach((quadrInp) => {
        if (quadrInp instanceof HTMLInputElement) {
            quadrInp.addEventListener("click", () => _odHandler__WEBPACK_IMPORTED_MODULE_0__.clearQuadrInps(quadrInp));
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.inputNotFound(quadrInp ?? null, `${quadrInp?.id ?? "UNDEFINED QUADRANT INPUT ID"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(quadrInps ?? null, "quadrInps", slicedError ?? "NULL");
}
if (resetDivsQuadrs.length > 0) {
    resetDivsQuadrs.forEach((resetBtn) => {
        if (resetBtn instanceof HTMLButtonElement) {
            resetBtn.addEventListener("click", () => {
                _odHandler__WEBPACK_IMPORTED_MODULE_0__.resetLabels(resetBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(resetBtn ?? null, `${resetBtn?.id ?? "UNDEFINED ID RESET BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(resetDivsQuadrs ?? null, "resetDivsQaudrs", slicedError ?? "NULL");
}
document.addEventListener("DOMContentLoaded", () => {
    _odModel__WEBPACK_IMPORTED_MODULE_1__.orderLabels();
});
if (tratContainer instanceof HTMLElement) {
    tratContainer.addEventListener("click", (click) => _odHandler__WEBPACK_IMPORTED_MODULE_0__.addSubDivTrat(click));
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(tratContainer ?? null, "tratContainer", slicedError ?? "NULL");
}
if (dateBtns.length > 0) {
    dateBtns.forEach(function (dateBtn) {
        if (dateBtn instanceof HTMLButtonElement) {
            dateBtn.addEventListener("click", (activation) => {
                _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.useCurrentDate(activation, dateBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(dateBtn ?? null, `${dateBtn?.id || "UNDEFINED ID DATE BUTTON"}`, slicedError ?? "NULL");
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
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(click?.target ?? null, "click target editableCite", slicedError ?? "NULL");
        }
    };
    editableCite.addEventListener("keyup", function (keypress) {
        if (keypress.target && keypress.target instanceof HTMLElement) {
            _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.autoCapitalizeCite(keypress.target);
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(keypress?.target ?? null, "keypress target editableCite", slicedError ?? "NULL");
        }
    });
    editableCite.addEventListener("click", citeClickHandler);
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(null, "editableCite", slicedError ?? "NULL");
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
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(astDigtBtn ?? null, astDigtBtn?.id || "UNDEFINED ID BUTTON", slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(astDigtBtns ?? null, "astDigtBtns", slicedError ?? "NULL");
}
if (deactAutocorrectBtns.length > 0) {
    deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
        if (deactAutocorrectBtn instanceof HTMLButtonElement) {
            deactAutocorrectBtn.addEventListener("click", function (click) {
                return _global_scripts_src_gModel__WEBPACK_IMPORTED_MODULE_2__.switchAutocorrect(click, deactAutocorrectBtn);
            });
        }
        else {
            const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(deactAutocorrectBtns ?? null, `${deactAutocorrectBtn?.id || "UNDEFINED ID BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotPopulated(deactAutocorrectBtns ?? null, "deactAutoCorrectBtns", slicedError ?? "NULL");
}
if (subButton instanceof HTMLButtonElement) {
    subButton.addEventListener("click", _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.subForm);
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(subButton ?? null, "subButton", slicedError ?? "NULL");
}
if (resetFormBtn instanceof HTMLButtonElement) {
    resetFormBtn.addEventListener("click", (click) => _global_scripts_src_gHandlers__WEBPACK_IMPORTED_MODULE_3__.resetarFormulario(click, astDigtBtns));
}
else {
    const slicedError = new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    _global_scripts_src_errorHandler__WEBPACK_IMPORTED_MODULE_4__.elementNotFound(resetFormBtn ?? null, "resetFormBtn", slicedError ?? "NULL");
}
//TODO DESATIVADO POR ENQUANTO
// subDivsQuadrs.forEach((subDivQuadrs) => {
//   subDivQuadrs.addEventListener("click", (selectedBut) => {
//     OdHandler.reorderLabels(selectedBut);
//   });
// });
// inspSpanSubsArray.forEach((inspSpanSub) => {
//   inspSpanSub.addEventListener("mousedown", (mousemove) =>
//     OdHandler.resizeContainers(mousemove, true, inspSpanSub)
//   );
// });
// const inpsAst = document.querySelectorAll('input[id^="inpAst"]');
// const confirmLocId = document.querySelector('label[for="confirmLocId"]');
// const inspDialogs = document.querySelectorAll('dialog[id^="inspDialog"]');
// if (editableCite) {
// editableCite.addEventListener("mousedown", (mousemove) =>
//   OdHandler.resizeContainers(mousemove, true, editableCite)
// );
// }
// export function cursorMovementKeyboard(targetElement) {
//   targetElement.addEventListener("click", () => {
//     cursorPosition = window.getSelection().getRangeAt(0).startOffset;
//     console.log("Posição do cursor atualizada(click): " + cursorPosition);
//   });
//   // targetElement.addEventListener("mouseup", () => {
//   //   if (selection.rangeCount > 0) {
//   //     for (let iSM = 0; iSM < selection.rangeCount; iSM++) {
//   //       range = selection.getRangeAt(iSM);
//   //       console.log("Texto selecionado: " + range.toString());
//   //     }
//   //   }
//   // });
//   // let textCounter = 0
//   // let previousTextLength =
//   let isKeyupListened = false;
//   let textAfterKeyup = "";
//   console.log("previousTextLength " + previousTextLength);
//   targetElement.addEventListener("keyup", (move) => {
//     // textCounter++
//     isKeyupListened = true;
//     textAfterKeyup = targetElement.textContent;
//     console.log("text " + textAfterKeyup);
//     // if (afterTextLength !== previousTextLength) {
//     //   cursorPosition += afterTextLength - previousTextLength;
//     // }
//     cursorPosition = targetElement.selectionStart;
//     // if (selection.rangeCount > 0) {
//     //   for (let iSK = 0; iSK < selection.rangeCount; iSK++) {
//     //     range = selection.getRangeAt(iSK);
//     //     console.log("Texto selecionado: " + range.toString());
//     //   }
//     // }
//     if (cursorPosition === 0) {
//       if (move.keyCode === 39) {
//         cursorPosition++;
//         console.log("Posição do cursor após arrowRight: " + cursorPosition);
//         range.setStart(targetElement, cursorPosition);
//       }
//     } else if (cursorPosition > 0) {
//       if (cursorPosition !== targetElement.textContent.length) {
//         if (move.keyCode === 37) {
//           cursorPosition--;
//           console.log("Posição do cursor após arrowLeft: " + cursorPosition);
//           range.setStart(targetElement, cursorPosition);
//         }
//         if (move.keyCode === 39) {
//           cursorPosition++;
//           console.log("Posição do cursor após arrowRight: " + cursorPosition);
//           range.setStart(targetElement, cursorPosition);
//         }
//       } else if (cursorPosition === targetElement.textContent.length) {
//         if (move.keyCode === 37) {
//           cursorPosition--;
//           console.log("Posição do cursor após arrowLeft: " + cursorPosition);
//           range.setStart(targetElement, cursorPosition);
//         }
//       }
//     }
//   });
//   if (isKeyupListened) {
//     targetElement.textContent = textAfterKeyup;
//     isKeyupListened = false;
//   }
// }
// export function cursorMovementMobile() {
//   editableCite.addEventListener("touch", () => {
//     cursorPosition = window.getSelection().getRangeAt(0).startOffset;
//     console.log("Posição do cursor atualizada(touch): " + cursorPosition);
//   });
// }
// confirmLocId.addEventListener("mousedown", (mousemove) =>
//   OdHandler.resizeContainers(mousemove, true, confirmLocId)
// );
// inpsAst.forEach((inpAst) => {
//   inpAst.addEventListener("mousedown", (mousemove) =>
//     OdHandler.resizeContainers(mousemove, true, inpAst)
//   );
// });
// inspDialogs.forEach((inspDialog) => {
//   inspDialog.addEventListener("mousedown", (mousemove) =>
//     OdHandler.resizeContainers(mousemove, true, inspDialog)
//   );
// });
// tratTypeSpans.forEach((tratTypeSpan) => {
//   tratTypeSpan.addEventListener("mousedown", (mousemove) =>
//     OdHandler.resizeContainers(mousemove, true, tratTypeSpan)
//   );
//   tratTypeSpan.addEventListener("mousemove", (mousemove) =>
//     OdHandler.applyResizingCursor(mousemove, tratTypeSpan)
//   );
// });
// taTrats.forEach((taTrat) => {
//   taTrat.addEventListener("mousemove", (mousemove) =>
//     OdHandler.applyResizingCursor(mousemove, taTrat)
//   );
// });
// editableCite.addEventListener("mousedown", (mousemove) =>
//   OdHandler.resizeContainers(mousemove, true, editableCite)
// );

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQixTQUFTO0FBQ1Qsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUEwQjtBQUNsQztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0dBQWdHLEdBQUc7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUF3QjtBQUNoQztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNCQUFzQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNCQUFzQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNCQUFzQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNEQUF3QjtBQUM1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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kb250b2xvZ2lhLXByb3NhdWRlLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9jbGFzc2VzLnRzeCIsIndlYnBhY2s6Ly9vZG9udG9sb2dpYS1wcm9zYXVkZS8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZXJyb3JIYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9vZG9udG9sb2dpYS1wcm9zYXVkZS8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ0hhbmRsZXJzLnRzeCIsIndlYnBhY2s6Ly9vZG9udG9sb2dpYS1wcm9zYXVkZS8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ01vZGVsLnRzeCIsIndlYnBhY2s6Ly9vZG9udG9sb2dpYS1wcm9zYXVkZS8uL3NyYy9vZEhhbmRsZXIudHN4Iiwid2VicGFjazovL29kb250b2xvZ2lhLXByb3NhdWRlLy4vc3JjL29kTW9kZWwudHN4Iiwid2VicGFjazovL29kb250b2xvZ2lhLXByb3NhdWRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kb250b2xvZ2lhLXByb3NhdWRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZG9udG9sb2dpYS1wcm9zYXVkZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kb250b2xvZ2lhLXByb3NhdWRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2RvbnRvbG9naWEtcHJvc2F1ZGUvLi9zcmMvb2RDb250cm9sbGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmV4cG9ydCBjbGFzcyBKU09OU3RvcmFnZXIge1xyXG4gICAgI2lkO1xyXG4gICAgI3ZhbHVlO1xyXG4gICAgY29uc3RydWN0b3IoaWQsIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy4jaWQgPSBpZDtcclxuICAgICAgICB0aGlzLiN2YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBnZXQgc2hvd0lucElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiNpZDtcclxuICAgIH1cclxuICAgIGdldCBzaG93SW5wVmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuI3ZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IHNob3dBbGxJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiBbdGhpcy4jaWQsIHRoaXMuI3ZhbHVlXTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSlNPTlRpdGxlU3RvcmFnZXIge1xyXG4gICAgI3RpdGxlO1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLiN0aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcyk7XHJcbiAgICB9XHJcbiAgICBnZXQgc2hvd0lucFRpdGxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiN0aXRsZTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgUGVyc29uIHtcclxuICAgIGdlbjtcclxuICAgIGFnZTtcclxuICAgIHdlaWdodDtcclxuICAgIGhlaWdodDtcclxuICAgIHN1bURDdXQ7XHJcbiAgICBhdHZMdmw7XHJcbiAgICBjb25zdHJ1Y3RvcihnZW4sIGFnZSwgd2VpZ2h0LCBoZWlnaHQsIHN1bURDdXQsIGF0dkx2bCkge1xyXG4gICAgICAgIHRoaXMuZ2VuID0gZ2VuO1xyXG4gICAgICAgIHRoaXMuYWdlID0gYWdlO1xyXG4gICAgICAgIHRoaXMud2VpZ2h0ID0gd2VpZ2h0O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuc3VtREN1dCA9IHN1bURDdXQ7XHJcbiAgICAgICAgdGhpcy5hdHZMdmwgPSBhdHZMdmw7XHJcbiAgICB9XHJcbiAgICBjaGVja0F0dkx2bChwZXJzb24pIHtcclxuICAgICAgICBpZiAocGVyc29uICYmIFwiYXR2THZsXCIgaW4gcGVyc29uICYmIHRoaXMuYXR2THZsICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5hdHZMdmwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzZWRlbnRhcmlvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEuMjtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJsZXZlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEuNDtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb2RlcmFkb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxLjY7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW50ZW5zb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxLjk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibXVpdG9JbnRlbnNvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDIuMjtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gY2Fzby4gQ2FzbyBvYnRpZG86ICR7dGhpcy5hdHZMdmwgPz8gXCJudWxsXCJ9OyBDYXNvcyBwb3Nzw612ZWlzOiBzZWRlbnTDoXJpbyB8fCBsZXZlIHx8IG1vZGVyYWRvIHx8IGludGVuc28gfHwgbXVpdG9JbnRlbnNvYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgcGVzc29hLiBWYWxvciBvYnRpZG86ICR7cGVyc29uID8/IFwibnVsbFwifTsgaW5zdMOibmNpYSAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn07IFZhbG9yIGRlIE7DrXZlbCBkZSBBdGl2aWRhZGUgRsOtc2ljYSBvYnRpZG86ICR7dGhpcy5hdHZMdmwgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGNhbGNJTUMocGVyc29uKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHBlcnNvbiAmJlxyXG4gICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIiBpbiBwZXJzb24gJiZcclxuICAgICAgICAgICAgICAgIHRoaXMud2VpZ2h0ID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgXCJoZWlnaHRcIiBpbiBwZXJzb24gJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgSU1DID0gdGhpcy53ZWlnaHQgLyB0aGlzLmhlaWdodCAqKiAyO1xyXG4gICAgICAgICAgICAgICAgaWYgKElNQyAmJiBJTUMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgTUxHID0gdGhpcy53ZWlnaHQgLSB0aGlzLndlaWdodCAqIChJTUMgLyAxMDApID8/IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKElNQyA8IDE4LjUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImFiYWl4b1wiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAxOC41ICYmIElNQyA8IDI1LjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImV1dHJvZmljb1wiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAyNS4wICYmIElNQyA8IDMwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJzb2JyZXBlc29cIiwgSU1DLCBNTEddO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChJTUMgPj0gMzAgJiYgSU1DIDwgMzUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9iZXNvMVwiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAzNSAmJiBJTUMgPCA0MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wib2Jlc28yXCIsIElNQywgTUxHXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoSU1DID4gNDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9iZXNvM1wiLCBJTUMsIE1MR107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gY2xhc3NpZmljYW5kbyBJTUMuIFZhbG9yIG9idGlkbzogJHtJTUMgPz8gMH07IFZhbG9yZXMgcG9zc8OtdmVpcyBkZXZlbSBzZXIgcG9zaXRpdm9zYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIGNhbGN1bGFuZG8gSU1DLiBWYWxvcmVzIHVzYWRvczogUGVzbyAke3RoaXMud2VpZ2h0ID8/IDB9IGUgQWx0dXJhICR7dGhpcy5oZWlnaHQgPz8gMH1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gZGFkb3MgZm9ybmVjaWRvcy4gRWxlbWVudG8gcGVzc29hOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn07IHdlaWdodCBwcmVzZW50ZTogJHtcIndlaWdodFwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICAgICAgUGVzbyBvYnRpZG86ICR7dGhpcy53ZWlnaHQgPz8gMH07XG4gICAgICAgICAgaGVpZ2h0IHByZXNlbnRlOiAke1wiaGVpZ2h0XCIgaW4gcGVyc29uID8/IGZhbHNlfTtcbiAgICAgICAgICBBbHR1cmEgb2J0aWRhOiAke3RoaXMuaGVpZ2h0ID8/IDB9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKElNQ0Vycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSU1DRXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBbXCJcIiwgMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2FsY1BHQyhwZXJzb24pIHtcclxuICAgICAgICBpZiAoXCJzdW1EQ3V0XCIgaW4gcGVyc29uICYmIHRoaXMuc3VtREN1dCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJzb24gaW5zdGFuY2VvZiBNYW4pIHtcclxuICAgICAgICAgICAgICAgIGxldCBEQyA9IDEuMTA5MzggLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwODI2NyAqIHRoaXMuc3VtREN1dCArXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDAwMDE2ICogdGhpcy5zdW1EQ3V0ICoqIDIgLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwMjU3NCAqIHBlcnNvbi5hZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoREMgPD0gMCB8fCBOdW1iZXIuaXNOYU4oREMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREMgPSAwLjAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IFBHQyA9IDQ5NSAvIERDIC0gNDUwO1xyXG4gICAgICAgICAgICAgICAgaWYgKFBHQyA8PSAwIHx8IE51bWJlci5pc05hTihQR0MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMC4wMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChQR0MgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBQR0MgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUEdDO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIFdvbWFuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgREMgPSAxLjA5OTQ5MjEgLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwOTkyOSAqIHRoaXMuc3VtREN1dCArXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDAwMDIzICogdGhpcy5zdW1EQ3V0ICoqIDIgLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwMTM5MiAqIHBlcnNvbi5hZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoREMgPD0gMCB8fCBOdW1iZXIuaXNOYU4oREMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREMgPSAwLjAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IFBHQyA9IDQ5NSAvIERDIC0gNDUwO1xyXG4gICAgICAgICAgICAgICAgaWYgKFBHQyA8PSAwIHx8IE51bWJlci5pc05hTihQR0MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMC4wMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChQR0MgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBQR0MgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUEdDO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIE5ldXRybykge1xyXG4gICAgICAgICAgICAgICAgbGV0IERDID0gMS4xMDQ0MzYwNSAtXHJcbiAgICAgICAgICAgICAgICAgICAgMC4wMDA5MDk4ICogdGhpcy5zdW1EQ3V0ICtcclxuICAgICAgICAgICAgICAgICAgICAwLjAwMDAwMTk1ICogdGhpcy5zdW1EQ3V0ICoqIDIgLVxyXG4gICAgICAgICAgICAgICAgICAgIDAuMDAwMTk4MyAqIHBlcnNvbi5hZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoREMgPD0gMCB8fCBOdW1iZXIuaXNOYU4oREMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgREMgPSAwLjAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IFBHQyA9IDQ5NSAvIERDIC0gNDUwO1xyXG4gICAgICAgICAgICAgICAgaWYgKFBHQyA8PSAwIHx8IE51bWJlci5pc05hTihQR0MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUEdDID0gMC4wMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChQR0MgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBQR0MgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUEdDO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgSW5zdMOibmNpYSBkZSBvYmpldG8gaW52w6FsaWRhLiBJbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGVyc29uKS5zbGljZSg4LCAtMSkgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYWRvIFByb3ByaWVkYWRlIHN1bURDdXQ6XG4gICAgICBFc3TDoSBwcmVzZW50ZTogJHtcInN1bURDdXRcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgVmFsb3Igb2J0aWRvOiAke3RoaXMuc3VtREN1dCA/PyAwfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYWxjVE1CKHBlcnNvbiwgSU1DLCBmYWN0b3JBdGxldGEsIE1MRykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChwZXJzb24gJiYgXCJhdHZMdmxcIiBpbiBwZXJzb24gJiYgdGhpcy5hdHZMdmwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF0dkx2bCA9PT0gXCJtdWl0b0ludGVuc29cIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChmYWN0b3JBdGxldGEgPT09IFwiTUxHXCIgfHwgZmFjdG9yQXRsZXRhID09PSBcIlBlc29cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFjdG9yQXRsZXRhID09PSBcIk1MR1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNTEcgJiYgTUxHID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgVE1CID0gMjUuOSAqIE1MRyArIDI4NDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJ0aW5zbGV5XCIsIFRNQl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIE1MRy5cbiAgICAgICAgICAgICAgVmFsb3Igb2J0aWRvOiAke01MRyA/PyAwfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZhY3RvckF0bGV0YSA9PT0gXCJQZXNvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwid2VpZ2h0XCIgaW4gcGVyc29uICYmIHRoaXMud2VpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgVE1CID0gMjQuOCAqIHRoaXMud2VpZ2h0ICsgMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1widGluc2xleVwiLCBUTUJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyB3ZWlnaHQuXG4gICAgICAgICAgICAgIFZhbG9yIG9idGlkbzogJHt0aGlzLndlaWdodCA/PyAwfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5hdHZMdmwgPT09IFwic2VkZW50YXJpb1wiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHZMdmwgPT09IFwibGV2ZVwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHZMdmwgPT09IFwibW9kZXJhZG9cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR2THZsID09PSBcImludGVuc29cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcIndlaWdodFwiIGluIHBlcnNvbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlaWdodCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiBpbiBwZXJzb24gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWdlXCIgaW4gcGVyc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJTUMgPCAyNS4wICYmIElNQyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZXJzb24gaW5zdGFuY2VvZiBNYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBUTUIgPSA2NiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgxMy44ICogdGhpcy53ZWlnaHQgKyA1LjAgKiB0aGlzLmhlaWdodCAtIDYuOCAqIHRoaXMuYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wiaGFycmlzQmVuZWRpY3RcIiwgVE1CXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIFdvbWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgVE1CID0gNjU1ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDkuNiAqIHRoaXMud2VpZ2h0ICsgMS45ICogdGhpcy5oZWlnaHQgLSA0LjcgKiB0aGlzLmFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImhhcnJpc0JlbmVkaWN0XCIsIFRNQl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwZXJzb24gaW5zdGFuY2VvZiBOZXV0cm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBUTUIgPSAzNjAuNSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgxMS43ICogdGhpcy53ZWlnaHQgKyAzLjQ1ICogdGhpcy5oZWlnaHQgLSA1Ljc1ICogdGhpcy5hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJoYXJyaXNCZW5lZGljdFwiLCBUTUJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhIGRlIFBlcnNvbi4gSW5zdMOibmNpYSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBlcnNvbikuc2xpY2UoOCwgLTEpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibnVsbFwifWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKElNQyA+PSAyNS4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVyc29uIGluc3RhbmNlb2YgTWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgVE1CID0gMTAgKiB0aGlzLndlaWdodCArIDYuMjUgKiB0aGlzLmhlaWdodCAtIDUuMCAqIHRoaXMuYWdlICsgNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wibWlmZmxpblN0SmVvclwiLCBUTUJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgV29tYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBUTUIgPSAxMCAqIHRoaXMud2VpZ2h0ICsgNi4yNSAqIHRoaXMuaGVpZ2h0IC0gNS4wICogdGhpcy5hZ2UgLSAxNjE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm1pZmZsaW5TdEplb3JcIiwgVE1CXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIE5ldXRybykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFRNQiA9IDEwICogdGhpcy53ZWlnaHQgKyA2LjI1ICogdGhpcy5oZWlnaHQgLSA1LjAgKiB0aGlzLmFnZSAtIDc4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJtaWZmbGluU3RKZW9yXCIsIFRNQl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgUGVyc29uLiBJbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKHBlcnNvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gSU1DLiBJTUMgb2J0aWRvOiAke0lNQyA/PyAwfTsgVmFsb3IgZGV2ZSBzZXIgbsO6bWVyaWNvLCBwb3NpdGl2byBlIGZsb2F0YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gcHJvcHJpZWRhZGVzIGRlIHBlcnNvbi5cbiAgICAgICAgICAgIHdlaWdodCBwcmVzZW50ZTogJHtcIndlaWdodFwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICAgICAgICBWYWxvciBkZSB3ZWlnaHQgb2J0aWRvOiAke3RoaXMud2VpZ2h0ID8/IDB9O1xuICAgICAgICAgICAgaGVpZ2h0IHByZXNlbnRlOiAke1wiaGVpZ2h0XCIgaW4gcGVyc29uID8/IGZhbHNlfTtcbiAgICAgICAgICAgIFZhbG9yIGRlIGhlaWdodCBvYnRpZG86ICR7dGhpcy5oZWlnaHQgPz8gMH07XG4gICAgICAgICAgICBhZ2UgcHJlc2VudGU6ICR7XCJhZ2VcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBhdHZMdmwgZS9vdSBmYWN0b3JBdGxldGEuXG4gICAgICAgICAgICBhdHZMdmwgb2J0aWRvOiAke3RoaXMuYXR2THZsID8/IFwibnVsbFwifVxuICAgICAgICAgICAgRmF0b3Igb2J0aWRvOiAke2ZhY3RvckF0bGV0YSA/PyBcIm51bGxcIn07IEZhdG9yZXMgdsOhbGlkb3M6IFwiTUxHXCIgfHwgXCJQZXNvXCJgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gcGVyc29uLlxuICAgICAgICBFbGVtZW50bzogJHtwZXJzb24gPz8gXCJudWxsXCJ9O1xuICAgICAgICBJbnN0w6JuY2lhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn07XG4gICAgICAgIGF0dkx2bCBwcmVzZW50ZTogJHtcImF0dkx2bFwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICAgIFZhbG9yIGRlIGF0dkx2bCBvYnRpZG86ICR7dGhpcy5hdHZMdmwgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKFRNQkVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoVE1CRXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBbXCJcIiwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2FsY0dFVChUTUIsIGZhY3RvckF0dkx2bCkge1xyXG4gICAgICAgIGlmIChUTUIgJiYgZmFjdG9yQXR2THZsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IEdFVCA9IFRNQiAqIGZhY3RvckF0dkx2bDtcclxuICAgICAgICAgICAgcmV0dXJuIEdFVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIGFyZ3VtZW50b3MuXG4gICAgICBUTUIgb2J0aWRvOiAke1RNQiA/PyAwfTtcbiAgICAgIGZhY3RvckF0dkx2bCBvYnRpZG86ICR7ZmFjdG9yQXR2THZsID8/IDB9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBjbG9uZVBlcnNvbihwZXJzb24pIHtcclxuICAgICAgICBpZiAocGVyc29uICYmIFwiZ2VuXCIgaW4gcGVyc29uKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGVyc29uLmdlbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1hc2N1bGlub1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTWFuKHBlcnNvbi5nZW4sIHBlcnNvbi5hZ2UsIHBlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHQsIHBlcnNvbi5zdW1EQ3V0LCBwZXJzb24uYXR2THZsKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJmZW1pbmlub1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV29tYW4ocGVyc29uLmdlbiwgcGVyc29uLmFnZSwgcGVyc29uLndlaWdodCwgcGVyc29uLmhlaWdodCwgcGVyc29uLnN1bURDdXQsIHBlcnNvbi5hdHZMdmwpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm5ldXRyb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgTmV1dHJvKHBlcnNvbi5nZW4sIHBlcnNvbi5hZ2UsIHBlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHQsIHBlcnNvbi5zdW1EQ3V0LCBwZXJzb24uYXR2THZsKTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gLmdlbiBkZSBwZXJzb24gcGFzc2FkYSBwYXJhIC5jbG9uZVBlcnNvbigpXG4gICAgICAgICAgLmdlbiBvYnRpZG86ICR7cGVyc29uPy5nZW4gPz8gXCJudWxsXCJ9LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyBwZXJzb24uXG4gICAgICBPYmpldG8gb2J0aWRvOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIn07XG4gICAgICAuZ2VuIHByZXNlbnRlOiAke1wiZ2VuXCIgaW4gcGVyc29uID8/IGZhbHNlfS5gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIE1hbiBleHRlbmRzIFBlcnNvbiB7XHJcbn1cclxuZXhwb3J0IGNsYXNzIFdvbWFuIGV4dGVuZHMgUGVyc29uIHtcclxufVxyXG5leHBvcnQgY2xhc3MgTmV1dHJvIGV4dGVuZHMgUGVyc29uIHtcclxufVxyXG4iLCIvLyBpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50Tm90Rm91bmQoZWxlbWVudCwgZWxlbWVudE5hbWUsIGxpbmUpIHtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQgPSBcIlVOREVGSU5FRCBFTEVNRU5UXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWVsZW1lbnROYW1lKSB7XHJcbiAgICAgICAgZWxlbWVudE5hbWUgPSBcIlVOTkFNRUQgRUxFTUVOVFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxyXG4gICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50IHx8XHJcbiAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgXG4gIEVMRU1FTlQgTk9UIEZPVU5ELCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYSBkZSAke2VsZW1lbnQ/LmlkIHx8IGVsZW1lbnROYW1lIHx8IFwiTlVMTFwifS5cbiAgSW5zdMOibmNpYSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgfHwgXCJOVUxMXCJ9O1xuICAudmFsdWUgb2J0aWRvOiAke2VsZW1lbnQ/LnZhbHVlID8/IFwiTlVMTFwifS5gKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFxuICBFTEVNRU5UIE5PVCBGT1VORCwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgJHtlbGVtZW50Py5pZCB8fCBlbGVtZW50TmFtZSB8fCBcIlVOREVGSU5FRCBJRCBPUiBOQU1FXCJ9LlxuICBJbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSB8fCBcIk5VTExcIn0uYCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlucHV0Tm90Rm91bmQoZWxlbWVudCwgZWxlbWVudE5hbWUsIGxpbmUpIHtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQgPSBcIlVOREVGSU5FRCBFTEVNRU5UXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWVsZW1lbnROYW1lKSB7XHJcbiAgICAgICAgZWxlbWVudE5hbWUgPSBcIlVOTkFNRUQgRUxFTUVOVFwiO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcihgSU5QVVQgTk9UIEZPVU5ELCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gJHtlbGVtZW50Py5pZCB8fCBlbGVtZW50TmFtZSB8fCBcIlVOREVGSU5FRCBJRCBPUiBOQU1FXCJ9LlxuICBFbGVtZW50byBvYnRpZG86ICR7ZWxlbWVudCA/PyBcIk5VTExcIn07XG4gIEluc3TDom5jaWEgb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpIHx8IFwiTlVMTFwifTtcbiAgVGlwbyBvYnRpZG8gKHbDoWxpZG8gc29tZW50ZSBwYXJhIDxpbnB1dD4pOiAke2VsZW1lbnQ/LnR5cGUgfHwgXCJOVUxMXCJ9O1xuICAudmFsdWUgb2J0aWRvOiAke2VsZW1lbnQ/LnZhbHVlIHx8IFwiTlVMTFwifTtcbiAgLmNoZWNrZWQgb2JpdG9kOiAke2VsZW1lbnQ/LmNoZWNrZWQgfHwgXCJOVUxMXCJ9LmApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50V2l0aEFycmF5RXJyb3IoY29udGV4dCwgYXJyYXksIGFycmF5TmFtZSwgZWxlbWVudCwgZWxlbWVudE5hbWUsIGxpbmUpIHtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQgPSBcIlVOREVGSU5FRCBFTEVNRU5UXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIWVsZW1lbnROYW1lKSB7XHJcbiAgICAgICAgZWxlbWVudE5hbWUgPSBcIlVOTkFNRUQgRUxFTUVOVFwiO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcihgRUxFTUVOVCBXSVRIIEFSUkFZIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gJHtjb250ZXh0fS5cbiAgJHtlbGVtZW50TmFtZSA/PyBcIlVOTkFNRUQgRUxFTUVOVFwifSBvYnRpZG86ICR7SlNPTi5zdHJpbmdpZnkoYXJyYXkpID8/IFwiTlVMTFwifTtcbiAgSW5zdMOibmNpYSBkZSAke2FycmF5TmFtZSA/PyBcIlVOTkFNRUQgQVJSQVlcIn0gb2J0aWRvOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifS5gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudFdpdGhPYmplY3RFcnJvcihjb250ZXh0LCBvYmplY3QsIGVsZW1lbnQsIGVsZW1lbnROYW1lLCBsaW5lKSB7XHJcbiAgICBpZiAoIWVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50ID0gXCJVTkRFRklORUQgRUxFTUVOVFwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCFlbGVtZW50TmFtZSkge1xyXG4gICAgICAgIGVsZW1lbnROYW1lID0gXCJVTk5BTUVEIEVMRU1FTlRcIjtcclxuICAgIH1cclxuICAgIGNvbnNvbGUuZXJyb3IoYEVMRU1FTlQgV0lUSCBPQkpFQ1QgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICAgIEVycm8gJHtjb250ZXh0ID8/IFwiVW5kZWZpbmVkIENvbnRleHRcIn0uIEVsZW1lbnRvOiAke0pTT04uc3RyaW5naWZ5KG9iamVjdCl9OyBpbnN0w6JuY2lhOiAke29iamVjdD8uY29uc3RydWN0b3IubmFtZSA/PyBcIk5VTExcIn1cbiAgICAke2VsZW1lbnROYW1lID8/IFwiVU5OQU1FRCBFTEVNRU5UXCJ9OiBpbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIn1gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudE5vdFBvcHVsYXRlZChhcnJheSwgYXJyYXlOYW1lLCBsaW5lKSB7XHJcbiAgICBpZiAoIWFycmF5KSB7XHJcbiAgICAgICAgYXJyYXkgPSBcIlVuZGVmaW5lZCBBcnJheVwiO1xyXG4gICAgfVxyXG4gICAgaWYgKCFhcnJheU5hbWUpIHtcclxuICAgICAgICBhcnJheU5hbWUgPSBcIlVOTkFNRUQgQVJSQVlcIjtcclxuICAgIH1cclxuICAgIGNvbnNvbGUuZXJyb3IoYEVMRU1FTlQgUE9QVUxBVElPTiBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gdmFsaWRhbmRvICR7YXJyYXlOYW1lIHx8IFwiTlVMTFwifS5cbiAgQXJyYXk6ICR7QXJyYXkuaXNBcnJheShhcnJheSl9O1xuICBMaXN0IG91IENvbGxlY3Rpb246ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycmF5KT8uc2xpY2UoOCwgLTEpIHx8IFwiTlVMTFwifTtcbiAgTGVuZ3RoIG9idGlkYTogJHthcnJheT8ubGVuZ3RoIHx8IFwiMFwifTtcbiAgU3RyaW5naWZpY2HDp8OjbzogJHtKU09OLnN0cmluZ2lmeShhcnJheSkgPz8gXCJOVUxMXCJ9YCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChsaW5lLCBjb250ZXh0LCAuLi5lbGVtZW50cykge1xyXG4gICAgaWYgKCFjb250ZXh0IHx8IGNvbnRleHQgPT09IFwiXCIpIHtcclxuICAgICAgICBjb250ZXh0ID0gXCJVbmRlZmluZWQgQ29udGV4dFwiO1xyXG4gICAgfVxyXG4gICAgbGV0IGVycm9yTWVzc2FnZSA9IGBNVUxUSVBMRSBFTEVNRU5UUyBOT1QgRk9VTkQsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyAke2NvbnRleHQgfHwgXCJVbmRlZmluZWQgRnVuY3Rpb24gTmFtZVwifS5gO1xyXG4gICAgY29uc3QgbWFwcGVkTnVsbEVsZW1lbnRzID0gZWxlbWVudHMubWFwKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCA/IFwiTlVMTFwiIDogZWxlbWVudCk7XHJcbiAgICBtYXBwZWROdWxsRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxyXG4gICAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgKGVsZW1lbnQudHlwZSA9PT0gXCJyYWRpb1wiIHx8IGVsZW1lbnQudHlwZSA9PT0gXCJjaGVja2JveFwiKSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0w6JuY2lhIGRlICR7ZWxlbWVudC5pZCB8fCBcIk5VTExcIn0gb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifTtcXG5cbiAgICAgICAgLmNoZWNrZWQgb2J0aWRvOiAke2VsZW1lbnQ/LmNoZWNrZWQgfHwgXCJOVUxMXCJ9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdMOibmNpYSBkZSAke2VsZW1lbnQuaWQgfHwgXCJOVUxMXCJ9IG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIn07XFxuXG4gICAgICAgIC52YWx1ZSBvYnRpZG86ICR7ZWxlbWVudD8udmFsdWUgfHwgXCJOVUxMXCJ9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0w6JuY2lhIGRlICR7ZWxlbWVudC5pZCB8fCBcIk5VTExcIn0gb2J0aWRhOiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwifTtcXG5gO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc29sZS5lcnJvcihlcnJvck1lc3NhZ2UpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50c05vdEZvdW5kRnVuY3Rpb24obGluZSwgZnVuY05hbWUsIC4uLmVsZW1lbnRzKSB7XHJcbiAgICBsZXQgZXJyb3JNZXNzYWdlID0gYEVMRU1FTlRTIE5PVCBGT1VORCBGT1IgRlVOQ1RJT04sIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhIG9idGlkYSBwYXJhICR7ZnVuY05hbWUgfHwgXCJOVUxMXCJ9YDtcclxuICAgIGNvbnN0IG1hcHBlZE51bGxFbGVtZW50cyA9IGVsZW1lbnRzLm1hcCgoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQgPyBcIk5VTExcIiA6IGVsZW1lbnQpO1xyXG4gICAgbWFwcGVkTnVsbEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgIChlbGVtZW50LnR5cGUgPT09IFwicmFkaW9cIiB8fCBlbGVtZW50LnR5cGUgPT09IFwiY2hlY2tib3hcIikpIHtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdMOibmNpYSBkZSAke2VsZW1lbnQuaWQgfHwgXCJOVUxMXCJ9IG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIn07XFxuXG4gICAgICAgIC5jaGVja2VkIG9idGlkbzogJHtlbGVtZW50Py5jaGVja2VkIHx8IFwiTlVMTFwifWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgKz0gYEluc3TDom5jaWEgZGUgJHtlbGVtZW50LmlkIHx8IFwiTlVMTFwifSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJ9O1xcblxuICAgICAgICAudmFsdWUgb2J0aWRvOiAke2VsZW1lbnQ/LnZhbHVlIHx8IFwiTlVMTFwifWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdMOibmNpYSBkZSAke2VsZW1lbnQ/LmlkIHx8IFwiTlVMTFwifSBvYnRpZGE6ICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJ9O1xcbmA7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1heE51bWJlckVycm9yKHVudmFsaWROdW1iZXIsIHRpdGxlLCBsaW5lKSB7XHJcbiAgICBpZiAoIXVudmFsaWROdW1iZXIpIHtcclxuICAgICAgICB1bnZhbGlkTnVtYmVyID0gXCIwXCI7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHVudmFsaWROdW1iZXIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICB1bnZhbGlkTnVtYmVyID0gdW52YWxpZE51bWJlci50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcihgTUFYIE5VTUJFUiBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIE7Dum1lcm8gZGUgJHt0aXRsZSB8fCBcIlVuZGVmaW5lZCBUaXRsZVwifSBpbnbDoWxpZG9zLlxuICBOw7ptZXJvIG3DoXhpbW8gb2J0aWRvOiAke3BhcnNlSW50KHVudmFsaWROdW1iZXIsIDEwKSB8fCAwfWApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdFcnJvcihjb250ZXh0LCB0ZXh0LCBsaW5lKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBTVFJJTkcgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvICR7Y29udGV4dH0uXG4gIFZhbG9yIG9idGlkbzogJHt0ZXh0ID8/IFwiTlVMTFwifWApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRjaEVycm9yKGNvbnRleHQsIGVsZW1lbnQsIHRleHQsIGxpbmUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYE1BVENIIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gJHtjb250ZXh0IHx8IFwiVW5kZWZpbmVkIENvbnRleHRcIn0uXG4gIEVsZW1lbnRvIG9idGlkbzogJHtlbGVtZW50IHx8IFwiVU5ERUZJTkVEIEVMRU1FTlRcIn07XG4gIFTDrXR1bG8gb2J0aWRvOiAke3RleHQgfHwgXCJVbmRlZmluZWQgVGl0bGVcIn0uYCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHR5cGVFcnJvcihjb250ZXh0LCBlbGVtZW50LCBhY2NlcHRlZFR5cGUsIGxpbmUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYFRZUEUgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBUaXBvIHByaW1pdGl2byBvYnRpZG8gcGFyYSAke2NvbnRleHQgfHwgXCJVbmRlZmluZWQgQ29udGV4dFwifSBpbmNvcnJldG8uXG4gIFRpcG8gb2J0aWRvOiAke3R5cGVvZiBlbGVtZW50ID8/IFwiVW5kZWZpbmVkIHR5cGVvZlwifTtcbiAgVGlwbyBhY2VpdG86ICR7YWNjZXB0ZWRUeXBlIHx8IFwiVW5kZWZpbmVkIEFjY2VwdGVkIFR5cGVcIn1gKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0RXJyb3IoY29udGV4dCwgb2JqZWN0LCBvYmplY3ROYW1lLCBtYXhQcm9wZXJ0aWVzTnVtYmVyLCBsaW5lKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBPQkpFQ1QgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyAke29iamVjdE5hbWUgPz8gXCJVTkRFRklORUQgT0JKRUNUIE5BTUVcIn0gcGFyYSAke2NvbnRleHQgfHwgXCJVbmRlZmluZWQgQ29udGV4dFwifS5cbiAgT2JqZWN0byBvYnRpZG86ICR7SlNPTi5zdHJpbmdpZnkob2JqZWN0KSA/PyBcIlVuZGVmaW5lZCBPYmplY3RcIn07XG4gIE7Dum1lcm8gb2J0aWRvIGRlIHByb3ByaWVkYWRlczogJHtPYmplY3Qua2V5cy5sZW5ndGggPz8gMH07IE7Dum1lcm8gYWNlaXRvOiAke21heFByb3BlcnRpZXNOdW1iZXIgPz8gMH1gKTtcclxufVxyXG4iLCIvL25lc3NlIGZpbGUgZXN0w6NvIHByZXNlbnRlcyBwcmluY2lwYWxtZW50ZSBhcyBmdW7Dp8O1ZXMgZGUgbWFuaXB1bGHDp8OjbyBkaW7Dom1pY2EgZGUgdGV4dG8gZSBsYXlvdXRcclxuaW1wb3J0ICogYXMgR2xvYmFsTW9kZWwgZnJvbSBcIi4vZ01vZGVsXCI7XHJcbmltcG9ydCB7IEpTT05TdG9yYWdlciwgSlNPTlRpdGxlU3RvcmFnZXIgfSBmcm9tIFwiLi9jbGFzc2VzXCI7XHJcbmltcG9ydCAqIGFzIEVycm9ySGFuZGxlciBmcm9tIFwiLi9lcnJvckhhbmRsZXJcIjtcclxuLy8gaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuY29uc3QgbWFwSWRzVGl0bGVzID0ge1xyXG4gICAgZmlyc3ROYW1lSWQ6IFwiUHJpbWVpcm9fTm9tZVwiLFxyXG4gICAgYWRkaXRpb25hbE5hbWVJZDogXCJTb2JyZW5vbWVfZG9fTWVpb1wiLFxyXG4gICAgZmFtaWx5TmFtZUlkOiBcIsOabHRpbW9fU29icmVub21lXCIsXHJcbiAgICBzb2NpYWxOYW1lSWQ6IFwiTm9tZV9Tb2NpYWxcIixcclxuICAgIHRlbEFyZWFDb2RlSWQ6IFwiREREXCIsXHJcbiAgICB0ZWxJZDogXCJUZWxlZm9uZVwiLFxyXG4gICAgdGVsQ291bnRyeUNvZGVJZDogXCJTZV9lc3RyYW5nZWlybyxfY8OzZGlnb19kb19QYcOtc1wiLFxyXG4gICAgdGVsMkFyZWFDb2RlSWQ6IFwiREREX0RvX1RlbGVmb25lX1NlY3VuZMOhcmlvXCIsXHJcbiAgICB0ZWwySWQ6IFwiVGVsZWZvbmVfU2VjdW5kw6FyaW9cIixcclxuICAgIHRlbDJDb3VudHJ5Q29kZUlkOiBcIlNlX2VzdHJhbmdlaXJvKHNlY3VuZMOhcmlvKSxfY8OzZGlnb19kb19QYcOtc1wiLFxyXG4gICAgZW1haWwxSWQ6IFwiRW1haWxcIixcclxuICAgIGVtYWlsMklkOiBcIkVtYWlsX1NlY3VuZMOhcmlvXCIsXHJcbiAgICBkYXRlQWdlSWQ6IFwiSWRhZGVcIixcclxuICAgIGdlbmlkOiBcIkfDqm5lcm9cIixcclxuICAgIGdlbkJpcnRoUmVsSWQ6IFwiSWRlbnRpZGFkZV9lbV9yZWxhw6fDo29fYW9fZ8OqbmVyb19kZXNpZ25hZG9fbmFfbmFzY2Vuw6dhXCIsXHJcbiAgICBnZW5UcmFuc0lkOiBcIkVzdMOhZ2lvX2RhX1RyYW5zacOnw6NvX0hvcm1vbmFsXCIsXHJcbiAgICBnZW5GaXNBbGluSWQ6IFwiQWxpbmhhbWVudG9fZGVfY2FyYWN0ZXLDrXN0aWNhc19mw61zaWNhc19wcmVkb21pbmFudGVcIixcclxufTtcclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNpbXBsZVByb3BlcnR5KGVsZW1lbnQpIHtcclxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGlmIChlbGVtZW50LnR5cGUgPT09IFwicmFkaW9cIiB8fCBlbGVtZW50LnR5cGUgPT09IFwiY2hlY2tib3hcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5jaGVja2VkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGVsZW1lbnQudHlwZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlRmxvYXQoZWxlbWVudC52YWx1ZS5yZXBsYWNlQWxsKC9bXjAtOS4sKy1dL2csIFwiXCIpKSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgZWxlbWVudC52YWx1ZSByZXRvcm5hZG8gY29tbyBOYU4sIHJldmVydGlkbyBwYXJhIDAuYCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGVsZW1lbnQudmFsdWUucmVwbGFjZUFsbCgvW14wLTkuLCstXS9nLCBcIlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZWxlbWVudC50eXBlID09PSBcInRleHRcIiB8fCBlbGVtZW50LnR5cGUgPT09IFwiZGF0ZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyB0eXBlIGRlIElucHV0IHBhcmEgYXR1YWxpemHDp8OjbyBkZSBwcm9wcmllZGFkZSBkZSBwZXJzb24uXG4gICAgICBUaXBvIG9idGlkbzogJHtlbGVtZW50Py50eXBlID8/IFwibnVsbFwifWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxyXG4gICAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIEVsZW1lbnQgcGFyYSBhdHVhbGl6YcOnw6NvIGRlIHByb3ByaWVkYWRlIGRlIHBlcnNvbi5cbiAgICBJbnN0w6JuY2lhIG9iaXRkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCkuc2xpY2UoOCwgLTEpID8/IFwibnVsbFwifWApO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjdXJzb3JDaGVja1RpbWVyKGN1cnNvclBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICBpZiAoc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5mb2N1c05vZGUgIT09IG51bGwpIHtcclxuICAgICAgICBjdXJzb3JQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApPy5zdGFydE9mZnNldDtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnNvclBvc2l0aW9uO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEpTT05EZXNjKGlucHV0cykge1xyXG4gICAgY29uc3QgdGl0bGVFbGVtZW50cyA9IFtdO1xyXG4gICAgY29uc3QgY2xvc2VzdFZhbGlkRWxlbWVudHMgPSBbXTtcclxuICAgIGNvbnN0IGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzID0gW107XHJcbiAgICBjb25zdCBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzID0gW107XHJcbiAgICBjb25zdCBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzSWRzID0gW107XHJcbiAgICBjb25zdCBpbnBWYWx1ZXMgPSBbXTtcclxuICAgIGNvbnN0IGlucElkcyA9IFtdO1xyXG4gICAgY29uc3QgSlNPTklucHNTdG9yZURlc2NyaXB0b3JzID0gW107XHJcbiAgICBjb25zdCBKU09OVGl0bGVzU3RvcmVEZXNjcmlwdG9ycyA9IFtdO1xyXG4gICAgbGV0IEpTT05JbnBzU3RvcmUgPSBbXTtcclxuICAgIGxldCBKU09OVGl0bGVzU3RvcmUgPSBbXTtcclxuICAgIGxldCB0aXRsZUFjYyA9IDA7XHJcbiAgICBsZXQgbnVsbFRpdGxlQWNjID0gMDtcclxuICAgIC8vZGV0ZXJtaW5hw6fDo28gZG8gbsO6bWVybyBkZSBpbnB1dHMgZGUgaWRlbnRpZmljYcOnw6NvIGN1am9zIHTDrXR1bG9zIHPDo28gZGUgaW50ZXJlc3NlIGUgY29uc3RydcOnw6NvIGRlIHN1YmFycmF5IHBhcmEgZXN0ZXNcclxuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgaW5wdXRzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgaWYgKGlucHV0c1trXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wSWRlbnRpZlwiKSkge1xyXG4gICAgICAgICAgICB0aXRsZUVsZW1lbnRzLnB1c2goaW5wdXRzW2tdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2xvb3AgcGFyYSBjb25zdHJ1w6fDo28gZG9zIGFycmF5cyBpbmljaWFzIGRlIGlkcyBlIHZhbHVlc1xyXG4gICAgZm9yIChsZXQgeiA9IDA7IHogPCBpbnB1dHMubGVuZ3RoOyB6KyspIHtcclxuICAgICAgICBpZiAoaW5wdXRzW3pdIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRzW3pdPy50eXBlID09PSBcInJhZGlvXCIgfHxcclxuICAgICAgICAgICAgICAgIGlucHV0c1t6XT8udHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIGlucFZhbHVlcy5wdXNoKGlucHV0c1t6XT8uY2hlY2tlZC50b1N0cmluZygpID8/IFwiZmFsc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRzW3pdLmlkID09PSBcImNvbmZybUxvY0lkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnBJZHMucHVzaChcImNvbmZpcm1Mb2NcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlucFZhbHVlcy5wdXNoKGlucHV0c1t6XT8udmFsdWUgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlucHV0c1t6XSBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHxcclxuICAgICAgICAgICAgaW5wdXRzW3pdIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaW5wSWRzLnB1c2goaW5wdXRzW3pdPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgIGlucFZhbHVlcy5wdXNoKGlucHV0c1t6XT8udmFsdWUgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbnB1dHNbel0/LmNvbnRlbnRFZGl0YWJsZSA9PT0gXCJ0cnVlXCIgfHxcclxuICAgICAgICAgICAgaW5wdXRzW3pdPy5pZCA9PT0gXCJjaXRlTmFtZUlkXCIpIHtcclxuICAgICAgICAgICAgaW5wSWRzLnB1c2goaW5wdXRzW3pdPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgIGlucFZhbHVlcy5wdXNoKGlucHV0c1t6XT8udGV4dENvbnRlbnQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gZWxlbWVudG8uIEVsZW1lbnRvICR7aW5wdXRzW3pdID8/IFwibnVsbFwifTsgaW5zdMOibmNpYSAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgIC5jYWxsKGlucHV0c1t6XSlcclxuICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSl9OyBpZCAke2lucHV0c1t6XT8uaWQgPz8gXCJudWxsXCJ9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9sb29wIHBhcmEgYWp1c3RlIGRvcyBlbGVtZW50b3MgZG9zIGFycmF5cyBkZSBpbnB1dHMgZSBjb25zdHJ1w6fDo28gZG9zIHN0b3JhZ2VyIGRlIGlucHV0c1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbnB1dHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAvL2ZpbHRyYWdlbSBkZSB0aXBvcyBwcmltaXRpdm9zIGRlIHZhbHVlc1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wVmFsdWVzW2pdID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnBWYWx1ZXNbal0gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGlucFZhbHVlc1tqXSA9IGlucFZhbHVlc1tqXS5yZXBsYWNlKFwiXCIsIFwibnVsbFwiKSA/PyBcIm51bGxcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaW5wVmFsdWVzW2pdID0gaW5wVmFsdWVzW2pdPy50b1N0cmluZygpID8/IFwibnVsbFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2F2YWxpYWRvciBkZSBpZHMgbnVsYXNcclxuICAgICAgICBpZiAoaW5wSWRzW2pdPy5tYXRjaCgvbnVsbC9nKSB8fFxyXG4gICAgICAgICAgICBpbnBJZHNbal0gPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICBpbnBJZHNbal0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBJZCBudWxsIGRldGVjdGFkYS4gVMOtdHVsbyByZWxhdGl2bzogJHtjbG9zZXN0VmFsaWRFbGVtZW50c1tqXSA/PyBcIm51bGxcIn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jcmlhw6fDo28gZG8gc3RvcmFnZXJcclxuICAgICAgICBjb25zdCBuSlNPTklucFN0b3JhZ2VyID0gbmV3IEpTT05TdG9yYWdlcihpbnBJZHNbal0sIGlucFZhbHVlc1tqXSk7XHJcbiAgICAgICAgLy9jcmlhw6fDo28gZGEgc3RvcmVcclxuICAgICAgICBpZiAobkpTT05JbnBTdG9yYWdlcikge1xyXG4gICAgICAgICAgICBKU09OSW5wc1N0b3JlLnB1c2gobkpTT05JbnBTdG9yYWdlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBuSlNPTklucFN0b3JhZ2VyLnNob3dBbGxJbmZvOyAvL1RPRE8gRVhQT1NJw4fDg08gREUgREFET1MgU09NRU5URSBQQVJBIEZJTkFMSURBREVTIERFIFRFU1RFLCBQT0lTIFBST1BSSUVEQURFUyBQUklWQURBUyBOw4NPIFPDg08gRU5VTUVSw4FWRUlTXHJcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlRGVzY3JpcHRvcnMucHVzaChkZXNjcmlwdG9yLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBkZXNjcmlwdG9yIHBhcmEgaW5zdMOibmNpYSAke2p9IGRlIEpTT05TdG9yYWdlcmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgJHtqfSBkZSBKU09OU3RvcmFnZXJgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2xvb3AgcGFyYSBleHRyYWlyIHTDrXR1bG9zL2xhYmVscyBkZSBpbnRlcmVzc2VcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGl0bGVFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRpdGxlQWNjKys7XHJcbiAgICAgICAgLy9sb29wIHBhcmEgbcO6bHRpcGxhcyB0ZW50YXRpdmFzIGRlIGxvY2FsaXphw6fDo28gZG8gdGV4dG8gZGUgaW50ZXJlc3NlXHJcbiAgICAgICAgbGV0IGNsb3Nlc3RQYXJlbnQgPSB0aXRsZUVsZW1lbnRzW2ldPy5jbG9zZXN0KFwic3BhblwiKSB8fCB0aXRsZUVsZW1lbnRzW2ldPy5jbG9zZXN0KFwibGFiZWxcIik7XHJcbiAgICAgICAgaWYgKGNsb3Nlc3RQYXJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IGxvb3BBY2MgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAobG9vcEFjYyA8IDEwICYmIGNsb3Nlc3RQYXJlbnQudGV4dENvbnRlbnQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vbG9vcCBwYXJhIGVzY2FsYWRhIGdlbmVhbMOzZ2ljYSBhdMOpIGVuY29udHJhciBwYXJlbnQgZGUgaW50ZXJlc3NlIG91IGRlc2lzdGlyIGFww7NzIDEwIGl0ZXJhw6fDtWVzXHJcbiAgICAgICAgICAgICAgICBsb29wQWNjKys7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50ID1cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py5jbG9zZXN0KFwic3BhblwiKSB8fCBjbG9zZXN0UGFyZW50Py5jbG9zZXN0KFwibGFiZWxcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiXCIgfHwgbG9vcEFjYyA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgPT09IFwiU2ltXCIgfHwgLy9lbnRyYWRhIGVtIGxvb3AgcGFyYSBlbGltaW5hciBwYXJlbnRzIGNvbSB0ZXh0IHNpbS9uw6NvIChuw6NvIGluZm9ybWF0aXZvKSBvdSBkZXNpc3RpciBhcMOzcyAxMCBpdGVyYcOnw7Vlc1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ID09PSBcIk7Do29cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvb2xlYW5QYXJlbnRDb3B5ID0gY2xvc2VzdFBhcmVudDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzLnB1c2goYm9vbGVhblBhcmVudENvcHk/LnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/IGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzSWRzLnB1c2goYm9vbGVhblBhcmVudENvcHkuaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChsb29wQWNjIDwgMTAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xvc2VzdFBhcmVudC50ZXh0Q29udGVudCA9PT0gXCJTaW1cIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudC50ZXh0Q29udGVudCA9PT0gXCJOw6NvXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvb3BBY2MrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py5jbG9zZXN0KFwic3BhblwiKSB8fCBjbG9zZXN0UGFyZW50Py5jbG9zZXN0KFwibGFiZWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY2xvc2VzdFBhcmVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiU2ltXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ICE9PSBcIk7Do29cIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiXCIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb29wQWNjID4gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKGNsb3Nlc3RQYXJlbnQ/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy50eXBlID09PSBcInJhZGlvXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nIGluc3RhbmNlb2ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIVE1MTGFiZWxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc/LmNsYXNzTGlzdC5jb250YWlucyhcImJvb2xPcFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkLm1hdGNoKC9ZZXMvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2godGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKC0zKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bGxcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGl0bGVFbGVtZW50c1tpXT8uaWQubWF0Y2goL05vLykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkPy5zbGljZSgtMikgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJudWxsXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhc28gaW5lc3BlcmFkbyBkZSBib29sT3AgUmFkaW8gKyBMYWJlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodGl0bGVFbGVtZW50c1tpXSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uYW1lID09PSBcIm5pdmVsRnVtb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZD8uc2xpY2UoMCwgMSk/LnRvVXBwZXJDYXNlKCkgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJudWxsXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKDEsIDQpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LmlkPy5zbGljZSg0LCA4KSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZUVsZW1lbnRzW2ldPy5jbGFzc0xpc3QuY29udGFpbnMoXCJvcEZ1bVN1YnNcIikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nPy50ZXh0Q29udGVudCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc/LnRleHRDb250ZW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wQW50TWVkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChcIlRyYXRhbWVudG9fTcOpZGljb1wiICsgXCJfXCIgKyB0aXRsZUVsZW1lbnRzW2ldPy5pZC5zbGljZSgtMSkgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkID09PSBcImNpdGVOYW1lSWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFwiQXNzaW5hdHVyYV9Vc3XDoXJpb1wiID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdFBhcmVudD8uaWQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9vYnRlbsOnw6NvIGRlIGlkcyBkb3MgJ3BhcmVudHMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29ycmXDp8OjbyBkZSBpZCBkZSBpbnRlcmVzc2UgY2FzbyBhIGRvIHBhcmVudCBuw6NvIGVzdGVqYSBwcmVzZW50ZSAoYXRlbsOnw6NvOiBkZXNhc3NvY2lhIGlkIGUgdGV4dCBkZSBpbnRlcmVzc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2goY2xvc2VzdFBhcmVudD8uaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjbG9zZXN0UGFyZW50LmlkID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRFU2libGluZyA9IHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRFU2libGluZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEVTaWJsaW5nIGluc3RhbmNlb2YgSFRNTExhYmVsRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEVTaWJsaW5nLnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKG5leHRFU2libGluZy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c0VTaWJsaW5nID0gdGl0bGVFbGVtZW50c1tpXT8ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c0VTaWJsaW5nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNFU2libGluZyBpbnN0YW5jZW9mIEhUTUxMYWJlbEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0VTaWJsaW5nLnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaChwcmV2aW91c0VTaWJsaW5nLmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ucGxhY2Vob2xkZXIgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgTmVuaHVtYSBpZCBwcsOzeGltYSB2w6FsaWRhIHJldG9ybmFkYSBwYXJhIG8gaW5wdXQgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIGFvIGxvY2FsaXphciB0ZXh0Q29udGVudCBkZSBwYXJlbnRgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy9zZSBmYWxoYSBlbSBwYXJlbnRzLCBwcm9jdXJhIGVtIHNpYmxpbmdzIDxsYWJlbD4gb3UgZW0gcGxhY2Vob2xkZXJzIGRlIHRleHRhcmVhc1xyXG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1NpYmxpbmcgPSB0aXRsZUVsZW1lbnRzW2ldPy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAocHJldmlvdXNTaWJsaW5nIGluc3RhbmNlb2YgSFRNTExhYmVsRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHByZXZpb3VzU2libGluZy50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cclxuICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/IGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2gocHJldmlvdXNTaWJsaW5nLmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LnBsYWNlaG9sZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5wbGFjZWhvbGRlciA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgTlVMTCAke3RpdGxlRWxlbWVudHNbaV0/LmlkID8/IGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkID8/IFwibnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8udHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcImZhbU9wXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwcGVyQ2FzZU1hdGNoID0gdGl0bGVFbGVtZW50c1tpXT8uaWQ/Lm1hdGNoKC9GYW0vZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cHBlckNhc2VNYXRjaCAmJiB0aXRsZUVsZW1lbnRzW2ldPy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBwZXJDYXNlSW5kZXggPSB0aXRsZUVsZW1lbnRzW2ldPy5pZC5pbmRleE9mKFwiRmFtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkSWQgPSB0aXRsZUVsZW1lbnRzW2ldPy5pZC5zbGljZSgwLCB1cHBlckNhc2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHNsaWNlZElkICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dFNpYmxpbmc/LnRleHRDb250ZW50Py5yZXBsYWNlQWxsKC9eW1xcc10rL2csIFwiXCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWB9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRTaWJsaW5nPy50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCgvXltcXHNdKy9nLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcIm9wSGVwXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXCJIZXBhdGl0ZV9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0U2libGluZz8udGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwoL15bXFxzXSsvZywgXCJcIikgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkICE9PSBcImNvbmZpcm1JZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/Lm5leHRTaWJsaW5nPy50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCgvXltcXHNdKy9nLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkID09PSBcImNvbmZpcm1JZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFwiQ29uY29yZG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGVFbGVtZW50c1tpXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BIQVNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5uZXh0U2libGluZz8udGV4dENvbnRlbnQ/LnRyaW0oKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBcIm51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0RVNpYmxpbmcgPSB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0RVNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0RVNpYmxpbmcudGV4dENvbnRlbnQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2gobmV4dEVTaWJsaW5nLnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7dGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaChuZXh0RVNpYmxpbmcuaWQgPz8gXCJudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBwYXJlbnRzLCBsYWJlbHMsIHBsYWNlaG9sZGVycyBlIHRleHRDb250ZW50LiBJZCBkbyBJbnB1dDogJHt0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBudWxsfTsgdGV4dENvbnRlbnQgJHt0aXRsZUVsZW1lbnRzW2ldPy50ZXh0Q29udGVudCA/PyBudWxsfTsgcGxhY2Vob2xkZXIgJHt0aXRsZUVsZW1lbnRzW2ldPy5wbGFjZWhvbGRlciA/PyBudWxsfTsgw5psdGltYSBJbnN0w6JuY2lhIGRlIFBhcmVudCBhdmFsaWFkYSAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChjbG9zZXN0UGFyZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSl9OyBJbnN0w6JuY2lhIGRlIFNpYmxpbmcgTGFiZWxzICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKHByZXZpb3VzU2libGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoOCwgLTEpfSAmJiAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChuZXh0RVNpYmxpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vbG9vcCBwYXJhIGFqdXN0ZSBkb3MgZWxlbWVudG9zIGRvcyBhcnJheXMgZGUgdGl0bGVzIGUgY29uc3RydcOnw6NvIGRvcyBzdG9yYWdlciBkZSB0aXRsZXNcclxuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgdGl0bGVFbGVtZW50cy5sZW5ndGg7IGwrKykge1xyXG4gICAgICAgIC8vY29ycmXDp8OjbyBkZSBtw7psdGlwbG9zIGVzcGHDp29zIGVtIGxhYmVscyBlIHRpdGxlc1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlU3BhY2VNYXRjaGVzID0gY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0/Lm1hdGNoKC9cXHNcXHMvKSA/PyBudWxsO1xyXG4gICAgICAgIGlmIChjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSAmJlxyXG4gICAgICAgICAgICBtdWx0aXBsZVNwYWNlTWF0Y2hlcyAmJlxyXG4gICAgICAgICAgICBtdWx0aXBsZVNwYWNlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwYWNlTWF0Y2hlc0FycmF5ID0gW107XHJcbiAgICAgICAgICAgIG11bHRpcGxlU3BhY2VNYXRjaGVzLmZvckVhY2goKG11bHRpcGxlU3BhY2VNYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVTcGFjZUluZGV4ID0gY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0/LmluZGV4T2YobXVsdGlwbGVTcGFjZU1hdGNoKSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgc3BhY2VNYXRjaGVzQXJyYXkucHVzaChtdWx0aXBsZVNwYWNlSW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCBzcGFjZU1hdGNoZXNBcnJheS5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gPVxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdPy5zbGljZSgwLCBzcGFjZU1hdGNoZXNBcnJheVttXSkudHJpbSgpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibnVsbFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYXZhbGlhZG9yIGRlIGxhYmVscyBlIHRpdGxlcyBudWxvc1xyXG4gICAgICAgIGlmIChjbG9zZXN0VmFsaWRFbGVtZW50c1tsXT8ubWF0Y2goL1tObl1bVXVdW0xsXVtMbF0vZykgfHxcclxuICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgaW5wVmFsdWUgPSBpbnB1dHNbbF0/LnZhbHVlIHx8IFwibnVsbFwiO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRzW2xdIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgKGlucHV0c1tsXT8udHlwZSA9PT0gXCJyYWRpb1wiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzW2xdPy50eXBlID09PSBcImNoZWNrYm94XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBpbnBWYWx1ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzW2xdPy5jaGVja2VkLnRvU3RyaW5nKCkgPz8gXCJmYWxzZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG51bGxUaXRsZUFjYysrO1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFTDrXR1bG8gbnVsbyBkZXRlY3RhZG86IE7Dum1lcm8gZGUgYWPDum11bG86ICR7bnVsbFRpdGxlQWNjfS5cbiAgICAgICAgICAgIFTDrXR1bG86ICR7Y2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gfHwgY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gfHwgXCJudWxsXCJ9O1xuICAgICAgICAgICAgaW5zdMOibmNpYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAuY2FsbChjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSlcclxuICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSkgPz8gXCJ1bmRlZmluZWRcIn07XG4gICAgICAgICAgICBJZCBkZSBpbnB1dCBwYXJlYWRhOiAke2lucHV0c1tsXT8uaWQgPz8gXCJudWxsXCJ9O1xuICAgICAgICAgICAgVmFsb3IgZGUgaW5wdXQgcGFyZWFkbyAke2lucFZhbHVlIHx8IFwibnVsbFwifWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NyaWHDp8OjbyBkbyBzdG9yYWdlclxyXG4gICAgICAgIGNvbnN0IG5KU09OVGl0bGVTdG9yYWdlciA9IG5ldyBKU09OVGl0bGVTdG9yYWdlcihjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSk7XHJcbiAgICAgICAgLy9jcmlhw6fDo28gZGEgc3RvcmVcclxuICAgICAgICBpZiAobkpTT05UaXRsZVN0b3JhZ2VyKSB7XHJcbiAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZS5wdXNoKG5KU09OVGl0bGVTdG9yYWdlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBuSlNPTlRpdGxlU3RvcmFnZXIuc2hvd0lucFRpdGxlOyAvL1RPRE8gRVhQT1NJw4fDg08gREUgREFET1MgU09NRU5URSBQQVJBIEZJTkFMSURBREVTIERFIFRFU1RFLCBQT0lTIFBST1BSSUVEQURFUyBQUklWQURBUyBOw4NPIFPDg08gRU5VTUVSw4FWRUlTXHJcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmVEZXNjcmlwdG9ycy5wdXNoKGRlc2NyaXB0b3IudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIGRlc2NyaXB0b3IgcGFyYSBpbnN0w6JuY2lhICR7bH0gZGUgSlNPTlN0b3JhZ2VyYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gaW5zdMOibmNpYSAke2x9IGRlIEpTT05TdG9yYWdlcmApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vZmlsdHJvIGUgdmFsaWRhw6fDo28gZGEgc3RvcmVcclxuICAgIGlmIChKU09OSW5wc1N0b3JlRGVzY3JpcHRvcnMubGVuZ3RoID09PSBKU09OSW5wc1N0b3JlLmxlbmd0aCAmJlxyXG4gICAgICAgIEpTT05UaXRsZXNTdG9yZURlc2NyaXB0b3JzLmxlbmd0aCA9PT0gSlNPTlRpdGxlc1N0b3JlLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcjFKU09OSW5wc1N0b3JlID0gSlNPTklucHNTdG9yZS5maWx0ZXIoKEpTT05FbCkgPT4gdHlwZW9mIEpTT05FbCA9PT0gXCJvYmplY3RcIik7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyMUpTT05UaXRsZXNTdG9yZSA9IEpTT05UaXRsZXNTdG9yZS5maWx0ZXIoKEpTT05FbCkgPT4gdHlwZW9mIEpTT05FbCA9PT0gXCJvYmplY3RcIik7XHJcbiAgICAgICAgaWYgKGZpbHRlcjFKU09OSW5wc1N0b3JlLmxlbmd0aCA9PT0gSlNPTklucHNTdG9yZS5sZW5ndGggJiZcclxuICAgICAgICAgICAgZmlsdGVyMUpTT05UaXRsZXNTdG9yZS5sZW5ndGggPT09IEpTT05UaXRsZXNTdG9yZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgSlNPTklucHNTdG9yZSA9IGZpbHRlcjFKU09OSW5wc1N0b3JlO1xyXG4gICAgICAgICAgICBKU09OVGl0bGVzU3RvcmUgPSBmaWx0ZXIxSlNPTlRpdGxlc1N0b3JlO1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXIySlNPTklucHNTdG9yZSA9IEpTT05JbnBzU3RvcmUuZmlsdGVyKChKU09ORWwpID0+IEpTT05FbCBpbnN0YW5jZW9mIEpTT05TdG9yYWdlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcjJKU09OVGl0bGVzU3RvcmUgPSBKU09OVGl0bGVzU3RvcmUuZmlsdGVyKChKU09ORWwpID0+IEpTT05FbCBpbnN0YW5jZW9mIEpTT05UaXRsZVN0b3JhZ2VyKTtcclxuICAgICAgICAgICAgaWYgKGZpbHRlcjJKU09OSW5wc1N0b3JlLmxlbmd0aCA9PT0gSlNPTklucHNTdG9yZS5sZW5ndGggJiZcclxuICAgICAgICAgICAgICAgIGZpbHRlcjFKU09OVGl0bGVzU3RvcmUubGVuZ3RoID09PSBKU09OVGl0bGVzU3RvcmUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlID0gZmlsdGVyMkpTT05JbnBzU3RvcmUuc29ydCgpO1xyXG4gICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlID0gZmlsdGVyMkpTT05UaXRsZXNTdG9yZS5zb3J0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQgPSBbXTtcclxuICAgICAgICAgICAgICAgIC8vc3RyaW5naWZpY2HDp8OjbyBkYXMgc3RvcmVzXHJcbiAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlLmZvckVhY2goKGZvcm1FbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsVmFsdWVzID0gZm9ybUVsLnNob3dBbGxJbmZvO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsVmFsdWVzU3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShlbFZhbHVlcyk7IC8vVE9ETyBEQURPUyBFWFBPU1RPIFNPTUVOVEUgUEFSQSBGSU5TIERFIFRFU1RFXHJcbiAgICAgICAgICAgICAgICAgICAgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkLnB1c2goZWxWYWx1ZXNTdHJpbmdpZmllZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZS5mb3JFYWNoKChmb3JtRWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbFZhbHVlcyA9IGZvcm1FbC5zaG93SW5wVGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxWYWx1ZXNTdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KGVsVmFsdWVzKTsgLy9UT0RPIERBRE9TIEVYUE9TVE8gU09NRU5URSBQQVJBIEZJTlMgREUgVEVTVEVcclxuICAgICAgICAgICAgICAgICAgICBKU09OVGl0bGVzU3RvcmVTdHJpbmdpZmllZC5wdXNoKGVsVmFsdWVzU3RyaW5naWZpZWQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQgPSBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQuc29ydCgpO1xyXG4gICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQgPSBKU09OVGl0bGVzU3RvcmVTdHJpbmdpZmllZC5zb3J0KCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbmNsdXPDo29cclxuICAgICAgICAgICAgICAgIGlmIChKU09OSW5wc1N0b3JlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OSW5wc1N0b3JlU3RyaW5naWZpZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT05UaXRsZXNTdG9yZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgXTsgLy9zdHJpbmdpZmllZCDDqSBhIHZlcnPDo28gdXNhZGEgY29tbyBEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGwsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBjbGFzc2VzIGRlIGVsZW1lbnRvcyBubyBKU09OU3RvcmUuIFxuICAgICAgICAgIE7Dum1lcm8gZGUgaW5zdMOibmNpYXMgb2J0aWRhcyBwYXJhIGlucHV0czogJHtmaWx0ZXIySlNPTklucHNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07IE7Dum1lcm8gZXNwZXJhZG86ICR7SlNPTklucHNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07XG4gICAgICAgICAgTsO6bWVybyBkZSBpbnN0w6JuY2lhcyBvYnRpZGFzIHBhcmEgdGl0bGVzOiAke2ZpbHRlcjJKU09OVGl0bGVzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9OyBOw7ptZXJvIGVzcGVyYWRvOiAke0pTT05UaXRsZXNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyB0aXBvcyBkZSBlbGVtZW50b3MgbmFzIEpTT05TdG9yZS4gXG4gICAgICAgIE7Dum1lcm8gZGUgb2JqZXRvcyBvYnRpZG9zIHBhcmEgaW5wdXRzOiAke2ZpbHRlcjFKU09OSW5wc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTsgTsO6bWVybyBlc3BlcmFkbzogJHtKU09OSW5wc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTtcbiAgICAgICAgTsO6bWVybyBkZSBvYmpldG9zIG9idGlkb3MgcGFyYSB0aXRsZXM6ICR7ZmlsdGVyMUpTT05UaXRsZXNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07IE7Dum1lcm8gZXNwZXJhZG86ICR7SlNPTlRpdGxlc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgTGVuZ3RoIGRlIEpTT04gU3RvcmUgRGVzY3JpcHRvcnMgaW52w6FsaWRhLiBcbiAgICAgIExlbmd0aCBvYnRpZGEgcGFyYSBpbnB1dHM6ICR7SlNPTklucHNTdG9yZURlc2NyaXB0b3JzLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTsgTGVuZ3RoIGVzcGVyYWRhOiAke0pTT05JbnBzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9O1xuICAgICAgTGVuZ3RoIG9idGlkYSBwYXJhIHRpdGxlczogJHtKU09OVGl0bGVzU3RvcmVEZXNjcmlwdG9ycy5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07IExlbmd0aCBlc3BlcmFkYTogJHtKU09OVGl0bGVzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9YCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUpTT05BbmNob3IoSlNPTkJ0biwgZm9ybUlucHNEZXNjcmlwdG9yKSB7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWRGb3JtRGVzY3JpcHRvciA9IGZvcm1hdEpTT05GaWxlKGZvcm1JbnBzRGVzY3JpcHRvcik7XHJcbiAgICBjb25zdCBKU09OQmxvYiA9IG5ldyBCbG9iKFtmb3JtYXR0ZWRGb3JtRGVzY3JpcHRvclsxXV0sIHtcclxuICAgICAgICB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgIH0pO1xyXG4gICAgY29uc3QgSlNPTkxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgIEpTT05MaW5rLmlkID0gXCJhbmNob3JKU09OXCI7XHJcbiAgICBKU09OTGluay5jbGFzc05hbWUgPSBKU09OQnRuLmNsYXNzTmFtZTtcclxuICAgIEpTT05MaW5rLnN0eWxlLndpZHRoID0gSlNPTkJ0bi5zdHlsZS53aWR0aDtcclxuICAgIEpTT05MaW5rLnN0eWxlLmhlaWdodCA9IEpTT05CdG4uc3R5bGUuaGVpZ2h0O1xyXG4gICAgSlNPTkxpbmsudGV4dENvbnRlbnQgPSBcIkJhaXhhciBKU09OXCI7XHJcbiAgICBKU09OTGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChKU09OQmxvYik7XHJcbiAgICBKU09OTGluay5kb3dubG9hZCA9IFwiZm9ybURhdGEuanNvblwiO1xyXG4gICAgSlNPTkJ0bi5yZXBsYWNlV2l0aChKU09OTGluayk7XHJcbiAgICByZXR1cm4gSlNPTkxpbms7XHJcbn1cclxuZnVuY3Rpb24gZm9ybWF0SlNPTkZpbGUoZm9ybUlucHNEZXNjcmlwdG9yKSB7XHJcbiAgICBsZXQgZm9ybWF0Rm9ybURlc2NJZHMgPSBge1xcbmA7XHJcbiAgICBsZXQgZm9ybWF0Rm9ybURlc2NUaXRsZXMgPSBgYDtcclxuICAgIGxldCBmb3JtYXRGb3JtRGVzY0lkc1JlYWQgPSBge1xcbmA7XHJcbiAgICBsZXQgZm9ybWF0Rm9ybURlc2NUaXRsZXNSZWFkID0gYHtcXG5gO1xyXG4gICAgbGV0IGxhYkFjYyA9IDE7XHJcbiAgICAvL2dlcmHDp8OjbyBkYXMgdW5pZGFkZXMgZm9ybWF0YWRhc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtSW5wc0Rlc2NyaXB0b3IubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBzZXBhcmF0aW9uTWF0Y2hlcyA9IGZvcm1JbnBzRGVzY3JpcHRvcltpXS5tYXRjaCgvXCIsL2cpO1xyXG4gICAgICAgIGlmIChzZXBhcmF0aW9uTWF0Y2hlcykge1xyXG4gICAgICAgICAgICAvLyBjb25zdCBmaXJzdFNlcEluZGV4ID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLmluZGV4T2YoXCIsXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWNvbmRTZXBJbmRleCA9IGZvcm1JbnBzRGVzY3JpcHRvcltpXS5pbmRleE9mKFwiLFwiLCBmb3JtSW5wc0Rlc2NyaXB0b3JbaV0uaW5kZXhPZihcIixcIikgKyAxKTtcclxuICAgICAgICAgICAgY29uc3QgbGFzdFNlcEluZGV4ID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLmxhc3RJbmRleE9mKHNlcGFyYXRpb25NYXRjaGVzWzBdKTtcclxuICAgICAgICAgICAgLy9mb3JtYXRhw6fDo28gZG9zIGlkcyBlIHZhbHVlcyBkb3MgaW5wdXRzXHJcbiAgICAgICAgICAgIGxldCBpbnBJZCA9IGZvcm1JbnBzRGVzY3JpcHRvcltpXS5zbGljZShzZWNvbmRTZXBJbmRleCArIDIsIGxhc3RTZXBJbmRleCArIDEpO1xyXG4gICAgICAgICAgICBsZXQgbG9vcEFjYyA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlIChpbnBJZC5tYXRjaCgvLC9nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWFJbmRleCA9IGlucElkLmluZGV4T2YoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgaW5wSWQgPSBpbnBJZC5zbGljZShjb21tYUluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlucElkLm1hdGNoKC8sL2cpIHx8IGxvb3BBY2MgPiA5OTkpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvb3BBY2MrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGZvcm1JbnBzRGVzY3JpcHRvcltpXS5zbGljZShsYXN0U2VwSW5kZXggKyAyLCAtMSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhYiA9IG1hcElkc1RpdGxlc1tpbnBJZC5yZXBsYWNlQWxsKC9cIi9nLCBcIlwiKV07XHJcbiAgICAgICAgICAgIGlmIChpID09IDg5KSB7XHJcbiAgICAgICAgICAgICAgICAvL2J1ZyBuw6NvIHJlc29sdmlkbyBhaW5kYVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpbnBJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlucElkID0gJ1wiY29uZmlybUxvY0lkXCInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29uc3RydcOnw6NvIGUgY29uY2F0ZW5hw6fDo28gZGFzIHVuaWRhZGVzIGZvcm1hdGFkYXNcclxuICAgICAgICAgICAgZm9ybWF0Rm9ybURlc2NJZHMgKz0gYFxcdCR7aW5wSWR9OiAke3ZhbHVlfSwgXFxuYDtcclxuICAgICAgICAgICAgZm9ybWF0Rm9ybURlc2NJZHNSZWFkICs9IGBcXHQke2xhYkFjY30uICR7aW5wSWR9OiAke3ZhbHVlfSwgXFxuYDsgLy92ZXJzw7VlcyBlbSBsaXN0YSBudW1lcmFkYSwgcGFyYSBsb2dzIGUgZW51bWVyYcOnw6NvIHBvc3RlcmlvclxyXG4gICAgICAgICAgICBsYWJBY2MrKztcclxuICAgICAgICAgICAgaWYgKGxhYiAmJiBsYWIgIT09IFwibnVsbFwiICYmIGxhYiAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0Rm9ybURlc2NUaXRsZXNSZWFkICs9IGBcXHQke2xhYkFjY30uICR7bGFifSBmb3IgJHtpbnBJZH06ICR7dmFsdWV9LCBcXG5gO1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0Rm9ybURlc2NUaXRsZXMgKz0gYFxcdFwiJHtsYWJ9XCI6ICR7dmFsdWV9LCBcXG5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9hanVzdGVzIGZpbmFpcyBub3MgZGVzY3JpcHRvcnMgZSB1bmnDo29cclxuICAgIGNvbnN0IGZpbmFsRGVzY0lkcyA9IChmb3JtYXRGb3JtRGVzY0lkcyArXHJcbiAgICAgICAgYFxcblxcbmAgK1xyXG4gICAgICAgIGZvcm1hdEZvcm1EZXNjVGl0bGVzICtcclxuICAgICAgICBgfWApLnJlcGxhY2UoXCIsIFxcbn1cIiwgXCIgXFxufVwiKTtcclxuICAgIGNvbnN0IGZpbmFsRGVzY1RpdGxlcyA9IChge2AgKyBmb3JtYXRGb3JtRGVzY1RpdGxlcyArIGB9YCkucmVwbGFjZShcIiwgXFxufVwiLCBcIiBcXG59XCIpO1xyXG4gICAgLy9wYXJhIGxlaXR1cmEgZW0gbG9ncyBzb21lbnRlXHJcbiAgICBjb25zdCBmaW5hbERlc2NJZHNSZWFkID0gKGZvcm1hdEZvcm1EZXNjSWRzUmVhZCArIGB9YClcclxuICAgICAgICAucmVwbGFjZShcIiwgXFxufVwiLCBcIiBcXG59XCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiXCJudWxsXCI6IFwibnVsbFwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIlwiZmFsc2VcIjogXCJmYWxzZVwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIm51bGxcIjogXCJudWxsXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiZmFsc2VcIjogXCJmYWxzZVwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cImZhbHNlXCI6IFwiZmFsc2VcIi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIm51bGxcIjogXCJudWxsXCIvZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHM6XFxzXCJudWxsXCIsXFxzXFxuL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1xcdFswLTldezEsM30uXFxzOlxcc1wiZmFsc2VcIixcXHNcXG4vZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHNcXHNcXG4vZywgXCJcIik7XHJcbiAgICBjb25zdCBmaW5hbERlc2NUaXRsZXNSZWFkID0gKGZvcm1hdEZvcm1EZXNjVGl0bGVzUmVhZCArIGB9YClcclxuICAgICAgICAucmVwbGFjZShcIiwgXFxufVwiLCBcIiBcXG59XCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiXCJudWxsXCI6IFwibnVsbFwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIlwiZmFsc2VcIjogXCJmYWxzZVwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIm51bGxcIjogXCJudWxsXCIsL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1wiZmFsc2VcIjogXCJmYWxzZVwiLC9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cImZhbHNlXCI6IFwiZmFsc2VcIi9nLCBcIlwiKVxyXG4gICAgICAgIC5yZXBsYWNlQWxsKC9cIm51bGxcIjogXCJudWxsXCIvZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHM6XFxzXCJudWxsXCIsXFxzXFxuL2csIFwiXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoL1xcdFswLTldezEsM30uXFxzOlxcc1wiZmFsc2VcIixcXHNcXG4vZywgXCJcIilcclxuICAgICAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHNcXHNcXG4vZywgXCJcIik7XHJcbiAgICBjb25zb2xlLmxvZyhmaW5hbERlc2NJZHNSZWFkKTtcclxuICAgIGNvbnNvbGUubG9nKGZpbmFsRGVzY1RpdGxlc1JlYWQpO1xyXG4gICAgcmV0dXJuIFtmaW5hbERlc2NUaXRsZXMsIGZpbmFsRGVzY0lkc107XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2VuZXJhdGVKU09OQnRuKEpTT05MaW5rLCBmb3JtSW5wc0Rlc2NyaXB0b3IpIHtcclxuICAgIGNvbnN0IG5ld0pTT05CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgbmV3SlNPTkJ0bi5pZCA9IFwiYnRuSlNPTlwiO1xyXG4gICAgbmV3SlNPTkJ0bi5jbGFzc05hbWUgPSBKU09OTGluay5jbGFzc05hbWU7XHJcbiAgICBuZXdKU09OQnRuLnN0eWxlLndpZHRoID0gSlNPTkxpbmsuc3R5bGUud2lkdGg7XHJcbiAgICBuZXdKU09OQnRuLnN0eWxlLmhlaWdodCA9IEpTT05MaW5rLnN0eWxlLmhlaWdodDtcclxuICAgIG5ld0pTT05CdG4udGV4dENvbnRlbnQgPSBcIlJlZ2VuZXJhciBKU09OXCI7XHJcbiAgICBKU09OTGluay5yZXBsYWNlV2l0aChuZXdKU09OQnRuKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIG5ld0pTT05CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNyZWF0ZUpTT05BbmNob3IobmV3SlNPTkJ0biwgZm9ybUlucHNEZXNjcmlwdG9yKSk7XHJcbiAgICB9LCAxMDAwKTtcclxuICAgIC8vIHJldHVybiBuZXdKU09OQnRuO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBvcFJhZGlvSGFuZGxlcihrZXlkb3duKSB7XHJcbiAgICBjb25zdCByYWRpb1BhaXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbaWQkPVwiWWVzXCJdLCBpbnB1dFtpZCQ9XCJOb1wiXScgLy9hY2Vzc2FuZG8gY29tbyBwYXJcclxuICAgICk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvUGFpcnMubGVuZ3RoOyBpICs9IDIgLy9wdWxhbmRvIGRlIHBhciBlbSBwYXJcclxuICAgICkge1xyXG4gICAgICAgIGNvbnN0IHJhZGlvWWVzID0gcmFkaW9QYWlyc1tpXTtcclxuICAgICAgICBjb25zdCByYWRpb05vID0gcmFkaW9QYWlyc1tpICsgMV07XHJcbiAgICAgICAgaWYgKCFyYWRpb1llcyB8fCAhcmFkaW9Obykge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJhZGlvWWVzIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICByYWRpb05vIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAhcmFkaW9ZZXMuY2hlY2tlZCAmJlxyXG4gICAgICAgICAgICAhcmFkaW9Oby5jaGVja2VkICYmXHJcbiAgICAgICAgICAgIGtleWRvd24gaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgoa2V5ZG93bi5hbHRLZXkgJiYga2V5ZG93bi5rZXkgPT09IFwieVwiKSB8fCBrZXlkb3duLmtleSA9PT0gXCJZXCIpIHtcclxuICAgICAgICAgICAgICAgIHJhZGlvWWVzLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICByYWRpb1llcy5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvWWVzLmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKChrZXlkb3duLmFsdEtleSAmJiBrZXlkb3duLmtleSA9PT0gXCJuXCIpIHx8XHJcbiAgICAgICAgICAgICAgICBrZXlkb3duLmtleSA9PT0gXCJOXCIpIHtcclxuICAgICAgICAgICAgICAgIHJhZGlvTm8uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHJhZGlvTm8uY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByYWRpb05vLmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYHJhZGlvWWVzOiAke3JhZGlvWWVzPy5jaGVja2VkID8/IGZhbHNlfWApO1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYHJhZGlvTm86ICR7cmFkaW9Obz8uY2hlY2tlZCA/PyBmYWxzZX1gKTtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGAke0pTT04uc3RyaW5naWZ5KGtleWRvd24pfWApO1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIsIFwidmFsaWRhbmRvIHJhZGlvWWVzIG91IHJhZGlvc05vIG91IGtleWRvd24gZXZlbnQgdGFyZ2V0XCIsIHJhZGlvWWVzID8/IG51bGwsIHJhZGlvTm8gPz8gbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjcGJJbnBIYW5kbGVyKHJhZGlvKSB7XHJcbiAgICBpZiAocmFkaW8ucGFyZW50RWxlbWVudCAmJiByYWRpby5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBvcFJhZGlvc0NoZWNrID0gcmFkaW8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvckFsbChcImlucHV0W2lkXj0nQ3BiJ11baWQkPSdZZXMnXVwiKTtcclxuICAgICAgICBjb25zdCBvcFJhZGlvc1RleHQgPSByYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbaWRePSdwYiddW2lkJD0nWWVzJ11cIik7XHJcbiAgICAgICAgY29uc3QgYW50RmFtQ2hlY2tzID0gcmFkaW8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvckFsbChcImlucHV0W2lkXj0nYW50RmFtJ11cIik7XHJcbiAgICAgICAgY29uc3QgdGV4dEFkZCA9IHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZXh0YXJlYVtpZF49J3RleHRBZGQnXVwiKTtcclxuICAgICAgICBjb25zdCBkaXZBZGQgPSByYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2W2lkXj0nZGl2QWRkJ11cIik7XHJcbiAgICAgICAgLy9pbmNsdWkgYW1ib3Mgb3MgdGlwb3MgZGUgZXZlbnRvc1xyXG4gICAgICAgIGlmIChvcFJhZGlvc0NoZWNrLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgb3BSYWRpb3NDaGVjaz8uZm9yRWFjaChmdW5jdGlvbiAob3BSYWRpb0NoZWNrLCBpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGl2QWRkW2ldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICBvcFJhZGlvQ2hlY2sgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKG9wUmFkaW9DaGVjay50eXBlID09PSBcImNoZWNrYm94XCIgfHwgb3BSYWRpb0NoZWNrLnR5cGUgPT09IFwicmFkaW9cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wUmFkaW9DaGVjay5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpdkFkZFtpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXZBZGRbaV0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3BSYWRpb3NUZXh0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgb3BSYWRpb3NUZXh0Py5mb3JFYWNoKGZ1bmN0aW9uIChvcFJhZGlvVGV4dCwgaSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHRBZGRbaV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIG9wUmFkaW9UZXh0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChvcFJhZGlvVGV4dC50eXBlID09PSBcImNoZWNrYm94XCIgfHwgb3BSYWRpb1RleHQudHlwZSA9PT0gXCJyYWRpb1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3BSYWRpb1RleHQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWRkW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBZGRbaV0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYW50RmFtQ2hlY2tzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgYW50RmFtQ2hlY2tzPy5mb3JFYWNoKChhbnRGYW1DaGVjaywgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xvc2VzdEFkZEVsZW1lbnQgPSBhbnRGYW1DaGVja3NbaV0ucGFyZW50RWxlbWVudD8ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3RBZGRFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW50RmFtQ2hlY2sgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChhbnRGYW1DaGVjay50eXBlID09PSBcImNoZWNrYm94XCIgfHwgYW50RmFtQ2hlY2sudHlwZSA9PT0gXCJyYWRpb1wiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhYW50RmFtQ2hlY2suY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0QWRkRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0QWRkRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5tdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIsIFwibG9jYWxpemFuZG8gcGFyZW50IGVsZW1lbnRzIGRlIFJhZGlvXCIsIHJhZGlvPy5wYXJlbnRFbGVtZW50ID8/IG51bGwsIHJhZGlvPy5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50ID8/IG51bGwpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkZWFjdFRleHRJbnB1dCgpIHtcclxuICAgIGNvbnN0IG51bWJlcklucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl1baWQkPU51bUlkXScpO1xyXG4gICAgY29uc3QgbnVsbFJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXVtpZCQ9TnVsbElkXScpO1xyXG4gICAgaWYgKG51bWJlcklucHV0cy5sZW5ndGggIT09IG51bGxSYWRpb3MubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk7Dum1lcm8gZGUgdGV4dHMgZSByYWRpb3MgbsOjbyBjb3JyZXNwb25kZSFcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbnVtYmVySW5wdXRzLmZvckVhY2goKG51bWJlcklucHV0LCBpKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbnVsbFJhZGlvID0gbnVsbFJhZGlvc1tpXTtcclxuICAgICAgICBpZiAobnVsbFJhZGlvLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgbnVtYmVySW5wdXQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBudW1iZXJJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlQ2xpY2tIYW5kbGVyKGlucHV0KSB7XHJcbiAgICBpbnB1dC5jaGVja2VkID0gaW5wdXQuY2hlY2tlZCA/IGZhbHNlIDogdHJ1ZTtcclxuICAgIGNwYklucEhhbmRsZXIoaW5wdXQpO1xyXG4gICAgZGVhY3RUZXh0SW5wdXQoKTtcclxufVxyXG4vLyBleHBvcnQgZnVuY3Rpb24gdG91Y2hTdGFydEhhbmRsZXIoa2V5ZG93bjogS2V5Ym9hcmRFdmVudCkge1xyXG4vLyAgIGxldCBmaXJzdFRhcFRpbWUgPSAwO1xyXG4vLyAgIGlmIChmaXJzdFRhcFRpbWUgPT09IDApIHtcclxuLy8gICAgIGZpcnN0VGFwVGltZSA9IERhdGUubm93KCk7XHJcbi8vICAgfSBlbHNlIHtcclxuLy8gICAgIGNvbnN0IGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gZmlyc3RUYXBUaW1lO1xyXG4vLyAgICAgaWYgKGVsYXBzZWQgPCAxMDAwKSB7XHJcbi8vICAgICAgIC8vIExpbWl0ZSBkZSB0ZW1wbyBwYXJhIGNvbnNpZGVyYXIgdW0gZHVwbG8gdG9xdWUgKDMwMG1zKVxyXG4vLyAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XHJcbi8vICAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgICBmaXJzdFRhcFRpbWUgPSAwOyAvLyBSZWluaWNpYXIgbyB0ZW1wb3JpemFkb3JcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgIGZpcnN0VGFwVGltZSA9IERhdGUubm93KCk7IC8vIEluaWNpYXIgdW0gbm92byB0ZW1wb3JpemFkb3JcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vICAgb3BSYWRpb0hhbmRsZXIoa2V5ZG93bik7XHJcbi8vICAgY3BiSW5wSGFuZGxlcih0aGlzKTtcclxuLy8gfVxyXG5leHBvcnQgZnVuY3Rpb24gdXNlQ3VycmVudERhdGUoYWN0aXZhdGlvbiwgZGF0ZUJ0bikge1xyXG4gICAgY29uc3QgZGF0YUF0dWFsID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IGFubyA9IGRhdGFBdHVhbC5nZXRGdWxsWWVhcigpO1xyXG4gICAgY29uc3QgbWVzID0gKGRhdGFBdHVhbC5nZXRNb250aCgpICsgMSlcclxuICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgIC5wYWRTdGFydCgyLCBcIjBcIilcclxuICAgICAgICAucmVwbGFjZUFsbChcIidcIiwgXCJcIik7XHJcbiAgICBjb25zdCBkaWEgPSBkYXRhQXR1YWxcclxuICAgICAgICAuZ2V0RGF0ZSgpXHJcbiAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAucGFkU3RhcnQoMiwgXCIwXCIpXHJcbiAgICAgICAgLnJlcGxhY2VBbGwoXCInXCIsIFwiXCIpO1xyXG4gICAgY29uc3QgdGFyZ0lucHV0RGF0ZSA9IHNlYXJjaFByZXZpb3VzU2libGluZ3MoZGF0ZUJ0biwgXCJpbnBEYXRlXCIpO1xyXG4gICAgaWYgKGFjdGl2YXRpb24udGFyZ2V0ID09PSBkYXRlQnRuICYmXHJcbiAgICAgICAgdGFyZ0lucHV0RGF0ZSAmJlxyXG4gICAgICAgIHRhcmdJbnB1dERhdGUudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmXHJcbiAgICAgICAgdGFyZ0lucHV0RGF0ZSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICB0YXJnSW5wdXREYXRlLnZhbHVlID0gYW5vICsgXCItXCIgKyBtZXMgKyBcIi1cIiArIGRpYTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZCh0YXJnSW5wdXREYXRlID8/IG51bGwsIFwidGFyZ0lucHV0RGF0ZVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaE5leHRTaWJsaW5ncyhjdXJyZW50RWxlbWVudCwgc2VhcmNoZWRTaWJsaW5nQ2xhc3MpIHtcclxuICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcclxuICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICBjb25zdCBpc1NpYmxpbmdWYWxpZCA9IGN1cnJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhzZWFyY2hlZFNpYmxpbmdDbGFzcyk7XHJcbiAgICAgICAgaWYgKGlzU2libGluZ1ZhbGlkIHx8IGxvb3BBY2MgPiA5OTkpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvb3BBY2MrKztcclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUHJldmlvdXNTaWJsaW5ncyhjdXJyZW50RWxlbWVudCwgc2VhcmNoZWRTaWJsaW5nQ2xhc3MpIHtcclxuICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIGNvbnN0IGlzU2libGluZ1ZhbGlkID0gY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlYXJjaGVkU2libGluZ0NsYXNzKTtcclxuICAgICAgICBpZiAoaXNTaWJsaW5nVmFsaWQgfHwgbG9vcEFjYyA+IDk5OSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9vcEFjYysrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRFbGVtZW50O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQcmV2aW91c1NpYmxpbmdzQnlJZChjdXJyZW50RWxlbWVudCwgc2VhcmNoZWRTaWJsaW5nSWQpIHtcclxuICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIGNvbnN0IGlzU2libGluZ1ZhbGlkID0gY3VycmVudEVsZW1lbnQuaWQgPT09IHNlYXJjaGVkU2libGluZ0lkO1xyXG4gICAgICAgIGlmIChpc1NpYmxpbmdWYWxpZCB8fCBsb29wQWNjID4gOTk5KSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb29wQWNjKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFBhcmVudHMoY3VycmVudEVsZW1lbnQsIHNlYXJjaGVkUGFyZW50Q2xhc3MpIHtcclxuICAgIGxldCBsb29wQWNjID0gMDtcclxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGlzUGFyZW50VmFsaWQgPSBjdXJyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoc2VhcmNoZWRQYXJlbnRDbGFzcyk7XHJcbiAgICAgICAgaWYgKGlzUGFyZW50VmFsaWQgfHwgbG9vcEFjYyA+IDk5OSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9vcEFjYysrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRFbGVtZW50O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VUb0FzdERpZ2l0KGNsaWNrLCB0b0ZpbGVJbnBCdG4pIHtcclxuICAgIGNvbnN0IHVzZUFzdERpZ2l0UmVnZXggPSAvVXNhciBBc3NpbmF0dXJhIERpZ2l0YWwvO1xyXG4gICAgY29uc3QgdXNlQXN0RGlndFJlZ2V4T2JqID0gbmV3IFJlZ0V4cCh1c2VBc3REaWdpdFJlZ2V4KTtcclxuICAgIGNvbnN0IHVzZUFzdFRleHRSZWdleCA9IC9SZXRvcm5hciDDoCBBc3NpbmF0dXJhIEVzY3JpdGEvO1xyXG4gICAgY29uc3QgdXNlQXN0VGV4dFJlZ2V4T2JqID0gbmV3IFJlZ0V4cCh1c2VBc3RUZXh0UmVnZXgpO1xyXG4gICAgbGV0IGxhYkNvbnQgPSB0b0ZpbGVJbnBCdG4ucGFyZW50RWxlbWVudD8uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxhYkFzdFwiKSA/PyBcIm51bGxcIjtcclxuICAgIGlmIChsYWJDb250WzBdID09PSBcIm51bGxcIiAmJlxyXG4gICAgICAgICh0b0ZpbGVJbnBCdG4ucGFyZW50RWxlbWVudD8udGFnTmFtZSA9PT0gXCJMQUJFTFwiIHx8XHJcbiAgICAgICAgICAgIHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py50YWdOYW1lID09PSBcIlNQQU5cIikpIHtcclxuICAgICAgICBsYWJDb250ID0gQXJyYXkub2YodG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNsaWNrLnRhcmdldCA9PT0gdG9GaWxlSW5wQnRuKSB7XHJcbiAgICAgICAgaWYgKHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCAmJlxyXG4gICAgICAgICAgICB1c2VBc3REaWd0UmVnZXhPYmoudGVzdCh0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucEFzdCA9IHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImlucEFzdFwiKTtcclxuICAgICAgICAgICAgaWYgKGlucEFzdCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJbnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLnR5cGUgPSBcImZpbGVcIjtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAubmFtZSA9IGlucEFzdC5uYW1lOyAvL2lnbm9yYXIgVFNcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAuaWQgPSBpbnBBc3QuaWQ7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLmNsYXNzTmFtZSA9IGlucEFzdC5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLnNldEF0dHJpYnV0ZShcImFjY2VwdFwiLCBcImltYWdlLypcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wQXN0LnJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5yZXF1aXJlZCA9IGlucEFzdC5yZXF1aXJlZDsgLy9pZ25vcmFyIFRTXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wQXN0LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnBBc3QucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoZmlsZUlucCwgaW5wQXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoID0gbGFiQ29udFswXS5pZC5tYXRjaCgvQXN0Lyk/LnRvU3RyaW5nKCkgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZElucE1hdGNoID0gZmlsZUlucC5pZC5tYXRjaCgvQXN0Lyk/LnRvU3RyaW5nKCkgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoSW5kZXggPSBsYWJDb250WzBdLmlkLmluZGV4T2YoaWRMYWJNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRJbnBNYXRjaEluZGV4ID0gZmlsZUlucC5pZC5pbmRleE9mKGlkSW5wTWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZExhYk1hdGNoSW5kZXggJiYgaWRJbnBNYXRjaEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlT25lTGFiSWQgPSBsYWJDb250WzBdLmlkLnNsaWNlKDAsIGlkTGFiTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlVHdvSW5wSWQgPSBmaWxlSW5wLmlkLnNsaWNlKGlkSW5wTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYkNvbnRbMF0uaWQgPSBzbGljZU9uZUxhYklkICsgc2xpY2VUd29JbnBJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnRleHRDb250ZW50ID0gXCJSZXRvcm5hciDDoCBBc3NpbmF0dXJhIEVzY3JpdGFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvRmlsZUlucEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvRmlsZUlucEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nPy5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gbWF0Y2ggZGUgaWRzIGRvIGlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZUlucCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGNob3NlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaG9zZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuZmlsZXMgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5maWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZ0ZpbGUgPSBmaWxlSW5wLmZpbGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1nRmlsZSAmJiBpbWdGaWxlLnR5cGUuc3RhcnRzV2l0aChcImltYWdlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGxvYWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlZmluaXIgbMOzZ2ljYSBwYXJhIGNhcnJlZ2FtZW50b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pY2lhIHByZXBhcm8gcGFyYSBldmVudG8gZGUgY2FycmVnYW1lbnRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nVXJsID0gbG9hZC50YXJnZXQ/LnJlc3VsdDsgLy9jaGVjYSBhIHVybCBkbyBmaWxlIHF1ZSBzZXLDoSBjYXJyZWdhZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWdBc3REaWd0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTsgLy9jcmlhIGNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuaWQgPSBpbnBBc3QuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5jbGFzc05hbWUgPSBpbnBBc3QuY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3QuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGltZ1VybCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnNyYyA9IGltZ1VybDsgLy9hc3NvY2lhw6fDo28gZW50cmUgY29udGFpbmVyIGUgZmlsZSBjYXJyZWdhZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5pZCA9IGZpbGVJbnAuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5jbGFzc05hbWUgPSBmaWxlSW5wLmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkFzc2luYXR1cmEgRGlnaXRhbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnNldEF0dHJpYnV0ZShcImRlY29kaW5nXCIsIFwiYXN5bmNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zZXRBdHRyaWJ1dGUoXCJsb2FkaW5nXCIsIFwiZWFnZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLCBcImFub255bW91c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdBc3REaWd0LnN0eWxlLnNldFByb3BlcnR5KFwibWF4LXdpZHRoXCIsIFwiMzAwcHhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zdHlsZS5zZXRQcm9wZXJ0eShcIm1heC1oZWlnaHRcIiwgXCIyMDBweFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZUlucC5wYXJlbnRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYkNvbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiQ29udC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoaW1nQXN0RGlndCwgZmlsZUlucCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkTGFiTWF0Y2ggPSBsYWJDb250WzBdLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goL0FzdC8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2ggPSBpbWdBc3REaWd0LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goL0FzdC8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZExhYk1hdGNoICYmIGlkSW5wTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkTGFiTWF0Y2hJbmRleCA9IGxhYkNvbnRbMF0uaWQuaW5kZXhPZihpZExhYk1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2hJbmRleCA9IGltZ0FzdERpZ3QuaWQuaW5kZXhPZihpZElucE1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlT25lTGFiSWQgPSBsYWJDb250WzBdLmlkLnNsaWNlKDAsIGlkTGFiTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZVR3b0lucElkID0gaW1nQXN0RGlndC5pZC5zbGljZShpZElucE1hdGNoSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiQ29udFswXS5pZCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2VPbmVMYWJJZCArIHNsaWNlVHdvSW5wSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvIG5vIG1hdGNoIGRlIGlkcyBkbyBpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIG5hIHZhbGlkYcOnw6NvIGRlIGxhYkNvbnQ6IGVsZW1lbnRvICR7bGFiQ29udH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGUvb3UgcGFyZW50OiBlbGVtZW50byAke2ZpbGVJbnAucGFyZW50RWxlbWVudH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1nQXN0RGlndC5zdHlsZS53aWR0aCA9IGltZ0FzdERpZ3QucGFyZW50RWxlbWVudC5zdHlsZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1nQXN0RGlndCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY29tcHV0ZUltZ0FzdGRXaWR0aCA9IGdldENvbXB1dGVkU3R5bGUoaW1nQXN0RGlndCkud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGltZ0FzdERpZ3QucGFyZW50RWxlbWVudC5zdHlsZS53aWR0aCA9IGNvbXB1dGVJbWdBc3RkV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3Quc3R5bGUuc2V0UHJvcGVydHkoXCJvdmVyZmxvd1wiLCBcImF1dG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChpbWdGaWxlKTsgLy9sw6ogbyBmaWxlIGJhc2VhZG8gbmEgc3JjIGNhcnJlZ2FkYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZW5odW0gYXJxdWl2byBzZWxlY2lvbmFkb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChpbnBBc3QgPz8gbnVsbCwgXCJpbnBBc3RcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vVE9ETyBJTkNMVUlSIFRPS0VOIEFOVEktQ1NSRiBRVUFORE8gSE9VVkVSIFNFUlZJRE9SXHJcbiAgICAgICAgICAgIC8vIGZpbGVJbnAubmFtZSA9IGlucEFzdC5uYW1lO1xyXG4gICAgICAgICAgICAvLyBmaWxlSW5wLmlkID0gaW5wQXN0LmlkO1xyXG4gICAgICAgICAgICAvLyBmaWxlSW5wLmNsYXNzTmFtZSA9IGlucEFzdC5jbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCAmJlxyXG4gICAgICAgICAgICB1c2VBc3RUZXh0UmVnZXhPYmoudGVzdCh0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucEFzdCA9IHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImlucEFzdFwiKSB8fFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoUHJldmlvdXNTaWJsaW5ncyh0b0ZpbGVJbnBCdG4sIFwiaW1nQXN0RGlnaXRcIik7XHJcbiAgICAgICAgICAgIGlmIChpbnBBc3QgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50IHx8XHJcbiAgICAgICAgICAgICAgICBpbnBBc3QgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlSW5wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgZmlsZUlucC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLm5hbWUgPSBpbnBBc3QubmFtZTtcclxuICAgICAgICAgICAgICAgIGZpbGVJbnAuaWQgPSBpbnBBc3QuaWQ7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLmNsYXNzTmFtZSA9IGlucEFzdC5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICBmaWxlSW5wLnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucEFzdC5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wQXN0LnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKGZpbGVJbnAsIGlucEFzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRMYWJNYXRjaCA9IGxhYkNvbnRbMF0uaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKC9Bc3QvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRJbnBNYXRjaCA9IGZpbGVJbnAuaWQubWF0Y2goL0FzdC8pPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZExhYk1hdGNoICYmIGlkSW5wTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRMYWJNYXRjaEluZGV4ID0gbGFiQ29udFswXS5pZC5pbmRleE9mKGlkTGFiTWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZElucE1hdGNoSW5kZXggPSBmaWxlSW5wLmlkLmluZGV4T2YoaWRJbnBNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlT25lTGFiSWQgPSBsYWJDb250WzBdLmlkLnNsaWNlKDAsIGlkTGFiTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlVHdvSW5wSWQgPSBmaWxlSW5wLmlkLnNsaWNlKGlkSW5wTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYkNvbnRbMF0uaWQgPSBzbGljZU9uZUxhYklkICsgc2xpY2VUd29JbnBJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnRleHRDb250ZW50ID0gXCJVc2FyIEFzc2luYXR1cmEgRGlnaXRhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4ucHJldmlvdXNFbGVtZW50U2libGluZz8ucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyhmaWxlSW5wKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvIG5vIG1hdGNoIGRlIGlkcyBkbyBJbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKGlucEFzdCA/PyBudWxsLCBcImlucEFzdFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0YXJGb3JtdWxhcmlvKGNsaWNrLCB0b0ZpbGVJbnBCdG5zKSB7XHJcbiAgICBpZiAoY2xpY2sudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcclxuICAgICAgICBjbGljay50YXJnZXQudGFnTmFtZSA9PT0gXCJCVVRUT05cIikge1xyXG4gICAgICAgIGNvbnN0IGZvcm11bGFyaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BbmFtR0lkXCIpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRhYmxlQ2l0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NpdGVbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXScpO1xyXG4gICAgICAgIGNvbnN0IGdlbkJpcnRoUmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5CaXJ0aFJlbElkXCIpO1xyXG4gICAgICAgIGNvbnN0IGdlblRyYW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5UcmFuc0lkXCIpO1xyXG4gICAgICAgIGlmIChmb3JtdWxhcmlvICYmIGZvcm11bGFyaW8gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZm9ybXVsYXJpby5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm8gdmFsaWRhbmRvIGZvcm11bMOhcmlvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZWRpdGFibGVDaXRlKSB7XHJcbiAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGAtLU5vbWVgO1xyXG4gICAgICAgICAgICBHbG9iYWxNb2RlbC5yZW1vdmVGaXJzdENsaWNrKGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYGVkaXRhYmxlQ2l0ZSBuw6NvIGVuY29udHJhZG8gZW0gcmVzZXQuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnZW5CaXJ0aFJlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XHJcbiAgICAgICAgICAgIGdlbkJpcnRoUmVsIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBnZW5CaXJ0aFJlbC52YWx1ZSA9IFwiY2lzXCI7XHJcbiAgICAgICAgICAgIGdlbkJpcnRoUmVsLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYGdlbkJpcnRoUmVsIG7Do28gZW5jb250cmFkbyBlbSByZXNldC5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGdlblRyYW5zIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgZ2VuVHJhbnMgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGdlblRyYW5zLnZhbHVlID0gXCJhdmFuY2Fkb1wiO1xyXG4gICAgICAgICAgICBnZW5UcmFucy5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBnZW5UcmFucyBuw6NvIGVuY29udHJhZG8gZW0gcmVzZXQuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvRmlsZUlucEJ0bnMuZm9yRWFjaCgodG9GaWxlSW5wQnRuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQgPT09IFwiUmV0b3JuYXIgw6AgQXNzaW5hdHVyYSBFc2NyaXRhXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlucEFzdCA9IHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImlucEFzdFwiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImltZ0FzdERpZ2l0XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlucEFzdCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChpbnBBc3QgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucEFzdCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZUlucCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLm5hbWUgPSBpbnBBc3QubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLmlkID0gaW5wQXN0LmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuY2xhc3NOYW1lID0gaW5wQXN0LmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlSW5wLnNldEF0dHJpYnV0ZShcInJlcXVpcmVkXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnBBc3QucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFiQ29udCA9IHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGFiQXN0XCIpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm51bGxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsYWJDb250WzBdID09PSBcIm51bGxcIiB8fCBsYWJDb250WzBdLmlkID09PSBcIlwiKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py50YWdOYW1lID09PSBcIkxBQkVMXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4ucGFyZW50RWxlbWVudD8udGFnTmFtZSA9PT0gXCJTUEFOXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJDb250ID0gQXJyYXkub2YodG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucEFzdC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChmaWxlSW5wLCBpbnBBc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoID0gbGFiQ29udFswXS5pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKC9Bc3QvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZElucE1hdGNoID0gZmlsZUlucC5pZC5tYXRjaCgvQXN0Lyk/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZExhYk1hdGNoICYmIGlkSW5wTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkTGFiTWF0Y2hJbmRleCA9IGxhYkNvbnRbMF0uaWQuaW5kZXhPZihpZExhYk1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2hJbmRleCA9IGZpbGVJbnAuaWQuaW5kZXhPZihpZElucE1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlT25lTGFiSWQgPSBsYWJDb250WzBdLmlkLnNsaWNlKDAsIGlkTGFiTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZVR3b0lucElkID0gZmlsZUlucC5pZC5zbGljZShpZElucE1hdGNoSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiQ29udFswXS5pZCA9IHNsaWNlT25lTGFiSWQgKyBzbGljZVR3b0lucElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gR2xvYmFsTW9kZWwuYXV0b0NhcGl0YWxpemVJbnB1dHMoZmlsZUlucCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnRleHRDb250ZW50ID0gXCJVc2FyIEFzc2luYXR1cmEgRGlnaXRhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmc/LnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gbWF0Y2ggZGUgaWRzIGRvIGlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gbG9jYWxpemFuZG8gUGFyZW50IEVsZW1lbnQgZGUgaW5wQXN0YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIHJlY29uaGVjZW5kbyBQcmV2aW91cyBFbGVtZW50IFNpYmxpbmc6IGlucEFzdCAke09iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoaW5wQXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoOCwgLTEpfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyB0YXJnZXQ6IGluc3TDom5jaWEgZGUgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXHJcbiAgICAgICAgICAgIC5jYWxsKGNsaWNrLnRhcmdldClcclxuICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX1gKTtcclxuICAgIH1cclxufVxyXG4vL1RPRE8gRklOQUxJWkFSIENPTSBDU1NcclxuZXhwb3J0IGZ1bmN0aW9uIHN1YkZvcm0oKSB7XHJcbiAgICB3aW5kb3cuYWxlcnQoXCJTaXN0ZW1hIGFpbmRhIG7Do28gcHJvbnRvXFxuLi4ubWFzIHZvY8OqIHRlcmlhIGVudmlhZG8gY2xpY2FuZG8gYXF1aSEgOilcIik7XHJcbiAgICAvLyBjb25zdCByZXF1aXJlZEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltyZXF1aXJlZF1cIik7XHJcbiAgICAvLyBpZiAocmVxdWlyZWRFbGVtZW50cykge1xyXG4gICAgLy8gICBjb25zdCBlbXB0eUVsZW1lbnRzID0gQXJyYXkuZnJvbShyZXF1aXJlZEVsZW1lbnRzKS5maWx0ZXIoKGVsZW1lbnQpID0+IHtcclxuICAgIC8vICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQudmFsdWUgfHwgZWxlbWVudC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgLy8gICAgIHJldHVybiB2YWx1ZSA9PT0gXCJcIjtcclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyAgIGlmIChlbXB0eUVsZW1lbnRzKSB7XHJcbiAgICAvLyAgICAgZW1wdHlFbGVtZW50cy5mb3JFYWNoKChlbXB0eUVsZW1lbnQpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKFwiRWxlbWVudG8gdmF6aW86IFwiLCBlbXB0eUVsZW1lbnQuaWQpO1xyXG4gICAgLy8gICAgICAgZW1wdHlFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwicmdiKDI1NSwgMCwgMClcIjtcclxuICAgIC8vICAgICAgIGxldCBlbXB0eUVsZW1lbnRDU3R5bGUgPSB3aW5kb3dcclxuICAgIC8vICAgICAgICAgLmdldENvbXB1dGVkU3R5bGUoZW1wdHlFbGVtZW50KVxyXG4gICAgLy8gICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShcImJvcmRlci1jb2xvclwiKTtcclxuICAgIC8vICAgICAgIGxldCByZ2JhTWF0Y2ggPSBlbXB0eUVsZW1lbnRDU3R5bGUubWF0Y2gocmdiYVJlZ2V4KTtcclxuICAgIC8vICAgICAgIGlmIChyZ2JhTWF0Y2gpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJyZ2JhIFwiICsgcmdiYU1hdGNoKTtcclxuICAgIC8vICAgICAgICAgLy8gY29uc3QgZmFkaW5nQWxlcnQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIC8vICAgbGV0IHJnYmFNYXRjaCA9IGVtcHR5RWxlbWVudENTdHlsZS5tYXRjaChyZ2JhUmVnZXgpO1xyXG4gICAgLy8gICAgICAgICAvLyB9KTtcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG59XHJcbiIsIi8vbmVzc2UgZmlsZSBlc3TDo28gcHJlc2VudGVzIHByaW5jaXBhbG1lbnRlIGFzIGZ1bsOnw7VlcyByZWxhY2lvbmFkYXMgw6AgZXhpZ8OqbmNpYSBkZSBtb2RlbG8gdGV4dHVhbCBlIGRlIHZpc3VhbGl6YcOnw6NvXHJcbmltcG9ydCAqIGFzIEdsb2JhbEhhbmRsZXIgZnJvbSBcIi4vZ0hhbmRsZXJzXCI7XHJcbmltcG9ydCB7IE1hbiwgV29tYW4sIE5ldXRybyB9IGZyb20gXCIuL2NsYXNzZXNcIjtcclxuaW1wb3J0ICogYXMgRXJyb3JIYW5kbGVyIGZyb20gXCIuL2Vycm9ySGFuZGxlclwiO1xyXG4vLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5jb25zdCBhdXRvQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyUmVnZXggPSAvXFxiXFx3LztcclxubGV0IGlzQXV0b2NvcnJlY3RPbiA9IHRydWU7XHJcbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJMaW1pdChpbnB1dEVsZW1lbnQpIHtcclxuICAgIGxldCBudW1iZXJWYWx1ZSA9IGlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIGNvbnN0IG51bWJlclZhbHVlSW50ID0gcGFyc2VJbnQobnVtYmVyVmFsdWUpO1xyXG4gICAgY29uc3QgaXNBdGl2RmlzID0gaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImlucEF0aXZGaXNcIik7XHJcbiAgICBjb25zdCBpc0FsaW1Sb3QgPSBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wQWxpbVJvdFwiKTtcclxuICAgIGNvbnN0IGlzTG9jTnVtID0gaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImlucExvY051bVwiKTtcclxuICAgIGNvbnN0IGlzREREID0gaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImlucERERFwiKTtcclxuICAgIGNvbnN0IGlzRmxvYXQgPSBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxvYXRcIik7XHJcbiAgICBjb25zdCBpc0ZyZXEgPSBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnJlcUlucExpc3RcIik7XHJcbiAgICBpZiAoKGlzQXRpdkZpcyB8fCBpc0FsaW1Sb3QgfHwgaXNMb2NOdW0gfHwgaXNEREQgfHwgaXNGcmVxKSAmJiAhaXNGbG9hdCkge1xyXG4gICAgICAgIGlmIChudW1iZXJWYWx1ZS5tYXRjaCgvWz0uLDt+L3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXS9nKSkge1xyXG4gICAgICAgICAgICBjb25zdCB3cm9uZ01hdGNoID0gbnVtYmVyVmFsdWUubWF0Y2goL1s9Liw7fi98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0vZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyb25nTWF0Y2hJbmRleCA9IG51bWJlclZhbHVlLmluZGV4T2Yod3JvbmdNYXRjaD8uWzBdID8/IFwiXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRWYWx1ZSA9IG51bWJlclZhbHVlLnNsaWNlKDAsIHdyb25nTWF0Y2hJbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyU2xpY2UgPSBudW1iZXJWYWx1ZS5zbGljZSh3cm9uZ01hdGNoSW5kZXggKyAxKTtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gc2xpY2VkVmFsdWUgKyBhZnRlclNsaWNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtYXhMZW5ndGggPSAyO1xyXG4gICAgICAgIGNvbnN0IG1heElucHV0ID0gaW5wdXRFbGVtZW50LmlkLmVuZHNXaXRoKFwiTWF4XCIpO1xyXG4gICAgICAgIGlmIChudW1iZXJWYWx1ZUludCA8IDEgJiYgbWF4SW5wdXQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5wVmFsdWVBcnJheSA9IEFycmF5LmZyb20oaW5wdXRFbGVtZW50LnZhbHVlKTtcclxuICAgICAgICAgICAgaW5wVmFsdWVBcnJheS5zcGxpY2UoMCwgMSwgXCIxXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBmaXhlZElucFZhbHVlaW5wVmFsdWVBcnJheSA9IGlucFZhbHVlQXJyYXkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaW5wdXRFbGVtZW50LnZhbHVlID0gZml4ZWRJbnBWYWx1ZWlucFZhbHVlQXJyYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoaXNBdGl2RmlzIHx8IGlzQWxpbVJvdCB8fCBpc0RERCB8fCBpc0ZyZXEpICYmXHJcbiAgICAgICAgICAgIG51bWJlclZhbHVlLmxlbmd0aCA+IG1heExlbmd0aCkge1xyXG4gICAgICAgICAgICBudW1iZXJWYWx1ZSA9IG51bWJlclZhbHVlLnNsaWNlKDAsIG1heExlbmd0aCk7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IG51bWJlclZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTmVnYXRpdmVzKHRhYklucCkge1xyXG4gICAgbGV0IHBhcnNlZElucFZhbHVlID0gMDtcclxuICAgIGlmICh0YWJJbnAgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgcGFyc2VkSW5wVmFsdWUgPSBwYXJzZUZsb2F0KHRhYklucC52YWx1ZSk7XHJcbiAgICAgICAgLy8gaWYgKE51bWJlci5pc05hTihwYXJzZWRJbnBWYWx1ZSkgfHwgcGFyc2VkSW5wVmFsdWUgPCAwKSB7XHJcbiAgICAgICAgLy8gICBwYXJzZWRJbnBWYWx1ZSA9IDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhYklucCA/PyBudWxsLCBcInRhYklucFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyc2VkSW5wVmFsdWUudG9TdHJpbmcoKTtcclxufVxyXG5mdW5jdGlvbiBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIG1hdGNoLCB0ZXh0RWxlbWVudCkge1xyXG4gICAgbGV0IHRleHQgPSB0ZXh0RWxlbWVudC52YWx1ZSB8fCB0ZXh0RWxlbWVudC50ZXh0Q29udGVudCB8fCBudWxsO1xyXG4gICAgbGV0IGlzRml4QWZ0ZXJEQ3Vyc29yRXhlYyA9IGZhbHNlO1xyXG4gICAgaWYgKGlzRml4QWZ0ZXJEQ3Vyc29yRXhlYylcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCBzZWxlY3Rpb25Qb3NpdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKT8uZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldDtcclxuICAgIHRleHQgPSB3cm9uZ1N0YXJ0Q29ycmVjdGlvbih0ZXh0LCBtYXRjaCk7XHJcbiAgICB0ZXh0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGZpeG1vdmUpID0+IHtcclxuICAgICAgICBjb25zdCBrZXlib2FyZEV2ZW50ID0gZml4bW92ZTtcclxuICAgICAgICBpZiAoc2VsZWN0aW9uUG9zaXRpb24gPT09IDAgfHwgc2VsZWN0aW9uUG9zaXRpb24gPT09IHRleHQ/Lmxlbmd0aCB8fCAwKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXlib2FyZEV2ZW50LmtleSA9PT0gXCIgXCIgfHxcclxuICAgICAgICAgICAgICAgIGtleWJvYXJkRXZlbnQua2V5ID09PSBcIkJhY2tzcGFjZVwiIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5Ym9hcmRFdmVudC5rZXkgPj0gXCJBcnJvd0xlZnRcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGtleWJvYXJkRXZlbnQua2V5IDw9IFwiQXJyb3dEb3duXCIpIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5Ym9hcmRFdmVudC5rZXkgPj0gXCJhXCIgJiYga2V5Ym9hcmRFdmVudC5rZXkgPD0gXCJ6XCIpIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5Ym9hcmRFdmVudC5rZXkgPj0gXCJBXCIgJiYga2V5Ym9hcmRFdmVudC5rZXkgPD0gXCJaXCIpIHx8XHJcbiAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNGaXhBZnRlckRDdXJzb3JFeGVjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGtleWJvYXJkRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGlzRml4QWZ0ZXJEQ3Vyc29yRXhlYyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBbdGV4dCwgaXNDdXJzb3JBdXRvTW92ZWRdO1xyXG59XHJcbmZ1bmN0aW9uIHdyb25nU3RhcnRDb3JyZWN0aW9uKHRleHQsIHdyb25nU3RhcnRNYXRjaCkge1xyXG4gICAgbGV0IGZpeGVkVGV4dCA9IHRleHQ7XHJcbiAgICBpZiAod3JvbmdTdGFydE1hdGNoICYmIHRleHQpIHtcclxuICAgICAgICBjb25zdCB3cm9uZ1N0YXJ0TGVuZ3RoID0gd3JvbmdTdGFydE1hdGNoXHJcbiAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgYWRkRXJhc2VkQ2hhciA9IHRleHQuc2xpY2UoMCwgd3JvbmdTdGFydExlbmd0aCAtIDEpO1xyXG4gICAgICAgIGNvbnN0IGZpeGVkU3RhcnQgPSB0ZXh0LnNsaWNlKHdyb25nU3RhcnRMZW5ndGggLSAxKTtcclxuICAgICAgICBmaXhlZFRleHQgPSBmaXhlZFN0YXJ0ICsgYWRkRXJhc2VkQ2hhcjtcclxuICAgIH1cclxuICAgIHJldHVybiBmaXhlZFRleHQ7XHJcbn1cclxuZnVuY3Rpb24gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCB0ZXh0RWxlbWVudCkge1xyXG4gICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24gJiYgIWlzQ3Vyc29yQXV0b01vdmVkKSB7XHJcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0ZXh0RWxlbWVudCk7XHJcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xyXG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICBzZWw/LnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICAgIHNlbD8uYWRkUmFuZ2UocmFuZ2UpO1xyXG4gICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNDdXJzb3JBdXRvTW92ZWQ7XHJcbn1cclxuZnVuY3Rpb24gZml4Q3Vyc29yUG9zaXRpb24odGV4dEVsZW1lbnQsIHJhbmdlLCBzZWxlY3Rpb24sIHNob3VsZFNldEVuZCkge1xyXG4gICAgcmFuZ2Uuc2V0U3RhcnQodGV4dEVsZW1lbnQsIDApO1xyXG4gICAgaWYgKHNob3VsZFNldEVuZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJhbmdlLnNldEVuZCh0ZXh0RWxlbWVudCwgMSk7XHJcbiAgICB9XHJcbiAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuICAgIHNlbGVjdGlvbj8ucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICBzZWxlY3Rpb24/LmFkZFJhbmdlKHJhbmdlKTtcclxufVxyXG5mdW5jdGlvbiBmaXhGaXJzdExldHRlcihmc3RMZXQsIHJlZ2V4LCB0ZXh0RWxlbWVudCwgcmFuZ2UsIHNlbGVjdGlvbiwgc2hvdWxkU2V0RW5kKSB7XHJcbiAgICBsZXQgY29udFRleHQgPSB0ZXh0RWxlbWVudC52YWx1ZSB8fCB0ZXh0RWxlbWVudC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgY29uc3QgZmlyc3RMZXR0ZXJNYXRjaCA9IGZzdExldD8ubWF0Y2gocmVnZXgpO1xyXG4gICAgaWYgKGZpcnN0TGV0dGVyTWF0Y2gpIHtcclxuICAgICAgICBjb25zdCBjYXBpdGFsaXplZEZpcnN0TGV0dGVyID0gZnN0TGV0Py50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGNvbnN0IG5leHRMZXR0ZXJzID0gY29udFRleHQuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgY29udFRleHQgPSBjYXBpdGFsaXplZEZpcnN0TGV0dGVyICsgbmV4dExldHRlcnM7XHJcbiAgICAgICAgY29uc3QgZmlyc3RMZXR0ZXJNYXRjaCA9IGZzdExldD8ubWF0Y2gocmVnZXgpO1xyXG4gICAgICAgIGlmIChmaXJzdExldHRlck1hdGNoKSB7XHJcbiAgICAgICAgICAgIGlmIChyYW5nZS5lbmRPZmZzZXQgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgZml4Q3Vyc29yUG9zaXRpb24odGV4dEVsZW1lbnQsIHJhbmdlLCBzZWxlY3Rpb24sIHNob3VsZFNldEVuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29udFRleHQ7XHJcbn1cclxuZnVuY3Rpb24gZml4V3JvbmdTdGFydHModGV4dCwgbWF0Y2gsIGxlbmd0aCkge1xyXG4gICAgbGV0IGZpeGVkU3RyID0gdGV4dCA/PyBcIlwiO1xyXG4gICAgaWYgKHRleHQgJiYgbWF0Y2gpIHtcclxuICAgICAgICBjb25zdCB3cm9uZ0NoYXJJbmRleCA9IHRleHQuaW5kZXhPZihtYXRjaCk7XHJcbiAgICAgICAgY29uc3QgYXJyVGV4dCA9IEFycmF5LmZyb20odGV4dCk7XHJcbiAgICAgICAgYXJyVGV4dC5zcGxpY2Uod3JvbmdDaGFySW5kZXgsIGxlbmd0aCwgXCJcIik7XHJcbiAgICAgICAgZml4ZWRTdHIgPSBhcnJUZXh0LnRvU3RyaW5nKCkucmVwbGFjZUFsbChcIixcIiwgXCJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZml4ZWRTdHI7XHJcbn1cclxuZnVuY3Rpb24gZml4TmV4dFdvcmRzSW5pTm90RChyZW1hZGVUZXh0LCBsZXRNYXRjaCkge1xyXG4gICAgaWYgKHJlbWFkZVRleHQpIHtcclxuICAgICAgICBjb25zdCBnTGV0TWF0Y2hJID0gcmVtYWRlVGV4dC5sYXN0SW5kZXhPZihsZXRNYXRjaCkgKyAxO1xyXG4gICAgICAgIGNvbnN0IGFjdENoYXIgPSByZW1hZGVUZXh0LmNoYXJBdChnTGV0TWF0Y2hJKTtcclxuICAgICAgICBjb25zdCBjYXBDaGFyID0gYWN0Q2hhci50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGNvbnN0IGFyclRleHQgPSBBcnJheS5mcm9tKHJlbWFkZVRleHQpO1xyXG4gICAgICAgIGFyclRleHRbZ0xldE1hdGNoSV0gPSBjYXBDaGFyO1xyXG4gICAgICAgIHJlbWFkZVRleHQgPSBhcnJUZXh0LnRvU3RyaW5nKCkucmVwbGFjZUFsbChcIixcIiwgXCJcIik7XHJcbiAgICAgICAgaWYgKHJlbWFkZVRleHQubWF0Y2goL15cXHNbXFx3XSsvZykpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVtb3ZTcGFjZVRleHQgPSByZW1hZGVUZXh0LnNsaWNlKDEsIHJlbWFkZVRleHQubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmVtYWRlVGV4dCA9IHJlbW92U3BhY2VUZXh0ICsgXCIgXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmVtYWRlVGV4dCA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVtYWRlVGV4dDtcclxufVxyXG5mdW5jdGlvbiBmaXhOZXh0V29yZHNBZnRlckQocmVtYWRlVGV4dCwgbGV0TWF0Y2gpIHtcclxuICAgIGNvbnN0IGdsb2JhbExldHRlck1hdGNoSW5kZXhEID0gcmVtYWRlVGV4dFxyXG4gICAgICAgID8gcmVtYWRlVGV4dC5sYXN0SW5kZXhPZihsZXRNYXRjaCkgKyAxXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoZ2xvYmFsTGV0dGVyTWF0Y2hJbmRleEQpIHtcclxuICAgICAgICBjb25zdCBhY3R1YWxDaGFyRCA9IHJlbWFkZVRleHQ/LmNoYXJBdChnbG9iYWxMZXR0ZXJNYXRjaEluZGV4RCk7XHJcbiAgICAgICAgY29uc3QgY2FwaXRhbGl6ZWRDaGFyRCA9IGFjdHVhbENoYXJEPy50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChyZW1hZGVUZXh0ICYmIGNhcGl0YWxpemVkQ2hhckQpIHtcclxuICAgICAgICAgICAgY29uc3QgY2l0ZVRleHRBcnJheUQgPSBBcnJheS5mcm9tKHJlbWFkZVRleHQpO1xyXG4gICAgICAgICAgICBjaXRlVGV4dEFycmF5RFtnbG9iYWxMZXR0ZXJNYXRjaEluZGV4RF0gPSBjYXBpdGFsaXplZENoYXJEO1xyXG4gICAgICAgICAgICByZW1hZGVUZXh0ID0gY2l0ZVRleHRBcnJheUQudG9TdHJpbmcoKS5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVtYWRlVGV4dDtcclxufVxyXG5mdW5jdGlvbiBmaXhVbnByb3BlclVwcGVyY2FzZXModGV4dCwgbWF0Y2gsIGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHNwYWNlUmVnZXggPSAvXFxzL2c7XHJcbiAgICBjb25zdCBzcGFjZU1hdGNoZXMgPSB0ZXh0Lm1hdGNoKHNwYWNlUmVnZXgpO1xyXG4gICAgY29uc3QgdXBwZXJDYXNlc1JlcGV0aXRpb25zSW5kZXggPSB0ZXh0LmluZGV4T2YobWF0Y2gpO1xyXG4gICAgY29uc3QgcmVwZWF0ZWRMZXR0ZXIgPSBtYXRjaC5zbGljZSgwLCAxKTtcclxuICAgIGNvbnN0IHRleHRCZWZvcmVSZXBldGl0aW9ucyA9IHRleHQuc3Vic3RyaW5nKDAsIHVwcGVyQ2FzZXNSZXBldGl0aW9uc0luZGV4KTtcclxuICAgIGxldCBhZGRBY3VtdWxhdG9yID0gMDtcclxuICAgIGxldCBsb3dlcmVkUmVwZXRpdGlvbnMgPSBcIlwiO1xyXG4gICAgbG93ZXJlZFJlcGV0aXRpb25zID0gbWF0Y2gudG9Mb3dlckNhc2UoKS5zbGljZSgxKTtcclxuICAgIGlmIChzcGFjZU1hdGNoZXMpIHtcclxuICAgICAgICBpZiAoY29udGV4dCA9PT0gXCJOb0RcIiB8fFxyXG4gICAgICAgICAgICBjb250ZXh0ID09PSBcIlllc0RDb250XCIgfHxcclxuICAgICAgICAgICAgY29udGV4dCA9PSAwIHx8XHJcbiAgICAgICAgICAgIGNvbnRleHQgPT09IDIgfHxcclxuICAgICAgICAgICAgIWNvbnRleHQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQgPT09IFwiWWVzRENvbnRcIiB8fCBjb250ZXh0ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VzUmVnZXggPSAvW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XS9nO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlc01hdGNoZXMgPSB0ZXh0Lm1hdGNoKGxvd2VyY2FzZXNSZWdleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlc01hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1Mb3dlcmNhc2VzID0gbG93ZXJjYXNlc01hdGNoZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZEFjdW11bGF0b3IgKz0gbnVtTG93ZXJjYXNlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBudW1TcGFjZXMgPSBzcGFjZU1hdGNoZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBhZGRBY3VtdWxhdG9yICs9IG51bVNwYWNlcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGV4dCA9PT0gXCJZZXNEVmFsXCIgfHwgY29udGV4dCA9PT0gMSkge1xyXG4gICAgICAgICAgICBhZGRBY3VtdWxhdG9yID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENvbnRleHQgdmFsdWUgbm90IHN1aXRhYmxlYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgdGV4dEFmdGVyUmVwZXRpdGlvbnMgPSB0ZXh0LnNsaWNlKHVwcGVyQ2FzZXNSZXBldGl0aW9uc0luZGV4ICsgMSArIGxvd2VyZWRSZXBldGl0aW9ucy5sZW5ndGggLSBhZGRBY3VtdWxhdG9yLCB0ZXh0Lmxlbmd0aCArIDEpO1xyXG4gICAgY29uc3QgdGV4dEFycmF5ID0gQXJyYXkuZnJvbSh0ZXh0KTtcclxuICAgIHRleHRBcnJheS5zcGxpY2UodXBwZXJDYXNlc1JlcGV0aXRpb25zSW5kZXggKyAxLCBsb3dlcmVkUmVwZXRpdGlvbnMubGVuZ3RoLCBsb3dlcmVkUmVwZXRpdGlvbnMpO1xyXG4gICAgaWYgKGNvbnRleHQgPT09IFwiTm9EXCIgfHwgY29udGV4dCA9PSAwIHx8ICFjb250ZXh0KSB7XHJcbiAgICAgICAgdGV4dCA9XHJcbiAgICAgICAgICAgIHRleHRCZWZvcmVSZXBldGl0aW9ucyArXHJcbiAgICAgICAgICAgICAgICByZXBlYXRlZExldHRlciArXHJcbiAgICAgICAgICAgICAgICBsb3dlcmVkUmVwZXRpdGlvbnMgK1xyXG4gICAgICAgICAgICAgICAgdGV4dEFmdGVyUmVwZXRpdGlvbnM7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb250ZXh0ID09PSBcIlllc0RWYWxcIikge1xyXG4gICAgICAgIGNvbnN0IHVwcGVybG93ZXJjb21iRCA9IHRleHQubWF0Y2goL0RbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW3NTXT9bXFxzXS8pO1xyXG4gICAgICAgIGlmICh1cHBlcmxvd2VyY29tYkQpIHtcclxuICAgICAgICAgICAgaWYgKHVwcGVybG93ZXJjb21iRC5sZW5ndGggPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyZWRTID0gdXBwZXJsb3dlcmNvbWJELnRvU3RyaW5nKCkucmVwbGFjZSgvUy8sIFwic1wiKTtcclxuICAgICAgICAgICAgICAgIGxvd2VyZWRSZXBldGl0aW9ucyArPSBsb3dlcmVkUztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXh0ID0gdGV4dEJlZm9yZVJlcGV0aXRpb25zICsgbG93ZXJlZFJlcGV0aXRpb25zICsgdGV4dEFmdGVyUmVwZXRpdGlvbnM7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChjb250ZXh0ID09PSBcIlllc0RDb250XCIpIHtcclxuICAgICAgICBjb25zdCBtdWx0aXBsZUNvbmpGaXggPSAvRFthZWlvdcOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtzXVxcc1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF17Myx9LztcclxuICAgICAgICBjb25zdCBtdWx0aXBsZUNvbmpGaXhNYXRjaCA9IHRleHQubWF0Y2gobXVsdGlwbGVDb25qRml4KTtcclxuICAgICAgICBpZiAobXVsdGlwbGVDb25qRml4TWF0Y2gpIHtcclxuICAgICAgICAgICAgdGV4dCA9XHJcbiAgICAgICAgICAgICAgICB0ZXh0QmVmb3JlUmVwZXRpdGlvbnMgKyBsb3dlcmVkUmVwZXRpdGlvbnMgKyBcIlNcIiArIHRleHRBZnRlclJlcGV0aXRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHRCZWZvcmVSZXBldGl0aW9ucyArIGxvd2VyZWRSZXBldGl0aW9ucyArIHRleHRBZnRlclJlcGV0aXRpb25zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYENvbnRleHQgdmFsdWUgbm90IHN1aXRhYmxlYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxufVxyXG5mdW5jdGlvbiBmaXhGb3JjZWRVcHBlckNhc2UodGV4dEVsZW1lbnQsIHdvcmRNYXRjaCwgd01hdGNoSXRlcmF0aW9uKSB7XHJcbiAgICBsZXQgdGV4dCA9IHRleHRFbGVtZW50LnZhbHVlIHx8IHRleHRFbGVtZW50LnRleHRDb250ZW50IHx8IFwiXCI7XHJcbiAgICBjb25zdCBzdHJEbG93ZXJjYXNlID0gd01hdGNoSXRlcmF0aW9uLnRvU3RyaW5nKCk7XHJcbiAgICBjb25zdCBEVXBwZXJjYXNlZCA9IHN0ckRsb3dlcmNhc2UuY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBpZiAoRFVwcGVyY2FzZWQpIHtcclxuICAgICAgICBjb25zdCBzdHJEQWZ0ZXIgPSBzdHJEbG93ZXJjYXNlLnN1YnN0cmluZygwLCAxKSArIERVcHBlcmNhc2VkICsgc3RyRGxvd2VyY2FzZS5zdWJzdHJpbmcoMik7XHJcbiAgICAgICAgY29uc3Qgc3RyREFmdGVyTWludXNJbmQgPSAodGV4dD8ubGVuZ3RoID8/IDApIC0gc3RyREFmdGVyLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBvcHBvc2l0ZVNsaWNlZENpdGUgPSB0ZXh0Py5zbGljZShzdHJEQWZ0ZXJNaW51c0luZCk7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRTbGljZWRDaXRlID0gdGV4dD8uc2xpY2UoMCwgc3RyREFmdGVyTWludXNJbmQpO1xyXG4gICAgICAgIGlmICh3b3JkTWF0Y2gubGVuZ3RoID49IDEgJiYgc3RhcnRTbGljZWRDaXRlKVxyXG4gICAgICAgICAgICB0ZXh0ID0gc3RhcnRTbGljZWRDaXRlICsgb3Bwb3NpdGVTbGljZWRDaXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9DYXBpdGFsaXplSW5wdXRzKHRleHRFbGVtZW50KSB7XHJcbiAgICBsZXQgdGV4dCA9IHRleHRFbGVtZW50Py52YWx1ZSA/PyBudWxsO1xyXG4gICAgaWYgKGlzQXV0b2NvcnJlY3RPbiAmJiB0ZXh0KSB7XHJcbiAgICAgICAgLy9pbmljaWFsaXphw6fDo28gZGUgZXhwcmVzc8O1ZXMgcmVnZXggY29tIHNldXMgb2JqZXRvcyBlIG1hdGNoZXMgYXNzb2NpYWRvc1xyXG4gICAgICAgIGNvbnN0IG5ld1dvcmRNYXRjaGVzID0gdGV4dC5tYXRjaCgvXFxzW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXT9bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rXFxzP1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0/W2EtekEtWsOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8w4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdKi9nKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzSW5pTm90RCA9IHRleHQubWF0Y2goL1xcc1teZF0vZyk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0luaUQgPSB0ZXh0Lm1hdGNoKC9cXHNkL2cpO1xyXG4gICAgICAgIGNvbnN0IG5vdE1hdGNoZXNBZnRlckRSZWdleCA9IC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdP1xccy9nO1xyXG4gICAgICAgIGxldCBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEID0gdGV4dC5tYXRjaChub3RNYXRjaGVzQWZ0ZXJEUmVnZXgpID8/IFtdO1xyXG4gICAgICAgIGNvbnN0IGFmdGVyRFJlZ2V4T3AxID0gL1xcc2RbXmFlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZztcclxuICAgICAgICBjb25zdCBhZnRlckRSZWdleE9wMiA9IC9cXHNkW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bXnNTXFxzXS9nO1xyXG4gICAgICAgIGNvbnN0IGFmdGVyRFJlZ2V4T3AzID0gL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU11bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZztcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxID0gdGV4dC5tYXRjaChhZnRlckRSZWdleE9wMSk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiA9IHRleHQubWF0Y2goYWZ0ZXJEUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNBZnRlckRPcDMgPSB0ZXh0Lm1hdGNoKGFmdGVyRFJlZ2V4T3AzKTtcclxuICAgICAgICBjb25zdCBsb3dlcmNhc2VzUmVnZXggPSAvW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XS9nO1xyXG4gICAgICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleE9iaiA9IG5ldyBSZWdFeHAobG93ZXJjYXNlc1JlZ2V4KTtcclxuICAgICAgICBjb25zdCB1cHBlcmNhc2VzUmVnZXggPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS87XHJcbiAgICAgICAgY29uc3QgdXBwZXJjYXNlc1JlZ2V4T2JqID0gbmV3IFJlZ0V4cCh1cHBlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc1JlZ2V4ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF17Mix9L2c7XHJcbiAgICAgICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyA9IHRleHQubWF0Y2gobXVsdGlwbGVVcHBlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc1JlZ2V4MiA9IC9EW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtTXVxccy9nO1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMyID0gdGV4dC5tYXRjaChtdWx0aXBsZVVwcGVyY2FzZXNSZWdleDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AxID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1cXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AxID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDIgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMiA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AzID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XXsyLDN9XFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDMpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A0ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNCA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDQpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A1ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdezEsMn1bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rXFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNSA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDUpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A2ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A2ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNik7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDcgPSAvRFtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bc1NdL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNyA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDcpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A4ID0gL0RbQUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NdL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOCA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDgpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A5ID0gL0RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU11cXHMvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A5ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wOSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdTdGFydFJlZ2V4ID0gL15bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vO1xyXG4gICAgICAgIGNvbnN0IHdyb25nU3RhcnRNYXRjaCA9IHRleHQubWF0Y2god3JvbmdTdGFydFJlZ2V4KT8udG9TdHJpbmcoKSA/PyBudWxsO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMSA9IC9bXFxzXSpbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rW1xcc10qW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKi9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AxID0gdGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDEpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMiA9IC8kW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AyID0gdGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMyA9IC8oPzw9XFxzZEQpW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AzID0gdGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDMpO1xyXG4gICAgICAgIC8vaW5pY2lhbGl6YcOnw6NvIGRlIG91dHJhcyB2YXJpw6F2ZWlzXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICBsZXQgcmVtYWRlVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgbGV0IGlzVW5kb1VwcGVyY2FzZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc0N1cnNvckF1dG9Nb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA9PT0gMSAmJiAhbmV3V29yZE1hdGNoZXMpIHtcclxuICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSBmaXhGaXJzdExldHRlcih0ZXh0WzBdLCBhdXRvQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyUmVnZXgsIHRleHRFbGVtZW50LCByYW5nZSwgc2VsZWN0aW9uLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRleHQubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBpZiAodGV4dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wQXN0XCIpIHx8XHJcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBJZGVudGlmXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBlbmNhcHN1bGFyIGNvcnJlw6fDo28gZGUgaW7DrWNpb3MgaW5jb3JyZXRvcyBkZSBlbnRyYWRhXHJcbiAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ0NoYXJzTWF0Y2hlc09wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaVcgPSAwOyBpVyA8IHdyb25nQ2hhcnNNYXRjaGVzLmxlbmd0aDsgaVcrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd3JvbmdDaGFyTGVuZ3RoID0gd3JvbmdDaGFyc01hdGNoZXNbaVddLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzLmZvckVhY2goKHdyb25nQ2hhck1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSBmaXhXcm9uZ1N0YXJ0cyh0ZXh0LCB3cm9uZ0NoYXJNYXRjaCwgd3JvbmdDaGFyTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAod3JvbmdTdGFydE1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0Q29ycmVjdGlvbih0ZXh0RWxlbWVudC52YWx1ZSwgd3JvbmdTdGFydE1hdGNoKSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1dvcmRNYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3V29yZE1hdGNoZXMuZm9yRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGNhcGl0YWxpemFyIHBhbGF2cmFzIGFww7NzIGEgcHJpbWVpcmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiAhbGV0dGVyTWF0Y2hlc0luaUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RC5mb3JFYWNoKChsZXR0ZXJNYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVUZXh0ID0gZml4TmV4dFdvcmRzSW5pTm90RChyZW1hZGVUZXh0LCBsZXR0ZXJNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSByZW1hZGVUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nU3RhcnRDb3JyZWN0aW9uKHRleHRFbGVtZW50LnZhbHVlLCB3cm9uZ1N0YXJ0TWF0Y2gpID8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKGxldHRlck1hdGNoZXNJbmlOb3REICYmIGxldHRlck1hdGNoZXNJbmlEKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICghbGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgbGV0dGVyTWF0Y2hlc0luaUQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgY29ycmXDp8OjbyBmb2NhZGEgZW0gY29uanVuw6fDo28gY29tIERcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmIGxldHRlck1hdGNoZXNJbmlOb3REKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRCA9IFsuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0luaU5vdEQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjYXBpdGFsaXphw6fDo28gZm9jYWRhIGVtIGluaWNpYWlzIERcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQ/LmZvckVhY2goKGxldHRlck1hdGNoRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVRleHQgPSBmaXhOZXh0V29yZHNBZnRlckQocmVtYWRlVGV4dCwgbGV0dGVyTWF0Y2hEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSByZW1hZGVUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlDaGVja0xvd2VyQ2FzZXNEID0gQXJyYXkuZnJvbShsZXR0ZXJNYXRjaGVzQWZ0ZXJEID8/IFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlEID0gMDsgaUQgPCBhcnJheUNoZWNrTG93ZXJDYXNlc0QubGVuZ3RoOyBpRCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBcnJheUQgPSBsZXR0ZXJNYXRjaGVzQWZ0ZXJEPy5maWx0ZXIoKGlEKSA9PiBsb3dlcmNhc2VzUmVnZXhPYmoudGVzdChpRCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZEFycmF5RCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWRBcnJheUQgPSBmaWx0ZXJlZEFycmF5RC5tYXAoKGlEKSA9PiBpRC50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbWFkZVN0cmluZ0QgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnTGV0dGVyID0gZmlsdGVyZWRBcnJheURbaURdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdleFRhcmdMZXR0ZXIgPSBuZXcgUmVnRXhwKHRhcmdMZXR0ZXIsIFwiZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlEID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5zcGxpY2UoaUQsIDEsIG1hcHBlZEFycmF5RFswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVTdHJpbmdEID0gZmlsdGVyZWRBcnJheURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgdGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RleHRFbGVtZW50LnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaUQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnNwbGljZShpRCwgMSwgbWFwcGVkQXJyYXlEWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVN0cmluZ0QgPSBmaWx0ZXJlZEFycmF5RFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCB0ZXh0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0RWxlbWVudC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID0gdGV4dEVsZW1lbnQudmFsdWUucmVwbGFjZShyZWdleFRhcmdMZXR0ZXIsIHJlbWFkZVN0cmluZ0QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlEID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5wdXNoKG1hcHBlZEFycmF5RFtpRF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCB0ZXh0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9zdGF0ZW1lbnQgcGFyYSBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcclxuICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzIHx8IG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgZW5jYXBzdWxhciBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcclxuICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1bnByb3BlclVwcGVyY2FzZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNCB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVucHJvcGVyRFVwcGVyY2FzZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOCB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVucHJvcGVyVXBwZXJjYXNlcy5mb3JFYWNoKChtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHQgJiYgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZml4VW5wcm9wZXJVcHBlcmNhc2VzKHRleHQsIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoLCBcIk5vRFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvcnJlw6fDo28gZGUgYnVncyBjb20gY29tYmluYcOnw7VlcyBwb3N0ZXJpb3JlcyBkZSB1cHBlci9sb3dlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHVwcGVybG93ZXJjb21iID0gdGV4dC5tYXRjaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIC9bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS9nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB1cHBlcmxvd2VyY29tYkQgPSB0ZXh0Lm1hdGNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgL0RbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW1xcc10vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodXBwZXJsb3dlcmNvbWIgfHwgdXBwZXJsb3dlcmNvbWJEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICByZXBlYXRlZExldHRlciA9IHJlcGVhdGVkTGV0dGVyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZml4IHBhcmEgZGVsYXkgZW0gcHJvY2Vzc2FtZW50byBkbyBTIGVtIGNvbmp1bsOnw7Vlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwcGVybG93ZXJjb21iRFMgPSB0ZXh0Lm1hdGNoKC9EW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtTXVtcXHNdLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwcGVybG93ZXJjb21iRFMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXJsb3dlcmNvbWJEUy5zcGxpY2UoMywgMSwgXCJzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IHRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeEN1cnNvclBvc2l0aW9uKHRleHRFbGVtZW50LCByYW5nZSwgc2VsZWN0aW9uLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bnByb3BlckRVcHBlcmNhc2VzLmZvckVhY2goKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dCAmJiBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID0gZml4VW5wcm9wZXJVcHBlcmNhc2VzKHRleHQsIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoLCBcIlllc0RWYWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeEN1cnNvclBvc2l0aW9uKHRleHRFbGVtZW50LCByYW5nZSwgc2VsZWN0aW9uLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3N0YXRlbWVudCBwYXJhIGNvbnRyb2xlIGRlIGNvbWJpbmHDp8OjbyBhcMOzcyBlbnRyYWRhIGNvbSBpbmljaWFsIERcclxuICAgICAgICAgICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcclxuICAgICAgICAgICAgICAgICAgICAhKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldHRlck5vdE1hdGNoZXNBZnRlckQgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vc3RhdGVtZW50IHBhcmEgZmx1eG8gdmFsaWRhbmRvIG1hdGNoIGRlIGluaWNpYWlzXHJcbiAgICAgICAgICAgICAgICBpZiAobGV0dGVyTWF0Y2hlc0luaUQgfHwgbGV0dGVyTWF0Y2hlc0luaU5vdEQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBmb3LDp2FyIHVwcGVyIGNhc2VcclxuICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JkTWF0Y2ggPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBETWF0Y2ggPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlNID0gMDsgaU0gPCB3b3JkTWF0Y2gubGVuZ3RoOyBpTSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cHBlcmNhc2VUZXN0ID0gdXBwZXJjYXNlc1JlZ2V4T2JqLnRlc3Qod29yZE1hdGNoW2lNXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBwZXJjYXNlVGVzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID0gZml4Rm9yY2VkVXBwZXJDYXNlKHRleHRFbGVtZW50LCB3b3JkTWF0Y2gsIHdvcmRNYXRjaFtpTV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKERNYXRjaC5mbGF0KDEpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIHRleHRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgZmF6ZXIgY29ycmXDp8O1ZXMgYWRpY2lvbmFpcyBubyBmaW5hbCBkYSBlZGnDp8OjbyBhdXRvbcOhdGljYVxyXG4gICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWU/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AxLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWU/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AyLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWU/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AzLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5tYXRjaCgvXFxzW1xcc10rL2cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlPy5yZXBsYWNlQWxsKC9cXHNbXFxzXSsvZywgXCIgXCIpID8/IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0Lm1hdGNoKC9eW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XS8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0TGV0dGVyQ2FwaXRhbGl6ZWQgPSB0ZXh0LnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3RPZlRleHQgPSB0ZXh0LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IGZpcnN0TGV0dGVyQ2FwaXRhbGl6ZWQgKyByZXN0T2ZUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9DYXBpdGFsaXplQ2l0ZShlZGl0YWJsZUNpdGUpIHtcclxuICAgIGNvbnN0IGNpdGVUZXh0ID0gZWRpdGFibGVDaXRlPy50ZXh0Q29udGVudCA/PyBudWxsO1xyXG4gICAgaWYgKGlzQXV0b2NvcnJlY3RPbiAmJiBjaXRlVGV4dCkge1xyXG4gICAgICAgIC8vaW5pY2lhbGl6YcOnw6NvIGRlIGV4cHJlc3PDtWVzIHJlZ2V4IGNvbSBzZXVzIG9iamV0b3MgZSBtYXRjaGVzIGFzc29jaWFkb3NcclxuICAgICAgICBjb25zdCBuZXdXb3JkTWF0Y2hlcyA9IGNpdGVUZXh0Lm1hdGNoKC9cXHNbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdP1thLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStcXHM/W0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXT9bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0qL2cpO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNJbmlOb3REID0gY2l0ZVRleHQubWF0Y2goL1xcc1teZF0vZyk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0luaUQgPSBjaXRlVGV4dC5tYXRjaCgvXFxzZC9nKTtcclxuICAgICAgICBjb25zdCBub3RNYXRjaGVzQWZ0ZXJEUmVnZXggPSAvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXT9cXHMvZztcclxuICAgICAgICBsZXQgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCA9IGNpdGVUZXh0Lm1hdGNoKG5vdE1hdGNoZXNBZnRlckRSZWdleCkgPz8gW107XHJcbiAgICAgICAgY29uc3QgYWZ0ZXJEUmVnZXhPcDEgPSAvXFxzZFteYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS9nO1xyXG4gICAgICAgIGNvbnN0IGFmdGVyRFJlZ2V4T3AyID0gL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NcXHNdL2c7XHJcbiAgICAgICAgY29uc3QgYWZ0ZXJEUmVnZXhPcDMgPSAvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXVthLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS9nO1xyXG4gICAgICAgIGNvbnN0IGxldHRlck1hdGNoZXNBZnRlckRPcDEgPSBjaXRlVGV4dC5tYXRjaChhZnRlckRSZWdleE9wMSk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiA9IGNpdGVUZXh0Lm1hdGNoKGFmdGVyRFJlZ2V4T3AyKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzID0gY2l0ZVRleHQubWF0Y2goYWZ0ZXJEUmVnZXhPcDMpO1xyXG4gICAgICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleCA9IC9bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdL2c7XHJcbiAgICAgICAgY29uc3QgbG93ZXJjYXNlc1JlZ2V4T2JqID0gbmV3IFJlZ0V4cChsb3dlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIC8vIGNvbnN0IGxvd2VyY2FzZXNNYXRjaGVzID0gY2l0ZVRleHQubWF0Y2gobG93ZXJjYXNlc1JlZ2V4KTtcclxuICAgICAgICBjb25zdCB1cHBlcmNhc2VzUmVnZXggPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS87XHJcbiAgICAgICAgY29uc3QgdXBwZXJjYXNlc1JlZ2V4T2JqID0gbmV3IFJlZ0V4cCh1cHBlcmNhc2VzUmVnZXgpO1xyXG4gICAgICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc1JlZ2V4ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF17Mix9L2c7XHJcbiAgICAgICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyA9IGNpdGVUZXh0Lm1hdGNoKG11bHRpcGxlVXBwZXJjYXNlc1JlZ2V4KTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMSA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdXFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMSA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AxKTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMiA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AyID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AzID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XXsyLDN9XFxiL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AzKTtcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNCA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDQgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNCk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDUgPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF17MSwyfVtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEEtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A1ID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDUpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A2ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A2ID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDYpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A3ID0gL0RbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXS9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDcgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNyk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDggPSAvRFtBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW15zU10vZztcclxuICAgICAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A4ID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDgpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A5ID0gL0RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtzXVxccy9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDkgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wOSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdTdGFydFJlZ2V4ID0gL15bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vO1xyXG4gICAgICAgIGNvbnN0IHdyb25nU3RhcnRNYXRjaCA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nU3RhcnRSZWdleCk/LnRvU3RyaW5nKCkgPz8gbnVsbDtcclxuICAgICAgICBjb25zdCB3cm9uZ0NoYXJzUmVnZXhPcDEgPSAvW1xcc10qW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dK1tcXHNdKltcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXSovZztcclxuICAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlc09wMSA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMSk7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AyID0gLyRbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rL2c7XHJcbiAgICAgICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDIgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDIpO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMyA9IC8oPzw9XFxzZEQpW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xyXG4gICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AzID0gY2l0ZVRleHQubWF0Y2god3JvbmdDaGFyc1JlZ2V4T3AzKTtcclxuICAgICAgICAvL2luaWNpYWxpemHDp8OjbyBkZSBvdXRyYXMgdmFyacOhdmVpc1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgbGV0IHJlbWFkZUNpdGVUZXh0ID0gY2l0ZVRleHQ7XHJcbiAgICAgICAgbGV0IGlzQ3Vyc29yQXV0b01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzQWxlcnRNYWRlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzU3BhbkFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc1VuZG9VcHBlcmNhc2UgPSBmYWxzZTtcclxuICAgICAgICAvL3N0YXRlbWVudCBwYXJhIGRpZmVyZW5jaWFyIGluw61jaW8gZG8gcmVzdGFudGUgZG8gaW5wdXRcclxuICAgICAgICBpZiAoY2l0ZVRleHQubGVuZ3RoID09PSAxICYmICFuZXdXb3JkTWF0Y2hlcykge1xyXG4gICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSBmaXhGaXJzdExldHRlcihjaXRlVGV4dFswXSwgYXV0b0NhcGl0YWxpemVGaXJzdExldHRlclJlZ2V4LCBlZGl0YWJsZUNpdGUsIHJhbmdlLCBzZWxlY3Rpb24sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjaXRlVGV4dC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIC8vSUlGRSBwYXJhIGVuY2Fwc3VsYXIgY29ycmXDp8OjbyBkZSBpbsOtY2lvcyBpbmNvcnJldG9zIGRlIGVudHJhZGFcclxuICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXNPcDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlXID0gMDsgaVcgPCB3cm9uZ0NoYXJzTWF0Y2hlcy5sZW5ndGg7IGlXKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd3JvbmdDaGFyTGVuZ3RoID0gd3JvbmdDaGFyc01hdGNoZXNbaVddLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXMuZm9yRWFjaCgod3JvbmdDaGFyTWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeFdyb25nU3RhcnRzKGNpdGVUZXh0LCB3cm9uZ0NoYXJNYXRjaCwgd3JvbmdDaGFyTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICBpZiAod3JvbmdTdGFydE1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSB3cm9uZ1N0YXJ0Q29ycmVjdGlvbihlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIHdyb25nU3RhcnRNYXRjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ld1dvcmRNYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdXb3JkTWF0Y2hlcy5mb3JFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjYXBpdGFsaXphciBwYWxhdnJhcyBhcMOzcyBhIHByaW1laXJhXHJcbiAgICAgICAgICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlOb3REICYmICFsZXR0ZXJNYXRjaGVzSW5pRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0luaU5vdEQuZm9yRWFjaCgobGV0dGVyTWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVDaXRlVGV4dCA9IGZpeE5leHRXb3Jkc0luaU5vdEQocmVtYWRlQ2l0ZVRleHQsIGxldHRlck1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gcmVtYWRlQ2l0ZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSB3cm9uZ1N0YXJ0Q29ycmVjdGlvbihlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIHdyb25nU3RhcnRNYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKGxldHRlck1hdGNoZXNJbmlOb3REICYmIGxldHRlck1hdGNoZXNJbmlEKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiBsZXR0ZXJNYXRjaGVzSW5pRCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGNvcnJlw6fDo28gZm9jYWRhIGVtIGNvbmp1bsOnw6NvIGNvbSBEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiYgbGV0dGVyTWF0Y2hlc0luaU5vdEQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbLi4uKGxldHRlck1hdGNoZXNJbmlOb3REIHx8IFtdKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0luaU5vdEQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSUlGRSBwYXJhIGNhcGl0YWxpemHDp8OjbyBmb2NhZGEgZW0gaW5pY2lhaXMgRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQuZm9yRWFjaCgobGV0dGVyTWF0Y2hEKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVDaXRlVGV4dCA9IGZpeE5leHRXb3Jkc0FmdGVyRChyZW1hZGVDaXRlVGV4dCwgbGV0dGVyTWF0Y2hEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IHJlbWFkZUNpdGVUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheUNoZWNrTG93ZXJDYXNlc0QgPSBBcnJheS5mcm9tKGxldHRlck1hdGNoZXNBZnRlckQgPz8gW10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpRCA9IDA7IGlEIDwgYXJyYXlDaGVja0xvd2VyQ2FzZXNELmxlbmd0aDsgaUQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBcnJheUQgPSBsZXR0ZXJNYXRjaGVzQWZ0ZXJEPy5maWx0ZXIoKGlEKSA9PiBsb3dlcmNhc2VzUmVnZXhPYmoudGVzdChpRCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkQXJyYXlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwcGVkQXJyYXlEID0gZmlsdGVyZWRBcnJheUQubWFwKChpRCkgPT4gaUQudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbWFkZVN0cmluZ0QgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdMZXR0ZXIgPSBmaWx0ZXJlZEFycmF5RFtpRF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnZXhUYXJnTGV0dGVyID0gbmV3IFJlZ0V4cCh0YXJnTGV0dGVyLCBcImdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlEID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVTdHJpbmdEID0gZmlsdGVyZWRBcnJheURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChcIixcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKGlzQ3Vyc29yQXV0b01vdmVkLCBpc1VuZG9VcHBlcmNhc2UsIHdyb25nU3RhcnRNYXRjaCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlEID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVTdHJpbmdEID0gZmlsdGVyZWRBcnJheURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChcIixcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQucmVwbGFjZShyZWdleFRhcmdMZXR0ZXIsIHJlbWFkZVN0cmluZ0QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlEID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQucHVzaChtYXBwZWRBcnJheURbaURdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgZW5jYXBzdWxhciBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcclxuICAgICAgICAgICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5wcm9wZXJVcHBlcmNhc2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4obXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AxIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A0IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDUgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNiB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bnByb3BlckRVcHBlcmNhc2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNyB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A4IHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDkgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgdW5wcm9wZXJVcHBlcmNhc2VzLmZvckVhY2goKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaXRlVGV4dCAmJiBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4VW5wcm9wZXJVcHBlcmNhc2VzKGNpdGVUZXh0LCBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCwgXCJOb0RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KGlzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5wcm9wZXJEVXBwZXJjYXNlcy5mb3JFYWNoKChtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2l0ZVRleHQgJiYgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeFVucHJvcGVyVXBwZXJjYXNlcyhjaXRlVGV4dCwgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gsIFwiWWVzRENvbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoaXNDdXJzb3JBdXRvTW92ZWQsIGlzVW5kb1VwcGVyY2FzZSwgd3JvbmdTdGFydE1hdGNoLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KGlzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vc3RhdGVtZW50IHBhcmEgY29ycmXDp8OjbyBkZSBibG9jb3MgYXDDs3MgaW5pY2lhbCBjb20gRFxyXG4gICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pRCAmJlxyXG4gICAgICAgICAgICBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXHJcbiAgICAgICAgICAgICEobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxyXG4gICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMiB8fFxyXG4gICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMykpIHtcclxuICAgICAgICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3N0YXRlbWVudCBwYXJhIGNvcnJlw6fDo28gZGUgbcO6bHRpcGxvcyB1cHBlciBjYXNlcyBmb3LDp2Fkb3MgaW5kZXZpZGFtZW50ZVxyXG4gICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pRCB8fCBsZXR0ZXJNYXRjaGVzSW5pTm90RCkge1xyXG4gICAgICAgICAgICAvL0lJRkUgcGFyYSBmb3LDp2FyIHVwcGVyIGNhc2VcclxuICAgICAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmRNYXRjaCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IERNYXRjaCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpTSA9IDA7IGlNIDwgd29yZE1hdGNoLmxlbmd0aDsgaU0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwcGVyY2FzZVRlc3QgPSB1cHBlcmNhc2VzUmVnZXhPYmoudGVzdCh3b3JkTWF0Y2hbaU1dKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXBwZXJjYXNlVGVzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4Rm9yY2VkVXBwZXJDYXNlKGVkaXRhYmxlQ2l0ZSwgd29yZE1hdGNoLCB3b3JkTWF0Y2hbaU1dKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoRE1hdGNoLmZsYXQoMSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3Jkcyhpc0N1cnNvckF1dG9Nb3ZlZCwgaXNVbmRvVXBwZXJjYXNlLCB3cm9uZ1N0YXJ0TWF0Y2gsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlXSA9IGNyZWF0ZVNwYW5BbGVydChpc1NwYW5BY3RpdmUsIGlzQWxlcnRNYWRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vSUlGRSBwYXJhIGZhemVyIGNvcnJlw6fDtWVzIG5vIGZpbmFsIGRhIGVkacOnw6NvIGF1dG9tw6F0aWNhXHJcbiAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AxKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDEsIFwiXCIpID8/IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgZWRpdGFibGVDaXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDIpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50Py5yZXBsYWNlQWxsKHdyb25nQ2hhcnNSZWdleE9wMiwgXCJcIikgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AzLCBcIlwiKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudD8ubWF0Y2goL1xcc1tcXHNdKy9nKSkge1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwoL1xcc1tcXHNdKy9nLCBcIiBcIikgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuICAgIC8vZGVjbGFyYcOnw7VlcyBkZSBmdW7Dp8O1ZXMgbG9jYWlzXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTcGFuQWxlcnQoaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZSkge1xyXG4gICAgICAgIGNvbnN0IHJnYmFSZWdleCA9IC9yZ2JhXFwoKFxcZCspLCAoXFxkKyksIChcXGQrKSwgKFtcXGQuXSspXFwpLztcclxuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlUmVnZXggPSAvLFxcZCsuP1xcZCouP1xcZCovZztcclxuICAgICAgICBpZiAoZWRpdGFibGVDaXRlLm5leHRFbGVtZW50U2libGluZyAmJlxyXG4gICAgICAgICAgICBlZGl0YWJsZUNpdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0Q2l0ZUVsZW1lbnRTaWJsaW5nID0gZWRpdGFibGVDaXRlLm5leHRFbGVtZW50U2libGluZy5pZDtcclxuICAgICAgICAgICAgaWYgKG5leHRDaXRlRWxlbWVudFNpYmxpbmcgPT09IFwiZGVhY3RBdXRvY29ycmVjdEJ0blwiICYmICFpc1NwYW5BY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnNvclJlc2V0QWxlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNBbGVydE1hZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LnRleHRDb250ZW50ID0gXCJDdXJzb3IgcmVzZXRhZG8hIEFwZXJ0ZSBhbGd1bWEgdGVjbGFcIjtcclxuICAgICAgICAgICAgICAgICAgICBpc0FsZXJ0TWFkZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUucGFyZW50Tm9kZT8uaW5zZXJ0QmVmb3JlKGN1cnNvclJlc2V0QWxlcnQsIGVkaXRhYmxlQ2l0ZS5uZXh0U2libGluZyk7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYnJpZWZBbGVydFwiKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJicmllZkFsZXJ0Q2l0ZVwiKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc3R5bGUuc2V0UHJvcGVydHkoXCJib3JkZXItY29sb3JcIiwgXCJ3aGl0ZVwiKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc3R5bGUuc2V0UHJvcGVydHkoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuICAgICAgICAgICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc3R5bGUuc2V0UHJvcGVydHkoXCJmb250LXNpemVcIiwgXCI4cHhcIik7XHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUuc3R5bGUuc2V0UHJvcGVydHkoXCJib3JkZXItY29sb3JcIiwgXCJyZ2JhKDI1NSwgMTY1LCAwLCAwLjkpXCIpOyAvL2FsZXJ0YXIgdXN1w6FyaW8gZGEgbXVkYW7Dp2EgZGUgY3Vyc29yIGRldmlkbyDDoCByZWNvbnN0cnXDp8OjbyBkbyB0ZXh0Q29udGVudCBlZGl0w6F2ZWxcclxuICAgICAgICAgICAgICAgIGlzU3BhbkFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlQ2l0ZSA9IHdpbmRvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZShlZGl0YWJsZUNpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKFwiYm9yZGVyLWNvbG9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJnYmFNYXRjaCA9IGNvbXB1dGVkU3R5bGVDaXRlLm1hdGNoKHJnYmFSZWdleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJnYmFNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWR1Y2VPcGFjaXR5ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9wcGVkQXJyYXkgPSByZ2JhTWF0Y2gucG9wKCk7IC8vZmF6IGEgcmV0aXJhZGEgaW5pY2lhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0clVwZGF0ZWRBbHBoYSA9IHBvcHBlZEFycmF5Py50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyUmdiYSA9IHJnYmFNYXRjaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwoY29tcHV0ZWRTdHlsZVJlZ2V4LCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0U2xpY2VTdHJSZ2JhID0gc3RyUmdiYS5zbGljZSgwLCAxOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyTmV3T3BhY2l0eVZhbHVlID0gZmlyc3RTbGljZVN0clJnYmEgKyBcIiBcIiArIHN0clVwZGF0ZWRBbHBoYSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0clVwZGF0ZWRBbHBoYSAmJiBzdHJVcGRhdGVkQWxwaGEgPD0gXCIwLjA1XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJVcGRhdGVkQWxwaGEgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJOZXdPcGFjaXR5VmFsdWUgPSBmaXJzdFNsaWNlU3RyUmdiYSArIFwiMClcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocmVkdWNlT3BhY2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUuc3R5bGUuc2V0UHJvcGVydHkoXCJib3JkZXItY29sb3JcIiwgc3RyTmV3T3BhY2l0eVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5leHRDaXRlRWxlbWVudFNpYmxpbmcgPT09IFwiYnJpZWZBbGVydENpdGVcIiB8fCBpc1NwYW5BY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIC8vYWxndW0gZWZlaXRvIHZpc3VhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZpcnN0Q2xpY2soZWRpdGFibGVDaXRlKSB7XHJcbiAgICBpZiAoZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID09PSBcIkluc2lyYSBTZXUgTm9tZSBBcXVpXCIpIHtcclxuICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgbGV0IGN1cnNvclBvc2l0aW9uID0gMDtcclxuICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBjdXJzb3JQb3NpdGlvbiA9IEdsb2JhbEhhbmRsZXIuY3Vyc29yQ2hlY2tUaW1lcihjdXJzb3JQb3NpdGlvbikgPz8gMDtcclxuICAgIH0sIDMwMDApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hBdXRvY29ycmVjdChjbGljaywgZGVhY3RBdXRvY29ycmVjdEJ0bikge1xyXG4gICAgaWYgKGNsaWNrLnRhcmdldCA9PT0gZGVhY3RBdXRvY29ycmVjdEJ0bikge1xyXG4gICAgICAgIGlzQXV0b2NvcnJlY3RPbiA9ICFpc0F1dG9jb3JyZWN0T247IC8vc2ltcGxpZmljYcOnw6NvIGRlIGlmLWVsc2U7IGlmLWlmIG7Do28gZnVuY2lvbmEgYXF1aVxyXG4gICAgICAgIGRlYWN0QXV0b2NvcnJlY3RCdG4udGV4dENvbnRlbnQgPSBpc0F1dG9jb3JyZWN0T25cclxuICAgICAgICAgICAgPyBcIkRlc2F0aXZhciBBdXRvY29ycmXDp8Ojb1wiXHJcbiAgICAgICAgICAgIDogXCJBdGl2YXIgQXV0b2NvcnJlw6fDo29cIjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tBbGxHZW5Db250cyhnZW4sIGdlbkJpcnRoUmVsLCBnZW5UcmFucywgZ2VuRmlzQWxpbikge1xyXG4gICAgbGV0IGlzR2VuVmFsaWQgPSBmYWxzZTtcclxuICAgIGxldCBpc0dlbkJpcnRoUmVsVmFsaWQgPSBmYWxzZTtcclxuICAgIGxldCBpc0dlblRyYW5zQ29udFZhbGlkID0gZmFsc2U7XHJcbiAgICBsZXQgaXNHZW5GaXNBbGluVmFsaWQgPSBmYWxzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKGdlbiAmJiBnZW4gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBpc0dlblZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gZ2VuOiBlbGVtZW50byAke2dlbn0sIGluc3TDom5jaWEgJHtnZW4gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudH1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3JHZW4pIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yR2VuLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChnZW5CaXJ0aFJlbCAmJiBnZW5CaXJ0aFJlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlzR2VuQmlydGhSZWxWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGdlbjogZWxlbWVudG8gJHtnZW5CaXJ0aFJlbH0sIGluc3TDom5jaWEgJHtnZW5CaXJ0aFJlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50fWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvckdlbkJpcnRoUmVsKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvckdlbkJpcnRoUmVsLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChnZW5UcmFucyAmJiBnZW5UcmFucyBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlzR2VuVHJhbnNDb250VmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBnZW5UcmFuczogZWxlbWVudG8gJHtnZW5UcmFuc30sIGluc3TDom5jaWEgJHtnZW5UcmFucyBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50fWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvckdlblRyYW5zKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvckdlblRyYW5zLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChnZW5GaXNBbGluICYmIGdlbkZpc0FsaW4gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICBpc0dlbkZpc0FsaW5WYWxpZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIGdlbkZpc0FsaW46IGVsZW1lbnRvICR7Z2VuRmlzQWxpbn0sIGluc3TDom5jaWEgJHtnZW5GaXNBbGluIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yR2VuRmlzQWxpbikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JHZW5GaXNBbGluLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXHJcbiAgICB9XHJcbiAgICBpZiAoaXNHZW5WYWxpZCAmJlxyXG4gICAgICAgIGlzR2VuQmlydGhSZWxWYWxpZCAmJlxyXG4gICAgICAgIGlzR2VuVHJhbnNDb250VmFsaWQgJiZcclxuICAgICAgICBpc0dlbkZpc0FsaW5WYWxpZCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm8gdmVyaWZpY2FuZG8gYm9vbGVhbm9zIGRlIGNvbnRhaW5lcnMgZGUgZ8OqbmVyb1wiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZsdXhHZW4oZ2VuLCBnZW5JbmlWYWx1ZSwgZ2VuQmlydGhSZWwsIGdlblRyYW5zLCBnZW5GaXNBbGluKSB7XHJcbiAgICBsZXQgZ2VuVmFsdWUgPSBcIlwiO1xyXG4gICAgaWYgKGdlbi52YWx1ZSA9PT0gXCJtYXNjdWxpbm9cIiB8fCBnZW4udmFsdWUgPT09IFwiZmVtaW5pbm9cIikge1xyXG4gICAgICAgIGlmIChnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJjaXNcIikge1xyXG4gICAgICAgICAgICBnZW5WYWx1ZSA9IGdlbkluaVZhbHVlID8/IGdlbi52YWx1ZTtcclxuICAgICAgICAgICAgaGlkZUdlbkZpc0FsaW4oZ2VuRmlzQWxpbik7XHJcbiAgICAgICAgICAgIGhpZGVTdGdUcmFuc0hvcm0oZ2VuVHJhbnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGdlbkJpcnRoUmVsLnZhbHVlID09PSBcInRyYW5zXCIpIHtcclxuICAgICAgICAgICAgc2hvd1N0Z1RyYW5zSG9ybShnZW5UcmFucyk7XHJcbiAgICAgICAgICAgIGlmIChnZW5UcmFucy52YWx1ZSA9PT0gXCJhdmFuY2Fkb1wiKSB7XHJcbiAgICAgICAgICAgICAgICBnZW5WYWx1ZSA9IGdlbkluaVZhbHVlID8/IGdlbi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGhpZGVHZW5GaXNBbGluKGdlbkZpc0FsaW4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGdlblRyYW5zLnZhbHVlID09PSBcInVuZGVmaW5lZFwiIHx8XHJcbiAgICAgICAgICAgICAgICBnZW5UcmFucy52YWx1ZSA9PT0gXCJub1wiIHx8XHJcbiAgICAgICAgICAgICAgICBnZW5UcmFucy52YWx1ZSA9PT0gXCJpbmljaWFsXCIgfHxcclxuICAgICAgICAgICAgICAgIGdlblRyYW5zLnZhbHVlID09PSBcImludGVybWVkaWFyaW9cIikge1xyXG4gICAgICAgICAgICAgICAgc2hvd0dlbkZpc0FsaW4oZ2VuRmlzQWxpbik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250RmVtaW5pbGl6YWRvID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignb3B0aW9uW3ZhbHVlPVwiZmVtaW5pbGl6YWRvXCJdJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250TWFzY3VsaW5pemFkbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ29wdGlvblt2YWx1ZT1cIm1hc2N1bGluaXphZG9cIl0nKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250RmVtaW5pbGl6YWRvIGluc3RhbmNlb2YgSFRNTE9wdGlvbkVsZW1lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICBjb250TWFzY3VsaW5pemFkbyBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdlblRyYW5zLnZhbHVlID09PSBcImludGVybWVkaWFyaW9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuLnZhbHVlID09PSBcIm1hc2N1bGlub1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0ZlbVNlbGVjdGVkID0gY29udEZlbWluaWxpemFkbz8uc2VsZWN0ZWQgPz8gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGZW1TZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRGZW1pbmlsaXphZG8ucmVtb3ZlQXR0cmlidXRlKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250TWFzY3VsaW5pemFkby5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2VuLnZhbHVlID09PSBcImZlbWluaW5vXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTWFzY1NlbGVjdGVkID0gY29udE1hc2N1bGluaXphZG8/LnNlbGVjdGVkID8/IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWFzY1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udE1hc2N1bGluaXphZG8ucmVtb3ZlQXR0cmlidXRlKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250RmVtaW5pbGl6YWRvLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0ZlbVNlbGVjdGVkID0gY29udEZlbWluaWxpemFkbz8uc2VsZWN0ZWQgPz8gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTWFzY1NlbGVjdGVkID0gY29udE1hc2N1bGluaXphZG8/LnNlbGVjdGVkID8/IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXNjU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRNYXNjdWxpbml6YWRvLnJlbW92ZUF0dHJpYnV0ZShcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZlbVNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250RmVtaW5pbGl6YWRvLnJlbW92ZUF0dHJpYnV0ZShcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibWFzY3VsaW5pemFkb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuVmFsdWUgPSBcIm1hc2N1bGlub1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwiZmVtaW5pbGl6YWRvXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZW5WYWx1ZSA9IFwiZmVtaW5pbm9cIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm5ldXRyb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuVmFsdWUgPSBcIm5ldXRyb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJvdXRyb3NcIiB8fFxyXG4gICAgICAgICAgICBnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBzaG93R2VuRmlzQWxpbihnZW5GaXNBbGluKTtcclxuICAgICAgICAgICAgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibWFzY3VsaW5pemFkb1wiKSB7XHJcbiAgICAgICAgICAgICAgICBnZW5WYWx1ZSA9IFwibWFzY3VsaW5vXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJmZW1pbmlsaXphZG9cIikge1xyXG4gICAgICAgICAgICAgICAgZ2VuVmFsdWUgPSBcImZlbWluaW5vXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJuZXV0cm9cIikge1xyXG4gICAgICAgICAgICAgICAgZ2VuVmFsdWUgPSBcIm5ldXRyb1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZ2VuLnZhbHVlID09PSBcIm5hb0JpbmFyaW9cIiB8fFxyXG4gICAgICAgIGdlbi52YWx1ZSA9PT0gXCJvdXRyb3NcIiB8fFxyXG4gICAgICAgIGdlbi52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGlmIChnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJ0cmFuc1wiKSB7XHJcbiAgICAgICAgICAgIHNob3dTdGdUcmFuc0hvcm0oZ2VuVHJhbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaGlkZVN0Z1RyYW5zSG9ybShnZW5UcmFucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNob3dHZW5GaXNBbGluKGdlbkZpc0FsaW4pO1xyXG4gICAgICAgIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm1hc2N1bGluaXphZG9cIikge1xyXG4gICAgICAgICAgICBnZW5WYWx1ZSA9IFwibWFzY3VsaW5vXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJmZW1pbmlsaXphZG9cIikge1xyXG4gICAgICAgICAgICBnZW5WYWx1ZSA9IFwiZmVtaW5pbm9cIjtcclxuICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm5ldXRyb1wiKSB7XHJcbiAgICAgICAgICAgIGdlblZhbHVlID0gXCJuZXV0cm9cIjtcclxuICAgICAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoXCJvYnRlbmRvIGdlbi52YWx1ZVwiLCBnZW4/LnZhbHVlID8/IFwiVU5ERUZJTkVEIFZBTFVFXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBnZW5WYWx1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0dlbkZpc0FsaW4oZ2VuRmlzQWxpbikge1xyXG4gICAgaWYgKGdlbkZpc0FsaW4pIHtcclxuICAgICAgICBnZW5GaXNBbGluLmNsb3Nlc3QoXCIuc3BhbkZzQW5hbUdcIik/LnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbmEgYWJlcnR1cmEgZGUgZ2VuRmlzQWxpblwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaGlkZUdlbkZpc0FsaW4oZ2VuRmlzQWxpbikge1xyXG4gICAgaWYgKGdlbkZpc0FsaW4pIHtcclxuICAgICAgICBnZW5GaXNBbGluLmNsb3Nlc3QoXCIuc3BhbkZzQW5hbUdcIik/LnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcIlwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvIG5vIGZlY2hhbWVudG8gZGUgZ2VuRmlzQWxpblwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd1N0Z1RyYW5zSG9ybShnZW5UcmFucykge1xyXG4gICAgaWYgKGdlblRyYW5zKSB7XHJcbiAgICAgICAgZ2VuVHJhbnMuY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8ucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiRXJybyBuYSBhYmVydHVyYSBkZSBnZW5UcmFuc1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaGlkZVN0Z1RyYW5zSG9ybShnZW5UcmFucykge1xyXG4gICAgaWYgKGdlblRyYW5zKSB7XHJcbiAgICAgICAgZ2VuVHJhbnMuY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8uc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwiXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gZmVjaGFtZW50byBkZSBnZW5UcmFuc1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVySWRzQnlHZW5kZXIoYXJyYXlJZHMsIGJvZHlUeXBlKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnJheUlkcykpIHtcclxuICAgICAgICBpZiAoYXJyYXlJZHMuZXZlcnkoKHByb3ApID0+IHR5cGVvZiBwcm9wID09PSBcInN0cmluZ1wiKSAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgYm9keVR5cGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgZ2VuZGVyZWRJZHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHNsaWNlZEVycm9yID0gXCJcIjtcclxuICAgICAgICAgICAgc3dpdGNoIChib2R5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1hc2N1bGlub1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlNID0gMDsgaU0gPCBhcnJheUlkcy5sZW5ndGg7IGlNKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5SWRzW2lNXSA9PT0gXCJwZWl0XCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lNXSA9PT0gXCJhYmRcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJZHNbaU1dID09PSBcImNveGFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZGVyZWRJZHMucHVzaChhcnJheUlkc1tpTV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImZlbWluaW5vXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaUYgPSAwOyBpRiA8IGFycmF5SWRzLmxlbmd0aDsgaUYrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlJZHNbaUZdID09PSBcInRyaWNwXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lGXSA9PT0gXCJzdXByYWlsXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lGXSA9PT0gXCJjb3hhXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmRlcmVkSWRzLnB1c2goYXJyYXlJZHNbaUZdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJuZXV0cm9cIjpcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpTiA9IDA7IGlOIDwgYXJyYXlJZHMubGVuZ3RoOyBpTisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJheUlkc1tpTl0gPT09IFwicGVpdFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUlkc1tpTl0gPT09IFwiYWJkXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5SWRzW2lOXSA9PT0gXCJ0cmljcFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUlkc1tpTl0gPT09IFwic3VwcmFpbFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUlkc1tpTl0gPT09IFwiY294YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZGVyZWRJZHMucHVzaChhcnJheUlkc1tpTl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpY2VkRXJyb3IgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5zdHJpbmdFcnJvcihgb2J0ZW5kbyBib2R5VHlwZSB2w6FsaWRvYCwgYm9keVR5cGUgPz8gbnVsbCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBnZW5kZXJlZElkcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLnR5cGVFcnJvcihgdmFsaWRhbmRvIGVsZW1lbnRvcyBwYXJhIGRlZmluacOnw6NvIGRlIGfDqm5lcm8gY29tbyBzdHJpbmdzYCwgYm9keVR5cGUgPz8gbnVsbCwgXCJzdHJpbmdcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gYXJyYXkgZW0gZmlsdGVySWRzQnlHZW5kZXIoKWApO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBlcnNvbkluc3RhbmNlKHBlcnNvbikge1xyXG4gICAgaWYgKHR5cGVvZiBwZXJzb24uZ2VuID09PSBcInN0cmluZ1wiICYmIHBlcnNvbi5nZW4gIT09IFwiXCIpIHtcclxuICAgICAgICBpZiAocGVyc29uLmdlbiA9PT0gXCJtYXNjdWxpbm9cIikge1xyXG4gICAgICAgICAgICBwZXJzb24gPSBuZXcgTWFuKHBlcnNvbi5nZW4sIHBlcnNvbi5hZ2UsIHBlcnNvbi53ZWlnaHQsIHBlcnNvbi5oZWlnaHQsIHBlcnNvbi5zdW1EQ3V0LCBwZXJzb24uYXR2THZsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocGVyc29uLmdlbiA9PT0gXCJmZW1pbmlub1wiKSB7XHJcbiAgICAgICAgICAgIHBlcnNvbiA9IG5ldyBXb21hbihwZXJzb24uZ2VuLCBwZXJzb24uYWdlLCBwZXJzb24ud2VpZ2h0LCBwZXJzb24uaGVpZ2h0LCBwZXJzb24uc3VtREN1dCwgcGVyc29uLmF0dkx2bCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHBlcnNvbi5nZW4gPT09IFwibmV1dHJvXCIpIHtcclxuICAgICAgICAgICAgcGVyc29uID0gbmV3IE5ldXRybyhwZXJzb24uZ2VuLCBwZXJzb24uYWdlLCBwZXJzb24ud2VpZ2h0LCBwZXJzb24uaGVpZ2h0LCBwZXJzb24uc3VtREN1dCwgcGVyc29uLmF0dkx2bCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5zdHJpbmdFcnJvcihcInBlcnNvbi5nZW5cIiwgcGVyc29uPy5nZW4gPz8gbnVsbCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFwicGVyc29uLmdlblwiLCBwZXJzb24/LmdlbiA/PyBudWxsLCBcInN0cmluZ1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGVyc29uO1xyXG59XHJcbiIsIi8vbmVzc2UgZmlsZSBlc3TDo28gcHJlc2VudGVzIHByaW5jaXBhbG1lbnRlIGFzIGZ1bsOnw7VlcyBkZSBtYW5pcHVsYcOnw6NvIGRpbsOibWljYSBkZSB0ZXh0byBlIGxheW91dFxyXG5pbXBvcnQgKiBhcyBHbG9iYWxNb2RlbCBmcm9tIFwiLi4vLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2dNb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBHbG9iYWxIYW5kbGVyIGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ0hhbmRsZXJzXCI7XHJcbmltcG9ydCAqIGFzIEVycm9ySGFuZGxlciBmcm9tIFwiLi4vLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2Vycm9ySGFuZGxlclwiO1xyXG5sZXQgbW92aW5nU3JjSXRlbSA9IG51bGw7XHJcbmxldCB0YXJnSXRlbSA9IG51bGw7XHJcbmNvbnN0IGNvbnRJblF1YWRycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29udEluUXVhZHJzXCIpO1xyXG5sZXQgaXNEaWFsb2dDYWxsZWQgPSBmYWxzZTtcclxubGV0IGJsb2NrQ291bnQgPSAxO1xyXG4vLyBjb25zdCBxdWFkckRlbnRzQXJyYXkgPSBBcnJheS5mcm9tKHF1YWRyRGVudHMpOyAvL3RlbSBxdWUgc2VyIGFwbGljYWRhIGVtIEFycnJheSwgbsOjbyBjb2xlw6fDo28gSFRNTFxyXG4vLyBjb25zdCBxdWFkckRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInF1YWRyTWFpbkRpdlwiKTsgLy9yZXRvcm5hIEhUTUxDb2xsZWN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93SW5zcFNwYW5TdWIoY2hhbmdlUmFkaW8sIGluc3BSYWRpbykge1xyXG4gICAgaWYgKGNoYW5nZVJhZGlvLnRhcmdldCA9PT0gaW5zcFJhZGlvKSB7XHJcbiAgICAgICAgaWYgKGluc3BSYWRpby5jbGFzc0xpc3QuY29udGFpbnMoXCJyYWRZZXNcIikpIHtcclxuICAgICAgICAgICAgY29uc3QgaXNQYXJlbnRWYWxpZCA9IGluc3BSYWRpby5wYXJlbnRFbGVtZW50Py5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnNwU3Bhbk1haW5cIik7XHJcbiAgICAgICAgICAgIGlmIChpc1BhcmVudFZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZFNpYmxpbmcgPSBHbG9iYWxIYW5kbGVyLnNlYXJjaE5leHRTaWJsaW5ncyhpbnNwUmFkaW8sIFwiaW5zcFNwYW5TdWJcIik7XHJcbiAgICAgICAgICAgICAgICBpbnNwUmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWluc3BSYWRpby5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkU2libGluZy5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zcFJhZGlvLmNoZWNrZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZFNpYmxpbmcucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGluc3BSYWRpby5jbGFzc0xpc3QuY29udGFpbnMoXCJyYWROb1wiKSkge1xyXG4gICAgICAgICAgICBjb25zdCBpc1BhcmVudFZhbGlkID0gaW5zcFJhZGlvLnBhcmVudEVsZW1lbnQ/LmNsYXNzTGlzdC5jb250YWlucyhcImluc3BTcGFuTWFpblwiKTtcclxuICAgICAgICAgICAgaWYgKGlzUGFyZW50VmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkU2libGluZyA9IEdsb2JhbEhhbmRsZXIuc2VhcmNoTmV4dFNpYmxpbmdzKGluc3BSYWRpbywgXCJpbnNwU3BhblN1YlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnNwUmFkaW8uY2hlY2tlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkU2libGluZy5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyBwYXJlbnRFbGVtZW50IGNsYXNzLlxuICAgICAgICBDbGFzc2VzIG9idGlkYXM6ICR7aW5zcFJhZGlvLnBhcmVudEVsZW1lbnQ/LmNsYXNzTGlzdCA/PyBcIk5VTExcIn07XG4gICAgICAgIENsYXNzZSBwcm9jdXJhZGE6IFwiaW5zcFNwYW5NYWluXCJgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0luc3BEaWFsb2dzKGNsaWNrLCBpbnNwRGlhbG9nQnRuKSB7XHJcbiAgICBpZiAoY2xpY2sudGFyZ2V0ID09PSBpbnNwRGlhbG9nQnRuKSB7XHJcbiAgICAgICAgY29uc3QgY2FsbGVkRGlhbG9nID0gaW5zcERpYWxvZ0J0bi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgaWYgKGNhbGxlZERpYWxvZyAmJiBjYWxsZWREaWFsb2cgaW5zdGFuY2VvZiBIVE1MRGlhbG9nRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoaXNEaWFsb2dDYWxsZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsZWREaWFsb2cuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgaW5zcERpYWxvZ0J0bi50ZXh0Q29udGVudCA9IFwiRXNjb25kZXIgU3VnZXN0w7Vlc1wiO1xyXG4gICAgICAgICAgICAgICAgaXNEaWFsb2dDYWxsZWQgPSAhaXNEaWFsb2dDYWxsZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsZWREaWFsb2cuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGluc3BEaWFsb2dCdG4udGV4dENvbnRlbnQgPSBcIk1vc3RyYXIgU3VnZXN0w7Vlc1wiO1xyXG4gICAgICAgICAgICAgICAgaXNEaWFsb2dDYWxsZWQgPSAhaXNEaWFsb2dDYWxsZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChjYWxsZWREaWFsb2cgPz8gbnVsbCwgXCJjYWxsZWREaWFsb2dcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWRkVGV4dFRvT2JzKGNsaWNrLCBpbnNwTElCdG4pIHtcclxuICAgIGlmIChjbGljay50YXJnZXQgPT09IGluc3BMSUJ0bikge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkVGV4dFBhcmVudCA9IGluc3BMSUJ0bi5wYXJlbnRFbGVtZW50Py5pbm5lclRleHQ7XHJcbiAgICAgICAgY29uc3QgZml4ZWRUZXh0UGFyZW50ID0gdmFsaWRUZXh0UGFyZW50Py5zbGljZSgwLCAtOSk7XHJcbiAgICAgICAgY29uc3QgdmFsaWRQYXJlbnQgPSBHbG9iYWxIYW5kbGVyLnNlYXJjaFBhcmVudHMoaW5zcExJQnRuLCBcImluc3BEaWFsb2dcIik7XHJcbiAgICAgICAgY29uc3QgdmFsaWRQYXJlbnRTaWJsaW5nID0gR2xvYmFsSGFuZGxlci5zZWFyY2hQcmV2aW91c1NpYmxpbmdzKHZhbGlkUGFyZW50LCBcImluc3BUYVwiKTtcclxuICAgICAgICBpZiAodmFsaWRQYXJlbnRTaWJsaW5nIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgICAgICAgICB2YWxpZFBhcmVudFNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh2YWxpZFBhcmVudFNpYmxpbmcudmFsdWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL3RleHRDb250ZW50IMOpIGN1bXVsYXRpdm8gcGVyc2lzdGVudGUsIG1lc21vIGFww7NzIHJlbW/Dp8OjbyBkZSBjb250ZcO6ZG8gZW0gaW5wdXQvdGEsIGxvZ28gdXNhciAudmFsdWVcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29uZGnDp8OjbyBpZlwiKTtcclxuICAgICAgICAgICAgICAgIHZhbGlkUGFyZW50U2libGluZy52YWx1ZSArPSBmaXhlZFRleHRQYXJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmVkRml4ZWRUZXh0UGFyZW50ID0gZml4ZWRUZXh0UGFyZW50Py50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFsaWRQYXJlbnRTaWJsaW5nLnZhbHVlICs9IGxvd2VyZWRGaXhlZFRleHRQYXJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQodmFsaWRQYXJlbnRTaWJsaW5nID8/IG51bGwsIFwidmFsaWRQYXJlbnRTaWJsaW5nXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdIb3ZlcihxdWFkckRlbnQpIHtcclxuICAgIGlmIChxdWFkckRlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsQ3Vyc29yID0gcXVhZHJEZW50LnN0eWxlLmN1cnNvcjtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcXVhZHJEZW50LnN0eWxlLmN1cnNvciA9IFwiZ3JhYmJpbmdcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBxdWFkckRlbnQuc3R5bGUuY3Vyc29yID0gb3JpZ2luYWxDdXJzb3I7XHJcbiAgICAgICAgICAgICAgICBpZiAocXVhZHJEZW50LnN0eWxlLmN1cnNvciA9PT0gXCJncmFiYmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVhZHJEZW50LnN0eWxlLmN1cnNvciA9IFwiZ3JhYlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9LCAyMDAwKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ1N0YXJ0KG1vdmUpIHtcclxuICAgIG1vdmluZ1NyY0l0ZW0gPSBtb3ZlPy50YXJnZXQgPz8gbnVsbDtcclxuICAgIGlmIChtb3ZpbmdTcmNJdGVtICYmIG1vdmluZ1NyY0l0ZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIG1vdmU/LmRhdGFUcmFuc2Zlcj8uc2V0RGF0YShcInRleHQvcGxhaW5cIiwgXCJcIik7IC8vZGVmaW5lIGEgZGF0YSBpbmljaWFsIG5vIGNvbnRhaW5lciBtb2JpbGl6YWRvXHJcbiAgICAgICAgZHJhZ1N0YXJ0Q2hpbGRzKGNvbnRJblF1YWRycyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYEVycm8gcmVjb25oZWNlbmRvIERyYWcgU3RhcnQ6IHRhcmdldCAke21vdmluZ1NyY0l0ZW19LCBjbGFzc2UgJHttb3ZpbmdTcmNJdGVtfWApO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkcmFnU3RhcnRDaGlsZHMoY29udEluUXVhZHJzKSB7XHJcbiAgICBjb250SW5RdWFkcnMuZm9yRWFjaCgoY29udEluUXVhZHIpID0+IHtcclxuICAgICAgICBjb250SW5RdWFkci5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdFbnRlcihtb3ZlKSB7XHJcbiAgICBtb3ZlLnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdPdmVyKG1vdmUpIHtcclxuICAgIG1vdmUucHJldmVudERlZmF1bHQoKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ0xlYXZlKG1vdmUpIHtcclxuICAgIG1vdmUucHJldmVudERlZmF1bHQoKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ0Ryb3AoZHJvcCkge1xyXG4gICAgdGFyZ0l0ZW0gPSBkcm9wLnRhcmdldDtcclxuICAgIGlmIChtb3ZpbmdTcmNJdGVtIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcclxuICAgICAgICB0YXJnSXRlbSAmJlxyXG4gICAgICAgIHRhcmdJdGVtIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcclxuICAgICAgICBtb3ZpbmdTcmNJdGVtICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgZ3JpZFNyY0l0ZW1DU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShtb3ZpbmdTcmNJdGVtKTsgLy9jYXB0dXJhIGVzdGlsb3MgZGEgc291cmNlXHJcbiAgICAgICAgY29uc3QgZ3JpZFNyY0l0ZW1TdHlsZSA9IG1vdmluZ1NyY0l0ZW0uc3R5bGU7XHJcbiAgICAgICAgY29uc3QgZ3JpZFNyY0l0ZW1Db2x1bW4gPSBncmlkU3JjSXRlbUNTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwiZ3JpZC1jb2x1bW5cIik7XHJcbiAgICAgICAgY29uc3QgZ3JpZFNyY0l0ZW1Sb3cgPSBncmlkU3JjSXRlbUNTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwiZ3JpZC1yb3dcIik7XHJcbiAgICAgICAgY29uc3QgZ3JpZFRhcmdJdGVtQ1N0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGFyZ0l0ZW0pOyAvL2NhcHR1cmEgZXN0aWxvcyBkbyB0YXJnZXQgbmEgw6FyZWEgZGUgZHJvcFxyXG4gICAgICAgIGNvbnN0IGdyaWRUYXJnSXRlbVN0eWxlID0gdGFyZ0l0ZW0uc3R5bGU7XHJcbiAgICAgICAgY29uc3QgZ3JpZFRhcmdJdGVtQ29sdW1uID0gZ3JpZFRhcmdJdGVtQ1N0eWxlLmdldFByb3BlcnR5VmFsdWUoXCJncmlkLWNvbHVtblwiKTtcclxuICAgICAgICBjb25zdCBncmlkVGFyZ0l0ZW1Sb3cgPSBncmlkVGFyZ0l0ZW1DU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShcImdyaWQtcm93XCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGdyaWRTcmNJdGVtQ29sdW1uKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhncmlkU3JjSXRlbVJvdyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZ3JpZFRhcmdJdGVtQ29sdW1uKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhncmlkVGFyZ0l0ZW1Sb3cpO1xyXG4gICAgICAgIGdyaWRTcmNJdGVtU3R5bGUuc2V0UHJvcGVydHkoXCJncmlkLWNvbHVtblwiLCBncmlkVGFyZ0l0ZW1Db2x1bW4pOyAvL2ZheiBhIGludmVyc8Ojb1xyXG4gICAgICAgIGdyaWRTcmNJdGVtU3R5bGUuc2V0UHJvcGVydHkoXCJncmlkLXJvd1wiLCBncmlkVGFyZ0l0ZW1Sb3cpO1xyXG4gICAgICAgIGdyaWRUYXJnSXRlbVN0eWxlLnNldFByb3BlcnR5KFwiZ3JpZC1jb2x1bW5cIiwgZ3JpZFNyY0l0ZW1Db2x1bW4pO1xyXG4gICAgICAgIGdyaWRUYXJnSXRlbVN0eWxlLnNldFByb3BlcnR5KFwiZ3JpZC1yb3dcIiwgZ3JpZFNyY0l0ZW1Sb3cpO1xyXG4gICAgICAgIG1vdmluZ1NyY0l0ZW0gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgZHJhZ0VuZCgpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkcmFnRW5kKCkge1xyXG4gICAgbW92aW5nU3JjSXRlbSA9IG51bGw7XHJcbiAgICBkcmFnRW5kQ2hpbGRzKGNvbnRJblF1YWRycyk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdFbmRDaGlsZHMoY29udEluUXVhZHJzKSB7XHJcbiAgICBjb250SW5RdWFkcnMuZm9yRWFjaCgoY29udEluUXVhZHIpID0+IHtcclxuICAgICAgICBjb250SW5RdWFkci5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJmYWxzZVwiKTtcclxuICAgIH0pO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJvIGRyYWcgZGFzIGNoaWxkcyBmb2kgZGVmaW5pZG8gY29tbyBmYWxzZVwiKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRMYWJlbHMocXVhZHJCdG4pIHtcclxuICAgIGNvbnN0IHBhcmVudERpdiA9IHF1YWRyQnRuPy5jbG9zZXN0KFwiLnF1YWRyTWFpbkRpdlwiKTtcclxuICAgIGNvbnNvbGUubG9nKHBhcmVudERpdik7XHJcbiAgICBpZiAocGFyZW50RGl2KSB7XHJcbiAgICAgICAgY29uc3QgaW5uZXJEaXZJbnBzID0gcGFyZW50RGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFtpZF49aW5wRF1cIik7XHJcbiAgICAgICAgaWYgKGlubmVyRGl2SW5wcykge1xyXG4gICAgICAgICAgICBpZiAoaW5uZXJEaXZJbnBzLmxlbmd0aCA8IDgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gaW5wdXRzIGludGVybm9zIGFvIHF1YWRyYW50ZS4gTsO6bWVybyB0b3RhbCBkZSBpbnB1dHM6ICR7aW5uZXJEaXZJbnBzLmxlbmd0aH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbm5lckRpdklucHMuZm9yRWFjaCgoaW5uZXJEaXZJbnApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbm5lckRpdklucCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbm5lckRpdklucC52YWx1ZSA9IFwiSMOtZ2lkb1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChpbm5lckRpdklucHMgPz8gbnVsbCwgXCJpbm5lckRpdklucHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKHBhcmVudERpdiA/PyBudWxsLCBcInBhcmVudERpdlwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyUXVhZHJJbnBzKHF1YWRySW5wKSB7XHJcbiAgICBpZiAocXVhZHJJbnAgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKHF1YWRySW5wLm5leHRFbGVtZW50U2libGluZykge1xyXG4gICAgICAgICAgICBjb25zdCBkbE9wdGlvbnMgPSBxdWFkcklucC5uZXh0RWxlbWVudFNpYmxpbmcuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGNvbnN0IGRsT3B0aW9uc1ZhbHVlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRsT3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRsT3B0aW9uc1tpXSBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGxPcHRpb25zVmFsdWVzLnB1c2goZGxPcHRpb25zW2ldLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGxPcHRpb25zVmFsdWVzLmluY2x1ZGVzKHF1YWRySW5wLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcXVhZHJJbnAudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgcXVhZHJJbnAucGxhY2Vob2xkZXIgPSBcIkFwYWdhZG9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKHF1YWRySW5wID8/IG51bGwsIFwicXVhZHJJbnBcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRTdWJEaXZUcmF0KGNsaWNrKSB7XHJcbiAgICBpZiAoY2xpY2sudGFyZ2V0ICYmXHJcbiAgICAgICAgY2xpY2sudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcclxuICAgICAgICBjbGljay50YXJnZXQudGFnTmFtZSA9PT0gXCJCVVRUT05cIikge1xyXG4gICAgICAgIGlmIChjbGljay50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkVHJhdFwiKSkge1xyXG4gICAgICAgICAgICBibG9ja0NvdW50Kys7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYXRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYXRDb250YWluZXJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0Jsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbmV3QmxvY2suY2xhc3NOYW1lID0gXCJjb250VGVyYyBkaXZTdWIgZGl2U3ViVHJhdFwiO1xyXG4gICAgICAgICAgICBuZXdCbG9jay5pZCA9IGBkaXZTdWJUcmF0JHtibG9ja0NvdW50fWA7XHJcbiAgICAgICAgICAgIG5ld0Jsb2NrLmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbnRRdWF0IHNwYW5NYWluIHRyYXRNYWluU3BhbiB0cmF0TnVtU3BhblwiIGlkPVwidHJhdE51bVNwYW4ke2Jsb2NrQ291bnR9XCI+IFxuICAgICAgICAgICR7YmxvY2tDb3VudH0mIzQxXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29udFF1YXQgc3Bhbk1haW4gdHJhdE1haW5TcGFuIHRyYXREYXRlU3BhblwiIGlkPVwidHJhdERhdGVTcGFuJHtibG9ja0NvdW50fVwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRyYXREYXRlSW5wSWQke2Jsb2NrQ291bnR9XCIgY2xhc3M9XCJjb250UXVpbnQgdHJhdExhYmVsXCI+RGF0YTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwidHJhdERhdGVJbnBOYW1lJHtibG9ja0NvdW50fVwiIGlkPVwidHJhdERhdGVJbnBJZCR7YmxvY2tDb3VudH1cIiBjbGFzcz1cImlucFRyYXQgdHJhdERhdGVcIiByZXF1aXJlZCAvPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjb250UXVpbnQgZGF0QnRuXCIgaWQ9XCJ0cmF0JHtibG9ja0NvdW50fURhdEJ0blwiPlVzYXIgZGF0YSBhdHVhbDwvYnV0dG9uPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbnRRdWF0IHNwYW5NYWluIHRyYXRNYWluU3BhbiB0cmF0VHlwZVNwYW5cIiBpZD1cInRyYXRUeXBlU3BhbiR7YmxvY2tDb3VudH1cIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YVRyYXRJZCR7YmxvY2tDb3VudH1cIiBjbGFzcz1cImNvbnRRdWludCB0cmF0VGFsYWJcIiBpZD1cImxhYlRyYXRUaXAke2Jsb2NrQ291bnR9XCI+VGlwbyBkZSBUcmF0YW1lbnRvPC9sYWJlbD5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSBuYW1lPVwidGFUcmF0TmFtZTFcIiBpZD1cInRhVHJhdElkJHtibG9ja0NvdW50fVwiIGNsYXNzPVwidGFUcmF0XCIgcmVxdWlyZWQ+PC90ZXh0YXJlYT5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb250UXVhdCBzcGFuTWFpbiB0cmF0TWFpblNwYW4gdHJhdEZpbGVTcGFuXCIgaWQ9XCJ0cmF0RmlsZVNwYW4ke2Jsb2NrQ291bnR9XCI+XG4gICAgICAgICAgICA8c3BhbiBpZD1cInNwYW5Bc3RUcmF0SWQke2Jsb2NrQ291bnR9XCIgY2xhc3M9XCJjb250UXVpbnQgdHJhdExhYmVsIGxhYkFzdFwiPkFzc2luYXR1cmE8L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaW5wQXN0VHJhdE5hbWUke2Jsb2NrQ291bnR9XCIgaWQ9XCJpbnBBc3RUcmF0SWQke2Jsb2NrQ291bnR9XCJcbiAgICAgICAgICAgIGNsYXNzPVwiY29udFF1aW50IGlucFRyYXQgaW5wQXN0IHRyYXRBc3RcIiAvPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjb250UXVpbnQgYXN0RGlndEJ0biBjb25maXJtQnRuXCIgXG4gICAgICAgICAgICBpZD1cInRyYXQke2Jsb2NrQ291bnR9QXN0RGlndEJ0blwiPlVzYXIgQXNzaW5hdHVyYSBEaWdpdGFsPC9idXR0b24+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29udFF1YXQgc3Bhbk1haW4gdHJhdE1haW5TcGFuIHRyYXRCdXRTcGFuXCIgaWQ9XCJ0cmF0QnV0U3BhbiR7YmxvY2tDb3VudH1cIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJhZGRUcmF0TmFtZSR7YmxvY2tDb3VudH1cIiBpZD1cImFkZFRyYXRJZCR7YmxvY2tDb3VudH1cIiBjbGFzcz1cImFkZFRyYXQgY291bnRUcmF0XCJcbiAgICAgICAgICAgIHZhbHVlPVwiYWRkVHJhdFwiPlxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgXG4gICAgICAgICAgICAgIGlkPVwiYWRkVHJhdFN2ZyR7YmxvY2tDb3VudH1cIiBjbGFzcz1cInBsdXNCdXRTdmcgYmkgYmktcGx1cy1zcXVhcmUtZmlsbCBjb3VudFRyYXRTdmdcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yIDBhMiAyIDAgMCAwLTIgMnYxMmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWMmEyIDIgMCAwIDAtMi0ySDJ6bTYuNSA0LjV2M2gzYS41LjUgMCAwIDEgMCAxaC0zdjNhLjUuNSAwIDAgMS0xIDB2LTNoLTNhLjUuNSAwIDAgMSAwLTFoM3YtM2EuNS41IDAgMCAxIDEgMHpcIi8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBuYW1lPVwicmVtb3ZlVHJhdE5hbWUxXCIgaWQ9XCJyZW1vdmVUcmF0SWQke2Jsb2NrQ291bnR9XCJcbiAgICAgICAgICAgIGNsYXNzPVwicmVtb3ZlVHJhdCBjb3VudFRyYXRcIiB2YWx1ZT1cInJlbW92ZVRyYXRcIj5cbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIFxuICAgICAgICAgICAgICBpZD1cInJlbW92ZVRyYXRTdmcke2Jsb2NrQ291bnR9XCIgY2xhc3M9XCJtaW51c0J1dFN2ZyBiaSBiaS1kYXNoLXNxdWFyZS1maWxsIGNvdW50VHJhdFN2Z1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIgMGEyIDIgMCAwIDAtMiAydjEyYTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlYyYTIgMiAwIDAgMC0yLTJIMnptMi41IDcuNWg3YS41LjUgMCAwIDEgMCAxaC03YS41LjUgMCAwIDEgMC0xelwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+ICAgXG4gICAgICAgIGA7XHJcbiAgICAgICAgICAgIHRyYXRDb250YWluZXI/LmFwcGVuZENoaWxkKG5ld0Jsb2NrKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZUJ0bnMgPSBuZXdCbG9jay5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25baWQkPVwiRGF0QnRuXCJdJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHRJbnB1dHMgPSBuZXdCbG9jay5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0YXJlYXMgPSBuZXdCbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwidGV4dGFyZWFcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHRDb250cyA9IFsuLi50ZXh0SW5wdXRzLCAuLi50ZXh0YXJlYXNdO1xyXG4gICAgICAgICAgICBjb25zdCBhc3REaWd0QnRucyA9IG5ld0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbltpZCQ9XCJBc3REaWd0QnRuJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGlEID0gMDsgaUQgPCBkYXRlQnRucy5sZW5ndGg7IGlEKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGVCdG5zW2lEXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGFjdGl2YXRpb24pID0+IEdsb2JhbEhhbmRsZXIudXNlQ3VycmVudERhdGUoYWN0aXZhdGlvbiwgZGF0ZUJ0bnNbaURdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaVQgPSAwOyBpVCA8IHRleHRDb250cy5sZW5ndGg7IGlUKyspIHtcclxuICAgICAgICAgICAgICAgIHRleHRDb250c1tpVF0uYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEdsb2JhbE1vZGVsLmF1dG9DYXBpdGFsaXplSW5wdXRzKHRleHRDb250c1tpVF0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpQSA9IDA7IGlBIDwgYXN0RGlndEJ0bnMubGVuZ3RoOyBpQSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhc3REaWd0QnRuc1tpQV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChhY3RpdmF0aW9uKSA9PiBHbG9iYWxIYW5kbGVyLmNoYW5nZVRvQXN0RGlnaXQoYWN0aXZhdGlvbiwgYXN0RGlndEJ0bnNbaUFdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2xpY2sudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJlbW92ZVRyYXRcIikpIHtcclxuICAgICAgICAgICAgY29uc3QgZGl2VG9SZW1vdmUgPSBjbGljay50YXJnZXQuY2xvc2VzdChcIi5jb250VGVyYy5kaXZTdWIuZGl2U3ViVHJhdFwiKTtcclxuICAgICAgICAgICAgaWYgKGRpdlRvUmVtb3ZlICYmIGJsb2NrQ291bnQgIT09IDEgJiYgZGl2VG9SZW1vdmUuaWQgIT09IFwiZGl2U3ViVHJhdDFcIikge1xyXG4gICAgICAgICAgICAgICAgZGl2VG9SZW1vdmUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBibG9ja0NvdW50IC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChjbGljaz8udGFyZ2V0ID8/IG51bGwsIFwidGFyZ2V0IDxidXR0b24+XCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgIH1cclxufVxyXG4iLCIvL25lc3NlIGZpbGUgZXN0w6NvIHByZXNlbnRlcyBwcmluY2lwYWxtZW50ZSBhcyBmdW7Dp8O1ZXMgcmVsYWNpb25hZGFzIMOgIGV4aWfDqm5jaWEgZGUgbW9kZWxvIHRleHR1YWwgZSBkZSB2aXN1YWxpemHDp8Ojb1xyXG5pbXBvcnQgKiBhcyBFcnJvckhhbmRsZXIgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9lcnJvckhhbmRsZXJcIjtcclxuY29uc3Qgc3ViRGl2c1F1YWRycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVhZHJTdWJEaXZcIik7XHJcbmxldCBpc1ZhbHVlUHJlRGVmID0gZmFsc2U7XHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldEF2RGVudFZhbHVlKHNlbGVjdElucCkge1xyXG4gICAgY29uc3QgdGFyZ0lucCA9IHNlbGVjdElucDtcclxuICAgIGNvbnN0IHRhcmdWYWx1ZSA9IHRhcmdJbnAudmFsdWU7XHJcbiAgICBjb25zdCBkbE9wdGlvbnNDb2xsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVsZW1PcFwiKTtcclxuICAgIGNvbnN0IGRsT3B0aW9uc0FycmF5ID0gQXJyYXkuZnJvbShkbE9wdGlvbnNDb2xsZWN0aW9uKTtcclxuICAgIGlmIChkbE9wdGlvbnNBcnJheS5ldmVyeSgoZGxPcHRpb24pID0+IGRsT3B0aW9uIGluc3RhbmNlb2YgSFRNTE9wdGlvbkVsZW1lbnQpKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkbE9wdGlvbnNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGxPcHRpb25zQXJyYXlbaV0udmFsdWUgPT09IHRhcmdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaXNWYWx1ZVByZURlZiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGFyZ0lucCAmJiBpc1ZhbHVlUHJlRGVmICYmIHRhcmdJbnAgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRhcmdJbnAudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaXNWYWx1ZVByZURlZiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICB0YXJnSW5wLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiQXBhZ2Fkb1wiKTtcclxuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGFyZ0lucC5jbGFzc0xpc3QuYWRkKFwicGxhY2Vob2xkZXItaGlkZGVuXCIpLCAxMDAwKTtcclxuICAgICAgICAgICAgdGFyZ0lucC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnSW5wLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGFjZWhvbGRlci1oaWRkZW5cIik7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocGxhY2Vob2xkZXJUaW1lcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0YXJnSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnSW5wLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGFjZWhvbGRlci1oaWRkZW5cIik7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocGxhY2Vob2xkZXJUaW1lcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGxPcHRpb25zQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCEoZGxPcHRpb25zQXJyYXlbaV0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8IEhUTUxUZXh0QXJlYUVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChkbE9wdGlvbnNBcnJheVtpXSA/PyBudWxsLCBgJHtkbE9wdGlvbnNBcnJheVtpXT8uaWQgPz8gXCJVTkRFRklORUQgSUQgRExPUFRJT05cIn1gLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG9yZGVyTGFiZWxzKCkge1xyXG4gICAgc3ViRGl2c1F1YWRycy5mb3JFYWNoKChzdWJEaXYpID0+IHtcclxuICAgICAgICBjb25zdCBsYWJzTkxpc3QgPSBzdWJEaXYucXVlcnlTZWxlY3RvckFsbChcIi5sYWJlbEF2RGVudFwiKTtcclxuICAgICAgICBpZiAobGFic05MaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RMYWJJZCA9IGxhYnNOTGlzdFswXS5pZDtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RMYWJOdW1TdHIgPSBmaXJzdExhYklkLm1hdGNoKC9cXGQrLyk7XHJcbiAgICAgICAgICAgIGlmIChmaXJzdExhYk51bVN0ciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYWJzTkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuT3JkZXIgPSAoaSArIDEpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhYnNOTGlzdFtpXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJzTkxpc3RbaV0uc3R5bGUuc2V0UHJvcGVydHkoXCJvcmRlclwiLCBuT3JkZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKGxhYnNOTGlzdCA/PyBudWxsLCBcImxhYnNOTElTVFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL25lc3NlIGZpbGUgb2NvcnJlbSBwcmluY2lwYWxtZW50ZSBhcyBhZGnDp8O1ZXMgZGUgbGlzdGVuZXJzLCBzaW5jcm9uaXphw6fDo28gZGFzIGNoYW1hZGFzIGRlIGZ1bsOnw7VlcyBwYXJhIG1hbmlwdWxhw6fDo28gZGUgaW5mb3JtYcOnw6NvL2xheW91dCBlIHZhbGlkYcOnw6NvIGRvcyBlbGVtZW50b3Mgbm8gRE9NXHJcbmltcG9ydCAqIGFzIE9kSGFuZGxlciBmcm9tIFwiLi9vZEhhbmRsZXJcIjtcclxuaW1wb3J0ICogYXMgT2RNb2RlbCBmcm9tIFwiLi9vZE1vZGVsXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbE1vZGVsIGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ01vZGVsXCI7XHJcbmltcG9ydCAqIGFzIEdsb2JhbEhhbmRsZXIgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9nSGFuZGxlcnNcIjtcclxuaW1wb3J0ICogYXMgRXJyb3JIYW5kbGVyIGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZXJyb3JIYW5kbGVyXCI7XHJcbi8vaW5pY2lhbGl6YcOnw6NvIGRlIGNvbnN0YW50ZXMgcGVyY29ycmVuZG8gbyBET01cclxuY29uc3QgdGV4dElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbmNvbnN0IHRleHRhcmVhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZXh0YXJlYVwiKTtcclxuY29uc3QgdGV4dENvbnRzID0gWy4uLnRleHRJbnB1dHMsIC4uLnRleHRhcmVhc107XHJcbmNvbnN0IHJhZGlvQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScpO1xyXG5jb25zdCBpbnNwUmFkaW9zWWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbY2xhc3M9XCJjb250UXVpbnQgcmFkT3AgcmFkWWVzXCJdJyk7XHJcbmNvbnN0IGluc3BSYWRpb3NObyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2NsYXNzPVwiY29udFF1aW50IHJhZE9wIHJhZE5vXCJdJyk7XHJcbmNvbnN0IGluc3BEaWFsb2dzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbltpZF49XCJpbnNwRGlhbG9nQnRuXCJdJyk7XHJcbmNvbnN0IGluc3BMSUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25baWRePVwiaW5zcExJQnRuXCJdJyk7XHJcbmNvbnN0IHF1YWRyRGVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicXVhZHJNYWluRGl2XCIpO1xyXG5jb25zdCBxdWFkckRlbnRzQXJyYXkgPSBBcnJheS5mcm9tKHF1YWRyRGVudHMpO1xyXG5jb25zdCBhdkVsZW1EZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbnBBdkRlbnRcIik7XHJcbmNvbnN0IGF2RWxlbURlbnRzQXJyYXkgPSBBcnJheS5mcm9tKGF2RWxlbURlbnRzKTtcclxuY29uc3QgdHJhdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhdENvbnRhaW5lclwiKTtcclxuY29uc3QgZGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25baWQkPVwiRGF0QnRuXCJdJyk7XHJcbmNvbnN0IGVkaXRhYmxlQ2l0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NpdGVbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXScpO1xyXG5jb25zdCBkZWFjdEF1dG9jb3JyZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbltpZF49XCJkZWFjdEF1dG9jb3JyZWN0QnRuXCJdJyk7XHJcbmNvbnN0IGFzdERpZ3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2lkJD1cIkFzdERpZ3RCdG4nKTtcclxuY29uc3QgcmVzZXRGb3JtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldEZvcm1CdG5cIik7XHJcbmNvbnN0IHN1YkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0Rm9ybUJ1dElkXCIpO1xyXG5jb25zdCBxdWFkcklucHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtpZF49XCJpbnBEXCJdJyk7XHJcbmNvbnN0IHJlc2V0RGl2c1F1YWRycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmVzZXRCdXRcIik7XHJcbi8vIGNvbnN0IGluc3BTcGFuU3VicyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbnNwU3BhblN1YlwiKTtcclxuLy8gY29uc3QgaW5zcFNwYW5TdWJzQXJyYXkgPSBBcnJheS5mcm9tKGluc3BTcGFuU3Vicyk7XHJcbi8vIGNvbnN0IHRyYXRUeXBlU3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzcGFuW2lkXj1cInRyYXRUeXBlU3BhblwiXScpO1xyXG4vLyBjb25zdCB0YVRyYXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRleHRhcmVhW2lkXj10YVRyYXRcIilcclxuLy8gY29uc3Qgc3ViRGl2c1F1YWRycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVhZHJTdWJEaXZcIik7XHJcbi8vIGxldCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbi8vIGxldCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbi8vdmFsaWRhw6fDo28gZGUgY29uc3RhbnRlcyBlIGFkacOnw6NvIGRlIGxpc3RlbmVyc1xyXG5pZiAodGV4dENvbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIHRleHRDb250cy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXh0Q29udCkge1xyXG4gICAgICAgIHRleHRDb250LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0LnRhcmdldCAmJlxyXG4gICAgICAgICAgICAgICAgKGlucHV0LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHxcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsTW9kZWwuYXV0b0NhcGl0YWxpemVJbnB1dHMoaW5wdXQudGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKGlucHV0Py50YXJnZXQgPz8gbnVsbCwgXCJ0YXJnZXQgdGV4dENvbnRcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKHRleHRDb250cyA/PyBudWxsLCBcInRleHRDb250c1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKHJhZGlvQnV0dG9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICByYWRpb0J1dHRvbnMuZm9yRWFjaCgocmFkaW8pID0+IHtcclxuICAgICAgICBpZiAocmFkaW8gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIHJhZGlvLnR5cGUgPT09IFwicmFkaW9cIikge1xyXG4gICAgICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoa2V5ZG93bikgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsSGFuZGxlci5vcFJhZGlvSGFuZGxlcihrZXlkb3duKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiBHbG9iYWxIYW5kbGVyLmRvdWJsZUNsaWNrSGFuZGxlcihyYWRpbykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChyYWRpbyA/PyBudWxsLCBgJHtyYWRpbz8uaWQgfHwgXCJVTkRFRklORUQgSUQgUkFESU9cIn1gLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChyYWRpb0J1dHRvbnMgPz8gbnVsbCwgXCJyYWRpb0J1dHRvbnNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChpbnNwUmFkaW9zWWVzLmxlbmd0aCA+IDApIHtcclxuICAgIGluc3BSYWRpb3NZZXMuZm9yRWFjaCgoaW5zcFJhZGlvWWVzKSA9PiB7XHJcbiAgICAgICAgaWYgKGluc3BSYWRpb1llcyBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcclxuICAgICAgICAgICAgKGluc3BSYWRpb1llcy50eXBlID09PSBcInJhZGlvXCIgfHwgaW5zcFJhZGlvWWVzLnR5cGUgPT09IFwiY2hlY2tib3hcIikpIHtcclxuICAgICAgICAgICAgaW5zcFJhZGlvWWVzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoY2xpY2tSYWRpbykgPT4gT2RIYW5kbGVyLnNob3dJbnNwU3BhblN1YihjbGlja1JhZGlvLCBpbnNwUmFkaW9ZZXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoaW5zcFJhZGlvWWVzID8/IG51bGwsIGAke2luc3BSYWRpb1llcz8uaWQgfHwgXCJVTkRFRklORUQgSUQgWUVTIElOUFVUXCJ9YCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoaW5zcFJhZGlvc1llcyA/PyBudWxsLCBcImluc3BSYWRpb1llc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKGluc3BSYWRpb3NOby5sZW5ndGggPiAwKSB7XHJcbiAgICBpbnNwUmFkaW9zTm8uZm9yRWFjaCgoaW5zcFJhZGlvTm8pID0+IHtcclxuICAgICAgICBpZiAoaW5zcFJhZGlvTm8gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXHJcbiAgICAgICAgICAgIChpbnNwUmFkaW9Oby50eXBlID09PSBcInJhZGlvXCIgfHwgaW5zcFJhZGlvTm8udHlwZSA9PT0gXCJjaGVja2JveFwiKSkge1xyXG4gICAgICAgICAgICBpbnNwUmFkaW9Oby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrUmFkaW8pID0+IE9kSGFuZGxlci5zaG93SW5zcFNwYW5TdWIoY2xpY2tSYWRpbywgaW5zcFJhZGlvTm8pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoaW5zcFJhZGlvTm8gPz8gbnVsbCwgYCR7aW5zcFJhZGlvTm8/LmlkIHx8IFwiVU5ERUZJTkVEIElEIFlFUyBJTlBVVFwifWAsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKGluc3BSYWRpb3NObyA/PyBudWxsLCBcImluc3BSYWRpb05vXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG5pZiAoaW5zcERpYWxvZ3NCdG5zLmxlbmd0aCA+IDApIHtcclxuICAgIGluc3BEaWFsb2dzQnRucy5mb3JFYWNoKChpbnNwRGlhbG9nQnRuKSA9PiB7XHJcbiAgICAgICAgaWYgKGluc3BEaWFsb2dCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpbnNwRGlhbG9nQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoY2xpY2spID0+IE9kSGFuZGxlci5zaG93SW5zcERpYWxvZ3MoY2xpY2ssIGluc3BEaWFsb2dCdG4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChpbnNwRGlhbG9nQnRuID8/IG51bGwsIGAke2luc3BEaWFsb2dCdG4/LmlkIHx8IFwiVU5ERUZJTkVEIElEIERJQUxPRyBCVVRUT05cIn1gLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChpbnNwRGlhbG9nc0J0bnMgPz8gbnVsbCwgXCJpbnNwRGlhbG9nc0J0bnNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChpbnNwTElCdG5zLmxlbmd0aCA+IDApIHtcclxuICAgIGluc3BMSUJ0bnMuZm9yRWFjaCgoaW5zcExJQnRuKSA9PiB7XHJcbiAgICAgICAgaWYgKGluc3BMSUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGluc3BMSUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrKSA9PiBPZEhhbmRsZXIuYWRkVGV4dFRvT2JzKGNsaWNrLCBpbnNwTElCdG4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChpbnNwTElCdG4gPz8gbnVsbCwgYCR7aW5zcExJQnRuPy5pZCB8fCBcIlVOREVGSU5FRCBJRCBMSSBCVVRUT05cIn1gLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChpbnNwTElCdG5zID8/IG51bGwsIFwiaW5zcExJQnRuc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKHF1YWRyRGVudHNBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICBxdWFkckRlbnRzQXJyYXkuZm9yRWFjaCgocXVhZHJEZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHF1YWRyRGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHF1YWRyRGVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsICgpID0+IE9kSGFuZGxlci5kcmFnSG92ZXIocXVhZHJEZW50KSk7XHJcbiAgICAgICAgICAgIHF1YWRyRGVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIE9kSGFuZGxlci5kcmFnU3RhcnQpO1xyXG4gICAgICAgICAgICBxdWFkckRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCBPZEhhbmRsZXIuZHJhZ0VudGVyKTtcclxuICAgICAgICAgICAgcXVhZHJEZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBPZEhhbmRsZXIuZHJhZ092ZXIpO1xyXG4gICAgICAgICAgICBxdWFkckRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCBPZEhhbmRsZXIuZHJhZ0xlYXZlKTtcclxuICAgICAgICAgICAgcXVhZHJEZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIE9kSGFuZGxlci5kcmFnRHJvcCk7XHJcbiAgICAgICAgICAgIHF1YWRyRGVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBPZEhhbmRsZXIuZHJhZ0VuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQocXVhZHJEZW50ID8/IG51bGwsIGAke3F1YWRyRGVudD8uaWQgPz8gXCJVTkRFRklORUQgUVVBRFJBTlQgSURcIn1gLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChxdWFkckRlbnRzQXJyYXkgPz8gbnVsbCwgXCJxdWFkckRlbnRzQXJyYXlcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChhdkVsZW1EZW50c0FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgIGF2RWxlbURlbnRzQXJyYXkuZm9yRWFjaCgoYXZFbGVtRGVudCkgPT4ge1xyXG4gICAgICAgIGF2RWxlbURlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGF2RWxlbURlbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCB8fFxyXG4gICAgICAgICAgICAgICAgSFRNTFNlbGVjdEVsZW1lbnQgfHxcclxuICAgICAgICAgICAgICAgIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIE9kTW9kZWwucmVzZXRBdkRlbnRWYWx1ZShhdkVsZW1EZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoYXZFbGVtRGVudCA/PyBudWxsLCBgJHthdkVsZW1EZW50Py5pZCA/PyBcIlVOREVGSU5FRCBJRCBFTEVNRU5UXCJ9YCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKGF2RWxlbURlbnRzQXJyYXkgPz8gbnVsbCwgXCJhdkVsZW1EZW50c0FycmF5XCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG5pZiAocXVhZHJJbnBzLmxlbmd0aCA+IDApIHtcclxuICAgIHF1YWRySW5wcy5mb3JFYWNoKChxdWFkcklucCkgPT4ge1xyXG4gICAgICAgIGlmIChxdWFkcklucCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcXVhZHJJbnAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IE9kSGFuZGxlci5jbGVhclF1YWRySW5wcyhxdWFkcklucCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChxdWFkcklucCA/PyBudWxsLCBgJHtxdWFkcklucD8uaWQgPz8gXCJVTkRFRklORUQgUVVBRFJBTlQgSU5QVVQgSURcIn1gLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChxdWFkcklucHMgPz8gbnVsbCwgXCJxdWFkcklucHNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChyZXNldERpdnNRdWFkcnMubGVuZ3RoID4gMCkge1xyXG4gICAgcmVzZXREaXZzUXVhZHJzLmZvckVhY2goKHJlc2V0QnRuKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc2V0QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIE9kSGFuZGxlci5yZXNldExhYmVscyhyZXNldEJ0bik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKHJlc2V0QnRuID8/IG51bGwsIGAke3Jlc2V0QnRuPy5pZCA/PyBcIlVOREVGSU5FRCBJRCBSRVNFVCBCVVRUT05cIn1gLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChyZXNldERpdnNRdWFkcnMgPz8gbnVsbCwgXCJyZXNldERpdnNRYXVkcnNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIE9kTW9kZWwub3JkZXJMYWJlbHMoKTtcclxufSk7XHJcbmlmICh0cmF0Q29udGFpbmVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgIHRyYXRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChjbGljaykgPT4gT2RIYW5kbGVyLmFkZFN1YkRpdlRyYXQoY2xpY2spKTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQodHJhdENvbnRhaW5lciA/PyBudWxsLCBcInRyYXRDb250YWluZXJcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChkYXRlQnRucy5sZW5ndGggPiAwKSB7XHJcbiAgICBkYXRlQnRucy5mb3JFYWNoKGZ1bmN0aW9uIChkYXRlQnRuKSB7XHJcbiAgICAgICAgaWYgKGRhdGVCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBkYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoYWN0aXZhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsSGFuZGxlci51c2VDdXJyZW50RGF0ZShhY3RpdmF0aW9uLCBkYXRlQnRuKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoZGF0ZUJ0biA/PyBudWxsLCBgJHtkYXRlQnRuPy5pZCB8fCBcIlVOREVGSU5FRCBJRCBEQVRFIEJVVFRPTlwifWAsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKGRhdGVCdG5zID8/IG51bGwsIFwiZGF0ZUJ0bnNcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChlZGl0YWJsZUNpdGUpIHtcclxuICAgIGxldCBmaXJzdENsaWNrID0gdHJ1ZTtcclxuICAgIGNvbnN0IGNpdGVDbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoY2xpY2spIHtcclxuICAgICAgICBpZiAoZmlyc3RDbGljayAmJiBjbGljay50YXJnZXQgJiYgY2xpY2sudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgR2xvYmFsTW9kZWwucmVtb3ZlRmlyc3RDbGljayhjbGljay50YXJnZXQpO1xyXG4gICAgICAgICAgICBmaXJzdENsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2l0ZUNsaWNrSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoY2xpY2s/LnRhcmdldCA/PyBudWxsLCBcImNsaWNrIHRhcmdldCBlZGl0YWJsZUNpdGVcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBlZGl0YWJsZUNpdGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChrZXlwcmVzcykge1xyXG4gICAgICAgIGlmIChrZXlwcmVzcy50YXJnZXQgJiYga2V5cHJlc3MudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgR2xvYmFsTW9kZWwuYXV0b0NhcGl0YWxpemVDaXRlKGtleXByZXNzLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoa2V5cHJlc3M/LnRhcmdldCA/PyBudWxsLCBcImtleXByZXNzIHRhcmdldCBlZGl0YWJsZUNpdGVcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgZWRpdGFibGVDaXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaXRlQ2xpY2tIYW5kbGVyKTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQobnVsbCwgXCJlZGl0YWJsZUNpdGVcIiwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG59XHJcbmlmIChhc3REaWd0QnRucy5sZW5ndGggPiAwKSB7XHJcbiAgICBhc3REaWd0QnRucy5mb3JFYWNoKGZ1bmN0aW9uIChhc3REaWd0QnRuKSB7XHJcbiAgICAgICAgaWYgKGFzdERpZ3RCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBhc3REaWd0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoY2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBHbG9iYWxIYW5kbGVyLmNoYW5nZVRvQXN0RGlnaXQoY2xpY2ssIGFzdERpZ3RCdG4pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChhc3REaWd0QnRuID8/IG51bGwsIGFzdERpZ3RCdG4/LmlkIHx8IFwiVU5ERUZJTkVEIElEIEJVVFRPTlwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChhc3REaWd0QnRucyA/PyBudWxsLCBcImFzdERpZ3RCdG5zXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG5pZiAoZGVhY3RBdXRvY29ycmVjdEJ0bnMubGVuZ3RoID4gMCkge1xyXG4gICAgZGVhY3RBdXRvY29ycmVjdEJ0bnMuZm9yRWFjaChmdW5jdGlvbiAoZGVhY3RBdXRvY29ycmVjdEJ0bikge1xyXG4gICAgICAgIGlmIChkZWFjdEF1dG9jb3JyZWN0QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZGVhY3RBdXRvY29ycmVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR2xvYmFsTW9kZWwuc3dpdGNoQXV0b2NvcnJlY3QoY2xpY2ssIGRlYWN0QXV0b2NvcnJlY3RCdG4pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgICAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoZGVhY3RBdXRvY29ycmVjdEJ0bnMgPz8gbnVsbCwgYCR7ZGVhY3RBdXRvY29ycmVjdEJ0bj8uaWQgfHwgXCJVTkRFRklORUQgSUQgQlVUVE9OXCJ9YCwgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xyXG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoZGVhY3RBdXRvY29ycmVjdEJ0bnMgPz8gbnVsbCwgXCJkZWFjdEF1dG9Db3JyZWN0QnRuc1wiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKHN1YkJ1dHRvbiBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICBzdWJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIEdsb2JhbEhhbmRsZXIuc3ViRm9ybSk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBjb25zdCBzbGljZWRFcnJvciA9IG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XHJcbiAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKHN1YkJ1dHRvbiA/PyBudWxsLCBcInN1YkJ1dHRvblwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XHJcbn1cclxuaWYgKHJlc2V0Rm9ybUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICByZXNldEZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChjbGljaykgPT4gR2xvYmFsSGFuZGxlci5yZXNldGFyRm9ybXVsYXJpbyhjbGljaywgYXN0RGlndEJ0bnMpKTtcclxufVxyXG5lbHNlIHtcclxuICAgIGNvbnN0IHNsaWNlZEVycm9yID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcclxuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQocmVzZXRGb3JtQnRuID8/IG51bGwsIFwicmVzZXRGb3JtQnRuXCIsIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiKTtcclxufVxyXG4vL1RPRE8gREVTQVRJVkFETyBQT1IgRU5RVUFOVE9cclxuLy8gc3ViRGl2c1F1YWRycy5mb3JFYWNoKChzdWJEaXZRdWFkcnMpID0+IHtcclxuLy8gICBzdWJEaXZRdWFkcnMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChzZWxlY3RlZEJ1dCkgPT4ge1xyXG4vLyAgICAgT2RIYW5kbGVyLnJlb3JkZXJMYWJlbHMoc2VsZWN0ZWRCdXQpO1xyXG4vLyAgIH0pO1xyXG4vLyB9KTtcclxuLy8gaW5zcFNwYW5TdWJzQXJyYXkuZm9yRWFjaCgoaW5zcFNwYW5TdWIpID0+IHtcclxuLy8gICBpbnNwU3BhblN1Yi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChtb3VzZW1vdmUpID0+XHJcbi8vICAgICBPZEhhbmRsZXIucmVzaXplQ29udGFpbmVycyhtb3VzZW1vdmUsIHRydWUsIGluc3BTcGFuU3ViKVxyXG4vLyAgICk7XHJcbi8vIH0pO1xyXG4vLyBjb25zdCBpbnBzQXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbaWRePVwiaW5wQXN0XCJdJyk7XHJcbi8vIGNvbnN0IGNvbmZpcm1Mb2NJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj1cImNvbmZpcm1Mb2NJZFwiXScpO1xyXG4vLyBjb25zdCBpbnNwRGlhbG9ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpYWxvZ1tpZF49XCJpbnNwRGlhbG9nXCJdJyk7XHJcbi8vIGlmIChlZGl0YWJsZUNpdGUpIHtcclxuLy8gZWRpdGFibGVDaXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKG1vdXNlbW92ZSkgPT5cclxuLy8gICBPZEhhbmRsZXIucmVzaXplQ29udGFpbmVycyhtb3VzZW1vdmUsIHRydWUsIGVkaXRhYmxlQ2l0ZSlcclxuLy8gKTtcclxuLy8gfVxyXG4vLyBleHBvcnQgZnVuY3Rpb24gY3Vyc29yTW92ZW1lbnRLZXlib2FyZCh0YXJnZXRFbGVtZW50KSB7XHJcbi8vICAgdGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4vLyAgICAgY3Vyc29yUG9zaXRpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldDtcclxuLy8gICAgIGNvbnNvbGUubG9nKFwiUG9zacOnw6NvIGRvIGN1cnNvciBhdHVhbGl6YWRhKGNsaWNrKTogXCIgKyBjdXJzb3JQb3NpdGlvbik7XHJcbi8vICAgfSk7XHJcbi8vICAgLy8gdGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XHJcbi8vICAgLy8gICBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwKSB7XHJcbi8vICAgLy8gICAgIGZvciAobGV0IGlTTSA9IDA7IGlTTSA8IHNlbGVjdGlvbi5yYW5nZUNvdW50OyBpU00rKykge1xyXG4vLyAgIC8vICAgICAgIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoaVNNKTtcclxuLy8gICAvLyAgICAgICBjb25zb2xlLmxvZyhcIlRleHRvIHNlbGVjaW9uYWRvOiBcIiArIHJhbmdlLnRvU3RyaW5nKCkpO1xyXG4vLyAgIC8vICAgICB9XHJcbi8vICAgLy8gICB9XHJcbi8vICAgLy8gfSk7XHJcbi8vICAgLy8gbGV0IHRleHRDb3VudGVyID0gMFxyXG4vLyAgIC8vIGxldCBwcmV2aW91c1RleHRMZW5ndGggPVxyXG4vLyAgIGxldCBpc0tleXVwTGlzdGVuZWQgPSBmYWxzZTtcclxuLy8gICBsZXQgdGV4dEFmdGVyS2V5dXAgPSBcIlwiO1xyXG4vLyAgIGNvbnNvbGUubG9nKFwicHJldmlvdXNUZXh0TGVuZ3RoIFwiICsgcHJldmlvdXNUZXh0TGVuZ3RoKTtcclxuLy8gICB0YXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAobW92ZSkgPT4ge1xyXG4vLyAgICAgLy8gdGV4dENvdW50ZXIrK1xyXG4vLyAgICAgaXNLZXl1cExpc3RlbmVkID0gdHJ1ZTtcclxuLy8gICAgIHRleHRBZnRlcktleXVwID0gdGFyZ2V0RWxlbWVudC50ZXh0Q29udGVudDtcclxuLy8gICAgIGNvbnNvbGUubG9nKFwidGV4dCBcIiArIHRleHRBZnRlcktleXVwKTtcclxuLy8gICAgIC8vIGlmIChhZnRlclRleHRMZW5ndGggIT09IHByZXZpb3VzVGV4dExlbmd0aCkge1xyXG4vLyAgICAgLy8gICBjdXJzb3JQb3NpdGlvbiArPSBhZnRlclRleHRMZW5ndGggLSBwcmV2aW91c1RleHRMZW5ndGg7XHJcbi8vICAgICAvLyB9XHJcbi8vICAgICBjdXJzb3JQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XHJcbi8vICAgICAvLyBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwKSB7XHJcbi8vICAgICAvLyAgIGZvciAobGV0IGlTSyA9IDA7IGlTSyA8IHNlbGVjdGlvbi5yYW5nZUNvdW50OyBpU0srKykge1xyXG4vLyAgICAgLy8gICAgIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoaVNLKTtcclxuLy8gICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRleHRvIHNlbGVjaW9uYWRvOiBcIiArIHJhbmdlLnRvU3RyaW5nKCkpO1xyXG4vLyAgICAgLy8gICB9XHJcbi8vICAgICAvLyB9XHJcbi8vICAgICBpZiAoY3Vyc29yUG9zaXRpb24gPT09IDApIHtcclxuLy8gICAgICAgaWYgKG1vdmUua2V5Q29kZSA9PT0gMzkpIHtcclxuLy8gICAgICAgICBjdXJzb3JQb3NpdGlvbisrO1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9zacOnw6NvIGRvIGN1cnNvciBhcMOzcyBhcnJvd1JpZ2h0OiBcIiArIGN1cnNvclBvc2l0aW9uKTtcclxuLy8gICAgICAgICByYW5nZS5zZXRTdGFydCh0YXJnZXRFbGVtZW50LCBjdXJzb3JQb3NpdGlvbik7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0gZWxzZSBpZiAoY3Vyc29yUG9zaXRpb24gPiAwKSB7XHJcbi8vICAgICAgIGlmIChjdXJzb3JQb3NpdGlvbiAhPT0gdGFyZ2V0RWxlbWVudC50ZXh0Q29udGVudC5sZW5ndGgpIHtcclxuLy8gICAgICAgICBpZiAobW92ZS5rZXlDb2RlID09PSAzNykge1xyXG4vLyAgICAgICAgICAgY3Vyc29yUG9zaXRpb24tLTtcclxuLy8gICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9zacOnw6NvIGRvIGN1cnNvciBhcMOzcyBhcnJvd0xlZnQ6IFwiICsgY3Vyc29yUG9zaXRpb24pO1xyXG4vLyAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQodGFyZ2V0RWxlbWVudCwgY3Vyc29yUG9zaXRpb24pO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBpZiAobW92ZS5rZXlDb2RlID09PSAzOSkge1xyXG4vLyAgICAgICAgICAgY3Vyc29yUG9zaXRpb24rKztcclxuLy8gICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9zacOnw6NvIGRvIGN1cnNvciBhcMOzcyBhcnJvd1JpZ2h0OiBcIiArIGN1cnNvclBvc2l0aW9uKTtcclxuLy8gICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KHRhcmdldEVsZW1lbnQsIGN1cnNvclBvc2l0aW9uKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH0gZWxzZSBpZiAoY3Vyc29yUG9zaXRpb24gPT09IHRhcmdldEVsZW1lbnQudGV4dENvbnRlbnQubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgaWYgKG1vdmUua2V5Q29kZSA9PT0gMzcpIHtcclxuLy8gICAgICAgICAgIGN1cnNvclBvc2l0aW9uLS07XHJcbi8vICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvc2nDp8OjbyBkbyBjdXJzb3IgYXDDs3MgYXJyb3dMZWZ0OiBcIiArIGN1cnNvclBvc2l0aW9uKTtcclxuLy8gICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KHRhcmdldEVsZW1lbnQsIGN1cnNvclBvc2l0aW9uKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gICB9KTtcclxuLy8gICBpZiAoaXNLZXl1cExpc3RlbmVkKSB7XHJcbi8vICAgICB0YXJnZXRFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dEFmdGVyS2V5dXA7XHJcbi8vICAgICBpc0tleXVwTGlzdGVuZWQgPSBmYWxzZTtcclxuLy8gICB9XHJcbi8vIH1cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGN1cnNvck1vdmVtZW50TW9iaWxlKCkge1xyXG4vLyAgIGVkaXRhYmxlQ2l0ZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hcIiwgKCkgPT4ge1xyXG4vLyAgICAgY3Vyc29yUG9zaXRpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldDtcclxuLy8gICAgIGNvbnNvbGUubG9nKFwiUG9zacOnw6NvIGRvIGN1cnNvciBhdHVhbGl6YWRhKHRvdWNoKTogXCIgKyBjdXJzb3JQb3NpdGlvbik7XHJcbi8vICAgfSk7XHJcbi8vIH1cclxuLy8gY29uZmlybUxvY0lkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKG1vdXNlbW92ZSkgPT5cclxuLy8gICBPZEhhbmRsZXIucmVzaXplQ29udGFpbmVycyhtb3VzZW1vdmUsIHRydWUsIGNvbmZpcm1Mb2NJZClcclxuLy8gKTtcclxuLy8gaW5wc0FzdC5mb3JFYWNoKChpbnBBc3QpID0+IHtcclxuLy8gICBpbnBBc3QuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAobW91c2Vtb3ZlKSA9PlxyXG4vLyAgICAgT2RIYW5kbGVyLnJlc2l6ZUNvbnRhaW5lcnMobW91c2Vtb3ZlLCB0cnVlLCBpbnBBc3QpXHJcbi8vICAgKTtcclxuLy8gfSk7XHJcbi8vIGluc3BEaWFsb2dzLmZvckVhY2goKGluc3BEaWFsb2cpID0+IHtcclxuLy8gICBpbnNwRGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKG1vdXNlbW92ZSkgPT5cclxuLy8gICAgIE9kSGFuZGxlci5yZXNpemVDb250YWluZXJzKG1vdXNlbW92ZSwgdHJ1ZSwgaW5zcERpYWxvZylcclxuLy8gICApO1xyXG4vLyB9KTtcclxuLy8gdHJhdFR5cGVTcGFucy5mb3JFYWNoKCh0cmF0VHlwZVNwYW4pID0+IHtcclxuLy8gICB0cmF0VHlwZVNwYW4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAobW91c2Vtb3ZlKSA9PlxyXG4vLyAgICAgT2RIYW5kbGVyLnJlc2l6ZUNvbnRhaW5lcnMobW91c2Vtb3ZlLCB0cnVlLCB0cmF0VHlwZVNwYW4pXHJcbi8vICAgKTtcclxuLy8gICB0cmF0VHlwZVNwYW4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAobW91c2Vtb3ZlKSA9PlxyXG4vLyAgICAgT2RIYW5kbGVyLmFwcGx5UmVzaXppbmdDdXJzb3IobW91c2Vtb3ZlLCB0cmF0VHlwZVNwYW4pXHJcbi8vICAgKTtcclxuLy8gfSk7XHJcbi8vIHRhVHJhdHMuZm9yRWFjaCgodGFUcmF0KSA9PiB7XHJcbi8vICAgdGFUcmF0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKG1vdXNlbW92ZSkgPT5cclxuLy8gICAgIE9kSGFuZGxlci5hcHBseVJlc2l6aW5nQ3Vyc29yKG1vdXNlbW92ZSwgdGFUcmF0KVxyXG4vLyAgICk7XHJcbi8vIH0pO1xyXG4vLyBlZGl0YWJsZUNpdGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAobW91c2Vtb3ZlKSA9PlxyXG4vLyAgIE9kSGFuZGxlci5yZXNpemVDb250YWluZXJzKG1vdXNlbW92ZSwgdHJ1ZSwgZWRpdGFibGVDaXRlKVxyXG4vLyApO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=