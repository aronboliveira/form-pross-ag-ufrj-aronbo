export function autoCapitalizeNames(inputElement) {
  const text = inputElement.value;
  const capitalizedText = text.replace(/\b\w/g, (match) => match.toUpperCase());

  inputElement.value = capitalizedText;
}
