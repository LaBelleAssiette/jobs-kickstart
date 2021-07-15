export const isFilled = (input) => {
  if (input == null) return;
  return /\S/.test(input);
};