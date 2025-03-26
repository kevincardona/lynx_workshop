import { SupportedStorage } from '@supabase/auth-js';

const NativeLocalStorage = NativeModules.NativeLocalStorageModule;

export const supabaseStorage: SupportedStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      const value = await new Promise<string | null>((resolve) => {
        const result = NativeLocalStorage.getStorageItem(key);
        resolve(result);
      });
      console.log(`[Storage] Get ${key}: ${value}`);
      return value || null; 
    } catch (error) {
      console.error(`[Storage] Get ${key} failed:`, error);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        const result = NativeLocalStorage.setStorageItem(key, value);
        if (result === undefined) resolve(); // Assume success if no error
        else reject(new Error('Set item failed'));
      });
      console.log(`[Storage] Set ${key}: ${value}`);
    } catch (error) {
      console.error(`[Storage] Set ${key} failed:`, error);
      throw error; 
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        const result = NativeLocalStorage.setStorageItem(key, '');
        if (result === undefined) resolve();
        else reject(new Error('Remove item failed'));
      });
      console.log(`[Storage] Removed ${key}`);
    } catch (error) {
      console.error(`[Storage] Remove ${key} failed:`, error);
      throw error;
    }
  },

  isServer: false, 
};

