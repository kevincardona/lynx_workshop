// LynxExplorerWebView.m
// Copyright 2025 Your Name. All rights reserved.
// Licensed under the Apache License Version 2.0.

#import "LynxWebView.h"
#import <Lynx/LynxComponentRegistry.h>
#import <Lynx/LynxPropsProcessor.h>
#import <Lynx/LynxUIOwner.h>

@implementation LynxWebView

LYNX_LAZY_REGISTER_UI("webview")

- (WKWebView *)createView {
    // Create WKWebView with default configuration
    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    WKWebView *webView = [[WKWebView alloc] initWithFrame:CGRectZero configuration:config];
    webView.navigationDelegate = self;
    webView.clipsToBounds = YES;
    webView.autoresizesSubviews = NO;
    
    return webView;
}

- (void)layoutDidFinished {
}

// Property setter for the URL
LYNX_PROP_SETTER("src", setSrc, NSString *) {
    if (value && ![value isEqualToString:@""]) {
        NSURL *url = [NSURL URLWithString:value];
        if (url) {
            NSURLRequest *request = [NSURLRequest requestWithURL:url];
            [self.view loadRequest:request];
        }
    }
}

// Event for navigation start
- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(WKNavigation *)navigation {
    [self emitEvent:@"loadstart" detail:@{@"value": webView.URL.absoluteString ?: @""}];
}

// Event for navigation success
- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    [self emitEvent:@"load" detail:@{@"value": webView.URL.absoluteString ?: @""}];
}

// Event for navigation failure
- (void)webView:(WKWebView *)webView didFailNavigation:(WKNavigation *)navigation withError:(NSError *)error {
    [self emitEvent:@"error" detail:@{
        @"url": webView.URL.absoluteString ?: @"",
        @"error": error.localizedDescription ?: @"Unknown error"
    }];
}

// Emit custom events to Lynx/React
- (void)emitEvent:(NSString *)name detail:(NSDictionary *)detail {
    LynxCustomEvent *eventInfo = [[LynxDetailEvent alloc] initWithName:name
                                                            targetSign:[self sign]
                                                                detail:detail];
    [self.context.eventEmitter dispatchCustomEvent:eventInfo];
}

// Optional: Method to reload the web view
LYNX_UI_METHOD(reload) {
    [self.view reload];
    callback(kUIMethodSuccess, nil);
}

@end
