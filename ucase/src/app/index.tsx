import React from 'react';
import { MouseProvider } from '../components/mouse-provider';
import './index.scss';
import { Root } from './routes';

export function App() {
  return (
    <MouseProvider>
      <Root />
    </MouseProvider>
  );
}
