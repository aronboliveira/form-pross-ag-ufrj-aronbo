"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cursorCheckTimer = void 0;
const Handlers = __importStar(require("./handlers.js"));
const Model = __importStar(require("./model.js"));
const textInputs = document.querySelectorAll('input[type="text"]');
const textareas = document.querySelectorAll("textarea");
const textConts = [...textInputs, ...textareas];
// const inspSpanSubs = document.getElementsByClassName("inspSpanSub");
// const inspSpanSubsArray = Array.from(inspSpanSubs);
const radioButtons = document.querySelectorAll('input[type="radio"]');
const inspRadiosYes = document.querySelectorAll('input[class="contQuint radOp radYes"]');
const inspRadiosNo = document.querySelectorAll('input[class="contQuint radOp radNo"]');
const inspDialogsBtns = document.querySelectorAll('button[id^="inspDialogBtn"]');
const inspLIBtns = document.querySelectorAll('button[id^="inspLIBtn"]');
const quadrDents = document.getElementsByClassName("quadrMainDiv"); //retorna HTMLCollection
const quadrDentsArray = Array.from(quadrDents); // tem que ser aplicada em Arrray, não coleção HTML
const avElemDents = document.getElementsByClassName("inpAvDent");
const avElemDentsArray = Array.from(avElemDents);
const subDivsQuadrs = document.querySelectorAll(".quadrSubDiv");
const resetDivsQuadrs = document.querySelectorAll(".resetBut");
const tratContainer = document.getElementById("tratContainer");
// const tratTypeSpans = document.querySelectorAll('span[id^="tratTypeSpan"]');
// const taTrats = document.querySelectorAll("textarea[id^=taTrat");
const dateBtns = document.querySelectorAll('button[id$="DatBtn"]');
const editableCite = document.querySelector('cite[contenteditable="true"]');
const deactAutocorrectBtns = document.querySelectorAll('button[id^="deactAutocorrectBtn"]');
const astDigtBtns = document.querySelectorAll('button[id$="AstDigtBtn');
const resetFormBtn = document.getElementById("resetFormBtn");
const subButton = document.getElementById("submitFormButId");
// let selection = window.getSelection();
// let range = document.createRange();
textConts.forEach((textCont) => {
    textCont.addEventListener("input", (input) => {
        if (input.target instanceof HTMLInputElement ||
            input.target instanceof HTMLTextAreaElement) {
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
    inspRadioYes.addEventListener("click", (clickRadio) => Handlers.showInspSpanSub(clickRadio, inspRadioYes));
});
inspRadiosNo.forEach((inspRadioNo) => {
    inspRadioNo.addEventListener("click", (clickRadio) => Handlers.showInspSpanSub(clickRadio, inspRadioNo));
});
inspDialogsBtns.forEach((inspDialogBtn) => {
    inspDialogBtn.addEventListener("click", (click) => Handlers.showInspDialogs(click, inspDialogBtn));
});
inspLIBtns.forEach((inspLIBtn) => {
    inspLIBtn.addEventListener("click", (click) => Handlers.addTextToObs(click, inspLIBtn));
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
    tratContainer.addEventListener("click", (click) => Handlers.addSubDivTrat(click));
}
else {
    console.warn("Erro validando Container de Tratamento");
}
dateBtns.forEach((dateBtn) => {
    dateBtn.addEventListener("click", (activation) => Handlers.useCurrentDate(activation, dateBtn));
});
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
}
else {
    console.warn("Erro validando Cite Editável");
}
astDigtBtns.forEach((astDigtBtn) => {
    astDigtBtn.addEventListener("click", (click) => Handlers.changeToAstDigit(click, astDigtBtn));
});
deactAutocorrectBtns.forEach((deactAutocorrectBtn) => {
    deactAutocorrectBtn.addEventListener("click", (click) => Model.switchAutocorrect(click, deactAutocorrectBtn));
});
if (subButton) {
    subButton.addEventListener("click", Handlers.subForm);
}
if (resetFormBtn) {
    resetFormBtn.addEventListener("click", (click) => Handlers.resetarFormulario(click, astDigtBtns));
}
function cursorCheckTimer(cursorPosition) {
    let selection = window.getSelection();
    if (selection && selection.focusNode !== null) {
        cursorPosition = selection.getRangeAt(0)?.startOffset;
        setTimeout(() => {
            return cursorPosition;
        }, 3000);
    }
}
exports.cursorCheckTimer = cursorCheckTimer;
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
