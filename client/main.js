Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404',
    loadingTemplate: 'loading'
});

Router.map(function(post) {
    this.route('home', {
        path: '/',
        layoutTemplate: 'maplayout',
        // waitOn: function() {
        //     return Meteor.user(); // && Meteor.subscribe('beats');
        // },
        data: function() {
            return Session.set('user', Meteor.user()); // && Meteor.subscribe('beats');
        }
    })
});

// Router.map(function(post) {
//     this.route('about')
// });

Router.map(function(post) {
    this.route('contact')
});

Router.map(function(post) {
    this.route('help')
});

var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

//Router.onBeforeAction('dataNotFound', {only: 'someTemplate'});
//Router.onBeforeAction(requireLogin, {only: 'someTemplate'});

Meteor.startup(function() {
    GoogleMaps.load();
});
