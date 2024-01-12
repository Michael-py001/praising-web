<template>
  <a-table
    rowKey="id"
    :loading="store.loading"
    :dataSource="store.pageData"
    :columns="columns"
    :pagination="store.pagination"
    size="small"
    @change="change"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'index'">
        {{ (store.pagination.page - 1) * store.pagination.pageSize + index + 1 }}
      </template>
      <template v-else-if="column.key === 'action'">
        <a-button type="link" @click="handleEdit(record)">
          {{ record.isTemplate ? '取消模板' : '设为模板' }}
        </a-button>
      </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import useStore from '../store';
import columns from './columns';
import { setTemplate, PagePin } from '@/api/pin';

const store = useStore();

function change(pagination: any) {
  store.pagination.page = pagination.current || 1;
  store.pagination.pageSize = pagination.pageSize || 10;
  store.getPageData();
}

async function handleEdit(record: PagePin) {
  await setTemplate(record.id, !record.isTemplate);
  store.getPageData();
}
</script>
