import { sendApi } from ".";

export type T_notice = {
  insUserId: string;
  insDate: string;
  content: string;
  title: string;
};

export type T_noticeGetData = {
  userId: string;
  page?: number;
  pagesize?: number;
};

export type T_noticeGetResult = {
  msg: string;
  isSuccess: boolean;
  noticeList: T_notice[];
  totalPage: number;
};

async function get(data?: T_noticeGetData) {
  const response = await sendApi({
    method: "post",
    url: "/user/message/list",
    data: {
      ...data,
    },
  });
  const noticeList: T_notice[] = [];
  for (let idx = 0; idx < response.data.data.list.length; idx++) {
    noticeList.push({
      ...response.data.data.list[idx],
      insDate: response.data.data.list[idx].insDate.slice(0, 19).replace(" ", "T"),
    });
  }
  const totalPage = response.data.data.pages;
  delete response.data.data;
  const result: T_noticeGetResult = {
    ...response.data,
    noticeList,
    totalPage,
  };
  return result;
}

export type T_checkSetTokenData = {
  fcmToken: string;
  deviceId: string;
};

export type T_checkSetTokenResult = {
  msg: string;
  isSuccess: boolean;
};

async function setToken(data?: T_checkSetTokenData) {
  const response = await sendApi({
    method: "post",
    url: "/user/insertToken",
    data: {
      ...data,
    },
  });
  const result: T_checkSetTokenResult = {
    ...response.data,
  };
  return result;
}

const notice = {
  get,
  setToken,
};

export default notice;
