import './App.css';
import Register from './Modal/Register'
import Login from './Modal/Login'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Nav from './Screens/Nav'
import Store from './Providers/Store'
import Task from './Screens/Task'

function App() {
  return (
    <div className="m-0">
      <Store>
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path='/task' element={<Task/>}></Route>
          </Routes>
        </BrowserRouter>
      </Store>
    </div>
  );
}

export default App;
