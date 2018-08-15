const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Qna = new Schema({
    name : String,
    email : String,
    phone : String,
    feedback : String,
    complete : Boolean
});

Qna.statics.create = function(name, email, phone, feedback){
    const qna = new this({
        name : name,
        email : email,
        phone : phone,
        feedback : feedback,
        complete: false
    });
    return qna.save();
};


module.exports = mongoose.model('Qna',Qna);