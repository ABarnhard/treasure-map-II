'use strict';

var mp       = require('multiparty'),
    Treasure = require('../models/treasure');

exports.index = function(req, res){
  Treasure.query(req.query, function(err, treasures){
    //console.log(treasures);
    res.render('treasures/index', {treasures:treasures});
  });
};

exports.init = function(req, res){
  Treasure.count(function(err, order){
    order++;
    res.render('treasures/init', {order:order});
  });
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Treasure.create(fields, files, function(){
      res.redirect('/treasures');
    });
  });
};

exports.show = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    res.render('treasures/show', {treasure:treasure});
  });
};

