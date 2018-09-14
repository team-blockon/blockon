const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailAuth = new Schema({
  email: String,
  token: String,
  status: Number //0:미인증 1:인증 2:가입완료
});

EmailAuth.statics.create = function(email, token) {
  const emailAuth = new this({
    email,
    token,
    status: 0
  });
  return emailAuth.save();
};

EmailAuth.statics.updateToken = function(email, token) {
  return this.update({ email }, { token }, {status : 0});
};

EmailAuth.statics.updateStatus = function(email, status) {
  return this.update({ email }, { status });
};

module.exports = mongoose.model('EmailAuth', EmailAuth);
