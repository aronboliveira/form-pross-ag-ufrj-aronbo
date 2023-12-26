//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM
"use strict";
import * as EdFisNutModel from "./edFisNutModel.js";
import * as EdFisNutHandler from "./edFisNutHandler.js";
import * as GlobalModel from "../../globalScripts/src/gModel.js";
import * as GlobalHandler from "../../globalScripts/src/gHandlers.js";
import * as ErrorHandler from "../../globalScripts/src/errorHandler.js";
import { Man, Woman, Neutro } from "../../globalScripts/src/classes.js";
import {
  elCollection,
  entryEl,
  formClassPerson,
  targEl,
} from "../../globalScripts/src/types.js";

//inicialização de constantes a partir de procura no DOM
const textareas = document.querySelectorAll("textarea");
const textInputs = document.querySelectorAll('input[type="text"]');
const textConts = [...textareas, ...textInputs];
const genElement = document.getElementById("genId");
const genBirthRel = document.getElementById("genBirthRelId");
const genTrans = document.getElementById("genTransId");
const genFisAlin = document.getElementById("genFisAlinId");

const textBodytype = document.getElementById("textBodytype");
const ageElement = document.getElementById("ageId");
const atvLvlElement = document.getElementById("selectLvlAtFis");
const numInps = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const comorbBtns = document.getElementsByClassName("countComorb");
const comorbBtnsArray = Array.from(comorbBtns);
const ativFisContainerBtns = document.getElementsByClassName("countAtFis");
const ativFisContainerBtnsArray = Array.from(ativFisContainerBtns);
const consTablesFs = document.getElementById("fsProgConsId");
const numConsElement = document.getElementById("selectNumCons");
const tabSVi = document.getElementById("tabProgSVi");
const tabMedAnt = document.getElementById("tabMedAnt");
const tabDC = document.getElementById("tabDCut");
const tabIndPerc = document.getElementById("tabIndPerc");
const editableCite = document.querySelector('cite[contenteditable="true"]');
const astDigtBtns = document.querySelectorAll('button[id$="AstDigtBtn');
const deactAutocorrectBtns = document.querySelectorAll(
  'button[id^="deactAutocorrectBtn"]'
);
const dateBtns = document.querySelectorAll('button[id$="DatBtn"]');
const gordCorpLvl = document.getElementById("gordCorpLvl");
const lockGordCorpLvl = document.getElementById("lockGordCorpLvl");
const nafType = document.getElementById("nafType");
const formTMBTypeElement = document.getElementById("formCalcTMBType");
const spanFactorAtleta = document.getElementById("spanFactorAtleta");
const selFactorAtleta = document.getElementById("selFactorAtleta");
const weightInps = Array.from(document.getElementsByClassName("inpWeight"));
const heightInps = Array.from(document.getElementsByClassName("inpHeight"));
const sumDCInps = Array.from(document.getElementsByClassName("inpSumDCut"));
const IMCInps = Array.from(document.getElementsByClassName("inpImc"));
const MLGInps = Array.from(document.getElementsByClassName("inpMlg"));
const PGCInps = Array.from(document.getElementsByClassName("inpPgc"));
const TMBInps = Array.from(document.getElementsByClassName("inpTmb"));
const GETInps = Array.from(document.getElementsByClassName("inpGet"));
const IMCBtns = Array.from(document.getElementsByClassName("tabBtnImc"));
const MLGBtns = Array.from(document.getElementsByClassName("tabBtnMlg"));
const PGCBtns = Array.from(document.getElementsByClassName("tabBtnPgc"));
const TMBBtns = Array.from(document.getElementsByClassName("tabBtnTmb"));
const GETBtns = Array.from(document.getElementsByClassName("tabBtnGet"));
const autoFillBtn = document.getElementById("autoFillBtn");
const trioReadNumCons = document.getElementById("trioReadNumCons");
const numConsTextHeadCels = Array.from(
  document.getElementsByClassName("numConsTextHeadCel")
);
const locksTabInd = Array.from(document.getElementsByClassName("lockTabInd"));
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");

//inicialização de variáveis para validação e construção de pessoa tratada no formulário
const areAllGenContChecked = GlobalModel.checkAllGenConts(
  genElement,
  genBirthRel,
  genTrans,
  genFisAlin
);
let person = {
  gen: (genElement as entryEl)?.value ?? "",
  age: 0,
  sumDCut: 0,
  weight: 0,
  height: 0,
  atvLvl: (atvLvlElement as entryEl)?.value ?? "",
};

//inicialização de variáveis usadas no tabelamento, para alcance em escopo global
//variáveis e constantes obtidas através de queries nas tabelas são inicializadas em blocos, após validação das respectivas tabelas
let numTotalTabsCons = 1;
let numCons = 1;
let numCol = 1;
let numColsCons = 1;
let numTotalColsCons = 1;
let areColGroupsSimilar = false;
let areNumConsOpsValid = false;
let targInpWeight: targEl = null;
let targInpHeight: targEl = null;
let targInpSumDCut: targEl = null;
let targInpIMC: targEl = null;
let targInpMLG: targEl = null;
let targInpPGC: targEl = null;
let targInpTMB: targEl = null;
let targInpGET: targEl = null;
let arrayTargInps = [];
let arrayWH = [0, 0];
let arrayPGC: [number, targEl, targEl] = [0, null, null];
let IMC = 0;
let MLG = 0;
let PGC = 0;
let TMB = 0;
let GET = 0;
let indexesArray = [0, 0, 0, 0];
let factorAtvLvl = 0;
let factorAtleta = "";
let numConsLastOp = 0;
let isPersonClassified = false;
let isAutoFillActive = true;

