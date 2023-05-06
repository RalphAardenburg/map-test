// functie voor wanneer coordinaten succesvol worden opgehaald
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //const accuracy = position.coords.accuracy;

    //verwijder de marker indien deze al bestaat en plaats een marker voor de huidige positie
    if (markerPlayer) {
        map.removeLayer(markerPlayer)
    }
    if (markerWolfA) {
        map.removeLayer(markerWolfA)
    }
    if (markerWolfB) {
        map.removeLayer(markerWolfB)
    }
    
    //plaats de markers op de kaart
    markerPlayer = L.marker([latitude, longitude]).addTo(map);
    markerWolfA.addTo(map);
    markerWolfB.addTo(map);

    //bereken de afstand tot de medespelers
    let distancePlayerWolfA = Math.round(map.distance(markerPlayer.getLatLng(), markerWolfA.getLatLng()));
    let distancePlayerWolfB = Math.round(map.distance(markerPlayer.getLatLng(), markerWolfB.getLatLng()));
    
    //bereken de afstand van de speler tot de Prey
    let distancePlayerPrey = Math.round(map.distance(markerPlayer.getLatLng(),markerPrey.getLatLng()));

    //bereken de afstand van de medespelers tot de Prey
    let distanceWolfAPrey = Math.round(map.distance(markerWolfA.getLatLng(),markerPrey.getLatLng()));
    let distanceWolfBPrey = Math.round(map.distance(markerWolfB.getLatLng(),markerPrey.getLatLng()));

    //geef de speler een tekstballon met info mbt afstand tot de Prey
    markerPlayer.bindPopup(distancePlayerPrey + " m to Prey", {closeOnClick: false, autoClose: false, autoPan: false}).openPopup();

    //geef de medespelers tekstballonnen met info mbt afstand tot de speler en de Prey
    markerWolfA.bindPopup("WolfA " + distancePlayerWolfA + " m and " + distanceWolfAPrey + " m to Prey", {closeOnClick: false, autoClose: false, autoPan: false}).openPopup();
    markerWolfB.bindPopup("WolfB " + distancePlayerWolfB + " m and " + distanceWolfBPrey + " m to Prey", {closeOnClick: false, autoClose: false, autoPan: false}).openPopup();

    //presenteer de marker van de prey wanneer de speler < 20m afstand is
    if (distancePlayerPrey <= 20) {
        markerPrey.addTo(map);
        markerPrey.bindPopup("You have found the Prey", {closeOnClick: false, autoClose: false, autoPane: false}).openPopup();
    }
    //alleen voor testen
    console.log(distancePlayerPrey, distancePlayerWolfA, distancePlayerWolfB)
}

// functie voor wanneer coordinaten niet kunnen worden opgehaald
function error() {
    alert("Sorry, no position available.")
}

// opties voor ophalen locatie
const options = {
    enableHighAccuracy: true,
    maximumAge: 2000,
    timeout: 10000,
};

// initialize the map and set its view to our chosen geographical coordinates and a zoom level:
var map = L.map('map').setView([52.527684, 4.639624], 7);

// er geldt een usage policy voor deze tiles, niet zeker of dit gebruikt kan worden in de game?
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);  

// haal eenmalig gps data op, dit wordt gebruikt om eenmalig de kaart te centreren
if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
} else {
    navigator.geolocation.getCurrentPosition((position) => {
        map.setView([position.coords.latitude, position.coords.longitude], 15);
    }, error);
}

// creeer een icon voor een wolf op de kaart
var wolfIcon = L.icon({
    iconUrl: 'wolf-picture.png',

    iconSize:     [25, 40], // size of the icon
//    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

// declare markerPlayer as a global variable
var markerPlayer;

// plaats testspelers (wolves) op de kaart
var markerWolfA = L.marker([52.519746, 4.683202], {icon: wolfIcon});
var markerWolfB = L.marker([52.518275, 4.685414], {icon: wolfIcon});

// stel coordinaten in voor de statische 'Prey'
var markerPrey = L.marker([52.516446, 4.686901]);

//volg geolocatie
navigator.geolocation.watchPosition(success, error, options);

