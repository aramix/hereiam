Template.header.events({
    'click #auth': function(evt, tmpl) {
        $("#loginModal").modal('show');
    },
    'click #logout': function(evt, tmpl) {
        Meteor.logout();
    },
    'submit #search-form': function(evt, tmpl) {
        evt.preventDefault();
        var query = tmpl.find('#search-box').value;

        Meteor.call('search', query, function(err, r) {
            if (err) {
                // The user might not have been found, or their passwword
                // could be incorrect. Informing the user that their
                // login attempt has failed. 
            } else {
                // The user has been logged in.
                infowindow.setPosition({
                    lat: r.codes.location.k,
                    lng: r.codes.location.D
                });
                infowindow.setContent("<div>" + r.codes.code + "</div>");
                GoogleMaps.maps.myMap.instance.setCenter({
                    lat: r.codes.location.k,
                    lng: r.codes.location.D
                });
                smoothZoom(GoogleMaps.maps.myMap.instance, 18, GoogleMaps.maps.myMap.instance.getZoom());
            }
        });
        return false;
    }
});

Template.header.helpers({
    userProfile: function() {
        return Session.get("user").profile;
    }
});
