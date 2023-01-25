import "react-native-get-random-values";
import appleAuth, { appleAuthAndroid } from "@invertase/react-native-apple-authentication";
import { v4 } from "uuid";
import jwtDecode from "jwt-decode";
import values from "../../values";
import storage, { T_storageValueObj } from "../storage";

export function initApple() {
  if (!values.device.isIos) {
    const configs = {
      nonce: v4(),
      state: v4(),
      scope: appleAuthAndroid.Scope.ALL,
      clientId: values.apple.clientId,
      redirectUri: values.apple.redirectUri,
      responseType: appleAuthAndroid.ResponseType.ALL,
    };
    appleAuthAndroid.configure(configs);
  }
}

async function signin() {
  try {
    let response: any = null;
    let id = "";
    let name = "";
    let email = "";
    if (values.device.isIos) {
      const opts = {
        requestedOperation: appleAuth.Operation.LOGIN,
      };
      response = await appleAuth.performRequest(opts);
      const profile: any = jwtDecode(response.identityToken);
      id = profile.sub as string;
      if (response.email) {
        email = response.email;
      }
      if (response.fullName?.familyName && response.fullName.givenName) {
        name = response.fullName.familyName + response.fullName.givenName;
      }
    } else {
      response = await appleAuthAndroid.signIn();
      const profile: any = jwtDecode(response.id_token);
      id = profile.sub;
      if (response?.user) {
        if (response.user.name?.firstName && response.user.name.lastName) {
          name = response.user.name.lastName + response.user.name.firstName;
        }
        if (response.user.email) {
          email = response.user.email;
        }
      }
    }
    if (name && email) {
      const user: T_storageValueObj = {
        name,
        email,
      };
      await storage.set(id, user);
    } else {
      const user = await storage.get<T_storageValueObj>(id);
      if (user) {
        name = user.name;
        email = user.email;
      }
    }
    const profile = {
      ...response,
      id,
      name,
      email,
    };
    return profile;
  } catch (err: any) {
    if (
      !String(err.message).includes("com.apple.AuthenticationServices.AuthorizationError") &&
      (String(err.message).includes("1000") || String(err.message).includes("1001")) &&
      err.message !== "E_SIGNIN_CANCELLED_ERROR"
    ) {
      throw err;
    }
  }
}

async function signout() {
  //
}

const apple = {
  signin,
  signout,
};

export default apple;
