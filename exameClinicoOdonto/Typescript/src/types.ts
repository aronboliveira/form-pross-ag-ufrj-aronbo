export type looseNum = string | number;
export type primitiveType = string | number | boolean | null | undefined;
export type targNum = number | null | undefined;
export type targStr = string | null | undefined;
export type targStrArr = string[] | null | undefined;
export type targEl = Element | null | undefined;
export type HTMLTargEl = HTMLElement | null;
export type entryEl =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
export type textEl = HTMLInputElement | HTMLTextAreaElement;
export type arrTargEl = targEl[];
// export type formPerson = Man | Woman | Neutro | UndefinedPerson;
// export type formClassPerson = Man | Woman | Neutro;
export type targMatchText = RegExpMatchArray | string | null;
export type errorHandleNumberType = string | number | null | undefined;
export type errorHandleTextType = string | null | undefined;
export type errorHandleElType = Element | string | null | undefined;
export type errorHandleArrayType =
  | any[]
  | NodeList
  | HTMLCollection
  | string
  | null
  | undefined;
export type errorHandleSpreadType = (Element | null | undefined)[];
export type errorHandleObjectType = object | null | undefined;
export type looseMatchText = RegExpMatchArray | string | null;
