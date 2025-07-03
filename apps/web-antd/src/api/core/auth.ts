import { baseRequestClient, requestClient } from '#/api/request';
import { base64Str } from '#/utils/base64';

const prefix = '/auth-api';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 刷新令牌接口返回值 */
  export interface RefreshTokenResult {
    expiresAt: string;
    issuedAt: number;
    tokenValue: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
    scope: Array<string>;
    expiresAt: Date;
    issuedAt: Date;
    refreshToken: RefreshTokenResult;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  const loginData = {
    ...data,
  };
  const headers: any = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${base64Str('messaging-client:123456')}`,
  };
  return requestClient.post<AuthApi.LoginResult>(
    `${prefix}/oauth2/token`,
    new URLSearchParams(loginData).toString(),
    { headers },
  );
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post(`${prefix}/logout`, {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>(`${prefix}/user/codes`);
}

/**
 * 获取RSA加密公钥
 */
export async function getRsaPublicKeyApi() {
  return requestClient.get<string>(`${prefix}/publicKey`);
}
