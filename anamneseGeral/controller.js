import * as Handlers from "./handlers.js";
import * as Model from "./model.js";
import * as Classes from "./classes.js";

const textInputs = document.querySelectorAll('input[type="text"]');
const textareas = document.querySelectorAll("textarea");
const textConts = [...textareas, ...textInputs];
const numInps = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const gen = document.getElementById("genId");
const genBirthRel = document.getElementById("genBirthRelId");
const genTrans = document.getElementById("genTransId");
const genFisAlin = document.getElementById("genFisAlinId");
const antFamChecks = document.querySelectorAll("input[id^='antFam']");
const antMedContainer = document.getElementById("antMedContainer");
const telInputs = document.querySelectorAll('input[type="text"][id^="tel"]');
const emailInputs = document.querySelectorAll('input[id^="email"]');
const cepElement = document.getElementById("cepId");
const cepElementBtn = document.getElementById("autoCompCepBtn");
const qxPrinc = document.getElementById("qxPrinc");
const editableCite = document.querySelector('cite[contenteditable="true"]');
const astDigtBtns = document.querySelectorAll('button[id$="AstDigtBtn');
const deactAutocorrectBtns = document.querySelectorAll(
  'button[id^="deactAutocorrectBtn"]'
);
const dateBtns = document.querySelectorAll('button[id$="DatBtn"]');
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");
const allInputs = Array.from([
  ...textConts,
  editableCite,
  ...numInps,
  ...radioButtons,
  ...checkboxes,
]).flat(1);
let JSONBtn = document.getElementById("btnJSON");

let JSONLink;
let shouldRegenerateBtn = false;

if (allInputs.length > 0) {
  if (JSONBtn) {
    let formDescription = [];
    JSONBtn.addEventListener("click", () => {
      formDescription = Handlers.getJSONDesc(allInputs);
      if (formDescription && formDescription[0] && formDescription[1]) {
        JSONLink = Handlers.createJSONAnchor(JSONBtn, formDescription[1]);
        if (JSONLink) {
          console.log("jsonlink");
          JSONLink.addEventListener("click", () => {
            Handlers.regenerateJSONBtn(JSONLink, formDescription[1]);
          });
        }
      } else {
        console.warn(`Erro obtendo formDescription`);
      }
    });
  } else {
    console.warn(
      `Erro validando JSONBtn. Elementos: ${JSONBtn?.id} && ${allInputs.length}`
    );
  }
}

// const handleMutation = (mutationsList, observer) => {
//   for (const mutation of mutationsList) {
//     if (mutation.type === "childList") {
//       // Verifica se o JSONBtn foi removido e o JSONLink foi adicionado
//       const JSONBtnRemoved = mutation.removedNodes[0] === JSONBtn;
//       const JSONLinkAdded = Array.from(mutation.addedNodes).some(
//         (node) => node === JSONLink
//       );

//       if (JSONBtnRemoved && JSONLinkAdded) {
//         // Lógica a ser executada quando a troca ocorrer
//         console.log("JSONBtn foi removido, e JSONLink foi adicionado.");
//         // Adicione aqui qualquer lógica ou evento adicional que você deseja executar
//       }
//     }
//   }
// };

// // Função que será chamada quando houver uma mutação no DOM
// // Cria um novo observador de mutação com a função de callback
// const observer = new MutationObserver(handleMutation);

// // Configura o observador para observar mudanças no nó pai (por exemplo, o body)
// observer.observe(document.body, { childList: true, subtree: true });

textConts.forEach(function (textCont) {
  const isTelInput = textCont.classList.contains("inpTel");
  const isEmailInput = textCont.classList.contains("inpEmail");
  if (!isTelInput && !isEmailInput && !(textCont.id === "cepId")) {
    textCont.addEventListener("input", function (input) {
      if (
        input.target &&
        (input.target instanceof HTMLTextAreaElement ||
          input.target instanceof HTMLInputElement)
      ) {
        Model.autoCapitalizeInputs(input.target);
      }
    });
  }
});

numInps.forEach(function (numInp) {
  numInp.addEventListener("input", function (input) {
    if (input.target && input.target instanceof HTMLInputElement) {
      Model.numberLimit(input.target);
    }
  });
});

