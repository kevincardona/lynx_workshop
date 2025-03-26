// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

#import "LynxExplorerInput.h"
#import <Lynx/LynxComponentRegistry.h>
#import <Lynx/LynxPropsProcessor.h>
#import <Lynx/LynxUIOwner.h>
#import "UIHelper.h"

@implementation LynxTextField

- (UIEditingInteractionConfiguration)editingInteractionConfiguration API_AVAILABLE(ios(13.0)) {
  return UIEditingInteractionConfigurationNone;
}

- (void)setPadding:(UIEdgeInsets)padding {
  _padding = padding;
  [self setNeedsLayout];
}

- (CGRect)textRectForBounds:(CGRect)bounds {
    CGRect rect = [super textRectForBounds:bounds];
    // Adjust for padding
    rect.origin.x = self.padding.left;
    rect.origin.y = self.padding.top;
    rect.size.width = bounds.size.width - self.padding.left - self.padding.right;
    rect.size.height = bounds.size.height - self.padding.top - self.padding.bottom;

    // Adjust for clear button if it's present
    if (self.clearButtonMode != UITextFieldViewModeNever) {
        CGRect clearButtonRect = [self rightViewRectForBounds:bounds];
        rect.size.width -= (clearButtonRect.size.width + 15);
    }

    return rect;
}

- (CGRect)editingRectForBounds:(CGRect)bounds {
  return [self textRectForBounds:bounds];
}
@end

@implementation LynxExplorerInput {
    BOOL _selectOnFocus;
}

LYNX_LAZY_REGISTER_UI("input")

- (UITextField *)createView {
  UITextField *textField = [[LynxTextField alloc] init];
  textField.autoresizesSubviews = NO;
  textField.clipsToBounds = YES;
  textField.delegate = self;
  textField.secureTextEntry = NO;
  textField.font = [UIFont systemFontOfSize:14];
  textField.clearButtonMode = UITextFieldViewModeWhileEditing;
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(textFieldDidChange:)
                                               name:UITextFieldTextDidChangeNotification
                                             object:textField];

  return textField;
}

- (void)layoutDidFinished {
  self.view.padding = self.padding;
}

LYNX_PROP_SETTER("value", setValue, NSString *) { self.view.text = value; }

LYNX_PROP_SETTER("placeholder", setPlaceholder, NSString *) { self.view.placeholder = value; }

LYNX_PROP_SETTER("text-color", setTextColor, NSString *) {
  self.view.textColor = [UIHelper colorWithHexString:value];
}

LYNX_PROP_SETTER("return-key-type", setReturnKeyType, NSString *) {
  if ([value isEqualToString:@"go"]) {
    self.view.returnKeyType = UIReturnKeyGo;
  } else if ([value isEqualToString:@"search"]) {
    self.view.returnKeyType = UIReturnKeySearch;
  } else if ([value isEqualToString:@"send"]) {
    self.view.returnKeyType = UIReturnKeySend;
  } else {
    self.view.returnKeyType = UIReturnKeyDone; // Default
  }
}

LYNX_PROP_SETTER("select-on-focus", setSelectOnFocus, NSString *) {
    _selectOnFocus = [value boolValue]; // Convert string "true"/"false" to BOOL
}

// Prop to control clear button visibility
LYNX_PROP_SETTER("clear-button", setClearButton, NSString *) {
    if ([value boolValue]) {
        self.view.clearButtonMode = UITextFieldViewModeWhileEditing; // Show "x" while editing
    } else {
        self.view.clearButtonMode = UITextFieldViewModeNever; // Hide "x"
    }
}

// New prop: input-type to support username/password autofill
LYNX_PROP_SETTER("type", setInputType, NSString *) {
    if ([value isEqualToString:@"username"]) {
        self.view.textContentType = UITextContentTypeUsername; // Enables username autofill
        self.view.secureTextEntry = NO;
        self.view.keyboardType = UIKeyboardTypeEmailAddress; // Better for usernames/emails
    } else if ([value isEqualToString:@"password"]) {
        self.view.textContentType = UITextContentTypePassword; // Enables password autofill
        self.view.secureTextEntry = YES; // Hides text
    } else if ([value isEqualToString:@"email"]) {
        self.view.textContentType = UITextContentTypeEmailAddress;
        self.view.secureTextEntry = NO;
        self.view.keyboardType = UIKeyboardTypeEmailAddress;
    } else {
        self.view.textContentType = nil; // Default text input
        self.view.secureTextEntry = NO;
        self.view.keyboardType = UIKeyboardTypeDefault;
    }
}

// Implement select-on-focus behavior
- (void)textFieldDidBeginEditing:(UITextField *)textField {
    if (_selectOnFocus && textField.text.length > 0) {
        [textField selectAll:nil]; // Select all text when editing begins
    }
}

// Accessible using bindinput prop
- (void)textFieldDidChange:(NSNotification *)notification {
  [self emitEvent:@"input"
           detail:@{
             @"value" : [self.view text] ?: @"",
           }];
}

// Accessible using bindsubmit prop
- (BOOL)textFieldShouldReturn:(UITextField *)textField {
  [self emitEvent:@"submit"
           detail:@{
             @"value" : [self.view text] ?: @"",
           }];
  [self.view resignFirstResponder];
  return YES;
}

LYNX_UI_METHOD(focus) {
  if ([self.view becomeFirstResponder]) {
    callback(kUIMethodSuccess, nil);
  } else {
    callback(kUIMethodUnknown, @"fail to focus");
  }
}

- (void)textFieldDidEndEditing:(UITextField *)textField {
  [self emitEvent:@"blur" detail:@{@"value" : [self.view text] ?: @""}];
}

- (void)emitEvent:(NSString *)name detail:(NSDictionary *)detail {
  LynxCustomEvent *eventInfo = [[LynxDetailEvent alloc] initWithName:name
                                                          targetSign:[self sign]
                                                              detail:detail];
  [self.context.eventEmitter dispatchCustomEvent:eventInfo];
}

@end
