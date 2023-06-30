/** @format */

import axios from "axios";
import { useUserInfo } from "@stores/user";
import { createDiscreteApi } from "naive-ui";

const { message: NMessage, dialog: NDialog } = createDiscreteApi([
  "message",
  "dialog",
]);

const userInfo = useUserInfo();

const showDialog = (content) => {
  NDialog.error({
    title: "请求异常",
    content,
    showIcon: false,
    closable: false,
    positiveText: "知道了",
  });
};

const service = axios.create({
  baseURL: "http://localhost:3000/mes-v1",
  timeout: 60000,
  withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    if (userInfo.token) {
      config.headers["Authorization"] = `Bearer ${userInfo.token}`;
    }

    return config;
  },
  (error) => {
    showDialog(error.message);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const { data, message } = response.data;
    return Promise.resolve(data, message);
  },
  (error) => {
    const { statusCode, message } = error.response.data;
    switch (statusCode) {
      case 401:
        NMessage.error("登录信息已失效，请重新登录");
        userInfo.removeToken();
        window.MESADMIN_VUE_INSTANCE.$router.push({ name: "SYSTEM-LOGIN" });
        break;
      default:
        NMessage.error(message?.[0] || "请求失败");
        break;
    }

    return Promise.reject(error);
  },
);

export default service;
