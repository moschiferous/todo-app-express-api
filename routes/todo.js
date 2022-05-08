var express = require('express');
const { route } = require('../app');
var router = express.Router();

const { Todo } = require('../models');

const Validator = require('fastest-validator');
const v = new Validator();

const auth = require("../middleware/auth");

router.get('/', auth ,async function(req, res, next) {
    const todo = await Todo.findAll({
        where: {
            userId: req.loggedUser.id
        }
    });
    if(todo){
        res.status(200).json({
                message: 'Success',
                data: todo
            }
        );
    }else{
        res.status(404).json({
                message: 'Not Found'
            }
        );
    }
});

router.get('/:id', auth , async (req, res, next) => {
    const todo = await Todo.findOne({
        where: {
            id: req.params.id,
            userId: req.loggedUser.id
        }
    });
    if(todo){
        res.status(200).json({
                message: 'Success',
                data: todo
            }
        );
    }else{
        res.status(404).json({
                message: 'Not Found'
            }
        );
    }
});

router.post('/add', auth, async (req, res) => {
    const schema = {
        title: 'string',
        description: 'string',
    }
    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json({
            message: 'Bad Request',
            errors: validate
        });
    }

    const { title, description } = req.body;
    const userId = req.loggedUser.id;
    await Todo.create({
        title,
        description,
        userId,
    });
    res.status(201).json({message: 'Todo created'});
});

router.put('/update/:id', auth, async (req, res) => {
    const id = req.params.id;
    let todo = await Todo.findByPk(id);

    if(!todo){
        return res.status(404).json({message: 'Todo not found',});
    }

    const schema = {
        title: 'string|optional',
        description: 'string|optional',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json({
            message: 'Bad Request',
            errors: validate
        });
    }

    await todo.update(req.body);
    res.status(200).json({message: 'Todo updated'});
});

router.delete('/delete/:id', auth, async (req, res) => {
    const id = req.params.id;
    let todo = await Todo.findByPk(id);

    if(!todo){
        return res.status(404).json({message: 'Todo not found',});
    }

    await todo.destroy();
    res.status(200).json({message: 'Todo deleted'});
});

module.exports = router;