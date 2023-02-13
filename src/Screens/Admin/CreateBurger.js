import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function CreateBurger() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  function SendDataOrder(data) {
    fetch('http://localhost:3333/burger', {
      method: 'POST',
      headers: {
        'access-control-allow-origin': '*',
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: data.name,
        stock: data.stock,
        price: data.price,
      }),
    })
      .then((res) => {
        res.json().then((json) => {
          if (res.status === 201 || res.status === 200) {
            alert('Donnée envoyée');
            console.log(data)
            navigate('/client/menu')
          } else {
            alert('Donnée invalide');
          }
        });
      })
  }

  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="text-2xl font-bold mb-8">Création d'un burger</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit(SendDataOrder)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Nom du burger
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            {...register("name", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stock"
            type="number"
            {...register("stock", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Prix
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            {...register("price", { required: true })}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            >
            Créer
            </button>
        </div>
        </form>
        </div>
    );
    }
