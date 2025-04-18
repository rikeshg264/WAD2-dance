const path = require('path');
const DataStore = require('gray-nedb');

module.exports = new DataStore({
  filename: path.join(__dirname, '../data/courses.db'),
  autoload: true,
  timestampData: true
});