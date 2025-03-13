// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
#import "LynxDatePicker.h"
#import <Lynx/LynxComponentRegistry.h>
#import <Lynx/LynxPropsProcessor.h>
#import <Lynx/LynxUIOwner.h>
#import "UIHelper.h"

@implementation LynxDatePicker

LYNX_LAZY_REGISTER_UI("date-picker")

- (UIDatePicker *)createView {
    UIDatePicker *datePicker = [[UIDatePicker alloc] init];
    [datePicker addTarget:self
                       action:@selector(datePickerDidChange:)
             forControlEvents:UIControlEventValueChanged];
    return datePicker;
}

LYNX_PROP_SETTER("value", setDate, NSString *) {
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    
    [formatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSSZ"];
    NSDate *date = [formatter dateFromString:value];
    if (date) {
        [self.view setDate:date animated:NO];
    } else {
        NSLog(@"Failed to parse date from string: %@", value);
        [self.view setDate:[NSDate date] animated:NO];
    }
}

- (void)datePickerDidChange:(UIDatePicker *)picker {
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSSZ"];
    [formatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"UTC"]];
    NSString *dateString = [formatter stringFromDate:picker.date];
    [self emitEvent:@"input"
             detail:@{
                 @"value": dateString ?: @""
             }];
}

- (void)emitEvent:(NSString *)name detail:(NSDictionary *)detail {
  LynxCustomEvent *eventInfo = [[LynxDetailEvent alloc] initWithName:name
                                                          targetSign:[self sign]
                                                              detail:detail];
  [self.context.eventEmitter dispatchCustomEvent:eventInfo];
}

@end
