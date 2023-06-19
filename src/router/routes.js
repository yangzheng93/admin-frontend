export default [
  { path: "/", redirect: "/system/login" },
  {
    path: "/system/login",
    name: "SYSTEM-LOGIN",
    component: () => import("@/views/system/login/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/home/workbench",
    name: "HOME-WORKBENCH",
    component: () => import("@/views/home/workbench/index.vue"),
    meta: { layout: "basic" },
  },
  {
    // 用户中心
    path: "/account/center",
    name: "ACCOUNT-CENTER",
    component: () => import("@/views/account/center/index.vue"),
    meta: { layout: "basic" },
  },
  {
    // 部门管理
    path: "/management/department",
    name: "MANAGEMENT-DEPARTMENT",
    component: () => import("@/views/management/department/index.vue"),
    meta: { layout: "basic" },
  },
  {
    // 用户管理
    path: "/management/account",
    name: "MANAGEMENT-ACCOUNT",
    component: () => import("@/views/management/account/index.vue"),
    meta: { layout: "basic" },
  },
  {
    // 权限管理
    path: "/management/permission",
    name: "MANAGEMENT-PERMISSION",
    component: () => import("@/views/management/permission/index.vue"),
    meta: { layout: "basic" },
  },
];
