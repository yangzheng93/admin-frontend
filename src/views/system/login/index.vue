<template>
  <div class="system-login h-full">
    <n-grid class="h-full">
      <n-grid-item :span="8" class="bg-[#2080f0]"></n-grid-item>
      <n-grid-item :span="16" class="flex items-center justify-center">
        <n-card title="登录您的账号" class="!w-[500px] !rounded-[12px]">
          <n-form
            ref="formRef"
            :model="formData"
            :rules="{
              phone: {
                required: true,
                message: '请输入手机号',
                trigger: 'blur',
              },
              password: {
                required: true,
                message: '请输入密码',
                trigger: 'blur',
              },
            }"
            :show-label="false"
          >
            <n-form-item path="phone">
              <n-input
                v-model:value="formData.phone"
                size="large"
                placeholder="请输入手机号"
              >
                <template #prefix>
                  <n-icon :size="16">
                    <UserOutlined />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="password">
              <n-input
                v-model:value="formData.password"
                type="password"
                show-password-on="click"
                size="large"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <n-icon :size="16">
                    <LockOutlined />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-button type="primary" size="large" block @click="toLogin">
              登 录
            </n-button>
          </n-form>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { LockOutlined, UserOutlined } from "@vicons/antd";
import { useMessage } from "naive-ui";
import { API_LOGIN } from "@services/auth";

export default {
  name: "SystemLogin",
  components: { UserOutlined, LockOutlined },
  setup() {
    const message = useMessage();

    const formRef = ref(null);

    const formData = reactive({ phone: "", password: "" });

    return { message, formRef, formData };
  },
  methods: {
    toLogin() {
      this.$refs["formRef"]?.validate((errors) => {
        if (!errors) {
          API_LOGIN({
            phone: this.formData.phone,
            password: this.formData.password,
          }).then((res) => {
            console.log(res);
          });
        }
      });
    },
  },
};
</script>
