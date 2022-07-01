//express.js npm package we will be using
const express = require("express");
const app = express();

const fs = require("fs");

//links to the api in the routes folder
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//for the server
const PORT = process.env.PORT || 3001;

// Express middleware, we set it to true so the content values can be any type instead of just string
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//needs this to retrieve everythign from te html  might have to add __dirname +"/"
app.use(express.static("public"));

//this is telling the server taht anytime a clien navitages to (ourhost)/api, the app will use the router we set up in apiRoutes.
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//listen to the express server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
