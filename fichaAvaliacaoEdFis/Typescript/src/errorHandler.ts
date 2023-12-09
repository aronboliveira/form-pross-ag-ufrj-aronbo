type primitiveType = number | string | boolean | null | undefined;
type errorHandleNumberType = string | number | null | undefined;
type errorHandleElType = Element | string | null | undefined;
type errorHandleTextType = string | null | undefined;
type errorHandleArrayType =
  | any[]
  | NodeList
  | HTMLCollection
  | string
  | null
  | undefined;
type errorHandleSpreadType = (Element | null | undefined)[];
type errorHandleObjectType = object | null | undefined;

export function elementNotFound(
  element: errorHandleElType,
  elementName: errorHandleTextType
) {
  if (!element) {
    element = "null";
  }
  if (!elementName) {
    elementName = "null";
  }
  console.error(`Erro validando instância de ${
    (element as Element).id || elementName || "null"
  }.
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "null"
  }.`);
}

export function inputNotFound(
  element: errorHandleElType,
  elementName: errorHandleTextType
) {
  if (!element) {
    element = "null";
  }
  if (!elementName) {
    elementName = "null";
  }
  console.error(`Erro validando ${
    (element as Element).id || elementName || "null"
  }.
  Elemento obtido: ${element ?? "null"};
  Instância obtida: ${
    Object.prototype.toString.call(element)?.slice(8, -1) || "null"
  };
  Tipo obtido (válido somente para <input>): ${
    (element as HTMLInputElement).type || "null"
  }.`);
}

export function elementWithArrayError(
  context: errorHandleTextType,
  array: errorHandleArrayType,
  element: errorHandleElType
) {
  console.error(`Erro validando ${context}.
  rowsDC obtido: ${JSON.stringify(array) ?? "null"};
  Instância de sumDCBtn obtido: ${
    Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
  }.`);
}

export function elementWithObjectError(
  context: errorHandleTextType,
  object: errorHandleObjectType,
  element: errorHandleElType
) {
  console.error(
    `Erro ${context}. Elemento: ${object}; instância: ${
      object?.constructor.name ?? "undefined"
    }
    gordCorpLvl: instância obtida: ${
      Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
    }`
  );
}

export function elementNotPopulated(
  array: errorHandleArrayType,
  arrayName: errorHandleTextType
) {
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

export function multipleElementsNotFound(
  context: errorHandleTextType,
  ...elements: errorHandleSpreadType
) {
  if (!context || context === "") {
    context = "null";
  }
  let errorMessage = `Erro validando ${context || "null"}.`;
  let mappedNullElements = elements.map((element) =>
    element === null || element === undefined ? "null" : element
  );

  mappedNullElements.forEach((element) => {
    errorMessage += `Instância de ${
      (element as Element).id || "null"
    } obtida: ${
      Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
    };\n`;
  });

  console.error(errorMessage);
}

export function elementsNotFoundFunction(
  funcName: errorHandleTextType,
  ...elements: errorHandleSpreadType
) {
  let errorMessage = `Erro validando instância obtida para ${
    funcName || "null"
  }`;

  let mappedNullElements = elements.map((element) =>
    element === null || element === undefined ? "null" : element
  );

  mappedNullElements.forEach((element) => {
    errorMessage += `Instância de ${
      (element as HTMLElement).id || "null"
    } obtida: ${
      Object.prototype.toString.call(element)?.slice(8, -1) ?? "null"
    };\n`;
  });

  console.error(errorMessage);
}

export function maxNumberError(
  unvalidNumber: errorHandleNumberType,
  title: errorHandleTextType
) {
  if (!unvalidNumber) {
    unvalidNumber = "0";
  }
  if (typeof unvalidNumber === "number") {
    unvalidNumber = unvalidNumber.toString();
  }
  console.error(`Número de ${title || "null"} inválidos.
  Número máximo obtido: ${parseInt(unvalidNumber as string, 10) || 0}`);
}

export function stringError(
  context: errorHandleTextType,
  text: errorHandleTextType
) {
  console.error(`Erro ${context}.
  Valor obtido: ${text ?? "null"}`);
}

export function matchError(
  context: errorHandleTextType,
  element: errorHandleElType,
  text: errorHandleTextType
) {
  console.error(`Erro validando ${context || "null"}.
  Elemento obtido: ${element || "null"};
  Título obtido: ${text || "null"}.`);
}

export function typeError(
  context: errorHandleTextType,
  element: primitiveType,
  acceptedType: errorHandleTextType
) {
  console.error(`Tipo primitivo obtido para ${context || "null"} incorreto.
  Tipo obtido: ${typeof element ?? "undefined"};
  Tipo aceito: ${acceptedType || "null"}`);
}

export function objectError(
  context: errorHandleTextType,
  object: errorHandleObjectType,
  maxPropertiesNumber: errorHandleNumberType
) {
  console.error(`Erro validando person para ${context || "null"}.
  Objecto obtido: ${JSON.stringify(object) ?? "null"};
  Número obtido de propriedades: ${
    Object.keys(object as object).length ?? 0
  }; Número aceito: ${maxPropertiesNumber ?? 0}`);
}
