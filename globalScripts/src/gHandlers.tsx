//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
"use strict";
import * as GlobalModel from "./gModel.js";
import { JSONStorager, JSONTitleStorager } from "./classes.js";
import type { targEl, entryEl, textEl, primitiveType } from "./types.js";
import * as ErrorHandler from "./errorHandler.js";
// import React from 'react';


const mapIdsTitles = {
  firstNameId: "Primeiro_Nome",
  additionalNameId: "Sobrenome_do_Meio",
  familyNameId: "Último_Sobrenome",
  socialNameId: "Nome_Social",
  telAreaCodeId: "DDD",
  telId: "Telefone",
  telCountryCodeId: "Se_estrangeiro,_código_do_País",
  tel2AreaCodeId: "DDD_Do_Telefone_Secundário",
  tel2Id: "Telefone_Secundário",
  tel2CountryCodeId: "Se_estrangeiro(secundário),_código_do_País",
  email1Id: "Email",
  email2Id: "Email_Secundário",
  dateAgeId: "Idade",
  genid: "Gênero",
  genBirthRelId: "Identidade_em_relação_ao_gênero_designado_na_nascença",
  genTransId: "Estágio_da_Transição_Hormonal",
  genFisAlinId: "Alinhamento_de_características_físicas_predominante",
};

