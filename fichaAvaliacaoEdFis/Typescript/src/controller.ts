//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM

import * as Model from "./model.js";
import * as Handlers from "./handlers.js";
import { UndefinedPerson, Man, Woman, Neutro } from "./classes.js";
import * as ErrorHandler from "./errorHandler.js";

//inicialização de constantes a partir de procura no DOM
const textareas: NodeListOf<HTMLTextAreaElement> =
  document.querySelectorAll("textarea");
const textInputs: NodeListOf<HTMLInputElement> =
  document.querySelectorAll('input[type="text"]');
const textConts: (HTMLTextAreaElement | HTMLInputElement)[] = [
  ...textareas,
  ...textInputs,
];
const genElement = document.getElementById("genId");
const genBirthRel = document.getElementById("genBirthRelId");
const genTrans = document.getElementById("genTransId");
const genFisAlin = document.getElementById("genFisAlinId");
const textBodytype = document.getElementById("textBodytype");
const ageElement = document.getElementById("ageId");
const atvLvlElement = document.getElementById("selectLvlAtFis");
const numInps: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  'input[type="number"]'
);
const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  'input[type="radio"]'
);
const comorbBtns: HTMLCollectionOf<Element> =
  document.getElementsByClassName("countComorb");
const comorbBtnsArray: Element[] = Array.from(comorbBtns);
const ativFisContainerBtns: HTMLCollectionOf<Element> =
  document.getElementsByClassName("countAtFis");
const ativFisContainerBtnsArray: Element[] = Array.from(ativFisContainerBtns);
const consTablesFs = document.getElementById("fsProgConsId");
const numConsElement = document.getElementById("selectNumCons");
const tabSVi = document.getElementById("tabProgSVi");
const tabMedAnt = document.getElementById("tabMedAnt");
const tabDC = document.getElementById("tabDCut");
const tabIndPerc = document.getElementById("tabIndPerc");
const editableCite: Element | null = document.querySelector(
  'cite[contenteditable="true"]'
);
const astDigtBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  'button[id$="AstDigtBtn'
);
const deactAutocorrectBtns: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll('button[id^="deactAutocorrectBtn"]');
const dateBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  'button[id$="DatBtn"]'
);
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
const IMCBtns: Element[] = Array.from(
  document.getElementsByClassName("tabBtnImc")
);
const MLGBtns: Element[] = Array.from(
  document.getElementsByClassName("tabBtnMlg")
);
const PGCBtns: Element[] = Array.from(
  document.getElementsByClassName("tabBtnPgc")
);
const TMBBtns: Element[] = Array.from(
  document.getElementsByClassName("tabBtnTmb")
);
const GETBtns: Element[] = Array.from(
  document.getElementsByClassName("tabBtnGet")
);
const autoFillBtn = document.getElementById("autoFillBtn");
const locksTabInd = Array.from(document.getElementsByClassName("lockTabInd"));
const resetFormBtn: HTMLElement | null =
  document.getElementById("resetFormBtn");
const subButton: HTMLElement | null =
  document.getElementById("submitFormButId");

//inicialização de variáveis para validação e construção de pessoa tratada no formulário
let areAllGenContChecked = Model.checkAllGenConts(
  genElement as HTMLSelectElement,
  genBirthRel as HTMLSelectElement,
  genTrans as HTMLSelectElement,
  genFisAlin as HTMLSelectElement
);
let person: Man | Woman | Neutro | UndefinedPerson = {
  gen: (genElement as HTMLSelectElement)?.value ?? "",
  age: parseFloat((ageElement as HTMLInputElement)?.value) ?? 0,
  sumDCut: 0,
  weight: 0,
  height: 0,
  atvLvl: (atvLvlElement as HTMLSelectElement)?.value ?? "",
};

//inicialização de variáveis usadas no tabelamento, para alcance em escopo global
//variáveis e constantes obtidas através de queries nas tabelas são inicializadas em blocos, após validação das respectivas tabelas
let numCons = 0;
let numColsCons = 0;
let areColGroupsSimilar = false;
let areNumConsOpsValid = false;
let targInpWeight: HTMLInputElement | null = null;
let targInpHeight: HTMLInputElement | null = null;
let targInpSumDCut: HTMLInputElement | null = null;
let targInpIMC: HTMLInputElement | null = null;
let targInpMLG: HTMLInputElement | null = null;
let targInpPGC: HTMLInputElement | null = null;
let targInpTMB: HTMLInputElement | null = null;
let targInpGET: HTMLInputElement | null = null;
let IMCMLGArray: [string, number, number] = ["", 0, 0];
let IMC = 0;
let MLG = 0;
let PGC = 0;
let TMB = 0;
let GET = 0;
let indexesArray = [0, 0, 0, 0];
let factorAtvLvl = 0;
let factorAtleta = "";
let TMBArray: [string, number] = ["", 0];
let numConsLastOp = 0;
let isPersonClassified = false;
let isAutoFillActive = true;

if (selFactorAtleta instanceof HTMLSelectElement) {
  factorAtleta = selFactorAtleta.value;
} else {
  console.error(`Erro validando instância de selFactorAtleta.
  Instância obtida: ${
    Object.prototype.toString.call(selFactorAtleta).slice(8, -1) ?? "null"
  }.`);
}

//início da validação de elementos no DOM e inserção de listeners com callbacks respectivos
if (textConts.length > 0) {
  textConts.forEach(function (
    textCont: HTMLTextAreaElement | HTMLInputElement
  ) {
    textCont.addEventListener("input", function (input: Event): void {
      if (
        input.target &&
        (input.target instanceof HTMLTextAreaElement ||
          (input.target instanceof HTMLInputElement &&
            input.target.type === "text"))
      ) {
        Model.autoCapitalizeInputs(input.target);
      } else {
        console.warn(`Erro validando Elemento de Texto para listener de input.
        Elemento obtido: ${input?.target ?? "null"};
        Instância obtida: ${
          Object.prototype.toString.call(input?.target).slice(8, -1) ?? "null"
        };
        Tipo obtido (válido somente para <input>): ${
          (input.target as HTMLInputElement)?.type ?? "null"
        }`);
      }
    });
  });
} else {
  console.error(`Erro validando array de textos.
  Length obtida: ${textConts?.length ?? "0"}`);
}

