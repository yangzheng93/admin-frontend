import request from "../base";

export function API_LOGIN(data) {
  return request({ url: "/auth/login", method: "POST", data });
}
