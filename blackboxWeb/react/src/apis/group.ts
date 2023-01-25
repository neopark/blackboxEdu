import { sendApi } from ".";

export type T_group = {
  groupIdx: string;
  groupNm: string;
};

const tempGroupList = [
  {
    groupIdx: "0",
    groupNm: "SH공사 대치1단지",
  },
  {
    groupIdx: "1",
    groupNm: "SH공사공릉2-6단지",
  },
  {
    groupIdx: "2",
    groupNm: "SH공사공릉2-6단지",
  },
];

export type T_groupGetListData = {};

export type T_groupGetListResult = {
  msg: string;
  isSuccess: boolean;
  groupList: T_group[];
};

async function getList(data?: T_groupGetListData) {
  // const response = await sendApi({
  //   method: "post",
  //   url: "/group/list",
  //   data: {
  //     ...data,
  //   },
  // });
  const response: any = {
    data: {
      data: tempGroupList,
      msg: "",
      isSuccess: true,
    },
  };
  const groupList = response.data.data;
  delete response.data.data;
  const result: T_groupGetListResult = {
    ...response.data,
    groupList,
  };
  return result;
}

export type T_groupGetData = {
  idx: string;
};

export type T_groupGetResult = {
  msg: string;
  isSuccess: boolean;
  group: T_group | null;
};

async function get(data: T_groupGetData) {
  // const response = await sendApi({
  //   method: "post",
  //   url: "/group/list",
  //   data: {
  //     ...data,
  //   },
  // });
  const response: any = {
    data: {
      data: tempGroupList,
      msg: "",
      isSuccess: true,
    },
  };
  let group: T_group | null = null;
  for (let idx = 0; idx < response.data.data.length; idx++) {
    const selGroup = response.data.data[idx];
    if (selGroup.groupIdx === data.idx) {
      group = selGroup;
      break;
    }
  }
  delete response.data.data;
  const result: T_groupGetResult = {
    ...response.data,
    group,
  };
  return result;
}

const group = {
  getList,
  get,
};

export default group;
