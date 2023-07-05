export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1).getDay();
};

export const formatDate = (date: Date, extraInfo?: boolean) => {
  const currentDate = new Date();
  const dueDate = new Date(date);
  const daysLeft = Math.ceil(
    (dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (!extraInfo) {
    return new Date(date).toLocaleDateString("en-gb", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else {
    if (daysLeft < 0) {
      return `${Math.abs(daysLeft)} day${
        Math.abs(daysLeft) === 1 ? "" : "s"
      } ago`;
    } else if (daysLeft < 30) {
      return `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;
    } else {
      return `${dueDate.toLocaleDateString("en-gb", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }
};
