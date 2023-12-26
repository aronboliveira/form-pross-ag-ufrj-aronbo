//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização
"use strict";
import * as GlobalHandler from "./gHandlers.js";
import type { entryEl, textEl, formPerson, targStr, targEl } from "./types.js";
import { Man, Woman, Neutro } from "./classes.js";
import * as ErrorHandler from "./errorHandler.js";
// import React from 'react';

const autoCapitalizeFirstLetterRegex = /\b\w/;
let isAutocorrectOn = true;

export function numberLimit(inputElement: HTMLInputElement) {
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
      const wrongMatch = numberValue.match(
        /[=.,;~/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]/g
      );
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

    if (
      (isAtivFis || isAlimRot || isDDD || isFreq) &&
      numberValue.length > maxLength
    ) {
      numberValue = numberValue.slice(0, maxLength);
      inputElement.value = numberValue;
    }
  }
}

export function normalizeNegatives(tabInp: Element) {
  let parsedInpValue = 0;
  if (tabInp instanceof HTMLInputElement) {
    parsedInpValue = parseFloat(tabInp.value);
    // if (Number.isNaN(parsedInpValue) || parsedInpValue < 0) {
    //   parsedInpValue = 0;
    // }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.inputNotFound(tabInp ?? null, "tabInp", slicedError ?? "NULL");
  }
  return parsedInpValue.toString();
}

function correctCursorNextWords(
  isCursorAutoMoved: boolean,
  isUndoUppercase: boolean,
  match: string | null,
  textElement: Element
) {
  let text = (textElement as entryEl).value || textElement.textContent || null;
  let isFixAfterDCursorExec = false;

  if (isFixAfterDCursorExec) return;
  const selectionPosition = window.getSelection()?.getRangeAt(0).startOffset;
  text = wrongStartCorrection(text, match);
  textElement.addEventListener("keyup", (fixmove) => {
    const keyboardEvent = fixmove as KeyboardEvent;
    if (selectionPosition === 0 || selectionPosition === text?.length || 0) {
      if (
        keyboardEvent.key === " " ||
        keyboardEvent.key === "Backspace" ||
        (keyboardEvent.key >= "ArrowLeft" &&
          keyboardEvent.key <= "ArrowDown") ||
        (keyboardEvent.key >= "a" && keyboardEvent.key <= "z") ||
        (keyboardEvent.key >= "A" && keyboardEvent.key <= "Z") ||
        isUndoUppercase
      ) {
        if (!isFixAfterDCursorExec) {
          isCursorAutoMoved = moveCursorToTheEnd(
            isCursorAutoMoved,
            textElement
          );
        }
        keyboardEvent.preventDefault();
        isFixAfterDCursorExec = true;
      }
    }
  });
  return [text, isCursorAutoMoved];
}

