class Person {
  constructor(
    public age: number,
    public weight: number,
    public height: number,
    public gender: string,
    public sumDCut: number,
    public constDCOne: number,
    public constDCTwo: number,
    public constDCThree: number,
    public constDCFour: number
  ) {}
  calcPGC(person: Person) {
    const DC =
      person.constDCOne -
      person.constDCTwo * this.sumDCut +
      person.constDCThree * this.sumDCut ** 2 -
      person.constDCFour * person.age;
    const PGC = 495 / DC - 450;
    console.log("Porcentagem de Gordura Coporal: " + PGC.toFixed(3));
  }
}

export class Man extends Person {
  constructor(age: number, weight: number, height: number, sumDCut: number) {
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
  calcPGCMasc(person: Man) {
    super.calcPGC(person);
  }
}

export class Woman extends Person {
  constructor(age: number, weight: number, height: number, sumDCut: number) {
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
  calcPGCFem(person: Woman) {
    super.calcPGC(person);
  }
}
