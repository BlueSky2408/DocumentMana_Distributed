const { default: mongoose } = require('mongoose');
const Documents = require('../model/documents');
const Users = require('../model/users');
const multer = require('multer');
const maxSize = 10 * 1024 * 1024;
const ObjectId = require('mongoose').ObjectId;

//get documents information from database
const getAllDocuments = async (req, res) => {
    try {
        const docs = await Documents.find();
        if (!docs || docs.length === 0) {
            return res.status(404).json({ message: "No documents found" });
        }
        res.status(200).json({ docs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const searchDocuments = async (req, res) => {
    try {
        const searchQuery = req.query.query;
        const searchResults = await Documents.find({ name: { $regex: searchQuery, $options: 'i' } });
        res.status(200).json({ documents: searchResults });
    } catch (error) {
        console.error('Search error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserDocuments = async (req, res) => {
    try {
        const docs = await Documents.find({ owner: req.user })
            .populate('owner', 'username'); // Populates owner field with the user's name

        if (!docs || docs.length === 0) {
            return res.status(404).json({ message: "No documents found" });
        }

        // Format documents to include user name instead of user ID
        const formattedDocs = docs.map(doc => {
            const docObj = doc.toObject();
            // Replace the owner field with the owner's username
            docObj.owner = doc.owner ? doc.owner.username : 'Unknown'; // Ensure there's a fallback if the owner is not populated for some reason
            return docObj;
        });

        res.status(200).json({
            status: 'Success',
            data: formattedDocs,
            message: "Documents successfully retrieved!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            data: [],
            message: "Internal server error"
        });
    }
}

// Get a single document info
const getDocument = async (req, res) => {
    try {
        // Extracting the document's ObjectId from the request parameters
        const { id } = req.params;

        // Using findById to retrieve the document by its ObjectId
        const doc = await Documents.findById(id);
        if (!doc) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json({
            status: 'Success',
            data: doc,
            message: "Document successfully retrieved!"
        });
    } catch (error) {
        // The catch block can also catch errors related to invalid ObjectId format
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Upload files from local to database
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/'); // Set the destination folder for uploads
//     },
//     filename: (req, file, cb) => {
//         console.log(file.originalname);
//         cb(null, file.originalname);
//     },
// });
const storage = multer.memoryStorage();

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
});

const uploadDocuments = upload.single('file');

const handleUpload = async (req, res) => {
    const name = req.file.originalname;
    const type = req.body;
    const owner = req.user;
    const content = req.file.buffer;
    const modified = new Date();
    const dateCreated = new Date();
    const size = req.file.size;

    // Create a new document entry in the database
    const newDocument = await Documents.create({
        name,
        owner,
        type,
        size,
        content,
        dateCreated,
        dateModified: modified,
    });

    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const savedDocument = await newDocument.save();
        const { content, ...doc_data } = savedDocument._doc;
        return res.status(201).json({
            data: [doc_data],
            message: 'Document uploaded and saved successfully '
        });
    } catch (error) {
        console.error(error);
        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(500).json({
                message: "File size cannot be larger than 10MB!",
            });
        }
        return res.status(500).json({ message: 'Failed to save the document' });
    }
};

// const handleDelete = async (req, res) => {
//     try {
//         const { names } = req.body;
//         console.log('Received names for deletion:', names);
//         // Convert names to an array if it's not already (to handle single deletion)
//         const namesArray = Array.isArray(names) ? names : [names];

//         // Delete documents based on their names
//         const deletedDocs = await Documents.deleteMany({ name: { $in: namesArray } });
//         console.log(deletedDocs);
//         res.status(200).json({
//             status: 'Success',
//             message: "Documents successfully deleted!"
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: 'error',
//             message: "Internal server error"
//         });
//     }
// };

const handleDelete = async (req, res) => {
    try {
        const deletedDocs = await Documents.findOneAndDelete({ name: req.body });
        res.status(200).json({
            status: 'Success',
            data: [deletedDocs],
            message: "Documents successfully deleted!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: "Internal server error"
        });
    }
};

const handleRename = async (req, res) => {
    try {
        const { currentName, newName } = req.body;
        const updatedDoc = await Documents.findOneAndUpdate(
            { name: currentName },
            { $set: { name: newName } },
            { new: true }
        );

        if (!updatedDoc) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json({
            status: 'Success',
            data: updatedDoc,
            message: 'Document renamed successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const handleCreateFolder = async (req, res) => {
    try {
        const { folderName, parentFolderId } = req.body;

        // Check if the folder already exists
        const existingFolder = await Documents.findOne({ name: folderName, isFolder: true });
        if (existingFolder) {
            return res.status(400).json({ message: 'Folder already exists' });
        }

        const newFolder = await Documents.create({
            name: folderName,
            isFolder: true,
            parentFolder: parentFolderId,
        });

        const savedFolder = await newFolder.save();
        res.status(201).json({
            data: savedFolder,
            message: 'Folder created successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};


// const handleUpload = async (req, res) => {
//     try {
//         // Check if a file was uploaded
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const { originalname: name, size, buffer: content, mimetype: type } = req.file;
//         const owner = req.user;
//         const dateCreated = new Date();
//         const modified = new Date();

//         // Create a new document entry in the database
//         const newDocument = await Documents.create({
//             name,
//             owner,
//             type,
//             size,
//             content,
//             dateCreated,
//             dateModified: modified,
//         });

//         const savedDocument = await newDocument.save();
//         const { content, ...doc_data } = savedDocument._doc;

//         return res.status(201).json({
//             data: [doc_data],
//             message: 'Document uploaded and saved successfully'
//         });
//     } catch (error) {
//         console.error(error);
//         if (error.code === "LIMIT_FILE_SIZE") {
//             return res.status(400).json({
//                 message: "File size cannot be larger than 10MB!"
//             });
//         }
//         return res.status(500).json({ message: 'Failed to save the document' });
//     }
// };


module.exports = {
    getAllDocuments, searchDocuments, getUserDocuments,
    uploadDocuments, handleUpload, handleRename, handleDelete,
    handleCreateFolder
};