const express = require('express');
const {notesModel} = require("../model/Notes.model")
const noteRouter = express.Router()

noteRouter.get('/', async(req, res) => {
    const notes = await notesModel.find()
    res.send(notes)
})

noteRouter.post("/create", async(req, res) => {
  const  payload = req.body;
const note = new notesModel (payload);
await note.save();
res.send({"msg":"Notes created"})
});

noteRouter.delete("/delete/:id", async(req, res) => {
    const notesID = req.params.id;
    await notesModel.findByIdAndDelete({_id:notesID});

  res.send({"msg": `Note with id: ${notesID} has been deleted`});
});

module.exports = {noteRouter}