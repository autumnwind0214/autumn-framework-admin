import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

const prefix = '/auth-api';

/**
 * 获取动态路由
 */
export async function getAsyncRoutesApi() {
  return requestClient.get<RouteRecordStringComponent[]>(
    `${prefix}/menu/getAsyncRoutes`,
  );
}
