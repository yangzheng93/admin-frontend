import request from "../base";

export function API_GET_DEPARTMENTS(data) {
  return request({ url: "/department/list", method: "POST", data });
}

export function API_SAVE_DEPARTMENT(data) {
  return request({ url: "/department/save", method: "POST", data });
}
