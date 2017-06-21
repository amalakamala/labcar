function initMap(){
   	var map = new google.maps.Map(document.getElementById("map"),{
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: true,
		streetViewControl: true,
	});



	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}

	window.addEventListener("load", buscar);

	var latitud, longitud;

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map,

		});

		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});
	}

	var funcionError = function(error){
		alert("tenemos un problema con encontrar tu ubicación");
	}

	/* AUTOCOMPRETADO INPUT */
	var inputO = (document.getElementById('origen'));
	var autocomplete = new google.maps.places.Autocomplete(inputO);
        autocomplete.bindTo('bounds', map);

    var inputD = (document.getElementById('destino'));
	var autocomplete = new google.maps.places.Autocomplete(inputD);
        autocomplete.bindTo('bounds', map);


    /* 
	DirectionsService: Este objeto se comunica con el servicio de indicaciones de la Google Maps API, el cual recibe solicitudes de indicaciones y devuelve resultados computados.
	directionsDisplay : Indicaciones
     */
	var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    	

	//LLAMAR ID DE ENTRADAS	
	document.getElementById('origen').addEventListener('change', onChangeHandler);
	document.getElementById('destino').addEventListener('change', onChangeHandler);


	function carcularYTrazarRuta(directionsService, directionsDisplay) {
        directionsService.route({
        	origin: document.getElementById('origen').value,
	        destination: document.getElementById('destino').value,
	        travelMode: 'DRIVING'
	        }, 
	    function(response, status) {
	     	if (status === 'OK') {
	        	directionsDisplay.setDirections(response);
	      	} else {
	            window.alert('No se encontro la ruta ' + status);
	        }
	    });
	}	


	//function calcula distancia y presio
	function calcRoute() {
			var start = document.getElementById("origen").value;
			var end = document.getElementById("destino").value;
			var distanceInput = document.getElementById("output");
			
			var request = {
				origin:start, 
				destination:end,
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
			
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);					
					var costoDistancia = (response.routes[0].legs[0].distance.value / 1000) * 500;
					var laCaja = document.createElement("div");
					laCaja.setAttribute("class","costos");
					var valorCaja = document.createTextNode("$  " + costoDistancia);
					laCaja.appendChild(valorCaja);
					distanceInput.appendChild(laCaja);
				}
			});
	}



	// onChangeHandler = Controlador de Cambios
	directionsDisplay.setMap(map);
	var onChangeHandler = function(){
		carcularYTrazarRuta(directionsService, directionsDisplay);
		calcRoute();
	};  
		
	document.getElementById("ruta").addEventListener("click",onChangeHandler); 

}




//MENU MOVIL
var menu = document.getElementById("menu");

menu.addEventListener("click",function(){
	var elnav = document.getElementById("nav");
	elnav.classList.toggle("menu-nav");


})

