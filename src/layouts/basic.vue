<template>
  <n-layout has-sider class="h-full">
    <n-layout-sider :width="180" bordered show-trigger collapse-mode="width">
      <n-menu :options="menus" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header
        bordered
        class="h-[56px] pb-[12px] pl-[16px] pr-[16px] pt-[12px]"
      >
        <n-space align="center" justify="space-between" class="w-full">
          <HeaderBrand />
          <div class="flex items-center">
            <HeaderUserAvatar />
            <n-divider vertical class="!ml-[12px] !mr-[12px] !h-[24px]" />
            <HeaderUserAvatar />
          </div>
        </n-space>
      </n-layout-header>
      <n-layout-content>
        <slot />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { ref } from "vue";
import HeaderBrand from "@components/Header/Brand/index.vue";
import HeaderUserAvatar from "@components/Header/UserAvatar/index.vue";
import useIconRender from "@composables/icon";
import { Cogs } from "@vicons/fa";

const menus = ref([
  {
    label: "基础管理",
    key: "BASIC-MANAGEMENT",
    icon: useIconRender(Cogs),
    children: [
      { label: "组织管理", key: "BASIC-MANAGEMENT-ORGANIZATION" },
      { label: "人员管理", key: "BASIC-MANAGEMENT-USER" },
      { label: "角色管理", key: "BASIC-MANAGEMENT-ROLE" },
    ],
  },
]);
</script>
