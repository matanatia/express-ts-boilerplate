export const firstCharToUpperCase = (str?: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

export const capitalize = (str?: string) => {
  if (!str) return str;
  const capitalizeStr = str
    .split(' ')
    .map(subStr => firstCharToUpperCase(subStr))
    .join(' ');
  return capitalizeStr;
};

export const formatNumberStr = (numberStr: string) => {
  const numberStrWithOutCommas = numberStr.replace(/,/g, '');
  const formatedNum =
    !isNaN(Number(numberStrWithOutCommas)) && numberStr !== ''
      ? numberStrWithOutCommas
          .split('.')
          .map((numberSection, i) =>
            i === 0
              ? numberSection.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : numberSection,
          )
          .join('.')
      : numberStr;

  return formatedNum;
};

export const convertStrToNum = (numberStr: string) =>
  numberStr.includes('.')
    ? Number.parseFloat(numberStr)
    : Number.parseInt(numberStr);
