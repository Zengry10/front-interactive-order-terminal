import React from "react";
import { StoreContext } from '../Providers/Store'
import { useContext } from "react"
import { useForm } from "react-hook-form";

export default function Register(closeModalRegister){
    const { setModalRegister, setModalLogin } = useContext(StoreContext);
    const { register, handleSubmit, formState: {errors } } = useForm()

    function Create(data){
        fetch('http://localhost:3333/register',{
            method : "POST",
                headers: {
      "access-control-allow-origin" : "*",
      "Content-type": "application/json; charset=UTF-8"
    },
            body: JSON.stringify({
                firstname : data.firstname,
                lastname : data.lastname,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
            })
        }).then((res) => {
            res.json().then((json) =>{
                    if (res.status === 201){
                        alert('Compte crée')
                        setModalLogin(true)
                        setModalRegister(false)
                    }
                    else{
                        alert('Donnée invalide')
                    }
                })
            }) 
    }
    return(
      
        <div id="changeBgColor" className=" w-screen px-4 h-full  absolute bottom-0 pt-24 flex justify-center">
            <div className="bg-white h-4/5 rounded-lg  relative dark:bg-gray-700 w-96">
                <div className="flex justify-end p-2">
                    <button onClick={() => setModalRegister(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>                            </button>
                </div>
                <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" onSubmit={handleSubmit(Create)}>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Créez un compte sur notre plateforme</h3>
                    <div>
                        <label htmlFor="firstname" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Ton Prénom</label>
                        <input type="firstname"
                         name="firstname"
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                         placeholder="name@company.com" 
                         {...register("firstname", { required: true })}
                         required
                         
                         
                         />
                    </div>
                    <div>
                        <label htmlFor="lastname" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Ton Nom</label>
                        <input type="lastname"
                         name="lastname"
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                         placeholder="name@company.com" 
                         {...register("lastname", { required: true })}
                         required
                         
                         
                         />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Ton email</label>
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="name@company.com" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        {...register("email", { required: true })}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Votre mot de passe</label>
                        <input type="password"
                         name="password"
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                         placeholder="name@company.com" 
                         {...register("password", { required: true })}
                         required
                         
                         />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Confirmation de votre mot de passe</label>
                        <input type="password"
                         name="password"
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                         placeholder="name@company.com" 
                         {...register("password_confirmation", { required: true })}
                         required
                         
                         />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                
                                />
                            </div>
                            <div className="text-sm ml-3">
                            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-gray-300">Se rappelez de moi</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Mot de passe perdu ?</a>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Crée votre compte
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Pas encore de compte ? &nbsp; <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">S'inscrire</a>
                    </div>
                </form>
            </div>
        </div>
   
    )
}