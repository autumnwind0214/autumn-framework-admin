import CryptoJS from 'crypto-js';

/**
 * 将字符串加密为Base64格式的
 * @param str 将要转为base64的字符串
 * @returns 返回base64格式的字符串
 */
export function base64Str(str: string) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
}
