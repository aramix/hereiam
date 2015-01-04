Meteor.publish('codes', function() {
    return Codes.find({
        userId: this.userId
    });
});

Meteor.methods({
    generateCode: function(position) {
        dt = (new Date);
        code = dt.getHours().toString(16) + dt.getSeconds().toString(16) + Random.hexString(3).toString();
        userCodes = Codes.find({"userId":Meteor.userId()});
        if (Meteor.userId()) {
            if(userCodes.count() >= 10) {
                Codes.remove({"userId":Meteor.userId()});
            }
            Codes.insert({
                userId: Meteor.userId(),
                "codes": {
                    "code": code,
                    "location": position
                }
            });
        }
        return code;
    },
    search: function(query) {
        return Codes.findOne({
            "codes.code": query
        });
    }
});
