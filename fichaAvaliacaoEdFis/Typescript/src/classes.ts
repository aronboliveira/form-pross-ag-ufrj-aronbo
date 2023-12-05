export interface UndefinedPerson {
  gen: string;
  age: number;
  sumDCut: number;
  weight: number;
  height: number;
  atvLvl: string;
}

abstract class Person implements UndefinedPerson {
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

  checkAtLvl(person: Person): number | void {
    if (person && "atLvl" in person && this.atvLvl !== "") {
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
    }
  }

  calcIMC(person: Person): [string, number, number] | undefined | never {
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
          return ["Com Baixo Peso", IMC, MLG];
        } else if (IMC >= 18.5 && IMC < 25.0) {
          return ["Eutrófico", IMC, MLG];
        } else if (IMC >= 25.0 && IMC < 30) {
          return ["Com Sobrepeso (não Obeso)", IMC, MLG];
        } else if (IMC >= 30 && IMC < 35) {
          return ["Obeso Grau 1", IMC, MLG];
        } else if (IMC >= 35 && IMC < 40) {
          return ["Obeso Grau 2", IMC, MLG];
        } else if (IMC > 40) {
          return ["Obesidade Mórbida", IMC, MLG];
        } else {
          console.error(
            `Erro classificando IMC. Valor obtido: ${
              IMC ?? 0
            }; Valores possíveis devem ser positivos`
          );
        }
      } else {
        console.error(
          `Erro calculando IMC. Valores usados: Peso ${
            this.weight ?? 0
          } e Altura ${this.height ?? 0}`
        );
      }
    } else {
      console.error(
        `Erro validando dados fornecidos. Elemento pessoa: ${
          Object.prototype.toString.call(person).slice(8, -1) ?? "null"
        }; weight presente: ${"weight" in person ?? false};
        Peso obtido: ${this.weight ?? 0};
        height presente: ${"height" in person ?? false};
        Altura obtida: ${this.height ?? 0}`
      );
    }
  }

  calcPGC(person: Person): number | void {
    if ("sumDCut" in person && this.sumDCut) {
      if (person instanceof Man) {
        const DC =
          1.10938 -
          0.0008267 * this.sumDCut +
          0.0000016 * this.sumDCut ** 2 -
          0.0002574 * person.age;
        const PGC = 495 / DC - 450;
        return PGC;
      } else if (person instanceof Woman) {
        const DC =
          1.0994921 -
          0.0009929 * this.sumDCut +
          0.0000023 * this.sumDCut ** 2 -
          0.0001392 * person.age;
        const PGC = 495 / DC - 450;
        return PGC;
      } else if (person instanceof Neutro) {
        const DC =
          1.10443605 -
          0.0009098 * this.sumDCut +
          0.00000195 * this.sumDCut ** 2 -
          0.0001983 * person.age;
        const PGC = 495 / DC - 450;
        return PGC;
      } else {
        console.error(
          `Instância de objeto inválida. Instância obtida: ${
            Object.prototype.toString.call(person).slice(8, -1) ?? "null"
          }`
        );
      }
    } else {
      console.error(`Erro validado Propriedade sumDCut:
      Está presente: ${"sumDCut" in person ?? false};
      Valor obtido: ${this.sumDCut ?? 0}`);
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
              return ["Tinsley", TMB];
            } else {
              console.error(`Erro validando MLG.
              Valor obtido: ${MLG ?? 0}`);
            }
          } else if (factorAtleta === "Peso") {
            if ("weight" in person && this.weight > 0) {
              const TMB = 24.8 * this.weight + 10;
              return ["Tinsley", TMB];
            } else {
              console.error(`Erro validando weight.
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
                return ["Harris-Benedict", TMB];
              } else if (person instanceof Woman) {
                const TMB =
                  655 +
                  (9.6 * this.weight + 1.9 * this.height - 4.7 * this.age);
                return ["Harris-Benedict", TMB];
              } else if (person instanceof Neutro) {
                const TMB =
                  360.5 +
                  (11.7 * this.weight + 3.45 * this.height - 5.75 * this.age);
                return ["Harris-Benedict", TMB];
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
                return ["Mifflin-St.Jeor", TMB];
              } else if (person instanceof Woman) {
                const TMB =
                  10 * this.weight + 6.25 * this.height - 5.0 * this.age - 161;
                return ["Mifflin-St.Jeor", TMB];
              } else if (person instanceof Neutro) {
                const TMB =
                  10 * this.weight + 6.25 * this.height - 5.0 * this.age - 78;
                return ["Mifflin-St.Jeor", TMB];
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
    }
  }

  calcGET(TMB: number, factorAtvLvl: number): number | undefined {
    if (TMB && factorAtvLvl) {
      const GET = TMB * factorAtvLvl;
      return GET;
    } else {
      console.error(`Erro validando argumentos.
      TMB obtido: ${TMB ?? 0};
      factorAtLvl obtido: ${factorAtvLvl ?? 0}`);
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
