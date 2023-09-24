const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { query, body, validationResult } = require('express-validator');


//ROUTE 1: GET ALL THE NOTES
router.post('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
//[
// body('title', 'Enter a valid Name').isLength({ min: 3 }),
//     body('description', 'Enter valid description').isLength({ min: 5 }),
// ]
//ROUTE 2: ADD NEW NOTE USING /api/auth/addnote. login required
router.post('/addnotes', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const saveNotes = await note.save();
        res.json(note);
    }
    catch (error) {
        console.error("oo--" + error.message);
        res.status(500).send("Internal Server Error")
    }
});


//ROUTE 3: update Existing NOTE USING /api/auth/updatenote. login required
// router.put('/updatenote/:id', fetchuser, async (req, res) => {
//     const { title, description, tag } = req.body;
//     //create a newNote
//     const newNote = {};
//     if (title) { newNote.title = title }
//     if (description) { newNote.description = description }
//     if (tag) { newNote.tag = tag }

//     //Find the note to be updated



//     // const note = Note.findByIdAndUpdate(newNote);
//     let note = await Note.findOne({ "_id": req.params.id }, (err, note) => {
//         if (err) {
//             console.error('Error finding book:', err);
//         } else {
//             if (book) {
//                 console.log('Found book:', book);
//             } else {
//                 console.log('Book not found.');
//             }
//         }
//     });
//     if (!note)
//         return res.status(404).send("Not Found note");
//     if (note.user.toString() !== req.user.id) {
//         return req.status(401).send("Not Allowed");
//     }

//     note = await Note.findOneAndUpdate(req.params.id, { $set: newNote }, { new: true });
//     res.json(note);
// });


// ...

//ROUTE 3: update Existing NOTE USING /api/auth/updatenote. login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a newNote
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    try {
        //Find the note to be updated
        // res.send(req.params.id);
        let note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).send("Not Found note");
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note.

            note = await Note.findOneAndUpdcd.update(
                { _id: req.params.id },
                { $set: newNote },
                { new: true }
            );
        res.json(note);
    } catch (error) {
        console.error(' nodem updating note:', error);
        res.status(500).send({ error, err: "Internal Server Error" });
    }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(501).send("Note NOt Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(501).send("CANT EDIT THIS NOTE");
        }

        note = await Note.deleteOne({ _id: req.params.id });
        res.send(note);

    } catch (error) {
        res.send(error);
    }

})
module.exports = router;