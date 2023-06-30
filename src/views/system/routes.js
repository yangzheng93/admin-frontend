export default [
  {
    path: "/system/login",
    name: "SYSTEM-LOGIN",
    component: () => import("@/views/system/login/index.vue"),
    meta: { layout: "blank" },
  },
];