function checkAllGenConts(gen, genBirthRel, genTrans, genFisAlin) {
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
          genBirthRel instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGenBirthRel) {
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
          genTrans instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGenTrans) {
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
          genFisAlin instanceof HTMLSelectElement
        }`
      );
    }
  } catch (errorGenFisAlin) {
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
  gen,
  genBirthRel,
  genTrans,
  genFisAlin
);

let genValue = gen?.value;
if (areAllGenContChecked && typeof genValue === "string") {
  gen.addEventListener("change", () => {
    genValue = Model.fluxGen(gen, gen.value, genBirthRel, genTrans, genFisAlin);
  });
  genBirthRel.addEventListener("change", () => {
    genValue = Model.fluxGen(gen, gen.value, genBirthRel, genTrans, genFisAlin);
  });
  genTrans.addEventListener("change", () => {
    genValue = Model.fluxGen(gen, gen.value, genBirthRel, genTrans, genFisAlin);
  });
  genFisAlin.addEventListener("change", () => {
    genValue = Model.fluxGen(gen, gen.value, genBirthRel, genTrans, genFisAlin);
  });
} else {
  console.error(
    `Erro na aplicação de listeners para containers de gen: containers de gen válidos ${areAllGenContChecked}
    } / genValue tipo ${typeof genValue}`
  );
}

telInputs.forEach((telInput) => {
  telInput.addEventListener("input", (inputTel) => {
    if (inputTel.target && inputTel.target instanceof HTMLInputElement) {
      Model.formatTel(inputTel.target);
    }
  });
});

emailInputs.forEach((emailInput) => {
  emailInput.addEventListener("click", () =>
    Model.addEmailExtension(emailInput)
  );
  emailInput.addEventListener("input", () =>
    Model.addEmailExtension(emailInput)
  );
});

radioButtons.forEach((radio) => {
  radio.addEventListener("keydown", (keydown) => {
    Handlers.opRadioHandler(keydown);
  });
  radio.addEventListener("change", Handlers.cpbInpHandler);
  radio.addEventListener("keydown", Handlers.cpbInpHandler);
  radio.addEventListener("dblclick", () => Handlers.doubleClickHandler(radio));
  radio.addEventListener("touchstart", Handlers.touchStartHandler);
  radio.addEventListener("change", Handlers.deactTextInput);
});

antFamChecks.forEach((antFamCheck) => {
  antFamCheck.addEventListener("change", Handlers.cpbInpHandler);
  antFamCheck.addEventListener("dblclick", () =>
    Handlers.doubleClickHandler(antFamCheck)
  );
});

if (antMedContainer) {
  antMedContainer.addEventListener("click", Handlers.addAntMedHandler);
} else {
  console.warn("Erro validando Container de Antecedentes Médicos");
}

dateBtns.forEach(function (dateBtn) {
  dateBtn.addEventListener("click", (activation) => {
    Handlers.useCurrentDate(activation, dateBtn);
  });
});

if (
  cepElement &&
  cepElement instanceof HTMLInputElement &&
  cepElementBtn &&
  cepElementBtn instanceof HTMLButtonElement
) {
  cepElement.addEventListener("input", () => Model.formatCEP(cepElement));
  cepElement.addEventListener("input", () => {
    let isCepBtnOff = Handlers.enableCEPBtn(
      cepElement.value.length,
      cepElementBtn
    );
    if (
      cepElementBtn &&
      cepElementBtn instanceof HTMLButtonElement &&
      !isCepBtnOff
    ) {
      cepElementBtn.addEventListener("click", () =>
        Handlers.searchCEP(cepElement)
      );
    }
  });
} else {
  console.warn("Erro validando Inputs de CEP");
}

if (qxPrinc && qxPrinc instanceof HTMLTextAreaElement) {
  qxPrinc.addEventListener("click", () => Model.addDblQuotes(qxPrinc));
  qxPrinc.addEventListener("input", () => Model.addDblQuotes(qxPrinc));
} else {
  console.warn("Erro validando Container de Queixa Principal");
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
  console.warn("Erro validando Cite Editável");
}

deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
  deactAutocorrectBtn.addEventListener("click", function (click) {
    return Model.switchAutocorrect(click, deactAutocorrectBtn);
  });
});

astDigtBtns.forEach(function (astDigtBtn) {
  astDigtBtn.addEventListener("click", function (click) {
    return Handlers.changeToAstDigit(click, astDigtBtn);
  });
});

if (subButton) {
  subButton.addEventListener("click", Handlers.subForm);
} else {
  console.warn("Erro validando Botão de Submeter");
}

if (resetFormBtn) {
  resetFormBtn.addEventListener("click", (click) =>
    Handlers.resetarFormulario(click, astDigtBtns)
  );
} else {
  console.warn("Erro validando Botão de Resetar");
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
