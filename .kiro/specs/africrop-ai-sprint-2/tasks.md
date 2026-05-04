# Tasks — AfriCrop AI Sprint 2

## Task List

- [x] 1. Expand Advisory Engine data and interface
  - [x] 1.1 Update `Advisory` interface in `lib/advisory.ts` to add `symptoms`, `symptomsSw`, `titleSw`, `summarySw`, `actionsSw`, `preventionSw`, and `severity` fields
  - [x] 1.2 Add advisory records for all required crop-disease combinations: Cassava Bacterial Blight, Cassava Brown Streak Disease, Cassava Green Mottle, Cassava Mosaic Disease, Maize Leaf Blight, Maize Gray Leaf Spot, Maize Rust, Maize Stalk Rot, Bean Angular Leaf Spot, Bean Rust, Tomato Early Blight, Tomato Late Blight, and Healthy baselines for each crop — each with English and Swahili fields
  - [x] 1.3 Add `DEFAULT_ADVISORY` constant and update `getAdvisory` to return it (never null) for unrecognised labels
  - [x] 1.4 Update `getAdvisory` signature to accept an optional `locale` parameter and return localised fields when `locale === "sw"`
  - [x] 1.5 Extend `lib/labels.ts` to include Maize, Bean, and Tomato label maps alongside the existing cassava labels
  - [x] 1.6 Write unit tests for advisory data completeness, default fallback, and locale-aware retrieval
  - [x] 1.7 Write property-based tests for Properties 1, 2, 3, and 5 (advisory structural completeness, serialisation round-trip, unknown label fallback, Swahili field completeness) using fast-check

- [x] 2. Implement I18n Provider and translation dictionaries
  - [x] 2.1 Create `lib/i18n.ts` with `Locale` type, `TranslationKey` union type, `Translations` and `TranslationMap` types, and `I18nContextValue` interface as specified in the design
  - [x] 2.2 Add complete English (`en`) translation dictionary covering all `TranslationKey` values
  - [x] 2.3 Add complete Swahili (`sw`) translation dictionary covering all `TranslationKey` values
  - [x] 2.4 Implement `I18nProvider` React context component that reads locale from `localStorage["africrop-locale"]` on mount, exposes `setLocale` that writes back to localStorage, and provides `t(key)` that falls back to the key string if a translation is missing
  - [x] 2.5 Export `useI18n()` hook from `lib/i18n.ts`
  - [x] 2.6 Wrap `app/layout.tsx` children in `I18nProvider`
  - [x] 2.7 Write unit tests for `t()` fallback behaviour, locale persistence, and locale restoration
  - [x] 2.8 Write property-based tests for Properties 4 and 6 (translation key completeness, locale persistence round-trip) using fast-check

- [x] 3. Add language selector to Header
  - [x] 3.1 Update `components/ui/header.tsx` to consume `useI18n()` and render a `<select>` (or button group) listing supported locales by native name: "English", "Kiswahili", and optionally "Français"
  - [x] 3.2 Wire the selector's `onChange` to `setLocale` so the active locale updates within 300 ms
  - [x] 3.3 Add `aria-label="Select language"` to the selector and ensure it is keyboard-navigable
  - [x] 3.4 Visually indicate the currently selected locale (e.g., bold text or a checkmark)
  - [x] 3.5 Write unit tests verifying the selector renders all supported locales and calls `setLocale` on change

- [x] 4. Implement first-run Onboarding Flow
  - [x] 4.1 Create `components/ui/onboarding-flow.tsx` with a full-screen overlay and three slides: (1) welcome/purpose, (2) photo-taking guide, (3) results-interpretation guide
  - [x] 4.2 Implement step navigation (Next / Get Started buttons) and a Skip button visible on all steps
  - [x] 4.3 On completion or skip, set `localStorage["africrop-onboarding-complete"] = "true"` and call `onComplete()`
  - [x] 4.4 Update `app/page.tsx` to check `localStorage["africrop-onboarding-complete"]` on mount and conditionally render `OnboardingFlow` before the main UI
  - [x] 4.5 Ensure all onboarding copy is sourced from `useI18n()` so it renders in the active locale
  - [x] 4.6 Write unit tests for: first-visit shows onboarding, skip sets flag, complete sets flag, returning visit skips onboarding
  - [x] 4.7 Write property-based test for Property 14 (onboarding locale rendering) using fast-check

