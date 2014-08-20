/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure  = require('../../app/models/treasure'),
    Mongo     = require('mongodb'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasure-map-test',
    oid       = '000000000000000000000002',
    obj       = {name:['Rubies'], difficulty:['1'], order:['4'], loc:['Unknown', '0', '0'], tags:['tag1, tag2'], photos:[], hints:['hint 1', 'hint 2']};

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Person object', function(){
      var t = new Treasure(obj);
      expect(t).to.be.instanceof(Treasure);
      expect(t.name).to.equal('Rubies');
      expect(t.difficulty).to.equal(1);
      expect(t.order).to.equal(4);
      expect(t.loc.name).to.equal('Unknown');
      expect(t.loc.lat).to.equal(0);
      expect(t.loc.lng).to.equal(0);
      expect(t.tags).to.have.length(2);
      expect(t.tags[1]).to.equal('tag2');
      expect(t.photos).to.have.length(0);
      expect(t.hints).to.have.length(2);
      expect(t.hints[0]).to.equal('hint 1');
      expect(t.isFound).to.equal(false);
    });
  });

  describe('.query', function(){
    it('should get all treasures', function(done){
      Treasure.query({}, {}, function(err, treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a treasure object by it\'s ID', function(done){
      Treasure.findById(oid, function(err, t){
        expect(t._id.toString()).to.equal(oid);
        done();
      });
    });
  });

  describe('.found', function(){
    it('should update a treasures isFound property to true', function(done){
      Treasure.found(oid, function(){
        Treasure.findById(oid, function(err, t){
          expect(t.isFound).to.equal(true);
          done();
        });
      });
    });
  });

  describe('#save', function(){
    it('should save the object in the databse', function(done){
      var t = new Treasure(obj);
      t.save(function(){
        expect(t._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

});

