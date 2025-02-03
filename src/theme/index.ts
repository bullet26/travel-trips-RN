import {createContext, useContext} from 'react';

export const DARK_MODE_THEME = {
  primary: '#800020',
  accent: '#dc143c',
  backgroundMain: '#222222',
  backgroundAccent: '#191919',
  light: 'rgb(164, 167, 171)',
  border: '#252525',
};

const themeContext = createContext(DARK_MODE_THEME);
export const colors = useContext(themeContext);

export const {Provider} = themeContext;
