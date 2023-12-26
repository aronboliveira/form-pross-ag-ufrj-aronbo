//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
"use strict";
import * as GlobalModel from "../../globalScripts/dist/gModel.js";
import * as GlobalHandler from "../../globalScripts/dist/gHandlers.js";
import * as ErrorHandler from "../../globalScripts/dist/errorHandler.js";
let movingSrcItem = null;
let targItem = null;
const contInQuadrs = document.querySelectorAll(".contInQuadrs");
let isDialogCalled = false;
let blockCount = 1;
// const quadrDentsArray = Array.from(quadrDents); //tem que ser aplicada em Arrray, não coleção HTML
// const quadrDents = document.getElementsByClassName("quadrMainDiv"); //retorna HTMLCollection
export function showInspSpanSub(changeRadio, inspRadio) {
  if (changeRadio.target === inspRadio) {
    if (inspRadio.classList.contains("radYes")) {
      const isParentValid =
        inspRadio.parentElement?.classList.contains("inspSpanMain");
      if (isParentValid) {
        const validSibling = GlobalHandler.searchNextSiblings(
          inspRadio,
          "inspSpanSub"
        );
        inspRadio.addEventListener("dblclick", () => {
          if (!inspRadio.checked) {
            validSibling.setAttribute("hidden", "");
          }
        });
        if (inspRadio.checked === true) {
          validSibling.removeAttribute("hidden");
        }
      }
    } else if (inspRadio.classList.contains("radNo")) {
      const isParentValid =
        inspRadio.parentElement?.classList.contains("inspSpanMain");
      if (isParentValid) {
        const validSibling = GlobalHandler.searchNextSiblings(
          inspRadio,
          "inspSpanSub"
        );
        if (inspRadio.checked === true) {
          validSibling.setAttribute("hidden", "");
        }
      } else {
        console.error(`Erro validando parentElement class.
        Classes obtidas: ${inspRadio.parentElement?.classList ?? "NULL"};
        Classe procurada: "inspSpanMain"`);
      }
    }
  }
}
export function showInspDialogs(click, inspDialogBtn) {
  if (click.target === inspDialogBtn) {
    const calledDialog = inspDialogBtn.nextElementSibling;
    if (calledDialog && calledDialog instanceof HTMLDialogElement) {
      if (isDialogCalled === false) {
        calledDialog.show();
        inspDialogBtn.textContent = "Esconder Sugestões";
        isDialogCalled = !isDialogCalled;
      } else {
        calledDialog.close();
        inspDialogBtn.textContent = "Mostrar Sugestões";
        isDialogCalled = !isDialogCalled;
      }
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        calledDialog ?? null,
        "calledDialog",
        slicedError ?? "NULL"
      );
    }
  }
}
export function addTextToObs(click, inspLIBtn) {
  if (click.target === inspLIBtn) {
    const validTextParent = inspLIBtn.parentElement?.innerText;
    const fixedTextParent = validTextParent?.slice(0, -9);
    const validParent = GlobalHandler.searchParents(inspLIBtn, "inspDialog");
    const validParentSibling = GlobalHandler.searchPreviousSiblings(
      validParent,
      "inspTa"
    );
    if (
      validParentSibling instanceof HTMLTextAreaElement ||
      validParentSibling instanceof HTMLInputElement
    ) {
      if (validParentSibling.value.length === 0) {
        //textContent é cumulativo persistente, mesmo após remoção de conteúdo em input/ta, logo usar .value
        // console.log("condição if");
        validParentSibling.value += fixedTextParent;
      } else {
        const loweredFixedTextParent = fixedTextParent?.toLowerCase();
        validParentSibling.value += loweredFixedTextParent;
      }
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.inputNotFound(
        validParentSibling ?? null,
        "validParentSibling",
        slicedError ?? "NULL"
      );
    }
  }
}
export function dragHover(quadrDent) {
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
export function dragStart(move) {
  movingSrcItem = move?.target ?? null;
  if (movingSrcItem && movingSrcItem instanceof HTMLElement) {
    move?.dataTransfer?.setData("text/plain", ""); //define a data inicial no container mobilizado
    dragStartChilds(contInQuadrs);
  } else {
    console.warn(
      `Erro reconhecendo Drag Start: target ${movingSrcItem}, classe ${movingSrcItem}`
    );
  }
}
export function dragStartChilds(contInQuadrs) {
  contInQuadrs.forEach((contInQuadr) => {
    contInQuadr.setAttribute("draggable", "true");
  });
}
export function dragEnter(move) {
  move.preventDefault();
}
export function dragOver(move) {
  move.preventDefault();
}
export function dragLeave(move) {
  move.preventDefault();
}
export function dragDrop(drop) {
  targItem = drop.target;
  if (
    movingSrcItem instanceof HTMLElement &&
    targItem &&
    targItem instanceof HTMLElement &&
    movingSrcItem !== null
  ) {
    const gridSrcItemCStyle = window.getComputedStyle(movingSrcItem); //captura estilos da source
    const gridSrcItemStyle = movingSrcItem.style;
    const gridSrcItemColumn = gridSrcItemCStyle.getPropertyValue("grid-column");
    const gridSrcItemRow = gridSrcItemCStyle.getPropertyValue("grid-row");
    const gridTargItemCStyle = window.getComputedStyle(targItem); //captura estilos do target na área de drop
    const gridTargItemStyle = targItem.style;
    const gridTargItemColumn =
      gridTargItemCStyle.getPropertyValue("grid-column");
    const gridTargItemRow = gridTargItemCStyle.getPropertyValue("grid-row");
    console.log(gridSrcItemColumn);
    console.log(gridSrcItemRow);
    console.log(gridTargItemColumn);
    console.log(gridTargItemRow);
    gridSrcItemStyle.setProperty("grid-column", gridTargItemColumn); //faz a inversão
    gridSrcItemStyle.setProperty("grid-row", gridTargItemRow);
    gridTargItemStyle.setProperty("grid-column", gridSrcItemColumn);
    gridTargItemStyle.setProperty("grid-row", gridSrcItemRow);
    movingSrcItem = null;
  }
  dragEnd();
}
export function dragEnd() {
  movingSrcItem = null;
  dragEndChilds(contInQuadrs);
}
export function dragEndChilds(contInQuadrs) {
  contInQuadrs.forEach((contInQuadr) => {
    contInQuadr.setAttribute("draggable", "false");
  });
  // console.log("o drag das childs foi definido como false");
}
export function resetLabels(quadrBtn) {
  const parentDiv = quadrBtn?.closest(".quadrMainDiv");
  console.log(parentDiv);
  if (parentDiv) {
    const innerDivInps = parentDiv.querySelectorAll("input[id^=inpD]");
    if (innerDivInps) {
      if (innerDivInps.length < 8) {
        console.warn(
          `Erro validando inputs internos ao quadrante. Número total de inputs: ${innerDivInps.length}`
        );
      }
      innerDivInps.forEach((innerDivInp) => {
        if (innerDivInp instanceof HTMLInputElement) {
          innerDivInp.value = "Hígido";
        }
      });
    } else {
      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.elementNotFound(
        innerDivInps ?? null,
        "innerDivInps",
        slicedError ?? "NULL"
      );
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(
      parentDiv ?? null,
      "parentDiv",
      slicedError ?? "NULL"
    );
  }
}
export function clearQuadrInps(quadrInp) {
  if (quadrInp instanceof HTMLInputElement) {
    if (quadrInp.nextElementSibling) {
      const dlOptions = quadrInp.nextElementSibling.children;
      const dlOptionsValues = [];
      for (let i = 0; i < dlOptions.length; i++) {
        if (dlOptions[i] instanceof HTMLOptionElement) {
          dlOptionsValues.push(dlOptions[i].value);
        }
      }
      if (dlOptionsValues.includes(quadrInp.value)) {
        quadrInp.value = "";
        quadrInp.placeholder = "Apagado";
      }
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(
      quadrInp ?? null,
      "quadrInp",
      slicedError ?? "NULL"
    );
  }
}
export function addSubDivTrat(click) {
  if (
    click.target &&
    click.target instanceof HTMLElement &&
    click.target.tagName === "BUTTON"
  ) {
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
        dateBtns[iD].addEventListener("click", (activation) =>
          GlobalHandler.useCurrentDate(activation, dateBtns[iD])
        );
      }
      for (let iT = 0; iT < textConts.length; iT++) {
        textConts[iT].addEventListener("input", () =>
          GlobalModel.autoCapitalizeInputs(textConts[iT])
        );
      }
      for (let iA = 0; iA < astDigtBtns.length; iA++) {
        astDigtBtns[iA].addEventListener("click", (activation) =>
          GlobalHandler.changeToAstDigit(activation, astDigtBtns[iA])
        );
      }
    } else if (click.target.classList.contains("removeTrat")) {
      const divToRemove = click.target.closest(".contTerc.divSub.divSubTrat");
      if (divToRemove && blockCount !== 1 && divToRemove.id !== "divSubTrat1") {
        divToRemove.remove();
        blockCount -= 1;
      }
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(
      click?.target ?? null,
      "target <button>",
      slicedError ?? "NULL"
    );
  }
}
