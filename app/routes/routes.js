'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    favicon        = require('serve-favicon'),
    treasures      = require('../controllers/treasures'),
    home           = require('../controllers/home');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(favicon(__dirname + '/../static/img/favicon.ico'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);

  app.get('/treasures/new', treasures.init);
  app.post('/treasures', treasures.create);
  app.get('/treasures', treasures.index);
  app.get('/treasures/:id', treasures.show);
  app.post('/treasures/:id/found', treasures.found);

  console.log('Express: Routes Loaded');
};

