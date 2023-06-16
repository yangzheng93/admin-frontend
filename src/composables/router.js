import { h } from "vue";
import { RouterLink } from "vue-router";

const useRouterRender = (props, text) => {
  return () => h(RouterLink, props, { default: () => text });
};

export default useRouterRender;
