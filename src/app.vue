<template>
  <n-message-provider>
    <component :is="layouts[layout]">
      <router-view />
    </component>
  </n-message-provider>
</template>

<script>
import { computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@stores/user";

export default {
  name: "App",
  setup() {
    const route = useRoute();
    const layout = computed(() => route.meta.layout || "basic");
    const userStore = useUserStore();

    return {
      userStore,
      // permissionStore,
      layout,
      layouts: {
        basic: defineAsyncComponent(() => import("@layouts/basic.vue")),
        blank: defineAsyncComponent(() => import("@layouts/blank.vue")),
      },
    };
  },
  watch: {
    "userStore.token"(v) {
      if (v) {
        this.userStore.fetchCurUser();
      }
    },
  },
  created() {
    if (this.userStore.token) {
      this.userStore.fetchCurUser();
    }
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<style lang="less">
@import "./styles/reset.less";
</style>
