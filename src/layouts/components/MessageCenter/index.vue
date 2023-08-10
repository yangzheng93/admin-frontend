<template>
  <n-badge :value="4" :max="99" dot>
    <n-avatar round class="!h-[32px] !w-[32px]">
      <IconBell />
    </n-avatar>
  </n-badge>
</template>

<script setup>
import useIconRender from "@composables/icon";
import { Bell } from "@vicons/fa";

const IconBell = useIconRender(Bell, { size: 16 });
</script>