if (numInps.length > 0) {
  numInps.forEach(function (numInp: HTMLInputElement) {
    numInp.addEventListener("input", function (input: Event): void {
      if (
        input.target &&
        input.target instanceof HTMLInputElement &&
        input.target.type === "number"
      ) {
        Model.numberLimit(input.target);
      } else {
        console.warn(`Erro validando Input Numérico para listener de input.
        Elemento obtido: ${input?.target ?? "null"};
        Instância obtida: ${
          Object.prototype.toString.call(input?.target).slice(8, -1) ?? "null"
        };
        Tipo obtido (válido somente para <input>): ${
          (input.target as HTMLInputElement)?.type ?? "null"
        }`);
      }
    });
  });
} else {
  console.error(`Erro validando NodeList de Inputs Numéricos.
  Length obtida: ${numInps?.length ?? "0"}`);
}

if (radioButtons.length > 0) {
  radioButtons.forEach((radio: HTMLInputElement) => {
    if (radio instanceof HTMLInputElement && radio.type === "radio") {
      radio.addEventListener("keydown", (keydown: KeyboardEvent): void => {
        Handlers.opRadioHandler(keydown);
      });
      radio.addEventListener("change", (): void =>
        Handlers.cpbInpHandler(radio)
      );
      radio.addEventListener("keydown", (): void =>
        Handlers.cpbInpHandler(radio)
      );
      radio.addEventListener("dblclick", Handlers.doubleClickHandler);
    } else {
      console.warn(`Erro validando Input de Radio.
    Instância obtida: ${
      Object.prototype.toString.call(radio).slice(8, -1) ?? "null"
    };
    Tipo obtido: ${radio?.type ?? "null"} `);
    }
  });
} else {
  console.warn(
    `Erro validando NodeList de Inputs de Radio. Length obtida: ${
      radioButtons?.length ?? "0"
    }`
  );
}

if (comorbBtnsArray.length > 0) {
  comorbBtnsArray.forEach((comorbBtn: Element) => {
    if (comorbBtn && comorbBtn instanceof HTMLButtonElement) {
      comorbBtn.addEventListener("click", (): void =>
        Handlers.addRowComorb(comorbBtn)
      );
    } else {
      console.warn(`Erro validando Botão sobre Comorbidade.
      Instância obtida: ${
        Object.prototype.toString.call(comorbBtn).slice(8, -1) ?? "null"
      }`);
    }
  });
} else {
  console.error(`Erro validando array de Botões sobre Comorbidades.
  Length obtida: ${comorbBtnsArray?.length ?? "0"}`);
}

if (ativFisContainerBtnsArray.length > 0) {
  ativFisContainerBtnsArray.forEach((ativFisContainerBtn: Element) => {
    if (
      ativFisContainerBtn &&
      ativFisContainerBtn instanceof HTMLButtonElement
    ) {
      ativFisContainerBtn.addEventListener("click", (): void =>
        Handlers.addRowAtivFis(ativFisContainerBtn)
      );
    } else {
      console.warn(`Erro validando Botão sobre Atividade Física.
      Instância obtida: ${
        Object.prototype.toString.call(ativFisContainerBtn).slice(8, -1) ??
        "null"
      }.`);
    }
  });
} else {
  console.error(`Erro validando array de Botões sobre Atividades Física.
  Length obtida: ${ativFisContainerBtnsArray?.length ?? "0"}`);
}

if (dateBtns.length > 0) {
  dateBtns.forEach(function (dateBtn: HTMLButtonElement) {
    if (dateBtn instanceof HTMLButtonElement) {
      dateBtn.addEventListener(
        "click",
        function (activation: MouseEvent): void {
          return Handlers.useCurrentDate(activation, dateBtn);
        }
      );
    } else {
      console.warn(`Erro validando Botão de Date.
    Instância obtida: ${
      Object.prototype.toString.call(dateBtn).slice(8, -1) ?? "null"
    };`);
    }
  });
} else {
  console.error(`Erro validando NodeList de Inputs de Date.
  Length Obtida: ${dateBtns?.length ?? "0"}`);
}

if (editableCite) {
  let firstClick: boolean = true;
  const citeClickHandler: (click: Event) => void = function (click: Event) {
    if (firstClick && click.target && click.target instanceof HTMLElement) {
      Model.removeFirstClick(click.target);
      firstClick = false;
      editableCite.removeEventListener("click", citeClickHandler);
    }
  };
  editableCite.addEventListener("keyup", function (keypress: Event) {
    if (keypress.target && keypress.target instanceof HTMLElement) {
      Model.autoCapitalizeCite(keypress.target);
    }
  });
  editableCite.addEventListener("click", citeClickHandler);
} else {
  console.warn("Cite editável não encontrado");
}

if (deactAutocorrectBtns.length > 0) {
  deactAutocorrectBtns.forEach(function (
    deactAutocorrectBtn: HTMLButtonElement
  ): void {
    if (
      deactAutocorrectBtn &&
      deactAutocorrectBtn instanceof HTMLButtonElement
    ) {
      deactAutocorrectBtn.addEventListener(
        "click",
        function (click: MouseEvent): void {
          return Model.switchAutocorrect(click, deactAutocorrectBtn);
        }
      );
    } else {
      console.warn(`Erro validando Botão para desativar autocorreção.
      Instância obtida: ${
        Object.prototype.toString.call(deactAutocorrectBtn).slice(8, -1) ??
        "null"
      }`);
    }
  });
} else {
  console.error(`Erro validando NodeList de Botões para desativar autocorreção.
  Length obtida: ${deactAutocorrectBtns?.length ?? "0"}`);
}

if (astDigtBtns.length > 0) {
  astDigtBtns.forEach(function (astDigtBtn: HTMLButtonElement): void {
    if (astDigtBtn instanceof HTMLButtonElement) {
      astDigtBtn.addEventListener("click", function (click: MouseEvent): void {
        return Handlers.changeToAstDigit(click, astDigtBtn);
      });
    } else {
      console.warn(`Erro validando Botão de Assinatura Digital.
      Instância obtida: ${
        Object.prototype.toString.call(astDigtBtn).slice(8, -1) ?? "null"
      }`);
    }
  });
} else {
  console.error(`Erro validando NodeList para Botões de Assinatura Digital.
  Length obtida: ${astDigtBtns?.length ?? "0"}`);
}

if (subButton) {
  subButton.addEventListener("click", Handlers.subForm);
} else {
  console.error("Botão de Submeter não encontrado");
}

if (resetFormBtn) {
  resetFormBtn.addEventListener("click", (click: MouseEvent): void => {
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
      console.error(`Erro validando instâncias obtidas para reset.
      Instância de editableCite obtida: ${
        Object.prototype.toString.call(editableCite).slice(8, -1) ?? "null"
      };
      Instância de genTrans obtida: ${
        Object.prototype.toString.call(genTrans).slice(8, -1) ?? "null"
      };
      Instância de genFisAlin obtida: ${
        Object.prototype.toString.call(genFisAlin).slice(8, -1) ?? "null"
      }`);
    }
  });
} else {
  console.warn("Botão de Resetar não encontrado");
}

