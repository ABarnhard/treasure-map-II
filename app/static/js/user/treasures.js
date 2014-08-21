/* jshint unused:false, camelcase:false */
/* global AmCharts:true, google:true, _:true */

(function(){
  'use strict';

  var map,
      directionsDisplay;

  $(document).ready(function(){
    directionsDisplay = new google.maps.DirectionsRenderer();
    initMap(39.8282, -98.5795, 4);
    directionsDisplay.setMap(map);
    var locations = getLocations();
    // console.log(locations);
    calcRoute(locations);
  });

  function initMap(lat, lng, zoom){
    var styles = [{'featureType':'landscape','stylers':[{'hue':'#F1FF00'},{'saturation':-27.4},{'lightness':9.4},{'gamma':1}]},{'featureType':'road.highway','stylers':[{'hue':'#0099FF'},{'saturation':-20},{'lightness':36.4},{'gamma':1}]},{'featureType':'road.arterial','stylers':[{'hue':'#00FF4F'},{'saturation':0},{'lightness':0},{'gamma':1}]},{'featureType':'road.local','stylers':[{'hue':'#FFB300'},{'saturation':-38},{'lightness':11.2},{'gamma':1}]},{'featureType':'water','stylers':[{'hue':'#00B6FF'},{'saturation':4.2},{'lightness':-63.4},{'gamma':1}]},{'featureType':'poi','stylers':[{'hue':'#9FFF00'},{'saturation':0},{'lightness':0},{'gamma':1}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles, icon:'/img/flag.png'};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function calcRoute(locs){
    var directionsService = new google.maps.DirectionsService(),
        start = _.min(locs, 'order'),
        end = _.max(locs, 'order'),
        waypts = _.cloneDeep(locs);
    // console.log('start', start);
    // console.log('end', end);
    // remove the starting location
    _.remove(waypts, function(point){
      return point.order === start.order;
    });
    // remove the end location
    _.remove(waypts, function(point){
      return point.order === end.order;
    });
    // sort first to last based on order
    waypts.sort(function(a, b){
      return a.order - b.order;
    });
    // convert points array to waypoints array
    waypts = waypts.map(function(p){
      return {location:p.name, stopover:true};
    });
    // create request object
    var request = {
      origin: start.name,
      destination: end.name,
      waypoints: waypts,
      optimizeWaypoints: false,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status){
      if (status === google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);
      }
    });
  }

  function getLocations(){
    var locations = $('table tbody tr').toArray().map(function(o){
      var loc = {};
      loc.name = $(o).attr('data-name');
      loc.lat = parseFloat($(o).attr('data-lat'));
      loc.lng = parseFloat($(o).attr('data-lng'));
      loc.order = parseInt($(o).attr('data-order'));
      // console.log(loc);
      return loc;
    });
    // console.log(locations);
    return locations;
  }

})();
