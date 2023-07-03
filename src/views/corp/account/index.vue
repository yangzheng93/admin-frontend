<template>
  <div class="corp-account">
    <n-card>
      <n-space justify="end" class="mb-[20px]">
        <n-button type="primary" @click="visible = true">新 建</n-button>
      </n-space>
      <n-data-table
        :loading="tableLoading"
        :columns="tableColumns"
        :data="tableData"
        :single-line="false"
        size="small"
      />
    </n-card>

    <n-modal
      :show="visible"
      preset="dialog"
      positive-text="保 存"
      negative-text="取 消"
      :show-icon="false"
      :closable="false"
      :mask-closable="false"
      :close-on-esc="false"
      :on-positive-click="toSave"
      :on-negative-click="toClose"
    >
      <n-form
        ref="formRef"
        :label-width="80"
        :model="formData"
        :rules="{
          name: {
            required: true,
            message: '部门名称不能为空',
            trigger: 'blur',
          },
          code: {
            required: true,
            message: '部门编号不能为空',
            trigger: 'blur',
          },
        }"
      >
        <n-form-item label="部门名称" path="name">
          <n-input v-model:value="formData.name" placeholder="请输入部门名称" />
        </n-form-item>
        <n-form-item label="负责人" path="user_id">
          <n-select
            v-model:value="formData.user_id"
            :options="[]"
            filterable
            placeholder="请选择部门负责人"
          />
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<script>
import { h, reactive, ref } from "vue";
import { NTime } from "naive-ui";
import { API_GET_USERLIST } from "@services/user";

export default {
  name: "CorpAccount",
  setup() {
    const visible = ref(false);

    const tableLoading = ref(false);

    const tableColumns = ref([
      { title: "姓名", key: "name", minWidth: 160, align: "center" },
      { title: "性别", key: "gender", minWidth: 100, align: "center" },
      { title: "手机号", key: "phone", minWidth: 160, align: "center" },
      {
        title: "所属部门",
        key: "department_name",
        minWidth: 160,
        align: "center",
      },
      {
        title: "角色",
        key: "role_names",
        minWidth: 300,
        align: "center",
        render: (record) => {
          return record.role_names?.join("、");
        },
      },
      {
        title: "创建时间",
        key: "created_at",
        minWidth: 160,
        align: "center",
        render: (record) => {
          return h(NTime, {
            time: new Date(record.created_at),
            format: "yyyy-MM-dd HH:mm:ss",
          });
        },
      },
      {
        title: "操作",
        key: "operation",
        align: "center",
        minWidth: 100,
        fixed: "right",
      },
    ]);

    const tableData = ref([]);

    const formRef = ref(null);

    const formData = reactive({ name: "", user_id: undefined });

    return {
      visible,
      tableLoading,
      tableColumns,
      tableData,
      formRef,
      formData,
    };
  },
  created() {
    this.fetchTableList();
  },
  methods: {
    fetchTableList() {
      this.tableLoading = true;
      API_GET_USERLIST()
        .then((list) => {
          this.tableData = list;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    toClose() {
      this.visible = false;
      this.formData = { name: "", user_id: undefined };
    },
    toSave() {
      this.$refs["formRef"]?.validate((errors) => {
        if (!errors) {
          console.log(this.formData);
        } else {
          console.log(errors);
        }
      });
    },
  },
};
</script>
