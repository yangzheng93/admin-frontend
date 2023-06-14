<template>
  <n-dropdown
    trigger="hover"
    placement="bottom-end"
    :options="dropdowns"
    @on-select="onDropdownSelect"
  >
    <div class="flex cursor-pointer items-center">
      <n-avatar round :size="32" :style="{ backgroundColor: '#18a058' }">
        YZ
      </n-avatar>
    </div>
  </n-dropdown>

  <!-- 修改密码 -->
  <n-modal v-model:show="visiblePwd"> 123 </n-modal>
</template>

<script setup>
import { reactive, ref } from "vue";

const dropdowns = ref([
  { label: "用户中心", key: "user-center" },
  { label: "修改密码", key: "edit-password" },
  { type: "divider", key: "divider" },
  { label: "退出登录", key: "logout" },
]);

const visiblePwd = ref(false);

const onDropdownSelect = (key) => {
  console.log(key);
  if (key === "edit-password") {
    visiblePwd.value = true;
  }
};
</script>
