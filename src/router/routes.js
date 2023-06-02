export default [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "SYSTEM-LOGIN",
    component: () => import("@/views/system/login/index.vue"),
    meta: { layout: "blank" },
  },
];
