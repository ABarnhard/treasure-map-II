'use strict';

function Treasure(o){
  this.name = o.name;
  this.difficulty = o.difficulty * 1;
  this.order = o.order * 1;
  this.loc = {};
  this.loc.name = o.loc.name;
  this.loc.lat = parseFloat(o.loc.lat);
  this.loc.lng = parseFloat(o.loc.lng);
  this.tags = o.tags.split(',').map(function(s){return s.trim();});
  this.photos = [];
  this.hints = makeArray(o.hints);

}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.query = function(query, sort, cb){
  Treasure.collection.find(query, sort).toArray(cb);
};

module.exports = Treasure;

// Helper Functions
// {1: "string 1", 2: "string 2"}
function makeArray(o){
  var keys  = Object.keys(o),
      hints = [];
  keys.forEach(function(key){
    hints.push(o[key]);
  });
  return hints;
}
