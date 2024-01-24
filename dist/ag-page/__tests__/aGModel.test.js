import * as AGModel from "../src/aGModel";
describe(`Callbacks invoked by listening events tied to the DOM Elements
for the input of telephone numbers.`, () => {
    document
        .querySelectorAll('input[type="text"][id^="tel"]')
        ?.forEach(telInput => {
        it(`Should handle a string for a telephone number input.`, () => {
            expect(AGModel.formatTel(telInput)).toBe("string");
        });
    });
});
describe(`Callbacks invoked by listening events tied to the DOM Elements
for the input of email information or click on the Element.`, () => {
    document.querySelectorAll('input[id^="email"]')?.forEach(emailInput => {
        it(`Should handle an undefined value after adding a string pattern for the input.`, () => {
            expect(AGModel.addEmailExtension(emailInput)).toBeUndefined();
        });
    });
});
describe(`Callbacks invoked by listening events tied to the DOM Elements
for the input of CEP number.`, () => {
    it(`Should handle an undefined value after fixing
  the pattern of the CEP value.`, () => {
        expect(AGModel.formatCEP(document.getElementById("cepId"))).toBeUndefined();
    });
});
describe(`Callbacks invoked by listening events tied to the DOM Elements
for the input of quoted text or click on the same Element.`, () => {
    it(`Should handle an undefined value after inserting
  double quotes at the edges of the text.`, () => {
        expect(AGModel.addDblQuotes(document.getElementById("qxPrinc"))).toBeUndefined();
    });
});
