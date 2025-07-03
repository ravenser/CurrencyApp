# Overview

CurrencyApp is a mobile app for viewing and favoriting currency exchange rates, with offline access to previously viewed and favorite rates.

## Features

- View real-time currency exchange rates
- Add/remove rates to/from favorites
- Search currencies you need
- Offline access to cached and favorite rates

# Installation

```bash
git clone https://github.com/ravenser/CurrencyApp.git
cd PathToApp/CurrencyApp
echo EXPO_PUBLIC_SWOP_API_KEY=your_api_key_here > .env
npm install
npx expo start
```

## Running the App

- Use Expo Go on your device, or run on an emulator, or use apk.

# App architecture and design choices.

I've created this app trying to follow principles of modular architecture, and tried my best to make the code clean, with clear separation of concerns. It's a basic one-page list app with a header.

- I've chosen Expo for this project because it's the best choice for that kind of app, as it has a lot of required tools and the app doesn't require precise control over native modules, or other need for a vanilla React Native app.
- For state management, I've chosen Zustand as it is a very light and easy-to-use state management tool, and I've heard a lot of positive things about it from other developers.
  As this is a single-page app, there is no need for navigation.

### Design choices

For design, I've tried to use UIzard and managed to transform some of its suggestions into a working design.
As for design choices, I've chosen to create a simple and clean design.

# Description of app structure and major components.

- app/components - contains React components that are used in Screens.
- app/hooks - contains hooks that are responsible for app logic, like filtering data, fetching data, and connection status handling.
- app/api - handles API communication, basically only used for fetching from SWOP
- store - manages the app store and actions within it
- utils - utility functions for adata transformation, debouncing, etc
- assets - images, SVGs

### Major components

- HomePage - main app screen that contains all ui
- Header - Header of app with some useful info like net status and base currency, also contains search bar when needed

# Offline mod

This app uses Zustand store with persisting in ASyncStorage, connection status checked via community/net-info.
The flow here is simple: check connection status -> if offline - use cached data, else fetch data from api, refetch when the connection is restored(here is some restriction due to api quota limitations)

# Additional features and libraries

### Filter feature or tests

- It allows users to filter the country list by name or code
- I've added some tests for the home page and store

### Libraries

- Zustang - state management
- community/net-info - connection status handling
- async-storage - for persisting data
- flash-list - for a more efficient list
- country-flag - for country flags
- react-native-svg - for svgs
