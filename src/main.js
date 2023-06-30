import { createApp } from "vue";
import app from "./app.vue";
import router from "./router";
import { createPinia } from "pinia";

const root = createApp(app);
root.use(router);
root.use(createPinia());

// ref: https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

root.mount("#app");

if (window && !window.MESADMIN_VUE_INSTANCE) {
  window.MESADMIN_VUE_INSTANCE = root;
}
