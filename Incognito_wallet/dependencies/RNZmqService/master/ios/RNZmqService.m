
#import "RNZmqService.h"
#import <AutonomousZMQ/AutonomousZMQ.h>
@implementation RNZmqService

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendData:(NSString*)data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
    NSLog(@"send data %@", data);
    
    [[ZMQController sharedInstance] sendLocalData:data onSuccess:^(id object) {
        if (data){
            resolve(data);
        }else{
            reject(@"get_error", @"Error getting data", nil);
        }
    }];
    
}

@end
  
