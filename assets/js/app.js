var lugares = [
	{
		"nombre": "Fonda Fina",
		"coords": {"latitude": 19.418089,"longitude": -99.166342},
		"foto": "http://via.placeholder.com/550x550",
        "direccion": "Medellín 79, Roma Nte., 06700 CDMX"
	},
    
    {
		"nombre": "Chuchito Pérez",
		"coords": {"latitude": 19.420119,"longitude": -99.165543},
		"foto": "http://via.placeholder.com/550x550",
        "direccion": "Durango 187, Cuauhtémoc, Roma Nte., 06700 CDM"
	},
    
    {
		"nombre": "La Tecla",
		"coords": {"latitude": 19.419832,"longitude": -99.165531},
		"foto": "http://via.placeholder.com/550x550",
        "direccion": "Durango 186, Cuauhtémoc, Roma Norte, Roma Nte., 06700 CDMX"
	},
    
    {
		"nombre": "Rosetta",
		"coords": {"latitude": 19.419867, "longitude": -99.159831},
		"foto": "http://via.placeholder.com/550x550",
        "direccion": "Calle Colima, 166, Delegación Cuauhtémoc, Col. Roma Norte, Roma Nte., 06700 CDMX"
	},
    
    {
		"nombre": "Papa Guapa",
		"coords": {"latitude": 19.419009,"longitude": -99.166946},
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
    $("#busqueda").submit(filtrarLugares);
    $(".ubicacion-mapa").click(coordenadasLugar);
};

var plantilla = '<div class="row card">' +
            '<div class="purple lighten-5 cards-content">' +
                '<div class="row valign-wrapper margin-bottom">' +
                    '<div class="col s4">' +
                        '<img class="responsive-img" src="__foto__">' +
                    '</div>' +
                    '<div class="col s8">' +
                        '<h5 class="ubicacion-mapa" data-indice="__indice__">__nombre__</h5>' +
                        '<p class="flow-text"><i class="material-icons">room</i> __direccion__</p>' +
                    '</div>' +
                '</div>' +
		    '</div>' +
	    '</div>';


var imprimir = function (lugares) {
	var plantillaFinal = "";
	lugares.forEach(function (lugar, indice) {
		plantillaFinal += plantilla.replace("__indice__", indice)
            .replace("__nombre__", lugar.nombre)
			.replace("__numero__", lugar.numero)
			.replace("__foto__", lugar.foto)
            .replace("__direccion__", lugar.direccion);
	});
	$(".restaurantes").html(plantillaFinal);
};


var mostrarPosicion = function (lugar) {
	var coordenadas = {
		lat: lugar.coords.latitude, 
		lng: lugar.coords.longitude
	};
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
};

var filtrarLugares = function (e) {
	e.preventDefault();
	var criterioBusqueda = $("#buscar").val().toLowerCase();
	var lugaresFiltrados = lugares.filter(function (lugar) {
		return lugar.nombre.toLowerCase().indexOf(criterioBusqueda) >= 0;
	});
	imprimir(lugaresFiltrados);
};

var coordenadasLugar = function(){
    var indice = Number($(this).data("indice"));
    console.log(indice);
    var coordenadas = {
		lat: lugares[indice].coords.latitude, 
		lng: lugares[indice].coords.longitude
	};
    mostrarMapa(coordenadas);
};


$(document).ready(cargarPagina);