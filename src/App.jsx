import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Inventory from './Pages/Inventory'
import Stands from './Pages/Stands'
import Stocks from './Pages/Stocks'
import AddProvider from './Pages/AddProvider'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="podocenter/auth" element={<Login/>}/>
        <Route path="podocenter/home" element={<Home/>}/>
        <Route path="podocenter/inventory" element={<Inventory/>}/>
        <Route path="podocenter/stands" element={<Stands/>}/>
        <Route path="podocenter/stocks" element={<Stocks/>}/>
        <Route path="podocenter/provider/add" element={<AddProvider/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
