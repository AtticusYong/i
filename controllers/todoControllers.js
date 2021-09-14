var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// CONNECT TO THE DATABASE
mongoose.connect('mongodb+srv://test:test@todo.pztll.mongodb.net/todo?retryWrites=true&w=majority')


// mongosh "mongodb+srv://test.snuyn.mongodb.net/myFirstDatabase" --username test

// CREATE SCHEMA - THIS IS LIKE A BLUEPRINT
var todoSchema = new mongoose.Schema({
  item: String
})

var Todo = mongoose.model('Todo', todoSchema)
var itemOne = Todo({item: 'SIGNAL FOR THE DATABASE WORKING'}).save(function(error) {
  if (error) throw error
  console.log('ITEM SAVED!!!')
})

var data = [
  
]
var urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send('YES')
  })

  app.get('/todo', function(req, res) {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    data.push(req.body)
    res.json(data)
  });

  app.delete('/todo/:item', function(req, res) {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item
    })
    res.json(data)
  });
  
};