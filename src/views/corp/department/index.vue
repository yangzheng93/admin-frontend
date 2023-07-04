<template>
  <div class="corp-department">
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
        }"
      >
        <n-form-item label="部门名称" path="name">
          <n-input v-model:value="formData.name" placeholder="请填写部门名称" />
        </n-form-item>
        <n-form-item label="负责人" path="user_id">
          <n-select
            v-model:value="formData.user_id"
            :options="options.users"
            filterable
            label-field="name"
            value-field="id"
            placeholder="请选择部门负责人"
          />
        </n-form-item>
      </n-form>
    </n-modal>
  </div>
</template>

<script>
import { h, reactive, ref } from "vue";
import { NButton, NSpace, NTime, useMessage } from "naive-ui";
import useIconRender from "@composables/icon";
import { EditOutlined } from "@vicons/antd";
import {
  API_GET_DEPARTMENTLIST,
  API_SAVE_DEPARTMENT,
} from "@services/department";
import { API_GET_USERSIMPLELIST } from "@services/user";

export default {
  name: "CorpDepartment",
  setup() {
    const message = useMessage();

    const visible = ref(false);

    const tableLoading = ref(false);

    const tableColumns = ref([
      { title: "部门名称", key: "name", minWidth: 200, align: "center" },
      {
        title: "负责人",
        key: "user_name",
        minWidth: 200,
        align: "center",
        render: (record) => {
          return record.user_name && record.user_phone
            ? `${record.user_name}（${record.user_phone}）`
            : "";
        },
      },
      {
        title: "创建时间",
        key: "created_at",
        minWidth: 200,
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
        minWidth: 160,
        fixed: "right",
        render: (record) => {
          return h(NSpace, { size: 10, justify: "center" }, () => [
            h(
              NButton,
              {
                key: "EDIT",
                text: true,
                onClick: () => {
                  formData.id = record.id;
                  formData.name = record.name;
                  formData.user_id = record.user_id;
                  visible.value = true;
                },
              },
              {
                icon: useIconRender(EditOutlined),
                default: () => "编辑",
              },
            ),
          ]);
        },
      },
    ]);

    const tableData = ref([]);

    const options = reactive({ users: [] });

    const formRef = ref(null);

    // 初始化 formData
    const initialFormData = {
      id: undefined,
      name: "",
      user_id: undefined,
    };

    const formData = reactive({ ...initialFormData });

    const resetFormData = () => {
      Object.assign(formData, { ...initialFormData });
    };

    return {
      message,
      visible,
      tableLoading,
      tableColumns,
      tableData,
      options,
      formRef,
      formData,
      resetFormData,
    };
  },
  created() {
    this.initOptions();
    this.fetchTableList();
  },
  methods: {
    initOptions() {
      Promise.all([API_GET_USERSIMPLELIST()]).then(([list]) => {
        this.options.users = list;
      });
    },
    fetchTableList() {
      this.tableLoading = true;
      API_GET_DEPARTMENTLIST()
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
      this.resetFormData();
    },
    toSave() {
      this.$refs["formRef"]?.validate((errors) => {
        if (!errors) {
          API_SAVE_DEPARTMENT(this.formData).then((data) => {
            if (data.id) {
              this.toClose();
              this.message.success("保存成功", {
                duration: 1000,
                onAfterLeave: () => {
                  this.fetchTableList();
                },
              });
            }
          });
        }
      });
    },
  },
};
</script>
