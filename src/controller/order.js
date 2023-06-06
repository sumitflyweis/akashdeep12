const orderr = require("../model/order");
const axios = require("axios");

exports.convertCurrencyccc = async (req, res) => {
  const {
    /*fromCurrency, toCurrency, amount*/ payment_url,
    refund_url,
    order_url,
  } = req.body;
  console.log("hi");
  try {
    const response = await axios.get(
      //`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
      /* 'https://v6.exchangerate-api.com/v6/12d331a841b6fcb37fc60cc5/latest/${fromCurrency}'*/
      `https://api.cashfree.com/lrs/webhooks/${
        (payment_url, refund_url, order_url)
      }`
    );
    console.log(response.payment_url);
    //   const exchangeRates = response.data.rates;
    //   const rate = exchangeRates[toCurrency];
    //   const convertedAmount = amount * rate;

    //   res.status(200).json({
    //     from: fromCurrency,
    //     to: toCurrency,
    //     amount: amount,
    //     convertedAmount: convertedAmount
    //   });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const {
      order_id,
      to_currency,
      to_amount,
      purpose,
      return_url,
      remitter_id,
      beneficiary_id,
      customer_details: [
        {
          pan,
          name,
          address,
          phone_number,
          email,
          nationality,
          dob,
          aadhar_number,
          passport_details: {
            passport_number,
            place_of_issue,
            issue_date,
            expiry_date,
          },
        },
      ],
      customer_relationship,
      remarks,
      customer_declaration,
    } = req.body;

    const newBeneficiary = new orderr({
      order_id,
      to_currency,
      to_amount,
      purpose,
      return_url,
      remitter_id,
      beneficiary_id,
      customer_details: [
        {
          pan,
          name,
          address,
          phone_number,
          email,
          nationality,
          dob,
          aadhar_number,
          passport_details: {
            passport_number,
            place_of_issue,
            issue_date,
            expiry_date,
          },
        },
      ],
      customer_relationship,
      remarks,
      customer_declaration,
    });

    const clientId = "TEST370281a1d99b47aa3a41930df0182073";
    const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";

    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    };

    console.log(headers);
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/lrs/orders",
      newBeneficiary,
      {
        headers: headers,
      }
    );

    console.log(response);
    const createdBeneficiary = response.data;
    console.log(createdBeneficiary);

    res.status(201).json(createdBeneficiary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};





exports.processOrderByorderId = async (req, res) => {
  try {
    const orderID = req.params.id;

    const clientId = "TEST370281a1d99b47aa3a41930df0182073";
    const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";

    const headers = {
      "x-api-version": "2023-03-01",
      "Content-Type": "application/json",
      "X-Client-ID": clientId,
      "X-Client-Secret": clientSecret,
    };

    console.log(headers);
    const response = await axios.post(
      `https://sandbox.cashfree.com/pg/lrs/orders/${orderID}/process`,
      // "https://sandbox.cashfree.com/pg/lrs/orders",
      // newBeneficiary,
      {
        headers: headers,
      }
    );

    //console.log(response);
    const createdBeneficiary = response.data;
    console.log(createdBeneficiary);

    res.status(201).json(createdBeneficiary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
