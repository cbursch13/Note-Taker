const api = require("express").Router();
const fs = require("fs");

api.get("/notes", function(req, res) {

    fs.readFile("./db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    });

});

api.post("/notes", function(req, res) {

    fs.readFile("./db/db.json", "utf8", function(err, data) {
        if (err) throw err;
        let raw = JSON.parse(data);
        raw.push(req.body);

        fs.writeFile("./db/db.json", JSON.stringify(raw), function(err) {
            if(err) return err;
            console.log("write success");
        });

    });

    res.end();

});
module.exports = api;