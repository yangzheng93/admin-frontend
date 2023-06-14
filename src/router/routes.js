export default [
  { path: "/", redirect: "/home/workbench" },
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
];
