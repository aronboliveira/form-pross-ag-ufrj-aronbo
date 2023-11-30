import * as Model from "./model.js";
import * as Handlers from "./handlers.js";
import * as Classes from "./classes.js";

const textareas: NodeListOf<HTMLTextAreaElement> =
  document.querySelectorAll("textarea");
const textInputs: NodeListOf<HTMLInputElement> =
  document.querySelectorAll('input[type="text"]');
const textConts: (HTMLTextAreaElement | HTMLInputElement)[] = [
  ...textareas,
  ...textInputs,
];
const gen = document.getElementById("genId");
const genBirthRel = document.getElementById("genBirthRelId");
const genTrans = document.getElementById("genTransId");
const genFisAlin = document.getElementById("genFisAlinId");
const textBodytype = document.getElementById("textBodytype");
const age = document.getElementById("ageId");
const lvlAtvFis = document.getElementById("selectLvlAtFis");
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
const resetFormBtn: HTMLElement | null =
  document.getElementById("resetFormBtn");
const subButton: HTMLElement | null =
  document.getElementById("submitFormButId");

textConts.forEach(function (textCont: HTMLTextAreaElement | HTMLInputElement) {
  textCont.addEventListener("input", function (input: Event): void {
    if (
      input.target &&
      (input.target instanceof HTMLTextAreaElement ||
        input.target instanceof HTMLInputElement)
    ) {
      Model.autoCapitalizeInputs(input.target);
    }
  });
});

numInps.forEach(function (numInp: HTMLInputElement) {
  numInp.addEventListener("input", function (input: Event): void {
    if (input.target && input.target instanceof HTMLInputElement) {
      Model.numberLimit(input.target);
    }
  });
});

if (radioButtons) {
  radioButtons.forEach((radio: HTMLInputElement) => {
    radio.addEventListener("keydown", (keydown: KeyboardEvent): void => {
      Handlers.opRadioHandler(keydown);
    });
    radio.addEventListener("change", (): void => Handlers.cpbInpHandler(radio));
    radio.addEventListener("keydown", (): void =>
      Handlers.cpbInpHandler(radio)
    );
    radio.addEventListener("dblclick", Handlers.doubleClickHandler);
  });
} else {
  console.warn("Radios não encontrados");
}

