const ForeignCurrency = require('../model/foriegncurrency');
const axios = require('axios');

exports.create = async (req, res) => {
  try {

    // exports.convertRate = async (req, res) => {
    //   // router.get('/convert/:currency/:forexAmount', async (req, res) => {
    //     try {
    //       const { currency, forexAmount } = req.params;
          
    //       // Make a request to an external currency conversion API
    //       const response = await axios.get(`https://api.currencyscoop.com/v1/convert?api_key=4b9a3c48ebe3250b32d97a7031359674&from=${currency}&to=INR&amount=${forexAmount}`);
      
    //       console.log(response)
    //       // Extract the converted INR amount from the API response
    //       const inrAmount = response.data.response.value;
      
    //       res.json({ inrAmount });
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).json({ message: 'Failed to convert forex amount to INR.' });
    //     }
    //   }
    // selectCity: {
    //   type: objectId,
    //   ref: "city",
    // },
    // currencyYouHave: {
    //   type: objectId,
    //   ref: "currency",
    // },
    // currencyYouWant: {
    //   type: objectId,
    //   ref: "currency",
    // },
    // forexcard: {
    //   type: String,
    // },
    // forexAmount: {
    //   type: Number,
    // },
    // ConvertedAmount: {
    //   type: Number,
    // },
    // total: {
    //   type: Number,
    // },
    const currency = new ForeignCurrency(req.body);
    const result = await currency.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};


exports.registration = async (req, res) => {
  try {
    var { phone, referalCode,referalCodeUnique } = req.body;
    var user = await ForeignCurrency.findOne({ phone: phone, userType: "USER" });

    if (!user) {
      req.body.otp = newOTP.generate(4, {
        alphabets: false,
        upperCase: false,
        specialChar: false,
      });
      req.body.otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
      req.body.accountVerification = false;
      req.body.userType = "USER";


      let referalUser = null;

      const userCreate = await User.create({
        phone,
        referalCodeUnique,
        ...req.body
        });

      if (referalCode) {
        referalUser = await User.findOne({ referalCode: referalCode });
        if (referalUser) {
          referalUser.referalData.push(userCreate._id);
          referalUser.Coin += 200;
          await referalUser.save();
        }
      }

      userCreate.referalBy = referalUser ? referalUser._id : null
        await userCreate.save();

      let obj = {
        id: userCreate._id,
        otp: userCreate.otp,
        phone: userCreate.phone,
      };

      res.status(200).send({
        status: 200,
        message: "Registered successfully ",
        data: obj
      });
    } else {
      return res.status(409).send({ status: 409, msg: "Already Exit" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.findAll = async (req, res) => {
  try {
    const currencies = await ForeignCurrency.find();
    res.status(200).json(currencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const currency = await ForeignCurrency.findById(req.params.currencyId);
    if (!currency) {
      res.status(404).json({ message: 'Currency not found' });
    } else {
      res.status(200).json(currency);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const currency = await ForeignCurrency.findByIdAndUpdate(
      req.params.currencyId,
      req.body,
      { new: true }
    );
    if (!currency) {
      res.status(404).json({ message: 'Currency not found' });
    } else {
      res.status(200).json(currency);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const currency = await ForeignCurrency.findByIdAndDelete(req.params.currencyId);
    if (!currency) {
      res.status(404).json({ message: 'Currency not found' });
    } else {
      res.status(200).json({ message: 'Currency deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.convertCurrency = async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
     /* 'https://v6.exchangerate-api.com/v6/12d331a841b6fcb37fc60cc5/latest/${fromCurrency}'*/
    );
    const exchangeRates = response.data.rates;
    const rate = exchangeRates[toCurrency];
    const convertedAmount = amount * rate;

    res.status(200).json({
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
      convertedAmount: convertedAmount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



