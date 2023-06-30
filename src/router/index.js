import { createRouter, createWebHistory } from "vue-router";
// import { useUserInfo } from "@stores/user";
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
  next();
  // const whites = ["PAGE-NOAUTH", "SYSTEM-LOGIN"];
  // if (whites.includes(to.name)) {
  //   next();
  //   return;
  // }

  // const { token } = useUserInfo();
  // // 如果存在 token 或者是白名单路由则直接跳转
  // if (token) {
  //   next();
  // } else {
  //   next({ name: "SYSTEM-LOGIN" });
  // }
});

export default router;
