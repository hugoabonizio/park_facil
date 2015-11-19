/**
* http://en.marnoto.com/2014/09/5-formas-de-personalizar-infowindow.html
*/

function initMap() {

  navigator.geolocation.getCurrentPosition(function (pos) {
    console.log(pos.coords.latitude, pos.coords.longitude);
    map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  });
  
  var mapProp = {
    center: new google.maps.LatLng(-23.304452400000002 -51.169582399999996),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapProp);
}


// if (window.google) {
//     window.google.maps.event.addDomListener(window, 'load', initialize);
// }