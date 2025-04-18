const path = require('path');
const DataStore = require('gray-nedb');

module.exports = new DataStore({
  filename: path.join(__dirname, '../data/bookings.db'),
  autoload: true,
  timestampData: true
});