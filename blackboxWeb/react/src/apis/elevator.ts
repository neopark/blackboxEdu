import { string } from "prop-types";
import { sendApi } from ".";
import { T_check } from './check';

export type T_elevator = {
  address1: string;
  address2: string;
  elevatorNo: string;
  mntCpnyNm: string;
  buldNm:string;
  elvtrKindNm:string;
  lastInspctDe:string; //마지막 정기점검일시
  ratedCap:string; // 용량
  applcBeDt:string;
  applcEnDt:string;
  areaNo:string;
  buldMgtNo1:string;
  buldMgtNo2:string;
  buldPrpos:string;
  divGroundFloorCnt:string;
  divUndgrndFloorCnt:string;
  elvtrAsignNo:string;
  elvtrDivNm:string;
  elvtrFormNm:string;
  elvtrModel:string;
  elvtrStts:string;
  inspctInstt:string;
  installationDe:string;
  installationPlace:string;
  lastInspctKind:string;
  lastResultNm:string;
  liveLoad:string;
  manufacturerName:string;
  manufacturerTelno:string;
  mnfcturCpnyCd:string;
  mntCpnyTelno:string;
  partcpntNm:string;
  partcpntTelno:string;
  ratedSpeed:string;
  shuttleFloorCnt:string;
  shuttleMngrNm:string;
  shuttleMngrTelno:string;
  shuttleSection:string;
  sigunguCd:string;
  standardKey:string;
  zipCd1:string;
  zipCd2:string;
  frstInstallationDe:string;
};


export type T_elevatorGetListData = {
  page:number,
  pagesize:number,
};

export type T_elevatorGetListResult = {
  msg: string;
  isSuccess: boolean;
  elevatorList: T_elevator[];
  totalPage:number;
  total:number;
};

async function getList(data?: T_elevatorGetListData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/list",
    data: {
      ...data,
    },
  });

  console.log(response.data.data);
  const elevatorList = response.data.data.list;
  const totalPage = response.data.data.pages;
  const total = response.data.data.total;
  delete response.data.data;
  const result: T_elevatorGetListResult = {
    ...response.data,
    elevatorList,
    totalPage,
    total,
  };
  return result;
}

export type T_elevatorGetData = {
  elevatorNo: string;
};

export type T_elevatorGetResult = {
  msg: string;
  isSuccess: boolean;
  elevator: T_elevator | null;
};

async function get(data: T_elevatorGetData) {
  const response = await sendApi({
    method: "post",
    url: "/elev/get",
    data: {
      ...data,
    },
  });
  let elevator: T_elevator | null = null;
  elevator = response.data.data;
  delete response.data.data;
  const result: T_elevatorGetResult = {
    ...response.data,
    elevator,
  };
  return result;
}

export type T_checkGetCheckingListData = {};

export type T_checkGetCheckingListResult = {
  msg: string;
  isSuccess: boolean;
  checkingElevatorList: T_check[];
};

async function getCheckingList(data?: T_checkGetCheckingListData) {
  const response = await sendApi({
    method: "post",
    url: "/check/checkelevlist",
    data: {
      ...data,
    },
  });
  const checkingElevatorList = response.data.data;
  delete response.data.data;
  const result: T_checkGetCheckingListResult = {
    ...response.data,
    checkingElevatorList,
  };
  return result;
}
const elevator = {
  getList,
  get,
  getCheckingList,
};

export default elevator;
