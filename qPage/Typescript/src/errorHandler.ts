import type {
  primitiveType,
  targStr,
  errorHandleNumberType,
  errorHandleTextType,
  errorHandleElType,
  errorHandleArrayType,
  errorHandleSpreadType,
  errorHandleObjectType,
} from "./types";

export function elementNotFound(
  element: errorHandleElType,
  elementName: errorHandleTextType,
  line: targStr
) {
  if (!element) {
    element = "Undefined Element";
  }
  if (!elementName) {
    elementName = "Unnamed Element";
  }
  if (
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLOptionElement
  ) {
    console.error(`
  ELEMENT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando instância de ${
    (element as Element)?.id || elementName || "UNDEFINED ID OR NAME"
  }.
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "null"
  };
  .value obtido: ${element?.value ?? "NULL"}.`);
  } else {
    console.error(`
  ELEMENT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando instância de ${
    (element as Element)?.id || elementName || "null"
  }.
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "null"
  }.`);
  }
}

export function inputNotFound(
  element: errorHandleElType,
  elementName: errorHandleTextType,
  line: targStr
) {
  if (!element) {
    element = "Undefined Element";
  }
  if (!elementName) {
    elementName = "Unnamed Element";
  }
  console.error(`INPUT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${
    (element as Element)?.id || elementName || "UNDEFINED ID OR NAME"
  }.
  Elemento obtido: ${element ?? "null"};
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "null"
  };
  Tipo obtido (válido somente para <input>): ${
    (element as HTMLInputElement)?.type || "null"
  };
  .value obtido: ${(element as HTMLInputElement)?.value || "NULL"};
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
  console.error(`ELEMENT WITH ARRAY ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${context}.
  ${elementName ?? "Unnamed Element"} obtido: ${
    JSON.stringify(array) ?? "null"
  };
  Instância de ${arrayName ?? "Unnamed Array"} obtido: ${
    Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
  }.`);
}

export function elementWithObjectError(
  context: errorHandleTextType,
  object: errorHandleObjectType,
  element: errorHandleElType,
  elementName: errorHandleTextType,
  line: targStr
) {
  console.error(
    `ELEMENT WITH OBJECT ERROR, LINE ${line ?? "UNDEFINED"}:
    Erro ${context ?? "Undefined Context"}. Elemento: ${JSON.stringify(
      object
    )}; instância: ${object?.constructor.name ?? "undefined"}
    ${elementName ?? "Unnamed Element"}: instância obtida: ${
      Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
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
    arrayName = "Unnamed Array";
  }
  console.error(`ELEMENT POPULATION ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${arrayName || "null"}.
  Array: ${Array.isArray(array)};
  List ou Collection: ${
    Object.prototype.toString.call(array)?.slice(8, -1) || "null"
  };
  Length obtida: ${array?.length || "0"};
  Stringificação: ${JSON.stringify(array) ?? "null"}`);
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
  Erro validando ${context || "null"}.`;
  let mappedNullElements = elements.map((element) =>
    element === null || element === undefined ? "null" : element
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
        errorMessage += `Instância de ${element.id || "null"} obtida: ${
          Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
        };\n
        .checked obtido: ${element?.checked || "NULL"}`;
      } else {
        errorMessage += `Instância de ${element.id || "null"} obtida: ${
          Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
        };\n
        .value obtido: ${element?.value || "NULL"}`;
      }
    } else {
      errorMessage += `Instância de ${
        (element as Element)?.id || "null"
      } obtida: ${
        Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
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
  Erro validando instância obtida para ${
    funcName || "Undefined Function Name"
  }`;

  let mappedNullElements = elements.map((element) =>
    element === null || element === undefined ? "null" : element
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
        errorMessage += `Instância de ${element.id || "null"} obtida: ${
          Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
        };\n
        .checked obtido: ${element?.checked || "NULL"}`;
      } else {
        errorMessage += `Instância de ${element.id || "null"} obtida: ${
          Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
        };\n
        .value obtido: ${element?.value || "NULL"}`;
      }
    } else {
      errorMessage += `Instância de ${
        (element as Element)?.id || "null"
      } obtida: ${
        Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
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
  Número máximo obtido: ${parseInt(unvalidNumber as string, 10) || 0}`);
}

export function stringError(
  context: errorHandleTextType,
  text: errorHandleTextType,
  line: targStr
) {
  console.error(`STRING ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro ${context}.
  Valor obtido: ${text ?? "null"}`);
}

export function matchError(
  context: errorHandleTextType,
  element: errorHandleElType,
  text: errorHandleTextType,
  line: targStr
) {
  console.error(`MATCH ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${context || "Undefined Context"}.
  Elemento obtido: ${element || "Undefined Element"};
  Título obtido: ${text || "Undefined Title"}.`);
}

export function typeError(
  context: errorHandleTextType,
  element: primitiveType,
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
  line: targStr
) {
  console.error(`OBJECT ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${objectName ?? "UNDEFINED OBJECT NAME"} para ${
    context || "Undefined Context"
  }.
  Objecto obtido: ${JSON.stringify(object) ?? "Undefined Object"};
  Número obtido de propriedades: ${
    Object.keys(object as object).length ?? 0
  }; Número aceito: ${maxPropertiesNumber ?? 0}`);
}
