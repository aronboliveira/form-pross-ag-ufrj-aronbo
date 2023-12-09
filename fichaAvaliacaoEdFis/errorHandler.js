export function elementNotFound(element, elementName) {
  if (!element) {
    element = "null";
  }
  if (!elementName) {
    elementName = "null";
  }
  console.error(`Erro validando instância de ${
    element.id || elementName || "null"
  }.
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "null"
  }.`);
}

export function inputNotFound(element, elementName) {
  if (!element) {
    element = "null";
  }
  if (!elementName) {
    elementName = "null";
  }
  console.error(`Erro validando ${element.id || elementName || "null"}.
  Elemento obtido: ${element ?? "null"};
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "null"
  };
  Tipo obtido (válido somente para <input>): ${element.type || "null"}.`);
}

export function elementWithArrayError(context, array, element) {
  console.error(`Erro validando ${context}.
  rowsDC obtido: ${JSON.stringify(array) ?? "null"};
  Instância de sumDCBtn obtido: ${
    Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
  }.`);
}

export function elementWithObjectError(context, object, element) {
  console.error(
    `Erro ${context}. Elemento: ${object}; instância: ${
      object?.constructor.name ?? "undefined"
    }
    gordCorpLvl: instância obtida: ${
      Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
    }`
  );
}

export function elementNotPopulated(array, arrayName) {
  if (!array) {
    array = "null";
  }
  if (!arrayName) {
    arrayName = "null";
  }
  console.error(`Erro validando ${arrayName || "null"}.
  Array: ${Array.isArray(array)};
  List ou Collection: ${
    Object.prototype.toString.call(array)?.slice(8, -1) || "null"
  };
  Length obtida: ${array?.length || "0"};
  Stringificação: ${JSON.stringify(array) ?? "null"}`);
}

export function multipleElementsNotFound(context, ...elements) {
  if (!context || context === "") {
    context = "null";
  }
  let errorMessage = `Erro validando ${context || "null"}.`;
  let mappedNullElements = elements.map((element) =>
    element === null || element === undefined ? "null" : element
  );

  mappedNullElements.forEach((element) => {
    errorMessage += `Instância de ${element.id || "null"} obtida: ${
      Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
    };\n`;
  });

  console.error(errorMessage);
}

export function elementsNotFoundFunction(funcName, ...elements) {
  let errorMessage = `Erro validando instância obtida para ${
    funcName || "null"
  }`;

  let mappedNullElements = elements.map((element) =>
    element === null || element === undefined ? "null" : element
  );

  mappedNullElements.forEach((element) => {
    errorMessage += `Instância de ${element.id || "null"} obtida: ${
      Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
    };\n`;
  });

  console.error(errorMessage);
}

export function maxNumberError(unvalidNumber, title) {
  if (!unvalidNumber) {
    unvalidNumber = "0";
  }
  if (typeof unvalidNumber === "number") {
    unvalidNumber = unvalidNumber.toString();
  }
  console.error(`Número de ${title || "null"} inválidos.
  Número máximo obtido: ${parseInt(unvalidNumber, 10) || 0}`);
}

export function stringError(context, text) {
  console.error(`Erro ${context}.
  Valor obtido: ${text ?? "null"}`);
}

export function matchError(context, element, text) {
  console.error(`Erro validando ${context || "null"}.
  Elemento obtido: ${element || "null"};
  Título obtido: ${text || "null"}.`);
}

export function typeError(context, element, acceptedType) {
  console.error(`Tipo primitivo obtido para ${context || "null"} incorreto.
  Tipo obtido: ${typeof element ?? "undefined"};
  Tipo aceito: ${acceptedType || "null"}`);
}

export function objectError(context, object, maxPropertiesNumber) {
  console.error(`Erro validando person para ${context || "null"}.
  Objecto obtido: ${JSON.stringify(object) ?? "null"};
  Número obtido de propriedades: ${Object.keys.length ?? 0}; Número aceito: ${
    maxPropertiesNumber ?? 0
  }`);
}
