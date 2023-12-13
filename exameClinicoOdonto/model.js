//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização
"use strict";
import * as Controller from "./controller.js";
import * as ErrorHandler from "./errorHandler.js";

//TODO ADICIONAR CHAMADAS DE ERRORHANDLER

const subDivsQuadrs = document.querySelectorAll(".quadrSubDiv");
const autoCapitalizeFirstLetterRegex = /\b\w/;
let isValuePreDef = false;
let repAcumulator = 0;
let isAutocorrectOn = true;

export function autoCapitalizeInputs(textElement) {
  let text = textElement.value;
  if (isAutocorrectOn && text) {
    let newWordMatches = text.match(
      /\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g
    );
    let letterMatchesIniNotD = text.match(/\s[^d]/g);
    let letterMatchesIniD = text.match(/\sd/g);
    const notMatchesAfterDRegex =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g;
    let letterNotMatchesAfterD = text.match(notMatchesAfterDRegex);
    const afterDRegexOp1 =
      /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
    const afterDRegexOp2 =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g;
    const afterDRegexOp3 =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
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
    const wrongUppercasesRegexOp1 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g;
    let wrongUppercasesMatchesOp1 = text.match(wrongUppercasesRegexOp1);
    const wrongUppercasesRegexOp2 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    let wrongUppercasesMatchesOp2 = text.match(wrongUppercasesRegexOp2);
    const wrongUppercasesRegexOp3 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g;
    let wrongUppercasesMatchesOp3 = text.match(wrongUppercasesRegexOp3);
    const wrongUppercasesRegexOp4 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    let wrongUppercasesMatchesOp4 = text.match(wrongUppercasesRegexOp4);
    const wrongUppercasesRegexOp5 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g;
    let wrongUppercasesMatchesOp5 = text.match(wrongUppercasesRegexOp5);
    const wrongUppercasesRegexOp6 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    let wrongUppercasesMatchesOp6 = text.match(wrongUppercasesRegexOp6);
    const wrongUppercasesRegexOp7 = /D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g;
    let wrongUppercasesMatchesOp7 = text.match(wrongUppercasesRegexOp7);
    const wrongUppercasesRegexOp8 = /D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g;
    let wrongUppercasesMatchesOp8 = text.match(wrongUppercasesRegexOp8);
    const wrongUppercasesRegexOp9 =
      /D[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]\s/g;
    let wrongUppercasesMatchesOp9 = text.match(wrongUppercasesRegexOp9);
    const wrongUppercasesRegexOp10 = /D[aeioáàâäãéèêëíìîïóòôöõúùûü]\s/g;
    let wrongUppercasesMatchesOp10 = text.match(wrongUppercasesRegexOp10);
    const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
    const computedStyleRegex = /,\d+.?\d*.?\d*/g;
    const spaceRegex = /\s/g;
    const wrongStartRegex =
      /^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
    let wrongStartMatch = text.match(wrongStartRegex);
    const wrongCharsRegexOp1 =
      /[\s]*[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+[\s]*[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]*/g;
    let wrongCharsMatchesOp1 = text.match(wrongCharsRegexOp1);
    const wrongCharsRegexOp2 =
      /$[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+/g;
    let wrongCharsMatchesOp2 = text.match(wrongCharsRegexOp2);
    const wrongCharsRegexOp3 =
      /(?<=\sdD)[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+/g;
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
    } else if (text.length > 1) {
      if (
        textElement.classList.contains("inpAst") ||
        textElement.classList.contains("inpIdentif")
      ) {
        // console.log("inp nome");

        function undoWrongChars() {
          if (
            wrongCharsMatchesOp1 ||
            wrongCharsMatchesOp2 ||
            wrongCharsMatchesOp3
          ) {
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
              });
            }
          }
        }

        undoWrongChars();

        function undoMultipleUppercases() {
          let unproperUppercases = [];
          let unproperDUppercases = [];

          if (multipleUppercasesMatches) {
            unproperUppercases = unproperUppercases.concat(
              multipleUppercasesMatches
            );
          }

          if (wrongUppercasesMatchesOp1) {
            unproperUppercases = unproperUppercases.concat(
              wrongUppercasesMatchesOp1
            );
          }

          if (wrongUppercasesMatchesOp2) {
            unproperUppercases = unproperUppercases.concat(
              wrongUppercasesMatchesOp2
            );
          }

          if (wrongUppercasesMatchesOp3) {
            unproperUppercases = unproperUppercases.concat(
              wrongUppercasesMatchesOp3
            );
          }

          if (wrongUppercasesMatchesOp4) {
            unproperUppercases = unproperUppercases.concat(
              wrongUppercasesMatchesOp4
            );
          }

          if (wrongUppercasesMatchesOp5) {
            unproperUppercases = unproperUppercases.concat(
              wrongUppercasesMatchesOp5
            );
          }

          if (wrongUppercasesMatchesOp6) {
            unproperUppercases = unproperUppercases.concat(
              wrongUppercasesMatchesOp6
            );
          }

          if (wrongUppercasesMatchesOp7) {
            unproperDUppercases = unproperDUppercases.concat(
              wrongUppercasesMatchesOp7
            );
          }

          if (wrongUppercasesMatchesOp8) {
            unproperDUppercases = unproperDUppercases.concat(
              wrongUppercasesMatchesOp8
            );
          }

          if (wrongUppercasesMatchesOp9) {
            unproperDUppercases = unproperDUppercases.concat(
              wrongUppercasesMatchesOp9
            );
            // console.log("CASO 9 CAPTURADO");
          }

          if (wrongUppercasesMatchesOp10) {
            unproperDUppercases = unproperDUppercases.concat(
              wrongUppercasesMatchesOp10
            );
            // console.log("CASO 10 CAPTURADO");
          }

          // if (unproperUppercases) {
          //   console.log("matches not D " + unproperUppercases);
          // }

          // if (unproperDUppercases) {
          //   console.log("matches unproperD " + unproperDUppercases);
          // }

          unproperUppercases.forEach((multipleUppercasesMatch) => {
            if (text && multipleUppercasesMatch) {
              // console.log("UNPROPER MULTIPLE NOT D");
              let addAcumulator = 0;
              let loweredRepetitions = "";
              let upperCasesRepetitionsIndex = text.indexOf(
                multipleUppercasesMatch
              );
              let repeatedLetter = multipleUppercasesMatch.slice(0, 1);
              loweredRepetitions = multipleUppercasesMatch
                .toLowerCase()
                .slice(1);
              let textBeforeRepetitions = text.substring(
                0,
                upperCasesRepetitionsIndex
              );
              if (spaceMatches) {
                let numSpaces = spaceMatches.length;
                addAcumulator += numSpaces;
              }
              let textAfterRepetitions = text.slice(
                upperCasesRepetitionsIndex + 1 + loweredRepetitions.length,
                text.length + 1
              );
              let textArray = Array.from(text);
              textArray.splice(
                upperCasesRepetitionsIndex + 1,
                loweredRepetitions.length,
                loweredRepetitions
              );
              let upperlowercomb = text.match(
                /[a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g
              );
              let upperlowercombD = text.match(
                /D[a-záàâäãéèêëíìîïóòôöõúùûü][\s]/
              );
              let upperlowercombDS = text.match(
                /D[a-záàâäãéèêëíìîïóòôöõúùûü][S][\s]/
              );
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
            }
          });

          unproperDUppercases.forEach((multipleUppercasesMatch) => {
            if (text && multipleUppercasesMatch) {
              // console.log("UNPROPER MULTIPLE D");
              let addAcumulator = 0;
              let loweredRepetitions = "";
              let upperCasesRepetitionsIndex = text.indexOf(
                multipleUppercasesMatch
              );
              loweredRepetitions = multipleUppercasesMatch
                .toLowerCase()
                .slice(0);
              let textBeforeRepetitions = text.substring(
                0,
                upperCasesRepetitionsIndex
              );
              if (spaceMatches) {
                addAcumulator = 1;
              }
              // console.log("add num" + addAcumulator);
              let textAfterRepetitions = text.slice(
                upperCasesRepetitionsIndex +
                  1 +
                  loweredRepetitions.length -
                  addAcumulator,
                text.length + 1
              );
              let textArray = Array.from(text);
              textArray.splice(
                upperCasesRepetitionsIndex + 1,
                loweredRepetitions.length,
                loweredRepetitions
              );
              let upperlowercombD = text.match(
                /D[a-záàâäãéèêëíìîïóòôöõúùûü][sS]?[\s]/
              );
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
                textBeforeRepetitions +
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
          if (
            !letterNotMatchesAfterD &&
            (letterMatchesAfterDOp1 ||
              letterMatchesAfterDOp2 ||
              letterMatchesAfterDOp3)
          ) {
            forceUpperCase();
          } else if (
            letterNotMatchesAfterD &&
            !(
              letterMatchesAfterDOp1 ||
              letterMatchesAfterDOp2 ||
              letterMatchesAfterDOp3
            )
          ) {
            letterNotMatchesAfterD = [];
            forceUpperCase();
          }
        } else if (letterMatchesIniNotD) {
          forceUpperCase();
        }

        function wrongStartCorrection(wrongStartMatch) {
          // console.log("chegou na checagem de wrong start");
          if (wrongStartMatch && text) {
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
              if (remadeCiteText) {
                // console.log("remade inp ini not D");
                globalLetterMatchIndex =
                  remadeCiteText.lastIndexOf(letterMatch) + 1;
                actualChar = remadeCiteText.charAt(globalLetterMatchIndex);
                capitalizedChar = actualChar.toUpperCase();
                textArray = Array.from(remadeCiteText);
                textArray[globalLetterMatchIndex] = capitalizedChar;
                remadeCiteText = textArray.toString().replaceAll(",", "");
              }
            });
            textElement.value = remadeCiteText;
            // console.log("foi chamado pelo capitalizeNext");
            correctCursorNextWords(isUndoUppercase);
            wrongStartCorrection(wrongStartMatch);
            arrayCheckLowerCases = Array.from(letterMatchesIniNotD);
            for (i = 0; i < arrayCheckLowerCases.length; i++) {
              filteredArray = letterMatchesIniNotD.filter((i) =>
                lowercasesRegexObj.test(i)
              );
              mappedArray = filteredArray.map((i) => i.toUpperCase());
            }
          } else if (
            (letterMatchesIniNotD && letterMatchesIniD) ||
            (!letterMatchesIniNotD && letterMatchesIniD)
          ) {
            capitalizeNextWordsD();
          }
        }

        function capitalizeNextWordsD() {
          // console.log("foi chamado no capitalize D");
          let letterMatchesAfterD = [];

          if (
            !letterNotMatchesAfterD &&
            (letterMatchesAfterDOp1 ||
              letterMatchesAfterDOp2 ||
              letterMatchesAfterDOp3)
          ) {
            if (letterMatchesAfterDOp1) {
              letterMatchesAfterD = letterMatchesAfterD.concat(
                letterMatchesAfterDOp1
              );
            }

            if (letterMatchesAfterDOp2) {
              letterMatchesAfterD = letterMatchesAfterD.concat(
                letterMatchesAfterDOp2
              );
            }

            if (letterMatchesAfterDOp3) {
              letterMatchesAfterD = letterMatchesAfterD.concat(
                letterMatchesAfterDOp3
              );
            }

            taskCapitalizeD(letterMatchesAfterD);
          } else if (
            letterNotMatchesAfterD &&
            !(
              letterMatchesAfterDOp1 ||
              letterMatchesAfterDOp2 ||
              letterMatchesAfterDOp3
            )
          ) {
            if (letterNotMatchesAfterD && letterMatchesIniNotD) {
              letterMatchesAfterD =
                letterMatchesAfterD.concat(letterMatchesIniNotD);
              taskCapitalizeD(letterMatchesAfterD);
            }
          } else if (
            letterNotMatchesAfterD &&
            (letterMatchesAfterDOp1 ||
              letterMatchesAfterDOp2 ||
              letterMatchesAfterDOp3 ||
              letterMatchesIniNotD)
          ) {
            if (letterMatchesAfterDOp1) {
              letterMatchesAfterD = letterMatchesAfterD.concat(
                letterMatchesAfterDOp1
              );
            }

            if (letterMatchesAfterDOp2) {
              letterMatchesAfterD = letterMatchesAfterD.concat(
                letterMatchesAfterDOp2
              );
            }

            if (letterMatchesAfterDOp3) {
              letterMatchesAfterD = letterMatchesAfterD.concat(
                letterMatchesAfterDOp3
              );
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
              // console.log("GLOBAL MATCH D " + globalLetterMatchIndexD);
              let actualCharD = remadeCiteText?.charAt(globalLetterMatchIndexD);
              let capitalizedCharD = actualCharD?.toUpperCase();
              if (remadeCiteText && capitalizedCharD) {
                let citeTextArrayD = Array.from(remadeCiteText);
                citeTextArrayD[globalLetterMatchIndexD] = capitalizedCharD;
                // console.log("CITETEXTARRAYD " + citeTextArrayD);
                remadeCiteText = citeTextArrayD.toString().replaceAll(",", "");
              }
            }
          });
          textElement.value = remadeCiteText;
          let arrayCheckLowerCasesD = Array.from(letterMatchesAfterD ?? []);
          // console.log("ARRAY CHECK " + arrayCheckLowerCasesD);
          for (let iD = 0; iD < arrayCheckLowerCasesD.length; iD++) {
            let filteredArrayD = letterMatchesAfterD?.filter((iD) =>
              lowercasesRegexObj.test(iD)
            );
            if (filteredArrayD) {
              // console.log("filtragem de array validada");
              let mappedArrayD = filteredArrayD.map((iD) => iD.toUpperCase());
              let remadeStringD = "";
              const targLetter = filteredArrayD[iD];
              const regexTargLetter = new RegExp(targLetter, "g");
              if (iD === 0) {
                filteredArrayD.splice(iD, 1, mappedArrayD[0]);
                remadeStringD = filteredArrayD.toString().replaceAll(",", "");
                correctCursorNextWords(isUndoUppercase);
              } else if (iD === 1) {
                filteredArrayD.splice(iD, 1, mappedArrayD[1]);
                remadeStringD = filteredArrayD
                  .toString()
                  .replaceAll(",", "")
                  .slice(2);
                correctCursorNextWords(isUndoUppercase);
                if (textElement.value) {
                  textElement.value = textElement.value.replace(
                    regexTargLetter,
                    remadeStringD
                  );
                }
              } else if (iD > 2) {
                filteredArrayD.pop();
                filteredArrayD.push(mappedArrayD[iD]);
                correctCursorNextWords(isUndoUppercase);
              }
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
            .getRangeAt(0).startOffset;
          if (selectionPosition === 0) {
            wrongStartCorrection(wrongStartMatch);
            textElement.addEventListener("keyup", (fixmove) => {
              if (
                fixmove.keyCode === 32 ||
                fixmove.keyCode === 8 ||
                (fixmove.keyCode >= 37 && fixmove.keyCode <= 40) ||
                (fixmove.keyCode >= 65 && fixmove.keyCode <= 90) ||
                (fixmove.keyCode >= 97 && fixmove.keyCode <= 122) ||
                isUndoUppercase
              ) {
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

          for (
            let wordMatchI = 0;
            wordMatchI < wordMatch.length;
            wordMatchI++
          ) {
            let uppercaseTest = uppercasesRegexObj.test(wordMatch[wordMatchI]);
            if (uppercaseTest) {
              continue;
            }
            let strDlowercase = wordMatch[wordMatchI].toString();
            let DUppercased = strDlowercase.charAt(1).toUpperCase();
            if (DUppercased) {
              let strDAfter =
                strDlowercase.substring(0, 1) +
                DUppercased +
                strDlowercase.substring(2);
              let strDAfterMinusInd =
                textElement.value.length - strDAfter.length;
              let oppositeSlicedCite =
                textElement.value.slice(strDAfterMinusInd);
              let startSlicedCite = textElement.value.slice(
                0,
                strDAfterMinusInd
              );
              if (wordMatch.length >= 1) {
                textElement.value = startSlicedCite + oppositeSlicedCite;
              }
            }

            if (DMatch.length >= 1) {
              correctCursorNextWords(isUndoUppercase);
            }
          }
        }

        if (wrongCharsMatchesOp1) {
          textElement.value =
            textElement.value?.replaceAll(wrongCharsRegexOp1, "") ?? null;
          // console.log("DEPOIS DA REMOÇÃO DE WRONGOP1 " + textElement.value);
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
      }
    }
  }
}

export function autoCapitalizeCite(editableCite) {
  let citeText = editableCite.textContent;
  if (isAutocorrectOn && citeText) {
    let newWordMatches = citeText.match(
      /\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g
    );
    let letterMatchesIniNotD = citeText.match(/\s[^d]/g);
    let letterMatchesIniD = citeText.match(/\sd/g);
    const notMatchesAfterDRegex =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g;
    let letterNotMatchesAfterD = citeText.match(notMatchesAfterDRegex);
    const afterDRegexOp1 =
      /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
    const afterDRegexOp2 =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g;
    const afterDRegexOp3 =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
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
    const wrongUppercasesRegexOp1 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g;
    let wrongUppercasesMatchesOp1 = citeText.match(wrongUppercasesRegexOp1);
    const wrongUppercasesRegexOp2 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    let wrongUppercasesMatchesOp2 = citeText.match(wrongUppercasesRegexOp2);
    const wrongUppercasesRegexOp3 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g;
    let wrongUppercasesMatchesOp3 = citeText.match(wrongUppercasesRegexOp3);
    const wrongUppercasesRegexOp4 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    let wrongUppercasesMatchesOp4 = citeText.match(wrongUppercasesRegexOp4);
    const wrongUppercasesRegexOp5 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g;
    let wrongUppercasesMatchesOp5 = citeText.match(wrongUppercasesRegexOp5);
    const wrongUppercasesRegexOp6 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
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
    const wrongStartRegex =
      /^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
    let wrongStartMatch = citeText.match(wrongStartRegex);
    const wrongCharsRegexOp1 =
      /[\s]*[\d\n,;.+=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+[\s]*[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]*/g;
    let wrongCharsMatchesOp1 = citeText.match(wrongCharsRegexOp1);
    const wrongCharsRegexOp2 =
      /$[\d\n,;.+=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+/g;
    let wrongCharsMatchesOp2 = citeText.match(wrongCharsRegexOp2);
    const wrongCharsRegexOp3 =
      /(?<=\sdD)[\d\n,;.+=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+/g;
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
      if (
        wrongCharsMatchesOp1 ||
        wrongCharsMatchesOp2 ||
        wrongCharsMatchesOp3
      ) {
        let wrongCharsMatches = [];

        if (wrongCharsMatchesOp1) {
          wrongCharsMatches = wrongCharsMatches.concat(wrongCharsMatchesOp1);
        }

        if (wrongCharsMatchesOp2) {
          wrongCharsMatches = wrongCharsMatches.concat(wrongCharsMatchesOp2);
        }

        if (wrongCharsMatchesOp3) {
          wrongCharsMatches = wrongCharsMatches.concat(wrongCharsMatchesOp3);
          // console.log("CASO 3 CAPTURADO");
        }

        // console.log(wrongCharsMatches);

        for (let iW = 0; iW < wrongCharsMatches.length; iW++) {
          let wrongCharLength = wrongCharsMatches[iW].length;
          wrongCharsMatches.forEach((wrongCharMatch) => {
            if (citeText) {
              let wrongCharIndex = citeText.indexOf(wrongCharMatch);
              let arrayCite = Array.from(citeText);
              arrayCite.splice(wrongCharIndex, wrongCharLength, "");
              let fixedStrCite = arrayCite.toString().replaceAll(",", "");
              editableCite.textContent = fixedStrCite;
              correctCursorNextWords(isUndoUppercase);
              range.selectNodeContents(editableCite);
              range.collapse(false);
              selection?.removeAllRanges();
              selection?.addRange(range);
              createSpanAlert(isSpanActive);
            }
          });
        }
      }
    }

    undoWrongChars();

    function undoMultipleUppercases() {
      let unproperUppercases = [];
      let unproperDUppercases = [];

      if (multipleUppercasesMatches) {
        unproperUppercases = unproperUppercases.concat(
          multipleUppercasesMatches
        );
      }

      if (wrongUppercasesMatchesOp1) {
        unproperUppercases = unproperUppercases.concat(
          wrongUppercasesMatchesOp1
        );
      }

      if (wrongUppercasesMatchesOp2) {
        unproperUppercases = unproperUppercases.concat(
          wrongUppercasesMatchesOp2
        );
      }

      if (wrongUppercasesMatchesOp3) {
        unproperUppercases = unproperUppercases.concat(
          wrongUppercasesMatchesOp3
        );
      }

      if (wrongUppercasesMatchesOp4) {
        unproperUppercases = unproperUppercases.concat(
          wrongUppercasesMatchesOp4
        );
      }

      if (wrongUppercasesMatchesOp5) {
        unproperUppercases = unproperUppercases.concat(
          wrongUppercasesMatchesOp5
        );
      }

      if (wrongUppercasesMatchesOp6) {
        unproperUppercases = unproperUppercases.concat(
          wrongUppercasesMatchesOp6
        );
      }

      if (wrongUppercasesMatchesOp7) {
        unproperDUppercases = unproperDUppercases.concat(
          wrongUppercasesMatchesOp7
        );
      }

      if (wrongUppercasesMatchesOp8) {
        unproperDUppercases = unproperDUppercases.concat(
          wrongUppercasesMatchesOp8
        );
      }

      if (wrongUppercasesMatchesOp9) {
        unproperDUppercases = unproperDUppercases.concat(
          wrongUppercasesMatchesOp9
        );
      }

      unproperUppercases.forEach((multipleUppercasesMatch) => {
        if (citeText && multipleUppercasesMatch) {
          // console.log("MULTIPLE UPPER NOT D");
          let loweredRepetitions = "";
          let upperCasesRepetitionsIndex = citeText.indexOf(
            multipleUppercasesMatch
          );
          let repeatedLetter = multipleUppercasesMatch.slice(0, 1);
          loweredRepetitions = multipleUppercasesMatch.toLowerCase().slice(1);
          let textBeforeRepetitions = citeText.substring(
            0,
            upperCasesRepetitionsIndex
          );
          if (spaceMatches) {
            let numSpaces = spaceMatches.length;
            addAcumulator += numSpaces;
          }
          let textAfterRepetitions = citeText.slice(
            upperCasesRepetitionsIndex + 1 + loweredRepetitions.length,
            citeText.length + 1
          );
          let textArray = Array.from(citeText);
          textArray.splice(
            upperCasesRepetitionsIndex + 1,
            loweredRepetitions.length,
            loweredRepetitions
          );
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
          selection?.removeAllRanges();
          selection?.addRange(range);
          createSpanAlert(isSpanActive);
        }
      });

      unproperDUppercases.forEach((multipleUppercasesMatch) => {
        if (citeText && multipleUppercasesMatch) {
          // console.log("MULTIPLE UPPER D");
          let loweredRepetitions = "";
          let upperCasesRepetitionsIndex = citeText.indexOf(
            multipleUppercasesMatch
          );
          loweredRepetitions = multipleUppercasesMatch.toLowerCase().slice(0);
          let textBeforeRepetitions = citeText.substring(
            0,
            upperCasesRepetitionsIndex
          );
          if (lowercasesMatches) {
            let numLowercases = lowercasesMatches.length;
            addAcumulator += numLowercases;
          }
          if (spaceMatches) {
            let numSpaces = spaceMatches.length;
            addAcumulator += numSpaces;
          }
          let textAfterRepetitions = citeText.slice(
            upperCasesRepetitionsIndex + 1 + loweredRepetitions.length,
            citeText.length + 1
          );
          let textArray = Array.from(citeText);
          textArray.splice(
            upperCasesRepetitionsIndex + 1,
            loweredRepetitions.length,
            loweredRepetitions
          );
          const multipleConjFix =
            /D[aeiouáàâäãéèêëíìîïóòôöõúùûü][s]\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{3,}/; //Dos SA + N=> dos AN
          const multipleConjFixMatch = citeText.match(multipleConjFix);
          // console.log("multiple conj match: ", multipleConjFixMatch);
          if (multipleConjFixMatch) {
            editableCite.textContent =
              textBeforeRepetitions +
              loweredRepetitions +
              "S" +
              textAfterRepetitions;
            // console.log("multiple conj: ", editableCite.textContent);
          } else {
            editableCite.textContent =
              textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
            // console.log("not multiple conj: ", editableCite.textContent);
          }
          repAcumulator++;
          isUndoUppercase = true;
          correctCursorNextWords(isUndoUppercase);
          range.selectNodeContents(editableCite);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
          createSpanAlert(isSpanActive);
        }
      });
    }

    if (citeText.length === 1 && !newWordMatches) {
      let firstLetterMatch = citeText[0]?.match(autoCapitalizeFirstLetterRegex);
      if (firstLetterMatch) {
        let capitalizedFirstLetter = citeText[0]?.toUpperCase();
        let nextLetters = citeText.substring(1).toLowerCase();
        editableCite.textContent = capitalizedFirstLetter + nextLetters;

        let firstLetterMatch = citeText[0]?.match(
          autoCapitalizeFirstLetterRegex
        );
        if (firstLetterMatch) {
          range.setStart(editableCite.childNodes[0], 1);
          range.collapse(true);

          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    } else if (citeText.length > 1) {
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
      if (
        !letterNotMatchesAfterD &&
        (letterMatchesAfterDOp1 ||
          letterMatchesAfterDOp2 ||
          letterMatchesAfterDOp3)
      ) {
        forceUpperCase();
      } else if (
        letterNotMatchesAfterD &&
        !(
          letterMatchesAfterDOp1 ||
          letterMatchesAfterDOp2 ||
          letterMatchesAfterDOp3
        )
      ) {
        letterNotMatchesAfterD = [];
        forceUpperCase();
      }
    } else if (letterMatchesIniNotD) {
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
            // console.log("init not D Cite start");
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
          filteredArray = letterMatchesIniNotD.filter((i) =>
            lowercasesRegexObj.test(i)
          );
          mappedArray = filteredArray.map((i) => i.toUpperCase());
        }
      } else if (
        (letterMatchesIniNotD && letterMatchesIniD) ||
        (!letterMatchesIniNotD && letterMatchesIniD)
      ) {
        capitalizeNextWordsD();
      }
    }

    function capitalizeNextWordsD() {
      // console.log("foi chamado no capitalize D");
      let letterMatchesAfterD = [];

      if (
        !letterNotMatchesAfterD &&
        (letterMatchesAfterDOp1 ||
          letterMatchesAfterDOp2 ||
          letterMatchesAfterDOp3)
      ) {
        if (letterMatchesAfterDOp1) {
          letterMatchesAfterD = letterMatchesAfterD.concat(
            letterMatchesAfterDOp1
          );
        }

        if (letterMatchesAfterDOp2) {
          letterMatchesAfterD = letterMatchesAfterD.concat(
            letterMatchesAfterDOp2
          );
        }

        if (letterMatchesAfterDOp3) {
          letterMatchesAfterD = letterMatchesAfterD.concat(
            letterMatchesAfterDOp3
          );
        }

        taskCapitalizeD(letterMatchesAfterD);
      } else if (
        letterNotMatchesAfterD &&
        !(
          letterMatchesAfterDOp1 ||
          letterMatchesAfterDOp2 ||
          letterMatchesAfterDOp3
        )
      ) {
        if (letterNotMatchesAfterD && letterMatchesIniNotD) {
          letterMatchesAfterD =
            letterMatchesAfterD.concat(letterMatchesIniNotD);
          taskCapitalizeD(letterMatchesAfterD);
        }
      } else if (
        letterNotMatchesAfterD &&
        (letterMatchesAfterDOp1 ||
          letterMatchesAfterDOp2 ||
          letterMatchesAfterDOp3 ||
          letterMatchesIniNotD)
      ) {
        if (letterMatchesAfterDOp1) {
          letterMatchesAfterD = letterMatchesAfterD.concat(
            letterMatchesAfterDOp1
          );
        }

        if (letterMatchesAfterDOp2) {
          letterMatchesAfterD = letterMatchesAfterD.concat(
            letterMatchesAfterDOp2
          );
        }

        if (letterMatchesAfterDOp3) {
          letterMatchesAfterD = letterMatchesAfterD.concat(
            letterMatchesAfterDOp3
          );
        }
        taskCapitalizeD(letterMatchesAfterD);
      }
    }

    function taskCapitalizeD(letterMatchesAfterD) {
      // console.log("TASK FOI CHAMADA");
      letterMatchesAfterD.forEach((letterMatchD) => {
        let globalLetterMatchIndexD = remadeCiteText
          ? remadeCiteText.lastIndexOf(letterMatchD) + 1
          : undefined;
        // console.log("GLOBAL LETTER D " + globalLetterMatchIndexD);
        if (globalLetterMatchIndexD) {
          let actualCharD = remadeCiteText?.charAt(globalLetterMatchIndexD);
          let capitalizedCharD = actualCharD?.toUpperCase();
          if (remadeCiteText && capitalizedCharD) {
            let citeTextArrayD = Array.from(remadeCiteText);
            citeTextArrayD[globalLetterMatchIndexD] = capitalizedCharD;
            // console.log(
            //   "construção do array D " + citeTextArrayD[globalLetterMatchIndexD]
            // );
            remadeCiteText = citeTextArrayD.toString().replaceAll(",", "");
          }
        }
      });
      editableCite.textContent = remadeCiteText;
      let arrayCheckLowerCasesD = Array.from(letterMatchesAfterD ?? []);
      // console.log("arraycheckD" + arrayCheckLowerCasesD);
      for (let iD = 0; iD < arrayCheckLowerCasesD.length; iD++) {
        let filteredArrayD = letterMatchesAfterD?.filter((iD) =>
          lowercasesRegexObj.test(iD)
        );
        if (filteredArrayD) {
          // console.log("Filtragem de array validada");
          let mappedArrayD = filteredArrayD.map((iD) => iD.toUpperCase());
          let remadeStringD = "";
          const targLetter = filteredArrayD[iD];
          const regexTargLetter = new RegExp(targLetter, "g");
          if (iD === 0) {
            createSpanAlert(isSpanActive);
            filteredArrayD.splice(iD, 1, mappedArrayD[0]);
            remadeStringD = filteredArrayD.toString().replaceAll(",", "");
            correctCursorNextWords(isUndoUppercase);
          } else if (iD === 1) {
            createSpanAlert(isSpanActive);
            filteredArrayD.splice(iD, 1, mappedArrayD[1]);
            remadeStringD = filteredArrayD
              .toString()
              .replaceAll(",", "")
              .slice(2);
            correctCursorNextWords(isUndoUppercase);
            if (editableCite.textContent) {
              editableCite.textContent = editableCite.textContent.replace(
                regexTargLetter,
                remadeStringD
              );
            }
          } else if (iD > 2) {
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
              "Cursor resetado! Aperte alguma tecla";
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
          // console.log("cor aplicada");
          isSpanActive = true;
          setTimeout(() => {
            let computedStyleCite = window
              .getComputedStyle(editableCite)
              .getPropertyValue("border-color");
            let rgbaMatch = computedStyleCite.match(rgbaRegex);
            if (rgbaMatch) {
              let reduceOpacity = setInterval(() => {
                let reducedAlpha = parseFloat(rgbaMatch[4]) - 0.02; //faz a captura inicial e a primeira mudança
                let poppedArray = rgbaMatch.pop(); //faz a retirada inicial
                let pushedAlphaRgbaArray = rgbaMatch.push(reducedAlpha); //insere a primeira mudança no array, mas não o armazena
                let strUpdatedAlpha = poppedArray?.toString();
                let strRgba = rgbaMatch
                  .toString()
                  .replaceAll(computedStyleRegex, "");
                let firstSliceStrRgba = strRgba.slice(0, 18);
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
        } else if (
          nextCiteElementSibling === "briefAlertCite" ||
          isSpanActive
        ) {
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
          if (
            fixmove.keyCode === 32 ||
            fixmove.keyCode === 8 ||
            (fixmove.keyCode >= 37 && fixmove.keyCode <= 40) ||
            (fixmove.keyCode >= 65 && fixmove.keyCode <= 90) ||
            (fixmove.keyCode >= 97 && fixmove.keyCode <= 122) ||
            isUndoUppercase
          ) {
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
          let strDAfter =
            strDlowercase.substring(0, 1) +
            DUppercased +
            strDlowercase.substring(2);
          let strDAfterMinusInd =
            (editableCite.textContent?.length ?? 0) - strDAfter.length;
          // console.log("STRDAFTER" + strDAfterMinusInd);
          let oppositeSlicedCite =
            editableCite.textContent?.slice(strDAfterMinusInd);
          let startSlicedCite = editableCite.textContent?.slice(
            0,
            strDAfterMinusInd
          );
          if (wordMatch.length >= 1 && startSlicedCite) {
            editableCite.textContent = startSlicedCite + oppositeSlicedCite;
            // console.log("AFTER SLICE " + editableCite.textContent);
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
      // console.log("DEPOIS DA REMOÇÃO DE WRONGOP1 " + editableCite.textContent);
      moveCursorToTheEnd(editableCite);
    }

    if (wrongCharsMatchesOp2) {
      editableCite.textContent =
        editableCite.textContent?.replaceAll(wrongCharsRegexOp2, "") ?? null;
      moveCursorToTheEnd(editableCite);
    }

    if (wrongCharsMatchesOp3) {
      editableCite.textContent =
        editableCite.textContent?.replaceAll(wrongCharsRegexOp3, "") ?? null;
      moveCursorToTheEnd(editableCite);
    }

    if (editableCite.textContent?.match(/\s[\s]+/g)) {
      editableCite.textContent =
        editableCite.textContent?.replaceAll(/\s[\s]+/g, " ") ?? null;
      moveCursorToTheEnd(editableCite);
    }
  }
}

export function switchAutocorrect(click, deactAutocorrectBtn) {
  if (click.target === deactAutocorrectBtn) {
    isAutocorrectOn = !isAutocorrectOn; //simplificação de if-else; if-if não funciona aqui
    deactAutocorrectBtn.textContent = isAutocorrectOn
      ? "Desativar Autocorreção"
      : "Ativar Autocorreção";
  }
}

export function removeFirstClick(editableCite) {
  editableCite.textContent === "Insira Seu Nome Aqui"
    ? (editableCite.textContent = "")
    : null;
  let cursorPosition = 0;
  setInterval(() => {
    cursorPosition = Controller.cursorCheckTimer(cursorPosition) ?? 0;
  }, 3000);
}

export function resetAvDentValue(selectInp) {
  let targInp = selectInp.target,
    targValue = targInp.value,
    dlOptionsCollection = document.getElementsByClassName("elemOp");
  const dlOptionsArray = Array.from(dlOptionsCollection);

  if (
    dlOptionsArray.every(
      (dlOption) =>
        dlOption instanceof HTMLInputElement ||
        dlOption instanceof HTMLTextAreaElement
    )
  ) {
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
      let placeholderTimer = setTimeout(
        () => targInp.classList.add("placeholder-hidden"),
        1000
      );
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
}

export function orderLabels() {
  subDivsQuadrs.forEach((subDiv) => {
    let labsNList = subDiv.querySelectorAll(".labelAvDent");
    if (labsNList.length > 0) {
      let firstLabId = labsNList[0].id;
      let firstLabNumStr = firstLabId.match(/\d+/);
      if (firstLabNumStr !== null) {
        for (let i = 0; i < labsNList.length; i++) {
          let nOrder = (i + 1).toString();
          labsNList[i].style.setProperty("order", nOrder);
        }
      }
    }
  });
}
