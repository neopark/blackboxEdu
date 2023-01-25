import { getAccessToken, sendApi } from ".";
import { T_user } from "../contexts/user";
import { T_snsType } from "../modules/snss";

export type T_deviceType = "ios" | "android";

export type T_userSigninData = {
  userId: string;
  snsType: T_snsType;
  deviceType: T_deviceType;
  deviceId: string;
  fcmToken: string;
};

export type T_userSigninResult = {
  msg: string;
  isSuccess: boolean;
  accessToken?: string;
  refreshToken?: string;
};

async function signin(data: T_userSigninData) {
  const response = await sendApi({
    method: "post",
    url: "/user/sns/login",
    data: {
      ...data,
    },
  });
  const accessToken = response.data.data?.accessToken?.accessToken;
  const refreshToken = response.data.data?.refreshToken?.refreshToken;
  delete response.data.data;
  let result: T_userSigninResult = {
    ...response.data,
  };
  if (response.data.msg !== "가입되지 않은 아이디입니다.") {
    result = {
      ...result,
      isSuccess: true,
      accessToken,
      refreshToken,
    };
  } else {
    result = {
      ...result,
      isSuccess: false,
    };
  }
  return result;
}

export type T_userUpdateData = {
  name: string;
  businessNum: string;
  companyName: string;
  qualificationNum: string;
  phoneNum: string;
  userId: string;
};

export type T_userUpdateResult = {
  msg: string;
  isSuccess: boolean;
};

async function update(data: T_userUpdateData) {
  const response = await sendApi({
    method: "post",
    url: "/user/update",
    data: {
      ...data,
      ctype: "update",
    },
  });
  delete response.data.data;
  const result: T_userUpdateResult = {
    ...response.data,
  };
  return result;
}

export type T_userSignupData = {
  snsId: string;
  snsType: T_snsType;
  name: string;
  businessNum: string;
  companyName: string;
  qualificationNum: string;
  phoneNum: string;
  fcmToken: string;
  deviceType: T_deviceType;
  deviceId: string;
};

export type T_userSignupResult = {
  msg: string;
  isSuccess: boolean;
};

async function signup(data: T_userSignupData) {
  const response = await sendApi({
    method: "post",
    url: "/user/sns/signup",
    data: {
      ...data,
    },
  });
  delete response.data.data;
  const result: T_userSignupResult = {
    ...response.data,
  };
  return result;
}

export type T_userGetResult = {
  msg: string;
  isSuccess: boolean;
  accessToken?: string;
  user?: T_user;
};

async function get() {
  const response = await sendApi({
    method: "post",
    url: "/user/login/auto",
    data: {
      accessToken: await getAccessToken(),
    },
  });
  const user: T_user = {
    phoneNum: response.data.data.user.hp,
    id: response.data.data.user.userId,
    snsType: response.data.data.user.snsType,
    name: response.data.data.user.userNm,
    bizName: response.data.data.user.bizName,
    bizNum: response.data.data.user.bizRegNo,
    appleId: response.data.data.user.appleId || "",
    googleId: response.data.data.user.googleId || "",
    kakaoId: response.data.data.user.kakaoId || "",
    naverId: response.data.data.user.naverId || "",
  };
  delete response.data.data;
  let result: T_userGetResult = {
    ...response.data,
  };
  if (response.data.isSuccess) {
    result = {
      ...result,
      user,
    };
  }
  return result;
}

export type T_userRefreshAccessTokenData = {
  refreshToken: string;
};

export type T_userRefreshAccessTokenResult = {
  msg: string;
  isSuccess: boolean;
  accessToken?: string;
};

async function refreshAccessToken(data: T_userRefreshAccessTokenData) {
  const response = await sendApi({
    method: "post",
    url: "/user/login/refresh",
    data: {
      ...data,
    },
  });
  let result: T_userRefreshAccessTokenResult = {
    ...response.data,
  };
  if (response.data.isSuccess) {
    const accessToken = response.data.data.accessToken;
    result = {
      ...result,
      accessToken,
    };
  }
  return result;
}

export type T_userSnsUpdateData = {
  userId: string;
  snsId: string;
  snsType: string;
  status: "insert" | "delete";
};

export type T_userSnsUpdateResult = {
  msg: string;
  isSuccess: boolean;
};

async function snsUpdate(data: T_userSnsUpdateData) {
  const response = await sendApi({
    method: "post",
    url: "/user/sns/update",
    data: {
      ...data,
    },
  });
  let result: T_userSnsUpdateResult = {
    ...response.data,
  };
  return result;
}

const user = {
  get,
  signin,
  signup,
  refreshAccessToken,
  update,
  snsUpdate,
};

export default user;
