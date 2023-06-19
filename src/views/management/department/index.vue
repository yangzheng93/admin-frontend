<template>
  <div class="management-department">
    <n-card>
      <n-space class="mb-[20px]">
        <n-button type="primary" @click="visible = true">新 建</n-button>
      </n-space>
      <n-data-table :columns="columns" :data="[]" />
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
        <n-form-item label="部门编号" path="code">
          <n-input
            v-model:value="formData.code"
            placeholder="请输入唯一的部门编号，或点击右侧为您自动生成"
          />
        </n-form-item>
        <n-form-item label="负责人" path="leader">
          <n-select
            v-model:value="formData.leader"
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
import { reactive, ref } from "vue";

export default {
  name: "ManagementDepartment",
  setup() {
    const visible = ref(false);

    const columns = ref([
      { title: "部门编号", key: "code" },
      { title: "部门名称", key: "name" },
      { title: "负责人", key: "leader" },
      { title: "创建时间", key: "created_at" },
    ]);

    const formRef = ref(null);

    const formData = reactive({ code: "", name: "", leader: undefined });

    return { visible, columns, formRef, formData };
  },
  methods: {
    toClose() {
      this.visible = false;
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
