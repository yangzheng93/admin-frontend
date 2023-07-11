<template>
  <div>
    <n-space align="center" justify="space-between">
      <n-button type="primary" size="small" @click="visible = true">
        <template #icon>
          <n-icon>
            <PlusOutlined />
          </n-icon>
        </template>
        添加
      </n-button>
      <n-popconfirm
        v-if="selections.length > 0"
        :show-icon="false"
        positive-text="确定"
        negative-text="取消"
        :on-positive-click="onConfirmToRemove"
      >
        <template #trigger>
          <div class="flex items-center">
            <n-button type="error" ghost size="small">
              <template #icon>
                <n-icon :size="20">
                  <MinusCircleOutlined />
                </n-icon>
              </template>
              移除
            </n-button>
            （已选{{ selections.length }}人）
          </div>
        </template>
        从该角色中移除所有选中的用户？
      </n-popconfirm>
    </n-space>
    <n-space
      v-if="usersInRole.length > 0"
      :size="16"
      vertical
      class="mt-[16px]"
    >
      <n-checkbox-group v-model:value="selections">
        <n-space :size="12" vertical>
          <n-checkbox
            v-for="item in usersInRole"
            :key="item.user_role_id"
            :value="item.user_role_id"
            class="!items-center"
          >
            <div class="ml-[8px] flex items-center">
              <n-avatar round object-fit="cover" :size="36">
                {{ item.name.length > 2 ? item.name.slice(1) : item.name }}
              </n-avatar>
              <div class="ml-[16px] flex flex-col">
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
    <n-empty v-else description="暂无用户" />
    <n-modal
      preset="dialog"
      title="添加成员"
      positive-text="保 存"
      negative-text="取 消"
      :show="visible"
      :show-icon="false"
      :mask-closable="false"
      :close-on-esc="false"
      :on-positive-click="toAddUser"
      :on-negative-click="toClose"
      :on-close="toClose"
      class="n-dialog-border"
    >
      <n-input
        v-model:value="keyword"
        type="text"
        placeholder="搜索员工或部门信息"
        class="mb-[16px]"
      >
        <template #prefix>
          <n-icon :size="16">
            <SearchOutlined />
          </n-icon>
        </template>
      </n-input>
      <n-scrollbar class="!h-[500px]" trigger="none">
        <n-checkbox-group v-model:value="addeds">
          <n-space :size="12" vertical>
            <n-checkbox
              v-for="item in usersByKeyword"
              :key="item.id"
              :value="item.id"
              class="!items-center"
            >
              <div class="ml-[8px] flex flex-col">
                <span class="font-medium text-[#1f2225]">
                  {{ item.name }}
                </span>
                <small class="text-[#767c82]">
                  {{ item.phone }} {{ item.department_name }}
                </small>
              </div>
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-scrollbar>
    </n-modal>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@vicons/antd";
import {
  API_UPSERT_USER_ROLE,
  API_REMOVE_USER_ROLE,
} from "@services/user-role";

export default {
  name: "UsersOfRole",
  components: { MinusCircleOutlined, PlusOutlined, SearchOutlined },
  props: {
    users: { type: Array, default: () => [] },
    usersInRole: { type: Array, default: () => [] },
    activedRole: { type: Object, default: () => {} },
  },
  emits: ["reload"],
  setup(props) {
    const visible = ref(false);
    const selections = ref([]);
    const keyword = ref("");
    const addeds = ref([]);

    const usersByKeyword = computed(() => {
      if (keyword.value) {
        return props.users.filter((i) => {
          return (
            i.name.includes(keyword.value) ||
            i.department_name.includes(keyword.value)
          );
        });
      }

      return props.users;
    });

    return {
      visible,
      selections,
      keyword,
      addeds,
      usersByKeyword,
    };
  },
  created() {},
  methods: {
    onConfirmToRemove() {
      API_REMOVE_USER_ROLE({ ids: this.selections }).then(() => {
        this.selections = [];
        this.$emit("reload");
      });
    },
    toClose() {
      this.addeds = [];
      this.visible = false;
    },
    toAddUser() {
      const maps = this.usersInRole.reduce((a, b) => {
        // user_role 已经存在的关系
        return { ...a, [b.user_id]: b.user_role_id };
      }, {});

      API_UPSERT_USER_ROLE({
        role_id: this.activedRole.id,
        user_ids: this.addeds.map((user_id) => {
          return {
            id: maps[user_id],
            user_id: user_id,
          };
        }),
      }).then(() => {
        this.toClose();
        this.$emit("reload");
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
