const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    task: {
        //field1: task
        type: String,
        unique: true,
        required: true
    },
    completed: {
        //field2: task
        type: Boolean,
        default: false
    }
})

const todoModel = mongoose.model("Todo", todoSchema) //creating the model from the schema 
module.exports = todoModel