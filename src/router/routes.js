export default [
  { path: "/", redirect: "/dashboard/workbench" },
  {
    path: "/login",
    name: "SYSTEM-LOGIN",
    component: () => import("@/views/system/login/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/home",
    name: "HOME-WORKBENCH",
    component: () => import("@/views/home/workbench/index.vue"),
    meta: { layout: "basic" },
  },
];
