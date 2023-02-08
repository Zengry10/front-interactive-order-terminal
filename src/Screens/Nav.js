import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../Providers/Store'
import Register from '../Modal/Register'
import Login from '../Modal/Login'
import { useContext } from "react"

export default function Nav(){
    const navigate = useNavigate();

    // const [role, setRole] = useState(null);
    // const [isRoleLoaded, setIsRoleLoaded] = useState(false);
    const { modalRegister, setModalRegister, modalLogin, setModalLogin, requestOptions } = useContext(StoreContext);
    const token = localStorage.getItem('token');

    // function SendDataOrder() {
    //     fetch('http://localhost:3333/me', requestOptions)
    //       .then((res) => {
    //         res.json().then((json) => {
    //             setRole(json.role);
    //             // setIsRoleLoaded(true);
    //             console.log(role);
    //         });
    //       })
    //   }
      
    // useEffect(() => {
    //     SendDataOrder();
    // }, []);


    // useEffect(() => {
    //     if (isRoleLoaded) {
    //         if (role === "cuisine" && window.location.pathname.startsWith("/admin")) {
    //             navigate("/client/menu");
    //         } else if (role !== "admin" && (window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/cuisine"))) {
    //             navigate("/client/menu");
    //         }
    //     }
    // }, [role, isRoleLoaded, navigate]);
    
    
    
    
    
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