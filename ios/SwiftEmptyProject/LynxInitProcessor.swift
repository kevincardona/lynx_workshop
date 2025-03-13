//
//  LynxInitProcessor.swift
//  SwiftEmptyProject
//
//  Created by Kevin Cardona on 3/13/25.
//
@objc
public class LynxInitProcessor: NSObject {
    private static var sharedConfig: LynxConfig?
    
    @objc
    public func setupLynxEnv() {
        let config = LynxConfig(provider: DemoLynxProvider.shared)
        config.register(NativeLocalStorageModule.self)
        LynxInitProcessor.sharedConfig = config
        print("LynxEnv setup with sharedConfig: \(config)")
    }
    
    @objc
    public static func getSharedConfig() -> LynxConfig {
        if sharedConfig == nil {
            let processor = LynxInitProcessor()
            processor.setupLynxEnv()
        }
        return sharedConfig!
    }
}
