import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppProvider from '../contexts/AppProvider.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import PostForm from './components/PostForm.jsx'
import CenteredCard from './components/ResutPage.jsx'
import Home from './components/Home.jsx'
import AboutUs from './components/AboutUs.jsx'
import AccuracyGraph from './components/AccuracyGraph.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import TermsConditions from './components/TermsConditions.jsx'

const router= createBrowserRouter(
  createRoutesFromElements(
        <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/predict' element={<PostForm/>}/>
      <Route path='/result' element={<CenteredCard/>}/>
      <Route path='/graph' element={<AccuracyGraph/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/privacy' element={<PrivacyPolicy/>}/>
      <Route path='/terms' element={<TermsConditions/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </StrictMode>,
)
