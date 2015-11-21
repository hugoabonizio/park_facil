// Loads a list of street parking lots
function loadLots(google, map) {
  var lots = {};
  
  $.getJSON('/app/lots', function (result) {
    $.each(result, function (i, lot) {
      var marker = new google.maps.Marker({
        position: {
          lat: parseFloat(lot.lat),
          lng: parseFloat(lot.lng)
        },
        map: map,
        title: '',
        icon: '../../images/icons/lot.png'
      });
      lots[lot.id] = marker;
      if (!lot.status)
        marker.setMap(null);
    });
    
    var mc = new MarkerClusterer(map, values(lots));
    
    setInterval(function () {
      $.getJSON('/app/lots', function (result) {
        $.each(result, function (i, lot) {
          if (lot.status) {
            lots[lot.id].setMap(null);
          } else {
            lots[lot.id].setMap(map);
          }
        });
        mc.resetViewport();
        mc.redraw();
      });
    }, 3000);
  });
}

// Loads a list of parking places around
function loadParkings(google, map) {
  var parkings = [];
  
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
        title: park.name,
        icon: '../../images/icons/park.png'
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