<template>
  <div class="account-center">
    <n-space justify="center" :size="20">
      <n-card :content-style="{ width: '300px' }">
        <n-button-group vertical class="w-full">
          <n-button
            v-for="btn in buttons"
            :key="btn.value"
            :type="actived === btn.value ? 'primary' : ''"
            block
            @click="() => (actived = btn.value)"
          >
            {{ btn.label }}
          </n-button>
        </n-button-group>
      </n-card>

      <UserForm v-if="actived === 'USERINFO'" />
      <PwdForm v-if="actived === 'PASSWORD'" />
    </n-space>
  </div>
</template>

<script>
import { ref } from "vue";
import UserForm from "./components/UserForm/index.vue";
import PwdForm from "./components/PwdForm/index.vue";

export default {
  name: "AccountCenter",
  components: { UserForm, PwdForm },
  setup() {
    const actived = ref("USERINFO");

    const buttons = ref([
      { label: "个人信息", value: "USERINFO" },
      { label: "账号密码", value: "PASSWORD" },
    ]);

    return { actived, buttons };
  },
};
</script>
