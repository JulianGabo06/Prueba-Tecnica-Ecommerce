export const capitalizeWord = (word: string): string => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const deleteEmptySpace = (word: string): string => {
  return word.trim();
};

export const generateVerificationCode = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
