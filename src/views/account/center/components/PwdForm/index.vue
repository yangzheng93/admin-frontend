<template>
  <n-form
    ref="formRef"
    :label-width="80"
    :model="formData"
    :rules="formRules"
    class="w-[60%]"
  >
    <n-form-item label="旧密码" path="oldPassword">
      <n-input
        v-model:value="formData.oldPassword"
        type="password"
        show-password-on="click"
        placeholder="请输入旧密码"
      />
    </n-form-item>
    <n-form-item label="新密码" path="password">
      <n-input
        v-model:value="formData.password"
        type="password"
        show-password-on="click"
        placeholder="请输入新密码"
      />
    </n-form-item>
    <n-form-item label="确认密码" path="confirmed">
      <n-input
        v-model:value="formData.confirmed"
        type="password"
        show-password-on="click"
        placeholder="请再次输入新密码"
      />
    </n-form-item>
    <n-button type="primary" class="!mt-[10px] !w-[100%]" @click="toSave">
      保 存
    </n-button>
  </n-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { useUserStore } from "@stores/user";
import { API_UPDATE_USERPASSWORD } from "@services/user";

const message = useMessage();

const router = useRouter();

const userStore = useUserStore();

const formRef = ref(null);

const formData = reactive({ oldPassword: "", password: "", confirmed: "" });

const formRules = {
  oldPassword: { required: true, message: "请输入旧密码", trigger: "blur" },
  password: { required: true, message: "请输入新密码", trigger: "blur" },
  confirmed: [
    {
      required: true,
      message: "请再次输入新密码",
      trigger: "blur",
    },
    {
      validator: (_, value) => {
        return value === formData.password;
      },
      message: "两次密码输入不一致",
      trigger: "blur",
    },
  ],
};

const toSave = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      API_UPDATE_USERPASSWORD(formData).then(() => {
        message.success("修改成功，请重新登录", {
          duration: 1500,
          onAfterLeave: () => {
            userStore.removeToken();
            userStore.removeUser();
            router.push({ name: "SYSTEM-LOGIN" });
          },
        });
      });
    }
  });
};
</script>
