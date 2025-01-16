export const convertHoursToMilliseconds = (hours: string) => {
  return parseInt(hours) * 60 * 60 * 1000;
};
