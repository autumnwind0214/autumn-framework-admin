import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

const prefix = "/auth-api";

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>(`${prefix}/user/mine`);
}
