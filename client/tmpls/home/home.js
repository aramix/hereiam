Template.home.helpers({
    myMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // We can use the `ready` callback to interact with the map API once the map is ready.
            GoogleMaps.ready('myMap', function(map) {
                // Add a marker to the map once it's ready
                window.marker = new google.maps.Marker({
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
                window.infowindow;

                function toolbox_content(code) {
                        return '<form action="action" id="marker-baloon" class="form" style="overflow:hidden;"><div class="form-group"><label for="generated-code">Click and copy your code</label><input type="text" id="generated-code" class="form-control input-lg" onClick="this.setSelectionRange(0, this.value.length);" value="' + code + '" readonly></div><div class="form-group"><input type="text" class="form-control floating-label" placeholder="leave a message (optional)"></div></form>';
                    }
                    // Try HTML5 geolocation
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = new google.maps.LatLng(position.coords.latitude,
                            position.coords.longitude);

                        infowindow = new google.maps.InfoWindow({
                            map: map,
                            position: pos
                        });
                        map.setCenter(pos);
                        smoothZoom(map, 18, map.getZoom());

                        Meteor.call('generateCode', infowindow.getPosition(), function(err, code) {
                            infowindow.setContent(toolbox_content(code));
                        });
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

                    infowindow = new google.maps.InfoWindow(options);
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
                    $.material.init();
                }

                function placeMarker(position) {
                    Meteor.call('generateCode', position, function(err, code) {
                        if (err) {
                            console.log(err.getStack());
                        } else {
                            if (marker) {
                                // marker.setPosition(position);
                                infowindow = new google.maps.InfoWindow({
                                    map: map,
                                    position: position,
                                    content: toolbox_content(code)
                                });
                            } else {
                                // marker = new google.maps.Marker({
                                //     position: position,
                                //     map: map
                                // });
                            }
                        }
                        // Apply material styles
                        $.material.init();
                    });
                }

                // Sets the map on all markers in the array.
                function setAllMap(map) {
                    marker.setMap(map);
                }

                // Removes the markers from the map, but keeps them in the array.
                function clearMarkers() {
                    setAllMap(null);
                }

                // Removes the markers from the map, but keeps them in the array.
                function clearInfoWindows() {
                    infowindow.setMap(null);
                }

                var styledMapOptions = {
                    name: 'US Road Atlas'
                };

                var usRoadMapType = new google.maps.StyledMapType(
                    roadAtlasStyles, styledMapOptions);

                map.mapTypes.set('usroadatlas', usRoadMapType);
                map.setMapTypeId('usroadatlas');

                google.maps.event.addListener(map, 'click', function(event) {
                    // clearMarkers();
                    clearInfoWindows();
                    placeMarker(event.latLng);
                });

                $('#marker-baloon').delegate('submit', function(e) {
                    e.preventDefault();
                    alert('asdasd');
                });
            });

            // // Apply material styles
            // $.material.init();

            // Map initialization options
            return {
                zoom: 15
            };
        }
    }
});

// Template.home.events({
//     'submit #marker-baloon': function(evt, tmpl) {
//         evt.preventDefault();
//         alert('asdasd');
//     }
// });
