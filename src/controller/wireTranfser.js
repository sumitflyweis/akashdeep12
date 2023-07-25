const wireTransferModel = require("../model/wireTranfser");
const axios = require("axios");
const currencyModel = require("../model/bookthisorder/addcurrency");
const cityModel = require("../model/bookthisorder/selectcity");
const purposs = require("../model/purpose");
// const pann = require("../model/pancard");
const addharcard = require("../model/addharverification");

exports.wireTransfer = async (req, res) => {
  try {
    data = {
      tranferFrom: req.body.tranferFrom,
      transferTo: req.body.transferTo,
      // purpose: req.body.purpose,
      purposeName :req.body.purposeName,
      // receivingCurrency: req.body.receivingCurrency,
      recievingCurrencyName:req.body.recievingCurrencyName,
      // INRCurrency: req.body.INRCurrency,
      INRCurrencyName:req.body.INRCurrencyName,
      recievingAmount: req.body.recievingAmount,
    }

    const cityfrom = await cityModel.findById({
      _id: data.tranferFrom,
    });
    console.log(cityfrom.selectcity);

    const cityTo = await cityModel.findById({
      _id: data.transferTo,
    });
    console.log(cityTo.selectcity)

    // const currencyData = await currencyModel.findById({
    //   _id: data.receivingCurrency,
    // });
    // console.log(currencyData.addcurrency)

    // const currencyINR = await currencyModel.findById({
    //   _id: data.INRCurrency,
    // });
    // console.log(currencyINR.addcurrency)


    const currencyData = await currencyModel.findOne({
      addcurrency: data.recievingCurrencyName,
      });
      console.log(currencyData._id)
  
      const currencyINR = await currencyModel.findOne({
        addcurrency: data.INRCurrencyName,
      });
      console.log(currencyINR._id)


    const purposes = await purposs.findOne({
      purpose : data.purposeName,
    })
    console.log(purposes._id)

    const response = await axios.get(
      `https://api.currencyscoop.com/v1/convert?api_key=4b9a3c48ebe3250b32d97a7031359674&from=${data.recievingCurrencyName}&to=INR&amount=${data.recievingAmount}`
    );

    console.log(response.data.value);
    const ConvertedAmount = response.data.value;
    const total = response.data.valu

    let obj = {
      selectCity: data.selectCity,
      tranferFrom: data.tranferFrom,
      transferFromCity: cityfrom.selectcity,
      transferTo: data.transferTo,
      transferToCity: cityTo.selectcity,
      // purpose: data.purpose,
      // purposeName: purposes.purpose,
      purpose: purposes._id,
      purposeName: data.purposeName,
      // receivingCurrency: req.body.receivingCurrency,
      // recievingCurrencyName: currencyData.addcurrency,
      receivingCurrency: currencyData._id,
      recievingCurrencyName: data.recievingCurrencyName,
      // INRCurrency: req.body.INRCurrency,
      // INRCurrencyName: currencyINR.addcurrency,
      INRCurrency: currencyINR._id,
      INRCurrencyName: data.INRCurrencyName,
      recievingAmount: data.recievingAmount,
      convertedAmount: ConvertedAmount,
    };
    const wiretransfer = new wireTransferModel(obj);
    const result = await wiretransfer.save();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


exports.updatepan = async (req, res) => {
  try {
    const { pan } = req.body;

    const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG";
    const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84";
    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    };

    const response = await axios.post(
      "https://api.cashfree.com/verification/pan",
      { pan },
      {
        headers: headers,
      }
    );

    const createdBeneficiary = response.data;
    console.log(createdBeneficiary);
    const updatedCurrencyConverter = await wireTransferModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          pancard: pan,
          Name: response.data.registered_name,
          panStatus: response.data.pan_status,
        },
      },
      { new: true }
    );

    res.status(201).json(updatedCurrencyConverter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addharotpWire = async (req, res) => {
  try {
    const { aadhaar_number } = req.body;

    const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG";
    const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84";
    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    };
    console.log(headers);
    const response = await axios.post(
      "https://api.cashfree.com/verification/offline-aadhaar/otp",
      aadhaar_number,
      {
        headers: headers,
      }
    );

    const createdBeneficiary = response.data;
    console.log(createdBeneficiary);
    const updatedCurrencyConverter = await wireTransferModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          AadharCard: aadhaar_number,
          ref_id: response.data.ref_id,
        },
      },
      { new: true }
    );

    res.status(201).json(updatedCurrencyConverter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyotpWire = async (req, res) => {
  try {
    const { otp, ref_id } = req.body;

    const clientId = "CF438240CIR4MSJHSPJFOOSBU9CG";
    const clientSecret = "0345902517133d3ac763c807a43ee181fa157b84";
    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    };
    console.log(headers);
    const response = await axios.post(
      "https://api.cashfree.com/verification/offline-aadhaar/verify",
      otp,
      ref_id,
      {
        headers: headers,
      }
    );

    const createdBeneficiary = response.data;
    console.log(createdBeneficiary);
    const updatedCurrencyConverter = await wireTransferModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          aadharStatus: response.data.status,
        },
      },
      { new: true }
    );

    res.status(201).json(updatedCurrencyConverter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateRemitter = async (req, res) => {
  try {
    const data = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      AccountNumberRemitter: req.body.AccountNumberRemitter,
      IFSC_Remitter: req.body.IFSC_Remitter,
      panRemitter: req.body.panRemitter,
      addressRemitter: req.body.addressRemitter,
      postCodeRemitter: req.body.postCodeRemitter,
      cityRemitter: req.body.cityRemitter,
      stateRemitter: req.body.stateRemitter,
      nationalityRemitter: req.body.nationalityRemitter,
      emailIdRemitter: req.body.emailIdRemitter,
      mobileRemitter: req.body.mobileRemitter,
    };

    const updatedCurrencyConverter = await wireTransferModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          AccountNumberRemitter: data.AccountNumberRemitter,
          IFSC_Remitter: data.IFSC_Remitter,
          panRemitter: data.panRemitter,
          addressRemitter: data.addressRemitter,
          postCodeRemitter: data.postCodeRemitter,
          cityRemitter: data.cityRemitter,
          stateRemitter: data.stateRemitter,
          nationalityRemitter: data.nationalityRemitter,
          emailIdRemitter: data.emailIdRemitter,
          mobileRemitter: data.mobileRemitter,
        },
      },
      { new: true }
    );

    res.status(201).json(updatedCurrencyConverter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBeneficiary = async (req, res) => {
  try {
    const data = {
      benficiaryid: req.body.benficiaryid,
      accountHolderName: req.body.accountHolderName,
      sortCode: req.body.sortCode,
      transitCode: req.body.transitCode,
      BsbNumber: req.body.BsbNumber,
      routingNumber: req.body.routingNumber,
      Iban: req.body.Iban,
      recieverAddress: req.body.recieverAddress,
      countryBeneficiary: req.body.countryBeneficiary,
      pinCodeBeneficiary: req.body.pinCodeBeneficiary,
      stateBeneficiary: req.body.stateBeneficiary,
      emailIdBeneficiary: req.body.emailIdBeneficiary,
      recieverBankName: req.body.recieverBankName,
      recieverBankCountry: req.body.recieverBankCountry,
      recieverBankSwiftCode: req.body.recieverBankSwiftCode,
      recieverBankAddress1: req.body.recieverBankAddress1,
      recieverBankAddress2: req.body.recieverBankAddress2,
      recieverAccountNumber: req.body.recieverAccountNumber,
      cityBeneficiary: req.body.cityBeneficiary,
    };

    const updatedCurrencyConverter = await wireTransferModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          benficiaryid: data.benficiaryid,
          accountHolderName: data.accountHolderName,
          sortCode: data.sortCode,
          transitCode: data.transitCode,
          BsbNumber: data.BsbNumber,
          routingNumber: data.routingNumber,
          Iban: data.Iban,
          recieverAddress: data.recieverAddress,
          countryBeneficiary: data.countryBeneficiary,
          pinCodeBeneficiary: data.pinCodeBeneficiary,
          stateBeneficiary: data.stateBeneficiary,
          emailIdBeneficiary: data.emailIdBeneficiary,
          recieverBankName: data.recieverBankName,
          recieverBankCountry: data.recieverBankCountry,
          recieverBankSwiftCode: data.recieverBankSwiftCode,
          recieverBankAddress1: data.recieverBankAddress1,
          recieverBankAddress2: data.recieverBankAddress2,
          recieverAccountNumber: data.recieverAccountNumber,
          cityBeneficiary: data.cityBeneficiary,
        },
      },
      { new: true }
    );

    res.status(201).json(updatedCurrencyConverter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatebifurcation = async (req, res) => {
  try {
    const {
      exchangeRate,
      transferAmountInFCY,
      remittenceServiceCharge,
      /* totalFundingInINR,*/
    /*  purpose,*/
    } = req.body;

    const wiretravel = await wireTransferModel.findById({
      _id: req.params.id,
    });
    if (!wiretravel) {
      return res.status(404).send("wiretravel Card not found");
    }
    

    const GstOnCharge = (remittenceServiceCharge * 0.18).toFixed(2);
    

    const total = parseFloat(exchangeRate) * parseFloat(transferAmountInFCY);

   
    let gstOnCurrencyConversion = "";

    if (total <= 25000) {
      gstOnCurrencyConversion = "45";
    } else if (total <= 100000) {
      gstOnCurrencyConversion = ((0.18 / 100) * total).toFixed(2);
    } else if (total <= 1000000) {
      gstOnCurrencyConversion = (180 + (0.09 / 100) * (total - 100000)).toFixed(
        2
      );
    } else {
      gstOnCurrencyConversion = (
        990 +
        (0.018 / 100) * (total - 1000000)
      ).toFixed(2);
    }

   
    let tcs = "";
    let tcsFlag = "";

    if (total <= 7000000) {
      // Tax system before 1st Oct 2023
      if (wiretravel.purposeName === "education (financed by loan)") {
        if (total < 700000) {
          tcs = "0";
        } else {
          tcsFlag = ((0.5 / 100) * total).toFixed(2);
        }
      } else if (wiretravel.purposeName === "education (other than financed by loan)") {
        if (total < 700000) {
          tcs = "0";
        } else {
          tcsFlag = ((5 / 100) * total).toFixed(2);
        }
      } else if (wiretravel.purposeName === "other purposes") {
        if (total < 700000) {
          tcs = "0";
        } else {
          tcsFlag = ((5 / 100) * total).toFixed(2);
        }
      } else if (wiretravel.purposeName === "overseas tour program package") {
        tcs = ((5 / 100) * total).toFixed(2);
      }
    }
    
    
    const TotalOfAllCharges = (
      parseFloat(remittenceServiceCharge) +
      parseFloat(GstOnCharge) +
      parseFloat(gstOnCurrencyConversion) +
      (tcsFlag ? parseFloat(tcsFlag) : parseFloat(tcs))
    ).toFixed(2);

    const updatedCurrencyConverter = await wireTransferModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          exchangeRate: exchangeRate,
          transferAmountInFCY: transferAmountInFCY,
          remittenceServiceCharge: remittenceServiceCharge,
          GstOnCharge: GstOnCharge,
          GstOnCurrencyConversion: gstOnCurrencyConversion,
          tcs: tcs,
          tcsFlag: tcsFlag,
          totalFundingInINR: total,
          TotalOfAllCharges: TotalOfAllCharges,
        },
      },
      { new: true }
    );

    res.status(201).json(updatedCurrencyConverter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.updateDocument = async (req, res) => {
  try {
    data = {
      documentName: req.body.documentName,
      documentNumber: req.body.documentNumber,
      city: req.body.city,
      purposeOfIssue: req.body.purposeOfIssue,
      dateOfIssue: req.body.dateOfIssue,
      countryOfIssue: req.body.countryOfIssue,
    }

    const updatedCurrencyConverter = await wireTransferModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          documentName: data.documentName,
          documentNumber: data.documentNumber,
          city: data.city,
          purposeOfIssue: data.purposeOfIssue,
          dateOfIssue: data.dateOfIssue,
          countryOfIssue: data.countryOfIssue,
        },
      },
      { new: true }
    );

    res.status(201).json(updatedCurrencyConverter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
