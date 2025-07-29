import React, { useState } from 'react'
import AppContext from './AppContext'

function AppProvider({children}) {
    const [Prediction, setPrediction] = useState({});
  const [AreaItems, setAreaItems] = useState({});
  return (
   <AppContext.Provider value={{ Prediction, setPrediction, AreaItems, setAreaItems }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider