const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 계정 컬렉션 데이터 스키마
const Account = new Schema({
  keyStore: JSON,
  accountAddress: String,
  profile: {
    username: String,
    thumbnail: String // 프로필 사진
  },
  email: String,
  pwdHash: String,
  isAgent: { type: Boolean, default: false }, // 중개인 여부는 기본적으로 false
  createdAt: { type: Date, default: Date.now } // 계정이 생성된 시각
});

/* 모델 메소드
 - statics: this는 모델 자체
 - methods : this는 데이터 인스턴스
*/

// Account 도큐먼트 생성
Account.statics.create = function(
  keyStore,accountAddress, profileFilename,
  username, email, pwdHash
) {
    const account = new this({
    keyStore,
    accountAddress,
    profile: {
      username,
      thumbnail: profileFilename
    },
    email,
    pwdHash
  });

  // Promise 반환
  return account.save();
};

module.exports = mongoose.model('Account', Account);