function checkAllGenConts(
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

let areAllGenContChecked = checkAllGenConts(
  gen as HTMLSelectElement,
  genBirthRel as HTMLSelectElement,
  genTrans as HTMLSelectElement,
  genFisAlin as HTMLSelectElement
);

if (
  areAllGenContChecked &&
  gen instanceof HTMLSelectElement &&
  textBodytype &&
  textBodytype instanceof HTMLSelectElement
) {
  let genValue: string | undefined = gen?.value;
  if (typeof genValue === "string") {
    gen?.addEventListener("change", () => {
      genValue = Model.fluxGen(
        gen as HTMLSelectElement,
        gen?.value,
        genBirthRel as HTMLSelectElement,
        genTrans as HTMLSelectElement,
        genFisAlin as HTMLSelectElement
      );
      console.log("gen value " + genValue);
      textBodytype.value = genValue as string;
    });
    genBirthRel?.addEventListener("change", () => {
      genValue = Model.fluxGen(
        gen as HTMLSelectElement,
        gen?.value,
        genBirthRel as HTMLSelectElement,
        genTrans as HTMLSelectElement,
        genFisAlin as HTMLSelectElement
      );
      console.log("gen value " + genValue);
      textBodytype.value = genValue as string;
    });
    genTrans?.addEventListener("change", () => {
      genValue = Model.fluxGen(
        gen as HTMLSelectElement,
        gen?.value,
        genBirthRel as HTMLSelectElement,
        genTrans as HTMLSelectElement,
        genFisAlin as HTMLSelectElement
      );
      console.log("gen value " + genValue);
      textBodytype.value = genValue as string;
    });
    genFisAlin?.addEventListener("change", () => {
      genValue = Model.fluxGen(
        gen as HTMLSelectElement,
        gen?.value,
        genBirthRel as HTMLSelectElement,
        genTrans as HTMLSelectElement,
        genFisAlin as HTMLSelectElement
      );
      console.log("gen value " + genValue);
      textBodytype.value = genValue as string;
    });
  }
} //TS não reconhece o filtro feito pela função anterior

comorbBtnsArray.forEach((comorbBtn: Element) => {
  if (comorbBtn && comorbBtn instanceof HTMLButtonElement) {
    comorbBtn.addEventListener("click", (): void =>
      Handlers.addRowComorb(comorbBtn)
    );
  }
});

ativFisContainerBtnsArray.forEach((ativFisContainerBtn: Element) => {
  if (ativFisContainerBtn && ativFisContainerBtn instanceof HTMLButtonElement) {
    ativFisContainerBtn.addEventListener("click", (): void =>
      Handlers.addRowAtivFis(ativFisContainerBtn)
    );
  }
});

dateBtns.forEach(function (dateBtn: HTMLButtonElement) {
  dateBtn.addEventListener("click", function (activation: MouseEvent): void {
    return Handlers.useCurrentDate(activation, dateBtn);
  });
});

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

deactAutocorrectBtns.forEach(function (
  deactAutocorrectBtn: HTMLButtonElement
): void {
  deactAutocorrectBtn.addEventListener(
    "click",
    function (click: MouseEvent): void {
      return Model.switchAutocorrect(click, deactAutocorrectBtn);
    }
  );
});

astDigtBtns.forEach(function (astDigtBtn: HTMLButtonElement): void {
  astDigtBtn.addEventListener("click", function (click: MouseEvent): void {
    return Handlers.changeToAstDigit(click, astDigtBtn);
  });
});

if (subButton) {
  subButton.addEventListener("click", Handlers.subForm);
} else {
  console.warn("Botão de Submeter não encontrado");
}

if (resetFormBtn) {
  resetFormBtn.addEventListener("click", (click: MouseEvent): void =>
    Handlers.resetarFormulario(click, astDigtBtns)
  );
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

//TODO AGUARDAR REUNIÃO
//TODO INCLUIR CÁLCULO DE IMC/TMC/GET
//TODO FINALIZAR CÁLCULO DE PGC
function applyIndexesCalc(
  gen: HTMLSelectElement,
  age: HTMLInputElement,
  sumDCut: HTMLInputElement,
  weight: HTMLInputElement,
  height: HTMLInputElement
) {
  let person = {};
  if (gen instanceof HTMLSelectElement) {
    if (gen.value === "masculino") {
      person = new Classes.Man(30, 70, 170, 60); //TODO VALORES HARDCODED PARA FINS DE TESTE
      // person = new Classes.Man(age, weight, height, sumDCut);
    } else if (gen.value === "feminino") {
      person = new Classes.Woman(30, 70, 170, 60);
      // person = new Classes.Woman(age, weight, height, sumDCut);
    }
    if (person) {
    }
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

  sumDCBtns.forEach((sumDCBtn) => {
    sumDCBtn?.addEventListener("click", () => {
      if (rowsDCArray) Handlers.createArraysRels(sumDCBtn?.id, rowsDCArray);
    });
  });

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
        `Erro validando campo de Bodytype. Elemento: ${protocolo}, instância: ${Object.prototype.toString
          .call(textBodytype)
          .slice(8, -1)}`
      );
    }
  } else {
    console.warn(
      `Erro validando campo de Protocolo. Elemento: ${protocolo}, instância: ${Object.prototype.toString
        .call(protocolo)
        .slice(8, -1)}`
    );
  }

  if (tabMedAnt && tabIndPerc) {
    const weightCells: NodeListOf<HTMLInputElement> =
      tabMedAnt.querySelectorAll('input^=["tabInpRowMedAnt2"]');
    const heightCells: NodeListOf<HTMLInputElement> =
      tabMedAnt.querySelectorAll('input^=["tabInpRowMedAnt3"]');
    const tabBtnsInd = tabIndPerc.getElementsByClassName("tabBtnInd");
    const tabBtnsIndArray = Array.from(tabBtnsInd).filter(
      (btn) => btn instanceof HTMLButtonElement
    );

    if (gen instanceof HTMLSelectElement && age instanceof HTMLInputElement) {
      tabBtnsIndArray?.forEach((tabBtnInd) => {
        tabBtnInd?.addEventListener("click", () => {
          applyIndexesCalc(
            gen,
            age,
            sumDCInps[0],
            weightCells[0],
            heightCells[0]
          );
        });
      });
    }
  } else {
    console.warn(
      `Erro validando Tabelas. Tabela de Medidas Antropométricas: elemento ${tabMedAnt}, instância: ${Object.prototype.toString
        .call(tabMedAnt)
        .slice(
          8,
          -1
        )}; Tabela de Índices: elemento ${tabIndPerc}, instância ${Object.prototype.toString
        .call(tabIndPerc)
        .slice(8, -1)}`
    );
  }
} else {
  console.warn(
    `Erro validando Tabela de Dobras Cutâneas: elemento ${tabDC}, instância ${Object.prototype.toString
      .call(tabDC)
      .slice(8, -1)}`
  );
}
