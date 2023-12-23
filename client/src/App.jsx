import './App.css'
import Product from './components/Product'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Cart from './components/Cart'
import Layout from './components/Layout'
import Success from './components/Success'
import Cancel from './components/Cancel'

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/' element={<Product/>}></Route>
      <Route path='/success' element={<Success/>}></Route>
      <Route path='/cancel' element={<Cancel/>}></Route>
    </Route>
  ))
  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
