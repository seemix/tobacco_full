import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';


const i18nOptions = {
    //  fallbackLng: 'ru',
      debug: true,
    detection: {
        order: ['queryString', 'cookie'],
        caches: ['cookie'],
    },
    interpolation: {
        escapeValue: true,
    },
};

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nOptions);

export default i18n;