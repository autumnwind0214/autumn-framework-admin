import type { Recordable } from '@vben/types';

import type { ResultTable } from '#/api/result';

import { requestClient } from '#/api/request';

const prefix = '/auth-api';

export namespace SystemRoleApi {
  export interface SystemRole {
    [key: string]: any;
    id: number;
    roleName: string;
    permission: string;
    remark?: string;
    status: 0 | 1;
  }
}

/**
 * 获取角色列表数据
 */
async function getRoleListApi(data: Recordable<any>) {
  return requestClient.post<ResultTable<SystemRoleApi.SystemRole>>(
    `${prefix}/role/listPage`,
    data,
  );
}

/**
 * 创建角色
 * @param data 角色数据
 */
async function createRoleApi(data: Omit<SystemRoleApi.SystemRole, 'id'>) {
  return requestClient.post('/system/role', data);
}

/**
 * 更新角色
 *
 * @param id 角色 ID
 * @param data 角色数据
 */
async function updateRoleApi(
  id: number,
  data: Omit<SystemRoleApi.SystemRole, 'id'>,
) {
  return requestClient.put(`/system/role/${id}`, data);
}

/**
 * 删除角色
 * @param id 角色 ID
 */
async function deleteRoleApi(id: number) {
  return requestClient.delete(`/system/role/${id}`);
}

export { createRoleApi, deleteRoleApi, getRoleListApi, updateRoleApi };
