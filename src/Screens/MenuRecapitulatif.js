import { useContext } from "react";
import { StoreContext } from '../Providers/Store'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

export default function Recapitulatif(){
    let location = useLocation()
    let navigate = useNavigate()
    let [error, setError] = useState(null)
    const { storeMenu, setStoreMenu, requestOptions } = useContext(StoreContext);
    let [article, setArticle] = useState(null)

    function SendDataOrder() {
        fetch('http://localhost:3333/order', {
          method: 'POST',
          headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            name_menu: article.name,
            items: uniqueStoreMenu.map(item => item.name),
          }),
        })
          .then((res) => {
            res.json().then((json) => {
              if (res.ok) {
                alert('Donnée envoyée')
                navigate('/menu')
              } else {
                alert('Donnée invalide');
              }
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }


    useEffect(() => {
        if (location && location.state && location.state.article) {
            setArticle(location.state.article)
        } else {
            setError("Les données ne sont pas disponibles")
            navigate("/")
        }

    }, [])

    const uniqueStoreMenu = storeMenu.filter((item, index, self) => {
      return self.findIndex(t => t.name === item.name) === index;
    });
    console.log(uniqueStoreMenu)

    if (article){
        return(
            <div className="flex flex-col items-center mt-16">
            <h1 className="text-2xl font-bold mb-8">Récapitulatif de votre menu {article.name}</h1>
            <table className="w-full text-center bg-gray-200">
                <thead className="bg-orange-500 text-white">
                    <tr>
                        <th className="py-4 px-6">Article</th>
                        <th className="py-4 px-6">Quantité</th>
                    </tr>
                </thead>
                <tbody>
                  {uniqueStoreMenu.map((item, index) => {
                    return (
                      <tr key={index} className="bg-white text-gray-800">
                        <td className="py-4 px-6">{item.name}</td>
                        <td className="py-4 px-6">1</td>
                      </tr>
                    );
                  })}
                </tbody>
            </table>
            <div className="flex justify-between mt-8 items-center gap-2">
                <img src={article. picture} alt="menu item" className="h-40 w-40" />
                <div className="flex flex-col items-center">
                    <p className="text-xl font-bold flex flex-col justify-center items-center">Prix Total: <span>{article.price}€</span></p>
                </div>
            </div>
                <button className="mt-4 bg-orange-500 text-white py-4 px-8 font-bold rounded-full text-xl" onClick={() => SendDataOrder()}>Commander</button>    
            </div>
        )
    }
}