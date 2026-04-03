var map = L.map('map').setView([49.2561, -122.826], 12);

// MAPTILER API FOR CUSTOM STYLING
const mtLayer = L.maptiler.maptilerLayer({
        apiKey: apikey(),
        style: L.maptiler.MapStyle.DATAVIZ.LIGHT
      }).addTo(map);

/*  ///     YEAR SLIDER      ///*/
var yearSlider = document.getElementById("years_slider");
var year = yearSlider.value;

var markers = [];
var stationMarkers = L.layerGroup().addTo(map);

/*  ///     EXPO LINE      ///*/
var expoStations = [
    {name:'Waterfront Station', openDate: 1914, x: 49.285833, y: -123.111667, color: '#005DAA'},
    {name:'Burrard Station', openDate: 1985, x: 49.285616, y: -123.120157, color: '#005DAA'},
    {name:'Granville Station', openDate: 1985, x: 49.28275, y: -123.116639, color: '#005DAA'},
    {name:'Stadium–Chinatown Station', openDate: 1990, x: 49.279444, y: -123.109444, color: '#005DAA'},
    {name:'Main Street–Science World Station', openDate: 1985, x: 49.273114, y: -123.100348, color: '#005DAA'},
    {name:'Commercial–Broadway Station', openDate: 1985, x: 49.2625, y: -123.068889, color: '#005DAA'},
    {name:'Nanaimo Station', openDate: 1985, x: 49.248184, y: -123.05564, color: '#005DAA'},
    {name:'29th Avenue Station', openDate: 1985, x: 49.244084, y: -123.045931, color: '#005DAA'},
    {name:'Joyce–Collingwood Station', openDate: 1985, x: 49.23835, y: -123.031704, color: '#005DAA'},
    {name:'Patterson Station', openDate: 1985, x: 49.22967, y: -123.012376, color: '#005DAA'},
    {name:'Metrotown Station', openDate: 1985, x: 49.225463, y: -123.003182, color: '#005DAA'},
    {name:'Royal Oak Station', openDate: 1985, x: 49.220004, y: -122.988381, color: '#005DAA'},
    {name:'Edmonds Station', openDate: 1985, x: 49.212054, y: -122.959226, color: '#005DAA'},
    {name:'22nd Street Station', openDate: 1985, x: 49.2, y: -122.949167, color: '#005DAA'},
    {name:'New Westminster Station', openDate: 1985, x: 49.201354, y: -122.912716, color: '#005DAA'},
    {name:'Columbia Station', openDate: 1985, x: 49.20476, y: -122.906161, color: '#005DAA'},
    {name:'Scott Road Station', openDate: 1990, x: 49.204444, y: -122.874167, color: '#005DAA'},
    {name:'Gateway Station', openDate: 1994, x: 49.198945, y: -122.850559, color: '#005DAA'},
    {name:'Surrey Central Station', openDate: 1994, x: 49.189473, y: -122.847871, color: '#005DAA'},
    {name:'King George Station', openDate: 1994, x: 49.1827, y: -122.8446, color: '#005DAA'},
]
var expoRoute = [];
expoStations.forEach((station) => {
    var coords = [station.x, station.y];
    expoRoute.push(coords);
})
var expoPolyLine = L.polyline(expoRoute, {color: '#005DAA', weight: 7}).addTo(map);

for (let i = 0; i < expoStations.length; i++) {
    var currMarkerData = expoStations[i];
    // if(currMarkerData.openDate <= year){
    var marker = L.circleMarker([currMarkerData.x, currMarkerData.y], {radius: 10, color: currMarkerData.color, fillColor: 'white', fillOpacity: 1, weight: 5}).addTo(map);
    marker.bindPopup(`${currMarkerData.name} \n ${currMarkerData.openDate}`);
    markers.push(marker);
    // }
}

var expoStations_extension;

