import * as Handlers from "./handlers.js";
import * as Model from "./model.js";

const textInputs: NodeListOf<HTMLInputElement> =
  document.querySelectorAll('input[type="text"]');
const textareas: NodeListOf<HTMLTextAreaElement> =
  document.querySelectorAll("textarea");
const textConts = [...textInputs, ...textareas];
// const inspSpanSubs = document.getElementsByClassName("inspSpanSub");
// const inspSpanSubsArray = Array.from(inspSpanSubs);
const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  'input[type="radio"]'
);
const inspRadiosYes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  'input[class="contQuint radOp radYes"]'
);
const inspRadiosNo: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  'input[class="contQuint radOp radNo"]'
);
const inspDialogsBtns: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll('button[id^="inspDialogBtn"]');
const inspLIBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  'button[id^="inspLIBtn"]'
);
const quadrDents: HTMLCollectionOf<Element> =
  document.getElementsByClassName("quadrMainDiv"); //retorna HTMLCollection
const quadrDentsArray: Element[] = Array.from(quadrDents); // tem que ser aplicada em Arrray, não coleção HTML
const avElemDents: HTMLCollectionOf<Element> =
  document.getElementsByClassName("inpAvDent");
const avElemDentsArray: Element[] = Array.from(avElemDents);
const subDivsQuadrs: NodeListOf<HTMLDivElement> =
  document.querySelectorAll(".quadrSubDiv");
const resetDivsQuadrs: NodeListOf<HTMLDivElement> =
  document.querySelectorAll(".resetBut");
const tratContainer: HTMLElement | null =
  document.getElementById("tratContainer");
// const tratTypeSpans = document.querySelectorAll('span[id^="tratTypeSpan"]');
// const taTrats = document.querySelectorAll("textarea[id^=taTrat");
const dateBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  'button[id$="DatBtn"]'
);
const editableCite: Element | null = document.querySelector(
  'cite[contenteditable="true"]'
);
const deactAutocorrectBtns: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll('button[id^="deactAutocorrectBtn"]');
const astDigtBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  'button[id$="AstDigtBtn'
);
const resetFormBtn: HTMLElement | null =
  document.getElementById("resetFormBtn");
const subButton: HTMLElement | null =
  document.getElementById("submitFormButId");
// let selection = window.getSelection();
// let range = document.createRange();

textConts.forEach((textCont) => {
  textCont.addEventListener("input", (input) => {
    if (
      input.target instanceof HTMLInputElement ||
      input.target instanceof HTMLTextAreaElement
    ) {
      Model.autoCapitalizeInputs(input.target);
    }
  });
});

//TODO DESATIVADO POR ENQUANTO
// inspSpanSubsArray.forEach((inspSpanSub) => {
//   inspSpanSub.addEventListener("mousedown", (mousemove) =>
//     Handlers.resizeContainers(mousemove, true, inspSpanSub)
//   );
// });

radioButtons.forEach((radio) => {
  radio.addEventListener("keydown", (keydown) => {
    Handlers.opRadioHandler(keydown);
  });
  radio.addEventListener("dblclick", Handlers.doubleClickHandler.bind(radio));
  // radio.addEventListener("touchstart", Handlers.touchStartHandler);
});

inspRadiosYes.forEach((inspRadioYes) => {
  inspRadioYes.addEventListener("click", (clickRadio) =>
    Handlers.showInspSpanSub(clickRadio, inspRadioYes)
  );
});

inspRadiosNo.forEach((inspRadioNo) => {
  inspRadioNo.addEventListener("click", (clickRadio) =>
    Handlers.showInspSpanSub(clickRadio, inspRadioNo)
  );
});

inspDialogsBtns.forEach((inspDialogBtn) => {
  inspDialogBtn.addEventListener("click", (click) =>
    Handlers.showInspDialogs(click, inspDialogBtn)
  );
});

inspLIBtns.forEach((inspLIBtn) => {
  inspLIBtn.addEventListener("click", (click) =>
    Handlers.addTextToObs(click, inspLIBtn)
  );
});

quadrDentsArray.forEach((quadrDent) => {
  quadrDent.addEventListener("mousemove", () => Handlers.dragHover(quadrDent));
  quadrDent.addEventListener("dragstart", () => Handlers.dragStart);
  quadrDent.addEventListener("dragenter", Handlers.dragEnter);
  quadrDent.addEventListener("dragover", Handlers.dragOver);
  quadrDent.addEventListener("dragleave", Handlers.dragLeave);
  quadrDent.addEventListener("drop", Handlers.dragDrop);
  quadrDent.addEventListener("dragend", Handlers.dragEnd);
});

avElemDentsArray.forEach((avElemDent) => {
  avElemDent.addEventListener("click", (selectInp) => {
    Model.resetAvDentValue(selectInp);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  Model.orderLabels();
});

// subDivsQuadrs.forEach((subDivQuadrs) => {
//   subDivQuadrs.addEventListener("click", (selectedBut) => {
//     Handlers.reorderLabels(selectedBut);
//   });
// });

// resetDivsQuadrs.forEach((resetDivQuadrs) => {
//   resetDivQuadrs.addEventListener("click", (resetBut) => {
//     Handlers.resetLabels(resetBut);
//   });
// });

if (tratContainer) {
  tratContainer.addEventListener("click", (click) =>
    Handlers.addSubDivTrat(click)
  );
} else {
  console.warn("Erro validando Container de Tratamento");
}

dateBtns.forEach((dateBtn) => {
  dateBtn.addEventListener("click", (activation) =>
    Handlers.useCurrentDate(activation, dateBtn)
  );
});

if (editableCite) {
  let firstClick = true;
  const citeClickHandler = function (click: Event) {
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

astDigtBtns.forEach((astDigtBtn) => {
  astDigtBtn.addEventListener("click", (click) =>
    Handlers.changeToAstDigit(click, astDigtBtn)
  );
});

deactAutocorrectBtns.forEach((deactAutocorrectBtn) => {
  deactAutocorrectBtn.addEventListener("click", (click) =>
    Model.switchAutocorrect(click, deactAutocorrectBtn)
  );
});

if (subButton) {
  subButton.addEventListener("click", Handlers.subForm);
}

if (resetFormBtn) {
  resetFormBtn.addEventListener("click", (click) =>
    Handlers.resetarFormulario(click, astDigtBtns)
  );
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

//TODO DESATIVADO POR ENQUANTO
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
