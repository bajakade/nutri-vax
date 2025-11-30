# NutriVax-Measles

### Procedure for SQ-LNS distributions at health centers (PHCCs)
The aim of this app is to support health centers (PHCCs) in managing
and supervising the distribution of SQ-LNS as part of the NutriVax-Measles clinical trial conducted in
Nigeria, Yobe state.

## Get started

This app is built using expo and uses [Native Modules](https://reactnative.dev/docs/turbo-native-modules-introduction) hence additional steps are required to successfully start the app


1. Install build tool

   ```bash
   npm install -g eas-cli
   ```

2. Configure EAS (if you haven't yet)

   ```bash
   eas build:configure
   ```

3. Create and install a new Development Build

- This command bundles your native dependencies and creates a custom app (`.apk` or `.ipa`).

   ```bash
   eas build --profile development --platform android # for Android
   # OR
   eas build --profile development --platform ios   # for iOS
   ```

4. Install dependencies

   ```bash
   npm install
   ```

5. Start the app

   ```bash
   npx expo start
   ```
