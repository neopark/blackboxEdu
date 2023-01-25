import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import values from "../../values";

async function signin() {
  try {
    const user: any = await new Promise((resolve, reject) => {
      const configs = {
        kConsumerKey: values.naver.consumerKey,
        kConsumerSecret: values.naver.consumerSecret,
        kServiceAppName: values.app.name,
        kServiceAppUrlScheme: values.naver.urlScheme,
      };
      NaverLogin.login(configs, async (err, data: any) => {
        if (err) {
          reject(err);
        } else {
          const result = await getProfile(data.accessToken);
          resolve(result.response);
        }
      });
    });
    const profile = {
      ...user,
      id: user.id,
    };
    return profile;
  } catch (err: any) {
    if (String(err) !== "errCode: user_cancel, errDesc: user_cancel") {
      throw err;
    }
  }
}

async function signout() {
  await NaverLogin.logout();
}

const naver = {
  signin,
  signout,
};

export default naver;
