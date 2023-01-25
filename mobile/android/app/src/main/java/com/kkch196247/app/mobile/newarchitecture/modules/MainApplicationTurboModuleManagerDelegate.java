// #MEMO, #PACKAGE_NAME
package com.kkch196247.app.mobile.newarchitecture.modules;
//

import com.facebook.jni.HybridData;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactPackageTurboModuleManagerDelegate;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.soloader.SoLoader;
import java.util.List;

public class MainApplicationTurboModuleManagerDelegate extends ReactPackageTurboModuleManagerDelegate {
  private static volatile boolean sIsSoLibraryLoaded;

  protected native HybridData initHybrid();

  native boolean canCreateTurboModule(String moduleName);

  protected MainApplicationTurboModuleManagerDelegate(ReactApplicationContext reactApplicationContext, List<ReactPackage> packages) {
    super(reactApplicationContext, packages);
  }

  public static class Builder extends ReactPackageTurboModuleManagerDelegate.Builder {
    protected MainApplicationTurboModuleManagerDelegate build(
        ReactApplicationContext context, List<ReactPackage> packages) {
      return new MainApplicationTurboModuleManagerDelegate(context, packages);
    }
  }

  @Override
  protected synchronized void maybeLoadOtherSoLibraries() {
    if (!sIsSoLibraryLoaded) {
      SoLoader.loadLibrary("app_appmodules");
      sIsSoLibraryLoaded = true;
    }
  }
}
