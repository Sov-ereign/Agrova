import axios from 'axios';
import './App.css'
import PostForm from './components/PostForm';
import Navbar from './components/header/Navbar';
import Footer from './components/footer/Footer';
import { ThemeContext } from '../contexts/ThemeContext';
import { useEffect, useState } from 'react';

import React from 'react';
import AppProvider from '../contexts/AppProvider';
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';
import CenteredCard from './components/ResutPage';
import { Outlet } from 'react-router-dom';

function App() {

  const [themeMode, setthemeMode] = useState('dark');
  const lightTheme = () => {
    setthemeMode('light')
  }

  const darkTheme = () => {
    setthemeMode('dark')
  }

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light')
    document.querySelector('html').classList.add(themeMode);
    // console.log(themeMode);

  }, [themeMode])


  const { setAreaItems}=useContext(AppContext)

  useEffect(() => {
      try {
      axios.get("/api/get_area_items")
      .then((item)=> setAreaItems(item.data))
    } catch (error) {
      console.log(error);

    }
  }, [setAreaItems])
  



  return (
    <ThemeContext.Provider value={{ themeMode, darkTheme, lightTheme }}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flexGrow: 1, paddingTop: '60px' }}> {/* Creates space for navbar */}
         <Outlet/>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
