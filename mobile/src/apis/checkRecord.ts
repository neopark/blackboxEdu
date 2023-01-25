import { sendApi } from ".";

export type T_checkRecord = {
  idx: number;
  elevatorNo: string;
  gubun: string;
  ctype: string;
  status: string;
  content: null;
  insDate: string;
  insUserId: string;
  elevinfo: {
    elevatorNo: string;
    address1: string;
    address2: string;
    buldNm: string;
    buldPrpos: string;
    elvtrStts: string;
    inspctInstt: string;
    manufacturerName: string;
    mntCpnyNm: string;
    partcpntNm: string;
    updUserId: null;
  };
  cstatus: string;
};

export type T_checkRecordGetData = {
  page?: number;
  pagesize?: number;
  insUserId: string;
};

export type T_checkRecordGetResult = {
  msg: string;
  isSuccess: boolean;
  checkRecordList: T_checkRecord[];
  totalPage: number;
};

async function get(data?: T_checkRecordGetData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/checkhistlistall",
    data: {
      ...data,
    },
  });
  const totalPage = response.data.data.pages;
  const checkRecordList: T_checkRecord[] = [];
  for (let idx = 0; idx < response.data.data.list.length; idx++) {
    checkRecordList.push({
      ...response.data.data.list[idx],
      insDate: response.data.data.list[idx].insDate.slice(0, 19).replace(" ", "T"),
    });
  }
  delete response.data.data;
  const result: T_checkRecordGetResult = {
    ...response.data,
    checkRecordList,
    totalPage,
  };
  return result;
}

const checkRecord = {
  get,
};

export default checkRecord;
