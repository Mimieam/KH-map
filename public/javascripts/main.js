// UI
$(".button-collapse").sideNav();
$()


// map


var map = L.map('map')
L.control.scale({imperial: true}).addTo(map) // map to miles

L.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}', {
    attribution: 'Mimi Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    // subdomains: ['a','b','c','d'],
    mapId: 'miezal.m7p916n0',
    token: 'pk.eyJ1IjoibWllemFsIiwiYSI6IkNLVlN1WlkifQ.8upI6BQ5hROnKAcCyp64Bw'
}).addTo(map);

// http://leafletjs.com/examples/geojson.html÷
// var geojsonFeature = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"title":"R4","description":"","id":"marker-i9wr4yrc0","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.219436,45.823057],[-94.21772,45.807982],[-94.217548,45.800802],[-94.21772,45.793741],[-94.217548,45.778777],[-94.216861,45.758181],[-94.213943,45.756265],[-94.205017,45.764169],[-94.195747,45.769558],[-94.176006,45.779616],[-94.176006,45.800443],[-94.177379,45.823296],[-94.219436,45.823057]]],"type":"Polygon"},"id":"ci9wrift104hliikpuvxzvck0"},{"type":"Feature","properties":{"title":"R15","description":"","id":"marker-i9wr9owb1","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.175405,45.779376],[-94.15369,45.779316],[-94.153776,45.764648],[-94.153347,45.750157],[-94.195575,45.750157],[-94.190425,45.752492],[-94.190082,45.757403],[-94.21257,45.757223],[-94.214115,45.756265],[-94.204673,45.764289],[-94.196004,45.769319],[-94.175577,45.779675],[-94.175405,45.779376]]],"type":"Polygon"},"id":"ci9wrift204hmiikppmh3tvn5"},{"type":"Feature","properties":{"title":"R14","description":"","id":"marker-i9wrcw2s2","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.153432,45.779196],[-94.122362,45.779616],[-94.091548,45.779735],[-94.091033,45.765367],[-94.090862,45.753391],[-94.088115,45.750516],[-94.112491,45.750157],[-94.153347,45.750157],[-94.153432,45.779196]]],"type":"Polygon"},"id":"ci9wrift404hniikped3c8z49"},{"type":"Feature","properties":{"id":"marker-i9xvnzfp0","title":"R14","description":"","marker-size":"large","marker-color":"#7ec9b1","marker-symbol":"car"},"geometry":{"coordinates":[-94.118585,45.750157],"type":"Point"},"id":"ci9xvqbi90072ikm4hewz6dox"},{"type":"Feature","properties":{"title":"R5","description":"","id":"marker-i9ykknn40","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.177036,45.823655],[-94.13515,45.824134],[-94.13515,45.81887],[-94.134464,45.809179],[-94.13412,45.801759],[-94.133605,45.794219],[-94.133262,45.785841],[-94.13309,45.779735],[-94.15369,45.779496],[-94.175834,45.779735],[-94.175662,45.793741],[-94.175834,45.800922],[-94.177036,45.823655]]],"type":"Polygon"},"id":"ci9ykytrc010gj4m4i6tnaeuv"},{"type":"Feature","properties":{"title":"R6","description":"","id":"marker-i9ykm6541","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.13515,45.824134],[-94.094467,45.823057],[-94.093608,45.809298],[-94.092922,45.794339],[-94.091892,45.779616],[-94.112663,45.779855],[-94.13309,45.779616],[-94.133777,45.794579],[-94.134464,45.809059],[-94.13515,45.824134]]],"type":"Polygon"},"id":"ci9ykytrd010hj4m4db3y4nop"},{"type":"Feature","properties":{"title":"R13","description":"","id":"marker-i9yko77y2","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.028892,45.779975],[-94.028377,45.764768],[-94.027519,45.750396],[-94.048805,45.750875],[-94.069747,45.750755],[-94.0876,45.750516],[-94.090175,45.752313],[-94.09069,45.753151],[-94.091205,45.764888],[-94.092407,45.779496],[-94.071292,45.779616],[-94.050178,45.779975],[-94.028892,45.779975]]],"type":"Polygon"},"id":"ci9ykytrf010ij4m4jxb4ophu"},{"type":"Feature","properties":{"title":"R7","description":"","id":"marker-i9ykpibg3","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.05241,45.823775],[-94.052066,45.808939],[-94.051036,45.794219],[-94.050006,45.779975],[-94.071292,45.779735],[-94.09172,45.779855],[-94.092407,45.794579],[-94.093952,45.809179],[-94.09481,45.823416],[-94.05241,45.823775]]],"type":"Polygon"},"id":"ci9ykytrg010jj4m4iuyjs813"},{"type":"Feature","properties":{"title":"R8","description":"","id":"marker-i9yks9b34","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.051895,45.823655],[-94.010181,45.824134],[-94.009494,45.809537],[-94.008979,45.794698],[-94.008293,45.779735],[-94.029064,45.779855],[-94.050178,45.780094],[-94.050865,45.794219],[-94.052066,45.808939],[-94.051895,45.823655]]],"type":"Polygon"},"id":"ci9ykytri010kj4m4wgr5gxl0"},{"type":"Feature","properties":{"title":"R9","description":"","id":"marker-i9yktyq95","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.010524,45.823894],[-93.990097,45.824373],[-93.969497,45.824492],[-93.967609,45.810495],[-93.967781,45.809777],[-93.967437,45.794818],[-93.966751,45.779496],[-93.987865,45.779735],[-94.008121,45.779616],[-94.008293,45.794818],[-94.009666,45.809777],[-94.010524,45.823894]]],"type":"Polygon"},"id":"ci9ykytrk010lj4m4wroapmo8"},{"type":"Feature","properties":{"title":"R12","description":"","id":"marker-i9ykvmqr6","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.027347,45.750396],[-94.006404,45.750157],[-93.985805,45.750157],[-93.986663,45.764529],[-93.945636,45.765367],[-93.946151,45.779137],[-93.987522,45.779616],[-94.028549,45.779616],[-94.028034,45.765008],[-94.027347,45.750396]]],"type":"Polygon"},"id":"ci9ykytrm010mj4m4q10bkxy9"},{"type":"Feature","properties":{"title":"R10","description":"","id":"marker-i9ykwfqi7","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-93.969497,45.824014],[-93.927268,45.824134],[-93.926067,45.80858],[-93.925552,45.779735],[-93.946151,45.779616],[-93.966407,45.779855],[-93.967437,45.794339],[-93.967437,45.809896],[-93.969497,45.824014]]],"type":"Polygon"},"id":"ci9ykytrn010nj4m4ngtxo2kz"},{"type":"Feature","properties":{"title":"R11","description":"","id":"marker-i9ykynh38","stroke":"#f1f075","stroke-width":2,"stroke-opacity":0.699999988079071,"fill":"#6c6c6c","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-93.92538,45.779735],[-93.925895,45.765247],[-93.925552,45.750995],[-93.925209,45.74812],[-93.935337,45.74273],[-93.937225,45.741532],[-93.941345,45.740693],[-93.943748,45.738417],[-93.947525,45.735541],[-93.950271,45.734223],[-93.963489,45.749079],[-93.968811,45.750276],[-93.975162,45.750396],[-93.985977,45.750037],[-93.986663,45.764169],[-93.946495,45.765247],[-93.946151,45.779137],[-93.92538,45.779735]]],"type":"Polygon"},"id":"ci9ykytro010oj4m4t9868v8t"},{"type":"Feature","properties":{"title":"St Cloud mini Territory ","description":"","id":"marker-iadirixq0","stroke":"#1087bf","stroke-width":4,"stroke-opacity":0.4000000059604645,"fill":"#1087bf","fill-opacity":0.20000000298023224},"geometry":{"coordinates":[[[-94.219779,45.823775],[-94.219436,45.818272],[-94.21875,45.811572],[-94.21772,45.803674],[-94.21772,45.800802],[-94.217376,45.792663],[-94.21772,45.787397],[-94.218063,45.781651],[-94.218063,45.779975],[-94.21669,45.772791],[-94.21669,45.768241],[-94.21566,45.760098],[-94.21566,45.758181],[-94.21463,45.756984],[-94.206047,45.757223],[-94.191284,45.757702],[-94.19094,45.75387],[-94.19609,45.750276],[-94.153861,45.749797],[-94.090003,45.749797],[-94.087944,45.750995],[-94.026832,45.750276],[-93.973274,45.749797],[-93.966407,45.750037],[-93.962631,45.748839],[-93.960571,45.746204],[-93.950614,45.733983],[-93.941688,45.740453],[-93.934822,45.743089],[-93.929672,45.745724],[-93.925209,45.747881],[-93.925209,45.750516],[-93.925895,45.765127],[-93.925209,45.779735],[-93.925895,45.8087],[-93.927955,45.824014],[-93.972244,45.824492],[-94.009666,45.824253],[-94.053611,45.824253],[-94.09584,45.824014],[-94.134979,45.824971],[-94.177207,45.824014],[-94.219779,45.823775]]],"type":"Polygon"},"id":"ciadiszy706yijnm2b1z7s4gl"}],"id":"miezal.m7p916n0"}
var geojsonFeature = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-94.17068481445312,45.69850658738846],[-94.1748046875,45.67632177374559],[-94.17823791503906,45.65628792636447],[-94.17755126953125,45.654488128074114],[-94.17102813720703,45.65484809235974],[-94.16501998901367,45.65460811642643],[-94.15506362915039,45.65484809235974],[-94.13394927978516,45.6547281045216],[-94.13326263427734,45.67680153845499],[-94.13360595703125,45.698386693128114],[-94.17068481445312,45.69850658738846]]]}},{"type":"Feature","properties":{"stroke":"#f5e341","stroke-width":2,"stroke-opacity":1,"fill":"#555555","fill-opacity":0.1,"title":"R4"},"geometry":{"type":"Polygon","coordinates":[[[-94.21960830688477,45.82317708894054],[-94.17755126953125,45.823655593002385],[-94.17703628540039,45.812409660234714],[-94.17566299438477,45.80152047649539],[-94.1754913330078,45.789910980788335],[-94.17600631713867,45.77949628283484],[-94.19626235961914,45.76931912412848],[-94.20536041259766,45.76428972483458],[-94.2142117023468,45.75656512157788],[-94.21634674072266,45.758181987497686],[-94.21686172485352,45.76836117827094],[-94.21789169311523,45.77925684161295],[-94.21754837036133,45.79350180481077],[-94.21806335449219,45.808341423085274],[-94.21960830688477,45.82317708894054]]]}},{"type":"Feature","properties":{"stroke":"#555555","stroke-width":2,"stroke-opacity":1,"fill":"#555555","fill-opacity":0.5,"title":"R4"},"geometry":{"type":"Polygon","coordinates":[[[-94.1773796081543,45.82341634148554],[-94.13497924804688,45.82341634148554],[-94.13463592529297,45.80858073937854],[-94.13446426391602,45.801759822092556],[-94.13394927978516,45.79374118485316],[-94.13291931152344,45.779855442739716],[-94.15386199951172,45.77901739936284],[-94.1758346557617,45.77961600306021],[-94.17497634887695,45.79398056386735],[-94.17600631713867,45.80140080331123],[-94.17686462402344,45.813965084145295],[-94.1773796081543,45.82341634148554]]]}},{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-94.1352367401123,45.82341634148554],[-94.09429550170897,45.82383503096524],[-94.09446716308594,45.82263876695493],[-94.09429550170897,45.81641777973988],[-94.09360885620116,45.80929868208901],[-94.09292221069336,45.79463885085458],[-94.09189224243164,45.779735723028494],[-94.11300659179686,45.779855442739716],[-94.13291931152344,45.779735723028494],[-94.1337776184082,45.794339630460705],[-94.13455009460449,45.80923885388325],[-94.1352367401123,45.82341634148554]]]}},{"type":"Feature","properties":{"stroke":"#555555","stroke-width":2,"stroke-opacity":1,"fill":"#555555","fill-opacity":0.5,"title":"R15"},"geometry":{"type":"Polygon","coordinates":[[[-94.2130959033966,45.757201393849925],[-94.21362161636351,45.756842088046795],[-94.21422243118286,45.75652020796689],[-94.21299934387206,45.75719390833596],[-94.21081066131592,45.75723133589575],[-94.20699119567871,45.757223850385785],[-94.1898250579834,45.757463386206155],[-94.18888092041016,45.75806222125841],[-94.18793678283691,45.75716396627003],[-94.18931007385252,45.75656512157788],[-94.18948173522949,45.752133471116956],[-94.19574737548828,45.7501570810981],[-94.15351867675781,45.7501570810981],[-94.13206100463867,45.750516429943474],[-94.13257598876953,45.764648982679404],[-94.13257598876953,45.77925684161295],[-94.15351867675781,45.779376562352425],[-94.1754913330078,45.779735723028494],[-94.20278549194335,45.76596624164995],[-94.2130959033966,45.757201393849925]]]}}]}
var geoStyle = {
    fillColor: "#fff",
    color: "#f1f075",
    opacity: 0.4,
    fillOpacity: 0,
    clickable: true
}
var geojson;
// geojason = L.geoJson(geojsonFeature, geoStyle).addTo(map);

