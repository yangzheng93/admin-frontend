/**
 * https://github.com/js-cookie/js-cookie#basic-usage
 * @format
 */

import Cookies from "js-cookie";

export function getFromCookie(key, options) {
  return Cookies.get(key, options);
}

export function setToCookie(key, value, options) {
  return Cookies.set(key, value, options);
}

export function removeFromCookie(key, options) {
  Cookies.remove(key, options);
}
