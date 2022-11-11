const mongoose = require('mongoose')

//todo model schema
let todoList = mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Please fill in title field']
    },
    description: {
        type : String,
        required : [true, 'Please fill in description field']
    },
},{ timestamps : true })

module.exports = mongoose.model("todo", todoList)