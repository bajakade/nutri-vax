import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    home: {
      network: {
        online: 'You are online. Data is syncing.',
        offline: 'You are offline. Changes will sync when connection is restored.',
      },
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources,
    ns: ['home'],
    defaultNS: 'home',
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
