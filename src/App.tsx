
import './App.css'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
import List from './pages/List'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='products'  element={<List/>}/>
        <Route path='products/add'  element={<Add/>}/>
        <Route path='products/:id/edit'  element={<Edit/>}/>
        <Route path='signin'  element={<Signin/>}/>
        <Route path='signup'  element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
