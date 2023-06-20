<template>
  <n-layout class="h-full">
    <!-- <n-layout-sider bordered show-trigger collapse-mode="width">
      <n-menu :options="menus" />
    </n-layout-sider> -->
    <n-layout-header bordered class="h-[64px] pl-[20px] pr-[20px]">
      <n-space align="center" justify="space-between" class="h-full w-full">
        <HeaderBrand />
        <n-menu mode="horizontal" :options="menus" />
        <n-space :size="18" align="center">
          <MessageCenter />
          <n-divider vertical class="!m-0 !h-[28px]" />
          <HeaderUserAvatar />
        </n-space>
      </n-space>
    </n-layout-header>
    <n-layout>
      <n-layout-content class="m-[16px]">
        <div class="h-full">
          <slot />
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { ref } from "vue";
import HeaderBrand from "@components/Header/Brand/index.vue";
import HeaderUserAvatar from "@components/Header/UserAvatar/index.vue";
import MessageCenter from "@components/Header/MessageCenter/index.vue";
import useIconRender from "@composables/icon";
import useRouterRender from "@composables/router";
import { Cogs, ShieldAlt, Users } from "@vicons/fa";
import { ApartmentOutlined } from "@vicons/antd";

const menus = ref([
  {
    label: "系统管理",
    key: "SYSTEM-MANAGEMENT",
    icon: useIconRender(Cogs),
    children: [
      {
        label: useRouterRender(
          { to: { name: "MANAGEMENT-PERMISSION" } },
          "角色与权限",
        ),
        key: "MANAGEMENT-PERMISSION",
        icon: useIconRender(ShieldAlt),
      },
      {
        label: useRouterRender(
          { to: { name: "MANAGEMENT-DEPARTMENT" } },
          "部门管理",
        ),
        key: "MANAGEMENT-DEPARTMENT",
        icon: useIconRender(ApartmentOutlined),
      },
      {
        label: useRouterRender(
          { to: { name: "MANAGEMENT-ACCOUNT" } },
          "企业通讯录管理",
        ),
        key: "MANAGEMENT-ACCOUNT",
        icon: useIconRender(Users),
      },
    ],
  },
]);
</script>
