import './App.css';
import Register from './Screens/Register'
import Login from './Screens/Login'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        
        <Routes>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
