const mongoose = require('mongoose');
const Joi = require("joi");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
},{ timestamps: true });

const User = mongoose.model("user", userSchema); 

/* Validation for user model */

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports =  { User , validate}

