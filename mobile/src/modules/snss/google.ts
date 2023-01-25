import { GoogleSignin } from "@react-native-google-signin/google-signin";
import values from "../../values";

export function initGoogle() {
  const configs = {
    webClientId: values.google.webClientId,
  };
  GoogleSignin.configure(configs);
}

async function signin() {
  try {
    await GoogleSignin.hasPlayServices();
    const result = await GoogleSignin.signIn();
    const profile = {
      ...result,
      id: result.user.id,
    };
    return profile;
  } catch (err: any) {
    if (
      err.message !== "Sign in action cancelled" &&
      err.message !==
        'RNGoogleSignInError: The user canceled the sign in request., Error Domain=com.google.GIDSignIn Code=-5 "The user canceled the sign-in flow." UserInfo={NSLocalizedDescription=The user canceled the sign-in flow.}'
    ) {
      throw err;
    }
  }
}

async function signout() {
  await GoogleSignin.signOut();
}

const google = {
  signin,
  signout,
};

export default google;
