<template>
  <component :is="layouts[layout]">
    <router-view />
  </component>
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
        basic: defineAsyncComponent(() => import("@layouts/basic.vue")),
        blank: defineAsyncComponent(() => import("@layouts/blank.vue")),
      },
    };
  },
};
</script>

<style>
@import "./styles/tailwind.css";
</style>

<style lang="less">
@import "./styles/reset.less";
</style>

