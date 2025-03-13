//
//  NativeLocalStorageModule.m
//  SwiftEmptyProject
//
//  Created by Kevin Cardona on 3/13/25.
//
#import "NativeLocalStorageModule.h"

@interface NativeLocalStorageModule()
@property (strong, nonatomic) NSUserDefaults *localStorage;
@end

@implementation NativeLocalStorageModule

static NSString *const NativeLocalStorageKey = @"MyLocalStorage";

- (instancetype)init {
    if (self = [super init]) {
        _localStorage = [[NSUserDefaults alloc] initWithSuiteName:NativeLocalStorageKey];
    }
    return self;
}

+ (NSString *)name {
    return @"NativeLocalStorageModule";
}

+ (NSDictionary<NSString *, NSString *> *)methodLookup {
    return @{
        @"setStorageItem" : NSStringFromSelector(@selector(setStorageItem:value:)),
        @"getStorageItem" : NSStringFromSelector(@selector(getStorageItem:)),
        @"clearStorage" : NSStringFromSelector(@selector(clearStorage))
    };
}

- (void)setStorageItem:(NSString *)key value:(NSString *)value {
    [self.localStorage setObject:value forKey:key];
}

- (NSString*)getStorageItem:(NSString *)key {
    NSString *value = [self.localStorage stringForKey:key];
    return value;
}

- (void)clearStorage {
    NSDictionary *keys = [self.localStorage dictionaryRepresentation];
    for (NSString *key in keys) {
        [self.localStorage removeObjectForKey:key];
    }
}

@end
