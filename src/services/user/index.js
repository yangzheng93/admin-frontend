import request from "../base";

export function API_GET_USERLIST(data) {
  return request({ url: "/user/list", method: "POST", data });
}
