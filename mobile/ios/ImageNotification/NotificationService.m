#import "NotificationService.h"
// #MEMO, #MODULE: @react-native-firebase/messaging
// #ADD:
#import "FirebaseMessaging.h"
//

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler
{
  self.contentHandler = contentHandler;
  self.bestAttemptContent = [request.content mutableCopy];
  // #MEMO, #MODULE: @react-native-firebase/messaging
  // #BEFORE:
  // self.bestAttemptContent.title = [NSString stringWithFormat:@"%@ [modified]", self.bestAttemptContent.title];
  // self.contentHandler(self.bestAttemptContent);
  // #AFTER:
  [[FIRMessaging extensionHelper] populateNotificationContent:self.bestAttemptContent withContentHandler:contentHandler];
  // 
}

- (void)serviceExtensionTimeWillExpire
{
  self.contentHandler(self.bestAttemptContent);
}

@end
