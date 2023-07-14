const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const multer = require("multer");
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyparser = require("body-parser");

const serverless = require("serverless-http");

const remitter = require("./src/route/remitter")
const enquiry = require("./src/route/enquiry")
const menu = require("./src/route/menu")
const banner = require("./src/route/banner")
const enquirydropdown = require("./src/route/enquirydropdown")
const submenu = require("./src/route/submenu")
const selectcity = require("./src/route/bookthisorder/selectcity")
const currency = require("./src/route/bookthisorder/addcurrency")
const bookthisorder = require("./src/route/bookthisorder/bookthisorder")
const Buy_prepaidtravelcard = require("./src/route/prepaidtravelcard/prepaidtravelcard_buy")
const reload_prepaidtravelcard = require("./src/route/prepaidtravelcard/prepaidtravelCard_reload")
const unload_prepaidtravelcard = require("./src/route/prepaidtravelcard/prepaidtravelCard_unload")
const call = require("./src/route/prepaidtravelcard/requestcallback")
const alert = require("./src/route/setanalert")
const betterRate = require("./src/route/requestbetterrate")
const foriegncurrency =require("./src/route/foriegncurrency")
const studentLoan = require("./src/route/studentloanScheme")
const remittance = require("./src/route/remittance")
const BestDescribe = require("./src/route/optioBestDescribe")
const travelInsurance = require("./src/route/travelInsurance")
const destination = require("./src/route/destination")
const subservices = require("./src/route/subservices")
const services = require("./src/route/services")
const topCurrency = require("./src/route/topCurrency")
const currencyonverter =require("./src/route/currencyconverter")
const bene = require("./src/route/beneficiary")
const remi = require("./src/route/remitter1")
const FxR = require("./src/route/FxRate")
const web = require("./src/route/webhooks")
const orderr = require("./src/route/order")
const upload = require("./src/route/uploadDocuments")
const typeOfCurr  = require("./src/route/typeOfCurrency")
const foriegnDemand = require("./src/route/foriegnDemandDraft")
const purposee = require("./src/route/purpose")
const common  = require("./src/route/common")


require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 2004;

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Db conneted succesfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/home",(req, res) => {
  res.status(200).send({msg:"Working App"});
});

app.use("/user", remitter);
app.use("/enquiry",enquiry)
app.use("/menu",menu)
app.use("/banner",banner)
app.use("/enquirydropdown",enquirydropdown)
app.use("/submenu",submenu)
app.use("/selectcity",selectcity)
app.use("/currency",currency)
app.use("/bookthisorder",bookthisorder)
app.use("/Buy_prepaidtravelcard",Buy_prepaidtravelcard)
app.use("/reload_prepaidtravelcard",reload_prepaidtravelcard)
app.use("/unload_prepaidtravelcard",unload_prepaidtravelcard)
app.use("/call",call)
app.use("/alert",alert)
app.use("/betterRate",betterRate)
app.use("/foriegncurrency",foriegncurrency)
app.use("/studentLoan",studentLoan)
app.use("/remittance",remittance)
app.use("/BestDescribe",BestDescribe)
app.use("/travelInsurance",travelInsurance)
app.use("/destination",destination)
app.use("/subservices",subservices)
app.use("/services",services)
app.use("/topCurrency",topCurrency)
app.use("/currencyonverter",currencyonverter)
app.use("/bene",bene)
app.use("/remi",remi)
app.use("/FxRat",FxR)
app.use("/web",web)
app.use("/orderr",orderr)
app.use("/upload",upload)
app.use("/typeOfCurr",typeOfCurr)
app.use("/foriegnDemand",foriegnDemand)
app.use("/purposee",purposee)
app.use("/remi/bene/order",common)




app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = {
  handler: serverless(app),
};

