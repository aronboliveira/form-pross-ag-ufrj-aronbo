// "use strict";
// import * as AGModel from "./aGModel.js";
// import * as AGHandler from "./aGhandlers.js";
// import * as ErrorHandler from "../../../globalScripts/Typescript/src/errorHandler.js";
// import * as AGStyleHandler from "./styleHandler.js";
// import {
//   Man,
//   Woman,
//   Neutro,
//   JSONStorager,
//   JSONTitleStorager,
// } from "../../../globalScripts/Typescript/src/classes.js";
// import type {
//   looseNum,
//   targStr,
//   targNum,
//   targStrArr,
//   targEl,
//   arrTargEl,
//   HTMLTargEl,
//   entryEl,
//   textEl,
//   formPerson,
//   formClassPerson,
// } from "../../../globalScripts/Typescript/src/types.js";

// const tipBtns = Array.from(document.getElementsByClassName("tipBtn"));

// if (tipBtns.length > 0) {
//   tipBtns.forEach((tipBtn) => {
//     if (tipBtn instanceof HTMLButtonElement) {
//       tipBtn.addEventListener("click", () =>
//         AGStyleHandler.showInHidTip(tipBtn)
//       );
//     } else {
//       const error = new Error();
//       const splitError = (error.stack as string)?.split("\n");
//       const slicedError = splitError[1].trim().slice(-7, -1);
//       ErrorHandler.elementNotFound(
//         tipBtn ?? null,
//         "Tip Button",
//         slicedError ?? "NULL"
//       );
//     }
//   });
// } else {
//   const error = new Error();
//   const splitError = (error.stack as string)?.split("\n");
//   const slicedError = splitError[1].trim().slice(-7, -1);
//   ErrorHandler.elementNotPopulated(
//     tipBtns ?? null,
//     "tipBtns",
//     slicedError ?? "NULL"
//   );
// }
