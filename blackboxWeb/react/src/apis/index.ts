import axios from "axios";
import values from "../values";
import msg from "./msg";
import user from "./user";
import group from "./group";
import elevator from "./elevator";
import check from "./check";
import partChange from "./partChange";
import troubleshooting from "./troubleshooting";

export type T_file = {
  fileUrl: string;
};

export type T_image = {
  fileUrl: string;
};

export function initApis() {
  axios.defaults.baseURL = values.server.url;
  axios.defaults.withCredentials = true;
}

export type T_sendApiConfig = {
  method: "get" | "put" | "post" | "delete";
  url: string;
  data?: any;
  isForm?: boolean;
};

export type T_sendApiResponseData = {
  isSuccess: boolean;
  msg: string;
  data?: any;
};

export async function sendApi(config: T_sendApiConfig) {
  const response = await axios(config);
  const data = response.data;
  data.isSuccess = data?.code === "1";
  data.msg = data?.message || "";
  delete data.code;
  delete data.message;
  const newData: T_sendApiResponseData = data;
  const newResponse = {
    ...response,
    data: newData,
  };
  return newResponse;
}

const apis = {
  msg,
  user,
  group,
  elevator,
  check,
  partChange,
  troubleshooting,
};

export default apis;
