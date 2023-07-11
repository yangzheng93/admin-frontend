<template>
  <div :size="0" vertical>
    <div v-for="(data, name) in permissionsOfGroup" :key="name">
      <n-space :size="0" class="flex items-start">
        <n-checkbox
          :checked="selectionsOfGroup.includes(name)"
          :label="name"
          class="w-[200px]"
          @update:checked="(v) => onGroupCheckedChange(v, name)"
        />
        <n-checkbox-group v-model:value="selections">
          <n-space :size="10" vertical>
            <n-checkbox
              v-for="item in data"
              :key="item.id"
              :value="item.id"
              class="!items-center"
            >
              {{ item.name }}
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-space>
      <n-divider class="!mb-[12px] !mt-[12px]" />
    </div>
    <div class="flex justify-end">
      <n-button type="primary" size="small" @click="toUpsert">保 存</n-button>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useMessage } from "naive-ui";
import { API_GET_PERMISSIONS } from "@services/permission";
import {
  API_GET_PERMISSIONS_OF_ROLE,
  API_UPSERT_ROLE_PERMISSION,
} from "@services/role-permission";
import { groupBy } from "lodash-es";

export default {
  name: "PermissionsOfRole",
  props: {
    activedRole: { type: Object, default: () => {} },
  },
  setup() {
    const message = useMessage();
    const list = reactive({ permissions: [], permissionsInRole: [] });
    const permissionsOfGroup = computed(() => {
      return groupBy(list.permissions, "group_name");
    });
    const selectionsOfGroup = ref([]);
    const selections = ref([]);

    return {
      message,
      list,
      permissionsOfGroup,
      selectionsOfGroup,
      selections,
    };
  },
  watch: {
    selections(v) {
      Object.keys(this.permissionsOfGroup).forEach((groupName) => {
        if (
          this.permissionsOfGroup[groupName].every((item) => {
            return v.includes(item.id);
          })
        ) {
          this.selectionsOfGroup.push(groupName);
        } else {
          this.selectionsOfGroup = this.selectionsOfGroup.filter(
            (i) => i !== groupName,
          );
        }
      });
    },
    activedRole: {
      handler() {
        this.initData();
      },
      deep: true,
    },
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      API_GET_PERMISSIONS().then((list) => {
        this.list.permissions = list;

        if (this.activedRole?.id) {
          API_GET_PERMISSIONS_OF_ROLE({ role_ids: [this.activedRole.id] }).then(
            (list) => {
              this.list.permissionsInRole = list;
              this.selections = list.map((i) => i.permission_id);
            },
          );
        }
      });
    },
    onGroupCheckedChange(v, name) {
      const allSubIdsInCurGroup = this.permissionsOfGroup[name].map(
        (i) => i.id,
      );

      if (v) {
        this.selectionsOfGroup.push(name);
        this.selections = Array.from(
          new Set(this.selections.concat(allSubIdsInCurGroup)),
        );
      } else {
        this.selectionsOfGroup = this.selectionsOfGroup.filter(
          (i) => i !== name,
        );
        this.selections = this.selections.filter(
          (i) => !allSubIdsInCurGroup.includes(i),
        );
      }
    },
    toUpsert() {
      const maps = this.list.permissionsInRole.reduce((a, b) => {
        // user_role 已经存在的关系
        return { ...a, [b.permission_id]: b.id };
      }, {});

      API_UPSERT_ROLE_PERMISSION({
        role_id: this.activedRole.id,
        permission_ids: this.selections.map((permission_id) => {
          return {
            id: maps[permission_id],
            permission_id: permission_id,
          };
        }),
      }).then(() => {
        this.message.success("保存成功");
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
