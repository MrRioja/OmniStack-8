import React from 'react';
import {LogBox} from 'react-native';
import Routes from './routes';

LogBox.ignoreWarnings(['Unrecognized WebSocket']);

export default function App() {
  return <Routes />;
}
