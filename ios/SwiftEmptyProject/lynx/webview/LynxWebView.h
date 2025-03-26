// LynxExplorerWebView.h
// Copyright 2025 Your Name. All rights reserved.
// Licensed under the Apache License Version 2.0.

#import <Lynx/LynxUI.h>
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface LynxWebView : LynxUI<WKWebView *> <WKNavigationDelegate>
@end

NS_ASSUME_NONNULL_END
