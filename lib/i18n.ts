"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Locale = "en" | "sw" | "fr";

export type TranslationKey =
  | "app.title"
  | "app.subtitle"
  | "nav.selectLanguage"
  | "upload.dropPrompt"
  | "upload.browse"
  | "upload.camera"
  | "detect.button"
  | "detect.analysing"
  | "detect.offline"
  | "detect.error"
  | "result.primaryDiagnosis"
  | "result.confidence"
  | "result.lowConfidence"
  | "result.symptoms"
  | "result.treatment"
  | "result.prevention"
  | "result.otherPossibilities"
  | "result.share"
  | "result.shareCopied"
  | "result.healthy"
  | "result.scanAnother"
  | "result.severity.high"
  | "result.severity.medium"
  | "result.severity.low"
  | "chat.title"
  | "chat.placeholder"
  | "chat.send"
  | "chat.error"
  | "chat.typing"
  | "chat.charCount"
  | "onboarding.skip"
  | "onboarding.next"
  | "onboarding.getStarted"
  | "onboarding.step1.title"
  | "onboarding.step1.body"
  | "onboarding.step2.title"
  | "onboarding.step2.body"
  | "onboarding.step3.title"
  | "onboarding.step3.body"
  | "offline.banner";

export type Translations = Record<TranslationKey, string>;
export type TranslationMap = Record<Locale, Translations>;

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

// ─── Translation Dictionaries ─────────────────────────────────────────────────

const en: Translations = {
  "app.title": "AfriCrop AI",
  "app.subtitle": "Crop Disease Detection",
  "nav.selectLanguage": "Select language",
  "upload.dropPrompt": "Drop your crop photo here",
  "upload.browse": "Browse files",
  "upload.camera": "Take a photo",
  "detect.button": "Detect Disease",
  "detect.analysing": "Analysing…",
  "detect.offline": "You are offline. Please reconnect to analyse images.",
  "detect.error": "Detection failed. Please try again.",
  "result.primaryDiagnosis": "Primary Diagnosis",
  "result.confidence": "Confidence",
  "result.lowConfidence": "Result may be uncertain — consider a clearer photo.",
  "result.symptoms": "Symptoms",
  "result.treatment": "Treatment",
  "result.prevention": "Prevention",
  "result.otherPossibilities": "Other possibilities",
  "result.share": "Share Result",
  "result.shareCopied": "Result copied to clipboard!",
  "result.healthy": "Your crop appears healthy.",
  "result.scanAnother": "Scan Another",
  "result.severity.high": "High",
  "result.severity.medium": "Medium",
  "result.severity.low": "Low",
  "chat.title": "Ask an Expert",
  "chat.placeholder": "Ask a question about your crop…",
  "chat.send": "Send",
  "chat.error": "Could not reach the expert — please try again.",
  "chat.typing": "Expert is typing…",
  "chat.charCount": "{count}/500",
  "onboarding.skip": "Skip",
  "onboarding.next": "Next",
  "onboarding.getStarted": "Get Started",
  "onboarding.step1.title": "Welcome to AfriCrop AI",
  "onboarding.step1.body":
    "Identify crop diseases instantly by taking a photo of your plant.",
  "onboarding.step2.title": "How to Take a Good Photo",
  "onboarding.step2.body":
    "Hold your phone steady, ensure good lighting, and focus on the affected leaf or stem.",
  "onboarding.step3.title": "Understanding Your Results",
  "onboarding.step3.body":
    "The app shows a confidence score and detailed advice on treatment and prevention.",
  "offline.banner": "You are offline. Some features may be unavailable.",
};

const sw: Translations = {
  "app.title": "AfriCrop AI",
  "app.subtitle": "Kugundua Magonjwa ya Mazao",
  "nav.selectLanguage": "Chagua lugha",
  "upload.dropPrompt": "Weka picha ya zao lako hapa",
  "upload.browse": "Vinjari faili",
  "upload.camera": "Piga picha",
  "detect.button": "Gundua Ugonjwa",
  "detect.analysing": "Inachambua…",
  "detect.offline":
    "Uko nje ya mtandao. Tafadhali unganisha tena ili kuchambua picha.",
  "detect.error": "Kugundua kumeshindwa. Tafadhali jaribu tena.",
  "result.primaryDiagnosis": "Utambuzi wa Kwanza",
  "result.confidence": "Uhakika",
  "result.lowConfidence":
    "Matokeo yanaweza kuwa na shaka — fikiria kupiga picha iliyo wazi zaidi.",
  "result.symptoms": "Dalili",
  "result.treatment": "Matibabu",
  "result.prevention": "Kinga",
  "result.otherPossibilities": "Uwezekano mwingine",
  "result.share": "Shiriki Matokeo",
  "result.shareCopied": "Matokeo yamenakiliwa kwenye ubao wa kunakili!",
  "result.healthy": "Zao lako linaonekana kuwa zima.",
  "result.scanAnother": "Changanua Nyingine",
  "result.severity.high": "Juu",
  "result.severity.medium": "Kati",
  "result.severity.low": "Chini",
  "chat.title": "Uliza Mtaalamu",
  "chat.placeholder": "Uliza swali kuhusu zao lako…",
  "chat.send": "Tuma",
  "chat.error": "Haikuweza kufikia mtaalamu — tafadhali jaribu tena.",
  "chat.typing": "Mtaalamu anaandika…",
  "chat.charCount": "{count}/500",
  "onboarding.skip": "Ruka",
  "onboarding.next": "Inayofuata",
  "onboarding.getStarted": "Anza",
  "onboarding.step1.title": "Karibu AfriCrop AI",
  "onboarding.step1.body":
    "Tambua magonjwa ya mazao mara moja kwa kupiga picha ya mmea wako.",
  "onboarding.step2.title": "Jinsi ya Kupiga Picha Nzuri",
  "onboarding.step2.body":
    "Shika simu yako imara, hakikisha mwanga mzuri, na lenga kwenye jani au shina lililoathirika.",
  "onboarding.step3.title": "Kuelewa Matokeo Yako",
  "onboarding.step3.body":
    "Programu inaonyesha alama ya uhakika na ushauri wa kina kuhusu matibabu na kinga.",
  "offline.banner":
    "Uko nje ya mtandao. Baadhi ya vipengele vinaweza kutokupatikana.",
};

