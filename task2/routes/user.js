const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { User, validate} = require('../models/user');
const auth = require('../auth/auth');
const Joi = require("joi"); /* used for validation */

/* Register Endpoint */

router.post('/signup',  async (req, res, next) => {
    try {
        const { error} =  validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const newuser = new User(req.body);
        const salt = await bcrypt.genSalt(Number(10));
        newuser.password = await bcrypt.hash(newuser.password, salt );
        await newuser.save();
        res.json(newuser);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
        
    }
})

/* for Login endpoint */

router.post('/login', async (req, res, next) => {
    try {
         const { error } = validateLogin(req.body);
         if (error) return res.status(400).send(error.details[0].message);
         const user = await User.findOne({ email : req.body.email});
         if(!user) return res.status(400).send("Invalid Username and Password");
         const validPaasword = await bcrypt.compare(
             req.body.password,
             user.password
         );

         if(!validPaasword) return res.status(400).send("Invalid email or password");
         const token = jwt.sign({ _id: user._id }, process.env.SECRET);
         res.json({ status: 'Login success!', token: token});
    } catch (error) {
        console.log(error);
        res.json("An error occured");
        
    }
} );
/* validation code for login */
const validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
}

/* user profile endpoint */

router.get('/profile', auth.verifyUser, async (req, res, next) => {
    try {

        const user =  await User.findById(req.user._id);
        res.json(user);
        
    } catch (error) {
        
    }
})

module.exports = router;