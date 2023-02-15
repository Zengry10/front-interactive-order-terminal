import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom"
import { StoreContext } from '../Providers/Store'
import { useContext } from "react"


export default function Petitefaim(){

    const fetchSomthing = useCallback(() => console.log(articles), [])
    const [articles, setArticles] = useState('')
    const {storeMenu, requestOptions, role} = useContext(StoreContext)
    
    function fetchFaim(){
        fetch('http://localhost:3333/burger', requestOptions).then((res) => {
            res.json().then((json) =>{
                //    console.log(json)
                   setArticles(json)
                   console.log(articles)
                })
            }) 
    }
    useEffect(() => {
        fetchFaim()
    }, [])


    
function deleteBurger(id) {
    fetch('http://localhost:3333/burger/' + id, {
      method: 'DELETE',
      headers: {
        'access-control-allow-origin': '*',
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((res) => {
        res.json().then((json) => {
          if (res.ok) {
            setArticles(old => old.filter(article => article.id !== id))
            // navigate('/client/menu')
          } else {
            alert('Donnée invalide');
            console.log(json)
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

 
    if (articles) {
        console.log(articles)
        return(
            <div id='scrollbar' className="flex flex-wrap items-center bg-orange-500 p-4 justify-center">
                {articles.map((article) => {
                    return(
                        <div key={article.id} className=" mt-10 gap-2 p-4 md:w-1/3 max-w-sm m-2 bg-white rounded-lg shadow-md mb-10 hover:shadow-lg hover:scale-105 transition duration-300">
                                <img className="w-full" src={article. picture} alt="menu item"/>
                                <div className="p-4 flex items-center justify-between">
                                    <h3 className="text-xl font-bold">{article.name}</h3>
                                    <p className="bg-red-600 text-white px-4 py-2 rounded-full">{article.price}€</p>
                                </div>
                            {role === 'admin' && (
                                <div className="flex justify-between">
                                    <Link to={`/client/petitefaim/edit/${article.id}`} className="w-5" key={article.id} state={{ article: article }}>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded-full">Modifier</button>
                                    </Link>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-full" onClick={() => deleteBurger(article.id)}>Supprimer</button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }
}