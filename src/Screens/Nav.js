import { Link } from "react-router-dom";
import { StoreContext } from '../Providers/Store'
import { useContext } from "react"
import Register from '../Modal/Register'
import Login from '../Modal/Login'
export default function Nav(){

const { modalRegister, setModalRegister, modalLogin, setModalLogin } = useContext(StoreContext);
    return(
        <div>
            <ul>
                <li onClick={() => {setModalRegister(true);  setModalLogin(false)}}>Register</li>
                <li onClick={() => {setModalLogin(true); setModalRegister(false)}}>Login</li>
            </ul>

            {modalRegister && <Register closeModalRegister={modalRegister}/>}
            {modalLogin && <Login closeModalLogin={modalLogin}/>}
        </div>
    )
}