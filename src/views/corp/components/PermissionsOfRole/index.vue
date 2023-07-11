<template>
  <div :size="0" vertical>
    <div v-for="(list, name) in permissionsByGroup" :key="name">
      <n-space :size="0" class="flex items-start">
        <n-checkbox :label="name" class="w-[200px]" />
        <n-checkbox-group v-model:value="selections">
          <n-space :size="10" vertical>
            <n-checkbox
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              class="!items-center"
            >
              {{ item.name }}
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-space>
      <n-divider />
    </div>
    <div class="flex justify-end">
      <n-button type="primary" size="small" @click="visible = true">
        保存
      </n-button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { PlusOutlined } from "@vicons/antd";
import { usePermissionStore } from "@stores/permission";
import { groupBy } from "lodash-es";

export default {
  name: "PermissionsOfRole",
  components: { PlusOutlined },
  props: {
    users: { type: Array, default: () => [] },
    activedRole: { type: String, default: "" },
  },
  setup() {
    const permissionStore = usePermissionStore();

    const allCheckedGroup = ref([]);

    const selections = ref([]);

    const permissionsByGroup = computed(() => {
      return groupBy(permissionStore.permissions, "group_name");
    });

    return { permissionStore, permissionsByGroup, allCheckedGroup, selections };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
