import kakao from "./kakao";
import naver from "./naver";
import google, { initGoogle } from "./google";
import apple, { initApple } from "./apple";

export type T_snsType = "apple" | "google" | "kakao" | "naver";

export function initSnss() {
  initGoogle();
  initApple();
}

export type T_snsProfile = {
  id: string;
  [name: string]: any;
};

async function signin(type: T_snsType) {
  let profile = null;
  switch (type) {
    default:
    case "kakao": {
      profile = await kakao.signin();
      break;
    }
    case "naver": {
      profile = await naver.signin();
      break;
    }
    case "google": {
      profile = await google.signin();
      break;
    }
    case "apple": {
      profile = await apple.signin();
      break;
    }
  }
  return profile;
}

async function signout(sns: T_snsType) {
  switch (sns) {
    case "kakao": {
      return await kakao.signout();
    }
    case "naver": {
      return await naver.signout();
    }
    case "google": {
      return await google.signout();
    }
    case "apple": {
      return await apple.signout();
    }
  }
}

const snss = {
  signin,
  signout,
};

export default snss;
