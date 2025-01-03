# Flashcards App

A React Native application for learning Russian vocabulary using flashcards with deck management and practice modes.

## Features

- **Deck Management**
  - Create and organize flashcards into decks
  - Filter cards by deck
  - View all cards across decks

- **Flashcard Creation**
  - Add Russian-English word pairs
  - Assign cards to specific decks
  - Default deck categories (Basics, Advanced)

- **Practice Modes**
  - Timed practice sessions
  - Self-paced practice
  - Score tracking
  - Immediate feedback
  - Card flipping animations

- **Cross-Platform Storage**
  - SQLite for Android
  - AsyncStorage for iOS/Web
  - Persistent card data

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

## Installation
- **Android**
  - You can download android build from [github releases](https://github.com/Huz2e/flashcards/releases)
  

- **Other methode**
1. Clone the repository:

```sh
git clone <repository-url>
cd flashcards
```

2. Installl dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm start
```

## Project Structure

```
/
├── app/                    # Main application screens and routing
│   ├── screens/           # Screen components
│   └── index.tsx          # Root component
├── assets/                # Static assets and styles
│   ├── images/           # App icons and images
│   └── styles.tsx        # Global styles
├── components/           # Reusable components
├── hooks/               # Custom React hooks
├── utils/              # Utility functions
└── package.json        # Project dependencies
```

## License

This project is licensed under the GPLv3.0 License - see the LICENSE for details.
