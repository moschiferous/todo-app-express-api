const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const Validator = require('fastest-validator');
const v = new Validator();

class AuthController {
    static async login(req, res){
        try {
            // validate
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
        
            const user = await prisma.user.findUnique({
                where: {
                  email: req.body.email,
                },
              })
            if(user && (await bcrypt.compare(req.body.password, user.password))){
                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.TOKEN_SECRET);
                res.status(200).json({token: token});
            }else{
                res.status(401).json({message: 'Unauthorized !'});
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    static async register(req, res){
        try {
            // validate
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

            const encryptedPassword = await bcrypt.hash(req.body.password, 10);
            await prisma.user.create({
                data: {
                    email: req.body.email,
                    password: encryptedPassword,
                }
            });

            res.status(200).json({
                message: 'Success',
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports = AuthController