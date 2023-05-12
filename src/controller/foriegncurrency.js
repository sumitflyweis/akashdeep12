const ForeignCurrency = require('../model/foriegncurrency');
const axios = require('axios');

exports.create = async (req, res) => {
  try {
    const currency = new ForeignCurrency(req.body);
    const result = await currency.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
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



