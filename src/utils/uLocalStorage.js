/** @format */

const myStorage = window.localStorage;

// 获取普通数据类型
export const getFromStorage = (key) => {
  return myStorage.getItem(key);
};

export const setToStorage = (key, value) => {
  myStorage.setItem(key, value);
};

// 获取对象数据类型
export const getObjFromStorage = (key) => {
  try {
    return JSON.parse(myStorage.getItem(key));
  } catch (e) {
    return "";
  }
};

// 异常: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#%E5%BC%82%E5%B8%B8
export const setObjToStorage = (key, value) => {
  myStorage.setItem(key, JSON.stringify(value));
};

export const removeFromStorage = (key) => {
  myStorage.removeItem(key);
};

export const clearStorage = () => {
  myStorage.clear();
};
