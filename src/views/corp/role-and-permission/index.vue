<template>
  <div class="corp-permission">
    <n-space justify="center" :size="20">
      <n-card :content-style="{ width: '300px' }">
        <n-space :size="20" vertical>
          <n-space justify="space-between">
            <n-input v-model:value="keyword" type="text" placeholder="搜索角色">
              <template #prefix>
                <n-icon :size="16">
                  <SearchOutlined />
                </n-icon>
              </template>
            </n-input>
            <n-button
              type="primary"
              class="!pl-[8px] !pr-[8px]"
              @click="visible = true"
            >
              <n-icon :size="20">
                <PlusOutlined />
              </n-icon>
            </n-button>
          </n-space>
          <ul>
            <li
              v-for="i in filtered"
              :key="i.id"
              :class="`flex h-[40px] cursor-pointer items-center justify-between rounded-[2px] pl-[12px]  ${
                actived === i.name ? 'bg-[#f7f7f7]' : ''
              }`"
              @click="() => (actived = i.name)"
            >
              <div class="flex items-center">
                <n-icon-wrapper
                  v-if="i.name === '系统管理员'"
                  :size="16"
                  :border-radius="2"
                  color="#f0a020"
                >
                  <n-icon :size="14"> <CrownOutlined /> </n-icon>
                </n-icon-wrapper>
                <n-icon-wrapper
                  v-else-if="i.name === '部门负责人'"
                  :size="16"
                  :border-radius="2"
                  color="#18a058"
                >
                  <n-icon :size="12"> <Medal /> </n-icon>
                </n-icon-wrapper>
                <n-icon-wrapper
                  v-else
                  :size="16"
                  :border-radius="2"
                  color="#c2c2c2"
                >
                  <n-icon :size="14"> <UserOutlined /> </n-icon>
                </n-icon-wrapper>

                <span class="ml-[12px]">{{ i.name }}</span>
              </div>
            </li>
          </ul>
        </n-space>
      </n-card>
      <n-card :content-style="{ width: '600px' }">
        <n-tabs type="line">
          <n-tab-pane name="USER" tab="角色成员管理">
            <n-spin :show="loading">
              <TabRoleUser :users="list.users" />
            </n-spin>
          </n-tab-pane>
          <n-tab-pane name="PERMISSION" tab="角色权限配置">
            Hey Jude
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-space>

    <n-modal
      preset="dialog"
      positive-text="保 存"
      negative-text="取 消"
      :show="visible"
      :show-icon="false"
      :closable="false"
      :mask-closable="false"
      :close-on-esc="false"
      :positive-button-props="{ disabled: !formData.name }"
      :on-positive-click="toSave"
      :on-negative-click="toClose"
    >
      <n-form
        :model="formData"
        :label-width="80"
        :show-feedback="false"
        :show-require-mark="true"
      >
        <n-form-item label="角色名称" path="name">
          <n-input v-model:value="formData.name" placeholder="请填写角色名称" />
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import {
  CrownOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@vicons/antd";
import { Medal } from "@vicons/fa";
import TabRoleUser from "../components/TabRoleUser/index.vue";
import { API_GET_ROLES, API_SAVE_ROLE } from "@services/role";
import { API_GET_USERS_BY_ROLE } from "@services/user-role";

export default {
  name: "CorpRoleAndPermission",
  components: {
    CrownOutlined,
    PlusOutlined,
    SearchOutlined,
    UserOutlined,
    Medal,
    TabRoleUser,
  },
  setup() {
    const actived = ref("");

    const list = reactive({ roles: [], users: [] });

    const keyword = ref("");

    const filtered = computed(() => {
      return list.roles.filter(
        (i) => !keyword.value || i.name.includes(keyword.value),
      );
    });

    const visible = ref(false);

    const formData = reactive({ name: "" });

    const loading = ref(false);

    return { actived, list, keyword, filtered, visible, formData, loading };
  },
  watch: {
    actived() {
      this.initUsersByRole();
    },
  },
  created() {
    this.initRoles();
  },
  methods: {
    initRoles() {
      API_GET_ROLES().then((list) => {
        this.list.roles = list;
        this.actived = list[0].name;
      });
    },
    initUsersByRole() {
      this.loading = true;
      API_GET_USERS_BY_ROLE({ name: this.actived })
        .then((list) => {
          this.list.users = list;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    toClose() {
      this.visible = false;
      this.formData.name = "";
    },
    toSave() {
      API_SAVE_ROLE(this.formData).then(() => {
        this.toClose();
        this.initRoles();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