if(year < 2016) { expoStations_extension = [
    {name:'Columbia Station', openDate: 1985, x: 49.20476, y: -122.906161, color: '#005DAA'},
    {name:'Sapperton Station', openDate: 2002, x: 49.22443, y: -122.88964, color: '#FFD200'},
    {name:'Braid Station', openDate: 2002, x: 49.23322, y: -122.88283, color: '#FFD200'},
    {name:'Lougheed Town Centre Station', openDate: 2002, x: 49.24846, y: -122.89702, color: '#FFD200'},
    {name:'Production Way-University Station', openDate: 2002, x: 49.25337, y:-122.91815, color: '#FFD200'},
]}
else{ expoStations_extension = [
    {name:'Columbia Station', openDate: 1985, x: 49.20476, y: -122.906161, color: '#005DAA'},
    {name:'Sapperton Station', openDate: 2002, x: 49.22443, y: -122.88964, color: '#005DAA'},
    {name:'Braid Station', openDate: 2002, x: 49.23322, y: -122.88283, color: '#005DAA'},
    {name:'Lougheed Town Centre Station', openDate: 2002, x: 49.24846, y: -122.89702, color: '#FFD200'},
    {name:'Production Way-University Station', openDate: 2002, x: 49.25337, y:-122.91815, color: '#FFD200'},
]}

// Route polyLine
var expoRoute_extension = [];
expoStations_extension.forEach((station) => {
    // if(station.openDate > year) return;
    expoRoute_extension.push([station.x, station.y]);
})
var expoPolyLine_extension;
if(year < 2016 && year >= 2002) {
    expoPolyLine_extension = L.polyline(expoRoute_extension, {color: '#FFD200', weight: 5});
    expoPolyLine_extension.addTo(map);
};
if(year >= 2016) {
    expoPolyLine_extension = L.polyline(expoRoute_extension, {color: '#005DAA', weight: 7});
    expoPolyLine_extension.addTo(map);
}

// Station Markers
for (let i = 0; i < expoStations_extension.length; i++) {
    var currMarkerData = expoStations_extension[i];
    if(currMarkerData.openDate <= year){
        var marker = L.circleMarker([currMarkerData.x, currMarkerData.y], {radius: 10, color: currMarkerData.color, fillColor: 'white', fillOpacity: 1, weight: 5}).addTo(stationMarkers);
        marker.bindPopup(`${currMarkerData.name} \n ${currMarkerData.openDate}`);
        markers.push(marker);
    }
}



/*  ///     MILLENNIUM LINE      ///*/
var millStations = [
    // opened in 2006
    {name:'VCC–Clark', openDate: 2006, x: 49.265753, y:-123.078825, color: '#FFD200'},

    // opened in 2002
    {name:'Commercial–Broadway', openDate: 2002, x: 49.2625, y: -123.068889, color: '#FFD200'},
    {name:'Renfrew Station', openDate: 2002, x: 49.258889, y: -123.045278, color: '#FFD200'},
    {name:'Rupert Station', openDate: 2002, x: 49.260833, y: -123.032778, color: '#FFD200'},
    {name:'Gilmore', openDate: 2002, x: 49.26489, y: -123.01351, color: '#FFD200'},
    {name:'Brentwood Town Centre', openDate: 2002, x: 49.26633, y: -123.00163, color: '#FFD200'},
    {name:'Holdom Station', openDate: 2002, x: 49.26469, y: -122.98222, color: '#FFD200'},
    {name:'Sperling-Burnaby Lake Station', openDate: 2002, x: 49.25914, y:-122.96391, color: '#FFD200'},
    {name:'Production Way-University Station', openDate: 2002, x: 49.25337, y:-122.91815, color: '#FFD200'},
    {name:'Lougheed Town Centre Station',openDate: 2002, x: 49.24846, y:-122.89702, color: '#FFD200'},

    // opened in 2016 – Evergreen Extension
    {name:'Burquitlam Station', openDate: 2016, x:49.261389, y:-122.889722, color: '#FFD200'},
    {name:'Moody Centre Station', openDate: 2016, x: 49.27806, y: -122.84579, color: '#FFD200'},
    {name:'Inlet Centre Station', openDate: 2016, x: 49.277222, y: -122.827778, color: '#FFD200'},
    {name:'Coquitlam Central Station', openDate: 2016, x:49.273889, y: -122.8, color: '#FFD200'},
    {name:'Lincoln Station', openDate: 2016, x: 49.280425, y: -122.793915, color: '#FFD200'},
    {name:'Lafarge Lake–Douglas Station', openDate: 2016, x: 49.285556, y: -122.791667, color: '#FFD200'},
]
// Route polyLine
var millRoute = [];
millStations.forEach((station) => {
    if(station.openDate > year) return;
    millRoute.push([station.x, station.y])
})
var millPolyLine = L.polyline(millRoute, {color: '#FFD200', weight: 5});


