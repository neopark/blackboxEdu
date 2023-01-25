import { sendApi } from ".";
import { T_user } from "../contexts/user";

export type T_troubleshooting = {
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

export type T_troubleshootingGetListData = {
  pagesize?: number;
  page?: number;
  insUserId?: string;
};

export type T_troubleshootingGetListResult = {
  msg: string;
  isSuccess: boolean;
  troubleshootingList: T_troubleshooting[];
  totalPage: number;
};

async function getList(data?: T_troubleshootingGetListData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/troublelist",
    data: {
      ...data,
    },
  });
  const troubleshootingList: T_troubleshooting[] = [];
  for (let idx = 0; idx < response.data.data.list.length; idx++) {
    troubleshootingList.push({
      ...response.data.data.list[idx],
      insDate: response.data.data.list[idx].insDate.slice(0, 19).replace(" ", "T"),
    });
  }
  const totalPage = response.data.data.pages;
  delete response.data.data;
  const result: T_troubleshootingGetListResult = {
    ...response.data,
    troubleshootingList,
    totalPage,
  };
  return result;
}

export type T_troubleshootingSaveData = {
  elevatorNo: string;
  content: string;
  files: any[];
  userId: string;
};

export type T_troubleshootingSaveResult = {
  msg: string;
  isSuccess: boolean;
};

async function save(data: T_troubleshootingSaveData) {
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
    url: "/elev/savetrouble",
    data: newData,
    isForm: true,
  });
  const result: T_troubleshootingSaveResult = {
    ...response.data,
  };
  return result;
}

const troubleshooting = {
  save,
  getList,
};

export default troubleshooting;
