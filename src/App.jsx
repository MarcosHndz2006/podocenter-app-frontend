import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Inventory from './Pages/Inventory'
import Stands from './Pages/Stands'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="podocenter/auth" element={<Login/>}/>
        <Route path="podocenter/home" element={<Home/>}/>
        <Route path="podocenter/inventory" element={<Inventory/>}/>
        <Route path="podocenter/stands" element={<Stands/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
