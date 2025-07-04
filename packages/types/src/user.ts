import type { BasicUserInfo } from '@vben-core/typings';

/** 用户信息 */
interface UserInfo extends BasicUserInfo {
  /**
   * 用户描述
   */
  remark: string;
  /**
   * 首页地址
   */
  homePath: string;

  /**
   * 手机号
   */
  mobile?: string;

  /**
   * 邮箱
   */
  email?: string;
}

export type { UserInfo };
