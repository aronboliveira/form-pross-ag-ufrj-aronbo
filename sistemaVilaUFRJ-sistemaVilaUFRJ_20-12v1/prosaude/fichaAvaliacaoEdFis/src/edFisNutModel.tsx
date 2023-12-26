//nesse file estão presentes principalmente as funções relacionadas à exigência de modelo textual e de visualização
"use strict";
import * as GlobalModel from "../../globalScripts/src/gModel.js";
import * as ErrorHandler from "../../globalScripts/src/errorHandler.js";
import { Person } from "../../globalScripts/src/classes.js";
import { entryEl, formPerson, targEl } from "../../globalScripts/src/types.js";

export function checkInnerColGroups(
  parentElement: HTMLElement
): [number, boolean] {
  const validColGroupsChildCount = [];
  let areAllCoolGroupsSimilar = false;
  if (parentElement instanceof HTMLElement) {
    const colGroups = Array.from(parentElement.querySelectorAll("colgroup"));
    const areColGroupValids = colGroups.every(
      (colGroup) => colGroup instanceof HTMLTableColElement
    );

    //popula arrays de colgroups com base em filtragem de instância
    if (areColGroupValids && colGroups.length > 0) {
      for (let i = 0; i < colGroups.length; i++) {
        const colGrpChilds = colGroups[i].children;
        const cols = Array.from(colGrpChilds);
        if (cols.every((col) => col instanceof HTMLTableColElement)) {
          validColGroupsChildCount.push(colGroups[i].childElementCount);
        } else {
          const colsInstances = [];
          for (let j = 0; j < cols.length; j++) {
            const childInstance = `${
              Object.prototype.toString.call(cols[j]).slice(8, -1) ?? "null"
            }`;
            colsInstances.push(childInstance);
            if (childInstance !== `HTMLTableColElement`) {
              const slicedError =
                new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
              ErrorHandler.elementNotFound(
                cols[j] ?? null,
                "child <col>",
                slicedError ?? "NULL"
              );
            }
          }
          const validCols = cols.filter(
            (col) => col instanceof HTMLTableColElement
          );
          validColGroupsChildCount.push(validCols.length);
        }
      }
    } else {
      console.warn(`Erro validando colGroups.
      areColGroupValids: ${areColGroupValids ?? false};
      Instância obtida: ${
        Object.prototype.toString.call(colGroups).slice(8, -1) ?? "null"
      };
      Length obtida: ${colGroups.length ?? 0}`);
    }

    //filtra array de colgroups válida com base em colunas de tamanho similar
    const pairedColGroupsValid = [];
    for (let m = 0; m < validColGroupsChildCount.length; m++) {
      if (m === 0) {
        continue;
      } else {
        if ((validColGroupsChildCount[m] = validColGroupsChildCount[m - 1])) {
          pairedColGroupsValid.push(true);
        } else {
          console.warn(`Erro validando par de Col Groups.
          Par invalidado: ${validColGroupsChildCount[m] ?? "null"} com ${
            validColGroupsChildCount[m - 1] ?? "null"
          }`);
          pairedColGroupsValid.push(false);
        }
      }
    }

    //verifica se todos os pares são válidos para, em caso negativo, fornecer warn
    if (
      pairedColGroupsValid.every((pairedColGroup) => pairedColGroup === true)
    ) {
      areAllCoolGroupsSimilar = true;
    } else {
      console.warn(`Grupos de Colunas não são similares no número de children`);
      areAllCoolGroupsSimilar = false;
    }
  }
  return [validColGroupsChildCount?.length ?? 0, areAllCoolGroupsSimilar];
}

