import request from "../base";

export function API_GET_ROLE_OF_PERMISSIONS() {
  return request({ url: "/role-permission/list", method: "GET" });
}
