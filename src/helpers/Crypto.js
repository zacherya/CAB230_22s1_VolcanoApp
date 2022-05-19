import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

const secret = 'cab230';

function encrypt(string) {
  const ciphertext = AES.encrypt(string, secret);
  return encodeURIComponent(ciphertext.toString());
}
function decrypt(string) {
  const decodedStr = decodeURIComponent(string);
  return AES.decrypt(decodedStr, secret).toString(enc.Utf8);
}

export {encrypt, decrypt};