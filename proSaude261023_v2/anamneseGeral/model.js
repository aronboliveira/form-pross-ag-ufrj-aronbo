export function autoCapitalizeNames(inputElement) {
  const text = inputElement.value;
  const capitalizedText = text.replace(/\b\w/g, (match) => match.toUpperCase());

  inputElement.value = capitalizedText;
}

export function formatTel(inputTelElement) {
  const telText = inputTelElement.value;
  const regex = /\d+/g;

  const formattedTel = telText.replace(regex, (matchTel) => {
    const numOnly = matchTel.replace(/\D/g, "");

    if (numOnly.length === 9) {
      if (numOnly[0] === "9") {
        return `${numOnly.slice(0, 5)}-${numOnly.slice(5, 9)}`;
      } else {
        return `${numOnly.slice(0, 4)}-${numOnly.slice(4, 8)}`;
      }
    } else if (numOnly.length > 9) {
      return `${numOnly.slice(0, 8)}`;
    }
    return matchTel;
  });

  inputTelElement.value = formattedTel;
}
