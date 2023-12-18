export const useDateFormatter = (date, withYear = false) => {
  const unformattedDate = new Date(date);
  if (withYear) {
    return unformattedDate.toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } else {
    return unformattedDate.toLocaleString("default", {
      month: "short",
      day: "numeric",
    });
  }
};
