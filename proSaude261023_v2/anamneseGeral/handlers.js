export function opRadioHandler(keydown) {
  const radioPairs = document.querySelectorAll(
    'input[id$="Yes"], input[id$="No"]' //acessando como par
  );

  for (
    let i = 0;
    i < radioPairs.length;
    i += 2 //pulando de par em par
  ) {
    const radioYes = radioPairs[i];
    const radioNo = radioPairs[i + 1];

    if (!radioYes || !radioNo) {
      continue;
    }
    if (!radioYes.checked && !radioNo.checked) {
      if ((keydown.altKey && keydown.key === "y") || keydown.key === "Y") {
        radioYes.focus();
        radioYes.checked = true;
        setTimeout(() => {
          radioYes.blur();
        }, 5000);
        return;
      } else if (
        (keydown.altKey && keydown.key === "n") ||
        keydown.key === "N"
      ) {
        radioNo.focus();
        radioNo.checked = true;
        setTimeout(() => {
          radioNo.blur();
        }, 5000);
        return;
      }
    }
  }
}

export function pbRadioHandler() {
  let opRadiosCheck = document.querySelectorAll("input[id^='Cpb'][id$='Yes']");
  let opRadiosText = document.querySelectorAll("input[id^='pb'][id$='Yes']");
  let textAdd = document.querySelectorAll("textarea[id^='textAdd']");
  let divAdd = document.querySelectorAll("div[id^='divAdd']");
  //inclui ambos os tipos de eventos
  opRadiosCheck.forEach(function (opRadioCheck, i) {
    if (!opRadioCheck.checked) {
      divAdd[i].style.display = "none";
    } else {
      divAdd[i].style.display = "block";
    }
  });
  opRadiosText.forEach(function (opRadioText, i) {
    if (!opRadioText.checked) {
      textAdd[i].style.display = "none";
    } else {
      textAdd[i].style.display = "block";
    }
  });
}

export function deactTextInput() {
  const numberInputs = document.querySelectorAll(
    'input[type="number"][id$=NumId]'
  );
  const nullRadios = document.querySelectorAll(
    'input[type="radio"][id$=NullId]'
  );

  if (numberInputs.length !== nullRadios.length) {
    console.error("Número de texts e radios não corresponde!");
    return;
  }

  numberInputs.forEach((numberInput, i) => {
    const nullRadio = nullRadios[i];
    if (nullRadio.checked) {
      numberInput.setAttribute("disabled", "");
    } else {
      numberInput.removeAttribute("disabled");
    }
  });
}

export function doubleClickHandler() {
  if (this.checked) {
    this.checked = false;
  } else {
    this.checked = true;
  }
  pbRadioHandler();
  deactTextInput();
}

export function touchStartHandler(keydown) {
  let firstTapTime = 0;
  if (firstTapTime === 0) {
    firstTapTime = Date.now();
  } else {
    const elapsed = Date.now() - firstTapTime;
    if (elapsed < 1000) {
      // Limite de tempo para considerar um duplo toque (300ms)
      if (this.checked) {
        this.checked = false;
      } else {
        this.checked = true;
      }
      firstTapTime = 0; // Reiniciar o temporizador
    } else {
      firstTapTime = Date.now(); // Iniciar um novo temporizador
    }
  }
  opRadioHandler(keydown);
  pbRadioHandler();
}

let blockCount = 1;
export function addAntMedHandler(click) {
  if (
    click.target.tagName === "BUTTON" &&
    click.target.classList.contains("addAntMed")
  ) {
    blockCount++; // Incrementa o número de blocos
    const antMedContainer = document.getElementById("antMedContainer");
    // Cria um novo conjunto de elementos HTML
    const newBlock = document.createElement("div");
    newBlock.className = "antMedBlock";
    newBlock.innerHTML = `
    <span>
      <span>${blockCount}&#41;</span>
      <input type="text" name="antMedName${blockCount}" id="antMedId${blockCount}" />
    </span>
    <span>
      <span>
        <input type="date" name="antMedDateIniName${blockCount}" id="antMedDateIniId${blockCount}" /> até
        <input type="date" name="antMedDateEndName${blockCount}" id="antMedDateEndId${blockCount}" />
        <button type="button" name="addAntMedName${blockCount}" id="addAntMedId${blockCount}" class="addAntMed"
        value="addAntMed">+</button>
        <button type="button" name="removeAntMedName${blockCount}" id="removeAntMedId${blockCount}"
        class="removeAntMed" value="removeAntMed">-</button>
      </span>
    </span>
  `;
    // Adiciona o novo bloco ao contêiner
    antMedContainer.appendChild(newBlock);
  } else if (
    click.target.tagName === "BUTTON" &&
    click.target.classList.contains("removeAntMed")
  ) {
    const divToRemove = click.target.parentElement;
    const antMedContainer = document.getElementById("antMedContainer");
    antMedContainer.removeChild(divToRemove);
  }
}

export function subForm() {
  window.alert(
    "Sistema ainda não pronto\n...mas você teria enviado clicando aqui! :)"
  );
}
