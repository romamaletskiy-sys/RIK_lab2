# Lab 2 — Electron Framework: Survey Form

**Course:** Розробка інтерфейсів користувача  
**University:** Київський національний університет імені Тараса Шевченка  
**Student:** Малецький Роман Миколайович

---

## About

Desktop application built with **Electron** that implements a user survey form.  
The app asks the user 3 questions, validates input, and appends the answers to a local text file.

**Variant 1 — "Survey Form"**

---

## Features

- 3-question survey: **Name**, **Age** (1–120), **Favorite Programming Language**
- Language field with autocomplete suggestions via `<datalist>` (20 languages), free text input also supported
- Answers appended to `survey_answers.txt` with a timestamp
- Success notification after saving; form clears automatically
- Strict Electron security: `contextIsolation: true`, `nodeIntegration: false`, IPC via `preload.js`

---

## Project Structure

```
Lab2_Electron/
├── main.js          # Main process — window creation, IPC handler, fs write
├── preload.js       # contextBridge — exposes surveyAPI to renderer
├── index.html       # UI — survey form with datalist autocomplete
├── styles.css       # Styles
├── renderer.js      # Frontend logic — form submit, IPC invoke
├── package.json     # Project config, start script
└── survey_answers.txt  # Generated file with saved answers
```

---

## Security Architecture

| Setting | Value |
|---|---|
| `nodeIntegration` | `false` |
| `contextIsolation` | `true` |
| IPC method | `ipcRenderer.invoke` / `ipcMain.handle` |
| Context bridge | `contextBridge.exposeInMainWorld` |
| CSP | `default-src 'self'` |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)

### Install & Run

```bash
npm install
npm start
```

---

## How It Works

1. User fills in Name, Age, and Favorite Language
2. On **Submit**, `renderer.js` calls `window.surveyAPI.submitSurvey(data)` via the context bridge
3. `preload.js` forwards the call through `ipcRenderer.invoke('submit-survey', data)`
4. `main.js` handles the IPC event, formats the entry, and appends it to `survey_answers.txt` using Node's `fs` module
5. A success message is shown in the UI and the form is cleared

### Example output in `survey_answers.txt`

```
--- Survey Entry (17.04.2026, 19:45:30) ---
Name: Roman
Age: 21
Favorite Language: JavaScript
```
