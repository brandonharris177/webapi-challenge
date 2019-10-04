const express = require('express');

const actionDB = require('../data/helpers/actionModel');

const actions = express.Router();

actions.get('/', (req, res) => {
    actionDB.get()
    .then(actions => {
        res.status(200).json(actions)
    }).catch(error => {
        res.end()
        res.status(500).json({ error: `The action information could not be retrieved error: ${error}.` })
    })
});
  
actions.get('/:id', validateActionId, (req, res) => {
    console.log(`this  is running`)
    actionDB.get(req.params.id).then(action => {
            res.status(200).json(action)
    }).catch(error =>
        res.status(500).json({error: `Server error could not get data error: ${error}`})
    )
});

actions.post('/', validateAction, (req, res) => {
    actionDB.insert(req.body)
    .then(newaction =>
        res.status(201).json(newaction)
    ).catch(error =>
        res.status(500).json({error: `Server error could not create action. Error: ${error}`})
    )
});

actions.put('/:id', validateActionId, (req, res) => {
    const id = req.params.id
    actionDB.update(id, req.body)
    .then (updatedaction => {
        if (updatedaction) {
            res.status(200).json(updatedaction)
        } else {
            res.status(500).json({error: 'error action not correctly updated'})
        }
    }).catch (error =>
        res.status(500).json({error: `Server error could not update data. Error: ${error}`})
    )
}); 

actions.delete('/:id', validateActionId, (req, res) => {
    // console.log(`id`, req.params.id)
    const id = req.params.id
    actionDB.get(id)
    .then(action => {
        // console.log (`action`, action)
        actionDB.remove(id)
        .then (responce => {
            // console.log(`responce`, responce)
            if (responce === 1) {
                res.status(204).json({Message: 'action deleted'})
            } else {
                res.status(500).json({Message: 'action not deleted'})
            }
        })
        
    }).catch(error =>
    res.status(500).json({error: `Server error, could not delete action. Error: ${error}`})
    )
});

function validateActionId(req, res, next) {
    const id = req.params.id
    // console.log(id)
    actionDB.get(id)
    .then(action => {
        if(action) {
            next();
        } else {
            res.status(404).json({Messgae: "invalid action id"})
        }
    }).catch (error =>
        res.status(500).json({error: `Server error: ${error}`})
    )
};

function validateAction(req, res, next) {
    if (req.body) {
        if (req.body.project_id && req.body.description && req.body.notes) {
            next ();
        } else {
            res.status(400).json({ message: "missing required name, description, or notes field"  })
        }
    } else {
        res.status(400).json({ message: "missing action data" })
    }
    
};

module.exports = actions;