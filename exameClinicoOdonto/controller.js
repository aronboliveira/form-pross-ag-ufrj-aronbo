//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM
"use strict";
import * as Handlers from "./handlers.js";
import * as Model from "./model.js";
import * as ErrorHandler from "./errorHandler.js";

//inicialização de constantes percorrendo o DOM
const textInputs = document.querySelectorAll('input[type="text"]');
const textareas = document.querySelectorAll("textarea");
const textConts = [...textInputs, ...textareas];
const radioButtons = document.querySelectorAll('input[type="radio"]');
const inspRadiosYes = document.querySelectorAll(
  'input[class="contQuint radOp radYes"]'
);
const inspRadiosNo = document.querySelectorAll(
  'input[class="contQuint radOp radNo"]'
);
const inspDialogsBtns = document.querySelectorAll(
  'button[id^="inspDialogBtn"]'
);
const inspLIBtns = document.querySelectorAll('button[id^="inspLIBtn"]');
const quadrDents = document.getElementsByClassName("quadrMainDiv");
const quadrDentsArray = Array.from(quadrDents);
const avElemDents = document.getElementsByClassName("inpAvDent");
const avElemDentsArray = Array.from(avElemDents);
const tratContainer = document.getElementById("tratContainer");
const dateBtns = document.querySelectorAll('button[id$="DatBtn"]');
const editableCite = document.querySelector('cite[contenteditable="true"]');
const deactAutocorrectBtns = document.querySelectorAll(
  'button[id^="deactAutocorrectBtn"]'
);
const astDigtBtns = document.querySelectorAll('button[id$="AstDigtBtn');
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");
const quadrInps = document.querySelectorAll('input[id^="inpD"]');
const resetDivsQuadrs = document.querySelectorAll(".resetBut");
// const inspSpanSubs = document.getElementsByClassName("inspSpanSub");
// const inspSpanSubsArray = Array.from(inspSpanSubs);
// const tratTypeSpans = document.querySelectorAll('span[id^="tratTypeSpan"]');
// const taTrats = document.querySelectorAll("textarea[id^=taTrat")
// const subDivsQuadrs = document.querySelectorAll(".quadrSubDiv");
// let selection = window.getSelection();
// let range = document.createRange();

