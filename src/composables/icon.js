import { h } from "vue";
import { NIcon } from "naive-ui";

const useIconRender = (icon, props = null) => {
  return () => h(NIcon, props, { default: () => h(icon) });
};

export default useIconRender;
