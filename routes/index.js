const { Router } = require("express");

const todoRouter = require('./todoRoute')

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello Worlds!')
})

router.use(todoRouter)


module.exports = router;