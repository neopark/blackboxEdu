#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

// #MEMO, #MODULE: @react-native-community/push-notification-ios
// #BEFORE:
// @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
// #AFTER:
#import <UserNotifications/UNUserNotificationCenter.h>
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
// 

@property (nonatomic, strong) UIWindow *window;

@end
