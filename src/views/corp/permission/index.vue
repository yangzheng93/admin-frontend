<template>
  <div class="corp-permission">
    <n-space justify="center" :size="20">
      <n-card :content-style="{ width: '300px' }">
        <n-space :size="20" vertical>
          <n-space justify="space-between">
            <n-input
              v-model:value="keyOfRole"
              type="text"
              placeholder="搜索角色"
            >
              <template #prefix>
                <n-icon :size="16">
                  <SearchOutlined />
                </n-icon>
              </template>
            </n-input>
            <n-button type="primary" class="!pl-[8px] !pr-[8px]">
              <n-icon :size="20">
                <PlusOutlined />
              </n-icon>
            </n-button>
          </n-space>
          <n-button-group vertical class="w-full">
            <n-button
              v-for="role in filteredRoles"
              :key="role"
              :type="activedRole === role ? 'primary' : ''"
              block
              @click="() => (activedRole = role)"
            >
              {{ role }}
            </n-button>
          </n-button-group>
        </n-space>
      </n-card>
      <n-card :content-style="{ width: '600px' }">
        <n-tabs type="line">
          <n-tab-pane name="USER" tab="角色成员管理"> Wonderwall </n-tab-pane>
          <n-tab-pane name="PERMISSION" tab="角色权限配置">
            Hey Jude
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-space>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { SearchOutlined, PlusOutlined } from "@vicons/antd";

export default {
  name: "CorpPermission",
  components: { SearchOutlined, PlusOutlined },
  setup() {
    const keyOfRole = ref("");

    const activedRole = ref("系统管理员");

    const roles = ref(["系统管理员", "部门负责人", "普通员工"]);

    const filteredRoles = computed(() => {
      return roles.value.filter(
        (i) => !keyOfRole.value || i.includes(keyOfRole.value),
      );
    });

    return { keyOfRole, filteredRoles, activedRole };
  },
};
</script>

<style lang="scss" scoped></style>
