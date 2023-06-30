export default [
  {
    // 权限管理
    path: "/corp/permissions",
    name: "CORP-PERMISSION",
    component: () => import("@views/corp/permission/index.vue"),
    meta: { layout: "basic" },
  },
  {
    // 部门管理
    path: "/corp/departments",
    name: "CORP-DEPARTMENT",
    component: () => import("@views/corp/department/index.vue"),
    meta: { layout: "basic" },
  },
  {
    // 用户管理
    path: "/corp/accounts",
    name: "CORP-ACCOUNT",
    component: () => import("@views/corp/account/index.vue"),
    meta: { layout: "basic" },
  },
];