// credits: https://github.com/turban/Leaflet.Mask
L.Mask = L.Polygon.extend({
    options: {
        stroke: true,
        color: 'chocolate',
        fillColor: '#333',

        fillOpacity: 0.5,
        // clickable: true,

        outerBounds: new L.LatLngBounds([-90, -360], [90, 360])
    },

    initialize: function (latLngs, options) {

         var outerBoundsLatLngs = [
            this.options.outerBounds.getSouthWest(),
            this.options.outerBounds.getNorthWest(),
            this.options.outerBounds.getNorthEast(),
            this.options.outerBounds.getSouthEast()
        ];
        L.Polygon.prototype.initialize.call(this, [outerBoundsLatLngs, latLngs], options);
    },

});
L.mask = function (latLngs, options) {
    return new L.Mask(latLngs, options);
};


// define territory geographical bounds
var coordinates = [
    [-94.219779, 45.823775], [-94.219436, 45.818272],
    [-94.21875, 45.811572], [-94.21772, 45.803674],
    [-94.21772, 45.800802], [-94.217376, 45.792663],
    [-94.21772, 45.787397], [-94.218063, 45.781651],
    [-94.218063, 45.779975], [-94.21669, 45.772791],
    [-94.21669, 45.768241], [-94.21566, 45.760098],
    [-94.21566, 45.758181], [-94.21463, 45.756984],
    [-94.206047, 45.757223], [-94.191284, 45.757702],
    [-94.19094, 45.75387], [-94.19609, 45.750276],
    [-94.153861, 45.749797], [-94.090003, 45.749797],
    [-94.087944, 45.750995], [-94.026832, 45.750276],
    [-93.973274, 45.749797], [-93.966407, 45.750037],
    [-93.962631, 45.748839], [-93.960571, 45.746204],
    [-93.950614, 45.733983], [-93.941688, 45.740453],
    [-93.934822, 45.743089], [-93.929672, 45.745724],
    [-93.925209, 45.747881], [-93.925209, 45.750516],
    [-93.925895, 45.765127], [-93.925209, 45.779735],
    [-93.925895, 45.8087], [-93.927955, 45.824014],
    [-93.972244, 45.824492], [-94.009666, 45.824253],
    [-94.053611, 45.824253], [-94.09584, 45.824014],
    [-94.134979, 45.824971], [-94.177207, 45.824014],
    [-94.219779, 45.823775]
]

