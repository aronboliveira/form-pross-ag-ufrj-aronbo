import * as Model from "./model.js";
import * as Handlers from "./handlers.js";
import { Man, Woman, Neutro } from "./classes.js";

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
const IMCBtns = Array.from(document.getElementsByClassName("tabBtnImc"));
const MLGBtns = Array.from(document.getElementsByClassName("tabBtnMlg"));
const PGCBtns = Array.from(document.getElementsByClassName("tabBtnPgc"));
const TMBBtns = Array.from(document.getElementsByClassName("tabBtnTmb"));
const GETBtns = Array.from(document.getElementsByClassName("tabBtnGet"));
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");
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
let numCons = 0;
let numColsCons = 0;
let areColGroupsSimilar = false;
let areNumConsOpsValid = false;
let IMCMLGArray = ["", 0, 0];
let PGC = 0;
let factorAtLvl = 0;
let GET = 0;
let factorAtleta = "";
let TMBArray = [];
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
        console.log("PERSON ATUALIZADA APÓS INPUT DE AGE " + person);
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
  Tipo obtido: ${ageElement?.type ?? "null"}`);
}

//obtenção de .atvLvl
if (atvLvlElement instanceof HTMLSelectElement) {
  person.atvLvl = atvLvlElement?.value;
  if (
    person.atvLvl === "sedentario" ||
    person.atvLvl === "leve" ||
    person.atvLvl === "moderado" ||
    person.atvLvl === "intenso" ||
    person.atvLvl === "muitoIntenso"
  ) {
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
    console.error(`Erro validando value de Nível de Atividade Física.
        Valor obtido: ${person.atvLvl ?? "null"}
        Valore aceitos: sedentario || leve || moderado || intenso || muitoIntenso`);
  }
} else {
  console.error(`Erro validando Elemento de Nível de Atividade Física.
      Instância obtida: ${
        Object.prototype.toString.call(atvLvlElement).slice(8, -1) ?? "null"
      };`);
}

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
        console.warn(`Erro validando Elemento de Texto para listener de input.
        Elemento obtido: ${input?.target ?? "null"};
        Instância obtida: ${
          Object.prototype.toString.call(input?.target).slice(8, -1) ?? "null"
        };
        Tipo obtido (válido somente para <input>): ${
          input.target?.type ?? "null"
        }`);
      }
    });
  });
} else {
  console.error(`Erro validando array de textos.
  Length obtida: ${textConts?.length ?? "0"}`);
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
        console.warn(`Erro validando Input Numérico para listener de input.
        Elemento obtido: ${input?.target ?? "null"};
        Instância obtida: ${
          Object.prototype.toString.call(input?.target).slice(8, -1) ?? "null"
        };
        Tipo obtido (válido somente para <input>): ${
          input.target?.type ?? "null"
        }`);
      }
    });
  });
} else {
  console.error(`Erro validando NodeList de Inputs Numéricos.
  Length obtida: ${numInps?.length ?? "0"}`);
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
      console.warn(`Erro validando Input de Radio.
      Instância obtida: ${
        Object.prototype.toString.call(radio).slice(8, -1) ?? "null"
      };
      Tipo obtido: ${radio?.type ?? "null"} `);
    }
  });
} else {
  console.error(
    `Erro validando NodeList de Inputs de Radio. Length obtida: ${
      radioButtons?.length ?? "0"
    }`
  );
}

if (comorbBtnsArray.length > 0) {
  comorbBtnsArray.forEach((comorbBtn) => {
    if (comorbBtn && comorbBtn instanceof HTMLButtonElement) {
      comorbBtn.addEventListener("click", () =>
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
  Length obtida: ${comorbBtnsArray?.length ?? "0"}.`);
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
      console.warn(`Erro validando Botão sobre Atividade Física.
      Instância obtida: ${
        Object.prototype.toString.call(ativFisContainerBtn).slice(8, -1) ??
        "null"
      }.`);
    }
  });
} else {
  console.error(`Erro validando array de Botões sobre Atividades Física.
  Length obtida: ${ativFisContainerBtnsArray?.length ?? "0"}.`);
}

