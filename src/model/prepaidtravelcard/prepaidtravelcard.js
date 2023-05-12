const mongoose = require("mongoose");

const prepaidtravelSchema = mongoose.Schema({
  fullName: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
  },
  selectcurrency: {
    type: String,
  },
  preferredbranch: {
    type: String,
  },
  total: {
    type: Number,
  },
});
const prepaidtravelcardModel = mongoose.model(
  "prepaidtravelcard",
  prepaidtravelSchema
);

module.exports = prepaidtravelcardModel;
