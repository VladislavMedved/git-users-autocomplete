# 🚀 GitHub Users Autocomplete

**Live demo:** [git-users-autocomplete.vercel.app](https://git-users-autocomplete-prf8di0uf-vladislavmedveds-projects.vercel.app)

## What is this?

A minimal, fast, and responsive autocomplete widget for searching GitHub users. Type a name, get instant suggestions, pick a user — see their profile card. Clean UI, keyboard-friendly, and mobile-ready.

## ✨ Features

- 🔍 Instant GitHub user search (uses GitHub API)
- ⚡ Smart caching (no duplicate requests)
- 🎨 Smooth fade-in animations & loading spinner
- 🧑‍💻 Keyboard navigation & ARIA accessibility
- 📱 Fully responsive, looks great on any device

## 📁 Project Structure

```
src/
  main.js           # App entry
  state.js          # App state
  constants.js      # All strings, keys, templates
  events/           # Event handlers (input, select, keydown)
  logic/            # Core logic (fetch, debounce)
  ui/               # UI rendering & components
    components/     # Small UI units (list item, card, spinner)
public/
  style.css         # Main styles
index.html          # App shell
```

## 🛠️ Getting Started

```bash
npm install      # Install dependencies
npm run dev      # Start local dev server
```

## 🧪 Testing

```bash
npm test         # Run all tests
```

---

**That’s it!**

- Clean code, no bloat, easy to read and extend.
- [Live demo here](https://git-users-autocomplete-prf8di0uf-vladislavmedveds-projects.vercel.app)
