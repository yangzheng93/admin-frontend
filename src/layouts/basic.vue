<template>
  <n-layout class="h-full">
    <n-layout-header
      bordered
      class="h-[56px] pb-[12px] pl-[32px] pr-[32px] pt-[12px]"
    >
      <n-space align="center" justify="space-between" class="w-full">
        <HeaderBrand />
        <div class="flex items-center">
          <HeaderUserAvatar />
        </div>
      </n-space>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        :inverted="inverted"
        style="max-height: 320px"
      >
        <n-menu
          :inverted="inverted"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout>
        <slot />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script>
import HeaderBrand from "@components/Header/Brand/index.vue";
import HeaderUserAvatar from "@components/Header/UserAvatar/index.vue";

export default {
  name: "BasicLayout",
  components: { HeaderBrand, HeaderUserAvatar },
};
</script>
