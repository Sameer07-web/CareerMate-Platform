const React = require('react');
const renderer = require('react-test-renderer');

// We need to register Babel to compile JSX and ES modules
require('@babel/register')({
  presets: ['babel-preset-expo'],
  ignore: [/node_modules\/(?!react-native|@react-native|expo|@expo)/]
});

// Mock react-native
jest.mock('react-native', () => require('react-native-web'));

const screens = [
  './src/screens/SplashScreen',
  './src/screens/Auth/LoginScreen',
  './src/screens/Auth/SignupScreen',
  './src/screens/Dashboard/DashboardScreen',
  './src/screens/Resume/ResumeScreen',
  './src/screens/ATS/ATSAnalysisScreen',
  './src/screens/InterviewPrep/InterviewPrepScreen',
  './src/screens/AICoach/AICoachScreen',
  './src/screens/Applications/ApplicationsScreen',
  './src/screens/Profile/ProfileScreen',
];

for (const screenPath of screens) {
  try {
    const Screen = require(screenPath).default;
    const tree = renderer.create(React.createElement(Screen, { navigation: { navigate: () => {}, replace: () => {} } }));
    console.log(`Success: ${screenPath}`);
  } catch (e) {
    console.error(`Crash in ${screenPath}:`, e.message);
  }
}
