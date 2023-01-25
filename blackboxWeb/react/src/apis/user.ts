import { sendApi } from ".";

export type T_userRole = "USER";

export type T_user = {
  hp: string | null;
  role: T_userRole;
  userNm: string;
  userId: string;
  userPw: string | null;
  bizName: string;
  bizRegNo: string;
  license: string
};

export type T_userGetListData = {};

export type T_userGetListResult = {
  msg: string;
  isSuccess: boolean;
  userList: T_user[];
};

async function getList(data?: T_userGetListData) {
  const response = await sendApi({
    method: "post",
    url: "/user/list",
    data: {
      ...data,
    },
  });
  const userList = response.data.data;
  delete response.data.data;
  const result: T_userGetListResult = {
    ...response.data,
    userList,
  };
  return result;
}

export type T_userGetData = {
  id: string;
};

export type T_userGetResult = {
  msg: string;
  isSuccess: boolean;
  user: T_user | null;
};

async function get(data: T_userGetData) {
  const response = await sendApi({
    method: "post",
    url: "/user/list",
    data: {
      // ...data,
    },
  });
  let user: T_user | null = null;
  for (let idx = 0; idx < response.data.data.length; idx++) {
    const selUser = response.data.data[idx];
    if (selUser.userId === data.id) {
      user = selUser;
      break;
    }
  }
  delete response.data.data;
  const result: T_userGetResult = {
    ...response.data,
    user,
  };
  return result;
}

const user = {
  getList,
  get,
};

export default user;
