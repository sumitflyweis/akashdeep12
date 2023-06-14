const Doc = require("../model/uploadDocuments");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});

// configure multer to use Cloudinary as storage destination
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Images", // optional folder name in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "pdf"], // optional array of allowed image formats
  },
});

// create multer instance with storage configuration
const upload = multer({ storage: storage });

// Handle POST request to upload image
// exports.createuploadDocuments = async (req, res) => {
//   try {
//     upload.single("image")(req, res, async (err) => {
//       if (err) {
//         console.log(err);
//         return res.status(400).json({ msg: err.message });
//       }

//       // Get the URL of the uploaded file
//       const fileUrl = req.file.path;

//       const {
//         bulk_doc_id,
//         missing_documents,
//         overridden_documents,
//         file_name,
//         document_type,
//       } = req.body;

//       console.log(req.params.id);
//       console.log(req.file.path);
//       const order_id = req.params.id;
//       const file = await axios.get(req.file.path);

//       const newBeneficiary = new Doc({
//         bulk_doc_id,
//         uploaded_documents: [
//           {
//             file_name: fileUrl || file_name || file,
//             document_type,
//           },
//         ],
//         missing_documents: [
//           {
//             fileUrl,
//             document_type,
//           },
//         ],
//         overridden_documents: [
//           {
//             fileUrl,
//             document_type,
//           },
//         ],
//       });
//       console.log(newBeneficiary);
//       await Doc.save();
//       const clientId = "TEST370281a1d99b47aa3a41930df0182073";
//       const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";

//       const headers = {
//         "x-api-version": "2023-03-01",
//         "Content-Type": "application/pdf",
//         "X-Client-ID": clientId,
//         "X-Client-Secret": clientSecret,
//       };

//       //console.log(headers);
//       const response = await axios.post(
//         `https://sandbox.cashfree.com/pg/lrs/orders/${order_id}/documents/upload`,
//         { file },
//         {
//           headers: headers,
//         }
//       );

//       // console.log(response);
//       const createdBeneficiary = response.data;
//       //console.log(createdBeneficiary);

//       res.status(201).json(createdBeneficiary);

//       // Make necessary API requests using Cloudinary uploader or any other external API calls
//       // ...
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ msg: error.message, name: error.name });
//   }
// };

exports.createuploadDocuments = async (req, res) => {
  try {
    const { bulk_doc_id, document_type, document_type1, document_type2 } =
      req.body;

    const newBeneficiary = new Doc({
      bulk_doc_id,
      uploaded_documents: [
        {
          document_type,
        },
      ],
      missing_documents: [
        {
          document_type1,
        },
      ],
      overridden_documents: [
        {
          document_type2,
        },
      ],
    });
    console.log(newBeneficiary);
    await Doc.save();

    res.status(201).json(createdBeneficiary);

    // Make necessary API requests using Cloudinary uploader or any other external API calls
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};
