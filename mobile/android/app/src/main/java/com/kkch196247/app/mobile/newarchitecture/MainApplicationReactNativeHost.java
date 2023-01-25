// #MEMO, #PACKAGE_NAME
package com.kkch196247.app.mobile.newarchitecture;
import com.kkch196247.app.mobile.BuildConfig;
import com.kkch196247.app.mobile.newarchitecture.components.MainComponentsRegistry;
import com.kkch196247.app.mobile.newarchitecture.modules.MainApplicationTurboModuleManagerDelegate;
//

import android.app.Application;
import androidx.annotation.NonNull;
import com.facebook.react.PackageList;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactPackageTurboModuleManagerDelegate;
import com.facebook.react.bridge.JSIModulePackage;
import com.facebook.react.bridge.JSIModuleProvider;
import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.JSIModuleType;
import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.UIManager;
import com.facebook.react.fabric.ComponentFactory;
import com.facebook.react.fabric.CoreComponentsRegistry;
import com.facebook.react.fabric.EmptyReactNativeConfig;
import com.facebook.react.fabric.FabricJSIModuleProvider;
import com.facebook.react.uimanager.ViewManagerRegistry;
import java.util.ArrayList;
import java.util.List;

public class MainApplicationReactNativeHost extends ReactNativeHost {
  public MainApplicationReactNativeHost(Application application) {
    super(application);
  }

  @Override
  public boolean getUseDeveloperSupport() {
    return BuildConfig.DEBUG;
  }

  @Override
  protected List<ReactPackage> getPackages() {
    List<ReactPackage> packages = new PackageList(this).getPackages();
    return packages;
  }

  @Override
  protected String getJSMainModuleName() {
    return "index";
  }

  @NonNull
  @Override
  protected ReactPackageTurboModuleManagerDelegate.Builder getReactPackageTurboModuleManagerDelegateBuilder() {
    return new MainApplicationTurboModuleManagerDelegate.Builder();
  }

  @Override
  protected JSIModulePackage getJSIModulePackage() {
    return new JSIModulePackage() {
      @Override
      public List<JSIModuleSpec> getJSIModules(final ReactApplicationContext reactApplicationContext, final JavaScriptContextHolder jsContext) {
        final List<JSIModuleSpec> specs = new ArrayList<>();
        specs.add(new JSIModuleSpec() {
          @Override
          public JSIModuleType getJSIModuleType() {
            return JSIModuleType.UIManager;
          }

          @Override
          public JSIModuleProvider<UIManager> getJSIModuleProvider() {
            final ComponentFactory componentFactory = new ComponentFactory();
            CoreComponentsRegistry.register(componentFactory);
            MainComponentsRegistry.register(componentFactory);
            final ReactInstanceManager reactInstanceManager = getReactInstanceManager();
            ViewManagerRegistry viewManagerRegistry = new ViewManagerRegistry(reactInstanceManager.getOrCreateViewManagers(reactApplicationContext));
            return new FabricJSIModuleProvider(reactApplicationContext, componentFactory, new EmptyReactNativeConfig(), viewManagerRegistry);
          }
        });
        return specs;
      }
    };
  }
}
