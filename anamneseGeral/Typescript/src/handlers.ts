//nesse file estão presentes principalmente as funções de manipulação dinâmica de texto e layout
import * as Model from "./model.js";
import {
  UndefinedPerson,
  Man,
  Woman,
  Neutro,
  JSONStorager,
  JSONTitleStorager,
} from "./classes.js";
import type {
  looseNum,
  targNum,
  targStr,
  targStrArr,
  targEl,
  arrTargEl,
  HTMLTargEl,
  entryEl,
  textEl,
  formPerson,
  formClassPerson,
} from "./types.js";
import * as ErrorHandler from "./errorHandler.js";

const rgbaRegex = /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/;
let blockCount = 1;
const enumIdsTitles = {
  0: "dateHeader",
  1: "firstNameId",
  2: "additionalNameId",
  3: "familyNameId",
  4: "socialNameId",
  5: "telAreaCodeId",
  6: "telId",
  7: "telCountryCodeId",
  8: "tel2AreaCodeId",
  9: "tel2Id",
  10: "tel2CountryCodeId",
  11: "email1Id",
  12: "email2Id",
  13: "countryId",
  14: "mundId",
  15: "cepId",
  16: "UFId",
  17: "cityId",
  18: "neighbourhoodId",
  19: "streetId",
  20: "streetNumId",
  21: "streetNumNullId",
  22: "compNumIdId",
  23: "compNumNullId",
  24: "dateBDayId",
  25: "dateAgeId",
  26: "genId",
  27: "genBirthRelId",
  28: "genTransId",
  29: "genFisAlinId",
};

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

