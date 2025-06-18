declare module 'crypto-js' {
  import { CipherHelper } from './lib-typedarrays';

  const CryptoJS: {
    AES: CipherHelper;
    enc: {
      Base64: any;
      Utf8: any;
    };
    lib: {
      WordArray: {
        create: (words: number[]) => any;
      };
    };
  };
  export default CryptoJS;
}
