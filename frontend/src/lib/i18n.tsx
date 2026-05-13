import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { enMessages, type Messages } from "@/locales/en";
import { zhCNMessages } from "@/locales/zh-CN";

export type Locale = "en" | "zh-CN";

const STORAGE_KEY = "vibe-trading-locale";

const enCatalog: Messages = enMessages as unknown as Messages;

const catalogs: Record<Locale, Messages> = {
  en: enCatalog,
  "zh-CN": zhCNMessages,
};

function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "zh-CN") return stored;
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined") {
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith("zh")) return "zh-CN";
  }
  return "zh-CN";
}

export type I18nContextValue = {
  t: Messages;
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const I18nCtx = createContext<I18nContextValue>({
  t: zhCNMessages,
  locale: "zh-CN",
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  useEffect(() => {
    document.documentElement.lang = locale === "zh-CN" ? "zh-CN" : "en";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      t: catalogs[locale],
      locale,
      setLocale,
    }),
    [locale, setLocale],
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  return useContext(I18nCtx);
}
