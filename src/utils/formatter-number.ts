export const formatNumber = (number: number) =>
  new Intl.NumberFormat("ru-RU").format(number);