import { sendApi, T_file } from ".";
import { T_user } from "./user";


export type T_partChange = {
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

export type T_partChangeGetListData = {
  page: number;
  pagesize: number;
  sdate?:string;
  edate?:string;
  elevatorNo?:string | undefined;
};

export type T_partChangeGetListResult = {
  msg: string;
  isSuccess: boolean;
  totalPage: number;
  partChangeList: T_partChange[];
  total : number
};

async function getList(data?: T_partChangeGetListData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/changelist",
    data: {
      ...data,
    },
  });
  const partChangeList = response.data.data.list;
  const totalPage = response.data.data.pages;
  const total = response.data.data.total;
  delete response.data.data;
  const result: T_partChangeGetListResult = {
    ...response.data,
    partChangeList,
    totalPage,
    total,
  };
  return result;
}

const partChange = {
  getList,
};

export default partChange;
