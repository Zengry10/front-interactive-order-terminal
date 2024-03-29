import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useContext } from "react";
import { StoreContext } from '../Providers/Store'

export default function MenuBurger(){
    let location = useLocation()
    let navigate = useNavigate()
    let [textRemoveIngredient, setTextRemoveIngredient] = useState("")
    let [article, setArticle] = useState(null)
    let [error, setError] = useState(null)
    const { storeMenu, setStoreMenu } = useContext(StoreContext);
    const [isRemoved, setIsRemoved] = useState(false);

    console.log(article)
    // console.log(storeMenu)

    // const removeIngredient = (ingredient) => {
    //   const updatedIngredients = article.burgers[0].ingredients.filter(i => i !== ingredient)
    //   setStoreMenu([{...article.burgers[0], ingredients: updatedIngredients}])
    // }
    
    const removeIngredient = (ingredient) => {
        const updatedIngredients = article.burgers[0].ingredients.filter(i => i !== ingredient);
        setStoreMenu([{...article.burgers[0], ingredients: updatedIngredients}]);
        setTextRemoveIngredient(`Vous venez d'enlever ${ingredient.name} dans votre burger ${article.burgers[0].name}.`);
    };

    useEffect(() => {
      if (location && location.state && location.state.article) {
        setArticle(location.state.article)
      } else {
        setError("Les données ne sont pas disponibles")
        navigate("/")
      }
    }, [location.state.article])

    const handleAddToOrder = (burger) => {
      if (storeMenu.length === 0) {
        setStoreMenu([burger]);
      } else {
        setStoreMenu([]);
        setStoreMenu([burger]);
      }
    };

    if (error) {
        return <div>{error}</div>
    }

    if (article && article !== null && article.burgers &&article.burgers.length > 0 && article.burgers[0].ingredients && article.burgers[0].ingredients.length > 0) {
        return (
<div id='scroll' className="bg-gray-200 h-screen w-full overflow-hidden" key={article.id}>
  <div className="flex justify-center mt-20">
    <div className="w-full md:w-1/3  m-2 bg-white rounded-b-lg shadow-md shadow-ml min-h-full pt-4">
      <div className="flex">
        <img className="w-1/2 h-1/2 " src={article.burgers[0].picture} alt="menu item"/>
        <div className="p-4 w-1/2">
          <h3 className="text-lg font-bold mb-4">Ingrédients :</h3>
          <ul className="list-none">
          {
            article.burgers[0].ingredients.map((ingredient) => {
              return (
                <div key={ingredient.id}>
                  <li className="flex items-center mb-4 gap-2">
                    <p className="flex-1">{ingredient.name}</p>
                    <button 
                      className={`bg-red-500 text-white px-4 py-2 rounded-full ${isRemoved ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => {
                        removeIngredient(ingredient);
                        setIsRemoved(true);
                      }}
                    >
                      -
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-full mr-2">+</button>
                  </li>
                </div>
              )
            })
          }

          </ul>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-red-500">
        {textRemoveIngredient}
      </div>
        <Link to={`/client/menu/component/${article.id}`} className="w-5" key={article.id} state={{ article: article }}>
          <button className="bg-orange-500 rounded-b-lg cursor-pointer w-full" onClick={() => handleAddToOrder(article.burgers[0])}>
              <p className="flex justify-center p-4 text-3xl">Suivant</p>
          </button>
        </Link>
    </div>
  </div>
</div>

        )
    } else {
        return <div>Chargement des données en cours...</div>
    }
}
