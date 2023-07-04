/** @format */

import { defineStore } from "pinia";
import { getFromCookie, setToCookie, removeFromCookie } from "@utils/uCookies";
import {
  getObjFromStorage,
  setObjToStorage,
  removeFromStorage,
} from "@utils/uLocalStorage";

const TOKEN_KEY = "MESADMIN_TOKEN";
const USERINFO_KEY = "MESADMIN_USERINFO";

export const useUserStore = defineStore("UserStore", {
  id: "UserInfo",
  state: () => ({
    token: getFromCookie(TOKEN_KEY),
    user: getObjFromStorage(USERINFO_KEY),
  }),
  actions: {
    setToken(v) {
      this.token = v;
      setToCookie(TOKEN_KEY, v);
    },
    removeToken() {
      this.token = undefined;
      removeFromCookie(TOKEN_KEY);
    },
    setUser(v) {
      this.user = v;
      setObjToStorage(USERINFO_KEY, v);
    },
    removeUser() {
      this.user = undefined;
      removeFromStorage(USERINFO_KEY);
    },
  },
});
