import request from "../base";

export function API_GET_PERMISSIONS_OF_ROLE(data) {
  return request({ url: "/role-permission/list", method: "POST", data });
}

export function API_UPSERT_ROLE_PERMISSION(data) {
  return request({ url: "/role-permission/upsert", method: "POST", data });
}
