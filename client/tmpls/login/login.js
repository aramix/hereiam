Template.login.events({
    'click #login': function(evt, tmpl) {
        $('#registerModal').modal('hide');
        $('#loginModal').modal('show');
    },
    'click #register': function(evt, tmpl) {
        $('#loginModal').modal('hide');
        $('#registerModal').modal('show');
    },
    'submit #loginModal': function(evt, tmpl) {
        evt.preventDefault();
        var email = tmpl.find('#login-email').value,
            password = tmpl.find('#login-password').value;

        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
                // The user might not have been found, or their passwword
                // could be incorrect. Informing the user that their
                // login attempt has failed. 
            } else {
                // The user has been logged in.
                $("#loginModal").modal('hide');
            }
        });
        return false;
    },
    'submit #registerModal': function(evt, tmpl) {
        evt.preventDefault();
        var name = tmpl.find('#register-name').value,
        	surname = tmpl.find('#register-surname').value,
        	email = tmpl.find('#register-email').value,
            password = tmpl.find('#register-password').value,
            password_check = tmpl.find('#register-password-check').value;

        if (password.localeCompare(password_check) == 0) {
            Accounts.createUser({
                email: email,
                password: password,
                profile: {
                  name: name,
                  surname: surname,
                  photoURL: 'no_image.png'
                }
            }, function(err) {
                if (err) {
                    // Informing the user that account creation failed
                } else {
                    // Success. Account has been created and the user
                    // has logged in successfully. 
                    $("#registerModal").modal('hide');
                }

            });
        }

        return false;
    }
});
