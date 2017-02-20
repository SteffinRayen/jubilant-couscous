var map, places, infoWindow;
var markers = [];
var autocomplete;
var placeRestrict = {
    'place': 'a'
};
var iconColor = "";
var markerPath = "http://maps.google.com/mapfiles/ms/icons/";
var hostnameRegexp = new RegExp('^https?://.+?/');

//Need to do dynamic location stuff..
var userData = {
    'a': {
        center: new google.maps.LatLng(13.001177, 80.256496),
        zoom: 15,
    },
    'c': {
        center: new google.maps.LatLng(12.953195, 80.141601),
        zoom: 15,
        radius: 500,
    },
    'e': {
        center: new google.maps.LatLng(13.073226, 80.260921),
        zoom: 15,
        radius: 400,
    },
    'g': {
        center: new google.maps.LatLng(13.010236, 80.215651),
        zoom: 15,
        radius: 450,
    },
    'k': {
        center: new google.maps.LatLng(13.083607, 80.239206),
        zoom: 15,
        radius: 600,
    },
    'm': {
        center: new google.maps.LatLng(13.036791, 80.267630),
        zoom: 15,
        radius: 640,
    }
};

function initialize() {
    var myOptions = {
        zoom: userData['a'].zoom,
        center: userData['a'].center,
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */
        (document.getElementById('interest')), {
            componentRestrictions: placeRestrict
        });
    places = new google.maps.places.PlacesService(map);
    google.maps.event.addDomListener(document.getElementById('interest'), 'change',
        setAutocompleteUsername);
}


// Set the place restriction based on user interest.
function setAutocompleteUsername() {
        var place = document.getElementById('place').value;
        autocomplete.setComponentRestrictions({
            'place': place
        });
        map.setCenter(userData[place].center);
        map.setZoom(userData[place].zoom);
        var interest = document.getElementById('interest').value;

        if (interest == 'bank') {
            searchBank();
        }
        if (interest == 'school') {
            searchSchool();
        }
        if (interest == 'hospital') {
            searchHospital();
        }
        if (interest == 'restaurant') {
            searchRestaurant();
        }
        if (interest == 'all') {
            searchAll();
        }

        clearResults();
        clearMarkers();
    }
    // [END seting place and interest]
    // Search for bank in the selected place
function searchBank() {
    var search = {
        bounds: map.getBounds(),
        types: ['bank']
    };
    places.nearbySearch(search, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            for (var i = 0; i < results.length; i++) {
                iconColor = "blue";
                icon = markerPath + iconColor + ".png";
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: new google.maps.MarkerImage(icon)
                });
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
            }
        }
    });
}

// Search for school in the selected place
function searchSchool() {
    var search = {
        bounds: map.getBounds(),
        types: ['school']
    };
    places.nearbySearch(search, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            for (var i = 0; i < results.length; i++) {
                iconColor = "green";
                icon = markerPath + iconColor + ".png";
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: new google.maps.MarkerImage(icon)
                });
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
            }
        }
    });
}

// Search for Hospitals in the selected place
function searchHospital() {
    var search = {
        bounds: map.getBounds(),
        types: ['hospital']
    };
    places.nearbySearch(search, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            for (var i = 0; i < results.length; i++) {
                iconColor = "red";
                icon = markerPath + iconColor + ".png";
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: new google.maps.MarkerImage(icon)
                });
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);

            }
        }
    });
}

// Search for Restaurant in the selected place

function searchRestaurant() {
    var search = {
        bounds: map.getBounds(),
        types: ['restaurant']
    };
    places.nearbySearch(search, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            for (var i = 0; i < results.length; i++) {
                iconColor = "yellow";
                icon = markerPath + iconColor + ".png";
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: new google.maps.MarkerImage(icon)
                });
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
            }
        }
    });
}

// Search for All in the selected place

function searchAll() {

    var search = {
        bounds: map.getBounds(),
        types: ['bank']
    };
    places.nearbySearch(search, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                iconColor = "blue";
                icon = markerPath + iconColor + ".png";
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: new google.maps.MarkerImage(icon)
                });
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
            }
        }
    });


// Search for school in the selected place

    var search = {
        bounds: map.getBounds(),
        types: ['school']
    };
    places.nearbySearch(search, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                iconColor = "green";
                icon = markerPath + iconColor + ".png";
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: new google.maps.MarkerImage(icon)
                });
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
            }
        }
    });


// Search for Hospitals in the selected place

    var search = {
        bounds: map.getBounds(),
        types: ['hospital']
    };
    places.nearbySearch(search, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                iconColor = "red";
                icon = markerPath + iconColor + ".png";
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: new google.maps.MarkerImage(icon)
                });
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);

            }
        }
    });


// Search for Restaurant in the selected place

    var search = {
        bounds: map.getBounds(),
        types: ['restaurant']
    };
    places.nearbySearch(search, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            
            for (var i = 0; i < results.length; i++) {
                iconColor = "yellow";
                icon = markerPath + iconColor + ".png";
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: new google.maps.MarkerImage(icon)
                });
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
            }
        }
    });

}


function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}

function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}

function addResult(result, i) {
    var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
    var markerIcon = MARKER_PATH + markerLetter + '.png';
    markerIcon.onclick = function() {
        google.maps.event.trigger(markers[i], 'click');
    };

}

function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}

// Get the place details. Show the information in an info window,
function showInfoWindow() {
    var marker = this;
    places.getDetails({
            placeId: marker.placeResult.place_id
        },
        function(place, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
        });
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
        'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
        '">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity;

    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
    } else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }

    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    if (place.website) {
        var fullUrl = place.website;
        var website = hostnameRegexp.exec(place.website);
        if (website == null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
        }
        document.getElementById('iw-website-row').style.display = '';
        document.getElementById('iw-website').textContent = website;
    } else {
        document.getElementById('iw-website-row').style.display = 'none';
    }
}