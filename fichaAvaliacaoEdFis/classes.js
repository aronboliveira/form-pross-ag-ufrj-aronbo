export class Person {
  lowerDCMeasureStr = "Coxa";
  constructor(
    age,
    weight,
    height,
    gender,
    sumDCut,
    constDCutOne,
    constDCutTwo,
    constDCutThree,
    constDCutFour
  ) {
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.gender = gender;
    this.sumDCut = sumDCut;
    (this.constDCutOne = constDCutOne),
      (this.constDCutTwo = constDCutTwo),
      (this.constDCutThree = constDCutThree),
      (this.constDCutFour = constDCutFour);
  }
  calcIMC(person) {
    const IMC = person.weight / person.height ** 2;
    return IMC;
  }
  calcPGC(person) {
    const DC =
      person.constDCutOne -
      person.constDCutTwo * this.sumDCut +
      person.constDCutThree * this.sumDCut ** 2 -
      person.constDCutFour * person.age;
    const PGC = 495 / DC - 450;
    console.log("Porcentagem de Gordura Coporal: " + PGC.toFixed(3));
    return PGC.toFixed(3);
  }
  calcTMB(person) {}
  calcGET(person) {}
}

export class Man extends Person {
  constructor(age, weight, height, sumDCut) {
    super(
      age,
      weight,
      height,
      "Masculino",
      sumDCut,
      1.10938,
      0.0008267,
      0.0000016,
      0.0002574
    );
  }
  calcPGCMasc(person) {
    super.calcPGC(person);
  }
}

export class Woman extends Person {
  constructor(age, weight, height, sumDCut) {
    super(
      age,
      weight,
      height,
      "Feminino",
      sumDCut,
      1.0994921,
      0.0009929,
      0.0000023,
      0.0001392
    );
  }
  calcPGCFem(person) {
    super.calcPGC(person);
  }
}
