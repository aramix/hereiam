Template.home.helpers({
    myMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // We can use the `ready` callback to interact with the map API once the map is ready.
            GoogleMaps.ready('myMap', function(map) {
                // Add a marker to the map once it's ready
                var marker = new google.maps.Marker({
                    position: map.options.center,
                    map: map.instance
                });

                map = GoogleMaps.maps.myMap.instance;

                var roadAtlasStyles = [{
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                }, {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#FFC600"
                    }, {
                        "invert_lightness": true
                    }, {
                        "hue": "#ffc300"
                    }]
                }, {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#555555"
                    }]
                }, {
                    "featureType": "landscape.natural",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#444444"
                    }]
                }, {
                    "featureType": "landscape.natural.terrain",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#383838"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#505050"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#242424"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#FFC600"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#858585"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#828282"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#707070"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#808080"
                    }]
                }, {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#808080"
                    }]
                }, {
                    "featureType": "transit.station",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#666666"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#404040"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#656565"
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#ffcc00"
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#000000"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#0000ff"
                    }, {
                        "hue": "#00b2ff"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#222222"
                    }]
                }, {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#ffcc00"
                    }, {
                        "weight": 0.3
                    }]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#ffcc00"
                    }, {
                        "weight": 0.5
                    }]
                }];

                // Try HTML5 geolocation
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = new google.maps.LatLng(position.coords.latitude,
                            position.coords.longitude);

                        var infowindow = new google.maps.InfoWindow({
                            map: map,
                            position: pos,
                            content: 'Location found using HTML5.'
                        });

                        map.setCenter(pos);
                        smoothZoom(map, 18, map.getZoom());
                    }, function() {
                        handleNoGeolocation(true);
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleNoGeolocation(false);
                }

                function handleNoGeolocation(errorFlag) {
                    if (errorFlag) {
                        var content = 'Error: The Geolocation service failed.';
                    } else {
                        var content = 'Error: Your browser doesn\'t support geolocation.';
                    }

                    var options = {
                        map: map,
                        position: new google.maps.LatLng(60, 105),
                        content: content
                    };

                    var infowindow = new google.maps.InfoWindow(options);
                    map.setCenter(options.position);
                }

                // the smooth zoom function
                function smoothZoom(map, max, cnt) {
                    if (cnt >= max) {
                        return;
                    } else {
                        z = google.maps.event.addListener(map, 'zoom_changed', function(event) {
                            google.maps.event.removeListener(z);
                            smoothZoom(map, max, cnt + 1);
                        });
                        setTimeout(function() {
                            map.setZoom(cnt)
                        }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
                    }
                }

                var styledMapOptions = {
                    name: 'US Road Atlas'
                };

                var usRoadMapType = new google.maps.StyledMapType(
                    roadAtlasStyles, styledMapOptions);

                map.mapTypes.set('usroadatlas', usRoadMapType);
                map.setMapTypeId('usroadatlas');
            });

            // Map initialization options
            return {
                zoom: 15
            };
        }
    }
});
