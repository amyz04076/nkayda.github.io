var map = L.map('map').setView([49.2561, -122.826], 12);
// MAPTILER API FOR CUSTOM STYLING
const mtLayer = L.maptiler.maptilerLayer({
        apiKey: apikey(),
        style: L.maptiler.MapStyle.DATAVIZ.LIGHT
      }).addTo(map);


// STATION MARKERS
var markerData = [
    // opened in 2002
    {name:'Sapperton Station', openDate: 2002, x: 49.22443, y: -122.88283, color: '#FFD200'},
    {name:'Braid Station', openDate: 2002, x: 49.23322, y:-122.88283, color: '#FFD200'},
    {name:'Lougheed Town Centre Station',openDate: 2002, x: 49.24846, y:-122.89702, color: '#FFD200'},
    {name:'Production Way-University Station', openDate: 2002, x: 49.25337, y:-122.91815, color: '#FFD200'},
    {name:'Sperling-Burnaby Lake Station', openDate: 2002, x: 49.25914, y:-122.96391, color: '#FFD200'},
    {name:'Holdom Station', openDate: 2002, x: 49.26469, y: -122.98222, color: '#FFD200'},
    {name:'Brentwood Town Centre', openDate: 2002, x: 49.26633, y: -123.00163, color: '#FFD200'},
    {name:'Gilmore', openDate: 2002, x: 49.26489, y: -123.01351, color: '#FFD200'},
    {name:'Rupert Station', openDate: 2002, x: 49.260833, y: -123.032778, color: '#FFD200'},
    {name:'Renfrew Station', openDate: 2002, x: 49.258889, y: -123.045278, color: '#FFD200'},
    {nave:'Commercial–Broadway', openDate: 2002, x: 49.2625, y: -123.068889, color: '#FFD200'},

    // opened in 2003
    {name:'Lake City Way', openDate: 2003, x: 49.25458, y: -122.93903, color: '#FFD200'},

    // opened in 2006
    {name:'VCC–Clark', openDate: 2006, x: 49.265753, y:-123.078825, color: '#FFD200'},

    // opened in 2016 – Evergreen Extension
    {name:'Burquitlam Station', openDate: 2016, x:49.261389, y:-122.889722, color: '#FFD200'},
    {name:'Moody Centre Station', openDate: 2016, x: 49.27806, y: -122.84579, color: '#FFD200'},
    {name:'Inlet Centre Station', openDate: 2016, x: 49.277222, y: -122.827778, color: '#FFD200'},
    {name:'Coquitlam Central Station', openDate: 2016, x:49.273889, y: -122.8, color: '#FFD200'},
    {name:'Lincoln Station', openDate: 2016, x: 49.280425, y: -122.793915, color: '#FFD200'},
    {name:'Lafarge Lake–Douglas Station', openDate: 2016, x: 49.285556, y: -122.791667, color: '#FFD200'},

]

var latlngs = [
    [49.22443, -122.88283], // Sapperton
    [49.23322, -122.88283],
    [49.24846, -122.89702],
    [49.25337, -122.91815],
    [49.25458, -122.93903], // Lake City Way
    [49.25914, -122.96391],
    [49.26469, -122.98222],
    [49.26633, -123.00163],
    [49.26489, -123.01351],
    [49.260833, -123.032778],
    [49.258889, -123.045278],
    [49.2625, -123.068889],
    [49.265753, -123.078825] // VCC-Clark
];

var evergreen = [
    [49.24846, -122.89702],
    [49.261389, -122.889722],
    [49.27806, -122.84579],
    [49.277222, -122.827778],
    [49.273889, -122.8],
    [49.280425, -122.793915],
    [49.285556, -122.791667],
]

var skytrainRoute = L.polyline(latlngs, {color: '#FFD200', weight: 5}).addTo(map);
var evergreenRoute = L.polyline(evergreen, {color: '#FFD200', weight: 5}).addTo(map);

var yearSlider = document.getElementById("years_slider");
var year = yearSlider.value;


var markers = [];

// Initiates map with default values
for (let i = 0; i < markerData.length; i++) {
    var currMarkerData = markerData[i];
    if(currMarkerData.openDate <= year){
        var marker = L.circleMarker([currMarkerData.x, currMarkerData.y], {radius: 10, color: currMarkerData.color, fillColor: 'white', fillOpacity: 1, weight: 5}).addTo(map);
        marker.bindPopup(`${currMarkerData.name} \n ${currMarkerData.openDate}`);
        markers.push(marker);
    }
}

// When slider changes, updates the displayed ones
yearSlider.oninput = function() {
    year = this.value;
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    for (let i = 0; i < markerData.length; i++) {
        var currMarkerData = markerData[i];
        if(currMarkerData.openDate <= year){
            var marker = L.circleMarker([currMarkerData.x, currMarkerData.y], {radius: 10, color: currMarkerData.color, fillColor: 'white', fillOpacity: 1, weight: 5}).addTo(map);
            marker.bindPopup(`${currMarkerData.name} \n ${currMarkerData.openDate}`);
            markers.push(marker);
        }
    }
}
