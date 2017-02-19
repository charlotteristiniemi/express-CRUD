var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes');

var server = express();


// View setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// Join Public folder with current directory 
server.use(express.static(path.join(__dirname, 'public')));

// Enable req.body parsing
server.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
server.use(bodyParser.json());

server.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});


server.get('/', routes.home);
server.get('/add_new_story', routes.add);
server.post('/add_new_story', routes.save);
server.get('/edit_story/:id', routes.edit);
server.get('/delete_story/:id', routes.delete);
server.put('/edit_story/:id', routes.update);
server.post('/', routes.filterSortSearch);

// Start Server
var server = server.listen(3000,function(){
  console.log("Listening to port %s",server.address().port);
});