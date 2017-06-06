var lugares = [
	{
		"nombre": "Fonda Fina",
		"coords": {"latitude": 19.418089,"longitude": -99.166342},
		"foto": "https://www.priceless.com/content/dam/priceless/offers/2016/07/1/9145/logo/1/Mechant_Logo.jpg",
        "direccion": "Medellín 79, Roma Nte., 06700 CDMX",
        "indice" : 0
	},
    
    {
		"nombre": "Chuchito Pérez",
		"coords": {"latitude": 19.420119,"longitude": -99.165543},
		"foto": "https://www.priceless.com/content/dam/priceless/offers/2015/04/2/2665/logo/1/chuchito_Mechant_Logo%20(2).jpg",
        "direccion": "Durango 187, Cuauhtémoc, Roma Nte., 06700 CDM",
        "indice" : 1
	},
    
    {
		"nombre": "La Tecla",
		"coords": {"latitude": 19.419832,"longitude": -99.165531},
		"foto": "https://www.queremoscomer.rest/img/logos/Logo_tecla_57506587a00ec.png",
        "direccion": "Durango 186, Cuauhtémoc, Roma Norte, Roma Nte., 06700 CDMX",
        "indice" : 2
	},
    
    {
		"nombre": "Rosetta",
		"coords": {"latitude": 19.419867, "longitude": -99.159831},
		"foto": "http://acuyo.mx/wp-content/uploads/2016/03/Rosetta_C.png",
        "direccion": "Calle Colima, 166, Delegación Cuauhtémoc, Col. Roma Norte, Roma Nte., 06700 CDMX", 
        "indice" : 3
	},
    
    {
		"nombre": "Papa Guapa",
		"coords": {"latitude": 19.419009,"longitude": -99.166946},
		"foto": "http://papaguapa.com/images/papa_logo1.png",
        "direccion": "Av Oaxaca 80, Cuauhtemoc, Roma Norte, Roma Nte., 06700 CDMX",
        "indice" : 4
	},
];

var indiceRestaurantes = 4;

var cargarPagina = function(){
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(mostrarPosicion);
	} else {
		alert("Actualice su navegador");
	}
    
    $('.modal').modal();
    imprimir(lugares);
    $("#busqueda").keyup(filtrarLugares);
    //$(".ubicacion-mapa").click(coordenadasLugar);
    $(document).on("click", ".ubicacion-mapa", coordenadasLugar);
    $("#modalRestaurantes").submit(nuevoRestaurante);
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
	lugares.forEach(function (lugar) {
		plantillaFinal += plantilla.replace("__indice__", lugar.indice)
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

var nuevoRestaurante = function(){
    indiceRestaurantes++;
    lugares[indiceRestaurantes].nombre = $("#nombreRestaurante").val();
    console.log(lugares[indiceRestaurantes].nombre);
};


$(document).ready(cargarPagina);