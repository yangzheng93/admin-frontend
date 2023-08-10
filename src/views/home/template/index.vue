<template>
  <div class="home-template">
    <n-card>
      <a
        href="/public/templates/UserImport.csv"
        target="_blank"
        class="text-[#2080f0] underline"
      >
        1. 员工批量导入模版（UserImport.csv）
      </a>
    </n-card>
  </div>
</template>

<script>
import { useUserStore } from "@stores/user";

export default {
  name: "HomeTemplate",
  setup() {
    const userStore = useUserStore();

    return { userStore };
  },
};
</script>
