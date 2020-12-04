// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();


const checkId = (req, res, next) => {
    const { id } = req.params
    Projects.get(id)
    .then(projID => {
        if(projID){
            req.id = id;
            next();
        }else{
            res.status(404).json({ message: `user with id ${id} not found` })
        }
    })
}

    const checkProject = (req, res, next) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({message: 'fuck u song'})
        } else{
            next();
        }
 }

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
      })
})


router.get('/:id/actions', checkId, (req, res) => {
    const { id } = req.params

    Projects.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({error: 'you fell into the sad path' + err.message})
      })
})

router.get('/:id', checkId, (req, res) => {
const {id} = req.params

    Projects.get(id)
    .then(projID => {
        if(projID){
            res.status(200).json(projID)
        }else{
            res.status(404).json({message: 'That ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'you fell into the sad path' + err.message})
      })
})
router.post('/', checkProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json({error: 'you fell into the sad path' + err.message})
      })
})
router.put('/:id', checkId, checkProject, (req, res) => {
    
    const { id } = req.params
    const changes = req.body

    Projects.update(id, changes)
    .then(updatedProj => {
        if(updatedProj){
            res.status(201).json(updatedProj)
        } else{
            res.status(400).json({message:'wrongo fieldo'})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'you fell into the sad path' + err.message})
      })

})
router.delete('/:id', checkId, (req, res) => {
   
    const { id } = req.params

    Projects.remove(id)
    .then(test => {
        if(test){
            res.status(200).json({message: 'you must feel real powerful'})
        }else{
            res.status(404).json({message:'good try'})
        }
    })
    .catch(err => {
        res.status().json({error: 'you fell into the sad path' + err.message})
      })
})

module.exports = router