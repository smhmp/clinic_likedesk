const { colors } = require('./assets/designTokens/colors');
const { fontFamily } = require('./assets/designTokens/fontFamily');
const { container } = require('./assets/designTokens/container');
const { spacing } = require('./assets/designTokens/spacing');
const { fontSize } = require('./assets/designTokens/fontSize');
const { boxShadow } = require('./assets/designTokens/boxShadow');
const { borderRadius } = require('./assets/designTokens/borderRadius');
const { rotate } = require('./assets/designTokens/rotate');



module.exports = {
  important: true,
  purge: [],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors,
    fontFamily,
    spacing,
    fontSize,
    boxShadow,
    borderRadius,
    rotate,
    container
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
