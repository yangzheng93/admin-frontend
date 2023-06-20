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

export default {
  name: "App",
  setup() {
    const route = useRoute();
    const layout = computed(() => route.meta.layout || "basic");

    return {
      layout,
      layouts: {
        basic: defineAsyncComponent(() => import("@layouts/basic2.vue")),
        blank: defineAsyncComponent(() => import("@layouts/blank.vue")),
      },
    };
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
