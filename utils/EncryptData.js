CryptoJS = require("crypto-js");

const EncryptData = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.CRYPTO_SALT
  ).toString();
};

module.exports = { EncryptData };
