<template>
  <n-card title="账号密码" :content-style="{ width: '600px' }">
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formData"
      :rules="{
        oldPwd: { required: true, message: '请输入旧密码', trigger: 'blur' },
        newPwd: { required: true, message: '请输入新密码', trigger: 'blur' },
        confirmPwd: {
          required: true,
          message: '请再次输入新密码',
          trigger: 'blur',
        },
      }"
      class="w-[60%]"
    >
      <n-form-item label="旧密码" path="oldPwd">
        <n-input v-model:value="formData.oldPwd" placeholder="请输入旧密码" />
      </n-form-item>
      <n-form-item label="新密码" path="newPwd">
        <n-input v-model:value="formData.newPwd" placeholder="请输入新密码" />
      </n-form-item>
      <n-form-item label="确认密码" path="confirmPwd">
        <n-input
          v-model:value="formData.confirmPwd"
          placeholder="请再次输入新密码"
        />
      </n-form-item>
      <n-button type="primary" class="!mt-[10px] !w-[100%]" @click="toSave">
        保 存
      </n-button>
    </n-form>
  </n-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useMessage } from "naive-ui";

const message = useMessage();

const formRef = ref(null);

const formData = reactive({ oldPwd: "", newPwd: "", confirmPwd: "" });

const toSave = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success("Valid");
    } else {
      message.error("Invalid");
    }
  });
};
</script>
