const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

// 계정 컬렉션 데이터 스키마
const Account = new Schema({
  ethAddress: String,
  accountAddress: String,
  profile: {
    username: String,
    thumbnail: String // 프로필 사진
  },
  email: String,
  password: String,
  isJunggae: { type: Boolean, default: true }, // 중개인 여부는 기본적으로 false
  admin: { type: Boolean, default: false }, // 관리자 여부
  createdAt: { type: Date, default: Date.now } // 계정이 생성된 시각
});

// HMAC SHA256 해싱
function hash(password) {
  return crypto
    .createHmac('sha512', process.env.SECRET_KEY)
    .update(password)
    .digest('base64');
}

/* 모델 메소드
 - statics: this는 모델 자체
 - methods : this는 데이터 인스턴스
*/

// Account 도큐먼트 생성
Account.statics.create = function(
  ethAddress,
  profileFilename,
  username,
  email
) {
  const account = new this({
    ethAddress,
    profile: {
      username,
      thumbnail: profileFilename
    },
    email
  });

  // Promise 반환
  return account.save();
};

Account.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

Account.statics.findByEthAddress = function(ethAddress) {
  return this.findOne({ ethAddress });
};

Account.methods.validatePassword = function(password) {
  const hashed = hash(password);
  return this.password === hashed;
};

module.exports = mongoose.model('Account', Account);