function wrongStartCorrection(
  text: string | null,
  wrongStartMatch: string | null
) {
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

function moveCursorToTheEnd(isCursorAutoMoved: boolean, textElement: Element) {
  if (window.getSelection && !isCursorAutoMoved) {
    const range = document.createRange();
    range.selectNodeContents(textElement);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    isCursorAutoMoved = true;
  } else {
    isCursorAutoMoved = false;
  }
  return isCursorAutoMoved;
}

function fixCursorPosition(
  textElement: Element,
  range: Range,
  selection: Selection | null,
  shouldSetEnd: boolean
) {
  range.setStart(textElement, 0);
  if (shouldSetEnd === true) {
    range.setEnd(textElement, 1);
  }
  range.collapse(true);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function fixFirstLetter(
  fstLet: string,
  regex: RegExp,
  textElement: Element,
  range: Range,
  selection: Selection | null,
  shouldSetEnd: boolean
) {
  let contText =
    (textElement as entryEl).value || textElement.textContent || "";
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

function fixWrongStarts(text: targStr, match: targStr, length: number) {
  let fixedStr = text ?? "";
  if (text && match) {
    const wrongCharIndex = text.indexOf(match);
    const arrText = Array.from(text);
    arrText.splice(wrongCharIndex, length, "");
    fixedStr = arrText.toString().replaceAll(",", "");
  }
  return fixedStr;
}

function fixNextWordsIniNotD(remadeText: string, letMatch: string) {
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
  } else {
    remadeText = "";
  }
  return remadeText;
}

function fixNextWordsAfterD(remadeText: string, letMatch: string) {
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

function fixUnproperUppercases(
  text: string,
  match: string,
  context: string | number
) {
  const spaceRegex = /\s/g;
  const spaceMatches = text.match(spaceRegex);
  const upperCasesRepetitionsIndex = text.indexOf(match);
  const repeatedLetter = match.slice(0, 1);
  const textBeforeRepetitions = text.substring(0, upperCasesRepetitionsIndex);
  let addAcumulator = 0;
  let loweredRepetitions = "";

  loweredRepetitions = match.toLowerCase().slice(1);
  if (spaceMatches) {
    if (
      context === "NoD" ||
      context === "YesDCont" ||
      context == 0 ||
      context === 2 ||
      !context
    ) {
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
    } else if (context === "YesDVal" || context === 1) {
      addAcumulator = 1;
    } else {
      console.error(`Context value not suitable`);
    }
  }
  const textAfterRepetitions = text.slice(
    upperCasesRepetitionsIndex + 1 + loweredRepetitions.length - addAcumulator,
    text.length + 1
  );
  const textArray = Array.from(text);
  textArray.splice(
    upperCasesRepetitionsIndex + 1,
    loweredRepetitions.length,
    loweredRepetitions
  );
  if (context === "NoD" || context == 0 || !context) {
    text =
      textBeforeRepetitions +
      repeatedLetter +
      loweredRepetitions +
      textAfterRepetitions;
  } else if (context === "YesDVal") {
    const upperlowercombD = text.match(/D[a-záàâäãéèêëíìîïóòôöõúùûü][sS]?[\s]/);
    if (upperlowercombD) {
      if (upperlowercombD.length === 4) {
        const loweredS = upperlowercombD.toString().replace(/S/, "s");
        loweredRepetitions += loweredS;
      }
    }
    text = textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
  } else if (context === "YesDCont") {
    const multipleConjFix =
      /D[aeiouáàâäãéèêëíìîïóòôöõúùûü][s]\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{3,}/;
    const multipleConjFixMatch = text.match(multipleConjFix);
    if (multipleConjFixMatch) {
      text =
        textBeforeRepetitions + loweredRepetitions + "S" + textAfterRepetitions;
    } else {
      text = textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
    }
  } else {
    console.error(`Context value not suitable`);
  }
  return text;
}

function fixForcedUpperCase(
  textElement: Element,
  wordMatch: string[],
  wMatchIteration: RegExpMatchArray | string
) {
  let text = (textElement as textEl).value || textElement.textContent || "";
  const strDlowercase = wMatchIteration.toString();
  const DUppercased = strDlowercase.charAt(1).toUpperCase();
  if (DUppercased) {
    const strDAfter =
      strDlowercase.substring(0, 1) + DUppercased + strDlowercase.substring(2);
    const strDAfterMinusInd = (text?.length ?? 0) - strDAfter.length;
    const oppositeSlicedCite = text?.slice(strDAfterMinusInd);
    const startSlicedCite = text?.slice(0, strDAfterMinusInd);
    if (wordMatch.length >= 1 && startSlicedCite)
      text = startSlicedCite + oppositeSlicedCite;
  }
  return text;
}

export function autoCapitalizeInputs(textElement: entryEl) {
  let text = textElement?.value ?? null;
  if (isAutocorrectOn && text) {
    //inicialização de expressões regex com seus objetos e matches associados
    const newWordMatches = text.match(
      /\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g
    );
    const letterMatchesIniNotD = text.match(/\s[^d]/g);
    const letterMatchesIniD = text.match(/\sd/g);
    const notMatchesAfterDRegex =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g;
    let letterNotMatchesAfterD = text.match(notMatchesAfterDRegex) ?? [];
    const afterDRegexOp1 =
      /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
    const afterDRegexOp2 =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g;
    const afterDRegexOp3 =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
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
    const wrongUppercasesRegexOp1 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g;
    const wrongUppercasesMatchesOp1 = text.match(wrongUppercasesRegexOp1);
    const wrongUppercasesRegexOp2 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    const wrongUppercasesMatchesOp2 = text.match(wrongUppercasesRegexOp2);
    const wrongUppercasesRegexOp3 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g;
    const wrongUppercasesMatchesOp3 = text.match(wrongUppercasesRegexOp3);
    const wrongUppercasesRegexOp4 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    const wrongUppercasesMatchesOp4 = text.match(wrongUppercasesRegexOp4);
    const wrongUppercasesRegexOp5 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g;
    const wrongUppercasesMatchesOp5 = text.match(wrongUppercasesRegexOp5);
    const wrongUppercasesRegexOp6 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    const wrongUppercasesMatchesOp6 = text.match(wrongUppercasesRegexOp6);
    const wrongUppercasesRegexOp7 = /D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g;
    const wrongUppercasesMatchesOp7 = text.match(wrongUppercasesRegexOp7);
    const wrongUppercasesRegexOp8 = /D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g;
    const wrongUppercasesMatchesOp8 = text.match(wrongUppercasesRegexOp8);
    const wrongUppercasesRegexOp9 =
      /D[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]\s/g;
    const wrongUppercasesMatchesOp9 = text.match(wrongUppercasesRegexOp9);
    const wrongStartRegex =
      /^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
    const wrongStartMatch = text.match(wrongStartRegex)?.toString() ?? null;
    const wrongCharsRegexOp1 =
      /[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]*/g;
    const wrongCharsMatchesOp1 = text.match(wrongCharsRegexOp1);
    const wrongCharsRegexOp2 = /$[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
    const wrongCharsMatchesOp2 = text.match(wrongCharsRegexOp2);
    const wrongCharsRegexOp3 =
      /(?<=\sdD)[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
    const wrongCharsMatchesOp3 = text.match(wrongCharsRegexOp3);

    //inicialização de outras variáveis
    const selection = window.getSelection();
    const range = document.createRange();
    let remadeText = text;
    let isUndoUppercase = false;
    let isCursorAutoMoved = false;

    if (text.length === 1 && !newWordMatches) {
      textElement.value = fixFirstLetter(
        text[0],
        autoCapitalizeFirstLetterRegex,
        textElement,
        range,
        selection,
        false
      );
    } else if (text.length > 1) {
      if (
        textElement.classList.contains("inpAst") ||
        textElement.classList.contains("inpIdentif")
      ) {
        //IIFE para encapsular correção de inícios incorretos de entrada
        (() => {
          if (
            wrongCharsMatchesOp1 ||
            wrongCharsMatchesOp2 ||
            wrongCharsMatchesOp3
          ) {
            const wrongCharsMatches = [
              ...(wrongCharsMatchesOp1 || []),
              ...(wrongCharsMatchesOp2 || []),
              ...(wrongCharsMatchesOp3 || []),
            ];

            for (let iW = 0; iW < wrongCharsMatches.length; iW++) {
              const wrongCharLength = wrongCharsMatches[iW].length;
              wrongCharsMatches.forEach((wrongCharMatch) => {
                textElement.value = fixWrongStarts(
                  text,
                  wrongCharMatch,
                  wrongCharLength
                );
                const arrCorrectCursor = correctCursorNextWords(
                  isCursorAutoMoved,
                  isUndoUppercase,
                  wrongStartMatch,
                  textElement
                );
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
                const arrCorrectCursor = correctCursorNextWords(
                  isCursorAutoMoved,
                  isUndoUppercase,
                  wrongStartMatch,
                  textElement
                );
                [textElement.value, isCursorAutoMoved] = arrCorrectCursor;
                textElement.value =
                  wrongStartCorrection(textElement.value, wrongStartMatch) ??
                  "";
              } else if (
                (letterMatchesIniNotD && letterMatchesIniD) ||
                (!letterMatchesIniNotD && letterMatchesIniD)
              ) {
                //IIFE para correção focada em conjunção com D
                (() => {
                  let letterMatchesAfterD: string[] = [];

                  if (
                    !letterNotMatchesAfterD &&
                    (letterMatchesAfterDOp1 ||
                      letterMatchesAfterDOp2 ||
                      letterMatchesAfterDOp3)
                  ) {
                    letterMatchesAfterD = [
                      ...(letterMatchesAfterDOp1 || []),
                      ...(letterMatchesAfterDOp2 || []),
                      ...(letterMatchesAfterDOp3 || []),
                    ];
                  } else if (
                    letterNotMatchesAfterD &&
                    !(
                      letterMatchesAfterDOp1 ||
                      letterMatchesAfterDOp2 ||
                      letterMatchesAfterDOp3
                    )
                  ) {
                    if (letterNotMatchesAfterD && letterMatchesIniNotD) {
                      letterMatchesAfterD = [...(letterMatchesIniNotD || [])];
                    }
                  } else if (
                    letterNotMatchesAfterD &&
                    (letterMatchesAfterDOp1 ||
                      letterMatchesAfterDOp2 ||
                      letterMatchesAfterDOp3 ||
                      letterMatchesIniNotD)
                  ) {
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
                    const arrayCheckLowerCasesD = Array.from(
                      letterMatchesAfterD ?? []
                    );
                    for (let iD = 0; iD < arrayCheckLowerCasesD.length; iD++) {
                      const filteredArrayD = letterMatchesAfterD?.filter((iD) =>
                        lowercasesRegexObj.test(iD)
                      );
                      if (filteredArrayD) {
                        const mappedArrayD = filteredArrayD.map((iD) =>
                          iD.toUpperCase()
                        );
                        let remadeStringD = "";
                        const targLetter = filteredArrayD[iD];
                        const regexTargLetter = new RegExp(targLetter, "g");
                        if (iD === 0) {
                          filteredArrayD.splice(iD, 1, mappedArrayD[0]);
                          remadeStringD = filteredArrayD
                            .toString()
                            .replaceAll(",", "");
                          const arrCorrectCursor = correctCursorNextWords(
                            isCursorAutoMoved,
                            isUndoUppercase,
                            wrongStartMatch,
                            textElement
                          );
                          [textElement.value, isCursorAutoMoved] =
                            arrCorrectCursor;
                        } else if (iD === 1) {
                          filteredArrayD.splice(iD, 1, mappedArrayD[1]);
                          remadeStringD = filteredArrayD
                            .toString()
                            .replaceAll(",", "")
                            .slice(2);
                          const arrCorrectCursor = correctCursorNextWords(
                            isCursorAutoMoved,
                            isUndoUppercase,
                            wrongStartMatch,
                            textElement
                          );
                          [textElement.value, isCursorAutoMoved] =
                            arrCorrectCursor;
                          if (textElement.value) {
                            textElement.value = textElement.value.replace(
                              regexTargLetter,
                              remadeStringD
                            );
                          }
                        } else if (iD > 2) {
                          filteredArrayD.pop();
                          filteredArrayD.push(mappedArrayD[iD]);
                          const arrCorrectCursor = correctCursorNextWords(
                            isCursorAutoMoved,
                            isUndoUppercase,
                            wrongStartMatch,
                            textElement
                          );
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
                text = fixUnproperUppercases(
                  text,
                  multipleUppercasesMatch,
                  "NoD"
                );
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
                const upperlowercombDS = text.match(
                  /D[a-záàâäãéèêëíìîïóòôöõúùûü][S][\s]/
                );
                if (upperlowercombDS) {
                  upperlowercombDS.splice(3, 1, "s");
                }

                textElement.value = text;
                isUndoUppercase = true;
                const arrCorrectCursor = correctCursorNextWords(
                  isCursorAutoMoved,
                  isUndoUppercase,
                  wrongStartMatch,
                  textElement
                );
                [textElement.value, isCursorAutoMoved] = arrCorrectCursor;
                if (range.endOffset >= 1) {
                  fixCursorPosition(textElement, range, selection, true);
                }
              }
            });

            unproperDUppercases.forEach((multipleUppercasesMatch) => {
              if (text && multipleUppercasesMatch) {
                textElement.value = fixUnproperUppercases(
                  text,
                  multipleUppercasesMatch,
                  "YesDVal"
                );
                isUndoUppercase = true;
                const arrCorrectCursor = correctCursorNextWords(
                  isCursorAutoMoved,
                  isUndoUppercase,
                  wrongStartMatch,
                  textElement
                );
                [textElement.value, isCursorAutoMoved] = arrCorrectCursor;
                if (range.endOffset >= 1) {
                  fixCursorPosition(textElement, range, selection, true);
                }
              }
            });
          })();
        }

        //statement para controle de combinação após entrada com inicial D
        if (
          letterMatchesIniD &&
          letterNotMatchesAfterD &&
          !(
            letterMatchesAfterDOp1 ||
            letterMatchesAfterDOp2 ||
            letterMatchesAfterDOp3
          )
        ) {
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
              if (uppercaseTest) continue;
              textElement.value = fixForcedUpperCase(
                textElement,
                wordMatch,
                wordMatch[iM]
              );
              if (DMatch.flat(1).length > 0) {
                const arrCorrectCursor = correctCursorNextWords(
                  isCursorAutoMoved,
                  isUndoUppercase,
                  wrongStartMatch,
                  textElement
                );
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

export function autoCapitalizeCite(editableCite: Element) {
  const citeText = editableCite?.textContent ?? null;
  if (isAutocorrectOn && citeText) {
    //inicialização de expressões regex com seus objetos e matches associados
    const newWordMatches = citeText.match(
      /\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g
    );
    const letterMatchesIniNotD = citeText.match(/\s[^d]/g);
    const letterMatchesIniD = citeText.match(/\sd/g);
    const notMatchesAfterDRegex =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g;
    let letterNotMatchesAfterD = citeText.match(notMatchesAfterDRegex) ?? [];
    const afterDRegexOp1 =
      /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
    const afterDRegexOp2 =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g;
    const afterDRegexOp3 =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
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
    const wrongUppercasesRegexOp1 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g;
    const wrongUppercasesMatchesOp1 = citeText.match(wrongUppercasesRegexOp1);
    const wrongUppercasesRegexOp2 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    const wrongUppercasesMatchesOp2 = citeText.match(wrongUppercasesRegexOp2);
    const wrongUppercasesRegexOp3 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g;
    const wrongUppercasesMatchesOp3 = citeText.match(wrongUppercasesRegexOp3);
    const wrongUppercasesRegexOp4 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    const wrongUppercasesMatchesOp4 = citeText.match(wrongUppercasesRegexOp4);
    const wrongUppercasesRegexOp5 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g;
    const wrongUppercasesMatchesOp5 = citeText.match(wrongUppercasesRegexOp5);
    const wrongUppercasesRegexOp6 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    const wrongUppercasesMatchesOp6 = citeText.match(wrongUppercasesRegexOp6);
    const wrongUppercasesRegexOp7 = /D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g;
    const wrongUppercasesMatchesOp7 = citeText.match(wrongUppercasesRegexOp7);
    const wrongUppercasesRegexOp8 = /D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g;
    const wrongUppercasesMatchesOp8 = citeText.match(wrongUppercasesRegexOp8);
    const wrongUppercasesRegexOp9 = /D[aeioáàâäãéèêëíìîïóòôöõúùûü][s]\s/g;
    const wrongUppercasesMatchesOp9 = citeText.match(wrongUppercasesRegexOp9);
    const wrongStartRegex =
      /^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
    const wrongStartMatch = citeText.match(wrongStartRegex)?.toString() ?? null;
    const wrongCharsRegexOp1 =
      /[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+[\s]*[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]*/g;

    const wrongCharsMatchesOp1 = citeText.match(wrongCharsRegexOp1);
    const wrongCharsRegexOp2 = /$[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
    const wrongCharsMatchesOp2 = citeText.match(wrongCharsRegexOp2);
    const wrongCharsRegexOp3 =
      /(?<=\sdD)[\d\n,;.+\-=~\\/|"!@#$%&*¬°ªº§¹²³£¢(){}[\]]+/g;
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
      editableCite.textContent = fixFirstLetter(
        citeText[0],
        autoCapitalizeFirstLetterRegex,
        editableCite,
        range,
        selection,
        true
      );
    } else if (citeText.length > 1) {
      //IIFE para encapsular correção de inícios incorretos de entrada
      (() => {
        if (
          wrongCharsMatchesOp1 ||
          wrongCharsMatchesOp2 ||
          wrongCharsMatchesOp3
        ) {
          const wrongCharsMatches = [
            ...(wrongCharsMatchesOp1 || []),
            ...(wrongCharsMatchesOp2 || []),
            ...(wrongCharsMatchesOp3 || []),
          ];

          for (let iW = 0; iW < wrongCharsMatches.length; iW++) {
            const wrongCharLength = wrongCharsMatches[iW].length;
            wrongCharsMatches.forEach((wrongCharMatch) => {
              editableCite.textContent = fixWrongStarts(
                citeText,
                wrongCharMatch,
                wrongCharLength
              );
              const arrCorrectCursor = correctCursorNextWords(
                isCursorAutoMoved,
                isUndoUppercase,
                wrongStartMatch,
                editableCite
              );
              [editableCite.textContent, isCursorAutoMoved] = arrCorrectCursor;
              isCursorAutoMoved = moveCursorToTheEnd(
                isCursorAutoMoved,
                editableCite
              );
              [isSpanActive, isAlertMade] = createSpanAlert(
                isSpanActive,
                isAlertMade
              );
            });
          }
        }
      })();

      if (wrongStartMatch) {
        editableCite.textContent = wrongStartCorrection(
          editableCite.textContent,
          wrongStartMatch
        );
      }

      if (newWordMatches) {
        newWordMatches.forEach(() => {
          //IIFE para capitalizar palavras após a primeira
          (() => {
            if (letterMatchesIniNotD && !letterMatchesIniD) {
              letterMatchesIniNotD.forEach((letterMatch) => {
                remadeCiteText = fixNextWordsIniNotD(
                  remadeCiteText,
                  letterMatch
                );
              });
              editableCite.textContent = remadeCiteText;
              isCursorAutoMoved = moveCursorToTheEnd(
                isCursorAutoMoved,
                editableCite
              );

              const arrCorrectCursor = correctCursorNextWords(
                isCursorAutoMoved,
                isUndoUppercase,
                wrongStartMatch,
                editableCite
              );
              [editableCite.textContent, isCursorAutoMoved] = arrCorrectCursor;

              editableCite.textContent = wrongStartCorrection(
                editableCite.textContent,
                wrongStartMatch
              );
            } else if (
              (letterMatchesIniNotD && letterMatchesIniD) ||
              (!letterMatchesIniNotD && letterMatchesIniD)
            ) {
              //IIFE para correção focada em conjunção com D
              (() => {
                let letterMatchesAfterD: string[] = [];

                if (
                  !letterNotMatchesAfterD &&
                  (letterMatchesAfterDOp1 ||
                    letterMatchesAfterDOp2 ||
                    letterMatchesAfterDOp3)
                ) {
                  letterMatchesAfterD = [
                    ...(letterMatchesAfterDOp1 || []),
                    ...(letterMatchesAfterDOp2 || []),
                    ...(letterMatchesAfterDOp3 || []),
                  ];
                } else if (
                  letterNotMatchesAfterD &&
                  !(
                    letterMatchesAfterDOp1 ||
                    letterMatchesAfterDOp2 ||
                    letterMatchesAfterDOp3
                  )
                ) {
                  if (letterNotMatchesAfterD && letterMatchesIniNotD) {
                    letterMatchesAfterD = [...(letterMatchesIniNotD || [])];
                  }
                } else if (
                  letterNotMatchesAfterD &&
                  (letterMatchesAfterDOp1 ||
                    letterMatchesAfterDOp2 ||
                    letterMatchesAfterDOp3 ||
                    letterMatchesIniNotD)
                ) {
                  letterMatchesAfterD = [
                    ...(letterMatchesAfterDOp1 || []),
                    ...(letterMatchesAfterDOp2 || []),
                    ...(letterMatchesAfterDOp3 || []),
                  ];
                }
                //IIFE para capitalização focada em iniciais D
                (() => {
                  letterMatchesAfterD.forEach((letterMatchD) => {
                    remadeCiteText = fixNextWordsAfterD(
                      remadeCiteText,
                      letterMatchD
                    );
                  });
                  editableCite.textContent = remadeCiteText;
                  const arrayCheckLowerCasesD = Array.from(
                    letterMatchesAfterD ?? []
                  );
                  for (let iD = 0; iD < arrayCheckLowerCasesD.length; iD++) {
                    const filteredArrayD = letterMatchesAfterD?.filter((iD) =>
                      lowercasesRegexObj.test(iD)
                    );
                    if (filteredArrayD) {
                      const mappedArrayD = filteredArrayD.map((iD) =>
                        iD.toUpperCase()
                      );
                      let remadeStringD = "";
                      const targLetter = filteredArrayD[iD];
                      const regexTargLetter = new RegExp(targLetter, "g");
                      if (iD === 0) {
                        [isSpanActive, isAlertMade] = createSpanAlert(
                          isSpanActive,
                          isAlertMade
                        );
                        filteredArrayD.splice(iD, 1, mappedArrayD[0]);
                        remadeStringD = filteredArrayD
                          .toString()
                          .replaceAll(",", "");
                        const arrCorrectCursor = correctCursorNextWords(
                          isCursorAutoMoved,
                          isUndoUppercase,
                          wrongStartMatch,
                          editableCite
                        );
                        [editableCite.textContent, isCursorAutoMoved] =
                          arrCorrectCursor;
                      } else if (iD === 1) {
                        [isSpanActive, isAlertMade] = createSpanAlert(
                          isSpanActive,
                          isAlertMade
                        );
                        filteredArrayD.splice(iD, 1, mappedArrayD[1]);
                        remadeStringD = filteredArrayD
                          .toString()
                          .replaceAll(",", "")
                          .slice(2);
                        const arrCorrectCursor = correctCursorNextWords(
                          isCursorAutoMoved,
                          isUndoUppercase,
                          wrongStartMatch,
                          editableCite
                        );
                        [editableCite.textContent, isCursorAutoMoved] =
                          arrCorrectCursor;
                        if (editableCite.textContent) {
                          editableCite.textContent =
                            editableCite.textContent.replace(
                              regexTargLetter,
                              remadeStringD
                            );
                        }
                      } else if (iD > 2) {
                        filteredArrayD.pop();
                        filteredArrayD.push(mappedArrayD[iD]);
                        const arrCorrectCursor = correctCursorNextWords(
                          isCursorAutoMoved,
                          isUndoUppercase,
                          wrongStartMatch,
                          editableCite
                        );
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
              editableCite.textContent = fixUnproperUppercases(
                citeText,
                multipleUppercasesMatch,
                "NoD"
              );
              isUndoUppercase = true;
              const arrCorrectCursor = correctCursorNextWords(
                isCursorAutoMoved,
                isUndoUppercase,
                wrongStartMatch,
                editableCite
              );
              [editableCite.textContent, isCursorAutoMoved] = arrCorrectCursor;
              isCursorAutoMoved = moveCursorToTheEnd(
                isCursorAutoMoved,
                editableCite
              );
              [isSpanActive, isAlertMade] = createSpanAlert(
                isSpanActive,
                isAlertMade
              );
            }
          });

          unproperDUppercases.forEach((multipleUppercasesMatch) => {
            if (citeText && multipleUppercasesMatch) {
              editableCite.textContent = fixUnproperUppercases(
                citeText,
                multipleUppercasesMatch,
                "YesDCont"
              );
              isUndoUppercase = true;
              const arrCorrectCursor = correctCursorNextWords(
                isCursorAutoMoved,
                isUndoUppercase,
                wrongStartMatch,
                editableCite
              );
              [editableCite.textContent, isCursorAutoMoved] = arrCorrectCursor;
              isCursorAutoMoved = moveCursorToTheEnd(
                isCursorAutoMoved,
                editableCite
              );
              [isSpanActive, isAlertMade] = createSpanAlert(
                isSpanActive,
                isAlertMade
              );
            }
          });
        })();
      }
    }

    //statement para correção de blocos após inicial com D
    if (
      letterMatchesIniD &&
      letterNotMatchesAfterD &&
      !(
        letterMatchesAfterDOp1 ||
        letterMatchesAfterDOp2 ||
        letterMatchesAfterDOp3
      )
    ) {
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
          if (uppercaseTest) continue;
          editableCite.textContent = fixForcedUpperCase(
            editableCite,
            wordMatch,
            wordMatch[iM]
          );
          if (DMatch.flat(1).length > 0) {
            const arrCorrectCursor = correctCursorNextWords(
              isCursorAutoMoved,
              isUndoUppercase,
              wrongStartMatch,
              editableCite
            );
            [editableCite.textContent, isCursorAutoMoved] = arrCorrectCursor;
            [isSpanActive, isAlertMade] = createSpanAlert(
              isSpanActive,
              isAlertMade
            );
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
  function createSpanAlert(isSpanActive: boolean, isAlertMade: boolean) {
    const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
    const computedStyleRegex = /,\d+.?\d*.?\d*/g;
    if (
      editableCite.nextElementSibling &&
      editableCite instanceof HTMLElement
    ) {
      const nextCiteElementSibling = editableCite.nextElementSibling.id;
      if (nextCiteElementSibling === "deactAutocorrectBtn" && !isSpanActive) {
        const cursorResetAlert = document.createElement("span");
        if (!isAlertMade) {
          cursorResetAlert.textContent = "Cursor resetado! Aperte alguma tecla";
          isAlertMade = true;
        }
        editableCite.parentNode?.insertBefore(
          cursorResetAlert,
          editableCite.nextSibling
        );
        cursorResetAlert.setAttribute("class", "briefAlert");
        cursorResetAlert.setAttribute("id", "briefAlertCite");
        cursorResetAlert.style.setProperty("border-color", "white");
        cursorResetAlert.style.setProperty("opacity", "1");
        cursorResetAlert.style.setProperty("font-size", "8px");
        editableCite.style.setProperty(
          "border-color",
          "rgba(255, 165, 0, 0.9)"
        ); //alertar usuário da mudança de cursor devido à reconstrução do textContent editável
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
              let strNewOpacityValue =
                firstSliceStrRgba + " " + strUpdatedAlpha + ")";
              if (strUpdatedAlpha && strUpdatedAlpha <= "0.05") {
                strUpdatedAlpha = "0";
                strNewOpacityValue = firstSliceStrRgba + "0)";
                cursorResetAlert.remove();
                clearInterval(reduceOpacity);
              }
              editableCite.style.setProperty(
                "border-color",
                strNewOpacityValue
              );
            }, 100);
          }
        }, 500);
      } else if (nextCiteElementSibling === "briefAlertCite" || isSpanActive) {
        //algum efeito visual
      }
    }
    return [isSpanActive, isAlertMade];
  }
}

export function removeFirstClick(editableCite: Element) {
  editableCite.textContent === "Insira Seu Nome Aqui"
    ? (editableCite.textContent = "")
    : null;
  let cursorPosition = 0;
  setInterval(() => {
    cursorPosition = GlobalHandler.cursorCheckTimer(cursorPosition) ?? 0;
  }, 3000);
}

export function switchAutocorrect(
  click: MouseEvent,
  deactAutocorrectBtn: HTMLButtonElement
) {
  if (click.target === deactAutocorrectBtn) {
    isAutocorrectOn = !isAutocorrectOn; //simplificação de if-else; if-if não funciona aqui
    deactAutocorrectBtn.textContent = isAutocorrectOn
      ? "Desativar Autocorreção"
      : "Ativar Autocorreção";
  }
}

export function checkAllGenConts(
  gen: targEl,
  genBirthRel: targEl,
  genTrans: targEl,
  genFisAlin: targEl
) {
  let isGenValid = false;
  let isGenBirthRelValid = false;
  let isGenTransContValid = false;
  let isGenFisAlinValid = false;
  try {
    if (gen && gen instanceof HTMLSelectElement) {
      isGenValid = true;
    } else {
      throw new Error(
        `Erro validando gen: elemento ${gen}, instância ${
          gen instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGen) {
    console.error((errorGen as Error).message);
  } finally {
    //algum efeito visual
  }
  try {
    if (genBirthRel && genBirthRel instanceof HTMLSelectElement) {
      isGenBirthRelValid = true;
    } else {
      throw new Error(
        `Erro validando gen: elemento ${genBirthRel}, instância ${
          genBirthRel instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGenBirthRel) {
    console.error((errorGenBirthRel as Error).message);
  } finally {
    //algum efeito visual
  }
  try {
    if (genTrans && genTrans instanceof HTMLSelectElement) {
      isGenTransContValid = true;
    } else {
      throw new Error(
        `Erro validando genTrans: elemento ${genTrans}, instância ${
          genTrans instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGenTrans) {
    console.error((errorGenTrans as Error).message);
  } finally {
    //algum efeito visual
  }
  try {
    if (genFisAlin && genFisAlin instanceof HTMLSelectElement) {
      isGenFisAlinValid = true;
    } else {
      throw new Error(
        `Erro validando genFisAlin: elemento ${genFisAlin}, instância ${
          genFisAlin instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGenFisAlin) {
    console.error((errorGenFisAlin as Error).message);
  } finally {
    //algum efeito visual
  }
  if (
    isGenValid &&
    isGenBirthRelValid &&
    isGenTransContValid &&
    isGenFisAlinValid
  ) {
    return true;
  } else {
    console.error("Erro verificando booleanos de containers de gênero");
    return false;
  }
}

export function fluxGen(
  gen: entryEl,
  genIniValue: string | null,
  genBirthRel: entryEl,
  genTrans: entryEl,
  genFisAlin: entryEl
) {
  let genValue = "";
  if (gen.value === "masculino" || gen.value === "feminino") {
    if (genBirthRel.value === "cis") {
      genValue = genIniValue ?? gen.value;
      hideGenFisAlin(genFisAlin);
      hideStgTransHorm(genTrans);
      return genValue;
    } else if (genBirthRel.value === "trans") {
      showStgTransHorm(genTrans);
      if (genTrans.value === "avancado") {
        genValue = genIniValue ?? gen.value;
        hideGenFisAlin(genFisAlin);
        return genValue;
      } else if (
        genTrans.value === "undefined" ||
        genTrans.value === "no" ||
        genTrans.value === "inicial" ||
        genTrans.value === "intermediario"
      ) {
        showGenFisAlin(genFisAlin);
        const contFeminilizado = document.querySelector(
          'option[value="feminilizado"]'
        );
        const contMasculinizado = document.querySelector(
          'option[value="masculinizado"]'
        );
        if (
          contFeminilizado instanceof HTMLOptionElement &&
          contMasculinizado instanceof HTMLOptionElement
        ) {
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
          } else {
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
        } else if (genFisAlin.value === "feminilizado") {
          genValue = "feminino";
          return genValue;
        } else if (genFisAlin.value === "neutro") {
          genValue = "neutro";
          return genValue;
        }
      }
    } else if (
      genBirthRel.value === "outros" ||
      genBirthRel.value === "undefined"
    ) {
      showGenFisAlin(genFisAlin);
      if (genFisAlin.value === "masculinizado") {
        genValue = "masculino";
        return genValue;
      } else if (genFisAlin.value === "feminilizado") {
        genValue = "feminino";
        return genValue;
      } else if (genFisAlin.value === "neutro") {
        genValue = "neutro";
        return genValue;
      }
    }
  } else if (
    gen.value === "naoBinario" ||
    gen.value === "outros" ||
    gen.value === "undefined"
  ) {
    if (genBirthRel.value === "trans") {
      showStgTransHorm(genTrans);
    } else {
      hideStgTransHorm(genTrans);
    }
    showGenFisAlin(genFisAlin);
    if (genFisAlin.value === "masculinizado") {
      genValue = "masculino";
      return genValue;
    } else if (genFisAlin.value === "feminilizado") {
      genValue = "feminino";
      return genValue;
    } else if (genFisAlin.value === "neutro") {
      genValue = "neutro";
      return genValue;
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.stringError(
      "obtendo gen.value",
      gen?.value ?? "UNDEFINED VALUE",
      slicedError ?? "NULL"
    );
  }
  return genValue;
}

export function showGenFisAlin(genFisAlin: entryEl) {
  if (genFisAlin) {
    genFisAlin.closest(".spanFsAnamG")?.removeAttribute("hidden");
    return true;
  } else {
    console.warn("Erro na abertura de genFisAlin");
  }
}

export function hideGenFisAlin(genFisAlin: entryEl) {
  if (genFisAlin) {
    genFisAlin.closest(".spanFsAnamG")?.setAttribute("hidden", "");
    return false;
  } else {
    console.warn("Erro no fechamento de genFisAlin");
  }
}

export function showStgTransHorm(genTrans: entryEl) {
  if (genTrans) {
    genTrans.closest(".spanFsAnamG")?.removeAttribute("hidden");
    return true;
  } else {
    console.warn("Erro na abertura de genTrans");
  }
}

export function hideStgTransHorm(genTrans: entryEl) {
  if (genTrans) {
    genTrans.closest(".spanFsAnamG")?.setAttribute("hidden", "");
    return false;
  } else {
    console.warn("Erro no fechamento de genTrans");
  }
}

export function filterIdsByGender(arrayIds: string[], bodyType: string) {
  if (Array.isArray(arrayIds)) {
    if (
      arrayIds.every((prop) => typeof prop === "string") &&
      typeof bodyType === "string"
    ) {
      const genderedIds = [];
      let slicedError = "";
      switch (bodyType) {
        case "masculino":
          for (let iM = 0; iM < arrayIds.length; iM++) {
            if (
              arrayIds[iM] === "peit" ||
              arrayIds[iM] === "abd" ||
              arrayIds[iM] === "coxa"
            ) {
              genderedIds.push(arrayIds[iM]);
            }
          }
          break;
        case "feminino":
          for (let iF = 0; iF < arrayIds.length; iF++) {
            if (
              arrayIds[iF] === "tricp" ||
              arrayIds[iF] === "suprail" ||
              arrayIds[iF] === "coxa"
            ) {
              genderedIds.push(arrayIds[iF]);
            }
          }
          break;
        case "neutro":
          for (let iN = 0; iN < arrayIds.length; iN++) {
            if (
              arrayIds[iN] === "peit" ||
              arrayIds[iN] === "abd" ||
              arrayIds[iN] === "tricp" ||
              arrayIds[iN] === "suprail" ||
              arrayIds[iN] === "coxa"
            )
              genderedIds.push(arrayIds[iN]);
          }
          break;
        default:
          slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.stringError(
            `obtendo bodyType válido`,
            bodyType ?? null,
            slicedError ?? "NULL"
          );
      }
      return genderedIds;
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.typeError(
        `validando elementos para definição de gênero como strings`,
        bodyType ?? null,
        "string",
        slicedError ?? "NULL"
      );
    }
  } else {
    console.warn(`Erro validando array em filterIdsByGender()`);
  }
}

export function generatePersonInstance(person: formPerson) {
  if (typeof person.gen === "string" && person.gen !== "") {
    if (person.gen === "masculino") {
      person = new Man(
        person.gen,
        person.age,
        person.weight,
        person.height,
        person.sumDCut,
        person.atvLvl
      );
    } else if (person.gen === "feminino") {
      person = new Woman(
        person.gen,
        person.age,
        person.weight,
        person.height,
        person.sumDCut,
        person.atvLvl
      );
    } else if (person.gen === "neutro") {
      person = new Neutro(
        person.gen,
        person.age,
        person.weight,
        person.height,
        person.sumDCut,
        person.atvLvl
      );
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.stringError(
        "person.gen",
        person?.gen ?? null,
        slicedError ?? "NULL"
      );
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.typeError(
      "person.gen",
      person?.gen ?? null,
      "string",
      slicedError ?? "NULL"
    );
  }
  return person;
}
