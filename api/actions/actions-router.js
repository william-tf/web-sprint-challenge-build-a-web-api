const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();

const checkId = (req, res, next) => {
    const { id } = req.params
    Actions.get(id)
    .then(actID => {
        if(actID){
            req.id = id;
            next();
        }else{
            res.status(404).json({ message: `user with id ${id} not found` })
        }
    })
}

const checkAction = (req, res, next) => {
    if(!req.body.project_id || !req.body.description || !req.body.notes){
      res.status(400).json({message:'didnt fill it in eh?'})
  } else{
    next();
  }
  }


router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
      })
      
      
    })
    router.get('/:id', checkId, (req, res) => {
        const {id} = req.params
        
        Actions.get(id)
        .then(actID => {
            if(actID){
                res.status(200).json(actID)
            }else{
                res.status(404).json({message: 'That ID does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({error: 'you fell into the sad path' + err.message})
        })
    })
    router.post('/', checkAction, (req, res) => {
        const newAction = req.body
        
                Actions.insert(newAction)
                .then(actions => {
                        res.status(201).json(actions)
                })
                .catch(err => {
                    res.status(500).json({error: 'you fell into the sad path' + err.message})
                })
            
        })
        router.put('/:id', checkId, checkAction, (req, res) => {
            const {id} = req.params
            const changes = req.body
            
            Actions.update(id, changes)
            .then(updatedAct => {
                if(updatedAct){
                    res.status(201).json(updatedAct)
                }else{
                    res.status(400).json({message: `That action doesn't exist`})
                }
            })
            .catch(err => {
                res.status(500).json({error: 'you fell into the sad path' + err.message})
            })
            
        })
router.delete('/:id', checkId, (req, res) => {
    
    
    // if(!req.body.id || req.body){
        //     res.status(400).json({message: `That action doesn't exist`})
        // }
        
        Actions.remove(req.params.id)
        .then(test => {
            if(test){
                res.status(200).json({message: 'you must feel real powerful'})
            } else{
                res.status(404).json({message:'good try'})
            }
        })
        .catch(err => {
            res.status(500).json({error: 'you fell into the sad path' + err.message})
        })
    })
    

    


    module.exports = router