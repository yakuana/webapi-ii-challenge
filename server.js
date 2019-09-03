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

// POST to /api/posts/:id/comments  
server.post('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params; 
    const newComment = req.body;

    if (id) {
        if (newComment.text) {
            db.insertComment(newComment)
            .then(comment => {
                res.status(201).json(comment)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the comment to the database", 
                    error: err 
                })
            })
        } else {
            res.status(400).json({
                error: "Please provide text for the comment."
            })
        }
    } else {
        res.status(404).json({
            error: "The post with the specified ID does not exist."
        })
    }
})

// GET from /api/posts 
server.get('/api/posts', (req, res) => {
    db.find() 
    .then(posts => {
        res.status(201).json(posts);
    })
    .catch(err => {
        res.status(500).json({ 
            message: "The posts information could not be retrieved.", 
            error: err
        })
    })
})

// GET for /api/posts/:id 
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params; 

    if (id) {
        db.findById(id) 
        .then(post => {
            res.status(200).json(post)
        }) 
        .catch(err => {
            res.status(500).json({ 
                message:  "The post information could not be retrieved.",
                error: err
            })
        })
    } else {
        res.status(404).json({ 
            error: "The post with the specified ID does not exist.",
        })
    }
})

// GET for /api/posts/:id/comments
server.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params; 

    if (id) {
        db.findCommentById(id) 
        .then(comment => {
            res.status(200).json(comment)
        }) 
        .catch(err => {
            res.status(500).json({ 
                message: "The comments information could not be retrieved.",
                error: err
            })
        })
    } else {
        res.status(404).json({ 
            error: "The post with the specified ID does not exist.",
        })
    }
})

// DELETE /api/posts/:id
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params; // OR const id = req.params.id;

    if (id) {
        db.remove(id) 
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "The post could not be removed",
                error: err
            })
        })
    } else {
        res.status(404).json({
            message: "The post with the specified ID does not exist.",
        })
    }
})

// PUT /api/posts/:id
server.put('/api/posts/:id', (req, res) => {
    const { id } = rew.params; 
    const editPost = req.body;

    if (id) {
        if (editPost.title && editPost.contents) {
            db.insertComment(editPost)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err => {
                res.status(500).json({
                    message: "The post information could not be modified.",
                    error: err
                })
            })
        } else {
            res.status(400).json({
                error: "Please provide text for the comment."
            })
        }
    } else {
        res.status(404).json({
            message: "The post with the specified ID does not exist.",
        })
    }
})

// export server 
module.exports = server 