//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização

import * as Controller from "./controller.js";
import { UndefinedPerson, Person, Man, Woman, Neutro } from "./classes.js";
import type {
  looseNum,
  targNum,
  targStr,
  targStrArr,
  targEl,
  arrTargEl,
  HTMLTargEl,
  entryEl,
  textEl,
  formPerson,
  formClassPerson,
  targMatchText,
  looseMatchText,
} from "./types.js";
import * as ErrorHandler from "./errorHandler.js";

const autoCapitalizeFirstLetterRegex = /\b\w/;
let repAcumulator = 0;
let isAutocorrectOn = true;

export function checkAllGenConts(
  gen: HTMLSelectElement,
  genBirthRel: HTMLSelectElement,
  genTrans: HTMLSelectElement,
  genFisAlin: HTMLSelectElement
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
          (gen as any) instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGen: any) {
    console.error(errorGen.message);
  } finally {
    //algum efeito visual
  }

  try {
    if (genBirthRel && genBirthRel instanceof HTMLSelectElement) {
      isGenBirthRelValid = true;
    } else {
      throw new Error(
        `Erro validando gen: elemento ${genBirthRel}, instância ${
          (genBirthRel as any) instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGenBirthRel: any) {
    console.error(errorGenBirthRel.message);
  } finally {
    //algum efeito visual
  }

  try {
    if (genTrans && genTrans instanceof HTMLSelectElement) {
      isGenTransContValid = true;
    } else {
      throw new Error(
        `Erro validando genTrans: elemento ${genTrans}, instância ${
          (genTrans as any) instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGenTrans: any) {
    console.error(errorGenTrans.message);
  } finally {
    //algum efeito visual
  }

  try {
    if (genFisAlin && genFisAlin instanceof HTMLSelectElement) {
      isGenFisAlinValid = true;
    } else {
      throw new Error(
        `Erro validando genFisAlin: elemento ${genFisAlin}, instância ${
          (genFisAlin as any) instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGenFisAlin: any) {
    console.error(errorGenFisAlin.message);
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
  gen: HTMLSelectElement,
  genIniValue: string,
  genBirthRel: HTMLSelectElement,
  genTrans: HTMLSelectElement,
  genFisAlin: HTMLSelectElement
) {
  let genValue = null;
  if (gen.value === "masculino" || gen.value === "feminino") {
    if (genBirthRel.value === "cis") {
      genValue = genIniValue;
      hideGenFisAlin(genFisAlin);
      hideStgTransHorm(genTrans);
      return genValue;
    } else if (genBirthRel.value === "trans") {
      showStgTransHorm(genTrans);
      if (genTrans.value === "avancado") {
        genValue = genIniValue;
        hideGenFisAlin(genFisAlin);
        return genValue;
      } else if (
        genTrans.value === "undefined" ||
        genTrans.value === "no" ||
        genTrans.value === "inicial" ||
        genTrans.value === "intermediario"
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
  }
}

function showGenFisAlin(genFisAlin: HTMLSelectElement): boolean | void {
  if (genFisAlin) {
    genFisAlin.closest(".spanFsAnamG")?.removeAttribute("hidden");
    return true;
  } else {
    console.warn("Erro na abertura de genFisAlin");
  }
}

function hideGenFisAlin(genFisAlin: HTMLSelectElement): boolean | void {
  if (genFisAlin) {
    genFisAlin.closest(".spanFsAnamG")?.setAttribute("hidden", "");
    return false;
  } else {
    console.warn("Erro no fechamento de genFisAlin");
  }
}

function showStgTransHorm(genTrans: HTMLSelectElement): boolean | void {
  if (genTrans) {
    genTrans.closest(".spanFsAnamG")?.removeAttribute("hidden");
    return true;
  } else {
    console.warn("Erro na abertura de genTrans");
  }
}

function hideStgTransHorm(genTrans: HTMLSelectElement): boolean | void {
  if (genTrans) {
    genTrans.closest(".spanFsAnamG")?.setAttribute("hidden", "");
    return false;
  } else {
    console.warn("Erro no fechamento de genTrans");
  }
}

export function checkInnerColGroups(
  parentElement: HTMLElement
): [number, boolean] {
  let areAllCoolGroupsSimilar = false;
  let validColGroupsChildCount = [];

  if (parentElement instanceof HTMLElement) {
    const colGroups = Array.from(parentElement.querySelectorAll("colgroup"));
    const areColGroupValids = colGroups.every(
      (colGroup) => colGroup instanceof HTMLTableColElement
    );

    //popula arrays de colgroups com base em filtragem de instância
    if (colGroups instanceof HTMLTableColElement && colGroups.length > 0) {
      for (let i = 0; i < colGroups.length; i++) {
        let colGrpChilds = colGroups[i].children;
        let cols = Array.from(colGrpChilds);
        if (cols.every((col) => col instanceof HTMLTableColElement)) {
          validColGroupsChildCount.push(colGroups[i].childElementCount);
        } else {
          let colsInstances = [];
          for (let j = 0; j < cols.length; j++) {
            const childInstance = `${
              Object.prototype.toString.call(cols[j]).slice(8, -1) ?? "null"
            }`;
            colsInstances.push(childInstance);
            if (childInstance !== `HTMLTableColElement`) {
              const error = new Error();
              const splitError = (error.stack as string)?.split("\n");
              const slicedError = splitError[1].trim().slice(-7, -1);
              ErrorHandler.elementNotFound(
                cols[j] ?? null,
                "child <col>",
                slicedError ?? "NULL"
              );
            }
          }
          const validCols = cols.filter(
            (col) => col instanceof HTMLTableColElement
          );
          validColGroupsChildCount.push(validCols.length);
        }
      }
    } else {
      console.error(`Erro validando colGroups.
      areColGroupValids: ${areColGroupValids ?? false};
      Instância obtida: ${
        Object.prototype.toString.call(colGroups).slice(8, -1) ?? "null"
      };
      Length obtida: ${colGroups.length ?? 0}`);
    }

    //filtra array de colgroups válida com base em colunas de tamanho similar
    let pairedColGroupsValid = [];
    for (let m = 0; m < validColGroupsChildCount.length; m++) {
      if (m === 0) {
        continue;
      } else {
        if ((validColGroupsChildCount[m] = validColGroupsChildCount[m - 1])) {
          pairedColGroupsValid.push(true);
        } else {
          console.warn(`Erro validando par de Col Groups.
          Par invalidado: ${validColGroupsChildCount[m] ?? "null"} com ${
            validColGroupsChildCount[m - 1] ?? "null"
          }`);
          pairedColGroupsValid.push(false);
        }
      }
    }

    //verifica se todos os pares são válidos para, em caso negativo, fornecer warn
    if (
      pairedColGroupsValid.every((pairedColGroup) => pairedColGroup === true)
    ) {
      areAllCoolGroupsSimilar = true;
    } else {
      console.warn(`Grupos de Colunas não são similares no número de children`);
      areAllCoolGroupsSimilar = false;
    }
  }
  return [validColGroupsChildCount?.length ?? 0, areAllCoolGroupsSimilar];
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
      return person;
    } else if (person.gen === "feminino") {
      person = new Woman(
        person.gen,
        person.age,
        person.weight,
        person.height,
        person.sumDCut,
        person.atvLvl
      );
      return person;
    } else if (person.gen === "neutro") {
      person = new Neutro(
        person.gen,
        person.age,
        person.weight,
        person.height,
        person.sumDCut,
        person.atvLvl
      );
      return person;
    } else {
      const error = new Error();
      const splitError = (error.stack as string)?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.stringError(
        "person.gen",
        person?.gen ?? null,
        slicedError ?? "NULL"
      );
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string)?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.typeError(
      "person.gen",
      person?.gen ?? null,
      "string",
      slicedError ?? "NULL"
    );
  }
  return person;
}

export function numberLimit(inputElement: HTMLInputElement): void {
  let numberValue = inputElement.value;
  let numberValueInt = parseInt(numberValue);
  const isAtivFis = inputElement.classList.contains("inpAtivFis");
  const isAlimRot = inputElement.classList.contains("inpAlimRot");
  const isLocNum = inputElement.classList.contains("inpLocNum");
  const isFloat = inputElement.classList.contains("float");
  const isThreeCharLong = inputElement.classList.contains("threeCharLongNum");
  if ((isAtivFis || isAlimRot || isLocNum) && !isFloat) {
    if (numberValue.match(/[=.,;~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]/g)) {
      const wrongMatch = numberValue.match(
        /[=.,;~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]/g
      );
      const wrongMatchIndex = numberValue.indexOf(
        wrongMatch?.toString() ?? "undefined"
      );
      const slicedValue = numberValue.slice(0, wrongMatchIndex);
      const afterSlice = numberValue.slice(wrongMatchIndex + 1);
      inputElement.value = slicedValue + afterSlice;
    }
    const maxLength = 2;
    const maxInput = inputElement.id.endsWith("Max");
    //corrige se máximo é digitado como 0
    if (numberValueInt < 1 && maxInput) {
      const inpValueArray = Array.from(inputElement.value);
      inpValueArray.splice(0, 1, "1");
      const fixedInpValueinpValueArray = inpValueArray.toString();
      inputElement.value = fixedInpValueinpValueArray;
    }

    //previne comportamento anômalo/erro de parsing para NaN digitado com final . ou , ao dar assign em .value para type='number'
    if ((isAtivFis || isAlimRot) && numberValue.length > maxLength) {
      numberValue = numberValue.slice(0, maxLength);
      if (numberValue.match(/[.,]$/g)) {
        inputElement.value =
          numberValue.slice(0, -1) + inputElement.value.slice(-1);
      } else {
        inputElement.value = numberValue;
      }
    }
  }
}

export function normalizeNegatives(tabInp: Element) {
  let parsedInpValue = 0;
  if (tabInp instanceof HTMLInputElement) {
    parsedInpValue = parseFloat(tabInp.value);
    if (Number.isNaN(parsedInpValue) || parsedInpValue < 0) {
      parsedInpValue = 0;
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string)?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.inputNotFound(tabInp ?? null, "tabInp", slicedError ?? "NULL");
  }
  return parsedInpValue.toString();
}

export function autoCapitalizeInputs(textEl: textEl): void {
  if (isAutocorrectOn) {
    let text = textEl.value;
    let newWordMatches = text.match(
      /\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g
    );
    let letterMatchesIniNotD = text.match(/\s[^d]/g);
    let letterMatchesIniD = text.match(/\sd/g);
    const notMatchesAfterDRegex =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g;
    let letterNotMatchesAfterD: RegExpMatchArray | targStrArr = text.match(
      notMatchesAfterDRegex
    );
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
        textEl.value = capitalizedFirstLetter + nextLetters;

        let firstLetterMatch = text[0]?.match(autoCapitalizeFirstLetterRegex);
        if (firstLetterMatch) {
          if (range.endOffset >= 1) {
            range.setStart(textEl, 0);
            range.setEnd(textEl, 1);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }
      }
    } else if (text.length > 1) {
      if (
        textEl.classList.contains("inpAst") ||
        textEl.classList.contains("inpIdentif")
      ) {
        // console.log("inp nome");

        function undoWrongChars() {
          if (wrongCharsMatchesOp1 || wrongCharsMatchesOp2) {
            let wrongCharsMatches: string[] = [];

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

            for (let iW: number = 0; iW < wrongCharsMatches.length; iW++) {
              let wrongCharLength = wrongCharsMatches[iW].length;
              wrongCharsMatches.forEach((wrongCharMatch) => {
                let wrongCharIndex = text.indexOf(wrongCharMatch);
                let arrayCite = Array.from(text);
                arrayCite.splice(wrongCharIndex, wrongCharLength, "");
                let fixedStrCite = arrayCite.toString().replaceAll(",", "");
                textEl.value = fixedStrCite;
                correctCursorNextWords(isUndoUppercase);
                range.selectNodeContents(textEl);
                range.collapse(false);
                selection?.removeAllRanges();
                selection?.addRange(range);
              });
            }
          }
        }

        undoWrongChars();

        function undoMultipleUppercases() {
          let unproperUppercases: string[] = [];
          let unproperDUppercases: string[] = [];

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
            let addAcumulator = 0;
            let loweredRepetitions = "";
            let upperCasesRepetitionsIndex = text.indexOf(
              multipleUppercasesMatch
            );
            let repeatedLetter = multipleUppercasesMatch.slice(0, 1);
            loweredRepetitions = multipleUppercasesMatch.toLowerCase().slice(1);
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
            textEl.value =
              textBeforeRepetitions +
              repeatedLetter +
              loweredRepetitions +
              textAfterRepetitions;
            repAcumulator++;
            isUndoUppercase = true;
            correctCursorNextWords(isUndoUppercase);
            if (range.endOffset >= 1) {
              range.setStart(textEl, 0);
              range.setEnd(textEl, 1);
              range.collapse(true);
              selection?.removeAllRanges();
              selection?.addRange(range);
            }
          });

          unproperDUppercases.forEach((multipleUppercasesMatch) => {
            let addAcumulator = 0;
            let loweredRepetitions = "";
            let upperCasesRepetitionsIndex = text.indexOf(
              multipleUppercasesMatch
            );
            loweredRepetitions = multipleUppercasesMatch.toLowerCase().slice(0);
            let textBeforeRepetitions = text.substring(
              0,
              upperCasesRepetitionsIndex
            );
            if (spaceMatches) {
              addAcumulator = 1;
            }
            console.log("add num" + addAcumulator);
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
            let upperlowercombD: targMatchText = text.match(
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
            textEl.value =
              textBeforeRepetitions + loweredRepetitions + textAfterRepetitions;
            repAcumulator++;
            isUndoUppercase = true;
            correctCursorNextWords(isUndoUppercase);
            if (range.endOffset >= 1) {
              range.setStart(textEl, 0);
              range.setEnd(textEl, 1);
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

        function wrongStartCorrection(wrongStartMatch: targMatchText) {
          // console.log("chegou na checagem de wrong start");
          if (wrongStartMatch) {
            let wrongStartLength = wrongStartMatch
              .toString()
              .replaceAll(",", "").length;
            let addErasedChar = text.slice(0, wrongStartLength - 1);
            let fixedStart = text.slice(wrongStartLength - 1);
            textEl.value = fixedStart + addErasedChar;
          }
        }

        function adjustNewWord(newWordMatches: string[]) {
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
            textEl.value = remadeCiteText;
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
          let letterMatchesAfterD: string[] = [];

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

        function taskCapitalizeD(letterMatchesAfterD: string[]) {
          // console.log("TASK FOI CHAMADA");
          letterMatchesAfterD.forEach((letterMatchD) => {
            let globalLetterMatchIndexD =
              remadeCiteText.lastIndexOf(letterMatchD) + 1;
            let actualCharD = remadeCiteText.charAt(globalLetterMatchIndexD);
            let capitalizedCharD = actualCharD.toUpperCase();
            let textArrayD = Array.from(remadeCiteText);
            textArrayD[globalLetterMatchIndexD] = capitalizedCharD;
            remadeCiteText = textArrayD.toString().replaceAll(",", "");
          });
          textEl.value = remadeCiteText;
          let arrayCheckLowerCasesD = Array.from(letterMatchesAfterD);
          for (let iD = 0; iD < arrayCheckLowerCasesD.length; iD++) {
            let filteredArrayD = letterMatchesAfterD.filter((iD) =>
              lowercasesRegexObj.test(iD)
            );
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
              textEl.value = textEl.value.replace(
                regexTargLetter,
                remadeStringD
              );
            } else if (iD > 2) {
              filteredArrayD.pop();
              filteredArrayD.push(mappedArrayD[iD]);
              correctCursorNextWords(isUndoUppercase);
            }
          }
        }

        function correctCursorNextWords(isUndoUppercase: boolean) {
          let isFixAfterDCursorExec = false;
          if (isFixAfterDCursorExec) {
            return;
          }
          let selectionPosition = window
            .getSelection()
            ?.getRangeAt(0).startOffset;
          if (selectionPosition === 0) {
            wrongStartCorrection(wrongStartMatch);
            textEl.addEventListener("keyup", (fixmove) => {
              if (
                (fixmove instanceof KeyboardEvent &&
                  (fixmove.keyCode === 32 ||
                    fixmove.keyCode === 8 ||
                    (fixmove.keyCode >= 37 && fixmove.keyCode <= 40) ||
                    (fixmove.keyCode >= 65 && fixmove.keyCode <= 90) ||
                    (fixmove.keyCode >= 97 && fixmove.keyCode <= 122))) ||
                isUndoUppercase
              ) {
                if (!isFixAfterDCursorExec) {
                  moveCursorToTheEnd(textEl);
                }
                fixmove.preventDefault();
                isFixAfterDCursorExec = true;
              }
            });
          }
        }

        function moveCursorToTheEnd(textEl: HTMLElement) {
          // console.log("chegou no moveCursor");
          if (window.getSelection && !isCursorAutoMoved) {
            let range = document.createRange();
            range.selectNodeContents(textEl);
            range.collapse(false);
            let sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
            isCursorAutoMoved = true;
          }
        }

        function forceUpperCase() {
          let wordMatch: string[] = [];
          let DMatch: string[] = [];

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
              let strDAfterMinusInd = textEl.value.length - strDAfter.length;
              let oppositeSlicedCite = textEl.value.slice(strDAfterMinusInd);
              let startSlicedCite = textEl.value.slice(0, strDAfterMinusInd);
              if (wordMatch.length >= 1) {
                textEl.value = startSlicedCite + oppositeSlicedCite;
              }
            }

            if (DMatch.length >= 1) {
              correctCursorNextWords(isUndoUppercase);
            }
          }
        }

        textEl.value = textEl.value.replaceAll(wrongCharsRegexOp1, "");
        textEl.value = textEl.value.replaceAll(wrongCharsRegexOp2, "");
        textEl.value = textEl.value.replaceAll(wrongCharsRegexOp3, "");
        textEl.value = textEl.value.replaceAll(/\s[\s]+/g, " ");

        if (text.match(/^[a-záàâäãéèêëíìîïóòôöõúùûü]/)) {
          const firstLetterCapitalized = text.slice(0, 1).toUpperCase();
          const restOfText = text.slice(1);
          textEl.value = firstLetterCapitalized + restOfText;
        }
      }
    }
  }
}

export function autoCapitalizeCite(editableCite: HTMLElement): void {
  let citeText: targStr = editableCite.textContent;
  if (isAutocorrectOn && citeText) {
    let newWordMatches: targStrArr = citeText.match(
      /\s[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\s?[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]?[a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]*/g
    );
    let letterMatchesIniNotD: targStrArr = citeText.match(/\s[^d]/g);
    let letterMatchesIniD: targStrArr = citeText.match(/\sd/g);
    const notMatchesAfterDRegex: RegExp =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]?\s/g;
    let letterNotMatchesAfterD: targStrArr = citeText.match(
      notMatchesAfterDRegex
    );
    const afterDRegexOp1: RegExp =
      /\sd[^aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
    const afterDRegexOp2: RegExp =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS\s]/g;
    const afterDRegexOp3: RegExp =
      /\sd[aeioáàâäãéèêëíìîïóòôöõúùûüAEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS][a-zA-ZáàâäãéèêëíìîïóòôöõúùûüÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/g;
    let letterMatchesAfterDOp1: targStrArr = citeText.match(afterDRegexOp1);
    let letterMatchesAfterDOp2: targStrArr = citeText.match(afterDRegexOp2);
    let letterMatchesAfterDOp3: targStrArr = citeText.match(afterDRegexOp3);
    const lowercasesRegex: RegExp = /[a-záàâäãéèêëíìîïóòôöõúùûü]/g;
    const lowercasesRegexObj: RegExp = new RegExp(lowercasesRegex);
    let lowercasesMatches: targStrArr = citeText.match(lowercasesRegex);
    const uppercasesRegex: RegExp = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
    const uppercasesRegexObj: RegExp = new RegExp(uppercasesRegex);
    const multipleUppercasesRegex: RegExp = /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]{2,}/g;
    let multipleUppercasesMatches: targStrArr = citeText.match(
      multipleUppercasesRegex
    );
    const wrongUppercasesRegexOp1: RegExp =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]\b/g;
    let wrongUppercasesMatchesOp1: targStrArr = citeText.match(
      wrongUppercasesRegexOp1
    );
    const wrongUppercasesRegexOp2: RegExp =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    let wrongUppercasesMatchesOp2: targStrArr = citeText.match(
      wrongUppercasesRegexOp2
    );
    const wrongUppercasesRegexOp3 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü]{2,3}\b/g;
    let wrongUppercasesMatchesOp3: targStrArr = citeText.match(
      wrongUppercasesRegexOp3
    );
    const wrongUppercasesRegexOp4 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü][A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    let wrongUppercasesMatchesOp4: targStrArr = citeText.match(
      wrongUppercasesRegexOp4
    );
    const wrongUppercasesRegexOp5 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]{1,2}[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûüA-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+\b/g;
    let wrongUppercasesMatchesOp5: targStrArr = citeText.match(
      wrongUppercasesRegexOp5
    );
    const wrongUppercasesRegexOp6 =
      /[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][a-záàâäãéèêëíìîïóòôöõúùûü]+[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]+[a-záàâäãéèêëíìîïóòôöõúùûü][a-záàâäãéèêëíìîïóòôöõúùûü]+\b/g;
    let wrongUppercasesMatchesOp6: targStrArr = citeText.match(
      wrongUppercasesRegexOp6
    );
    const wrongUppercasesRegexOp7 = /D[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][sS]/g;
    let wrongUppercasesMatchesOp7: targStrArr = citeText.match(
      wrongUppercasesRegexOp7
    );
    const wrongUppercasesRegexOp8 = /D[AEIOÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ][^sS]/g;
    let wrongUppercasesMatchesOp8: targStrArr = citeText.match(
      wrongUppercasesRegexOp8
    );
    const wrongUppercasesRegexOp9 = /D[aeioáàâäãéèêëíìîïóòôöõúùûü][s]\s/g;
    let wrongUppercasesMatchesOp9: targStrArr = citeText.match(
      wrongUppercasesRegexOp9
    );
    const rgbaRegex: RegExp = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
    const computedStyleRegex: RegExp = /,\d+.?\d*.?\d*/g;
    const spaceRegex: RegExp = /\s/g;
    const wrongStartRegex: RegExp =
      /^[a-záàâäãéèêëíìîïóòôöõúùûü]+[A-ZÁÀÂÄÃÉÈÊËÍÌÎÏÓÒÔÖÕÚÙÛÜ]/;
    let wrongStartMatch: targStrArr = citeText.match(wrongStartRegex);
    const wrongCharsRegexOp1 =
      /[\s]*[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+[\s]*[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]*/g;
    let wrongCharsMatchesOp1: targStrArr = citeText.match(wrongCharsRegexOp1);
    const wrongCharsRegexOp2 =
      /$[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+/g;
    let wrongCharsMatchesOp2: targStrArr = citeText.match(wrongCharsRegexOp2);
    const wrongCharsRegexOp3 =
      /(?<=\sdD)[\d\n,;.+-=~\\\/|"!@#$%&*¬°ªº§¹²³£¢\(\)\{\}\[\]]+/g;
    let wrongCharsMatchesOp3: targStrArr = citeText.match(wrongCharsRegexOp3);
    let selection: Selection | null = window.getSelection();
    let range: Range = document.createRange();
    let remadeCiteText: string | null = citeText;
    let isCursorAutoMoved: boolean = false;
    let isAlertMade: boolean = false;
    let isSpanActive: boolean = false;
    let spaceMatches: targStrArr = citeText.match(spaceRegex);
    let isUndoUppercase: boolean = false;
    let addAcumulator: number = 0;

    function undoWrongChars(): void {
      if (
        wrongCharsMatchesOp1 ||
        wrongCharsMatchesOp2 ||
        wrongCharsMatchesOp3
      ) {
        let wrongCharsMatches: targStrArr = [];

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

        for (let iW: number = 0; iW < wrongCharsMatches.length; iW++) {
          let wrongCharLength: number = wrongCharsMatches[iW].length;
          wrongCharsMatches.forEach((wrongCharMatch: string): void => {
            if (citeText) {
              let wrongCharIndex: number = citeText.indexOf(wrongCharMatch); //erro de leitura do TS
              let arrayCite: string[] = Array.from(citeText);
              arrayCite.splice(wrongCharIndex, wrongCharLength, "");
              let fixedStrCite: string = arrayCite
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

    function undoMultipleUppercases(): void {
      let unproperUppercases: targStrArr = [];
      let unproperDUppercases: targStrArr = []; //EM JS É CONSIDERADO ARRAY DE ARRAY DE STRINGS

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

      unproperUppercases.forEach((multipleUppercasesMatch: targStr): void => {
        //EM JS CADA UNIDADE É ARRAY DE STRINGS
        let loweredRepetitions = "";
        if (citeText && multipleUppercasesMatch) {
          let upperCasesRepetitionsIndex: number = citeText.indexOf(
            multipleUppercasesMatch
          );
          let repeatedLetter: string | string[] = multipleUppercasesMatch.slice(
            0,
            1
          );
          loweredRepetitions = multipleUppercasesMatch.toLowerCase().slice(1);
          let textBeforeRepetitions: string = citeText.substring(
            0,
            upperCasesRepetitionsIndex
          );
          if (spaceMatches) {
            let numSpaces: number = spaceMatches.length;
            addAcumulator += numSpaces;
          }
          let textAfterRepetitions: string = citeText.slice(
            upperCasesRepetitionsIndex + 1 + loweredRepetitions.length,
            citeText.length + 1
          );
          let textArray: string[] = Array.from(citeText);
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
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
            createSpanAlert(isSpanActive);
          }
        }
      });

      unproperDUppercases.forEach((multipleUppercasesMatch: string): void => {
        let loweredRepetitions = "";
        if (citeText && multipleUppercasesMatch) {
          let upperCasesRepetitionsIndex: number = citeText.indexOf(
            multipleUppercasesMatch
          );
          loweredRepetitions = multipleUppercasesMatch.toLowerCase().slice(0);
          let textBeforeRepetitions: string = citeText.substring(
            0,
            upperCasesRepetitionsIndex
          );
          if (lowercasesMatches) {
            let numLowercases: number = lowercasesMatches.length;
            addAcumulator += numLowercases;
          }
          if (spaceMatches) {
            let numSpaces: number = spaceMatches.length;
            addAcumulator += numSpaces;
          }
          let textAfterRepetitions: string = citeText.slice(
            upperCasesRepetitionsIndex + 1 + loweredRepetitions.length,
            citeText.length + 1
          );
          let textArray: string[] = Array.from(citeText);
          textArray.splice(
            upperCasesRepetitionsIndex + 1,
            loweredRepetitions.length,
            loweredRepetitions
          );
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
      let firstLetterMatch: targStrArr = citeText[0]?.match(
        autoCapitalizeFirstLetterRegex
      );
      if (firstLetterMatch) {
        let capitalizedFirstLetter: string = citeText[0]?.toUpperCase();
        let nextLetters: string = citeText.substring(1).toLowerCase();
        editableCite.textContent = capitalizedFirstLetter + nextLetters;

        let firstLetterMatch: targStrArr = citeText[0]?.match(
          autoCapitalizeFirstLetterRegex
        );
        if (firstLetterMatch) {
          range.setStart(editableCite.childNodes[0], 1);
          range.collapse(true);
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
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

    function wrongStartCorrection(
      wrongStartMatch: RegExpMatchArray | targStrArr
    ): void {
      // console.log("chegou na checagem de wrong start");
      if (wrongStartMatch && citeText) {
        let wrongStartLength: number = wrongStartMatch
          .toString()
          .replaceAll(",", "").length;
        let addErasedChar: string = citeText.slice(0, wrongStartLength - 1);
        let fixedStart: string = citeText.slice(wrongStartLength - 1);
        editableCite.textContent = fixedStart + addErasedChar;
      }
    }

    function adjustNewWord(newWordMatches: string[]): void {
      // console.log("chegou no adjust");
      newWordMatches.forEach(() => {
        capitalizeNextWords();
      });
    }

    function capitalizeNextWords() {
      // console.log("chegou no capitalize not D");
      let globalLetterMatchIndex: number = 0;
      let actualChar: string = "";
      let capitalizedChar: string = "";
      let citeTextArray: string[] = [];
      let filteredArray: string[] = [];
      let mappedArray: string[] = [];
      let arrayCheckLowerCases: string[] = [];
      let i: number = 0;
      if (letterMatchesIniNotD && !letterMatchesIniD) {
        letterMatchesIniNotD.forEach((letterMatch: string): void => {
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
          filteredArray = letterMatchesIniNotD.filter((i: string): boolean =>
            lowercasesRegexObj.test(i)
          );
          mappedArray = filteredArray.map((i: string): string =>
            i.toUpperCase()
          );
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
      let letterMatchesAfterD: targStrArr = [];

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

    function taskCapitalizeD(letterMatchesAfterD: targStrArr): void {
      // console.log("TASK FOI CHAMADA");
      letterMatchesAfterD?.forEach((letterMatchD: string): void => {
        let globalLetterMatchIndexD: number | undefined = remadeCiteText
          ? remadeCiteText.lastIndexOf(letterMatchD) + 1
          : undefined;
        if (globalLetterMatchIndexD) {
          let actualCharD: targStr = remadeCiteText?.charAt(
            globalLetterMatchIndexD
          );
          let capitalizedCharD: targStr = actualCharD?.toUpperCase();
          if (remadeCiteText && capitalizedCharD) {
            let citeTextArrayD: string[] = Array.from(remadeCiteText);
            citeTextArrayD[globalLetterMatchIndexD] = capitalizedCharD;
            remadeCiteText = citeTextArrayD.toString().replaceAll(",", "");
          }
        }
      });
      editableCite.textContent = remadeCiteText;
      let arrayCheckLowerCasesD: targStrArr = Array.from(
        letterMatchesAfterD ?? []
      );
      for (let iD: number = 0; iD < arrayCheckLowerCasesD.length; iD++) {
        let filteredArrayD: targStrArr = letterMatchesAfterD?.filter(
          (iD: string) => lowercasesRegexObj.test(iD)
        );
        if (filteredArrayD) {
          let mappedArrayD: string[] = filteredArrayD.map(
            (iD: string): string => iD.toUpperCase()
          );
          let remadeStringD: string = "";
          const targLetter = filteredArrayD[iD];
          const regexTargLetter: RegExp = new RegExp(targLetter, "g");
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

    function createSpanAlert(isSpanActive: boolean): void {
      if (editableCite.nextElementSibling) {
        let nextCiteElementSibling: string = editableCite.nextElementSibling.id;
        if (nextCiteElementSibling === "deactAutocorrectBtn" && !isSpanActive) {
          const cursorResetAlert: HTMLSpanElement =
            document.createElement("span");
          if (!isAlertMade) {
            cursorResetAlert.textContent =
              "Cursor resetado! Aperte alguma tecla Arrow";
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
            let computedStyleCite: string = window
              .getComputedStyle(editableCite)
              .getPropertyValue("border-color");
            let rgbaMatch: targStrArr = computedStyleCite.match(rgbaRegex);
            if (rgbaMatch) {
              let reduceOpacity: NodeJS.Timeout = setInterval((): void => {
                let poppedArray: targStr = rgbaMatch?.pop(); //faz a retirada inicial
                let strUpdatedAlpha: targStr = poppedArray?.toString();
                if (rgbaMatch) {
                  // console.log("rgbaMatch validado");
                  let strRgba: string = rgbaMatch
                    .toString()
                    .replaceAll(computedStyleRegex, "");
                  let firstSliceStrRgba: string = strRgba.slice(0, 18);
                  let strNewOpacityValue: string =
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
                }
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

    function correctCursorNextWords(isUndoUppercase: boolean): void {
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

    function moveCursorToTheEnd(editableCite: Element): void {
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

    function forceUpperCase(): void {
      let wordMatch: targStrArr = [];
      let DMatch: string[][] | null = [];

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
        let uppercaseTest: boolean = uppercasesRegexObj.test(
          wordMatch[wordMatchI]
        );
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
          let oppositeSlicedCite =
            editableCite.textContent?.slice(strDAfterMinusInd);
          let startSlicedCite = editableCite.textContent?.slice(
            0,
            strDAfterMinusInd
          );
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

export function removeFirstClick(editableCite: Element): void {
  editableCite.textContent === "Insira Seu Nome Aqui"
    ? (editableCite.textContent = "")
    : null;
  let isCursorCheckExec = true;
  let cursorPosition = 0;
  setInterval(() => {
    cursorPosition = Controller.cursorCheckTimer(cursorPosition) ?? 0;
  }, 3000);
}

export function switchAutocorrect(
  click: MouseEvent,
  deactAutocorrectBtn: HTMLButtonElement
): void {
  if (click.target === deactAutocorrectBtn) {
    isAutocorrectOn = !isAutocorrectOn; //simplificação de if-else; if-if não funciona aqui
    deactAutocorrectBtn.textContent = isAutocorrectOn
      ? "Desativar Autocorreção"
      : "Ativar Autocorreção";
  }
}

export function changeTabDCutLayout(
  protocolo: HTMLSelectElement,
  tabDC: HTMLTableElement
) {
  const bodyType = document.getElementById("textBodytype");
  const optionElementMatch7 = protocolo.value.match(/^pollock7$/i)?.toString();
  const optionElementMatch3 = protocolo.value.match(/^pollock3$/i)?.toString();
  if (
    protocolo &&
    tabDC &&
    bodyType &&
    (bodyType instanceof HTMLSelectElement ||
      bodyType instanceof HTMLInputElement)
  ) {
    const opsProtocolo = Array.from(protocolo.children);
    const filteredOpsProtocolo = opsProtocolo.filter(
      (childProtocolo) => childProtocolo instanceof HTMLOptionElement
    );
    if (filteredOpsProtocolo.length < opsProtocolo.length) {
      console.warn(
        `Algum elementos de Protocolo não foram reconhecidos como opções. Total de reconhecimentos: ${filteredOpsProtocolo.length}`
      );
    }
    for (let iOp = 0; iOp < filteredOpsProtocolo.length - 1; iOp++) {
      const optionElement = filteredOpsProtocolo[iOp];
      if (optionElementMatch3) {
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
              const medTrs = Array.from(
                tabDC.querySelectorAll("tr.tabRowDCutMed")
              );

              for (let iTr = 0; iTr < medTrs.length; iTr++) {
                medTrs[iTr].setAttribute("hidden", "");
                const innerInp = medTrs[iTr].querySelector("input");
                if (innerInp && innerInp.required) {
                  innerInp.removeAttribute("required");
                  if (medTrs[iTr].id?.slice(-4) !== "Coxa") {
                    innerInp.value = "";
                  }
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
                  }
                }
              }
            } else {
              console.warn(
                `Erro na validação de ids de row. Elemento ${JSON.stringify(
                  genderedIds
                )}; Número obtido ${
                  genderedIds?.length ?? null
                }; Número esperado: 3`
              );
            }
          } else if (bodyType.value === "neutro") {
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
              const medTrs = Array.from(
                tabDC.querySelectorAll("tr.tabRowDCutMed")
              );
              for (let iTr = 0; iTr < medTrs.length; iTr++) {
                medTrs[iTr].setAttribute("hidden", "");
                const innerInp = medTrs[iTr].querySelector("input");
                if (innerInp) {
                  if (medTrs[iTr].id?.slice(-4) !== "Coxa") {
                    innerInp.value = "";
                  }
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
            } else {
              console.warn(
                `Erro na validação de ids de row. Elemento ${JSON.stringify(
                  genderedIds
                )}; Número obtido ${
                  genderedIds?.length ?? null
                }; Número esperado: 3`
              );
            }
          } else {
            const error = new Error();
            const splitError = (error.stack as string)?.split("\n");
            const slicedError = splitError[1].trim().slice(-7, -1);
            ErrorHandler.stringError(
              "validando .value de bodyType",
              bodyType?.value ?? null,
              slicedError ?? "NULL"
            );
          }
        } else {
          console.warn(
            `Erro na verificação do número de rows. Elemento ${JSON.stringify(
              arrayTabIds
            )}; Número obtido: ${
              arrayTabIds?.length ?? null
            }; Número esperado: ${tabDC.rows.length}`
          );
        }
        return "pollock3";
      } else if (optionElementMatch7) {
        const medTrs = Array.from(tabDC.querySelectorAll("tr.tabRowDCutMed"));
        for (let iTr = 0; iTr < medTrs.length; iTr++) {
          const isRowHidden = (medTrs[iTr] as HTMLTableRowElement).hidden;
          if (isRowHidden) {
            medTrs[iTr].removeAttribute("hidden");
            const innerInp = medTrs[iTr].querySelector("input");
            if (innerInp) {
              innerInp.setAttribute("required", "");
            }
          }
        }
        return "pollock7";
      } else {
        const error = new Error();
        const splitError = (error.stack as string)?.split("\n");
        const slicedError = splitError[1].trim().slice(-7, -1);
        ErrorHandler.stringError(
          "obtendo pollock.value",
          protocolo?.value ?? null,
          slicedError ?? "NULL"
        );
        return "pollock3";
      }
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string)?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(
      bodyType ?? null,
      "bodyType",
      slicedError ?? "NULL"
    );
    return "pollock3";
  }
  return "pollock3";
}

function checkTabRowsIds(tab: HTMLTableElement) {
  let arrayTabIds = [];
  if (tab.id === "tabDCut") {
    const tableRows = Array.from(tab.querySelectorAll("tr.tabRowDCutMed"));
    for (let iR = 0; iR < tableRows.length; iR++) {
      const rowId = tableRows[iR].id;
      const rowIdMatch = rowId.match(/^row/)?.toString();
      if (rowIdMatch) {
        const slicedRowId = rowId.slice(3).toLowerCase();
        arrayTabIds.push(slicedRowId);
      } else {
        const error = new Error();
        const splitError = (error.stack as string)?.split("\n");
        const slicedError = splitError[1].trim().slice(-7, -1);
        ErrorHandler.stringError(
          `obtendo id da row ${tableRows[iR] ?? null}`,
          rowId ?? null,
          slicedError ?? "NULL"
        );
      }
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string)?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.stringError(
      `obtendo id da table ${tab ?? null}`,
      tab.id ?? null,
      slicedError ?? "NULL"
    );
  }
  return arrayTabIds;
}

function filterIdsByGender(arrayIds: string[], bodyType: string) {
  if (Array.isArray(arrayIds)) {
    if (
      arrayIds.every((prop) => typeof prop === "string") &&
      typeof bodyType === "string"
    ) {
      let genderedIds = [];
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
          const error = new Error();
          const splitError = (error.stack as string)?.split("\n");
          const slicedError = splitError[1].trim().slice(-7, -1);
          ErrorHandler.stringError(
            `obtendo bodyType válido`,
            bodyType ?? null,
            slicedError ?? "NULL"
          );
      }
      return genderedIds;
    } else {
      const error = new Error();
      const splitError = (error.stack as string)?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.typeError(
        `validando tipo primitivo de elementos para definição de gênero`,
        bodyType ?? null,
        "string",
        slicedError ?? "NULL"
      );
    }
  } else {
    console.warn(`Erro validando array em filterIdsByGender()`);
  }
}

export function isPGCDecaying(
  person: formClassPerson,
  PGC: number,
  targInpPGC: HTMLInputElement
): [boolean, number] {
  let foundDecayPoint = false;
  let sumAcc = 1;
  const initSumDCut = person.sumDCut;
  let decreasedPerson = Person.clonePerson(person);
  const spanRoundingAlertIcon = document.getElementById(
    `alert_${targInpPGC.id}`
  );

  if (!(spanRoundingAlertIcon instanceof HTMLSpanElement)) {
    const error = new Error();
    const splitError = (error.stack as string)?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.elementNotFound(
      spanRoundingAlertIcon ?? null,
      "spanRoundingAlertIcon",
      slicedError ?? "NULL"
    );
  } else {
    if (spanRoundingAlertIcon.hidden === false) {
      console.log("não está escondido");
      spanRoundingAlertIcon.hidden = true;
    }
  }

  if (decreasedPerson) {
    decreasedPerson.sumDCut = decreasedPerson.sumDCut - 1;
    let decreasedPGC = decreasedPerson.calcPGC(decreasedPerson);
    //caso padrão de decay
    if (decreasedPGC > PGC) {
      if (spanRoundingAlertIcon?.hidden === true) {
        spanRoundingAlertIcon.hidden = false;
      }
      let arrDecreasedPGC = [];
      while (decreasedPerson.sumDCut > 0) {
        sumAcc++;
        decreasedPerson.sumDCut = decreasedPerson.sumDCut - 1;
        decreasedPGC = decreasedPerson.calcPGC(decreasedPerson);
        arrDecreasedPGC.push(decreasedPGC);
        if (decreasedPGC < PGC) {
          break;
        }
        if (sumAcc > 999) {
          console.warn(`Ciclo 2 exaurido.`);
          break;
        }
      }
      if (arrDecreasedPGC.length > 0) {
        const factorNormDecayedPGC = ((initSumDCut - 260) / 100) * 5;
        PGC =
          Math.ceil((Math.max(...arrDecreasedPGC) + 0.05) * 10) / 10 +
          factorNormDecayedPGC;
        if (decreasedPerson.sumDCut > 515) {
          PGC = 60.5;
        }
      } else {
        PGC = decreasedPGC;
      }
      foundDecayPoint = true;
    } else if (decreasedPGC <= PGC) {
      //casos específicos para handling de input anômalo (além do possível para um ser humano), evitando bugs nos listeners devido a NaN e loops de normalização
      if (PGC > 100 || decreasedPerson.sumDCut > 514) {
        console.warn(
          `Valor anômalo de entrada para sumDCut e/ou PGC. Valor aproximado fornecido`
        );
        if (spanRoundingAlertIcon?.hidden === true) {
          spanRoundingAlertIcon.hidden = false;
        }
        foundDecayPoint = true;
        PGC = 60.45 + 0.05 * ((decreasedPerson?.sumDCut ?? 514) - 513);
      }
    }
  } else {
    const error = new Error();
    const splitError = (error.stack as string)?.split("\n");
    const slicedError = splitError[1].trim().slice(-7, -1);
    ErrorHandler.objectError(
      "decreasedPerson",
      person ?? null,
      "person",
      "6",
      slicedError
    );
  }

  return [foundDecayPoint, PGC];
}
