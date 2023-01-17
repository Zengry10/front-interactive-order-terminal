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
            <li onClick={() => setModalRegister(true)}>Register</li>
                <li onClick={() => setModalLogin(true)}>Login</li>
                {console.log(modalLogin)}
            </ul>

            {modalRegister && <Register closeModalRegister={modalRegister}/>}
            {modalLogin && <Login closeModalLogin={modalLogin}/>}
        </div>
    )
}