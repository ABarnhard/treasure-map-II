'use strict';

var Mongo = require('mongodb'),
    fs    = require('fs'),
    path  = require('path');

function Treasure(o){
  this.name = o.name[0];
  this.difficulty = o.difficulty[0] * 1;
  this.order = o.order[0] * 1;
  // 0: name, 1: lat, 2: lng
  this.loc = {};
  this.loc.name = o.loc[0];
  this.loc.lat = parseFloat(o.loc[1]);
  this.loc.lng = parseFloat(o.loc[2]);
  this.tags = o.tags[0].split(',').map(function(s){return s.trim();});
  this.photos = [];
  this.hints = o.hints;
  this.isFound = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.query = function(query, sort, cb){
  Treasure.collection.find(query, sort).toArray(cb);
};

Treasure.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:id}, cb);
};

Treasure.found = function(id, cb){
  id = Mongo.ObjectID(id);
  Treasure.collection.update({_id:id}, {$set:{isFound:true}}, cb);
};

Treasure.create = function(fields, files, cb){
  var t = new Treasure(fields);
  t.save(function(){
    t.addPhotos(files, cb);
  });
};

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.prototype.addPhotos = function(files, cb){
  var dir    = __dirname + '/../static/img/' + this._id,
      staticRoot   = '/img/' + this._id + '/',
      exists = fs.existsSync(dir),
      self   = this;

  if(!exists){
    fs.mkdirSync(dir);
  }
  files.photos.forEach(function(photo){
    var ext = path.extname(photo.path),
        fileName = self.photos.length + ext,
        rel = staticRoot + fileName,
        abs = dir + '/' + fileName;
    fs.renameSync(photo.path, abs);
    self.photos.push(rel);
  });
  self.save(cb);
};

module.exports = Treasure;

