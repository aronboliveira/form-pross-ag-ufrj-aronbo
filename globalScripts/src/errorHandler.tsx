"use strict";
import type {
  targStr,
  textEl,
  errorHandleNumberType,
  errorHandleTextType,
  errorHandleElType,
  errorHandleArrayType,
  errorHandleSpreadType,
  errorHandleObjectType,
  entryEl,
  primitiveType,
} from "./types";
// import React from "react";

export function elementNotFound(
  element: errorHandleElType,
  elementName: errorHandleTextType,
  line: targStr
) {
  if (!element) {
    element = "UNDEFINED ELEMENT";
  }
  if (!elementName) {
    elementName = "UNNAMED ELEMENT";
  }
  if (
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLOptionElement
  ) {
    console.error(`
  ELEMENT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando instância de ${
    (element as HTMLElement)?.id || elementName || "NULL"
  }.
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "NULL"
  };
  .value obtido: ${(element as textEl)?.value ?? "NULL"}.`);
  } else {
    console.error(`
  ELEMENT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando instância de ${
    (element as HTMLElement)?.id || elementName || "UNDEFINED ID OR NAME"
  }.
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "NULL"
  }.`);
  }
}

export function inputNotFound(
  element: errorHandleElType,
  elementName: errorHandleTextType,
  line: targStr
) {
  if (!element) {
    element = "UNDEFINED ELEMENT";
  }
  if (!elementName) {
    elementName = "UNNAMED ELEMENT";
  }
  console.error(`INPUT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${
    (element as HTMLElement)?.id || elementName || "UNDEFINED ID OR NAME"
  }.
  Elemento obtido: ${element ?? "NULL"};
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "NULL"
  };
  Tipo obtido (válido somente para <input>): ${
    (element as HTMLInputElement)?.type || "NULL"
  };
  .value obtido: ${(element as textEl)?.value || "NULL"};
  .checked obitod: ${(element as HTMLInputElement)?.checked || "NULL"}.`);
}

export function elementWithArrayError(
  context: errorHandleTextType,
  array: errorHandleArrayType,
  arrayName: errorHandleTextType,
  element: errorHandleElType,
  elementName: errorHandleTextType,
  line: targStr
) {
  if (!element) {
    element = "UNDEFINED ELEMENT";
  }
  if (!elementName) {
    elementName = "UNNAMED ELEMENT";
  }
  console.error(`ELEMENT WITH ARRAY ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${context}.
  ${elementName ?? "UNNAMED ELEMENT"} obtido: ${
    JSON.stringify(array) ?? "NULL"
  };
  Instância de ${arrayName ?? "UNNAMED ARRAY"} obtido: ${
    Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"
  }.`);
}

export function elementWithObjectError(
  context: errorHandleTextType,
  object: errorHandleObjectType,
  element: errorHandleElType,
  elementName: errorHandleTextType,
  line: targStr
) {
  if (!element) {
    element = "UNDEFINED ELEMENT";
  }
  if (!elementName) {
    elementName = "UNNAMED ELEMENT";
  }
  console.error(
    `ELEMENT WITH OBJECT ERROR, LINE ${line ?? "UNDEFINED"}:
    Erro ${context ?? "Undefined Context"}. Elemento: ${JSON.stringify(
      object
    )}; instância: ${object?.constructor.name ?? "NULL"}
    ${elementName ?? "UNNAMED ELEMENT"}: instância obtida: ${
      Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"
    }`
  );
}

export function elementNotPopulated(
  array: errorHandleArrayType,
  arrayName: errorHandleTextType,
  line: targStr
) {
  if (!array) {
    array = "Undefined Array";
  }
  if (!arrayName) {
    arrayName = "UNNAMED ARRAY";
  }
  console.error(`ELEMENT POPULATION ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${arrayName || "NULL"}.
  Array: ${Array.isArray(array)};
  List ou Collection: ${
    Object.prototype.toString.call(array)?.slice(8, -1) || "NULL"
  };
  Length obtida: ${array?.length || "0"};
  Stringificação: ${JSON.stringify(array) ?? "NULL"}`);
}

