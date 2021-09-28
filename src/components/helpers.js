

export const splitGradientString = (gradientString) => {
  const regex = new RegExp(/,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/,'gi');
  const gradientType = gradientString.substring(0, gradientString.indexOf('(')).split('-')[0];
  const secondPartOfGradient = gradientString.substring(gradientString.indexOf('(') + 1, gradientString.lastIndexOf(')')).split(regex);
  let gradientAnglePoint = secondPartOfGradient[0];
  const isDefaultAngle = !gradientAnglePoint.includes('rgb');

  if (!isDefaultAngle) {
    gradientAnglePoint = '180deg';
  }

  const gradientPalettes = secondPartOfGradient.slice(Number(!!isDefaultAngle)).map((palette) => {
    const color = palette.substring(0, palette.indexOf(')') + 1).trim();
    const position = palette.substring(palette.indexOf(')') + 1, palette.length - 1).trim();

    return ({
      color,
      position,
    })
  });

  return [gradientType, gradientAnglePoint, gradientPalettes];
}

