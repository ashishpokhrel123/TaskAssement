const mongoose = require('mongoose');
const Joi = require("joi");
const todoSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true

    },
    done : {
        type: Boolean,
        required: true,
        default: false
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    }
},{ timestamps: true });
const Todo = mongoose.model("todo", todoSchema); 

/* Validation code for Todo model */

const validate = (todo) => {
    const schema = Joi.object({
        task: Joi.string().required(),
        
    });
    return schema.validate(todo);
};

module.exports = { Todo, validate};