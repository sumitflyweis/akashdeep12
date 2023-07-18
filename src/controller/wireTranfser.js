const wireTransferModel = require("../model/wireTranfser");
const axios = require("axios");
const currencyModel = require("../model/bookthisorder/addcurrency");
const cityModel = require("../model/bookthisorder/selectcity");
const purposs = require("../model/purpose")

exports.wireTransfer = async (req, res) => {
  try {
    data = {
      tranferFrom: req.body.tranferFrom,
      transferTo: req.body.transferTo,
      purpose: req.body.purpose,
      receivingCurrency: req.body.receivingCurrency,
      INRCurrency: req.body.INRCurrency,
      recievingAmount: req.body.recievingAmount,

      //   transferFromCity
      //   transferToCity
      //   purposeName
      //   recievingCurrencyName
      //   INRCurrencyName
      //   recievingAmount
      //   convertedAmount
    };

    const cityfrom = await cityModel.findById({
      _id: data.tranferFrom,
    });
    console.log(cityfrom.selectcity);

    const cityTo = await cityModel.findById({
      _id: data.transferTo,
    });
    console.log(cityTo.selectcity);

    const currencyData = await currencyModel.findById({
      _id: data.receivingCurrency,
    });
    console.log(currencyData.addcurrency);

    const currencyINR = await currencyModel.findById({
      _id: data.INRCurrency,
    });
    console.log(currencyINR.addcurrency);

    const purposes = await purposs.findById({
        _id: data.purpose,
      });
      console.log(purposes.purpose)

    const response = await axios.get(
      `https://api.currencyscoop.com/v1/convert?api_key=4b9a3c48ebe3250b32d97a7031359674&from=${currencyData.receivingCurrency}&to=INR&amount=${data.recievingAmount}`
    );

    console.log(response.data.value);
    const ConvertedAmount = response.data.value;
    const total = response.data.value;

    let obj = {
      selectCity: data.selectCity,
      tranferFrom: data.tranferFrom,
      transferFromCity : cityfrom.selectcity,
      transferTo : data.transferTo,
      transferToCity : cityTo.selectcity,
      purpose: data.purpose,
      purposeName : purposes.purpose,
      receivingCurrency: req.body.receivingCurrency,
      INRCurrency: req.body.INRCurrency,
      recievingAmount: data.recievingAmount,
      convertedAmount: ConvertedAmount,
    };
    const wiretransfer = new wireTransferModel(obj)
    const result = await wiretransfer.save()
    return res.status(201).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message })
  }
};

// exports.findAllPrepaidcard = async (req, res) => {
//   try {
//     const currencies = await prepaidtravelModel.find();
//     if (!currencies) {
//       return res.status(404).send("Prepaid Travel Card not found");
//     }
//       res.status(200).json({
//         status: 200,
//         message: "Order created successfully.",
//         data: currencies,
//       });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getPrepaidTravelById = async (req, res) => {
//   try {
//     const prepaidtravel = await prepaidtravelModel.findById({
//       _id: req.params.id,
//     });
//     if (!prepaidtravel) {
//       return res.status(404).send("Prepaid Travel Card not found");
//     }
//     res.status(200).json({
//       status: 200,
//       message: "prepaidtravel created successfully.",
//       data: prepaidtravel,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// };

// exports.updatePrepaidTravelById = async (req, res) => {
//   try {
//     console.log("hi");
//     let panCard = req.files["pan"];
//     let passportF = req.files["passportFront"];
//     let passportB = req.files["passportBack"];
//     let airtic = req.files["air"];
//     let Valid = req.files["Visa"];

//     req.body.uploadPanCard = panCard[0].path;
//     req.body.PassportFront = passportF[0].path;
//     req.body.PassportBack = passportB[0].path;
//     req.body.airTicket = airtic[0].path;
//     req.body.validVisa = Valid[0].path;

//     const upda = await prepaidtravelModel.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           uploadPanCard: req.body.uploadPanCard,
//           PassportFront: req.body.PassportFront,
//           PassportBack: req.body.PassportBack,
//           airTicket: req.body.airTicket,
//           validVisa: req.body.validVisa,
//         },
//       },
//       { new: true }
//     );
//     if (!upda) {
//       res.status(404).json({ message: "travel card  not found" });
//     } else {
//       res.status(200).json(upda);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updatePrepaidAccountDetails = async (req, res) => {
//   try {
//     const prepaidtravel = await prepaidtravelModel.findById({
//       _id: req.params.id,
//     });
//     if (!prepaidtravel) {
//       return res.status(404).send("Prepaid Travel Card not found");
//     }
//     let exchangeRate =
//       prepaidtravel.ConvertedAmountToINR / prepaidtravel.forexAmount;

//     const data = {
//       data1: req.body.data1,
//       data2: req.body.data2,
//       exchangeRate: exchangeRate,
//       transferAmountInFCY: req.body.transferAmountInFCY1,
//       Total: prepaidtravel.total,
//       RemittanceServiceCharge: req.body.RemittanceServiceCharge,
//       GstOnCharge: req.body.GstOnCharge,
//       GstOnCurrencyConversion: req.body.GstOnCurrencyConversion,
//       TCS: req.body.TCS,
//       TCS_flag: req.body.TCS_flag,
//     };

//     const TotalFundingAmtInINR =
//       prepaidtravel.total +
//       parseInt(data.transferAmountInFCY) +
//       parseInt(data.RemittanceServiceCharge) +
//       parseInt(data.GstOnCharge) +
//       parseInt(data.GstOnCurrencyConversion) +
//       parseInt(data.TCS) +
//       parseInt(data.TCS_flag);

//     const TotalOfAllChargesAndTaxes =
//       parseInt(data.transferAmountInFCY) +
//       parseInt(data.RemittanceServiceCharge) +
//       parseInt(data.GstOnCharge) +
//       parseInt(data.GstOnCurrencyConversion) +
//       parseInt(data.TCS) +
//       parseInt(data.TCS_flag);

//     const currency = await prepaidtravelModel.findByIdAndUpdate(
//       { _id: prepaidtravel._id },
//       {
//         $set: {
//           data1: data.data1,
//           data2: data.data2,
//           exchangeRate: data.exchangeRate,
//           transferAmountInFCY: data.transferAmountInFCY,
//           Total: data.Total,
//           RemittanceServiceCharge: data.RemittanceServiceCharge,
//           GstOnCharge: data.GstOnCharge,
//           GstOnCurrencyConversion: data.GstOnCurrencyConversion,
//           TCS: data.TCS,
//           TCS_flag: data.TCS_flag,
//           TotalFundingAmtInINR: TotalFundingAmtInINR,
//           TotalOfAllChargesAndTaxes: TotalOfAllChargesAndTaxes,
//         },
//       },
//       { new: true }
//     );
//     res.status(200).json({
//       status: 200,
//       message: "prepaidtravel created successfully.",
//       data: currency,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deletePrepaidTravelById = async (req, res) => {
//   try {
//     const prepaidtravel = await prepaidtravelModel.findByIdAndDelete(
//       req.params.id
//     );
//     if (!prepaidtravel) {
//       return res.status(404).send("Prepaid Travel Card not found");
//     }
//     res.sendStatus(204);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// };
