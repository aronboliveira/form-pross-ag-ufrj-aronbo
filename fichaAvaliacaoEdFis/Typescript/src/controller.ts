import * as Model from "./model.js";
import * as Handlers from "./handlers.js";
import { UndefinedPerson, Man, Woman, Neutro } from "./classes.js";

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
const resetFormBtn: HTMLElement | null =
  document.getElementById("resetFormBtn");
const subButton: HTMLElement | null =
  document.getElementById("submitFormButId");
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
let numColsCons = 0;
let areColGroupsSimilar = false;
let areNumConsOpsValid = false;
let IMCMLGArray: [string, number, number] = ["", 0, 0];
let PGC = 0;
let factorAtLvl = 0;
let GET = 0;
let factorAtleta = "";
let TMBArray: [string, number] = ["", 0];
let numConsLastOp = 0;

//obtenção de .gen
if (
  areAllGenContChecked &&
  genElement instanceof HTMLSelectElement &&
  textBodytype &&
  textBodytype instanceof HTMLSelectElement
) {
  if (typeof person.gen === "string") {
    genElement?.addEventListener("change", () => {
      person.gen =
        Model.fluxGen(
          genElement as HTMLSelectElement,
          genElement?.value,
          genBirthRel as HTMLSelectElement,
          genTrans as HTMLSelectElement,
          genFisAlin as HTMLSelectElement
        ) ?? "";
      console.log("gen value " + person.gen);
      textBodytype.value = person.gen as string;
    });
    genBirthRel?.addEventListener("change", () => {
      person.gen =
        Model.fluxGen(
          genElement as HTMLSelectElement,
          genElement?.value,
          genBirthRel as HTMLSelectElement,
          genTrans as HTMLSelectElement,
          genFisAlin as HTMLSelectElement
        ) ?? "";
      console.log("gen value " + person.gen);
      textBodytype.value = person.gen as string;
    });
    genTrans?.addEventListener("change", () => {
      person.gen =
        Model.fluxGen(
          genElement as HTMLSelectElement,
          genElement?.value,
          genBirthRel as HTMLSelectElement,
          genTrans as HTMLSelectElement,
          genFisAlin as HTMLSelectElement
        ) ?? "";
      console.log("gen value " + person.gen);
      textBodytype.value = person.gen as string;
    });
    genFisAlin?.addEventListener("change", () => {
      person.gen =
        Model.fluxGen(
          genElement as HTMLSelectElement,
          genElement?.value,
          genBirthRel as HTMLSelectElement,
          genTrans as HTMLSelectElement,
          genFisAlin as HTMLSelectElement
        ) ?? "";
      console.log("gen value " + person.gen);
      textBodytype.value = person.gen as string;
    });
  }
} else {
  console.error(`Erro validando Campos de Gênero e/ou Tipo Corporal.
  Instância obtida para Gênero: ${
    Object.prototype.toString.call(genElement).slice(8, -1) ?? "null"
  };
  Instância obtida para Tipo Corporal: ${
    Object.prototype.toString.call(textBodytype).slice(8, -1) ?? "null"
  }
  Todos os campos de identidade de gênero validados: ${
    areAllGenContChecked.toString() ?? "false"
  }`);
}

//obtenção de .age
if (ageElement instanceof HTMLInputElement && ageElement.type === "number") {
  if (typeof person.age === "number") {
    ageElement?.addEventListener("input", () => {
      let returnedAge = Handlers.updateSimpleProperty(ageElement) ?? 0;
      if (typeof returnedAge === "number") {
        person.age = returnedAge;
      } else {
        console.error(`Tipo primitivo obtido por update de age incorreto.
        Tipo obtido: ${typeof returnedAge ?? "undefined"};
        Tipo aceito: number`);
      }
    });
  }
} else {
  console.error(`Erro validando Input de Idade.
  Instância obitda: ${
    Object.prototype.toString.call(ageElement).slice(8, -1) ?? "null"
  };
  Tipo obtido: ${(ageElement as HTMLInputElement)?.type ?? "null"}`);
}

