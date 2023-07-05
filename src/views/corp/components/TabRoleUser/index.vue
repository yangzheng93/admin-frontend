<template>
  <div>
    <n-space v-if="users.length > 0" :size="12" vertical>
      <n-checkbox v-model:checked="allChecked" label="全选" />
      <n-checkbox-group v-model:value="selections">
        <n-space :size="12" vertical>
          <n-checkbox
            v-for="item in users"
            :key="item.id"
            :value="item.id"
            class="!items-center"
          >
            <div class="flex items-center">
              <n-avatar
                round
                object-fit="cover"
                :size="32"
                :style="{ backgroundColor: '#18a058' }"
              >
                {{ item.name.length > 2 ? item.name.slice(1) : item.name }}
              </n-avatar>
              <div class="ml-[8px] flex flex-col">
                <span class="font-medium text-[#1f2225]">
                  {{ item.name }}
                </span>
                <small class="text-[#767c82]">
                  {{ item.phone }} {{ item.department_name }}
                </small>
              </div>
            </div>
          </n-checkbox>
        </n-space>
      </n-checkbox-group>
    </n-space>

    <n-empty v-else description="暂无用户"></n-empty>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TabRoleUser",
  props: {
    users: { type: Array, default: () => [] },
  },
  setup() {
    const allChecked = ref(false);

    const selections = ref([]);

    return { allChecked, selections };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
