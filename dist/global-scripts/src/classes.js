// import React from "react";
export class JSONStorager {
    #id;
    #value;
    constructor(id = "", value = "") {
        this.#id = id;
        this.#value = value;
        Object.freeze(this);
    }
    get showInpId() {
        return this.#id;
    }
    get showInpValue() {
        return this.#value;
    }
    get showAllInfo() {
        return [this.#id, this.#value];
    }
}
export class JSONTitleStorager {
    #title;
    constructor(title = null) {
        this.#title = title;
        Object.freeze(this);
    }
    get showInpTitle() {
        return this.#title;
    }
}
export class Person {
    gen;
    age;
    weight;
    height;
    sumDCut;
    atvLvl;
    constructor(gen = "masculino", age = 0, weight = 0, height = 0, sumDCut = 0, atvLvl = "leve") {
        this.gen = gen;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.sumDCut = sumDCut;
        this.atvLvl = atvLvl;
    }
    checkAtvLvl(personInfo) {
        if (((personInfo instanceof Man ||
            personInfo instanceof Woman ||
            personInfo instanceof Woman ||
            personInfo instanceof Person) &&
            "atvLvl" in personInfo &&
            this.atvLvl !== "") ||
            typeof personInfo === "string") {
            if (typeof personInfo === "string")
                this.atvLvl = personInfo;
            switch (this.atvLvl) {
                case "sedentario":
                    return 1.2;
                case "leve":
                    return 1.4;
                case "moderado":
                    return 1.6;
                case "intenso":
                    return 1.9;
                case "muitoIntenso":
                    return 2.2;
                default:
                    console.error(`Erro validando caso. Caso obtido: ${this.atvLvl ?? "null"}; Casos possíveis: sedentário || leve || moderado || intenso || muitoIntenso`);
            }
        }
        else {
            console.error(`Erro validando instância de pessoa. Valor obtido: ${personInfo ?? "null"}; instância ${Object.prototype.toString.call(personInfo).slice(8, -1) ?? "null"}; Valor de Nível de Atividade Física obtido: ${this.atvLvl ?? "null"}`);
            return 0;
        }
        return 0;
    }
    calcIMC(personInfo) {
        try {
            if (((personInfo instanceof Man ||
                personInfo instanceof Woman ||
                personInfo instanceof Woman ||
                personInfo instanceof Person) &&
                "weight" in personInfo &&
                typeof this.weight === "number" &&
                this.weight > 0 &&
                "height" in this &&
                typeof this.height === "number" &&
                this.height > 0) ||
                (Array.isArray(personInfo) &&
                    typeof personInfo[0] === "number" &&
                    typeof personInfo[1] === "number")) {
                if (Array.isArray(personInfo)) {
                    [this.weight, this.height] = personInfo;
                }
                const IMC = this.weight / this.height ** 2;
                if (IMC && IMC > 0) {
                    const MLG = this.weight - this.weight * (IMC / 100) ?? 0;
                    if (IMC < 18.5)
                        return ["abaixo", IMC, MLG];
                    else if (IMC >= 18.5 && IMC < 25.0)
                        return ["eutrofico", IMC, MLG];
                    else if (IMC >= 25.0 && IMC < 30)
                        return ["sobrepeso", IMC, MLG];
                    else if (IMC >= 30 && IMC < 35)
                        return ["obeso1", IMC, MLG];
                    else if (IMC >= 35 && IMC < 40)
                        return ["obeso2", IMC, MLG];
                    else if (IMC > 40)
                        return ["obeso3", IMC, MLG];
                    else
                        throw new Error(`Erro classificando IMC. Valor obtido: ${IMC ?? 0}; Valores possíveis devem ser positivos`);
                }
                else
                    throw new Error(`Erro calculando IMC. Valores usados: Peso ${this.weight ?? 0} e Altura ${this.height ?? 0}`);
            }
            else
                throw new Error(`Erro validando dados fornecidos. Elemento pessoa: ${Object.prototype.toString.call(personInfo).slice(8, -1) ?? "null"}; weight presente: ${"weight" in personInfo ?? false};
          Peso obtido: ${this.weight ?? 0};
          height presente: ${"height" in personInfo ?? false};
          Altura obtida: ${this.height ?? 0}`);
        }
        catch (IMCError) {
            console.error(IMCError.message);
        }
        return ["", 0, 0];
    }
    calcPGC(person) {
        if ((person instanceof Man ||
            person instanceof Woman ||
            person instanceof Woman ||
            person instanceof Person) &&
            "sumDCut" in person &&
            typeof this.sumDCut === "number" &&
            this.sumDCut >= 0) {
            if (person instanceof Man) {
                let DC = 1.10938 -
                    0.0008267 * this.sumDCut +
                    0.0000016 * this.sumDCut ** 2 -
                    0.0002574 * person.age;
                if (DC <= 0 || Number.isNaN(DC))
                    DC = 0.01;
                let PGC = 495 / DC - 450;
                if (PGC <= 0 || Number.isNaN(PGC))
                    PGC = 0.01;
                if (PGC > 100)
                    PGC = 100;
                return PGC;
            }
            else if (person instanceof Woman) {
                let DC = 1.0994921 -
                    0.0009929 * this.sumDCut +
                    0.0000023 * this.sumDCut ** 2 -
                    0.0001392 * person.age;
                if (DC <= 0 || Number.isNaN(DC))
                    DC = 0.01;
                let PGC = 495 / DC - 450;
                if (PGC <= 0 || Number.isNaN(PGC))
                    PGC = 0.01;
                if (PGC > 100)
                    PGC = 100;
                return PGC;
            }
            else if (person instanceof Neutro) {
                let DC = 1.10443605 -
                    0.0009098 * this.sumDCut +
                    0.00000195 * this.sumDCut ** 2 -
                    0.0001983 * person.age;
                if (DC <= 0 || Number.isNaN(DC))
                    DC = 0.01;
                let PGC = 495 / DC - 450;
                if (PGC <= 0 || Number.isNaN(PGC))
                    PGC = 0.01;
                if (PGC > 100)
                    PGC = 100;
                return PGC;
            }
            else
                console.error(`Instância de objeto inválida. Instância obtida: ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"}`);
            return 0;
        }
        else
            console.warn(`Erro validado Propriedade sumDCut:
      Está presente: ${"sumDCut" in person ?? false};
      Tipo primitivo de sumDCut: ${typeof this.sumDCut};
      Valor obtido: ${this.sumDCut ?? 0}`);
        return 0;
    }
    calcTMB(person, IMC = 0, MLG = 0, factorAtleta = "Peso") {
        if (factorAtleta === "peso")
            factorAtleta = "Peso";
        if (factorAtleta === "mlg")
            factorAtleta = "MLG";
        try {
            if ((person instanceof Man ||
                person instanceof Woman ||
                person instanceof Woman ||
                person instanceof Person) &&
                "atvLvl" in person &&
                this.atvLvl &&
                typeof this.atvLvl === "string" &&
                typeof IMC === "number" &&
                typeof MLG === "number" &&
                typeof factorAtleta === "string") {
                if (this.atvLvl === "muitoIntenso" &&
                    (factorAtleta === "MLG" || factorAtleta === "Peso")) {
                    if (factorAtleta === "MLG") {
                        if (MLG && MLG > 0)
                            return ["tinsley", 25.9 * MLG + 284];
                        else
                            throw new Error(`Erro validando MLG.
              Valor obtido: ${MLG ?? 0}`);
                    }
                    else if (factorAtleta === "Peso") {
                        if ("weight" in person && this.weight > 0)
                            return ["tinsley", 24.8 * this.weight + 10];
                        else
                            throw new Error(`Erro validando weight.
              Valor obtido: ${this.weight ?? 0}`);
                    }
                }
                else if (this.atvLvl === "sedentario" ||
                    this.atvLvl === "leve" ||
                    this.atvLvl === "moderado" ||
                    this.atvLvl === "intenso") {
                    if ("weight" in person &&
                        this.weight > 0 &&
                        "height" in person &&
                        this.height > 0 &&
                        "age" in person) {
                        if (IMC < 25.0 && IMC > 0) {
                            if (person instanceof Man)
                                return [
                                    "harrisBenedict",
                                    66 +
                                        (13.8 * this.weight + 5.0 * this.height - 6.8 * this.age),
                                ];
                            else if (person instanceof Woman)
                                return [
                                    "harrisBenedict",
                                    655 +
                                        (9.6 * this.weight + 1.9 * this.height - 4.7 * this.age),
                                ];
                            else if (person instanceof Neutro)
                                return [
                                    "harrisBenedict",
                                    360.5 +
                                        (11.7 * this.weight + 3.45 * this.height - 5.75 * this.age),
                                ];
                            else
                                throw new Error(`Erro validando instância de Person. Instância obtida: ${Object.prototype.toString.call(person).slice(8, -1) ??
                                    "null"}`);
                        }
                        else if (IMC >= 25.0) {
                            if (person instanceof Man)
                                return [
                                    "mifflinStJeor",
                                    10 * this.weight + 6.25 * this.height - 5.0 * this.age + 5,
                                ];
                            else if (person instanceof Woman)
                                return [
                                    "mifflinStJeor",
                                    10 * this.weight + 6.25 * this.height - 5.0 * this.age - 161,
                                ];
                            else if (person instanceof Neutro)
                                return [
                                    "mifflinStJeor",
                                    10 * this.weight + 6.25 * this.height - 5.0 * this.age - 78,
                                ];
                            else
                                throw new Error(`Erro validando instância de Person. Instância obtida: ${Object.prototype.toString
                                    .call(person)
                                    .slice(8, -1)}`);
                        }
                        else
                            throw new Error(`Erro validando IMC. IMC obtido: ${IMC ?? 0}; Valor deve ser númerico, positivo e float`);
                    }
                    else
                        throw new Error(`Erro validando propriedades de person.
            weight presente: ${"weight" in person ?? false};
            Valor de weight obtido: ${this.weight ?? 0};
            height presente: ${"height" in person ?? false};
            Valor de height obtido: ${this.height ?? 0};
            age presente: ${"age" in person ?? false};
            `);
                }
                else {
                    throw new Error(`Erro validando atvLvl e/ou factorAtleta.
            atvLvl obtido: ${this.atvLvl ?? "null"}
            Fator obtido: ${factorAtleta ?? "null"}; Fatores válidos: "MLG" || "Peso"`);
                }
            }
            else {
                throw new Error(`Erro validando person.
        Elemento: ${person ?? "null"};
        Instância: ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"};
        atvLvl presente: ${"atvLvl" in person ?? false};
        Valor de atvLvl obtido: ${this.atvLvl ?? "null"};
        Tipo primtiivo de .atvLvl: ${typeof this.atvLvl};
        Tipo primitivo de IMC: ${typeof IMC};
        Tipo primitivo de MLG: ${typeof MLG};
        Tipo primitivo de factorAtleta: ${typeof factorAtleta}.`);
            }
        }
        catch (TMBError) {
            console.error(TMBError.message);
        }
        return ["", 0];
    }
    calcGET(TMB = 0, factorAtvLvl = 1.4) {
        if (TMB && factorAtvLvl)
            return TMB * factorAtvLvl;
        else
            console.error(`Erro validando argumentos.
      TMB obtido: ${TMB ?? 0};
      factorAtvLvl obtido: ${factorAtvLvl ?? 0}`);
        return 0;
    }
    static clonePerson(person) {
        if ((person instanceof Man ||
            person instanceof Woman ||
            person instanceof Woman ||
            person instanceof Person) &&
            "gen" in person &&
            typeof person.gen === "string") {
            switch (person.gen) {
                case "masculino":
                    return new Man(person.gen, person.age, person.weight, person.height, person.sumDCut, person.atvLvl);
                case "feminino":
                    return new Woman(person.gen, person.age, person.weight, person.height, person.sumDCut, person.atvLvl);
                case "neutro":
                    return new Neutro(person.gen, person.age, person.weight, person.height, person.sumDCut, person.atvLvl);
                default:
                    console.error(`Erro validando .gen de person passada para .clonePerson()
          .gen obtido: ${person?.gen ?? "null"}.`);
            }
        }
        else
            console.error(`Erro validando person.
      Objeto obtido: ${Object.prototype.toString.call(person).slice(8, -1) ?? "null"};
      .gen presente: ${"gen" in person ?? false};
      Tipo primitivo de .gen: ${typeof person.gen}`);
        return person;
    }
}
export class Man extends Person {
}
export class Woman extends Person {
}
export class Neutro extends Person {
}
