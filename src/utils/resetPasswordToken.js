import CryptoUtil from './cryptoUtil.js';

export default class ResetPasswordToken {

  static createResetToken(text) {
    if(text){
      return CryptoUtil.createRandomUUID();
    }
    return CryptoUtil.createUUIDFromString(text);
  }
}