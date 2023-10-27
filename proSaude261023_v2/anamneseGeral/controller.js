import * as Handlers from "./handlers.js";
import * as Model from "./model.js";

const radioButtons = document.querySelectorAll('input[type="radio"]');
const textInputs = document.querySelectorAll('input[type="text"]');
const antMedContainer = document.getElementById("antMedContainer");
const telInputs = document.querySelectorAll('input[type="text"][id^="tel"]');
const subButton = document.getElementById("submitFormButId");

textInputs.forEach((textInput) => {
  textInput.addEventListener("input", (input) => {
    Model.autoCapitalizeNames(input.target);
  });
});

telInputs.forEach((telInput) => {
  telInput.addEventListener("input", (inputTel) => {
    Model.formatTel(inputTel.target);
  });
});

radioButtons.forEach((radio) => {
  radio.addEventListener("keydown", (keydown) => {
    Handlers.opRadioHandler(keydown);
  });
  radio.addEventListener("change", Handlers.pbRadioHandler);
  radio.addEventListener("keydown", Handlers.pbRadioHandler);
  radio.addEventListener("dblclick", Handlers.doubleClickHandler);
  radio.addEventListener("touchstart", Handlers.touchStartHandler);
  radio.addEventListener("change", Handlers.deactTextInput);
});

antMedContainer.addEventListener("click", Handlers.addAntMedHandler);

subButton.addEventListener("click", Handlers.subForm);
