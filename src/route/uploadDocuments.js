const express = require('express');
const router = express.Router();
const travelInsuranceController = require('../controller/uploadDocuments'); // Replace the path to the travelInsurance controller with your actual file path

// Create a new travel insurance
router.post('/:id', travelInsuranceController.createuploadDocuments);

// Get all travel insurances
// router.get('/', travelInsuranceController.getAllTravelInsurances);

// // Update a travel insurance by ID
// router.put('/:id', travelInsuranceController.updateTravelInsuranceById);

// // Delete a travel insurance by ID
// router.delete('/:id', travelInsuranceController.deleteTravelInsuranceById);

module.exports = router;
