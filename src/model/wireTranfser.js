const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const wireTransferSchema = mongoose.Schema({
  tranferFrom: {
    type: objectId,
    ref: "city",
  },
  transferFromCity: {
    type: String,
  },
  transferTo: {
    type: objectId,
    ref: "city",
  },
  transferToCity: {
    type: String,
  },
  purpose: {
    type: objectId,
    ref: "purpose",
  },
  purposeName: {
    type: String,
  },
  receivingCurrency: {
    type: objectId,
    ref: "currency",
  },
  recievingCurrencyName: {
    type: String,
  },
  INRCurrency: {
    type: objectId,
    ref: "currency",
  },
  INRCurrencyName: {
    type: String,
  },
  recievingAmount: {
    type: String,
  },
  convertedAmount: {
    type: String,
  },

  ///////////////////////////////////////////
  //   CUSTOMER DETAILS

  pancard: {
    type: String,
  },
  Name: {
    type: String,
  },
  panStatus: {
    type: String,
  },
  AadharCard: {
    type: String,
  },
  /////////////////////////////////////////////////
  //REMITTER DETAILS

  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  AccountNumber: {
    type: String,
  },
  IFSC: {
    type: String,
  },
  pan: {
    type: String,
  },
  address: {
    type: String,
  },
  postCode: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  nationality: {
    type: String,
  },
  emailId: {
    type: String,
  },
  mobile: {
    type: String,
  },
  ///////////////////////////////////////////
  //BENEFICIARY  DETAILS

  benficiaryid: {
    type: String,
  },
  accountHolderName: {
    type: String,
  },
  sortCode: {
    type: String,
  },
  transitCode: {
    type: String,
  },
  BsbNumber: {
    type: String,
  },
  routingNumber: {
    type: String,
  },
  Iban: {
    type: String,
  },
  recieverAddress: {
    type: String,
  },
  country: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  state: {
    type: String,
  },
  emailId: {
    type: String,
  },
  recieverBankName: {
    type: String,
  },
  recieverBankCountry: {
    type: String,
  },
  recieverBankSwiftCode: {
    type: String,
  },
  recieverBankAddress1: {
    type: String,
  },
  recieverBankAddress2: {
    type: String,
  },
  recieverAccountNumber: {
    type: String,
  },
  city: {
    type: String,
  },
  /////////////////////////////////////////
  exchangeRate: {
    type: String,
  },
  transferAmountInFCY: {
    type: String,
  },
  remittenceServiceCharge: {
    type: String,
  },
  GstOnCharge: {
    type: String,
  },
  GstOnCurrencyConversion: {
    type: String,
  },
  tcs: {
    type: String,
  },
  tcsFlag: {
    type: String,
  },
  totalFundingInINR: {
    type: String,
  },
  TotalOfAllCharges: {
    type: String,
  },
});
const wireModel = mongoose.model("wireTransfer", wireTransferSchema);
module.exports = wireModel;
