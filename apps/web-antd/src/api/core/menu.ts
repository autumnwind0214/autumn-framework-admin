import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

const prefix = "/auth-api";

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.get<RouteRecordStringComponent[]>(`${prefix}/menu/getAsyncRoutes`);
}
