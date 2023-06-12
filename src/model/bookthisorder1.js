const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const bookthisorder1Schema = mongoose.Schema({
  currencyYouHave: {
    type: String,
    default:""
  },
  currencyYouWant: {
    type: String,
    default:""
  },
  product: {
    type: String,
    default:""
  },
  Amount:{
    type:Number,
    default:0
  },
  convertedAmt:{
    type:Number,
    default:0
  },
});
const bookthisorderModel = mongoose.model("bookthisorder1Schema", bookthisorder1Schema);

module.exports = bookthisorderModel;
