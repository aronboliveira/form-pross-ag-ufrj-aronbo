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
exports.changeTabDCutLayout = exports.switchAutocorrect = exports.removeFirstClick = exports.autoCapitalizeCite = exports.autoCapitalizeInputs = exports.numberLimit = exports.fluxGen = void 0;
const Controller = __importStar(require("./controller.js"));
const autoCapitalizeFirstLetterRegex = /\b\w/;
let repAcumulator = 0;
let isAutocorrectOn = true;
function fluxGen(gen, genIniValue, genBirthRel, genTrans, genFisAlin) {
    let genValue = null;
    if (gen.value === "masculino" || gen.value === "feminino") {
        if (genBirthRel.value === "cis") {
            genValue = genIniValue;
            hideGenFisAlin(genFisAlin);
            hideStgTransHorm(genTrans);
            return genValue;
        }
        else if (genBirthRel.value === "trans") {
            showStgTransHorm(genTrans);
            if (genTrans.value === "avancado") {
                genValue = genIniValue;
                hideGenFisAlin(genFisAlin);
                return genValue;
            }
            else if (genTrans.value === "undefined" ||
                genTrans.value === "no" ||
                genTrans.value === "inicial" ||
                genTrans.value === "intermediario") {
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
}
exports.fluxGen = fluxGen;
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
function numberLimit(inputElement) {
    let numberValue = inputElement.value;
    let numberValueInt = parseInt(numberValue);
    const isAtivFis = inputElement.classList.contains("inpAtivFis");
    const isAlimRot = inputElement.classList.contains("inpAlimRot");
    const isFloat = inputElement.classList.contains("float");
    if ((isAtivFis || isAlimRot) && !isFloat) {
        const maxLength = 2;
        const maxInput = inputElement.id.endsWith("Max");
        if (numberValueInt < 1 && maxInput) {
            const inpValueArray = Array.from(inputElement.value);
            inpValueArray.splice(0, 1, "1");
            const fixedInpValueinpValueArray = inpValueArray.toString();
            inputElement.value = fixedInpValueinpValueArray;
            // console.log(inputElement.value);
        }
        if (numberValue.length > maxLength) {
            numberValue = numberValue.slice(0, maxLength);
        }
        inputElement.value = numberValue;
    }
}
exports.numberLimit = numberLimit;
function autoCapitalizeInputs(textElement) {
    if (isAutocorrectOn) {
        let text = textElement.value;
        let newWordMatches = text.match(/\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g);
        let letterMatchesIniNotD = text.match(/\s[^d]/g);
        let letterMatchesIniD = text.match(/\sd/g);
        const notMatchesAfterDRegex = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g;
        let letterNotMatchesAfterD = text.match(notMatchesAfterDRegex);
        const afterDRegexOp1 = /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
        const afterDRegexOp2 = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g;
        const afterDRegexOp3 = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
        let letterMatchesAfterDOp1 = text.match(afterDRegexOp1);
        let letterMatchesAfterDOp2 = text.match(afterDRegexOp2);
        let letterMatchesAfterDOp3 = text.match(afterDRegexOp3);
        const lowercasesRegex = /[a-záàâäãéèêëíìîïóòôöõúùûü]/g;
        const lowercasesRegexObj = new RegExp(lowercasesRegex);
        let lowercasesMatches = text.match(lowercasesRegex);
        const uppercasesRegex = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
        const uppercasesRegexObj = new RegExp(uppercasesRegex);
        const multipleUppercasesRegex = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{2,}/g;
        let multipleUppercasesMatches = text.match(multipleUppercasesRegex);
        const multipleUppercasesRegex2 = /D[a-záàâäãéèêëíìîïóòôöõúùûü][S]\s/g;
        let multipleUppercasesMatches2 = text.match(multipleUppercasesRegex2);
        const wrongUppercasesRegexOp1 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g;
        let wrongUppercasesMatchesOp1 = text.match(wrongUppercasesRegexOp1);
        const wrongUppercasesRegexOp2 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        let wrongUppercasesMatchesOp2 = text.match(wrongUppercasesRegexOp2);
        const wrongUppercasesRegexOp3 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g;
        let wrongUppercasesMatchesOp3 = text.match(wrongUppercasesRegexOp3);
        const wrongUppercasesRegexOp4 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        let wrongUppercasesMatchesOp4 = text.match(wrongUppercasesRegexOp4);
        const wrongUppercasesRegexOp5 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g;
        let wrongUppercasesMatchesOp5 = text.match(wrongUppercasesRegexOp5);
        const wrongUppercasesRegexOp6 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        let wrongUppercasesMatchesOp6 = text.match(wrongUppercasesRegexOp6);
        const wrongUppercasesRegexOp7 = /D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g;
        let wrongUppercasesMatchesOp7 = text.match(wrongUppercasesRegexOp7);
        const wrongUppercasesRegexOp8 = /D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g;
        let wrongUppercasesMatchesOp8 = text.match(wrongUppercasesRegexOp8);
        const wrongUppercasesRegexOp9 = /D[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]\s/g;
        let wrongUppercasesMatchesOp9 = text.match(wrongUppercasesRegexOp9);
        const wrongUppercasesRegexOp10 = /D[aeioáàâäãéèêëíìîïóòôöõúùûü]\s/g;
        let wrongUppercasesMatchesOp10 = text.match(wrongUppercasesRegexOp10);
        const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
        const computedStyleRegex = /,\d+.?\d*.?\d*/g;
        const spaceRegex = /\s/g;
        const wrongStartRegex = /^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
        let wrongStartMatch = text.match(wrongStartRegex);
        const wrongCharsRegexOp1 = /[\s]*[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+[\s]*[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]*/g;
        let wrongCharsMatchesOp1 = text.match(wrongCharsRegexOp1);
        const wrongCharsRegexOp2 = /$[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+/g;
        let wrongCharsMatchesOp2 = text.match(wrongCharsRegexOp2);
        const wrongCharsRegexOp3 = /(?<=\sdD)[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+/g;
        let wrongCharsMatchesOp3 = text.match(wrongCharsRegexOp3);
        let selection = window.getSelection();
        let range = document.createRange();
        let remadeCiteText = text;
        let isCursorAutoMoved = false;
        let isAlertMade = false;
        let isSpanActive = false;
        let spaceMatches = text.match(spaceRegex);
        let isUndoUppercase = false;
        if (text.length === 1 && !newWordMatches) {
            let firstLetterMatch = text[0]?.match(autoCapitalizeFirstLetterRegex);
            if (firstLetterMatch) {
                let capitalizedFirstLetter = text[0]?.toUpperCase();
                let nextLetters = text.substring(1).toLowerCase();
                textElement.value = capitalizedFirstLetter + nextLetters;
                let firstLetterMatch = text[0]?.match(autoCapitalizeFirstLetterRegex);
                if (firstLetterMatch) {
                    if (range.endOffset >= 1) {
                        range.setStart(textElement, 0);
                        range.setEnd(textElement, 1);
                        range.collapse(true);
                        selection?.removeAllRanges();
                        selection?.addRange(range);
                    }
                }
            }
        }
        else if (text.length > 1) {
            if (textElement.classList.contains("inpAst") ||
                textElement.classList.contains("inpIdentif")) {
                // console.log("inp nome");
                function undoWrongChars() {
                    if (wrongCharsMatchesOp1 || wrongCharsMatchesOp2) {
                        let wrongCharsMatches = [];
                        if (wrongCharsMatchesOp1) {
                            wrongCharsMatches =
                                wrongCharsMatches.concat(wrongCharsMatchesOp1);
                        }
                        if (wrongCharsMatchesOp2) {
                            wrongCharsMatches =
                                wrongCharsMatches.concat(wrongCharsMatchesOp2);
                        }
                        if (wrongCharsMatchesOp3) {
                            wrongCharsMatches =
                                wrongCharsMatches.concat(wrongCharsMatchesOp3);
                        }
                        // console.log(wrongCharsMatches);
                        for (let iW = 0; iW < wrongCharsMatches.length; iW++) {
                            let wrongCharLength = wrongCharsMatches[iW].length;
                            wrongCharsMatches.forEach((wrongCharMatch) => {
                                let wrongCharIndex = text.indexOf(wrongCharMatch);
                                let arrayCite = Array.from(text);
                                arrayCite.splice(wrongCharIndex, wrongCharLength, "");
                                let fixedStrCite = arrayCite.toString().replaceAll(",", "");
                                textElement.value = fixedStrCite;
                                correctCursorNextWords(isUndoUppercase);
                                range.selectNodeContents(textElement);
                                range.collapse(false);
                                selection?.removeAllRanges();
                                selection?.addRange(range);
                            });
                        }
                    }
                }
                undoWrongChars();
                function undoMultipleUppercases() {
                    let unproperUppercases = [];
                    let unproperDUppercases = [];
                    if (multipleUppercasesMatches) {
                        unproperUppercases = unproperUppercases.concat(multipleUppercasesMatches);
                    }
                    if (wrongUppercasesMatchesOp1) {
                        unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp1);
                    }
                    if (wrongUppercasesMatchesOp2) {
                        unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp2);
                    }
                    if (wrongUppercasesMatchesOp3) {
                        unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp3);
                    }
                    if (wrongUppercasesMatchesOp4) {
                        unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp4);
                    }
                    if (wrongUppercasesMatchesOp5) {
                        unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp5);
                    }
                    if (wrongUppercasesMatchesOp6) {
                        unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp6);
                    }
                    if (wrongUppercasesMatchesOp7) {
                        unproperDUppercases = unproperDUppercases.concat(wrongUppercasesMatchesOp7);
                    }
                    if (wrongUppercasesMatchesOp8) {
                        unproperDUppercases = unproperDUppercases.concat(wrongUppercasesMatchesOp8);
                    }
                    if (wrongUppercasesMatchesOp9) {
                        unproperDUppercases = unproperDUppercases.concat(wrongUppercasesMatchesOp9);
                        // console.log("CASO 9 CAPTURADO");
                    }
                    if (wrongUppercasesMatchesOp10) {
                        unproperDUppercases = unproperDUppercases.concat(wrongUppercasesMatchesOp10);
                        // console.log("CASO 10 CAPTURADO");
                    }
                    // if (unproperUppercases) {
                    //   console.log("matches not D " + unproperUppercases);
                    // }
                    // if (unproperDUppercases) {
                    //   console.log("matches unproperD " + unproperDUppercases);
                    // }
                    unproperUppercases.forEach((multipleUppercasesMatch) => {
                        let addAcumulator = 0;
                        let loweredRepetitions = "";
                        let upperCasesRepetitionsIndex = text.indexOf(multipleUppercasesMatch);
                        let repeatedLetter = multipleUppercasesMatch.slice(0, 1);
                        loweredRepetitions = multipleUppercasesMatch.toLowerCase().slice(1);
                        let textBeforeRepetitions = text.substring(0, upperCasesRepetitionsIndex);
                        if (spaceMatches) {
                            let numSpaces = spaceMatches.length;
                            addAcumulator += numSpaces;
                        }
                        let textAfterRepetitions = text.slice(upperCasesRepetitionsIndex + 1 + loweredRepetitions.length, text.length + 1);
                        let textArray = Array.from(text);
                        textArray.splice(upperCasesRepetitionsIndex + 1, loweredRepetitions.length, loweredRepetitions);
                        let upperlowercomb = text.match(/[a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g);
                        let upperlowercombD = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][\s]/);
                        let upperlowercombDS = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][S][\s]/);
                        if (upperlowercomb) {
                            repeatedLetter = repeatedLetter.toLowerCase();
                        }
                        if (upperlowercombD) {
                            repeatedLetter = repeatedLetter.toLowerCase();
                        }
                        if (upperlowercombDS) {
                            upperlowercombDS.splice(3, 1, "s");
                        }
                        textElement.value =
                            textBeforeRepetitions +
                                repeatedLetter +
                                loweredRepetitions +
                                textAfterRepetitions;
                        repAcumulator++;
                        isUndoUppercase = true;
                        correctCursorNextWords(isUndoUppercase);
                        if (range.endOffset >= 1) {
                            range.setStart(textElement, 0);
                            range.setEnd(textElement, 1);
                            range.collapse(true);
                            selection?.removeAllRanges();
                            selection?.addRange(range);
                        }
                    });
                    unproperDUppercases.forEach((multipleUppercasesMatch) => {
                        let addAcumulator = 0;
                        let loweredRepetitions = "";
                        let upperCasesRepetitionsIndex = text.indexOf(multipleUppercasesMatch);
                        loweredRepetitions = multipleUppercasesMatch.toLowerCase().slice(0);
                        let textBeforeRepetitions = text.substring(0, upperCasesRepetitionsIndex);
                        if (spaceMatches) {
                            addAcumulator = 1;
                        }
                        console.log("add num" + addAcumulator);
                        let textAfterRepetitions = text.slice(upperCasesRepetitionsIndex +
                            1 +
                            loweredRepetitions.length -
                            addAcumulator, text.length + 1);
                        let textArray = Array.from(text);
                        textArray.splice(upperCasesRepetitionsIndex + 1, loweredRepetitions.length, loweredRepetitions);
                        let upperlowercombD = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][sS]?[\s]/);
                        if (upperlowercombD) {
                            if (upperlowercombD.length === 4) {
                                let loweredS = upperlowercombD.toString().replace(/S/, "s");
                                loweredRepetitions += loweredS;
                            }
                        }
                        // console.log(textBeforeRepetitions);
                        // console.log(loweredRepetitions);
                        // console.log(textAfterRepetitions);
                        textElement.value =
                            textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
                        repAcumulator++;
                        isUndoUppercase = true;
                        correctCursorNextWords(isUndoUppercase);
                        if (range.endOffset >= 1) {
                            range.setStart(textElement, 0);
                            range.setEnd(textElement, 1);
                            range.collapse(true);
                            selection?.removeAllRanges();
                            selection?.addRange(range);
                        }
                    });
                }
                if (wrongStartMatch) {
                    wrongStartCorrection(wrongStartMatch);
                }
                if (newWordMatches) {
                    adjustNewWord(newWordMatches);
                }
                if (multipleUppercasesMatches || multipleUppercasesMatches2) {
                    undoMultipleUppercases();
                }
                if (letterMatchesIniD) {
                    if (!letterNotMatchesAfterD &&
                        (letterMatchesAfterDOp1 ||
                            letterMatchesAfterDOp2 ||
                            letterMatchesAfterDOp3)) {
                        forceUpperCase();
                    }
                    else if (letterNotMatchesAfterD &&
                        !(letterMatchesAfterDOp1 ||
                            letterMatchesAfterDOp2 ||
                            letterMatchesAfterDOp3)) {
                        letterNotMatchesAfterD = [];
                        forceUpperCase();
                    }
                }
                else if (letterMatchesIniNotD) {
                    forceUpperCase();
                }
                function wrongStartCorrection(wrongStartMatch) {
                    // console.log("chegou na checagem de wrong start");
                    if (wrongStartMatch) {
                        let wrongStartLength = wrongStartMatch
                            .toString()
                            .replaceAll(",", "").length;
                        let addErasedChar = text.slice(0, wrongStartLength - 1);
                        let fixedStart = text.slice(wrongStartLength - 1);
                        textElement.value = fixedStart + addErasedChar;
                    }
                }
                function adjustNewWord(newWordMatches) {
                    // console.log("chegou no adjust");
                    newWordMatches.forEach(() => {
                        capitalizeNextWords();
                    });
                }
                function capitalizeNextWords() {
                    // console.log("chegou no capitalize not D");
                    let globalLetterMatchIndex = 0;
                    let actualChar = "";
                    let capitalizedChar = "";
                    let textArray = [];
                    let filteredArray = [];
                    let mappedArray = [];
                    let arrayCheckLowerCases = [];
                    let i = 0;
                    if (letterMatchesIniNotD && !letterMatchesIniD) {
                        letterMatchesIniNotD.forEach((letterMatch) => {
                            globalLetterMatchIndex =
                                remadeCiteText.lastIndexOf(letterMatch) + 1;
                            actualChar = remadeCiteText.charAt(globalLetterMatchIndex);
                            capitalizedChar = actualChar.toUpperCase();
                            textArray = Array.from(remadeCiteText);
                            textArray[globalLetterMatchIndex] = capitalizedChar;
                            remadeCiteText = textArray.toString().replaceAll(",", "");
                        });
                        textElement.value = remadeCiteText;
                        // console.log("foi chamado pelo capitalizeNext");
                        correctCursorNextWords(isUndoUppercase);
                        wrongStartCorrection(wrongStartMatch);
                        arrayCheckLowerCases = Array.from(letterMatchesIniNotD);
                        for (i = 0; i < arrayCheckLowerCases.length; i++) {
                            filteredArray = letterMatchesIniNotD.filter((i) => lowercasesRegexObj.test(i));
                            mappedArray = filteredArray.map((i) => i.toUpperCase());
                        }
                    }
                    else if ((letterMatchesIniNotD && letterMatchesIniD) ||
                        (!letterMatchesIniNotD && letterMatchesIniD)) {
                        capitalizeNextWordsD();
                    }
                }
                function capitalizeNextWordsD() {
                    // console.log("foi chamado no capitalize D");
                    let letterMatchesAfterD = [];
                    if (!letterNotMatchesAfterD &&
                        (letterMatchesAfterDOp1 ||
                            letterMatchesAfterDOp2 ||
                            letterMatchesAfterDOp3)) {
                        if (letterMatchesAfterDOp1) {
                            letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp1);
                        }
                        if (letterMatchesAfterDOp2) {
                            letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp2);
                        }
                        if (letterMatchesAfterDOp3) {
                            letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp3);
                        }
                        taskCapitalizeD(letterMatchesAfterD);
                    }
                    else if (letterNotMatchesAfterD &&
                        !(letterMatchesAfterDOp1 ||
                            letterMatchesAfterDOp2 ||
                            letterMatchesAfterDOp3)) {
                        if (letterNotMatchesAfterD && letterMatchesIniNotD) {
                            letterMatchesAfterD =
                                letterMatchesAfterD.concat(letterMatchesIniNotD);
                            taskCapitalizeD(letterMatchesAfterD);
                        }
                    }
                    else if (letterNotMatchesAfterD &&
                        (letterMatchesAfterDOp1 ||
                            letterMatchesAfterDOp2 ||
                            letterMatchesAfterDOp3 ||
                            letterMatchesIniNotD)) {
                        if (letterMatchesAfterDOp1) {
                            letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp1);
                        }
                        if (letterMatchesAfterDOp2) {
                            letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp2);
                        }
                        if (letterMatchesAfterDOp3) {
                            letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp3);
                        }
                        taskCapitalizeD(letterMatchesAfterD);
                    }
                }
                function taskCapitalizeD(letterMatchesAfterD) {
                    // console.log("TASK FOI CHAMADA");
                    letterMatchesAfterD.forEach((letterMatchD) => {
                        let globalLetterMatchIndexD = remadeCiteText.lastIndexOf(letterMatchD) + 1;
                        let actualCharD = remadeCiteText.charAt(globalLetterMatchIndexD);
                        let capitalizedCharD = actualCharD.toUpperCase();
                        let textArrayD = Array.from(remadeCiteText);
                        textArrayD[globalLetterMatchIndexD] = capitalizedCharD;
                        remadeCiteText = textArrayD.toString().replaceAll(",", "");
                    });
                    textElement.value = remadeCiteText;
                    let arrayCheckLowerCasesD = Array.from(letterMatchesAfterD);
                    for (let iD = 0; iD < arrayCheckLowerCasesD.length; iD++) {
                        let filteredArrayD = letterMatchesAfterD.filter((iD) => lowercasesRegexObj.test(iD));
                        let mappedArrayD = filteredArrayD.map((iD) => iD.toUpperCase());
                        let remadeStringD = "";
                        const targLetter = filteredArrayD[iD];
                        const regexTargLetter = new RegExp(targLetter, "g");
                        if (iD === 0) {
                            filteredArrayD.splice(iD, 1, mappedArrayD[0]);
                            remadeStringD = filteredArrayD.toString().replaceAll(",", "");
                            correctCursorNextWords(isUndoUppercase);
                        }
                        else if (iD === 1) {
                            filteredArrayD.splice(iD, 1, mappedArrayD[1]);
                            remadeStringD = filteredArrayD
                                .toString()
                                .replaceAll(",", "")
                                .slice(2);
                            correctCursorNextWords(isUndoUppercase);
                            textElement.value = textElement.value.replace(regexTargLetter, remadeStringD);
                        }
                        else if (iD > 2) {
                            filteredArrayD.pop();
                            filteredArrayD.push(mappedArrayD[iD]);
                            correctCursorNextWords(isUndoUppercase);
                        }
                    }
                }
                function correctCursorNextWords(isUndoUppercase) {
                    let isFixAfterDCursorExec = false;
                    if (isFixAfterDCursorExec) {
                        return;
                    }
                    let selectionPosition = window
                        .getSelection()
                        ?.getRangeAt(0).startOffset;
                    if (selectionPosition === 0) {
                        wrongStartCorrection(wrongStartMatch);
                        textElement.addEventListener("keyup", (fixmove) => {
                            if ((fixmove instanceof KeyboardEvent &&
                                (fixmove.keyCode === 32 ||
                                    fixmove.keyCode === 8 ||
                                    (fixmove.keyCode >= 37 && fixmove.keyCode <= 40) ||
                                    (fixmove.keyCode >= 65 && fixmove.keyCode <= 90) ||
                                    (fixmove.keyCode >= 97 && fixmove.keyCode <= 122))) ||
                                isUndoUppercase) {
                                if (!isFixAfterDCursorExec) {
                                    moveCursorToTheEnd(textElement);
                                }
                                fixmove.preventDefault();
                                isFixAfterDCursorExec = true;
                            }
                        });
                    }
                }
                function moveCursorToTheEnd(textElement) {
                    // console.log("chegou no moveCursor");
                    if (window.getSelection && !isCursorAutoMoved) {
                        let range = document.createRange();
                        range.selectNodeContents(textElement);
                        range.collapse(false);
                        let sel = window.getSelection();
                        sel?.removeAllRanges();
                        sel?.addRange(range);
                        isCursorAutoMoved = true;
                    }
                }
                function forceUpperCase() {
                    let wordMatch = [];
                    let DMatch = [];
                    if (letterMatchesAfterDOp1) {
                        wordMatch = wordMatch.concat(letterMatchesAfterDOp1);
                        DMatch = DMatch.concat(letterMatchesAfterDOp1);
                    }
                    if (letterMatchesAfterDOp2) {
                        wordMatch = wordMatch.concat(letterMatchesAfterDOp2);
                        DMatch = DMatch.concat(letterMatchesAfterDOp2);
                    }
                    if (letterMatchesAfterDOp3) {
                        wordMatch = wordMatch.concat(letterMatchesAfterDOp3);
                        DMatch = DMatch.concat(letterMatchesAfterDOp3);
                    }
                    if (letterMatchesIniNotD) {
                        wordMatch = wordMatch.concat(letterMatchesIniNotD);
                    }
                    for (let wordMatchI = 0; wordMatchI < wordMatch.length; wordMatchI++) {
                        let uppercaseTest = uppercasesRegexObj.test(wordMatch[wordMatchI]);
                        if (uppercaseTest) {
                            continue;
                        }
                        let strDlowercase = wordMatch[wordMatchI].toString();
                        let DUppercased = strDlowercase.charAt(1).toUpperCase();
                        if (DUppercased) {
                            let strDAfter = strDlowercase.substring(0, 1) +
                                DUppercased +
                                strDlowercase.substring(2);
                            let strDAfterMinusInd = textElement.value.length - strDAfter.length;
                            let oppositeSlicedCite = textElement.value.slice(strDAfterMinusInd);
                            let startSlicedCite = textElement.value.slice(0, strDAfterMinusInd);
                            if (wordMatch.length >= 1) {
                                textElement.value = startSlicedCite + oppositeSlicedCite;
                            }
                        }
                        if (DMatch.length >= 1) {
                            correctCursorNextWords(isUndoUppercase);
                        }
                    }
                }
                textElement.value = textElement.value.replaceAll(wrongCharsRegexOp1, "");
                textElement.value = textElement.value.replaceAll(wrongCharsRegexOp2, "");
                textElement.value = textElement.value.replaceAll(wrongCharsRegexOp3, "");
                textElement.value = textElement.value.replaceAll(/\s[\s]+/g, " ");
                if (text.match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]/)) {
                    const firstLetterCapitalized = text.slice(0, 1).toUpperCase();
                    const restOfText = text.slice(1);
                    textElement.value = firstLetterCapitalized + restOfText;
                }
            }
        }
    }
}
exports.autoCapitalizeInputs = autoCapitalizeInputs;
function autoCapitalizeCite(editableCite) {
    let citeText = editableCite.textContent;
    if (isAutocorrectOn && citeText) {
        let newWordMatches = citeText.match(/\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g);
        let letterMatchesIniNotD = citeText.match(/\s[^d]/g);
        let letterMatchesIniD = citeText.match(/\sd/g);
        const notMatchesAfterDRegex = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g;
        let letterNotMatchesAfterD = citeText.match(notMatchesAfterDRegex);
        const afterDRegexOp1 = /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
        const afterDRegexOp2 = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g;
        const afterDRegexOp3 = /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
        let letterMatchesAfterDOp1 = citeText.match(afterDRegexOp1);
        let letterMatchesAfterDOp2 = citeText.match(afterDRegexOp2);
        let letterMatchesAfterDOp3 = citeText.match(afterDRegexOp3);
        const lowercasesRegex = /[a-záàâäãéèêëíìîïóòôöõúùûü]/g;
        const lowercasesRegexObj = new RegExp(lowercasesRegex);
        let lowercasesMatches = citeText.match(lowercasesRegex);
        const uppercasesRegex = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
        const uppercasesRegexObj = new RegExp(uppercasesRegex);
        const multipleUppercasesRegex = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{2,}/g;
        let multipleUppercasesMatches = citeText.match(multipleUppercasesRegex);
        const wrongUppercasesRegexOp1 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g;
        let wrongUppercasesMatchesOp1 = citeText.match(wrongUppercasesRegexOp1);
        const wrongUppercasesRegexOp2 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        let wrongUppercasesMatchesOp2 = citeText.match(wrongUppercasesRegexOp2);
        const wrongUppercasesRegexOp3 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g;
        let wrongUppercasesMatchesOp3 = citeText.match(wrongUppercasesRegexOp3);
        const wrongUppercasesRegexOp4 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        let wrongUppercasesMatchesOp4 = citeText.match(wrongUppercasesRegexOp4);
        const wrongUppercasesRegexOp5 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g;
        let wrongUppercasesMatchesOp5 = citeText.match(wrongUppercasesRegexOp5);
        const wrongUppercasesRegexOp6 = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
        let wrongUppercasesMatchesOp6 = citeText.match(wrongUppercasesRegexOp6);
        const wrongUppercasesRegexOp7 = /D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g;
        let wrongUppercasesMatchesOp7 = citeText.match(wrongUppercasesRegexOp7);
        const wrongUppercasesRegexOp8 = /D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g;
        let wrongUppercasesMatchesOp8 = citeText.match(wrongUppercasesRegexOp8);
        const wrongUppercasesRegexOp9 = /D[aeioáàâäãéèêëíìîïóòôöõúùûü][s]\s/g;
        let wrongUppercasesMatchesOp9 = citeText.match(wrongUppercasesRegexOp9);
        const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
        const computedStyleRegex = /,\d+.?\d*.?\d*/g;
        const spaceRegex = /\s/g;
        const wrongStartRegex = /^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
        let wrongStartMatch = citeText.match(wrongStartRegex);
        const wrongCharsRegexOp1 = /[\s]*[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+[\s]*[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]*/g;
        let wrongCharsMatchesOp1 = citeText.match(wrongCharsRegexOp1);
        const wrongCharsRegexOp2 = /$[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+/g;
        let wrongCharsMatchesOp2 = citeText.match(wrongCharsRegexOp2);
        const wrongCharsRegexOp3 = /(?<=\sdD)[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+/g;
        let wrongCharsMatchesOp3 = citeText.match(wrongCharsRegexOp3);
        let selection = window.getSelection();
        let range = document.createRange();
        let remadeCiteText = citeText;
        let isCursorAutoMoved = false;
        let isAlertMade = false;
        let isSpanActive = false;
        let spaceMatches = citeText.match(spaceRegex);
        let isUndoUppercase = false;
        let addAcumulator = 0;
        function undoWrongChars() {
            if (wrongCharsMatchesOp1 ||
                wrongCharsMatchesOp2 ||
                wrongCharsMatchesOp3) {
                let wrongCharsMatches = [];
                if (wrongCharsMatchesOp1) {
                    wrongCharsMatches = wrongCharsMatches.concat(wrongCharsMatchesOp1);
                }
                if (wrongCharsMatchesOp2) {
                    wrongCharsMatches = wrongCharsMatches.concat(wrongCharsMatchesOp2);
                }
                if (wrongCharsMatchesOp3) {
                    wrongCharsMatches = wrongCharsMatches.concat(wrongCharsMatchesOp3);
                }
                // console.log(wrongCharsMatches);
                for (let iW = 0; iW < wrongCharsMatches.length; iW++) {
                    let wrongCharLength = wrongCharsMatches[iW].length;
                    wrongCharsMatches.forEach((wrongCharMatch) => {
                        if (citeText) {
                            let wrongCharIndex = citeText.indexOf(wrongCharMatch); //erro de leitura do TS
                            let arrayCite = Array.from(citeText);
                            arrayCite.splice(wrongCharIndex, wrongCharLength, "");
                            let fixedStrCite = arrayCite
                                .toString()
                                .replaceAll(",", ""); //TS desatualizado
                            editableCite.textContent = fixedStrCite;
                            correctCursorNextWords(isUndoUppercase);
                            range.selectNodeContents(editableCite);
                            range.collapse(false);
                            if (selection) {
                                //irá gerar trava no .js
                                selection.removeAllRanges();
                                selection.addRange(range);
                                createSpanAlert(isSpanActive);
                            }
                        }
                    });
                }
            }
        }
        undoWrongChars();
        function undoMultipleUppercases() {
            let unproperUppercases = [];
            let unproperDUppercases = []; //EM JS É CONSIDERADO ARRAY DE ARRAY DE STRINGS
            if (multipleUppercasesMatches) {
                unproperUppercases = unproperUppercases.concat(multipleUppercasesMatches);
            }
            if (wrongUppercasesMatchesOp1) {
                unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp1);
            }
            if (wrongUppercasesMatchesOp2) {
                unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp2);
            }
            if (wrongUppercasesMatchesOp3) {
                unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp3);
            }
            if (wrongUppercasesMatchesOp4) {
                unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp4);
            }
            if (wrongUppercasesMatchesOp5) {
                unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp5);
            }
            if (wrongUppercasesMatchesOp6) {
                unproperUppercases = unproperUppercases.concat(wrongUppercasesMatchesOp6);
            }
            if (wrongUppercasesMatchesOp7) {
                unproperDUppercases = unproperDUppercases.concat(wrongUppercasesMatchesOp7);
            }
            if (wrongUppercasesMatchesOp8) {
                unproperDUppercases = unproperDUppercases.concat(wrongUppercasesMatchesOp8);
            }
            if (wrongUppercasesMatchesOp9) {
                unproperDUppercases = unproperDUppercases.concat(wrongUppercasesMatchesOp9);
            }
            unproperUppercases.forEach((multipleUppercasesMatch) => {
                //EM JS CADA UNIDADE É ARRAY DE STRINGS
                let loweredRepetitions = "";
                if (citeText && multipleUppercasesMatch) {
                    let upperCasesRepetitionsIndex = citeText.indexOf(multipleUppercasesMatch);
                    let repeatedLetter = multipleUppercasesMatch.slice(0, 1);
                    loweredRepetitions = multipleUppercasesMatch.toLowerCase().slice(1);
                    let textBeforeRepetitions = citeText.substring(0, upperCasesRepetitionsIndex);
                    if (spaceMatches) {
                        let numSpaces = spaceMatches.length;
                        addAcumulator += numSpaces;
                    }
                    let textAfterRepetitions = citeText.slice(upperCasesRepetitionsIndex + 1 + loweredRepetitions.length, citeText.length + 1);
                    let textArray = Array.from(citeText);
                    textArray.splice(upperCasesRepetitionsIndex + 1, loweredRepetitions.length, loweredRepetitions);
                    editableCite.textContent =
                        textBeforeRepetitions +
                            repeatedLetter +
                            loweredRepetitions +
                            textAfterRepetitions;
                    repAcumulator++;
                    isUndoUppercase = true;
                    correctCursorNextWords(isUndoUppercase);
                    range.selectNodeContents(editableCite);
                    range.collapse(false);
                    if (selection) {
                        selection.removeAllRanges();
                        selection.addRange(range);
                        createSpanAlert(isSpanActive);
                    }
                }
            });
            unproperDUppercases.forEach((multipleUppercasesMatch) => {
                let loweredRepetitions = "";
                if (citeText && multipleUppercasesMatch) {
                    let upperCasesRepetitionsIndex = citeText.indexOf(multipleUppercasesMatch);
                    loweredRepetitions = multipleUppercasesMatch.toLowerCase().slice(0);
                    let textBeforeRepetitions = citeText.substring(0, upperCasesRepetitionsIndex);
                    if (lowercasesMatches) {
                        let numLowercases = lowercasesMatches.length;
                        addAcumulator += numLowercases;
                    }
                    if (spaceMatches) {
                        let numSpaces = spaceMatches.length;
                        addAcumulator += numSpaces;
                    }
                    let textAfterRepetitions = citeText.slice(upperCasesRepetitionsIndex + 1 + loweredRepetitions.length, citeText.length + 1);
                    let textArray = Array.from(citeText);
                    textArray.splice(upperCasesRepetitionsIndex + 1, loweredRepetitions.length, loweredRepetitions);
                    editableCite.textContent =
                        textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
                    repAcumulator++;
                    isUndoUppercase = true;
                    correctCursorNextWords(isUndoUppercase);
                    range.selectNodeContents(editableCite);
                    if (selection) {
                        range.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(range);
                        createSpanAlert(isSpanActive);
                    }
                }
            });
        }
        if (citeText.length === 1 && !newWordMatches) {
            let firstLetterMatch = citeText[0]?.match(autoCapitalizeFirstLetterRegex);
            if (firstLetterMatch) {
                let capitalizedFirstLetter = citeText[0]?.toUpperCase();
                let nextLetters = citeText.substring(1).toLowerCase();
                editableCite.textContent = capitalizedFirstLetter + nextLetters;
                let firstLetterMatch = citeText[0]?.match(autoCapitalizeFirstLetterRegex);
                if (firstLetterMatch) {
                    range.setStart(editableCite.childNodes[0], 1);
                    range.collapse(true);
                    if (selection) {
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
            }
        }
        else if (citeText.length > 1) {
            if (wrongStartMatch) {
                wrongStartCorrection(wrongStartMatch);
            }
            if (newWordMatches) {
                adjustNewWord(newWordMatches);
            }
            if (multipleUppercasesMatches) {
                undoMultipleUppercases();
            }
        }
        if (letterMatchesIniD) {
            if (!letterNotMatchesAfterD &&
                (letterMatchesAfterDOp1 ||
                    letterMatchesAfterDOp2 ||
                    letterMatchesAfterDOp3)) {
                forceUpperCase();
            }
            else if (letterNotMatchesAfterD &&
                !(letterMatchesAfterDOp1 ||
                    letterMatchesAfterDOp2 ||
                    letterMatchesAfterDOp3)) {
                letterNotMatchesAfterD = [];
                forceUpperCase();
            }
        }
        else if (letterMatchesIniNotD) {
            forceUpperCase();
        }
        function wrongStartCorrection(wrongStartMatch) {
            // console.log("chegou na checagem de wrong start");
            if (wrongStartMatch && citeText) {
                let wrongStartLength = wrongStartMatch
                    .toString()
                    .replaceAll(",", "").length;
                let addErasedChar = citeText.slice(0, wrongStartLength - 1);
                let fixedStart = citeText.slice(wrongStartLength - 1);
                editableCite.textContent = fixedStart + addErasedChar;
            }
        }
        function adjustNewWord(newWordMatches) {
            // console.log("chegou no adjust");
            newWordMatches.forEach(() => {
                capitalizeNextWords();
            });
        }
        function capitalizeNextWords() {
            // console.log("chegou no capitalize not D");
            let globalLetterMatchIndex = 0;
            let actualChar = "";
            let capitalizedChar = "";
            let citeTextArray = [];
            let filteredArray = [];
            let mappedArray = [];
            let arrayCheckLowerCases = [];
            let i = 0;
            if (letterMatchesIniNotD && !letterMatchesIniD) {
                letterMatchesIniNotD.forEach((letterMatch) => {
                    if (remadeCiteText) {
                        console.log("init not D start");
                        globalLetterMatchIndex =
                            remadeCiteText.lastIndexOf(letterMatch) + 1;
                        actualChar = remadeCiteText.charAt(globalLetterMatchIndex);
                        capitalizedChar = actualChar.toUpperCase();
                        citeTextArray = Array.from(remadeCiteText);
                        citeTextArray[globalLetterMatchIndex] = capitalizedChar;
                        remadeCiteText = citeTextArray.toString().replaceAll(",", "");
                    }
                });
                editableCite.textContent = remadeCiteText;
                // console.log("foi chamado pelo capitalizeNext");
                correctCursorNextWords(isUndoUppercase);
                wrongStartCorrection(wrongStartMatch);
                arrayCheckLowerCases = Array.from(letterMatchesIniNotD);
                for (i = 0; i < arrayCheckLowerCases.length; i++) {
                    filteredArray = letterMatchesIniNotD.filter((i) => lowercasesRegexObj.test(i));
                    mappedArray = filteredArray.map((i) => i.toUpperCase());
                }
            }
            else if ((letterMatchesIniNotD && letterMatchesIniD) ||
                (!letterMatchesIniNotD && letterMatchesIniD)) {
                capitalizeNextWordsD();
            }
        }
        function capitalizeNextWordsD() {
            // console.log("foi chamado no capitalize D");
            let letterMatchesAfterD = [];
            if (!letterNotMatchesAfterD &&
                (letterMatchesAfterDOp1 ||
                    letterMatchesAfterDOp2 ||
                    letterMatchesAfterDOp3)) {
                if (letterMatchesAfterDOp1) {
                    letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp1);
                }
                if (letterMatchesAfterDOp2) {
                    letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp2);
                }
                if (letterMatchesAfterDOp3) {
                    letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp3);
                }
                taskCapitalizeD(letterMatchesAfterD);
            }
            else if (letterNotMatchesAfterD &&
                !(letterMatchesAfterDOp1 ||
                    letterMatchesAfterDOp2 ||
                    letterMatchesAfterDOp3)) {
                if (letterNotMatchesAfterD && letterMatchesIniNotD) {
                    letterMatchesAfterD =
                        letterMatchesAfterD.concat(letterMatchesIniNotD);
                    taskCapitalizeD(letterMatchesAfterD);
                }
            }
            else if (letterNotMatchesAfterD &&
                (letterMatchesAfterDOp1 ||
                    letterMatchesAfterDOp2 ||
                    letterMatchesAfterDOp3 ||
                    letterMatchesIniNotD)) {
                if (letterMatchesAfterDOp1) {
                    letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp1);
                }
                if (letterMatchesAfterDOp2) {
                    letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp2);
                }
                if (letterMatchesAfterDOp3) {
                    letterMatchesAfterD = letterMatchesAfterD.concat(letterMatchesAfterDOp3);
                }
                taskCapitalizeD(letterMatchesAfterD);
            }
        }
        function taskCapitalizeD(letterMatchesAfterD) {
            // console.log("TASK FOI CHAMADA");
            letterMatchesAfterD?.forEach((letterMatchD) => {
                let globalLetterMatchIndexD = remadeCiteText
                    ? remadeCiteText.lastIndexOf(letterMatchD) + 1
                    : undefined;
                if (globalLetterMatchIndexD) {
                    let actualCharD = remadeCiteText?.charAt(globalLetterMatchIndexD);
                    let capitalizedCharD = actualCharD?.toUpperCase();
                    if (remadeCiteText && capitalizedCharD) {
                        let citeTextArrayD = Array.from(remadeCiteText);
                        citeTextArrayD[globalLetterMatchIndexD] = capitalizedCharD;
                        remadeCiteText = citeTextArrayD.toString().replaceAll(",", "");
                    }
                }
            });
            editableCite.textContent = remadeCiteText;
            let arrayCheckLowerCasesD = Array.from(letterMatchesAfterD ?? []);
            for (let iD = 0; iD < arrayCheckLowerCasesD.length; iD++) {
                let filteredArrayD = letterMatchesAfterD?.filter((iD) => lowercasesRegexObj.test(iD));
                if (filteredArrayD) {
                    let mappedArrayD = filteredArrayD.map((iD) => iD.toUpperCase());
                    let remadeStringD = "";
                    const targLetter = filteredArrayD[iD];
                    const regexTargLetter = new RegExp(targLetter, "g");
                    if (iD === 0) {
                        createSpanAlert(isSpanActive);
                        filteredArrayD.splice(iD, 1, mappedArrayD[0]);
                        remadeStringD = filteredArrayD.toString().replaceAll(",", "");
                        correctCursorNextWords(isUndoUppercase);
                    }
                    else if (iD === 1) {
                        createSpanAlert(isSpanActive);
                        filteredArrayD.splice(iD, 1, mappedArrayD[1]);
                        remadeStringD = filteredArrayD
                            .toString()
                            .replaceAll(",", "")
                            .slice(2);
                        correctCursorNextWords(isUndoUppercase);
                        if (editableCite.textContent) {
                            editableCite.textContent = editableCite.textContent.replace(regexTargLetter, remadeStringD);
                        }
                    }
                    else if (iD > 2) {
                        filteredArrayD.pop();
                        filteredArrayD.push(mappedArrayD[iD]);
                        correctCursorNextWords(isUndoUppercase);
                    }
                }
            }
        }
        function createSpanAlert(isSpanActive) {
            if (editableCite.nextElementSibling) {
                let nextCiteElementSibling = editableCite.nextElementSibling.id;
                if (nextCiteElementSibling === "deactAutocorrectBtn" && !isSpanActive) {
                    const cursorResetAlert = document.createElement("span");
                    if (!isAlertMade) {
                        cursorResetAlert.textContent =
                            "Cursor resetado! Aperte alguma tecla Arrow";
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
                        let computedStyleCite = window
                            .getComputedStyle(editableCite)
                            .getPropertyValue("border-color");
                        let rgbaMatch = computedStyleCite.match(rgbaRegex);
                        if (rgbaMatch) {
                            let reduceOpacity = setInterval(() => {
                                let poppedArray = rgbaMatch?.pop(); //faz a retirada inicial
                                let strUpdatedAlpha = poppedArray?.toString();
                                if (rgbaMatch) {
                                    // console.log("rgbaMatch validado");
                                    let strRgba = rgbaMatch
                                        .toString()
                                        .replaceAll(computedStyleRegex, "");
                                    let firstSliceStrRgba = strRgba.slice(0, 18);
                                    let strNewOpacityValue = firstSliceStrRgba + " " + strUpdatedAlpha + ")";
                                    if (strUpdatedAlpha && strUpdatedAlpha <= "0.05") {
                                        strUpdatedAlpha = "0";
                                        strNewOpacityValue = firstSliceStrRgba + "0)";
                                        cursorResetAlert.remove();
                                        clearInterval(reduceOpacity);
                                    }
                                    editableCite.style.setProperty("border-color", strNewOpacityValue);
                                }
                            }, 100);
                        }
                    }, 500);
                }
                else if (nextCiteElementSibling === "briefAlertCite" ||
                    isSpanActive) {
                    // console.log("span já criado");
                }
            }
        }
        function correctCursorNextWords(isUndoUppercase) {
            let isFixAfterDCursorExec = false;
            if (isFixAfterDCursorExec) {
                return;
            }
            let selectionPosition = window.getSelection()?.getRangeAt(0).startOffset;
            if (selectionPosition === 0) {
                wrongStartCorrection(wrongStartMatch);
                editableCite.addEventListener("keyup", (fixmove) => {
                    if (fixmove.keyCode === 32 ||
                        fixmove.keyCode === 8 ||
                        (fixmove.keyCode >= 37 && fixmove.keyCode <= 40) ||
                        (fixmove.keyCode >= 65 && fixmove.keyCode <= 90) ||
                        (fixmove.keyCode >= 97 && fixmove.keyCode <= 122) ||
                        isUndoUppercase) {
                        if (!isFixAfterDCursorExec) {
                            moveCursorToTheEnd(editableCite);
                        }
                        fixmove.preventDefault();
                        isFixAfterDCursorExec = true;
                    }
                });
            }
        }
        function moveCursorToTheEnd(editableCite) {
            // console.log("chegou no moveCursor");
            if (window.getSelection && !isCursorAutoMoved) {
                let range = document.createRange();
                range.selectNodeContents(editableCite);
                range.collapse(false);
                let sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
                isCursorAutoMoved = true;
            }
        }
        function forceUpperCase() {
            let wordMatch = [];
            let DMatch = [];
            if (letterMatchesAfterDOp1) {
                wordMatch = wordMatch.concat(letterMatchesAfterDOp1);
                DMatch = DMatch.concat(letterMatchesAfterDOp1);
            }
            if (letterMatchesAfterDOp2) {
                wordMatch = wordMatch.concat(letterMatchesAfterDOp2);
                DMatch = DMatch.concat(letterMatchesAfterDOp2);
            }
            if (letterMatchesAfterDOp3) {
                wordMatch = wordMatch.concat(letterMatchesAfterDOp3);
                DMatch = DMatch.concat(letterMatchesAfterDOp3);
            }
            if (letterMatchesIniNotD) {
                wordMatch = wordMatch.concat(letterMatchesIniNotD);
            }
            for (let wordMatchI = 0; wordMatchI < wordMatch.length; wordMatchI++) {
                let uppercaseTest = uppercasesRegexObj.test(wordMatch[wordMatchI]);
                if (uppercaseTest) {
                    continue;
                }
                let strDlowercase = wordMatch[wordMatchI].toString();
                let DUppercased = strDlowercase.charAt(1).toUpperCase();
                if (DUppercased) {
                    let strDAfter = strDlowercase.substring(0, 1) +
                        DUppercased +
                        strDlowercase.substring(2);
                    let strDAfterMinusInd = (editableCite.textContent?.length ?? 0) - strDAfter.length;
                    let oppositeSlicedCite = editableCite.textContent?.slice(strDAfterMinusInd);
                    let startSlicedCite = editableCite.textContent?.slice(0, strDAfterMinusInd);
                    if (wordMatch.length >= 1 && startSlicedCite && oppositeSlicedCite) {
                        editableCite.textContent = startSlicedCite + oppositeSlicedCite;
                    }
                }
                if (DMatch.length >= 1) {
                    correctCursorNextWords(isUndoUppercase);
                    createSpanAlert(isSpanActive);
                }
            }
        }
        if (wrongCharsMatchesOp1) {
            editableCite.textContent =
                editableCite.textContent?.replaceAll(wrongCharsRegexOp1, "") ?? null;
        }
        if (wrongCharsMatchesOp2) {
            editableCite.textContent =
                editableCite.textContent?.replaceAll(wrongCharsRegexOp2, "") ?? null;
        }
        if (wrongCharsMatchesOp3) {
            editableCite.textContent =
                editableCite.textContent?.replaceAll(wrongCharsRegexOp3, "") ?? null;
        }
        if (editableCite.textContent?.match(/\s[\s]+/g)) {
            editableCite.textContent =
                editableCite.textContent?.replaceAll(/\s[\s]+/g, " ") ?? null;
        }
    }
}
exports.autoCapitalizeCite = autoCapitalizeCite;
function removeFirstClick(editableCite) {
    editableCite.textContent === "Insira Seu Nome Aqui"
        ? (editableCite.textContent = "")
        : null;
    let isCursorCheckExec = true;
    let cursorPosition = 0;
    setInterval(() => {
        cursorPosition = Controller.cursorCheckTimer(cursorPosition) ?? 0;
    }, 3000);
}
exports.removeFirstClick = removeFirstClick;
function switchAutocorrect(click, deactAutocorrectBtn) {
    if (click.target === deactAutocorrectBtn) {
        isAutocorrectOn = !isAutocorrectOn; //simplificação de if-else; if-if não funciona aqui
        deactAutocorrectBtn.textContent = isAutocorrectOn
            ? "Desativar Autocorreção"
            : "Ativar Autocorreção";
    }
}
exports.switchAutocorrect = switchAutocorrect;
function changeTabDCutLayout(protocolo, tabDC) {
    const bodyType = document.getElementById("textBodytype");
    if (protocolo &&
        tabDC &&
        bodyType &&
        (bodyType instanceof HTMLSelectElement ||
            bodyType instanceof HTMLInputElement)) {
        const opsProtocolo = Array.from(protocolo.children);
        const filteredOpsProtocolo = opsProtocolo.filter((childProtocolo) => childProtocolo instanceof HTMLOptionElement);
        if (filteredOpsProtocolo.length < opsProtocolo.length) {
            console.warn(`Algum elementos de Protocolo não foram reconhecidos como opções. Total de reconhecimentos: ${filteredOpsProtocolo.length}`);
        }
        for (let iOp = 0; iOp < filteredOpsProtocolo.length - 1; iOp++) {
            const optionElement = filteredOpsProtocolo[iOp];
            const optionElementMatch7 = protocolo.value
                .match(/^pollock7$/i)
                ?.toString();
            const optionElementMatch3 = protocolo.value
                .match(/^pollock3$/i)
                ?.toString();
            if (optionElementMatch3) {
                console.log(protocolo.value);
                const arrayTabIds = checkTabRowsIds(tabDC);
                if (arrayTabIds && arrayTabIds.length !== tabDC.rows.length) {
                    const genderedIds = filterIdsByGender(arrayTabIds, bodyType.value);
                    if (bodyType.value === "masculino" || bodyType.value === "feminino") {
                        if (genderedIds && genderedIds.length === 3) {
                            let matchedIds = [];
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
                                    console.log("required removido");
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
                                        console.log("required adicionado");
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
                            let matchedIds = [];
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
                                    innerInp.value = "0";
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
                        console.warn(`Erro validando valor de bodyType. Valor: ${bodyType.value}`);
                    }
                }
                else {
                    console.warn(`Erro na verificação do número de rows. Elemento ${JSON.stringify(arrayTabIds)}; Número obtido: ${arrayTabIds?.length ?? null}; Número esperado: ${tabDC.rows.length}`);
                }
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
            }
            else {
                console.warn(`Erro na match de protocolo. Protocolo: ${protocolo.value}`);
            }
        }
    }
    else {
        console.warn(`Erro validando campo de tipo corporal: elemento ${bodyType}, instância ${Object.prototype.toString.call(bodyType).slice(-8, 1) ?? null}`);
    }
}
exports.changeTabDCutLayout = changeTabDCutLayout;
function checkTabRowsIds(tab) {
    let arrayTabIds = [];
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
                console.warn(`Erro validando id da row. Id: ${rowId}`);
            }
        }
    }
    else {
        console.warn(`Erro validando id da Tabela de DCut. Id: ${tab.id}`);
    }
    return arrayTabIds;
}
function filterIdsByGender(arrayIds, bodyType) {
    if (Array.isArray(arrayIds)) {
        if (arrayIds.every((prop) => typeof prop === "string") &&
            typeof bodyType === "string") {
            let genderedIds = [];
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
                    console.warn(`Erro reocnhecendo value de bodyType. Value: ${bodyType}`);
            }
            return genderedIds;
        }
        else {
            console.warn(`Erro validando elementos como strings`);
        }
    }
    else {
        console.warn(`Erro validando array`);
    }
}