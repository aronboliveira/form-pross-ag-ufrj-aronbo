//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM
"use strict";
import * as AGHandlers from "./aGHandlers.js";
import * as AGModel from "./aGModel.js";
import * as GlobalModel from "../../globalScripts/src/gModel.js";
import * as GlobalHandler from "../../globalScripts/src/gHandlers.js";
import * as ErrorHandler from "../../globalScripts/src/errorHandler.js";
import {
  JSONStorager,
  JSONTitleStorager,
} from "../../globalScripts/src/classes.js";
import type { targEl, entryEl } from "../../globalScripts/src/types.js";

//inicialização de constantes percorrendo o DOM
const inputs = document.querySelectorAll("input");
const textInputs = document.querySelectorAll('input[type="text"]');
const textareas = document.querySelectorAll("textarea");
const textConts = [...textareas, ...textInputs];
const numInps = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const selects = document.querySelectorAll("select");
// const checkboxes = document.querySelectorAll('input[type="checkbox"]');
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
  ...inputs,
  ...textareas,
  ...selects,
  editableCite,
]).flat(1);
const JSONBtn = document.getElementById("btnJSON");
let JSONLink: HTMLAnchorElement;
// let shouldRegenerateBtn = false;

//validação de constantes obtidas e aplicação de listeners/callbacks
if (JSONBtn instanceof HTMLButtonElement && allInputs.length > 0) {
  let formDescription:
    | (JSONStorager[] | JSONTitleStorager[] | string[] | null)[]
    | undefined = [];
  JSONBtn.addEventListener("click", () => {
    formDescription = GlobalHandler.getJSONDesc(allInputs);
    const JSONInpsStoreStringified = (formDescription &&
      formDescription[1]) ?? [""];
    if (
      formDescription &&
      formDescription.length === 4 &&
      !formDescription.some((formDescElement) => formDescElement === null)
    ) {
      JSONLink = GlobalHandler.createJSONAnchor(
        JSONBtn,
        JSONInpsStoreStringified as string[]
      );
      if (JSONLink) {
        JSONLink.addEventListener("click", () => {
          GlobalHandler.regenerateJSONBtn(
            JSONLink,
            JSONInpsStoreStringified as string[]
          );
        });
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.elementNotFound(
          JSONLink ?? null,
          "JSONLink",
          slicedError ?? "NULL"
        );
      }
    } else {
      console.warn(`Erro obtendo formDescription`);
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotFound(
    JSONBtn ?? null,
    "JSONBtn",
    slicedError ?? "NULL"
  );
  ErrorHandler.elementNotPopulated(
    allInputs ?? null,
    "allInputs",
    slicedError ?? "NULL"
  );
}

if (textConts.length > 0) {
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
          GlobalModel.autoCapitalizeInputs(input.target);
        } else {
          const slicedError =
            new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
          ErrorHandler.inputNotFound(
            (input.target as Element) ?? null,
            "target textCont",
            slicedError ?? "NULL"
          );
        }
      });
    }
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
      if (input.target && input.target instanceof HTMLInputElement) {
        GlobalModel.numberLimit(input.target);
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.inputNotFound(
          (input.target as HTMLElement) ?? null,
          "target numInp",
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

function checkAllGenConts(
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

const areAllGenContChecked = checkAllGenConts(
  gen,
  genBirthRel,
  genTrans,
  genFisAlin
);

let genValue = (gen as entryEl)?.value ?? null;
if (areAllGenContChecked && typeof genValue === "string") {
  (gen as HTMLElement).addEventListener("change", () => {
    genValue = GlobalModel.fluxGen(
      gen as entryEl,
      (gen as entryEl).value ?? null,
      genBirthRel as entryEl,
      genTrans as entryEl,
      genFisAlin as entryEl
    );
  });
  (genBirthRel as HTMLElement).addEventListener("change", () => {
    genValue = GlobalModel.fluxGen(
      gen as entryEl,
      (gen as entryEl).value ?? null,
      genBirthRel as entryEl,
      genTrans as entryEl,
      genFisAlin as entryEl
    );
  });
  (genTrans as HTMLElement).addEventListener("change", () => {
    genValue = GlobalModel.fluxGen(
      gen as entryEl,
      (gen as entryEl).value ?? null,
      genBirthRel as entryEl,
      genTrans as entryEl,
      genFisAlin as entryEl
    );
  });
  (genFisAlin as HTMLElement).addEventListener("change", () => {
    genValue = GlobalModel.fluxGen(
      gen as entryEl,
      (gen as entryEl).value ?? null,
      genBirthRel as entryEl,
      genTrans as entryEl,
      genFisAlin as entryEl
    );
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  console.warn(`areAllGenContChecked ${areAllGenContChecked ?? false}`);
  ErrorHandler.elementNotFound(
    gen ?? null,
    "genElement",
    slicedError ?? "NULL"
  );
}

if (telInputs.length > 0) {
  telInputs.forEach((telInput) => {
    telInput.addEventListener("input", (inputTel) => {
      if (inputTel.target && inputTel.target instanceof HTMLInputElement) {
        AGModel.formatTel(inputTel.target);
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.inputNotFound(
          (inputTel?.target as HTMLElement) ?? null,
          "target inputTel",
          slicedError ?? "NULL"
        );
      }
    });
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    telInputs ?? null,
    "telInputs",
    slicedError ?? "NULL"
  );
}

if (emailInputs.length > 0) {
  emailInputs.forEach((emailInput) => {
    if (emailInput instanceof HTMLInputElement) {
      emailInput.addEventListener("click", () =>
        AGModel.addEmailExtension(emailInput)
      );
      emailInput.addEventListener("input", () =>
        AGModel.addEmailExtension(emailInput)
      );
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.inputNotFound(
        emailInput ?? null,
        `${emailInput?.id ?? "UNDEFINED ID INPUT"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    emailInputs ?? null,
    "emailInputs",
    slicedError ?? "NULL"
  );
}

if (radioButtons.length > 0) {
  radioButtons.forEach((radio) => {
    if (radio instanceof HTMLInputElement && radio.type === "radio") {
      radio.addEventListener("keydown", (keydown) => {
        GlobalHandler.opRadioHandler(keydown);
      });
      radio.addEventListener("change", () => GlobalHandler.cpbInpHandler);
      radio.addEventListener("keydown", () => GlobalHandler.cpbInpHandler);
      radio.addEventListener("dblclick", () =>
        GlobalHandler.doubleClickHandler(radio)
      );
      // radio.addEventListener("touchstart", GlobalHandler.touchStartHandler);
      radio.addEventListener("change", GlobalHandler.deactTextInput);
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.inputNotFound(
        radio ?? null,
        `${radio?.id ?? "UNDEFINED ID RADIO"}`,
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

if (antFamChecks.length > 0) {
  antFamChecks.forEach((antFamCheck) => {
    if (antFamCheck instanceof HTMLInputElement) {
      antFamCheck.addEventListener("change", () => GlobalHandler.cpbInpHandler);
      antFamCheck.addEventListener("dblclick", () =>
        GlobalHandler.doubleClickHandler(antFamCheck)
      );
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.inputNotFound(
        antFamCheck ?? null,
        `${antFamCheck.id ?? "UNDEFINED ID INPUT"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    antFamChecks ?? null,
    "antFamChecks",
    slicedError ?? "NULL"
  );
}

if (antMedContainer) {
  antMedContainer.addEventListener("click", AGHandlers.addAntMedHandler);
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotFound(null, "antMedContainer", slicedError ?? "NULL");
}

if (dateBtns.length > 0) {
  dateBtns.forEach(function (dateBtn) {
    if (dateBtn instanceof HTMLButtonElement) {
      dateBtn.addEventListener("click", (activation) => {
        GlobalHandler.useCurrentDate(activation, dateBtn);
      });
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        dateBtn ?? null,
        `${dateBtn?.id ?? "UNDEFINED ID DATE BUTTON"}`,
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

if (
  cepElement &&
  cepElement instanceof HTMLInputElement &&
  cepElementBtn &&
  cepElementBtn instanceof HTMLButtonElement
) {
  cepElement.addEventListener("input", () => AGModel.formatCEP(cepElement));
  cepElement.addEventListener("input", () => {
    const isCepBtnOff = AGHandlers.enableCEPBtn(
      cepElement.value.length,
      cepElementBtn
    );
    if (
      cepElementBtn &&
      cepElementBtn instanceof HTMLButtonElement &&
      !isCepBtnOff
    ) {
      cepElementBtn.addEventListener("click", () =>
        AGHandlers.searchCEP(cepElement)
      );
    } else if (!(cepElementBtn instanceof HTMLButtonElement)) {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      console.warn(`isCepBtnOff + ${isCepBtnOff ?? false}`);
      ErrorHandler.elementNotFound(
        cepElementBtn ?? null,
        "cepElementBtn",
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.multipleElementsNotFound(
    slicedError ?? "NULL",
    "Elements para CEP",
    cepElement ?? null,
    cepElementBtn ?? null
  );
}

if (qxPrinc && qxPrinc instanceof HTMLTextAreaElement) {
  qxPrinc.addEventListener("click", () => AGModel.addDblQuotes(qxPrinc));
  qxPrinc.addEventListener("input", () => AGModel.addDblQuotes(qxPrinc));
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotFound(
    qxPrinc ?? null,
    "qxPrinc",
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
        (click?.target as HTMLElement) ?? null,
        "click target editableCite",
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
        (keypress?.target as HTMLElement) ?? null,
        "keypress target editableCite",
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
    if (deactAutocorrectBtn instanceof HTMLButtonElement) {
      deactAutocorrectBtn.addEventListener("click", function (click) {
        return GlobalModel.switchAutocorrect(click, deactAutocorrectBtn);
      });
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotPopulated(
        deactAutocorrectBtns ?? null,
        `${deactAutocorrectBtn?.id ?? "UNDEFINED ID BUTTON"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotPopulated(
    deactAutocorrectBtns ?? null,
    "deactAutoCorrectBtns",
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
        astDigtBtn?.id ?? "UNDEFINED ID BUTTON",
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
  resetFormBtn.addEventListener("click", (click) =>
    GlobalHandler.resetarFormulario(
      click,
      astDigtBtns as NodeListOf<HTMLButtonElement>
    )
  );
} else {
  const slicedError =
    new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
  ErrorHandler.elementNotFound(
    resetFormBtn ?? null,
    "resetFormBtn",
    slicedError ?? "NULL"
  );
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
