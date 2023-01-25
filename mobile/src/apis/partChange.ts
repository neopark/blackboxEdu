import { sendApi } from ".";
import { T_user } from "../contexts/user";

export type T_partChangeSaveData = {
  elevatorNo: string;
  content: string;
  files: any[];
  userId: string;
};

export type T_partChangeSaveResult = {
  msg: string;
  isSuccess: boolean;
};

async function save(data: T_partChangeSaveData) {
  const newData = new FormData();
  newData.append("elevatorNo", data.elevatorNo);
  newData.append("content", data.content);
  newData.append("insUserId", data.userId);
  for (let idx = 0; idx < data.files.length; idx++) {
    const file = data.files[idx];
    newData.append("files", file);
  }
  const response = await sendApi({
    method: "post",
    url: "/elev/savechange",
    data: newData,
    isForm: true,
  });
  const result: T_partChangeSaveResult = {
    ...response.data,
  };
  return result;
}

export type T_partChange = {
  idx: number;
  insDate: string;
  elevatorNo: string;
  content: string;
  // files: T_file[] | null;
  elevinfo?: {
    buldNm: string;
    address1: string;
    address2: string;
  };
  userinfo: T_user;
};

export type T_partChangeGetListData = {
  page: number;
  pagesize: number;
};

export type T_partChangeGetListResult = {
  msg: string;
  isSuccess: boolean;
  totalPage: number;
  partChangeList: T_partChange[];
};

async function getList(data?: T_partChangeGetListData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/changelist",
    data: {
      ...data,
    },
  });
  const partChangeList: T_partChange[] = [];
  for (let idx = 0; idx < response.data.data.list.length; idx++) {
    partChangeList.push({
      ...response.data.data.list[idx],
      insDate: response.data.data.list[idx].insDate.slice(0, 19).replace(" ", "T"),
    });
  }
  const totalPage = response.data.data.pages;
  delete response.data.data;
  const result: T_partChangeGetListResult = {
    ...response.data,
    partChangeList,
    totalPage,
  };
  return result;
}

const partChange = {
  save,
  getList,
};

export default partChange;
