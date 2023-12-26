//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
"use strict";
import * as GlobalModel from "../../globalScripts/dist/gModel.js";
import * as GlobalHandler from "../../globalScripts/dist/gHandlers.js";
import * as ErrorHandler from "../../globalScripts/dist/errorHandler.js";
let blockCount = 1;
export function searchCEP(cepElement) {
  const cepValue = cepElement?.value ?? null;
  let initTime = Date.now();
  let reqAcc = 2;
  if (cepElement && cepElement instanceof HTMLInputElement) {
    const progInts = displayCEPLoadBar(cepElement) ?? [0, 100, null];
    const progMax = progInts[0];
    const progValue = progInts[1];
    const progBar = progInts[2];
    const cepHifenOutValue = cepValue?.replaceAll("-", "");
    const urlBAPI1 = `https://brasilapi.com.br/api/cep/v2/${cepHifenOutValue}`;
    const xmlReq1 = new XMLHttpRequest();
    if (urlBAPI1) {
      xmlReq1.open("GET", urlBAPI1);
      xmlReq1.send();
      xmlReq1.onload = () => {
        const xmlReturn1 = loadCEP(xmlReq1, reqAcc);
        if (xmlReturn1 === 200) {
          console.log(`Primeira solicitação XML/HTTP feita com sucesso.`);
          if (progBar && progMax) {
            uploadCEPLoadBar(cepElement, initTime, progMax, progValue, progBar);
          }
        } else {
          console.warn(
            `Falha na primeira XML/HTTP Request. Iniciando segunda solicitação.`
          );
          reqAcc--;
          initTime = Date.now();
          const urlBAPI2 = `https://brasilapi.com.br/api/cep/v1/${cepHifenOutValue}`;
          const xmlReq2 = new XMLHttpRequest();
          if (urlBAPI2) {
            xmlReq2.open("GET", urlBAPI2);
            xmlReq2.send();
            xmlReq2.onload = () => {
              const xmlReturn2 = loadCEP(xmlReq2, reqAcc);
              if (xmlReturn2 === 200) {
                console.log(`Segunda solicitação XML/HTTP feita com sucesso.`);
                if (progBar && progMax) {
                  uploadCEPLoadBar(
                    cepElement,
                    initTime,
                    progMax,
                    progValue,
                    progBar
                  );
                }
              } else {
                console.error(
                  `Falha na segunda XML/HTTP Request. Procedimento cancelado. Insira Manualmente.`
                );
                if (progBar && progMax) {
                  uploadCEPLoadBar(
                    cepElement,
                    initTime,
                    progMax,
                    progValue,
                    progBar
                  );
                }
              }
            };
          } else {
            console.error(`Erro concantenando segunda URL com CEP.`);
          }
        }
      };
    } else {
      console.error(`Erro concatenando primeira URL com CEP.`);
    }
  } else {
    console.error(
      `Erro verificando input de CEP. Elemento: ${cepElement}; Instância ${Object.prototype.toString
        .call(cepElement)
        .slice(8, -1)}; Valor do elemento obtido: ${cepValue}`
    );
  }
}
function loadCEP(xmlReq, reqAcc) {
  let status;
  try {
    if (xmlReq.status === 200) {
      const parsedAddress = JSON.parse(xmlReq.response);
      if (parsedAddress) {
        const uf = document.getElementById("UFId");
        const city = document.getElementById("cityId");
        const neighborhood = document.getElementById("neighbourhoodId");
        const street = document.getElementById("streetId");
        if (uf instanceof HTMLInputElement) {
          uf.value = parsedAddress.state;
        }
        if (city instanceof HTMLInputElement) {
          city.value = parsedAddress.city;
        }
        if (neighborhood instanceof HTMLInputElement) {
          neighborhood.value = parsedAddress.neighborhood;
        }
        if (street instanceof HTMLInputElement) {
          street.value = parsedAddress.street;
        }
        status = 200;
      }
    } else if (xmlReq.status === 404) {
      throw new Error("404");
    } else {
      throw new Error("Não reconhecido");
    }
  } catch (loadError) {
    console.warn(`Status de Erro para CEPV${reqAcc}: `, loadError.message);
    status = 404;
  }
  return status;
}
function displayCEPLoadBar(cepElement) {
  let progMaxInt;
  let progValueInt;
  const progressBar = document.createElement("progress");
  cepElement.parentElement?.insertBefore(
    progressBar,
    cepElement.nextElementSibling?.nextElementSibling ?? null
  );
  if (progressBar && cepElement.nextElementSibling?.nextElementSibling) {
    progressBar.id = "loadBarCepVars";
    progressBar.max = 100;
    progMaxInt = progressBar.max;
    progressBar.value = 0;
    progValueInt = progressBar.value;
    progressBar.style.setProperty("background-color", "blue");
    progressBar.style.setProperty("color", "white");
    return [progMaxInt, progValueInt, progressBar];
  }
}
function uploadCEPLoadBar(
  cepElement,
  initTime,
  progMaxInt,
  progValueInt,
  progressBar
) {
  const finishTime = Date.now();
  const elapsedTime = finishTime - initTime;
  const elapsedNDec = elapsedTime.toString().length - 1;
  let addedZerosMult = "1";
  for (let iD = 0; iD < elapsedNDec; iD++) {
    addedZerosMult += "0";
  }
  const indNDec = 1 * parseInt(addedZerosMult);
  const roundedElapsed = Math.round(elapsedTime / indNDec) * indNDec;
  if (progValueInt !== progMaxInt) {
    const loadingEvent = setInterval(() => {
      progValueInt += 5;
      progressBar.value = progValueInt;
      if (progValueInt === progMaxInt) {
        clearInterval(loadingEvent);
      }
    }, roundedElapsed / 20);
  }
  setTimeout(() => {
    cepElement.parentElement?.removeChild(progressBar);
  }, roundedElapsed);
}
export function enableCEPBtn(cepLength, cepBtn) {
  let isCepElemenBtnOff = true;
  if (cepLength === 9) {
    cepBtn.removeAttribute("disabled");
    isCepElemenBtnOff = false;
  } else {
    cepBtn.setAttribute("disabled", "");
  }
  return isCepElemenBtnOff;
}
export function addAntMedHandler(click) {
  if (
    click.target instanceof HTMLButtonElement &&
    click.target.tagName === "BUTTON" &&
    click.target.classList.contains("addAntMed")
  ) {
    blockCount++; // Incrementa o número de blocos
    const antMedContainer = document.getElementById("antMedContainer");
    // Cria um novo conjunto de elementos HTML
    const newBlock = document.createElement("div");
    newBlock.className = "contTerc antMedBlock";
    newBlock.id = `antMedBlock${blockCount}`;
    newBlock.innerHTML = `
    <span class="contQuat divAntMedSpan spanMain" id="antMedSpanInp${blockCount}">
      <span class="contQuint divAntMedSubSpan spanSub" id="antMedSpanNum${blockCount}">${blockCount}&#41;</span>
      <label for="antMedId${blockCount}" class="antMedLabel"></label>
      <input type="text" name="antMedName${blockCount}" id="antMedId${blockCount}" class="inpAntMed" />
    </span>
    <span class="contQuat divAntMedSpan spanMain" id="antMedSpanMainDate${blockCount}">
      <span class="contQuint divAntMedSubSpan spanSub" id="antMedSpanSubDate${blockCount}">
        <input type="date" name="antMedDateIniName${blockCount}" id="antMedDateIniId${blockCount}" class="inpDate antMedDate inpAntMed"/> até
        <input type="date" name="antMedDateEndName${blockCount}" id="antMedDateEndId${blockCount}" class="inpDate antMedDate inpAntMed" />
        <label for="antMedDateEndId${blockCount}" for="antMedDateEndId1"></label>
        <button
        type="button"
        class="contQuint datBtn atualTratBtn"
        id="atualTrat${blockCount}DatBtn"
      >
        Usar data atual
        <button type="button" name="addAntMedName${blockCount}" id="addAntMedId${blockCount}" class="addAntMed countAntMed"
        value="addAntMed">+</button>
        <button type="button" name="removeAntMedName${blockCount}" id="removeAntMedId${blockCount}"
        class="removeAntMed countAntMed" value="removeAntMed">-</button>
      </span>
    </span>
  `;
    // Adiciona o novo bloco ao contêiner
    antMedContainer?.appendChild(newBlock);
    const dateBtns = newBlock.querySelectorAll('button[id$="DatBtn"]');
    const textElements = newBlock.querySelectorAll('input[type="text"]');
    for (let iT = 0; iT < textElements.length; iT++) {
      textElements[iT].addEventListener("input", () =>
        GlobalModel.autoCapitalizeInputs(textElements[iT])
      );
    }
    for (let iB = 0; iB < dateBtns.length; iB++) {
      dateBtns[iB].addEventListener("click", (activation) =>
        GlobalHandler.useCurrentDate(activation, dateBtns[iB])
      );
    }
  } else if (
    click.target instanceof HTMLButtonElement &&
    click.target.tagName === "BUTTON" &&
    click.target.classList.contains("removeAntMed")
  ) {
    const divToRemove = click.target.closest(".antMedBlock");
    if (divToRemove && blockCount !== 1 && divToRemove.id !== "antMedBlock1") {
      divToRemove.remove();
      blockCount -= 1;
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(
      click.target ?? null,
      `${click.target.id ?? "UNDEFINED BUTTON ID"}`,
      slicedError ?? "NULL"
    );
  }
}
