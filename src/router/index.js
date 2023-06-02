import { createRouter, createWebHistory } from "vue-router";
import { useUserInfo } from "@stores/user";
import qs from "qs";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory("/mes/"),
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
  routes,
});

/**
 * 1. 判断是否存在token => 存在则直接跳转
 * 2.
 */
router.beforeEach((to, from, next) => {
  const whites = ["PAGE-NOAUTH", "SYSTEM-LOGIN"];
  if (whites.includes(to.name)) {
    next();
    return;
  }

  const { token } = useUserInfo();
  // 如果存在 token 或者是白名单路由则直接跳转
  if (token) {
    next();
  } else {
    next({ name: "SYSTEM-LOGIN" });
  }
});

export default router;
