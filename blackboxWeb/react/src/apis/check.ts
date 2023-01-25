import { sendApi } from ".";
import { T_user } from "./user";

export type T_checkStatusValue = "0" | "1";

export type T_checkResult = "S" | "F";

// 박광희 변경 추가 (0901)

export type T_checkinfo = {
  idx: number;
  status: T_checkStatusValue;
  userinfo: T_user;
  elevatorNo: string;
  elevinfo?: {
    buldNm: string;
    address1: string;
  };
  cstatus: T_checkResult;
  insDate: string;
  details: T_checkDetail[];
};
export type T_checkmasterResult = {
  msg: string;
  isSuccess: boolean;
  masterInfo: T_checkinfo;
};

// 마스터 정보포함한 디테일 리스트
async function getDetailList2(data: T_checkGetDetailListData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/checkhistmaster",
    data: {
      ...data,
    },
  });
  const masterInfo = response.data.data;
  delete response.data.data;
  const result: T_checkmasterResult = {
    ...response.data,
    masterInfo,
  };
  return result;
}

export type T_checkgetStatusList2Data = {
  elevatroNo: string;
  wdate?: string;
};
// 접점데이터 엘리베이터별 날짜별
async function getStatusList2(data: T_checkgetStatusList2Data) {
  const response = await sendApi({
    method: "post",
    url: "/check/checkpointlist2",
    data: {
      ...data,
    },
  });
  const checkStatusList = response.data.data;
  delete response.data.data;
  const result: T_checkgetStatusListResult = {
    ...response.data,
    checkStatusList,
  };

  return result;
}

// 여기까지

export type T_check = {
  idx: number;
  status: T_checkStatusValue;
  userinfo: T_user;
  elevatorNo: string;
  elevinfo?: {
    buldNm: string;
    address1: string;
  };
  cstatus: T_checkResult;
  insDate: string;
  updDate:string;
};

export type T_checkGetListData = {
  page: number;
  pagesize: number;
  sdate?:string|null;
  edate?:string|null;
  status?:string;
};

export type T_checkGetListResult = {
  msg: string;
  isSuccess: boolean;
  checkList: T_check[];
  totalPage: number;
  total: number;
};

async function getList(data?: T_checkGetListData) {

  console.log(data);
  const response = await sendApi({
    method: "post",
    url: "/elev/checkhistlistall",
    data: {
      ...data,
    },
  });
  console.log(response.data.data.total);
  const checkList = response.data.data.list;
  const totalPage = response.data.data.pages;
  const total = response.data.data.total
  delete response.data.data;
  const result: T_checkGetListResult = {
    ...response.data,
    totalPage,
    checkList,
    total,
  };
  return result;
}

export type T_checkDetailData = {
  idx: string;
  masterCode: string;
  codeContent: string;
  codeName: string;
  type: string;
};

export type T_checkDetail = {
  idx: number;
  result: string;
  checkList: T_checkDetailData;
  codeContent: string;
  userinfo: {
    userNm: string;
    userId: string;
  };
  elevatorNo: string;
  elevinfo?: {
    buldNm: string;
  };
  insDate: string;
};

export type T_checkGetDetailListData = {
  masterIdx: number;
};

export type T_checkGetDetailListResult = {
  msg: string;
  isSuccess: boolean;
  checkDetailList: T_checkDetail[];
};

async function getDetailList(data: T_checkGetDetailListData) {
  const response = await sendApi({
    method: "post",
    url: "/check/checkhistdetail",
    data: {
      ...data,
    },
  });
  const checkDetailList = response.data.data;
  delete response.data.data;
  const result: T_checkGetDetailListResult = {
    ...response.data,
    checkDetailList,
  };
  return result;
}

export type T_checkStatus = {
  wdate: string;
  wtime: string;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  p6: number;
  p7: number;
  p8: number;
  p9: number;
  p10: number;
  p11: number;
  p12: number;
  p13: number;
  p14: number;
  p15: number;
  p16: number;
  p17: number;
  p18: number;
  p19: number;
  p20: number;
  p21: number;
  p22: number;
  p23: number;
  p24: number;
};

export type T_checkgetStatusListData = {
  masterIdx: number;
};

export type T_checkgetStatusListResult = {
  msg: string;
  isSuccess: boolean;
  checkStatusList: T_checkStatus[];
};

async function getStatusList(data: T_checkgetStatusListData) {
  const response = await sendApi({
    method: "post",
    url: "/check/checkpointlist",
    data: {
      ...data,
    },
  });
  const checkStatusList = response.data.data;
  delete response.data.data;
  const result: T_checkgetStatusListResult = {
    ...response.data,
    checkStatusList,
  };
  return result;
}

export type T_checkingGetCountData = {};

export type T_checkingGetCountResult = {
  msg: string;
  isSuccess: boolean;
  checkingCount: number;
};

async function getCheckingCount(data?: T_checkingGetCountData) {
  const response = await sendApi({
    method: "post",
    url: "/check/count",
    data: {
      ...data,
    },
  });
  const checkingCount = response.data.data;
  delete response.data.data;
  const result: T_checkingGetCountResult = {
    ...response.data,
    checkingCount,
  };
  return result;
}

export type T_checkGetFailCountData = {};

export type T_checkGetFailCountResult = {
  msg: string;
  isSuccess: boolean;
  checkFailCount: number;
};

async function getFailCount(data?: T_checkGetFailCountData) {
  const response = await sendApi({
    method: "post",
    url: "/check/countf",
    data: {
      ...data,
    },
  });
  const checkFailCount = response.data.data;
  delete response.data.data;
  const result: T_checkGetFailCountResult = {
    ...response.data,
    checkFailCount,
  };
  return result;
}

export type T_checkGetCompleteCountData = {};

export type T_checkGetCompleteCountResult = {
  msg: string;
  isSuccess: boolean;
  checkCompleteCount: number;
};

async function getCompleteCount(data?: T_checkGetCompleteCountData) {
  const response = await sendApi({
    method: "post",
    url: "/check/counts",
    data: {
      ...data,
    },
  });
  const checkCompleteCount = response.data.data;
  delete response.data.data;
  const result: T_checkGetCompleteCountResult = {
    ...response.data,
    checkCompleteCount,
  };
  return result;
}

const check = {
  getList,
  getFailCount,
  getCheckingCount,
  getCompleteCount,
  getDetailList,
  getStatusList,
  getDetailList2,
  getStatusList2,
};

export default check;
