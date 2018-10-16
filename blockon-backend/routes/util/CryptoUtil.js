const crypto = require('crypto');

class CryptoUtil {
  static hashing(something) {
    return crypto
      .createHmac('sha512', process.env.SECRET_KEY)
      .update(something)
      .digest('base64');
  }
}

module.exports = CryptoUtil;
