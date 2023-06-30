/** @format */

import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";
import {
  getObjFromStorage,
  setObjToStorage,
  removeFromStorage,
} from "@utils/uLocalStorage";

const TOKEN_KEY = "MESADMIN_TOKEN";
const USERINFO_KEY = "MESADMIN_USERINFO";
const { get, remove, set } = useCookies([TOKEN_KEY]);

export const useUserStore = defineStore("UserStore", {
  id: "UserInfo",
  state: () => ({
    token: get(TOKEN_KEY),
    user: getObjFromStorage(USERINFO_KEY),
  }),
  actions: {
    setToken(v) {
      set(TOKEN_KEY, v);
    },
    removeToken() {
      remove(TOKEN_KEY);
    },
    setUser(v) {
      setObjToStorage(USERINFO_KEY, v);
    },
    removeUser(v) {
      removeFromStorage(USERINFO_KEY);
    },
  },
});
