var express = require('express');
const { route } = require('../app');
var router = express.Router();

var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

const { User } = require('../models');

const Validator = require('fastest-validator');
const v = new Validator();

const auth = require("../middleware/auth");

router.get('/', function(req, res, next) {
  res.send("ok");
});

router.get('/tes',auth, (req,res,next) => {
    res.send("tes");
});

router.post('/register', async (req, res) => {
    const schema = {
        email: 'email',
        password: 'string',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json({
            message: 'Bad Request',
            errors: validate
        });
    }

    if(await User.findOne({where: {email: req.body.email}})){
        return res.status(409).json({message:"User Already Exist."});
    }

    const { email, password } = req.body;

    encryptedPassword = await bcrypt.hash(password, 10);
    
    await User.create({
        email,
        password: encryptedPassword
    });
    
    res.status(201).json({message: 'Success !'});
})

router.post('/login', async function(req, res, next) {
    const schema = {
        email: 'email',
        password: 'string',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json({
            message: 'Bad Request',
            errors: validate
        });
    }

    const { email, password } = req.body;
    const user = await User.findOne({where: {email}});
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.TOKEN_SECRET);
        res.status(200).json({token: token});
    }else{
        res.status(401).json({message: 'Unauthorized !'});
    }
});

module.exports = router;
