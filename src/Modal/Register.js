import React from "react";
import { StoreContext } from '../Providers/Store'
import { useContext } from "react"
import { useForm } from "react-hook-form";

export default function Register(closeModalRegister){
    const { setModalRegister } = useContext(StoreContext);
    const { register, handleSubmit, formState: {errors } } = useForm()

    function Create(data){
        fetch('http://127.0.0.1:3333/register',{
            method : "POST",
                headers: {
      "access-control-allow-origin" : "*",
      "Content-type": "application/json; charset=UTF-8"
    },
            body: JSON.stringify({
                username : data.username,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
            })
        }).then((res) => {
            res.json().then((json) =>{
                    if (res.status === 201){
                        alert('Compte crée')
                    }
                    else{
                        alert('Donnée invalide')
                    }
                })
            }) 
    }
    return(
        <div>
            <button onClick={() => setModalRegister(false)}>ddd</button>
            <h1>Register</h1>
            <form>
                <label>Username</label>
                <input type="text" 
                name="username" 
                placeholder="Username" 
                {...register("username")}
                required/>
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
                <label>Password Confirmation</label>
                <input 
                type="password" 
                name="password_confirmation" 
                placeholder="Password" 
                {...register("password_confirmation")}
                required/>
                <button type="submit" onClick={handleSubmit(Create)}>Register</button>
            </form>
        </div>
    )
}