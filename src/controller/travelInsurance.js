const TravelInsurance = require('../model/travelInsurance'); // Replace the path to the travelInsurance model with your actual file path

// Create a new travel insurance
exports.createTravelInsurance = async (req, res) => {
  try {
    const travelInsurance = new TravelInsurance(req.body);
    const savedTravelInsurance = await travelInsurance.save();
    res.status(201).json(savedTravelInsurance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all travel insurances
exports.getAllTravelInsurances = async (req, res) => {
  try {
    const travelInsurances = await TravelInsurance.find();
    res.status(200).json(travelInsurances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a travel insurance by ID
exports.updateTravelInsuranceById = async (req, res) => {
  try {
    const updatedTravelInsurance = await TravelInsurance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTravelInsurance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a travel insurance by ID
exports.deleteTravelInsuranceById = async (req, res) => {
  try {
    const deletedTravelInsurance = await TravelInsurance.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedTravelInsurance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
