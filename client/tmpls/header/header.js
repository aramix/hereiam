Template.header.events({
    'click #auth': function(evt, tmpl) {
        $("#loginModal").modal('show');
    },
    'click #logout': function(evt, tmpl) {
        Meteor.logout();
    }
});

Template.header.helpers({
    userProfile: function() {
        return Session.get("user").profile;
    }
});
