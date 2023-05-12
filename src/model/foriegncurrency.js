const mongoose = require("mongoose");

const foriegncurrencySchema = mongoose.Schema({
  buy_sell: {
    type: String,
  },
  selectCity: {
    type: String,
  },
  currencyYouHave: {
    type: String,
  },
  currencyYouWant: {
    type: String,
  },
  forexcard: {
    type: String,
  },
  forexNumber: {
    type: Number,
  },
  inrAmount: {
    type: Number,
  },
  total: {
    type: Number,
  },
});

const foriegncurrencyModel = mongoose.model(
  "foriegncurrency",
  foriegncurrencySchema
);

module.exports = foriegncurrencyModel;