//obtenção de .atvLvl
if (atvLvlElement instanceof HTMLSelectElement) {
  person.atvLvl = atvLvlElement?.value;
  atvLvlElement.addEventListener("change", () => {
    let returnedAtvLvl = Handlers.updateSimpleProperty(atvLvlElement) ?? "";
    if (typeof returnedAtvLvl === "string") {
      person.atvLvl = returnedAtvLvl;
    } else {
      console.warn(`Erro no tipo retornado para atualização de atvLvl.
      Tipo obtido: ${returnedAtvLvl ?? "undefined"};
      Tipo aceito: string.`);
    }
  });
} else {
  console.error(`Erro validando Elemento de Nível de Atividade Física.
  Instância obtida: ${
    Object.prototype.toString.call(atvLvlElement).slice(8, -1) ?? "null"
  };
  Valor obtido: ${person.atvLvl ?? "null"}`);
}

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
  const arrColGroupsValidation = Model.checkInnerColGroups(consTablesFs) ?? [
    0,
    false,
  ];
  if (arrColGroupsValidation[0] !== 0 && arrColGroupsValidation[1] !== false) {
    numColsCons = arrColGroupsValidation[0];
    areColGroupsSimilar = arrColGroupsValidation[1];
    console.log(arrColGroupsValidation);
  }
}