if (selFactorAtleta instanceof HTMLSelectElement) {
  factorAtleta = selFactorAtleta.value;
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotFound(
    selFactorAtleta ?? null,
    "selFactorAtleta",
    slicedError ?? "NULL"
  );
}
//início da validação de elementos no DOM e inserção de listeners com callbacks respectivos
if (textConts.length > 0) {
  textConts.forEach(function (textCont) {
    textCont.addEventListener("input", function (input) {
      if (
        input.target &&
        (input.target instanceof HTMLTextAreaElement ||
          (input.target instanceof HTMLInputElement &&
            input.target.type === "text"))
      ) {
        GlobalModel.autoCapitalizeInputs(input.target);
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.inputNotFound(
          (input?.target as HTMLElement) ?? null,
          "textCont",
          slicedError ?? "NULL"
        );
      }
    });
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    textConts ?? null,
    "textConts",
    slicedError ?? "NULL"
  );
}

if (numInps.length > 0) {
  numInps.forEach(function (numInp) {
    numInp.addEventListener("input", function (input) {
      if (
        input.target &&
        input.target instanceof HTMLInputElement &&
        input.target.type === "number"
      ) {
        GlobalModel.numberLimit(input.target);
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.inputNotFound(
          (input?.target as HTMLElement) ?? null,
          "numInp",
          slicedError ?? "NULL"
        );
      }
    });
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    numInps ?? null,
    "numInps",
    slicedError ?? "NULL"
  );
}

if (radioButtons.length > 0) {
  radioButtons.forEach((radio) => {
    if (radio instanceof HTMLInputElement && radio.type === "radio") {
      radio.addEventListener("keydown", (keydown) => {
        GlobalHandler.opRadioHandler(keydown);
      });
      radio.addEventListener("change", () =>
        GlobalHandler.cpbInpHandler(radio)
      );
      radio.addEventListener("keydown", () =>
        GlobalHandler.cpbInpHandler(radio)
      );
      radio.addEventListener("dblclick", () =>
        GlobalHandler.doubleClickHandler(radio)
      );
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.inputNotFound(
        radio ?? null,
        "radio element",
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    radioButtons ?? null,
    "radioButtons",
    slicedError ?? "NULL"
  );
}

if (comorbBtnsArray.length > 0) {
  comorbBtnsArray.forEach((comorbBtn) => {
    if (comorbBtn && comorbBtn instanceof HTMLButtonElement) {
      comorbBtn.addEventListener("click", () =>
        EdFisNutHandler.addRowComorb(comorbBtn)
      );
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        comorbBtn ?? null,
        "comorbBtn",
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    comorbBtnsArray ?? "null",
    "comorbBtnsArray",
    slicedError ?? "NULL"
  );
}

if (ativFisContainerBtnsArray.length > 0) {
  ativFisContainerBtnsArray.forEach((ativFisContainerBtn) => {
    if (
      ativFisContainerBtn &&
      ativFisContainerBtn instanceof HTMLButtonElement
    ) {
      ativFisContainerBtn.addEventListener("click", () =>
        EdFisNutHandler.addRowAtivFis(ativFisContainerBtn)
      );
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        ativFisContainerBtn ?? null,
        "ativFisContainerBtn",
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    ativFisContainerBtnsArray ?? null,
    "ativFisContainerBtnsArray",
    slicedError ?? "NULL"
  );
}

if (dateBtns.length > 0) {
  dateBtns.forEach(function (dateBtn) {
    if (dateBtn instanceof HTMLButtonElement) {
      dateBtn.addEventListener("click", function (activation) {
        return GlobalHandler.useCurrentDate(activation, dateBtn);
      });
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        dateBtn ?? null,
        "dateBtn",
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    dateBtns ?? null,
    "dateBtns",
    slicedError ?? "NULL"
  );
}

if (editableCite) {
  let firstClick = true;
  const citeClickHandler = function (click: Event) {
    if (firstClick && click.target && click.target instanceof HTMLElement) {
      GlobalModel.removeFirstClick(click.target);
      firstClick = false;
      editableCite.removeEventListener("click", citeClickHandler);
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        (click.target as HTMLElement) ?? null,
        "editableCite",
        slicedError ?? "NULL"
      );
    }
  };
  editableCite.addEventListener("keyup", function (keypress) {
    if (keypress.target && keypress.target instanceof HTMLElement) {
      GlobalModel.autoCapitalizeCite(keypress.target);
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        (keypress.target as HTMLElement) ?? null,
        "editableCite",
        slicedError ?? "NULL"
      );
    }
  });
  editableCite.addEventListener("click", citeClickHandler);
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotFound(null, "editableCite", slicedError ?? "NULL");
}

if (deactAutocorrectBtns.length > 0) {
  deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
    if (
      deactAutocorrectBtn &&
      deactAutocorrectBtn instanceof HTMLButtonElement
    ) {
      deactAutocorrectBtn.addEventListener("click", function (click) {
        return GlobalModel.switchAutocorrect(click, deactAutocorrectBtn);
      });
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        deactAutocorrectBtn ?? null,
        "deactAutocorrectBtn",
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    deactAutocorrectBtns ?? null,
    "deactAutocorrectBtns",
    slicedError ?? "NULL"
  );
}

if (astDigtBtns.length > 0) {
  astDigtBtns.forEach(function (astDigtBtn) {
    if (astDigtBtn instanceof HTMLButtonElement) {
      astDigtBtn.addEventListener("click", function (click) {
        return GlobalHandler.changeToAstDigit(click, astDigtBtn);
      });
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        astDigtBtn ?? null,
        "astDigtBtn",
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    astDigtBtns ?? null,
    "astDigtBtns",
    slicedError ?? "NULL"
  );
}

if (subButton instanceof HTMLButtonElement) {
  subButton.addEventListener("click", GlobalHandler.subForm);
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotFound(
    subButton ?? null,
    "subButton",
    slicedError ?? "NULL"
  );
}

if (resetFormBtn instanceof HTMLButtonElement) {
  resetFormBtn.addEventListener("click", (click) => {
    if (
      editableCite instanceof HTMLElement &&
      genTrans instanceof HTMLSelectElement &&
      genFisAlin instanceof HTMLSelectElement
    ) {
      GlobalHandler.resetarFormulario(
        click,
        astDigtBtns as NodeListOf<HTMLButtonElement>
      );
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementsNotFoundFunction(
        slicedError ?? "NULL",
        "resetarFormulario",
        editableCite ?? null,
        genTrans ?? null,
        genFisAlin ?? null
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotFound(
    resetFormBtn ?? null,
    "resetFormBtn",
    slicedError ?? "NULL"
  );
}
//para apagar retornos negativos anômalos
if (consTablesFs && consTablesFs instanceof HTMLFieldSetElement) {
  numTotalColsCons = consTablesFs.querySelectorAll("col")?.length ?? 1;
  numTotalTabsCons = consTablesFs.querySelectorAll("table")?.length ?? 1;
  const allTabledInps = consTablesFs.querySelectorAll("input");
  if (allTabledInps.length > 0) {
    allTabledInps.forEach((tabInp) => {
      if (tabInp instanceof HTMLInputElement) {
        tabInp.addEventListener("input", () => {
          if (
            parseInt(tabInp.value) < 0 ||
            Number.isNaN(parseInt(tabInp.value))
          ) {
            tabInp.value = "0";
          }
        });
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.inputNotFound(
          tabInp ?? null,
          "tabInp",
          slicedError ?? "NULL"
        );
      }
    });
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotPopulated(
      allTabledInps ?? null,
      "allTabledInps",
      slicedError ?? "NULL"
    );
  }
  const arrColGroupsValidation = EdFisNutModel.checkInnerColGroups(
    consTablesFs
  ) ?? [0, false];
  if (arrColGroupsValidation[0] !== 0 && arrColGroupsValidation[1] !== false) {
    [numColsCons, areColGroupsSimilar] = arrColGroupsValidation;
  }
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotFound(
    consTablesFs ?? null,
    "consTablesFs",
    slicedError ?? "NULL"
  );
}

if (tabDC && tabDC instanceof HTMLTableElement) {
  const rowsDC = tabDC.getElementsByClassName("tabRowDCut");
  const rowsDCArray = Array.from(rowsDC).filter(
    (rowDC) => rowDC instanceof HTMLTableRowElement
  );
  const sumDCBtns = tabDC.querySelectorAll('button[id^="sumDCBtn"]');
  const protocolo = document.getElementById("tabSelectDCutId");

  //adiciona listeners para botões de índices secundários e valida outras tabelas usadas
  if (
    tabSVi &&
    tabSVi instanceof HTMLTableElement &&
    tabMedAnt &&
    tabMedAnt instanceof HTMLTableElement &&
    tabIndPerc &&
    tabIndPerc instanceof HTMLTableElement
  ) {
    //início da captura de propriedades nas tabelas
    if (numConsElement?.lastElementChild instanceof HTMLOptionElement) {
      numConsLastOp = parseInt(
        numConsElement?.lastElementChild?.value ?? "1",
        10
      );
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        numConsElement?.lastElementChild ?? null,
        "numConsLastOp",
        slicedError ?? "NULL"
      );
    }

    //validação da relação de options e colunas
    if (numConsLastOp === numColsCons - 1 && numConsLastOp >= 3) {
      areNumConsOpsValid = true;
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.maxNumberError(
        (numConsElement?.lastElementChild as entryEl)?.value ?? "1",
        "Options para Consultas",
        slicedError ?? "NULL"
      );
    }

    //faz a leitura do número de consulta
    if (
      areColGroupsSimilar &&
      numConsElement instanceof HTMLSelectElement &&
      gordCorpLvl instanceof HTMLSelectElement &&
      areNumConsOpsValid
    ) {
      //construção de array para sintetizar argumentação de funções e validações conjuntas
      const switchElements = [
        consTablesFs,
        numConsElement,
        tabSVi,
        tabMedAnt,
        tabDC,
        tabIndPerc,
      ];
      const filteredSwitchElements = switchElements.filter(
        (switchElement) => switchElement instanceof HTMLElement
      );

      numCons = parseInt(numConsElement?.value || "1");
      if (filteredSwitchElements.length === 6) {
        /*validações de rows com base em títulos (textContent da primeira célula à esquerda) de respectivas rows 
        + obtenção dos target inputs iniciais*/

        const inpWeightRowTitle =
          tabMedAnt.querySelector(`#tabCelRowMedAnt2_1`);
        const inpHeightRowTitle = tabMedAnt.querySelector(
          "#tabCelRowMedAnt3_1"
        );
        const inpSumDCutRowTitle = tabDC.querySelector("#tabCelRowDCut9_1");
        const inpIMCRowTitle = tabIndPerc.querySelector("#tabCelRowIndPerc2_1");
        const inpMLGRowTitle = tabIndPerc.querySelector("#tabCelRowIndPerc3_1");
        const inpPGCRowTitle = tabIndPerc.querySelector("#tabCelRowIndPerc4_1");
        const inpTMBRowTitle = tabIndPerc.querySelector("#tabCelRowIndPerc5_1");
        const inpGETRowTitle = tabIndPerc.querySelector("#tabCelRowIndPerc6_1");

        //inicialização de titles e targInps
        /*os titles são construídos somente para alertar se houver inadequação
        de entitulações no HTML (por ordem ou texto)*/
        if (
          inpWeightRowTitle &&
          inpWeightRowTitle.textContent?.match(/Peso/g)
        ) {
          targInpWeight = tabMedAnt.querySelector(
            `#tabInpRowMedAnt2_${numCons + 1}`
          );
          if (!(targInpWeight instanceof HTMLInputElement)) {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpWeight ?? null,
              "targInpWeight",
              slicedError ?? "NULL"
            );
          }
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.matchError(
            "Título da Row para Campos de Peso",
            inpWeightRowTitle ?? null,
            inpWeightRowTitle?.textContent || "null",
            slicedError ?? "NULL"
          );
        }

        if (
          inpHeightRowTitle &&
          inpHeightRowTitle.textContent?.match(/Altura/g)
        ) {
          targInpHeight = tabMedAnt.querySelector(
            `#tabInpRowMedAnt3_${numCons + 1}`
          );
          if (!(targInpHeight instanceof HTMLInputElement)) {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpHeight ?? null,
              "targInpHeight",
              slicedError ?? "NULL"
            );
          }
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.matchError(
            "Título da Row para Campos de Altura",
            inpHeightRowTitle ?? null,
            inpHeightRowTitle?.textContent || "null",
            slicedError ?? "NULL"
          );
        }

        if (
          inpSumDCutRowTitle &&
          inpSumDCutRowTitle.textContent?.match(/Soma/g)
        ) {
          targInpSumDCut = tabDC.querySelector(
            `#tabInpRowDCut9_${numCons + 1}`
          );
          if (!(targInpSumDCut instanceof HTMLInputElement)) {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpSumDCut ?? null,
              "targInpSumDCut",
              slicedError ?? "NULL"
            );
          }
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.matchError(
            "Título da Row para Campos de Soma de Dobras Cutâneas",
            inpSumDCutRowTitle ?? null,
            inpSumDCutRowTitle?.textContent || "null",
            slicedError ?? "NULL"
          );
        }

        if (inpIMCRowTitle && inpIMCRowTitle.textContent?.match(/IMC/g)) {
          targInpIMC = tabIndPerc.querySelector(
            `#inpImc${numCons}Cel2_${numCons + 1}`
          );
          if (!(targInpIMC instanceof HTMLInputElement)) {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpIMC ?? null,
              "targInpIMC",
              slicedError ?? "NULL"
            );
          }
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.matchError(
            "Título da Row para Campos de IMC",
            inpIMCRowTitle ?? null,
            inpIMCRowTitle?.textContent || "null",
            slicedError ?? "NULL"
          );
        }

        if (inpMLGRowTitle && inpMLGRowTitle.textContent?.match(/MLG/g)) {
          targInpMLG = tabIndPerc.querySelector(
            `#inpMlg${numCons}Cel3_${numCons + 1}`
          );
          if (!(targInpMLG instanceof HTMLInputElement)) {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpMLG ?? null,
              "targInpMLG",
              slicedError ?? "NULL"
            );
          }
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.matchError(
            "Título da Row para Campos de MLG",
            inpMLGRowTitle ?? null,
            inpMLGRowTitle?.textContent || "null",
            slicedError ?? "NULL"
          );
        }

        if (inpPGCRowTitle && inpPGCRowTitle.textContent?.match(/PGC/g)) {
          targInpPGC = tabIndPerc.querySelector(
            `#inpPgc${numCons}Cel4_${numCons + 1}`
          );
          if (!(targInpPGC instanceof HTMLInputElement)) {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpPGC ?? null,
              "targInpPGC",
              slicedError ?? "NULL"
            );
          }
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.matchError(
            "Título da Row para Campos de PGC",
            inpPGCRowTitle ?? null,
            inpPGCRowTitle?.textContent || "null",
            slicedError ?? "NULL"
          );
        }

        if (inpTMBRowTitle && inpTMBRowTitle.textContent?.match(/TMB/g)) {
          targInpTMB = tabIndPerc.querySelector(
            `#inpTmb${numCons}Cel5_${numCons + 1}`
          );
          if (!(targInpTMB instanceof HTMLInputElement)) {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpTMB ?? null,
              "targInpTMB",
              slicedError ?? "NULL"
            );
          }
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.matchError(
            "Título da Row para Campos de TMB",
            inpTMBRowTitle ?? null,
            inpTMBRowTitle?.textContent || "null",
            slicedError ?? "NULL"
          );
        }

        if (inpGETRowTitle && inpGETRowTitle.textContent?.match(/GET/g)) {
          targInpGET = tabIndPerc.querySelector(
            `#inpGet${numCons}Cel6_${numCons + 1}`
          );
          if (!(targInpGET instanceof HTMLInputElement)) {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpGET ?? null,
              "targInpGET",
              slicedError ?? "NULL"
            );
          }
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.matchError(
            "Título da Row para Campos de GET",
            inpGETRowTitle ?? null,
            inpGETRowTitle?.textContent || "null",
            slicedError ?? "NULL"
          );
        }

        //listener para atualização de inputs target
        numConsElement.addEventListener("change", () => {
          EdFisNutHandler.switchRequiredCols(
            filteredSwitchElements as elCollection
          );
          numCons = parseInt(numConsElement?.value || "0");
        });

        if (
          trioReadNumCons instanceof HTMLInputElement &&
          trioReadNumCons.type === "number"
        ) {
          trioReadNumCons.addEventListener("input", () => {
            const numTotalTitledColsCons = numTotalColsCons - numTotalTabsCons;
            if (numConsTextHeadCels.length === numTotalTitledColsCons) {
              EdFisNutHandler.switchNumConsTitles(
                numConsTextHeadCels,
                trioReadNumCons,
                numTotalTitledColsCons,
                numTotalTabsCons
              );
            } else {
              const slicedError =
                new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
              ErrorHandler.elementNotPopulated(
                numConsTextHeadCels,
                "numConsTextHeadCels",
                slicedError ?? "NULL"
              );
            }
          });
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.inputNotFound(
            trioReadNumCons?.id ?? null,
            "trioReadNumCons",
            slicedError ?? "NULL"
          );
        }

        if (
          areAllGenContChecked &&
          textBodytype instanceof HTMLSelectElement &&
          protocolo instanceof HTMLSelectElement
        ) {
          //início da construção de person (após inicialização)
          /*adição de listeneres de input para capturar mudança nos inputs validados e atribuir às propriedades de person*/
          //obtenção de .gen inicial com adição de listeners para changes em contexto e atualização de .gen

          if (typeof person.gen === "string") {
            genElement?.addEventListener("change", () => {
              person.gen =
                GlobalModel.fluxGen(
                  genElement as entryEl,
                  (genElement as entryEl)?.value ?? null,
                  genBirthRel as entryEl,
                  genTrans as entryEl,
                  genFisAlin as entryEl
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
            genBirthRel?.addEventListener("change", () => {
              person.gen =
                GlobalModel.fluxGen(
                  genElement as entryEl,
                  (genElement as entryEl)?.value ?? null,
                  genBirthRel as entryEl,
                  genTrans as entryEl,
                  genFisAlin as entryEl
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
            genTrans?.addEventListener("change", () => {
              person.gen =
                GlobalModel.fluxGen(
                  genElement as entryEl,
                  (genElement as entryEl)?.value ?? null,
                  genBirthRel as entryEl,
                  genTrans as entryEl,
                  genFisAlin as entryEl
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
            genFisAlin?.addEventListener("change", () => {
              person.gen =
                GlobalModel.fluxGen(
                  genElement as entryEl,
                  (genElement as entryEl)?.value ?? null,
                  genBirthRel as entryEl,
                  genTrans as entryEl,
                  genFisAlin as entryEl
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
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

          if (textBodytype && textBodytype instanceof HTMLSelectElement) {
            textBodytype.addEventListener("change", () => {
              EdFisNutModel.changeTabDCutLayout(protocolo, tabDC);
              person.gen = textBodytype.value;
              if (
                (genBirthRel as entryEl).value === "cis" &&
                ((genElement as entryEl).value === "masculino" ||
                  (genElement as entryEl).value === "feminino")
              ) {
                (genElement as entryEl).value = textBodytype.value;
              }
              console.log("gen value " + person.gen);
              let slicedError = "";
              switch (textBodytype.value) {
                case "masculino":
                  (genFisAlin as entryEl).value = "masculinizado";
                  break;
                case "feminino":
                  (genFisAlin as entryEl).value = "feminilizado";
                  break;
                case "neutro":
                  (genFisAlin as entryEl).value = "neutro";
                  break;
                default:
                  slicedError =
                    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                    "";
                  ErrorHandler.stringError(
                    "verificando textBodytype.value",
                    textBodytype?.value ?? "null",
                    slicedError ?? "NULL"
                  );
              }
            });
          } else {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementNotFound(
              protocolo ?? null,
              "protocolo",
              slicedError ?? "NULL"
            );
          }

          //obtenção de .age inicial com listener para input e atualização correspondente
          if (
            ageElement instanceof HTMLInputElement &&
            ageElement.type === "number"
          ) {
            person.age = parseFloat(ageElement?.value) || 0;
            if (typeof person.age === "number") {
              ageElement.addEventListener("input", () => {
                person.age = EdFisNutHandler.validateEvResultNum(
                  ageElement,
                  person.age
                );
                //sem autofill, dá update somente em person.age
                if (isAutoFillActive) {
                  arrayPGC = EdFisNutHandler.updatePGC(
                    person as formClassPerson,
                    numCons,
                    "cons",
                    consTablesFs as HTMLElement
                  );
                  [PGC, targInpSumDCut, targInpPGC] = arrayPGC;
                  person.sumDCut = EdFisNutHandler.matchPersonPropertiesDC(
                    person,
                    targInpSumDCut
                  );
                  arrayTargInps = EdFisNutHandler.defineTargInps(
                    numCons,
                    "cons",
                    consTablesFs as HTMLElement
                  );
                  [
                    targInpWeight,
                    targInpHeight,
                    targInpIMC,
                    targInpMLG,
                    targInpTMB,
                    targInpGET,
                  ] = arrayTargInps;
                  arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                    person,
                    targInpWeight,
                    targInpHeight
                  );
                  [person.weight, person.height] = arrayWH;
                  console.log("weight capturado " + person.weight);
                  console.log("height capturado " + person.height);
                  indexesArray = EdFisNutHandler.updateIndexesContexts(
                    person as formClassPerson,
                    gordCorpLvl,
                    targInpIMC as entryEl,
                    targInpMLG as entryEl,
                    targInpTMB as entryEl,
                    targInpGET as entryEl,
                    formTMBTypeElement as entryEl,
                    factorAtvLvl,
                    factorAtleta
                  );
                  [IMC, MLG, TMB, GET] = indexesArray;
                }
              });
            } else {
              const slicedError =
                new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
              ErrorHandler.typeError(
                "person.age",
                person?.age ?? null,
                "number",
                slicedError ?? "NULL"
              );
            }
          } else {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              ageElement ?? null,
              "ageElement",
              slicedError ?? "NULL"
            );
          }

          //obtenção de .weight inicial com listener para input e atualização correspondente
          if (
            targInpWeight instanceof HTMLInputElement &&
            targInpWeight.type === "number"
          ) {
            person.weight = parseInt(targInpWeight.value || "0", 10);
            if (typeof person.weight === "number") {
              if (weightInps.length > 0) {
                weightInps.forEach((weightInp) => {
                  weightInp.addEventListener("input", () => {
                    person.weight = EdFisNutHandler.validateEvResultNum(
                      weightInp,
                      person.weight
                    );
                    if (isAutoFillActive) {
                      numCol = EdFisNutHandler.getNumCol(weightInp) ?? 0;
                      if (typeof numCol === "number" && numCol > 0) {
                        arrayTargInps = EdFisNutHandler.defineTargInps(
                          numCol,
                          "tab",
                          consTablesFs as HTMLElement
                        );
                        [
                          targInpWeight,
                          targInpHeight,
                          targInpIMC,
                          targInpMLG,
                          targInpTMB,
                          targInpGET,
                        ] = arrayTargInps;
                        arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                          person,
                          targInpWeight,
                          targInpHeight
                        );
                        person.height = arrayWH[1];
                        console.log("weight capturado " + person.weight);
                        console.log("height capturado " + person.height);
                        indexesArray = EdFisNutHandler.updateIndexesContexts(
                          person as formClassPerson,
                          gordCorpLvl,
                          targInpIMC as entryEl,
                          targInpMLG as entryEl,
                          targInpTMB as entryEl,
                          targInpGET as entryEl,
                          formTMBTypeElement as entryEl,
                          factorAtvLvl,
                          factorAtleta
                        );
                        [IMC, MLG, TMB, GET] = indexesArray;
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.typeError(
                          "obtendo Número de Coluna",
                          numCol ?? null,
                          "number (natural)",
                          slicedError ?? "NULL"
                        );
                      }
                    }
                  });
                });
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.elementNotPopulated(
                  weightInps,
                  "weightInps",
                  slicedError ?? "NULL"
                );
              }
            } else {
              const slicedError =
                new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
              ErrorHandler.typeError(
                "person.weight",
                person.weight,
                "number",
                slicedError ?? "NULL"
              );
            }
          } else {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpWeight ?? null,
              "targInpWeight",
              slicedError ?? "NULL"
            );
          }

          //obtenção de .height inicial com listener para input e atualização correspondente
          if (
            targInpHeight instanceof HTMLInputElement &&
            targInpHeight.type === "number"
          ) {
            person.height = parseInt(targInpHeight.value || "0", 10);
            if (typeof person.height === "number") {
              if (heightInps.length > 0) {
                heightInps.forEach((heightInp) => {
                  heightInp.addEventListener("input", () => {
                    person.height = EdFisNutHandler.validateEvResultNum(
                      heightInp,
                      person.height
                    );
                    //sem autofill, dá update somente em person.height
                    if (isAutoFillActive) {
                      console.log("weight capturado " + person.weight);
                      console.log("height capturado " + person.height);
                      numCol = EdFisNutHandler.getNumCol(heightInp) ?? 0;
                      if (typeof numCol === "number" && numCol > 0) {
                        arrayTargInps = EdFisNutHandler.defineTargInps(
                          numCol,
                          "tab",
                          consTablesFs as HTMLElement
                        );
                        [
                          targInpHeight,
                          targInpHeight,
                          targInpIMC,
                          targInpMLG,
                          targInpTMB,
                          targInpGET,
                        ] = arrayTargInps;
                        arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                          person,
                          targInpWeight,
                          targInpHeight
                        );
                        person.weight = arrayWH[0];
                        console.log("weight capturado " + person.weight);
                        console.log("height capturado " + person.height);
                        indexesArray = EdFisNutHandler.updateIndexesContexts(
                          person as formClassPerson,
                          gordCorpLvl,
                          targInpIMC as entryEl,
                          targInpMLG as entryEl,
                          targInpTMB as entryEl,
                          targInpGET as entryEl,
                          formTMBTypeElement as entryEl,
                          factorAtvLvl,
                          factorAtleta
                        );
                        [IMC, MLG, TMB, GET] = indexesArray;
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.typeError(
                          "obtendo Número de Coluna",
                          numCol ?? null,
                          "number (natural)",
                          slicedError ?? "NULL"
                        );
                      }
                    }
                  });
                });
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.elementNotPopulated(
                  heightInps,
                  "heightInps",
                  slicedError ?? "NULL"
                );
              }
            } else {
              const slicedError =
                new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
              ErrorHandler.typeError(
                "person.height",
                person.height,
                "number",
                slicedError ?? "NULL"
              );
            }
          } else {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpHeight ?? null,
              "targInpHeight",
              slicedError ?? "NULL"
            );
          }

          //obtenção de .sumDCut inicial com listener para input e atualização correspondente
          if (
            targInpSumDCut instanceof HTMLInputElement &&
            targInpSumDCut.type === "number"
          ) {
            person.sumDCut = parseInt(targInpSumDCut.value || "0.01", 10);
            if (sumDCInps.length > 0) {
              sumDCInps.forEach((sumDCInp) => {
                sumDCInp.addEventListener("input", () => {
                  person.sumDCut = EdFisNutHandler.validateEvResultNum(
                    sumDCInp,
                    person.sumDCut
                  );
                  if (isAutoFillActive) {
                    numCol = EdFisNutHandler.getNumCol(sumDCInp) ?? 0;
                    if (typeof numCol === "number" && numCol > 0) {
                      if (isAutoFillActive) {
                        arrayPGC = EdFisNutHandler.updatePGC(
                          person as formClassPerson,
                          numCol,
                          "tab",
                          consTablesFs as HTMLElement
                        );
                        [PGC, targInpSumDCut, targInpPGC] = arrayPGC;
                      }
                    } else {
                      const slicedError =
                        new Error().stack
                          ?.split("\n")[1]
                          ?.trim()
                          ?.slice(-7, -1) || "";
                      ErrorHandler.typeError(
                        "obtendo Número de Coluna",
                        numCol ?? null,
                        "number (natural)",
                        slicedError ?? "NULL"
                      );
                    }
                  }
                });
              });
            } else {
              const slicedError =
                new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
              ErrorHandler.elementNotPopulated(
                sumDCInps ?? null,
                "sumDCInps",
                slicedError ?? "NULL"
              );
            }
          } else {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.inputNotFound(
              targInpSumDCut ?? null,
              "targInpSumDCut",
              slicedError ?? "NULL"
            );
          }

          //classifica person
          if (person && Object.keys(person).length === 6) {
            person = GlobalModel.generatePersonInstance(person);
            console.log(
              `PERSON INICIAL INSTANCIADA ${JSON.stringify(
                person
              )} + instance ${
                Object.prototype.toString.call(person).slice(8, -1) ?? "null"
              }`
            );
          } else {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.objectError(
              "a geração de instância",
              person ?? null,
              "person",
              "6",
              slicedError ?? "NULL"
            );
          }

          //adiciona listeneres nos botões e inputs de índices tabelados se person for classificada
          if (
            (person instanceof Man ||
              person instanceof Woman ||
              person instanceof Neutro) &&
            gordCorpLvl instanceof HTMLSelectElement
          ) {
            isPersonClassified = true;

            if (autoFillBtn instanceof HTMLButtonElement) {
              autoFillBtn.addEventListener("click", () => {
                isAutoFillActive = EdFisNutHandler.switchAutoFill(
                  autoFillBtn,
                  locksTabInd
                );
              });
            } else {
              const slicedError =
                new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
              ErrorHandler.elementNotFound(
                autoFillBtn ?? null,
                "autoFillBtn",
                slicedError ?? "NULL"
              );
            }

            //obtenção de .atvLvl inicial, com adição de listeners para mudança de containers no contexto
            if (
              atvLvlElement instanceof HTMLSelectElement &&
              formTMBTypeElement instanceof HTMLSelectElement &&
              spanFactorAtleta instanceof HTMLSpanElement &&
              lockGordCorpLvl instanceof HTMLSpanElement
            ) {
              person.atvLvl = atvLvlElement?.value;
              if (
                (person.atvLvl === "sedentario" ||
                  person.atvLvl === "leve" ||
                  person.atvLvl === "moderado" ||
                  person.atvLvl === "intenso" ||
                  person.atvLvl === "muitoIntenso") &&
                atvLvlElement instanceof HTMLSelectElement &&
                nafType instanceof HTMLSelectElement
              ) {
                factorAtvLvl = 1.4;

                //blocos para adição de listeners com fluxo de chamada similar
                atvLvlElement.addEventListener("change", () => {
                  //ajusta par atvLevelElement e nafType + dá update em .atLvl
                  person.atvLvl = EdFisNutHandler.updateAtvLvl(
                    atvLvlElement,
                    person.atvLvl,
                    nafType
                  );
                  //retorna factorAtvLvl(número para ser utilizado, com base no .atvLvl)
                  const returnedFactorAtvLvl = (
                    person as formClassPerson
                  ).checkAtvLvl(person as formClassPerson);
                  if (typeof returnedFactorAtvLvl === "number") {
                    factorAtvLvl = returnedFactorAtvLvl || 1.4;
                  } else {
                    const slicedError =
                      new Error().stack
                        ?.split("\n")[1]
                        ?.trim()
                        ?.slice(-7, -1) || "";
                    ErrorHandler.typeError(
                      "returnedFactorAtvLvl",
                      returnedFactorAtvLvl ?? null,
                      "number",
                      slicedError ?? "NULL"
                    );
                  }
                  //ajusta elementos <select> com base em combinações
                  EdFisNutHandler.fluxFormIMC(
                    IMC ?? 0,
                    formTMBTypeElement,
                    gordCorpLvl
                  );
                  EdFisNutHandler.matchTMBElements(
                    atvLvlElement,
                    formTMBTypeElement,
                    spanFactorAtleta,
                    gordCorpLvl,
                    lockGordCorpLvl,
                    IMC ?? 0
                  );
                });

                nafType.addEventListener("change", () => {
                  person.atvLvl = EdFisNutHandler.updateAtvLvl(
                    nafType,
                    person.atvLvl,
                    atvLvlElement
                  );

                  const returnedFactorAtvLvl = (
                    person as formClassPerson
                  ).checkAtvLvl(person as formClassPerson);
                  if (typeof returnedFactorAtvLvl === "number") {
                    factorAtvLvl = returnedFactorAtvLvl || 1.4;
                  } else {
                    const slicedError =
                      new Error().stack
                        ?.split("\n")[1]
                        ?.trim()
                        ?.slice(-7, -1) || "";
                    ErrorHandler.typeError(
                      "returnedFactorAtvLvl",
                      returnedFactorAtvLvl ?? null,
                      "number",
                      slicedError ?? "NULL"
                    );
                  }

                  EdFisNutHandler.matchTMBElements(
                    nafType,
                    formTMBTypeElement,
                    spanFactorAtleta,
                    gordCorpLvl,
                    lockGordCorpLvl,
                    IMC ?? 0
                  );
                });

                if (formTMBTypeElement instanceof HTMLSelectElement) {
                  formTMBTypeElement.addEventListener("change", () => {
                    person.atvLvl = EdFisNutHandler.updateAtvLvl(
                      atvLvlElement,
                      person.atvLvl,
                      nafType
                    );
                    const returnedFactorAtvLvl = (
                      person as formClassPerson
                    ).checkAtvLvl(person as formClassPerson);
                    if (typeof returnedFactorAtvLvl === "number") {
                      factorAtvLvl = returnedFactorAtvLvl || 1.4;
                    } else {
                      const slicedError =
                        new Error().stack
                          ?.split("\n")[1]
                          ?.trim()
                          ?.slice(-7, -1) || "";
                      ErrorHandler.typeError(
                        "returnedFactorAtvLvl",
                        returnedFactorAtvLvl || undefined,
                        "number",
                        slicedError ?? "NULL"
                      );
                    }
                    EdFisNutHandler.matchTMBElements(
                      atvLvlElement,
                      formTMBTypeElement,
                      spanFactorAtleta,
                      gordCorpLvl,
                      lockGordCorpLvl,
                      IMC ?? 0
                    );
                  });
                } else {
                  const slicedError =
                    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                    "";
                  ErrorHandler.elementNotFound(
                    formTMBTypeElement ?? null,
                    "formTMBTypeElement",
                    slicedError ?? "NULL"
                  );
                }

                if (gordCorpLvl instanceof HTMLSelectElement) {
                  gordCorpLvl.addEventListener("change", () => {
                    person.atvLvl = EdFisNutHandler.updateAtvLvl(
                      atvLvlElement,
                      person.atvLvl,
                      nafType
                    );
                    const returnedFactorAtvLvl = (
                      person as formClassPerson
                    ).checkAtvLvl(person as formClassPerson);
                    if (typeof returnedFactorAtvLvl === "number") {
                      factorAtvLvl = returnedFactorAtvLvl || 1.4;
                    } else {
                      const slicedError =
                        new Error().stack
                          ?.split("\n")[1]
                          ?.trim()
                          ?.slice(-7, -1) || "";
                      ErrorHandler.typeError(
                        "returnedFactorAtvLvl",
                        returnedFactorAtvLvl ?? null,
                        "number",
                        slicedError ?? "NULL"
                      );
                    }
                    EdFisNutHandler.matchTMBElements(
                      atvLvlElement,
                      formTMBTypeElement,
                      spanFactorAtleta,
                      gordCorpLvl,
                      lockGordCorpLvl,
                      IMC ?? 0
                    );
                  });
                } else {
                  const slicedError =
                    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                    "";
                  ErrorHandler.elementNotFound(
                    gordCorpLvl ?? null,
                    "gordCorpLvl",
                    slicedError ?? "NULL"
                  );
                }

                if (selFactorAtleta instanceof HTMLSelectElement) {
                  selFactorAtleta.addEventListener("change", () => {
                    factorAtleta = selFactorAtleta.value;
                    //sem autofill, dá update somente em factorAtleta
                    if (isAutoFillActive) {
                      arrayPGC = EdFisNutHandler.updatePGC(
                        person as formClassPerson,
                        numCons,
                        "cons",
                        consTablesFs as HTMLElement
                      );
                      [PGC, targInpSumDCut, targInpPGC] = arrayPGC;
                      person.sumDCut = EdFisNutHandler.matchPersonPropertiesDC(
                        person,
                        targInpSumDCut
                      );
                      arrayTargInps = EdFisNutHandler.defineTargInps(
                        numCons,
                        "cons",
                        consTablesFs as HTMLElement
                      );
                      [
                        targInpWeight,
                        targInpHeight,
                        targInpIMC,
                        targInpMLG,
                        targInpTMB,
                        targInpGET,
                      ] = arrayTargInps;
                      arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                        person,
                        targInpWeight,
                        targInpHeight
                      );
                      [person.weight, person.height] = arrayWH;
                      console.log("weight capturado " + person.weight);
                      console.log("height capturado " + person.height);
                      indexesArray = EdFisNutHandler.updateIndexesContexts(
                        person as formClassPerson,
                        gordCorpLvl,
                        targInpIMC as entryEl,
                        targInpMLG as entryEl,
                        targInpTMB as entryEl,
                        targInpGET as entryEl,
                        formTMBTypeElement as entryEl,
                        factorAtvLvl,
                        factorAtleta
                      );
                      [IMC, MLG, TMB, GET] = indexesArray;
                    }
                  });
                } else {
                  const slicedError =
                    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                    "";
                  ErrorHandler.elementNotFound(
                    selFactorAtleta ?? null,
                    "selFactorAtleta",
                    slicedError ?? "NULL"
                  );
                }
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.multipleElementsNotFound(
                  slicedError ?? "NULL",
                  `value de Nível de Atividade Física ou Elementos relacionados. Valor obtido: ${
                    person.atvLvl ?? "null"
                  };
                    Valore aceitos: sedentario || leve || moderado || intenso || muitoIntenso.`,
                  atvLvlElement ?? null,
                  nafType ?? null
                );
              }
            } else {
              const slicedError =
                new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
              ErrorHandler.multipleElementsNotFound(
                slicedError ?? "NULL",
                `Erro validando Elemento de Nível de Atividade Física e/ou Relacionados`,
                atvLvlElement ?? null,
                formTMBTypeElement ?? null,
                spanFactorAtleta ?? null,
                lockGordCorpLvl ?? null
              );
            }

            //atualiza layout de tabela de acordo com protocolo e gênero + soma de Dobras Cutâneas
            if (protocolo && protocolo instanceof HTMLSelectElement) {
              protocolo.addEventListener("change", () => {
                protocolo.value = EdFisNutModel.changeTabDCutLayout(
                  protocolo,
                  tabDC
                );
              });
              //adiciona listeners para os botões de soma das Dobras Cutâneas
              if (sumDCBtns.length > 0) {
                sumDCBtns.forEach((sumDCBtn) => {
                  sumDCBtn?.addEventListener("click", () => {
                    if (
                      rowsDCArray.length > 0 &&
                      sumDCBtn instanceof HTMLButtonElement
                    ) {
                      person.sumDCut = EdFisNutHandler.createArraysRels(
                        sumDCBtn?.id,
                        rowsDCArray as HTMLTableRowElement[],
                        protocolo.value
                      );

                      if (
                        !(typeof person.sumDCut === "number") ||
                        Number.isNaN(person.sumDCut) ||
                        person.sumDCut <= 0
                      ) {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.typeError(
                          "person.sumDCut",
                          person.sumDCut,
                          "number",
                          slicedError ?? "NULL"
                        );
                      }
                      if (isAutoFillActive) {
                        if (
                          isPersonClassified &&
                          targInpPGC instanceof HTMLInputElement &&
                          protocolo.value === "pollock3" &&
                          person.age >= 0
                        ) {
                          numCol = EdFisNutHandler.getNumCol(sumDCBtn) ?? 0;
                          if (typeof numCol === "number" && numCol > 0) {
                            arrayPGC = EdFisNutHandler.updatePGC(
                              person as formClassPerson,
                              numCol,
                              "tab",
                              consTablesFs as HTMLElement
                            );
                          } else {
                            const slicedError =
                              new Error().stack
                                ?.split("\n")[1]
                                ?.trim()
                                ?.slice(-7, -1) || "";
                            ErrorHandler.typeError(
                              "obtendo Número de Coluna",
                              numCol ?? null,
                              "number (natural)",
                              slicedError ?? "NULL"
                            );
                          }
                        } else {
                          console.warn(`Erro atualizando PGC através de Somatório de DCs.
                          person.age obtido: ${person?.age || 0}
                          Protocolo usado: ${
                            protocolo?.value || "null"
                          } (Apenas pollock3 aceito, por enquanto);
                          isPersonClassified: ${isPersonClassified ?? false};
                          Instância de Input Target para PGC: ${
                            Object.prototype.toString
                              .call(targInpPGC)
                              .slice(8, -1) ?? "null"
                          }`);
                        }
                      }
                    } else {
                      const slicedError =
                        new Error().stack
                          ?.split("\n")[1]
                          ?.trim()
                          ?.slice(-7, -1) || "";
                      ErrorHandler.elementWithArrayError(
                        "rows de Dobras Cutâneas e/ou Botão de Soma de Dobras Cutâneas",
                        rowsDCArray ?? null,
                        "rowsDCArray",
                        sumDCBtn ?? null,
                        "sumDCBtn",
                        slicedError ?? "NULL"
                      );
                    }
                  });
                });
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.elementNotPopulated(
                  sumDCBtns ?? null,
                  "sumDCBtns",
                  slicedError ?? "NULL"
                );
              }
            } else {
              const slicedError =
                new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
              ErrorHandler.elementNotFound(
                protocolo ?? null,
                "protocolo",
                slicedError ?? "NULL"
              );
            }

            //adições de listeners para clique nos botões dos índices
            if (
              targInpIMC instanceof HTMLInputElement &&
              targInpIMC.type === "number" &&
              targInpMLG instanceof HTMLInputElement &&
              targInpMLG.type === "number" &&
              targInpTMB instanceof HTMLInputElement &&
              targInpTMB.type === "number" &&
              targInpGET instanceof HTMLInputElement &&
              targInpGET.type === "number" &&
              formTMBTypeElement instanceof HTMLSelectElement
            ) {
              IMC = parseFloat(parseFloat(targInpIMC?.value || "0").toFixed(4));
              MLG = parseFloat(parseFloat(targInpMLG?.value || "0").toFixed(4));
              TMB = parseFloat(parseFloat(targInpTMB?.value || "0").toFixed(4));
              GET = parseFloat(parseFloat(targInpGET?.value || "0").toFixed(4));
              //botões são independentes de condição de autofill
              if (IMCBtns.length > 0) {
                IMCBtns.forEach((imcbtn) => {
                  if (imcbtn instanceof HTMLButtonElement) {
                    imcbtn.addEventListener("click", () => {
                      numCol = EdFisNutHandler.getNumCol(imcbtn) ?? 0;
                      if (typeof numCol === "number" && numCol > 0) {
                        arrayTargInps = EdFisNutHandler.defineTargInps(
                          numCol,
                          "tab",
                          consTablesFs as HTMLElement
                        );
                        [
                          targInpWeight,
                          targInpHeight,
                          targInpIMC,
                          targInpMLG,
                          targInpTMB,
                          targInpGET,
                        ] = arrayTargInps;
                        arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                          person,
                          targInpWeight,
                          targInpHeight
                        );
                        [person.weight, person.height] = arrayWH;
                        console.log("weight capturado " + person.weight);
                        console.log("height capturado " + person.height);
                        indexesArray = EdFisNutHandler.updateIndexesContexts(
                          person as formClassPerson,
                          gordCorpLvl,
                          targInpIMC as entryEl,
                          targInpMLG as entryEl,
                          targInpTMB as entryEl,
                          targInpGET as entryEl,
                          formTMBTypeElement as entryEl,
                          factorAtvLvl,
                          factorAtleta
                        );
                        [IMC, MLG, TMB, GET] = indexesArray;
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.typeError(
                          "obtendo Número de Coluna",
                          numCol ?? null,
                          "number (natural)",
                          slicedError ?? "NULL"
                        );
                      }
                    });
                  } else {
                    const slicedError =
                      new Error().stack
                        ?.split("\n")[1]
                        ?.trim()
                        ?.slice(-7, -1) || "";
                    ErrorHandler.elementNotFound(
                      imcbtn ?? null,
                      "imcbtn",
                      slicedError ?? "NULL"
                    );
                  }
                });
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.elementNotPopulated(
                  IMCBtns ?? null,
                  "IMCBtns",
                  slicedError ?? "NULL"
                );
              }

              if (MLGBtns.length > 0) {
                MLGBtns.forEach((mlgbtn) => {
                  if (mlgbtn instanceof HTMLButtonElement) {
                    mlgbtn.addEventListener("click", () => {
                      numCol = EdFisNutHandler.getNumCol(mlgbtn) ?? 0;
                      if (typeof numCol === "number" && numCol > 0) {
                        arrayTargInps = EdFisNutHandler.defineTargInps(
                          numCol,
                          "tab",
                          consTablesFs as HTMLElement
                        );
                        [
                          targInpWeight,
                          targInpHeight,
                          targInpIMC,
                          targInpMLG,
                          targInpTMB,
                          targInpGET,
                        ] = arrayTargInps;
                        arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                          person,
                          targInpWeight,
                          targInpHeight
                        );
                        [person.weight, person.height] = arrayWH;
                        console.log("weight capturado " + person.weight);
                        console.log("height capturado " + person.height);
                        indexesArray = EdFisNutHandler.updateIndexesContexts(
                          person as formClassPerson,
                          gordCorpLvl,
                          targInpIMC as entryEl,
                          targInpMLG as entryEl,
                          targInpTMB as entryEl,
                          targInpGET as entryEl,
                          formTMBTypeElement as entryEl,
                          factorAtvLvl,
                          factorAtleta
                        );
                        [IMC, MLG, TMB, GET] = indexesArray;
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.typeError(
                          "obtendo Número de Coluna",
                          numCol ?? null,
                          "number (natural)",
                          slicedError ?? "NULL"
                        );
                      }
                    });
                  } else {
                    const slicedError =
                      new Error().stack
                        ?.split("\n")[1]
                        ?.trim()
                        ?.slice(-7, -1) || "";
                    ErrorHandler.elementNotFound(
                      mlgbtn ?? null,
                      "mlgbtn",
                      slicedError ?? "NULL"
                    );
                  }
                });
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.elementNotPopulated(
                  MLGBtns ?? null,
                  "MLGBtns",
                  slicedError ?? "NULL"
                );
              }

              if (PGCBtns.length > 0) {
                PGCBtns.forEach((pgcbtn) => {
                  if (pgcbtn instanceof HTMLButtonElement) {
                    pgcbtn.addEventListener("click", () => {
                      numCol = EdFisNutHandler.getNumCol(pgcbtn) ?? 0;
                      if (typeof numCol === "number" && numCol > 0) {
                        arrayPGC = EdFisNutHandler.updatePGC(
                          person as formClassPerson,
                          numCol,
                          "tab",
                          consTablesFs as HTMLElement
                        );
                        [PGC, targInpSumDCut, targInpPGC] = arrayPGC;
                        person.sumDCut =
                          EdFisNutHandler.matchPersonPropertiesDC(
                            person,
                            targInpSumDCut
                          );
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.typeError(
                          "obtendo Número de Coluna",
                          numCol ?? null,
                          "number (natural)",
                          slicedError ?? "NULL"
                        );
                      }
                    });
                  } else {
                    const slicedError =
                      new Error().stack
                        ?.split("\n")[1]
                        ?.trim()
                        ?.slice(-7, -1) || "";
                    ErrorHandler.elementNotFound(
                      pgcbtn ?? null,
                      "pgcbtn",
                      slicedError ?? "NULL"
                    );
                  }
                });
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.elementNotPopulated(
                  PGCBtns ?? null,
                  "PGCBtns",
                  slicedError ?? "NULL"
                );
              }

              if (TMBBtns.length > 0) {
                TMBBtns.forEach((tmbbtn) => {
                  tmbbtn.addEventListener("click", () => {
                    if (tmbbtn instanceof HTMLButtonElement) {
                      console.log("ID " + tmbbtn.id);
                      numCol = EdFisNutHandler.getNumCol(tmbbtn) ?? 0;
                      if (typeof numCol === "number" && numCol > 0) {
                        arrayTargInps = EdFisNutHandler.defineTargInps(
                          numCol,
                          "tab",
                          consTablesFs as HTMLElement
                        );
                        [
                          targInpWeight,
                          targInpHeight,
                          targInpIMC,
                          targInpMLG,
                          targInpTMB,
                          targInpGET,
                        ] = arrayTargInps;
                        arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                          person,
                          targInpWeight,
                          targInpHeight
                        );
                        [person.weight, person.height] = arrayWH;
                        console.log("weight capturado " + person.weight);
                        console.log("height capturado " + person.height);
                        indexesArray = EdFisNutHandler.updateIndexesContexts(
                          person as formClassPerson,
                          gordCorpLvl,
                          targInpIMC as entryEl,
                          targInpMLG as entryEl,
                          targInpTMB as entryEl,
                          targInpGET as entryEl,
                          formTMBTypeElement as entryEl,
                          factorAtvLvl,
                          factorAtleta
                        );
                        [IMC, MLG, TMB, GET] = indexesArray;
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.typeError(
                          "obtendo Número de Coluna",
                          numCol ?? null,
                          "number (natural)",
                          slicedError ?? "NULL"
                        );
                      }
                    } else {
                      const slicedError =
                        new Error().stack
                          ?.split("\n")[1]
                          ?.trim()
                          ?.slice(-7, -1) || "";
                      ErrorHandler.elementNotFound(
                        tmbbtn ?? null,
                        "tmbbtn",
                        slicedError ?? "NULL"
                      );
                    }
                  });
                });
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.elementNotPopulated(
                  TMBBtns ?? null,
                  "TMBBtns",
                  slicedError ?? "NULL"
                );
              }

              if (GETBtns.length > 0) {
                GETBtns.forEach((getbtn) => {
                  getbtn.addEventListener("click", () => {
                    if (getbtn instanceof HTMLButtonElement) {
                      numCol = EdFisNutHandler.getNumCol(getbtn) ?? 0;
                      if (typeof numCol === "number" && numCol > 0) {
                        arrayTargInps = EdFisNutHandler.defineTargInps(
                          numCol,
                          "tab",
                          consTablesFs as HTMLElement
                        );
                        [
                          targInpWeight,
                          targInpHeight,
                          targInpIMC,
                          targInpMLG,
                          targInpTMB,
                          targInpGET,
                        ] = arrayTargInps;
                        arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                          person,
                          targInpWeight,
                          targInpHeight
                        );
                        [person.weight, person.height] = arrayWH;
                        console.log("weight capturado " + person.weight);
                        console.log("height capturado " + person.height);
                        indexesArray = EdFisNutHandler.updateIndexesContexts(
                          person as formClassPerson,
                          gordCorpLvl,
                          targInpIMC as entryEl,
                          targInpMLG as entryEl,
                          targInpTMB as entryEl,
                          targInpGET as entryEl,
                          formTMBTypeElement as entryEl,
                          factorAtvLvl,
                          factorAtleta
                        );
                        [IMC, MLG, TMB, GET] = indexesArray;
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.typeError(
                          "obtendo Número de Coluna",
                          numCol ?? null,
                          "number (natural)",
                          slicedError ?? "NULL"
                        );
                      }
                    } else {
                      const slicedError =
                        new Error().stack
                          ?.split("\n")[1]
                          ?.trim()
                          ?.slice(-7, -1) || "";
                      ErrorHandler.elementNotFound(
                        getbtn ?? null,
                        "getbtn",
                        slicedError ?? "NULL"
                      );
                    }
                  });
                });
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.elementNotPopulated(
                  GETBtns ?? null,
                  "GETBtns",
                  slicedError ?? "NULL"
                );
              }

              //adições de listeners para inputs dos índices
              if (typeof IMC === "number") {
                if (IMCInps.length > 0) {
                  IMCInps.forEach((IMCInp) => {
                    IMCInp.addEventListener("input", () => {
                      if (IMCInp instanceof HTMLInputElement) {
                        const returnedIMC =
                          GlobalHandler.updateSimpleProperty(targInpIMC) ?? 0;
                        if (typeof returnedIMC === "number") {
                          IMC = parseFloat(returnedIMC.toFixed(4));
                        } else {
                          const slicedError =
                            new Error().stack
                              ?.split("\n")[1]
                              ?.trim()
                              ?.slice(-7, -1) || "";
                          ErrorHandler.typeError(
                            "update de IMC",
                            returnedIMC ?? null,
                            "number",
                            slicedError ?? "NULL"
                          );
                        }
                        //sem autofill, dá update somente em IMC
                        if (isAutoFillActive) {
                          numCol = EdFisNutHandler.getNumCol(IMCInp) ?? 0;
                          if (typeof numCol === "number" && numCol > 0) {
                            arrayTargInps = EdFisNutHandler.defineTargInps(
                              numCol,
                              "tab",
                              consTablesFs as HTMLElement
                            );
                            [
                              targInpWeight,
                              targInpHeight,
                              targInpIMC,
                              targInpMLG,
                              targInpTMB,
                              targInpGET,
                            ] = arrayTargInps;
                            arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                              person,
                              targInpWeight,
                              targInpHeight
                            );
                            [person.weight, person.height] = arrayWH;
                            console.log("weight capturado " + person.weight);
                            console.log("height capturado " + person.height);
                            indexesArray =
                              EdFisNutHandler.updateIndexesContexts(
                                person as formClassPerson,
                                gordCorpLvl,
                                targInpIMC as entryEl,
                                targInpMLG as entryEl,
                                targInpTMB as entryEl,
                                targInpGET as entryEl,
                                formTMBTypeElement as entryEl,
                                factorAtvLvl,
                                factorAtleta
                              );
                            [IMC, MLG, TMB, GET] = indexesArray;
                          } else {
                            const slicedError =
                              new Error().stack
                                ?.split("\n")[1]
                                ?.trim()
                                ?.slice(-7, -1) || "";
                            ErrorHandler.typeError(
                              "obtendo Número de Coluna",
                              numCol ?? null,
                              "number (natural)",
                              slicedError ?? "NULL"
                            );
                          }
                        }
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.inputNotFound(
                          IMCInp?.id ?? null,
                          "IMCInp",
                          slicedError ?? "NULL"
                        );
                      }
                    });
                  });
                } else {
                  const slicedError =
                    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                    "";
                  ErrorHandler.elementNotPopulated(
                    IMCInps ?? null,
                    "IMCInps",
                    slicedError ?? "NULL"
                  );
                }
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.typeError(
                  "IMC",
                  IMC ?? null,
                  "number",
                  slicedError ?? "NULL"
                );
              }

              if (typeof MLG === "number") {
                if (MLGInps.length > 0) {
                  MLGInps.forEach((MLGInp) => {
                    MLGInp.addEventListener("input", () => {
                      const returnedMLG =
                        GlobalHandler.updateSimpleProperty(targInpMLG) ?? 0;
                      if (typeof returnedMLG === "number") {
                        MLG = parseFloat(returnedMLG.toFixed(4));
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.typeError(
                          "update de MLG",
                          returnedMLG ?? null,
                          "number",
                          slicedError ?? "NULL"
                        );
                      }
                      //sem autofill, dá update somente em MLG
                      if (isAutoFillActive) {
                        numCol = EdFisNutHandler.getNumCol(MLGInp) ?? 0;
                        if (typeof numCol === "number" && numCol > 0) {
                          arrayTargInps = EdFisNutHandler.defineTargInps(
                            numCol,
                            "tab",
                            consTablesFs as HTMLElement
                          );
                          [
                            targInpWeight,
                            targInpHeight,
                            targInpIMC,
                            targInpMLG,
                            targInpTMB,
                            targInpGET,
                          ] = arrayTargInps;
                          arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                            person,
                            targInpWeight,
                            targInpHeight
                          );
                          [person.weight, person.height] = arrayWH;
                          console.log("weight capturado " + person.weight);
                          console.log("height capturado " + person.height);
                          indexesArray = EdFisNutHandler.updateIndexesContexts(
                            person as formClassPerson,
                            gordCorpLvl,
                            targInpIMC as entryEl,
                            targInpMLG as entryEl,
                            targInpTMB as entryEl,
                            targInpGET as entryEl,
                            formTMBTypeElement as entryEl,
                            factorAtvLvl,
                            factorAtleta
                          );
                          [IMC, MLG, TMB, GET] = indexesArray;
                        } else {
                          const slicedError =
                            new Error().stack
                              ?.split("\n")[1]
                              ?.trim()
                              ?.slice(-7, -1) || "";
                          ErrorHandler.typeError(
                            "obtendo Número de Coluna",
                            numCol ?? null,
                            "number (natural)",
                            slicedError ?? "NULL"
                          );
                        }
                      }
                    });
                  });
                } else {
                  const slicedError =
                    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                    "";
                  ErrorHandler.elementNotPopulated(
                    MLGInps ?? null,
                    "MLGInps",
                    slicedError ?? "NULL"
                  );
                }
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.typeError(
                  "MLG",
                  MLG ?? null,
                  "number",
                  slicedError ?? "NULL"
                );
              }

              if (
                targInpPGC instanceof HTMLInputElement &&
                targInpPGC.type === "number"
              ) {
                PGC = parseFloat(
                  parseFloat(targInpPGC?.value || "0").toFixed(4)
                );
                if (typeof PGC === "number") {
                  if (PGCInps.length > 0) {
                    PGCInps.forEach((PGCInp) => {
                      if (PGCInp instanceof HTMLInputElement) {
                        PGCInp.addEventListener("input", () => {
                          const returnedPGC =
                            GlobalHandler.updateSimpleProperty(PGCInp) ?? 0;
                          if (typeof returnedPGC === "number") {
                            PGC = parseFloat(returnedPGC.toFixed(4));
                          } else {
                            const slicedError =
                              new Error().stack
                                ?.split("\n")[1]
                                ?.trim()
                                ?.slice(-7, -1) || "";
                            ErrorHandler.typeError(
                              "update de PGC",
                              returnedPGC ?? null,
                              "number",
                              slicedError ?? "NULL"
                            );
                          }
                        });
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.inputNotFound(
                          PGCInp?.id ?? null,
                          "PGCInp",
                          slicedError ?? "NULL"
                        );
                      }
                    });
                  } else {
                    const slicedError =
                      new Error().stack
                        ?.split("\n")[1]
                        ?.trim()
                        ?.slice(-7, -1) || "";
                    ErrorHandler.elementNotPopulated(
                      PGCInps ?? null,
                      "PGCInps",
                      slicedError ?? "NULL"
                    );
                  }
                } else {
                  const slicedError =
                    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                    "";
                  ErrorHandler.typeError(
                    "PGC",
                    PGC ?? null,
                    "number",
                    slicedError ?? "NULL"
                  );
                }
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.inputNotFound(
                  targInpPGC ?? null,
                  "targInpPGC",
                  slicedError ?? "NULL"
                );
              }

              if (typeof TMB === "number") {
                if (TMBInps.length > 0) {
                  TMBInps.forEach((TMBInp) => {
                    TMBInp.addEventListener("input", () => {
                      if (TMBInp instanceof HTMLInputElement) {
                        const returnedTMB =
                          GlobalHandler.updateSimpleProperty(targInpTMB) ?? 0;
                        if (typeof returnedTMB === "number") {
                          TMB = parseFloat(returnedTMB.toFixed(4));
                        } else {
                          const slicedError =
                            new Error().stack
                              ?.split("\n")[1]
                              ?.trim()
                              ?.slice(-7, -1) || "";
                          ErrorHandler.typeError(
                            "update de TMB",
                            returnedTMB ?? null,
                            "number",
                            slicedError ?? "NULL"
                          );
                        }
                        //sem autofill, dá update somente em TMB
                        if (isAutoFillActive) {
                          numCol = EdFisNutHandler.getNumCol(TMBInp) ?? 0;
                          if (typeof numCol === "number" && numCol > 0) {
                            arrayTargInps = EdFisNutHandler.defineTargInps(
                              numCol,
                              "tab",
                              consTablesFs as HTMLElement
                            );
                            [
                              targInpWeight,
                              targInpHeight,
                              targInpIMC,
                              targInpMLG,
                              targInpTMB,
                              targInpGET,
                            ] = arrayTargInps;
                            arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                              person,
                              targInpWeight,
                              targInpHeight
                            );
                            [person.weight, person.height] = arrayWH;
                            console.log("weight capturado " + person.weight);
                            console.log("height capturado " + person.height);
                            indexesArray =
                              EdFisNutHandler.updateIndexesContexts(
                                person as formClassPerson,
                                gordCorpLvl,
                                targInpIMC as entryEl,
                                targInpMLG as entryEl,
                                targInpTMB as entryEl,
                                targInpGET as entryEl,
                                formTMBTypeElement as entryEl,
                                factorAtvLvl,
                                factorAtleta
                              );
                            [IMC, MLG, TMB, GET] = indexesArray;
                          } else {
                            const slicedError =
                              new Error().stack
                                ?.split("\n")[1]
                                ?.trim()
                                ?.slice(-7, -1) || "";
                            ErrorHandler.typeError(
                              "obtendo Número de Coluna",
                              numCol ?? null,
                              "number (natural)",
                              slicedError ?? "NULL"
                            );
                          }
                        }
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.elementNotFound(
                          TMBInp?.id ?? null,
                          "TMBInp",
                          slicedError ?? "NULL"
                        );
                      }
                    });
                  });
                } else {
                  const slicedError =
                    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                    "";
                  ErrorHandler.elementNotPopulated(
                    TMBInps ?? null,
                    "TMBInps",
                    slicedError ?? "NULL"
                  );
                }
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.typeError(
                  "TMB",
                  TMB ?? null,
                  "number",
                  slicedError ?? "NULL"
                );
              }

              if (typeof GET === "number") {
                if (GETInps.length > 0) {
                  GETInps.forEach((GETInp) => {
                    GETInp.addEventListener("input", () => {
                      if (GETInp instanceof HTMLInputElement) {
                        const returnedGET =
                          GlobalHandler.updateSimpleProperty(targInpGET) ?? 0;
                        if (typeof returnedGET === "number") {
                          GET = parseFloat(returnedGET.toFixed(4));
                        } else {
                          const slicedError =
                            new Error().stack
                              ?.split("\n")[1]
                              ?.trim()
                              ?.slice(-7, -1) || "";
                          ErrorHandler.typeError(
                            "update de GET",
                            returnedGET ?? null,
                            "number",
                            slicedError ?? "NULL"
                          );
                        }
                        //sem autofill, dá update somente em GET
                        if (isAutoFillActive) {
                          numCol = EdFisNutHandler.getNumCol(GETInp) ?? 0;
                          if (typeof numCol === "number" && numCol > 0) {
                            arrayTargInps = EdFisNutHandler.defineTargInps(
                              numCol,
                              "tab",
                              consTablesFs as HTMLElement
                            );
                            [
                              targInpWeight,
                              targInpHeight,
                              targInpIMC,
                              targInpMLG,
                              targInpTMB,
                              targInpGET,
                            ] = arrayTargInps;
                            arrayWH = EdFisNutHandler.matchPersonPropertiesWH(
                              person,
                              targInpWeight,
                              targInpHeight
                            );
                            [person.weight, person.height] = arrayWH;
                            console.log("weight capturado " + person.weight);
                            console.log("height capturado " + person.height);
                            indexesArray =
                              EdFisNutHandler.updateIndexesContexts(
                                person as formClassPerson,
                                gordCorpLvl,
                                targInpIMC as entryEl,
                                targInpMLG as entryEl,
                                targInpTMB as entryEl,
                                targInpGET as entryEl,
                                formTMBTypeElement as entryEl,
                                factorAtvLvl,
                                factorAtleta
                              );
                            [IMC, MLG, TMB, GET] = indexesArray;
                          } else {
                            const slicedError =
                              new Error().stack
                                ?.split("\n")[1]
                                ?.trim()
                                ?.slice(-7, -1) || "";
                            ErrorHandler.typeError(
                              "obtendo Número de Coluna",
                              numCol ?? null,
                              "number (natural)",
                              slicedError ?? "NULL"
                            );
                          }
                        }
                      } else {
                        const slicedError =
                          new Error().stack
                            ?.split("\n")[1]
                            ?.trim()
                            ?.slice(-7, -1) || "";
                        ErrorHandler.inputNotFound(
                          GETInp?.id ?? null,
                          "GETInp",
                          slicedError ?? "NULL"
                        );
                      }
                    });
                  });
                } else {
                  const slicedError =
                    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                    "";
                  ErrorHandler.elementNotPopulated(
                    GETInps ?? null,
                    "GETInps",
                    slicedError
                  );
                }
              } else {
                const slicedError =
                  new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) ||
                  "";
                ErrorHandler.typeError(
                  "GET",
                  GET ?? null,
                  "number",
                  slicedError ?? "NULL"
                );
              }
            } else {
              const slicedError =
                new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
              ErrorHandler.multipleElementsNotFound(
                slicedError ?? "NULL",
                "Target Inputs e/ou Select para Fórmula de TMB",
                targInpIMC ?? null,
                targInpMLG ?? null,
                targInpTMB ?? null,
                targInpGET ?? null,
                formTMBTypeElement ?? null
              );
            }
          } else {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.elementWithObjectError(
              "validando person",
              person ?? null,
              gordCorpLvl ?? null,
              gordCorpLvl?.id ?? null,
              slicedError ?? "NULL"
            );
          }
        } else {
          console.warn(
            `Todos os campos de identidade de gênero validados: ${
              areAllGenContChecked.toString() ?? "false"
            }`
          );
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.multipleElementsNotFound(
            slicedError ?? "NULL",
            "Campos de Gênero e/ou Tipo Corporal e/ou Protocolo",
            protocolo ?? null,
            genElement ?? null,
            genTrans ?? null,
            genFisAlin ?? null,
            textBodytype ?? null
          );
        }
      }
    } else {
      console.warn(`Col Groups similares: ${areColGroupsSimilar}`);
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        numConsElement ?? null,
        "numConsElement",
        slicedError ?? "NULL"
      );
      ErrorHandler.elementNotFound(
        gordCorpLvl ?? null,
        "numConsElement",
        slicedError ?? "NULL"
      );
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.multipleElementsNotFound(
      slicedError ?? "NULL",
      "Tabelas de Medidas Antropométricas",
      tabSVi ?? null,
      tabMedAnt ?? null,
      tabIndPerc ?? null
    );
  }
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.multipleElementsNotFound(
    slicedError ?? "NULL",
    "Tabelas de Medidas",
    tabMedAnt ?? null,
    tabIndPerc ?? null
  );
}
