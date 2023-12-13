export class JSONStorager {
  #id;
  #value;
  constructor(id: string, value: string) {
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
  constructor(title: Element | string | null) {
    this.#title = title;
    Object.freeze(this);
  }
  get showInpTitle() {
    return this.#title;
  }
}

export interface UndefinedPerson {
  gen: string;
  age: number;
  sumDCut: number;
  weight: number;
  height: number;
  atvLvl: string;
}

export class Person implements UndefinedPerson {
  gen: string;
  age: number;
  weight: number;
  height: number;
  sumDCut: number;
  atvLvl: string;
  constructor(
    gen: string,
    age: number,
    weight: number,
    height: number,
    sumDCut: number,
    atvLvl: string
  ) {
    this.gen = gen;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.sumDCut = sumDCut;
    this.atvLvl = atvLvl;
  }

  checkAtvLvl(person: Person): number {
    if (person && "atvLvl" in person && this.atvLvl !== "") {
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
          console.error(
            `Erro validando caso. Caso obtido: ${
              this.atvLvl ?? "null"
            }; Casos possíveis: sedentário || leve || moderado || intenso || muitoIntenso`
          );
      }
    } else {
      console.error(
        `Erro validando instância de pessoa. Valor obtido: ${
          person ?? "null"
        }; instância ${
          Object.prototype.toString.call(person).slice(8, -1) ?? "null"
        }; Valor de Nível de Atividade Física obtido: ${this.atvLvl ?? "null"}`
      );
      return 0;
    }
    return 0;
  }

  calcIMC(person: Person): [string, number, number] | undefined | never {
    try {
      if (
        person &&
        "weight" in person &&
        this.weight > 0 &&
        "height" in person &&
        this.height > 0
      ) {
        const IMC = this.weight / this.height ** 2;
        if (IMC && IMC > 0) {
          const MLG = this.weight - this.weight * (IMC / 100) ?? 0;
          if (IMC < 18.5) {
            return ["abaixo", IMC, MLG];
          } else if (IMC >= 18.5 && IMC < 25.0) {
            return ["eutrofico", IMC, MLG];
          } else if (IMC >= 25.0 && IMC < 30) {
            return ["sobrepeso", IMC, MLG];
          } else if (IMC >= 30 && IMC < 35) {
            return ["obeso1", IMC, MLG];
          } else if (IMC >= 35 && IMC < 40) {
            return ["obeso2", IMC, MLG];
          } else if (IMC > 40) {
            return ["obeso3", IMC, MLG];
          } else {
            throw new Error(
              `Erro classificando IMC. Valor obtido: ${
                IMC ?? 0
              }; Valores possíveis devem ser positivos`
            );
          }
        } else {
          throw new Error(
            `Erro calculando IMC. Valores usados: Peso ${
              this.weight ?? 0
            } e Altura ${this.height ?? 0}`
          );
        }
      } else {
        throw new Error(
          `Erro validando dados fornecidos. Elemento pessoa: ${
            Object.prototype.toString.call(person).slice(8, -1) ?? "null"
          }; weight presente: ${"weight" in person ?? false};
          Peso obtido: ${this.weight ?? 0};
          height presente: ${"height" in person ?? false};
          Altura obtida: ${this.height ?? 0}`
        );
      }
    } catch (IMCError: any) {
      console.error(IMCError.message);
      return ["", 0, 0];
    }
  }

  calcPGC(person: Person): number {
    if ("sumDCut" in person && this.sumDCut) {
      if (person instanceof Man) {
        let DC =
          1.10938 -
          0.0008267 * this.sumDCut +
          0.0000016 * this.sumDCut ** 2 -
          0.0002574 * person.age;
        if (DC <= 0 || Number.isNaN(DC)) {
          DC = 0.01;
        }
        let PGC = 495 / DC - 450;
        if (PGC <= 0 || Number.isNaN(PGC)) {
          PGC = 0.01;
        }
        if (PGC > 100) {
          PGC = 100;
        }
        return PGC;
      } else if (person instanceof Woman) {
        let DC =
          1.0994921 -
          0.0009929 * this.sumDCut +
          0.0000023 * this.sumDCut ** 2 -
          0.0001392 * person.age;
        if (DC <= 0 || Number.isNaN(DC)) {
          DC = 0.01;
        }
        let PGC = 495 / DC - 450;
        if (PGC <= 0 || Number.isNaN(PGC)) {
          PGC = 0.01;
        }
        if (PGC > 100) {
          PGC = 100;
        }
        return PGC;
      } else if (person instanceof Neutro) {
        let DC =
          1.10443605 -
          0.0009098 * this.sumDCut +
          0.00000195 * this.sumDCut ** 2 -
          0.0001983 * person.age;
        if (DC <= 0 || Number.isNaN(DC)) {
          DC = 0.01;
        }
        let PGC = 495 / DC - 450;
        if (PGC <= 0 || Number.isNaN(PGC)) {
          PGC = 0.01;
        }
        if (PGC > 100) {
          PGC = 100;
        }
        return PGC;
      } else {
        console.error(
          `Instância de objeto inválida. Instância obtida: ${
            Object.prototype.toString.call(person).slice(8, -1) ?? "null"
          }`
        );
        return 0;
      }
    } else {
      console.warn(`Erro validado Propriedade sumDCut:
      Está presente: ${"sumDCut" in person ?? false};
      Valor obtido: ${this.sumDCut ?? 0}`);
      return 0;
    }
  }

  calcTMB(
    person: Person,
    IMC: number,
    factorAtleta: string,
    MLG: number
  ): [string, number] | void {
    try {
      if (person && "atvLvl" in person && this.atvLvl) {
        if (
          this.atvLvl === "muitoIntenso" &&
          (factorAtleta === "MLG" || factorAtleta === "Peso")
        ) {
          if (factorAtleta === "MLG") {
            if (MLG && MLG > 0) {
              const TMB = 25.9 * MLG + 284;
              return ["tinsley", TMB];
            } else {
              throw new Error(`Erro validando MLG.
              Valor obtido: ${MLG ?? 0}`);
            }
          } else if (factorAtleta === "Peso") {
            if ("weight" in person && this.weight > 0) {
              const TMB = 24.8 * this.weight + 10;
              return ["tinsley", TMB];
            } else {
              throw new Error(`Erro validando weight.
              Valor obtido: ${this.weight ?? 0}`);
            }
          }
        } else if (
          this.atvLvl === "sedentario" ||
          this.atvLvl === "leve" ||
          this.atvLvl === "moderado" ||
          this.atvLvl === "intenso"
        ) {
          if (
            "weight" in person &&
            this.weight > 0 &&
            "height" in person &&
            this.height > 0 &&
            "age" in person
          ) {
            if (IMC < 25.0 && IMC > 0) {
              if (person instanceof Man) {
                const TMB =
                  66 +
                  (13.8 * this.weight + 5.0 * this.height - 6.8 * this.age);
                return ["harrisBenedict", TMB];
              } else if (person instanceof Woman) {
                const TMB =
                  655 +
                  (9.6 * this.weight + 1.9 * this.height - 4.7 * this.age);
                return ["harrisBenedict", TMB];
              } else if (person instanceof Neutro) {
                const TMB =
                  360.5 +
                  (11.7 * this.weight + 3.45 * this.height - 5.75 * this.age);
                return ["harrisBenedict", TMB];
              } else {
                throw new Error(
                  `Erro validando instância de Person. Instância obtida: ${
                    Object.prototype.toString.call(person).slice(8, -1) ??
                    "null"
                  }`
                );
              }
            } else if (IMC >= 25.0) {
              if (person instanceof Man) {
                const TMB =
                  10 * this.weight + 6.25 * this.height - 5.0 * this.age + 5;
                return ["mifflinStJeor", TMB];
              } else if (person instanceof Woman) {
                const TMB =
                  10 * this.weight + 6.25 * this.height - 5.0 * this.age - 161;
                return ["mifflinStJeor", TMB];
              } else if (person instanceof Neutro) {
                const TMB =
                  10 * this.weight + 6.25 * this.height - 5.0 * this.age - 78;
                return ["mifflinStJeor", TMB];
              } else {
                throw new Error(
                  `Erro validando instância de Person. Instância obtida: ${Object.prototype.toString
                    .call(person)
                    .slice(8, -1)}`
                );
              }
            } else {
              throw new Error(
                `Erro validando IMC. IMC obtido: ${
                  IMC ?? 0
                }; Valor deve ser númerico, positivo e float`
              );
            }
          } else {
            throw new Error(`Erro validando propriedades de person.
            weight presente: ${"weight" in person ?? false};
            Valor de weight obtido: ${this.weight ?? 0};
            height presente: ${"height" in person ?? false};
            Valor de height obtido: ${this.height ?? 0};
            age presente: ${"age" in person ?? false};
            `);
          }
        } else {
          throw new Error(
            `Erro validando atvLvl e/ou factorAtleta.
            atvLvl obtido: ${this.atvLvl ?? "null"}
            Fator obtido: ${
              factorAtleta ?? "null"
            }; Fatores válidos: "MLG" || "Peso"`
          );
        }
      } else {
        throw new Error(`Erro validando person.
        Elemento: ${person ?? "null"};
        Instância: ${
          Object.prototype.toString.call(person).slice(8, -1) ?? "null"
        };
        atvLvl presente: ${"atvLvl" in person ?? false};
        Valor de atvLvl obtido: ${this.atvLvl ?? "null"}`);
      }
    } catch (TMBError: any) {
      console.error(TMBError.message);
      return ["", 0];
    }
  }

  calcGET(TMB: number, factorAtvLvl: number): number {
    if (TMB && factorAtvLvl) {
      const GET = TMB * factorAtvLvl;
      return GET;
    } else {
      console.error(`Erro validando argumentos.
      TMB obtido: ${TMB ?? 0};
      factorAtvLvl obtido: ${factorAtvLvl ?? 0}`);
      return 0;
    }
  }

  static clonePerson(person: Man | Woman | Neutro) {
    if (person && "gen" in person) {
      switch (person.gen) {
        case "masculino":
          return new Man(
            person.gen,
            person.age,
            person.weight,
            person.height,
            person.sumDCut,
            person.atvLvl
          );
        case "feminino":
          return new Woman(
            person.gen,
            person.age,
            person.weight,
            person.height,
            person.sumDCut,
            person.atvLvl
          );
        case "neutro":
          return new Neutro(
            person.gen,
            person.age,
            person.weight,
            person.height,
            person.sumDCut,
            person.atvLvl
          );
        default:
          console.error(`Erro validando .gen de person passada para .clonePerson()
          .gen obtido: ${person?.gen ?? "null"}.`);
      }
    } else {
      console.error(`Erro validando person.
      Objeto obtido: ${
        Object.prototype.toString.call(person).slice(8, -1) ?? "null"
      };
      .gen presente: ${"gen" in person ?? false}.`);
    }
  }
}

export class Man extends Person {
  constructor(
    gen: string,
    age: number,
    weight: number,
    height: number,
    sumDCut: number,
    atvLvl: string
  ) {
    super(gen, age, weight, height, sumDCut, atvLvl);
  }
}

export class Woman extends Person {
  constructor(
    gen: string,
    age: number,
    weight: number,
    height: number,
    sumDCut: number,
    atvLvl: string
  ) {
    super(gen, age, weight, height, sumDCut, atvLvl);
  }
}

export class Neutro extends Person {
  constructor(
    gen: string,
    age: number,
    weight: number,
    height: number,
    sumDCut: number,
    atvLvl: string
  ) {
    super(gen, age, weight, height, sumDCut, atvLvl);
  }
}

/*constantes média:
      1.10443605,
      0.0009098,
      0.00000195,
      0.0001983 */
