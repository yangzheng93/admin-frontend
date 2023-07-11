<template>
  <div class="home-workbench">所有的权限: {{ userStore.user.permissions }}</div>
</template>

<script>
import { useUserStore } from "@stores/user";

export default {
  name: "DashboardWorkbench",
  setup() {
    const userStore = useUserStore();

    return { userStore };
  },
};
</script>
