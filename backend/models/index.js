const mongoose = require("mongoose")
mongoose.connect("mongodb://0.0.0.0/todo-list", {
    keepAlive: true, //keep the connection alive 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.set("debug", true) // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.Todo = require("./todo") //requires todo model