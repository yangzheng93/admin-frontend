<template>
  <n-card title="个人信息" :content-style="{ width: '600px' }">
    <n-form
      ref="formRef"
      :model="formData"
      :rules="{
        username: {
          required: true,
          message: '请输入您的姓名',
          trigger: 'blur',
        },
        phone: {
          required: true,
          message: '请输入您的联系电话',
          trigger: 'blur',
        },
      }"
      :label-width="80"
      label-align="left"
      class="w-[60%]"
    >
      <n-form-item label="姓名" path="username">
        <n-input v-model:value="formData.username" placeholder="请填写姓名" />
      </n-form-item>
      <n-form-item label="性别" path="gender">
        <n-select
          v-model:value="formData.gender"
          :options="[
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ]"
          placeholder="请选择性别"
        />
      </n-form-item>
      <n-form-item label="手机号" path="phone">
        <n-input
          v-model:value="formData.phone"
          readonly
          placeholder="请输入您的手机号"
        />
      </n-form-item>
      <n-form-item label="部门" path="department">
        <n-input
          v-model:value="formData.department"
          disabled
          placeholder="请联系您的部门负责人添加"
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

const formData = reactive({
  username: "某某某",
  gender: undefined,
  phone: "",
  department: "", // readonly
});

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
