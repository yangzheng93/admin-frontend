<template>
  <n-space :size="12" align="center" justify="space-between">
    <img src="/public/images/brand.svg" class="h-[32px] w-[32px]" />
    <router-link :to="{ name: 'HOME-WORKBENCH' }">
      <span class="text-[18px] text-[#333639]">Naive - Admin</span>
    </router-link>
  </n-space>
</template>

<script setup></script>
