// "use strict";
// import * as AGModel from "./aGModel.js";
// import * as AGHandler from "./aGhandlers.js";
// import * as ErrorHandler from "../../../globalScripts/Typescript/src/errorHandler.js";
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

// export function showInHidTip(tipBtn: HTMLButtonElement) {
//   const dlgInBtn = tipBtn.querySelector("dialog");
//   if (dlgInBtn instanceof HTMLDialogElement) {
//     dlgInBtn.show();
//     setTimeout(() => {
//       dlgInBtn.close();
//     }, 5000);
//   } else {
//     const error = new Error();
//     const splitError = (error.stack as string)?.split("\n");
//     const slicedError = splitError[1].trim().slice(-7, -1);
//     ErrorHandler.elementNotFound(
//       dlgInBtn ?? null,
//       `Dialog related to ${
//         (tipBtn as HTMLButtonElement)?.id || "UNDEFINED ID TIP BUTTON"
//       }`,
//       slicedError ?? "NULL"
//     );
//   }
// }
