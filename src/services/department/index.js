import request from "../base";

export function API_GET_DEPARTMENTLIST(data) {
  return request({ url: "/department/list", method: "POST", data });
}
