var lugares = [
	{
		"nombre": "Fonda Fina",
		"coordenadas": {"lat": "19.418089,","long": "-99.166342"},
		"foto": "http://via.placeholder.com/550x550",
        "direccion": "Medellín 79, Roma Nte., 06700 CDMX"
	},
    
    {
		"nombre": "Chuchito Pérez",
		"coordenadas": {"lat": "19.420119","long": "-99.165543"},
		"foto": "http://via.placeholder.com/550x550",
        "direccion": "Durango 187, Cuauhtémoc, Roma Nte., 06700 CDM"
	},
    
    {
		"nombre": "La Tecla",
		"coordenadas": {"lat": "19.419832","long": "-99.165531"},
		"foto": "http://via.placeholder.com/550x550",
        "direccion": "Durango 186, Cuauhtémoc, Roma Norte, Roma Nte., 06700 CDMX"
	},
    
    {
		"nombre": "Rosetta",
		"coordenadas": {"lat": "19.419891","long": "-99.160539"},
		"foto": "http://via.placeholder.com/550x550",
        "direccion": "Calle Colima, 166, Delegación Cuauhtémoc, Col. Roma Norte, Roma Nte., 06700 CDMX"
	},
    
    {
		"nombre": "Papa Guapa",
		"coordenadas": {"lat": "19.419009","long": "-99.166946"},
		"foto": "http://via.placeholder.com/550x550",
        "direccion": "Av Oaxaca 80, Cuauhtemoc, Roma Norte, Roma Nte., 06700 CDMX"
	},
];



var cargarPagina = function(){
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarPosicion);
	} else {
		alert("Actualice su navegador");
	}
    
    imprimir(lugares);
};

var plantilla = '<div class="row card">' +
            '<div class="purple lighten-5 cards-content">' +
                '<div class="row valign-wrapper margin-bottom">' +
                    '<div class="col s4">' +
                        '<img class="responsive-img" src="__foto__">' +
                    '</div>' +
                    '<div class="col s8">' +
                        '<h5>__nombre__</h5>' +
                        '<p class="flow-text"><i class="material-icons">room</i> __direccion__</p>' +
                    '</div>' +
                '</div>' +
		    '</div>' +
	    '</div>';


var imprimir = function (lugares) {
	var plantillaFinal = "";
	lugares.forEach(function (lugar) {
		plantillaFinal += plantilla.replace("__nombre__", lugar.nombre)
			.replace("__numero__", lugar.numero)
			.replace("__foto__", lugar.foto)
            .replace("__direccion__", lugar.direccion);
	});
	$(".restaurantes").html(plantillaFinal);
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