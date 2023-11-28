import * as Handlers from "./handlers.js";
import * as Model from "./model.js";

const textInputs = document.querySelectorAll('input[type="text"]');
const textareas = document.querySelectorAll("textarea");
const textConts = [...textareas, ...textInputs];
const numInps = document.querySelectorAll('input[type="number"]');
const radioButtons = document.querySelectorAll('input[type="radio"]');
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
  radio.addEventListener("dblclick", () =>
    Handlers.doubleClickHandler.bind(radio)
  );
  radio.addEventListener("touchstart", Handlers.touchStartHandler);
  radio.addEventListener("change", Handlers.deactTextInput);
});

antFamChecks.forEach((antFamCheck) => {
  antFamCheck.addEventListener("change", Handlers.cpbInpHandler);
  antFamCheck.addEventListener("dblclick", Handlers.doubleClickHandler);
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
