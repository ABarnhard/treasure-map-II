'use strict';

var _ = require('lodash');

exports.url = function(query, key, value, text){
  var q    = _.cloneDeep(query),
      link = '<a href="/treasures?';

  q[key] = value;
  var properties = Object.keys(q).map(function(prop){
    return prop + '=' + q[prop];
  });

  link += properties.join('&');
  link += '">' + text + '</a>';
  return link;
};

exports.tags = function(query, tags){
  var links = tags.map(function(tag){
    return exports.url({}, 'tag', tag, tag);
  });

  return links.join(', ');
};

exports.sort = function(query, name, display){
  var order = query.order ? query.order * -1 : 1,
      tag = query.tag ? '&tag=' + query.tag : '',
      link = '<a href="/treasures?sort=' + name + '&order=' + order + tag + '">'+display+'</a>';
  return link;
};

exports.difficulty = function(dif){
  switch(dif){
    case 1:
      return 'Easy';
    case 2:
      return 'Medium';
    case 3:
      return 'Hard';
    default:
      return 'INSANE';
  }
};

exports.allowLink = function(t){
  var s = t.name;
  if(t.isLinkable){
    var display = t.isFound ? '<img src="/img/pirate-flag.png" height="30px" width="30px" alt="yarr!" title="yarr!" />' : t.name;
    s = '<a href="/treasures/'+t._id+'">'+display+'</a>';
  }
  return s;
};

exports.displayFound = function(found){
  var img = found ? 'open-chest.png' : 'closed-chest.png';
  return '<img src="/img/'+img+'" height="50px" width="50px" />';
};
