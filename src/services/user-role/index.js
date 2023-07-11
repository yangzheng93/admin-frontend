import request from "../base";

// 获取角色下的用户
export function API_GET_USERS_BY_ROLE(data) {
  return request({ url: "/user-role/users", method: "POST", data });
}

// 批量更新用户的角色
export function API_UPSERT_USER_ROLE(data) {
  return request({ url: "/user-role/upsert", method: "POST", data });
}

// 批量移除用户的角色
export function API_REMOVE_USER_ROLE(data) {
  return request({ url: "/user-role/remove", method: "POST", data });
}