// transform geojson coordinates into an array of L.LatLng
var territoryBound = [];
for (i=0; i<coordinates.length; i++) {
    territoryBound.push(new L.LatLng(coordinates[i][1], coordinates[i][0]));
}

L.mask(territoryBound).addTo(map);

// zoom the map to the rectangle bounds
map.fitBounds(territoryBound);


defaultGeocoder =L.Control.Geocoder.nominatim()

// current_location = null
// navigator.geolocation.getCurrentPosition(function (position) {
//     current_location = position.coords;
//     console.log(current_location)
// });

// function get_current_location (){
//     cur_pos = null
//     navigator.geolocation.getCurrentPosition(function (position) {
//         cur_pos = position.coords
//     });
//     console.log(cur_pos)
//     return cur_pos
// }


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
     info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}


function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

function findRoute(e){
    map.fitBounds(e.target.getBounds());
      // show loader
      navigator.geolocation.getCurrentPosition(function (position) {
        gps_route.setWaypoints([
            L.latLng(position.coords.latitude, position.coords.longitude),
            L.latLng(e.latlng.lat, e.latlng.lng)
        ]);
        //hide loader
    });
    console.log("done")

}

var marker = null
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    console.log(e.target.getBounds());

    for (index in geojsonFeature.features) {
        console.log(geojsonFeature.features[index].properties.title)
    }
    // Features.features[0].properties.title

    if (marker) {
        marker.setLatLng(e.latlng,{draggable:'true'}).
            setPopupContent("SC-E 2nd").
            openPopup();
    } else {
        marker = new L.marker(e.latlng,{draggable:'true'}).bindPopup("SC-E Territory").addTo(map).openPopup();
    }

}

