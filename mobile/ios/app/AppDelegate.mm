#import "AppDelegate.h"

// #MEMO, #MODULE: @react-native-firebase/app
// #ADD:
#import <Firebase.h>
// 
// #MEMO, #MODULE: @react-native-community/push-notification-ios
// #ADD:
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
// 
// #MEMO, #MODULE: @react-native-seoul/kakao-login
// #ADD:
#import <RNKakaoLogins.h>
// 
// #MEMO, #MODULE: @react-native-seoul/naver-login
// #ADD:
#import <NaverThirdPartyLogin/NaverThirdPartyLogin.h>
//
// #MEMO, #MODULE: @react-native-google-signin/google-signin
// #ADD:
#import <RNGoogleSignin/RNGoogleSignin.h>
//

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTAppSetupUtils.h>

// #MEMO, #BOOT_SPLASH
// #MEMO, #MODULE: react-native-bootsplash
// #ADD:
#import "RNBootSplash.h"
// 

#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>

#import <react/config/ReactNativeConfig.h>

@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // #MEMO, #MODULE: @react-native-firebase/app
  // #ADD:
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  // 
  RCTAppSetupPrepareApp(application);
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
#endif
  UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"app", nil);
  if (@available(iOS 13.0, *)) {
    rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
    rootView.backgroundColor = [UIColor whiteColor];
  }
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  // #MEMO, #MODULE: @react-native-community/push-notification-ios
  // #ADD:
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  // 
  // #MEMO, #BOOT_SPLASH
  // #MEMO, #MODULE: react-native-bootsplash
  // #ADD:
  [RNBootSplash initWithStoryboard:[[[NSBundle mainBundle] infoDictionary] valueForKey:@"UILaunchStoryboardName"] rootView:rootView];
  // 
  // #MEMO, #MODULE: @react-native-seoul/naver-login
  // #ADD:
  [[NaverThirdPartyLoginConnection getSharedInstance] setIsNaverAppOauthEnable:YES];
  [[NaverThirdPartyLoginConnection getSharedInstance] setIsInAppOauthEnable:YES];
  // 
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// #MEMO, #MODULE: @react-native-seoul/kakao-login
// #MEMO, #MODULE: @react-native-seoul/naver-login
// #MEMO, #MODULE: @react-native-google-signin/google-signin
// #ADD:
- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options 
{
  // #MEMO, #MODULE: @react-native-seoul/kakao-login
  // #ADD:
  if ([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl:url];
  }
  // 
  // #MEMO, #MODULE: @react-native-seoul/naver-login
  // #ADD:
  else if ([url.scheme isEqualToString:[[[NSBundle mainBundle] infoDictionary] valueForKey:@"NAVER_URL_SCHEME"]]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
  }
  // 
  // #MEMO, #MODULE: @react-native-google-signin/google-signin
  // #ADD:
  else if ([RNGoogleSignin application:application openURL:url options:options]) {
    return [RNGoogleSignin application:application openURL:url options:options];
  }
  else {
    return [RNGoogleSignin application:application openURL:url options:options];
  }
  // 
}
// 

// #MEMO, #MODULE: @react-native-community/push-notification-ios
// #ADD:
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}
// 

#if RCT_NEW_ARCH_ENABLED

#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge delegate:self jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name initParams: (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}

#endif

@end
