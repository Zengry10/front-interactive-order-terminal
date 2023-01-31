import './App.css';
import Register from './Modal/Register'
import Login from './Modal/Login'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Nav from './Screens/Nav'
import Store from './Providers/Store'
import Menu from './Screens/Menu'
import MenuComplement from './Screens/MenuComplement'

function App() {
  return (
    <div className="m-0">
      <Store>
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path='/menu' element={<Menu/>}></Route>
            <Route path='/menu/:id' element={<MenuComplement/>}></Route>
          </Routes>
        </BrowserRouter>
      </Store>
    </div>
  );
}

export default App;
