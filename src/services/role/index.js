import request from "../base";

export function API_GET_ROLELIST() {
  return request({ url: "/role/list", method: "GET" });
}
