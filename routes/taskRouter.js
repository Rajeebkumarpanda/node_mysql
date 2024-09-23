const express = require("express");
const {
  fetchAllTask,
  fetchTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require("../controller/taskController");
const router = express.Router();

//get all task
router.get("/", fetchAllTask);
//get by id
router.get("/:id", fetchTaskById);
//create
router.post("/", createTask);
//update by id
router.put("/:id", updateTaskById);

//delete by id
router.delete("/:id", deleteTaskById);

module.exports = router;