export function multipleElementsNotFound(
  line: targStr,
  context: errorHandleTextType,
  ...elements: errorHandleSpreadType
) {
  if (!context || context === "") {
    context = "Undefined Context";
  }
  let errorMessage = `MULTIPLE ELEMENTS NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${context || "Undefined Function Name"}.`;
  const mappedNullElements = elements.map((element) =>
    element === null || element === undefined ? "NULL" : element
  );

  mappedNullElements.forEach((element) => {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLOptionElement
    ) {
      if (
        element instanceof HTMLInputElement &&
        (element.type === "radio" || element.type === "checkbox")
      ) {
        errorMessage += `Instância de ${element.id || "NULL"} obtida: ${
          Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"
        };\n
        .checked obtido: ${(element as HTMLInputElement)?.checked || "NULL"}`;
      } else {
        errorMessage += `Instância de ${element.id || "NULL"} obtida: ${
          Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"
        };\n
        .value obtido: ${(element as textEl)?.value || "NULL"}`;
      }
    } else {
      errorMessage += `Instância de ${
        (element as entryEl).id || "NULL"
      } obtida: ${
        Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"
      };\n`;
    }
  });

  console.error(errorMessage);
}

export function elementsNotFoundFunction(
  line: targStr,
  funcName: errorHandleTextType,
  ...elements: errorHandleSpreadType
) {
  let errorMessage = `ELEMENTS NOT FOUND FOR FUNCTION, LINE ${
    line ?? "UNDEFINED"
  }:
  Erro validando instância obtida para ${funcName || "NULL"}`;

  const mappedNullElements = elements.map((element) =>
    element === null || element === undefined ? "NULL" : element
  );

  mappedNullElements.forEach((element) => {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLOptionElement
    ) {
      if (
        element instanceof HTMLInputElement &&
        (element.type === "radio" || element.type === "checkbox")
      ) {
        errorMessage += `Instância de ${element.id || "NULL"} obtida: ${
          Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"
        };\n
        .checked obtido: ${(element as HTMLInputElement)?.checked || "NULL"}`;
      } else {
        errorMessage += `Instância de ${element.id || "NULL"} obtida: ${
          Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"
        };\n
        .value obtido: ${(element as textEl)?.value || "NULL"}`;
      }
    } else {
      errorMessage += `Instância de ${
        (element as HTMLElement)?.id || "NULL"
      } obtida: ${
        Object.prototype.toString.call(element)?.slice(8, -1) ?? "NULL"
      };\n`;
    }
  });

  console.error(errorMessage);
}

export function maxNumberError(
  unvalidNumber: errorHandleNumberType,
  title: errorHandleTextType,
  line: targStr
) {
  if (!unvalidNumber) {
    unvalidNumber = "0";
  }
  if (typeof unvalidNumber === "number") {
    unvalidNumber = unvalidNumber.toString();
  }
  console.error(`MAX NUMBER ERROR, LINE ${line ?? "UNDEFINED"}:
  Número de ${title || "Undefined Title"} inválidos.
  Número máximo obtido: ${parseInt(unvalidNumber, 10) || 0}`);
}

export function stringError(
  context: errorHandleTextType,
  text: errorHandleTextType,
  line: targStr
) {
  console.error(`STRING ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro ${context}.
  Valor obtido: ${text ?? "NULL"}`);
}

export function matchError(
  context: errorHandleTextType,
  element: errorHandleElType,
  text: errorHandleTextType,
  line: targStr
) {
  console.error(`MATCH ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${context || "Undefined Context"}.
  Elemento obtido: ${element || "UNDEFINED ELEMENT"};
  Título obtido: ${text || "Undefined Title"}.`);
}

export function typeError(
  context: errorHandleTextType,
  element: primitiveType | Element,
  acceptedType: errorHandleTextType,
  line: targStr
) {
  console.error(`TYPE ERROR, LINE ${line ?? "UNDEFINED"}:
  Tipo primitivo obtido para ${context || "Undefined Context"} incorreto.
  Tipo obtido: ${typeof element ?? "Undefined typeof"};
  Tipo aceito: ${acceptedType || "Undefined Accepted Type"}`);
}

export function objectError(
  context: errorHandleTextType,
  object: errorHandleObjectType,
  objectName: targStr,
  maxPropertiesNumber: errorHandleNumberType,
  line: errorHandleTextType
) {
  console.error(`OBJECT ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${objectName ?? "UNDEFINED OBJECT NAME"} para ${
    context || "Undefined Context"
  }.
  Objecto obtido: ${JSON.stringify(object) ?? "Undefined Object"};
  Número obtido de propriedades: ${Object.keys.length ?? 0}; Número aceito: ${
    maxPropertiesNumber ?? 0
  }`);
}
