import { sendApi, T_file } from ".";
import { T_user } from "./user";


export type T_troubleshooting = {
  idx: number;
  insDate: string;
  elevatorNo: string;
  content: string;
  files: T_file[] | null;
  elevinfo?: {
    buldNm: string;
    address1: string;
  };
  userinfo: T_user;
  
};

export type T_troubleshootingGetListData = {
  pagesize?: number;
  page?: number;
  sdate?: string;
  edate?: string;
  elevatorNo?: string;

};

export type T_troubleshootingGetListResult = {
  msg: string;
  isSuccess: boolean;
  troubleshootingList: T_troubleshooting[];
  totalPage: number;
};

async function getList(data?: T_troubleshootingGetListData) {
  console.log(data);
  const response = await sendApi({
    method: "post",
    url: "/elev/troublelist",
    data: {
      ...data,
    },
  });
  const troubleshootingList = response.data.data.list;
  const totalPage = response.data.data.pages;
  delete response.data.data;
  const result: T_troubleshootingGetListResult = {
    ...response.data,
    troubleshootingList,
    totalPage,
  };
  return result;
}

const troubleshooting = {
  getList,
};

export default troubleshooting;