function onEachFeature(feature, layer) {
    console.log("feature", feature)
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
        dblclick: findRoute,
    });
}

// geojason = L.geoJson(geojsonFeature, geoStyle).addTo(map);

geojson = L.geoJson(geojsonFeature, {
    style: geoStyle,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = (props ?
        '<h5>' + props.congregation + 'Territory #</h5>' +  '<b>' + props.title + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Click on a Territory');
};

info.addTo(map);


gps_route = L.Routing.control ({
    units: 'imperial',
    waypoints: [],
    routeWhileDragging: true,
    geocoder: defaultGeocoder,
}).addTo(map);
$(".side-nav").append($(".leaflet-routing-container").detach())

map.on('click', function(e) {
 // marker = new L.marker(e.latlng, {id:2, draggable:'true'});
    // marker.on('dragend', function(event){
    //         var marker = event.target;
    //         var position = marker.getLatLng();
    //         alert(position);
    //         marker.setLatLng([position],{id:2,draggable:'true'}).bindPopup(position).update();
    // });
    // map.addLayer(marker);




    console.log(e.latlng)
    defaultGeocoder.reverse(e.latlng, map.options.crs.scale(map.getZoom()), function(results) {
    navigator.geolocation.getCurrentPosition(function (position) {

    console.log(position.coords)
    gps_route.setWaypoints([
            L.latLng(position.coords.latitude, position.coords.longitude),
            L.latLng(e.latlng.lat, e.latlng.lng)
    ]);
    cur_pos = position.coords
    gps_route
    console.log(L.Routing)

    });
        // var r = results[0];

    })
})
