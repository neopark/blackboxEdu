// #MEMO, #PACKAGE_NAME
package com.kkch196247.app.mobile;
//

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
// #MEMO, #MODULE: @react-navigation/native
// #ADD:
import android.os.Bundle;
// 
// #MEMO, #BOOT_SPLASH
// #MEMO, #MODULE: react-native-bootsplash
// #ADD:
import com.zoontek.rnbootsplash.RNBootSplash;
// 
// #MEMO, #MODULE: @react-native-seoul/kakao-login
// #ADD:
// import android.content.ClipData;
// import android.content.ClipboardManager;
// import java.security.MessageDigest;
// import android.content.pm.PackageInfo;
// import android.content.pm.PackageManager;
// import android.content.pm.Signature;
// import android.util.Base64;
// import android.util.Log;
// 

public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "app";
  }

  // #MEMO, #MODULE: @react-navigation/native
  // #MEMO, #MODULE: @react-native-seoul/kakao-login
  // #ADD:
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    // #MEMO, #MODULE: @react-native-seoul/kakao-login
    // #ADD:
    // getKeyHash();
    // 
  }
  // 

  // #MEMO, #MODULE: @react-native-seoul/kakao-login
  // #ADD:
  // private void getKeyHash() {
  //   PackageInfo info;
  //   try {
  //     info = getPackageManager().getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES);
  //     for (Signature signature : info.signatures) {
  //       MessageDigest md = MessageDigest.getInstance("SHA");
  //       md.update(signature.toByteArray());
  //       String something = new String(Base64.encode(md.digest(), 0));
  //       Log.e("keyHash", something);
  //       ClipboardManager clipboard = (ClipboardManager)
  //       getSystemService(CLIPBOARD_SERVICE);
  //       ClipData clip = ClipData.newPlainText("keyHash", something);
  //       clipboard.setPrimaryClip(clip);
  //     }
  //   } catch (Exception e) { }
  // }
  // 

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected void loadApp(String appKey) {
      // #MEMO, #BOOT_SPLASH
      // #MEMO, #MODULE: react-native-bootsplash
      // #ADD:
      RNBootSplash.init(getPlainActivity());
      // 
      super.loadApp(appKey);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }
}
