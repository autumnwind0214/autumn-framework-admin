<script lang="ts" setup>
import type { DataNode } from 'ant-design-vue/es/tree';

import type { SystemUserApi } from '#/api/system/user';

import { computed, ref } from 'vue';

import { useVbenDrawer, VbenTree } from '@vben/common-ui';

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  createUserApi,
  getAllRoleApi,
  getUserDetailApi,
  updateUserApi,
} from '#/api';
import { $t } from '#/locales';

import { useFormSchema } from '../data';
import type { Recordable } from "@vben-core/typings";

const emits = defineEmits(['success']);

const formData = ref<SystemUserApi.SystemUser>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isHorizontal = computed(() => breakpoints.greaterOrEqual('md').value);

const [Form, formApi] = useVbenForm({
  schema: useFormSchema(),
  showDefaultActions: false,
});

const roles = ref<DataNode[]>([]);
const loadingRoles = ref(false);

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    drawerApi.lock();
    (id.value ? updateUserApi(id.value, values) : createUserApi(values))
      .then(() => {
        message.success($t('ui.actionMessage.operationSuccess'));
        emits('success');
        drawerApi.close();
      })
      .catch(() => {
        drawerApi.unlock();
      });
  },
  async onOpenChange(isOpen) {
    if (isOpen) {
      let data = drawerApi.getData<SystemUserApi.SystemUser>();
      formApi.resetForm();
      if (data && Object.keys(data).length > 0) {
        id.value = data.id;
        data = await getUserDetailApi(data.id);
        formData.value = data;
        formApi.setValues(data);
      } else {
        id.value = undefined;
        formApi.resetForm();
      }

      if (roles.value.length === 0) {
        loadRoles();
      }
    }
  },
});

async function loadRoles() {
  loadingRoles.value = true;
  try {
    const res = await getAllRoleApi();
    roles.value = res as unknown as DataNode[];
  } finally {
    loadingRoles.value = false;
  }
}

const getDrawerTitle = computed(() => {
  return formData.value?.id
    ? $t('common.edit', $t('system.role.name'))
    : $t('common.create', $t('system.role.name'));
});
function getNodeClass() {
  const classes: string[] = [];
  classes.push('inline-flex', '!pl-0');
  return classes.join(' ');
}
</script>
<template>
  <Drawer class="w-full max-w-[800px]" :title="getDrawerTitle">
    <Form class="mx-4" :layout="isHorizontal ? 'horizontal' : 'vertical'">
      <template #roleIds="slotProps">
        <Spin :spinning="loadingRoles" wrapper-class-name="w-full">
          <VbenTree
            :tree-data="roles"
            multiple
            bordered
            :default-expanded-level="2"
            :get-node-class="getNodeClass"
            v-bind="slotProps"
            value-field="id"
            label-field="roleIds"
          >
            <template #node="{ value }">
              {{ $t(value.roleName) }}
            </template>
          </VbenTree>
        </Spin>
      </template>
    </Form>
  </Drawer>
</template>
