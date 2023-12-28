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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TTtBQUVOLDREQUE0RDtBQUM1RCw4REFBOEQ7QUFDOUQsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL29kb250b2xvZ2lhLXByb3NhdWRlLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9jbGFzc2VzLnRzeCIsIndlYnBhY2s6Ly9vZG9udG9sb2dpYS1wcm9zYXVkZS8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZXJyb3JIYW5kbGVyLnRzeCIsIndlYnBhY2s6Ly9vZG9udG9sb2dpYS1wcm9zYXVkZS8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ0hhbmRsZXJzLnRzeCIsIndlYnBhY2s6Ly9vZG9udG9sb2dpYS1wcm9zYXVkZS8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ01vZGVsLnRzeCIsIndlYnBhY2s6Ly9vZG9udG9sb2dpYS1wcm9zYXVkZS8uL3NyYy9vZEhhbmRsZXIudHN4Iiwid2VicGFjazovL29kb250b2xvZ2lhLXByb3NhdWRlLy4vc3JjL29kTW9kZWwudHN4Iiwid2VicGFjazovL29kb250b2xvZ2lhLXByb3NhdWRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kb250b2xvZ2lhLXByb3NhdWRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZG9udG9sb2dpYS1wcm9zYXVkZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kb250b2xvZ2lhLXByb3NhdWRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2RvbnRvbG9naWEtcHJvc2F1ZGUvLi9zcmMvb2RDb250cm9sbGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtQ2xhc3NQZXJzb24sIGZvcm1QZXJzb24gfSBmcm9tIFwiLi90eXBlc1wiO1xuLy8gaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY2xhc3MgSlNPTlN0b3JhZ2VyIHtcbiAgI2lkO1xuICAjdmFsdWU7XG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLiNpZCA9IGlkO1xuICAgIHRoaXMuI3ZhbHVlID0gdmFsdWU7XG4gICAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbiAgfVxuICBnZXQgc2hvd0lucElkKCkge1xuICAgIHJldHVybiB0aGlzLiNpZDtcbiAgfVxuICBnZXQgc2hvd0lucFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLiN2YWx1ZTtcbiAgfVxuICBnZXQgc2hvd0FsbEluZm8oKSB7XG4gICAgcmV0dXJuIFt0aGlzLiNpZCwgdGhpcy4jdmFsdWVdO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBKU09OVGl0bGVTdG9yYWdlciB7XG4gICN0aXRsZTtcbiAgY29uc3RydWN0b3IodGl0bGU6IEVsZW1lbnQgfCBzdHJpbmcgfCBudWxsKSB7XG4gICAgdGhpcy4jdGl0bGUgPSB0aXRsZTtcbiAgICBPYmplY3QuZnJlZXplKHRoaXMpO1xuICB9XG4gIGdldCBzaG93SW5wVGl0bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3RpdGxlO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVW5kZWZpbmVkUGVyc29uIHtcbiAgZ2VuOiBzdHJpbmc7XG4gIGFnZTogbnVtYmVyO1xuICBzdW1EQ3V0OiBudW1iZXI7XG4gIHdlaWdodDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgYXR2THZsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBQZXJzb24ge1xuICBnZW47XG4gIGFnZTtcbiAgd2VpZ2h0O1xuICBoZWlnaHQ7XG4gIHN1bURDdXQ7XG4gIGF0dkx2bDtcbiAgY29uc3RydWN0b3IoXG4gICAgZ2VuOiBzdHJpbmcsXG4gICAgYWdlOiBudW1iZXIsXG4gICAgd2VpZ2h0OiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgc3VtREN1dDogbnVtYmVyLFxuICAgIGF0dkx2bDogc3RyaW5nXG4gICkge1xuICAgIHRoaXMuZ2VuID0gZ2VuO1xuICAgIHRoaXMuYWdlID0gYWdlO1xuICAgIHRoaXMud2VpZ2h0ID0gd2VpZ2h0O1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuc3VtREN1dCA9IHN1bURDdXQ7XG4gICAgdGhpcy5hdHZMdmwgPSBhdHZMdmw7XG4gIH1cblxuICBjaGVja0F0dkx2bChwZXJzb246IGZvcm1DbGFzc1BlcnNvbikge1xuICAgIGlmIChwZXJzb24gJiYgXCJhdHZMdmxcIiBpbiBwZXJzb24gJiYgdGhpcy5hdHZMdmwgIT09IFwiXCIpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5hdHZMdmwpIHtcbiAgICAgICAgY2FzZSBcInNlZGVudGFyaW9cIjpcbiAgICAgICAgICByZXR1cm4gMS4yO1xuICAgICAgICBjYXNlIFwibGV2ZVwiOlxuICAgICAgICAgIHJldHVybiAxLjQ7XG4gICAgICAgIGNhc2UgXCJtb2RlcmFkb1wiOlxuICAgICAgICAgIHJldHVybiAxLjY7XG4gICAgICAgIGNhc2UgXCJpbnRlbnNvXCI6XG4gICAgICAgICAgcmV0dXJuIDEuOTtcbiAgICAgICAgY2FzZSBcIm11aXRvSW50ZW5zb1wiOlxuICAgICAgICAgIHJldHVybiAyLjI7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIGBFcnJvIHZhbGlkYW5kbyBjYXNvLiBDYXNvIG9idGlkbzogJHtcbiAgICAgICAgICAgICAgdGhpcy5hdHZMdmwgPz8gXCJudWxsXCJcbiAgICAgICAgICAgIH07IENhc29zIHBvc3PDrXZlaXM6IHNlZGVudMOhcmlvIHx8IGxldmUgfHwgbW9kZXJhZG8gfHwgaW50ZW5zbyB8fCBtdWl0b0ludGVuc29gXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgcGVzc29hLiBWYWxvciBvYnRpZG86ICR7XG4gICAgICAgICAgcGVyc29uID8/IFwibnVsbFwiXG4gICAgICAgIH07IGluc3TDom5jaWEgJHtcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGVyc29uKS5zbGljZSg4LCAtMSkgPz8gXCJudWxsXCJcbiAgICAgICAgfTsgVmFsb3IgZGUgTsOtdmVsIGRlIEF0aXZpZGFkZSBGw61zaWNhIG9idGlkbzogJHt0aGlzLmF0dkx2bCA/PyBcIm51bGxcIn1gXG4gICAgICApO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgY2FsY0lNQyhcbiAgICBwZXJzb246IGZvcm1DbGFzc1BlcnNvblxuICApOiBbc3RyaW5nLCBudW1iZXIsIG51bWJlcl0gfCB1bmRlZmluZWQgfCBuZXZlciB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChcbiAgICAgICAgcGVyc29uICYmXG4gICAgICAgIFwid2VpZ2h0XCIgaW4gcGVyc29uICYmXG4gICAgICAgIHRoaXMud2VpZ2h0ID4gMCAmJlxuICAgICAgICBcImhlaWdodFwiIGluIHBlcnNvbiAmJlxuICAgICAgICB0aGlzLmhlaWdodCA+IDBcbiAgICAgICkge1xuICAgICAgICBjb25zdCBJTUMgPSB0aGlzLndlaWdodCAvIHRoaXMuaGVpZ2h0ICoqIDI7XG4gICAgICAgIGlmIChJTUMgJiYgSU1DID4gMCkge1xuICAgICAgICAgIGNvbnN0IE1MRyA9IHRoaXMud2VpZ2h0IC0gdGhpcy53ZWlnaHQgKiAoSU1DIC8gMTAwKSA/PyAwO1xuICAgICAgICAgIGlmIChJTUMgPCAxOC41KSB7XG4gICAgICAgICAgICByZXR1cm4gW1wiYWJhaXhvXCIsIElNQywgTUxHXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKElNQyA+PSAxOC41ICYmIElNQyA8IDI1LjApIHtcbiAgICAgICAgICAgIHJldHVybiBbXCJldXRyb2ZpY29cIiwgSU1DLCBNTEddO1xuICAgICAgICAgIH0gZWxzZSBpZiAoSU1DID49IDI1LjAgJiYgSU1DIDwgMzApIHtcbiAgICAgICAgICAgIHJldHVybiBbXCJzb2JyZXBlc29cIiwgSU1DLCBNTEddO1xuICAgICAgICAgIH0gZWxzZSBpZiAoSU1DID49IDMwICYmIElNQyA8IDM1KSB7XG4gICAgICAgICAgICByZXR1cm4gW1wib2Jlc28xXCIsIElNQywgTUxHXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKElNQyA+PSAzNSAmJiBJTUMgPCA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcIm9iZXNvMlwiLCBJTUMsIE1MR107XG4gICAgICAgICAgfSBlbHNlIGlmIChJTUMgPiA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcIm9iZXNvM1wiLCBJTUMsIE1MR107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYEVycm8gY2xhc3NpZmljYW5kbyBJTUMuIFZhbG9yIG9idGlkbzogJHtcbiAgICAgICAgICAgICAgICBJTUMgPz8gMFxuICAgICAgICAgICAgICB9OyBWYWxvcmVzIHBvc3PDrXZlaXMgZGV2ZW0gc2VyIHBvc2l0aXZvc2BcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBFcnJvIGNhbGN1bGFuZG8gSU1DLiBWYWxvcmVzIHVzYWRvczogUGVzbyAke1xuICAgICAgICAgICAgICB0aGlzLndlaWdodCA/PyAwXG4gICAgICAgICAgICB9IGUgQWx0dXJhICR7dGhpcy5oZWlnaHQgPz8gMH1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBFcnJvIHZhbGlkYW5kbyBkYWRvcyBmb3JuZWNpZG9zLiBFbGVtZW50byBwZXNzb2E6ICR7XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGVyc29uKS5zbGljZSg4LCAtMSkgPz8gXCJudWxsXCJcbiAgICAgICAgICB9OyB3ZWlnaHQgcHJlc2VudGU6ICR7XCJ3ZWlnaHRcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgICAgIFBlc28gb2J0aWRvOiAke3RoaXMud2VpZ2h0ID8/IDB9O1xuICAgICAgICAgIGhlaWdodCBwcmVzZW50ZTogJHtcImhlaWdodFwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICAgICAgQWx0dXJhIG9idGlkYTogJHt0aGlzLmhlaWdodCA/PyAwfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChJTUNFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcigoSU1DRXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIFtcIlwiLCAwLCAwXTtcbiAgICB9XG4gIH1cblxuICBjYWxjUEdDKHBlcnNvbjogZm9ybUNsYXNzUGVyc29uKSB7XG4gICAgaWYgKFwic3VtREN1dFwiIGluIHBlcnNvbiAmJiB0aGlzLnN1bURDdXQgPj0gMCkge1xuICAgICAgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIE1hbikge1xuICAgICAgICBsZXQgREMgPVxuICAgICAgICAgIDEuMTA5MzggLVxuICAgICAgICAgIDAuMDAwODI2NyAqIHRoaXMuc3VtREN1dCArXG4gICAgICAgICAgMC4wMDAwMDE2ICogdGhpcy5zdW1EQ3V0ICoqIDIgLVxuICAgICAgICAgIDAuMDAwMjU3NCAqIHBlcnNvbi5hZ2U7XG4gICAgICAgIGlmIChEQyA8PSAwIHx8IE51bWJlci5pc05hTihEQykpIHtcbiAgICAgICAgICBEQyA9IDAuMDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IFBHQyA9IDQ5NSAvIERDIC0gNDUwO1xuICAgICAgICBpZiAoUEdDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKFBHQykpIHtcbiAgICAgICAgICBQR0MgPSAwLjAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChQR0MgPiAxMDApIHtcbiAgICAgICAgICBQR0MgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFBHQztcbiAgICAgIH0gZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgV29tYW4pIHtcbiAgICAgICAgbGV0IERDID1cbiAgICAgICAgICAxLjA5OTQ5MjEgLVxuICAgICAgICAgIDAuMDAwOTkyOSAqIHRoaXMuc3VtREN1dCArXG4gICAgICAgICAgMC4wMDAwMDIzICogdGhpcy5zdW1EQ3V0ICoqIDIgLVxuICAgICAgICAgIDAuMDAwMTM5MiAqIHBlcnNvbi5hZ2U7XG4gICAgICAgIGlmIChEQyA8PSAwIHx8IE51bWJlci5pc05hTihEQykpIHtcbiAgICAgICAgICBEQyA9IDAuMDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IFBHQyA9IDQ5NSAvIERDIC0gNDUwO1xuICAgICAgICBpZiAoUEdDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKFBHQykpIHtcbiAgICAgICAgICBQR0MgPSAwLjAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChQR0MgPiAxMDApIHtcbiAgICAgICAgICBQR0MgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFBHQztcbiAgICAgIH0gZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgTmV1dHJvKSB7XG4gICAgICAgIGxldCBEQyA9XG4gICAgICAgICAgMS4xMDQ0MzYwNSAtXG4gICAgICAgICAgMC4wMDA5MDk4ICogdGhpcy5zdW1EQ3V0ICtcbiAgICAgICAgICAwLjAwMDAwMTk1ICogdGhpcy5zdW1EQ3V0ICoqIDIgLVxuICAgICAgICAgIDAuMDAwMTk4MyAqIHBlcnNvbi5hZ2U7XG4gICAgICAgIGlmIChEQyA8PSAwIHx8IE51bWJlci5pc05hTihEQykpIHtcbiAgICAgICAgICBEQyA9IDAuMDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IFBHQyA9IDQ5NSAvIERDIC0gNDUwO1xuICAgICAgICBpZiAoUEdDIDw9IDAgfHwgTnVtYmVyLmlzTmFOKFBHQykpIHtcbiAgICAgICAgICBQR0MgPSAwLjAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChQR0MgPiAxMDApIHtcbiAgICAgICAgICBQR0MgPSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFBHQztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYEluc3TDom5jaWEgZGUgb2JqZXRvIGludsOhbGlkYS4gSW5zdMOibmNpYSBvYnRpZGE6ICR7XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGVyc29uKS5zbGljZSg4LCAtMSkgPz8gXCJudWxsXCJcbiAgICAgICAgICB9YFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYWRvIFByb3ByaWVkYWRlIHN1bURDdXQ6XG4gICAgICBFc3TDoSBwcmVzZW50ZTogJHtcInN1bURDdXRcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgVmFsb3Igb2J0aWRvOiAke3RoaXMuc3VtREN1dCA/PyAwfWApO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgY2FsY1RNQihcbiAgICBwZXJzb246IGZvcm1DbGFzc1BlcnNvbixcbiAgICBJTUM6IG51bWJlcixcbiAgICBmYWN0b3JBdGxldGE6IHN0cmluZyxcbiAgICBNTEc6IG51bWJlclxuICApOiBbc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChwZXJzb24gJiYgXCJhdHZMdmxcIiBpbiBwZXJzb24gJiYgdGhpcy5hdHZMdmwpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuYXR2THZsID09PSBcIm11aXRvSW50ZW5zb1wiICYmXG4gICAgICAgICAgKGZhY3RvckF0bGV0YSA9PT0gXCJNTEdcIiB8fCBmYWN0b3JBdGxldGEgPT09IFwiUGVzb1wiKVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoZmFjdG9yQXRsZXRhID09PSBcIk1MR1wiKSB7XG4gICAgICAgICAgICBpZiAoTUxHICYmIE1MRyA+IDApIHtcbiAgICAgICAgICAgICAgY29uc3QgVE1CID0gMjUuOSAqIE1MRyArIDI4NDtcbiAgICAgICAgICAgICAgcmV0dXJuIFtcInRpbnNsZXlcIiwgVE1CXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXJybyB2YWxpZGFuZG8gTUxHLlxuICAgICAgICAgICAgICBWYWxvciBvYnRpZG86ICR7TUxHID8/IDB9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChmYWN0b3JBdGxldGEgPT09IFwiUGVzb1wiKSB7XG4gICAgICAgICAgICBpZiAoXCJ3ZWlnaHRcIiBpbiBwZXJzb24gJiYgdGhpcy53ZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IFRNQiA9IDI0LjggKiB0aGlzLndlaWdodCArIDEwO1xuICAgICAgICAgICAgICByZXR1cm4gW1widGluc2xleVwiLCBUTUJdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyB3ZWlnaHQuXG4gICAgICAgICAgICAgIFZhbG9yIG9idGlkbzogJHt0aGlzLndlaWdodCA/PyAwfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLmF0dkx2bCA9PT0gXCJzZWRlbnRhcmlvXCIgfHxcbiAgICAgICAgICB0aGlzLmF0dkx2bCA9PT0gXCJsZXZlXCIgfHxcbiAgICAgICAgICB0aGlzLmF0dkx2bCA9PT0gXCJtb2RlcmFkb1wiIHx8XG4gICAgICAgICAgdGhpcy5hdHZMdmwgPT09IFwiaW50ZW5zb1wiXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIFwid2VpZ2h0XCIgaW4gcGVyc29uICYmXG4gICAgICAgICAgICB0aGlzLndlaWdodCA+IDAgJiZcbiAgICAgICAgICAgIFwiaGVpZ2h0XCIgaW4gcGVyc29uICYmXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA+IDAgJiZcbiAgICAgICAgICAgIFwiYWdlXCIgaW4gcGVyc29uXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoSU1DIDwgMjUuMCAmJiBJTUMgPiAwKSB7XG4gICAgICAgICAgICAgIGlmIChwZXJzb24gaW5zdGFuY2VvZiBNYW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBUTUIgPVxuICAgICAgICAgICAgICAgICAgNjYgK1xuICAgICAgICAgICAgICAgICAgKDEzLjggKiB0aGlzLndlaWdodCArIDUuMCAqIHRoaXMuaGVpZ2h0IC0gNi44ICogdGhpcy5hZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbXCJoYXJyaXNCZW5lZGljdFwiLCBUTUJdO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIFdvbWFuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgVE1CID1cbiAgICAgICAgICAgICAgICAgIDY1NSArXG4gICAgICAgICAgICAgICAgICAoOS42ICogdGhpcy53ZWlnaHQgKyAxLjkgKiB0aGlzLmhlaWdodCAtIDQuNyAqIHRoaXMuYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiaGFycmlzQmVuZWRpY3RcIiwgVE1CXTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChwZXJzb24gaW5zdGFuY2VvZiBOZXV0cm8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBUTUIgPVxuICAgICAgICAgICAgICAgICAgMzYwLjUgK1xuICAgICAgICAgICAgICAgICAgKDExLjcgKiB0aGlzLndlaWdodCArIDMuNDUgKiB0aGlzLmhlaWdodCAtIDUuNzUgKiB0aGlzLmFnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImhhcnJpc0JlbmVkaWN0XCIsIFRNQl07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgUGVyc29uLiBJbnN0w6JuY2lhIG9idGlkYTogJHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBlcnNvbikuc2xpY2UoOCwgLTEpID8/XG4gICAgICAgICAgICAgICAgICAgIFwibnVsbFwiXG4gICAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoSU1DID49IDI1LjApIHtcbiAgICAgICAgICAgICAgaWYgKHBlcnNvbiBpbnN0YW5jZW9mIE1hbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IFRNQiA9XG4gICAgICAgICAgICAgICAgICAxMCAqIHRoaXMud2VpZ2h0ICsgNi4yNSAqIHRoaXMuaGVpZ2h0IC0gNS4wICogdGhpcy5hZ2UgKyA1O1xuICAgICAgICAgICAgICAgIHJldHVybiBbXCJtaWZmbGluU3RKZW9yXCIsIFRNQl07XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgV29tYW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBUTUIgPVxuICAgICAgICAgICAgICAgICAgMTAgKiB0aGlzLndlaWdodCArIDYuMjUgKiB0aGlzLmhlaWdodCAtIDUuMCAqIHRoaXMuYWdlIC0gMTYxO1xuICAgICAgICAgICAgICAgIHJldHVybiBbXCJtaWZmbGluU3RKZW9yXCIsIFRNQl07XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyc29uIGluc3RhbmNlb2YgTmV1dHJvKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgVE1CID1cbiAgICAgICAgICAgICAgICAgIDEwICogdGhpcy53ZWlnaHQgKyA2LjI1ICogdGhpcy5oZWlnaHQgLSA1LjAgKiB0aGlzLmFnZSAtIDc4O1xuICAgICAgICAgICAgICAgIHJldHVybiBbXCJtaWZmbGluU3RKZW9yXCIsIFRNQl07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgYEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgUGVyc29uLiBJbnN0w6JuY2lhIG9idGlkYTogJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKHBlcnNvbilcbiAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBFcnJvIHZhbGlkYW5kbyBJTUMuIElNQyBvYnRpZG86ICR7XG4gICAgICAgICAgICAgICAgICBJTUMgPz8gMFxuICAgICAgICAgICAgICAgIH07IFZhbG9yIGRldmUgc2VyIG7Dum1lcmljbywgcG9zaXRpdm8gZSBmbG9hdGBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvIHZhbGlkYW5kbyBwcm9wcmllZGFkZXMgZGUgcGVyc29uLlxuICAgICAgICAgICAgd2VpZ2h0IHByZXNlbnRlOiAke1wid2VpZ2h0XCIgaW4gcGVyc29uID8/IGZhbHNlfTtcbiAgICAgICAgICAgIFZhbG9yIGRlIHdlaWdodCBvYnRpZG86ICR7dGhpcy53ZWlnaHQgPz8gMH07XG4gICAgICAgICAgICBoZWlnaHQgcHJlc2VudGU6ICR7XCJoZWlnaHRcIiBpbiBwZXJzb24gPz8gZmFsc2V9O1xuICAgICAgICAgICAgVmFsb3IgZGUgaGVpZ2h0IG9idGlkbzogJHt0aGlzLmhlaWdodCA/PyAwfTtcbiAgICAgICAgICAgIGFnZSBwcmVzZW50ZTogJHtcImFnZVwiIGluIHBlcnNvbiA/PyBmYWxzZX07XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYEVycm8gdmFsaWRhbmRvIGF0dkx2bCBlL291IGZhY3RvckF0bGV0YS5cbiAgICAgICAgICAgIGF0dkx2bCBvYnRpZG86ICR7dGhpcy5hdHZMdmwgPz8gXCJudWxsXCJ9XG4gICAgICAgICAgICBGYXRvciBvYnRpZG86ICR7XG4gICAgICAgICAgICAgIGZhY3RvckF0bGV0YSA/PyBcIm51bGxcIlxuICAgICAgICAgICAgfTsgRmF0b3JlcyB2w6FsaWRvczogXCJNTEdcIiB8fCBcIlBlc29cImBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm8gdmFsaWRhbmRvIHBlcnNvbi5cbiAgICAgICAgRWxlbWVudG86ICR7cGVyc29uID8/IFwibnVsbFwifTtcbiAgICAgICAgSW5zdMOibmNpYTogJHtcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGVyc29uKS5zbGljZSg4LCAtMSkgPz8gXCJudWxsXCJcbiAgICAgICAgfTtcbiAgICAgICAgYXR2THZsIHByZXNlbnRlOiAke1wiYXR2THZsXCIgaW4gcGVyc29uID8/IGZhbHNlfTtcbiAgICAgICAgVmFsb3IgZGUgYXR2THZsIG9idGlkbzogJHt0aGlzLmF0dkx2bCA/PyBcIm51bGxcIn1gKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChUTUJFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcigoVE1CRXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIFtcIlwiLCAwXTtcbiAgICB9XG4gIH1cblxuICBjYWxjR0VUKFRNQjogbnVtYmVyLCBmYWN0b3JBdHZMdmw6IG51bWJlcikge1xuICAgIGlmIChUTUIgJiYgZmFjdG9yQXR2THZsKSB7XG4gICAgICBjb25zdCBHRVQgPSBUTUIgKiBmYWN0b3JBdHZMdmw7XG4gICAgICByZXR1cm4gR0VUO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyBhcmd1bWVudG9zLlxuICAgICAgVE1CIG9idGlkbzogJHtUTUIgPz8gMH07XG4gICAgICBmYWN0b3JBdHZMdmwgb2J0aWRvOiAke2ZhY3RvckF0dkx2bCA/PyAwfWApO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsb25lUGVyc29uKHBlcnNvbjogZm9ybVBlcnNvbikge1xuICAgIGlmIChwZXJzb24gJiYgXCJnZW5cIiBpbiBwZXJzb24pIHtcbiAgICAgIHN3aXRjaCAocGVyc29uLmdlbikge1xuICAgICAgICBjYXNlIFwibWFzY3VsaW5vXCI6XG4gICAgICAgICAgcmV0dXJuIG5ldyBNYW4oXG4gICAgICAgICAgICBwZXJzb24uZ2VuLFxuICAgICAgICAgICAgcGVyc29uLmFnZSxcbiAgICAgICAgICAgIHBlcnNvbi53ZWlnaHQsXG4gICAgICAgICAgICBwZXJzb24uaGVpZ2h0LFxuICAgICAgICAgICAgcGVyc29uLnN1bURDdXQsXG4gICAgICAgICAgICBwZXJzb24uYXR2THZsXG4gICAgICAgICAgKTtcbiAgICAgICAgY2FzZSBcImZlbWluaW5vXCI6XG4gICAgICAgICAgcmV0dXJuIG5ldyBXb21hbihcbiAgICAgICAgICAgIHBlcnNvbi5nZW4sXG4gICAgICAgICAgICBwZXJzb24uYWdlLFxuICAgICAgICAgICAgcGVyc29uLndlaWdodCxcbiAgICAgICAgICAgIHBlcnNvbi5oZWlnaHQsXG4gICAgICAgICAgICBwZXJzb24uc3VtREN1dCxcbiAgICAgICAgICAgIHBlcnNvbi5hdHZMdmxcbiAgICAgICAgICApO1xuICAgICAgICBjYXNlIFwibmV1dHJvXCI6XG4gICAgICAgICAgcmV0dXJuIG5ldyBOZXV0cm8oXG4gICAgICAgICAgICBwZXJzb24uZ2VuLFxuICAgICAgICAgICAgcGVyc29uLmFnZSxcbiAgICAgICAgICAgIHBlcnNvbi53ZWlnaHQsXG4gICAgICAgICAgICBwZXJzb24uaGVpZ2h0LFxuICAgICAgICAgICAgcGVyc29uLnN1bURDdXQsXG4gICAgICAgICAgICBwZXJzb24uYXR2THZsXG4gICAgICAgICAgKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvIHZhbGlkYW5kbyAuZ2VuIGRlIHBlcnNvbiBwYXNzYWRhIHBhcmEgLmNsb25lUGVyc29uKClcbiAgICAgICAgICAuZ2VuIG9idGlkbzogJHtwZXJzb24/LmdlbiA/PyBcIm51bGxcIn0uYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm8gdmFsaWRhbmRvIHBlcnNvbi5cbiAgICAgIE9iamV0byBvYnRpZG86ICR7XG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwZXJzb24pLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIlxuICAgICAgfTtcbiAgICAgIC5nZW4gcHJlc2VudGU6ICR7XCJnZW5cIiBpbiBwZXJzb24gPz8gZmFsc2V9LmApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWFuIGV4dGVuZHMgUGVyc29uIHtcbiAgLy8gY29uc3RydWN0b3IoZ2VuLCBhZ2UsIHdlaWdodCwgaGVpZ2h0LCBzdW1EQ3V0LCBhdHZMdmwpIHtcbiAgLy8gICBzdXBlcihnZW4sIGFnZSwgd2VpZ2h0LCBoZWlnaHQsIHN1bURDdXQsIGF0dkx2bCk7XG4gIC8vIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdvbWFuIGV4dGVuZHMgUGVyc29uIHtcbiAgLy8gY29uc3RydWN0b3IoZ2VuLCBhZ2UsIHdlaWdodCwgaGVpZ2h0LCBzdW1EQ3V0LCBhdHZMdmwpIHtcbiAgLy8gICBzdXBlcihnZW4sIGFnZSwgd2VpZ2h0LCBoZWlnaHQsIHN1bURDdXQsIGF0dkx2bCk7XG4gIC8vIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5ldXRybyBleHRlbmRzIFBlcnNvbiB7XG4gIC8vIGNvbnN0cnVjdG9yKGdlbiwgYWdlLCB3ZWlnaHQsIGhlaWdodCwgc3VtREN1dCwgYXR2THZsKSB7XG4gIC8vICAgc3VwZXIoZ2VuLCBhZ2UsIHdlaWdodCwgaGVpZ2h0LCBzdW1EQ3V0LCBhdHZMdmwpO1xuICAvLyB9XG59XG4iLCJpbXBvcnQgdHlwZSB7XG4gIHRhcmdTdHIsXG4gIHRleHRFbCxcbiAgZXJyb3JIYW5kbGVOdW1iZXJUeXBlLFxuICBlcnJvckhhbmRsZVRleHRUeXBlLFxuICBlcnJvckhhbmRsZUVsVHlwZSxcbiAgZXJyb3JIYW5kbGVBcnJheVR5cGUsXG4gIGVycm9ySGFuZGxlU3ByZWFkVHlwZSxcbiAgZXJyb3JIYW5kbGVPYmplY3RUeXBlLFxuICBlbnRyeUVsLFxuICBwcmltaXRpdmVUeXBlLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuLy8gaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudE5vdEZvdW5kKFxuICBlbGVtZW50OiBlcnJvckhhbmRsZUVsVHlwZSxcbiAgZWxlbWVudE5hbWU6IGVycm9ySGFuZGxlVGV4dFR5cGUsXG4gIGxpbmU6IHRhcmdTdHJcbikge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICBlbGVtZW50ID0gXCJVTkRFRklORUQgRUxFTUVOVFwiO1xuICB9XG4gIGlmICghZWxlbWVudE5hbWUpIHtcbiAgICBlbGVtZW50TmFtZSA9IFwiVU5OQU1FRCBFTEVNRU5UXCI7XG4gIH1cbiAgaWYgKFxuICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxuICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50IHx8XG4gICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50XG4gICkge1xuICAgIGNvbnNvbGUuZXJyb3IoYFxuICBFTEVNRU5UIE5PVCBGT1VORCwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgJHtcbiAgICAoZWxlbWVudCBhcyBIVE1MRWxlbWVudCk/LmlkIHx8IGVsZW1lbnROYW1lIHx8IFwiTlVMTFwiXG4gIH0uXG4gIEluc3TDom5jaWEgb2J0aWRhOiAke1xuICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpIHx8IFwiTlVMTFwiXG4gIH07XG4gIC52YWx1ZSBvYnRpZG86ICR7KGVsZW1lbnQgYXMgdGV4dEVsKT8udmFsdWUgPz8gXCJOVUxMXCJ9LmApO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoYFxuICBFTEVNRU5UIE5PVCBGT1VORCwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgZGUgJHtcbiAgICAoZWxlbWVudCBhcyBIVE1MRWxlbWVudCk/LmlkIHx8IGVsZW1lbnROYW1lIHx8IFwiVU5ERUZJTkVEIElEIE9SIE5BTUVcIlxuICB9LlxuICBJbnN0w6JuY2lhIG9idGlkYTogJHtcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSB8fCBcIk5VTExcIlxuICB9LmApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnB1dE5vdEZvdW5kKFxuICBlbGVtZW50OiBlcnJvckhhbmRsZUVsVHlwZSxcbiAgZWxlbWVudE5hbWU6IGVycm9ySGFuZGxlVGV4dFR5cGUsXG4gIGxpbmU6IHRhcmdTdHJcbikge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICBlbGVtZW50ID0gXCJVTkRFRklORUQgRUxFTUVOVFwiO1xuICB9XG4gIGlmICghZWxlbWVudE5hbWUpIHtcbiAgICBlbGVtZW50TmFtZSA9IFwiVU5OQU1FRCBFTEVNRU5UXCI7XG4gIH1cbiAgY29uc29sZS5lcnJvcihgSU5QVVQgTk9UIEZPVU5ELCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gJHtcbiAgICAoZWxlbWVudCBhcyBIVE1MRWxlbWVudCk/LmlkIHx8IGVsZW1lbnROYW1lIHx8IFwiVU5ERUZJTkVEIElEIE9SIE5BTUVcIlxuICB9LlxuICBFbGVtZW50byBvYnRpZG86ICR7ZWxlbWVudCA/PyBcIk5VTExcIn07XG4gIEluc3TDom5jaWEgb2J0aWRhOiAke1xuICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpIHx8IFwiTlVMTFwiXG4gIH07XG4gIFRpcG8gb2J0aWRvICh2w6FsaWRvIHNvbWVudGUgcGFyYSA8aW5wdXQ+KTogJHtcbiAgICAoZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KT8udHlwZSB8fCBcIk5VTExcIlxuICB9O1xuICAudmFsdWUgb2J0aWRvOiAkeyhlbGVtZW50IGFzIHRleHRFbCk/LnZhbHVlIHx8IFwiTlVMTFwifTtcbiAgLmNoZWNrZWQgb2JpdG9kOiAkeyhlbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5jaGVja2VkIHx8IFwiTlVMTFwifS5gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRXaXRoQXJyYXlFcnJvcihcbiAgY29udGV4dDogZXJyb3JIYW5kbGVUZXh0VHlwZSxcbiAgYXJyYXk6IGVycm9ySGFuZGxlQXJyYXlUeXBlLFxuICBhcnJheU5hbWU6IGVycm9ySGFuZGxlVGV4dFR5cGUsXG4gIGVsZW1lbnQ6IGVycm9ySGFuZGxlRWxUeXBlLFxuICBlbGVtZW50TmFtZTogZXJyb3JIYW5kbGVUZXh0VHlwZSxcbiAgbGluZTogdGFyZ1N0clxuKSB7XG4gIGlmICghZWxlbWVudCkge1xuICAgIGVsZW1lbnQgPSBcIlVOREVGSU5FRCBFTEVNRU5UXCI7XG4gIH1cbiAgaWYgKCFlbGVtZW50TmFtZSkge1xuICAgIGVsZW1lbnROYW1lID0gXCJVTk5BTUVEIEVMRU1FTlRcIjtcbiAgfVxuICBjb25zb2xlLmVycm9yKGBFTEVNRU5UIFdJVEggQVJSQVkgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyAke2NvbnRleHR9LlxuICAke2VsZW1lbnROYW1lID8/IFwiVU5OQU1FRCBFTEVNRU5UXCJ9IG9idGlkbzogJHtcbiAgICBKU09OLnN0cmluZ2lmeShhcnJheSkgPz8gXCJOVUxMXCJcbiAgfTtcbiAgSW5zdMOibmNpYSBkZSAke2FycmF5TmFtZSA/PyBcIlVOTkFNRUQgQVJSQVlcIn0gb2J0aWRvOiAke1xuICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwiXG4gIH0uYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50V2l0aE9iamVjdEVycm9yKFxuICBjb250ZXh0OiBlcnJvckhhbmRsZVRleHRUeXBlLFxuICBvYmplY3Q6IGVycm9ySGFuZGxlT2JqZWN0VHlwZSxcbiAgZWxlbWVudDogZXJyb3JIYW5kbGVFbFR5cGUsXG4gIGVsZW1lbnROYW1lOiBlcnJvckhhbmRsZVRleHRUeXBlLFxuICBsaW5lOiB0YXJnU3RyXG4pIHtcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgZWxlbWVudCA9IFwiVU5ERUZJTkVEIEVMRU1FTlRcIjtcbiAgfVxuICBpZiAoIWVsZW1lbnROYW1lKSB7XG4gICAgZWxlbWVudE5hbWUgPSBcIlVOTkFNRUQgRUxFTUVOVFwiO1xuICB9XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgYEVMRU1FTlQgV0lUSCBPQkpFQ1QgRVJST1IsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICAgIEVycm8gJHtjb250ZXh0ID8/IFwiVW5kZWZpbmVkIENvbnRleHRcIn0uIEVsZW1lbnRvOiAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgb2JqZWN0XG4gICAgKX07IGluc3TDom5jaWE6ICR7b2JqZWN0Py5jb25zdHJ1Y3Rvci5uYW1lID8/IFwiTlVMTFwifVxuICAgICR7ZWxlbWVudE5hbWUgPz8gXCJVTk5BTUVEIEVMRU1FTlRcIn06IGluc3TDom5jaWEgb2J0aWRhOiAke1xuICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpPy5zbGljZSg4LCAtMSkgPz8gXCJOVUxMXCJcbiAgICB9YFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudE5vdFBvcHVsYXRlZChcbiAgYXJyYXk6IGVycm9ySGFuZGxlQXJyYXlUeXBlLFxuICBhcnJheU5hbWU6IGVycm9ySGFuZGxlVGV4dFR5cGUsXG4gIGxpbmU6IHRhcmdTdHJcbikge1xuICBpZiAoIWFycmF5KSB7XG4gICAgYXJyYXkgPSBcIlVuZGVmaW5lZCBBcnJheVwiO1xuICB9XG4gIGlmICghYXJyYXlOYW1lKSB7XG4gICAgYXJyYXlOYW1lID0gXCJVTk5BTUVEIEFSUkFZXCI7XG4gIH1cbiAgY29uc29sZS5lcnJvcihgRUxFTUVOVCBQT1BVTEFUSU9OIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gJHthcnJheU5hbWUgfHwgXCJOVUxMXCJ9LlxuICBBcnJheTogJHtBcnJheS5pc0FycmF5KGFycmF5KX07XG4gIExpc3Qgb3UgQ29sbGVjdGlvbjogJHtcbiAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyYXkpPy5zbGljZSg4LCAtMSkgfHwgXCJOVUxMXCJcbiAgfTtcbiAgTGVuZ3RoIG9idGlkYTogJHthcnJheT8ubGVuZ3RoIHx8IFwiMFwifTtcbiAgU3RyaW5naWZpY2HDp8OjbzogJHtKU09OLnN0cmluZ2lmeShhcnJheSkgPz8gXCJOVUxMXCJ9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBsZUVsZW1lbnRzTm90Rm91bmQoXG4gIGxpbmU6IHRhcmdTdHIsXG4gIGNvbnRleHQ6IGVycm9ySGFuZGxlVGV4dFR5cGUsXG4gIC4uLmVsZW1lbnRzOiBlcnJvckhhbmRsZVNwcmVhZFR5cGVcbikge1xuICBpZiAoIWNvbnRleHQgfHwgY29udGV4dCA9PT0gXCJcIikge1xuICAgIGNvbnRleHQgPSBcIlVuZGVmaW5lZCBDb250ZXh0XCI7XG4gIH1cbiAgbGV0IGVycm9yTWVzc2FnZSA9IGBNVUxUSVBMRSBFTEVNRU5UUyBOT1QgRk9VTkQsIExJTkUgJHtsaW5lID8/IFwiVU5ERUZJTkVEXCJ9OlxuICBFcnJvIHZhbGlkYW5kbyAke2NvbnRleHQgfHwgXCJVbmRlZmluZWQgRnVuY3Rpb24gTmFtZVwifS5gO1xuICBjb25zdCBtYXBwZWROdWxsRWxlbWVudHMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQpID0+XG4gICAgZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQgPyBcIk5VTExcIiA6IGVsZW1lbnRcbiAgKTtcblxuICBtYXBwZWROdWxsRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChcbiAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8XG4gICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxuICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XG4gICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTE9wdGlvbkVsZW1lbnRcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcbiAgICAgICAgKGVsZW1lbnQudHlwZSA9PT0gXCJyYWRpb1wiIHx8IGVsZW1lbnQudHlwZSA9PT0gXCJjaGVja2JveFwiKVxuICAgICAgKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdMOibmNpYSBkZSAke2VsZW1lbnQuaWQgfHwgXCJOVUxMXCJ9IG9idGlkYTogJHtcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIlxuICAgICAgICB9O1xcblxuICAgICAgICAuY2hlY2tlZCBvYnRpZG86ICR7KGVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCk/LmNoZWNrZWQgfHwgXCJOVUxMXCJ9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdMOibmNpYSBkZSAke2VsZW1lbnQuaWQgfHwgXCJOVUxMXCJ9IG9idGlkYTogJHtcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIlxuICAgICAgICB9O1xcblxuICAgICAgICAudmFsdWUgb2J0aWRvOiAkeyhlbGVtZW50IGFzIHRleHRFbCk/LnZhbHVlIHx8IFwiTlVMTFwifWA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yTWVzc2FnZSArPSBgSW5zdMOibmNpYSBkZSAke1xuICAgICAgICAoZWxlbWVudCBhcyBlbnRyeUVsKS5pZCB8fCBcIk5VTExcIlxuICAgICAgfSBvYnRpZGE6ICR7XG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwiXG4gICAgICB9O1xcbmA7XG4gICAgfVxuICB9KTtcblxuICBjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50c05vdEZvdW5kRnVuY3Rpb24oXG4gIGxpbmU6IHRhcmdTdHIsXG4gIGZ1bmNOYW1lOiBlcnJvckhhbmRsZVRleHRUeXBlLFxuICAuLi5lbGVtZW50czogZXJyb3JIYW5kbGVTcHJlYWRUeXBlXG4pIHtcbiAgbGV0IGVycm9yTWVzc2FnZSA9IGBFTEVNRU5UUyBOT1QgRk9VTkQgRk9SIEZVTkNUSU9OLCBMSU5FICR7XG4gICAgbGluZSA/PyBcIlVOREVGSU5FRFwiXG4gIH06XG4gIEVycm8gdmFsaWRhbmRvIGluc3TDom5jaWEgb2J0aWRhIHBhcmEgJHtmdW5jTmFtZSB8fCBcIk5VTExcIn1gO1xuXG4gIGNvbnN0IG1hcHBlZE51bGxFbGVtZW50cyA9IGVsZW1lbnRzLm1hcCgoZWxlbWVudCkgPT5cbiAgICBlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCA/IFwiTlVMTFwiIDogZWxlbWVudFxuICApO1xuXG4gIG1hcHBlZE51bGxFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgaWYgKFxuICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcbiAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50IHx8XG4gICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHxcbiAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudFxuICAgICkge1xuICAgICAgaWYgKFxuICAgICAgICBlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxuICAgICAgICAoZWxlbWVudC50eXBlID09PSBcInJhZGlvXCIgfHwgZWxlbWVudC50eXBlID09PSBcImNoZWNrYm94XCIpXG4gICAgICApIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0w6JuY2lhIGRlICR7ZWxlbWVudC5pZCB8fCBcIk5VTExcIn0gb2J0aWRhOiAke1xuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwiXG4gICAgICAgIH07XFxuXG4gICAgICAgIC5jaGVja2VkIG9idGlkbzogJHsoZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50KT8uY2hlY2tlZCB8fCBcIk5VTExcIn1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0w6JuY2lhIGRlICR7ZWxlbWVudC5pZCB8fCBcIk5VTExcIn0gb2J0aWRhOiAke1xuICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlbGVtZW50KT8uc2xpY2UoOCwgLTEpID8/IFwiTlVMTFwiXG4gICAgICAgIH07XFxuXG4gICAgICAgIC52YWx1ZSBvYnRpZG86ICR7KGVsZW1lbnQgYXMgdGV4dEVsKT8udmFsdWUgfHwgXCJOVUxMXCJ9YDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3JNZXNzYWdlICs9IGBJbnN0w6JuY2lhIGRlICR7XG4gICAgICAgIChlbGVtZW50IGFzIEhUTUxFbGVtZW50KT8uaWQgfHwgXCJOVUxMXCJcbiAgICAgIH0gb2J0aWRhOiAke1xuICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZWxlbWVudCk/LnNsaWNlKDgsIC0xKSA/PyBcIk5VTExcIlxuICAgICAgfTtcXG5gO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc29sZS5lcnJvcihlcnJvck1lc3NhZ2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF4TnVtYmVyRXJyb3IoXG4gIHVudmFsaWROdW1iZXI6IGVycm9ySGFuZGxlTnVtYmVyVHlwZSxcbiAgdGl0bGU6IGVycm9ySGFuZGxlVGV4dFR5cGUsXG4gIGxpbmU6IHRhcmdTdHJcbikge1xuICBpZiAoIXVudmFsaWROdW1iZXIpIHtcbiAgICB1bnZhbGlkTnVtYmVyID0gXCIwXCI7XG4gIH1cbiAgaWYgKHR5cGVvZiB1bnZhbGlkTnVtYmVyID09PSBcIm51bWJlclwiKSB7XG4gICAgdW52YWxpZE51bWJlciA9IHVudmFsaWROdW1iZXIudG9TdHJpbmcoKTtcbiAgfVxuICBjb25zb2xlLmVycm9yKGBNQVggTlVNQkVSIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgTsO6bWVybyBkZSAke3RpdGxlIHx8IFwiVW5kZWZpbmVkIFRpdGxlXCJ9IGludsOhbGlkb3MuXG4gIE7Dum1lcm8gbcOheGltbyBvYnRpZG86ICR7cGFyc2VJbnQodW52YWxpZE51bWJlciwgMTApIHx8IDB9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdFcnJvcihcbiAgY29udGV4dDogZXJyb3JIYW5kbGVUZXh0VHlwZSxcbiAgdGV4dDogZXJyb3JIYW5kbGVUZXh0VHlwZSxcbiAgbGluZTogdGFyZ1N0clxuKSB7XG4gIGNvbnNvbGUuZXJyb3IoYFNUUklORyBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gJHtjb250ZXh0fS5cbiAgVmFsb3Igb2J0aWRvOiAke3RleHQgPz8gXCJOVUxMXCJ9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaEVycm9yKFxuICBjb250ZXh0OiBlcnJvckhhbmRsZVRleHRUeXBlLFxuICBlbGVtZW50OiBlcnJvckhhbmRsZUVsVHlwZSxcbiAgdGV4dDogZXJyb3JIYW5kbGVUZXh0VHlwZSxcbiAgbGluZTogdGFyZ1N0clxuKSB7XG4gIGNvbnNvbGUuZXJyb3IoYE1BVENIIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgRXJybyB2YWxpZGFuZG8gJHtjb250ZXh0IHx8IFwiVW5kZWZpbmVkIENvbnRleHRcIn0uXG4gIEVsZW1lbnRvIG9idGlkbzogJHtlbGVtZW50IHx8IFwiVU5ERUZJTkVEIEVMRU1FTlRcIn07XG4gIFTDrXR1bG8gb2J0aWRvOiAke3RleHQgfHwgXCJVbmRlZmluZWQgVGl0bGVcIn0uYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlRXJyb3IoXG4gIGNvbnRleHQ6IGVycm9ySGFuZGxlVGV4dFR5cGUsXG4gIGVsZW1lbnQ6IHByaW1pdGl2ZVR5cGUgfCBFbGVtZW50LFxuICBhY2NlcHRlZFR5cGU6IGVycm9ySGFuZGxlVGV4dFR5cGUsXG4gIGxpbmU6IHRhcmdTdHJcbikge1xuICBjb25zb2xlLmVycm9yKGBUWVBFIEVSUk9SLCBMSU5FICR7bGluZSA/PyBcIlVOREVGSU5FRFwifTpcbiAgVGlwbyBwcmltaXRpdm8gb2J0aWRvIHBhcmEgJHtjb250ZXh0IHx8IFwiVW5kZWZpbmVkIENvbnRleHRcIn0gaW5jb3JyZXRvLlxuICBUaXBvIG9idGlkbzogJHt0eXBlb2YgZWxlbWVudCA/PyBcIlVuZGVmaW5lZCB0eXBlb2ZcIn07XG4gIFRpcG8gYWNlaXRvOiAke2FjY2VwdGVkVHlwZSB8fCBcIlVuZGVmaW5lZCBBY2NlcHRlZCBUeXBlXCJ9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RFcnJvcihcbiAgY29udGV4dDogZXJyb3JIYW5kbGVUZXh0VHlwZSxcbiAgb2JqZWN0OiBlcnJvckhhbmRsZU9iamVjdFR5cGUsXG4gIG9iamVjdE5hbWU6IHRhcmdTdHIsXG4gIG1heFByb3BlcnRpZXNOdW1iZXI6IGVycm9ySGFuZGxlTnVtYmVyVHlwZSxcbiAgbGluZTogZXJyb3JIYW5kbGVUZXh0VHlwZVxuKSB7XG4gIGNvbnNvbGUuZXJyb3IoYE9CSkVDVCBFUlJPUiwgTElORSAke2xpbmUgPz8gXCJVTkRFRklORURcIn06XG4gIEVycm8gdmFsaWRhbmRvICR7b2JqZWN0TmFtZSA/PyBcIlVOREVGSU5FRCBPQkpFQ1QgTkFNRVwifSBwYXJhICR7XG4gICAgY29udGV4dCB8fCBcIlVuZGVmaW5lZCBDb250ZXh0XCJcbiAgfS5cbiAgT2JqZWN0byBvYnRpZG86ICR7SlNPTi5zdHJpbmdpZnkob2JqZWN0KSA/PyBcIlVuZGVmaW5lZCBPYmplY3RcIn07XG4gIE7Dum1lcm8gb2J0aWRvIGRlIHByb3ByaWVkYWRlczogJHtPYmplY3Qua2V5cy5sZW5ndGggPz8gMH07IE7Dum1lcm8gYWNlaXRvOiAke1xuICAgIG1heFByb3BlcnRpZXNOdW1iZXIgPz8gMFxuICB9YCk7XG59XG4iLCIvL25lc3NlIGZpbGUgZXN0w6NvIHByZXNlbnRlcyBwcmluY2lwYWxtZW50ZSBhcyBmdW7Dp8O1ZXMgZGUgbWFuaXB1bGHDp8OjbyBkaW7Dom1pY2EgZGUgdGV4dG8gZSBsYXlvdXRcbmltcG9ydCAqIGFzIEdsb2JhbE1vZGVsIGZyb20gXCIuL2dNb2RlbFwiO1xuaW1wb3J0IHsgSlNPTlN0b3JhZ2VyLCBKU09OVGl0bGVTdG9yYWdlciB9IGZyb20gXCIuL2NsYXNzZXNcIjtcbmltcG9ydCB0eXBlIHsgdGFyZ0VsLCBlbnRyeUVsLCB0ZXh0RWwsIHByaW1pdGl2ZVR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0ICogYXMgRXJyb3JIYW5kbGVyIGZyb20gXCIuL2Vycm9ySGFuZGxlclwiO1xuLy8gaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuXG5jb25zdCBtYXBJZHNUaXRsZXMgPSB7XG4gIGZpcnN0TmFtZUlkOiBcIlByaW1laXJvX05vbWVcIixcbiAgYWRkaXRpb25hbE5hbWVJZDogXCJTb2JyZW5vbWVfZG9fTWVpb1wiLFxuICBmYW1pbHlOYW1lSWQ6IFwiw5psdGltb19Tb2JyZW5vbWVcIixcbiAgc29jaWFsTmFtZUlkOiBcIk5vbWVfU29jaWFsXCIsXG4gIHRlbEFyZWFDb2RlSWQ6IFwiREREXCIsXG4gIHRlbElkOiBcIlRlbGVmb25lXCIsXG4gIHRlbENvdW50cnlDb2RlSWQ6IFwiU2VfZXN0cmFuZ2Vpcm8sX2PDs2RpZ29fZG9fUGHDrXNcIixcbiAgdGVsMkFyZWFDb2RlSWQ6IFwiREREX0RvX1RlbGVmb25lX1NlY3VuZMOhcmlvXCIsXG4gIHRlbDJJZDogXCJUZWxlZm9uZV9TZWN1bmTDoXJpb1wiLFxuICB0ZWwyQ291bnRyeUNvZGVJZDogXCJTZV9lc3RyYW5nZWlybyhzZWN1bmTDoXJpbyksX2PDs2RpZ29fZG9fUGHDrXNcIixcbiAgZW1haWwxSWQ6IFwiRW1haWxcIixcbiAgZW1haWwySWQ6IFwiRW1haWxfU2VjdW5kw6FyaW9cIixcbiAgZGF0ZUFnZUlkOiBcIklkYWRlXCIsXG4gIGdlbmlkOiBcIkfDqm5lcm9cIixcbiAgZ2VuQmlydGhSZWxJZDogXCJJZGVudGlkYWRlX2VtX3JlbGHDp8Ojb19hb19nw6puZXJvX2Rlc2lnbmFkb19uYV9uYXNjZW7Dp2FcIixcbiAgZ2VuVHJhbnNJZDogXCJFc3TDoWdpb19kYV9UcmFuc2nDp8Ojb19Ib3Jtb25hbFwiLFxuICBnZW5GaXNBbGluSWQ6IFwiQWxpbmhhbWVudG9fZGVfY2FyYWN0ZXLDrXN0aWNhc19mw61zaWNhc19wcmVkb21pbmFudGVcIixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVTaW1wbGVQcm9wZXJ0eShlbGVtZW50OiB0YXJnRWwpOiBwcmltaXRpdmVUeXBlIHtcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQudHlwZSA9PT0gXCJyYWRpb1wiIHx8IGVsZW1lbnQudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jaGVja2VkLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50LnR5cGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgTnVtYmVyLmlzTmFOKHBhcnNlRmxvYXQoZWxlbWVudC52YWx1ZS5yZXBsYWNlQWxsKC9bXjAtOS4sKy1dL2csIFwiXCIpKSlcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlLndhcm4oYGVsZW1lbnQudmFsdWUgcmV0b3JuYWRvIGNvbW8gTmFOLCByZXZlcnRpZG8gcGFyYSAwLmApO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGVsZW1lbnQudmFsdWUucmVwbGFjZUFsbCgvW14wLTkuLCstXS9nLCBcIlwiKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlbGVtZW50LnR5cGUgPT09IFwidGV4dFwiIHx8IGVsZW1lbnQudHlwZSA9PT0gXCJkYXRlXCIpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oYEVycm8gdmFsaWRhbmRvIHR5cGUgZGUgSW5wdXQgcGFyYSBhdHVhbGl6YcOnw6NvIGRlIHByb3ByaWVkYWRlIGRlIHBlcnNvbi5cbiAgICAgIFRpcG8gb2J0aWRvOiAke2VsZW1lbnQ/LnR5cGUgPz8gXCJudWxsXCJ9YCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKFxuICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCB8fFxuICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50XG4gICkge1xuICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gRWxlbWVudCBwYXJhIGF0dWFsaXphw6fDo28gZGUgcHJvcHJpZWRhZGUgZGUgcGVyc29uLlxuICAgIEluc3TDom5jaWEgb2JpdGRhOiAke1xuICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVsZW1lbnQpLnNsaWNlKDgsIC0xKSA/PyBcIm51bGxcIlxuICAgIH1gKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3Vyc29yQ2hlY2tUaW1lcihjdXJzb3JQb3NpdGlvbjogbnVtYmVyKTogbnVtYmVyIHtcbiAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICBpZiAoc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5mb2N1c05vZGUgIT09IG51bGwpIHtcbiAgICBjdXJzb3JQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApPy5zdGFydE9mZnNldDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJldHVybiBjdXJzb3JQb3NpdGlvbjtcbiAgICB9LCAzMDAwKTtcbiAgfVxuICByZXR1cm4gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEpTT05EZXNjKGlucHV0czogdGFyZ0VsW10pIHtcbiAgY29uc3QgdGl0bGVFbGVtZW50cyA9IFtdO1xuICBjb25zdCBjbG9zZXN0VmFsaWRFbGVtZW50czogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMgPSBbXTtcbiAgY29uc3QgY2xvc2VzdEJvb2xlYW5FbGVtZW50cyA9IFtdO1xuICBjb25zdCBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzSWRzID0gW107XG4gIGNvbnN0IGlucFZhbHVlcyA9IFtdO1xuICBjb25zdCBpbnBJZHMgPSBbXTtcbiAgY29uc3QgSlNPTklucHNTdG9yZURlc2NyaXB0b3JzID0gW107XG4gIGNvbnN0IEpTT05UaXRsZXNTdG9yZURlc2NyaXB0b3JzID0gW107XG4gIGxldCBKU09OSW5wc1N0b3JlID0gW107XG4gIGxldCBKU09OVGl0bGVzU3RvcmUgPSBbXTtcbiAgbGV0IHRpdGxlQWNjID0gMDtcbiAgbGV0IG51bGxUaXRsZUFjYyA9IDA7XG5cbiAgLy9kZXRlcm1pbmHDp8OjbyBkbyBuw7ptZXJvIGRlIGlucHV0cyBkZSBpZGVudGlmaWNhw6fDo28gY3Vqb3MgdMOtdHVsb3Mgc8OjbyBkZSBpbnRlcmVzc2UgZSBjb25zdHJ1w6fDo28gZGUgc3ViYXJyYXkgcGFyYSBlc3Rlc1xuICBmb3IgKGxldCBrID0gMDsgayA8IGlucHV0cy5sZW5ndGg7IGsrKykge1xuICAgIGlmIChpbnB1dHNba10/LmNsYXNzTGlzdC5jb250YWlucyhcImlucElkZW50aWZcIikpIHtcbiAgICAgIHRpdGxlRWxlbWVudHMucHVzaChpbnB1dHNba10pO1xuICAgIH1cbiAgfVxuXG4gIC8vbG9vcCBwYXJhIGNvbnN0cnXDp8OjbyBkb3MgYXJyYXlzIGluaWNpYXMgZGUgaWRzIGUgdmFsdWVzXG4gIGZvciAobGV0IHogPSAwOyB6IDwgaW5wdXRzLmxlbmd0aDsgeisrKSB7XG4gICAgaWYgKGlucHV0c1t6XSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgIGlmIChcbiAgICAgICAgKGlucHV0c1t6XSBhcyBIVE1MSW5wdXRFbGVtZW50KT8udHlwZSA9PT0gXCJyYWRpb1wiIHx8XG4gICAgICAgIChpbnB1dHNbel0gYXMgSFRNTElucHV0RWxlbWVudCk/LnR5cGUgPT09IFwiY2hlY2tib3hcIlxuICAgICAgKSB7XG4gICAgICAgIGlucElkcy5wdXNoKGlucHV0c1t6XT8uaWQgPz8gXCJudWxsXCIpO1xuICAgICAgICBpbnBWYWx1ZXMucHVzaChcbiAgICAgICAgICAoaW5wdXRzW3pdIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy5jaGVja2VkLnRvU3RyaW5nKCkgPz8gXCJmYWxzZVwiXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoKGlucHV0c1t6XSBhcyBIVE1MRWxlbWVudCkuaWQgPT09IFwiY29uZnJtTG9jSWRcIikge1xuICAgICAgICAgIGlucElkcy5wdXNoKFwiY29uZmlybUxvY1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpbnBWYWx1ZXMucHVzaCgoaW5wdXRzW3pdIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy52YWx1ZSA/PyBcIm51bGxcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGlucHV0c1t6XSBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHxcbiAgICAgIGlucHV0c1t6XSBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50XG4gICAgKSB7XG4gICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcbiAgICAgIGlucFZhbHVlcy5wdXNoKChpbnB1dHNbel0gYXMgZW50cnlFbCk/LnZhbHVlID8/IFwibnVsbFwiKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKGlucHV0c1t6XSBhcyBIVE1MRWxlbWVudCk/LmNvbnRlbnRFZGl0YWJsZSA9PT0gXCJ0cnVlXCIgfHxcbiAgICAgIGlucHV0c1t6XT8uaWQgPT09IFwiY2l0ZU5hbWVJZFwiXG4gICAgKSB7XG4gICAgICBpbnBJZHMucHVzaChpbnB1dHNbel0/LmlkID8/IFwibnVsbFwiKTtcbiAgICAgIGlucFZhbHVlcy5wdXNoKGlucHV0c1t6XT8udGV4dENvbnRlbnQgPz8gXCJudWxsXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBgRXJybyB2YWxpZGFuZG8gZWxlbWVudG8uIEVsZW1lbnRvICR7XG4gICAgICAgICAgaW5wdXRzW3pdID8/IFwibnVsbFwiXG4gICAgICAgIH07IGluc3TDom5jaWEgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG4gICAgICAgICAgLmNhbGwoaW5wdXRzW3pdKVxuICAgICAgICAgIC5zbGljZSg4LCAtMSl9OyBpZCAke2lucHV0c1t6XT8uaWQgPz8gXCJudWxsXCJ9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvL2xvb3AgcGFyYSBhanVzdGUgZG9zIGVsZW1lbnRvcyBkb3MgYXJyYXlzIGRlIGlucHV0cyBlIGNvbnN0cnXDp8OjbyBkb3Mgc3RvcmFnZXIgZGUgaW5wdXRzXG4gIGZvciAobGV0IGogPSAwOyBqIDwgaW5wdXRzLmxlbmd0aDsgaisrKSB7XG4gICAgLy9maWx0cmFnZW0gZGUgdGlwb3MgcHJpbWl0aXZvcyBkZSB2YWx1ZXNcbiAgICBpZiAodHlwZW9mIGlucFZhbHVlc1tqXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKGlucFZhbHVlc1tqXSA9PT0gXCJcIikge1xuICAgICAgICBpbnBWYWx1ZXNbal0gPSBpbnBWYWx1ZXNbal0ucmVwbGFjZShcIlwiLCBcIm51bGxcIikgPz8gXCJudWxsXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucFZhbHVlc1tqXSA9IGlucFZhbHVlc1tqXT8udG9TdHJpbmcoKSA/PyBcIm51bGxcIjtcbiAgICB9XG5cbiAgICAvL2F2YWxpYWRvciBkZSBpZHMgbnVsYXNcbiAgICBpZiAoXG4gICAgICBpbnBJZHNbal0/Lm1hdGNoKC9udWxsL2cpIHx8XG4gICAgICBpbnBJZHNbal0gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgaW5wSWRzW2pdID09PSBudWxsXG4gICAgKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBJZCBudWxsIGRldGVjdGFkYS4gVMOtdHVsbyByZWxhdGl2bzogJHtcbiAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c1tqXSA/PyBcIm51bGxcIlxuICAgICAgICB9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvL2NyaWHDp8OjbyBkbyBzdG9yYWdlclxuICAgIGNvbnN0IG5KU09OSW5wU3RvcmFnZXIgPSBuZXcgSlNPTlN0b3JhZ2VyKGlucElkc1tqXSwgaW5wVmFsdWVzW2pdKTtcblxuICAgIC8vY3JpYcOnw6NvIGRhIHN0b3JlXG4gICAgaWYgKG5KU09OSW5wU3RvcmFnZXIpIHtcbiAgICAgIEpTT05JbnBzU3RvcmUucHVzaChuSlNPTklucFN0b3JhZ2VyKTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBuSlNPTklucFN0b3JhZ2VyLnNob3dBbGxJbmZvOyAvL1RPRE8gRVhQT1NJw4fDg08gREUgREFET1MgU09NRU5URSBQQVJBIEZJTkFMSURBREVTIERFIFRFU1RFLCBQT0lTIFBST1BSSUVEQURFUyBQUklWQURBUyBOw4NPIFPDg08gRU5VTUVSw4FWRUlTXG4gICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICBKU09OSW5wc1N0b3JlRGVzY3JpcHRvcnMucHVzaChkZXNjcmlwdG9yLnRvU3RyaW5nKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBFcnJvIHZhbGlkYW5kbyBkZXNjcmlwdG9yIHBhcmEgaW5zdMOibmNpYSAke2p9IGRlIEpTT05TdG9yYWdlcmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhICR7an0gZGUgSlNPTlN0b3JhZ2VyYCk7XG4gICAgfVxuICB9XG5cbiAgLy9sb29wIHBhcmEgZXh0cmFpciB0w610dWxvcy9sYWJlbHMgZGUgaW50ZXJlc3NlXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGl0bGVFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHRpdGxlQWNjKys7XG4gICAgLy9sb29wIHBhcmEgbcO6bHRpcGxhcyB0ZW50YXRpdmFzIGRlIGxvY2FsaXphw6fDo28gZG8gdGV4dG8gZGUgaW50ZXJlc3NlXG4gICAgbGV0IGNsb3Nlc3RQYXJlbnQgPVxuICAgICAgdGl0bGVFbGVtZW50c1tpXT8uY2xvc2VzdChcInNwYW5cIikgfHwgdGl0bGVFbGVtZW50c1tpXT8uY2xvc2VzdChcImxhYmVsXCIpO1xuICAgIGlmIChjbG9zZXN0UGFyZW50KSB7XG4gICAgICBsZXQgbG9vcEFjYyA9IDA7XG4gICAgICB3aGlsZSAobG9vcEFjYyA8IDEwICYmIGNsb3Nlc3RQYXJlbnQudGV4dENvbnRlbnQgPT09IFwiXCIpIHtcbiAgICAgICAgLy9sb29wIHBhcmEgZXNjYWxhZGEgZ2VuZWFsw7NnaWNhIGF0w6kgZW5jb250cmFyIHBhcmVudCBkZSBpbnRlcmVzc2Ugb3UgZGVzaXN0aXIgYXDDs3MgMTAgaXRlcmHDp8O1ZXNcbiAgICAgICAgbG9vcEFjYysrO1xuICAgICAgICBjbG9zZXN0UGFyZW50ID1cbiAgICAgICAgICBjbG9zZXN0UGFyZW50Py5jbG9zZXN0KFwic3BhblwiKSB8fCBjbG9zZXN0UGFyZW50Py5jbG9zZXN0KFwibGFiZWxcIik7XG4gICAgICAgIGlmIChjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCAhPT0gXCJcIiB8fCBsb29wQWNjID4gMTApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ICE9PSBcIlwiKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudCA9PT0gXCJTaW1cIiB8fCAvL2VudHJhZGEgZW0gbG9vcCBwYXJhIGVsaW1pbmFyIHBhcmVudHMgY29tIHRleHQgc2ltL27Do28gKG7Do28gaW5mb3JtYXRpdm8pIG91IGRlc2lzdGlyIGFww7NzIDEwIGl0ZXJhw6fDtWVzXG4gICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgPT09IFwiTsOjb1wiXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGJvb2xlYW5QYXJlbnRDb3B5ID0gY2xvc2VzdFBhcmVudDtcbiAgICAgICAgICBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzLnB1c2goXG4gICAgICAgICAgICBib29sZWFuUGFyZW50Q29weT8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XG4gICAgICAgICAgICAgIGBOVUxMICR7XG4gICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQgPz8gYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gXG4gICAgICAgICAgICAgIH1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjbG9zZXN0Qm9vbGVhbkVsZW1lbnRzSWRzLnB1c2goYm9vbGVhblBhcmVudENvcHkuaWQgPz8gXCJudWxsXCIpO1xuICAgICAgICAgIHdoaWxlIChcbiAgICAgICAgICAgIGxvb3BBY2MgPCAxMCAmJlxuICAgICAgICAgICAgY2xvc2VzdFBhcmVudCAmJlxuICAgICAgICAgICAgKGNsb3Nlc3RQYXJlbnQudGV4dENvbnRlbnQgPT09IFwiU2ltXCIgfHxcbiAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudC50ZXh0Q29udGVudCA9PT0gXCJOw6NvXCIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBsb29wQWNjKys7XG4gICAgICAgICAgICBjbG9zZXN0UGFyZW50ID1cbiAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8uY2xvc2VzdChcInNwYW5cIikgfHwgY2xvc2VzdFBhcmVudD8uY2xvc2VzdChcImxhYmVsXCIpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoY2xvc2VzdFBhcmVudCAmJlxuICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ICE9PSBcIlNpbVwiICYmXG4gICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiTsOjb1wiICYmXG4gICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQgIT09IFwiXCIpIHx8XG4gICAgICAgICAgICAgIGxvb3BBY2MgPiAxMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XG4gICAgICAgICAgICAgICAgICBgTlVMTCAke1xuICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xuICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWBcbiAgICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2goXG4gICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8uaWQgPz9cbiAgICAgICAgICAgICAgICAgIGBOVUxMICR7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LmlkID8/XG4gICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YFxuICAgICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXG4gICAgICAgICAgICAodGl0bGVFbGVtZW50c1tpXSBhcyBIVE1MSW5wdXRFbGVtZW50KT8udHlwZSA9PT0gXCJyYWRpb1wiICYmXG4gICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCAhPT0gXCJcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmcgJiZcbiAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nIGluc3RhbmNlb2ZcbiAgICAgICAgICAgICAgICBIVE1MTGFiZWxFbGVtZW50ICYmXG4gICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZz8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYm9vbE9wXCIpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkLm1hdGNoKC9ZZXMvKSkge1xuICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZD8uc2xpY2UoLTMpID8/XG4gICAgICAgICAgICAgICAgICAgIFwibnVsbFwiICtcbiAgICAgICAgICAgICAgICAgICAgICBjbG9zZXN0UGFyZW50Py50ZXh0Q29udGVudD8udHJpbSgpLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIikgPz9cbiAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xuICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YFxuICAgICAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodGl0bGVFbGVtZW50c1tpXT8uaWQubWF0Y2goL05vLykpIHtcbiAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFxuICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKC0yKSA/P1xuICAgICAgICAgICAgICAgICAgICBcIm51bGxcIiArXG4gICAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFBhcmVudD8udGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XG4gICAgICAgICAgICAgICAgICAgIGBOVUxMICR7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cbiAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWBcbiAgICAgICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhc28gaW5lc3BlcmFkbyBkZSBib29sT3AgUmFkaW8gKyBMYWJlbFwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICh0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCB8fFxuICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXSBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpICYmXG4gICAgICAgICAgICAgICAgKHRpdGxlRWxlbWVudHNbaV0gYXMgZW50cnlFbCk/Lm5hbWUgPT09IFwibml2ZWxGdW1vXCJcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChcbiAgICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/LmlkPy5zbGljZSgwLCAxKT8udG9VcHBlckNhc2UoKSA/P1xuICAgICAgICAgICAgICAgICAgICBcIm51bGxcIiArXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKDEsIDQpICtcbiAgICAgICAgICAgICAgICAgICAgICBcIl9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQ/LnNsaWNlKDQsIDgpID8/XG4gICAgICAgICAgICAgICAgICAgIGBOVUxMICR7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cbiAgICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWBcbiAgICAgICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BGdW1TdWJzXCIpICYmXG4gICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5leHRFbGVtZW50U2libGluZyAmJlxuICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc/LnRleHRDb250ZW50ICE9PSBcIlwiXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChcbiAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc/LnRleHRDb250ZW50ICtcbiAgICAgICAgICAgICAgICAgIFwiX1wiICtcbiAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xuICAgICAgICAgICAgICAgICAgYE5VTEwgJHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cbiAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gXG4gICAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcImlucEFudE1lZFwiKSkge1xuICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgICBcIlRyYXRhbWVudG9fTcOpZGljb1wiICsgXCJfXCIgKyB0aXRsZUVsZW1lbnRzW2ldPy5pZC5zbGljZSgtMSkgPz9cbiAgICAgICAgICAgICAgICAgICAgYE5VTEwgJHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xuICAgICAgICAgICAgICAgICAgICAgIGBJZCBudWxsLiBJdGVyYcOnw6NvIGRvIGxvb3A6ICR7dGl0bGVBY2N9YFxuICAgICAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkID09PSBcImNpdGVOYW1lSWRcIikge1xuICAgICAgICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChcIkFzc2luYXR1cmFfVXN1w6FyaW9cIiA/PyBcIm51bGxcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xuICAgICAgICAgICAgICAgICAgICAgIGBOVUxMICR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xuICAgICAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gXG4gICAgICAgICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjbG9zZXN0UGFyZW50Py5pZCAhPT0gXCJcIikge1xuICAgICAgICAgICAgLy9vYnRlbsOnw6NvIGRlIGlkcyBkb3MgJ3BhcmVudHMnXG4gICAgICAgICAgICAvL2NvcnJlw6fDo28gZGUgaWQgZGUgaW50ZXJlc3NlIGNhc28gYSBkbyBwYXJlbnQgbsOjbyBlc3RlamEgcHJlc2VudGUgKGF0ZW7Dp8OjbzogZGVzYXNzb2NpYSBpZCBlIHRleHQgZGUgaW50ZXJlc3NlKVxuICAgICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaChjbG9zZXN0UGFyZW50Py5pZCA/PyBcIm51bGxcIik7XG4gICAgICAgICAgfSBlbHNlIGlmIChjbG9zZXN0UGFyZW50LmlkID09PSBcIlwiKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RVNpYmxpbmcgPSB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG5leHRFU2libGluZyAmJlxuICAgICAgICAgICAgICBuZXh0RVNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50ICYmXG4gICAgICAgICAgICAgIG5leHRFU2libGluZy50ZXh0Q29udGVudCAhPT0gXCJcIlxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2gobmV4dEVTaWJsaW5nLmlkID8/IFwibnVsbFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzRVNpYmxpbmcgPSB0aXRsZUVsZW1lbnRzW2ldPy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgcHJldmlvdXNFU2libGluZyAmJlxuICAgICAgICAgICAgICAgIHByZXZpb3VzRVNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgcHJldmlvdXNFU2libGluZy50ZXh0Q29udGVudCAhPT0gXCJcIlxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHByZXZpb3VzRVNpYmxpbmcuaWQgPz8gXCJudWxsXCIpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0gaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgKHRpdGxlRWxlbWVudHNbaV0gYXMgSFRNTFRleHRBcmVhRWxlbWVudCk/LnBsYWNlaG9sZGVyICE9PSBcIlwiXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2godGl0bGVFbGVtZW50c1tpXT8uaWQgPz8gXCJudWxsXCIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgIGBOZW5odW1hIGlkIHByw7N4aW1hIHbDoWxpZGEgcmV0b3JuYWRhIHBhcmEgbyBpbnB1dCAke3RpdGxlRWxlbWVudHNbaV0/LmlkfWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNsb3Nlc3RQYXJlbnQ/LnRleHRDb250ZW50ID09PSBcIlwiKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgRXJybyBhbyBsb2NhbGl6YXIgdGV4dENvbnRlbnQgZGUgcGFyZW50YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vc2UgZmFsaGEgZW0gcGFyZW50cywgcHJvY3VyYSBlbSBzaWJsaW5ncyA8bGFiZWw+IG91IGVtIHBsYWNlaG9sZGVycyBkZSB0ZXh0YXJlYXNcbiAgICAgIGNvbnN0IHByZXZpb3VzU2libGluZyA9IHRpdGxlRWxlbWVudHNbaV0/LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICBpZiAoXG4gICAgICAgIHByZXZpb3VzU2libGluZyBpbnN0YW5jZW9mIEhUTUxMYWJlbEVsZW1lbnQgJiZcbiAgICAgICAgcHJldmlvdXNTaWJsaW5nLnRleHRDb250ZW50ICE9PSBcIlwiXG4gICAgICApIHtcbiAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHMucHVzaChcbiAgICAgICAgICBwcmV2aW91c1NpYmxpbmcudGV4dENvbnRlbnQ/LnRyaW0oKS5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpID8/XG4gICAgICAgICAgICBgTlVMTCAke1xuICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWBcbiAgICAgICAgICAgIH1gXG4gICAgICAgICk7XG4gICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzSWRzLnB1c2gocHJldmlvdXNTaWJsaW5nLmlkID8/IFwibnVsbFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCAmJlxuICAgICAgICAgICh0aXRsZUVsZW1lbnRzW2ldIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQpPy5wbGFjZWhvbGRlclxuICAgICAgICApIHtcbiAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFxuICAgICAgICAgICAgKHRpdGxlRWxlbWVudHNbaV0gYXMgSFRNTFRleHRBcmVhRWxlbWVudCk/LnBsYWNlaG9sZGVyID8/XG4gICAgICAgICAgICAgIGBOVUxMICR7XG4gICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQgPz8gYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gXG4gICAgICAgICAgICAgIH1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkID8/IFwibnVsbFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxuICAgICAgICAgICh0aXRsZUVsZW1lbnRzW2ldIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy50eXBlID09PSBcImNoZWNrYm94XCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcImZhbU9wXCIpKSB7XG4gICAgICAgICAgICBjb25zdCB1cHBlckNhc2VNYXRjaCA9IHRpdGxlRWxlbWVudHNbaV0/LmlkPy5tYXRjaCgvRmFtL2cpO1xuICAgICAgICAgICAgaWYgKHVwcGVyQ2FzZU1hdGNoICYmIHRpdGxlRWxlbWVudHNbaV0/LmlkKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHVwcGVyQ2FzZUluZGV4ID0gdGl0bGVFbGVtZW50c1tpXT8uaWQuaW5kZXhPZihcIkZhbVwiKTtcbiAgICAgICAgICAgICAgY29uc3Qgc2xpY2VkSWQgPSB0aXRsZUVsZW1lbnRzW2ldPy5pZC5zbGljZSgwLCB1cHBlckNhc2VJbmRleCk7XG4gICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgc2xpY2VkSWQgK1xuICAgICAgICAgICAgICAgICAgXCJfXCIgK1xuICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dFNpYmxpbmc/LnRleHRDb250ZW50Py5yZXBsYWNlQWxsKFxuICAgICAgICAgICAgICAgICAgICAvXltcXHNdKy9nLFxuICAgICAgICAgICAgICAgICAgICBcIlwiXG4gICAgICAgICAgICAgICAgICApID8/XG4gICAgICAgICAgICAgICAgICBgTlVMTCAke1xuICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xuICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWBcbiAgICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFxuICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5leHRTaWJsaW5nPy50ZXh0Q29udGVudD8ucmVwbGFjZUFsbChcbiAgICAgICAgICAgICAgICAgIC9eW1xcc10rL2csXG4gICAgICAgICAgICAgICAgICBcIlwiXG4gICAgICAgICAgICAgICAgKSA/P1xuICAgICAgICAgICAgICAgICAgYE5VTEwgJHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cbiAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gXG4gICAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodGl0bGVFbGVtZW50c1tpXT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BIZXBcIikpIHtcbiAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXG4gICAgICAgICAgICAgIFwiSGVwYXRpdGVfXCIgK1xuICAgICAgICAgICAgICAgIHRpdGxlRWxlbWVudHNbaV0/Lm5leHRTaWJsaW5nPy50ZXh0Q29udGVudD8ucmVwbGFjZUFsbChcbiAgICAgICAgICAgICAgICAgIC9eW1xcc10rL2csXG4gICAgICAgICAgICAgICAgICBcIlwiXG4gICAgICAgICAgICAgICAgKSA/PyBcIm51bGxcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkICE9PSBcImNvbmZpcm1JZFwiKSB7XG4gICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8ubmV4dFNpYmxpbmc/LnRleHRDb250ZW50Py5yZXBsYWNlQWxsKFxuICAgICAgICAgICAgICAgICAgL15bXFxzXSsvZyxcbiAgICAgICAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICAgICAgICApID8/XG4gICAgICAgICAgICAgICAgICBgTlVMTCAke1xuICAgICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xuICAgICAgICAgICAgICAgICAgICBgSWQgbnVsbC4gSXRlcmHDp8OjbyBkbyBsb29wOiAke3RpdGxlQWNjfWBcbiAgICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmlkID09PSBcImNvbmZpcm1JZFwiKSB7XG4gICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXCJDb25jb3Jkb1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNJZHMucHVzaCh0aXRsZUVsZW1lbnRzW2ldPy5pZCA/PyBcIm51bGxcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRpdGxlRWxlbWVudHNbaV0/LmNsYXNzTGlzdC5jb250YWlucyhcIm9wSEFTXCIpKSB7XG4gICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50cy5wdXNoKFxuICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5uZXh0U2libGluZz8udGV4dENvbnRlbnQ/LnRyaW0oKSA/P1xuICAgICAgICAgICAgICAgIGBOVUxMICR7XG4gICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy5pZCA/P1xuICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gXG4gICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKHRpdGxlRWxlbWVudHNbaV0/LmlkID8/IFwibnVsbFwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVTaWJsaW5nID0gdGl0bGVFbGVtZW50c1tpXT8ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBuZXh0RVNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MTGFiZWxFbGVtZW50ICYmXG4gICAgICAgICAgICAgIG5leHRFU2libGluZy50ZXh0Q29udGVudCAhPT0gXCJcIlxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgbmV4dEVTaWJsaW5nLnRleHRDb250ZW50Py50cmltKCkucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKSA/P1xuICAgICAgICAgICAgICAgICAgYE5VTEwgJHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQgPz9cbiAgICAgICAgICAgICAgICAgICAgYElkIG51bGwuIEl0ZXJhw6fDo28gZG8gbG9vcDogJHt0aXRsZUFjY31gXG4gICAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c0lkcy5wdXNoKG5leHRFU2libGluZy5pZCA/PyBcIm51bGxcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgYEVycm8gdmFsaWRhbmRvIHBhcmVudHMsIGxhYmVscywgcGxhY2Vob2xkZXJzIGUgdGV4dENvbnRlbnQuIElkIGRvIElucHV0OiAke1xuICAgICAgICAgICAgICAgICAgdGl0bGVFbGVtZW50c1tpXT8uaWQgPz8gbnVsbFxuICAgICAgICAgICAgICAgIH07IHRleHRDb250ZW50ICR7XG4gICAgICAgICAgICAgICAgICB0aXRsZUVsZW1lbnRzW2ldPy50ZXh0Q29udGVudCA/PyBudWxsXG4gICAgICAgICAgICAgICAgfTsgcGxhY2Vob2xkZXIgJHtcbiAgICAgICAgICAgICAgICAgICh0aXRsZUVsZW1lbnRzW2ldIGFzIHRleHRFbCk/LnBsYWNlaG9sZGVyID8/IG51bGxcbiAgICAgICAgICAgICAgICB9OyDDmmx0aW1hIEluc3TDom5jaWEgZGUgUGFyZW50IGF2YWxpYWRhICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuICAgICAgICAgICAgICAgICAgLmNhbGwoY2xvc2VzdFBhcmVudClcbiAgICAgICAgICAgICAgICAgIC5zbGljZShcbiAgICAgICAgICAgICAgICAgICAgOCxcbiAgICAgICAgICAgICAgICAgICAgLTFcbiAgICAgICAgICAgICAgICAgICl9OyBJbnN0w6JuY2lhIGRlIFNpYmxpbmcgTGFiZWxzICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuICAgICAgICAgICAgICAgICAgLmNhbGwocHJldmlvdXNTaWJsaW5nKVxuICAgICAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX0gJiYgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG4gICAgICAgICAgICAgICAgICAuY2FsbChuZXh0RVNpYmxpbmcpXG4gICAgICAgICAgICAgICAgICAuc2xpY2UoOCwgLTEpfWBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL2xvb3AgcGFyYSBhanVzdGUgZG9zIGVsZW1lbnRvcyBkb3MgYXJyYXlzIGRlIHRpdGxlcyBlIGNvbnN0cnXDp8OjbyBkb3Mgc3RvcmFnZXIgZGUgdGl0bGVzXG4gIGZvciAobGV0IGwgPSAwOyBsIDwgdGl0bGVFbGVtZW50cy5sZW5ndGg7IGwrKykge1xuICAgIC8vY29ycmXDp8OjbyBkZSBtw7psdGlwbG9zIGVzcGHDp29zIGVtIGxhYmVscyBlIHRpdGxlc1xuICAgIGNvbnN0IG11bHRpcGxlU3BhY2VNYXRjaGVzID0gY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0/Lm1hdGNoKC9cXHNcXHMvKSA/PyBudWxsO1xuICAgIGlmIChcbiAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdICYmXG4gICAgICBtdWx0aXBsZVNwYWNlTWF0Y2hlcyAmJlxuICAgICAgbXVsdGlwbGVTcGFjZU1hdGNoZXMubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgY29uc3Qgc3BhY2VNYXRjaGVzQXJyYXk6IG51bWJlcltdID0gW107XG4gICAgICBtdWx0aXBsZVNwYWNlTWF0Y2hlcy5mb3JFYWNoKChtdWx0aXBsZVNwYWNlTWF0Y2g6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBtdWx0aXBsZVNwYWNlSW5kZXggPVxuICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdPy5pbmRleE9mKG11bHRpcGxlU3BhY2VNYXRjaCkgPz8gMDtcbiAgICAgICAgc3BhY2VNYXRjaGVzQXJyYXkucHVzaChtdWx0aXBsZVNwYWNlSW5kZXgpO1xuICAgICAgfSk7XG4gICAgICBmb3IgKGxldCBtID0gMDsgbSA8IHNwYWNlTWF0Y2hlc0FycmF5Lmxlbmd0aDsgbSsrKSB7XG4gICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdID1cbiAgICAgICAgICBjbG9zZXN0VmFsaWRFbGVtZW50c1tsXT8uc2xpY2UoMCwgc3BhY2VNYXRjaGVzQXJyYXlbbV0pLnRyaW0oKSA/P1xuICAgICAgICAgIFwibnVsbFwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vYXZhbGlhZG9yIGRlIGxhYmVscyBlIHRpdGxlcyBudWxvc1xuICAgIGlmIChcbiAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdPy5tYXRjaCgvW05uXVtVdV1bTGxdW0xsXS9nKSB8fFxuICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgY2xvc2VzdFZhbGlkRWxlbWVudHNbbF0gPT09IG51bGxcbiAgICApIHtcbiAgICAgIGxldCBpbnBWYWx1ZSA9IChpbnB1dHNbbF0gYXMgZW50cnlFbCk/LnZhbHVlIHx8IFwibnVsbFwiO1xuICAgICAgaWYgKFxuICAgICAgICBpbnB1dHNbbF0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXG4gICAgICAgICgoaW5wdXRzW2xdIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy50eXBlID09PSBcInJhZGlvXCIgfHxcbiAgICAgICAgICAoaW5wdXRzW2xdIGFzIEhUTUxJbnB1dEVsZW1lbnQpPy50eXBlID09PSBcImNoZWNrYm94XCIpXG4gICAgICApIHtcbiAgICAgICAgaW5wVmFsdWUgPVxuICAgICAgICAgIChpbnB1dHNbbF0gYXMgSFRNTElucHV0RWxlbWVudCk/LmNoZWNrZWQudG9TdHJpbmcoKSA/PyBcImZhbHNlXCI7XG4gICAgICB9XG4gICAgICBudWxsVGl0bGVBY2MrKztcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFTDrXR1bG8gbnVsbyBkZXRlY3RhZG86IE7Dum1lcm8gZGUgYWPDum11bG86ICR7bnVsbFRpdGxlQWNjfS5cbiAgICAgICAgICAgIFTDrXR1bG86ICR7XG4gICAgICAgICAgICAgIGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdIHx8IGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdIHx8IFwibnVsbFwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaW5zdMOibmNpYTogJHtcbiAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuICAgICAgICAgICAgICAgIC5jYWxsKGNsb3Nlc3RWYWxpZEVsZW1lbnRzW2xdKVxuICAgICAgICAgICAgICAgIC5zbGljZSg4LCAtMSkgPz8gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIElkIGRlIGlucHV0IHBhcmVhZGE6ICR7aW5wdXRzW2xdPy5pZCA/PyBcIm51bGxcIn07XG4gICAgICAgICAgICBWYWxvciBkZSBpbnB1dCBwYXJlYWRvICR7aW5wVmFsdWUgfHwgXCJudWxsXCJ9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvL2NyaWHDp8OjbyBkbyBzdG9yYWdlclxuICAgIGNvbnN0IG5KU09OVGl0bGVTdG9yYWdlciA9IG5ldyBKU09OVGl0bGVTdG9yYWdlcihjbG9zZXN0VmFsaWRFbGVtZW50c1tsXSk7XG5cbiAgICAvL2NyaWHDp8OjbyBkYSBzdG9yZVxuICAgIGlmIChuSlNPTlRpdGxlU3RvcmFnZXIpIHtcbiAgICAgIEpTT05UaXRsZXNTdG9yZS5wdXNoKG5KU09OVGl0bGVTdG9yYWdlcik7XG4gICAgICBjb25zdCBkZXNjcmlwdG9yID0gbkpTT05UaXRsZVN0b3JhZ2VyLnNob3dJbnBUaXRsZTsgLy9UT0RPIEVYUE9TScOHw4NPIERFIERBRE9TIFNPTUVOVEUgUEFSQSBGSU5BTElEQURFUyBERSBURVNURSwgUE9JUyBQUk9QUklFREFERVMgUFJJVkFEQVMgTsODTyBTw4NPIEVOVU1FUsOBVkVJU1xuICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgSlNPTlRpdGxlc1N0b3JlRGVzY3JpcHRvcnMucHVzaChkZXNjcmlwdG9yLnRvU3RyaW5nKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBFcnJvIHZhbGlkYW5kbyBkZXNjcmlwdG9yIHBhcmEgaW5zdMOibmNpYSAke2x9IGRlIEpTT05TdG9yYWdlcmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKGBFcnJvIHZhbGlkYW5kbyBpbnN0w6JuY2lhICR7bH0gZGUgSlNPTlN0b3JhZ2VyYCk7XG4gICAgfVxuICB9XG5cbiAgLy9maWx0cm8gZSB2YWxpZGHDp8OjbyBkYSBzdG9yZVxuICBpZiAoXG4gICAgSlNPTklucHNTdG9yZURlc2NyaXB0b3JzLmxlbmd0aCA9PT0gSlNPTklucHNTdG9yZS5sZW5ndGggJiZcbiAgICBKU09OVGl0bGVzU3RvcmVEZXNjcmlwdG9ycy5sZW5ndGggPT09IEpTT05UaXRsZXNTdG9yZS5sZW5ndGhcbiAgKSB7XG4gICAgY29uc3QgZmlsdGVyMUpTT05JbnBzU3RvcmUgPSBKU09OSW5wc1N0b3JlLmZpbHRlcihcbiAgICAgIChKU09ORWwpID0+IHR5cGVvZiBKU09ORWwgPT09IFwib2JqZWN0XCJcbiAgICApO1xuICAgIGNvbnN0IGZpbHRlcjFKU09OVGl0bGVzU3RvcmUgPSBKU09OVGl0bGVzU3RvcmUuZmlsdGVyKFxuICAgICAgKEpTT05FbCkgPT4gdHlwZW9mIEpTT05FbCA9PT0gXCJvYmplY3RcIlxuICAgICk7XG4gICAgaWYgKFxuICAgICAgZmlsdGVyMUpTT05JbnBzU3RvcmUubGVuZ3RoID09PSBKU09OSW5wc1N0b3JlLmxlbmd0aCAmJlxuICAgICAgZmlsdGVyMUpTT05UaXRsZXNTdG9yZS5sZW5ndGggPT09IEpTT05UaXRsZXNTdG9yZS5sZW5ndGhcbiAgICApIHtcbiAgICAgIEpTT05JbnBzU3RvcmUgPSBmaWx0ZXIxSlNPTklucHNTdG9yZTtcbiAgICAgIEpTT05UaXRsZXNTdG9yZSA9IGZpbHRlcjFKU09OVGl0bGVzU3RvcmU7XG4gICAgICBjb25zdCBmaWx0ZXIySlNPTklucHNTdG9yZSA9IEpTT05JbnBzU3RvcmUuZmlsdGVyKFxuICAgICAgICAoSlNPTkVsKSA9PiBKU09ORWwgaW5zdGFuY2VvZiBKU09OU3RvcmFnZXJcbiAgICAgICk7XG4gICAgICBjb25zdCBmaWx0ZXIySlNPTlRpdGxlc1N0b3JlID0gSlNPTlRpdGxlc1N0b3JlLmZpbHRlcihcbiAgICAgICAgKEpTT05FbCkgPT4gSlNPTkVsIGluc3RhbmNlb2YgSlNPTlRpdGxlU3RvcmFnZXJcbiAgICAgICk7XG4gICAgICBpZiAoXG4gICAgICAgIGZpbHRlcjJKU09OSW5wc1N0b3JlLmxlbmd0aCA9PT0gSlNPTklucHNTdG9yZS5sZW5ndGggJiZcbiAgICAgICAgZmlsdGVyMUpTT05UaXRsZXNTdG9yZS5sZW5ndGggPT09IEpTT05UaXRsZXNTdG9yZS5sZW5ndGhcbiAgICAgICkge1xuICAgICAgICBKU09OSW5wc1N0b3JlID0gZmlsdGVyMkpTT05JbnBzU3RvcmUuc29ydCgpO1xuICAgICAgICBKU09OVGl0bGVzU3RvcmUgPSBmaWx0ZXIySlNPTlRpdGxlc1N0b3JlLnNvcnQoKTtcbiAgICAgICAgbGV0IEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IEpTT05UaXRsZXNTdG9yZVN0cmluZ2lmaWVkOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAvL3N0cmluZ2lmaWNhw6fDo28gZGFzIHN0b3Jlc1xuICAgICAgICBKU09OSW5wc1N0b3JlLmZvckVhY2goKGZvcm1FbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVsVmFsdWVzID0gZm9ybUVsLnNob3dBbGxJbmZvO1xuICAgICAgICAgIGNvbnN0IGVsVmFsdWVzU3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShlbFZhbHVlcyk7IC8vVE9ETyBEQURPUyBFWFBPU1RPIFNPTUVOVEUgUEFSQSBGSU5TIERFIFRFU1RFXG4gICAgICAgICAgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkLnB1c2goZWxWYWx1ZXNTdHJpbmdpZmllZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBKU09OVGl0bGVzU3RvcmUuZm9yRWFjaCgoZm9ybUVsKSA9PiB7XG4gICAgICAgICAgY29uc3QgZWxWYWx1ZXMgPSBmb3JtRWwuc2hvd0lucFRpdGxlO1xuICAgICAgICAgIGNvbnN0IGVsVmFsdWVzU3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeShlbFZhbHVlcyk7IC8vVE9ETyBEQURPUyBFWFBPU1RPIFNPTUVOVEUgUEFSQSBGSU5TIERFIFRFU1RFXG4gICAgICAgICAgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQucHVzaChlbFZhbHVlc1N0cmluZ2lmaWVkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZCA9IEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZC5zb3J0KCk7XG4gICAgICAgIEpTT05UaXRsZXNTdG9yZVN0cmluZ2lmaWVkID0gSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQuc29ydCgpO1xuXG4gICAgICAgIC8vY29uY2x1c8Ojb1xuICAgICAgICBpZiAoXG4gICAgICAgICAgSlNPTklucHNTdG9yZSAmJlxuICAgICAgICAgIEpTT05JbnBzU3RvcmVTdHJpbmdpZmllZCAmJlxuICAgICAgICAgIEpTT05UaXRsZXNTdG9yZSAmJlxuICAgICAgICAgIEpTT05UaXRsZXNTdG9yZVN0cmluZ2lmaWVkXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBKU09OSW5wc1N0b3JlLFxuICAgICAgICAgICAgSlNPTklucHNTdG9yZVN0cmluZ2lmaWVkLFxuICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlLFxuICAgICAgICAgICAgSlNPTlRpdGxlc1N0b3JlU3RyaW5naWZpZWQsXG4gICAgICAgICAgXTsgLy9zdHJpbmdpZmllZCDDqSBhIHZlcnPDo28gdXNhZGEgY29tbyBEZXNjcmlwdG9yXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBFcnJvIHZhbGlkYW5kbyBjbGFzc2VzIGRlIGVsZW1lbnRvcyBubyBKU09OU3RvcmUuIFxuICAgICAgICAgIE7Dum1lcm8gZGUgaW5zdMOibmNpYXMgb2J0aWRhcyBwYXJhIGlucHV0czogJHtcbiAgICAgICAgICAgIGZpbHRlcjJKU09OSW5wc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgfTsgTsO6bWVybyBlc3BlcmFkbzogJHtKU09OSW5wc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTtcbiAgICAgICAgICBOw7ptZXJvIGRlIGluc3TDom5jaWFzIG9idGlkYXMgcGFyYSB0aXRsZXM6ICR7XG4gICAgICAgICAgICBmaWx0ZXIySlNPTlRpdGxlc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgfTsgTsO6bWVybyBlc3BlcmFkbzogJHtKU09OVGl0bGVzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBFcnJvIHZhbGlkYW5kbyB0aXBvcyBkZSBlbGVtZW50b3MgbmFzIEpTT05TdG9yZS4gXG4gICAgICAgIE7Dum1lcm8gZGUgb2JqZXRvcyBvYnRpZG9zIHBhcmEgaW5wdXRzOiAke1xuICAgICAgICAgIGZpbHRlcjFKU09OSW5wc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwiXG4gICAgICAgIH07IE7Dum1lcm8gZXNwZXJhZG86ICR7SlNPTklucHNTdG9yZS5sZW5ndGggPz8gXCJ1bmRlZmluZWRcIn07XG4gICAgICAgIE7Dum1lcm8gZGUgb2JqZXRvcyBvYnRpZG9zIHBhcmEgdGl0bGVzOiAke1xuICAgICAgICAgIGZpbHRlcjFKU09OVGl0bGVzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJcbiAgICAgICAgfTsgTsO6bWVybyBlc3BlcmFkbzogJHtKU09OVGl0bGVzU3RvcmUubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJ9YFxuICAgICAgKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgYExlbmd0aCBkZSBKU09OIFN0b3JlIERlc2NyaXB0b3JzIGludsOhbGlkYS4gXG4gICAgICBMZW5ndGggb2J0aWRhIHBhcmEgaW5wdXRzOiAke1xuICAgICAgICBKU09OSW5wc1N0b3JlRGVzY3JpcHRvcnMubGVuZ3RoID8/IFwidW5kZWZpbmVkXCJcbiAgICAgIH07IExlbmd0aCBlc3BlcmFkYTogJHtKU09OSW5wc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifTtcbiAgICAgIExlbmd0aCBvYnRpZGEgcGFyYSB0aXRsZXM6ICR7XG4gICAgICAgIEpTT05UaXRsZXNTdG9yZURlc2NyaXB0b3JzLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwiXG4gICAgICB9OyBMZW5ndGggZXNwZXJhZGE6ICR7SlNPTlRpdGxlc1N0b3JlLmxlbmd0aCA/PyBcInVuZGVmaW5lZFwifWBcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVKU09OQW5jaG9yKFxuICBKU09OQnRuOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgZm9ybUlucHNEZXNjcmlwdG9yOiBzdHJpbmdbXVxuKSB7XG4gIGNvbnN0IGZvcm1hdHRlZEZvcm1EZXNjcmlwdG9yID0gZm9ybWF0SlNPTkZpbGUoZm9ybUlucHNEZXNjcmlwdG9yKTtcbiAgY29uc3QgSlNPTkJsb2IgPSBuZXcgQmxvYihbZm9ybWF0dGVkRm9ybURlc2NyaXB0b3JbMV1dLCB7XG4gICAgdHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gIH0pO1xuICBjb25zdCBKU09OTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICBKU09OTGluay5pZCA9IFwiYW5jaG9ySlNPTlwiO1xuICBKU09OTGluay5jbGFzc05hbWUgPSBKU09OQnRuLmNsYXNzTmFtZTtcbiAgSlNPTkxpbmsuc3R5bGUud2lkdGggPSBKU09OQnRuLnN0eWxlLndpZHRoO1xuICBKU09OTGluay5zdHlsZS5oZWlnaHQgPSBKU09OQnRuLnN0eWxlLmhlaWdodDtcbiAgSlNPTkxpbmsudGV4dENvbnRlbnQgPSBcIkJhaXhhciBKU09OXCI7XG4gIEpTT05MaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKEpTT05CbG9iKTtcbiAgSlNPTkxpbmsuZG93bmxvYWQgPSBcImZvcm1EYXRhLmpzb25cIjtcbiAgSlNPTkJ0bi5yZXBsYWNlV2l0aChKU09OTGluayk7XG4gIHJldHVybiBKU09OTGluaztcbn1cblxuZnVuY3Rpb24gZm9ybWF0SlNPTkZpbGUoZm9ybUlucHNEZXNjcmlwdG9yOiBzdHJpbmdbXSkge1xuICBsZXQgZm9ybWF0Rm9ybURlc2NJZHMgPSBge1xcbmA7XG4gIGxldCBmb3JtYXRGb3JtRGVzY1RpdGxlcyA9IGBgO1xuICBsZXQgZm9ybWF0Rm9ybURlc2NJZHNSZWFkID0gYHtcXG5gO1xuICBsZXQgZm9ybWF0Rm9ybURlc2NUaXRsZXNSZWFkID0gYHtcXG5gO1xuICBsZXQgbGFiQWNjID0gMTtcblxuICAvL2dlcmHDp8OjbyBkYXMgdW5pZGFkZXMgZm9ybWF0YWRhc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1JbnBzRGVzY3JpcHRvci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNlcGFyYXRpb25NYXRjaGVzID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLm1hdGNoKC9cIiwvZyk7XG4gICAgaWYgKHNlcGFyYXRpb25NYXRjaGVzKSB7XG4gICAgICAvLyBjb25zdCBmaXJzdFNlcEluZGV4ID0gZm9ybUlucHNEZXNjcmlwdG9yW2ldLmluZGV4T2YoXCIsXCIpO1xuICAgICAgY29uc3Qgc2Vjb25kU2VwSW5kZXggPSBmb3JtSW5wc0Rlc2NyaXB0b3JbaV0uaW5kZXhPZihcbiAgICAgICAgXCIsXCIsXG4gICAgICAgIGZvcm1JbnBzRGVzY3JpcHRvcltpXS5pbmRleE9mKFwiLFwiKSArIDFcbiAgICAgICk7XG4gICAgICBjb25zdCBsYXN0U2VwSW5kZXggPSBmb3JtSW5wc0Rlc2NyaXB0b3JbaV0ubGFzdEluZGV4T2YoXG4gICAgICAgIHNlcGFyYXRpb25NYXRjaGVzWzBdXG4gICAgICApO1xuICAgICAgLy9mb3JtYXRhw6fDo28gZG9zIGlkcyBlIHZhbHVlcyBkb3MgaW5wdXRzXG4gICAgICBsZXQgaW5wSWQgPSBmb3JtSW5wc0Rlc2NyaXB0b3JbaV0uc2xpY2UoXG4gICAgICAgIHNlY29uZFNlcEluZGV4ICsgMixcbiAgICAgICAgbGFzdFNlcEluZGV4ICsgMVxuICAgICAgKTtcbiAgICAgIGxldCBsb29wQWNjID0gMDtcbiAgICAgIHdoaWxlIChpbnBJZC5tYXRjaCgvLC9nKSkge1xuICAgICAgICBjb25zdCBjb21tYUluZGV4ID0gaW5wSWQuaW5kZXhPZihcIixcIik7XG4gICAgICAgIGlucElkID0gaW5wSWQuc2xpY2UoY29tbWFJbmRleCArIDEpO1xuICAgICAgICBpZiAoIWlucElkLm1hdGNoKC8sL2cpIHx8IGxvb3BBY2MgPiA5OTkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsb29wQWNjKys7XG4gICAgICB9XG4gICAgICBjb25zdCB2YWx1ZSA9IGZvcm1JbnBzRGVzY3JpcHRvcltpXS5zbGljZShsYXN0U2VwSW5kZXggKyAyLCAtMSk7XG4gICAgICBjb25zdCBsYWIgPVxuICAgICAgICBtYXBJZHNUaXRsZXNbaW5wSWQucmVwbGFjZUFsbCgvXCIvZywgXCJcIikgYXMga2V5b2YgdHlwZW9mIG1hcElkc1RpdGxlc107XG5cbiAgICAgIGlmIChpID09IDg5KSB7XG4gICAgICAgIC8vYnVnIG7Do28gcmVzb2x2aWRvIGFpbmRhXG4gICAgICAgIGlmICghaW5wSWQpIHtcbiAgICAgICAgICBpbnBJZCA9ICdcImNvbmZpcm1Mb2NJZFwiJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy9jb25zdHJ1w6fDo28gZSBjb25jYXRlbmHDp8OjbyBkYXMgdW5pZGFkZXMgZm9ybWF0YWRhc1xuICAgICAgZm9ybWF0Rm9ybURlc2NJZHMgKz0gYFxcdCR7aW5wSWR9OiAke3ZhbHVlfSwgXFxuYDtcbiAgICAgIGZvcm1hdEZvcm1EZXNjSWRzUmVhZCArPSBgXFx0JHtsYWJBY2N9LiAke2lucElkfTogJHt2YWx1ZX0sIFxcbmA7IC8vdmVyc8O1ZXMgZW0gbGlzdGEgbnVtZXJhZGEsIHBhcmEgbG9ncyBlIGVudW1lcmHDp8OjbyBwb3N0ZXJpb3JcbiAgICAgIGxhYkFjYysrO1xuICAgICAgaWYgKGxhYiAmJiBsYWIgIT09IFwibnVsbFwiICYmIGxhYiAhPT0gXCJcIikge1xuICAgICAgICBmb3JtYXRGb3JtRGVzY1RpdGxlc1JlYWQgKz0gYFxcdCR7bGFiQWNjfS4gJHtsYWJ9IGZvciAke2lucElkfTogJHt2YWx1ZX0sIFxcbmA7XG4gICAgICAgIGZvcm1hdEZvcm1EZXNjVGl0bGVzICs9IGBcXHRcIiR7bGFifVwiOiAke3ZhbHVlfSwgXFxuYDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy9hanVzdGVzIGZpbmFpcyBub3MgZGVzY3JpcHRvcnMgZSB1bmnDo29cbiAgY29uc3QgZmluYWxEZXNjSWRzID0gKFxuICAgIGZvcm1hdEZvcm1EZXNjSWRzICtcbiAgICBgXFxuXFxuYCArXG4gICAgZm9ybWF0Rm9ybURlc2NUaXRsZXMgK1xuICAgIGB9YFxuICApLnJlcGxhY2UoXCIsIFxcbn1cIiwgXCIgXFxufVwiKTtcbiAgY29uc3QgZmluYWxEZXNjVGl0bGVzID0gKGB7YCArIGZvcm1hdEZvcm1EZXNjVGl0bGVzICsgYH1gKS5yZXBsYWNlKFxuICAgIFwiLCBcXG59XCIsXG4gICAgXCIgXFxufVwiXG4gICk7XG5cbiAgLy9wYXJhIGxlaXR1cmEgZW0gbG9ncyBzb21lbnRlXG4gIGNvbnN0IGZpbmFsRGVzY0lkc1JlYWQgPSAoZm9ybWF0Rm9ybURlc2NJZHNSZWFkICsgYH1gKVxuICAgIC5yZXBsYWNlKFwiLCBcXG59XCIsIFwiIFxcbn1cIilcbiAgICAucmVwbGFjZUFsbCgvXCJcIm51bGxcIjogXCJudWxsXCIsL2csIFwiXCIpXG4gICAgLnJlcGxhY2VBbGwoL1wiXCJmYWxzZVwiOiBcImZhbHNlXCIsL2csIFwiXCIpXG4gICAgLnJlcGxhY2VBbGwoL1wibnVsbFwiOiBcIm51bGxcIiwvZywgXCJcIilcbiAgICAucmVwbGFjZUFsbCgvXCJmYWxzZVwiOiBcImZhbHNlXCIsL2csIFwiXCIpXG4gICAgLnJlcGxhY2VBbGwoL1wiZmFsc2VcIjogXCJmYWxzZVwiL2csIFwiXCIpXG4gICAgLnJlcGxhY2VBbGwoL1wibnVsbFwiOiBcIm51bGxcIi9nLCBcIlwiKVxuICAgIC5yZXBsYWNlQWxsKC9cXHRbMC05XXsxLDN9LlxcczpcXHNcIm51bGxcIixcXHNcXG4vZywgXCJcIilcbiAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHM6XFxzXCJmYWxzZVwiLFxcc1xcbi9nLCBcIlwiKVxuICAgIC5yZXBsYWNlQWxsKC9cXHRbMC05XXsxLDN9Llxcc1xcc1xcbi9nLCBcIlwiKTtcblxuICBjb25zdCBmaW5hbERlc2NUaXRsZXNSZWFkID0gKGZvcm1hdEZvcm1EZXNjVGl0bGVzUmVhZCArIGB9YClcbiAgICAucmVwbGFjZShcIiwgXFxufVwiLCBcIiBcXG59XCIpXG4gICAgLnJlcGxhY2VBbGwoL1wiXCJudWxsXCI6IFwibnVsbFwiLC9nLCBcIlwiKVxuICAgIC5yZXBsYWNlQWxsKC9cIlwiZmFsc2VcIjogXCJmYWxzZVwiLC9nLCBcIlwiKVxuICAgIC5yZXBsYWNlQWxsKC9cIm51bGxcIjogXCJudWxsXCIsL2csIFwiXCIpXG4gICAgLnJlcGxhY2VBbGwoL1wiZmFsc2VcIjogXCJmYWxzZVwiLC9nLCBcIlwiKVxuICAgIC5yZXBsYWNlQWxsKC9cImZhbHNlXCI6IFwiZmFsc2VcIi9nLCBcIlwiKVxuICAgIC5yZXBsYWNlQWxsKC9cIm51bGxcIjogXCJudWxsXCIvZywgXCJcIilcbiAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHM6XFxzXCJudWxsXCIsXFxzXFxuL2csIFwiXCIpXG4gICAgLnJlcGxhY2VBbGwoL1xcdFswLTldezEsM30uXFxzOlxcc1wiZmFsc2VcIixcXHNcXG4vZywgXCJcIilcbiAgICAucmVwbGFjZUFsbCgvXFx0WzAtOV17MSwzfS5cXHNcXHNcXG4vZywgXCJcIik7XG5cbiAgY29uc29sZS5sb2coZmluYWxEZXNjSWRzUmVhZCk7XG4gIGNvbnNvbGUubG9nKGZpbmFsRGVzY1RpdGxlc1JlYWQpO1xuICByZXR1cm4gW2ZpbmFsRGVzY1RpdGxlcywgZmluYWxEZXNjSWRzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2VuZXJhdGVKU09OQnRuKFxuICBKU09OTGluazogSFRNTEFuY2hvckVsZW1lbnQsXG4gIGZvcm1JbnBzRGVzY3JpcHRvcjogc3RyaW5nW11cbikge1xuICBjb25zdCBuZXdKU09OQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbmV3SlNPTkJ0bi5pZCA9IFwiYnRuSlNPTlwiO1xuICBuZXdKU09OQnRuLmNsYXNzTmFtZSA9IEpTT05MaW5rLmNsYXNzTmFtZTtcbiAgbmV3SlNPTkJ0bi5zdHlsZS53aWR0aCA9IEpTT05MaW5rLnN0eWxlLndpZHRoO1xuICBuZXdKU09OQnRuLnN0eWxlLmhlaWdodCA9IEpTT05MaW5rLnN0eWxlLmhlaWdodDtcbiAgbmV3SlNPTkJ0bi50ZXh0Q29udGVudCA9IFwiUmVnZW5lcmFyIEpTT05cIjtcbiAgSlNPTkxpbmsucmVwbGFjZVdpdGgobmV3SlNPTkJ0bik7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIG5ld0pTT05CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICBjcmVhdGVKU09OQW5jaG9yKG5ld0pTT05CdG4sIGZvcm1JbnBzRGVzY3JpcHRvcilcbiAgICApO1xuICB9LCAxMDAwKTtcbiAgLy8gcmV0dXJuIG5ld0pTT05CdG47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcFJhZGlvSGFuZGxlcihrZXlkb3duOiBLZXlib2FyZEV2ZW50KSB7XG4gIGNvbnN0IHJhZGlvUGFpcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICdpbnB1dFtpZCQ9XCJZZXNcIl0sIGlucHV0W2lkJD1cIk5vXCJdJyAvL2FjZXNzYW5kbyBjb21vIHBhclxuICApO1xuXG4gIGZvciAoXG4gICAgbGV0IGkgPSAwO1xuICAgIGkgPCByYWRpb1BhaXJzLmxlbmd0aDtcbiAgICBpICs9IDIgLy9wdWxhbmRvIGRlIHBhciBlbSBwYXJcbiAgKSB7XG4gICAgY29uc3QgcmFkaW9ZZXMgPSByYWRpb1BhaXJzW2ldO1xuICAgIGNvbnN0IHJhZGlvTm8gPSByYWRpb1BhaXJzW2kgKyAxXTtcblxuICAgIGlmICghcmFkaW9ZZXMgfHwgIXJhZGlvTm8pIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICByYWRpb1llcyBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcbiAgICAgIHJhZGlvTm8gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXG4gICAgICAhcmFkaW9ZZXMuY2hlY2tlZCAmJlxuICAgICAgIXJhZGlvTm8uY2hlY2tlZCAmJlxuICAgICAga2V5ZG93biBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnRcbiAgICApIHtcbiAgICAgIGlmICgoa2V5ZG93bi5hbHRLZXkgJiYga2V5ZG93bi5rZXkgPT09IFwieVwiKSB8fCBrZXlkb3duLmtleSA9PT0gXCJZXCIpIHtcbiAgICAgICAgcmFkaW9ZZXMuZm9jdXMoKTtcbiAgICAgICAgcmFkaW9ZZXMuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJhZGlvWWVzLmJsdXIoKTtcbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIChrZXlkb3duLmFsdEtleSAmJiBrZXlkb3duLmtleSA9PT0gXCJuXCIpIHx8XG4gICAgICAgIGtleWRvd24ua2V5ID09PSBcIk5cIlxuICAgICAgKSB7XG4gICAgICAgIHJhZGlvTm8uZm9jdXMoKTtcbiAgICAgICAgcmFkaW9Oby5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcmFkaW9Oby5ibHVyKCk7XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYHJhZGlvWWVzOiAkeyhyYWRpb1llcyBhcyBIVE1MSW5wdXRFbGVtZW50KT8uY2hlY2tlZCA/PyBmYWxzZX1gXG4gICAgICApO1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgcmFkaW9ObzogJHsocmFkaW9ObyBhcyBIVE1MSW5wdXRFbGVtZW50KT8uY2hlY2tlZCA/PyBmYWxzZX1gXG4gICAgICApO1xuICAgICAgY29uc29sZS53YXJuKGAke0pTT04uc3RyaW5naWZ5KGtleWRvd24pfWApO1xuXG4gICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gICAgICBFcnJvckhhbmRsZXIubXVsdGlwbGVFbGVtZW50c05vdEZvdW5kKFxuICAgICAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIixcbiAgICAgICAgXCJ2YWxpZGFuZG8gcmFkaW9ZZXMgb3UgcmFkaW9zTm8gb3Uga2V5ZG93biBldmVudCB0YXJnZXRcIixcbiAgICAgICAgcmFkaW9ZZXMgPz8gbnVsbCxcbiAgICAgICAgcmFkaW9ObyA/PyBudWxsXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3BiSW5wSGFuZGxlcihyYWRpbzogSFRNTElucHV0RWxlbWVudCkge1xuICBpZiAocmFkaW8ucGFyZW50RWxlbWVudCAmJiByYWRpby5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICBjb25zdCBvcFJhZGlvc0NoZWNrID0gcmFkaW8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIFwiaW5wdXRbaWRePSdDcGInXVtpZCQ9J1llcyddXCJcbiAgICApO1xuICAgIGNvbnN0IG9wUmFkaW9zVGV4dCA9IHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBcImlucHV0W2lkXj0ncGInXVtpZCQ9J1llcyddXCJcbiAgICApO1xuICAgIGNvbnN0IGFudEZhbUNoZWNrcyA9IHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBcImlucHV0W2lkXj0nYW50RmFtJ11cIlxuICAgICk7XG4gICAgY29uc3QgdGV4dEFkZCA9IHJhZGlvLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBcInRleHRhcmVhW2lkXj0ndGV4dEFkZCddXCJcbiAgICApO1xuICAgIGNvbnN0IGRpdkFkZCA9XG4gICAgICByYWRpby5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2W2lkXj0nZGl2QWRkJ11cIik7XG4gICAgLy9pbmNsdWkgYW1ib3Mgb3MgdGlwb3MgZGUgZXZlbnRvc1xuICAgIGlmIChvcFJhZGlvc0NoZWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIG9wUmFkaW9zQ2hlY2s/LmZvckVhY2goZnVuY3Rpb24gKG9wUmFkaW9DaGVjaywgaSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZGl2QWRkW2ldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcbiAgICAgICAgICBvcFJhZGlvQ2hlY2sgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXG4gICAgICAgICAgKG9wUmFkaW9DaGVjay50eXBlID09PSBcImNoZWNrYm94XCIgfHwgb3BSYWRpb0NoZWNrLnR5cGUgPT09IFwicmFkaW9cIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKCFvcFJhZGlvQ2hlY2suY2hlY2tlZCkge1xuICAgICAgICAgICAgKGRpdkFkZFtpXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoZGl2QWRkW2ldIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChvcFJhZGlvc1RleHQubGVuZ3RoID4gMCkge1xuICAgICAgb3BSYWRpb3NUZXh0Py5mb3JFYWNoKGZ1bmN0aW9uIChvcFJhZGlvVGV4dCwgaSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGV4dEFkZFtpXSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG4gICAgICAgICAgb3BSYWRpb1RleHQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmXG4gICAgICAgICAgKG9wUmFkaW9UZXh0LnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fCBvcFJhZGlvVGV4dC50eXBlID09PSBcInJhZGlvXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICghb3BSYWRpb1RleHQuY2hlY2tlZCkge1xuICAgICAgICAgICAgKHRleHRBZGRbaV0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKHRleHRBZGRbaV0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGFudEZhbUNoZWNrcy5sZW5ndGggPiAwKSB7XG4gICAgICBhbnRGYW1DaGVja3M/LmZvckVhY2goKGFudEZhbUNoZWNrLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb3Nlc3RBZGRFbGVtZW50ID1cbiAgICAgICAgICBhbnRGYW1DaGVja3NbaV0ucGFyZW50RWxlbWVudD8ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBpZiAoY2xvc2VzdEFkZEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGFudEZhbUNoZWNrIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxuICAgICAgICAgICAgKGFudEZhbUNoZWNrLnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fCBhbnRGYW1DaGVjay50eXBlID09PSBcInJhZGlvXCIpICYmXG4gICAgICAgICAgICAhYW50RmFtQ2hlY2suY2hlY2tlZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY2xvc2VzdEFkZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbG9zZXN0QWRkRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNsaWNlZEVycm9yID1cbiAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gICAgRXJyb3JIYW5kbGVyLm11bHRpcGxlRWxlbWVudHNOb3RGb3VuZChcbiAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiLFxuICAgICAgXCJsb2NhbGl6YW5kbyBwYXJlbnQgZWxlbWVudHMgZGUgUmFkaW9cIixcbiAgICAgIHJhZGlvPy5wYXJlbnRFbGVtZW50ID8/IG51bGwsXG4gICAgICByYWRpbz8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudCA/PyBudWxsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RUZXh0SW5wdXQoKSB7XG4gIGNvbnN0IG51bWJlcklucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ2lucHV0W3R5cGU9XCJudW1iZXJcIl1baWQkPU51bUlkXSdcbiAgKTtcbiAgY29uc3QgbnVsbFJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ2lucHV0W3R5cGU9XCJyYWRpb1wiXVtpZCQ9TnVsbElkXSdcbiAgKTtcblxuICBpZiAobnVtYmVySW5wdXRzLmxlbmd0aCAhPT0gbnVsbFJhZGlvcy5sZW5ndGgpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiTsO6bWVybyBkZSB0ZXh0cyBlIHJhZGlvcyBuw6NvIGNvcnJlc3BvbmRlIVwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBudW1iZXJJbnB1dHMuZm9yRWFjaCgobnVtYmVySW5wdXQsIGkpID0+IHtcbiAgICBjb25zdCBudWxsUmFkaW8gPSBudWxsUmFkaW9zW2ldO1xuICAgIGlmICgobnVsbFJhZGlvIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpIHtcbiAgICAgIG51bWJlcklucHV0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBudW1iZXJJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG91YmxlQ2xpY2tIYW5kbGVyKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gIGlucHV0LmNoZWNrZWQgPSBpbnB1dC5jaGVja2VkID8gZmFsc2UgOiB0cnVlO1xuICBjcGJJbnBIYW5kbGVyKGlucHV0KTtcbiAgZGVhY3RUZXh0SW5wdXQoKTtcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHRvdWNoU3RhcnRIYW5kbGVyKGtleWRvd246IEtleWJvYXJkRXZlbnQpIHtcbi8vICAgbGV0IGZpcnN0VGFwVGltZSA9IDA7XG4vLyAgIGlmIChmaXJzdFRhcFRpbWUgPT09IDApIHtcbi8vICAgICBmaXJzdFRhcFRpbWUgPSBEYXRlLm5vdygpO1xuLy8gICB9IGVsc2Uge1xuLy8gICAgIGNvbnN0IGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gZmlyc3RUYXBUaW1lO1xuLy8gICAgIGlmIChlbGFwc2VkIDwgMTAwMCkge1xuLy8gICAgICAgLy8gTGltaXRlIGRlIHRlbXBvIHBhcmEgY29uc2lkZXJhciB1bSBkdXBsbyB0b3F1ZSAoMzAwbXMpXG4vLyAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4vLyAgICAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbi8vICAgICAgIH1cbi8vICAgICAgIGZpcnN0VGFwVGltZSA9IDA7IC8vIFJlaW5pY2lhciBvIHRlbXBvcml6YWRvclxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBmaXJzdFRhcFRpbWUgPSBEYXRlLm5vdygpOyAvLyBJbmljaWFyIHVtIG5vdm8gdGVtcG9yaXphZG9yXG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIG9wUmFkaW9IYW5kbGVyKGtleWRvd24pO1xuLy8gICBjcGJJbnBIYW5kbGVyKHRoaXMpO1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlQ3VycmVudERhdGUoYWN0aXZhdGlvbjogRXZlbnQsIGRhdGVCdG46IEhUTUxCdXR0b25FbGVtZW50KSB7XG4gIGNvbnN0IGRhdGFBdHVhbCA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGFubyA9IGRhdGFBdHVhbC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtZXMgPSAoZGF0YUF0dWFsLmdldE1vbnRoKCkgKyAxKVxuICAgIC50b1N0cmluZygpXG4gICAgLnBhZFN0YXJ0KDIsIFwiMFwiKVxuICAgIC5yZXBsYWNlQWxsKFwiJ1wiLCBcIlwiKTtcbiAgY29uc3QgZGlhID0gZGF0YUF0dWFsXG4gICAgLmdldERhdGUoKVxuICAgIC50b1N0cmluZygpXG4gICAgLnBhZFN0YXJ0KDIsIFwiMFwiKVxuICAgIC5yZXBsYWNlQWxsKFwiJ1wiLCBcIlwiKTtcblxuICBjb25zdCB0YXJnSW5wdXREYXRlID0gc2VhcmNoUHJldmlvdXNTaWJsaW5ncyhkYXRlQnRuLCBcImlucERhdGVcIik7XG5cbiAgaWYgKFxuICAgIGFjdGl2YXRpb24udGFyZ2V0ID09PSBkYXRlQnRuICYmXG4gICAgdGFyZ0lucHV0RGF0ZSAmJlxuICAgIHRhcmdJbnB1dERhdGUudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmXG4gICAgdGFyZ0lucHV0RGF0ZSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnRcbiAgKSB7XG4gICAgdGFyZ0lucHV0RGF0ZS52YWx1ZSA9IGFubyArIFwiLVwiICsgbWVzICsgXCItXCIgKyBkaWE7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChcbiAgICAgIHRhcmdJbnB1dERhdGUgPz8gbnVsbCxcbiAgICAgIFwidGFyZ0lucHV0RGF0ZVwiLFxuICAgICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hOZXh0U2libGluZ3MoXG4gIGN1cnJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBzZWFyY2hlZFNpYmxpbmdDbGFzczogc3RyaW5nXG4pIHtcbiAgbGV0IGxvb3BBY2MgPSAwO1xuICB3aGlsZSAoY3VycmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgY29uc3QgaXNTaWJsaW5nVmFsaWQgPVxuICAgICAgY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlYXJjaGVkU2libGluZ0NsYXNzKTtcbiAgICBpZiAoaXNTaWJsaW5nVmFsaWQgfHwgbG9vcEFjYyA+IDk5OSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxvb3BBY2MrKztcbiAgfVxuICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQcmV2aW91c1NpYmxpbmdzKFxuICBjdXJyZW50RWxlbWVudDogRWxlbWVudCxcbiAgc2VhcmNoZWRTaWJsaW5nQ2xhc3M6IHN0cmluZ1xuKSB7XG4gIGxldCBsb29wQWNjID0gMDtcbiAgd2hpbGUgKGN1cnJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgY29uc3QgaXNTaWJsaW5nVmFsaWQgPVxuICAgICAgY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlYXJjaGVkU2libGluZ0NsYXNzKTtcbiAgICBpZiAoaXNTaWJsaW5nVmFsaWQgfHwgbG9vcEFjYyA+IDk5OSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxvb3BBY2MrKztcbiAgfVxuICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQcmV2aW91c1NpYmxpbmdzQnlJZChcbiAgY3VycmVudEVsZW1lbnQ6IEVsZW1lbnQsXG4gIHNlYXJjaGVkU2libGluZ0lkOiBzdHJpbmdcbikge1xuICBsZXQgbG9vcEFjYyA9IDA7XG4gIHdoaWxlIChjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIGNvbnN0IGlzU2libGluZ1ZhbGlkID0gY3VycmVudEVsZW1lbnQuaWQgPT09IHNlYXJjaGVkU2libGluZ0lkO1xuICAgIGlmIChpc1NpYmxpbmdWYWxpZCB8fCBsb29wQWNjID4gOTk5KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbG9vcEFjYysrO1xuICB9XG4gIHJldHVybiBjdXJyZW50RWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFBhcmVudHMoXG4gIGN1cnJlbnRFbGVtZW50OiBFbGVtZW50LFxuICBzZWFyY2hlZFBhcmVudENsYXNzOiBzdHJpbmdcbikge1xuICBsZXQgbG9vcEFjYyA9IDA7XG4gIHdoaWxlIChjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgY3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGNvbnN0IGlzUGFyZW50VmFsaWQgPVxuICAgICAgY3VycmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHNlYXJjaGVkUGFyZW50Q2xhc3MpO1xuICAgIGlmIChpc1BhcmVudFZhbGlkIHx8IGxvb3BBY2MgPiA5OTkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsb29wQWNjKys7XG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRFbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVG9Bc3REaWdpdChcbiAgY2xpY2s6IE1vdXNlRXZlbnQsXG4gIHRvRmlsZUlucEJ0bjogSFRNTEJ1dHRvbkVsZW1lbnRcbikge1xuICBjb25zdCB1c2VBc3REaWdpdFJlZ2V4ID0gL1VzYXIgQXNzaW5hdHVyYSBEaWdpdGFsLztcbiAgY29uc3QgdXNlQXN0RGlndFJlZ2V4T2JqID0gbmV3IFJlZ0V4cCh1c2VBc3REaWdpdFJlZ2V4KTtcbiAgY29uc3QgdXNlQXN0VGV4dFJlZ2V4ID0gL1JldG9ybmFyIMOgIEFzc2luYXR1cmEgRXNjcml0YS87XG4gIGNvbnN0IHVzZUFzdFRleHRSZWdleE9iaiA9IG5ldyBSZWdFeHAodXNlQXN0VGV4dFJlZ2V4KTtcbiAgbGV0IGxhYkNvbnQ6IEhUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD4gfCBzdHJpbmcgfCBFbGVtZW50W10gPVxuICAgIHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGFiQXN0XCIpID8/IFwibnVsbFwiO1xuICBpZiAoXG4gICAgbGFiQ29udFswXSA9PT0gXCJudWxsXCIgJiZcbiAgICAodG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQ/LnRhZ05hbWUgPT09IFwiTEFCRUxcIiB8fFxuICAgICAgdG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQ/LnRhZ05hbWUgPT09IFwiU1BBTlwiKVxuICApIHtcbiAgICBsYWJDb250ID0gQXJyYXkub2YodG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQpO1xuICB9XG5cbiAgaWYgKGNsaWNrLnRhcmdldCA9PT0gdG9GaWxlSW5wQnRuKSB7XG4gICAgaWYgKFxuICAgICAgdG9GaWxlSW5wQnRuLnRleHRDb250ZW50ICYmXG4gICAgICB1c2VBc3REaWd0UmVnZXhPYmoudGVzdCh0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQpXG4gICAgKSB7XG4gICAgICBjb25zdCBpbnBBc3QgPSBzZWFyY2hQcmV2aW91c1NpYmxpbmdzKHRvRmlsZUlucEJ0biwgXCJpbnBBc3RcIik7XG5cbiAgICAgIGlmIChpbnBBc3QgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGZpbGVJbnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGZpbGVJbnAudHlwZSA9IFwiZmlsZVwiO1xuICAgICAgICBmaWxlSW5wLm5hbWUgPSBpbnBBc3QubmFtZTsgLy9pZ25vcmFyIFRTXG4gICAgICAgIGZpbGVJbnAuaWQgPSBpbnBBc3QuaWQ7XG4gICAgICAgIGZpbGVJbnAuY2xhc3NOYW1lID0gaW5wQXN0LmNsYXNzTmFtZTtcbiAgICAgICAgZmlsZUlucC5zZXRBdHRyaWJ1dGUoXCJhY2NlcHRcIiwgXCJpbWFnZS8qXCIpO1xuICAgICAgICBpZiAoaW5wQXN0LnJlcXVpcmVkKSB7XG4gICAgICAgICAgZmlsZUlucC5yZXF1aXJlZCA9IGlucEFzdC5yZXF1aXJlZDsgLy9pZ25vcmFyIFRTXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucEFzdC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgaW5wQXN0LnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKGZpbGVJbnAsIGlucEFzdCk7XG4gICAgICAgICAgY29uc3QgaWRMYWJNYXRjaCA9XG4gICAgICAgICAgICAobGFiQ29udFswXSBhcyBFbGVtZW50KS5pZC5tYXRjaCgvQXN0Lyk/LnRvU3RyaW5nKCkgPz8gXCJcIjtcbiAgICAgICAgICBjb25zdCBpZElucE1hdGNoID0gZmlsZUlucC5pZC5tYXRjaCgvQXN0Lyk/LnRvU3RyaW5nKCkgPz8gXCJcIjtcbiAgICAgICAgICBjb25zdCBpZExhYk1hdGNoSW5kZXggPSAobGFiQ29udFswXSBhcyBFbGVtZW50KS5pZC5pbmRleE9mKFxuICAgICAgICAgICAgaWRMYWJNYXRjaFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgaWRJbnBNYXRjaEluZGV4ID0gZmlsZUlucC5pZC5pbmRleE9mKGlkSW5wTWF0Y2gpO1xuICAgICAgICAgIGlmIChpZExhYk1hdGNoSW5kZXggJiYgaWRJbnBNYXRjaEluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCBzbGljZU9uZUxhYklkID0gKGxhYkNvbnRbMF0gYXMgRWxlbWVudCkuaWQuc2xpY2UoXG4gICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgIGlkTGFiTWF0Y2hJbmRleFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHNsaWNlVHdvSW5wSWQgPSBmaWxlSW5wLmlkLnNsaWNlKGlkSW5wTWF0Y2hJbmRleCk7XG4gICAgICAgICAgICAobGFiQ29udFswXSBhcyBFbGVtZW50KS5pZCA9IHNsaWNlT25lTGFiSWQgKyBzbGljZVR3b0lucElkO1xuICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnRleHRDb250ZW50ID0gXCJSZXRvcm5hciDDoCBBc3NpbmF0dXJhIEVzY3JpdGFcIjtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRvRmlsZUlucEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nPy5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gbWF0Y2ggZGUgaWRzIGRvIGlucHV0XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZmlsZUlucCkge1xuICAgICAgICAgICAgZmlsZUlucC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChjaG9zZSkgPT4ge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGNob3NlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICAgIGZpbGVJbnAuZmlsZXMgJiZcbiAgICAgICAgICAgICAgICAgIGZpbGVJbnAuZmlsZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaW1nRmlsZSA9IGZpbGVJbnAuZmlsZXNbMF07XG4gICAgICAgICAgICAgICAgICBpZiAoaW1nRmlsZSAmJiBpbWdGaWxlLnR5cGUuc3RhcnRzV2l0aChcImltYWdlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGxvYWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAvL2RlZmluaXIgbMOzZ2ljYSBwYXJhIGNhcnJlZ2FtZW50b1xuICAgICAgICAgICAgICAgICAgICAgIC8vaW5pY2lhIHByZXBhcm8gcGFyYSBldmVudG8gZGUgY2FycmVnYW1lbnRvXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nVXJsID0gbG9hZC50YXJnZXQ/LnJlc3VsdDsgLy9jaGVjYSBhIHVybCBkbyBmaWxlIHF1ZSBzZXLDoSBjYXJyZWdhZG9cbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWdBc3REaWd0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTsgLy9jcmlhIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAuaWQgPSBpbnBBc3QuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5jbGFzc05hbWUgPSBpbnBBc3QuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGltZ1VybCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zcmMgPSBpbWdVcmw7IC8vYXNzb2NpYcOnw6NvIGVudHJlIGNvbnRhaW5lciBlIGZpbGUgY2FycmVnYWRvXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3QuaWQgPSBmaWxlSW5wLmlkO1xuICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3QuY2xhc3NOYW1lID0gZmlsZUlucC5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgXCJBc3NpbmF0dXJhIERpZ2l0YWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zZXRBdHRyaWJ1dGUoXCJkZWNvZGluZ1wiLCBcImFzeW5jXCIpO1xuICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3Quc2V0QXR0cmlidXRlKFwibG9hZGluZ1wiLCBcImVhZ2VyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3Quc2V0QXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIiwgXCJhbm9ueW1vdXNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5zdHlsZS5zZXRQcm9wZXJ0eShcIm1heC13aWR0aFwiLCBcIjMwMHB4XCIpO1xuICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3Quc3R5bGUuc2V0UHJvcGVydHkoXCJtYXgtaGVpZ2h0XCIsIFwiMjAwcHhcIik7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUlucC5wYXJlbnRFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJDb250ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJDb250Lmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJbnAucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoaW1nQXN0RGlndCwgZmlsZUlucCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoID0gKGxhYkNvbnRbMF0gYXMgRWxlbWVudCkuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hdGNoKC9Bc3QvKVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZElucE1hdGNoID0gaW1nQXN0RGlndC5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWF0Y2goL0FzdC8pXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZExhYk1hdGNoICYmIGlkSW5wTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRMYWJNYXRjaEluZGV4ID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYkNvbnRbMF0gYXMgRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICApLmlkLmluZGV4T2YoaWRMYWJNYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2hJbmRleCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nQXN0RGlndC5pZC5pbmRleE9mKGlkSW5wTWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZU9uZUxhYklkID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYkNvbnRbMF0gYXMgRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICApLmlkLnNsaWNlKDAsIGlkTGFiTWF0Y2hJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlVHdvSW5wSWQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3QuaWQuc2xpY2UoaWRJbnBNYXRjaEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGxhYkNvbnRbMF0gYXMgRWxlbWVudCkuaWQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlT25lTGFiSWQgKyBzbGljZVR3b0lucElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJybyBubyBtYXRjaCBkZSBpZHMgZG8gaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgRXJybyBuYSB2YWxpZGHDp8OjbyBkZSBsYWJDb250OiBlbGVtZW50byAke2xhYkNvbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBlL291IHBhcmVudDogZWxlbWVudG8gJHtmaWxlSW5wLnBhcmVudEVsZW1lbnR9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gaW1nQXN0RGlndC5zdHlsZS53aWR0aCA9IGltZ0FzdERpZ3QucGFyZW50RWxlbWVudC5zdHlsZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1nQXN0RGlndCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGNvbXB1dGVJbWdBc3RkV2lkdGggPSBnZXRDb21wdXRlZFN0eWxlKGltZ0FzdERpZ3QpLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1nQXN0RGlndC5wYXJlbnRFbGVtZW50LnN0eWxlLndpZHRoID0gY29tcHV0ZUltZ0FzdGRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZ0FzdERpZ3Quc3R5bGUuc2V0UHJvcGVydHkoXCJvdmVyZmxvd1wiLCBcImF1dG9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoaW1nRmlsZSk7IC8vbMOqIG8gZmlsZSBiYXNlYWRvIG5hIHNyYyBjYXJyZWdhZGFcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmVuaHVtIGFycXVpdm8gc2VsZWNpb25hZG9cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoKGVycm9yIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoXG4gICAgICAgICAgaW5wQXN0ID8/IG51bGwsXG4gICAgICAgICAgXCJpbnBBc3RcIixcbiAgICAgICAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy9UT0RPIElOQ0xVSVIgVE9LRU4gQU5USS1DU1JGIFFVQU5ETyBIT1VWRVIgU0VSVklET1JcblxuICAgICAgLy8gZmlsZUlucC5uYW1lID0gaW5wQXN0Lm5hbWU7XG4gICAgICAvLyBmaWxlSW5wLmlkID0gaW5wQXN0LmlkO1xuICAgICAgLy8gZmlsZUlucC5jbGFzc05hbWUgPSBpbnBBc3QuY2xhc3NOYW1lO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQgJiZcbiAgICAgIHVzZUFzdFRleHRSZWdleE9iai50ZXN0KHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudClcbiAgICApIHtcbiAgICAgIGNvbnN0IGlucEFzdCA9XG4gICAgICAgIHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImlucEFzdFwiKSB8fFxuICAgICAgICBzZWFyY2hQcmV2aW91c1NpYmxpbmdzKHRvRmlsZUlucEJ0biwgXCJpbWdBc3REaWdpdFwiKTtcbiAgICAgIGlmIChcbiAgICAgICAgaW5wQXN0IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCB8fFxuICAgICAgICBpbnBBc3QgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50XG4gICAgICApIHtcbiAgICAgICAgY29uc3QgZmlsZUlucCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgZmlsZUlucC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIGZpbGVJbnAubmFtZSA9IGlucEFzdC5uYW1lO1xuICAgICAgICBmaWxlSW5wLmlkID0gaW5wQXN0LmlkO1xuICAgICAgICBmaWxlSW5wLmNsYXNzTmFtZSA9IGlucEFzdC5jbGFzc05hbWU7XG4gICAgICAgIGZpbGVJbnAuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgXCJcIik7XG4gICAgICAgIGlmIChpbnBBc3QucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIGlucEFzdC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChmaWxlSW5wLCBpbnBBc3QpO1xuICAgICAgICAgIGNvbnN0IGlkTGFiTWF0Y2ggPSAobGFiQ29udFswXSBhcyBFbGVtZW50KS5pZFxuICAgICAgICAgICAgLm1hdGNoKC9Bc3QvKVxuICAgICAgICAgICAgPy50b1N0cmluZygpO1xuICAgICAgICAgIGNvbnN0IGlkSW5wTWF0Y2ggPSBmaWxlSW5wLmlkLm1hdGNoKC9Bc3QvKT8udG9TdHJpbmcoKTtcbiAgICAgICAgICBpZiAoaWRMYWJNYXRjaCAmJiBpZElucE1hdGNoKSB7XG4gICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoSW5kZXggPSAobGFiQ29udFswXSBhcyBFbGVtZW50KS5pZC5pbmRleE9mKFxuICAgICAgICAgICAgICBpZExhYk1hdGNoXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgaWRJbnBNYXRjaEluZGV4ID0gZmlsZUlucC5pZC5pbmRleE9mKGlkSW5wTWF0Y2gpO1xuICAgICAgICAgICAgY29uc3Qgc2xpY2VPbmVMYWJJZCA9IChsYWJDb250WzBdIGFzIEVsZW1lbnQpLmlkLnNsaWNlKFxuICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICBpZExhYk1hdGNoSW5kZXhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBzbGljZVR3b0lucElkID0gZmlsZUlucC5pZC5zbGljZShpZElucE1hdGNoSW5kZXgpO1xuICAgICAgICAgICAgKGxhYkNvbnRbMF0gYXMgRWxlbWVudCkuaWQgPSBzbGljZU9uZUxhYklkICsgc2xpY2VUd29JbnBJZDtcbiAgICAgICAgICAgIHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCA9IFwiVXNhciBBc3NpbmF0dXJhIERpZ2l0YWxcIjtcbiAgICAgICAgICAgIHRvRmlsZUlucEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nPy5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICBmaWxlSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PlxuICAgICAgICAgICAgICBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyhmaWxlSW5wKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiRXJybyBubyBtYXRjaCBkZSBpZHMgZG8gSW5wdXRcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChcbiAgICAgICAgICBpbnBBc3QgPz8gbnVsbCxcbiAgICAgICAgICBcImlucEFzdFwiLFxuICAgICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldGFyRm9ybXVsYXJpbyhcbiAgY2xpY2s6IE1vdXNlRXZlbnQsXG4gIHRvRmlsZUlucEJ0bnM6IEhUTUxCdXR0b25FbGVtZW50W10gfCBOb2RlTGlzdE9mPEhUTUxCdXR0b25FbGVtZW50PlxuKSB7XG4gIGlmIChcbiAgICBjbGljay50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxuICAgIGNsaWNrLnRhcmdldC50YWdOYW1lID09PSBcIkJVVFRPTlwiXG4gICkge1xuICAgIGNvbnN0IGZvcm11bGFyaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BbmFtR0lkXCIpO1xuICAgIGNvbnN0IGVkaXRhYmxlQ2l0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NpdGVbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXScpO1xuICAgIGNvbnN0IGdlbkJpcnRoUmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5CaXJ0aFJlbElkXCIpO1xuICAgIGNvbnN0IGdlblRyYW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnZW5UcmFuc0lkXCIpO1xuXG4gICAgaWYgKGZvcm11bGFyaW8gJiYgZm9ybXVsYXJpbyBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCkge1xuICAgICAgZm9ybXVsYXJpby5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJybyB2YWxpZGFuZG8gZm9ybXVsw6FyaW9cIik7XG4gICAgfVxuXG4gICAgaWYgKGVkaXRhYmxlQ2l0ZSkge1xuICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gYC0tTm9tZWA7XG4gICAgICBHbG9iYWxNb2RlbC5yZW1vdmVGaXJzdENsaWNrKGVkaXRhYmxlQ2l0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihgZWRpdGFibGVDaXRlIG7Do28gZW5jb250cmFkbyBlbSByZXNldC5gKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBnZW5CaXJ0aFJlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50IHx8XG4gICAgICBnZW5CaXJ0aFJlbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnRcbiAgICApIHtcbiAgICAgIGdlbkJpcnRoUmVsLnZhbHVlID0gXCJjaXNcIjtcbiAgICAgIGdlbkJpcnRoUmVsLmhpZGRlbiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihgZ2VuQmlydGhSZWwgbsOjbyBlbmNvbnRyYWRvIGVtIHJlc2V0LmApO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGdlblRyYW5zIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHxcbiAgICAgIGdlblRyYW5zIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudFxuICAgICkge1xuICAgICAgZ2VuVHJhbnMudmFsdWUgPSBcImF2YW5jYWRvXCI7XG4gICAgICBnZW5UcmFucy5oaWRkZW4gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oYGdlblRyYW5zIG7Do28gZW5jb250cmFkbyBlbSByZXNldC5gKTtcbiAgICB9XG5cbiAgICB0b0ZpbGVJbnBCdG5zLmZvckVhY2goKHRvRmlsZUlucEJ0bikgPT4ge1xuICAgICAgaWYgKHRvRmlsZUlucEJ0bi50ZXh0Q29udGVudCA9PT0gXCJSZXRvcm5hciDDoCBBc3NpbmF0dXJhIEVzY3JpdGFcIikge1xuICAgICAgICBjb25zdCBpbnBBc3QgPVxuICAgICAgICAgIHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImlucEFzdFwiKSB8fFxuICAgICAgICAgIHNlYXJjaFByZXZpb3VzU2libGluZ3ModG9GaWxlSW5wQnRuLCBcImltZ0FzdERpZ2l0XCIpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaW5wQXN0ICYmXG4gICAgICAgICAgKGlucEFzdCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHxcbiAgICAgICAgICAgIGlucEFzdCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGZpbGVJbnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgZmlsZUlucC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgICAgZmlsZUlucC5uYW1lID0gaW5wQXN0Lm5hbWU7XG4gICAgICAgICAgZmlsZUlucC5pZCA9IGlucEFzdC5pZDtcbiAgICAgICAgICBmaWxlSW5wLmNsYXNzTmFtZSA9IGlucEFzdC5jbGFzc05hbWU7XG4gICAgICAgICAgZmlsZUlucC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCBcIlwiKTtcbiAgICAgICAgICBpZiAoaW5wQXN0LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBsYWJDb250OiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+IHwgRWxlbWVudFtdIHwgc3RyaW5nID1cbiAgICAgICAgICAgICAgdG9GaWxlSW5wQnRuLnBhcmVudEVsZW1lbnQ/LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsYWJBc3RcIikgPz9cbiAgICAgICAgICAgICAgXCJudWxsXCI7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChsYWJDb250WzBdID09PSBcIm51bGxcIiB8fCAobGFiQ29udFswXSBhcyBFbGVtZW50KS5pZCA9PT0gXCJcIikgJiZcbiAgICAgICAgICAgICAgKHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50Py50YWdOYW1lID09PSBcIkxBQkVMXCIgfHxcbiAgICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4ucGFyZW50RWxlbWVudD8udGFnTmFtZSA9PT0gXCJTUEFOXCIpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgbGFiQ29udCA9IEFycmF5Lm9mKHRvRmlsZUlucEJ0bi5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucEFzdC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChmaWxlSW5wLCBpbnBBc3QpO1xuICAgICAgICAgICAgY29uc3QgaWRMYWJNYXRjaCA9IChsYWJDb250WzBdIGFzIEVsZW1lbnQpLmlkXG4gICAgICAgICAgICAgIC5tYXRjaCgvQXN0LylcbiAgICAgICAgICAgICAgPy50b1N0cmluZygpO1xuICAgICAgICAgICAgY29uc3QgaWRJbnBNYXRjaCA9IGZpbGVJbnAuaWQubWF0Y2goL0FzdC8pPy50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKGlkTGFiTWF0Y2ggJiYgaWRJbnBNYXRjaCkge1xuICAgICAgICAgICAgICBjb25zdCBpZExhYk1hdGNoSW5kZXggPSAobGFiQ29udFswXSBhcyBFbGVtZW50KS5pZC5pbmRleE9mKFxuICAgICAgICAgICAgICAgIGlkTGFiTWF0Y2hcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY29uc3QgaWRJbnBNYXRjaEluZGV4ID0gZmlsZUlucC5pZC5pbmRleE9mKGlkSW5wTWF0Y2gpO1xuICAgICAgICAgICAgICBjb25zdCBzbGljZU9uZUxhYklkID0gKGxhYkNvbnRbMF0gYXMgRWxlbWVudCkuaWQuc2xpY2UoXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBpZExhYk1hdGNoSW5kZXhcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY29uc3Qgc2xpY2VUd29JbnBJZCA9IGZpbGVJbnAuaWQuc2xpY2UoaWRJbnBNYXRjaEluZGV4KTtcbiAgICAgICAgICAgICAgKGxhYkNvbnRbMF0gYXMgRWxlbWVudCkuaWQgPSBzbGljZU9uZUxhYklkICsgc2xpY2VUd29JbnBJZDtcbiAgICAgICAgICAgICAgZmlsZUlucC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT5cbiAgICAgICAgICAgICAgICBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyhmaWxlSW5wKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB0b0ZpbGVJbnBCdG4udGV4dENvbnRlbnQgPSBcIlVzYXIgQXNzaW5hdHVyYSBEaWdpdGFsXCI7XG4gICAgICAgICAgICAgIHRvRmlsZUlucEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nPy5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJFcnJvIG5vIG1hdGNoIGRlIGlkcyBkbyBpbnB1dFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvIGxvY2FsaXphbmRvIFBhcmVudCBFbGVtZW50IGRlIGlucEFzdGApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgRXJybyByZWNvbmhlY2VuZG8gUHJldmlvdXMgRWxlbWVudCBTaWJsaW5nOiBpbnBBc3QgJHtPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG4gICAgICAgICAgICAgIC5jYWxsKGlucEFzdClcbiAgICAgICAgICAgICAgLnNsaWNlKDgsIC0xKX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgRXJybyB2YWxpZGFuZG8gdGFyZ2V0OiBpbnN0w6JuY2lhIGRlICR7T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuICAgICAgICAuY2FsbChjbGljay50YXJnZXQpXG4gICAgICAgIC5zbGljZSg4LCAtMSl9YFxuICAgICk7XG4gIH1cbn1cblxuLy9UT0RPIEZJTkFMSVpBUiBDT00gQ1NTXG5leHBvcnQgZnVuY3Rpb24gc3ViRm9ybSgpIHtcbiAgd2luZG93LmFsZXJ0KFxuICAgIFwiU2lzdGVtYSBhaW5kYSBuw6NvIHByb250b1xcbi4uLm1hcyB2b2PDqiB0ZXJpYSBlbnZpYWRvIGNsaWNhbmRvIGFxdWkhIDopXCJcbiAgKTtcbiAgLy8gY29uc3QgcmVxdWlyZWRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbcmVxdWlyZWRdXCIpO1xuICAvLyBpZiAocmVxdWlyZWRFbGVtZW50cykge1xuICAvLyAgIGNvbnN0IGVtcHR5RWxlbWVudHMgPSBBcnJheS5mcm9tKHJlcXVpcmVkRWxlbWVudHMpLmZpbHRlcigoZWxlbWVudCkgPT4ge1xuICAvLyAgICAgY29uc3QgdmFsdWUgPSBlbGVtZW50LnZhbHVlIHx8IGVsZW1lbnQudGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgLy8gICAgIHJldHVybiB2YWx1ZSA9PT0gXCJcIjtcbiAgLy8gICB9KTtcbiAgLy8gICBpZiAoZW1wdHlFbGVtZW50cykge1xuICAvLyAgICAgZW1wdHlFbGVtZW50cy5mb3JFYWNoKChlbXB0eUVsZW1lbnQpID0+IHtcbiAgLy8gICAgICAgY29uc29sZS5sb2coXCJFbGVtZW50byB2YXppbzogXCIsIGVtcHR5RWxlbWVudC5pZCk7XG4gIC8vICAgICAgIGVtcHR5RWxlbWVudC5zdHlsZS5ib3JkZXIgPSBcInJnYigyNTUsIDAsIDApXCI7XG4gIC8vICAgICAgIGxldCBlbXB0eUVsZW1lbnRDU3R5bGUgPSB3aW5kb3dcbiAgLy8gICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZShlbXB0eUVsZW1lbnQpXG4gIC8vICAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoXCJib3JkZXItY29sb3JcIik7XG4gIC8vICAgICAgIGxldCByZ2JhTWF0Y2ggPSBlbXB0eUVsZW1lbnRDU3R5bGUubWF0Y2gocmdiYVJlZ2V4KTtcbiAgLy8gICAgICAgaWYgKHJnYmFNYXRjaCkge1xuICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwicmdiYSBcIiArIHJnYmFNYXRjaCk7XG4gIC8vICAgICAgICAgLy8gY29uc3QgZmFkaW5nQWxlcnQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gIC8vICAgICAgICAgLy8gICBsZXQgcmdiYU1hdGNoID0gZW1wdHlFbGVtZW50Q1N0eWxlLm1hdGNoKHJnYmFSZWdleCk7XG4gIC8vICAgICAgICAgLy8gfSk7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pO1xuICAvLyAgIH1cbiAgLy8gfVxufVxuIiwiLy9uZXNzZSBmaWxlIGVzdMOjbyBwcmVzZW50ZXMgcHJpbmNpcGFsbWVudGUgYXMgZnVuw6fDtWVzIHJlbGFjaW9uYWRhcyDDoCBleGlnw6puY2lhIGRlIG1vZGVsbyB0ZXh0dWFsIGUgZGUgdmlzdWFsaXphw6fDo29cbmltcG9ydCAqIGFzIEdsb2JhbEhhbmRsZXIgZnJvbSBcIi4vZ0hhbmRsZXJzXCI7XG5pbXBvcnQgdHlwZSB7IGVudHJ5RWwsIHRleHRFbCwgZm9ybVBlcnNvbiwgdGFyZ1N0ciwgdGFyZ0VsIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IE1hbiwgV29tYW4sIE5ldXRybyB9IGZyb20gXCIuL2NsYXNzZXNcIjtcbmltcG9ydCAqIGFzIEVycm9ySGFuZGxlciBmcm9tIFwiLi9lcnJvckhhbmRsZXJcIjtcbi8vIGltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGF1dG9DYXBpdGFsaXplRmlyc3RMZXR0ZXJSZWdleCA9IC9cXGJcXHcvO1xubGV0IGlzQXV0b2NvcnJlY3RPbiA9IHRydWU7XG5cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJMaW1pdChpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgbGV0IG51bWJlclZhbHVlID0gaW5wdXRFbGVtZW50LnZhbHVlO1xuICBjb25zdCBudW1iZXJWYWx1ZUludCA9IHBhcnNlSW50KG51bWJlclZhbHVlKTtcbiAgY29uc3QgaXNBdGl2RmlzID0gaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImlucEF0aXZGaXNcIik7XG4gIGNvbnN0IGlzQWxpbVJvdCA9IGlucHV0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBBbGltUm90XCIpO1xuICBjb25zdCBpc0xvY051bSA9IGlucHV0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBMb2NOdW1cIik7XG4gIGNvbnN0IGlzREREID0gaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImlucERERFwiKTtcbiAgY29uc3QgaXNGbG9hdCA9IGlucHV0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJmbG9hdFwiKTtcbiAgY29uc3QgaXNGcmVxID0gaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImZyZXFJbnBMaXN0XCIpO1xuXG4gIGlmICgoaXNBdGl2RmlzIHx8IGlzQWxpbVJvdCB8fCBpc0xvY051bSB8fCBpc0RERCB8fCBpc0ZyZXEpICYmICFpc0Zsb2F0KSB7XG4gICAgaWYgKG51bWJlclZhbHVlLm1hdGNoKC9bPS4sO34vfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dL2cpKSB7XG4gICAgICBjb25zdCB3cm9uZ01hdGNoID0gbnVtYmVyVmFsdWUubWF0Y2goXG4gICAgICAgIC9bPS4sO34vfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dL2dcbiAgICAgICk7XG4gICAgICBjb25zdCB3cm9uZ01hdGNoSW5kZXggPSBudW1iZXJWYWx1ZS5pbmRleE9mKHdyb25nTWF0Y2g/LlswXSA/PyBcIlwiKTtcbiAgICAgIGNvbnN0IHNsaWNlZFZhbHVlID0gbnVtYmVyVmFsdWUuc2xpY2UoMCwgd3JvbmdNYXRjaEluZGV4KTtcbiAgICAgIGNvbnN0IGFmdGVyU2xpY2UgPSBudW1iZXJWYWx1ZS5zbGljZSh3cm9uZ01hdGNoSW5kZXggKyAxKTtcbiAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IHNsaWNlZFZhbHVlICsgYWZ0ZXJTbGljZTtcbiAgICB9XG4gICAgY29uc3QgbWF4TGVuZ3RoID0gMjtcbiAgICBjb25zdCBtYXhJbnB1dCA9IGlucHV0RWxlbWVudC5pZC5lbmRzV2l0aChcIk1heFwiKTtcbiAgICBpZiAobnVtYmVyVmFsdWVJbnQgPCAxICYmIG1heElucHV0KSB7XG4gICAgICBjb25zdCBpbnBWYWx1ZUFycmF5ID0gQXJyYXkuZnJvbShpbnB1dEVsZW1lbnQudmFsdWUpO1xuICAgICAgaW5wVmFsdWVBcnJheS5zcGxpY2UoMCwgMSwgXCIxXCIpO1xuICAgICAgY29uc3QgZml4ZWRJbnBWYWx1ZWlucFZhbHVlQXJyYXkgPSBpbnBWYWx1ZUFycmF5LnRvU3RyaW5nKCk7XG4gICAgICBpbnB1dEVsZW1lbnQudmFsdWUgPSBmaXhlZElucFZhbHVlaW5wVmFsdWVBcnJheTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoaXNBdGl2RmlzIHx8IGlzQWxpbVJvdCB8fCBpc0RERCB8fCBpc0ZyZXEpICYmXG4gICAgICBudW1iZXJWYWx1ZS5sZW5ndGggPiBtYXhMZW5ndGhcbiAgICApIHtcbiAgICAgIG51bWJlclZhbHVlID0gbnVtYmVyVmFsdWUuc2xpY2UoMCwgbWF4TGVuZ3RoKTtcbiAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IG51bWJlclZhbHVlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTmVnYXRpdmVzKHRhYklucDogRWxlbWVudCkge1xuICBsZXQgcGFyc2VkSW5wVmFsdWUgPSAwO1xuICBpZiAodGFiSW5wIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgIHBhcnNlZElucFZhbHVlID0gcGFyc2VGbG9hdCh0YWJJbnAudmFsdWUpO1xuICAgIC8vIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VkSW5wVmFsdWUpIHx8IHBhcnNlZElucFZhbHVlIDwgMCkge1xuICAgIC8vICAgcGFyc2VkSW5wVmFsdWUgPSAwO1xuICAgIC8vIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgIEVycm9ySGFuZGxlci5pbnB1dE5vdEZvdW5kKHRhYklucCA/PyBudWxsLCBcInRhYklucFwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XG4gIH1cbiAgcmV0dXJuIHBhcnNlZElucFZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbmZ1bmN0aW9uIGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoXG4gIGlzQ3Vyc29yQXV0b01vdmVkOiBib29sZWFuLFxuICBpc1VuZG9VcHBlcmNhc2U6IGJvb2xlYW4sXG4gIG1hdGNoOiBzdHJpbmcgfCBudWxsLFxuICB0ZXh0RWxlbWVudDogRWxlbWVudFxuKSB7XG4gIGxldCB0ZXh0ID0gKHRleHRFbGVtZW50IGFzIGVudHJ5RWwpLnZhbHVlIHx8IHRleHRFbGVtZW50LnRleHRDb250ZW50IHx8IG51bGw7XG4gIGxldCBpc0ZpeEFmdGVyREN1cnNvckV4ZWMgPSBmYWxzZTtcblxuICBpZiAoaXNGaXhBZnRlckRDdXJzb3JFeGVjKSByZXR1cm47XG4gIGNvbnN0IHNlbGVjdGlvblBvc2l0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpPy5nZXRSYW5nZUF0KDApLnN0YXJ0T2Zmc2V0O1xuICB0ZXh0ID0gd3JvbmdTdGFydENvcnJlY3Rpb24odGV4dCwgbWF0Y2gpO1xuICB0ZXh0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGZpeG1vdmUpID0+IHtcbiAgICBjb25zdCBrZXlib2FyZEV2ZW50ID0gZml4bW92ZSBhcyBLZXlib2FyZEV2ZW50O1xuICAgIGlmIChzZWxlY3Rpb25Qb3NpdGlvbiA9PT0gMCB8fCBzZWxlY3Rpb25Qb3NpdGlvbiA9PT0gdGV4dD8ubGVuZ3RoIHx8IDApIHtcbiAgICAgIGlmIChcbiAgICAgICAga2V5Ym9hcmRFdmVudC5rZXkgPT09IFwiIFwiIHx8XG4gICAgICAgIGtleWJvYXJkRXZlbnQua2V5ID09PSBcIkJhY2tzcGFjZVwiIHx8XG4gICAgICAgIChrZXlib2FyZEV2ZW50LmtleSA+PSBcIkFycm93TGVmdFwiICYmXG4gICAgICAgICAga2V5Ym9hcmRFdmVudC5rZXkgPD0gXCJBcnJvd0Rvd25cIikgfHxcbiAgICAgICAgKGtleWJvYXJkRXZlbnQua2V5ID49IFwiYVwiICYmIGtleWJvYXJkRXZlbnQua2V5IDw9IFwielwiKSB8fFxuICAgICAgICAoa2V5Ym9hcmRFdmVudC5rZXkgPj0gXCJBXCIgJiYga2V5Ym9hcmRFdmVudC5rZXkgPD0gXCJaXCIpIHx8XG4gICAgICAgIGlzVW5kb1VwcGVyY2FzZVxuICAgICAgKSB7XG4gICAgICAgIGlmICghaXNGaXhBZnRlckRDdXJzb3JFeGVjKSB7XG4gICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoXG4gICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcbiAgICAgICAgICAgIHRleHRFbGVtZW50XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBrZXlib2FyZEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlzRml4QWZ0ZXJEQ3Vyc29yRXhlYyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIFt0ZXh0LCBpc0N1cnNvckF1dG9Nb3ZlZF07XG59XG5cbmZ1bmN0aW9uIHdyb25nU3RhcnRDb3JyZWN0aW9uKFxuICB0ZXh0OiBzdHJpbmcgfCBudWxsLFxuICB3cm9uZ1N0YXJ0TWF0Y2g6IHN0cmluZyB8IG51bGxcbikge1xuICBsZXQgZml4ZWRUZXh0ID0gdGV4dDtcbiAgaWYgKHdyb25nU3RhcnRNYXRjaCAmJiB0ZXh0KSB7XG4gICAgY29uc3Qgd3JvbmdTdGFydExlbmd0aCA9IHdyb25nU3RhcnRNYXRjaFxuICAgICAgLnRvU3RyaW5nKClcbiAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKS5sZW5ndGg7XG4gICAgY29uc3QgYWRkRXJhc2VkQ2hhciA9IHRleHQuc2xpY2UoMCwgd3JvbmdTdGFydExlbmd0aCAtIDEpO1xuICAgIGNvbnN0IGZpeGVkU3RhcnQgPSB0ZXh0LnNsaWNlKHdyb25nU3RhcnRMZW5ndGggLSAxKTtcbiAgICBmaXhlZFRleHQgPSBmaXhlZFN0YXJ0ICsgYWRkRXJhc2VkQ2hhcjtcbiAgfVxuICByZXR1cm4gZml4ZWRUZXh0O1xufVxuXG5mdW5jdGlvbiBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQ6IGJvb2xlYW4sIHRleHRFbGVtZW50OiBFbGVtZW50KSB7XG4gIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uICYmICFpc0N1cnNvckF1dG9Nb3ZlZCkge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGV4dEVsZW1lbnQpO1xuICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgc2VsPy5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICBzZWw/LmFkZFJhbmdlKHJhbmdlKTtcbiAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBmYWxzZTtcbiAgfVxuICByZXR1cm4gaXNDdXJzb3JBdXRvTW92ZWQ7XG59XG5cbmZ1bmN0aW9uIGZpeEN1cnNvclBvc2l0aW9uKFxuICB0ZXh0RWxlbWVudDogRWxlbWVudCxcbiAgcmFuZ2U6IFJhbmdlLFxuICBzZWxlY3Rpb246IFNlbGVjdGlvbiB8IG51bGwsXG4gIHNob3VsZFNldEVuZDogYm9vbGVhblxuKSB7XG4gIHJhbmdlLnNldFN0YXJ0KHRleHRFbGVtZW50LCAwKTtcbiAgaWYgKHNob3VsZFNldEVuZCA9PT0gdHJ1ZSkge1xuICAgIHJhbmdlLnNldEVuZCh0ZXh0RWxlbWVudCwgMSk7XG4gIH1cbiAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gIHNlbGVjdGlvbj8ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHNlbGVjdGlvbj8uYWRkUmFuZ2UocmFuZ2UpO1xufVxuXG5mdW5jdGlvbiBmaXhGaXJzdExldHRlcihcbiAgZnN0TGV0OiBzdHJpbmcsXG4gIHJlZ2V4OiBSZWdFeHAsXG4gIHRleHRFbGVtZW50OiBFbGVtZW50LFxuICByYW5nZTogUmFuZ2UsXG4gIHNlbGVjdGlvbjogU2VsZWN0aW9uIHwgbnVsbCxcbiAgc2hvdWxkU2V0RW5kOiBib29sZWFuXG4pIHtcbiAgbGV0IGNvbnRUZXh0ID1cbiAgICAodGV4dEVsZW1lbnQgYXMgZW50cnlFbCkudmFsdWUgfHwgdGV4dEVsZW1lbnQudGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgY29uc3QgZmlyc3RMZXR0ZXJNYXRjaCA9IGZzdExldD8ubWF0Y2gocmVnZXgpO1xuICBpZiAoZmlyc3RMZXR0ZXJNYXRjaCkge1xuICAgIGNvbnN0IGNhcGl0YWxpemVkRmlyc3RMZXR0ZXIgPSBmc3RMZXQ/LnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3QgbmV4dExldHRlcnMgPSBjb250VGV4dC5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKTtcbiAgICBjb250VGV4dCA9IGNhcGl0YWxpemVkRmlyc3RMZXR0ZXIgKyBuZXh0TGV0dGVycztcblxuICAgIGNvbnN0IGZpcnN0TGV0dGVyTWF0Y2ggPSBmc3RMZXQ/Lm1hdGNoKHJlZ2V4KTtcbiAgICBpZiAoZmlyc3RMZXR0ZXJNYXRjaCkge1xuICAgICAgaWYgKHJhbmdlLmVuZE9mZnNldCA+PSAxKSB7XG4gICAgICAgIGZpeEN1cnNvclBvc2l0aW9uKHRleHRFbGVtZW50LCByYW5nZSwgc2VsZWN0aW9uLCBzaG91bGRTZXRFbmQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29udFRleHQ7XG59XG5cbmZ1bmN0aW9uIGZpeFdyb25nU3RhcnRzKHRleHQ6IHRhcmdTdHIsIG1hdGNoOiB0YXJnU3RyLCBsZW5ndGg6IG51bWJlcikge1xuICBsZXQgZml4ZWRTdHIgPSB0ZXh0ID8/IFwiXCI7XG4gIGlmICh0ZXh0ICYmIG1hdGNoKSB7XG4gICAgY29uc3Qgd3JvbmdDaGFySW5kZXggPSB0ZXh0LmluZGV4T2YobWF0Y2gpO1xuICAgIGNvbnN0IGFyclRleHQgPSBBcnJheS5mcm9tKHRleHQpO1xuICAgIGFyclRleHQuc3BsaWNlKHdyb25nQ2hhckluZGV4LCBsZW5ndGgsIFwiXCIpO1xuICAgIGZpeGVkU3RyID0gYXJyVGV4dC50b1N0cmluZygpLnJlcGxhY2VBbGwoXCIsXCIsIFwiXCIpO1xuICB9XG4gIHJldHVybiBmaXhlZFN0cjtcbn1cblxuZnVuY3Rpb24gZml4TmV4dFdvcmRzSW5pTm90RChyZW1hZGVUZXh0OiBzdHJpbmcsIGxldE1hdGNoOiBzdHJpbmcpIHtcbiAgaWYgKHJlbWFkZVRleHQpIHtcbiAgICBjb25zdCBnTGV0TWF0Y2hJID0gcmVtYWRlVGV4dC5sYXN0SW5kZXhPZihsZXRNYXRjaCkgKyAxO1xuICAgIGNvbnN0IGFjdENoYXIgPSByZW1hZGVUZXh0LmNoYXJBdChnTGV0TWF0Y2hJKTtcbiAgICBjb25zdCBjYXBDaGFyID0gYWN0Q2hhci50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IGFyclRleHQgPSBBcnJheS5mcm9tKHJlbWFkZVRleHQpO1xuICAgIGFyclRleHRbZ0xldE1hdGNoSV0gPSBjYXBDaGFyO1xuICAgIHJlbWFkZVRleHQgPSBhcnJUZXh0LnRvU3RyaW5nKCkucmVwbGFjZUFsbChcIixcIiwgXCJcIik7XG4gICAgaWYgKHJlbWFkZVRleHQubWF0Y2goL15cXHNbXFx3XSsvZykpIHtcbiAgICAgIGNvbnN0IHJlbW92U3BhY2VUZXh0ID0gcmVtYWRlVGV4dC5zbGljZSgxLCByZW1hZGVUZXh0Lmxlbmd0aCk7XG4gICAgICByZW1hZGVUZXh0ID0gcmVtb3ZTcGFjZVRleHQgKyBcIiBcIjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVtYWRlVGV4dCA9IFwiXCI7XG4gIH1cbiAgcmV0dXJuIHJlbWFkZVRleHQ7XG59XG5cbmZ1bmN0aW9uIGZpeE5leHRXb3Jkc0FmdGVyRChyZW1hZGVUZXh0OiBzdHJpbmcsIGxldE1hdGNoOiBzdHJpbmcpIHtcbiAgY29uc3QgZ2xvYmFsTGV0dGVyTWF0Y2hJbmRleEQgPSByZW1hZGVUZXh0XG4gICAgPyByZW1hZGVUZXh0Lmxhc3RJbmRleE9mKGxldE1hdGNoKSArIDFcbiAgICA6IHVuZGVmaW5lZDtcbiAgaWYgKGdsb2JhbExldHRlck1hdGNoSW5kZXhEKSB7XG4gICAgY29uc3QgYWN0dWFsQ2hhckQgPSByZW1hZGVUZXh0Py5jaGFyQXQoZ2xvYmFsTGV0dGVyTWF0Y2hJbmRleEQpO1xuICAgIGNvbnN0IGNhcGl0YWxpemVkQ2hhckQgPSBhY3R1YWxDaGFyRD8udG9VcHBlckNhc2UoKTtcbiAgICBpZiAocmVtYWRlVGV4dCAmJiBjYXBpdGFsaXplZENoYXJEKSB7XG4gICAgICBjb25zdCBjaXRlVGV4dEFycmF5RCA9IEFycmF5LmZyb20ocmVtYWRlVGV4dCk7XG4gICAgICBjaXRlVGV4dEFycmF5RFtnbG9iYWxMZXR0ZXJNYXRjaEluZGV4RF0gPSBjYXBpdGFsaXplZENoYXJEO1xuICAgICAgcmVtYWRlVGV4dCA9IGNpdGVUZXh0QXJyYXlELnRvU3RyaW5nKCkucmVwbGFjZUFsbChcIixcIiwgXCJcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiByZW1hZGVUZXh0O1xufVxuXG5mdW5jdGlvbiBmaXhVbnByb3BlclVwcGVyY2FzZXMoXG4gIHRleHQ6IHN0cmluZyxcbiAgbWF0Y2g6IHN0cmluZyxcbiAgY29udGV4dDogc3RyaW5nIHwgbnVtYmVyXG4pIHtcbiAgY29uc3Qgc3BhY2VSZWdleCA9IC9cXHMvZztcbiAgY29uc3Qgc3BhY2VNYXRjaGVzID0gdGV4dC5tYXRjaChzcGFjZVJlZ2V4KTtcbiAgY29uc3QgdXBwZXJDYXNlc1JlcGV0aXRpb25zSW5kZXggPSB0ZXh0LmluZGV4T2YobWF0Y2gpO1xuICBjb25zdCByZXBlYXRlZExldHRlciA9IG1hdGNoLnNsaWNlKDAsIDEpO1xuICBjb25zdCB0ZXh0QmVmb3JlUmVwZXRpdGlvbnMgPSB0ZXh0LnN1YnN0cmluZygwLCB1cHBlckNhc2VzUmVwZXRpdGlvbnNJbmRleCk7XG4gIGxldCBhZGRBY3VtdWxhdG9yID0gMDtcbiAgbGV0IGxvd2VyZWRSZXBldGl0aW9ucyA9IFwiXCI7XG5cbiAgbG93ZXJlZFJlcGV0aXRpb25zID0gbWF0Y2gudG9Mb3dlckNhc2UoKS5zbGljZSgxKTtcbiAgaWYgKHNwYWNlTWF0Y2hlcykge1xuICAgIGlmIChcbiAgICAgIGNvbnRleHQgPT09IFwiTm9EXCIgfHxcbiAgICAgIGNvbnRleHQgPT09IFwiWWVzRENvbnRcIiB8fFxuICAgICAgY29udGV4dCA9PSAwIHx8XG4gICAgICBjb250ZXh0ID09PSAyIHx8XG4gICAgICAhY29udGV4dFxuICAgICkge1xuICAgICAgaWYgKGNvbnRleHQgPT09IFwiWWVzRENvbnRcIiB8fCBjb250ZXh0ID09PSAyKSB7XG4gICAgICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleCA9IC9bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdL2c7XG4gICAgICAgIGNvbnN0IGxvd2VyY2FzZXNNYXRjaGVzID0gdGV4dC5tYXRjaChsb3dlcmNhc2VzUmVnZXgpO1xuICAgICAgICBpZiAobG93ZXJjYXNlc01hdGNoZXMpIHtcbiAgICAgICAgICBjb25zdCBudW1Mb3dlcmNhc2VzID0gbG93ZXJjYXNlc01hdGNoZXMubGVuZ3RoO1xuICAgICAgICAgIGFkZEFjdW11bGF0b3IgKz0gbnVtTG93ZXJjYXNlcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgbnVtU3BhY2VzID0gc3BhY2VNYXRjaGVzLmxlbmd0aDtcbiAgICAgIGFkZEFjdW11bGF0b3IgKz0gbnVtU3BhY2VzO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dCA9PT0gXCJZZXNEVmFsXCIgfHwgY29udGV4dCA9PT0gMSkge1xuICAgICAgYWRkQWN1bXVsYXRvciA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYENvbnRleHQgdmFsdWUgbm90IHN1aXRhYmxlYCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHRleHRBZnRlclJlcGV0aXRpb25zID0gdGV4dC5zbGljZShcbiAgICB1cHBlckNhc2VzUmVwZXRpdGlvbnNJbmRleCArIDEgKyBsb3dlcmVkUmVwZXRpdGlvbnMubGVuZ3RoIC0gYWRkQWN1bXVsYXRvcixcbiAgICB0ZXh0Lmxlbmd0aCArIDFcbiAgKTtcbiAgY29uc3QgdGV4dEFycmF5ID0gQXJyYXkuZnJvbSh0ZXh0KTtcbiAgdGV4dEFycmF5LnNwbGljZShcbiAgICB1cHBlckNhc2VzUmVwZXRpdGlvbnNJbmRleCArIDEsXG4gICAgbG93ZXJlZFJlcGV0aXRpb25zLmxlbmd0aCxcbiAgICBsb3dlcmVkUmVwZXRpdGlvbnNcbiAgKTtcbiAgaWYgKGNvbnRleHQgPT09IFwiTm9EXCIgfHwgY29udGV4dCA9PSAwIHx8ICFjb250ZXh0KSB7XG4gICAgdGV4dCA9XG4gICAgICB0ZXh0QmVmb3JlUmVwZXRpdGlvbnMgK1xuICAgICAgcmVwZWF0ZWRMZXR0ZXIgK1xuICAgICAgbG93ZXJlZFJlcGV0aXRpb25zICtcbiAgICAgIHRleHRBZnRlclJlcGV0aXRpb25zO1xuICB9IGVsc2UgaWYgKGNvbnRleHQgPT09IFwiWWVzRFZhbFwiKSB7XG4gICAgY29uc3QgdXBwZXJsb3dlcmNvbWJEID0gdGV4dC5tYXRjaCgvRFthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bc1NdP1tcXHNdLyk7XG4gICAgaWYgKHVwcGVybG93ZXJjb21iRCkge1xuICAgICAgaWYgKHVwcGVybG93ZXJjb21iRC5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgY29uc3QgbG93ZXJlZFMgPSB1cHBlcmxvd2VyY29tYkQudG9TdHJpbmcoKS5yZXBsYWNlKC9TLywgXCJzXCIpO1xuICAgICAgICBsb3dlcmVkUmVwZXRpdGlvbnMgKz0gbG93ZXJlZFM7XG4gICAgICB9XG4gICAgfVxuICAgIHRleHQgPSB0ZXh0QmVmb3JlUmVwZXRpdGlvbnMgKyBsb3dlcmVkUmVwZXRpdGlvbnMgKyB0ZXh0QWZ0ZXJSZXBldGl0aW9ucztcbiAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBcIlllc0RDb250XCIpIHtcbiAgICBjb25zdCBtdWx0aXBsZUNvbmpGaXggPVxuICAgICAgL0RbYWVpb3XDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bc11cXHNbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdezMsfS87XG4gICAgY29uc3QgbXVsdGlwbGVDb25qRml4TWF0Y2ggPSB0ZXh0Lm1hdGNoKG11bHRpcGxlQ29uakZpeCk7XG4gICAgaWYgKG11bHRpcGxlQ29uakZpeE1hdGNoKSB7XG4gICAgICB0ZXh0ID1cbiAgICAgICAgdGV4dEJlZm9yZVJlcGV0aXRpb25zICsgbG93ZXJlZFJlcGV0aXRpb25zICsgXCJTXCIgKyB0ZXh0QWZ0ZXJSZXBldGl0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgdGV4dCA9IHRleHRCZWZvcmVSZXBldGl0aW9ucyArIGxvd2VyZWRSZXBldGl0aW9ucyArIHRleHRBZnRlclJlcGV0aXRpb25zO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKGBDb250ZXh0IHZhbHVlIG5vdCBzdWl0YWJsZWApO1xuICB9XG4gIHJldHVybiB0ZXh0O1xufVxuXG5mdW5jdGlvbiBmaXhGb3JjZWRVcHBlckNhc2UoXG4gIHRleHRFbGVtZW50OiBFbGVtZW50LFxuICB3b3JkTWF0Y2g6IHN0cmluZ1tdLFxuICB3TWF0Y2hJdGVyYXRpb246IFJlZ0V4cE1hdGNoQXJyYXkgfCBzdHJpbmdcbikge1xuICBsZXQgdGV4dCA9ICh0ZXh0RWxlbWVudCBhcyB0ZXh0RWwpLnZhbHVlIHx8IHRleHRFbGVtZW50LnRleHRDb250ZW50IHx8IFwiXCI7XG4gIGNvbnN0IHN0ckRsb3dlcmNhc2UgPSB3TWF0Y2hJdGVyYXRpb24udG9TdHJpbmcoKTtcbiAgY29uc3QgRFVwcGVyY2FzZWQgPSBzdHJEbG93ZXJjYXNlLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xuICBpZiAoRFVwcGVyY2FzZWQpIHtcbiAgICBjb25zdCBzdHJEQWZ0ZXIgPVxuICAgICAgc3RyRGxvd2VyY2FzZS5zdWJzdHJpbmcoMCwgMSkgKyBEVXBwZXJjYXNlZCArIHN0ckRsb3dlcmNhc2Uuc3Vic3RyaW5nKDIpO1xuICAgIGNvbnN0IHN0ckRBZnRlck1pbnVzSW5kID0gKHRleHQ/Lmxlbmd0aCA/PyAwKSAtIHN0ckRBZnRlci5sZW5ndGg7XG4gICAgY29uc3Qgb3Bwb3NpdGVTbGljZWRDaXRlID0gdGV4dD8uc2xpY2Uoc3RyREFmdGVyTWludXNJbmQpO1xuICAgIGNvbnN0IHN0YXJ0U2xpY2VkQ2l0ZSA9IHRleHQ/LnNsaWNlKDAsIHN0ckRBZnRlck1pbnVzSW5kKTtcbiAgICBpZiAod29yZE1hdGNoLmxlbmd0aCA+PSAxICYmIHN0YXJ0U2xpY2VkQ2l0ZSlcbiAgICAgIHRleHQgPSBzdGFydFNsaWNlZENpdGUgKyBvcHBvc2l0ZVNsaWNlZENpdGU7XG4gIH1cbiAgcmV0dXJuIHRleHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdXRvQ2FwaXRhbGl6ZUlucHV0cyh0ZXh0RWxlbWVudDogZW50cnlFbCkge1xuICBsZXQgdGV4dCA9IHRleHRFbGVtZW50Py52YWx1ZSA/PyBudWxsO1xuICBpZiAoaXNBdXRvY29ycmVjdE9uICYmIHRleHQpIHtcbiAgICAvL2luaWNpYWxpemHDp8OjbyBkZSBleHByZXNzw7VlcyByZWdleCBjb20gc2V1cyBvYmpldG9zIGUgbWF0Y2hlcyBhc3NvY2lhZG9zXG4gICAgY29uc3QgbmV3V29yZE1hdGNoZXMgPSB0ZXh0Lm1hdGNoKFxuICAgICAgL1xcc1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0/W2EtekEtWsOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8w4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1xccz9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdP1thLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXSovZ1xuICAgICk7XG4gICAgY29uc3QgbGV0dGVyTWF0Y2hlc0luaU5vdEQgPSB0ZXh0Lm1hdGNoKC9cXHNbXmRdL2cpO1xuICAgIGNvbnN0IGxldHRlck1hdGNoZXNJbmlEID0gdGV4dC5tYXRjaCgvXFxzZC9nKTtcbiAgICBjb25zdCBub3RNYXRjaGVzQWZ0ZXJEUmVnZXggPVxuICAgICAgL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU10/XFxzL2c7XG4gICAgbGV0IGxldHRlck5vdE1hdGNoZXNBZnRlckQgPSB0ZXh0Lm1hdGNoKG5vdE1hdGNoZXNBZnRlckRSZWdleCkgPz8gW107XG4gICAgY29uc3QgYWZ0ZXJEUmVnZXhPcDEgPVxuICAgICAgL1xcc2RbXmFlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEFFSU/DgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZztcbiAgICBjb25zdCBhZnRlckRSZWdleE9wMiA9XG4gICAgICAvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW15zU1xcc10vZztcbiAgICBjb25zdCBhZnRlckRSZWdleE9wMyA9XG4gICAgICAvXFxzZFthZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW3NTXVthLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS9nO1xuICAgIGNvbnN0IGxldHRlck1hdGNoZXNBZnRlckRPcDEgPSB0ZXh0Lm1hdGNoKGFmdGVyRFJlZ2V4T3AxKTtcbiAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyID0gdGV4dC5tYXRjaChhZnRlckRSZWdleE9wMik7XG4gICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyA9IHRleHQubWF0Y2goYWZ0ZXJEUmVnZXhPcDMpO1xuICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleCA9IC9bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdL2c7XG4gICAgY29uc3QgbG93ZXJjYXNlc1JlZ2V4T2JqID0gbmV3IFJlZ0V4cChsb3dlcmNhc2VzUmVnZXgpO1xuICAgIGNvbnN0IHVwcGVyY2FzZXNSZWdleCA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdLztcbiAgICBjb25zdCB1cHBlcmNhc2VzUmVnZXhPYmogPSBuZXcgUmVnRXhwKHVwcGVyY2FzZXNSZWdleCk7XG4gICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzUmVnZXggPSAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXXsyLH0vZztcbiAgICBjb25zdCBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzID0gdGV4dC5tYXRjaChtdWx0aXBsZVVwcGVyY2FzZXNSZWdleCk7XG4gICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzUmVnZXgyID0gL0RbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW1NdXFxzL2c7XG4gICAgY29uc3QgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlczIgPSB0ZXh0Lm1hdGNoKG11bHRpcGxlVXBwZXJjYXNlc1JlZ2V4Mik7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDEgPVxuICAgICAgL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1cXGIvZztcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AxID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMSk7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDIgPVxuICAgICAgL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nO1xuICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDIgPSB0ZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AyKTtcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMyA9XG4gICAgICAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdezIsM31cXGIvZztcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AzID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMyk7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDQgPVxuICAgICAgL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2c7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNCA9IHRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDQpO1xuICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A1ID1cbiAgICAgIC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XXsxLDJ9W0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1xcYi9nO1xuICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDUgPSB0ZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A1KTtcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNiA9XG4gICAgICAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1xcYi9nO1xuICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDYgPSB0ZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A2KTtcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNyA9IC9EW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU10vZztcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A3ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNyk7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDggPSAvRFtBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW15zU10vZztcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A4ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wOCk7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDkgPVxuICAgICAgL0RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU11cXHMvZztcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A5ID0gdGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wOSk7XG4gICAgY29uc3Qgd3JvbmdTdGFydFJlZ2V4ID1cbiAgICAgIC9eW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdLztcbiAgICBjb25zdCB3cm9uZ1N0YXJ0TWF0Y2ggPSB0ZXh0Lm1hdGNoKHdyb25nU3RhcnRSZWdleCk/LnRvU3RyaW5nKCkgPz8gbnVsbDtcbiAgICBjb25zdCB3cm9uZ0NoYXJzUmVnZXhPcDEgPVxuICAgICAgL1tcXHNdKltcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXStbXFxzXSpbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0qL2c7XG4gICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDEgPSB0ZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMSk7XG4gICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AyID0gLyRbXFxkXFxuLDsuK1xcLT1+XFxcXC98XCIhQCMkJSYqwqzCsMKqwrrCp8K5wrLCs8KjwqIoKXt9W1xcXV0rL2c7XG4gICAgY29uc3Qgd3JvbmdDaGFyc01hdGNoZXNPcDIgPSB0ZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMik7XG4gICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AzID1cbiAgICAgIC8oPzw9XFxzZEQpW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xuICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AzID0gdGV4dC5tYXRjaCh3cm9uZ0NoYXJzUmVnZXhPcDMpO1xuXG4gICAgLy9pbmljaWFsaXphw6fDo28gZGUgb3V0cmFzIHZhcmnDoXZlaXNcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIGxldCByZW1hZGVUZXh0ID0gdGV4dDtcbiAgICBsZXQgaXNVbmRvVXBwZXJjYXNlID0gZmFsc2U7XG4gICAgbGV0IGlzQ3Vyc29yQXV0b01vdmVkID0gZmFsc2U7XG5cbiAgICBpZiAodGV4dC5sZW5ndGggPT09IDEgJiYgIW5ld1dvcmRNYXRjaGVzKSB7XG4gICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IGZpeEZpcnN0TGV0dGVyKFxuICAgICAgICB0ZXh0WzBdLFxuICAgICAgICBhdXRvQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyUmVnZXgsXG4gICAgICAgIHRleHRFbGVtZW50LFxuICAgICAgICByYW5nZSxcbiAgICAgICAgc2VsZWN0aW9uLFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHRleHQubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKFxuICAgICAgICB0ZXh0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnBBc3RcIikgfHxcbiAgICAgICAgdGV4dEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5wSWRlbnRpZlwiKVxuICAgICAgKSB7XG4gICAgICAgIC8vSUlGRSBwYXJhIGVuY2Fwc3VsYXIgY29ycmXDp8OjbyBkZSBpbsOtY2lvcyBpbmNvcnJldG9zIGRlIGVudHJhZGFcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMSB8fFxuICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXNPcDIgfHxcbiAgICAgICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzT3AzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlcyA9IFtcbiAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AxIHx8IFtdKSxcbiAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AyIHx8IFtdKSxcbiAgICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AzIHx8IFtdKSxcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGlXID0gMDsgaVcgPCB3cm9uZ0NoYXJzTWF0Y2hlcy5sZW5ndGg7IGlXKyspIHtcbiAgICAgICAgICAgICAgY29uc3Qgd3JvbmdDaGFyTGVuZ3RoID0gd3JvbmdDaGFyc01hdGNoZXNbaVddLmxlbmd0aDtcbiAgICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXMuZm9yRWFjaCgod3JvbmdDaGFyTWF0Y2gpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IGZpeFdyb25nU3RhcnRzKFxuICAgICAgICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgICAgICAgIHdyb25nQ2hhck1hdGNoLFxuICAgICAgICAgICAgICAgICAgd3JvbmdDaGFyTGVuZ3RoXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3JkcyhcbiAgICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxuICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlLFxuICAgICAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxuICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGlmICh3cm9uZ1N0YXJ0TWF0Y2gpIHtcbiAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9XG4gICAgICAgICAgICB3cm9uZ1N0YXJ0Q29ycmVjdGlvbih0ZXh0RWxlbWVudC52YWx1ZSwgd3JvbmdTdGFydE1hdGNoKSA/PyBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdXb3JkTWF0Y2hlcykge1xuICAgICAgICAgIG5ld1dvcmRNYXRjaGVzLmZvckVhY2goKCkgPT4ge1xuICAgICAgICAgICAgLy9JSUZFIHBhcmEgY2FwaXRhbGl6YXIgcGFsYXZyYXMgYXDDs3MgYSBwcmltZWlyYVxuICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGxldHRlck1hdGNoZXNJbmlOb3REICYmICFsZXR0ZXJNYXRjaGVzSW5pRCkge1xuICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNJbmlOb3RELmZvckVhY2goKGxldHRlck1hdGNoKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZW1hZGVUZXh0ID0gZml4TmV4dFdvcmRzSW5pTm90RChyZW1hZGVUZXh0LCBsZXR0ZXJNYXRjaCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSByZW1hZGVUZXh0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxuICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXG4gICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UsXG4gICAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXG4gICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgW3RleHRFbGVtZW50LnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBhcnJDb3JyZWN0Q3Vyc29yO1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID1cbiAgICAgICAgICAgICAgICAgIHdyb25nU3RhcnRDb3JyZWN0aW9uKHRleHRFbGVtZW50LnZhbHVlLCB3cm9uZ1N0YXJ0TWF0Y2gpID8/XG4gICAgICAgICAgICAgICAgICBcIlwiO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzSW5pTm90RCAmJiBsZXR0ZXJNYXRjaGVzSW5pRCkgfHxcbiAgICAgICAgICAgICAgICAoIWxldHRlck1hdGNoZXNJbmlOb3REICYmIGxldHRlck1hdGNoZXNJbmlEKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjb3JyZcOnw6NvIGZvY2FkYSBlbSBjb25qdW7Dp8OjbyBjb20gRFxuICAgICAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgbGV0dGVyTWF0Y2hlc0FmdGVyRDogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxuICAgICAgICAgICAgICAgICAgICAobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxuICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcbiAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzKVxuICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHwgW10pLFxuICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXG4gICAgICAgICAgICAgICAgICAgICEoXG4gICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxuICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcbiAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJiBsZXR0ZXJNYXRjaGVzSW5pTm90RCkge1xuICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbLi4uKGxldHRlck1hdGNoZXNJbmlOb3REIHx8IFtdKV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcbiAgICAgICAgICAgICAgICAgICAgKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcbiAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XG4gICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fFxuICAgICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNJbmlOb3REKVxuICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHwgW10pLFxuICAgICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjYXBpdGFsaXphw6fDo28gZm9jYWRhIGVtIGluaWNpYWlzIERcbiAgICAgICAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQ/LmZvckVhY2goKGxldHRlck1hdGNoRCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJlbWFkZVRleHQgPSBmaXhOZXh0V29yZHNBZnRlckQocmVtYWRlVGV4dCwgbGV0dGVyTWF0Y2hEKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID0gcmVtYWRlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlDaGVja0xvd2VyQ2FzZXNEID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID8/IFtdXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlEID0gMDsgaUQgPCBhcnJheUNoZWNrTG93ZXJDYXNlc0QubGVuZ3RoOyBpRCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRBcnJheUQgPSBsZXR0ZXJNYXRjaGVzQWZ0ZXJEPy5maWx0ZXIoKGlEKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXJjYXNlc1JlZ2V4T2JqLnRlc3QoaUQpXG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWRBcnJheUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZEFycmF5RCA9IGZpbHRlcmVkQXJyYXlELm1hcCgoaUQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlELnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVtYWRlU3RyaW5nRCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnTGV0dGVyID0gZmlsdGVyZWRBcnJheURbaURdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnZXhUYXJnTGV0dGVyID0gbmV3IFJlZ0V4cCh0YXJnTGV0dGVyLCBcImdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaUQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVTdHJpbmdEID0gZmlsdGVyZWRBcnJheURcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nU3RhcnRNYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaUQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZW1hZGVTdHJpbmdEID0gZmlsdGVyZWRBcnJheURcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyb25nU3RhcnRNYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBbdGV4dEVsZW1lbnQudmFsdWUsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyQ29ycmVjdEN1cnNvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRFbGVtZW50LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSB0ZXh0RWxlbWVudC52YWx1ZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXhUYXJnTGV0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWRlU3RyaW5nRFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaUQgPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEFycmF5RC5wdXNoKG1hcHBlZEFycmF5RFtpRF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3JkcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJDb3JyZWN0Q3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9zdGF0ZW1lbnQgcGFyYSBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcbiAgICAgICAgaWYgKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMgfHwgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlczIpIHtcbiAgICAgICAgICAvL0lJRkUgcGFyYSBlbmNhcHN1bGFyIGNvcnJlw6fDo28gZGUgbcO6bHRpcGxvcyB1cHBlciBjYXNlc1xuICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1bnByb3BlclVwcGVyY2FzZXMgPSBbXG4gICAgICAgICAgICAgIC4uLihtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaGVzIHx8IFtdKSxcbiAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDEgfHwgW10pLFxuICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMiB8fCBbXSksXG4gICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AzIHx8IFtdKSxcbiAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDQgfHwgW10pLFxuICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNSB8fCBbXSksXG4gICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A2IHx8IFtdKSxcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGNvbnN0IHVucHJvcGVyRFVwcGVyY2FzZXMgPSBbXG4gICAgICAgICAgICAgIC4uLih3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A3IHx8IFtdKSxcbiAgICAgICAgICAgICAgLi4uKHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDggfHwgW10pLFxuICAgICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOSB8fCBbXSksXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICB1bnByb3BlclVwcGVyY2FzZXMuZm9yRWFjaCgobXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRleHQgJiYgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gZml4VW5wcm9wZXJVcHBlcmNhc2VzKFxuICAgICAgICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgICAgICAgIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoLFxuICAgICAgICAgICAgICAgICAgXCJOb0RcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgLy9jb3JyZcOnw6NvIGRlIGJ1Z3MgY29tIGNvbWJpbmHDp8O1ZXMgcG9zdGVyaW9yZXMgZGUgdXBwZXIvbG93ZXJcbiAgICAgICAgICAgICAgICAvLyBjb25zdCB1cHBlcmxvd2VyY29tYiA9IHRleHQubWF0Y2goXG4gICAgICAgICAgICAgICAgLy8gICAvW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZ1xuICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgdXBwZXJsb3dlcmNvbWJEID0gdGV4dC5tYXRjaChcbiAgICAgICAgICAgICAgICAvLyAgIC9EW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVtcXHNdL1xuICAgICAgICAgICAgICAgIC8vICk7XG4gICAgICAgICAgICAgICAgLy8gaWYgKHVwcGVybG93ZXJjb21iIHx8IHVwcGVybG93ZXJjb21iRCkge1xuICAgICAgICAgICAgICAgIC8vICAgcmVwZWF0ZWRMZXR0ZXIgPSByZXBlYXRlZExldHRlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgIC8vZml4IHBhcmEgZGVsYXkgZW0gcHJvY2Vzc2FtZW50byBkbyBTIGVtIGNvbmp1bsOnw7Vlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHVwcGVybG93ZXJjb21iRFMgPSB0ZXh0Lm1hdGNoKFxuICAgICAgICAgICAgICAgICAgL0RbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW1NdW1xcc10vXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAodXBwZXJsb3dlcmNvbWJEUykge1xuICAgICAgICAgICAgICAgICAgdXBwZXJsb3dlcmNvbWJEUy5zcGxpY2UoMywgMSwgXCJzXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID0gdGV4dDtcbiAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxuICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXG4gICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UsXG4gICAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXG4gICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgW3RleHRFbGVtZW50LnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBhcnJDb3JyZWN0Q3Vyc29yO1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZS5lbmRPZmZzZXQgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgZml4Q3Vyc29yUG9zaXRpb24odGV4dEVsZW1lbnQsIHJhbmdlLCBzZWxlY3Rpb24sIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHVucHJvcGVyRFVwcGVyY2FzZXMuZm9yRWFjaCgobXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRleHQgJiYgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IGZpeFVucHJvcGVyVXBwZXJjYXNlcyhcbiAgICAgICAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICAgICAgICBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCxcbiAgICAgICAgICAgICAgICAgIFwiWWVzRFZhbFwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxuICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXG4gICAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UsXG4gICAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXG4gICAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgW3RleHRFbGVtZW50LnZhbHVlLCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBhcnJDb3JyZWN0Q3Vyc29yO1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZS5lbmRPZmZzZXQgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgZml4Q3Vyc29yUG9zaXRpb24odGV4dEVsZW1lbnQsIHJhbmdlLCBzZWxlY3Rpb24sIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc3RhdGVtZW50IHBhcmEgY29udHJvbGUgZGUgY29tYmluYcOnw6NvIGFww7NzIGVudHJhZGEgY29tIGluaWNpYWwgRFxuICAgICAgICBpZiAoXG4gICAgICAgICAgbGV0dGVyTWF0Y2hlc0luaUQgJiZcbiAgICAgICAgICBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXG4gICAgICAgICAgIShcbiAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDEgfHxcbiAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcbiAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDNcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIGxldHRlck5vdE1hdGNoZXNBZnRlckQgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc3RhdGVtZW50IHBhcmEgZmx1eG8gdmFsaWRhbmRvIG1hdGNoIGRlIGluaWNpYWlzXG4gICAgICAgIGlmIChsZXR0ZXJNYXRjaGVzSW5pRCB8fCBsZXR0ZXJNYXRjaGVzSW5pTm90RCkge1xuICAgICAgICAgIC8vSUlGRSBwYXJhIGZvcsOnYXIgdXBwZXIgY2FzZVxuICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3b3JkTWF0Y2ggPSBbXG4gICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcbiAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxuICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXG4gICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzSW5pTm90RCB8fCBbXSksXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBjb25zdCBETWF0Y2ggPSBbXG4gICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcbiAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxuICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpTSA9IDA7IGlNIDwgd29yZE1hdGNoLmxlbmd0aDsgaU0rKykge1xuICAgICAgICAgICAgICBjb25zdCB1cHBlcmNhc2VUZXN0ID0gdXBwZXJjYXNlc1JlZ2V4T2JqLnRlc3Qod29yZE1hdGNoW2lNXSk7XG4gICAgICAgICAgICAgIGlmICh1cHBlcmNhc2VUZXN0KSBjb250aW51ZTtcbiAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPSBmaXhGb3JjZWRVcHBlckNhc2UoXG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgd29yZE1hdGNoLFxuICAgICAgICAgICAgICAgIHdvcmRNYXRjaFtpTV1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKERNYXRjaC5mbGF0KDEpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3JkcyhcbiAgICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxuICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlLFxuICAgICAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxuICAgICAgICAgICAgICAgICAgdGV4dEVsZW1lbnRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIFt0ZXh0RWxlbWVudC52YWx1ZSwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0lJRkUgcGFyYSBmYXplciBjb3JyZcOnw7VlcyBhZGljaW9uYWlzIG5vIGZpbmFsIGRhIGVkacOnw6NvIGF1dG9tw6F0aWNhXG4gICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AxKSB7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9XG4gICAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlPy5yZXBsYWNlQWxsKHdyb25nQ2hhcnNSZWdleE9wMSwgXCJcIikgPz8gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDIpIHtcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnZhbHVlID1cbiAgICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWU/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AyLCBcIlwiKSA/PyBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxuICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZT8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDMsIFwiXCIpID8/IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRleHQubWF0Y2goL1xcc1tcXHNdKy9nKSkge1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQudmFsdWUgPVxuICAgICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZT8ucmVwbGFjZUFsbCgvXFxzW1xcc10rL2csIFwiIFwiKSA/PyBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0ZXh0Lm1hdGNoKC9eW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XS8pKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdExldHRlckNhcGl0YWxpemVkID0gdGV4dC5zbGljZSgwLCAxKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgY29uc3QgcmVzdE9mVGV4dCA9IHRleHQuc2xpY2UoMSk7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC52YWx1ZSA9IGZpcnN0TGV0dGVyQ2FwaXRhbGl6ZWQgKyByZXN0T2ZUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9DYXBpdGFsaXplQ2l0ZShlZGl0YWJsZUNpdGU6IEVsZW1lbnQpIHtcbiAgY29uc3QgY2l0ZVRleHQgPSBlZGl0YWJsZUNpdGU/LnRleHRDb250ZW50ID8/IG51bGw7XG4gIGlmIChpc0F1dG9jb3JyZWN0T24gJiYgY2l0ZVRleHQpIHtcbiAgICAvL2luaWNpYWxpemHDp8OjbyBkZSBleHByZXNzw7VlcyByZWdleCBjb20gc2V1cyBvYmpldG9zIGUgbWF0Y2hlcyBhc3NvY2lhZG9zXG4gICAgY29uc3QgbmV3V29yZE1hdGNoZXMgPSBjaXRlVGV4dC5tYXRjaChcbiAgICAgIC9cXHNbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdP1thLXpBLVrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvMOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStcXHM/W0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXT9bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0qL2dcbiAgICApO1xuICAgIGNvbnN0IGxldHRlck1hdGNoZXNJbmlOb3REID0gY2l0ZVRleHQubWF0Y2goL1xcc1teZF0vZyk7XG4gICAgY29uc3QgbGV0dGVyTWF0Y2hlc0luaUQgPSBjaXRlVGV4dC5tYXRjaCgvXFxzZC9nKTtcbiAgICBjb25zdCBub3RNYXRjaGVzQWZ0ZXJEUmVnZXggPVxuICAgICAgL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU10/XFxzL2c7XG4gICAgbGV0IGxldHRlck5vdE1hdGNoZXNBZnRlckQgPSBjaXRlVGV4dC5tYXRjaChub3RNYXRjaGVzQWZ0ZXJEUmVnZXgpID8/IFtdO1xuICAgIGNvbnN0IGFmdGVyRFJlZ2V4T3AxID1cbiAgICAgIC9cXHNkW15hZWlvw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xBRUlPw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdL2c7XG4gICAgY29uc3QgYWZ0ZXJEUmVnZXhPcDIgPVxuICAgICAgL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NcXHNdL2c7XG4gICAgY29uc3QgYWZ0ZXJEUmVnZXhPcDMgPVxuICAgICAgL1xcc2RbYWVpb8Ohw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8QUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU11bYS16QS1aw6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7zDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vZztcbiAgICBjb25zdCBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxID0gY2l0ZVRleHQubWF0Y2goYWZ0ZXJEUmVnZXhPcDEpO1xuICAgIGNvbnN0IGxldHRlck1hdGNoZXNBZnRlckRPcDIgPSBjaXRlVGV4dC5tYXRjaChhZnRlckRSZWdleE9wMik7XG4gICAgY29uc3QgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyA9IGNpdGVUZXh0Lm1hdGNoKGFmdGVyRFJlZ2V4T3AzKTtcbiAgICBjb25zdCBsb3dlcmNhc2VzUmVnZXggPSAvW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XS9nO1xuICAgIGNvbnN0IGxvd2VyY2FzZXNSZWdleE9iaiA9IG5ldyBSZWdFeHAobG93ZXJjYXNlc1JlZ2V4KTtcbiAgICAvLyBjb25zdCBsb3dlcmNhc2VzTWF0Y2hlcyA9IGNpdGVUZXh0Lm1hdGNoKGxvd2VyY2FzZXNSZWdleCk7XG4gICAgY29uc3QgdXBwZXJjYXNlc1JlZ2V4ID0gL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0vO1xuICAgIGNvbnN0IHVwcGVyY2FzZXNSZWdleE9iaiA9IG5ldyBSZWdFeHAodXBwZXJjYXNlc1JlZ2V4KTtcbiAgICBjb25zdCBtdWx0aXBsZVVwcGVyY2FzZXNSZWdleCA9IC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdezIsfS9nO1xuICAgIGNvbnN0IG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMgPSBjaXRlVGV4dC5tYXRjaChtdWx0aXBsZVVwcGVyY2FzZXNSZWdleCk7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDEgPVxuICAgICAgL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1cXGIvZztcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AxID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDEpO1xuICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AyID1cbiAgICAgIC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStcXGIvZztcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3AyID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDIpO1xuICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3AzID1cbiAgICAgIC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF17MiwzfVxcYi9nO1xuICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc01hdGNoZXNPcDMgPSBjaXRlVGV4dC5tYXRjaCh3cm9uZ1VwcGVyY2FzZXNSZWdleE9wMyk7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzUmVnZXhPcDQgPVxuICAgICAgL1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2c7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNCA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A0KTtcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNSA9XG4gICAgICAvW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF17MSwyfVtBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF1bYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1thLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvEEtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXStcXGIvZztcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A1ID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDUpO1xuICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A2ID1cbiAgICAgIC9bQS1aw4HDgMOCw4TDg8OJw4jDisOLw43DjMOOw4/Dk8OSw5TDlsOVw5rDmcObw5xdW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XStbYS16w6HDoMOiw6TDo8Opw6jDqsOrw63DrMOuw6/Ds8Oyw7TDtsO1w7rDucO7w7xdK1tBLVrDgcOAw4LDhMODw4nDiMOKw4vDjcOMw47Dj8OTw5LDlMOWw5XDmsOZw5vDnF0rW2EtesOhw6DDosOkw6PDqcOow6rDq8Otw6zDrsOvw7PDssO0w7bDtcO6w7nDu8O8XVthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rXFxiL2c7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNiA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A2KTtcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wNyA9IC9EW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtzU10vZztcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A3ID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDcpO1xuICAgIGNvbnN0IHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A4ID0gL0RbQUVJT8OBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXVtec1NdL2c7XG4gICAgY29uc3Qgd3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOCA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nVXBwZXJjYXNlc1JlZ2V4T3A4KTtcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNSZWdleE9wOSA9IC9EW2FlaW/DocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF1bc11cXHMvZztcbiAgICBjb25zdCB3cm9uZ1VwcGVyY2FzZXNNYXRjaGVzT3A5ID0gY2l0ZVRleHQubWF0Y2god3JvbmdVcHBlcmNhc2VzUmVnZXhPcDkpO1xuICAgIGNvbnN0IHdyb25nU3RhcnRSZWdleCA9XG4gICAgICAvXlthLXrDocOgw6LDpMOjw6nDqMOqw6vDrcOsw67Dr8Ozw7LDtMO2w7XDusO5w7vDvF0rW0EtWsOBw4DDgsOEw4PDicOIw4rDi8ONw4zDjsOPw5PDksOUw5bDlcOaw5nDm8OcXS87XG4gICAgY29uc3Qgd3JvbmdTdGFydE1hdGNoID0gY2l0ZVRleHQubWF0Y2god3JvbmdTdGFydFJlZ2V4KT8udG9TdHJpbmcoKSA/PyBudWxsO1xuICAgIGNvbnN0IHdyb25nQ2hhcnNSZWdleE9wMSA9XG4gICAgICAvW1xcc10qW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dK1tcXHNdKltcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXSovZztcblxuICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AxID0gY2l0ZVRleHQubWF0Y2god3JvbmdDaGFyc1JlZ2V4T3AxKTtcbiAgICBjb25zdCB3cm9uZ0NoYXJzUmVnZXhPcDIgPSAvJFtcXGRcXG4sOy4rXFwtPX5cXFxcL3xcIiFAIyQlJirCrMKwwqrCusKnwrnCssKzwqPCoigpe31bXFxdXSsvZztcbiAgICBjb25zdCB3cm9uZ0NoYXJzTWF0Y2hlc09wMiA9IGNpdGVUZXh0Lm1hdGNoKHdyb25nQ2hhcnNSZWdleE9wMik7XG4gICAgY29uc3Qgd3JvbmdDaGFyc1JlZ2V4T3AzID1cbiAgICAgIC8oPzw9XFxzZEQpW1xcZFxcbiw7LitcXC09flxcXFwvfFwiIUAjJCUmKsKswrDCqsK6wqfCucKywrPCo8KiKCl7fVtcXF1dKy9nO1xuICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzT3AzID0gY2l0ZVRleHQubWF0Y2god3JvbmdDaGFyc1JlZ2V4T3AzKTtcblxuICAgIC8vaW5pY2lhbGl6YcOnw6NvIGRlIG91dHJhcyB2YXJpw6F2ZWlzXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICBsZXQgcmVtYWRlQ2l0ZVRleHQgPSBjaXRlVGV4dDtcbiAgICBsZXQgaXNDdXJzb3JBdXRvTW92ZWQgPSBmYWxzZTtcbiAgICBsZXQgaXNBbGVydE1hZGUgPSBmYWxzZTtcbiAgICBsZXQgaXNTcGFuQWN0aXZlID0gZmFsc2U7XG4gICAgbGV0IGlzVW5kb1VwcGVyY2FzZSA9IGZhbHNlO1xuXG4gICAgLy9zdGF0ZW1lbnQgcGFyYSBkaWZlcmVuY2lhciBpbsOtY2lvIGRvIHJlc3RhbnRlIGRvIGlucHV0XG4gICAgaWYgKGNpdGVUZXh0Lmxlbmd0aCA9PT0gMSAmJiAhbmV3V29yZE1hdGNoZXMpIHtcbiAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeEZpcnN0TGV0dGVyKFxuICAgICAgICBjaXRlVGV4dFswXSxcbiAgICAgICAgYXV0b0NhcGl0YWxpemVGaXJzdExldHRlclJlZ2V4LFxuICAgICAgICBlZGl0YWJsZUNpdGUsXG4gICAgICAgIHJhbmdlLFxuICAgICAgICBzZWxlY3Rpb24sXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChjaXRlVGV4dC5sZW5ndGggPiAxKSB7XG4gICAgICAvL0lJRkUgcGFyYSBlbmNhcHN1bGFyIGNvcnJlw6fDo28gZGUgaW7DrWNpb3MgaW5jb3JyZXRvcyBkZSBlbnRyYWRhXG4gICAgICAoKCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXNPcDEgfHxcbiAgICAgICAgICB3cm9uZ0NoYXJzTWF0Y2hlc09wMiB8fFxuICAgICAgICAgIHdyb25nQ2hhcnNNYXRjaGVzT3AzXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHdyb25nQ2hhcnNNYXRjaGVzID0gW1xuICAgICAgICAgICAgLi4uKHdyb25nQ2hhcnNNYXRjaGVzT3AxIHx8IFtdKSxcbiAgICAgICAgICAgIC4uLih3cm9uZ0NoYXJzTWF0Y2hlc09wMiB8fCBbXSksXG4gICAgICAgICAgICAuLi4od3JvbmdDaGFyc01hdGNoZXNPcDMgfHwgW10pLFxuICAgICAgICAgIF07XG5cbiAgICAgICAgICBmb3IgKGxldCBpVyA9IDA7IGlXIDwgd3JvbmdDaGFyc01hdGNoZXMubGVuZ3RoOyBpVysrKSB7XG4gICAgICAgICAgICBjb25zdCB3cm9uZ0NoYXJMZW5ndGggPSB3cm9uZ0NoYXJzTWF0Y2hlc1tpV10ubGVuZ3RoO1xuICAgICAgICAgICAgd3JvbmdDaGFyc01hdGNoZXMuZm9yRWFjaCgod3JvbmdDaGFyTWF0Y2gpID0+IHtcbiAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4V3JvbmdTdGFydHMoXG4gICAgICAgICAgICAgICAgY2l0ZVRleHQsXG4gICAgICAgICAgICAgICAgd3JvbmdDaGFyTWF0Y2gsXG4gICAgICAgICAgICAgICAgd3JvbmdDaGFyTGVuZ3RoXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxuICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSxcbiAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXG4gICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XG4gICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKFxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV0gPSBjcmVhdGVTcGFuQWxlcnQoXG4gICAgICAgICAgICAgICAgaXNTcGFuQWN0aXZlLFxuICAgICAgICAgICAgICAgIGlzQWxlcnRNYWRlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG5cbiAgICAgIGlmICh3cm9uZ1N0YXJ0TWF0Y2gpIHtcbiAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gd3JvbmdTdGFydENvcnJlY3Rpb24oXG4gICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50LFxuICAgICAgICAgIHdyb25nU3RhcnRNYXRjaFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV3V29yZE1hdGNoZXMpIHtcbiAgICAgICAgbmV3V29yZE1hdGNoZXMuZm9yRWFjaCgoKSA9PiB7XG4gICAgICAgICAgLy9JSUZFIHBhcmEgY2FwaXRhbGl6YXIgcGFsYXZyYXMgYXDDs3MgYSBwcmltZWlyYVxuICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICBpZiAobGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgIWxldHRlck1hdGNoZXNJbmlEKSB7XG4gICAgICAgICAgICAgIGxldHRlck1hdGNoZXNJbmlOb3RELmZvckVhY2goKGxldHRlck1hdGNoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVtYWRlQ2l0ZVRleHQgPSBmaXhOZXh0V29yZHNJbmlOb3REKFxuICAgICAgICAgICAgICAgICAgcmVtYWRlQ2l0ZVRleHQsXG4gICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSByZW1hZGVDaXRlVGV4dDtcbiAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoXG4gICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXG4gICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgY29uc3QgYXJyQ29ycmVjdEN1cnNvciA9IGNvcnJlY3RDdXJzb3JOZXh0V29yZHMoXG4gICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXG4gICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlLFxuICAgICAgICAgICAgICAgIHdyb25nU3RhcnRNYXRjaCxcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGVcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgW2VkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCwgaXNDdXJzb3JBdXRvTW92ZWRdID0gYXJyQ29ycmVjdEN1cnNvcjtcblxuICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPSB3cm9uZ1N0YXJ0Q29ycmVjdGlvbihcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAobGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgbGV0dGVyTWF0Y2hlc0luaUQpIHx8XG4gICAgICAgICAgICAgICghbGV0dGVyTWF0Y2hlc0luaU5vdEQgJiYgbGV0dGVyTWF0Y2hlc0luaUQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgLy9JSUZFIHBhcmEgY29ycmXDp8OjbyBmb2NhZGEgZW0gY29uanVuw6fDo28gY29tIERcbiAgICAgICAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbGV0dGVyTWF0Y2hlc0FmdGVyRDogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICFsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXG4gICAgICAgICAgICAgICAgICAobGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxuICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XG4gICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDMpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJEID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXG4gICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDMgfHwgW10pLFxuICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCAmJlxuICAgICAgICAgICAgICAgICAgIShcbiAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fFxuICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AyIHx8XG4gICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDNcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGlmIChsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmIGxldHRlck1hdGNoZXNJbmlOb3REKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbLi4uKGxldHRlck1hdGNoZXNJbmlOb3REIHx8IFtdKV07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgIGxldHRlck5vdE1hdGNoZXNBZnRlckQgJiZcbiAgICAgICAgICAgICAgICAgIChsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XG4gICAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcbiAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fFxuICAgICAgICAgICAgICAgICAgICBsZXR0ZXJNYXRjaGVzSW5pTm90RClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGxldHRlck1hdGNoZXNBZnRlckQgPSBbXG4gICAgICAgICAgICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxuICAgICAgICAgICAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMyB8fCBbXSksXG4gICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0lJRkUgcGFyYSBjYXBpdGFsaXphw6fDo28gZm9jYWRhIGVtIGluaWNpYWlzIERcbiAgICAgICAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRC5mb3JFYWNoKChsZXR0ZXJNYXRjaEQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVtYWRlQ2l0ZVRleHQgPSBmaXhOZXh0V29yZHNBZnRlckQoXG4gICAgICAgICAgICAgICAgICAgICAgcmVtYWRlQ2l0ZVRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hEXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IHJlbWFkZUNpdGVUZXh0O1xuICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlDaGVja0xvd2VyQ2FzZXNEID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRCA/PyBbXVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlEID0gMDsgaUQgPCBhcnJheUNoZWNrTG93ZXJDYXNlc0QubGVuZ3RoOyBpRCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQXJyYXlEID0gbGV0dGVyTWF0Y2hlc0FmdGVyRD8uZmlsdGVyKChpRCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBsb3dlcmNhc2VzUmVnZXhPYmoudGVzdChpRClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkQXJyYXlEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFwcGVkQXJyYXlEID0gZmlsdGVyZWRBcnJheUQubWFwKChpRCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlELnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgIGxldCByZW1hZGVTdHJpbmdEID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnTGV0dGVyID0gZmlsdGVyZWRBcnJheURbaURdO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4VGFyZ0xldHRlciA9IG5ldyBSZWdFeHAodGFyZ0xldHRlciwgXCJnXCIpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpRCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NwYW5BY3RpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzQWxlcnRNYWRlXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWRlU3RyaW5nRCA9IGZpbHRlcmVkQXJyYXlEXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFyckNvcnJlY3RDdXJzb3I7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpRCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NwYW5BY3RpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzQWxlcnRNYWRlXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQuc3BsaWNlKGlELCAxLCBtYXBwZWRBcnJheURbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWRlU3RyaW5nRCA9IGZpbHRlcmVkQXJyYXlEXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiLFwiLCBcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3JkcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJDb3JyZWN0Q3Vyc29yO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXhUYXJnTGV0dGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtYWRlU3RyaW5nRFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpRCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQXJyYXlELnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRBcnJheUQucHVzaChtYXBwZWRBcnJheURbaURdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVbmRvVXBwZXJjYXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFyckNvcnJlY3RDdXJzb3I7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoZXMpIHtcbiAgICAgICAgLy9JSUZFIHBhcmEgZW5jYXBzdWxhciBjb3JyZcOnw6NvIGRlIG3Dumx0aXBsb3MgdXBwZXIgY2FzZXNcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBjb25zdCB1bnByb3BlclVwcGVyY2FzZXMgPSBbXG4gICAgICAgICAgICAuLi4obXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2hlcyB8fCBbXSksXG4gICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMSB8fCBbXSksXG4gICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMiB8fCBbXSksXG4gICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wMyB8fCBbXSksXG4gICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNCB8fCBbXSksXG4gICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNSB8fCBbXSksXG4gICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNiB8fCBbXSksXG4gICAgICAgICAgXTtcblxuICAgICAgICAgIGNvbnN0IHVucHJvcGVyRFVwcGVyY2FzZXMgPSBbXG4gICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wNyB8fCBbXSksXG4gICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOCB8fCBbXSksXG4gICAgICAgICAgICAuLi4od3JvbmdVcHBlcmNhc2VzTWF0Y2hlc09wOSB8fCBbXSksXG4gICAgICAgICAgXTtcblxuICAgICAgICAgIHVucHJvcGVyVXBwZXJjYXNlcy5mb3JFYWNoKChtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNpdGVUZXh0ICYmIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSB7XG4gICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeFVucHJvcGVyVXBwZXJjYXNlcyhcbiAgICAgICAgICAgICAgICBjaXRlVGV4dCxcbiAgICAgICAgICAgICAgICBtdWx0aXBsZVVwcGVyY2FzZXNNYXRjaCxcbiAgICAgICAgICAgICAgICBcIk5vRFwiXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSA9IHRydWU7XG4gICAgICAgICAgICAgIGNvbnN0IGFyckNvcnJlY3RDdXJzb3IgPSBjb3JyZWN0Q3Vyc29yTmV4dFdvcmRzKFxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxuICAgICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSxcbiAgICAgICAgICAgICAgICB3cm9uZ1N0YXJ0TWF0Y2gsXG4gICAgICAgICAgICAgICAgZWRpdGFibGVDaXRlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIFtlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQsIGlzQ3Vyc29yQXV0b01vdmVkXSA9IGFyckNvcnJlY3RDdXJzb3I7XG4gICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKFxuICAgICAgICAgICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkLFxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV0gPSBjcmVhdGVTcGFuQWxlcnQoXG4gICAgICAgICAgICAgICAgaXNTcGFuQWN0aXZlLFxuICAgICAgICAgICAgICAgIGlzQWxlcnRNYWRlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB1bnByb3BlckRVcHBlcmNhc2VzLmZvckVhY2goKG11bHRpcGxlVXBwZXJjYXNlc01hdGNoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2l0ZVRleHQgJiYgbXVsdGlwbGVVcHBlcmNhc2VzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID0gZml4VW5wcm9wZXJVcHBlcmNhc2VzKFxuICAgICAgICAgICAgICAgIGNpdGVUZXh0LFxuICAgICAgICAgICAgICAgIG11bHRpcGxlVXBwZXJjYXNlc01hdGNoLFxuICAgICAgICAgICAgICAgIFwiWWVzRENvbnRcIlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UgPSB0cnVlO1xuICAgICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3JkcyhcbiAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcbiAgICAgICAgICAgICAgICBpc1VuZG9VcHBlcmNhc2UsXG4gICAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxuICAgICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBhcnJDb3JyZWN0Q3Vyc29yO1xuICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChcbiAgICAgICAgICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCxcbiAgICAgICAgICAgICAgICBlZGl0YWJsZUNpdGVcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KFxuICAgICAgICAgICAgICAgIGlzU3BhbkFjdGl2ZSxcbiAgICAgICAgICAgICAgICBpc0FsZXJ0TWFkZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vc3RhdGVtZW50IHBhcmEgY29ycmXDp8OjbyBkZSBibG9jb3MgYXDDs3MgaW5pY2lhbCBjb20gRFxuICAgIGlmIChcbiAgICAgIGxldHRlck1hdGNoZXNJbmlEICYmXG4gICAgICBsZXR0ZXJOb3RNYXRjaGVzQWZ0ZXJEICYmXG4gICAgICAhKFxuICAgICAgICBsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AxIHx8XG4gICAgICAgIGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHxcbiAgICAgICAgbGV0dGVyTWF0Y2hlc0FmdGVyRE9wM1xuICAgICAgKVxuICAgICkge1xuICAgICAgbGV0dGVyTm90TWF0Y2hlc0FmdGVyRCA9IFtdO1xuICAgIH1cblxuICAgIC8vc3RhdGVtZW50IHBhcmEgY29ycmXDp8OjbyBkZSBtw7psdGlwbG9zIHVwcGVyIGNhc2VzIGZvcsOnYWRvcyBpbmRldmlkYW1lbnRlXG4gICAgaWYgKGxldHRlck1hdGNoZXNJbmlEIHx8IGxldHRlck1hdGNoZXNJbmlOb3REKSB7XG4gICAgICAvL0lJRkUgcGFyYSBmb3LDp2FyIHVwcGVyIGNhc2VcbiAgICAgICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHdvcmRNYXRjaCA9IFtcbiAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXG4gICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxuICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcbiAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0luaU5vdEQgfHwgW10pLFxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IERNYXRjaCA9IFtcbiAgICAgICAgICAuLi4obGV0dGVyTWF0Y2hlc0FmdGVyRE9wMSB8fCBbXSksXG4gICAgICAgICAgLi4uKGxldHRlck1hdGNoZXNBZnRlckRPcDIgfHwgW10pLFxuICAgICAgICAgIC4uLihsZXR0ZXJNYXRjaGVzQWZ0ZXJET3AzIHx8IFtdKSxcbiAgICAgICAgXTtcbiAgICAgICAgZm9yIChsZXQgaU0gPSAwOyBpTSA8IHdvcmRNYXRjaC5sZW5ndGg7IGlNKyspIHtcbiAgICAgICAgICBjb25zdCB1cHBlcmNhc2VUZXN0ID0gdXBwZXJjYXNlc1JlZ2V4T2JqLnRlc3Qod29yZE1hdGNoW2lNXSk7XG4gICAgICAgICAgaWYgKHVwcGVyY2FzZVRlc3QpIGNvbnRpbnVlO1xuICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IGZpeEZvcmNlZFVwcGVyQ2FzZShcbiAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZSxcbiAgICAgICAgICAgIHdvcmRNYXRjaCxcbiAgICAgICAgICAgIHdvcmRNYXRjaFtpTV1cbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChETWF0Y2guZmxhdCgxKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJDb3JyZWN0Q3Vyc29yID0gY29ycmVjdEN1cnNvck5leHRXb3JkcyhcbiAgICAgICAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQsXG4gICAgICAgICAgICAgIGlzVW5kb1VwcGVyY2FzZSxcbiAgICAgICAgICAgICAgd3JvbmdTdGFydE1hdGNoLFxuICAgICAgICAgICAgICBlZGl0YWJsZUNpdGVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBbZWRpdGFibGVDaXRlLnRleHRDb250ZW50LCBpc0N1cnNvckF1dG9Nb3ZlZF0gPSBhcnJDb3JyZWN0Q3Vyc29yO1xuICAgICAgICAgICAgW2lzU3BhbkFjdGl2ZSwgaXNBbGVydE1hZGVdID0gY3JlYXRlU3BhbkFsZXJ0KFxuICAgICAgICAgICAgICBpc1NwYW5BY3RpdmUsXG4gICAgICAgICAgICAgIGlzQWxlcnRNYWRlXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkoKTtcbiAgICB9XG5cbiAgICAvL0lJRkUgcGFyYSBmYXplciBjb3JyZcOnw7VlcyBubyBmaW5hbCBkYSBlZGnDp8OjbyBhdXRvbcOhdGljYVxuICAgICgoKSA9PiB7XG4gICAgICBpZiAod3JvbmdDaGFyc01hdGNoZXNPcDEpIHtcbiAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50ID1cbiAgICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQ/LnJlcGxhY2VBbGwod3JvbmdDaGFyc1JlZ2V4T3AxLCBcIlwiKSA/PyBudWxsO1xuICAgICAgICBpc0N1cnNvckF1dG9Nb3ZlZCA9IG1vdmVDdXJzb3JUb1RoZUVuZChpc0N1cnNvckF1dG9Nb3ZlZCwgZWRpdGFibGVDaXRlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdyb25nQ2hhcnNNYXRjaGVzT3AyKSB7XG4gICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50Py5yZXBsYWNlQWxsKHdyb25nQ2hhcnNSZWdleE9wMiwgXCJcIikgPz8gbnVsbDtcbiAgICAgICAgaXNDdXJzb3JBdXRvTW92ZWQgPSBtb3ZlQ3Vyc29yVG9UaGVFbmQoaXNDdXJzb3JBdXRvTW92ZWQsIGVkaXRhYmxlQ2l0ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh3cm9uZ0NoYXJzTWF0Y2hlc09wMykge1xuICAgICAgICBlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPVxuICAgICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudD8ucmVwbGFjZUFsbCh3cm9uZ0NoYXJzUmVnZXhPcDMsIFwiXCIpID8/IG51bGw7XG4gICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWRpdGFibGVDaXRlLnRleHRDb250ZW50Py5tYXRjaCgvXFxzW1xcc10rL2cpKSB7XG4gICAgICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgZWRpdGFibGVDaXRlLnRleHRDb250ZW50Py5yZXBsYWNlQWxsKC9cXHNbXFxzXSsvZywgXCIgXCIpID8/IG51bGw7XG4gICAgICAgIGlzQ3Vyc29yQXV0b01vdmVkID0gbW92ZUN1cnNvclRvVGhlRW5kKGlzQ3Vyc29yQXV0b01vdmVkLCBlZGl0YWJsZUNpdGUpO1xuICAgICAgfVxuICAgIH0pKCk7XG4gIH1cblxuICAvL2RlY2xhcmHDp8O1ZXMgZGUgZnVuw6fDtWVzIGxvY2Fpc1xuICBmdW5jdGlvbiBjcmVhdGVTcGFuQWxlcnQoaXNTcGFuQWN0aXZlOiBib29sZWFuLCBpc0FsZXJ0TWFkZTogYm9vbGVhbikge1xuICAgIGNvbnN0IHJnYmFSZWdleCA9IC9yZ2JhXFwoKFxcZCspLCAoXFxkKyksIChcXGQrKSwgKFtcXGQuXSspXFwpLztcbiAgICBjb25zdCBjb21wdXRlZFN0eWxlUmVnZXggPSAvLFxcZCsuP1xcZCouP1xcZCovZztcbiAgICBpZiAoXG4gICAgICBlZGl0YWJsZUNpdGUubmV4dEVsZW1lbnRTaWJsaW5nICYmXG4gICAgICBlZGl0YWJsZUNpdGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuICAgICkge1xuICAgICAgY29uc3QgbmV4dENpdGVFbGVtZW50U2libGluZyA9IGVkaXRhYmxlQ2l0ZS5uZXh0RWxlbWVudFNpYmxpbmcuaWQ7XG4gICAgICBpZiAobmV4dENpdGVFbGVtZW50U2libGluZyA9PT0gXCJkZWFjdEF1dG9jb3JyZWN0QnRuXCIgJiYgIWlzU3BhbkFjdGl2ZSkge1xuICAgICAgICBjb25zdCBjdXJzb3JSZXNldEFsZXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGlmICghaXNBbGVydE1hZGUpIHtcbiAgICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LnRleHRDb250ZW50ID0gXCJDdXJzb3IgcmVzZXRhZG8hIEFwZXJ0ZSBhbGd1bWEgdGVjbGFcIjtcbiAgICAgICAgICBpc0FsZXJ0TWFkZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWRpdGFibGVDaXRlLnBhcmVudE5vZGU/Lmluc2VydEJlZm9yZShcbiAgICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LFxuICAgICAgICAgIGVkaXRhYmxlQ2l0ZS5uZXh0U2libGluZ1xuICAgICAgICApO1xuICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYnJpZWZBbGVydFwiKTtcbiAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImJyaWVmQWxlcnRDaXRlXCIpO1xuICAgICAgICBjdXJzb3JSZXNldEFsZXJ0LnN0eWxlLnNldFByb3BlcnR5KFwiYm9yZGVyLWNvbG9yXCIsIFwid2hpdGVcIik7XG4gICAgICAgIGN1cnNvclJlc2V0QWxlcnQuc3R5bGUuc2V0UHJvcGVydHkoXCJvcGFjaXR5XCIsIFwiMVwiKTtcbiAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5zdHlsZS5zZXRQcm9wZXJ0eShcImZvbnQtc2l6ZVwiLCBcIjhweFwiKTtcbiAgICAgICAgZWRpdGFibGVDaXRlLnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgIFwiYm9yZGVyLWNvbG9yXCIsXG4gICAgICAgICAgXCJyZ2JhKDI1NSwgMTY1LCAwLCAwLjkpXCJcbiAgICAgICAgKTsgLy9hbGVydGFyIHVzdcOhcmlvIGRhIG11ZGFuw6dhIGRlIGN1cnNvciBkZXZpZG8gw6AgcmVjb25zdHJ1w6fDo28gZG8gdGV4dENvbnRlbnQgZWRpdMOhdmVsXG4gICAgICAgIGlzU3BhbkFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGVDaXRlID0gd2luZG93XG4gICAgICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZShlZGl0YWJsZUNpdGUpXG4gICAgICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShcImJvcmRlci1jb2xvclwiKTtcbiAgICAgICAgICBjb25zdCByZ2JhTWF0Y2ggPSBjb21wdXRlZFN0eWxlQ2l0ZS5tYXRjaChyZ2JhUmVnZXgpO1xuICAgICAgICAgIGlmIChyZ2JhTWF0Y2gpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlZHVjZU9wYWNpdHkgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHBvcHBlZEFycmF5ID0gcmdiYU1hdGNoLnBvcCgpOyAvL2ZheiBhIHJldGlyYWRhIGluaWNpYWxcbiAgICAgICAgICAgICAgbGV0IHN0clVwZGF0ZWRBbHBoYSA9IHBvcHBlZEFycmF5Py50b1N0cmluZygpO1xuICAgICAgICAgICAgICBjb25zdCBzdHJSZ2JhID0gcmdiYU1hdGNoXG4gICAgICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAucmVwbGFjZUFsbChjb21wdXRlZFN0eWxlUmVnZXgsIFwiXCIpO1xuICAgICAgICAgICAgICBjb25zdCBmaXJzdFNsaWNlU3RyUmdiYSA9IHN0clJnYmEuc2xpY2UoMCwgMTgpO1xuICAgICAgICAgICAgICBsZXQgc3RyTmV3T3BhY2l0eVZhbHVlID1cbiAgICAgICAgICAgICAgICBmaXJzdFNsaWNlU3RyUmdiYSArIFwiIFwiICsgc3RyVXBkYXRlZEFscGhhICsgXCIpXCI7XG4gICAgICAgICAgICAgIGlmIChzdHJVcGRhdGVkQWxwaGEgJiYgc3RyVXBkYXRlZEFscGhhIDw9IFwiMC4wNVwiKSB7XG4gICAgICAgICAgICAgICAgc3RyVXBkYXRlZEFscGhhID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgc3RyTmV3T3BhY2l0eVZhbHVlID0gZmlyc3RTbGljZVN0clJnYmEgKyBcIjApXCI7XG4gICAgICAgICAgICAgICAgY3Vyc29yUmVzZXRBbGVydC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHJlZHVjZU9wYWNpdHkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVkaXRhYmxlQ2l0ZS5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvclwiLFxuICAgICAgICAgICAgICAgIHN0ck5ld09wYWNpdHlWYWx1ZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICB9IGVsc2UgaWYgKG5leHRDaXRlRWxlbWVudFNpYmxpbmcgPT09IFwiYnJpZWZBbGVydENpdGVcIiB8fCBpc1NwYW5BY3RpdmUpIHtcbiAgICAgICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbaXNTcGFuQWN0aXZlLCBpc0FsZXJ0TWFkZV07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZpcnN0Q2xpY2soZWRpdGFibGVDaXRlOiBFbGVtZW50KSB7XG4gIGlmIChlZGl0YWJsZUNpdGUudGV4dENvbnRlbnQgPT09IFwiSW5zaXJhIFNldSBOb21lIEFxdWlcIikge1xuICAgIGVkaXRhYmxlQ2l0ZS50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH1cbiAgbGV0IGN1cnNvclBvc2l0aW9uID0gMDtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGN1cnNvclBvc2l0aW9uID0gR2xvYmFsSGFuZGxlci5jdXJzb3JDaGVja1RpbWVyKGN1cnNvclBvc2l0aW9uKSA/PyAwO1xuICB9LCAzMDAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaEF1dG9jb3JyZWN0KFxuICBjbGljazogTW91c2VFdmVudCxcbiAgZGVhY3RBdXRvY29ycmVjdEJ0bjogSFRNTEJ1dHRvbkVsZW1lbnRcbikge1xuICBpZiAoY2xpY2sudGFyZ2V0ID09PSBkZWFjdEF1dG9jb3JyZWN0QnRuKSB7XG4gICAgaXNBdXRvY29ycmVjdE9uID0gIWlzQXV0b2NvcnJlY3RPbjsgLy9zaW1wbGlmaWNhw6fDo28gZGUgaWYtZWxzZTsgaWYtaWYgbsOjbyBmdW5jaW9uYSBhcXVpXG4gICAgZGVhY3RBdXRvY29ycmVjdEJ0bi50ZXh0Q29udGVudCA9IGlzQXV0b2NvcnJlY3RPblxuICAgICAgPyBcIkRlc2F0aXZhciBBdXRvY29ycmXDp8Ojb1wiXG4gICAgICA6IFwiQXRpdmFyIEF1dG9jb3JyZcOnw6NvXCI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQWxsR2VuQ29udHMoXG4gIGdlbjogdGFyZ0VsLFxuICBnZW5CaXJ0aFJlbDogdGFyZ0VsLFxuICBnZW5UcmFuczogdGFyZ0VsLFxuICBnZW5GaXNBbGluOiB0YXJnRWxcbikge1xuICBsZXQgaXNHZW5WYWxpZCA9IGZhbHNlO1xuICBsZXQgaXNHZW5CaXJ0aFJlbFZhbGlkID0gZmFsc2U7XG4gIGxldCBpc0dlblRyYW5zQ29udFZhbGlkID0gZmFsc2U7XG4gIGxldCBpc0dlbkZpc0FsaW5WYWxpZCA9IGZhbHNlO1xuICB0cnkge1xuICAgIGlmIChnZW4gJiYgZ2VuIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgIGlzR2VuVmFsaWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBFcnJvIHZhbGlkYW5kbyBnZW46IGVsZW1lbnRvICR7Z2VufSwgaW5zdMOibmNpYSAke1xuICAgICAgICAgIGdlbiBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50XG4gICAgICAgIH1gXG4gICAgICApO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3JHZW4pIHtcbiAgICBjb25zb2xlLmVycm9yKChlcnJvckdlbiBhcyBFcnJvcikubWVzc2FnZSk7XG4gIH0gZmluYWxseSB7XG4gICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAoZ2VuQmlydGhSZWwgJiYgZ2VuQmlydGhSZWwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xuICAgICAgaXNHZW5CaXJ0aFJlbFZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRXJybyB2YWxpZGFuZG8gZ2VuOiBlbGVtZW50byAke2dlbkJpcnRoUmVsfSwgaW5zdMOibmNpYSAke1xuICAgICAgICAgIGdlbkJpcnRoUmVsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnRcbiAgICAgICAgfWBcbiAgICAgICk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvckdlbkJpcnRoUmVsKSB7XG4gICAgY29uc29sZS5lcnJvcigoZXJyb3JHZW5CaXJ0aFJlbCBhcyBFcnJvcikubWVzc2FnZSk7XG4gIH0gZmluYWxseSB7XG4gICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAoZ2VuVHJhbnMgJiYgZ2VuVHJhbnMgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xuICAgICAgaXNHZW5UcmFuc0NvbnRWYWxpZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEVycm8gdmFsaWRhbmRvIGdlblRyYW5zOiBlbGVtZW50byAke2dlblRyYW5zfSwgaW5zdMOibmNpYSAke1xuICAgICAgICAgIGdlblRyYW5zIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnRcbiAgICAgICAgfWBcbiAgICAgICk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvckdlblRyYW5zKSB7XG4gICAgY29uc29sZS5lcnJvcigoZXJyb3JHZW5UcmFucyBhcyBFcnJvcikubWVzc2FnZSk7XG4gIH0gZmluYWxseSB7XG4gICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAoZ2VuRmlzQWxpbiAmJiBnZW5GaXNBbGluIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgIGlzR2VuRmlzQWxpblZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRXJybyB2YWxpZGFuZG8gZ2VuRmlzQWxpbjogZWxlbWVudG8gJHtnZW5GaXNBbGlufSwgaW5zdMOibmNpYSAke1xuICAgICAgICAgIGdlbkZpc0FsaW4gaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudFxuICAgICAgICB9YFxuICAgICAgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yR2VuRmlzQWxpbikge1xuICAgIGNvbnNvbGUuZXJyb3IoKGVycm9yR2VuRmlzQWxpbiBhcyBFcnJvcikubWVzc2FnZSk7XG4gIH0gZmluYWxseSB7XG4gICAgLy9hbGd1bSBlZmVpdG8gdmlzdWFsXG4gIH1cbiAgaWYgKFxuICAgIGlzR2VuVmFsaWQgJiZcbiAgICBpc0dlbkJpcnRoUmVsVmFsaWQgJiZcbiAgICBpc0dlblRyYW5zQ29udFZhbGlkICYmXG4gICAgaXNHZW5GaXNBbGluVmFsaWRcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm8gdmVyaWZpY2FuZG8gYm9vbGVhbm9zIGRlIGNvbnRhaW5lcnMgZGUgZ8OqbmVyb1wiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsdXhHZW4oXG4gIGdlbjogZW50cnlFbCxcbiAgZ2VuSW5pVmFsdWU6IHN0cmluZyB8IG51bGwsXG4gIGdlbkJpcnRoUmVsOiBlbnRyeUVsLFxuICBnZW5UcmFuczogZW50cnlFbCxcbiAgZ2VuRmlzQWxpbjogZW50cnlFbFxuKSB7XG4gIGxldCBnZW5WYWx1ZSA9IFwiXCI7XG4gIGlmIChnZW4udmFsdWUgPT09IFwibWFzY3VsaW5vXCIgfHwgZ2VuLnZhbHVlID09PSBcImZlbWluaW5vXCIpIHtcbiAgICBpZiAoZ2VuQmlydGhSZWwudmFsdWUgPT09IFwiY2lzXCIpIHtcbiAgICAgIGdlblZhbHVlID0gZ2VuSW5pVmFsdWUgPz8gZ2VuLnZhbHVlO1xuICAgICAgaGlkZUdlbkZpc0FsaW4oZ2VuRmlzQWxpbik7XG4gICAgICBoaWRlU3RnVHJhbnNIb3JtKGdlblRyYW5zKTtcbiAgICAgIHJldHVybiBnZW5WYWx1ZTtcbiAgICB9IGVsc2UgaWYgKGdlbkJpcnRoUmVsLnZhbHVlID09PSBcInRyYW5zXCIpIHtcbiAgICAgIHNob3dTdGdUcmFuc0hvcm0oZ2VuVHJhbnMpO1xuICAgICAgaWYgKGdlblRyYW5zLnZhbHVlID09PSBcImF2YW5jYWRvXCIpIHtcbiAgICAgICAgZ2VuVmFsdWUgPSBnZW5JbmlWYWx1ZSA/PyBnZW4udmFsdWU7XG4gICAgICAgIGhpZGVHZW5GaXNBbGluKGdlbkZpc0FsaW4pO1xuICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBnZW5UcmFucy52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiB8fFxuICAgICAgICBnZW5UcmFucy52YWx1ZSA9PT0gXCJub1wiIHx8XG4gICAgICAgIGdlblRyYW5zLnZhbHVlID09PSBcImluaWNpYWxcIiB8fFxuICAgICAgICBnZW5UcmFucy52YWx1ZSA9PT0gXCJpbnRlcm1lZGlhcmlvXCJcbiAgICAgICkge1xuICAgICAgICBzaG93R2VuRmlzQWxpbihnZW5GaXNBbGluKTtcbiAgICAgICAgY29uc3QgY29udEZlbWluaWxpemFkbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgJ29wdGlvblt2YWx1ZT1cImZlbWluaWxpemFkb1wiXSdcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY29udE1hc2N1bGluaXphZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICdvcHRpb25bdmFsdWU9XCJtYXNjdWxpbml6YWRvXCJdJ1xuICAgICAgICApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY29udEZlbWluaWxpemFkbyBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50ICYmXG4gICAgICAgICAgY29udE1hc2N1bGluaXphZG8gaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudFxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoZ2VuVHJhbnMudmFsdWUgPT09IFwiaW50ZXJtZWRpYXJpb1wiKSB7XG4gICAgICAgICAgICBpZiAoZ2VuLnZhbHVlID09PSBcIm1hc2N1bGlub1wiKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzRmVtU2VsZWN0ZWQgPSBjb250RmVtaW5pbGl6YWRvPy5zZWxlY3RlZCA/PyBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKGlzRmVtU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb250RmVtaW5pbGl6YWRvLnJlbW92ZUF0dHJpYnV0ZShcInNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRNYXNjdWxpbml6YWRvLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlbi52YWx1ZSA9PT0gXCJmZW1pbmlub1wiKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzTWFzY1NlbGVjdGVkID0gY29udE1hc2N1bGluaXphZG8/LnNlbGVjdGVkID8/IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAoaXNNYXNjU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb250TWFzY3VsaW5pemFkby5yZW1vdmVBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250RmVtaW5pbGl6YWRvLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpc0ZlbVNlbGVjdGVkID0gY29udEZlbWluaWxpemFkbz8uc2VsZWN0ZWQgPz8gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBpc01hc2NTZWxlY3RlZCA9IGNvbnRNYXNjdWxpbml6YWRvPy5zZWxlY3RlZCA/PyBmYWxzZTtcbiAgICAgICAgICAgIGlmIChpc01hc2NTZWxlY3RlZCkge1xuICAgICAgICAgICAgICBjb250TWFzY3VsaW5pemFkby5yZW1vdmVBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0ZlbVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgIGNvbnRGZW1pbmlsaXphZG8ucmVtb3ZlQXR0cmlidXRlKFwic2VsZWN0ZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm1hc2N1bGluaXphZG9cIikge1xuICAgICAgICAgIGdlblZhbHVlID0gXCJtYXNjdWxpbm9cIjtcbiAgICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2VuRmlzQWxpbi52YWx1ZSA9PT0gXCJmZW1pbmlsaXphZG9cIikge1xuICAgICAgICAgIGdlblZhbHVlID0gXCJmZW1pbmlub1wiO1xuICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcIm5ldXRyb1wiKSB7XG4gICAgICAgICAgZ2VuVmFsdWUgPSBcIm5ldXRyb1wiO1xuICAgICAgICAgIHJldHVybiBnZW5WYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBnZW5CaXJ0aFJlbC52YWx1ZSA9PT0gXCJvdXRyb3NcIiB8fFxuICAgICAgZ2VuQmlydGhSZWwudmFsdWUgPT09IFwidW5kZWZpbmVkXCJcbiAgICApIHtcbiAgICAgIHNob3dHZW5GaXNBbGluKGdlbkZpc0FsaW4pO1xuICAgICAgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibWFzY3VsaW5pemFkb1wiKSB7XG4gICAgICAgIGdlblZhbHVlID0gXCJtYXNjdWxpbm9cIjtcbiAgICAgICAgcmV0dXJuIGdlblZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcImZlbWluaWxpemFkb1wiKSB7XG4gICAgICAgIGdlblZhbHVlID0gXCJmZW1pbmlub1wiO1xuICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibmV1dHJvXCIpIHtcbiAgICAgICAgZ2VuVmFsdWUgPSBcIm5ldXRyb1wiO1xuICAgICAgICByZXR1cm4gZ2VuVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKFxuICAgIGdlbi52YWx1ZSA9PT0gXCJuYW9CaW5hcmlvXCIgfHxcbiAgICBnZW4udmFsdWUgPT09IFwib3V0cm9zXCIgfHxcbiAgICBnZW4udmFsdWUgPT09IFwidW5kZWZpbmVkXCJcbiAgKSB7XG4gICAgaWYgKGdlbkJpcnRoUmVsLnZhbHVlID09PSBcInRyYW5zXCIpIHtcbiAgICAgIHNob3dTdGdUcmFuc0hvcm0oZ2VuVHJhbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlU3RnVHJhbnNIb3JtKGdlblRyYW5zKTtcbiAgICB9XG4gICAgc2hvd0dlbkZpc0FsaW4oZ2VuRmlzQWxpbik7XG4gICAgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibWFzY3VsaW5pemFkb1wiKSB7XG4gICAgICBnZW5WYWx1ZSA9IFwibWFzY3VsaW5vXCI7XG4gICAgICByZXR1cm4gZ2VuVmFsdWU7XG4gICAgfSBlbHNlIGlmIChnZW5GaXNBbGluLnZhbHVlID09PSBcImZlbWluaWxpemFkb1wiKSB7XG4gICAgICBnZW5WYWx1ZSA9IFwiZmVtaW5pbm9cIjtcbiAgICAgIHJldHVybiBnZW5WYWx1ZTtcbiAgICB9IGVsc2UgaWYgKGdlbkZpc0FsaW4udmFsdWUgPT09IFwibmV1dHJvXCIpIHtcbiAgICAgIGdlblZhbHVlID0gXCJuZXV0cm9cIjtcbiAgICAgIHJldHVybiBnZW5WYWx1ZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoXG4gICAgICBcIm9idGVuZG8gZ2VuLnZhbHVlXCIsXG4gICAgICBnZW4/LnZhbHVlID8/IFwiVU5ERUZJTkVEIFZBTFVFXCIsXG4gICAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGdlblZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0dlbkZpc0FsaW4oZ2VuRmlzQWxpbjogZW50cnlFbCkge1xuICBpZiAoZ2VuRmlzQWxpbikge1xuICAgIGdlbkZpc0FsaW4uY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8ucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihcIkVycm8gbmEgYWJlcnR1cmEgZGUgZ2VuRmlzQWxpblwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZUdlbkZpc0FsaW4oZ2VuRmlzQWxpbjogZW50cnlFbCkge1xuICBpZiAoZ2VuRmlzQWxpbikge1xuICAgIGdlbkZpc0FsaW4uY2xvc2VzdChcIi5zcGFuRnNBbmFtR1wiKT8uc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwiXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLndhcm4oXCJFcnJvIG5vIGZlY2hhbWVudG8gZGUgZ2VuRmlzQWxpblwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1N0Z1RyYW5zSG9ybShnZW5UcmFuczogZW50cnlFbCkge1xuICBpZiAoZ2VuVHJhbnMpIHtcbiAgICBnZW5UcmFucy5jbG9zZXN0KFwiLnNwYW5Gc0FuYW1HXCIpPy5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKFwiRXJybyBuYSBhYmVydHVyYSBkZSBnZW5UcmFuc1wiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZVN0Z1RyYW5zSG9ybShnZW5UcmFuczogZW50cnlFbCkge1xuICBpZiAoZ2VuVHJhbnMpIHtcbiAgICBnZW5UcmFucy5jbG9zZXN0KFwiLnNwYW5Gc0FuYW1HXCIpPy5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihcIkVycm8gbm8gZmVjaGFtZW50byBkZSBnZW5UcmFuc1wiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVySWRzQnlHZW5kZXIoYXJyYXlJZHM6IHN0cmluZ1tdLCBib2R5VHlwZTogc3RyaW5nKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycmF5SWRzKSkge1xuICAgIGlmIChcbiAgICAgIGFycmF5SWRzLmV2ZXJ5KChwcm9wKSA9PiB0eXBlb2YgcHJvcCA9PT0gXCJzdHJpbmdcIikgJiZcbiAgICAgIHR5cGVvZiBib2R5VHlwZSA9PT0gXCJzdHJpbmdcIlxuICAgICkge1xuICAgICAgY29uc3QgZ2VuZGVyZWRJZHMgPSBbXTtcbiAgICAgIGxldCBzbGljZWRFcnJvciA9IFwiXCI7XG4gICAgICBzd2l0Y2ggKGJvZHlUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJtYXNjdWxpbm9cIjpcbiAgICAgICAgICBmb3IgKGxldCBpTSA9IDA7IGlNIDwgYXJyYXlJZHMubGVuZ3RoOyBpTSsrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGFycmF5SWRzW2lNXSA9PT0gXCJwZWl0XCIgfHxcbiAgICAgICAgICAgICAgYXJyYXlJZHNbaU1dID09PSBcImFiZFwiIHx8XG4gICAgICAgICAgICAgIGFycmF5SWRzW2lNXSA9PT0gXCJjb3hhXCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBnZW5kZXJlZElkcy5wdXNoKGFycmF5SWRzW2lNXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZmVtaW5pbm9cIjpcbiAgICAgICAgICBmb3IgKGxldCBpRiA9IDA7IGlGIDwgYXJyYXlJZHMubGVuZ3RoOyBpRisrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGFycmF5SWRzW2lGXSA9PT0gXCJ0cmljcFwiIHx8XG4gICAgICAgICAgICAgIGFycmF5SWRzW2lGXSA9PT0gXCJzdXByYWlsXCIgfHxcbiAgICAgICAgICAgICAgYXJyYXlJZHNbaUZdID09PSBcImNveGFcIlxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGdlbmRlcmVkSWRzLnB1c2goYXJyYXlJZHNbaUZdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJuZXV0cm9cIjpcbiAgICAgICAgICBmb3IgKGxldCBpTiA9IDA7IGlOIDwgYXJyYXlJZHMubGVuZ3RoOyBpTisrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGFycmF5SWRzW2lOXSA9PT0gXCJwZWl0XCIgfHxcbiAgICAgICAgICAgICAgYXJyYXlJZHNbaU5dID09PSBcImFiZFwiIHx8XG4gICAgICAgICAgICAgIGFycmF5SWRzW2lOXSA9PT0gXCJ0cmljcFwiIHx8XG4gICAgICAgICAgICAgIGFycmF5SWRzW2lOXSA9PT0gXCJzdXByYWlsXCIgfHxcbiAgICAgICAgICAgICAgYXJyYXlJZHNbaU5dID09PSBcImNveGFcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBnZW5kZXJlZElkcy5wdXNoKGFycmF5SWRzW2lOXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHNsaWNlZEVycm9yID1cbiAgICAgICAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gICAgICAgICAgRXJyb3JIYW5kbGVyLnN0cmluZ0Vycm9yKFxuICAgICAgICAgICAgYG9idGVuZG8gYm9keVR5cGUgdsOhbGlkb2AsXG4gICAgICAgICAgICBib2R5VHlwZSA/PyBudWxsLFxuICAgICAgICAgICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdlbmRlcmVkSWRzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gICAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFxuICAgICAgICBgdmFsaWRhbmRvIGVsZW1lbnRvcyBwYXJhIGRlZmluacOnw6NvIGRlIGfDqm5lcm8gY29tbyBzdHJpbmdzYCxcbiAgICAgICAgYm9keVR5cGUgPz8gbnVsbCxcbiAgICAgICAgXCJzdHJpbmdcIixcbiAgICAgICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihgRXJybyB2YWxpZGFuZG8gYXJyYXkgZW0gZmlsdGVySWRzQnlHZW5kZXIoKWApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBlcnNvbkluc3RhbmNlKHBlcnNvbjogZm9ybVBlcnNvbikge1xuICBpZiAodHlwZW9mIHBlcnNvbi5nZW4gPT09IFwic3RyaW5nXCIgJiYgcGVyc29uLmdlbiAhPT0gXCJcIikge1xuICAgIGlmIChwZXJzb24uZ2VuID09PSBcIm1hc2N1bGlub1wiKSB7XG4gICAgICBwZXJzb24gPSBuZXcgTWFuKFxuICAgICAgICBwZXJzb24uZ2VuLFxuICAgICAgICBwZXJzb24uYWdlLFxuICAgICAgICBwZXJzb24ud2VpZ2h0LFxuICAgICAgICBwZXJzb24uaGVpZ2h0LFxuICAgICAgICBwZXJzb24uc3VtREN1dCxcbiAgICAgICAgcGVyc29uLmF0dkx2bFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHBlcnNvbi5nZW4gPT09IFwiZmVtaW5pbm9cIikge1xuICAgICAgcGVyc29uID0gbmV3IFdvbWFuKFxuICAgICAgICBwZXJzb24uZ2VuLFxuICAgICAgICBwZXJzb24uYWdlLFxuICAgICAgICBwZXJzb24ud2VpZ2h0LFxuICAgICAgICBwZXJzb24uaGVpZ2h0LFxuICAgICAgICBwZXJzb24uc3VtREN1dCxcbiAgICAgICAgcGVyc29uLmF0dkx2bFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHBlcnNvbi5nZW4gPT09IFwibmV1dHJvXCIpIHtcbiAgICAgIHBlcnNvbiA9IG5ldyBOZXV0cm8oXG4gICAgICAgIHBlcnNvbi5nZW4sXG4gICAgICAgIHBlcnNvbi5hZ2UsXG4gICAgICAgIHBlcnNvbi53ZWlnaHQsXG4gICAgICAgIHBlcnNvbi5oZWlnaHQsXG4gICAgICAgIHBlcnNvbi5zdW1EQ3V0LFxuICAgICAgICBwZXJzb24uYXR2THZsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gICAgICBFcnJvckhhbmRsZXIuc3RyaW5nRXJyb3IoXG4gICAgICAgIFwicGVyc29uLmdlblwiLFxuICAgICAgICBwZXJzb24/LmdlbiA/PyBudWxsLFxuICAgICAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICAgICAgKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgICBFcnJvckhhbmRsZXIudHlwZUVycm9yKFxuICAgICAgXCJwZXJzb24uZ2VuXCIsXG4gICAgICBwZXJzb24/LmdlbiA/PyBudWxsLFxuICAgICAgXCJzdHJpbmdcIixcbiAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcGVyc29uO1xufVxuIiwiLy9uZXNzZSBmaWxlIGVzdMOjbyBwcmVzZW50ZXMgcHJpbmNpcGFsbWVudGUgYXMgZnVuw6fDtWVzIGRlIG1hbmlwdWxhw6fDo28gZGluw6JtaWNhIGRlIHRleHRvIGUgbGF5b3V0XG5cbmltcG9ydCAqIGFzIEdsb2JhbE1vZGVsIGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ01vZGVsXCI7XG5pbXBvcnQgKiBhcyBHbG9iYWxIYW5kbGVyIGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZ0hhbmRsZXJzXCI7XG5pbXBvcnQgKiBhcyBFcnJvckhhbmRsZXIgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9lcnJvckhhbmRsZXJcIjtcbmltcG9ydCB7IHRhcmdFbCwgdGV4dEVsIH0gZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy90eXBlc1wiO1xuXG5sZXQgbW92aW5nU3JjSXRlbTogdGFyZ0VsID0gbnVsbDtcbmxldCB0YXJnSXRlbSA9IG51bGw7XG5jb25zdCBjb250SW5RdWFkcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbnRJblF1YWRyc1wiKTtcbmxldCBpc0RpYWxvZ0NhbGxlZCA9IGZhbHNlO1xubGV0IGJsb2NrQ291bnQgPSAxO1xuLy8gY29uc3QgcXVhZHJEZW50c0FycmF5ID0gQXJyYXkuZnJvbShxdWFkckRlbnRzKTsgLy90ZW0gcXVlIHNlciBhcGxpY2FkYSBlbSBBcnJyYXksIG7Do28gY29sZcOnw6NvIEhUTUxcbi8vIGNvbnN0IHF1YWRyRGVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicXVhZHJNYWluRGl2XCIpOyAvL3JldG9ybmEgSFRNTENvbGxlY3Rpb25cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dJbnNwU3BhblN1YihcbiAgY2hhbmdlUmFkaW86IEV2ZW50LFxuICBpbnNwUmFkaW86IEhUTUxJbnB1dEVsZW1lbnRcbikge1xuICBpZiAoY2hhbmdlUmFkaW8udGFyZ2V0ID09PSBpbnNwUmFkaW8pIHtcbiAgICBpZiAoaW5zcFJhZGlvLmNsYXNzTGlzdC5jb250YWlucyhcInJhZFllc1wiKSkge1xuICAgICAgY29uc3QgaXNQYXJlbnRWYWxpZCA9XG4gICAgICAgIGluc3BSYWRpby5wYXJlbnRFbGVtZW50Py5jbGFzc0xpc3QuY29udGFpbnMoXCJpbnNwU3Bhbk1haW5cIik7XG4gICAgICBpZiAoaXNQYXJlbnRWYWxpZCkge1xuICAgICAgICBjb25zdCB2YWxpZFNpYmxpbmcgPSBHbG9iYWxIYW5kbGVyLnNlYXJjaE5leHRTaWJsaW5ncyhcbiAgICAgICAgICBpbnNwUmFkaW8sXG4gICAgICAgICAgXCJpbnNwU3BhblN1YlwiXG4gICAgICAgICk7XG4gICAgICAgIGluc3BSYWRpby5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIGlmICghaW5zcFJhZGlvLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHZhbGlkU2libGluZy5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGluc3BSYWRpby5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgdmFsaWRTaWJsaW5nLnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaW5zcFJhZGlvLmNsYXNzTGlzdC5jb250YWlucyhcInJhZE5vXCIpKSB7XG4gICAgICBjb25zdCBpc1BhcmVudFZhbGlkID1cbiAgICAgICAgaW5zcFJhZGlvLnBhcmVudEVsZW1lbnQ/LmNsYXNzTGlzdC5jb250YWlucyhcImluc3BTcGFuTWFpblwiKTtcbiAgICAgIGlmIChpc1BhcmVudFZhbGlkKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkU2libGluZyA9IEdsb2JhbEhhbmRsZXIuc2VhcmNoTmV4dFNpYmxpbmdzKFxuICAgICAgICAgIGluc3BSYWRpbyxcbiAgICAgICAgICBcImluc3BTcGFuU3ViXCJcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGluc3BSYWRpby5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgdmFsaWRTaWJsaW5nLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJybyB2YWxpZGFuZG8gcGFyZW50RWxlbWVudCBjbGFzcy5cbiAgICAgICAgQ2xhc3NlcyBvYnRpZGFzOiAke2luc3BSYWRpby5wYXJlbnRFbGVtZW50Py5jbGFzc0xpc3QgPz8gXCJOVUxMXCJ9O1xuICAgICAgICBDbGFzc2UgcHJvY3VyYWRhOiBcImluc3BTcGFuTWFpblwiYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93SW5zcERpYWxvZ3MoXG4gIGNsaWNrOiBNb3VzZUV2ZW50LFxuICBpbnNwRGlhbG9nQnRuOiBIVE1MQnV0dG9uRWxlbWVudFxuKSB7XG4gIGlmIChjbGljay50YXJnZXQgPT09IGluc3BEaWFsb2dCdG4pIHtcbiAgICBjb25zdCBjYWxsZWREaWFsb2cgPSBpbnNwRGlhbG9nQnRuLm5leHRFbGVtZW50U2libGluZztcbiAgICBpZiAoY2FsbGVkRGlhbG9nICYmIGNhbGxlZERpYWxvZyBpbnN0YW5jZW9mIEhUTUxEaWFsb2dFbGVtZW50KSB7XG4gICAgICBpZiAoaXNEaWFsb2dDYWxsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGNhbGxlZERpYWxvZy5zaG93KCk7XG4gICAgICAgIGluc3BEaWFsb2dCdG4udGV4dENvbnRlbnQgPSBcIkVzY29uZGVyIFN1Z2VzdMO1ZXNcIjtcbiAgICAgICAgaXNEaWFsb2dDYWxsZWQgPSAhaXNEaWFsb2dDYWxsZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsZWREaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgaW5zcERpYWxvZ0J0bi50ZXh0Q29udGVudCA9IFwiTW9zdHJhciBTdWdlc3TDtWVzXCI7XG4gICAgICAgIGlzRGlhbG9nQ2FsbGVkID0gIWlzRGlhbG9nQ2FsbGVkO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKFxuICAgICAgICBjYWxsZWREaWFsb2cgPz8gbnVsbCxcbiAgICAgICAgXCJjYWxsZWREaWFsb2dcIixcbiAgICAgICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRUZXh0VG9PYnMoY2xpY2s6IE1vdXNlRXZlbnQsIGluc3BMSUJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgaWYgKGNsaWNrLnRhcmdldCA9PT0gaW5zcExJQnRuKSB7XG4gICAgY29uc3QgdmFsaWRUZXh0UGFyZW50ID0gaW5zcExJQnRuLnBhcmVudEVsZW1lbnQ/LmlubmVyVGV4dDtcbiAgICBjb25zdCBmaXhlZFRleHRQYXJlbnQgPSB2YWxpZFRleHRQYXJlbnQ/LnNsaWNlKDAsIC05KTtcbiAgICBjb25zdCB2YWxpZFBhcmVudCA9IEdsb2JhbEhhbmRsZXIuc2VhcmNoUGFyZW50cyhpbnNwTElCdG4sIFwiaW5zcERpYWxvZ1wiKTtcbiAgICBjb25zdCB2YWxpZFBhcmVudFNpYmxpbmcgPSBHbG9iYWxIYW5kbGVyLnNlYXJjaFByZXZpb3VzU2libGluZ3MoXG4gICAgICB2YWxpZFBhcmVudCxcbiAgICAgIFwiaW5zcFRhXCJcbiAgICApO1xuICAgIGlmIChcbiAgICAgIHZhbGlkUGFyZW50U2libGluZyBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHxcbiAgICAgIHZhbGlkUGFyZW50U2libGluZyBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnRcbiAgICApIHtcbiAgICAgIGlmICh2YWxpZFBhcmVudFNpYmxpbmcudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vdGV4dENvbnRlbnQgw6kgY3VtdWxhdGl2byBwZXJzaXN0ZW50ZSwgbWVzbW8gYXDDs3MgcmVtb8Onw6NvIGRlIGNvbnRlw7pkbyBlbSBpbnB1dC90YSwgbG9nbyB1c2FyIC52YWx1ZVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNvbmRpw6fDo28gaWZcIik7XG4gICAgICAgIHZhbGlkUGFyZW50U2libGluZy52YWx1ZSArPSBmaXhlZFRleHRQYXJlbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBsb3dlcmVkRml4ZWRUZXh0UGFyZW50ID0gZml4ZWRUZXh0UGFyZW50Py50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YWxpZFBhcmVudFNpYmxpbmcudmFsdWUgKz0gbG93ZXJlZEZpeGVkVGV4dFBhcmVudDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoXG4gICAgICAgIHZhbGlkUGFyZW50U2libGluZyA/PyBudWxsLFxuICAgICAgICBcInZhbGlkUGFyZW50U2libGluZ1wiLFxuICAgICAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdIb3ZlcihxdWFkckRlbnQ6IEVsZW1lbnQpIHtcbiAgaWYgKHF1YWRyRGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3Qgb3JpZ2luYWxDdXJzb3IgPSBxdWFkckRlbnQuc3R5bGUuY3Vyc29yO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBxdWFkckRlbnQuc3R5bGUuY3Vyc29yID0gXCJncmFiYmluZ1wiO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHF1YWRyRGVudC5zdHlsZS5jdXJzb3IgPSBvcmlnaW5hbEN1cnNvcjtcbiAgICAgICAgaWYgKHF1YWRyRGVudC5zdHlsZS5jdXJzb3IgPT09IFwiZ3JhYmJpbmdcIikge1xuICAgICAgICAgIHF1YWRyRGVudC5zdHlsZS5jdXJzb3IgPSBcImdyYWJcIjtcbiAgICAgICAgfVxuICAgICAgfSwgMjAwMCk7XG4gICAgfSwgMjAwMCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdTdGFydChtb3ZlOiBEcmFnRXZlbnQpIHtcbiAgbW92aW5nU3JjSXRlbSA9IChtb3ZlPy50YXJnZXQgYXMgSFRNTEVsZW1lbnQpID8/IG51bGw7XG4gIGlmIChtb3ZpbmdTcmNJdGVtICYmIG1vdmluZ1NyY0l0ZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgIG1vdmU/LmRhdGFUcmFuc2Zlcj8uc2V0RGF0YShcInRleHQvcGxhaW5cIiwgXCJcIik7IC8vZGVmaW5lIGEgZGF0YSBpbmljaWFsIG5vIGNvbnRhaW5lciBtb2JpbGl6YWRvXG4gICAgZHJhZ1N0YXJ0Q2hpbGRzKGNvbnRJblF1YWRycyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgYEVycm8gcmVjb25oZWNlbmRvIERyYWcgU3RhcnQ6IHRhcmdldCAke21vdmluZ1NyY0l0ZW19LCBjbGFzc2UgJHttb3ZpbmdTcmNJdGVtfWBcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmFnU3RhcnRDaGlsZHMoY29udEluUXVhZHJzOiBFbGVtZW50W10gfCBOb2RlTGlzdE9mPEVsZW1lbnQ+KSB7XG4gIGNvbnRJblF1YWRycy5mb3JFYWNoKChjb250SW5RdWFkcikgPT4ge1xuICAgIGNvbnRJblF1YWRyLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhZ0VudGVyKG1vdmU6IERyYWdFdmVudCkge1xuICBtb3ZlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmFnT3Zlcihtb3ZlOiBEcmFnRXZlbnQpIHtcbiAgbW92ZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhZ0xlYXZlKG1vdmU6IERyYWdFdmVudCkge1xuICBtb3ZlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmFnRHJvcChkcm9wOiBEcmFnRXZlbnQpIHtcbiAgdGFyZ0l0ZW0gPSBkcm9wLnRhcmdldDtcblxuICBpZiAoXG4gICAgbW92aW5nU3JjSXRlbSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG4gICAgdGFyZ0l0ZW0gJiZcbiAgICB0YXJnSXRlbSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG4gICAgbW92aW5nU3JjSXRlbSAhPT0gbnVsbFxuICApIHtcbiAgICBjb25zdCBncmlkU3JjSXRlbUNTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1vdmluZ1NyY0l0ZW0pOyAvL2NhcHR1cmEgZXN0aWxvcyBkYSBzb3VyY2VcbiAgICBjb25zdCBncmlkU3JjSXRlbVN0eWxlID0gbW92aW5nU3JjSXRlbS5zdHlsZTtcbiAgICBjb25zdCBncmlkU3JjSXRlbUNvbHVtbiA9IGdyaWRTcmNJdGVtQ1N0eWxlLmdldFByb3BlcnR5VmFsdWUoXCJncmlkLWNvbHVtblwiKTtcbiAgICBjb25zdCBncmlkU3JjSXRlbVJvdyA9IGdyaWRTcmNJdGVtQ1N0eWxlLmdldFByb3BlcnR5VmFsdWUoXCJncmlkLXJvd1wiKTtcbiAgICBjb25zdCBncmlkVGFyZ0l0ZW1DU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnSXRlbSk7IC8vY2FwdHVyYSBlc3RpbG9zIGRvIHRhcmdldCBuYSDDoXJlYSBkZSBkcm9wXG4gICAgY29uc3QgZ3JpZFRhcmdJdGVtU3R5bGUgPSB0YXJnSXRlbS5zdHlsZTtcbiAgICBjb25zdCBncmlkVGFyZ0l0ZW1Db2x1bW4gPVxuICAgICAgZ3JpZFRhcmdJdGVtQ1N0eWxlLmdldFByb3BlcnR5VmFsdWUoXCJncmlkLWNvbHVtblwiKTtcbiAgICBjb25zdCBncmlkVGFyZ0l0ZW1Sb3cgPSBncmlkVGFyZ0l0ZW1DU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShcImdyaWQtcm93XCIpO1xuXG4gICAgY29uc29sZS5sb2coZ3JpZFNyY0l0ZW1Db2x1bW4pO1xuICAgIGNvbnNvbGUubG9nKGdyaWRTcmNJdGVtUm93KTtcbiAgICBjb25zb2xlLmxvZyhncmlkVGFyZ0l0ZW1Db2x1bW4pO1xuICAgIGNvbnNvbGUubG9nKGdyaWRUYXJnSXRlbVJvdyk7XG4gICAgZ3JpZFNyY0l0ZW1TdHlsZS5zZXRQcm9wZXJ0eShcImdyaWQtY29sdW1uXCIsIGdyaWRUYXJnSXRlbUNvbHVtbik7IC8vZmF6IGEgaW52ZXJzw6NvXG4gICAgZ3JpZFNyY0l0ZW1TdHlsZS5zZXRQcm9wZXJ0eShcImdyaWQtcm93XCIsIGdyaWRUYXJnSXRlbVJvdyk7XG4gICAgZ3JpZFRhcmdJdGVtU3R5bGUuc2V0UHJvcGVydHkoXCJncmlkLWNvbHVtblwiLCBncmlkU3JjSXRlbUNvbHVtbik7XG4gICAgZ3JpZFRhcmdJdGVtU3R5bGUuc2V0UHJvcGVydHkoXCJncmlkLXJvd1wiLCBncmlkU3JjSXRlbVJvdyk7XG5cbiAgICBtb3ZpbmdTcmNJdGVtID0gbnVsbDtcbiAgfVxuICBkcmFnRW5kKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmFnRW5kKCkge1xuICBtb3ZpbmdTcmNJdGVtID0gbnVsbDtcbiAgZHJhZ0VuZENoaWxkcyhjb250SW5RdWFkcnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhZ0VuZENoaWxkcyhjb250SW5RdWFkcnM6IEVsZW1lbnRbXSB8IE5vZGVMaXN0T2Y8RWxlbWVudD4pIHtcbiAgY29udEluUXVhZHJzLmZvckVhY2goKGNvbnRJblF1YWRyKSA9PiB7XG4gICAgY29udEluUXVhZHIuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwiZmFsc2VcIik7XG4gIH0pO1xuICAvLyBjb25zb2xlLmxvZyhcIm8gZHJhZyBkYXMgY2hpbGRzIGZvaSBkZWZpbmlkbyBjb21vIGZhbHNlXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRMYWJlbHMocXVhZHJCdG46IEhUTUxCdXR0b25FbGVtZW50KSB7XG4gIGNvbnN0IHBhcmVudERpdiA9IHF1YWRyQnRuPy5jbG9zZXN0KFwiLnF1YWRyTWFpbkRpdlwiKTtcbiAgY29uc29sZS5sb2cocGFyZW50RGl2KTtcbiAgaWYgKHBhcmVudERpdikge1xuICAgIGNvbnN0IGlubmVyRGl2SW5wcyA9IHBhcmVudERpdi5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbaWRePWlucERdXCIpO1xuICAgIGlmIChpbm5lckRpdklucHMpIHtcbiAgICAgIGlmIChpbm5lckRpdklucHMubGVuZ3RoIDwgOCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYEVycm8gdmFsaWRhbmRvIGlucHV0cyBpbnRlcm5vcyBhbyBxdWFkcmFudGUuIE7Dum1lcm8gdG90YWwgZGUgaW5wdXRzOiAke2lubmVyRGl2SW5wcy5sZW5ndGh9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaW5uZXJEaXZJbnBzLmZvckVhY2goKGlubmVyRGl2SW5wKSA9PiB7XG4gICAgICAgIGlmIChpbm5lckRpdklucCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICBpbm5lckRpdklucC52YWx1ZSA9IFwiSMOtZ2lkb1wiO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChcbiAgICAgICAgaW5uZXJEaXZJbnBzID8/IG51bGwsXG4gICAgICAgIFwiaW5uZXJEaXZJbnBzXCIsXG4gICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoXG4gICAgICBwYXJlbnREaXYgPz8gbnVsbCxcbiAgICAgIFwicGFyZW50RGl2XCIsXG4gICAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyUXVhZHJJbnBzKHF1YWRySW5wOiBFbGVtZW50KSB7XG4gIGlmIChxdWFkcklucCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBpZiAocXVhZHJJbnAubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICBjb25zdCBkbE9wdGlvbnMgPSBxdWFkcklucC5uZXh0RWxlbWVudFNpYmxpbmcuY2hpbGRyZW47XG4gICAgICBjb25zdCBkbE9wdGlvbnNWYWx1ZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGxPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkbE9wdGlvbnNbaV0gaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgICAgICAgIGRsT3B0aW9uc1ZhbHVlcy5wdXNoKChkbE9wdGlvbnNbaV0gYXMgSFRNTE9wdGlvbkVsZW1lbnQpLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRsT3B0aW9uc1ZhbHVlcy5pbmNsdWRlcyhxdWFkcklucC52YWx1ZSkpIHtcbiAgICAgICAgcXVhZHJJbnAudmFsdWUgPSBcIlwiO1xuICAgICAgICBxdWFkcklucC5wbGFjZWhvbGRlciA9IFwiQXBhZ2Fkb1wiO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoXG4gICAgICBxdWFkcklucCA/PyBudWxsLFxuICAgICAgXCJxdWFkcklucFwiLFxuICAgICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTdWJEaXZUcmF0KGNsaWNrOiBNb3VzZUV2ZW50KSB7XG4gIGlmIChcbiAgICBjbGljay50YXJnZXQgJiZcbiAgICBjbGljay50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJlxuICAgIGNsaWNrLnRhcmdldC50YWdOYW1lID09PSBcIkJVVFRPTlwiXG4gICkge1xuICAgIGlmIChjbGljay50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkVHJhdFwiKSkge1xuICAgICAgYmxvY2tDb3VudCsrO1xuICAgICAgY29uc3QgdHJhdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhdENvbnRhaW5lclwiKTtcbiAgICAgIGNvbnN0IG5ld0Jsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgbmV3QmxvY2suY2xhc3NOYW1lID0gXCJjb250VGVyYyBkaXZTdWIgZGl2U3ViVHJhdFwiO1xuICAgICAgbmV3QmxvY2suaWQgPSBgZGl2U3ViVHJhdCR7YmxvY2tDb3VudH1gO1xuICAgICAgbmV3QmxvY2suaW5uZXJIVE1MID0gYFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29udFF1YXQgc3Bhbk1haW4gdHJhdE1haW5TcGFuIHRyYXROdW1TcGFuXCIgaWQ9XCJ0cmF0TnVtU3BhbiR7YmxvY2tDb3VudH1cIj4gXG4gICAgICAgICAgJHtibG9ja0NvdW50fSYjNDFcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb250UXVhdCBzcGFuTWFpbiB0cmF0TWFpblNwYW4gdHJhdERhdGVTcGFuXCIgaWQ9XCJ0cmF0RGF0ZVNwYW4ke2Jsb2NrQ291bnR9XCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwidHJhdERhdGVJbnBJZCR7YmxvY2tDb3VudH1cIiBjbGFzcz1cImNvbnRRdWludCB0cmF0TGFiZWxcIj5EYXRhPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJ0cmF0RGF0ZUlucE5hbWUke2Jsb2NrQ291bnR9XCIgaWQ9XCJ0cmF0RGF0ZUlucElkJHtibG9ja0NvdW50fVwiIGNsYXNzPVwiaW5wVHJhdCB0cmF0RGF0ZVwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNvbnRRdWludCBkYXRCdG5cIiBpZD1cInRyYXQke2Jsb2NrQ291bnR9RGF0QnRuXCI+VXNhciBkYXRhIGF0dWFsPC9idXR0b24+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29udFF1YXQgc3Bhbk1haW4gdHJhdE1haW5TcGFuIHRyYXRUeXBlU3BhblwiIGlkPVwidHJhdFR5cGVTcGFuJHtibG9ja0NvdW50fVwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRhVHJhdElkJHtibG9ja0NvdW50fVwiIGNsYXNzPVwiY29udFF1aW50IHRyYXRUYWxhYlwiIGlkPVwibGFiVHJhdFRpcCR7YmxvY2tDb3VudH1cIj5UaXBvIGRlIFRyYXRhbWVudG88L2xhYmVsPlxuICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJ0YVRyYXROYW1lMVwiIGlkPVwidGFUcmF0SWQke2Jsb2NrQ291bnR9XCIgY2xhc3M9XCJ0YVRyYXRcIiByZXF1aXJlZD48L3RleHRhcmVhPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbnRRdWF0IHNwYW5NYWluIHRyYXRNYWluU3BhbiB0cmF0RmlsZVNwYW5cIiBpZD1cInRyYXRGaWxlU3BhbiR7YmxvY2tDb3VudH1cIj5cbiAgICAgICAgICAgIDxzcGFuIGlkPVwic3BhbkFzdFRyYXRJZCR7YmxvY2tDb3VudH1cIiBjbGFzcz1cImNvbnRRdWludCB0cmF0TGFiZWwgbGFiQXN0XCI+QXNzaW5hdHVyYTwvc3Bhbj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpbnBBc3RUcmF0TmFtZSR7YmxvY2tDb3VudH1cIiBpZD1cImlucEFzdFRyYXRJZCR7YmxvY2tDb3VudH1cIlxuICAgICAgICAgICAgY2xhc3M9XCJjb250UXVpbnQgaW5wVHJhdCBpbnBBc3QgdHJhdEFzdFwiIC8+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNvbnRRdWludCBhc3REaWd0QnRuIGNvbmZpcm1CdG5cIiBcbiAgICAgICAgICAgIGlkPVwidHJhdCR7YmxvY2tDb3VudH1Bc3REaWd0QnRuXCI+VXNhciBBc3NpbmF0dXJhIERpZ2l0YWw8L2J1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb250UXVhdCBzcGFuTWFpbiB0cmF0TWFpblNwYW4gdHJhdEJ1dFNwYW5cIiBpZD1cInRyYXRCdXRTcGFuJHtibG9ja0NvdW50fVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cImFkZFRyYXROYW1lJHtibG9ja0NvdW50fVwiIGlkPVwiYWRkVHJhdElkJHtibG9ja0NvdW50fVwiIGNsYXNzPVwiYWRkVHJhdCBjb3VudFRyYXRcIlxuICAgICAgICAgICAgdmFsdWU9XCJhZGRUcmF0XCI+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBcbiAgICAgICAgICAgICAgaWQ9XCJhZGRUcmF0U3ZnJHtibG9ja0NvdW50fVwiIGNsYXNzPVwicGx1c0J1dFN2ZyBiaSBiaS1wbHVzLXNxdWFyZS1maWxsIGNvdW50VHJhdFN2Z1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIgMGEyIDIgMCAwIDAtMiAydjEyYTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlYyYTIgMiAwIDAgMC0yLTJIMnptNi41IDQuNXYzaDNhLjUuNSAwIDAgMSAwIDFoLTN2M2EuNS41IDAgMCAxLTEgMHYtM2gtM2EuNS41IDAgMCAxIDAtMWgzdi0zYS41LjUgMCAwIDEgMSAwelwiLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJyZW1vdmVUcmF0TmFtZTFcIiBpZD1cInJlbW92ZVRyYXRJZCR7YmxvY2tDb3VudH1cIlxuICAgICAgICAgICAgY2xhc3M9XCJyZW1vdmVUcmF0IGNvdW50VHJhdFwiIHZhbHVlPVwicmVtb3ZlVHJhdFwiPlxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgXG4gICAgICAgICAgICAgIGlkPVwicmVtb3ZlVHJhdFN2ZyR7YmxvY2tDb3VudH1cIiBjbGFzcz1cIm1pbnVzQnV0U3ZnIGJpIGJpLWRhc2gtc3F1YXJlLWZpbGwgY291bnRUcmF0U3ZnXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMiAwYTIgMiAwIDAgMC0yIDJ2MTJhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjJhMiAyIDAgMCAwLTItMkgyem0yLjUgNy41aDdhLjUuNSAwIDAgMSAwIDFoLTdhLjUuNSAwIDAgMSAwLTF6XCIvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvc3Bhbj4gICBcbiAgICAgICAgYDtcbiAgICAgIHRyYXRDb250YWluZXI/LmFwcGVuZENoaWxkKG5ld0Jsb2NrKTtcbiAgICAgIGNvbnN0IGRhdGVCdG5zID0gbmV3QmxvY2sucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2lkJD1cIkRhdEJ0blwiXScpO1xuICAgICAgY29uc3QgdGV4dElucHV0cyA9IG5ld0Jsb2NrLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XG4gICAgICBjb25zdCB0ZXh0YXJlYXMgPSBuZXdCbG9jay5xdWVyeVNlbGVjdG9yQWxsKFwidGV4dGFyZWFcIik7XG4gICAgICBjb25zdCB0ZXh0Q29udHMgPSBbLi4udGV4dElucHV0cywgLi4udGV4dGFyZWFzXTtcbiAgICAgIGNvbnN0IGFzdERpZ3RCdG5zID0gbmV3QmxvY2sucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2lkJD1cIkFzdERpZ3RCdG4nKTtcblxuICAgICAgZm9yIChsZXQgaUQgPSAwOyBpRCA8IGRhdGVCdG5zLmxlbmd0aDsgaUQrKykge1xuICAgICAgICBkYXRlQnRuc1tpRF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChhY3RpdmF0aW9uKSA9PlxuICAgICAgICAgIEdsb2JhbEhhbmRsZXIudXNlQ3VycmVudERhdGUoXG4gICAgICAgICAgICBhY3RpdmF0aW9uLFxuICAgICAgICAgICAgZGF0ZUJ0bnNbaURdIGFzIEhUTUxCdXR0b25FbGVtZW50XG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaVQgPSAwOyBpVCA8IHRleHRDb250cy5sZW5ndGg7IGlUKyspIHtcbiAgICAgICAgdGV4dENvbnRzW2lUXS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT5cbiAgICAgICAgICBHbG9iYWxNb2RlbC5hdXRvQ2FwaXRhbGl6ZUlucHV0cyh0ZXh0Q29udHNbaVRdIGFzIHRleHRFbClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGlBID0gMDsgaUEgPCBhc3REaWd0QnRucy5sZW5ndGg7IGlBKyspIHtcbiAgICAgICAgYXN0RGlndEJ0bnNbaUFdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoYWN0aXZhdGlvbjogRXZlbnQpID0+XG4gICAgICAgICAgR2xvYmFsSGFuZGxlci5jaGFuZ2VUb0FzdERpZ2l0KFxuICAgICAgICAgICAgYWN0aXZhdGlvbiBhcyBNb3VzZUV2ZW50LFxuICAgICAgICAgICAgYXN0RGlndEJ0bnNbaUFdIGFzIEhUTUxCdXR0b25FbGVtZW50XG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2xpY2sudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJlbW92ZVRyYXRcIikpIHtcbiAgICAgIGNvbnN0IGRpdlRvUmVtb3ZlID0gY2xpY2sudGFyZ2V0LmNsb3Nlc3QoXCIuY29udFRlcmMuZGl2U3ViLmRpdlN1YlRyYXRcIik7XG4gICAgICBpZiAoZGl2VG9SZW1vdmUgJiYgYmxvY2tDb3VudCAhPT0gMSAmJiBkaXZUb1JlbW92ZS5pZCAhPT0gXCJkaXZTdWJUcmF0MVwiKSB7XG4gICAgICAgIGRpdlRvUmVtb3ZlLnJlbW92ZSgpO1xuICAgICAgICBibG9ja0NvdW50IC09IDE7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNsaWNlZEVycm9yID1cbiAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChcbiAgICAgIChjbGljaz8udGFyZ2V0IGFzIEhUTUxFbGVtZW50KSA/PyBudWxsLFxuICAgICAgXCJ0YXJnZXQgPGJ1dHRvbj5cIixcbiAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgKTtcbiAgfVxufVxuIiwiLy9uZXNzZSBmaWxlIGVzdMOjbyBwcmVzZW50ZXMgcHJpbmNpcGFsbWVudGUgYXMgZnVuw6fDtWVzIHJlbGFjaW9uYWRhcyDDoCBleGlnw6puY2lhIGRlIG1vZGVsbyB0ZXh0dWFsIGUgZGUgdmlzdWFsaXphw6fDo29cblxuaW1wb3J0ICogYXMgRXJyb3JIYW5kbGVyIGZyb20gXCIuLi8uLi9nbG9iYWwtc2NyaXB0cy9zcmMvZXJyb3JIYW5kbGVyXCI7XG5cbmNvbnN0IHN1YkRpdnNRdWFkcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnF1YWRyU3ViRGl2XCIpO1xubGV0IGlzVmFsdWVQcmVEZWYgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0QXZEZW50VmFsdWUoXG4gIHNlbGVjdElucDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50XG4pIHtcbiAgY29uc3QgdGFyZ0lucCA9IHNlbGVjdElucDtcbiAgY29uc3QgdGFyZ1ZhbHVlID0gdGFyZ0lucC52YWx1ZTtcbiAgY29uc3QgZGxPcHRpb25zQ29sbGVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlbGVtT3BcIik7XG4gIGNvbnN0IGRsT3B0aW9uc0FycmF5ID0gQXJyYXkuZnJvbShkbE9wdGlvbnNDb2xsZWN0aW9uKTtcblxuICBpZiAoXG4gICAgZGxPcHRpb25zQXJyYXkuZXZlcnkoKGRsT3B0aW9uKSA9PiBkbE9wdGlvbiBpbnN0YW5jZW9mIEhUTUxPcHRpb25FbGVtZW50KVxuICApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRsT3B0aW9uc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoKGRsT3B0aW9uc0FycmF5W2ldIGFzIEhUTUxPcHRpb25FbGVtZW50KS52YWx1ZSA9PT0gdGFyZ1ZhbHVlKSB7XG4gICAgICAgIGlzVmFsdWVQcmVEZWYgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGFyZ0lucCAmJiBpc1ZhbHVlUHJlRGVmICYmIHRhcmdJbnAgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRhcmdJbnAudmFsdWUgPSBcIlwiO1xuICAgICAgICBpc1ZhbHVlUHJlRGVmID0gZmFsc2U7XG4gICAgICB9LCAxMDApO1xuICAgICAgdGFyZ0lucC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIkFwYWdhZG9cIik7XG4gICAgICBjb25zdCBwbGFjZWhvbGRlclRpbWVyID0gc2V0VGltZW91dChcbiAgICAgICAgKCkgPT4gdGFyZ0lucC5jbGFzc0xpc3QuYWRkKFwicGxhY2Vob2xkZXItaGlkZGVuXCIpLFxuICAgICAgICAxMDAwXG4gICAgICApO1xuICAgICAgdGFyZ0lucC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB7XG4gICAgICAgIHRhcmdJbnAuY2xhc3NMaXN0LnJlbW92ZShcInBsYWNlaG9sZGVyLWhpZGRlblwiKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHBsYWNlaG9sZGVyVGltZXIpO1xuICAgICAgfSk7XG4gICAgICB0YXJnSW5wLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiB7XG4gICAgICAgIHRhcmdJbnAuY2xhc3NMaXN0LnJlbW92ZShcInBsYWNlaG9sZGVyLWhpZGRlblwiKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHBsYWNlaG9sZGVyVGltZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGxPcHRpb25zQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgIShkbE9wdGlvbnNBcnJheVtpXSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHwgSFRNTFRleHRBcmVhRWxlbWVudClcbiAgICAgICkge1xuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoXG4gICAgICAgICAgZGxPcHRpb25zQXJyYXlbaV0gPz8gbnVsbCxcbiAgICAgICAgICBgJHtkbE9wdGlvbnNBcnJheVtpXT8uaWQgPz8gXCJVTkRFRklORUQgSUQgRExPUFRJT05cIn1gLFxuICAgICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcmRlckxhYmVscygpIHtcbiAgc3ViRGl2c1F1YWRycy5mb3JFYWNoKChzdWJEaXYpID0+IHtcbiAgICBjb25zdCBsYWJzTkxpc3QgPSBzdWJEaXYucXVlcnlTZWxlY3RvckFsbChcIi5sYWJlbEF2RGVudFwiKTtcbiAgICBpZiAobGFic05MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGZpcnN0TGFiSWQgPSBsYWJzTkxpc3RbMF0uaWQ7XG4gICAgICBjb25zdCBmaXJzdExhYk51bVN0ciA9IGZpcnN0TGFiSWQubWF0Y2goL1xcZCsvKTtcbiAgICAgIGlmIChmaXJzdExhYk51bVN0ciAhPT0gbnVsbCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhYnNOTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG5PcmRlciA9IChpICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICBpZiAobGFic05MaXN0W2ldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG4gICAgICAgICAgICAobGFic05MaXN0W2ldIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5zZXRQcm9wZXJ0eShcIm9yZGVyXCIsIG5PcmRlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoXG4gICAgICAgIGxhYnNOTGlzdCA/PyBudWxsLFxuICAgICAgICBcImxhYnNOTElTVFwiLFxuICAgICAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL25lc3NlIGZpbGUgb2NvcnJlbSBwcmluY2lwYWxtZW50ZSBhcyBhZGnDp8O1ZXMgZGUgbGlzdGVuZXJzLCBzaW5jcm9uaXphw6fDo28gZGFzIGNoYW1hZGFzIGRlIGZ1bsOnw7VlcyBwYXJhIG1hbmlwdWxhw6fDo28gZGUgaW5mb3JtYcOnw6NvL2xheW91dCBlIHZhbGlkYcOnw6NvIGRvcyBlbGVtZW50b3Mgbm8gRE9NXG5cbmltcG9ydCAqIGFzIE9kSGFuZGxlciBmcm9tIFwiLi9vZEhhbmRsZXJcIjtcbmltcG9ydCAqIGFzIE9kTW9kZWwgZnJvbSBcIi4vb2RNb2RlbFwiO1xuaW1wb3J0ICogYXMgR2xvYmFsTW9kZWwgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9nTW9kZWxcIjtcbmltcG9ydCAqIGFzIEdsb2JhbEhhbmRsZXIgZnJvbSBcIi4uLy4uL2dsb2JhbC1zY3JpcHRzL3NyYy9nSGFuZGxlcnNcIjtcbmltcG9ydCAqIGFzIEVycm9ySGFuZGxlciBmcm9tIFwiLi4vLi4vZ2xvYmFsLXNjcmlwdHMvc3JjL2Vycm9ySGFuZGxlclwiO1xuXG4vL2luaWNpYWxpemHDp8OjbyBkZSBjb25zdGFudGVzIHBlcmNvcnJlbmRvIG8gRE9NXG5jb25zdCB0ZXh0SW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcbmNvbnN0IHRleHRhcmVhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZXh0YXJlYVwiKTtcbmNvbnN0IHRleHRDb250cyA9IFsuLi50ZXh0SW5wdXRzLCAuLi50ZXh0YXJlYXNdO1xuY29uc3QgcmFkaW9CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XG5jb25zdCBpbnNwUmFkaW9zWWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgJ2lucHV0W2NsYXNzPVwiY29udFF1aW50IHJhZE9wIHJhZFllc1wiXSdcbik7XG5jb25zdCBpbnNwUmFkaW9zTm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnaW5wdXRbY2xhc3M9XCJjb250UXVpbnQgcmFkT3AgcmFkTm9cIl0nXG4pO1xuY29uc3QgaW5zcERpYWxvZ3NCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgJ2J1dHRvbltpZF49XCJpbnNwRGlhbG9nQnRuXCJdJ1xuKTtcbmNvbnN0IGluc3BMSUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25baWRePVwiaW5zcExJQnRuXCJdJyk7XG5jb25zdCBxdWFkckRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInF1YWRyTWFpbkRpdlwiKTtcbmNvbnN0IHF1YWRyRGVudHNBcnJheSA9IEFycmF5LmZyb20ocXVhZHJEZW50cyk7XG5jb25zdCBhdkVsZW1EZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbnBBdkRlbnRcIik7XG5jb25zdCBhdkVsZW1EZW50c0FycmF5ID0gQXJyYXkuZnJvbShhdkVsZW1EZW50cyk7XG5jb25zdCB0cmF0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmF0Q29udGFpbmVyXCIpO1xuY29uc3QgZGF0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25baWQkPVwiRGF0QnRuXCJdJyk7XG5jb25zdCBlZGl0YWJsZUNpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjaXRlW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0nKTtcbmNvbnN0IGRlYWN0QXV0b2NvcnJlY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgJ2J1dHRvbltpZF49XCJkZWFjdEF1dG9jb3JyZWN0QnRuXCJdJ1xuKTtcbmNvbnN0IGFzdERpZ3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2lkJD1cIkFzdERpZ3RCdG4nKTtcbmNvbnN0IHJlc2V0Rm9ybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXRGb3JtQnRuXCIpO1xuY29uc3Qgc3ViQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRGb3JtQnV0SWRcIik7XG5jb25zdCBxdWFkcklucHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtpZF49XCJpbnBEXCJdJyk7XG5jb25zdCByZXNldERpdnNRdWFkcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJlc2V0QnV0XCIpO1xuLy8gY29uc3QgaW5zcFNwYW5TdWJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImluc3BTcGFuU3ViXCIpO1xuLy8gY29uc3QgaW5zcFNwYW5TdWJzQXJyYXkgPSBBcnJheS5mcm9tKGluc3BTcGFuU3Vicyk7XG4vLyBjb25zdCB0cmF0VHlwZVNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3BhbltpZF49XCJ0cmF0VHlwZVNwYW5cIl0nKTtcbi8vIGNvbnN0IHRhVHJhdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGV4dGFyZWFbaWRePXRhVHJhdFwiKVxuLy8gY29uc3Qgc3ViRGl2c1F1YWRycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucXVhZHJTdWJEaXZcIik7XG4vLyBsZXQgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuLy8gbGV0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcblxuLy92YWxpZGHDp8OjbyBkZSBjb25zdGFudGVzIGUgYWRpw6fDo28gZGUgbGlzdGVuZXJzXG5pZiAodGV4dENvbnRzLmxlbmd0aCA+IDApIHtcbiAgdGV4dENvbnRzLmZvckVhY2goZnVuY3Rpb24gKHRleHRDb250KSB7XG4gICAgdGV4dENvbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgaWYgKFxuICAgICAgICBpbnB1dC50YXJnZXQgJiZcbiAgICAgICAgKGlucHV0LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgfHxcbiAgICAgICAgICBpbnB1dC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KVxuICAgICAgKSB7XG4gICAgICAgIEdsb2JhbE1vZGVsLmF1dG9DYXBpdGFsaXplSW5wdXRzKGlucHV0LnRhcmdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoXG4gICAgICAgICAgKGlucHV0Py50YXJnZXQgYXMgSFRNTEVsZW1lbnQpID8/IG51bGwsXG4gICAgICAgICAgXCJ0YXJnZXQgdGV4dENvbnRcIixcbiAgICAgICAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn0gZWxzZSB7XG4gIGNvbnN0IHNsaWNlZEVycm9yID1cbiAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChcbiAgICB0ZXh0Q29udHMgPz8gbnVsbCxcbiAgICBcInRleHRDb250c1wiLFxuICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICk7XG59XG5cbmlmIChyYWRpb0J1dHRvbnMubGVuZ3RoID4gMCkge1xuICByYWRpb0J1dHRvbnMuZm9yRWFjaCgocmFkaW8pID0+IHtcbiAgICBpZiAocmFkaW8gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIHJhZGlvLnR5cGUgPT09IFwicmFkaW9cIikge1xuICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGtleWRvd24pID0+IHtcbiAgICAgICAgR2xvYmFsSGFuZGxlci5vcFJhZGlvSGFuZGxlcihrZXlkb3duKTtcbiAgICAgIH0pO1xuICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsICgpID0+XG4gICAgICAgIEdsb2JhbEhhbmRsZXIuZG91YmxlQ2xpY2tIYW5kbGVyKHJhZGlvKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoXG4gICAgICAgIHJhZGlvID8/IG51bGwsXG4gICAgICAgIGAke3JhZGlvPy5pZCB8fCBcIlVOREVGSU5FRCBJRCBSQURJT1wifWAsXG4gICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoXG4gICAgcmFkaW9CdXR0b25zID8/IG51bGwsXG4gICAgXCJyYWRpb0J1dHRvbnNcIixcbiAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICApO1xufVxuXG5pZiAoaW5zcFJhZGlvc1llcy5sZW5ndGggPiAwKSB7XG4gIGluc3BSYWRpb3NZZXMuZm9yRWFjaCgoaW5zcFJhZGlvWWVzKSA9PiB7XG4gICAgaWYgKFxuICAgICAgaW5zcFJhZGlvWWVzIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxuICAgICAgKGluc3BSYWRpb1llcy50eXBlID09PSBcInJhZGlvXCIgfHwgaW5zcFJhZGlvWWVzLnR5cGUgPT09IFwiY2hlY2tib3hcIilcbiAgICApIHtcbiAgICAgIGluc3BSYWRpb1llcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrUmFkaW8pID0+XG4gICAgICAgIE9kSGFuZGxlci5zaG93SW5zcFNwYW5TdWIoY2xpY2tSYWRpbywgaW5zcFJhZGlvWWVzKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoXG4gICAgICAgIGluc3BSYWRpb1llcyA/PyBudWxsLFxuICAgICAgICBgJHtpbnNwUmFkaW9ZZXM/LmlkIHx8IFwiVU5ERUZJTkVEIElEIFlFUyBJTlBVVFwifWAsXG4gICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoXG4gICAgaW5zcFJhZGlvc1llcyA/PyBudWxsLFxuICAgIFwiaW5zcFJhZGlvWWVzXCIsXG4gICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgKTtcbn1cblxuaWYgKGluc3BSYWRpb3NOby5sZW5ndGggPiAwKSB7XG4gIGluc3BSYWRpb3NOby5mb3JFYWNoKChpbnNwUmFkaW9ObykgPT4ge1xuICAgIGlmIChcbiAgICAgIGluc3BSYWRpb05vIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJlxuICAgICAgKGluc3BSYWRpb05vLnR5cGUgPT09IFwicmFkaW9cIiB8fCBpbnNwUmFkaW9Oby50eXBlID09PSBcImNoZWNrYm94XCIpXG4gICAgKSB7XG4gICAgICBpbnNwUmFkaW9Oby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrUmFkaW8pID0+XG4gICAgICAgIE9kSGFuZGxlci5zaG93SW5zcFNwYW5TdWIoY2xpY2tSYWRpbywgaW5zcFJhZGlvTm8pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gICAgICBFcnJvckhhbmRsZXIuaW5wdXROb3RGb3VuZChcbiAgICAgICAgaW5zcFJhZGlvTm8gPz8gbnVsbCxcbiAgICAgICAgYCR7aW5zcFJhZGlvTm8/LmlkIHx8IFwiVU5ERUZJTkVEIElEIFlFUyBJTlBVVFwifWAsXG4gICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoXG4gICAgaW5zcFJhZGlvc05vID8/IG51bGwsXG4gICAgXCJpbnNwUmFkaW9Ob1wiLFxuICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICk7XG59XG5cbmlmIChpbnNwRGlhbG9nc0J0bnMubGVuZ3RoID4gMCkge1xuICBpbnNwRGlhbG9nc0J0bnMuZm9yRWFjaCgoaW5zcERpYWxvZ0J0bikgPT4ge1xuICAgIGlmIChpbnNwRGlhbG9nQnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgIGluc3BEaWFsb2dCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChjbGljaykgPT5cbiAgICAgICAgT2RIYW5kbGVyLnNob3dJbnNwRGlhbG9ncyhjbGljaywgaW5zcERpYWxvZ0J0bilcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNsaWNlZEVycm9yID1cbiAgICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoXG4gICAgICAgIGluc3BEaWFsb2dCdG4gPz8gbnVsbCxcbiAgICAgICAgYCR7aW5zcERpYWxvZ0J0bj8uaWQgfHwgXCJVTkRFRklORUQgSUQgRElBTE9HIEJVVFRPTlwifWAsXG4gICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoXG4gICAgaW5zcERpYWxvZ3NCdG5zID8/IG51bGwsXG4gICAgXCJpbnNwRGlhbG9nc0J0bnNcIixcbiAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICApO1xufVxuXG5pZiAoaW5zcExJQnRucy5sZW5ndGggPiAwKSB7XG4gIGluc3BMSUJ0bnMuZm9yRWFjaCgoaW5zcExJQnRuKSA9PiB7XG4gICAgaWYgKGluc3BMSUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICBpbnNwTElCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChjbGljaykgPT5cbiAgICAgICAgT2RIYW5kbGVyLmFkZFRleHRUb09icyhjbGljaywgaW5zcExJQnRuKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChcbiAgICAgICAgaW5zcExJQnRuID8/IG51bGwsXG4gICAgICAgIGAke2luc3BMSUJ0bj8uaWQgfHwgXCJVTkRFRklORUQgSUQgTEkgQlVUVE9OXCJ9YCxcbiAgICAgICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIGNvbnN0IHNsaWNlZEVycm9yID1cbiAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChcbiAgICBpbnNwTElCdG5zID8/IG51bGwsXG4gICAgXCJpbnNwTElCdG5zXCIsXG4gICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgKTtcbn1cblxuaWYgKHF1YWRyRGVudHNBcnJheS5sZW5ndGggPiAwKSB7XG4gIHF1YWRyRGVudHNBcnJheS5mb3JFYWNoKChxdWFkckRlbnQpID0+IHtcbiAgICBpZiAocXVhZHJEZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIHF1YWRyRGVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsICgpID0+XG4gICAgICAgIE9kSGFuZGxlci5kcmFnSG92ZXIocXVhZHJEZW50KVxuICAgICAgKTtcbiAgICAgIHF1YWRyRGVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIE9kSGFuZGxlci5kcmFnU3RhcnQpO1xuICAgICAgcXVhZHJEZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgT2RIYW5kbGVyLmRyYWdFbnRlcik7XG4gICAgICBxdWFkckRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIE9kSGFuZGxlci5kcmFnT3Zlcik7XG4gICAgICBxdWFkckRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCBPZEhhbmRsZXIuZHJhZ0xlYXZlKTtcbiAgICAgIHF1YWRyRGVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBPZEhhbmRsZXIuZHJhZ0Ryb3ApO1xuICAgICAgcXVhZHJEZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIE9kSGFuZGxlci5kcmFnRW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChcbiAgICAgICAgcXVhZHJEZW50ID8/IG51bGwsXG4gICAgICAgIGAke3F1YWRyRGVudD8uaWQgPz8gXCJVTkRFRklORUQgUVVBRFJBTlQgSURcIn1gLFxuICAgICAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufSBlbHNlIHtcbiAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gIEVycm9ySGFuZGxlci5lbGVtZW50Tm90UG9wdWxhdGVkKFxuICAgIHF1YWRyRGVudHNBcnJheSA/PyBudWxsLFxuICAgIFwicXVhZHJEZW50c0FycmF5XCIsXG4gICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgKTtcbn1cblxuaWYgKGF2RWxlbURlbnRzQXJyYXkubGVuZ3RoID4gMCkge1xuICBhdkVsZW1EZW50c0FycmF5LmZvckVhY2goKGF2RWxlbURlbnQpID0+IHtcbiAgICBhdkVsZW1EZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGF2RWxlbURlbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCB8fFxuICAgICAgICBIVE1MU2VsZWN0RWxlbWVudCB8fFxuICAgICAgICBIVE1MSW5wdXRFbGVtZW50XG4gICAgICApIHtcbiAgICAgICAgT2RNb2RlbC5yZXNldEF2RGVudFZhbHVlKFxuICAgICAgICAgIGF2RWxlbURlbnQgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChcbiAgICAgICAgICBhdkVsZW1EZW50ID8/IG51bGwsXG4gICAgICAgICAgYCR7YXZFbGVtRGVudD8uaWQgPz8gXCJVTkRFRklORUQgSUQgRUxFTUVOVFwifWAsXG4gICAgICAgICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59IGVsc2Uge1xuICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoXG4gICAgYXZFbGVtRGVudHNBcnJheSA/PyBudWxsLFxuICAgIFwiYXZFbGVtRGVudHNBcnJheVwiLFxuICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICk7XG59XG5cbmlmIChxdWFkcklucHMubGVuZ3RoID4gMCkge1xuICBxdWFkcklucHMuZm9yRWFjaCgocXVhZHJJbnApID0+IHtcbiAgICBpZiAocXVhZHJJbnAgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICBxdWFkcklucC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgICAgT2RIYW5kbGVyLmNsZWFyUXVhZHJJbnBzKHF1YWRySW5wKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmlucHV0Tm90Rm91bmQoXG4gICAgICAgIHF1YWRySW5wID8/IG51bGwsXG4gICAgICAgIGAke3F1YWRySW5wPy5pZCA/PyBcIlVOREVGSU5FRCBRVUFEUkFOVCBJTlBVVCBJRFwifWAsXG4gICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoXG4gICAgcXVhZHJJbnBzID8/IG51bGwsXG4gICAgXCJxdWFkcklucHNcIixcbiAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICApO1xufVxuXG5pZiAocmVzZXREaXZzUXVhZHJzLmxlbmd0aCA+IDApIHtcbiAgcmVzZXREaXZzUXVhZHJzLmZvckVhY2goKHJlc2V0QnRuKSA9PiB7XG4gICAgaWYgKHJlc2V0QnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIE9kSGFuZGxlci5yZXNldExhYmVscyhyZXNldEJ0bik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChcbiAgICAgICAgcmVzZXRCdG4gPz8gbnVsbCxcbiAgICAgICAgYCR7cmVzZXRCdG4/LmlkID8/IFwiVU5ERUZJTkVEIElEIFJFU0VUIEJVVFRPTlwifWAsXG4gICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoXG4gICAgcmVzZXREaXZzUXVhZHJzID8/IG51bGwsXG4gICAgXCJyZXNldERpdnNRYXVkcnNcIixcbiAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICApO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIE9kTW9kZWwub3JkZXJMYWJlbHMoKTtcbn0pO1xuXG5pZiAodHJhdENvbnRhaW5lciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gIHRyYXRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChjbGljaykgPT5cbiAgICBPZEhhbmRsZXIuYWRkU3ViRGl2VHJhdChjbGljaylcbiAgKTtcbn0gZWxzZSB7XG4gIGNvbnN0IHNsaWNlZEVycm9yID1cbiAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKFxuICAgIHRyYXRDb250YWluZXIgPz8gbnVsbCxcbiAgICBcInRyYXRDb250YWluZXJcIixcbiAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICApO1xufVxuXG5pZiAoZGF0ZUJ0bnMubGVuZ3RoID4gMCkge1xuICBkYXRlQnRucy5mb3JFYWNoKGZ1bmN0aW9uIChkYXRlQnRuKSB7XG4gICAgaWYgKGRhdGVCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgZGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGFjdGl2YXRpb24pID0+IHtcbiAgICAgICAgR2xvYmFsSGFuZGxlci51c2VDdXJyZW50RGF0ZShhY3RpdmF0aW9uLCBkYXRlQnRuKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKFxuICAgICAgICBkYXRlQnRuID8/IG51bGwsXG4gICAgICAgIGAke2RhdGVCdG4/LmlkIHx8IFwiVU5ERUZJTkVEIElEIERBVEUgQlVUVE9OXCJ9YCxcbiAgICAgICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIGNvbnN0IHNsaWNlZEVycm9yID1cbiAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChcbiAgICBkYXRlQnRucyA/PyBudWxsLFxuICAgIFwiZGF0ZUJ0bnNcIixcbiAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICApO1xufVxuXG5pZiAoZWRpdGFibGVDaXRlKSB7XG4gIGxldCBmaXJzdENsaWNrID0gdHJ1ZTtcbiAgY29uc3QgY2l0ZUNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uIChjbGljazogRXZlbnQpIHtcbiAgICBpZiAoZmlyc3RDbGljayAmJiBjbGljay50YXJnZXQgJiYgY2xpY2sudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIEdsb2JhbE1vZGVsLnJlbW92ZUZpcnN0Q2xpY2soY2xpY2sudGFyZ2V0KTtcbiAgICAgIGZpcnN0Q2xpY2sgPSBmYWxzZTtcbiAgICAgIGVkaXRhYmxlQ2l0ZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2l0ZUNsaWNrSGFuZGxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNsaWNlZEVycm9yID1cbiAgICAgICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgICAgIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoXG4gICAgICAgIChjbGljaz8udGFyZ2V0IGFzIEhUTUxFbGVtZW50KSA/PyBudWxsLFxuICAgICAgICBcImNsaWNrIHRhcmdldCBlZGl0YWJsZUNpdGVcIixcbiAgICAgICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgICAgICk7XG4gICAgfVxuICB9O1xuICBlZGl0YWJsZUNpdGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChrZXlwcmVzcykge1xuICAgIGlmIChrZXlwcmVzcy50YXJnZXQgJiYga2V5cHJlc3MudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIEdsb2JhbE1vZGVsLmF1dG9DYXBpdGFsaXplQ2l0ZShrZXlwcmVzcy50YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gICAgICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKFxuICAgICAgICAoa2V5cHJlc3M/LnRhcmdldCBhcyBIVE1MRWxlbWVudCkgPz8gbnVsbCxcbiAgICAgICAgXCJrZXlwcmVzcyB0YXJnZXQgZWRpdGFibGVDaXRlXCIsXG4gICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG4gIGVkaXRhYmxlQ2l0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2l0ZUNsaWNrSGFuZGxlcik7XG59IGVsc2Uge1xuICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChudWxsLCBcImVkaXRhYmxlQ2l0ZVwiLCBzbGljZWRFcnJvciA/PyBcIk5VTExcIik7XG59XG5cbmlmIChhc3REaWd0QnRucy5sZW5ndGggPiAwKSB7XG4gIGFzdERpZ3RCdG5zLmZvckVhY2goZnVuY3Rpb24gKGFzdERpZ3RCdG4pIHtcbiAgICBpZiAoYXN0RGlndEJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICBhc3REaWd0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoY2xpY2spIHtcbiAgICAgICAgcmV0dXJuIEdsb2JhbEhhbmRsZXIuY2hhbmdlVG9Bc3REaWdpdChjbGljaywgYXN0RGlndEJ0bik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RGb3VuZChcbiAgICAgICAgYXN0RGlndEJ0biA/PyBudWxsLFxuICAgICAgICBhc3REaWd0QnRuPy5pZCB8fCBcIlVOREVGSU5FRCBJRCBCVVRUT05cIixcbiAgICAgICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIGNvbnN0IHNsaWNlZEVycm9yID1cbiAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdFBvcHVsYXRlZChcbiAgICBhc3REaWd0QnRucyA/PyBudWxsLFxuICAgIFwiYXN0RGlndEJ0bnNcIixcbiAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICApO1xufVxuXG5pZiAoZGVhY3RBdXRvY29ycmVjdEJ0bnMubGVuZ3RoID4gMCkge1xuICBkZWFjdEF1dG9jb3JyZWN0QnRucy5mb3JFYWNoKGZ1bmN0aW9uIChkZWFjdEF1dG9jb3JyZWN0QnRuKSB7XG4gICAgaWYgKGRlYWN0QXV0b2NvcnJlY3RCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgZGVhY3RBdXRvY29ycmVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGNsaWNrKSB7XG4gICAgICAgIHJldHVybiBHbG9iYWxNb2RlbC5zd2l0Y2hBdXRvY29ycmVjdChjbGljaywgZGVhY3RBdXRvY29ycmVjdEJ0bik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgICAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICAgICAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoXG4gICAgICAgIGRlYWN0QXV0b2NvcnJlY3RCdG5zID8/IG51bGwsXG4gICAgICAgIGAke2RlYWN0QXV0b2NvcnJlY3RCdG4/LmlkIHx8IFwiVU5ERUZJTkVEIElEIEJVVFRPTlwifWAsXG4gICAgICAgIHNsaWNlZEVycm9yID8/IFwiTlVMTFwiXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59IGVsc2Uge1xuICBjb25zdCBzbGljZWRFcnJvciA9XG4gICAgbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KFwiXFxuXCIpWzFdPy50cmltKCk/LnNsaWNlKC03LCAtMSkgfHwgXCJcIjtcbiAgRXJyb3JIYW5kbGVyLmVsZW1lbnROb3RQb3B1bGF0ZWQoXG4gICAgZGVhY3RBdXRvY29ycmVjdEJ0bnMgPz8gbnVsbCxcbiAgICBcImRlYWN0QXV0b0NvcnJlY3RCdG5zXCIsXG4gICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgKTtcbn1cblxuaWYgKHN1YkJ1dHRvbiBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gIHN1YkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgR2xvYmFsSGFuZGxlci5zdWJGb3JtKTtcbn0gZWxzZSB7XG4gIGNvbnN0IHNsaWNlZEVycm9yID1cbiAgICBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoXCJcXG5cIilbMV0/LnRyaW0oKT8uc2xpY2UoLTcsIC0xKSB8fCBcIlwiO1xuICBFcnJvckhhbmRsZXIuZWxlbWVudE5vdEZvdW5kKFxuICAgIHN1YkJ1dHRvbiA/PyBudWxsLFxuICAgIFwic3ViQnV0dG9uXCIsXG4gICAgc2xpY2VkRXJyb3IgPz8gXCJOVUxMXCJcbiAgKTtcbn1cblxuaWYgKHJlc2V0Rm9ybUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gIHJlc2V0Rm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGNsaWNrKSA9PlxuICAgIEdsb2JhbEhhbmRsZXIucmVzZXRhckZvcm11bGFyaW8oXG4gICAgICBjbGljayxcbiAgICAgIGFzdERpZ3RCdG5zIGFzIE5vZGVMaXN0T2Y8SFRNTEJ1dHRvbkVsZW1lbnQ+XG4gICAgKVxuICApO1xufSBlbHNlIHtcbiAgY29uc3Qgc2xpY2VkRXJyb3IgPVxuICAgIG5ldyBFcnJvcigpLnN0YWNrPy5zcGxpdChcIlxcblwiKVsxXT8udHJpbSgpPy5zbGljZSgtNywgLTEpIHx8IFwiXCI7XG4gIEVycm9ySGFuZGxlci5lbGVtZW50Tm90Rm91bmQoXG4gICAgcmVzZXRGb3JtQnRuID8/IG51bGwsXG4gICAgXCJyZXNldEZvcm1CdG5cIixcbiAgICBzbGljZWRFcnJvciA/PyBcIk5VTExcIlxuICApO1xufVxuXG4vL1RPRE8gREVTQVRJVkFETyBQT1IgRU5RVUFOVE9cbi8vIHN1YkRpdnNRdWFkcnMuZm9yRWFjaCgoc3ViRGl2UXVhZHJzKSA9PiB7XG4vLyAgIHN1YkRpdlF1YWRycy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKHNlbGVjdGVkQnV0KSA9PiB7XG4vLyAgICAgT2RIYW5kbGVyLnJlb3JkZXJMYWJlbHMoc2VsZWN0ZWRCdXQpO1xuLy8gICB9KTtcbi8vIH0pO1xuLy8gaW5zcFNwYW5TdWJzQXJyYXkuZm9yRWFjaCgoaW5zcFNwYW5TdWIpID0+IHtcbi8vICAgaW5zcFNwYW5TdWIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAobW91c2Vtb3ZlKSA9PlxuLy8gICAgIE9kSGFuZGxlci5yZXNpemVDb250YWluZXJzKG1vdXNlbW92ZSwgdHJ1ZSwgaW5zcFNwYW5TdWIpXG4vLyAgICk7XG4vLyB9KTtcbi8vIGNvbnN0IGlucHNBc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtpZF49XCJpbnBBc3RcIl0nKTtcbi8vIGNvbnN0IGNvbmZpcm1Mb2NJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj1cImNvbmZpcm1Mb2NJZFwiXScpO1xuLy8gY29uc3QgaW5zcERpYWxvZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaWFsb2dbaWRePVwiaW5zcERpYWxvZ1wiXScpO1xuXG4vLyBpZiAoZWRpdGFibGVDaXRlKSB7XG4vLyBlZGl0YWJsZUNpdGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAobW91c2Vtb3ZlKSA9PlxuLy8gICBPZEhhbmRsZXIucmVzaXplQ29udGFpbmVycyhtb3VzZW1vdmUsIHRydWUsIGVkaXRhYmxlQ2l0ZSlcbi8vICk7XG4vLyB9XG4vLyBleHBvcnQgZnVuY3Rpb24gY3Vyc29yTW92ZW1lbnRLZXlib2FyZCh0YXJnZXRFbGVtZW50KSB7XG4vLyAgIHRhcmdldEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbi8vICAgICBjdXJzb3JQb3NpdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApLnN0YXJ0T2Zmc2V0O1xuLy8gICAgIGNvbnNvbGUubG9nKFwiUG9zacOnw6NvIGRvIGN1cnNvciBhdHVhbGl6YWRhKGNsaWNrKTogXCIgKyBjdXJzb3JQb3NpdGlvbik7XG4vLyAgIH0pO1xuLy8gICAvLyB0YXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsICgpID0+IHtcbi8vICAgLy8gICBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwKSB7XG4vLyAgIC8vICAgICBmb3IgKGxldCBpU00gPSAwOyBpU00gPCBzZWxlY3Rpb24ucmFuZ2VDb3VudDsgaVNNKyspIHtcbi8vICAgLy8gICAgICAgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdChpU00pO1xuLy8gICAvLyAgICAgICBjb25zb2xlLmxvZyhcIlRleHRvIHNlbGVjaW9uYWRvOiBcIiArIHJhbmdlLnRvU3RyaW5nKCkpO1xuLy8gICAvLyAgICAgfVxuLy8gICAvLyAgIH1cbi8vICAgLy8gfSk7XG4vLyAgIC8vIGxldCB0ZXh0Q291bnRlciA9IDBcbi8vICAgLy8gbGV0IHByZXZpb3VzVGV4dExlbmd0aCA9XG4vLyAgIGxldCBpc0tleXVwTGlzdGVuZWQgPSBmYWxzZTtcbi8vICAgbGV0IHRleHRBZnRlcktleXVwID0gXCJcIjtcbi8vICAgY29uc29sZS5sb2coXCJwcmV2aW91c1RleHRMZW5ndGggXCIgKyBwcmV2aW91c1RleHRMZW5ndGgpO1xuLy8gICB0YXJnZXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAobW92ZSkgPT4ge1xuLy8gICAgIC8vIHRleHRDb3VudGVyKytcbi8vICAgICBpc0tleXVwTGlzdGVuZWQgPSB0cnVlO1xuLy8gICAgIHRleHRBZnRlcktleXVwID0gdGFyZ2V0RWxlbWVudC50ZXh0Q29udGVudDtcbi8vICAgICBjb25zb2xlLmxvZyhcInRleHQgXCIgKyB0ZXh0QWZ0ZXJLZXl1cCk7XG4vLyAgICAgLy8gaWYgKGFmdGVyVGV4dExlbmd0aCAhPT0gcHJldmlvdXNUZXh0TGVuZ3RoKSB7XG4vLyAgICAgLy8gICBjdXJzb3JQb3NpdGlvbiArPSBhZnRlclRleHRMZW5ndGggLSBwcmV2aW91c1RleHRMZW5ndGg7XG4vLyAgICAgLy8gfVxuLy8gICAgIGN1cnNvclBvc2l0aW9uID0gdGFyZ2V0RWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbi8vICAgICAvLyBpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgPiAwKSB7XG4vLyAgICAgLy8gICBmb3IgKGxldCBpU0sgPSAwOyBpU0sgPCBzZWxlY3Rpb24ucmFuZ2VDb3VudDsgaVNLKyspIHtcbi8vICAgICAvLyAgICAgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdChpU0spO1xuLy8gICAgIC8vICAgICBjb25zb2xlLmxvZyhcIlRleHRvIHNlbGVjaW9uYWRvOiBcIiArIHJhbmdlLnRvU3RyaW5nKCkpO1xuLy8gICAgIC8vICAgfVxuLy8gICAgIC8vIH1cbi8vICAgICBpZiAoY3Vyc29yUG9zaXRpb24gPT09IDApIHtcbi8vICAgICAgIGlmIChtb3ZlLmtleUNvZGUgPT09IDM5KSB7XG4vLyAgICAgICAgIGN1cnNvclBvc2l0aW9uKys7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9zacOnw6NvIGRvIGN1cnNvciBhcMOzcyBhcnJvd1JpZ2h0OiBcIiArIGN1cnNvclBvc2l0aW9uKTtcbi8vICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQodGFyZ2V0RWxlbWVudCwgY3Vyc29yUG9zaXRpb24pO1xuLy8gICAgICAgfVxuLy8gICAgIH0gZWxzZSBpZiAoY3Vyc29yUG9zaXRpb24gPiAwKSB7XG4vLyAgICAgICBpZiAoY3Vyc29yUG9zaXRpb24gIT09IHRhcmdldEVsZW1lbnQudGV4dENvbnRlbnQubGVuZ3RoKSB7XG4vLyAgICAgICAgIGlmIChtb3ZlLmtleUNvZGUgPT09IDM3KSB7XG4vLyAgICAgICAgICAgY3Vyc29yUG9zaXRpb24tLTtcbi8vICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvc2nDp8OjbyBkbyBjdXJzb3IgYXDDs3MgYXJyb3dMZWZ0OiBcIiArIGN1cnNvclBvc2l0aW9uKTtcbi8vICAgICAgICAgICByYW5nZS5zZXRTdGFydCh0YXJnZXRFbGVtZW50LCBjdXJzb3JQb3NpdGlvbik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKG1vdmUua2V5Q29kZSA9PT0gMzkpIHtcbi8vICAgICAgICAgICBjdXJzb3JQb3NpdGlvbisrO1xuLy8gICAgICAgICAgIGNvbnNvbGUubG9nKFwiUG9zacOnw6NvIGRvIGN1cnNvciBhcMOzcyBhcnJvd1JpZ2h0OiBcIiArIGN1cnNvclBvc2l0aW9uKTtcbi8vICAgICAgICAgICByYW5nZS5zZXRTdGFydCh0YXJnZXRFbGVtZW50LCBjdXJzb3JQb3NpdGlvbik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0gZWxzZSBpZiAoY3Vyc29yUG9zaXRpb24gPT09IHRhcmdldEVsZW1lbnQudGV4dENvbnRlbnQubGVuZ3RoKSB7XG4vLyAgICAgICAgIGlmIChtb3ZlLmtleUNvZGUgPT09IDM3KSB7XG4vLyAgICAgICAgICAgY3Vyc29yUG9zaXRpb24tLTtcbi8vICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBvc2nDp8OjbyBkbyBjdXJzb3IgYXDDs3MgYXJyb3dMZWZ0OiBcIiArIGN1cnNvclBvc2l0aW9uKTtcbi8vICAgICAgICAgICByYW5nZS5zZXRTdGFydCh0YXJnZXRFbGVtZW50LCBjdXJzb3JQb3NpdGlvbik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH0pO1xuLy8gICBpZiAoaXNLZXl1cExpc3RlbmVkKSB7XG4vLyAgICAgdGFyZ2V0RWxlbWVudC50ZXh0Q29udGVudCA9IHRleHRBZnRlcktleXVwO1xuLy8gICAgIGlzS2V5dXBMaXN0ZW5lZCA9IGZhbHNlO1xuLy8gICB9XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBjdXJzb3JNb3ZlbWVudE1vYmlsZSgpIHtcbi8vICAgZWRpdGFibGVDaXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaFwiLCAoKSA9PiB7XG4vLyAgICAgY3Vyc29yUG9zaXRpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldDtcbi8vICAgICBjb25zb2xlLmxvZyhcIlBvc2nDp8OjbyBkbyBjdXJzb3IgYXR1YWxpemFkYSh0b3VjaCk6IFwiICsgY3Vyc29yUG9zaXRpb24pO1xuLy8gICB9KTtcbi8vIH1cbi8vIGNvbmZpcm1Mb2NJZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChtb3VzZW1vdmUpID0+XG4vLyAgIE9kSGFuZGxlci5yZXNpemVDb250YWluZXJzKG1vdXNlbW92ZSwgdHJ1ZSwgY29uZmlybUxvY0lkKVxuLy8gKTtcbi8vIGlucHNBc3QuZm9yRWFjaCgoaW5wQXN0KSA9PiB7XG4vLyAgIGlucEFzdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChtb3VzZW1vdmUpID0+XG4vLyAgICAgT2RIYW5kbGVyLnJlc2l6ZUNvbnRhaW5lcnMobW91c2Vtb3ZlLCB0cnVlLCBpbnBBc3QpXG4vLyAgICk7XG4vLyB9KTtcbi8vIGluc3BEaWFsb2dzLmZvckVhY2goKGluc3BEaWFsb2cpID0+IHtcbi8vICAgaW5zcERpYWxvZy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChtb3VzZW1vdmUpID0+XG4vLyAgICAgT2RIYW5kbGVyLnJlc2l6ZUNvbnRhaW5lcnMobW91c2Vtb3ZlLCB0cnVlLCBpbnNwRGlhbG9nKVxuLy8gICApO1xuLy8gfSk7XG4vLyB0cmF0VHlwZVNwYW5zLmZvckVhY2goKHRyYXRUeXBlU3BhbikgPT4ge1xuLy8gICB0cmF0VHlwZVNwYW4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAobW91c2Vtb3ZlKSA9PlxuLy8gICAgIE9kSGFuZGxlci5yZXNpemVDb250YWluZXJzKG1vdXNlbW92ZSwgdHJ1ZSwgdHJhdFR5cGVTcGFuKVxuLy8gICApO1xuLy8gICB0cmF0VHlwZVNwYW4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAobW91c2Vtb3ZlKSA9PlxuLy8gICAgIE9kSGFuZGxlci5hcHBseVJlc2l6aW5nQ3Vyc29yKG1vdXNlbW92ZSwgdHJhdFR5cGVTcGFuKVxuLy8gICApO1xuLy8gfSk7XG5cbi8vIHRhVHJhdHMuZm9yRWFjaCgodGFUcmF0KSA9PiB7XG4vLyAgIHRhVHJhdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChtb3VzZW1vdmUpID0+XG4vLyAgICAgT2RIYW5kbGVyLmFwcGx5UmVzaXppbmdDdXJzb3IobW91c2Vtb3ZlLCB0YVRyYXQpXG4vLyAgICk7XG4vLyB9KTtcblxuLy8gZWRpdGFibGVDaXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKG1vdXNlbW92ZSkgPT5cbi8vICAgT2RIYW5kbGVyLnJlc2l6ZUNvbnRhaW5lcnMobW91c2Vtb3ZlLCB0cnVlLCBlZGl0YWJsZUNpdGUpXG4vLyApO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9