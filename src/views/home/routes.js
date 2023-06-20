export default [
  {
    path: "/home/workbench",
    name: "HOME-WORKBENCH",
    component: () => import("@/views/home/workbench/index.vue"),
    meta: { layout: "basic" },
  },
];
