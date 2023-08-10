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
import { useUserStore } from "@stores/user";
import { API_LOGIN } from "@services/auth";
import { API_GET_USERINFO } from "@services/user";

export default {
  name: "SystemLogin",
  components: { UserOutlined, LockOutlined },
  setup() {
    const message = useMessage();

    const userStore = useUserStore();

    const formRef = ref(null);

    const formData = reactive({ phone: "13812341234", password: "888888" });

    return { message, userStore, formRef, formData };
  },
  created() {
    if (this.userStore.token) {
      this.$router.push({ name: "HOME-WORKBENCH" });
    }
  },
  methods: {
    toLogin() {
      this.$refs["formRef"]?.validate((errors) => {
        if (!errors) {
          API_LOGIN({
            phone: this.formData.phone,
            password: this.formData.password,
          }).then(({ token }) => {
            this.message.success("登录成功, 即将进入系统", {
              duration: 1000,
              onAfterLeave: () => {
                this.userStore.setToken(token);
                this.$router.push({ name: "HOME-WORKBENCH" });
              },
            });
          });
        }
      });
    },
  },
};
</script>
