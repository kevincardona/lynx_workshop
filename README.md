## lynx_workshop

This is a test repo for experimenting with <a href="https://lynxjs.org/">ReactLynx</a>.

This repo demonstrates ReactLynx's usage with the following:

- tailwind
- react-router
- custom native components (ios)
- custom native modules (ios)

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

