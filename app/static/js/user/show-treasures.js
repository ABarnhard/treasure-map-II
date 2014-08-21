/* jshint unused:false, camelcase:false */
/* global AmCharts:true, google:true */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    var p = getPosition();
    initMap(p.lat, p.lng, 10);
    addMarker(p.lat, p.lng, p.name);
  });

  function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP, icon: '/img/flag.png'});
  }

  function getPosition(){
    var pos = {};
    pos.name = $('#map').attr('data-name');
    pos.lat = parseFloat($('#map').attr('data-lat'));
    pos.lng = parseFloat($('#map').attr('data-lng'));
    // console.log(pos);
    return pos;
  }

  function initMap(lat, lng, zoom){
    var styles = [{'featureType':'landscape','stylers':[{'hue':'#F1FF00'},{'saturation':-27.4},{'lightness':9.4},{'gamma':1}]},{'featureType':'road.highway','stylers':[{'hue':'#0099FF'},{'saturation':-20},{'lightness':36.4},{'gamma':1}]},{'featureType':'road.arterial','stylers':[{'hue':'#00FF4F'},{'saturation':0},{'lightness':0},{'gamma':1}]},{'featureType':'road.local','stylers':[{'hue':'#FFB300'},{'saturation':-38},{'lightness':11.2},{'gamma':1}]},{'featureType':'water','stylers':[{'hue':'#00B6FF'},{'saturation':4.2},{'lightness':-63.4},{'gamma':1}]},{'featureType':'poi','stylers':[{'hue':'#9FFF00'},{'saturation':0},{'lightness':0},{'gamma':1}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

})();
