export function trimText(text: string, maxLength = 100) {
  return text.slice(0, maxLength) + "...";
}

export function uppercaseFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
