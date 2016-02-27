// Technique from
// https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configurestore.prod');
} else {
  module.exports = require('./configurestore.dev');
}
