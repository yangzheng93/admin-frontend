<template>
  <n-dropdown
    trigger="hover"
    placement="bottom-end"
    :options="dropdowns"
    @on-select="onDropdownSelect"
  >
    <div class="flex cursor-pointer items-center">
      <n-avatar :size="32" :style="{ backgroundColor: '#18a058' }">
        YZ
      </n-avatar>
      <!-- <span class="color-[#333639] ml-[6px] text-[16px]">YangZheng</span> -->
    </div>
  </n-dropdown>
</template>

<script setup>
import { ref } from "vue";
import { router } from "vue-router";

const dropdowns = ref([
  { label: "用户中心", key: "user-center" },
  { label: "修改密码", key: "edit-password" },
  { type: "divider", key: "divider" },
  { label: "退出登录", key: "logout" },
]);

const onDropdownSelect = (key) => {
  if (key === "user-center") {
  }
};
</script>
