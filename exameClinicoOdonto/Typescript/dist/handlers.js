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
exports.subForm = exports.resetarFormulario = exports.changeToAstDigit = exports.useCurrentDate = exports.addSubDivTrat = exports.dragEndChilds = exports.dragEnd = exports.dragDrop = exports.dragLeave = exports.dragOver = exports.dragEnter = exports.dragStartChilds = exports.dragStart = exports.dragHover = exports.addTextToObs = exports.showInspDialogs = exports.showInspSpanSub = exports.doubleClickHandler = exports.opRadioHandler = void 0;
const Model = __importStar(require("./model.js"));
let movingSrcItem = null;
let targItem = null;
const contInQuadrs = document.querySelectorAll(".contInQuadrs");
const quadrDents = document.getElementsByClassName("quadrMainDiv"); //retorna HTMLCollection
const quadrDentsArray = Array.from(quadrDents); //tem que ser aplicada em Arrray, não coleção HTML
let isDialogCalled = false;
//TODO DESATIVADO POR ENQUANTO
// export function touchStartHandler(keydown) {
//   let firstTapTime = 0;
//   if (firstTapTime === 0) {
//     firstTapTime = Date.now();
//   } else {
//     const elapsed = Date.now() - firstTapTime;
//     if (elapsed < 1000) {
//       // Limite de tempo para considerar um duplo toque (300ms)
//       if (this.checked) {
//         this.checked = false;
//       } else {
//         this.checked = true;
//       }
//       firstTapTime = 0; // Reiniciar o temporizador
//     } else {
//       firstTapTime = Date.now(); // Iniciar um novo temporizador
//     }
//   }
//   opRadioHandler(keydown);
// }
function opRadioHandler(keydown) {
    const radioPairs = document.querySelectorAll('input[id$="Yes"], input[id$="No"]' //acessando como par
    );
    for (let i = 0; i < radioPairs.length; i += 2 //pulando de par em par
    ) {
        const radioYes = radioPairs[i];
        const radioNo = radioPairs[i + 1];
        if (!radioYes || !radioNo) {
            continue;
        }
        if (radioYes instanceof HTMLInputElement &&
            radioNo instanceof HTMLInputElement &&
            !radioYes.checked &&
            !radioNo.checked &&
            keydown instanceof KeyboardEvent) {
            if ((keydown.altKey && keydown.key === "y") || keydown.key === "Y") {
                radioYes.focus();
                radioYes.checked = true;
                setTimeout(() => {
                    radioYes.blur();
                }, 5000);
                return;
            }
            else if ((keydown.altKey && keydown.key === "n") ||
                keydown.key === "N") {
                radioNo.focus();
                radioNo.checked = true;
                setTimeout(() => {
                    radioNo.blur();
                }, 5000);
                return;
            }
        }
    }
}
exports.opRadioHandler = opRadioHandler;
function doubleClickHandler() {
    this.checked = this.checked === true ? false : true;
}
exports.doubleClickHandler = doubleClickHandler;
function showInspSpanSub(changeRadio, inspRadio) {
    console.log("click ouvido!");
    if (changeRadio.target === inspRadio) {
        console.log("target aceito");
        console.log("classes " + inspRadio.classList);
        if (inspRadio.classList.contains("radYes")) {
            console.log("classe yes aceita");
            let isParentValid = inspRadio.parentElement?.classList.contains("inspSpanMain");
            if (isParentValid) {
                let validSibling = searchNextSiblings(inspRadio, "inspSpanSub");
                inspRadio.addEventListener("dblclick", () => {
                    if (!inspRadio.checked) {
                        validSibling.setAttribute("hidden", "");
                    }
                });
                if (inspRadio.checked === true) {
                    validSibling.removeAttribute("hidden");
                }
            }
        }
        else if (inspRadio.classList.contains("radNo")) {
            console.log("classe no aceita");
            let isParentValid = inspRadio.parentElement?.classList.contains("inspSpanMain");
            if (isParentValid) {
                let validSibling = searchNextSiblings(inspRadio, "inspSpanSub");
                if (inspRadio.checked === true) {
                    validSibling.setAttribute("hidden", "");
                }
            }
        }
    }
}
exports.showInspSpanSub = showInspSpanSub;
function searchNextSiblings(currentElement, searchedSiblingClass) {
    while (currentElement.nextElementSibling) {
        currentElement = currentElement.nextElementSibling;
        let isSiblingValid = currentElement.classList.contains(searchedSiblingClass);
        if (isSiblingValid) {
            break;
        }
    }
    return currentElement;
}
function searchParents(currentElement, searchedParentClass) {
    while (currentElement.parentElement) {
        currentElement = currentElement.parentElement;
        let isParentValid = currentElement.classList.contains(searchedParentClass);
        if (isParentValid) {
            break;
        }
    }
    return currentElement;
}
function searchPreviousSiblings(currentElement, searchedSiblingClass) {
    while (currentElement.previousElementSibling) {
        currentElement = currentElement.previousElementSibling;
        let isSiblingValid = currentElement.classList.contains(searchedSiblingClass);
        if (isSiblingValid) {
            break;
        }
    }
    return currentElement;
}
//TODO DESATIVADO POR ENQUANTO
// export function resizeContainers(mousemove, isResizing, container) {
//   console.log("resizing iniciado");
//   let boundRect = container.getBoundingClientRect();
//   let distClick = boundRect.left - mousemove.clientX;
//   let boundRectLeftLim = [boundRect.left - 10, boundRect.left + 10];
//   handleMouseOver();
//   // stopMouseTracing();
//   function handleMouseOver() {
//     console.log("mouseover ouvido");
//     container.addEventListener("mousemove", handleMouseMove);
//     container.addEventListener("mouseover", (mouseover) => {
//       if (
//         mouseover.clientX >= boundRectLeftLim[0] &&
//         mouseover.clientX <= boundRectLeftLim[1]
//       ) {
//         if (isResizing) {
//           if (distClick >= -10.0) {
//             console.log("Distância validada");
//             handleMouseMove();
//           } else if (distClick < -10.0) {
//             console.log("Distância invalidada");
//           }
//         }
//       }
//     });
//   }
//   function handleMouseMove() {
//     // console.log("handleMouse chamado");
//     if (isResizing && distClick >= -10.0) {
//       let previousClientX = mousemove.clientX;
//       let previousClientY = mousemove.clientY;
//       const startTime = new Date();
//       const startTimeSec = (startTime.getMilliseconds() / 1000).toFixed(3);
//       let shouldUpdate = true;
//       setTimeout(() => {
//         shouldUpdate = true;
//         // console.log("shouldUpdate true");
//       }, 1);
//       container.addEventListener("mousemove", (mousemove) => {
//         if (shouldUpdate) {
//           // console.log("CICLO INICIADO");
//           const updatedClientX = mousemove.clientX;
//           const updatedClientY = mousemove.clientY;
//           const endTime = new Date();
//           const endTimeSec = (endTime.getMilliseconds() / 1000).toFixed(3);
//           const difClientX = updatedClientX - previousClientX;
//           const difClientY = updatedClientY - previousClientY;
//           // console.log("difX: " + difClientX);
//           const elapsedTime = endTimeSec - startTimeSec;
//           console.log("elapsed: " + elapsedTime);
//           const widthCValue = parseFloat(
//             window.getComputedStyle(container).width
//           );
//           const heightCValue = parseFloat(
//             window.getComputedStyle(container).height
//           );
//           const resizeValue = window.getComputedStyle(container).resize;
//           if (updatedClientX - boundRect.left <= 30) {
//             switch (resizeValue) {
//               case "horizontal":
//                 // console.log("CASO HORIZONTAL");
//                 // console.log("difX: " + difClientX);
//                 // console.log(updatedClientX);
//                 const accl =
//                   (2 * Math.abs(difClientX)) / (elapsedTime * 50) ** 2;
//                 console.log("accl: " + accl);
//                 const newWidth = widthCValue - difClientX / (accl / 2);
//                 container.style.width = `${newWidth}px`;
//                 // difClientX = 0;
//                 break;
//               case "vertical":
//                 // console.log("CASO VERTICAL");
//                 heightCValue += difClientY;
//                 container.style.height = `${heightCValue}px`;
//                 break;
//               case "both":
//                 // console.log("CASO BOTH");
//                 widthCValue += difClientX;
//                 heightCValue += difClientY;
//                 container.style.width = `${widthCValue}px`;
//                 container.style.height = `${heightCValue}px`;
//                 break;
//               default:
//               // console.log("CASO INVÁLIDO");
//             }
//           } else if (updatedClientX - boundRect.left > 30) {
//             container.removeEventListener("mousemove", handleMouseMove);
//           }
//           // console.log("FIM DE CICLO");
//           previousClientX = updatedClientX;
//           previousClientY = updatedClientY;
//           shouldUpdate = false;
//           // container.removeEventListener("mousemove", handleMouseMove);
//           // console.log("shouldUpdate false");
//         }
//       });
//       // container.removeEventListener("mousemove", handleMouseMove);
//       // console.log("mousemove X e Y: " + mousemove.clientX, mousemove.clientY);
//       document.addEventListener("mouseup", () => {
//         isResizing = false;
//         // console.log("mouseup reconhecido");
//         container.removeEventListener("mouseover", handleMouseOver);
//         container.removeEventListener("mousemove", handleMouseMove);
//       });
//       container.addEventListener("mouseleave", () => {
//         isResizing = false;
//         // console.log("mouseleave reconhecido");
//         container.removeEventListener("mouseover", handleMouseOver);
//         container.removeEventListener("mousemove", handleMouseMove);
//       });
//     }
//   }
//   function stopMouseTracing() {
//     // console.log("stopmouse chamado");
//     document.addEventListener("mouseup", () => {
//       isResizing = false;
//       // console.log("mouseup reconhecido");
//       container.removeEventListener("mouseover", handleMouseOver);
//       container.removeEventListener("mousemove", handleMouseMove);
//     });
//     container.addEventListener("mouseleave", () => {
//       isResizing = false;
//       // console.log("mouseleave reconhecido");
//       container.removeEventListener("mouseover", handleMouseOver);
//       container.removeEventListener("mousemove", handleMouseMove);
//     });
//   }
// }
// export function applyResizingCursor(mousemove, container) {
//   let boundRect = container.getBoundingClientRect();
//   console.log("ini " + (mousemove.clientX - boundRect.left));
//   if (mousemove.clientX - boundRect.left > 10) {
//     console.log("text INICIAL aplicado");
//     container.style.cursor = "text";
//     container.removeEventListener("mousemove", applyResizingCursor);
//   }
//   if (mousemove.clientX - boundRect.left <= 10) {
//     console.log("check " + (mousemove.clientX - boundRect.left));
//     console.log("ew aplicado");
//     container.style.cursor = "ew-resize";
//     container.removeEventListener("mousemove", applyResizingCursor);
//   }
// }
function showInspDialogs(click, inspDialogBtn) {
    if (click.target === inspDialogBtn) {
        let calledDialog = inspDialogBtn.nextElementSibling;
        if (calledDialog && calledDialog instanceof HTMLDialogElement) {
            if (isDialogCalled === false) {
                calledDialog.show();
                inspDialogBtn.textContent = "Esconder Sugestões";
                isDialogCalled = !isDialogCalled;
            }
            else {
                calledDialog.close();
                inspDialogBtn.textContent = "Mostrar Sugestões";
                isDialogCalled = !isDialogCalled;
            }
        }
    }
}
exports.showInspDialogs = showInspDialogs;
function addTextToObs(click, inspLIBtn) {
    if (click.target === inspLIBtn) {
        let validTextParent = inspLIBtn.parentElement?.innerText;
        let fixedTextParent = validTextParent?.slice(0, -9);
        let validParent = searchParents(inspLIBtn, "inspDialog");
        let validParentSibling = searchPreviousSiblings(validParent, "inspTa");
        if (validParentSibling instanceof HTMLTextAreaElement ||
            validParentSibling instanceof HTMLInputElement) {
            if (validParentSibling.value.length === 0) {
                //textContent é cumulativo persistente, mesmo após remoção de conteúdo em input/ta, logo usar .value
                // console.log("condição if");
                validParentSibling.value += fixedTextParent;
            }
            else {
                let loweredFixedTextParent = fixedTextParent?.toLowerCase();
                validParentSibling.value += loweredFixedTextParent;
            }
        }
    }
}
exports.addTextToObs = addTextToObs;
function dragHover(quadrDent) {
    if (quadrDent instanceof HTMLElement) {
        const originalCursor = quadrDent.style.cursor;
        setTimeout(() => {
            quadrDent.style.cursor = "grabbing";
            setTimeout(() => {
                quadrDent.style.cursor = originalCursor;
                if (quadrDent.style.cursor === "grabbing") {
                    quadrDent.style.cursor = "grab";
                }
            }, 2000);
        }, 2000);
    }
}
exports.dragHover = dragHover;
function dragStart(move) {
    movingSrcItem = move.target;
    if (movingSrcItem && movingSrcItem instanceof HTMLElement) {
        move?.dataTransfer?.setData("text/plain", ""); //define a data inicial no container mobilizado
        dragStartChilds(contInQuadrs);
    }
    else {
        console.warn(`Erro reconhecendo Drag Start: target ${movingSrcItem}, classe ${movingSrcItem}`);
    }
}
exports.dragStart = dragStart;
function dragStartChilds(contInQuadrs) {
    contInQuadrs.forEach((contInQuadr) => {
        contInQuadr.setAttribute("draggable", "true");
    });
}
exports.dragStartChilds = dragStartChilds;
function dragEnter(move) {
    move.preventDefault();
}
exports.dragEnter = dragEnter;
function dragOver(move) {
    move.preventDefault();
}
exports.dragOver = dragOver;
function dragLeave(move) {
    move.preventDefault();
}
exports.dragLeave = dragLeave;
function dragDrop(drop) {
    targItem = drop.target;
    if (movingSrcItem instanceof HTMLElement &&
        targItem &&
        targItem instanceof HTMLElement &&
        movingSrcItem !== null) {
        let gridSrcItemCStyle = window.getComputedStyle(movingSrcItem), //captura estilos da source
        gridSrcItemStyle = movingSrcItem.style, gridSrcItemColumn = gridSrcItemCStyle.getPropertyValue("grid-column"), gridSrcItemRow = gridSrcItemCStyle.getPropertyValue("grid-row"), gridTargItemCStyle = window.getComputedStyle(targItem), //captura estilos do target na área de drop
        gridTargItemStyle = targItem.style, gridTargItemColumn = gridTargItemCStyle.getPropertyValue("grid-column"), gridTargItemRow = gridTargItemCStyle.getPropertyValue("grid-row");
        gridSrcItemStyle.setProperty("grid-column", gridTargItemColumn); //faz a inversão
        gridSrcItemStyle.setProperty("grid-row", gridTargItemRow);
        gridTargItemStyle.setProperty("grid-column", gridSrcItemColumn);
        gridTargItemStyle.setProperty("grid-row", gridSrcItemRow);
        movingSrcItem = null;
    }
    dragEnd();
}
exports.dragDrop = dragDrop;
function dragEnd() {
    movingSrcItem = null;
    dragEndChilds(contInQuadrs);
}
exports.dragEnd = dragEnd;
function dragEndChilds(contInQuadrs) {
    contInQuadrs.forEach((contInQuadr) => {
        contInQuadr.setAttribute("draggable", "false");
    });
}
exports.dragEndChilds = dragEndChilds;
let blockCount = 1;
function addSubDivTrat(click) {
    if (click.target &&
        click.target instanceof HTMLElement &&
        click.target.tagName === "BUTTON") {
        if (click.target.classList.contains("addTrat")) {
            blockCount++;
            const tratContainer = document.getElementById("tratContainer");
            const newBlock = document.createElement("div");
            newBlock.className = "contTerc divSub divSubTrat";
            newBlock.id = `divSubTrat${blockCount}`;
            newBlock.innerHTML = `
          <span class="contQuat spanMain tratMainSpan tratNumSpan" id="tratNumSpan${blockCount}"> 
          ${blockCount}&#41
          </span>
          <span class="contQuat spanMain tratMainSpan tratDateSpan" id="tratDateSpan${blockCount}">
            <label for="tratDateInpId${blockCount}" class="contQuint tratLabel">Data</label>
            <input type="date" name="tratDateInpName${blockCount}" id="tratDateInpId${blockCount}" class="inpTrat tratDate" required />
            <button type="button" class="contQuint datBtn" id="trat${blockCount}DatBtn">Usar data atual</button>
          </span>
          <span class="contQuat spanMain tratMainSpan tratTypeSpan" id="tratTypeSpan${blockCount}">
            <label for="taTratId${blockCount}" class="contQuint tratTalab" id="labTratTip${blockCount}">Tipo de Tratamento</label>
            <textarea name="taTratName1" id="taTratId${blockCount}" class="taTrat" required></textarea>
          </span>
          <span class="contQuat spanMain tratMainSpan tratFileSpan" id="tratFileSpan${blockCount}">
            <span id="spanAstTratId${blockCount}" class="contQuint tratLabel labAst">Assinatura</span>
            <input type="text" name="inpAstTratName${blockCount}" id="inpAstTratId${blockCount}"
            class="contQuint inpTrat inpAst tratAst" />
            <button type="button" class="contQuint astDigtBtn confirmBtn" 
            id="trat${blockCount}AstDigtBtn">Usar Assinatura Digital</button>
          </span>
          <span class="contQuat spanMain tratMainSpan tratButSpan" id="tratButSpan${blockCount}">
            <button type="button" name="addTratName${blockCount}" id="addTratId${blockCount}" class="addTrat countTrat"
            value="addTrat">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
              id="addTratSvg${blockCount}" class="plusButSvg bi bi-plus-square-fill countTratSvg" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
              </svg>
            </button>
            <button type="button" name="removeTratName1" id="removeTratId${blockCount}"
            class="removeTrat countTrat" value="removeTrat">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
              id="removeTratSvg${blockCount}" class="minusButSvg bi bi-dash-square-fill countTratSvg" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z"/>
              </svg>
            </button>
          </span>   
        `;
            tratContainer?.appendChild(newBlock);
            const dateBtns = newBlock.querySelectorAll('button[id$="DatBtn"]');
            const textInputs = newBlock.querySelectorAll('input[type="text"]');
            const textareas = newBlock.querySelectorAll("textarea");
            const textConts = [...textInputs, ...textareas];
            const astDigtBtns = newBlock.querySelectorAll('button[id$="AstDigtBtn');
            for (let iD = 0; iD < dateBtns.length; iD++) {
                dateBtns[iD].addEventListener("click", (activation) => useCurrentDate(activation, dateBtns[iD]));
            }
            for (let iT = 0; iT < textConts.length; iT++) {
                textConts[iT].addEventListener("input", () => Model.autoCapitalizeInputs(textConts[iT]));
            }
            for (let iA = 0; iA < astDigtBtns.length; iA++) {
                astDigtBtns[iA].addEventListener("click", (activation) => changeToAstDigit(activation, astDigtBtns[iA]));
            }
        }
        else if (click.target.classList.contains("removeTrat")) {
            const divToRemove = click.target.closest(".contTerc.divSub.divSubTrat");
            if (divToRemove && blockCount !== 1 && divToRemove.id !== "divSubTrat1") {
                divToRemove.remove();
                blockCount -= 1;
            }
        }
    }
}
exports.addSubDivTrat = addSubDivTrat;
function useCurrentDate(activation, dateBtn) {
    console.log("botão clicado");
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1)
        .toString()
        .padStart(2, "0")
        .replaceAll("'", "");
    const dia = dataAtual
        .getDate()
        .toString()
        .padStart(2, "0")
        .replaceAll("'", "");
    if (activation.target === dateBtn &&
        dateBtn.previousElementSibling &&
        (dateBtn.previousElementSibling instanceof HTMLInputElement ||
            dateBtn.previousElementSibling instanceof HTMLTextAreaElement)) {
        dateBtn.previousElementSibling.value = ano + "-" + mes + "-" + dia;
    }
}
exports.useCurrentDate = useCurrentDate;
function changeToAstDigit(click, toFileInpBtn) {
    const useAstDigitRegex = /Usar Assinatura Digital/;
    const useAstDigtRegexObj = new RegExp(useAstDigitRegex);
    const useAstTextRegex = /Retornar à Assinatura Escrita/;
    const useAstTextRegexObj = new RegExp(useAstTextRegex);
    let astCount = 0;
    if (click.target === toFileInpBtn) {
        if (toFileInpBtn.textContent &&
            useAstDigtRegexObj.test(toFileInpBtn.textContent)) {
            // console.log("true teste 1");
            const inpAst = searchPreviousSiblings(toFileInpBtn, "inpAst");
            if (inpAst instanceof HTMLInputElement) {
                const fileInp = document.createElement("input");
                fileInp.type = "file";
                fileInp.name = inpAst.name;
                fileInp.id = inpAst.id;
                fileInp.className = inpAst.className;
                fileInp.setAttribute("accept", "image/*");
                if (inpAst.required) {
                    fileInp.required = inpAst.required;
                }
                if (inpAst.parentElement) {
                    inpAst.parentElement.replaceChild(fileInp, inpAst);
                    toFileInpBtn.textContent = "Retornar à Assinatura Escrita";
                    toFileInpBtn.previousElementSibling?.setAttribute("hidden", "");
                    if (fileInp) {
                        fileInp.addEventListener("change", (chose) => {
                            // console.log("evento ouvido");
                            try {
                                if (chose.target instanceof HTMLInputElement &&
                                    fileInp.files &&
                                    fileInp.files.length > 0) {
                                    const imgFile = fileInp.files[0];
                                    console.log(imgFile);
                                    console.log(imgFile.type);
                                    if (imgFile && imgFile.type.startsWith("image")) {
                                        // console.log("img reconhecida");
                                        const fileReader = new FileReader();
                                        fileReader.onload = (load) => {
                                            //definir lógica para carregamento
                                            //inicia preparo para evento de carregamento
                                            // console.log("loading iniciado");
                                            astCount++;
                                            const imgUrl = load.target?.result; //checa a url do file que será carregado
                                            const imgAstDigt = document.createElement("img"); //cria container
                                            imgAstDigt.className = "imgAstDigit";
                                            imgAstDigt.id = `imgAstDigit${astCount}`;
                                            imgAstDigt.innerHTML = "";
                                            if (typeof imgUrl === "string") {
                                                imgAstDigt.src = imgUrl; //associação entre container e file carregado
                                                // console.log("string validada");
                                            }
                                            imgAstDigt.setAttribute("alt", "Assinatura Digital");
                                            imgAstDigt.setAttribute("decoding", "async");
                                            imgAstDigt.setAttribute("loading", "eager");
                                            imgAstDigt.setAttribute("crossorigin", "anonymous");
                                            imgAstDigt.style.setProperty("max-width", "300px");
                                            imgAstDigt.style.setProperty("max-height", "200px");
                                            if (fileInp.parentElement) {
                                                fileInp.parentElement.replaceChild(imgAstDigt, fileInp);
                                            }
                                            // imgAstDigt.style.width = imgAstDigt.parentElement.style.width;
                                            if (imgAstDigt) {
                                                // let computeImgAstdWidth = getComputedStyle(imgAstDigt).width;
                                                // imgAstDigt.parentElement.style.width = computeImgAstdWidth;
                                                imgAstDigt.style.setProperty("overflow", "auto");
                                            }
                                        };
                                        fileReader.readAsDataURL(imgFile); //lê o file baseado na src carregada
                                    }
                                }
                                else {
                                    throw new Error("Nenhum arquivo selecionado");
                                }
                            }
                            catch (error) {
                                console.error(error.message);
                            }
                        });
                    }
                }
            }
            //TODO INCLUIR TOKEN ANTI-CSRF QUANDO HOUVER SERVIDOR
            // fileInp.name = inpAst.name;
            // fileInp.id = inpAst.id;
            // fileInp.className = inpAst.className;
        }
        else if (toFileInpBtn.textContent &&
            useAstTextRegexObj.test(toFileInpBtn.textContent)) {
            const inpAst = searchPreviousSiblings(toFileInpBtn, "inpAst");
            if (inpAst instanceof HTMLImageElement ||
                inpAst instanceof HTMLInputElement) {
                console.log("replace direcionado 1");
                const fileInp = document.createElement("input");
                fileInp.type = "text";
                fileInp.name = "confirmAstName";
                fileInp.id = "inpAstConfirmId";
                fileInp.className = "contQuint inpAst";
                fileInp.setAttribute("required", "");
                console.log("atributos aplicados");
                if (inpAst.parentElement) {
                    inpAst.parentElement.replaceChild(fileInp, inpAst);
                    toFileInpBtn.textContent = "Usar Assinatura Digital";
                    toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
                }
            }
        }
    }
}
exports.changeToAstDigit = changeToAstDigit;
//TODO NAO ESTÁ RESETANDO ASSINATURAS NO TRATCONT
function resetarFormulario(click, toFileInpBtns) {
    if (click.target instanceof HTMLElement &&
        click.target.tagName === "BUTTON") {
        const formulario = document.getElementById("formOdont");
        const editableCite = document.querySelector('cite[contenteditable="true"]');
        if (formulario && formulario instanceof HTMLFormElement) {
            formulario.reset();
        }
        else {
            console.warn("Erro validando formulário");
        }
        if (editableCite) {
            editableCite.textContent = `--Nome`;
            Model.removeFirstClick(editableCite);
        }
        console.log("tofileinp " + toFileInpBtns[0].id + " " + toFileInpBtns[1].id);
        toFileInpBtns.forEach((toFileInpBtn) => {
            if (toFileInpBtn.textContent === "Retornar à Assinatura Escrita") {
                const inpAst = searchPreviousSiblings(toFileInpBtn, "inpAst") ||
                    searchPreviousSiblings(toFileInpBtn, "imgAstDigit");
                if (inpAst &&
                    (inpAst instanceof HTMLInputElement ||
                        inpAst instanceof HTMLImageElement)) {
                    const fileInp = document.createElement("input");
                    fileInp.type = "text";
                    fileInp.name = inpAst.name;
                    fileInp.id = inpAst.id;
                    fileInp.className = inpAst.className;
                    fileInp.setAttribute("required", "");
                    if (inpAst.parentElement) {
                        let labCont = toFileInpBtn.parentElement?.getElementsByClassName("labAst") ??
                            [];
                        if ((!labCont[0] || labCont[0].id === "") &&
                            (toFileInpBtn.parentElement?.tagName === "LABEL" ||
                                toFileInpBtn.parentElement?.tagName === "SPAN")) {
                            labCont = Array.of(toFileInpBtn.parentElement);
                        }
                        inpAst.parentElement.replaceChild(fileInp, inpAst);
                        const idLabMatch = labCont[0].id.match(/Ast/)?.toString();
                        const idInpMatch = fileInp.id.match(/Ast/)?.toString();
                        if (idLabMatch && idInpMatch) {
                            const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
                            const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
                            const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
                            const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
                            labCont[0].id = sliceOneLabId + sliceTwoInpId;
                            console.log(labCont[0].id);
                            toFileInpBtn.textContent = "Usar Assinatura Digital";
                            toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
                        }
                    }
                    else {
                        console.warn(`Erro localizando Parent Element de inpAst`);
                    }
                }
                else {
                    console.warn(`Erro reconhecendo Previous Element Sibling: inpAst ${Object.prototype.toString
                        .call(inpAst)
                        .slice(8, -1)}`);
                }
            }
        });
    }
    else {
        console.error(`Erro validando target: instância de ${Object.prototype.toString
            .call(click.target)
            .slice(8, -1)}`);
    }
}
exports.resetarFormulario = resetarFormulario;
function subForm() {
    window.alert("Sistema ainda não pronto\n...mas você teria enviado clicando aqui! :)");
}
exports.subForm = subForm;
