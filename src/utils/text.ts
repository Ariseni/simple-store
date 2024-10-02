export const trimText = (text: string, maxLength = 100) => {
  return text.slice(0, maxLength) + "...";
};
