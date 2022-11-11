const mongoose = require('mongoose')
const handleError = require('./errorHandler')
const Todo = require('../models/todoModel')

let db = mongoose.connection

//collection connection
mongoose.connect("mongodb://localhost:27017/todolist", {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

//add new task
exports.addTask = (req, res) => {
    var newtask = new Todo()
    newtask.title = req.body.title
    newtask.description = req.body.description

    newtask.save(function(error, result) {
        if (error) {
            let err = handleError(error)
            res.send(JSON.stringify({"status" : "error" , "data" : {"message" : err}}))
        }
        else{
            res.status(200).send(JSON.stringify({"status" : "success" , "data" : {"message" : "Task added successfully", "id" : result._id}}))
           
        }
        
    })
}

//update task
exports.updateTask = (req, res) => {
    //get original values and update when empty parameter is passed
    Todo.find({_id : req.body.id}).exec((err, task) => {
        
        if (err && err.path == "_id") {
            res.status(403).send(JSON.stringify({"status" : "error" , "data" : {"message" : "No or invalid Id parameter passed"}}))
        }
        else{
            const newtitle = (!req.body.title) ? task.title : req.body.title
            const newdesc = (!req.body.description) ? task.description : req.body.description

            Todo.updateMany({title : newtitle, description : newdesc})
            .where('_id').equals(req.body.id)
            .exec((err, result) => {
                if (err) {
                    res.send(JSON.stringify({"status" : "error" , "data" : {"message" : "Error updating task. Please try again later."}}))
                }
                else{
                    res.status(200).send(JSON.stringify({"status" : "success" , "data" : {"message" : "Task updated successfully", "id" : req.body.id}}))
                }
            })

        }
        
    })

    
}

//delete task
exports.deleteTask = (req, res) => {
    Todo.deleteOne({_id : req.body.id}).exec((err, result) => {
        if (err) {
            res.status(403).send(JSON.stringify({"status" : "error" , "data" : {"message" : "No or invalid Id parameter passed"}}))
        }
        else{
            res.status(200).send(JSON.stringify({"status" : "success" , "data" : {"message" : "Task deleted successfully", "id" : req.body.id}}))
        }
    })
}

//retrieve all tasks
exports.retrieveTasks = (req, res) => {
    Todo.find().exec((err, task) => {
        if (err) {
            res.send(JSON.stringify({"status" : "error" , "data" : {"message" : "Error getting tasks. Try again later"}}))
            
        }
        else{
            res.status(200).send(JSON.stringify({"status" : "success" , "data" : {"message" : "", "tasks" : task}}))
        }
        
    })
   
}