export function updateSimpleProperty(element: targEl): primitiveType {
  if (element instanceof HTMLInputElement) {
    if (element.type === "radio" || element.type === "checkbox") {
      return element.checked.toString();
    } else if (element.type === "number") {
      if (
        Number.isNaN(parseFloat(element.value.replaceAll(/[^0-9.,+-]/g, "")))
      ) {
        console.warn(`element.value retornado como NaN, revertido para 0.`);
        return 0;
      } else {
        return parseFloat(element.value.replaceAll(/[^0-9.,+-]/g, ""));
      }
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

export function cursorCheckTimer(cursorPosition: number): number {
  const selection = window.getSelection();
  if (selection && selection.focusNode !== null) {
    cursorPosition = selection.getRangeAt(0)?.startOffset;
    setTimeout(() => {
      return cursorPosition;
    }, 3000);
  }
  return 0;
}

export function getJSONDesc(inputs: targEl[]) {
  const titleElements = [];
  const closestValidElements: string[] = [];
  const closestValidElementsIds = [];
  const closestBooleanElements = [];
  const closestBooleanElementsIds = [];
  const inpValues = [];
  const inpIds = [];
  const JSONInpsStoreDescriptors = [];
  const JSONTitlesStoreDescriptors = [];
  let JSONInpsStore = [];
  let JSONTitlesStore = [];
  let titleAcc = 0;
  let nullTitleAcc = 0;

  //determinação do número de inputs de identificação cujos títulos são de interesse e construção de subarray para estes
  for (let k = 0; k < inputs.length; k++) {
    if (inputs[k]?.classList.contains("inpIdentif")) {
      titleElements.push(inputs[k]);
    }
  }

  //loop para construção dos arrays inicias de ids e values
  for (let z = 0; z < inputs.length; z++) {
    if (inputs[z] instanceof HTMLInputElement) {
      if (
        (inputs[z] as HTMLInputElement)?.type === "radio" ||
        (inputs[z] as HTMLInputElement)?.type === "checkbox"
      ) {
        inpIds.push(inputs[z]?.id ?? "null");
        inpValues.push(
          (inputs[z] as HTMLInputElement)?.checked.toString() ?? "false"
        );
      } else {
        if ((inputs[z] as HTMLElement).id === "confrmLocId") {
          inpIds.push("confirmLoc");
        } else {
          inpIds.push(inputs[z]?.id ?? "null");
        }
        inpValues.push((inputs[z] as HTMLInputElement)?.value ?? "null");
      }
    } else if (
      inputs[z] instanceof HTMLTextAreaElement ||
      inputs[z] instanceof HTMLSelectElement
    ) {
      inpIds.push(inputs[z]?.id ?? "null");
      inpValues.push((inputs[z] as entryEl)?.value ?? "null");
    } else if (
      (inputs[z] as HTMLElement)?.contentEditable === "true" ||
      inputs[z]?.id === "citeNameId"
    ) {
      inpIds.push(inputs[z]?.id ?? "null");
      inpValues.push(inputs[z]?.textContent ?? "null");
    } else {
      console.error(
        `Erro validando elemento. Elemento ${
          inputs[z] ?? "null"
        }; instância ${Object.prototype.toString
          .call(inputs[z])
          .slice(8, -1)}; id ${inputs[z]?.id ?? "null"}`
      );
    }
  }

  //loop para ajuste dos elementos dos arrays de inputs e construção dos storager de inputs
  for (let j = 0; j < inputs.length; j++) {
    //filtragem de tipos primitivos de values
    if (typeof inpValues[j] === "string") {
      if (inpValues[j] === "") {
        inpValues[j] = inpValues[j].replace("", "null") ?? "null";
      }
    } else {
      inpValues[j] = inpValues[j]?.toString() ?? "null";
    }

    //avaliador de ids nulas
    if (
      inpIds[j]?.match(/null/g) ||
      inpIds[j] === undefined ||
      inpIds[j] === null
    ) {
      console.warn(
        `Id null detectada. Título relativo: ${
          closestValidElements[j] ?? "null"
        }`
      );
    }

    //criação do storager
    const nJSONInpStorager = new JSONStorager(inpIds[j], inpValues[j]);

    //criação da store
    if (nJSONInpStorager) {
      JSONInpsStore.push(nJSONInpStorager);
      const descriptor = nJSONInpStorager.showAllInfo; //TODO EXPOSIÇÃO DE DADOS SOMENTE PARA FINALIDADES DE TESTE, POIS PROPRIEDADES PRIVADAS NÃO SÃO ENUMERÁVEIS
      if (descriptor) {
        JSONInpsStoreDescriptors.push(descriptor.toString());
      } else {
        console.warn(
          `Erro validando descriptor para instância ${j} de JSONStorager`
        );
      }
    } else {
      console.warn(`Erro validando instância ${j} de JSONStorager`);
    }
  }

  //loop para extrair títulos/labels de interesse
  for (let i = 0; i < titleElements.length; i++) {
    titleAcc++;
    //loop para múltiplas tentativas de localização do texto de interesse
    let closestParent =
      titleElements[i]?.closest("span") || titleElements[i]?.closest("label");
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
              `NULL ${
                titleElements[i]?.id ?? `Id null. Iteração do loop: ${titleAcc}`
              }`
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
                  `NULL ${
                    titleElements[i]?.id ??
                    `Id null. Iteração do loop: ${titleAcc}`
                  }`
              );
              closestValidElementsIds.push(
                closestParent?.id ??
                  `NULL ${
                    titleElements[i]?.id ??
                    `Id null. Iteração do loop: ${titleAcc}`
                  }`
              );
              break;
            }
          }
        } else {
          if (
            titleElements[i] instanceof HTMLInputElement &&
            (titleElements[i] as HTMLInputElement)?.type === "radio" &&
            titleElements[i]?.id !== ""
          ) {
            if (
              titleElements[i]?.nextElementSibling &&
              titleElements[i]?.nextElementSibling instanceof
                HTMLLabelElement &&
              titleElements[i]?.nextElementSibling?.classList.contains("boolOp")
            ) {
              if (titleElements[i]?.id.match(/Yes/)) {
                closestValidElements.push(
                  titleElements[i]?.id?.slice(-3) ??
                    "null" +
                      closestParent?.textContent?.trim().replaceAll("\n", "") ??
                    `NULL ${
                      titleElements[i]?.id ??
                      `Id null. Iteração do loop: ${titleAcc}`
                    }`
                );
              } else if (titleElements[i]?.id.match(/No/)) {
                closestValidElements.push(
                  titleElements[i]?.id?.slice(-2) ??
                    "null" +
                      closestParent?.textContent?.trim().replaceAll("\n", "") ??
                    `NULL ${
                      titleElements[i]?.id ??
                      `Id null. Iteração do loop: ${titleAcc}`
                    }`
                );
              } else {
                console.warn("Caso inesperado de boolOp Radio + Label");
              }
            } else {
              if (
                (titleElements[i] instanceof HTMLInputElement ||
                  titleElements[i] instanceof HTMLTextAreaElement) &&
                (titleElements[i] as entryEl)?.name === "nivelFumo"
              ) {
                closestValidElements.push(
                  titleElements[i]?.id?.slice(0, 1)?.toUpperCase() ??
                    "null" +
                      titleElements[i]?.id?.slice(1, 4) +
                      "_" +
                      titleElements[i]?.id?.slice(4, 8) ??
                    `NULL ${
                      titleElements[i]?.id ??
                      `Id null. Iteração do loop: ${titleAcc}`
                    }`
                );
              }
            }
          } else {
            if (
              titleElements[i]?.classList.contains("opFumSubs") &&
              titleElements[i]?.nextElementSibling &&
              titleElements[i]?.nextElementSibling?.textContent !== ""
            ) {
              closestValidElements.push(
                titleElements[i]?.nextElementSibling?.textContent +
                  "_" +
                  closestParent?.textContent?.trim().replaceAll("\n", "") ??
                  `NULL ${
                    titleElements[i]?.id ??
                    `Id null. Iteração do loop: ${titleAcc}`
                  }`
              );
            } else {
              if (titleElements[i]?.classList.contains("inpAntMed")) {
                closestValidElements.push(
                  "Tratamento_Médico" + "_" + titleElements[i]?.id.slice(-1) ??
                    `NULL ${
                      titleElements[i]?.id ??
                      `Id null. Iteração do loop: ${titleAcc}`
                    }`
                );
              } else {
                if (titleElements[i]?.id === "citeNameId") {
                  closestValidElements.push("Assinatura_Usuário" ?? "null");
                } else {
                  closestValidElements.push(
                    closestParent?.textContent?.trim().replaceAll("\n", "") ??
                      `NULL ${
                        titleElements[i]?.id ??
                        `Id null. Iteração do loop: ${titleAcc}`
                      }`
                  );
                }
              }
            }
          }
          if (closestParent?.id !== "") {
            //obtenção de ids dos 'parents'
            //correção de id de interesse caso a do parent não esteja presente (atenção: desassocia id e text de interesse)
            closestValidElementsIds.push(closestParent?.id ?? "null");
          } else if (closestParent.id === "") {
            const nextESibling = titleElements[i]?.nextElementSibling;
            if (
              nextESibling &&
              nextESibling instanceof HTMLLabelElement &&
              nextESibling.textContent !== ""
            ) {
              closestValidElementsIds.push(nextESibling.id ?? "null");
            } else {
              const previousESibling = titleElements[i]?.previousElementSibling;
              if (
                previousESibling &&
                previousESibling instanceof HTMLLabelElement &&
                previousESibling.textContent !== ""
              ) {
                closestValidElementsIds.push(previousESibling.id ?? "null");
              } else if (
                titleElements[i] instanceof HTMLTextAreaElement &&
                (titleElements[i] as HTMLTextAreaElement)?.placeholder !== ""
              ) {
                closestValidElementsIds.push(titleElements[i]?.id ?? "null");
              } else {
                console.warn(
                  `Nenhuma id próxima válida retornada para o input ${titleElements[i]?.id}`
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
      const previousSibling = titleElements[i]?.previousElementSibling;
      if (
        previousSibling instanceof HTMLLabelElement &&
        previousSibling.textContent !== ""
      ) {
        closestValidElements.push(
          previousSibling.textContent?.trim().replaceAll("\n", "") ??
            `NULL ${
              titleElements[i]?.id ?? `Id null. Iteração do loop: ${titleAcc}`
            }`
        );
        closestValidElementsIds.push(previousSibling.id ?? "null");
      } else {
        if (
          titleElements[i] instanceof HTMLTextAreaElement &&
          (titleElements[i] as HTMLTextAreaElement)?.placeholder
        ) {
          closestValidElements.push(
            (titleElements[i] as HTMLTextAreaElement)?.placeholder ??
              `NULL ${
                titleElements[i]?.id ?? `Id null. Iteração do loop: ${titleAcc}`
              }`
          );
          closestValidElementsIds.push(titleElements[i]?.id ?? "null");
        } else if (
          titleElements[i] instanceof HTMLInputElement &&
          (titleElements[i] as HTMLInputElement)?.type === "checkbox"
        ) {
          if (titleElements[i]?.classList.contains("famOp")) {
            const upperCaseMatch = titleElements[i]?.id?.match(/Fam/g);
            if (upperCaseMatch && titleElements[i]?.id) {
              const upperCaseIndex = titleElements[i]?.id.indexOf("Fam");
              const slicedId = titleElements[i]?.id.slice(0, upperCaseIndex);
              closestValidElements.push(
                slicedId +
                  "_" +
                  titleElements[i]?.nextSibling?.textContent?.replaceAll(
                    /^[\s]+/g,
                    ""
                  ) ??
                  `NULL ${
                    titleElements[i]?.id ??
                    `Id null. Iteração do loop: ${titleAcc}`
                  }`
              );
            } else {
              closestValidElements.push(
                titleElements[i]?.nextSibling?.textContent?.replaceAll(
                  /^[\s]+/g,
                  ""
                ) ??
                  `NULL ${
                    titleElements[i]?.id ??
                    `Id null. Iteração do loop: ${titleAcc}`
                  }`
              );
            }
          } else if (titleElements[i]?.classList.contains("opHep")) {
            closestValidElements.push(
              "Hepatite_" +
                titleElements[i]?.nextSibling?.textContent?.replaceAll(
                  /^[\s]+/g,
                  ""
                ) ?? "null"
            );
          } else {
            if (titleElements[i]?.id !== "confirmId") {
              closestValidElements.push(
                titleElements[i]?.nextSibling?.textContent?.replaceAll(
                  /^[\s]+/g,
                  ""
                ) ??
                  `NULL ${
                    titleElements[i]?.id ??
                    `Id null. Iteração do loop: ${titleAcc}`
                  }`
              );
            } else if (titleElements[i]?.id === "confirmId") {
              closestValidElements.push("Concordo");
            }
          }
          closestValidElementsIds.push(titleElements[i]?.id ?? "null");
        } else {
          if (titleElements[i]?.classList.contains("opHAS")) {
            closestValidElements.push(
              titleElements[i]?.nextSibling?.textContent?.trim() ??
                `NULL ${
                  titleElements[i]?.id ??
                  `Id null. Iteração do loop: ${titleAcc}`
                }`
            );
            closestValidElementsIds.push(titleElements[i]?.id ?? "null");
          } else {
            const nextESibling = titleElements[i]?.nextElementSibling;
            if (
              nextESibling instanceof HTMLLabelElement &&
              nextESibling.textContent !== ""
            ) {
              closestValidElements.push(
                nextESibling.textContent?.trim().replaceAll("\n", "") ??
                  `NULL ${
                    titleElements[i]?.id ??
                    `Id null. Iteração do loop: ${titleAcc}`
                  }`
              );
              closestValidElementsIds.push(nextESibling.id ?? "null");
            } else {
              console.warn(
                `Erro validando parents, labels, placeholders e textContent. Id do Input: ${
                  titleElements[i]?.id ?? null
                }; textContent ${
                  titleElements[i]?.textContent ?? null
                }; placeholder ${
                  (titleElements[i] as textEl)?.placeholder ?? null
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

  //loop para ajuste dos elementos dos arrays de titles e construção dos storager de titles
  for (let l = 0; l < titleElements.length; l++) {
    //correção de múltiplos espaços em labels e titles
    const multipleSpaceMatches = closestValidElements[l]?.match(/\s\s/) ?? null;
    if (
      closestValidElements[l] &&
      multipleSpaceMatches &&
      multipleSpaceMatches.length > 0
    ) {
      const spaceMatchesArray: number[] = [];
      multipleSpaceMatches.forEach((multipleSpaceMatch: string) => {
        const multipleSpaceIndex =
          closestValidElements[l]?.indexOf(multipleSpaceMatch) ?? 0;
        spaceMatchesArray.push(multipleSpaceIndex);
      });
      for (let m = 0; m < spaceMatchesArray.length; m++) {
        closestValidElements[l] =
          closestValidElements[l]?.slice(0, spaceMatchesArray[m]).trim() ??
          "null";
      }
    }

    //avaliador de labels e titles nulos
    if (
      closestValidElements[l]?.match(/[Nn][Uu][Ll][Ll]/g) ||
      closestValidElements[l] === undefined ||
      closestValidElements[l] === null
    ) {
      let inpValue = (inputs[l] as entryEl)?.value || "null";
      if (
        inputs[l] instanceof HTMLInputElement &&
        ((inputs[l] as HTMLInputElement)?.type === "radio" ||
          (inputs[l] as HTMLInputElement)?.type === "checkbox")
      ) {
        inpValue =
          (inputs[l] as HTMLInputElement)?.checked.toString() ?? "false";
      }
      nullTitleAcc++;
      console.warn(
        `Título nulo detectado: Número de acúmulo: ${nullTitleAcc}.
            Título: ${
              closestValidElements[l] || closestValidElements[l] || "null"
            };
            instância: ${
              Object.prototype.toString
                .call(closestValidElements[l])
                .slice(8, -1) ?? "undefined"
            };
            Id de input pareada: ${inputs[l]?.id ?? "null"};
            Valor de input pareado ${inpValue || "null"}`
      );
    }

    //criação do storager
    const nJSONTitleStorager = new JSONTitleStorager(closestValidElements[l]);

    //criação da store
    if (nJSONTitleStorager) {
      JSONTitlesStore.push(nJSONTitleStorager);
      const descriptor = nJSONTitleStorager.showInpTitle; //TODO EXPOSIÇÃO DE DADOS SOMENTE PARA FINALIDADES DE TESTE, POIS PROPRIEDADES PRIVADAS NÃO SÃO ENUMERÁVEIS
      if (descriptor) {
        JSONTitlesStoreDescriptors.push(descriptor.toString());
      } else {
        console.warn(
          `Erro validando descriptor para instância ${l} de JSONStorager`
        );
      }
    } else {
      console.warn(`Erro validando instância ${l} de JSONStorager`);
    }
  }

  //filtro e validação da store
  if (
    JSONInpsStoreDescriptors.length === JSONInpsStore.length &&
    JSONTitlesStoreDescriptors.length === JSONTitlesStore.length
  ) {
    const filter1JSONInpsStore = JSONInpsStore.filter(
      (JSONEl) => typeof JSONEl === "object"
    );
    const filter1JSONTitlesStore = JSONTitlesStore.filter(
      (JSONEl) => typeof JSONEl === "object"
    );
    if (
      filter1JSONInpsStore.length === JSONInpsStore.length &&
      filter1JSONTitlesStore.length === JSONTitlesStore.length
    ) {
      JSONInpsStore = filter1JSONInpsStore;
      JSONTitlesStore = filter1JSONTitlesStore;
      const filter2JSONInpsStore = JSONInpsStore.filter(
        (JSONEl) => JSONEl instanceof JSONStorager
      );
      const filter2JSONTitlesStore = JSONTitlesStore.filter(
        (JSONEl) => JSONEl instanceof JSONTitleStorager
      );
      if (
        filter2JSONInpsStore.length === JSONInpsStore.length &&
        filter1JSONTitlesStore.length === JSONTitlesStore.length
      ) {
        JSONInpsStore = filter2JSONInpsStore.sort();
        JSONTitlesStore = filter2JSONTitlesStore.sort();
        let JSONInpsStoreStringified: string[] = [];
        let JSONTitlesStoreStringified: string[] = [];
        //stringificação das stores
        JSONInpsStore.forEach((formEl) => {
          const elValues = formEl.showAllInfo;
          const elValuesStringified = JSON.stringify(elValues); //TODO DADOS EXPOSTO SOMENTE PARA FINS DE TESTE
          JSONInpsStoreStringified.push(elValuesStringified);
        });
        JSONTitlesStore.forEach((formEl) => {
          const elValues = formEl.showInpTitle;
          const elValuesStringified = JSON.stringify(elValues); //TODO DADOS EXPOSTO SOMENTE PARA FINS DE TESTE
          JSONTitlesStoreStringified.push(elValuesStringified);
        });
        JSONInpsStoreStringified = JSONInpsStoreStringified.sort();
        JSONTitlesStoreStringified = JSONTitlesStoreStringified.sort();

        //conclusão
        if (
          JSONInpsStore &&
          JSONInpsStoreStringified &&
          JSONTitlesStore &&
          JSONTitlesStoreStringified
        ) {
          return [
            JSONInpsStore,
            JSONInpsStoreStringified,
            JSONTitlesStore,
            JSONTitlesStoreStringified,
          ]; //stringified é a versão usada como Descriptor
        } else {
          return [null, null, null, null];
        }
      } else {
        console.warn(
          `Erro validando classes de elementos no JSONStore. 
          Número de instâncias obtidas para inputs: ${
            filter2JSONInpsStore.length ?? "undefined"
          }; Número esperado: ${JSONInpsStore.length ?? "undefined"};
          Número de instâncias obtidas para titles: ${
            filter2JSONTitlesStore.length ?? "undefined"
          }; Número esperado: ${JSONTitlesStore.length ?? "undefined"}`
        );
      }
    } else {
      console.warn(
        `Erro validando tipos de elementos nas JSONStore. 
        Número de objetos obtidos para inputs: ${
          filter1JSONInpsStore.length ?? "undefined"
        }; Número esperado: ${JSONInpsStore.length ?? "undefined"};
        Número de objetos obtidos para titles: ${
          filter1JSONTitlesStore.length ?? "undefined"
        }; Número esperado: ${JSONTitlesStore.length ?? "undefined"}`
      );
    }
  } else {
    console.warn(
      `Length de JSON Store Descriptors inválida. 
      Length obtida para inputs: ${
        JSONInpsStoreDescriptors.length ?? "undefined"
      }; Length esperada: ${JSONInpsStore.length ?? "undefined"};
      Length obtida para titles: ${
        JSONTitlesStoreDescriptors.length ?? "undefined"
      }; Length esperada: ${JSONTitlesStore.length ?? "undefined"}`
    );
  }
}

export function createJSONAnchor(
  JSONBtn: HTMLButtonElement,
  formInpsDescriptor: string[]
) {
  const formattedFormDescriptor = formatJSONFile(formInpsDescriptor);
  const JSONBlob = new Blob([formattedFormDescriptor[1]], {
    type: "application/json",
  });
  const JSONLink = document.createElement("a");
  JSONLink.id = "anchorJSON";
  JSONLink.className = JSONBtn.className;
  JSONLink.style.width = JSONBtn.style.width;
  JSONLink.style.height = JSONBtn.style.height;
  JSONLink.textContent = "Baixar JSON";
  JSONLink.href = URL.createObjectURL(JSONBlob);
  JSONLink.download = "formData.json";
  JSONBtn.replaceWith(JSONLink);
  return JSONLink;
}

function formatJSONFile(formInpsDescriptor: string[]) {
  let formatFormDescIds = `{\n`;
  let formatFormDescTitles = ``;
  let formatFormDescIdsRead = `{\n`;
  let formatFormDescTitlesRead = `{\n`;
  let labAcc = 1;

  //geração das unidades formatadas
  for (let i = 0; i < formInpsDescriptor.length; i++) {
    const separationMatches = formInpsDescriptor[i].match(/",/g);
    if (separationMatches) {
      // const firstSepIndex = formInpsDescriptor[i].indexOf(",");
      const secondSepIndex = formInpsDescriptor[i].indexOf(
        ",",
        formInpsDescriptor[i].indexOf(",") + 1
      );
      const lastSepIndex = formInpsDescriptor[i].lastIndexOf(
        separationMatches[0]
      );
      //formatação dos ids e values dos inputs
      let inpId = formInpsDescriptor[i].slice(
        secondSepIndex + 2,
        lastSepIndex + 1
      );
      let loopAcc = 0;
      while (inpId.match(/,/g)) {
        const commaIndex = inpId.indexOf(",");
        inpId = inpId.slice(commaIndex + 1);
        if (!inpId.match(/,/g) || loopAcc > 999) {
          break;
        }
        loopAcc++;
      }
      const value = formInpsDescriptor[i].slice(lastSepIndex + 2, -1);
      const lab =
        mapIdsTitles[inpId.replaceAll(/"/g, "") as keyof typeof mapIdsTitles];

      if (i == 89) {
        //bug não resolvido ainda
        if (!inpId) {
          inpId = '"confirmLocId"';
        }
      }
      //construção e concatenação das unidades formatadas
      formatFormDescIds += `\t${inpId}: ${value}, \n`;
      formatFormDescIdsRead += `\t${labAcc}. ${inpId}: ${value}, \n`; //versões em lista numerada, para logs e enumeração posterior
      labAcc++;
      if (lab && lab !== "null" && lab !== "") {
        formatFormDescTitlesRead += `\t${labAcc}. ${lab} for ${inpId}: ${value}, \n`;
        formatFormDescTitles += `\t"${lab}": ${value}, \n`;
      }
    }
  }
  //ajustes finais nos descriptors e união
  const finalDescIds = (
    formatFormDescIds +
    `\n\n` +
    formatFormDescTitles +
    `}`
  ).replace(", \n}", " \n}");
  const finalDescTitles = (`{` + formatFormDescTitles + `}`).replace(
    ", \n}",
    " \n}"
  );

  //para leitura em logs somente
  const finalDescIdsRead = (formatFormDescIdsRead + `}`)
    .replace(", \n}", " \n}")
    .replaceAll(/""null": "null",/g, "")
    .replaceAll(/""false": "false",/g, "")
    .replaceAll(/"null": "null",/g, "")
    .replaceAll(/"false": "false",/g, "")
    .replaceAll(/"false": "false"/g, "")
    .replaceAll(/"null": "null"/g, "")
    .replaceAll(/\t[0-9]{1,3}.\s:\s"null",\s\n/g, "")
    .replaceAll(/\t[0-9]{1,3}.\s:\s"false",\s\n/g, "")
    .replaceAll(/\t[0-9]{1,3}.\s\s\n/g, "");

  const finalDescTitlesRead = (formatFormDescTitlesRead + `}`)
    .replace(", \n}", " \n}")
    .replaceAll(/""null": "null",/g, "")
    .replaceAll(/""false": "false",/g, "")
    .replaceAll(/"null": "null",/g, "")
    .replaceAll(/"false": "false",/g, "")
    .replaceAll(/"false": "false"/g, "")
    .replaceAll(/"null": "null"/g, "")
    .replaceAll(/\t[0-9]{1,3}.\s:\s"null",\s\n/g, "")
    .replaceAll(/\t[0-9]{1,3}.\s:\s"false",\s\n/g, "")
    .replaceAll(/\t[0-9]{1,3}.\s\s\n/g, "");

  console.log(finalDescIdsRead);
  console.log(finalDescTitlesRead);
  return [finalDescTitles, finalDescIds];
}

export function regenerateJSONBtn(
  JSONLink: HTMLAnchorElement,
  formInpsDescriptor: string[]
) {
  const newJSONBtn = document.createElement("button");
  newJSONBtn.id = "btnJSON";
  newJSONBtn.className = JSONLink.className;
  newJSONBtn.style.width = JSONLink.style.width;
  newJSONBtn.style.height = JSONLink.style.height;
  newJSONBtn.textContent = "Regenerar JSON";
  JSONLink.replaceWith(newJSONBtn);
  setTimeout(() => {
    newJSONBtn.addEventListener("click", () =>
      createJSONAnchor(newJSONBtn, formInpsDescriptor)
    );
  }, 1000);
  // return newJSONBtn;
}

export function opRadioHandler(keydown: KeyboardEvent) {
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
    } else {
      console.warn(
        `radioYes: ${(radioYes as HTMLInputElement)?.checked ?? false}`
      );
      console.warn(
        `radioNo: ${(radioNo as HTMLInputElement)?.checked ?? false}`
      );
      console.warn(`${JSON.stringify(keydown)}`);

      const slicedError =
        new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
      ErrorHandler.multipleElementsNotFound(
        slicedError ?? "NULL",
        "validando radioYes ou radiosNo ou keydown event target",
        radioYes ?? null,
        radioNo ?? null
      );
    }
  }
}

export function cpbInpHandler(radio: HTMLInputElement) {
  if (radio.parentElement && radio.parentElement.parentElement) {
    const opRadiosCheck = radio.parentElement?.parentElement?.querySelectorAll(
      "input[id^='Cpb'][id$='Yes']"
    );
    const opRadiosText = radio.parentElement?.parentElement?.querySelectorAll(
      "input[id^='pb'][id$='Yes']"
    );
    const antFamChecks = radio.parentElement?.parentElement?.querySelectorAll(
      "input[id^='antFam']"
    );
    const textAdd = radio.parentElement?.parentElement?.querySelectorAll(
      "textarea[id^='textAdd']"
    );
    const divAdd =
      radio.parentElement?.parentElement?.querySelectorAll("div[id^='divAdd']");
    //inclui ambos os tipos de eventos
    if (opRadiosCheck.length > 0) {
      opRadiosCheck?.forEach(function (opRadioCheck, i) {
        if (
          divAdd[i] instanceof HTMLElement &&
          opRadioCheck instanceof HTMLInputElement &&
          (opRadioCheck.type === "checkbox" || opRadioCheck.type === "radio")
        ) {
          if (!opRadioCheck.checked) {
            (divAdd[i] as HTMLElement).style.display = "none";
          } else {
            (divAdd[i] as HTMLElement).style.display = "block";
          }
        }
      });
    }
    if (opRadiosText.length > 0) {
      opRadiosText?.forEach(function (opRadioText, i) {
        if (
          textAdd[i] instanceof HTMLElement &&
          opRadioText instanceof HTMLInputElement &&
          (opRadioText.type === "checkbox" || opRadioText.type === "radio")
        ) {
          if (!opRadioText.checked) {
            (textAdd[i] as HTMLElement).style.display = "none";
          } else {
            (textAdd[i] as HTMLElement).style.display = "block";
          }
        }
      });
    }
    if (antFamChecks.length > 0) {
      antFamChecks?.forEach((antFamCheck, i) => {
        const closestAddElement =
          antFamChecks[i].parentElement?.nextElementSibling;
        if (closestAddElement instanceof HTMLDivElement) {
          if (
            antFamCheck instanceof HTMLInputElement &&
            (antFamCheck.type === "checkbox" || antFamCheck.type === "radio") &&
            !antFamCheck.checked
          ) {
            closestAddElement.style.display = "none";
          } else {
            closestAddElement.style.display = "block";
          }
        }
      });
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.multipleElementsNotFound(
      slicedError ?? "NULL",
      "localizando parent elements de Radio",
      radio?.parentElement ?? null,
      radio?.parentElement?.parentElement ?? null
    );
  }
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
    if ((nullRadio as HTMLInputElement).checked) {
      numberInput.setAttribute("disabled", "");
    } else {
      numberInput.removeAttribute("disabled");
    }
  });
}

export function doubleClickHandler(input: HTMLInputElement) {
  input.checked = input.checked ? false : true;
  cpbInpHandler(input);
  deactTextInput();
}

// export function touchStartHandler(keydown: KeyboardEvent) {
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
//   cpbInpHandler(this);
// }

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
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.inputNotFound(
      targInputDate ?? null,
      "targInputDate",
      slicedError ?? "NULL"
    );
  }
}

export function searchNextSiblings(
  currentElement: Element,
  searchedSiblingClass: string
) {
  let loopAcc = 0;
  while (currentElement.nextElementSibling) {
    currentElement = currentElement.nextElementSibling;
    const isSiblingValid =
      currentElement.classList.contains(searchedSiblingClass);
    if (isSiblingValid || loopAcc > 999) {
      break;
    }
    loopAcc++;
  }
  return currentElement;
}

export function searchPreviousSiblings(
  currentElement: Element,
  searchedSiblingClass: string
) {
  let loopAcc = 0;
  while (currentElement.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    const isSiblingValid =
      currentElement.classList.contains(searchedSiblingClass);
    if (isSiblingValid || loopAcc > 999) {
      break;
    }
    loopAcc++;
  }
  return currentElement;
}

export function searchPreviousSiblingsById(
  currentElement: Element,
  searchedSiblingId: string
) {
  let loopAcc = 0;
  while (currentElement.previousElementSibling) {
    currentElement = currentElement.previousElementSibling;
    const isSiblingValid = currentElement.id === searchedSiblingId;
    if (isSiblingValid || loopAcc > 999) {
      break;
    }
    loopAcc++;
  }
  return currentElement;
}

export function searchParents(
  currentElement: Element,
  searchedParentClass: string
) {
  let loopAcc = 0;
  while (currentElement.parentElement) {
    currentElement = currentElement.parentElement;
    const isParentValid =
      currentElement.classList.contains(searchedParentClass);
    if (isParentValid || loopAcc > 999) {
      break;
    }
    loopAcc++;
  }
  return currentElement;
}

export function changeToAstDigit(
  click: MouseEvent,
  toFileInpBtn: HTMLButtonElement
) {
  const useAstDigitRegex = /Usar Assinatura Digital/;
  const useAstDigtRegexObj = new RegExp(useAstDigitRegex);
  const useAstTextRegex = /Retornar à Assinatura Escrita/;
  const useAstTextRegexObj = new RegExp(useAstTextRegex);
  let labCont: HTMLCollectionOf<Element> | string | Element[] =
    toFileInpBtn.parentElement?.getElementsByClassName("labAst") ?? "null";
  if (
    labCont[0] === "null" &&
    (toFileInpBtn.parentElement?.tagName === "LABEL" ||
      toFileInpBtn.parentElement?.tagName === "SPAN")
  ) {
    labCont = Array.of(toFileInpBtn.parentElement);
  }

  if (click.target === toFileInpBtn) {
    if (
      toFileInpBtn.textContent &&
      useAstDigtRegexObj.test(toFileInpBtn.textContent)
    ) {
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
          const idLabMatch =
            (labCont[0] as Element).id.match(/Ast/)?.toString() ?? "";
          const idInpMatch = fileInp.id.match(/Ast/)?.toString() ?? "";
          const idLabMatchIndex = (labCont[0] as Element).id.indexOf(
            idLabMatch
          );
          const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
          if (idLabMatchIndex && idInpMatchIndex) {
            const sliceOneLabId = (labCont[0] as Element).id.slice(
              0,
              idLabMatchIndex
            );
            const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
            (labCont[0] as Element).id = sliceOneLabId + sliceTwoInpId;
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
              try {
                if (
                  chose.target instanceof HTMLInputElement &&
                  fileInp.files &&
                  fileInp.files.length > 0
                ) {
                  const imgFile = fileInp.files[0];
                  if (imgFile && imgFile.type.startsWith("image")) {
                    const fileReader = new FileReader();

                    fileReader.onload = (load) => {
                      //definir lógica para carregamento
                      //inicia preparo para evento de carregamento
                      const imgUrl = load.target?.result; //checa a url do file que será carregado
                      const imgAstDigt = document.createElement("img"); //cria container
                      fileInp.id = inpAst.id;
                      fileInp.className = inpAst.className;
                      imgAstDigt.innerHTML = "";
                      if (typeof imgUrl === "string") {
                        imgAstDigt.src = imgUrl; //associação entre container e file carregado
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
                        const idLabMatch = (labCont[0] as Element).id
                          .match(/Ast/)
                          ?.toString();
                        const idInpMatch = imgAstDigt.id
                          .match(/Ast/)
                          ?.toString();
                        if (idLabMatch && idInpMatch) {
                          const idLabMatchIndex = (
                            labCont[0] as Element
                          ).id.indexOf(idLabMatch);
                          const idInpMatchIndex =
                            imgAstDigt.id.indexOf(idInpMatch);
                          const sliceOneLabId = (
                            labCont[0] as Element
                          ).id.slice(0, idLabMatchIndex);
                          const sliceTwoInpId =
                            imgAstDigt.id.slice(idInpMatchIndex);
                          (labCont[0] as Element).id =
                            sliceOneLabId + sliceTwoInpId;
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
                console.error((error as Error).message);
              }
            });
          }
        }
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.inputNotFound(
          inpAst ?? null,
          "inpAst",
          slicedError ?? "NULL"
        );
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
          const idLabMatch = (labCont[0] as Element).id
            .match(/Ast/)
            ?.toString();
          const idInpMatch = fileInp.id.match(/Ast/)?.toString();
          if (idLabMatch && idInpMatch) {
            const idLabMatchIndex = (labCont[0] as Element).id.indexOf(
              idLabMatch
            );
            const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
            const sliceOneLabId = (labCont[0] as Element).id.slice(
              0,
              idLabMatchIndex
            );
            const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
            (labCont[0] as Element).id = sliceOneLabId + sliceTwoInpId;
            toFileInpBtn.textContent = "Usar Assinatura Digital";
            toFileInpBtn.previousElementSibling?.removeAttribute("hidden");
            fileInp.addEventListener("input", () =>
              GlobalModel.autoCapitalizeInputs(fileInp)
            );
          } else {
            console.warn("Erro no match de ids do Input");
          }
        }
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.elementNotFound(
          inpAst ?? null,
          "inpAst",
          slicedError ?? "NULL"
        );
      }
    }
  }
}

export function resetarFormulario(
  click: MouseEvent,
  toFileInpBtns: HTMLButtonElement[] | NodeListOf<HTMLButtonElement>
) {
  if (
    click.target instanceof HTMLElement &&
    click.target.tagName === "BUTTON"
  ) {
    const formulario = document.getElementById("formAnamGId");
    const editableCite = document.querySelector('cite[contenteditable="true"]');
    const genBirthRel = document.getElementById("genBirthRelId");
    const genTrans = document.getElementById("genTransId");

    if (formulario && formulario instanceof HTMLFormElement) {
      formulario.reset();
    } else {
      console.error("Erro validando formulário");
    }

    if (editableCite) {
      editableCite.textContent = `--Nome`;
      GlobalModel.removeFirstClick(editableCite);
    } else {
      console.warn(`editableCite não encontrado em reset.`);
    }

    if (
      genBirthRel instanceof HTMLSelectElement ||
      genBirthRel instanceof HTMLInputElement
    ) {
      genBirthRel.value = "cis";
      genBirthRel.hidden = true;
    } else {
      console.warn(`genBirthRel não encontrado em reset.`);
    }

    if (
      genTrans instanceof HTMLSelectElement ||
      genTrans instanceof HTMLInputElement
    ) {
      genTrans.value = "avancado";
      genTrans.hidden = true;
    } else {
      console.warn(`genTrans não encontrado em reset.`);
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
            let labCont: HTMLCollectionOf<Element> | Element[] | string =
              toFileInpBtn.parentElement?.getElementsByClassName("labAst") ??
              "null";
            if (
              (labCont[0] === "null" || (labCont[0] as Element).id === "") &&
              (toFileInpBtn.parentElement?.tagName === "LABEL" ||
                toFileInpBtn.parentElement?.tagName === "SPAN")
            ) {
              labCont = Array.of(toFileInpBtn.parentElement);
            }
            inpAst.parentElement.replaceChild(fileInp, inpAst);
            const idLabMatch = (labCont[0] as Element).id
              .match(/Ast/)
              ?.toString();
            const idInpMatch = fileInp.id.match(/Ast/)?.toString();
            if (idLabMatch && idInpMatch) {
              const idLabMatchIndex = (labCont[0] as Element).id.indexOf(
                idLabMatch
              );
              const idInpMatchIndex = fileInp.id.indexOf(idInpMatch);
              const sliceOneLabId = (labCont[0] as Element).id.slice(
                0,
                idLabMatchIndex
              );
              const sliceTwoInpId = fileInp.id.slice(idInpMatchIndex);
              (labCont[0] as Element).id = sliceOneLabId + sliceTwoInpId;
              fileInp.addEventListener("input", () =>
                GlobalModel.autoCapitalizeInputs(fileInp)
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
