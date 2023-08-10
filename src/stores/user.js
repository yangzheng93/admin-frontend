/** @format */

import { defineStore } from "pinia";
import { API_GET_CURUSERINFO } from "@services/user";
import { getFromCookie, setToCookie, removeFromCookie } from "@utils/uCookies";
// import {
//   getObjFromStorage,
//   setObjToStorage,
//   removeFromStorage,
// } from "@utils/uLocalStorage";

const TOKEN_KEY = "MESADMIN_TOKEN";
// const USERINFO_KEY = "MESADMIN_USERINFO";

export const useUserStore = defineStore("UserStore", {
  id: "UserInfo",
  state: () => ({
    token: getFromCookie(TOKEN_KEY),
    user: undefined,
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
    },
    removeUser() {
      this.user = undefined;
    },
    async fetchCurUser() {
      this.user = await API_GET_CURUSERINFO();
    },
  },
});
