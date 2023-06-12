import { createApp } from "vue";
import app from "./app.vue";
import router from "./router";
import { createPinia } from "pinia";

const root = createApp(app);
root.use(router);
root.use(createPinia());
root.mount("#app");
