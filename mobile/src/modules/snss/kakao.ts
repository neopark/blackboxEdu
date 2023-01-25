import { login, logout, getProfile } from "@react-native-seoul/kakao-login";

async function signin() {
  try {
    await login();
    const user = await getProfile();
    const profile = {
      ...user,
      id: user.id,
    };
    return profile;
  } catch (err: any) {
    if (
      !String(err.message).includes("KakaoSDKCommon.SdkError") &&
      String(err.message).includes(" 0.") &&
      err.message !== "user cancelled."
    ) {
      throw err;
    }
  }
}

async function signout() {
  await logout();
}

const kakao = {
  signin,
  signout,
};

export default kakao;
