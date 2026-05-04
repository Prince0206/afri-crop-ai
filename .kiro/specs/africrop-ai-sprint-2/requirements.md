# Requirements Document

## Introduction

AfriCrop AI Sprint 2 extends the existing cassava-only disease detection MVP into a broader, more accessible, and more intelligent agricultural assistant for smallholder farmers across Sub-Saharan Africa. This sprint delivers four major capability areas:

1. **Expanded Advisory Engine** — richer disease data covering more crops and diseases, with structured symptom, prevention, and treatment information.
2. **Multi-language Support** — full Swahili localisation (required) and French localisation (optional), so farmers can use the app in their primary language.
3. **Improved UI/UX** — onboarding flow for first-time users, richer visual feedback during detection, and a more intuitive overall experience.
4. **"Ask an Expert" AI Chatbot** — a conversational interface backed by an LLM that lets farmers ask agronomic questions in natural language.

The system is a Next.js 15 PWA targeting low-end Android phones with intermittent connectivity. All new features must remain offline-capable where technically feasible.

---

## Glossary

- **Advisory_Engine**: The module (`lib/advisory.ts`) that stores and retrieves structured disease advisory data keyed by crop-disease label.
- **Classifier**: The module (`lib/classify.ts`) that calls the HuggingFace image classification API and maps raw model outputs to human-readable labels.
- **Detection_Result**: The structured object returned after an image is classified, containing label, confidence score, and advisory data.
- **Advisory**: A structured record containing a disease title, summary, symptom list, action list, and prevention list for a specific crop-disease combination.
- **Locale**: A language setting selected by the user, represented as a BCP-47 tag (e.g., `en`, `sw`, `fr`).
- **I18n_Provider**: The client-side context that supplies translated strings to all UI components based on the active Locale.
- **Onboarding_Flow**: A first-run walkthrough shown to new users that explains the app's core features.
- **Expert_Chat**: The conversational AI feature that allows farmers to ask agronomic questions and receive answers from an LLM-backed agent.
- **Chat_Session**: A sequence of user messages and assistant responses within a single Expert_Chat conversation.
- **Offline_Cache**: The IndexedDB store (managed via `idb-keyval`) used to persist advisory data and chat history for offline access.
- **Confidence_Score**: A float between 0 and 1 representing the model's certainty for a given prediction.
- **PWA**: Progressive Web App — the app is installable and partially functional without network access.

---

## Requirements

### Requirement 1: Expanded Crop and Disease Coverage

**User Story:** As a smallholder farmer, I want the app to recognise diseases on crops beyond cassava, so that I can get help for all the crops I grow.

#### Acceptance Criteria

1. THE Advisory_Engine SHALL contain advisory records for at least the following crop-disease combinations: Cassava Bacterial Blight, Cassava Brown Streak Disease, Cassava Green Mottle, Cassava Mosaic Disease, Maize Leaf Blight, Maize Gray Leaf Spot, Maize Rust, Maize Stalk Rot, Bean Angular Leaf Spot, Bean Rust, Tomato Early Blight, Tomato Late Blight, and a Healthy baseline for each supported crop.
2. WHEN the Advisory_Engine is queried with a crop-disease label, THE Advisory_Engine SHALL return an Advisory containing a title, a one-to-three sentence summary, a symptoms list of at least two items, an actions list of at least two items, and a prevention list of at least two items.
3. IF the Advisory_Engine is queried with an unrecognised label, THEN THE Advisory_Engine SHALL return a default Advisory with a generic "consult a local agronomist" message rather than null.
4. THE Advisory_Engine SHALL expose a typed `Advisory` interface that includes the fields: `title` (string), `summary` (string), `symptoms` (string[]), `actions` (string[]), `prevention` (string[]).
5. WHEN the app initialises, THE Offline_Cache SHALL be populated with all Advisory_Engine records so that advisory data is available without network access.
6. FOR ALL valid Advisory records, serialising then deserialising the record SHALL produce an object equal to the original (round-trip property).

---

### Requirement 2: Structured Symptom and Treatment Data

**User Story:** As a farmer, I want to see clear symptoms, treatment steps, and prevention tips for each detected disease, so that I know exactly what to look for and what to do.

#### Acceptance Criteria

1. WHEN a Detection_Result is displayed, THE Result_Card SHALL render a "Symptoms" section listing all symptom strings from the Advisory.
2. WHEN a Detection_Result is displayed, THE Result_Card SHALL render a "Treatment" section listing all action strings from the Advisory.
3. WHEN a Detection_Result is displayed, THE Result_Card SHALL render a "Prevention" section listing all prevention strings from the Advisory.
4. WHEN the detected label is "Healthy" for any crop, THE Result_Card SHALL display a positive confirmation message and SHALL NOT render the Symptoms or Treatment sections.
5. THE Result_Card SHALL display a severity badge — "High", "Medium", or "Low" — derived from the disease label, with distinct colour coding: red for High, amber for Medium, and emerald for Low/Healthy.

