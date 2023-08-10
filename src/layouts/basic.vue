<template>
  <n-layout has-sider class="h-full">
    <n-layout-sider bordered show-trigger collapse-mode="width">
      <n-menu default-expand-all :options="menus" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered class="h-[64px] pl-[20px] pr-[20px]">
        <n-space align="center" justify="space-between" class="h-full w-full">
          <Brand />
          <n-space :size="18" align="center">
            <MessageCenter />
            <n-divider vertical class="!m-0 !h-[28px]" />
            <UserAvatar />
          </n-space>
        </n-space>
      </n-layout-header>
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
import Brand from "./components/Brand/index.vue";
import UserAvatar from "./components/UserAvatar/index.vue";
import MessageCenter from "./components/MessageCenter/index.vue";
import useIconRender from "@composables/icon";
import useRouterRender from "@composables/router";
import { AddressCard, Cogs, ShieldAlt, Users } from "@vicons/fa";
import { ApartmentOutlined, FileFilled } from "@vicons/antd";

const menus = ref([
  {
    label: "企业管理",
    key: "CORP-MANAGEMENT",
    icon: useIconRender(Cogs),
    children: [
      {
        label: useRouterRender(
          { to: { name: "CORP-ROLES-AND-PERMISSIONS" } },
          "角色与权限",
        ),
        key: "CORP-ROLES-AND-PERMISSIONS",
        icon: useIconRender(ShieldAlt),
      },
      {
        label: useRouterRender({ to: { name: "CORP-DEPARTMENT" } }, "部门管理"),
        key: "CORP-DEPARTMENT",
        icon: useIconRender(ApartmentOutlined),
      },
      {
        label: useRouterRender({ to: { name: "CORP-ACCOUNT" } }, "员工管理"),
        key: "CORP-ACCOUNT",
        icon: useIconRender(Users),
      },
    ],
  },
  {
    label: "客户管理",
    key: "CUSTOMER-MANAGEMENT",
    icon: useIconRender(AddressCard),
    children: [
      {
        label: useRouterRender(
          { to: { name: "CUSTOMER-ACCOUNT" } },
          "客户资料",
        ),
        key: "CUSTOMER-ACCOUNT",
        icon: useIconRender(Users),
      },
    ],
  },
  {
    label: useRouterRender({ to: { name: "HOME-TEMPLATE" } }, "文件模板管理"),
    key: "HOME-TEMPLATE",
    icon: useIconRender(FileFilled),
  },
]);
</script>