export function changeTabDCutLayout(
  protocolo: targEl,
  tabDC: HTMLTableElement
) {
  const bodyType = document.getElementById("textBodytype");
  if (
    protocolo &&
    tabDC &&
    bodyType &&
    (bodyType instanceof HTMLSelectElement ||
      bodyType instanceof HTMLInputElement)
  ) {
    const optionElementMatch7 = (protocolo as entryEl)?.value
      .match(/^pollock7$/i)
      ?.toString();
    const optionElementMatch3 = (protocolo as entryEl)?.value
      .match(/^pollock3$/i)
      ?.toString();
    const opsProtocolo = Array.from(protocolo.children);
    const filteredOpsProtocolo = opsProtocolo.filter(
      (childProtocolo) => childProtocolo instanceof HTMLOptionElement
    );
    if (filteredOpsProtocolo.length < opsProtocolo.length) {
      console.warn(
        `Algum elementos de Protocolo não foram reconhecidos como opções. Total de reconhecimentos: ${filteredOpsProtocolo.length}`
      );
    }
    for (let iOp = 0; iOp < filteredOpsProtocolo.length - 1; iOp++) {
      if (optionElementMatch3) {
        const arrayTabIds = checkTabRowsIds(tabDC);
        if (arrayTabIds && arrayTabIds.length !== tabDC.rows.length) {
          const genderedIds = GlobalModel.filterIdsByGender(
            arrayTabIds,
            bodyType.value
          );
          if (bodyType.value === "masculino" || bodyType.value === "feminino") {
            if (genderedIds && genderedIds.length === 3) {
              const matchedIds = [];
              for (let iG = 0; iG < genderedIds.length; iG++) {
                for (let iR = 0; iR < arrayTabIds.length; iR++) {
                  if (genderedIds[iG].toLowerCase() === arrayTabIds[iR]) {
                    const slice1 = genderedIds[iG].charAt(0).toUpperCase();
                    const slice2 = genderedIds[iG].slice(1);
                    if (slice1 && slice2) {
                      const capitalizedGenderedId = slice1 + slice2;
                      matchedIds.push(`row${capitalizedGenderedId}`);
                    }
                  }
                }
              }
              const medTrs = Array.from(
                tabDC.querySelectorAll("tr.tabRowDCutMed")
              );

              for (let iTr = 0; iTr < medTrs.length; iTr++) {
                medTrs[iTr].setAttribute("hidden", "");
                const innerInp = medTrs[iTr].querySelector("input");
                if (innerInp && innerInp.required) {
                  innerInp.removeAttribute("required");
                  if (medTrs[iTr].id?.slice(-4) !== "Coxa") {
                    innerInp.value = "";
                  }
                }
              }
              for (let iMat = 0; iMat < matchedIds.length; iMat++) {
                const matchedTr = document.getElementById(matchedIds[iMat]);
                if (matchedTr) {
                  const isRowHidden = matchedTr.hidden;
                  if (isRowHidden) {
                    matchedTr.removeAttribute("hidden");
                  }
                  const innerInp = matchedTr.querySelector("input");
                  if (innerInp) {
                    innerInp.setAttribute("required", "");
                  }
                }
              }
            } else {
              console.warn(
                `Erro na validação de ids de row. Elemento ${JSON.stringify(
                  genderedIds
                )}; Número obtido ${
                  genderedIds?.length ?? null
                }; Número esperado: 3`
              );
            }
          } else if (bodyType.value === "neutro") {
            if (genderedIds && genderedIds.length === 5) {
              const matchedIds = [];
              for (let iG = 0; iG < genderedIds.length; iG++) {
                for (let iR = 0; iR < arrayTabIds.length; iR++) {
                  if (genderedIds[iG].toLowerCase() === arrayTabIds[iR]) {
                    const slice1 = genderedIds[iG].charAt(0).toUpperCase();
                    const slice2 = genderedIds[iG].slice(1);
                    const capitalizedGenderedId = slice1 + slice2;
                    matchedIds.push(`row${capitalizedGenderedId}`);
                  }
                }
              }
              const medTrs = Array.from(
                tabDC.querySelectorAll("tr.tabRowDCutMed")
              );
              for (let iTr = 0; iTr < medTrs.length; iTr++) {
                medTrs[iTr].setAttribute("hidden", "");
                const innerInp = medTrs[iTr].querySelector("input");
                if (innerInp) {
                  if (medTrs[iTr].id?.slice(-4) !== "Coxa") {
                    innerInp.value = "";
                  }
                }
              }
              for (let iM = 0; iM < matchedIds.length; iM++) {
                const matchedTr = document.getElementById(matchedIds[iM]);
                if (matchedTr) {
                  const isRowHidden = matchedTr.hidden;
                  if (isRowHidden) {
                    matchedTr.removeAttribute("hidden");
                    const innerInp = matchedTr.querySelector("input");
                    if (innerInp && matchedTr.id?.slice(-4) !== "Coxa") {
                      innerInp.removeAttribute("required");
                    }
                  }
                }
              }
            } else {
              console.warn(
                `Erro na validação de ids de row. Elemento ${JSON.stringify(
                  genderedIds
                )}; Número obtido ${
                  genderedIds?.length ?? null
                }; Número esperado: 3`
              );
            }
          } else {
            const slicedError =
              new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
            ErrorHandler.stringError(
              "validando .value de bodyType",
              bodyType?.value ?? null,
              slicedError ?? "NULL"
            );
          }
        } else {
          console.warn(
            `Erro na verificação do número de rows. Elemento ${JSON.stringify(
              arrayTabIds
            )}; Número obtido: ${
              arrayTabIds?.length ?? null
            }; Número esperado: ${tabDC.rows.length}`
          );
        }
        return "pollock3";
      } else if (optionElementMatch7) {
        const medTrs = Array.from(tabDC.querySelectorAll("tr.tabRowDCutMed"));
        for (let iTr = 0; iTr < medTrs.length; iTr++) {
          const isRowHidden = (medTrs[iTr] as HTMLElement).hidden;
          if (isRowHidden) {
            medTrs[iTr].removeAttribute("hidden");
            const innerInp = medTrs[iTr].querySelector("input");
            if (innerInp) {
              innerInp.setAttribute("required", "");
            }
          }
        }
        return "pollock7";
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.stringError(
          "obtendo pollock.value",
          (protocolo as entryEl)?.value ?? null,
          slicedError ?? "NULL"
        );
        return "pollock3";
      }
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(
      bodyType ?? null,
      "bodyType",
      slicedError ?? "NULL"
    );
    return "pollock3";
  }
  return "pollock3";
}

function checkTabRowsIds(tab: HTMLTableElement) {
  const arrayTabIds = [];
  if (tab.id === "tabDCut") {
    const tableRows = Array.from(tab.querySelectorAll("tr.tabRowDCutMed"));
    for (let iR = 0; iR < tableRows.length; iR++) {
      const rowId = tableRows[iR].id;
      const rowIdMatch = rowId.match(/^row/)?.toString();
      if (rowIdMatch) {
        const slicedRowId = rowId.slice(3).toLowerCase();
        arrayTabIds.push(slicedRowId);
      } else {
        const slicedError =
          new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
        ErrorHandler.stringError(
          `obtendo id da row ${tableRows[iR] ?? null}`,
          rowId ?? null,
          slicedError ?? "NULL"
        );
      }
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.stringError(
      `obtendo id da table ${tab ?? null}`,
      tab.id ?? null,
      slicedError ?? "NULL"
    );
  }
  return arrayTabIds;
}

//correção para limitação da fórmula de PGC
export function isPGCDecaying(
  person: formPerson,
  PGC: number,
  targInpPGC: targEl
): [boolean, number] {
  let foundDecayPoint = false;
  let sumAcc = 1;
  const initSumDCut = person.sumDCut;
  const decreasedPerson = Person.clonePerson(person);
  const spanRoundingAlertIcon = document.getElementById(
    `alert_${(targInpPGC as entryEl).id}`
  );

  if (!(spanRoundingAlertIcon instanceof HTMLSpanElement)) {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.elementNotFound(
      spanRoundingAlertIcon ?? null,
      "spanRoundingAlertIcon",
      slicedError ?? "NULL"
    );
  } else {
    if (spanRoundingAlertIcon.hidden === false) {
      spanRoundingAlertIcon.hidden = true;
    }
  }

  if (decreasedPerson) {
    decreasedPerson.sumDCut = decreasedPerson.sumDCut - 1;
    let decreasedPGC = decreasedPerson.calcPGC(decreasedPerson);
    //caso padrão de decay
    if (decreasedPGC > PGC) {
      if (spanRoundingAlertIcon?.hidden === true) {
        spanRoundingAlertIcon.hidden = false;
      }
      const arrDecreasedPGC = [];
      while (decreasedPerson.sumDCut > 0) {
        sumAcc++;
        decreasedPerson.sumDCut = decreasedPerson.sumDCut - 1;
        decreasedPGC = decreasedPerson.calcPGC(decreasedPerson);
        arrDecreasedPGC.push(decreasedPGC);
        if (decreasedPGC < PGC) {
          break;
        }
        if (sumAcc > 999) {
          console.warn(`Ciclo 2 exaurido.`);
          break;
        }
      }
      if (arrDecreasedPGC.length > 0) {
        const factorNormDecayedPGC = ((initSumDCut - 260) / 100) * 5;
        PGC =
          Math.ceil((Math.max(...arrDecreasedPGC) + 0.05) * 10) / 10 +
          factorNormDecayedPGC;
        if (decreasedPerson.sumDCut > 515) {
          PGC = 60.5;
        }
      } else {
        PGC = decreasedPGC;
      }
      foundDecayPoint = true;
    } else if (decreasedPGC <= PGC) {
      //casos específicos para handling de input anômalo (além do possível para um ser humano), evitando bugs nos listeners devido a NaN e loops de normalização
      if (PGC > 100 || decreasedPerson.sumDCut > 514) {
        console.warn(
          `Valor anômalo de entrada para sumDCut e/ou PGC. Valor aproximado fornecido`
        );
        if (spanRoundingAlertIcon?.hidden === true) {
          spanRoundingAlertIcon.hidden = false;
        }
        foundDecayPoint = true;
        PGC = 60.45 + 0.05 * ((decreasedPerson?.sumDCut ?? 514) - 513);
      }
    }
  } else {
    const slicedError =
      new Error().stack?.split("\n")[1]?.trim()?.slice(-7, -1) || "";
    ErrorHandler.objectError(
      "decreasedPerson",
      person ?? null,
      "person",
      "6",
      slicedError
    );
  }

  return [foundDecayPoint, PGC];
}
