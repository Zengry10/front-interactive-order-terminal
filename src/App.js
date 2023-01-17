import './App.css';
import Register from './Modal/Register'
import Login from './Modal/Login'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import Nav from './Screens/Nav'
import Store from './Providers/Store'

function App() {
  return (
    <div className="App">
      <Store>
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
        </BrowserRouter>
      </Store>
    </div>
  );
}

export default App;
