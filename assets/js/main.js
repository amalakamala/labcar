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

	document.getElementById("encuentrame").addEventListener("click", buscar);
	var latitud, longitud;

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var image = 'assets/img/custom-bici.png';

		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map,
			icon: image
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
	
	// onChangeHandler = Controlador de Cambios
	directionsDisplay.setMap(map);
	var onChangeHandler = function(){
		carcularYTrazarRuta(directionsService, directionsDisplay);
	};  
		
	document.getElementById("ruta").addEventListener("click",onChangeHandler); 
}

