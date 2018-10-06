const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Identity = new Schema({
    ethAddress : String,
    idHash : String
});

Identity.statics.create = function(ethAddress, idHash) {
    const identity = new this({
        ethAddress: ethAddress, // 자동완성을 위해 자모음을 분리하여 저장한다.
        idHash: idHash
    });

    return identity.save();
};

module.exports = mongoose.model('Identity', Identity);
