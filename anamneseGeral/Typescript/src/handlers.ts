import * as Model from "./model.js";
import * as Classes from "./classes.js";

const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
let blockCount = 1;
let isProgBarLoading = false;

export function getJSONDesc(inputs: (Element | null)[]) {
  let closestValidElements: string[] = [];
  let closestBooleanElements: string[] = [];
  let closestBooleanElementsIds: string[] = [];
  let closestValidElementsIds: string[] = [];
  let inpValues: string[] = [];
  let inpIds: string[] = [];
  let JSONStore: Classes.JSONStorager[] = [];
  let JSONStoreDescriptors: string[] = [];
  //loop para construção dos arrays iniciais
  for (let i = 0; i < inputs.length; i++) {
    //loop para múltiplas tentativas de localização do texto de interesse
    let closestParent =
      inputs[i]?.closest("span") || inputs[i]?.closest("label");
    if (closestParent) {
      let loopAcc = 0;
      while (loopAcc < 10 && closestParent.textContent === "") {
        //loop para escalada genealógica até encontrar parent de interesse ou desistir após 10 iterações
        loopAcc++;
        closestParent =
          closestParent?.closest("span") || closestParent?.closest("label");
        if (closestParent?.textContent !== "" || loopAcc > 10) {
          break;
        }
      }
      if (closestParent?.textContent !== "") {
        if (
          closestParent?.textContent === "Sim" || //entrada em loop para eliminar parents com text sim/não (não informativo) ou desistir após 10 iterações
          closestParent?.textContent === "Não"
        ) {
          const booleanParentCopy = closestParent;
          closestBooleanElements.push(
            booleanParentCopy?.textContent?.trim().replaceAll("\n", "") ??
              "null"
          );
          closestBooleanElementsIds.push(booleanParentCopy.id ?? "null");
          while (
            loopAcc < 10 &&
            closestParent &&
            (closestParent.textContent === "Sim" ||
              closestParent.textContent === "Não")
          ) {
            loopAcc++;
            closestParent =
              closestParent?.closest("span") || closestParent?.closest("label");
            if (
              (closestParent &&
                closestParent?.textContent !== "Sim" &&
                closestParent?.textContent !== "Não" &&
                closestParent?.textContent !== "") ||
              loopAcc > 10
            ) {
              closestValidElements.push(
                closestParent?.textContent?.trim().replaceAll("\n", "") ??
                  "null"
              );
              closestValidElementsIds.push(closestParent?.id ?? "null");
              inpIds.push(inputs[i]?.id ?? "null");
              if (
                inputs[i] instanceof HTMLInputElement &&
                ((inputs[i] as HTMLInputElement)?.type === "radio" ||
                  (inputs[i] as HTMLInputElement)?.type === "checkbox")
              ) {
                inpValues.push(
                  (inputs[i] as HTMLInputElement)?.checked.toString() ?? "false"
                );
              } else {
                inpValues.push(
                  (inputs[i] as HTMLInputElement)?.value ?? "null"
                );
              }
              break;
            }
          }
        } else {
          if (
            inputs[i] instanceof HTMLInputElement &&
            (inputs[i] as HTMLInputElement)?.type === "radio" &&
            inputs[i]?.id !== ""
          ) {
            if (
              inputs[i]?.nextElementSibling &&
              inputs[i]?.nextElementSibling instanceof HTMLLabelElement &&
              inputs[i]?.nextElementSibling?.classList.contains("boolOp")
            ) {
              if (inputs[i]?.id.match(/Yes/)) {
                closestValidElements.push(
                  inputs[i]?.id?.slice(-3)! +
                    closestParent?.textContent?.trim().replaceAll("\n", "")! ??
                    "null"
                );
              } else if (inputs[i]?.id.match(/No/)) {
                closestValidElements.push(
                  inputs[i]?.id?.slice(-2)! +
                    closestParent?.textContent?.trim().replaceAll("\n", "")! ??
                    "null"
                );
              } else {
                console.warn("Caso inesperado de boolOp Radio + Label");
              }
            } else {
              if (
                (inputs[i] instanceof HTMLInputElement ||
                  inputs[i] instanceof HTMLTextAreaElement) &&
                (inputs[i] as HTMLInputElement | HTMLTextAreaElement)?.name ===
                  "nivelFumo"
              ) {
                closestValidElements.push(
                  inputs[i]?.id?.slice(0, 1).toUpperCase()! +
                    inputs[i]?.id?.slice(1, 4) +
                    "_" +
                    inputs[i]?.id?.slice(4, 8) ?? "null"
                );
              }
            }
          } else {
            if (
              inputs[i]?.classList.contains("opFumSubs") &&
              inputs[i]?.nextElementSibling &&
              inputs[i]?.nextElementSibling?.textContent !== ""
            ) {
              closestValidElements.push(
                inputs[i]?.nextElementSibling?.textContent +
                  "_" +
                  closestParent?.textContent?.trim().replaceAll("\n", "") ??
                  "null"
              );
            } else {
              if (inputs[i]?.classList.contains("inpAntMed")) {
                closestValidElements.push(
                  "Tratamento_Médico" + "_" + inputs[i]?.id.slice(-1) ?? "null"
                );
              } else {
                if (inputs[i]?.id === "citeNameId") {
                  closestValidElements.push("Assinatura_Usuário" ?? "null");
                } else {
                  if (inputs[i]?.id === "confirmLocId") {
                    console.log("loc");
                    console.log(closestParent);
                    console.log(
                      closestParent?.textContent?.trim().replaceAll("\n", "") //loc está sendo pareado com 1)
                    );
                    closestValidElements.push(
                      closestParent?.textContent?.trim().replaceAll("\n", "") ??
                        "null"
                    );
                  } else {
                    closestValidElements.push(
                      closestParent?.textContent?.trim().replaceAll("\n", "") ??
                        "null"
                    );
                  }
                }
              }
            }
          }
          inpIds.push(inputs[i]?.id ?? "null"); //obtenção de id de inputs
          if (
            (inputs[i] instanceof HTMLInputElement &&
              (inputs[i] as HTMLInputElement)?.type === "radio") ||
            (inputs[i] as HTMLInputElement)?.type === "checkbox"
          ) {
            inpValues.push(
              (inputs[i] as HTMLInputElement)?.checked.toString() ?? "false"
            );
          } else {
            if (inputs[i]?.id === "citeNameId") {
              if (
                inputs[i]?.textContent === "Insira Seu Nome Aqui" ||
                inputs[i]?.textContent === "--Nome"
              ) {
                inpValues.push("null");
              } else {
                inpValues.push(inputs[i]?.textContent ?? "null");
              }
            } else {
              inpValues.push((inputs[i] as HTMLInputElement)?.value ?? "null");
            }
          }
          if (closestParent?.id !== "") {
            //obtenção de ids dos 'parents'
            //correção de id de interesse caso a do parent não esteja presente (atenção: desassocia id e text de interesse)
            closestValidElementsIds.push(closestParent?.id ?? "null");
          } else if (closestParent.id === "") {
            const nextESibling = inputs[i]?.nextElementSibling;
            if (
              nextESibling &&
              nextESibling instanceof HTMLLabelElement &&
              nextESibling.textContent !== ""
            ) {
              closestValidElementsIds.push(nextESibling.id ?? "null");
            } else {
              const previousESibling = inputs[i]?.previousElementSibling;
              if (
                previousESibling &&
                previousESibling instanceof HTMLLabelElement &&
                previousESibling.textContent !== ""
              ) {
                closestValidElementsIds.push(previousESibling.id ?? "null");
              } else if (
                inputs[i] instanceof HTMLTextAreaElement &&
                (inputs[i] as HTMLTextAreaElement)?.placeholder !== ""
              ) {
                closestValidElementsIds.push(inputs[i]?.id ?? "null");
              } else {
                console.warn(
                  `Nenhuma id próxima válida retornada para o input ${inputs[i]?.id}`
                );
              }
            }
          }
        }
      } else if (closestParent?.textContent === "") {
        console.warn(`Erro ao localizar textContent de parent`);
      }
    } else {
      //se falha em parents, procura em siblings <label> ou em placeholders de textareas
      const previousSibling = inputs[i]?.previousElementSibling;
      if (
        previousSibling instanceof HTMLLabelElement &&
        previousSibling.textContent !== ""
      ) {
        closestValidElements.push(
          previousSibling.textContent?.trim().replaceAll("\n", "") ?? "null"
        );
        closestValidElementsIds.push(previousSibling.id ?? "null");
        inpIds.push(inputs[i]?.id ?? "null");
        if (
          inputs[i] instanceof HTMLInputElement &&
          ((inputs[i] as HTMLInputElement)?.type === "radio" ||
            (inputs[i] as HTMLInputElement)?.type === "checkbox")
        ) {
          inpValues.push(
            (inputs[i] as HTMLInputElement)?.checked.toString() ?? "false"
          );
        } else {
          inpValues.push((inputs[i] as HTMLInputElement)?.value ?? "null");
        }
      } else {
        if (
          inputs[i] instanceof HTMLTextAreaElement &&
          (inputs[i] as HTMLTextAreaElement)?.placeholder
        ) {
          closestValidElements.push(
            (inputs[i] as HTMLTextAreaElement)?.placeholder
          );
          closestValidElementsIds.push(inputs[i]?.id ?? "null");
          inpIds.push(inputs[i]?.id ?? "null");
          if (
            inputs[i] instanceof HTMLInputElement &&
            ((inputs[i] as HTMLInputElement)?.type === "radio" ||
              (inputs[i] as HTMLInputElement)?.type === "checkbox")
          ) {
            inpValues.push(
              (inputs[i] as HTMLInputElement)?.checked.toString() ?? "false"
            );
          } else {
            inpValues.push((inputs[i] as HTMLInputElement)?.value ?? "null");
          }
        } else if (
          inputs[i] instanceof HTMLInputElement &&
          (inputs[i] as HTMLInputElement)?.type === "checkbox"
        ) {
          if (inputs[i]?.classList.contains("famOp")) {
            const upperCaseMatch = inputs[i]?.id?.match(/Fam/g);
            if (upperCaseMatch && inputs[i]?.id) {
              const upperCaseIndex = inputs[i]?.id.indexOf("Fam");
              const slicedId = inputs[i]?.id.slice(0, upperCaseIndex);
              closestValidElements.push(
                slicedId +
                  "_" +
                  inputs[i]?.nextSibling?.textContent?.replaceAll(
                    /^[\s]+/g,
                    ""
                  ) ?? "null"
              );
            } else {
              closestValidElements.push(
                inputs[i]?.nextSibling?.textContent?.replaceAll(
                  /^[\s]+/g,
                  ""
                ) ?? "null"
              );
            }
          } else if (inputs[i]?.classList.contains("opHep")) {
            closestValidElements.push(
              "Hepatite_" +
                inputs[i]?.nextSibling?.textContent?.replaceAll(
                  /^[\s]+/g,
                  ""
                ) ?? "null"
            );
          } else {
            closestValidElements.push(
              inputs[i]?.nextSibling?.textContent?.replaceAll(/^[\s]+/g, "") ??
                "null"
            );
          }
          closestValidElementsIds.push(inputs[i]?.id ?? "null");
          inpIds.push(inputs[i]?.id ?? "null");
          inpValues.push(
            (inputs[i] as HTMLInputElement)?.checked.toString() ?? "false"
          );
        } else {
          if (inputs[i]?.classList.contains("opHAS")) {
            closestValidElements.push(
              inputs[i]?.nextSibling?.textContent?.trim() ?? "null"
            );
            closestValidElementsIds.push(inputs[i]?.id ?? "null");
            inpIds.push(inputs[i]?.id ?? "null");
            inpValues.push(
              (inputs[i] as HTMLInputElement)?.checked.toString() ?? "false"
            );
          } else {
            const nextESibling = inputs[i]?.nextElementSibling;
            if (
              nextESibling instanceof HTMLLabelElement &&
              nextESibling.textContent !== ""
            ) {
              closestValidElements.push(
                nextESibling.textContent?.trim().replaceAll("\n", "") ?? "null"
              );
              closestValidElementsIds.push(nextESibling.id ?? "null");
              inpIds.push(inputs[i]?.id ?? "null");
              if (
                inputs[i] instanceof HTMLInputElement &&
                ((inputs[i] as HTMLInputElement)?.type === "radio" ||
                  (inputs[i] as HTMLInputElement)?.type === "checkbox")
              ) {
                inpValues.push(
                  (inputs[i] as HTMLInputElement)?.checked.toString() ?? "false"
                );
              } else {
                inpValues.push(
                  (inputs[i] as HTMLInputElement)?.value ?? "null"
                );
              }
            } else {
              console.warn(
                `Erro validando parents, labels, placeholders e textContent. Id do Input: ${
                  inputs[i]?.id ?? null
                }; textContent ${inputs[i]?.textContent ?? null}; placeholder ${
                  (inputs[i] as HTMLInputElement | HTMLTextAreaElement)
                    ?.placeholder ?? null
                }; Última Instância de Parent avaliada ${Object.prototype.toString
                  .call(closestParent)
                  .slice(
                    8,
                    -1
                  )}; Instância de Sibling Labels ${Object.prototype.toString
                  .call(previousSibling)
                  .slice(8, -1)} && ${Object.prototype.toString
                  .call(nextESibling)
                  .slice(8, -1)}`
              );
            }
          }
        }
      }
    }
  }

  //loop para ajuste dos elementos dos arrays e construção dos storager + store
  for (let j = 0; j < closestValidElements.length; j++) {
    const multipleSpaceMatches = closestValidElements[j]?.match(/\s\s/) ?? null;
    if (
      closestValidElements[j] &&
      multipleSpaceMatches &&
      multipleSpaceMatches.length > 0
    ) {
      let iMatches: number[] = [];
      multipleSpaceMatches.forEach((multipleSpaceMatch) => {
        const multipleSpaceIndex =
          closestValidElements[j]?.indexOf(multipleSpaceMatch) ?? 0;
        iMatches.push(multipleSpaceIndex);
      });
      for (let k = 0; k < iMatches.length; k++) {
        closestValidElements[j] =
          closestValidElements[j]?.slice(0, iMatches[k]).trim() ?? null;
      }
    }
    if (typeof inpValues[j] === "string") {
      if (inpValues[j] === "") {
        inpValues[j] = inpValues[j].replace("", "null") ?? "null";
      }
    } else {
      inpValues[j] = inpValues[j]?.toString() ?? "null";
    }
    const nJSONStorager = new Classes.JSONStorager(
      closestValidElementsIds[j],
      closestValidElements[j],
      inpIds[j],
      inpValues[j]
    );
    if (nJSONStorager) {
      JSONStore.push(nJSONStorager);
      const descriptor = nJSONStorager.showAllInfo; //TODO EXPOSIÇÃO DE DADOS SOMENTE PARA FINALIDADES DE TESTE, POIS PROPRIEDADES PRIVADAS NÃO SÃO ENUMERÁVEIS
      if (descriptor) {
        JSONStoreDescriptors.push(descriptor.toString());
      } else {
        console.warn(
          `Erro validando descriptor para instância ${j} de JSONStorager`
        );
      }
    } else {
      console.warn(`Erro validando instância ${j} de JSONStorager`);
    }
  }

  //filtro e validação da store
  if (JSONStoreDescriptors.length === JSONStore.length) {
    const filter1JSONStore = JSONStore.filter(
      (JSONEl) => typeof JSONEl === "object"
    );
    if (filter1JSONStore.length === JSONStore.length) {
      JSONStore = filter1JSONStore;
      const filter2JSONStore = JSONStore.filter(
        (JSONEl) => JSONEl instanceof Classes.JSONStorager
      );
      if (filter2JSONStore.length === JSONStore.length) {
        JSONStore = filter2JSONStore;
        let JSONStoreStringified: string[] = [];
        JSONStore.forEach((formEl) => {
          const elValues = formEl.showAllInfo;
          const elValuesStringified = JSON.stringify(elValues); //TODO DADOS EXPOSTO SOMENTE PARA FINS DE TESTE
          JSONStoreStringified.push(elValuesStringified);
        });
        if (JSONStore && JSONStoreStringified) {
          return [JSONStore, JSONStoreStringified];
        } else {
          return [null, null];
        }
      } else {
        console.warn(
          `Erro validando classes de elementos no JSONStore. Número de instâncias obtidas: ${filter2JSONStore.length}; Número esperado: ${JSONStore.length}`
        );
      }
    } else {
      console.warn(
        `Erro validando tipos de elementos no JSONStore. Número de objetos obtidos: ${filter1JSONStore.length}; Número esperado: ${JSONStore.length}`
      );
    }
  } else {
    console.warn(
      `Length de JSON Store Descriptors inválida. Length obtida: ${JSONStoreDescriptors.length}; Length esperada: ${JSONStore.length}`
    );
  }
}

