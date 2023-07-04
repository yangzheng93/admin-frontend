import request from "../base";

export function API_GET_USERLIST(data) {
  return request({ url: "/user/list", method: "POST", data });
}

export function API_GET_USERSIMPLELIST(data) {
  return request({ url: "/user/simple-list", method: "POST", data });
}

export function API_SAVE_USER(data) {
  return request({ url: "/user/save", method: "POST", data });
}

export function API_GET_USERINFO(params) {
  return request({ url: "/user/find-one", method: "GET", params });
}

export function API_UPDATE_USERPASSWORD(data) {
  return request({ url: "/user/update-password", method: "POST", data });
}
