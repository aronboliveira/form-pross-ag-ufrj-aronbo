"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Woman = exports.Man = void 0;
class Person {
    constructor(age, weight, height, gender, sumDCut, constDCOne, constDCTwo, constDCThree, constDCFour) {
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
        this.sumDCut = sumDCut;
        this.constDCOne = constDCOne;
        this.constDCTwo = constDCTwo;
        this.constDCThree = constDCThree;
        this.constDCFour = constDCFour;
    }
    calcPGC(person) {
        const DC = person.constDCOne -
            person.constDCTwo * this.sumDCut +
            person.constDCThree * this.sumDCut ** 2 -
            person.constDCFour * person.age;
        const PGC = 495 / DC - 450;
        console.log("Porcentagem de Gordura Coporal: " + PGC.toFixed(3));
    }
}
class Man extends Person {
    constructor(age, weight, height, sumDCut) {
        super(age, weight, height, "Masculino", sumDCut, 1.10938, 0.0008267, 0.0000016, 0.0002574);
    }
    calcPGCMasc(person) {
        super.calcPGC(person);
    }
}
exports.Man = Man;
class Woman extends Person {
    constructor(age, weight, height, sumDCut) {
        super(age, weight, height, "Feminino", sumDCut, 1.0994921, 0.0009929, 0.0000023, 0.0001392);
    }
    calcPGCFem(person) {
        super.calcPGC(person);
    }
}
exports.Woman = Woman;