export function createJSONAnchor(
  JSONBtn: HTMLButtonElement,
  formDescriptor: string[]
) {
  const formattedFormDescriptor = formatJSONFile(formDescriptor);
  const JSONBlob = new Blob([formattedFormDescriptor[1]], {
    type: "application/json",
  });
  const JSONLink = document.createElement("a");
  JSONLink.id = "anchorJSON";
  JSONLink.className = JSONBtn.className;
  JSONLink.textContent = "Baixar JSON";
  JSONLink.href = URL.createObjectURL(JSONBlob);
  JSONLink.download = "formData.json";
  JSONBtn.replaceWith(JSONLink);
  return JSONLink;
}

function formatJSONFile(formDescriptor: string[]) {
  let formattedFormDescriptorLabels = `{\n`;
  let formattedFormDescriptorIds = `{\n`;
  let labAcc = 2;
  for (let i = 0; i < formDescriptor.length; i++) {
    let separationMatches = formDescriptor[i].match(/",/g);
    if (separationMatches) {
      const firstSepIndex = formDescriptor[i].indexOf(",");
      const secondSepIndex = formDescriptor[i].indexOf(
        ",",
        formDescriptor[i].indexOf(",") + 1
      );
      const lastSepIndex = formDescriptor[i].lastIndexOf(separationMatches[0]);
      let lab = formDescriptor[i]
        .slice(firstSepIndex + 1, secondSepIndex)
        .replaceAll(" ", "_");
      while (lab.match(/:/g)) {
        lab = lab.replace(":", "");
        if (!lab.match(/:"/g)) {
          break;
        }
      }
      if (!lab.endsWith('"')) {
        lab = lab + '"';
      }
      let inpId = formDescriptor[i].slice(secondSepIndex + 1, lastSepIndex + 1);
      while (inpId.match(/,/g)) {
        const commaIndex = inpId.indexOf(",");
        inpId = inpId.slice(commaIndex + 1);
        if (!inpId.match(/,/g)) {
          break;
        }
      }
      const value = formDescriptor[i].slice(lastSepIndex + 2, -1);
      formattedFormDescriptorLabels += `\t${labAcc}. ${lab}: ${value}, \n`;
      formattedFormDescriptorIds += `\t${inpId}: ${value}, \n`;
      labAcc++;
    }
  }
  const formattedFormDescriptor = (formattedFormDescriptorIds + `}`).replace(
    ", \n}",
    " \n}"
  );
  const formattedLabels = (formattedFormDescriptorLabels + `}`).replace(
    ", \n}",
    " \n}"
  );
  console.log(formattedLabels);
  return [formattedLabels, formattedFormDescriptor];
}

export function regenerateJSONBtn(
  JSONLink: HTMLAnchorElement,
  formDescriptor: string[]
) {
  console.log("event ouvido");
  const newJSONBtn = document.createElement("button");
  newJSONBtn.id = "btnJSON";
  newJSONBtn.className = JSONLink.className;
  newJSONBtn.textContent = "Regenerar JSON";
  JSONLink.replaceWith(newJSONBtn);
  setTimeout(() => {
    newJSONBtn.addEventListener("click", () =>
      createJSONAnchor(newJSONBtn, formDescriptor)
    );
  }, 1000);
  // return newJSONBtn;
}

export function opRadioHandler(keydown: Event) {
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
  let opRadiosCheck: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    "input[id^='Cpb'][id$='Yes']"
  );
  let opRadiosText: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    "input[id^='pb'][id$='Yes']"
  );
  let antFamChecks: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    "input[id^='antFam']"
  );
  let textAdd: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll(
    "textarea[id^='textAdd']"
  );
  let divAdd: NodeListOf<HTMLDivElement> =
    document.querySelectorAll("div[id^='divAdd']");
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
  const numberInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    'input[type="number"][id$=NumId]'
  );
  const nullRadios: NodeListOf<HTMLInputElement> = document.querySelectorAll(
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

export function doubleClickHandler(input: HTMLInputElement) {
  input.checked = input.checked ? false : true;
  cpbInpHandler();
  deactTextInput();
}

export function touchStartHandler(this: HTMLInputElement, keydown: Event) {
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

export function searchCEP(cepElement: HTMLInputElement) {
  let reqAcc = 2;
  let initTime = Date.now();
  let cepValue = cepElement.value;
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
            uploadCEPLoadBar(
              cepElement,
              initTime,
              progMax as number,
              progValue as number,
              progBar as HTMLProgressElement
            );
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
                    progMax as number,
                    progValue as number,
                    progBar as HTMLProgressElement
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
                    progMax as number,
                    progValue as number,
                    progBar as HTMLProgressElement
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

function loadCEP(xmlReq: XMLHttpRequest, reqAcc: number) {
  let status;
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
        status = 200;
      }
    } else if (xmlReq.status === 404) {
      throw new Error("404");
    } else {
      throw new Error("Não reconhecido");
    }
  } catch (loadError: any) {
    console.warn(`Status de Erro para CEPV${reqAcc}: `, loadError.message);
    status = 404;
  }
  return status;
}

