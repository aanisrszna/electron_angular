const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'plotly.js': 'plotly.js/dist/plotly.js'
    }
  },
  externals: {
    'plotly.js-dist': 'Plotly'
  }
};
