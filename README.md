# Martial Matchup

A mobile application connecting martial artists for sparring, training, and competitive matches.

![Martial Matchup Logo](assets/images/full-color-logo.svg)

## Overview

Martial Matchup is a platform that helps fighters find compatible training partners based on fighting style, weight class, experience level, and geographical proximity. The app provides a secure environment for martial artists to connect, communicate, and coordinate meetups.

## Features

- **Profile Creation**: Create a detailed fighter profile with your martial arts experience, fighting style, weight class, and location preferences.
- **Smart Matchmaking**: Find compatible fighters based on fighting style, weight, experience level, and proximity.
- **In-App Messaging**: Securely communicate with potential sparring partners through integrated chat.
- **Location Services**: Find fighters near you with configurable distance settings.
- **Challenge System**: Send and receive match challenges with specific details about the meetup.
- **Match Management**: Keep track of your upcoming and past matches.

## Tech Stack

### Frontend
- **React Native**: Cross-platform mobile framework
- **Expo**: Development environment for React Native
- **NativeWind**: Tailwind CSS for React Native styling
- **React Navigation**: Navigation library for React Native

### Backend
- **Supabase**: Backend-as-a-Service (PostgreSQL database with real-time capabilities)
- **Sendbird**: Chat and messaging platform integration

### Authentication
- **Supabase Auth**: Phone-based authentication

## Project Structure

```
martial-matchup/
├── assets/                # Images, fonts, and other static assets
├── src/
│   ├── api/               # API service layers
│   │   ├── auth/          # Authentication services
│   │   ├── my-profile/    # User profile services
│   │   ├── options/       # App options and settings
│   │   └── profiles/      # Profile discovery services
│   ├── app/               # App screens (Expo Router)
│   │   ├── (app)/         # Main app screens
│   │   │   ├── (tabs)/    # Tab navigation screens
│   │   │   ├── matches/   # Match related screens
│   │   │   ├── profile/   # Profile related screens
│   │   │   └── settings/  # Settings screens
│   │   └── (auth)/        # Authentication screens
│   ├── components/        # Reusable UI components
│   ├── constants/         # App constants
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Third-party service integrations
│   ├── store/             # State management
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
└── supabase/              # Supabase configuration
    └── migrations/        # Database migrations
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Supabase account
- Sendbird account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/martial-matchup.git
   cd martial-matchup
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your environment variables:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_SENDBIRD_APP_ID=your_sendbird_app_id
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

### Database Setup

The project uses Supabase for the database. Initialize the database with the migrations:

```bash
cd supabase
npx supabase db push
```

## Development

### Running on Devices

- **iOS Simulator**: Press `i` in the Expo CLI
- **Android Emulator**: Press `a` in the Expo CLI
- **Physical Device**: Scan the QR code with the Expo Go app

### Folder Structure Explanation

- **api/**: Contains API service functions for different data models
- **app/**: Contains all screens using the Expo Router file-based routing system
- **components/**: Reusable React components used throughout the app
- **hooks/**: Custom React hooks for shared logic
- **lib/**: Integrations with third-party services like Supabase and Sendbird
- **store/**: State management using React Context
- **types/**: TypeScript type definitions and interfaces

## Key Components

- **ProfileView** (`src/components/ProfileView.tsx`): Displays fighter profiles
- **ChallengeCard** (`src/components/ChallengeCard.tsx`): UI component for fight challenges
- **LocationView** (`src/components/LocationView.tsx`): Displays location information
- **PhotoGrid** (`src/components/photoGrid.tsx`): Grid layout for profile photos

## Database Schema

The app uses a PostgreSQL database with the following main tables:

- **profiles**: User profiles and fighter information
- **challenges**: Fight challenge requests
- **matches**: Confirmed matches between fighters
- **locations**: Geographic location data
- **fighting_styles**: Available fighting style options
- **fight_types**: Types of fights (sparring, competition, etc.)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Supabase](https://supabase.com/)
- [Sendbird](https://sendbird.com/)
- [NativeWind](https://www.nativewind.dev/)

