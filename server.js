// Import required modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const PORT = process.env.PORT || 3005;

// Create an Express application
const app = express();

// Use middleware to handle URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define route to serve the 'notes.html' page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// Define API endpoint to retrieve notes from 'db.json' file
app.get('/api/notes', (req, res) => {
    // Send the contents of 'db.json' as the response
    res.sendFile(path.join(__dirname, './db/db.json'), (err) => {
        if(err) throw err;
    });
});

// Define API endpoint to handle adding a new note to 'db.json' file
app.post('/api/notes', (req, res) => {
    // Get the new note data from the request body
    var note = req.body;
    // Generate a unique ID for the new note using the 'uniqid' library
    note.id = uniqid();

    // Read the current contents of 'db.json'
    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if(err) throw err;
        // Parse the JSON data to an array
        var currentFile = JSON.parse(data);
        // Add the new note to the array of notes
        currentFile.push(note);
    // Write the updated array back to 'db.json'
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(currentFile), (err) => {
        if(err) throw err;
        console.log(`File saved: added note ID ${note.id}`);
        });
    });
    // Send the updated 'db.json' file as the response
    res.sendFile(path.join(__dirname, './db/db.json'));
  });

// Define a catch-all route to serve the 'index.html' page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
    