export const dateOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
};

export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", dateOptions);

export const acronymn = (str: string) => {
  const words = str.split(" ");
  const firstLetters = words[0][0] + words[0][2].toUpperCase() + words[1][0];
  return firstLetters;
};
