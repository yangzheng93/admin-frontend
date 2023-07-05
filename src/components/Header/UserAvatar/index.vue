<template>
  <n-dropdown
    trigger="hover"
    placement="bottom-end"
    show-arrow
    :options="dropdowns"
    :on-select="onDropdownSelect"
  >
    <div class="flex cursor-pointer items-center">
      <n-avatar
        round
        :size="32"
        :style="{ backgroundColor: '#18a058' }"
        class="mr-[12px]"
      >
        <IconUser />
      </n-avatar>
      {{ userStore?.user?.name }}
    </div>
  </n-dropdown>

  <!-- <n-modal
    :show="visiblePwd"
    preset="dialog"
    positive-text="确 定"
    negative-text="取 消"
    :show-icon="false"
    :closable="false"
    :mask-closable="false"
    :close-on-esc="false"
    :on-positive-click="toSave"
    :on-negative-click="toClose"
  >
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
    </n-form>
  </n-modal> -->
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@stores/user";
import useIconRender from "@composables/icon";
import { UserTie } from "@vicons/fa";

const IconUser = useIconRender(UserTie, { size: 18 });

const dropdowns = ref([
  { label: "用户中心", key: "ACCOUNT-CENTER" },
  { type: "divider", key: "divider" },
  { label: "退出登录", key: "SYSTEM-LOGOUT" },
]);

const router = useRouter();

const userStore = useUserStore();

const onDropdownSelect = (key) => {
  if (key === "SYSTEM-LOGOUT") {
    userStore.removeToken();
    userStore.removeUser();
  }

  router.push({ name: key });
};
</script>
