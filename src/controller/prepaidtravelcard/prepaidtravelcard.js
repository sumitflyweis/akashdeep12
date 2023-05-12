const prepaidtravelModel = require("../../model/prepaidtravelcard/prepaidtravelcard");

exports.createPrepaidTravel = async (req, res) => {
  try {
    const prepaidtravel = new prepaidtravelModel(req.body);
    const result = await prepaidtravel.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getPrepaidTravelById = async (req, res) => {
  try {
    const prepaidtravel = await prepaidtravelModel.findById({_id:req.params.id});
    if (!prepaidtravel) {
      return res.status(404).send("Prepaid Travel Card not found");
    }
    res.json(prepaidtravel);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatePrepaidTravelById = async (req, res) => {
  try {
    const prepaidtravel = await prepaidtravelModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!prepaidtravel) {
      return res.status(404).send("Prepaid Travel Card not found");
    }
    res.json(prepaidtravel);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.deletePrepaidTravelById = async (req, res) => {
  try {
    const prepaidtravel = await prepaidtravelModel.findByIdAndDelete(
      req.params.id
    );
    if (!prepaidtravel) {
      return res.status(404).send("Prepaid Travel Card not found");
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
