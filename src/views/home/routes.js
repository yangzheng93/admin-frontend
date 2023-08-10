export default [
  {
    path: "/home/workbench",
    name: "HOME-WORKBENCH",
    component: () => import("@views/home/workbench/index.vue"),
    meta: { layout: "basic" },
  },
  {
    path: "/home/templates",
    name: "HOME-TEMPLATE",
    component: () => import("@views/home/template/index.vue"),
    meta: { layout: "basic" },
  },
];
