<script lang="ts" setup>
import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';
import type { Recordable } from '@vben/types';

import type { OnActionClickParams } from '#/adapter/vxe-table';
import type { SystemUserApi } from '#/api';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { VbenAvatar } from '@vben-core/shadcn-ui';

import { Button, message, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteUserApi,
  updateUserDisabledApi,
  updateUserUnLockedApi,
} from '#/api';
import { getUserListApi } from '#/api/system/user';
import { $t } from '#/locales';
import { useColumns, useGridFormSchema } from '#/views/system/user/data';

import Form from './modules/form.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    fieldMappingTime: [['createTime', ['startTime', 'endTime']]],
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick, onDisabledChange),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getUserListApi({
            page: page.currentPage,
            size: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },

    toolbarConfig: {
      custom: true,
      export: false,
      refresh: { code: 'query' },
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<SystemUserApi.SystemUser>,
});

function onActionClick(e: OnActionClickParams<SystemUserApi.SystemUser>) {
  switch (e.code) {
    case 'delete': {
      onDelete(e.row);
      break;
    }
    case 'edit': {
      onEdit(e.row);
      break;
    }
    case 'unlocked': {
      onLockedChange(e.row.id);
      break;
    }
  }
}

/**
 * 状态开关即将改变
 * @param newDisabled 期望改变的状态值
 * @param row 行数据
 * @returns 返回false则中止改变，返回其他值（undefined、true）则允许改变
 */
async function onDisabledChange(
  newDisabled: 0 | 1,
  row: SystemUserApi.SystemUser,
) {
  const disabled: Recordable<string> = {
    0: '禁用',
    1: '启用',
  };
  try {
    await confirm(
      `你要将${row.roleName}的状态切换为 【${disabled[newDisabled.toString()]}】 吗？`,
      `切换状态`,
    );
    await updateUserDisabledApi(row.id, newDisabled);
    return true;
  } catch {
    return false;
  }
}

/**
 * 状态开关即将改变
 * @returns 返回false则中止改变，返回其他值（undefined、true）则允许改变
 * @param userId
 */
async function onLockedChange(userId: number) {
  try {
    await updateUserUnLockedApi(userId);
    return true;
  } catch {
    return false;
  }
}

/**
 * 将Antd的Modal.confirm封装为promise，方便在异步函数中调用。
 * @param content 提示内容
 * @param title 提示标题
 */
function confirm(content: string, title: string) {
  return new Promise((reslove, reject) => {
    Modal.confirm({
      content,
      onCancel() {
        reject(new Error('已取消'));
      },
      onOk() {
        reslove(true);
      },
      title,
    });
  });
}

function onEdit(row: SystemUserApi.SystemUser) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: SystemUserApi.SystemUser) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
    key: 'action_process_msg',
  });
  deleteUserApi(row.id)
    .then(() => {
      message.success({
        content: $t('ui.actionMessage.deleteSuccess', [row.name]),
        key: 'action_process_msg',
      });
      onRefresh();
    })
    .catch(() => {
      hideLoading();
    });
}

function onRefresh() {
  gridApi.query();
}

function onCreate() {
  formDrawerApi.setData({}).open();
}
</script>
<template>
  <Page auto-content-height>
    <FormDrawer />
    <Grid :table-title="$t('system.user.list')">
      <template #image-url="{ row }">
        <div class="flex items-center justify-center">
          <VbenAvatar :src="row.avatar" class="size-8 flex-shrink-0" />
        </div>
      </template>
      <template #toolbar-tools>
        <Button type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('system.user.name')]) }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
