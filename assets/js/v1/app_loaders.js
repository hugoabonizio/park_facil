// Loads a list of street parking lots
function loadLots(google, map) {
    var parquimetros = {};

    $.getJSON('/app/parquimetros', function (result) {
        var infos = [];
        $.each(result, function (i, lot) {
            var infowindow = new google.maps.InfoWindow({
                content: "Vagas livres: " + lot.vagasLivres + "<br>Vagas Gerenciadas: "+lot.vagas+".<br>Percentual de confiabilidade: 80%"
            });
            infos.push(infowindow);
            var marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(lot.lat),
                    lng: parseFloat(lot.lng)
                },
                map: map,
                title: 'Parquimetro',
                icon: '../../../images/icons/lot.png'
            });

            var red = parseInt((lot.vagas - lot.vagasLivres)/lot.vagas*255);
            var green = parseInt(lot.vagasLivres/lot.vagas*255);
            // Add circle overlay and bind to marker
            var circle = new google.maps.Circle({
                map: map,
                radius: 75,    // 10 miles in metres
                fillColor: 'rgb('+red+','+green+', 0)'
            });
            circle.bindTo('center', marker, 'position');

            google.maps.event.addListener(circle, 'click', function () {
                infos.forEach(function (window) { window.close(); });
                infowindow.open(map, marker);
            });

            marker._vagas = lot.vagasLivres;
            parquimetros[lot.id] = marker;
        });

        var mc = new MarkerClusterer(map, values(parquimetros));
    });
};

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
        icon: '../../../images/icons/park.png'
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
