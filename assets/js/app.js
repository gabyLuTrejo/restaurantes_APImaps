var cargarPagina = function(){
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarPosicion);
	} else {
		alert("Actualice su navegador");
	}
};

var mostrarPosicion = function (posicion) {
	var coordenadas = {
		lat: posicion.coords.latitude, 
		lng: posicion.coords.longitude
	};
    console.log(posicion.coords.latitude);
	mostrarMapa(coordenadas);
};

var mostrarMapa = function (coordenadas) {
	var map = new google.maps.Map($('#mapa')[0], {
      zoom: 17,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: map
    });
}


$(document).ready(cargarPagina);