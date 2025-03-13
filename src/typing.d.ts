import { ComponentProps } from 'react'; 

declare let NativeModules: {
  NativeLocalStorageModule: {
    setStorageItem(key: string, value: string): void;
    getStorageItem(key: string): string | null;
    clearStorage(): void;
  };
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'date-picker': ComponentProps;
      'input': ComponentProps;
    }
  };
};

