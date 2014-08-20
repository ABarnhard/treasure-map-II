/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure  = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasure-map-test',
    obj       = {name:'Rubies', difficulty:'1', order:'4', loc:{name:'Unknown', lat:'0', lng:'0'}, tags:'tag1, tag2', photos:[], hints:{1:'hint 1', 2:'hint 2'}};

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
});

