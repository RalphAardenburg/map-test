// initialize the map and set its view to our chosen geographical coordinates and a zoom level:
var map = L.map('map').setView([52.527684, 4.639624], 14);

// er geldt een use policy voor deze tiles, niet zeker of dit gebruikt kan worden in de game?
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);  
