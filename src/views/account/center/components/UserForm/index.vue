<template>
  <n-spin :show="loading">
    <n-form
      ref="formRef"
      :model="formData"
      :rules="{
        name: {
          required: true,
          message: '姓名不能为空',
          trigger: 'blur',
        },
        phone: {
          required: true,
          message: '手机号不能为空',
          trigger: 'blur',
        },
      }"
      :label-width="80"
      label-align="left"
      class="w-[60%]"
    >
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="formData.name" placeholder="请填写您的姓名" />
      </n-form-item>
      <n-form-item label="性别" path="gender">
        <n-select
          v-model:value="formData.gender"
          :options="[
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ]"
          placeholder="请选择您的性别"
        />
      </n-form-item>
      <n-form-item label="手机号" path="phone">
        <n-input
          v-model:value="formData.phone"
          placeholder="请填写您的手机号"
        />
      </n-form-item>
      <n-form-item label="部门" path="department_name">
        <n-input
          v-model:value="formData.department_name"
          disabled
          placeholder="请联系您的部门负责人添加"
        />
      </n-form-item>
      <n-button type="primary" class="!mt-[10px] !w-[100%]" @click="toSave">
        保 存
      </n-button>
    </n-form>
  </n-spin>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useMessage } from "naive-ui";
import { useUserStore } from "@stores/user";
import { API_GET_USERINFO, API_SAVE_USER } from "@services/user";

const message = useMessage();

const userStore = useUserStore();

const loading = ref(false);

const formRef = ref(null);

const formData = reactive({
  name: "",
  gender: undefined,
  phone: "",
  department_name: "", // readonly
});

const acquireUserInfo = () => {
  const user = userStore.user;
  loading.value = true;
  API_GET_USERINFO({ id: user.id })
    .then((info) => {
      formData.name = info.name;
      formData.gender = info.gender;
      formData.phone = info.phone;
      formData.department_name = info.department_name;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};

const toSave = () => {
  const user = userStore.user;
  formRef.value?.validate((errors) => {
    if (!errors) {
      API_SAVE_USER({
        id: user.id,
        name: formData.name,
        gender: formData.gender,
        phone: formData.phone,
      }).then((data) => {
        if (data.id) {
          message.success("保存成功", {
            duration: 1500,
            onAfterLeave: () => {
              userStore.setUser(
                Object.assign(user, {
                  name: formData.name,
                  phone: formData.phone,
                }),
              );
            },
          });
        }
      });
    }
  });
};

acquireUserInfo();
</script>
