//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM

import * as Model from "./model.js";
import * as Handlers from "./handlers.js";
import { Man, Woman, Neutro } from "./classes.js";
import * as ErrorHandler from "./errorHandler.js";
//TODO PROTEÇÃO CONTRA LOOPS INFINITOS
//TODO ADICIONAR VERIFICAÇÕES EM CONTROLERS AG E ODONTO
//TODO ADICIONAR FUNÇÕES DE ERRORHANDLER EM MODEL, HANDLERS E CLASSES
//TODO INCLUIR ERRORHANDLER EM FILES .TS
//TODO BOTÕES DE IMC/MLG/PGC/TMB/GET PREENCHE COLUNA CERTA, MAS LÊ SEMPRE PRIMEIRA COLUNA (DEVERIA LER CORRESPONDENTE)
//TODO SUMDCUT SEMPRE PREENCHE COLUNA DO NÚMERO DE LEITURA (DEVERIA PREENCHER CORRESPONDENTE)

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
const locksTabInd = Array.from(document.getElementsByClassName("lockTabInd"));
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");

//inicialização de variáveis para validação e construção de pessoa tratada no formulário
let areAllGenContChecked = Model.checkAllGenConts(
  genElement,
  genBirthRel,
  genTrans,
  genFisAlin
);
let person = {
  gen: genElement?.value ?? "",
  age: parseFloat(ageElement?.value) ?? 0,
  sumDCInps: 0,
  weight: 0,
  height: 0,
  atvLvl: atvLvlElement?.value ?? "",
};

//inicialização de variáveis usadas no tabelamento, para alcance em escopo global
//variáveis e constantes obtidas através de queries nas tabelas são inicializadas em blocos, após validação das respectivas tabelas
let numCons = 1;
let numColsCons = 0;
let areColGroupsSimilar = false;
let areNumConsOpsValid = false;
let targInpWeight = null;
let targInpHeight = null;
let targInpSumDCut = null;
let targInpIMC = null;
let targInpMLG = null;
let targInpPGC = null;
let targInpTMB = null;
let targInpGET = null;
// let IMCMLGArray = ["", 0, 0];
let IMC = 0;
let MLG = 0;
let PGC = 0;
let TMB = 0;
let GET = 0;
let indexesArray = [0, 0, 0, 0];
let factorAtvLvl = 0;
let factorAtleta = "";
// let TMBArray = [];
let numConsLastOp = 0;
let isPersonClassified = false;
let isAutoFillActive = true;

if (selFactorAtleta instanceof HTMLSelectElement) {
  factorAtleta = selFactorAtleta.value;
} else {
  ErrorHandler.elementNotFound(selFactorAtleta ?? null, "selFactorAtleta");
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
        Model.autoCapitalizeInputs(input.target);
      } else {
        ErrorHandler.inputNotFound(input?.target ?? null, "textCont");
      }
    });
  });
} else {
  ErrorHandler.elementNotPopulated(textConts ?? null, "textConts");
}

if (numInps.length > 0) {
  numInps.forEach(function (numInp) {
    numInp.addEventListener("input", function (input) {
      if (
        input.target &&
        input.target instanceof HTMLInputElement &&
        input.target.type === "number"
      ) {
        Model.numberLimit(input.target);
      } else {
        ErrorHandler.inputNotFound(input?.target ?? null, "numInp");
      }
    });
  });
} else {
  ErrorHandler.elementNotPopulated(numInps ?? null, "numInps");
}

if (radioButtons.length > 0) {
  radioButtons.forEach((radio) => {
    if (radio instanceof HTMLInputElement && radio.type === "radio") {
      radio.addEventListener("keydown", (keydown) => {
        Handlers.opRadioHandler(keydown);
      });
      radio.addEventListener("change", () => Handlers.cpbInpHandler(radio));
      radio.addEventListener("keydown", () => Handlers.cpbInpHandler(radio));
      radio.addEventListener("dblclick", Handlers.doubleClickHandler);
    } else {
      ErrorHandler.inputNotFound(radio ?? "null");
    }
  });
} else {
  ErrorHandler.elementNotPopulated(radioButtons ?? null, "radioButtons");
}

if (comorbBtnsArray.length > 0) {
  comorbBtnsArray.forEach((comorbBtn) => {
    if (comorbBtn && comorbBtn instanceof HTMLButtonElement) {
      comorbBtn.addEventListener("click", () =>
        Handlers.addRowComorb(comorbBtn)
      );
    } else {
      ErrorHandler.elementNotFound(comorbBtn ?? null, "comorbBtn");
    }
  });
} else {
  ErrorHandler.elementNotPopulated(
    comorbBtnsArray ?? "null",
    "comorbBtnsArray"
  );
}

if (ativFisContainerBtnsArray.length > 0) {
  ativFisContainerBtnsArray.forEach((ativFisContainerBtn) => {
    if (
      ativFisContainerBtn &&
      ativFisContainerBtn instanceof HTMLButtonElement
    ) {
      ativFisContainerBtn.addEventListener("click", () =>
        Handlers.addRowAtivFis(ativFisContainerBtn)
      );
    } else {
      ErrorHandler.elementNotFound(
        ativFisContainerBtn ?? null,
        "ativFisContainerBtn"
      );
    }
  });
} else {
  ErrorHandler.elementNotPopulated(
    ativFisContainerBtnsArray ?? null,
    "ativFisContainerBtnsArray"
  );
}

