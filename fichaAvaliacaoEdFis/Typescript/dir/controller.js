"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cursorCheckTimer = void 0;
const Model = __importStar(require("./model.js"));
const Handlers = __importStar(require("./handlers.js"));
const Classes = __importStar(require("./classes.js"));
const textareas = document.querySelectorAll("textarea");
const textInputs = document.querySelectorAll('input[type="text"]');
const textConts = [
    ...textareas,
    ...textInputs,
];
const gen = document.getElementById("genId");
const genBirthRel = document.getElementById("genBirthRelId");
const genTrans = document.getElementById("genTransId");
const genFisAlin = document.getElementById("genFisAlinId");
const textBodytype = document.getElementById("textBodytype");
const age = document.getElementById("ageId");
const lvlAtvFis = document.getElementById("selectLvlAtFis");
const numInps = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const comorbBtns = document.getElementsByClassName("countComorb");
const comorbBtnsArray = Array.from(comorbBtns);
const ativFisContainerBtns = document.getElementsByClassName("countAtFis");
const ativFisContainerBtnsArray = Array.from(ativFisContainerBtns);
const tabMedAnt = document.getElementById("tabMedAnt");
const tabDC = document.getElementById("tabDCut");
const tabIndPerc = document.getElementById("tabIndPerc");
const editableCite = document.querySelector('cite[contenteditable="true"]');
const astDigtBtns = document.querySelectorAll('button[id$="AstDigtBtn');
const deactAutocorrectBtns = document.querySelectorAll('button[id^="deactAutocorrectBtn"]');
const dateBtns = document.querySelectorAll('button[id$="DatBtn"]');
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");
textConts.forEach(function (textCont) {
    textCont.addEventListener("input", function (input) {
        if (input.target &&
            (input.target instanceof HTMLTextAreaElement ||
                input.target instanceof HTMLInputElement)) {
            Model.autoCapitalizeInputs(input.target);
        }
    });
});
numInps.forEach(function (numInp) {
    numInp.addEventListener("input", function (input) {
        if (input.target && input.target instanceof HTMLInputElement) {
            Model.numberLimit(input.target);
        }
    });
});
if (radioButtons) {
    radioButtons.forEach((radio) => {
        radio.addEventListener("keydown", (keydown) => {
            Handlers.opRadioHandler(keydown);
        });
        radio.addEventListener("change", () => Handlers.cpbInpHandler(radio));
        radio.addEventListener("keydown", () => Handlers.cpbInpHandler(radio));
        radio.addEventListener("dblclick", Handlers.doubleClickHandler);
    });
}
else {
    console.warn("Radios não encontrados");
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
if (areAllGenContChecked &&
    gen instanceof HTMLSelectElement &&
    textBodytype &&
    textBodytype instanceof HTMLSelectElement) {
    let genValue = gen?.value;
    if (typeof genValue === "string") {
        gen?.addEventListener("change", () => {
            genValue = Model.fluxGen(gen, gen?.value, genBirthRel, genTrans, genFisAlin);
            console.log("gen value " + genValue);
            textBodytype.value = genValue;
        });
        genBirthRel?.addEventListener("change", () => {
            genValue = Model.fluxGen(gen, gen?.value, genBirthRel, genTrans, genFisAlin);
            console.log("gen value " + genValue);
            textBodytype.value = genValue;
        });
        genTrans?.addEventListener("change", () => {
            genValue = Model.fluxGen(gen, gen?.value, genBirthRel, genTrans, genFisAlin);
            console.log("gen value " + genValue);
            textBodytype.value = genValue;
        });
        genFisAlin?.addEventListener("change", () => {
            genValue = Model.fluxGen(gen, gen?.value, genBirthRel, genTrans, genFisAlin);
            console.log("gen value " + genValue);
            textBodytype.value = genValue;
        });
    }
} //TS não reconhece o filtro feito pela função anterior
comorbBtnsArray.forEach((comorbBtn) => {
    if (comorbBtn && comorbBtn instanceof HTMLButtonElement) {
        comorbBtn.addEventListener("click", () => Handlers.addRowComorb(comorbBtn));
    }
});
ativFisContainerBtnsArray.forEach((ativFisContainerBtn) => {
    if (ativFisContainerBtn && ativFisContainerBtn instanceof HTMLButtonElement) {
        ativFisContainerBtn.addEventListener("click", () => Handlers.addRowAtivFis(ativFisContainerBtn));
    }
});
dateBtns.forEach(function (dateBtn) {
    dateBtn.addEventListener("click", function (activation) {
        return Handlers.useCurrentDate(activation, dateBtn);
    });
});
if (editableCite) {
    let firstClick = true;
    const citeClickHandler = function (click) {
        if (firstClick && click.target && click.target instanceof HTMLElement) {
            Model.removeFirstClick(click.target);
            firstClick = false;
            editableCite.removeEventListener("click", citeClickHandler);
        }
    };
    editableCite.addEventListener("keyup", function (keypress) {
        if (keypress.target && keypress.target instanceof HTMLElement) {
            Model.autoCapitalizeCite(keypress.target);
        }
    });
    editableCite.addEventListener("click", citeClickHandler);
}
else {
    console.warn("Cite editável não encontrado");
}
deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
    deactAutocorrectBtn.addEventListener("click", function (click) {
        return Model.switchAutocorrect(click, deactAutocorrectBtn);
    });
});
astDigtBtns.forEach(function (astDigtBtn) {
    astDigtBtn.addEventListener("click", function (click) {
        return Handlers.changeToAstDigit(click, astDigtBtn);
    });
});
if (subButton) {
    subButton.addEventListener("click", Handlers.subForm);
}
else {
    console.warn("Botão de Submeter não encontrado");
}
if (resetFormBtn) {
    resetFormBtn.addEventListener("click", (click) => Handlers.resetarFormulario(click, astDigtBtns));
}
else {
    console.warn("Botão de Resetar não encontrado");
}
function cursorCheckTimer(cursorPosition) {
    let selection = window.getSelection();
    if (selection && selection.focusNode !== null) {
        cursorPosition = selection.getRangeAt(0)?.startOffset;
        setTimeout(() => {
            return cursorPosition;
        }, 3000);
    }
}
exports.cursorCheckTimer = cursorCheckTimer;
//TODO AGUARDAR REUNIÃO
//TODO INCLUIR CÁLCULO DE IMC/TMC/GET
//TODO FINALIZAR CÁLCULO DE PGC
function applyIndexesCalc(gen, age, sumDCut, weight, height) {
    let person = {};
    if (gen instanceof HTMLSelectElement) {
        if (gen.value === "masculino") {
            person = new Classes.Man(30, 70, 170, 60); //TODO VALORES HARDCODED PARA FINS DE TESTE
            // person = new Classes.Man(age, weight, height, sumDCut);
        }
        else if (gen.value === "feminino") {
            person = new Classes.Woman(30, 70, 170, 60);
            // person = new Classes.Woman(age, weight, height, sumDCut);
        }
        if (person) {
        }
    }
}
if (tabDC && tabDC instanceof HTMLTableElement) {
    const rowsDC = tabDC.getElementsByClassName("tabRowDCut");
    const rowsDCArray = Array.from(rowsDC).filter((rowDC) => rowDC instanceof HTMLTableRowElement);
    const sumDCBtns = tabDC.querySelectorAll('button[id^="sumDCBtn"]');
    const sumDCInps = tabDC.querySelectorAll('input[id^="tabInpRowDCut9"]');
    const protocolo = document.getElementById("tabSelectDCutId");
    sumDCBtns.forEach((sumDCBtn) => {
        sumDCBtn?.addEventListener("click", () => {
            if (rowsDCArray)
                Handlers.createArraysRels(sumDCBtn?.id, rowsDCArray);
        });
    });
    if (protocolo && protocolo instanceof HTMLSelectElement) {
        protocolo.addEventListener("change", () => Model.changeTabDCutLayout(protocolo, tabDC));
        if (textBodytype && textBodytype instanceof HTMLSelectElement) {
            textBodytype.addEventListener("change", () => Model.changeTabDCutLayout(protocolo, tabDC));
        }
        else {
            console.warn(`Erro validando campo de Bodytype. Elemento: ${protocolo}, instância: ${Object.prototype.toString
                .call(textBodytype)
                .slice(8, -1)}`);
        }
    }
    else {
        console.warn(`Erro validando campo de Protocolo. Elemento: ${protocolo}, instância: ${Object.prototype.toString
            .call(protocolo)
            .slice(8, -1)}`);
    }
    if (tabMedAnt && tabIndPerc) {
        const weightCells = tabMedAnt.querySelectorAll('input^=["tabInpRowMedAnt2"]');
        const heightCells = tabMedAnt.querySelectorAll('input^=["tabInpRowMedAnt3"]');
        const tabBtnsInd = tabIndPerc.getElementsByClassName("tabBtnInd");
        const tabBtnsIndArray = Array.from(tabBtnsInd).filter((btn) => btn instanceof HTMLButtonElement);
        if (gen instanceof HTMLSelectElement && age instanceof HTMLInputElement) {
            tabBtnsIndArray?.forEach((tabBtnInd) => {
                tabBtnInd?.addEventListener("click", () => {
                    applyIndexesCalc(gen, age, sumDCInps[0], weightCells[0], heightCells[0]);
                });
            });
        }
    }
    else {
        console.warn(`Erro validando Tabelas. Tabela de Medidas Antropométricas: elemento ${tabMedAnt}, instância: ${Object.prototype.toString
            .call(tabMedAnt)
            .slice(8, -1)}; Tabela de Índices: elemento ${tabIndPerc}, instância ${Object.prototype.toString
            .call(tabIndPerc)
            .slice(8, -1)}`);
    }
}
else {
    console.warn(`Erro validando Tabela de Dobras Cutâneas: elemento ${tabDC}, instância ${Object.prototype.toString
        .call(tabDC)
        .slice(8, -1)}`);
}