- [x] 5. Improve ResultCard with severity badge, symptoms, share, and collapsible alternatives
  - [x] 5.1 Update `components/ui/result-card.tsx` to render a "Symptoms" section listing all `advisory.symptoms` strings (hidden when label is Healthy)
  - [x] 5.2 Rename the existing "Actions" section heading to "Treatment" to match requirements
  - [x] 5.3 Add a severity badge component displaying "High" / "Medium" / "Low" derived from `advisory.severity`, with red / amber / emerald colour coding
  - [x] 5.4 Add a low-confidence warning banner (shown when `confidence < 0.60`) with the text from `t("result.lowConfidence")`
  - [x] 5.5 Wrap the "Other possibilities" section in a `<details>` / `<summary>` collapsible element
  - [x] 5.6 Add a "Share Result" button that calls `navigator.clipboard.writeText()` with a plain-text summary of the diagnosis and advisory, then shows a 2-second toast using `t("result.shareCopied")`
  - [x] 5.7 Update all hardcoded strings in `ResultCard` to use `t()` from `useI18n()`
  - [x] 5.8 Write unit tests for: Healthy label hides Symptoms/Treatment, severity badge colour mapping, low-confidence warning threshold, share button clipboard call
  - [x] 5.9 Write property-based tests for Properties 7, 8, and 15 (confidence warning threshold, confidence bar width, severity badge validity) using fast-check

- [ ] 6. Implement Expert Chat UI (`ChatPanel`)
  - [~] 6.1 Create `components/ui/chat-panel.tsx` with a scrollable message history area and a message input field
  - [~] 6.2 Implement character counter that updates live and prevents submission when input exceeds 500 characters; add `aria-live="polite"` to the counter
  - [~] 6.3 Implement chat history persistence: load from `localStorage["africrop-chat-history"]` on mount, save after each message pair, cap at 50 messages
  - [~] 6.4 Implement `POST /api/chat` call on message submission: include the last 20 messages and optional `detectionResult` context; disable input and show typing indicator while awaiting response
  - [~] 6.5 Handle API errors and 15-second timeout via `AbortController`; display `t("chat.error")` inline on failure
  - [~] 6.6 Add an "Ask an Expert" button to `app/page.tsx` that is visible after a detection result is shown and also in the main navigation area; toggles `ChatPanel` visibility
  - [~] 6.7 Ensure all chat UI strings use `t()` from `useI18n()`
  - [~] 6.8 Write unit tests for: character limit enforcement, history cap at 50, typing indicator shown while loading, error message on API failure
  - [~] 6.9 Write property-based tests for Properties 9 and 10 (chat message cap, character limit) using fast-check

- [ ] 7. Implement `POST /api/chat` server route
  - [~] 7.1 Create `app/api/chat/route.ts` with a `POST` handler that validates the request body (messages is a non-empty array)
  - [~] 7.2 Implement total character count check: reject with HTTP 413 `{ error: "Request too large" }` if total chars > 10,000
  - [~] 7.3 Trim the messages array to the last 20 items before forwarding to the LLM
  - [~] 7.4 Build a system prompt that includes the active locale and a structured summary of the detection context (if provided)
  - [~] 7.5 Call the HuggingFace Inference API (text generation) using `process.env.HF_TOKEN`; return `{ reply: string }` on success
  - [~] 7.6 Return HTTP 502 `{ error: "LLM provider error" }` on provider failure or missing `HF_TOKEN`
  - [~] 7.7 Write unit tests for: 400 on missing messages, 400 on non-array messages, 413 on oversized request, 502 on LLM failure, correct truncation to 20 messages
  - [~] 7.8 Write property-based tests for Properties 11, 12, and 13 (message truncation, character limit enforcement, invalid request rejection) using fast-check

- [ ] 8. Add fast-check to devDependencies and configure test infrastructure
  - [~] 8.1 Add `fast-check` to `devDependencies` in `package.json` and run `npm install`
  - [~] 8.2 Verify `vitest.config.ts` includes the `tests/unit/` glob and that `fast-check` imports resolve correctly
  - [~] 8.3 Run the full unit test suite (`npm run test:unit`) and confirm all tests pass

- [ ] 9. Accessibility and offline hardening
  - [~] 9.1 Audit all new interactive elements (language selector, onboarding buttons, chat input, share button) and ensure each has an accessible name via `aria-label` or `<label>`
  - [~] 9.2 Add visible focus indicators (`:focus-visible` ring) to all new interactive elements
  - [~] 9.3 Add an offline indicator banner in `app/page.tsx` that appears when `navigator.onLine === false`, using `t("offline.banner")`
  - [~] 9.4 Verify `cacheAdvisoryData()` is called on app init and that advisory data is accessible via `getAdvisory` when IndexedDB is populated
  - [~] 9.5 Add `type="button"` to all `<button>` elements that are not form submit buttons (fixes existing lint hints)
