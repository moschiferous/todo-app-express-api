const { Router } = require("express");

const todoRouter = require('./todoRoute')
const authRouter = require('./authRoute')

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello Worlds!')
})

router.use(authRouter)
router.use(todoRouter)


module.exports = router;