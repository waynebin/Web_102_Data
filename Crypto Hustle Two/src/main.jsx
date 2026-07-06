import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DetailView from './routes/DetailView.jsx'
import NotFound from './routes/NotFound.jsx'
import Layout from './routes/Layout.jsx'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
   <Routes>
      <Route path='/' element={<Layout />} />
      <Route index element={<App />} />
      <Route path='/CoinDetails/:symbol' element={<DetailView />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)
