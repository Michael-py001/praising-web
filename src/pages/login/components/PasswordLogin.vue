<template>
  <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
    @submit="onSubmit"
    class="w-72"
  >
    <a-form-item
      name="account"
      :rules="[{ required: true, message: '请输入掘金手机号或邮箱！' }]"
    >
      <a-input
        v-model:value="formState.account"
        :disabled="loading"
        placeholder="请输入掘金手机号或邮箱"
      >
        <template #prefix><UserOutlined class="site-form-item-icon" /></template>
      </a-input>
    </a-form-item>

    <a-form-item name="password" :rules="[{ required: true, message: '请输入密码！' }]">
      <a-input-password
        v-model:value="formState.password"
        :disabled="loading"
        placeholder="请输入掘金手机号或邮箱"
      >
        <template #prefix><LockOutlined class="site-form-item-icon" /></template>
      </a-input-password>
    </a-form-item>

    <a-button class="w-full" type="primary" html-type="submit" :loading="loading">
      {{ loading ? '正在攻入掘金，请耐心等待...' : '登录' }}
    </a-button>
  </a-form>
</template>

<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { useStorage } from '@vueuse/core';
import useUserStore from '@/stores/user';
import { login } from '@/api/login';

const props = defineProps<{
  shareId: string;
}>();

const formState = useStorage('formState', {
  account: '',
  password: '',
});

const userStore = useUserStore();

const loading = ref(false);

function onSubmit() {
  loading.value = true;
  const params = {
    account: formState.value.account,
    password: formState.value.password,
    shareId: props.shareId,
  };
  login(params)
    .then((res) => {
      userStore.handleLogin(res.data);
    })
    .catch((err) => {
      notification.error({
        message: '登录失败',
        description: err.message,
      });
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
