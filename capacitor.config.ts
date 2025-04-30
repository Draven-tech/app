import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'Hackdog.app',
  appName: 'Sentinel',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: false, 
      launchShowDuration: 2000, 
      backgroundColor: "#ffffff", 
      androidScaleType: "CENTER_CROP", 
      showSpinner: false,
    },
  },
};



export default config;
