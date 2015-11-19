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
      
      google.maps.event.addListener(marker, 'click', function () {
        infos.forEach(function (window) { window.close(); });
        infowindow.open(map, marker);
      });
      
    });
  });
}


// if (window.google) {
//     window.google.maps.event.addDomListener(window, 'load', initMap);
// }