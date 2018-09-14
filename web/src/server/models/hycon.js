const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hycon = new Schema({
    ethAddress : String,
    hyconAddress : String,
    hyconPrivateKey : String
});

Hycon.statics.create = function (ethAddress, hyconAddress, hyconPrivateKey) {
    const Hycon = new this({
        ethAddress : ethAddress,
        hyconAddress: hyconAddress,
        hyconPrivateKey: hyconPrivateKey
    });

    return Hycon.save();
};

module.exports = mongoose.model('Hycon',Hycon);
