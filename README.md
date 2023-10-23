# React Native Assessment

## Setup

1. Follow the instructions on the "React Native CLI Quickstart" tab of
   the [React Native setup instructions](https://reactnative.dev/docs/environment-setup). These
   instructions fan out by host operating system (macOS, Windows,
   Linux) and target operating system (iOS, Android). Follow
   whichever is appropriate.

2. Install the Javascript dependencies

   ```
   yarn install
   ```

3. Install iOS dependencies (iOS only)
   ```
   cd ios
   pod install
   ```

## Running

### iOS Simulator

`yarn run ios`

This will start a simulator for you.

## Testing

- Unit testing:
  yarn test

- E2E testing
  detox build --configuration ios.sim.release
  detox test --configuration ios.sim.release
