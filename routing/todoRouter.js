const express = require('express');
const todocontroller = require('../controllers/todoController');

const router = express.Router();

//route definitions
router.post("/addtask", todocontroller.addTask)

router.put("/updatetask", todocontroller.updateTask)

router.delete("/deletetask", todocontroller.deleteTask)

router.get("/tasks", todocontroller.retrieveTasks)

module.exports = router;