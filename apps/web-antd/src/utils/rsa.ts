import forge from 'node-forge';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { getRsaPublicKeyApi } from '#/api';

interface RSA {
  publicKey: string;
}

export const useRSAStore = defineStore('rsa', {
  state: (): RSA => ({
    publicKey: '',
  }),
  actions: {
    setPublicKey(key: string) {
      // 设置公钥
      this.publicKey = key;
    },
  },
});

// 数据加密
export async function encryptRSA(data: string): Promise<string> {
  let publicKeyPem = useRSAStore().publicKey;
  if (publicKeyPem === '' || publicKeyPem === null) {
    await getRsaPublicKeyApi().then((res) => {
      // 包装为 PEM 格式
      publicKeyPem = `-----BEGIN PUBLIC KEY-----${res}-----END PUBLIC KEY-----`;
      useRSAStore().setPublicKey(res);
    });
  }
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(data, 'RSA-OAEP');
  return forge.util.encode64(encrypted);
}

// 解决热更新问题
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useRSAStore, hot));
}
