const express = require('express');
const { Verify } = require('../middleware/verify');
const { getAllDocuments, searchDocuments, getUserDocuments,
    uploadDocuments, handleUpload, handleRename, handleDelete, 
    handleCreateFolder } = require('../controllers/documents-controller');
const router = express.Router();

router.use(Verify);
router.get('/list', getUserDocuments);
router.get('/search', searchDocuments);
router.post('/upload', uploadDocuments, handleUpload);
router.put('/rename', handleRename);
router.delete('/delete', handleDelete);
router.post('/createFolder', handleCreateFolder)

module.exports = router;

// function insertDocData () {
//     Document.insertMany([
//         {
//             name: "ToDoList",
//             owner: "Nam"
//         }
//     ])
// }

// insertDocData();

// router.get('', async (req, res) => {
//     const locals = {
//         title: "Testing",
//         description: "I don't know what will happen."
//     }
//     try {
//         const data = await Document.find();
//         res.render('index', { locals, data});
//     } catch (error) {
//         console.log(error);
//     }
// });