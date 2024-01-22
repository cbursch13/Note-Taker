const path = require("path");
const html = require("express").Router();

html.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

html.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
  module.exports = html;