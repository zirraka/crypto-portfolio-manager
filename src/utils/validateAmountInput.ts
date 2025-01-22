const convertToNumber = (value: string) => {
  if (value === "") {
    return 0;
  }

  const dotDecimalValue = convertToDotDecimalNotationValue(value);

  return Number(dotDecimalValue);
};

const convertToDotDecimalNotationValue = (value: string) =>
  value.replace(",", ".");

const removeLeadingZeros = (value: string) => value.replace(/^0+(?!\.|$)/, "");

const isInvalidNumber = (value: number) => isNaN(value);

const hasExceededAllowedDecimalPlaces = (
  value: string,
  allowedDecimalPlaces: number
) => {
  const decimalIndex = value.indexOf(".");
  const decimalPlaces =
    decimalIndex === -1 ? 0 : value.length - decimalIndex - 1;

  return decimalPlaces > allowedDecimalPlaces;
};

const isNegativeNumber = (number: number) => number < 0;

export const validateAmountInput = (
  value: string,
  decimalPlaces: number
): string | null => {
  const dotDecimalValue = convertToDotDecimalNotationValue(value);
  const formattedValue = removeLeadingZeros(dotDecimalValue);
  const valueAsNumber = convertToNumber(formattedValue);

  if (isInvalidNumber(valueAsNumber)) {
    return null;
  }

  if (isNegativeNumber(valueAsNumber)) {
    return null;
  }

  if (hasExceededAllowedDecimalPlaces(formattedValue, decimalPlaces)) {
    return null;
  }

  return formattedValue;
};
