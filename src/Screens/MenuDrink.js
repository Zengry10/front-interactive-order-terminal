import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useContext } from "react";
import { StoreContext } from '../Providers/Store'

export default function MenuDrink(){
    let location = useLocation()
    let navigate = useNavigate()
    let [article, setArticle] = useState(null)
    let [error, setError] = useState(null)
    const { storeMenu, setStoreMenu } = useContext(StoreContext);
    console.log(storeMenu)
    console.log(article)

    useEffect(() => {
        if (location && location.state && location.state.article) {
            setArticle(location.state.article)
        } else {
            setError("Les données ne sont pas disponibles")
            navigate("/")
        }

    }, [])

    const handleAddToOrder = (drink) => {
      const maxNumberOfDrinks = 3; // Nombre maximum de boissons autorisées
      if (storeMenu.length < maxNumberOfDrinks) {
          setStoreMenu([...storeMenu, drink]);
      } else {
          alert("Vous ne pouvez pas commander plus de 2 boissons.");
      }
  };
    if (error) {
        return <div>{error}</div>
    }

    if (article && article.drinks && article.drinks.length > 0 /* && article.complements[0].ingredients && article.complements[0].ingredients.length > 0*/  ) {
        return (
            <div id='scrollbar' className="flex flex-wrap items-center bg-gray-200 p-4 justify-center" key={article.id}>
            {article.drinks.map((drink) => {
                return(
                    <div key={drink.id} className="w-full  md:w-1/3 max-w-sm m-2 rounded-b-lg bg-white shadow-md mb-10" onClick={() => handleAddToOrder(drink)}>

                      <img className="w-full rounded-b-lg " src={drink.picture} alt="menu item"/>
                      <div className="p-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold">{drink.name}</h3>
                      </div>
                      {drink.ingredients && drink.ingredients.length > 0 &&
                        <div className="p-4">
                          <p className="font-bold">Suppléments:</p>
                          <ul>
                            {drink.ingredients.map((ingredient) => {
                                return (
                                  <div key={ingredient.id}>
                                    <li className="flex items-center mb-4 gap-2">
                                      <p className="flex-1">{ingredient.name}</p>
                                      <button className="bg-red-500 text-white px-4 py-2 rounded-full">-</button>
                                      <button className="bg-green-500 text-white px-4 py-2 rounded-full mr-2">+</button>
                                    </li>
                                  </div>
                                )
                            })}
                          </ul>
                        </div>
                      }

                    <Link to={`/client/menu/recapitulatif/${article.id}`} className="w-5" key={article.id} state={{ article: article }}>
                        <div className="bg-orange-500 rounded-b-lg cursor-pointer">
                            <p className="flex justify-center p-4 text-3xl">Suivant</p>
                        </div>
                    </Link>
                  </div>
                    
                )
            })}
            </div>
        )
    }
}