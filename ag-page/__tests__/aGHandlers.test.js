import * as AGHandlers from "../src/aGHandlers";
describe(`Callbacks invoked by listening events tied to the DOM Elements
for the input of CEP data.`, () => {
    it(`Should handle an undefined value after starting the callings
  following the creation of the HTTP Request for Brasil API`, () => {
        expect(AGHandlers.searchCEPXML(document.getElementById("cepId"))).toBeUndefined();
    });
    it(`Should handle a number reflecting the HTTP Request status`, () => {
        expect(typeof AGHandlers.loadCEP()).toBe("number");
    });
    it(`Should handle a [number, number, HTMLProgressElement] tuple with data about the creation
  and insertion of the progress bar showing the load event for the BrasilAPI HTTP request`, () => {
        const CEPBarResult = AGHandlers.displayCEPLoadBar(document.getElementById("cepId"));
        expect(Array.isArray(CEPBarResult)).toBe(true);
        expect(typeof CEPBarResult[0]).toBe("number");
        expect(typeof CEPBarResult[1]).toBe("number");
        expect(CEPBarResult[2]).toBeInstanceOf(HTMLProgressElement);
    });
    it(`Should handle an undefined value after uploading the progress bar showing the load event
  for the BrasilAPI HTTP request`, () => {
        expect(AGHandlers.uploadCEPLoadBar(document.getElementById("cepId"))).toBeUndefined();
    });
    it(`Should handle a boolean after enabling the button for autocompletion
  using the CEP value validated by the BrasilAPI`, () => {
        expect(typeof AGHandlers.enableCEPBtn(document.getElementById("autoCompCepBtn"), 9)).toBe("boolean");
    });
});
describe(`Callback invoked by listening events tied to the DOM Elements
for the Medical History.`, () => {
    [1, 2, 3, 4, 5].forEach(blockCount => {
        it("Should handle a number after appending a new div", () => {
            expect(typeof AGHandlers.addAntMedHandler(new MouseEvent("click"), blockCount)).toBe("number");
        });
    });
});
