//nesse file ocorrem principalmente as adições de listeners, sincronização das chamadas de funções para manipulação de informação/layout e validação dos elementos no DOM
import * as AGHandlers from "./aGHandlers.js";
import * as AGModel from "./aGModel.js";
import * as GlobalModel from "../../global-scripts/src/gModel.js";
import * as GlobalHandler from "../../global-scripts/src/gHandlers.js";
import * as GlobalControl from "../../global-scripts/src/gController.js";
import * as ErrorHandler from "../../global-scripts/src/errorHandler.js";
import { extLine } from "../../global-scripts/src/errorHandler.js";
import * as XLSX from "./xlsx/xlsx.mjs";
//inicialização de constantes percorrendo o DOM
const genElement = document.getElementById("genId");
const allInputs = Array.from([
  ...document.querySelectorAll("input"),
  ...document.querySelectorAll("textarea"),
  ...document.querySelectorAll("select"),
  document.querySelector('cite[contenteditable="true"]'),
]).flat(1);
const JSONBtn = document.getElementById("btnJSON");
let genValue = genElement?.value || "masculino",
  JSONLink,
  isAutocorrectOn = true,
  firstClick = true,
  blockCount = 1;
//validação de constantes obtidas e aplicação de listeners/callbacks
[isAutocorrectOn, firstClick] = GlobalControl.getGlobalEls(
  isAutocorrectOn,
  firstClick,
  "num"
);
//exportações para o jest
export function addListenersGenConts(genElement, genValue = "masculino") {
  const genBirthRel = document.getElementById("genBirthRelId");
  const genTrans = document.getElementById("genTransId");
  const genFisAlin = document.getElementById("genFisAlinId");
  if (
    GlobalModel.checkAllGenConts(
      genElement,
      genBirthRel,
      genTrans,
      genFisAlin
    ) &&
    typeof genValue === "string"
  ) {
    const arrGenConts = [genElement, genBirthRel, genTrans, genFisAlin];
    arrGenConts.forEach((genCont) => {
      genCont.addEventListener("change", () => {
        genValue =
          GlobalModel.fluxGen(arrGenConts, genElement?.value) || "masculino";
        console.log(genValue);
        return genValue || "masculino";
      });
    });
  } else
    ErrorHandler.multipleElementsNotFound(
      extLine(new Error()),
      "gen Elements",
      genElement,
      genBirthRel,
      genTrans,
      genFisAlin
    );
  return genValue || "masculino";
}
export function addListenerTelInputs() {
  const telInputs = document.querySelectorAll('input[type="text"][id^="tel"]');
  if (telInputs?.length > 0) {
    telInputs.forEach((telInput) => {
      if (
        telInput instanceof HTMLInputElement ||
        telInput instanceof HTMLTextAreaElement
      )
        telInput.addEventListener("input", (input) => {
          if (
            input.target instanceof HTMLInputElement ||
            input.target instanceof HTMLTextAreaElement
          )
            AGModel.formatTel(input.target);
          else
            ErrorHandler.inputNotFound(
              input?.target,
              `target telInput id ${JSON.stringify(
                telInput?.id || "UNIDENTIFIED TELINPUT"
              )}`,
              extLine(new Error())
            );
        });
      else
        ErrorHandler.inputNotFound(
          telInput,
          `target telInput id ${JSON.stringify(
            telInput?.id || "UNIDENTIFIED TELINPUT"
          )}`,
          extLine(new Error())
        );
    });
  } else
    ErrorHandler.elementNotPopulated(
      telInputs,
      "telInputs",
      extLine(new Error())
    );
}
export function addListenersEmailInputs() {
  const emailInputs = document.querySelectorAll('input[id^="email"]');
  if (emailInputs?.length > 0) {
    emailInputs.forEach((emailInput) => {
      if (emailInput instanceof HTMLInputElement) {
        emailInput.addEventListener("click", () =>
          AGModel.addEmailExtension(emailInput)
        );
        emailInput.addEventListener("input", () =>
          AGModel.addEmailExtension(emailInput)
        );
      } else
        ErrorHandler.inputNotFound(
          emailInput,
          `target emailInput id ${emailInput?.id || "UNDEFINED EMAILINPUT"}`,
          extLine(new Error())
        );
    });
  } else
    ErrorHandler.elementNotPopulated(
      emailInputs,
      "emailInputs",
      extLine(new Error())
    );
}
export function addListenerAntFamChecks() {
  const antFamChecks = document.querySelectorAll("input[id^='antFam']");
  if (antFamChecks?.length > 0) {
    antFamChecks.forEach((antFamCheck) => {
      if (antFamCheck instanceof HTMLInputElement) {
        antFamCheck.addEventListener("change", (change) =>
          GlobalHandler.cpbInpHandler(change, antFamCheck)
        );
        antFamCheck.addEventListener("dblclick", () =>
          GlobalHandler.doubleClickHandler(antFamCheck)
        );
      } else
        ErrorHandler.inputNotFound(
          antFamCheck,
          `target antFamCheck input id ${
            antFamCheck?.id || "UNDEFINED ID INPUT"
          }`,
          extLine(new Error())
        );
    });
  } else
    ErrorHandler.elementNotPopulated(
      antFamChecks,
      "antFamChecks",
      extLine(new Error())
    );
}
export function addListenerAntMedContainer(blockCount = 1) {
  const antMedContainer = document.getElementById("antMedContainer");
  antMedContainer
    ? antMedContainer.addEventListener("click", (click) => {
        console.log();
        blockCount = AGHandlers.addAntMedHandler(click, blockCount);
        return blockCount;
      })
    : ErrorHandler.elementNotFound(
        null,
        "antMedContainer",
        extLine(new Error())
      );
  return blockCount;
}
export function addListenersCepElements() {
  const cepElement = document.getElementById("cepId");
  const cepElementBtn = document.getElementById("autoCompCepBtn");
  if (
    cepElement instanceof HTMLInputElement &&
    cepElementBtn instanceof HTMLButtonElement
  ) {
    cepElement.addEventListener("input", () => AGModel.formatCEP(cepElement));
    cepElement.addEventListener("input", () => {
      if (!AGHandlers.enableCEPBtn(cepElementBtn, cepElement.value.length)) {
        cepElementBtn.addEventListener("click", () =>
          AGHandlers.searchCEPXML(cepElement)
        );
      }
    });
  } else
    ErrorHandler.multipleElementsNotFound(
      extLine(new Error()),
      "Elements for CEP input",
      cepElement,
      cepElementBtn
    );
}
export function addListenersQxPrinc() {
  const qxPrinc = document.getElementById("qxPrinc");
  if (qxPrinc instanceof HTMLTextAreaElement) {
    qxPrinc.addEventListener("click", () => AGModel.addDblQuotes(qxPrinc));
    qxPrinc.addEventListener("input", () => AGModel.addDblQuotes(qxPrinc));
  } else ErrorHandler.elementNotFound(qxPrinc, "qxPrinc", extLine(new Error()));
}
if (JSONBtn instanceof HTMLButtonElement && allInputs.length > 0) {
  let formDescription = [];
  JSONBtn.addEventListener("click", () => {
    formDescription = GlobalHandler.getJSONDesc(allInputs);
    const JSONInpsStoreStringified = (formDescription &&
      formDescription[1]) ?? [""];
    if (
      formDescription &&
      formDescription.length === 4 &&
      !formDescription.some((formDescElement) => formDescElement === null)
    ) {
      JSONLink = GlobalHandler.createJSONAnchor(
        JSONBtn,
        JSONInpsStoreStringified
      );
      JSONLink
        ? JSONLink.addEventListener("click", () => {
            GlobalHandler.regenerateJSONBtn(JSONLink, JSONInpsStoreStringified);
          })
        : ErrorHandler.elementNotFound(
            JSONLink,
            "JSONLink",
            extLine(new Error())
          );
    } else console.warn(`Erro obtendo formDescription`);
  });
} else {
  ErrorHandler.elementNotFound(JSONBtn, "JSONBtn", extLine(new Error()));
  ErrorHandler.elementNotPopulated(
    allInputs,
    "allInputs",
    extLine(new Error())
  );
}
export function addExportListener() {
  document.getElementById("btnExport")?.addEventListener("click", async () => {
    try {
      const allEntryEls = [
        ...document.querySelectorAll("input"),
        ...document.querySelectorAll("textarea"),
        ...document.querySelectorAll("select"),
      ];
      const arrValues = [];
      const arrTitles = [];

      for (const el of allEntryEls) {
        if (
          el instanceof HTMLInputElement &&
          (el.type === "checkbox" || el.type === "radio")
        ) {
          el.checked ? arrValues.push("sim") : arrValues.push("nao");
        } else arrValues.push(el.value || "nulo");
        arrTitles.push(el.dataset?.title || "sem_titulo");
      }

      const editableCite = document.getElementById("citeNameId");
      arrValues.push(editableCite?.textContent || "nulo");
      arrTitles.push(editableCite?.dataset?.title || "sem_titulo");

      while (arrValues.length > arrTitles.length) arrTitles.push("sem_titulo");
      while (arrTitles.length > arrValues.length) arrValues.push("nulo");

      if (arrValues.length === arrTitles.length) {
        const dataJSON = [];
        const wb = XLSX.utils.book_new();

        for (let i = 0; i < arrValues.length; i++)
          dataJSON.push({ c1: arrTitles[i], c2: arrValues[i] });

        XLSX.utils.book_append_sheet(
          wb,
          XLSX.utils.json_to_sheet(dataJSON),
          "Sheet1"
        );
        XLSX.writeFile(wb, "data_agForm.xlsx");

        console.log("Spreadsheet generated.");
      } else throw new Error(`Error validating length of data arrays`);
    } catch (error) {
      console.error("Error generating spreadsheet:", error);
    }
  });
}
//chamadas
genElement.value = addListenersGenConts(genElement, genValue);
addListenerTelInputs();
addListenersEmailInputs();
addListenerAntFamChecks();
// blockCount =
addListenerAntMedContainer(blockCount);
addListenersCepElements();
GlobalHandler.deactTextInput(
  document.querySelectorAll('input[type="number"][id$=NumId]'),
  document.querySelectorAll("input[id$=NullId]")
);
addListenersQxPrinc();
addExportListener();
// // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// // let shouldRegenerateBtn = false;
// // const handleMutation = (mutationsList, observer) => {
// //   for (const mutation of mutationsList) {
// //     if (mutation.type === "childList") {
// //       // Verifica se o JSONBtn foi removido e o JSONLink foi adicionado
// //       const JSONBtnRemoved = mutation.removedNodes[0] === JSONBtn;
// //       const JSONLinkAdded = Array.from(mutation.addedNodes).some(
// //         (node) => node === JSONLink
// //       );
// //       if (JSONBtnRemoved && JSONLinkAdded) {
// //         // Lógica a ser executada quando a troca ocorrer
// //         console.log("JSONBtn foi removido, e JSONLink foi adicionado.");
// //         // Adicione aqui qualquer lógica ou evento adicional que você deseja executar
// //       }
// //     }
// //   }
// // };
// // // Função que será chamada quando houver uma mutação no DOM
// // // Cria um novo observador de mutação com a função de callback
// // const observer = new MutationObserver(handleMutation);
// // // Configura o observador para observar mudanças no nó pai (por exemplo, o body)
// // observer.observe(document.body, { childList: true, subtree: true });
