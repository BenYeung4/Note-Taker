const router = require("express").Router();
const path = require("path");

//this route will take us to the notes folder
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//loading page start with index.html and then listen to the url
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
