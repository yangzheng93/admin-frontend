import request from "../base";

export function API_GET_ROLES() {
  return request({ url: "/role/list", method: "GET" });
}

export function API_SAVE_ROLE(data) {
  return request({ url: "/role/save", method: "POST", data });
}
