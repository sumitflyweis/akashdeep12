const Doc = require("../model/uploadDocuments");
const axios = require("axios");
const multer = require("multer");

const path = require("path");

const multerS3 = require("multer-s3");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// create s3 instance using S3Client
// (this is how we create s3 instance in v3)
const s3 = new S3Client({
  credentials: {
    accessKeyId: "AKIASRY3AQTBAV37WSW7",
    secretAccessKey: "S07hsgAHLhYa6YJ/IWKZxwbRKlTEN8XZd2JWJ852",
  },
  region: "ap-south-1", // e.g. "us-west-1"
});

// Set up multer storage with multerS3
const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: "flyweisimages", // change it as per your project requirement
  ContentType: ["image/jpeg", "image/png", "image/jpg","image/pdf"],
  acl: "public-read", // storage access type
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName = Date.now() + "" + file.fieldname + "" + file.originalname;
    cb(null, fileName);
  },
});

// Define middleware to sanitize the uploaded file
function sanitizeFile(file, cb) {
  // Define the allowed extension
  const fileExts = [".png", ".jpg", ".jpeg" ,".pdf"];

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith("image/") || file.mimetype.startsWith("application/")

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displayed in the frontend
    const err = new Error(
      file.mimetype +
        " image is not allowed. Only jpg, png and jpeg format allowed!"
    );
    return cb(err);
  }
}

// Define middleware to handle image upload
const uploadImage = multer({
  storage: s3Storage,
  ContentType: ["image/jpeg" || "image/png" || "image/jpg" ||"image/pdf" ],
  acl: "public-read",
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 10, // 10mb file size
  },
}).single("image");



// Handle POST request to upload image
exports.createuploadDocuments = async (req, res) => {
  try {
      uploadImage(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }
      console.log(req.file);

      // Get the URL of the uploaded file
      const fileUrl = req.file.location;

      const {
        bulk_doc_id,
        missing_documents,
        overridden_documents,
        file_name,
        document_type
      } = req.body;

      console.log(req.file);

      const order_id = req.params.id;

      const newBeneficiary = new Doc({
        bulk_doc_id,
        uploaded_documents: [
          {
            file_name : req.file.location || file_name,
            document_type,
          },
        ],
        missing_documents,
        overridden_documents,
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
        `https://sandbox.cashfree.com/pg/lrs/orders/${order_id}/documents/upload`,
        newBeneficiary,
        {
          headers: headers,
        }
      );
  
      console.log(response);
      const createdBeneficiary = response.data;
      console.log(createdBeneficiary);
      res.status(201).json(createdBeneficiary);
      })
  }
  catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};




// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Specify the directory where uploaded files should be stored
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     // Generate a unique filename for the uploaded file
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   }
// });

// const upload = multer({ storage });

// exports.createuploadDocuments = async (req, res) => {
//   try {
//     const {
//       bulk_doc_id,
//       document_type,
//       missing_documents,
//       overridden_documents,
//     } = req.body;

//     const order_id = req.params.id;

//     const newBeneficiary = new Doc({
//       bulk_doc_id,
//       uploaded_documents: [],
//       missing_documents,
//       overridden_documents,
//     });

//     const clientId = "TEST370281a1d99b47aa3a41930df0182073";
//     const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";

//     const headers = {
//       "x-api-version": "2023-03-01",
//       "Content-Type": "application/json",
//       "X-Client-ID": clientId,
//       "X-Client-Secret": clientSecret,
//     };

//     const uploadMiddleware = upload.single('uploaded_document');
//     uploadMiddleware(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ error: 'File upload failed' });
//       }

//       const file_name = req.file.filename;

//       // Push the uploaded file details into newBeneficiary
//       newBeneficiary.uploaded_documents.push({ file_name, document_type });

//       try {
//         const response = await axios.post(
//           `https://sandbox.cashfree.com/pg/lrs/orders/${order_id}/documents/upload`,
//           newBeneficiary,
//           { headers }
//         );

//         const createdBeneficiary = response.data;
//         return res.status(201).json(createdBeneficiary);
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: 'Internal server error' });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };











// exports.createuploadDocuments = async (req, res) => {
//   try {
//     const {
//       bulk_doc_id,
//       //   uploaded_documents: [
//       //  {
//       file_name,
//       document_type,
//       //}
//       // ],
//       missing_documents,
//       overridden_documents,
//     } = req.body;

//     const order_id = req.params.id;

//     const newBeneficiary = new Doc({
//       bulk_doc_id,
//       uploaded_documents: [
//         {
//           file_name,
//           document_type,
//         },
//       ],
//       missing_documents,
//       overridden_documents,
//     });

//     const clientId = "TEST370281a1d99b47aa3a41930df0182073";
//     const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";

//     const headers = {
//       "x-api-version": "2023-03-01",
//       "Content-Type": "application/json",
//       "X-Client-ID": clientId,
//       "X-Client-Secret": clientSecret,
//     };

//     console.log(headers);
//     const response = await axios.post(
//       `https://sandbox.cashfree.com/pg/lrs/orders/${order_id}/documents/upload`,
//       newBeneficiary,
//       {
//         headers: headers,
//       }
//     );

//     console.log(response);
//     const createdBeneficiary = response.data;
//     console.log(createdBeneficiary);
//     res.status(201).json(createdBeneficiary);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
