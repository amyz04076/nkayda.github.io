var map = L.map('map').setView([49.2561, -122.826], 12);
// MAPTILER API FOR CUSTOM STYLING
const mtLayer = L.maptiler.maptilerLayer({
        apiKey: apikey(),
        style: L.maptiler.MapStyle.DATAVIZ.LIGHT
      }).addTo(map);


// STATION MARKERS
var markerData = [
    // opened in 2002
    ['Sapperton Station', 49.22443, -122.88283],
    ['Braid Station', 49.23322, -122.88283],
    ['Lougheed Town Centre Station', 49.24846, -122.89702],
    ['Production Way-University Station', 49.25337, -122.91815],
    ['Sperling-Burnaby Lake Station', 49.25914, -122.96391],
    ['Holdom Station', 49.26469, -122.98222],
    ['Brentwood Town Centre', 49.26633, -123.00163],
    ['Gilmore', 49.26489, -123.01351],
    ['Rupert Station', 49.260833, -123.032778],
    ['Renfrew Station', 49.258889, -123.045278],
    ['Commercial–Broadway', 49.2625, -123.068889],

    // opened in 2003
    ['Lake City Way', 49.25458, -122.93903],

    // opened in 2006
    ['VCC–Clark', 49.265753, -123.078825],

    // opened in 2016 – Evergreen Extension
    ['Burquitlam Station', 49.261389, -122.889722],
    ['Moody Centre Station', 49.27806, -122.84579],
    ['Inlet Centre Station', 49.277222, -122.827778],
    ['Coquitlam Central Station', 49.273889, -122.8],
    ['Lincoln Station', 49.280425, -122.793915],
    ['Lafarge Lake–Douglas Station', 49.285556, -122.791667],

]

for (let i = 0; i < markerData.length; i++) {
    var currMarkerData = markerData[i];
    var marker = L.marker([currMarkerData[1], currMarkerData[2]]).addTo(map);
    marker.bindPopup(currMarkerData[0]);
}

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

var skytrainRoute = L.polyline(latlngs, {color: 'blue'}).addTo(map);
var evergreenRoute = L.polyline(evergreen, {color: 'blue'}).addTo(map);