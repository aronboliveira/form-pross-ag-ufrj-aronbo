//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM
import * as Handlers from "./handlers.js";
import * as Model from "./model.js";
import * as ErrorHandler from "./errorHandler.js";
//inicialização de constantes percorrendo o DOM
const inputs = document.querySelectorAll("input");
const textInputs = document.querySelectorAll('input[type="text"]');
const textareas = document.querySelectorAll("textarea");
const textConts = [...textareas, ...textInputs];
const numInps = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const selects = document.querySelectorAll("select");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const gen = document.getElementById("genId");
const genBirthRel = document.getElementById("genBirthRelId");
const genTrans = document.getElementById("genTransId");
const genFisAlin = document.getElementById("genFisAlinId");
// const textBodytype = document.getElementById("textBodytype");
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
let shouldRegenerateBtn = false;
//validação de constantes obtidas e aplicação de listeners/callbacks
if (JSONBtn && allInputs.length > 0) {
    let formDescription = [
        [],
        [],
    ];
    JSONBtn.addEventListener("click", () => {
        if (formDescription && formDescription[0] && formDescription[1]) {
            formDescription = Handlers.getJSONDesc(allInputs);
            const JSONBlob = new Blob([JSON.stringify(formDescription[1])], {
                type: "application/json",
            });
            const JSONLink = document.createElement("a");
            JSONLink.id = JSONBtn.id;
            JSONLink.className = JSONBtn.className;
            JSONLink.href = URL.createObjectURL(JSONBlob);
            JSONLink.download = "formData.json";
            JSONBtn.replaceWith(JSONLink);
        }
        else {
            console.warn(`Erro obtendo formDescription`);
        }
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(JSONBtn ?? null, "JSONBtn", slicedError ?? "NULL");
    ErrorHandler.elementNotPopulated(allInputs ?? null, "allInputs", slicedError ?? "NULL");
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
                    Model.autoCapitalizeInputs(input.target);
                }
                else {
                    const error = new Error();
                    const splitError = error.stack?.split("\n");
                    const slicedError = splitError[1].trim().slice(-7, -1);
                    ErrorHandler.inputNotFound(input.target, "target textCont", slicedError ?? "NULL");
                }
            });
        }
        // else {
        //   console.error(
        //     `Erro validando condições para adição de listener em textCont`
        //   );
        // }
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(textConts ?? null, "textConts", slicedError ?? "NULL");
}
if (numInps.length > 0) {
    numInps.forEach(function (numInp) {
        numInp.addEventListener("input", function (input) {
            if (input.target && input.target instanceof HTMLInputElement) {
                Model.numberLimit(input.target);
            }
            else {
                const error = new Error();
                const splitError = error.stack?.split("\n");
                const slicedError = splitError[1].trim().slice(-7, -1);
                ErrorHandler.inputNotFound(input.target ?? null, "target numInp", slicedError ?? "NULL");
            }
        });
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(numInps ?? null, "numInps", slicedError ?? "NULL");
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
let areAllGenContChecked = checkAllGenConts(gen, genBirthRel, genTrans, genFisAlin);
if (areAllGenContChecked && gen instanceof HTMLSelectElement) {
    let genValue = gen?.value;
    if (typeof genValue === "string") {
        gen?.addEventListener("change", () => {
            genValue = Model.fluxGen(gen, gen?.value, genBirthRel, genTrans, genFisAlin);
        });
        genBirthRel?.addEventListener("change", () => {
            genValue = Model.fluxGen(gen, gen?.value, genBirthRel, genTrans, genFisAlin);
        });
        genTrans?.addEventListener("change", () => {
            genValue = Model.fluxGen(gen, gen?.value, genBirthRel, genTrans, genFisAlin);
        });
        genFisAlin?.addEventListener("change", () => {
            genValue = Model.fluxGen(gen, gen?.value, genBirthRel, genTrans, genFisAlin);
        });
    }
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    console.warn(`areAllGenContChecked ${areAllGenContChecked ?? false}`);
    ErrorHandler.elementNotFound(gen ?? null, "genElement", slicedError ?? "NULL");
}
if (telInputs.length > 0) {
    telInputs.forEach((telInput) => {
        telInput.addEventListener("input", (inputTel) => {
            if (inputTel.target && inputTel.target instanceof HTMLInputElement) {
                Model.formatTel(inputTel.target);
            }
            else {
                const error = new Error();
                const splitError = error.stack?.split("\n");
                const slicedError = splitError[1].trim().slice(-7, -1);
                ErrorHandler.inputNotFound(inputTel.target ?? null, "target inputTel", slicedError ?? "NULL");
            }
        });
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(telInputs ?? null, "telInputs", slicedError ?? "NULL");
}
if (emailInputs.length > 0) {
    emailInputs.forEach((emailInput) => {
        if (emailInput instanceof HTMLInputElement) {
            emailInput.addEventListener("click", () => Model.addEmailExtension(emailInput));
            emailInput.addEventListener("input", () => Model.addEmailExtension(emailInput));
        }
        else {
            const error = new Error();
            const splitError = error.stack?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.inputNotFound(emailInput ?? null, `${emailInput?.id ?? "UNDEFINED ID INPUT"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(emailInputs ?? null, "emailInputs", slicedError ?? "NULL");
}
if (radioButtons.length > 0) {
    radioButtons.forEach((radio) => {
        if (radio instanceof HTMLInputElement && radio.type === "radio") {
            radio.addEventListener("keydown", (keydown) => {
                Handlers.opRadioHandler(keydown);
            });
            radio.addEventListener("change", Handlers.cpbInpHandler);
            radio.addEventListener("keydown", Handlers.cpbInpHandler);
            radio.addEventListener("dblclick", () => Handlers.doubleClickHandler(radio));
            radio.addEventListener("touchstart", Handlers.touchStartHandler);
            radio.addEventListener("change", Handlers.deactTextInput);
        }
        else {
            const error = new Error();
            const splitError = error.stack?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.inputNotFound(radio ?? null, `${radio?.id ?? "UNDEFINED ID RADIO"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(radioButtons ?? null, "radioButtons", slicedError ?? "NULL");
}
if (antFamChecks.length > 0) {
    antFamChecks.forEach((antFamCheck) => {
        if (antFamCheck instanceof HTMLInputElement) {
            antFamCheck.addEventListener("change", Handlers.cpbInpHandler);
            antFamCheck.addEventListener("dblclick", () => Handlers.doubleClickHandler(antFamCheck));
        }
        else {
            const error = new Error();
            const splitError = error.stack?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.inputNotFound(antFamCheck ?? null, `${antFamCheck.id ?? "UNDEFINED ID INPUT"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(antFamChecks ?? null, "antFamChecks", slicedError ?? "NULL");
}
if (antMedContainer) {
    antMedContainer.addEventListener("click", Handlers.addAntMedHandler);
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(null, "antMedContainer", slicedError ?? "NULL");
}
if (dateBtns.length > 0) {
    dateBtns.forEach(function (dateBtn) {
        if (dateBtn instanceof HTMLButtonElement) {
            dateBtn.addEventListener("click", (activation) => {
                Handlers.useCurrentDate(activation, dateBtn);
            });
        }
        else {
            const error = new Error();
            const splitError = error.stack?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.elementNotFound(dateBtn ?? null, `${dateBtn?.id ?? "UNDEFINED ID DATE BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(dateBtns ?? null, "dateBtns", slicedError ?? "NULL");
}
if (cepElement &&
    cepElement instanceof HTMLInputElement &&
    cepElementBtn &&
    cepElementBtn instanceof HTMLButtonElement) {
    cepElement.addEventListener("input", () => Model.formatCEP(cepElement));
    cepElement.addEventListener("input", () => {
        let isCepBtnOff = Handlers.enableCEPBtn(cepElement.value.length, cepElementBtn);
        if (cepElementBtn &&
            cepElementBtn instanceof HTMLButtonElement &&
            !isCepBtnOff) {
            cepElementBtn.addEventListener("click", () => Handlers.searchCEP(cepElement));
        }
        else if (!(cepElementBtn instanceof HTMLButtonElement)) {
            const error = new Error();
            const splitError = error.stack?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            console.warn(`isCepBtnOff + ${isCepBtnOff ?? false}`);
            ErrorHandler.elementNotFound(cepElementBtn ?? null, "cepElementBtn", slicedError ?? "NULL");
        }
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.multipleElementsNotFound(slicedError ?? "NULL", "Elements para CEP", cepElement ?? null, cepElementBtn ?? null);
}
if (qxPrinc && qxPrinc instanceof HTMLTextAreaElement) {
    qxPrinc.addEventListener("click", () => Model.addDblQuotes(qxPrinc));
    qxPrinc.addEventListener("input", () => Model.addDblQuotes(qxPrinc));
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(qxPrinc ?? null, "qxPrinc", slicedError ?? "NULL");
}
if (editableCite) {
    let firstClick = true;
    const citeClickHandler = function (click) {
        if (firstClick && click.target && click.target instanceof HTMLElement) {
            Model.removeFirstClick(click.target);
            firstClick = false;
            editableCite.removeEventListener("click", citeClickHandler);
        }
        else {
            const error = new Error();
            const splitError = error.stack?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.elementNotFound(click.target ?? null, "click target editableCite", slicedError ?? "NULL");
        }
    };
    editableCite.addEventListener("keyup", function (keypress) {
        if (keypress.target && keypress.target instanceof HTMLElement) {
            Model.autoCapitalizeCite(keypress.target);
        }
        else {
            const error = new Error();
            const splitError = error.stack?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.elementNotFound(keypress.target ?? null, "keypress target editableCite", slicedError ?? "NULL");
        }
    });
    editableCite.addEventListener("click", citeClickHandler);
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(null, "editableCite", slicedError ?? "NULL");
}
if (deactAutocorrectBtns.length > 0) {
    deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
        if (deactAutocorrectBtn instanceof HTMLButtonElement) {
            deactAutocorrectBtn.addEventListener("click", function (click) {
                return Model.switchAutocorrect(click, deactAutocorrectBtn);
            });
        }
        else {
            const error = new Error();
            const splitError = error.stack?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.elementNotPopulated(deactAutocorrectBtn ?? null, `${deactAutocorrectBtn?.id ??
                "UNDEFINED ID BUTTON"}`, slicedError ?? "NULL");
        }
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(deactAutocorrectBtns ?? null, "deactAutoCorrectBtns", slicedError ?? "NULL");
}
if (astDigtBtns.length > 0) {
    astDigtBtns.forEach(function (astDigtBtn) {
        if (astDigtBtn instanceof HTMLButtonElement) {
            astDigtBtn.addEventListener("click", function (click) {
                return Handlers.changeToAstDigit(click, astDigtBtn);
            });
        }
        else {
            const error = new Error();
            const splitError = error.stack?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.elementNotFound(astDigtBtn ?? null, astDigtBtn?.id ?? "UNDEFINED ID BUTTON", slicedError ?? "NULL");
        }
    });
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotPopulated(astDigtBtns ?? null, "astDigtBtns", slicedError ?? "NULL");
}
if (subButton instanceof HTMLButtonElement) {
    subButton.addEventListener("click", Handlers.subForm);
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(subButton ?? null, "subButton", slicedError ?? "NULL");
}
if (resetFormBtn instanceof HTMLButtonElement) {
    resetFormBtn.addEventListener("click", (click) => Handlers.resetarFormulario(click, astDigtBtns));
}
else {
    const error = new Error();
    const splitError = error.stack?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(resetFormBtn ?? null, "resetFormBtn", slicedError ?? "NULL");
}
export function cursorCheckTimer(cursorPosition) {
    let selection = window.getSelection();
    if (selection && selection.focusNode !== null) {
        cursorPosition = selection.getRangeAt(0)?.startOffset;
        setTimeout(() => {
            return cursorPosition;
        }, 3000);
    }
    return 0;
}
