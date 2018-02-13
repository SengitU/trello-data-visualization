const colorCodes = {
  sky: '#00c2e0',
  blue: '#0079bf',
  lime: '#51e898',
  orange: '#ffab4a',
  green: '#61bd4f',
  black: '#4d4d4d',
  yellow: '#f2d600',
  default: '#fff'
}

export const getColorCode = (color) => colorCodes[color] || colorCodes.default;