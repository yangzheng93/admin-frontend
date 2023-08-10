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
      <div class="flex flex-col">
        <span class="font-medium text-[#1f2225]">
          {{ userStore?.user?.name }}
        </span>
        <small v-if="userStore?.user?.is_admin" class="text-[#767c82]">
          系统管理员
        </small>
      </div>
    </div>
  </n-dropdown>
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
  { label: "退出登录", key: "SYSTEM-LOGIN" },
]);

const router = useRouter();

const userStore = useUserStore();

const onDropdownSelect = (key) => {
  if (key === "SYSTEM-LOGIN") {
    userStore.removeToken();
    userStore.removeUser();
  }

  router.push({ name: key });
};
</script>
