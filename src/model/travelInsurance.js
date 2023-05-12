const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const travelSchema = mongoose.Schema({
  destination : {
    type: String,
  },
  ageOfTraveller: {
    type:Number
  },
  startDate:{
    type:String
  },
  endDate:{
    type:String
  }
 });

module.exports = mongoose.model("travelInsurance", travelSchema);
