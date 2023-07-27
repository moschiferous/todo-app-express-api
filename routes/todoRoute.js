const { Router } = require("express");
const TodoController = require("../controllers/todoController");

const router = Router();

router.get('/todo', TodoController.all)
router.post("/todo/add", TodoController.store);
router.get("/todo/:id", TodoController.detail);
router.post("/todo/update/:id", TodoController.update);
router.post("/todo/delete/:id", TodoController.delete);

module.exports = router;