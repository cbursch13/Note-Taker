const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3005;

const app = express();

var uniqid = require('uniqid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'), (err) => {
        if(err) throw err;
    });
});

app.post('/api/notes', (req, res) => {
    var note = req.body;
    note.id = uniqid();

    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if(err) throw err;
        var currentFile = JSON.parse(data);

        currentFile.push(note);
    
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(currentFile), (err) => {
        if(err) throw err;
        console.log(`File saved: added note ID ${note.id}`);
        });
    });

    res.sendFile(path.join(__dirname, './db/db.json'));
  });


app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
    