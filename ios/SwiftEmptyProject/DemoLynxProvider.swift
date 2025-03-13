//
//  DemoLynxProvider.swift
//  SwiftEmptyProject
//
//  Created by Kevin Cardona on 3/13/25.
//

import Foundation
import Lynx

@objc(DemoLynxProvider)
class DemoLynxProvider: NSObject, LynxTemplateProvider {
    @objc static let shared = DemoLynxProvider()
    func loadTemplate(withUrl url: String!, onComplete callback: LynxTemplateLoadBlock!) {
        // Ensure URL is valid
        guard let urlString = url, let nsUrl = URL(string: urlString) else {
            let error = NSError(domain: "com.lynx", code: 400, userInfo: [NSLocalizedDescriptionKey: "Invalid URL provided"])
            callback(nil, error)
            return
        }

        // Create URLSession task
        let task = URLSession.shared.dataTask(with: nsUrl) { data, response, error in
            // Ensure callback runs on main thread (Lynx might expect this)
            DispatchQueue.main.async {
                if let error = error {
                    // Pass through any network or fetch errors
                    callback(nil, error)
                } else if let data = data, !data.isEmpty {
                    // Success: Return data if present and non-empty
                    callback(data, nil)
                } else {
                    // No data or empty data error
                    let errorMsg = "Data from \(urlString) is nil or empty!"
                    let error = NSError(domain: "com.lynx", code: 200, userInfo: [NSLocalizedDescriptionKey: errorMsg])
                    callback(nil, error)
                }
            }
        }
        
        // Start the task
        task.resume()
    }
}
