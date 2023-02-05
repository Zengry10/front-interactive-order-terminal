import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useContext } from "react";
import { StoreContext } from '../Providers/Store'

export default function MenuComplement(){
    let location = useLocation()
    let navigate = useNavigate()
    let [article, setArticle] = useState(null)
    let [error, setError] = useState(null)
    const { storeMenu, setStoreMenu } = useContext(StoreContext);


    useEffect(() => {
        if (location && location.state && location.state.article) {
            setArticle(location.state.article)
        } else {
            setError("Les données ne sont pas disponibles")
            navigate("/")
        }

    }, [])


    const handleAddToOrder = (complement) => {
        if (storeMenu.length > 0) {
            setStoreMenu([...storeMenu, complement]);
        } else {
          setStoreMenu([]);
          setStoreMenu([complement]);
        }
      };

    if (error) {
        return <div>{error}</div>
    }

    if (article && article.complements && article.complements.length > 0 /* && article.complements[0].ingredients && article.complements[0].ingredients.length > 0*/  ) {
        return (
                <div className=" flex bg-gray-200 justify-center w-full mb-32 overflow-hidden h-screen" key={article.id}>
                    {
                       article.complements.map((complement) => {
                            return (
                                <div className="flex justify-center mt-20 h-72" key={complement.id}  onClick={() => handleAddToOrder(complement)}>
                                <div className="m-2 bg-white rounded-b-lg shadow-md shadow-ml min-h-full pt-4">
                                <div className="flex">
                                <img className="w-1/2 h-1/2" src={complement.picture} alt="menu item"/>
                                <div className="p-4 w-1/2">
                                <h3 className="text-lg font-bold mb-4">Ingrédients :</h3>
                                <ul className="list-none">
                            {
                        complement.ingredients.map((ingredient) => {
                            return (
                                <div key={ingredient.id}>
                                    <li className="flex items-center mb-4">
                                        <p className="flex-1">{ingredient.name}</p>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded-full mr-2">+</button>
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-full">-</button>
                                    </li>
                                </div>
                            );
                        })
                        }
                        </ul>
                        </div>
                        </div>
                        <Link to={`/menu/drink/${article.id}`} className="w-5" key={article.id} state={{ article: article }}>
                            <div className="bg-orange-500 rounded-b-lg cursor-pointer">
                                <p className="flex justify-center p-4 text-3xl">Suivant</p>
                            </div>
                        </Link>
                    </div>
                    </div>
                        );
                        })
                    }
                </div>
        )
    }
}
