import './App.css';
import Register from './Modal/Register'
import Login from './Modal/Login'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Nav from './Screens/Nav'
import Store from './Providers/Store'
import Menu from './Screens/Menu'
import MenuBurger from './Screens/MenuBurger'
import MenuComplement from './Screens/MenuComplement'
import MenuDrink from './Screens/MenuDrink'
import MenuRecapitulatif from './Screens/MenuRecapitulatif'
import FetchCommandKitchen from './Screens/FetchCommandKitchen'
import CreateMenu from './Screens/Admin/CreateMenu'
import PictureMenu from './Screens/Admin/PictureMenu'
import Panier from './Screens/Panier'
import CreateBurger from './Screens/Admin/CreateBurger'
import CreateDrink from './Screens/Admin/CreateDrink'
import PetiteFaim from './Screens/PetiteFaim'
import EditBurger from './Screens/Admin/EditBurger'


function App() {
  return (
    <div className="m-0">
      <Store>
        <BrowserRouter>
          <Nav/>
          <Routes>
            {/* <Route path='/' element={<Navigate to='/client/menu'/>}></Route> */}
            <Route path='/client/menu/' element={<Menu/>}></Route>
            <Route path='/client/petitefaim' element={<PetiteFaim/>}></Route>
            <Route path='/client/petitefaim/edit/:id' element={<EditBurger/>}></Route>
            <Route path='/client/menu/:id' element={<MenuBurger/>}></Route>
            <Route path='/client/menu/component/:id' element={<MenuComplement/>}></Route>
            <Route path='/client/menu/drink/:id' element={<MenuDrink/>}></Route>
            <Route path='/client/menu/recapitulatif/:id' element={<MenuRecapitulatif/>}></Route>
            <Route path="/client/panier/:id" element={<Panier/>}></Route>

            <Route path='/cuisine/command' element={<FetchCommandKitchen/>}></Route>

            <Route path='/admin/menu/create' element={<CreateMenu/>}></Route>
            <Route path='/admin/create/pictureMenu' element={<PictureMenu/>}></Route>
            <Route path='/admin/burger/create' element={<CreateBurger/>}></Route>
            <Route path='/admin/drink/create' element={<CreateDrink/>}></Route>
          </Routes>
        </BrowserRouter>
      </Store>

    </div>
  );
}

export default App;
