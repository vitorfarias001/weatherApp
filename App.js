import React from 'react';
import Home from './pages/Home/Index'
import themeHook from './context/ThemeContext';
import ThemeContext from './context/ThemeContext';

export default function App() {

  return (
    <ThemeContext.Provider value = {themeHook}>
        <Home/>
    </ThemeContext.Provider>
  );
}


