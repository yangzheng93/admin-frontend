export default [
  {
    // 用户中心
    path: "/account/center",
    name: "ACCOUNT-CENTER",
    component: () => import("@/views/account/center/index.vue"),
    meta: { layout: "basic" },
  },
];
