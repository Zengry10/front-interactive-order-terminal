import { useForm } from "react-hook-form";
import React from "react";
import { StoreContext } from '../Providers/Store'
import { useContext } from "react"
export default function Login(closeModalLogin){
    const { setModalLogin } = useContext(StoreContext);
    const { register, handleSubmit, formState: {errors } } = useForm()
    function Login(data){
        fetch('http://127.0.0.1:3333/login',{
            method : "POST",
                headers: {
        "access-control-allow-origin" : "*",
        "Content-type": "application/json; charset=UTF-8"
        },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            })
        }).then((res) => {
            res.json().then((json) =>{
                    if (res.ok){
                        alert('Compte crée')
                    }
                    else{
                        alert('Donnée invalide')
                        console.log(data)
                    }
                })
            })
        }

        return(
            <div>
                <h1>Login</h1>
                <button onClick={() => {setModalLogin(false)}}>Click for goodbye</button>
                <form>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        {...register("email")}
                        required/>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...register("password")}
                        required/>
                    <button onClick={handleSubmit(Login)}>Login</button>
                </form>
            </div>
        )
        
}