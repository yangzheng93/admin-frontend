/** @format */

import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";

const { get } = useCookies(["EMES_TOKEN"]);

export const useUserInfo = defineStore("UserInfo", {
  id: "UserInfo",
  state: () => ({ token: get("EMES_TOKEN"), info: undefined }),
  getters: {},
});
