//
//  LynvViewController.swift
//  SwiftEmptyProject
//

import Foundation
import UIKit
import Lynx

class LynxViewController: UIViewController {
    var url: String
    
    init(url: String) {
        print("Initializing LynxViewController")
        self.url = url
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        print("Loading Lynx View Controller")
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        self.view.backgroundColor = .white
        self.title = "lynx_workshop"
        
        render(url: self.url)
    }
    
    private func render(url: String) {
        // TODO: render LynxView here
        print("Rendering LynxView from url: " + url)
        let lynxView = LynxView { builder in
            builder.config = LynxInitProcessor.getSharedConfig()
            builder.screenSize = self.view.frame.size
            builder.fontScale = 1.0
        }
        
        lynxView.preferredLayoutWidth = self.view.frame.size.width
        lynxView.preferredLayoutHeight = self.view.frame.size.height
        lynxView.layoutWidthMode = .exact
        lynxView.layoutHeightMode = .exact
        lynxView.loadTemplate(fromURL: url, initData: nil)
        
        self.view.addSubview(lynxView)
    }
}
