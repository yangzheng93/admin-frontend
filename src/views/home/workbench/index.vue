<template>
  <div class="home-workbench">
    所有的权限：{{ permissionStore.myPermissions }}
  </div>
</template>

<script>
import { usePermissionStore } from "@stores/permission";

export default {
  name: "DashboardWorkbench",
  setup() {
    const permissionStore = usePermissionStore();

    return { permissionStore };
  },
};
</script>
