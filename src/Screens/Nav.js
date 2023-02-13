// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { StoreContext } from '../Providers/Store'
// import Register from '../Modal/Register'
// import Login from '../Modal/Login'
// import { useContext } from "react"

// export default function Nav(){
//     const navigate = useNavigate();

//     const { modalRegister, setModalRegister, modalLogin, setModalLogin, requestOptions, role, setRole } = useContext(StoreContext);
//     const token = localStorage.getItem('token');
//     console.log(role)
//     return(
//         <nav className="flex items-center justify-between bg-orange-500 p-4  mb-px">
//             <div className="flex">
//                 {token ? (
//                     <>
//                         <Link to='/client/menu' className="text-white font-bold mr-4">Nos Menus</Link>
//                         <Link to='/client/menu' className="text-white font-bold">Petite faim</Link>
//                     </>
//                 ) : (
//                     <>
//                         <button className="bg-transparent border border-white hover:border-gray-200 text-white hover:text-gray-500 py-2 px-4 rounded mr-4"
//                         onClick={() => {setModalRegister(true); setModalLogin(false)}}>Inscription</button>
//                         <button className="bg-transparent border border-white hover:border-gray-200 text-white hover:text-gray-500 py-2 px-4 rounded"
//                         onClick={() => {setModalLogin(true); setModalRegister(false)}}>Connexion</button>
//                     </>
//                 )}
//             </div>
//         {modalRegister && <Register closeModalRegister={modalRegister} />}
//         {modalLogin && <Login closeModalLogin={modalLogin} />}
//         </nav>
//     )
    
// }


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../Providers/Store'
import Register from '../Modal/Register'
import Login from '../Modal/Login'
import { useContext } from "react"

export default function Nav(){
    const navigate = useNavigate();
    const { modalRegister, setModalRegister, modalLogin, setModalLogin, requestOptions, role, setRole } = useContext(StoreContext);
    const token = localStorage.getItem('token');
    


    return(
        <nav className="flex items-center justify-between bg-orange-500 p-4 mb-px">
            <div className="flex">
                {token ? (
                    role === 'admin' ? (
                        <>
                            <div className='flex justify-between items-center'>
                                <div className=' '>
                                    <Link to='/client/menu' className="text-white font-bold mr-4">Nos Menus</Link>
                                    <Link to='/client/petitefaim' className="text-white font-bold mr-4">Petite faim</Link>
                                    <Link to='/cuisine/command' className="text-white font-bold mr-4">Commande cuisine</Link>
                                    <Link to='/admin/menu/create' className="text-white font-bold mr-4">Create Menu</Link>
                                    <Link to='/admin/burger/create' className="text-white font-bold mr-4">Create Burger</Link>
                                    <Link to='/admin/drink/create' className="text-white font-bold mr-4">Create Drink</Link>
                                    <Link to='/client/panier/:id' className="text-white font-bold mr-4">Panier</Link>
                                </div>
                                <button className="bg-transparent border border-white hover:border-gray-200 text-white hover:text-gray-500 py-2 px-4 rounded mr-4 flex-end"
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        setRole(null);
                                        navigate('/');
                                    }}>
                                        Déconnexion
                                </button>
                            </div>
                        </>
                    ) : role === 'cuisine' ? (
                        <>
                            <div className='flex justify-between items-center'>
                                <div className=' '>
                                    <Link to='/cuisine/command' className="text-white font-bold mr-4">Commande cuisine</Link>
                                </div>
                                <button className="bg-transparent border border-white hover:border-gray-200 text-white hover:text-gray-500 py-2 px-4 rounded mr-4 flex-end"
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        setRole(null);
                                        navigate('/');
                                    }}>
                                        Déconnexion
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex '>
                                <Link to='/client/menu' className="text-white font-bold mr-4">Nos Menus</Link>
                                <Link to='/client/menu' className="text-white font-bold mr-4">Petite faim</Link>
                                <Link to='/client/panier/:id' className="text-white font-bold mr-4">Panier</Link>
                            </div>
                        </>
                    )
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
