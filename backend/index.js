const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 5000 || process.env.PORT; 
const db = require('./db');
app.use(express.json());
const AdPostDetails = require('./adPostDetails');
const cors = require('cors');
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
};
app.use(cors(corsOptions));

app.get("", (req, res) => {
    console.log("Server Started");
    res.send("This Is Demo AdPost App");
});

////// Multer Setup ////////
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload-image', upload.single("image"), async (req, res) => {
    const { type, details } = req.body; // Ensure this matches the FormData keys
    const image = req.file ? req.file.filename : null;

    try {
        // Log the received data for debugging
        console.log("Received data:", { type, details, image });

        // Create a new ad document and save it to MongoDB
        const newAdPostDetails = new AdPostDetails({
            type, // Ensure this matches the schema
            details,
            image: image,
        });

        await newAdPostDetails.save();

        res.status(200).json({ message: 'Uploaded and saved to DB!' });
    } catch (error) {
        // Log the error details to understand what's going wrong
        console.error('Error saving to MongoDB:', error.message);
        console.error('Stack Trace:', error.stack);
        res.status(500).json({ message: 'Error saving to DB' });
    }    
});


app.get('/get-image', (req, res) => {
    try {
        AdPostDetails.find({}).then(data => {
            res.send({ data: data });
        });
    } catch (error) {
        res.json({ status: error });
    }
});

/// Port setup /////////
app.listen(PORT, () => {
    console.log(`App Running At Port ${PORT}`);
});
