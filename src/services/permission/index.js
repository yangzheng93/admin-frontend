import request from "../base";

export function API_GET_PERMISSIONS() {
  return request({ url: "/permission/list", method: "GET" });
}
