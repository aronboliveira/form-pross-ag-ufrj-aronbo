//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
import * as GlobalModel from "../../global-scripts/src/gModel.js";
import * as GlobalHandler from "../../global-scripts/src/gHandlers.js";
import * as ErrorHandler from "../../global-scripts/src/errorHandler.js";
import { extLine } from "../../global-scripts/src/errorHandler.js";

export function searchCEPXML(cepElement) {
  let initTime = Date.now();
  let reqAcc = 2;
  if (cepElement instanceof HTMLInputElement) {
    const progInts = displayCEPLoadBar(cepElement) ?? [0, 100, null];
    const progMax = progInts[0] || 0;
    const progValue = progInts[1] || 100;
    const progBar = progInts[2] || null;
    const cepHifenOutValue = cepElement?.value?.replaceAll("-", "") ?? "";
    const urlBAPI1 = `https://brasilapi.com.br/api/cep/v2/${cepHifenOutValue}`;
    const xmlReq1 = new XMLHttpRequest();
    if (urlBAPI1) {
      xmlReq1.open("GET", urlBAPI1);
      xmlReq1.send();
      xmlReq1.onload = () => {
        const xmlReturn1 = loadCEP(xmlReq1, reqAcc);
        if (xmlReturn1 === 200) {
          console.log(`Primeira solicitação XML/HTTP feita com sucesso.`);
          if (progBar && progMax)
            uploadCEPLoadBar(cepElement, progBar, initTime, progMax, progValue);
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
                if (progBar && progMax)
                  uploadCEPLoadBar(
                    cepElement,
                    progBar,
                    initTime,
                    progMax,
                    progValue
                  );
              } else {
                console.error(
                  `Falha na segunda XML/HTTP Request. Procedimento cancelado. Insira Manualmente.`
                );
                if (progBar && progMax)
                  uploadCEPLoadBar(
                    cepElement,
                    progBar,
                    initTime,
                    progMax,
                    progValue
                  );
              }
            };
          } else console.error(`Erro concantenando segunda URL com CEP.`);
        }
      };
    } else console.error(`Erro concatenando primeira URL com CEP.`);
  } else
    console.error(
      `Erro verificando input de CEP. Elemento: ${cepElement}; Instância ${Object.prototype.toString
        .call(cepElement)
        .slice(8, -1)}; Valor do elemento obtido: ${
        cepElement?.value ?? "NULL"
      }`
    );
}
export function loadCEP(xmlReq = new XMLHttpRequest(), reqAcc = 1) {
  let status = 404;
  try {
    if (xmlReq instanceof XMLHttpRequest && typeof reqAcc === "number") {
      const parsedAddress = JSON.parse(xmlReq.response);
      if (xmlReq.status === 200 && parsedAddress) {
        const uf = document.getElementById("UFId");
        const city = document.getElementById("cityId");
        const neighborhood = document.getElementById("neighbourhoodId");
        const street = document.getElementById("streetId");
        if (uf instanceof HTMLInputElement) uf.value = parsedAddress.state;
        if (city instanceof HTMLInputElement) city.value = parsedAddress.city;
        if (neighborhood instanceof HTMLInputElement)
          neighborhood.value = parsedAddress.neighborhood;
        if (street instanceof HTMLInputElement)
          street.value = parsedAddress.street;
        status = 200;
      } else if (xmlReq.status === 404) throw new Error("404");
      else throw new Error(`Não reconhecido.`);
    } else
      throw new Error(`ERRO NA ENTRADA DE ARGUMENTOS.
      VALORES OBTIDOS: ${JSON.stringify(xmlReq) || null}, ${reqAcc}`);
  } catch (loadError) {
    console.warn(`Status de Erro para CEPV${reqAcc}: `, loadError.message);
  }
  return status;
}
export function displayCEPLoadBar(cepElement) {
  const progressBar = document.createElement("progress");
  if (cepElement instanceof HTMLInputElement) {
    let progMaxInt = 100;
    let progValueInt = 0;
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
  } else
    ErrorHandler.inputNotFound(cepElement, "cepElement", extLine(new Error()));
  return [100, 0, progressBar];
}
export function uploadCEPLoadBar(
  cepElement,
  progressBar = new HTMLProgressElement(),
  initTime = 0,
  progMaxInt = 100,
  progValueInt = 0
) {
  if (
    cepElement instanceof HTMLInputElement &&
    progressBar instanceof HTMLProgressElement &&
    typeof initTime === `number` &&
    typeof progMaxInt === `number` &&
    typeof progValueInt === `number`
  ) {
    const elapsedTime = Date.now() - initTime;
    const elapsedNDec = elapsedTime.toString().length - 1;
    let addedZerosMult = "1";
    for (let iD = 0; iD < elapsedNDec; iD++) addedZerosMult += "0";
    const indNDec = 1 * parseInt(addedZerosMult);
    const roundedElapsed = Math.round(elapsedTime / indNDec) * indNDec;
    if (progValueInt !== progMaxInt) {
      const loadingEvent = setInterval(() => {
        progValueInt += 5;
        progressBar.value = progValueInt;
        if (progValueInt === progMaxInt) clearInterval(loadingEvent);
      }, roundedElapsed / 20);
    }
    setTimeout(() => {
      cepElement.parentElement?.removeChild(progressBar);
    }, roundedElapsed);
  } else
    ErrorHandler.multipleElementsNotFound(
      extLine(new Error()),
      "argumentos para uploadCEPLoadBar",
      cepElement,
      progressBar,
      initTime,
      progMaxInt,
      progValueInt
    );
}
export function enableCEPBtn(cepBtn, cepLength = 0) {
  let isCepElemenBtnOff = true;
  if (cepBtn instanceof HTMLButtonElement && typeof cepLength === "number") {
    if (cepLength === 9) {
      cepBtn.removeAttribute("disabled");
      isCepElemenBtnOff = false;
    } else cepBtn.setAttribute("disabled", "");
  } else
    ErrorHandler.multipleElementsNotFound(
      extLine(new Error()),
      "argumentos para enableCEPBtn",
      cepBtn,
      cepLength
    );
  return isCepElemenBtnOff;
}
export function addAntMedHandler(click, blockCount = 1) {
  if (
    click?.target?.classList?.contains("countAntMed") &&
    typeof blockCount === "number"
  ) {
    if (click instanceof Event && click?.target instanceof HTMLButtonElement) {
      if (click.target.classList?.contains("addAntMed")) {
        blockCount++; // Incrementa o número de blocos
        // Cria um novo conjunto de elementos HTML
        const newBlock = document.createElement("div");
        newBlock.className = "antMedBlock";
        newBlock.id = `antMedBlock${blockCount}`;
        newBlock.innerHTML = `
        <span class="divAntMedSpan spanMain spanAntMedText" id="antMedSpanInp${blockCount}">
          <label for="antMedId${blockCount}" class="antMedLabel">${blockCount}&#41
            <input type="text" name="antMedName${blockCount}" id="antMedId${blockCount}" class="form-control autocorrect autocorrectFirst inpAntMed antMedText" data-title="desc_tratamento${blockCount}"/>
          </label>
        </span>
        <span class="divAntMedSpan spanMain spanAntMedDate" id="antMedSpanMainDate${blockCount}">
          <span class="divAntMedSubSpan spanSub spanSubAntMedDate" id="antMedSpanSubDate${blockCount}">
            <div class="antMedDiv">
              <label for="antMedDateIniId${blockCount}" class="antMedLabel"></label>
              <input type="date" name="antMedDateIniName1" id="antMedDateIniId1" class="form-control inpDate antMedDate inpAntMed" data-title="data_ini_tratamento${blockCount}" required /> até
              <input type="date" name="antMedDateEndName1" id="antMedDateEndId1" class="form-control inpDate antMedDate inpAntMed" data-title="data_end_tratamento${blockCount}" required />
              <label for="antMedDateEndId${blockCount}" class="antMedLabel"></label>
              <button
              type="button"
              class="datBtn atualTratBtn btn btn-secondary"
              id="atualTrat${blockCount}DatBtn"
              >
              Usar data atual
              </button>
            </div>
            <div class="antMedBtnsDiv">
              <button type="button" name="addAntMedName${blockCount}" id="addAntMedId${blockCount}" class="addAntMed countAntMed btn btn-dark"
              value="addAntMed">+</button>
              <button type="button" name="removeAntMedName${blockCount}" id="removeAntMedId${blockCount}"
              class="removeAntMed countAntMed btn btn-dark" value="removeAntMed">-</button>
            </div>
          </span>
        </span>
      `;
        // Adiciona o novo bloco ao contêiner
        document.getElementById("antMedContainer")?.appendChild(newBlock);
        newBlock.querySelectorAll('button[id$="DatBtn"]').forEach(dateBtn => {
          dateBtn.addEventListener("click", activation =>
            GlobalHandler.useCurrentDate(activation, dateBtn)
          );
        });
        newBlock.querySelectorAll('input[type="text"]').forEach(textEl => {
          textEl.addEventListener("input", () =>
            GlobalModel.autoCapitalizeInputs(
              textEl,
              GlobalModel.checkAutoCorrect(
                document.querySelector('button[id^="deactAutocorrectBtn"]') ||
                  document.querySelector('input[id^="deactAutocorrectBtn"]')
              )
            )
          );
        });
      } else if (click.target.classList?.contains("removeAntMed")) {
        const divToRemove = click.target.closest(".antMedBlock");
        if (
          divToRemove &&
          blockCount > 1 &&
          divToRemove?.id !== "antMedBlock1"
        ) {
          divToRemove.remove();
          blockCount -= 1;
        } else {
          console.warn(`Erro localizando divToRemove:
        Elemento: ${JSON.stringify(divToRemove)};
        blockCount: ${blockCount};
        divToRemove id: ${divToRemove?.id}`);
          if (blockCount > 1) blockCount = 1;
        }
      } else
        console.error(`Error validating .classList of click.target in addAntMedHandler.
        Catched value: ${click?.target?.classList ?? "UNDEFINED CLASS LIST"}.`);
    } else
      ErrorHandler.elementNotFound(
        click?.target,
        `${click?.target?.id ?? "UNDEFINED BUTTON ID"}`,
        extLine(new Error())
      );
  } else {
    if (!(click?.target instanceof HTMLButtonElement))
      ErrorHandler.multipleElementsNotFound(
        extLine(new Error()),
        "arguments for addAntMedHandler()",
        `${JSON.stringify(click)}`,
        blockCount
      );
  }
  return blockCount;
}
