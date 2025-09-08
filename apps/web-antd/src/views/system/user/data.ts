import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemUserApi } from '#/api';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'role',
      label: $t('system.role.name'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'roleName',
      label: $t('system.role.roleName'),
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.disabled'), value: 0 },
        ],
        optionType: 'button',
      },
      defaultValue: 1,
      fieldName: 'status',
      label: $t('system.role.status'),
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: $t('system.role.remark'),
    },
    {
      component: 'Input',
      fieldName: 'permissions',
      formItemClass: 'items-start',
      label: $t('system.role.setPermissions'),
      modelPropName: 'modelValue',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'username',
      label: $t('system.user.username'),
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.disabled'), value: 0 },
        ],
      },
      fieldName: 'disabled',
      label: $t('system.user.disabled'),
    },
  ];
}

export function useColumns<T = SystemUserApi.SystemUser>(
  onActionClick: OnActionClickFn<T>,
  onDisabledChange?: (
    newDisabled: any,
    row: T,
  ) => PromiseLike<boolean | undefined>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'avatar',
      title: $t('system.user.avatar'),
      width: 100,
      slots: { default: 'image-url' },
    },
    {
      field: 'username',
      title: $t('system.user.username'),
      width: 200,
    },
    {
      field: 'nickname',
      title: $t('system.user.nickname'),
      width: 200,
    },
    {
      field: 'email',
      title: $t('system.user.email'),
      width: 200,
    },
    {
      field: 'mobile',
      title: $t('system.user.mobile'),
      width: 200,
    },
    {
      field: 'birthday',
      title: $t('system.user.birthday'),
      width: 200,
      formatter: ({ cellValue }) => {
        if (!cellValue) return '';
        return new Date(cellValue).toLocaleDateString();
      },
    },
    {
      field: 'loginTime',
      title: $t('system.user.loginTime'),
      width: 200,
      formatter: ({ cellValue }) => {
        if (!cellValue) return '';
        return new Date(cellValue).toLocaleString();
      },
    },
    {
      cellRender: {
        attrs: { beforeChange: onDisabledChange },
        name: onDisabledChange ? 'CellSwitch' : 'CellTag',
      },
      field: 'disabled',
      title: $t('system.user.disabled'),
      width: 100,
    },
    {
      field: 'remark',
      title: $t('system.user.remark'),
      minWidth: 200,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.user.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
        options: [
          'edit', // 预设的编辑按钮
          'delete', // 预设的删除按钮
          {
            code: 'unlock',
            text: $t('common.unlock'),
            show: (row: any) => {
              return row.locked === 0;
            },
          },
        ],
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.user.operation'),
      width: 200,
    },
  ];
}
