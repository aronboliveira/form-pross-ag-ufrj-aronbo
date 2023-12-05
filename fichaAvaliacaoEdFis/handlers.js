import * as Model from "./model.js";
import { Man, Woman, Neutro } from "./classes.js";

let rowCountAtivFisRot = 3;
let rowCountAtivFisProp = 3;
let rowCountComorb = 3;
const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;

export function updateSimpleProperty(element) {
  if (element instanceof HTMLInputElement) {
    if (element.type === "radio" || element.type === "checkbox") {
      return element.checked.toString();
    } else if (element.type === "number") {
      return parseFloat(element.value.replaceAll(/[^0-9.,+-]/g, ""));
    } else if (element.type === "text" || element.type === "date") {
      return element.value;
    } else {
      console.warn(`Erro validando type de Input para atualização de propriedade de person.
      Tipo obtido: ${element?.type ?? "null"}`);
    }
  } else if (
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    return element.value;
  } else {
    console.warn(`Erro validando Element para atualização de propriedade de person.
    Instância obitda: ${
      Object.prototype.toString.call(element).slice(8, -1) ?? "null"
    }`);
  }
}

export function opRadioHandler(keydown) {
  const radioPairs = document.querySelectorAll(
    'input[id$="Yes"], input[id$="No"]' //acessando como par
  );

  for (
    let i = 0;
    i < radioPairs.length;
    i += 2 //pulando de par em par
  ) {
    const radioYes = radioPairs[i];
    const radioNo = radioPairs[i + 1];

    if (!radioYes || !radioNo) {
      continue;
    }
    if (
      radioYes instanceof HTMLInputElement &&
      radioNo instanceof HTMLInputElement &&
      !radioYes.checked &&
      !radioNo.checked &&
      keydown instanceof KeyboardEvent
    ) {
      if ((keydown.altKey && keydown.key === "y") || keydown.key === "Y") {
        radioYes.focus();
        radioYes.checked = true;
        setTimeout(() => {
          radioYes.blur();
        }, 5000);
        return;
      } else if (
        (keydown.altKey && keydown.key === "n") ||
        keydown.key === "N"
      ) {
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

export function cpbInpHandler(radio) {
  const opRadiosCheck = radio.parentElement?.querySelectorAll(
    "input[id^='Cpb'][id$='Yes']"
  );
  const divAdd =
    radio.parentElement?.parentElement?.querySelectorAll("div[id^='divAdd']");
  opRadiosCheck?.forEach(function (opRadioCheck, i) {
    if (
      opRadiosCheck instanceof NodeList &&
      opRadioCheck instanceof HTMLInputElement &&
      divAdd
    ) {
      if (!opRadioCheck.checked) {
        divAdd[i].style.display = "none";
      } else {
        divAdd[i].style.display = "block";
      }
    }
  });
}

export function doubleClickHandler() {
  if (this.checked) {
    this.checked = false;
  } else {
    this.checked = true;
  }
  const radio = this.parentElement.querySelector("input[id^='Cpb'][id$='Yes']");
  if (radio) {
    cpbInpHandler(radio);
  }
}

export function addRowAtivFis(container) {
  if (
    container instanceof HTMLButtonElement &&
    container.tagName === "BUTTON"
  ) {
    if (container.classList.contains("addAtFisRot")) {
      const tBodyContainer = document.getElementById("tabTbodyAtFisRot");
      const newRow = document.createElement("tr");
      newRow.className = "contQuint tabRowAtFisRot";
      newRow.id = `tabRowAtFisRotId${rowCountAtivFisRot}`;
      newRow.itemprop = "rowAtFisRot";
      newRow.innerHTML = `
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_1" itemprop="celAtFisRot">${
        rowCountAtivFisRot - 1
      }&#41</td>
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_2" itemprop="celAtFisRot">
        <input type="text" min="0" max="255" class="contSet tabInpAtFisRot tabInpRowAtFisRot2" id="tabInpRowAtFisRot${rowCountAtivFisRot}_1" itemprop="inpAtFisRot" />
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_3" itemprop="celAtFisRot">
        <input type="number" min="0" max="255" class="contSet inpAtivFis tabInpAtFisRot tabInpRowAtFisRot2" id="tabInpRowAtFisRot${rowCountAtivFisRot}_2" itemprop="inpAtFisRot" />
      </td>
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_4" itemprop="celAtFisRot">
        <input type="number" min="0" max="255" class="contSet tabInpAtFisRot tabInpRowAtFisRot2" id="tabInpRowAtFisRot${rowCountAtivFisRot}_3" itemprop="inpAtFisRot" />
      </td>
      <td class="contSext tabCelAtFisRot" id="tabCelRowAtFisRot${rowCountAtivFisRot}_5" itemprop="celAtFisRot">
        <input type="number" min="0" max="255" class="contSet tabInpAtFisRot tabInpRowAtFisRot2" id="tabInpRowAtFisRot${rowCountAtivFisRot}_4" itemprop="inpAtFisRot" />
      </td>
        `;
      if (tBodyContainer) {
        tBodyContainer.appendChild(newRow);
        const numInps = newRow.querySelectorAll('input[type="number"]');
        const textElements = newRow.querySelectorAll('input[type="text"]');
        for (let iT = 0; iT < textElements.length; iT++) {
          textElements[iT].addEventListener("input", () =>
            Model.autoCapitalizeInputs(textElements[iT])
          );
        }
        for (let iN = 0; iN < numInps.length; iN++) {
          numInps[iN].addEventListener("input", () =>
            Model.numberLimit(numInps[iN])
          );
        }
      }
      rowCountAtivFisRot++;
    } else if (container.classList.contains("removeAtFisRot")) {
      const validParent = document.getElementById("tabAtFisRot");
      if (validParent) {
        const siblingsCollection = validParent.children;
        const validNextParent =
          siblingsCollection.namedItem(`tabTbodyAtFisRot`);
        if (validNextParent) {
          const nextSiblingsCollection = validNextParent.children;
          const rowToRemove = nextSiblingsCollection.namedItem(
            `tabRowAtFisRotId${rowCountAtivFisRot - 1}`
          );
          if (
            rowToRemove &&
            rowCountAtivFisRot !== 3 &&
            rowToRemove.id !== "tabRowAtFisRotId2"
          ) {
            rowToRemove.remove();
            rowCountAtivFisRot -= 1;
          }
        }
      }
    } else if (container.classList.contains("addAtFisProp")) {
      const tBodyContainer = document.getElementById("tabTbodyAtFisProp");
      const newRow = document.createElement("tr");
      newRow.className = "contQuint tabRowAtFisProp";
      newRow.id = `tabRowAtFisPropId${rowCountAtivFisProp}`;
      newRow.itemprop = "rowAtFisProp";
      newRow.innerHTML = `
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_1" itemprop="celAtFisProp">${
        rowCountAtivFisProp - 1
      }&#41</td>
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_2" itemprop="celAtFisProp">
        <input type="text" min="0" max="255" class="contSet tabInpAtFisProp tabInpRowAtFisProp2" id="tabInpRowAtFisProp${rowCountAtivFisProp}_1" itemprop="inpAtFisProp" required />
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_3" itemprop="celAtFisProp">
        <input type="number" min="0" max="255" class="contSet inpAtivFis tabInpAtFisProp tabInpRowAtFisProp2" id="tabInpRowAtFisProp${rowCountAtivFisProp}_2" itemprop="inpAtFisProp" required />
      </td>
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_4" itemprop="celAtFisProp">
        <input type="number" min="0" max="255" class="contSet tabInpAtFisProp tabInpRowAtFisProp2" id="tabInpRowAtFisProp${rowCountAtivFisProp}_3" itemprop="inpAtFisProp" required />
      </td>
      <td class="contSext tabCelAtFisProp" id="tabCelRowAtFisProp${rowCountAtivFisProp}_5" itemprop="celAtFisProp">
        <input type="number" min="0" max="255" class="contSet tabInpAtFisProp tabInpRowAtFisProp2" id="tabInpRowAtFisProp${rowCountAtivFisProp}_4" itemprop="inpAtFisProp" required />
      </td>
        `;
      if (tBodyContainer) {
        tBodyContainer.appendChild(newRow);
        const numInps = newRow.querySelectorAll('input[type="number"]');
        const textElements = newRow.querySelectorAll('input[type="text"]');
        for (let iT = 0; iT < textElements.length; iT++) {
          textElements[iT].addEventListener("input", () =>
            Model.autoCapitalizeInputs(textElements[iT])
          );
        }
        for (let iN = 0; iN < numInps.length; iN++) {
          numInps[iN].addEventListener("input", () =>
            Model.numberLimit(numInps[iN])
          );
        }
      }
      rowCountAtivFisProp++;
    } else if (container.classList.contains("removeAtFisProp")) {
      const validParent = document.getElementById("tabAtFisProp");
      if (validParent) {
        const siblingsCollection = validParent.children;
        const validNextParent =
          siblingsCollection.namedItem(`tabTbodyAtFisProp`);
        if (validNextParent) {
          const nextSiblingsCollection = validNextParent.children;
          const rowToRemove = nextSiblingsCollection.namedItem(
            `tabRowAtFisPropId${rowCountAtivFisProp - 1}`
          );
          if (
            rowToRemove &&
            rowCountAtivFisProp !== 3 &&
            rowToRemove.id !== "tabRowAtFisPropId2"
          ) {
            rowToRemove.remove();
            rowCountAtivFisProp -= 1;
          }
        }
      }
    }
  }
}

export function addRowComorb(container) {
  if (container.tagName === "BUTTON" && container.id === "addComorb") {
    const parentTab = document.getElementById("tabComorb");
    const newComorbRow = document.createElement("tr");
    newComorbRow.className = "contTerc tabRowComorb";
    newComorbRow.id = `tabRowComorb${rowCountComorb}`;
    newComorbRow.innerHTML = `
    <td class="contQuat tabCelComorb tabCelRowComorb${rowCountComorb}" id="tabCelRowComorb${rowCountComorb}_1">${
      rowCountComorb - 1
    }</td>
    <td class="contQuat tabCelComorb tabCelRowComorb${rowCountComorb}" id="tabCelRowComorb${rowCountComorb}_2">
      <input type="text" class="contQuint tabInpComorb tabInpRowComorb${rowCountComorb}" id="tablInpRowComorb${rowCountComorb}_2"/>
    </td>
    <td class="contQuat tabCelComorb tabCelRowComorb${rowCountComorb}" id="tabCelRowComorb${rowCountComorb}_3">
      <input type="date" class="contQuint tabInpComorb tabInpRowComorb${rowCountComorb} id="tablInpRowComorb${rowCountComorb}_3"/>
    </td>
    `;

    if (parentTab) {
      parentTab.appendChild(newComorbRow);
      const textElements = newComorbRow.querySelectorAll('input[type="text"]');
      for (let iB = 0; iB < textElements.length; iB++) {
        textElements[iB].addEventListener("input", () =>
          Model.autoCapitalizeInputs(textElements[iB])
        );
      }
      rowCountComorb++;
    }
  } else if (
    container.tagName === "BUTTON" &&
    container.id === "removeComorb"
  ) {
    const validComorbParent = document.getElementById("tabComorb");
    if (validComorbParent) {
      const siblingsComorbCollection = validComorbParent.children;
      if (validComorbParent) {
        const comorbRowToRemove = siblingsComorbCollection.namedItem(
          `tabRowComorb${rowCountComorb - 1}`
        );
        if (
          comorbRowToRemove &&
          rowCountComorb !== 3 &&
          comorbRowToRemove.id !== "tabRowComorb2"
        ) {
          comorbRowToRemove.remove();
          rowCountComorb--;
        }
      }
    }
  }
}

export function useCurrentDate(activation, dateBtn) {
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

  if (
    activation.target === dateBtn &&
    dateBtn.previousElementSibling &&
    dateBtn.previousElementSibling.tagName === "INPUT" &&
    dateBtn.previousElementSibling instanceof HTMLInputElement
  ) {
    dateBtn.previousElementSibling.value = ano + "-" + mes + "-" + dia;
  }
}

function searchPreviousSiblings(currentElement, searchedSiblingClass) {
  while (currentElement.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    let isSiblingValid =
      currentElement.classList.contains(searchedSiblingClass);
    if (isSiblingValid) {
      break;
    }
  }
  return currentElement;
}

export function switchRequiredCols(elements) {
  if (elements.length > 0 && elements[1] instanceof HTMLSelectElement) {
    const consTablesFs = elements[0];
    const numConsElement = elements[1];
    const tabSVi = elements[2];
    const tabMedAnt = elements[3];
    const tabDC = elements[4];
    const tabIndPerc = elements[5];
    let numCons = parseInt(numConsElement?.value || "1");
    console.log("numcons " + numCons);

    //adiciona listener para responder à mudança no valor de consulta
    let returnedNum = parseInt(updateSimpleProperty(numConsElement) ?? "0", 10);
    if (
      typeof returnedNum === "number" &&
      returnedNum > 0 &&
      returnedNum <= 3
    ) {
      numCons = returnedNum;
      console.log("numcons " + numCons);
      //inicia construção de matriz para reset de required na tabela
      const totalTables = consTablesFs?.querySelectorAll("table");
      const totalRows = consTablesFs?.querySelectorAll("tr");
      console.log(totalRows);
      let nTotalRows = 0;
      if (totalRows && totalRows.length > 0) {
        nTotalRows = totalRows.length - totalTables.length;
      } else {
        console.error(`Erro consultando NodeList de elementos <col>.
        Elemento obtido: ${totalRows ?? "null"};
        Length obtida: ${totalRows?.length ?? 0}`);
      }

      const totalCols = consTablesFs?.querySelectorAll("col");
      let nTotalCols = 0;
      if (totalCols && totalCols.length > 0) {
        nTotalCols = totalCols.length - totalTables.length;
      } else {
        console.error(`Erro consultando NodeList de elementos <col>.
        Elemento obtido: ${totalCols ?? "null"};
        Length obtida: ${totalCols?.length ?? 0}`);
      }

      let nTotalMatrixValidAxes = 0;
      if (
        nTotalRows !== 0 &&
        !Number.isNaN(nTotalRows) &&
        nTotalCols !== 0 &&
        !Number.isNaN(nTotalCols)
      ) {
        nTotalMatrixValidAxes = nTotalRows * nTotalCols;
      } else {
        console.error(`Erro na construção da Matriz para eixos de preenchimento.
        Número de Linhas obtidas: ${nTotalRows ?? 0};
        Número de Colunas obtidas: ${nTotalCols ?? 0}.`);
      }

      //captura elementos de input para reset baseado nas matrizes inpsCells e nTotalMatrixValidAxes
      const inpsCellsSVi = tabSVi.querySelectorAll(".tabInpProgSVi");
      const inpsCellsMedAnt = tabMedAnt.querySelectorAll(".tabInpProgMedAnt");
      const inpsCellsDC = tabDC.querySelectorAll(".tabInpProgCons");
      const inpsCellsIndPerc = tabIndPerc.querySelectorAll(".inpInd");
      const inpsCells = [
        ...inpsCellsSVi,
        ...inpsCellsMedAnt,
        ...inpsCellsDC,
        ...inpsCellsIndPerc,
      ];

      //reseta o atributo required das cells para novas atribuições de required
      if (
        inpsCells.length > 0 &&
        inpsCells.length === nTotalMatrixValidAxes / totalTables.length
      ) {
        inpsCells.forEach((inpCel) => {
          if (inpCel instanceof HTMLInputElement) {
            inpCel.required = false;
          } else {
            console.warn(`Erro validando instância de Input em Célula.
            Instância obtida: ${
              Object.prototype.toString.call(inpCel).slice(8, -1) ?? "null"
            }.`);
          }
        });
      } else {
        console.error(`Erro na determinação de .length do array de Input em Células.
        Número obtido: ${inpsCells.length ?? 0};
        Equivale ao número desejado para a matriz de Eixos de Preenchimento: ${
          inpsCells.length === nTotalMatrixValidAxes ?? false
        };
        Número aceito: ${nTotalMatrixValidAxes / totalTables.length};
        Número de Inputs para Sinais Vitais obtido: ${
          inpsCellsSVi?.length ?? 0
        };
        Número de Inputs para Medidas Antropométricas obtido: ${
          inpsCellsMedAnt?.length ?? 0
        };
        Número de Inputs para Dobras Cutâneas obtido: ${
          inpsCellsDC?.length ?? 0
        };
        Número de Inputs para Índices e Percentuais obtido: ${
          inpsCellsIndPerc?.length ?? 0
        }.`);
      }

      //determinação das novas cells required
      let validInpsNodeLists = [false, false, false, false];

      //formação das matrizes para validar os números de inputs obtidos para cada tabela
      const nRowsSVi = tabSVi.querySelectorAll("tr");
      const nColsSVi = tabSVi.querySelectorAll("col");
      let matrixValidAxesSVi = 0;
      if (nRowsSVi.length > 0 && nColsSVi.length > 0) {
        matrixValidAxesSVi = (nRowsSVi.length - 1) * (nColsSVi.length - 1);
      } else {
        console.error(`Erro validando Número de Linhas na Tabela de Sinais Vitais.
        Número de Linhas obtidas: ${nRowsSVi?.length ?? 0};
        Número de Colunas obtidas: ${nColsSVi?.length ?? 0}.`);
      }

      const nRowsMedAnt = tabMedAnt.querySelectorAll("tr");
      const nColsMedAnt = tabMedAnt.querySelectorAll("col");
      let matrixValidAxesMedAnt = 0;
      if (nRowsMedAnt.length > 0 && nColsMedAnt.length > 0) {
        matrixValidAxesMedAnt =
          (nRowsMedAnt.length - 1) * (nColsMedAnt.length - 1);
      } else {
        console.error(`Erro validando Número de Linhas na Tabela de Sinais Vitais.
        Número de Linhas obtidas: ${nRowsMedAnt?.length ?? 0};
        Número de Colunas obtidas: ${nColsMedAnt?.length ?? 0}.`);
      }

      const nRowsDC = tabDC.querySelectorAll("tr");
      const nColsDC = tabDC.querySelectorAll("col");
      let matrixValidAxesDC = 0;
      if (nRowsDC.length > 0 && nColsDC.length > 0) {
        matrixValidAxesDC = (nRowsDC.length - 1) * (nColsDC.length - 1);
      } else {
        console.error(`Erro validando Número de Linhas na Tabela de Sinais Vitais.
        Número de Linhas obtidas: ${nRowsDC?.length ?? 0};
        Número de Colunas obtidas: ${nColsDC?.length ?? 0}.`);
      }

      const nRowsIndPerc = tabIndPerc.querySelectorAll("tr");
      const nColsIndPerc = tabIndPerc.querySelectorAll("col");
      let matrixValidAxesIndPerc = 0;
      if (nRowsIndPerc.length > 0 && nColsIndPerc.length > 0) {
        matrixValidAxesIndPerc =
          (nRowsIndPerc.length - 1) * (nColsIndPerc.length - 1);
      } else {
        console.error(`Erro validando Número de Linhas na Tabela de Sinais Vitais.
        Número de Linhas obtidas: ${nRowsIndPerc?.length ?? 0};
        Número de Colunas obtidas: ${nColsIndPerc?.length ?? 0}.`);
      }

      //validação das NodeLists de Inputs nas células
      if (
        Array.from(inpsCellsSVi).every(
          (inpCell) => inpCell instanceof HTMLInputElement
        ) &&
        inpsCellsSVi.length > 0 &&
        inpsCellsSVi.length === matrixValidAxesSVi
      ) {
        validInpsNodeLists[0] = true;
      } else {
        console.warn(`Erro capturando inputs de Sinais Vitais com querry.
          Array obtido: ${JSON.stringify(inpsCellsSVi) ?? "null"};
          Todos os elementos como HTMLInputs: ${
            Array.from(inpsCellsSVi).every(
              (inpCell) => inpCell instanceof HTMLInputElement
            ) ?? false
          };
          Length esperada: ${matrixValidAxesSVi ?? 0}.`);
      }

      if (
        Array.from(inpsCellsMedAnt).every(
          (inpCell) => inpCell instanceof HTMLInputElement
        ) &&
        inpsCellsMedAnt.length > 0 &&
        inpsCellsMedAnt.length === matrixValidAxesMedAnt
      ) {
        validInpsNodeLists[1] = true;
      } else {
        console.warn(`Erro capturando inputs de Medidas Antropométricas com querry.
          Array obtido: ${JSON.stringify(inpsCellsMedAnt) ?? "null"};
          Todos os elementos como HTMLInputs: ${
            Array.from(inpsCellsMedAnt).every(
              (inpCell) => inpCell instanceof HTMLInputElement
            ) ?? false
          };
          Length esperada: ${matrixValidAxesMedAnt ?? 0}`);
      }

      if (
        Array.from(inpsCellsDC).every(
          (inpCell) => inpCell instanceof HTMLInputElement
        ) &&
        inpsCellsDC.length > 0 &&
        inpsCellsDC.length === matrixValidAxesDC
      ) {
        validInpsNodeLists[2] = true;
      } else {
        console.warn(`Erro capturado inputs de Dobras Cutâneas com querry.
          Array obtido: ${JSON.stringify(inpsCellsDC) ?? "null"};
          Todos os elementos como HTMLInputs: ${
            Array.from(inpsCellsDC).every(
              (inpCell) => inpCell instanceof HTMLInputElement
            ) ?? false
          };
          Length esperada: ${matrixValidAxesDC ?? 0}`);
      }

      if (
        Array.from(inpsCellsIndPerc).every(
          (inpCell) => inpCell instanceof HTMLInputElement
        ) &&
        inpsCellsIndPerc.length > 0 &&
        inpsCellsIndPerc.length === matrixValidAxesIndPerc
      ) {
        validInpsNodeLists[3] = true;
      } else {
        console.warn(`Erro capturando inputs de Índices e Percentuais com querry.
          Array obtido: ${JSON.stringify(inpsCellsIndPerc) ?? "null"};
          Todos os elementos como HTMLInputs: ${
            Array.from(inpsCellsIndPerc).every(
              (inpCell) => inpCell instanceof HTMLInputElement
            ) ?? false
          };
          Length esperada: ${matrixValidAxesIndPerc ?? 0}`);
      }

      let consRequiredCellsSVi = [];
      let consRequiredCellsMedAnt = [];
      let consRequiredCellsDC = [];
      let consRequiredCellsIndPerc = [];
      //validação de NodeLists para inputs nas tabelas
      if (
        validInpsNodeLists.every(
          (inpsNodeListValidation) => inpsNodeListValidation === true
        )
      ) {
        /* percorre a tabela usando o número de consulta como números de ciclos
        ou seja, length dos arrays formados pelas querries === length do número de consulta === número de colunas
        + são extraídas as células de interesse, com base na .id relativa à coluna, e então populam requiredCels */
        for (let iC = 0; iC < numCons; iC++) {
          const filterPattern = new RegExp(`_${iC + 2}`);
          const filterInpCellSVi = Array.from(inpsCellsSVi).filter(
            (inpCellSVi) => filterPattern.test(inpCellSVi.id)
          );
          if (filterInpCellSVi.length > 0) {
            consRequiredCellsSVi.push(filterInpCellSVi);
          } else {
            console.warn(
              `Erro na filtragem de .id dos elementos da Tabela de Sinais Vitais, coluna ${iC}.`
            );
          }
          const filterInpCellMedAnt = Array.from(inpsCellsMedAnt).filter(
            (inpCellMedAnt) => filterPattern.test(inpCellMedAnt.id)
          );
          if (filterInpCellMedAnt.length > 0) {
            consRequiredCellsMedAnt.push(filterInpCellMedAnt);
          } else {
            console.warn(
              `Erro na filtragem de .id dos elementos da Tabela de Medidas Antropomórfias, coluna ${iC}.`
            );
          }
          const filterInpCellDC = Array.from(inpsCellsDC).filter((inpCellDC) =>
            filterPattern.test(inpCellDC.id)
          );
          if (filterInpCellDC.length > 0) {
            consRequiredCellsDC.push(filterInpCellDC);
          } else {
            console.warn(
              `Erro na filtragem de .id dos elementos da Tabela de Dobras Cutâneas, coluna ${iC}.`
            );
          }
          const filterInpCellIndPerc = Array.from(inpsCellsIndPerc).filter(
            (inpCellIndPerc) => filterPattern.test(inpCellIndPerc.name)
          );
          if (filterInpCellIndPerc.length > 0) {
            consRequiredCellsIndPerc.push(filterInpCellIndPerc);
          } else {
            console.warn(
              `Erro na filtragem de .id dos elementos da Tabela de Índices e Percentuais, coluna ${iC}.`
            );
          }
        }
      } else {
        console.error(`Erro na validação de NodeLists de Inputs nas Tabelas.
        Array de Validação para NodeLists obtido: ${
          JSON.stringify(validInpsNodeLists) ?? "undefined"
        }`);
      }

      let requiredCells = [
        ...consRequiredCellsSVi,
        ...consRequiredCellsMedAnt,
        ...consRequiredCellsDC,
        ...consRequiredCellsIndPerc,
      ];

      const flatRequiredCells = requiredCells.flat(1);
      if (
        flatRequiredCells.length > 0 &&
        flatRequiredCells.length === nTotalRows * numCons
      ) {
        for (let iR = 0; iR < flatRequiredCells.length; iR++) {
          flatRequiredCells[iR].required = true;
        }
      } else {
        console.warn(`Erro validando flatRequiredCells.
      Length obtida: ${flatRequiredCells?.length ?? 0}`);
      }
    } else {
      console.error(`Erro atualizando Número de Consulta.
          Número obtido: ${returnedNum ?? 0}`);
    }
  } else {
    console.error(`Erro obtendo HTMLElements a partir de operador rest.
    Length obtida: ${elements?.length ?? 0};
    Instância obtida para elements[1]: ${
      Object.prototype.toString.call(elements[1]).slice(8, -1) ?? "null"
    }`);
  }
}

export function createArraysRels(btnId, arrayRows) {
  let arrayConsultasNum = [];
  let rowValues = [];
  let tabValues = [];
  let columnValues = [];
  let colAcc = 0;
  const btnRowMatch = btnId?.match(/[0-9]+(?=_)/)?.toString();
  const btnColMatch = btnId?.match(/(?<=_)[0-9]+/)?.toString();
  if (btnColMatch && btnRowMatch) {
    const btnCol = parseInt(btnColMatch, 10);
    const btnRow = parseInt(btnRowMatch, 10);
    for (let iR = 0; iR < arrayRows.length; iR++) {
      const isValidRowArray = arrayRows.every(
        (row) => row instanceof HTMLTableRowElement
      );
      if (iR === 0 && isValidRowArray) {
        arrayConsultasNum = getConsultasNums(arrayRows[iR]); //obtém os números dos headers de consulta na forma de um array
        continue;
      }
      const nCels = arrayRows[iR].childElementCount;
      let arrayCelsIds = [];
      for (let iCh = 1; iCh < nCels; iCh++) {
        arrayCelsIds.push(arrayRows[iR].children[iCh].id);
      }
      if (iR !== arrayRows.length - 1 && arrayConsultasNum) {
        rowValues = getRowValues(arrayRows, arrayConsultasNum, arrayCelsIds);
        if (rowValues) {
          tabValues = [...tabValues, ...rowValues];
        }
      }
    }
    for (let iT = btnCol - 2; iT < tabValues.length; iT += 3) {
      columnValues = [...columnValues, tabValues[iT]];
    }
    if (
      arrayConsultasNum &&
      btnCol - 1 == arrayConsultasNum[btnCol - 2] &&
      columnValues
    ) {
      //define qual coluna será utilizada de acordo com a posição do botão e validando se há algum preenchimento na coluna
      let inputAcc = 0;
      for (let iR = 0; iR < btnRow - 1; iR++) {
        const targCelInp = document.getElementById(
          `tabInpRowDCut${2 + iR}_${btnCol}`
        );
        if (targCelInp instanceof HTMLInputElement) {
          if (iR < btnRow - 2) {
            if (targCelInp && targCelInp.value !== "") {
              colAcc += parseInt(targCelInp?.value);
            }
          } else if (iR < btnRow - 1) {
            const tbodyQuery = document.getElementById("tabTbodyDCut");
            if (tbodyQuery) {
              const tBodyChildren = Array.from(tbodyQuery.children);
              if (tBodyChildren) {
                for (let iC = 0; iC < tBodyChildren.length; iC++) {
                  const innerInp = tBodyChildren[iC].querySelector("input");
                  if (
                    !tBodyChildren[iC].hidden &&
                    inputAcc <= 3 &&
                    innerInp &&
                    innerInp.value !== "" &&
                    !tBodyChildren[iC].id !== "rowSum"
                  ) {
                    inputAcc++;
                    if (inputAcc === 4) {
                      inputAcc--;
                    }
                  }
                }
              } else {
                console.warn(
                  `Erro validando children do tbody. Coleção: ${tBodyChildren}`
                );
              }
              if (inputAcc === 3) {
                targCelInp.value = colAcc.toString();
              } else {
                //TODO DIALOG DE ALERTA
                console.warn(
                  `Número de preenchimentos insuficiente. Número obtido: ${inputAcc}; Número exigido: 3`
                );
              }
            } else {
              console.warn(`Erro validando tbody`);
            }
          }
        }
      }
    } else if (!columnValues) {
      //TODO DIALOG DE ALERTA
    }
  }
}

function getConsultasNums(arrayRow) {
  const strConsultasNum = arrayRow.innerText.replaceAll(/[\D]/g, "");
  let arrayConsultasNum = [];
  for (let iL = 0; iL < strConsultasNum.length; iL++) {
    const consultasLetter = parseInt(
      strConsultasNum.slice(0 + iL, 1 + iL) ?? "0",
      10
    );
    arrayConsultasNum = arrayConsultasNum.concat(consultasLetter);
    if (iL === strConsultasNum.length - 1) {
      return arrayConsultasNum;
    }
  }
}

function getRowValues(arrayRows, arrayConsultasNum, arrayCelIds) {
  if (typeof arrayCelIds[0] === "string") {
    const idMatch = arrayCelIds[0]?.match(/[0-9]+(?=_)/);
    if (idMatch) {
      const numRow = (arrayCelIds[0] = parseInt(idMatch.toString(), 10));
      if (numRow !== arrayRows.length) {
        let arrayRowValues = [];
        for (let iCol = 0; iCol < arrayConsultasNum.length; iCol++) {
          const targCelInp = document.getElementById(
            `tabInpRowDCut${numRow}_${1 + arrayConsultasNum[iCol]}`
          );
          if (targCelInp && targCelInp instanceof HTMLInputElement) {
            if (targCelInp.value !== "") {
              arrayRowValues.push(targCelInp.value);
            }
          } else {
            console.warn(`Célula de id ${targCelInp.id} não encontrada`);
          }
          if (arrayRowValues.length === arrayConsultasNum.length) {
            return arrayRowValues;
          }
        }
      }
    }
  }
}

export function changeToAstDigit(click, toFileInpBtn) {
  const useAstDigitRegex = /Usar Assinatura Digital/;
  const useAstDigtRegexObj = new RegExp(useAstDigitRegex);
  const useAstTextRegex = /Retornar à Assinatura Escrita/;
  const useAstTextRegexObj = new RegExp(useAstTextRegex);
  let labCont = toFileInpBtn.parentElement.getElementsByClassName("labAst");
  if (
    !labCont[0] &&
    (toFileInpBtn.parentElement.tagName === "LABEL" ||
      toFileInpBtn.parentElement.tagName === "SPAN")
  ) {
    labCont = Array.of(toFileInpBtn.parentElement);
  }

  let astCount = 0;
  if (click.target === toFileInpBtn) {
    if (
      toFileInpBtn.textContent &&
      useAstDigtRegexObj.test(toFileInpBtn.textContent)
    ) {
      // console.log("true teste 1");
      const inpAst = searchPreviousSiblings(toFileInpBtn, "inpAst");

      if (inpAst instanceof HTMLInputElement) {
        const fileInp = document.createElement("input");
        fileInp.type = "file";
        fileInp.name = inpAst.name; //ignorar TS
        fileInp.id = inpAst.id;
        fileInp.className = inpAst.className;
        fileInp.setAttribute("accept", "image/*");
        if (inpAst.required) {
          fileInp.required = inpAst.required; //ignorar TS
        }
        if (inpAst.parentElement) {
          inpAst.parentElement.replaceChild(fileInp, inpAst);
          const idLabMatch = labCont[0].id.match(/Ast/)?.toString();
          const idInpMatch = fileInp.id.match(/Ast/)?.toString();
          const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
          const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
          if (idLabMatchIndex && idInpMatchIndex) {
            const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
            const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
            labCont[0].id = sliceOneLabId + sliceTwoInpId;
            toFileInpBtn.textContent = "Retornar à Assinatura Escrita";
            if (
              toFileInpBtn.previousElementSibling instanceof HTMLButtonElement
            ) {
              toFileInpBtn.previousElementSibling?.setAttribute("hidden", "");
            }
          } else {
            console.warn("Erro no match de ids do input");
          }
          if (fileInp) {
            fileInp.addEventListener("change", (chose) => {
              // console.log("evento ouvido");
              try {
                if (
                  chose.target instanceof HTMLInputElement &&
                  fileInp.files &&
                  fileInp.files.length > 0
                ) {
                  const imgFile = fileInp.files[0];
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
                      fileInp.id = inpAst.id;
                      fileInp.className = inpAst.className;
                      imgAstDigt.innerHTML = "";
                      if (typeof imgUrl === "string") {
                        imgAstDigt.src = imgUrl; //associação entre container e file carregado
                        // console.log("string validada");
                      }
                      imgAstDigt.id = fileInp.id;
                      imgAstDigt.className = fileInp.className;
                      imgAstDigt.setAttribute("alt", "Assinatura Digital");
                      imgAstDigt.setAttribute("decoding", "async");
                      imgAstDigt.setAttribute("loading", "eager");
                      imgAstDigt.setAttribute("crossorigin", "anonymous");
                      imgAstDigt.style.setProperty("max-width", "300px");
                      imgAstDigt.style.setProperty("max-height", "200px");
                      if (
                        fileInp.parentElement &&
                        labCont &&
                        labCont.length > 0
                      ) {
                        fileInp.parentElement.replaceChild(imgAstDigt, fileInp);
                        const idLabMatch = labCont[0].id
                          .match(/Ast/)
                          ?.toString();
                        const idInpMatch = imgAstDigt.id
                          .match(/Ast/)
                          ?.toString();
                        if (idLabMatch && idInpMatch) {
                          const idLabMatchIndex =
                            labCont[0].id.indexOf(idLabMatch);
                          const idInpMatchIndex =
                            imgAstDigt.id.indexOf(idInpMatch);
                          const sliceOneLabId = labCont[0].id.slice(
                            0,
                            idLabMatchIndex
                          );
                          const sliceTwoInpId =
                            imgAstDigt.id.slice(idInpMatchIndex);
                          labCont[0].id = sliceOneLabId + sliceTwoInpId;
                        } else {
                          console.warn("Erro no match de ids do input");
                        }
                      } else {
                        console.warn(`Erro na validação de labCont: elemento ${labCont}
                        e/ou parent: elemento ${fileInp.parentElement}`);
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
                } else {
                  throw new Error("Nenhum arquivo selecionado");
                }
              } catch (error) {
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
    } else if (
      toFileInpBtn.textContent &&
      useAstTextRegexObj.test(toFileInpBtn.textContent)
    ) {
      const inpAst =
        searchPreviousSiblings(toFileInpBtn, "inpAst") ||
        searchPreviousSiblings(toFileInpBtn, "imgAstDigit");
      if (
        inpAst instanceof HTMLImageElement ||
        inpAst instanceof HTMLInputElement
      ) {
        const fileInp = document.createElement("input");
        fileInp.type = "text";
        fileInp.name = inpAst.name;
        fileInp.id = inpAst.id;
        fileInp.className = inpAst.className;
        fileInp.setAttribute("required", "");
        if (inpAst.parentElement) {
          inpAst.parentElement.replaceChild(fileInp, inpAst);
          const idLabMatch = labCont[0].id.match(/Ast/)?.toString();
          const idInpMatch = fileInp.id.match(/Ast/)?.toString();
          if (idLabMatch && idInpMatch) {
            const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
            const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
            const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
            const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
            labCont[0].id = sliceOneLabId + sliceTwoInpId;
            toFileInpBtn.textContent = "Usar Assinatura Digital";
            toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
            fileInp.addEventListener("input", () =>
              Model.autoCapitalizeInputs(fileInp)
            );
          } else {
            console.warn("Erro no match de ids do Input");
          }
        }
      }
    }
  }
}

export function resetarFormulario(
  click,
  toFileInpBtns,
  editableCite,
  genTrans,
  genFisAlin
) {
  if (
    click.target instanceof HTMLElement &&
    click.target.tagName === "BUTTON"
  ) {
    const formulario = document.getElementById("formEdFis");

    if (formulario && formulario instanceof HTMLFormElement) {
      formulario.reset();
    } else {
      console.warn(`Erro validando formulário em reset.
      Instância obtida: ${
        Object.prototype.toString.call(formulario).slice(8, -1) ?? "null"
      }`);
    }

    if (editableCite && editableCite instanceof HTMLElement) {
      editableCite.textContent = `--Nome`;
      Model.removeFirstClick(editableCite);
    } else {
      console.warn(`Erro obtendo Cite Editável em reset.
      Elemento obtido: ${editableCite ?? "null"};
      Instância: ${Object.prototype.toString.call(editableCite).slice(8, -1)}`);
    }

    if (toFileInpBtns.length > 0) {
      toFileInpBtns.forEach((toFileInpBtn) => {
        if (
          toFileInpBtn instanceof HTMLButtonElement &&
          toFileInpBtn.textContent === "Retornar à Assinatura Escrita"
        ) {
          const inpAst =
            searchPreviousSiblings(toFileInpBtn, "inpAst") ||
            searchPreviousSiblings(toFileInpBtn, "imgAstDigit");
          if (
            inpAst &&
            (inpAst instanceof HTMLInputElement ||
              inpAst instanceof HTMLImageElement)
          ) {
            const fileInp = document.createElement("input");
            fileInp.type = "text";
            fileInp.name = inpAst.name;
            fileInp.id = inpAst.id;
            fileInp.className = inpAst.className;
            fileInp.setAttribute("required", "");
            if (inpAst.parentElement) {
              let labCont =
                toFileInpBtn.parentElement?.getElementsByClassName("labAst") ??
                [];
              if (
                (!labCont[0] || labCont[0].id === "") &&
                (toFileInpBtn.parentElement?.tagName === "LABEL" ||
                  toFileInpBtn.parentElement?.tagName === "SPAN")
              ) {
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
                fileInp.addEventListener("input", () =>
                  Model.autoCapitalizeInputs(fileInp)
                );
                toFileInpBtn.textContent = "Usar Assinatura Digital";
                toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
              } else {
                console.warn("Erro no match de ids do input");
              }
            } else {
              console.warn(`Erro localizando Parent Element de inpAst`);
            }
          } else {
            console.warn(
              `Erro reconhecendo Previous Element Sibling: inpAst ${Object.prototype.toString
                .call(inpAst)
                .slice(8, -1)}`
            );
          }
        } else {
          console.warn(`Erro validando Botão de Assinatura Digital.
          Instância obtida: ${
            Object.prototype.toString.call(toFileInpBtn).slice(8, -1) ?? "null"
          };
          .textContent obtido: ${toFileInpBtn?.textContent ?? "null"}`);
        }
      });
    } else {
      console.warn(`Erro obtendo .length da NodeList de Botões para Assinatura Digital.
      Length obtida: ${toFileInpBtns?.length ?? 0}`);
    }

    if (genTrans && genTrans instanceof HTMLSelectElement) {
      if (!genTrans.hidden) {
        genTrans.hidden = true;
      }
    } else {
      console.warn(`Erro obtendo elemento genTrans em reset.
      Instância obtida: ${
        Object.prototype.toString.call(genTrans).slice(8, -1) ?? "null"
      }`);
    }

    if (genFisAlin && genFisAlin instanceof HTMLSelectElement) {
      if (!genFisAlin.hidden) {
        genFisAlin.hidden = true;
      }
    } else {
      console.warn(`Erro obtendo elemento genFisAlin em reset.
      Instância obtida: ${
        Object.prototype.toString.call(genFisAlin).slice(8, -1) ?? "null"
      }`);
    }
  } else {
    console.error(
      `Erro validando target: instância de ${Object.prototype.toString
        .call(click.target)
        .slice(8, -1)}`
    );
  }
}

//TODO FINALIZAR COM CSS
export function subForm() {
  window.alert(
    "Sistema ainda não pronto\n...mas você teria enviado clicando aqui! :)"
  );
  // const requiredElements = document.querySelectorAll("[required]");
  // if (requiredElements) {
  //   const emptyElements = Array.from(requiredElements).filter((element) => {
  //     const value = element.value || element.textContent || "";
  //     return value === "";
  //   });
  //   if (emptyElements) {
  //     emptyElements.forEach((emptyElement) => {
  //       console.log("Elemento vazio: ", emptyElement.id);
  //       emptyElement.style.border = "rgb(255, 0, 0)";
  //       let emptyElementCStyle = window
  //         .getComputedStyle(emptyElement)
  //         .getPropertyValue("border-color");
  //       let rgbaMatch = emptyElementCStyle.match(rgbaRegex);
  //       if (rgbaMatch) {
  //         console.log("rgba " + rgbaMatch);
  //         // const fadingAlert = setInterval(() => {
  //         //   let rgbaMatch = emptyElementCStyle.match(rgbaRegex);
  //         // });
  //       }
  //     });
  //   }
  // }
}
