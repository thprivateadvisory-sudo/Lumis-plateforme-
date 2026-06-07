import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'fr.cohesif.ia',
  appName: 'Cohesif IA',
  webDir: 'out',
  server: {
    url: 'https://cohesif-ia.fr',
    cleartext: false,
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#05060a',
  },
  android: {
    backgroundColor: '#05060a',
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      launchAutoHide: true,
      backgroundColor: '#05060a',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      iosSpinnerStyle: 'small',
      spinnerColor: '#0BC8F0',
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#05060a',
    },
  },
}

export default config