export function cursorCheckTimer(cursorPosition: number): number | void {
  let selection = window.getSelection();
  if (selection && selection.focusNode !== null) {
    cursorPosition = selection.getRangeAt(0)?.startOffset;
    setTimeout(() => {
      return cursorPosition;
    }, 3000);
  }
}

if (consTablesFs && consTablesFs instanceof HTMLFieldSetElement) {
  const allTabledInps = consTablesFs.querySelectorAll("input");
  if (allTabledInps.length > 0) {
    allTabledInps.forEach((tabInp) => {
      if (tabInp instanceof HTMLInputElement) {
        tabInp.addEventListener("input", () => {
          tabInp.value = Model.normalizeNegatives(tabInp);
        });
      } else {
        console.error(`Erro validado Input de Tabela para Métricas.
        Instância obtida: ${
          Object.prototype.toString.call(tabInp).slice(8, -1) ?? "null"
        }`);
      }
    });
  } else {
    console.error(
      `Erro validando inputs internos ao <fieldset> de tabelas métricas`
    );
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
  console.error(`Erro validando Tabela de Métricas.
  Instância obtida: ${
    Object.prototype.toString.call(consTablesFs).slice(8, -1) ?? "null"
  }.`);
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
      console.error(`Erro ao validar Última Opção de Número da Consulta.
      Instância obtida: ${
        Object.prototype.toString.call(numConsElement).slice(8, -1) ?? "null"
      }`);
    }

    //validação da relação de options e colunas
    if (numConsLastOp === numColsCons - 1 && numConsLastOp >= 3) {
      areNumConsOpsValid = true;
    } else {
      console.error(`Número de Options para Consultas inválidos.
      Número máximo obtido: ${parseInt(
        (numConsElement?.lastElementChild as HTMLOptionElement)?.value ?? "1",
        10
      )}`);
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
            console.error(`Erro obtendo target input para Peso.`);
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de Peso.
          Elemento obtido: ${inpWeightRowTitle || "null"};
          Título obtido: ${inpWeightRowTitle?.textContent || "null"}.`);
        }

        if (
          inpHeightRowTitle &&
          inpHeightRowTitle.textContent?.match(/Altura/g)
        ) {
          targInpHeight = tabMedAnt.querySelector(
            `#tabInpRowMedAnt3_${numCons + 1}`
          );
          if (!(targInpHeight instanceof HTMLInputElement)) {
            console.error(`Erro obtendo target input para Altura.`);
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de Altura.
          Elemento obtido: ${inpHeightRowTitle || "null"};
          Título obtido: ${inpHeightRowTitle?.textContent || "null"}.`);
        }

        if (
          inpSumDCutRowTitle &&
          inpSumDCutRowTitle.textContent?.match(/Soma/g)
        ) {
          targInpSumDCut = tabDC.querySelector(
            `#tabInpRowDCut9_${numCons + 1}`
          );
          if (!(targInpSumDCut instanceof HTMLInputElement)) {
            console.error(
              `Erro obtendo target input para Soma de Dobras Cutâneas.`
            );
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de Soma de Dobras Cutâneas.
          Elemento obtido: ${inpSumDCutRowTitle || "null"};
          Título obtido: ${inpWeightRowTitle?.textContent || "null"}.`);
        }

        if (inpIMCRowTitle && inpIMCRowTitle.textContent?.match(/IMC/g)) {
          targInpIMC = tabIndPerc.querySelector(
            `#inpImc${numCons}Cel2_${numCons + 1}`
          );
          if (!(targInpIMC instanceof HTMLInputElement)) {
            console.error(`Erro obtendo target input para IMC.
            Instância obtida: ${
              Object.prototype.toString.call(targInpIMC).slice(8, -1) ?? "null"
            }`);
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de IMC.
          Elemento obtido: ${inpIMCRowTitle || "null"};
          Título obtido: ${inpIMCRowTitle?.textContent || "null"}.`);
        }

        if (inpMLGRowTitle && inpMLGRowTitle.textContent?.match(/MLG/g)) {
          targInpMLG = tabIndPerc.querySelector(
            `#inpMlg${numCons}Cel3_${numCons + 1}`
          );
          if (!(targInpMLG instanceof HTMLInputElement)) {
            console.error(`Erro obtendo target input para MLG.
            Instância obtida: ${
              Object.prototype.toString.call(targInpMLG).slice(8, -1) ?? "null"
            }`);
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de MLG.
          Elemento obtido: ${inpMLGRowTitle || "null"};
          Título obtido: ${inpMLGRowTitle?.textContent || "null"}.`);
        }

        if (inpPGCRowTitle && inpPGCRowTitle.textContent?.match(/PGC/g)) {
          targInpPGC = tabIndPerc.querySelector(
            `#inpPgc${numCons}Cel4_${numCons + 1}`
          );
          if (!(targInpPGC instanceof HTMLInputElement)) {
            console.error(`Erro obtendo target input para PGC.
            Instância obtida: ${
              Object.prototype.toString.call(targInpPGC).slice(8, -1) ?? "null"
            }`);
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de PGC.
          Elemento obtido: ${inpPGCRowTitle || "null"};
          Título obtido: ${inpPGCRowTitle?.textContent || "null"}.`);
        }

        if (inpTMBRowTitle && inpTMBRowTitle.textContent?.match(/TMB/g)) {
          targInpTMB = tabIndPerc.querySelector(
            `#inpTmb${numCons}Cel5_${numCons + 1}`
          );
          if (!(targInpTMB instanceof HTMLInputElement)) {
            console.error(`Erro obtendo target input para TMB.
            Instância obtida: ${
              Object.prototype.toString.call(targInpTMB).slice(8, -1) ?? "null"
            }`);
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de TMB.
          Elemento obtido: ${inpTMBRowTitle || "null"};
          Título obtido: ${inpTMBRowTitle?.textContent || "null"}.`);
        }

        if (inpGETRowTitle && inpGETRowTitle.textContent?.match(/GET/g)) {
          targInpGET = tabIndPerc.querySelector(
            `#inpGet${numCons}Cel6_${numCons + 1}`
          );
          if (!(targInpGET instanceof HTMLInputElement)) {
            console.error(`Erro obtendo target input para GET.
            Instância obtida: ${
              Object.prototype.toString.call(targInpGET).slice(8, -1) ?? "null"
            }`);
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de GET.
          Elemento obtido: ${inpGETRowTitle || "null"};
          Título obtido: ${inpGETRowTitle?.textContent || "null"}.`);
        }

        //listener para atualização de inputs target
        numConsElement.addEventListener("change", () => {
          Handlers.switchRequiredCols(filteredSwitchElements as HTMLElement[]);
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
                Handlers.updateSimpleProperty(
                  targInpWeight as HTMLInputElement
                ) || 0;
              if (typeof returnedWeight === "number") {
                person.weight = returnedWeight;
              } else if (typeof returnedWeight === "string") {
                person.weight =
                  parseInt(returnedWeight.replaceAll(/[^0-9.,+-]/g, "")) || 0;
              }
              if (isAutoFillActive) {
                PGC = Handlers.updatePGCContext(
                  person as Man | Woman | Neutro,
                  targInpPGC as HTMLInputElement
                );
                indexesArray = Handlers.updateIndexesContexts(
                  person as Man | Woman | Neutro,
                  gordCorpLvl as HTMLSelectElement,
                  targInpIMC as HTMLInputElement,
                  targInpMLG as HTMLInputElement,
                  targInpTMB as HTMLInputElement,
                  targInpGET as HTMLInputElement,
                  formTMBTypeElement as HTMLSelectElement,
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
            console.error(`Erro validando tipo primitivo de person.weight.
            Tipo obtido: ${person?.weight ?? "null"}`);
          }
        } else {
          console.error(`Erro validando Campo de Peso para o número da consulta.
        Instância obtida: ${
          Object.prototype.toString.call(targInpWeight).slice(8, -1) ?? "null"
        };
        .type obtido: ${targInpWeight?.type ?? "null"}`);
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
                Handlers.updateSimpleProperty(
                  targInpHeight as HTMLInputElement
                ) || 0;
              if (typeof returnedHeight === "number") {
                person.height = returnedHeight;
              } else if (typeof returnedHeight === "string") {
                person.height = parseInt(
                  returnedHeight.replaceAll(/[^0-9.,+-]/g, "") || "0"
                );
              }
              if (isAutoFillActive) {
                PGC = Handlers.updatePGCContext(
                  person as Man | Woman | Neutro,
                  targInpPGC as HTMLInputElement
                );
                indexesArray = Handlers.updateIndexesContexts(
                  person as Man | Woman | Neutro,
                  gordCorpLvl as HTMLSelectElement,
                  targInpIMC as HTMLInputElement,
                  targInpMLG as HTMLInputElement,
                  targInpTMB as HTMLInputElement,
                  targInpGET as HTMLInputElement,
                  formTMBTypeElement as HTMLSelectElement,
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
            console.error(`Erro validando tipo primitivo de person.height
            Tipo primitivo obtido: ${person?.height ?? "null"}.`);
          }
        } else {
          console.error(`Erro validando Campo de Altura para o número da consulta.
        Instância obtida: ${
          Object.prototype.toString.call(targInpHeight).slice(8, -1) ?? "null"
        };
        .type obtido: ${targInpHeight?.type ?? "null"}`);
        }

        //obtenção de demais propriedades
        if (
          areAllGenContChecked &&
          textBodytype instanceof HTMLSelectElement &&
          protocolo instanceof HTMLSelectElement
        ) {
          //obtenção de .age inicial com listener para input e atualização correspondent
          if (
            ageElement instanceof HTMLInputElement &&
            ageElement.type === "number"
          ) {
            ageElement.addEventListener("input", () => {
              let returnedAge = Handlers.updateSimpleProperty(ageElement) ?? 0;
              if (typeof returnedAge === "number") {
                person.age = returnedAge;
              } else {
                console.error(`Tipo primitivo obtido por update de age incorreto.
                Tipo obtido: ${typeof returnedAge ?? "undefined"};
                Tipo aceito: number`);
              }
              if (isAutoFillActive) {
                PGC = Handlers.updatePGCContext(
                  person as Man | Woman | Neutro,
                  targInpPGC as HTMLInputElement
                );
                indexesArray = Handlers.updateIndexesContexts(
                  person as Man | Woman | Neutro,
                  gordCorpLvl as HTMLSelectElement,
                  targInpIMC as HTMLInputElement,
                  targInpMLG as HTMLInputElement,
                  targInpTMB as HTMLInputElement,
                  targInpGET as HTMLInputElement,
                  formTMBTypeElement as HTMLSelectElement,
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
            console.error(`Erro validando ageElement.
            Instância obtida: ${
              Object.prototype.toString.call(ageElement).slice(8, -1) ?? "null"
            };
            .type obtido: ${
              (ageElement as HTMLInputElement)?.type ?? "null"
            }.`);
          }

          //obtenção de .gen inicial com adição de listeners para changes em contexto e atualização de .gen
          if (textBodytype && textBodytype instanceof HTMLSelectElement) {
            textBodytype.addEventListener("change", () => {
              Model.changeTabDCutLayout(protocolo, tabDC);
              person.gen = textBodytype.value;
              if (
                (genBirthRel as HTMLSelectElement).value === "cis" &&
                ((genElement as HTMLSelectElement).value === "masculino" ||
                  (genElement as HTMLSelectElement).value === "feminino")
              ) {
                (genElement as HTMLSelectElement).value = textBodytype.value;
              }
              switch (textBodytype.value) {
                case "masculino":
                  (genFisAlin as HTMLSelectElement).value = "masculinizado";
                  break;
                case "feminino":
                  (genFisAlin as HTMLSelectElement).value = "feminilizado";
                  break;
                case "neutro":
                  (genFisAlin as HTMLSelectElement).value = "neutro";
                  break;
                default:
                  console.warn(`Erro verificando textBodytype.value.
                  Valor obtido: ${textBodytype?.value ?? "null"}`);
              }
            });
          } else {
            console.warn(
              `Erro validando campo de Bodytype. Elemento: ${protocolo}, instância: ${
                Object.prototype.toString.call(textBodytype).slice(8, -1) ??
                "null"
              }`
            );
          }

          if (typeof person.gen === "string") {
            genElement?.addEventListener("change", () => {
              person.gen =
                Model.fluxGen(
                  genElement as HTMLSelectElement,
                  (genElement as HTMLSelectElement)?.value,
                  genBirthRel as HTMLSelectElement,
                  genTrans as HTMLSelectElement,
                  genFisAlin as HTMLSelectElement
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
            genBirthRel?.addEventListener("change", () => {
              person.gen =
                Model.fluxGen(
                  genElement as HTMLSelectElement,
                  (genElement as HTMLSelectElement)?.value,
                  genBirthRel as HTMLSelectElement,
                  genTrans as HTMLSelectElement,
                  genFisAlin as HTMLSelectElement
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
            genTrans?.addEventListener("change", () => {
              person.gen =
                Model.fluxGen(
                  genElement as HTMLSelectElement,
                  (genElement as HTMLSelectElement)?.value,
                  genBirthRel as HTMLSelectElement,
                  genTrans as HTMLSelectElement,
                  genFisAlin as HTMLSelectElement
                ) ?? "";
              console.log("gen value " + person.gen);
              textBodytype.value = person.gen;
            });
            genFisAlin?.addEventListener("change", () => {
              person.gen =
                Model.fluxGen(
                  genElement as HTMLSelectElement,
                  (genElement as HTMLSelectElement)?.value,
                  genBirthRel as HTMLSelectElement,
                  genTrans as HTMLSelectElement,
                  genFisAlin as HTMLSelectElement
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
                Handlers.updateSimpleProperty(
                  targInpSumDCut as HTMLInputElement
                ) || 0.01;
              if (typeof returnedSumDCut === "number") {
                person.sumDCut = returnedSumDCut;
              } else if (typeof returnedSumDCut === "string") {
                person.sumDCut = parseInt(
                  returnedSumDCut.replaceAll(/[^0-9.,+-]/g, "") || "0.01",
                  10
                );
              }
              PGC = (person as Man | Woman | Neutro).calcPGC(
                person as Man | Woman | Neutro
              );
              const PGCDecayArray = Model.isPGCDecaying(
                person as Man | Woman | Neutro,
                PGC,
                targInpPGC as HTMLInputElement
              );
              if (PGCDecayArray[0] === true) {
                PGC = PGCDecayArray[1];
                (targInpPGC as HTMLInputElement).value = PGC.toFixed(2);
              } else {
                (targInpPGC as HTMLInputElement).value = PGC.toFixed(4);
              }
            });
          } else {
            console.error(`Erro validando Campo de Soma de Dobras Cutâneas para o número da consulta.
            Instância obtida: ${
              Object.prototype.toString.call(targInpSumDCut).slice(8, -1) ??
              "null"
            }.`);
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
            console.error(`Erro validando person para a geração de instância.
            Objecto obtido: ${JSON.stringify(person) ?? "null"};
            Número obtido de propriedades: ${
              Object.keys(person).length ?? 0
            }; Número aceito: 6`);
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
              console.error(`Erro validando Botão de Cálculo Automático.
              Instância obtida: ${
                Object.prototype.toString.call(autoFillBtn).slice(8, -1) ??
                "null"
              }`);
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
                  let returnedfactorAtvLvl = (
                    person as Man | Woman | Neutro
                  ).checkAtvLvl(person as Man | Woman | Neutro);
                  if (typeof returnedfactorAtvLvl === "number") {
                    factorAtvLvl = returnedfactorAtvLvl || 1.4;
                  } else {
                    console.warn(`Erro obtendo retorno de checkAtvLvl.
                            Tipo primitivo obtido: ${typeof returnedfactorAtvLvl}`);
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

                  let returnedfactorAtvLvl = (
                    person as Man | Woman | Neutro
                  ).checkAtvLvl(person as Man | Woman | Neutro);
                  if (typeof returnedfactorAtvLvl === "number") {
                    factorAtvLvl = returnedfactorAtvLvl || 1.4;
                  } else {
                    console.warn(`Erro obtendo retorno de checkAtvLvl.
                            Tipo primitivo obtido: ${typeof returnedfactorAtvLvl}`);
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
                    let returnedfactorAtvLvl = (
                      person as Man | Woman | Neutro
                    ).checkAtvLvl(person as Man | Woman | Neutro);
                    if (typeof returnedfactorAtvLvl === "number") {
                      factorAtvLvl = returnedfactorAtvLvl || 1.4;
                    } else {
                      console.warn(`Erro obtendo retorno de checkAtvLvl.
                 Tipo primitivo obtido: ${typeof returnedfactorAtvLvl}`);
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
                  console.error(`Erro validando Instância de formTMBTypeElement.
              Instância obtida: ${
                Object.prototype.toString
                  .call(formTMBTypeElement)
                  .slice(8, -1) ?? "null"
              }`);
                }

                if (gordCorpLvl instanceof HTMLSelectElement) {
                  gordCorpLvl.addEventListener("change", () => {
                    person.atvLvl = Handlers.updateAtvLvl(
                      atvLvlElement,
                      person.atvLvl,
                      nafType
                    );
                    let returnedfactorAtvLvl = (
                      person as Man | Woman | Neutro
                    ).checkAtvLvl(person as Man | Woman | Neutro);
                    if (typeof returnedfactorAtvLvl === "number") {
                      factorAtvLvl = returnedfactorAtvLvl || 1.4;
                    } else {
                      console.warn(`Erro obtendo retorno de checkAtvLvl.
                                              Tipo primitivo obtido: ${typeof returnedfactorAtvLvl}`);
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
                  console.error(`Erro validando Instância de gordCorpLvl.
              Instância obtida: ${
                Object.prototype.toString.call(gordCorpLvl).slice(8, -1) ??
                "null"
              }`);
                }

                if (selFactorAtleta instanceof HTMLSelectElement) {
                  selFactorAtleta.addEventListener("change", () => {
                    factorAtleta = selFactorAtleta.value;
                    //sem autofill, dá update somente em factorAtleta
                    if (isAutoFillActive) {
                      PGC = Handlers.updatePGCContext(
                        person as Man | Woman | Neutro,
                        targInpPGC as HTMLInputElement
                      );
                      indexesArray = Handlers.updateIndexesContexts(
                        person as Man | Woman | Neutro,
                        gordCorpLvl,
                        targInpIMC as HTMLInputElement,
                        targInpMLG as HTMLInputElement,
                        targInpTMB as HTMLInputElement,
                        targInpGET as HTMLInputElement,
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
                  console.error(`Erro validando select para Fator para Cálculo de TMB em Atletas.
              Instância obtida: ${
                Object.prototype.toString.call(selFactorAtleta).slice(8, -1) ??
                "null"
              }`);
                }
              } else {
                console.error(`Erro validando value de Nível de Atividade Física ou Elementos relacionados.
                    Valor obtido: ${person.atvLvl ?? "null"}
                    Valore aceitos: sedentario || leve || moderado || intenso || muitoIntenso.
                    Instância de Elemento de Nível de Atividade Física obtida: ${
                      Object.prototype.toString
                        .call(atvLvlElement)
                        .slice(8, -1) ?? "null"
                    };
                    Instância de Fator de Nível de Atividade Física obtida: ${
                      Object.prototype.toString.call(nafType).slice(8, -1) ??
                      "null"
                    }`);
              }
            } else {
              console.error(`Erro validando Elemento de Nível de Atividade Física e/ou Relacionados.
              Instância obtida para Nível de Atividade Física: ${
                Object.prototype.toString.call(atvLvlElement).slice(8, -1) ??
                "null"
              };
              Instância obtida para Fórmula de TMB: ${
                Object.prototype.toString
                  .call(formTMBTypeElement)
                  .slice(8, -1) ?? "null"
              };
              Instância obtida para <span> de Fator para Atletas: ${
                Object.prototype.toString.call(spanFactorAtleta).slice(8, -1) ??
                "null"
              };
              Instância obtida para <span> de Lock para Nível de Gordura Corporal: ${
                Object.prototype.toString.call(lockGordCorpLvl).slice(8, -1) ??
                "null"
              }.`);
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
                    if (rowsDCArray && sumDCBtn instanceof HTMLButtonElement) {
                      person.sumDCut = Handlers.createArraysRels(
                        sumDCBtn?.id,
                        rowsDCArray as HTMLTableRowElement[],
                        protocolo.value
                      );

                      if (
                        !(typeof person.sumDCut === "number") ||
                        Number.isNaN(person.sumDCut) ||
                        person.sumDCut <= 0
                      ) {
                        console.warn(`Erro obtendo person.sumDCut.
                        Valor obtido: ${person.sumDCut ?? "null"}.`);
                      }

                      if (
                        isPersonClassified &&
                        targInpPGC instanceof HTMLInputElement &&
                        protocolo.value === "pollock3" &&
                        person.age >= 0
                      ) {
                        PGC =
                          parseFloat(
                            (person as Man | Woman | Neutro)
                              .calcPGC(person as Man | Woman | Neutro)
                              .toFixed(4)
                          ) ?? 0;
                        if (Number.isNaN(PGC) || isNaN(PGC)) {
                          console.warn(`PGC retornando como NaN`);
                          PGC = 0;
                        }
                        const PGCDecayArray = Model.isPGCDecaying(
                          person as Man | Woman | Neutro,
                          PGC,
                          targInpPGC as HTMLInputElement
                        );
                        if (PGCDecayArray[0] === true) {
                          PGC = PGCDecayArray[1];
                          (targInpPGC as HTMLInputElement).value =
                            PGC.toFixed(2);
                        } else {
                          (targInpPGC as HTMLInputElement).value =
                            PGC.toFixed(4);
                        }
                        if (PGC <= 0) {
                          console.warn(`Valor de PGC não atualizado.
                          Valor obtido: ${PGC || 0}`);
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
                    } else {
                      console.warn(`Erro validando rows de Dobras Cutâneas e/ou Botão de Soma de Dobras Cutâneas.
                      rowsDC obtido: ${JSON.stringify(rowsDCArray) ?? "null"};
                      Instância de sumDCBtn obtido: ${
                        Object.prototype.toString.call(sumDCBtn).slice(8, -1) ??
                        "null"
                      }.`);
                    }
                  });
                });
              } else {
                console.error(`Erro validando Botões de Soma de Dobras Cutâneas.
                Length Obtida: ${sumDCBtns?.length ?? 0}`);
              }
            } else {
              console.warn(
                `Erro validando campo de Protocolo. Elemento: ${protocolo}, instância: ${
                  Object.prototype.toString.call(protocolo).slice(8, -1) ??
                  "null"
                }`
              );
            }
            //TODO BOTÕES AINDA ESTÃO CAPTURANDO .WEIGHT E .HEIGHT DA COLUNA ERRADA
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
              if (IMCBtns.length > 0) {
                IMCBtns.forEach((imcbtn) => {
                  if (imcbtn instanceof HTMLButtonElement) {
                    imcbtn.addEventListener("click", () => {
                      indexesArray = Handlers.updateIndexesContexts(
                        person as Man | Woman | Neutro,
                        gordCorpLvl,
                        targInpIMC as HTMLInputElement,
                        targInpMLG as HTMLInputElement,
                        targInpTMB as HTMLInputElement,
                        targInpGET as HTMLInputElement,
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
                    console.error(`Erro validando instância de Botão para Cálculo de IMC.
                  Instância Obtida: ${
                    Object.prototype.toString.call(imcbtn).slice(8, -1) ??
                    "null"
                  }`);
                  }
                });
              } else {
                console.error(`Erro validando .length de IMCBtns.
              Length obtida: ${IMCBtns?.length ?? 0}.`);
              }

              if (MLGBtns.length > 0) {
                MLGBtns.forEach((mlgbtn) => {
                  if (mlgbtn instanceof HTMLButtonElement) {
                    mlgbtn.addEventListener("click", () => {
                      indexesArray = Handlers.updateIndexesContexts(
                        person as Man | Woman | Neutro,
                        gordCorpLvl,
                        targInpIMC as HTMLInputElement,
                        targInpMLG as HTMLInputElement,
                        targInpTMB as HTMLInputElement,
                        targInpGET as HTMLInputElement,
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
                    console.error(`Erro validando instância de Botão para Cálculo de MLG.
                  Instância Obtida: ${
                    Object.prototype.toString.call(mlgbtn).slice(8, -1) ??
                    "null"
                  }`);
                  }
                });
              } else {
                console.error(`Erro validando .length de MLGBtns.
              Length obtida: ${MLGBtns?.length ?? 0}.`);
              }

              if (PGCBtns.length > 0) {
                PGCBtns.forEach((pgcbtn) => {
                  if (pgcbtn instanceof HTMLButtonElement) {
                    pgcbtn.addEventListener("click", () => {
                      console.log(person.sumDCut);
                      PGC =
                        parseFloat(
                          (person as Man | Woman | Neutro)
                            .calcPGC(person as Man | Woman | Neutro)
                            .toFixed(4)
                        ) ?? 0;
                      if (Number.isNaN(PGC) || isNaN(PGC)) {
                        console.warn(`PGC retornando como NaN`);
                        PGC = 0;
                      }
                      const PGCDecayArray = Model.isPGCDecaying(
                        person as Man | Woman | Neutro,
                        PGC,
                        targInpPGC as HTMLInputElement
                      );
                      if (PGCDecayArray[0] === true) {
                        PGC = PGCDecayArray[1];
                        (targInpPGC as HTMLInputElement).value = PGC.toFixed(2);
                      } else {
                        (targInpPGC as HTMLInputElement).value = PGC.toFixed(4);
                      }
                      if (PGC <= 0) {
                        console.warn(`Valor de PGC não atualizado.
                      Valor obtido: ${PGC || 0}`);
                      }
                    });
                  } else {
                    console.error(`Erro validando instância de Botão para Cálculo de PGC.
                  Instância Obtida: ${
                    Object.prototype.toString.call(pgcbtn).slice(8, -1) ??
                    "null"
                  }`);
                  }
                });
              } else {
                console.error(`Erro validando .length de PGCBtns.
              Length obtida: ${PGCBtns?.length ?? 0}.`);
              }

              if (TMBBtns.length > 0) {
                TMBBtns.forEach((tmbbtn) => {
                  tmbbtn.addEventListener("click", () => {
                    if (tmbbtn instanceof HTMLButtonElement) {
                      indexesArray = Handlers.updateIndexesContexts(
                        person as Man | Woman | Neutro,
                        gordCorpLvl,
                        targInpIMC as HTMLInputElement,
                        targInpMLG as HTMLInputElement,
                        targInpTMB as HTMLInputElement,
                        targInpGET as HTMLInputElement,
                        formTMBTypeElement,
                        factorAtvLvl,
                        factorAtleta
                      );
                      IMC = indexesArray[0];
                      MLG = indexesArray[1];
                      TMB = indexesArray[2];
                      GET = indexesArray[3];
                    } else {
                      console.error(`Erro validando instância de Botão para Cálculo de TMB.
                    Instância Obtida: ${
                      Object.prototype.toString.call(tmbbtn).slice(8, -1) ??
                      "null"
                    }`);
                    }
                  });
                });
              } else {
                console.error(`Erro validando .length de TMBBtns.
              Length obtida: ${TMBBtns?.length ?? 0}.`);
              }

              if (GETBtns.length > 0) {
                GETBtns.forEach((getbtn) => {
                  getbtn.addEventListener("click", () => {
                    if (getbtn instanceof HTMLButtonElement) {
                      indexesArray = Handlers.updateIndexesContexts(
                        person as Man | Woman | Neutro,
                        gordCorpLvl,
                        targInpIMC as HTMLInputElement,
                        targInpMLG as HTMLInputElement,
                        targInpTMB as HTMLInputElement,
                        targInpGET as HTMLInputElement,
                        formTMBTypeElement,
                        factorAtvLvl,
                        factorAtleta
                      );
                      IMC = indexesArray[0];
                      MLG = indexesArray[1];
                      TMB = indexesArray[2];
                      GET = indexesArray[3];
                    } else {
                      console.error(`Erro validando instância de Botão para Cálculo de TMB.
                  Instância Obtida: ${
                    Object.prototype.toString.call(getbtn).slice(8, -1) ??
                    "null"
                  }`);
                    }
                  });
                });
              } else {
                console.error(`Erro validando .length de GETBtns.
              Length obtida: ${GETBtns?.length ?? 0}`);
              }

              //adições de listeners para inputs dos índices
              IMC = parseFloat(parseFloat(targInpIMC?.value || "0").toFixed(4));
              if (typeof IMC === "number") {
                targInpIMC.addEventListener("input", () => {
                  let returnedIMC =
                    Handlers.updateSimpleProperty(
                      targInpIMC as HTMLInputElement
                    ) ?? 0;
                  if (typeof returnedIMC === "number") {
                    IMC = parseFloat(returnedIMC.toFixed(4));
                  } else {
                    console.error(`Tipo primitivo obtido por update de IMC incorreto.
                    Tipo obtido: ${typeof returnedIMC ?? "undefined"};
                    Tipo aceito: number`);
                  }
                  if (isAutoFillActive) {
                    indexesArray = Handlers.updateIndexesContexts(
                      person as Man | Woman | Neutro,
                      gordCorpLvl,
                      targInpIMC as HTMLInputElement,
                      targInpMLG as HTMLInputElement,
                      targInpTMB as HTMLInputElement,
                      targInpGET as HTMLInputElement,
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
                console.error(`Erro obtendo tipo primitivo de IMC.
                            Tipo Primitivo obtido: ${
                              typeof IMC ?? "undefined"
                            }`);
              }

              MLG = parseInt(targInpMLG?.value || "0", 10);
              if (typeof MLG === "number") {
                targInpMLG.addEventListener("input", () => {
                  let returnedMLG =
                    Handlers.updateSimpleProperty(
                      targInpMLG as HTMLInputElement
                    ) ?? 0;
                  if (typeof returnedMLG === "number") {
                    MLG = returnedMLG;
                  } else {
                    console.error(`Tipo primitivo obtido por update de MLG incorreto.
                    Tipo obtido: ${typeof returnedMLG ?? "undefined"};
                    Tipo aceito: number`);
                    if (isAutoFillActive) {
                      indexesArray = Handlers.updateIndexesContexts(
                        person as Man | Woman | Neutro,
                        gordCorpLvl,
                        targInpIMC as HTMLInputElement,
                        targInpMLG as HTMLInputElement,
                        targInpTMB as HTMLInputElement,
                        targInpGET as HTMLInputElement,
                        formTMBTypeElement,
                        factorAtvLvl,
                        factorAtleta
                      );
                      IMC = indexesArray[0];
                      MLG = indexesArray[1];
                      TMB = indexesArray[2];
                      GET = indexesArray[3];
                    }
                  }
                });
              } else {
                console.error(`Erro obtendo tipo primitivo de MLG.
                            Tipo Primitivo obtido: ${
                              typeof MLG ?? "undefined"
                            }`);
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
                      Handlers.updateSimpleProperty(
                        targInpPGC as HTMLInputElement
                      ) ?? 0;
                    if (typeof returnedPGC === "number") {
                      PGC = parseFloat(returnedPGC.toFixed(4));
                    } else {
                      console.error(`Tipo primitivo obtido por update de PGC incorreto.
                      Tipo obtido: ${typeof returnedPGC ?? "undefined"};
                      Tipo aceito: number`);
                    }
                  });
                } else {
                  console.error(`Erro obtendo tipo primitivo de PGC.
                            Tipo Primitivo obtido: ${
                              typeof PGC ?? "undefined"
                            }`);
                }
              } else {
                console.error(`Erro validando targInpPGC.
                          Instância obtida: ${
                            Object.prototype.toString
                              .call(targInpPGC)
                              .slice(8, -1) ?? "null"
                          };
                          .type obtido: ${targInpPGC?.type ?? "null"}`);
              }

              TMB = parseFloat(parseFloat(targInpTMB?.value || "0").toFixed(4));
              if (typeof TMB === "number") {
                targInpTMB.addEventListener("input", () => {
                  let returnedTMB =
                    Handlers.updateSimpleProperty(
                      targInpTMB as HTMLInputElement
                    ) ?? 0;
                  if (typeof returnedTMB === "number") {
                    TMB = parseFloat(returnedTMB.toFixed(4));
                    console.log(TMB);
                  } else {
                    console.error(`Tipo primitivo obtido por update de TMB incorreto.
                    Tipo obtido: ${typeof returnedTMB ?? "undefined"};
                    Tipo aceito: number`);
                    if (isAutoFillActive) {
                      indexesArray = Handlers.updateIndexesContexts(
                        person as Man | Woman | Neutro,
                        gordCorpLvl,
                        targInpIMC as HTMLInputElement,
                        targInpMLG as HTMLInputElement,
                        targInpTMB as HTMLInputElement,
                        targInpGET as HTMLInputElement,
                        formTMBTypeElement,
                        factorAtvLvl,
                        factorAtleta
                      );
                      IMC = indexesArray[0];
                      MLG = indexesArray[1];
                      TMB = indexesArray[2];
                      GET = indexesArray[3];
                    }
                  }
                });
              } else {
                console.error(`Erro obtendo tipo primitivo de TMB.
                            Tipo Primitivo obtido: ${
                              typeof TMB ?? "undefined"
                            }`);
              }

              GET = parseFloat(parseFloat(targInpGET?.value || "0").toFixed(4));
              if (typeof GET === "number") {
                targInpGET.addEventListener("input", () => {
                  let returnedGET =
                    Handlers.updateSimpleProperty(
                      targInpGET as HTMLInputElement
                    ) ?? 0;
                  if (typeof returnedGET === "number") {
                    GET = parseFloat(returnedGET.toFixed(4));
                  } else {
                    console.error(`Tipo primitivo obtido por update de GET incorreto.
                    Tipo obtido: ${typeof returnedGET ?? "undefined"};
                    Tipo aceito: number`);
                    if (isAutoFillActive) {
                      indexesArray = Handlers.updateIndexesContexts(
                        person as Man | Woman | Neutro,
                        gordCorpLvl,
                        targInpIMC as HTMLInputElement,
                        targInpMLG as HTMLInputElement,
                        targInpTMB as HTMLInputElement,
                        targInpGET as HTMLInputElement,
                        formTMBTypeElement,
                        factorAtvLvl,
                        factorAtleta
                      );
                      IMC = indexesArray[0];
                      MLG = indexesArray[1];
                      TMB = indexesArray[2];
                      GET = indexesArray[3];
                    }
                  }
                });
              } else {
                console.error(`Erro obtendo tipo primitivo de GET.
                            Tipo Primitivo obtido: ${
                              typeof GET ?? "undefined"
                            }`);
              }
            } else {
              console.error(`Erro validando Target Inputs.
              Instância obtida para IMC: ${
                Object.prototype.toString.call(targInpIMC).slice(8, -1) ??
                "null"
              };
              .type obtido: ${targInpIMC?.type ?? "null"};
              Instância obtida para MLG: ${
                Object.prototype.toString.call(targInpMLG).slice(8, -1) ??
                "null"
              };
              .type obtido: ${targInpMLG?.type ?? "null"};
              Instância obtida para TMB: ${
                Object.prototype.toString.call(targInpTMB).slice(8, -1) ??
                "null"
              };
              .type obtido: ${targInpTMB?.type ?? "null"};
              Instância obtida para GET: ${
                Object.prototype.toString.call(targInpGET).slice(8, -1) ??
                "null"
              };
              .type obtido: ${targInpGET?.type ?? "null"};
              Instância obtida para Select para Fórmula de TMB: ${
                Object.prototype.toString
                  .call(formTMBTypeElement)
                  .slice(8, -1) ?? "null"
              }.`);
            }
          } else {
            console.error(
              `Erro validando person. Elemento: ${person}; instância: ${
                person.constructor.name ?? "undefined"
              }
              gordCorpLvl: instância obtida: ${
                Object.prototype.toString.call(gordCorpLvl).slice(8, -1) ??
                "null"
              }`
            );
          }
        } else {
          console.error(`Erro validando Campos de Gênero e/ou Tipo Corporal e/ou Protocolo.
          Instância obtida para Protocolo: ${
            Object.prototype.toString.call(protocolo).slice(8, -1) ?? "null"
          };
          Instância obtida para Gênero: ${
            Object.prototype.toString.call(genElement).slice(8, -1) ?? "null"
          };
          Instância obtida para Tratamento Hormonal: ${
            Object.prototype.toString.call(genTrans).slice(8, -1) ?? "null"
          };
          Instância obtida para Alinhamento Físico: ${
            Object.prototype.toString.call(genFisAlin).slice(8, -1) ?? "null"
          };
          Instância obtida para Tipo Corporal: ${
            Object.prototype.toString.call(textBodytype).slice(8, -1) ?? "null"
          }
          Todos os campos de identidade de gênero validados: ${
            areAllGenContChecked.toString() ?? "false"
          }`);
        }
      }
    } else {
      console.error(`Erro validando Campo de Consulta em Leitura.
        Instância obtida: ${
          Object.prototype.toString.call(numConsElement).slice(8, -1) ?? "null"
        }
        Col Groups similares: ${areColGroupsSimilar}`);
    }
  } else {
    console.warn(
      `Erro validando Tabelas. Tabela de Medidas Antropométricas: elemento ${tabMedAnt}, instância: ${
        Object.prototype.toString.call(tabMedAnt).slice(8, -1) ?? "null"
      }; Tabela de Índices: elemento ${tabIndPerc}, instância ${
        Object.prototype.toString.call(tabIndPerc).slice(8, -1) ?? "null"
      }`
    );
  }
} else {
  console.warn(
    `Erro validando Tabelas.
    Tabela de Sinais Vitais: elemento ${
      JSON.stringify(tabSVi) ?? "null"
    }, instância ${
      Object.prototype.toString.call(tabSVi).slice(8, -1) ?? "null"
    }
      Tabela de Medidas Antropométricas: elemento ${
        JSON.stringify(tabMedAnt) ?? "null"
      }, instância: ${Object.prototype.toString.call(tabMedAnt).slice(8, -1)}; 
      Tabela de Índices: elemento ${
        JSON.stringify(tabIndPerc) ?? "null"
      }, instância ${
      Object.prototype.toString.call(tabIndPerc).slice(8, -1) ?? "null"
    }`
  );
}
