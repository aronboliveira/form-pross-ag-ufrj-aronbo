import * as Model from "./model.js";

let rowCountAtivFisRot = 3;
let rowCountAtivFisProp = 3;
let rowCountComorb = 3;
const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;

export function opRadioHandler(keydown: KeyboardEvent) {
  const radioPairs: NodeListOf<Element> = document.querySelectorAll(
    'input[id$="Yes"], input[id$="No"]' //acessando como par
  );

  for (
    let i = 0;
    i < radioPairs.length;
    i += 2 //pulando de par em par
  ) {
    const radioYes: Element = radioPairs[i];
    const radioNo: Element = radioPairs[i + 1];

    if (!radioYes || !radioNo) {
      continue;
    }
    if (
      radioYes instanceof HTMLInputElement &&
      radioNo instanceof HTMLInputElement &&
      !radioYes.checked &&
      !radioNo.checked
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

export function cpbInpHandler(radio: HTMLInputElement) {
  const opRadiosCheck: NodeListOf<HTMLInputElement> | undefined =
    radio.parentElement?.querySelectorAll("input[id^='Cpb'][id$='Yes']");
  const divAdd: NodeListOf<HTMLDivElement> | undefined =
    radio.parentElement?.parentElement?.querySelectorAll("div[id^='divAdd']");
  opRadiosCheck?.forEach(function (opRadioCheck: Element, i: number): void {
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

export function doubleClickHandler(this: HTMLInputElement) {
  if (this.checked) {
    this.checked = false;
  } else {
    this.checked = true;
  }
  const radio: HTMLInputElement | null | undefined =
    this.parentElement?.querySelector("input[id^='Cpb'][id$='Yes']");
  if (radio) {
    cpbInpHandler(radio);
  }
}

export function addRowAtivFis(container: Element): void {
  if (
    container instanceof HTMLButtonElement &&
    container.tagName === "BUTTON"
  ) {
    if (container.classList.contains("addAtFisRot")) {
      const tBodyContainer = document.getElementById("tabTbodyAtFisRot");
      const newRow = document.createElement("tr");
      newRow.className = "contQuint tabRowAtFisRot";
      newRow.id = `tabRowAtFisRotId${rowCountAtivFisRot}`;
      // newRow.itemprop = "rowAtFisRot";
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
        const numInps: NodeListOf<HTMLInputElement> = newRow.querySelectorAll(
          'input[type="number"]'
        );
        const textElements: NodeListOf<HTMLInputElement> =
          newRow.querySelectorAll('input[type="text"]');
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
      // newRow.itemprop = "rowAtFisProp";
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
        const numInps: NodeListOf<HTMLInputElement> = newRow.querySelectorAll(
          'input[type="number"]'
        );
        const textElements: NodeListOf<HTMLInputElement> =
          newRow.querySelectorAll('input[type="text"]');
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

export function addRowComorb(container: Element): void {
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

export function useCurrentDate(
  activation: Event,
  dateBtn: HTMLButtonElement
): void {
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

function searchPreviousSiblings(
  currentElement: Element,
  searchedSiblingClass: string
): Element {
  while (currentElement.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    let isSiblingValid: boolean =
      currentElement.classList.contains(searchedSiblingClass);
    if (isSiblingValid) {
      break;
    }
  }
  return currentElement;
}

export function createArraysRels(
  btnId: string,
  arrayRows: HTMLTableRowElement[]
) {
  let arrayConsultasNum: number[] | undefined = [];
  let rowValues: string[] | undefined = [];
  let tabValues: string[] | undefined = [];
  let columnValues: string[] | undefined = [];
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
    console.log(tabValues);
    for (let iT = btnCol - 2; iT < tabValues.length; iT += 3) {
      columnValues = [...columnValues, tabValues[iT]];
    }
    if (
      arrayConsultasNum &&
      btnCol - 1 == arrayConsultasNum[btnCol - 2] &&
      columnValues
    ) {
      //define qual coluna será utilizada de acordo com a posição do botão e validando se há algum preenchimento na coluna
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
            targCelInp.value = colAcc.toString();
          }
        }
      }
    } else if (!columnValues) {
      // const dlgNoValues = document.createElement("dialog");
    }
  }
}

function getConsultasNums(arrayRow: HTMLTableRowElement) {
  const strConsultasNum = arrayRow.innerText.replaceAll(/[\D]/g, "");
  let arrayConsultasNum: number[] = [];
  for (let iL = 0; iL < strConsultasNum.length; iL++) {
    const consultasLetter = parseInt(strConsultasNum.slice(0 + iL, 1 + iL));
    arrayConsultasNum = arrayConsultasNum.concat(consultasLetter);
    if (iL === strConsultasNum.length - 1) {
      return arrayConsultasNum;
    }
  }
}

//TODO AJUSTAR INCLUSÃO DE VALORES APÓS REUNIÃO
function getRowValues(
  arrayRows: HTMLTableRowElement[],
  arrayConsultasNum: number[],
  arrayCelIds: (string | number)[]
) {
  if (typeof arrayCelIds[0] === "string") {
    const idMatch = arrayCelIds[0]?.match(/[0-9]+(?=_)/);
    if (idMatch) {
      const numRow = ((arrayCelIds[0] = parseInt(idMatch.toString())), 10);
      if (numRow !== arrayRows.length) {
        let colAcc = 0;
        let arrayRowValues = [];
        for (let iCol = 0; iCol < arrayConsultasNum.length; iCol++) {
          const targCelInp = document.getElementById(
            `tabInpRowDCut${numRow}_${1 + arrayConsultasNum[iCol]}`
          );
          if (targCelInp && targCelInp instanceof HTMLInputElement) {
            colAcc++;
            targCelInp.value = colAcc.toString(); //TODO INCLUÍDO PARA FINS DE TESTE
            arrayRowValues.push(targCelInp.value);
          } else {
            console.warn("Célula não encontrada");
          }
          if (arrayRowValues.length === arrayConsultasNum.length) {
            return arrayRowValues;
          }
        }
      }
    }
  }
}

export function changeToAstDigit(
  click: Event,
  toFileInpBtn: HTMLButtonElement
): void {
  const useAstDigitRegex: RegExp = /Usar Assinatura Digital/;
  const useAstDigtRegexObj: RegExp = new RegExp(useAstDigitRegex);
  const useAstTextRegex: RegExp = /Retornar à Assinatura Escrita/;
  const useAstTextRegexObj: RegExp = new RegExp(useAstTextRegex);

  let astCount: number = 0;
  if (click.target === toFileInpBtn) {
    if (
      toFileInpBtn.textContent &&
      useAstDigtRegexObj.test(toFileInpBtn.textContent)
    ) {
      const inpAst: Element = searchPreviousSiblings(toFileInpBtn, "inpAst");

      if (inpAst instanceof HTMLInputElement) {
        const fileInp: HTMLInputElement = document.createElement("input");
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

          if (fileInp) {
            fileInp.addEventListener("change", (chose: Event) => {
              console.log("evento ouvido");
              try {
                if (
                  chose.target instanceof HTMLInputElement &&
                  fileInp.files &&
                  fileInp.files.length > 0
                ) {
                  const imgFile: File = fileInp.files[0];
                  console.log(imgFile);
                  console.log(imgFile.type);
                  if (imgFile && imgFile.type.startsWith("image")) {
                    console.log("img reconhecida");
                    const fileReader: FileReader = new FileReader();

                    fileReader.onload = (load: ProgressEvent<FileReader>) => {
                      //definir lógica para carregamento
                      //inicia preparo para evento de carregamento
                      console.log("loading iniciado");
                      astCount++;
                      const imgUrl: string | ArrayBuffer | null | undefined =
                        load.target?.result; //checa a url do file que será carregado
                      const imgAstDigt: HTMLImageElement =
                        document.createElement("img"); //cria container
                      imgAstDigt.className = "imgAstDigit";
                      imgAstDigt.id = `imgAstDigit${astCount}`;
                      imgAstDigt.innerHTML = "";
                      if (typeof imgUrl === "string") {
                        imgAstDigt.src = imgUrl; //associação entre container e file carregado
                        console.log("string validada");
                      }
                      imgAstDigt.setAttribute("alt", "Assinatura Digital");
                      imgAstDigt.setAttribute("decoding", "async");
                      imgAstDigt.setAttribute("loading", "eager");
                      imgAstDigt.setAttribute("crossorigin", "anonymous");
                      imgAstDigt.style.setProperty("max-width", "1006px");
                      imgAstDigt.style.setProperty("max-height", "552px");
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
                } else {
                  throw new Error("Nenhum arquivo selecionado");
                }
              } catch (error: any) {
                console.error(error.message);
              }
            });
          }
        }
      }

      //TODO INCLUIR TOKEN ANTI-CSRF QUANDO HOUVER SERVIDOR
    } else if (
      toFileInpBtn.textContent &&
      useAstTextRegexObj.test(toFileInpBtn.textContent)
    ) {
      const inpAst: Element = searchPreviousSiblings(toFileInpBtn, "inpAst");
      if (
        inpAst instanceof HTMLImageElement ||
        inpAst instanceof HTMLInputElement
      ) {
        console.log("replace direcionado 1");
        const fileInp: HTMLInputElement = document.createElement("input");
        fileInp.type = "text";
        fileInp.name = "confirmAstName";
        fileInp.id = "inpAstConfirmId";
        fileInp.className = "contQuint inpAst";
        fileInp.setAttribute("required", "");
        console.log("atributos aplicados");
        if (inpAst.parentElement) {
          inpAst.parentElement.replaceChild(fileInp, inpAst);
          toFileInpBtn.textContent = "Usar Assinatura Digital";
          console.log("replace direcionado 2");
        }
      }
    }
  }
}

export function resetarFormulario(
  click: MouseEvent,
  toFileInpBtns: NodeListOf<HTMLButtonElement>
) {
  if (
    click.target instanceof HTMLElement &&
    click.target.tagName === "BUTTON"
  ) {
    const formulario = document.getElementById("formEdFis");
    const editableCite = document.querySelector('cite[contenteditable="true"]');

    if (formulario && formulario instanceof HTMLFormElement) {
      formulario.reset();
    } else {
      console.warn("Erro validando formulário");
    }

    if (editableCite) {
      editableCite.textContent = `--Nome`;
      Model.removeFirstClick(editableCite);
    }

    console.log("tofileinp " + toFileInpBtns[0].id + " " + toFileInpBtns[1].id);
    toFileInpBtns.forEach((toFileInpBtn) => {
      if (toFileInpBtn.textContent === "Retornar à Assinatura Escrita") {
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
            let labCont: HTMLCollectionOf<Element> | Element[] | never[] =
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
              console.log(labCont[0].id);
              toFileInpBtn.textContent = "Usar Assinatura Digital";
              toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
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
      }
    });
  } else {
    console.error(
      `Erro validando target: instância de ${Object.prototype.toString
        .call(click.target)
        .slice(8, -1)}`
    );
  }
}

//TODO FINALIZAR COM CSS
export function subForm(): void {
  window.alert(
    "Sistema ainda não pronto\n...mas você teria enviado clicando aqui! :)"
  );
}
