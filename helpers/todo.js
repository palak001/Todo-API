let Todo = require("../models/todo")

exports.getTodos =  (req, res) => {
    Todo.find({})
    .then(todos => {res.json(todos);})
    .catch(err => {res.send(err);})
}

exports.createTodo =  (req, res) => {
    console.log(req.body);
    Todo.create(req.body)
    .then(newTodo => {res.json(newTodo)})
    .catch(err => {res.send(err)});
}

exports.getTodo = (req, res) => {
    Todo.findById(req.params.todoId)
    .then(foundTodo => {res.json(foundTodo)})
    .catch(err => {res.send(err)});
}

exports.updateTodo = (req, res) => {
    Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(todo => {res.json(todo);})
    .catch(err => {res.send(err);});
}

exports.deleteTodo =  (req,res) => {
    Todo.remove({_id: req.params.todoId})
    .then(() => res.json({message: "We deleted it!"}))
    .catch(err => res.send(err));
}

module.exports = exports;