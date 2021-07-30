const router = require('express').Router();
const {Todo, validate} = require('../models/todo');

/* Adding Task  Endpoint by user */
router.post('/addTask', async (req, res, next)=> {
    try {
        const { error} =  validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const  newtask = await Todo.create({ task : req.body.task , user : req.user._id});
        return res.json(newtask);
    } catch (error) {
        return next(error);
        
    }
});
/* fetching all task  of user */
router.get('/', async (req, res, next) => {
    try {
        const task = await Todo.find({ user: req.user._id});
        if(task === null) {
            let error = new Error("User have no task");
            error.status = 401;
            return(next(error));

        }
        return res.json(task);
        
    } catch (error) {
        return next(error);
        
    }
});

/* get  task with id */

router.get('/:id', async (req, res, next) => {
    try {
        const {_id} = req.params.id;
        const task = await Todo.findById({_id: req.params.id});
        if(task === null) {
            let error = new Error("No Task Found");
            error.status = 401;
            return(next(error));

        }
        res.json(task);
    } catch (error) {
        return next(error);
        
    }
});

/* update task with id */

router.put("/:id", async(req, res, next) => {
    try {
        
        const updatedtask = await Todo.findByIdAndUpdate({ _id: req.params.id},{ $set:req.body}, {new:true});
        res.json(updatedtask);
    } catch (error) {
        return next(error);
        
    }
});

/* delete task with id */

router.delete("/:id", async(req, res, next) => {
    try {
        
        const task = await Todo.findByIdAndDelete({_id:req.params.id});
        if(task === null) {
            let error = new Error("No Task Found");
            error.status = 401;
            return(next(error));

        }
        res.send("deleted");
        
    } catch (error) {
        return next(error);
        
    }
});



module.exports = router;