import * as Model from "./model.js";

const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
let blockCount = 1;
let isProgBarLoading = false;

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

export function cpbInpHandler() {
  let opRadiosCheck = document.querySelectorAll("input[id^='Cpb'][id$='Yes']");
  let opRadiosText = document.querySelectorAll("input[id^='pb'][id$='Yes']");
  let antFamChecks = document.querySelectorAll("input[id^='antFam']");
  let textAdd = document.querySelectorAll("textarea[id^='textAdd']");
  let divAdd = document.querySelectorAll("div[id^='divAdd']");
  //inclui ambos os tipos de eventos
  opRadiosCheck?.forEach(function (opRadioCheck, i) {
    if (!opRadioCheck.checked) {
      divAdd[i].style.display = "none";
    } else {
      divAdd[i].style.display = "block";
    }
  });
  opRadiosText?.forEach(function (opRadioText, i) {
    if (!opRadioText.checked) {
      textAdd[i].style.display = "none";
    } else {
      textAdd[i].style.display = "block";
    }
  });
  antFamChecks?.forEach((antFamCheck, i) => {
    let closestAddElement = antFamChecks[i].parentElement?.nextElementSibling;
    if (closestAddElement instanceof HTMLDivElement) {
      if (!antFamCheck.checked) {
        closestAddElement.style.display = "none";
      } else {
        closestAddElement.style.display = "block";
      }
    }
  });
}

export function deactTextInput() {
  const numberInputs = document.querySelectorAll(
    'input[type="number"][id$=NumId]'
  );
  const nullRadios = document.querySelectorAll(
    'input[type="radio"][id$=NullId]'
  );

  if (numberInputs.length !== nullRadios.length) {
    console.error("Número de texts e radios não corresponde!");
    return;
  }

  numberInputs.forEach((numberInput, i) => {
    const nullRadio = nullRadios[i];
    if (nullRadio.checked) {
      numberInput.setAttribute("disabled", "");
    } else {
      numberInput.removeAttribute("disabled");
    }
  });
}

export function doubleClickHandler() {
  if (this.checked) {
    this.checked = false;
  } else {
    this.checked = true;
  }
  cpbInpHandler();
  deactTextInput();
}

export function touchStartHandler(keydown) {
  let firstTapTime = 0;
  if (firstTapTime === 0) {
    firstTapTime = Date.now();
  } else {
    const elapsed = Date.now() - firstTapTime;
    if (elapsed < 1000) {
      // Limite de tempo para considerar um duplo toque (300ms)
      if (this.checked) {
        this.checked = false;
      } else {
        this.checked = true;
      }
      firstTapTime = 0; // Reiniciar o temporizador
    } else {
      firstTapTime = Date.now(); // Iniciar um novo temporizador
    }
  }
  opRadioHandler(keydown);
  cpbInpHandler();
}

export function searchCEP(cepElement) {
  const initTime = Date.now();
  let cepValue = cepElement.value;
  let progMaxInt;
  let progValueInt;
  if (
    cepElement &&
    cepElement instanceof HTMLInputElement &&
    !isProgBarLoading
  ) {
    const progressBar = document.createElement("progress");
    cepElement.parentElement?.insertBefore(
      progressBar,
      cepElement.nextElementSibling?.nextElementSibling ?? null
    );
    if (progressBar && cepElement.nextElementSibling?.nextElementSibling) {
      isProgBarLoading = true;
      progressBar.id = "loadBarCepVars";
      progressBar.max = 100;
      progMaxInt = progressBar.max;
      progressBar.value = 0;
      progValueInt = progressBar.value;
      progressBar.style.setProperty("background-color", "blue");
      progressBar.style.setProperty("color", "white");
    }

    const cepHifenOutValue = cepValue?.replaceAll("-", "");
    const urlBAPI = `https://brasilapi.com.br/api/cep/v2/${cepHifenOutValue}`;
    const xmlReq = new XMLHttpRequest();
    if (urlBAPI) {
      let roundedElapsed;
      xmlReq.open("GET", urlBAPI);
      xmlReq.send();
      xmlReq.onload = () => {
        try {
          if (xmlReq.status === 200) {
            let parsedAddress = JSON.parse(xmlReq.response);
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

              const finishTime = Date.now();
              const elapsedTime = finishTime - initTime;
              const elapsedNDec = elapsedTime.toString().length - 1;
              let addedZerosMult = "1";
              for (let iD = 0; iD < elapsedNDec; iD++) {
                addedZerosMult += "0";
              }
              let indNDec = 1 * parseInt(addedZerosMult);
              roundedElapsed = Math.round(elapsedTime / indNDec) * indNDec;
            }
          } else if (xmlReq.status === 404) {
            throw new Error("404");
          } else {
            throw new Error("Não reconhecido");
          }
        } catch (loadError) {
          console.error("Status de Erro: ", loadError.message);
        }
        if (progValueInt !== progMaxInt) {
          let loadingEvent = setInterval(() => {
            progValueInt += 5;
            progressBar.value = progValueInt;
            if (progValueInt === progMaxInt) {
              clearInterval(loadingEvent);
            }
          }, roundedElapsed / 20);
        }
        setTimeout(() => {
          cepElement.parentElement?.removeChild(progressBar);
          isProgBarLoading = false;
        }, roundedElapsed);
      };
    }
  }
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
        Model.autoCapitalizeInputs(textElements[iT])
      );
    }
    for (let iB = 0; iB < dateBtns.length; iB++) {
      console.log(dateBtns[iB].id);
      dateBtns[iB].addEventListener("click", (activation) =>
        useCurrentDate(activation, dateBtns[iB])
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

  const targInputDate = searchPreviousSiblings(dateBtn, "inpDate");

  if (
    activation.target === dateBtn &&
    targInputDate &&
    targInputDate.tagName === "INPUT" &&
    targInputDate instanceof HTMLInputElement
  ) {
    targInputDate.value = ano + "-" + mes + "-" + dia;
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

function searchPreviousSiblingsById(currentElement, searchedSiblingId) {
  while (currentElement.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    let isSiblingValid = currentElement.id === searchedSiblingId;
    if (isSiblingValid) {
      break;
    }
  }
  return currentElement;
}

export function changeToAstDigit(click, toFileInpBtn) {
  const useAstDigitRegex = /Usar Assinatura Digital/;
  const useAstDigtRegexObj = new RegExp(useAstDigitRegex);
  const useAstTextRegex = /Retornar à Assinatura Escrita/;
  const useAstTextRegexObj = new RegExp(useAstTextRegex);

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
          toFileInpBtn.textContent = "Retornar à Assinatura Escrita";
          toFileInpBtn.previousElementSibling?.setAttribute("hidden", "");

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
      const inpAst = searchPreviousSiblings(toFileInpBtn, "inpAst");
      if (
        inpAst instanceof HTMLImageElement ||
        inpAst instanceof HTMLInputElement
      ) {
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

export function resetarFormulario(click, toFileInpBtns) {
  if (
    click.target instanceof HTMLElement &&
    click.target.tagName === "BUTTON"
  ) {
    const formulario = document.getElementById("formAnamGId");
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
