// use express 
const express = require('express'); 
const server = express(); 

// data base 
const db = require('./data/db.js')

// middleware 
server.use(express.json())

// POST to /api/posts 
server.post('/api/posts', (req, res) => {
    const newPost  = req.body; 

    if (newPost.title && newPost.contents) {
        db.insert(newPost)
        .then((post) => res.status(201).json(post))
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database", 
                error: err
            })
        })
    } else {
        res.status(400).json({
            error: "Please provide title and contents for the post.", 
        })
    }
});

// POST to /api/posts/:id/ 


// export server 
module.exports = server 