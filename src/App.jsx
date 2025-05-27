import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Inventory from './Pages/Inventory'
import Stands from './Pages/Stands'
import Stocks from './Pages/Stocks'
import AddProvider from './Pages/AddProvider'
import Profile from './Pages/Profile'
import Buys from './Pages/Buys'
import EditProvider from './Pages/EditProvider'
import EditSpace from './Pages/EditSpace'
import EditService from './Pages/EditService'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="*" element={<Login/>}/>
        <Route path="podocenter/auth" element={<Login/>}/>
        <Route path="podocenter/home" element={<Home/>}/>
        <Route path="podocenter/inventory" element={<Inventory/>}/>
        <Route path="podocenter/stands" element={<Stands/>}/>
        <Route path="podocenter/stocks" element={<Stocks/>}/>
        <Route path="podocenter/provider/add" element={<AddProvider/>}/>
        <Route path="podocenter/profile/my" element={<Profile/>}/>
        <Route path="podocenter/buys" element={<Buys/>}/>
        <Route path="podocenter/provider/edit/:identifier" element={<EditProvider/>}/>
        <Route path="podocenter/space/edit/:identifier" element={<EditSpace/>}/>
        <Route path="podocenter/service/edit/:identifier" element={<EditService/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