if(year >= 2002) {
    millPolyLine.addTo(map);
}
if(year >= 2016) {

    millRoute = [];
    millStations.forEach((station) => {
        if(station.openDate > year) return;
        millRoute.push([station.x, station.y])
    })
    map.removeLayer(millPolyLine);
    millPolyLine = L.polyline(millRoute, {color: '#FFD200', weight: 5}).addTo(map);
}

// Station Markers
for (let i = 0; i < millStations.length; i++) {
    var currMarkerData = millStations[i];
    if(currMarkerData.openDate <= year){
        var marker = L.circleMarker([currMarkerData.x, currMarkerData.y], {radius: 10, color: currMarkerData.color, fillColor: 'white', fillOpacity: 1, weight: 5}).addTo(stationMarkers);
        marker.bindPopup(`${currMarkerData.name} \n ${currMarkerData.openDate}`);
        markers.push(marker);
    }
}

/*  ///     CANADA LINE      ///*/
var canStations = [
    {}
]



// When slider changes, updates the displayed ones
yearSlider.oninput = function() {
    year = this.value;

    map.removeLayer(expoPolyLine_extension);
    if(year < 2016 && year >= 2002) {
        expoPolyLine_extension = L.polyline(expoRoute_extension, {color: '#FFD200', weight: 5});
        expoPolyLine_extension.addTo(map);

        expoStations_extension = [
            {name:'Columbia Station', openDate: 1985, x: 49.20476, y: -122.906161, color: '#005DAA'},
            {name:'Sapperton Station', openDate: 2002, x: 49.22443, y: -122.88964, color: '#FFD200'},
            {name:'Braid Station', openDate: 2002, x: 49.23322, y: -122.88283, color: '#FFD200'},
            {name:'Lougheed Town Centre Station', openDate: 2002, x: 49.24846, y: -122.89702, color: '#FFD200'},
            {name:'Production Way-University Station', openDate: 2002, x: 49.25337, y:-122.91815, color: '#FFD200'},
        ]
    }
    if(year >= 2016) {
        expoPolyLine_extension = L.polyline(expoRoute_extension, {color: '#005DAA', weight: 7});
        expoPolyLine_extension.addTo(map);

        expoStations_extension = [
            {name:'Columbia Station', openDate: 1985, x: 49.20476, y: -122.906161, color: '#005DAA'},
            {name:'Sapperton Station', openDate: 2002, x: 49.22443, y: -122.88964, color: '#005DAA'},
            {name:'Braid Station', openDate: 2002, x: 49.23322, y: -122.88283, color: '#005DAA'},
            {name:'Lougheed Town Centre Station', openDate: 2002, x: 49.24846, y: -122.89702, color: '#FFD200'},
            {name:'Production Way-University Station', openDate: 2002, x: 49.25337, y:-122.91815, color: '#FFD200'},
        ]
    }

    if(year >= 2002) millPolyLine.addTo(map);
    else map.removeLayer(millPolyLine);

    millRoute = [];
    millStations.forEach((station) => {
        if(station.openDate > year) return;
        millRoute.push([station.x, station.y])
    })
    map.removeLayer(millPolyLine);
    millPolyLine = L.polyline(millRoute, {color: '#FFD200', weight: 5}).addTo(map);

    markers.forEach(marker => {
        stationMarkers.removeLayer(marker);
    });

    for (let i = 0; i < expoStations_extension.length; i++) {
        var currMarkerData = expoStations_extension[i];
        if(currMarkerData.openDate <= year){
            var marker = L.circleMarker([currMarkerData.x, currMarkerData.y], {radius: 10, color: currMarkerData.color, fillColor: 'white', fillOpacity: 1, weight: 5}).addTo(stationMarkers);
            marker.bindPopup(`${currMarkerData.name} \n ${currMarkerData.openDate}`);
            markers.push(marker);
        }
    }
    for (let i = 0; i < millStations.length; i++) {
        var currMarkerData = millStations[i];
        if(currMarkerData.openDate <= year){
            var marker = L.circleMarker([currMarkerData.x, currMarkerData.y], {radius: 10, color: currMarkerData.color, fillColor: 'white', fillOpacity: 1, weight: 5}).addTo(stationMarkers);
            marker.bindPopup(`${currMarkerData.name} \n ${currMarkerData.openDate}`);
            markers.push(marker);
        }
    }
}
