import axios from "axios";
import values from "../values";
import examplePost from "./examplePost";

export function initExampleApis() {
  axios.defaults.baseURL = values.server.url;
  axios.defaults.withCredentials = true;
}

export type T_exampleSendApiConfig = {
  method: "get" | "put" | "post" | "delete";
  url: string;
  data?: any;
  isForm?: boolean;
};

export async function exampleSendApi(config: T_exampleSendApiConfig) {
  const response = await axios(config);
  return response;
}

const exampleApis = {
  post: examplePost,
};

export default exampleApis;
