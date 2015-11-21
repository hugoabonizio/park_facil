/**
* http://en.marnoto.com/2014/09/5-formas-de-personalizar-infowindow.html
*/

function initMap() {

  navigator.geolocation.getCurrentPosition(function (pos) {
    // console.log(pos.coords.latitude, pos.coords.longitude);
    map.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  });
  
  var mapProp = {
    center: new google.maps.LatLng(-23.304452400000002, -51.169582399999996),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    styles: styles
  };
  var map = new google.maps.Map(document.getElementById("map"), mapProp);
  var parkings = [];
  
  // Loads a list of parking places around
  function loadParkings() {
    $.getJSON('/app/parkings', function (result) {
      var infos = [];
      $.each(result, function (i, park) {
        var infowindow = new google.maps.InfoWindow({
          content: "<strong>" + park.name + "</strong><br>Preço: R$4,99<br><a href='#'>Visualizar</a>"
        });
        infos.push(infowindow);
        
        var marker = new google.maps.Marker({
          position: {
            lat: parseFloat(park.latitude),
            lng: parseFloat(park.longitude)
          },
          map: map,
          title: park.name
        });
        parkings.push(marker);
        
        google.maps.event.addListener(marker, 'click', function () {
          infos.forEach(function (window) { window.close(); });
          infowindow.open(map, marker);
        });
      });
      
      var mc = new MarkerClusterer(map, parkings);
      
    });
  }
  loadParkings();
  
  var input = document.getElementById('search-box');
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  
  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  
}


// if (window.google) {
//     window.google.maps.event.addDomListener(window, 'load', initMap);
// }