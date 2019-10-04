const express = require('express');

const projectDB = require('../data/helpers/projectModel');

const projects = express.Router();

projects.post('/', validateProject, (req, res) => {
    projectDB.insert(req.body)
    .then(newProject =>
        res.status(201).json(newProject)
    ).catch(error =>
        res.status(500).json({error: `Server error could not create project error: ${error}`})
    )
});

// projects.post('/:id/comments', (req, res) => {
//     const id = req.params.id
//     data.findById(id)
//     .then(post => {
//         if (post.length === 0) {
//         res.status(404).json({ message: "The post with the specified ID does not exist." });
//         } else {
//             const commentData =  req.body
//             // console.log(req.body)
//             // console.log(`post Data`, postData
//             if (req.body.text) {
//                 // console.log(`title`, req.body.title)
//             data.insertComment(commentData)
//             .then(id => data.findCommentById(id.id))
//             .then(newComment => {
//                 // console.log(`new Comment`, newComment)
//                 res.status(201).json(newComment)
//             }).catch(error => {
//                 res.status(500).json({error: "There was an error while saving the post to the database"})
//             })
//             } else {
//             res.status(400).json({ errorMessage: "Please provide text for the comment." })}
//         }
//     })
//     .catch(error => {
//         res.status(500).json({ error: "The post information could not be retrieved." });
//     });
// });

projects.get('/', (req, res) => {
    projectDB.get()
    .then(projects => {
        res.status(200).json(projects)
    }).catch(error => {
        res.end()
        res.status(500).json({ error: `The project information could not be retrieved error: ${error}.` })
    })
});
  
projects.get('/:id', validateProjectId, (req, res) => {
    projectDB.get(req.params.id).then(project => {
            res.status(200).json(project)
    }).catch(error =>
        res.status(500).json({error: `Server error could not get data error: ${error}`})
    )
});

projects.get('/:id/actions', validateProjectId, (req, res) => {
    const id = req.params.id
    projectDB.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    }).catch(error =>
        res.status(500).json({error: `Server Error ${error}`})
    )
});

// projects.delete(`/:id`, (req, res) => {
//     data.findById(req.params.id)
//       .then(post => {
//         // console.log(post.title)
//         if (post.length === 0) {
//             res.status(404).json({ message: "The post with the specified ID does not exist." })
//         } else {
//           data.remove(post)
//           res.status(200).json({ message: `${post[0].title} Deleted.` })
//         }
//       }).catch(error => {
//         res.status(500).json({ error: "The post could not be removed" })
//       })
// });

// projects.put('/:id', (req, res) => {
//     const postData =  req.body
//     const id = req.params.id
//     // console.log(req.body)
//     // console.log(`post Data`, postData
//     if (req.body.title && req.body.contents) {
//        data.findById(id)
//        .then(post => {
//         // console.log(post.title)
//         if (post.length === 0) {
//             res.status(404).json({ message: "The post with the specified ID does not exist." })
//         } else {
//              // console.log(`post Data`, postData)
//             data.update(id, postData)
//             .then(response => {
//             // console.log(`id`, id)
//             if (response === 1) {
//                 // console.log(id)
//                 data.findById(id)
//                 .then(updatedPost => {
//                 //  console.log(`updated post`, updatedpost)
//                 res.status(200).json(updatedPost)})
//             } else {
//                 res.status(500).json({ error: "Server Error" })
//             }}).catch(error => {
//             res.status(500).json({ error: "The post information could not be modified." })
//             })
//         }})
//     } else {
//         res.status(400).json({ Message: "Please provide title and contents for the post." })}
// });

function validateProjectId(req, res, next) {
    const id = req.params.id
    console.log(id)
    projectDB.get(id)
    .then(project => {
        if(project) {
            next();
        } else {
            res.status(404).json({Messgae: "invalid project id"})
        }
    }).catch (error =>
        res.status(500).json({error: `Server error: ${error}`})
    )
};

function validateProject(req, res, next) {
    if (req.body) {
        if (req.body.name && req.body.description) {
            next ();
        } else {
            res.status(400).json({ message: "missing required name or description field"  })
        }
    } else {
        res.status(400).json({ message: "missing project data" })
    }
    
};

module.exports = projects;