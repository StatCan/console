import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";

//english namespaces
import enAccounts from "./locales/en/accounts.json";
import enBucketDetails from "./locales/en/bucketsDetails.json";
import enListBuckets from "./locales/en/listBuckets.json";
import enCommon from "./locales/en/common.json";
import enConfigurations from "./locales/en/configurations.json";
import enDashboard from "./locales/en/dashboard.json";
import enDirectCSI from "./locales/en/directCSI.json";
import enGroups from "./locales/en/groups.json";
import enHeal from "./locales/en/heal.json";
import enHealthInfo from "./locales/en/healthInfo.json";
import enGlobal from "./locales/en/global.json";
import enLicense from "./locales/en/license.json";
import enLogs from "./locales/en/logs.json";
import enMenu from "./locales/en/menu.json";
import enNotifEndpoint from "./locales/en/notificationEndpoints.json";
import enObjectBrowser from "./locales/en/objectBrowser.json";
import enOther from "./locales/en/other.json";
import enPolicies from "./locales/en/policies.json";
import enStorage from "./locales/en/storage.json";
import enTenants from "./locales/en/tenants.json";
import enTrace from "./locales/en/trace.json";
import enUsers from "./locales/en/users.json";
import enWatch from "./locales/en/watch.json";
import enErrors from "./locales/en/errors.json";

//french namespaces
import frAccounts from "./locales/fr/accounts.json";
import frBucketDetails from "./locales/fr/bucketsDetails.json";
import frListBuckets from "./locales/fr/listBuckets.json";
import frCommon from "./locales/fr/common.json";
import frConfigurations from "./locales/fr/configurations.json";
import frDashboard from "./locales/fr/dashboard.json";
import frDirectCSI from "./locales/fr/directCSI.json";
import frGroups from "./locales/fr/groups.json";
import frHeal from "./locales/fr/heal.json";
import frHealthInfo from "./locales/fr/healthInfo.json";
import frGlobal from "./locales/fr/global.json";
import frLicense from "./locales/fr/license.json";
import frLogs from "./locales/fr/logs.json";
import frMenu from "./locales/fr/menu.json";
import frNotifEndpoint from "./locales/fr/notificationEndpoints.json";
import frObjectBrowser from "./locales/fr/objectBrowser.json";
import frOther from "./locales/fr/other.json";
import frPolicies from "./locales/fr/policies.json";
import frStorage from "./locales/fr/storage.json";
import frTenants from "./locales/fr/tenants.json";
import frTrace from "./locales/fr/trace.json";
import frUsers from "./locales/fr/users.json";
import frWatch from "./locales/fr/watch.json";
import frErrors from "./locales/fr/errors.json";

const resources = {
  en: {
    accounts: enAccounts,
    bucketsDetails: enBucketDetails,
    listBuckets: enListBuckets,
    common: enCommon,
    configurations: enConfigurations,
    dashboard: enDashboard,
    directCSI: enDirectCSI,
    groups: enGroups,
    heal: enHeal,
    healthInfo: enHealthInfo,
    global: enGlobal,
    license: enLicense,
    logs: enLogs,
    menu: enMenu,
    notificationEndpoints: enNotifEndpoint,
    objectBrowser: enObjectBrowser,
    other: enOther,
    policies: enPolicies,
    storage: enStorage,
    tenants: enTenants,
    trace: enTrace,
    users: enUsers,
    watch: enWatch,
    errors: enErrors,
  },
  fr: {
    accounts: frAccounts,
    bucketsDetails: frBucketDetails,
    listBuckets: frListBuckets,
    common: frCommon,
    configurations: frConfigurations,
    dashboard: frDashboard,
    directCSI: frDirectCSI,
    groups: frGroups,
    heal: frHeal,
    healthInfo: frHealthInfo,
    global: frGlobal,
    license: frLicense,
    logs: frLogs,
    menu: frMenu,
    notificationEndpoints: frNotifEndpoint,
    objectBrowser: frObjectBrowser,
    other: frOther,
    policies: frPolicies,
    storage: frStorage,
    tenants: frTenants,
    trace: frTrace,
    users: frUsers,
    watch: frWatch,
    errors: frErrors,
  },
};

const options = {
  order: ["navigator"],
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    resources,
    fallbackLng: ["en", "fr"],
    nonExplicitSupportedLngs: true,
    debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
