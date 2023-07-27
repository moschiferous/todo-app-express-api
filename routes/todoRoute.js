const { Router } = require("express");
const TodoController = require("../controllers/todoController");
const auth = require("../middlewares/auth");
const router = Router();

router.get('/todo', auth, TodoController.all)
router.post("/todo/add", auth, TodoController.store);
router.get("/todo/:id", auth, TodoController.detail);
router.put("/todo/update/:id", auth, TodoController.update);
router.delete("/todo/delete/:id", auth, TodoController.delete);

module.exports = router;