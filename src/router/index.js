import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@stores/user";
import qs from "qs";
import SystemModuleRoutes from "@views/system/routes";
import HomeModuleRoutes from "@views/home/routes";
import AccountModuleRoutes from "@views/account/routes";
import CorpModuleRoutes from "@views/corp/routes";
import CustomerModuleRoutes from "@views/customer/routes";

const { parse, stringify } = qs;

const router = createRouter({
  history: createWebHistory("/"),
  parseQuery: parse,
  stringifyQuery: stringify,
  routes: [
    { path: "/", redirect: "/system/login" },
    ...SystemModuleRoutes,
    ...HomeModuleRoutes,
    ...AccountModuleRoutes,
    ...CorpModuleRoutes,
    ...CustomerModuleRoutes,
  ],
});

/**
 * 1. 判断是否存在token => 存在则直接跳转
 * 2.
 */
router.beforeEach((to, from, next) => {
  const { token } = useUserStore();
  if (!token && to.name !== "SYSTEM-LOGIN") {
    next({ name: "SYSTEM-LOGIN" });
    return;
  }

  if (token && to.name === "SYSTEM-LOGIN") {
    next({ name: "HOME-WORKBENCH" });
    return;
  }

  const whites = ["SYSTEM-LOGIN"];
  if (whites.includes(to.name)) {
    next();
    return;
  }

  next();
});

export default router;
