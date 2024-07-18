export const dateOptions: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
};

export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", dateOptions);

export const acronymn = (str: string) => {
  const words = str.split(" ");

  let abbreviation;

  if (words[0].length >= 5) {
    abbreviation = words[0][0] + words[0][2].toUpperCase() + words[1][0];
    return abbreviation;
  }

  return words[0][0] + words[1][0];
};
