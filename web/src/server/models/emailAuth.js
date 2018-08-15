const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailAuth = new Schema({
    email : String,
    token : String,
    status : Boolean
});

EmailAuth.statics.create = function(email, token) {
        const emailAuth = new this({
            email: email,
            token: token,
            status: false
        });
        return emailAuth.save();
};

EmailAuth.statics.updateToken = function(email, token) {
    return this.update({email : email}, {token : token});
};

EmailAuth.statics.updateStatus = function(email) {
    return this.update({email: email}, {status: true});
};


module.exports = mongoose.model('EmailAuth', EmailAuth);