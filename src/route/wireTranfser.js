const express = require('express');
const router = express.Router();
const wireTransferController = require('../controller/wireTranfser'); 

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({
        cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], },
});
const upload = multer({ storage: storage });

// router.post('/', wireTransferController.createTravelInsurance);

// router.get('/', wireTransferController.getAllTravelInsurances);

// router.get('/:id', wireTransferController.getAllTravelInsurancesById);

// router.put('/pan/:id', upload.array('image'), wireTransferController.updateTravelInsuranceByIdPan);

// router.put('/passport/:id', upload.array('image'), wireTransferController.updateTravelInsuranceByIdPassport);

// router.put('/ticket/:id', upload.array('image'), wireTransferController.updateTravelInsuranceByIdTicket);

// router.put('/visa/:id', upload.array('image'), wireTransferController.updateTravelInsuranceByIdVisa);

// router.delete('/:id', wireTransferController.deleteTravelInsuranceById);

module.exports = router;
