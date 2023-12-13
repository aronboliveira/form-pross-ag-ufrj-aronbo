"use strict";
export function elementNotFound(element, elementName, line) {
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
  Erro validando instância de ${element?.id || elementName || "null"}.
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "null"
  };
  .value obtido: ${element?.value ?? "NULL"}.`);
  } else {
    console.error(`
  ELEMENT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando instância de ${
    element?.id || elementName || "UNDEFINED ID OR NAME"
  }.
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "null"
  }.`);
  }
}

export function inputNotFound(element, elementName, line) {
  if (!element) {
    element = "Undefined Element";
  }
  if (!elementName) {
    elementName = "Unnamed Element";
  }
  console.error(`INPUT NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${element?.id || elementName || "UNDEFINED ID OR NAME"}.
  Elemento obtido: ${element ?? "null"};
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "null"
  };
  Tipo obtido (válido somente para <input>): ${element?.type || "null"};
  .value obtido: ${element?.value || "NULL"};
  .checked obitod: ${element?.checked || "NULL"}.`);
}

export function elementWithArrayError(
  context,
  array,
  arrayName,
  element,
  elementName,
  line
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
  context,
  object,
  element,
  elementName,
  line
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

export function elementNotPopulated(array, arrayName, line) {
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

export function multipleElementsNotFound(line, context, ...elements) {
  if (!context || context === "") {
    context = "Undefined Context";
  }
  let errorMessage = `MULTIPLE ELEMENTS NOT FOUND, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${context || "Undefined Function Name"}.`;
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
      errorMessage += `Instância de ${element.id || "null"} obtida: ${
        Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
      };\n`;
    }
  });

  console.error(errorMessage);
}

export function elementsNotFoundFunction(line, funcName, ...elements) {
  let errorMessage = `ELEMENTS NOT FOUND FOR FUNCTION, LINE ${
    line ?? "UNDEFINED"
  }:
  Erro validando instância obtida para ${funcName || "null"}`;

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
      errorMessage += `Instância de ${element?.id || "null"} obtida: ${
        Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
      };\n`;
    }
  });

  console.error(errorMessage);
}

export function maxNumberError(unvalidNumber, title, line) {
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

export function stringError(context, text, line) {
  console.error(`STRING ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro ${context}.
  Valor obtido: ${text ?? "null"}`);
}

export function matchError(context, element, text, line) {
  console.error(`MATCH ERROR, LINE ${line ?? "UNDEFINED"}:
  Erro validando ${context || "Undefined Context"}.
  Elemento obtido: ${element || "Undefined Element"};
  Título obtido: ${text || "Undefined Title"}.`);
}

export function typeError(context, element, acceptedType, line) {
  console.error(`TYPE ERROR, LINE ${line ?? "UNDEFINED"}:
  Tipo primitivo obtido para ${context || "Undefined Context"} incorreto.
  Tipo obtido: ${typeof element ?? "Undefined typeof"};
  Tipo aceito: ${acceptedType || "Undefined Accepted Type"}`);
}

export function objectError(
  context,
  object,
  objectName,
  maxPropertiesNumber,
  line
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
