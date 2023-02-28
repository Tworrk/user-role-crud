import CryptoJS from 'crypto-js';
const secretPass = 'XkhZG4fW2t2W';

export const generatePasswordHash = (password) => {

  return CryptoJS.AES.encrypt(password, secretPass).toString();
}
