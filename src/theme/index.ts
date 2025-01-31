import {createContext} from 'react';

export const DARK_MODE_THEME = {
  primary: '#800020',
  accent: '#dc143c',
  backgroundMain: '#222222',
  backgroundAccent: '#191919',
  light: 'rgb(164, 167, 171)',
  border: '#252525',
};

export const themeContext = createContext(DARK_MODE_THEME);

export const {Provider} = themeContext;
