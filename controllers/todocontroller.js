var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

var mongoose = require('mongoose');

var todoschema = mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoschema)

// var itemOne = Todo({item: 'buy flowers'}).save(function(err) {
//     if(err) throw err;
//     console.log("item saved")
// })

mongoose.connect('mongodb://kylincat:703458onepiece@ds125362.mlab.com:25362/kylincat');

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'swimming'}]

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if(err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        var itemOne = Todo(req.body).save(function(err,data) {
            if(err) throw err;
            res.json(data);
        })
        
    });

    app.delete('/todo/:item', function(req, res) {
        // data = data.filter(function(todo) {
        //     return todo.item.replace(/ /g, "-") != req.params.item;
        // });
        // res.json(data);
        Todo.find({item: req.params.item.replace(/-/g, " ")}).deleteOne(function(err, data) {
            if(err) throw err;
            res.json(data);
        })
    });
}