if (tabDC && tabDC instanceof HTMLTableElement) {
  const rowsDC = tabDC.getElementsByClassName("tabRowDCut");
  const rowsDCArray = Array.from(rowsDC).filter(
    (rowDC) => rowDC instanceof HTMLTableRowElement
  ) as HTMLTableRowElement[];
  const sumDCBtns: NodeListOf<HTMLButtonElement> = tabDC.querySelectorAll(
    'button[id^="sumDCBtn"]'
  );
  const sumDCInps: NodeListOf<HTMLInputElement> = tabDC.querySelectorAll(
    'input[id^="tabInpRowDCut9"]'
  );
  const protocolo: Element | null = document.getElementById("tabSelectDCutId");

  //adiciona listeners para os botões de soma das Dobras Cutâneas
  if (sumDCBtns.length > 0) {
    sumDCBtns.forEach((sumDCBtn) => {
      sumDCBtn?.addEventListener("click", () => {
        if (rowsDCArray) Handlers.createArraysRels(sumDCBtn?.id, rowsDCArray);
      });
    });
  } else {
    console.error(`Erro validando Botões de Soma de Dobras Cutâneas.
    Length Obtida: ${sumDCBtns?.length ?? 0}`);
  }
  //atualiza layout de tabela de acordo com protocolo e gênero
  if (protocolo && protocolo instanceof HTMLSelectElement) {
    protocolo.addEventListener("change", () =>
      Model.changeTabDCutLayout(
        protocolo as HTMLSelectElement,
        tabDC as HTMLTableElement
      )
    );
    if (textBodytype && textBodytype instanceof HTMLSelectElement) {
      textBodytype.addEventListener("change", () =>
        Model.changeTabDCutLayout(
          protocolo as HTMLSelectElement,
          tabDC as HTMLTableElement
        )
      );
    } else {
      console.warn(
        `Erro validando campo de Bodytype. Elemento: ${protocolo}, instância: ${
          Object.prototype.toString.call(textBodytype).slice(8, -1) ?? "null"
        }`
      );
    }
  } else {
    console.warn(
      `Erro validando campo de Protocolo. Elemento: ${protocolo}, instância: ${
        Object.prototype.toString.call(protocolo).slice(8, -1) ?? "null"
      }`
    );
  }

  if (
    tabSVi &&
    tabSVi instanceof HTMLTableElement &&
    tabMedAnt &&
    tabMedAnt instanceof HTMLTableElement &&
    tabIndPerc &&
    tabIndPerc instanceof HTMLTableElement
  ) {
    const inpsWeight =
      tabMedAnt.querySelectorAll(".inpWeight") ||
      tabMedAnt.querySelectorAll(".tabCelRowMedAnt2");
    const inpsHeight =
      tabMedAnt.querySelectorAll(".inpHeight") ||
      tabMedAnt.querySelectorAll(".tabInpRowMedAnt3");
    const inpsSumDCuts =
      tabDC.querySelectorAll(".inpSumDCut") ||
      tabDC.querySelectorAll(".tabInpRowDCut9");
    const tabBtnsInd = tabIndPerc.getElementsByClassName("tabBtnInd");
    const tabBtnsIndArray = Array.from(tabBtnsInd).filter(
      (btn) => btn instanceof HTMLButtonElement
    );

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

    //validação relação de options e colunas
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
    if (areColGroupsSimilar && numConsElement instanceof HTMLSelectElement) {
      const switchElements = [
        consTablesFs,
        numConsElement,
        tabSVi,
        tabMedAnt,
        tabDC,
        tabIndPerc,
      ];
      const filteredSwitchElements = switchElements.filter(
        (switchElement): switchElement is HTMLElement =>
          switchElement instanceof HTMLElement
      );
      if (filteredSwitchElements.length === 6) {
        numConsElement.addEventListener("change", () => {
          Handlers.switchRequiredCols(filteredSwitchElements);
        });

        let numCons = parseInt(numConsElement?.value || "1");
        console.log("numcons " + numCons);
        /*validações com base em títulos (textContent da primeira célula à esquerda) de rows 
              + adição de listeneres de input para capturar mudança nos inputs validados e atribuir às propriedades de person*/
        const inpWeightRowTitle =
          tabMedAnt.querySelector(`#tabCelRowMedAnt2_1`);
        let targInpWeight: Element | null = null;
        if (
          inpWeightRowTitle &&
          inpWeightRowTitle.textContent?.match(/Peso/g)
        ) {
          targInpWeight = tabMedAnt.querySelector(
            `#tabInpRowMedAnt2_${numCons + 1}`
          );
          if (targInpWeight instanceof HTMLInputElement) {
            person.weight = parseInt(targInpWeight.value || "0", 10);
            targInpWeight.addEventListener("input", () => {
              const returnedWeight =
                Handlers.updateSimpleProperty(
                  targInpWeight as HTMLInputElement
                ) || 0;
              if (typeof returnedWeight === "number") {
                person.weight = returnedWeight;
              } else if (typeof returnedWeight === "string") {
                person.weight = parseInt(
                  returnedWeight.replaceAll(/[^0-9.,+-]/g, "") || "0"
                );
              }
              console.log("weight " + person.weight);
            });
          } else {
            console.error(`Erro validando Campo de Peso para o número da consulta.
                    Instância obtida: ${
                      Object.prototype.toString
                        .call(targInpWeight)
                        .slice(8, -1) ?? "null"
                    }.`);
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de Peso.
                  Elemento obtido: ${inpWeightRowTitle || "null"};
                  Título obtido: ${inpWeightRowTitle?.textContent || "null"}.`);
        }

        const inpHeightRowTitle = tabMedAnt.querySelector(
          "#tabCelRowMedAnt3_1"
        );
        let targInpHeight: Element | null = null;
        if (
          inpHeightRowTitle &&
          inpHeightRowTitle.textContent?.match(/Altura/g)
        ) {
          targInpHeight = tabMedAnt.querySelector(
            `#tabInpRowMedAnt3_${numCons + 1}`
          );
          if (targInpHeight instanceof HTMLInputElement) {
            person.height = parseInt(targInpHeight.value || "0", 10);
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
            console.log("height " + person.height);
          } else {
            console.error(`Erro validando Campo de Altura para o número da consulta.
                    Instância obtida: ${
                      Object.prototype.toString
                        .call(targInpHeight)
                        .slice(8, -1) ?? "null"
                    }.`);
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de Altura.
                  Elemento obtido: ${inpHeightRowTitle || "null"};
                  Título obtido: ${inpHeightRowTitle?.textContent || "null"}.`);
        }

        const inpSumDCutRowTitle = tabDC.querySelector("#tabCelRowDCut9_1");
        let targInpSumDCut: Element | null = null;
        if (
          inpSumDCutRowTitle &&
          inpSumDCutRowTitle.textContent?.match(/Soma/g)
        ) {
          targInpSumDCut = tabDC.querySelector(
            `#tabInpRowDCut9_${numCons + 1}`
          );
          if (targInpSumDCut instanceof HTMLInputElement) {
            person.sumDCut = parseInt(targInpSumDCut.value || "0", 10);
            targInpSumDCut.addEventListener("input", () => {
              const returnedSumDCut =
                Handlers.updateSimpleProperty(
                  targInpSumDCut as HTMLInputElement
                ) || 0;
              if (typeof returnedSumDCut === "number") {
                person.sumDCut = returnedSumDCut;
              } else if (typeof returnedSumDCut === "string") {
                person.sumDCut = parseInt(
                  returnedSumDCut.replaceAll(/[^0-9.,+-]/g, "") || "0"
                );
              }
              console.log("sumdcut " + person.sumDCut);
            });
          } else {
            console.error(`Erro validando Campo de Soma de Dobras Cutâneas para o número da consulta.
                    Instância obtida: ${
                      Object.prototype.toString
                        .call(targInpSumDCut)
                        .slice(8, -1) ?? "null"
                    }.`);
          }
        } else {
          console.error(`Erro validando Título da Row para Campos de Soma de Dobras Cutâneas.
                  Elemento obtido: ${inpSumDCutRowTitle || "null"};
                  Título obtido: ${inpWeightRowTitle?.textContent || "null"}`);
        }
      }
    } else {
      console.error(`Erro validando Campo de Consulta em Leitura.
        Instância obtida: ${
          Object.prototype.toString.call(numConsElement).slice(8, -1) ?? "null"
        }
        Col Groups similares: ${areColGroupsSimilar}`);
    }

    //classifica person
    if (person && Object.keys(person).length === 7) {
      person = Model.generatePersonInstance(person);
      console.log(`PERSON INICIAL INSTANCIADA ${JSON.stringify(person)}`);
    } else {
      console.error(`Erro validando person para a geração de instância.
      Objeto obtido: ${JSON.stringify(person) ?? "null"};
      Número obtido de propriedades: ${
        Object.keys(person).length ?? 0
      }; Número aceito: 6`);
    }

    //adiciona listeneres nos botões de índices tabelados
    if (
      person instanceof Man ||
      person instanceof Woman ||
      person instanceof Neutro
    ) {
      IMCBtns.forEach((imcbtn) => {
        imcbtn.addEventListener("click", () => {
          IMCMLGArray = (person as Man | Woman | Neutro).calcIMC(
            person as Man | Woman | Neutro
          ) ?? ["", 0, 0];
          if (
            IMCMLGArray[0] === "" ||
            IMCMLGArray[1] === 0 ||
            IMCMLGArray[2] === 0
          ) {
            console.warn(`IMCMLGArray não atualizado.
              Valores obtidos: ${IMCMLGArray[0] ?? "null"}; ${
              IMCMLGArray[1] ?? 0
            }; ${IMCMLGArray[2] ?? 0} }`);
          }
        });
      });

      MLGBtns.forEach((mlgbtn) => {
        mlgbtn.addEventListener("click", () => {
          IMCMLGArray = (person as Man | Woman | Neutro).calcIMC(
            person as Man | Woman | Neutro
          ) ?? ["", 0, 0];
          if (
            IMCMLGArray[0] === "" ||
            IMCMLGArray[1] === 0 ||
            IMCMLGArray[2] === 0
          ) {
            console.warn(`IMCMLGArray não atualizado.
              Valores obtidos: ${IMCMLGArray[0] ?? "null"}; ${
              IMCMLGArray[1] ?? 0
            }; ${IMCMLGArray[2] ?? 0} }`);
          }
        });
      });

      PGCBtns.forEach((pgcbtn) => {
        pgcbtn.addEventListener("click", () => {
          PGC =
            (person as Man | Woman | Neutro).calcPGC(
              person as Man | Woman | Neutro
            ) ?? 0;
          console.warn(`Valor de PGC não atualizado.
            Valor obtido: 0`);
        });
      });

      //TODO PROTEÇÃO CONTRA LOOPS INFINITOS
      //TODO ADICIONAR VERIFICAÇÕES EM CONTROLERS AG E ODONTO
      //TODO DETERMINAR COMO OBTER atLvl e factorAtleta
      TMBBtns.forEach((tmbbtn) => {
        tmbbtn.addEventListener("click", () => {
          if (IMCMLGArray.length === 3) {
            TMBArray = (person as Man | Woman | Neutro).calcTMB(
              person as Man | Woman | Neutro,
              IMCMLGArray[1],
              factorAtleta,
              IMCMLGArray[2]
            ) ?? ["", 0];
          } else {
            console.error(
              `Erro validando argumentos.
                IMC obtido: ${IMCMLGArray[1]};
                MLG obtido: ${IMCMLGArray[2]};
                factorAtleta obtido: ${factorAtleta}`
            );
          }
        });
      });

      //TODO DETERMINAR COMO OBTER factoAtLvl
      GETBtns.forEach((getbtn) => {
        getbtn.addEventListener("click", () => {
          if (TMBArray.length === 2 && factorAtLvl) {
            GET =
              (person as Man | Woman | Neutro).calcGET(
                TMBArray[1],
                factorAtLvl
              ) ?? 0;
          } else {
            console.error(
              `Valor de TMB obtido: ${TMBArray[1]};
              factorAtLvl obtido: ${factorAtLvl ?? 0}`
            );
          }
        });
      });
    } else {
      console.error(
        `Erro validando person. Elemento: ${person}; instância: ${
          Object.prototype.toString.call(person).slice(8, -1) ?? "null"
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
        }, instância: ${Object.prototype.toString
        .call(tabMedAnt)
        .slice(8, -1)}; 
        Tabela de Índices: elemento ${
          JSON.stringify(tabIndPerc) ?? "null"
        }, instância ${
        Object.prototype.toString.call(tabIndPerc).slice(8, -1) ?? "null"
      }`
    );
  }
} else {
  console.error(
    `Erro validando Tabela de Dobras Cutâneas: elemento ${tabDC}, instância ${
      Object.prototype.toString.call(tabDC).slice(8, -1) ?? "null"
    }`
  );
}
