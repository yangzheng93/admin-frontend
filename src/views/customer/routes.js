export default [
  {
    // 客户资料
    path: "/customer/accounts",
    name: "CUSTOMER-ACCOUNT",
    component: () => import("@views/customer/account/index.vue"),
    meta: { layout: "basic" },
  },
  {
    // 供应商资料
    path: "/provider/accounts",
    name: "PROVIDER-ACCOUNT",
    component: () => import("@views/customer/provider/index.vue"),
    meta: { layout: "basic" },
  },
];
