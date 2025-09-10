import type { Recordable } from '@vben/types';

import type { ResultTable } from '#/api/result';

import { requestClient } from '#/api/request';

const prefix = '/auth-api/user';

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
    locked: 0 | 1;
    disabled: 0 | 1;
  }
}

/**
 * 创建用户
 */
async function createUserApi(data: Omit<SystemUserApi.SystemUser, 'id'>) {
  return requestClient.post<SystemUserApi.SystemUser>(`${prefix}`, data);
}

/**
 * 更新用户
 */
async function updateUserApi(
  id: number,
  data: Omit<SystemUserApi.SystemUser, 'id'>,
) {
  data.id = id;
  return requestClient.put<SystemUserApi.SystemUser>(`${prefix}`, data);
}

/**
 * 获取用户详情
 */
async function getUserDetailApi(id: number) {
  return requestClient.get<SystemUserApi.SystemUser>(`${prefix}/${id}`);
}

/**
 * 获取用户列表数据
 */
async function getUserListApi(data: Recordable<any>) {
  return requestClient.post<ResultTable<SystemUserApi.SystemUser>>(
    `${prefix}/listPage`,
    data,
  );
}

async function updateUserDisabledApi(id: number, disabled: 0 | 1) {
  return requestClient.put(`${prefix}/disabled/${id}/${disabled}`);
}
async function updateUserUnLockedApi(id: number) {
  return requestClient.put(`${prefix}/unlock/${id}`);
}

/**
 * 删除角色
 * @param id 角色 ID
 */
async function deleteUserApi(id: number) {
  return requestClient.delete(`${prefix}/${id}`);
}

export {
  createUserApi,
  deleteUserApi,
  getUserDetailApi,
  getUserListApi,
  updateUserApi,
  updateUserDisabledApi,
  updateUserUnLockedApi,
};
