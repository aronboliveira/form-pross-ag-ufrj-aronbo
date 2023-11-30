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
exports.subForm = exports.resetarFormulario = exports.changeToAstDigit = exports.createArraysRels = exports.useCurrentDate = exports.addRowComorb = exports.addRowAtivFis = exports.doubleClickHandler = exports.cpbInpHandler = exports.opRadioHandler = void 0;
const Model = __importStar(require("./model.js"));
let rowCountAtivFisRot = 3;
let rowCountAtivFisProp = 3;
let rowCountComorb = 3;
const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
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
            !radioNo.checked) {
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
    }
}
exports.opRadioHandler = opRadioHandler;
function cpbInpHandler(radio) {
    const opRadiosCheck = radio.parentElement?.querySelectorAll("input[id^='Cpb'][id$='Yes']");
    const divAdd = radio.parentElement?.parentElement?.querySelectorAll("div[id^='divAdd']");
    opRadiosCheck?.forEach(function (opRadioCheck, i) {
        if (opRadiosCheck instanceof NodeList &&
            opRadioCheck instanceof HTMLInputElement &&
            divAdd) {
            if (!opRadioCheck.checked) {
                divAdd[i].style.display = "none";
            }
            else {
                divAdd[i].style.display = "block";
            }
        }
    });
}
exports.cpbInpHandler = cpbInpHandler;
function doubleClickHandler() {
    if (this.checked) {
        this.checked = false;
    }
    else {
        this.checked = true;
    }
    const radio = this.parentElement?.querySelector("input[id^='Cpb'][id$='Yes']");
    if (radio) {
        cpbInpHandler(radio);
    }
}
exports.doubleClickHandler = doubleClickHandler;
function addRowAtivFis(container) {
    if (container instanceof HTMLButtonElement &&
        container.tagName === "BUTTON") {
        if (container.classList.contains("addAtFisRot")) {
            const tBodyContainer = document.getElementById("tabTbodyAtFisRot");
            const newRow = document.createElement("tr");
            newRow.className = "contQuint tabRowAtFisRot";
            newRow.id = `tabRowAtFisRotId${rowCountAtivFisRot}`;
            // newRow.itemprop = "rowAtFisRot";
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
                    textElements[iT].addEventListener("input", () => Model.autoCapitalizeInputs(textElements[iT]));
                }
                for (let iN = 0; iN < numInps.length; iN++) {
                    numInps[iN].addEventListener("input", () => Model.numberLimit(numInps[iN]));
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
            // newRow.itemprop = "rowAtFisProp";
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
                    textElements[iT].addEventListener("input", () => Model.autoCapitalizeInputs(textElements[iT]));
                }
                for (let iN = 0; iN < numInps.length; iN++) {
                    numInps[iN].addEventListener("input", () => Model.numberLimit(numInps[iN]));
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
exports.addRowAtivFis = addRowAtivFis;
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
exports.addRowComorb = addRowComorb;
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
    if (activation.target === dateBtn &&
        dateBtn.previousElementSibling &&
        dateBtn.previousElementSibling.tagName === "INPUT" &&
        dateBtn.previousElementSibling instanceof HTMLInputElement) {
        dateBtn.previousElementSibling.value = ano + "-" + mes + "-" + dia;
    }
}
exports.useCurrentDate = useCurrentDate;
function searchPreviousSiblings(currentElement, searchedSiblingClass) {
    while (currentElement.previousElementSibling) {
        currentElement = currentElement.previousElementSibling;
        let isSiblingValid = currentElement.classList.contains(searchedSiblingClass);
        if (isSiblingValid) {
            break;
        }
    }
    return currentElement;
}
function createArraysRels(btnId, arrayRows) {
    let arrayConsultasNum = [];
    let rowValues = [];
    let tabValues = [];
    let columnValues = [];
    let colAcc = 0;
    const btnRowMatch = btnId?.match(/[0-9]+(?=_)/)?.toString();
    const btnColMatch = btnId?.match(/(?<=_)[0-9]+/)?.toString();
    if (btnColMatch && btnRowMatch) {
        const btnCol = parseInt(btnColMatch, 10);
        const btnRow = parseInt(btnRowMatch, 10);
        for (let iR = 0; iR < arrayRows.length; iR++) {
            const isValidRowArray = arrayRows.every((row) => row instanceof HTMLTableRowElement);
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
        console.log(tabValues);
        for (let iT = btnCol - 2; iT < tabValues.length; iT += 3) {
            columnValues = [...columnValues, tabValues[iT]];
        }
        if (arrayConsultasNum &&
            btnCol - 1 == arrayConsultasNum[btnCol - 2] &&
            columnValues) {
            //define qual coluna será utilizada de acordo com a posição do botão e validando se há algum preenchimento na coluna
            let inputAcc = 0;
            for (let iR = 0; iR < btnRow - 1; iR++) {
                const targCelInp = document.getElementById(`tabInpRowDCut${2 + iR}_${btnCol}`);
                if (targCelInp instanceof HTMLInputElement) {
                    if (iR < btnRow - 2) {
                        if (targCelInp && targCelInp.value !== "") {
                            colAcc += parseInt(targCelInp?.value);
                        }
                    }
                    else if (iR < btnRow - 1) {
                        const tbodyQuery = document.getElementById("tabTbodyDCut");
                        if (tbodyQuery) {
                            const tBodyChildren = Array.from(tbodyQuery.children);
                            if (tBodyChildren) {
                                for (let iC = 0; iC < tBodyChildren.length; iC++) {
                                    const innerInp = tBodyChildren[iC].querySelector("input");
                                    if (!tBodyChildren[iC].hidden &&
                                        inputAcc <= 3 &&
                                        innerInp &&
                                        innerInp.value !== "") {
                                        inputAcc++;
                                    }
                                }
                            }
                            else {
                                console.warn(`Erro validando children do tbody. Coleção: ${tBodyChildren}`);
                            }
                            if (inputAcc === 3) {
                                targCelInp.value = colAcc.toString();
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
        else if (!columnValues) {
            //TODO DIALOG DE ALERTA
        }
    }
}
exports.createArraysRels = createArraysRels;
function getConsultasNums(arrayRow) {
    const strConsultasNum = arrayRow.innerText.replaceAll(/[\D]/g, "");
    let arrayConsultasNum = [];
    for (let iL = 0; iL < strConsultasNum.length; iL++) {
        const consultasLetter = parseInt(strConsultasNum.slice(0 + iL, 1 + iL));
        arrayConsultasNum = arrayConsultasNum.concat(consultasLetter);
        if (iL === strConsultasNum.length - 1) {
            return arrayConsultasNum;
        }
    }
}
//TODO AJUSTAR INCLUSÃO DE VALORES APÓS REUNIÃO
function getRowValues(arrayRows, arrayConsultasNum, arrayCelIds) {
    if (typeof arrayCelIds[0] === "string") {
        const idMatch = arrayCelIds[0]?.match(/[0-9]+(?=_)/);
        if (idMatch) {
            const numRow = ((arrayCelIds[0] = parseInt(idMatch.toString())), 10);
            if (numRow !== arrayRows.length) {
                let colAcc = 0;
                let arrayRowValues = [];
                for (let iCol = 0; iCol < arrayConsultasNum.length; iCol++) {
                    const targCelInp = document.getElementById(`tabInpRowDCut${numRow}_${1 + arrayConsultasNum[iCol]}`);
                    if (targCelInp && targCelInp instanceof HTMLInputElement) {
                        colAcc++;
                        targCelInp.value = colAcc.toString(); //TODO INCLUÍDO PARA FINS DE TESTE
                        arrayRowValues.push(targCelInp.value);
                    }
                    else {
                        console.warn("Célula não encontrada");
                    }
                    if (arrayRowValues.length === arrayConsultasNum.length) {
                        return arrayRowValues;
                    }
                }
            }
        }
    }
}
function changeToAstDigit(click, toFileInpBtn) {
    const useAstDigitRegex = /Usar Assinatura Digital/;
    const useAstDigtRegexObj = new RegExp(useAstDigitRegex);
    const useAstTextRegex = /Retornar à Assinatura Escrita/;
    const useAstTextRegexObj = new RegExp(useAstTextRegex);
    let labCont = toFileInpBtn.parentElement?.getElementsByClassName("labAst");
    if (labCont &&
        !labCont[0] &&
        (toFileInpBtn.parentElement?.tagName === "LABEL" ||
            toFileInpBtn.parentElement?.tagName === "SPAN")) {
        labCont = Array.of(toFileInpBtn.parentElement);
    }
    let astCount = 0;
    if (labCont && click.target === toFileInpBtn) {
        if (toFileInpBtn.textContent &&
            useAstDigtRegexObj.test(toFileInpBtn.textContent)) {
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
                    }
                    else {
                        console.warn("Erro no match de ids do input");
                    }
                    if (toFileInpBtn.previousElementSibling instanceof HTMLButtonElement) {
                        toFileInpBtn.previousElementSibling?.setAttribute("hidden", "");
                    }
                    if (fileInp) {
                        fileInp.addEventListener("change", (chose) => {
                            // console.log("evento ouvido");
                            try {
                                if (chose.target instanceof HTMLInputElement &&
                                    fileInp.files &&
                                    fileInp.files.length > 0) {
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
                                                    labCont[0].id = sliceOneLabId + sliceTwoInpId;
                                                    console.log(labCont[0].id);
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
                        fileInp.addEventListener("input", () => Model.autoCapitalizeInputs(fileInp));
                    }
                    else {
                        console.warn("Erro no match de ids dos inputs");
                    }
                }
            }
        }
    }
}
exports.changeToAstDigit = changeToAstDigit;
function resetarFormulario(click, toFileInpBtns) {
    if (click.target instanceof HTMLElement &&
        click.target.tagName === "BUTTON") {
        const formulario = document.getElementById("formEdFis");
        const editableCite = document.querySelector('cite[contenteditable="true"]');
        if (formulario && formulario instanceof HTMLFormElement) {
            formulario.reset();
        }
        else {
            console.warn("Erro validando formulário");
        }
        if (editableCite) {
            editableCite.textContent = `--Nome`;
            Model.removeFirstClick(editableCite);
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
                            [];
                        if ((!labCont[0] || labCont[0].id === "") &&
                            (toFileInpBtn.parentElement?.tagName === "LABEL" ||
                                toFileInpBtn.parentElement?.tagName === "SPAN")) {
                            labCont = Array.of(toFileInpBtn.parentElement);
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
                            fileInp.addEventListener("input", () => Model.autoCapitalizeInputs(fileInp));
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
exports.resetarFormulario = resetarFormulario;
//TODO FINALIZAR COM CSS
function subForm() {
    window.alert("Sistema ainda não pronto\n...mas você teria enviado clicando aqui! :)");
}
exports.subForm = subForm;
