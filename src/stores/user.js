/** @format */

import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";

const TOKEN_KEY = "MESADMIN_TOKEN";
const { get, remove, set } = useCookies([TOKEN_KEY]);

export const useUserInfo = defineStore("UserInfo", {
  id: "UserInfo",
  state: () => ({
    token: get(TOKEN_KEY),
    info: undefined,
  }),
  getters: {},
  actions: {
    removeToken() {
      this.token = "";
      remove(TOKEN_KEY);
    },
    setToken(v) {
      this.token = v;
      set(TOKEN_KEY, v);
    },
  },
});