if (dateBtns.length > 0) {
  dateBtns.forEach(function (dateBtn) {
    if (dateBtn instanceof HTMLButtonElement) {
      dateBtn.addEventListener("click", function (activation) {
        return Handlers.useCurrentDate(activation, dateBtn);
      });
    } else {
      ErrorHandler.elementNotFound(dateBtn ?? null, "dateBtn");
    }
  });
} else {
  ErrorHandler.elementNotPopulated(dateBtns ?? null, "dateBtns");
}

if (editableCite) {
  let firstClick = true;
  const citeClickHandler = function (click) {
    if (firstClick && click.target && click.target instanceof HTMLElement) {
      Model.removeFirstClick(click.target);
      firstClick = false;
      editableCite.removeEventListener("click", citeClickHandler);
    } else {
      ErrorHandler.elementNotFound(click.target ?? null, "editableCite");
    }
  };
  editableCite.addEventListener("keyup", function (keypress) {
    if (keypress.target && keypress.target instanceof HTMLElement) {
      Model.autoCapitalizeCite(keypress.target);
    } else {
      ErrorHandler.elementNotFound(keypress.target ?? null, "editableCite");
    }
  });
  editableCite.addEventListener("click", citeClickHandler);
} else {
  ErrorHandler.elementNotFound(null, "editableCite");
}

if (deactAutocorrectBtns.length > 0) {
  deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
    if (
      deactAutocorrectBtn &&
      deactAutocorrectBtn instanceof HTMLButtonElement
    ) {
      deactAutocorrectBtn.addEventListener("click", function (click) {
        return Model.switchAutocorrect(click, deactAutocorrectBtn);
      });
    } else {
      ErrorHandler.elementNotFound(
        deactAutocorrectBtn ?? null,
        "deactAutocorrectBtn"
      );
    }
  });
} else {
  ErrorHandler.elementNotPopulated(
    deactAutocorrectBtns ?? null,
    "deactAutocorrectBtns"
  );
}

if (astDigtBtns.length > 0) {
  astDigtBtns.forEach(function (astDigtBtn) {
    if (astDigtBtn instanceof HTMLButtonElement) {
      astDigtBtn.addEventListener("click", function (click) {
        return Handlers.changeToAstDigit(click, astDigtBtn);
      });
    } else {
      ErrorHandler.elementNotFound(astDigtBtn ?? null, "astDigtBtn");
    }
  });
} else {
  ErrorHandler.elementNotPopulated(astDigtBtns ?? null, "astDigtBtns");
}

if (subButton instanceof HTMLButtonElement) {
  subButton.addEventListener("click", Handlers.subForm);
} else {
  ErrorHandler.elementNotFound(subButton ?? null, "subButton");
}

if (resetFormBtn instanceof HTMLButtonElement) {
  resetFormBtn.addEventListener("click", (click) => {
    if (
      editableCite instanceof HTMLElement &&
      genTrans instanceof HTMLSelectElement &&
      genFisAlin instanceof HTMLSelectElement
    ) {
      Handlers.resetarFormulario(
        click,
        astDigtBtns,
        editableCite,
        genTrans,
        genFisAlin
      );
    } else {
      ErrorHandler.elementsNotFoundFunction(
        "resetarFormulario",
        editableCite ?? null,
        genTrans ?? null,
        genFisAlin ?? null
      );
    }
  });
} else {
  ErrorHandler.elementNotFound(resetFormBtn ?? null, "resetFormBtn");
}

export function cursorCheckTimer(cursorPosition) {
  let selection = window.getSelection();
  if (selection && selection.focusNode !== null) {
    cursorPosition = selection.getRangeAt(0)?.startOffset;
    setTimeout(() => {
      return cursorPosition;
    }, 3000);
  }
}

//para apagar retornos negativos anômalos
if (consTablesFs && consTablesFs instanceof HTMLFieldSetElement) {
  const allTabledInps = consTablesFs.querySelectorAll("input");
  if (allTabledInps.length > 0) {
    allTabledInps.forEach((tabInp) => {
      if (tabInp instanceof HTMLInputElement) {
        tabInp.addEventListener("input", () => {
          if (tabInp.value < 0) {
            tabInp.value = 0;
          }
        });
      } else {
        ErrorHandler.inputNotFound(tabInp ?? null, "tabInp");
      }
    });
  } else {
    ErrorHandler.elementNotPopulated(allTabledInps ?? null, "allTabledInps");
  }
  const arrColGroupsValidation = Model.checkInnerColGroups(consTablesFs) ?? [
    0,
    false,
  ];
  if (arrColGroupsValidation[0] !== 0 && arrColGroupsValidation[1] !== false) {
    numColsCons = arrColGroupsValidation[0];
    areColGroupsSimilar = arrColGroupsValidation[1];
  }
} else {
  ErrorHandler.elementNotFound(consTablesFs ?? null, "consTablesFs");
}