function displayCEPLoadBar(cepElement: HTMLInputElement) {
  let progMaxInt;
  let progValueInt;
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
    return [progMaxInt, progValueInt, progressBar];
  }
}

function uploadCEPLoadBar(
  cepElement: HTMLInputElement,
  initTime: number,
  progMaxInt: number,
  progValueInt: number,
  progressBar: HTMLProgressElement
) {
  let roundedElapsed;
  const finishTime = Date.now();
  const elapsedTime = finishTime - initTime;
  const elapsedNDec = elapsedTime.toString().length - 1;
  let addedZerosMult = "1";
  for (let iD = 0; iD < elapsedNDec; iD++) {
    addedZerosMult += "0";
  }
  let indNDec = 1 * parseInt(addedZerosMult);
  roundedElapsed = Math.round(elapsedTime / indNDec) * indNDec;
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
}

export function enableCEPBtn(cepLength: number, cepBtn: HTMLButtonElement) {
  let isCepElemenBtnOff = true;
  if (cepLength === 9) {
    cepBtn.removeAttribute("disabled");
    isCepElemenBtnOff = false;
  } else {
    cepBtn.setAttribute("disabled", "");
  }
  return isCepElemenBtnOff;
}

export function addAntMedHandler(click: Event) {
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
    const dateBtns: NodeListOf<HTMLButtonElement> = newBlock.querySelectorAll(
      'button[id$="DatBtn"]'
    );
    const textElements: NodeListOf<HTMLInputElement> =
      newBlock.querySelectorAll('input[type="text"]');
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

export function useCurrentDate(activation: Event, dateBtn: HTMLButtonElement) {
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

function searchPreviousSiblings(
  currentElement: Element,
  searchedSiblingClass: string
) {
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

function searchPreviousSiblingsById(
  currentElement: Element,
  searchedSiblingId: string
) {
  while (currentElement.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    let isSiblingValid = currentElement.id === searchedSiblingId;
    if (isSiblingValid) {
      break;
    }
  }
  return currentElement;
}

export function changeToAstDigit(
  click: Event,
  toFileInpBtn: HTMLButtonElement
) {
  const useAstDigitRegex = /Usar Assinatura Digital/;
  const useAstDigtRegexObj = new RegExp(useAstDigitRegex);
  const useAstTextRegex = /Retornar à Assinatura Escrita/;
  const useAstTextRegexObj = new RegExp(useAstTextRegex);
  let labCont: HTMLCollectionOf<Element> | Element[] | undefined =
    toFileInpBtn.parentElement?.getElementsByClassName("labAst");
  if (
    labCont &&
    !labCont[0] &&
    (toFileInpBtn.parentElement?.tagName === "LABEL" ||
      toFileInpBtn.parentElement?.tagName === "SPAN")
  ) {
    labCont = Array.of(toFileInpBtn.parentElement);
  }

  let astCount = 0;
  if (labCont && click.target === toFileInpBtn) {
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
          if (idLabMatch && idInpMatch) {
            const idLabMatchIndex = labCont[0].id.indexOf(idLabMatch);
            const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
            const sliceOneLabId = labCont[0].id.slice(0, idLabMatchIndex);
            const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
            labCont[0].id = sliceOneLabId + sliceTwoInpId;
            toFileInpBtn.textContent = "Retornar à Assinatura Escrita";
          } else {
            console.warn("Erro no match de ids do input");
          }
          if (
            toFileInpBtn.previousElementSibling instanceof HTMLButtonElement
          ) {
            toFileInpBtn.previousElementSibling?.setAttribute("hidden", "");
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
                          console.log(labCont[0].id);
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
              } catch (error: any) {
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
            console.warn("Erro no match de ids dos inputs");
          }
        }
      }
    }
  }
}

export function resetarFormulario(
  click: Event,
  toFileInpBtns: NodeListOf<HTMLButtonElement>
) {
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
            let labCont: HTMLCollectionOf<Element> | HTMLElement[] | never[] =
              toFileInpBtn.parentElement?.getElementsByClassName("labAst") ??
              [];
            if (
              (!labCont[0] || labCont[0].id === "") &&
              (toFileInpBtn.parentElement?.tagName === "LABEL" ||
                toFileInpBtn.parentElement?.tagName === "SPAN")
            ) {
              labCont = Array.of(toFileInpBtn.parentElement as HTMLElement);
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
