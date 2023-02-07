import { Link } from "react-router-dom";
import { StoreContext } from '../Providers/Store'
import { useContext } from "react"
import Register from '../Modal/Register'
import Login from '../Modal/Login'

export default function Nav(){
    const { modalRegister, setModalRegister, modalLogin, setModalLogin } = useContext(StoreContext);
    const token = localStorage.getItem('token')

    return(
        <nav className="flex items-center justify-between bg-orange-500 p-4  mb-px">
            <div className="flex">
                {token ? (
                    <>
                        <Link to='/client/menu' className="text-white font-bold mr-4">Nos Menus</Link>
                        <Link to='/client/menu' className="text-white font-bold">Petite faim</Link>
                    </>
                ) : (
                    <>
                        <button className="bg-transparent border border-white hover:border-gray-200 text-white hover:text-gray-500 py-2 px-4 rounded mr-4"
                        onClick={() => {setModalRegister(true); setModalLogin(false)}}>Inscription</button>
                        <button className="bg-transparent border border-white hover:border-gray-200 text-white hover:text-gray-500 py-2 px-4 rounded"
                        onClick={() => {setModalLogin(true); setModalRegister(false)}}>Connexion</button>
                    </>
                )}
            </div>
        {modalRegister && <Register closeModalRegister={modalRegister} />}
        {modalLogin && <Login closeModalLogin={modalLogin} />}
        </nav>
    )
    
}