if (dateBtns.length > 0) {
  dateBtns.forEach(function (dateBtn) {
    if (dateBtn instanceof HTMLButtonElement) {
      dateBtn.addEventListener("click", function (activation) {
        return Handlers.useCurrentDate(activation, dateBtn);
      });
    } else {
      console.warn(`Erro validando Botão de Date.
      Instância obtida: ${
        Object.prototype.toString.call(dateBtn).slice(8, -1) ?? "null"
      };`);
    }
  });
} else {
  console.error(`Erro validando NodeList de Inputs de Date.
  Length Obtida: ${dateBtns?.length ?? "0"}.`);
}

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
} else {
  console.warn("Cite editável não encontrado");
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
      console.warn(`Erro validando Botão para desativar autocorreção.
      Instância obtida: ${
        Object.prototype.toString.call(deactAutocorrectBtn).slice(8, -1) ??
        "null"
      }.`);
    }
  });
} else {
  console.error(`Erro validando NodeList de Botões para desativar autocorreção.
  Length obtida: ${deactAutocorrectBtns?.length ?? "0"}`);
}

if (astDigtBtns.length > 0) {
  astDigtBtns.forEach(function (astDigtBtn) {
    if (astDigtBtn instanceof HTMLButtonElement) {
      astDigtBtn.addEventListener("click", function (click) {
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

export function cursorCheckTimer(cursorPosition) {
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
  }
}

if (tabDC && tabDC instanceof HTMLTableElement) {
  const rowsDC = tabDC.getElementsByClassName("tabRowDCut");
  const rowsDCArray = Array.from(rowsDC).filter(
    (rowDC) => rowDC instanceof HTMLTableRowElement
  );
  const sumDCBtns = tabDC.querySelectorAll('button[id^="sumDCBtn"]');
  const sumDCInps = tabDC.querySelectorAll('input[id^="tabInpRowDCut9"]');
  const protocolo = document.getElementById("tabSelectDCutId");

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
      Model.changeTabDCutLayout(protocolo, tabDC)
    );
    if (textBodytype && textBodytype instanceof HTMLSelectElement) {
      textBodytype.addEventListener("change", () =>
        Model.changeTabDCutLayout(protocolo, tabDC)
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
        numConsElement?.lastElementChild?.value ?? "1",
        10
      )}`);
    }

    //faz a leitura do número de consulta
    if (
      areColGroupsSimilar &&
      numConsElement instanceof HTMLSelectElement &&
      areNumConsOpsValid
    ) {
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
        let targInpWeight = null;
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
                Handlers.updateSimpleProperty(targInpWeight) || 0;
              if (typeof returnedWeight === "number") {
                person.weight = returnedWeight;
              } else if (typeof returnedWeight === "string") {
                person.weight =
                  parseInt(returnedWeight.replaceAll(/[^0-9.,+-]/g, "")) || "0";
              }
              console.log("PERSON WEIGHT APÓS UPDATE " + person.weight);
            });
            // console.log("PERSON WEIGHT APÓS UPDATE " + person.weight);
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
        let targInpHeight = null;
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
              Handlers.updateSimpleProperty(targInpHeight) || 0;
            if (typeof returnedHeight === "number") {
              person.height = returnedHeight;
            } else if (typeof returnedHeight === "string") {
              person.height = parseInt(
                returnedHeight.replaceAll(/[^0-9.,+-]/g, "") || "0"
              );
            }
            console.log("PERSON HEIGHT APÓS UPDATE " + person.height);
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
        let targInpSumDCut = null;
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
                Handlers.updateSimpleProperty(targInpSumDCut) || 0;
              if (typeof returnedSumDCut === "number") {
                person.sumDCut = returnedSumDCut;
              } else if (typeof returnedSumDCut === "string") {
                person.sumDCut = parseInt(
                  returnedSumDCut.replaceAll(/[^0-9.,+-]/g, "") || "0"
                );
              }
            });
            console.log("SUMDCUT APÓS UPDATE " + person.sumDCut);
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

    //inicia captura de propriedades nas tabelas
    //TODO FINALIZAR LÓGICA DOS BOTÕES

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
          IMCMLGArray = person.calcIMC(person) ?? ["", 0, 0];
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
          IMCMLGArray = person.calcIMC(person) ?? ["", 0, 0];
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
          PGC = person.calcPGC(person) ?? 0;
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
            TMBArray = person.calcTMB(
              person,
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
            GET = person.calcGET(TMBArray[1], factorAtLvl) ?? 0;
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