// French is optional — fall back to English for any missing keys at runtime.
// A partial dictionary is provided here; the t() function falls back to the key
// string itself for any key not present, so this is safe.
const fr: Translations = {
  "app.title": "AfriCrop AI",
  "app.subtitle": "Détection des Maladies des Cultures",
  "nav.selectLanguage": "Choisir la langue",
  "upload.dropPrompt": "Déposez votre photo de culture ici",
  "upload.browse": "Parcourir les fichiers",
  "upload.camera": "Prendre une photo",
  "detect.button": "Détecter la Maladie",
  "detect.analysing": "Analyse en cours…",
  "detect.offline":
    "Vous êtes hors ligne. Veuillez vous reconnecter pour analyser les images.",
  "detect.error": "Échec de la détection. Veuillez réessayer.",
  "result.primaryDiagnosis": "Diagnostic Principal",
  "result.confidence": "Confiance",
  "result.lowConfidence":
    "Le résultat peut être incertain — envisagez une photo plus nette.",
  "result.symptoms": "Symptômes",
  "result.treatment": "Traitement",
  "result.prevention": "Prévention",
  "result.otherPossibilities": "Autres possibilités",
  "result.share": "Partager le Résultat",
  "result.shareCopied": "Résultat copié dans le presse-papiers !",
  "result.healthy": "Votre culture semble saine.",
  "result.scanAnother": "Scanner une Autre",
  "result.severity.high": "Élevé",
  "result.severity.medium": "Moyen",
  "result.severity.low": "Faible",
  "chat.title": "Demander à un Expert",
  "chat.placeholder": "Posez une question sur votre culture…",
  "chat.send": "Envoyer",
  "chat.error": "Impossible de joindre l'expert — veuillez réessayer.",
  "chat.typing": "L'expert est en train d'écrire…",
  "chat.charCount": "{count}/500",
  "onboarding.skip": "Passer",
  "onboarding.next": "Suivant",
  "onboarding.getStarted": "Commencer",
  "onboarding.step1.title": "Bienvenue sur AfriCrop AI",
  "onboarding.step1.body":
    "Identifiez instantanément les maladies des cultures en prenant une photo de votre plante.",
  "onboarding.step2.title": "Comment Prendre une Bonne Photo",
  "onboarding.step2.body":
    "Tenez votre téléphone stable, assurez un bon éclairage et concentrez-vous sur la feuille ou la tige affectée.",
  "onboarding.step3.title": "Comprendre Vos Résultats",
  "onboarding.step3.body":
    "L'application affiche un score de confiance et des conseils détaillés sur le traitement et la prévention.",
  "offline.banner":
    "Vous êtes hors ligne. Certaines fonctionnalités peuvent être indisponibles.",
};

export const translations: TranslationMap = { en, sw, fr };

// ─── Supported locales ────────────────────────────────────────────────────────

const SUPPORTED_LOCALES: Locale[] = ["en", "sw", "fr"];
const LOCALE_STORAGE_KEY = "africrop-locale";
const DEFAULT_LOCALE: Locale = "en";

function isValidLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as string[]).includes(value);
}

// ─── Context ──────────────────────────────────────────────────────────────────

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Read persisted locale from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && isValidLocale(stored)) {
        setLocaleState(stored);
      }
    } catch {
      // localStorage unavailable (e.g. private browsing with storage blocked)
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch {
      // localStorage unavailable — update state anyway
    }
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const dict = translations[locale];
      // Falls back to the key string itself if the translation is missing
      return dict[key] ?? key;
    },
    [locale],
  );

  return React.createElement(
    I18nContext.Provider,
    { value: { locale, setLocale, t } },
    children,
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
