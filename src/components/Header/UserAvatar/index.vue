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
      某某某
    </div>
  </n-dropdown>

  <!-- 修改密码 -->
  <n-modal
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
  </n-modal>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import useIconRender from "@composables/icon";
import { UserTie } from "@vicons/fa";

const IconUser = useIconRender(UserTie, { size: 18 });

const message = useMessage();

const router = useRouter();

const dropdowns = ref([
  { label: "用户中心", key: "user-center" },
  { label: "修改密码", key: "edit-password" },
  { type: "divider", key: "divider" },
  { label: "退出登录", key: "logout" },
]);

const visiblePwd = ref(false);
const onDropdownSelect = (key) => {
  if (key === "edit-password") {
    visiblePwd.value = true;
  } else {
    router.push({ name: "ACCOUNT-CENTER" });
  }
};

const formRef = ref(null);
const formData = reactive({ oldPwd: "", newPwd: "", confirmPwd: "" });
const toClose = () => (visiblePwd.value = false);
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