---

### Requirement 3: Swahili Localisation (Required)

**User Story:** As a Swahili-speaking farmer, I want to use the entire app in Swahili, so that I can understand all instructions and results without needing English.

#### Acceptance Criteria

1. THE I18n_Provider SHALL support the `sw` (Swahili) locale in addition to the existing `en` (English) locale.
2. WHEN the active Locale is `sw`, THE I18n_Provider SHALL supply Swahili translations for all user-visible strings, including navigation labels, button text, error messages, onboarding copy, and advisory content.
3. THE Advisory_Engine SHALL store Swahili translations for the `title`, `summary`, `symptoms`, `actions`, and `prevention` fields of every Advisory record.
4. WHEN the active Locale is `sw`, THE Result_Card SHALL display all Advisory fields in Swahili.
5. THE I18n_Provider SHALL persist the user's Locale selection to localStorage so that the selected language is restored on subsequent visits.
6. WHEN the active Locale changes, THE I18n_Provider SHALL update all rendered strings without requiring a full page reload.
7. FOR ALL translation keys defined in the `en` locale, a corresponding key SHALL exist in the `sw` locale (completeness invariant).

---

### Requirement 4: French Localisation (Optional Feature)

**User Story:** As a French-speaking farmer in West or Central Africa, I want to use the app in French, so that I can understand the content in my preferred language.

#### Acceptance Criteria

1. WHERE French localisation is enabled, THE I18n_Provider SHALL support the `fr` (French) locale.
2. WHERE French localisation is enabled, THE Advisory_Engine SHALL store French translations for the `title`, `summary`, `symptoms`, `actions`, and `prevention` fields of every Advisory record.
3. WHERE French localisation is enabled, WHEN the active Locale is `fr`, THE I18n_Provider SHALL supply French translations for all user-visible strings.
4. WHERE French localisation is enabled, FOR ALL translation keys defined in the `en` locale, a corresponding key SHALL exist in the `fr` locale (completeness invariant).

---

### Requirement 5: Language Selection UI

**User Story:** As a farmer, I want to easily switch the app language from the main interface, so that I can choose the language I am most comfortable with.

#### Acceptance Criteria

1. THE Header SHALL display a language selector control that lists all supported locales by their native name (e.g., "English", "Kiswahili", "Français").
2. WHEN the user selects a locale from the language selector, THE I18n_Provider SHALL update the active Locale within 300 ms.
3. WHEN the active Locale is updated, THE Header SHALL visually indicate the currently selected locale.
4. THE language selector SHALL be accessible via keyboard navigation and SHALL have an ARIA label of "Select language".

---

### Requirement 6: First-Run Onboarding Flow

**User Story:** As a first-time user, I want a brief walkthrough of the app's features, so that I understand how to take a photo and interpret the results.

#### Acceptance Criteria

1. WHEN a user opens the app for the first time (no `africrop-onboarding-complete` key in localStorage), THE Onboarding_Flow SHALL be displayed before the main upload interface.
2. THE Onboarding_Flow SHALL consist of exactly three steps: (1) a welcome screen explaining the app's purpose, (2) a photo-taking guide with a sample image, and (3) a results-interpretation guide showing what the confidence score and advisory sections mean.
3. WHEN the user completes the final Onboarding_Flow step, THE App SHALL set `africrop-onboarding-complete` to `"true"` in localStorage and navigate to the main upload interface.
4. WHEN the user dismisses the Onboarding_Flow early via a "Skip" button, THE App SHALL set `africrop-onboarding-complete` to `"true"` in localStorage and navigate to the main upload interface.
5. WHEN `africrop-onboarding-complete` is `"true"` in localStorage, THE App SHALL NOT display the Onboarding_Flow on subsequent visits.
6. THE Onboarding_Flow SHALL render all copy in the active Locale.

---

### Requirement 7: Visual Feedback During Detection

**User Story:** As a farmer, I want clear visual feedback while my photo is being analysed, so that I know the app is working and roughly how long it will take.

#### Acceptance Criteria

1. WHEN image analysis is in progress, THE Upload_Zone SHALL display an animated progress indicator overlaid on the image preview.
2. WHEN image analysis is in progress, THE Detect_Button SHALL be disabled and SHALL display the label "Analysing…" in the active Locale.
3. WHEN image analysis completes successfully, THE App SHALL display the Result_Card with a smooth fade-in animation of duration 300 ms or less.
4. WHEN image analysis fails, THE App SHALL display an inline error message in the active Locale within the main content area, and THE Detect_Button SHALL be re-enabled.
5. WHEN the device is offline and the user attempts detection, THE App SHALL display an offline warning message in the active Locale before the user submits the image.