if (tabDC && tabDC instanceof HTMLTableElement) {
  const rowsDC = tabDC.getElementsByClassName("tabRowDCut");
  const rowsDCArray = Array.from(rowsDC).filter(
    (rowDC) => rowDC instanceof HTMLTableRowElement
  );
  const sumDCBtns = tabDC.querySelectorAll('button[id^="sumDCBtn"]');
  const sumDCInps = tabDC.querySelectorAll('input[id^="tabInpRowDCut9"]');
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
    const tabBtnsInd = tabIndPerc.getElementsByClassName("tabBtnInd");
    const tabBtnsIndArray = Array.from(tabBtnsInd).filter(
      (btn) => btn instanceof HTMLButtonElement
    );

    //início da captura de propriedades nas tabelas
    if (numConsElement?.lastElementChild instanceof HTMLOptionElement) {
      numConsLastOp = parseInt(
        numConsElement?.lastElementChild?.value ?? "1",
        10
      );
    } else {
      ErrorHandler.elementNotFound(numConsLastOp ?? null, "numConsLastOp");
    }

    //validação da relação de options e colunas
    if (numConsLastOp === numColsCons - 1 && numConsLastOp >= 3) {
      areNumConsOpsValid = true;
    } else {
      ErrorHandler.maxNumberError(
        numConsElement?.lastElementChild?.value ?? "1",
        "Options para Consultas"
      );
    }

    //faz a leitura do número de consulta
    if (
      areColGroupsSimilar &&
      numConsElement instanceof HTMLSelectElement &&
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

        if (
          inpWeightRowTitle &&
          inpWeightRowTitle.textContent?.match(/Peso/g)
        ) {
          targInpWeight = tabMedAnt.querySelector(
            `#tabInpRowMedAnt2_${numCons + 1}`
          );
          if (!(targInpWeight instanceof HTMLInputElement)) {
            ErrorHandler.inputNotFound(targInpWeight ?? null, "targInpWeight");
          }
        } else {
          ErrorHandler.matchError(
            "Título da Row para Campos de Peso",
            inpWeightRowTitle ?? null,
            inpWeightRowTitle?.textContent || "null"
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
            ErrorHandler.inputNotFound(targInpHeight ?? null, "targInpHeight");
          }
        } else {
          ErrorHandler.matchError(
            "Título da Row para Campos de Altura",
            inpHeightRowTitle ?? null,
            inpHeightRowTitle?.textContent || "null"
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
            ErrorHandler.inputNotFound(
              targInpSumDCut ?? null,
              "targInpSumDCut"
            );
          }
        } else {
          ErrorHandler.matchError(
            "Título da Row para Campos de Soma de Dobras Cutâneas",
            inpSumDCutRowTitle ?? null,
            inpSumDCutRowTitle?.textContent || "null"
          );
        }

        if (inpIMCRowTitle && inpIMCRowTitle.textContent?.match(/IMC/g)) {
          targInpIMC = tabIndPerc.querySelector(
            `#inpImc${numCons}Cel2_${numCons + 1}`
          );
          if (!(targInpIMC instanceof HTMLInputElement)) {
            ErrorHandler.inputNotFound(targInpIMC ?? null, "targInpIMC");
          }
        } else {
          ErrorHandler.matchError(
            "Título da Row para Campos de IMC",
            inpIMCRowTitle ?? null,
            inpIMCRowTitle?.textContent || "null"
          );
        }

        if (inpMLGRowTitle && inpMLGRowTitle.textContent?.match(/MLG/g)) {
          targInpMLG = tabIndPerc.querySelector(
            `#inpMlg${numCons}Cel3_${numCons + 1}`
          );
          if (!(targInpMLG instanceof HTMLInputElement)) {
            ErrorHandler.inputNotFound(targInpMLG ?? null, "targInpMLG");
          }
        } else {
          ErrorHandler.matchError(
            "Título da Row para Campos de MLG",
            inpMLGRowTitle ?? null,
            inpMLGRowTitle?.textContent || "null"
          );
        }

        if (inpPGCRowTitle && inpPGCRowTitle.textContent?.match(/PGC/g)) {
          targInpPGC = tabIndPerc.querySelector(
            `#inpPgc${numCons}Cel4_${numCons + 1}`
          );
          if (!(targInpPGC instanceof HTMLInputElement)) {
            ErrorHandler.inputNotFound(targInpPGC ?? null, "targInpPGC");
          }
        } else {
          ErrorHandler.matchError(
            "Título da Row para Campos de PGC",
            inpPGCRowTitle ?? null,
            inpPGCRowTitle?.textContent || "null"
          );
        }

        if (inpTMBRowTitle && inpTMBRowTitle.textContent?.match(/TMB/g)) {
          targInpTMB = tabIndPerc.querySelector(
            `#inpTmb${numCons}Cel5_${numCons + 1}`
          );
          if (!(targInpTMB instanceof HTMLInputElement)) {
            ErrorHandler.inputNotFound(targInpTMB ?? null, "targInpTMB");
          }
        } else {
          ErrorHandler.matchError(
            "Título da Row para Campos de TMB",
            inpTMBRowTitle ?? null,
            inpTMBRowTitle?.textContent || "null"
          );
        }

        if (inpGETRowTitle && inpGETRowTitle.textContent?.match(/GET/g)) {
          targInpGET = tabIndPerc.querySelector(
            `#inpGet${numCons}Cel6_${numCons + 1}`
          );
          if (!(targInpGET instanceof HTMLInputElement)) {
            ErrorHandler.inputNotFound(targInpGET ?? null, "targInpGET");
          }
        } else {
          ErrorHandler.matchError(
            "Título da Row para Campos de GET",
            inpGETRowTitle ?? null,
            inpGETRowTitle?.textContent || "null"
          );
        }

        //listener para atualização de inputs target
        numConsElement.addEventListener("change", () => {
          Handlers.switchRequiredCols(filteredSwitchElements);
          numCons = parseInt(numConsElement?.value || "1");
          targInpWeight = tabMedAnt.querySelector(
            `#tabInpRowMedAnt2_${numCons + 1}`
          );
          targInpHeight = tabMedAnt.querySelector(
            `#tabInpRowMedAnt3_${numCons + 1}`
          );
          targInpSumDCut = tabDC.querySelector(
            `#tabInpRowDCut9_${numCons + 1}`
          );
          targInpIMC = tabIndPerc.querySelector(
            `#inpImc${numCons}Cel2_${numCons + 1}`
          );
          targInpMLG = tabIndPerc.querySelector(
            `#inpMlg${numCons}Cel3_${numCons + 1}`
          );
          targInpPGC = tabIndPerc.querySelector(
            `#inpPgc${numCons}Cel4_${numCons + 1}`
          );
          targInpTMB = tabIndPerc.querySelector(
            `#inpTmb${numCons}Cel5_${numCons + 1}`
          );
          targInpGET = tabIndPerc.querySelector(
            `#inpGet${numCons}Cel6_${numCons + 1}`
          );

          // console.log("TARG WEIGHT NO LISTENER " + targInpWeight?.id);
          // console.log("TARG HEIGHT NO LISTENER " + targInpHeight?.id);
          // console.log("TARG SUMDCUT NO LISTENER " + targInpSumDCut?.id);
          // console.log("TARG IMC NO LISTENER " + targInpIMC?.id);
          // console.log("TARG MLG NO LISTENER " + targInpMLG?.id);
          // console.log("TARG PGC NO LISTENER " + targInpPGC?.id);
          // console.log("TARG TMB NO LISTENER " + targInpTMB?.id);
          // console.log("TARG GET NO LISTENER " + targInpGET?.id);
        });

        //início da construção de person (após inicialização)

        //obtenção de .age inicial com listener para input e atualização correspondente
        if (
          ageElement instanceof HTMLInputElement &&
          ageElement.type === "number"
        ) {
          person.age = parseInt(ageElement?.value || "0", 10);
          if (typeof person.age === "number") {
            ageElement?.addEventListener("input", () => {
              let returnedAge = Handlers.updateSimpleProperty(ageElement) ?? 0;
              if (typeof returnedAge === "number") {
                person.age = returnedAge;
              } else {
                ErrorHandler.typeError(
                  "update de .age",
                  returnedAge ?? null,
                  "number"
                );
              }
            });
          } else {
            ErrorHandler.typeError(
              "obtenção de .age",
              person.age ?? null,
              "number"
            );
          }
        } else {
          ErrorHandler.inputNotFound(ageElement ?? null, "ageElement");
        }

        //obtenção de .weight inicial com listener para input e atualização correspondente
        if (
          targInpWeight instanceof HTMLInputElement &&
          targInpWeight.type === "number"
        ) {
          person.weight = parseInt(targInpWeight.value || "0", 10);
          if (typeof person.weight === "number") {
            targInpWeight.addEventListener("input", () => {
              // console.log("TARGINPWEIGHT FORA DO LISTENER " + targInpWeight.id);
              const returnedWeight =
                Handlers.updateSimpleProperty(targInpWeight) || 0;
              if (typeof returnedWeight === "number") {
                person.weight = returnedWeight;
              } else if (typeof returnedWeight === "string") {
                person.weight =
                  parseInt(returnedWeight.replaceAll(/[^0-9.,+-]/g, "")) || 0;
              }
              //sem autofill, dá update somente em person.weight
              if (isAutoFillActive) {
                indexesArray = Handlers.updateIndexesContexts(
                  person,
                  gordCorpLvl,
                  targInpIMC,
                  targInpMLG,
                  targInpTMB,
                  targInpGET,
                  formTMBTypeElement,
                  factorAtvLvl,
                  factorAtleta
                );
                IMC = indexesArray[0];
                MLG = indexesArray[1];
                TMB = indexesArray[2];
                GET = indexesArray[3];
              }
            });
          } else {
            ErrorHandler.typeError("person.weight", person.weight, "number");
          }
        } else {
          ErrorHandler.inputNotFound(targInpWeight ?? null, "targInpWeight");
        }

        //obtenção de .height inicial com listener para input e atualização correspondente
        if (
          targInpHeight instanceof HTMLInputElement &&
          targInpHeight.type === "number"
        ) {
          person.height = parseInt(targInpHeight.value || "0", 10);
          if (typeof person.height === "number") {
            targInpHeight.addEventListener("input", () => {
              const returnedHeight =
                Handlers.updateSimpleProperty(targInpHeight) || 0;
              if (typeof returnedHeight === "number") {
                person.height = returnedHeight;
              } else if (typeof returnedHeight === "string") {
                person.height = parseInt(
                  returnedHeight.replaceAll(/[^0-9.,+-]/g, "") || "0"
                );
              }
              //sem autofill, dá update somente em person.weight
              if (isAutoFillActive) {
                indexesArray = Handlers.updateIndexesContexts(
                  person,
                  gordCorpLvl,
                  targInpIMC,
                  targInpMLG,
                  targInpTMB,
                  targInpGET,
                  formTMBTypeElement,
                  factorAtvLvl,
                  factorAtleta
                );
                IMC = indexesArray[0];
                MLG = indexesArray[1];
                TMB = indexesArray[2];
                GET = indexesArray[3];
              }
            });
          } else {
            ErrorHandler.typeError("person.height", person.height, "number");
          }
        } else {
          ErrorHandler.inputNotFound(targInpWeight ?? null, "targInpWeight");
        }
        //obtenção de demais propriedades
        if (
          areAllGenContChecked &&
          textBodytype instanceof HTMLSelectElement &&
          protocolo instanceof HTMLSelectElement
        ) {
          //obtenção de .gen inicial com adição de listeners para changes em contexto e atualização de .gen
          if (textBodytype && textBodytype instanceof HTMLSelectElement) {
            textBodytype.addEventListener("change", () => {
              Model.changeTabDCutLayout(protocolo, tabDC);
              person.gen = textBodytype.value;
              if (
                genBirthRel.value === "cis" &&
                (genElement.value === "masculino" ||
                  genElement.value === "feminino")
              ) {
                genElement.value = textBodytype.value;
              }
              console.log("gen value " + person.gen);
              switch (textBodytype.value) {
                case "masculino":
                  genFisAlin.value = "masculinizado";
                  break;
                case "feminino":
                  genFisAlin.value = "feminilizado";
                  break;
                case "neutro":
                  genFisAlin.value = "neutro";
                  break;
                default:
                  ErrorHandler.stringError(
                    "verificando textBodytype.value",
                    textBodytype?.value ?? "null"
                  );
              }
            });
          } else {
            ErrorHandler.elementNotFound(protocolo ?? null, "protocolo");
          }

          if (typeof person.gen === "string") {
            genElement?.addEventListener("change", () => {
              person.gen =
                Model.fluxGen(
                  genElement,
                  genElement?.value,
                  genBirthRel,
                  genTrans,
                  genFisAlin
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
            genBirthRel?.addEventListener("change", () => {
              person.gen =
                Model.fluxGen(
                  genElement,
                  genElement?.value,
                  genBirthRel,
                  genTrans,
                  genFisAlin
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
            genTrans?.addEventListener("change", () => {
              person.gen =
                Model.fluxGen(
                  genElement,
                  genElement?.value,
                  genBirthRel,
                  genTrans,
                  genFisAlin
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
            genFisAlin?.addEventListener("change", () => {
              person.gen =
                Model.fluxGen(
                  genElement,
                  genElement?.value,
                  genBirthRel,
                  genTrans,
                  genFisAlin
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
          }

          /*adição de listeneres de input para capturar mudança nos inputs validados e atribuir às propriedades de person*/
          if (targInpSumDCut instanceof HTMLInputElement) {
            person.sumDCut = parseInt(targInpSumDCut.value || "0.01", 10);
            targInpSumDCut.addEventListener("input", () => {
              // console.log("TARGINPSUMDCUT FORA DO LISTENER " + targInpSumDCut.id);
              const returnedSumDCut =
                Handlers.updateSimpleProperty(targInpSumDCut) || 0.01;
              if (typeof returnedSumDCut === "number") {
                person.sumDCut = returnedSumDCut;
              } else if (typeof returnedSumDCut === "string") {
                person.sumDCut = parseInt(
                  returnedSumDCut.replaceAll(/[^0-9.,+-]/g, "") || "0.01",
                  10
                );
              }
              PGC = Handlers.updatePGCContext(person, targInpPGC);
            });
          } else {
            ErrorHandler.inputNotFound(
              targInpSumDCut ?? null,
              "targInpSumDCut"
            );
          }

          if (
            ageElement instanceof HTMLInputElement &&
            ageElement.type === "number"
          ) {
            ageElement.addEventListener("input", () => {
              returnedAge = Handlers.updateSimpleProperty(ageElement);
              if (typeof returnedHeight === "number") {
                person.age = returnedAge;
              } else if (typeof returnedHeight === "string") {
                person.age = parseInt(
                  returnedAge.replaceAll(/[^0-9.,+-]/g, "") || "0"
                );
              }
              //sem autofill, dá update somente em person.age
              if (isAutoFillActive) {
                PGC = Handlers.updatePGCContext(person, targInpPGC);
                indexesArray = Handlers.updateIndexesContexts(
                  person,
                  gordCorpLvl,
                  targInpIMC,
                  targInpMLG,
                  targInpTMB,
                  targInpGET,
                  formTMBTypeElement,
                  factorAtvLvl,
                  factorAtleta
                );
                IMC = indexesArray[0];
                MLG = indexesArray[1];
                TMB = indexesArray[2];
                GET = indexesArray[3];
              }
            });
          } else {
            ErrorHandler.inputNotFound(ageElement ?? null, "ageElement");
          }

          //classifica person
          if (person && Object.keys(person).length === 7) {
            person = Model.generatePersonInstance(person);
            console.log(
              `PERSON INICIAL INSTANCIADA ${JSON.stringify(
                person
              )} + instance ${
                Object.prototype.toString.call(person).slice(8, -1) ?? "null"
              }`
            );
          } else {
            ErrorHandler.objectError(
              "a geração de instância",
              person ?? null,
              "6"
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
                isAutoFillActive = Handlers.switchAutoFill(
                  autoFillBtn,
                  locksTabInd
                );
              });
            } else {
              ErrorHandler.elementNotFound(autoFillBtn ?? null, "autoFillBtn");
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
                  person.atvLvl = Handlers.updateAtvLvl(
                    atvLvlElement,
                    person.atvLvl,
                    nafType
                  );
                  //retorna factorAtvLvl(número para ser utilizado, com base no .atvLvl)
                  let returnedFactorAtvLvl = person.checkAtvLvl(person);
                  if (typeof returnedFactorAtvLvl === "number") {
                    factorAtvLvl = returnedFactorAtvLvl || 1.4;
                  } else {
                    ErrorHandler.typeError(
                      "returnedFactorAtvLvl",
                      returnedFactorAtvLvl ?? null,
                      "number"
                    );
                  }
                  //ajusta elementos <select> com base em combinações
                  Handlers.fluxFormIMC(
                    IMC ?? 0,
                    formTMBTypeElement,
                    gordCorpLvl
                  );
                  Handlers.matchTMBElements(
                    atvLvlElement,
                    formTMBTypeElement,
                    spanFactorAtleta,
                    gordCorpLvl,
                    lockGordCorpLvl,
                    IMC ?? 0
                  );
                });

                nafType.addEventListener("change", () => {
                  person.atvLvl = Handlers.updateAtvLvl(
                    nafType,
                    person.atvLvl,
                    atvLvlElement
                  );

                  let returnedFactorAtvLvl = person.checkAtvLvl(person);
                  if (typeof returnedFactorAtvLvl === "number") {
                    factorAtvLvl = returnedFactorAtvLvl || 1.4;
                  } else {
                    ErrorHandler.typeError(
                      "returnedFactorAtvLvl",
                      returnedFactorAtvLvl ?? null,
                      "number"
                    );
                  }

                  Handlers.matchTMBElements(
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
                    person.atvLvl = Handlers.updateAtvLvl(
                      atvLvlElement,
                      person.atvLvl,
                      nafType
                    );
                    let returnedFactorAtvLvl = person.checkAtvLvl(person);
                    if (typeof returnedFactorAtvLvl === "number") {
                      factorAtvLvl = returnedFactorAtvLvl || 1.4;
                    } else {
                      ErrorHandler.typeError(
                        "returnedFactorAtvLvl",
                        returnedFactorAtvLvl ?? null,
                        "number"
                      );
                    }
                    Handlers.matchTMBElements(
                      atvLvlElement,
                      formTMBTypeElement,
                      spanFactorAtleta,
                      gordCorpLvl,
                      lockGordCorpLvl,
                      IMC ?? 0
                    );
                  });
                } else {
                  ErrorHandler.elementNotFound(
                    formTMBTypeElement ?? null,
                    "formTMBTypeElement"
                  );
                }

                if (gordCorpLvl instanceof HTMLSelectElement) {
                  gordCorpLvl.addEventListener("change", () => {
                    person.atvLvl = Handlers.updateAtvLvl(
                      atvLvlElement,
                      person.atvLvl,
                      nafType
                    );
                    let returnedFactorAtvLvl = person.checkAtvLvl(person);
                    if (typeof returnedFactorAtvLvl === "number") {
                      factorAtvLvl = returnedFactorAtvLvl || 1.4;
                    } else {
                      ErrorHandler.typeError(
                        "returnedFactorAtvLvl",
                        returnedFactorAtvLvl ?? null,
                        "number"
                      );
                    }
                    Handlers.matchTMBElements(
                      atvLvlElement,
                      formTMBTypeElement,
                      spanFactorAtleta,
                      gordCorpLvl,
                      lockGordCorpLvl,
                      IMC ?? 0
                    );
                  });
                } else {
                  ErrorHandler.elementNotFound(
                    gordCorpLvl ?? null,
                    "gordCorpLvl"
                  );
                }

                if (selFactorAtleta instanceof HTMLSelectElement) {
                  selFactorAtleta.addEventListener("change", () => {
                    factorAtleta = selFactorAtleta.value;
                    //sem autofill, dá update somente em factorAtleta
                    if (isAutoFillActive) {
                      PGC = Handlers.updatePGCContext(person, targInpPGC);
                      indexesArray = Handlers.updateIndexesContexts(
                        person,
                        gordCorpLvl,
                        targInpIMC,
                        targInpMLG,
                        targInpTMB,
                        targInpGET,
                        formTMBTypeElement,
                        factorAtvLvl,
                        factorAtleta
                      );
                      IMC = indexesArray[0];
                      MLG = indexesArray[1];
                      TMB = indexesArray[2];
                      GET = indexesArray[3];
                    }
                  });
                } else {
                  ErrorHandler.elementNotFound(
                    selFactorAtleta ?? null,
                    "selFactorAtleta"
                  );
                }
              } else {
                ErrorHandler.multipleElementsNotFound(
                  `value de Nível de Atividade Física ou Elementos relacionados. Valor obtido: ${
                    person.atvLvl ?? "null"
                  };
                    Valore aceitos: sedentario || leve || moderado || intenso || muitoIntenso.`,
                  atvLvlElement ?? null,
                  nafType ?? null
                );
              }
            } else {
              ErrorHandler.multipleElementsNotFound(
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
                protocolo.value = Model.changeTabDCutLayout(protocolo, tabDC);
              });
              //adiciona listeners para os botões de soma das Dobras Cutâneas
              if (sumDCBtns.length > 0) {
                sumDCBtns.forEach((sumDCBtn) => {
                  sumDCBtn?.addEventListener("click", () => {
                    if (
                      rowsDCArray.length > 0 &&
                      sumDCBtn instanceof HTMLButtonElement
                    ) {
                      person.sumDCut = Handlers.createArraysRels(
                        sumDCBtn?.id,
                        rowsDCArray,
                        protocolo.value
                      );

                      if (
                        !(typeof person.sumDCut === "number") ||
                        Number.isNaN(person.sumDCut) ||
                        person.sumDCut <= 0
                      ) {
                        ErrorHandler.typeError(
                          "person.sumDCut",
                          person.sumDCut,
                          "number"
                        );
                      }

                      if (
                        isPersonClassified &&
                        targInpPGC instanceof HTMLInputElement &&
                        protocolo.value === "pollock3" &&
                        person.age >= 0
                      ) {
                        PGC = Handlers.updatePGCContext(person, targInpPGC);
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
                    } else {
                      ErrorHandler.elementWithArrayError(
                        "rows de Dobras Cutâneas e/ou Botão de Soma de Dobras Cutâneas",
                        rowsDCArray ?? null,
                        sumDCBtn ?? null
                      );
                    }
                  });
                });
              } else {
                ErrorHandler.elementNotPopulated(
                  sumDCBtns ?? null,
                  "sumDCBtns"
                );
              }
            } else {
              ErrorHandler.elementNotFound(protocolo ?? null, "protocolo");
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
              //botões são independentes de condição de autofill
              if (IMCBtns.length > 0) {
                IMCBtns.forEach((imcbtn) => {
                  if (imcbtn instanceof HTMLButtonElement) {
                    imcbtn.addEventListener("click", () => {
                      indexesArray = Handlers.updateIndexesContexts(
                        person,
                        gordCorpLvl,
                        targInpIMC,
                        targInpMLG,
                        targInpTMB,
                        targInpGET,
                        formTMBTypeElement,
                        factorAtvLvl,
                        factorAtleta
                      );
                      IMC = indexesArray[0];
                      MLG = indexesArray[1];
                      TMB = indexesArray[2];
                      GET = indexesArray[3];
                    });
                  } else {
                    ErrorHandler.elementNotFound(imcbtn ?? null, "imcbtn");
                  }
                });
              } else {
                ErrorHandler.elementNotPopulated(IMCBtns ?? null, "IMCBtns");
              }

              if (MLGBtns.length > 0) {
                MLGBtns.forEach((mlgbtn) => {
                  if (mlgbtn instanceof HTMLButtonElement) {
                    mlgbtn.addEventListener("click", () => {
                      indexesArray = Handlers.updateIndexesContexts(
                        person,
                        gordCorpLvl,
                        targInpIMC,
                        targInpMLG,
                        targInpTMB,
                        targInpGET,
                        formTMBTypeElement,
                        factorAtvLvl,
                        factorAtleta
                      );
                      IMC = indexesArray[0];
                      MLG = indexesArray[1];
                      TMB = indexesArray[2];
                      GET = indexesArray[3];
                    });
                  } else {
                    ErrorHandler.elementNotFound(mlgbtn ?? null, "mlgbtn");
                  }
                });
              } else {
                ErrorHandler.elementNotPopulated(MLGBtns ?? null, "MLGBtns");
              }

              if (PGCBtns.length > 0) {
                PGCBtns.forEach((pgcbtn) => {
                  if (pgcbtn instanceof HTMLButtonElement) {
                    pgcbtn.addEventListener("click", () => {
                      console.log("sumdcut " + person.sumDCut);
                      PGC = Handlers.updatePGCContext(person, targInpPGC);
                    });
                  } else {
                    ErrorHandler.elementNotFound(pgcbtn ?? null, "pgcbtn");
                  }
                });
              } else {
                ErrorHandler.elementNotPopulated(PGCBtns ?? null, "PGCBtns");
              }

              if (TMBBtns.length > 0) {
                TMBBtns.forEach((tmbbtn) => {
                  tmbbtn.addEventListener("click", () => {
                    if (tmbbtn instanceof HTMLButtonElement) {
                      indexesArray = Handlers.updateIndexesContexts(
                        person,
                        gordCorpLvl,
                        targInpIMC,
                        targInpMLG,
                        targInpTMB,
                        targInpGET,
                        formTMBTypeElement,
                        factorAtvLvl,
                        factorAtleta
                      );
                      IMC = indexesArray[0];
                      MLG = indexesArray[1];
                      TMB = indexesArray[2];
                      GET = indexesArray[3];
                    } else {
                      ErrorHandler.elementNotFound(tmbbtn ?? null, "tmbbtn");
                    }
                  });
                });
              } else {
                ErrorHandler.elementNotPopulated(TMBBtns ?? null, "TMBBtns");
              }

              if (GETBtns.length > 0) {
                GETBtns.forEach((getbtn) => {
                  getbtn.addEventListener("click", () => {
                    if (getbtn instanceof HTMLButtonElement) {
                      indexesArray = Handlers.updateIndexesContexts(
                        person,
                        gordCorpLvl,
                        targInpIMC,
                        targInpMLG,
                        targInpTMB,
                        targInpGET,
                        formTMBTypeElement,
                        factorAtvLvl,
                        factorAtleta
                      );
                      IMC = indexesArray[0];
                      MLG = indexesArray[1];
                      TMB = indexesArray[2];
                      GET = indexesArray[3];
                    } else {
                      ErrorHandler.elementNotFound(getbtn ?? null, "getbtn");
                    }
                  });
                });
              } else {
                ErrorHandler.elementNotPopulated(GETBtns ?? null, "GETBtns");
              }

              //adições de listeners para inputs dos índices
              IMC = parseFloat(parseFloat(targInpIMC?.value || "0").toFixed(4));
              if (typeof IMC === "number") {
                targInpIMC.addEventListener("input", () => {
                  let returnedIMC =
                    Handlers.updateSimpleProperty(targInpIMC) ?? 0;
                  if (typeof returnedIMC === "number") {
                    IMC = parseFloat(returnedIMC.toFixed(4));
                  } else {
                    ErrorHandler.typeError(
                      "update de IMC",
                      returnedIMC ?? null,
                      "number"
                    );
                  }
                  //sem autofill, dá update somente em IMC
                  if (isAutoFillActive) {
                    PGC = Handlers.updatePGCContext(person, targInpPGC);
                    indexesArray = Handlers.updateIndexesContexts(
                      person,
                      gordCorpLvl,
                      targInpIMC,
                      targInpMLG,
                      targInpTMB,
                      targInpGET,
                      formTMBTypeElement,
                      factorAtvLvl,
                      factorAtleta
                    );
                    IMC = indexesArray[0];
                    MLG = indexesArray[1];
                    TMB = indexesArray[2];
                    GET = indexesArray[3];
                  }
                });
              } else {
                ErrorHandler.typeError("IMC", IMC ?? null, "number");
              }

              MLG = parseInt(targInpMLG?.value || "0", 10);
              if (typeof MLG === "number") {
                targInpMLG.addEventListener("input", () => {
                  let returnedMLG =
                    Handlers.updateSimpleProperty(targInpMLG) ?? 0;
                  if (typeof returnedMLG === "number") {
                    MLG = returnedMLG;
                  } else {
                    ErrorHandler.typeError(
                      "update de MLG",
                      returnedMLG ?? null,
                      "number"
                    );
                  }
                  //sem autofill, dá update somente em MLG
                  if (isAutoFillActive) {
                    PGC = Handlers.updatePGCContext(person, targInpPGC);
                    indexesArray = Handlers.updateIndexesContexts(
                      person,
                      gordCorpLvl,
                      targInpIMC,
                      targInpMLG,
                      targInpTMB,
                      targInpGET,
                      formTMBTypeElement,
                      factorAtvLvl,
                      factorAtleta
                    );
                    IMC = indexesArray[0];
                    MLG = indexesArray[1];
                    TMB = indexesArray[2];
                    GET = indexesArray[3];
                  }
                });
              } else {
                ErrorHandler.typeError("MLG", MLG ?? null, "number");
              }

              if (
                targInpPGC instanceof HTMLInputElement &&
                targInpPGC.type === "number"
              ) {
                PGC = parseFloat(
                  parseFloat(targInpPGC?.value || "0").toFixed(4)
                );
                if (typeof PGC === "number") {
                  targInpPGC.addEventListener("input", () => {
                    let returnedPGC =
                      Handlers.updateSimpleProperty(targInpPGC) ?? 0;
                    if (typeof returnedPGC === "number") {
                      PGC = parseFloat(returnedPGC.toFixed(4));
                    } else {
                      ErrorHandler.typeError(
                        "update de PGC",
                        returnedPGC ?? null,
                        "number"
                      );
                    }
                  });
                } else {
                  ErrorHandler.typeError("PGC", PGC ?? null, "number");
                }
              } else {
                ErrorHandler.inputNotFound(targInpPGC ?? null, "targInpPGC");
              }

              TMB = parseFloat(parseFloat(targInpTMB?.value || "0").toFixed(4));
              if (typeof TMB === "number") {
                targInpTMB.addEventListener("input", () => {
                  let returnedTMB =
                    Handlers.updateSimpleProperty(targInpTMB) ?? 0;
                  if (typeof returnedTMB === "number") {
                    TMB = parseFloat(returnedTMB.toFixed(4));
                    console.log(TMB);
                  } else {
                    ErrorHandler.typeError(
                      "update de TMB",
                      returnedTMB ?? null,
                      "number"
                    );
                  }
                  //sem autofill, dá update somente em TMB
                  if (isAutoFillActive) {
                    PGC = Handlers.updatePGCContext(person, targInpPGC);
                    indexesArray = Handlers.updateIndexesContexts(
                      person,
                      gordCorpLvl,
                      targInpIMC,
                      targInpMLG,
                      targInpTMB,
                      targInpGET,
                      formTMBTypeElement,
                      factorAtvLvl,
                      factorAtleta
                    );
                    IMC = indexesArray[0];
                    MLG = indexesArray[1];
                    TMB = indexesArray[2];
                    GET = indexesArray[3];
                  }
                });
              } else {
                ErrorHandler.typeError("TMB", TMB ?? null, "number");
              }

              GET = parseFloat(parseFloat(targInpGET?.value || "0").toFixed(4));
              if (typeof GET === "number") {
                targInpGET.addEventListener("input", () => {
                  let returnedGET =
                    Handlers.updateSimpleProperty(targInpGET) ?? 0;
                  if (typeof returnedGET === "number") {
                    GET = parseFloat(returnedGET.toFixed(4));
                  } else {
                    ErrorHandler.typeError(
                      "update de GET",
                      returnedGET ?? null,
                      "number"
                    );
                  }
                });
              } else {
                ErrorHandler.typeError("GET", GET ?? null, "number");
              }
            } else {
              ErrorHandler.multipleElementsNotFound(
                "Target Inputs e/ou Select para Fórmula de TMB",
                targInpIMC ?? null,
                targInpMLG ?? null,
                targInpTMB ?? null,
                targInpGET ?? null,
                formTMBTypeElement ?? null
              );
            }
          } else {
            ErrorHandler.elementWithObjectError(
              "validando person",
              person ?? null,
              gordCorpLvl ?? null
            );
          }
        } else {
          console.warn(
            `Todos os campos de identidade de gênero validados: ${
              areAllGenContChecked.toString() ?? "false"
            }`
          );
          ErrorHandler.multipleElementsNotFound(
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
      ErrorHandler.elementNotFound(numConsElement ?? null, "numConsElement");
    }
  } else {
    ErrorHandler.multipleElementsNotFound(
      "Tabelas de Medidas Antropométricas",
      tabSVi ?? null,
      tabMedAnt ?? null,
      tabIndPerc ?? null
    );
  }
} else {
  ErrorHandler.multipleElementsNotFound(
    "Tabelas de Medidas",
    tabMedAnt ?? null,
    tabIndPerc ?? null
  );
}
