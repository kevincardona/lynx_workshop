## lynx_workshop

This is a test repo for experimenting with <a href="https://lynxjs.org/">ReactLynx</a>.

This repo demonstrates ReactLynx's usage with the following:

- tailwind
- supabase basic auth (still tweaking)
- react-router
- custom native components (ios)
- custom native modules (ios)

## QR Code
Scan this QR code to demo (note native elements wont work without modifying your Lynx Explorer):

![QR Code](https://raw.githubusercontent.com/kevincardona/lynx_workshop/main/public/assets/qr-code.png)

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

### IOS

To setup ios dev for this repo, first install the dependencies:

```bash
cd ios
pod install
```

Then open and run the following in Xcode:

```bash
cd ios
open SwiftEmptyProject.xcworkspace
```

Lastly update the `url` in the `ViewController.swift` to match your development server address.