---

### Requirement 8: Improved Result Presentation

**User Story:** As a farmer, I want the detection result to be visually clear and easy to scan, so that I can quickly understand the diagnosis and next steps.

#### Acceptance Criteria

1. THE Result_Card SHALL display the top prediction's disease name in the active Locale as the primary heading.
2. THE Result_Card SHALL display the Confidence_Score as both a percentage label and a filled progress bar.
3. WHEN the Confidence_Score is below 0.60, THE Result_Card SHALL display a low-confidence warning: "Result may be uncertain — consider a clearer photo."
4. THE Result_Card SHALL display alternative predictions (second and third ranked) in a collapsible "Other possibilities" section.
5. THE Result_Card SHALL provide a "Share Result" button that copies a plain-text summary of the diagnosis and advisory to the device clipboard.
6. WHEN the "Share Result" button is activated, THE App SHALL display a confirmation toast message for 2 seconds in the active Locale.

---

### Requirement 9: Expert Chat Feature

**User Story:** As a farmer, I want to ask an AI agronomist questions in my own language, so that I can get personalised advice beyond what the detection result shows.

#### Acceptance Criteria

1. THE App SHALL provide an "Ask an Expert" entry point — a button or tab — visible on the main screen after a Detection_Result is displayed and also accessible from the main navigation.
2. WHEN the user opens the Expert_Chat, THE App SHALL display a Chat_Session interface with a message input field and a scrollable message history area.
3. WHEN the user submits a message in the Expert_Chat, THE Expert_Chat SHALL send the message along with the most recent Detection_Result (if available) as context to the LLM API within 500 ms of submission.
4. WHEN the LLM API returns a response, THE Expert_Chat SHALL display the response in the active Locale within the Chat_Session.
5. IF the LLM API call fails or times out after 15 seconds, THEN THE Expert_Chat SHALL display an error message: "Could not reach the expert — please try again." in the active Locale.
6. THE Expert_Chat SHALL support messages in English and Swahili, passing the active Locale to the LLM system prompt so that responses are returned in the same language.
7. THE Chat_Session SHALL persist to localStorage so that the conversation history is available after a page refresh, up to a maximum of 50 messages.
8. THE Expert_Chat message input SHALL accept a maximum of 500 characters and SHALL display a live character count.
9. WHEN the Expert_Chat is waiting for an LLM response, THE message input SHALL be disabled and a typing indicator SHALL be displayed.

---

### Requirement 10: Expert Chat API Endpoint

**User Story:** As a developer, I want a secure server-side API route for the Expert Chat, so that the LLM API key is never exposed to the client.

#### Acceptance Criteria

1. THE App SHALL expose a `POST /api/chat` route that accepts a JSON body containing `messages` (array of `{role, content}` objects) and an optional `context` (Detection_Result object).
2. WHEN `POST /api/chat` receives a valid request, THE Chat_API SHALL forward the messages and context to the configured LLM provider and return the assistant's reply as a JSON object `{ reply: string }`.
3. IF the request body is missing the `messages` field or `messages` is not an array, THEN THE Chat_API SHALL return HTTP 400 with `{ error: "Invalid request" }`.
4. IF the LLM provider returns an error, THEN THE Chat_API SHALL return HTTP 502 with `{ error: "LLM provider error" }`.
5. THE Chat_API SHALL limit the `messages` array to the 20 most recent messages before forwarding to the LLM provider to control token usage.
6. THE Chat_API SHALL reject requests where the total character count of all message content exceeds 10,000 characters, returning HTTP 413 with `{ error: "Request too large" }`.

---

### Requirement 11: Accessibility and Performance Baseline

**User Story:** As a farmer using a low-end Android phone, I want the app to load quickly and be usable with assistive technologies, so that the app works on my device.

#### Acceptance Criteria

1. THE App SHALL achieve a Lighthouse Performance score of 70 or above on a simulated mid-range mobile device.
2. THE App SHALL achieve a Lighthouse Accessibility score of 90 or above.
3. ALL interactive controls — buttons, inputs, language selector, chat input — SHALL have accessible names via `aria-label` or associated `<label>` elements.
4. THE App SHALL be fully operable via keyboard navigation, with visible focus indicators on all interactive elements.
5. WHEN the device is offline, THE App SHALL serve the last-cached advisory data and display a persistent offline indicator banner in the active Locale.
6. THE App's initial JavaScript bundle SHALL NOT exceed 250 kB gzipped for the main page route.
