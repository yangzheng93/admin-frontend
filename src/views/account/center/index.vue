<template>
  <div class="account-center">
    <n-space justify="center" :size="20">
      <n-card :content-style="{ width: '300px' }">
        <n-button-group vertical class="w-full">
          <n-button
            v-for="btn in buttons"
            :key="btn.value"
            :type="actived === btn.value ? 'primary' : ''"
            block
            @click="() => setActivedBtn(btn.value)"
          >
            {{ btn.label }}
          </n-button>
        </n-button-group>
      </n-card>
      <n-card title="个人信息" :content-style="{ width: '600px' }">
        <n-form
          :model="formData"
          :rules="{
            username: {
              required: true,
              message: '用户名不能为空',
              trigger: 'blur',
            },
          }"
          :label-width="80"
          label-align="left"
          class="w-[60%]"
        >
          <n-form-item label="用户名" path="username">
            <n-input
              v-model:value="formData.username"
              placeholder="请填写用户名"
            />
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
          <n-form-item label="联系电话" path="phone">
            <n-input
              v-model:value="formData.phone"
              readonly
              placeholder="请输入您的联系电话"
            />
          </n-form-item>
          <n-form-item label="部门" path="department">
            <n-input
              v-model:value="formData.department"
              disabled
              placeholder="请联系您的部门负责人添加"
            />
          </n-form-item>
          <n-button type="primary" class="!mt-[10px] !w-[100%]">
            保 存
          </n-button>
        </n-form>
      </n-card>
    </n-space>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "AccountCenter",
  setup() {
    const formData = reactive({
      username: "某某某", // readonly
      gender: undefined,
      phone: "",
      department: "", // readonly
    });

    const actived = ref("USER_INFO");

    const buttons = ref([
      { label: "个人信息", value: "USER_INFO" },
      { label: "账号密码", value: "PASSWORD" },
    ]);

    return { formData, actived, buttons };
  },
  methods: {
    setActivedBtn(v) {
      this.actived = v;
    },
  },
};
</script>