//validação de constantes e adição de listeners
if (textConts.length > 0) {
  textConts.forEach(function (textCont) {
    textCont.addEventListener("input", function (input) {
      if (
        input.target &&
        (input.target instanceof HTMLTextAreaElement ||
          input.target instanceof HTMLInputElement)
      ) {
        Model.autoCapitalizeInputs(input.target);
      } else {
        const error = new Error();
        const splitError = error.stack?.split("\n");
        const slicedError = splitError[1].trim().slice(-7, -1);
        ErrorHandler.inputNotFound(
          input.target,
          "target textCont",
          slicedError ?? "NULL"
        );
      }
    });
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    textConts ?? null,
    "textConts",
    slicedError ?? "NULL"
  );
}

if (radioButtons.length > 0) {
  radioButtons.forEach((radio) => {
    if (radio instanceof HTMLInputElement && radio.type === "radio") {
      radio.addEventListener("keydown", (keydown) => {
        Handlers.opRadioHandler(keydown);
      });
      radio.addEventListener("dblclick", () =>
        Handlers.doubleClickHandler(radio)
      );
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.inputNotFound(
        radio ?? null,
        `${radio?.id || "UNDEFINED ID RADIO"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    radioButtons ?? null,
    "radioButtons",
    slicedError ?? "NULL"
  );
}

if (inspRadiosYes.length > 0) {
  inspRadiosYes.forEach((inspRadioYes) => {
    if (
      inspRadioYes instanceof HTMLInputElement &&
      (inspRadioYes.type === "radio" || inspRadioYes.type === "checkbox")
    ) {
      inspRadioYes.addEventListener("click", (clickRadio) =>
        Handlers.showInspSpanSub(clickRadio, inspRadioYes)
      );
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.inputNotFound(
        inspRadioYes ?? null,
        `${inspRadioYes?.id || "UNDEFINED ID YES INPUT"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    inspRadiosYes ?? null,
    "inspRadioYes",
    slicedError ?? "NULL"
  );
}

if (inspRadiosNo.length > 0) {
  inspRadiosNo.forEach((inspRadioNo) => {
    if (
      inspRadioNo instanceof HTMLInputElement &&
      (inspRadioNo.type === "radio" || inspRadioNo.type === "checkbox")
    ) {
      inspRadioNo.addEventListener("click", (clickRadio) =>
        Handlers.showInspSpanSub(clickRadio, inspRadioNo)
      );
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.inputNotFound(
        inspRadioNo ?? null,
        `${inspRadioNo?.id || "UNDEFINED ID YES INPUT"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    inspRadiosNo ?? null,
    "inspRadioNo",
    slicedError ?? "NULL"
  );
}

if (inspDialogsBtns.length > 0) {
  inspDialogsBtns.forEach((inspDialogBtn) => {
    if (inspDialogBtn instanceof HTMLButtonElement) {
      inspDialogBtn.addEventListener("click", (click) =>
        Handlers.showInspDialogs(click, inspDialogBtn)
      );
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        inspDialogBtn ?? null,
        `${inspDialogBtn?.id || "UNDEFINED ID DIALOG BUTTON"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    inspDialogsBtns ?? null,
    "inspDialogsBtns",
    slicedError ?? "NULL"
  );
}

if (inspLIBtns.length > 0) {
  inspLIBtns.forEach((inspLIBtn) => {
    if (inspLIBtn instanceof HTMLButtonElement) {
      inspLIBtn.addEventListener("click", (click) =>
        Handlers.addTextToObs(click, inspLIBtn)
      );
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        inspLIBtn ?? null,
        `${inspLIBtn?.id || "UNDEFINED ID LI BUTTON"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    inspLIBtns ?? null,
    "inspLIBtns",
    slicedError ?? "NULL"
  );
}

if (quadrDentsArray.length > 0) {
  quadrDentsArray.forEach((quadrDent) => {
    if (quadrDent instanceof HTMLElement) {
      quadrDent.addEventListener("mousemove", () =>
        Handlers.dragHover(quadrDent)
      );
      quadrDent.addEventListener("dragstart", Handlers.dragStart);
      quadrDent.addEventListener("dragenter", Handlers.dragEnter);
      quadrDent.addEventListener("dragover", Handlers.dragOver);
      quadrDent.addEventListener("dragleave", Handlers.dragLeave);
      quadrDent.addEventListener("drop", Handlers.dragDrop);
      quadrDent.addEventListener("dragend", Handlers.dragEnd);
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        quadrDent ?? null,
        `${quadrDent?.id ?? "UNDEFINED QUADRANT ID"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    quadrDentsArray ?? null,
    "quadrDentsArray",
    slicedError ?? "NULL"
  );
}

if (avElemDentsArray.length > 0) {
  avElemDentsArray.forEach((avElemDent) => {
    avElemDent.addEventListener("click", (selectInp) => {
      if (
        avElemDent instanceof HTMLButtonElement ||
        HTMLSelectElement ||
        HTMLInputElement
      ) {
        Model.resetAvDentValue(selectInp);
      } else {
        const error = new Error();
        const splitError = error.stack?.split("\n");
        const slicedError = splitError[1].trim().slice(-7, -1);
        ErrorHandler.elementNotFound(
          avElemDent ?? null,
          `${avElemDent?.id ?? "UNDEFINED ID ELEMENT"}`,
          slicedError ?? "NULL"
        );
      }
    });
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    avElemDentsArray ?? null,
    "avElemDentsArray",
    slicedError ?? "NULL"
  );
}

if (quadrInps.length > 0) {
  quadrInps.forEach((quadrInp) => {
    if (quadrInp instanceof HTMLInputElement) {
      quadrInp.addEventListener("click", () =>
        Handlers.clearQuadrInps(quadrInp)
      );
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.inputNotFound(
        quadrInp ?? null,
        `${quadrInp?.id ?? "UNDEFINED QUADRANT INPUT ID"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    quadrInps ?? null,
    "quadrInps",
    slicedError ?? "NULL"
  );
}

if (resetDivsQuadrs.length > 0) {
  resetDivsQuadrs.forEach((resetBtn) => {
    if (resetBtn instanceof HTMLButtonElement) {
      resetBtn.addEventListener("click", () => {
        Handlers.resetLabels(resetBtn);
      });
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        resetBtn ?? null,
        `${resetBtn?.id ?? "UNDEFINED ID RESET BUTTON"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    resetDivsQuadrs ?? null,
    "resetDivsQaudrs",
    slicedError ?? "NULL"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  Model.orderLabels();
});

if (tratContainer instanceof HTMLElement) {
  tratContainer.addEventListener("click", (click) =>
    Handlers.addSubDivTrat(click)
  );
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotFound(
    tratContainer ?? null,
    "tratContainer",
    slicedError ?? "NULL"
  );
}

if (dateBtns.length > 0) {
  dateBtns.forEach(function (dateBtn) {
    if (dateBtn instanceof HTMLButtonElement) {
      dateBtn.addEventListener("click", (activation) => {
        Handlers.useCurrentDate(activation, dateBtn);
      });
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        dateBtn ?? null,
        `${dateBtn?.id || "UNDEFINED ID DATE BUTTON"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    dateBtns ?? null,
    "dateBtns",
    slicedError ?? "NULL"
  );
}

if (editableCite) {
  let firstClick = true;
  const citeClickHandler = function (click) {
    if (firstClick && click.target && click.target instanceof HTMLElement) {
      Model.removeFirstClick(click.target);
      firstClick = false;
      editableCite.removeEventListener("click", citeClickHandler);
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        click.target ?? null,
        "click target editableCite",
        slicedError ?? "NULL"
      );
    }
  };
  editableCite.addEventListener("keyup", function (keypress) {
    if (keypress.target && keypress.target instanceof HTMLElement) {
      Model.autoCapitalizeCite(keypress.target);
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        keypress.target ?? null,
        "keypress target editableCite",
        slicedError ?? "NULL"
      );
    }
  });
  editableCite.addEventListener("click", citeClickHandler);
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotFound(null, "editableCite", slicedError ?? "NULL");
}

if (astDigtBtns.length > 0) {
  astDigtBtns.forEach(function (astDigtBtn) {
    if (astDigtBtn instanceof HTMLButtonElement) {
      astDigtBtn.addEventListener("click", function (click) {
        return Handlers.changeToAstDigit(click, astDigtBtn);
      });
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotFound(
        astDigtBtn ?? null,
        astDigtBtn?.id || "UNDEFINED ID BUTTON",
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    astDigtBtns ?? null,
    "astDigtBtns",
    slicedError ?? "NULL"
  );
}

if (deactAutocorrectBtns.length > 0) {
  deactAutocorrectBtns.forEach(function (deactAutocorrectBtn) {
    if (deactAutocorrectBtn instanceof HTMLButtonElement) {
      deactAutocorrectBtn.addEventListener("click", function (click) {
        return Model.switchAutocorrect(click, deactAutocorrectBtn);
      });
    } else {
      const error = new Error();
      const splitError = error.stack?.split("\n");
      const slicedError = splitError[1].trim().slice(-7, -1);
      ErrorHandler.elementNotPopulated(
        deactAutocorrectBtn ?? null,
        `${deactAutocorrectBtn?.id || "UNDEFINED ID BUTTON"}`,
        slicedError ?? "NULL"
      );
    }
  });
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotPopulated(
    deactAutocorrectBtns ?? null,
    "deactAutoCorrectBtns",
    slicedError ?? "NULL"
  );
}

if (subButton instanceof HTMLButtonElement) {
  subButton.addEventListener("click", Handlers.subForm);
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotFound(
    subButton ?? null,
    "subButton",
    slicedError ?? "NULL"
  );
}

if (resetFormBtn instanceof HTMLButtonElement) {
  resetFormBtn.addEventListener("click", (click) =>
    Handlers.resetarFormulario(click, astDigtBtns)
  );
} else {
  const error = new Error();
  const splitError = error.stack?.split("\n");
  const slicedError = splitError[1].trim().slice(-7, -1);
  ErrorHandler.elementNotFound(
    resetFormBtn ?? null,
    "resetFormBtn",
    slicedError ?? "NULL"
  );
}

export function cursorCheckTimer(cursorPosition) {
  let selection = window.getSelection();
  if (selection && selection.focusNode !== null) {
    cursorPosition = selection.getRangeAt(0)?.startOffset;
    setTimeout(() => {
      return cursorPosition;
    }, 3000);
  }
  return 0;
}

//TODO DESATIVADO POR ENQUANTO
// subDivsQuadrs.forEach((subDivQuadrs) => {
//   subDivQuadrs.addEventListener("click", (selectedBut) => {
//     Handlers.reorderLabels(selectedBut);
//   });
// });
// inspSpanSubsArray.forEach((inspSpanSub) => {
//   inspSpanSub.addEventListener("mousedown", (mousemove) =>
//     Handlers.resizeContainers(mousemove, true, inspSpanSub)
//   );
// });
// const inpsAst = document.querySelectorAll('input[id^="inpAst"]');
// const confirmLocId = document.querySelector('label[for="confirmLocId"]');
// const inspDialogs = document.querySelectorAll('dialog[id^="inspDialog"]');

// if (editableCite) {
// editableCite.addEventListener("mousedown", (mousemove) =>
//   Handlers.resizeContainers(mousemove, true, editableCite)
// );
// }
// export function cursorMovementKeyboard(targetElement) {
//   targetElement.addEventListener("click", () => {
//     cursorPosition = window.getSelection().getRangeAt(0).startOffset;
//     console.log("Posição do cursor atualizada(click): " + cursorPosition);
//   });
//   // targetElement.addEventListener("mouseup", () => {
//   //   if (selection.rangeCount > 0) {
//   //     for (let iSM = 0; iSM < selection.rangeCount; iSM++) {
//   //       range = selection.getRangeAt(iSM);
//   //       console.log("Texto selecionado: " + range.toString());
//   //     }
//   //   }
//   // });
//   // let textCounter = 0
//   // let previousTextLength =
//   let isKeyupListened = false;
//   let textAfterKeyup = "";
//   console.log("previousTextLength " + previousTextLength);
//   targetElement.addEventListener("keyup", (move) => {
//     // textCounter++
//     isKeyupListened = true;
//     textAfterKeyup = targetElement.textContent;
//     console.log("text " + textAfterKeyup);
//     // if (afterTextLength !== previousTextLength) {
//     //   cursorPosition += afterTextLength - previousTextLength;
//     // }
//     cursorPosition = targetElement.selectionStart;
//     // if (selection.rangeCount > 0) {
//     //   for (let iSK = 0; iSK < selection.rangeCount; iSK++) {
//     //     range = selection.getRangeAt(iSK);
//     //     console.log("Texto selecionado: " + range.toString());
//     //   }
//     // }
//     if (cursorPosition === 0) {
//       if (move.keyCode === 39) {
//         cursorPosition++;
//         console.log("Posição do cursor após arrowRight: " + cursorPosition);
//         range.setStart(targetElement, cursorPosition);
//       }
//     } else if (cursorPosition > 0) {
//       if (cursorPosition !== targetElement.textContent.length) {
//         if (move.keyCode === 37) {
//           cursorPosition--;
//           console.log("Posição do cursor após arrowLeft: " + cursorPosition);
//           range.setStart(targetElement, cursorPosition);
//         }
//         if (move.keyCode === 39) {
//           cursorPosition++;
//           console.log("Posição do cursor após arrowRight: " + cursorPosition);
//           range.setStart(targetElement, cursorPosition);
//         }
//       } else if (cursorPosition === targetElement.textContent.length) {
//         if (move.keyCode === 37) {
//           cursorPosition--;
//           console.log("Posição do cursor após arrowLeft: " + cursorPosition);
//           range.setStart(targetElement, cursorPosition);
//         }
//       }
//     }
//   });
//   if (isKeyupListened) {
//     targetElement.textContent = textAfterKeyup;
//     isKeyupListened = false;
//   }
// }

// export function cursorMovementMobile() {
//   editableCite.addEventListener("touch", () => {
//     cursorPosition = window.getSelection().getRangeAt(0).startOffset;
//     console.log("Posição do cursor atualizada(touch): " + cursorPosition);
//   });
// }
// confirmLocId.addEventListener("mousedown", (mousemove) =>
//   Handlers.resizeContainers(mousemove, true, confirmLocId)
// );
// inpsAst.forEach((inpAst) => {
//   inpAst.addEventListener("mousedown", (mousemove) =>
//     Handlers.resizeContainers(mousemove, true, inpAst)
//   );
// });
// inspDialogs.forEach((inspDialog) => {
//   inspDialog.addEventListener("mousedown", (mousemove) =>
//     Handlers.resizeContainers(mousemove, true, inspDialog)
//   );
// });
// tratTypeSpans.forEach((tratTypeSpan) => {
//   tratTypeSpan.addEventListener("mousedown", (mousemove) =>
//     Handlers.resizeContainers(mousemove, true, tratTypeSpan)
//   );
//   tratTypeSpan.addEventListener("mousemove", (mousemove) =>
//     Handlers.applyResizingCursor(mousemove, tratTypeSpan)
//   );
// });

// taTrats.forEach((taTrat) => {
//   taTrat.addEventListener("mousemove", (mousemove) =>
//     Handlers.applyResizingCursor(mousemove, taTrat)
//   );
// });

// editableCite.addEventListener("mousedown", (mousemove) =>
//   Handlers.resizeContainers(mousemove, true, editableCite)
// );
