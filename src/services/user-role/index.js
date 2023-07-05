import request from "../base";

export function API_GET_USERS_BY_ROLE(params) {
  return request({ url: "/user-role/users-by-role", method: "GET", params });
}
