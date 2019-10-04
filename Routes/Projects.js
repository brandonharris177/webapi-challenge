const express = require('express');

const projectDB = require('../data/helpers/projectModel');

const projects = express.Router();

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

projects.post('/', validateProject, (req, res) => {
    projectDB.insert(req.body)
    .then(newProject =>
        res.status(201).json(newProject)
    ).catch(error =>
        res.status(500).json({error: `Server error could not create project. Error: ${error}`})
    )
});

projects.put('/:id', validateProjectId, (req, res) => {
    const id = req.params.id
    projectDB.update(id, req.body)
    .then (updatedProject => {
        if (updatedProject) {
            res.status(200).json(updatedProject)
        } else {
            res.status(500).json({error: 'error project not correctly updated'})
        }
    }).catch (error =>
        res.status(500).json({error: `Server error could not update data. Error: ${error}`})
    )
}); 

projects.delete('/:id', validateProjectId, (req, res) => {
    // console.log(`id`, req.params.id)
    const id = req.params.id
    projectDB.get(id)
    .then(project => {
        // console.log (`project`, project)
        projectDB.remove(id)
        .then (responce => {
            // console.log(`responce`, responce)
            if (responce === 1) {
                res.status(204).json({Message: 'project deleted'})
            } else {
                res.status(500).json({Message: 'project not deleted'})
            }
        })
        
    }).catch(error =>
    res.status(500).json({error: `Server error, could not delete project. Error: ${error}`})
    )
});

function validateProjectId(req, res, next) {
    const id = req.params.id
    // console.log(id)
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