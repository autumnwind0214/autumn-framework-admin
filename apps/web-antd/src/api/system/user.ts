import type { Recordable } from '@vben/types';

import type { ResultTable } from '#/api/result';

import { requestClient } from '#/api/request';

const prefix = '/auth-api';

export namespace SystemUserApi {
  export interface SystemUser {
    [key: string]: any;

    id: number;
    username: string;
    mobile: string;
    nickname: string;
    email: string;
    avatar: string;
    sex: 0 | 1;
    loginTime: string;
  }
}

/**
 * 获取用户列表数据
 */
async function getUserListApi(data: Recordable<any>) {
  return requestClient.post<ResultTable<SystemUserApi.SystemUser>>(
    `${prefix}/user/listPage`,
    data,
  );
}

/**
 * 删除角色
 * @param id 角色 ID
 */
async function deleteUserApi(id: number) {
  return requestClient.delete(`${prefix}/user/${id}`);
}

export { deleteUserApi, getUserListApi };
