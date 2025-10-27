import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import viCommon from "./locales/vi/common.json";

const savedLang = localStorage.getItem("lang") || "en";

void i18n.use(initReactI18next).init({
  lng: savedLang,
  fallbackLng: "en",
  resources: {
    en: { common: enCommon },
    vi: { common: viCommon }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
