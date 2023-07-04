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
            message: '员工姓名不能为空',
            trigger: 'blur',
          },
          gender: {
            required: true,
            message: '性别不能为空',
            trigger: 'change',
          },
          phone: {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur',
          },
          department_id: {
            required: true,
            type: 'number',
            message: '所在部门不能为空',
            trigger: 'change',
          },
        }"
      >
        <n-form-item label="姓名" path="name">
          <n-input v-model:value="formData.name" placeholder="请填写员工姓名" />
        </n-form-item>
        <n-form-item label="性别" path="gender">
          <n-select
            v-model:value="formData.gender"
            :options="[
              { label: '男', value: '男' },
              { label: '女', value: '女' },
            ]"
            placeholder="请选择员工性别"
          />
        </n-form-item>
        <n-form-item label="手机号" path="phone">
          <n-input
            v-model:value="formData.phone"
            placeholder="请填写员工手机号"
          />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input
            v-model:value="formData.email"
            placeholder="请填写员工内部邮箱（没有则不填）"
          />
        </n-form-item>
        <n-form-item label="所属部门" path="department_id">
          <n-select
            v-model:value="formData.department_id"
            :options="options.departments"
            placeholder="请选择员工所在部门"
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
import { API_GET_USERLIST, API_SAVE_USER } from "@services/user";
import { API_GET_DEPARTMENTLIST } from "@services/department";

export default {
  name: "CorpAccount",
  setup() {
    const message = useMessage();

    const visible = ref(false);

    const tableLoading = ref(false);

    const tableColumns = ref([
      {
        title: "姓名",
        key: "name",
        minWidth: 160,
        align: "center",
        fixed: "left",
      },
      { title: "性别", key: "gender", minWidth: 160, align: "center" },
      { title: "手机号", key: "phone", minWidth: 160, align: "center" },
      {
        title: "所属部门",
        key: "department_name",
        minWidth: 160,
        align: "center",
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
                  formData.gender = record.gender;
                  formData.phone = record.phone;
                  formData.email = record.email;
                  formData.department_id = record.department_id;
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

    const options = reactive({ departments: [] });

    const formRef = ref(null);

    // 初始化 formData
    const initialFormData = {
      id: undefined,
      name: "",
      gender: undefined,
      phone: "",
      email: undefined,
      department_id: undefined,
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
      Promise.all([API_GET_DEPARTMENTLIST()]).then(([list]) => {
        this.options.departments = list.map((i) => ({
          label: i.name,
          value: i.id,
        }));
      });
    },
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
      this.resetFormData();
    },
    toSave() {
      this.$refs["formRef"]?.validate((errors) => {
        if (!errors) {
          API_SAVE_USER(this.formData).then((data) => {
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
