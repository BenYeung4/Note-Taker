// const router = require("express").Router();
const router = require("express").Router();
const notes = require("../db/db.json");

const fs = require("fs");

//retrieve info as .JSON
router.get("/notes", (req, res) => {
  return res.json(notes);
});

//recieve a new note to save on the requested body and added to the db.json
router.post("/notes", (req, res) => {
  let newNote = req.body;
  notes.push(newNote);
  console.log(notes);
  addId();
  let save = JSON.stringify(notes);
  fs.writeFileSync("./db/db.json", save);

  res.json(newNote);
});

//gave each new note a unique id
function addId() {
  notes.forEach((element, i) => {
    element.id = i + 1;
  });
}

//delete note, recieve a query parameter containing the id of a note to delete
router.delete("/notes/:id", (req, res) => {
  const deleted = notes.findIndex((i) => i.id == req.params.id);
  notes.splice(deleted, 1);
  reWrite();
  res.json(notes);
});

//need this to delete, removes the note with the given id property, and then rewrite the notes to the db.json file
let reWrite = () => {
  let newDB = JSON.stringify(notes);
  console.log("removed");
  fs.writeFile("db/db.json", newDB, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