export function getJSONDesc(inputs: targEl[]) {
  let titleElements: targEl[] = [];
  let closestValidElements: (Element | string | null)[] = [];
  let closestValidElementsIds: targStr[] = [];
  let closestBooleanElements: (Element | targStr)[] = [];
  let closestBooleanElementsIds: targStr[] = [];
  let inpValues: string[] = [];
  let inpIds: string[] = [];
  let JSONInpsStore: JSONStorager[] = [];
  let JSONTitlesStore: JSONTitleStorager[] = [];
  let JSONInpsStoreDescriptors: string[] = [];
  let JSONTitlesStoreDescriptors: string[] = [];
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
        inpIds.push(inputs[z]?.id ?? "null");
        inpValues.push((inputs[z] as HTMLInputElement)?.value ?? "null");
      }
    } else if (
      inputs[z] instanceof HTMLTextAreaElement ||
      inputs[z] instanceof HTMLSelectElement
    ) {
      inpIds.push(inputs[z]?.id ?? "null");
      inpValues.push(
        (inputs[z] as HTMLTextAreaElement | HTMLSelectElement)?.value ?? "null"
      );
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
          (closestValidElements[j] as HTMLElement)?.id ?? "null"
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
                (titleElements[i] as textEl)?.name === "nivelFumo"
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
                  if (titleElements[i]?.id === "confirmLocId") {
                    closestValidElements.push(
                      closestParent?.textContent?.trim().replaceAll("\n", "") ??
                        `NULL ${
                          titleElements[i]?.id ??
                          `Id null. Iteração do loop: ${titleAcc}`
                        }`
                    );
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
                  (titleElements[i] as HTMLTextAreaElement)?.placeholder ?? null
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
    const multipleSpaceMatches =
      (closestValidElements[l] as string)?.match(/\s\s/) ?? null;
    if (
      closestValidElements[l] &&
      multipleSpaceMatches &&
      multipleSpaceMatches.length > 0
    ) {
      let spaceMatchesArray: number[] = [];
      multipleSpaceMatches.forEach((multipleSpaceMatch: string) => {
        const multipleSpaceIndex =
          (closestValidElements[l] as string)?.indexOf(multipleSpaceMatch) ?? 0;
        spaceMatchesArray.push(multipleSpaceIndex);
      });
      for (let m = 0; m < spaceMatchesArray.length; m++) {
        closestValidElements[l] =
          (closestValidElements[l] as string)
            ?.slice(0, spaceMatchesArray[m])
            .trim() ?? "null";
      }
    }

    //avaliador de labels e titles nulos
    if (
      (closestValidElements[l] as string)?.match(/[Nn][Uu][Ll][Ll]/g) ||
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
              (closestValidElements[l] as HTMLElement)?.textContent ||
              (closestValidElements[l] as HTMLTextAreaElement)?.placeholder ||
              "null"
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
        // console.log("STORE " + JSONTitlesStoreStringified);
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
  formInpsDescriptor: string[],
  formTitlesDescriptor: string[]
) {
  const formattedFormDescriptor = formatJSONFile(
    formInpsDescriptor,
    formTitlesDescriptor
  );
  const JSONBlob = new Blob([formattedFormDescriptor[1]], {
    type: "application/json",
  });
  const JSONLink = document.createElement("a");
  JSONLink.id = "anchorJSON";
  JSONLink.className = JSONBtn.className;
  // JSONLink.width = JSONBtn.width;
  // JSONLink.height = JSONBtn.height;
  JSONLink.textContent = "Baixar JSON";
  JSONLink.href = URL.createObjectURL(JSONBlob);
  JSONLink.download = "formData.json";
  JSONBtn.replaceWith(JSONLink);
  return JSONLink;
}

function formatJSONFile(
  formInpsDescriptor: string[],
  formTitlesDescriptor: string[]
) {
  let formatFormDescIds = `{\n`;
  let formatFormDescTitles = `{\n`;
  let formatFormDescIdsRead = `{\n`;
  let formatFormDescTitlesRead = `{\n`;
  let labAcc = 1;

  // console.log(formTitlesDescriptor);
  //geração das unidades formatadas
  for (let i = 0; i < formInpsDescriptor.length; i++) {
    let lab = "";
    let separationMatches = formInpsDescriptor[i].match(/",/g);
    if (separationMatches) {
      const firstSepIndex = formInpsDescriptor[i].indexOf(",");
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
      while (inpId.match(/,/g)) {
        const commaIndex = inpId.indexOf(",");
        inpId = inpId.slice(commaIndex + 1);
        if (!inpId.match(/,/g)) {
          break;
        }
      }
      const value = formInpsDescriptor[i].slice(lastSepIndex + 2, -1);
      if (i < Object.keys(enumIdsTitles).length) {
        // console.log(
        //   "COMPRIMENTO DE FORM TITLES " + formTitlesDescriptor.length
        // );
        // console.log(enumIdsTitles[i]);
      }
      // console.log(mapIdsTitles[inpId]);

      let lab =
        mapIdsTitles[inpId.replaceAll(/"/g, "") as keyof typeof mapIdsTitles];

      //construção e concatenação das unidades formatadas
      formatFormDescIds += `\t${inpId}: ${value}, \n`;
      formatFormDescIdsRead += `\t${labAcc}. ${inpId}: ${value}, \n`; //versões em lista numerada, para logs e enumeração posterior
      labAcc++;
      if (lab && lab !== "null" && lab !== "") {
        formatFormDescTitlesRead += `\t${labAcc}. ${lab} for ${inpId}: ${value}, \n`;
        formatFormDescTitles += `\t${lab}: ${value}, \n`;
      }
    }
  }
  //ajustes finais nos descriptors e união
  const finalDescIds = (formatFormDescIds + `}`).replace(", \n}", " \n}");
  const finalDescTitles = (formatFormDescTitles + `}`).replace(", \n}", " \n}");

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

  // console.log(finalDescIds);
  // console.log(finalDescIdsRead);
  console.log(finalDescTitlesRead);
  return [finalDescTitles, finalDescIds];
}

export function regenerateJSONBtn(
  JSONLink: HTMLAnchorElement,
  formInpsDescriptor: string[],
  formTitlesDescriptor: string[]
) {
  const newJSONBtn = document.createElement("button");
  newJSONBtn.id = "btnJSON";
  newJSONBtn.className = JSONLink.className;
  // newJSONBtn.width = JSONLink.width;
  // newJSONBtn.height = JSONLink.height;
  newJSONBtn.textContent = "Regenerar JSON";
  JSONLink.replaceWith(newJSONBtn);
  setTimeout(() => {
    newJSONBtn.addEventListener("click", () =>
      createJSONAnchor(newJSONBtn, formInpsDescriptor, formTitlesDescriptor)
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
